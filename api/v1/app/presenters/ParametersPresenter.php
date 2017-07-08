<?php

namespace App\Presenters;

use App\Model;

class ParametersPresenter extends BaseApiPresenter
{
    /** @var Model\ParameterRepository @inject */
    public $apiRepository;
}