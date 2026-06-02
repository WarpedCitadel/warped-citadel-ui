# warped-citadel-ui
This project contains the source code and supporting files for the applications frontend.

## Deploy the application
This project uses Docker to deploy in local, development, and production environments.

### Use Docker to build and test locally
Build the application image with the `docker build` command.
```bashrc
docker build -t warped-citadel-ui/local .
```
Docker uses the projects `dockerfile` to build a multi-staged docker image.
The image builder, uses `node:24-alpine` to build the project, then executes `npm run build` to trigger the `TypeScript` source code to output a `/dist` folder inside a newly created folder called `/app`.

The image runner, uses `nginx:1.30.2-alpine` to run the projects newly compiled `JavaScript` from `TypeScript` located inside the `/app/dist` folder from the builder stage.

Build the docker container using `docker-compose up`.
```bashrc
docker-compose up
```
Referencing the `docker-compose.yml`, Docker creates a container called `wc_local` with the defined image `warped-citadel-ui/local` and port on `5173`.
```yml
services:
  wc_local:
    image: warped-citadel-ui/local
    ports:
      - "5173:5173"
```

Since the application relies on a *React + TypeScript + Vite* build, the `vite.config.ts` needs to be configured to listen on IPs `0.0.0.0` and the port `5173` to map with `ngninx` which is also modified to listen on port `5173`.

### vite.config.ts
```ts
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
```
### nginx.conf
```js
server {
    listen 5173;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```
## Using Make for Docker deployments
To use `make` you must install the build automation tool in a Linux terminal with the following command.
```bashrc
sudo apt install make
```
Once `make` is installed, navigate to the root directory of the project via `/warped-citadel-ui` where the `Makefile` is located and enter `make readme` as a command.
```bashrc
make readme
```
The `make` target *readme* will display inside the terminal a list of make commands for deployment.

### make deploy_local
Build the local docker image and build local docker container on localhost:5173.
```bashrc
make deploy_local
```

### make rip_deploy_local
Stop the local docker container and rebuild the docker image and container on localhost:5173.
```bashrc
make rip_deploy_local
```

### make rip_local
Stop and delete the local docker container. Then delete the local docker image on localhost:5173.
```bashrc
make rip_local
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
