'use client'

import { ReactNode, Component, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class AudioErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Audio error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-ferrari-red/30 bg-ferrari-red/5 p-6">
          <h3 className="font-semibold text-ferrari-red">Audio Error</h3>
          <p className="mt-2 text-sm text-white/70">
            The audio engine encountered an error. Please refresh the page or try a different browser.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
