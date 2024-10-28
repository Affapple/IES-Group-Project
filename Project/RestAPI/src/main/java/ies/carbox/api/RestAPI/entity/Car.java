package ies.carbox.api.RestAPI.entity;



import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.validation.YearRange;
import java.util.Date;



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
@Entity
@Table(name = "tbl_cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Column(nullable = false, name = "brand")
    @NotBlank(message = "Brand is required")
    @Getter @Setter
    private String brand;

    @Column(nullable = false, name = "model")
    @NotBlank(message = "Model is required")
    @Getter @Setter
    private String model;

    @Column(nullable = false, name = "year")
    @YearRange   // Did our own custom validation
    @Getter @Setter
    private Integer year;

    @Column(nullable = false, name = "license_plate")
    @NotBlank(message = "License plate is required")
    @Getter @Setter
    private String licensePlate;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @NotNull(message = "Owner is required")
    @Getter @Setter
    private User owner;

    @Override
    public String toString() {
        return "Car [id=" + id + ", brand=" + brand + ", model=" + model + ", year=" + year +
               ", licensePlate=" + licensePlate + ", owner=" + owner + "]";
    }
}