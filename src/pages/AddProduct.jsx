import { useContext } from "react";
import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  // Initialize React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // 1. Format the data to match backend expectations
    const newProduct = {
      name: data.name,
      image: data.image,
      category: data.category,
      price: parseFloat(data.price),
      Minimum_selling_quantity: parseInt(data.minQty),
      description: data.description,
      // Attach the user who added it
      supplier: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
      }
    };

    try {
      // 2. Send to backend via secure Axios
      const res = await axiosSecure.post('/api/products', newProduct);
      
      if (res.data.insertedId) {
        // 3. Show Sweet Alert on success
        Swal.fire({
          title: "Success!",
          text: "Product added successfully to the marketplace.",
          icon: "success",
          confirmButtonText: "Cool"
        });
        // 4. Clear the form
        reset();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add product. Please try again.",
        icon: "error",
        confirmButtonText: "Close"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Add New Product</h2>
          <p className="text-gray-500 mt-2">List your wholesale items to the global marketplace.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Product Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Product Name</span></label>
              <input 
                type="text" 
                placeholder="e.g., Industrial Coffee Machine" 
                className="input input-bordered w-full"
                {...register("name", { required: "Product name is required" })} 
              />
              {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Category</span></label>
              <select 
                className="select select-bordered w-full"
                defaultValue=""
                {...register("category", { required: "Please select a category" })}
              >
                <option value="" disabled>Select Category...</option>
                <option value="Electronics">Electronics</option>
                <option value="Apparel & Fashion">Apparel & Fashion</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Machinery">Machinery</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Automotive">Automotive</option>
              </select>
              {errors.category && <span className="text-error text-sm mt-1">{errors.category.message}</span>}
            </div>
          </div>

          {/* Row 2: Price & Minimum Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Price per unit ($)</span></label>
              <input 
                type="number" 
                step="0.01"
                placeholder="e.g., 250.00" 
                className="input input-bordered w-full"
                {...register("price", { required: "Price is required", min: 0 })} 
              />
              {errors.price && <span className="text-error text-sm mt-1">{errors.price.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Minimum Selling Quantity</span></label>
              <input 
                type="number" 
                placeholder="e.g., 150" 
                className="input input-bordered w-full"
                {...register("minQty", { required: "Minimum quantity is required", min: 1 })} 
              />
              {errors.minQty && <span className="text-error text-sm mt-1">{errors.minQty.message}</span>}
            </div>
          </div>

          {/* Row 3: Image URL */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Image URL</span></label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              className="input input-bordered w-full"
              {...register("image", { required: "Image URL is required" })} 
            />
            {errors.image && <span className="text-error text-sm mt-1">{errors.image.message}</span>}
          </div>

          {/* Row 4: Description */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Product Description</span></label>
            <textarea 
              className="textarea textarea-bordered h-32 w-full" 
              placeholder="Provide detailed specifications, materials, and wholesale terms..."
              {...register("description", { required: "Description is required" })}
            ></textarea>
            {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
          </div>

          {/* Read-Only Supplier Info (Hidden from editing, but good for UI trust) */}
          <div className="bg-base-200 p-4 rounded-xl flex items-center gap-4 mt-6">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={user?.photoURL || "https://placehold.co/100"} alt="User" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Adding as Supplier:</p>
              <p className="font-bold">{user?.displayName} ({user?.email})</p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-8 text-lg">
            Publish Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;