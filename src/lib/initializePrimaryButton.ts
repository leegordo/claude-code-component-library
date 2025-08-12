import { StorageService } from './storage';
import { GeneratedComponent } from '@/types';

const PRIMARY_BUTTON_CODE = `import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface PrimaryMediumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function PrimaryMediumButton({ 
  children, 
  onClick, 
  disabled = false,
  loading = false,
  className,
  type = 'button',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  ...props 
}: PrimaryMediumButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button 
      type={type}
      className={cn(
        // Base styles - following your design system
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "active:transform active:scale-95",
        
        // Size variants - Medium as default from Figma
        {
          'px-md py-xs text-sm h-8': size === 'sm',
          'px-lg py-md text-base h-10': size === 'md', // Primary Medium from Figma
          'px-xl py-lg text-lg h-12': size === 'lg',
        },
        
        // Variant styles - using your extracted design tokens
        {
          // Default Primary - Black button from your design system
          'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950 focus:ring-gray-900': 
            variant === 'default' && !isDisabled,
          'bg-gray-300 text-gray-500 cursor-not-allowed': 
            variant === 'default' && isDisabled,
            
          // Destructive variant
          'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 focus:ring-error-600': 
            variant === 'destructive' && !isDisabled,
          'bg-error-300 text-error-500 cursor-not-allowed': 
            variant === 'destructive' && isDisabled,
            
          // Outline variant
          'border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-900': 
            variant === 'outline' && !isDisabled,
          'border-2 border-gray-300 text-gray-400 bg-white cursor-not-allowed': 
            variant === 'outline' && isDisabled,
            
          // Ghost variant
          'text-gray-900 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-900': 
            variant === 'ghost' && !isDisabled,
          'text-gray-400 bg-transparent cursor-not-allowed': 
            variant === 'ghost' && isDisabled,
        },
        
        // Full width
        {
          'w-full': fullWidth,
        },
        
        className
      )}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  );
}

export default PrimaryMediumButton;`;

const primaryMediumButtonComponent: GeneratedComponent = {
  metadata: {
    id: 'primary-medium-button-figma',
    name: 'PrimaryMediumButton',
    description: 'Primary Medium Button from Figma Design System with all interactive states (hover, active, disabled, loading, variants)',
    figmaUrl: 'https://www.figma.com/design/FtPOHfg0X15gaSdlOpeeFF/Design-System?node-id=185-852&t=sZzP1kWwFy7u33HD-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0',
    author: 'Figma Design System',
    tags: ['button', 'primary', 'medium', 'interactive', 'states', 'figma'],
    framework: 'react',
    status: 'approved',
  },
  code: PRIMARY_BUTTON_CODE,
  assets: [],
  dependencies: ['react', 'clsx', 'lucide-react'],
};

export function initializePrimaryButton(): void {
  // Check if component already exists
  const existingComponents = StorageService.getComponents();
  const exists = existingComponents.some(c => c.metadata.id === primaryMediumButtonComponent.metadata.id);
  
  if (!exists) {
    console.log('🎨 Adding PrimaryMediumButton to library from Figma Design System...');
    StorageService.saveComponent(primaryMediumButtonComponent);
    StorageService.addToHistory('created', primaryMediumButtonComponent.metadata.id, {
      source: 'Figma Design System',
      nodeId: '185:852',
      states: ['default', 'hover', 'active', 'disabled', 'loading'],
      variants: ['default', 'destructive', 'outline', 'ghost']
    });
    console.log('✅ PrimaryMediumButton added successfully!');
  }
}

export { primaryMediumButtonComponent };