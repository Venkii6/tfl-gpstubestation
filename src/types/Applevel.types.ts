export interface ArrivalInfoItem {
  $type?: string;
  bearing?: string;
  currentLocation?: string;
  destinationName?: string;
  destinationNaptanId?: string;
  direction?: string;
  expectedArrival: string;
  id?: string;
  lineId?: string;
  lineName?: string;
  modeName?: string;
  naptanId?: string;
  operationType?: number;
  platformName: string;
  stationName?: string;
  timeToLive?: string;
  timeToStation?: number;
  timestamp?: string;
  timing?: any;
  towards?: string;
  vehicleId?: string;
}

export interface TrainDetails {
  [key: string]: ArrivalInfoItem[];
}
