<?php

namespace App\Model;

class ParameterEnumRepository extends BaseRepository
{
    protected $tableName = 'parameter_enum';

    public function saveEnums($parameterId, array $enums)
    {
        $this->findAll()->where('parameter_id', $parameterId)->delete();

        foreach ($enums as $item) {
            $this->save(['parameter_id' => $parameterId, 'name' => $item['name']]);
        }
    }
}