<?php

namespace App\Presenters;
use Nette\Application\BadRequestException;
use Nette\Http\IRequest;

/**
 * Base API presenter for all application presenters.
 */
abstract class BaseApiPresenter extends BasePresenter implements IApiPresenter
{
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
}
