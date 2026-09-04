import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import JoiasSpotlight from "./components/JoiasSpotlight";
import FeaturedPiece from "./components/FeaturedPiece";
import HowToBuy from "./components/HowToBuy";
import OtherLines from "./components/OtherLines";
import Story from "./components/Story";
import Instagram from "./components/Instagram";
import Magazine from "./components/Magazine";
import Contact from "./components/Contact";
import StoreMap from "./components/StoreMap";

/**
 * Jewellery leads and the page alternates ground: ivory catalogue, dark
 * editorial, ivory again. That cadence is what keeps ten sections from
 * reading as one long template.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <JoiasSpotlight />
      <FeaturedPiece />
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
