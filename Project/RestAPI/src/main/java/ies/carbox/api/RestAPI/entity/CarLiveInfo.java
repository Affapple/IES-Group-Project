package ies.carbox.api.RestAPI.entity;

import lombok.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/*
 * Car life info data:
 * car_ID: String
 * Timestamp: date_time (bsontimestamp)
 *
 * year: Integer
 * licensePlate: String
 * owner: User
 */

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_car_live_info")
public class CarLiveInfo {

}
