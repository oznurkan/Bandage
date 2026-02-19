import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState("description");
  const product = useSelector((state) => state.product.selectedProduct);

  if (!product) return null;
  const displayImage = product.images?.[0]?.url || "";

  return (
    <section className="w-full bg-white border-t border-gray-100">
      <article className="flex flex-col py-10 font-montserrat">
        <nav className="flex justify-center gap-8 mb-10 border-b border-gray-100">
          {[
            { id: "description", label: "Description" },
            { id: "info", label: "Additional Information" },
            { id: "reviews", label: `Reviews (${product.rating})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-bold text-sm leading-6 cursor-pointer pb-4 transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-primary-color border-b-2 border-primary-color"
                  : "text-second-text-color hover:text-primary-color"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mx-auto w-[85%] min-h-100 xl:w-[78%]">
          {activeTab === "description" && (
            <div className="flex flex-col gap-12 pt-10 xl:flex-row items-start animate-fadeIn">
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg xl:flex-1 xl:h-100">
                <img
                  className="w-full h-full object-cover"
                  src={displayImage}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col gap-6 xl:flex-1">
                <h3 className="font-bold text-2xl text-text-color">
                  Product Specifications
                </h3>
                <p className="font-normal text-sm leading-6 text-second-text-color">
                  {product.description}
                  <br />
                  <br />
                  This exclusive piece, which completes your elegance in daily
                  use with its modern cut, promises long-lasting durability with
                  its high-quality texture.
                </p>
              </div>
              <div className="flex flex-col gap-6 xl:flex-1">
                <h5 className="font-bold text-2xl text-text-color">
                  Features & Care
                </h5>
                <div className="space-y-4">
                  {[
                    "100% Premium Quality",
                    "Machine washable",
                    "Standard fit",
                    "Breathable fabric",
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-second-text-color"
                    >
                      <ChevronRight size={20} className="text-primary-color" />
                      <h6 className="font-bold text-sm">{f}</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "info" && (
            <div className="pt-10 animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-6 bg-thin-white rounded-lg">
                <h4 className="font-bold text-xl mb-4">Product Measurements</h4>
                <ul className="text-second-text-color space-y-2 text-sm">
                  <li>
                    <strong>Weight:</strong> 450gr
                  </li>
                  <li>
                    <strong>Dimensions:</strong> Standard Fit
                  </li>
                  <li>
                    <strong>Color:</strong> Multiple Color Options
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-thin-white rounded-lg">
                <h4 className="font-bold text-xl mb-4">Shipping & Returns</h4>
                <p className="text-second-text-color text-sm">
                  Your orders are shipped within 24 hours. We offer free returns
                  within 14 days of delivery.
                </p>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="pt-10 animate-fadeIn">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-bold text-3xl">{product.rating}</h3>
                <div className="text-sm text-second-text-color">
                  Evaluated from a total of {product.sell_count} sales.
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-100 pb-4">
                    <div className="flex gap-1 text-yellow-500 mb-2">★★★★★</div>
                    <p className="text-sm italic">
                      "Excellent product, the fabric quality is much better than
                      I expected!"
                    </p>
                    <span className="text-xs text-muted-color">- Alex M.</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default ProductDescription;
