import product_img from '../../../public/product_image.png'

const Cart = () => {
    return <div className="w-full h-[90vh] flex">
        <div className="w-[50%] h-[300px] bg-slate-600 flex justify-end">
            <div className="w-[80%] bg-blue-500 h-24 relative overflow-hidden">
                <img className="w-[20%] absolute top-0 left-0 object-contain" src={product_img} alt="Product Image" />
            </div>
        </div>
        <div className="w-[50%] h-[300px] bg-red-600"></div>
    </div>

}
export default Cart 