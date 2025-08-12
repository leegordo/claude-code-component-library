import { ReactNode } from 'react'
import { Code2 } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-lg sm:px-6xl lg:px-8xl">
          <div className="flex items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Code2 className="h-8 w-8 text-gray-900" />
              <span className="ml-md text-xl font-semibold text-gray-900">
                Claude Code Components
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-3xl px-lg sm:px-6xl lg:px-8xl">
        {children}
      </main>
    </div>
  )
}