const notifications = {
    "request to join - leader action": ({ circle_name, actor_name }) =>
        `${actor_name} wants to join ${circle_name}!`,

    "request to join - leader rejection": ({ circle_name }) =>
        `${circle_name} is not looking for any new members at this time.`,

    "request to join - leader accepted": ({ circle_name }) =>
        `You are now a member of ${circle_name}!`,

    "member nomination - leader action": ({
        circle_name,
        actor_name,
        nominated_by_name,
    }) =>
        `${nominated_by_name} has nominated ${actor_name} to be a part of ${circle_name}!`,

    "member nomination - leader rejection": ({ circle_name, nominated_name }) =>
        `Your nomination for ${nominated_name} has not gone through. ${circle_name} isn't looking any new members at this time.`,

    "member nomination - user action": ({ circle_name, nominated_by_name }) =>
        `You have been nominated by ${nominated_by_name} to join ${circle_name}!`,

    "member nomination - user rejection": ({ circle_name, actor_name }) =>
        `${actor_name} is not looking to join ${circle_name} at this time.`, // This will be sent to both the leader and the nominator

    "member nomination - user accepted": ({ circle_name, actor_name }) =>
        `${actor_name} has accepted and is now a part of ${circle_name}!`, // This will be sent to both the leader and the nominator

    "leader invite member - user action": ({ circle_name, actor_name }) =>
        `${actor_name} is inviting you to join ${circle_name}!`,

    "leader invite member - user rejection": ({ circle_name, actor_name }) =>
        `${actor_name} is not looking to join ${circle_name} during this time.`,

    "leader invite member - user accepted": ({ circle_name, actor_name }) =>
        `${actor_name} has accepted and is now a part of ${circle_name}!`,

    "leader nominate leader - user action": ({ circle_name, actor_name }) =>
        `${actor_name} is inviting you to be the new leader of ${circle_name}`,

    "leader nominate leader - user rejection": ({ circle_name, actor_name }) =>
        `${actor_name} is not looking to be leader of ${circle_name} at this time.`,

    "leader nominate leader - user accepted": ({ circle_name, actor_name }) =>
        `${actor_name} has accepted your invitation and is now the leader of ${circle_name}`,
};

// CREATE TABLE "notifications" (
// 	"id" serial NOT NULL,
// 	"circle_id" int NOT NULL,
// 	"recipient_id" int NOT NULL,
// 	"actor_id" int NOT NULL,
//  "nomination_id" int,
// 	"type" varchar(255) NOT NULL,
//  "completed": false,
// );

// CREATE TABLE "nominations"
// "id" serial NOT NULL,
// "nominated_by_id" int NOT NULL,
// "nominated_id" int NOT NULL,
// );

module.exports = { notifications };
