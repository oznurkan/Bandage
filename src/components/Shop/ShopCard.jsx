import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopCard = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.product.categories);

  const topFive = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="w-full bg-thin-white">
      {categories && (
        <>
          <article className="flex flex-col w-full mx-auto py-20 gap-5 xl:flex-row xl:w-[87%] ">
            {topFive.map((shop) => (
              <div
                key={shop.id}
                onClick={() =>
                  navigate(
                    `/shop/${shop.gender === "k" ? "kadin" : "erkek"}/${shop.slug}/${shop.id}`,
                  )
                }
                style={{
                  backgroundImage: `linear-gradient(rgba(33, 33, 33, 0.4), rgba(33, 33, 33, 0.4)), url(${shop.img})`,
                }}
                className="flex flex-col justify-center items-center mx-auto gap-5 text-white font-montserrat font-bold bg-cover bg-no-repeat bg-center w-83 h-75 md:w-150 lg:w-200"
              >
                <h5 className="text-base leading-6 uppercase">{shop.title}</h5>
                <h6 className="text-sm leading-6 capitalize flex gap-2 ">
                  <span>Rating</span>
                  {shop.rating}
                </h6>
              </div>
            ))}
          </article>
        </>
      )}
    </section>
  );
};

export default ShopCard;
