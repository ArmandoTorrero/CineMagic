<?php 

    namespace Core\utilities;   
    class Sessions{

        /**
         * Crear sesion para saber si el usuario esta logueado
         * @return void
         */
        public static function crearSesionLogueado()   {
            $_SESSION['logueado'] = true; 
        }

        /**
         * Crear sesión para el nombre de usuario
         * @param mixed $username
         * @return void
         */
        public static function crearSesionUsername($username) {
            $_SESSION['nombre_usuario'] = $username; 
        }

        /**
         * Crear sesión para el email del usuario
         * @param [type] $email
         * @return void
         */
        public static function crearSesionEmail($email) {
            $_SESSION['email'] = $email; 
        }

        /**
         * Crear sesion para el rol del usuario
         * @param mixed $id_rol
         * @return void
         */
        public static function crearSesionRol($id_rol) {
            $_SESSION['rol'] = $id_rol; 
        }

        /**
         * Crear sesion para el id del usuario
         * @param mixed $id
         * @return void
         */
        public static function crearSesionIdUsuario($id) {
            $_SESSION['id_usuario'] = $id; 
        }

        /**
         * Crear sesion para el id del campo
         * @param mixed $id
         * @return void
         */
        public static function crearSesionIdCampo($id) {
            $_SESSION['id_campo'] = $id;  
        }

        /**
         * Crear sesion para el id de la franja horaria
         * @param mixed $id
         * @return void
         */
        public static function crearSesionFranjaHorariaId($id) {
            $_SESSION['id_horario'] = $id; 
        }
    }

?>