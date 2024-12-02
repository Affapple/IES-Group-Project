package ies.carbox.api.RestAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;

import ies.carbox.api.RestAPI.entity.Car;
import ies.carbox.api.RestAPI.entity.CarLiveInfo;
import ies.carbox.api.RestAPI.entity.TripInfo;
import ies.carbox.api.RestAPI.entity.User;

/**
 * CacheRepository
 */
@Service
public class CacheService {
    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @Value("${cache.general.expiration-time}")
    private long ttl;

    private static String tripKey = "_trips";
    private static String liveDataKey = "_livedata";
    
    public void saveTrip(TripInfo trip, String carId) {
        ObjectMapper mapper = new ObjectMapper();
        String key = carId + tripKey;
        boolean setExpire = !redisTemplate.hasKey(key);

        try {
            var json = mapper.writeValueAsString(trip);
            System.out.println("INFO: Saving trip from car \"" + carId + "\": " + json);
            redisTemplate.opsForList().rightPush(key, json);
            
            if (setExpire)
                redisTemplate.expire(key, ttl, TimeUnit.MILLISECONDS);

        } catch (JsonProcessingException e) {
            System.out.println("ERROR: Error saving car trip to cache");
            e.printStackTrace();
        }
    }
    public void saveTrip(List<TripInfo> trips, String carId) {
        trips.forEach((trip) -> saveTrip(trip, carId));
    }
    public List<TripInfo> getCarTrips(String carId) {
        ObjectMapper mapper = new ObjectMapper();
        String key = carId + tripKey;

        try {
            List<String> tripsJson = redisTemplate.opsForList().range(key, 0, -1);

            List<TripInfo> trips = new ArrayList<>();
            if (tripsJson == null) {
                System.out.println("INFO: Trips fetched from cache was null (key = " + key + ")");
                return trips;
            }

            for (String trip : tripsJson) {
                trips.add(
                    mapper.readValue(trip, TripInfo.class)
                );
            }

            System.out.println("Fetched trips from cache (key = " + key + ")");
            trips.forEach(System.out::println);
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
            System.err.println("DEBUG: User= " + user);
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
            System.out.println("INFO: Fetched user from cache using key \"" + key + "\": " + user);
            return user;
        } catch (Exception e) {
            System.out.println("ERROR: Error fetching user from cache");
            e.printStackTrace();
            return null;
        }
    }
    public void deleteUser(String email) {
        String key = email;
        redisTemplate.delete(key);
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

            System.out.println("Fetched live data from cache (key = " + key + ")");
            liveData.forEach(System.out::println);

            return liveData;
        } catch (Exception e) {
            System.out.println("ERROR: Error fetching user live data from cache");
            e.printStackTrace();
            return null;
        }
    }
    
    
    public void saveCar(Car car) {
        ObjectMapper mapper = new ObjectMapper();
        String key = car.getEcuId();
        
        try {
            var json = mapper.writeValueAsString(car);
            System.out.println("INFO: Saving Car:" + json);
            redisTemplate.opsForValue().set(key, json);
            redisTemplate.expire(key, ttl, TimeUnit.MILLISECONDS);
        } catch (JsonProcessingException e) {
            System.out.println("ERROR: Error saving car to cache");
            e.printStackTrace();
        }
    }
    public Car getCar(String ecuId) {
        ObjectMapper mapper = new ObjectMapper();
        String key = ecuId;

        try {
            String userJson = redisTemplate.opsForValue().get(key);
            Car car = mapper.readValue(userJson, Car.class);
            System.out.println("INFO: Fetched car from cache using key \"" + key + "\": " + car);
            return car;
        } catch (Exception e) {
            System.out.println("ERROR: Error fetching car from cache");
            e.printStackTrace();
            return null;
        }        
    }
}