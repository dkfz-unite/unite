# Web Portal

Shared architecture, development workflows, and agent instructions:
[UNITE project documentation](https://github.com/dkfz-unite/.github/blob/main/README.md).

## General
Web portal giving access to data with the following functionality:
- Cross reference search queries
- Detailed overview of data entries
- Dataset management tools - save named search-criteria presets with descriptions and view matching data/modality availability
- Data upload/download tools
- Data export tools
- Data visualisation
- Data analysis

Web portal includes several components:
- Web server - ASP.NET web server hosting static files of the frontend SPA.
- Reverse proxy - ASP.NET middleware forwarding frontend calls to Composer, identity, analysis, and feed APIs.
- Frontend SPA - Vue.js single page web application.

The frontend source is in `Unite.Web/Client`. The current package scripts use
Vite, and the server hosts the built application from `Client/dist`.
`Unite.Web/Program.cs` configures hosting and the active custom proxy middleware.

Saved datasets are presets of search criteria, persisted by Composer in MongoDB
`user-data.datasets`. The dataset record contains name, description, search
domain, date, user identifier, and serialized criteria. The datasets page
queries domain search statistics to show matching data and modality availability;
analysis controls use method-specific eligibility requirements. See
`Client/src/datasets` and the shared dataset-save controls in `Client/src/domain`.

## Dependencies
- [Composer](https://github.com/dkfz-unite/unite-composer) - composer web api.

## Access
Environment|Address|Port
-----------|-------|----
Host|https://localhost|80;443
Docker|https://portal.unite.net|80;443

## Configuration
To configure the application, change environment variables:
Variable|Description|Default(Local)|Default(Docker)
--------|-----------|--------------|---------------
ASPNETCORE_ENVIRONMENT|ASP.NET environment|Debug|Release
UNITE_LEGAL_NOTICE_URL|Legal notice link in the footer|Empty|Empty
UNITE_PRIVACY_POLICY_URL|Privacy policy link in the footer|Empty|Empty
UNITE_IDENTITY_HOST|Identity web api|http://localhost:5000|http://identity.unite.net
UNITE_COMPOSER_HOST|Composer web api|http://localhost:5002|http://composer.unite.net
UNITE_ANALYSIS_HOST|Analysis Web api|http://localhost:5004|http://analysis.unite.net
UNITE_DONORS_FEED_HOST|Donors feed web api|http://localhost:5100|http://feed.donors.unite.net
UNITE_IMAGES_FEED_HOST|Images feed web api|http://localhost:5102|http://feed.images.unite.net
UNITE_SPECIMENS_FEED_HOST|Specimens feed web api|http://localhost:5104|http://feed.specimens.unite.net
UNITE_OMICS_FEED_HOST|Omics feed web api|http://localhost:5106|http://feed.omics.unite.net

The frontend loads these two optional links from `/api/config` when the page opens. Empty links are hidden. Set the URLs in `unite-env/.env` and recreate the portal container to apply changes; rebuilding the frontend is not required.

## Proxy
Application serves as a reverse proxy and redirects requests from web portal to other protected services.
- [api/identity](https://localhost/api/identity) -> [`UNITE_IDENTITY_HOST`]/api - identity web api
- [api/composer](https://localhost/api/composer) -> [`UNITE_COMPOSER_HOST`]/api - composer web api
- [api/analysis](https://localhost/api/analysis) -> [`UNITE_ANALYSIS_HOST`]/api - analysis web api
- [api/feed-donors](https://localhost/api/feed-donors) -> [`UNITE_DONORS_FEED_HOST`]/api - donors feed web api
- [api/feed-images](https://localhost/api/feed-images) -> [`UNITE_IMAGES_FEED_HOST`]/api - images feed web api
- [api/feed-specimens](https://localhost/api/feed-specimens) -> [`UNITE_SPECIMENS_FEED_HOST`]/api - specimens feed web api
- [api/feed-omics](https://localhost/api/feed-omics) -> [`UNITE_OMICS_FEED_HOST`]/api - omics feed web api

## Installation
Application requires valid SSL certificate.
Self signed development certificate can be used:
- Create SSL certificate and name it `unite-cert.pem`
- Sign certificate and name it's key `unite-key.pem`

### Docker Compose
The easiest way to install the application is to use docker-compose:
- [Environment configuration and installation scripts](https://github.com/dkfz-unite/unite-env)
- [Web portal configuration and installation scripts](https://github.com/dkfz-unite/unite-env/tree/main/applications/unite)

### Docker
[Dockerfile](https://github.com/dkfz-unite/unite/blob/main/Dockerfile) is used to build an image of the application.
To build an image run the following command:
```bash
docker build -t unite.portal:latest .
```

All application components should run in the same docker network.
To create common docker network if not yet available run the following command:
```bash
docker network create unite
```

To run application in docker run the following command:
```bash
docker run \
--name unite.portal \
--restart unless-stopped \
--net unite \
--net-alias portal.unite.net \
-p 80:80 \
-p 443:443 \
-v [certificates_folder_absolute_path]:/https:ro \
-e ASPNETCORE_ENVIRONMENT=Release \
-e ASPNETCORE_HTTPS_PORT=443 \
-e ASPNETCORE_URLS="https://+:443;http://+:80" \
-e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/unite-cert.pem \
-e ASPNETCORE_Kestrel__Certificates__Default__KeyPath=/https/unite-key.pem \
-e UNITE_IDENTITY_HOST=http://identity.unite.net \
-e UNITE_COMPOSER_HOST=http://composer.unite.net \
-e UNITE_ANALYSIS_HOST=http://analysis.unite.net \
-e UNITE_DONORS_FEED_HOST=http://feed.donors.unite.net \
-e UNITE_IMAGES_FEED_HOST=http://feed.images.unite.net \
-e UNITE_SPECIMENS_FEED_HOST=http://feed.specimens.unite.net \
-e UNITE_OMICS_FEED_HOST=http://feed.omics.unite.net \
-d \
unite.portal:latest
```

### Local (Development)
Development requires the followind tools and technologies:
- node.js (v22.7.1)
- npm (10.8.0)

Frontend source code is located in `Unite.Web/Client` folder.
1. Open `Unite.Web/Client` folder in terminal
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

Open the development UI at **http://localhost:8080**. The regular portal service
continues running at **https://localhost:443**, alongside the backend services.

Development proxies are configured in
[vite.config.js](Unite.Web/Client/vite.config.js). `/api/config` goes to the
portal on 443; Identity, Composer, Analysis, and feed API routes go directly to
their local service ports. The dev config also proxies Cell-x-Gene viewers.
These routes are separate from the ASP.NET portal's production proxy settings.

The owner mainly uses `npm run build` for Docker deployment. The Dockerfile
runs it in the client build stage and copies the resulting `dist/` into the
runtime image's `Client/dist`. Routine frontend development and manual checks
use `npm run dev`.
