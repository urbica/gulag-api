create table camps (
    id serial primary key,
    title jsonb NOT NULL,
    sub_titles jsonb NOT NULL,
    description jsonb NOT NULL,
    published jsonb NOT NULL,
    type_id integer,
    activity_id integer,
    region_id integer,
    notes text
);
