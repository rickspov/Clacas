const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos con headers anti-cache
app.use('/clacas', express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    // Para archivos HTML, no cachear
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
    // Para archivos JS y CSS, cachear por 1 año (tienen hash)
    else if (path.endsWith('.js') || path.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Para imágenes, cachear por 1 mes
    else if (path.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    }
  }
}));

// Ruta para servir el index.html
app.get('/clacas/*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ========================================
// CONFIGURACIÓN DE CORREO - CAMBIAR AQUÍ
// ========================================
// IMPORTANTE: Reemplaza 'rianroca313@gmail.com' con el correo personal deseado
const PSYCHOLOGIST_EMAIL = 'rianroca313@gmail.com'; // ← CAMBIAR ESTE CORREO
const PSYCHOLOGIST_NAME = 'Psic. Clara Castro González';
// ========================================

// Configuración del transportador de correo
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo Gmail
    pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación Gmail
  }
});

// Función para crear el correo de notificación al psicólogo
const createPsychologistEmail = (appointmentData) => {
  return {
    from: process.env.EMAIL_USER,
    to: PSYCHOLOGIST_EMAIL,
    subject: `Nueva cita presencial - ${appointmentData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #e8e1f1; padding-bottom: 10px;">
          Nueva Solicitud de Cita Presencial
        </h2>
        
        <h3 style="color: #374151;">Información del Paciente:</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 5px;">
            <strong>Nombre:</strong> ${appointmentData.name}
          </li>
          <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 5px;">
            <strong>Email:</strong> ${appointmentData.email}
          </li>
          <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 5px;">
            <strong>Teléfono:</strong> ${appointmentData.phone}
          </li>
          <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 5px;">
            <strong>Tipo de Cita:</strong> ${appointmentData.appointmentType}
          </li>
          ${appointmentData.preferredDate ? `
          <li style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 5px;">
            <strong>Fecha Preferida:</strong> ${appointmentData.preferredDate}
          </li>
          ` : ''}
        </ul>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8e1f1; border-radius: 5px;">
          <p style="margin: 0; color: #374151;">
            <strong>Nota:</strong> Este es un mensaje automático. Por favor, contacta al paciente para confirmar la cita.
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Enviado desde el formulario web de ${PSYCHOLOGIST_NAME}</p>
        </div>
      </div>
    `
  };
};

// Función para crear el correo de confirmación al paciente
const createPatientEmail = (appointmentData) => {
  return {
    from: process.env.EMAIL_USER,
    to: appointmentData.email,
    subject: 'Confirmación de solicitud de cita - Psic. Clara Castro González',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8b5cf6; margin: 0;">CLACAS</h1>
          <h2 style="color: #374151; margin: 10px 0;">Psic. Clara Castro González</h2>
        </div>
        
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #e8e1f1; padding-bottom: 10px;">
          ¡Hola ${appointmentData.name}!
        </h2>
        
        <p style="color: #374151; line-height: 1.6;">
          Hemos recibido tu solicitud de cita presencial. Gracias por confiar en nosotros para tu bienestar emocional.
        </p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Resumen de tu solicitud:</h3>
          <ul style="color: #374151; line-height: 1.8;">
            <li><strong>Nombre:</strong> ${appointmentData.name}</li>
            <li><strong>Email:</strong> ${appointmentData.email}</li>
            <li><strong>Teléfono:</strong> ${appointmentData.phone}</li>
            <li><strong>Tipo de cita:</strong> ${appointmentData.appointmentType}</li>
            ${appointmentData.preferredDate ? `<li><strong>Fecha preferida:</strong> ${appointmentData.preferredDate}</li>` : ''}
          </ul>
        </div>
        
        <div style="background: #e8e1f1; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Próximos pasos:</h3>
          <ol style="color: #374151; line-height: 1.8;">
            <li>Revisaremos tu solicitud en las próximas 24 horas</li>
            <li>Te contactaremos para confirmar la fecha y hora exacta</li>
            <li>Te enviaremos las instrucciones para llegar a la consulta</li>
          </ol>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Información de contacto:</h3>
          <p style="color: #374151; margin: 5px 0;">
            <strong>Email:</strong> claracastrog@gmail.com
          </p>
          <p style="color: #374151; margin: 5px 0;">
            <strong>Teléfono:</strong> (809) 902-1479
          </p>
          <p style="color: #374151; margin: 5px 0;">
            <strong>Ubicaciones:</strong> Nudah (mañanas) y Bodhi (tardes)
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #8b5cf6; color: white; border-radius: 10px;">
          <p style="margin: 0; font-size: 18px;">
            ¡Esperamos verte pronto!
          </p>
          <p style="margin: 10px 0 0 0; font-size: 14px;">
            Psic. Clara Castro González
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        </div>
      </div>
    `
  };
};

// Endpoint para enviar correos de cita
app.post('/api/send-appointment-email', async (req, res) => {
  try {
    const appointmentData = req.body;
    
    // Validación básica
    if (!appointmentData.name || !appointmentData.email || !appointmentData.phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Faltan campos requeridos' 
      });
    }
    
    // Enviar correo al psicólogo
    const psychologistEmail = createPsychologistEmail(appointmentData);
    await transporter.sendMail(psychologistEmail);
    
    // Enviar correo de confirmación al paciente
    const patientEmail = createPatientEmail(appointmentData);
    await transporter.sendMail(patientEmail);
    
    res.json({ 
      success: true, 
      message: 'Correos enviados exitosamente' 
    });
    
  } catch (error) {
    console.error('Error enviando correos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar los correos. Por favor, intenta nuevamente.' 
    });
  }
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Correo del psicólogo configurado: ${PSYCHOLOGIST_EMAIL}`);
}); 