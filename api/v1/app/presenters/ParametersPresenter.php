<?php

namespace App\Presenters;

use App\Model;

class ParametersPresenter extends BaseApiPresenter
{
    /** @var Model\ParameterRepository @inject */
    public $parameterRepository;

    public function processPostRequest(array $parameters)
    {
        $this->parameterRepository->save($parameters);

        return ['success' => true];
    }

    public function processGetRequest(array $parameters, $id = null)
    {
        if ($id === null) {
            return $this->parameterRepository->findParameters();
        }

        $response = $this->parameterRepository->findRow($id);

        if (!$response) {
            return ['success' => false];
        }

        return $response->toArray();
    }

    public function processPutRequest(array $parameters, $id)
    {
        $this->parameterRepository->save($parameters, $id);

        return ['success' => true];
    }
}
