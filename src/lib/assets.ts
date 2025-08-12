import { AssetFile } from '@/types';

export class AssetManager {
  private static baseUrl = '/src/assets';

  static async downloadAsset(url: string, name: string, type: AssetFile['type']): Promise<AssetFile> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download asset: ${response.statusText}`);
      }

      const blob = await response.blob();
      const localPath = `${this.baseUrl}/${type}s/${name}`;
      
      // In a real implementation, you would save the blob to the file system
      // For now, we'll create a data URL
      const dataUrl = URL.createObjectURL(blob);

      let dimensions: { width: number; height: number } | undefined;
      
      if (type === 'image' || type === 'icon') {
        dimensions = await this.getImageDimensions(dataUrl);
      }

      return {
        name,
        type,
        url,
        localPath,
        size: blob.size,
        dimensions,
      };
    } catch (error) {
      console.error('Error downloading asset:', error);
      throw error;
    }
  }

  static async downloadMultipleAssets(urls: Record<string, string>, type: AssetFile['type']): Promise<AssetFile[]> {
    const promises = Object.entries(urls).map(([nodeId, url]) => 
      this.downloadAsset(url, `${nodeId}.${this.getFileExtension(url)}`, type)
    );
    
    return Promise.all(promises);
  }

  private static getFileExtension(url: string): string {
    const pathname = new URL(url).pathname;
    return pathname.split('.').pop() || 'png';
  }

  private static getImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = src;
    });
  }

  static optimizeAssetName(figmaName: string): string {
    return figmaName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  static generateAssetImports(assets: AssetFile[]): string {
    return assets
      .map((asset, index) => {
        const importName = `asset${index}`;
        return `import ${importName} from '${asset.localPath}';`;
      })
      .join('\n');
  }

  static generateAssetExports(assets: AssetFile[]): string {
    const exportObject = assets.reduce((acc, asset, index) => {
      const key = this.optimizeAssetName(asset.name.replace(/\.[^/.]+$/, ''));
      acc[key] = `asset${index}`;
      return acc;
    }, {} as Record<string, string>);

    return `export const assets = ${JSON.stringify(exportObject, null, 2).replace(/"/g, '')};`;
  }

  static createAssetManifest(assets: AssetFile[]): string {
    return JSON.stringify({
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      assets: assets.map(asset => ({
        name: asset.name,
        type: asset.type,
        size: asset.size,
        dimensions: asset.dimensions,
        localPath: asset.localPath,
      })),
    }, null, 2);
  }
}