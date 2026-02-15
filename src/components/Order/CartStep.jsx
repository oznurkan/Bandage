import { ArrowBigLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import StaticCard from "./StaticCard";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCreditCards,
  getCreditCards,
} from "../../store/actions/clientActions";
import CardForm from "./CartForm";

const CartStep = ({
  onBack,
  showCardForm,
  onCancelCard,
  onOpenCardForm,
  onEditCard,
  cardToEdit,
}) => {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.client.creditCards);
  const selectedCard = useSelector((state) => state.shoppingCart.payment);
  const [selectedRadio, setSelectedRadio] = useState("creditCard");

  useEffect(() => {
    dispatch(getCreditCards());
  }, [dispatch]);

  const handleSelectCard = (card) => {
    dispatch({
      type: "SET_PAYMENT",
      payload: {
        id: card.id,
        card_no: card.card_no,
        expire_month: card.expire_month,
        expire_year: card.expire_year,
        name_on_card: card.name_on_card,
      },
    });
  };

  const handleDeleteCard = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this credit card?")) {
      dispatch(deleteCreditCards(id));
    }
  };

  return (
    <main className="w-full">
      <section className="py-2 w-full flex flex-col shadow-xl">
        {showCardForm && (
          <CardForm onCancelCard={onCancelCard} cardToEdit={cardToEdit} />
        )}
        <article className="w-full text-second-text-color font-normal text-base leading-6 flex flex-col gap-4 justify-between p-10 xl:flex-row">
          <div className="flex w-full h-full justify-start items-center gap-4">
            <input
              type="radio"
              name="radio"
              value="creditCard"
              checked={selectedRadio === "creditCard"}
              onChange={(e) => setSelectedRadio(e.target.value)}
              className={`w-6 h-6 shrink-0 mt-1 text-primary-color focus:ring-primary-color border-gray-300 rounded cursor-pointer
               ${selectedRadio === "creditCard" ? "border-primary-color" : "border-gray-300"}`}
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-base font-bold text-text-color">
                Pay by credit or debit card
              </h1>
              <h2 className=" text-sm font-normal text-second-text-color">
                Payment by card selected. You can complete your purchase
                securely with a debit or credit card.
              </h2>
            </div>
          </div>
        </article>
        <article className="w-full flex flex-wrap gap-8 p-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl font-bold text-text-color">
              Card Information
            </h1>
            <button
              onClick={onOpenCardForm}
              className="text-base font-normal text-second-text-color underline cursor-pointer"
            >
              Pay with another card
            </button>
          </div>
          <div className="w-full flex flex-wrap gap-5 pt-2 border-t border-second-text-color">
            {cardList.map((card) => (
              <div
                key={card.id}
                onClick={() => handleSelectCard(card)}
                className={`w-full flex cursor-pointer flex-col justify-start items-start gap-7 mr-auto p-3 font-normal text-second-text-color text-sm border-2 leading-6 rounded-lg xl:w-[48%]
              ${
                selectedCard?.id === card.id
                  ? "border-primary-color bg-blue-50"
                  : "border-second-text-color bg-white"
              }`}
              >
                <div className="w-full flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      name="selectedCard"
                      checked={selectedCard?.id === card.id}
                      onChange={() => handleSelectCard(card)}
                      className="w-4 h-4 shrink-0 text-primary-color focus:ring-primary-color border-gray-300 rounded cursor-pointer"
                    />
                    <h1 className=" text-base font-bold text-second-text-color">
                      Bonus Card
                    </h1>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCard(card);
                      }}
                      className="text-xs cursor-pointer hover:underline font-bold hover:text-primary-color"
                    >
                      Settings
                    </button>
                    <button
                      onClick={(e) => handleDeleteCard(e, card.id)}
                      className="text-danger-color cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full flex">
                  <StaticCard formData={card} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full flex justify-start py-10">
            <ArrowBigLeft
              onClick={onBack}
              className="text-primary-color cursor-pointer fill-primary-color"
            />
          </button>
        </article>
      </section>
    </main>
  );
};

export default CartStep;
