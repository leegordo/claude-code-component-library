import { useState, useEffect, useMemo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { GeneratedComponent } from '@/types'

interface ComponentPreviewProps {
  component: GeneratedComponent
  className?: string
}

export function ComponentPreview({ component, className = '' }: ComponentPreviewProps) {
  const [PreviewComponent, setPreviewComponent] = useState<React.ComponentType<any> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Create a safe component from the code string
  const createPreviewComponent = useMemo(() => {
    return () => {
      try {
        setError(null)
        setIsLoading(true)

        // Extract the component code and create a safe preview
        const componentCode = component.code

        // Simple regex to extract component name and props interface
        const componentNameMatch = componentCode.match(/export function (\w+)/)
        const interfaceMatch = componentCode.match(/interface (\w+)Props\s*{([^}]+)}/)

        if (!componentNameMatch) {
          throw new Error('Could not find component export')
        }

        const componentName = componentNameMatch[1]

        // Create a mock component that renders the expected structure
        const mockComponent = () => {
          // Parse common props from the interface if available
          let mockProps: any = {}
          
          if (interfaceMatch) {
            const propsContent = interfaceMatch[2]
            
            // Look for common prop patterns
            if (propsContent.includes('children')) {
              mockProps.children = `${componentName} Preview`
            }
            if (propsContent.includes('title')) {
              mockProps.title = 'Sample Title'
            }
            if (propsContent.includes('label')) {
              mockProps.label = 'Sample Label'
            }
            if (propsContent.includes('text')) {
              mockProps.text = 'Sample Text'
            }
            if (propsContent.includes('onClick')) {
              mockProps.onClick = () => console.log(`${componentName} clicked`)
            }
          }

          // Create a basic preview based on component type/name
          const lowerName = componentName.toLowerCase()
          
          if (lowerName.includes('button')) {
            return (
              <button 
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
                onClick={mockProps.onClick}
              >
                {mockProps.children || mockProps.label || mockProps.text || componentName}
              </button>
            )
          }
          
          if (lowerName.includes('card')) {
            return (
              <div className="card p-2xl">
                <h3 className="font-medium text-gray-900 mb-md">
                  {mockProps.title || `${componentName} Title`}
                </h3>
                <p className="text-sm text-gray-600">
                  {mockProps.children || `This is a preview of the ${componentName} component.`}
                </p>
              </div>
            )
          }
          
          if (lowerName.includes('input')) {
            return (
              <input 
                type="text"
                placeholder={mockProps.placeholder || `Enter ${componentName.toLowerCase()}`}
                className="input"
                defaultValue={mockProps.value || ''}
              />
            )
          }
          
          if (lowerName.includes('modal') || lowerName.includes('dialog')) {
            return (
              <div className="card p-3xl shadow-lg max-w-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-2xl">
                  {mockProps.title || `${componentName} Preview`}
                </h2>
                <p className="text-gray-600 mb-2xl">
                  {mockProps.children || 'This is a preview of the modal component.'}
                </p>
                <div className="flex justify-end space-x-md">
                  <button className="px-md py-xs text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="btn-primary text-sm">
                    Confirm
                  </button>
                </div>
              </div>
            )
          }
          
          if (lowerName.includes('badge') || lowerName.includes('tag')) {
            return (
              <span className="badge-info">
                {mockProps.children || mockProps.text || componentName}
              </span>
            )
          }
          
          // Default fallback component
          return (
            <div className="card p-2xl">
              <div className="flex items-center space-x-md mb-md">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="font-medium text-gray-900">{componentName}</span>
              </div>
              <p className="text-sm text-gray-600">
                {mockProps.children || `This is a preview of the ${componentName} component.`}
              </p>
              {mockProps.onClick && (
                <button 
                  onClick={mockProps.onClick}
                  className="mt-md text-xs text-primary-600 hover:text-primary-500"
                >
                  Click to interact
                </button>
              )}
            </div>
          )
        }

        setPreviewComponent(() => mockComponent)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create preview')
        setIsLoading(false)
      }
    }
  }, [component.code])

  useEffect(() => {
    createPreviewComponent()
  }, [createPreviewComponent])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4xl border-2 border-dashed border-gray-200 rounded-xl ${className}`}>
        <div className="text-center">
          <div className="animate-pulse w-8 h-8 bg-gray-200 rounded mx-auto mb-md"></div>
          <p className="text-sm text-gray-500">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-4xl border-2 border-dashed border-error-200 bg-error-50 rounded-xl ${className}`}>
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-error-500 mx-auto mb-md" />
          <p className="text-sm text-error-600 font-medium">Preview Error</p>
          <p className="text-xs text-error-500 mt-xs">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-4xl border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 ${className}`}>
      <div className="flex items-center justify-center">
        {PreviewComponent && <PreviewComponent />}
      </div>
    </div>
  )
}