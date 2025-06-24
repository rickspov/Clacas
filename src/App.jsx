import React, { useState, useRef } from 'react';
import claraImage from './assets/clara-castro.jpg';
import bgTexture from './assets/bg-texture.png';
import SignatureCanvas from 'react-signature-canvas';
import FormularioAgendamiento from './components/FormularioAgendamiento';
import SobreMi from './components/SobreMi';
import ClacasLogoBlack from './assets/claclaslogoblack.png';
import ClacasHero from './assets/clacashero.png';
import ClacasLogoWhite from './assets/clacaslogowhite.png';
import { UserIcon, UsersIcon, ClipboardCheckIcon } from './components/icons/ServiceIcons';
import { motion } from 'framer-motion';
import AnieButterflyBot from './components/AnieButterflyBot';

function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCloseFormulario = () => {
    setShowFormulario(false);
  };

  const faqData = [
    {
      question: "¿Cómo saber si necesito terapia?",
      answer: "Es normal tener dudas sobre si necesitas terapia. Considera buscar ayuda si experimentas cambios significativos en tu estado de ánimo, dificultades para manejar el estrés, problemas en tus relaciones, o si te sientes abrumado por situaciones de la vida. La terapia puede ser beneficiosa tanto en momentos de crisis como para el crecimiento personal y el autoconocimiento."
    },
    {
      question: "¿Qué pasa en una sesión de psicoterapia?",
      answer: "En una sesión de psicoterapia, tendrás un espacio seguro y confidencial para expresar tus pensamientos, emociones y experiencias. Trabajaremos juntos para identificar patrones, desarrollar estrategias de afrontamiento y alcanzar tus objetivos terapéuticos. Cada sesión es única y se adapta a tus necesidades específicas del momento."
    },
    {
      question: "¿Cuánto dura una sesión?",
      answer: "Las sesiones individuales tienen una duración de 50 minutos, mientras que las sesiones de pareja y familia duran 80 minutos. Este tiempo está diseñado para permitir un trabajo profundo sin ser abrumador. La frecuencia de las sesiones se determina según tus necesidades y objetivos terapéuticos."
    },
    {
      question: "¿Es confidencial lo que comparto?",
      answer: "Sí, la confidencialidad es fundamental en la terapia. Todo lo que compartas en las sesiones está protegido por el secreto profesional. Solo en casos excepcionales, como riesgo de daño a ti mismo o a otros, podría ser necesario romper esta confidencialidad, y siempre te informaría antes de hacerlo."
    },
    {
      question: "¿La terapia en línea es igual de efectiva?",
      answer: "Sí, la terapia en línea puede ser igual de efectiva que la terapia presencial. Utilizo plataformas seguras y confidenciales para las sesiones virtuales. La terapia online ofrece la misma calidad de atención profesional, con la ventaja adicional de mayor flexibilidad y comodidad para tu horario y ubicación."
    },
    {
      question: "¿Qué tipo de psicoterapia utilizas?",
      answer: "Utilizo un enfoque integrativo que combina diferentes corrientes terapéuticas según las necesidades de cada persona. Mi práctica se basa principalmente en la Terapia Cognitivo-Conductual (TCC), la Terapia Sistémica y enfoques humanistas. Adapto las técnicas y herramientas según tu situación específica y objetivos terapéuticos."
    }
  ];

  const blogPosts = [
    {
      title: "// Título del primer artículo",
      summary: "// Resumen del primer artículo",
      image: "// URL de la imagen del primer artículo"
    },
    {
      title: "// Título del segundo artículo", 
      summary: "// Resumen del segundo artículo",
      image: "// URL de la imagen del segundo artículo"
    },
    {
      title: "// Título del tercer artículo",
      summary: "// Resumen del tercer artículo", 
      image: "// URL de la imagen del tercer artículo"
    }
  ];

  const services = [
    {
      title: "Terapia Individual (adultos y jóvenes)",
      description: "Acompañamiento terapéutico personalizado enfocado en el manejo de ansiedad, emociones intensas, desarrollo personal y bienestar emocional. Disponible en modalidad presencial u online.",
      icon: <UserIcon className="w-8 h-8" color="#FFFFFF" />
    },
    {
      title: "Terapia de Grupo",
      description: "Sesiones grupales orientadas a la empatía, el compartir y la conexión emocional. Ideal para quienes buscan acompañamiento en un entorno respetuoso y guiado.",
      icon: <UsersIcon className="w-8 h-8" color="#FFFFFF" />
    },
    {
      title: "Evaluaciones Pre y Post Quirúrgicas",
      description: "Evaluaciones clínicas necesarias antes y después de intervenciones quirúrgicas. Incluye análisis emocional, entrevista y validación psicológica para tu seguridad y tranquilidad.",
      icon: <ClipboardCheckIcon className="w-8 h-8" color="#FFFFFF" />
    }
  ];

  const navItems = [
    { name: "Inicio", id: "hero" },
    { name: "Sobre mí", id: "about" },
    { name: "Servicios", id: "services" },
    { name: "¿Por qué terapia?", id: "faq" },
    { name: "Blog", id: "blog" },
    { name: "Agenda tu cita", id: "agenda" }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft relative">
      {/* Fondo decorativo con mariposas */}
      <div className="decorative-bg"></div>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-reseda-green/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Nombre */}
            <div className="flex items-center px-4">
              <img 
                src={ClacasLogoBlack} 
                alt="CLACAS Logo" 
                className="h-16 object-contain"
              />
            </div>

            {/* Menú Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-jet hover:text-reseda-green font-medium transition-colors duration-200 py-2"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Botón Hamburguesa Móvil */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-jet hover:text-reseda-green transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Menú Móvil */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-reseda-green/20">
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-jet hover:text-reseda-green hover:bg-reseda-green/10 font-medium transition-colors duration-200 py-3 px-4 rounded-lg"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 bg-gradient-soft bg-cover bg-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* Capa semitransparente para mejor contraste */}
        <div className="absolute inset-0 bg-white/20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Texto - Izquierda en desktop, arriba en móvil */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start mb-6">
                <img 
                  src={ClacasHero} 
                  alt="CLACAS Hero Logo" 
                  className="max-w-[200px] w-auto mb-4"
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-jet">
                  Psic. Clara Castro González
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-battleship-gray mb-8 italic leading-relaxed">
                "A veces, el primer paso hacia tu bienestar emocional es simplemente hablar."
              </p>
              <motion.button
                onClick={() => setShowFormulario(true)}
                className="bg-gradient-to-r from-reseda-green to-battleship-gray-2 hover:from-battleship-gray-2 hover:to-reseda-green text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                Agenda tu cita
              </motion.button>
            </div>
            
            {/* Imagen - Derecha en desktop, abajo en móvil */}
            <div className="flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0 block md:block">
              <div className="relative">
                <img 
                  src={claraImage} 
                  alt="Psic. Clara Castro González" 
                  className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] object-cover rounded-full shadow-2xl animate-fadeInUp border-4 border-white/30 scale-110"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    objectPosition: 'center 20%'
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-reseda-green/20 to-battleship-gray-2/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sobre Mí Section */}
      <SobreMi />

      {/* Servicios Section */}
      <motion.section id="services" className="py-20 bg-gradient-to-br from-slate-gray/10 to-battleship-gray-2/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-jet mb-16">Mis Servicios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-reseda-green/20"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                <div className="w-16 h-16 bg-gradient-to-br from-reseda-green to-battleship-gray-2 rounded-full flex items-center justify-center mb-6 transition-opacity duration-300 hover:opacity-90">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-jet mb-4">{service.title}</h3>
                <p className="text-battleship-gray leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ¿Qué son las consultas pre y post quirúrgicas? */}
      <motion.section className="my-10 mt-16 mb-16 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}>
        <div className="w-full max-w-4xl bg-[#f9f9f9]/90 p-8 rounded-2xl shadow-lg mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-jet mb-6">
            ¿Qué son las consultas pre y post quirúrgicas?
          </h2>
          <motion.video controls className="rounded-xl w-full max-w-3xl mx-auto mt-4 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}>
            <source src={`${import.meta.env.BASE_URL}videos/videoclara.mp4`} type="video/mp4" />
            Tu navegador no soporta el video.
          </motion.video>
        </div>
      </motion.section>

      {/* ¿Por qué ir a terapia? Section */}
      <motion.section id="faq" className="py-20 bg-gradient-to-br from-reseda-green/10 to-battleship-gray/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-jet mb-16">Preguntas Frecuentes</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-reseda-green/20">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-reseda-green/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-reseda-green focus:ring-inset"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="font-semibold text-lg text-jet pr-4">{faq.question}</span>
                    <span 
                      className={`flex-shrink-0 w-6 h-6 text-reseda-green transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 pb-6">
                      <p className="text-battleship-gray leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section id="blog" className="py-20 bg-gradient-to-br from-battleship-gray/10 to-slate-gray/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-jet mb-16">Blog</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-reseda-green/20">
                <div className="h-48 bg-gradient-to-br from-reseda-green/20 to-battleship-gray-2/20 flex items-center justify-center">
                  {/* Aquí va la imagen del artículo */}
                  <span className="text-4xl">📝</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-jet mb-4">{post.title}</h3>
                  <p className="text-battleship-gray mb-4">{post.summary}</p>
                  <button className="text-reseda-green font-medium hover:text-battleship-gray-2 transition-colors duration-200">
                    Leer más →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Agenda tu cita Section */}
      <motion.section id="agenda" className="bg-gradient-to-br from-reseda-green/15 to-battleship-gray/15 py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Agenda tu cita</h2>
          <p className="text-white mb-6">
            Reserva fácilmente tu consulta online o presencial según tu disponibilidad.
          </p>
          {showCalendly ? (
            <div className="w-full h-[700px]">
              <iframe
                src="https://calendly.com/rianroca313/30min?embed_domain=localhost&embed_type=Inline"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly"
              ></iframe>
            </div>
          ) : (
            <motion.button
              onClick={() => setShowFormulario(true)}
              className="bg-gradient-to-r from-reseda-green to-battleship-gray-2 hover:from-battleship-gray-2 hover:to-reseda-green text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              Comenzar proceso de agenda
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Consultas Presenciales Section */}
      <motion.section className="py-20 bg-gradient-to-br from-slate-gray/10 to-reseda-green/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Consultas Presenciales</h2>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Te ofrezco consultas presenciales en dos ubicaciones convenientes en Santo Domingo. 
              Elige la que mejor se adapte a tu horario y ubicación.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Nudah - Mañanas */}
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-reseda-green/20">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-jet mb-4">Consultas en Nudah – Mañanas</h3>
                <p className="text-battleship-gray mb-6">
                  Consultas disponibles en horario matutino para comenzar tu día con bienestar emocional.
                </p>
                <div className="w-full h-[200px] rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1234567890123!2d-69.9312!3d18.4861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI5JzA5LjkiTiA2OcKwNTUnNTIuMyJX!5e0!3m2!1ses!2sdo!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Nudah"
                    aria-label="Mapa de ubicación Nudah"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://maps.app.goo.gl/yks975Sj7Ykp52md6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-reseda-green hover:text-battleship-gray-2 font-medium transition-colors duration-200"
                    aria-label="Ver ubicación Nudah en Google Maps"
                  >
                    Ver en Google Maps
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bodhi - Tardes */}
            <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-reseda-green/20">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-jet mb-4">Consultas en Bodhi – Tardes</h3>
                <p className="text-battleship-gray mb-6">
                  Consultas disponibles en horario vespertino para relajarte después de tu jornada.
                </p>
                <div className="w-full h-[200px] rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1234567890123!2d-69.9312!3d18.4861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI5JzA5LjkiTiA2OcKwNTUnNTIuMyJX!5e0!3m2!1ses!2sdo!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Bodhi"
                    aria-label="Mapa de ubicación Bodhi"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://maps.app.goo.gl/Vt99GDn3kdSkMLvd9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-reseda-green hover:text-battleship-gray-2 font-medium transition-colors duration-200"
                    aria-label="Ver ubicación Bodhi en Google Maps"
                  >
                    Ver en Google Maps
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={ClacasLogoWhite} 
                  alt="CLACAS Logo" 
                  className="h-12 w-auto mr-3"
                />
                <h3 className="text-2xl font-bold">Psic. Clara Castro González</h3>
              </div>
              <p className="text-gray-300">
                Acompañándote en tu camino hacia el bienestar emocional y el crecimiento personal.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociales</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Instagram
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  Facebook
                </a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-200">
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p>
                  <a href="mailto:claracastrog@gmail.com" aria-label="Enviar email a Clara Castro" className="hover:text-white transition-colors duration-200">
                    📧 claracastrog@gmail.com
                  </a>
                </p>
                <p>
                  <a href="tel:+18099021479" aria-label="Llamar a Clara Castro" className="hover:text-white transition-colors duration-200">
                    📱 (809) 902-1479
                  </a>
                </p>
                <p>📍 Santo Domingo, República Dominicana</p>
                <p className="text-sm">Horario: Lunes a Viernes 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Psic. Clara Castro González. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Formulario de Agendamiento */}
      {showFormulario && (
        <FormularioAgendamiento 
          onClose={handleCloseFormulario}
          onSuccess={() => {
            setShowFormulario(false);
            setShowCalendly(true);
          }}
        />
      )}

      {/* Anie Butterfly Bot */}
      <AnieButterflyBot />
    </div>
  );
}

export default App; 