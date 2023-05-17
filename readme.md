# Apparel Management REST API

This is a REST API built with Node.js and TypeScript for managing apparel stock and processing customer orders.

## Getting Started

Follow the instructions below to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/pankajyadav05/fresh-prints-node
   ```

2. Navigate to the project directory:

   ```shell
   cd fresh-prints-node
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

### Starting the Server

To start the server, run the following command:

```shell
npm run start
```

The server will start running on `http://localhost:3000`.

### API Endpoints

The following API endpoints are available:

- **Update the stock quality and price of one apparel code and size**

  - URL: `PUT /apparel/:code/size/:size`
  - Request body:
    ```json
    {
      "stockQuality": 50,
      "price": 29.99
    }
    ```
  - Response: HTTP 200 (Ok)
    ```json
    {
      "message": string
    }
    ```
  - Error Response
    ```json
    {
      "errorCode": 1001,
      "message": "Apparel not found"
    }
    ```

- **Update the stock quality and price of several apparel codes and sizes**

  - URL: `PUT /apparel/bulk`
  - Request body:
    ```json
    {
      "stocks": [
        {
          "code": "ABC123",
          "size": "S",
          "stockQuality": 50,
          "price": 29.99
        },
        {
          "code": "DEF456",
          "size": "M",
          "stockQuality": 100,
          "price": 39.99
        }
      ]
    }
    ```
  - Response: HTTP 200 (Ok)
    ```json
    {
      "message": string
    }
    ```

- **Check if a customer order can be fulfilled**

  - URL: `POST /order/fulfillment`
  - Request body:
    ```json
    {
      "code": "ABC123",
      "size": "S",
      "stockQuality": 2
    }
    ```
  - Response: HTTP 200 OK
    ```json
    {
      "canFulfill": string
    }
    ```

- **Get the lowest cost to fulfill a customer order**

  - URL: `POST /order/lowest-cost`
  - Request body:
    ```json
    {
      "code": "ABC123",
      "size": "S",
      "stockQuality": 2
    }
    ```
  - Response: HTTP 200 OK
    ```json
    {
      "lowestCost": number
    }
    ```
  - Error Response
    ```json
    {
      "errorCode": 1002,
      "message": "Stock not available"
    }
    ```

### Making API Calls

You can use a tool like [Postman](https://www.postman.com/) to make API calls to the endpoints mentioned above. Follow these steps to make an API call using Postman:

1. Launch Postman.
2. Set the HTTP method (e.g., PUT, POST).
3. Enter the URL for the desired API endpoint (e.g., `http://localhost:3000/apparel/ABC123/size/S`).
4. Set the request body as mentioned in the API documentation.
5. Click the "Send" button to make the API call.
6. View the response received from the server.

Please note that you need to replace http://localhost:3000 with the appropriate URL if you are deploying the server to a different environment.

## Error Handling

The API includes error handling for certain scenarios. Here are the error codes that can be encountered:

```shell
422: Invalid Request Body
```

```json
Error code: 422
Message: The JSON object submitted is not valid.
1001: Apparel Not Found
```

```json
Error code: 1001
Message: The requested apparel code or size was not found.
1002: Stock Not Available
```

```json
Error code: 1002
Message: The stock for the requested apparel code and size is not available.
In case of an error, the API will respond with an error object containing the appropriate error code and message.
```

Please note that these are just examples, and you can modify the error codes and messages according to your specific requirements.
