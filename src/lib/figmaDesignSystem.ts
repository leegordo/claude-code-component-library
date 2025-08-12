// Figma Design System Integration
// File: https://www.figma.com/design/FtPOHfg0X15gaSdlOpeeFF/Design-System

export const FIGMA_FILE_ID = 'FtPOHfg0X15gaSdlOpeeFF'

// Common design system tokens based on Figma best practices
// These should be updated with actual values from your Figma file
export const figmaDesignTokens = {
  colors: {
    // Primary brand colors
    'primary-50': '#f0f9ff',
    'primary-100': '#e0f2fe', 
    'primary-200': '#bae6fd',
    'primary-300': '#7dd3fc',
    'primary-400': '#38bdf8',
    'primary-500': '#0ea5e9',
    'primary-600': '#0284c7',
    'primary-700': '#0369a1',
    'primary-800': '#075985',
    'primary-900': '#0c4a6e',
    'primary-950': '#082f49',

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

    // Neutral grays
    'neutral-50': '#fafafa',
    'neutral-100': '#f5f5f5',
    'neutral-200': '#e5e5e5',
    'neutral-300': '#d4d4d4',
    'neutral-400': '#a3a3a3',
    'neutral-500': '#737373',
    'neutral-600': '#525252',
    'neutral-700': '#404040',
    'neutral-800': '#262626',
    'neutral-900': '#171717',
    'neutral-950': '#0a0a0a',

    // Semantic colors
    'success-50': '#f0fdf4',
    'success-100': '#dcfce7',
    'success-500': '#22c55e',
    'success-600': '#16a34a',
    'success-700': '#15803d',

    'warning-50': '#fefce8',
    'warning-100': '#fef3c7',
    'warning-500': '#eab308',
    'warning-600': '#ca8a04',
    'warning-700': '#a16207',

    'error-50': '#fef2f2',
    'error-100': '#fee2e2',
    'error-500': '#ef4444',
    'error-600': '#dc2626',
    'error-700': '#b91c1c',

    'info-50': '#eff6ff',
    'info-100': '#dbeafe',
    'info-500': '#3b82f6',
    'info-600': '#2563eb',
    'info-700': '#1d4ed8',
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'monospace'],
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
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
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

  borderRadius: {
    'none': '0px',
    'sm': '2px',
    'md': '4px',
    'lg': '6px',
    'xl': '8px',
    '2xl': '12px',
    '3xl': '16px',
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
}

// Function to fetch design tokens from Figma (when MCP server is available)
export async function fetchFigmaDesignTokens(fileId: string = FIGMA_FILE_ID) {
  try {
    // This would integrate with the Figma MCP server
    console.log(`Fetching design tokens from Figma file: ${fileId}`)
    
    // For now, return the predefined tokens
    // In a real implementation, this would call the Figma API via MCP
    return figmaDesignTokens
  } catch (error) {
    console.error('Error fetching Figma design tokens:', error)
    return figmaDesignTokens
  }
}

// Generate Tailwind config from Figma tokens
export function generateTailwindConfigFromFigma(tokens = figmaDesignTokens) {
  return {
    theme: {
      extend: {
        colors: tokens.colors,
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize,
        fontWeight: tokens.typography.fontWeight,
        spacing: tokens.spacing,
        borderRadius: tokens.borderRadius,
        boxShadow: tokens.boxShadow,
      },
    },
  }
}