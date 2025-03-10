import { ToastContainer } from "react-toastify";
import { Hero } from '@/components/matrimonial/Hero'
import Footer from '@/components/matrimonial/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
