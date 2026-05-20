import HeroSection from "./HeroSection.jsx";
import AvailableCars from "./AvailableCars.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import Testimonials from "./Testimonials.jsx";
import PageTransition from "../../components/ui/PageTransition.jsx";

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <AvailableCars />
      <WhyChooseUs />
      <Testimonials />
    </PageTransition>
  );
}
