<?php

namespace Core\utilities;

use Core\utilities\Sessions;
use Core\Utilities\RespuestaJSON;

class Validador
{
    /**
     * Validar el método HTTP
     * @param mixed $metodo
     * @return void
     */
    public static function validarMetodoHTTP($metodo) {
        if ($_SERVER['REQUEST_METHOD'] !== strtoupper($metodo)) {
            http_response_code(405); // Método no permitido
            RespuestaJSON::error("Metodo no permitido");
            exit;
        }
    }

    /**
     * Validar nombre
     * @param mixed $nombre
     * @return bool
     */
    public static function validarNombre($nombre)
    {
        $patter_nombre = '/^[a-zA-Z0-9]{3,15}$/';

        if (empty($nombre)) {
            return false;
        } else {
            if (!preg_match($patter_nombre, $nombre)) {
                return false;
            } else {
                return true;
            }
        }
    }

    /**
     * Validar email
     * @param mixed $correo
     * @return bool
     */
    public static function validarEmail($correo)
    { // funcion para validar email
        if (empty($correo)) {
            return false;
        } else {
            if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                return false;
            } else {
                return true;
            }
        }
    }

    /**
     * Validar dirección
     * @param mixed $direccion
     * @return bool
     */
    public static function validarDireccion($direccion)
    {
        $pattern_direccion = '/^[a-zA-Z0-9]{5,}$/';
        if (empty($direccion)) {
            return false;
        } else {
            if (!preg_match($pattern_direccion, $direccion)) {
                return false;
            } else {
                return true;
            }
        }
    }

    /**
     * Validar numero de télefono
     * @param mixed $n_telefono
     * @return bool
     */
    public static function validarTelefono($n_telefono)
    {
        $pattern_telefono = '/^[0-9]{9}$/';
        if (empty($n_telefono)) {
            return false;
        } else {
            if (!preg_match($pattern_telefono, $n_telefono)) {
                return false;
            } else {
                return true;
            }
        }
    }

    /**
     * Validar contraseña
     * @param mixed $password
     * @return bool
     */
    public static function validarPassword($password)
    {
        $pattern_passwd = '/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]{5,}$/'; // Permitir caracteres especiales
        if (!preg_match($pattern_passwd, $password)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Validar el hash de la contraseña
     * @param mixed $password
     * @param mixed $password_hash
     * @return bool
     */
    public static function validarHash($password, $password_hash)
    {
        return password_verify($password, $password_hash);
    }


    /**
     * Validar los inputs de la pagina de registro
     * @param mixed $userName
     * @param mixed $correo
     * @param mixed $password
     * @param mixed $telefono
     * @return bool
     */
    public static function validarCamposRegistroUsuario($userName, $correo, $password, $telefono)
    {
        return (self::validarNombre($userName) && self::validarEmail($correo) && self::validarPassword($password) && self::validarTelefono($telefono));
    }

    /**
     * Comprobar si el email introducido en el registro ya existe
     * @param array $array_usuarios
     * @param string $correo
     * @return bool
     */
    public static function existelUsuarioRegistro(array $array_usuarios, string $correo): bool
    {
        foreach ($array_usuarios as $usuario) {
            if ($usuario['email'] === $correo) {
                return true; // Email duplicado.
            }
        }
        return false;
    }

    /**
     * Validar los inputs de la pagina de login
     * @param mixed $correo
     * @param mixed $password
     * @return bool
     */
    public static function validarCamposLoginUsuario($correo, $password)
    {
        return self::validarEmail($correo) && self::validarPassword($password);
    }

    /**
     * Comprobar que el usuario existe al insertar los campos en el login 
     * @param mixed $array_usuarios
     * @param mixed $correo
     * @param mixed $password
     * @return bool
     */
    public static function existeUsuarioLogin($array_usuarios, $correo, $password)
    {
        foreach ($array_usuarios as $usuario) {
            if ($usuario['email'] == $correo && password_verify($password, $usuario['passwd'])) {
                Sessions::crearSesionLogueado();
                Sessions::crearSesionIdUsuario($usuario['id']);
                Sessions::crearSesionUsername($usuario['nombre']);
                Sessions::crearSesionEmail($usuario['email']);
                Sessions::crearSesionRol($usuario['rol_id']);
                return true;
            }
        }
        return false;
    }

    /**
     * Validar los inputs al editar un ususario
     * @param mixed $userName
     * @param mixed $correo
     * @param mixed $telefono
     * @return bool
     */
    public static function validarCamposEditarUsuario($userName, $correo, $telefono)
    {
        return (self::validarNombre($userName) && self::validarEmail($correo) && self::validarTelefono($telefono));
    }

    /**
     * Validar numero de tarjeta
     * @param mixed $numTarjeta
     * @return bool|int
     */
    public static function validarNumTarjeta($numTarjeta)
    {
        $patterTarjeta = '/^\d{4} ?\d{4} ?\d{4} ?\d{1,7}$/';
        return preg_match($patterTarjeta, $numTarjeta);
    }

    /**
     * Validar fecha de expiración de la tarjeta 
     * @param mixed $fecha
     * @return bool|int
     */
    public static function validarFechaTarjeta($fecha)
    {
        $patterFecha = '/^(0[1-9]|1[0-2])\/\d{2}$/';
        return preg_match($patterFecha, $fecha);
    }

    /**
     * Validar CVC
     * @param mixed $cvc
     * @return bool|int
     */
    public static function validarCVC($cvc)
    {
        $patterCVC = '/^\d{3}$/';
        return preg_match($patterCVC, $cvc);
    }

    /**
     * validar titular de la tarjeta
     * @param mixed $titular
     * @return bool|int
     */
    public static function validarTitular($titular)
    {
        $patterTitular = '/^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{2,50}$/i';
        return preg_match($patterTitular, $titular);
    }

    /**
     * Validar los inputs de la tarjeta de credito
     * @param mixed $numTarjeta
     * @param mixed $fecha
     * @param mixed $cvc
     * @param mixed $titular
     * @return bool
     */
    public static function validarCamposTarjetaCredito($numTarjeta, $fecha, $cvc, $titular)
    {
        return self::validarNumTarjeta($numTarjeta) && self::validarFechaTarjeta($fecha) && self::validarCVC($cvc) && self::validarTitular($titular);
    }

    /**
     * Validar que la fecha sea actual
     * @param mixed $fecha
     * @return bool
     */
    public static function validarFechaHorario($fecha)
    {
        $fechaActual = date('Y-m-d'); // Obtener la fecha actual en formato YYYY-MM-DD
        $patter_fecha = '/^\d{4}-\d{2}-\d{2}$/'; // Validar formato de fecha YYYY-MM-DD

        if (!preg_match($patter_fecha, $fecha)) {
            return false; // Formato de fecha inválido
        }

        if ($fecha < $fechaActual) {
            return false; // La fecha es anterior a la fecha actual
        }

        return true; // La fecha es válida
    }

    public static function validarNombrePistaDeportiva($nombrePista)
    {
        $patter_nombre = '/^\s*[a-zA-Z0-9\s]+\s*$/'; // Permite espacios en blanco al inicio, final y entre palabras
        return preg_match($patter_nombre, $nombrePista);
    }

    /**
     * Validar el precio de un campo
     * @param mixed $precio
     * @return bool
     */
    public static function validarPrecioCampo($precio)
    {
        $pattern_precio = '/^([0-9]{2})$/'; // Formato NN, número exacto entre 01 y 99

        if (preg_match($pattern_precio, $precio)) {
            $entero = (int)$precio;

            if ($entero >= 1 && $entero <= 99) {
                return true; // Precio válido
            }
        }

        return false; // Precio inválido
    }
}
