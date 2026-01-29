'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import ProductCard from './ProductCard'
import SearchModal from './SearchModal'
import { Product, Category } from '../types'
import { useToast } from '../contexts/ToastContext'
import { useCartStore } from '../contexts/CartContext'
import Header from './Header'

interface Props {
  products: Product[]
  categories: Category[]
}

const categoryEmojis: Record<string, string> = {
  'burgers': '🍔', 'pizza': '🍕', 'bebidas': '🥤', 'sobremesas': '🍰',
  'saladas': '🥗', 'churrasco': '🥩', 'massas': '🍝', 'japonesa': '🍱',
  'mexicana': '🌮', 'lanches': '🍔', 'saudavel': '🥗', 'vegano': '🌱',
}

function getCategoryEmoji(name: string): string {
  const normalized = name.toLowerCase()
  for (const [key, emoji] of Object.entries(categoryEmojis)) {
    if (normalized.includes(key)) return emoji
  }
  return '🍽️'
}

const categoryColors = [
  'from-red-50 to-red-100',
  'from-orange-50 to-orange-100',
  'from-rose-50 to-rose-100',
  'from-red-100 to-orange-100',
  'from-pink-50 to-red-100',
  'from-amber-50 to-red-100',
  'from-red-50 to-pink-100',
  'from-orange-50 to-red-100',
]

export default function ProductSection({ products, categories }: Props) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const { addItem } = useCartStore()
  const { showToast } = useToast()

  const recommendedProducts = products.slice(0, 3)
  
  const gridProducts = products.filter(product => 
    !selectedCategory || product.categoryId === selectedCategory
  )

  const handleAddToCart = (product: Product) => {
    addItem(product, 1, [])
    showToast(`${product.name} adicionado ao carrinho`, 'success')
  }

  return (
    <>
      <div className="min-h-screen bg-white">

        <Header />
        
        <div className="pb-24">
    
          <div className="px-5 pt-6 pb-4 flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[32px] leading-tight font-bold text-gray-900"
            >
              O que você gostaria de pedir hoje?
            </motion.h1>
           
          </div>

          <div className="px-5 pb-5">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-4 bg-gray-50 rounded-[16px] 
                       text-left hover:bg-gray-100 active:scale-[0.99] transition-all"
            >
              <Search size={20} className="text-gray-400" />
              <span className="text-[15px] text-gray-400 font-normal">
                Buscar comidas, restaurantes etc.
              </span>
            </button>
          </div>

          <div className="px-5 py-5">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Todas as Categorias</h2>

            <div className="grid grid-cols-3 gap-4">
              {categories.map((category, index) => {
                const colorClass = categoryColors[index % categoryColors.length]
                const isNew = index < 2
                const isFav = index === 2
                
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                    className="relative flex flex-col items-center gap-3"
                  >
                    <div className={`relative w-[90px] h-[90px] bg-gradient-to-br ${colorClass} 
                                  rounded-full flex items-center justify-center text-4xl
                                  active:scale-95 transition-transform duration-200 shadow-sm`}>
                      {getCategoryEmoji(category.name)}
                      
                      {isNew && (
                        <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] 
                                      font-bold px-2 py-0.5 rounded-full shadow-md">
                          NEW
                        </div>
                      )}
                      
                      {isFav && (
                        <div className="absolute -top-1 -right-1 bg-cyan-400 text-white text-[10px] 
                                      font-bold px-2 py-0.5 rounded-full shadow-md">
                          FAVS
                        </div>
                      )}
                    </div>
                    
                    <span className="text-[13px] font-semibold text-gray-700 text-center leading-tight max-w-[90px]">
                      {category.name}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="px-5 pt-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory 
                  ? categories.find(c => c.id === selectedCategory)?.name 
                  : 'Todos os Produtos'}
              </h2>
              <span className="text-sm text-gray-500">{gridProducts.length} itens</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {gridProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        onSelectProduct={handleAddToCart}
      />
    </>
  )
}
