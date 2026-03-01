import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="space-y-20 mb-20">
      {/* 1. Banner / Slider Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Product Categories Section (Placeholder for Next Step) */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse through our wide variety of wholesale categories designed for retailers and bulk buyers.
          </p>
        </div>
        {/* We will build the Category Cards here next */}
        <div className="h-40 bg-base-200 rounded-xl flex items-center justify-center border-2 border-dashed border-base-300">
          <span className="text-xl text-gray-400">Categories Grid Coming Next...</span>
        </div>
      </section>

      {/* 3. Extra Section 1 (e.g., Why Choose Us?) */}
      <section>
        {/* Placeholder */}
      </section>

      {/* 4. Extra Section 2 (e.g., Trusted Brands / Testimonials) */}
      <section>
         {/* Placeholder */}
      </section>
    </div>
  );
};

export default Home;