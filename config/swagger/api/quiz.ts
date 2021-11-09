export const apiQuiz = {
    "get": {
        "tags": ["Quiz"],
        "summary": "Get all quizzes in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quiz"
                }

            }
        }
    },

}
export const apiQuizId = {
    "get": {
        "tags": ["Quiz"],
        "summary": "Get single quiz",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quiz"
                }

            }
        }
    }
}
export const apiQuizCreate = {
    "post": {
        "tags": ["Quiz"],
        "summary": "Post Quiz to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quiz"
                }

            }
        },
        "parameters": [
            {
                "name": "Quiz",
                "in": "body",
                "description": "Quiz create",
                "schema": {
                    "properties": {
                        "questions": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "name": {
                            "type": "string"
                        },
                        "createdBy": {
                            "type": "string"
                        }
                    }

                }
            }
        ],
        "produces": ["application/json"],
    }
}
