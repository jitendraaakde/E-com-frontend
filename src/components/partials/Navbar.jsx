import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
    return <div className="w-[100%] h-12 flex justify-between px-4 border-b-black border">
        <div className="w-[140px] h-[100%] p-1 flex justify-center items-center"><Link to="/"><img src="../public/Systango_logo.png" className="" alt="" /></Link></div>
        <div>
            <ul className="flex justify-center items-center h-[100%] gap-10 text-[11px]">
                <li>Shop</li>
                <li>About us</li>
                <li>Our Stores</li>
                <li>Contact us</li>
            </ul>
        </div>
        <div className="flex gap-2 justify-center items-center h-[100%] ">
            <p className="text-[9px]">Search</p>
            <CiSearch />
            <CiUser />
            <LuShoppingCart />
        </div>
    </div>
}
export default Navbar   
