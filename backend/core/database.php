<?php
namespace Core;

use PDO; 
use PDOException; 
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $dbName = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];

        try {
            $this->pdo = new PDO(
                "mysql:host=$host;dbname=$dbName;charset=utf8",
                $user,
                $password
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }
}

Database::getInstance()->getConnection(); 