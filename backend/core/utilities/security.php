<?php

    namespace Core\Utilities;
    use Core\Utilities\RespuestaJSON; 
    class Security{
        
        /**
         * Comprobar la incatividad del usuario
         * @return void
         */
        public static function comprobarInactividad() { // funcion para comprobar la inactividad de un usuario
            $inactividad = 600; 

            if (isset($_SESSION["timeout"])) {
                $sessionTTl = time() - $_SESSION["timeout"]; 
                if ($sessionTTl > $inactividad) {
                    session_destroy(); 
                    header('Location: /TFG/'); 
                }
            } 

            $_SESSION["timeout"] = time(); 
        }
        public static function userLogged($logged) { // comprobar si el usuario ha iniciado sesion
            if (isset($logged) && $logged) {
                session_regenerate_id(); 
            }else {
                header('');  
                exit; 
            }
        }

        /**
         * Redirigir al usuario a un destino
         * @param mixed $destino
         * @return void
         */
        public static function redirigir($destino) {
            header("Location: /CampoLibre/public/$destino"); 
        }

        /**
         * Comprobar que el usuario este logueado
         * @return bool
         */
        public static function estaLogueado() {
            return (isset($_SESSION["logueado"]) && $_SESSION["logueado"]) ? true : false; 
        }

        /**
         * Limpiar los input de posibles codigo malicioso
         * @param mixed $input
         * @return string
         */
        public static function sanitizeString($input) {
            return htmlspecialchars(strip_tags(trim($input)));
        }
        
    }

?>