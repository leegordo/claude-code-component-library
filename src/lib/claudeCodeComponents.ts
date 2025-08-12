import { GeneratedComponent } from '@/types';
import { StorageService } from './storage';

/**
 * Claude Code Component Library Helper
 * This service makes it easy for Claude Code to add components to the library
 */
export class ClaudeCodeComponents {
  /**
   * Add a new component built by Claude Code to the library
   */
  static addComponent(config: {
    name: string;
    description: string;
    code: string;
    tags?: string[];
    dependencies?: string[];
    figmaUrl?: string;
    author?: string;
  }): GeneratedComponent {
    const component: GeneratedComponent = {
      metadata: {
        id: `claude-${Date.now()}-${config.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: config.name,
        description: config.description,
        figmaUrl: config.figmaUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0',
        author: config.author || 'Claude Code',
        tags: config.tags || ['claude-built'],
        framework: 'react',
        status: 'approved',
      },
      code: config.code,
      assets: [],
      dependencies: config.dependencies || ['react'],
    };

    StorageService.saveComponent(component);
    StorageService.addToHistory('created', component.metadata.id, {
      source: 'Claude Code',
      componentName: config.name
    });

    console.log(`✅ Added component "${config.name}" to Claude Code library`);
    return component;
  }


  /**
   * Get all Claude Code built components
   */
  static getClaudeComponents(): GeneratedComponent[] {
    return StorageService.getComponents().filter(
      component => component.metadata.author === 'Claude Code' || 
                  component.metadata.tags.includes('claude-built')
    );
  }

  /**
   * Quick component template for common patterns
   */
  static generateComponentTemplate(componentName: string): string {
    return `import React from 'react';
import { cn } from '@/lib/utils';

interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
}

export function ${componentName}({ 
  className,
  children,
  ...props 
}: ${componentName}Props) {
  return (
    <div 
      className={cn(
        // Base styles using your design system
        "// Add your styles here",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ${componentName};`;
  }
}

export default ClaudeCodeComponents;