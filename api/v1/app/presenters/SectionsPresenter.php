<?php

namespace App\Presenters;

use App\Model;

class SectionsPresenter extends BaseApiPresenter
{
    /** @var Model\SectionRepository @inject */
    public $apiRepository;

    public function actionGetParameters($id)
    {
        $this->sendJson($this->apiRepository->getParameters($id));
    }
}
