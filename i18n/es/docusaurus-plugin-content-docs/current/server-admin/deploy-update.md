---
sidebar_position: 2
---
# Actualización
Cómo hacer una actualización de una existenciaERDDAP™en su servidor

## Cambios{#changes} 
1. Hacer los cambios listados en[Cambios](/changes)en la sección titulada "CosasERDDAP™Los administradores necesitan saber y hacer" para todos losERDDAP™versiones desde la versión que utilizaste.
     
## Java {#java} 
2. Si usted está actualizando deERDDAP™versión 2.18 o abajo, necesita cambiar aJava21 (o más nuevos) y el correspondiente Tomcat 10. Ver el regularERDDAP™Instrucciones de instalación para[Java](/docs/server-admin/deploy-install#java)y[Tomcat](/docs/server-admin/deploy-install#tomcat). También tendrá que copiar su_tomcat_/content/erddapdirectorio desde tu antigua instalación de Tomcat a tu nueva instalación de Tomcat.

## Descargar{#download} 
3. Descargar[Erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)en _tomcat_/webapps .
     (versión 2.26, 607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, de fecha 03-31-2025) 
     
## mensajes.xml{#messagesxml} 
4. 
    * Común: Si usted está actualizando deERDDAP™versión 1.46 (o superior) y sólo utiliza los mensajes estándar, los nuevos mensajes estándar.xml se instalarán automáticamente (entre los archivos de clase a través de erddap. guerra) .
         
    * Rara: Si usted está actualizando deERDDAP™versión 1.44 (o abajo) ,
Usted debe eliminar el archivo de mensajes antiguos.xml:
        _tomcat_/content/erddap/mesajes.xml .
Los nuevos mensajes estándar.xml se instalarán automáticamente (entre los archivos de clase a través de erddap. guerra) .
         
    * Rara: Si siempre hace cambios en el archivo estándar de mensajes.xml (en su lugar) ,
necesita hacer esos cambios en el nuevo archivo de mensajes.xml (que es
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml after erddap.war is decompressed by Tomcat).
         
    * Rara: Si mantiene un archivo personalizado de mensajes.xml en_tomcat_/content/erddap/,
Tienes que averiguar (via diff) qué cambios se han hecho a los mensajes predeterminados.xml (que están en el nuevo erddap. la guerra
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) y modificar su archivo personalizados.xml como corresponda.
         
## Instala{#install} 
5. Instalar el nuevoERDDAP™en Tomcat:
\\* No use Tomcat Manager. Tarde o temprano habrá problemas de memoria PermGen. Es mejor cerrar y comenzar Tomcat.
\\* Sustitúyase referencias a _tomcat_ abajo con el directorio Tomcat real en su computadora.
     
### Linux y Macs{#linux-and-macs} 
1. Cállate Tomcat: Desde una línea de comandos, utilice: _tomcat_/bin/shutdown.sh
Y usar ps -ef|Tomcat grep para ver si/cuando el proceso ha sido detenido. (Puede tardar un minuto o dos.) 
2. Quitar los descomprimidosERDDAP™instalación: En _tomcat_/webapps, uso
rm -rf erddap
3. Borra el viejo erddap. archivo de guerra: En _tomcat_/webapps, utilice rm erddap. guerra
4. Copia el nuevo erddap. archivo de guerra desde el directorio temporal a _tomcat_/webapps
5. Reinicie Tomcat yERDDAP: use _tomcat_/bin/startup.sh
6. VerERDDAP™en su navegador para comprobar que el reinicio tuvo éxito.
     (A menudo, tienes que probar algunas veces y esperar un minuto antes de verERDDAP™.)   
             
### Windows{#windows} 
1. Cállate Tomcat: Desde una línea de comandos, use: _tomcat_\bin\\shutdown.bat
2. Quitar los descomprimidosERDDAP™instalación: En _tomcat_/webapps, uso
del /S/Q erddap
3. Borra el viejo erddap. archivo de guerra: En _tomcat_\\webapps, usa el erddap. guerra
4. Copia el nuevo erddap. archivo de guerra del directorio temporal a _tomcat_\\webapps
5. Reinicie Tomcat yERDDAP: use _tomcat_\bin\\startup.bat
6. VerERDDAP™en su navegador para comprobar que el reinicio tuvo éxito.
     (A menudo, tienes que probar algunas veces y esperar un minuto antes de verERDDAP™.) 

Actualización de los problemasERDDAP? Vea nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support).
