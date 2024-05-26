import "./App.css";
import HeroSection from "./components/Hero/HeroSection";
import { Link } from "react-router-dom";
import { useGeneral } from "./store";
import { useEffect, useState } from "react";
import CardGroup from "./components/Cards/CardGroup";
import HeroButton from "./components/buttons/HeroButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const slides = [
  {
    src: "/desktopimage2.jpg?url",
    altText: "Image of Tokyo at night",
    title: "Experience Tokyo",
    price: "1400 NOK / night",
    searchWord: "Tokyo",
  },
  {
    src: "/sydney.jpg?url",
    altText: "Image of Sydney at night",
    title: "Experience Sydney",
    price: "1800 NOK / night",
    searchWord: "Sydney",
  },
  {
    src: "/newyork.jpg?url",
    altText: "Image of New York at night",
    title: "Experience New York",
    price: "1700 NOK / night",
    searchWord: "New York",
  },
  {
    src: "/dubai.jpg?url",
    altText: "Image of Dubai at night",
    title: "Experience Dubai",
    price: "2100 NOK / night",
    searchWord: "Dubai",
  },
];
const europeCards = [
  {
    id: 1,
    searchWord: "England",
    src: "/england.jpg?url",
    altText: "Image of England",
  },
  {
    id: 2,
    searchWord: "Spain",
    src: "/spain2.jpg?url",
    altText: "Image of Spain",
  },
  {
    id: 3,
    searchWord: "Italy",
    src: "/mobileimage3.jpg?url",
    altText: "Image of Italy",
  },
];
const asiaCards = [
  {
    id: 1,
    searchWord: "Angkor Wat",
    src: "/cambodia.jpg?url",
    altText: "Image of angkor wat",
  },
  {
    id: 2,
    searchWord: "China",
    src: "/china.jpg?url",
    altText: "Image of the great wall of china",
  },
  {
    id: 3,
    searchWord: "Taj Mahal",
    src: "/india.jpg?url",
    altText: "Image of the taj mahal",
  },
];

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 859);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 859);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setTransparentHeader = useGeneral(
    (state) => state.setTransparentHeader
  );
  useEffect(() => {
    setTransparentHeader(true);
  }, [setTransparentHeader]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="flex flex-col flex-grow hero-main overflow-x-hidden">
      <HeroSection
        src={slides[currentSlide].src}
        altText={slides[currentSlide].altText}
        title={slides[currentSlide].title}
        price={slides[currentSlide].price}
        searchWord={slides[currentSlide].searchWord}
        nextSlide={nextSlide}
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full hero-page-max-width p-8 mt-12 bg-white ">
          <div className="text-content sm:px-8">
            <p className="poppins-extrabold text-sm tracking-widest font-blue-custom">
              EUROPE
            </p>
            <h2 className="text-2xl poppins-regular tracking-widest">
              The Gems of Europe
            </h2>
          </div>
          <CardGroup cards={europeCards} />
          <div className="text-content sm:px-8 pt-6">
            <p className="poppins-extrabold text-sm tracking-widest font-blue-custom">
              ASIA
            </p>
            <h2 className="text-2xl poppins-regular tracking-widest">
              The Asian Wonders
            </h2>
          </div>
          <CardGroup cards={asiaCards} />
        </div>
        <div className="flex flex-col hero-section-image relative w-full min-w-screen min-h-2">
          <div className="hero-text container absolute text-white left-0">
            <h1 className="text-4xl poppins-bold text-white">Lake Como</h1>
            <p className="hero-text-price text-xl pt-sans-semibold text-white">
              1200 NOK /night
            </p>
            <HeroButton
              text="View"
              searchFor="Lake Como"
              classes="hero-btn-primary text-sm poppins-semibold flex items-center justify-between"
            />
          </div>
          <div className="hero-image-container-smaller relative ">
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
            <img
              src="/desktopimage4.jpg?url"
              alt="Image of lake como in Italy"
              className="w-full object-cover hero-image-smaller"
            />
          </div>
        </div>
        <div
          className={`flex flex-col information-section w-full hero-page-max-width p-8 mb-12 mt-12 bg-white ${
            isMobile ? "gap-4" : ""
          }`}
        >
          <div className="image-information-section sm:px-8 sm:flex-row flex-row flex">
            <div
              className={`text-content px-4 flex flex-col justify-center ${
                isMobile ? "w-full" : "w-1/2"
              } `}
            >
              <h2 className="text-2xl font-blue-custom poppins-bold tracking-widest">
                Why use Holidaze?
              </h2>
              <p className="pt-sans-regular  pt-2 ">
                Every venue owner on Holidaze goes through a meticulous
                verification process to ensure that each venue is up to industry
                standards. This way, we ensure that you as a customer, get
                exactly what you ask for.
              </p>
              <button className="btn-secondary mt-2 flex justify-end items-end ml-auto">
                Read more
                <ArrowForwardIcon />
              </button>
            </div>
            {!isMobile && (
              <div className="image-container sm:w-1/2">
                <img
                  src="/desktopimage3.jpg?url"
                  alt="Image of a desert with a person walking in the distance"
                  className="w-full object-cover rounded-r-5xl"
                />
              </div>
            )}
          </div>
          <div className="image-information-section sm:px-8 sm:flex-row flex-row flex">
            {!isMobile && (
              <div className="image-container sm:w-1/2">
                <img
                  src="/italy.jpg?url"
                  alt=""
                  className="w-full object-cover rounded-l-5xl"
                />
              </div>
            )}
            <div
              className={`text-content px-4 flex flex-col justify-center ${
                isMobile ? "w-full" : "w-1/2"
              } `}
            >
              <h2
                className={`text-2xl font-blue-custom poppins-bold tracking-widest ${
                  isMobile ? "" : "ml-8"
                }`}
              >
                Cancellation policy
              </h2>
              <p className={`pt-sans-regular pt-2 ${isMobile ? "" : "ml-8"}`}>
                If an unforeseen event makes it impossible for you to reach your
                destination, Holidaze offers you free cancellation as long as
                the cancellation happens 24 hours before check in.
              </p>
              <button className="btn-secondary mt-2 flex justify-end items-end ml-auto">
                Read more
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
          <div className="image-information-section sm:px-8 sm:flex-row flex-row flex">
            <div
              className={`text-content px-4 flex flex-col justify-center ${
                isMobile ? "w-full" : "w-1/2"
              } `}
            >
              <h2 className="text-2xl font-blue-custom poppins-bold tracking-widest">
                Rent out your home
              </h2>
              <p className="pt-sans-regular  pt-2 ">
                Even as a venue owner you get great perks by using us. We will
                not only provide you with high quality guests, but also ensure
                that the guests pay in advance and pay a deposit in case of
                issues.
              </p>
              <Link
                to="register"
                className="btn-secondary mt-2 flex justify-end items-end ml-auto"
              >
                Create account
                <ArrowForwardIcon />
              </Link>
            </div>
            {!isMobile && (
              <div className="image-container sm:w-1/2">
                <img
                  src="/desktopimage3.jpg?url"
                  alt="Image of a desert with a person walking in the distance"
                  className="w-full object-cover rounded-r-5xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
