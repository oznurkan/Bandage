import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductDescription = () => {

  const { id } = useParams();

  const { data: product, isLoading, error } = useQuery({
  queryKey: ["product", id],
  queryFn: async () => {
    const { data } = await axios.get("/data.json");
    const product = data.productCardSection.productsCard.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },
  staleTime: 1000 * 60 * 10,
});

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading product</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const images = Array.isArray(product.images) ? product.images : [product.images];

  return (
    <section className="w-full bg-white">
      <article className="flex flex-col py-10 font-montserrat">
        <nav className="flex gap-4 mx-auto">
          <a
            className="font-semibold text-sm leading-6 text-second-text-color underline"
            href=""
          >
            Description
          </a>
          <a
            className="font-bold text-sm leading-6 text-second-text-color"
            href=""
          >
            Additional Information
          </a>
          <a
            className="font-bold text-sm leading-6 text-second-text-color"
            href=""
          >
            Reviews <span className="text-second-color-1">{product.reviews}</span>
          </a>
        </nav>
        <div className="flex flex-col mx-auto gap-20 pb-20 pt-10 w-[85%] xl:flex-row">
          <div className="flex w-full h-110 rounded-3xl xl:flex-1 xl:h-100">
            <img className="w-full h-full object-contain" src={images[0]} alt="" />
          </div>
          <div className="flex flex-col gap-12 xl:flex-1">
            <h3 className="font-bold text-2xl leading-6 text-text-color">
              the quick fox jumps over{" "}
            </h3>
            <p className="font-normal text-sm leading-5 text-second-text-color">
              {product.description}{product.description}{product.description}{product.description}{product.description}
            </p>
          </div>
          <div className="flex flex-col gap-8 xl:flex-1">
            <h5 className="font-bold text-2xl leading-8 text-text-color">
              the quick fox jumps over{" "}
            </h5>
            <div className="flex items-center gap-3">
                <ChevronRight size={20} />
                <h6>the quick fox jumps over the lazy dog</h6>
            </div>
              <div className="flex items-center gap-3">
                <ChevronRight size={20} />
                <h6>the quick fox jumps over the lazy dog</h6>
            </div>
              <div className="flex items-center gap-3">
                <ChevronRight size={20} />
                <h6>the quick fox jumps over the lazy dog</h6>
            </div>
              <div className="flex items-center gap-3">
                <ChevronRight size={20} />
                <h6>the quick fox jumps over the lazy dog</h6>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProductDescription;
