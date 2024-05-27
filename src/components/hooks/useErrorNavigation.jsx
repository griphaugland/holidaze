import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVenues, useGeneral, useProfiles, useErrors } from "../../store";

export const useErrorVenues = () => {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const { error } = useVenues();

  useEffect(() => {
    if (error) {
      setError(error);
      console.log("Error:", error);

      navigate("/error");
    }
  }, [error, navigate, setError]);
};

export const useErrorGeneral = () => {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const { error } = useGeneral();

  useEffect(() => {
    if (error) {
      setError(error);
      console.log("Error:", error);
      navigate("/error");
    }
  }, [error, navigate, setError]);
};

export const useErrorProfiles = () => {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const { error } = useProfiles();

  useEffect(() => {
    if (error) {
      setError(error);
      console.log("Error:", error);
    }
  }, [error, navigate, setError]);
};
