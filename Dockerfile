FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:lts-alpine as restore-client
WORKDIR /app
COPY ["Unite.Web/Client/package*.json", "./"]
RUN npm install
RUN npm audit fix

FROM restore-client as build-client
COPY ["Unite.Web/Client/", "./"]
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS restore
WORKDIR /src
COPY ["Unite.Web/Unite.Web.csproj", "Unite.Web/"]
RUN dotnet restore "Unite.Web/Unite.Web.csproj"

FROM restore as build
COPY . .
WORKDIR "/src/Unite.Web"
RUN dotnet build --no-restore "Unite.Web.csproj" -c Release

FROM build AS publish
RUN dotnet publish --no-build "Unite.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-client /app/dist ./Client/dist
ENTRYPOINT ["dotnet", "Unite.Web.dll"]