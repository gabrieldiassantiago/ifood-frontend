'use client'

import Link from 'next/link'
import { MapPin, ShoppingBag, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AddressSelector from './AddressSelector'
import { Address } from '../types'
import { useCartStore, useHydration } from '../contexts/CartContext'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  location?: string
}

export default function Header({ location = 'Selecionar endereço' }: HeaderProps) {
  const { itemCount } = useCartStore()
  const hydrated = useHydration()
  const router = useRouter()
  const [isAddressSelectorOpen, setIsAddressSelectorOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedAddress')
    if (savedAddress) {
      try {
        setSelectedAddress(JSON.parse(savedAddress))
      } catch (e) { console.error(e) }
    }
  }, [])

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address)
    localStorage.setItem('selectedAddress', JSON.stringify(address))
  }

  const displayLocation = selectedAddress 
    ? `${selectedAddress.number} ${selectedAddress.street}` 
    : location

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100/50"
      >
        <div className="px-5 h-[72px] flex items-center justify-between">
          
         
          <button 
            onClick={() => setIsAddressSelectorOpen(true)}
            className="flex items-center gap-2 -ml-2 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
              <MapPin size={18} className="text-pink-600" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Entregar em
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-bold text-gray-900 max-w-[140px] truncate">
                  {displayLocation}
                </span>
                <ChevronDown size={14} strokeWidth={2.5} className="text-gray-400" />
              </div>
            </div>
          </button>

        
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/cart')}
            className="relative w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag size={22} strokeWidth={2} className="text-gray-700" />
            <AnimatePresence>
              {hydrated && itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-pink-600 text-white text-[11px] 
                           w-5 h-5 rounded-full flex items-center justify-center font-bold 
                           border-2 border-white shadow-lg"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      <AddressSelector
        isOpen={isAddressSelectorOpen}
        onClose={() => setIsAddressSelectorOpen(false)}
        onSelectAddress={handleSelectAddress}
        selectedAddressId={selectedAddress?.id}
      />
    </>
  )
}
