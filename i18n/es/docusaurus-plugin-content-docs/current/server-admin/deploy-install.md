---
sidebar_position: 1
---

# Instala
Cómo hacer la configuración inicialERDDAP™en su servidor


ERDDAP™puede ejecutarse en cualquier servidor que soportaJavay Tomcat (y otros servidores de aplicaciones como Jetty, pero no los apoyamos) .ERDDAP™ha sido probado en Linux (incluido en el AWS de Amazon) , Mac y ordenadores Windows.

*    **Amazon** -- Si usted está instalandoERDDAP™en una instancia de Amazon Web Services EC2, ver esto[Amazon Web Services Overview](/docs/server-admin/additional-information#amazon)primero.
*    **Docker** -- Axiom ahora ofrece[ERDDAP™en un contenedor Docker](https://hub.docker.com/u/axiom/)IOOS ahora ofrece un[Guía de inicio rápidoERDDAP™en un contenedor Docker](https://ioos.github.io/erddap-gold-standard/index.html).
Es el estándar.ERDDAP™instalación, pero Axiom lo ha puesto en un contenedor de muelles.
Si ya usas Docker, probablemente preferirás la versión Docker.
Si ya no usas Docker, generalmente no recomendamos esto.
Si elegiste instalarERDDAP™via Docker, no ofrecemos ningún soporte para el proceso de instalación.
Aún no hemos trabajado con Docker. Si trabajas con esto, envíanos tus comentarios.
*    **Linux y Macs** --ERDDAP™funciona muy bien en computadoras Linux y Mac. Vea las instrucciones a continuación.
*    **Windows** -- Windows está bien para probarERDDAP™y para uso personal (ver las instrucciones siguientes) , pero no recomendamos utilizarlo para públicoERDDAPs. CorriendoERDDAP™en Windows puede tener problemas:ERDDAP™puede ser incapaz de borrar y/o renombrar archivos rápidamente. Esto probablemente se debe al software antivirus (por ejemplo, de McAfee y Norton) que está revisando los archivos para virus. Si te enfrentas a este problema (que puede ser visto por mensajes de error en[log.txt](/docs/server-admin/additional-information#log)archivo como "Unable to delete ...") , cambiar la configuración del software antivirus puede aliviar parcialmente el problema. O considere usar un servidor Linux o Mac en su lugar.

 **El estándarERDDAP™Instrucciones de instalación para computadoras Linux, Macs y Windows son:** 

0. Asegúrese de que cualquier dependencia esté instalada. En máquinas no Windows (Linux y Mac) Necesitas csh.
## Java {#java} 
1.  [ParaERDDAP™v2.19+, establecidoJava21.](#java)
Por razones de seguridad, es casi siempre mejor utilizar la última versión deJava21.
Por favor, descargar e instalar la última versión de
    [OpenJDK de Adoptium (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Para verificar la instalación, escriba "/_javaJreBinDirectory_/java -version", por ejemplo
/usr/local/jdk-21.0.3+9/jre/bin/java -versión
    
    ERDDAP™obras conJavade otras fuentes, pero recomendamos Adoptium porque es el principal, apoyado por la comunidad, libre (como en cerveza y discurso) versión deJava21 que ofrece soporte a largo plazo (actualizaciones gratuitas durante muchos años pasado la liberación inicial) . Por razones de seguridad, por favor, actualice suERDDAP's versión deJavaperiódicamente como nuevas versionesJava21 están disponibles desde Adoptium.
    
    ERDDAP™ha sido probado y utilizado ampliamente con 21, no otras versiones. Por varias razones, no probamos ni apoyamos otras versiones deJava.
     
## Tomcat{#tomcat} 
2.  [Configuración](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat es el más utilizadoJavaServidor de aplicaciones, que esJavasoftware que se encuentra entre los servicios de red del sistema operativo yJavasoftware servidor comoERDDAP™. Es software libre y de código abierto (FOSS) .
    
Puedes usar otroJavaApplication Server (por ejemplo, Jetty) , pero sólo probamos con y apoyamos a Tomcat.
     
    
    * Descargue Tomcat y desempaque en su servidor o PC.
Por razones de seguridad, es casi siempre mejor utilizar la última versión de Tomcat 10 (no son aceptables) que está diseñado para trabajar conJava21 o más nuevo. A continuación, el directorio Tomcat se denominará _tomcat_.
        
¡Atención&#33; Si ya tienes un Tomcat ejecutando alguna otra aplicación web (especialmente THREDDS) , te recomendamos que instalesERDDAP™dentro[un segundo Tomcat](/docs/server-admin/additional-information#second-tomcat), porqueERDDAP™necesita diferentes configuraciones de Tomcat y no debe tener que lidiar con otras aplicaciones para la memoria.
        
        * En Linux,[descargar el "Core" "tar.gz" Distribución Tomcat](https://tomcat.apache.org/download-10.cgi)y desempacarlo. Recomendamos desempacarlo en /usr/local.
        * En un Mac, Tomcat probablemente ya está instalado en /Library/Tomcat, pero debe actualizarlo a la última versión de Tomcat 10.
Si lo descargas,[descargar el "Core" "tar.gz" Distribución Tomcat](https://tomcat.apache.org/download-10.cgi)y deshacerlo en /Library/Tomcat.
        * En Windows, usted puede[descargar la distribución "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (que no se mete con el registro de Windows y que controla desde una línea de comando DOS) y deshacerlo en un directorio apropiado. (Para el desarrollo, utilizamos la distribución "Core" "zip". Hacemos un directorio /programas y lo desempaquetamos allí.) O puede descargar la distribución "Core" "64-bit Windows zip", que incluye más características. Si la distribución es un instalador de Windows, probablemente pondrá a Tomcat, por ejemplo, /Program Files/apache-tomcat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- En _tomcat_/conf/server.xml archivo, hay dos cambios que usted debe hacer a cada uno de los dos&lt;Conector de contacto; etiquetas- uno para
```
        <Connector port="8080" 
```
y uno para
```
        <Conector port="8443"
```
    1.   (Recomendado) Aumentar el valor del parámetro de conexiónTimeout, quizás a 300000 (milliseconds)   (que es 5 minutos) .
    2.   (Recomendado) Añadir un nuevo parámetro: relaxedQueryChars="\\[\\]|" Esto es opcional y ligeramente menos seguro, pero elimina la necesidad de que los usuarios codifican por ciento estos caracteres cuando se presentan en los parámetros de la URL de solicitud del usuario.
             
### content.xml{#contentxml} 
* context.xml -- Recursos Cache - En _tomcat_/conf/context.xml, justo antes del&lt;/Contexto limitado; etiqueta, cambiar la etiqueta Recursos (o añadirlo si no está allí) para establecer el caché Parámetro MaxSize a 80000:
    &lt;Recursos cachingAllowed="true" cacheMaxSize="80000" / pacientegt;
Esto evita numerosas advertencias en catalina. que todo comienza con
"WARNING\\[principal\\]org.apache.catalina.webresources.Cache.getResource Incapaz de añadir el recurso a\\[/WEB-INF/classes/...]"
         
### Apache Timeout{#apache-timeout} 
* En las computadoras Linux, cambia la configuración de tiempo de Apache para que las solicitudes de usuario que consumen tiempo no tengan tiempo (con lo que a menudo aparece como un error "Proxy" o "Bad Gateway") . Como usuario raíz:
    1. Modificar el Apachehttpd.conf file (generalmente en /etc/httpd/conf/) :
Cambio de las existentes&lt;Tiempo de ajuste (o añadir uno al final del archivo) a 3600 (segundos) , en lugar de los 60 o 120 segundos predeterminados.
Cambio de las existentes&lt;ProxyTimeout curvagt; ajuste (o añadir uno al final del archivo) a 3600 (segundos) , en lugar de los 60 o 120 segundos predeterminados.
    2. reiniciar Apache: /usr/sbin/apachectl -k Graceful (pero a veces está en un directorio diferente) .
             
    * Recomendación de seguridad: See[estas instrucciones](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)para aumentar la seguridad de su instalación Tomcat, especialmente para servidores públicos.
         
    * Para públicoERDDAP™instalaciones en Linux y Macs, es mejor configurar Tomcat (el programa) como perteneciente al usuario "tomcat" (un usuario separado con permisos limitados y que[no tiene contraseña](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Así, sólo el super usuario puede cambiar a actuar como usuario tomcat. Esto hace imposible que los hackers inicien sesión en su servidor como usuario tomcat. Y en cualquier caso, debe hacerlo para que el usuario tomcat tenga permisos muy limitados en el sistema de archivos del servidor (read+write+execute privilegios para el árbol de directorio apache-tomcat y&lt;bigParentDirectory reducidagt; y privilegios sólo lectura para directorios con datos queERDDAP™necesita acceso a).
        * Puedes crear la cuenta de usuario de tomcat (que no tiene contraseña) utilizando el comando
sudo useradd tomcat -s /bin/bash -p '\\* '
        * Puede cambiar a trabajar como usuario tomcat utilizando el comando
sudo su - tomcat
             (Le pedirá la contraseña de superusuario para obtener permiso para hacer esto.) 
        * Puede dejar de trabajar como usuario tomcat utilizando el comando
Salida
        * Hacer la mayor parte del resto del Tomcat yERDDAP™Instrucciones de configuración como usuario "tomcat". Más tarde, ejecute los scripts startup.sh y shutdown.sh como usuario "tomcat" para que Tomcat tenga permiso para escribir a sus archivos de registro.
        * Después de desempacar Tomcat, del padre del directorio apache-tomcat:
            
            * Cambiar la propiedad del árbol del directorio apache-tomcat al usuario tomcat.
chown -R tomcat apache-tomcat-_10.0.23_
                 (pero sustituya el nombre real de su directorio tomcat) .
            * Cambiar el "grupo" para ser tomcat, tu nombre de usuario, o el nombre de un pequeño grupo que incluye tomcat y todos los administradores de Tomcat/ERDDAP, por ejemplo,
chgrp -R _your UserName_ apache-tomcat-_10.0.23_
            * Cambiar permisos para que tomcat y el grupo hayan leído, escriban, ejecuten privilegios, por ejemplo.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Eliminar los permisos del usuario "otro" para leer, escribir o ejecutar:
chmod -R o-rwx apache-tomcat-_10.0.23_
Esto es importante, porque evita que otros usuarios lean información posiblemente sensible enERDDAP™Configuración de archivos.
            
              
### Memoria{#memory} 
* Establecer variables ambientales de Tomcat
    
En Linux y Macs:
Crear un archivo _tomcat_/bin/setenv.sh (o Red Hat Enterprise Linux\\[RHEL\\], editar ~tomcat/conf/tomcat10.conf) para establecer las variables ambientales de Tomcat. Este archivo será utilizado por _tomcat_/bin/startup.sh y shutdown.sh. El archivo debe contener algo como:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (pero sustituya los nombres de directorio de su computadora) .
 (Si usted estableció previamente JRE\\_HOME, usted puede quitar eso.)   
En Macs, probablemente no necesites establecer JAVA\\_HOME.

En Windows:
Crear un archivo _tomcat_\\bin\\setenv.bat para establecer las variables ambientales de Tomcat. Este archivo será utilizado por _tomcat_\bin\\startup.bat yshutdown.bat. El archivo debe contener algo como:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (pero sustituya los nombres de directorio de su computadora) .
Si esto es sólo para las pruebas locales, eliminar "-servidor".
 (Si usted estableció previamente JRE\\_HOME, usted puede quitar eso.) 

Los ajustes de memoria -Xmx y -Xms son importantes porqueERDDAP™funciona mejor con más memoria. Siempre establece -Xms al mismo valor que -Xmx.

* Para 32 bits Sistemas operativos y 32 bitsJava:
64 bitsJavaes mucho mejor que 32 bitsJava, pero 32 bitsJavafuncionará mientras el servidor no esté ocupado. Cuanto más memoria física en el servidor mejor: 4+ GB es realmente bueno, 2 GB está bien, menos no se recomienda. Con 32 bitsJava, incluso con abundante memoria física, Tomcat yJavano funcionará si intenta establecer -Xmx mucho por encima de 1500M (1200M en algunas computadoras) . Si su servidor tiene menos de 2 GB de memoria, reduzca el valor -Xmx (en 'M'egaBytes) a 1/2 de la memoria física del ordenador.
* Para 64 bits Sistemas operativos y 64 bitsJava:
64 bitsJavasólo funcionará en un sistema operativo de 64 bits.
    
    * ConJava8, necesita añadir \\-d64 al parámetro Tomcat CATALINA\\_OPTS en setenv.bat
    * ConJava21, eliges 64 bitsJavacuando descargar una versión deJavamarcado "64 bit".
    
Con 64 bitsJava, TomcatJavapuede utilizar muy alta -Xmx y -Xms configuración. Cuanto más memoria física en el servidor mejor. Como una sugerencia simplista: te recomendamos establecer -Xmx y -Xms a (en 'M'egaBytes) 1/2 (o menos) de la memoria física del ordenador. Puedes ver si Tomcat,Java, yERDDAP™se ejecutan en modo 64 bits buscando " bit", enERDDAP's Daily Report email or in the _bigParentDirectory_/logs/[log.txt](/docs/server-admin/additional-information#log)archivo (_bigParentDirectory_ se especifica en[setup.xml](#setupxml)) .
#### Colección de basura{#garbage-collection} 
* InERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)archivo, verá muchos "GC (Asignación) " mensajes.
Esto generalmente no es un problema. Es un mensaje frecuente de un funcionamiento normalJavadiciendo que acaba de terminar una colección de basura menor porque se quedó sin espacio en Eden (la sección delJavasalto para objetos muy jóvenes) . Por lo general, el mensaje le muestra _memoryUseBefore_\\-DamemoryUseAfter_. Si esos dos números están unidos, significa que la colección de basura no fue productiva. El mensaje es sólo un signo de problemas si es muy frecuente (cada segundo) , no productivo, y los números son grandes y no crecen, que juntos indican queJavanecesita más memoria, está luchando para liberar la memoria, y es incapaz de liberar la memoria. Esto puede suceder durante un tiempo estresante, y luego desaparecer. Pero si persiste, eso es un signo de problemas.
* Si ves java.lang.OutOfMemoryError está dentroERDDAP™'s[log.txt](/docs/server-admin/additional-information#log)archivo, ver[OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)para consejos sobre cómo diagnosticar y resolver los problemas.
         
### Permisos{#permissions} 
*   [En Linux y Macs, cambie los permisos](#permissions)de todos\\*.shficheros en _tomcat_/bin/ para ser ejecutables por el propietario, por ejemplo, con
```
    chmod +x \\*.sh  
```
### Fuentes{#fonts} 
*   [Fuentes para imágenes:](#fonts)Preferimos fuertemente el libre[Fuentes DejaVu](https://dejavu-fonts.github.io/)al otroJavafuentes. Utilizar estas fuentes es muy recomendable pero no es necesario.
    
Si opta por no utilizar las fuentes DejaVu, necesita cambiar la fuenteConfiguración familiar en setup.xml a&lt;fontFamily budgt;SansSerif&lt;/fontFamily limitadagt;, que está disponible con todosJavadistribuciones. Si estableces fuenteFamilia al nombre de una fuente que no está disponible,ERDDAP™no se cargará e imprimirá una lista de fuentes disponibles en el archivo log.txt. Debe utilizar una de esas fuentes.
    
Si elige utilizar las fuentes DejaVu, asegúrese de que la fuenteFamily ajuste en setup.xml es&lt;fuente Familia reducida; DéVu Sans&lt;/fontFamily limitadagt;.
    
Para instalar las fuentes DejaVu, por favor descarga[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) y descifrar los archivos de fuentes a un directorio temporal.
    
    * En Linux:
        * Para Linux AdoptiumJavadistribuciones, ver[estas instrucciones](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Con otrosJavadistribuciones: Como usuario de Tomcat, copie los archivos de fuente en _JAVA\\_HOME_/lib/fonts asíJavapuede encontrar las fuentes. Recuerde: si/cuando más tarde se actualiza a una versión más nueva deJava, necesita reinstalar estas fuentes.
    * En Macs: para cada archivo de fuentes, haga doble clic en él y luego haga clic en Instalar Fuente.
    * En Windows 7 y 10: en Windows Explorer, seleccione todos los archivos de fuente. Clic derecho. Haga clic en Instalar.
             
### Prueba Tomcat{#test-tomcat} 
* Prueba tu instalación de Tomcat.
    * Linux:
        * Como usuario "tomcat", ejecutar _tomcat_/bin/startup.sh
        * Ver su URL + ":8080/" en su navegador (por ejemplo,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Deberías ver la página "Felicitaciones" de Tomcat.
Si hay problemas, consulte el archivo de registro de Tomcat _tomcat_/logs/catalina.out.
    * Mac (ejecutar tomcat como el usuario administrador del sistema) :
        * Run _tomcat_/bin/startup.sh
        * Ver su URL + ":8080/" en su navegador (por ejemplo,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Tenga en cuenta que por defecto, su Tomcat sólo es accesible por usted. No es accesible públicamente.
        * Deberías ver la página "Felicitaciones" de Tomcat.
Si hay problemas, consulte el archivo de registro de Tomcat _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Haga clic derecho en el icono Tomcat en la bandeja del sistema, y seleccione "Iniciar servicio".
        * Ver[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), o quizás[ http://localhost:8080/ ](http://localhost:8080/), en su navegador. Tenga en cuenta que por defecto, su Tomcat sólo es accesible por usted. No es accesible públicamente.
        * Deberías ver la página "Felicitaciones" de Tomcat.
Si hay problemas, consulte el archivo de registro de Tomcat _tomcat_/logs/catalina.out.
            
### ¿Problemas con la instalación de Tomcat?{#troubles-with-the-tomcat-installation} 
* En Linux y Mac, si no puedes llegar a Tomcat oERDDAP™  (o tal vez no puedes contactarlos desde un ordenador fuera de tu cortafuegos) Puedes probar si Tomcat está escuchando el puerto 8080, escribiendo (como raíz) en una línea de comandos del servidor:
```  
    netstat -tuplen | grep 8080  
```
Eso debería devolver una línea con algo como:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (donde '#' es un dígito) , indicando que un proceso de "java" (Supongo que Tomcat) está escuchando en el puerto "8080" para el tráfico "tcp". Si no se devolvieron líneas, si la línea devuelta es significativamente diferente, o si se devolvieron dos o más líneas, entonces puede haber un problema con la configuración del puerto.
* Ver el archivo de registro de Tomcat _tomcat_/logs/catalina.out. Problemas de Tomcat y algunosERDDAP™Los problemas de arranque son casi siempre indicados allí. Esto es común cuando se está estableciendoERDDAP™.
* Ver el[Tomcat](https://tomcat.apache.org/)sitio web o buscar la web para obtener ayuda, pero por favor háganos saber los problemas que tenía y las soluciones que encontró.
* Vea nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support).
             
### ERDDAP™Índice{#erddap-content} 
3.  [Configurar el_tomcat_/content/erddaparchivos de configuración.](#erddap-content)  
En Linux, Mac y Windows, descargar[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versión 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, de fecha 2024-10-14) y deshacerlo en _tomcat_, creando_tomcat_/content/erddap.

    \\[Algunas versiones anteriores también están disponibles:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, fechada 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, fechada 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, de fecha 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, de fecha 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, de fecha 2023-02-27) 
y deshacerlo en _tomcat_, creando_tomcat_/content/erddap.\\]
    
#### Otros directorios{#other-directory} 
Para Red Hat Enterprise Linux (RHEL) o para otras situaciones en las que no se le permite modificar el directorio Tomcat o donde desea/necesita poner elERDDAP™directorio de contenidos en alguna otra ubicación por alguna otra razón (por ejemplo, si usas Jetty en lugar de Tomcat) , unzip erddapContent.zipen el directorio deseado (a la que sólo el usuario=tomcat tiene acceso) y establecer elerddapContentDirectorypropiedad del sistema (por ejemplo,erddapContentDirectory=~tomcat/content/erddap) Así que...ERDDAP™puede encontrar este nuevo directorio de contenidos.
    
### setup.xml{#setupxml} 
*   [Lea los comentarios en_tomcat_/content/erddap/ **setup.xml** ](#setupxml)y hacer los cambios solicitados. setup.xml es el archivo con todas las configuraciones que especifican cómoERDDAP™Se comporta.
Para la configuración inicial, debe cambiar al menos estos ajustes:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Cuando creas el directorio de BigParent, desde el directorio principal de BigParentDirectory:
    
    * Hacer usuario=tomcat el propietario de la granDirectoría de Padre, por ejemplo,
```
        chown -R tomcat _bigParentDirectory_
```
    * Cambiar el "grupo" para ser tomcat, tu nombre de usuario, o el nombre de un pequeño grupo que incluye tomcat y todos los administradores de Tomcat/ERDDAP, por ejemplo,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Cambiar permisos para que tomcat y el grupo hayan leído, escriban, ejecuten privilegios, por ejemplo.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Eliminar los permisos del usuario "otro" para leer, escribir o ejecutar. Esto es importante para prevenir la lectura de información posiblemente sensibleERDDAP™archivos de registro y archivos con información sobre conjuntos de datos privados.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Medio ambiente{#environment-variables} 
Empezando conERDDAP™v2.13,ERDDAP™los administradores pueden anular cualquier valor en setup.xml especificando una variable ambiente llamadaERDDAP\\__valueName_ antes de correrERDDAP™. Por ejemplo, usoERDDAP\\_baseUrl anula el&lt;baseUrl círculo; valor. Esto puede ser útil cuando se implementaERDDAP™con un contenedor como Docker, ya que puede poner la configuración estándar en setup.xml y luego suministrar ajustes especiales a través de variables ambientales. Si usted suministra información secreta aERDDAP™a través de este método, asegúrese de comprobar que la información permanecerá secreta.ERDDAP™sólo lee variables de entorno una vez por startup, en el primer segundo de startup, por lo que una manera de utilizar esto es: establecer las variables de entorno, comenzarERDDAP, espera hastaERDDAP™se inicia, luego desactiva las variables ambientales.
    
### datasets.xml {#datasetsxml} 
* Lea los comentarios en[ **Trabajando con eldatasets.xmlArchivo** ](/docs/server-admin/datasets). Luego, después de que lleguesERDDAP™corriendo por primera vez (generalmente con sólo los conjuntos de datos predeterminados) , modificará el XML en_tomcat_/content/erddap/ **datasets.xml** para especificar todos los conjuntos de datos que deseaERDDAP™para servir. Aquí es donde pasarás la mayor parte de tu tiempo mientras te preparasERDDAP™y más tarde manteniendo suERDDAP™.
     
*    (Diferentemente) Ahora o (ligeramente más probable) en el futuro, si desea modificar el archivo CSS de Erddap, haga una copia de_tomcat_/content/erddap/images/erddapStart2.css llamado erddap2.css y luego hacer cambios en él. Los cambios a erddap2.css sólo tienen efecto cuandoERDDAP™se reinicia y a menudo también requieren que el usuario despeje los archivos en caché del navegador.
     
ERDDAP™no funcionará correctamente si la configuración.xml odatasets.xmlEl archivo no es un archivo XML bien formado. Así que, después de editar estos archivos, es una buena idea verificar que el resultado es XML bien formado mediante el pegado del texto XML en una ficha XML como[xmlvalidación](https://www.xmlvalidation.com/).
     
### Instala el archivo erddap.war{#install-the-erddapwar-file} 
4. En Linux, Mac y Windows, descargar[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)en _tomcat_/webapps .
     (versión 2.25_1, 592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, fechada 2024-11-07) 
    
El archivo .war es grande porque contiene datos de alta resolución de costa, frontera y elevación necesarios para crear mapas.
    
    \\[Algunas versiones anteriores también están disponibles.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, fechada 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, dated 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, de fecha 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, de fecha 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, dated 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, dated 2024-06-07) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Use Proxy Pase por lo que los usuarios no tienen que poner el número de puerto, por ejemplo, :8080, en la URL.
En las computadoras Linux, si Tomcat se ejecuta en Apache, por favor modifique el Apachehttpd.conf file (generalmente en /etc/httpd/conf/) para permitir el tráfico HTTP a / desdeERDDAP™sin requerir el número de puerto, por ejemplo, :8080, en la URL. Como usuario raíz:
    1. Modificar el existente&lt;VirtualHost adultogt; tag (si hay uno) , o añadir uno al final del archivo:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Luego reinicia Apache: /usr/sbin/apachectl -k Graceful (pero a veces está en un directorio diferente) .
         
### NGINX{#nginx} 
 (UNCOMMON) Si usted está usando[NGINX](https://www.nginx.com/)  (un servidor web y balanceador de carga) :
para conseguir NGINX yERDDAP™trabajar correctamentehttps, usted necesita poner el siguiente snippet dentro del servidor Tomcat.xml&lt;Abrazo:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Y en el archivo de config nginx, necesita establecer estos encabezados:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Gracias a Kyle Wilcox.)   
     
### Empieza Tomcat{#start-tomcat} 
*    (No recomiendo usar el Administrador de aplicaciones web de Tomcat. Si no cierras completamente y empiezas Tomcat, tarde o temprano tendrás problemas de memoria PermGen.)   
     
*    (En Linux o Mac OS, si usted ha creado un usuario especial para ejecutar Tomcat, por ejemplo, tomcat, recuerde hacer los siguientes pasos como ese usuario.)   
     
* Si Tomcat ya está corriendo, cierra Tomcat con (en Linux o Mac OS) _tomcat_/bin/shutdown.sh
o (en Windows) _tomcat_\\bin\\shutdown.bat
    
En Linux, utilice ps -ef|grep tomcat antes y después de apagado.sh para asegurarse de que el proceso de tomcat se ha detenido. El proceso debe ser enumerado antes de la apagación y eventualmente no aparece después de la apagada. Puede tomar un minuto o dos paraERDDAP™para cerrar completamente. Sé paciente. O si parece que no se detendrá por sí solo, use:
matar -9 _processID_
    
* Empieza con Tomcat (en Linux o Mac OS) _tomcat_/bin/startup.sh
o (en Windows) _tomcat_\\bin\\startup.bat

## IERDDAP™¿Corriendo?{#is-erddap-running} 
Utilice un navegador para tratar de ver http://_www.YourServer.org_/erddap/status.html   
ERDDAP™comienza sin ningún conjunto de datos cargados. Los conjuntos de datos se cargan en un hilo de fondo y así se ponen a disposición uno por uno.

### Solución de problemas{#troubleshooting} 
* Cuando una solicitud de un usuario entra, va a Apache (en computadoras Linux y Mac OS) Entonces TomcatERDDAP™.
* Puedes ver lo que viene a Apache (y errores conexos) en los archivos de registro de Apache.
*   [Tú.](/docs/server-admin/additional-information#tomcat-logs)puede ver lo que viene a Tomcat (y errores conexos) en los archivos de registro de Tomcat (_tomcat_/logs/catalina.out y otros archivos en ese directorio) .
*   [Tú.](/docs/server-admin/additional-information#log)puede ver lo que vieneERDDAP, mensajes de diagnóstico deERDDAP, y mensajes de error deERDDAP, en elERDDAP™ &lt;bigParentDirectory reducidagt;logs/log.txt file.
* Tomcat no empiezaERDDAP™hasta que Tomcat reciba una solicitudERDDAP™. Así que puede ver en los archivos de registro de Tomcat si comenzóERDDAP™o si hay un mensaje de error relacionado con ese intento.
* CuandoERDDAP™comienza, renombra el viejoERDDAP™log.txt file (logArchivedAt_CurrentTime_.txt) y crea un nuevo archivo log.txt. Así que si el registro. archivo txt es viejo, es un signo queERDDAP™no ha vuelto a empezar.ERDDAP™escribe información de registro a un búfer y sólo escribe el búfer al archivo de registro periódicamente, pero puede forzarERDDAP™para escribir el búfer al archivo de registro visitando .../erddap/status.html.

### Problemas: Versión antiguaJava {#trouble-old-version-of-java} 
Si está usando una versión deJavaque es demasiado viejo paraERDDAP,ERDDAP™no funcionará y verá un mensaje de error en el archivo de registro de Tomcat como
Excepción en hilo "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Versión principal sin soporte _someNumber_
La solución es actualizar a la versión más reciente deJavay asegúrate de que Tomcat lo use.

### Problemas: Slow Startup First Time{#trouble-slow-startup-first-time} 
Tomcat tiene que hacer mucho trabajo la primera vez una aplicación comoERDDAP™se inicia; notablemente, tiene que desempacar el erddap. archivo de guerra (que es como un.ziparchivo) . En algunos servidores, el primer intento de verERDDAP™puestos (¿30 segundos?) hasta que termine este trabajo. En otros servidores, el primer intento fallará inmediatamente. Pero si esperas 30 segundos e intentas de nuevo, tendrá éxito siERDDAP™fue instalado correctamente.
No hay solución para esto. Así es como funciona Tomcat. Pero sólo ocurre la primera vez después de instalar una nueva versión deERDDAP™.

## Apaga y reinicia{#shut-down-and-restart} 
En el futuro, para cerrar (y reiniciar)  ERDDAP, ver[Cómo cerrar y reiniciar Tomcat yERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## ¿Problemas?{#trouble} 
Problemas para instalar Tomcat oERDDAP? Vea nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support).
## Notificación de Nuevas VersionesERDDAP {#email-notification-of-new-versions-of-erddap} 
Si desea recibir un correo electrónico cuando una nueva versión deERDDAP™está disponible u otro importanteERDDAP™anuncios, puedes unirte a losERDDAP™lista de anuncios[Aquí.](https://groups.google.com/g/erddap-announce). Esta lista promedio aproximadamente un email cada tres meses.
## Personalizar{#customize} 
[Personalice suERDDAP™para destacar su organización (noNOAA ERD) .](#customize)
    * Cambiar el banner que aparece en la parte superior de todosERDDAP™.html pages by editing&lt;startBodyHtml5 pulmonar; tag en tudatasets.xmlarchivo. (Si no hay uno, copiar el predeterminado deERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file intodatasets.xmly editarlo.) Por ejemplo, podría:
        * Usar una imagen diferente (i.e., el logotipo de su organización) .
        * Cambiar el color de fondo.
        * CambioERDDAP"a tu organización"ERDDAP"
        * Cambiar "Acceso más fácil a los datos científicos" a "Acceso más fácil a los datos de _YourOrganization_".
        * Cambiar los enlaces "Brought to you by" para ser enlaces a su organización y fuentes de financiación.
    * Cambiar la información en el lado izquierdo de la página de inicio editando&lt;theShortDescriptionHtml adultogt; etiqueta en sudatasets.xmlarchivo. (Si no hay uno, copiar el predeterminado deERDDAP's
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file intodatasets.xmly editarlo.) Por ejemplo, podría:
        * Describa lo que hace su organización y/o grupo.
        * Describir qué tipo de datos esteERDDAP™Sí.
    * Para cambiar el icono que aparece en las pestañas del navegador, ponga el favicon de su organización. ico en_tomcat_/content/erddap/images/ . See[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
