import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Verticals from "./components/Verticals";
import Highlights from "./components/Highlights";
import Story from "./components/Story";
import Magazine from "./components/Magazine";
import Instagram from "./components/Instagram";
import Contact from "./components/Contact";
import StoreMap from "./components/StoreMap";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Verticals />
      <Highlights />
      <Story />
      <Magazine />
      <Instagram />
      <Contact />
      <StoreMap />
    </>
  );
}
