'use client'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-earth-50 text-earth-900 p-6">
          <h1 className="text-4xl font-serif mb-2">Something went wrong</h1>
          <p className="text-body text-earth-700 mb-4">
            We encountered an error. Please try again or contact us.
          </p>
          <a href="/" className="btn-primary">Back to home</a>
        </main>
      )
    }
    return this.props.children
  }
}