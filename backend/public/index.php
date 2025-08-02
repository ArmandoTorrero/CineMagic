<?php 
    session_start(); 

    // CORS para permitir llamadas desde React
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    require_once __DIR__ . '/../vendor/autoload.php'; 

    use Dotenv\Dotenv;
    use Core\Router;

    $dotenv = Dotenv::createImmutable(__DIR__ . '/..'); 
    $dotenv->load();

    // mostrar errores en despliegue
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    // instanciamos la clase router
    $router = new Router(); 

    // RUTAS QUE MANDAN JSON_ENCODE
    $router->add('/usuario/hola', 'UserController@hola');
    $router->add('/usuario/usuarios', 'UserController@getAll'); 
    $router->add('/usuario/validarLogin', 'UserController@validarLogin');
    $router->add('/usuario/validarRegistro', 'UserController@validarRegistro');
    $router->add('/usuario/cerrarSesion', 'UserController@cerrarSesion');
    $router->add('/usuario/googleLogin', 'UserController@googleLogin'); 
    $router->add('/usuario/googleCallback', 'UserController@googleCallback');

    $requestURI = isset($_GET['url']) ? '/' . trim($_GET['url'], '/') : '/';
    $router->dispatch($requestURI)

?>