CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(60) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"avatar_image" TEXT,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "circle_user" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"circle_id" int NOT NULL,
	CONSTRAINT "circle_user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "circles" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" TEXT NOT NULL,
	"owner_id" int NOT NULL,
	CONSTRAINT "circles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "manuscript_shelf" (
	"id" serial NOT NULL,
	"shelf_id" int NOT NULL,
	"manuscript_id" int NOT NULL,
	CONSTRAINT "manuscript_shelf_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "manuscripts" (
	"id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" TEXT NOT NULL,
	CONSTRAINT "manuscripts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "circle_manuscript" (
	"id" serial NOT NULL,
	"manuscript_id" int NOT NULL,
	"circle_id" int NOT NULL,
	CONSTRAINT "circle_manuscript_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "shelves" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"name" varchar(60) NOT NULL,
	CONSTRAINT "shelves_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "messages" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"manuscript_id" int NOT NULL,
	"circle_id" int NOT NULL,
	"user_id" int NOT NULL,
	"parent_id" int NOT NULL,
	"message" TEXT NOT NULL,
	CONSTRAINT "messages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"manuscript_id" int NOT NULL,
	"user_id" int NOT NULL,
	"parent_id" int NOT NULL,
	"comment" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments_likes" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"comment_id" int NOT NULL,
	CONSTRAINT "comments_likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "notifications" (
	"id" serial NOT NULL,
	"circle_id" int NOT NULL,
	"recipient_id" int NOT NULL,
	"actor_id" int NOT NULL,
	"nomination_id" int,
	"type" varchar(255) NOT NULL,
	"completed" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "notifications_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "nominations" (
	"id" serial NOT NULL,
	"nominated_by_id" int NOT NULL,
	"nominated_id" int NOT NULL,
	CONSTRAINT "nominations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "circle_user" ADD CONSTRAINT "circle_user_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "circle_user" ADD CONSTRAINT "circle_user_fk1" FOREIGN KEY ("circle_id") REFERENCES "circles"("id");

ALTER TABLE "circles" ADD CONSTRAINT "circles_fk0" FOREIGN KEY ("owner_id") REFERENCES "user"("id");

ALTER TABLE "manuscript_shelf" ADD CONSTRAINT "manuscript_shelf_fk0" FOREIGN KEY ("shelf_id") REFERENCES "shelves"("id");
ALTER TABLE "manuscript_shelf" ADD CONSTRAINT "manuscript_shelf_fk1" FOREIGN KEY ("manuscript_id") REFERENCES "manuscripts"("id");


ALTER TABLE "circle_manuscript" ADD CONSTRAINT "circle_manuscript_fk0" FOREIGN KEY ("manuscript_id") REFERENCES "manuscripts"("id");
ALTER TABLE "circle_manuscript" ADD CONSTRAINT "circle_manuscript_fk1" FOREIGN KEY ("circle_id") REFERENCES "circles"("id");

ALTER TABLE "shelves" ADD CONSTRAINT "shelves_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("manuscript_id") REFERENCES "manuscripts"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("circle_id") REFERENCES "circles"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk3" FOREIGN KEY ("parent_id") REFERENCES "messages"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("manuscript_id") REFERENCES "manuscripts"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk2" FOREIGN KEY ("parent_id") REFERENCES "comments"("id");

ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_fk1" FOREIGN KEY ("comment_id") REFERENCES "comments"("id");

ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fk0" FOREIGN KEY ("circle_id") REFERENCES "circles"("id");
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fk1" FOREIGN KEY ("recipient_id") REFERENCES "user"("id");
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fk2" FOREIGN KEY ("actor_id") REFERENCES "user"("id");
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fk3" FOREIGN KEY ("nomination_id") REFERENCES "nominations"("id");

ALTER TABLE "nominations" ADD CONSTRAINT "nominations_fk0" FOREIGN KEY ("nominated_by_id") REFERENCES "user"("id");
ALTER TABLE "nominations" ADD CONSTRAINT "nominations_fk1" FOREIGN KEY ("nominated_id") REFERENCES "user"("id");












