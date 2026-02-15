import { useState } from "react";
import OrderNavbar from "../components/Order/OrderNavbar";
import OrderSummary from "../components/Order/OrderSummary";
import AddressStep from "../components/Order/AddressStep";
import CartStep from "../components/Order/CartStep";

const OrderPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [addressToEdit, setAddressToEdit] = useState(null);

  const [showCardForm, setShowCardForm] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const handleEditClick = (address) => {
    setAddressToEdit(address);
    setShowAddressForm(true);
  };

  const handleOpenNewAddress = () => {
    setAddressToEdit(null);
    setShowAddressForm(true);
  };

  const handleEditCard = (card) => {
    setCardToEdit(card);
    setShowCardForm(true);
  };

  const handleOpenNewCard = () => {
    setCardToEdit(null);
    setShowCardForm(true);
  };

  return (
    <main className="w-full bg-thin-white min-h-screen">
      <section className="flex flex-col mx-auto w-[90%] pb-15 gap-15 lg:flex-row lg:gap-5 xl:gap-8 pt-10">
        <article className="flex-1 xl:flex-2">
          <OrderNavbar activeStep={activeStep} setActiveStep={setActiveStep} />
          <div className="max-w-6xl mx-auto py-8">
            {activeStep === 1 ? (
              <AddressStep
                onNext={() => setActiveStep(2)}
                showAddressForm={showAddressForm}
                onCancel={() => setShowAddressForm(false)}
                onOpenForm={handleOpenNewAddress}
                onEdit={handleEditClick}
                addressToEdit={addressToEdit}
              />
            ) : (
              <CartStep
                onBack={() => setActiveStep(1)}
                showCardForm={showCardForm}
                onCancelCard={() => setShowCardForm(false)}
                onOpenCardForm={handleOpenNewCard}
                onEditCard={handleEditCard}
                cardToEdit={cardToEdit}
              />
            )}
          </div>
        </article>
        <article className="flex-1">
          <OrderSummary />
        </article>
      </section>
    </main>
  );
};

export default OrderPage;
