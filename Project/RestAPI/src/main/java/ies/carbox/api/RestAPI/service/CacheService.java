package ies.carbox.api.RestAPI.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class CacheService<T> {
    @Value("${security.jwt.expiration-time}")
    private Long TokenTTL;

    @Value("${cache.general.expiration-time}")
    private Long generalTTL;

    public void saveToken(T token) {
      /* Saves the token in the cache following the schema:
       * {token} = {
       *      user : {username, email},
       *      trips : {...}, // TODO
       *      live_trip_data : { ... }, // TODO
       *  }
       */
    }

    public void loadUser(T token) {

    }
}
