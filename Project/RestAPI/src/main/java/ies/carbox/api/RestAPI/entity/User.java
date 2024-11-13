package ies.carbox.api.RestAPI.entity;

import lombok.*;

import java.util.Collection;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.data.annotation.Id;
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
public class User implements UserDetails {

    @Id
    @Field("_id")
    @Getter @Setter
    private String _id;

    /** Unique identifier for the user. */
    @Field("email")
    @Getter @Setter
    private String email;
    public String getUsername(){ return email; }

    /** Username of the user, which must be unique. */
    @Field("username")
    private String username;
    public String getName() { return username; }
    public void setName(String name) { username = name; }

    /** Encrypted password of the user. */
    @Field("password")
    @Getter @Setter
    private String password;

    /** List of cars owned by the user */
    @Field("carsList")
    @Getter @Setter
    private List<String> carsList;

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
        return "User [email=" + email + ", password=***** , username=" + username + ", carlist=" + carsList + "]";
    }

    /**
    */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public int hashCode() {
        return toString().hashCode();
    }
}
