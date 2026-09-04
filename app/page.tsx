import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import JoiasSpotlight from "./components/JoiasSpotlight";
import HowToBuy from "./components/HowToBuy";
import OtherLines from "./components/OtherLines";
import Story from "./components/Story";
import Instagram from "./components/Instagram";
import Magazine from "./components/Magazine";
import Contact from "./components/Contact";
import StoreMap from "./components/StoreMap";

/**
 * Jewellery leads: it is the flagship line and the one a visitor arrives ready
 * to buy. Lighting and decoration follow once that story is told.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <JoiasSpotlight />
      <HowToBuy />
      <OtherLines />
      <Story />
      <Instagram />
      <Magazine />
      <Contact />
      <StoreMap />
    </>
  );
}
