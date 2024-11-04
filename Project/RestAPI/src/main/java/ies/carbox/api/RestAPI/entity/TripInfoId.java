package ies.carbox.api.RestAPI.entity;

import jakarta.persistence.Column;

public class TripInfoId {
    @Column(name="car_id")
    String carId;
    @Column(name="trip_id")
    String tripId;
}
