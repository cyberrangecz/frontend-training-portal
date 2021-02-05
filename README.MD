Implementation of the frontend for KYPO Trainings (former Capture the flag games).

## Prerequisites

- NPM with private [KYPO Nexus repository](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)
- [Angular 11](https://angular.io/guide/quickstart)
- [Angular Material 11](https://material.angular.io/guide/getting-started)

Make sure you have:
- latest version of Chrome
- properly configured local time (until this [PR](https://github.com/manfredsteyer/angular-oauth2-oidc/pull/596) is resolved)

## Usage
This app is a frontend part of the KYPO. To run KYPO locally, follow this [guide](https://gitlab.ics.muni.cz/kypo-crp/prototypes-and-examples/kypo-crp-local-demo).

To run the app locally against the KYPO backend, follow the previously mentioned [guide](https://gitlab.ics.muni.cz/kypo-crp/prototypes-and-examples/kypo-crp-local-demo) with these additional steps:

1.  Configure OIDC client to allow a redirect on `https://localhost:4200`. If your local dummy OIDC issuer is running, you can edit the client on this [address](https://172.19.0.22:8443/csirtmu-dummy-issuer-server/manage/admin/clients).
2.  Configure CORS for kypo-sandbox-service by changing attribute `cors_origin_whitelist` to `cors_origin_whitelist: ["{{ kypo_crp_url }}", "https://localhost:4200"]` and setting attribute `cors_origin_allow_all` to `cors_origin_allow_all: True` in `provisioning/roles/kypo-crp-configuration/templates/configuration/sandbox-service/kypo-sandbox-service-config.yml`
3.  Configure CORS for kypo-training-service by changing attribute `cors.allowed.origins` to `cors.allowed.origins=*` in `provisioning/roles/kypo-crp-configuration/templates/configuration/training-service/kypo-training.properties`
4.  Configure CORS for kypo-user-and-group-service by changing attribute `cors.allowed.origins` to `cors.allowed.origins=*` in `provisioning/roles/kypo-crp-configuration/templates/configuration/user-and-group-service/kypo-user-and-group.properties`
5.  Configure `kypo_crp_instance_name` from default value to your uniquely chosen one in `local-demo-extra-vars.yml`
6.  Run `npm install`
7.  Run `ng serve --ssl` to run the app on `https://localhost:4200`

**NOTE:** You will need to recreate the docker containers after steps 2, 3 and 4. You can do this by running `docker-compose up -d --force-recreate`. This can be run only from `/opt/kypo/` directory.

Alternatively you can use json-server as mock backend with provided dummy data.

1.  Install json-server `npm install -g json-server`.
3.  Run the server with provided parameters `json-server -w ./utils/json-server/db.js --routes ./utils/json-server/routes.json --middlewares ./utils/json-server/server.js`.
4.  Run `npm install`.
5.  Run the app in local environment and ssl `ng serve --configuration=local --ssl` and access it on `https://localhost:4200`.

## Deployment

To deploy on a server:

1.  Make sure you are running all necessary backend services and have access to NPM with private [KYPO Nexus repository](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)
2.  Create new config file. For example `kypo-config.myserver.ts`.
3.  Add the configuration to `configurations` in `angular.json`. For example:

```
"myserver": {
  "fileReplacements": [
    {
      "replace": "src/assets/kypo-config.json",
      "with": "src/environments/kypo-config.myserver.json"
    }
   ]
 }
```

4. Run `npm install`
5. Run `ng build --configuration=myserver`

**NOTE:** If you wish add configuration different from the prod, but it should use all perks of production build (recommended), you must specify following options in angular.json.

Previous example with build for production environment would look like this:

```
"myserver": {
  "fileReplacements": [
      {
        "replace": "src/assets/kypo-config.json",
        "with": "src/environments/kypo-config.myserver.json"
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

Also prefer usage of [Angular Material Components](https://material.angular.io/) and [Material Icons](https://material.io/resources/icons/) if possible.

## Codestyle and Architecture

Codestyle should roughly comply with [Angular Codestyle](https://angular.io/guide/styleguide) and is enforced through [TSLint](https://palantir.github.io/tslint/) and Prettier.

`ng lint` is run before committing, and it blocks your commit if there are lint errors.

Best practices, tips and tricks for new developers can be found [here](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/170).

We try to use smart-dumb architecture in our components and to outsource most of the "business logic" that smart components needs to handle to injected implementations of abstract services to allow for reuse in different context easily.

No state management library, like NGRX is utilized, but the data should flow through services and components in similar architecture as the figure below shows.

![Recommended architecture](https://gitlab.ics.muni.cz/kypo2/frontend-new/kypo2-trainings/wikis/uploads/2ab19735a374e035b509c6a04fb29282/frontend-dataflow.png)
