<?php 

    session_start(); 
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

    $requestURI = isset($_GET['url']) ? '/' . trim($_GET['url'], '/') : '/';
    $router->dispatch($requestURI)

?>