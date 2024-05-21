import React from "react";
import ReactCalendar from "react-calendar";

function Booking() {
  return (
    <div className="">
      <ReactCalendar
        minDate={new Date()}
        className="react-calendar p-2 pt-8"
        view="month"
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
}

export default Booking;
