import FilePath from "./components/partials/FilePath"
import FilterBar from "./components/partials/FilterBar"
import GradLine from "./components/partials/GradLine"
import Navbar from "./components/partials/Navbar"
import Products from "./components/products/Products"

const Home = () => {
    return <>
        <Navbar></Navbar>
        <GradLine></GradLine>
        <FilePath></FilePath>
        <FilterBar></FilterBar>
        <Products></Products>

    </>
}
export default Home 