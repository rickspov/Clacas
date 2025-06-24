import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const FormularioAgendamiento = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentType: 'presencial',
    preferredDate: '',
    consent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const signatureRef = useRef();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    if (!formData.consent) {
      newErrors.consent = 'Debes aceptar el consentimiento informado';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Enviar datos al backend
      const response = await fetch('http://localhost:5000/api/send-appointment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          appointmentType: 'presencial',
          preferredDate: '',
          consent: false
        });
        if (signatureRef.current) {
          signatureRef.current.clear();
        }
        
        // Cerrar modal después de 3 segundos
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-reseda-green/20">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-jet">Agenda tu Cita</h2>
            <button
              onClick={onClose}
              className="text-battleship-gray hover:text-jet text-2xl font-bold transition-colors duration-200"
              aria-label="Cerrar formulario"
            >
              ×
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-reseda-green/10 border border-reseda-green text-reseda-green rounded-lg">
              <h3 className="font-bold mb-2">¡Solicitud enviada exitosamente!</h3>
              <p>Hemos enviado un correo de confirmación a tu email. Te contactaremos pronto para confirmar tu cita.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <h3 className="font-bold mb-2">Error al enviar la solicitud</h3>
              <p>Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente o contacta directamente al (809) 902-1479.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-jet mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-reseda-green focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-battleship-gray/30'
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-jet mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-reseda-green focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-battleship-gray/30'
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-jet mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-reseda-green focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-battleship-gray/30'
                }`}
                placeholder="(809) 123-4567"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Tipo de cita */}
            <div>
              <label htmlFor="appointmentType" className="block text-sm font-medium text-jet mb-2">
                Tipo de cita
              </label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-battleship-gray/30 rounded-lg focus:ring-2 focus:ring-reseda-green focus:border-transparent"
              >
                <option value="presencial">Cita Presencial</option>
                <option value="online">Cita Online</option>
                <option value="consulta">Consulta Inicial</option>
              </select>
            </div>

            {/* Fecha preferida (solo para citas presenciales) */}
            {formData.appointmentType === 'presencial' && (
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-jet mb-2">
                  Fecha preferida (opcional)
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-battleship-gray/30 rounded-lg focus:ring-2 focus:ring-reseda-green focus:border-transparent"
                />
              </div>
            )}

            {/* Consentimiento informado */}
            <div className="bg-battleship-gray/5 p-4 rounded-lg">
              <h3 className="font-semibold text-jet mb-3">Consentimiento Informado</h3>
              <div className="max-h-32 overflow-y-auto text-sm text-battleship-gray/80 mb-4 leading-relaxed">
                <p className="mb-2">
                  Al completar este formulario, entiendo y acepto que:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>La información proporcionada será utilizada únicamente para coordinar mi cita</li>
                  <li>Recibiré un correo de confirmación con los detalles de mi solicitud</li>
                  <li>La psicóloga me contactará para confirmar la fecha y hora exacta</li>
                  <li>Puedo cancelar o reprogramar mi cita con al menos 24 horas de anticipación</li>
                  <li>La confidencialidad de mi información está protegida según las normas éticas profesionales</li>
                </ul>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-reseda-green focus:ring-reseda-green border-battleship-gray/30 rounded"
                />
                <label htmlFor="consent" className="text-sm text-battleship-gray/80">
                  He leído y acepto el consentimiento informado *
                </label>
              </div>
              {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-reseda-green to-olive-500 hover:from-reseda-green/80 hover:to-olive-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-battleship-gray hover:bg-battleship-gray/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioAgendamiento; 