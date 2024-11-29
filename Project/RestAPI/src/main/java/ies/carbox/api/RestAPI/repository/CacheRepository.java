package ies.carbox.api.RestAPI.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.query.RedisOperationChain;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;

import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.User;

/**
 * CacheRepository
 */
@Repository
public class CacheRepository {
    @Autowired
    RedisTemplate<String, String> redisTemplate;
    @Value("${cache.general.expiration-time}")
    private long ttl;

    private static String tripKey = "_trips";
    private static String liveDataKey = "_livedata";

    
    public void saveTrip(TripInfo trip, String email) {
        ObjectMapper mapper = new ObjectMapper();
        String key = email + tripKey;
        boolean setExpire = !redisTemplate.hasKey(key);

        try {
            var json = mapper.writeValueAsString(trip);
            System.out.println("INFO: Saving trip from user \"" + email + "\": " + json);
            redisTemplate.opsForList().rightPush(key, json);

            if (setExpire)
                redisTemplate.expire(key, ttl, TimeUnit.MILLISECONDS);
        } catch (JsonProcessingException e) {
            System.out.println("ERROR: Error saving user trip to cache");
            e.printStackTrace();
        }
    }

    public void saveTrip(List<TripInfo> trips, String email) {
        trips.forEach((trip) -> saveTrip(trip, email));
    }

    public List<TripInfo> getUserTrips(String email) {
        ObjectMapper mapper = new ObjectMapper();
        String key = email + tripKey;

        try {
            List<String> tripsJson = redisTemplate.opsForList().range(key, 0, -1);

            List<TripInfo> trips = new ArrayList<>();
            if (tripsJson == null) {
                System.out.println("INFO: User trips fetched from cache was null (key = " + key + ")");
                return trips;
            }

            for (String trip : tripsJson) {
                trips.add(
                    mapper.readValue(trip, TripInfo.class)
                );
            }

            return trips;
        } catch (Exception e) {
            System.out.println("ERROR: Error fetching user trips from cache");
            e.printStackTrace();
            return null;
        }
    }

    public void saveUser(User user) {
        ObjectMapper mapper = new ObjectMapper();
        String key = user.getEmail();

        try {
            var json = mapper.writeValueAsString(user);
            System.out.println("INFO: Saving User:" + json);
            redisTemplate.opsForValue().set(key, json);
            redisTemplate.expire(key, ttl, TimeUnit.MILLISECONDS);
        } catch (JsonProcessingException e) {
            System.out.println("ERROR: Error saving user to cache");
            e.printStackTrace();
        }
    }

    public User getUser(String email) {
        ObjectMapper mapper = new ObjectMapper();
        String key = email;

        try {
            String userJson = redisTemplate.opsForValue().get(key);
            User user = mapper.readValue(userJson, User.class);
            return user;
        } catch (Exception e) {
            System.out.println("ERROR: Error fetching user from cache");
            e.printStackTrace();
            return null;
        }
    }

    public void saveLiveData(CarLiveInfo live_data, String email) {
        ObjectMapper mapper = new ObjectMapper();
        String key = email + liveDataKey;
        boolean setExpire = !redisTemplate.hasKey(key);

        try {
            var json = mapper.writeValueAsString(live_data);
            System.out.println("INFO: Saving live_data_point from user \"" + email + "\": " + json);
            redisTemplate.opsForList().rightPush(key, json);

            if (setExpire)
                redisTemplate.expire(key, ttl, TimeUnit.MILLISECONDS);
        } catch (JsonProcessingException e) {
            System.out.println("ERROR: Error saving live_data_point to cache");
            e.printStackTrace();
        }
    }

    public void saveLiveData(List<CarLiveInfo> live_datas, String email) {
        live_datas.forEach((live_data) -> saveLiveData(live_data, email));
    }

    public List<CarLiveInfo> getLiveData(String email) {
        ObjectMapper mapper = new ObjectMapper();
        String key = email + liveDataKey;

        try {
            List<String> liveDataJson = redisTemplate.opsForList().range(key, 0, -1);

            List<CarLiveInfo> liveData = new ArrayList<>();
            if (liveDataJson == null) {
                System.out.println("INFO: User live data fetched from cache was null (key = " + key + ")");
                return liveData;
            }

            for (String trip : liveDataJson) {
                liveData.add(
                    mapper.readValue(trip, CarLiveInfo.class)
                );
            }

            return liveData;
        } catch (Exception e) {
            System.out.println("ERROR: Error fetching user live data from cache");
            e.printStackTrace();
            return null;
        }
    }

    public void deleteUser(String email) {
        String key = email;
        redisTemplate.delete(key);
    }

}
