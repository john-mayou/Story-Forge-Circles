-- MANUSCRIPT MOCK DATA --
-- Inserts Manuscript Mock Data --
INSERT INTO "shelves" ("user_id", "name")
VALUES (1, 'Connor_Shelf');


INSERT INTO "manuscripts" ("title", "body")
VALUES ('Fall on Paul', 'If you feel alone or feel at all, answer the call to Fall on Paul. Paul lives in a wooden House. He is happy to keep friends about.');


INSERT INTO "manuscript_shelf" ("shelf_id", "manuscript_id")
VALUES (1, 1);


INSERT INTO "manuscripts" ("title", "body")
VALUES ('I Like Things', 'I Like Turtles, Cats, Dogs, Hot Dogs, Burgers, People, and all sorts of other things. Do you like things?');

INSERT INTO "manuscript_shelf" ("shelf_id", "manuscript_id")
VALUES (1, 2);