export const apiQuizresults = {
    "get": {
        "tags": ["Quizresults"],
        "summary": "Get all Quizresults in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quizresult"
                }

            }
        }
    },

}
export const apiQuizresultsId = {
    "get": {
        "tags": ["Quizresults"],
        "summary": "Get single Quizresult",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quizresult"
                }

            }
        }
    }
}
export const apiQuizresultsScore = {
    "get": {
        "tags": ["Quizresults"],
        "summary": "Get overall Quiz score by participent",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quizresult"
                }

            }
        }
    }
}
export const apiQuestionresults = {
    "get": {
        "tags": ["Quizresults"],
        "summary": "Get all Question results in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questionresult"
                }

            }
        }
    }
}
export const apiQuestionresultsId = {
    "get": {
        "tags": ["Quizresults"],
        "summary": "Get single Question result in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questionresult"
                }

            }
        }
    }
}
export const apiCalculateQuizscore = {
    "post": {
        "tags": ["Quizresults"],
        "summary": "Post calculation of score in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quizresult"
                }

            }
        },
        "parameters": [
            {
                "name": "QuizResultCalculation",
                "in": "body",
                "description": "Quizresult Calculation",
                "schema": {
                    "properties": {
                        "participent_id": {
                            "type": "string",
                        },
                        "quiz_id": {
                            "type": "string"
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiCheckStudentAttended = {
    "post": {
        "tags": ["Quizresults"],
        "summary": "check If Student Has Result in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quizresult"
                }

            }
        },
        "parameters": [
            {
                "name": "Student Attended or not verification",
                "in": "body",
                "description": "Verification",
                "schema": {
                    "properties": {
                        "participent_id": {
                            "type": "string",
                        },
                        "quiz_id": {
                            "type": "string"
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiCreateQuestionResultId = {
    "post": {
        "tags": ["Quizresults"],
        "summary": "post the results data to the system with id",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Quizresult"
                }

            }
        },
        "parameters": [
            {
                "name": "Update Results",
                "in": "body",
                "description": "updating the results to the system with participent id",
                "schema": {
                    "properties": {
                        "participent_id": {
                            "type": "string",
                        },
                        "question_id": {
                            "type": "string"
                        },
                        "not_answered": {
                            "type": "boolean"
                        },
                        "answer_submitted": {
                            "type": "string"
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
