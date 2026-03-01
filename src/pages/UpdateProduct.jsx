import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch the specific product data to pre-fill the form
  useEffect(() => {
    axiosSecure.get(`/api/products/${id}`)
      .then(res => {
        // Pre-fill the form with data from the database
        reset({
          name: res.data.name,
          category: res.data.category,
          price: res.data.price,
          main_quantity: res.data.main_quantity,
          minQty: res.data.minimum_selling_quantity, // Mapping backend name to form name
          image: res.data.image,
          rating: res.data.rating,
          description: res.data.description,
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      });
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    // Structure the data to match your Backend's expectation (app.put)
    const updatedProduct = {
      name: data.name,
      image: data.image,
      category: data.category,
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
      main_quantity: parseInt(data.main_quantity),
      minimum_selling_quantity: parseInt(data.minQty), 
      description: data.description,
    };

    try {
      // Use PUT to match your backend route logic
      const res = await axiosSecure.put(`/api/products/${id}`, updatedProduct);
      
      // Backend returns updateResult which contains modifiedCount
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully.",
          icon: "success",
          confirmButtonText: "Great"
        }).then(() => {
          navigate('/my-products');
        });
      } else {
        Swal.fire("Notice", "No changes were made to the product.", "info");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error!", "Failed to update product.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Update Product</h2>
          <p className="text-gray-500 mt-2">Modify the details of your wholesale listing.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Product Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Product Name</span></label>
              <input 
                type="text" 
                className="input input-bordered w-full"
                {...register("name", { required: "Product name is required" })} 
              />
              {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Category</span></label>
              <select 
                className="select select-bordered w-full"
                {...register("category", { required: "Please select a category" })}
              >
                <option value="Electronics">Electronics</option>
                <option value="Apparel & Fashion">Apparel & Fashion</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Machinery">Machinery</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Automotive">Automotive</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price & Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Price per unit ($)</span></label>
              <input 
                type="number" step="0.01"
                className="input input-bordered w-full"
                {...register("price", { required: "Price is required", min: 0 })} 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Rating (0-5)</span></label>
              <input 
                type="number" step="0.1"
                className="input input-bordered w-full"
                {...register("rating", { required: "Rating is required", min: 0, max: 5 })} 
              />
            </div>
          </div>

          {/* Row 3: Main Stock Quantity & Min Selling Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Total Stock Quantity</span></label>
              <input 
                type="number" 
                className="input input-bordered w-full"
                {...register("main_quantity", { required: "Stock quantity is required", min: 0 })} 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Minimum Selling Quantity</span></label>
              <input 
                type="number" 
                className="input input-bordered w-full"
                {...register("minQty", { required: "Min quantity is required", min: 1 })} 
              />
            </div>
          </div>

          {/* Row 4: Image URL */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Image URL</span></label>
            <input 
              type="url" 
              className="input input-bordered w-full"
              {...register("image", { required: "Image URL is required" })} 
            />
          </div>

          {/* Row 5: Description */}
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Product Description</span></label>
            <textarea 
              className="textarea textarea-bordered h-32 w-full" 
              {...register("description", { required: "Description is required" })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-8 text-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;