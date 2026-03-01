import { Fade, Slide } from "react-awesome-reveal";
import { motion } from "motion/react"; // or 'framer-motion' depending on your package

const WhyChooseUs = () => {
  const features = [
    { title: "Verified Suppliers", description: "Every distributor undergoes a strict vetting process." },
    { title: "Secure Payments", description: "Escrow-based payment systems to protect your bulk orders." },
    { title: "Global Logistics", description: "End-to-end shipping solutions via air, land, and sea." },
  ];

  return (
    <div className="container mx-auto px-4 mt-24">
      <div className="flex flex-col lg:flex-row items-center gap-12 bg-base-100 p-8 md:p-12 rounded-3xl shadow-xl border border-base-200">
        
        {/* Left Side: Text & Features */}
        <div className="lg:w-1/2 space-y-8">
          <Slide direction="left" triggerOnce>
            <div>
              <h2 className="text-4xl font-bold mb-4">Why Partner With Us?</h2>
              <p className="text-gray-500 text-lg">
                We take the friction out of global B2B trading. Our platform is built specifically for high-volume institutional buyers and trusted manufacturers.
              </p>
            </div>
          </Slide>

          <div className="space-y-6">
            <Fade cascade damping={0.2} triggerOnce>
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
        </div>

        {/* Right Side: Animated Image instead of Lottie */}
        <div className="lg:w-1/2 flex justify-center w-full max-w-md mx-auto relative">
          
          {/* Decorative background blob/circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10"></div>

          {/* Framer Motion Floating Image */}
          <motion.img 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop" 
            alt="B2B Partnership" 
            className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
            animate={{ y: [0, -15, 0] }} // This creates a continuous floating effect
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;