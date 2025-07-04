# Product Search Assignment

This project is a microservices-based product search system using PostgreSQL, Elasticsearch, Kafka, and supporting services. All services are orchestrated using Docker Compose for easy local development and testing.

## Overview

- **PostgreSQL**: Stores product catalog data.
- **Elasticsearch**: Provides fast, full-text search capabilities for products.
- **Kafka**: Handles event-driven communication between services (e.g., product creation events).
- **Zookeeper**: Required by Kafka for managing brokers.
- **Other Services**: Application services for product management, search, and consumers.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose installed

## Setup Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/dhruvinpatel0987/product-search-assignment.git
   cd product-search-assignment
   ```

2. **Copy and configure environment variables**
   - If an `.env` file is required, copy `.env.example` to `.env` and adjust as needed.

3. **Start all services using Docker Compose**
   ```sh
   docker-compose up --build
   ```
   This will start PostgreSQL, Elasticsearch, Kafka, Zookeeper, and all application services.

4. **Verify services are running**
   - PostgreSQL: `localhost:5436`
   - Elasticsearch: `localhost:9200`
   - Kafka: `localhost:9092`

5. **Access the application**
   - Use API endpoints as described in the project documentation.
   - Use Kibana to explore Elasticsearch data (optional).

6. **Stopping the services**
   ```sh
   docker-compose down
   ```

## Notes

- Make sure Docker has at least 4GB of memory allocated for smooth operation.
- For development, all data is stored in Docker volumes. To reset all data, use:
  ```sh
  docker-compose down -v
  ```
