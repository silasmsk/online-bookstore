# Online Bookstore

Online Bookstore is a cloud-based web application developed as a Cloud Computing project. The application allows users to browse books, search and filter the catalog, view book details, manage a shopping cart, place orders, and view their order history.

## Live Application

https://online-bookstore-oqoh.onrender.com

## Features

- Browse available books
- Search books by title or author
- Filter books by category
- View detailed book information
- Add books to the shopping cart
- Increase or decrease item quantities
- Remove items from the cart
- Place orders
- View order history and order status
- Serverless order confirmation

## Architecture

The project follows a microservice-based architecture and consists of separate frontend, catalog, and order components.

### Frontend

The frontend is built with HTML, CSS, and JavaScript. It communicates with the backend services using REST API requests.

### Catalog Service

The Catalog Service is a Spring Boot microservice responsible for providing book catalog data.

### Order Service

The Order Service is a Spring Boot microservice responsible for creating and retrieving customer orders.

### Serverless Order Confirmation

A Cloudflare Worker is used as a serverless component for order confirmation. After an order is successfully created, the application sends the order information to the Worker, which returns a confirmation response.

## Technologies

- HTML
- CSS
- JavaScript
- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- REST APIs
- Docker
- Kubernetes
- Minikube
- Render
- Cloudflare Workers
- ImageKit

## Cloud Deployment

The application uses several cloud services:

- Frontend: Render Static Site
- Catalog Service: Render
- Order Service: Render
- Database: PostgreSQL
- Book image hosting: ImageKit
- Serverless order confirmation: Cloudflare Workers

## Docker

The Catalog Service and Order Service are containerized using Docker.

Each microservice contains its own Dockerfile, allowing the services to be built and deployed independently.

## Kubernetes

Kubernetes manifests are stored in the `kubernetes` directory.

The project contains:

- `catalog-deployment.yaml`
- `catalog-service.yaml`
- `order-deployment.yaml`
- `order-service.yaml`

The Catalog Service and Order Service were deployed and tested locally using Minikube.

To deploy the services:

```bash
kubectl apply -f kubernetes/catalog-deployment.yaml
kubectl apply -f kubernetes/catalog-service.yaml
kubectl apply -f kubernetes/order-deployment.yaml
kubectl apply -f kubernetes/order-service.yaml
```

To check the running resources:

```bash
kubectl get pods
kubectl get services
```

## REST API

### Catalog Service

```text
GET /api/books
```

Returns the available books.

### Order Service

```text
GET /api/orders
```

Returns existing orders.

```text
POST /api/orders
```

Creates a new order.

## Serverless Function

The Cloudflare Worker receives order information using a POST request.

Example request:

```json
{
  "orderId": 4,
  "totalPrice": 37.98
}
```

Example response:

```json
{
  "success": true,
  "orderId": 4,
  "totalPrice": 37.98,
  "message": "Order #4 confirmed! Thank you for your purchase."
}
```

## Project Structure

```text
online-bookstore/
├── frontend/
├── catalog-service/
├── order-service/
├── kubernetes/
└── README.md
```

## Author

Developed as a Cloud Computing course project.