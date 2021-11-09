export default {

        "required": ["title"],
        "properties": {
            "_id": {
                "type": "string",
            },
            "name": {
                "type": "string"
            },
            "questions": {
                "type": "array",
                "items": {
                    "type": "string",
                    "valuefrom": "questionsid"

                    }
                },



        }

}