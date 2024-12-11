package ies.carbox.api.RestAPI.dtos;

import java.util.List;

import ies.carbox.api.RestAPI.entity.Role;
import jakarta.persistence.Tuple;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    private String email;
    private String username;
    private String password;
    private int phone;
    private List<List<String>> carsList;
    private Role role;
}
