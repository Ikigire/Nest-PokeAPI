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

5. Clonar el archivo __.env.template__ y renombrar la copia como __.env__

6. Llenar las variables de entorno definidas

7. Ejecutar en modo de escucha
```
yarn start:dev
```

8. Reconstruir la base de datos con la semilla usando el seed enpoint
```url
http://localhost:3000/api/v1/seed
```


## Stack usado
* [Nest JS](https://docs.nestjs.com/)
* [Mongo DB](https://www.mongodb.com/)
* [Joi](https://www.npmjs.com/package/joi)