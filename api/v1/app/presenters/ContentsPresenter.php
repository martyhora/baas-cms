<?php

namespace App\Presenters;

use App\Model;

class ContentsPresenter extends BaseApiPresenter
{
    /** @var Model\ContentSectionRepository @inject */
    public $apiRepository;
}
