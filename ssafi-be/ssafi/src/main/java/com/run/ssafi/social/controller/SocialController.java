package com.run.ssafi.social.controller;

import com.run.ssafi.social.dto.LoginResponse;
import com.run.ssafi.social.dto.SocialLoginRequest;
import com.run.ssafi.social.dto.UserResponse;
import com.run.ssafi.social.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class SocialController {
    private final UserService userService;

    @PostMapping("/social-login")
    public ResponseEntity<LoginResponse> doSocialLogin(@RequestBody @Valid SocialLoginRequest request) throws SQLException {

        return ResponseEntity.created(URI.create("/social-login"))
                .body(userService.doSocialLogin(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(
                userService.getUser(id)
        );
    }
}