<?php

namespace App\Presenters;

use App\Model;

class ContentsPresenter extends BaseApiPresenter
{
    /** @var Model\ContentSectionRepository @inject */
    public $contentSectionRepository;

    public function processPostRequest(array $parameters)
    {
        $result = $this->contentSectionRepository->save($parameters);

        if ($result === true) {
            return ['success' => true];
        }

        return ['success' => false, 'errors' => $result];
    }

    public function processGetRequest(array $parameters, $id = null)
    {
        if ($id === null) {
            return $this->contentSectionRepository->findContentSections();
        }

        $response = $this->contentSectionRepository->findContentSection($id);

        if (!$response) {
            return ['success' => false];
        }

        return $response;
    }

    public function processPutRequest(array $parameters, $id)
    {
        $result = $this->contentSectionRepository->save($parameters, $id);

        if ($result === true) {
            return ['success' => true];
        }

        return ['success' => false, 'errors' => $result];
    }
}
