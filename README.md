# Figma to React Workflow

A comprehensive workflow tool that automates the conversion of Figma designs into production-ready React components and publishes them to a component library.

## 🎯 Overview

This tool bridges the gap between design and development by allowing designers to:
- Generate React components directly from Figma designs
- Manage a personal library of created components
- Publish components to GitHub repositories
- Track component history and versions

## 🚀 Features

- **🎨 Figma Integration**: Connect to Figma via MCP server to fetch designs and assets
- **⚛️ React Generation**: Generate production-ready React components with TypeScript
- **🎨 Tailwind Support**: Automatic styling with Tailwind CSS classes
- **📚 Component Library**: Dashboard to view and manage all created components  
- **🐙 GitHub Integration**: Publish components directly to GitHub repositories
- **💾 Asset Management**: Download and organize design assets automatically
- **📖 Storybook Stories**: Generate Storybook stories for component documentation
- **📱 Responsive Dashboard**: Clean, modern interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Development**: ESLint, Prettier
- **Documentation**: Storybook
- **Integration**: Claude Code with MCP servers (Figma, GitHub)

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure MCP servers**:
   - Add your Figma access token to `.claude_config.json`
   - Add your GitHub personal access token to `.claude_config.json`

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Figma Setup
1. Get your Figma access token:
   - Go to Figma → Account Settings → Personal Access Tokens
   - Generate a new token
   - Add it to the config file

### GitHub Setup  
1. Create a GitHub personal access token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate token with repo permissions
   - Add it to the config file

### MCP Configuration
The `.claude_config.json` file configures the MCP servers:

```json
{
  "mcp_servers": {
    "figma": {
      "command": "npx",
      "args": ["@figma-exp/mcp-server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-token-here"
      }
    },
    "github": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

## 🎯 Usage

### 1. Generate a Component
- Navigate to the Generate tab
- Enter your Figma URL and component name
- Configure generation options
- Click "Generate Component"

### 2. Manage Components
- View all generated components in the Library tab
- Search and filter components
- View component code and details
- Delete unused components

### 3. Configure Settings
- Set up project configuration in Settings
- Configure Figma and GitHub integrations
- Export/import your component data

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Main application pages
├── lib/             # Utility libraries and services
├── types/           # TypeScript type definitions
├── assets/          # Static assets (images, icons, fonts)
└── hooks/           # Custom React hooks
```

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run linter
npm run lint

# Run type checking
npm run type-check

# Format code
npm run format

# Start Storybook
npm run storybook
```

## 🎨 User Journey

1. **Designer creates** a feature design in Figma
2. **Designer uses** Claude Code with Figma MCP to generate React component
3. **System extracts** design tokens, assets, and structure
4. **System generates** production-ready React component with TypeScript
5. **Designer reviews** generated component in the dashboard
6. **System publishes** component to GitHub repository
7. **Developers access** the component from the published library

## 🔮 Future Features

- **Community Sharing**: Share and discover components with other users
- **Design System Integration**: Connect with existing design systems
- **Multiple Framework Support**: Support for Vue, Angular, etc.
- **Advanced Code Generation**: More sophisticated component logic generation
- **Collaboration Features**: Team workspaces and component approvals

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.