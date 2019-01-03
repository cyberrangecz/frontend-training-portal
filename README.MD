Implementation of the frontend for KYPO Trainings (former Capture the flag games).

- Contact person: [Vit Rusňák](mailto:rusnak@ics.muni.cz)
- Lead developer: [Martin Hamerník](https://gitlab.ics.muni.cz/xhamern2)
- Visualizations developer: [Hai Duong Tran](https://gitlab.ics.muni.cz/445437)

## Prerequisites
- [Angular v7](https://angular.io/guide/quickstart)
- [Angular Material](https://material.angular.io/guide/getting-started)
- [Trainings REST API](https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-training)
- [MUNI OIDC Client](https://oidc.ics.muni.cz/oidc/)
- [JSON-Server](https://www.npmjs.com/package/json-server) (only temporary, until full REST API is implemented)

## Initial Configuration
You need to configure environments.ts file located in project directory.
```
  production: false,
  // REST API PATHS
  trainingRestBasePath: 'http://localhost:8080/kypo2-rest-training/api/v1/',
  usersEndpointUri: 'http://localhost:3000/users/',
  sandboxDefsEndpointUri: 'http://localhost:3000/sandbox-definitions/',
  trainingDefsEndpointUri:  this.trainingRestBasePath + 'training-definitions/',
  trainingInstancesEndpointUri: this.trainingRestBasePath +  + 'training-instances/',
  trainingRunsEndpointUri:  this.trainingRestBasePath + 'training-runs/',
  levelsEndpointUri:  this.trainingRestBasePath + 'levels/',

  // BEHAVIOUR SETTINGS
  defaultAlertDuration: 2500, // 0 to display until user dismisses it
  defaultPaginationSize: 5,

  // OIDC SETTINGS
  // Url of the Identity Provider
  issuer: 'https://oidc.ics.muni.cz/oidc/',
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'Your OIDC Client ID here',
  // set the scope for the permissions the client should request
  scope: 'openid profile email',
  sessionChecksEnabled: false,
```

## Getting Started
To run and test the application locally you need to checkout to branch devel.

1. Run ```npm install```
2. Run json-server with ```$ json-server -w db.json -r routes.json```
3. Run ```ng serve```
3. Run Trainings REST API locally
4. Access ```localhost:4200```