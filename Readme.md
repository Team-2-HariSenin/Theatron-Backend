# TEATRON API DOCUMENTATION

## User API Specification

### Registration User

- Endpoint : POST /api/auth/register
- Request Body :

```json
{
  "name": "jhon",
  "email": "jhon@example.com",
  "password": "Jh0nDoe!"
}
```

- Response Success :

```json
{
  "message": "User successfully registered",
  "data": null
}
```

- Response Error :

```json
{
  "message": "Email already registered",
  "data": null
}
```

### Login User

- Endpoint : /api/auth/login
- Request Body :

```json
{
  "email": "jhon@example.com",
  "password": "Jh0nDoe!"
}
```

- Response Success :

```json
{
  "message": "User successfully logged in",
  "data": {
    "token": "<token>"
  }
}
```

- Response Error :

```json
{
  "message": "Invalid email / password",
  "data": null
}
```

## Movie API Specification

### Get Movie List By Category

- Endpoint : GET /api/movie/category/1?limit=1
- Response Success:

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Drama",
    "categoryMovies": [
      {
        "id": 1,
        "name": "The Architecture of Love",
        "url_poster": "/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
        "rate_average": "6.0000",
        "rate_count": 2
      }
    ]
  }
}
```

- Respon Error:

```json
{
  "message": "Category not found"
}
```

### Get Movie List By Director

- Endpoint : GET /api/movie/director/1?limit=1
- Response Success:

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Teddy Soeriaatmadja",
    "movieDirector": [
      {
        "id": 1,
        "name": "The Architecture of Love",
        "url_poster": "/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
        "rate_average": "6.0000",
        "rate_count": 2
      }
    ]
  }
}
```

- Respon Error:

```json
{
  "message": "Director not found"
}
```

### Get Movie List By Writer

- Endpoint : GET /api/movie/writer/1?limit=1
- Response Success:

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Ika Natassa",
    "writerMovies": [
      {
        "id": 1,
        "name": "The Architecture of Love",
        "url_poster": "/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
        "rate_average": "6.0000",
        "rate_count": 2
      }
    ]
  }
}
```

- Respon Error:

```json
{
  "message": "Writer not found"
}
```

### Get Movie List By Star

- Endpoint : GET /api/movie/star/1?limit=1
- Response Success:

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "Nicholas Saputra",
    "starMovies": [
      {
        "id": 1,
        "name": "The Architecture of Love",
        "url_poster": "/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
        "rate_average": "6.0000",
        "rate_count": 2
      }
    ]
  }
}
```

- Respon Error:

```json
{
  "message": "Star not found"
}
```

### Get Movie Detail

- Endpoint : GET /api/movie/1
- Response Success :

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "The Architecture of Love",
    "url_poster": "/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
    "url_image": "/vriMtND9PhI7lBQI6n0yUsJ6msP.jpg",
    "overview": "Raia is a famous writer who suffers from writer's block. In order to get inspired again, he then went to New York. It was in that city that Raia met River and then got involved in a love story that was overshadowed by the past.",
    "rate_average": "6.0000",
    "rate_count": 2,
    "watchlist_count": 0,
    "trailers": [
      {
        "id": 1,
        "id_movie": 1,
        "title": "The Architecture of Love Final Trailer | Apa Sih Maunya Nicholas Saputra?",
        "duration": "1.03",
        "key": "d5PViAkoENI"
      }
    ],
    "director": {
      "id": 1,
      "name": "Teddy Soeriaatmadja"
    },
    "writers": [
      {
        "id": 1,
        "name": "Ika Natassa"
      },
      {
        "id": 2,
        "name": "Alim Sudio"
      }
    ],
    "stars": [
      {
        "id": 1,
        "name": "Nicholas Saputra"
      },
      {
        "id": 2,
        "name": "Putri Marino"
      },
      {
        "id": 3,
        "name": "Jerome Kurnia"
      }
    ],
    "categories": [
      {
        "id": 1,
        "name": "Drama"
      },
      {
        "id": 2,
        "name": "Romance"
      }
    ]
  }
}
```

## Watchlist API Specification

### Get All Watchlist

- Endpoint : GET /api/watchlist
- Response Success:

```json
{
  "message": "Success",
  "data": {
    "id": 1,
    "name": "John",
    "userWatchlist": [
      {
        "id": 1,
        "name": "The Architecture of Love",
        "url_poster": "/4tT9N7IeZtvWYsbGJsbIOGQ36b5.jpg",
        "rate_average": "6.0000",
        "rate_count": 2
      }
    ]
  }
}
```

### Get Watchlist Status By Id Movie

- Endpoint : GET /api/watchlist/1
- Response Success:

```json
{
  "data": {
    "watchlist": true
  }
}
```

### Toggle Movie to Watchlist

- Endpoint : POST /api/watchlist/toggle?id_movie=1
- Response Success:

```json
{
  "message": "Successfully added movie to watchlist",
  "data": {
    "id_user": 1,
    "id_movie": 1,
    "watchlist": true
  }
}
```

## Rate API Specification

### Add / Update Rate Movie

- Endpoint : POST api/rate
- Request Body :

```json
{
  "id_movie": 1,
  "rate": 10
}
```

- Respone Success :

```json
{
  "message": "Rating Added / Update successfully",
  "data": {
    "id_user": 1,
    "id_movie": 1,
    "rate": 10
  }
}
```

## Admin API Specification

### Add Movie

- Endpoint : POST api/admin/
- Request Body :

```json
{
  "name": "Nenek Gayung",
  "overview": "Lorem Ipsum",
  "url_poster": "www.example",
  "url_image": "www.example",
  "director": {
    "id": 1,
    "name": "Director1"
  },
  "writer": [
    {
      "id": 1,
      "name": "Writer1"
    }
  ],
  "star": [
    {
      "id": 1,
      "name": "Star1"
    }
  ],
  "category": [
    {
      "id": 1,
      "name": "Category1"
    }
  ]
}
```

- Respone Success :

```json
{
  "message": "Rating Added / Update successfully",
  "data": {
    "id_user": 1,
    "id_movie": 1,
    "rate": 10
  }
}
```

# Cara Mendapatkan Url Video Trailer, Url Thumbnail Trailer, dll

## Gunakan "key" yang didapatkan dari movie detail

**key** adalah id video youtube, anda dapat menggunakanya untuk beberapa hal:

- Untuk Embed Video Youtube :

```jsx
<iframe src="https://www.youtube.com/embed/{key}"></iframe>
```

- Untuk Mendapatkan Url Video Youtube :

```
https://youtu.be/{key}?si=05yLg--t7b22gtSc
```

- Untuk Mendapatkan Url Thumbnail Youtube :

```
https://i.ytimg.com/vi/{key}/hq720.jpg
```
