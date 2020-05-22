CREATE SEQUENCE address_id_seq;

CREATE TABLE address (
	id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('address_id_seq'),
	street VARCHAR(60) NOT NULL,
	neighborhood VARCHAR(60) NOT NULL,
	state VARCHAR(60) NOT NULL,
	city VARCHAR(60) NOT NULL,
	nation VARCHAR(60) NOT NULL,
	zipcode VARCHAR(10) NOT NULL,
	complement VARCHAR(60) NOT NULL
);

ALTER SEQUENCE address_id_seq
OWNED BY address.id;