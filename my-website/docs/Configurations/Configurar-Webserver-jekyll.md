---
sidebar_position: 2
---
## Configuraciones desde CLI en LINUX 

En este artículo, se exponen las configuraciones necesarias para visualizar las modificaciones realizadas en el servidor web local y guardar y publicar las modificaciones en el servidor web de Github.

```shell
##PARA VISUALIZAR LAS MODIFICACIONES LOCALES
#A continuacion ejecutamos en local 
bundle exec jekyll serve

#Para todos los errores que nos de, tenemos que instalar las dependencias de ruby
sudo gem install nombredependencia:versionindicada

#Por ultimo es probable que nos diga que le falta un parser en el archivo gem, solo hay que abrir con nano Gemfile >
gem "kramdown-parser-gfm"

#Cuando se realice algún cambio y se quiera reiniciar el servidor, primero hay que eliminar el servicio activo en e>
sudo lsof -i :4000
kill -9 numerodePID


##PARA SUBIR LA PÁGINA AL SERVIDOR WEB   
#Para editar la pagina web creada con jekyll en Githubpages, se edita en documents/webserver/NENmSIS... lo que se n>
git add .
git commit -m "comentario de lo realizado en el cambio"

#Solo si lo pide (aunque en la primera vez que se hace deberia quedar guardado), se escribe lo siguiente
git config --global user.email "nenmsis@protonmail.com"
git config --global user.name "nombreusuario"  

#Ahora se sube la web entera e introducimos el nombre de usuario y el token generado
git push -u origin
 
#A continuación se introduce el nombre de usuario y el token de acceso 

```

## Utilización de markdown como lenguaje de marcado

Para la elaboración de los artículos, se utiliza el lenguaje de marcado markdown. Con el objetivo de tener una referencia a la que acudir con frecuencia, se pueden utilizar estos links: 

* [Markdown1](https://towardsdatascience.com/the-ultimate-markdown-cheat-sheet-3d3976b31a0) 
* [Markdown2](https://github.com/mundimark/awesome-markdown#markdown-style-guides--best-practices)
* [Markdown3](https://www.markdownguide.org/basic-syntax/)
