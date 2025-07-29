<?php 
    namespace App\Controller;
    
    use App\Model\User;
    use Core\Services\GoogleAuth;
    use Core\Utilities\RespuestaJSON;
    use Core\Utilities\Security;
    use Core\utilities\Sessions;
    use Core\utilities\Validador;
    use Exception;
    use Symfony\Component\Security\Csrf\CsrfTokenManager;
    use Symfony\Component\Security\Csrf\CsrfToken;
    use Respect\Validation\Validator as v;
    use \Respect\Validation\Exceptions\ValidationException; 
    use Core\Services\EmailService; 

    class UserController{
        private $userModel; 
        private $googleAuth; 
        private $mailService;
    
        public function __construct() {
            $this->userModel = new User();
            $this->googleAuth = new GoogleAuth();
            $this->mailService = new EmailService();
        }

        

    }

?>