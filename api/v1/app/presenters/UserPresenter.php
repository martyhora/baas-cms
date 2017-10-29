<?php

namespace App\Presenters;

use App\Model;

class UserPresenter extends BasePresenter
{
    /** @var Model\JwtAuth @inject */
    public $jwtAuth;

    /** @var Model\User @inject */
    public $userModel;

    public function actionDefault()
    {
        $userData = $this->jwtAuth->getUserData($this->getHttpRequest()->getHeader('Authorization'));

        if (!$userData) {
            $this->sendJson(['success' => false]);
        }

        $user = $this->userModel->findRow($userData->id);

        if (!$user) {
            $this->sendJson(['success' => false]);
        }

        $userArray = $user->toArray();

        unset($userArray['password']);

        $this->sendJson(['success' => true, 'user' => $userArray]);
    }
}
