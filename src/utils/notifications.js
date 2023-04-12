export default {
    // REQUEST TO JOIN
    "request to join - leader action": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} wants to join ${circle_name}!`,
        next_actions: {
            accept: {
                button_text: "Accept",
                dispatch_actions: [
                    ({ actor_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "request to join - leader accepted",
                            recipient_id: actor_id,
                            circle_id,
                        },
                    }),
                    ({ actor_id, circle_id }) => ({
                        type: "ADD_USER_TO_CIRCLE",
                        payload: { user_id: actor_id, circle_id },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
            reject: {
                button_text: "Decline",
                dispatch_actions: [
                    ({ actor_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "request to join - leader rejection",
                            recipient_id: actor_id,
                            circle_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
        },
    },

    "request to join - leader rejection": {
        messageConstructor: ({ circle_name }) =>
            `${circle_name} is not looking for any new members at this time.`,
        next_actions: null,
    },

    "request to join - leader accepted": {
        messageConstructor: ({ circle_name }) =>
            `You are now a member of ${circle_name}!`,
        next_actions: null,
    },

    // MEMBER NOMINATION
    "member nomination - leader action": {
        messageConstructor: ({
            circle_name,
            nominated_name,
            nominated_by_name,
        }) =>
            `${nominated_by_name} has nominated ${nominated_name} to be a part of ${circle_name}!`,
        next_actions: {
            accept: {
                button_text: "Send Invite",
                dispatch_actions: [
                    ({ nominated_id, existing_nomination_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "member nomination - user action",
                            recipient_id: nominated_id,
                            circle_id,
                            existing_nomination_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
            reject: {
                button_text: "Decline",
                dispatch_actions: [
                    ({
                        nominated_by_id,
                        existing_nomination_id,
                        circle_id,
                    }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "member nomination - leader rejection",
                            recipient_id: nominated_by_id,
                            circle_id,
                            existing_nomination_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
        },
    },

    "member nomination - leader rejection": {
        messageConstructor: ({ circle_name, nominated_name }) =>
            `Your nomination for ${nominated_name} has not gone through. ${circle_name} isn't looking any new members at this time.`,
        next_actions: null,
    },

    "member nomination - user action": {
        messageConstructor: ({ circle_name, nominated_by_name }) =>
            `You have been nominated by ${nominated_by_name} to join ${circle_name}!`,
        next_actions: {
            accept: {
                button_text: "Join",
                dispatch_actions: [
                    ({ actor_id, existing_nomination_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "member nomination - user accepted",
                            recipient_id: actor_id,
                            circle_id,
                            existing_nomination_id,
                        },
                    }),
                    ({
                        nominated_by_id,
                        existing_nomination_id,
                        circle_id,
                    }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "member nomination - user accepted",
                            recipient_id: nominated_by_id,
                            circle_id,
                            existing_nomination_id,
                        },
                    }),
                    ({ recipient_id, circle_id }) => ({
                        type: "ADD_USER_TO_CIRCLE",
                        payload: { user_id: recipient_id, circle_id },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
            reject: {
                button_text: "Decline",
                dispatch_actions: [
                    ({ actor_id, existing_nomination_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "member nomination - user rejection",
                            recipient_id: actor_id,
                            circle_id,
                            existing_nomination_id,
                        },
                    }),
                    ({
                        nominated_by_id,
                        existing_nomination_id,
                        circle_id,
                    }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "member nomination - user rejection",
                            recipient_id: nominated_by_id,
                            circle_id,
                            existing_nomination_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
        },
    },

    "member nomination - user rejection": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} is not looking to join ${circle_name} at this time.`, // This will be sent to both the leader and the nominator
        next_actions: null,
    },

    "member nomination - user accepted": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} has accepted and is now a part of ${circle_name}!`, // This will be sent to both the leader and the nominator
        next_actions: null,
    },

    // LEADER INVITE MEMBER
    "leader invite member - user action": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} is inviting you to join ${circle_name}!`,
        next_actions: {
            accept: {
                button_text: "Join",
                dispatch_actions: [
                    ({ actor_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "leader invite member - user accepted",
                            recipient_id: actor_id,
                            circle_id,
                        },
                    }),
                    ({ recipient_id, circle_id }) => ({
                        type: "ADD_USER_TO_CIRCLE",
                        payload: { user_id: recipient_id, circle_id },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
            reject: {
                button_text: "Decline",
                dispatch_actions: [
                    ({ actor_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "leader invite member - user rejection",
                            recipient_id: actor_id,
                            circle_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
        },
    },

    "leader invite member - user rejection": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} is not looking to join ${circle_name} during this time.`,
        next_actions: null,
    },

    "leader invite member - user accepted": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} has accepted and is now a part of ${circle_name}!`,
        next_actions: null,
    },

    // LEADER NOMINATE LEADER
    "leader nominate leader - user action": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} is inviting you to be the new leader of ${circle_name}`,
        next_actions: {
            accept: {
                button_text: "Accept",
                dispatch_actions: [
                    ({ actor_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "leader nominate leader - user accepted",
                            recipient_id: actor_id,
                            circle_id,
                        },
                    }),
                    ({ recipient_id, circle_id }) => ({
                        type: "UPDATE_NEW_CIRCLE_LEADER",
                        payload: {
                            new_leader: recipient_id,
                            circle_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
            reject: {
                button_text: "Decline",
                dispatch_actions: [
                    ({ actor_id, circle_id }) => ({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                            type: "leader nominate leader - user rejection",
                            recipient_id: actor_id,
                            circle_id,
                        },
                    }),
                    ({ notification_id }) => ({
                        type: "COMPLETE_NOTIFICATION",
                        payload: notification_id,
                    }),
                ],
            },
        },
    },

    "leader nominate leader - user rejection": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} is not looking to be leader of ${circle_name} at this time.`,
        next_actions: null,
    },

    "leader nominate leader - user accepted": {
        messageConstructor: ({ circle_name, actor_name }) =>
            `${actor_name} has accepted your invitation and is now the leader of ${circle_name}`,
        next_actions: null,
    },
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
