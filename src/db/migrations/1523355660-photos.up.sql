create table photos (
  id serial primary key,
  description jsonb NOT NULL,
  file_path text NOT NULL,
  camp_id integer NOT NULL
);
