export default {
    "properties": {
        "name": {
            "type": "string",
        },
        "parent_email_id": {
            "type": "string"
        },
        "parent_phone_number": {
            "type": "number"
        },
        "belongs_to_class_id": {
                "type": "string",
                "valuefrom":"EachClassid",
        }

    }

}