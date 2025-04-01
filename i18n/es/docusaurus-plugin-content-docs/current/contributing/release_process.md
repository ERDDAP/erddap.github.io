---
sidebar_position: 3
---
# ERDDAP™Proceso de liberación
* Asegúrese de que los archivos de comparación de imágenes están disponibles (esto podría significar ejecutar `mvn verificar`, si desea acelerar que hasta restringir a sólo el grupo ImageComparison aunque tenga en cuenta que todavía requiere realizar pruebas Jetty) 
* Dependencias de actualización
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Actualizar plugins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Ejecute pruebas para asegurarse de que las actualizaciones de dependencia no rompieran nada para todas las configuraciones principales (datasets parsing in particular, though any other significant settings as well) 
```
mvn verify
```
* Use TranslateMessages.translate () para actualizar las traducciones si es necesario
* EDStatic.java estableció el desarrollo Mode to false, change the version number and specify the release date.
* Haga la construcción
```
mvn clean
mvn compile
mvn package
```
## Canarias
Envíe el archivo de guerra para su distribución en el servidor Coastwatch o en algún otro servidor que use la mayoría de los tipos de conjuntos de datos y reciba mucho tráfico.
Queremos tratar de encontrar errores antes de una distribución más amplia de la construcción.

Incluya el mensaje al hablar de una nueva versión.

El procedimiento estándar es:
* Subir el archivo .war a la vigilancia costera\\[tomcat\\]/content/erddap/
* Como usuario=tomcat:
  * In\\[tomcat\\]/bin / :
./shutdown.sh //use "ps -fu tomcat" para asegurar que ha detenido
  * In\\[tomcat\\]/webapps/ :
rm -rf erddap
Rm erddap. guerra
cp ../content/erddap/erddap2.22.war erddap.war //o cualquier número
  * In\\[tomcat\\]/bin / :
./startup.sh
  * Después de laERDDAPha devuelto una página web, en\\[tomcat\\]/webapps/ :
chgrp -R erddap erddap
chmod -R g+rw erddap
chmod -R o-rwx erddap

## GitHub Release
Draft the GitHub release, include erddap.war and erddapContent.zip  (no números de versión) 

title: The official v2.25 version
describir: Ver la lista de cambios
       https://erddap.github.io/changes#version-225
 

## Actualización de documentación
* Actualizar el número de versión en el archivo docusaurus.config.ts (en la sección de pie) .
* Editar las páginas de documentación (deployment-install.md y deployment-update.md) .
  * Búsqueda\\[Erddap.war\\] 
  * Copiar la información existente (ligeramente reformado) a la lista de instalaciones anteriores 2.
  * Cambia la información de liberación actual para erddap. guerra contra\\[Erddap.war\\]
* Ejecute las traducciones para el sitio de documentación.
* Haga una solicitud de tirada y fusione los cambios.
* Despliegue el sitio de documentación (ver readme) .

## Asegurar que otros repos estén actualizados según sea necesario
Principalmente esto significa ErddapContent y ErddapTest, pero deben mantenerse al día durante los cambios de desarrollo.

## Notificar a los Usuarios
Primero notificar a cualquier usuario que solicite cambios (o cuyos errores fueron fijos) . Darles tiempo para verificar los cambios y/o plantear problemas.

ERDDAPversión 2.25 está disponible ahora&#33;

Usted puede leer sobre los cambios en
 https://erddap.github.io/changes#version-225
 

Algunos de los cambios son cambios que usted sugirió. Muchas gracias por sus sugerencias. Busque su nombre en la lista de cambios para ver los detalles. Sería genial si pudieras probar las nuevas características pronto, antes de anunciar esta nueva versión a un público más amplio.

Si eres unERDDAPadministrador, las instrucciones para actualizar están en
 https://erddap.github.io/docs/server-admin/deploy-update
 

Si tiene algún problema, preguntas, sugerencias, por favor envíeme un correo electrónico.

Gracias por usarERDDAP.

### Anuncio
Enviar un anuncio a la lista de anuncios de correo.
