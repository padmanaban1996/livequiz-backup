export default {
    "properties": {
        "name": {
            "type": "string",
        },
        "belongs_to_class": {
            "type": "array",
            "items": {
                "type": "string",
                }
        },
        "belongs_to_class_id": {
            "type": "array",
            "items": {
                "type": "string",
                }
        },
        "is_class_teacher": {
            "type": "boolean",
            "default":"false"

        },
        "class_teacher_of": {
            "type": "string",
            "valuefrom":"EachClassid"
        }
    }

}

