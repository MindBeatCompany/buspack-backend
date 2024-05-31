# Setup proyecto

## Requerimientos

Tener instalado Docker y docker-compose

### Pasos

1) Clonar el repositorio y pararse en el mismo
2) Ejecutar: 

```bash
cp .env.template .env
sed -i '0,/APP_ENV/{s/app_env/development/}' .env
docker-compose up -d
```

NOTA: se puede sacar el flag `-d` para que no este en background y poder ver los logs.

3) Descargar el archivo `hubbpack_qa_20220526_215808.sql` (dump de la bd).
4) Ejecutar `sed -i '0,/backendnest/{s/backendnest/db_buspack/}' <path-donde-descargue-el-dump/hubbpack_qa_20220526_215808.sql`. 
5) Ejecutar:

```bash
docker cp <path-donde-descargue-el-dump-de-la-bd>/hubbpack_qa_20220526_215808.sql buspack_db:/
docker exec buspack_db sh -c 'cat hubbpack_qa_20220526_215808.sql | mysql -u buspack -D db_buspack -pbuspack'
```

6) Correr migraciones:

En la carpeta `src/migration` dejar los archivos desde `1669032135538-filePathNotNull.ts`, es decir, desde ese archivo para "abajo", dado que están ordenados por ID. Luego ejecutar: `docker exec buspack_backend sh -c 'npx typeorm migration:run'`


7) Abrir en un browser la siguiente URL: `http://localhost:4200/doc`. Debe aparecer la página del Swagger


## Obtener pass para usuario

Se modifica manualmente un usuario para acceder a las aplicación desde la rama `setup`

Las creds son 

- email: hubbpack@gmail.com
- pass: admin

Para esto ejecutar en consola:

```bash
curl \
  -X 'POST' \
  'http://localhost:4200/v1/api/auth/recovery' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"userName": "hubbpack@gmail.com"}'
```

Probar con el front andando que se loguea con las creds mencionadas más arriba
