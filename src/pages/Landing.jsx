import Hero from "../components/landing/Hero";
import TrustStrip from "../components/landing/TrustStrip";
import Routine from "../components/landing/Routine";
import MenuShowcase from "../components/landing/MenuShowcase";
import WaysToExplore from "../components/landing/WaysToExplore";
import FoodLanguage from "../components/landing/FoodLanguage";
import HowItWorks from "../components/landing/HowItWorks";
import Experience from "../components/landing/Experience";
import Faq from "../components/landing/Faq";
import CtaBanner from "../components/landing/CtaBanner";

const Landing = () => (
  <div className="landing">
    <Hero />
    <TrustStrip />
    <Routine />
    <MenuShowcase />
    <WaysToExplore />
    <FoodLanguage />
    <HowItWorks />
    <Experience />
    <Faq />
    <CtaBanner />
  </div>
);

export default Landing;
