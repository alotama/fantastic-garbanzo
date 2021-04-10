<!-- markdownlint-configure-file { "MD025": false -->
# Instalación

## Tecnologías

- React.js (v17.0)
- Next.js (v10.1)
- Node.js (v12.22)
- Jest (v26.6)
- Cypress (v7.0)

## Inicialización de proyecto

Para inicializar el proyecto se recomienda utilizar `docker` porque facilita todas las configuraciones necesarias para comenzar a desarrollar.

```terminal
docker-compose up --build
```

## Configuración manual

Requerimientos:
- jq
- envsubst

Otra forma de inicializar el proyecto es con `npm`. Con este se deberá instalar las dependencias, solicitar un nuevo `ACCESS_TOKEN` y levantar el entorno en modo desarrollo.

```terminal
npm install
npm run refresh_token
npm run dev
```

## Autenticación

Para poder utilizar todas las funcionalidades de la aplicación es necesario previamente obtener un `ACCESS_TOKEN`, el cuál va a ser utilizado para hacer las consultas necesarias a la API.

Este token tiene una expiración de 6 horas desde que se solicita, por lo que es necesario luego de ese tiempo solicitar uno nuevo mediante el comando `npm run refresh_token`. Otra opción es volver a levantar levantar la aplicación con docker usando `docker-compose up`.

### Generación de token

Como se mencionó anteriormente, con el comando `npm run refresh_token` genera un nuevo `ACCESS_TOKEN` para ser utilizado para consultar a la API de Mercadolibre. Este comando a su vez ejecuta el archivo bash `refresh_token.sh`.

Este script realiza un llamado cURL para obtener el nuevo token y reemplazar la variable `${ACCESS_TOKEN}` del archivo `.env-template` y escribir el archivo `.env`, el cuál es finalmente utilizado por la aplicación.

Ver más sobre **variables de entorno**.

# Arquitectura

Debido a la simpleza del proyecto, la misma esta controlada completamente por `Next`. Lo que se espera es que consulte a una API, luego parsear la consulta y dejarla disponible para que el front la utilice. Para el mismo se aprovecha la funcionalida [**API Routes**](https://nextjs.org/blog/next-9#api-routes), que esta disponible desde la versión 9.0 de la librería.

## ¿Por qué Next.js?

Se trata de una de las librerías basadas en javascript más relevantes para la creación de aplicaciones web con React. Pensada para que los desarrolladores no tengan que hacer pre-configuraciones en el proyecto en el que van a trabajar, la optimización del código viene por default y la versatilidad de poder crear tanto aplicaciones complejas como sitios estáticos, sumado a muchas otros beneficios, la hacen una herramienta perfecta para este proyecto.

# API

## SearchResult

```Javascript
/api/items?q=:query

// Ejemplo:
/api/items?q=apple
```

Es el endpooint encargado de solicitar a la API de Mercadolibre los resultados de la búsqueda del usuario y devuelve hasta 4 resultados.

# Variables de entorno

En la base del proyecto se encuentra un archivo llamado `.env-template`, el cuál es utilizado por el comando `npm run refresh_token` para obtener un nuevo `ACCESS_TOKEN`. (Ver más sobre **Configuración de token**)

Con el archivo `.env` generado, se definen las variables de entorno que se van a usar en el proyecto en el archivo `next.config.js` y se agregan más configuraciónes.

| Variable      | Tipo   | Descripción                                                                            |
| ------------- | ------ | -------------------------------------------------------------------------------------- |
| ACCESS_TOKEN  | String | Token de autorización para consultar a la API de Mercadolibre                          |
| API_URL       | String | URL base de la API de Mercadolibre                                                     |
| SITE_URL      | String | La URL del propio proyecto                                                             |
| RESULTS_LIMIT | Number | Es un número que determina la cantidad de resultados que se va a solicitar a la API    |
| CACHE_TTL     | Number | La cantidad de segundos que va a durar el cache de los endpoints internos del proyecto |
| CHECK_PERIOD  | Number | Es el período de tiempo, en segundos, usado para borrar automáticamente el cache       |