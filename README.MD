# CyberRangeᶜᶻ Platform Training Portal

Implementation of the frontend for CyberRangeᶜᶻ Platform.

## Prerequisites

You need to have access to Sentinel package repository.
Then, you need to set up the @sentinel scope to point to that registry. You can do this by
adding following lines to your .npmrc file:

```
@sentinel:registry=https://gitlab.ics.muni.cz/api/v4/projects/2396/packages/npm/
```

where `<YOUR_AUTH_TOKEN>` is a Gitlab access token with `read_registry` scope and `api` score of a user with access
to [Sentinel package repository](https://gitlab.ics.muni.cz/sentinel/sentinel-artifact-repository)

Make sure you have latest version of Chrome.

## Usage

This app is a frontend part of the CyberRangeᶜᶻ Platform. To run CyberRangeᶜᶻ Platform locally, follow
this [guide](https://github.com/cyberrangecz/devops-helm).

To run the app locally against the CyberRangeᶜᶻ Platform backend, follow the previously
mentioned [guide](https://github.com/cyberrangecz/devops-helm) with these additional steps:

1. Run and configure a OIDC client to allow a redirect on `https://localhost:4200`.
2. Configure CORS for sandbox-service by changing attribute `cors_origin_whitelist` to
   `cors_origin_whitelist: ["{{ crp_url }}", "https://localhost:4200"]` and setting attribute
   `cors_origin_allow_all` to `cors_origin_allow_all: True` in
   `provisioning/roles/crp-configuration/templates/configuration/sandbox-service/sandbox-service-config.yml`
3. Configure CORS for training-service by changing attribute `cors.allowed.origins` to `cors.allowed.origins=*` in
   `provisioning/roles/crp-configuration/templates/configuration/training-service/training.properties`
4. Configure CORS for user-and-group-service by changing attribute `cors.allowed.origins` to
   `cors.allowed.origins=*` in
   `provisioning/roles/crp-configuration/templates/configuration/user-and-group-service/user-and-group.properties`
5. Configure `crczp_instance_name` from default value to your uniquely chosen one in `local-demo-extra-vars.yml`
6. Run `npm install`
7. Run `ng serve --ssl` to run the app on `https://localhost:4200`

**NOTE:** You will need to recreate the docker containers after steps 2, 3 and 4. You can do this by running
`docker-compose up -d --force-recreate`. This can be run only from `/opt/crczp/` directory.

Alternatively you can use json-server as mock backend with provided dummy data.

1. Run `npm install`.
2. Run the mock server with provided parameters via `npm run api`.
3. Run the app in local environment and ssl `ng serve --configuration=local --ssl` and access it on
   `https://localhost:4200`.

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

`ng lint` is run before committing, and it blocks your commit if there are lint errors.

We try to use smart-dumb architecture in our components and to outsource most of the "business logic" that smart
components needs to handle to injected implementations of abstract services to allow for reuse in different context
easily.
