import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useProductNavigate = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories);

  const goToProductDetail = (product) => {
    const category = categories.find((c) => c.id === product.category_id);

    if (category) {
      const gender = category.gender === "k" ? "kadin" : "erkek";
      
      const categoryTitle = category.title.toLowerCase().replace(/\s+/g, "-");
      const productNameSlug = product.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^-a-z0-9]/g, "");

      navigate(
        `/shop/${gender}/${categoryTitle}/${product.category_id}/${productNameSlug}/${product.id}`
      );
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return goToProductDetail;
};

export default useProductNavigate;
