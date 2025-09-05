---
title: "ERDDAP™ Documentation"
---
## последний ERDDAP™ версия{#latest-erddap-version} 

2.28.1, см. [Изменения в документации](/changes#version-2281) и [скачать](https://github.com/ERDDAP/erddap/releases/tag/v2.28.1) .

##  ERDDAP™ информация{#erddap-information} 

 ERDDAP™ Это научный сервер данных, который дает пользователям простой и последовательный способ загрузки подмножеств данных.
сетчатые и табличные научные наборы данных в общих форматах файлов и составляют графики и карты.
 ERDDAP™ является свободным и открытым исходным кодом (Apache и Apache-подобные)   Java Сервлет из NOAA   NMFS   SWFSC Отдел экологических исследований ( ERD ) .

* Чтобы увидеть/использовать ERDDAP™ установка: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Чтобы начать с установки читать [Руководство по установке развертывания](/docs/server-admin/deploy-install) .
* Чтобы внести код см. [путеводитель программиста](/docs/contributing/programmer-guide) .


Ниже вы найдете соответствующие ссылки для вопросов и как внести свой вклад.
* Просмотреть беседы и задать вопросы на [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) или в [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* Рассмотрение и представление вопросов на [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* Чтобы предложить запросы на функции, следуйте этому руководству: [ ERDDAP Дискуссии #93 (комментарий) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Поиск многократный ERDDAP™ s
Есть два способа поиска нескольких ERDDAP™ s для наборов данных: [Поиск многократный ERDDAP™ s](/SearchMultipleERDDAPs.html) и [ ERDDAP™ Обнаружение набора данных](http://erddap.com/) .


## Создайте свой собственный ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ является [Свободный и открытый исходный код](https://en.wikipedia.org/wiki/Free_and_open-source_software) Все- Java   (сервлет) , веб-приложение, которое работает на сервере веб-приложений (Например, Tomcat (рекомендованный) Или Джетти (Это работает, но мы не поддерживаем это.) ) . Эта страница в основном для людей (" ERDDAP™ администраторов".) кто хочет создать свой собственный ERDDAP™ Установка на собственном сайте.

Чтобы начать с установки читать [Руководство по установке развертывания](/docs/server-admin/deploy-install) .

### Зачем использовать ERDDAP™ Распространять свои данные?{#why-use-erddap-to-distribute-your-data} 

Потому что небольшие усилия по созданию ERDDAP™ приносит много преимуществ.

* Если у вас уже есть веб-сервис для распространения ваших данных,
Вы можете настроить ERDDAP™ получить доступ к вашим данным через существующий сервис.
Или вы можете установить ERDDAP™ Доступ к вашим данным напрямую из локальных файлов.
* Для каждого набора данных вам нужно только написать небольшой фрагмент XML, чтобы сказать: ERDDAP™ Как получить доступ к набору данных.
* Когда у тебя есть ERDDAP™ Обслуживая ваши данные, конечные пользователи могут:
    * Запрашивать данные различными способами ( DAP , WMS и больше в будущем) .
    * Получите ответ данных в различных форматах файлов. (Это, наверное, самая большая причина&#33;) 
    * Делайте графики и карты. (Все любят красивые картинки.) 
    * Постройте другие полезные и интересные вещи поверх ERDDAP Веб-сервисы - смотрите [ Awesome ERDDAP ТМ](https://github.com/IrishMarineInstitute/awesome-erddap) Список удивительных ERDDAP - связанные проекты.

Ты можешь [настраивать](/docs/server-admin/deploy-install#customize) твой ERDDAP Внешность такая ERDDAP™ отражает вашу организацию и соответствует остальной части вашего сайта.

## Является ли процедура установки сложной? Могу я это сделать?{#is-the-installation-procedure-hard-can-i-do-it} 

Первоначальная установка занимает некоторое время, но это не очень сложно. Ты сможешь. Если вы застряли, напишите мне на erd dot data at noaa dot gov . Я помогу тебе.
Вы можете присоединиться к [ ERDDAP™ Google Group / Список рассылки](https://groups.google.com/g/erddap) Оставьте свой вопрос там.

## кто использует ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ Его установили около 100 организаций по меньшей мере в 17 странах.

 (Австралия, Бельгия, Канада, Китай, Франция, Индия, Ирландия, Италия, Новая Зеландия, Россия, ЮАР, Испания, Шри-Ланка, Швеция, Таиланд, Великобритания, США) В том числе:

*    [ПДРК](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Азиатско-Тихоокеанский центр исследований данных, Международный Тихоокеанский исследовательский центр) в Гавайском университете (Ах)  
*    [BCO-DMO в WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Биологическая и химическая океанография Управление данными в Woods Hole Oceanographic институт)  
*    [Победитель ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Канадская информационная сеть водоразделов) Центр науки о наблюдении Земли (генеральный директор) Университет Манитобы
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Прибрежная информационная программа UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (Национальный исследовательский совет Италии, Институт полярных наук)  
* CSIRO и IMOS (Австралийская организация научных и промышленных исследований Содружества и интегрированная морская система наблюдения) 
*    [водитель ( NOAA ОРР) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Управление реагирования и восстановления)  
*    [Физика EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)   (Европейская сеть морских наблюдений и данных — физика)  
*    [ГОМРИ](https://erddap.griidc.org/erddap/index.html)   (Исследовательская инициатива Мексиканского залива)  
*    [Институт Хакаи](https://catalogue.hakai.org/erddap/index.html)   (Институт Хакаи на центральном побережье Британской Колумбии, Канада) 
*    [High School Technology Services](https://myhsts.org) , который предлагает обучение кодированию и технологиям для студентов и взрослых
*    [ИЧЕК](https://erddap.ichec.ie/erddap/index.html)   (Ирландский центр высокопроизводительных вычислений) 
*    [Я NCO Я](https://erddap.incois.gov.in/erddap/index.html)   (Индийский национальный центр океанических информационных услуг)  
* ИРД (Институт развития, Франция)   
CNRS (Национальный центр научных исследований, Франция)   
UPMC (Университет Пьера и Марии Курье, Париж, Франция)   
КАД (Шейх Анта Диоп де Дакар, Сенегал)   
КГБ (Университет Гастона Бергера - Сент-Луис дю Сенегал)   
УФХБ (Университет Феликса ХУФУЭТ-БОЙГНИ, Абиджан, Кот-д'Ивуар)   
ИПСЛ (Институт Пьера Симона Лапласа наук окружающей среды, Париж, Франция)   
LMI ECLAIRS (Лаборатория Mixte International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques» (недоступная ссылка — история).) 
* СРК (Европейская комиссия - Объединенный исследовательский центр, Европейский Союз) 
*    [Морской институт](https://erddap.marine.ie/erddap/index.html)   (Ирландия)  
* Компания Marine Instruments S.A. (Испания) 
* NCI (Национальная вычислительная инфраструктура Австралии) 
*    [ NOAA Береговая охрана](https://coastwatch.noaa.gov/erddap/index.html)   (центральный)  
*    [ NOAA Береговая охрана CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Узел Карибы / Мексиканский залив)  
*    [ NOAA Береговая охрана GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Узел Великих озер)  
*    [ NOAA Береговая охрана West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) который находится вместе и работает с
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Отдел экологических исследований SWFSC из NMFS ) 
*    [ NOAA Датчики IOOS](https://erddap.sensors.ioos.us/erddap/index.html)   (Интегрированная система наблюдения за океаном)  
*    [ NOAA IOOS Ce NCO ОСО](https://erddap.axiomdatascience.com/erddap/index.html)   (Система наблюдения за океаном Центральной и Северной Калифорнии, разработанная Axiom Data Science)  
*    [ NOAA Атмосферные и океанографические данные IOOS GCOOS: система наблюдений](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA Атмосферные и океанографические данные IOOS GCOOS: исторические коллекции](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Биология и социально-экономика](https://gcoos4.tamu.edu/erddap/index.html)   (Система наблюдения за океаном Мексиканского залива) 
*    [ NOAA Иос Неракус](http://www.neracoos.org/erddap/index.html)   (Северо-восточная региональная ассоциация прибрежных и океанических наблюдательных систем)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Национальный планер Центр сбора данных)  
*    NOAA ИОС НАНООС (Северо-западная ассоциация сетевых систем наблюдения за океаном) 
*    [ NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Тихоокеанские острова Система наблюдения за океаном) в Гавайском университете (Ах)  
*    NOAA ИОС СККУС (Система наблюдения за прибрежным океаном Южной Калифорнии) 
*    [ NOAA Иосекура](https://erddap.secoora.org/erddap/index.html)   (Региональная ассоциация по наблюдению за юго-восточным побережьем океана)  
*    [ NOAA НЦЭИ](https://www.ncei.noaa.gov/erddap/index.html)   (Национальные центры экологической информации)    
*    NOAA NGDC STP (Национальный геофизический Центр обработки данных, солнечная — наземная физика) 
*    NOAA   NMFS НЕФСК (Северо-восточный научный центр рыболовства) 
*    [ NOAA NOS COOPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Центр операционных океанографических продуктов и услуг)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Наблюдательный центр системного мониторинга)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Научно-исследовательский центр тихоокеанских островов)  
*    [ NOAA ПМЭЛ](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA ВСУ](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Единая система доступа)  
*    [Океанские сети Канады](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Сеть отслеживания океана](https://members.oceantrack.org/erddap/index.html)  
*    [Все данные / All Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Инициатива океанских обсерваторий)   
OOI / Некабельные данные
* Принстон, Исследовательская группа по гидрометеорологии
* R.Tech Engineering, Франция
*    [Rutgers University, Департамент морских и прибрежных наук](https://tds.marine.rutgers.edu/erddap/index.html)   
* Институт устья Сан-Франциско
*    [Институт океанографии Скриппса, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Умная Атлантика](https://www.smartatlantic.ca/erddap/index.html) Мемориальный университет Ньюфаундленда
* Южноафриканская сеть экологических наблюдений
* Технологии Spyglass
* Стэнфордский университет, морская станция Хопкинса
*    [ИДЕ ЮНЕСКО](https://erddap.oa.iode.org/erddap/index.html)   (Международная океанографическая и информационная Обмен данными)  
*    [Университет Британской Колумбии, Земля, океан и атмосфера Отдел наук](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Калифорнийский университет в Дэвисе, Морская лаборатория Бодега](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Университет штата Делавэр, станция приема спутников](https://basin.ceoe.udel.edu/erddap/index.html)  
* Вашингтонский университет, Лаборатория прикладной физики
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Прибрежная и морская геологическая программа)  
*    [ВОТО](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Голос океана, Швеция)  

Это список лишь некоторых организаций, где ERDDAP™ Он был установлен отдельным человеком или группой. Это не означает, что человек, группа или организация рекомендует или одобряет ERDDAP .

###  ERDDAP™ Рекомендуется в пределах NOAA и CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Процедурная директива о доступе к данным](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) включает ERDDAP™ в своем списке рекомендуемых серверов данных для использования группами внутри NOAA . ERDDAP™ Упоминается в разделе 4.2.3
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Управление данными исследований Руководство по лучшим практикам) ] (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) Национальный научно-исследовательский центр de la Recherche (CNRS) во Франции.

## Слайд-шоу{#slide-shows} 

Вот некоторые слайд-шоу и документы PowerPoint, созданные Бобом Саймонсом. ERDDAP .

 **Содержание и мнения, выраженные в этих документах, являются личными мнениями Боба Саймонса и не обязательно отражают какую-либо позицию правительства или правительства. National Oceanic and Atmospheric Administration .** 

Четыре основных документа:

*    [Основное введение в ERDDAP™   (Версия 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Вы также можете [Посмотрите видео, где Боб говорит об этом.![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Описание одной страницы ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP Тяжелые нагрузки, сети, кластеры, федерации и облачные вычисления](/docs/server-admin/scaling) 
*    [Руководство Боба по системам распределения данных](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Другие презентации:

*    [2020 EDM: новые возможности ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 Источник: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Или [Посмотрите видео, где Боб говорит об этом.](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: новые возможности ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 год Летний ESIP: Subsetting In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 год Летний ESIP: поддержка JSON ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [EDM 2018: Распределенная система веб-сервисов (Быстрее, проще, дешевле)   (Почему я был счастлив 4 года назад) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ в 2018 году](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: новые возможности ERDDAP™ для изображений, аудио и видео данных](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF и EDM ERDDAP™ Решения для интеграции данных](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: краткое введение ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM и 2017 IOOS: новый или малоизвестный ERDDAP™ Особенности (для пользователей) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM и 2017 IOOS: новый или малоизвестный ERDDAP™ Особенности (для администраторов) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 год ЭДМ: Как данные передаются от источника к конечному пользователю? Старая школа против новой школы](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 год Оригинальное название: The Big Picture: PARR OPeNDAP , ERDDAP™ и распространение данных](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: One And Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 год Gov API: новое поколение Серверы данных](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 год Летний ESIP: табличная агрегация](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob's Do's и Don't for Tabular Data (США) (США)](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Идеальный пользовательский интерфейс](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 год Летний ESIP: табличные данные](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Не относитесь к in-Situ и табличным данным как к сетчатым данным](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 — «Делай больше с меньшим»](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Руководство по системам распределения данных](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Презентации других людей:

*    [Инструмент FAIR для улучшения глобального обмена данными![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
Кевин О'Брайен из Глобальной системы наблюдений за океаном (ГУС) Вебинар / Координационная группа наблюдения (ОКГ) Серия / 1 12 ноября 2020 года.
*    [Создайте собственное приложение погоды NOAA Открытые данные и ноутбуки Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
Филипе Фернандес и Рич Сигнелл на SciPy 2018, 13 июля 2018 года.
*    [Использование OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
Рич Сигнелл, февраль 2018 года.
*    [ЭСИП Технический дайв: ERDDAP Молния говорит"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Восемь 5-минутных разговоров о том, что люди делают ERDDAP Дженн Севаджян, Джим Потемра, Конор Делани, Кевин О'Брайен, Джон Керфут, Стефани Петилло, Чарльз Карлтон и Эли Хантер представили в качестве ESIP Tech Dive 31 августа 2017 года.
*    [использовать ERDDAP™ Доступ к табличным данным![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
Рич Синьелл, август 2015.
*    [Тестирование с использованием ERDDAP™ Данные по голубому углероду![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
Рич Синьелл, август 2015.
*    [Использование данных из ERDDAP™ в NOAA ? GNOME Программное обеспечение![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
В этом видео Рич Сигнелл скачивает данные прогноза океанских течений ERDDAP™ Моделирование токсичного разлива в океане с использованием [ NOAA ? GNOME программное обеспечение](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (Через 5 минут&#33;) . (Одна крошечная ошибка в видео: при поиске наборов данных не используйте И между поисковыми терминами. Это неявно.) Рич Синьелл, 8 апреля 2011 года.
