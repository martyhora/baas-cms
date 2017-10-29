<?php

namespace App\Presenters;

use App\Model;
use Nette\Security\AuthenticationException;

class AuthPresenter extends BasePresenter
{
    /** @var Model\User @inject */
    public $auth;

    public function actionDefault()
    {
        $input      = $this->getHttpRequest()->getRawBody();
        $parameters = json_decode($input, true);

        if (!is_array($parameters)) {
            $this->sendJson(['success' => false]);
        }

        try {
            $authResult = $this->auth->authenticate($parameters);

            $this->sendJson(['success' => true, 'authToken' => $authResult['authToken'], 'user' => $authResult['user']]);
        } catch (AuthenticationException $e) {
            $this->sendJson(['success' => false]);
        }
    }
}
