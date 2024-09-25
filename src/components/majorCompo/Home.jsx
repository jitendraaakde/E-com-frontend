import FilePath from "../partials/FilePath"
import FilterBar from "../partials/FilterBar"
import Footer from "../partials/Footer"
import GradLine from "../partials/GradLine"
import Navbar from "../partials/Navbar"
import Products from "../products/Products"

const Home = () => {
    return <>
        <GradLine></GradLine>
        <FilePath></FilePath>
        <FilterBar></FilterBar>
        <Products></Products>
    </>
}
export default Home 