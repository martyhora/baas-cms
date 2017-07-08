<?php

namespace App\Presenters;

use App\Model\ContentSectionRepository;

class PublicPresenter extends BasePresenter
{
    /** @var ContentSectionRepository @inject */
    public $contentSectionRepository;

    public function actionDefault($id)
    {
        $this->sendJson($this->contentSectionRepository->findSectionsContentForApi($id));
    }
}