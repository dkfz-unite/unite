# Web Portal

## General
Wep portal giving access to data providing the follwoing functionality:
- Cross reference search queries
- Detailed overview of data entries
- Cohort management functionality
- Cohort data download
- Data visualisation
- Data analysis

Web portal includes several components:
- Web server - ASP.NET (.NET 5) web server hosting static files of the frontend SPA.
- Reverse proxy - ASP.NET (.NET 5) reverse proxy service redirecting frontend calls to composer web api.
- Frontend SPA - Vue.js (v3) single page web application.

## Dependencies
- [Composer](https://github.com/dkfz-unite/unite-composer) - composer web api.

## Access
Environment|Address|Port
-----------|-------|----
Host|https://localhost|433
Docker|https://portal.unite.net|443

## Configuration
To configure the application, change environment variables:
Variable|Description|Default(Local)|Default(Docker)
--------|-----------|--------------|---------------
ASPNETCORE_ENVIRONMENT|ASP.NET environment type|Debug|Release
UNITE_COMPOSER_HOST|Composer web api host|http://localhost:5002|http://composer.unite.net

## Installation
Application requires valid SSL certificate.
Self signed development certificate can be used:
- Create SSL certificate and name it `unite-cert.pem`
- Sign certificate and name it's key `unite-key.pem`

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
-e UNITE_COMPOSER_HOST=http://composer.unite.net \
-d \
unite.portal:latest
```

### Docker Compose
Easies way to install the application is to use docker-compose:
- Environment configuration and installation scripts: https://github.com/dkfz-unite/unite-environment
- Web portal configuration and installation scripts: https://github.com/dkfz-unite/unite-environment/tree/main/applications/unite 
