---
sidebar_position: 9
---
# Prometheus

[Prometheus metrics](https://prometheus.io/) are available at /erddap/metrics. JVM core metrics were added in 2.25 with many ERDDAP™ metrics added in version 2.26. If you want to use the metrics make sure you are in at least version 2.26. They default to enabled, you can disable them by adding
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
to your setup.xml.

These metrics are designed to be machine readable. While you can check the metrics page manually, for in depth monitoring it is recommended to use a Prometheus server. A Prometheus server will store historical metrics which enable more in depth monitoring (like rates and changes from past values), and also is often run with a Grafana server. We provide some prebuilt dashboards that admins may find useful for getting started monitoring their servers.

## Running Prometheus server

The best documentation for running the monitoring stack (Prometheus + Grafana) is in the Prometheus [readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™ metrics

### JVM

ERDDAP™ exports a number of metrics that you may find useful (starting in ERDDAP™ 2.25). For general monitoring of the health of the JVM we use the metrics collected by the Prometheus client. This includes data about garbage collection, memory usage, threads, and more. For more information see the [Prometheus Java Client JVM documentation](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™ specific

We also export a number of ERDDAP™ specific metrics (starting in ERDDAP™ 2.26). If you want to dig into the code, you can find the metrics collected in [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_build_info

This is the build info for the ERDDAP™ server. It includes version (major.minor), version_full (major.minor.patch), and deployment_info (used to indicate how the server is deployed, like 'Docker').

#### feature_flags

This is an info metric that shows the current state of feature flags. Most boolean configuration options are considered feature flags.

#### bufferedImage

This is an info metric that indicates whether graphics acceleration is available.

#### http_request_duration_seconds

This is a histogram of request response durations in seconds. The labels are request_type (for example griddap, tabledap, files, wms), dataset_id (if applicable, otherwise repeats the request type), file_type (output format for request e.g. '.html', '.csv', '.iso19115'), lang_code (language for the request, or empty string if default), status_code (http status code of the request e.g. 200, 302, 404).

This can be used to track requests by dataset id to determine the server's popular datasets. It can also help identify if there are particular kinds of requests that are slow on your server.

#### touch_thread_duration_seconds

A histogram of touch thread task durations. They are labelled with success (true/false).

#### task_thread_duration_seconds

A histogram of task thread durations. They are labelled with success (true/false) and task_type (intetger).

#### load_datasets_duration_seconds

A histogram of duration for load dataset tasks. They are labelled with major (true/false).

#### email_thread_duration_seconds

A histogram of email thread task durations. They are labelled with success (true/false).

#### email_count_distribution

A histogram of emails per task.

#### dataset_count

A gauge of the datasets, set after each load datasets call. This is labelled with category (grid, table).

#### dataset_failed_load_count

A gauge of the datasets that failed to load, set after each load datasets call.

#### shed_requests_total

Counter of requests that were shed. The server will shed a request when it believes the server is low on memory (RAM) and the request would cause problems. This does not include requests that error due to low RAM or disk space during the handling of the request.

#### dangerous_memory_emails_total

Counter of times the server attempts to send an email to the admin that memory is dangerously low.

#### dangerous_memory_failures_total

Counter of requests that failed due to the machine running out of memory. Often times this is because the machine is receiving a lot of expensive requests or the individual request was exceptionally large.

#### topo_request_total

Counter of requests for topo data. This is labelled cache (cached/not_cached).

#### Boundary Counters

There's also a collection of counters for requests for boundaries:

 - national_boundaries_request_total
 - state_boundaries_request_total
 - river_boundaries_request_total
 - gshhs_request_total

These are labelled with status (coarse, success, tossed).
