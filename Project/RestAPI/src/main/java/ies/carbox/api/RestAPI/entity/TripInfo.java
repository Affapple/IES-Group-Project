package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

/**
 * TripInfo
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "CarTrips")
public class TripInfo {
    @Id
    TripInfoId tripInfoId;
    @Column(name="trip_start")
    Date tripStart;
    @Column(name="trip_end")
    Date tripEnd;
}
