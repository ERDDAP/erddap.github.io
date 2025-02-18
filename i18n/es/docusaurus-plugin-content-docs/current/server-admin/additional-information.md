---
sidebar_position: 4
---
ERDDAP™- Arregla tu propioERDDAP™    

## Cosas que necesitas saber{#things-you-need-to-know} 
     
###    **[Errores Proxy](#proxy-errors)**  {#proxy-errors} 
A veces, una solicitud paraERDDAP™devolverá un error Proxy, un error HTTP 502 Bad Gateway, o algún error similar. Estos errores están siendo lanzados por Apache o Tomcat, noERDDAP™en sí mismo.
* Si cada solicitud genera estos errores, especialmente cuando usted está primero en configurar suERDDAP™, entonces probablemente es un error proxy o mala puerta de entrada, y la solución es probablemente para arreglar[ERDDAP's configuración proxy](/docs/server-admin/deploy-install#proxypass). Este también puede ser el problema cuando un establecidoERDDAP™de repente comienza a lanzar estos errores por cada petición.
* De lo contrario, los errores "proxy" son generalmente hora de errores lanzados por Apache o Tomcat. Incluso cuando suceden relativamente rápidamente, es una especie de respuesta de Apache o Tomcat que ocurre cuandoERDDAP™está muy ocupado, limitado por memoria, o limitado por algún otro recurso. En estos casos, consulte el siguiente consejo para tratar con[ERDDAP™respondiendo lentamente](#responding-slowly).
        
Solicitudes de un largo rango de tiempo (Puntos de tiempo) de un conjunto de datos redondeados son propensas a fallos de salida del tiempo, que a menudo aparecen como Errores Proxy, porque toma tiempo significativo paraERDDAP™abrir todos los archivos de datos uno por uno. SiERDDAP™está ocupado durante la solicitud, el problema es más probable que ocurra. Si los archivos del conjunto de datos son comprimidos, el problema es más probable que ocurra, aunque es difícil para un usuario determinar si los archivos de un conjunto de datos están comprimidos.
La solución es hacer varias solicitudes, cada una con un rango de tiempo más pequeño. ¿Qué tan pequeño de un rango de tiempo? Sugiero empezar muy pequeño (- ¿30 puntos de tiempo?) Entonces (aproximadamente) doblar el rango de tiempo hasta que la solicitud falla, luego volver una duplicación. Entonces haga todas las peticiones (cada uno por un trozo diferente de tiempo) necesario para obtener todos los datos.
AnERDDAP™administrador puede disminuir este problema aumentando el[Ajustes de tiempo de Apache](/docs/server-admin/deploy-install#apache-timeout).
        
### Supervisión{#monitoring} 
Todos queremos nuestros servicios de datos para encontrar a su público y ser ampliamente utilizados, pero a veces susERDDAP™puede ser utilizado demasiado, causando problemas, incluyendo respuestas súper lentas para todas las solicitudes. Nuestro plan para evitar problemas es:

* MonitorERDDAP™a través de[status.html página web](#status-page).
Tiene mucha información útil. Si usted ve que un gran número de solicitudes están llegando, o toneladas de memoria que se utilizan, o toneladas de solicitudes fallidas, o cada Major LoadDatasets está tomando un largo tiempo, o ver cualquier signo de las cosas que se embolsan y responden lentamente, entonces mire enERDDAP's[log.txt file](#log)para ver qué está pasando.
    
También es útil simplemente notar lo rápido que responde la página de estado. Si responde lentamente, es un indicador importante queERDDAP™está muy ocupado.
    
* MonitorERDDAP™a través de[Daily Report](#daily-report)correo electrónico.
     
* Vea los conjuntos de datos actualizados a través de los *base* /erddap/outOfDateDatasets.htmlpágina web que se basa en la[testOutOfDate](/docs/server-admin/datasets#testoutofdate)atributo global.
     
#### Monitores externos{#external-monitors} 
Los métodos enumerados anteriormente sonERDDAPSon formas de monitorizarse. También es posible hacer o utilizar sistemas externos para monitorear suERDDAP. Un proyecto para hacer esto es[Proyecto métrico de Axiom](https://github.com/axiom-data-science/erddap-metrics). Tales sistemas externos tienen algunas ventajas:
* Se pueden personalizar para proporcionar la información que desee, mostrada en la forma que desee.
* Pueden incluir información sobreERDDAP™queERDDAP™no puede acceder fácilmente o en absoluto (por ejemplo, uso de CPU, espacio libre de disco,ERDDAP™tiempo de respuesta visto desde la perspectiva del usuario,ERDDAP™horas de trabajo,
* Pueden proporcionar alertas (correos electrónicos, llamadas telefónicas, textos) a los administradores cuando los problemas superan algún umbral.
             
### Múltiplo simultáneo Solicitudes{#multiple-simultaneous-requests} 
*    **¡Los usuarios de lista negra hacen múltiples solicitudes simultáneas&#33;** 
Si está claro que algún usuario está haciendo más de una solicitud simultánea, repetidamente y continuamente, añada su dirección IP aERDDAPEs...&lt;requestBlacklist confiar] (/docs/servidor-admin/datasets#requestblacklist) en tudatasets.xmlarchivo. A veces las solicitudes son todas de una dirección IP. A veces son de varias direcciones IP, pero claramente el mismo usuario. También puede lista negra haciendo un montón de solicitudes inválidas o toneladas de solicitudes ineficientes mentalmente.
    
Entonces, por cada solicitud que hacen,ERDDAP™retornos:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Esperemos que el usuario vea este mensaje y contacte con usted para averiguar cómo solucionar el problema y bajar de la lista negra. A veces, solo cambian las direcciones IP e intentan de nuevo.
    
Es como el equilibrio de poder entre las armas ofensivas y defensivas en la guerra. Aquí, las armas defensivas (ERDDAP) tienen una capacidad fija, limitada por el número de núcleos en la CPU, el ancho de banda de acceso al disco y el ancho de banda de red. Pero las armas ofensivas (usuarios, especialmente scripts) tienen capacidad ilimitada:
    
    * Una sola solicitud de datos de muchos puntos de tiempo puede causarERDDAPabrir un gran número de archivos (en secuencia o parcialmente) . En casos extremos, una solicitud "simple" puede atar fácilmente el RAID adherido aERDDAP™por un minuto, bloqueando efectivamente el manejo de otras solicitudes.
         
    * Una sola solicitud puede consumir un trozo grande de memoria (AunqueERDDAP™está codificado para minimizar la memoria necesaria para manejar grandes solicitudes) .
         
    * Paralelización -
Es fácil para un usuario inteligente para paralelizar una gran tarea generando un montón de hilos, cada uno de los cuales presenta una solicitud separada (que puede ser grande o pequeño) . Este comportamiento es estimulado por la comunidad informática como una manera eficiente de lidiar con un gran problema (y paralelización es eficiente en otras circunstancias) . Volver a la analogía de la guerra: los usuarios pueden hacer un número esencialmente ilimitado de solicitudes simultáneas con el costo de cada uno de ellos esencialmente cero, pero el costo de cada solicitud entra enERDDAP™puede ser grande yERDDAP's capacidad de respuesta es finita. Claramente,ERDDAP™perderá esta batalla, a menos que laERDDAP™administrador de listas negras usuarios que están haciendo múltiples solicitudes simultáneas que están desplegando injustamente a otros usuarios.
         
    * Múltiples scripts -
Ahora piensa en lo que sucede cuando hay varios usuarios inteligentes cada uno ejecutando scripts paralelizados. Si un usuario puede generar tantas solicitudes que otros usuarios están llenos, entonces múltiples usuarios de este tipo pueden generar tantas solicitudes queERDDAP™se vuelve abrumado y aparentemente no responde. Es efectivamente un[DDOS attack](https://en.wikipedia.org/wiki/Denial-of-service_attack)De nuevo, la única defensa paraERDDAP™es para los usuarios de la lista negra que hacen múltiples solicitudes simultáneas que son injustamente repartiendo a otros usuarios.
         
    * Expectativas infladas -
En este mundo de empresas tecnológicas masivas (Amazon, Google, Facebook, ...) , los usuarios han venido a esperar capacidades esencialmente ilimitadas de los proveedores. Dado que estas empresas están haciendo operaciones monetarias, cuanto más usuarios tienen, más ingresos tienen que ampliar su infraestructura de TI. Así pueden permitirse una infraestructura de TI masiva para manejar las solicitudes. Y limitan inteligentemente el número de solicitudes y el costo de cada solicitud de los usuarios limitando el tipo de solicitudes que los usuarios pueden hacer para que ninguna solicitud sea onerosa, y nunca hay una razón (o una manera) para que los usuarios hagan múltiples solicitudes simultáneas. Así que estas enormes empresas tecnológicas pueden tener mucho más usuarios queERDDAP™, pero tienen enormes recursos y maneras inteligentes de limitar las solicitudes de cada usuario. Es una situación manejable para las grandes empresas de TI (¡Y se hacen ricos&#33;) pero no paraERDDAP™instalaciones. De nuevo, la única defensa paraERDDAP™es para los usuarios de la lista negra que hacen múltiples solicitudes simultáneas que son injustamente repartiendo a otros usuarios.
         
    
Así que usuarios: ¡No hagas múltiples solicitudes simultáneas o serás lista negra&#33;
     

Claramente, es mejor si su servidor tiene muchos núcleos, mucha memoria (así puedes asignar mucha memoria aERDDAP™, más que nunca necesita) , y una alta conexión a internet ancho de banda. Entonces, la memoria es raramente o nunca un factor limitante, pero el ancho de banda de red se convierte en el factor limitante más común. Básicamente, como hay más y más solicitudes simultáneas, la velocidad a cualquier usuario disminuye. Esto desacelera naturalmente el número de solicitudes que vienen si cada usuario está presentando una solicitud a la vez.
    
### ERDDAP™Obtener datos de THREDDS{#erddap-getting-data-from-thredds} 
Si tuERDDAP™obtiene algunos de sus datos de un THREDDS en su sitio, hay algunas ventajas para hacer una copia de los archivos de datos THREDDS (al menos para los conjuntos de datos más populares) en otro RAID queERDDAP™tiene acceso aERDDAP™puede servir datos de los archivos directamente. AtERD, lo hacemos para nuestros conjuntos de datos más populares.

*   ERDDAP™puede obtener los datos directamente y no tiene que esperar a que THREDDS vuelva a cargar el conjunto de datos o ...
*   ERDDAP™puede notar e incorporar nuevos archivos de datos inmediatamente, por lo que no tiene que plagar THREDDS frecuentemente para ver si el conjunto de datos ha cambiado. [Véase]&lt;actualizar EveryNMillis confiar] (/docs/servidor-admin/datasets) .
* La carga se divide entre 2 RAIDS y 2 servidores, en lugar de la solicitud siendo dura en ambosERDDAP™y THREDDS.
* Evitas el problema del desajuste causado por THREDDS teniendo un pequeño (por defecto) tamaño máximo de solicitud.ERDDAP™tiene un sistema para manejar el desajuste, pero evitar el problema es mejor.
* Usted tiene una copia de seguridad de los datos que siempre es una buena idea.

En cualquier caso, nunca corras THREDDS yERDDAP™en el mismo Tomcat. Ejecutarlos en Tomcats separados, o mejor, en servidores separados.

Encontramos que TREDDS periódicamente entra en un estado donde las solicitudes sólo se cuelgan. Si tuERDDAP™está recibiendo datos de un THREDDS y el THREDDS está en este estado,ERDDAP™tiene una defensa (dice que el conjunto de datos basados en THREDDS no está disponible) , pero todavía es problemático paraERDDAP™porqueERDDAP™tiene que esperar hasta el tiempo cada vez que intenta volver a cargar un conjunto de datos de un THREDDS colgado. Algunos grupos (incluidoERD) evitar esto mediante el reacondicionamiento proactiva de THREDDS con frecuencia (por ejemplo, noche en un trabajo de cron) .

### Respondiendo lentamente{#responding-slowly} 
*    **SiERDDAP™Está respondiendo lentamente** o si ciertas solicitudes están respondiendo lentamente,
puede ser capaz de averiguar si la lentitud es razonable y temporal (por ejemplo, debido a muchas solicitudes de scripts oWMSusuarios) , o si algo es inexplicablemente incorrecto y usted necesita[cerrar y reiniciar Tomcat yERDDAP™](#shut-down-and-restart).
    
SiERDDAP™está respondiendo lentamente, vea el consejo a continuación para determinar la causa, que esperamos le permitirá solucionar el problema.
Usted puede tener un punto de partida específico (por ejemplo, una URL de solicitud específica) o un punto de partida vago (por ejemplo,ERDDAP™es lento) .
Usted puede saber el usuario involucrado (por ejemplo, porque te mandaron por correo electrónico) O no.
Puede tener otras pistas, o no.
Dado que todas estas situaciones y todas las posibles causas de los problemas se desenfocan juntas, el consejo siguiente trata de tratar todos los puntos de partida posibles y todos los problemas posibles relacionados con respuestas lentas.
    
    *    **Busca pistas en[ERDDAP's log file](#log)**   ( *bigParentDirectory* /logs/log.txt) .
        \\[En raras ocasiones, hay pistas en[Archivo de registro de Tomcat](#tomcat-logs)  ( *tomcat* /logs/catalina.out) .\\]  
Busque mensajes de error.
Busque un gran número de solicitudes provenientes de una (o algunos) usuarios y tal vez hogging un montón de recursos de su servidor (memoria, tiempo de CPU, acceso al disco, ancho de banda de Internet) .
        
Si el problema está ligado a **un usuario** , a menudo puede obtener una pista sobre quién es el usuario a través de servicios web como[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)que puede darle información relacionada con la dirección IP del usuario (que puedes encontrar enERDDAP's[log.txt](#log)archivo) .
        
        * Si el usuario parece ser un **Bot** portándose mal (notablemente, un motor de búsqueda tratando de llenar elERDDAP™formas con cada permutación posible de los valores de entrada) , asegúrese de que ha establecido correctamente el servidor[robots.txt](#robotstxt)archivo.
        * Si el usuario parece ser un **script (s) ** que está haciendo múltiples solicitudes simultáneas, contactar al usuario, explicar que suERDDAP™recursos limitados (por ejemplo, memoria, tiempo de CPU, acceso al disco, ancho de banda de Internet) , y pedirles que sean considerados de otros usuarios y sólo haga una solicitud a la vez. También podría mencionar que los chantajearás si no retroceden.
        * Si el usuario parece ser un **script** haciendo un gran número de solicitudes de consumo de tiempo, pida al usuario que sea considerado por otros usuarios poniendo una pequeña pausa (¿2 segundos?) en el guión entre solicitudes.
        *    **WMSsoftware cliente** puede ser muy exigente. Un cliente a menudo pedir 6 imágenes personalizadas a la vez. Si el usuario parece ser unWMScliente que está haciendo solicitudes legítimas, puede:
            * Ignoralo. (recomendado, porque se moverán pronto) 
            * Apaga el servidorWMSservicio a travésERDDAParchivo HTML. (no recomendado) 
        * Si las solicitudes parecen **estúpido, loco, excesivo o malicioso,** o si no puede resolver el problema de otra manera, considere agregar temporalmente o permanentemente la dirección IP del usuario a la [&lt;requestBlacklist confiar en sudatasets.xmlarchivo] (/docs/servidor-admin/datasets#requestblacklist) .
             
    *    **Trate de duplicar el problema usted mismo, desde su computadora.**   
Averigüe si el problema está con un conjunto de datos o todos los conjuntos de datos, para un usuario o todos los usuarios, para ciertos tipos de solicitudes, etc.
Si puede duplicar el problema, trate de reducir el problema.
Si no puede duplicar el problema, entonces el problema puede estar vinculado al ordenador del usuario, la conexión a Internet del usuario o la conexión a Internet de su institución.
         
    * Si **un conjunto de datos** está respondiendo lentamente (tal vez sólo para **un tipo de solicitud** de un usuario) , el problema puede ser:
        *   ERDDAP's access to the dataset's source data (principalmente de bases de datos relacionales, Cassandra y conjuntos de datos remotos) puede ser temporal o permanentemente lento. Intente comprobar la velocidad de la fuente independiente deERDDAP. Si es lento, quizás puedas mejorarlo.
        * ¿El problema está relacionado con la solicitud específica o tipo general de solicitud?
Cuanto mayor sea el subconjunto solicitado de un conjunto de datos, más probable será que la solicitud falle. Si el usuario está haciendo enormes solicitudes, pídale al usuario que haga solicitudes más pequeñas que son más propensos a obtener una respuesta rápida y exitosa.
            
Casi todos los conjuntos de datos son mejores para manejar algunos tipos de solicitudes que otros tipos de solicitudes. Por ejemplo, cuando un conjunto de datos almacena diferentes fragmentos de tiempo en diferentes archivos, las solicitudes de datos de un gran número de puntos de tiempo pueden ser muy lentas. Si las solicitudes actuales son de tipo difícil, considere ofrecer una variante del conjunto de datos que se optimiza para estas solicitudes. O simplemente explique al usuario que ese tipo de solicitud es difícil y consume mucho tiempo, y pida su paciencia.
            
        * El conjunto de datos puede no configurarse de forma óptima. Usted puede ser capaz de hacer cambios en el conjunto de datosdatasets.xmlpara ayudarERDDAP™manejar mejor el conjunto de datos. Por ejemplo,
            
            *   EDDGridLos conjuntos de datos de NcFiles que acceden a datos de archivos comprimidos nc4/hdf5 son lentos al obtener datos para toda la gama geográfica (por ejemplo, para un mapa mundial) porque todo el archivo debe ser descomprimido. Usted podría convertir los archivos a archivos no comprimidos, pero entonces el requisito del espacio del disco será mucho, mucho más grande. Es probablemente mejor aceptar que tales conjuntos de datos serán lentos en ciertas circunstancias.
            * La configuración del [&lt;subsetVariables&gt; (/docs/servidor-admin/datasets#subsetvariables) la etiqueta tiene una gran influencia en cómoERDDAP™maneja conjuntos de datos EDDTable.
            * Usted puede ser capaz de aumentar el[velocidad de un EDDTableDesdeDatabase](/docs/server-admin/datasets#database-speed)Dataset.
            * Muchos conjuntos de datos EDDTable se pueden crear por[almacenamiento de una copia de los datos enNetCDFArchivos de Array contiguos](/docs/server-admin/datasets#eddtablefromfiles), queERDDAP™puede leer muy rápidamente.
            
Si desea ayuda para acelerar un conjunto de datos específico, incluya una descripción del problema y el conjunto de datosdatasets.xmly ver nuestra[sección sobre la obtención de apoyo adicional](/docs/intro#support).
             
    * Si **todo** dentroERDDAP™es **siempre** lento, el problema puede ser:
        * La computadora que está funcionandoERDDAP™puede no tener suficiente memoria o poder de procesamiento. Es bueno correrERDDAP™en un servidor moderno, multi-core. Para uso pesado, el servidor debe tener un sistema operativo de 64 bits y 8 GB o más de memoria.
        * La computadora que está funcionandoERDDAP™También puede estar ejecutando otras aplicaciones que consumen muchos recursos del sistema. Si es así, puede conseguir un servidor dedicado paraERDDAP? Por ejemplo (esto no es un aval) , puede obtener un Mac Mini Server de cuatro núcleos con 8 GB de memoria para ~$1100.
             
    * Si **todo** dentroERDDAP™es **temporalmente** lento, mira tuERDDAP's[ **/erddap/status.htmlpágina** ](#status-page)en su navegador.
        * ¿El qué?ERDDAP™¿La página de estado no se carga?
Si es así,[reiniciarERDDAP™](#shut-down-and-restart).
        * ¿Qué?ERDDAP™estado página carga lentamente (p. ej., &gt;5 segundos) ?
Eso es una señal de que todo enERDDAP™corre lentamente, pero no es necesariamente un problema.ERDDAP™puede estar muy ocupado.
        * Para "Response Failed Time (desde el último gran LoadDatasets) ", es n= un gran número?
Eso indica que ha habido muchas solicitudes fallidas recientemente. Eso puede ser un problema o el comienzo de problemas. El tiempo medio para los fracasos es a menudo grande (por ejemplo, 210000 ms) ,
que significa que hubo (¿Sí?) Muchos hilos activos.
que estaban atando muchos recursos (como memoria, archivos abiertos, tomas abiertas, ...) ,
que no es bueno.
        * Para "Response Succeed Time (desde el último gran LoadDatasets) ", es n= un gran número?
Eso indica que ha habido muchas solicitudes exitosas recientemente. Esto no es problema. Sólo significa tuERDDAP™se está haciendo muy útil.
        * ¿Es el "Número de hilos que no esperan Tomcat" doble un valor típico?
Esto a menudo es un problema serio que causaráERDDAP™para frenar y eventualmente congelar. Si esto persiste durante horas, es posible que desee proactivamente[reiniciarERDDAP™](#shut-down-and-restart).
        * En la parte inferior de la lista "Memory Use Summary", es el último "Memory: actualmente utiliza" valor muy alto?
Eso puede indicar un alto uso, o puede ser un signo de problemas.
        * Mira la lista de hilos y su estado. ¿Hay un número inusual de ellos haciendo algo inusual?
             
    * I **la conexión a Internet de su institución** ¿ actualmente lento?
Busque Internet para "prueba de velocidad de Internet" y utilice una de las pruebas en línea gratuitas, como[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Si la conexión a Internet de su institución es lenta, entonces las conexiones entreERDDAP™y las fuentes de datos remotas serán lentas, y las conexiones entreERDDAP™y el usuario será lento. A veces, puede resolver esto parando el uso innecesario de Internet (por ejemplo, gente viendo videos de streaming o en videoconferencias) .
         
    * I **la conexión de Internet del usuario** ¿ actualmente lento?
Haga que el usuario busque en Internet para "prueba de velocidad de Internet" y use una de las pruebas en línea gratuitas, como[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Si la conexión de Internet del usuario es lenta, disminuye su acceso aERDDAP. A veces, pueden resolver esto parando el uso innecesario de Internet en su institución (por ejemplo, gente viendo videos de streaming o en videoconferencias) .
         
    *    **¿Atascado?**   
Vea nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support).

### Cállate y reinicia{#shut-down-and-restart} 
*    **Cómo cerrar y reiniciar Tomcat yERDDAP™**   
No necesitas cerrar y reiniciar a Tomcat yERDDAPsiERDDAP™es temporalmente lento, lento por alguna razón conocida (como muchas solicitudes de scripts oWMSusuarios) , o para aplicar cambiosdatasets.xmlarchivo.
    
Necesitas cerrar y reiniciar a Tomcat yERDDAP™si necesita aplicar cambios en el archivo setup.xml, o siERDDAP™Congela, cuelga o cierra. En circunstancias extremas,Javapuede congelarse por un minuto o dos mientras hace una colección completa de basura, pero luego recuperarse. Así que es bueno esperar un minuto o dos para ver siJava/ERDDAP™es realmente congelado o si está haciendo una larga colección de basura. (Si la recolección de basura es un problema común,[asignar más memoria a Tomcat](/docs/server-admin/deploy-install#memory).) 
    
No recomiendo usar el Administrador de aplicaciones web de Tomcat para iniciar o cerrar Tomcat. Si no cierras completamente y empiezas Tomcat, tarde o temprano tendrás problemas de memoria PermGen.
    
Para cerrar y reiniciar Tomcat yERDDAP:
    
    * Si utiliza Linux o un Mac:
         (Si usted ha creado un usuario especial para ejecutar Tomcat, por ejemplo, tomcat, recuerde hacer los siguientes pasos como ese usuario.)   
         
        1. Use cd *tomcat* /bin
             
        2. Use ps -ef|Griep tomcat para encontrar el proceso java/tomcat ID (con suerte, sólo un proceso será listado) , que llamaremos *javaProcessID* abajo.
             
        3. SiERDDAP™está congelado/hung/locked up, use kill -3 *javaProcessID* para decirJava  (que está ejecutando Tomcat) para hacer un vertedero de hilo al archivo de registro de Tomcat: *tomcat* /logs/catalina.out . Después de reiniciar, puede diagnosticar el problema encontrando la información del vertedero de hilos (y cualquier otra información útil sobre ella) dentro *tomcat* /logs/catalina.out y también leyendo partes relevantes[ERDDAP™Archivo de registros](#log). Si quieres, puedes incluir esa información y ver nuestra[sección sobre la obtención de apoyo adicional](/docs/intro#support).
             
        4. Use ./shutdown. #
             
        5. Use ps -ef|Tomcat grep repetidamente hasta que el proceso java/tomcat no está listado.
            
A veces, el proceso java/tomcat tomará hasta dos minutos para cerrar completamente. La razón es:ERDDAP™envía un mensaje a sus hilos de fondo para decirles que paren, pero a veces toma estos hilos un largo tiempo para llegar a un buen lugar de parada.
            
        6. Si después de un minuto o así, java/tomcat no se detiene por sí mismo, se puede utilizar
matar a 9 *javaProcessID*   
forzar el proceso java/tomcat para detenerse inmediatamente. Si es posible, use esto sólo como último recurso. El interruptor -9 es potente, pero puede causar varios problemas.
             
        7. Para reiniciarERDDAP™, use ./startup.sh
             
        8. VerERDDAP™en su navegador para comprobar que el reinicio tuvo éxito. (A veces, necesitas esperar 30 segundos e intentar cargarERDDAP™de nuevo en su navegador para que tenga éxito.)   
             
    * Si utiliza Windows:
         
        1. Use cd *tomcat* /bin
             
        2. Usoshutdown.bat  
             
        3. Es posible que desee utilizar el Administrador de tareas de Windows (accesible vía Ctrl Alt Del) para garantizar queJava/Tomcat/ERDDAP™proceso/aplicación se ha detenido completamente.
A veces, el proceso/aplicación tomará hasta dos minutos para apagarse. La razón es:ERDDAP™envía un mensaje a sus hilos de fondo para decirles que paren, pero a veces toma estos hilos un largo tiempo para llegar a un buen lugar de parada.
             
        4. Para reiniciarERDDAP™, utilizar startup.bat
             
        5. VerERDDAP™en su navegador para comprobar que el reinicio tuvo éxito. (A veces, necesitas esperar 30 segundos e intentar cargarERDDAP™de nuevo en su navegador para que tenga éxito.)   
             
### Frecuentes Crashes o Freezes{#frequent-crashes-or-freezes} 
SiERDDAP™se vuelve lento, se bloquea o se congela, algo está mal. Mira.[ERDDAP's log file](#log)tratar de averiguar la causa. Si usted no puede, por favor incluya los detalles y vea nuestros[sección sobre la obtención de apoyo adicional](/docs/intro#support).

El problema más común es un usuario problemático que está ejecutando varios scripts a la vez y/o alguien haciendo un gran número de solicitudes inválidas. Si esto sucede, probablemente deberías chantajear a ese usuario. Cuando un usuario de lista negra hace una solicitud, el mensaje de error en la respuesta los anima a enviar un correo electrónico para resolver los problemas. Entonces, puedes animarlos a ejecutar sólo un script a la vez y a solucionar los problemas en su script (por ejemplo, solicitando datos de un conjunto de datos remoto que no pueden responder antes de que se acabe el tiempo) . [Véase]&lt;requestBlacklist confiar en sudatasets.xmlarchivo] (/docs/servidor-admin/datasets#requestblacklist) .

En circunstancias extremas,Javapuede congelarse por un minuto o dos mientras hace una colección completa de basura, pero luego recuperarse. Así que es bueno esperar un minuto o dos para ver siJava/ERDDAP™es realmente congelado o si está haciendo una larga colección de basura. (Si la recolección de basura es un problema común,[asignar más memoria a Tomcat](/docs/server-admin/deploy-install#memory).) 

SiERDDAP™se vuelve lento o se congela y el problema no es un usuario problemático o una colección de basura larga, generalmente puede resolver el problema por[descansoERDDAP™](#shut-down-and-restart). Mi experiencia es queERDDAP™puede correr durante meses sin necesitar un reinicio.
     

### Monitor{#monitor} 
Puede monitorear suERDDAP's estado mirando el[/erddap/status.htmlpágina](#status-page), en particular las estadísticas en la sección superior. SiERDDAP™se vuelve lento o se congela y el problema no es sólo uso extremadamente pesado, por lo general puede resolver el problema por[descansoERDDAP™](#shut-down-and-restart). Hay métricas adicionales disponibles a través de la integración Prometheus en /erddap/metrics.

Mi experiencia es queERDDAP™puede correr durante meses sin necesitar un reinicio. Sólo debes reiniciarlo si quieres aplicar algunos cambios que hiciste paraERDDAP's setup.xml o cuando necesita instalar nuevas versiones deERDDAP™,JavaTomcat, o el sistema operativo. Si necesitas reiniciarERDDAP™Con frecuencia, algo está mal. Mira.[ERDDAP's log file](#log)tratar de averiguar la causa. Si usted no puede, por favor incluya los detalles y vea nuestros[sección sobre la obtención de apoyo adicional](/docs/intro#support). Como solución temporal, puede intentar usar[Monit](https://mmonit.com/monit/)para monitorear suERDDAP™y reiniciarlo si es necesario. O podrías hacer un trabajo de cron para reiniciarERDDAP™  (proactivamente) periódicamente. Puede ser un poco difícil escribir un script para automatizar el monitoreo y reiniciarERDDAP. Algunos consejos que podrían ayudar:

* Puede simplificar las pruebas si el proceso de Tomcat sigue funcionando utilizando el interruptor -c con grep:
ps -u *tomcat Usuario*  |grep -c java
Eso reducirá la salida a "1" si el proceso de tomcat sigue vivo, o "0" si el proceso se ha detenido.
     
* Si eres bueno con el gawk, puedes extraer el procesadorID de los resultados de
ps -u *tomcat Usuario*  |Grip java, y utilizar el procesadorID en otras líneas del script.
     

Si usted establece Monit o un trabajo de cron, sería genial si usted podría compartir los detalles para que otros puedan beneficiar ver nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support)por donde puedes compartir.

#### Permgen{#permgen} 
Si usas en repetidas ocasiones Tomcat Manager para recargar (o Stop and Start)  ERDDAP™,ERDDAP™puede no empezar y tirar java.lang. OutOfMemoryError: PermGen. La solución es periódicamente (o cada vez?)  [apagado y reiniciar tomcat yERDDAP™](#shut-down-and-restart), en lugar de recargarERDDAP.
\\[Actualización: Este problema fue minimizado o fijado en gran medidaERDDAP™versión 1.24.\\]  
     
#### Log{#log} 
*    **[log.txt](#log)**   
SiERDDAP™no comienza o si algo no funciona como se espera, es muy útil ver el error y los mensajes de diagnóstico en elERDDAP™archivo de registro.
    * El archivo de registro es *bigParentDirectory* /logs/log.txt
         ( *bigParentDirectory* se especifica en[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Si no hay registro. archivo txt o si el registro. txt file no ha sido actualizado desde que se reiniciaERDDAP™, mira en[Archivos de registro Tomcat](#tomcat-logs)para ver si hay un mensaje de error allí.
    * Tipos de mensajes de diagnóstico en el archivo de registro:
        * La palabra "error" se utiliza cuando algo salió tan mal que el procedimiento no pudo completar. Aunque es molesto obtener un error, el error le obliga a lidiar con el problema. Nuestro pensamiento es que es mejor lanzar un error, que tenerERDDAP™Trabajando de una manera que no esperabas.
        * La palabra "aprendizaje" se utiliza cuando algo salió mal, pero el procedimiento fue capaz de ser completado. Son bastante raros.
        * Cualquier otra cosa es sólo un mensaje informativo. Puede controlar cuánta información se ha identificado con [&lt;logLevel] (/docs/servidor-admin/datasets#nivel)  datasets.xml.
        * Recargas de conjunto de datos y respuestas de los usuarios que llevan 10 segundos para terminar (con éxito o sin éxito) están marcados con " (¡10&#33;) ". Por lo tanto, puede buscar el archivo log.txt para esta frase para encontrar los conjuntos de datos que fueron lentos para recargar o el número de solicitud de las solicitudes que fueron lentas para terminar. A continuación, puede mirar más alto en el archivo log.txt para ver cuál era el problema del conjunto de datos o cuál era la solicitud del usuario y quién era. Estas cargas lentas de conjunto de datos y las solicitudes de los usuarios a veces están imponiéndoseERDDAP. Así que saber más sobre estas solicitudes puede ayudarle a identificar y resolver problemas.
    * La información está escrita al archivo de registro en la unidad de disco en pedazos bastante grandes. La ventaja es que esto es muy eficiente...ERDDAP™nunca bloqueará la espera de que la información sea escrita al archivo de registro. La desventaja es que el registro casi siempre terminará con un mensaje parcial, que no se completará hasta que se escriba el siguiente trozo. Puedes hacerlo actualizado. (para un instante) viendo suERDDAP's status web page at https://*your.domain.org*/erddap/status.html   (ohttp://sihttpsno está habilitado) .
    * Cuando los archivos log.txt llegan a 20 MB,
el archivo es renombrado registro. txt.previous y se crea un nuevo archivo log.txt. Así que los archivos de registro no se acumulan.
        
En setup.xml, puede especificar un tamaño máximo diferente para el archivo de registro, en MegaBytes. El mínimo permitido es 1 (MB) . El máximo permitido es 2000 (MB) . El predeterminado es 20 (MB) . Por ejemplo:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Cuando vuelvasERDDAP™,
        ERDDAP™hace una copia de archivo del log.txt y log. archivos txt.previous con un sello de tiempo en el nombre del archivo. Si hubo problemas antes del reinicio, puede ser útil analizar estos archivos archivados para obtener pistas sobre cuál era el problema. Usted puede eliminar los archivos de archivo si ya no son necesarios.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAP's log. el archivo txt no está diseñado para paresing (aunque podría crear expresiones regulares que extraigan la información deseada) . Está diseñado para ayudar a un humano a averiguar qué está pasando mal cuando algo va mal. Cuando usted envía un error o informe de problema aERDDAP™desarrolladores, cuando sea posible, por favor incluya toda la información del archivo log.txt relacionado con la solicitud problemático.

Por razones de eficiencia,ERDDAP™sólo escribe información para registrar. txt después de un gran trozo de información se ha acumulado. Así que si visitas el registro. txt justo después de que se haya producido un error, la información relacionada con el error puede no haberse escrito todavía a log.txt. Para obtener información perfectamente actualizada de log.txt, visite suERDDAP's[status.html page](#status-page). CuandoERDDAP™procesos que lo soliciten, elimina toda la información pendiente para log.txt.

ParaERDDAP™estadísticas de uso, por favor use el[Archivos de registro Apache y/o Tomcat](#tomcat-logs)en lugar deERDDAPEs log.txt. Note queERDDAP's[status.html page](#status-page)  (algunos) y[Daily Report](#daily-report)  (más) tienen un gran número de estadísticas de uso precalculadas para usted.
    
### Tomcat Logs{#tomcat-logs} 
SiERDDAP™no comienza porque un error ocurrió muy temprano enERDDAP's startup, el mensaje de error aparecerá en los archivos de registro de Tomcat ( *tomcat* /logs/catalina. *hoy* .log o *tomcat* /logs/catalina.out) , no en[ERDDAP's log.txt file](#log).

Estadísticas de uso: Para la mayoría de la información que la gente desea reunir de un archivo de registro (por ejemplo, estadísticas de uso) , por favor utilice los archivos de registro Apache y/o Tomcat. Están bien formateados y tienen ese tipo de información. Hay numerosas herramientas para analizarlas, por ejemplo,[AWStats](https://www.awstats.org),[Kibana de ElasticSearch](https://www.elastic.co/products/kibana), y[JMeter](https://jmeter.apache.org), pero busque en la web para encontrar la herramienta correcta para sus propósitos.

Tenga en cuenta que los archivos de registro sólo identifican a los usuarios como direcciones IP. Hay sitios web para ayudarle a obtener información relacionada con una dirección IP dada, por ejemplo,[WhatIsMyIPAddress](https://whatismyipaddress.com/ip-lookup), pero normalmente no será capaz de encontrar el nombre del usuario.

Además, debido a[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), la dirección IP de un usuario dado puede ser diferente en diferentes días, o diferentes usuarios pueden tener la misma dirección IP en diferentes momentos.

Alternativamente, puedes usar algo como[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Pero ten cuidado: cuando usas servicios externos como Google Analytics, estás renunciando a la privacidad de tus usuarios al dar acceso completo a Google a su actividad en tu sitio que Google (¿y otros?) puede mantener para siempre y utilizar para cualquier propósito (tal vez no técnicamente, pero probablemente en la práctica) . Tus usuarios no han consentido esto y probablemente no son conscientes de que serán rastreados en tu sitio web, así como probablemente no están conscientes de la medida en que están siendo rastreados en casi todos los sitios web. En estos días, muchos usuarios están muy preocupados de que todo lo que hacen en la web está siendo supervisado por estas grandes empresas (Google, Facebook, etc.) y por el gobierno, y encontrar esta intrusión injustificada en sus vidas (como en el libro, 1984) . Esto ha impulsado a muchos usuarios a instalar productos como[Privacy Badger](https://www.eff.org/privacybadger/faq)para minimizar el seguimiento, para utilizar navegadores alternativos como[Tor Browser](https://www.torproject.org/)  (o apagar el seguimiento en los navegadores tradicionales) , y utilizar motores de búsqueda alternativos como[Duck Duck Go](https://duckduckgo.com/). Si utiliza un servicio como Google Analytics, por lo menos documente su uso y las consecuencias cambiando el&lt;estándarPrivacyPolicy titulada tag enERDDAP's
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
    
### E-Mail Log{#e-mail-log} 
*    **emailLogYEAR-MM-DD.txt**   
    ERDDAP™siempre escribe el texto de todos los mensajes de correo electrónico salientes en el correo electrónico del día actual Archivo LogYEAR-MM-DD.txt *bigParentDirectory* /logs ( *bigParentDirectory* se especifica en[setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Si el servidor no puede enviar mensajes de correo electrónico, o si ha configuradoERDDAP™no enviar mensajes de correo electrónico, o si sólo tiene curiosidad, este archivo es una manera conveniente de ver todos los mensajes de correo electrónico que se han enviado.
    * Usted puede eliminar los archivos de registro de correo electrónico de días anteriores si ya no son necesarios.
         
### Daily Report{#daily-report} 
El Informe Diario tiene mucha información útil - toda la información de suERDDAP's[/erddap/status.htmlpágina](#status-page)y más.
    * Es el resumen más completo de suERDDAPEs el estado.
    * Entre otras estadísticas, incluye una lista de conjuntos de datos que no cargaron y las excepciones que generaron.
    * Se genera cuando empiezasERDDAP™  (sólo despuésERDDAP™termina tratando de cargar todos los conjuntos de datos) y se generó poco después de 7 am hora local cada mañana.
    * Cada vez que se genera, se escribe a[ERDDAP's log.txt file](#log).
    * Cuando se genera, se envía por correo electrónico a&lt;e-mailDailyReportsTo&lt;emailTodo Para confiar (que se especifican en[setup.xml](/docs/server-admin/deploy-install#setupxml)) siempre que haya establecido el sistema de correo electrónico (en configuración.xml) .

### Página{#status-page} 
Usted puede ver el estado de suERDDAP™desde cualquier navegador por&lt;baseUrl/erddap/status.html
* Esta página se genera dinámicamente, por lo que siempre tiene estadísticas de hasta el momento para suERDDAP.
* Incluye estadísticas sobre el número de solicitudes, uso de memoria, traza de hilos, la tareaTread, etc.
* Debido a que la página de estado puede ser vista por cualquiera, no incluye tanta información como la[Daily Report](#daily-report).
         
### Adding/Changing Datasets{#addingchanging-datasets} 
ERDDAP™generalmente releesdatasets.xmlcada uno *cargaDatasetsMinMinutes*   (especificado en[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Así que puedes hacer cambiosdatasets.xmlen cualquier momento, incluso mientrasERDDAP™está corriendo.
Pronto se detectará un nuevo conjunto de datos, generalmente dentro *cargaDatasetsMinMinutes* .
Se recargará un conjunto de datos modificado cuando se trate *reload EveryNMinutes* viejo (según se especifica endatasets.xml) .
    
#### Bandera{#flag} 
*    **[Un archivo de bandera](#flag)TellsERDDAP™tratar de cargar un Dataset tan pronto como sea posible** 
    
    *   ERDDAP™no notará ningún cambio en la configuración de un conjunto de datosdatasets.xmlhastaERDDAP™recarga el conjunto de datos.
         
    * Para decirERDDAP™para volver a cargar un conjunto de datos lo antes posible (antes del conjunto de datos)&lt;reloadEveryNMinutes confianza haría que fuera recargado), poner un archivo en *bigParentDirectory* /flag ( *bigParentDirectory* se especifica en[setup.xml](/docs/server-admin/deploy-install#setupxml)) que tiene el mismo nombre que el conjunto de datosdatasetID.
Esto diceERDDAP™tratar de volver a cargar ese conjunto de datos lo antes posible.
La versión antigua del conjunto de datos permanecerá disponible para los usuarios hasta que la nueva versión esté disponible y se haya intercambiado atómicamente.
ParaEDDGridDeFiles y EDDTable DesdeFiles, el conjunto de datos de recarga buscará archivos nuevos o cambiados, leerlos e incorporarlos en el conjunto de datos. Así que el tiempo de recarga depende del número de archivos nuevos o cambiados.
Si el conjunto de datos tiene activo="false",ERDDAP™eliminará el conjunto de datos.
         
##### Bad Files Flag{#bad-files-flag} 
* Una variante del directorio /flag es el directorio /badFilesFlag. (Añadido enERDDAP™v2.12.)   
Si pones un archivo en el *bigParentDirectory* /badFiles directorio de fleg con undatasetIDcomo nombre del archivo (el contenido del archivo no importa) , entonces tan prontoERDDAP™ve los malosFiles Archivo de bandera,ERDDAP™Will:
    
    1. Eliminar el archivo badFilesFlag.
    2. Eliminar las fichas.ncarchivo (si hay uno) , que tiene la lista de archivos malos para ese conjunto de datos.
Para conjuntos de datos comoEDDGridSideBySide que tienen ChildDatasets, esto también elimina los badFiles.ncarchivo para todos los conjuntos de datos infantiles.
    3. Recarga el conjunto de datos lo antes posible.
    
Así pues, esto causaERDDAP™intentar de nuevo trabajar con los archivos previamente (erróneamente?) marcado como malo.
         
##### Bandera dura{#hard-flag} 
* Otra variante del directorio /flag es el directorio /hardFlag. (Añadido enERDDAP™v1.74.)   
Si pones un archivo en *bigParentDirectory* /hardFlag con undatasetIDcomo nombre del archivo (el contenido del archivo no importa) , entonces tan prontoERDDAP™ve el duro Archivo de bandera,ERDDAP™Will:
    
    1. Eliminar el archivo hardFlag.
    2. Eliminar el conjunto de datosERDDAP.
    3. Eliminar toda la información queERDDAP™ha almacenado sobre este conjunto de datos.
ParaEDDGridDeFiles y EDDTable DeFiles subclases, esto elimina la base de datos interna de archivos de datos y su contenido.
Para conjuntos de datos comoEDDGridSideBySide que tiene ChildDatasets, esto también elimina la base de datos interna de archivos de datos y su contenido para todos los conjuntos de datos infantiles.
    4. Recarga el conjunto de datos.
ParaEDDGridDeFiles y EDDTable De las subclases de Files, esto causaERDDAP™para releer **Todos** de los archivos de datos. Así, el tiempo de recarga depende del número total de archivos de datos en el conjunto de datos. Debido a que el conjunto de datos fue eliminadoERDDAP™cuando se notó el HardFlag, el conjunto de datos no estará disponible hasta que el conjunto de datos termine de recargar. Sé paciente. Mira en el[log.txt](#log)archivo si quieres ver lo que está pasando.
    
La variante hardFlag elimina la información almacenada del conjunto de datos incluso si el conjunto de datos no está cargado actualmenteERDDAP.
    
Duro Las banderas son muy útiles cuando haces algo que causa un cambio en cómoERDDAP™lee e interpreta los datos fuente, por ejemplo, cuando instala una nueva versión deERDDAP™o cuando usted ha hecho un cambio a la definición de un conjunto de datos endatasets.xml
    
* Los contenidos de la bandera, los archivos badFilesFlag y hardFlag son irrelevantes.ERDDAP™sólo mira el nombre del archivo para conseguir eldatasetID.
     
* Entre las principales recargas de conjunto de datos,ERDDAP™busca archivos de bandera, badFilesFlag y hardFlag.
     
* Tenga en cuenta que cuando se recarga un conjunto de datos, todos los archivos en el *bigParentDirectory* /[cache](#cached-responses)/ *datasetID* directorio se eliminan. Esto incluye.ncy archivos de imagen que son normalmente caché por ~15 minutos.
     
* Tenga en cuenta que si el xml del conjunto de datos incluye[activo="falso"](/docs/server-admin/datasets#active), una bandera hará que el conjunto de datos sea inactivo (si es activo) , y en cualquier caso, no recargado.
     
* SiempreERDDAP™ejecuta LoadDatasets para hacer una recarga importante (la recarga de tiempo controlada por&lt;cargaDatasetsMinMinutes confía) o una recarga menor (como resultado de una bandera externa o interna) ,ERDDAP™leído todo&lt;descomprimidoCacheMaxGB confianza,&lt;descomprimidoCacheMaxMinutesOld prenda,&lt;usuario,&lt;requestBlacklist confiar,&lt;lentoDownTroubleMillis confianza, y&lt;suscripciónEmailBlacklist® etiquetas y conmuta a la nueva configuración. Así que puedes usar una bandera como forma de conseguirERDDAP™para notar cambios en esas etiquetas lo antes posible.

##### Set Dataset Flag{#set-dataset-flag} 
*  ERDDAP™tiene un servicio web para que las banderas se puedan configurar mediante URLs.
    
    * Por ejemplo,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (que es una bandera falsa Clave) establecerá una bandera para el conjunto de datos rPmelTao.
    * Hay una bandera diferenteKey para cadadatasetID.
    * Los administradores pueden ver una lista de URL de la bandera para todos los conjuntos de datos mirando al fondo de sus[Daily Report](#daily-report)correo electrónico.
    * Los administradores deben tratar estas URL como confidenciales, ya que dan a alguien el derecho a restablecer un conjunto de datos a voluntad.
    * Si crees que las banderasKeys han caído en manos de alguien que las está abusando, puedes cambiar&lt;flagKeyKey confiar en[setup.xml](/docs/server-admin/deploy-install#setupxml)y reiniciarERDDAPfuerzaERDDAP™para generar y utilizar un conjunto diferente de flagKeys.
    * Si cambias&lt;flagKeyKey confiar, eliminar todas las suscripciones antiguas (ver la lista en su informe diario) y recuerda enviar las nuevas URLs a las personas que quieres tenerlas.
    
El sistema de bandera puede servir de base para un mecanismo más eficiente para decirERDDAP™cuándo volver a cargar un conjunto de datos. Por ejemplo, podría establecer un conjunto de datos&lt;reloadEveryNMinutes confía a un gran número (por ejemplo, 10080 = 1 semana) . Entonces, cuando sepas que el conjunto de datos ha cambiado (quizás porque añadiste un archivo al directorio de datos del Dataset) , establecer una bandera para que el conjunto de datos se vuelva a cargar lo antes posible. Las banderas suelen verse rápidamente. Pero si el hilo LoadDatasets ya está ocupado, puede ser un tiempo antes de que esté disponible para actuar en la bandera. Pero el sistema de bandera es mucho más receptivo y mucho más eficiente que establecer&lt;reloadEveryNMinutes confiar a un pequeño número.
    
#### Removing Datasets{#removing-datasets} 
Si un conjunto de datos está activoERDDAP™y quieres desactivarlo temporalmente o permanentemente:
1. Indatasets.xmlpara el conjunto de datos, conjunto[activo="falso"](/docs/server-admin/datasets#active)en la etiqueta Dataset.
2. Espera.ERDDAP™para eliminar el conjunto de datos durante la siguiente recarga o[establecer una bandera](#flag)para que el conjunto de datos digaERDDAP™para notar este cambio lo antes posible. Cuando haces esto,ERDDAP™no arroja ninguna información que pueda haber almacenado sobre el conjunto de datos y ciertamente no hace nada a los datos reales.
3. Entonces usted puede dejar el activo="false" dataset endatasets.xmlo eliminarlo.
         
#### ¿Cuándo se cargan los Datasets?{#when-are-datasets-reloaded} 
Un hilo llamado RunLoadDatasets es el hilo maestro que controla cuando se recargan los conjuntos de datos. RunLoad Datasets loops para siempre:

1. RunLoadDatasets señala el momento actual.
2. RunLoadDatasets inicia un hilo LoadDatasets para hacer un "MajorLoad". Usted puede ver información sobre el actual/previous majorLoad en la parte superior de suERDDAP's
    [/erddap/status.htmlpágina](#status-page)  (por ejemplo,[estado página ejemplo](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. CargaDatasets hace una copia dedatasets.xml.
    2. CargaDatasets lee a través de la copia dedatasets.xmly, para cada conjunto de datos, ver si el conjunto de datos necesita ser (re) cargado o eliminado.
        * Si[bandera](#flag)archivo existe para este conjunto de datos, el archivo se elimina y el conjunto de datos se elimina si activo="false" o (re) cargado si activo="verdad" (independientemente de la edad del conjunto de datos) .
        * Si el conjunto de datos de la dataset.xml tiene activo="false" y el conjunto de datos se carga actualmente (activo) , se descarga (Retirada) .
        * Si el conjunto de datos tiene activo="verdad" y el conjunto de datos ya no está cargado, se carga.
        * Si el conjunto de datos tiene activo="true" y el conjunto de datos ya está cargado, el conjunto de datos se recarga si la edad del conjunto de datos (tiempo desde la última carga) es más grande que su&lt;reload EveryNMinutes (por defecto = 10080 minutos) , de lo contrario, el conjunto de datos se deja solo.
    3. CargaLos Datasets terminan.
    
El hilo RunLoadDatasets espera que el hilo LoadDatasets termine. Si CargarDatasets lleva más tiempo que cargarDatasets MinMinutes (como se especifica en setup.xml) , RunLoadDatasets interrumpe el hilo LoadDatasets. Idealmente, LoadDatasets nota la interrupción y acabados. Pero si no nota la interrupción en un minuto, RunLoadDatasets llama cargaDatasets. Para () , que es indeseable.
3. Mientras que el tiempo desde el comienzo de la última mayorCarga es menos que cargaDatasets MinMinutes (como se especifica en setup.xml, por ejemplo, 15 minutos) , RunLoadDatasets repetidamente busca[bandera](#flag)archivos en *bigParentDirectory* / directorio plano. Si uno o más archivos de bandera se encuentran, se eliminan, y RunLoadDatasets inicia un hilo de cargaDatasets para hacer un "minorLoad" (majorLoad=false) . No se puede ver información de menorCarga en suERDDAP's[/erddap/status.htmlpágina](#status-page).
    1. CargaDatasets hace una copia dedatasets.xml.
    2. CargaDatasets lee a través de la copia dedatasets.xmly, para cada conjunto de datos para el cual había un archivo de bandera:
        * Si el conjunto de datos de la dataset.xml tiene activo="false" y el conjunto de datos se carga actualmente (activo) , se descarga (Retirada) .
        * Si el conjunto de datos tiene activo="true", el conjunto de datos es (re) cargado, independientemente de su edad. Se ignoran los conjuntos de datos no alineados.
    3. CargaLos Datasets terminan.
4. RunLoad Datasets vuelve al paso 1.

Notas:
* Startup
Cuando vuelvasERDDAP™, cada conjunto de datos con activo="true" se carga.
* Cache
Cuando un conjunto de datos es (re) cargado, su caché (incluyendo archivos de respuesta de datos y/o archivos de imagen) está vacía.
* Lotes de conjuntos de datos
Si usted tiene un montón de datasets y/o uno o más datasets son lentos a (re) carga, un hilo LoadDatasets puede tardar mucho en terminar su trabajo, quizás incluso más que cargarDatasets MinMinutes.
* Una cargaDatasets Thread
Nunca hay más de un hilo de LoadDatasets corriendo a la vez. Si una bandera se establece cuando LoadDatasets ya está corriendo, la bandera probablemente no se notará o actuará hasta que el hilo de LoadDatasets termine funcionando. Podrías decir: "Eso es estúpido. ¿Por qué no empiezas un montón de nuevos hilos para cargar conjuntos de datos?" Pero si tiene un montón de conjuntos de datos que obtienen datos de un servidor remoto, incluso un hilo de LoadDatasets pondrá estrés sustancial en el servidor remoto. Lo mismo es cierto si tienes muchos conjuntos de datos que obtienen datos de archivos en un RAID. Hay retornos que disminuyen rápidamente de tener más de un hilo LoadDatasets.
* Bandera = ASAP
Establecer una bandera indica que el conjunto de datos debe ser (re) cargado lo antes posible, no necesariamente de inmediato. Si no hay hilo de cargaDatasets se está ejecutando actualmente, el conjunto de datos comenzará a ser recargado dentro de unos segundos. Pero si un hilo de LoadDatasets está funcionando actualmente, el conjunto de datos probablemente no será recargado hasta después de que el hilo de LoadDatasets esté terminado.
* Archivo de la bandera eliminado
En general, si pone un archivo de bandera en el *bigParentDirectory* /erddap/flag directorio (visitando la bandera del conjunto de datos Url o poner un archivo real allí) , el conjunto de datos se recargará muy pronto después de que se elimina el archivo de la bandera.
* Bandera contra carga pequeña EveryNMinutes
Si usted tiene alguna forma externa de saber cuándo un conjunto de datos necesita ser recargado y si es conveniente para usted, la mejor manera de asegurarse de que un conjunto de datos siempre está actualizado es establecer su recarga Cada NMinutes a un gran número (¿10080?) y establecer una bandera (¿A través de un guión?) cuando necesite ser recargado. Ese es el sistemaEDDGridFromErddap y EDDTableDeErddap use recibe mensajes que el conjunto de datos necesita ser recargado.
* Mira en log.txt
Muchas de las informaciones pertinentes se escriben a *bigParentDirectory* /logs/log.txt file. Si las cosas no funcionan como usted espera, mirando el registro. txt te permite diagnosticar el problema al averiguar exactamente quéERDDAP™Sí.
    
    * Busque "majorLoad=true" para el inicio de los principales hilos de LoadDataset.
    * Busca "majorLoad=false" para el inicio de pequeños hilos de cargaDatasets.
    * Buscar un conjunto de datos dadodatasetIDpara información acerca de que (re) cargado o preguntado.
        
          
         
#### Respuestas en espera{#cached-responses} 
En general,ERDDAP™no cache (tienda) respuestas a solicitudes de usuarios. La justificación era que la mayoría de las solicitudes serían ligeramente diferentes para que el caché no fuera muy eficaz. Las mayores excepciones son solicitudes de archivos de imagen (que están caché desde los navegadores y programas comoGoogle Eartha menudo imágenes de recuperación) y solicitudes.ncarchivos (porque no pueden ser creados en el campo) .ERDDAP™almacena los archivos caché de cada conjunto de datos en un directorio diferente: *bigParentDirectory* /cache/ *datasetID* ya que un solo directorio de caché puede tener un gran número de archivos que pueden llegar a ser lentos para acceder.
Los archivos se eliminan del caché por una de las tres razones:
* Todos los archivos en este caché se eliminan cuandoERDDAP™está descansado.
* Periódicamente, cualquier archivo más que&lt;cacheMinutes confía old (según se especifica en[setup.xml](/docs/server-admin/deploy-install#setupxml)) será eliminado. Eliminación de archivos en el caché basado en la edad (no menos importante) asegura que los archivos no se quedarán en el caché mucho tiempo. Aunque podría parecer que una petición dada siempre debe devolver la misma respuesta, eso no es verdad. Por ejemplo, atabledapsolicitud que incluye &quot; *algunos Hora* cambiará si llegan nuevos datos para el conjunto de datos. Y una solicitud de cuadrícula que incluye\\[último\\]para la dimensión del tiempo cambiará si llegan nuevos datos para el conjunto de datos.
* Las imágenes que muestran las condiciones de error son caché, pero sólo por unos minutos (Es una situación difícil) .
* Cada vez que se recarga un conjunto de datos, se eliminan todos los archivos en el caché de ese conjunto de datos. Porque las solicitudes pueden ser para"last"índice en un conjunto de datos redondeado, los archivos en el caché pueden ser inválidos cuando se recarga un conjunto de datos.
         
#### Datos almacenados{#stored-dataset-information} 
Para todo tipo de conjuntos de datos,ERDDAP™recopila mucha información cuando se carga un conjunto de datos y lo mantiene en memoria. Esto permiteERDDAP™responder muy rápidamente a búsquedas, solicitudes de listas de conjuntos de datos y solicitudes de información sobre un conjunto de datos.

Para algunos tipos de conjuntos de datos (notablementeEDDGridCopiado, EDDTableCopy,EDDGridDesde *Xxx* Archivos, y EDDTableDesde *Xxx* Archivos) ,ERDDAP™almacena en el disco cierta información sobre el conjunto de datos que se reutiliza cuando se recarga el conjunto de datos. Esto acelera enormemente el proceso de recarga.

* Algunos de los archivos de información de conjunto de datos son legibles por humanos.jsonarchivos y se almacenan en *bigParentDirectory* /dataset/ *último2CartasOfDatasetID/datasetID* .
*   ERDDAP™sólo elimina estos archivos en situaciones inusuales, por ejemplo, si agrega o elimina una variable del conjunto de datosdatasets.xmlIdiota.
* La mayoría de los cambios en un conjunto de datosdatasets.xmltonta (por ejemplo, cambiar un atributo global o un atributo variable) No hace falta que elimine estos archivos. Una recarga regular de conjunto de datos manejará estos tipos de cambios. Puedes decirERDDAP™para volver a cargar un conjunto de datos ASAP estableciendo un[bandera](#flag)para el conjunto de datos.
* Del mismo modo, la adición, eliminación o cambio de archivos de datos se manejará cuandoERDDAP™recarga un conjunto de datos. Pero...ERDDAP™notará este tipo de cambio pronto y automáticamente si el conjunto de datos está utilizando el [&lt;actualizar EveryNMillis confiar] (/docs/servidor-admin/datasets) sistema.
* Sólo rara vez debe ser necesario para que elimine estos archivos. La situación más común en la que se necesita fuerzaERDDAP™para eliminar la información almacenada (porque está fuera de la fecha / incorrecta y no será automáticamente fijado porERDDAP) es cuando hace cambios en el conjunto de datosdatasets.xmlque afecta a cómoERDDAP™interpreta datos en los archivos de datos fuente, por ejemplo, cambiando la cadena de formato de la variable de tiempo.
* Para eliminar los archivos de información almacenados de un conjunto de datosERDDAP™que está corriendo (incluso si el conjunto de datos no está cargado actualmente) , establecer un[duro Bandera](#hard-flag)para ese conjunto de datos. Recuerde que si un conjunto de datos es una agregación de un gran número de archivos, la recarga del conjunto de datos puede tomar tiempo considerable.
* Para borrar los archivos de información almacenados de un datasetERDDAP™no corre, corre[DasDds](/docs/server-admin/datasets#dasdds)para ese conjunto de datos (que es más fácil que calcular en qué directorio se encuentra la información y borrar los archivos a mano) . Recuerde que si un conjunto de datos es una agregación de un gran número de archivos, la recarga del conjunto de datos puede tomar tiempo considerable.
         
### Estado de la memoria{#memory-status} 
ERDDAP™No debería chocar ni congelarse. Si lo hace, una de las causas más probables es la memoria insuficiente. Puede monitorear el uso de la memoria mirando el estado.html página web, que incluye una línea como

0 llamadas gc, 0 solicitudes de cobertizo y 0 peligrosas MemoryEmails desde el último gran LoadDatasets

 (que son eventos progresivamente más serios)   
y MB inUse y gc Calls columnas en el cuadro de estadísticas. Puedes decir que la memoria te ha extendidoERDDAP™es viendo estos números. Los números más altos indican más estrés.

* MB inUse debe ser siempre menos de la mitad del[Ajuste de memoria \\-Xmx](/docs/server-admin/deploy-install#memory). Los números más grandes son una mala señal.
* gc llamadas indica el número de vecesERDDAP™llamó al coleccionista de basura para tratar de aliviar el alto uso de la memoria. Si esto es un signo de serios problemas.
* shed indica el número de solicitudes entrantes que fueron canceladas (con HTTP error número 503, servicio no disponible) porque el uso de memoria ya era demasiado alto. Lo ideal es que no se detengan solicitudes. Está bien si unas cuantas solicitudes son derramadas, pero una señal de serios problemas si muchos son derramados.
* peligroso MemoryEmails - Si el uso de memoria se vuelve peligrosamente alto,ERDDAP™envía un correo electrónico a las direcciones de correo electrónico enumeradas en&lt;emailTodo Para confiar (en configuración.xml) con una lista de las solicitudes de usuario activas. Como dice el email, por favor envíe estos emails a Chris. John en Noaa. gov para que podamos utilizar la información para mejorar versiones futurasERDDAP.
     

Si tuERDDAP™es resistente a la memoria:
* Considere la posibilidad de asignar más memoria de su servidor aERDDAP™cambiando el Tomcat[Ajuste de memoria ‐Xmx](/docs/server-admin/deploy-install#memory).
* Si ya has asignado tanto recuerdo como puedasERDDAP™via -Xmx, considere comprar más memoria para su servidor. La memoria es barata (comparado con el precio de un nuevo servidor o su tiempo) &#33; Entonces aumenta -Xmx.
* Indatasets.xml, set&lt;nGridThreads confiar a 1, set&lt;nTableThreads confiar a 1, y establecer&lt;ipAddressMaxRequestsActive confiar a 1.
* Mira las solicitudes en log.txt para ineficiente o problemático (pero legítimo) solicitudes. Agregar sus direcciones IP para&lt;requestBlacklist dentrodatasets.xml. El mensaje de error de la lista negra incluyeERDDAP™dirección de correo electrónico del administrador con la esperanza de que esos usuarios se pongan en contacto con usted para que pueda trabajar con ellos para utilizarERDDAP™más eficientemente. Es bueno mantener una lista de direcciones IP que usted blacklist y por qué, para que usted pueda trabajar con los usuarios si se ponen en contacto con usted.
* Mira las solicitudes en log.txt para solicitudes de usuarios maliciosos. Agregar sus direcciones IP para&lt;requestBlacklist dentrodatasets.xml. Si las solicitudes similares vienen de múltiples direcciones IP similares, puede utilizar algunos servicios que-es (por ejemplo,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) para conocer la gama de direcciones IP de esa fuente y enlistar toda la gama. Verás...&lt;requestBlacklist titulada documentación] (/docs/servidor-admin/datasets#requestblacklist) .
         
#### OutOfMemoryError{#outofmemoryerror} 
Cuando lo arreglesERDDAP™, especifica la cantidad máxima de memoria queJavapuede utilizar a través de[Ajuste \\-Xmx](/docs/server-admin/deploy-install#memory). SiERDDAP™necesita más memoria que eso, lanzará una java. Lang. Fuera de MemoryError.ERDDAP™hace un montón de comprobación para permitir que manejar ese error con gracia (por ejemplo, una petición problemática fallará, pero el sistema mantiene su integridad) . Pero a veces, el error daña la integridad del sistema y tienes que reiniciarERDDAP. Con suerte, eso es raro.

La solución rápida y fácil para un OutOfMemoryError es aumentar el[Ajuste \\-Xmx](/docs/server-admin/deploy-install#memory), pero nunca debe aumentar la configuración -Xmx a más del 80% de la memoria física en el servidor (por ejemplo, para un servidor de 10 GB, no establezca -Xmx por encima de 8 GB) . La memoria es relativamente barata, por lo que puede ser una buena opción para aumentar la memoria en el servidor. Pero si usted ha maxed fuera la memoria en el servidor o por otras razones no puede aumentarla, usted necesita tratar más directamente con la causa de OutOfMemoryError.

Si miras en el[log.txt](#log)archivo para ver quéERDDAP™estaba haciendo cuando el error surgió, generalmente se puede obtener una buena pista de la causa del OutOfMemoryError. Hay muchas causas posibles, incluyendo:

* Un único archivo de datos enorme puede causar el OutOfMemoryError, en particular, enormes archivos de datos ASCII. Si este es el problema, debe ser obvio porqueERDDAP™no se cargará el conjunto de datos (para conjuntos de datos tabulares) o leer datos de ese archivo (para conjuntos de datos redondeados) . La solución, si es factible, es dividir el archivo en múltiples archivos. Idealmente, puede dividir el archivo en trozos lógicos. Por ejemplo, si el archivo tiene 20 meses de datos, dividirlo en 20 archivos, cada uno con 1 mes de datos. Pero hay ventajas incluso si el archivo principal se divide arbitrariamente. Este enfoque tiene múltiples beneficios: a) Esto reducirá la memoria necesaria para leer los archivos de datos a 1/20, porque sólo un archivo se lee en un momento. b) A menudo,ERDDAP™puede tratar con solicitudes mucho más rápido porque sólo tiene que buscar en uno o algunos archivos para encontrar los datos para una solicitud dada. c) Si la recopilación de datos está en curso, entonces los 20 archivos existentes pueden permanecer sin cambios, y sólo necesita modificar uno, pequeño, nuevo archivo para añadir el valor de los datos del próximo mes al conjunto de datos.
* Una sola petición enorme puede causar el OutOfMemoryError. En particular, algunos de losorderByopciones tienen toda la respuesta en memoria por segundo (por ejemplo, para hacer una especie) . Si la respuesta es enorme, puede conducir al error. Siempre habrá algunas peticiones que son, de varias maneras, demasiado grandes. Usted puede resolver el problema aumentando el ajuste -Xmx. O, puede animar al usuario a hacer una serie de solicitudes más pequeñas.
* Es poco probable que un gran número de archivos causaría el índice de archivo queERDDAP™crea ser tan grande que ese archivo causaría el error. Si asumimos que cada archivo utiliza 300 bytes, entonces 1.000.000 archivos sólo tomarían 300MB. Pero los conjuntos de datos con un gran número de archivos de datos causan otros problemasERDDAP, notablemente, tarda mucho tiempoERDDAP™abrir todos esos archivos de datos al responder a una solicitud de datos del usuario. En este caso, la solución puede ser agregar los archivos para que haya menos archivos de datos. Para conjuntos de datos tabulares, es a menudo genial si guarda los datos del conjunto de datos actual en[CF Geometrías de muestreo discretos (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Archivos de datos de Array contiguos (solicitud.ncarchivos CF desdeERDDAP) y luego hacer un nuevo conjunto de datos. Estos archivos se pueden manejar de manera muy eficiente conERDDAP's[EDDTableDesdeNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Si se organizan lógicamente (cada uno con datos para un trozo de espacio y tiempo) ,ERDDAP™puede extraer datos de ellos muy rápidamente.
* Para conjuntos de datos tabulares que utilizan el [&lt;subsetVariables&gt; (/docs/servidor-admin/datasets#subsetvariables) atributo,ERDDAP™hace una tabla de combinaciones únicas de los valores de esas variables. Para conjuntos de datos enormes o cuando&lt;subsetVariables√ Es mal configurado, esta tabla puede ser lo suficientemente grande para causar OutOfMemoryErrors. La solución es eliminar variables de la lista&lt;subsetVariables&gt; para el cual hay un gran número de valores, o eliminar variables según sea necesario hasta que el tamaño de esa tabla sea razonable. Las partes deERDDAP™que usan elsubsetVariablessistema no funciona bien (por ejemplo, las páginas web cargan muy lentamente) cuando hay más de 100.000 filas en esa mesa.
* Siempre es posible que varias solicitudes grandes simultáneas (en un muy ocupadoERDDAP) puede combinarse para causar problemas de memoria. Por ejemplo, 8 solicitudes, cada una utilizando 1GB cada una, causarían problemas para una configuración -Xmx=8GB. Pero es raro que cada solicitud esté al máximo de su uso de memoria simultáneamente. Y usted podría fácilmente ver que suERDDAP™está muy ocupado con grandes peticiones. Pero es posible. Es difícil lidiar con este problema aparte de aumentar la configuración -Xmx.
* Hay otros escenarios. Si miras el[log.txt](#log)archivo para ver quéERDDAP™estaba haciendo cuando el error surgió, generalmente se puede obtener una buena pista de la causa. En la mayoría de los casos, hay una manera de minimizar ese problema (véase supra) , pero a veces solo necesitas más memoria y un ajuste superior -Xmx.
         
### Demasiados archivos abiertos{#too-many-open-files} 
Empezando conERDDAP™v2.12,ERDDAP™tiene un sistema para monitorizar el número de archivos abiertos (que incluye tomas y otras cosas, no sólo archivos) en Tomcat en computadoras Linux. Si algunos archivos erróneamente nunca se cierran (una "función de recursos") , el número de archivos abiertos puede aumentar hasta que supere el máximo permitido por el sistema operativo y muchas cosas realmente malas suceden. Así que ahora, en las computadoras Linux (porque la información no está disponible para Windows) :

* Hay una columna "Open Files" en la extrema derecha del estado.html página web que muestra el porcentaje de archivos máximo abierto. En Windows, sólo muestra "¿?".
* CuandoERDDAP™genera esa información al final de cada recarga de conjunto de datos principales, se imprimirá al registro. archivo txt:
openFileCount= *corriente* de max= *max* %= *porcentaje* 
* Si el porcentaje es ±50%, se envía un correo electrónico alERDDAP™administrador y el correo electrónico Todo A direcciones de correo electrónico.

Si el porcentaje es 100%,ERDDAP™está en terribles problemas. No dejes que esto suceda.
Si el porcentaje es √75%,ERDDAP™está cerca de problemas terribles. No está bien.
Si el porcentaje es не50%, es muy posible que un pico hará que el porcentaje llegue a 100.
Si el porcentaje es alguna vez, debes:
* Aumente el número máximo de archivos abiertos permitidos por cualquiera de:
    * Hacer estos cambios cada vez antes de empezar a tomcat (ponerlos en el archivo Tomcat startup.sh?) :
ulimit -Hn 16384
ulimit -Sn 16384
    * O haciendo un cambio permanente editando (como raíz) /etc/security/limits.conf y añadir las líneas:
tomcat soft nofile 16384
tomcat hard nofile 16384
Esos comandos suponen que el usuario que ejecuta Tomcat se llama "tomcat".
En muchas variantes Linux, debe reiniciar el servidor para aplicar esos cambios. Para ambas opciones, el "16384" arriba es un ejemplo. Eliges el número que crees que es mejor.
* RestartERDDAP. El sistema operativo cerrará cualquier archivo abierto.
         
### Solicitudes fallidas{#failed-requests} 
*    **Actividad inusual: √25% de las solicitudes falló**   
Como parte de cada reloadDatasets, que suele ser cada 15 minutos,ERDDAP™examina el porcentaje de solicitudes que falló desde la última recargaDatasets. Si es √25%,ERDDAP™envía un correo electrónico alERDDAP™administrador con el tema "Actividad inusual: √25% de solicitudes falló". Ese email incluye un relato cerca del fondo titulado "Dirección IP de Requester" (Failed)   (desde el último Mayor LoadDatasets) ". Busca eso. Le dice la dirección IP de los ordenadores haciendo las solicitudes más fallidas. Usted puede entonces buscar las direcciones IP en\\[bigParentDirectory\\]/logs/[log.txt](#log)archivar y ver qué tipo de solicitudes están haciendo.
    
Puede utilizar el número IP del usuario (por ejemplo, con[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) tratar de averiguar quién o qué es el usuario. A veces eso te dirá con precisión quién es el usuario (Por ejemplo, es un rastreador web de un motor de búsqueda) . La mayoría de las veces te da una pista (Por ejemplo, es una computadora de amazonas, es de una universidad, es alguien en una ciudad específica) .
    
Al ver la solicitud real, el número IP y el mensaje de error (todo desde[log.txt](#log)) para una serie de errores, generalmente se puede averiguar básicamente lo que está pasando mal. En mi experiencia, hay cuatro causas comunes de muchas solicitudes fallidas:
    
1) Las solicitudes son maliciosas (por ejemplo, buscando debilidades de seguridad, o haciendo solicitudes y luego cancelarlas antes de que sean completadas) . Deberías usar&lt;requestBlacklist dentrodatasets.xmlpara anular las direcciones IP.
    
2) Un motor de búsqueda está intentando ingenuamente las URL enumeradas enERDDAP™páginas web y documentos ISO 19115. Por ejemplo, hay muchos lugares que enumeran la baseOPeNDAPURL, por ejemplo, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , a la que se supone que el usuario debe añadir un tipo de archivo (Por ejemplo, .das, .dds, HTML) . Pero el motor de búsqueda no lo sabe. Y la solicitud a la URL base falla. Una situación relacionada es cuando el motor de búsqueda genera solicitudes extrañas o trata de rellenar formularios con el fin de llegar a páginas web "ocultas". Pero los motores de búsqueda a menudo hacen un mal trabajo de esto, dando lugar a fracasos. La solución es: crear un[robots.txt](#robotstxt)archivo.
    
3) Algunos usuarios están ejecutando un script que está pidiendo repetidamente algo que no está ahí. Tal vez es un conjunto de datos que solía existir, pero se ha ido ahora (temporal o permanente) . Los scripts a menudo no esperan esto y así que no traten con inteligencia. Así que el guión sigue haciendo solicitudes y las solicitudes siguen fallando. Si puedes adivinar quién es el usuario (del número de IP anterior) , póngase en contacto con ellos y dígales que el conjunto de datos ya no está disponible y pídales que cambien su script.
    
4) Algo está realmente mal con algún conjunto de datos. Por lo general,ERDDAP™hará que el conjunto de datos problemático inactivo. A veces no lo hace, así que todas las peticiones a ello sólo conducen a errores. Si es así, solucione el problema con el conjunto de datos o (si no puedes) establecer el conjunto de datos[activo="falso"](/docs/server-admin/datasets#active). Por supuesto, esto puede llevar al problema #2.
    
A veces los errores no son tan malos, en particular, siERDDAP™puede detectar el error y responder muy rápidamente (&lt;=1ms). Así que puede decidir no tomar ninguna acción.
    
Si todo lo demás falla, hay una solución universal: añadir el número IP del usuario al [&lt;requestBlacklist confiar] (/docs/servidor-admin/datasets#requestblacklist) . Esto no es tan malo o tan drástico una opción como podría parecer. El usuario recibirá un mensaje de error diciendo que ha sido enlistado y decirles su (elERDDAP™administrador) Dirección de correo electrónico. A veces el usuario se pondrá en contacto con usted y puede resolver el problema. A veces el usuario no se pone en contacto con usted y verá exactamente el mismo comportamiento que viene de un número IP diferente al día siguiente. Blacklist el nuevo número de IP y espero que finalmente obtengan el mensaje. (O este es tu Día de la Huerta, del cual nunca escaparás. Lo siento.) 
    
### robots.txt{#robotstxt} 
Las empresas de motores de búsqueda utilizan rastreadores web (por ejemplo, Google Bot) para examinar todas las páginas de la web para añadir el contenido a los motores de búsqueda. ParaERDDAP™Eso es básicamente bueno.ERDDAP™tiene muchos enlaces entre páginas, por lo que los rastreadores encontrarán todas las páginas web y las añadirán a los motores de búsqueda. Entonces, los usuarios de los motores de búsqueda podrán encontrar conjuntos de datos en susERDDAP.
    
Desafortunadamente, algunos rastreadores web (por ejemplo, Google Bot) están llenando y presentando formularios para encontrar contenido adicional. Para sitios de comercio web, esto es genial. Pero esto es terrible paraERDDAP™porque solo conduce a una **infinito** número de intentos indeseables e inútiles de arrastrar los datos reales. Esto puede dar lugar a más solicitudes de datos que de todos los demás usuarios combinados. Y llena el motor de búsqueda con subconjuntos sin sentido de los datos reales.
    
Para decirle a los rastreadores web que dejen de rellenar formularios y simplemente generalmente no miren las páginas web que no necesitan mirar, necesita crear un archivo de texto llamado[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)en el directorio raíz de la jerarquía de documentos de su sitio web para que pueda ser visto por cualquiera como, por ejemplo, http://*www.your.domain*/robots.txt .
Si estás creando un nuevo robot. txt file, este es un buen comienzo:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Pero sustituya *sus.instituciones.url* con tuERDDAPEs URL base.)   
Puede tomar unos días para que los motores de búsqueda se den cuenta y para que los cambios tengan efecto.
     
### sitemap.xml{#sitemapxml} 
Como[ https://www.sitemaps.org ](https://www.sitemaps.org/)sitio web dice:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

En realidad, desdeERDDAP™esRESTful, las arañas del motor de búsqueda pueden arrastrar fácilmenteERDDAP. Pero tienden a hacerlo más a menudo (¡Todos los días&#33;) que sea necesario (¿Mes?) .

* Dado que cada motor de búsqueda puede estar arrastrando todo suERDDAP™cada día, esto puede llevar a muchas solicitudes innecesarias.
* Así que...ERDDAP™genera un archivo sitemap.xml para suERDDAP™que dice motores de búsqueda que susERDDAP™sólo necesita ser arrastrado cada mes.
* Usted debe agregar una referencia aERDDAP's sitemap.xml a su[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)archivo:
Mapa del sitio: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Si eso no parece estar recibiendo el mensaje a los rastreadores, puede decir a los diversos motores de búsqueda sobre el archivo sitemap.xml visitando estas URLs (pero cambiar **Su Instituto** al acrónimo o abreviatura de su institución **www.yoursite.org** a suERDDAP's URL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I piensa) solo tienes que pinchar cada motor de búsqueda una vez, por siempre. Los motores de búsqueda detectarán cambios periódicamente en sitemap.xml.
     
### Difusión de datos / Distribución de datos Redes:PushyPullTecnología{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalmente,ERDDAP™actúa como intermediario: toma una solicitud de un usuario; obtiene datos de una fuente de datos remota; revisa los datos; y lo envía al usuario.
*   [PullTecnología](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™también tiene la capacidad de obtener activamente todos los datos disponibles de una fuente de datos remota y[almacenar una copia local de los datos](/docs/server-admin/datasets#eddgridcopy).
*   [PushTecnología](https://en.wikipedia.org/wiki/Push_technology): UsandoERDDAP's[servicios de suscripción](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), otros servidores de datos pueden ser notificados tan pronto como nuevos datos estén disponibles para que puedan solicitar los datos (tirando los datos) .
*   ERDDAP's[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)y[EDDTableDeErddap](/docs/server-admin/datasets#eddfromerddap)usoERDDAP's servicios de suscripción y[Sistema de bandera](#flag)para que se notifique inmediatamente cuando se disponga de nuevos datos.
* Usted puede combinar estos a gran efecto: si envuelve unEDDGridCopiar alrededor de unEDDGridFromErddap dataset (o envuelve un EDDTableCopy alrededor de un conjunto de datos EDDTable) ,ERDDAP™creará y mantendrá automáticamente una copia local de otraERDDAPEs Dataset.
* Debido a que los servicios de suscripción funcionan tan pronto como se disponga de nuevos datos, la tecnología push difunde los datos rápidamente (dentro de segundos) .

Esta arquitectura pone cada unoERDDAP™administrador encargado de determinar dónde los datos para su/ellaERDDAP™viene de.

* OtrosERDDAP™Los administradores pueden hacer lo mismo. No hay necesidad de coordinación entre los administradores.
* Si muchosERDDAP™administradores se vinculan entre síERDDAPs, se forma una red de distribución de datos.
* Los datos se distribuirán de forma rápida, eficiente y automática de fuentes de datos (ERDDAPs y otros servidores) a los sitios de redistribución de datos (ERDDAPs) en cualquier lugar de la red.
* A givenERDDAP™puede ser una fuente de datos para algunos conjuntos de datos y un sitio de redistribución para otros conjuntos de datos.
* La red resultante es aproximadamente similar a las redes de distribución de datos establecidas con programas como[Unidata's IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), pero menos rígidamente estructurada.
         
### Seguridad, Autenticación y Autorización{#security-authentication-and-authorization} 
Por defecto,ERDDAP™funciona como un servidor público (utilizandohttpy/ohttps) sin login ([autenticación](https://en.wikipedia.org/wiki/Authentication)) sistema y ninguna restricción al acceso a los datos ([autorización](https://en.wikipedia.org/wiki/Authorization)) .

#### Seguridad{#security} 
Si desea restringir el acceso a algunos o a todos los conjuntos de datos a algunos usuarios, puede utilizarERDDAPEs un sistema de seguridad integrado. Cuando el sistema de seguridad está en uso:

*   ERDDAP™uso[control de acceso basado en funciones](https://en.wikipedia.org/wiki/Role-based_access_control).
    * ElERDDAP™administrador define a los usuarios con [&lt;usuario] (/docs/servidor-admin/datasets#user) tag endatasets.xml. Cada usuario tiene un nombre de usuario, una contraseña (si autenticación=costo) , y uno o más roles.
    * ElERDDAP™administrador define qué roles tienen acceso a un conjunto de datos dado a través de [&lt;accesible a título] (/docs/servidor-admin/datasets#accesibleto) tag endatasets.xmlpara cualquier conjunto de datos que no debería tener acceso público.
* El estado de acceso del usuario (y un enlace para iniciar sesión / salida) se mostrará en la parte superior de cada página web. (Pero un usuario conectado apareceráERDDAP™para no estar conectado si usa unhttpURL.) 
* Si&lt;baseUrl] que especifique en su setup.xml es un **http** URL, los usuarios que no están conectados pueden usarERDDAP's **http** URLs. Si&lt;baseHttpsUrl contacto también se especifica, los usuarios que no se han iniciado sesión también pueden utilizarhttpsURLs.
* HTTPS Sólo... Si&lt;baseUrl] que especifique en su setup.xml es un **https** URL, se alienta a los usuarios que no están conectados (no forzado) a utilizarERDDAP's **https** URL - todos los enlaces enERDDAP™páginas web se refieren ahttpsURLs.
    
Si quieres obligar a los usuarios a usarhttpsURL, añadir una línea permanente redirigir dentro de la&lt;VirtualHost \\*:80 caracteres sección en el archivo de configuración de Apache (generalmentehttpd.conf) , por ejemplo,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Si quieres, hay un método adicional para forzar el uso dehttps: [HTTP Seguridad del transporte (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Para usarlo:
    
    1. Activar el módulo Apache Headers: encabezados a2enmod
    2. Añadir el encabezado adicional a la directiva HTTPS VirtualHost. Max-age se mide en segundos y se puede establecer a un valor largo.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Tenga en cuenta que este encabezado sólo es válido en un HTTPS VirtualHost.
    
Una razón para no obligar a los usuarios a utilizarhttpsURL es: el enlace SSL/TLS subyacente toma tiempo para establecer y toma tiempo para cifrar y descifrar toda la información transmitida entre el usuario y el servidor. Pero algunas instituciones requierenhttpsSólo.
    
* Usuarios que están conectados en DEBE usarERDDAP's **https** URLs. Si usanhttpURLs, parecenERDDAP™para no estar conectado. Esto garantiza la privacidad de las comunicaciones y ayuda a prevenir[secuestro de sesiones y secuestro lateral](https://en.wikipedia.org/wiki/Session_hijacking).
* Cualquier persona que no esté conectado puede acceder y utilizar los conjuntos de datos públicos. Por defecto, los conjuntos de datos privados no aparecen en listas de conjuntos de datos si un usuario no está conectado. Si el administrador ha establecido la configuración.xml&lt;listaPrivadaDatasets confiar a la verdad, aparecerán. Intente solicitar datos de conjuntos de datos privados (si el usuario conoce la URL) será redireccionado a la página de inicio de sesión.
* Cualquier persona que haya iniciado sesión podrá ver y solicitar datos de cualquier conjunto de datos públicos y de cualquier conjunto de datos privados a los que su papel les permita acceder. Por defecto, los conjuntos de datos privados a los que un usuario no tiene acceso no aparecen en listas de conjuntos de datos. Si el administrador ha establecido la configuración.xml&lt;listaPrivadaDatasets confiar a la verdad, aparecerán. Los intentos de solicitar datos de conjuntos de datos privados a los que el usuario no tiene acceso serán redirigidos a la página de inicio de sesión.
* ElRSSinformación para conjuntos de datos totalmente privados sólo está disponible para los usuarios (yRSSlectores) que están conectados y autorizados para utilizar ese conjunto de datos. Esto haceRSSno muy útil para conjuntos de datos totalmente privados.
    
Si un conjunto de datos es privado pero su [&lt;grafitasAccesible a confiar] (/docs/servidor-admin/datasets#graphsaccesibleto) se establece en público, el conjunto de datosRSSes accesible para cualquiera.
    
* Las suscripciones por correo electrónico sólo se pueden configurar cuando un usuario tiene acceso a un conjunto de datos. Si un usuario se suscribe a un conjunto de datos privado, la suscripción continúa funcionando después de que el usuario haya iniciado sesión.

##### Configuración de seguridad{#setup-security} 
Establecer el sistema de seguridad/autentificación/autorización:

* Hacer el estándarERDDAP™ [inicial](/docs/server-admin/deploy-install).
* In[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Agregar/cambiar el&lt;autenticado valor de nada a medida (No uses esto.) , correo electrónico (No uses esto.) , google (recomendado) , orcid (recomendado) , oauth2 (que es google+orcid, recomendado) . Vea los comentarios sobre estas opciones a continuación.
    * Agregar/cambiar el&lt;baseHttpsUrl ratio valor.
    * Insertar/descomunar&loginInfo;dentro&lt;startBodyHtml ES para mostrar el registro del usuario en la parte superior de cada página web.
* Para fines de prueba en su computadora personal,[seguir estas instrucciones para configurar tomcat para apoyar SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (la base parahttpsconexiones) creando una tienda con una[certificado autosignificado](https://en.wikipedia.org/wiki/Self-signed_certificate)y modificando *tomcat* /conf/server.xml para descomponer el conector para el puerto 8443. En Windows, es posible que necesite mover .keystore de "c:\\\Users\\\\\\ *Tú* \\.keystore" a "c:\\Users\\\Default User\\\.keystore" o "c:\\.keystore" (ver *tomcat* /logs/catalina. *hoy* .log si la aplicación no se carga o los usuarios no pueden ver el registro en la página) . Usted puede ver cuando el certificado .keystore expirará examinando el certificado cuando inicie sesión.
    
Para un servidor de acceso público, en lugar de utilizar un certificado auto-firmado, se recomienda encarecidamente que compre e instale un certificado firmado por un certificado[certificado](https://en.wikipedia.org/wiki/Certificate_authority), porque le da a sus clientes más seguridad de que están conectados a suERDDAP™, no una versión de hombre en medio de tuERDDAP. Muchos proveedores venden certificados digitales. (Busca web.) No son caros.
    
* En las computadoras Linux, si Tomcat se ejecuta en Apache, modifique el /etc/httpd/conf.d/ssl.conf file to allow HTTPS traffic to/fromERDDAP™sin requerir el número de puerto :8443 en la URL:
    1. Modificar el existente&lt;Etiquetas VirtualHost Conf (si hay uno) , o añadir una al final del archivo para que por lo menos tenga estas líneas:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Luego reinicia Apache: /usr/sbin/apachectl -k Graceful (pero a veces está en un directorio diferente) .
* In *tomcat* /conf/server.xml, uncomment el puerto=8443&lt;Tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
y cambiar la ubicación del certificadoKeystoreFile.
##### Autorización{#authorization} 
*   [Indatasets.xml, crear un](#authorization)[&lt;usuario] (/docs/servidor-admin/datasets#user) etiqueta para cada usuario con nombre de usuario, contraseña (si la autorización=costo) , y la información de roles. Esta es la parte de autorizaciónERDDAPEs sistema de seguridad.
     
* Indatasets.xml, añadir un [&lt;accesible a título] (/docs/servidor-admin/datasets#accesibleto) etiqueta a cada conjunto de datos que no debería tener acceso público.&lt;accessiblePara confiar le permite especificar qué roles tienen acceso a ese conjunto de datos.
     
* Reinicie Tomcat. ¿Problemas? Revisa los registros de Tomcat.
     
* ¡Celebra tu trabajo&#33; Cualquier error podría llevar a un defecto de seguridad.
     
* Compruebe que la página de inicio de sesión utilizahttps  (nohttp) . Intenta iniciar sesión a través dehttpdebe ser redirigido automáticamentehttpsand port 8443 (aunque el número de puerto se puede ocultar a través de un proxy Apache) . Es posible que necesite trabajar con su administrador de red para permitir que las solicitudes de web externas tengan acceso al puerto 8443 en su servidor.
     
* Puedes cambiar el&lt;usuario&lt;accesibles para etiquetas de usuario en cualquier momento. Los cambios se aplicarán en la siguiente recarga regular de cualquier conjunto de datos, o ASAP si utiliza un[bandera](#flag).

##### Autenticación{#authentication} 
[ **Autenticación (registro en) ** ](#authentication)  
Si no desea permitir a los usuarios iniciar sesión, no especifique un valor para&lt;autenticación basada en setup.xml.
Si desea permitir a los usuarios iniciar sesión, debe especificar un valor para&lt;autenticación. Actualmente,ERDDAP™soportes
[personalizado](#custom)  (No uses esto.) ,
[email](#email)  (No uses esto.) ,
[google](#google)  (recomendado) ,
[orcid](#orcid)  (recomendado) , y
[oauth2](#oauth2)  (recomendado) para el método de autenticación.
Si desea habilitar el registro, recomendamos encarecidamente las opciones de google, orcid o o oauth2 porque le liberan de almacenar y manejar las contraseñas del usuario (necesario para la medida) y son más seguros que la opción de correo electrónico. Recuerde que los usuarios a menudo utilizan la misma contraseña en diferentes sitios. Así que pueden estar usando la misma contraseña para suERDDAP™como hacen en su banco. Eso hace que su contraseña sea muy valiosa, mucho más valiosa para el usuario que los datos que están solicitando. Así que necesitas hacer todo lo que puedas para mantener las contraseñas privadas. Es una gran responsabilidad. Las opciones de correo electrónico, google, orcid y oauth2 se encargan de las contraseñas, por lo que no tienes que reunir, almacenar o trabajar con ellas. Así que estás libre de esa responsabilidad.

Todos&lt;las opciones de autenticación utilizando[cookie](https://en.wikipedia.org/wiki/HTTP_cookie)en el ordenador del usuario, por lo que el navegador del usuario debe configurarse para permitir las cookies. Si un usuario está haciendoERDDAP™solicitudes de un programa informático (no un navegador) , las cookies y la autenticación son difíciles de trabajar con. Es un problema común con todos los sistemas de autenticación. Lo siento.

Los detalles de los&lt;autenticación opciones son:

###### Aduanas{#custom} 
costumbre esERDDAP's sistema personalizado para permitir que los usuarios inicien sesión introduciendo su Nombre de Usuario y Contraseña en un formulario en una página web. Si un usuario intenta y no inicia sesión 3 veces en 10 minutos, el usuario está bloqueado de intentar iniciar sesión durante 10 minutos. Esto evita que los hackers simplemente intenten millones de contraseñas hasta que encuentren la correcta.

Esto es algo seguro porque el nombre de usuario y la contraseña se transmiten a través dehttps  (nohttp) , pero la autenticación=google, orcid, o oauth2 son mejores porque te liberan de tener que manejar contraseñas. El enfoque personalizado requiere que usted recoja el Nombre del usuario y un hash digest de su contraseña (¡Usa tu teléfono&#33; ¡El correo electrónico no está seguro&#33;) y guardarlos endatasets.xmlen&lt;usuario] (/docs/servidor-admin/datasets#user) etiquetas.

Con la opción personalizada, nadie puede iniciar sesión hasta que usted (elERDDAP™administrador) crear un&lt;usuario etiqueta de contacto para el usuario, especificando el nombre del usuario como nombre de usuario, el hash digest de su contraseña como contraseña y sus roles.

No recomendado
Debido a la torpeza de generar y transmitir el hash digest de la contraseña del usuario y debido a los riesgos asociados conERDDAP™sosteniendo el hash digests de las contraseñas, esta opción no se recomienda.

Aumentar la seguridad de esta opción:

* Usted debe asegurarse de que otros usuarios en el servidor (i.e., usuarios de Linux, noERDDAP™usuarios) no puede leer archivos en el directorio Tomcat (especialmentedatasets.xml¡Archivo&#33;) oERDDAPEs la gran directora de Parent.
En Linux, como usuario=tomcat, utilice:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *tomcatDirectory*   
chmod -R o-rwx *tomcatDirectory*   
     
* Use UEPSHA256 para&lt;passwordEncoding confianza en setup.xml.
     
* Utilice un método as-secure-as-possible para pasar el hash digest de la contraseña del usuario desde el usuario al usuarioERDDAP™administrador (¿teléfono?) .
         
###### email{#email} 
La opción de autenticación de correo electrónico utiliza una cuenta de correo electrónico del usuario para autenticar al usuario (enviando un correo electrónico con un enlace especial que tienen que acceder para iniciar sesión) . A diferencia de otros correos electrónicos queERDDAP™envía,ERDDAP™no escribe estos emails de invitación al archivo de registro de correo electrónico porque contienen información confidencial.
En teoría, esto no es muy seguro, porque los correos electrónicos no siempre están encriptados, por lo que un mal tipo con la capacidad de interceptar correos electrónicos podría abusar de este sistema utilizando una dirección de correo electrónico válida del usuario e interceptando el correo de invitación.
En la práctica, si se estableceERDDAP™para usar una cuenta de correo electrónico de Google para enviar correos electrónicos, y si lo estableces para utilizar una de las opciones TLS para la conexión, y si el usuario tiene una cuenta de correo electrónico de Google, esto es algo seguro porque los correos electrónicos están cifrados todo el camino desdeERDDAP™al usuario.

Aumentar la seguridad de esta opción:

* Asegúrese de que otros usuarios en el servidor (i.e., usuarios de Linux, noERDDAP™usuarios) no puede leer archivos en el directorio Tomcat oERDDAPEs la gran directora de Parent.
En Linux, como usuario=tomcat, utilice:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *tomcatDirectory*   
chmod -R o-rwx *tomcatDirectory*   
     
* Configurar las cosas para obtener seguridad de extremo a extremo para los correos electrónicos enviados desdeERDDAP™a los usuarios. Por ejemplo, usted podría hacer un sistema centrado en Google sólo creando&lt;etiquetas usuario título para direcciones de correo electrónico gestionadas por Google y configurando susERDDAP™para utilizar un servidor de correo electrónico de Google a través de una conexión segura/TLS: en su configuración.xml, utilice por ejemplo,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

No recomendado
No se recomienda la opción de autenticación de correo electrónico. Por favor utilice la opción google, orcid, o o oauth2.

Como con las opciones de google, orcid y oauth2, el email es muy conveniente paraERDDAP™administradores -- nunca tiene que lidiar con contraseñas o sus heces. Todo lo que necesitas crear es un [&lt;usuario] (/docs/servidor-admin/datasets#user) tag para un usuario endatasets.xmles la dirección de correo electrónico del usuario, queERDDAP™usa como nombre del usuario. (El atributo de contraseña no se utiliza cuando autenticación=email, google, orcid o o oauth2.) 

Con la opción de correo electrónico, sólo los usuarios que tienen un&lt;etiqueta usuarias endatasets.xmlpuede intentar conectarse aERDDAP™proporcionando su dirección de correo electrónico y haciendo clic en el enlace en el correo electrónico queERDDAP™Los envía.

ERDDAP™trata las direcciones de correo electrónico como caso insensible. Hace esto mediante la conversión de direcciones de correo electrónico que entra (en&lt;usuario etiquetas de título) o usuarios (on the login form) a su versión en minúscula.

Para configurar la autenticación=email:

1. En su configuración.xml, cambiar el&lt;baseHttpsUrl confianza tag's value.
Para experimentar/trabajar en su computadora personal, use
     https://localhost:8443   
Para tu públicoERDDAP™, uso
     https://*your.domain.org*:8443   
o sin el :8443 si usted está usando un Apache[proxypass](/docs/server-admin/deploy-install#proxypass)para que el número de puerto no sea necesario.
     
2. En su configuración.xml, cambiar el&lt;autenticación tag's value to email:
```
    <authentication>email</authentication>  
```

3. En su setup.xml, asegúrese de que el sistema de correo electrónico se establece a través de todo el&lt;e-mail... etiquetas de confianza, así queERDDAP™puede enviar correos electrónicos. Si es posible, configurar esto para utilizar una conexión segura (SSL / TLS) al servidor de correo electrónico.
     
4. En tudatasets.xml, crear [&lt;usuario] (/docs/servidor-admin/datasets#user) etiquetas para cada usuario que tendrá acceso a conjuntos de datos privados.
Utilice la dirección de correo electrónico del usuario como el nombre de usuario en la etiqueta.
No especifique el atributo de contraseña en la etiqueta del usuario.
     
5. RestartERDDAP™para que los cambios de configuración.xml ydatasets.xmlEfectivamente.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **google** ](#google),[ **orcid** ](#orcid), y[ **oauth2** ](#oauth2)   (recomendado)   
Las tres opciones son las recomendadasERDDAP™Opciones de autenticación. Son todas las opciones más seguras. Las otras opciones tienen una seguridad significativamente más débil.
     
###### Google{#google} 
* La opción de autenticación de Google utiliza[Signatura En con Google](https://developers.google.com/identity/gsi/web/guides/overview), que es una aplicación de la[Protocolo de autenticación OAuth 2.0](https://oauth.net/2/).ERDDAP™usuarios se inscriben en su cuenta de correo electrónico de Google, incluyendo cuentas gestionadas por Google, tales como@noaa.govcuentas. Esto permiteERDDAP™para verificar la identidad del usuario (nombre y dirección de correo electrónico) y acceso a su imagen de perfil, pero no daERDDAP™acceso a sus correos electrónicos, su Google Drive, o cualquier otra información privada.
    
ParaERDDAP™v2.22 y abajo,ERDDAP™usó "Google Sign-In". Google dice que el sistema está deprecado después del 31 de marzo de 2023. Si no lo has hecho, por favor, cambia aERDDAP™v2.23+ para utilizar el nuevo sistema de autenticación basado en "Regístrate con Google".
    
ParaERDDAP™v2.23 instancias con configuración de Content-Security-Policy y utilizando Google Authentication, necesita añadir https://accounts.google.com a la lista de script-src permitido (o script-src-elem) .ERDDAP™ya no usos https://apis.google.com Así que si lo tienes permitido, puedes eliminarlo ahora.
    
ParaERDDAP™v2.24+ también es necesario añadir https://accounts.google.com/gsi/style to stlye-src and https://accounts.google.com/gsi/ para conectar-src. Para el script-src ahora puedes usar https://accounts.google.com/gsi/client.
 
    
Para más información puede ir a la[Google page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sobre configuración CSP. Si tiene alguna pregunta, comuníquese con chris.john en noaa.gov.
         
###### Orcid{#orcid} 
* La opción de autenticación orcida utiliza[Autenticación orcida](https://members.orcid.org/api/integrate/orcid-sign-in), que es una aplicación de la[Protocolo de autenticación OAuth 2.0](https://oauth.net/2/).ERDDAP™usuarios se inscriben en sus[Cuenta Orcid](https://members.orcid.org/api/integrate/orcid-sign-in), que es comúnmente utilizado por los investigadores para identificarse. Esto permiteERDDAP™para verificar la identidad Orcid del usuario y obtener su número de cuenta Orcid, pero no daERDDAP™acceso a su otra información de la cuenta Orcid.

###### Oauth2{#oauth2} 
* La opción oauth2 permite a los usuarios iniciar sesión con su cuenta de Google o su cuenta de Orcid.

Las opciones de google, orcid y oauth2 son los sucesores de la opción openid, que se suspendió después deERDDAP™versión 1.68, y que se basó en una versión abierta Identificación que ya no está fechada. Por favor, cambie a la opción google, orcid o o oauth2.

Estas opciones son muy convenientes paraERDDAP™administradores -- nunca tiene que lidiar con contraseñas o sus heces. Todo lo que necesitas crear es un [&lt;usuario] (/docs/servidor-admin/datasets#user) tag para un usuario endatasets.xmlque especifica la dirección de correo electrónico del usuario o el número de cuenta Orcid como el atributo de nombre de usuario. (El atributo de contraseña no se utiliza cuando autenticación=email, google, orcid o o oauth2.) 

Con estas opciones, cualquiera puede conectarse aERDDAP™firmando en su cuenta de correo electrónico de Google o cuenta Orcid, pero nadie tendrá derecho a acceder a conjuntos de datos privados hasta que usted (elERDDAP™administrador) crear un&lt;usuario etiqueta, especificando su dirección de correo electrónico de Google o número de cuenta Orcid como el nombre de usuario, y especificando sus roles.

ERDDAP™trata las direcciones de correo electrónico como caso insensible. Hace esto mediante la conversión de direcciones de correo electrónico que entra (en&lt;usuario etiquetas de título) o usuarios (on the login form) a su versión en minúscula.

Para configurar la autenticación de google, orcid, o oauth2:

* En su configuración.xml, cambiar el&lt;baseHttpsUrl confianza tag's value.
Para experimentar/trabajar en su computadora personal, use
     https://localhost:8443   
Para tu públicoERDDAP™, uso
     https://*your.domain.org*:8443   
o, mejor, sin el :8443 si usted está usando un Apache[proxypass](/docs/server-admin/deploy-install#proxypass)para que el número de puerto no sea necesario.
     
* En su configuración.xml, cambiar el&lt;autenticación por ejemplo:
```
    <authentication>oauth2</authentication>  
```
###### Google setup{#google-setup} 
* Para las opciones de google y oauth2:
Siga las instrucciones a continuación para configurar la autenticación de Google para suERDDAP.
     
    1. Si no tienes una cuenta de correo electrónico de Google,[crear uno](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Seguir[estas instrucciones](https://developers.google.com/identity/sign-in/web/devconsole-project)crear un proyecto Google Developers Console y obtener un ID de cliente.
        
Cuando el formulario de Google pide autorizaciónJavaOrigen del script, introduzca el valor de&lt;baseHtpsUrl confidencial de su computadora personalERDDAP™setup.xml, por ejemplo,
         https://localhost:8443   
En una segunda línea, añadir el&lt;baseHtpsUrl confidencial de su públicoERDDAP™setup.xml, por ejemplo,
         https://*your.domain.org*:8443
 
        
No especifique ningún URI autorizado redirigir.
        
Cuando vea su ID de cliente para este proyecto, copiarlo y pegarlo en su configuración.xml (generalmente sólo abajo&lt;autenticación titular para ser ordenado, pero la colocación no importa realmente), en el&lt;googleClientID confiar tag, por ejemplo,
        &lt;googleClientID *tuClientID* &lt;/googleClientID
El ID del cliente será una cadena de unos 75 caracteres, probablemente comenzando con varios dígitos y terminando con .apps.googleusercontent.com .
         
        
    3. En tudatasets.xml, crear un [&lt;usuario] (/docs/servidor-admin/datasets#user) etiqueta para cada usuario que tendrá acceso a conjuntos de datos privados. Para el atributo de nombre de usuario en la etiqueta:
        
        * Para los usuarios que se iniciarán con google, utilice la dirección de correo electrónico de Google del usuario.
        * Para usuarios que se inscriban con orcid, utilice el número de cuenta Orcid del usuario (con cenizas) .
        
No especifique el atributo de contraseña para la etiqueta del usuario.
         
    4. RestartERDDAP™para que los cambios de configuración.xml ydatasets.xmlEfectivamente.
         
###### Orcid setup{#orcid-setup} 
* Para las opciones orcid y oauth2:
Siga las instrucciones de abajo para configurar la autentificación Orcid para suERDDAP.
     (Para más detalles, consulte[Documentación de API de autenticación de Orcid](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Si no tienes una cuenta Orcid,[crear uno](https://orcid.org/signin)  
         
    2. Entra en Orcid[ https://orcid.org/signin ](https://orcid.org/signin)usando su cuenta de Orcid personal.
         
    3. Haga clic en "Herramientas de desarrollo" (bajo "Para investigadores" en la parte superior) .
         
    4. Haga clic en "Registrarse para la API pública gratuita ORCID". Introduzca esta información:
Nombre:ERDDAP™a\\[su organización\\]  
Sitio web:\\[tuERDDAP's dominio\\]  
Descripción:ERDDAP™es un servidor de datos científicos. Los usuarios necesitan autenticar con Google o Orcid para acceder a conjuntos de datos no públicos.
Redirect URIs:\\[tuERDDAP's dominio\\]/erddap/loginOrcid.html
         
    5. Haga clic en el icono Guardar (Parece un disco de 3,5".) .
A continuación, puede ver su ORCID APP Client ID y ORCID Client Secret.
         
    6. Copiar y pegar el ID de cliente ORCID APP (que comenzará con "APP-") en configuración.xml en el&lt;etiqueta, por ejemplo,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Copiar y pegar el secreto del cliente ORCID (minúsculas caracteres alfa-numericos con pestañas) en configuración.xml en el&lt;orcidClientSecret titulada etiqueta, por ejemplo,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. En tudatasets.xml, crear un [&lt;usuario] (/docs/servidor-admin/datasets#user) etiqueta para cada usuario que tendrá acceso a conjuntos de datos privados. Para el atributo de nombre de usuario en la etiqueta:
        
        * Para los usuarios que se iniciarán con google, utilice la dirección de correo electrónico de Google del usuario.
        * Para usuarios que se inscriban con orcid, utilice el número de cuenta Orcid del usuario (con cenizas) .
        
No especifique el atributo de contraseña para la etiqueta del usuario.
         
    9. RestartERDDAP™para que los cambios de configuración.xml ydatasets.xmlEfectivamente.
             

###### Ingrese de cualquier manera{#log-in-either-way} 
Si utiliza las opciones de autenticación de google, orcid o o oauth2, y la API de autenticación de Google Sign-In o Orcid de repente deja de funcionar (por cualquier razón) o deja de trabajar comoERDDAP™espera, los usuarios no podrán acceder a suERDDAP. Como temporal (o permanentes) solución, puede pedir a los usuarios que se inscriban con el otro sistema (obtener una cuenta de correo electrónico de Google, o obtener una cuenta de Orcid) . Para hacer esto:

1. Cambiar el&lt;autenticación etiqueta de modo que permita el otro sistema de autenticación. La opción oauth2 permite a los usuarios iniciar sesión con cualquier sistema.
2. Duplicar cada uno de los&lt;usuario etiqueta y cambiar el atributo de usuario de la dirección de correo electrónico de Google al número de cuenta Orcid correspondiente (o viceversa) , pero mantener los roles atribuyen lo mismo.

###### OpenId{#openid} 
ERDDAP™ya no soporta la opción de autenticación abierta, que se basó en una versión de openid Identificación que ya no está fechada. Por favor use las opciones de google, orcid, o o oauth2.

###### BASIC{#basic} 
ERDDAP™no soporta la autenticación BASIC porque:
* BASIC parece estar orientado hacia las páginas web predefinidas que necesitan acceso seguro o manta en / apagado a todo el sitio, peroERDDAP™permite (Acceso restringido) datasets to be added on-the-fly.
* La autenticación BASIC no ofrece una manera para que los usuarios se inicien.
* Se sabe que la autenticación BASIC no es segura.

##### Fuentes de datos seguras{#secure-data-sources} 
Si un conjunto de datos tiene acceso restringido aERDDAP™usuarios, la fuente de datos (desde dondeERDDAP™obtiene los datos) no debe ser accesible públicamente. ¿Cómo puede ser?ERDDAP™obtener los datos para los conjuntos de datos de acceso restringido? Algunas opciones son:

*   ERDDAP™puede servir datos de archivos locales (por ejemplo, mediante EDDTable DeFiles oEDDGridDeFiles) .
     
*   ERDDAP™puede estar en[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) y la fuente de datos (por ejemplo, unOPeNDAPservidor o base de datos) puede estar detrás de un[cortafuegos](https://en.wikipedia.org/wiki/Firewall), donde es accesibleERDDAP™pero no al público.
     
* La fuente de datos puede estar en un sitio web público, pero requiere un login para obtener los datos. Los dos tipos de conjunto de datos queERDDAP™puede iniciar sesión en el acceso[EDDTableDesde la base de datos](/docs/server-admin/datasets#eddtablefromdatabase)y[EDDTableDesdeCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Estos conjuntos de datos apoyan (y siempre debe utilizar) nombres de usuario (crear unERDDAP™usuario que sólo tiene privilegios solo lectura) , contraseñas, conexiones SSL y otras medidas de seguridad.
    
Pero en general, actualmente,ERDDAP™no puede tratar estas fuentes de datos porque no tiene disposiciones para conectarse a la fuente de datos. Esta es la razón por la cual el acceso[EDDGridFromErddap and EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)Los datasets no pueden ser restringidos. Actualmente, el localERDDAP™no tiene manera de acceder y acceder a la información de metadatos desde el remotoERDDAP. Y poner el "remote"ERDDAP™detrás de su firewall y la eliminación de ese dataset es accesible A las restricciones no resuelve el problema: ya que las solicitudes de usuario para EDDXx FromErddap data need to be redirected to the remoteERDDAP™, el control remotoERDDAP™debe ser accesible.
    
#### Defensas contra los Hackers{#defenses-against-hackers} 
Hay malos hackers que tratan de explotar debilidades de seguridad en el software del servidor comoERDDAP.ERDDAP™sigue el consejo común de seguridad para tener varias capas de defensas:

* Privilegios restringidos... Una de las defensas más importantes es ejecutar Tomcat a través de un usuario llamado tomcat que no tiene contraseña (así nadie puede iniciar sesión como ese usuario) y tiene privilegios limitados del sistema de archivos (por ejemplo, el acceso sólo lectura a los datos) . SeeERDDAP's instrucciones para[configuración tomcat](/docs/server-admin/deploy-install#tomcat).
* Uso pesado - En general,ERDDAP™se construye para uso pesado, incluyendo por scripts que hacen decenas de miles de peticiones, una tras otra. Es difícil paraERDDAP™abrirse simultáneamente a un uso legítimo pesado y protegerse de los abusos. A veces es difícil diferenciar el uso legítimo pesado, el uso legítimo excesivo y el uso ilegítimo (y a veces es muy fácil) . Entre otras defensas,ERDDAP™conscientemente no permite una sola solicitud de utilizar una fracción inordinada de los recursos del sistema (a menos que el sistema no esté activo) .
* Identificar usuarios problemáticos - SiERDDAP™está disminuyendo o congelando (tal vez porque un usuario ingenuo o un bot está ejecutando múltiples scripts para enviar múltiples solicitudes simultáneamente o tal vez debido a un chico malo[Denegación del servicio](https://en.wikipedia.org/wiki/Denial-of-service_attack)ataque) Puedes mirar el[Daily Report email](#daily-report)  (y información idéntica más frecuente en el[ERDDAP™archivo de registro](#log)) que muestra el número de solicitudes hechas por los usuarios más activos (ver "Requester IP Address (Permiso) ") .ERDDAP™también envía correos electrónicos al administrador cuando hay["Actividad inusual: el 25% de las solicitudes falló"](#failed-requests). Entonces puedes mirar en elERDDAP™log file para ver la naturaleza de sus peticiones. Si sientes que alguien está haciendo demasiadas peticiones, extrañas peticiones (no creerías lo que he visto, bueno, tal vez lo harías) , o solicitudes de tipo de ataque, puede agregar su dirección IP a la lista negra.
* Lista negra... Puede agregar la dirección IP de usuarios problemáticos, bots y[Denegación del servicio](https://en.wikipedia.org/wiki/Denial-of-service_attack)atacantes a losERDDAP [lista negra](/docs/server-admin/datasets#requestblacklist), para que las solicitudes futuras de ellos sean inmediatamente rechazadas. Esta configuración está endatasets.xmlpara que pueda agregar rápidamente una dirección IP a la lista y luego[bandera](#flag)un conjunto de datos para queERDDAP™notifica inmediatamente y aplica el cambio. El mensaje de error enviado a los usuarios de la lista negra los anima a ponerse en contacto conERDDAP™administrador si sienten que han sido erróneamente puestos en la lista negra. (En nuestra experiencia, varios usuarios no han sabido que estaban ejecutando varios scripts simultáneamente, o que sus scripts estaban haciendo solicitudes de tonterías.) 
* Dataset Security - Algunos tipos de conjuntos de datos (notablemente, EDDTableDesdeDatabase) nuevos riesgos de seguridad (por ejemplo, inyección SQL) y tener sus propias medidas de seguridad. Vea la información para esos tipos de conjuntos de datos en[Trabajando con eldatasets.xmlArchivo](/docs/server-admin/datasets), en particular[EDDTableDesde la seguridad de la base de datos](/docs/server-admin/datasets#database-security).
* Auditoría de seguridad... AunqueNOAALa seguridad informática rechazó nuestras solicitudes de escaneos durante años, ahora escanean rutinariamente mi (Bob's)  ERDDAP™instalación. Aunque los escaneos iniciales encontraron algunos problemas que luego arreglé, los escaneos posteriores no han encontrado problemas conERDDAP. Los escaneos se preocupan por muchas cosas: en particular, desdetabledapsolicitudes parecen solicitudes SQL, se preocupan por vulnerabilidades de inyección SQL. Pero esas preocupaciones son infundadas porqueERDDAP™Siempre analiza y valida las consultas y luego construye por separado la consulta SQL de una manera que evita vulnerabilidades de inyección. La otra cosa de la que a veces se quejan es que nuestraJavaversión o las versiones de Tomcat no son tan actualizadas como quieran, así que las actualizamos en respuesta. Antes me ofrecí a mostrarle a la gente los informes de seguridad, pero ahora me dicen que no puedo hacer eso.

#### ¿Preguntas? ¿Sugerencias?{#questions-suggestions} 
Si tiene alguna pregunta sobreERDDAP's sistema de seguridad o tener cualquier pregunta, dudas, preocupaciones o sugerencias sobre cómo se establece, vea nuestra[sección sobre la obtención de apoyo adicional](/docs/intro#support).
    

## Cosas que no necesitas saber{#things-you-dont-need-to-know} 

Estos son detalles que no necesitas saber hasta que surge una necesidad.

### SegundoERDDAP™ {#second-erddap} 
*    **Configurar un segundoERDDAP™para el ensayo/desarrollo**   
Si quieres hacer esto, hay dos enfoques:
    *    (Mejor) Instalar Tomcat yERDDAP™en un ordenador aparte del ordenador que tiene su públicoERDDAP. Si utiliza su computadora personal:
        1. Haga la instalación un paso a la vez. Levanta a Tomcat y corre primero.
Cuando Tomcat está corriendo, el Administrador de Tomcat debería estar en
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (o tal vez[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. InstalaERDDAP.
        3. No utilice ProxyPass para eliminar el número de puerto delERDDAP™URL.
        4. In[setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://127.0.0.1:8080
 
        5. Después de empezar estoERDDAP™Deberías poder verlo.
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (o tal vez[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Segundo Tomcat{#second-tomcat} 
*    (Segundo mejor) Instalar otro Tomcat en el mismo ordenador que tu públicoERDDAP.
    1. Haga la instalación un paso a la vez. Levanta a Tomcat y corre primero.
Cambiar todos los números de puerto asociados con el segundo Tomcat (por ejemplo, cambiar 8080 a 8081)   (ver el[Múltiple Tomcat Sección de Instances](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)a través de ese documento) .
    2. InstalaERDDAP™en el nuevo Tomcat.
    3. No utilice ProxyPass para eliminar el número de puerto delERDDAP™URL.
    4. In[setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://www.*yourDomainName*:8081
 
    5. Después de empezar estoERDDAP™Deberías poder verlo.
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSD) ¡Son geniales&#33;**   
La forma más rápida, fácil y más barata de acelerarERDDAP's access to tabular data is to put the data files on a Solid State Drive (SSD) . La mayoría de los conjuntos de datos tabulares son relativamente pequeños, por lo que una SSD de 1 o 2 TB es probablemente suficiente para mantener todos los archivos de datos para todos los conjuntos de datos tabulares. SSD eventualmente se agota si escribes datos a una célula, lo eliminas y escribes nuevos datos a esa celda demasiadas veces. Así que si usted utiliza su SSD para escribir los datos una vez y leerlos muchas veces, incluso un SSD de grado de consumo debe durar mucho tiempo, probablemente mucho más que cualquier disco duro (HDD) . SSD de grado de consumo ahora son baratos (en 2018, ~$200 para 1 TB o ~$400 para 2 TB) y los precios siguen cayendo rápido. CuandoERDDAP™acceso a un archivo de datos, un SSD ofrece una latencia más corta (~0.1ms, versus ~3ms para un HDD, versus ~10 (?) ms para un RAID, versus ~55ms para Amazon S3) y mayor rendimiento (~500 MB/S, versus ~75 MB/s para un HDD, versus ~500 MB/s para un RAID) . Así que puedes conseguir un gran aumento de rendimiento (hasta 10X contra un HDD) por $200&#33; Comparado con la mayoría de los cambios posibles en su sistema (un nuevo servidor por $10,000? ¿Un nuevo RAID por 35.000 dólares? ¿Un nuevo interruptor de red por $5000? etc.) , esto es por lejos el mejor retorno de la inversión (ROI) . Si/cuando el SSD muere (en 1, 2, 8 años) , reemplazarlo. No confíe en ello a largo plazo, almacenamiento de archivos de los datos, sólo para la copia frontal de los datos.\\[SSD también sería genial para datos redondeados, pero la mayoría de los conjuntos de datos redondeados son mucho más grandes, haciendo que el SSD sea muy caro.\\]
    
Si su servidor no está cargado de memoria, la memoria adicional para su servidor es también una manera grande y relativamente barata de acelerar todos los aspectos deERDDAP.
     
    
### [Carga pesada / Limitaciones](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Con mucho uso, un standaloneERDDAP™puede verse limitado por varios problemas. Para más información, vea el[lista de limitaciones y soluciones](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grids, Clusters, and Federations{#grids-clusters-and-federations} 
Bajo un uso muy pesado, una sola independienteERDDAP™se enfrentará a una o más limitaciones e incluso las soluciones sugeridas serán insuficientes. Para tales situaciones,ERDDAP™tiene características que hacen fácil construir redes escalables (también llamados grupos o federaciones) deERDDAPs que permite al sistema manejar un uso muy pesado (por ejemplo, para un gran centro de datos) . Para más información, consulte[redes, racimos y federaciones deERDDAPs](/docs/server-admin/scaling).
     
### Cloud Computing{#cloud-computing} 
Varias empresas están empezando a ofrecer[cloud computing services](https://en.wikipedia.org/wiki/Cloud_computing)  (por ejemplo,[Amazon Web Services](https://aws.amazon.com/)) .[Web hosting companies](https://en.wikipedia.org/wiki/Web_hosting_service)han ofrecido servicios más sencillos desde mediados de los años 90, pero los servicios de "cloud" han ampliado considerablemente la flexibilidad de los sistemas y la gama de servicios ofrecidos. Usted puede utilizar estos servicios para configurar un soloERDDAP™o una cuadrícula/clusterERDDAPpara manejar un uso muy pesado. Para más información, consulte[cloud computing conERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon{#amazon} 
*    **[Amazon Web Services (AWS) Resumen de la instalación de EC2](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)es un[cloud computing service](https://en.wikipedia.org/wiki/Cloud_computing)que ofrece una amplia gama de infraestructura informática que se puede alquilar por hora. Puede instalarERDDAP™on an[Nube de Computación Elástica (EC2) ](https://aws.amazon.com/ec2/)ejemplo (su nombre para una computadora que se puede alquilar por hora) . AWS tiene una excelente[Guía de usuario de AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)y puede utilizar Google para encontrar respuestas a preguntas específicas que pueda tener. Prepárate... es una buena cantidad de trabajo para empezar. Pero una vez que consiga un servidor en funcionamiento, puede alquilar fácilmente tantos recursos adicionales (servidores, bases de datos, espacio SSD, etc.) como usted necesita, a un precio razonable.\\[Esto no es una recomendación o aprobación de Amazon Web Services. Hay otros proveedores de nubes.\\]
    
Una visión general de las cosas que necesitas hacer para conseguirERDDAP™correr en AWS es:
    
    * En general, usted hará todas las cosas descritas en[Guía de usuario de AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Establecer una cuenta de AWS.
    * Configurar un usuario de AWS dentro de esa cuenta con privilegios de administrador. Inicie sesión como usuario para hacer todos los siguientes pasos.
    * Elastic Block Storage (EBS) es el equivalente AWS de un disco duro conectado a su servidor. Algunos espacio de EBS serán asignados cuando primero crea una instancia EC2. Es almacenamiento persistente - la información no se pierde cuando usted detiene su instancia EC2. Y si cambias los tipos de instancia, tu espacio EBS se conecta automáticamente a la nueva instancia.
    * Crear una dirección IP elástica para que su instancia EC2 tenga una URL pública estable (en oposición a una URL privada que cambia cada vez que reinicias tu instancia) .
    * Crear y comenzar una instancia EC2 (ordenador) . Hay una amplia gama de[tipos de instancia](https://aws.amazon.com/ec2/instance-types/), cada uno a un precio diferente. Una instancia m4.large o m4.xlarge es potente y es probablemente adecuado para la mayoría de los usos, pero elija cualquier cosa que satisfaga sus necesidades. Probablemente querrá utilizar Linux de Amazon como sistema operativo.
    * Si su computadora de escritorio/laptop es un ordenador de Windows, puede utilizar[PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), un cliente SSH gratuito para Windows, para obtener acceso a la línea de comandos de su instancia EC2. O, usted puede tener otro programa SSH que usted prefiere.
    * Cuando inicie sesión en su instancia EC2, se registrará como usuario administrativo con el nombre de usuario "ec2-user". ec2-user tiene privilegios de sudo. Así que, cuando usted necesita hacer algo como el usuario raíz, use: sudo *algunosCommand* 
    * Si su computadora de escritorio/laptop es un ordenador de Windows, puede utilizar[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), un programa SFTP gratuito, para transferir archivos a / desde su instancia EC2. O, usted puede tener otro programa SFTP que usted prefiere.
    *   [Instalar Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)en su caso EC2.
    * Siga el estándar[ERDDAP™Instrucciones de instalación](/docs/server-admin/deploy-install).
         
### Espera entoncesTryAgain Excepción{#waitthentryagain-exception} 
Un usuario puede recibir un mensaje de error como
Espera entoncesTryAgainException:
Había una (temporal?) problema. Espera un minuto, luego vuelve a intentarlo. (En un navegador, haga clic en el botón Reload.)   
Detalles: GridDataAccessor.incremento: resultados parciales\\[0\\]Se esperaba que "123542730" fuera "123532800".

La explicación general de la WaitThenTryAgainException es:
CuandoERDDAP™está respondiendo a una solicitud de usuario, puede haber un error inesperado con el conjunto de datos (por ejemplo, un error al leer datos del archivo, o un error al acceder a un conjunto de datos remoto) . Esperen entoncesTryAgain señales aERDDAP™que la solicitud falló (hasta ahora) pero esoERDDAP™debe tratar de volver a cargar el conjunto de datos rápidamente (Se llama[SolicitudReloadASAP](#requestreloadasap)) y volver a enviar la solicitud. A menudo, esto sucede, y el usuario sólo ve que la respuesta a la solicitud fue lenta. Otras veces, la recarga falla o es demasiado lenta, o el intento subsiguiente de lidiar con la solicitud también falla y lanza otra WaitThenTryAgain. Si eso sucede,ERDDAP™marca el conjunto de datos para la recarga, pero le dice al usuario (a través de un WaitThenTryAgain Excepción) que hubo un fracaso al responder a la solicitud.

Ese es el comportamiento normal. Este sistema puede tratar con muchos problemas comunes.
Pero es posible que este sistema se desencadene excesivamente. La causa más común es queERDDAP's la carga del conjunto de datos no ve un problema, peroERDDAP's respuesta a una solicitud de datos ve el problema. No importa cuál sea la causa, la solución es para que usted se ocupe de lo que está mal con el conjunto de datos. Mira en log.txt para ver los mensajes de error reales y tratar con los problemas. Si muchos archivos tienen encabezados válidos pero datos inválidos (un archivo dañado) , reemplazar los archivos con archivos incorruptos. Si la conexión con un RAID es flakey, solucione. Si la conexión a un servicio remoto es flakey, encuentra una manera de hacer que no flakey o descargar todos los archivos de la fuente remota y servir los datos de los archivos locales.

La explicación detallada de ese error específico (arriba) es:
Para cada unoEDDGridDataset,ERDDAP™mantiene los valores variables del eje en memoria. Se utilizan, por ejemplo, para convertir los valores de eje solicitados que usan el " () "formato en números índice. Por ejemplo, si los valores del eje son "10, 15, 20, 25", una solicitud de (20) se interpretará como una solicitud de índice #2 (Índices basados en 0) . CuandoERDDAP™obtiene una solicitud de datos y obtiene los datos de la fuente, verifica que los valores del eje que obtuvo de la fuente coinciden con los valores del eje en la memoria. Normalmente lo hacen. Pero a veces la fuente de datos ha cambiado de manera significativa: por ejemplo, los valores de índice desde el comienzo de la variable del eje pueden haberse eliminado (por ejemplo, "10, 15, 20, 25" puede haberse convertido en "20, 25, 30") . Si eso sucede, está claro queERDDAPinterpretación de la solicitud (por ejemplo, " (20) "es índice #2) Ahora está equivocado. Así que...ERDDAP™lanza una excepción y llama a RequestReloadASAP.ERDDAP™actualizará el conjunto de datos pronto (a menudo en unos segundos, generalmente en un minuto) . Otros problemas similares también lanzan la excepción WaitThenTryAgain.
    
#### SolicitudReloadASAP{#requestreloadasap} 
Usted puede ver RequestReloadASAP en el archivo log.txt justo después de un mensaje de error y a menudo cerca de un[Espera entoncesTryAgain Excepción](#waitthentryagain-exception). Es básicamente una forma interna, programática paraERDDAP™para establecer un[bandera](#flag)para indicar que el conjunto de datos debe ser recargado lo antes posible.
     
### Archivos que no se eliminan{#files-not-being-deleted} 
Para unos pocosERDDAP™instalaciones, ha habido un problema con algunos archivos temporales creados porERDDAP™permanecer abierto (equivocadamente) y por lo tanto no se elimina. En algunos casos, muchos de estos archivos han acumulado y tomado una cantidad significativa de espacio en disco.

Con suerte, estos problemas se resuelven (aERDDAP™v2.00) . Si usted ve este problema, por favor envíe un correo electrónico a Chris los directorios + nombres de los archivos ofensivos. John en Noaa.gov. Usted tiene algunas opciones para tratar con el problema:

* Si los archivos no son grandes y no están causando que se escape del espacio del disco, puede ignorar el problema.
* La solución más simple es cerrar tomcat/ERDDAP™  (después de horas, menos usuarios se ven afectados) . Durante el cierre, si el sistema operativo no elimina los archivos, eliminarlos a mano. Entonces reiniciaERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Marcado semántico de conjuntos de datos con json-ld (JSON Datos vinculados) ](#json-ld)**   
    ERDDAP™ahora utiliza[json-ld (JSON Datos vinculados) ](https://json-ld.org)para hacer su catálogo de datos y conjuntos de datos parte de la[semántica web](https://en.wikipedia.org/wiki/Semantic_Web), que es la idea de Tim Berners-Lee de hacer que el contenido web sea más legible por máquina y máquina "comprensible". El contenido json-ld utiliza[schema.org](https://schema.org/)términos y definiciones. Motores de búsqueda ([Google en particular](https://developers.google.com/search/docs/data-types/datasets)) y otras herramientas semánticas pueden utilizar esta marca estructurada para facilitar el descubrimiento e indexación. La marca estructurada json-ld aparece como invisible-a-humanos&lt;script código en el https://.../erddap/info/index.html página web (que es una web semántica[DataCatalog](https://schema.org/DataCatalog)) y en cada https://.../erddap/info/*datasetID*/index.html página web (que es una web semántica[Dataset](https://schema.org/Dataset)) . (Especial gracias a Adam Leadbetter y Rob Fuller del Instituto Marino de Irlanda por hacer las partes difíciles del trabajo para hacer esta parte deERDDAP.)   
     
### URL fuera de destino{#out-of-date-urls} 
Despacio pero sin duda, las URL que los proveedores de datos han escrito en archivos de datos se están convirtiendo fuera de la fecha (por ejemplo,httpse convierte enhttps, los sitios web se reorganizan y organizaciones como NODC/NGDC/NCDC se reorganizan en NCEI) . Los enlaces rotos resultantes son un problema siempre presente enfrentado por todos los sitios web. Para lidiar con esto,ERDDAP™ahora tiene un sistema para actualizar automáticamente URL fuera de fecha. Si GenerarDatasets Xml ve una URL no actualizada, añade la URL actualizada a&lt;addAttributes. Además, cuando un conjunto de datos se carga, siERDDAP™ve una URL fuera de la fecha, que cambia silenciosamente a la URL actualizada. Los cambios son controlados por una serie de búsqueda/reemplazamiento-con pares definidos en&lt;updateUrls dentroERDDAP's
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Puedes hacer cambios allí. Si tiene sugerencias para cambios, o si cree que esto debe ser convertido en un servicio (como los convertidores) Por favor, por correo electrónico a Chris. John en Noaa.gov.
     
### CORS{#cors} 
* CORS ([Intercambio de recursos entre países](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"es un mecanismo que permite recursos restringidos (e.g. fuentes oERDDAP™datos) en una página web a ser solicitado de otro dominio fuera del dominio del cual se sirvió el primer recurso" (Arun Ranganathan) . Básicamente, CORS es un mensaje que se puede poner en el encabezado HTTP de una respuesta, diciendo esencialmente, "está bien con este sitio si ciertos otros sitios (específicas, o todas) recursos (por ejemplo, datos) de este sitio y ponerlo disponible en su sitio". Así, es una alternativa a[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
Los desarrolladores deERDDAP™no pretenden ser expertos en seguridad. No estamos completamente claros sobre los problemas de seguridad relacionados con CORS. No queremos hacer ninguna declaración que apoye una acción que disminuya la seguridad. Así que nos mantendremos neutrales y lo dejaremos a cada unoERDDAP™admin para decidir si los beneficios o habilitar un encabezado CORS valen los riesgos. Como siempre, si tuERDDAP™tiene conjuntos de datos privados, es una buena idea tener más cuidado con la seguridad.
    
Si desea habilitar CORS para suERDDAP™, hay[instrucciones disponibles](https://enable-cors.org/index.html)describiendo cómo los administradores del sitio web pueden habilitar un encabezado CORS a través de su software servidor de nivel inferior (por ejemplo, Apache o nginx) .
    
### Palettes{#palettes} 
* Las paletas son utilizadas porERDDAP™convertir una gama de valores de datos en una gama de colores al hacer gráficos y mapas.
    
Cada paleta se define en un archivo de paleta de estilo .cpt como utilizado por[GMT](https://www.soest.hawaii.edu/gmt/). TodosERDDAP™.cpt archivos son válidos GMT .cpt archivos, pero lo contrario no es cierto. Para uso enERDDAP™, archivos .cpt tienen:
    
    * Las líneas de comentarios opcionales al inicio del archivo, comenzando por "#".
    * Una sección principal con una descripción de los segmentos de la paleta, un segmento por línea. Cada línea de descripción de segmento tiene 8 valores:
Empieza Valor, startRed, empezar Green, comienza Azul, endValue, endRed, endGreen, endBlue.
Puede haber algún número de segmentos.ERDDAP™utiliza la interpolación lineal entre el startRed/Green/Blue y endRed/Green/Blue de cada segmento.
        
Recomendamos que cada segmento especifique un color de inicio y final que son diferentes, y que el color de inicio de cada segmento sea el mismo que el color final del segmento anterior, de modo que la paleta describe una mezcla continua de colores.ERDDAP™tiene un sistema para crear en el vuelo una paleta de colores discretos de una paleta con una mezcla continua de colores. AnERDDAP™el usuario puede especificar si quieren que la paleta sea continua (el original) o Discreta (derivado del original) . Pero hay razones legítimas para no seguir estas recomendaciones para algunas paletas.
        
    * El valor inicial y los valores finales deben ser enteros.
El primer segmento debe tener startValue=0 y endValue=1.
El segundo segmento debe tener startValue=1 y endValue=2.
Etc.
    * Los valores rojo, verde y azul deben ser enteros de 0 (ninguno) ... 255 (completo) .
    * El final del archivo debe tener 3 líneas con:
        1. Un color rgb de fondo para valores de datos menos que el mínimo de barra de colores, por ejemplo: B 128 128
Es a menudo el startRed, startGreen, y startBlue del primer segmento.
        2. Un color rgb de primer plano para valores de datos más que el máximo de la barra de colores, por ejemplo: F 128 0 0
Es a menudo el endRed, endGreen y endBlue del último segmento.
        3. Color rgb para valores de datos NaN, por ejemplo, N 128 128
A menudo es gris medio (128 128) .
    * Los valores de cada línea deben ser separados por pestañas, sin espacios extraneosos.
    
Un archivo .cpt muestra BlueWhiteRed.cpt:
    
\\# Este es BlueWhiteRed.cpt.
0 0 128 1 0 0 255
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
5 255 0 0 6 128 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
Vea los archivos .cpt existentes para otros ejemplos. Si hay problemas con un archivo .cpt,ERDDAP™probablemente lanzar un error cuando el archivo .cpt es analizado (que es mejor que mal uso de la información) .
    
Puedes añadir más paletas aERDDAP. Puedes hacerlos tú mismo o encontrarlos en la web (por ejemplo,[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) aunque probablemente tengas que editar su formato ligeramente para conformarte conERDDAPEs .cpt requisitos. Para conseguirERDDAP™para utilizar un nuevo archivo .cpt, almacenar el archivo en *tomcat* /webapps/erddap/WEB-INF/cptfiles (tendrá que hacer eso por cada nueva versión deERDDAP) y bien:
    
    * Si utiliza el archivo default messages.xml: agregue el nombre de archivo al archivo&lt;paletas tituladas
         *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Si haces esto, necesitas hacerlo cada vez que actualizasERDDAP.
    * Si utilizas un archivo personalizado.xml: agrega el nombre de archivo al archivo&lt;palettes titulada etiqueta en su archivo custom messages.xml: *tomcat* /content/erddap/messages.xml . Si haces esto, solo necesitas hacerlo una vez. (pero hay otro trabajo para mantener un archivo personalizado.xml) .
    
Entonces reiniciaERDDAP™Así que...ERDDAP™nota los cambios. Una ventaja de este enfoque es que puede especificar el orden de las paletas en la lista presentada a los usuarios. Si agregas una colección, te animamos a añadir un prefijo con las iniciales de los autores (por ejemplo, "KT\\_") al nombre de cada paleta para identificar la colección y para que pueda haber múltiples paletas que de otro modo tendrían el mismo nombre.
    
Por favor, no quites ni cambies ninguna de las paletas estándar. Son una característica estándar de todosERDDAP™instalaciones. Si usted piensa que una paleta o colección de paletas debe ser incluido en el estándarERDDAP™distribución porque / ellos serían de uso general, por favor envíelos por correo electrónico a Chris. John en Noaa.gov.
    
### Colorbars{#colorbars} 
*    **¿Cómo?ERDDAP™generar los colores en una barra de colores?** 
    
    1. El usuario selecciona uno de los predefinidos[paletas](#palettes)o usa el predeterminado, por ejemplo, Rainbow. Las paletas se almacenan y definen en los archivos de mesa de estilo GMT.cpt Color Palette. Cada una de lasERDDAP's paletas predefinidas tiene una simple gama de enteros, por ejemplo, 0 a 1 (si sólo hay una sección en la paleta) , o 0 a 4 (si hay cuatro secciones en la paleta) . Cada segmento del archivo cubre n a n+1, comenzando en n=0.
    2.  ERDDAP™genera un nuevo archivo .cpt on-the-fly, escalando la gama de la paleta predefinida (por ejemplo, 0 a 4) a la gama de la paleta necesaria por el usuario (por ejemplo, 0,1 a 50) y luego generar una sección en la nueva paleta para cada sección de la nueva paleta (por ejemplo, una escala de registro con garrapatas a 0.1, 0.5, 1, 5, 10, 50 tendrá 5 secciones) . El color para el punto final de cada sección se genera encontrando la sección relevante de la paleta en el archivo .cpt, y luego interpolar linealmente los valores R, G y B. (Así es como GMT genera colores de sus archivos de mesa de paleta de colores.) Este sistema permiteERDDAP™para empezar con paletas genéricas (por ejemplo, Rainbow con 8 segmentos, en total de 0 a 8) y crear paletas personalizadas en el vuelo (por ejemplo, un arco iris personalizado, que mapas 0.1 a 50 mg/L a los colores del arco iris) .
    3.  ERDDAP™entonces utiliza ese nuevo archivo .cpt para generar el color para cada pixel de color diferente en la barra de color (y más tarde para cada punto de datos al trazar datos en un gráfico o mapa) , de nuevo encontrando la sección relevante de la paleta en el archivo .cpt, luego interpolar linealmente los valores R, G y B.
    
Este proceso puede parecer innecesariamente complicado. Pero resuelve problemas relacionados con escalas de registros que son difíciles de resolver de otras maneras.
    
Así que ¿cómo puedes imitar lo queERDDAP™¿Lo está haciendo? Eso no es fácil. Básicamente necesita duplicar el proceso queERDDAP™está usando. Si eres unJavaprogramador, puede usar el mismoJavaclase queERDDAP™usa para hacer todo esto:
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Directrices para los sistemas de distribución de datos{#guidelines-for-data-distribution-systems} 
Se pueden encontrar más opiniones generales sobre el diseño y evaluación de los sistemas de distribución de datos[Aquí.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveADataset{#archiveadataset} 
Incluido en suERDDAP™instalación es una herramienta de línea de comandos llamada ArchiveADataset que puede ayudarle a hacer un archivo (a.zipo.tar.gzarchivo) con parte o todo un conjunto de datos almacenados en una serie de netcdf-3.ncarchivos de datos en un formato de archivo que es adecuado para su presentaciónNOAAEs archivo NCEI (.ncpara conjuntos de datos o[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)para conjuntos de datos tabulares, según especifican los[NCEINetCDFPlantillas v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

ArchiveA Dataset puede hacer dos formatos de archivo diferentes:

* El formato "original" sigue estos[NCEI Archiving Guidelines](https://www.ncdc.noaa.gov/atrac/guidelines.html), esta guía para[Archivar sus datos en NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), y los relacionados[Prácticas para asegurar la integridad de los datos](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* El formato "BagIt" hace[Cargos BagIt](https://en.wikipedia.org/wiki/BagIt), un formato de archivo estandarizado promovido por la Biblioteca del Congreso de EE.UU., según especifica la[BagIt v0.97 especificación](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI puede estandarizar en archivos BagIt para presentaciones al archivo.

No es sorprendente,[metadatos globales y variables](/docs/server-admin/datasets#global-attributes)queERDDAP™alienta/requiere es casi exactamente los mismos metadatos CF y ACDD que NCEI alienta/requiere, por lo que todos sus conjuntos de datos deben estar listos para su presentación a NCEI a través de[Send2NCEI](https://www.nodc.noaa.gov/s2n/)o[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource tool for Archive Collections) .

Si tú (elERDDAP™administrador) use ArchiveADataset para enviar datos a NCEI, entonces usted (NCEI) determinará cuándo enviar un trozo de datos a NCEI y qué será ese trozo, porque sabrá cuándo hay nuevos datos y cómo especificar ese trozo (y NCEI no) . Por lo tanto, ArchiveADataset es una herramienta para que usted pueda utilizar para crear un paquete para enviar a NCEI.

ArchiveA Dataset puede ser útil en otras situaciones, por ejemplo, paraERDDAP™administradores que necesitan convertir un subconjunto de un conjunto de datos (on a privateERDDAP) de su formato de archivo nativo en un conjunto de[.ncArchivos CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), para que un públicoERDDAP™puede servir los datos de los.ncArchivos CF en lugar de los archivos originales.

Una vez que hayas preparadoERDDAP™y ejecutarlo (al menos una vez) , usted puede encontrar y utilizar ArchiveADataset en el *tomcat* /webapps/erddap/WEB-INF directory. Hay un script de shell (ArchiveADataset.sh) para Linux/Unix y un archivo por lotes (ArchiveADataset.bat) para Windows.

En Windows, la primera vez que ejecuta ArchiveADataset, necesita editar el ArchiveADataset. archivo de murciélago con un editor de texto para cambiar la ruta hacia el java. archivo exe para que Windows pueda encontrarJava.

Cuando se ejecuta ArchiveADataset, le hará una serie de preguntas. Para cada pregunta, escriba una respuesta, luego presione Enter. O pulse ^C para salir de un programa en cualquier momento.

O, puede poner las respuestas a las preguntas, en orden, en la línea de comandos. Para ello, ejecute el programa una vez y escriba sus respuestas. Entonces, puedes crear una sola línea de comandos (con las respuestas como parámetros) que ejecuta el programa y responde a todas las preguntas.
Utilice la palabra predeterminado si desea utilizar el valor predeterminado para un parámetro dado.
Usar " (dos citas dobles) como titular de un cordón vacío.
Los parámetros de especificación en la línea de comandos pueden ser muy convenientes, por ejemplo, si utiliza ArchiveADataset una vez al mes para archivar el valor de los datos de un mes. Una vez que haya generado la línea de comandos con parámetros y guardado que en sus notas o en un script de shell, sólo tiene que hacer pequeños cambios cada mes para hacer el archivo de ese mes.

Las preguntas que hace ArchiveADataset le permiten:

* Especifique el embalaje de archivos original o Bagit. Para NCEI, usa Bagit.
* Especificar la cremallera o la tarta.gzcompresión para el paquete. Para NCEI, use tar.gz.
* Especifique una dirección de correo electrónico de contacto para este archivo (será escrito en el archivo READ\\_ME.txt en el archivo) .
* Especifique eldatasetIDdel conjunto de datos que desea archivar.
* Especifique qué variables de datos desea archivar (usualmente) .
* Especifique qué subconjunto del conjunto de datos desea archivar. Necesita formatear el subconjunto de la misma manera que formatearía un subconjunto para una solicitud de datos, por lo que será diferente para rejillas que para conjuntos de datos tabulares.
    * Para conjuntos de datos redondeados, puede especificar una gama de valores de la dimensión más izquierda, generalmente que es una gama de tiempo. ArchiveADataset hará una solicitud separada y generará un archivo de datos separado para cada valor en el rango de valores. Como los conjuntos de datos redondeados son generalmente grandes, casi siempre tendrá que especificar un pequeño subconjunto relativo al tamaño de todo el conjunto de datos.
Por ejemplo,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Para conjuntos de datos tabulares, puede especificar cualquier colección de restricciones, pero a menudo es una gama de tiempo. Puesto que los conjuntos de datos tabulares son generalmente pequeños, a menudo es posible especificar no limitaciones, de modo que se archiva todo el conjunto de datos.
Por ejemplo, &quot; Time Conf=2015-12-01&lt;2016-01-01
* Para conjuntos de datos tabulares: especifique una lista separada por coma de 0 o más variables que determinarán cómo los datos archivados se subconfiguran en diferentes archivos de datos. Para conjuntos de datos que tienen
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=TimeSeries|TimeSeriesProfile|Trayectoria|TrajectoryProfile
debe casi siempre especificar la variable que tiene el cf\\_role=timeseries\\_id (por ejemplo,stationID) o cf\\_role=trajectory\\_id atributo. ArchiveADataset hará una solicitud separada y generará un archivo de datos separado para cada combinación de los valores de estas variables, por ejemplo, para cada una de ellas.stationID.
Para todos los demás conjuntos de datos tabulares, probablemente no especificará ninguna variable para este propósito.
Advertencia: Si el subconjunto del conjunto de datos que está archivando es muy grande (■2GB) y no hay una variable adecuada para este propósito, entonces ArchiveADataset no es utilizable con este conjunto de datos. Esto debería ser raro.
* Especifique el formato de archivo para los archivos de datos que se crearán.
Para conjuntos de datos redondeados, para NCEI, use.nc.
Para conjuntos de datos tabulares, para NCEI, use[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)si es una opción; de otro modo uso.nc.
* Especifique el tipo de archivo digest que se creará para cada archivo de datos y para todo el paquete de archivo: MD5, SHA-1 o SHA-256. El archivo digest proporciona una manera para el cliente (por ejemplo, NCEI) para probar si el archivo de datos se ha corrompido. Tradicionalmente, estos eran[.md5 archivos](https://en.wikipedia.org/wiki/MD5), pero ahora hay mejores opciones. Para NCEI, use SHA-256 .

Después de responder a todas las preguntas, ArchiveADataset:

1. Haga una serie de solicitudes al conjunto de datos y escenifique los archivos de datos resultantes en *bigParentDirectory* /ArchiveADataset/ *datasetID\\_timestamp* /.
Para conjuntos de datos redondeados, habrá un archivo para cada valor de la dimensión más izquierda (por ejemplo, tiempo) . El nombre del archivo será ese valor (por ejemplo, el valor del tiempo) .
Para conjuntos de datos tabulares, habrá un archivo para cada valor de la variable ... (s) . El nombre del archivo será ese valor. Si hay más de una variable, las variables izquierda se utilizarán para hacer nombres de subdirectorios, y la variable más derecha se utilizará para hacer los nombres de archivo.
Cada archivo de datos debe ser&lt;2GB (el máximo permitido por.ncversión 3 archivos) .
2. Haga un archivo relacionado con cada archivo de datos con la digestión del archivo de datos. Por ejemplo, si el archivo de datos es 46088.ncy el tipo digesto es .sha256, entonces el archivo digest tendrá el nombre 46088.nc.sha256.
3. Haga un archivo READ\\_ME.txt con información sobre el archivo, incluyendo una lista de todas las configuraciones que especificó para generar este archivo.
4. Hacer 3 archivos en *bigParentDirectory* /ArchiveADataset / :
    
    * A.zipo.tar.gzarchivo de archivo llamado *datasetID\\_timestamp* .zip  (o.tar.gz) conteniendo todos los archivos de datos escenificados y digerir archivos. Este archivo puede ser de cualquier tamaño, limitado sólo por espacio de disco.
    * Un archivo digestivo para el archivo de archivo, por ejemplo, *datasetID\\_timestamp* .zip.sha256.txt
    * Para el tipo de archivo "original", un archivo de texto llamado *datasetID\\_timestamp* .zip.listOfFiles.txt (o.tar.gz) que lista todos los archivos en.zip  (o.tar.gz) archivo.
    
Si usted está preparando el archivo para NCEI, estos son los archivos que usted enviará a NCEI, quizás vía[Send2NCEI](https://www.nodc.noaa.gov/s2n/)o[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI's Advanced Tracking and Resource tool for Archive Collections) .
5. Eliminar todos los archivos escenificados para que sólo el archivo (por ejemplo,.zip) , la digestión (por ejemplo, .sha256.txt) del archivo, y (opcionalmente) los archivos .listOfFiles.txt permanecen.

#### ISO 19115 .xml Archivos de metadatos{#iso-19115-xml-metadata-files} 
El paquete de archivos ArchiveADataset no incluye el archivo de metadatos ISO 19115 .xml para el conjunto de datos. Si desea o necesita enviar un archivo ISO 19115 para su conjunto de datos a NCEI, puede enviarlos el archivo de metadatos ISO 19115 .xml queERDDAP™creado para el conjunto de datos (peroNMFSlas personas deben obtener el archivo ISO 19115 para sus conjuntos de datos de InPort siERDDAP™no está ya sirviendo ese archivo) .

¿Problemas? ¿Sugerencias? ArchiveADataset es nuevo. Si usted tiene problemas o sugerencias, Vea nuestro[sección sobre la obtención de apoyo adicional](/docs/intro#support).
     
