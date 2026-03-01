import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Challenge States
  const [isTableView, setIsTableView] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);

  useEffect(() => {
    // Fetch products from your backend
    axiosSecure.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Apply the filter logic (Minimum_selling_quantity > 100)
  const displayedProducts = filterAvailable 
    ? products.filter(product => product.Minimum_selling_quantity > 100)
    : products;

  if (loading) {
    return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">All Products ({displayedProducts.length})</h1>
        
        {/* Challenge Controls: Filter & Toggle View */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setFilterAvailable(!filterAvailable)}
            className={`btn ${filterAvailable ? 'btn-primary' : 'btn-outline btn-primary'}`}
          >
            {filterAvailable ? "Show All Products" : "Show Available Products (>100)"}
          </button>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 btn-secondary">
              View: {isTableView ? "Table" : "Card"}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
              <li><button onClick={() => setIsTableView(false)}>Card View</button></li>
              <li><button onClick={() => setIsTableView(true)}>Table View</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Render Table View */}
      {isTableView ? (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Min. Selling Qty</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image || "https://placehold.co/100"} alt={product.name} />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.Minimum_selling_quantity}</td>
                  <td>${product.price}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Details</button>
                  </td>
                </tr>
              ))}
              {displayedProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Render Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <div key={product._id} className="card bg-base-100 shadow-xl border border-base-200">
              <figure className="px-4 pt-4">
                <img src={product.image || "https://placehold.co/400x300"} alt={product.name} className="rounded-xl h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Category: {product.category}</span>
                  <span>Min Qty: <strong className="text-primary">{product.Minimum_selling_quantity}</strong></span>
                </div>
                <p className="text-xl font-bold mt-2">${product.price}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary w-full">View Details</button>
                </div>
              </div>
            </div>
          ))}
          {displayedProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 text-xl">
              No products found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;