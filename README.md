# SensatMapp

This project displayes a collection readings in a tabular UI.

## Running the project

1. clone the project

`git@github.com:ghernandez345/sensatmapp.git`

2. install all required dependencies

`npm i`

3. start the project

`npm run start`

## Design considerations

For the project I tried to balance the software design that allowed me to fulfill the project requrements , while still allowing me to implement in a short amount of time.

Below I try to explain and elaborate on some of these design decisions. 

### Server to serve json

I decided to create a really quick node server to serve the `sensor_readings.json` file. Chome does not allow you to fetch local json files for security reasons and they must be served to the client from a web server. This quick node server allowed me to request this data on the client and serve it in the response.
