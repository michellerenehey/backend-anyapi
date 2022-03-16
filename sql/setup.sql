DROP TABLE IF EXISTS flowers;

CREATE TABLE flowers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL 
);

INSERT INTO 
    flowers (name, color) 
VALUES
    ('iris', 'blue');

