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

    @EmbeddedId
    private CarLiveInfoId id;

    @Column(name = "car_status")
    private boolean carStatus;

    @Column(name = "oil_level")
    private float oilLevel;

    @Column(name = "battery_charge")
    private float batteryCharge;

    private float speed;

    private int rpm;

    @Column(name = "gas_level")
    private float gasLevel;

    private String location;

    @Column(name = "motor_temperature")
    private float motorTemperature;

    private boolean abs;

    private float torque;

    @Column(name = "tire_pressure")
    private Float tirePressure;

    @ElementCollection
    @CollectionTable(name = "car_errors", joinColumns = @JoinColumn(name = "car_id")) // Adjust the join column as needed
    @Column(name = "error_message") // Column name in the collection table
    private List<String> errors;

    // You may want to include any necessary validation annotations
}
