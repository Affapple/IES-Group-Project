package ies.carbox.api.RestAPI.entity;

import ies.carbox.api.RestAPI.validation.YearRange;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



/*
 * Car data:
 * id: Long
 * brand: String
 * model: String
 * year: Integer
 * licensePlate: String
 * owner: User
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity
@Table(name = "tbl_cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "brand")
    @NotBlank(message = "Brand is required")
    private String brand;

    @Column(nullable = false, name = "model")
    @NotBlank(message = "Model is required")
    private String model;

    @Column(nullable = false, name = "year")
    @YearRange   // Did our own custom validation
    private Integer year;

    @Column(nullable = false, name = "license_plate")
    @NotBlank(message = "License plate is required")
    private String licensePlate;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @NotNull(message = "Owner is required")
    private User owner;

    @Override
    public String toString() {
        return "Car [id=" + id + ", brand=" + brand + ", model=" + model + ", year=" + year +
               ", licensePlate=" + licensePlate + ", owner=" + owner + "]";
    }
}
