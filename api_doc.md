# Branded Things API Documentation

## Endpoints :

List of available endpoints:

-   `POST /products`
-   `GET /products`
-   `GET /products/:id`
-   `DELETE /products/:id`
-   `PUT /products/:id`
-   `PATCH /products/:id`
-   `GET /categories`
-   `GET /users`
-   `POST /users/register`
-   `POST /users/login` 
-   `POST /users/googlelogin` 
-   `GET /histories`
-   `POST /customers/register`
-   `POST /customers/login`
-   `GET /customers/products`
-   `GET /customers/allproducts`
-   `GET /customers/products/:productId`
-   `POST /customers/googlelogin`
-   `POST /customers/wishlist/:productId`
-   `GET /customers/wishlist`


## 1. POST /register

Endpoint GET /register menambahkan data customer ke dalam database.
Response Status:  **201**  - CREATED
Response Body:
```json
[
    {
        "id": 1,
        "username": "Helmi",
        "email": "helmiam@mail.com",
        "password": "$2a$10$on22Dq3UOp9M/0LA2V5C0.6KlXbQFOFcr5Tjxfg1B6LRsRLdGCMwi",
        "isBuy": false,
        "updatedAt": "2023-01-28T00:54:30.095Z",
        "createdAt": "2023-01-28T00:54:30.095Z"
    }
]
```

Response Error: **400** - Bad Request
```json
{
    "message": [
        {
            "message": "Email must be unique"
        }
    ]
}
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal server error"
}
```


## 2. POST /login

Endpoint GET /login untuk mengakses endpoint /buy-invitation, /generate-midtrans-token, /createinvitation.
Response Status:  **200**  - OK
Response Body:
```json
[
    {
        "access_token": "here_tokens",
        "username": "Helmi",
        "email": "helmiam@mail.com",
        "isBuy": false
    }
]
```

Response Error: **401** - Unauthorized
```json
{
    "message": "Wrong email or password"
}
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal server error"
}
```

## 3. POST /googlelogin

Endpoint GET /googlelogin untuk menambahkan data customer ke dalam database dan mengakses endpoint /buy-invitation, /generate-midtrans-token, /createinvitation.
Response Status:  **200**  - OK
Response Body:
```json
[
    {
    "access_token": "here_tokens",
    "username": "Helmi",
    "email": "helmiariefm@gmail.com",
    "isBuy": false
}
]
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal server error"
}
```

## 4. GET /generatequotes

Endpoint Get /generatequotes digunakan untuk mendapatkan love quotes secara random
Response Status:  **200**  - OK
```json
[
    {
        "quote": "Love is trembling happiness.",
        "author": "Khalil Gibran",
        "category": "love"
    }
]
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal server error"
}
```

## 5. GET /buy-invitation

Endpoint PATCH /buy-invitation untuk mengubah status pembayaran customer dari false menjadi true.
Request Headers: 
```json
[
    {
        "access_token": "here_tokens"
    } 
]
```
Response Status:  **200**  - OK
```json
    {
        "access_token": "here_tokens",
        "username": "Helmi",
        "email": "helmiam@mail.com",
        "isBuy": true
    }
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal server error"
}
```

## 6. POST /generate-midtrans-token

Endpoint PATCH /generate-midtrans-token untuk mengenerate token midtrans untuk keperluan permbayaran.
Request Headers: 
```json
[
    {
        "access_token": "here_tokens"
    } 
]
```
Response Status:  **201**  - OK
```json
    {
        "token": "69ba164f-ea51-4811-ad0e-65d7616ac0bf",
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/69ba164f-ea51-4811-ad0e-65d7616ac0bf"
    }
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal server error"
}
```

## 7. POST /createinvitation

Endpoint POST /createinvitation menambahkan data customers ke dalam database untuk digunakan sebagai data undangan.
Response Status:  **201**  - CREATED
Response Body:
```json
{
    "id": 4,
    "routeName": "romeowjulied",
    "cpw": "Julied",
    "cpp": "Romeow",
    "weddingDay": "2023-02-08T17:45:01.433Z",
    "greeting": "Bismillah",
    "akadStart": "17:45:01.433902",
    "akadEnd": "17:45:01.433902",
    "resepsiStart": "17:45:01.433902",
    "resepsiEnd": "17:45:01.433902",
    "location": "Jakarta",
    "quote": "Love is trembling happiness.",
    "CustomerId": 1,
    "updatedAt": "2023-02-08T17:45:01.424Z",
    "createdAt": "2023-02-08T17:45:01.424Z"
}
```

Response Error: **500** - Internal Server Error
```json
{
    "message": "Internal sesrver error"
}
```