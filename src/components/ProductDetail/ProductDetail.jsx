import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
    <main className="w-full bg-thin-white">
      <section className="flex flex-col mx-auto gap-10 pt-10 pb-20 w-[86%] xl:flex-row">
        <article className="flex flex-col gap-10 xl:flex-1">
          <div className="relative h-110 w-full mx-auto group xl:h-120">
            {images.length > 0 && (
              <>
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-1 hover:scale-110 transition-transform"
            >
              <ChevronLeft size={70} color="#ffffff" />
            </button>
            <div className="h-full w-full overflow-hidden rounded-lg xl:w-full">
              <img
                className="w-full h-full object-cover object-top"
                src={images[activeImageIndex]}
                alt={product.title}
              />
            </div>
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-1 hover:scale-110 transition-transform"
            >
              <ChevronRight size={70} color="#ffffff" />
            </button>
            </>
             )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-25 h-20 rounded-2xl cursor-pointer transition-opacity ${
                    idx === activeImageIndex ? "opacity-100 border-2 border-primary-color" : "opacity-50"
                  }`}
                >
                  <img className="w-full h-full object-contain" src={img} alt="" />
                </div>
              ))}
            </div>
          )}
        </article>
        <article className="font-montserrat flex flex-col gap-7 px-4 xl:flex-1">
          <h4 className="font-normal text-xl leading-8 text-text-color">
            {product.title}
          </h4>
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <FaStar size={19} color="#F3CD03" />
              <FaStar size={19} color="#F3CD03" />
              <FaStar size={19} color="#F3CD03" />
              <FaStarHalfAlt size={19} color="#F3CD03" />
              <CiStar size={22} color="#F3CD03" />
            </div>
            <h6 className="font-bold text-sm leading-6 text-second-text-color">
              {product.reviews} Reviews
            </h6>
          </div>
          <h5 className="font-bold text-2xl leading-8 text-text-color">
            ${product.price.new}
          </h5>
          <div className="flex gap-2.5">
            <h6 className="font-bold text-sm leading-6 text-second-text-color">
              Availability :
            </h6>
            <h6 className="font-bold text-sm leading-6 text-primary-color">
              In Stock{" "}
            </h6>
          </div>
          <p className="font-normal text-sm leading-6 text-custom-gray">
            {product.description}
          </p>
          <hr />
          <div className="flex justify-start gap-2.5">
            <a className="bg-primary-color size-8 rounded-4xl"></a>
            <a className="bg-second-color-1 size-8 rounded-4xl"></a>
            <a className="bg-alert-color size-8 rounded-4xl"></a>
            <a className="bg-dark-background-color size-8 rounded-4xl"></a>
          </div>
          <div className="flex gap-5 py-8">
            <a className="flex gap-2.5 py-3 px-6 cursor-pointer rounded-md w-fit border border-primary-blue bg-primary-blue ">
              <h6 className="font-bold capitalize leading-6 text-white text-sm ">
                Select Options
              </h6>
            </a>
            <div className="flex justify-center items-center gap-2">
              {[Heart, ShoppingCart, Eye].map((Icon, idx) => (
                <button
                  key={idx}
                  className="rounded-full w-10 border border-[#E8E8E8] bg-white p-2 hover:bg-gray-100 transition-colors shadow-md"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ProductDetail;
