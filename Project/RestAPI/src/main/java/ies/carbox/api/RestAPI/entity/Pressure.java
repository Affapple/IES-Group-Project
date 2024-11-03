package ies.carbox.api.RestAPI.entity;

import jakarta.persistence.Column;
import lombok.*;


@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pressure {

    @Column(name = "front_left")
    private float frontLeft;

    @Column(name = "front_right")
    private float frontRight;

    @Column(name = "back_left")
    private float backLeft;

    @Column(name = "back_right")
    private float backRight;

}

