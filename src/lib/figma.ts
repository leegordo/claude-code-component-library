import { FigmaNode } from '@/types';

export class FigmaService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getFileNodes(fileId: string, nodeIds?: string[]): Promise<FigmaNode[]> {
    try {
      const params = nodeIds ? `?ids=${nodeIds.join(',')}` : '';
      const response = await fetch(`https://api.figma.com/v1/files/${fileId}/nodes${params}`, {
        headers: {
          'X-Figma-Token': this.accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformNodes(data.nodes);
    } catch (error) {
      console.error('Error fetching Figma nodes:', error);
      throw error;
    }
  }

  async exportImages(fileId: string, nodeIds: string[], format: 'png' | 'jpg' | 'svg' = 'png'): Promise<Record<string, string>> {
    try {
      const response = await fetch(
        `https://api.figma.com/v1/images/${fileId}?ids=${nodeIds.join(',')}&format=${format}&scale=2`,
        {
          headers: {
            'X-Figma-Token': this.accessToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.images;
    } catch (error) {
      console.error('Error exporting Figma images:', error);
      throw error;
    }
  }

  private transformNodes(nodes: any): FigmaNode[] {
    return Object.values(nodes).map((node: any) => this.mapFigmaNode(node));
  }

  private mapFigmaNode(node: any): FigmaNode {
    return {
      id: node.id,
      name: node.name,
      type: node.type,
      visible: node.visible ?? true,
      locked: node.locked ?? false,
      absoluteBoundingBox: node.absoluteBoundingBox,
      fills: node.fills,
      strokes: node.strokes,
      strokeWeight: node.strokeWeight,
      cornerRadius: node.cornerRadius,
      children: node.children?.map((child: any) => this.mapFigmaNode(child)),
    };
  }
}