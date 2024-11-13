package ies.carbox.api.RestAPI.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ies.carbox.api.RestAPI.entity.User;
import ies.carbox.api.RestAPI.repository.UserRepository;

/**
 * userService
 */
/*
 * TODO: Dar update para retornar tudo UserDetails
 */
@Service
public class UserService implements UserDetailsService {
    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // ! Maybe correct this later to be email and not username
    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
     }

    public List<String> getListOfEcuIds(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));
        return user.getCarsList();
    }

    public void removeUserCar(String userEmail, String carId) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow( () -> new IllegalArgumentException(
           String.format("User with userId=\"%s\" not found", userEmail)
        ));

        userRepository.delete(user);
        List<String> carList = user.getCarsList();
        carList.remove(carId);
        userRepository.save(user);
    }

    public User createAccount(User user) throws Exception {
        if (userRepository.findByUsername(user.getName()).isPresent()) {
            throw new Exception("Username already exists");
        }
        return userRepository.save(user);
    }

   //  @Autowired
    // private BCryptPasswordEncoder passwordEncoder;

    public String login(String username, String password) throws Exception {
        // Optional<User> userOptional = userRepository.findByUsername(username);
        // if (userOptional.isPresent()) {
        //     User user = userOptional.get();
        //     if (passwordEncoder.matches(password, user.getPassword())) {
        //         return jwtUtil.generateToken(user); // TODO: Create a jwtUtil class
        //     }
        // }
        // throw new Exception("Invalid username or password");
        return null;
    }

    public User updateAccount(User updatedUser) throws Exception {
        /* TODO: - Mail tem de ser obtido de outra forma */
        /*       - Encontrar maneira de dar update só ao que é mudado */
        Optional<User> existingUser = userRepository.findByEmail(updatedUser.getEmail()); // The email corresponds to the user's ID
        if (existingUser.isPresent()) {
            userRepository.delete(existingUser.get());
            return userRepository.save(updatedUser);
        }
        throw new Exception("User not found");
    }

    public Optional<User> getAccount(String userEmail) {
        return userRepository.findById(userEmail);
        // TODO: Maybe here we have to retrieve more data? Or do we do that somewhere else
    }
}
