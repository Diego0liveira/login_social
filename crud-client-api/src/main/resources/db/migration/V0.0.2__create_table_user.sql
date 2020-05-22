CREATE SEQUENCE user_api_id_seq;

CREATE TABLE user_api (
	id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('user_api_id_seq'),
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	image_url VARCHAR(255),
	email_verifield BOOLEAN NOT NULL,
	password VARCHAR(255),
	provider VARCHAR(60) NOT NULL,
	provider_id VARCHAR(255)
);

ALTER SEQUENCE user_api_id_seq
OWNED BY user_api.id;