---
title: "ERDDAP™ Documentation"
---
## Новини ERDDAP™ версія{#latest-erddap-version} 

2.28.1, див. [документація](/changes#version-2281) і [скачати](https://github.com/ERDDAP/erddap/releases/tag/v2.28.1) й

##  ERDDAP™ Інформація{#erddap-information} 

 ERDDAP™ є науковим сервером даних, який дає користувачам простий, послідовний спосіб завантаження субсетів
сітчасті та табличні наукові дані у спільних форматах файлів та роблять графіки та карти.
 ERDDAP™ Безкоштовний і відкритий джерело (Статус на сервери)   Java Сервіс NOAA   NMFS   SWFSC Відділ досліджень навколишнього середовища ( ERD ) й

* Дивитися / використовувати ERDDAP™ монтаж: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Для початку роботи з інсталяцією читайте [Встановити керівництво](/docs/server-admin/deploy-install) й
* Для сприяння коду див. [Керівництво програмістів](/docs/contributing/programmer-guide) й


Нижче ви знайдете відповідні посилання для запитань і як допомогти.
* Переглядайте розмови і запитайте питання на [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) чи [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* Перегляд та подання питань [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* Пропонувати запити функцій, дотримуйтесь інструкцій: [ ERDDAP Обговорення #93 (Новини) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Пошук Кілька ERDDAP™ й
Існує два способи пошуку декількох ERDDAP™ s для даних: [Пошук Кілька ERDDAP™ й](/SearchMultipleERDDAPs.html) і [ ERDDAP™ Данісет Discovery](http://erddap.com/) й


## Встановити свій власний ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ є [Безкоштовні та відкриті джерела](https://en.wikipedia.org/wiki/Free_and_open-source_software) , всі Java   (консервлет) , веб-додаток, що працює на сервері веб-додатків (Наприклад, Tomcat (Рекомендовані) , або Jetty (ми не підтримуємо) ) й Ця сторінка в основному для людей (« » » » » » » » » » » » » » » ERDDAP™ адміністратори) хто хоче самостійно налаштувати ERDDAP™ установка на власний сайт.

Для початку роботи з інсталяцією читайте [Встановити керівництво](/docs/server-admin/deploy-install) й

### Чому ERDDAP™ поширювати дані?{#why-use-erddap-to-distribute-your-data} 

Оскільки невеликі зусилля для встановлення ERDDAP™ приносить багато переваг.

* Якщо ви вже маєте веб-службу для розповсюдження ваших даних,
Ви можете налаштувати ERDDAP™ для доступу до даних через існуючу послугу.
Або, ви можете налаштувати ERDDAP™ доступу до даних безпосередньо з локальних файлів.
* Для кожного набору даних вам потрібно лише написати маленький шматок XML, щоб розповісти ERDDAP™ Як отримати доступ до даних.
* Після того, як ви ERDDAP™ надання ваших даних, кінцевих користувачів можуть:
    * Запитати дані різними способами ( DAP й WMS і більше в майбутньому) й
    * Отримати відповідь на дані в різних форматах файлів. (Це, мабуть, найбільша причина&#33;) 
    * Зробіть графіки та карти. (Кожен любить досить фотографії.) 
    * Побудувати інші корисні і цікаві речі зверху ERDDAP Веб-послуги [ Awesome ERDDAP Твитнуть](https://github.com/IrishMarineInstitute/awesome-erddap) список дивних ERDDAP - пов'язані проекти.

Ви можете [Налаштування](/docs/server-admin/deploy-install#customize) Ваше ім'я ERDDAP - зовнішній вигляд так ERDDAP™ Відображення вашої організації та вписується в іншому місці.

## Чи є процедура встановлення важко? Чи можу я це зробити?{#is-the-installation-procedure-hard-can-i-do-it} 

Початкова установка займає деякий час, але це не дуже важко. Ви можете це зробити. Якщо ви застрягнете, по електронній пошті erd dot data at noaa dot gov й Я допоможе вам.
Або, ви можете приєднатися до [ ERDDAP™ Google Group / Список розсилки](https://groups.google.com/g/erddap) і поставте своє питання там.

## Хто використовує ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ Встановлено близько 100 організацій принаймні 17 країн

 (Австралія, Бельгія, Канада, Китай, Франція, Індія, Ірландія, Італія, Нова Зеландія, Росія, Південна Африка, Іспанія, Шрі-Ланка, Швеція, Таїланд, Великобританія, США) , в тому числі:

*    [АПДРК](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Науково-дослідний центр Азійсько-Тихоокеанського регіону) в Гаваї (УГ)  
*    [BCO-DMO на WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Біологічна та хімічна океанографія Управління даними в отворі деревини Oceanographic Інститут)  
*    [Книжка ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Канадська інфраструктура для водних перевезень) Центр досліджень Землі (Генеральний директор) , Університет Манітоба
*    [Cайт](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Програма інформації про дані берегових даних на UCSD)  
*    [СНР-ІСП](https://data.iadc.cnr.it/erddap/index.html)   (Національна науково-дослідна рада Італії, Інститут полярних наук)  
* CSIRO і IMOS (Спеціалізована науково-дослідна організація Австралії та інтегрована система морського спостереження) 
*    [ДИВР ( NOAA ОРР) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Управління відповідями та реставрацією)  
*    [Фізика EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)   (Європейська Морська спостереження та мережа даних - фізика)  
*    [Гомрі](https://erddap.griidc.org/erddap/index.html)   (Гольф Мехіко Ініціатива досліджень)  
*    [Інститут гакаї](https://catalogue.hakai.org/erddap/index.html)   (Інститут Хакай на Центральному узбережжі Британської Колумбії, Канада) 
*    [Послуги з високих технологій](https://myhsts.org) , яка пропонує навчання для студентів та дорослих
*    [МІЧ](https://erddap.ichec.ie/erddap/index.html)   (Ірландський центр високого класу) 
*    [Я NCO ЗАМОВИТИ](https://erddap.incois.gov.in/erddap/index.html)   (Індійський національний центр океанських інформаційних послуг)  
* ІКД (Установа de Recherche залийте Le Developpement, Франція)   
СНР (Центр Національний де ла Речерче Вчений, Франція)   
УМОВИ (Université П'єр та Маріу CURIE, Париж, Франція)   
УКАС (Université Cheikh Anta Diop de Dakar, Сенегал)   
УГБ (Université Gaston Berger - Сент-Люїс du Sénégal)   
УФХБ (Універсітэт Фелікс HOUPHOUZHT-BOIGNY, Абіджан, Кот-д'Івуар)   
ТПВ (Установа П'єр Simon Laplace des Sciences de l'environnement, Париж, Франція)   
LMI ECLAIRS (Laboratoire Mixte Міжнародний «Etude du Climat En Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux послуги climatiques») 
* ПАР (Європейська комісія - Спільний дослідницький центр Європейського Союзу) 
*    [Морський інститут](https://erddap.marine.ie/erddap/index.html)   (Ірландія)  
* Морські інструменти S.A. (Іспанія) 
* НПП (Національна обчислювальна інфраструктура Австралії) 
*    [ NOAA Приват24](https://coastwatch.noaa.gov/erddap/index.html)   (Центральний)  
*    [ NOAA CGOM - відео @ KGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Карибський/Gulf Мексики Node)  
*    [ NOAA Приват24](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Великі озера Нод)  
*    [ NOAA CoastWatch Західний берег](https://coastwatch.pfeg.noaa.gov/erddap/index.html) який знаходиться на території і працює з
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Відділ екологічних досліджень SWFSC з NMFS ) 
*    [ NOAA Датчики IOOS](https://erddap.sensors.ioos.us/erddap/index.html)   (Комплексна система спостереження за океаном)  
*    [ NOAA IOOS Ce NCO ОС](https://erddap.axiomdatascience.com/erddap/index.html)   (Центральна та Північна Каліфорнія Система спостереження за океаном, яка працює на базі даних Axiom)  
*    [ NOAA IOOS GCOOS Атмосферні та океанографічні дані: Система спостереження](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Атмосферні та океанографічні дані: історичні колекції](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Біологічна та соціально-економіка](https://gcoos4.tamu.edu/erddap/index.html)   (Система спостереження за за затокою) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Північно-східна регіональна асоціація берегових і океанських систем спостереження)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Національний Глідер Центр збору даних)  
*    NOAA IOOS НАНООС (Північно-західна асоціація мережевих систем спостереження) 
*    [ NOAA IOOS Пакіос](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Океанські острови Система спостереження за океаном) в Гаваї (УГ)  
*    NOAA IOOS SCCOOS (Південна Каліфорнія берегова система спостереження за океаном) 
*    [ NOAA IOOS СЕКТОРА](https://erddap.secoora.org/erddap/index.html)   (Південно-Східний прибережний океан Обстеження регіональної асоціації)  
*    [ NOAA НЦЕІ](https://www.ncei.noaa.gov/erddap/index.html)   (Національний центр екологічної інформації)    
*    NOAA NGDC STP (Національний геофізичний Науково-дослідний центр, Сонячна фізика) 
*    NOAA   NMFS НАВЧАННЯ (Науковий центр Північного Сходу) 
*    [ NOAA НІС CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Центр операційних океанографічних продуктів та послуг)  
*    [ NOAA ОСМС](http://osmc.noaa.gov/erddap/index.html)   (Центр моніторингу системи)  
*    [ NOAA ПІФС](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Тихоокеанські острови Рибальський науковий центр)  
*    [ NOAA ПАРТНЕР](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA Приват24](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA УАФ](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Уніфікована база доступу)  
*    [Океанські мережі Канада](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Мережа відстеження океану](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Всі дані](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Ініціатива з спостереження за океаном)   
OOI / Нездатні дані
* Принцтон, група досліджень гідрометеорологічних досліджень
* R.Tech Engineering, Франція
*    [Rutgers University, Департамент морських і прибережних наук](https://tds.marine.rutgers.edu/erddap/index.html)   
* Сан-Франциско Estuary Інститут
*    [Інститут океанографії, Обприскування підводних каменів](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Смарт Атлантік](https://www.smartatlantic.ca/erddap/index.html) Меморіальний університет Ньюфундланд
* Південна Африка Екологічна Мережа
* Шпигунські технології
* Станфордський університет, Морська станція Хопкінса
*    [Еразмус Мундус](https://erddap.oa.iode.org/erddap/index.html)   (Міжнародний океанографічний та інформаційний Обмін даними)  
*    [Університет Британської Колумбії, Земля, океан & Атмосферний Науковий відділ](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Університет Каліфорнія в Девісі, Bodega Морська лабораторія](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Університет Delaware, Супутникове агентство](https://basin.ceoe.udel.edu/erddap/index.html)  
* Університет Вашингтона, Лабораторія прикладної фізики
*    [УГС CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Морська та Морська геологія)  
*    [ФОТО](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Голос океану, Швеція)  

Це список лише деяких організацій, де ERDDAP™ Встановлюється окрема або окрема група. Це не означає, що індивід, група, або організація рекомендує або предки ERDDAP й

###  ERDDAP™ Рекомендовано в межах NOAA й CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA 's Data Access процедурний напрям](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) В наявності ERDDAP™ у своєму списку рекомендованих серверів даних для використання груп в межах NOAA й ERDDAP™ вигідно зазначено в розділі 4.2.3 з
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Управління даними досліджень Найкращі практики керівництво) до (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) Центр Національний де ла Речерче (СНР) у Франції.

## Шоу слайдів{#slide-shows} 

Ось деякі слайди PowerPoint і документи, які створили Боб Симона ERDDAP й

 **ЗНИЖКА: зміст і думки, виражені в цих документах, є особистими думками Боба Сімона і не обов'язково відображають будь-яку позицію Уряду або уряду National Oceanic and Atmospheric Administration й** 

Основні документи:

*    [Головна ERDDAP™   (версія 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) й
Ви також можете [дивитися це відео Боб дає цю розмову![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) й
*    [Опис однієї сторінки ERDDAP™   (.pdf .pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : важкі навантаження, сітки, кластери, федерації та хмарні обчислення](/docs/server-admin/scaling) 
*    [Рекомендації Боба для систем розподілу даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Інші презентації:

*    [2020 EDM: Нові можливості в ERDDAP™ в2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 DMIT: Інгредієнти даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Оригінал [дивитися це відео Боб дає цю розмову](https://www.youtube.com/watch?v=9ArYxgwON2k) й) 
*    [2019 IOOS DMAC: Нові можливості в ERDDAP™ в2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 рік Літній ESIP: Підставка в ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 рік Літній ESIP: підтримка JSON ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: розподілена система веб-сайтів (Швидше закрутка, вуаєрист, Менше)   (Або, чому я був щасливий 4 роки тому.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ 2018 рік](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Нові можливості в ERDDAP™ для зображень, аудіо та відео даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF і ERDDAP™ Рішення для інтеграції даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Швидкий вступ до ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM і 2017 IOOS: новий або трохи відомий ERDDAP™ Особливості (Користувачі) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM і 2017 IOOS: новий або трохи відомий ERDDAP™ Особливості (Адміністраторам) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB і ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 рік ЕДМ: Як отримати дані з джерела до кінцевого користувача? Стара школа versus Нова школа](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 рік Літо ESIP: Велика картина: PARR, OPeNDAP й ERDDAP™ Розподіл даних та даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Один і Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 рік Gov API: Next Generation Сервери даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 рік Літній ESIP: Інфраструктура](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Боб і не для табличних даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Ідеальний інтерфейс користувача](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 рік Літній ESIP: табличні дані](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Не лікуйте In-Situ і завантажуйте дані як Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Зробити більше з Менше](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Методичні рекомендації для систем розподілу даних](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Презентації інших людей:

*    [Інструмент для покращення глобального обміну даними![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
Kevin O'Brien на глобальній системі спостереження за океаном (ЗАМОВИТИ) Вебінар / Координаційна група (СОГ) Серія / 1, листопад 12, 2020.
*    [Створення власної програми погоди NOAA Open Data and Jupyter Блокноти![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
Філіпе Фернандес і Rich Signell на SciPy 2018, 13 липня 2018 р.
*    [Використання OOI ERDDAP ![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
від Rich Signell, Лютий 2018.
*    [ОПИС Технологічна думка: " ERDDAP Легкі розмови![Веб-сайт](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Про цікаві речі люди роблять ERDDAP by Jenn Sevadjian, Джим Потемра, Conor Delaney, Kevin O'Brien, Джон Керфут, Стефані Петілло, Чарльз Карлентон і Іллі Мисливець презентували як ESIP Tech Dive 31 серпня 2017 року.
*    [Використання ERDDAP™ для доступу табличних даних![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
від Rich Signell, Серпень 2015
*    [Тестування ERDDAP™ для Синій вуглецевих даних![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
від Rich Signell, Серпень 2015
*    [Використання даних ERDDAP™ в NOAA Р GNOME Програмне забезпечення![Веб-сайт](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) й
У цьому відео Rich Signell завантажує дані про прогнози океана з ERDDAP™ для моделювання токсичного пропілля в океані за допомогою [ NOAA Р GNOME Програмне забезпечення](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (5 хвилин&#33;) й (Одна крихітна помилка в відео: при пошуку даних, не використовуйте і між умовами пошуку. Це наслідок.) By Rich Signell, 8 квітня 2011 р.
