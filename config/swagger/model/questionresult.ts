export default {
    "properties": {

        "quiz_id": {
                "type": "string",
                "valuefrom": "quizid"
        },
        "question_id": {
            "type": "objectid",
            "items": {
                "type": "string",
                "valuefrom": "questionid"
                }
        },
        "participent_id": {
                "type": "string",
                "valuefrom": "studentid"
        },
        "not_answered": {
            "type": "Boolean",

        },
        "result": {
                "type": "Boolean",

        },"answer_submitted": {
              "type": "string",

        },

    }
}