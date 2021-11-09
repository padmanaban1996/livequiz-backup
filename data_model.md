< !--data models to each api, copy from here when using postman instead of creating new ones everytime-- >

POST - /api/user/teacher =  {

    "name"      : "school1 jhon1",
    "email"     : "jhon1@school1.com",
    "password"  : "jhon1",
    "role"      : "teacher",
    "belongs_to_class"  : 7,
    "is_class_teacher"  : true,
    "class_teacher_of"   : "class_id",
    "mobile_number"     : 9999999999

}

POST - /api/school/sections = {

    "name" : "a"
}

POST - /api/school/class = {

    "name" : 1,
    "section_id": "5f91573701f0ca4cefab5794"
}

<!-- get id from classes  and teachers -->
POSt - /api/school/ = {

     "name" : "school1",
    "classes": ["5f9157c101f0ca4cefab5796","5f9157cd01f0ca4cefab5797"],
    "teachers": ["5f9136f9b83ca635b6fd179e"]
}

post - api/user/student = {
    {
    "name": "jane4",
    "belongs_to_class": "5f9157c101f0ca4cefab5796",
    "parent": {
        "email_id": "parent@jane4.com",
        "phone_number": 99999999
    }
}