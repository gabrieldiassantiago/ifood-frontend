import ProductSection from './components/ProductSection'
import { fetchCategories } from './service/categories.service'
import { getProducts } from './service/products.service'


export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    fetchCategories()
  ])

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col">
      <ProductSection 
        products={products}      
        categories={categories}  
      />
    </div>
  )
}
