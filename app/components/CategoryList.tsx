'use client'
import { Menu, Star, Package, UtensilsCrossed, Pizza, Coffee, IceCream, Beef } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon?: string
}

interface CategoryListProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

const categoryIcons: Record<string, React.ReactNode> = {
  'churrasco': <Beef className="w-6 h-6" />,
  'dechurrasco': <Beef className="w-6 h-6" />,
  'monte seu churrasco': <Beef className="w-6 h-6" />,
  'combos': <Package className="w-6 h-6" />,
  'combo': <Package className="w-6 h-6" />,
  'batatas recheadas': <Pizza className="w-6 h-6" />,
  'batata': <Pizza className="w-6 h-6" />,
  'recheada': <Pizza className="w-6 h-6" />,
  'bebidas': <Coffee className="w-6 h-6" />,
  'bebida': <Coffee className="w-6 h-6" />,
  'sobremesas': <IceCream className="w-6 h-6" />,
  'sobremesa': <IceCream className="w-6 h-6" />,
}

function getCategoryIcon(name: string): React.ReactNode {
  const lowerName = name.toLowerCase()
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lowerName.includes(key)) return icon
  }
  return <UtensilsCrossed className="w-6 h-6" />
}

export default function CategoryList({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-1">
      {/* tudo */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex flex-col items-center gap-2.5 min-w-[76px] transition-all duration-200 ${
          selectedCategory === null 
            ? 'scale-105' 
            : 'opacity-70 hover:opacity-100'
        }`}
      >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          selectedCategory === null 
            ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-xl shadow-red-500/40 scale-105' 
            : 'bg-white border-2 border-gray-200 hover:border-gray-300'
        }`}>
          <Menu className={`w-6 h-6 ${selectedCategory === null ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <span className={`text-xs font-semibold text-center transition-colors ${
          selectedCategory === null ? 'text-red-600' : 'text-gray-600'
        }`}>
          Tudo
        </span>
      </button>

      {/* Destaques */}
      <button
        onClick={() => onSelectCategory('destaques')}
        className={`flex flex-col items-center gap-2.5 min-w-[76px] transition-all duration-200 ${
          selectedCategory === 'destaques' 
            ? 'scale-105' 
            : 'opacity-70 hover:opacity-100'
        }`}
      >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          selectedCategory === 'destaques' 
            ? 'bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 shadow-xl shadow-orange-500/40 scale-105' 
            : 'bg-white border-2 border-gray-200 hover:border-gray-300'
        }`}>
          <Star className={`w-6 h-6 ${selectedCategory === 'destaques' ? 'text-white fill-white' : 'text-gray-600'}`} />
        </div>
        <span className={`text-xs font-semibold text-center transition-colors ${
          selectedCategory === 'destaques' ? 'text-orange-600' : 'text-gray-600'
        }`}>
          Favoritos
        </span>
      </button>

      {/* categorias => falta refatorar para puxar do server as imagens */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center gap-2.5 min-w-[76px] transition-all duration-200 ${
            selectedCategory === category.id 
              ? 'scale-105' 
              : 'opacity-70 hover:opacity-100'
          }`}
          title={category.name}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
            selectedCategory === category.id 
              ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-xl shadow-red-500/40 scale-105' 
              : 'bg-white border-2 border-gray-200 hover:border-gray-300'
          }`}>
            <div className={selectedCategory === category.id ? 'text-white' : 'text-gray-600'}>
              {getCategoryIcon(category.name)}
            </div>
          </div>
          <span className={`text-xs font-semibold text-center line-clamp-1 max-w-[70px] transition-colors ${
            selectedCategory === category.id ? 'text-red-600' : 'text-gray-600'
          }`}>
            {category.name}
          </span>
        </button>
      ))}
    </div>
  )
}
