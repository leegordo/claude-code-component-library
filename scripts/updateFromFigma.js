import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Figma file ID from the URL: FtPOHfg0X15gaSdlOpeeFF
const FIGMA_FILE_ID = 'FtPOHfg0X15gaSdlOpeeFF';

// Updated design tokens based on modern design system practices
const figmaInspiredTokens = {
  colors: {
    // Primary brand colors - modern blue palette
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
    
    // Secondary - complementary purple
    'secondary-50': '#faf5ff',
    'secondary-100': '#f3e8ff',
    'secondary-200': '#e9d5ff',
    'secondary-300': '#d8b4fe',
    'secondary-400': '#c084fc',
    'secondary-500': '#a855f7',
    'secondary-600': '#9333ea',
    'secondary-700': '#7c3aed',
    'secondary-800': '#6b21a8',
    'secondary-900': '#581c87',
    'secondary-950': '#3b0764',
    
    // Neutral grays - modern and accessible
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    'gray-600': '#4b5563',
    'gray-700': '#374151',
    'gray-800': '#1f2937',
    'gray-900': '#111827',
    'gray-950': '#030712',
    
    // Semantic colors
    'success-50': '#f0fdf4',
    'success-100': '#dcfce7',
    'success-200': '#bbf7d0',
    'success-300': '#86efac',
    'success-400': '#4ade80',
    'success-500': '#22c55e',
    'success-600': '#16a34a',
    'success-700': '#15803d',
    'success-800': '#166534',
    'success-900': '#14532d',
    
    'warning-50': '#fefce8',
    'warning-100': '#fef3c7',
    'warning-200': '#fde68a',
    'warning-300': '#fcd34d',
    'warning-400': '#fbbf24',
    'warning-500': '#f59e0b',
    'warning-600': '#d97706',
    'warning-700': '#b45309',
    'warning-800': '#92400e',
    'warning-900': '#78350f',
    
    'error-50': '#fef2f2',
    'error-100': '#fee2e2',
    'error-200': '#fecaca',
    'error-300': '#fca5a5',
    'error-400': '#f87171',
    'error-500': '#ef4444',
    'error-600': '#dc2626',
    'error-700': '#b91c1c',
    'error-800': '#991b1b',
    'error-900': '#7f1d1d',
    
    'info-50': '#eff6ff',
    'info-100': '#dbeafe',
    'info-200': '#bfdbfe',
    'info-300': '#93c5fd',
    'info-400': '#60a5fa',
    'info-500': '#3b82f6',
    'info-600': '#2563eb',
    'info-700': '#1d4ed8',
    'info-800': '#1e40af',
    'info-900': '#1e3a8a',
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
    '9xl': '128px',
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
    'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    'serif': ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  
  fontWeight: {
    'thin': '100',
    'extralight': '200',
    'light': '300',
    'normal': '400',
    'medium': '500',
    'semibold': '600',
    'bold': '700',
    'extrabold': '800',
    'black': '900',
  },
  
  borderRadius: {
    'none': '0px',
    'sm': '2px',
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

// Generate the updated Tailwind config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(figmaInspiredTokens.colors, null, 8).replace(/"/g, "'")},
      spacing: ${JSON.stringify(figmaInspiredTokens.spacing, null, 8).replace(/"/g, "'")},
      fontSize: ${JSON.stringify(figmaInspiredTokens.fontSize, null, 8).replace(/"/g, "'")},
      fontFamily: ${JSON.stringify(figmaInspiredTokens.fontFamily, null, 8).replace(/"/g, "'")},
      fontWeight: ${JSON.stringify(figmaInspiredTokens.fontWeight, null, 8).replace(/"/g, "'")},
      borderRadius: ${JSON.stringify(figmaInspiredTokens.borderRadius, null, 8).replace(/"/g, "'")},
      boxShadow: ${JSON.stringify(figmaInspiredTokens.boxShadow, null, 8).replace(/"/g, "'")},
    },
  },
  plugins: [],
}`;

// Write the updated config
const configPath = path.join(__dirname, '..', 'tailwind.config.js');
fs.writeFileSync(configPath, tailwindConfig);

console.log('✅ Tailwind config updated with Figma-inspired design tokens!');
console.log('📁 Figma File ID:', FIGMA_FILE_ID);
console.log('📍 Config file:', configPath);
console.log('🎨 Token categories:', Object.keys(figmaInspiredTokens).join(', '));
console.log('');
console.log('💡 To use actual Figma variables:');
console.log('1. Provide your Figma access token');
console.log('2. The MCP server will fetch real design tokens');
console.log('3. Tokens will be automatically synchronized');