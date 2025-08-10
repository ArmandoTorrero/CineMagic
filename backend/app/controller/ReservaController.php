<?php 
    namespace App\Controller;

    use App\Model\Reserva;
    use Core\Services\EmailService;
    use Core\Utilities\RespuestaJSON;
    use Core\utilities\Validador;

    class ReservaController{
        private $reservaModel; 
        private $emailService; 

        public function __construct() {
            $this->reservaModel = new Reserva();
            $this->emailService = new EmailService();
        }

        public function validarReserva()  {
            
            Validador::validarMetodoHTTP('POST'); 

            // if(!$_SESSION["logueado"]){
            //     RespuestaJSON::error('Inicia sesión para realizar la reserva');
            //     return; 
            // } 

            $camposValidos = Validador::validarCamposTarjetaCredito(
                $_POST["numTarjeta"],
                $_POST["expiracion"], 
                $_POST["cvc"], 
                $_POST["titular"] 
            ); 

            if(!$camposValidos){
                RespuestaJSON::error('Los datos no son validos'); 
                return; 
            };

            RespuestaJSON::exito('Reserva realizada con exito'); 

        }
    }

?>