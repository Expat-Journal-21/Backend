# Expat Journal (Buildweek)

## API Base URL: 

---
## Server Status
**GET**: `/` </br>
When the server is up it will respond with:
```
message: "Server is running!"
```
---
## Table of Contents

- [User Routes/Authentication](#user-routes)
    - [Register](#register-a-user) (POST)
    - [Login](#login-as-a-user) (POST)
- [Posts Routes](#post-routes-(authorization-token-**required**:))
    - [GET](#get-all-posts)
    - [GET by post ID](#get-post-by-post-ID)
    - [GET by user ID](#get-post-by-user's-ID)
    - [POST new post](#post-new-post)
    - [UPDATE post](#update-post)
    - [DELETE post](#delete-post)
- [Public Routes](#public-routes)
    - [GET](#get-all-public-posts)

</br>


---
## Test Accounts
```
username: Test User
email: testtest123@gmail.com
password: 1234
```
```
username: Test User2
email: testtest1234@gmail.com
password: 1234
```
---
# User Routes:

## Register a User
</br>

The **Username** & **Email** must be unique

If the **Username** or **Email** is already in use, it will respond with:

```
{
    "error": "Username or Email already registered"
}
``` 
---
</br>

**POST**: `/api/auth/register`
```
Example User being registered

{
    "username": "user",
    "email": "email@email.com",
    "password": "yoursecretpassword"
}
```
This will return an object:
```
{
    "user": {
        "id": int
        "name": string,
        "username": string,
        "email": string
    }
}
```
---
</br>

## Login as a user
</br>

User can log in with either **Username** or **Email**

 **POST**: `/api/auth/login`
```
Example User being logged in via email

{
    "email": "email@email.com",
    "password": "yoursecretpassword"
}
```

---
```
Example User being logged in via username

{
    "username": "user",
    "password": "yoursecretpassword"
}
```
This will return an object:
```
{
    "user": {
        "id": int,
        "username": string,
        "email": string
    },
    "token": string
}
```
---


# Post Routes (Authorization Token **Required**):


## GET all posts
</br>

This will retrieve all the posts in the database

**GET** `/api/posts`

```[
    {
        "id": 1,
        "title": "Test Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:57:19 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png",
        ],
        "is_public": 0,
        "user_id": 1
    },
    {
        "id": 2,
        "title": "Test Post Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:58:23 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png"
        ],
        "is_public": 0,
        "user_id": 1
    }
]
```
---
</br>

## GET post by post ID
</br>

This will retrieve a single post with where `postId` matches the ID provided

**GET** `/api/posts/:postId`

```
[
    {
        "id": 1,
        "title": "Test Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:57:19 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png",
        ],
        "is_public": 0,
        "user_id": 1
    }
]
```
---
</br>

## GET post by user's ID
</br>

This will retrieve all posts for a given user

**GET** `/api/posts/user/:id`
```
[
    {
        "id": 1,
        "title": "Test Post Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:57:19 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
        ],
        "is_public": 0,
        "user_id": 1
    },
    {
        "id": 2,
        "title": "Test Post Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:58:23 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png"
        ],
        "is_public": 0,
        "user_id": 1
    },
    {
        "id": 3,
        "title": "Test Post Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:59:11 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
            "https://www.searchenginejournal.com/wp-content/uploads/2018/07/The-Smart-Marketer%E2%80%99s-Guide-to-Google-Alerts-760x400.png"
        ],
        "is_public": 0,
        "user_id": 1
    },
    {
        "id": 4,
        "title": "Test Post Title",
        "description": "Test Post Description",
        "date": "8/23/2020, 2:59:43 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg",
        ],
        "is_public": 0,
        "user_id": 1
    }
]
```
---
</br>

## POST new post
</br>

This will add a new post to the database

**POST** `/api/posts`
- Title: **Required**,
- Description: **Required**,
- Date: **Optional** Defaults to current date,
- Images: **Optional** Send as a comma separated array of strings,
- Is_public: **Required** Defaults to `0 aka: false` ,
- User_id: **Required**

```
Example of new post

{
    "title": "New Post Example",
    "description": "New Test Post Description",
    "images": ["https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"  ],
    "user_id": 1

}
```
This will return an object: 
```
{
    "newPost": {
        "id": 12,
        "title": "New Post Example",
        "description": "New Test Post Description",
        "date": "8/23/2020, 2:57:14 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
        ],
        "is_public": 0,
        "user_id": 1
    }
}
```
---
</br>

## Update post
</br>

This will update the post for the given ID

**PUT** `/api/posts/:postId`
- Title: **Required**,
- Description: **Required**,
- Date: **Optional** Defaults to current date,
- Images: **Optional** Send as a comma separated array of strings,
- Is_public: **Required** Defaults to `0 aka: false` ,
- User_id: **Required**


This will return an object: 
```
{
    "updatedPost": {
        "id": 1,
        "title": "Updated New Post Example",
        "description": "New Test Post Description",
        "date": "8/23/2020, 2:57:19 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
        ],
        "is_public": 0,
        "user_id": 1
    }
}
```
---
</br>

## Delete post
</br>

This will delete the post for the given ID from the database

**DELETE** `/api/posts/:postId`

Returns `1` on successful delete

---
</br>


# Public Routes:


## GET all public posts
</br>

This will retrieve all the public posts in the database

**GET** `/api/public`

This will return an object: 
```
[
    {
        "id": 13,
        "title": "Updated New Post Example",
        "description": "New Test Post Description",
        "date": "8/23/2020, 2:57:14 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
        ],
        "is_public": 1,
        "user_id": 1
    },
    {
        "id": 14,
        "title": "Updated New Post Example2",
        "description": "New Test Post Description",
        "date": "8/23/2020, 2:57:14 PM",
        "images": [
            "https://images.idgesg.net/images/article/2019/04/google-shift-100794036-large.jpg"
        ],
        "is_public": 1,
        "user_id": 1
    }
]
```