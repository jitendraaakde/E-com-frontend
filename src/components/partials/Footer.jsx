const Footer = () => {
    return <div className="w-full h-48 bg-slate-800 flex justify-around items-center text-white text-xs">
        <div className="w-[20%]  ">
            <img src="../public/Systango_logo.png" alt="" />
            <p className=" text-xs text-balance ml-3">We make the impossible, possible </p>
        </div>
        <div className=" w-[20%] ">
            <ul className=" space-y-3">
                <li>Home</li>
                <li>About Us</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>
        </div>

        <div className=" w-[20%]">
            <ul className="space-y-3">
                <li>Our Products</li>
                <li>Pricing</li>
                <li>Testimonials</li>
                <li>Case Studies</li>
            </ul>
        </div>

        <div className=" w-[20%]">
            <ul className="space-y-3">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
            </ul>
        </div>


    </div>
}
export default Footer
