<?php

namespace App\Model;

interface IRepository
{
    public function findAll();

    public function findRow($id);

    public function findBy(array $where);

    public function insert($data);

    public function delete($id);

    public function save($data, $id = null);

    public function findRows($filter, $order);
}