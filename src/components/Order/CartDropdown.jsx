import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { cart } = useSelector((state) => state.shoppingCart);
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="w-80 bg-white shadow-2xl border border-gray-100 rounded-lg p-4 animate-fadeIn">
      <h3 className="font-bold text-sm mb-4 text-text-color">Sepetim ({totalCount} Ürün)</h3>
      
      <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.product.id} className="flex gap-3 items-center border-b border-gray-50 pb-2 last:border-0">
              <img 
                src={item.product.images?.[0]?.url} 
                className="w-12 h-12 object-cover rounded shadow-sm" 
                alt={item.product.name}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-text-color">{item.product.name}</p>
                <p className="text-[10px] text-gray-500 font-medium">Adet: {item.count}</p>
                <p className="text-xs font-bold text-secondary-color-1">${item.product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-center text-gray-400 py-4">Sepetiniz şu an boş.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-4 pt-4 border-t flex gap-2">
          <Link 
            to="/cart" 
            className="flex-1 text-center bg-primary-color text-white py-2.5 rounded text-xs font-bold hover:bg-opacity-90 transition-all"
          >
            Sepete Git
          </Link>
          <Link 
            to="/checkout" 
            className="flex-1 text-center bg-secondary-color-1 text-white py-2.5 rounded text-xs font-bold hover:bg-opacity-90 transition-all"
          >
            Siparişi Tamamla
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;