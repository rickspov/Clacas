import React from 'react';
import sobremiImage from '../assets/sobremi.jpeg';
import { motion } from 'framer-motion';

const SobreMi = () => {
  return (
    <motion.section id="about" className="py-20 bg-white/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-jet mb-16">Sobre mí</h2>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Imagen sticky para desktop */}
          <div className="sticky top-24 h-[36rem] hidden lg:block">
            <img 
              src={sobremiImage} 
              alt="Psic. Clara Castro" 
              className="w-full h-full object-cover object-top rounded-xl shadow-md border border-battleship-gray-2/30"
              style={{ objectPosition: 'top' }}
            />
          </div>
          {/* Imagen para móviles */}
          <div className="lg:hidden mb-6">
            <img 
              src={sobremiImage} 
              alt="Psic. Clara Castro" 
              className="w-full h-80 object-cover rounded-xl shadow-md"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
          {/* Texto largo */}
          <div className="w-full p-6 lg:p-0 bg-gradient-to-r from-slate-gray/10 to-battleship-gray-2/10 rounded-2xl shadow-lg border border-reseda-green/20 space-y-6 text-lg text-jet leading-relaxed">
            <h3 className="text-3xl font-bold text-jet mb-6">
              <span className="text-2xl">👩‍⚕️</span> Clara Castro
            </h3>
            <div className="space-y-6 text-lg text-jet leading-relaxed">
              <p>
                Mi nombre es <strong>Clara Castro</strong>, psicóloga clínica con formación en diversas corrientes y una profunda vocación por acompañar procesos de transformación personal. Inicié mis estudios de psicología en la Universidad Autónoma de Santo Domingo y me gradué en la Universidad de la Tercera Edad (UTE) en 2016. Posteriormente, realicé una maestría en Psicología Clínica, así como una formación especializada en <strong>bienestar emocional</strong>, <strong>sexualidad humana</strong>, y actualmente me estoy certificando en <strong>terapia transpersonal</strong>.
              </p>
              <p>
                Soy miembro activa del <strong>Colegio Dominicano de Psicólogos (CODOPSI)</strong> y me especializo en trabajar con <strong>ansiedad y emociones</strong>. Mi enfoque combina lo <strong>cognitivo-conductual</strong> con lo <strong>humanista</strong>, priorizando siempre el conocimiento y la gestión emocional como base para el cambio.
              </p>
              <div className="bg-white/70 p-6 rounded-xl border-l-4 border-reseda-green backdrop-blur-sm">
                <p className="text-xl font-semibold text-jet italic">
                  "Si cambias tu mirada, todo cambia."
                </p>
                <p className="text-battleship-gray mt-2">
                  Esa es la esencia de mi práctica terapéutica: ayudarte a cambiar el enfoque para que nuevas posibilidades puedan surgir.
                </p>
              </div>
              <p>
                He tenido el privilegio de trabajar en diferentes centros, incluyendo el consultorio del Dr. Martín Robles, la clínica Plastimedic y Química Nuda, además de ejercer en mi consulta privada. Atiendo tanto a <strong>jóvenes como adultos</strong>, y brindo sesiones <strong>online y presenciales</strong>.
              </p>
              <p>
                Trabajo de <strong>lunes a jueves en horario vespertino (desde las 2:00 p.m.)</strong>. Antes de cada primera cita, envío un cuestionario para preparar mejor la sesión.
              </p>
              <p>
                Mi estilo es <strong>cercano, empático y directo</strong>. Creo en una relación terapéutica horizontal, donde cada encuentro es una oportunidad para aprender, tanto para el paciente como para mí.
              </p>
              <p>
                Fuera del consultorio, disfruto la música, leer y conocer más sobre las personas y sus historias.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comentario sobre Anie - solo visible en el código */}
      {/* 
        🦋 Próximamente integraré a Anie, una mariposa interactiva basada en mi tía 
        —una persona llena de nobleza, bondad y tranquilidad— que acompañará el 
        recorrido del usuario en la web, ofreciendo apoyo emocional y orientación 
        de forma empática.
      */}
    </motion.section>
  );
};

export default SobreMi; 