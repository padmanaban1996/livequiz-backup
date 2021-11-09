export const apiSchool = {
    "get": {
        "tags": ["School"],
        "summary": "Get all School details in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Schooldetails"
                }

            }
        }
    },

}
export const apiClass = {
    "get": {
        "tags": ["School"],
        "summary": "Get all Classes in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Class"
                }

            }
        }
    }
}
export const apiSection = {
    "get": {
        "tags": ["School"],
        "summary": "Get all Sections in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Sections"
                }

            }
        }
    }
}
export const apiSchoolCreate = {
    "post": {
        "tags": ["School"],
        "summary": "Post SchoolDetails to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Schooldetails"
                }

            }
        },
        "parameters": [
            {
                "name": "Schooldetails",
                "in": "body",
                "description": "create SchoolDetails",
                "schema": {
                    "properties": {
                        "name": {
                            "type": "string",
                        },
                        "classes": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "teachers": {
                            "type": "array",
                            "items": {
                                "type": "string",
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
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiClassCreate = {
    "post": {
        "tags": ["School"],
        "summary": "Post ClassDetails to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Class"
                }

            }
        },
        "parameters": [
            {
                "name": "Classdetails",
                "in": "body",
                "description": "create ClassDetails",
                "schema": {
                    "properties": {
                        "name": {
                            "type": "string",
                        },
                        "students": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "section_id": {
                            "type": "string"
                        }
                    }
                }

            }
        ],
        "produces": ["application/json"],
    }
}
export const apiSectionCreate = {
    "post": {
        "tags": ["School"],
        "summary": "Post SectionDetails to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Sections"
                }

            }
        },
        "parameters": [
            {
                "name": "Sectiondetails",
                "in": "body",
                "description": "create SectionDetails",
                "schema": {
                    "properties": {
                        "name": {
                            "type": "string",
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
