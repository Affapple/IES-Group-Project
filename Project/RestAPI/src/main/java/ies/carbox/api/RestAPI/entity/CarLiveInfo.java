package ies.carbox.api.RestAPI.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents live information about a car during a trip.
 *
 * <p>The unique identifier for this entity is represented by the embedded ID {@link CarLiveInfoId}.
 * This entity includes various attributes related to the car's status and performance.</p>
 *
 * <p>Attributes:</p>
 * <ul>
 * <li>Car Status: Indicates if the car is operational.</li>
 * <li>Oil Level: The current oil level in the car.</li>
 * <li>Battery Charge: The battery charge percentage.</li>
 * <li>Speed: The current speed of the car.</li>
 * <li>RPM: The current revolutions per minute of the engine.</li>
 * <li>Gas Level: The current gas level in the tank.</li>
 * <li>Location: The current geographical location of the car.</li>
 * <li>Motor Temperature: The current temperature of the car's engine.</li>
 * <li>ABS: Indicates whether the anti-lock braking system is active.</li>
 * <li>Torque: The current torque output of the engine.</li>
 * <li>Tire Pressure: The current pressure of the tires.</li>
 * <li>Errors: A list of error messages related to the car's performance.</li>
 * </ul>
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "CarLiveInfos")
public class CarLiveInfo {

    /** Unique identifier of the vehicle */
    @Id
    private CarLiveInfoId carLiveInfoId;

    /** Current status of the vehicle (true: on; false: off) */
    @Column(name = "car_status")
    private boolean carStatus;

    /** Current oil leve */
    @Column(name = "oil_level")
    private float oilLevel;

    /** Current battery charge */
    @Column(name = "battery_charge")
    private float batteryCharge;

    /** Current car speed */
    @Column(name = "speed")
    private float speed;

    /** Current car motor rpm */
    @Column(name = "rpm")
    private int rpm;

    /** Current car gas level (in liters) */
    @Column(name = "gas_level")
    private float gasLevel;

    /** Current car location */
    @Column(name = "location")
    private String location;

    /** Current motor temperature */
    @Column(name = "motor_temperature")
    private float motorTemperature;

    /** Current status of the abs (true: activated; false: deactivated) */
    @Column(name = "abs")
    private boolean abs;

    /** Current torque produced by the motor */
    @Column(name = "torque")
    private float torque;

    /** Current tire pressures */
    @Column(name = "tire_pressure")
    private Pressure tirePressure;

    /** List of car users */
    @ElementCollection
    @CollectionTable(name = "car_errors", joinColumns = @JoinColumn(name = "car_id")) // Adjust the join column as needed
    @Column(name = "error_message") // Column name in the collection table
    private List<String> errors;
}
