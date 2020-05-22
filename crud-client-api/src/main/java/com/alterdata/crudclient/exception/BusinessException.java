package com.alterdata.crudclient.exception;

public class BusinessException extends RuntimeException  {
	private static final long serialVersionUID = 7414490888877051006L;

	public BusinessException(String message) {
		super(message);
	}
}
