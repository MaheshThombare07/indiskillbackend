
git  https://github.com/MaheshThombare07/indiskillbackend.git

post - http://localhost:5000/api/auth/register

{
 "name": "john2",
 "email": "john2@test.com",
 "password": "secret1232",
 "role": "CITIZEN"
}

post - http://localhost:5000/api/auth/logout


get - http://localhost:5000/api/users


post - http://localhost:5000/api/categories

{
    "name":"Water supply"
    "priporty" : "HIGH"
}
