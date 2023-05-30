# WeatherApp

## Run Application
1. cd weather-app
2. npm install
3. npm start

## Architecture
Separation of layers was used to make the interchanging of functionality easier between the various components of the application

src/components
  - This folder contains all the re-usable components that can be used by the containers
src/containers
  - This folder contains all the main pages that the Application Routes to
src/context
  - Used for files containing the Context classes. 
src/services
  - Used as a API layer that is used to house calls to external partners or API's
