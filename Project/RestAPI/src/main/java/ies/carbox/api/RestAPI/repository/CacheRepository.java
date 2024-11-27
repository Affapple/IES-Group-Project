package ies.carbox.api.RestAPI.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;


import ies.carbox.api.RestAPI.entity.TripInfo;
// import ttl
/**
 * CacheRepository
 */
@Repository
public class CacheRepository {
    @Autowired
    RedisTemplate<String, String> redisTemplate;
    @Value("${cache.general.expiration-time}")
    private long ttl;


    // }
    // email do utilizador é a key {email} = "{ 1: {trip}, 2: {trip}}
    // o value é o json da trip
    // a trip vai ser outro json
    public void saveTrip(String email, TripInfo trip) {
        ObjectMapper mapper = new ObjectMapper();

        try {
            var json = mapper.writeValueAsString(trip);
            System.out.println(json);
            redisTemplate.opsForValue().set(email, json, ttl, TimeUnit.MILLISECONDS);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        // ttl de save trip por causa de cache
        // trip -> json
        // guardar na db {email} = {trip} com TTL
    }
    
    public void getTrips(String email) {
        // carregar da base de dados o json
                
        // json -> trip
    }

}