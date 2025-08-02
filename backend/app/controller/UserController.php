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

        public function getAll() {

            // Validamos el metodo HTTP
            Validador::validarMetodoHTTP('GET'); 

            $users = $this->userModel->getAll();

            if (!$users){
                RespuestaJSON::error('Error al enviar los usuarios'); 
                return; 
            }

            RespuestaJSON::exito('Exito', $users); 
        }

        public function validarLogin() {
            
            Validador::validarMetodoHTTP('POST'); 

            $camposValidos = Validador::validarCamposLoginUsuario(
                Security::sanitizeString($_POST["email"]),
                Security::sanitizeString($_POST["passwd"])
            ); 

            // validamos los campos del formulario de login
            if (!$camposValidos) {
                RespuestaJSON::error('Los campos no son validos'); 
                return; 
            }

            try {
                v::arrayType()
                    ->key('email', v::email()->notEmpty()->setName('correo'))
                    ->key('passwd', v::stringType()->length(5, null)->setName('Contraseña'))
                    ->assert($_POST);  

                // Comprobamos que el usuario existe 
                $user = Validador::existeUsuarioLogin(
                    $this->userModel->getAll(),
                    Security::sanitizeString($_POST["email"]),
                    Security::sanitizeString($_POST["passwd"])
                ); 

                $mensaje = $user ? 'Credenciales correctas' : 'Credenciales incorrectas'; 

                // Si no encuentra la cuenta se lo indicamos al usuario y termina el programa
                if (!$user) {
                    RespuestaJSON::error($mensaje);
                    return; 
                }

                
                // si encuentra el usuario comprobamos si es admin o usuario corriente 
                // $redirect = $_SESSION["rol"] !== 2 ? '/' : '/';

                //$this->mailService->enviarBienvenidaLogin($_POST["email"], $_SESSION["nombre_usuario"]);

                // Indicamos al JS que tooo ha ido con exito
                RespuestaJSON::exito($mensaje, null); 

            } catch (ValidationException $e) {
                // Devuelve todos los mensajes de error en un array simple
                $errores = $e->getMessage();
                RespuestaJSON::error("Errores de validación", $errores);
            }
        }

        public function validarRegistro() {
            
            Validador::validarMetodoHTTP('POST');

            $camposValidos = Validador::validarCamposRegistroUsuario(
                Security::sanitizeString($_POST["nombre"]), 
                Security::sanitizeString($_POST["email"]), 
                Security::sanitizeString($_POST["passwd"]), 
                Security::sanitizeString($_POST["tlf"])
            ); 

            if (!$camposValidos) {
                RespuestaJSON::error('Los campos no son validos'); 
                return; 
            }

            try {
                v::arrayType()
                    ->key('nombre', v::stringType()->length(3,15)->setName('username'))
                    ->key('email', v::email()->notEmpty()->setName('correo'))
                    ->key('passwd', v::stringType()->length(5, null)->setName('Contraseña'))
                    ->key('tlf', v::stringType()->length(9,9)->setName('tlf'))
                    ->assert($_POST);  

                $user = Validador::existelUsuarioRegistro(
                    $this->userModel->getAll(), 
                    Security::sanitizeString($_POST["email"])
                ); 

                if ($user) {
                    RespuestaJSON::error('Este usuario ya existe');  
                    return; 
                }

                Sessions::crearSesionLogueado();
                Sessions::crearSesionUsername($_POST["nombre"]);  
                Sessions::crearSesionEmail($_POST["email"]);
                Sessions::crearSesionIdUsuario($this->userModel->create(
                    [
                        'nombre' => $_POST["nombre"],
                        'email' => $_POST["email"],
                        'passwd' => password_hash($_POST["passwd"], PASSWORD_DEFAULT),
                        'tlf' => $_POST["tlf"],
                        'codigo_militar' => '',
                        'rol_id' => 1
                    ]
                ));

                // enviamos un email de bienvenida 
                // $this->mailService->enviarBienvenidaRegistro($_POST["email"], $_POST["nombre"]);

                // indicamos respuesta de exito
                RespuestaJSON::exito('Usuario creado', null);

            } catch (ValidationException $e) {
                // Devuelve todos los mensajes de error en un array simple
                $errores = $e->getMessage();
                RespuestaJSON::error("Errores de validación", $errores);
            }
        }

    }

?>