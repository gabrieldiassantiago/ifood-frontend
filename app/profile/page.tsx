'use client'

import { useRouter } from 'next/navigation'
import { User, MapPin, ShoppingBag, LogOut, ChevronRight, Settings, HelpCircle, FileText } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import BottomNavigation from '../components/BottomNavigation'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }


  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-lime-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Olá, {user?.name}</h1>
              <h1 className="text-gray-500">{user?.email}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl overflow-hidden">
          <button
            onClick={() => router.push('/orders')}
            className="w-full flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <ShoppingBag className="text-gray-400" size={24} />
            <span className="flex-1 text-left font-medium text-gray-700">Meus Pedidos</span>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button
            onClick={() => router.push('/addresses')}
            className="w-full flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <MapPin className="text-gray-400" size={24} />
            <span className="flex-1 text-left font-medium text-gray-700">Meus Endereços</span>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
            <Settings className="text-gray-400" size={24} />
            <span className="flex-1 text-left font-medium text-gray-700">Configurações</span>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
            <HelpCircle className="text-gray-400" size={24} />
            <span className="flex-1 text-left font-medium text-gray-700">Ajuda</span>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition">
            <FileText className="text-gray-400" size={24} />
            <span className="flex-1 text-left font-medium text-gray-700">Termos e Políticas</span>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-white rounded-2xl text-red-500 font-medium hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Sair da conta
        </button>
      </div>

      <BottomNavigation />
    </div>
  )
}
