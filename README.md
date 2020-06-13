# DC Cohort Tracker

A cohort student github progress tracker based off of Veronica Lino's concept:
https://github.com/vlino2015/github_class_tracker

## Installation

Clone repository
and then run:

```npm install```

You need to goto:
https://github.com/settings/applications/new

and register your app (for testing use localhost:3000 as the url)

rename config.sample.js to config.js and update the client_id and client_secret with the information from when you registered the app.

The cohorts and students are saved to localhost. If you want to save them to a db or file for multi-machine usage it should be straightforward enough.

## Deployment
This is a react app so you will need to use a CI run the react build command to create a production versions.

React build:
```npm run build```

