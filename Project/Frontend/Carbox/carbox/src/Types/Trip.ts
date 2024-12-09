export default interface Trip {
  carId: string;
  tripId: number;
  trip_start: string;
  trip_end: string;
  trip_motor_temp: number[];
  trip_rpm: number[];
  trip_speeds: number[];
  trip_torque: number[];
}
