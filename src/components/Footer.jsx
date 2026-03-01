import { Link } from "react-router"; // or react-router-dom

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="footer grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-neutral-focus pb-10">
          
          {/* Brand Section */}
          <aside className="space-y-4">
            <Link to="/" className="text-3xl font-bold text-primary flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              B2B Wholesale
            </Link>
            <p className="text-gray-400 max-w-xs">
              The premier global marketplace connecting trusted manufacturers with institutional bulk buyers seamlessly and securely.
            </p>
          </aside> 
          
          {/* Quick Links */}
          <nav>
            <h6 className="footer-title text-lg text-white">Platform</h6> 
            <Link to="/all-products" className="link link-hover text-gray-400">All Products</Link>
            <Link to="/categories" className="link link-hover text-gray-400">Categories</Link>
            <Link to="/register" className="link link-hover text-gray-400">Become a Supplier</Link>
            <a className="link link-hover text-gray-400">Pricing & Fees</a>
          </nav> 
          
          {/* Support */}
          <nav>
            <h6 className="footer-title text-lg text-white">Support</h6> 
            <a className="link link-hover text-gray-400">Help Center</a>
            <a className="link link-hover text-gray-400">Trust & Safety</a>
            <a className="link link-hover text-gray-400">Return Policy</a>
            <a className="link link-hover text-gray-400">Contact Us</a>
          </nav> 
          
          {/* Contact / Socials */}
          <nav>
            <h6 className="footer-title text-lg text-white">Get in Touch</h6> 
            <p className="text-gray-400 mb-2">support@b2bwholesale.com</p>
            <p className="text-gray-400 mb-4">+1 (800) 123-4567</p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-circle btn-sm btn-ghost bg-neutral-focus hover:bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost bg-neutral-focus hover:bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>
              </a>
            </div>
          </nav>
        </div>
        
        {/* Copyright */}
        <div className="footer footer-center p-4 pt-8 text-gray-500">
          <p>© {new Date().getFullYear()} B2B Wholesale Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;