create table photos (
    id serial primary key,
    title jsonb NOT NULL,
    description jsonb NOT NULL,
    file_path text NOT NULL,
    camp_id integer NOT NULL
);
