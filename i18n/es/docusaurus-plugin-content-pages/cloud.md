---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™y la nube

## ¿Qué es la nube?

La definición más simple no es servidores locales. Esto es muy amplio y puede significar muchas configuraciones diferentes. Por ejemplo, podría ser un servidor físico dedicado en un centro de datos, un servidor privado virtual, un servidor compartido, sin servidor o algo más.

### Por qué Cloud

Hay muchas razones por las que las organizaciones quieren mudarse a la nube. La más importante es la flexibilidad que proporciona para las necesidades de cálculo / almacenamiento en comparación con la compra de hardware físico.

Esto elimina la necesidad de mantener un centro de datos/servidor. También permite escalar los recursos informáticos a sus necesidades actuales. Al igual que la nube puede significar muchas cosas diferentes, ser capaz de escalar sus recursos también. Podría significar pagar por más (o menos) Recursos sin servidor. Podría significar pasar de un servidor compartido a un servidor privado. Podría significar actualizar a un servidor físico dedicado más grande.

## CanERDDAP™correr en la nube?

Sí.

ERDDAP™está diseñado para funcionar dentro de Tomcat que se puede ejecutar localmente o en entornos de nubes. Hay apoyo comunitario para correr en Docker y hay[funcionario Apoyo Docker pronto](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Eso dijo:ERDDAP™fue diseñado en un momento en que servidores dedicados eran la norma. No es sin servidor, y sería extremadamente difícil si no imposible hacerlo sin servidor.

### CanERDDAP™¿La escala?

EscaladaERDDAP™es más complicado que usar más recursos sin servidor. Tenemos una gran documentación sobre[cómo escalarERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Haciendo más fácil escalarERDDAP™es algo que nos interesa.

### ¿Qué evita el autoescalamiento?

ERDDAP™está haciendo muchas cosas, incluyendo mantener los conjuntos de datos actualizados, notificando a los suscriptores de cambios en los conjuntos de datos, datos de caché, tramitar solicitudes de usuario, y más. Para un suficientemente grandeERDDAP™servidor[CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Esto significa que continuamente está haciendo algo. El uso continuo es en realidad una situación extremadamente costosa para las opciones sin servidor (pagas una gran prima por compute cuando haces sin servidor y por lo tanto la ventaja principal es cuando sólo ocasionalmente haces llamadas) . Además, tratando de mover todoERDDAP™’s varias funcionalidad a versiones sin servidor terminaría con una configuración significativamente más complicada requerida para los administradores.

### CanERDDAP™¿Utilizar Cloud Storage?

Sí.

ERDDAP™soporta almacenamiento en la nube (incluido AWS S3) y mejora de este apoyo (for example non-AWS S3) es una alta prioridad enERDDAP™hoja de ruta para el desarrollo.ERDDAP™también es capaz de extraer datos de muchos servicios en línea existentes. Para más información recomiendo buscar a través de nuestra[Tipo de archivo de documentación](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
