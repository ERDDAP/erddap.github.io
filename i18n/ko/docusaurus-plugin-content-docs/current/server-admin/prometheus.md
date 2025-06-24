---
sidebar_position: 9
---
# 팟캐스트

[Prometheus 미터](https://prometheus.io/)/erddap/metrics에서 사용할 수 있습니다. JVM 핵심 미터는 2.25에 많은 추가되었습니다ERDDAP™버전 2.26에 추가된 미터. 메트릭을 사용하려면 최소 버전 2.26에 있는지 확인하십시오. 그들은 기본적으로 활성화, 당신은 추가하여 비활성화 할 수 있습니다
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
설정에.xml.

이 미터는 읽을 수 있는 기계이기 위하여 디자인됩니다. metrics 페이지를 수동으로 확인할 수 있지만, 깊이 모니터링을 위해 Prometheus 서버를 사용하는 것이 좋습니다. Prometheus 서버는 깊이 감시에서 더 많은 것을 가능하게 하는 역사적인 미터를 저장할 것입니다 (과거의 값과 변화) , 또한 종종 Grafana 서버로 실행됩니다. 우리는 관리자가 서버 모니터링을 시작하기 위해 유용 할 수있는 몇 가지 사전 내장 된 대시보드를 제공합니다.

## Prometheus 서버 실행

모니터링 스택을 실행하는 가장 좋은 문서 (프로메테우스 + Grafana) 에 Prometheus[뚱 베어](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md)·

## ERDDAP™미터

### 사이트맵

ERDDAP™유용한 정보를 찾을 수 있는 미터 수를 수출 (시작하다ERDDAP™2.25의) · JVM의 건강에 대한 일반적인 모니터링은 Prometheus 클라이언트가 수집 한 미터를 사용합니다. 쓰레기 수집, 메모리 사용, 스레드 등에 대한 데이터가 포함되어 있습니다. 더 많은 정보를 보려면[팟캐스트Java클라이언트 JVM 문서](https://prometheus.github.io/client_java/instrumentation/jvm/)·

### ERDDAP™이름 *

우리는 또한 수를 수출합니다ERDDAP™특정한 미터 (시작하다ERDDAP™2.26의) · 코드를 디그를 원한다면, 수집 된 미터를 찾을 수 있습니다.[파일 형식](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java)·

#### ERDDAP_build_info에

이것은 빌드 정보입니다.ERDDAP™서버. 버전 포함 (메인메뉴) , version_전체 (주요.minor.patch) , 및 배포_info (서버가 'Docker와 같이 배포되는 방법을 나타내는 데 사용됩니다. 이름 *) ·

#### 기능_flags

이것은 기능 플래그의 현재 상태를 보여주는 정보 미터입니다. 대부분의 boolean 구성 옵션은 기능 플래그로 간주됩니다.

#### 뚱 베어 이름 *

도표 가속이 가능한지 나타내는 정보 미터입니다.

#### http_request_duration_seconds_duration_seconds에 대한 자세한 정보

이것은 몇 초에 요청 응답 기간의 histogram입니다. 레이블은 request_type입니다. (예를 들면 griddap,tabledap, 파일, wms) 데이터셋_id (적용 가능한 경우, 그렇지 않으면 요청 유형의 반복) 파일 형식 (요청에 대한 출력 형식 e.g. '.html', '.csv', '.iso19115 이름 *) 파일 형식 (요청 언어, 또는 기본 문자열 경우 빈 문자열) , status_code (http요청의 상태 코드 e.g. 200, 302, 404) ·

서버의 인기 데이터 세트를 결정하기 위해 dataset id에 의해 요청을 추적하는 데 사용할 수 있습니다. 서버에서 느려지는 요청의 특정 종류가 있는지 확인할 수 있습니다.

#### 터치_thread_duration_seconds

접촉 실 작업 내구의 histogram. 그들은 성공으로 레테르를 붙입니다 (진정한/false) ·

#### 작업_thread_duration_seconds

작업 스레드 기간의 histogram. 그들은 성공으로 레테르를 붙입니다 (진정한/false) 그리고 task_type (뚱 베어) ·

#### 로드_datasets_duration_seconds

로드 dataset 작업에 대한 지속 시간의 histogram. 그들은 메이저로 레테르를 붙입니다 (진정한/false) ·

#### 이메일_thread_duration_seconds

이메일 스레드 작업 기간의 histogram. 그들은 성공으로 레테르를 붙입니다 (진정한/false) ·

#### 이메일_count_distribution

작업 당 이메일의 histogram.

#### 데이터셋_count

datasets의 계기는, 각 짐 datasets 호출 후에 놓습니다. 이것은 범주로 레테르를 붙입니다 (격자, 테이블) ·

#### dataset_failed_load_count에 대해

로드에 실패한 datasets의 계기는, 각 짐 datasets 호출 후에 놓습니다.

#### shed_requests_총

헛된 요청의 반대. 서버는 서버가 메모리에 낮을 것이라고 믿을 때 요청을 shed (사이트맵) 그리고 요청은 문제를 일으킬 것입니다. 요청 처리 중에 낮은 RAM 또는 디스크 공간으로 인해 오류가 발생하지 않습니다.

#### 위험_memory_emails_total

서버의 카운터는 메모리가 위험하게 낮다는 관리자에게 이메일을 보내려고 시도합니다.

#### 위험한_memory_failures_total

메모리에서 실행되는 기계 때문에 실패한 요청의 반대. 종종 시간은 기계가 많은 비싼 요청 또는 개별 요청을 수신하기 때문에 예외적으로 큰이었다.

#### topo_request_총

topo 데이터 요청 카운터. 이것은 레테르를 붙이는 캐시입니다 (캐시/not_cached) ·

#### Boundary 카운터

경계에 대한 요청에 대한 카운터 컬렉션도 있습니다.

 - 국가_boundaries_request_total
 - state_boundaries_request_총
 - 강_boundaries_request_total
 - gshhs_request_총

이들은 상태에 레테르를 붙입니다 (coarse, 성공, tosed) ·
