import HeroSection from './HeroSection'
import CategoryCards from './CategoryCards'
import ImageSlider from './ImageSlider'
import ProductCategory from './ProductCategory'
import FeaturedProducts from './FeaturedProducts'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <CategoryCards />
        <ImageSlider />
        <ProductCategory />
        <FeaturedProducts />
      </main>
    </div>
  )
}