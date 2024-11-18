package ies.carbox.api.RestAPI.token;

import lombok.*;

@Getter
@Setter
public class AuthToken {
    private String token;
    private long expiresIn;
}
