export default interface LiveData {
  abs: boolean;
  batteryCharge: number;
  carStatus: boolean;
  carId: string;
  timestamp: string;
  speed: number;
  rpm: number;
  oilLevel: number;
  gasLevel: number;
  location: string;
  motorTemperature: number;
  tirePressure: number[];
  errors: string[];
  torque: number;
  tripId: number;
}
