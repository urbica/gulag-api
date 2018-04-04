create table camp_locations (
  id serial primary key,
  geom jsonb,
  description jsonb,
  order_index integer,
  camp_id integer
);
