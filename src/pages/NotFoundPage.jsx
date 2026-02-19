import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return(
        <main className="w-full flex flex-col justify-center items-center font-montserrat text-text-color leading-10 py-50 gap-10 ">
            <section className="font-bold text-2xl ">Page Not Found </section>
            <button
            onClick={()=> navigate("/home")}
            className="p-4 border-2 font-bold rounded-lg cursor-pointer hover:bg-primary-color hover:text-white border-primary-color text-primary-color bg-white text-lg"
            >Go to home</button>
        </main>

    )
}

export default NotFoundPage;