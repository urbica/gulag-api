create table camp_types (
    id serial not null primary key,
    title jsonb not null,
    description jsonb not null
);
