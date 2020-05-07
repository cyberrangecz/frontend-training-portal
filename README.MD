Implementation of the frontend for KYPO Trainings (former Capture the flag games).

- Contact person: [Vit Rusňák](mailto:rusnak@ics.muni.cz)
- Lead developer: [Martin Hamerník](https://gitlab.ics.muni.cz/xhamern2)
- Developer: [Erik Kočamba](https://gitlab.ics.muni.cz/445661)
- Developer: [Igor Ignác](https://gitlab.ics.muni.cz/igorignac5)
- Visualizations developer: [Karolína Burská](https://gitlab.ics.muni.cz/396296)
- Former visualizations developer: [Hai Duong Tran](https://gitlab.ics.muni.cz/445437)

## Prerequisites

- NPM with private [KYPO Nexus repository](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)
- [Angular v8](https://angular.io/guide/quickstart)
- [Angular Material v8](https://material.angular.io/guide/getting-started)

Make sure you have:
- latest version of Chrome
- properly configured local time (until this [PR](https://github.com/manfredsteyer/angular-oauth2-oidc/pull/596) is resolved)

## UX/UI Guidelines
If extending the project, consult [Google Material Guildelines](https://material.io/design/guidelines-overview/).

Also prefer usage of [Angular Material Components](https://material.angular.io/) and [Material Icons](https://material.io/resources/icons/) if possible.

## Codestyle and Architecture

Codestyle should roughly comply with [Angular Codestyle](https://angular.io/guide/styleguide) and is enforced through [TSLint](https://palantir.github.io/tslint/).

Best practices, tips and trick for new developers can be found [here](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/170).

We try to use smart-dumb architecture in our components and to outsorce most of the "business logic" that smart components needs to handle to injected mplementations of abstract services to allow for reuse in different context easily.

No state management library, like NGRX is utilized but the data should flow through services and components in similar architecture as the figure below shows.

![Recommended architecture](https://gitlab.ics.muni.cz/kypo2/frontend-new/kypo2-trainings/wikis/uploads/2ab19735a374e035b509c6a04fb29282/frontend-dataflow.png)


## Documentation

You can generate documentation with tools like [Compodoc](https://compodoc.app/) or [TypeDoc](https://typedoc.org/)

## Usage

You can use the app:

- [Production environment](http://147.251.124.178)
- [Development environment](https://kypo-devel.ics.muni.cz/)
- Locally

To run the app locally you will need to configure several backend services.

- [Trainings service](https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-training)
- [User and group service](https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-user-and-group)
- [Security commons](https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-security-commons)
- [Topology service](https://gitlab.ics.muni.cz/kypo2/services-and-portlets/kypo2-topology)
- [Openstack service](https://gitlab.ics.muni.cz/kypo2/openstack/kypo2-django-openstack)

1.  Then edit `environments.ts` file and provide urls of your services.
2.  Run `npm install`
3.  Run `ng serve` to run the app on `localhost:4200`

Alternatively you can use json-server as mock backend with provided dummy data.

1.  Install json-server `npm install -g json-server`.
2.  Deploy server with provided parameters `json-server db.js --routes routes.json --middlewares server.js`.
3.  Run `npm install`.
4.  Run the app in local environment and ssl `ng serve --configuration=local --ssl` and access it on `https://localhost:4200`.

## Deployment

To deploy on server:

1.  Make sure you are running all necessary backend services, and access to NPM with private [KYPO Nexus repository](https://projects.ics.muni.cz/projects/kbase/knowledgebase/articles/153)
2.  Create new environment file. For example `environment.myserver.ts`
3.  Add configuration to `configurations` in `angular.json`. For example:

```
"myserver": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.myserver.ts"
    }
   ]
 }
```

4. Run `npm install`
5. Run `ng build --configuration=myserver`

**NOTE:** If you wish add configuration different than prod but it should use all perks of production build (recommended), you must specify following options in angular.json.

Previous example with build for production environment would look like this:

```
"myserver": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.myserver.ts"
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
