<?php

namespace App\Presenters;

use App\Model;

class SectionsPresenter extends BaseApiPresenter
{
    /** @var Model\SectionRepository @inject */
    public $sectionRepository;

    public function processPostRequest(array $parameters)
    {
        $this->sectionRepository->save($parameters);

        return ['success' => true];
    }

    public function processGetRequest(array $parameters, $id = null)
    {
        if ($id === null) {
            return $this->sectionRepository->findSections();
        }

        $response = $this->sectionRepository->findOne($id);

        if (!$response) {
            return ['success' => false];
        }

        return $response;
    }

    public function processPutRequest(array $parameters, $id)
    {
        $this->sectionRepository->save($parameters, $id);

        return ['success' => true];
    }

    public function actionGetParameters($id)
    {
        $this->sendJson($this->sectionRepository->getParameters($id));
    }
}
