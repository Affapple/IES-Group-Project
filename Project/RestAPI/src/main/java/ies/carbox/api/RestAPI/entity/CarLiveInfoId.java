package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class CarLiveInfoId {
    String carId;
    String tripId;
    Date tripDate;
}
