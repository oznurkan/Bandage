import ProductDescription from "../components/ProductDetail/ProductDescription";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Client from "../components/Home/Client";
import BestsellerProduct from "../components/ProductDetail/BestsellerProduct";
import ProductDetailNavbar from "../components/ProductDetail/ProductDetailNavbar";

const ProductDetailPage = () => {
    return(
        <>
        <ProductDetailNavbar/>
        <ProductDetail/>
        <ProductDescription/>
        <BestsellerProduct/>
        <Client/>
        </>
    )

}

export default ProductDetailPage;