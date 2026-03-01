import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router"; // or react-router-dom

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only the logged-in user's products
  // src/pages/MyProducts.jsx
useEffect(() => {
  if (user?.email) {
    // Matches the backend's expected query parameter "email"
    axiosSecure.get(`/api/my-products?email=${user.email}`)
      .then(res => {
        setMyProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching my products:", err);
        setLoading(false);
      });
  }
}, [user?.email, axiosSecure]);

  // Handle Delete with SweetAlert2 confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/api/products/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
            // Remove the deleted product from the state so the UI updates instantly
            setMyProducts(myProducts.filter(product => product._id !== id));
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "Failed to delete the product.", "error");
        }
      }
    });
  };

  if (loading) {
    return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">My Listed Products</h2>
        <span className="badge badge-primary badge-lg">{myProducts.length} Items</span>
      </div>

      {myProducts.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-2xl border-2 border-dashed border-base-300">
          <h3 className="text-2xl font-semibold mb-2">You haven't listed any products yet.</h3>
          <p className="text-gray-500 mb-6">Start adding products to reach wholesale buyers globally.</p>
          <Link to="/add-product" className="btn btn-primary">Add Your First Product</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Min Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.Minimum_selling_quantity}</td>
                  <td>
                    <div className="flex gap-2">
                      {/* We will build the Update route later if needed */}
                      <Link to={`/update-product/${product._id}`} className="btn btn-sm btn-info text-white">
                        Update
                      </Link>
                      <button 
                        onClick={() => handleDelete(product._id)} 
                        className="btn btn-sm btn-error text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;