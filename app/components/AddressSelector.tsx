'use client'

import { useState, useEffect } from 'react'
import { MapPin, X, Plus, Check } from 'lucide-react'
import { Address } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

interface AddressSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectAddress: (address: Address) => void
  selectedAddressId?: string
}

export default function AddressSelector({ 
  isOpen, 
  onClose, 
  onSelectAddress,
  selectedAddressId 
}: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchAddresses()
    }
  }, [isOpen, isAuthenticated])

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/addresses')
      if (response.ok) {
        const data = await response.json()
        setAddresses(data)
      }
    } catch (error) {
      console.error('Erro ao buscar endereços:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { y: "100%", opacity: 0.5 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 }
    },
    exit: { y: "100%", opacity: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center pointer-events-none p-4">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
                <div>
                  <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Onde você está?</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Selecione para entrega</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-2">
                {!isAuthenticated ? (
                   <div className="py-8 text-center">
                     <p>Faça login para ver seus endereços</p>
                   </div>
                ) : loading ? (
                  <div className="p-4 text-center text-gray-400">Carregando...</div>
                ) : addresses.length === 0 ? (
                   <div className="py-8 text-center text-gray-500">
                     Nenhum endereço salvo.
                   </div>
                ) : (
                  addresses.map((address) => {
                    const isSelected = selectedAddressId === address.id
                    return (
                      <motion.button
                        key={address.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelectAddress(address)
                          onClose()
                        }}
                        className={`w-full group flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-200
                          ${isSelected 
                            ? 'bg-[#F5F5F7] ring-2 ring-inset ring-[#1D1D1F]' 
                            : 'bg-white hover:bg-[#F5F5F7]'
                          }`}
                      >
                        <div className={`p-2.5 rounded-full shrink-0 transition-colors ${
                          isSelected ? 'bg-[#1D1D1F] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm'
                        }`}>
                          <MapPin size={18} strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex-1 min-w-0 pt-1">
                          <p className={`text-[15px] leading-none mb-1.5 ${
                            isSelected ? 'font-bold text-[#1D1D1F]' : 'font-semibold text-gray-700'
                          }`}>
                            {address.street}, {address.number}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {address.district}, {address.city}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="mt-1 text-[#1D1D1F]">
                            <Check size={20} strokeWidth={3} />
                          </div>
                        )}
                      </motion.button>
                    )
                  })
                )}
              </div>

              <div className="p-4 border-t border-gray-100/50 bg-white">
                <button
                  onClick={() => {
                    onClose()
                    window.location.href = '/profile'
                  }}
                  className="w-full py-4 rounded-2xl bg-[#EA1D2C] hover:bg-[#D91A28] text-white 
                           font-semibold text-[15px] shadow-lg shadow-red-500/20 active:scale-[0.98] 
                           transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} strokeWidth={3} />
                  Adicionar novo endereço
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}