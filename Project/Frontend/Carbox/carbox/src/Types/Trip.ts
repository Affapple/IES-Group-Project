export default interface Trip {
    car_id: string,
    trip_id: number,
    trip_start: Date,
    trip_end: Date,
    trip_motor_temp: number[],
    trip_rpm: number[],
    trip_speeds: number[],
    trip_torque: number[],
}