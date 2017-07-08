<?php

namespace App\Model;

use Nette;

abstract class BaseRepository extends Nette\Object implements IRepository
{
    /** @var string Table name */
    protected $tableName;

    /** @var Nette\Database\Connection */
    protected $database;

    protected $defaultOrder = ['id', 'DESC'];
    
    protected $filterColumns = [
        'like'  => [],
        'equal' => [],
    ];

    public function __construct(\Nette\Database\Context $database)
    {
        $this->database = $database;
    }

    public function getTableName()
    {
        return $this->tableName;
    }

    protected function getTable()
    {
        return $this->database->table($this->tableName);
    }

    public function findAll()
    {
        return $this->getTable();
    }

    public function findRow($id)
    {
        return $this->getTable()->get($id);
    }

    public function findBy(array $where)
    {
        return $this->getTable()->where($where);
    }

    public function insert($data)
    {
        return $this->getTable()->insert($data);                
    }        

    public function delete($id)
    {
        return $this->findBy([$this->getTable()->getPrimary() => $id])->delete();
    }

    public function save($data, $id = null)
    {
        $id = (int) $id;

        if ($id === 0) {
            $row = $this->insert($data);
        } else {
            $row = $this->findRow($id);

            $row->update($data);
        }

        return $row;
    }

    public function findRows($filter, $order)
    {
        $filters = [];

        foreach ($filter as $column => $value)
        {
            if (!empty($this->filterColumns['like']) && in_array($column, $this->filterColumns['like']))
            {
                $filters[$column . ' LIKE ?'] = "%{$value}%";
            }
            elseif (!empty($this->filterColumns['equal']) && in_array($column, $this->filterColumns['equal']))
            {
                $filters[$column] = $value;
            }
        }

        if (empty($order[0]))
        {
            $order = $this->defaultOrder;
        }

        $rows = $this->findAll()
            ->where($filters)
            ->order(implode(' ', $order));

        return $rows;
    }
}
