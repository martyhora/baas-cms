<?php

namespace App\Model;

class ContentRepository extends BaseRepository
{
    protected $tableName = 'content';

    public function saveParameters($contentSectionId, $parameters)
    {
        $this->findAll()->where('content_section_id', $contentSectionId)->delete();

        foreach ($parameters as $parameter) {
            $this->save(['content_section_id' => $contentSectionId, 'parameter_id' => $parameter['id'], 'value' => $parameter['value']]);
        }
    }

    public function findParameters($contentSectionId)
    {
        $rows = $this->findAll()
                     ->where('content_section_id', $contentSectionId);

        return $rows;
    }
}