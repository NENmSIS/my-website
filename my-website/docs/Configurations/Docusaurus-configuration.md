---
sidebar_position: 1
---

## Prerequisitos

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/en/)
* [Git](https://git-scm.com/downloads)
* Crear una cuenta de Github

## Crear la documentación de la web

Para ello, únicamente se genera la [plantilla](https://docusaurus.io/docs/installation):
Se crea una carpeta con el mismo nombre que tendrá el repositorio de Github, the-nenmsis-project. Dentro de la carpeta, se abre la terminal y se genera la carpeta que contenga el contenido de la web.
```
npx create-docusaurus@latest website classic
```
### Probar el servidor de desarrollo
```
cd website
yarn run start
```
### Generar la carpeta /build 
Este apartado sirve ara hostear la web en servicios online como Vercel o Netlify en caso de elegir esta opción
Desde la carpeta de la web
```
yarn run build
```
## Crear un nuevo repositorio en Github
1. Se crea un repositorio con el nombre the-nenmsis-project
2. Se inicializa el repositorio desde la carpeta del repositorio:
```
git init
git commit -m "first commit"
```
3. Se sube al repositorio el contenido de la web. 
```
git remote add origin https://github.com/NENmSIS/the-nenmsis-project.git
git branch -M main
git push -u origin main
```

## Desplegar en Github pages

Editar el archivo docusaurus.config.js

```
  // ...
  url: 'https://NENmSIS.github.io', // Your website URL
  baseUrl: '/',
  projectName: 'the-nenmsis-project',
  organizationName: 'NENmSIS',
  trailingSlash: false,
  // ...
```
## Subir el contenido a github
Desde la carpeta de la web 
```
## Con cmd
cmd /C "set "GIT_USER=NENmSIS" && yarn deploy"

## Con PowerShell
cmd /C 'set "GIT_USER=NENmSIS" && yarn deploy'
```
## Activar Github pages y publicar la web
Una vez se ha subido el contenido al repositorio, solamente hay que cambiar en github > repositorio > settings > repository name: NENmSIS.github.io y de esta forma se publica en https://NENmSIS.github.io

