import "./App.css";
import HeroSection from "./components/Hero/HeroSection";
import { useGeneral } from "./store";
import desktopImage from "/desktopimage2.jpg?url";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const setTransparentHeader = useGeneral(
    (state) => state.setTransparentHeader
  );

  useEffect(() => {
    setTransparentHeader(true);
  }, [setTransparentHeader]);

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
