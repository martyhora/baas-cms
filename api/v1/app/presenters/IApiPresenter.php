<?php

namespace App\Presenters;

interface IApiPresenter
{
    public function processPostRequest(array $parameters);
    public function processGetRequest(array $parameters, $id = null);
    public function processPutRequest(array $parameters, $id);
}