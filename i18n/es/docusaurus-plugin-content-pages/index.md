---
title: "ERDDAP™ Documentation"
---
## Últimas ERDDAP™ versión{#latest-erddap-version} 

2.28.1, ver el [Cambios de documentación](/changes#version-2281) y [descargarlo](https://github.com/ERDDAP/erddap/releases/tag/v2.28.1) .

##  ERDDAP™ información{#erddap-information} 

 ERDDAP™ es un servidor de datos científicos que da a los usuarios una manera sencilla y consistente de descargar subconjuntos de
conjuntos de datos científicos redondeados y tabulares en formatos de archivo comunes y hacer gráficos y mapas.
 ERDDAP™ es una fuente libre y abierta (Apache y Apache)   Java Servlet de NOAA   NMFS   SWFSC Environmental Research Division ( ERD ) .

* Para ver/utilizar un ERDDAP™ instalación: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Para empezar con una instalación leída [la guía de instalación de despliegue](/docs/server-admin/deploy-install) .
* Para aportar código ver [guía del programador](/docs/contributing/programmer-guide) .


A continuación encontrará enlaces relevantes para hacer preguntas y cómo contribuir.
* Revisar las conversaciones y hacer preguntas [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) o a [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* Examinar y presentar cuestiones [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* Para proponer solicitudes de características, siga esta orientación: [ ERDDAP Discusiones #93 (comentario) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Búsqueda múltiple ERDDAP™ s
Hay dos maneras de buscar múltiples ERDDAP™ s para conjuntos de datos: [Búsqueda múltiple ERDDAP™ s](/SearchMultipleERDDAPs.html) y [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Arregla tu propio ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ es un [Fuente libre y abierta](https://en.wikipedia.org/wiki/Free_and_open-source_software) , todo... Java   (servlet) , aplicación web que se ejecuta en un servidor de aplicaciones web (por ejemplo, Tomcat (recomendado) O Jetty (funciona, pero no lo apoyamos) ) . Esta página web es principalmente para personas (" ERDDAP™ administradores") que quieren establecer sus propios ERDDAP™ instalación en su propio sitio web.

Para empezar con una instalación leída [la guía de instalación de despliegue](/docs/server-admin/deploy-install) .

### Por qué usar ERDDAP™ ¿para distribuir sus datos?{#why-use-erddap-to-distribute-your-data} 

Porque el pequeño esfuerzo para establecer ERDDAP™ trae muchos beneficios.

* Si ya tiene un servicio web para distribuir sus datos,
puedes configurar ERDDAP™ para acceder a sus datos a través del servicio existente.
O puedes configurar ERDDAP™ para acceder a sus datos directamente desde archivos locales.
* Para cada conjunto de datos, sólo tiene que escribir un pequeño trozo de XML para decir ERDDAP™ cómo acceder al conjunto de datos.
* Una vez que tengas ERDDAP™ servir sus datos, los usuarios finales pueden:
    * Solicitar los datos de diversas maneras ( DAP , WMS y más en el futuro) .
    * Obtenga la respuesta de datos en varios formatos de archivo. (¡Es la razón más grande&#33;) 
    * Haga gráficos y mapas. (A todos les gustan las fotos bonitas.) 
    * Construir otras cosas útiles e interesantes encima de ERDDAP 's servicios web - ver [ Awesome ERDDAP TM](https://github.com/IrishMarineInstitute/awesome-erddap) lista de impresionantes ERDDAP - proyectos relacionados.

Puedes [personalizar](/docs/server-admin/deploy-install#customize) tu ERDDAP Es la apariencia así ERDDAP™ refleja su organización y encaja con el resto de su sitio web.

## ¿Es difícil el procedimiento de instalación? ¿Puedo hacerlo?{#is-the-installation-procedure-hard-can-i-do-it} 

La instalación inicial lleva algún tiempo, pero no es muy difícil. Puedes hacerlo. Si te atascas, envíame un correo electrónico. erd dot data at noaa dot gov . Te ayudaré.
O puedes unirte al [ ERDDAP™ Grupo de Google / Lista de correo](https://groups.google.com/g/erddap) y publicar su pregunta allí.

## Quien usa ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ ha sido instalada por unas 100 organizaciones en al menos 17 países

 (Australia, Bélgica, Canadá, China, Francia, India, Irlanda, Italia, Nueva Zelanda, Rusia, Sudáfrica, España, Sri Lanka, Suecia, Tailandia, Reino Unido, USA) , incluyendo:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia-Pacific Data-Research Center, International Pacific Research Center) en la Universidad de Hawaii (UH)  
*    [BCO-DMO en la OMS](https://erddap.bco-dmo.org/erddap/index.html)   (Oceanografía Biológica y Química Oficina de Gestión de Datos en Woods Hole Oceanographic Institución)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Canadian Watershed Information Network) en el Centro de Ciencias de la Observación de la Tierra (CEOS) , Universidad de Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Coastal Data Information Program at UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (National Research Council of Italy, Institute of Polar Sciences)  
* CSIRO e IMOS (Organización de Investigación Científica e Industrial de Australia y el Sistema Integrado de Observación Marina) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Oficina de Respuesta y Restauración)  
*    [EMODnet Física](https://erddap.emodnet-physics.eu/erddap/index.html)   (The European Marine Observation and Data Network - Physics)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Gulf of Mexico Research Initiative)  
*    [Hakai Institute](https://catalogue.hakai.org/erddap/index.html)   (The Hakai Institute on the Central Coast of British Columbia, Canada) 
*    [High School Technology Services](https://myhsts.org) , que ofrece formación en codificación y tecnología para estudiantes y adultos
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High-End Computing) 
*    [I NCO ES](https://erddap.incois.gov.in/erddap/index.html)   (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche pour le Développement, France)   
CNRS (Centre National de la Recherche Scientifique, France)   
UPMC (Université Pierre et Marie CURIE, Paris, Francia)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger - Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUYT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, Francia)   
LMI ECLAIRS (Laboratoire Mixte International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques») 
* JRC (European Commission - Joint Research Centre, European Union) 
*    [The Marine Institute](https://erddap.marine.ie/erddap/index.html)   (Irlanda)  
* Marine Instruments S.A. (España) 
* NCI (Infraestructura Computacional Nacional de Australia) 
*    [ NOAA CoastWatch](https://coastwatch.noaa.gov/erddap/index.html)   (central)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Caribbean/Gulf of Mexico Node)  
*    [ NOAA CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Nodo de Grandes Lagos)  
*    [ NOAA CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) que es co-locado con y trabaja con
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Environmental Research Division of SWFSC de NMFS ) 
*    [ NOAA Sensores IOOS](https://erddap.sensors.ioos.us/erddap/index.html)   (Sistema Integrado de Observación de los Océanos)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Central and Northern California Ocean Observing System, run by Axiom Data Science)  
*    [ NOAA IOOS GCOOS Datos atmosféricos y oceanográficos: Sistema de observación](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Datos Atmosféricos y Oceanográficos: Colecciones históricas](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA COOS biológicos y socioeconómicos](https://gcoos4.tamu.edu/erddap/index.html)   (Gulf Coast Ocean Observing System) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (National Glider Data Assembly Center)  
*    NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*    [ NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Pacific Islands Ocean Observing System) en la Universidad de Hawaii (UH)  
*    NOAA IOOS SCCOOS (Southern California Coastal Ocean Observing System) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Southeast Coastal Ocean Observing Regional Association)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (National Centers for Environmental Information)    
*    NOAA NGDC STP (Geofísica Nacional Data Center, Solar - Física Terrestre) 
*    NOAA   NMFS NEFSC (Northeast Fisheries Science Center) 
*    [ NOAA NOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Center for Operational Oceanographic Products and Services)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Observatorio del Sistema)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Pacific Islands Fisheries Science Center)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Marco de acceso unificado)  
*    [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Todos los datos](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Ocean Observatories Initiative)   
OOI / Datos no cocidos
* Princeton, Hydrometeorology Research Group
* R.Tech Engineering, Francia
*    [Rutgers University, Department of Marine and Coastal Sciences](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html) Memorial University of Newfoundland
* South African Environmental Observation Network
* Spyglass Technologies
* Stanford University, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (International Oceanographic and Information Intercambio de datos)  
*    [University of British Columbia, Earth, Ocean &apos; Atmospheric Sciences Department](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Universidad de California en Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [University of Delaware, Satellite Reception Station](https://basin.ceoe.udel.edu/erddap/index.html)  
* Universidad de Washington, Laboratorio de Física Aplicada
*    [SGA](https://geoport.usgs.esipfed.org/erddap/index.html)   (Coastal and Marine Geology Program)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Voz del océano, Suecia)  

Esta es una lista de algunas organizaciones donde ERDDAP™ ha sido instalado por algún individuo o algún grupo. No implica que el individuo, el grupo, o la organización recomienda o respalda ERDDAP .

###  ERDDAP™ se recomienda dentro NOAA y CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Directiva de acceso a datos](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) Incluye ERDDAP™ en su lista de servidores de datos recomendados para su uso por grupos dentro NOAA . ERDDAP™ se menciona favorablemente en la sección 4.2.3 del
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Gestión de datos de investigación Guía de Buenas Prácticas) ] (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) del Centro Nacional de la Recherche Scientifique (CNRS) en Francia.

## Slide Shows{#slide-shows} 

Aquí están algunos shows de diapositivas de PowerPoint y documentos que Bob Simons ha creado relacionados con ERDDAP .

 **DISCLAIMER: El contenido y las opiniones expresadas en estos documentos son las opiniones personales de Bob Simons y no reflejan necesariamente ninguna posición del Gobierno o del Gobierno National Oceanic and Atmospheric Administration .** 

Los cuatro documentos principales:

*    [La introducción principal ERDDAP™   (versión 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
También puede [ver este video de Bob dando esta charla![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Una página Descripción de ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Carga pesada, rejas, racimos, federaciones y computación en la nube](/docs/server-admin/scaling) 
*    [Directrices de Bob para sistemas de distribución de datos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Otras presentaciones:

*    [2020 EDM: nuevas características ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (O [ver este video de Bob dando esta charla](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Nuevas características ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 ESIP de verano: Subsetting In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Summer ESIP: JSON Support In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Un sistema distribuido de servicios web (Más rápido, más fácil, menos caro)   (O por qué estaba feliz hace 4 años.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ en 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: nuevas características ERDDAP™ para datos de imagen, audio y vídeo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF y ERDDAP™ Soluciones para la integración de datos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Una introducción rápida ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM y 2017 IOOS: Nuevo o poco conocido ERDDAP™ Características (para Usuarios) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM y 2017 IOOS: Nuevo o poco conocido ERDDAP™ Características (para los Administradores) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB y ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: ¿Cómo obtienen los datos de la fuente al usuario final? Escuela vieja versus Nueva Escuela](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Verano ESIP: La gran imagen: PARR, OPeNDAP , ERDDAP™ , y distribución de datos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Uno y listo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Next Generation Servidores de datos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 ESIP de verano: agregación tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob Do's y Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: La interfaz de usuario ideal](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 ESIP de verano: Datos tabulares](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: No trate los datos in situ y tabulares como los datos recubiertos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Hacer más con menos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Directrices para los sistemas de distribución de datos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Exposiciones de otras personas:

*    [Una herramienta basada en FAIR para mejorar el intercambio global de datos![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
por Kevin O'Brien en el Sistema Mundial de Observación de Océanos (GOOS) Webinar / Observation Coordination Group (OCG) Serie / 1, 12 de noviembre de 2020.
*    [Construyendo tu propia aplicación meteorológica NOAA Datos Abiertos y Cuadernos de Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
por Filipe Fernandes y Rich Signell en SciPy 2018, 13 de julio de 2018.
*    [Usando el OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
por Rich Signell, febrero de 2018.
*    [ESIP Tech Dive: " ERDDAP Lightning Talks"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Ocho conversaciones de 5 minutos sobre cosas interesantes que la gente está haciendo con ERDDAP por Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton y Eli Hunter presentaron como ESIP Tech Dive el 31 de agosto de 2017.
*    [Uso ERDDAP™ Acceso a Datos Tabulares![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
por Rich Signell, agosto de 2015.
*    [Prueba usando ERDDAP™ para datos de carbono azul![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
por Rich Signell, agosto de 2015.
*    [Uso de datos ERDDAP™ dentro NOAA 's GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
En este vídeo, Rich Signell descarga datos de pronóstico de las corrientes oceánicas de ERDDAP™ para modelar un derrame tóxico en el océano [ NOAA 's GNOME software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (en 5 minutos&#33;) . (Un pequeño error en el vídeo: al buscar conjuntos de datos, no utilice Y entre los términos de búsqueda. Es implícito.) Por Rich Signell, 8 de abril de 2011.
