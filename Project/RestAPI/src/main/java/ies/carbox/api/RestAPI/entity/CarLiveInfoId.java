package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CarLiveInfoId {
    /** ID of the car associated with live info */
    String carId;

    /** Id of the trip whose this live info belongs */
    String tripId;

    /** Start date of the trip */
    Date tripDate;
}
