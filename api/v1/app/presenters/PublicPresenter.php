<?php

namespace App\Presenters;

use App\Model\ContentSectionRepository;

class PublicPresenter extends BasePresenter
{
    /** @var ContentSectionRepository @inject */
    public $contentSectionRepository;

    public function actionDefault($identificator)
    {
        $this->sendJson($this->contentSectionRepository->findSectionsContentForApi($identificator));
    }
}