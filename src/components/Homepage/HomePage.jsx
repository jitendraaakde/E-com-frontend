import HeroSection from './HeroSection'
import ImageSlider from './ImageSlider'
import ProductCategory from './ProductCategory'
import FeaturedProducts from './FeaturedProducts'
import CategoryCards from './CategoryCards'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col mt-16">
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