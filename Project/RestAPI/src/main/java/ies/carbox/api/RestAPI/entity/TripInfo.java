package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.*;

/**
 * TripInfo
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "TripInfos")
public class TripInfo {
    /** Car Id */
    @Field("car_id")
    String carId;

    @Field("trip_id")
    /** Trip Id */
    String tripId;


    /** Trip Start Date */
    @Field("trip_start")
    Date Trip_start;

    @Field("trip_end")
    /** Trip End Date */
    Date Trip_end;
}
