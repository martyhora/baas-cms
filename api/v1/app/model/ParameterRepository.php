<?php

namespace App\Model;

use App\Model;
use Nette;

class ParameterRepository extends BaseRepository
{
    const TYPE_ENUM = 'enum';

    protected $tableName = 'parameter';

    protected $parameterEnum;

    public function __construct(Nette\Database\Context $database, Model\ParameterEnumRepository $parameterEnum)
    {
        parent::__construct($database);

        $this->parameterEnum = $parameterEnum;
    }

    private function getFormErrors($data, $id = null)
    {
        $errors = [];

        $requiredFields = [
            'name' => 'název parametru',
            'type' => 'typ parametru',
        ];

        foreach ($requiredFields as $requiredField => $fieldText)
        {
            if (empty(trim($data[$requiredField]))) {
                $errors[] = "Pole {$fieldText} musí být vyplněné.";
            }
        }

        $row = $this->findBy(['identificator' => $data['identificator']]);

        if ($id) {
            $row->where('id != ?', $id);
        }

        if ($row->fetch()) {
            $errors[] = 'Parametr s tímto identifikátorem již existuje, zvolte prosím jiný.';
        }

        return $errors;
    }

    public function save($data, $id = null)
    {
        $errors = $this->getFormErrors($data, $id);

        if (count($errors) > 0) {
            return $errors;
        }

        $enumValues = $data['type'] === self::TYPE_ENUM ? $data['enumValues'] : [];

        unset($data['enumValues']);
        unset($data['errors']);

        $parameter = parent::save($data, $id);

        if ($data['type'] === self::TYPE_ENUM) {
            $this->parameterEnum->saveEnums($parameter['id'], $enumValues);
        }

        return true;
    }

    public function findParameters()
    {
        return array_values(array_map('iterator_to_array', $this->findAll()->fetchAll()));
    }
}