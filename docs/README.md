<!-- markdownlint-configure-file { "MD025": false, "MD036": false } -->
# Introducción

Se debía que construir y maquetar los componentes necesarios para la realización de las 3 vistas de la aplicación: Caja de búsqueda, Resultado de la búsqueda y Detalle de producto. A su vez, desarrollar 2 endpoints que debían consultar a la API de Mercadolibre para luego utilizar las respuestas en las vistas anterior mencionadas.

## Vistas

![Caja de búsqueda](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/01_Buscador.png)
Caja de búsqueda

![Resultado de la búsqueda](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/02_Resultados.png)
Resultado de la búsqueda

![Detalle de producto](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/02_Detalle.png)
Detalle de producto

## Requisitos tecnológicos

**Cliente:**

- HTML
- React
- CSS
  
**Servidor:**

- Node >= 10
- Express
- Server side rendering

## Requisitos funcionales

- En la vista de caja de búsqueda, debería poder ingresar el producto a buscar y al enviar el formulario navegar a la vista de Resultados de búsqueda, visualizando solo 4 productos. Luego, al hacer clic sobre uno de ellos, debería navegar a la vista de Detalle de Producto.
- Dado un id de producto, debería poder ingresar directamente a la vista de detalle de producto.

---

# Instalación

## Tecnologías

- React.js (v17.0)
- Next.js (v10.1)
- Node.js (v12.22)
- SASS (v1.32)
- Jest (v26.6)
- Testing-library/react (v11.2)
- Cypress (v7.0)

El proyecto es controlado completamente por `Next`. Lo que se espera es que consulte a una API, luego parsear la consulta y dejarla disponible para que el front la utilice. Para el mismo se aprovecha la funcionalidad [**API Routes**](https://nextjs.org/blog/next-9#api-routes), que esta disponible desde la versión 9.0 de la librería.

### ¿Por qué Next.js?

Se trata de una de las librerías basadas en javascript más relevantes para la creación de aplicaciones web con React desde hace más de 3 años. Pensada para que los desarrolladores no tengan que hacer pre-configuraciones en el proyecto en el que van a trabajar, la optimización del código viene por default y también la versatilidad de poder crear aplicaciones complejas, tanto como sitios estáticos. Sumado a esto, se le agrega la popularidad y el amplio soporte: los desarrolladores de esta librería, y también los que la utilizan, la convierten en una herramienta perfecta para este proyecto.

### ¿Por qué Jest y Testing-Library?

Jest es una librería para testeos unitarios desarrollado por Facebook. Suele utilizarse en proyectos en los que se usa React ya que no es necesario instalar muchas dependencias extras para hacer que sean compatibles. Aún así, suele utilizarse junto a Testing-library porque facilita la selección de un componente.

### ¿Por qué Cypress?

Una instalación rápida, la clara documentación y su popularidad, que se traduce en un mayor soporte, la hacen una buena opción para desarrollar tests End-to-End. Frente a otras librerías que realizan esta misma tarea, tiene una menor curva de aprendizaje. A su vez, la posibilidad de poder ver paso a paso lo que van haciendo los tests a medida que los vas escribiendo, la hacen una herramienta muy interactiva y fácil de comprender.

## Inicialización de proyecto

Para inicializar el proyecto se recomienda utilizar `docker` porque facilita todas las configuraciones necesarias para comenzar a desarrollar.

```bash
docker-compose up --build
```

## Configuración manual

Requerimientos:

- jq
- envsubst

Otra forma de inicializar el proyecto es con `npm`. Con este se deberá instalar las dependencias, solicitar un nuevo `ACCESS_TOKEN` y levantar el entorno en modo desarrollo.

```bash
npm install
npm run refresh_token
npm run dev
```

---

# Autenticación

Para poder utilizar todas las funcionalidades de la aplicación es necesario previamente obtener un `ACCESS_TOKEN`, el cuál va a ser utilizado para hacer las consultas necesarias a la API.

Este token tiene una expiración de 6 horas desde que se solicita, por lo que es necesario luego de ese tiempo solicitar uno nuevo mediante el comando `npm run refresh_token`. Otra opción es volver a levantar la aplicación con docker usando `docker-compose up`.

## Generación de token

Como se mencionó anteriormente, el comando `npm run refresh_token` genera un nuevo `ACCESS_TOKEN`, utilizado para consultar a la API de Mercadolibre. Este comando a su vez ejecuta el archivo `refresh_token.sh`, en la carpeta base del proyecto.

Este script realiza un llamado cURL para obtener el nuevo token y reemplazar la variable `${ACCESS_TOKEN}` del archivo `.env-template` y escribir el archivo `.env`, el cuál es finalmente utilizado por la aplicación.

Ver más sobre **variables de entorno**.

---

# Páginas

## Home

Esta página unicamente alberga al buscador, el cuál se va a repetir en el resto de las páginas de la aplicación.

## Resultado de búsqueda

Al ingresar a la página de resultado de búsqueda, ésta realiza una llamada a la API interna con la función de next.js, `getServerSideProps()` al endpoint `/api/items?q:query`. Éste se comunica con la API de Mercadolibre para que le envíe **únicamente 4 resultados**. Una vez recibidos, el endpoint parsea la información y se la entrega a la página para que sea mostrada al usuario.

![Búsqueda de productos](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/SearchEndpoint.png)

## Detalle de producto

Una vez el usuario ingresa a la página de detalle de un producto, al igual que en la página de resultado de búsqueda, ésta hace un llamado a la API interna del proyecto con la función de next.js `getServerSideProps()` al endpoint `/api/items/:id`. El cuál se comunica con la API de Mercadolibre para recibir la función del producto solictado, junto con su descripción y el árbol de la categoría al que corresponde el mismo.

![Detalle de producto](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/ProductEndpoint.png)

---

# Componentes

## Breadcrumb

![Breadcrumb](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/Breadcrumb.png)

En la página de resultado de búsqueda, el breadcrumb debe armarse basado en la categoría que más resultados obtuvo. En la página de detalle de producto debe armarse con la categoría propia del item.

**Ejemplo de uso**

```jsx
import React from 'react'
import Breadcrumb from '@components/Breadcrumb'

export default () => {
  return (
    <Breadcrumb
      steps={['Electrónica, Audio y Video', 'Audio', 'Auriculares']}
    />
  )
}
```

**Props**

| Props | PropType | Requerido | Valor por default |
| ----- | -------- | --------- | ----------------- |
| steps | array    | true      | -                 |

## ProductDetail

![ProductDetail](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/ProductDetail.png)

Recibe la información del producto y la muestra.

**Ejemplo de uso**

```jsx
import React from 'react'
import ProductDetail from '@components/ProductDetail'

export default () => {
  return (
    <ProductDetail
      image={"http://http2.mlstatic.com/D_987389-MLA33000989142_112019-O.jpg"}
      condition={'Nuevo'}
      sold_quantity={5}
      title={"Teléfono Inalámbrico Noblex Ndt4000tw Negro"}
      priceThousands={"5.300"}
      priceDecimals={"00"}
      description={"Lorem ipsum dolor sit amet"}
    />
  )
}
```

**Props**

| Props          | PropType | Requerido | Valor por default |
| -------------- | -------- | --------- | ----------------- |
| image          | string   | true      | -                 |
| condition      | string   | true      | -                 |
| sold_quantity  | number   | true      | -                 |
| title          | string   | true      | -                 |
| priceThousands | string   | true      | -                 |
| priceDecimals  | string   | true      | -                 |
| description    | string   | true      | -                 |

## ProductList

![ProductList](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/ProductList.png)

Se trata de un componente que le da estilos al layout en el que se va a mostrar todos los productos. Únicamente recibe el listado de productos que se van a mostrar y se lo envía a su componente interno `ProductCluster`.
**Ejemplo de uso**

```jsx
import React from 'react'
import ProductList from '@components/ProductList';

export default () => {
  return (
    <ProductList
      products={items}
    />
  )
}
```

**Props**

| Props | PropType | Requerido | Valor por default |
| ----- | -------- | --------- | ----------------- |
| items | object   | true      | -                 |

## ProductCluster

Es un componente interno de `ProductList`. Recibe el listado de productos y los muestra. Es recomendable no utilizarlo de manera aislada.

**Ejemplo de uso**

```jsx
import React from 'react'
import ProductCluster from '@components/ProductList/ProductCluster'

export default () => {
  return (
    {objectWithProducts.map((item, index) => (
      <ProductCluster
        index={index}
        key={`${index}-${item.id}`}
        title={item.title}
        id={item.id}
        image={item.picture}
        price={item.price.amount}
        location={item.location}
        free_shipping={item.free_shipping}
      />
    ))}
  )
}
```

**Props**

| Props         | PropType | Requerido | Valor por default |
| ------------- | -------- | --------- | ----------------- |
| title         | string   | true      | -                 |
| id            | string   | true      | -                 |
| index         | number   | true      | -                 |
| image         | string   | true      | -                 |
| price         | string   | true      | -                 |
| location      | string   | true      | -                 |
| free_shipping | Boolean  | true      | -                 |

## Searchbar

![Searchbar](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/Searchbar.png)

Permite que el usuario ingrese un producto que desea buscar y lo envía a la página de resultado de búsqueda.

**Ejemplo de uso**

```jsx
import React from 'react'
import SearchBar from '@components/SearchBar'

export default () => {
  return (
    <SearchBar 
      search={'Auriculares'}
    />
  )
}
```

**Props**

| Props  | PropType | Requerido | Valor por default |
| ------ | -------- | --------- | ----------------- |
| search | string   | false     | -                 |

---

# Estilos

Se utiliza al popular `normalize.css` como base para lograr una mayor consistencia del diseño de la página en los diferentes navegadores. A su vez, se usa SASS como pre-procesador por la funcionalidad de crear módulos y variables a lo largo del proyecto y lograr una mejor escalabilidad de los estilos.

Los valores que se utilizaron estan representados en REM, con el `font-size` al 100% (16px).

## Variables

**Colores**

Archivo: `_colors.scss`

```SASS
$primary: #FFE600;
$secondary: #3483FA;
$white: #FFFFFF;
$black: #333333;
$grey-1: #666666;
$grey-2: #999999;
$grey-3: #EEEEEE;
```

**Fuentes**

Archivo: `_fonts.scss`

```SASS
@mixin font-body {
  font-size: 1rem (16px)
  line-height: 1.2;
} 
@mixin font-detail {
  font-size: 1rem (12px)
  line-height: 1;
} 
@mixin font-small {
  font-size: 0.875rem  (14px)
  line-height: 1.2;
} 
@mixin font-big {
  font-size: 1.125rem (18px)
  line-height: 1.2;
} 
@mixin font-headering 3 {
  font-size: 1.5rem (24px)
  line-height: 1.2;
} 
@mixin font-headering 2 {
  font-size: 1.75rem (28px)
  line-height: 1.2;
} 
@mixin font-headering 1 {
  font-size: 2.875rem (46px)
  line-height: 1;
} 
```

**Mediaquery**

Archivo: `_mediaquery.scss`

```SASS
$breakpoint-md: 48rem (768px)
$breakpoint-lg: 62rem (992px)
$breakpoint-xl: 70rem (1120px)
```

**Espacios**

Archivo: `_spaces.scss`

```SASS
$space-xs: 0.5rem (8px)
$space-sm: 0.75rem (12px) 
$space-md: 1rem (16px)
$space-lg: 2rem (32px)
```

---

# Tests

## Unitarios

Con Jest, se hacen mocks de la respuesta de la API de Mercadolibre junto a la respuesta parseada esperada de los endpoints de la aplicación. Una vez hecho eso, se ejecutan las funciones que parsean la información y se comparan los tipos de dato con los del mock.

```sh
npm run test
o
npm run test:watch
```

- **test:** Ejecuta todos los tests de una sola vez.
- **test:watch**: Ejecuta todos los tests si detecta que hubo un cambio en el proyecto.

## End-to-End

Para estos tests, se ejecuta Cypress y realiza todas las acciones de la descripción funcional de la aplicación: hace una búsqueda, ir a la página de resultado e ir a la página de un producto. Además, toma un ID específico y muestra la página de ese producto.

Nota: Para realizar estos tests es necesario tener levantado el proyecto previamente. Esto puede ser con docker o de forma manual.

```sh
npm run cypress:open
o
npm run cypress:run
```

- **cypress:open:** Ejecuta Cypress y abre una ventana con todos los tests para seleccionar cuál de todos se desea correr.
- **Cypress:run:** Ejecuta todos los tests desde la consola.

---

# Performance y SEO

## Lighthouse

**Home (Mobile)**

![Home performance](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/Performance_Home.png)

**Página de resultado (Mobile)**

![Lighthouse Resultado](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/Performance_SeachMobile.png)

Nota: La categoría de buenas prácticas bajó a un 80 ya que las imagenes que se usaron estan en baja resolución.

**Detalle de producto (Mobile)**

![LightHouse Producto](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/Performance_ProductMobile.png)

Nota: La categoría de buenas prácticas bajó a un 80 ya que la imagen que se uso para mostrar al producto esta en baja resolución y porque la url de la imagen no es HTTPS.

## Componente

Al comienzo de cada página se incluye el componente `<Layout />`, el cuál a la vez de traer el header y un pequeño footer, también agrega algunos meta tags básicos.

**Template de título:** (`${title} | `) Sebastián Tamashiro - Challenge Frontend 2021

| Props       | Descripción                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| children    | Es el contenido de la página                                                                                  |
| title       | Si se envía esta prop, la incluye para la contrucción del título de la página                                 |
| description | Además de usarse para el tag de la descripción de la página, se usa para el og:description                    |
| picture     | Se utiliza fundamentalmente en la página de producto. Toma la imagen del mismo para utilizarlo en el og:image |
| pageURL     | En el caso de usarse esta prop, debe enviarse el subdirectorio sin /                                          |
| search      | Se puede usar para enviarle al componente `<SearchBar />` la búsqueda del usuario                             |

---

# Variables de entorno

En la base del proyecto se encuentra un archivo llamado `.env-template`, el cuál es utilizado por el comando `npm run refresh_token` para obtener un nuevo `ACCESS_TOKEN`. (Ver más sobre **Configuración de token**)

Con el archivo `.env` generado, se definen las variables de entorno que se van a usar en el proyecto en el archivo `next.config.js` para que el framework pueda incluirlos a lo largo del proyecto.

| Variable      | Tipo   | Descripción                                                                            |
| ------------- | ------ | -------------------------------------------------------------------------------------- |
| ACCESS_TOKEN  | String | Token de autorización para consultar a la API de Mercadolibre                          |
| API_URL       | String | URL base de la API de Mercadolibre                                                     |
| SITE_URL      | String | La URL del propio proyecto                                                             |
| RESULTS_LIMIT | Number | Es un número que determina la cantidad de resultados que se va a solicitar a la API    |
| CACHE_TTL     | Number | La cantidad de segundos que va a durar el cache de los endpoints internos del proyecto |
| CHECK_PERIOD  | Number | Es el período de tiempo, en segundos, usado para borrar automáticamente el cache       |

# Errores conocidos

## Status 403

**Ejemplo**
```sh
{
 message: 'Hubo un error al consultar al endpoint /items/:id de la API de Mercadolibre',
 error: 'no_reached_items_mercadolibre_api',
 status: 403,
 cause: [
   Response {
     size: 0,
     timeout: 0,
     [Symbol(Body internals)]: [Object],
     [Symbol(Response internals)]: [Object]
   }
 ]
}
```

**Causa:** No existe o expiró el ACCESS_TOKEN.

**Solución:** Si se esta levantando el proyecto de forma manual, se debe correr el comando `npm run refresh_token`. Si se realiza con docker, con volver a hacer `docker-compose up` soluciona el problema.

## Status 204

**Ejemplo terminal:**

```sh
{
 message: 'No se obtuvo una respuesta de la API que obtiene el resultado de la búsqueda',
 error: 'searchResultPage_error_api',
 status: 204,
 cause: [
   Response {
     size: 0,
     timeout: 0,
     [Symbol(Body internals)]: [Object],
     [Symbol(Response internals)]: [Object]
   }
 ]
}
```

**Ejemplo páginas:**

![Server Error - Dev](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/serverErrorDev.png)

**Causa:** Lo que el usuario buscó no tuvo resultados.

**Solución:** Al tener levantado el proyecto en modo de desarrollo, la página muestra el error de arriba, pero en modo de producción muestra la página de error.

Para poder ver la página de error en un entorno local hay que hacer el build del proyecto con `npm run build` y levantarlo con en modo de producción con `npm run start`.

![Server Error - Prod](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/serverErrorProd.png)