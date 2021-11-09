export const apiSchedules = {
    "get": {
        "tags": ["Schedule"],
        "summary": "Get all Schedules in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Schedule"
                }

            }
        }
    },

}
export const apiScheduleId = {
    "get": {
        "tags": ["Schedule"],
        "summary": "Get single Schedule",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Schedule"
                }

            }
        }
    }
}
export const apiRoomstateId = {
    "get": {
        "tags": ["Schedule"],
        "summary": "Get Room state",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Roomstate"
                }

            }
        }
    }
}
export const apiUseractivityId = {
    "get": {
        "tags": ["Schedule"],
        "summary": "Get USer Activity",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Liveclassuseractivity"
                }

            }
        }
    }
}
export const apiScheduleCreate = {
    "post": {
        "tags": ["Schedule"],
        "summary": "Post Schedule data to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Schedule"
                }

            }
        },
        "parameters": [
            {
                "name": "Schedule",
                "in": "body",
                "description": "Schedule create",
                "schema": {
                    "properties": {
                        "host_id": {
                            "type": "string",
                        },
                        "name": {
                            "type": "string"
                        },
                        "participents": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "valuefrom": "usresid"

                            }
                        },
                        "room_url": {
                            "type": "string"
                        },
                        "starts_at": {
                            "type": "object",
                            "properties": {
                                "hour": {
                                    "type": "number"
                                },
                                "minute": {
                                    "type": "number"
                                },
                                "meridiem": {
                                    "type": "string"
                                }
                            }
                        },
                        "ends_at": {
                            "type": "object",
                            "properties": {
                                "hour": {
                                    "type": "number"
                                },
                                "minute": {
                                    "type": "number"
                                },
                                "meridiem": {
                                    "type": "string"
                                }
                            }
                        },
                        "scheduled_date": {
                            "type": "date"
                        },
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiRoomstateCreateId = {
    "post": {
        "tags": ["Schedule"],
        "summary": "Post roomstate id to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Roomstate"
                }

            }
        },
        "parameters": [
            {
                "name": "Schedule",
                "in": "body",
                "description": "create room state",
                "schema": {
                    "properties": {
                        "participant_id": {
                            "type": "string",
                        },
                        "muted": {
                            "type": "boolean"
                        },
                        "video_sharing": {
                            "type": "boolean"
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiCreateLiveclassuseractivityId = {
    "post": {
        "tags": ["Schedule"],
        "summary": "Post Liveclass user activity id to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Liveclassuseractivity"
                }

            }
        },
        "parameters": [
            {
                "name": "Schedule",
                "in": "body",
                "description": "create Liveclass Activity",
                "schema": {
                    "properties": {
                        "participant_id": {
                            "type": "string",
                        },
                        "activity": {
                            "type": "string"
                        },
                        "start_time": {
                            "type": "date"
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
