---
title: "Access to Private Datasets"
---
# Acceso a conjuntos de datos privadosERDDAP™

MuchosERDDAP™Las instalaciones no tienen habilitación de autenticación y por lo tanto no proporcionan ninguna manera para que los usuarios se inscriban, ni tienen ningún conjunto de datos privados.

AlgunosERDDAP™las instalaciones tienen habilitada la autenticación. Actualmente,ERDDAP™solo admite autenticación a través de cuentas de correo electrónico administradas por Google, que incluye cuentas de correo electrónico enNOAAy muchas universidades. SiERDDAP™tiene habilitada la autenticación, cualquiera con una cuenta de correo electrónico gestionada por Google puede iniciar sesión, pero sólo tendrá acceso a los conjuntos de datos privados que losERDDAP™El administrador los ha autorizado expresamente a acceder.

## Instrucciones actualizadas{#updated-instructions} 

Parte de la información que figura a continuación no está fechada. Hasta que esto se actualiza se puede utilizar[este blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)para los pasos recientes para obtener datos de un conjunto de datos privado con scripts.

## Humanos con navegadores{#humans-with-browsers} 

Usuarios humanos deERDDAP™puede iniciar sesiónERDDAP™en un navegador para obtener acceso a conjuntos de datos privados que están autorizados para acceder.

Para iniciar sesión:

1. Haga clic en el enlace de registro en la parte superior izquierda de cualquierERDDAP™página web.
Si no hay registro en el enlace, elERDDAP™la instalación no tiene habilitación de autenticación y no hay conjuntos de datos privados.
     
2. Haga clic en el botón Iniciar sesión para iniciar sesión en su cuenta de Google.
El texto del botón debe cambiar a "Firmado".
     
3. Haga clic en el registroERDDAPbotón.
La página web debe cambiar a decir Usted está conectado como *tu EmailAddress* .
Si no lo hace, espere 5 segundos y haga clic en el botón Iniciar sesiónERDDAPbotón otra vez.
En casos extremos, usted puede tener que esperar y luego intentarlo de nuevo unas cuantas veces.
     
4. No use el botón Atrás de su navegador. Usar el "ERDDAP" enlace en la parte superior de lo anterior, luego utilizar otros enlaces para ir aERDDAP™páginas que te interesan. Si una página web caché dice que no estás conectado, vuelva a cargar la página.
     

## Scripts{#scripts} 

\\[Esto se modifica ligeramente de la información proporcionada por Lynn DeWitt, quien hizo el duro trabajo de averiguar esto. Lynn, muchas gracias.
Si tiene correcciones o sugerencias, por favor envíe un correo electrónico a erd.data @ noaaa.gov .\\]

También es posible iniciar sesiónERDDAP™y acceso a conjuntos de datos privados a través de un script. Aquí hay un ejemplo que utilizacurl:

1. Estas instrucciones suponen que estás usando una dirección de gmail donde la autenticación de 2 factores no se activa. Si su dirección principal de gmail tiene 2 factores de autentificación activada, considere crear otra dirección de gmail con autenticación de 2 factores apagado.
     
2. Inicie sesiónERDDAP™manualmente con la dirección gmail que desea utilizar en su script y aceptar cualquier permiso requerido, a continuación, inicie sesión completamente hacia fuera.
     
3. Abra el navegador Herramientas para desarrolladores y vaya a la pestaña Red.
     
4. Haga clic enERDDAP™"log in" link, then the "Sign in" button and choose the appropriate email address if prompted.
     
5. Después de que el botón "Iniciar sesión" cambie a "Firmado", la pestaña Herramientas para Desarrolladores mostrará dos entradas que parecen las siguientes: (ejemplo de Firefox) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Utilice el menú contextual de clic derecho del ratón para "copiar como cURL" ambos de estos urls y pegarlos en un editor de texto plano
     
6. Haga clic en el "Log intoERDDAP"Botón y "copiar como cURL" el enlace que parece:
```
    login.html  
```
y pega este tercerocurlcomando into the text file.
     
7. En el archivo de texto, ahora tendrás 3 líneas como las siguientes, donde has iniciado sesión en un archivo de textoERDDAP™servidor en ' * https://host.somewhere.com/erddap * '. La primeracurlcomando obtiene su perfil de usuario en "login\\_hint" y genera un "id\\_token". El segundo utiliza el id\\_token para iniciar sesión en Google, y el tercero luego entra aERDDAP.
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Las 3 líneas anteriores, cuando se ejecutan secuencialmente desde una línea de comandos, le registrarán enERDDAP. Para utilizar estos en un script es necesario capturar el id\\_token de la primera línea, alimentarlo a la segunda línea, y escribir una cookie para ser leída por líneas posteriores.
     
9. Para desarrollar un script, ejecute el primero (' https://accounts.google.com )  curllínea exactamente como fue copiado de las herramientas del desarrollador, y capturar la respuesta (Usted puede conseguir uncurlerror sobre la bandera "--2.0") . En php parece lo siguiente:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Inicia sesión en Google ejecutando la segunda línea usando $id\\_token, eliminando primero el parámetro "-H 'Cookie: cosas" y en lugar de decircurlpara escribir una cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Inicie sesiónERDDAP™, de nuevo la eliminación del parámetro "-H 'Cookie: cosas" y el uso de la cookie previamente escrita:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Ahora debe ser capaz de solicitar datos del servidor, utilizando la misma cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
