package com.alterdata.crudclient.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alterdata.crudclient.domain.model.User;
import com.alterdata.crudclient.domain.repository.UserRepository;
import com.alterdata.crudclient.exception.ResourceNotFoundException;
import com.alterdata.crudclient.security.CurrentUser;
import com.alterdata.crudclient.security.UserPrincipal;

@RestController
public class UserController {

	@Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
