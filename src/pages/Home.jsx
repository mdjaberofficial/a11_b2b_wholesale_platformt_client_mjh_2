import Banner from "../components/Banner";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <div className="space-y-20 mb-20">
      {/* 1. Banner / Slider Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Product Categories Section */}
      <section>
        <Categories />
      </section>

      {/* 3. Extra Section 1 (e.g., Why Choose Us?) */}
      <section className="min-h-75 bg-base-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-base-300 mx-4">
          <span className="text-xl text-gray-400">Extra Section 1 (Why Choose Us) Coming Next...</span>
      </section>

      {/* 4. Extra Section 2 (e.g., Trusted Brands / Testimonials) */}
      <section className="min-h-75 bg-base-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-base-300 mx-4">
         <span className="text-xl text-gray-400">Extra Section 2 (Testimonials) Coming Next...</span>
      </section>
    </div>
  );
};

export default Home;