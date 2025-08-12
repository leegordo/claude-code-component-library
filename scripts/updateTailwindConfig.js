import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample design tokens that would come from Figma
const designTokens = {
  colors: {
    // Primary colors
    'primary-50': '#eff6ff',
    'primary-100': '#dbeafe',
    'primary-200': '#bfdbfe',
    'primary-300': '#93c5fd',
    'primary-400': '#60a5fa',
    'primary-500': '#3b82f6',
    'primary-600': '#2563eb',
    'primary-700': '#1d4ed8',
    'primary-800': '#1e40af',
    'primary-900': '#1e3a8a',
    'primary-950': '#172554',
    
    // Secondary colors
    'secondary-50': '#f0fdf4',
    'secondary-100': '#dcfce7',
    'secondary-200': '#bbf7d0',
    'secondary-300': '#86efac',
    'secondary-400': '#4ade80',
    'secondary-500': '#22c55e',
    'secondary-600': '#16a34a',
    'secondary-700': '#15803d',
    'secondary-800': '#166534',
    'secondary-900': '#14532d',
    'secondary-950': '#052e16',
    
    // Accent colors
    'accent-50': '#fef3c7',
    'accent-100': '#fde68a',
    'accent-200': '#fcd34d',
    'accent-300': '#fbbf24',
    'accent-400': '#f59e0b',
    'accent-500': '#d97706',
    'accent-600': '#b45309',
    'accent-700': '#92400e',
    'accent-800': '#78350f',
    'accent-900': '#451a03',
    
    // Neutral grays
    'neutral-50': '#f8fafc',
    'neutral-100': '#f1f5f9',
    'neutral-200': '#e2e8f0',
    'neutral-300': '#cbd5e1',
    'neutral-400': '#94a3b8',
    'neutral-500': '#64748b',
    'neutral-600': '#475569',
    'neutral-700': '#334155',
    'neutral-800': '#1e293b',
    'neutral-900': '#0f172a',
    'neutral-950': '#020617',
    
    // Status colors
    'success-50': '#f0fdf4',
    'success-500': '#22c55e',
    'success-600': '#16a34a',
    'success-700': '#15803d',
    
    'warning-50': '#fefce8',
    'warning-500': '#eab308',
    'warning-600': '#ca8a04',
    'warning-700': '#a16207',
    
    'error-50': '#fef2f2',
    'error-500': '#ef4444',
    'error-600': '#dc2626',
    'error-700': '#b91c1c',
    
    'info-50': '#eff6ff',
    'info-500': '#3b82f6',
    'info-600': '#2563eb',
    'info-700': '#1d4ed8',
  },
  
  spacing: {
    'xs': '4px',
    'sm': '8px',
    'md': '12px',
    'lg': '16px',
    'xl': '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px',
    '7xl': '80px',
    '8xl': '96px',
  },
  
  fontSize: {
    'xs': ['12px', { lineHeight: '16px' }],
    'sm': ['14px', { lineHeight: '20px' }],
    'base': ['16px', { lineHeight: '24px' }],
    'lg': ['18px', { lineHeight: '28px' }],
    'xl': ['20px', { lineHeight: '28px' }],
    '2xl': ['24px', { lineHeight: '32px' }],
    '3xl': ['30px', { lineHeight: '36px' }],
    '4xl': ['36px', { lineHeight: '40px' }],
    '5xl': ['48px', { lineHeight: '1' }],
    '6xl': ['60px', { lineHeight: '1' }],
    '7xl': ['72px', { lineHeight: '1' }],
    '8xl': ['96px', { lineHeight: '1' }],
    '9xl': ['128px', { lineHeight: '1' }],
  },
  
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  borderRadius: {
    'none': '0px',
    'sm': '4px',
    'md': '6px',
    'lg': '8px',
    'xl': '12px',
    '2xl': '16px',
    '3xl': '24px',
    'full': '9999px',
  },
  
  boxShadow: {
    'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
};

// Generate the new Tailwind config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(designTokens.colors, null, 8).replace(/"/g, "'")},
      spacing: ${JSON.stringify(designTokens.spacing, null, 8).replace(/"/g, "'")},
      fontSize: ${JSON.stringify(designTokens.fontSize, null, 8).replace(/"/g, "'")},
      fontFamily: ${JSON.stringify(designTokens.fontFamily, null, 8).replace(/"/g, "'")},
      fontWeight: ${JSON.stringify(designTokens.fontWeight, null, 8).replace(/"/g, "'")},
      borderRadius: ${JSON.stringify(designTokens.borderRadius, null, 8).replace(/"/g, "'")},
      boxShadow: ${JSON.stringify(designTokens.boxShadow, null, 8).replace(/"/g, "'")},
    },
  },
  plugins: [],
}`;

// Write the updated config
const configPath = path.join(__dirname, '..', 'tailwind.config.js');
fs.writeFileSync(configPath, tailwindConfig);

console.log('✅ Tailwind config updated with design tokens!');
console.log('📍 Updated file:', configPath);
console.log('🎨 Added tokens for:', Object.keys(designTokens).join(', '));