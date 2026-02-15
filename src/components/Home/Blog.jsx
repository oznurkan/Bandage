import {
  AlarmClock,
  ChevronRight,
  Download,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { LiaChartAreaSolid } from "react-icons/lia";
import { FaChartArea } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/actions/dataActions";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Hata</div>;
  const { blogSection } = content || {};

  return (
    <section className="w-full flex flex-col items-center font-montserrat gap-20 py-20 px-10 xl:w-[78%] xl:mx-auto ">
      {blogSection && (
        <>
          <article className=" flex flex-col items-center gap-2.5">
            <h6 className="font-bold capitalize text-sm leading-6 text-primary-blue">
              {blogSection.subtitle}
            </h6>
            <h3 className="font-bold text-[40px] leading-12 text-text-color">
              {blogSection.title}
            </h3>
          </article>

          <article className="flex flex-col gap-20 md:flex-row xl:gap-10 ">
            {blogSection.blog.map((blog) => (
              <article
                key={blog.id}
                className="gap-8 flex flex-col mx-auto w-84 h-190 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] xl:flex-row xl:w-lg xl:h-102.5 xl:gap-5"
              >
                <div className="relative w-84 h-90 xl:h-full xl:w-full">
                  <div className="absolute z-10 bg-danger-color rounded-sm py-1 px-2.5 text-white capitalize font-montserrat font-bold text-sm leading-6 top-5 left-5 ">
                    sale
                  </div>
                  <div className="absolute w-full flex justify-center items-center z-10 bottom-5 gap-3">
                    {[Heart, ShoppingCart, Eye].map((Icon, idx) => (
                      <button
                        key={idx}
                        className="rounded-full bg-white p-2 hover:bg-gray-100 transition-colors shadow-md"
                      >
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>

                  <img
                    className="w-full h-full object-cover"
                    src={blog.images}
                    alt={blog.title}
                  />
                </div>
                <div className="flex flex-col gap-2.5 px-5 pt-6 pb-8 xl:py-8 ">
                  <div className="flex justify-between items-center">
                    <a
                      href="#"
                      className="font-bold text-sm capitalize leading-6 text-primary-color"
                    >
                      {blog.subtitle}
                    </a>
                    <div className="flex items-center rounded-3xl p-1 gap-1.5 bg-dark-background-color">
                      <Star color="#FFCE31" size={15} fill="#FFCE31" />
                      <span className="font-normal text-xs leading-4 text-white">
                        {blog.star}
                      </span>
                    </div>
                  </div>
                  <h5 className="font-bold text-base capitalize leading-6 text-text-color">
                    {blog.title}
                  </h5>
                  <p className="text-second-text-color font-normal text-sm leading-5">
                    {blog.paragraph}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Download size={16} color="#737373" />
                    <div className="text-second-text-color capitalize font-bold text-sm leading-6 flex gap-1">
                      <span>{blog.sales.sale} </span>
                      <h6>{blog.sales.text} </h6>
                    </div>
                  </div>
                  <div className="flex gap-5 justify-start">
                    <span className="font-montserrat font-bold text-base leading-6 text-muted-color flex gap-1">
                      <span>${blog.price.old} </span>
                    </span>
                    <span className="font-montserrat font-bold text-base leading-6 text-second-color-1 flex gap-1">
                      <span>${blog.price.new}</span>
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <a className="bg-primary-color size-4 rounded-4xl"></a>
                    <a className="bg-second-color-1 size-4 rounded-4xl"></a>
                    <a className="bg-alert-color size-4 rounded-4xl"></a>
                    <a className="bg-dark-background-color size-4 rounded-4xl"></a>
                  </div>
                  <div className="flex justify-between py-4 text-second-text-color ">
                    <button className="flex items-center gap-1 ">
                      <AlarmClock size={14} color="#23A6F0" />
                      <p className="font-normal capitalize text-xs leading-4">
                        {blog.productInfo.date}
                      </p>
                    </button>
                    <button className="hidden items-center gap-1 xl:flex">
                      <LiaChartAreaSolid size={14} color="#E77C40" />
                      <p className="font-normal capitalize text-xs leading-4">
                        {blog.productInfo.lessons.lesson}{" "}
                        {blog.productInfo.lessons.text}
                      </p>
                    </button>
                    <button className="flex items-center gap-1">
                      <FaChartArea size={14} color="#23856D" fill="#23856D" />
                      <p className="font-normal text-xs capitalize leading-4">
                        {blog.productInfo.progress}
                      </p>
                    </button>
                  </div>
                  <a
                    onClick={() => navigate("/blog")}
                    className="flex gap-2 py-2.5 px-3 cursor-pointer rounded-4xl w-fit xl:border text-second-text-color xl:text-sm xl:text-primary-color xl:border-primary-blue transition-all duration-300 ease-in-out hover:bg-primary-color hover:text-white"
                  >
                    <h6 className="font-bold text-xs capitalize leading-6  ">
                      {blog.buttonText}
                    </h6>
                    <ChevronRight color="#23A6F0" />
                  </a>
                </div>
              </article>
            ))}
          </article>
        </>
      )}
    </section>
  );
};

export default Blog;
