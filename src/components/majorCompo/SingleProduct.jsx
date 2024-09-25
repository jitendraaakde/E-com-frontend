import product_img from '../../../public/product_image.png'

const SingleProduct = () => {
    return <div className="w-full h-[90vh] flex justify-center items-center text-[15px]">
        <div className='space-y-2 w-[50%] grid place-items-center'>
            <div className=""><img src={product_img} alt="" /></div>
            <div className='flex justify-center items-center gap-4'>
                <img src={product_img} alt="" className='w-11 h-14' />
                <img src={product_img} alt="" className='w-11 h-14' />
                <img src={product_img} alt="" className='w-11 h-14' />
                <img src={product_img} alt="" className='w-11 h-14' />
            </div>
        </div>

        <div className='w-[50%] h-[70vh] space-y-3'>
            <p>FashionHub</p>
            <p className='font-bold text-xl font-mono'> Men's Slim Fit Casual Shirt</p>
            <p className='w-[80%]'>Stylish and comfortable, this slim-fit shirt is made from high-quality cotton fabric. Perfect for casual outings or semi-formal events.</p>
            <hr class="my-4 border-t-2 border-gray-300 w-[70%]" />
            <div className='w-full flex gap-2'>
                <p className='font-bold'>$1000 </p>
                <span className='line-through'>MRP $299</span>
                <span className='font-semibold text-red-500'>(82% Off)</span>

            </div>
            {/* Size DIv */}
            <div className='space-x-2 text-xs'>
                <button className="border-[1px] border-solid border-slate-700 p-2 w-10 h-10 rounded-full">S</button>
                <button className="border-[1px] border-solid border-slate-700 p-2 w-10 h-10 rounded-full">M</button>
                <button className="border-[1px] border-solid border-slate-700 p-2 w-10 h-10 rounded-full">XL</button>
                <button className="border-[1px] border-solid border-slate-700 p-2 w-10 h-10 rounded-full">2XL</button>
                <button className="border-[1px] border-solid border-slate-700 p-2 w-10 h-10 rounded-full">3XL</button>
            </div>
            <div>
                <button className="w-[40%] border-[1px] border-solid border-slate-700 px-3 bg-blue-400 p-[7px] mt-1 rounded-[20px]">Add To cart</button>
            </div>
        </div>
    </div>
}
export default SingleProduct    