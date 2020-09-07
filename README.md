# SensatMapp

This project displayes a collection readings in a tabular UI.

## Running the project

1. clone the project

`git clone https://github.com/ghernandez345/sensatmapp.git`

2. cd into project and install all required dependencies

`cd sensatmapp && npm run installDeps`

3. start the project

`npm run dev`

## Running the client tests

1. cd into the client directory

`cd client`

2. run the test command

`npm run test`

## Design considerations

For this project I tried to balance a software design that allowed me to fulfill the project requrements, build in a modual/extendable way, and allow me to implement in a short amount of time.

Below I try to explain some of these design decisions.

### Project Setup

This project is a combination of a SPA seeded from create-react-app and a light express web server. `create-react-app` gave me a good starting point for the web UI and I decided to create the node server to serve the `sensor_readings.json` file. Chome does not allow you to fetch local json files for security reasons and they must be served to the client from a web server.

### Key Modules

The project utilises the single responsibility principle and has some key modules on the client that include:

#### Readings api module

This module is concerned with making api calls for sensor reading resources.

### Table UI component

This module is concerned with displaying a table UI. This component wraps another 3rd party UI component (`material-table`) so that if in the future we'd like to change the 3rd party component we only have to do it here and can keep the interface defined by the Table component.

I chose to use `material-table` as is offered me a quick way to implement the required functionality, but with more time would have done a more thorough investigation on what 3rd party table UIs were available or consider if I should build my own.

### Reading feature module

This module is responsible for bringing together all other required modules (UI, api, aggregator) to create the data reading tables feature.

For this component I chose to utilise react hooks so that I could group my concerns together (e.g. fetching data, setting error states, aggregating data). For a larger project I'd consider more if I'd use these or stick to more established react patterns.

### Aggregator module

This module is responsible for taking in a sensor reading dataset and aggregating that data in some way. For now it only aggregates for the median, but can be extended for other types of aggregations in the future.

I had a bit of fun with this module and wrote it to create a mapping of the readings by sensor type. Readings are added to the appropriate sensor type dataset in a sorted order. Having these sorted readings then made it trivial to calculate for the median for each sensor type.

While this takes more space it greatly improves the speed in which new readings could be added into the existing ones and new aggregations calculated. It may be a preoptimisation, but overall it fulfills the requirements while being able to be extended in the future.

### Sorting utilites module

This module is responsible for offering utility functions for sorting items in an array. These methods are generic and do not care what type of data they are operating on.

## Testing approach

There were a variety of testing approaches taken but one of the key similarities is that each module contains tests only on its public methods while ignoring testing on private functions or internal implementation details. This principle determined the tools and testing approach for each module. Some noteable items to discuss are:

### Extensive use of react-testing-library for UI components

`react-testing-library` is based off the principle of testing your UI in the way that a user would experience it. To me, frontend UI componets benefit most from this type of testing as the output you are asserting against is what a user will see and interact with. I used this tool extensively for UI components so that I can be sure the UI components behaved correctly from a user point of view.

### Standard unit testing for non UI modules

The modules that did not render a UI were tested with standard unit testing practices. The testing was more focused on the fact that they correctly gave an expected result when called and optionally when given an input. Only public functions were unit tested.

### Reading feature testing

This module was testing more with integration testing approach. Since this component brought together many other modules (UI, aggregators, fetch calls) I wanted to make sure these all worked properly together and did not want to mock them in these tests. You can see that the tests render the Reading feature into the virtual dom and makes assertions on what a user sees. It does not care about the internal implementation of the Reading feature.

### Mocking of fetch calls

I choose to mock the use of `fetch` calls to simplify the testing setup. I did not not to make actual api calls for this layer of testing as it seemed unneccesary for client only tests. I'd expect these to be covered at the e2e layer.

### No testing for table UI and interactions

I did not test the table UI and its interactions (e.g. sorting, filtering, pagination, etc...) because this was rendered with a 3rd party library that tests all of this itself. There is no need to test these unless I were to create my own table with this functionality.

## Additional Time Considerations

There is a lot more to consider giving additional time. Some areas I'd consider would include:

- use of 3rd party table UI vs building our own
- more thorough handling of unhappy paths (error states, edge cases, etc...)
- clean up of warnings from using 3rd party libs/tools. I was getting warning from `material-table` and `react-testing-library` that I would have dug into more to resolve given more time.
- more time figuring out CSS approach. I just used the css setup that came with `create-react-app` but would definilty consider it more for a larger application
- consider use of typescript. For a larger project with many devs I'd strongly consider bringing in the typed language to help prevent bugs and make development easier.
- clean up of package.json. There are two package.json files because this is really two projects in one. A light web server, and a web SPA for displaying tabular data. I'd consider either seperating these two projects (ideally), or unifiying their package.json if kept together.
- more elegant handling of data in the web SPA. Right now it is all contained in the Reading feature module, but in a larger applciation I'd most definitly have a architecture that supported proper state management (e.g. redux, mobx, apollo, rx, etc...)
