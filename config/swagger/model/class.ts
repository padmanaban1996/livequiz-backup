export default {
    "properties": {
        "_id": {
            "type": "string",
        },
        "name": {
            "type": "string"
        },
        "section_id": {
            "type": "string"
        },
        "students": {
            "type": "array",
            "items": {
                "type": "string",
                "valuefrom": "Studentid"

                }
        },

    }
}