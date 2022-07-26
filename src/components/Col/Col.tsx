import Card from "../Card/Card";
import { ArrivalInfoItem } from "../../types/Applevel.types";
import "./Col.css";

export interface ArrivalInfo {
  arrivalsData: ArrivalInfoItem[];
}

const Col = ({ arrivalsData }: ArrivalInfo) => {
  return (
    <ul className="col-container">
      {arrivalsData &&
        arrivalsData?.length &&
        arrivalsData?.map(
          (
            { currentLocation, destinationName, expectedArrival, platformName },
            idx
          ) => {
            return (
              <Card
                key={`${currentLocation}${expectedArrival}${destinationName}${idx}`}
                currentLocation={currentLocation}
                destination={destinationName}
                expectedArrival={expectedArrival}
                platForm={platformName}
              />
            );
          }
        )}
    </ul>
  );
};

export default Col;
