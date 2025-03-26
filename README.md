<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Instalar las dependencias
```
yarn install
```

3. Tener Next CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Reconstruir la base de datos con la semilla usando el seed enpoint
```url
http://localhost:3000/api/v1/seed
```


## Stack usado
* Nest JS
* Mongo DB