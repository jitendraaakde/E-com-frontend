import { useSelector } from "react-redux";
import Addresses from "../UserProfile/Addresses"
import { Link } from "react-router-dom";
import { FaCreditCard, FaTruck } from "react-icons/fa";

const Checkout = () => {
    const cart = useSelector(state => state.cart)
    let items = cart.items

    const calculateAmount = (price, disPercent) => {
        return Math.round(price - (price * (disPercent / 100)))
    }
    const subtotal = items.reduce((sum, item) => sum + calculateAmount(item.productId.price, item.productId.discountPercentage) * item.quantity, 0);
    const shipping = 120;
    const tax = subtotal * 0.03;
    const total = subtotal + shipping + tax;

    return <div className=" md:flex-row min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-8">

        <main className="flex-1 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <Addresses />
            </div>
        </main>
        <div className="lg:w-1/3 mt-7 mr-5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                    <Link to={'/checkout'}>Proceed to Checkout</Link>
                </button>
                <div className="mt-6 space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <FaTruck className="h-5 w-5 mr-2" />
                        Free shipping on orders over ₹100
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <FaCreditCard className="h-5 w-5 mr-2" />
                        Secure payment processing
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Checkout