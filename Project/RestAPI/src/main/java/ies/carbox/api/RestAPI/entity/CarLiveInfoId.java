package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CarLiveInfoId {
    String carId;
    String tripId;
    Date tripDate;
}
