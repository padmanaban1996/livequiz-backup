export default{
    "properties": {
        "_id": {
            "type": "string",
        },
        "email": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "role": {
            "type": "string"
        },
        "teacher": {
            "type": "string",
            "valuefrom": "role"
        },
        "student": {
            "type": "string",
            "valuefrom": "role"
        },
        "admin": {
            "type": "string",
            "valuefrom": "role"
        },
    }
}