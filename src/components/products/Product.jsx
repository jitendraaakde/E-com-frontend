import product_img from '../../../public/product_image.png'

const Product = () => {
    return <div className="w-[185px] h-[300px] text-[10px] " >
        <img src={product_img} alt="" />
        <div className='ml-2 mt-1'>
            <p className='font-bold text-xs'>Puma</p>
            <p className='text-slate-500'>Solid polo coller gray tshirt</p>
            <div className='flex gap-1 '>
                <p className='font-bold'>$599</p>
                <p>$1200</p>
                <p>(50% off)</p>
            </div>
        </div>
    </div>
}
export default Product      
