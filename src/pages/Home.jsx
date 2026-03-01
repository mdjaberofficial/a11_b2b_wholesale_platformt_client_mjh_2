import Banner from "../components/Banner";
import Categories from "../components/Categories";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="space-y-10 mb-20">
      {/* 1. Banner / Slider Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Product Categories Section */}
      <section>
        <Categories />
      </section>

      {/* 3. Extra Section 1: Why Choose Us */}
      <section>
        <WhyChooseUs />
      </section>

      {/* 4. Extra Section 2: Newsletter / CTA */}
      <section>
         <Newsletter />
      </section>
    </div>
  );
};

export default Home;