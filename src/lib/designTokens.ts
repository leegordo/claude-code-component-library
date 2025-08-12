interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
  valuesByMode: Record<string, any>;
}

interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: Array<{
    modeId: string;
    name: string;
  }>;
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing: boolean;
  variableIds: string[];
}

interface DesignToken {
  name: string;
  value: string | number;
  type: 'color' | 'spacing' | 'fontSize' | 'fontFamily' | 'fontWeight' | 'lineHeight' | 'borderRadius' | 'boxShadow';
  category: string;
}

export class DesignTokenExtractor {
  private fileId: string;

  constructor(fileId: string) {
    this.fileId = fileId;
  }

  async extractVariables(): Promise<DesignToken[]> {
    try {
      // This would use the Figma MCP server to fetch variables
      // For now, we'll create a structure for the integration
      
      const tokens: DesignToken[] = [];
      
      // We'll implement the actual MCP call here
      console.log(`Extracting variables from Figma file: ${this.fileId}`);
      
      return tokens;
    } catch (error) {
      console.error('Error extracting Figma variables:', error);
      return [];
    }
  }

  private convertFigmaColorToCSS(figmaColor: any): string {
    if (typeof figmaColor === 'string') return figmaColor;
    
    // Convert Figma RGBA to CSS
    if (figmaColor.r !== undefined) {
      const r = Math.round(figmaColor.r * 255);
      const g = Math.round(figmaColor.g * 255);
      const b = Math.round(figmaColor.b * 255);
      const a = figmaColor.a || 1;
      
      return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    
    return figmaColor;
  }

  private categorizeName(name: string): { category: string; tokenName: string; type: DesignToken['type'] } {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Determine category and type based on name patterns
    if (name.includes('color') || name.includes('Color') || name.match(/^(primary|secondary|accent|neutral|gray|red|green|blue|yellow)/i)) {
      return { category: 'colors', tokenName: cleanName, type: 'color' };
    }
    
    if (name.includes('space') || name.includes('Space') || name.includes('gap') || name.includes('margin') || name.includes('padding')) {
      return { category: 'spacing', tokenName: cleanName, type: 'spacing' };
    }
    
    if (name.includes('font') && (name.includes('size') || name.includes('Size'))) {
      return { category: 'fontSize', tokenName: cleanName, type: 'fontSize' };
    }
    
    if (name.includes('font') && (name.includes('family') || name.includes('Family'))) {
      return { category: 'fontFamily', tokenName: cleanName, type: 'fontFamily' };
    }
    
    if (name.includes('font') && (name.includes('weight') || name.includes('Weight'))) {
      return { category: 'fontWeight', tokenName: cleanName, type: 'fontWeight' };
    }
    
    if (name.includes('line') && name.includes('height')) {
      return { category: 'lineHeight', tokenName: cleanName, type: 'lineHeight' };
    }
    
    if (name.includes('radius') || name.includes('Radius')) {
      return { category: 'borderRadius', tokenName: cleanName, type: 'borderRadius' };
    }
    
    if (name.includes('shadow') || name.includes('Shadow')) {
      return { category: 'boxShadow', tokenName: cleanName, type: 'boxShadow' };
    }
    
    // Default to spacing for numeric values
    return { category: 'spacing', tokenName: cleanName, type: 'spacing' };
  }

  generateTailwindConfig(tokens: DesignToken[]): any {
    const config: any = {
      theme: {
        extend: {
          colors: {},
          spacing: {},
          fontSize: {},
          fontFamily: {},
          fontWeight: {},
          lineHeight: {},
          borderRadius: {},
          boxShadow: {},
        },
      },
    };

    tokens.forEach(token => {
      const category = token.category as keyof typeof config.theme.extend;
      if (config.theme.extend[category]) {
        config.theme.extend[category][token.name] = token.value;
      }
    });

    return config;
  }
}

// Sample design tokens based on common design system patterns
export const sampleDesignTokens: DesignToken[] = [
  // Colors
  { name: 'primary-50', value: '#eff6ff', type: 'color', category: 'colors' },
  { name: 'primary-100', value: '#dbeafe', type: 'color', category: 'colors' },
  { name: 'primary-200', value: '#bfdbfe', type: 'color', category: 'colors' },
  { name: 'primary-300', value: '#93c5fd', type: 'color', category: 'colors' },
  { name: 'primary-400', value: '#60a5fa', type: 'color', category: 'colors' },
  { name: 'primary-500', value: '#3b82f6', type: 'color', category: 'colors' },
  { name: 'primary-600', value: '#2563eb', type: 'color', category: 'colors' },
  { name: 'primary-700', value: '#1d4ed8', type: 'color', category: 'colors' },
  { name: 'primary-800', value: '#1e40af', type: 'color', category: 'colors' },
  { name: 'primary-900', value: '#1e3a8a', type: 'color', category: 'colors' },
  
  // Gray scale
  { name: 'gray-50', value: '#f9fafb', type: 'color', category: 'colors' },
  { name: 'gray-100', value: '#f3f4f6', type: 'color', category: 'colors' },
  { name: 'gray-200', value: '#e5e7eb', type: 'color', category: 'colors' },
  { name: 'gray-300', value: '#d1d5db', type: 'color', category: 'colors' },
  { name: 'gray-400', value: '#9ca3af', type: 'color', category: 'colors' },
  { name: 'gray-500', value: '#6b7280', type: 'color', category: 'colors' },
  { name: 'gray-600', value: '#4b5563', type: 'color', category: 'colors' },
  { name: 'gray-700', value: '#374151', type: 'color', category: 'colors' },
  { name: 'gray-800', value: '#1f2937', type: 'color', category: 'colors' },
  { name: 'gray-900', value: '#111827', type: 'color', category: 'colors' },
  
  // Spacing
  { name: 'xs', value: '4px', type: 'spacing', category: 'spacing' },
  { name: 'sm', value: '8px', type: 'spacing', category: 'spacing' },
  { name: 'md', value: '16px', type: 'spacing', category: 'spacing' },
  { name: 'lg', value: '24px', type: 'spacing', category: 'spacing' },
  { name: 'xl', value: '32px', type: 'spacing', category: 'spacing' },
  { name: '2xl', value: '48px', type: 'spacing', category: 'spacing' },
  { name: '3xl', value: '64px', type: 'spacing', category: 'spacing' },
  
  // Typography
  { name: 'xs', value: '12px', type: 'fontSize', category: 'fontSize' },
  { name: 'sm', value: '14px', type: 'fontSize', category: 'fontSize' },
  { name: 'base', value: '16px', type: 'fontSize', category: 'fontSize' },
  { name: 'lg', value: '18px', type: 'fontSize', category: 'fontSize' },
  { name: 'xl', value: '20px', type: 'fontSize', category: 'fontSize' },
  { name: '2xl', value: '24px', type: 'fontSize', category: 'fontSize' },
  { name: '3xl', value: '30px', type: 'fontSize', category: 'fontSize' },
  { name: '4xl', value: '36px', type: 'fontSize', category: 'fontSize' },
  
  // Border radius
  { name: 'sm', value: '4px', type: 'borderRadius', category: 'borderRadius' },
  { name: 'md', value: '6px', type: 'borderRadius', category: 'borderRadius' },
  { name: 'lg', value: '8px', type: 'borderRadius', category: 'borderRadius' },
  { name: 'xl', value: '12px', type: 'borderRadius', category: 'borderRadius' },
  { name: '2xl', value: '16px', type: 'borderRadius', category: 'borderRadius' },
  
  // Font families
  { name: 'sans', value: ['Inter', 'system-ui', 'sans-serif'], type: 'fontFamily', category: 'fontFamily' },
  { name: 'serif', value: ['Georgia', 'serif'], type: 'fontFamily', category: 'fontFamily' },
  { name: 'mono', value: ['Monaco', 'monospace'], type: 'fontFamily', category: 'fontFamily' },
];

export async function loadDesignTokens(fileId?: string): Promise<DesignToken[]> {
  if (fileId) {
    const extractor = new DesignTokenExtractor(fileId);
    const tokens = await extractor.extractVariables();
    
    if (tokens.length > 0) {
      return tokens;
    }
  }
  
  // Fallback to sample tokens
  return sampleDesignTokens;
}