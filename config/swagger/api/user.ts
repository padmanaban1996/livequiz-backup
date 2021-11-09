export const apiUsers = {
    "get": {
        "tags": ["Users"],
        "summary": "Get all users in the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Users"
                }

            }
        }
    },

}
export const apiUserId = {
    "get": {
        "tags": ["Users"],
        "summary": "Get single user from the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Users"
                }

            }
        }
    }
}
export const apiTeachers = {
    "get": {
        "tags": ["Users"],
        "summary": "Get all Teachers from the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Teacher"
                }

            }
        }
    }
}
export const apiStudents = {
    "get": {
        "tags": ["Users"],
        "summary": "Get all Students from the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Student"
                }

            }
        }
    }
}
export const apiAdmins = {
    "get": {
        "tags": ["Users"],
        "summary": "Get all admins from the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Admin"
                }

            }
        }
    }
}
export const apiUserLogin = {
    "post": {
        "tags": ["Users"],
        "summary": "Post Quiz to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Users"
                }

            }
        },
        "parameters": [
            {
                "name": "Users",
                "in": "body",
                "description": "User login",
                "schema": {
                    "properties": {
                        "email": {
                            "type": "string",
                            "required": "true"
                        },
                        "password": {
                            "type": "string",
                            "required": "true"
                        },
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiUserSignup = {
    "post": {
        "tags": ["Users"],
        "summary": "Post signup data to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Users"
                }

            }
        },
        "parameters": [
            {
                "name": "Users",
                "in": "body",
                "description": "User signup",
                "schema": {
                    "properties": {
                        "email": {
                            "type": "string",
                            "required": "true"
                        },
                        "password": {
                            "type": "string",
                            "required": "true"
                        },
                        "role": {
                            "type": "string",
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiTeacherCreate = {
    "post": {
        "tags": ["Users"],
        "summary": "Post single teacher data to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Teacher"
                }

            }
        },
        "parameters": [
            {
                "name": "Teacher",
                "in": "body",
                "description": " single Teacher creation to the system",
                "schema": {
                    "properties": {
                        "email": {
                            "type": "string",

                        },
                        "password": {
                            "type": "string",

                        },
                        "role": {
                            "type": "string",
                        },
                        "name": {
                            "type": "string",
                        },
                        "belongs_to_class": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "belongs_to_class_id": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "is_class_teacher": {
                            "type": "boolean",
                            "default": "false"
                        },
                        "class_teacher_of": {
                            "type": "string",
                        },
                        "mobile_number": {
                            "type": "number",
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiTeachersUpload = {
    "post": {
        "tags": ["Users"],
        "summary": "Post all teacher data to the system in excel format",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Teacher"
                }

            }
        },
        "parameters": [
            {
                "name": "uploadteachers",
                "in": "formData",
                "description": "Teachers Upload to the system",
                "type": "file",
                "required": "true",
                "consumes": "multipart/form-data"
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiStudentCreate = {
    "post": {
        "tags": ["Users"],
        "summary": "Post single student data to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Student"
                }

            }
        },
        "parameters": [
            {
                "name": "Student",
                "in": "body",
                "description": " single student creation to the system",
                "schema": {
                    "properties": {
                        "email": {
                            "type": "string",

                        },
                        "password": {
                            "type": "string",

                        },
                        "role": {
                            "type": "string",
                        },
                        "name": {
                            "type": "string",
                        },
                        "belongs_to_class_id": {
                            "type": "array",
                            "items": {
                                "type": "string",
                            }
                        },
                        "is_class_teacher": {
                            "type": "boolean",
                            "default": "false"
                        },
                        "parent_email_id": {
                            "type": "string",
                        },
                        "parent_phone_number": {
                            "type": "number",
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiStudentsUpload = {
    "post": {
        "tags": ["Users"],
        "summary": "Post all Students data to the system in excel format",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Student"
                }

            }
        },
        "parameters": [
            {
                "name": "uploadstudents",
                "in": "formData",
                "description": "Students Upload to the system",
                "type": "file",
                "required": "true",
                "consumes": "multipart/form-data"
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiSingleClassStudentsUploadId = {
    "post": {
        "tags": ["Users"],
        "summary": "Post Single class Students data to the system in excel format",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Student"
                }

            }
        },
        "parameters": [
            {
                "name": "uploadstudents",
                "in": "formData",
                "description": "Singleclass Students Upload to the system",
                "type": "file",
                "required": "true",
                "consumes": "multipart/form-data"
            }
        ],
        "produces": ["application/json"],
    }
}
export const apiAdminCreate = {
    "post": {
        "tags": ["Users"],
        "summary": "Post single Admin data to the system",
        "responses": {
            "200": {
                "description": "ok",
                "schema": {
                    "$ref": "#/definitions/Admin"
                }

            }
        },
        "parameters": [
            {
                "name": "Admin",
                "in": "body",
                "description": " single Admin creation to the system",
                "schema": {
                    "properties": {
                        "email": {
                            "type": "string",

                        },
                        "password": {
                            "type": "string",

                        },
                        "role": {
                            "type": "string",
                        },
                        "name": {
                            "type": "string",
                        },
                        "mobile_number": {
                            "type": "number",
                        }
                    }
                }
            }
        ],
        "produces": ["application/json"],
    }
}
