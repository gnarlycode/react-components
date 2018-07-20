###### _GNARLY CODE Production_ Introducing

# React Route Fetch

Helps with fetching data for universal app using [react-router](https://github.com/ReactTraining/react-router) with [react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config).

## Installation

```sh
npm i --save @gnarlycode/react-route-fetch
```

## Usage

How to define your routes:

```jsx
// Fetchers should return promises, so we can wait they resolving for ssr
const fetcher = (context, match) => new Promise((resolve) => {
  // Fetch things, save them to store (context) and
  resolve()
})

// Add fetcher to `fetchData` field when defining your `react-router-config`
export const routes = [
  {
    //...
    fetchData: fetcher
  }
]
```

Wrap client root component with `withRouteFetch` and it will fetch new data when history changes:

```jsx
import { renderRoutes } from 'react-router-config'
import { withRouteFetch } from '@gnarlycode/react-route-fetch'

export const ClientRoot = withRouteFetch(routes)(() => renderRoutes(routes))
```

You should provide a context for data:

```jsx
// ..
import { routes } from 'routes'
import { createStore } from 'yourStore'
import { ClientRoot } from 'ClientRoot'

// We need to create data context. Redux store, for example
const store = createStore()

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ClientRoot fetchContext={store} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
```

So let's look how to build server:

```jsx
//...
import { routes } from 'routes'
import { getDataFetchers } from '@gnarlycode/react-route-fetch'

const server = async (req, res) => {
  // Use getDataFetchers to fetch data to store on server before render
  const store = createStore()
  await getDataFetchers(url, routes, store)

  // Then render your app
  renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={routerContext}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  )
}
```

Well Done!

###### Author: Dmitry Podlesny
