import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ShopProductCard = ({ products, isGridView }) => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories);

  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const handleProductClick = (product) => {
    const nameSlug = product.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/-+$/, "");

    const productCategory = categories.find(
      (cat) => cat.id === product.category_id,
    );

    const gender = productCategory?.gender === "k" ? "kadin" : "erkek";
    const categoryTitle = productCategory?.title || "kategori";
    const categoryId = product.category_id;
    const productNameSlug = nameSlug;
    const productId = product.id;

    const detailLink = `/shop/${gender}/${categoryTitle}/${categoryId}/${productNameSlug}/${productId}`;

    navigate(detailLink);
  };

  return (
    <main className="w-full bg-white font-montserrat">
      <section className="flex flex-col py-23 px-10 gap-18">
        {products && (
          <article
            className={`mx-auto ${
              isGridView
                ? "flex flex-wrap w-full justify-start gap-9 md:w-[80%]"
                : "flex flex-col mx-auto gap-6 md:w-[82%]"
            }`}
          >
            {products?.map((product) => (
              <div
                key={product.id}
                className={
                  isGridView
                    ? "flex flex-col items-center w-full mx-auto md:w-[46%] lg:w-[30%] xl:w-[16.5%] md:mx-0 "
                    : "flex flex-row justify-between mx-auto items-center w-full border-b border-[#E8E8E8] pb-6 gap-2 xl:gap-6"
                }
              >
                <div
                  onClick={() => handleProductClick(product)}
                  className={
                    isGridView
                      ? "flex justify-center mx-auto items-center w-full h-107 xl:h-60 "
                      : "flex justify-center items-center w-48 h-48 shrink-0 flex-1"
                  }
                >
                  <img
                    src={product.images?.[0]?.url || ""}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-110 cursor-pointer"
                  />
                </div>
                <div
                  className={`flex flex-col gap-2 w-full capitalize font-bold leading-6 ${
                    isGridView
                      ? "items-center text-center py-7"
                      : "items-start text-start flex-1"
                  }`}
                >
                  <h5 className="text-sm text-second-text-color">
                    {product.name}
                  </h5>
                  <a
                    onClick={() => handleProductClick(product)}
                    className="text-base cursor-pointer text-text-color"
                  >
                    {product.name}
                  </a>
                  {!isHomePage && (
                    <h5
                      className={`text-sm cursor-pointer text-second-text-color
                  ${isGridView ? "hidden" : "hidden md:flex"}`}
                    >
                      {product.description}
                    </h5>
                  )}
                  <div
                    className={`flex gap-3 text-base ${
                      isGridView ? "justify-center" : "justify-start"
                    }`}
                  >
                    <span className="text-muted-color line-through">
                      ${product.price}
                    </span>
                    <span className="text-second-color-1">
                      ${product.price}
                    </span>
                  </div>
                  {!isHomePage && (
                    <div
                      className={`flex gap-1.5 ${
                        isGridView ? "justify-center" : "justify-start"
                      }`}
                    >
                      <a className="bg-primary-color size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                      <a className="bg-second-color-1 size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                      <a className="bg-alert-color size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                      <a className="bg-dark-background-color size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </article>
        )}
      </section>
    </main>
  );
};

export default ShopProductCard;
