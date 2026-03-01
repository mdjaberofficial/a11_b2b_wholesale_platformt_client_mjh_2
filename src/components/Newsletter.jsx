import { Tooltip } from "react-tooltip";

const Newsletter = () => {
  return (
    <div className="container mx-auto px-4 mt-24 mb-10">
      <div className="bg-primary rounded-3xl p-10 md:p-16 text-center text-primary-content relative overflow-hidden shadow-2xl">
        
        {/* Background decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Ahead of the Market</h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Subscribe to our B2B newsletter to receive the latest wholesale trends, exclusive supplier discounts, and industry insights directly to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your business email..." 
              className="input input-lg w-full text-base-content focus:outline-none" 
              required
            />
            
            {/* React Tooltip Anchor */}
            <button 
              data-tooltip-id="subscribe-tooltip"
              data-tooltip-content="We respect your privacy. No spam, ever."
              className="btn btn-neutral btn-lg"
            >
              Subscribe Now
            </button>
            <Tooltip id="subscribe-tooltip" place="top" style={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px' }} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;