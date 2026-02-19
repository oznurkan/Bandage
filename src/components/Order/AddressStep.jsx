import { ArrowBigRight, CircleUser, Phone, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddressAction,
  getAddresses,
} from "../../store/actions/clientActions";

const AddressStep = ({
  onCancel,
  onNext,
  showAddressForm,
  onEdit,
  addressToEdit,
  onOpenForm,
}) => {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.client.addressList);
  const selectedAddress = useSelector((state) => state.shoppingCart.address);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (showAddressForm) {
      window.scrollTo({
        top: 350,
        behavior: "smooth",
      });
    }
  }, [showAddressForm]);

  const handleSelect = (addr) => {
    dispatch({ type: "SET_ADDRESS", payload: addr });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddressAction(id));
    }
  };

  return (
    <main className="w-full">
      <section className="py-2 w-full flex flex-col shadow-xl">
        {showAddressForm && (
          <AddressForm onCancel={onCancel} addressToEdit={addressToEdit} />
        )}
        <article className="w-full text-second-text-color font-normal text-base leading-6 flex flex-col gap-4 justify-between p-10 xl:flex-row">
          <h1 className="text-2xl font-bold text-text-color">
            Delivery Address
          </h1>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 shrink-0 mt-1 text-primary-color focus:ring-primary-color border-gray-300 rounded cursor-pointer"
            />
            <h1 className=" text-base font-bold text-second-text-color">
              Send my invoice to the same address.
            </h1>
          </div>
        </article>
        <article className="w-full flex flex-wrap gap-5 p-10">
          <button
            onClick={onOpenForm}
            className="w-full flex flex-col justify-center rounded-sm cursor-pointer items-center gap-4 border mr-auto p-6 font-normal text-second-text-color text-sm leading-6 border-second-text-color bg-light-gray-1 xl:w-[48%]"
          >
            <Plus />
            <h1>Add New Address</h1>
          </button>
          {addressList.map((address, index) => (
            <div
              key={index}
              onClick={() => handleSelect(address)}
              className={`w-full flex flex-col cursor-pointer justify-start items-start rounded-sm gap-7 border-2 mr-auto p-3 font-normal text-second-text-color text-sm leading-6 bg-light-gray-1 xl:w-[48%]
             ${
               selectedAddress?.id === address.id
                 ? "border-primary-color bg-blue-50"
                 : "border-second-text-color bg-white"
             }`}
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="checkbox"
                    name="selectedAddress"
                    checked={selectedAddress?.id === address.id}
                    onChange={() => handleSelect(address)}
                    className="w-4 h-4 shrink-0 text-primary-color focus:ring-primary-color border-gray-300 rounded cursor-pointer"
                  />
                  <h1 className=" text-base font-bold text-second-text-color">
                    {address.title}
                  </h1>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(address);
                    }}
                    className="text-xs cursor-pointer hover:underline font-bold hover:text-primary-color"
                  >
                    Settings
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, address.id)}
                    className="text-danger-color cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 font-normal text-sm text-second-text-color leading-6">
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CircleUser size={20} />
                    <h1 className="font-bold text-base text-second-text-color">
                      {address.name} {address.surname}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={20} />
                    <h6 className="font-normal text-base text-second-text-color">
                      {address.phone}
                    </h6>
                  </div>
                </div>
                <div className="flex gap-2">
                  <h3>{address.neighborhood}</h3>
                </div>
                <div className="flex gap-2">
                  <h3>0006</h3>
                  <div>-</div>
                  <h3>
                    {address.city}-{address.district}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </article>
        <button className="flex justify-end p-10">
          <ArrowBigRight
            disabled={!selectedAddress}
            onClick={onNext}
            className="text-primary-color cursor-pointer fill-primary-color"
          />
        </button>
      </section>
    </main>
  );
};

export default AddressStep;
