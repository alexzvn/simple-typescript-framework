# Simple TypeScript Web Framework

A lightweight TypeScript web framework for building organized and modular web applications. This framework aims to simplify project structure by automatically registering controllers, middleware, and providers while offering lifecycle hooks for easy event handling.

## Features
- Controllers auto-mapped to URIs
- Middleware and Providers auto-registered
- Lifecycle hooks support
- Express.js integration
- ESM and CommonJS module support
- Built-in logger with support for different environments

## Getting Started

Clone the repository and install dependencies:
```bash
git clone https://github.com/username/simple-typescript-framework.git
cd simple-typescript-framework
npm install
```

To start the development server, run:
```bash
npm run dev
```

## Usage
### Controllers
To create a new controller, add a TypeScript file in the `src/http/controllers` directory. The filename and directory structure will automatically map to the corresponding URIs. 

For example, a controller located at src/http/controllers/users/Index.ts would be automatically mapped to the /users URI.

```typescript
// src/http/controllers/ExampleController.ts
import { Router } from 'express'
export const router = Router()

router.get('/', (req, res) => {
  res.send('Hello from ExampleController')
})
```

### Middleware

Create a new middleware file in the src/http/middlewares directory. Export a function that matches the Express middleware signature:

```typescript
// src/http/middlewares/ExampleMiddleware.ts
import { Handler } from 'express'

export const ExampleMiddleware: Handler = (req, res, next) => {
  // Add your middleware logic here
  console.log('ExampleMiddleware executed')
  next()
}
```

To use the middleware, import it in the `src/providers/MiddlewareProvider.ts` file and add it to the `middlewares` object with the desired path:

```typescript
// src/providers/MiddlewareProvider.ts
import { ExampleMiddleware } from '~/http/middlewares/ExampleMiddleware'

const middlewares: MiddlewareMap = {
  '/example': ExampleMiddleware,
}
```
### Providers

To create a new provider, add a TypeScript file in the `src/providers` directory. You can utilize lifecycle hooks and register your services within the provider. Here's an example:

```typescript
import { defineProvider } from '@/utils/ProviderHelper'

export default defineProvider((app) => {
  app.hook('after', () => {
    console.log(app.$hello)
    console.log('ExampleProvider initialized.')
  })

  app.hook('shutdown', () => {
    console.log('ExampleProvider shutting down.')
  })

  const hello = 'world'

  // optional inject your property in application
  // the dollar sign prefix will added each properties in application instance
  return { provide: { hello } }
})
```

Add typing for application:

```typescript
declare module '@/Application' {
  interface Application {
    $hello: string
  }
}
```

## Testing

To add a new test, create a new file in the `tests` directory with the format `<TestName>.ts`. Write your tests using the manten library:

```typescript
import { expect, test } from 'manten';

test('example', () => {
  expect(1).toBe(1);
});
```

To run the tests, execute:
```
npm run test
```

## Contributing
Contributions are welcome! Please feel free to submit issues or pull requests for improvements or new features.
