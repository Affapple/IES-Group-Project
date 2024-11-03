package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
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
    /** Unique Identifiers of the Trip  */
    @Id
    TripInfoId tripInfoId;

    /** Trip Start Date */
    Date Trip_start;

    /** Trip End Date */
    Date Trip_end;
}
