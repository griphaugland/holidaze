import "./App.css";
import HeroSection from "./components/Hero/HeroSection";
import { useVenues } from "./store";
import desktopImage from "/desktopimage2.jpg?url";

function App() {
  const settransparentHeader = useVenues((state) => state.setTransparentHeader);
  settransparentHeader(true);
  return (
    <>
      <HeroSection
        src={desktopImage}
        title="Experience Tokyo"
        price="1200 NOK / night"
      />
    </>
  );
}

export default App;
