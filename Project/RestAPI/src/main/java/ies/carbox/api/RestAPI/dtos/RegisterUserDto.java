package ies.carbox.api.RestAPI.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    private String email;
    
    private String password;
    
    private String fullName;
}