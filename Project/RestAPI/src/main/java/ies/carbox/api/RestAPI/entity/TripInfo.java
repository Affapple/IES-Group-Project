package ies.carbox.api.RestAPI.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.*;
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
    @EmbeddedId
    TripInfoId tripId;
    Date Trip_start;
    Date Trip_end;
}
