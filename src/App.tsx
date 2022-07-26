import { useEffect, useState } from "react";
import Col from "./components/Col/Col";
import {
  APP_HEADER,
  ARRIVALS,
  SERVICE_UNAVAILABLE,
  LOADING,
  GREAT_PORTLAND_STREET_ARRIVALS_URL,
} from "./ultils/const";
import { ArrivalInfoItem, TrainDetails } from "./types/Applevel.types";
import "./App.css";

function App() {
  const [arriavalsData, setArriavalsData] = useState<Array<ArrivalInfoItem>>(
    []
  );
  const [error, setError] = useState<String>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [listOfTrains, setListOfTrains] = useState<TrainDetails>({});

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GREAT_PORTLAND_STREET_ARRIVALS_URL);
      const arrivalsInfo = await response.json();
      setLoading(false);
      setArriavalsData([...arrivalsInfo]);
    } catch (err) {
      setError(SERVICE_UNAVAILABLE);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    const refershData = setInterval(() => {
      getData();
    }, 120000);
    return () => {
      clearInterval(refershData);
    };
  }, []);

  useEffect(() => {
    if (arriavalsData.length) {
      const obj: TrainDetails = {};
      arriavalsData.forEach((infoItem: ArrivalInfoItem) => {
        if (!obj[infoItem.platformName]) {
          obj[infoItem.platformName] = [infoItem];
        } else {
          obj[infoItem.platformName].push(infoItem);
        }
      });
      Object.keys(obj).length > 0 &&
        Object.keys(obj).forEach((localPlatform: string) => {
          const localItem = obj[localPlatform];
          const sortedItem = localItem.sort(
            (a: ArrivalInfoItem, b: ArrivalInfoItem) => {
              return (
                Date.parse(a.expectedArrival) - Date.parse(b.expectedArrival)
              );
            }
          );
          obj[localPlatform] = sortedItem;
        });
      setListOfTrains(obj);
    }
  }, [arriavalsData]);

  return (
    <>
      <div className="App">
        <header>
          <h1 className="app-header">{APP_HEADER}</h1>
        </header>
        <section>
          <>
            <h3 className="arrivals-subHeading">
              {Object.keys(listOfTrains).length > 0 && !error && ARRIVALS}
            </h3>
          </>
        </section>
        <section>
          {loading && <h1 className="loading-state">{LOADING}</h1>}
          {!loading && !error && (
            <div className="arrival-list-container">
              <>
                {Object.keys(listOfTrains).length > 0 &&
                  Object.keys(listOfTrains).map((platformName: string) => {
                    const localItem = listOfTrains[platformName];
                    return (
                      <div className="col-divider">
                        <h3 className="platform-heading">
                          Platform: {platformName}
                        </h3>
                        <Col arrivalsData={localItem} />
                      </div>
                    );
                  })}
              </>
            </div>
          )}
          {!loading && error && <h1 className="api-error">{error}</h1>}
        </section>
      </div>
    </>
  );
}

export default App;
