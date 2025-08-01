# Sitio Web - Psic. Clara Castro González

Sitio web profesional para la psicóloga Clara Castro González, desarrollado con React, Tailwind CSS y funcionalidad de envío de correos.

## 🚀 Características

- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Formulario de Citas**: Con validación y envío automático de correos
- **Secciones Completas**: Hero, Sobre mí, Servicios, FAQ, Blog, Consultas Presenciales
- **Envío de Correos**: Notificación automática al psicólogo y confirmación al paciente
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 📧 Configuración de Correos

### 1. Configurar Gmail para Envío de Correos

Para que el sistema de correos funcione, necesitas configurar una contraseña de aplicación en Gmail:

1. **Habilitar verificación en 2 pasos** en tu cuenta de Gmail
2. **Generar contraseña de aplicación**:
   - Ve a Configuración de Google Account
   - Seguridad → Verificación en 2 pasos → Contraseñas de aplicación
   - Genera una nueva contraseña para "Correo"
3. **Usar la contraseña generada** en el archivo `.env`

### 2. Archivo de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Configuración de correo Gmail
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

# Puerto del servidor
PORT=5000
```

### 3. Cambiar Correo del Psicólogo

Para cambiar el correo donde se reciben las notificaciones:

**En `server.js` (línea 15):**
```javascript
// IMPORTANTE: Reemplaza 'rianroca313@gmail.com' con el correo personal deseado
const PSYCHOLOGIST_EMAIL = 'rianroca313@gmail.com'; // ← CAMBIAR ESTE CORREO
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone [url-del-repositorio]
cd Clacas
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env con las credenciales de Gmail
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Ejecutar en desarrollo**
```bash
# Ejecutar frontend y backend simultáneamente
npm run dev:full

# O ejecutar por separado:
npm run server  # Backend en puerto 5000
npm run dev     # Frontend en puerto 5173
```

## 📁 Estructura del Proyecto

```
Clacas/
├── src/
│   ├── components/
│   │   └── FormularioAgendamiento.jsx
│   ├── assets/
│   │   ├── clacaslogoblack.png
│   │   ├── clacashero.png
│   │   ├── clacaslogowhite.png
│   │   ├── clara-castro.jpg
│   │   └── bg-texture.png
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server.js
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .env
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar solo el frontend
- `npm run server` - Ejecutar solo el backend
- `npm run dev:full` - Ejecutar frontend y backend simultáneamente
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build

## 📧 Funcionalidad de Correos

### Correo al Psicólogo
- **Destinatario**: Configurado en `PSYCHOLOGIST_EMAIL`
- **Contenido**: Información completa del paciente
- **Asunto**: "Nueva cita presencial - [Nombre del paciente]"

### Correo de Confirmación al Paciente
- **Destinatario**: Email ingresado en el formulario
- **Contenido**: 
  - Saludo personalizado
  - Resumen de datos enviados
  - Próximos pasos
  - Información de contacto
- **Asunto**: "Confirmación de solicitud de cita - Psic. Clara Castro González"

## 🚀 Despliegue

### Frontend (Vite)
```bash
npm run build
# Subir carpeta dist/ al servidor web
```

### Backend (Node.js)
```bash
# En el servidor:
npm install --production
node server.js
```

### Variables de Entorno en Producción
Asegúrate de configurar las variables de entorno en tu servidor:
- `EMAIL_USER`
- `EMAIL_PASS`
- `PORT`

## 🔒 Seguridad

- Las contraseñas de aplicación de Gmail son más seguras que las contraseñas normales
- El archivo `.env` debe estar en `.gitignore`
- Validación de datos en frontend y backend
- Sanitización de inputs

## 📞 Contacto

Para soporte técnico o cambios en el sitio web:
- **Email**: claracastrog@gmail.com
- **Teléfono**: (809) 902-1479

## 📝 Notas de Desarrollo

- **Cambiar correo del psicólogo**: Editar línea 15 en `server.js`
- **Modificar plantillas de correo**: Funciones `createPsychologistEmail()` y `createPatientEmail()` en `server.js`
- **Personalizar estilos**: Archivo `tailwind.config.js` y `src/index.css` #   C l a c a s  
 