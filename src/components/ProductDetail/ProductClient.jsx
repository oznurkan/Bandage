import { FaRedditAlien, FaStripe, FaAws, FaPiedPiperHat, FaLyft, FaHooli  } from "react-icons/fa";
const ProductClient = () => {
    return(
        <section className="w-full bg-thin-white">
            <article className="flex flex-col items-center mx-auto py-40 gap-12 sm:flex-row sm:gap-0 sm:py-50 flex-wrap xl:pt-15 xl:gap-1 xl:w-[70%]">
                <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7"><FaHooli className="size-37 xl:size-25"  color="#737373"/></span>
                <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7"><FaLyft className="size-37 xl:size-25"   color="#737373" /></span>
                <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7"><FaPiedPiperHat className="size-37 xl:size-25"   color="#737373" /></span>
                <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7"><FaStripe className="size-37 xl:size-25"  color="#737373"/></span>
                <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7"><FaAws className="size-37 xl:size-25"   color="#737373" /></span>
                <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7"><FaRedditAlien className="size-37 xl:size-25"   color="#737373" /></span>
               
            </article>
        </section>
    )

}

export default ProductClient;