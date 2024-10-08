// // This is just generate home page you need to fix everything than it will work like convert it inton react 

// import React, { useState, useEffect, useRef } from 'react'
// import Image from 'next/image'
// import { FaChevronLeft, FaChevronRight, FaSearch, FaShoppingCart, FaBars, FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

// export default function HomePage() {
//   const [currentBanner, setCurrentBanner] = useState(0)
//   const [isSticky, setIsSticky] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [email, setEmail] = useState('')
//   const sliderRef = useRef<HTMLDivElement>(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [startX, setStartX] = useState(0)
//   const [scrollLeft, setScrollLeft] = useState(0)

//   const banners = [
//     { id: 1, image: '/placeholder.svg', alt: 'Promotion 1' },
//     { id: 2, image: '/placeholder.svg', alt: 'Promotion 2' },
//     { id: 3, image: '/placeholder.svg', alt: 'Promotion 3' },
//   ]

//   const categories = [
//     { id: 1, title: "Men's Clothing", images: Array(4).fill('/placeholder.svg') },
//     { id: 2, title: "Women's Clothing", images: Array(4).fill('/placeholder.svg') },
//     { id: 3, title: 'Electronics', images: Array(4).fill('/placeholder.svg') },
//     { id: 4, title: 'Home & Kitchen', images: Array(4).fill('/placeholder.svg') },
//   ]

//   const sliderImages = Array(6).fill({ src: '/placeholder.svg', label: 'Product' })

//   const products = Array(6).fill({ name: 'Product', description: 'Product description', image: '/placeholder.svg' })

//   const featuredProducts = [
//     { id: 1, name: 'Best Seller 1', price: 99.99, rating: 4.5, image: '/placeholder.svg', badge: 'Best Seller' },
//     { id: 2, name: 'Limited Offer 1', price: 79.99, rating: 4.2, image: '/placeholder.svg', badge: 'Limited Time' },
//     { id: 3, name: 'New Arrival 1', price: 129.99, rating: 4.8, image: '/placeholder.svg', badge: 'New Arrival' },
//     { id: 4, name: 'Best Seller 2', price: 89.99, rating: 4.6, image: '/placeholder.svg', badge: 'Best Seller' },
//   ]

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length)
//     }, 4000)
//     return () => clearInterval(timer)
//   }, [])

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 0)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const nextBanner = () => {
//     setCurrentBanner((prev) => (prev + 1) % banners.length)
//   }

//   const prevBanner = () => {
//     setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
//   }

//   const scroll = (direction: 'left' | 'right') => {
//     if (sliderRef.current) {
//       const { scrollLeft, clientWidth } = sliderRef.current
//       const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
//       sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
//     }
//   }

//   const startDragging = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//     setIsDragging(true)
//     if ('clientX' in e) {
//       setStartX(e.clientX - sliderRef.current!.offsetLeft)
//     } else {
//       setStartX(e.touches[0].clientX - sliderRef.current!.offsetLeft)
//     }
//     setScrollLeft(sliderRef.current!.scrollLeft)
//   }

//   const stopDragging = () => {
//     setIsDragging(false)
//   }

//   const onDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
//     if (!isDragging) return
//     e.preventDefault()
//     const x = 'clientX' in e ? e.clientX : e.touches[0].clientX
//     const walk = (x - startX) * 2
//     sliderRef.current!.scrollLeft = scrollLeft - walk
//   }

//   const handleNewsletterSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('Signed up with email:', email)
//     setEmail('')
//   }

//   const Navbar = () => (
//     <nav className={`${isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''} bg-white z-50 transition-all duration-300`}>
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <a href="/" className="text-xl font-bold text-blue-600">E-Shop</a>
//           </div>
//           <div className="hidden md:block">
//             <div className="flex items-center">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="bg-gray-100 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 />
//                 <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               </div>
//               <a href="/cart" className="ml-4 text-gray-600 hover:text-blue-600 transition-colors duration-300">
//                 <FaShoppingCart className="text-2xl" />
//               </a>
//             </div>
//           </div>
//           <div className="md:hidden">
//             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
//               <FaBars className="text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>
//       {isMobileMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</a>
//             <a href="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Categories</a>
//             <a href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Cart</a>
//           </div>
//         </div>
//       )}
//     </nav>
//   )

//   const HeroSection = () => (
//     <div className="relative w-full h-[60vh] overflow-hidden">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentBanner * 100}%)` }}
//       >
//         {banners.map((banner) => (
//           <div
//             key={banner.id}
//             className="w-full h-[60vh] flex-shrink-0 relative"
//           >
//             <Image
//               src={banner.image}
//               alt={banner.alt}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg transform transition-transform duration-300 hover:scale-105"
//             />
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={prevBanner}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
//       >
//         <FaChevronLeft className="text-2xl text-gray-800" />
//       </button>
//       <button
//         onClick={nextBanner}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
//       >
//         <FaChevronRight className="text-2xl text-gray-800" />
//       </button>
//     </div>
//   )

//   const CategoryCards = () => (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <div
//             key={category.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//           >
//             <h3 className="text-xl font-semibold p-4 bg-gray-100">{category.title}</h3>
//             <div className="grid grid-cols-2 gap-2 p-4">
//               {category.images.map((image, index) => (
//                 <div key={index} className="relative w-full h-24">
//                   <Image
//                     src={image}
//                     alt={`${category.title} ${index + 1}`}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded transform hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )

//   const ImageSlider = () => (
//     <div className="relative overflow-hidden py-8">
//       <div
//         ref={sliderRef}
//         className="flex overflow-x-auto scrollbar-hide space-x-4 px-4 cursor-grab active:cursor-grabbing"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         onMouseDown={startDragging}
//         onMouseLeave={stopDragging}
//         onMouseUp={stopDragging}
//         onMouseMove={onDrag}
//         onTouchStart={startDragging}
//         onTouchEnd={stopDragging}
//         onTouchMove={onDrag}
//       >
//         {sliderImages.map((image, index) => (
//           <div key={index} className="flex-shrink-0 relative group">
//             <div className="relative w-48 h-72">
//               <Image
//                 src={image.src}
//                 alt={image.label}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg"
//               />
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//               {image.label}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={() => scroll('left')}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
//       >
//         <FaChevronLeft className="text-2xl text-gray-800" />
//       </button>
//       <button
//         onClick={() => scroll('right')}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
//       >
//         <FaChevronRight className="text-2xl text-gray-800" />
//       </button>
//     </div>
//   )

//   const ProductCategory = () => (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-center">Best Sellers</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//             <div className="relative h-48">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className="transform hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
//               <p className="text-gray-600 mb-4">{product.description}</p>
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-full">
//                 <FaShoppingCart className="mr-2" />
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )

//   const FeaturedProducts = () => (
//     <div className="bg-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {featuredProducts.map((product) => (
//             <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//               <div className="relative">
//                 <div className="relative h-48">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
//                   {product.badge}
//                 </span>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
//                   <div className="flex items-center">
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <span>{product.rating}</span>
//                   </div>
//                 </div>
//                 <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
//                   <FaShoppingCart className="mr-2" />
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )

//   const NewsletterSignup = () => (
//     <div className="bg-blue-600 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="max-w-3xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
//           <p className="mb-8">Stay updated with our latest offers and products!</p>
//           <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row justify-center items-center">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full sm:w-64 px-4 py-2 rounded-l-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 sm:mb-0"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full sm:w-auto bg-white text-blue-600 font-bold px-6 py-2 rounded-r-full hover:bg-gray-100 transition-colors duration-300"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )

//   const Footer = () => (
//     <footer className="bg-gray-800 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold mb-4">About Us</h3>
//             <p className="text-sm">E-Shop is your one-stop destination for all your shopping needs. We offer a wide range of products at competitive prices.</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><a href="/" className="text-sm hover:text-blue-400 transition-colors duration-300">Home</a></li>
//               <li><a href="/products" className="text-sm hover:text-blue-400 transition-colors duration-300">Products</a></li>
//               <li><a href="/about" className="text-sm hover:text-blue-400 transition-colors duration-300">About Us</a></li>
//               <li><a href="/contact" className="text-sm hover:text-blue-400 transition-colors duration-300">Contact</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <p className="text-sm">123 E-Shop Street, City, Country</p>
//             <p className="text-sm">Phone: +1 234 567 890</p>
//             <p className="text-sm">Email: info@eshop.com</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300"><FaFacebook /></a>
//               <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300"><FaTwitter /></a>
//               <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300"><FaInstagram /></a>
//               <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300"><FaLinkedin /></a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t border-gray-700 text-center">
//           <p className="text-sm">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <HeroSection />
//         <CategoryCards />
//         <ImageSlider />
//         <ProductCategory />
//         <FeaturedProducts />
//         <NewsletterSignup />
//       </main>
//       <Footer />
//     </div>
//   )
// }