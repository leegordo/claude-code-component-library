export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fills?: any[];
  strokes?: any[];
  strokeWeight?: number;
  cornerRadius?: number;
  children?: FigmaNode[];
}

export interface ComponentMetadata {
  id: string;
  name: string;
  description?: string;
  figmaUrl?: string;
  figmaNodeId?: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  author: string;
  tags: string[];
  framework: 'react' | 'vue' | 'angular';
  status: 'draft' | 'review' | 'approved' | 'deprecated';
}

export interface GeneratedComponent {
  metadata: ComponentMetadata;
  code: string;
  assets: AssetFile[];
  dependencies: string[];
  storybook?: string;
  tests?: string;
}

export interface AssetFile {
  name: string;
  type: 'image' | 'icon' | 'font' | 'other';
  url: string;
  localPath: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface ProjectConfig {
  name: string;
  framework: 'react' | 'vue' | 'angular';
  styling: 'tailwind' | 'styled-components' | 'css-modules' | 'scss';
  github: {
    owner: string;
    repo: string;
    branch: string;
  };
  figma: {
    fileId?: string;
    accessToken?: string;
  };
}