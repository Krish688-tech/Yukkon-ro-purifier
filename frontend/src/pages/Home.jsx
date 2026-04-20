import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WideProducts from "../components/WideProducts";
import TopSelling from "../components/TopSellingProducts";
import RelatedProducts from "../components/RelatedProducts";
import Testimonials from "../components/Testimonials";


function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WideProducts />
      <TopSelling />
      <RelatedProducts />
      <Testimonials />
    </div>
  );
}

export default App;