<?php

namespace App\Model;

class SectionParameterRepository extends BaseRepository
{
    protected $tableName = 'section_parameter';

    public function pairParametersToSection($sectionId, $parameters)
    {
        $paramIds = array_values(array_map(function($param) { return $param['id']; }, array_filter($parameters, function($param) { return $param['checked']; })));

        $this->findAll()->where('section_id', $sectionId)->delete();

        foreach ($paramIds as $paramId) {
            $this->save(['section_id' => $sectionId, 'parameter_id' => $paramId]);
        }
    }
}