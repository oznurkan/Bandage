import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/actions/orderActions";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  MapPin,
  ShoppingBag,
} from "lucide-react";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderState = useSelector((state) => state.order);
  const orderList = orderState?.orderList || [];
  const loading = orderState?.loading || false;
  const error = orderState?.error || null;

  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCardNumber = (cardNo) => {
    const cardStr = String(cardNo).padStart(16, "0");
    return `**** **** **** ${cardStr.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchOrders())}
            className="px-6 py-2 bg-primary-color text-white rounded-lg hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orderList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No Orders Yet</h2>
        <p className="text-second-text-color mb-6">
          Start shopping to see your orders here
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 bg-primary-color text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="container font-montserrat mx-auto px-4 max-w-7xl">
        <article className="mb-8">
          <h1 className="text-3xl font-bold text-text-color flex items-center gap-3 mb-2">
            <Package size={32} className="text-primary-color" />
            Order History
          </h1>
          <p className="text-second-text-color">
            <span className="text-text-color font-semibold">
              {orderList.length}
            </span>{" "}
            orders in total
          </p>
        </article>
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="hidden lg:flex items-center gap-4 bg-gray-100 px-6 py-4 font-semibold text-sm text-text-color border-b">
            <div className="flex-[0.8]">Order ID</div>
            <div className="flex-[1.5]">Order Date</div>
            <div className="flex-[0.8]">Items</div>
            <div className="flex-1">Total Amount</div>
            <div className="flex-1">Payment</div>
            <div className="flex-[0.4] text-center">Details</div>
          </div>
          <div className="divide-y divide-gray-200">
            {orderList.map((order) => {
              const isExpanded = expandedOrders[order.id];
              const totalItems = order.products.reduce(
                (sum, product) => sum + (product.count || 0),
                0,
              );

              return (
                <div
                  key={order.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <div
                    className="flex flex-col lg:flex-row lg:items-center gap-4 px-6 py-4 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex-[0.8]">
                      <div className="flex items-center gap-2">
                        <span className="lg:hidden text-xs font-semibold text-second-text-color">
                          Order ID:
                        </span>
                        <span className="text-xs font-bold text-white bg-primary-color px-3 py-1 rounded-full">
                          #{order.id}
                        </span>
                      </div>
                    </div>
                    <div className="flex-[1.5]">
                      <div className="flex items-center gap-2">
                        <span className="lg:hidden text-xs font-semibold text-second-text-color">
                          Date:
                        </span>
                        <Calendar
                          size={14}
                          className="text-second-text-color"
                        />
                        <span className="text-sm">
                          {formatDate(order.order_date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-[0.8]">
                      <div className="flex items-center gap-2">
                        <span className="lg:hidden text-xs font-semibold text-second-text-color">
                          Items:
                        </span>
                        <Package size={14} className="text-second-text-color" />
                        <span className="text-sm">{totalItems} items</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="lg:hidden text-xs font-semibold text-second-text-color">
                          Total:
                        </span>
                        <p className="text-lg font-bold text-primary-color">
                          ${order.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="lg:hidden text-xs font-semibold text-second-text-color">
                          Payment:
                        </span>
                        <CreditCard
                          size={14}
                          className="text-second-text-color"
                        />
                        <span className="text-sm">
                          {formatCardNumber(order.card_no)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-[0.4] flex justify-center lg:justify-end items-center">
                      <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-primary-color" />
                        ) : (
                          <ChevronDown
                            size={20}
                            className="text-second-text-color"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="bg-gray-50 border-t border-gray-200 px-6 py-10">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-2">
                          <h3 className="font-bold text-text-color mb-4 flex items-center gap-2">
                            <ShoppingBag size={18} />
                            Order Details
                          </h3>

                          {order.products.length === 0 ? (
                            <p className="text-second-text-color text-sm italic bg-white p-4 rounded-lg">
                              No products in this order
                            </p>
                          ) : (
                            <div className="flex flex-col gap-3">
                              {order.products.map((product, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <img
                                    src={
                                      product.images?.[0]?.url ||
                                      "/placeholder.jpg"
                                    }
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-text-color mb-1">
                                      {product.name}
                                    </h4>
                                    <p className="text-sm text-second-text-color line-clamp-1 mb-2">
                                      {product.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        Qty: {product.count || 1}
                                      </span>
                                      <span className="text-sm font-bold text-primary-color">
                                        ${product.price}
                                      </span>
                                      <span className="text-xs text-second-text-color">
                                        Total: $
                                        {(
                                          product.price * (product.count || 1)
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-bold text-text-color mb-3 flex items-center gap-2">
                              <CreditCard size={18} />
                              Payment Info
                            </h3>
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-second-text-color">
                                  Card:
                                </span>
                                <span className="font-medium">
                                  {formatCardNumber(order.card_no)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-second-text-color">
                                  Card Holder:
                                </span>
                                <span className="font-medium">
                                  {order.card_name}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-second-text-color">
                                  Expires:
                                </span>
                                <span className="font-medium">
                                  {order.card_expire_month}/
                                  {order.card_expire_year}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-bold text-text-color mb-3 flex items-center gap-2">
                              <MapPin size={18} />
                              Delivery Address
                            </h3>
                            <p className="text-sm text-second-text-color">
                              Address ID:{" "}
                              <span className="font-medium">
                                {order.address_id}
                              </span>
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-primary-color">
                            <h3 className="font-bold text-text-color mb-3">
                              Order Summary
                            </h3>
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-second-text-color">
                                  Total Items:
                                </span>
                                <span className="font-medium">
                                  {totalItems}
                                </span>
                              </div>
                              <div className="flex justify-between pt-2 border-t">
                                <span className="font-bold">Total Amount:</span>
                                <span className="font-bold text-lg text-primary-color">
                                  ${order.price.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
};

export default OrderHistory;
