import React from 'react';

// Ícono de usuario individual (terapia individual)
export const UserIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
    />
  </svg>
);

// Ícono de grupo (terapia de grupo)
export const UsersIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" 
    />
  </svg>
);

// Ícono de evaluación (evaluaciones pre y post quirúrgicas)
export const ClipboardCheckIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

// Ícono de corazón (bienestar emocional)
export const HeartIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
    />
  </svg>
);

// Ícono de cerebro (psicología)
export const BrainIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
    />
  </svg>
);

// Ícono de computadora (terapia online)
export const ComputerIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" 
    />
  </svg>
); 