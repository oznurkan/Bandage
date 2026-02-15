import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { createOrderAction } from "../../store/actions/shoppingCartActions";

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isOrderPage = location.pathname === "/order";

  const {
    cart,
    address: selectedAddress,
    payment: selectedCard,
  } = useSelector((state) => state.shoppingCart);

  const [isAccepted, setIsAccepted] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectedItems = cart.filter((item) => item.checked);
  const selectedItemsCount = selectedItems.length;
  const totalItemQuantity = selectedItems.reduce(
    (total, item) => total + item.count,
    0,
  );

  const itemsTotal = selectedItems.reduce(
    (total, item) => total + (parseFloat(item.product.price) || 0) * item.count,
    0,
  );

  const shippingFee = itemsTotal > 500 || itemsTotal === 0 ? 0 : 29.99;

  const applyCoupon = () => {
    if (promoCode === "Hello10") {
      setDiscount(itemsTotal * 0.1);
    }
  };

  const grandTotal = itemsTotal + shippingFee - discount;

  const canContinueOrder =
    selectedItemsCount > 0 &&
    !!selectedAddress?.id &&
    !!selectedCard?.id &&
    isAccepted;

  const handleOrderSubmit = async () => {
    if (!canContinueOrder) return;

    setLoading(true);
    try {
      const response = await dispatch(
        createOrderAction({
          grandTotal: grandTotal,
          card_ccv: 321,
        }),
      );

      const orderDetailsForSuccess = {
        id: response.data.id,
        order_date: response.data.order_date || new Date().toLocaleString(),
        card_name: selectedCard?.name_on_card,
        card_no: selectedCard?.card_no,
        price: grandTotal,
        products: selectedItems.map((item) => ({
          detail: item.product.name,
          count: item.count,
          price: item.product.price,
          image: item.product.images?.[0]?.url || item.product.images?.[0],
        })),
      };

      navigate("/success", { state: { orderDetails: orderDetailsForSuccess } });
    } catch (err) {
      alert("Sipariş hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-full flex flex-col gap-6 sticky top-5 font-montserrat">
      <section className="flex flex-col gap-6">
        {isOrderPage && (
          <article className="bg-white mx-auto w-full rounded-lg shadow-lg p-7 flex gap-4 border border-gray-100 animate-fadeIn">
            <input
              type="checkbox"
              id="agreement"
              checked={isAccepted}
              onChange={(e) => setIsAccepted(e.target.checked)}
              className="w-6 h-6 shrink-0 accent-primary-color cursor-pointer mt-1"
            />
            <label
              htmlFor="agreement"
              className="cursor-pointer text-sm leading-6"
            >
              I have read and I accept the{" "}
              <span className="font-bold underline">
                Preliminary Information Form
              </span>{" "}
              and the{" "}
              <span className="font-bold underline">
                Distant Sales Agreement
              </span>
              .
            </label>
          </article>
        )}

        <article className="bg-white mx-auto w-full rounded-lg shadow-lg p-6 flex mt-5 flex-col gap-4">
          <h2 className="text-xl font-bold text-text-color">Order Summary</h2>

          <div className="flex flex-col gap-3">
            {!isOrderPage && (
              <>
                <div className="flex justify-between text-second-text-color text-sm">
                  <span>Selected Products:</span>
                  <span className="font-semibold">{selectedItemsCount}</span>
                </div>
                <div className="flex justify-between text-second-text-color text-sm">
                  <span>Total Quantity:</span>
                  <span className="font-semibold">{totalItemQuantity}</span>
                </div>
              </>
            )}

            <div className="flex justify-between text-second-text-color text-sm">
              <span>Items Total:</span>
              <span className="font-semibold">${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-second-text-color text-sm">
              <span>Shipping Fee:</span>
              <span
                className={
                  shippingFee === 0
                    ? "text-green-600 font-semibold"
                    : "font-semibold"
                }
              >
                {shippingFee === 0
                  ? "Free Shipping"
                  : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm font-bold">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            {!isOrderPage && itemsTotal > 0 && itemsTotal < 500 && (
              <div className="bg-orange-50 p-2 rounded text-[12px] text-orange-700 border border-orange-100">
                Add <strong>${(500 - itemsTotal).toFixed(2)}</strong> more to
                get <strong>Free Shipping!</strong>
              </div>
            )}
            <div className="border-t mt-2 pt-4 flex justify-between text-xl font-bold text-text-color">
              <span>Grand Total:</span>
              <span className="text-primary-color">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="w-full">
              {!showInput ? (
                <button
                  onClick={() => setShowInput(true)}
                  className="w-full py-3 flex items-center justify-center gap-2 border border-dashed border-primary-blue bg-white text-primary-blue font-bold rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <Plus size={20} /> Enter promo code
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Hello10"
                      className="flex-1 p-3 border border-primary-blue rounded-lg text-sm outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-primary-blue text-white px-4 rounded-lg font-bold text-sm cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() =>
                isOrderPage ? handleOrderSubmit() : navigate("/order")
              }
              disabled={
                isOrderPage
                  ? !canContinueOrder || loading
                  : selectedItemsCount === 0
              }
              className={`w-full py-4 font-bold rounded-lg transition-all shadow-md active:scale-[0.98] 
                ${
                  (isOrderPage ? canContinueOrder : selectedItemsCount > 0)
                    ? "bg-primary-color text-white hover:bg-blue-500 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {loading
                ? "Processing..."
                : isOrderPage
                  ? "Confirm and Complete"
                  : "Proceed to Checkout"}
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="w-full py-3 border border-primary-color text-primary-color font-bold rounded-lg hover:bg-primary-color hover:text-white transition-all text-sm cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </article>
      </section>
    </aside>
  );
};

export default OrderSummary;
