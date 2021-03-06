<?php

namespace App\Model;

use App\Model;
use Nette;

class ContentSectionRepository extends BaseApiRepository
{
    protected $tableName = 'content_section';

    protected $content;

    public function __construct(Nette\Database\Context $database,
                                Model\ContentRepository $content)
    {
        parent::__construct($database);

        $this->content = $content;
    }

    public function fetchRowsForApi()
    {
        $sql = "SELECT sc.id, s.name sectionName, DATE_FORMAT(sc.date_created,'%d.%m.%Y') dateCreated
                FROM {$this->tableName} sc
                JOIN section s ON s.id = sc.section_id
                ORDER BY id DESC";

        return $this->database->query($sql)->fetchAll();
    }

    private function getFormErrors($data, $id = null)
    {
        $errors = [];

        $requiredFields = [
            'sectionId' => 'sekce',
        ];

        foreach ($requiredFields as $requiredField => $fieldText)
        {
            if (empty($data[$requiredField])) {
                $errors[] = "Pole {$fieldText} musí být vyplněné.";
            }
        }

        return $errors;
    }

    public function save($data, $id = null)
    {
        $errors = $this->getFormErrors($data, $id);

        if (count($errors) > 0) {
            return $errors;
        }

        $parameters = $data['parameters'];

        unset($data['parameters']);

        try {
            $this->database->beginTransaction();

            $contentSection = parent::save(['section_id' => $data['sectionId']], $id);

            $this->content->saveParameters($contentSection['id'], $parameters);

            $this->database->commit();

            return $contentSection;
        } catch (\PDOException $e) {
            $this->database->rollBack();

            throw $e;
        }
    }

    public function fetchRowForApi($contentSectionId)
    {
        $contentSection = $this->findRow($contentSectionId);

        if (!$contentSection)
        {
            return false;
        }

        $parameterValues = iterator_to_array($this->content->findParameters($contentSectionId));

        $values = [];

        foreach ($parameterValues as $parameterValue)
        {
            $parameter = $parameterValue->toArray();

            $parameter['value'] = is_numeric($parameter['value']) ? (int) $parameter['value'] : $parameter['value'];

            $values[] = $parameter;
        }

        return [
            'parameterValues' => $values,
            'sectionId'       => $contentSection->section_id,
        ];
    }

    public function findSectionsContentForApi($identificator, array $parameters)
    {
        $contentSeparator = ';;;';
        $parameterSeparator = '|||';

        $where = ['s.identificator = ?'];
        $args  = [$contentSeparator, $parameterSeparator, $identificator];

        if (!empty($parameters['id'])) {
            $where[] = 'cs.id = ?';
            $args[]  = $parameters['id'];
        }

        $sql = "
            SELECT cs.id, GROUP_CONCAT(CONCAT_WS(?, p.identificator, IFNULL(IF(p.type = 'string', c.value, pe.name), '')) SEPARATOR ?) content
            FROM {$this->tableName} cs
            JOIN section s ON s.id = cs.section_id
            JOIN content c ON c.content_section_id = cs.id
            JOIN parameter p ON p.id = c.parameter_id
            LEFT JOIN parameter_enum pe ON pe.id = c.value
            WHERE " . implode(' AND ', $where) . "     
            GROUP BY cs.id
        ";

        $rows = $this->database->queryArgs($sql, $args);

        $result = [];

        foreach ($rows as $row)
        {
            $contentParameter = [
                'id' => $row->id,
            ];

            $contents = explode($parameterSeparator, $row->content);

            foreach ($contents as $content)
            {
                $params = explode($contentSeparator, $content);

                $contentParameter[$params[0]] = $params[1];
            }

            $result[] = $contentParameter;
        }

        return $result;
    }
}