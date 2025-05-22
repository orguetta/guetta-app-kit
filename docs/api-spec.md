# API Specification

## Overview
This document outlines the API specifications for the application. It includes endpoints, request/response formats, authentication methods, and error handling.

## Base URL
```
https://api.example.com/v1
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer {token}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2023-01-01T00:00:00Z"
    },
    "token": "jwt_token"
  }
}
```

#### POST /auth/login
Authenticate a user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token"
  }
}
```

### Resources

#### GET /resources
Get all resources.

**Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Number of items per page

**Response:**
```json
{
  "status": "success",
  "data": {
    "resources": [
      {
        "id": "uuid",
        "name": "Resource 1",
        "description": "Description of resource 1",
        "created_at": "2023-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "pages": 10
    }
  }
}
```

#### GET /resources/:id
Get a specific resource.

**Response:**
```json
{
  "status": "success",
  "data": {
    "resource": {
      "id": "uuid",
      "name": "Resource 1",
      "description": "Description of resource 1",
      "created_at": "2023-01-01T00:00:00Z"
    }
  }
}
```

#### POST /resources
Create a new resource.

**Request:**
```json
{
  "name": "New Resource",
  "description": "Description of new resource"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "resource": {
      "id": "uuid",
      "name": "New Resource",
      "description": "Description of new resource",
      "created_at": "2023-01-01T00:00:00Z"
    }
  }
}
```

#### PUT /resources/:id
Update a resource.

**Request:**
```json
{
  "name": "Updated Resource",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "resource": {
      "id": "uuid",
      "name": "Updated Resource",
      "description": "Updated description",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-02T00:00:00Z"
    }
  }
}
```

#### DELETE /resources/:id
Delete a resource.

**Response:**
```json
{
  "status": "success",
  "data": null
}
```

## Error Handling

The API returns consistent error objects with the following format:

```json
{
  "status": "error",
  "error": {
    "code": "error_code",
    "message": "Error message",
    "details": {} // Optional additional details
  }
}
```

### Common Error Codes

- `auth_error`: Authentication error
- `validation_error`: Invalid input data
- `not_found`: Resource not found
- `server_error`: Internal server error

## Rate Limiting

The API implements rate limiting to protect against abuse. The following headers will be included in responses:

- `X-RateLimit-Limit`: Number of requests allowed in a time window
- `X-RateLimit-Remaining`: Number of requests remaining in the current time window
- `X-RateLimit-Reset`: Time at which the rate limit resets

## Versioning

The API uses URL versioning (e.g., `/v1/resource`). When making breaking changes, a new version will be released.

---

*Note: This is a template API specification. Update it according to your specific project requirements.*