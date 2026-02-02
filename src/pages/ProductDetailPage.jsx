import ProductDescription from "../components/ProductDetail/ProductDescription";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Client from "../components/Home/Client";
import BestsellerProduct from "../components/ProductDetail/BestsellerProduct";
import ProductDetailNavbar from "../components/ProductDetail/ProductDetailNavbar";
import ProductClient from "../components/ProductDetail/ProductClient";

const ProductDetailPage = () => {
    return(
        <>
        <ProductDetailNavbar/>
        <ProductDetail/>
        <ProductDescription/>
        <BestsellerProduct/>
        <ProductClient/>
        </>
    )

}

export default ProductDetailPage;