import { GeneratedComponent } from '@/types';

export const sampleComponents: GeneratedComponent[] = [
  {
    metadata: {
      id: 'sample-button-1',
      name: 'PrimaryButton',
      description: 'A primary button component with hover effects and customizable styling.',
      figmaUrl: 'https://www.figma.com/file/example',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      author: 'Designer',
      tags: ['button', 'primary', 'interactive'],
      framework: 'react',
      status: 'approved',
    },
    code: `import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export function PrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  className,
  variant = 'primary',
  size = 'md',
  ...props 
}: PrimaryButtonProps) {
  return (
    <button 
      className={cn(
        "font-medium rounded-lg transition-colors",
        "focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          // Size variants
          'px-md py-xs text-sm': size === 'sm',
          'px-lg py-md text-base': size === 'md', 
          'px-xl py-lg text-lg': size === 'lg',
          
          // Color variants - using your design system (black buttons)
          'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900': variant === 'primary',
          'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600': variant === 'secondary',
          'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800': variant === 'accent',
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;`,
    assets: [],
    dependencies: ['react', 'clsx'],
  },
  
  {
    metadata: {
      id: 'sample-card-1',
      name: 'ProductCard',
      description: 'A product card component displaying product information with image, title, and price.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.2.0',
      author: 'Designer',
      tags: ['card', 'product', 'ecommerce'],
      framework: 'react',
      status: 'approved',
    },
    code: `import React from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  price: string;
  image?: string;
  description?: string;
  onAddToCart?: () => void;
  className?: string;
}

export function ProductCard({ 
  title, 
  price, 
  image, 
  description, 
  onAddToCart,
  className 
}: ProductCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
      className
    )}>
      {image && (
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">{price}</span>
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;`,
    assets: [],
    dependencies: ['react', 'clsx'],
  },
  
  {
    metadata: {
      id: 'sample-input-1',
      name: 'TextInput',
      description: 'A styled text input component with label and error state support.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      author: 'Designer',
      tags: ['input', 'form', 'text'],
      framework: 'react',
      status: 'review',
    },
    code: `import React from 'react';
import { cn } from '@/lib/utils';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function TextInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  disabled = false,
  className 
}: TextInputProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          error 
            ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300"
        )}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default TextInput;`,
    assets: [],
    dependencies: ['react', 'clsx'],
  },
  
  {
    metadata: {
      id: 'sample-badge-1',
      name: 'StatusBadge',
      description: 'A badge component for displaying status information with different color variants.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      author: 'Designer',
      tags: ['badge', 'status', 'indicator'],
      framework: 'react',
      status: 'draft',
    },
    code: `import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  className 
}: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-full",
      {
        // Size variants
        'px-2 py-1 text-xs': size === 'sm',
        'px-2.5 py-1 text-sm': size === 'md',
        'px-3 py-1.5 text-base': size === 'lg',
        
        // Color variants
        'bg-green-100 text-green-800': variant === 'success',
        'bg-yellow-100 text-yellow-800': variant === 'warning',
        'bg-red-100 text-red-800': variant === 'error',
        'bg-blue-100 text-blue-800': variant === 'info',
        'bg-gray-100 text-gray-800': variant === 'neutral',
      },
      className
    )}>
      {children}
    </span>
  );
}

export default StatusBadge;`,
    assets: [],
    dependencies: ['react', 'clsx'],
  },
];

export function addSampleComponents() {
  sampleComponents.forEach(component => {
    // Only add if it doesn't already exist
    const existing = JSON.parse(localStorage.getItem('figma-react-components') || '[]');
    const exists = existing.some((c: any) => c.metadata.id === component.metadata.id);
    
    if (!exists) {
      const components = [...existing, component];
      localStorage.setItem('figma-react-components', JSON.stringify(components));
    }
  });
}