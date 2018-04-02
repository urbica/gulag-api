create table camp_locations (
  id serial primary key,
  geom jsonb,
  description jsonb,
  camp_id integer
);
