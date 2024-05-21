import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVenues, useGeneral, useProfiles, useErrors } from "../store";

export const useErrorVenues = () => {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const { error } = useVenues((state) => ({
    error: state.error,
  }));

  useEffect(() => {
    if (error) {
      setError(error);
      navigate("/error");
    }
  }, [error, navigate]);
};
export const useErrorGeneral = () => {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const { error } = useGeneral((state) => ({
    error: state.error,
  }));

  useEffect(() => {
    if (error) {
      setError(error);
      navigate("/error");
    }
  }, [error, navigate]);
};
export const useErrorProfiles = () => {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const { error } = useProfiles((state) => ({
    error: state.error,
  }));

  useEffect(() => {
    if (error) {
      setError(error);
      navigate("/error");
    }
  }, [error, navigate]);
};
