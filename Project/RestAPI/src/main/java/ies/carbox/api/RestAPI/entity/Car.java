package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import ies.carbox.api.RestAPI.validation.YearRange;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a car entity in the system.
 *
 * <p>This entity contains all the information related to a car, including its
 * brand, model, year, license plate, and the owner of the car.</p>
 *
 * <p>Car data attributes:</p>
 * <ul>
 *     <li><b>id</b>: Unique identifier for the car.</li>
 *     <li><b>brand</b>: Brand of the car (e.g., Toyota, Ford).</li>
 *     <li><b>model</b>: Model of the car (e.g., Corolla, Focus).</li>
 *     <li><b>year</b>: Year of manufacture, validated by {@link YearRange}.</li>
 *     <li><b>licensePlate</b>: License plate number of the car.</li>
 *     <li><b>owner</b>: The user who owns the car, represented by the {@link User} entity.</li>
 * </ul>
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Document(collection = "Cars")
public class Car {

    /** Unique identifier for the car. */
    @Id
    @Column(nullable = false, name="ecu_id")
    private String ecuId;

    /** Brand of the car (e.g., Toyota, Ford). */
    @Column(nullable = false, name = "brand")
    @NotBlank(message = "Brand is required")
    private String brand;

    /** Model of the car (e.g., Corolla, Focus). */
    @Column(nullable = false, name = "model")
    @NotBlank(message = "Model is required")
    private String model;

    /** Year of manufacture, validated by {@link YearRange}. */
    @Column(nullable = false, name = "year")
    @YearRange
    private Integer year;

    /** License plate number of the car. */
    @Column(nullable = false, name = "license_plate")
    @NotBlank(message = "License plate is required")
    private String licensePlate;

    /** The user who owns the car. */
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @NotNull(message = "Owner is required")
    private User owner;

    @Column(nullable = true, name="last_revision")
    private Date lastRevision;

    @Column(nullable = false, name = "tires")
    private String tires;

    @Column(nullable = false, name = "motor")
    private String motor;


    @Column(nullable = false, name = "tank")
    private String tank;

    @Column(nullable = false, name = "max_speed")
    private Float maxSpeed;

    @Column(nullable = false, name = "horsepower")
    private Integer horsepower;

    @Column(nullable = false, name = "autonomy")
    private Float autonomy;


    private String location;
    private boolean carStatus;

    /**
     * Returns a string representation of the car.
     *
     * @return A string containing the car's id, brand, model, year, license plate, and owner.
     */
    @Override
    public String toString() {
        return "Car [ecuId=" + ecuId + ", brand=" + brand + ", model=" + model + ", year=" + year +
               ", licensePlate=" + licensePlate + ", owner=" + owner + "]";
    }

}
