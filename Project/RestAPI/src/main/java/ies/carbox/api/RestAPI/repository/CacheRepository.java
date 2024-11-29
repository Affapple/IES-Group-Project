package ies.carbox.api.RestAPI.repository;

import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableRedisRepositories
public interface CacheRepository extends KeyValueRepository<String, String> {
    // Custom queries for Redis
}
