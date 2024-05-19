import "./App.css";
import HeroSection from "./components/Hero/HeroSection";
import { useVenues } from "./store";
import desktopImage from "/desktopimage2.jpg?url";
import { useEffect } from "react";

function App() {
  const { loading, setLoading, apiKey, setApiKey, user } = useVenues();

  useEffect(() => {
    window.scrollTo(0, 0);

  
  }, []);
  const setTransparentHeader = useVenues((state) => state.setTransparentHeader);

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
