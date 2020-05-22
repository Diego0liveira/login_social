package com.alterdata.crudclient.security.oauth.user;

import java.util.Map;

import com.alterdata.crudclient.domain.enuns.AuthProvider;
import com.alterdata.crudclient.exception.AuthenticationProcessingException;

public class UserInfoFactory {

	public static UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleUserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.facebook.toString())) {
            return new FacebookUserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.github.toString())) {
            return new GithubUserInfo(attributes);
        } else {
            throw new AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
