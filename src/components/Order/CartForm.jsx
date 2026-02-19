import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import DynamicCard from "./DynamicCard";
import {
  addNewCreditCards,
  updateCreditCards,
  deleteCreditCards,
} from "../../store/actions/clientActions";

const CardForm = ({ onCancelCard, cardToEdit }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    },
  });
  const watchedValues = watch();

  useEffect(() => {
    if (cardToEdit) reset(cardToEdit);
    else
      reset({
        card_no: "",
        expire_month: "",
        expire_year: "",
        name_on_card: "",
      });
  }, [cardToEdit, reset]);

  const handleFormCardSubmit = async (data) => {
    setLoading(true);
    try {
      if (cardToEdit) {
        await dispatch(updateCreditCards(data));
      } else {
        await dispatch(addNewCreditCards({ ...data }));
      }
      onCancelCard(false);
    } catch (err) {
      console.error("Kart işlemi hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bu kartı silmek istediğinize emin misiniz?")) {
      await dispatch(deleteCreditCards(cardToEdit.id));
      onCancelCard(false);
    }
  };

  return (
    <section className="flex flex-col gap-10">
      <form
        onSubmit={handleSubmit(handleFormCardSubmit)}
        className="flex flex-col xl:flex-row gap-10 bg-white p-8 font-montserrat rounded-xl shadow-sm border border-gray-100"
      >
        <div className="flex flex-col items-center justify-center gap-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-6 xl:flex-1">
          <DynamicCard cardData={watchedValues} />
        </div>
        <div className="flex flex-col gap-4 xl:flex-1">
          <h3 className="text-lg font-bold border-b pb-2 text-text-color">
            {cardToEdit ? "Update Card" : "Card Details"}
          </h3>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-color uppercase tracking-wide">
              Card Number *
            </label>
            <input
              {...register("card_no", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{4} \d{4} \d{4} \d{4}$/,
                  message: "Must be 16 digits",
                },
              })}
              type="text"
              placeholder="0000 0000 0000 0000"
              className={`border p-3 rounded-md outline-none transition-all ${errors.card_no ? "border-red-500" : "border-gray-300 focus:ring-2 ring-primary-color"}`}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                setValue("card_no", formatted.substring(0, 19));
              }}
            />
            {errors.card_no && (
              <p className="text-red-500 text-[10px]">
                {errors.card_no.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-color uppercase tracking-wide">
              Card Holder Name *
            </label>
            <input
              {...register("name_on_card", {
                required: "Card holder name is required",
              })}
              type="text"
              placeholder="JOHN DOE"
              className={`border p-3 rounded-md outline-none transition-all uppercase ${errors.name_on_card ? "border-red-500" : "border-gray-300 focus:ring-2 ring-primary-color"}`}
            />
            {errors.name_on_card && (
              <p className="text-red-500 text-[10px]">
                {errors.name_on_card.message}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-bold text-text-color uppercase tracking-wide">
                Month *
              </label>
              <select
                {...register("expire_month", { required: "Required" })}
                className="border border-gray-300 p-3 rounded-md focus:ring-2 ring-primary-color outline-none bg-white cursor-pointer"
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const m = String(i + 1).padStart(2, "0");
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-bold text-text-color uppercase tracking-wide">
                Year *
              </label>
              <select
                {...register("expire_year", { required: "Required" })}
                className="border border-gray-300 p-3 rounded-md focus:ring-2 ring-primary-color outline-none bg-white cursor-pointer"
              >
                <option value="">YYYY</option>
                {Array.from({ length: 15 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-color uppercase tracking-wide">
              CVV *
            </label>
            <input
              type="password"
              maxLength="3"
              placeholder="***"
              className="border border-gray-300 p-3 rounded-md focus:ring-2 ring-primary-color outline-none"
              onChange={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-color cursor-pointer text-white py-3 rounded-md font-bold hover:bg-opacity-90 transition-all shadow-lg disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : cardToEdit
                  ? "Update Card"
                  : "💳 Save and Use"}
            </button>

            {cardToEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-danger-color text-white py-3 rounded-md font-bold hover:bg-danger-color transition-all"
              >
                Delete Card
              </button>
            )}

            <button
              type="button"
              onClick={() => onCancelCard(false)}
              className="px-6 py-3 border cursor-pointer border-gray-300 rounded-md font-bold text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded-md border border-gray-100">
            <ShieldCheck size={20} className="text-green-600 shrink-0" />
            <p>
              Your payment information is{" "}
              <span className="text-text-color font-bold">SSL encrypted</span>{" "}
              and secure.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CardForm;
