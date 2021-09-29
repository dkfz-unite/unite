# UNITE Web Application
### General
UNITE web portal. Allows users to register, log in and serach different types of data building data sets, comparing them or exporting their data in different formats, perform analysis of the the data, visualize it etc.
- Web server - ASP.NET (.NET 5) web server hosting static files of the frontend SPA.
- Web api proxy - ASP.NET (.NET 5) reverse proxy service redirecting frontend calls to composer web api.
- Fronten SPA - Vue.js (v2.3) single page web application.

### Access
Environment|Address|Port
-----------|-------|----
Local|https://localhost:5001|5001
Docker|https://localhost:443|443

### Dependencies
- [Composer](https://github.com/dkfz-unite/unite-composer) - composer web api.

### Configuration
To configure the application, change [launchSettings.json](https://github.com/dkfz-unite/unite/blob/main/Unite.Web/Properties/launchSettings.json) file environment variables:
Variable|Description|Default(Local)|Default(Docker)
--------|-----------|--------------|---------------
ASPNETCORE_ENVIRONMENT|ASP.NET environment type|Debug|Release
UNITE_COMPOSER_HOST|Composer web api host|http://localhost:5002|http://composer.unite

### Docker
[Dockerfile](https://github.com/dkfz-unite/unite/blob/main/Dockerfile) is used to build an image of the application.
To build an image run the following command:
```
docker build -t unite.web:latest .
```

All UNITE components should run in the same docker network.
To create common docker network if not yet available run the following command:
```bash
docker network create unite
```

Running application in docker requires valid SSL certificate to be created beforehand and passed over as environment variable. To run application in docker run the following command:
```bash
docker run \
--name unite.web \
--restart unless-stopped \
--net unite \
--net-alias web.unite \
-p 80:80 \
-p 443:443 \
-v [certificates_folder_absolute_path]:/https:ro \
-e ASPNETCORE_ENVIRONMENT=Release \
-e ASPNETCORE_HTTPS_PORT=443 \
-e ASPNETCORE_URLS="https://+:443;http://+:80" \
-e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/[domain_name].crt \
-e ASPNETCORE_Kestrel__Certificates__Default__KeyPath=/https/[domain_name].key \
-e UNITE_COMPOSER_HOST=http://composer.unite \
-d \
unite.web:latest
```
