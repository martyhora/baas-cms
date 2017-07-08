<?php

namespace App\Model;

use App\Model;
use Nette;

class SectionRepository extends BaseRepository
{
    protected $tableName = 'section';

    protected $sectionParameter;

    public function __construct(Nette\Database\Context $database,
                                Model\SectionParameterRepository $sectionParameter)
    {
        parent::__construct($database);

        $this->sectionParameter = $sectionParameter;
    }

    private function getFormErrors($data, $id = null)
    {
        $errors = [];

        $requiredFields = [
            'name' => 'název sekce',
            'identificator' => 'identifikátor sekce',
        ];

        foreach ($requiredFields as $requiredField => $fieldText)
        {
            if (empty($data[$requiredField])) {
                $errors[] = "Pole {$fieldText} musí být vyplněné.";
            }
        }

        $row = $this->findBy(['identificator' => $data['identificator']]);

        if ($id) {
            $row->where('id != ?', $id);
        }

        if ($row->fetch()) {
            $errors[] = 'Sekce s tímto identifikátorem již existuje, zvolte prosím jiný.';
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
        unset($data['params']);
        unset($data['errors']);

        $section = parent::save($data, $id);

        $this->sectionParameter->pairParametersToSection($section['id'], $parameters);

        return true;
    }

    public function findOne($id)
    {
        $section = $this->findRow($id);

        if (!$section) {
            return false;
        }

        $paramIds = [];

        foreach ($section->related('section_param') as $sectionParam) {
            $paramIds[] = $sectionParam['parameter_id'];
        }

        $section = $section->toArray();

        $section['params'] = json_encode($paramIds);

        return $section;
    }

    public function getParameters($sectionId)
    {
        $enumColumnsSeparator = '|||';
        $enumRowsSeparator = ';;;';

        $sql = "SELECT p.id, p.name, p.type, GROUP_CONCAT(CONCAT_WS('{$enumColumnsSeparator}', pe.id, pe.name) SEPARATOR '{$enumRowsSeparator}') enumValues
                FROM section_parameter sc
                JOIN parameter p ON p.id = sc.parameter_id
                LEFT JOIN parameter_enum pe ON pe.parameter_id = sc.parameter_id
                WHERE section_id = ?
                GROUP BY sc.parameter_id";

        $parameterRows = $this->database->query($sql, [$sectionId]);

        $parameters = [];

        foreach ($parameterRows as $parameterRow) {
            $parameter = (array) $parameterRow;

            $parameter['enumValues'] = array_map(function($value) use ($enumColumnsSeparator) {
                $v = explode($enumColumnsSeparator, $value);

                return [
                    'id'   => $v[0],
                    'name' => $v[1]
                ];
            }, array_filter(explode($enumRowsSeparator, $parameter['enumValues']), function($enumValue) { return !empty(trim($enumValue)); }) );

            $parameter['value'] = '';

            $parameters[] = $parameter;
        }

        return $parameters;
    }

    public function findSections()
    {
        return array_values(array_map('iterator_to_array', $this->findAll()->fetchAll()));
    }
}