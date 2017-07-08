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

    public function save($data, $id = null)
    {
        $enumValues = $data['type'] === self::TYPE_ENUM ? $data['enumValues'] : [];

        unset($data['enumValues']);

        $parameter = parent::save($data, $id);

        if ($data['type'] === self::TYPE_ENUM) {
            $this->parameterEnum->saveEnums($parameter['id'], $enumValues);
        }
    }

    public function findParameters()
    {
        return array_values(array_map('iterator_to_array', $this->findAll()->fetchAll()));
    }
}