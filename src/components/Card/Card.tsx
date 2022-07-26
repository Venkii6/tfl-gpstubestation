import { formatDate } from "../../ultils/formatDate";
import { Arrivals } from "../../types/Applevel.types";
import "./Card.css";

const Card = ({ currentLocation, destination, expectedArrival }: Arrivals) => {
  return (
    <>
      <div className="card-wrapper">
        <li>
          Current Location:{" "}
          {currentLocation
            ? currentLocation.split(" ").splice(0, 4).join(" ")
            : "Not Available"}
        </li>

        <li>
          Expected Arrival:{" "}
          {expectedArrival ? formatDate(expectedArrival) : "Not Available"}
        </li>

        <li>
          Destination Station:{" "}
          {destination ? destination.split(" ")[0] : "Not Available"}
        </li>
      </div>
    </>
  );
};

export default Card;
