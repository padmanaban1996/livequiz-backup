export default {
    "properties": {
        "room_id": {
            "type": "string",
        },
        "host_id": {
            "type": "string"
        },
        "name": {
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
        "host_joined": {
            "type": "boolean",
            "default": "false"
        },
        "schedule_date": {
            "type": "date"
        },
        "room_url": {
            "type": "string"
        },
        "activity": {
            "type": "array",
            "items": {
                "type": "string",
                "valuefrom": "LiveClassUserActivityid"

                }
            },
            "participents_states": {
                "type": "array",
                "items": {
                    "type": "string",
                    "valuefrom": "RoomStateid"

                    }
                },
                "participents": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "valuefrom": "usresid"

                        }
                    },
                    "roomstate": {
                        "type": "object",
                        "session_started": {
                            "type": "boolean",
                            "default": "false"
                            },
                            "session_closed": {
                                "type": "boolean",
                                "default": "false"
                            },

                        },
    }
}