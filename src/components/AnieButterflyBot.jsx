import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// ---
// ¡IMPORTANTE! Por seguridad, nunca expongas tu clave secreta de OpenAI (sk-...) en el frontend en producción.
// Lo ideal es migrar la llamada a un backend seguro y usar una API pública desde el frontend.
// ---

// SVG minimalista de mariposa con paleta wellness
const ButterflySVG = ({ className = '', ...props }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M32 32C18 10 2 18 8 32C14 46 32 32 32 32Z" fill="#7D8D9E" stroke="#383633" strokeWidth="2" />
    <path d="M32 32C46 10 62 18 56 32C50 46 32 32 32 32Z" fill="#748574" stroke="#383633" strokeWidth="2" />
    <ellipse cx="32" cy="36" rx="3" ry="10" fill="#7F7F6F" stroke="#383633" strokeWidth="1.5" />
    <circle cx="32" cy="26" r="3" fill="#858F89" stroke="#383633" strokeWidth="1.5" />
    <path d="M30 24 Q28 20 26 22" stroke="#383633" strokeWidth="1.2" fill="none" />
    <path d="M34 24 Q36 20 38 22" stroke="#383633" strokeWidth="1.2" fill="none" />
  </svg>
);

const butterflyFlight = {
  initial: { x: 0, y: 0, rotate: 0 },
  animate: {
    x: [0, 30, -20, 40, 0],
    y: [0, -30, 20, -10, 0],
    rotate: [0, 10, -8, 6, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const BOT_PERSONALITY = `Eres Anie, una mariposa bot amigable, empática y tranquila. Hablas con dulzura, motivación y serenidad, sin tecnicismos. Usa frases como: 'Cuéntame, ¿cómo va tu día?', 'Aquí estoy si necesitas escribir algo.', 'Todo cambio comienza con una pausa.' Usa ocasionalmente emojis suaves como 🦋🌿✨.`;

let lastRequestTime = 0; // Para controlar el delay entre peticiones

const AnieButterflyBot = ({ showButterflyDefault = true }) => {
  const [open, setOpen] = useState(false);
  const [showButterfly, setShowButterfly] = useState(showButterflyDefault);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy Anie 🦋. Estoy aquí si quieres conversar un poco.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, typing]);

  // Delay mínimo entre peticiones (5 segundos)
  const delayIfNeeded = async () => {
    const now = Date.now();
    const elapsed = now - lastRequestTime;
    if (elapsed < 5000) {
      await new Promise(res => setTimeout(res, 5000 - elapsed));
    }
    lastRequestTime = Date.now();
  };

  // URL base del backend configurable
  const BACKEND_URL = (import.meta.env.VITE_ANIE_BACKEND_URL || '').replace(/\/$/, '');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return; // No permitir enviar si loading
    const userMsg = input;
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    setTyping(true);
    try {
      await delayIfNeeded();
      // Llamada al backend local o remoto
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });
      if (!res.ok) {
        setMessages((msgs) => [...msgs, { from: 'bot', text: '🦋 Ups, no pude responder ahora mismo. ¿Intentamos de nuevo en un momento?' }]);
        setLoading(false);
        setTyping(false);
        return;
      }
      const data = await res.json();
      // Simula animación de typing suave
      await new Promise(res => setTimeout(res, 600 + Math.random() * 600));
      setMessages((msgs) => [...msgs, { from: 'bot', text: data.reply || 'Estoy aquí para escucharte 🦋 Cuéntame lo que quieras.' }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: 'bot', text: '🦋 Ocurrió un error de conexión. Intenta de nuevo más tarde.' }]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  return (
    <>
      {/* Mariposa animada en el fondo, opcional */}
      {showButterfly && (
        <motion.div
          className="fixed z-10 left-0 top-0 pointer-events-none"
          style={{ width: 120, height: 120 }}
          {...butterflyFlight}
        >
          <ButterflySVG className="w-24 h-24" />
          <button
            className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs text-battleship-gray-2 shadow hover:bg-reseda-green/20 transition-colors"
            onClick={() => setShowButterfly(false)}
            tabIndex={0}
            aria-label="Ocultar mariposa animada"
          >
            Ocultar
          </button>
        </motion.div>
      )}

      {/* Botón flotante con mariposa en la esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <motion.button
          className="bg-white/90 border border-battleship-gray-2/40 shadow-lg rounded-full p-3 flex items-center justify-center hover:scale-105 transition-all focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label="Abrir chat de Anie"
        >
          <ButterflySVG className="w-8 h-8" />
        </motion.button>

        {/* Ventana de chat emergente */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`mt-4 w-80 max-w-[90vw] bg-white/95 border border-battleship-gray-2/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${open ? '' : 'pointer-events-none'}`}
          style={{ minHeight: open ? 380 : 0, maxHeight: 500 }}
        >
          {/* Cabecera */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-gray/10 to-battleship-gray-2/10 border-b border-battleship-gray-2/20">
            <ButterflySVG className="w-6 h-6" />
            <span className="font-semibold text-jet">Anie</span>
            <span className="ml-auto text-battleship-gray text-xs">bot de bienestar</span>
            <button
              className="ml-2 text-battleship-gray hover:text-reseda-green transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>
          {/* Mensajes */}
          <div className="flex-1 px-4 py-2 overflow-y-auto bg-white/80" style={{ fontFamily: 'inherit' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-xl max-w-[80%] text-sm shadow-sm ${msg.from === 'user' ? 'bg-reseda-green text-white' : 'bg-[#f9f9f9] text-jet border border-battleship-gray-2/20'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="my-2 flex justify-start">
                <motion.div
                  className="px-4 py-2 rounded-xl max-w-[80%] text-sm shadow-sm bg-[#f9f9f9] text-jet border border-battleship-gray-2/20 flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="animate-pulse">Anie está escribiendo...</span>
                  <span className="text-xl">🦋</span>
                </motion.div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-battleship-gray-2/20 bg-white/90">
            <motion.input
              type="text"
              className="flex-1 rounded-xl border border-battleship-gray-2/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-reseda-green transition-all duration-300"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoComplete="off"
              animate={loading ? { opacity: 0.5, cursor: 'not-allowed' } : { opacity: 1, cursor: 'text' }}
            />
            <motion.button
              type="submit"
              className="bg-reseda-green text-white rounded-full px-4 py-2 font-semibold hover:bg-battleship-gray-2 transition-colors disabled:opacity-60 transition-all duration-300"
              disabled={loading || !input.trim()}
              animate={loading ? { opacity: 0.5, scale: 0.98, cursor: 'not-allowed' } : { opacity: 1, scale: 1, cursor: 'pointer' }}
            >
              {loading ? '...' : 'Enviar'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AnieButterflyBot;

// ---
// Instrucciones de integración:
// 1. Importa el componente en tu App.jsx:  import AnieButterflyBot from './components/AnieButterflyBot';
// 2. Agrégalo cerca del final del return principal de tu App: <AnieButterflyBot />
// 3. Asegúrate de tener la variable de entorno VITE_ANIE_BACKEND_URL configurada.
// 4. Puedes ocultar la mariposa animada con el botón "Ocultar" o pasando showButterflyDefault={false}. 