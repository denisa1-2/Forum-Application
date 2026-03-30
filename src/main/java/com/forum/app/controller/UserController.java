package com.forum.app.controller;

import com.forum.app.entity.User;
import com.forum.app.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private Long getLoggedUserId(HttpSession session) {
        Object userId = session.getAttribute("loggedUserId");

        if (userId == null) {
            throw new RuntimeException("No user is logged in");
        }

        return (Long) userId;
    }

    @GetMapping
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public User getCurrentUser(HttpSession session) {
        Long userId = getLoggedUserId(session);
        return userService.getUserById(userId);
    }

    @PutMapping("/me")
    public User updateCurrentUser(@RequestParam String username, @RequestParam String email,  HttpSession session) {
        Long userId = getLoggedUserId(session);
        return userService.updateUser(userId, username, email);
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> deleteCurrentUser(HttpSession session) {
        Long userId = getLoggedUserId(session);
        userService.deleteUser(userId);
        session.invalidate();
        return ResponseEntity.ok("Current user has been deleted");
    }

    @PutMapping("/me/password")
    public ResponseEntity<String> changePassword(@RequestParam String oldPassword, @RequestParam String newPassword, HttpSession session) {
        Long userId = getLoggedUserId(session);
        userService.changePassword(userId, oldPassword, newPassword);
        return ResponseEntity.ok("Password has been changed successfully");
    }
}