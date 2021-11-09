export default {
    "properties": {
        "_id": {
            "type": "string",
        },
        "name": {
            "type": "string"
        },
        "classes": {
            "type": "array",
            "items": {
                "type": "string",
                "valuefrom": "EachClassid"
                }
        },
        "teachers": {
            "type": "array",
            "items": {
                "type": "string",
                "valuefrom": "tecaherid"
                }
        },
        "phone_number": {
            "type": "number"
        },
        "address": {
            "type": "string"
        }

    }
}