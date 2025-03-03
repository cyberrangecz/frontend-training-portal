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
recommended), you must specify the build option in angular.json.

Previous example with build for production environment would look like this:

```json
"myserver": {
  "fileReplacements": [
      {
        "replace": "src/assets/config.json",
        "with": "src/environments/config.myserver.json"
      }
   ],
   ...
 }
```
