import { useEffect, useState, useContext } from "react"; // Added useContext
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../contexts/AuthContext"; // Import your AuthContext
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Access logged-in user
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching details:", err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleAddToCart = async () => {
    if (!user) {
      return navigate("/login");
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      buyerEmail: user.email,
      purchaseQuantity: product.Minimum_selling_quantity, // Matches backend $inc logic
    };

    try {
      const res = await axiosSecure.post("/api/cart", cartItem);
      if (res.data.insertResult.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: `${product.name} has been added to your wholesale cart.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Cart Error:", error);
      Swal.fire("Error", "Could not add product to cart", "error");
    }
  };

  if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!product) return <div className="text-center mt-20 text-error">Product not found!</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="btn btn-outline mb-6">← Back</button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 p-8 shadow-2xl rounded-3xl border border-base-200">
        <figure>
          <img src={product.image} alt={product.name} className="w-full rounded-2xl shadow-lg object-cover max-h-[500px]" />
        </figure>
        
        <div className="space-y-6">
          <div className="badge badge-primary">{product.category}</div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl font-bold text-primary">${product.price}</p>
          
          <div className="divider"></div>
          
          <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          
          <div className="bg-base-200 p-4 rounded-xl space-y-2">
            <p><strong>Available Stock:</strong> {product.main_quantity} units</p>
            <p><strong>Minimum Order:</strong> {product.Minimum_selling_quantity} units</p>
          </div>

          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary btn-lg w-full"
            disabled={product.main_quantity < product.Minimum_selling_quantity}
          >
            {product.main_quantity < product.Minimum_selling_quantity ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;