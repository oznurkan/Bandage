import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderDetails;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-40 font-montserrat animate-fadeIn">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-green-50 p-8 text-center border-b border-green-100">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500 animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order Successfully Placed!
          </h1>
          <p className="text-gray-500 mt-2">
            We've sent a confirmation email to your address.
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <ShoppingBag size={18} /> Order Details
            </h3>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Product image</th>
                    <th className="px-4 py-3">Product Detail</th>
                    <th className="px-4 py-3 text-center">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orderData?.products?.length > 0 ? (
                    orderData.products.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                      >
                        <td className="px-4 py-4 w-20">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={item.image}
                              alt={item.detail}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-700">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">
                              {item.detail}
                            </span>
                            <span className="text-xs text-gray-500">
                              ${item.price}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-gray-500">
                          x{item.count}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Ürün bilgisi bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-primary-color/5 p-4 rounded-xl border border-primary-color/10">
              <span className="font-bold text-gray-700">Total Amount Paid</span>
              <span className="text-2xl font-black text-primary-color">
                $
                {orderData?.price ? Number(orderData.price).toFixed(2) : "0.00"}
              </span>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="w-full bg-primary-color text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-primary-color/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Home size={20} />
              Return to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
