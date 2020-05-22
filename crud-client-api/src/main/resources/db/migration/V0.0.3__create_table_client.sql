CREATE SEQUENCE client_id_seq;

CREATE TABLE client (
	id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('client_id_seq'),
	name VARCHAR(60) NOT NULL,
	telephone VARCHAR(15) NOT NULL,
	birthday DATE NOT NULL,
	address_id BIGINT,
	user_api_id BIGINT
);

ALTER SEQUENCE client_id_seq
OWNED BY client.id;

ALTER TABLE client 
ADD CONSTRAINT client_address_contraint FOREIGN KEY (address_id) REFERENCES address (id);

ALTER TABLE client 
ADD CONSTRAINT client_user_api_contraint FOREIGN KEY (user_api_id) REFERENCES user_api (id);