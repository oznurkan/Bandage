import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";

const ShopCard = () => {
    const dispatch = useDispatch();
    const { content, loading, error } = useSelector((state) => state.appData);

    useEffect(() => {
        if (!content) dispatch(getDataInfo());
    }, [dispatch, content]);

    if (loading) return <div className="text-center py-10 font-bold">Yükleniyor...</div>;
    if (error) return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

    const { shopPageCard } = content || {};

    return(
        <section className="w-full bg-thin-white">
            {
                shopPageCard && (
                    <>
                        <article className="flex flex-col w-full mx-auto py-20 gap-5 xl:flex-row xl:w-[90%] ">
                            {
                                shopPageCard.shopCards.map( shop => (
                                   
                                    <div
                                        key={shop.id}
                                        style={{ 
                                            backgroundImage: `linear-gradient(rgba(33, 33, 33, 0.4), rgba(33, 33, 33, 0.4)), url(${shop.images})` 
                                        }}
                                        className="flex flex-col justify-center items-center mx-auto gap-5 text-white font-montserrat font-bold bg-cover bg-no-repeat bg-center w-83 h-75 md:w-150 lg:w-200"
                                    >
                                        <h5 className="text-base leading-6 uppercase">{shop.title}</h5>
                                        <h6 className="text-sm leading-6 capitalize flex gap-2 "><span>5</span>{shop.subtitle}</h6>
                                    </div>

                                   
                                ))
                            }

                            

                        </article>
                    </>
                )
            }

        </section>
    )
}

export default ShopCard;