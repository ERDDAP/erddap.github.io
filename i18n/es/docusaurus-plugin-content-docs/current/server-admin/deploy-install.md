---
sidebar_position: 1
---

# Instala
Cómo hacer la configuración inicial ERDDAP™ en su servidor

 ERDDAP™ puede ejecutarse en cualquier servidor que soporta Java y Tomcat (y otros servidores de aplicaciones como Jetty, pero no los apoyamos) .
 ERDDAP™ ha sido probado en Linux (incluido en el AWS de Amazon) , Mac y ordenadores Windows.

*  **Docker** -- Proporcionamos [ ERDDAP™ en un contenedor Docker](https://hub.docker.com/r/erddap/erddap) 
IOOS ahora ofrece un [Guía de inicio rápido ERDDAP™ en un contenedor Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
Es el estándar. ERDDAP™ instalación, en un contenedor Docker.
A través de Docker Compongamos que proporcionamos maneras fáciles de establecer ssl y monitoreo, leer más [Documentación de Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Si ya usas Docker, probablemente preferirás la versión Docker.
Si usted está buscando para ejecutar en los servicios de la nube usted probablemente prefiere la versión Docker.
*  **Amazon** -- Si usted está instalando ERDDAP™ en una instancia de Amazon Web Services EC2, ver esto [Amazon Web Services Overview](/docs/server-admin/additional-information#amazon) primero.
*  **Linux y Macs** -- ERDDAP™ funciona muy bien en computadoras Linux y Mac. Vea las instrucciones a continuación.
*  **Windows** -- Windows está bien para probar ERDDAP™ y para uso personal (ver las instrucciones siguientes) ,
pero no recomendamos utilizarlo para público ERDDAP™ despliegues. Corriendo ERDDAP™ en Windows puede tener problemas:
en particular, ERDDAP™ puede ser incapaz de borrar y/o renombrar archivos rápidamente. Esto probablemente se debe al software antivirus
   (por ejemplo, de McAfee y Norton) que está revisando los archivos para virus. Si te enfrentas a este problema
(que puede ser visto por mensajes de error en [log.txt](/docs/server-admin/additional-information#log) archivo
"Incapaz de eliminar ..."), cambiar la configuración del software antivirus puede aliviar parcialmente el problema. O considere usar un servidor Linux o Mac en su lugar.

 **El estándar ERDDAP™ Instrucciones de instalación para computadoras Linux, Macs y Windows son:** 

0. Asegúrese de que cualquier dependencia esté instalada. En máquinas no Windows (Linux y Mac) Necesitas csh.

##  Java  {#java} 

1.  [Para ERDDAP™ v2.19+, establecido Java 21.](#java) 
Por razones de seguridad, es casi siempre mejor utilizar la última versión de Java 21.
Por favor, descargar e instalar la última versión de
    [OpenJDK de Adoptium (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Para verificar la instalación, ejecute `/javaJreBinDirectory/java -version`, por ejemplo
`/usr/local/jdk-21.0.3+9/jre/bin/java -versión.

    ERDDAP™ obras con Java de otras fuentes, pero recomendamos Adoptium porque es el principal, apoyado por la comunidad,
gratis (como en cerveza y discurso) versión de Java 21 que ofrece soporte a largo plazo (actualizaciones gratuitas durante muchos años pasado la liberación inicial) .
Por razones de seguridad, por favor, actualice su ERDDAP 's versión de Java periódicamente como nuevas versiones Java 21 están disponibles desde Adoptium.

    ERDDAP™ ha sido probado y utilizado ampliamente con 21, no otras versiones. Por varias razones, no probamos ni apoyamos otras versiones de Java .
     
## Tomcat{#tomcat} 

2.  [Configuración](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat es el más utilizado Java Servidor de aplicación,
que es Java software que se encuentra entre los servicios de red del sistema operativo y Java software servidor como ERDDAP™ .
Es software libre y de código abierto (FOSS) .

Puedes usar otro Java Application Server (por ejemplo, Jetty) , pero sólo probamos con y apoyamos a Tomcat.

   * Descargue Tomcat y desempaque en su servidor o PC.
Por razones de seguridad, es casi siempre mejor utilizar la última versión de Tomcat 10 (no son aceptables) 
que está diseñado para trabajar con Java 21 o más nuevo. A continuación, el directorio Tomcat se denominará `tomcat`.

__Warning&#33; Si ya tienes un Tomcat ejecutando alguna otra aplicación web (especialmente THREDDS) , te recomendamos que instales ERDDAP™ dentro
      [un segundo Tomcat](/docs/server-admin/additional-information#second-tomcat) , porque ERDDAP™ necesita diferentes configuraciones de Tomcat
y no debería tener que lidiar con otras aplicaciones para la memoria.

     * En Linux, [descargar el "Core" "tar .gz " Distribución Tomcat](https://tomcat.apache.org/download-10.cgi) y desempacarlo.
Recomendamos desempacarlo en `/usr/local`.
     * En un Mac, Tomcat probablemente ya está instalado en `/Library/Tomcat`, pero debe actualizarlo a la última versión de Tomcat 10.
Si lo descargas, [descargar el "Core" "tar .gz " Distribución Tomcat](https://tomcat.apache.org/download-10.cgi) y desempacarlo en `/Library/Tomcat`.
     * En Windows, usted puede [descargar la distribución "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (que no se mete con el registro de Windows y que controla desde una línea de comando DOS) y deshacerlo en un directorio apropiado.
        (Para el desarrollo, utilizamos la distribución "Core" "zip". Hacemos un directorio '/programas' y lo desempaquetamos allí.) 
O puede descargar la distribución "Core" "64-bit Windows zip", que incluye más características.
Si la distribución es un instalador de Windows, probablemente pondrá a Tomcat, por ejemplo, `/Program Files/apache-tomcat-10.0.23`.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - En el archivo `tomcat/conf/server.xml`, hay dos cambios que usted debe hacer a cada uno de los dos ` <Connector> Etiquetas
   (uno para ` port connector='8080' y otro para ``) .
   1.  (Recomendado) Aumentar el valor del parámetro `connectionTimeout`, quizás a 300000 (milisegundos, que es 5 minutos) .
   2.  (Recomendado) Añadir un nuevo parámetro: `relaxedQueryChars='[] | ". Esto es opcional y ligeramente menos seguro,
pero elimina la necesidad de que los usuarios codifican por ciento estos caracteres cuando se presentan en los parámetros de la URL de solicitud del usuario.
             
### content.xml{#contentxml} 

* context.xml -- Recursos Cache - In `tomcat/conf/context.xml`, right before the ` </Context> etiqueta, cambiar la etiqueta Recursos
   (o añadirlo si no está allí) para establecer el caché Parámetro MaxSize a 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Esto evita numerosas advertencias en catalina. que todo comienza con
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* En las computadoras Linux, cambia la configuración de tiempo de Apache para que las solicitudes de usuario que consumen tiempo no tengan tiempo
   (con lo que a menudo aparece como un error "Proxy" o "Bad Gateway") . Como usuario raíz:
  * Modificar el Apache http d. archivo (generalmente en `/etc/ http d/conf/ `) :
    * Cambio de la actual <Timeout> ` (o añadir uno al final del archivo) a 3600 (segundos) , en lugar de los 60 o 120 segundos predeterminados.
    * Cambio de la actual <ProxyTimeout> ` (o añadir uno al final del archivo) a 3600 (segundos) , en lugar de los 60 o 120 segundos predeterminados.
  * Restart Apache: `/usr/sbin/apachectl -k Graceful ` (pero a veces está en un directorio diferente) .

### Seguridad{#security} 
         
* Recomendación de seguridad: See [estas instrucciones](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) para aumentar la seguridad
su instalación de Tomcat, especialmente para servidores públicos.
         
* Para público ERDDAP™ instalaciones en Linux y Macs, es mejor configurar Tomcat (el programa) como perteneciente al usuario `tomcat `
   (un usuario separado con permisos limitados y que [no tiene contraseña](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Así, sólo el super usuario puede cambiar a actuar como usuario `tomcat`. Esto hace imposible que los hackers inicien sesión en su servidor como usuario `tomcat`.
Y en cualquier caso, usted debe hacerlo de modo que el usuario 'tomcat' tiene permisos muy limitados en el sistema de archivos del servidor (read+write+execute privilegios
para el árbol del directorio 'apache-tomcat' y ` <bigParentDirectory> &quot; y privilegios sólo lectura para directorios con datos que ERDDAP™ necesita acceso a).
  * Puede crear la cuenta de usuario 'tomcat` (que no tiene contraseña) utilizando el comando:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Puede cambiar a trabajar como usuario `tomcat` utilizando el comando
    ```
    sudo su - tomcat
    ```
     (Le pedirá la contraseña de superusuario para obtener permiso para hacer esto.) 
    * Puede dejar de trabajar como usuario tomcat utilizando el comando
    ```
    exit
    ````
    * Hacer la mayor parte del resto del Tomcat y ERDDAP™ Instrucciones de configuración como usuario `tomcat`. Más tarde, ejecute los scripts `startup.sh` y `shutdown.sh` como usuario `tomcat `
para que Tomcat tenga permiso para escribir a sus archivos de registro.
    * Después de desempacar a Tomcat, del padre del directorio `apache-tomcat`:
      * Cambiar la propiedad del árbol del directorio apache-tomcat al usuario tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (pero sustituya el nombre real de su directorio tomcat) .
      * Cambiar el "grupo" para ser tomcat, tu nombre de usuario, o el nombre de un pequeño grupo que incluye tomcat y todos los administradores de Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Cambiar permisos para que tomcat y el grupo hayan leído, escriban, ejecuten privilegios:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Eliminar los permisos del usuario "otro" para leer, escribir o ejecutar:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Esto es importante, porque evita que otros usuarios lean información posiblemente sensible en ERDDAP™ Configuración de archivos.

### Memoria{#memory} 

Establecer variables ambientales de Tomcat

* En Linux y Macs:
Crear un archivo `tomcat/bin/setenv.sh ` (o Red Hat Enterprise Linux \\[ RHEL \\] , editar `~tomcat/conf/tomcat10.conf `) para establecer las variables ambientales de Tomcat.
Este archivo será utilizado por `tomcat/bin/startup.sh` y `shutdown.sh`. El archivo debe contener algo como:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (pero sustituya los nombres de directorio de su computadora) .
   (Si usted estableció previamente `JRE_HOME`, usted puede quitar eso.) 
En Macs, probablemente no necesites establecer `JAVA_HOME`.

* En Windows:
Cree un archivo `tomcat\bin\\setenv.bat` para establecer las variables ambientales de Tomcat.
Este archivo será utilizado por `tomcat\bin\\startup.bat` y ` shutdown.bat `.
El archivo debe contener algo como:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (pero sustituya los nombres de directorio de su computadora) .
Si esto es sólo para las pruebas locales, eliminar "-servidor".
   (Si usted estableció previamente `JRE_HOME`, usted puede quitar eso.) 

Los ajustes de memoria `-Xmx` y `-Xms` son importantes porque ERDDAP™ funciona mejor con más memoria.
Siempre establece `-Xms` al mismo valor que `-Xmx`.

* Para 32 bits Sistemas operativos y 32 bits Java :
64 bits Java es mucho mejor que 32 bits Java , pero 32 bits Java funcionará mientras el servidor no esté ocupado.
Cuanto más memoria física en el servidor mejor: 4+ GB es realmente bueno, 2 GB está bien, menos no se recomienda.
Con 32 bits Java , incluso con abundante memoria física, Tomcat y Java no funcionará si intenta establecer `-Xmx` mucho más allá de 1500M (1200M en algunas computadoras) .
Si su servidor tiene menos de 2 GB de memoria, reduzca el valor '-Xmx` (en 'M'egaBytes) a 1/2 de la memoria física del ordenador.

* Para 64 bits Sistemas operativos y 64 bits Java :
64 bits Java sólo funcionará en un sistema operativo de 64 bits.
  * Con Java 8, necesitas añadir `-d64` al parámetro Tomcat `CATALINA_OPTS` en `setenv.bat`.
  * Con Java 21, eliges 64 bits Java cuando descargar una versión de Java marcado "64 bit".

Con 64 bits Java , Tomcat Java puede utilizar configuraciones muy altas `-Xmx` y `-Xms`. Cuanto más memoria física en el servidor mejor.
Como sugerencia simplista: te recomendamos que pongas `-Xmx` y `-Xms` a (en 'M'egaBytes) 1/2 (o menos) de la memoria física del ordenador.
Puedes ver si Tomcat, Java , y ERDDAP™ se ejecutan en modo 64 bits buscando " bit", en ERDDAP 's Daily Report email
o en el &quot; Gran ParentDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) `archivo (`bigParentDirectory` se especifica en [setup.xml](#setupxml) ) .

#### Colección de basura{#garbage-collection} 

* In ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) archivo, verá muchos "GC (Asignación) " mensajes.
Esto generalmente no es un problema. Es un mensaje frecuente de un funcionamiento normal Java diciendo que acaba de terminar una basura menor
colección porque se quedó sin espacio en Eden (la sección del Java salto para objetos muy jóvenes) . Normalmente el mensaje te muestra
`memoryUseBefore- ConfmemoryUseAfter`. Si esos dos números están unidos, significa que la colección de basura no fue productiva.
El mensaje es sólo un signo de problemas si es muy frecuente (cada segundo) , no productivo, y los números son grandes y no crecen,
que en conjunto indican que Java necesita más memoria, está luchando para liberar la memoria, y es incapaz de liberar la memoria.
Esto puede suceder durante un tiempo estresante, y luego desaparecer. Pero si persiste, eso es un signo de problemas.
* Si ves 'java.lang.OutOfMemoryError's in ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) archivo,
ver [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) para consejos sobre cómo diagnosticar y resolver los problemas.
         
### Permisos{#permissions} 

*  [En Linux y Macs, cambie los permisos](#permissions) de todos los archivos `*.sh` en `tomcat/bin/` para ser ejecutables por el propietario:
  ```
  chmod +x *.sh
  ```

### Fuentes{#fonts} 

*  [Fuentes para imágenes:](#fonts) Preferimos fuertemente el libre [Fuentes DejaVu](https://dejavu-fonts.github.io/) al otro Java fuentes.
Utilizar estas fuentes es muy recomendable pero no es necesario.

Si opta por no utilizar las fuentes DejaVu, necesita cambiar la fuenteConfiguración familiar en setup.xml a ` <fontFamily> SansSerif </fontFamily> `,
que está disponible con todo Java distribuciones. Si estableces: <fontFamily> ` al nombre de una fuente que no está disponible, ERDDAP™ no cargará
e imprimirá una lista de fuentes disponibles en el archivo `log.txt. Debe utilizar una de esas fuentes.

Si opta por utilizar las fuentes DejaVu, asegúrese de que <fontFamily> ` configuración en setup.xml es ` <fontFamily> DejaVu Sans </fontFamily> `.

Para instalar las fuentes DejaVu, por favor descarga [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
y descifrar los archivos de fuentes a un directorio temporal.

  * En Linux:
    * Para Linux Adoptium Java distribuciones, ver [estas instrucciones](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Con otros Java distribuciones: Como usuario `tomcat`, copiar los archivos de fuente en `$JAVA_HOME/lib/fonts` so Java puede encontrar las fuentes.
Recuerde: si/cuando más tarde se actualiza a una versión más nueva de Java , necesita reinstalar estas fuentes.
  * En Macs: para cada archivo de fuentes, haga doble clic en él y luego haga clic en Instalar Fuente.
  * En Windows 7 y 10: en Windows Explorer, seleccione todos los archivos de fuente. Clic derecho. Haga clic en Instalar.
             
### Prueba Tomcat{#test-tomcat} 

* Prueba tu instalación de Tomcat.
  * Linux:
    * Como usuario "tomcat", ejecutar `tomcat/bin/startup.sh`.
    * Ver su URL + ":8080/" en su navegador (por ejemplo, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (ejecutar tomcat como el usuario administrador del sistema) :
    * Run `tomcat/bin/startup.sh`.
    * Ver su URL + ":8080/" en su navegador (por ejemplo, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Tenga en cuenta que por defecto, su Tomcat sólo es accesible por usted. No es accesible públicamente.
  * Windows localhost:
    * Haga clic derecho en el icono Tomcat en la bandeja del sistema, y seleccione "Iniciar servicio".
    * Ver [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , o quizás [http://localhost:8080/](http://localhost:8080/) , en su navegador. Tenga en cuenta que por defecto, su Tomcat sólo es accesible por usted. No es accesible públicamente.

Deberías ver la página "Felicitaciones" de Tomcat.

Si hay problemas, consulte el archivo de registro de Tomcat en `tomcat/logs/catalina.out`.

### ¿Problemas con la instalación de Tomcat?{#troubles-with-the-tomcat-installation} 

* En Linux y Mac, si no puedes llegar a Tomcat o ERDDAP™   (o tal vez no puedes contactarlos desde un ordenador fuera de tu cortafuegos) ,
puede probar si Tomcat está escuchando el puerto 8080, escribiendo (como raíz) en una línea de comandos del servidor:

  ```
  netstat -tuplen | grep 8080
  ```

Eso debería devolver una línea con algo como:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (Donde '#' es un dígito) , indicando que un proceso de `java &apos; (Supongo que Tomcat) está escuchando en el puerto "8080" para el tráfico "tcp".
Si no se devolvieron líneas, si la línea devuelta es significativamente diferente, o si se devolvieron dos o más líneas, entonces puede haber un problema con la configuración del puerto.

* Ver el archivo de registro Tomcat `tomcat/logs/catalina.out`. Problemas de Tomcat y algunos ERDDAP™ Los problemas de arranque son casi siempre indicados allí.
Esto es común cuando se está estableciendo ERDDAP™ .

* Ver el [Tomcat](https://tomcat.apache.org/) sitio web o buscar la web para obtener ayuda, pero por favor háganos saber los problemas que tenía y las soluciones que encontró.

* Vea nuestro [sección sobre la obtención de apoyo adicional](/docs/intro#support) .
             
###  ERDDAP™ Índice{#erddap-content} 
3.   [Configurar los archivos de configuración 'tomcat/content/erddap'.](#erddap-content) 
En Linux, Mac y Windows, descargar [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
y descifrarlo en el directorio 'tomcat`, creando `tomcat/content/erddap`.

__Version 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, fechada 2024-10-14__

Algunas versiones anteriores también están disponibles:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, fechada 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, fechada 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, de fecha 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, de fecha 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, de fecha 2023-02-27) 

#### Otros directorios{#other-directory} 

Para Red Hat Enterprise Linux (RHEL) o para otras situaciones en las que no se le permite modificar el directorio Tomcat o donde desea/necesita
para poner el ERDDAP™ directorio de contenidos en alguna otra ubicación por alguna otra razón (por ejemplo, si usas Jetty en lugar de Tomcat) ,
unzip `erddapContent .zip `en el directorio deseado (a la que sólo el usuario `tomcat &apos; tiene acceso) y establecer el erddapContentDirectory ` propiedad del sistema
 (e.g. erddapContentDirectory  =~tomcat/content/erddap `) Así que... ERDDAP™ puede encontrar este nuevo directorio de contenidos.

### setup.xml{#setupxml} 

*  [Lea los comentarios en `tomcat/content/erddap/setup.xml `](#setupxml) y hacer los cambios solicitados. setup.xml es el archivo con todas las configuraciones que especifican cómo ERDDAP™ Se comporta.

Para la configuración inicial, debe cambiar al menos estos ajustes:
      * ` <bigParentDirectory> `
      * ` <emailEverythingTo> `
      * ` <baseUrl> `
      * ` <email...> Ajustes
      * ` <admin...> Ajustes
      * ` <baseHttpsUrl> ` (cuando se estableció https ) 

Cuando creas el directorio de BigParent, desde el directorio principal de BigParentDirectory:

    * Haga al usuario 'tomcat' el propietario de la 'bigParentDirectory':
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Cambiar el "grupo" para ser tomcat, tu nombre de usuario, o el nombre de un pequeño grupo que incluye tomcat y todos los administradores de Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Cambiar permisos para que tomcat y el grupo hayan leído, escriban, ejecuten privilegios:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Eliminar los permisos del usuario "otro" para leer, escribir o ejecutar. Esto es importante para prevenir la lectura de información posiblemente sensible
dentro ERDDAP™ archivos de registro y archivos con información sobre conjuntos de datos privados.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Medio ambiente{#environment-variables} 

Empezando con ERDDAP™ v2.13, ERDDAP™ los administradores pueden anular cualquier valor en setup.xml especificando una variable entorno
llamado ERDDAP _valueName` antes de correr ERDDAP™ . Por ejemplo, use ` ERDDAP _baseUrl` anula el ` <baseUrl> Valor.
Esto puede ser útil cuando se implementa ERDDAP™ con un contenedor como Docker, como puede poner la configuración estándar en setup.xml
y luego suministrar ajustes especiales a través de variables ambientales. Si usted suministra información secreta a ERDDAP™ a través de este método,
Asegúrese de comprobar que la información permanecerá secreta. ERDDAP™ sólo lee variables ambientales una vez por startup,
en el primer segundo de inicio, por lo que una manera de utilizar esto es: establecer las variables del entorno, comenzar ERDDAP ,
Espera. ERDDAP™ se inicia, luego desactiva las variables ambientales.

###  datasets.xml  {#datasetsxml} 

* Lea los comentarios en [ **Trabajando con el datasets.xml Archivo** ](/docs/server-admin/datasets) . Luego, después de que llegues ERDDAP™ corriendo
por primera vez (generalmente con sólo los conjuntos de datos predeterminados) , modificará el XML en `tomcat/content/erddap/ datasets.xml `
para especificar todos los conjuntos de datos que desea ERDDAP™ para servir. Aquí es donde pasarás la mayor parte de tu tiempo
mientras se establece ERDDAP™ y más tarde manteniendo su ERDDAP™ .

Puedes ver un ejemplo. [ datasets.xml en GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Diferentemente) Ahora o (ligeramente más probable) en el futuro, si desea modificar el archivo CSS de Erddap, copiar
`tomcat/content/erddap/images/erddapStart2.css` to `tomcat/content/erddap/images/erddap2.css` and then make changes to it.
Los cambios a `erddap2.css` sólo tienen efecto cuando ERDDAP™ se reinicia y a menudo también requieren que el usuario despeje los archivos en caché del navegador.
     
 ERDDAP™ no funcionará correctamente si la configuración.xml o datasets.xml El archivo no es un archivo XML bien formado. Entonces, después de editar estos archivos,
es una buena idea verificar que el resultado es XML bien formado al pegar el texto XML en un chequeador XML como [xmlvalidación](https://www.xmlvalidation.com/) .
     
### Instala el erddap. archivo de guerra{#install-the-erddapwar-file} 

4. En Linux, Mac y Windows, __download [Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) __ into `tomcat/webapps`:

__Versión 2.28.1, 622,676,238 bytes, MD5=48b4226045f950c8d69ef9521b9bc9, de fecha 2025-09-05__

El archivo .war es grande porque contiene datos de alta resolución de costa, frontera y elevación necesarios para crear mapas.

Algunas versiones anteriores también están disponibles.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, fechada 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, dated 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, de fecha 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, de fecha 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, dated 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, dated 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, dated 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, de fecha 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, de fecha 2025-06-11) 

### Configure proxy (despliegue específico)  {#proxy} 

 ERDDAP™ normalmente se implementa detrás de un servidor web inverso proxy para permitir que se sirva en puertos HTTP estándar (80 y 443) .
La terminación SSL/TLS a menudo se mantiene en la capa proxy del servidor web también. Las características específicas dependen de las necesidades de cada despliegue.

#### Apache{#apache} 

1. Ensure that `mod_proxy` and `mod_proxy_ http ` están cargados:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modificar el existente &quot; <VirtualHost> etiqueta (si hay uno) , o añadir uno al final del archivo:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Si ERDDAP™ se sirve en un camino que no sea `/erddap &apos; , también puso el encabezado 'X-Forwarded-Prefix` al
path segment _before_ `/erddap`. Esta configuración sería apropiada para un ERDDAP™ atendidos
`/subpath/erddap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Luego reinicia Apache: `/usr/sbin/apachectl -k Graceful ` (pero a veces está en un directorio diferente) .
         
#### NGINX{#nginx} 

En el archivo de configuración nginx, establece estos encabezados:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Si ERDDAP™ se sirve en un camino que no sea `/erddap &apos; , también puso el encabezado 'X-Forwarded-Prefix` al
path segment _before_ `/erddap`. Esta configuración sería apropiada para un ERDDAP™ atendidos
`/subpath/erddap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Para conseguir NGINX y ERDDAP™ trabajar correctamente https , usted necesita poner el siguiente snippet dentro del servidor Tomcat.xml <Host> bloque:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Empieza Tomcat{#start-tomcat} 

*  (No recomiendo usar el Administrador de aplicaciones web de Tomcat. Si no cierras completamente y empiezas Tomcat, tarde o temprano tendrás problemas de memoria PermGen.) 
*  (En Linux o Mac OS, si usted ha creado un usuario especial para ejecutar Tomcat, por ejemplo, tomcat, recuerde hacer los siguientes pasos como ese usuario.) 
* Si Tomcat ya está corriendo, cierra Tomcat con (en Linux o Mac OS) `tomcat/bin/shutdown.sh`
o (en Windows) `tomcat\bin\\ shutdown.bat `

En Linux, use 'ps -ef | grep tomcat` antes y después de `shutdown.sh` para asegurarse de que el proceso de tomcat se ha detenido.
El proceso debe ser enumerado antes de la apagación y eventualmente no aparece después de la apagada.
Puede tomar un minuto o dos para ERDDAP™ para cerrar completamente. Sé paciente. O si parece que no se detendrá por sí solo, use:
`kill -9 <processID> `
* Empieza con Tomcat (en Linux o Mac OS) `tomcat/bin/startup.sh` o (en Windows) `tomcat\bin\\startup.bat `

## I ERDDAP™ ¿Corriendo?{#is-erddap-running} 

Utilice un navegador para tratar de verhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ comienza sin ningún conjunto de datos cargados. Los conjuntos de datos se cargan en un hilo de fondo y así se ponen a disposición uno por uno.

### Solución de problemas{#troubleshooting} 

* Cuando una solicitud de un usuario entra, va a Apache (en computadoras Linux y Mac OS) Entonces Tomcat ERDDAP™ .
* Puedes ver lo que viene a Apache (y errores conexos) en los archivos de registro de Apache.
*    [Tú.](/docs/server-admin/additional-information#tomcat-logs) puede ver lo que viene a Tomcat (y errores conexos) 
en los archivos de registro de Tomcat (`tomcat/logs/catalina.out` y otros archivos en ese directorio) .
*    [Tú.](/docs/server-admin/additional-information#log) puede ver lo que viene ERDDAP , mensajes de diagnóstico de ERDDAP ,
y mensajes de error ERDDAP , en el ERDDAP™ ` <bigParentDirectory> /logs/log.txt` file.
* Tomcat no empieza ERDDAP™ hasta que Tomcat reciba una solicitud ERDDAP™ . Así que puedes ver en los archivos de registro de Tomcat si
comenzado ERDDAP™ o si hay un mensaje de error relacionado con ese intento.
* Cuando ERDDAP™ comienza, renombra el viejo ERDDAP™ log.txt file ('logArchived At <CurrentTime> .txt) y crea un nuevo archivo log.txt.
Así que si el archivo `log.txt` es viejo, es una señal de que ERDDAP™ no ha vuelto a empezar. ERDDAP™ escribe información de registro a un buffer
y sólo escribe el búfer al archivo de registro periódicamente, pero puede forzar ERDDAP™ para escribir el búfer al archivo de registro visitando
` /erddap/status.html `.

### Problemas: Versión antigua Java  {#trouble-old-version-of-java} 

Si está usando una versión de Java que es demasiado viejo para ERDDAP , ERDDAP™ no funcionará y verá un mensaje de error en el archivo de registro de Tomcat como

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

La solución es actualizar a la versión más reciente de Java y asegúrate de que Tomcat lo use.

### Problemas: Slow Startup First Time{#trouble-slow-startup-first-time} 

Tomcat tiene que hacer mucho trabajo la primera vez una aplicación como ERDDAP™ se inicia; en particular, tiene que desempacar el archivo `erddap.war`
 (que es como un .zip archivo) . En algunos servidores, el primer intento de ver ERDDAP™ puestos (¿30 segundos?) hasta que termine este trabajo.
En otros servidores, el primer intento fallará inmediatamente. Pero si esperas 30 segundos e intentas de nuevo, tendrá éxito si ERDDAP™ fue instalado correctamente.

No hay solución para esto. Así es como funciona Tomcat. Pero sólo ocurre la primera vez después de instalar una nueva versión de ERDDAP™ .

## Apaga y reinicia{#shut-down-and-restart} 

En el futuro, para cerrar (y reiniciar)   ERDDAP™ , ver [Cómo cerrar y reiniciar Tomcat y ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## ¿Problemas?{#trouble} 

Problemas para instalar Tomcat o ERDDAP™ ? Vea nuestro [sección sobre la obtención de apoyo adicional](/docs/intro#support) .

## Notificación de Nuevas Versiones ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Si desea recibir un correo electrónico cuando una nueva versión de ERDDAP™ está disponible u otro importante ERDDAP™ anuncios,
puedes unirte a ERDDAP™ lista de anuncios [Aquí.](https://groups.google.com/g/erddap-announce) . Esta lista promedio aproximadamente un email cada tres meses.

## Personalizar{#customize} 

*  [Personalice su ERDDAP™ para destacar su organización (no NOAA   ERD ) .](#customize) 
* Cambiar el banner que aparece en la parte superior de todos ERDDAP™ .html pages by editing the <startBodyHtml5> etiqueta en tu datasets.xml archivo.
(Si no hay uno, copiar el predeterminado de ERDDAP™ 's `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` archivo
en ` datasets.xml y editarlo.) Por ejemplo, podría:
  * Usar una imagen diferente (i.e., el logotipo de su organización) .
  * Cambiar el color de fondo.
  * Cambio ERDDAP™ "a tu organización" ERDDAP™ "
  * Cambiar "Acceso más fácil a los datos científicos" a "Acceso más fácil a los datos de _YourOrganization_".
  * Cambiar los enlaces "Brought to you by" para ser enlaces a su organización y fuentes de financiación.
* Cambiar la información en el lado izquierdo de la página de inicio editando el <theShortDescriptionHtml> etiqueta en tu datasets.xml archivo.
(Si no hay uno, copiar el predeterminado de ERDDAP™ 's `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` archivo
en ` datasets.xml y editarlo.) Por ejemplo, podría:
  * Describa lo que hace su organización y/o grupo.
  * Describir qué tipo de datos este ERDDAP™ Sí.
  * Para cambiar el icono que aparece en las pestañas del navegador, ponga el favicon de su organización. ico en `tomcat/content/erddap/images/`.
Seehttps://en.wikipedia.org/wiki/Favicon.
