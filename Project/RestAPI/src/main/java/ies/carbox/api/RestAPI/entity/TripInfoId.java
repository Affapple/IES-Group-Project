package ies.carbox.api.RestAPI.entity;

import jakarta.persistence.*;

@Embeddable
public class TripInfoId {
    String carId;
    String tripId;
}
