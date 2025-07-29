<?php 
    namespace Core\Services;

    use Google_Client;
    use Google_Service_Oauth2;
    use Exception; 

    class GoogleAuth{
        private $clientId;
        private $clientSecret;
        private $redirectUri;
        private $client;

        public function __construct() {

            $this->clientId = $_ENV['CLIENT_ID'];
            $this->clientSecret = $_ENV['CLIENT_SECRET'];
            $this->redirectUri = 'http://localhost/CampoLibre/public/googleCallback';

            $this->initializeClient(); 
        }

        private function initializeClient() {
            $this->client = new Google_Client();
            $this->client->setClientId($this->clientId);
            $this->client->setClientSecret($this->clientSecret);
            $this->client->setRedirectUri($this->redirectUri);
            $this->client->addScope('email');
            $this->client->addScope('profile');
        }

        /**
        * Redirige al usuario a Google para autenticación
        */
        public function redirectToGoogle() {
            $authUrl = $this->client->createAuthUrl();
            header('Location: ' . $authUrl);
            exit;
        }

        /**
         * Maneja la respuesta de Google después de la autenticación
         * @param string $code - Código de autorización enviado por Google
         * @return array - Datos del usuario de Google
         * @throws Exception
         */
        public function handleCallback($code) {

            if (!$this->validateCode($code)) {
                throw new Exception('Código de autorización inválido');
            }

            $httpClient = new \GuzzleHttp\Client([
                'verify' => false
            ]);
            $this->client->setHttpClient($httpClient);
            
            try {
                // Intercambiar código por token de acceso
                $token = $this->client->fetchAccessTokenWithAuthCode($code);
                
                if (isset($token['error'])) {
                    throw new Exception('Error obteniendo token: ' . $token['error']);
                }
                
                $this->client->setAccessToken($token['access_token']);
                
                // Obtener información del usuario
                return $this->getUserInfo();
                
            } catch (Exception $e) {
                throw new Exception('Error en la autenticación con Google: ' . $e->getMessage());
            }
        }

        /**
         * Obtiene la información del usuario desde Google
         * @return array - Datos del usuario
         * @throws Exception
         */
        private function getUserInfo() {
            
            try {
                $googleService = new Google_Service_Oauth2($this->client);
                $googleUser = $googleService->userinfo->get();
                
                return $googleUser; 
                
            } catch (Exception $e) {
                throw new Exception('Error obteniendo datos del usuario: ' . $e->getMessage());
            }
        }



        /**
         * Valida que el código de autorización no esté vacío
         * @param string $code
         * @return bool
         */
        private function validateCode($code) {
            return !empty($code) && is_string($code);
        }


    }

?>