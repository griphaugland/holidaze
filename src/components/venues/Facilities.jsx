import React from "react";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import TimeToLeaveOutlinedIcon from "@mui/icons-material/TimeToLeaveOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function Facilities({ venue }) {
  return (
    <div className="facilities-overview flex-wrap flex gap-3">
      <div
        title={`Accomodation for up to ${venue.maxGuests} people`}
        className="flex items-start p-4 flex-col justify-center gap-1"
      >
        <p className="text-black">
          <BedOutlinedIcon />
        </p>
        <p className="font-regular text-center w-full">{venue.maxGuests}</p>
      </div>
      {venue.meta.breakfast ? (
        <div
          title="Breakfast included"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <BakeryDiningOutlinedIcon className="text-black" />
          <DoneOutlineOutlinedIcon className="text-green-500" />
        </div>
      ) : (
        <div
          title="Breakfast not included"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <BakeryDiningOutlinedIcon className="text-gray-300" />
          <ClearOutlinedIcon className="text-gray-300" />
        </div>
      )}

      {venue.meta.wifi ? (
        <div
          title="Wifi included"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <WifiOutlinedIcon className="text-black" />
          <DoneOutlineOutlinedIcon className="text-green-500" />
        </div>
      ) : (
        <div
          title="Wifi not included"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <WifiOutlinedIcon className="text-gray-300" />
          <ClearOutlinedIcon className="text-gray-300" />
        </div>
      )}
      {venue.meta.parking ? (
        <div
          title="Parking included"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <TimeToLeaveOutlinedIcon className="text-black" />
          <DoneOutlineOutlinedIcon className="text-green-500" />
        </div>
      ) : (
        <div
          title="Parking not included"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <TimeToLeaveOutlinedIcon className="text-gray-300" />
          <ClearOutlinedIcon className="text-gray-300" />
        </div>
      )}

      {venue.meta.pets ? (
        <div
          title="Pets allowed"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <PetsOutlinedIcon className="text-black" />
          <DoneOutlineOutlinedIcon className="text-green-500" />
        </div>
      ) : (
        <div
          title="Pets not allowed"
          className="flex items-start p-4 flex-col justify-center gap-1"
        >
          <PetsOutlinedIcon className="text-gray-300" />
          <ClearOutlinedIcon className="text-gray-300" />
        </div>
      )}
    </div>
  );
}

export default Facilities;
