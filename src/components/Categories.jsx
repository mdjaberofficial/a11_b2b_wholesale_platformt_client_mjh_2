import { Link } from "react-router";
import { Fade } from "react-awesome-reveal"; // Let's use that awesome reveal package!

const Categories = () => {
  const categories = [
    { id: 1, name: "Electronics", icon: "💻", description: "Laptops, Phones, Accessories" },
    { id: 2, name: "Apparel & Fashion", icon: "👕", description: "Clothing, Shoes, Textiles" },
    { id: 3, name: "Home Appliances", icon: "🏠", description: "Kitchenware, Furniture, Decor" },
    { id: 4, name: "Machinery", icon: "⚙️", description: "Industrial tools, Heavy equipment" },
    { id: 5, name: "Health & Beauty", icon: "💄", description: "Skincare, Medical supplies" },
    { id: 6, name: "Automotive", icon: "🚗", description: "Car parts, Accessories" },
  ];

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Explore Wholesale Categories</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse through our wide variety of wholesale categories designed for retailers and bulk buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Fade cascade damping={0.1}>
          {categories.map((category) => (
            <Link 
              to={`/all-products?category=${category.name}`} 
              key={category.id}
            >
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-200 cursor-pointer h-full">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h2 className="card-title text-2xl">{category.name}</h2>
                  <p className="text-gray-500">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default Categories;