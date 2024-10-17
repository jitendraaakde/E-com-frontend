import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch, CiUser } from 'react-icons/ci'
import { LuShoppingCart } from 'react-icons/lu'
import { HiMenu, HiX } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { SliceAddToCart } from '../../store/cartSlice'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const cart = useSelector(state => state.cart)
    console.log(cart)
    const dispatch = useDispatch()
    const getCartItems = async () => {
        try {
            const response = await fetch(`/api/product/get-cart-items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log('data from back', data.cart)
            if (response.ok) {
                if (data.cart) {
                    dispatch(SliceAddToCart({ cart: data.cart, count: data.cart.length }));
                } else {
                    throw new Error('Cart data not found in response');
                }
            } else {
                throw new Error(data.message || 'Error fetching cart items');
            }
        } catch (error) {
            console.error('Fetch failed:', error.message);
        }
    };

    useEffect(() => {
        getCartItems()
    }, [])

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
                        <NavLink to="/product/670f61c3d261f687315cb803">Single Product</NavLink>
                        <NavLink to="/cart">Cart</NavLink>
                        <NavLink to="/order-history">Order History</NavLink>
                        <NavLink to="/admin-portal">Admin Portal</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/contact">contact</NavLink>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                        <NavIcon to="/search" icon={CiSearch} text="Search" />
                        <NavIcon to="/profile" icon={CiUser} text="Account" />
                        <Link
                            to={'/cart'}
                            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            <div className="relative">
                                <LuShoppingCart className="h-5 w-5" />
                                <span
                                    className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                                >{cart?.totalItems}
                                </span>
                            </div>
                        </Link>
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
                            <Link to={'/search'} className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                <CiSearch className="h-5 w-5" />
                            </Link>
                            <Link to={'/profile'} className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                <CiUser className="h-5 w-5" />
                            </Link>

                            <Link
                                to={'/cart'}
                                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                            >
                                <div className="relative">
                                    <LuShoppingCart className="h-5 w-5" />
                                    <span
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center"
                                    >{cart?.totalItems}
                                    </span>
                                </div>
                            </Link>
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
