export const apiQuestions = {
    "get": {
        "tags": ["Questions"],
        "summary": "Get all questions in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questions"
                }

            }
        }
    },

}
export const apiQuestionId = {
    "get": {
        "tags": ["Questions"],
        "summary": "Get single question",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questions"
                }

            }
        }
    }
}
export const apiDownloadExcel = {
    "get": {
        "tags": ["Questions"],
        "summary": "Get all questions_excel in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questions"
                }

            }
        }
    }
}
export const apiQuestionCreate = {
    "post": {
        "tags": ["Questions"],
        "summary": "Post single question to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questions"
                }

            }
        },
        "parameters": [
            {
                "name": "Question",
                "in": "body",
                "description": "Question create",
                "schema": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "a": {
                            "type": "string"
                        },
                        "b": {
                            "type": "string"
                        },
                        "c": {
                            "type": "string"
                        },
                        "d": {
                            "type": "string"
                        },
                        "currectAnswer": {
                            "type": "string"
                        },
                        "seconds": {
                            "type": "number"
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
export const apiQuestionExcelUpload = {
    "post": {
        "tags": ["Questions"],
        "summary": "Post Bulk Questions to the system through Excel format",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Questions"
                }

            }
        }
    },
    "parameters": [
        {
            "name": "uploadfile",
            "in": "formData",
            "description": "Questions Upload to the system",
            "type": "file",
            "required": "true",
            "consumes": "multipart/form-data"
        }
    ],
    "produces": ["application/json"],
}