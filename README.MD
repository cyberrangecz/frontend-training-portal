# CyberRangeᶜᶻ Platform Training Portal

Implementation of the frontend for CyberRangeᶜᶻ Platform.

## Prerequisites

- You need to have access to Sentinel package repository.
Then, you need to set up the @sentinel scope to point to that registry. You can do this by
adding following lines to your .npmrc file:

    ```
    @sentinel:registry=https://gitlab.ics.muni.cz/api/v4/projects/2396/packages/npm/
    //gitlab.ics.muni.cz/api/v4/projects/2396/packages/npm/:_authToken=<YOUR_AUTH_TOKEN>
    ```

    where `<YOUR_AUTH_TOKEN>` is a Gitlab access token with `read_registry` scope and `api` score of a user with access
    to [Sentinel package repository](https://gitlab.ics.muni.cz/sentinel/sentinel-artifact-repository)

- For running the app, you will need to have node version >=18.19.1 and backend services running.

## Running the app locally against the CyberRangeᶜᶻ Platform backend

1. Configure and run the [Helm deployment](https://github.com/cyberrangecz/devops-helm). Make sure to use `development: true` for Keycloak configuration in `vagrant-values.yaml`. This will add `https://localhost:4200` to the OIDC redirect URIs.
   - in case, you need to override CORS, edit it in the (Helm deployment file)[https://github.com/cyberrangecz/devops-helm/blob/master/helm/crczp-head/values.yaml]using corsWhitelist
2. Run `npm install`
3. Run `ng serve --ssl`
4. Open `https://localhost:4200` in your browser. The app will automatically reload if you change any of the source files. App will be using self-signed certificate, so you need to accept it in your browser.

## Deployment

To deploy on a server:

1. Make sure you are running all necessary backend services.
2. Create new config file. For example `config.myserver.ts`.
3. Add the configuration to `configurations` in `angular.json`. For example:

```
"myserver": {
  "fileReplacements": [
    {
      "replace": "src/assets/config.json",
      "with": "src/environments/config.myserver.json"
    }
   ]
 }
```

4. Run `npm install`
5. Run `ng build --configuration=myserver`

**NOTE:** If you wish add configuration different from the prod, but it should use all perks of production build (
recommended), you must specify following options in angular.json.

Previous example with build for production environment would look like this:

```
"myserver": {
  "fileReplacements": [
      {
        "replace": "src/assets/config.json",
        "with": "src/environments/config.myserver.json"
      }
   ],
   "optimization": true,
   "outputHashing": "all",
   "sourceMap": false,
   "extractCss": true,
   "namedChunks": false,
   "aot": true,
   "extractLicenses": true,
   "vendorChunk": false,
   "buildOptimizer": true
 }
```

## Documentation

You can generate documentation with tools like [Compodoc](https://compodoc.app/) or [TypeDoc](https://typedoc.org/)

## UX/UI Guidelines

If extending the project, consult [Google Material Guildelines](https://material.io/design/guidelines-overview/).

Also prefer usage of [Angular Material Components](https://material.angular.io/)
and [Material Icons](https://material.io/resources/icons/) if possible.

## Codestyle and Architecture

Codestyle should roughly comply with [Angular Codestyle](https://angular.io/guide/styleguide) and is enforced
through [TSLint](https://palantir.github.io/tslint/) and Prettier.

`prettier-check` is run before committing, and it blocks your commit if there are lint errors.

We try to use smart-dumb architecture in our components and to outsource most of the "business logic" that smart
components needs to handle to injected implementations of abstract services to allow for reuse in different context
easily.
