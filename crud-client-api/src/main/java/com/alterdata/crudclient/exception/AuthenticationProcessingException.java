package com.alterdata.crudclient.exception;

import org.springframework.security.core.AuthenticationException;

public class AuthenticationProcessingException extends AuthenticationException {

	private static final long serialVersionUID = 5326933086028187544L;

	public AuthenticationProcessingException(String msg, Throwable t) {
        super(msg, t);
    }

    public AuthenticationProcessingException(String msg) {
        super(msg);
    }
}
