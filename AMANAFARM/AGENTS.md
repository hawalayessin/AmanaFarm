# AMANAFARM agent notes

Use this repo for two apps: Angular frontend in [amana-exact-angular](amana-exact-angular) and Spring Boot backend in [AMANAFARMBACKEND](AMANAFARMBACKEND).

## Quick start

- Frontend (from [amana-exact-angular](amana-exact-angular)): `npm install`, `npm run start`, `npm run build`
- Backend (from [AMANAFARMBACKEND](AMANAFARMBACKEND)): `mvn spring-boot:run`, `mvn test`

## Architecture map

- Frontend entry: [amana-exact-angular/src/main.ts](amana-exact-angular/src/main.ts) and [amana-exact-angular/src/index.html](amana-exact-angular/src/index.html)
- Frontend config: [amana-exact-angular/angular.json](amana-exact-angular/angular.json)
- Backend packages: controller, service, repository, model, dto, auth, config under [AMANAFARMBACKEND/src/main/java/com/example/amanafarm_backend](AMANAFARMBACKEND/src/main/java/com/example/amanafarm_backend)

## Runtime config

- Backend port: 8080
- Database: MySQL at jdbc:mysql://localhost:3306/amanafarm_db (see [AMANAFARMBACKEND/src/main/resources/application.properties](AMANAFARMBACKEND/src/main/resources/application.properties))

## References

- Repo README: [README.md](README.md)
- Angular README: [amana-exact-angular/README.md](amana-exact-angular/README.md)
- Angular config: [amana-exact-angular/angular.json](amana-exact-angular/angular.json)
- Backend config: [AMANAFARMBACKEND/src/main/resources/application.properties](AMANAFARMBACKEND/src/main/resources/application.properties)
- Maven config: [AMANAFARMBACKEND/pom.xml](AMANAFARMBACKEND/pom.xml)
