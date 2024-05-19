import "./App.css";
import HeroSection from "./components/Hero/HeroSection";
import { useVenues } from "./store";
import desktopImage from "/desktopimage2.jpg?url";
import { useEffect } from "react";

function App() {
  const { loading, setLoading, apiKey, setApiKey } = useVenues();
  const createApiKey = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/auth/create-api-key`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create API Key. Please try again");
      }
      const result = await response.json();
      console.log(result);
      setApiKey(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (apiKey === null) {
      createApiKey();
    } else if (apiKey) {
      if (apiKey.data.status !== "ACTIVE") {
        createApiKey();
      } else {
        console.log("API key is active");
      }
    }
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
