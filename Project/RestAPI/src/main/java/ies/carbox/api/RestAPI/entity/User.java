package ies.carbox.api.RestAPI.entity;

import lombok.*;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.*;

/**
 * Represents a user entity in the system.
 *
 * <p>This entity contains the information related to a user, including their
 * username and encrypted password.</p>
 *
 * <p>User data attributes:</p>
 * <ul>
 *     <li><b>id</b>: Unique identifier for the user.</li>
 *     <li><b>username</b>: Username of the user, which must be unique.</li>
 *     <li><b>password</b>: Encrypted password of the user.</li>
 * </ul>
 */
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Users")
public class User {

    /** Unique identifier for the user. */
    @Id
    @Column(name = "email")
    @Getter @Setter
    private String email;

    /** Username of the user, which must be unique. */
    @Column(nullable = false, name = "username")
    @Getter @Setter
    private String username;

    /** Encrypted password of the user. */
    @Column(nullable = false, name = "password")
    @Getter
    private String password;

    /** List of cars owned by the user */
    @Column(name="CarsList")
    @Getter @Setter
    private List<String> carsList;

    /**
     * Sets the user's password after encrypting it.
     *
     * <p>This method uses BCrypt to encode the provided plain text password
     * before storing it in the entity. It ensures that the password is not
     * stored in plain text for security reasons.</p>
     *
     * @param password The plain text password to be encrypted and set.
     */
    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password);
    }

    /**
     * Returns a string representation of the user.
     *
     * <p>This representation includes the user's ID, username, and a masked
     * password to protect sensitive information.</p>
     *
     * @return A string containing the user's ID, masked password, and username.
     */
    @Override
    public String toString() {
        return "User [email=" + email + ", password= *********, username=" + username + "]";
    }
}
