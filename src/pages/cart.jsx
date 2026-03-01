import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/api/cart?email=${user.email}`)
        .then(res => {
          setCartItems(res.data);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove from cart?",
      text: "This will return the items to the wholesale stock.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/api/cart/${id}`);
          if (res.data.deleteResult.deletedCount > 0) {
            setCartItems(cartItems.filter(item => item._id !== id));
            Swal.fire("Removed!", "Item has been removed from your cart.", "success");
          }
        } catch (error) {
          console.error("Delete Error:", error);
        }
      }
    });
  };

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.purchaseQuantity), 0);

  if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Wholesale Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-3xl">
          <p className="text-xl text-gray-500">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-base-100 p-4 rounded-2xl shadow border border-base-200">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500">Order Qty: {item.purchaseQuantity}</p>
                    <p className="text-primary font-bold">${item.price} / unit</p>
                  </div>
                </div>
                <button onClick={() => handleRemove(item._id)} className="btn btn-error btn-sm text-white">Remove</button>
              </div>
            ))}
          </div>

          <div className="bg-base-100 p-8 rounded-3xl shadow-xl border border-base-200 h-fit">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="flex justify-between text-lg mb-2">
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-4">
              <span>Subtotal:</span>
              <span>${subTotal.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary btn-lg w-full mt-8">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;