import { Outlet } from "react-router-dom"
import Footer from "./components/partials/Footer"
import Navbar from "./components/partials/Navbar"

const Layout = () => {
    return <>
        <Navbar></Navbar>
        <Outlet />
        <Footer></Footer>
    </>
}
export default Layout