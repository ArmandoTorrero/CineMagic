<?php 
    namespace App\Model;

    use Core\EmptyModel; 

    class User extends EmptyModel{
        public function __construct() {
            parent::__construct('usuario'); 
        }
    }
?>