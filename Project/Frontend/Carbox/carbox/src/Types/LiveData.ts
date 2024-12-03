export default interface LiveData {
    car_id: string;
    timestamp: Date;
    car_status: boolean;
    speed: number;
    rpm: number;
    oil_level: number;
    battery_charge: number;
    gas_level: number;
    location: string;
    motor_temperature: number;
    tirePressure: number[];
    errors: string[];
    abs: boolean;
    torque: number;
    trip_id: number;
}
