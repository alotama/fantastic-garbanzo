<!-- markdownlint-configure-file { "MD025": false, "MD036": false } -->
# ⚙️ Instalación

## Tecnologías

- React.js (v17.0)
- Next.js (v10.1)
- Node.js (v12.22)

Debido a la simpleza del proyecto, la misma esta controlada completamente por `Next`. Lo que se espera es que consulte a una API, luego parsear la consulta y dejarla disponible para que el front la utilice. Para el mismo se aprovecha la funcionalida [**API Routes**](https://nextjs.org/blog/next-9#api-routes), que esta disponible desde la versión 9.0 de la librería.

### ¿Por qué Next.js?

Se trata de una de las librerías basadas en javascript más relevantes para la creación de aplicaciones web con React. Pensada para que los desarrolladores no tengan que hacer pre-configuraciones en el proyecto en el que van a trabajar, la optimización del código viene por default y la versatilidad de poder crear tanto aplicaciones complejas como sitios estáticos, sumado a muchas otros beneficios, la hacen una herramienta perfecta para este proyecto.

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

# 🔒 Autenticación

Para poder utilizar todas las funcionalidades de la aplicación es necesario previamente obtener un `ACCESS_TOKEN`, el cuál va a ser utilizado para hacer las consultas necesarias a la API.

Este token tiene una expiración de 6 horas desde que se solicita, por lo que es necesario luego de ese tiempo solicitar uno nuevo mediante el comando `npm run refresh_token`. Otra opción es volver a levantar levantar la aplicación con docker usando `docker-compose up`.

## Generación de token

Como se mencionó anteriormente, con el comando `npm run refresh_token` genera un nuevo `ACCESS_TOKEN` para ser utilizado para consultar a la API de Mercadolibre. Este comando a su vez ejecuta el archivo bash `refresh_token.sh`.

Este script realiza un llamado cURL para obtener el nuevo token y reemplazar la variable `${ACCESS_TOKEN}` del archivo `.env-template` y escribir el archivo `.env`, el cuál es finalmente utilizado por la aplicación.

Ver más sobre **variables de entorno**.

# ☁️ Páginas

## Home

Esta página unicamente alberga al buscador, el cuál se va a repetir en el resto de las páginas de la aplicación.

## SearchResult Page

Al ingresar a la página de resultado de búsqueda, ésta realiza una llamada a la API interna con la función de nextjs, `getServerSideProps()` al endpooint `/api/items?q:query`. El cuál se comunica con la API de Mercadolibre para que le envíe **únicamente 4 resultados**. Una vez recibidos, el endpoint parsea la información y se la entrega a la página para que sea mostrada al usuario.

![Búsqueda de productos](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/SearchEndpoint.png)

## ProductPage

Una vez el usuario ingresa a la página de detalle de un producto, al igual que en la página de resultado de búsqueda, ésta hace un llamado a la API interna del proyecto con la función de nextjs `getServerSideProps()` al endpoint `/api/items/:id`. El cuál se comunica con la API de Mercadolibre para recibir la función del producto solictado, junto con su descripción y el arbol de la categoría al que corresponde el mismo.

![Detalle de producto](https://raw.githubusercontent.com/alotama/fantastic-garbanzo/main/docs/images/ProductEndpoint.png)

# Componentes

## Breadcrumb

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

Se trata de un componente que le da estilos al layout en el que se va a mostrar todos los productos. Unicamente recibe el listado de productos que se van a mostrar y se lo envía al su componente interno `ProductCluster`.
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

Es un componente interno de `ProductList`. Recibe el listado de productos y los muestra. Es recomendable no utilizarlo por fuera.

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
