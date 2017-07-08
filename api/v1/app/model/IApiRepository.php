<?php

namespace App\Model;

interface IApiRepository extends IRepository
{
    public function fetchRowsForApi();

    public function fetchRowForApi($id);
}