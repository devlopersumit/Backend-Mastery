# 
> index.js --> entry point of server

-  config --> handles Database Connection
-  models --> handle auth & notes Schema
- routes --> handle auth & notes API Endpoints
- controllers --> handles business logic & CRUD Operations for auth & notes 
- middlewares --> verify the user credentials before reaching to server
- validators --> validate & Sanitize Request Data
- utils --> handle generation & Verification of JWT


{
    "firstName" : "Ajay",
    "lastName" : "Yadav",
    "email" : "ajay123@gmail.com",
    "password": "Ajay@123"
}


{
    "title" : "Prepare for GATE Exam",
    "content" : "I will study daily 12-14 hrs and will clear the exam"
}