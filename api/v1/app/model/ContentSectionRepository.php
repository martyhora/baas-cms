<?php

namespace App\Model;

use App\Model;
use Nette;

class ContentSectionRepository extends BaseRepository
{
    protected $tableName = 'content_section';

    protected $content;

    public function __construct(Nette\Database\Context $database,
                                Model\ContentRepository $content)
    {
        parent::__construct($database);

        $this->content = $content;
    }

    public function findContentSections()
    {
        $sql = "SELECT sc.id, s.name sectionName, DATE_FORMAT(sc.date_created,'%d.%m.%Y') dateCreated
                FROM {$this->tableName} sc
                JOIN section s ON s.id = sc.section_id
                ORDER BY id DESC";

        return $this->database->query($sql)->fetchAll();
    }

    public function save($data, $id = null)
    {
        $parameters = $data['parameters'];

        unset($data['parameters']);

        $contentSection = parent::save(['section_id' => $data['sectionId']], $id);

        $this->content->saveParameters($contentSection['id'], $parameters);

        return $contentSection;
    }

    public function findContentSection($contentSectionId)
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

    public function findSectionsContentForApi($id)
    {
        $contentSeparator = ';;;';
        $parameterSeparator = '|||';

        $sql = "
            SELECT cs.id, GROUP_CONCAT(CONCAT_WS(?, p.id, p.name, IFNULL(IF(p.type = 'string', c.value, pe.name), '')) SEPARATOR ?) content
            FROM {$this->tableName} cs
            JOIN content c ON c.content_section_id = cs.id
            JOIN parameter p ON p.id = c.parameter_id
            LEFT JOIN parameter_enum pe ON pe.id = c.value
            WHERE section_id = ?          
            GROUP BY cs.id
        ";

        $rows = $this->database->queryArgs($sql, [$contentSeparator, $parameterSeparator, $id]);

        $result = [];

        foreach ($rows as $row)
        {
            $contentParameter = [
                'contentId' => $row->id,
                'content'   => []
            ];

            $contents = explode($parameterSeparator, $row->content);

            foreach ($contents as $content)
            {
                $params = explode($contentSeparator, $content);

                $contentParameter['content'][] = [
                    'parameter' => [
                        'id'   => $params[0],
                        'name' => $params[1],
                    ],
                    'value' => $params[2],
                ];
            }

            $result[] = $contentParameter;
        }

        return $result;
    }
}