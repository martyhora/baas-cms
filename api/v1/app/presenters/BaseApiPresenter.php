<?php

namespace App\Presenters;
use App\Model\IApiRepository;
use Nette\Application\BadRequestException;
use Nette\Database\Table\ActiveRow;
use Nette\Http\IRequest;

/**
 * Base API presenter for all application presenters.
 */
abstract class BaseApiPresenter extends BasePresenter implements IApiPresenter
{
    /** @var IApiRepository */
    public $apiRepository;

    public function actionDefault()
    {
        $method = $this->request->getMethod();

        switch ($method) {
            case IRequest::POST:
                $input      = $this->getHttpRequest()->getRawBody();
                $parameters = json_decode($input, true);

                $this->sendJson($this->processPostRequest($parameters));
                break;

            case IRequest::GET:
                $parameters = $this->request->getParameters();

                $this->sendJson($this->processGetRequest($parameters, isset($parameters['id']) ? $parameters['id'] : null));
                break;

            case IRequest::PUT:
                $input      = $this->getHttpRequest()->getRawBody();
                $parameters = json_decode($input, true);

                $id = $this->getParameter('id');

                if (!$id) {
                    throw new BadRequestException('V PUT requestu chybí parameter ID.');
                }

                $this->sendJson($this->processPutRequest($parameters, $id));
                break;
        }
    }

    public function processPostRequest(array $parameters)
    {
        try {
            $result = $this->apiRepository->save($parameters);

            if ($result instanceof ActiveRow) {
                return ['success' => true];
            }

            return ['success' => false, 'errors' => $result];
        } catch (\PDOException $e) {
            return ['success' => false, 'errors' => ['Zápis dat do databáze selhal.']];
        }
    }

    public function processGetRequest(array $parameters, $id = null)
    {
        if ($id === null) {
            return $this->apiRepository->fetchRowsForApi();
        }

        $response = $this->apiRepository->fetchRowForApi($id);

        if (!$response) {
            return ['success' => false, 'errors' => ["Záznam s ID {$id} nebyl nalezen."]];
        }

        return $response;
    }

    public function processPutRequest(array $parameters, $id)
    {
        try {
            $result = $this->apiRepository->save($parameters, $id);

            if ($result instanceof ActiveRow) {
                return ['success' => true];
            }

            return ['success' => false, 'errors' => $result];
        } catch (\PDOException $e) {
            return ['success' => false, 'errors' => ['Zápis dat do databáze selhal.']];
        }
    }
}
