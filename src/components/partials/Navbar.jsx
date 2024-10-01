import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch, CiUser } from 'react-icons/ci'
import { LuShoppingCart } from 'react-icons/lu'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="w-full border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img
                                className="h-8 w-auto"
                                src="../public/Systango_logo.png?height=32&width=140"
                                alt="Systango Logo"
                            />
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/register">Signup</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/product/:productId">Single Product</NavLink>
                        <NavLink to="/cart">Cart</NavLink>
                        <NavLink to="/order-history">Order History</NavLink>
                        <NavLink to="/admin-portal">Admin Portal</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/contact">contact</NavLink>
                    </div>

                    {/* Icons in desktop view */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                        <NavIcon to="/search" icon={CiSearch} text="Search" />
                        <NavIcon to="/profile" icon={CiUser} text="Account" />
                        <NavIcon to="/cart" icon={LuShoppingCart} text="Cart" />
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <HiX className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <MobileNavLink to="/shop">Shops</MobileNavLink>
                        <MobileNavLink to="/about">About us</MobileNavLink>
                        <MobileNavLink to="/stores">Our Stores</MobileNavLink>
                        <MobileNavLink to="/contact">Contact us</MobileNavLink>
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4 space-x-4">
                            {/* Icons in mobile view with navigation */}
                            <NavIcon to="/search" icon={CiSearch} />
                            <NavIcon to="/profile" icon={CiUser} />
                            <NavIcon to="/cart" icon={LuShoppingCart} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
        >
            {children}
        </Link>
    )
}

function MobileNavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
        >
            {children}
        </Link>
    )
}

function NavIcon({ to, icon: Icon }) {
    return (
        <Link to={to} className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <Icon className="h-5 w-5" />
        </Link>
    )
}
