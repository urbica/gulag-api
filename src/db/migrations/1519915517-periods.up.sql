create table periods (
    id serial primary key,
    year integer NOT NULL,
    title jsonb NOT NULL,
    description jsonb NOT NULL
);
