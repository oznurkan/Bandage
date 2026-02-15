import CartNavbar from "../components/Cart/CartNavbar";
import ShoppingCart from "../components/Cart/ShoppingCart";
import { useSelector } from "react-redux";
import CartEmpty from "../components/Cart/CartEmpty";
import CartHeader from "../components/Cart/CartHeader";
import OrderSummary from "../components/Order/OrderSummary";

const ShoppingCartPage = () => {
  const { cart } = useSelector((state) => state.shoppingCart);
  const selectedItems = cart.filter((item) => item.checked);

  const itemsTotal = selectedItems.reduce((acc, item) => {
    return acc + parseFloat(item.product.price) * item.count;
  }, 0);

  const shippingFee = itemsTotal > 500 || itemsTotal === 0 ? 0 : 50;
  const isFreeShipping = itemsTotal > 500;

  return (
    <>
      <CartNavbar />
      <CartHeader />
      {cart.length === 0 ? (
        <>
          <CartEmpty />
        </>
      ) : (
        <main className="w-full bg-thin-white">
          <section className="flex flex-col mx-auto w-[90%] pb-15 gap-15 lg:flex-row lg:gap-5 xl:gap-8">
            <article className="flex-1 xl:flex-2">
              <ShoppingCart cart={cart} isFreeShipping={isFreeShipping} />
            </article>
            <article className="flex-1">
              <OrderSummary
                itemsTotal={itemsTotal}
                shippingFee={shippingFee}
                selectedItemsCount={selectedItems.length}
              />
            </article>
          </section>
        </main>
      )}
    </>
  );
};

export default ShoppingCartPage;
