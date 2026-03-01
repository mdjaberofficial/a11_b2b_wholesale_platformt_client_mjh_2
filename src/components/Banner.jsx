import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'motion/react'; // or framer-motion depending on your install
import { Link } from 'react-router';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Global B2B Wholesale Marketplace",
      description: "Connect with top-tier manufacturers and distributors worldwide. Source high-quality products at competitive bulk prices.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Seamless Logistics & Supply Chain",
      description: "Manage your bulk orders efficiently with our integrated logistics solutions tailored for large-scale institutional buyers.",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Secure & Reliable Transactions",
      description: "Experience peace of mind with our secure payment gateways and verified supplier network across all categories.",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  return (
    <div className="w-full h-[60vh] md:h-[80vh] bg-base-200 mt-4 rounded-2xl overflow-hidden shadow-2xl relative z-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="w-full h-full flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${slide.image})` }}
            >
              <div className="text-center text-white px-4 md:px-20 max-w-4xl">
                {/* Framer Motion Animation */}
                <motion.h1 
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  {slide.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg md:text-2xl mb-8 text-gray-200"
                >
                  {slide.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link to="/all-products" className="btn btn-primary btn-lg px-10">
                    Explore Products
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;