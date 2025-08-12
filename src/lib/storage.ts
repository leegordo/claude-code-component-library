import { GeneratedComponent, ProjectConfig } from '@/types';

const STORAGE_KEYS = {
  COMPONENTS: 'figma-react-components',
  CONFIG: 'figma-react-config',
  HISTORY: 'figma-react-history',
} as const;

export class StorageService {
  static saveComponent(component: GeneratedComponent): void {
    const components = this.getComponents();
    const existingIndex = components.findIndex(c => c.metadata.id === component.metadata.id);
    
    if (existingIndex >= 0) {
      components[existingIndex] = component;
    } else {
      components.push(component);
    }
    
    localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(components));
  }

  static getComponents(): GeneratedComponent[] {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPONENTS);
    return stored ? JSON.parse(stored) : [];
  }

  static deleteComponent(id: string): void {
    const components = this.getComponents().filter(c => c.metadata.id !== id);
    localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(components));
  }

  static getComponent(id: string): GeneratedComponent | undefined {
    return this.getComponents().find(c => c.metadata.id === id);
  }

  static saveConfig(config: ProjectConfig): void {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }

  static getConfig(): ProjectConfig | null {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return stored ? JSON.parse(stored) : null;
  }

  static addToHistory(action: string, componentId: string, details?: any): void {
    const history = this.getHistory();
    history.unshift({
      id: Date.now().toString(),
      action,
      componentId,
      timestamp: new Date().toISOString(),
      details,
    });

    // Keep only last 100 history items
    if (history.length > 100) {
      history.splice(100);
    }

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }

  static getHistory(): any[] {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  }

  static exportData(): string {
    return JSON.stringify({
      components: this.getComponents(),
      config: this.getConfig(),
      history: this.getHistory(),
      exportedAt: new Date().toISOString(),
    }, null, 2);
  }

  static importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.components) {
        localStorage.setItem(STORAGE_KEYS.COMPONENTS, JSON.stringify(data.components));
      }
      
      if (data.config) {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data.config));
      }
      
      if (data.history) {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid import data format');
    }
  }
}