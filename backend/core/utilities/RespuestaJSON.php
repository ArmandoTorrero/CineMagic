<?php 

    namespace Core\Utilities;

    class RespuestaJSON {
        /**
         * Envía una respuesta de éxito
         * 
         * @param string $mensaje Mensaje descriptivo
         * @param mixed $datos Datos adicionales (opcional)
         * @return void
         */
        public static function exito($mensaje, $datos = null, $redirect = null) {
            self::enviarRespuesta(true, $mensaje, $datos, $redirect);
        }

        /**
         * Envía una respuesta de error
         * 
         * @param string $mensaje Mensaje descriptivo del error
         * @param mixed $datos Datos adicionales (opcional)
         * @return void
         */
        public static function error($mensaje, $datos = null, $redirect = null) {
            self::enviarRespuesta(false, $mensaje, $datos, $redirect);
        }

        /**
         * Construye y envía la respuesta JSON
         * 
         * @param bool $exito Indica si la operación fue exitosa
         * @param string $mensaje Mensaje descriptivo
         * @param mixed $datos Datos adicionales
         * @return void
         */
        private static function enviarRespuesta($exito, $mensaje, $datos = null, $redirect = null) {
            // Cabeceras para respuesta JSON
            header('Content-Type: application/json');

            // Estructura base de la respuesta
            $respuesta = [
                'exito' => $exito,
                'mensaje' => $mensaje
            ];

            // Añadir datos si existen
            if ($datos !== null) {
                $respuesta['datos'] = $datos;
            }

            // Añadir redirección si existe
            if ($redirect !== null) {
                $respuesta['redirect'] = $redirect;
            }

            // Enviar respuesta y terminar ejecución
            echo json_encode($respuesta);
            
        }
    }


?>