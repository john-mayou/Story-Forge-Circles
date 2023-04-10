-- MANUSCRIPT MOCK DATA --
-- SELECTS title and body from Manuscript Mock Data --
SELECT "manuscripts".title, "manuscripts".body FROM "manuscripts"
JOIN "manuscript_shelf" ON "manuscript_shelf".manuscript_id = "manuscripts".id
JOIN "shelves" ON "shelves".id = "manuscript_shelf".shelf_id
JOIN "user" ON "user".id = "shelves".user_id
GROUP BY "manuscripts".title, "manuscripts".body;