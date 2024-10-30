package ies.carbox.api.RestAPI.entity;


import jakarta.persistence.*;

@Embeddable
public class CarLiveInfoId {
    String car_id;
    String trip_id;
}