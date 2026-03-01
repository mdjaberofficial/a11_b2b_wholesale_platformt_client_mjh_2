import { Typewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">
        Welcome to the{' '}
        <span className="text-primary">
          <Typewriter
            words={['Global Marketplace', 'B2B Hub', 'Wholesale Network']}
            loop={true}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
      
      <Fade delay={500}>
        <p className="text-lg text-gray-600">
          Connecting bulk suppliers with institutional buyers seamlessly.
        </p>
      </Fade>

      <button className="btn btn-primary">Explore Products</button>
    </div>
  );
};

export default Home;