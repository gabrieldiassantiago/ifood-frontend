'use client'

import { ReactNode } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import CartDrawer from './components/CartDrawer'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
    
        <ToastProvider>
          {children}
        </ToastProvider>
    
    </AuthProvider>
  )
}
