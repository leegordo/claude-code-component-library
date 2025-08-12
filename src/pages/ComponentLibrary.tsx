import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Download, Trash2, ExternalLink, Code, Monitor } from 'lucide-react'
import { StorageService } from '@/lib/storage'
import { GeneratedComponent } from '@/types'
import { ComponentPreview } from '@/components/ComponentPreview'
import clsx from 'clsx'

export function ComponentLibrary() {
  const [components, setComponents] = useState<GeneratedComponent[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedComponent, setSelectedComponent] = useState<GeneratedComponent | null>(null)
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code')

  useEffect(() => {
    setComponents(StorageService.getComponents())
  }, [])

  const filteredComponents = components.filter((component) => {
    const matchesSearch = component.metadata.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      component.metadata.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = selectedStatus === 'all' || component.metadata.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this component?')) {
      StorageService.deleteComponent(id)
      setComponents(StorageService.getComponents())
      StorageService.addToHistory('Deleted component', id)
    }
  }

  const handleDownload = (component: GeneratedComponent) => {
    const blob = new Blob([component.code], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${component.metadata.name}.tsx`
    a.click()
    URL.revokeObjectURL(url)
    StorageService.addToHistory('Downloaded component', component.metadata.id)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Claude Code Component Library</h1>
        <p className="mt-2 text-gray-600">
          Interactive demos and code for all components built by Claude Code.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <div key={component.metadata.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {component.metadata.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    v{component.metadata.version}
                  </p>
                </div>
                <span className={clsx(
                  'px-2 py-1 text-xs rounded-full font-medium',
                  {
                    'bg-green-100 text-green-800': component.metadata.status === 'approved',
                    'bg-yellow-100 text-yellow-800': component.metadata.status === 'review',
                    'bg-gray-100 text-gray-800': component.metadata.status === 'draft',
                    'bg-red-100 text-red-800': component.metadata.status === 'deprecated',
                  }
                )}>
                  {component.metadata.status}
                </span>
              </div>

              {component.metadata.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {component.metadata.description}
                </p>
              )}

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {component.metadata.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {component.metadata.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{component.metadata.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Created {new Date(component.metadata.createdAt).toLocaleDateString()}
                <br />
                by {component.metadata.author}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedComponent(component)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDownload(component)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>

                  {component.metadata.figmaUrl && (
                    <a
                      href={component.metadata.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="View in Figma"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(component.metadata.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
          <p className="text-gray-500">
            {searchQuery || selectedStatus !== 'all' 
              ? 'Try adjusting your search or filters.' 
              : 'Ask Claude Code to build components and they will appear here with interactive demos.'}
          </p>
        </div>
      )}

      {/* Component Detail Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedComponent.metadata.name}
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="flex rounded-md border border-gray-200">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={clsx(
                        'px-3 py-1 text-sm font-medium flex items-center space-x-1',
                        viewMode === 'preview'
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      )}
                    >
                      <Monitor className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => setViewMode('code')}
                      className={clsx(
                        'px-3 py-1 text-sm font-medium flex items-center space-x-1',
                        viewMode === 'code'
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      )}
                    >
                      <Code className="h-4 w-4" />
                      <span>Code</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedComponent(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {viewMode === 'preview' ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Component Preview</h3>
                    <ComponentPreview component={selectedComponent} />
                  </div>
                  
                  {selectedComponent.metadata.description && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedComponent.metadata.description}</p>
                    </div>
                  )}
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Component Info</h4>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Version:</dt>
                        <dd className="text-gray-900">{selectedComponent.metadata.version}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Status:</dt>
                        <dd>
                          <span className={clsx(
                            'px-2 py-1 text-xs rounded-full font-medium',
                            {
                              'bg-green-100 text-green-800': selectedComponent.metadata.status === 'approved',
                              'bg-yellow-100 text-yellow-800': selectedComponent.metadata.status === 'review',
                              'bg-gray-100 text-gray-800': selectedComponent.metadata.status === 'draft',
                              'bg-red-100 text-red-800': selectedComponent.metadata.status === 'deprecated',
                            }
                          )}>
                            {selectedComponent.metadata.status}
                          </span>
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Created:</dt>
                        <dd className="text-gray-900">
                          {new Date(selectedComponent.metadata.createdAt).toLocaleDateString()}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Author:</dt>
                        <dd className="text-gray-900">{selectedComponent.metadata.author}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  {selectedComponent.metadata.tags.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedComponent.metadata.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{selectedComponent.code}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}