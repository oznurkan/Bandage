import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addNewAddress,
  updateAddressAction,
} from "../../store/actions/clientActions";

const turkishCities = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Aksaray",
  "Amasya",
  "Ankara",
  "Antalya",
  "Ardahan",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bartın",
  "Batman",
  "Bayburt",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
];

const AddressForm = ({ onCancel, addressToEdit }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (addressToEdit) reset(addressToEdit);
    else
      reset({
        title: "",
        name: "",
        surname: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
      });
  }, [addressToEdit, reset]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      if (addressToEdit) {
        await dispatch(updateAddressAction(data));
      } else {
        await dispatch(addNewAddress({ ...data, id: Date.now() }));
      }
      onCancel(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-bold text-text-color mb-4">
        {addressToEdit ? "Update Address" : "Add New Address"}
      </h3>
      <div>
        <label className="block text-sm font-semibold text-text-color mb-1">
          Address Title *
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Home, Office"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
        />
        {errors.title && (
          <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text-color mb-1">
            Name *
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="First name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-color mb-1">
            Surname *
          </label>
          <input
            {...register("surname", { required: "Surname is required" })}
            type="text"
            placeholder="Last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
          />
          {errors.surname && (
            <p className="text-xs text-red-600 mt-1">
              {errors.surname.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-color mb-1">
          Phone *
        </label>
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^(\+90|0)?[1-9]\d{9}$/,
              message: "Invalid Turkish phone number",
            },
          })}
          type="tel"
          placeholder="05XXXXXXXXX"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
        />
        {errors.phone && (
          <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text-color mb-1">
            City *
          </label>
          <select
            {...register("city", { required: "City is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none bg-white"
          >
            <option value="">Select city</option>
            {turkishCities.map((city) => (
              <option key={city} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-color mb-1">
            District *
          </label>
          <input
            {...register("district", { required: "District is required" })}
            type="text"
            placeholder="Kadıköy"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
          />
          {errors.district && (
            <p className="text-xs text-red-600 mt-1">
              {errors.district.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-color mb-1">
          Address Details (Street, Apartment No) *
        </label>
        <textarea
          {...register("neighborhood", {
            required: "Address details are required",
          })}
          rows={4}
          placeholder="Neighborhood, Street, Apartment No"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color outline-none"
        />
        {errors.neighborhood && (
          <p className="text-xs text-red-600 mt-1">
            {errors.neighborhood.message}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 cursor-pointer bg-primary-color text-white hover:bg-text-color font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all"
        >
          {loading
            ? "Saving..."
            : addressToEdit
              ? "Update Address"
              : "Add Address"}
        </button>
        <button
          type="button"
          onClick={() => onCancel(false)}
          className="px-6 py-3 cursor-pointer border border-danger-color text-danger-color font-bold rounded-lg hover:bg-danger-color hover:text-white transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
