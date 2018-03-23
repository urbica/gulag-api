create table camps (
    id serial primary key,
    title jsonb NOT NULL,
    sub_titles jsonb NOT NULL,
    description jsonb NOT NULL,
    published jsonb NOT NULL,
    notes text
);


-- '{"title":{"ru":"Новый лагерь","en":"New prison","de":"Neue Gefängnis"},"subTitles":{"ru":"","en":"","de":""},"description":{"ru":"","en":"","de":""},"published":{"ru":false,"en":false,"de":false},"features":[{"geometry":{"coordinates":[90, 62],"type":"Point"},"properties":{}}]}'
