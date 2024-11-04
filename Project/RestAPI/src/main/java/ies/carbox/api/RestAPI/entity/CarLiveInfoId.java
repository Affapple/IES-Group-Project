package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CarLiveInfoId {
    /** ID of the car associated with live info */
    @Column(name="car_id")
    String carId;

    /** Id of the trip whose this live info belongs */
    @Column(name="trip_id")
    String tripId;

    /** Timestamp of the data */
    @Column(name="timestamp")
    Date timestamp;
}
