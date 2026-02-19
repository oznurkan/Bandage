import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/clientActions";
import Gravatar from "react-gravatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  
  LogOut, 
  Package,
  ChevronDown 
} from "lucide-react";
import { toast } from "react-toastify";

const UserDropdown = ({isMobile}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.client.user);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  return (
    <div className="relative font-montserrat">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 cursor-pointer rounded-lg hover:bg-light-gray-2transition-colors"
      >
        <Gravatar
          email={user.email}
          size={isMobile ? 40 : 32}
          rating="pg"
          default="monsterid"
          className="rounded-full border-2 border-light-gray-2"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-bold text-text-color">{user.name}</p>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-second-text-color transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-light-gray-2 z-50">
            <div className="p-2">
              <button
                onClick={() => {
                  navigate("/orders");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-light-gray-2 rounded-lg transition-colors text-left"
              >
                <Package size={isMobile ? 28 : 18} className="text-second-text-color" />
                <span className="text-sm text-text-color cursor-pointer">Order History</span>
              </button>
            </div>
            <div className="border-t-2 border-light-gray-2 p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-left"
              >
                <LogOut size={isMobile ? 28 : 18} className="text-danger-color" />
                <span className="text-sm text-danger-color font-medium cursor-pointer">Log out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;