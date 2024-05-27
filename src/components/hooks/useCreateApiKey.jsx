import { useState } from "react";
import { useGeneral } from "../../store";

const useCreateApiKey = () => {
  const { setApiKey, setLoading } = useGeneral();
  const [error, setError] = useState(null);

  const createApiKey = async (accessToken) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/auth/create-api-key`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: "apiKey",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create API Key. Please try again");
      }

      const result = await response.json();
      console.log("API Key creation result:", result);
      setApiKey(result);
      const storage = JSON.parse(localStorage.getItem("storage")) || {};
      storage.apiKey = result;
      localStorage.setItem("storage", JSON.stringify(storage));
    } catch (error) {
      console.error("Error creating API Key:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createApiKey, error };
};

export default useCreateApiKey;
