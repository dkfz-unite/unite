# Web Portal

## General
Wep portal giving access to data providing the follwoing functionality:
- Cross reference search queries
- Detailed overview of data entries
- Dataset management tools
- Data upload/download tools
- Data export tools
- Data visualisation
- Data analysis

Web portal includes several components:
- Web server - ASP.NET web server hosting static files of the frontend SPA.
- Reverse proxy - ASP.NET reverse proxy service redirecting frontend calls to composer web api.
- Frontend SPA - Vue.js single page web application.

## Dependencies
- [Composer](https://github.com/dkfz-unite/unite-composer) - composer web api.

## Access
Environment|Address|Port
-----------|-------|----
Host|https://localhost|80;433
Docker|https://portal.unite.net|80;443

## Configuration
To configure the application, change environment variables:
Variable|Description|Default(Local)|Default(Docker)
--------|-----------|--------------|---------------
ASPNETCORE_ENVIRONMENT|ASP.NET environment|Debug|Release
UNITE_IDENTITY_HOST|Identity web api|http://localhost:5000|http://identity.unite.net
UNITE_COMPOSER_HOST|Composer web api|http://localhost:5002|http://composer.unite.net
UNITE_ANALYSIS_HOST|Analysis Web api|http://localhost:5004|http://analysis.unite.net
UNITE_DONORS_FEED_HOST|Donors feed web api|http://localhost:5100|http://feed.donors.unite.net
UNITE_IMAGES_FEED_HOST|Images feed web api|http://localhost:5102|http://feed.images.unite.net
UNITE_SPECIMENS_FEED_HOST|Specimens feed web api|http://localhost:5104|http://feed.specimens.unite.net
UNITE_GENOME_FEED_HOST|Genome feed web api|http://localhost:5106|http://feed.genome.unite.net

## Proxy
Application serves as a reverse proxy and redirects requests from web portal to other protected services.
- [api/identity](https://localhost/api/identity) -> [`UNITE_IDENTITY_HOST`]/api - identity web api
- [api/composer](https://localhost/api/composer) -> [`UNITE_COMPOSER_HOST`]/api - composer web api
- [api/analysis](https://localhost/api/analysis) -> [`UNITE_ANALYSIS_HOST`]/api - analysis web api
- [api/donors-feed](https://localhost/api/donors-feed) -> [`UNITE_DONORS_FEED_HOST`]/api - donors feed web api
- [api/images-feed](https://localhost/api/images-feed) -> [`UNITE_IMAGES_FEED_HOST`]/api - images feed web api
- [api/specimens-feed](https://localhost/api/specimens-feed) -> [`UNITE_SPECIMENS_FEED_HOST`]/api - specimens feed web api
- [api/genome-feed](https://localhost/api/genome-feed) -> [`UNITE_GENOME_FEED_HOST`]/api - genome feed web api

## Installation
Application requires valid SSL certificate.
Self signed development certificate can be used:
- Create SSL certificate and name it `unite-cert.pem`
- Sign certificate and name it's key `unite-key.pem`

### Docker Compose
The easiest way to install the application is to use docker-compose:
- Environment configuration and installation scripts: https://github.com/dkfz-unite/unite-environment
- Web portal configuration and installation scripts: https://github.com/dkfz-unite/unite-environment/tree/main/applications/unite 

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
-e UNITE_GENOME_FEED_HOST=http://feed.genome.unite.net \
-d \
unite.portal:latest
```

### Local (Development)
Development requires the followind tools and technologies:
- node.js (v17.0.1)
- npm (8.1.0)

Frontend source code is located in `Unite.Web/Client` folder.
1. Open `Unite.Web/Client` folder in terminal
2. Install dependencies: `npm install`
3. Run development server: `npm run serve`

Composer web api proxy can be configured in vue [config](Unite.Web/Client/vue.config.js) file.

