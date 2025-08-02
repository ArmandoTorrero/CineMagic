<?php 
    namespace App\Model;

    use Core\EmptyModel;
    use Exception;
    use PDO;
    use PDOException;

    class User extends EmptyModel{
        public function __construct() {
            parent::__construct('usuario'); 
        }

        public function getByEmail($email) 
        {
            try {
                $sql = "SELECT * FROM usuario WHERE email = :email";
                $stmt = $this->db->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
                return $stmt->fetch(PDO::FETCH_ASSOC);
            
            } catch (PDOException $e) {
                throw new Exception("Error" . $e->getMessage()); 
            }
            
        }
    }
?>