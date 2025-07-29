<?php 

    namespace Core\Services;

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    class EmailService{

        private $mail; 

        public function __construct() {
            $this->mail = new PHPMailer(true);
            $this->configurarSMTP();
        }

        /**
        * Configuración SMTP (cambia por tus datos)
        */
        private function configurarSMTP() {
            $this->mail->isSMTP();
            $this->mail->Host = 'smtp.gmail.com'; // Para Gmail
            $this->mail->SMTPAuth = true;
            $this->mail->Username = 'armando.torrero.05@gmail.com'; // Tu correo
            $this->mail->Password = $_ENV['EMAIL_PASSWORD']; // Contraseña de aplicación
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mail->Port = 587;
            
            // Configuración adicional
            $this->mail->setFrom('armando.torrero.05@gmail.com', 'CampoLibre');
            $this->mail->isHTML(true);
            $this->mail->CharSet = 'UTF-8';
        }

        /**
        * Enviar correo simple
        * @param string $destinatario
        * @param string $asunto
        * @param string $mensaje
        * @return bool
        */
        public function enviarCorreo($destinatario, $asunto, $mensaje) {
            try {
                $this->mail->addAddress($destinatario);
                $this->mail->Subject = $asunto;
                $this->mail->Body = $mensaje;
                
                $resultado = $this->mail->send();
                $this->mail->clearAddresses(); // Limpiar destinatarios para próximo envío
                
                return $resultado;
                
            } catch (Exception $e) {
                throw new Exception("Error enviando correo: " . $this->mail->ErrorInfo);
            }
        }

        /**
        * Enviar correo de bienvenida para nuevo registro
        * @param string $email
        * @param string $nombre
        * @return bool
        */
        public function enviarBienvenidaRegistro($email, $nombre) {
            $plantilla = '
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4CAF50;">¡Bienvenido a CampoLibre!</h1>
                    <p>Hola <strong>' . $nombre . '</strong>,</p>
                    <p>Tu cuenta ha sido creada exitosamente. Ya puedes comenzar a disfrutar de todos nuestros servicios.</p>
                    <p>Datos de tu cuenta:</p>
                    <ul>
                        <li><strong>Email:</strong> ' . $email . '</li>
                        <li><strong>Nombre:</strong> ' . $nombre . '</li>
                    </ul>
                    <p>¡Gracias por unirte a nosotros!</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">Este es un correo automático, por favor no responder.</p>
                </div>
            ';
            
            return $this->enviarCorreo($email, '¡Bienvenido a CampoLibre!', $plantilla);
        }

        /**
         * Enviar correo de bienvenida para login normal
         * @param string $email
         * @param string $nombre
         * @return bool
         */
        public function enviarBienvenidaLogin($email, $nombre) {
            $fechaActual = date('d \d\e F \d\e Y');
            $horaActual = date('H:i');
            
            $plantilla = '
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #28a745; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">¡Bienvenido de vuelta!</h1>
                    </div>
                    
                    <div style="padding: 30px;">
                        <p>Hola <strong>' . $nombre . '</strong>,</p>
                        
                        <p>Has iniciado sesión exitosamente en tu cuenta de <strong>CampoLibre</strong>.</p>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
                            <h3 style="color: #28a745; margin-top: 0;">Detalles del acceso:</h3>
                            <p style="margin: 5px 0;"><strong>📧 Email:</strong> ' . $email . '</p>
                            <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ' . $fechaActual . '</p>
                            <p style="margin: 5px 0;"><strong>🕐 Hora:</strong> ' . $horaActual . '</p>
                            <p style="margin: 5px 0;"><strong>🔐 Método:</strong> Login tradicional</p>
                        </div>
                        
                        <p>¿Qué puedes hacer ahora?</p>
                        <ul>
                            <li>🏟️ Reservar pistas deportivas</li>
                            <li>👤 Actualizar tu perfil</li>
                            <li>📋 Ver tu historial de reservas</li>
                        </ul>
                        
                        <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #0c5460;"><strong>💡 Consejo:</strong> Si no fuiste tú quien inició sesión, por favor cambia tu contraseña inmediatamente por seguridad.</p>
                        </div>
                        
                        <p>¡Disfruta de tu tiempo en CampoLibre!</p>
                        
                        <p style="margin-top: 30px;">
                            Saludos,<br>
                            <strong>El equipo de CampoLibre</strong>
                        </p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #ddd;">
                        <p style="margin: 0; font-size: 12px; color: #666;">Este es un correo automático, por favor no responder directamente.</p>
                    </div>
                </div>
            ';
            
            return $this->enviarCorreo($email, 'Sesión iniciada en CampoLibre - ' . $fechaActual, $plantilla);
        }

        /**
        * Enviar correo de bienvenida para login con Google
        * @param string $email
        * @param string $nombre
        * @return bool
        */
        public function enviarBienvenidaGoogle($email, $nombre) {
            $plantilla = '
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4285F4;">¡Bienvenido a CampoLibre!</h1>
                    <p>Hola <strong>' . $nombre . '</strong>,</p>
                    <p>Has iniciado sesión exitosamente usando tu cuenta de Google.</p>
                    <p>Tu cuenta se ha vinculado automáticamente con los siguientes datos:</p>
                    <ul>
                        <li><strong>Email:</strong> ' . $email . '</li>
                        <li><strong>Nombre:</strong> ' . $nombre . '</li>
                        <li><strong>Método de acceso:</strong> Google OAuth</li>
                    </ul>
                    <p>¡Disfruta de la experiencia en nuestra plataforma!</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">Este es un correo automático, por favor no responder.</p>
                </div>
            ';
            
            return $this->enviarCorreo($email, 'Acceso con Google - CampoLibre', $plantilla);
        }

        /**
         * Enviar correo de confirmación de reserva
         * @param string $email
         * @param string $nombre
         * @param string $fecha (formato: Y-m-d)
         * @param string $hora (formato: H:i)
         * @param string $nombrePista (opcional)
         * @return bool
         */
        public function enviarConfirmacionReserva($email, $nombre, $fecha, $hora, $nombrePista = 'Pista deportiva') {
            // Formatear la fecha para mostrarla más amigable
            $fechaFormateada = date('d \d\e F \d\e Y', strtotime($fecha));
            $horaFormateada = date('H:i', strtotime($hora));
            
            $plantilla = '
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #2E7D32; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">¡Reserva Confirmada!</h1>
                    </div>
                    
                    <div style="padding: 30px;">
                        <p>Hola <strong>' . $nombre . '</strong>,</p>
                        
                        <p>Tu reserva ha sido <strong style="color: #2E7D32;">confirmada exitosamente</strong>.</p>
                        
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h2 style="color: #2E7D32; margin-top: 0;">Detalles de tu reserva:</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">📍 Pista:</td>
                                    <td style="padding: 8px 0;">' . $nombrePista . '</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">📅 Fecha:</td>
                                    <td style="padding: 8px 0;">' . $fechaFormateada . '</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">🕐 Hora:</td>
                                    <td style="padding: 8px 0;">' . $horaFormateada . '</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">👤 Reservado por:</td>
                                    <td style="padding: 8px 0;">' . $nombre . '</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #856404;"><strong>Importante:</strong> Por favor, llega 10 minutos antes de tu hora reservada. Recuerda traer tu equipamiento deportivo.</p>
                        </div>
                        
                        <p>Si necesitas cancelar o modificar tu reserva, por favor contacta con nosotros lo antes posible.</p>
                        
                        <p>¡Nos vemos en la cancha!</p>
                        
                        <p style="margin-top: 30px;">
                            Saludos,<br>
                            <strong>El equipo de CampoLibre</strong>
                        </p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #ddd;">
                        <p style="margin: 0; font-size: 12px; color: #666;">Este es un correo automático, por favor no responder directamente.</p>
                    </div>
                </div>
            ';
            
            return $this->enviarCorreo($email, 'Reserva confirmada - ' . $fechaFormateada . ' a las ' . $horaFormateada, $plantilla);
        }
    }
?>