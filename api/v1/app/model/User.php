<?php

namespace App\Model;

use Nette\Security\AuthenticationException;
use Nette\Security\IAuthenticator;
use Nette\Security\Passwords;

class User extends BaseRepository implements IAuthenticator
{
    protected $tableName = 'user';

    /** @var JwtAuth */
    private $jwtAuth;

    public function __construct(\Nette\Database\Context $database, JwtAuth $jwtAuth)
    {
        parent::__construct($database);

        $this->jwtAuth = $jwtAuth;
    }

    public function authenticate(array $credentials)
    {
        $username = $credentials['username'];
        $password = $credentials['password'];

        $user = $this->findBy(['username' => $username])->fetch();

        if (!$user) {
            throw new AuthenticationException('Wrong authentication credentials');
        }

        if (!Passwords::verify($password, $user->password)) {
            throw new AuthenticationException('Invalid password.');
        }

        $userArray = $user->toArray();

        unset($userArray['password']);

        return ['authToken' => $this->jwtAuth->createToken($userArray), 'user' => $userArray];
    }
}