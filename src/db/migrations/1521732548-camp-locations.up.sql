create table camp_locations (
  id serial primary key,
  geom jsonb,
  description jsonb,
  type_id integer,
  activity_id integer,
  region_id integer,
  camp_id integer
);
