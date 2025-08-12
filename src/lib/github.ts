import { GeneratedComponent } from '@/types';

export class GitHubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async createRepository(name: string, description?: string, isPrivate: boolean = false): Promise<string> {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: `token ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          private: isPrivate,
          auto_init: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const repo = await response.json();
      return repo.html_url;
    } catch (error) {
      console.error('Error creating GitHub repository:', error);
      throw error;
    }
  }

  async createFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch: string = 'main'
  ): Promise<void> {
    try {
      const encodedContent = btoa(unescape(encodeURIComponent(content)));
      
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: encodedContent,
          branch,
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating file on GitHub:', error);
      throw error;
    }
  }

  async publishComponent(
    owner: string,
    repo: string,
    component: GeneratedComponent,
    branch: string = 'main'
  ): Promise<void> {
    const { metadata, code, assets, storybook, tests } = component;
    const componentDir = `src/components/${metadata.name}`;

    // Create component file
    await this.createFile(
      owner,
      repo,
      `${componentDir}/index.tsx`,
      code,
      `Add ${metadata.name} component`,
      branch
    );

    // Create component metadata
    await this.createFile(
      owner,
      repo,
      `${componentDir}/metadata.json`,
      JSON.stringify(metadata, null, 2),
      `Add ${metadata.name} metadata`,
      branch
    );

    // Create Storybook story if available
    if (storybook) {
      await this.createFile(
        owner,
        repo,
        `${componentDir}/${metadata.name}.stories.tsx`,
        storybook,
        `Add ${metadata.name} Storybook story`,
        branch
      );
    }

    // Create tests if available
    if (tests) {
      await this.createFile(
        owner,
        repo,
        `${componentDir}/${metadata.name}.test.tsx`,
        tests,
        `Add ${metadata.name} tests`,
        branch
      );
    }

    // Handle assets
    for (const asset of assets) {
      // This would require downloading and uploading the asset
      // Implementation depends on how you want to handle binary files
      console.log(`Asset ${asset.name} needs to be uploaded to ${componentDir}/assets/`);
    }
  }
}