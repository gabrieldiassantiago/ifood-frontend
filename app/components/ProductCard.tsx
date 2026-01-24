import Image from 'next/image'
import Link from 'next/link'
import { Plus, Star } from 'lucide-react'
import { Product } from '../types'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAdding(true)
    onAddToCart?.(product)
    
    setTimeout(() => setIsAdding(false), 600)
  }

  return (
    <Link href={`/product/${product.id}`} prefetch={false}>
      <motion.div 
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white rounded-[24px] overflow-hidden 
                  shadow-sm hover:shadow-xl transition-all duration-300 
                  border border-gray-100"
      >
        
        <div className="relative h-40 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-5xl">
              🍽️
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 
                        rounded-full flex items-center gap-1 shadow-sm">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-gray-900">4.5</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-[15px] mb-1 line-clamp-1 leading-tight">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                {(product.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleAddClick}
              disabled={isAdding}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                       transition-all duration-300 shadow-lg
                       ${isAdding 
                         ? 'bg-green-500 shadow-green-500/30' 
                         : 'bg-[#EA1D2C] hover:bg-[#D91A28] shadow-red-500/30'
                       }`}
            >
              {isAdding ? (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <Plus size={18} strokeWidth={2.5} className="text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
