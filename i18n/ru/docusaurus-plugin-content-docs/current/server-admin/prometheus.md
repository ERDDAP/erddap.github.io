---
sidebar_position: 9
---
# Прометей

[Метрики Прометея](https://prometheus.io/)Доступно по адресу /erddap/metrics. Основные метрики JVM были добавлены в 2.25 со многими другими показателями.ERDDAP™Метрики добавлены в версии 2.26. Если вы хотите использовать метрики, убедитесь, что вы находитесь в версии 2.26. Они по умолчанию включены, вы можете отключить их, добавив
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
Настройка.xml.

Эти метрики предназначены для машинного чтения. Хотя вы можете проверить страницу метрики вручную, для глубокого мониторинга рекомендуется использовать сервер Prometheus. Сервер Prometheus будет хранить исторические метрики, которые позволяют более глубокое наблюдение. (цены и изменения прошлых значений) Также часто используется сервер Grafana. Мы предоставляем некоторые готовые панели инструментов, которые администраторы могут найти полезными для начала мониторинга своих серверов.

## Запуск сервера Prometheus

Лучшая документация для запуска стека мониторинга (Прометей + Графана) находится в Прометее[читать](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™метрики

### СПМ

ERDDAP™экспортирует ряд метрик, которые вы можете найти полезными (начиная сERDDAP™2.25) . Для общего мониторинга состояния здоровья JVM мы используем метрики, собранные клиентом Prometheus. Это включает в себя данные о сборе мусора, использовании памяти, потоках и многом другом. Для получения дополнительной информации см.[ПрометейJavaКлиентская документация JVM](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™специфический

Мы также экспортируем рядERDDAP™конкретные метрики (начиная сERDDAP™2.26) . Если вы хотите углубиться в код, вы можете найти метрики, собранные в[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_build_info

Это информация о сборке дляERDDAP™Сервер. Включает версию (Major.minor) Версия_полная (major.minor.patch) Разработчик: deployment_info (используется для указания того, как развернут сервер, например, Docker ") .

#### Функция_флаги

Это информационная метрика, которая показывает текущее состояние флагов функций. Большинство опций конфигурации boolean считаются флагами функций.

#### буферизованный Изображение

Это информационная метрика, которая указывает, доступно ли ускорение графики.

#### http_request_duration_seconds

Это гистограмма длительности ответа на запрос в секундах. Ярлыки: request_type (Например, гриддап,tabledapФайлы, wms) Dataset_id (если применимо, в противном случае повторяет тип запроса) File_type (выходной формат для запроса Например, '.html', '.csv', '.iso19115 ") Lang_code (язык для запроса или пустая строка по умолчанию) Status_code (httpкод состояния запроса например 200, 302, 404) .

Это может использоваться для отслеживания запросов по идентификатору набора данных для определения популярных наборов данных сервера. Это также может помочь определить, есть ли определенные типы запросов, которые замедляются на вашем сервере.

#### touch_thread_duration_seconds

Гистограмма длительности задач сенсорной нити. Они отмечены успехом (истинный/ложный) .

#### task_thread_duration_seconds

Гистограмма длительности потока задач. Они отмечены успехом (истинный/ложный) Задание_тип (целое число) .

#### load_datasets_duration_seconds

Гистограмма продолжительности для задач набора данных нагрузки. Они обозначены крупными (истинный/ложный) .

#### Электронная почта_thread_duration_seconds

Гистограмма длительности задач потока электронной почты. Они отмечены успехом (истинный/ложный) .

#### Электронная почта_count_distribution

Гистограмма электронных писем на задание.

#### Dataset_count

Датчик наборов данных, установленный после каждого вызова наборов данных нагрузки. Это обозначено категорией (сетка, стол) .

#### dataset_failed_load_count

Датчик наборов данных, которые не были загружены, устанавливается после каждого вызова наборов данных нагрузки.

#### Shed_requests_total

Противодействие пропущенным просьбам. Сервер отбрасывает запрос, когда считает, что у сервера мало памяти. (RAM) И запрос вызовет проблемы. Это не включает в себя запросы с ошибкой из-за низкой оперативной памяти или дискового пространства во время обработки запроса.

#### Опасный_memory_emails_total

Счетчик раз, когда сервер пытается отправить электронное письмо администратору, что память опасно низкая.

#### Опасный_memory_failures_total

Противодействие запросам, которые вышли из строя из-за того, что у машины закончилась память. Часто это связано с тем, что машина получает много дорогостоящих запросов или индивидуальный запрос был исключительно большим.

#### Исполнитель: Popo_Request_Total

Противодействие запросам на топоданные. Это маркированный кэш (Cashed/Not_Cashed) .

#### Граничные счетчики

Существует также набор счетчиков для запросов на границы:

 - National_boundaries_total
 - state_boundaries_total
 - River_boundaries_total
 - gshhs_request_total

Они обозначены статусом (Грубый, успешный, брошенный) .
