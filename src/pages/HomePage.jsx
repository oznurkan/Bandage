import Client from "../components/Home/Client";
import Content from "../components/Home/Content";
import FeaturedProduct from "../components/Home/FeaturedProduct";
import Home from "../components/Home/Home";
import ShopCard from "../components/Home/ShopCard";
import ProductCard from "../components/Home/ProductCard";
import Blog from "../components/Home/Blog";

const HomePage = () => {
  return (
    <>
      <Home />
      <Client />
      <ShopCard />
      <ProductCard />
      <Content />
      <FeaturedProduct />
      <Blog />
    </>
  );
};

export default HomePage;
