package com.alterdata.crudclient.security.oauth.user;

import java.util.Map;

public abstract class UserInfo {

	protected Map<String, Object> attributes;

	public UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public abstract String getId();

	public abstract String getName();

	public abstract String getEmail();

	public abstract String getImageUrl();
}
