---
title: "ERDDAP™ - Changes"
---
# ERDDAP™기타

ERDDAP™좋은 예입니다.[사용자 중심의 혁신](https://en.wikipedia.org/wiki/User_innovation), 제품 혁신은 수시로 소비자에게서 옵니다 (ERDDAP™이름 *) , 뿐만 아니라 생산자 (ERDDAP™주요 특징) · 몇 년 동안, 새로운 기능 및 변경에 대한 아이디어의 대부분은ERDDAP™사용자에서 온다. 이러한 사용자는 훌륭한 아이디어에 대해 아래에 적립됩니다. 감사합니다&#33; 좋은 제안을 계속하십시오&#33;

각각의 변화는 다음과 같습니다.ERDDAP™다운로드

## 버전 2.26{#version-226} 
 (릴리스 2025-03-31) 

*    **모든 것:** 
    * 우리의 문서 사이트에 큰 업데이트: https://erddap.github.io/
 
업데이트 된 외관이 개선 된 항법, 검색, 번역, 그리고 그것은 쉽게 앞으로 유지해야합니다&#33;

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 구독 및RSS업데이트는 파일 변경에서 자주 업데이트되는 datasets에 더 의존해야 합니다.

*    **기타ERDDAP™관리자는 알아야 할:** 
    * 기본값은/supports를 요구합니다Java버전 21. 이 릴리스에서 다시 쉽게 만들 수 있습니다Java17 호환 바이너리.

    * UI의 datasets에 대해 표시된 정보를 사용자 정의하는 새로운 기능. Dataset 인용과 같은 것들을 추가하는 것이 특히 유용합니다. 더 자세한 내용은 읽을 수 있습니다[새 문서](/docs/server-admin/display-info)· 기여에 대한 Ayush Singh 덕분에&#33;

    * 추가 Prometheus 미터. 가장 큰 것은 `http_request_duration_seconds`: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
이 기계 읽기 쉬운 체재는 사용자가 서버를 사용하는 방법을 이해하기 위하여 미터의 더 나은 수집을 가능하게 할 것입니다.

    * ISO19115 XML 파일을 생성하는 새로운 방법. 그것은 Apache SIS를 사용하고이 릴리스의 새로운 옵션입니다. 이를 활성화하고 피드백을 보낼 수 있습니다.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI는 이제 각 url에 대한 개별 링크를 만듭니다.infoUrl그리고 요약.

    * 구독 및RSS업데이트는 파일 변경에서 자주 업데이트되는 datasets에 더 의존해야 합니다. 이 문제가 발생하면 GitHub에 도달하고 아래 플래그를 setup.xml에 추가하여 기능을 비활성화하십시오.
관련 상품
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset 변수는 더 이상 dataset type EDDTableFromNcCFFiles에 대해 자동으로 생성되지 않습니다. 행동에 의존하는 경우, 당신은 할 수 있습니다 (선호되는 해결책) 추가하기subsetVariablesdataset 정의에datasets.xml, 또는 아래 플래그를 setup.xml에 추가합니다. 이 턴이 필요하면 GitHub에 도달하여 사용 사례를 더 잘 지원할 수 있습니다.
관련 상품
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * 서버는 이제 문서 요청을 리디렉션합니다. (아래 다운로드/ 문서는 migrated) 새 문서 사이트에. 필요하다면 setup.xml의 플래그와 함께 비활성화 할 수 있습니다.
관련 상품
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * 몇몇 작은 변화 및 버그 수정.

*    **제품 정보ERDDAP™개발자:** 
    * 더 많은 코드 품질 개선 및 죽은 코드 정리. 이 포함 된 미성년자 최적화, 더 나은 복제 자원의 취급, 긴 사용 데이터 유형에서 멀리 마이그레이션 (벡터처럼) ·

    * config, 메시지 및 메트릭 코드의 대부분을 끌어 EDStatic에 큰 재구성. 그것은 또한 더 나은 초기화 및 디렉토리 경로의 취급을 캡슐화 (이 마지막 2는 더 많은 것을 수행해야합니다.) 

    * 공식적으로 지원된 Docker Image를 향해 진행 중입니다. 계획은 최종화 및 출시 후입니다.ERDDAP™2.26 릴리스가 가능합니다.

## 버전 2.25{#version-225} 
 (출시 2024-10-31) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * EDDTableFromFiles는 이제 파생된 산출을 가진 쿼리를 지원할 수 있습니다 (글로벌, jexl 스크립트, 또는 변수) ·
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 버전 2.25 필요Java21명 이상 이것은 LTS 버전이며 1 년 이상 사용할 수 있습니다.
         
    * SharedWatchService는 이제 기본값입니다. 그것을 비활성화해야하는 경우, chris에 문의하십시오. noaaa.gov의 존은 나를 알 수 있도록, 그래서 나는 미래의 버전에서 그것을 개선하고 추가 할 수 있습니다 :
        &lt;useSharedWatch서비스&gt;false&lt;/useSharedWatchService&gt; 을 설정한다.xml.
         
    * 더 보기ERDDAP™servlet은 이제 서버 시작을 시작합니다. datasets가 요청이 될 때까지 기다리지 않는 대신 즉시 로드를 시작합니다.
         
    * EDDTableFromMultidimNcFiles의 removeMVRows 매개 변수는 이제 효과가 있습니다. false로 설정하면 쿼리를 크게 가속화 할 수 있지만 모든 데이터 세트에 적합 할 수 없습니다. 더 많은 정보를 보려면[모수의 묘사](/docs/server-admin/datasets#removemvrows)·
         
    * 데이터셋 (EDDTableFromNcFiles 및EDDGrid파일 형식) zarr 파일을 사용할 수 있습니다. fileNameRegex 또는 pathRegex 중에는 "zarr"을 포함해야 합니다. 이름 *[datasets 문서에 zarr secion](/docs/server-admin/datasets#zarr)더 많은 정보.
         
    * 새로운 dataset 유형, EDDTableFromParquetFiles는 지금 지원됩니다. 이름 *[EDDTableFromParquetFiles는 데이터셋 문서의 secion입니다.](/docs/server-admin/datasets#eddtablefromparquetfiles)더 많은 정보.
         
    *   [Prometheus 미터](https://prometheus.io/)/erddap/metrics에서 사용할 수 있습니다.
         
    * 새로운 XML 파서 구현이 가능합니다. 이 새로운 파서는 XInclude를 사용하여 허용합니다.datasets.xml· 기능에 대한 Ayush Singh 덕분에.
         
    * 새로운 매개 변수datasets.xml특정한 활동 이메일을 통제하기 위하여. 특별한 활동 FailPercent는 25 %의 이전 값으로 기본값입니다. 기능에 대한 Ayush Singh 덕분에.
         
    * dataset 로딩 오류가 status.html 페이지에 표시됩니다. 그것은 기본적으로 true, 상태 페이지에 dataset 오류를 비활성화, set showLoadErrorsOnStatusPage false:&lt;showLoadErrorsOnStatusPage&gt;후드&lt;/showLoadErrorsOnStatusPage&gt;에 대하여
         
    * 몇몇 작은 변화 및 버그 수정.
         
*    **제품 정보ERDDAP™개발자:** 
    * 단위 및 통합에 분리된 테스트 (더 보기) 시험. 또한 더 많은 테스트 활성화 및 테스트가 덜 flaky되었습니다.
         
    * 오류 Prone (일부 체크 여전히 비활성화) Maven을 통해 통합된 Spot Bugs.
         
    * Google Style Guide와 일치하는 전체 코드베이스.
         

## 버전 2.24{#version-224} 
 (출시 2024-06-07) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 청각적인 자료 세트를 위한 새로운 색깔 팔레트 EK80. Rob Cermak에 감사합니다.
         
    * EDDTableAggregateRows가 모든 어린이에서 적절한 범위를 표시하지 않은 문제를 해결합니다. 수정 및 버그 보고서에 대한 Marco Alba 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 까지: 보안 변화: Google 인증은 CSP로 변경할 수 있습니다.
        
구체적으로, 당신은 또한 추가할 필요가 있을지도 모릅니다 https://accounts.google.com/gsi/style stlye-src에 https://accounts.google.com/gsi/ 연결 src. script-src의 경우 이제 사용할 수 있습니다. https://accounts.google.com/gsi/client.
 
        
더 많은 정보를 원하시면[Google 페이지](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP 구성에 대해.
         
        
    * 새로운 공유 시계 서비스. 이 업데이트에 대한 감독을 시청하기위한 새로운 옵션입니다. dataset 당 1개의 실 대신에 각 filesystem를 위한 1개의 실이 있습니다. 가장 가능성이 이것은 변화에 대한 시계에 사용되는 스레드의 수를 압축합니다. 그것은 모든 datasets는 그것의 자신의 갱신 빈도를 가지고 있는 각 dataset 대신에 새롭게 합니다. 가장 가능성이 가장 많은 데이터 세트에 대한 더 빈번한 업데이트를 의미한다.
        
이 추가 활성화&lt;useSharedWatch서비스&gt;true&lt;/useSharedWatchService&gt; 을 설정한다.xml.
        
          
이것을 시도하고 어떻게 당신을 위해 어떻게 작동했는지보고하십시오. john 에 noaaa.gov.
         
    * incorrect var 이름에 대한 수정. 수정을 위한 Ayush Singh 덕분에.
         
    * 몇몇 작은 변화 및 버그 수정.
         
*    **더 알아보기ERDDAP™개발자:** 
    * Docker를 이용한 현지 개발 지원 감사 Matt Hopson 과 Roje.
         
    * Jetty 및 문서 개선을 사용하여 현지 개발 지원. 감사 Micah Wengren.
         
    * 문제 크로스 플랫폼을 줄이기 위해 테스트 변경. 이름 * 샨 St. Savage.
         

## 버전 2.23{#version-223} 
 (출시 2023-02-27) 

이 릴리스가 Bob Simons에 의해 수행되었는지, 그는 Chris John, 그의 성공자로 전환하는 동안 여전히 주변과 활성을 보여주는. 이 릴리스와 함께, 모든 코드 변경은 Chis John에 의해 수행됩니다, 그렇지 않으면.

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    *    (이름 *)   
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 까지: 보안 변화: Google 인증은 이제 "Sign In with Google"의 일부 인 새로운 Google Identity Services 라이브러리를 통해 수행됩니다. 오래된 "Google Sign In"시스템에 대한 Google의 지원은 2023-03-31을 중단합니다. Google Authentication을 사용한다면ERDDAP™설치, 당신은 MUST 갱신에ERDDAP™v2.23+ 이전. (밥은 짧은 통지를 위해 미안합니다. 그것은 밥의 결함입니다.)   
         
    * IMPROVED: NCCSV는 지금 v1.2입니다. 변경은 파일이 이제 UTF-8 인코딩된 파일입니다. (그들은 ASCII이었다) 이제는 유니코드 문자가 포함될 수 있습니다. 인코딩 없이 \\u_hhhhhhh_로 인코딩할 수 있지만 여전히 허용됩니다.
NCCSV 파일을 작성할 때ERDDAP™이제 v1.2 파일을 작성합니다.
        ERDDAP™여전히 v1.0 및 v1.1 사양을 따르는 NCCSV 파일을 읽을 것입니다.
Pauline-Chauvet, n-a-t-e 및 thogar-computer 덕분에 다양한 스프레드 시트 프로그램을 보장하기 위해 테스트를하고 UTF-8 파일을 가져올 수 있습니다. 이 코드 변경에 대한 Bob Simons 덕분에.
         
    * NEW: status.html 웹 페이지에는 dataset loadDatasets가 현재 로딩 및 관련 통계를 나타내는 상단의 라인이 있거나 dataset이 로드되지 않은 경우 아무도 없습니다. 이것은 매우 도움이 될 수 있습니다ERDDAP™왜 로드를 파악하려고 하는 관리자 Datasets는 이렇게 오래 가지고 갑니다. 또한 nGridDatasets, nTableDatasets 및 nTotalDatasets는 그 밑에 지금 즉석 조사합니다 (이전에, 그들은 마지막 주요 부하의 끝으로 있었다 데이터셋) ·
이 변경은 로이 Mendelssohn입니다. 이 코드 변경에 대한 Bob Simons 덕분에.
         
    * IMPROVED: 생성 데이터셋 Xml는 CF-1.10로 변경됩니다. (이었다 CF-1.6) "Conventions" 속성에서.
이 코드 변경에 대한 Bob Simons 덕분에.
         
    * 몇몇 작은 변화 및 버그 수정.
         

## 버전 2.22{#version-222} 
 (출시 2022-12-08) 

이 릴리스는 Bob Simons에 의해 수행되었음을 주목합니다. 그는 여전히 그의 성공자로 전환하는 동안 활동하고 있음을 보여줍니다.

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    *    (이름 *)   
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 계속: 아무것도.
         
    * 보안 문제 해결: 언어 선택 드롭 다운 코드에 크로스 사이트 스크립트 관련 버그가 있었다. 이름 *NOAA이 잡기를 위한 안전 검사. 이 쇼는NOAA보안은 활발하고 일상적으로 보안 약점을 찾고 있습니다.ERDDAP·
         
    * 보안 FIX: 에 의해 사용되는 많은 도서관ERDDAP™업데이트, 평소처럼, 이 릴리스의 일부로. 이번에는 PostgreSQL 드라이버를 업데이트했습니다 (보안 버그가 있었다) 에 42.5.1.
         
    * IMPROVED: 더 작은 변화에ERDDAP메모리 관리 시스템은 사용 가능한 메모리 부족으로 인해 주어진 요청의 가능성을 감소해야합니다.
         
    * 몇몇 작은 변화 및 버그 수정.
         

## 버전 2.21{#version-221} 
 (출시 2022-10-09) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    *    (이름 *)   
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 으로:Java17, 당신은 setenv.bat 또는 setenv.sh에 JAVA\\_OPTS에 \\-d64를 사용하지 않아야합니다. 그렇다면 제거하십시오. 64 비트 모드가 현재 선택한 경우 64 비트 버전을 다운로드 할 때Java· Sam Woodman에게 감사.
         
    * 버그 FIX: 때로는 새로운 전자 메일 시스템은 Google 이메일 서버가 시도에 모든 미래 로그를 거부하려고 시도했습니다. 이제 이메일 시스템은이 및 관련 문제를 피합니다.
         

## 버전 2.20{#version-220} 
 (출시 2022-09-30) 

*    **v2.20을 사용하지 마십시오. 그것은 흠뻑.** 그러나 관리자는 여전히 v2.21 +로 업그레이드 할 때 아래에 나열된 TO 항목이 수행해야합니다.
     
*    **새로운 기능 및 변경 (사용자 정의) ::** 
    *    (이름 *)   
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * IMPROVED: 우리는 오래된 기억 관리 체계를 reenabled (Math2.ensureMemory사용할 수 있는) 새로운 메모리 관리 시스템을 수정 (연락처) 그것을 더 잘 일하기 위하여. 이름 *[메모리 상태](/docs/server-admin/additional-information#memory-status)상세 정보
         
    * CHANGED: 기본값&lt;ip주소MaxRequests&gt; 내 계정datasets.xml증가량이 7에서 15로 증가했습니다. 그것은 몇 가지 합법적 인 것 이다WMS클라이언트는 7 이상 동시 요구를 생성할 수 있습니다.
         

## 버전 2.19{#version-219} 
 (출시 2022-09-01) 

*    **v2.19를 사용하지 마십시오. 그것은 흠뻑.** 그러나 관리자는 여전히 v2.20 +로 업그레이드 할 때 아래에 나열된 항목이 수행해야합니다.
     
*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * NEW: 새로운 서버 측 기능이 있습니다,orderByDescending, 같은 작품orderBy, 하지만 정렬 하 여 순서. Adam Leadbetter 덕분에.
         
    * IMPROVED: 지금, 도표 (그러나 지도가 없습니다.) 캔버스에 사용할 수있는 공간을 채울 수 있습니다, 즉, 전설에 의해 사용하지 않는 공간. &.size=_width_를 추가하고 조작하여 키 큰 그래프, 사각 그래프 또는 넓은 그래프를 얻을 수 있습니다.|_height_ 매개 변수 (너비와 높이가 캔버스의 크기를 지정합니다. 픽셀) 요청 URL에. (이것은 .graph 웹 페이지에 옵션이 아닙니다. URL을 수동으로 추가해야 합니다.) &.size 매개변수를 지정하지 않으면, .smallPng, .png, .largePng, .smallPdf, .pdf 및 .large.pdf에 대한 요청은 사전 정의 된 캔버스 크기를 가지고 있으므로, 그래프는 사용 가능한 공간을 채우기 위해 확장되지만 보통 평방이 될 것입니다. Bob Fleming 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 계속하기:ERDDAP™현재 요구 사항Java17 관련 Tomcat 10. 당신은 따라야ERDDAP™설치 설명서 (또는 Docker를 위한 동등한 e.g.) 설치하기Java17 및 Tomcat 10 및 복사\\[뚱 베어\\]/content 디렉토리에서 당신의 Tomcat 8 설치 새로운\\[뚱 베어\\]디렉토리. 당신에 게 할 필요가 다른 변경이 없습니다ERDDAP이 변화와 관련된 임명. 다른 말에서,ERDDAP™전하기 때문에 작동합니다.
        
자주 묻는 질문ERDDAP- Tomcat의 server.xml 및 context.xml과 관련된 변경 사항이 Tomcat을 업그레이드 할 때. 이름 *ERDDAP이름 *[Tomcat 설치 지침](/docs/server-admin/deploy-install#tomcat)·
        
내 인상Java17는 그것은 더 긴 실행을 위한 처리 힘 그리고 기억을, 더 큰 신청 좋아합니다 좋아합니다ERDDAP™, 그래서 그것은 약간 더 느린 작동Java저출력 컴퓨터를 가진 8 (e.g., 2개의 핵심 및 최소한도 렘) 그리고 약간 더 빠른 작동Java고성능 컴퓨터를 가진 8 (e.g., 4 + 코어 및 화려한 RAM) · 그래서 당신은 가난한 성능을 볼 경우, 리눅스 같은 프로그램을 사용[맨 위로](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)자원 이용을 확인하고 주를 고려ERDDAP™더 많은 리소스, 더 많은 메모리. 기억은 싸다&#33; 대부분의 전화에는 당신이 실행하는 사용중인 서버보다 프로세서와 메모리가 더 있습니다.ERDDAP·
Erin Turnbull 덕분에.
         
        
    * TO DO: 이용 시ERDDAP™Cassandra에 액세스하려면 Cassandra의 버전을 사용해야합니다.Java당신은 Cassandra 실행을 위해 사용되었다. 그냥 스위치Java17 Tomcat+를 실행하기 위해ERDDAP·
         
    * TO : 추천 : 서버의 CPU가 4 + 코어와 8 + RAM의 GB가 있다면, 이러한 설정으로 변경 고려datasets.xml파일 :
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

서버가 몇 가지 리소스를 가지고 있다면, "1"로 표시하십시오.
nThreads 시스템EDDGrid파일 및 EDDTable fromFiles는 크게 향상되었습니다. 이 변화는 거대한 속도 개선에 주도 (e.g., nThreads가 2개 이상에 놓일 때 2X speedup) 가장 도전적인 요청 (많은 파일이 결과를 수집하기 위해 처리되어야 할 때) · Chris John의 일부 관련 변화는 전반적으로 일반 속도로 이어질 것입니다.ERDDAP· 이 변경에 대한 코드는 Chris John이 기여했습니다. 감사합니다. 크리스&#33;
         
    * 경고: 안으로 hyphensdatasetID's are deprecated and no longer 서포트 (기술적으로 아직도 허용하는) · 그들은 아마 다음 릴리스에 용해 될 것입니다. 당신이 hyphens를 사용하는 경우에, 문제를 피하기 위하여 underscores에 스위치. 이제 변경을 한다면, 그것은 당신의 자신의 속도로. 다음 릴리스를 기다릴 경우, 당신은 공황에있을 것이며 그 날을 처리해야합니다.
         
    * 새로운: 지금,.htmlTable문자열 셀의 데이터가 데이터가 포함되는 경우 데이터 응답:image/png;base64, base64 인코딩된 .png 이미지,ERDDAP™아이콘 표시 (그래서 사용자는 이미지를 볼 수 있습니다.) 텍스트 또는 클립보드에 이미지를 저장하는 버튼. Marco Alba에게 감사 (누가 코드에 기여) 그리고 Bob Simons (나는 그것을 약간 수정했다) ·
         
    * 새로운: -doNotAddStandardNames
\\-doNotAddStandardNames를 실행할 때 명령줄 매개변수로 포함하면 데이터셋 Xml, 생성 데이터셋 Xml는 추가하지 않습니다standard\\_name으로addAttributes위도, 경도, 고도, 깊이 또는 시간이라는 변수 이외의 변수에 대해 (그것은 분명하다standard\\_name₢ 킹) · 이것은 당신이 생성에서 산출을 사용하는 경우에 유용합니다 데이터셋 직접 XmlERDDAP™출력을 편집하지 않고 생성하기 때문에 데이터셋 Xml는 종종 추측standard\\_names 잘못된. (우리는 항상 당신이 그것을 사용하기 전에 출력을 편집하는 것이 좋습니다ERDDAP·) 이 매개 변수를 사용 하 여 다른 미성년자 관련 효과 때문에 추측standard\\_name다른 목적으로 종종 사용됩니다. 예를 들어, 새를 만들려면long\\_name, 그리고 colorBar 설정을 만들. Kevin O'Brien에게 감사.
         
    * 새로운: 지금 넣을 수 있습니다&lt;업데이트MaxEvents&gt;10&lt;/업데이트MaxEvents&gt; 내 계정datasets.xml  (상단의 다른 설정으로) 파일 변경의 최대 수를 변경 (기본값=10) updateEveryNMillis 시스템에서 처리됩니다. 더 큰 수 (100개?) dataset가 항상 최신 상태로 유지된다는 것이 매우 중요합니다. 이름 *[updateMaxEvents 문서](/docs/server-admin/datasets#updatemaxevents)· John Maurer에게 감사.
         
    * NEW : 글로벌 지원 추가 "real\\_time뚱 베어|false" 문자열 속성.
이것은 거짓 (기본값) dataset가 업데이트되지 않는 경우 모든NMillis,ERDDAP™전체 파일이 생성되어야 파일 형식의 요청에 대한 응답을 캐시합니다.ERDDAP™사용자의 응답을 보내고 약 15 분 동안 재사용 할 수 있습니다. (₢ 킹.nc파일 형식) ·
이 true로 설정되거나 dataset가 업데이트된 경우 모든NMillis,ERDDAP™응답 파일을 결코 캐시하지 않으며 항상 새로 생성 된 파일을 반환합니다.
John Maurer에게 감사.
         
    * NEW: 이메일은 이제 별도의 emailThread로 보내집니다. LoadDatasets가 전송되기 위해 이메일을 기다릴 필요가 없기 때문에로드 데이터셋 및 기타 작업을 신속하게 생성합니다. 새 시스템은 이메일 세션 당 여러 이메일을 보낼 수 있습니다, 따라서 이메일 서버 로그인의 번호를 감소하고 그들은 너무 자주 있기 때문에 실패의 위험을 감소. log.txt의 status.html 페이지와 진단 메시지에 emailThread에 대한 통계가 있습니다. - "emailThread"를 찾습니다. nEmailsPerSession=0의 키가 큰 점은 문제, 즉, 이메일 세션이 어떤 이메일을 보낼 수 없습니다.
Bob Simons에게 감사.
         
    * CHANGED: 이메일은 약간 다른 부호로 지금 보내집니다 (이름 *Java17 이메일 변경Thread) · 메일을 보내는 데 문제가 있다면, 이메일을 보내주십시오.erd.data at noaa.gov·
         
    * NEW : "터치" 원격 URL이 이제 별도의 TouchThread에서 처리됩니다. LoadDatasets가 완료되기 위해 터치를 기다릴 필요가 없기 때문에 빠른 URL을 터치하는 다른 작업을로드합니다. 때로는 긴 시간이 걸립니다. log.txt -- "touchThread"의 status.html 페이지와 진단 메시지에 대한 통계가 있습니다.
Bob Simons에게 감사.
         
    * NEW : "Major LoadDatasets Time Series"의 status.html 페이지에는 현재 헛된 요청 수를 나타내는 새로운 "shed" 열이 있습니다.ERDDAP™메모리 사용도 높다. 헛된 요청은 HTTP 상태 코드 503 "서비스 가능"을 반환합니다. 그 요청은 반드시 문제가 없었습니다. 그들은 단지 바쁜 시간에 도착. 이것은 방법의 revamp의 일부였다ERDDAP™높은 메모리 사용으로 거래.
         
    * NEW: 유닉스/리눅스 컴퓨터에서는 CPU 부하 및 메모리 사용을 포함하여 현재 운영 체제 정보를 가진 status.html 웹 페이지에 "OS Info"라인이 있습니다.
         
    * IMPROVED: 지금, 때ERDDAP™다시 시작하고 QuickRestart=true, EDDTableFromFiles datasets는 subset를 재사용할 것입니다.nc그리고 명백한.nc· 몇몇 datasets를 위해, 이것은 매우 dataset를 적재하는 시간을 감소시킵니다 (예, 60 초에서 0.3s까지) · 새로운 emailThread 및 taskThread와 함께 (더 보기) , 이것은 크게 재시작을 가속화해야ERDDAP™더 많은 것ERDDAP™설치. Ben Adams와 John Kerfoot 덕분에.
         
    * 변경: 이전, orphan datasets (datasets는ERDDAP™그러나 없다datasets.xml) 상태에 단순히 표기. 각 주요 loadDatasets 후에 log.txt에서 html과. 이제 자동으로 제거됩니다.ERDDAP™그리고 status.html과 log.txt에 표기된 경우, 이메일 모든 것 데이터셋을 제거하려면ERDDAP™, 이제 모두 당신이해야 할 xml의 펑크 제거datasets.xml그리고 그것은 다음 주요 loadDatasets에서 제거됩니다. Bob Simons에게 감사.
         
    * netcdf-java v5.5.2 및 v5.5.3의 KNOWN BUG : 더 보기EDDGrid인기 동영상 GenerateDatasets의 카탈로그 옵션 Xml는 원격 THREDDS 카탈로그의 데이터 세트에 대한 참조를 포함하는 THREDDS 카탈로그에 대한 작업에 사용됩니다. 이제는 없습니다. 나는 netcdf-java 개발자에게 문제를 보고했습니다.
         
    * BUG FIX: Docker 사용자 설정 설정을위한.xml 매개 변수를 통해ERDDAP\\__paramName_: int 및 불린 매개 변수 (e.g. 이메일 Smtp 포트) ·ERDDAP™단지 _paramName_를 찾고 잘못되었습니다. 지금 그것은 보인다 _ERDDAP\\_paramName_입니다. Alessandro De Donno 덕분에.
         
    * 변경 :ERDDAP™테스트 시스템은 이제 자동화된 시스템을 사용하여 새로 생성된 테스트 이미지가 예상대로 정확하게 확인할 수 있습니다. Chris에게 감사 존의 제안과 Bob Simons의 구현.
         

## 버전 2.18{#version-218} 
 (출시 2022-02-23) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 이름 *
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 버그 FIX:.nc파일은 일부 상황에서 닫지 않았습니다. 지금 그들은. Marco Alba, Roland Schweitzer, John Maurer, 그리고 다른 사람 덕분에.
         

## 버전 2.17{#version-217} 
 (출시 2022-02-16) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 버그 FIX: 변경 후orderBy몇 년 전에 시스템, Tabledap's Make A Graph는 제대로 사용 된 많은 쿼리를 처리하지 않았다orderBy_Xxx_. 지금 그것은. Maurice Libes 덕분에.
         
    * CHANGE: 이전,ERDDAP™거절된 요청 . 제품정보 Png의 위도 및 / 또는 경도 값이 부분적으로 또는 완전히 아웃 범위. (ERDDAP™GitHub Issues #19, 로보 풀러에 의해 게시 -- 그 Rob 게시 주셔서 감사합니다) 이제 이미지의 모든 아웃 범위 영역에 대한 투명 픽셀을 반환합니다. 이것은 많은 클라이언트 신청을 위해 유용합니다. 이 변경을 만드는 코드는 Chris John의 전적으로 수행되었습니다. 대단히 감사합니다, Chris&#33;
         
    * CHANGE: 이전,ERDDAP™주어진 차원을 위한 색인값이 있는 rejected griddap 요청은\\[높은: 낮은\\]· 이제 낮은 값과 높은 값을 교환하여 해당 요청을 확인합니다. 이것은 사용자를 위한 긴 걸출한 문제를 해결하고 xtracto와 같은 외부 프로그램을 위해 고도의 값이 있는 몇몇 datasets의 추적을 지키기 위하여 요구하기 위하여 같이 요청하기 위하여 요구하기 위하여 낮은것에서 배열하는 것을 가지고 있던 몇몇 datasets의 추적을 지키는 것을 가지고 있었습니다\\[ (50-100 원) :: (20명) \\]그래서 인덱스 공간의 요청은\\[낮은:높은\\]· 이름 * https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html 지금, 같은 요청\\[ (20명) :: (50-100 원) \\]이러한 데이터 세트 중 하나가 자동으로 해석됩니다.\\[ (50-100 원) :: (20명) \\]·
         
    * CHANGED: .esriAscii 요청은 이제 사용자의 브라우저에서 "File : Save As" 대화 상자를 트리거합니다. Joel Van Noord 덕분에.
         
    * 버그 FIX: 이제 아이 dataset의 경도 변수가 있다면EDDGridLonPM180 또는EDDGridLon0360 데이터 세트는valid\\_min및/또는valid\\_max속성, 그들은 제거EDDGridLonPM180 또는EDDGridLon0360 데이터 세트. 로이 Mendelssohn 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * TO: 설정한 경우&lt;dataProviderFormActive&gt;는 XSS 취약점으로 일시적으로 거래하기 위해 true로 설정하십시오.
         
    * SECURITY BUG FIX: 데이터 공급자 형태로 XSS 취약점 수정. Genaro Contreras Gutiérrez 덕분에.
         
    * 버그 FIX: AWS S3 dirctory가 10000 개 이상의 파일이있을 때,ERDDAP™threw "내부 오류". 이것은 지금 조정입니다. Andy Ziegler에게 감사.
         
    * 버그 FIX:EDDGridSideBySide는 변수를 허용하지 않았습니다.sourceName다른 아이 datasets에 있는 s는 동일하. 지금 그것은. Joshua Stanford 덕분에.
         

## 버전 2.16{#version-216} 
 (출시일 2021-12-17) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 변화/BUG FIXES: 언어 별 편집기에서 제안 덕분에 번역 시스템에 대한 작은 변화. Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian 및 Mike Smit에 감사드립니다.
         
    * Google 번역의 용어에 따라 Google 번역에 대한 적절한 해고 및 attribution 추가. 또한,&lt;HTML&gt; 태그는 HTML의 모든 웹 페이지에 제대로 식별하지 않는 비 영어 웹 페이지 번역 되었습니다. Mike Smit에 감사합니다.
         
    * 버그 FIX: 로그인 웹 페이지는 이제 다른 언어 설정으로 제대로 작동하고 있습니다. Mike Smit에 감사합니다.
         
    * ₢ 킹orderBy합계 필터 그리고 새로운 체크 모든 및 Uncheck 모든 버튼EDDGrid데이터 액세스 양식 웹 페이지. Marco Alba의 코드 기여 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 계속하려면:
        &lt;질문MarkImageFile&gt;QuestionMark.jpg&lt;/questionMark이미지파일&gt;
setup.xml 파일에서 전체 태그를 제거해야합니다. (권장, 그래서 기본 파일 사용) 또는 변경:
        &lt;파일 형식: .png (2000x2400)&lt;/questionMark이미지파일&gt;
         
    * CHANGE: 그냥 알고,[채용정보](https://adoptium.net/?variant=openjdk8)ADoptOpenJDK를 메인/추천 소스로 대체했습니다.Java  (오픈) ·
         
    * CHANGE: 로그 파일에서ERDDAP™, 생성데이터셋 Xml, DasDds는 이제 UTF-8, 컴퓨터의 기본 문자 집합이 아닙니다. 나는 많은 검사를하고 그것을 지키는 몇 가지 변화를 만들었습니다ERDDAP™항상 모든 종류의 파일을 읽고 쓰는 경우 적절한 문자 집합을 지정하고 더 이상 (몇몇 경우에) 컴퓨터의 기본 문자 집합에 의존합니다. 이 몇 가지 실수를 수정하고 가능한 한 많은 파일 유형으로 UTF-8을 사용하는 목표를 달성 할 수만큼 가까이 이동 (예, .log, .xml, .html,.json·.json₢ 킹.nc기타 제품) · 많은 파일 형식이 ISO-8859-1를 사용해야 하는 주의 (₢ 킹OPeNDAP.das, .dds의 .csv,.tsv·.nc3개,.nccsv· .cpt) · 나는 이전에 CF 그룹과 함께 일하려고UnidataUTF-8에 대한 지원 추가.nc3개의 파일; 둘 다 저항했습니다.
         
    * NEW : AWS S3에서 파일을 다운로드 할 때,ERDDAP's 캐시 FromUrl 시스템EDDGrid파일 및 EDDTable FromFiles는 이제 새로운 AWS Transfer Manager를 사용하여 병렬화된 펑크를 통해 파일을 다운로드합니다. (이렇게 아주 빠른) · 대상 처리량은 파일당 20Gbps로 설정되므로 모든 AWS 인스턴스 유형과 잘 작동하지만 특히 "네트워크 성능"이 우수합니다. 이 변화ERDDAP's 캐시 FromUrl system now offers comparable speeds to xarray의 병렬화 된 다운로드의 pre-chunked files, 하지만 필요가 없이 소스 파일을 변환하는.nc이름 *.hdfchunked xarray 파일로. 사실,ERDDAP's 시스템은 같은 파일에서 읽는 후속 요청이 있다면 더 좋습니다.ERDDAP™이제 파일의 로컬 복사본이 있습니다. 우리의 지역 사회는에 표준화하는 년을 보냈습니다.nc이름 *.hdf파일. 이제 AWS S3의 데이터를 저장 할 때 좋은 성능을 얻을 수있는 모든 것이 tos가 없습니다. Rich Signell에 감사.
         
    * CHANGE: searchEngine=Lucene는, 지금, deprecated 입니다. SearchEngine=original의 더 바람직한 행동에서 약간 다른 결과를 산출하는 복잡한 체계입니다. 거의 모두ERDDAP™설치, Lucene의 시간 절약은 결과의 차이를 상쇄하지 않습니다. 대신 SearchEngine=original를 사용하십시오. 문제가 발생하면 Bob에게 이메일을 보내주십시오.
         
    * CHANGE: Lucene searchEngine는 지금 본래 searchEngine 같이 좀더 행동합니다. lucene이 dataset 일치를 생각하고 원본이 아닙니다. 또한, lucene의 순위는 이제 같은 원래의 순위 (원래는 이제 항상 순위를 계산하기 위해 사용) ·
         
    * 버그 FIX: 최근 출시 시작,ERDDAP™주어진 AWS S3 물통에 있는 첫번째 1000 이상 목표를 보십시오. 지금,ERDDAP™다시 모든 개체를 볼 수 있습니다. Andy Ziegler 덕분에.
         
    * BUG FIX: 지금 EDDTableAggregate 행은 제거합니다actual\\_range아이 데이터셋 중 하나 이상의 속성은 그 변수를 알 수 없습니다. 이름 *actual\\_range  (예를 들어, EDDTableFromDatabase) · Erik Geletti 덕분에.
         

## 버전 2.15{#version-215} 
 (출시일 2021-11-19) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    *   ERDDAP™사용자가 모든 웹 페이지에 사용할 수있는 언어를 지정할 수있는 새로운 시스템을 가지고 있습니다. 이름 *ERDDAP™설치는 그것을 사용하기 위해 설정, 언어의 목록은 각 웹 페이지의 오른쪽 상단 모서리에 나타납니다.ERDDAP™이 버전의 URL은 계속 작동하고 항상 영어 콘텐츠를 반환합니다.
        
모든 텍스트 또는 모든 웹 페이지가 번역되지 않았습니다. 이 프로젝트의 시간 제약이있었습니다. Qi와 Bob을 100%로 방지했습니다.
        
명백한 질문은: 왜 우리가 Chrome가 웹 페이지를 비행에 번역할 때 이렇게 많은 노력을 뒀습니까? 대답은: 이 방법, 우리는 번역이 수행되는 방법에 대해 훨씬 더 많은 제어를 얻을. 물론 웹 페이지, 예를 들어, datasets의 제목 및 요약, 변수의 이름, 매개 변수, 매개 변수, 단위 및 조직에 번역되지 않은 단어의 많은가있다. 번역 노력의 대부분은 번역되지 않은 단어와 구문을 식별했다. 또한, 기계 번역은 HTML의 특정 유형에 임했습니다. 번역을 관리하면이 문제를 최소화 할 수 있습니다.
        
번역 프로젝트는 Qi Zeng에 의해 수행되었다 (Google Summer of Code 인턴쉽) Google의 번역 웹 서비스를 사용하여 Bob Simons. 그것은 거대한 프로젝트였다. 감사, ₢ 킹
        
    * 버그 FIX:ERDDAP™이제 ORCID ID가 X를 마지막 숫자로 가질 수 있습니다. Maurice Libes 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 계속하기:
        
        * 당신은 관련 몇 가지 변경을해야합니다ERDDAP's new system to let users specify a language for web 페이지.
            * setup.xml의 첫 줄에datasets.xml파일, 변경 : 인코딩 ="UTF-8"및 텍스트 편집기에서 문서의 인코딩을 변경 그래서 UTF-8 파일로 저장됩니다. Generate데이터셋 Xml는 이제 그 것을 가정datasets.xmlUTF-8 파일입니다.
            * 컴파일하는 프로그래머ERDDAP:: 모든 것ERDDAP™.java 파일은 기본적으로 UTF-8 파일로 처리되어야 합니다. javac 명령 줄에 "-encoding UTF-8"을 추가해야 할 수 있습니다. (나는.) 
            * 이 시스템을 활성화 (사이트 맵) , 에서&lt;startBodyHtml5&gt; 태그를 지정합니다.datasets.xml, "&amp&#33;loginInfo;" 으로 "&amp&#33;loginInfo;|&amp&#33;language;"그래서 언어의 목록은 각의 오른쪽 구석에 나타납니다ERDDAP™웹 페이지.
            *   ERDDAP™만 사용&lt;startBodyHtml5&gt; 태그를 지정합니다.datasets.xml각 배너의 HTML 콘텐츠를 지정하려면ERDDAP™웹 페이지, 어떤 언어가 사용자 선택. 태그를 사용하려면
·&EasierAccessToScientificData;"과학 데이터에 대한 더 쉬운 접근"과
·&BroughtToYouBy;"당신에게" 대신ERDDAP™배너에서 그 문구의 번역 버전을 사용할 수 있습니다.
            * 유사하게, 새로운 기본&lt;theShortDescriptionHtml&gt; 에datasets.xml이름 *
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
내용의 마지막 3 줄은 번역된 텍스트로 대체 될 것입니다. 당신이 그들을 변환하는 경우 (아니 &이 ParticularErddap의 특징) 또는 그 위에 명시된 텍스트를 모두datasets.xml  (우선, 현재) 또는 message.xml, 그 텍스트는 어떤 언어가 사용자를 선택합니다. 이것은 완벽하지 않습니다, 하지만 나는 몇 관리자가 편집 할 것 같다&lt;35개의 다른 파일에 있는 theShortDescriptionHtml&gt;는 그 꼬리표의 35의 다른 번역한 버전을 제공합니다.
        
          
         
    * CHANGED: 몇몇 과실은 지금 약간 다르게 취급되고 그래서 상태.html에 " 실패한 요구"의 키가 큰에 추가될 수 있고 매일 보고 이메일에서. 그래서 그 숫자는 이전보다 약간 커질 수 있습니다.
         
    * BUG FIX: 생성데이터셋 Xml 용EDDGridLon0360 과EDDGridLonPM180 이제 소스 데이터 세트를 제외datasetID=~.\\*\\_LonPM180"과datasetID=~.\\*\\_Lon0360", 각각.
         

## 버전 2.14{#version-214} 
 (출시일 2021-07-02) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    *    (이름 *)   
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 새로운:EDDGridLon0360는 경도 값 &gt; =0 및 그리드 데이터 세트를 만드는&lt;경도 값 &gt;=-180과 그리드 데이터 세트에서 =360&lt;=80. 이름 *[EDDGridLon0360 문서](/docs/server-admin/datasets#eddgridlon0360)· Dale Robinson 덕분에.
         
    * 새로운:ERDDAP™administrators can now override any value in setup.xml 환경 변수를 통해ERDDAP\\__valueName_ 실행하기 전에ERDDAP· 예를 들어, 사용ERDDAP\\_baseUrl은&lt;baseUrl&gt; 값입니다. 배치 할 때 손이 될 수 있습니다.ERDDAP™setup.xml의 표준 설정을 넣을 수 있으므로 환경 변수를 통해 특수 설정을 공급할 수 있습니다. 비밀 정보를 공급하는 경우ERDDAP™이 방법을 통해 정보는 비밀을 유지해야합니다.ERDDAP™단지 시작 당 한 번 환경 변수를 읽는다, 처음 두 번째 시작에서, 그래서 이것을 사용하는 한 가지 방법: 환경 변수를 설정, 시작ERDDAP™, 때까지 기다립니다ERDDAP™시작하면 환경 변수를 설정할 수 없습니다. Marc Portier에 감사.
         
    * IMPROVED: 이제, EDDTable의 일부 파일이 있다면 ... 많은 파일이있는 파일 dataset에는 매우 긴 문자열 값이 있습니다. dataset은 훨씬 빨리로드하고 훨씬 빠른 요청에 응답합니다. 이전,ERDDAP™같은 데이터셋에 대한 파일 정보로 저장되는 파일의 최소 및 최대 문자열 값에 대한 많은 공간을 할당할 것입니다. 결과 파일이 거대하여 작성하고 천천히 읽습니다. OBIS에 감사.
         
    * IMPROVED: 지금,ERDDAP™CSV 파일에 특이하고 잘못된 문자 순서 해석의 더 나은 일을한다. OBIS에 감사.
         
    * FIX: Cassandra와 문제의 년 후에, 나는 마지막으로 Cassandra를 설치했습니다 (₢ 킹) 다시 그리고 그래서 Cassandra v2와 테스트를 다시 실행할 수 있었다. 그래서 지금 나는 더 많은 자신 상태 할 수ERDDAP™Cassandra v2 및 v3와 함께 작동합니다. ONC에 감사.
         

## 버전 2.12{#version-212} 
 (출시일 2021-05-14) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 버그 FIX: 구독 블랙리스트에 있다면, 이제 구독 목록을 요청할 수 없습니다.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * TO DO: NEW: 체계가 자동적으로 악의적인 사용자의 능력을 제한하고 다른 사용자를 위한 체계 성과를 평가할 것이다 다량의 동시 요구에 응하기 위하여 적극적인 합법적인 사용자. 3 개의 새로운 옵션 태그가 있습니다.datasets.xml당신이 할 수 있는/should는 후에 권리를 추가합니다&lt;도표BackgroundColor&gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

자세한 내용은[ip주소최대 요청](/docs/server-admin/datasets#ipaddressmaxrequests)·ERDDAP™또한 이제는 "독특한 사용자의 수 (스타트업) " status.html 페이지에.
중국에서 사람 덕분에 내 공격ERDDAP™설치.
         
    * Postgresql 드라이버 동작으로 변경: Postgresql 드라이버를 업데이트할 때, Postgresql과 GenerateDatasetsXml가 생성한 테이블 목록의 열명은 이전의 모든 하위 케이스 대신 모든 상부를 다시 왔습니다. 나는 데이터베이스가 종종 그 이름을 고려하기 때문에 다른 것들에 영향을 줄지 모른다. 내 테스트 dataset은 여전히 제대로 작동합니다. 그러나 데이터 세트가이 작업을 중지하는 경우ERDDAP™업데이트, 이것은 먼저 추구 할 수있는 원인입니다.
         
    * 버그 FIX:ERDDAP™이제 AWS S3 파일을 올바르게 처리합니다. AWS S3 파일의 취급에 다른 관련 개선이 있었습니다. Michael Gangl과 Dylan Pugh 덕분에.
         
    * 새로운:EDDGridfromNcFiles 및EDDGrid파일 형식 Unpacked는 이제 "structures"에서 데이터를 읽을 수 있습니다..nc4와.hdf4 파일. 구조에서 변수를 식별하려면,&lt;sourceName· 형식을 사용한다: _fullStructureName_|_memberName_, 예를 들면 그룹1/myStruct|내회원 NRL에 감사.
         
    * CHANGED: 지금, 현재 기억 사용 플러스 이 요구는 경미하게 높, griddap 세트입니다 이 요청에 대한 nThreads 1. 그래서,ERDDAP™메모리가 scarce 때 보존 메모리. 중국에서 사람 덕분에 내 공격ERDDAP™설치.
         
    * 새로운 시스템 열림 파일 (소켓과 다른 것들을 포함, 그냥 파일) Linux 컴퓨터에서 Tomcat에서. 일부 파일이 실수로 닫지 않은 경우, 열 파일의 수는 최대 허용 및 수많은 정말 나쁜 일이 일어날 때까지 증가 할 수 있습니다. 이제 Linux 컴퓨터에서 (정보는 Windows에서 사용할 수 없습니다.) ::
        
        * status.html 웹 페이지의 오른쪽에 새로운 "Open Files"열이 있습니다. Windows에서 "?"를 보여줍니다.
        * 시간 :ERDDAP™각 주요 데이터셋 리로드의 끝에서 정보를 생성하면 로그에 인쇄됩니다. txt 파일:
max=_max_ %=_percent_의 openFileCount=_current_
        * 비율이 &gt;50%인 경우에, 이메일은 보내집니다ERDDAP™관리자 및 이메일 모든 것 이메일 주소
        
더 많은 것을 찾으려면, 또는 당신이 당신의 문제에 볼 경우ERDDAP™, 참조[너무 많은 오픈 파일](/docs/server-admin/additional-information#too-many-open-files)·
중국에서 사람 덕분에 내 공격ERDDAP™설치.
         
    * NEW : 나는 "Too many open files"의 검사 및 취급을 많이 추가했습니다. 그래서 작업은 단지 중지하고 사용자가 오류 메시지를 볼 수 있습니다. Data 파일은 "Too many open files" 오류에서 결과를 읽으면 더 이상 나쁘게 표시되지 않습니다.
         
    * ₢ 킹\\[큰Parent감독\\]/badFilesFlag 디렉토리:
이 디렉토리에 파일을 넣으면datasetID파일명 (파일 내용이 중요하지 않습니다.) ·ERDDAP™잘못된 파일을 삭제합니다..nc그 dataset에 대한 파일 (이름 *) dataset ASAP를 다시로드합니다. 이 원인ERDDAP™파일을 다시 시도하기 전에 (자주 묻는 질문) 나쁘다. Marco Alba에게 감사.
         
    * CHANGED: 시작시EDDGrid...Files 또는 EDDTable에서 ... 파일 dataset가 처음에는 알려진 유효 파일 목록에서 0 파일이 있습니다. (e.g., 그것은 새로운 dataset입니다) , 다음ERDDAP™defers로드하고 플래그를 설정하여 주요 LoadDatasets가 완료된 후 ASAP를 로드합니다. 새로운 데이터셋이 있을 때 초기 시작을 가속화합니다.
         
    * 변경: FileVisitorDNLS.testAWSS3 () 파일VisitorSubdir.testAWSS3 () ; 지금 AWS v2를 사용하십시오 (아니 v1) SDK. 지금 GitERDDAP™이제 배포에는 필요한 모든 파일이 포함되어 있으며 더 이상 수동으로 대규모 v1 AWS SDK jar 파일을 추가 할 필요가 없습니다.
         
    * CHANGED : Maven을 사용하여 감지 / 가중류를 사용합니다. (/lib의 .jar 파일) · AWS SDK의 v2로 변경이 완료되었습니다. 앞으로 다른 수입된 부호를 위해 필요합니다. pom.xml을 제공 한 Kyle Wilcox 덕분에 그는 나를 위해 여러 문제를 해결하고 사용합니다.
         
    * CHANGED: 분류 모수 (-cp의) GenerateDatasetXml, DasDds 및 다른 작은 프로그램에서 사용ERDDAP™, 그리고 프로그래머에 대한 조언은 이제 훨씬 더 간단하며, 디렉터리가 아닌 다른 파일이 아닙니다.
\\-cp 클래스; C : \\programs\\_tomcat\\lib\\servlet-api.jar;lib\\\\*
         (또는 ':' 대신 ';' Linux 및 Mac 용) ·
         (나는이 년 전에 그것을 옵션이되었을 때 수행해야합니다.)   
         
    * 새로운 기능: GenerateDatasets Xml에는 새로운 유틸리티 옵션이 있습니다. findDuplicateTime은 그리드의 컬렉션을 통해 검색합니다..nc  (및 관련) 파일 중복 시간 값으로 파일을 찾을 수 있습니다. 이름 *[연락처 (주)](/docs/server-admin/datasets#findduplicatetime)  
         
    * 새로운:datasets.xml지금 포함할 수 있습니다&lt;palettes&gt; 태그를 overrides&lt;palettes&gt; 메시지의 태그 값.xml (또는 메시지에 반환.xml 값이 비어 있는 경우) · 사용 가능한 팔레트 목록을 변경할 수 있습니다.ERDDAP™계속. 또한 cptfiles 하위 디렉토리가 있는 경우ERDDAP™내용 디렉토리,ERDDAP™디렉토리의 모든 \\*.cpt 파일을 복사합니다.\\[뚱 베어\\]/webapps/erddap/WEB-INF/cptfiles 디렉토리 매번ERDDAP™시작하기 함께, 이러한 변경은 팔레트를 추가하고 새로운 버전을 설치할 때 변경 persist가ERDDAP· 이름 *[palettes 문서](/docs/server-admin/datasets#palettes)  
Jennifer Sevadjian, Melanie Abecassis 및 다른 CoastWatch 사람들 덕분에.
         
    * 변경 : [&lt;SlowDownTroubleMillis&gt;는 (/docs/server-admin/datasets#slowtroublemillis의 경우) 이제는 실패한 요청을 위해 사용되며 몇 가지 유형이 아닙니다.
         
    * CHANGED: RunLoadDatasets 나사는 지금 3/4 LoadDatasets에 LoadDatasets 실을 중단합니다 MaxMinutes 그래서 LoadDatasets에 대한 더 많은 시간이있어 중단과 출구를 완전히 통지합니다. 또한 더 나은 진단 메시지가 있습니다.
         
    * Lucene의 이전 버전에서 v8.7.0로 변경됩니다.
         
    * CHANGE: 이메일 전송ERDDAP™이제 고정 폭 글꼴과 나타납니다.
         
    * 크기:EDDGridFromFiles는 이제 축값과 FIRST의 속성을 얻습니다.|LAST 파일, 지정된대로&lt;메타데이터From&gt;. 이름 * (아니다.) Ken Casey, 외.
         
    * 잘못된 단위 "degree\\_North" 및 "degree\\_East"에 대한 추가 지원은 최근 파일에 의해 사용되었습니다 (2020-10-01 이후) AVHRR Pathfinder 버전에서 5.3 L3-Collated (사이트맵) SST 데이터셋 (사이트맵sstd1일과 nceiPH53sstn1일) ·ERDDAP™이제 유효한 단위로 표준화 할 수 있습니다. 이름 * (아니다.) Ken Casey, 외.
         

## 버전 2.11{#version-211} 
 (출시일 2020-12-04) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * BUG FIX: OrderByMean threw a NullPointerException 변수가 \\_FillValue 또는 누락된 \\_ 정의 값. 이제 제대로 상황을 처리합니다. Marco Alba에게 감사.
         
    * 버그 FIX: 만든 ODV 텍스트 파일과 문제가 있었다ERDDAP™v2.10에서. 이러한 문제는 고정됩니다. Shaun Bell 덕분에.
         
    * 버그 FIX: 내 계정ERDDAP™v2.10: lat lon 경계가 URL에 지정 된 경우, 바인딩 상자는 세계지도에 그려지지 않았습니다. 이제 다시입니다. John Maurer에게 감사.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 버그 FIX: 내 계정ERDDAP™v2.10: ArchiveADataset의 스크립트 파일, GenerateDatasets Xml와 DasDds는 그들이 가진 분류에 변화가 없는 때문에 작동하지 않았습니다ERDDAP™v2.10. 이제 그들은. Marco Alba에게 감사.
         
    * 새로운: 에서datasets.xml, 당신은 이제 태그가있을 수 있습니다 :
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

현재 true이면 (또는 태그가 빈 경우, 또는 태그가 파일에 있지 않다면) , 사용자의 요청이 NullPointerException으로 이어질 때ERDDAP™stack trace를 이메일로 전송합니다.erd.data at noaa.gov  (이름 *ERDDAP™개발 팀) · 은밀한 정보 없이 안전하고 안전해야 합니다. (예를 들어, requestUrl) 이메일에 포함되어 있습니다. 이것은 NullPointerExceptions로 이어지는 완전히 예기치 않은 버그를 잡을 수 있습니다. 그렇지 않으면 사용자는 예외를 볼 수 있지만ERDDAP™개발자는 하지 않습니다, 그래서 우리는 고정 될 필요가 문제가 없다.
        
이 태그가 다른, 유사한 진단 정보로 이어질 수 있음erd.data at noaa.gov미래에. 이메일의 내용은 항상 버그와 관련이 있으며, 예를 들어, 사용 정보. Marco Alba에게 감사.
         
        
    * CHANGED: 지금, 일반적인 압축 파일 유형 (.bz2·.gz·.gzip·.tar·.tgz·.z·.zip) 또한 byte 범위 요청에 대 한 금지. 이것을 통해 지정됩니다.&lt;extensionsNoRangeRequests&gt; 메시지.xml.
         
    * KNOWN 장점: 이름 *ERDDAP™2.10,.nc속성을 변경하려고하는 ml 파일은 속성을 변경하지 않습니다. 이것은 내가보고 한 netcdf-java에서 알려진 버그이며 그들은 netcdf-java의 다음 릴리스에서 수정됩니다.
         

## 버전 2.10{#version-210} 
 (출시 2020-11-05) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 새로운: 새로운[회사연혁](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)gridded dataset의 값의 값을 효율적으로 계산합니다. 같은, 그것은 특히 동물 트랙 데이터를 작업 연구원에 유용합니다. 이 변환기는 고도, 경도 및 시간 란을 가진 테이블에서 가지고 갑니다 (그리고 아마도 다른 열) 그리고 interpolated 값을 가진 추가 열을 가진 테이블을 반환합니다. 따라서, 이것은 대중과 유사합니다[Xtractomatic의 특징](https://coastwatch.pfeg.noaa.gov/xtracto)원래 Dave Foley에 의해 생성 된 스크립트, 하지만 요청 당 최대 100 포인트 처리의 이점을 제공합니다. Dave Foley 및 Jordan Watson의 감사 (NMFS) ·
         
    * IMPROVED: 고급 검색은 이제 non-.html 요청을 위해 엄격합니다. 그것은 이제 영구 오류가 있는 요청에 대한 예외를 던질 것입니다. (e.g., minLat &gt; maxLat 요청) 또는 임시 오류 (e.g., 요청standard\\_name존재하지 않는다.) · .html 요청의 경우, 고급 검색은 변경되지 않습니다. Google 검색으로, 그것은 그것의 가장 잘 고정하거나 오류를 무시합니다. Rich Signell에 감사.
         
    * IMPROVED: 고급 검색 페이지의지도는 이제 더 큰 (여전히 스쿼트가 있지만 덜) 더 정확한 (그러나 아직도 완벽하지) · John Maurer에게 감사.
         
    * IMPROVED: “Draw land mask” 설정은 그래프 웹 페이지와 &.land=... 지도를 요청하는 URL에서 설정은 이제 두 가지 옵션을 지원합니다.
"outline"은 Landmask 개요, 정치 경계, 호수 및 강을 그립니다.
"off"는 아무것도 그리지 않습니다.
이름 *[&.land=... 문서](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)·
John Maurer에게 감사.
         
    * IMPROVED: Graphs 및 지도 생성ERDDAP™이제 세 가지 새로운 마커 유형을 사용할 수 있습니다: 국경없는 필링 광장, 국경없는 필링 서클, 국경없는 필링 위 삼각형. 이 코드는 ETT / EMODnet Physics의 Marco Alba에 의해 기여되었습니다. Marco Alba에게 감사.
         
    * 새로운:"files"시스템은 이제 일반 지원 파일 형식 응답 (사이트맵.htmlTable·.itx·.json·.jsonlCSV1·.jsonlCSV·.jsonlKVP·.mat·.nc·.nccsv·.tsv, 또는.xhtml·) , 예를들면[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)·
Kyle Wilcox 덕분에.
         
    * IMPROVED: 사용자가 데이터 액세스 양식을 사용하는 경우 생성된 URL (사이트맵) 또는 Make-A-Graph (·) 웹 페이지가 제대로 퍼센트 인코딩 문자\\[이름 *\\]· 이것은 인간의 URL을 읽을 수 있지만, 웹 보안 스탠드 포인트에서 더 나은. Administrators 이제 RelaxedQueryChars= 설정 옵션이 있습니다. 이름 *\\[\\]|Tomcat server.xml 파일에서 (더 적은 안전) 또는 아니 (더 안전한) ·
Antoine Queric, Dominic Fuller-Rowell 및 기타 덕분에.
         
    * NEW: EDDTable 데이터셋에 대한 요청이 포함된 경우 &add 변수 이름 * (_자격 이름, 속성 가치_) ·ERDDAP™모든 변수를 추가합니다. _attribute 이름=attribute Value_ 요청된 변수의 리스트에.
이름 *[&더보기 변수 자주 묻는 질문](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere)· Aurelie Briand, 외.
         
    * 변화하는:ERDDAP™이제 /files/에 바이트 범위 요청을 거부.nc또는.hdf파일. 원격으로 연결할 수 없습니다..nc또는.hdf파일로 로컬 파일이 있다면. 그것은 horribly 계수이고 수시로 다른 문제를 일으키는 원인이 됩니다. 대신:
        * 제품 정보(OPeN)DAP클라이언트 소프트웨어에 연결하기ERDDAP이름 *DAP이 dataset에 대한 서비스 (/griddap 또는 /가 있는 경우tabledap/ URL에서) · 그게 뭐DAP으로
        * dataset의 Data Access Form을 사용하여 데이터셋을 요청합니다.
        * 긴 기간 동안 전체 파일 또는 반복 된 액세스가 필요한 경우, 사용curl·wget, 또는 브라우저 전체 파일을 다운로드, 다음 파일의 로컬 복사에서 데이터를 액세스.
             
    * IMPROVED: .odv의 Txt 출력 옵션은 새로운 버전을 지원하는 rewrittenODV .txt파일 및 trajectory, timeseries 및 프로파일 데이터의 적절한 표현을 지원한다.
         
    * IMPROVED: 이제 더블 인용의 검색 조건은 json 문자열로 해석되므로 \\ 인코딩된 문자를 가질 수 있습니다. 다른 것들 중에서, 이것은 속성에 대한 정확한 일치를 검색 할 수 있습니다, 예를 들어, "institution=NOAA\\n" 기관과 데이터셋과 일치하지 않습니다 =NOAA NMFS· Dan Nowacki 덕분에.
         
    * IMPROVED: 추가 장소에서, 뜨 점 수 (특히 float는 더블로 변환) 이제 추가 장소에서 숫자의 약간 더 둥근 버전으로 나타났습니다. 예. 이전에는 32.27998779296875처럼 두 배로 표시된 float는 32.28로 나타날 수 있습니다. Kyle Wilcox 덕분에.
         
    * BUG FIX: unsigned integer 오디오 파일은 약간 잘못 읽었습니다. 지금 그들은 제대로 읽습니다.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 경고: 당신이 달리는 첫번째 시간ERDDAP™v2.10, 로컬 데이터 파일에 근거한 몇몇 datasets는 적재할 것입니다 **이름 *** 천천히ERDDAP™파일 정보의 데이터베이스를 재구성해야합니다. 느린 처음 재부하 후에, 그들은 빨리 적재할 것입니다. 진료시간
         
    * 당신이해야 할 일 :
        * v2.10을 처음 실행하면 일부 데이터 세트가 로드되지 않을 수 있습니다.ERDDAP™이제는 metadata에 대해 더 엄격합니다. 시작하기ERDDAP™첫 번째로드가 될 때 매일 보고서를 이메일로 보내드립니다. 로드하지 않은 데이터셋의 각 오류 메시지가 포함될 것입니다. 문제를 파악하기 위해 오류 메시지를 읽으십시오. 대부분의 경우에, 당신은 단지 문제를 해결하기 위해 dataset의 metadata에 작은 변화를 만들 필요가 있습니다.
             
        * 내 계정datasets.xml, 검색&lt;sourceName&gt; = (이름 *'='로그인, 식별[고정값sourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) · 제품 정보ERDDAP™설정, 이들은 드문다. 이후의 값은'='문자열 (번호) , 이제는 두 배 인용에 문자열을 닫습니다. 예를 들어,
이전 :&lt;sourceName&gt;=KZ401&lt;/ 한국어sourceName·
후:&lt;sourceName·KZ401&lt;/ 한국어sourceName·
             
        * 새로운: setup.xml에 있는 새로운 선택적인 조정이 있습니다,&lt;defaultAccessibleViaFiles&gt;, 기본 설정&lt;accessViaFiles&gt; 각 datasets. 이 새로운 태그의 기본은 false입니다, 이는 이전을 mimicsERDDAP™이름 * 이 저수준 조정은 주어진 dataset의에 의해 overruled 할 수 있습니다&lt;accessViaFiles&gt; 설정.
            
관련 상품 (이런 것을 원하신다면) ::
모든 EDD를 만들려면 ... fromFiles datasets는 파일 시스템을 통해 접근할 수 있으며,
            
            1. setup.xml 파일에 이 태그를 추가:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (옵션으로) 모든 것을 제거
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
내 계정datasets.xml기본값은 이제 true입니다.
                 
        * \\_FillValue 속성 추가:
            ERDDAP™default \\_FillValue가 모든 정수 변수에 사용됩니다. (e.g., 127 바이트 변수) · 이제는 없습니다. 데이터 값으로 표시된 이러한 값을 피하기 위해 (누락된 값) , 당신은 \\_FillValue 속성을 통해 명시적으로 상태를해야합니다. 지금부터 시작된 각 시간ERDDAP™, 그것은 관리자에게 \\_FillValue가없는 정수 소스 변수의 목록과 .csv 테이블과 이메일을 보낼 것입니다missing\\_value속성 및 제안 된 새로운 \\_FillValue 속성. 이름 *[\\_Fill 추가 가치 특성](/docs/server-admin/datasets#add-_fillvalue-attributes)더 많은 정보 및 지침.
             
        * 컴파일하기ERDDAP™, 당신은 javac 명령 줄에 classpath 매개 변수를 수정해야 이러한 새로운 항아리의 참조를 추가하려면: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar ·
             
    * CHANGED: Tomcat 9는 이제 Tomcat의 권장 버전입니다.ERDDAP· Tomcat 8.5+의 최신 버전은 지금도 좋습니다. 우리는 청소ERDDAP이름 *[Tomcat 설치 지침](/docs/server-admin/deploy-install#tomcat)·
        
최신 버전의Java8개 (아니다.Java9, 10, 11, ...) 이름 *[채택OpenJDK](https://adoptopenjdk.net/)권장 버전의 유지Java제품정보ERDDAP·Java8에는 AdoptOpenJDK에서 장기 지원이있어 사용하기 안전하지만 보안상의 이유로 정기적으로 최신 버전을 얻는 것을 기억하십시오.
        
    * NEW: Script SourceNames / Tabular Datasets의 변형 변수
EDDTableFromFiles, EDDTableFromDatabase 및 EDDTableFromFileNames datasets는 이제 표현과 스크립트를 포함할 수 있습니다.sourceName· 이것은 소스 파일에서 기존 변수를 기반으로 새로운 변수를 만들 수 있습니다. 주어진 새로운 변수의 계산은 결과의 한 줄 내에서 수행되며 모든 행에 반복적으로 수행됩니다. 예를 들어, 범위의 값과 경도 변수를 만들려면 -180 - 180° 범위 0 - 360°의 값과 변수에서:
        &lt;sourceName&gt;=Math2.anglePM180 (행.columnDouble ("론") ) &lt;/ 한국어sourceName·
자주 묻는 질문[스크립트 SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Bob Simons에게 감사 (이 이전 계획ERDDAP™v1.0 마지막으로 구현하는 방법을 발견) , Kevin O'Brien, Roland Schweitzer, John Maurer, 그리고 실제로 단단한 부분을 수행하기위한 Apache JEXL 라이브러리 (잘하고) ·
         
    * NEW: Integer 데이터 유형 지정 (ubyte, ushort, uint, 우롱) 현재 지원됩니다. 많은 파일 유형 (예, .das, .dds,.nc3개) 이 새로운 데이터 유형 모두 지원하지 마십시오. 이름 *[자료실 유형 문서](/docs/server-admin/datasets#data-types)자주 묻는 질문ERDDAP™이러한 차이로 거래. 그렇지 않다.(OPeN)DAP, notably .dds 응답은, 서명한 바이트, 긴, 또는 ulongs를 지원하지 않습니다, 당신은 사용할 수 있습니다ERDDAP.das와 .das의 tabular 표현http· erddap/ **(주)** _ _datasetID_.html 웹 페이지 (예를 들어,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) 다른 파일 형식이나.nccsvMetadata 응답 (예를 들어,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , 모든 상황에서 모든 데이터 유형을 지원하는 둘 다.
        
경고: 이 변화에 의해 영향을 받는 데이터셋의 경우 데이터셋에 문제가 있을 수 있습니다.ERDDAP™소스에서 읽을 수 있습니다 다른 (e.g., 이전에 integers에 서명한 것처럼 변수를 읽을 수 있습니다.) · 결과 문제는 다음과 같습니다. 데이터셋에 추가되지 않은 새로운 파일 및/또는 오류가 데이터에 액세스하려고 할 때. dataset이 문제가 있다면, 시도하는 첫 번째 것은[열심히 설정 팟캐스트](/docs/server-admin/additional-information#hard-flag)dataset를 위해. 문제가 해결되지 않으면 로그를 볼 수 있습니다. 오류 메시지를 볼 수 txt, delvedatasets.xmldataset의 경우, dataset의 datasets.xml을 다시 실행합니다.
netcdf-java 5.x에 감사 (문제의 힘) 그리고 다가오는 CF 1.9.
        
    * IMPROVED: 지금 있습니다[더 나은 문서/광고](/docs/server-admin/datasets#s3-buckets)AWS S3 버킷의 파일에서 데이터셋을 만드는 방법. Micah Wengren에게 감사.
         
    * CHANGED: 관련 몇몇 변화가 있습니다"files"시스템.
        * 이 작업을 처리하는 코드는 더 많은 클래스에 의해 사용 될 rewritten.
             
        * 새로운: 디렉토리 목록에 대한 사용자 요청은 이제 원하는 파일 확장을 승인하여 표준 일반 테이블 유형 중 하나가 될 수 있습니다. .csv,.htmlTable·.itx·.json·.jsonlCSV1·.jsonlCSV·.jsonlKVP·.mat·.nc·.nccsv·.tsv, 또는.xhtml). 예를 들어,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Kyle Wilcox 및 Shane St Savage 덕분에.
             
        * IMPROVED: 지금, 생성 데이터셋 Xml는 포함되지 않습니다&lt;accessViaFiles&gt; 태그 출력. assumption는 dataset가 새로운 값에 의존한다는 것입니다.&lt;default액세서리ViaFiles&gt; setup.xml의 태그. 이름 *[(주) 파일 형식](/docs/server-admin/datasets#accessibleviafiles)·
             
        * IMPROVED: 추가 dataset 유형은 지금 접근할 수 있는 지원합니다 파일 형식 :EDDGrid사이드 바이트,EDDGridAggregateExisting차원,EDDGrid보낸 사람Erddap, EDDTableFromErddap,EDDGridfromEDDTable, EDDTableFromEDDGrid·EDDGrid서포토 이 경우, 주어진 원격 / 어린이 데이터 세트의 파일은 부모와 원격 / 어린이 데이터 세트 모두 접근 할 수 있습니다 ViaFiles 는 true로 설정한다.&lt;defaultAccessibleViaFiles&gt;). Damian Smyth 및 Rob Fuller 덕분에.
             
        * TO DO / RECOMMENDATION : 설정하여 파일 시스템을 통해 모든 관련 데이터 세트를 이용할 것을 권장합니다.&lt;defaultAccessibleViaFiles&gt; to true in setup.xml because there is a group of users for who this is a prefer way to get data. 다른 이유로,"files"시스템은 사용자가 파일을 사용할 수 있고 마지막으로 변경 될 때 파일을 볼 수 있도록 쉽게 만듭니다. 따라서 전체 dataset의 자신의 사본을 유지하기 위해 사용하기 쉽습니다. 당신은 일반적으로 파일 시스템을 통해 액세스 할 수있는 데이터 세트를 만들려면, 설정&lt;defaultAccessibleViaFiles&gt; 에 false. 어떤 경우, 그냥 사용&lt;accessViaFiles&gt;는 일반적인 정책 설정에 예외가 되는 몇몇 datasets를 위해&lt;default액세서리ViaFiles&gt; (예를 들어, dataset 사용시.ncml 파일, 이는 사용자에게 정말 유용하지) ·
             
    * IMPROVED: 지금, 근원 dataset가 CF grid\\_mapping 정보가 있는 경우에, 생성합니다 데이터셋 gridded datasets를 위한 Xml는 세계에 정보를 추가할 것입니다&lt;addAtts&gt; 및 정보는 글로벌에 추가됩니다.&lt;sourceAtts&gt; 매번 데이터는 파일에서 읽습니다. 이 정보는 prefix grid\\_mapping\\_ 의 속성으로 dataset의 글로벌 속성에 표시됩니다.
         
    * IMPROVED: 읽을 때 그룹을 위한 지원.nc4개 (그리고 몇몇에 있는.hdf55,000원) 파일. 일반적으로,ERDDAP™dataset는 파일의 그룹 중 하나에서 변수를 구성합니다. 또한, GenerateDatasets Xml 용EDDGridfromNcFiles 및EDDGrid파일 형식 이제는 "그룹"을 요청했습니다. (e.g., "" 모든 그룹에 대한, "someGroup", "someGroup/someSubGroup", 또는 "\\[이름 *\\]"단근 그룹) · Charles Carleton 및 Jessica Hausman에게 감사하십시오.
         
    * IMPROVED: 생성 데이터셋 Xml 용EDDGridfromNcFiles 및EDDGrid파일 형식 이제 Unpacked는 사용하려면이 데이터 세트를 원하는 치수의 소스 이름을 지정할 수있는 옵션 "DimensionsCSV" 매개 변수를 지원합니다. ""를 사용하여 대부분의 치수를 사용하기 전에. 또한,이 유형의 파일로 발생 한 관련 작은 버그가 이제 고정되었습니다. Sujal Manandhar 덕분에.
         
    * BUG FIX: 생성 데이터셋 Xml는 이제 제대로 목록 "EDDTableFromJsonlCSVFiles" ("EDDTableFromJsonlCSV"가 아닙니다.) EDDType 옵션 중 하나입니다. Andy Ziegler 덕분에.
         
    * 공급 능력:EDDGrid파일 형식 이제 "units" 속성을 표준/"canonical" udunits에 표준화 (단위 변환기와 동일한 방법) · 예를 들어,"meter per second"·"meters/second"·"m.s^-1"·"m s-1"모든 것"m s-1"· Andy Ziegler 덕분에.
        
경고: 그것은 가능한 이것은 몇몇 기존하는 datasets를 위한 문제를 일으킬 것입니다 (e.g., 새로운 파일을 "배우"라고 표시) · 그래서,[열심히 설정 팟캐스트](/docs/server-admin/additional-information#hard-flag)dataset에 대한 모든 소스 파일이 새로운 시스템을 재읽을 것입니다.
        
    * IMPROVED: 이제 변수의&lt;sourceName&gt; =NaN 및 변수의 고정 값을 지정할 수 있습니다.actual\\_range무한한 범위를 지정하는 속성. 이것은 때때로 유용합니다 그래서 dataset (EDDTableFromFileNames 데이터셋) dummy 변수가 있습니다. (₢ 킹)   (e.g., 경도, 시간) NaN의 고정 값, 하지만 유효한actual\\_range  (속성에 의해 설정) · 그런 다음 고급 검색에서 사용자는 특정 위도, 경도, 시간 범위 및이 데이터 세트에 데이터를 가지고있는 데이터 세트를 검색 할 수 있습니다 관련 데이터가있을 수 있습니다. (데이터의 모든 실제 행이 NaN을 표시하지만) · 이름 *[고정 값 문서](/docs/server-admin/datasets#fixed-value-sourcenames)·
Mathew Biddle에 감사합니다.
         
    * 새로운: 지금,datasets.xmlEDDTableFromAsciiFiles 또는 EDDTableFromColumnarAsciiFiles dataset 태그를 포함 할 수 있습니다ERDDAP™지정된 정규 표현식과 일치하는 줄을 포함하여 파일의 상단에 모든 줄을 무시합니다. 예를 들어,
        &lt;건너뛰기\\*\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\*\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\*머리의 끝.\\*&lt;/skipHeaderToRegex&gt;에 대하여
"로 시작하는 줄을 포함하여 모든 줄을 무시합니다.\\*\\*\\* 머리 끝. 보기 [&lt;SkipHeaderToRegex&gt; 문서 (/docs/server-admin/datasets#skipheadertoregex) ·
Eli Hunter에 감사
         
    * 새로운: 지금,datasets.xmlEDDTableFromAsciiFiles 또는 EDDTableFromColumnarAsciiFilesdataset 태그를 포함 할 수 있습니다ERDDAP™지정된 정규 표현식과 일치하는 파일의 모든 줄을 무시합니다. 예를 들어,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

"#"로 시작하는 모든 라인을 건너 뛸 것입니다. 보기 [&lt;SkipLinesRegex&gt; 문서 (/docs/server-admin/datasets#skiplinesregex) ·
Eli Hunter에 감사.
         
    * 새로운:datasets.xml모든 EDDTable dataset에 대한 펑크는 지금 포함 &add 변수 이름 * (_attributeNamesCSV_에 대하여) · 그것이 있다면,ERDDAP™지정된 속성의 각 위젯을 추가합니다. dataset의 Data Access Form의 이름 (HTML 웹 페이지) to make it easy for users to add &add 변수 이름 * (_자격 이름, 속성 가치_) 요청으로.
이름 *[&더보기 변수 자주 묻는 질문](/docs/server-admin/datasets#addvariableswhere)·
Aurelie Briand, 외.
         
    * ₢ 킹 제삼자 공구:ERDDAP- 린트
        ERDDAP- 린트는 Rob Fuller 및 Adam Leadbetter of the Irish Marine Institute의 프로그램을 통해 메타 데이터를 향상시킬 수 있습니다.ERDDAP™데이터셋.ERDDAP-lint "contains 규칙과 간단한 정적 웹 응용 프로그램을 실행에 대한 확인 테스트ERDDAP™서버. 모든 테스트는 웹 브라우저에서 실행됩니다." 이름 *[유닉스/리눅스 lint 도구](https://en.wikipedia.org/wiki/Lint_(software)), 당신은 기존 규칙을 편집하거나 새로운 규칙을 추가 할 수 있습니다. 이름 *[ERDDAP- 린트](https://github.com/IrishMarineInstitute/erddap-lint)더 많은 정보.
        
이 도구는 특히 몇 시간 전에 생성 된 데이터 세트에 유용합니다. 현재 메타 데이터 선호도와 최신을 가져와야합니다. 예를 들어, GenerateDatasets의 초기 버전 Xml는 세계를 창조하기 위하여 어떤 노력을 둬지 않았습니다creator\\_name·creator\\_email, 제작자\\_type, 또는creator\\_url메타데이터 당신은 사용할 수ERDDAP-이 메타데이터 속성이 부족한 데이터셋을 식별합니다.
        
Rob와 Adam 덕분에이 도구를 만들고 그것을 사용할 수 있습니다ERDDAP™커뮤니티
        
    * 새로운 : 이제 파일 중 일부가 있으면 괜찮습니다.EDDGridfromFiles dataset는 dataset의 변수 전부가 없습니다. 이 파일은 변수가 있다면 포함될 것입니다. (모든 누락된 값) ·
Dale Robinson 및 Doug Latornell 덕분에.
         
    * NEW : 로그 파일에 새로운 사용 통계가 있으며 관리자가 메모리 문제를 일으킬 수있는 사용자를 식별하는 데 도움이되는 일일 보고서가 있습니다. 통계는 "OutOfMemory"로 지정됩니다. (배열 크기) ", "OutOfMemory (Too 큰) ", 그리고 "OutOfMemory (방법 너무 크) · 그들은 이러한 범주에 요청하고 그들이 만든 요청의 번호를 만든 사용자의 IP 주소를 보여줍니다. 문제가 없는 경우, 이러한 통계가 나타나지 않습니다. "아웃도어 (배열 크기) "와 "OutOfMemory (방법 너무 크) " 요청은 일반적으로 요청이 너무 크기 때문에 문제가되지 않습니다.ERDDAP™그것을 빨리 붙잡고 오류 메시지를 반환합니다. "OutOfMemory (Too 큰) "요청은 더 위험합니다.ERDDAP™그것을 깨닫기 전에 약간 노력이 요청을 처리 할 수있는 충분한 메모리가 없었다 (문제는이 요청 전에 다른 요청이 될 수 있지만) ·
        
큰 요청을 만든 사용자의 IP 주소를 보여주는 "Large Request, IP Address"라는 새로운 통계가 있습니다. (현재 Gridded.nc파일 &gt; 1기가바이트) ·
        
또한, status.html 페이지의 시간 시리즈 테이블은 이제 "memFail" 칼럼을 포함 "OutOfMemory로 실패 요청 수를 표시 (Too 큰) " 마지막 주요 Load Datasets 이후 오류. 0 개 이상의 모든 수는 적어도 우려의 원인입니다.
Bob Simons에게 감사.
        
    * NEW: 새로운 버전의Hyrax앞에 이외의 디렉토리 목록을 표시합니다.ERDDAP™이전 및 새로운 디렉토리 목록을 읽을 수 있습니다.
         
    * NEW : Dataset 재로드 및 사용자 응답 &gt; 10 초가 완료 (성공적으로 또는 실패) "으로 표시 (&gt;10s&#33;) · 따라서, 이 구문에 대한 log.txt 파일을 검색할 수 있습니다. 데이터셋을 다시로드하거나 마무리하는 요청 수를 찾을 수 있습니다. 그런 다음 dataset 문제가되었거나 사용자 요청이 무엇인지 확인하기 위해 log.txt 파일에서 더 높을 수 있습니다. 이 느린 dataset 짐 및 사용자 요구는 때때로 과세입니다ERDDAP· 그래서 이러한 요청에 대해 더 알고 당신은 문제를 식별하고 해결 할 수 있습니다.
    * IMPROVED: CF DSG 데이터 세트를 유효하게 할 때,ERDDAP™이제 cf\\_role 속성과의 변수가 해당 cdm\\_...\\_variables 목록과 다른 cdm\\_...\\_variables 목록에 있음을 보장합니다. 예를 들어, timeseriesProfile dataset에는 cf\\_role=timeseries\\_id 속성이 있는 "station\\_id" 변수가 있고, "station\\_id"는 cf\\_timeseries\\_variables 목록에 있어야 합니다. 하지만 cf\\_profile\\_variables 목록에는 안됩니다.
Micah Wengren에게 감사.
         
    * IMPROVED: 'Simplify'는 이제 더 빠르고, 더 적은 기억을 사용하고, LongArray를 돌려보낼 수 있습니다. 이름 *Unidata·
         
    * IMPROVED: QuickRestart는 지금 EDDTableFrom를 위해 더 빠릅니다 (nc 관련) 파일 형식 (EDDTableFromNcCFFiles 및 EDDTableFromInvalidCRAFiles를 제외하고) 시작하기 더 보기 (다른 장소) 이제 모든 데이터를 읽는 대신 샘플 파일 메타 데이터를 읽습니다. Jessica Austin에 감사합니다.
         
    * IMPROVED: 이제 추가 자리가 모든 0's, 예를 들어, "2020-05-22T01:02:03.456000000Z"인 경우 to-the-millisecond보다 정밀한 시간 문자열에 대한 지원이 있습니다. Yibo Jiang에 감사.
         
    * IMPROVED: GenerateDatasetsXml의 EDD.suggestDestinationName 을 제거하기 위해 사용됩니다. 지금 제거 (.\\*) 그 끝이면sourceName· 지금 제거\\[·\\*\\]그 끝이면sourceName· Julien Paul 덕분에.
         
    * IMPROVED: 생성 데이터셋 Xml는 이제 변수를 만듭니다.destinationName\\_2, \\_3, ..., 필요에 따라 독특합니다. Julien Paul 덕분에.
         
    * IMPROVED: 달력2.parseDateTime가 dd, hh, 또는 HH를 파는 경우, 첫번째 'digit'는 지금 공간일 수 있습니다.
    * KNOWN 장점: 시작하기ERDDAP™2.10,.nc속성을 변경하려고하는 ml 파일은 속성을 변경하지 않습니다. 이것은 내가보고 한 netcdf-java에서 알려진 버그이며 그들은 netcdf-java의 다음 릴리스에서 수정됩니다.
         
    * BROKEN 링크 FIX: 나는 끊긴 연결을 위해 시험을 위한 적당한 체계를 만들었습니다ERDDAP™웹 페이지, 그래서 지금 매우 몇 깨진 링크 (적어도 각 릴리스 날짜의 -- 새로운 깨진 링크는 종종) ·
         
    * BUG FIX: EDDTableFromHttpGet는 특정 유형의 요청에 실패했습니다. 이제는 없습니다. BODC에서 Emma에게 감사.
         
    * 버그 FIX: 일부 요청을 처리하려면, EDDTable은 각 요청한 변수에 대한 임시 파일로, 변수의 이름으로 종료. 변수의 이름은 압축의 유형이었다면 (예, .Z) ·ERDDAP뚱 베어 (그리고 실패) 임시 파일을 압축합니다. 이제 임시 파일 이름은 ".temp"에서 끝납니다. Mathew Biddle에 감사합니다.
         
    * BUG FIX: GenerateDatasetsXml 및 캘린더2.convertToJava날짜시간 형식은 아마도 잘못된 날짜 시간 형식을 수정하려고 할 때 잘못된 변경을 할 가능성이 훨씬 적습니다. Notably, auto-suggested dateTime 형식이 수정되지 않습니다. Mathew Biddle에 감사합니다.
         
    * 버그 FIX: 원격 URL에서 콘텐츠를 얻는 동안 오류가 발생하면 errorStream 콘텐츠가 압축되면ERDDAP™이제 제대로 오류 메시지를 압축합니다. Bob Simons에게 감사.
         
    * 버그 FIX:&lt;JoinToRemoteErddapDataset&gt;는 EDD가 적용되지 않았습니다. FromErddap dataset은 어린이 데이터 세트였습니다. 지금 그것은. Chris Romsos 덕분에.
         
    * BUG FIX: 생성 데이터셋 Xml no longer think the source variable name starting with "latin" might be latitude. Vincent Luzzo에 감사합니다.
         
    * BUG FIX: 이제, OutOfMemoryError는 사용자가 요청을 처리하는 동안 데이터 파일을 읽는 것은 BadFiles 목록에 파일을 추가하는 이유가 아닙니다. Bob Simons에게 감사.
         

## 버전 2.02{#version-202} 
 (출시 2019-08-21) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * NEW : 이제 두 가지 방법이 여러 가지 데이터 세트에 대한 검색ERDDAP· 그들은 약간 다르게 작동하고 다른 인터페이스와 옵션이 있습니다.
        
        *   [검색MultipleERDDAP사이트맵](/SearchMultipleERDDAPs.html)Bob Simons/에서NOAA NMFS SWFSC ERD·
        *   [ http://erddap.com ](http://erddap.com)Rob Fuller/The Marine Institute of Ireland에서 근무합니다.
        
원래 요청에 대한 Tylar Murray 덕분에.
         
    * IMPROVED: 요청에"files"원격 사이트에서 파일 다운로드 (예를 들어, AWS S3) 이제 리다이렉트로 리드하므로 사용자는 실제로 소스에서 데이터를 다운로드합니다. 대신 사용ERDDAP™중간에. Andy Ziegler에 감사NOAA·
         
    * NEW: 새로운 AWS S3- 관련 기능의 예로, 누구나 쉽게 검색하고 다운로드할 수 있도록 AWS S3 버킷에서 파일을 만들 수 있습니다.
        [~110 샘플 데이터 세트](https://registry.opendata.aws/)누구든지 거의 모든 콘텐츠를 검색 할 수 있습니다
        [AWS S3는 자료 물통을 엽니다](https://registry.opendata.aws/)· 클릭하시면"files"샘플 데이터셋의 모든 링크는 S3 버킷의 디렉토리 트리 및 파일을 검색할 수 있습니다. 이 datasets 작업의 방법 때문에, 이 디렉토리 목록은 항상 완벽하게 최신이기 때문에ERDDAP™을 얻 그 에 a-fly. 디렉토리 트리를 실제 파일 이름로 클릭하고 파일 이름을 클릭합니다.ERDDAP™AWS에서 파일을 직접 다운로드 할 수 있도록 AWS S3에 요청을 리디렉션합니다.ERDDAP™관리자는
        [다른 S3 버킷에 대해이 작업을 수행하는 방법에 대한 지침을 읽으십시오.](/docs/server-admin/datasets#working-with-aws-s3-files)· Andy Ziegler에 감사NOAA·
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 당신은 할 필요가 없습니다: 없음
         
    * 공급 능력:ERDDAP문자열의 배열 저장 방법 (문자열Array) 이제 훨씬 더 많은 메모리 효율적입니다. 스트레이트 배열은 전역에 사용됩니다ERDDAP™, 아마 읽기 tabular ASCII 데이터 파일. 또한 다른 변경 사항은 CSV/TSV/SSV ASCII, Columnar ASCII 및 jsonlCSV tabular 데이터 파일을 빠르고 훨씬 더 많은 메모리를 효율적으로 읽을 수 있습니다. 결과는: 764 MB ASCII 자료 시험 파일을 위해 (하지만 52MB로 압축.gz파일 형식) 3,503,266의 행 및 33의 란으로, 최대 기억 사용은 0.6GB까지 10GB에서 갔습니다 (정점에) · 읽는 시간은 ~7 분에서 갔다 (하지만 매우 다양 한 물리적 메모리 컴퓨터에서) 아래로 ~36 초 (10s를 포함 () GenerateDatasets에 의해서만 사용됩니다. 사이트맵) · 다른 많은 장소ERDDAP™이 증가된 기억 효율성에서 이득. Tylar Murray 및 Mathew Biddle 덕분에.
        
나는 다른 솔루션을 탐구 (StringArray에서 UTF-8 인코딩된 바이트 배열으로 문자열 저장) · 즉 메모리 사용이 다른 ~33% 감소하지만, ~33% 느리게의 비용으로. 현재 사용중인 시스템에 비해 나쁜 거래처럼 보입니다. 컴퓨터를 더 많은 메모리를주는 것은 쉽습니다. (더 많은 메모리를 구입 ~ $ 200) 더 빠른 것 (새로운 컴퓨터를 구입) ·
        
그것은 편리하다면, 그것은 여전히 항상 큰 tabular 데이터 파일을 여러 가지 작은 파일로 분할하는 좋은 아이디어입니다.stationID그리고/또는 시간.ERDDAP™사용자의 요청에 응답에 작은 파일 중 하나를 열고, 따라서 훨씬 빨리 응답 할 수 있습니다.
        
    * IMPROVED: 지금 있습니다[ERDDAP™AWS S3 문서](/docs/server-admin/datasets#working-with-aws-s3-files),그것을 얻는 방법ERDDAP™AWS S3 버킷의 데이터 파일로 작업합니다.
또한,ERDDAP™이제 AWS S3의 새로운 기능을 사용합니다.JavaAPI.
또한,ERDDAP™이제 AWS S3 URL을 사용하여 추가 문자를 포함 (기간, hyphen의 underscore) 물통 이름에서.
또한,ERDDAP™이제 AWS S3 버킷 URL이 특정 방식으로 식별되어야합니다.
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
접두사는 선택 사항입니다.
Andy Ziegler에 감사NOAA·
         
    * IMPROVED: 생성 데이터셋 Xml는 이제 추가 일반적인 치료missing\\_values stand-ins as missing value and so are more likely to convert a column to the numeric data type. 또한 PrimitiveArray.simplify () 이제 특정 데이터 값이 문자열의 열으로 주어진 열을 치료하기 위해 발생했습니다. Mathew Biddle에 감사합니다.
         
    * 공급 능력:&lt;requestBlacklist&gt; 지금 지원.\\*·\\*  (또는 :\\*::\\*IPv6를 위해) IP 주소의 끝에서 IP 주소의 더 큰 펑크, 예를 들어, 110.52.\\*·\\*  (중국 Unicom 천진) · 문서 보기 [&lt;요청블랙리스트&gt;] (/docs/server-admin/datasets#request블랙리스트) 중국 Unicom 및 중국 통신 덕분에.
         
    * IMPROVED: dataset의 소스가 지정되지 않는 경우"institution"속성, GenerateDatasets Xml 및 LoadDataset은 이제 "creator\\_institution" 속성에서 가져옵니다. (이용안내) · Micah Wengren에게 감사.
         
    * BUG FIX: 표준화 항상 ASCII 데이터 파일에 적용되지 않았습니다.
또한, EDDTable은 소스가 문자열 시간 값과 표준화되었을 때 시간 값에 제약을 제대로 처리하지 않았습니다. 사용 된 것.
Paloma de la Vallee 덕분에.
        
나는 명확하지 않았다 전에 상태: 당신은 단지 표준화를 사용한다 당신이 실제로 필요로 할 때 어떤 특징 (e.g., 다른 소스 파일이 다른 방법으로 시간을 저장 할 때) 표준을 사용하는 datasets에 몇몇 요구 때문에 약간 느리게 처리됩니다.
        
    * 버그 FIX: 사용 된 코드의 버그EDDGridFromNcFiles에서 실패.nc4와.hdf5 파일이 있는 "long" (int64의) 변수. 이것은 지금 조정입니다. Friedemann Wobus에게 감사.
         
    * 버그 FIX: ISO 19115 파일에 작은 변화는 다른 검증인에게 행복합니다. Chris MacDermaid 및 Anna Milan 덕분에.
         

## 버전 2.01{#version-201} 
 (출시일 2019-07-02) 

*    **새로운 기능 및 변경 (사용자 정의) ::** 
    * 없음.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 버그 FIX: Data Access Form을 생성하는 코드의 버그tabledapdatasets는 웹 페이지가 몇몇 datasets를 위해 공백이기 때문에. 또한, 나는 모든 HTML 페이지에 예상치 못한 오류의 처리를 개선 그래서 그들은 것입니다 ((주)) 오류 메시지를 표시합니다. Marco Alba에게 감사.
    * IMPROVED: 생성 데이터셋 Xml 더 이상 출력의 상단에 긴 경고를 인쇄합니다. 자주 묻는 질문[편집 Generate 데이터셋 Xml 산출](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better)· Steven Baum에 감사.
    * IMPROVED: 생성 데이터셋 Xml는 이제 다른 상황에서 약간 다른 권고를 만듭니다.&lt;EDD에 대한 EverythingNMillis&gt; ...Files datasets. 또한, GenerateDatasets Xml는 이제 EDDTableFromFiles 데이터셋을 위한 "extract"시스템을 구별합니다.

## 버전 2.00{#version-200} 
 (출시일2019-06-26) 

*    **ERDDAP™v2.00 마지막으로 여기에&#33; 예아&#33;**   
     
    * 우리는이 버전을 완료하는 데 필요한 긴 지연에 대해 사과합니다.
감사합니다.
         
    * 좋은 소식은 사용자가 요청한 기능의 더 많은 것을 추가하는 데 사용되는 것입니다. 나쁜 소식은 지연에도 불구하고 모든 요청 된 기능이 추가되지 않았습니다. 우리는 미안하지만,이 릴리스를 더 중요하게 생각합니다. (영원히?) 지속적으로 새로운 기능을 추가합니다. 우리는 미래에 더 빈번한 출시를 약속합니다.
         
    * "버전 2?&#33; 큰 변화와 불임이 있습니까?
큰 새로운 기능? 예.
관리자 또는 사용자를위한 큰 incompatibilities 또는 변경? 이름 *
우리는 v1.82에서 v2.00로 점프 :
        * 10 년을 축하하는 부분적으로 (지금 11) 첫 번째 공개 릴리스 이후ERDDAP™  (v1.00 2008-05-06에, 이는 v2.00와 같이 현저하게 봐) · 그 시간에,ERDDAP™적어도 12개의 국가에 있는 거의 100개의 임명에 1개의 임명에서 갔다 (호주, 벨기에, 캐나다, 프랑스, 인도, 아일랜드, 이탈리아, 남아프리카, 스페인, 태국, 영국, 미국) ·
        * 완전히 새로운 방향에서 주요 추가를 표시하는 부분 :ERDDAP™이제는 기존 데이터 서버 서비스로 이동하기 위한 데이터 ingest 시스템 (이름 *[다운로드](#eddtablefromhttpget)) ·
        * 그리고 이것은 1.82에서 2.00까지 큰 점프가 아니기 때문에, 이렇게 이것은 적당한 시간 같이 보입니다.
             
    * 다른 좋은 소식은 이제 두 개의 다른 그룹 기여 코드가ERDDAP™  (이 버전과 표시로 계속됩니다.) : Rob Fuller 및 Adam Leadbetter of Ireland의 해양 연구소 및 PMEL 및 Weathertop Consulting의 Roland Schweitzer. 감사합니다. 그것은 그들이 자신의 선택의 프로젝트에 작업하는 것이 사실이지만, 고전적인 오픈 소스 개발 모델 -- 그룹은 그들이 추가보고 싶은 기능에 대한 코드를 기여. 기여자에 대한 추가 혜택 : 그들은 그들이 완료 한대로 새로운 기능을 사용하게됩니다; 그들은 다음 릴리스를 기다릴 필요가 없습니다ERDDAP· 당신의 그룹은 기여도에 오신 것을 환영합니다&#33; 이름 *[ERDDAP™프로그래머의 가이드](/docs/contributing/programmer-guide)·
         
    * 우리는 당신을 좋아합니다ERDDAP™v2.00. 우리는 다음 10 년의 기대ERDDAP™개발과 전세계에 더 많은 사용.
         
*    **새로운 기능 및 변경 (사용자 정의) ::**   
     
    * 새로운:orderByMean제품정보
제품정보tabledapdatasets는 지정된 그룹에 대한 수단을 계산합니다. 또한, 모두의orderBy옵션은 이제 정의 그룹의 추가 방법을 지원: _numericVariable\\[/ 번호\\[시간단위\\]\\[:오프셋\\]\\]_, 예, 시간/1일 또는 깊이/10:5. 예를 들어,stationID, 시간, waterTemp&orderByMean (·stationID, 시간/1day”) 결과 정렬stationID그리고 시간, 그 후에 각을 위한 waterTemp의 뜻을 산출하고 돌려보냅니다stationID매일 이것은 주목할만한 유용한 강력한 새로운 기능입니다. 이 기능의 새로운 코드와 이전 코드의 변경은 Rob Fuller와 Adam Leadbetter of Ireland의 Marine Institute에 의해 기여하고 Git을 통해 제출되었습니다. 감사합니다. 롭과 아담&#33;
         
    * 새로운: tabular datasets를 위한 산출 파일 유형:[.데이터 제품정보](https://developers.google.com/chart/interactive/docs/reference#dataparam)·
JSON 파일 형식Google Visualization고객 도서관 (Google Charts) · 이 코드는 Roland Schweitzer에 의해 기여하고 Git을 통해 제출되었습니다. 감사합니다. 로랜드&#33;
         
    * 새로운: tabular datasets를 위한 산출 파일 유형:[.jsonlCSV1](https://jsonlines.org/examples/)·
현재는.jsonlCSV옵션, 그러나 첫 번째 줄에 열 이름. Eugene Burger 덕분에.
         
    * NEW : 관리자가 활성화되면 사용자는 이제 로그인 할 수 있습니다.[이름 *](https://orcid.org)계정.
OAuth 2.0 인증 시스템, Google 인증과 같은 많은. ORCID는 연구원이 독특하게 식별하는 데 널리 사용됩니다. ORCID 계정은 무료이며 Google 계정이 있는 개인 정보 보호 문제가 없습니다. 이름 *ERDDAP이름 *[Orcid 인증 지침](/docs/server-admin/additional-information#orcid)· BCO-DMO에 감사 (Adam Shepard, Danie Kinkade 등) ·
         
    * NEW: 새로운 URL 변환기는 최신 URL을 최신 URL로 변환합니다.
참조 .../erddap/convert/urls.html 어떤 것에ERDDAP™설치, 예를들면,
        [이 링크에서 변환기에ERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html)· 데이터 관리자에게 유용해야합니다. 이것은 GenerateDatasetsXml에 의해 내부적으로 사용됩니다. Bob Simons와 Sharon Mesick에게 감사하십시오.
         
    * IMPROVED: 그렇습니다[시간 변환기](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)이제는 ISO8601 문자열로 일반적인 문자열 시간을 변환하는 옵션이 있습니다.UDUNITS- 같은 시간 단위 문자열을 적절하게UDUNITS시간 단위 끈. 이것은 또한 유용해야한다ERDDAP™문자열 시간 변수에 대한 "units" 속성을 지정하는 형식을 알아야하는 관리자. 이것은 GenerateDatasetsXml에 의해 내부적으로 사용되고 EDDTableFromFiles의 standardizeWhat 특징. Bob Simons에게 감사.
         
    * 새로운:[단위 변환기](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)새로운 "Standardize UDUnits" 옵션이 있습니다.
예를 들어, "deg\\_C/m"과 "degrees\\_C meter-1"는 둘 다 변환됩니다.
"도 \\_C m-1". 이 기능은 또한 EDDTableFromFiles의 standardizeWhat 특징에 의해 사용됩니다. Bob Simons에게 감사.
         
    * NEW: 그래프의 경우 (표면 그래프보다 다른) griddap의 및tabledap's Graph 웹 페이지를 만드십시오. x 축이 시간 축이 아니며 x 축 가변 범위의 하위 세트 만 볼 수 있습니다. 이제 그래프 위의 버튼이 X 축 왼쪽 또는 오른쪽으로 이동합니다. Carrie Wall Bell / Hydrophone 프로젝트 덕분에.
         
    * NEW : 그래프의 경우 X 및 / 또는 Y 축은 로그 스케일을 사용할 수 있습니다.
사용자는 griddap에 새로운 드롭다운 위젯을 통해 Y축 스케일을 제어 할 수 있습니다.tabledapGraph 웹 페이지를 만드십시오. 이름 *[.xRange 및 . yRange 문서](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange)· Carrie Wall Bell / Hydrophone 프로젝트 덕분에.
         
    * 공급 능력:ERDDAP™이제 다양한 HTTP 오류 코드의 더 나은 사용을 만들 지금 반환(OPeN)DAPv2.0 형식 오류 메시지 페이로드. 이름 *[자주 묻는 질문](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors)· Antoine Queric 및 Aurelie Briand 덕분에.
         
    * IMPROVED: 연결하기 위하여 Netcdf-java/c 또는 다른 소프트웨어 공구를 사용하지 마십시오.nc또는.hdf에 의해 제공ERDDAP's /files/ system as if they was local files.ERDDAP™이제 이러한 요청을 거부합니다. 그것은 horribly 계수이고 수시로 다른 문제를 일으키는 원인이 됩니다. 대신:
        
        * 제품 정보(OPeN)DAP클라이언트 소프트웨어에 연결하기ERDDAP이름 *DAPdataset에 대한 서비스 (/griddap 또는 /가 있는 경우tabledap/ URL에서) · 그게 뭐DAP너무 잘.
        * 또는 dataset의 Data Access Form을 사용하여 데이터의 하위 설정을 요청합니다.
        * 또는 전체 파일을 필요로하거나 장시간에 접근을 반복하면 사용curl·wget, 또는 브라우저 전체 파일을 다운로드, 다음 파일의 로컬 복사에서 데이터를 액세스.
        
          
         
    * IMPROVED: 에ERDDAP™홈페이지, Full Text Search는 이제 "모든 Datasets의 목록보기"를 통해 대부분의 사용자를위한 최고의 시작점입니다. Didier Mallarino 및 Maurice Libes 덕분에.
         
    * IMPROVED: DataProviderForm3.html에 현재 공통의 드롭다운 목록이 있습니다.standard\\_name· IOOS DMAC 회의에서 누군가에게 감사.
         
    * IMPROVED: /files/ 웹 페이지에, 이제 새로운 링크가 있습니다 "이 파일로 무엇을 할 수 있습니까?" /files/ 문서의 섹션. 그 섹션은 다양한 파일 유형을 설명하고 그들과 함께 일하는 방법을 제안한다. Maurice Libes 덕분에.
         
    * IMPROVED: 거의 각 요구에ERDDAP™적어도 조금 더 빠릅니다, 때로는 훨씬 빨리.
         
    * 버그 FIX: 몇몇 상황에서, EDDTable dataset가 몇몇 유형의 저장된 자료의 때.nc파일, 글로벌 "id" 속성은 파일의 제안 된 이름에 설정되었다, 이는 그 요청에 고유하게 만드는 해시를 포함. 이제 "id"는 제대로 변경되지 않았습니다. (지정된 경우) 또는 dataset의 설정datasetID  (지정하지 않은 경우) · John Maurer에게 감사.
         
*    **기타ERDDAP™관리자는 알아야 할:**   
     
    * TO DO: 이 릴리스는 몇 시간 걸릴 것입니다 그리고 당신에게서 일. 환자와 계획이 필요한 변경을 수행하고 새로운 기능으로 실험하는 몇 시간.
         
    * TO: 안전을 위해, 당신의 current setup.xml의 백업 사본을 만들고datasets.xml파일 그래서 당신은 당신이 반전 할 필요가있는 다른 경우에 그들에 반전 할 수ERDDAP™v1.82 니다.
         
    * TO DO: 추천Java지금 AdoptOpenJDK의 OpenJDK 8개 (사이트맵) + 핫스팟.
이것은 오픈 소스 변형입니다Java해당 이용에 제한이 없습니다. (다른 언어Oracle이름 *Java제품정보) · 그것은에서 파생됩니다Oracle이름 *Java길에서Oracle's 축복. 보안상의 이유로, 당신의 것을 지키는 것이 중요합니다Java최신 버전. 이름 *ERDDAP이름 *[Java설치 설명서](/docs/server-admin/deploy-install#java)·
         
    * 계속: AdoptOpenJDK의JavaTomcat 설치에 작은 추가가 필요합니다.[리소스 캐시 지침](/docs/server-admin/deploy-install#contentxml)· -XX:MaxPermSize 설정에 대한 교체라고 생각합니다. (채용안내) OpenJDK 더 이상 지원하지 않습니다.
         
    * TO DO: 새로운 기본 및 추천&lt;settings.xml의 fontFamily&gt; 설정은
AdoptOpenJDK로 구축 된 DejaVu SansJava· 이름 *
        [수정된 글꼴 임명 지시](/docs/server-admin/deploy-install#fonts)·
         
    * TO DO: 많은 태그는 setup.xml에서datasets.xml· 이점은 당신이 그들의 가치를 바꿀 수 있다는 것입니다ERDDAP™실행, 재시작 없이ERDDAP· 쉽게 변경할 수 있습니다.&lt;startBodyHtml5&gt; 에 임시 메시지를 표시ERDDAP™홈 페이지 (e.g., "새로운 JPL MUR SST v4.1 데이터 세트를 체크 아웃 ..."또는 "이ERDDAP™2019-05-08T17:00:00 PDT - 2019-05-08T20:00:00 PDT) · 이 태그를 바꿀 때datasets.xml, 변화는 효력을 다음 시간 가지고 갈 것입니다ERDDAP™지원하다datasets.xml·
         
        
        1. 이 콘텐츠에 복사하기datasets.xml파일 (파일의 시작 근처에는, 후&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One-by-one, 값을 복사 (이름 *) 당신의 setup.xml 파일에서 새 태그로 각 태그에 대한 (이름 *) 내 계정datasets.xml· 예를 들어, 30의 값을 사용하는 경우&lt;캐시미트&gt; setup.xml에서, 당신은 새로운 값을 복사해야합니다&lt;cacheMinutes&gt; 태그에datasets.xml  (값이 새로운 기본 값과 동일하지만, 태그를 그대로 두는 것이 가장 좋습니다.datasets.xml회사 소개) ·
            
값이 새로운 제안 된 기본 (다른 것보다&lt;startBodyHtml5&gt; 및&lt;theShortDescriptionHtml&gt;, 이는 사용자 정의에 유용합니다ERDDAP™설치), 새로운 기본 값으로 전환을 고려하시기 바랍니다. 이것은 특히 사실이다&lt;부분RequestMaxBytes&gt; 및&lt;부분RequestMaxCells&gt;, 기본값/suggested 값이 수년 동안 크게 바뀌었다.
            
각 값을 복사 한 후, 태그를 삭제하고 setup.xml의 설명. 이 태그가 더 낫습니다.datasets.xml· 그리고 이제 더 나은 설명이 있습니다.[설정DatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file)·
            
        
새로운 시스템의 quirk는 당신이 시작 할 때 매우 첫 번째 웹 페이지입니다ERDDAP기본값은ERDDAP™웹 페이지. 모든 후속 웹 페이지는 ...Html 콘텐츠를 사용하여 지정합니다.datasets.xml·
        
    * 경고: 당신이 달리는 첫번째 시간ERDDAP™v2.0, 로컬 데이터 파일에 근거한 datasets는 적재할 것입니다 **이름 *** 천천히ERDDAP™약간 다른 형식으로 파일의 데이터베이스를 재구성해야합니다. 느린 처음 재부하 후에, 그들은 빨리 적재할 것입니다. 진료시간
         
#### 다운로드{#eddtablefromhttpget} 
    *   [큰 새로운 기능: EDDTableFromHttpGet](#eddtablefromhttpget)  
지금까지ERDDAP™그냥 데이터를 읽고 사용자에 사용할 수. 지금,ERDDAP™센서에서 실시간 데이터를 섭취하는 간단한 효율적인 시스템입니다. 다른 기능 중, 이 dataset는 정밀한 편두질 버전을 제안합니다: 그것은 dataset에 한 각 변화를 기억합니다, 때 그것은 만들고, 누구에 의해. 일반적으로 사용자는 적용된 모든 변경 사항과 함께 dataset의 최신 버전을 원합니다. 그러나 사용자가 데이터 세트에서 데이터를 요청할 수있는 옵션이 있습니다. 이것은 재현성 과학을 촉진합니다. 따라서 대부분의 다른 실시간 데이터셋과는 달리, 이러한 데이터셋은 해당 데이터셋에 해당됩니다.[DOI₢ 킹](https://en.wikipedia.org/wiki/Digital_object_identifier)· 그들이 만나기 때문에DOIdataset가 통하지 않는 요구 사항, 집계를 제외하고. 이름 *[다운로드](/docs/server-admin/datasets#eddtablefromhttpget)· OOI에 감사 (지금 시작) 이와 유진 버거의 필요에 대해 이야기하는 것은 중요한 일에 대해 생각한다.
         
    * 큰 새로운 기능:ERDDAP™외부 압축 데이터 파일에서 데이터를 직접 제공 할 수 있습니다..tgz·.tar.gz·.tar.gzip·.gz·.gzip·.zip·.bz2, 또는 .Z. Datasets는 외부 압축 파일의 혼합을 포함할 수 있습니다 (아마도 오래된 데이터 파일?) 그리고 non-externally-compressed 파일, 당신은 언제든지 파일을 압축/decompress 할 수 있습니다.
        
이 작품은 훌륭합니다&#33;
대부분의 경우, 파일 압축과 관련된 느슨한은 미성년자입니다. 우리는 강력하게 당신이 이것을 시도하는 것을 격려합니다, infrequently 사용되는 datasets와/또는 자료 파일을 위해 notably.
        
이것은 당신을 저장할 수 있습니다 $30,000 이상&#33;
이것은 몇 가지입니다.ERDDAP™데이터를 저장하기 위해 많은 돈을 절약 할 수있는 기능 -- 많은 데이터 파일을 압축하면 훨씬 적은 RAID / 하드 드라이브가 데이터 저장하거나 반대적으로 더 많은 데이터를 제공 할 수 있습니다. (최대 10x) 이미 RAID와 함께. 이 기능은 다른 RAID를 구입에서 당신을 저장하면 약 $ 30,000에 대해 저장했습니다.
        
이름 *[외부 압축 파일 문서](/docs/server-admin/datasets#externally-compressed-files)· Benoit Perrimond와 Paloma de la Vallee 덕분에.
        
    * 큰 새로운 기능: 모든 것EDDGridfromFiles 및 모든 EDDTableFromFiles 데이터셋 지원&lt;cacheFromUrl&gt; 태그와&lt;cacheSizeGB&gt; 태그. cacheSizeGB가 지정되지 않은 경우, 이 다운로드 및 원격 데이터셋의 파일의 전체 복사를 유지합니다. cacheSizeGB가 지정되고 &gt;0인 경우, 필요한 원격 데이터셋에서 파일을 다운로드할 수 있으며, 제한된 크기로 로컬 캐시로 클라우드 기반 작업을 할 때 유용합니다. (예, S3) 데이터 파일. 이름 *[뚱 베어 InUrl 문서](/docs/server-admin/datasets#cachefromurl)상세 정보 Bob Simons와 Roy Mendelssohn 덕분에 (몇 년 동안 원격 데이터셋 파일의 로컬 복사를 처리하는 스크립트를 작성했습니다.) , Lloyd Cotten의 유진 버거, Conor Delaney (Amazon Web Services에서 되었을 때) , 그리고 구글 클라우드 플랫폼.
         
    * 새로운: 새로운 EDDTableFromJsonlCSV class는 tabular 데이터를 읽을 수 있습니다.
        [구글 맵 라인 CSV 파일](https://jsonlines.org/examples/)  (" CSV보다 더 나은") · 이 형식과 유진 버거 및 PMEL에 대해 말해주는 Marine Institute of Ireland의 사람들에게 감사하십시오.
         
    * 새로운: 모두EDDGrid그리고 모든 EDDTableFromFiles datasets 지원&lt;nThreads&gt; 설정, 이는 말한다ERDDAP™요청에 응답 할 때 사용하는 많은 스레드가 얼마나. 이름 *[nThreads 문서](/docs/server-admin/datasets#nthreads)상세 정보 Axiom Data Science, Eugene Burger, Conor Delaney의 Rob Bochenek에게 감사하십시오 (Amazon Web Services에서 되었을 때) , 구글 클라우드 플랫폼.
         
    * 새로운 표준화 모든 EDDTableFromFiles 하위 클래스에 대해 -
이전, 주어진 변수의 경우, 중요한 속성의 값 (₢ 킹scale\\_factor·add\\_offset·missing\\_value, \\_FillValue, 단위) 일관적이지 않은, EDDTableFromFiles는 "valid"이며 "Bad Files"로 다른 속성 값으로 파일을 표시 할 각 속성에 대한 하나의 값을 선택할 것입니다. 이제 EDDTableFromFiles가 파일을 읽을 때 파일을 표준화하는 시스템이 있습니다. 이름 *[EDDTableFromFile의 표준화 이름 *](/docs/server-admin/datasets#standardizewhat)· 한국어ERDDAP's main goal is to make data files and datasets access in a 일관된 방식으로. 표준화 중요한 새로운 도구는 현실을 만드는 것입니다. Marco Alba, Margaret O'Brien에게 감사 (다른 EML 사용자) , BCO-DMO 및 InPort 사용자.
         
    * NEW EDDTableFromInvalidCRAFiles를 사용하면 데이터 세트를 수집 할 수 있습니다.NetCDF  (v3 또는 v4)  .nc특정, 잘못된, CF DSG Contiguous Ragged Array의 변형을 사용하는 파일 (사이트맵) 파일. 이 dataset 유형을 위한 표본 파일은에서 찾아낼 수 있습니다 https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020년 10월 21일 이 서버는 현재 사용할 수 없습니다.\\]· 그러나ERDDAP™이 파일 형식을 지원, 그것은 잘못된 파일 유형은 아무도 사용 시작해야. 이 파일 형식을 사용하는 그룹은 강력하게 사용하도록 권장합니다.ERDDAP™유효한 CF DSG CRA 파일을 생성하고 이 파일을 사용하여 중지합니다. Ajay Krishnan 및 Tim Boyer 덕분에.
         
    * EDDTableThreddsFiles 및 EDDTable에서Hyrax파일이 이제 deprecated. EDDTableFromNcFiles로 전환하십시오 (또는 변형) 더 보기&lt;cacheFromUrl&gt;. 어떤 이유로 작동하지 않는 경우, 이메일erd.data at noaa.gov· 2020년 전 불만이 없는 경우, 이러한 데이터셋 유형이 제거될 수 있습니다.
         
    * 임프린트 -- ISO 8601배 ISO 8601배로 자동 변환을 위한 체계 (소개 v1.82) 많은 형식을 처리하기 위해 크게 확장되었습니다. GenerateDatasetsXml에 영향을 미칩니다.ERDDAP소스 메타데이터의 취급.
         
    * 임프린트 -- String time parsing system의 세 번째 주요 개정 (마지막으로) ·ERDDAP™더 이상 사용Java's DateTimeFormatter 때문에 버그가 극단적으로 시간에 영향을 미치는 (년&lt;=0000).ERDDAP™이제는 시간 문자열을 파싱하기위한 자체 시스템을 사용합니다.
         
    * 경고 : 새로운 문자열 시간 파싱 시스템은 다소 엄격합니다. 데이터 세트 중 하나가 갑자기 시간 값에 대한 누락 된 값을 가지고 있다면, 원인은 거의 확실히 시간 형식 문자열이 약간 잘못되어있다. 로그에 오류 메시지가 있어야 합니다. 시간 형식과 일치하지 않은 시간 값과 관련 된 txt -- 그 dataset에 대한 시간 형식 문자열을 수정하는 데 도움이되어야한다. 도움이 필요한 경우, 옵션 사용ERDDAP"Convert"의 시간 변환기\\[₢ 킹\\]어떤 일반적인 문자열 시간 ISO 8601 문자열 시간" -- 그것은 소스 문자열을 파는 데 사용되는 변환기 형식을 나타냅니다.
         
    * RECOMMENDATION: 가장 빠르고 쉬운, 가장 싼 방법ERDDAP's access to tabular data is to put data files on 솔리드 스테이트 드라이브 (SSD) · 대부분의 tabular datasets는 상대적으로 작습니다, 그래서 1개 2 TB SSD는 아마 당신의 tabular datasets 전부를 위한 모든 자료 파일을 붙들게 충분합니다. SSD는 결국 셀에 데이터를 작성하면 삭제하고, 새로운 데이터를 그 세포에 너무 많은 시간을 쓸 수 있습니다. 대신, 나는 그것을 추천합니다 (가능한 한 많은) SSD를 사용하여 데이터를 한 번 작성하고 여러 번 읽으십시오. 그런 다음 소비자 등급 SSD는 오랫동안 지속되어야하며 하드 디스크 드라이브보다 훨씬 더 길어졌습니다. (HDD 하드 디스크) · 소비자 등급 SSD는 이제 저렴합니다. (에서 2018, ~$200 에 대한 1 TB 또는 ~$400 에 대한 2 TB) 그리고 가격은 아직도 빠릅니다. 시간 :ERDDAP™데이터 파일에 액세스, SSD 모두 제공
        
        * 연락처 (~0.1ms, HDD의 경우 ~3ms, versus ~10 (·) RAID에 대한 ms, 아마존 S3에 대한 ~55ms) ·
        * 높은 처리량 (~500 MB/S, RAID를 위한 HDD versus ~500 MB/s) ·
        
그래서 ~10X 성능 향상까지 얻을 수 있습니다. (HDD 대) 에 $200&#33; 시스템에 가장 다른 가능한 변화와 비교 ($ 10,000의 새로운 서버? $35,000의 새로운 RAID? $ 5,000의 새로운 네트워크 스위치? 기타) , 이것은 투자에 가장 좋은 반환에 의해 (투자정보) · 서버가 메모리로로드되지 않으면 서버의 추가 메모리는 모든 측면을 가속화하는 크고 상대적으로 저렴한 방법입니다.ERDDAP·
        \\[SSD의 Gridded 데이터에 대 한 좋은 것, 너무, 하지만 대부분의 Gridded 데이터 세트는 훨씬 더, SSD를 매우 비싼 만들기.\\]  
         
    * NEW : 로그인 한 사람은 역할 =\\[로그인 내 계정\\], 거기도&lt;user&gt; 태그에서datasets.xml· dataset를 설정하면&lt;accessTo&gt;에\\[로그인 내 계정\\]로그인하신 분ERDDAP™  (e.g., Gmail 또는 Orcid 계정을 통해) 지정하지 않은 경우에도 dataset에 액세스 할 수 있습니다.&lt;user&gt; 태그에서datasets.xml· Maurice Libes 덕분에.
         
    * IMPROVED: 그렇습니다UDUNITS/UCUM 단위 변환기는 광대하게 개량되었습니다.
그것은 잘못된 단위 문자열을 더 잘 처리 (사전예약에 중점을 두고, 유효성을 고려하지 않고) · 또한, 결과는 표준화 된 구문이 있습니다.
         
    * 새로운:UDUNITS/UCUM 단위 변환기는 표준화하는 새로운 선택권이 있습니다UDUNITS문자열.
이 작품은 잘 사용 가능UDUNITSun-standard/invalid를 위해 문자열과 reasonably 잘UDUNITS문자열. 예를 들어, 예를 들어,UDUNITS초당 ="meters", "meter/second","m.s^-1"·"m s-1"모든 반환 "m.s-1". 이것은 새로운 표준화에 필요한 위에 설명 된 시스템. Marco Alba, Margaret O'Brien에게 감사 (다른 EML 사용자) , BCO-DMO 및 InPort 사용자.
         
    * 새로운: EDDTableFromMultidimNcFiles 지금 있다[치료방법As](/docs/server-admin/datasets#treatdimensionsas)옵션, 즉 말한다ERDDAP™특정 차원을 대우하기 (예, LAT 및 LON) 다른 차원이 있다면 (예, 시간) · 이것은 어떤 incorrect 파일에 유용할 때 다른 변수에 대 한 다른 크기를 사용 해야 하나 차원 (예, 시간) · Marco Alba와 Maurice Libes 덕분에.
         
    * 새로운: 지금, 모두EDDGrid...Files datasets는 새로운 특수 축을 지원합니다.sourceName이름 *ERDDAP™fileName의 정보를 추출 (파일이름.ext) 그리고 값을 사용하여 **기타 제품** 기존의 좌우축 값. 형식은
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
이름 *[이 문서](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)· 감사합니다.NOAAPathfinder 매일 집계 dataset.
         
    * 새로운: 지금, 모두EDDGrid...Files datasets는 새로운 특수 축을 지원합니다.sourceName이름 *ERDDAP™파일의 pathName에서 정보를 추출하기 (디렉토리 + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
이것을 위해, 경로 이름은 항상 사용합니다'/'디렉토리 구분 문자로, 절대 '\'.
이름 *[이 문서](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)· Paloma de la Vallee 덕분에.
         
    * 새로운: 지금, 모든 EDDTableFrom... Files datasets 지원 추가 가짜 변수sourceNamefileName에서 정보를 추출하는 s (파일이름.ext)   (이름 *[\\*\\*\\*파일이름](/docs/server-admin/datasets#filename-sourcenames)) 또는 파일의 전체 pathName에서 (/dir1/dir2/filename.ext의 경우)   (이름 *[\\*\\*이름 *](/docs/server-admin/datasets#pathname-sourcenames)) · Paloma de la Vallee 덕분에.
         
    * 새로운:EDDGriddataset에는 1개 이상 아주 큰 차원이 있습니다 (e.g., 수백만의 가치) 많은 메모리를 가지고, 당신은 새로운 설정할 수 있습니다 [&lt;치수ValuesInMemory&gt;] (/docs/server-admin/datasets#dimensionvaluesinmemory) false로 설정 (기본값은 true입니다.) dataset가 디스크에 값을 저장하고 필요할 때 검색합니다. David Rodriguez와 Rich Signell에게 감사 (재:EDDGrid파일 형식) ·
         
    * IMPROVED: 이전, 당신이 주문한 경우에dataVariables for EDDTableFromFiles dataset and reloaded the dataset, EDDTableFromFiles will reread all of datafiles. 이제 데이터 파일의 모든 것을 재읽지 않고 재주문을 처리 할 수 있습니다. Roland Schweitzer에게 감사.
         
    * IMPROVED: 지금, 때ERDDAP™ASCII, NCCSV 및 JSON Lines CSV 탭 데이터 파일을 읽으면 주어진 줄에 오류가 발견됩니다. (e.g., 항목의 잘못된 수) , 그것은 경고 메시지를 기록 ("WARNING: Skipping line #"... "상품의 예상치 못한 수...") 으로[log.txt 파일](/docs/server-admin/additional-information#log)그런 다음 데이터 파일의 나머지를 읽을 수 있습니다. 그러므로, 그것은 당신의 책임은 주기적으로 보입니다 (또는 스크립트를 작성하여) 로그에 그 메시지. txt 그래서 당신은 데이터 파일에 문제가 해결 할 수 있습니다.ERDDAP™이 방법을 설정하므로 사용자는 파일의 일부 줄이 결함이있는 경우에도 사용 가능한 모든 데이터를 읽을 수 있습니다. 이전,ERDDAP™"bad"로 파일을 표시하고 dataset에서 제거하십시오.
         
    * IMPROVED: 정확한 시간 (e.g., 가장 가까운 초 또는 millisecond에) 소스에 저장되어 있기 때문에 "분 ..." (더 큰 단위) ·ERDDAP™이제 값에 값을 읽을 때 가장 가까운 밀리 초에 해당합니다.ERDDAP· 그렇지 않으면 부동점 번호는 특정 시간에 데이터에 대한 bruised 및 요청입니다. (e.g., &time=2018-06-15T01:30:00) 실패합니다. 너무 이른, 그것은 가능한 한 정확하게 계산 (그리고 여전히 단위가 e.g. 인 경우, "둘째 ..."또는 "밀리 초 ...") · 큰 단위를 사용하지 않고이 문제를 방지하는 것이 좋습니다. (e.g., 분 또는 시간) 정확한 시간 값 저장 (예를 들어, microseconds) -- 컴퓨터는 소수 손가락을 처리하는 가난한 일을 합니다. Marco Alba에게 감사.
         
    * EDDTable로 변경EDDGrid그것은 훨씬 더 나은. EDDTable에서EDDGriduser query gridded datasets as if they were tabular datasets 를 지정한다. ("값으로 정함") ·
        
        * 지금 지원&lt;maxAxis0&gt; 태그 (기본값=10) 최대 축을 지정합니다.\\[0 댓글\\]  ((주)"time") 한 번에 queried 할 수있는 값. 이것은 EDDTableFrom 얻기에서 네이티브 요청을 방지EDDGrid전체 Gridded dataset을 통해 검색하기 (timeout 오류가 발생) ·
        * Generate데이터셋 Xml는 지금 EDDTableFrom 생성하는 선택권이 있습니다EDDGrid주어진에 있는 gridded datasets의 모두를 위한 datasetsERDDAP™지정된 regex와 일치 (사용 .\\* 모든 datasets 일치하기) · 생성하는 데이터 세트는 요약 속성에 추가 정보가 표시되어 그리드 데이터 세트의 탭 버전입니다. 그리고 그들의datasetID이름 *datasetIDgridded dataset의, 플러스 "\\_AsATable".
        * 가장 일반적인 설정에 대한 큰 속도가 있습니다. gridded dataset이 될 때EDDGridfromErddap dataset 같은ERDDAP·
        
James Gallagher 및 Ed Armstrong 덕분에.
         
    * NEW: 생성 데이터셋 모든 유형의 데이터 세트에 대한 Xml는 이제 훨씬 더 많은 가능성이 \\_FillValue 또는missing\\_valuenumeric 변수의 속성addAttributes· 예를 들어, string 누락된 값 마커가 발생할 때 발생합니다. (예, "", ".", "?", "NA", "nd", "NaN") 샘플 파일의 변수에 대한 변환ERDDAP기본 누락 값 (byte 열에 127, 짧은 열에 32767, 2147483647 int 열, 9223372036854775807 긴 열 및 NaN in float 및 더블 변수) · float 및 double 변수의 NaN 값도 발생합니다. 또한, "nd"는 숫자 데이터 열의 일반적인 누락 값 감적 목록에 추가되었습니다.ERDDAP™견적 요청 BCO-DMO의 Matt Biddle 덕분에.
         
    * IMPROVED: 생성에 있는 ncdump 선택권 데이터셋 Xml는 이제 더 ncdump처럼 (하지만 여전히 ncdump의 netcdf-java 버전을 사용) · 이제 새로운 옵션 목록을 인쇄합니다. 지금,.ncml 파일, 결과에 대한 ncdump 출력을 인쇄.nc밑에 적용된 ml 파일 변화.nc또는.hdf파일.
         
    * 버그 FIX: 파일 핸들 누출이 있었다 (결국 원인ERDDAP™관련 기사) 몇몇 유형의 출력 파일을 창조할 때, 예를들면, .geotif, 창조 도중 오류가 발생될 때. 나는 생각/이 지금은 모든 고정. 문제가 발생하면 dataset의 유형을 알려주십시오. (격자 또는 테이블) 그리고 문제를 일으키는 파일의 유형. Steven Beale, Lynn DeWitt, Jibei Zhao 및 다른 사람 덕분에.
         
    * 버그 FIX: 더 보기WMS Leaflet데모는 완전히/프로그래서 "깊은"축을 "해발"으로 변환하지 않았습니다. 이제, 그것은, 그리고 깨진 전설 요청이 고정됩니다. 또한 드롭다운 목록의 모든 축 옵션은 항상 ascending 정렬 순서입니다. Antoine Queric 및 Aurelie Briand 덕분에.
         
    * BUG FIX : EDDTableFromFiles는 이제 데이터 파일에서 char 변수에서 생성 된 문자열 변수에 constraints를 올바르게 지원합니다. Antoine Queric 및 Aurelie Briand 덕분에.
         
    * 버그 FIX: 이제 데이터셋이 사용할 수 없을 때 데이터셋이 알림을 해제합니다. (메시지 "이 데이터 세트는 현재 사용할 수 없습니다.") 그 가입자, 나열된 작업, rss 및 lonPM180 데이터 세트에 의존합니다. 로이 Mendelssohn 및 Bob Simons 덕분에.
         
    * 버그 FIX: EDDTableCopy와 관련된 두 가지 버그. Sam McClatchie에게 감사.
         
    * IMPROVED: 상태.html 페이지에 표시된 실패한 요청의 수는 이전 보다는 실패로 계산되기 때문에 증가할 것입니다.
         
    * 공급 능력:ERDDAP's status.html'은 이제 "Requests (ms의 미디어 시간) "시간 시리즈. 너무 이른, 그것은 integer 초에 truncated 미디어 시간.
         
    * IMPROVED: jsonld 산출에서, jsonld “name”는 지금 dataset의 옵니다"title"내 계정ERDDAP, jsonld "headline" 이제 dataset의 "에서 온다datasetID"에서ERDDAP· 너무 이른, 그것은 반전되었다. 이것은 정상적인 영어 사용 때문에 나에게 잘못 보인다, "이름"은 일반적으로 짧은, (제품 정보) 거의/never가 변화하는 고유 식별자 (e.g., 로버트 Middlename 사이먼) , 독특하지 않는 설명 및 쉽게 변경할 수 (e.g., "A guy who writes software 용NOAA" vs. "소프트웨어를 쓰는 키 큰 녀석NOAA·) · Gee, schema.org 정의의 경우 큰 것[이름 *](https://schema.org/name), Dataset의 컨텍스트에서, 더 구체적이었다. 소프트웨어 개발자는 전문가의 지침없이 사양에 따라 사양의 구현을 작성할 수 있어야 합니다. 그러나 나는 Google에 defer (나타샤 이름 *) 의 NCEI (존 릴프) , 그리고 Rob 풀러.
         
    * IMPROVED: jsonld 산출에서, 4개의 “spatialCoverage GeoShape 상자” 가치는 지금 minLat minLon maxLat maxLon입니다. 너무 이른, lat 및 lon 위치는 반전되었다. Gee, schema.org 정의의 경우 큰 것[사이트맵](https://schema.org/GeoShape)지정된 순서. 소프트웨어 개발자는 전문가의 지침없이 사양에 따라 사양의 구현을 작성할 수 있어야 합니다. Natasha Noy 및 Rob Fuller 덕분에.

## 버전 1.82{#version-182} 
 (출시일 2018-01-26) 

*    **새로운 기능 (사용자 정의) ::**   
     
    * 수많은 미묘한 변화는 봅니다.ERDDAP™웹 페이지.
        * 공급 능력:ERDDAP™이제 HTML 5을 사용하고 CSS를 더 잘 사용합니다.
        * IMPROVED: 웹 페이지는 약간 그(것)들을 더 청결한 만들고 “busy”. (그들은 여전히 감당하고 여전히 것들이 하나에 대해 불평 할 수 있습니다, 그러나 너무 너무 많은 희망.) 존 Kerfoot 덕분에 몇 가지 의견.
        * IMPROVED : 웹 페이지는 이제 휴대 전화 및 기타 작은 장치에서 훨씬 더 잘 보입니다. 특히 풍경 방향에서 사용한다면. 또한 데스크톱 브라우저에서 매우 작고 매우 큰 창문에서 잘 보입니다.
        * IMPROVED: 보안과 다른 이유를 개량하기 위하여는, 최신 Openlayers 버전의 사용WMS데모 페이지가 대체되었습니다.Leaflet·
        * NEW : 이미지, 오디오 및 비디오 파일의 미리보기 지원"files"시스템 (예를 들어,[이 시험 자료 세트](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) ·.htmlTable셀이 이미지, 오디오 또는 비디오 파일의 URL을 가질 때 응답 (예를 들어,[이 요청](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) · '?' 아이콘을 넘어 있다면 이미지, 오디오, 비디오 파일 미리보기를 볼 수 있습니다. 브라우저에서 파일 전체 화면을 볼 수도 있습니다. 이름 *[Media Files 문서](/docs/server-admin/datasets#media-files)· 다른 브라우저가 다른 파일 유형을 지원한다는 것을 참고하십시오, 그래서 예는 브라우저에서 작동하지 않을 수 있습니다.
CSS 전용 이미지 도구에 대한 아이디어 및 샘플 코드에 대한 이러한 사람들 / 링크 덕분에 (에 의해 https://codepen.io/electricalbah/pen/eJRLVd ) and deferred 이미지 로딩 (에 의해 https://varvy.com/pagespeed/defer-images.html )   (코드가 사용하기 전에 수정되었지만ERDDAP) ·
Cara Wilson, Matthew Austin 및 Adam Shepherd / BCO-DMO가 이미지 지원 요청 주셔서 감사합니다.
Jim Potemra, Rich Signell, OOI 및 Carrie Wall Bell에 대한 감사 오디오 / 하이드 폰 파일 지원에 대한 요청에 대한.
OOI에게 영상 지원을 위한 필요를 보여주기 위하여 감사합니다.
        * NEW : 모든 데이터의 하위 세트ERDDAP™데이터셋 (그러나 일반적으로 오디오 파일에서 dataset) 이제 .wav 오디오 파일에 저장할 수 있습니다. ([관련 기사](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Jim Potemra, Rich Signell, OOI 및 Carrie Wall Bell에 대한 감사 오디오 / 하이드 폰 파일 지원에 대한 요청에 대한.
        * IMPROVED: 웹 접근 가능한 폴더를 위한 체재 (WAF 소개)   (e.g., /files/ 폴더) HTML 테이블을 사용하도록 업데이트되었습니다. 새 형식은 Apache의 최근 버전에 의해 생성 된 디렉토리 목록 웹 페이지의 더 최근 버전을 mimics. 인간은 변화가 정보를 쉽게 읽을 수 있다는 것을 발견할 것입니다. 이 문서를 파는 소프트웨어 (e.g., ISO 19115 문서를 수확하는 소프트웨어ERDDAP) 수정되어야하지만 새로운 형식은 이전 형식보다 더 쉽게 파울 수 있습니다. (주의, 안나 밀라노.) 
        * ₢ 킹outOfDateDatasets.html사이트 맵 ([이름 *](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) 이 웹 페이지는 가까운 실시간 데이터셋을 가진 테이블을 보여줍니다.&lt;testOutOfDate&gt; 태그 (더 보기) , datasets가 무엇인지에 의해 순위. 이 대시보드는 유용해야 합니다.ERDDAP™관리자 및 최종 사용자는 datasets가 out-of-date인지 알고 싶을 때. out-of-date datasets를 위해, 자료 근원을 가진 아마 문제가 있습니다, 그래서ERDDAP™더 최근 몇 점에서 데이터를 볼 수 없습니다.
Administrators: 아웃 Of-Date Datasets 웹 페이지를 원하지 않는 경우, setup.xml에 이것을 추가하십시오:
            &lt;아웃OfDateDatasetsActive&gt;false&lt;/outOfDate데이터셋액티&gt;
현재 위치testOutOfDate더 보기 OfDate 열에allDatasets데이터셋.
Bob Simons 덕분에 몇 년 동안이를 원했고 아일랜드의 Marine Institute의 동료들에게는 헌신적 인 Raspberry Pi를 통해 영감을 얻었으며 항상 사무실에서 화면을 보여줍니다.
        * 공급 능력:.htmlTable이름 *.xhtml응답은 이제 더 나은 포맷, 더 컴팩트하고, 따라서 더 빠른로드. HTML5 및 CSS 덕분에.
    * griddap datasets를 위한 새로운 산출 파일 유형: .timeGaps. 미디어 간격보다 더 큰 시간 값에서 간격의 목록을 보여줍니다. ([이름 *](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) 이것은 유용하다ERDDAP™관리자 및 최종 사용자는 정기적으로 우주 시간 값을 가질 것으로 예상되는 데이터 세트의 시간 값에 예기치 않은 간격이 있는지 알고 싶습니다. Bob Simons와 Roy Mendelssohn 덕분에이 기능을 필요로했습니다.
    * IMPROVED: 기본 그래프allDatasetsdataset는 이제 x=maxLon과 y=maxLat로 맵입니다. John Kerfoot, Rich Signell 및 OOI-CI의 감사.
    * 새로운:[erddapy로](https://github.com/ioos/erddapy)-- 아니다ERDDAP™특징, 하지만 많은 관심ERDDAP™사용자. 인기 카테고리 (ERDDAP™+ 더보기Python) ·PythonFilipe Fernandes가 만든 라이브러리는 "의 장점을 잡아ERDDAP이름 *RESTful웹 서비스 및 생성ERDDAP™datasets, acquiring metadata, downloading data, etc.를 검색하고 싶은 어떤 요구든지를 위한 URL. Filipe Fernandes에게 감사.
    * 나는 전에 언급해야한다 : 작업이 용이하기 위해 설계된 타사 R 패키지가 있습니다.ERDDAP™R 안에:[관련 상품](https://github.com/ropensci/rerddap#rerddap)· 이름 *[RSS 피드](https://ropensci.org/)로이 Mendelssohn
         
*    **기타ERDDAP™관리자는 알아야 할:**   
     
    * to do: 아래 setup.xml에서, 오른쪽&lt;adminInstitution&gt;, 추가&lt;adminInstitutionUrl&gt; 귀하의 기관에 대한 URL을 지정하는 태그 (또는 그룹) ·
    * to do: setup.xml에 있는 이 3개의 꼬리표는 더 이상 사용되지 않습니다:
        &lt;시작하기 HeadHtml&gt;,&lt;startBodyHtml&gt;와&lt;endBodyHtml&gt;. 그들은 대체된다
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; 및&lt;endBodyHtml5&gt;, 메시지에 지정된 기본 값이 있는 (아래에서) ·
        
우리는 기본적으로 사용하는 것이 좋습니다.&lt;startHeadHtml5&gt; 및&lt;endBodyHtml5&gt;.
우리는 추천합니다: 당신이 본래로 바뀌는 경우에&lt;startBodyHtml&gt; 및 / 또는 사용자 지정ERDDAP™지금, 새 사본을 보내십시오&lt;startBodyHtml5&gt; 태그 (아래에서) setup.xml로 설정하고 사용자 정의하기 위해 수정ERDDAP™그래서ERDDAP웹 페이지는 조직을 반영하지 않습니다.NOAA ERD· 물론, "Brought to you by"를 조직으로 변경하십시오. (₢ 킹) · 당신이 도움이 필요하면, 이메일을 보내erd.data at noaa.gov· (당신이 당신의 주문을 받아서 만들지 않는 경우에ERDDAP™이제 기본값을 사용합니다.&lt;startBodyHtml5&gt;.)
        
그런 다음 더 이상 사용되지 않은 setup.xml에 3 오래된 태그를 삭제합니다.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

당신이 할 수있는 추가 방법이 있습니다[사용자 정의ERDDAP™](/docs/server-admin/deploy-install#customize)·ERDDAP웹 페이지는 대신 조직을 반영합니다.NOAA ERD·
        
    * 계속하려면:&lt;EDDGrid...Example&gt; 태그 (시작&lt;EDDGridIdExample&gt;)와&lt;EDDTable ... example&gt; 태그 (와 함께 시작)&lt;EDDTableIdExample&gt;)는 setup.xml 파일에서 griddap와 예제를 생성하는 데 사용됩니다.tabledap문서. html 웹 페이지에ERDDAP·
        
태그를 사용자 지정하지 않은 경우, setup.xml 파일에서 삭제하십시오. 이제 그들은 모두 Bob의 데이터셋을 참조하는 message.xml의 기본값이 있습니다.ERDDAP™으로 https://coastwatch.pfeg.noaa.gov/erddap/index.html · 그래서 당신은 더 이상 당신의 특정한 datasets가 있어야 합니다ERDDAP· 기본값을 무시하고 싶다면, 설정.xml에 그 태그의 일부를 복사하고 값을 변경하십시오.
예제를 원하는 경우ERDDAP™, 가장 쉬운 방법은:
        
        1. 이 두 가지 데이터 세트를 포함ERDDAP™에 의해datasets.xml::
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. setup.xml에 이 태그를 추가하지만 URL을 변경ERDDAP이름 * (https·) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
태그를 사용자 정의 한 경우, 그대로 떠나고 설정에 이러한 2 새로운 태그를 추가하십시오.xml을 지정하려면ERDDAP™이러한 데이터셋에 대한 URL, 하지만 URL을 당신의 URL을 변경ERDDAP이름 * (https·) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * 계속하기:ERDDAP™이제 erddap2.css라는 CSS 파일을 사용합니다. 자주 묻는 질문\\[뚱 베어\\]/webapps/erddap/images/erddap.css는, erddap2.css에 유사한 변화를 만들기 위하여 고려합니다 (같은 디렉토리에) ·
    * 새로운:ERDDAP's web pages now have a large number of 거의 보이지 않는 내부 링크 (텍스트는 검은 색이며 밑줄이 없습니다.) · 당신이이 링크 중 하나 이상 hover 경우 (일반적으로 머리와 단락의 첫 번째 몇 단어) , 커서는 손이 된다. 링크를 클릭하면 URL은 문서의 그 부분에 대한 내부 링크입니다. 문서의 특정 섹션을 쉽게 참조 할 수 있습니다. Bob Simons 덕분에 몇 년 동안이 원했습니다.
    * 새로운:ERDDAP™현재 지원[Byte Range / 범위](https://en.wikipedia.org/wiki/Byte_serving)/files/ 파일의 일부에 대한 요청. 브라우저의 오디오 및 비디오 뷰어를 지원해야 했습니다.
    * TO DO: 이제 보안을 개선하기 위해 지정된 경우&lt;setup.xml의 baseHttpsUrl&gt; (그리고 따라서 지원https) , 추천된 깃발 Url은https더 안전한 flagKey로 URL. 그렇다면, 이전 flagUrls/flagKeys가 유효하지 않습니다. 관리자: 이 변경 사항이 적용되면ERDDAP™그리고 만약ERDDAP™제품정보EDDGridfromErddap 및 EDDTable 사용 fromErddap's that 구독하여 원격으로ERDDAPs, 그 후에, 당신은 새롭게 합니다ERDDAP, 당신의ERDDAP™새로운 flagUrl을 구독하기 위해 자동으로 시도합니다. 이전 구독을 삭제하고 새로운 구독 유효성 검사 이메일을 얻을 때 새로운 구독을 검증해야합니다.
    * 계속하려면:ERDDAP™제품정보EDDGridBob 's coastwatch의 erdVH3 데이터셋용 Erddap 데이터셋ERDDAP™, 새로운 erdVH2018 데이터셋을 참조하려면 변경하십시오.
    * TO : jplAquariusSSS 샘플 데이터 세트를 포함하면ERDDAP™, “V4”를 안으로 바꾸십시오datasetID"V5"로
    * 계속하기:actual\\_range지금 CF 표준 속성 (CF-1.7의) 그리고 명확하게 그 변수가 사용하는 경우add\\_offset및/또는scale\\_factor데이터 값을 포장하기 위해, 다음actual\\_range값은 unpacked data type을 사용해서 unpacked 값이 없어야 합니다. 불행히도, 우리의 이전 통보와이 충돌. Generate데이터셋 Xml 이제 포장되지 않은actual\\_rangevalue, 하지만 기존의 datasets를 수정하지 않을 것datasets.xml파일.
        
그래서, 데이터셋을 확인하시기 바랍니다: 변수의 값이 포장된 경우actual\\_range포장 된 데이터 값으로 지정되어 있으므로 추가하십시오.&lt;addAttributes·actual\\_rangeunpacked 값을 지정합니다. 그렇지 않으면 dataset가 로드되지 않습니다.ERDDAP· 이 작업을 수행하는 간단하고 거의 완벽한 방법datasets.xml이름 * 거기에 기여
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
·scale\\_factor1.0 이상. 그들은actual\\_range수정해야 할 속성.
        
축 변수에 대해EDDGrid데이터셋,ERDDAP™항상 설정actual\\_range그 값이 알고 있기 때문에 값의 실제 범위가 될 수 있습니다.
        
축 변수에 대한 후속 값 (e.g., 일부 위도 변수) ·ERDDAP™제품정보actual\\_range이름 *\\[0 댓글\\]·\\[이름 *\\]값, 높은 ... 낮은. 이제 항상 낮은...높은 값을 사용하여 새로운 CF 정의를 만듭니다.
        
정확한actual\\_range값은 EDDTable datasets에 특히 중요합니다.ERDDAP™데이터 값에 대한 사용자 요청을 신속하게 거부합니다.actual\\_range최소값 또는 그 이상actual\\_range최대 값.
        
관련 : 실제 \\_min, 실제 \\_max,data\\_min이름 *data\\_max속성은 이제 deprecated입니다. 데이터셋을 사용하려면actual\\_range대신.
        
    * 기타 (옵션, 하지만 권장) :: 각 주변 및 예측 데이터셋을 위해ERDDAP™, [ 추가]&lt;testOutOfDate&gt;] (/docs/server-admin/datasets#testoutofdate) 형태에 값이 있는 태그now-_nUnits_, 예를 들어,now-2일. dataset에 대한 최대 시간 값이 그 값보다 오래된 경우, dataset은 out-of-date로 간주되며, 해당 값과 같은 것으로 표시됩니다.[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)웹 페이지. 데이터셋의 소스로 잘못되었을 때 쉽게 볼 수 있습니다.
    *   [새로운: json-ld를 가진 Datasets의 Semantic Markup (구글 맵 링크 된 데이터) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™현재 사용[주 메뉴 (구글 맵 링크 된 데이터) ](https://json-ld.org)데이터 카탈로그 및 datasets 부분을 만들려면[웹 사이트](https://en.wikipedia.org/wiki/Semantic_Web)Tim Berners-Lee의 아이디어는 웹 내용을 더 읽을 수 있는 기계 및 기계 "understandable" 만드는 입니다. 검색 엔진 ([특히 Google](https://developers.google.com/search/docs/data-types/datasets)) 그리고 다른 semantic 공구는 발견과 색인을 붙이는 것을 촉진하기 위하여 이 Structured markup를 사용할 수 있습니다. json-ld 구조화 마크업은 보이지 않는-to-humans로 나타납니다&lt;스크립트&gt; 코드에 http://.../erddap/info/index.html 웹 페이지 (semantic 웹[데이터카탈로그](https://schema.org/DataCatalog)) 서로 http://.../erddap/info/_datasetID_/index.html 웹 페이지 (semantic 웹[데이터셋](https://schema.org/Dataset)) · (Adam Leadbetter 및 Rob Fuller of Marine Institute in Ireland의 특별 감사는이 부분을 만들기 위해 작업의 단단한 부분을 수행하기 위해ERDDAP·) 
    * NEW : 오디오 파일에서 데이터를 읽을 수있는 새로운 데이터 세트 유형이 있습니다.
        [EDDGrid파일 형식](/docs/server-admin/datasets#eddfromaudiofiles)오디오 데이터를 Gridded 데이터로 취급합니다.
        [EDDTable오디오파일](/docs/server-admin/datasets#eddfromaudiofiles)탭 데이터 데이터 데이터로 오디오 데이터를 치료하는 . Jim Potemra, Rich Signell, OOI 및 Carrie Wall Bell에 대한 감사 오디오 / 하이드 폰 파일 지원에 대한 요청에 대한.
    * GenerateDatasets로 변경 사이트맵 (관련 변경) ::
        * 새로운:ERDDAP™이제 자동으로 시스템[최신 URL 업데이트](/docs/server-admin/additional-information#out-of-date-urls)GenerateDatasets에서 모두 Xml 및 데이터셋을 로드할 때. 만약 당신이 붙잡고 업데이트해야 하는 추가 URL에 대 한 제안이 있는 경우, 또는 만약 당신이 이 서비스로 전환 해야 하는 경우 (변환기처럼) , 이메일erd.data at noaa.gov·
        * 새로운 기능: 지금, GenerateDatasets Xml는 CF를 참조standard\\_name  (모든 Lowercase이어야 함) uppercase 문자로, 그것은 모든 Lowercase 버전을 추가&lt;addAttributes&gt;. 또한, dataset가 로드될 때ERDDAP™CF 보기standard\\_nameuppercase 문자로, 그것은 조용히 변경standard\\_name· Rich Signell에 감사.
        * 새로운 기능: 지금, GenerateDatasets Xml는 ISO 8601 형식이 아닌 시간과 속성을 볼 수 있으며 ISO 8601 형식의 시간을 추가합니다.&lt;addAttributes&gt;. 이름 *ERDDAP™형식을 인식하지 않으며 시간 값이 변경되지 않습니다. 형식을 볼 경우ERDDAP™인식하지 않고 수정, 이메일을 보내주십시오.erd.data at noaa.gov·
        * IMPROVED: 저수준 부호를 위한EDDGrid인기 동영상 GenerateDatasets의 카탈로그 옵션 Xml는 이제Unidatanetcdf-java 카탈로그 크롤러 코드 (사이트맵 카탈로그) 그래서 그것은 모든 THREDDS 카탈로그를 처리 할 수 (surprisingly complex일 수 있는) · Roland Schweitzer 덕분에이 변경 및 감사를 제안했습니다.Unidata비밀번호
        * 새로운 기능: GenerateDatasets Xml 용EDDGridFromDap은 이제 ", startYear-EndYear"을 실제 시간 축 값에 기반한 제목의 끝으로 추가합니다. EndYear="present" 만약 데이터가 마지막 150 일 안에 존재한다면.
        * 새로운 기능: GenerateDatasets Xml 용EDDGridFromDap는 이제 "을 추가합니다.\\[제품 설명\\]dataset가 균등하게 간격이 있고 lat와 lon를 위해 동일하다면 제목에 °".
        * IMPROVED: 시간 변환기는 지금 추가 특징이, ISO 8601 끈으로 묶는 수 또는 UDUnits 양립한 수로로 ISO 8601 끈으로 묶는 다양한 일반적인 체재에 있는 끈 시간을 개조하는 가능하게 합니다. 이전에 지원된 모든 기능은 계속 작동합니다.
        * BUG FIX: 생성 데이터셋 Xml와 키워드 변환기는 이제 "Earth Science &gt; "GCMD Science Keywords의 시작 부분에 포함. dataset가 로드될 때ERDDAP™·ERDDAP™이제는 "Earth Science &gt;"또는 제목 이외의 다른 것을 사용하는 키워드 속성에서 GCMD 키워드를 수정합니다. (각 단어의 첫 글자가 자본화되는 곳) ·
        * IMPROVED: 제안할 때&lt;destinationName&gt;'s, 생성데이터셋 EDDTableFromAsciiFiles를 위한 Xml는 다만 꼬리 끝을 사용했습니다sourceNames와'/'  (몇몇은 filename-like이었습니다) · 지금 그것은 전체를 사용sourceName(예 : "blahblahblah (m / s)" 이 변화는 몇몇 datasets를 위해 좋 다른 사람을 위해, 그러나 더 안전한 행동입니다. Maurice Libes 덕분에.
        * BUG FIX: 생성 데이터셋 Xml와 dataset constructors는 이제 열 이름을 복제하지 않습니다. Maurice Libes 덕분에.
        * BUG FIX: 생성 데이터셋 EDDTableFromAsciiFiles를 위한 Xml는 쓰지 않았습니다&lt;columnSeparator&gt; 출력에. 지금 그것은. Maurice Libes 덕분에.
    * NEW : DasDds 도구는 이제 시간 간격 정보를 인쇄합니다. (이름 *[.timeGaps 정보](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) dataset가 gridded dataset인 경우.
    * NEW : Advanced Search는 이제 "now_\\-nUnits_"시간값을 허용합니다. Rich Signell에 감사.
    * IMPROVED: 보안을 개선하려면 dataset의 메타데이터 또는 데이터의 이메일 주소가 HTML 웹 페이지에 기록되면 "@"은 "로 대체됩니다. 이것은 전체 메타 데이터 또는 데이터 값 인 이메일 주소 만 더 긴 값에 포함되지 않습니다.
    * IMPROVED: 안전을 증가하기 위하여,RSS개인 데이터 세트에 대한 정보는 이제 사용자에게만 제공 (이름 *RSS관련 기사) 로그인 및 권한이 있는 경우 dataset.
    * 새로운: 이제 dataset가 로드될 때, ifdate\\_created·date\\_issued·date\\_modified, 또는 date\\_metadata\\_modified 속성에는 ISO 8601 형식이 아닌 시간 값이 있습니다.ERDDAP™ISO 8601 포맷 된 시간에 변경하십시오. 이름 *ERDDAP™형식을 인식하지 않으며 시간 값이 변경되지 않습니다. 형식을 볼 경우ERDDAP™인식하지 않고 수정, 이메일을 보내주십시오.erd.data at noaa.gov·
    * IMPROVED: .dods 응답에서EDDGriddatasets는 이제 크게 빠릅니다. Rich Signell에 감사.
    * 관련 변경ERDDAPISO 19115 문서의 생성:
        * BUG FIX: ISO 19115 문서를 만들 때,dataVariable단위는 HTML Attribute 인코딩 및 % 인코딩되지 않았습니다. 지금 그들은. NGDC의 ISO 19115 검증기 덕분에.
        * BUG FIX: ISO 19115 문서를 만들 때,date\\_created종종 잘못된 형식이었다. 이제 ISO 8601 Z 문자열로 변환됩니다. NGDC의 ISO 19115 검증기 덕분에.
        * BUG FIX: ISO 19115 문서를 만들 때,ERDDAP™이제 더 긴 쓰기 일 년 =0000 (climatology datasets로) , ISO 19115 스키마가 year=0000로 날짜를 허용하지 않기 때문에. NGDC의 ISO 19115 검증기 덕분에.
    * NEW : 요청에 따라http.../erddap/version는 버전 번호를 반환합니다 (이름 *) , 예, "ERDDAP\\_version=1.82".
지금, 요청에http.../erddap/version\\_string은 '\\_' 플러스 ASCII 텍스트의 숫자와 옵션 스핑을 반환합니다. (공간 또는 제어 문자) , 예, "ERDDAP\\_version\\_string=1.82\\_존스포크" 포크를 수행하는 사람들은 EDStatic.erddapVersion을 변경하여 이것을 지정합니다. 이 방법은 이전 버전의 문제를 일으킬 수 없습니다ERDDAP· Axiom에게 감사 (주목할만한, Kyle Wilcox) and Ireland의 해양 연구소 (주목할만한, Rob Fuller) ·
    * 버그 FIX: wms version=1.3.0의 경우, request=GetMap· crs=EPSG:4326 (크롬:84) 요청: bbox 순서는 minLat, minLon, maxLat, maxLon이어야 합니다. CRS를 위해: 전에, bbox 순서는 minLon, minLat, maxLon, maxLat이어야 합니다. 사용방법ERDDAP이름 *WMS1.3.0 서비스ArcGIS  (Paola Arce 덕분에) · 이름 * (아니다.) 이름 *OGC이렇게 복잡하게 만들기. 이름 *Leaflet이것을 제대로 취급하고 나를 위해 이것을 시험하는 방법.
    * IMPROVED : 이전, 제안 된 링크RSS이메일 구독이 있습니다.http당신의 URLERDDAP· 지금 그것은httpsURL, 그것이 활성화되는 경우.
    * 새로운:EDDGrid이제 복사는 옵션 태그를 지원합니다.&lt;onlySince&gt;_someValue_&lt;/onlySince&gt;, 값은 특정 ISO-8601 포맷 된 시간 또는now-n단위 (₢ 킹now-2 년) 시간. 이름 *[한국어 문서 작성](/docs/server-admin/datasets#onlysince)· Drew P. 덕분에.
    * IMPROVED: 유효한 경우에,ERDDAP™다음을httpsURL (에서&lt;baseHttpsUrl&gt;, 사용 가능한 경우) 대신httpURL 사용자가 URL을 추가/validate/remove/list a subscription.
    * 버그 FIX:ERDDAP™이제 구독 작업을 수행 할 수 있습니다 " https://" · (Bob slaps 그의 이마.) Jennifer Sevadjian에 감사합니다.
    * 버그 FIX:.jsonlKVP이제 ':' 각 키와 값 사이, 대신'='· (Bob slaps 그의 이마.) Alexander Barth에 감사합니다.
    * 버그 FIX: 이전, 당신이 재시작하는 경우ERDDAP™QuickRestart=true로, dataset가 정상적으로 다시 로드되기 전에, 당신은 모든 NMillis를 업데이트하는 EDDTableFromFiles dataset에 호출하고, 데이터 파일이 변경된 경우, 요청은 null 포인터 오류로 실패합니다. 이제 요청이 성공할 것입니다. John Kerfoot 덕분에.
    * NEW: 데이터셋이 로드될 때ERDDAP™, 키워드는 지금 분류된 순서로 배열되고 어떤 신형 특성은 제거됩니다.
    * IMPROVED: 지금, 만약 .geoJson,.json또는.ncoJson 요청.jsonp 매개변수, 응답 mime 유형은 application/javascript입니다. 이름 *.jsonp는 지원되지 않습니다.jsonlCSV또는.jsonlKVP, 그것은 작동하지 않을 것입니다. Rob Fuller 덕분에.
    * IMPROVED: json 선 fileType 옵션의 mime 타입은 이제 "application/x-jsonlines"입니다. 그것은 application/jsonl이었다. 현재, 확실한 선택이 없습니다.
    * IMPROVED: 상태.html 페이지에 표시된 실패한 요청의 수는 전, 예를 들면, ClientAbortException 보다는 실패로 계산되기 때문에 증가할 것입니다.
    * IMPROVED: 지금, 응답에서ERDDAP™압축되지 않고, 응답의 헤더는 "Content-Encoding"="identity"를 포함합니다.
    * IMPROVED: "license" 속성이 필요하지 않았습니다. 이제 지정되지 않은 경우, message.xml의 standardLicense (또는 setup.xml에서 현재) 기본값으로 사용됩니다.
    * NEW : 현재 옵션이 있습니다.[fileAccessSuffix 속성](/docs/server-admin/datasets#fileaccessbaseurl). 현재 사용 가능[fileAccessBaseUrl 속성](/docs/server-admin/datasets#fileaccessbaseurl)·
    * IMPROVED: 보안을 증가시키기 위하여, 이 버전은 최신으로 컴파일되었습니다JavaJDK의 v8u162.
    * 새로운: 보안을 증가시키기 위해, 임시 이메일 주소를 제안하는 몇몇 일반적인 도메인 (이메일: info@mailinator.com) 구독 시스템에 대한 영구 이메일 블랙리스트에 있습니다.
    * NEW : 보안을 증가시키기 위해, Daily Report의 키가 포함되어 있습니다.
설정Dataset 플래그 IP 주소 실패 (지난 일일 보고서)   
설정Dataset 플래그 IP 주소 실패 (스타트업)   
설정Dataset 플래그 IP 주소 (지난 일일 보고서)   
설정Dataset 플래그 IP 주소 (스타트업)   
"Failed"고 키가 당신을 볼 수 (해커?) 플래그를 설정하려고하지만 실패합니다.
    * IMPROVED: 보안을 증가시키기 위해, 이메일 주소&lt;구독이메일Blacklist&gt; 당신의datasets.xml현재 case-insensitive로 간주됩니다.
         

## 버전 1.80{#version-180} 
 (출시일 2017-08-04) 

*    **새로운 기능 (사용자 정의) ::**   
     
    * ₢ 킹orderByCount () 필터는 결과 테이블이 정렬되는 방법을 지정합니다. (또는 아니) 그리고 각 종류의 그룹에 대한 하나의 행을 반환, 각 변수에 대한 non-missing-values의 수와 함께.
예를 들어,orderByCount (·stationID·) 에 의해 정렬stationID각 행을 반환합니다.stationID, 각 변수에 대한 non-missing-values의 수와 함께.
지정하기orderByCount ("") , 응답은 각 데이터 변수에 대한 non-missing-values의 숫자와 한 줄이 될 것입니다.
이름 *[orderBy... 문서](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Ben Adams에게 감사.
    * ₢ 킹.ncoJson 파일 gridded 및 tabular datasets를 위한 유형 선택권. 이 옵션은NCOlvl=2 "pedantic" JSON 파일은 일반적으로 발견 된 모든 정보와 함께.nc파일. 이름 *[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Charlie Zender에 감사합니다.
    * 버그 FIX: 더 보기orderBy· () Make A Graph 웹 페이지의 옵션은 이제 올바르게 처리됩니다.
    * BUG FIX: .geoJson 출력은 이제 lat 또는 lon 값이 누락된 줄을 인쇄하지 않습니다. 또한 고도 값 (이용안내) 이제 좌표에 포함되어 데이터 값이 아닌. Jonathan Wilkins 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:**   
     
    * 보안 ISSUE: Protocols.js 라이브러리는OpenLayers데모에서WMS내 계정ERDDAP™out-of-date이며 잠재적으로 사용할 수 있도록 버그가 있습니다. (불행히도, updatingOpenLayers및 프로토콜. js는 쉽지 않습니다.) 그것은 도서관이 교차 위치 취약성을 허용하기 위해 설정 될 수있는 가능성을 엽니 다. 그러나, 이후ERDDAP™만 사용OpenLayers특정한 미리 설치 방법 및 특정한에ERDDAP- 근거한 자료 근원, 우리는 교차 위치 취약점이 없다는 것을 믿습니다ERDDAP's 사용OpenLayers그리고 protocols.js. 그러나 믿지 않는 경우, 이제 사용할 수 있습니다OpenLayers데모에서WMS당신의 페이지ERDDAP™이름 *
```
        <openLayersActive>false</openLayersActive>  
```
setup.xml 파일에. 기본값은 "true". Charles Carleton 및 NCEI 덕분에.
    * SECURITY CHANGES: 사용되지 않는 .jar 파일과 중복 .jar 파일 (그들은 또한 netcdfAll.jar에서) 제거되었습니다.ERDDAP™관련 상품 Out-of-date .jar 파일이 업데이트되었습니다. Charles Carleton 및 NCEI 덕분에.
    * 보안 변화: netcdfAll.jar 파일과 함께 배포ERDDAP™최신 버전 (현재 4.6.10) , 하지만 여전히 내부 jackson .jar 파일을 포함 하 고 보안 취약점, 아마존 S3 데이터 소스에 액세스할 때만 사용 되는 Jackson 라이브러리. Amazon S3를 통해 데이터에 액세스하지 않는 경우 (당신은 당신이 있다면 알고) , 이러한 취약점은 관련이 없습니다.
        
netcdf-java 개발자는 이러한 취약점이 Netcdf 코드가 이러한 라이브러리를 사용하고 아마존 S3에 액세스 할 때 어떤 경우라도 관련이 없다는 것을 유지합니다. 이름 *[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866)· 나는 그들을 믿는다. 여전히 이것에 대한 우려가 있다면 netcdf-java 개발자에 문의하십시오. (netcdf-java 개발자를 믿지 않는 경우 contemplatingERDDAP™이 때문에 THREDDS는 netcdf-java를 기본적으로 사용하고보다 광범위하게 사용해야 합니다.ERDDAP·) 
        
상세 정보: 잘못된 코드와 취약 경고는:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml의
이름 * https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- 주요 특징
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
이름 * https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- 주요 특징
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml의
이름 * https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- 주요 특징
이름 * https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- 긴
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
이름 * https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- 주요 특징
이름 * https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- 긴
"판의 경우 4.6.10, aws-java-sdk-core는 버전 2.6.6 잭슨-\\* artifacts에서 끌어 들였습니다." (netcdf-java의 이메일) ·
Charles Carleton 및 NCEI 덕분에.
        
    * COMPILER 변화: 당신이 recompile 경우에ERDDAP™, 명령 줄에 필요한 -cp classpath 매개 변수가 이전보다 훨씬 짧습니다. 새로운 -cp 설정 참조[이 문서](/docs/contributing/programmer-guide#development-environment)· Charles Carleton 및 NCEI 덕분에.
    * GenerateDatasets의 새로운 옵션 Xml : EDDTableFromBcodmo, BCO-DMO에서 내부 사용을 위해.
Adam Shepherd와 BCODMO 덕분에.
    * 새로운 매력과 특징: EDDTable 열이 웹 액세스 파일의 파일명이있는 경우 (e.g., 이미지, 비디오, 또는 오디오 파일) , 당신은 추가할 수 있습니다
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
기본 URL을 지정하기 (으로 종료 /) filenames를 완전한 URL로 만들기 위해서는 필요하다. 다음 것.htmlTable응답,ERDDAP™결합된 URL에 링크로 filename을 표시합니다. (기본 정보 Url과 파일명) ·
당신이 원하는 경우ERDDAP™관련 파일을 제공하기 위해, 그 파일을 위한 별도의 EDDTableFromFileNames dataset을 만듭니다. (개인 데이터셋이 될 수 있습니다.) ·
Adam Shepherd와 BCODMO 덕분에.
    * NEW ATTRIBUTE RECOMMENDATION: EDDTable 열이 웹 액세스 파일의 이름을 가지고 있다면 (e.g., 이미지, 비디오, 또는 오디오 파일) 아카이브를 통해 접근 가능 (₢ 킹.zip파일 형식) URL을 통해 액세스, 사용
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
아카이브의 URL을 지정합니다.
당신이 원하는 경우ERDDAP™아카이브 파일을 제공하기 위해, 파일에 대한 별도의 EDDTableFromFileNames dataset을 (개인 데이터셋이 될 수 있습니다.) ·
Adam Shepherd와 BCODMO 덕분에.
    * GenerateDatasets에 대한 IMPROVEMENTS Xml는 잘못된 / 나쁜 원인을 제거&lt;subsetVariables&gt; 제안 및 중복 / 나쁜 제안 된 변수 이름, 기타. Rich Signell, Adam Shepherd 및 BCO-DMO 덕분에.
    * 새로운 선택권: 정치 경계 정보와 함께 배포ERDDAP제3자 및 제3자로부터 또한, 다른 사람들이 올바른 것에 대해 다른 아이디어를 가질 수있는 세계 여러 곳에서 분쟁이 있습니다. 우리는 경쟁의 CORRECTNESS에 대해 CLAIM하지 않습니다.ERDDAP· 당신이 함께 오는 정치 경계 정보를 좋아하지 않는 경우ERDDAP™, 당신은 지금 말할 수 있습니다ERDDAP™정치 경계를 결코 그릴 수 없다
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
setup.xml 파일에. 기본값은 "true". Raju Devender에게 감사.
    * 새로운 METADATA 꼬리표: 내 계정datasets.xmldataset의 경우 기본 색상을 지정할 수 있습니다. 바 섹션dataVariable그래프와 지도에서
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, 하자ERDDAP™(주)) · 이름 *[색상 : 바 설정](/docs/server-admin/datasets#color-bar-attributes)·
    * IMPROVED: 지도에 국가 경계 색깔은 자주색이었습니다 (깊은 보라색 용 당신 아기 Boomers) · 지금 그것은 회색입니다 (국가 경계 회색과 땅 회색 사이) ·
    * 버그 FIX:&lt;iso19115File&gt;와&lt;fgdcFile&gt; 에datasets.xml항상 제대로 처리되지 않았습니다. 지금 그들은. BCO-DMO에 감사.

## 버전 1.78{#version-178} 
 (출시일 2017-05-27) 

*    **새로운 기능 (사용자 정의) ::**   
     
    *    (이름 *)   
         
*    **기타ERDDAP™관리자는 알아야 할:**   
     
    * IMPROVED: 상태에 "Major LoadDatasets Time Series"에 있는 선의 순서는 지금 바닥에 정상에 가장 오래된.
    * 버그 FIX:ERDDAP™현재 글.nccsv시간 변수의 파일actual\\_rangeISO-8601 문자열 시간으로. 즉, EDDTableFromErddap 파싱 정보를 원격 데이터셋과 모든 EDDTableFrom...Files 데이터셋에 대한 QuickRestart 파일에서 수정합니다. (더 보기actual\\_rangev1.78의 dataset loads를 처음 잘못하면 reloaded, e.g., dataset을 플래그하면 됩니다.) 

## 버전 1.76{#version-176} 
 (출시일 2017-05-12) 

*    **새로운 기능 (사용자 정의) ::**   
     
    * 톰캣의 변화: 자주 묻는 질문ERDDAP™웹 브라우저 이외의 소프트웨어에서 오는 (₢ 킹curl· RMatlab·Python·Java) ::
Tomcat의 이전 변경 사항 (실행되는 저수준 소프트웨어ERDDAP) 2016 년 초부터 요청 URL의 쿼리 부분에서 더 많은 문자가 있어야합니다.[ **퍼센트 인코딩** ](/docs/server-admin/datasets#infourl)보안상의 이유로. 브라우저는 당신을 위해 % 인코딩을 돌봐. 그래서 사용ERDDAP™브라우저에서 다른 요청이 리디렉션되지 않는 한 영향을 미치지 않습니다.ERDDAP·
    * IMPROVED: 이전,ERDDAP™제품정보 **char 변수** 문자보다 짧은 정수처럼. 이제 1-character-long UCS-2와 같이 더 많은 것을 대우합니다 (유니코드) 문자열. 이름 *[비밀번호](/docs/server-admin/datasets#char)· Aurelie Briand 및 Argo 프로젝트 덕분에.
    * IMPROVED: 이전,ERDDAP™작은 지원 제공 **Unicode 문자** 위의 문자 #255 문자열에. 지금, 내부적으로,ERDDAP™완전 지원 2-바이트 UCS-2 숯 (문자 번호 0 통해 65535) 문자열에서. String data가 다양한 파일 형식에 쓰일 때,ERDDAP™2 바이트 숯을 지원할 수 있습니다. 또 다른 예는 .csv 파일입니다.ERDDAP™ISO-8859-1 charset로 작성 (1 바이트 charset) , 그래서ERDDAP™JSON-like \\u_hhhhhh_ 구문을 사용하여 문자 #255의 모든 문자를 작성합니다. 이름 *[String 데이터](/docs/server-admin/datasets#string)·
    * IMPROVED: 안으로.nc에 의해 작성된 파일ERDDAP™, char 변수는 문자열로 해석된다 속성이
         **\\_코딩 = ISO-8859-1**   
내 계정.nc파일 읽기ERDDAP™, "\\_Encoding"과 char 변수는 지정된 charset과 문자열로 해석됩니다.
    * 공급 능력:ERDDAP™지원하다 **JSON-like 백슬래시 인코딩** char와 String 변수의 제약을 지정할 때 특수 문자의. 따라서 당신은 같은 무언가를 요청할 수 있습니다 &myString="\\u20ac" 당신이 원하는 데이터의 행을 원하는 경우 20ac 이후 myString=€는 유로 기호에 대한 코드 포인트의 hexadecimal 버전입니다. 웹의 여러 소스는 Unicode 기호, 예를 들어 코드 포인트 번호를 보여줍니다.[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)·
    * IMPROVED: 이전,ERDDAP™한정된 지원 **긴 정수** 변수. 제품 정보ERDDAP™. . . . . . . . . 이름 *[긴 문서](/docs/server-admin/datasets#long)· 아일랜드의 해양 연구소, Craig Risien, Rich Signell, Christopher Wingard 및 OOI 덕분에.
    * NEW : griddap 및 출력 파일 형식tabledap:: **.nccsv** , 이는NetCDF-like, ASCII, CSV 파일도 비교할 수 있는 모든 메타데이터를 포함.nc파일. 이름 *[사이트맵 제품 정보](/docs/user/nccsv-1.00)· Steve Hankin에게 감사.
    * 새로운: **orderByClosest제품정보** 결과 테이블이 정렬되고 간격을 지정하는 방법을 지정합니다. (예, 2시간) · 각 종류 그룹 내에서, 간격에 가까운 행만 유지됩니다. 예를 들어,orderByClosest (·stationID, 시간, 2 시간") 에 의해 정렬stationID그리고 시간, 하지만 단지 각 행을 반환stationID현재 위치orderBy주요 특징 (시간 :) 가장 가까운 2 시간 간격입니다. 이것은 가장 가까운 것은tabledapgriddap 요청에 있는 값을 stride 합니다. 이 선택권은 어떤 것을 통해 지정될 수 있습니다tabledapdataset's .html 웹 페이지, .graph 웹 페이지, 그리고 당신이 스스로 생성하는 URL에 의해. 아일랜드의 Marine Institute 및 Ocean Networks 캐나다 덕분에.
    * 새로운: **orderByLimit제품정보** 결과 테이블이 정렬되고 제한 번호를 지정할 수 있습니다. (예, 100) · 각 종류 그룹 내에서, 첫 번째 'limit'열만 유지됩니다. 예를 들어,orderByMax (·stationID, 100") 에 의해 정렬stationID, 그러나 단지 각을 위한 첫번째 100개의 줄을 돌려보냅니다stationID· 이것은 SQL의 LIMIT 항목과 유사합니다. 이 선택권은 어떤 것을 통해 지정될 수 있습니다tabledapdataset's .html 웹 페이지, .graph 웹 페이지, 그리고 당신이 스스로 생성하는 URL에 의해. 아일랜드의 Marine Institute 및 Ocean Networks 캐나다 덕분에.
    * NEW : 두 가지 새로운 응답 파일 유형, **.jsonlCSV이름 *.jsonlKVP** Gridded datasets, tabular datasets 및 기타 많은 장소에 대한 요청에 사용할 수 있습니다.ERDDAP  (e.g., datasets에 대한 정보 요청) · 파일은 JSON Lines 파일입니다. ([ https://jsonlines.org/ ](https://jsonlines.org/)) 각 라인에는 별도의 JSON 객체가 있습니다..jsonlCSVCSV 형식의 값이 있습니다..jsonlKVP열쇠가 있습니다: 가치 쌍. 각 선은 그 자체에 서 있습니다. 라인은 더 큰 JSON 배열 또는 객체에 동봉되지 않습니다. 예를 들어, 참조[이 표본 요구](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z)· Damian Smyth, Rob Fuller, Adam Leadbetter 및 아일랜드 해양 연구소 덕분에.
    * NEW : 새로운 문서가 있습니다.[ **Private Datasets에 액세스하는 방법ERDDAP™Script를 통해** ](/docs/user/AccessToPrivateDatasets)· Lynn DeWitt에 감사합니다.
    * IMPROVED: 최소 범위의 **OpenLayers** 지도는 2 도이고 지금 4 자료 화소입니다. Rusty Holleman에게 감사.
    * IMPROVED: 몇몇 일반적인 경우에는, 포함하는 요구 **일반 표현** constraint는 훨씬 빨리 가공될 것입니다.
         
*    **기타ERDDAP™관리자는 알아야 할:**   
     
    *    **빠른 시작:** 이 새로운 버전을 시작하는 첫 번째 시간, 그것은 오랫동안 걸릴 것입니다ERDDAP™모든 데이터셋을 로드하기 위해서는 소스 데이터파일을 다시 읽어야 합니다. (Gridded 데이터 파일에 대한 헤더만 있지만) · 로그인을 보면 오류 메시지가 "old/unsupportedVersion"이라는 것을 볼 수 있습니다.ERDDAP™내부 파일의 새로운 버전을 만들 것입니다. 진료시간
    * 명세:ERDDAP™이제 새로운 사용 **다운로드** 한국어 (일컬어 JSR 310) Joda 대신 문자열을 숫자로 묶습니다. 참고 :
        * 이름 *ERDDAP™갑자기 주어진 데이터 세트에 대한 문자열 시간을 파싱하는 데 문제가 있습니다. 따라서 대부분의 또는 NaN의 모든 시간을 변환합니다. (누락된 값) , 문제는 거의 항상 날짜 변수의 "units"로 지정된 시간 형식 문자열. 새로운 시스템은 때때로 약간 다른 dateTime 형식 문자열을 필요로한다.
        * dateTime 문자열의 숫자 개월 및 일 경우 0-padded (예, "3/7/2016") , 체재는 다만 단 하나 M 및 d가 있다는 것을 확인합니다 (예, "M/d/yyyyyy", "MM/dd/yyyyyy") ·
        * 더 낮은 케이스 s를 사용하는 일부 분수 초 사양 변경 (예, .sssyyyy-MM-dd'T'HH:mm:ss.ssss) , 자본으로 사이트맵 (₢ 킹yyyy-MM-dd'T'HH:mm:ss.SSS) ·
        *   ERDDAP™더 이상 문자열 날짜 지원 2자리 년의 시간 형식 (₢ 킹) 1세기 (e.g., 1900 또는 2000년) · 비즈니스는 1990 년 말에이 문제를 해결하는 억 달러를 보냈습니다. 과학자들은 2 자리 수 년을 사용하지 않아야합니다. 소스 파일을 수정하십시오 (₢ 킹) 4자리 수 년으로 변환하면 yyyy를 사용할 수 있습니다. 시간 형식.
        * yyyyyyy 또는 YYYYY를 사용할 수 있습니다 (이름 *ERDDAP™uuuu로 변환) 음년, 예를 들면, -4712를 포함하여 4개의 손가락 년을 파기 위하여 (4713 BC 주) · SeaDataNet, Thomas Gardner 및 BODC에 대한 감사.
        * dateTime 형식 내에서 Z를 계속 사용하세요.ERDDAP시간 오프셋을 파기 (예. Z, +0200, -08, -0800, -08:30) ·
        *    **자주 묻는 질문Java버전 1.8.0\\_21 이상.** 
        * 프로그램 -- 견적 요청Java실행하는 프로그램ERDDAP™코드, 당신은 joda-time에 참조를 제거해야합니다. jar 클래스 경로 매개 변수.
    * 새로운:ERDDAP이름 *[아카이브A Dataset 도구](/docs/server-admin/additional-information#archiveadataset)지금 만들 수 있습니다[ **BagIt 파일** ](https://en.wikipedia.org/wiki/BagIt)· NCEI는이 형식으로 표준화 할 수 있습니다. Scott Cross 및 John Relph 덕분에.
    * IMPROVED: erddap 다운로드 링크. 전쟁에서ERDDAP™웹 페이지 지금 포인트 **프로젝트** · (공개 링크이므로 GitHub에 가입하지 않아도 됩니다.) 이것은 훨씬 빠른 다운로드를 의미합니다. (12Mb/s 까지 1Mb/s) 다운로드 몇 가지 문제. Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney 및 아일랜드 해양 연구소 덕분에.
    * IMPROVED: 그렇습니다 **status.html 페이지 및 일일 상태 보고서 이메일** 이제는 통계를 보여주는 "Major LoadDatasets Time Series"섹션을 포함합니다.ERDDAP™마지막 100개의 중요한 loadDatasets를 위한 각 중요한 loadDatasets의 끝으로. 문제의 RAID 덕분에.
    * 새로운: 새로운, 선택 (그러나 권장) EDDTableFromCassandra datasets를 위한 모수: [ ** &lt;파티션키CSV&gt; ** · (/docs/server-admin/datasets#partitionkeycsv) · Ocean Networks 캐나다 덕분에.
    * 새로운: EDDTableFromAsciiFiles 지금 지원 ** &lt;열Separator&gt; ** 모수. null 또는 ""인 경우, 클래스는 이전대로 추측됩니다. 그렇지 않으면, 첫 번째 문자는 파일을 읽을 때 열 분리기로 사용됩니다. Sky Bristol와 Abigail Benson 덕분에.
    * 새로운: 새로운 dataset 유형,[ **EDDTableNccsvFiles에서** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), 통합해서 dataset를 만들 수 있습니다[NCCSV .csv 파일](/docs/user/nccsv-1.00)· Steve Hankin에게 감사.
    * 공급 능력: **EDDTableErddap에서** 현재 사용.nccsv원격에서 정보를 얻기ERDDAPs 및 그 메타 데이터 정보의 로컬 아카이브. 숯과 긴 데이터 유형에 대한 전체 지원이 가능하며, 유니코드 (사이트맵) 숯과 문자열을 위한 charset. Rob Fuller 및 Ireland의 해양 연구소 덕분에.
    * IMPROVED: EDDTableFromErddap 및EDDGridFromErddap 지금 지원 ** &lt;리디렉션&gt;false&lt;/직접&gt; ** 이름 *ERDDAP™원격으로 요청을 리디렉션하지 마십시오.ERDDAP· 기본값은 true입니다. 이것은 먼 때 유용합니다ERDDAP™개인 정보ERDDAP· Damian Smyth, Rob Fuller 및 아일랜드 해양 연구소 덕분에.
    * 공급 능력:ERDDAP™지금 잡아 **자주 묻는 질문** 현재 위치 이름 *ERDDAP™이제 저수준 스레드가 더 빠르기 때문에 더 빠릅니다. 문제의 RAID 덕분에.
    *    **Generate데이터셋 모델 번호:** 
        * 새로운: 새로운 특별한 EDDType “ncdump” 인쇄[채용정보](https://linux.die.net/man/1/ncdump)\\-like printout 의 헤더의.nc파일. 지정된 변수에 대한 데이터 값을 인쇄할 수 있습니다. (또는 "nothing"을 입력하여 데이터 값을 인쇄하지 마십시오.) · 이것은 ncdump없이 인해 유용하기 때문에 파일에 무엇인지 알기 어렵습니다. 따라서 GenerateDatasetsXml에 지정해야합니다. Craig Risien, Rich Signell, Christopher Wingard 및 OOI 덕분에.
        * 새로운: SeaData를 위해 순수한 자료:
적절한 경우 GenerateDatasets Xml는 이제 원격 SPARQL 쿼리를 사용하여 특정 semantic 변환을 수행합니다. 변수의 소스 메타데이터가 sdn\\_parameter\\_urn, e.g., sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", GenerateDatasets Xml는 해당 P02 속성, 예를 들어, sdn\\_P02\\_urn = "SDN:P02::PSAL"을 추가합니다. 이 속성을 사용하는 datasets가 있는 경우, 그리고 만약ERDDAP이름 *&lt;categoryAttributes&gt; setup.xml에는 sdn\\_parameter\\_urn 및 sdn\\_P02\\_urn, 사용자가 사용할 수 있습니다.ERDDAP™이 속성의 특정 값으로 datasets를 검색하는 범주 검색 시스템. BODC와 Alexandra Kokkinaki 덕분에.
        * IMPROVED: 생성 데이터셋 Xml는 이제 많은 변화http://metadata의 참조https://적절한 경우.
        * IMPROVED: 생성 데이터셋 Xml는 이제 제작자 \\_type 및 publisher\\_type을 추측하려고 합니다.
        * IMPROVED: GenerateDatasets에 의해 제안된 가변 데이터 유형 Xml는 이제 조금 더 낫습니다. Margaret O'Brien, LTER 및 EML에 감사.
        * IMPROVED: 생성 데이터셋 Xml는 지정에 더 좋습니다.&lt;cdm\\_data\\_type&gt; 및 관련 속성 추가 (예를 들어,&lt;cdm\\_timeseries\\_variables&gt;), 그래서 당신은 그 정보를 공급할 수 있습니다. Rich Signell에 감사.
        * IMPROVED: GenerateDatasets에서 EDDTable datasets를 위한 Xml, 건의&lt;subsetVariables&gt; 이제 훨씬 더 보수적입니다. John Kerfoot 덕분에.
        * IMPROVED: 경우에datasets.xmldatasets에 대한 사양featureType하지만 cdm\\_data\\_type,featureTypecdm\\_data\\_type으로 사용됩니다. Rich Signell에 감사.
        * BUG FIX: 생성 데이터셋 Xml는 이제 올바른 것을 제안합니다.&lt;dataType&gt; 데이터 변수에 대한scale\\_factor·add\\_offset그리고/또는 \\_Unsigned 속성.
    * IMPROVED: 언제ERDDAP™공지사항.nc파일 형식 **더 보기** 그것보다는 (e.g., 그것은 완전히 장소에 복사하지 않았다) ·ERDDAP™이제는 나쁜 파일로 취급합니다. 이전,ERDDAP™netcdf-java의 기본 동작이기 때문에 파일의 누락된 부분에 대한 누락된 값을 반환한다.ERDDAP™지금 사용 ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; 우리의 문제로 인해 RAID 및 Christian Ward-Garrison.
    * IMPROVED: 지금 ISO 19115 작가는 사용을 만듭니다 **제작자\\_type** , 현재 경우.
    * 공급 능력:ERDDAP™이제 추가 유형을 읽을 수있는 최신 netcdf-java v4.6.9을 사용합니다. **netcdf-4 파일** · Craig Risien, Rich Signell, Christopher Wingard 및 OOI 덕분에.
    * BUG FIX: 다른 소스 파일이 주어진 변수에 대한 다른 데이터 유형이 있는 경우 문제가 발생하지 않도록 합니다. 로이 Mendelssohn 및 Eugene Burger 덕분에.
    * 버그 FIX: **시간 형식 변환** 나쁜 시간 값에 대해 더 잘 보호됩니다. NDBC에 감사합니다.
    * 버그 FIX:EDDGrid파일 형식 unpacked now 핸들 시간 값 **"달 이후 ..."및 "년 이후 ..."** 견적 요청 (달 또는 년 증가로, crudely에 의해 e.g를 추가하지 않는, 반복되는 30days) · Soda3.3.1에 감사.
    * BUG FIX: v1.74에서, **구독하기** 자주 묻는 질문 (₢ 킹http://·) , 어느 것이 이고 선택되어야 합니다.
    * 버그 FIX:EDDGrid파일 형식: .lowGetSourceMetadata () 글로벌 속성을 추가하지 않았습니다. 지금 그것은.
         

## 버전 1.74{#version-174} 
 (2016-10-07 출시) 

*    **새로운 기능 (사용자 정의) ::**   
     
    * 이제 Datasets의 목록이 될 때 (모든, 또는 검색에서) 웹 페이지에 표시됩니다. 긴 제목은 여러 줄에 표시됩니다. 너무 이른, 긴 제목의 중간은 "에 의해 대체되었다 ... ". Margaret O'Brien, LTER 및 EML에 감사.
         
*    **기타ERDDAP™관리자는 알아야 할:**   
     
    * TO DO: Linux 컴퓨터에서 Apache 타임아웃 설정을 변경하여 사용자 요청이 타임아웃되지 않도록 (종종 "Proxy" 또는 "Bad Gateway" 오류로 나타납니다.) · 루트 사용자로서:
        
        1. 아파치 수정httpd.conf 파일 (/etc/에서 보통http₢ 킹) ::
현재 변경&lt;Timeout&gt; 설정 (또는 파일의 끝에 하나를 추가) 에 3600 (지원하다) , 대신 기본 60 또는 120 초.
현재 변경&lt;프록시Timeout&gt; 설치하기 (또는 파일의 끝에 하나를 추가) 에 3600 (지원하다) , 대신 기본 60 또는 120 초.
        2. 아파치 재시작: /usr/sbin/apachectl -k 우아한 (하지만 때로는 다른 디렉토리에) ·
        
Thomas Oliver 덕분에.
         
    * 새로운:\\[bigParent감독/하드 비밀번호
이 플래그 디렉토리와 같은 작동하지만, hardFlag 버전은 또한 모든 캐시 된 dataset 정보를 삭제합니다. hardFlag을 설정하는 URL이 없습니다. 이 디렉토리에 파일을 넣어만 사용할 수 있습니다.
뚱 베어 Flags는 당신이 어떻게 변화하는 무언가를 할 때 매우 유용합니다ERDDAP™소스 데이터를 읽고 해석, 예를 들어, 새 버전을 설치할 때ERDDAP™또는 dataset의 정의에 대한 특정 유형의 변경을 할 때datasets.xml· 이름 *[이 문서](/docs/server-admin/additional-information#hard-flag)· John Kerfoot 및 모든 Argo 그룹 덕분에.
         
    * 새로운 기능: GenerateDatasets Xml는 이제 EDDTableFromEML 옵션이 있습니다.
Ecological Metadata Language의 dataset 설명을 읽습니다. (메시지:) 파일, 관련 데이터 파일을 다운로드하고, 펑크를 생성합니다datasets.xmldataset가 추가될 수 있도록ERDDAP· 디렉토리의 모든 EML 파일에 대해 동일한 일을하는 EDDTableFromEMLBatch도 있습니다. 이것은 EML이 데이터 세트를 설명하고 KNB 및 LTER가 실제 데이터 파일을 사용할 수 있기 때문에 매우 잘 작동합니다.
EML 플러스ERDDAP™좋은 조합일 수 있었습니다,ERDDAP™사용자는 KNB와 LTER 데이터의 부에 더 직접 액세스를 제공 할 수 있으며 그 프로젝트가 미국 정부를 만나는 데 도움이됩니다.[연구 결과에 대한 공공 액세스 (뚱 베어) 제품 정보](https://nosc.noaa.gov/EDMC/PD.DSP.php)웹 서비스를 통해 사용할 수있는 데이터를 만들기.
이름 *[이 문서](/docs/server-admin/EDDTableFromEML)· Margaret O'Brien, LTER 및 EML에 감사.
         
    * 새로운 기능: GenerateDatasets Xml는 이제 EDDTableFromInPort 옵션이 있습니다.
InPort XML 파일에 대한 데이터셋 설명을 읽었으며 펑크를 생성하기 위해 트리스datasets.xmldataset가 추가될 수 있도록ERDDAP· 이 드물게 XML의 펑크를 만들datasets.xml, 그러나 그것은 인간의 편집을위한 좋은 시작점 인 좋은 거친 초안을 만들 것입니다.
InPort를 사용하여 데이터셋을 문서화할 경우도 좋습니다.ERDDAP™실제 데이터를 통해ERDDAP's web services and thereby meets 미국 정부와NOAA이름 *[연구 결과에 대한 공공 액세스 (뚱 베어) 제품 정보](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)웹 서비스를 통해 사용할 수있는 데이터를 만들기. 이것은 지금 사용할 수있는 솔루션입니다. (erd.data at noaa.gov도움에 행복한.)   
이름 *[이 문서](/docs/server-admin/datasets#eddtablefrominport)· Evan Howell 및 Melanie Abecassis 덕분에.
         
    * 공급 능력:ERDDAP™이제 netcdf-java 4.6.6을 사용합니다.
이전 버전과 함께 netcdf-java는 몇 가지 채울 값을 읽습니다. (아마, netcdf-4 파일에서) 0으로. 이제 netcdf 표준 채우기 값으로 그들 중 일부를 읽습니다. -127 바이트, -32767 짧은, -2147483647 ints.Unidata새로운 행동은 적절한 행동입니다. dataset의 변수가 0을 표시하는 데 사용되는 이러한 값 중 하나를 보여주는 경우, 추가 할 수 있습니다, 예를 들어,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
변수의addAttributes이름 *ERDDAP™그 가치를missing\\_value/\\_요금 가치. 그러나, 많은 경우에, 그것은 원하는 결과를 산출하지 않을 것입니다: 0's. 그래서, 파일을 수정 고려NCO또는 파일을 rewriting. 자주 묻는 질문 자주 묻는 질문Unidata·
         
    * TO DO: 새로운 토피Depth 팔레트
새로운 TopographyDepth 팔레트를 사용하여 OceanDepth 팔레트를 사용하는 모든 데이터 세트를 전환하는 것이 좋습니다. 색상이 담긴 것을 제외하고 Topography와 같습니다. 따라서 심도 값에 적합합니다. (긍정적인=down) , 위도 값 대신 (긍정=up) · 이 팔레트의 권장 설정은:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * 새로운 기능: 스트레이트missing\\_value그리고/또는 \\_FillValue
String 변수가 정의된 경우missing\\_value그리고/또는 \\_FillValue,ERDDAP™이제 데이터에서 그 값을 제거하고 빈 문자열로 대체 할 수 있으므로 값이 빈 문자열로 나타날 수 있으므로 다른 datasets와 같이ERDDAP· Margaret O'Brien, LTER 및 EML에 감사.
         
    * 새로운 기능: 현지 시간 지원
Strings의 소스 데이터를 가진 timestamp 변수는 이제 "을 통해 시간대를 지정할 수 있습니다.time\\_zone"거의 속성ERDDAP™로컬 시간대 소스 시간을 변환 (어떤 표준 시간에, 일광 절약 시간에 약간) 로그인Zulu시간. 유효한 시간대의 목록은 아마도 TZ 칼럼의 목록과 동일합니다.[이 테이블](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)· 기본값은 "Zulu· 일반 미국 시간대는 미국/하와이, 미국/알래스카, 미국/태평양, 미국/산, 미국/아리조나, 미국/중앙, 미국/동부입니다. numeric source data를 가진 timestamp variables를 위해, 당신은 "를 지정할 수 있습니다time\\_zone" 속성이지만 값은 "이어야한다.Zulu"또는 "UTC". Margaret O'Brien, LTER 및 EML에 감사.
         
    * 새로운 기능: EDDTableFromAsciiFiles는 지금 semicolon 격리한 파일을 지원합니다
그리고 분리기를 피구에 관하여 더 똑똑합니다. Margaret O'Brien, LTER 및 EML에 감사.
         
    * 새로운 기능: LoadDatasets에서 중요한 오류가 있는 경우 (주요 또는 미성년자, 예를 들어, 누락되거나 무효datasets.xml관련 기사) ·ERDDAP™이제는 ERROR로 "n Datasets Failed To Load" 아래의 status.html에서 그것을 나타냅니다. 처리 중datasets.xml: 자세한 내용은 log.txt를 참조하십시오.
         
    * 새로운 기능:ERDDAP™orphans를 찾습니다.
시간 :ERDDAP™주요 부하 Datasets는 이제 orphan datasets를 찾습니다 (데이터 세트ERDDAP™그러나 아니datasets.xml) · 발견되면, ERROR: n Orphan Datasets로 "n Datasets Failed To Load" 아래의 status.html에 나열되어 있습니다. (데이터 세트ERDDAP™그러나 아니datasets.xml) = .....
제거하려면 (기타 제품) 나판에서ERDDAP™, 당신은 추가해야
        &lt;dataset type="_anyValidType_"를 입력합니다.datasetID="_theDatasetID_" active="false" /&gt;
이름 *datasets.xmldataset가 next major loadDatasets 중 언로드 될 때까지.
         
    * 버그 FIX: dataset가 numeric timestamp 변수를 다른 단위로 가지고 있다면"seconds since 1970-01-01T00:00:00Z"그리고 함께&lt;updateEveryNMillis&gt; system active, timetamp variable's range는 dataset이 업데이트되었을 때 incorrectly 설정되었습니다. John Kerfoot 덕분에.
         
    * BUG FIX: 만약&lt;QuickRestart&gt; true in setup.xml 당신은 EDDTable에서 데이터를 요청 ... 사용 된 파일 dataset&lt;updateEveryNMillis&gt;, dataset에 첫번째 요구는 실패할 것입니다, 그러나 후속 요청은 성공할 것입니다. 이제 첫번째 요청은 실패하지 않습니다. John Kerfoot 덕분에.
         
    * BUG FIX: GenerateDatasetsXml.sh와 .bat는 명령줄에 &gt;9 매개변수로 작동하지 않았습니다. 지금 그들은. John Kerfoot 덕분에.
         
    * 버그 FIX: 새로운 EDDTableFromMultidimNcFiles는 문자열에서 트레일 공간을 지속적으로 제거하지 않았습니다. 지금 그것은. 물론,이 영향을 미치는 ARGO 파일. Kevin O'Brien 및 Roland Schweitzer에게 감사.
         
    * 버그 FIX: 리모트의 모든 접근DAP서비스는 이제 더 현대적인 코드로 시작되었습니다. EDDTableFromErddap datasets에 액세스 할 때 "connection close" 오류를 수정합니다. Kevin O'Brien에게 감사.
         
    * 버그 FIX: 관련 상품orderBy· () 그리고 명백한 () 그들은 최근 변경 전에 있었다 방법에 다시 : 주어진 요청은 여러 가지가있을 수 있습니다orderBy· () 그리고/또는 명백한 () 필터;ERDDAP™그들이 지정한 순서에 그들을 취급할 것입니다. David Karuga에게 감사.
         
    * 버그 FIX: dataset가 EDDTableFromDatabase이고 쿼리가 있는 경우[소스CanOrderBy](/docs/server-admin/datasets#sourcecanorderby)및/또는[소스CanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), 다음 데이터베이스는 할 수있다 (설정에 따라datasets.xml) 부분적으로 또는 완전하게 손잡이 **첫 번째**  orderBy... () 또는 명백 () · David Karuga에게 감사.
         
    * 버그 FIX: 최근 추가 퍼센트 인코딩은 일부 쿼리에 문제가 발생했습니다..ncCF 파일, 예, "HTTP 상태 500 - Query 오류 : 변수 = 역은 결과 변수 목록에서 두 번 나열됩니다." Kevin O'Brien에게 감사.
         
    * BUG FIX: EDDTableFromFiles는 열 중 하나가 진정한 숯 열이었을 때 dataset를 다시 로드해야 했습니다. Roland Schweitzer에게 감사.
         
    * 버그 FIX:EDDGrid파일 형식 지금도 변환missing\\_value그리고 \\_FillValue to standard values 그래서 다른 값을 가진 파일은 집계될 수 있습니다. 이 변화 때문에, 당신은이 새로운 버전을 설치 한 후ERDDAP™, 설정하십시오[뚱 베어 팟캐스트](/docs/server-admin/additional-information#hard-flag)각각EDDGrid파일 형식 당신의 데이터 세트ERDDAP·
         
    * IMPROVED: EDDTableFromNcCFFiles는 지금 다수 견본\\_dimension가 있는 파일을 취급할 수 있습니다. 주어진 dataset는 sample\\_dimensions 중 하나를 사용하는 변수만 사용한다. Ajay Krishnan 덕분에.
         
    * IMPROVED: EDDTable을 위해... 파일,&lt;정렬파일BySourceNames&gt; 이제 comma-separated을 허용 ((주)) 또는 공간은 변수 소스 이름의 목록을 분리합니다. 어느 경우, 개별 변수 이름은 두 배 인용에 의해 둘러싸여있을 수 있습니다, 예를 들어, 이름이 내부 공간이 있으면.

## 버전 1.72{#version-172} 
 (출시일 2016-05-12) 

*    **새로운 기능 (사용자 정의) ::** 없음.
     
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 새로운 EDDTableFromMultidimNcFiles[EDDTableMultidimNcFiles에서](/docs/server-admin/datasets#eddtablefrommultidimncfiles)EDDTableFromNcFiles에 새로운 대안입니다. 그것은 공유된 차원, 예를들면, var1를 가진 몇몇 변수를 가진 파일의 그룹을 취급하기 위하여 디자인됩니다\\[한국어\\]\\[₢ 킹\\]·\\[한국어\\]·\\[₢ 킹\\], 사기. Argo Project, Aurélie Briand 및 Roland Schweitzer에게 감사하십시오.
    * 버그 FIX:ERDDAP™  (FileVisitorDNLS 및 FileVistorSubdir 클래스를 통해) 이제 Linux의 상징적 링크가 따릅니다.ERDDAP™여전히 Windows에서 .lnk의를 따르지 않습니다.
    * 버그의 BUG FIX 1.70에 소개: 명백한 +orderBy한 번에 함께 허용되지 않았습니다. 이제 그들은 다시. 그들은 상호적으로 독점/redundant 아닙니다. David Karuga에게 감사.
    * CHANGE로datasets.xmlIP 주소의 블랙리스트:
IP v4 주소가 나타납니다ERDDAP™as 4 period-separated hex 번호.
IP v6 주소가 8개의 대장 격리된 육수로 나타났습니다.
이름 *ERDDAP™이제는 해당 목록의 IP 주소에서 식민지를 지원하고 :\\* 목록의 끝에서 주소 범위를 차단합니다.
    * 공급 능력:ERDDAP™이제 NetcdfFileWriter를 사용하여 쓰기.ncdeprecated NetcdfFileWriteable 대신 파일. 결과 파일에 신중한 변화가 없습니다. 이것은 큰 만들기의 가능성을 열어.nc파일 사용.nc3개의 64bit 연장. 원하는 경우 / 네, 요청을 보내주십시오.erd.data at noaa.gov·
    * IMPROVED: 먼 웹사이트에 연결의 많은 것은 최신이었습니다. 이제 그들은 최신이며 사용https:대신에http: 가능한 한.
    * 많은 작은 변화.

## 버전 1.70{#version-170} 
 (2016-04-15 출시) 

*    **새로운 기능 (사용자 정의) ::** 없음.
     
*    **기타ERDDAP™관리자는 알아야 할:** 아래는 setup.xml 파일에 문서에 몇 가지 권장 사항이 있습니다.
이 변경 사항이 있습니다.
30 분의 작업은 이제 미래에 혼란의 시간을 절약 할 수 있습니다.
    * 버그 수정: 문제는 원격으로 리디렉션 된 요청이었다ERDDAP잘못된 문자로 실패 '|' 오류 메시지. 이것은 Tomcat의 최근 버전으로 만 발생했습니다. Rusty Holleman, Conor Delaney 및 Roy Mendelssohn 덕분에.
    * 버그 수정:ERDDAP™이제 netcdf-java의 최신 버전을 사용합니다. (그것은 긴 이야기) NcML에 대한 최신 지원이 포함 된 경우 NcML LogicalReduce와 문제가 예상대로 작동하지 않습니다. 메타데이터에 약간의 변화가 있을 수 있습니다.ERDDAP™netcdf-java 를 통해 읽기.nc·.hdf, .grib 및 .bufr 파일. Favio Medrano에 감사합니다.
    * 새로운[연락처](/docs/server-admin/datasets#eddtableaggregaterows)동일한 단위를 사용하여 동일한 데이터 변수를 가지고있는 두 개 이상의 EDDTable 데이터 세트에서 EDDTable 데이터 세트를 병합 할 수 있습니다. Kevin O'Brien에게 감사.
    * EDDTableFromDatabase에 대한 새로운 옵션 ([소스CanOrderBy](/docs/server-admin/datasets#sourcecanorderby)이름 *[소스CanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) 당신은 여부를 지정ERDDAP™, 데이터베이스, 또는 둘 다, 명백하고 취급orderBy  (모든 변형) 제약. David Karuga에게 감사.
    * 이제 개인 데이터 세트의 그래프와 메타 데이터를 새로운 통해 공개 할 수 있습니다 [&lt;graphsAccessibleTo&gt;공동&lt;/graphs액세서리To&gt; (/docs/server-admin/datasets#graphsaccessibleto) 태그. Emanuele Lombardi 덕분에.
    * 이제 GenerateDatasets에 전달된 문자열이 있다면 Xml 또는 DasDds는 두 배 인용에 의해 포위됩니다, 그것은 인용되지 않습니다 (JSON 문자열이라면) · John Kerfoot 및 Melanie Abecassis 덕분에.
    * Generate데이터셋 Xml는 이제 "default"를 지원하여 기본 및 "nothing" 빈 문자열을 얻기 위해 (그들은 따옴표 없이 일합니다) · 이것은 빈 문자열을 전달하는 데 관련된 몇 가지 문제를 해결합니다.
    * 지금, GenerateDatasets에서 Xml, 모두EDDGrid파일 및 EDDTable fromFiles datasets, 샘플이 있다면 지정된 파일이름은 ""입니다 (빈 문자열) , 디렉토리 + regex + recursive=true에서 마지막 일치하는 fileName을 사용할 것입니다.
    * 업데이트: GenerateDatasetsXml와 DasDds의 결과를 표시하는 데 사용되는 displayInBrowser 코드는 리눅스 컴퓨터에서 out-of-date이고 Netscape에 대한 이상한 메시지를주었습니다. 이제는 현대 리눅스 도구를 사용합니다: xdg-open. Melanie Abecassis 덕분에.
    * 더 보기allDatasetsdataset는 이제"files"열, /files 링크의 기본 URL을 나타냅니다 (그대는) dataset를 위해.
    * 당신의 일반 보안을 증가ERDDAP™tomcat 디렉토리와 bigParentDirectory와 관련된 권한을 변경함으로써:
         (아래 실제 명령은 Linux에 있습니다. 다른 OS의 경우 아날로그 변화를 만듭니다.) 
        * "그룹"을 tomcat로 변경, 사용자 이름, 또는 Tomcat/의 모든 관리자를 포함하는 작은 그룹의 이름ERDDAP, 예를들면
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
카테고리 사용자 이름 bigParentDirectory_
        * tomcat과 그룹이 읽기, 쓰기, 실행 권한, 예를 들면 변경 권한을 변경합니다.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParent감독_
        * "other"사용자의 권한을 읽고, 쓰기, 또는 실행:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParent감독_
이 중요한 것은, 그것 때문에 다른 사용자를 읽기에서 아마도 민감한 정보를 inERDDAP™설정 파일, 로그 파일 및 개인 데이터셋에 대한 정보가있는 파일.
    * 인증/로그인 시스템은 개정되었습니다. Thomas Gardner, Emanuele Lombardi 및 미국 정부의 새로운 감사[HTTPS-Only 표준](https://home.dotgov.gov/management/preloading/dotgovhttps/)·
        * 인증=openid 옵션이 제거되었습니다. 그것은 최신이었다.
        * 새로운, 추천,[인증=google](/docs/server-admin/additional-information#google)옵션 사용 Google 로그인 (OAuth 2.0 기반) Google 이메일 계정으로 누구나 허용 (기타 제품 Google 관리 계정@noaa.gov) 로그인
        * 새로운,[인증=이메일](/docs/server-admin/additional-information#email)옵션은 인증 = 구글에 대한 백업입니다. 사용자를&lt;user&gt; 태그datasets.xml자주 묻는 질문
        * setup.xml에서 설명을 변경하십시오.&lt;인증&gt;
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * setup.xml에서, 아래의 이 권리를 추가하십시오.&lt;인증&gt; 태그 :
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * 이제 사용할 수 없는 사용자http또는httpsURL (설정한 경우)&lt;당신의 setup.xml에 baseHttpsUrl&gt;. 미국 정부의 새로운 감사[HTTPS-Only 표준](https://https.cio.gov/)·
        * 지금, 당신은 모든 사용자를 사용할 수https  (아니다.http) 으로 설정&lt;baseUrl&gt;는httpsURL. 사용자를 강제로https, Apache/Tomcat 설정으로 변경해야 합니다.https접속하다 미국 정부의 새로운 감사[HTTPS-Only 표준](https://https.cio.gov/)·
            
setup.xml에서 설명을 변경하십시오.&lt;baseUrl&gt;는
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * 옵션 정보&lt;비밀번호 수정. setup.xml에서 설명을 변경하십시오.&lt;passwordEncoding&gt; 을
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * setup.xml에서 설명을 변경하십시오.&lt;baseHttpsUrl&gt;는
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * 이제, if listPrivateDatasets=true in setup.xml, 심지어 더 적은 정보는 사용자가 액세스 할 수없는 데이터 세트에 대해 표시됩니다.
    * 이제, 특히 당신이 처음 설정할 때ERDDAP, 당신은 지금 말할 수 있습니다ERDDAP™원격으로 가입하려고하지ERDDAP™데이터셋. Filipe Rocha Freire 덕분에.
당신의 setup.xml에서, 오른쪽 전에&lt;fontFamily&gt;, 추가
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * setup.xml에서 위의 지시에서&lt;emailFromAddress&gt;는, 삽입합니다:
가능한 경우, 보안 연결을 사용하려면 (사이트맵) 이메일 서버로.
설정이 이메일 서버에 보안 연결을 사용하지 않으면 변경 사항을 확인하시기 바랍니다.
    * 내 계정datasets.xml, 이 선을 설명에 추가하십시오&lt;구독이메일Blacklist&gt; 당신의datasets.xml::
이름을 사용할 수 있습니다 "\\*"에 blacklist 전체 도메인, 예,\\*웹 사이트
    * v1.66의 로깅 시스템에 변경되어 로그 파일이 업데이트되지 않습니다. 항상 메시지 또는 로그 파일에 기록 된 메시지의 부분이 있습니다. 이제 업데이트 할 수 있습니다. (즉시) 으로 보고ERDDAP's 상태 웹 페이지' http://_your.domain.org_/erddap/status.html ·
    * HashDigest .......
    * 작은 변화 (String2.canonical에) 그것은 빨리 움직이는 것을 도울 것입니다ERDDAP™매우 바빴고 데이터 세트의 매우 큰 숫자로 더 나은 거래입니다.
    * 제품정보 추천: 사용 중지&lt;변환ToPublicSourceUrl&gt; 내 계정datasets.xmldataset의 IP 번호를 변환하기&lt;sourceUrl· (₢ 킹 http://192.168.#.#/ ) 도메인 이름 (₢ 킹http:my.domain.org/의 경우) · 지금부터, 새로운 구독 http://localhost · http://127.0.0.1 · http://192.168.#.# URLS는 보안상의 이유로 허용되지 않습니다. 그래서 항상 공용 도메인 이름을 사용하십시오.&lt;sourceUrl&gt; 태그 (DNS 문제 때문에 필요한 경우) , 당신은 사용할 수 있습니다[/etc/hosts 테이블에 서버](https://linux.die.net/man/5/hosts)DNS 서버를 사용하지 않고 로컬 도메인 이름을 IP 번호로 변환하여 문제를 해결합니다. 주어진 도메인 이름이 제대로 해결되면 테스트 할 수 있습니다.
핑 _some.domain.name_
    * Remote datasets를 위한 generateDatasets.xml에서 (THREDDS 서버에서 e.g.) , 자동 생성datasetIDs는 대부분의 도메인에 대한 변경되지 않습니다. 몇 가지 도메인의 경우, 첫 번째 부분 (i.e., 이름) 자동 생성datasetID약간 다릅니다. 그렇지만, 한 부분이 이제 두 개의 부품을 가질 가능성이 더 있습니다. 예를 들면, datasets에서 http://oos.soest.hawaii.edu 이전 leddatasetIDhawaii\\_로 시작된 s, 하지만 지금은datasetIDhawaii\\_soest\\_로 시작하는 s. 이 문제가 발생하면 이메일을 보내주십시오. 일주일 수 있습니다.
    * Cassandra 드라이버는 cassandra-driver-core-3.0.0.jar에 업데이트되었으며 Cassandra v3에 사용됩니다. EDDTableFromCassandra는 Cassandra의 새로운 기능의 이점을 활용하지 않습니다. v3.의 Cassandra의 인덱스는 이제 더 복잡 할 수 있지만,ERDDAP™여전히 색인 된 열이 직접 queried 가정하는 Cassandra v2 색인 모델을 사용합니다.'='제약. Generate데이터셋 EDDTableFromCassandra를 위한 Xml는 더 이상 색인을 가진 란을 검출합니다; 색인이 간단한 경우에, 당신은 그것에 그것을 지정할 필요가 있습니다datasets.xml손으로. 더 복잡한 인덱스 또는 다른 새로운 기능에 대한 지원이 필요하면 이메일을 보내주십시오.erd.data at noaa.gov·
· 여전히 Cassandra 2.x를 사용한다면 계속 사용하세요.ERDDAP™Cassandra 3.x를 사용하여 업그레이드 할 때까지 v1.68.
    * Jars and the Classpath -- 포함 된 제 3 자의 거의 모든 .jar 파일은 최신 버전으로 업데이트되었습니다.
        * slf4j.jar는 /lib 및 classpath에 추가되었습니다.
        * 뚱 베어 jar와 tsik. jar는 /lib 및 classpath에서 제거되었습니다.
        * 컴파일하거나 실행할 때 클래스에 대한 오류 메시지가 발생하면ERDDAP™또는 도구 중 하나, 명령 줄의 classpath를 비교ERDDAP이름 *[현재 classpath](/docs/contributing/programmer-guide#development-environment).jars가 classpath에서 누락되었는지 알아보세요.

## 버전 1.68{#version-168} 
 (출시일 2016-02-08) 

*    **새로운 기능 (사용자 정의) ::** 없음.
     
*    **기타ERDDAP™관리자는 알아야 할:** 
    *   [EDDGridFile Names 또는 Global Metadata를 통한 파일 집합](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
모든 변화의EDDGridfromFiles는 이제 새로운 왼쪽 차원을 추가하여 파일의 그룹을 집계 할 수 있으며, 보통 각 파일명에서 파생된 값 또는 각 파일에 있는 글로벌 속성의 값에 근거합니다.
    * IMPROVED: 우리는 이전에 당신이 창조하고 싶은 것을 건의했습니다EDDGridFromErddap 데이터셋에서datasets.xmljplMU를 참조하고 보존RSST 데이터셋ERDDAP· 이제 데이터 세트의 새로운 버전이 있기 때문에 데이터 세트가 이제 비활성화됩니다. 그래서 데이터셋이 있다면ERDDAP™, 이 새로운 dataset를 추가하십시오
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
오래된 jplMU를 제거하려면RSS당신의 T datasetERDDAP™  (그것은 당신의 선택입니다) , "true"에서 "false"로 활성 설정을 변경합니다.
    * 버그 수정: setup.xml에 지정한 bigParentDirectory를 확인하십시오. 슬래시를 넣지 않았다면&lt;bigParentDirectory&gt; 이름, 다음ERDDAP™하위디렉토리를 만들기 대신 지정된 이름에 직접 appending 단어에 의해 여러 디렉토리를 만들 것입니다. 버전 1.68로 시작,ERDDAP™지정하지 않은 경우 디렉토리 이름의 끝에 slash를 추가합니다. 그래서 이전에 끝에서 슬래시를 지정하지 않았다면, 다음 설치시ERDDAP™v1.68 당신은 이동 하 고 그 디렉토리 이름을 변경 해야 **후에** 당신은 오래된 종료ERDDAP™이름 * **이전 다음** 새로운 시작ERDDAP· 예를 들어, 실수로 /home/erddapBPD로 bigParentDirectory를 지정한 경우 (트레일 슬래시) 이름 *ERDDAP™실수로 만든 디렉터리
/home/erddapBPDcache의 경우
/home/erddapBP복
/home/erddapBPD데이터셋
/home/erddapBPDflag에
/home/erddapBPDlogs에 대 한
/home/erddapBPDlucene에
/home/erddapBPDsubscriptionsV1.txt라는 파일,
그런 다음 이동하고 이름을 변경해야합니다.
/home/erddapBPD / 캐시
/home/erddapBPD/복사
/home/erddapBPD/데이터셋
/home/erddapBPD/플라그
/home/erddapBPD/로그
/home/erddapBPD/루엔
그리고 /home/erddapBPD/subscriptionsV1.txt
    * 버그 수정: 버그가 있었습니다.EDDGridLonPM180 에ERDDAP™아이 dataset가 될 때 발생 v1.66는EDDGrid보낸 사람
    * 버그 수정: 버그가 있었습니다.EDDGrid파일 및 EDDTable 파일에서ERDDAP™일어난 v1.66&lt;updateEveryNMillis&gt;는 첫번째로 무시될 것이다 dataset는 재시작 후에 적재되었습니다.
    * 버그 수정 / 새로운 기능 : 아이 데이터셋이 있는 경우EDDGridAggregateExisting차원,EDDGrid복사,EDDGridatEDDTable,EDDGrid사이트맵EDDGridSideBySide, EDDTableCopy 또는 EDDTableFromEDDGridis a ...FromErddap dataset, 그 부모 데이터 세트는 이제 underlying에 가입ERDDAP™데이터셋. 부정 행위ERDDAP™dataset는 동일합니다ERDDAP™, 구독 및 유효성 검사는 직접 수행된다; 당신은 구독을 유효하게하는 이메일을 요청하지 않습니다. 그렇지 않으면, 구독 시스템의 경우ERDDAP™설정&lt;reloadEveryNMinutes&gt; 부모 dataset에 대한 설정 (60?) 그래서 그것은 최신을 유지.
    * 버그 수정 / 새로운 기능 : 아이 데이터셋이 있는 경우EDDGridAggregateExisting차원,EDDGrid복사,EDDGridatEDDTable,EDDGrid사이트맵EDDGridSideBySide, EDDTableCopy 또는 EDDTableFromEDDGridactive="false", 그 아이 dataset는 이제 건너 뛰고 있습니다.

## 버전 1.66{#version-166} 
 (출시일 2016-01-19) 

*    **새로운 기능 (사용자 정의) ::** 
    * 그래프 (지도 없음) 이제 axes의 값을 내려 놓을 수 있습니다. Graph 웹 페이지를 사용 할 때이를 얻으려면 새로운 Y 축을 변경하십시오 : ascending 설정 (기본값) 내려받기 또는 그래프를 요청하는 URL에서 새로운 옵션 3rd '을 사용하십시오.|' 매개 변수[· 범위 및 / 또는 &. yRange 스위치](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)아무것도 할 수있는 (기본값) , true, t to get ascending value, or use false or f to get down value. 진정한|false 값은 case insensitive입니다. Chris Fullilove, John Kerfoot, Luke Campbell 및 Cara Wilson에게 감사하십시오.
    * 사용자는 &.bgColor=0x_를 추가하여 그래프의 배경 색상을 지정할 수 있습니다. AARRGGBB_ 그래프를 요청하는 URL로 전환합니다. 그래픽 명령 섹션에서 .bgColor 참조[다운로드](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)이름 *[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)문서. John Kerfoot 및 Luke Campbell에게 감사하십시오.
    * tabular datasets를 위해, constraints는 지금 min를 참조할 수 있습니다 (_someVariable이름_) 또는 최대 (_someVariable이름_) · 이름 *[소요시간 () 그리고 최대 () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)· John Kerfoot 덕분에.
    * tabular datasets를 위해, 사용 시간 constraints[현재 위치](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)밀리 초 또는 밀리 초의 시간을 지정할 수 있습니다.
    * 탭 데이터셋의 이미지에 대한 요청은 이제 맵을 만듭니다. (아니 그래프) x와 y 변수가 경도와 위도 같은 변수인 경우 (호환 단위) · Rich Signell에 감사.
    * 버그 수정 : 시간 축 라벨과 진드기는 때때로 여러 그래프를 동시에 요청할 때 확률의 불규칙성을 가지고 (e.g., 웹 페이지에) · 문제는 SGT 그래픽 라이브러리의 버그였습니다.ERDDAP™제품정보 (한 변수는 "정전" 이므로) · Bradford Butman에게 감사.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 설정.xml과 같은 일반 텍스트 파일에 이메일 암호를 넣어 보안 위험입니다. 그 문제를 완화하기 위해, 우리는 당신이 그것을 강력하게 추천합니다:
        1. 이메일 계정 설정ERDDAP's use, e.g., erddap@yourInstitution.org . 그것은 다른 이점이 있고; 믿을 수 없을 만큼, 1개 이상ERDDAP™관리자는 그 이메일 계정에 액세스 할 수 있습니다.
        2. setup.xml 파일 rw의 권한을 만드십시오 (읽기+쓰기) Tomcat을 실행하는 사용자ERDDAP™  (user=tomcat 은?) 및 권한 없음 (읽거나 쓰기) 그룹 및 기타 사용자의 경우. Filipe Rocha Freire 덕분에.
    * 새로운[아카이브ADataset](/docs/server-admin/additional-information#archiveadataset)도구는 간단하게 만들기.tar.gz아카이브에 적합한 형식의 dataset의 하위 집합과 아카이브 (그렇지만,NOAA한국어) · 이것은 많은 것에 유용합니다ERDDAP™많은 상황에서 관리자, 하지만 특히 그룹에 대 한NOAA·
    * 새로운 dataset 유형[EDDGrid보낸 사람NcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)의 변형EDDGrid파일 형식 차이점은이 클래스가 각 데이터 파일을 풀기 전에EDDGridfromFiles는 파일에서 보입니다:
        
        * 그것은 unpacks는 사용할 수있는 변수를 포장scale\\_factor및/또는add\\_offset·
        * \\_Unsigned=true 속성을 더 큰 정수 데이터 유형에 가지고 있는 정수 변수를 촉진하므로 값은 할당되지 않은 값으로 나타납니다. 예를 들어, \\_Unsigned=true 바이트 (8 조금) 변수가 서명된 짧은 (16 조금) 변수.
        * \\_FillValue를 변환하고missing\\_valueNaN의 가치 (또는 MAX\\_VALUE integer 데이터 유형) ·
        
이 클래스의 큰 장점은 다양한 가치를 다루는 방법을 제공합니다scale\\_factor·add\\_offset, \\_FillValue, 또는missing\\_value수집에 다른 파일에서. 그렇지 않으면, 당신은 같은 도구를 사용해야합니다[사이트맵](/docs/server-admin/datasets#ncml-files)또는[NCO](/docs/server-admin/datasets#netcdf-operators-nco)각 파일을 수정하여 파일이 처리 될 수 있도록 차이를 제거EDDGrid파일 형식 이 클래스를 위해 제대로 작동하려면 관련 속성에 대한 CF 표준을 따르십시오. Philippe Makowski 덕분에.
    * 새로운 dataset 유형[EDDGrid론PM180](/docs/server-admin/datasets#eddgridlonpm180)어떤 경도 값이 180보다 큰 데이터셋을 변경할 수 있습니다. (e.g., 범위 0에서 360) 범위 내에서 경도값을 가진 datasets로 -180에서 180 (경도 Plus 또는 Minus 180, 그러므로 이름) · 범위 -180에서 180까지의 경도값을 가진 데이터셋을 제공하는 큰 장점은OGC(주) (₢ 킹WMS) 이 범위에 있는 경도값을 요구합니다. Lynne Tablewski, Fabien Guichard, Philippe Makowski 및 Martin Spel 덕분에.
2016-01-26 · 업데이트: Eeek&#33; 아이 데이터셋이 될 때 발생하는 버그가 있습니다.EDDGridfromErddap에서 dataset을 참조합니다.ERDDAP· 이 버그가 수정되었습니다.ERDDAP™v1.68.
    * 내 계정[생성데이터셋Xml](/docs/server-admin/datasets#generatedatasetsxml), 새로운 특별한 dataset 유형,EDDGridLonPM180ErddapCatalog는 생성 할 수 있습니다datasets.xml제품정보EDDGridLonPM180 모든 데이터 세트EDDGrid데이터 세트ERDDAP180보다 더 큰 경도 값이 있습니다.
    * 모든 것EDDGriddatasets, 에서datasets.xml당신은 지금 선택을 사용할 수 있습니다
[기타]&lt;(주) 이름 *WMS&gt;직접|이름 *&lt;/액세스 이름 *WMS&gt;] (/docs/server-admin/datasets#accessibleviawms)   (기본값=true) · 이를 false forcibly disables로 설정WMS이 dataset를 위한 서비스. true이면 dataset은 여전히 접근할 수 없습니다.WMS다른 이유 (e.g., lat 또는 lon 축 없음) · 데이터셋에 특히 유용합니다.EDDGridLonPM180, LonPM180 버전만 사용할 수 있습니다.WMS·
    * setup.xml에서 그래프의 배경에 다른 기본 색상을 지정할 수 있습니다. 색상은 AA, RR, GG 및 BB가 불투명, 빨간색, 녹색 및 파란색 구성 요소 인 0x_AARRGGBB_ 형태로 8 자리 16 진수 값으로 지정됩니다. 캔버스는 항상 불투명 흰색이므로 (아사쿠사 - - -) 투명한 도표 배경 색깔은 백색 화포로 혼합합니다. 기본값은 밝은 파란색입니다:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
John Kerfoot 및 Luke Campbell에게 감사하십시오.
    * setup.xml에서 최대 크기를 지정할 수 있습니다.[로그 파일](/docs/server-admin/additional-information#log)  (로그인할 때 다운로드 이전과 새로운 로그. txt는) MegaBytes에서. 최소 허용은 1입니다. 허용되는 최대 2000입니다. 기본값은 20 (사이트맵) · 예를 들면:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * 내 계정datasets.xml·&lt;fgdcFile 지시어 (/docs/server-admin/datasets#fgdcfile) 또는 [&lt;ISO19115파일&gt; (/docs/server-admin/datasets#iso19115파일) 이제 로컬 파일이 될 수 있습니다. (시작하기) 또는 URL (로컬 복사본이 있는 경우) · 이름 *ERDDAP™파일을 다운로드 할 수 없습니다, dataset의 로딩이 계속되지만 dataset은 fgdc 또는 iso19115 파일이 없습니다.
    *   EDDGrid파일 및 EDDTable FromFiles datasets는 이제 QuickRestart를 할 수 있습니다 (시스템ERDDAP™datasets가 처음 로드될 때 사용하는 triesERDDAP™재시작) · 재시작 속도ERDDAP·
2016-01-26 · 업데이트: Eeek&#33; 이것은 원인의 버그가&lt;updateEveryNMillis&gt;는 첫번째로 무시될 것이다 dataset는 재시작 후에 적재됩니다. 이 버그가 수정되었습니다.ERDDAP™v1.68.
    * QuickRestart 시스템에 대한 일반적인 개선은ERDDAP™datasets를 더 빨리 적재하기 위하여ERDDAP™재시작.
    * 모든 것EDDGrid파일 및 EDDTable FromFiles subclasses는 이제 새로운 것을 받아들였습니다.&lt;pathRegex&gt; 태그, 일반적으로 아래의 오른쪽에 지정&lt;recursive&gt;. recursive가 "true", pathRegex와 일치하는 전체 하위 디렉토리 경로 (기본값=".\\*") 접수합니다. 마찬가지로,&lt;sourceUrls&gt; 태그EDDGridAggregateExistingDimension은 이제 pathRegex 속성을 포함 할 수 있습니다. (기본값=".\\*") ·
    * 기본값은&lt;setup.xml의 부분RequestMaxBytes&gt;는 이제 490000000입니다. (~490메가바이트) · 이것은 THREDDS 데이터 서버에서 데이터를 얻기와 관련된 몇 가지 문제 / 시간 초과를 방지합니다. Leslie Thorne 덕분에.
    * 로그 시스템에 작은 변화는 허용해야ERDDAP™그것은 아주, 아주 바쁜 때 더 대답될 것입니다. 이제는 상당히 큰 펑크에 디스크 드라이브에 로그 파일에 기록됩니다. 장점은 매우 효율적입니다 --ERDDAP™로그 파일에 기록 될 정보를 기다리지 않을 것입니다. 단점은 로그가 거의 항상 부분 메시지로 끝나고 다음 펑크가 작성 될 때까지 완료되지 않습니다.
    * inotify와 관련 버그 수정 [&lt;update모든NMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis의 경우) 시스템용EDDGrid파일 및 EDDTable fromFiles 데이터셋: fs.inotify.max\\_user\\_watches 또는 fs.inotify.max\\_user\\_instances의 대형을 지정할 필요가 없습니다. 버그가 있습니다.Java그 원인의 일부Java's inotify/WatchDirectory 시스템은 최종적으로 처리될 때 수집되지 않습니다. 결국, zombie inotify 시계 또는 인스턴스의 수는 최대 번호를 초과할 것입니다.ERDDAP™지금 이 주위에 작동합니다.Java버그.
또한, inotify 스레드의 수는 status.html 웹 페이지에 나열되어 있으므로 사용시 눈을 유지할 수 있습니다. 일반적으로 1개의 inotify 실이 있습니다.EDDGrid파일 및 EDDTable fromFiles 데이터셋.
    * 버그 수정: 많은 장소에서, 대신 오류가 재화되고, 새로운 오류는 원래 오류 메시지의 짧은 버전을 포함하고 스택 추적없이 생성되었다. 이제, 새로운 오류가 생성되면, 그것은 제대로 전체 원래 예외 e.g를 포함, 새로운 예외를 던져 ("일부 새로운 메시지", e) ·
Susan Perkins에게 감사.
    * 버그 수정 : 최근까지 (v1.64?) , 만약 .../datasetIDURL이 요청되었습니다.ERDDAP™URL에 .html을 추가합니다. v1.64에서이 실패 (incorrectly 포맷 된 URL이 생성되고 실패) · 지금이 작동합니다. Chris Fullilove에 감사합니다.

## 버전 1.64{#version-164} 
 (2015-08-19 출시) 

*    **새로운 기능 (사용자 정의) ::** 
    * 비밀번호 보호에 대한 안내가 있습니다.ERDDAP™데이터셋 (https://) 이름 *curl이름 *Python· 이름 *[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)이름 *[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)이름 *
NANOOS 및 Paul Janecek of Spyglass Technologies의 Emilio Mayorga 덕분에.
         
*    **기타ERDDAP™관리자는 알아야 할:** 
    *   ERDDAP™현재 요구 사항Java1.8+.
        Java1.7 도달[삶의 끝](https://www.oracle.com/technetwork/java/eol-135779.html)  (더 많은 보안 업데이트) 2015년 4월 이 버전의ERDDAP™버전으로 작동하지 않을 것Java1.8 이하. 로그인Java1. 크기 (또는 이전) , 당신은 또한 톰캣을 업데이트해야합니다. 이름 *[ERDDAP™자주 묻는 질문](/docs/server-admin/deploy-install)다운로드 링크 및 조언.
    * 새로운 데이터 공급자 양식.
데이터 공급자가 귀하의 데이터에 추가 할 때ERDDAP™, it can be difficult and time consuming to collect all of the metadata needed to add dataset intoERDDAP· 많은 데이터 소스 (예를 들면, .csv 파일, Excel 파일, 데이터베이스) 내부 metadata가 없습니다.ERDDAP™데이터 공급자의 메타 데이터를 수집하는 새로운 데이터 제공 업체 양식을 가지고 데이터 제공 업체는 Data In Database에 대한 광범위한 지침을 포함한 다른 지침을 제공합니다. 제출된 정보는datasets.xml형식과 그 다음에 이메일ERDDAP™관련 기사 (이름 *) 관련 기사 (이름 *) bigParentDirectory/logs/dataProviderForm.log 으로 따라서, the form semi-automates the process of getting dataset intoERDDAP™, 하지만ERDDAP™관리자는 여전히 완료해야datasets.xmlchunk 과 거래 와 getting 데이터 파일 (₢ 킹) 공급자에서 또는 데이터베이스에 연결. 더 많은 정보를 원하시면,[데이터 공급자 양식 설명](/docs/server-admin/datasets#data-provider-form)·
    * (주)&lt;경기AxisNDigits&gt;
사용될 수 있습니다EDDGrid파일 형식 (그리고 이렇게 fromNcFiles와 fromMergeIRFiles) ·EDDGridAggregateExisting차원,EDDGrid복사 및EDDGridSideBySide datasets는 다른 파일에서 축 값과 정확히 동일하게 지정해야 합니다. (몇 자리) : 0=확인 없음 (이것을 사용하지 마세요&#33;) , 정밀도 증가를 위한 1-18, 또는 20 (기본값) 정확한 equality를 위해. n=1-18를 위해,ERDDAP™두 배 값의 첫 번째 n 자리가 보장 (또는 (₢ 킹) float 값에 대한 div 2) 동일하다.
        &lt;matchAxisNDigits&gt; 교체&lt;keepAxisValuesAreEqual&gt;, 지금 deprecated. 'true'의 값은 matchAxisNDigits=20로 변환됩니다. 'false'의 가치 (이것을 하지 마세요&#33;) 일치로 변환됩니다. AxisNDigits=0입니다.
    *   EDDGrid파일 및 EDDTable FromFiles는 당신이 이 버전을 사용하는 첫번째로 아주 천천히 적재할 것입니다ERDDAP·
        ERDDAP™이제 내부 파일 정보를 약간 다르게 저장하므로 이러한 데이터 세트의 각 내부 파일 테이블은 재건해야합니다. 그래서 걱정하지 마세요. 아무것도 잘못. 그것은 한 번입니다.
    * 원격 소스 파일
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles는 이제 파일이 원격 파일이 디렉토리에 접근할 수 있도록 허용합니다.http://  (그리고 아마https://그리고 ftp://, 그러나 그들은 시험되지 않습니다) 원격 서버가 지원되는 경우[연락처](https://en.wikipedia.org/wiki/Byte_serving)요청 헤더에서. THREDDS 및 Amazon S3 지원 범위 요청,Hyrax아니다. 이 시스템은 파일을 다운로드하지 않고 원격 파일에 데이터를 액세스 할 수 있습니다 (원격 파일이 너무 voluminous이라면 도움이되는) , 그러나 이 파일에 접근은 국부적으로 파일 또는 리모트에 접근 보다는 멀리 더 느릴 것입니다OPeNDAP이름 *
이 포함"files"Amazon S3 Bucket에서 사용할 수 있으므로http://· S3 객체 이름은 filenames와 같습니다. (내부 / Linux 디렉토리 트리처럼) ·ERDDAP™또한 파일을 통해 액세스 할 수 있습니다ERDDAP이름 *"files"시스템. 이 작업을 위해 S3 자격은 ~/.aws/credentials이어야 합니다. (리눅스, OS X 또는 유닉스에서) , 또는 C:\\Users\\USERNAME\\.aws\\credentials\\사용자이름\\.aws\\ (Windows에서) 서버에서ERDDAP· 이름 *[Amazon SDK 문서](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1)·
    * Generate데이터셋 Xml는 새로운, 특별한 옵션이 있습니다. EDDsFromFiles.
이 파일 시스템을 통해 이동합니다 (Amazon S3와 같은 원격 시스템은 객체가 파일과 같은 이름을 가지고 있다면) 그리고 창조datasets.xml데이터셋 시리즈의 펑크. 당신의 마일리지는 다를 수 있습니다. 이 작업을 잘하면 파일이 조직되어 주어진 디렉토리의 모든 데이터 파일 (그리고 그것의 subdirectories) 1개의 dataset를 위해 적당합니다 (e.g., 모든 SST 1 일 복합 재료) · 이름 * (e.g., 디렉토리가 일부 SST 파일과 일부 Chlorophyll-a 파일을 포함하면) ,이 작품은 좋지만 여전히 유용 할 수 있습니다.
    * 프로그래머: 새로운 /lib .jar 파일.
컴파일하기ERDDAP™, classpath -cp 매개 변수에 새 .jar 파일을 참고하십시오.ERDDAP™ [프로그래머의 가이드](/docs/contributing/programmer-guide)·
    * 바다 \\_water\\_practical\\_salinity
CF 표준 이름 sea\\_water\\_salinity를 어떤 변수에 사용한다면, sea\\_water\\_practical\\_salinity로 전환하는 것이 좋습니다.[버전 29 CF 표준 이름 테이블](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (그리고 일부 이전 버전 -- 나는 그것을 모른다) · 이 이름은 실제로 실제적인 Salinity 값을 사용하여 나타냅니다.Practical Salinity Units  (PSU) , 이전 g/kg 값과 반대로. canonical 단위는 다릅니다, 그러나 아직도 믿을 수 없을 정도로 의심스러운: 1개 (자주 묻는 질문PSU·PSS-78) 1e-3와 반대로 (presumably implying g/kg의) sea\\_water\\_salinity의 경우.\\[안녕하세요,Unidata그리고 CF: 우리는 예를 들어 Fahrenheit 또는 Celsius, 스케일 또는 일부 변형의 이름 인 단위 문자열을 통해 다른 스케일을 사용하는 값을 식별합니다. 왜 우리는 그들의 가늠자, 예를 들면, PSS-78를 통해 salinity 단위를 확인할 수 없습니까? 나는 알고있다 : PSS-78 값은 "unitless"이지만 임계 값이 없습니까? PSS-78 값이 0.875배인 새로운 실용적인 연금 규모를 발명한 경우, canonical 단위가 여전히 "1"이어야합니까? 사용자는 어떻게 그(것)들을 어떻게 알 수 있었습니까? 1e-3 및 1 단위는 숫자가 나타내는 것을 알아내는 것을 시도하고 있는 사용자에 descriptive 또는 도움이 되지 않습니다.\\]

## 버전 1.62{#version-162} 
 (2015-06-08 출시) 

*    **새로운 기능 (사용자 정의) ::** 
    * 제품 정보EDDGriddatasets는, 사용자는 지금 도표 유형을 만들 수 있습니다: 숫자 axes의 어떤 조합을 가진 지상 도표, 다만 경도 versus 위도. 이 수 있도록 x versus y (프로젝트) 그래프와 다양한[Hovmöller 다이어그램](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), 예를 들면, 플롯 경도 versus 깊이, 또는 시간 versus 깊이.\\[주: 깊이가 Y 축선에 있는 경우에, 아마 당신이 원하는 무슨에서 튀겨질 것입니다. 죄송합니다. 아직 옵션이 없습니다.\\]Cara Wilson과 Lynn DeWitt에 감사합니다.
    * 새로운 것[Oceanic/Atmospheric 약어 변환기](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)일반적인 바다 / 대기의 약어를 전체 이름에서 변환 할 수 있습니다.
    * 새로운 것[Oceanic / 대기 변수 이름 변환기](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)일반적인 oceanic/atmospheric variable name을 전체 이름에서 변환할 수 있습니다.
*    **기타ERDDAP™관리자는 알아야 할:** 
    *   Java8 월
        Oracle더 이상 지원 (보안 버그 수정)  Java7. 명세ERDDAP™아직도 지원Java7,하지만 이동Java8. 다음 릴리스ERDDAP™아마 요구Java8. 명세
    *   valid\\_min/max/범위
이전과 지금, 만약dataVariable뚱 베어scale\\_factor이름 *add\\_offset메타데이터,ERDDAP™데이터 값을 풀고 메타데이터를 제거합니다. 이전,ERDDAP™수정/unpack 하지 않았다valid\\_range·valid\\_min·valid\\_max메타데이터 (일반적으로/should는 포장한 가치를 포함합니다) 이름 *scale\\_factor이름 *add\\_offset· 지금 그것은. 자주 묻는 질문ERDDAP™"valid\\_"에 대한 모든 변수를 확인합니다.valid\\_range·valid\\_min, 또는valid\\_maxdatasets가 새로운 버전에 나타날 때 정확한 값이 있습니다.ERDDAP· 이름 *[valid\\_range/min/max 문서](/docs/server-admin/datasets#valid_range)·
    * 크기: ACDD-1.3
이전,ERDDAP™  (믿을 수 있는 GenerateDatasets 사이트맵) 중고/추천 (1.0 분) 버전의[NetCDFDataset Discovery에 대한 Attribute 협약](https://wiki.esipfed.org/ArchivalCopyOfVersion1)"라고 함UnidataDataset Discovery v1.0" 글로벌 컨벤션 및Metadata\\_Conventions이름 * 지금, 우리는 추천합니다[ACDD 버전 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)2015년 초에 쥐가고 "ACDD-1.3"로 불립니다. 다행히, ACDD-1.3는 버전 1.0과 매우 뒤로 호환됩니다. 우리는 당신을 보상[ACDD-1.3로 전환](/docs/server-admin/datasets#switch-to-acdd-13)· 그것은 어렵지 않습니다.
    * Generate데이터셋 Xml 특성
많은 변화가 있었습니다.&lt;addAttributes&gt; GenerateDatasets에 의해 건의된 값 글로벌 컨벤션을위한 Xml,creator\\_name/email/url, 키워드, 요약 및 제목 속성 및 변수long\\_name이름 * 몇몇 변화는 ACDD-1.3의 새로운 사용과 관련있습니다.
    * EDDTable에서SOS데이터셋
새로운 유형의 경우 추가SOS서버 및 이전 서버로 변경, 그것은 더 열심히 얻을ERDDAP™서버의 응답에서 서버 유형을 자동으로 감지합니다. 사용 [&lt;엠에디터 플러그 인 참조:SosServerType&gt; (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (IOOS\\_NDBC, IOOS\\_NOS의 값으로,OOSTethys또는 WHOI) 지금 STRONGLY RECOMMENDED입니다. 이 유형의 데이터 세트가 새로운 버전의 문제가있는 경우ERDDAP, 다시 실행 GenerateDatasets 시도 Xml 용SOS서버는 새로운 펑크를 생성datasets.xml그 dataset를 위해. Generate데이터셋 Xml는 다른 시도 할 수 있습니다.&lt;sosServerType&gt; 옵션은 주어진 서버에서 올바른 것을 찾을 수 있습니다. 문제가 있다면,보고있는 문제를 알려주세요. 서버의 URL과 나는 도움이 될 것입니다.
    * EDDTableFromFileNames 데이터 세트
권장되는 몇몇 속성addAttributes지금 sourceAttributes입니다. 당신은 아마 당신의 기존의 데이터 세트에 아무것도 변경할 필요가 없습니다datasets.xml·
    * EDDTableFromNcCFFiles datasets와 관련된 버그 수정.
나는 또한 기존의 대형 단위 테스트에 많은 단위 테스트를 추가했습니다. (100개의 시나리오가 있습니다.) · Eli Hunter에 감사.
    * 버그 수정/작은 변경EDDGrid계정 만들기
Jonathan Lafite와 Philippe Makowski 덕분에
    * 버그 수정:EDDGridFromErddap은 이제 원격 데이터셋이 없는 경우에도 작동합니다.ioos\\_category변수 속성.
Kevin O'Brien에게 감사.
    * 버그 수정 .graph 웹 페이지EDDGrid1개 이상의 값으로 하나의 축 변수만 있을 때 datasets.
Charles Carleton 덕분에.
    * 다른 작은 개선, 변경 및 버그 수정이있었습니다.

## 버전 1.60{#version-160} 
 (2015-03-12 출시) 

*    **새로운 기능 (사용자 정의) ::** 이름 *
*    **기타ERDDAP™관리자는 알아야 할:** 
    * STRONGLY RECOMMENDED: 서버 업데이트[로봇.txt](/docs/server-admin/additional-information#robotstxt)다음을 포함하는 파일:
단점 : /erddap/파일/
    * 문제 및 해결:
Linux 컴퓨터에서 사용중인 경우&lt;update모든NMillis&gt; type=를 가진 datasets로EDDGrid파일에서, EDDTableFromFiles,EDDGrid복사, EDDTableCopy, 또는 그 subclasses, 당신은 데이터셋이 로드에 실패하는 문제를 볼 수 있습니다 (때때로 또는 일관되게) 오류 메시지 : "IOException : 인스턴스의 사용자 제한이 도달하거나 너무 많은 열린 파일" 이렇게하면 호출하여이 문제를 해결할 수 있습니다. (으로 root) ::
이초 fs.inotify.max\\_user\\_watches=65536|티 -a /etc/sysctl.conf
이초 fs.inotify.max\\_user\\_instances=1024|티 -a /etc/sysctl.conf
파일 형식
또는 문제가 발생하면 더 높은 숫자를 사용합니다. 시계의 기본은 8192입니다. 인스턴스의 기본값은 128입니다.\\[업데이트 : 버그가 있습니다.Javainotify 인스턴스가 수집되지 않습니다. 이 문제는 피ERDDAP™v1.66 이상. 그래서 더 나은 솔루션은 최신 버전으로 전환하는 것입니다ERDDAP·\\]
    * NoSuchFile 지시어 버그 수정:
type=의 datasets를 일으킬 수 있는 버그가 있었습니다.EDDGrid파일에서, EDDTableFromFiles,EDDGrid복사, EDDTableCopy, 또는 오류 "NoSuchFileException : _someFileName_"로 때때로로드하지 않는 클래스. 버그는 FileVisitor의 사용과 관련이 있으며 도입되었습니다.ERDDAP™v1.56 니다. 문제는 드물고 데이터 파일을 변경하는 많은 수의 데이터 세트에 영향을 미칠 가능성이 높습니다.
    * 약간의 개선, 변경 및 버그 수정이있었습니다.

## 버전 1.58{#version-158} 
 (출시 2015-02-25) 

*    **새로운 기능 (사용자 정의) ::** 
    * 새로운["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)시스템은 가상 파일 시스템을 검색하고 많은 소스 데이터 파일을 다운로드ERDDAP™데이터셋. 더 보기"files"시스템은 기본적으로 활성화되지만ERDDAP™관리자는 그것을 넣을 수 있습니다
```
        <filesActive>false</filesActive>  
```
내 계정ERDDAP™setup.xml 파일. Philippe Makowski에게 특별한 감사, 나는이 아이디어의 아름다움을 평가하기 위해 느려했을 때 주장.
    * 시간표 최대 -- 이전, 실시간 데이터와 EDDTable datasets의 시간 변수는 dataset의 최대 시간 값이 최근되었지만 정확하게 알려진 변경되지 않은 NaN의 destinationMax가 있었습니다. 이제 destinationMax는 현재 알려진 마지막 시간을 나타내는 실제 값이 있습니다. 많은 datasets에는 지속적으로 갱신한 자료가 있습니다.ERDDAP™최신 데이터에 액세스 할 수 있습니다. 새 소식 [&lt;update모든NMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis의 경우) 지원하다EDDGrid파일 및 EDDTable fromFiles datasets 업데이트 시간 변수의 destinationMax. 이 변화의 또 다른 결과는datasetID= = =allDatasetsdataset는 이제 maxTime 컬럼의 현재 알려진 마지막 시간을 포함합니다. John Kerfoot 덕분에.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * STRONGLY RECOMMENDED: 서버 업데이트[로봇.txt](/docs/server-admin/additional-information#robotstxt)다음을 포함하는 파일:
단점 : /파일/
단점 : /erddap/파일/
    * 제품 설명datasets.xml-- 작년에, 우리는 coastwatch에 있는 몇몇 우수한 datasets를 추천합니다ERDDAP™당신에 추가할 수 있었습니다ERDDAP™몇 줄을 추가하여datasets.xml· erdVH 데이터셋을 추가하면 더 새로운 erdVH2 데이터셋으로 전환하십시오.
        * 모든 erdVH datasets의 사본을 만들고 복사를 바꾸십시오datasetID's from erdVH... to erdVH2... 과 참조sourceUrlerdVH...에서 erdVH2....
        * erdVH... datasets를 active="false"로 설정합니다.
    * 모든 것EDDGrid파일 및 EDDTable FromFiles subclasses 지금 지원 [&lt;액세스ViaFiles&gt; (/docs/server-admin/datasets#accessibleviafiles/서버) 소스 데이터 파일을 만들려면"files"시스템. 기본적으로, 이 시스템은 각 dataset을 위해 꺼집니다. 태그를 추가해야 합니다. Philippe Makowski 덕분에.
    * 모든 것EDDGrid파일 및 EDDTable FromFiles subclasses 지금 지원 [&lt;update모든NMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis의 경우) · 기본적으로, 이 시스템은 각 dataset을 위해 꺼집니다. 태그를 추가해야 합니다. Dominic Fuller-Rowell 및 NGDC 덕분에.
    * 새로운[EDDTable파일이름](/docs/server-admin/datasets#eddtablefromfilenames)서버의 파일 시스템의 파일 그룹에 대한 정보에서 데이터셋을 생성하지만 파일 내에서 데이터를 제공하지 않습니다. 예를 들어, 이미지 파일, 오디오 파일, 비디오 파일, 단어 처리 파일 및 스프레드 시트 파일의 수집을 배포하는 데 유용합니다. 새로운 기능["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)시스템, 그래서 사용자가 파일을 다운로드 할 수 있습니다. Philippe Makowski에게 특별한 감사, 나는이 아이디어의 아름다움을 평가하기 위해 느려했을 때 주장.
    * 새로운[EDDGridInEDDTable에서](/docs/server-admin/datasets#eddgridfromeddtable)지정된 dataset을 gridded dataset로 변환합니다. Ocean Networks 캐나다 덕분에.
    * 새로운[EDDGrid파일 형식](/docs/server-admin/datasets#eddgridfrommergeirfiles)지역 MergeIR 그룹에서 데이터 수집.gz파일.EDDGridFromMergeIRFiles는 코드의 첫 번째 펑크가 기여한 구별을 가지고 있습니다.ERDDAP· 그것은 우리의 도움 없이 완전히 했습니다. R.Tech Engineering의 Jonathan Lafite와 Philippe Makowski에게 3개의 응원과 특별한 감사.
    * 새로운 옵션 setup.xml 태그가 있습니다.&lt;unitTestDataDir&gt;, 새로운 GitHub 저장소를 통해 사용할 수있는 단위 테스트 데이터 파일로 디렉토리를 지정합니다.[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest)· 예를 들면:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
이것은 아직 유용하지 않지만 다른 사람들이 가능한 한 많은 단위 테스트가 실행되도록 이동의 일부입니다. Terry Rankine 덕분에.
    * 많은 작은 개선, 변경 및 버그 수정이있었습니다.

## 버전 1.56{#version-156} 
 (2014-12-16 출시) 

*    **새로운 기능 (사용자 정의) ::**   (이름 *) 
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 당신은 이미 알고[EDDGrid언어: en](/docs/server-admin/datasets#eddfromerddap)이름 *[EDDTableErddap에서](/docs/server-admin/datasets#eddfromerddap)datasets에 연결할 수 있습니다.ERDDAPs 그리고 그들에 나타날ERDDAP· 이 데이터셋의 실제 데이터 요청은 소스에 즉시 접근할 수 있습니다.ERDDAP™, 그래서 데이터는 시스템을 통해 흐르지 않거나 대역폭을 사용합니다. 이제 샘플에서 권장된 데이터 세트의 큰 목록이 있습니다.datasets.xml에 erddapContent.zip· 그에 대해ERDDAP™, 당신이해야 할 전부는 사본이고 당신에 원하는 것을 풀습니다datasets.xml· Conor Delaney 덕분에.
    * 컴파일하기ERDDAP™, 당신은 약간 새로운 추가해야 합니다. jar 파일로[classpath -cp 스위치](/docs/contributing/programmer-guide#development-environment)javac 및 java를 위해.
    * 새로운[EDDTableCassandra에서](/docs/server-admin/datasets#eddtablefromcassandra)데이터 처리[Cassandra, 그리스](https://cassandra.apache.org/)· Ocean Networks 캐나다 덕분에.
    * 새로운[EDDTableColumnarAsciiFiles에서](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)고정폭 열을 가진 ASCII 데이터 파일에서 데이터를 처리합니다. Philippe Makowski 덕분에.
    * 모든 것EDDGrid파일 및 EDDTable FromFiles 하위 클래스는 이제 새로운 방법을 사용, FileVisitor (이름 *Java에서 1.7) 파일에 대한 정보를 수집합니다. 이것은 주어진 데이터 세트에 대한 파일 정보의 첫 번째 모임에 대한 이점이 없지만 곧 완료되면 후속 모임을위한 거대한 이점이 있음을 알 수 있지만, OS는 여전히 정보 캐시가 있습니다. NGDC에 감사.
        
우리는 아직도 추천합니다: dataset이 많은 파일이 있는 경우 (예, &gt;1,000) , 운영 체계 (그리고 이렇게EDDGrid파일 및 EDDTableFromFiles에서) 당신은 일련의 하위디렉토리에 파일을 저장하면 훨씬 더 효율적으로 작동합니다. (1 년 당, 또는 아주 빈번한 파일을 가진 datasets를 위한 달 당 하나) , 그래서 주어진 디렉토리에 파일의 거대한 수 없습니다.
        
    * EDDTableFromAsciiFiles에 몇몇 작은 개선.
    * EDDTableFromAsciiServiceNOS에 대한 몇 가지 개선은 소스의 정보의 몇 가지 추가 열을 얻을 수 없습니다. Lynn DeWitt에 감사합니다.
    * ISO 19115와 관련된 작은 버그 수정ERDDAP™생성. Anna Milan에 감사합니다.

## 버전 1.54{#version-154} 
 (2014-10-24 출시) 

*    **새로운 기능 (사용자 정의) ::** 
    * 일부 변수는 이제 밀리 초 정밀도, 예를 들어, 2014-10-24T16:41:22.485Z에서 시간과 함께 작동합니다. Dominic Fuller-Rowell에 감사.
*    **작은 변화/Bug 고침:** 
    * 버그 수정 : 특정 상황에서의 조합,EDDGridFromNcFile datasets는 감소된 정밀도에 자료를 반환했습니다 (e.g., 더블 대신 floats) · 이것은 데이터 값에 영향을 줄 수 있습니다 &gt; 8 중요한 숫자. 내 사과. (그리고 그것은 고전적인 컴퓨터 프로그래밍 버그였다: 한 잘못된 문자.) Dominic Fuller-Rowell에 감사.
    * 많은 작은 변화.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * Griddap datasets now support timestamp Axis variables and data variables (i.e., 시간 값과 변수, 하지만destinationName다른 것 보다는"time") · Dominic Fuller-Rowell에 감사.
    *   ERDDAP™지금 올바르게 지원 millisecondstime\\_precision"1970-01-01T00:00:00.000Z". 1개의 의도적인 quirk: 인간 중심 파일에 시간을 쓸 때 (예, .csv,.tsv·.json·.xhtml) ·ERDDAP™지정된 용도time\\_precision초 및 / 또는 소수 초가 포함 된 경우; 그렇지 않으면 초를 사용합니다.time\\_precision"1970-01-01T00:00:00Z" (일관성과 backwards 호환성) · Dominic Fuller-Rowell에 감사.
    *   EDDGridFromNcFiles는 이제 String String을 지원합니다.dataVariable₢ 킹
    *   .ncgriddap에 의해 작성된 파일에는 이제 String이 있습니다.dataVariable₢ 킹
    * Generate데이터셋 Xml는 이제 더 플러시를 포함합니다 () 파일에 기록되지 않는 정보의 문제를 방지하기 위해 호출. Thierry Valero 덕분에.
    * GenerateDatasetsXml에 대한 문서는 개선되었습니다. -i 스위치는 명령 줄에 모든 답변을 지정하면 작동합니다. (e.g., 스크립트 모드) · 그리고 스크립트 모드가 설명됩니다. Thierry Valero 덕분에.
    *   ERDDAP™더 이상 dataset에서 두 변수를 허용하지 않고 동일하게sourceName· (누군가가 전에 그것을 한 경우, 그것은 아마 오류 메시지로지도했다.) 시작하기ERDDAP™dataset에서 두 변수를 허용하지 않습니다.destinationName·

## 버전 1.52{#version-152} 
 (2014-10-03 출시) 

*    **새로운 특징:**   (이름 *) 
*    **작은 변화/Bug 고침:** 
    * 이름 * (더 보기) 자주 묻는 질문ERDDAP™빠른.
    * ISO 19115 파일에 대한 개선ERDDAP: 새로 추가된&lt;gmd:protocol&gt; 가치 (정보, 검색,OPeNDAP::OPeNDAP·ERDDAP: 그리드, 및ERDDAP::tabledap) 내 계정&lt;gmd:CI\\_OnlineResource&gt;. Derrick Snowden 및 John Maurer 덕분에.
    * 많은 작은 변화.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 버그 수정 : GenerateDatasetsXml.sh 및 DasDds.sh는 1.48 및 1.50에 대한 erddap.war에서하지 않았습니다. 지금 그들은. Thierry Valero 덕분에.
    * TestAll의 일부 속도 테스트에 대한 작은 변화는 기회를 덜 수용 할 수 있습니다. Terry Rankine 덕분에.

## 버전 1.50{#version-150} 
 (출시일 2014-09-06) 

*    **새로운 특징:**   (이름 *) 
*    **작은 변화/Bug 고침:** 
    * 이름 *ERDDAP™최근 버전보다 훨씬 빠릅니다.
*    **기타ERDDAP™관리자는 알아야 할:**   (이름 *) 

## 버전 1.48{#version-148} 
 (출시일 2014-09-04) 

*    **새로운 특징:** 
    *   ERDDAP™이제 항상 tabular dataset을 만듭니다.datasetID= = =allDatasets이 모든 데이터셋에 대한 정보의 표가 있는 ,ERDDAP· 다른 모든 tabular dataset처럼 queried 수 있습니다. 이것은 datasets programmatically에 대한 정보를 얻기 위한 현재 체계에 유용한 대안입니다.
    * EDDTable을 위한 2개의 새로운 산출 파일 유형이 있습니다EDDGrid, .csv0 및.tsv· 열명이나 단위로 줄이 없는 탭-separated-value 파일입니다. 데이터는 첫 번째 라인에서 시작합니다. 그들은 특히 스크립트에 유용합니다. 단지 하나의 정보를 원한다.ERDDAP·
*    **작은 변화/Bug 고침:** 
    * 지도는 현재 범위에서 경도로 만들 수 있습니다 -720에서 720.
    * 새로운.ncml 응답 파일 형식은 모두 사용할 수 있습니다EDDGrid데이터셋. 그것은 반환[사이트맵](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-dataset의 정보 (.dds + .das와 유사한) ·
    * 버그 수정: 저장 탭 데이터에.nc파일은 변수당 100,000 값으로 제한되었습니다. 지금 그것은 단지 2 GB 총 파일 크기로 제한됩니다. Kevin O'Brien에게 감사.
    * 버그 수정 : saveAsMatlab지금 방법datasetIDs는 안전한 것으로 변환됩니다.Matlab변수 이름. 그러나 난 아직도 당신이 창조하는 것이 좋습니다datasetID유효한 변수 이름인 s: 문자로 시작한 후 A-Z, a-z, 0-9, \\_를 사용하세요. 이름 *[datasetID](/docs/server-admin/datasets#datasetid)· Luke Campbell에게 감사.
    * EDDTableFromDatabase에서 버그 수정: 일부 유형의 데이터베이스, a NO\\_ 데이터베이스의 DATA 응답은 pointless 30 초 지연으로 이끌었습니다.ERDDAP· Greg Williams 덕분에.
    * 버그 수정:EDDGrid그래프 유형 = 라인으로 그래프 만들기 (또는 마커 또는 마커 및 라인) 강제 x 축 변수는 시간입니다. 지금 그것은 어떤 축선일 수 있습니다. Lynn DeWitt에 감사합니다.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * STRONGLY RECOMMENDED: 업데이트Java  
이 버전의ERDDAP™견적 요청Java7 이상, 그러나Java7은 4 월 2015의 끝없는 삶에 도달합니다. (자세히보기) , 그래서 지금 전환하는 좋은 시간입니다Java8. 그래서Java8은 STRONGLY RECOMMENDED입니다. 나는 테스트Java8. 참고Java6은 2013년 2월 말의 삶에 도달했습니다. (보안 버그 수정 없음&#33;) ·
    * STRONGLY RECOMMENDED: 톰캣 업데이트
Tomcat을 사용하는 경우 Tomcat의 최신 버전으로 전환하십시오. Tomcat 8은 작업하도록 설계되었습니다.Java8. 명세
    * ·ERDDAP"더 이상 약어가 없습니다. 이제 그것은 단지 이름입니다. 나는 강조 표시 할 이름을 원하지 않는다ERD· 나는 원ERDDAP™기관과 귀하의 데이터를 강조합니다.
    * 계정 만들기[당신의 외관을 사용자 정의ERDDAP™당신의 기관과 당신의 자료를 강조하는 임명](/docs/server-admin/deploy-install#customize)· 한 시간의 작업으로 영원히 지속되는 좋은 개선을 만들 수 있습니다.
    * setup.xml에서,&lt;displayDiagnosticInfo&gt; 옵션은 항상 무시하고 값이 false 인 경우 처리됩니다.
RECOMMENDED: 제거&lt;displayDiagnosticInfo&gt; 태그 및 설정에서 관련 정보.xml.
    * setup.xml에서 기본값은&lt;drawLandMask&gt;은 "over", 그러나 이제는 "under"입니다. (모든 datasets에 잘 작동) ·
    * GenerateDatasetsXml.sh 및 DadDds.sh Linux 스크립트는 이제 csh 대신 bash를 사용하고 확장 .sh가 있습니다. Emilio Mayorga에게 감사
    * Generate데이터셋 Xml와 DasDds는 이제 자신의 로그 파일을 만듭니다 (생성DatasetsXml.log 및 DasDds.log) 출력 파일 (GenerateDatasetsXml.out 및 아빠Dds.out) in _bigParentDirectory_/logs/, 클립보드에 결과를 넣지 못했습니다.
    * Generate데이터셋 Xml는 지정된 장소에 지정된 파일에 출력을 삽입하는 -i 명령 줄 매개 변수를 지원합니다. 이름 *[관련 기사](/docs/server-admin/datasets#generatedatasetsxml)· Terry Rankine 덕분에.
    * EDDTableFromDatabase 지금 지원&lt;열NameQuotes&gt;&lt;/columnNameQuotes&gt;, 유효 값 " (기본값) , ', 또는 아무것도. 이 문자 (이름 *) SQL 쿼리에 있는 열 이름의 앞에 사용될 것입니다. 다른 유형의 데이터베이스, 다른 방법으로 설정, 다른 열 이름 인용 표시가 필요 합니다.
    * Tabular latitude와 경도 변수는 이제 사용자 정의 할 수 있습니다long\\_name's, e.g., 프로필 위도. 너무 이른, 그들은 위도와 경도만 있을 수 있었습니다.
    * 이제부터 dataset의 글로벌 메타데이터(i.e.,)의 속성으로 "defaultDataQuery"와 "defaultGraphQuery"를 지정합니다.&lt;addAtts&gt;), 별도의&lt;defaultDataQuery&gt; 과&lt;defaultGraphQuery&gt; 태그. (아직 태그를 통해 지정할 경우,ERDDAP™자동적으로 정보로 글로벌 속성을 만듭니다.) 

## 버전 1.46{#version-146} 
 (2013-07-09 출시) 

*    **새로운 특징:** 
    *    (이름 *) 
*    **작은 변화/Bug 고침:** 
    * 버그 수정: 에 EDDTableFromDatabase, 버전 1.44 만,ERDDAP™improperly는 SQL 문에 있는 데이타베이스의 테이블 이름을 인용했습니다. 그것은 지금 조정입니다. Kevin O'Brien에게 감사.
*    **기타ERDDAP™관리자는 알아야 할:** 
    *    ** message.xml의 표준 메시지를 수정하지 않으면,
이름 *\\[뚱 베어\\]/content/erddap/messages.xml . **   
default message.xml 파일은 이제 erddap에 있습니다. 전쟁 파일, 아니 erddapContent.zip· 그래서, 당신은 수동으로 message.xml을 업데이트 할 필요가 없습니다.
    * message.xml의 메시지를 수정하려면, 이제부터, 각 시간마다 업데이트ERDDAP™, 중:
        * 새 앞에 만든 같은 변경 사항 만들기
            \\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
그리고이 한 번: 삭제\\[뚱 베어\\]/content/erddap/messages.xml .
        * 또는 새로운 message.xml에서 변경된 것을 알아라. (diff를 통해) , 수정
            \\[뚱 베어\\]/content/erddap/messages.xml 파일에 따라.

## 버전 1.44{#version-144} 
 (출시 2013-05-30) 

*    **새로운 특징:** 
    * EDDTable datasets에 쿼리 지금 지원 &orderBy주요 특징 (·) 그리고 &orderByMinMax (·)   (각 그룹에서 두 개의 행을 반환하고, 마지막의 최소 및 최대orderBy제품정보) · Lynn DeWitt에 감사합니다.
    * 두 가지 새로운tabledap파일 형식 :.ncCFHeader와.ncCFMAHeader의 특징 (대응의 ncdump-like 헤더를 반환합니다..ncCF와.ncCFMA 파일 유형) · Steve Hankin에게 감사.
*    **작은 변화/Bug 고침:** 
    * 버그 수정 : .graph 및 .html 웹 페이지를로드하여 많은 시간 값이 느리기 때문에ERDDAP™시간 슬라이더 옵션을 생성 할 때 느렸다. 지금 그것은 항상 빠릅니다. Michael Barry, OOICI 및 Kristian Sebastian Blalid 덕분에.
    * 버그 수정: 몇몇 EDDTable dataset 유형에서는, 시간 constraints는 항상 제대로 취급되지 않았습니다. 지금 그들은. John Maurer와 Kevin O'Brien에게 감사.
    * 버그 수정: datasets는 전부 때 적재하지 않을 것입니다subsetVariables고정 값 변수였다. 지금 그들은. Lynn DeWitt와 John Peterson에게 감사.
    * IMPROVED: 이제는, &distinct 처럼 다만 subset 변하기 쉬운 행위를 위한 모든 쿼리 () 쿼리의 일부입니다.
    * IMPROVED: 이제 다음을 포함하는 쿼리.jsonp=_functionName_, _기능 Name_ MUST는 이제 1 이상의 시리즈입니다. (영업시간) 이름. 각 단어는 ISO 8859 편지 또는 "\\_"로 시작해야하며 0 개 이상의 ISO 8859 문자, 숫자 또는 "\\_"로 이어야합니다. 예, 이것은보다 더 제한적입니다.JavaScript의 함수 이름에 대한 요구 사항.
    * 그래프의 시간 축은 더 긴 시간 범위를 잘 작동 (80 - 10000 년) 그리고 더 짧은 시간 범위 (0.003 - 180 초) ·
    *   ERDDAP™ISO-8601-format time data의 변형을 파싱 할 때 더 많은 포용입니다.
    * 다른 작은 변화와 버그 수정이 있었다.
*    **기타ERDDAP™관리자는 알아야 할:** 
    *    **최신 버전으로 업데이트됩니다.**   
        ERDDAP™보안 감사. 몇몇 버그와 약점이 있었습니다. 버전 1.44에는 몇몇 중요한 보안 버그 수정 및 보안 및 접근성을 증가하는 몇 가지 변화가 포함되어 있습니다. (e.g., 비전 임계 사용자) · 버전 1.44는 후속 보안 감사를 통과했습니다. USGS와 Acunetix에서 모든 좋은 사람들에게 감사하십시오. (뚱 베어NOAA이 작업을 수행?) 
    * 새로운[EDDTable에서WFS파일 형식](/docs/server-admin/datasets#eddtablefromwfsfiles)모든 데이터의 로컬 복사본을 만듭니다.ArcGISMapServer로 이동WFS서버와 그래서 자료는 그 후에 빨리 보존될 수 있습니다ERDDAP™사용자. Christy Caudill 덕분에.
    * 새로운[EDDTable에서EDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)EDDTable dataset을 만들 수 있습니다.EDDGrid데이터셋. 이 일을 위한 몇몇 일반적인 이유는:
        * 이 데이터셋이 queried 할 수 있습니다.OPeNDAP선택 제약 (사용자가 요청한 경우) ·
        * dataset는 inherently의 tabular dataset입니다. OOICI, 짐 Potemra, 로이 Mendelssohn에 감사.
    * 변수 이름 "depth"는 이제 "altitude"에 특별한 대안입니다. 단위는 "미터"의 일부 변형이어야한다. 데이터 값은 positive=down이어야 합니다.ERDDAP™"깊은"의 의미를 완전히 알고 있으며, 고도가 지원되는 것을 지원합니다. (e.g. CF DSG cdm\\_data\\_type=profile dataset의 구성으로) · dataset는 "depth"과 "altitude"변수를 모두 가지고 있어야 합니다.
    * 내 계정datasets.xml, 어떤 용도를 제거하십시오&lt;att name="cdm\\_altitude\\_proxy"&gt;더&lt;/att&gt; 깊이가 이제 고도에 특별한 대안이므로 특별히 식별 할 필요가 없습니다.
    * 내 계정datasets.xml, 어떤 용도를 제거하십시오&lt;altitudeMetersPerSourceUnit&gt;, EDDTable을 제외하고 이름 *SOS·
값이 1일 때 삭제합니다.
값이 -1일 때, 가변 이름을 깊이로 바꾸는 것을 고려하십시오.
다른 값에 대한 추가&lt;addAttributes&gt;, 예를 들면,:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * 모든 datasets 지금 지원
        
        *   &lt;defaultDataQuery&gt; .html이 쿼리 없이 요청되는 경우
            * 당신은 아마 거의 이것을 사용해야합니다.
            * griddap datasets를 위해, 이것의 일반적인 사용은 다른 과도한 차원 가치를 지정하는 것입니다 (₢ 킹\\[0 댓글\\]대신에\\[이름 *\\]) ·
어떤 경우, 항상 모든 변수를 나열해야, 항상 모든 변수에 동일한 차원 값을 사용, 거의 항상 사용\\[0 댓글\\]·\\[이름 *\\], 또는\\[0:마지막\\]차원 값을 위해.
예를 들면:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * 제품 정보tabledapdatasets, this의 가장 일반적인 사용은 다른 기본 시간 범위를 지정하는 것입니다 (현재, 예를 들면, &time&gt;=now-1일) ·
데이터 변수를 요청하는 것은 모든 데이터 변수를 지정하는 것과 동일하므로 일반적으로 새로운 시간 제약을 지정할 수 있습니다.
예를 들면:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt; .graph가 쿼리 없이 요청되는 경우
            * 당신은 아마 거의 이것을 사용해야합니다.
            * griddap datasets를 위해, 이것의 일반적인 사용은 다른 과도한 차원 가치를 지정하는 것입니다 (₢ 킹\\[0 댓글\\]대신에\\[이름 *\\]) 그리고/또는 특정 변수가 그래프로 지정합니다.
어떤 경우에, 당신은 거의 항상 사용합니다\\[0 댓글\\]·\\[이름 *\\], 또는\\[0:마지막\\]차원 값을 위해.
예를 들면:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * 제품 정보tabledapdatasets, this의 가장 일반적인 용도는 graphed 다른 변수를 지정하는 것입니다, 다른 기본 시간 범위 (현재, 예를 들면, &time&gt;=now-1일) 및/또는 다른 기본 그래픽 설정 (e.g., 마커 유형) ·
예를 들면:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

XML-encode 또는 % 인코딩이 필요한 것을 기억하십시오. (하나, 하지만 둘 다) XML 문서에 있기 때문에 기본 쿼리. 예를 들어, &는 &amp;amp; ,&lt;&amp;lt; , 그리고 &gt;가 &amp; gt; .
자주 묻는 질문 실수를하고 원하는 것을 얻을 수있는 것은 쉽습니다.
Charles Carleton, Kevin O'Brien, Luke Campbell 및 기타.
    *   EDDGridInDap에서EDDGrid보낸 사람Erddap 및 EDDTableFromEDDGrid데이터셋을 처리하는 새로운 시스템 (약 0.5 s) · 이름 *ERDDAP각 dataset를 완전하게 재부팅하기위한 정기적 인 시스템,이 옵션 추가 시스템은 민감합니다 (사용자 요청에 의해 트리거) 관련 기사 (업데이트 될 필요가있는 정보를 업데이트) · 예를 들어, 요청에 따라EDDGridfromDap dataset은 마지막 업데이트 이후 밀리 초의 지정된 수보다 더 발생합니다.ERDDAP™leftmost의 새로운 값이 있는 경우 ((주)"time") 차원과, 그래서, 다만 사용자의 요구를 취급하기 전에 그 새로운 가치를 다운로드하십시오. 이 시스템은 데이터 소스의 최소 요구와 함께 빠르게 변화하는 dataset up-to-date를 유지하면서 매우 좋습니다. 그러나 약간의 사용자 요청 처리를 느리게하는 비용. 보기 [&lt;update모든NMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis의 경우)   
Michael Barry와 OOICI 덕분에.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles, 그리고 EDDTableFromNcCFFiles 지금 지원[사이트맵.nc단백질](/docs/server-admin/datasets#ncml-files)소스 파일 in place.nc파일. Jose B Rodriguez Rueda 덕분에.
    * 제품 정보EDDGridAggregateExisting차원,ERDDAP™serverType 속성에 대한 새로운 serverType="dodsindex" 옵션을 지원&lt;sourceUrls&gt; 태그. 이 웹 페이지와 함께 작동합니다.&lt;이전&gt;&lt;/pre&gt; 그리고 종종 아래OPeNDAP로고. 예제는[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)·
    * EDDTable에서SOS이제 옵션 태그를 지원
```  
        <sosServerType>_serverType_</sosServerType>  
```
그래서 당신은의 유형을 지정할 수 있습니다SOS계정 관리 (·ERDDAP™그것을 알아낼 필요가 없습니다) · 유효 값&lt;_serverType_\\&gt; IOOS\\_NDBC, IOOS\\_NOS,OOSTethys· WHOI (새로 지원된 서버 제품정보) · 이름 *[EDDTable에서SOS](/docs/server-admin/datasets#eddtablefromsos)· Derrick Snowden 및 Janet Fredericks 덕분에.
    * 모든 것EDDGrid...파일에서, EDDTableFrom...파일,EDDGrid복사 및 EDDTable 지금 복사는 옵션 태그를 지원
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
할 수 있는ERDDAP™파일 유지 제품정보 (각 소스 데이터 파일에 대한 정보) 디스크에서 메모리 대신 (기본값) · fileTable in memory speeds up 요청에 대한 데이터 유지 (특히 &gt;1000 소스 데이터 파일이 있는 경우) , 그러나 더 많은 기억을 사용합니다. 어떤 dataset에 대해 true로 설정하면 메모리에 눈을 유지하십시오. _yourDomain_/erddap/status.html의 장점ERDDAP™아직도 많은 무료 메모리가 있습니다. Fredrik Stray 덕분에.
    * EDDTableASCIIFiles 지금 지원&lt;charset&gt;. 두 개의 가장 일반적인 charsets (자주 묻는 질문) ISO-8859-1는 입니다 (기본값) 그리고 UTF-8.
    * 추천: setup.xml에서, 안에&lt;startHeadHtml&gt;, 변경&lt;사이트맵 로그인
        &lt;html lang="ko-US"&gt; (또는 다른[언어 코드](https://www.w3schools.com/tags/ref_language_codes.asp)메시지가 있는 경우.xml) ·
    * setup.xml에는 새로운 옵션 태그가 있습니다.ERDDAP::
        *   &lt;변환기Active&gt;false&lt;/컨버터액티비티&gt;&lt;&#33;-- 기본값은 true --&gt;
        *   &lt;슬라이드SorterActive&gt;false&lt;/slideSorterActive&gt;에 대하여&lt;&#33;-- 기본값은 true --&gt;
        *   &lt;wms액티비티&lt;/wmsActive&gt;&lt;&#33;-- 기본값은 true --&gt;일반적으로, 우리는 이러한 모든 것을 false로 설정하는 것이 좋습니다.
    * Generate데이터셋 Xml는 이제 결과를 작성합니다 _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, log.txt. Kristian Sebastian Blalid에 감사.
    * Generate데이터셋 Xml는 이제 좋은 제안을 만듭니다.&lt;관련 제품 모든 분&gt;. 감사합니다.NOAAUAF 프로젝트.
    * GenerateDatasetsXml에 대한 많은 작은 개선. 감사합니다.NOAAUAF 프로젝트.

## 버전 1.42{#version-142} 
 (출시 2012-11-26) 

*    **새로운 특징:** 
    *    (새로운 기능 없음.) 
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 당신은에서 격상시키는 경우에ERDDAP™1.38 또는 1.40은 구성 파일로 변경할 필요가 없습니다. (하지만 새 message.xml 파일을 사용해야 합니다.) ·
    *   ERDDAP™다시 한번 실행할 수 있습니다.Java1. 명세 (ERDDAP™v1.40 필요Java1.7.) 우리는 여전히 최신 버전을 사용하는 것이 좋습니다.Java1.7.
    * 새로운 dataset 유형,[EDDTable에서 AwsXml파일](/docs/server-admin/datasets#eddtablefromawsxmlfiles), 자동적인 기상역 세트에서 자료를 읽을 수 있습니다 (사이트맵) XML 데이터 파일. Lynn Dewitt 및 Exploratorium 덕분에.
*    **작은 변화/Bug 고침:** 
    * NDBC로 변경SOS소스 데이터 서버.
    * NOS COOPS ASCII 서비스 변경
    * 몇몇 작은 변화 및 버그 수정을 만들었습니다.

## 버전 1.40{#version-140} 
 (2012-10-25 출시) 

*    **새로운 특징:** 
    * 새로운 출력 파일 형식이 있습니다.tabledap데이터 세트:.ncCFMA, 요청된 데이터를 저장.ncCF에 적합[분리된 표본 추출 Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)다차원 배열 선택권, 그러므로 NODC 템플렛에 따릅니다\\[2021 : 지금[NCEI 템플릿](https://www.ncei.noaa.gov/netcdf-templates)\\]이 유형의 데이터를 저장합니다. NODC에 감사.
    *   tabledap요청은 이제 시간과 같은 제약을 포함 할 수 있습니다 &time&gt;now-5일. 이름 *[관련 기사](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)· James Gosling에 감사합니다.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 당신은에서 격상시키는 경우에ERDDAP™1.38은 구성 파일로 변경할 필요가 없습니다. (하지만 새 message.xml 파일을 사용해야 합니다.) ·
    *   ERDDAP™공개 릴리스 및 내부 이정표를 통해 사용할 수 있습니다[ERDDAP™GitHub에서](https://github.com/ERDDAP)· 더 많은 정보를 원하시면,[다운로드](https://github.com/ERDDAP/erddap/wiki)제품정보ERDDAP™프로젝트와 더 일반[ERDDAP™프로그래머의 가이드](/docs/contributing/programmer-guide)· (이것은 별도로 발표 된 몇 주 후ERDDAP™1.38 릴리스.) 
    * Generate데이터셋 Xml는 개선되었습니다.
        * 스크립트가 수정되었으므로 모든 Linux 컴퓨터에서 올바르게 작동해야합니다. (몇 가지) ·
        * 지금 추가creator\\_name·creator\\_email·creator\\_url가능한 한.
        * 다른 많은 작은 개선.
    * Refined 방법ERDDAP™시간 거래.
        * 내부적으로,ERDDAP™지금 millisecond 정밀도에 시간을 취급합니다 (몇 초) ·
        * 이제 선택적으로 주어진 dataset에 대한 시간 정밀도를 지정할 수 있습니다.[time\\_precision](/docs/server-admin/datasets#time_precision)· 예를 들어, 날짜 정밀도로 시간값을 표시하기 위해 dataset을 설정할 수 있습니다. (예. 1970-01-01) ·
        * 현재 데이터셋은 기본 설정을 사용하므로 이러한 변경 사항에 의해 중단되지 않고 초정밀로 시간을 표시하는 데 계속됩니다. Servet Cizmeli와 Philip Goldstein에게 감사하십시오.
    *   [EDDTableNcCFFiles에서](/docs/server-admin/datasets#eddtablefromnccffiles)새 데이터셋 유형으로 사용 가능datasets.xml파일. 그것은 정의 된 수많은 파일 형식의 모든 데이터를 읽을 수 있습니다[사이트맵 분리된 표본 추출 Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)대회. 유효한 DSG 파일 형식의 거대한 수를 위한 표본 파일을 만들기를 위한 Kyle Wilcox에 NODC 그리고 특별한 감사에 감사 및 그(것)들을 위해 대중적으로 유효한.
*    **작은 변화/Bug 고침:** 
    * 확장 된[빠른 시작](#quick-restart)모든 관련 시스템에EDDGrid그리고 EDDTable subclasses.
    * 향상된 문서, 특히 사용 방법[다운로드](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)이름 *[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)각종 클라이언트 소프트웨어에서.
    * minTime 및/또는 maxTime을 지원하는 고급 검색을 epochSeconds로 표현했습니다. Lynn Dewitt에 감사합니다.
    * 관련 기사.htmlTable링크로 URL 및 이메일 주소를 표시하는 출력.
    * 관련 "rel=" and "rev="&lt;a href&gt; 태그. Pat Cappelaere 덕분에OGC REST프로젝트.
    * 믿을 수 없는 큰 자료 요구에 대하여 개량된 보호, notably 안에tabledap, 그것은 더 열심히 문제 이다.
    * message.xml에 더 많은 메시지를 이동합니다.
    * 제작 속도 향상.
    * 설치하기EDDGrid파일에서 정렬 된 축을 허용하는. Maricel Etchegaray 덕분에.
    * 삭제 된 참조 iGoogle 때문에 중단됩니다.
    * 몇몇 작은 변화 및 버그 수정을 만들었습니다.

## 버전 1.38{#version-138} 
 (출시 2012-04-21) 

*    **새로운 특징:** 
    * ISO 19115 및 FGDC --ERDDAP™각 데이터셋을 위한 ISO 19115 및 FGDC XML 메타데이터 파일을 자동으로 생성합니다. 파일에 링크는 datasets의 모든 목록에서 볼 수 있습니다. (e.g., 전체 텍스트 검색에서) 웹접근성 폴더도 (WAF 소개)   (자세히보기[FGDC 웨이퍼](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)이름 *[ISO 19115 인증](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) · Ted Habermann, Dave Neufeld 및 기타 많은 사람들에게 감사드립니다.
    * Datasets에 대한 전체 텍스트 검색 이제 지원 \\-_excludedWord_ 및 \\-"_ 제외 구문_" . Rich Signell에 감사.
    * datasets에 대한 검색은 이제 페이지가 표시됩니다. 기본값은 매개변수 문자열을 사용합니다: page=1&itemsPerPage=1000, 하지만 요청의 URL에 값을 변경할 수 있습니다. Steve Hankin 및 UAF 프로젝트 덕분에.
    *   OpenSearch--ERDDAP™현재 지원[OpenSearch1.1 마일](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)datasets에 대한 검색에 대한 표준. 다른 것들 중, 이것은 카탈로그 집계 웹 사이트를 분산 검색 할 수 (각 카탈로그에 대한 검색 요청을 전달하여 그것에 대해 알고) ·
    * Comma 분리 주요 특징 (CSV 파일) 파일 --ERDDAP™이제 값 사이의 comma로 CSV 파일을 생성합니다. (Excel이 선호하는 것) , comma+space 대신. Jeff deLaBeaujardiere 덕분에.
    * 백만 데이터 세트 -- 몇몇 변화는 지원하기 위하여 했습니다ERDDAP데이터셋의 거대한 수를 갖는 s, 아마도 백만. Steve Hankin 및 UAF 프로젝트 덕분에.
*    **기타ERDDAP™관리자는 알아야 할:** 
#### 빠른 Restart{#quick-restart} 
*   [·](#quick-restart)빠른 재시작 시스템ERDDAP™훨씬 빨리 다시 시작.
     **setup.xml 파일에 이것을 추가하십시오** 오른쪽 후&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * datasets에 대한 전체 텍스트 검색은 Lucene 검색 엔진으로 수행 할 수 있습니다. (10,000개 이상의 데이터셋이 있는 경우 원본 검색 엔진을 추천합니다.) 또는 원본 검색 시스템.
         **setup.xml 파일에 이것을 추가하십시오** 오른쪽 후&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * setup.xml에서, you can/should now add two new category to the comma-separated list of&lt;categoryAttributes&gt;:
        * 글로벌:keywords (글로벌:institution 후 바로 추가) -- 글로벌 키워드 속성에서 키워드의 comma-separated 목록을 파는 새로운 특수 사례는 각 키워드에 대한 별도의 항목을 만듭니다.
        * 지원하다 이름 * (끝에서 추가) -- 각 분류하는 새로운 특별한 경우dataVariable destinationName₢ 킹
    * setup.xml에서, 당신은 할 수 있습니다 (왜?) 이름 *ERDDAP™FGDC 및/또는 ISO 19115 메타데이터를 포함한 모든 데이터셋에 제공하지 않습니다.
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

이 설정의 기본 값은 true입니다.
    * 내 계정datasets.xml, 당신의 datasets를 위한 metadata 개량을 고려하십시오.ERDDAP™이제 자동으로 데이터셋의 메타데이터를 기반으로 각 데이터셋에 대한 ISO 19115 및 FGDC XML 메타데이터 파일을 생성합니다.
그래서, **좋은 dataset metadata는 좋은 지도합니다ERDDAP- ISO 19115 및 FGDC 메타데이터 생성**   
         **많은 새로운 RECOMMENDED에 대한 새로운 문서보기[글로벌 기여](/docs/server-admin/datasets#global-attributes)·** 
    * 내 계정datasets.xml, 당신이 말하는 경우에ERDDAP™FGDC 및 / 또는 ISO 19115 파일을 사용하려면 서버의 파일 시스템에 어딘가에 있습니다.ERDDAP™이 파일을 생성, 사용:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
_fullFileName_\\="" 또는 파일이 발견되지 않은 경우, dataset은 FGDC 및/또는 ISO 19115 메타데이터가 없습니다. 그래서 특정 데이터 세트에 대한 FGDC 및 / 또는 ISO 19115 메타 데이터를 억제하려는 경우에도 유용합니다.
    * 내 계정datasets.xml, 모두EDDGridSideBySide와EDDGridAggregateExistingDimension datasets는, 어떤 아이 datasets가 다른지 확인합니다datasetID부모 데이터 세트보다 다른 어린이보다 s. (예를 들어, George Foreman의 단순하지만 효과적인 시스템을 따라 아이들을 명명 할 수 있습니다.) 가족의 이름이 정확히 동일하다면, dataset은 로드에 실패합니다. (축의 값이 분류되지 않은 오류 메시지) ·
    * 내 계정datasets.xml, 유효한 목록에 약간의 변화가 있었습니다ioos\\_categorymetadata 값:
        * "pCO2"는 "CO2"로 변경되었습니다.
        * "Physical Oceanography"가 추가되었습니다.
        * "Soils"가 추가되었습니다.
    * 내 계정datasets.xml·ERDDAP™더 이상 '.'를 허용datasetID· 그것은 허용되었지만 discouraged. (뚱 베어) 
    * 내 계정datasets.xmlEDDTableFromThreddsFiles 및 EDDTable에 대한 설정Hyrax파일이 약간 변경되었기 때문에 두 클래스는 단지 더 효율적으로 되돌려 (이제 두 클래스는 항상 원격 데이터 파일의 모든 로컬 복사본을 만듭니다.) · 이 수업을 설정하는 문서 보기:[EDDTable에서Hyrax파일 형식](/docs/server-admin/datasets#eddtablefromhyraxfiles)이름 *[EDDTableFromThredds파일](/docs/server-admin/datasets#eddtablefromthreddsfiles)· 특히,에 대한 개정 된 의견보기&lt;파일Dir&gt; (지금 불평) 이름 *&lt;sourceUrl· (지금 필수) · 또한, 당신은 효율성을 위해 EDDTableCopy에서 이 종류를 결코 감싸지 않아야 합니다.
    * 내 계정datasets.xmlEDDTableFromDatabase를 사용하는 경우Oracle데이터베이스, 당신은 연결을 포함해야 같은 재산
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
기본이 10이기 때문에 한 번에 데이터의 많은 행이 어떻게 fetch하는지 지정하려면, horribly inefficient입니다. 이름 *[Oracle관련 기사](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm)· MySql 및 PostgreSQL은이 설정에 대한 더 나은 기본을 갖는 것 같습니다. Kevin O'Brien에게 감사.
    * EDDTableFromDatabase를 사용하는 경우, 개선된["Speed" 문서](/docs/server-admin/datasets#eddtablefromdatabase)성능 향상을 위한 추가 제안 Kevin O'Brien에게 감사.
    * 내 계정datasets.xml, 모든 EDDTable ... 데이터 세트, 협약 및Metadata\\_Conventions글로벌 속성, CF-1.6 참조 (아니다 CF-1.0, 1.1, 1.2, 1.3, 1.4, 또는 1.5) CF-1.6 이후는 Discrete Sampling Geometry와 관련된 변화를 포함하는 첫 번째 버전입니다.
    * 프로그램ERDDAP™코드는 lib/lucene-core.jar를 javac 및 java 명령 줄 경로의 항아리 파일 목록에 추가해야 합니다.
    *   ERDDAP™한국어[새로운 서비스](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)CF Standard Name을 GCMD Science 키워드로 변환합니다. 데이터셋을 위한 글로벌 키워드 메타데이터를 생성할 때 유용할 수 있습니다.ERDDAP·
    * 보츠와 거래 -- 이 조언을 읽으십시오.[봇을 크롤링에서 방지ERDDAP™어둡게](/docs/server-admin/additional-information#robotstxt)·
    * 번역 -- 본문내용ERDDAP'웹 페이지는 주로 message.xml에서 다른 언어로 번역에 적합 (e.g., 독일, 프랑스) · 이제 메시지는 종종 번역을 만드는 데 도움이되는 MessageFormat를 사용합니다. 번역에 관심이 있다면, 이메일erd dot data at noaa dot gov·
    * 제품 설명datasets.xml-- 표본에 있는 몇몇 작은 그러나 뜻깊은 과실이 있었습니다datasets.xml· 그 datasets를 사용하는 경우, 새로운 샘플에서 더 새로운 버전을 얻으십시오.datasets.xml새로운 erddapContent에서.zip파일. 제임스 윌킨슨에 감사.
    * 사이트맵 나는 열심히 노력한다ERDDAP™이 릴리스 후 GitHub 프로젝트 ASAP.
*    **작은 변화/Bug 고침:** 
    * 새로운 팔레트, OceanDepth, 심도 값에 유용 (긍정적 인) , 예를들면, 0 (뚱 베어) 8000까지 (인기있는) ·
    * 더 보기.kml산출에서tabledap더 나은 마커 아이콘을 사용 (그것은 fuzzy하지 않습니다) · 그리고 마커를 통해 hovering 지금 더 큰.
    * EDDTableFromFiles -- 마지막 업그레이드에서 새로운 netcdf-java 라이브러리는 변수 이름에 대한 엄격한 제한이 있었습니다..nc파일. 그 때문에 EDDTableFromFiles에 대 한 문제는 변수의 경우sourceName특정 punctuation 문자가 있습니다. EDDTableFromFiles는 이제 그 문제를 피하기 위해 수정되었습니다. Thomas Holcomb에 감사합니다.
    * .subset 페이지가 지원됩니다. 관련 데이터에 대한 체크 박스 대신 0/10/100/1000/10000/100000. 100000은 브라우저가 충돌 할 수 있음을 경고합니다. Annette DesRochers, Richard에게 감사 (아베) Coughlin 및 IOOS 생물 프로젝트.
    * .../erddap/info/_datasetID_/index.html 웹 페이지는 이제 클릭 가능한 링크로 URL과 이메일 주소를 보여줍니다. Richard에게 감사 (아베) Coughlin과 IOOS 생물 프로젝트.
    * 버그 수정: 에서tabledap고도를 가진 datasets를 위해 미터PerSourceUnit&lt;0, 고도 제약을 가진 쿼리는 잘못 처리되었습니다. Kyle Wilcox 덕분에.
    * 버그 수정:EDDGridAggregateFromExistingDimension는 이제 다양한 TDS URL을 지원합니다. 감사합니다 ?

## 버전 1.36{#version-136} 
 (출시 2011-08-01) 

*    **새로운 특징:** 
    * 사용자의 standpoint에서 상당한 변화가 없습니다.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * pmelTao dataset는 종종 샘플 데이터 세트로 사용되었습니다.tabledap  
문서는 더 이상 사용할 수 없습니다.ERDDAP™관리자 MUST 이러한 변경을:
        * 내 계정datasets.xml, 당신이 있는 경우에datasetID="pmelTao" dataset, 추가
active="false" right before "&gt;"그 줄의 끝에.
        * 당신의 setup.xml에서,&lt;EDDTableIdExample에 대하여 pmelTao, 다음:
            * 이름 *datasets.xml데이터셋이 없습니다.datasetID="erdGlobecBottle", 추가
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * setup.xml에서 태그의 모든 교체&lt;EDDTableIdExample에 대하여 제품정보
                &lt;연락처Matlab플롯플러스 이름 *
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * type이 EDDTableFromFiles의 subclass인 datasets를 위해 이제 metadata에서 데이터를 만들 수 있습니다.
구체적으로, 당신은 이제 원본 변수 중 하나의 속성의 값에서 변수를 만들 수 있습니다.
예를 들어,datasets.xml, 안에&lt;dataVariable&gt; 태그, 당신이 사용하는 경우
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™크루즈 변수의 PI 속성의 값과 변수를 만들 것입니다.
WOD에 감사.
*    **변경 사항:** 
    * 작은 변화

## 버전 1.34{#version-134} 
 (출시 2011-06-15) 

*    **변경 사항:** 
    * 버그 수정: 일부 64-bit에서 발생 한 메모리 누출을 수정Java설치.
    * 버그 수정:ERDDAP™이제는 고도 차원의 값이 낮아질 때 이러한 글로벌 속성을 올바르게 설정합니다: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
이름 *actual\\_range변하지 않는: 그것은 낮은, 높은 가치 또는 높은, 낮은 가치, 저장의 범위와 순서를 나타내는 것을 예정되기 때문에.
        
    * 작은 변화.
    *   ERDDAP™관리자는 setup.xml 또는 변경 사항을 만들 필요가 없습니다.datasets.xml·

## 버전 1.32{#version-132} 
 (출시 2011-05-20) 

*    **변경 사항:** 
    * 새로 추가된 CF Discrete 샘플링 Geometries 지원 (불행히도 아직 온라인으로 사용할 수 없습니다) 제안 된 CF Point Observation 협약을 대체하는 .
        ERDDAP™user will see that cdm\\_feature\\_type=Station is replace by TimeSeries and there are small changes to the files created for.ncCF 파일 유형 (flat\\_dimension 은 이제 sample\\_dimension 을 호출합니다.) ·
        ERDDAP™관리자는 이러한 변경을 할 필요가 있습니다.datasets.xml::
        * cdm\\_data\\_type=Station은 cdm\\_data\\_type=TimeSeries로 변경되어야 합니다.
        * cdm\\_data\\_type=StationProfile은 cdm\\_data\\_type=TimeSeriesProfile로 변경되어야 합니다.
        * cdm\\_station\\_variables는 cdm\\_timeseries\\_variables로 변경되어야 합니다.
        * cf\\_role=station\\_id는 cf\\_role=timeseries\\_id로 변경되어야 합니다.
    * (주)ioos\\_category옵션: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * 64-bit에서 가능한 메모리 누출에 가능한 솔루션Java·\\[그것은 작동하지 않았다.\\]
    * 작은 변화.

## 버전 1.30{#version-130} 
 (출시 2011-04-29) 

*    **새로운 특징:** 
    * 64 비트 지원Java· 64 비트로 사용될 때Java·ERDDAP™이제 훨씬 더 힙 메모리를 사용하고 더 많은 동시 요청을 처리 할 수 있습니다.
    * 고객지원.nc최대 2GB의 파일 요청 (64 비트 없이Java) 더 나은 사용을 통해ERDDAPchunks의 데이터 취급
    * 코드와 2X 속도에서 많은 2X 속도 향상Java1.6 만들기ERDDAP™2X에서 4X까지 전보다 빠릅니다.
    * 메모리 절약 개선은 크게 낮습니다.ERDDAP's 기본 메모리 사용.
    * tabular datasets를 위해,ERDDAP™이제 데이터셋의 cdm\\_data\\_type을 완전히 인식하고, CDM 유형의 데이터 맵이 어떻게 나옵니다. 이름 *[사이트맵 Discrete 표본 추출 Geometries 명세](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)· 아마도 며칠 전에 Word 파일은 .html로 변환되며 그 웹 페이지의 현재 "OBSOLETE"정보를 대체합니다. 감사합니다.NOAAUAF 프로젝트.
    * 대부분의 EDDTable datasets를 위해, 새로운 산출 파일 유형 선택권,.ncCF는 Contiguous Ragged Array를 만듭니다..nc파일의 최신 버전에 따라[사이트맵 분리형 샘플링 Geometries 컨벤션](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)· 이 파일은 데이터셋의 CDM 데이터 유형을 반영하는 구조입니다. 제안 된 규칙이 변경 된 이후, 이 글의 것처럼, netcdf-java 라이브러리는 아직 생성 된 파일 형식을 읽지 못합니다.ERDDAPCDM 데이터 파일로 해석한다. 그것은 아마 곧. 감사합니다.NOAAUAF 프로젝트.
    * View : .subset 웹 페이지의 Distinct Data 옵션은 이제 사용자가 볼 수있는 드롭다운 목록입니다. (기본 = 1000) · 이 변화, 다른 사람, 허용ERDDAP™특정 데이터의 행의 매우 큰 숫자를 가지고 데이터 세트와 함께 작업. (어떤 단일 변수에 대한 독특한 값의 수는 여전히 문제이지만 매우 높을 수 있습니다. (20,000원) .subset 및 다른 웹 페이지로드의 앞에 정말 천천히.) 감사합니다.NOAAUAF 프로젝트.
    * .subset 웹 페이지에는 새로운 옵션이 있습니다. Distinct 데이터 카운트 보기. GTOPP 프로젝트 덕분에.
    * aid 사용자에, 명백한 값 (e.g., 역 이름) 이제 Make-A-Graph 및 Data Access Forms에 표시됩니다. 감사합니다.NOAAUAF 프로젝트.
    * . 투명 Png 요청은 이제 모든 유형의 그래프와 데이터 표현을 지원합니다. 그것은 단지 데이터를 그릴 -- 아니 axes, 전설, landmask, 또는 다른 사람. 이것은 투명한Pngs의 층으로 이미지를 만들 수 있습니다. 만약 &.size=_width_|_height_는 쿼리에 지정됩니다. ((주)) , 그것은 영광입니다. 기본값은 360x360 픽셀입니다. 예외는EDDGrid&.draw=surface, 기본적으로 (시작하기) 데이터 포인트 당 ~1/pixel의 이미지입니다. (최대 3000 x 및 y 픽셀) · Fred Hochstaedter 덕분에.
    * 더 보기WMS웹 페이지는 이제 dataset의 변수에 대한 컬러 바를 보여줍니다 (₢ 킹) · Emilio Mayorga 및 기타 덕분에.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 이 릴리스는 많은 변화를 포함합니다. 그들은 모두 중요합니다. 아래의 변경 사항을 통해 환자와 일하십시오.
    * 이 버전은 몇 가지를 다루는 것보다 일찍 밀어Java보안 버그. 불행히도, 몇몇 특징/fixes는 이것을 위해 예정했습니다ERDDAP™버전은이 버전에 없습니다. 사이트 맵 희망, 다음 버전은 곧 상대적으로 될 것입니다 (그리고 훨씬 쉽게 향상) ·
    * 몇 가지 보안 버그를 방지하기 위해Java6 업데이트 23 이하, 다운로드 및 최신 버전을 설치Java  (Java6 업데이트 24 이상) · 64비트 운영 체제가 있는 경우 64비트 버전의Java·
    * Tomcat 5를 사용하는 경우 Tomcat 6 또는 7으로 업그레이드하십시오. (이름 *) · Tomcat 6을 사용하는 경우 Tomcat 버전 7.로 업그레이드하십시오.
    * 자주 묻는 질문[새로운 설정ERDDAP™](/docs/server-admin/deploy-install), 그러나 관련있는 곳에, 당신은 새로운 임명에 당신의 오래된 임명에서 파일을, 믿을 수 없을 것입니다\\[뚱 베어\\]/content/erddap 디렉토리 및 파일. 그 부분으로, 주의[새로운 Tomcat 설정 권장 사항](/docs/server-admin/deploy-install#tomcat)·
    * default erddap.css는 이제 erddap.war 파일에 포함되어 있습니다.
        * 기본 erddap.css를 사용하려면 **이름 *** 뚱 베어\\[뚱 베어\\]/content/erddap/images/erddap.css .
        * 자주 묻는 질문\\[뚱 베어\\]/content/erddap/images/erddap.css, 그것을 사용하는 것을 원합니다: 다만 장소에서 그것을 떠나고 대체하십시오&lt;input&gt; 단면도를 가진:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * 내 계정\\[뚱 베어\\]/content/erddap/setup.xml:
        * 관련 의견 및 태그를 대체&lt;부분RequestMaxBytes&gt; 및&lt;부분RequestMaxCells&gt; 이름 *
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * 관련 의견 교체&lt;categoryAttributes&gt; 태그의 값 수정:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

- 한국어&lt;categoryAttributes&gt; 글로벌 속성은 이제 글로벌 접두사를 통해 확인되어야 합니다. (e.g., 글로벌:법) · 다른 속성은 변수 속성이 가정됩니다. (₢ 킹standard\\_name) · 또한, 기관 가치 (단지 하나) 원래 경우에는 왼쪽. 이제 모든 범주 값은 Lowercase로 변환됩니다.
    * 내 계정\\[뚱 베어\\]/content/카지노사이트datasets.xml::
        * 큰 IMPROVED:ERDDAP™tabular dataset의 cdm\\_data\\_type과 관련된 새로운 요구사항이 있습니다. Notably, 각 dataset MUST에는 cdm\\_data\\_type과 관련된 정확한 메타데이터와 변수가 있습니다. 그렇지 않으면 dataset가 로드되지 않고 오류를 발생시킵니다. 문서 보기[cdm\\_data\\_타입](/docs/server-admin/datasets#cdm_data_type)·
        * FYI: 새로운 dataset 유형이 있습니다: EDDTableFromAsciiServiceNOS.
        * FYI : 새로 허용 된 세 가지가 있습니다.ioos\\_category옵션: Hydrology, 품질 (e.g. 품질 플래그) , 및 통계 (예를 들어,) ·
        * EDDTable에 대 한... 파일 datasets, 제거&lt;nDimensions&gt; 태그. 그들은 더 이상 필요하거나 사용되지 않습니다.
        * 변수에 대한destinationName=altitude,ERDDAP™더 이상 힘long\\_name고도이기 위하여. 자주 묻는 질문datasets.xml자주 묻는 질문&lt;destinationName&gt;altitude와 그 변수에 추가&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (또는 약간 다른long\\_name특별한 경우) ·
        * 선택 사항: 모든 EDDTableFromFiles 하위 클래스 지원 변수[sourceName=글로벌:...](/docs/server-admin/datasets#global-sourcenames)각 파일에서 데이터를 데이터 변수로 변환합니다. Lynn DeWitt에 감사합니다.
    * EDDTableFromDatabase 사용자 --ERDDAP™Postgres의 새로운 JDBC 4 드라이버와 함께 제공됩니다. 다른 데이터베이스의 경우 데이터베이스의 최신 JDBC .jar 파일에 대한 웹을 확인하십시오. 이름 *ERDDAP™현재 사용Java1.6+의 JDBC 4 (아니 3) 아마 추천.
    * ₢ 킹
        *   EDDGrid...Files 및 EDDTable에서 ...에서 File datasets 이제 fileTable 정보를 저장합니다.
            \\[큰Parent감독\\]/데이터셋 정보/\\[datasetID\\]₢ 킹.nc파일.
또한 EDDTable datasets는 이제 하위 설정 정보를 저장합니다.
            \\[큰Parent감독\\]/데이터셋 정보/\\[datasetID\\]₢ 킹.nc파일. 이 파일은
            \\[큰Parent감독\\]/데이터셋 정보/\\[datasetID\\]·.json파일.
오래된 파일은 자동으로 삭제됩니다.ERDDAP™시작하기 또는, 당신은 모든 파일을 삭제할 수 있습니다 (하지만 빈 subdirectories를 남겨) 내 계정\\[큰Parent감독\\]/datasetInfo/.
        * 제안 된 새로운 CF Point Observation Conventions를 사용하여 로컬 및 원격 파일에서 데이터를 읽을 수있는 새로운 EDDTableFromNcCFFiles에서 일했습니다. 그러나이 릴리스에 없습니다. 이 파일을 읽을 수있는 몇 가지 방법과 관련된 netcdf-java 라이브러리에 문제가 있습니다. 제안 된 CF Point Observation Conventions의 최근 변경 사항이있었습니다. netcdf-java 라이브러리가 수정되고 최신 제안에 업데이트되면, 나는이 작업을 다시 시작합니다.
        * 지원하다ERDDAP™Windows에서 문제가있을 수 있습니다. 그렇지 않으면 볼 수 있습니다.\\[bigParentDirectory/logs/log.txt 파일 그ERDDAP™삭제 및/또는 파일 이름을 신속하게 변경할 수 없습니다. 이것은 바이러스 백신 소프트웨어로 인해 (예를 들어, McAfee와 Norton에서) 바이러스에 대한 파일을 검사하는 것. 이 문제로 실행하는 경우 ("Unable to delete ..."와 같은 log.txt 파일에서 오류 메시지에 의해 볼 수 있습니다) 백신 소프트웨어의 설정을 변경하면 부분적으로 문제를 완화할 수 있습니다.
만약에ERDDAP™Windows에서 데스크톱에서 실행하는 테스트는 단지 성가입니다.
만약에ERDDAP™Windows에서 공개ERDDAP™, 리눅스 서버에 전환 고려.
    * 느린 첫 시작 -- 당신이 실행하는 첫 번째 시간ERDDAP™업그레이드 후,ERDDAP™데이터셋을로드하는 것은 느릴 수 있습니다. 오시는 길ERDDAP™집계된 파일에 대한 정보를 저장하므로ERDDAP™모든 파일에서 일부 정보를 다시 볼 필요가 있습니다. 그것은 시간이 걸릴 것입니다.
    * 스타트업의 오류 -- cdm\\_data\\_type과 관련된 변경 사항이 발생하면 데이터셋의 일부가 로드되지 않았고 오류를 발생시킵니다. 조심스럽게 Daily Report 이메일을 읽으십시오.ERDDAP™당신을 보낼 때ERDDAP™종료되었습니다. 로드하지 않은 데이터셋 목록이 있습니다. (맨 위로) 그들은 로드하지 않았다 이유 (하단의) ·
    * 당신이 갇히거나 다른 질문이 있는 경우, 저에게 세부사항을 보내십시오:erd.data at noaa.gov·
    * 프로그램 -- 견적 요청Java실행하는 프로그램ERDDAP™코드, 명령 줄 매개 변수 참조의 일부를 변경 해야:
        * joda-time-1.6.2.jar를 joda-time으로 변경하십시오. 한국어
        * Postgres JDBC .jar 참조를 postgresql.jdbc.jar로 변경
*    **작은 변화 및 버그 수정 :** 
    
    * hung 스레드를 방지하는 향상된 연결 처리.
    * 거의 동시 동일한 요청을 더 효율적으로 처리하는 concurrency 관행을 개선했습니다.
    *   ERDDAP™이제 netcdfAll-4.2.jar를 사용합니다. (netcdfAll-latest로 이름을 변경합니다. 한국어) · 이 스위치는 몇 가지 내부 변경을 중단하고 몇 가지 작은 외부 변경을 발생, 예를 들어, grib 파일이 읽는 방법 및 작은 변경으로 변경.ncHeader 산출.
    * 새로운 기능:\\[뚱 베어\\]/convert/fipscounty.html 변환FIPS카운티 코드에서 / 카운티 이름.
    * 지도에서 국가 경계는 이제 어두운 보라색입니다, 그래서 그들은 모든 배경 색상에 더 잘 서.
    * 기타 제품.kml다시 출력은 원형 아이콘을 사용하여 포인트 표시 (비행기 아이콘이 아닌 Google 최근 전환) ·
    * erdCalcofi datasets는 backranged 이고 지금 국부적으로 파일에서 봉사합니다 (더 보기) ·
    * Generate데이터셋 Xml에서 뚱 베어 카탈로그는 이제 결과 파일을 만듭니다:
        \\[뚱 베어\\]/webapps/erddap/WEB-INF/temp/EDDGridfromThreddsCatalog.xml . . . . · Kevin O'Brien에게 감사.
    * Generate데이터셋 Xml에서 뚱 베어 카탈로그 이제 소스 URL에서 불필요한 포트 번호를 제거하려고합니다. (e.g., :8080 및 :8081는 때때로 제거될 수 있습니다) · 이름 *NOAA중앙의 보안 팀.
    * .subset 웹 페이지의 경우, Distinct Data의 Map은 이제 변수 lat lon 범위를 가지고 있습니다.
    * 여러 목록에서ERDDAP™  (e.g., datasets의 모든 것을 보여주는 테이블) A.Z가 전에 분류 된 것을 분류했습니다..z· 이제 그들은 사건 과민한 방법으로 분류합니다.
    * .subset 웹 페이지에 작은 변화, 포함: 단위는 지금 나타납니다.
    * Generate데이터셋 Xml 및 DasDds 더 이상 시스템 클립 보드 또는 displayInBrowser에 결과를 넣을 수없는 예외를 던지지 않습니다. Eric Bridger와 Greg Williams 덕분에.
    * 버그 수정: datasets가 로드될 때,ERDDAP™이제 geospatial 글로벌 속성을 제거하거나 조정합니다. Charles Carleton 덕분에.
    * 버그 수정 : String2.getClassPath () 이제 제대로 퍼센트 디코딩 클래스 오시는길 (뿐만 아니라, Windows에서, 파일 이름은 %20로 등장) · 이 영향ERDDAP™EDStatic 호출 SSR.getContextDirectory () 그리고 content/erddap를 찾는다. Abe Coughlin 덕분에.
    * 버그 수정 : EDDTableFromFiles에서 getDataForDapQuery와 관련된 () 이름 * Eric Bridger 덕분에.
    * 버그 수정:tabledap요청은 dataset의 고도가 제대로 처리되지 않았습니다 meterPerSourceUnit는 -1이었다. Eric Bridger 덕분에.
    * 버그 수정 : EDDTableFrom ... File datasets는 이제 =NaN 및 &#33;=NaN을 포함하는 요청을 올바르게 처리합니다.
    
## 버전 1.28{#version-128} 
 (출시 2010-08-27) 

*    **새로운 특징:** 없음.
*    **기타ERDDAP™관리자는 알아야 할:** 없음.
*    **버그 수정:** 프로그래밍 실수 수정 (만 버전 1.26) 이름 *ERDDAP™매우 느립니다.
     

## 버전 1.26{#version-126} 
 (출시 2010-08-25) 

*    **새로운 특징:** 없음.
*    **기타ERDDAP™관리자는 알아야 할:** 
    * 내 계정\\[뚱 베어\\]/content/카지노사이트/setup.xml,
        * 내 계정&lt;legal&gt;, 아래에 새로운 선에\\[표준: DataLicenses의 장점\\], 삽입\\[표준문의\\]·\\[표준문의\\]이름 *&lt;adminEmail&gt; 설정에서 더 높은 지정.xml.
        * 기타 제품&lt;tableCommonBGColor&gt;와&lt;테이블HighlightBGColor&gt;.
        * 이름: - 기타&lt;endBodyHtml&gt;에
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * 요구 사항: 내 계정\\[뚱 베어\\]/content/erddap/images/erddap.css와 erddapAlt.css는 하단에 추가합니다:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **버그 수정 및 작은 변화 :** 
    
    * 버그 수정 : 일부 상황에서 양식은 Internet Explorer의 일부 버전에서 작동하지 않았습니다. Greg Williams에 매우 감사합니다.
    * 버그 수정: Dataset이 원격에서 되었는지 확인 그래프 버튼이 작동하지 않았습니다.ERDDAP·
    * 버그 수정:WMS때로는 dataset이 원격에서 있었던 경우 작동하지 않았습니다.ERDDAP·
    * 많은 작은 변화와 버그 수정.
    

## 버전 1.24{#version-124} 
 (출시 2010-08-06) 

*    **새로운 특징:** 
    * (주)[Subset 웹 페이지](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)tabular datasets의 subsets를 선택하기 위하여 faceted 검색을 사용하십시오. POST에 감사.
    * (주)[고급 검색](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)다른 검색 옵션을 모두 결합하고 경도, 위도 및 시간 경계 상자를 추가합니다. Ellyn Montgomery 덕분에. (지연에 대한 죄송합니다.) 
    * (주)[전환 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)웹 페이지 및 서비스는 숫자 시간을 ISO 문자열로 변환합니다.
    * (주)[단위 변환](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)웹 페이지 및 서비스 변환UDUNITSUCUM 단위에서 /. 이름 *NOAAIOOS 정보SOS·
    * 이름 *tabledap요청은 &units를 포함합니다 (학회소개) , 단위 이름은 본래 이름에서 개조될 것입니다 ((주)UDUNITS) 이름 *[한국어](https://unitsofmeasure.org/ucum.html)단위 이름. 이것은 단지 단위에 영향을줍니다.\\*이름 *\\*, 데이터 값이 아닙니다. 이름 *NOAAIOOS 정보SOS·
    * Graph 웹 페이지 및 그래프 및지도를 만드는 개선 :
        * 그래프가 지도인 경우, 새로운 Graph 버튼을 줌 / 아웃 및 지도의 중심 지점을 변경하려면 새로운 옵션이 있습니다. POST에 감사.
        * 아래쪽에 필터 설정 추가. Greg Williams 덕분에.
        * 해안 데이터 파일에 내장 된 GSHHS v2.0에 업데이트되었습니다. POST에 감사.
        * 지도에는 호수와 강이 있습니다. POST에 감사. (죄송합니다, Sacramento River Delta는 해안 데이터와 호수/리버 데이터셋 거래가 없기 때문에 누락되었습니다.) 
        * pscoast-derived 국가 / 국가 파일에 내장 된 업데이트되었습니다. POST에 감사.
        * Topography.cpt는 약간 수정되었습니다. (이 불리하게 당신에게 영향을 미치는 경우 죄송합니다.) POST에 감사.
        * griddap's Make A Graph에서, 사용자가 변수를 변경하면, 양식은 자동으로 resubmitted이므로axisVariables' showStartAndStop은 항상 그래프 변수를 반영합니다. Joaquin Trinanes에게 감사.
        * png 및 pdf 이미지 URL의 경우:
            * 새로운 &.land=_value_, 여기서 _value_는 "under"일 수 있습니다. (쇼 topography) 또는 "over" (다만 쇼 bathymetry) · 지정하지 않으면 기본값은 설정된다.[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)내 계정datasets.xml또는 setup.xml. POST에 감사.
            * 새로운: 너무 긴 전설의 선은 여러 줄로 자동적으로 끊어집니다. POST에 감사.
        * png 이미지 URL의 경우:
            * 새로운 &.legend=_value_, 여기서 _value_는 "Bottom"일 수 있습니다. (기본 정보) , "오프"또는 "만". 이 전설을 포함, 전설을 제외, 또는 전설을 얻을. Cara Wilson에게 감사.
            * 새로운 &.trim=_n Pixels_는 nPixels의 경계를 떠납니다. (예, 10) 이미지의 하단에. 그것은 .legend=off 후에 적용됩니다. Cara Wilson에게 감사.
            * 새로운 &.size=_width_|_height_는 픽셀에서 이미지의 너비와 높이를 지정합니다.
    * 새로운 출력 파일 형식 :
        * .csvp 및.tsvp -- 같이 .csv와.tsv, 그러나 " (_단위_) " 첫번째 선에 열 이름에 부합.
        * .odvTxt -- .txt 파일을 simplifies[Ocean 데이터 (주) (크기: ODV) ](https://odv.awi.de/)·
        * .esriCsv -- ESRI의 수입에 적합한 .csv 파일을 만듭니다.ArcGIS· (탭 데이터셋만) 1월 Mason, Jeff de La Beaujardiere, 및 감사NOAAIOOS 정보SOS프로젝트.
    * GUI 개선[회사 소개](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)웹 페이지. 또한, 분류 값 (기관 이외의) 지금 모든 Lowercase. Non-lowercase 요청이 허용됩니다. (이름 *) backwards 호환성을 위해. 로이 Mendelssohn 덕분에.
    * 오류 메시지는 이제는 더 짧고 더 많은 사용자가 지향합니다. Greg Williams 덕분에.
    * 크게 감소하는 내부 변화ERDDAP's 기본 메모리 사용.
    * POST 프로젝트와 관련된 많은 새로운 기능.
*    **기타ERDDAP™관리자는 알아야 할:** 많은 변화가 있습니다. 사이트 맵 그러나 각 사람은 좋은 이익을 가져옵니다.
    * GenerateDatasetXml의 큰 변화 -- 지금 자주 묻는 질문 (자주 묻는 질문[데이터셋 제품정보](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)* 이름) 그리고 이제 항상 근본적으로 준비된 콘텐츠를 생성합니다.datasets.xml· 설정에 대해 여전히 책임이 있으므로 여전히 검토해야합니다.datasets.xml그것을 사용하기 전에 내용. 프로젝트에 대한 인간의 퍼팅 노력은 항상 컴퓨터 프로그램보다 더 나은 것입니다. UAF 프로젝트 덕분에.
    * REQUIRED: setup.xml에서, 당신은 개정해야 합니다WMS이름 * 이 태그를 포함해야 (그러나 값을 변경하는 것은 무료) ::
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: setup.xml에서 복사하고 이 새로운 제안을 붙여 넣기&lt;startHeadHtml&gt; 당신의 오래된 버전을 대체합니다. 그러나 당신의 선호도에 대한 변경을 자유롭게 느끼십시오.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

POST, Hans Vedo 및 Rick Blair 덕분에.
    * 필요한: setup.xml에서&lt;startBodyHtml&gt;, 변경&lt;body&gt; 태그가 될&lt;body&gt;, 스타일이 이제 erddap.css에 의해 설정됩니다.
    * 필요한: setup.xml에서, 이 변경&lt;엔드바디Html&gt; (그러나 이메일 주소를 이메일 주소로 변경하고 다른 변경을 만들기 위해 무료 느낌) ::
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * HIGHLY RECOMMENDED: 설정에서.xml, 권장&lt;theShortDescriptionHtml&gt;는 이제
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

이 변경을 자유롭게 느끼고, 특히 첫 번째 단락의 마지막 문장.
    * setup.xml, 이메일EverythingTo 및 emailDailyReport 이제 이메일 주소의 comma-separated 목록이 될 수 있습니다. 첫 번째 이메일Everything 특별한 경우, 예를 들어, EDDXxxxFromErddap datasets 사용은 이메일 주소입니다. John Maurer에게 감사.
    * 이메일 오류가 이제 로그인\\[큰Parent감독\\]/logs/emailLogYYYY-MM-DD.txt 파일.
    * setup.xml에서, 새, 이메일 계정 속성 설정 옵션 매개 변수 (보통 후 오른쪽)&lt;이메일비밀번호:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

기본값은 아무것도 없다. Rich Signell에 감사.
    * 필요한 경우 EDDTableCopy 또는EDDGrid복사, 모든 것을 삭제해야합니다\\[큰Parent감독\\]/copy/ 디렉터리 및 파일에는 디렉토리의 "xh"또는 오래된 중지 후 파일 이름을 포함ERDDAP™새로운 시작ERDDAP™그래서 그 파일은 re-copied. 나는 매우 미안 해요, 그러나 변경을 만들고 희망적으로 몇 가지 관리자와 몇 가지 파일에 영향을 미치는 것이 중요하다.
리눅스에서, 당신은이 파일을 찾을 수 있습니다, cd\\[큰Parent감독\\]관련 상품
사이트 맵\\*₢ 킹\\*  
Windows에서 다음 파일을 찾을 수 있습니다.|제품정보
검색 할 일 : 문서
파일명의 모든 또는 부분: xh
찾아보기 : 찾아보기 -&gt;\\[큰Parent감독\\]관련 상품
'검색'을 클릭합니다.
^A는 그들을 모두 선택
Del to delete 그들 모두
    * 요구 사항 :datasets.xml, 에 대한 EDDTableFromDatabase datasets, 날짜 및 타임스탬프 변수, 데이터를 변경 두 배에 유형과 단위는 1970-01-01T00:00:00Z 이후 초에. 우리는 데이터베이스의 타임스탬프 데이터를 저장하는 데 필요한\\*이름 *\\*시간 영역. timezone 정보없이, 쿼리ERDDAP™데이터베이스에 보내고 그 결과ERDDAP™JDBC를 통해 데이터베이스에서 얻는 것은 주변이며 잘못 될 가능성이 있습니다. 우리는 시도했지만 Timezone없이 "timestamp"데이터를 처리 할 수있는 신뢰할 수있는 방법을 발견했습니다. 우리는이 좋은 연습을 생각한다. 모든 후, "timezone없이 타임 스탬프"데이터는 implied timezone이 있습니다. 데이터베이스 관리자의 시간대가 명백하다는 것은 좋지만 다른 소프트웨어가 데이터베이스와 제대로 상호 작용할 수 있도록 명시적으로 의미를 만듭니다. 감사 / 소리 마이클 Urzen.
    * 높은 수익: 에서datasets.xml, .subset 웹 페이지를 활성화 하려면 탭 데이터 세트의 검색, 당신은 추가해야합니다 [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables의 경우) dataset의 글로벌 속성에.
    * 완료: 에서datasets.xml, 당신은 dataset가 있는 경우에datasetID="pmelGtsppp", 그것을 바꾸십시오
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * 완료: 에서datasets.xml, 새로운 유효한 옵션이 있습니다 [&lt;cdm\\_data\\_type&gt;] 은 (/docs/server-admin/datasets#cdm_data_type의 경우) 글로벌 속성, 그래서 당신은 당신의 datasets에 대한 값을 검토 / 변경해야합니다.
    * 내 계정datasets.xml, 새로운 [&lt;sourceNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) 소스 서버가 지속적으로 처리하지 않는 경우 도움이 됩니다 &_variable_\\=_value_ 시험 올바르게 (때문에[부동점 수의 평등 시험의 일반적인 어려움](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) · 소스NeedsExpandedFP\\_EQ 기본값으로 true로 설정 (가장 안전한 설정) , 그래서 당신은 어떤 변화를 만들 필요가 없습니다.
    * (주)[EDDTableAsciiFiles에서](/docs/server-admin/datasets#eddtablefromasciifiles)· Jerry Yun Pan에 감사합니다.
    * (주)[EDDTableFromThredds파일](/docs/server-admin/datasets#eddtablefromthreddsfiles)· 로이 Mendelssohn 덕분에.
    * 자주 묻는 질문[EDDTableFromNcFiles는](/docs/server-admin/datasets#eddtablefromncfiles)파일의 더 넓은 범위와 함께 사용할 수 있습니다.
    * EDDTableFromBMDE는 비활성화되었습니다. 더 이상 어떤 활성, 적합, 데이터 소스가 없습니다.
    * GenerateDatasetXml에서 새로운 기능EDDGrid인기 동영상 카탈로그 전체 THREDDS 카탈로그 수확 (또는 subset) 그리고 생성datasets.xml이름 * UAF 프로젝트 덕분에.
    * Generate데이터셋 Xml와 DasDds는 이제 결과를 넣었습니다.\\[큰Parent감독\\]/logs/log.txt.txt 파일 형식 Rich Signell 및 Charles Carleton 덕분에.
    * 로그인 시스템에 대한 많은 개선. POST에 감사.
*    **기타ERDDAP™프로그램 알아야 할 사항 :** 
    * /WEB-INF/lib/ 디렉토리에 변경되었습니다. 따라 javac 및 java classpath 설정을 변경하십시오.
    * 새로운 것\\[이름 * 뚱 베어\\]/erddap/version 서비스는 버전의 버전을 결정합니다.ERDDAP· 응답은 텍스트, 예를 들면,ERDDAP\\_version=1.24의 HTTP 404 Not-Found 오류 메시지가 있는 경우,ERDDAP™버전 1.22 이하로. POST에 감사.
*    **작은 변화 및 버그 수정 :** 
    
    * EDDTable에서 그래서 변화:
        * 독서 IOOS를 위한 Dropped 지원SOSXML 응답.
        * IOOS에 대한 추가 지원SOS텍스트/csv. (그래서 NOSSOS서버는 현재 지원되지 않습니다.) 
        * IOOS와 관련된 많은 변화SOS서버 세부사항.
        * IOOS용 BBOX 쿼리에 대한 추가 지원SOS이름 *OOSTethys SOS서버. 이러한 변화는 관련 데이터 요청을 위해 큰 속도로 발생합니다. IOOS에 감사SOS·
    * 본문 바로가기.mat탭 데이터 파일은 이제 올바르게 저장됩니다. 로이 Mendelssohn 덕분에.
    *   WMS
        *   OpenLayers지금과 번들ERDDAP™사용방법WMS웹 페이지. 이 문제를 해결할 때OpenLayers몇 달 전에 변경하고 미래의 문제를 방지.
        * 내 계정WMS GetCapabilities응답,&lt;온라인등록 값은 이제 URL의WMS서비스. Charlton Galvarino 덕분에.
        * 전설이 표시됩니다WMS웹 페이지는 colorbar를 보여줍니다. Emilio Mayorga 덕분에.
    *   EDDGridAggregateExistingDimension constructor는 축선의 근원이 있는 경우에 문제가 있었습니다 가치는 그들의 목적지와 동등하지 않았습니다 Values, e.g., 소스 시간이 다른 것보다"seconds since 1970-01-01"· 이름 *Todd스핀들.
    * TableWriterGeoJson에서, 초과 ',' bbox 후\\[·\\]제거되었습니다. Greg Williams 덕분에.
    * 많은 작은 변화와 버그 수정.
    
## 버전 1.22{#version-122} 
 (출시 2009-07-05) 

* 1.20에 도입 된 SlideSorter 버그가 수정되었습니다.
* 1.20에 도입 된 OBIS 버그가 수정되었습니다.
* 이미지/gadgets/GoogleGadgets 페이지에 Jason datasets에 대한 참조가 제거되었습니다.
     
## 버전 1.20{#version-120} 
 (출시 2009-07-02) 

*   ERDDAP™관리자는 setup.xml 파일에 이것을 추가하십시오.
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* 새로운 dataset 유형[EDDGrid이름 *](/docs/server-admin/datasets#eddgridcopy)이름 *[EDDTable코피](/docs/server-admin/datasets#eddtablecopy)다른 지역의 사본을 만들고 유지EDDGrid또는 EDDTable dataset의 데이터 및 로컬 복사에서 데이터를 제공합니다. 이 사용 하 고 매우 효과적인 **원격 데이터 소스에서 서빙 데이터를 가진 가장 큰 문제의 일부에 대한 해결책:** 
    
    * 원격 데이터 소스에서 데이터 접근은 느리게 될 수 있습니다. (다양한 이유로) ·
    * 먼 dataset는 때때로 사용할 수 없습니다 (다시, 다양한 이유로) ·
    * 데이터에 대한 한 소스에 의존하지 않습니다 잘 (예, 많은 사용자와 많은 경우ERDDAPs 사용) ·
    
또한, 로컬 복사본은 원래의 백업입니다. 예를 들어, 뭔가가 원래에 발생합니다.
    
dataset의 로컬 복사본을 만드는 것에 대해 새로운 것은 없습니다. 여기에 새로운 것은이 클래스가 그것을 만드는 것입니다\\*뚱 베어\\*생성 및\\*제품정보\\*데이터의 로컬 복사\\*·\\*원격 데이터 소스 및\\*메타데이터 추가\\*데이터를 복사하는 동안.
    
이 dataset 유형은 생성을 단순화하는 기능의 완전한 세트의 일부입니다[그리드 / 클러스터 / 불꽃의ERDDAP₢ 킹](/docs/server-admin/scaling)매우 무거운 짐을 처리하는 (e.g., 데이터 센터) ·
    
* 새로운 dataset 유형[EDDTable데이터베이스](/docs/server-admin/datasets#eddtablefromdatabase)로컬 또는 원격 데이터베이스 테이블에서 데이터를 가져옵니다.
*   ERDDAP™지금 있다[계정 관리](/docs/server-admin/additional-information#security)인증시스템 (사용자 로그인) 및 인증 (특정 개인 데이터셋에 액세스 권한을 부여) ·
* 있음[두, 새로운, 명령 줄 도구](/docs/server-admin/datasets#tools)지원하다ERDDAP™관리자는 XML을 새로운 dataset에 생성합니다.datasets.xml::
    * Generate데이터셋 Xml는 거의 모든 유형의 데이터셋 XML의 거친 초안을 생성할 수 있습니다.
    * DasDds는 당신이 반복적으로 시험하고 dataset를 위한 XML를 정제하는 것을 돕습니다.ERDDAP데이터셋 Xml 웹 페이지가 제거되었습니다. 보안상의 이유로, 그들은 단지 몇 가지 데이터 세트 유형을 지원. 새로운 명령 줄 도구는 더 나은 솔루션입니다.
* 새로운[상태 페이지](/docs/server-admin/additional-information#status-page)모든 것 (하지만 notably 관리자) 상태보기ERDDAP™본문 바로가기\\[사이트맵\\]/erddap/status.html·
* Tabledap 현재 지원[서버 측 기능](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions)::
    * &distinct는 () 응답 테이블에서 중복 행을 제거,
    * ·orderBy (·) 응답 테이블이 정렬되어야하는 방법을 지정할 수 있습니다.
    * ·orderByMax (·) 응답 테이블이 정렬되고 마지막 지정된 열에서 최대 값으로 행을 제외하고 모든 행을 제거해야 하는 방법을 지정할 수 있습니다. 예를 들어, 각 역의 마지막 사용 가능한 데이터를 얻을 수 있습니다.
* Tabular datasets는 이제 추가 dateTime 변수를 포함할 수 있습니다."time"· 이 변수는 "units" metadata에 의해 인식됩니다." since "  (숫자 날짜 (주)) 또는 "yyy"또는 "YYY" (formatted String dateTimes의 경우) · 그러나 아직도 사용destinationName "time"주요 날짜 시간 변수.
*   ERDDAP™현재 생성[사이트 맵.xml](/docs/server-admin/additional-information#sitemapxml)파일, 검색 엔진을 알려줍니다.ERDDAP한 달에 crawled만 필요.ERDDAP™감사합니다.[이 지침](/docs/server-admin/additional-information#sitemapxml)새로운 sitemap.xml 파일에 대한 검색 엔진을 삭제합니다.
*   ERDDAP's 오류 메시지는 이제 훨씬 더 짧고 고객에게 기어 (프로그램) · Greg Williams 덕분에.
* [기타]&lt;요청블랙리스트&gt;] (/docs/server-admin/datasets#request블랙리스트) 이제 마지막 번호가 \\*로 대체된 IP 주소를 지원합니다.
* 문의 사항.json그리고 .geoJson 파일은 지금 옵션이 포함될 수 있습니다[뚱 베어](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)"&.jsonp=_functionName_" 쿼리의 끝에. 기본적으로, 이것은 단지 말ERDDAP™추가하려면 "_functionName_ (" 응답의 시작과 ") " 응답의 끝에. 원래 쿼리가 없었다면, "&"를 쿼리에 남기십시오. Greg Williams 덕분에.
* 새로운 통계의 Lots가 추가되었습니다.[매일 보고서](/docs/server-admin/additional-information#daily-report)·
* datasets, Institut 및 id 목록이있는 웹 페이지는 이제 오른쪽에 있습니다. 이것은 구독을 이동하고 더 유용한 열은 좁은 컴퓨터 화면에 볼.
* 모든 웹 페이지에, 페이지의 제목 (에 따라 다름)&lt;title&gt; 에&lt;startHeadHtml&gt;는 setup.xml에 정의되어 있습니다. 웹 페이지의 더 나은 설명이 포함될 수 있습니다. (예를 들어, 현재 dataset의 제목과 기관을 포함한) ·
* Xmx 정보는 log.txt, Daily Report 및 status.html에 인쇄된 메모리 정보가 포함되어 있습니다. Ellyn Montgomery 덕분에.
*   ERDDAP™모든 오류에 대한 추가 범용 보호 (예, OutOfMemoryError) · Charles Carleton 덕분에.
* 응답이 이미 투입 된 경우 오류 처리에 대한 개선.
* IMPROVED: EDDTableFromFiles와EDDGridFromFiles 이제는 허용&lt;metadataFrom&gt; 처음 또는 마지막. penultimate는 더 이상 지원되지 않습니다. 그리고 마지막으로 이제 파일에 기반을 둔 lastModifiedTime.
* 버그 수정 : EDDTable에서SOS, 1개의 역을 위한 잘못된 정보는 예외를 threw하고 거절될 전체적인 dataset를 일으키는 원인이 되었습니다. 지금, 그 역은 단지 무시됩니다 (그리고 오류 메시지는 log.txt에 로그인됩니다.) · Rick Blair 덕분에.
     

## 버전 1.18{#version-118} 
 (출시 2009-04-08) 

* 버그 수정 : 1.14에서 시작, EDDTable 데이터 액세스 양식 및 그래프 웹 페이지를 올바르게 인용하지 않은 제약.
* 버그 수정 : 1.14에서 시작, EDDTableFromDapSequence는 소스 시간 단위가 1970-01-01T00:00:00 이후 "둘째"되지 않은 경우 적시 제약을 처리하지 않았다.
     

## 버전 1.16{#version-116} 
 (출시 2009-03-26) 

*   ERDDAP™관리자:
    * 이것은 버그를 수정하기 때문에 중요한 릴리스입니다.ERDDAP™Tomcat Manager를 Stop/Start 또는 Reload에 사용하는 경우 스레드 실행ERDDAP· 1.16을 설치하면 Tomcat Manager를 사용하여 이전을 undeploy로 사용하지 마십시오.ERDDAP™그리고 새로운 배포ERDDAP· 대신: **늙은ERDDAP™, Tomcat 재시작 (또는 서버) , 다음 새로운 배포ERDDAP·** 새로운 버전을 설치할 때 항상 좋은 아이디어입니다.
    * 추가하기&lt;요청Blacklist&gt;&lt;/request블랙리스트&gt; (/docs/server-admin/datasets#request블랙리스트) 내 계정datasets.xml· 클라이언트 IP 주소 목록을 블록으로 지정할 수 있습니다. (e.g., 서비스 공격의 Denial을 차단하거나 지나치게 zealous 웹 로봇) ·
* 현재 위치\\[큰Parent감독\\]/logs 디렉토리를 잡고ERDDAP™로그 파일. 시작하기ERDDAP™, 그것은 log.txt 및 로그의 아카이브 사본을 만든다. txt.previous file with a time 스탬프. 재시작 전에 문제가 있다면, 이 파일을 분석하는 데 유용 할 수 있습니다.
*   ERD이름 *ERDDAP™이제 구독 시스템이 켜져 있습니다.
*   ERDDAP™다시 한번 허용 (아직 권장하지 않습니다.) 요청 URL에서 "%26" 인코딩 (자세히보기[관련 v1.14 변경](#percent26)) ·
* Tally 섹션에 몇 가지 새로운 추가[매일 보고서](/docs/server-admin/additional-information#daily-report)·
* generateDatasetsXml의 작은 버그 수정.
* 몇 가지 작은 버그 수정.
     

## 버전 1.14{#version-114} 
 (출시 2009-03-17) 

* 사용자의 변화:
    * 그리드 데이터 요청에서ERDDAP™현재 지원:[이름 *](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)n은 지수의 정수 수이며[ (최근 D) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)d는 숫자 값 (시간, 그것은 초에 있습니다) ·
    * tabular 데이터 요청에서 String constraints가 필요합니다.[더블 인용](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)값의 주위에, 예를 들면, &id="NDBC40121" 이것에 의해 요구됩니다DAP프로토콜.
    * 탭 데이터 요청에서,ERDDAP™현재는[모든 제약은 제대로 % 인코딩됩니다.](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode)· 브라우저가 자동으로 수행되므로 주로 컴퓨터 프로그램/script에 영향을 줍니다.ERDDAP·
#### 퍼센트26{#percent26} 
*   [이전,](#percent26)이름 *[그래픽 웹 페이지를 embed](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)그리고[ERDDAP™Google Gadget 웹 페이지](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)"%26"로 이미지의 URL에서 "&"를 대체한다고 말했다. 이제부터 "&amp;" 이미지의 URL에서 "&"를 대체해야합니다. 따라서 기존 웹 페이지 및 Google Gadget에서 "%26"를 대체해야합니다. "&amp;". (뚱 베어) 
*   ERDDAP™관리자, 제발:
    * 당신의 다음을 추가[설정.xml](/docs/server-admin/deploy-install#setupxml)파일 형식 (플래그를 변경 KeyKey 값) ::
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * 후에 선에&lt;emailUserName&gt; 사용자 이름[설정.xml](/docs/server-admin/deploy-install#setupxml)파일, 추가
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
비밀번호 입력
    * 변경할 수 있습니다.&lt;wmsSampleBBox&gt; 당신의[설정.xml](/docs/server-admin/deploy-install#setupxml)최대 360, e.g.의 경도값을 포함하는 파일,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * 내 계정datasets.xml파일, dataset 타입 EDDTableFromNc4DFiles를 EDDTableFromNcFiles로 변경 (이제는 모든 크기로 파일을 지원합니다.) · EDDTableFromNc4DFiles 데이터 세트가 있다면:
        
        1. datasets에서 type="EDDTableFromNcFiles"로 변경할 수 있습니다. XML 파일.
        2. 당신은 MUST 추가&lt;n차원 4개&lt;/nDimensions&gt; dataset의 XML 태그.
        3. 당신은 새로운 추가 할 수 있습니다&lt;sortFilesBySourceNames&gt; 태그를 사용하여 파일에 대한 내부 주문을 지정합니다. 이는 데이터의 전체 주문을 반환합니다.
        
자주 묻는 질문[EDDTable파일](/docs/server-admin/datasets#eddtablefromfiles)·
    * 과거에 EDDTableFromDapSequence의 경우OPeNDAPDRDS 서버,datasets.xml, 우리 사용&lt;sourceCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. 그러나 우리는 이제 DRDS regex 지원이보다 제한된다는 것을 볼 수 있습니다.ERDDAP's, 그래서 우리는 추천합니다&lt;소스CanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; 그래서 regex constraints는 소스에 전달되지 않습니다, 하지만 대신에 처리ERDDAP·
    * sourceCanConstrain의 개정 처리 ... 내 계정datasets.xml이름 *[연락처](/docs/server-admin/datasets#eddtablefromdapsequence)이름 * (내부적으로) 모든 EDDTable dataset 유형. 새로운 시스템은 단순하고 더 나은 다른 데이터 소스의 가변성을 반영합니다. 데이터셋에 XML을 수정해야 할 수도 있습니다.datasets.xml·
* 스스로 유용 할 몇 가지 새로운 기능이 있지만, 결합 할 때, 또한 창조를 촉진[그리드 / 클러스터 / 불꽃의ERDDAP₢ 킹](/docs/server-admin/additional-information#grids-clusters-and-federations)·
    * 새로운 dataset 유형:
        *   [EDDGrid언어: en](/docs/server-admin/datasets#eddfromerddap)이름 *[EDDTableErddap에서](/docs/server-admin/datasets#eddfromerddap)어느 한ERDDAP™dataset을 다른 곳에서 포함ERDDAP™매우 간단하고 매우 효율적인 방법으로.
        *   [EDDGrid파일 형식](/docs/server-admin/datasets#eddgridfromfiles)  (그리고 그것의 subclass,[EDDGrid파일 형식](/docs/server-admin/datasets#eddgridfromncfiles)읽을 수 있는NetCDF .nc, GRIB .grb, 및HDF .hdf파일 형식) ·
        *   [EDDTableFromNcFiles는](/docs/server-admin/datasets#eddtablefromncfiles)읽을 수 있는NetCDF .nc테이블 같은 구조가 있습니다.
    * RunLoadDatasets 및 LoadDatasets가 수정되었습니다.ERDDAP™파일에 근거를 둔 datasets를 재부팅하는 것은 아주 반응합니다[기본 정보](/docs/server-admin/additional-information#flag)디렉토리 (often&lt;메인 로드데이터셋이 현재 완료된 경우 5초.
    * 새로운 서비스[플래그 파일을 만드는 URL](/docs/server-admin/additional-information#set-dataset-flag)주어진 dataset를 위해, 예를들면,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
rPmelTao의 플래그 디렉토리에 플래그 파일을 만듭니다. (플래그는 키 여기 잘못) ·
    * (주)[이름 *](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)어떤 클라이언트가 특정한 dataset가 생성될 때 수행될 행동을 지정할 수 있다 그래야 서비스 (현재 위치ERDDAP™재시작) dataset가 어떤 방식으로 변경될 때마다. 이 시스템은 사용 가능&lt;subscriptionSystemActive&gt; 당신의[설정.xml](/docs/server-admin/deploy-install#setupxml)파일. 더 보기ERDDAP™ [매일 보고서](/docs/server-admin/additional-information#daily-report)이제 구독의 모든 목록을 나열하고 각 하나를 취소하는 데 필요한 URL을 포함, 당신이 시스템이 학대되는 경우. 내 계정datasets.xml, 새로운, 선택 [&lt;이름 * 이메일Blacklist&gt; (/docs/server-admin/datasets#subscription이메일블랙리스트) 관리자가 구독 시스템에서 즉시 블랙리스트 인 이메일 주소의 comma-separated 목록을 지정할 수 있도록 태그.
    * 새로운 [&lt;onChange&gt;에 대하여 (/docs/server-admin/datasets#onchange) 이름 *datasets.xml뚱 베어ERDDAP™Admin은 특정 dataset이 생성될 때 수행될 행동을 지정합니다. (현재 위치ERDDAP™재시작) dataset가 어떤 방식으로 변경될 때마다.
    * 전체 텍스트 검색 향상 : 각 dataset에 대한 검색 문자열을 저장 지금 사용 1/2 기억. 검색 알고리즘 (Boyer-Moore와 같은) 지금 3X 더 빠릅니다.
    * 이메일:ERDDAP™이제 항상 주제와 컨텐츠를 prepend\\[뚱 베어 뚱 베어\\], 그래서 그것은 명확할 것 이다ERDDAP™이 가 서 (여러 개의 administerERDDAP₢ 킹) ·
    * 더 광범위한 통계 수집[매일 보고서](/docs/server-admin/additional-information#daily-report)이메일.
    * 새 로그 파일\\[큰Parent감독\\]/emailLogYEAR-MM-DD.txt는 전송된 모든 이메일을 기록합니다.ERDDAP™매일. 서버가 실제로 이메일을 보낼 수없는 경우 특히 유용합니다 -- 당신은 적어도 로그에 읽을 수 있습니다.
    *   ERDDAP™이제는\\[큰Parent감독\\]/ 캐시 / (datasetID) 각 dataset에 대한 디렉토리에는 파일 캐시가 많이 있을 수 있으므로.
* (주)[RSS2.01년](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)각 dataset를 위한 급식 (오렌지 보기RSSdatasets, Data Access Forms의 목록에서 아이콘을 만들고 그래프 웹 페이지를 만드십시오.) ·
*   EDDGrid .kml응답 이제 타일 이미지를 사용 ("superoverlays"- 역동적으로 생성 된 쿼드 트리 이미지) · 초기 이미지는 이전보다 GoogleEarth만큼 빠릅니다. 맵의 해상도는 데이터셋의 전체 해상도로 확대됩니다. 자주 묻는 질문.kml1개의 시간 점을 위해, 그러나 dataset의 전체 경도, 고도 범위. 불행히도, 시간 범위를 위한 지원은 제거되었습니다 (나는 그것을 다시 올 희망) ·
*   ERDDAP™지금 추가[Expires 및 캐시 제어 최대 용량 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)/images 디렉토리에서 요청된 모든 파일에. 이것은 매우 정적 파일 요청의 번호를 줄입니다.ERDDAP그리고 이렇게 매우 속도 최대ERDDAP™페이지로드. 또한, 많은Java스크립트 파일 참조는 HTML 페이지의 하단으로 이동, 또한 많은 속도를ERDDAP™페이지로드. Steve Souders의 "High Performance Web Sites"와 FireFox의 FireBug 플러그인에 ySlow 추가.
*   ERDDAP™netcdf-java 2.2.22에서 netcdf-java 4.0로 전환했습니다. 다른 것들 중, 이것은 허용EDDGridfromNcFiles에서 읽기HDF .hdf, 뿐 아니라 GRIB .grb 및NetCDF .nc파일.
*   EDDGrid가격 및 가격EDDGridFromNcFiles는 또한 DArray를 지원합니다 (뿐만 아니라 DGrid)  dataVariable· 해당 좌표 변수가 없다면,ERDDAP™index 값으로 축 변수를 생성합니다. (예를 들어, 0, 1, 2, ..., 311, 312) · 그래서 다른 모든 측면EDDGrid같은 유지:
이름 * 그것은 여전히 그리드로 모든 데이터 세트를 제공, 각 치수의 축 변수와.
이름 * 쿼리는 여전히 축 변수에서 값을 요청할 수 있습니다.
Charles Carleton, Thomas Im, Dorian Raymer 및 기타 덕분에.
* 더 보기WMS OpenLayers이제 페이지에는 dataset의 범위보다 조금 더 큰 기본 경도가 있습니다. (정확한 범위, 그래서 작은 datasets의 맥락은 더 명백합니다) · 기본 범위는 이제 0 ~ 360 일 수도 있습니다. 많은 데이터 세트의 전체 범위를 이제 볼 수 있습니다. 이름 *Todd스핀들.
* 일부 데이터 액세스 양식에 새로운 슬라이더와 그래프 웹 페이지를 만듭니다. 그들은 단순화 (팟캐스트) 원하는 데이터의 사양과 좋은 시각적 피드백을 제공합니다.
* 새로운 옵션&lt;데이터셋&gt; 태그들datasets.xml::[활동 = false](/docs/server-admin/datasets#active)·
* 관련 기사ERD이름 *ERDDAP™coastwatch.pfel에서 변경 (여전히 프록시를 통해 작동합니다.) 해안watch.pfeg에 (이름 *) ·
* 새로운 지원[data\\_min이름 *data\\_max](/docs/server-admin/datasets#data_min-and-data_max)변수 metadata 속성.
* 부분적인 해결책[WaitThenTryAgain / 부품 결과 예외](/docs/server-admin/additional-information#waitthentryagain-exception):: 이제 데이터 소스 변경이 감지되면 실패한 일부 요청이 성공할 수 있습니다.ERDDAP™dataset을 다시로드하고 데이터를 자동으로 재복합합니다. 원래 요청의 모든 상황에.
* 버그 수정: 생성 데이터셋 Xml는 비활성화되었습니다.ERDDAP™버전 1.12. Ellyn Montgomery에게 감사하십시오.
* 오류 처리에 대한 작은 변화.
* 가능한 인종 조건으로 피 / 거래에 대한 많은 개선 (i.e., 가능한 문제의 멀티 스레드 자연에서 상승ERDDAP) 작은 발생, 잘못된 문제.
* 이제 오류 메시지가 이미지에 기록되면 이미지는 ~5-10 분 동안 캐시에서만 유지됩니다. (아니 60) · Cara Wilson에게 감사.
* 데이터가 없을 때 표준 메시지는 이제 "당신의 쿼리는 일치하는 결과를 생성하지.", 이는 더 짧은, 더 정확하고, 일치OPeNDAP서버.
*   EDDGrid더 이상 묶인 축선 가치를 허용합니다.
* .ver와 .help 요청의 작은 변화.
* 많은 작은 변화와 버그 수정.
     

## 버전 1.12{#version-112} 
 (출시일 2008-10-31) 

* EDDTable에서SOSNDBC와 다시 한 번 작동합니다.SOS새로운 NOS와 함께 작동SOS·
* EDDTableFromBMDE는 지금 요구합니다ERDDAP™관리자 지정dataVariable₢ 킹
*   EDDGrid더 이상 lat 및 lon이 균등하게 공간적이어야한다. 제품정보 Png 또는.kml· 이름 *Todd스핀들.
* 몇 가지 작은 변화.
     

## 버전 1.10{#version-110} 
 (출시 2008-10-14) 

* 데이터 변수에 대한 새로운 "colorBar" metadatadatasets.xml그래프와 맵의 기본 색상 바 설정을 정의합니다. 이름 *[더 많은 정보](/docs/server-admin/datasets#color-bar-attributes)· 이것은 매우 기본 그래프와 맵의 외관을 개선하기 때문에 중요합니다. A 그래프를 만들고 기본 그래프와지도가 이제 클라이언트가 요청한 시간 또는 지리적 범위를 변경할 때도 일관성있는 색상 막대가 있습니다. 또한,이 필요했습니다WMS·
*   ERDDAP™이제는 대부분의 그리드 데이터를 제공합니다.WMS서비스. 데이터 서버의 많은 유형에서 데이터를 얻는 것이 더 중요하기 때문에ERDDAP™다른 프로토콜을 통해 데이터를 배포할 수 있습니다. (DAP·WMS, ... 미래에 더) · 이름 *[고객 문서](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html)· 또는[비밀번호](/docs/server-admin/datasets#wms)· 또는[더 알아보기](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html)·
* 경도 값에 대한 새로운 지원 &gt;180 in.kml파일.
* 새로운 cdm\\_data\\_type: 기타.
*   ERDDAP™이제 "boolean" 소스 dataType을 지원합니다. 이름 *[더 많은 정보](/docs/server-admin/datasets#boolean-data)이것은 미래의 EDDTableFromDatabase에 유용합니다.
* 새로운 EDDTableFromBMDE는 DiGIR/BMDE 데이터 소스를 지원합니다.
* EDVGridAxis는 이제 정렬 된 값을 허용합니다. pmelOscar 데이터셋이 필요합니다.
*   ERDDAP™이제 HTTP 오류를 반환 (예를 들어, "404 for resource/page not found") 더 많은 상황에서, HTML 페이지 대신 오류 메시지.
* 변경/추가ERDDAP™문서.
* 작은 변화의 제비.
* 일부 버그 수정.
*    **기타ERDDAP™관리자는이 버전으로 업그레이드해야합니다 :** 
    * 내 계정datasets.xml, 어떤 EDDTableFrom에 대 한SOSdatasets, "observedProperty" 메타데이터를 "sourceObservedProperty"로 변경하십시오.
    * 의 규칙axisVariable또는dataVariable이름 *destinationName현재 위치[더 보기](/docs/server-admin/datasets#datavariable-addattributes)· 변수명은 유효하다는 것을 확인해야 합니다. 손으로 그들을 검사, 또는 실행ERDDAP™관리자에게 이메일을 보내는 보고서의 오류 메시지.
    * 내 계정datasets.xml, 그리드 데이터 변수를 원한다면WMS, 당신은 colorBar metadata를 추가해야합니다. 적어도 예를 들어,&lt;이름 =colorBarMinimum"타입="더블"&gt;0&lt;/에트&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
이름 *[더 많은 정보](/docs/server-admin/datasets#wms)·
    * 당신의 다음을 추가[설정.xml](/docs/server-admin/deploy-install#setupxml)파일 형식 (그러나 당신의 정보로 그것을 주문을 받아서 만드십시오) ::

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## 버전 1.08{#version-108} 
 (출시 2008-07-13) 

* 새로운 웹 서비스ERDDAP™, 생성 데이터셋 Xml, 지원ERDDAP™XML의 거친 초안을 만드는 관리자는 데이터 세트를 설명해야datasets.xml
* netcdf-java에서 opendap 서버로 볼 수 있는 griddap과 관련된 변경/버그 수정: 글로벌 메타데이터는 이제 "NC\\_GLOBAL"를 표시 (대신 "GLOBAL") ·
* 더 보기EDDGrid그리고 EDDTable Data Access Forms는 이제 URL에서 쿼리 정보를 사용합니다. 그래서 예를 들어, 사용자가 데이터 액세스 양식에 A 그래프 양식을 작성하면 제약이 제대로 전송됩니다.
*   tabledap's Make A Graph는 이제 문자열 변수에 제약을 허용한다.
* EDDTable's Make A Graph는 이제 NaN 제약을 허용합니다. Steve Hankin에게 감사.
* 버그 수정: EDDTable 저장 AsImage는 .colorbar 분과 최대 값을 제대로 인식하지 않았습니다. Steve Hankin에게 감사
* setupDatasetsXml에 대한 많은 개선. Ellyn Montgomery 덕분에.
* Griddap 요청은 이제 허용 () - 실제 축 범위 밖에서 약간의 스타일 요청. 현재 위치 () -값은 가장 가까운 실제 값에 맞습니다. Cindy Bessey에 감사
* 나는 isEvenlySpaced의 FloatArray 및 DoubleArray 테스트를 만들었습니다. 그것은 항상 불완전합니다 (시험은 각 dataset를 위해 주문을 받아서 만들어질 필요가 있기 때문에) , 그러나 그것은 더 낫습니다. Ellyn Montgomery 덕분에.
* 나는 setup.html과 setupDatasets를 이동 Xml.html erddap's /download 디렉토리 및 하드는 모든 링크에 해당합니다. 지금, 나는 변화를 만들고 설치 정보를 즉시 업데이트 할 수 있습니다.
* 많은 작은 변화. 몇 가지 작은 버그 수정.
*    **기타ERDDAP™관리자는이 버전으로 업그레이드해야합니다 :** 
    * 기타&lt;theShort 묘사 당신의 message.xml에서 Html&gt;[설정.xml](/docs/server-admin/deploy-install#setupxml)파일. 왼쪽의 중간에 나타나는 텍스트를 지정합니다.ERDDAP™홈 페이지. 또한, 추가&lt;사이트맵ERDDAP&lt;/h1&gt;에 (또는 다른 헤드 라인) 그 위에. **또는,** 이름 *&lt;theShortDescriptionHtml&gt; 새로운[설정.xml](/docs/server-admin/deploy-install#setupxml)파일 형식 (새로운 erddapContent에서.zip) 설정으로.xml.
         

## 버전 1.06{#version-106} 
 (출시 2008-06-20) 

* 새로운 지원IOOS DIF SOS데이터 소스.
* 많은 작은 변화. 몇 가지 작은 버그 수정.
     

## 버전 1.04{#version-104} 
 (출시 2008-06-10) 

* 새로운 슬라이드 Sorter 기능.
* 새로운 Google Gadgets 페이지와 예제.
* 버그 수정EDDGrid.saveAsNc는 스케일과 addOffset 변수에 대한 변수입니다.
     

## 버전 1.02{#version-102} 
 (출시 2008-05-26) 

* (주)EDDGridSideBySide는 다른 것을 허용합니다axisVariable₢ 킹\\[0 댓글\\]이름 * 가치.
* 현재와 바람의 모든 데이터셋이 합병되었습니다.EDDGridSideBySide 데이터 세트.
* 이미지 요청의 이미지는 이제 1 시간 동안 캐시됩니다.
     

## 버전 1.00{#version-100} 
 (출시 2008-05-06) 

* URL에서 그래프 웹 페이지와 그래픽 명령을 만드십시오.
* dataset를 다시로드하는 flag 파일에 대한 지원.
* 새로운 dataset 유형: EDDTableFrom4DFiles (EDDTableFromFiles의 첫 번째 하위 클래스) ·
