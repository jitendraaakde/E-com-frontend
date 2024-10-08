import CounterButton from "../partials/CounterButtonProps"
import FilePath from "../partials/FilePath"
import FilterBar from "../partials/FilterBar"
import GradLine from "../partials/GradLine"
import Products from "../products/Products"

const Home = () => {
    return <>
        <GradLine></GradLine>
        <FilePath></FilePath>
        <FilterBar></FilterBar>
        <Products></Products>
        <CounterButton />
    </>
}
export default Home 