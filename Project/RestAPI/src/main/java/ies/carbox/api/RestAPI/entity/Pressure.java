package ies.carbox.api.RestAPI.entity;

import jakarta.persistence.Column;
import lombok.*;


@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
/**
 * Pressure
 *  Represents the tire pressure's of the car (in psi)
 */
public class Pressure {
    /** Front Left tire pressure (in psi) */
    @Column(name = "front_left")
    private float frontLeft;

    /** Front Right tire pressure (in psi) */
    @Column(name = "front_right")
    private float frontRight;

    /** Back Left tire pressure (in psi) */
    @Column(name = "back_left")
    private float backLeft;

    /** Back Right tire pressure (in psi) */
    @Column(name = "back_right")
    private float backRight;

}

