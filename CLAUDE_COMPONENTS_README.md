# Claude Code Component Library

A specialized library tool for demoing and managing React components built by Claude Code.

## What This Tool Does

- **Interactive Component Demos**: View all your Claude-built components with live previews
- **Code Viewing**: Switch between preview and code view for any component
- **Component Management**: Search, filter, and organize components
- **Demo Pages**: Create dedicated demo pages for complex components (like button states)

## How Claude Code Uses This Library

### Adding Components

Claude Code can add components using the `ClaudeCodeComponents` helper:

```typescript
import { ClaudeCodeComponents } from '@/lib/claudeCodeComponents';

// Add a new component to the library
ClaudeCodeComponents.addComponent({
  name: 'MyButton',
  description: 'A custom button component with multiple states',
  code: '/* component code here */',
  tags: ['button', 'interactive'],
  dependencies: ['react', 'clsx'],
  figmaUrl: 'https://figma.com/file/...',
});
```

## Current Components

- **Primary Medium Button**: Available in main library
  - All interactive states (hover, active, disabled, loading)
  - 4 variants (default, destructive, outline, ghost)
  - 3 sizes (small, medium, large)
  - Built from Figma Design System (Node: 185:852)

## Library Features

### 1. Component Grid View
- Search by name, description, or tags
- Filter by status (approved, review, draft, deprecated)
- Component metadata (version, author, created date)
- Quick preview and code view

### 2. Component Modal
- **Preview Mode**: Interactive component preview
- **Code Mode**: Full component source code
- Component metadata and tags
- Download component as .tsx file

## File Structure

```
src/
├── components/
│   ├── PrimaryMediumButton.tsx     # Component implementations
│   └── ComponentPreview.tsx        # Preview renderer
├── pages/
│   └── ComponentLibrary.tsx        # Single page application
├── lib/
│   ├── claudeCodeComponents.ts     # Claude Code helper
│   ├── storage.ts                  # Component persistence
│   └── initializePrimaryButton.ts  # Component initialization
└── types/
    └── index.ts                    # TypeScript definitions
```

## Usage Instructions

### For Users:
1. Open http://localhost:3001 (single page application)
2. Browse all Claude-built components
3. Use eye icon to preview components
4. Switch between Preview/Code modes in modal

### For Claude Code:
1. Create component in `/src/components/`
2. Use `ClaudeCodeComponents.addComponent()` to add to library
3. Components automatically appear with interactive previews

## Design System Integration

The library uses your extracted Figma Design System variables:
- **Colors**: 68 color tokens (grays, semantic colors)
- **Spacing**: 14 spacing values (xs to 10xl)
- **Typography**: 13 scales with line heights
- **Components**: All use consistent design tokens

## Key Benefits

1. **No GUI Needed**: Pure library tool, components built via Claude Code
2. **Interactive Demos**: See components in action, not just static code
3. **Code Access**: Always available for copying/modifying
4. **Organized**: Search, filter, and categorize all components
5. **Design System**: Consistent styling using your Figma variables

## Next Steps

Ask Claude Code to build more components and they'll automatically appear in the library with interactive previews and code viewing capabilities.