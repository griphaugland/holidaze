import "../../css/components/skeleton.css";

function SingleVenueSkeletonLoader() {
  return (
    <div className="page-max-width md:self-start xl:self-center flex flex-wrap">
      <div className="relative align-top-header">
        <div className="single-venue-skeleton-container flex sm:flex-col flex-row">
          <div className="relative bg-black bg-opacity-20">
            <div className="single-venue-skeleton-image min-h-96 single-venue-slider-image"></div>
            <div className="single-venue-skeleton-image-flicker absolute"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVenueSkeletonLoader;
