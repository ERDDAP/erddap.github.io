---
sidebar_position: 1
---

# 설치하기
초기 설정 방법 ERDDAP™ 서버에서

 ERDDAP™ 지원되는 서버에서 실행할 수 있습니다. Java 톰캣 (Jetty와 같은 다른 응용 서버, 그러나 우리는 그들을 지원하지 않습니다) ·
 ERDDAP™ Linux에서 테스트되었습니다. (Amazon의 AWS를 포함한) , Mac 및 Windows 컴퓨터.

*  **팟캐스트** -- 우리는 제공합니다 [ ERDDAP™ Docker 컨테이너](https://hub.docker.com/r/erddap/erddap) 
IOOS는 이제 [빠른 시작 가이드 ERDDAP™ Docker 컨테이너](https://ioos.github.io/erddap-gold-standard/index.html) ·
그것은 기준입니다 ERDDAP™ 설치, Docker 컨테이너.
Docker를 통해 Compose 우리는 SSL 및 모니터링을 설정하는 쉬운 방법을 제공, 더 읽기 [Docker 문서](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) ·
이미 Docker를 사용한다면 Docker 버전을 선호합니다.
클라우드 서비스에 실행하려면 Docker 버전을 선호합니다.
*  **아마존 320** -- 설치 방법 ERDDAP™ Amazon Web Services EC2 인스턴스에서, 이 참조 [Amazon 웹 서비스 개요](/docs/server-admin/additional-information#amazon) 처음.
*  **리눅스 및 맥** -- ERDDAP™ Linux 및 Mac 컴퓨터에서 잘 작동합니다. 아래 지침을 참조하십시오.
*  **윈도우** -- Windows는 시험을 위해 정밀합니다 ERDDAP™ 자주 묻는 질문 (아래 지침을 참조) ·
그러나 우리는 대중을 위해 그것을 사용하는 것이 좋습니다 ERDDAP™ 설치. 지원하다 ERDDAP™ Windows에는 문제가 있을지도 모릅니다:
아니, ERDDAP™ 삭제 및/또는 파일 이름을 신속하게 변경할 수 없습니다. 이것은 아마도 바이러스 백신 소프트웨어로 인해
   (예를 들어, McAfee와 Norton에서) 바이러스에 대한 파일을 검사하는 것. 이 문제로 실행하는 경우
(내 오류 메시지로 볼 수 있음) [로그.txt](/docs/server-admin/additional-information#log) 같은 파일
"Unable to delete ..."), 바이러스 백신 소프트웨어의 설정을 변경하면 부분적으로 문제를 완화 할 수 있습니다. 또는 대신 Linux 또는 Mac 서버를 사용하는 것이 좋습니다.

 **표준 ERDDAP™ Linux, Mac 및 Windows 컴퓨터의 설치 지침은 다음과 같습니다.** 

0. 어떤 의존도가 설치되어 있는지 확인하십시오. 비 Windows 기계에 (리눅스 및 맥) , 당신은 csh를 필요로 합니다.

##  Java  {#java} 

1.  [제품 정보 ERDDAP™ v2.19+, 설정 Java 21. ·](#java) 
보안상의 이유로, 그것은 항상 최신 버전을 사용하는 것이 가장 좋습니다 Java 21. ·
최신 버전을 다운로드하고 설치하십시오.
    [채택의 OpenJDK (테무린) 24시간 (사이트맵) ](https://adoptium.net/temurin/releases/?version=21) ·
설치를 확인하려면 `/javaJreBinDirectory/java -version`을 실행합니다.
`/usr/local/jdk-21.0.3+9/jre/bin/java -버전

    ERDDAP™ 일하기 Java 다른 소스에서, 하지만 우리는 Adoptium을 권장 하기 때문에 주요, 지역 사회 지원,
무료 와이파이 (맥주와 연설) 버전의 Java 21 장기 지원 제공 (몇 년 동안 무료 업그레이드 초기 출시) ·
보안상의 이유로, 업데이트하십시오 ERDDAP 's 버전의 Java 주기적으로 새로운 버전의 Java 21는 Adoptium에서 유효합니다.

    ERDDAP™ 테스트 되었으며 광범위하게 사용되었습니다. 21, 다른 버전. 다양한 이유로, 우리는 다른 버전을 지원하지 않습니다 Java ·
     
## 톰캣{#tomcat} 

2.  [설치하기](#tomcat)   [톰캣](https://tomcat.apache.org) · Tomcat은 널리 사용됩니다. Java 신청 서버,
이름 * Java 운영 체제의 네트워크 서비스 및 Java 서버 소프트웨어 like ERDDAP™ ·
그것은 무료이며 오픈 소스 소프트웨어 (제품정보) ·

다른 것을 사용할 수 있습니다. Java Application 서버 (예, Jetty) , 그러나 우리는 단지 시험 및 지원 Tomcat.

   * Tomcat을 다운로드하고 서버 또는 PC에서 해제하십시오.
보안상의 이유로 Tomcat 10의 최신 버전을 사용하는 것이 거의 항상 최고입니다. (버전 9 이하 허용되지 않습니다) 
일하기 위하여 디자인되는 Java 21명 이상 아래, Tomcat 디렉토리는 `tomcat`라고 합니다.

₢ 킹 이미 Tomcat이 다른 웹 응용 프로그램을 실행하는 경우 (특히 THREDDS) , 우리는 당신이 설치하는 것을 추천합니다 ERDDAP™ 내 계정
      [두 번째 톰캣](/docs/server-admin/additional-information#second-tomcat) , 때문에 ERDDAP™ 다른 Tomcat 설정 필요
메모리에 대한 다른 응용 프로그램을 계속하지 않아야합니다.

     * 리눅스에서, [다운로드 "Core" "tar .gz "톰캣 배포](https://tomcat.apache.org/download-10.cgi) 그리고 그것을 풀.
우리는 `/usr/local`에서 그것을 포장하는 것이 좋습니다.
     * Mac에서 Tomcat은 아마도 이미 `/Library/Tomcat`에 설치되었지만 Tomcat 10의 최신 버전으로 업데이트해야합니다.
다운로드하면, [다운로드 "Core" "tar .gz "톰캣 배포](https://tomcat.apache.org/download-10.cgi) 그리고 `/Library/Tomcat`에서 해제합니다.
     * Windows에서, 당신은 할 수 있습니다 [다운로드 "Core" "zip"Tomcat 배포](https://tomcat.apache.org/download-10.cgi) 
        (Windows 레지스트리를 가진 메시가 아니며 DOS 명령 줄에서 제어할 수 없습니다.) 그리고 적절한 디렉토리에 해제.
        (개발을 위해 "Core" "zip" 배포를 사용합니다. 우리는 `/programs` 디렉토리를 만들고 그것을 포장합니다.) 
또는 더 많은 기능을 포함하는 "Core" "64-bit Windows zip" 배포를 다운로드 할 수 있습니다.
배포가 Windows 설치자인 경우, 예를 들어, `/Program Files/apache-tomcat-10.0.23`에 Tomcat을 넣을 것입니다.
             
### 서버.xml{#serverxml} 

*  [서버.xml](#serverxml) - `tomcat/conf/server.xml` 파일에서 두 개의 변경 사항이 있습니다. <Connector> 태그
   (`&lt;Connector port="808080"`와 `&lt;Conector port="8443"``에 대해 하나) ·
   1.  ((주)) `connectionTimeout` 매개변수값을 300000으로 늘리십시오. (밀리 초, 이는 5 분) ·
   2.  ((주)) 새로운 매개 변수를 추가: `relaxedQueryChars="[] | "`. 이것은 선택적이고 약간 더 적은 안전,
하지만 사용자의 요청 URL의 매개 변수에 발생할 때 이러한 문자를 % 인코딩하는 데 필요한 것을 제거합니다.
             
### 콘텐츠.xml{#contentxml} 

* 엠에디터 플러그 인 참조:Cert.xml -- 리소스 캐시 - `tomcat/conf/context.xml`에서, ` </Context> ` tag, 리소스 태그 변경
   (또는 이미 없다면 그것을 추가) 캐시 설정 80000에 MaxSize 모수:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
이것은 catalina에 있는 수많은 경고를 피합니다. 그 모든 시작
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### 아파치 Timeout{#apache-timeout} 

* Linux 컴퓨터에서 Apache 타임아웃 설정을 변경하여 사용자 요청이 타임아웃되지 않도록
   (종종 "Proxy" 또는 "Bad Gateway" 오류로 나타납니다.) · 루트 사용자로서:
  * 아파치를 수정한다. http d.conf 파일 (일반적으로 `/etc/ http ₢ 킹 ₢ 킹) ::
    * 기존의 변경 <Timeout> ` 설정 (또는 파일의 끝에 하나를 추가) 에 3600 (지원하다) , 대신 기본 60 또는 120 초.
    * 기존의 변경 <ProxyTimeout> ` 설정 (또는 파일의 끝에 하나를 추가) 에 3600 (지원하다) , 대신 기본 60 또는 120 초.
  * 아파치 재시작: `/usr/sbin/apachectl -k 우아한 ₢ 킹 (하지만 때로는 다른 디렉토리에) ·

### 보안 보안{#security} 
         
* 보안 권고: 이름 * [이 지침](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) 보안을 높이기 위해
톰캣 설치, 특히 공공 서버.
         
* 관련 기사 ERDDAP™ Linux 및 Mac의 설치, Tomcat을 설정하는 것이 가장 좋습니다. (한국어) 사용자 `tomcat에 속하는 ₢ 킹
   (제한된 권한과 함께 별도의 사용자 [비밀번호](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) ·
따라서, 슈퍼 사용자는 사용자 `tomcat`로 동작할 수 있습니다. 이것은 사용자 `tomcat`로 서버에 로그인하는 해커에 대해 불가능합니다.
그리고 어떤 경우, `tomcat`사용자가 서버의 파일 시스템에 매우 제한적 권한을 가지고 있도록해야합니다 (read+write+execute 특권
`apache-tomcat` 디렉토리 트리와 ` <bigParentDirectory> ``와 read-only 특권은 data와 ERDDAP™ 연결하기
  * `tomcat` 사용자 계정 생성 (비밀번호) 명령을 사용하여:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * 사용자 `tomcat`로 동작할 수 있습니다. 명령을 사용하여
    ```
    sudo su - tomcat
    ```
     (이 작업을 수행 할 수있는 권한을위한 슈퍼 사용자 암호를 요청합니다.) 
    * 명령을 사용하여 사용자 tomcat로 작동 할 수 있습니다.
    ```
    exit
    ````
    * 톰캣의 나머지와 ERDDAP™ user `tomcat`로 설정 지침. 나중에 `startup.sh`와 `shutdown.sh` 스크립트를 user`tomcat로 실행합니다. ₢ 킹
그래서 Tomcat은 로그 파일에 쓰기 권한이 있습니다.
    * 톰캣을 포장한 후, `apache-tomcat` 디렉토리의 부모로부터:
      * apache-tomcat 디렉토리 트리의 소유권을 tomcat 사용자로 변경합니다.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (하지만 tomcat 디렉토리의 실제 이름을 대체) ·
      * "group"를 tomcat로 변경, 사용자 이름, 또는 Tomcat의 모든 관리자를 포함하는 작은 그룹의 이름 ERDDAP ::
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * tomcat과 그룹이 읽기, 쓰기, 실행 권한이 있는 경우:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * "other" user's permissions to read, 쓰기, 또는 실행:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
이 중요한 것은, 그것 때문에 다른 사용자를 읽기에서 아마도 민감한 정보를 in ERDDAP™ 설정 파일.

### 기억하기{#memory} 

Tomcat의 환경 변수 설정

* Linux 및 Mac에서:
파일 만들기 `tomcat/bin/setenv.sh ₢ 킹 (또는 Red Hat Enterprise Linux에서 \\[ IR 정보 \\] , `~tomcat/conf/tomcat10.conf 편집 ₢ 킹) Tomcat의 환경 변수 설정.
이 파일은 `tomcat/bin/startup.sh`와 `shutdown.sh`에 의해 사용됩니다. 파일은 다음과 같은 무언가를 포함해야합니다.
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (하지만 컴퓨터에서 디렉토리 이름을 대면) ·
   (이전에 `JRE_HOME`을 설정하면 제거할 수 있습니다.) 
Mac에서 `JAVA_HOME`을 설정할 필요가 없습니다.

* Windows에서:
Tomcat의 환경 변수를 설정하기 위해 파일 `tomcat\bin\\setenv.bat`을 만듭니다.
이 파일은 `tomcat\bin\\startup.bat`과 ``에 의해 사용됩니다. shutdown.bat ₢ 킹
파일은 다음과 같은 무언가를 포함해야합니다.
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (하지만 컴퓨터에서 디렉토리 이름을 대면) ·
로컬 테스트의 경우 "-server"를 제거하십시오.
   (이전에 `JRE_HOME`을 설정하면 제거할 수 있습니다.) 

`-Xmx`와 `-Xms` 메모리 설정이 중요하기 때문에 ERDDAP™ 더 많은 메모리와 잘 작동합니다.
항상 `-Xms`를 `-Xmx`와 같은 값으로 설정합니다.

* 32 비트 운영 체제 및 32 비트 Java ::
64 비트 Java 32 조금 보다는 매우 더 낫습니다 Java , 하지만 32 비트 Java 서버가 정말 바쁘지 않다.
서버의 더 물리적 메모리는 더 나은: 4+ GB는 진짜로 좋습니다, 2개 GB는 좋습니다, 더 적은 추천되지 않습니다.
32 조금으로 Java , 풍부한 신체 기억, Tomcat 및 Java 1500M 이상의 `-Xmx`를 설정하면 실행되지 않습니다. (몇몇 컴퓨터에 1200M) ·
서버가 메모리의 2GB 미만이면 `-Xmx`값을 줄일 수 있습니다. (에 'M'egaBytes) 컴퓨터의 물리적 기억의 1/2에.

* 64 비트 운영 체제 및 64 비트에 대 한 Java ::
64 비트 Java 64 비트 운영 체제에서만 작동합니다.
  * 이름 * Java 8, Tomcat `CATALINA_OPTS` 매개 변수에 `-d64`을 추가해야 합니다.
  * 이름 * Java 21, 당신은 64 비트를 선택 Java 다운로드 할 때 버전의 Java 표시된 "64 비트".

64 조금으로 Java , 톰캣과 Java 매우 높은 `-Xmx`와 `-Xms`설정을 사용할 수 있습니다. 더 나은 서버에서 물리적 메모리.
단순 제안으로: `-Xmx`와 `-Xms`를 설정하는 것이 좋습니다. (에 'M'egaBytes) 1/2에서 (또는 더 적은) 컴퓨터의 물리적 기억.
Tomcat이 있다면 볼 수 있습니다. Java · ERDDAP™ 실제로 64 비트 모드에서 실행하여 "비트,"를 검색하여 ERDDAP 데일리 리포트
또는 'bigParentDirectory/logs/ [로그.txt](/docs/server-admin/additional-information#log) ` 파일 (`bigParentDirectory`는 [설정.xml](#setupxml) ) ·

#### Garbage 수집{#garbage-collection} 

* 내 계정 ERDDAP™ 이름 * [로그.txt](/docs/server-admin/additional-information#log) 파일, 당신은 많은 "GC를 볼 수 있습니다 (Allocation 실패) " 메시지.
이것은 일반적으로 문제가 아닙니다. 일반적으로 작동에서 빈번한 메시지입니다 Java 단지 미성년자 쓰레기를 마친다.
에덴의 방 밖으로 ran 있기 때문에 수집 (의 영역 Java heap 용 대단히 젊은 물체) · 보통 메시지는 당신을 보여줍니다
`memoryUseBefore-&gt;memoryUseAfter`. 두 숫자가 함께 닫을 경우 쓰레기 수집이 생산되지 않았는 것을 의미합니다.
메시지는 매우 빈번하다면 문제의 징후입니다. (매 몇 초) , 생산적이지 않으며, 숫자는 크고 성장하지 않습니다,
그대는 Java 더 많은 메모리를 필요로, 무료 메모리에 struggling, 그리고 메모리를 무료로 할 수 없습니다.
이것은 스트레스가 많은 시간 동안 일어날 수 있습니다. 그러나 그것이 주장한다면, 그것은 문제의 징후입니다.
* if you see `java.lang.OutOfMemoryError`s 에 ERDDAP™ 이름 * [로그.txt](/docs/server-admin/additional-information#log) 파일,
이름 * [아웃OfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) 진단하고 문제를 해결하는 방법에 대한 팁.
         
### 제출{#permissions} 

*  [Linux 및 Mac에서 권한 변경](#permissions) `tomcat/bin/`의 모든 `*.sh` 파일로 소유자가 실행할 수 있습니다.
  ```
  chmod +x *.sh
  ```

### 이름 *{#fonts} 

*  [이미지의 글꼴:](#fonts) 우리는 강력하게 자유롭게 선호합니다. [DejaVu 폰트](https://dejavu-fonts.github.io/) 다른 것 Java 글꼴.
이 글꼴을 사용하여 강력하게 권장하지만 필요하지 않습니다.

DejaVu 글꼴을 사용하지 않는 경우, 당신은 set.xml에서 ``에 fontFamily 설정을 변경해야합니다. <fontFamily> 샌스Serif </fontFamily> ₢ 킹
모든 것 Java 관련 상품 설정하면 ` <fontFamily> ` 사용할 수없는 글꼴의 이름으로, ERDDAP™ 짐 없음
그리고 `log.txt` 파일에서 사용 가능한 글꼴 목록을 인쇄합니다. 그 폰트 중 하나를 사용해야합니다.

DejaVu 폰트를 사용하려면, ``을 확인하십시오. <fontFamily> ` setup.xml 설정은 ``입니다. <fontFamily> DejaVu 산 </fontFamily> ₢ 킹

DejaVu 글꼴을 설치하려면 다운로드하십시오. [데자비프 .zip ](/DejaVuFonts.zip)   (5,522,795 바이트, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
글꼴 파일을 임시 디렉토리에 압축합니다.

  * 리눅스에서:
    * Linux 채택 Java 배포, 참조 [이 지침](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) ·
    * 다른 것 Java 공급 능력: `tomcat` user로 글꼴 파일을 `$JAVA_HOME/lib/fonts`로 복사합니다. Java 글꼴을 찾을 수 있습니다.
기억 : 나중에 새 버전으로 업그레이드하면 Java , 당신은이 글꼴을 다시 설치해야합니다.
  * Mac에서: 각 글꼴 파일을 위해, 두 번 클릭 한 다음 설치 글꼴을 클릭합니다.
  * Windows 7 및 10 : Windows Explorer에서 모든 글꼴 파일을 선택하십시오. 자주 묻는 질문 설치를 클릭합니다.
             
### 톰캣 테스트{#test-tomcat} 

* Tomcat 설치를 테스트하십시오.
  * 리눅스:
    * 사용자 "tomcat"으로, `tomcat/bin/startup.sh`를 실행합니다.
    * 브라우저에서 URL + ":8080/" 보기 (₢ 킹 [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) ·
  * 한국어 (tomcat을 시스템 관리자 사용자로 실행) ::
    * `tomcat/bin/startup.sh`를 실행합니다.
    * 브라우저에서 URL + ":8080/" 보기 (₢ 킹 [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) ·
기본적으로 Tomcat을 사용할 수 있습니다. 그것은 공개적으로 접근 할 수 없습니다.
  * Windows 로컬 호스트:
    * 시스템 트레이에서 Tomcat 아이콘을 클릭하고 "시작 서비스"를 선택하십시오.
    * - 연혁 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , 또는 아마 [http://localhost:8080/](http://localhost:8080/) , 브라우저에서. 기본적으로 Tomcat을 사용할 수 있습니다. 그것은 공개적으로 접근 할 수 없습니다.

Tomcat "Congratulations" 페이지를 참조하십시오.

문제가 있는 경우, `tomcat/logs/catalina.out`에서 Tomcat 로그 파일을 참조하십시오.

### Tomcat 설치를 가진 Troubles?{#troubles-with-the-tomcat-installation} 

* Linux 및 Mac에서 Tomcat에 도달할 수 없는 경우 ERDDAP™   (또는 방화벽 외부에서 컴퓨터에 도달 할 수 없습니다.) ·
Tomcat이 8080 포트를 듣는 경우 테스트 할 수 있습니다. (으로 root) 서버의 명령줄에:

  ```
  netstat -tuplen | grep 8080
  ```

즉, 다음과 같은 것을 가진 1개의 선을 돌려야 합니다:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (`#`는 어떤 자리입니다.) , `java` 프로세스를 나타내는 (톰캣) "tcp" 트래픽에 대한 포트 "808080"을 듣는다.
라인이 반환되지 않은 경우, 라인이 크게 다르거나, 두 개 이상의 라인이 반환된 경우, 포트 설정에 문제가 있을 수 있습니다.

* Tomcat 로그 파일을 참조하십시오. `tomcat/logs/catalina.out`. Tomcat 문제 및 일부 ERDDAP™ 시작 문제는 거의 항상 표시된다.
이것은 당신이 첫번째 조정인 때 일반적입니다 ERDDAP™ ·

* 이름 * [톰캣](https://tomcat.apache.org/) 웹 사이트 또는 도움을위한 웹 검색, 그러나 당신이 가지고있는 문제를 알려 주시기 바랍니다 및 당신이 발견 된 솔루션.

* 더 보기 [더 많은 지원 얻기에 섹션](/docs/intro#support) ·
             
###  ERDDAP™ 이름 *{#erddap-content} 
3.   [`tomcat/content/erddap` 설정파일을 설정합니다.](#erddap-content) 
Linux, Mac 및 Windows에서 다운로드 [erddap 내용 .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
그리고 `tomcat` 디렉토리에 압축해, `tomcat/content/erddap`를 생성한다.

__Version 1.0.0, 20333 바이트, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 날짜를 정하는 크기: 2024-10-14

몇몇 이전 버전은 또한 유효합니다:

    *  [2.17의](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 바이트, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 날짜 2022-02-16) 
    *  [2.18년](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 바이트, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 날짜 2022-02-16) 
    *  [2.21의](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 바이트, MD5=1E26F62E7A06191EE6868C40B9A29362, 날짜 2022-10-09) 
    *  [2.22의](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 바이트, MD5=1E26F62E7A06191EE6868C40B9A29362, 날짜 2022-12-08) 
    *  [2.23의](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 바이트, MD5=1E26F62E7A06191EE6868C40B9A29362, 날짜 2023-02-27) 

#### 다른 디렉토리{#other-directory} 

Red Hat Enterprise Linux용 (IR 정보) 또는 다른 상황에서 Tomcat 디렉토리를 수정할 수 없거나 원하는 곳
으로 ERDDAP™ 몇몇 다른 이유로 다른 위치에 있는 내용 디렉토리 (예를 들어, Tomcat 대신 Jetty를 사용하는 경우) ·
파일 형식 .zip `을 원하는 디렉토리로 (`tomcat` 사용자만 접근) 그리고 ` erddapContentDirectory ` 시스템 속성
 (₢ 킹 erddapContentDirectory  =~tomcat/content/erddap ₢ 킹) · ERDDAP™ 이 새로운 콘텐츠 디렉토리를 찾을 수 있습니다.

### 설정.xml{#setupxml} 

*  [댓글을 읽으십시오 `tomcat/content/erddap/setup.xml ₢ 킹](#setupxml) 자주 묻는 질문 setup.xml은 모든 설정과 함께 파일입니다. ERDDAP™ 관련 기사

초기 설정의 경우, 당신은 적어도이 설정을 변경:
      * ₢ 킹 <bigParentDirectory> ₢ 킹
      * ₢ 킹 <emailEverythingTo> ₢ 킹
      * ₢ 킹 <baseUrl> ₢ 킹
      * ₢ 킹 <email...> ` 설정
      * ₢ 킹 <admin...> ` 설정
      * ₢ 킹 <baseHttpsUrl> ₢ 킹 (설정할 때 https ) 

bigParentDirectory를 만들 때, bigParentDirectory의 부모 디렉토리에서:

    * `tomcat`사용자가 `bigParentDirectory`의 소유자를 확인합니다.
      ```
      chown -R tomcat bigParentDirectory
      ```
    * "group"를 tomcat로 변경, 사용자 이름, 또는 Tomcat의 모든 관리자를 포함하는 작은 그룹의 이름 ERDDAP ::
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * tomcat과 그룹이 읽기, 쓰기, 실행 권한이 있는 경우:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * "other"사용자의 권한을 읽고, 쓰기, 또는 실행합니다. 이것은 아마도 민감한 정보를 읽는 것을 방지하는 것이 중요합니다.
내 계정 ERDDAP™ 개인 데이터셋에 대한 정보와 파일로 로그 파일 및 파일.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### 환경 변수{#environment-variables} 

시작하기 ERDDAP™ v2.13의 ERDDAP™ 관리자는 환경 변수를 지정하여 setup.xml의 값을 무시할 수 있습니다.
이름 ERDDAP _valueName` 실행하기 전에 ERDDAP™ · 예를 들어, ` ERDDAP _baseUrl`는 ``을 덮습니다. <baseUrl> ` 값.
배치 할 때 손이 될 수 있습니다. ERDDAP™ Docker와 같은 컨테이너로 설정에서 표준 설정을 넣을 수 있습니다.xml
환경 변수를 통해 특수 설정을 공급합니다. 비밀 정보를 공급하는 경우 ERDDAP™ 이 방법을 통해,
정보가 비밀에 남아 있는지 확인해야합니다. ERDDAP™ 시작 당 한 번만 환경 변수를 읽습니다.
시작의 첫 번째에서, 그래서 이것을 사용하는 방법: 환경 변수를 설정, 시작 ERDDAP ·
대기 시간 ERDDAP™ 시작하면 환경 변수를 설정하지 않습니다.

###  datasets.xml  {#datasetsxml} 

* 댓글을 읽으십시오 [ **일하기 datasets.xml 파일 형식** ](/docs/server-admin/datasets) · 나중에, 당신이 얻은 후에 ERDDAP™ 지원하다
처음으로 (일반적으로 기본 datasets로) , `tomcat/content/erddap/에서 XML을 수정합니다. datasets.xml ₢ 킹
원하는 모든 datasets를 지정하려면 ERDDAP™ 관련 기사 이것은 당신이 당신의 시간의 대량을 보낼 곳
설정하기 ERDDAP™ 그리고 나중에 유지하면서 ERDDAP™ ·

예제를 볼 수 있습니다. [ datasets.xml GitHub에서](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) ·
     
*  (이름 *) 지금 또는 (더 많은 것) erddap의 CSS 파일을 수정하려는 경우, 복사
`tomcat/content/erddap/images/erddapStart2.css`에서 `tomcat/content/erddap/images/erddap2.css`로 변경하면 변경됩니다.
`erddap2.css`로 변경하면 효력이 발생합니다. ERDDAP™ 다시 시작하고 종종 브라우저의 캐시 된 파일을 삭제하는 사용자가 필요합니다.
     
 ERDDAP™ setup.xml 또는 설정이 제대로 작동하지 않을 경우 datasets.xml 파일은 잘 만들어진 XML 파일이 아닙니다. 그래서,이 파일을 편집 한 후,
XML 텍스트를 XML 검수원과 같은 XML 검수원에 붙여진 결과가 잘 형성된 XML인지 확인하는 것이 좋습니다. [XML 유효성](https://www.xmlvalidation.com/) ·
     
### erddap 설치. 전쟁 파일{#install-the-erddapwar-file} 

4. 리눅스, Mac 및 Windows에서, __download [다운로드](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ 으로 `tomcat/webapps`:

__Version 2.28.0, 620,824,288 바이트, MD5=f948b2ba603f65a83ac67af43da9e4c2, 날짜 2025-08-29__

.war 파일은 고해상도 해안선, 경계선 및 고각 데이터를 포함하기 때문에 커다란 것입니다.

일부 이전 버전도 있습니다.

   *  [2.17의](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 바이트, MD5=5FEA912B5D42E50EAB9591F773EA848D, 날짜 2022-02-16) 
   *  [2.18년](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 바이트, MD5=461325E97E7577EC671DD50246CCFB8B, 날짜 2022-02-23) 
   *  [2.21의](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 바이트, MD5=F2CFF805893146E932E498FDDBD519B6, 날짜 2022-10-09) 
   *  [2.22의](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 바이트, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 날짜 2022-12-08) 
   *  [2.23의](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 바이트, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 날짜 2023-03-03) 
   *  [2.24의](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 바이트, MD5=970fbee172e28b0b8a07756eecbc898e, 날짜 2024-06-07) 
   *  [2.25의](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 바이트, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 날짜 2024-11-07) 
   *  [2.26의](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 바이트, MD5=99a725108b37708e5420986c16a119, 날짜 2025-03-31) 
   *  [2.27.0의](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 바이트, MD5=3b2086c659e4145ca2dff447bf4ef7, 날짜 2025-06-11) 

### 프록시 구성 (특정)  {#proxy} 

 ERDDAP™ 일반적으로 웹 서버 역 프록시 뒤에 배포되어 표준 HTTP 포트에 제공 할 수 있습니다. (80 및 443) ·
SSL/TLS 종료는 종종 웹 서버 프록시 레이어에 설치됩니다. Specifics는 각 배치의 요구에 달려 있습니다.

#### 아파치{#apache} 

1. `mod_proxy`와 `mod_proxy_를 확인합니다. http ` 로드 중:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. 기존의 수정 <VirtualHost> ` 태그 (그대는) , 또는 파일의 끝에 하나를 추가:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

이름 * ERDDAP™ `/erddap` 이외의 경로에 제공되며 `X-Forwarded-Prefix` 헤더를 설정
경로 세그먼트 _before_ `/erddap`. 이 설정은 적합 할 것 ERDDAP™ 에 의해
`/subpath/erddap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. 아파치를 재시작: `/usr/sbin/apachectl -k 우아한 ₢ 킹 (하지만 때로는 다른 디렉토리에) ·
         
#### NGINX 소개{#nginx} 

nginx config 파일에서, 이 헤더를 설정:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

이름 * ERDDAP™ `/erddap` 이외의 경로에 제공되며 `X-Forwarded-Prefix` 헤더를 설정
경로 세그먼트 _before_ `/erddap`. 이 설정은 적합 할 것 ERDDAP™ 에 의해
`/subpath/erddap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


NGINX 및 ERDDAP™ 자주 묻는 질문 https , 당신은 Tomcat server.xml의 다음 스니펫을 넣어해야합니다 <Host> ` 블록:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Tomcat 시작하기{#start-tomcat} 

*  (Tomcat Web Application Manager를 사용하는 것이 좋습니다. 완전 폐쇄 및 시작 Tomcat이 아닌 경우, 빨리 또는 나중에 PermGen 메모리 문제가있을 것입니다.) 
*  (Linux 또는 Mac OS에서 Tomcat, e.g., tomcat을 실행하는 특별한 사용자를 만들면 다음 단계를 사용자로 기억하십시오.) 
* Tomcat이 이미 실행중인 경우 Tomcat을 닫습니다. (리눅스 또는 Mac OS에서) `tomcat/bin/슈다운.sh`
또는 (Windows에서) `tomcat\bin\' 을 shutdown.bat ₢ 킹

리눅스에서 `ps -ef를 사용 | grep tomcat` 전후와 `shutdown.sh` 후 tomcat 프로세스가 중지되었는지 확인합니다.
프로세스는 종료 전에 나열되어야하며 결국 종료 후 나열되지 않습니다.
1분 또는 2분 정도 걸릴 수 있습니다. ERDDAP™ 완전히 종료합니다. 환자에게 또는 그것이 그 자체에 멈추지 않는 것처럼 보이는 경우, 사용:
'킬 -9 <processID> ₢ 킹
* Tomcat 시작하기 (리눅스 또는 Mac OS에서) `tomcat/bin/startup.sh` 또는 (Windows에서) `tomcat\bin\\startup.bat'실제 이름입 `tomcat\bin\\startup.bat니다. ₢ 킹

## 이름 * ERDDAP™ 실행?{#is-erddap-running} 

본문 바로가기http://www.YourServer.org/erddap/status.html.
 ERDDAP™ 로드된 모든 datasets 없이 시작. Datasets는 배경 실에서 적재되고 그래서 유효한 1-by-one가 됩니다.

### 문제 해결{#troubleshooting} 

* 사용자의 요청에 따라 아파치로 이동 (Linux 및 Mac OS 컴퓨터에서) , 다음 톰캣, 다음 ERDDAP™ ·
* Apache에 관해서는 (관련 오류) 아파치 로그 파일에서.
*    [이름 *](/docs/server-admin/additional-information#tomcat-logs) Tomcat에 관해서는 (관련 오류) 
Tomcat 로그 파일에서 (`tomcat/logs/catalina.out` 및 그 디렉토리에 다른 파일) ·
*    [이름 *](/docs/server-admin/additional-information#log) 무엇을 볼 수 있습니다 ERDDAP , 진단 메시지 ERDDAP ·
오류 메시지 ERDDAP , 에서 ERDDAP™ ₢ 킹 <bigParentDirectory> /logs/log.txt' 파일.
* Tomcat 시작하기 ERDDAP™ Tomcat이 요청할 때까지 ERDDAP™ · 따라서 Tomcat 로그 파일에서 볼 수 있습니다.
시작하기 ERDDAP™ 또는 그 시도와 관련된 오류 메시지가 있다면.
* 시간 : ERDDAP™ 시작, 그것은 오래된 이름을 변경 ERDDAP™ log.txt 파일 (`log아카이브 으로 <CurrentTime> 다운로드) 새로운 log.txt 파일을 만듭니다.
그래서 `log.txt` 파일이 오래된 경우, 그것은 그 기호입니다 ERDDAP™ 최근 재시작하지 않았습니다. ERDDAP™ 쓰기 로그 정보 버퍼
그리고 단지 로그 파일에 버퍼를 주기적으로 쓰고, 그러나 당신은 강제할 수 있습니다 ERDDAP™ 로그 파일에 버퍼를 쓰기
₢ 킹 /erddap/status.html ₢ 킹

### Trouble: 오래된 버전의 Java  {#trouble-old-version-of-java} 

버전의 경우 Java 너무 오래 된 ERDDAP · ERDDAP™ 실행하지 않고 Tomcat의 로그 파일에 오류 메시지를 볼 수 있습니다.

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

이 솔루션은 최신 버전으로 업데이트됩니다. Java 그리고 Tomcat이 그것을 사용하고 있는지 확인합니다.

### Trouble: 느린 시작 첫번째 시간{#trouble-slow-startup-first-time} 

Tomcat은 많은 일을하고 있습니다. ERDDAP™ 시작; notably, 그것은 'erddap.war` 파일을 풀 필요가
 (그것은 .zip 파일 형식) · 일부 서버에서, 첫 번째 시도를 볼 수 ERDDAP™ 기타 제품 (30 초?) 이 작업이 완료 될 때까지.
다른 서버에서 첫 번째 시도는 즉시 실패합니다. 그러나 30 초를 기다립니다. 다시 시도하면 성공할 것입니다. ERDDAP™ 제대로 설치되었습니다.

이것에 대한 수정이 없습니다. 이것은 Tomcat이 어떻게 작동하나요? 그러나 그것은 당신이 새로운 버전을 설치 한 후 첫 번째 시간 만 발생합니다. ERDDAP™ ·

## 종료 및 재시작{#shut-down-and-restart} 

미래에, 종료 (그리고 재시작)   ERDDAP™ , 참조 [톰캣과 재시작하는 방법 ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) ·

## 트러블?{#trouble} 

Tomcat 설치 또는 ERDDAP™ · 더 보기 [더 많은 지원 얻기에 섹션](/docs/intro#support) ·

## 새 버전의 이메일 알림 ERDDAP  {#email-notification-of-new-versions-of-erddap} 

새 버전을 할 때마다 이메일을 수신하려면 ERDDAP™ 유효한 다른 중요한 것 ERDDAP™ 공지 사항
참여할 수 있습니다. ERDDAP™ 공지사항 목록 [이름 *](https://groups.google.com/g/erddap-announce) · 이 목록은 대략 1개의 이메일을 매 3 달마다 평균합니다.

## 사용자 정의{#customize} 

*  [사용자 정의 ERDDAP™ 당신의 조직을 강조 (아니다. NOAA   ERD ) ·](#customize) 
* 모든 것 위에 나타나는 배너 변경 ERDDAP™ .html 페이지를 편집하여 ` <startBodyHtml5> '태그' datasets.xml ` 파일.
(하나가 없는 경우, 기본적으로 복사 ERDDAP™ 'tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml'의 ' 파일 형식
로그인 datasets.xml ` 그것을 편집합니다.) 예를 들면, 당신은 할 수 있었습니다:
  * 다른 이미지를 사용 (i.e., 조직의 로고) ·
  * 배경 색상 변경.
  * 변화 " ERDDAP™ "에 "_YourOrganization_'s ERDDAP™ ·
  * "Easier access to science data"를 "Easier access to _YourOrganization_'s data"로 변경하십시오.
  * "Brought to you by" 링크를 변경하여 조직 및 기금 소스에 연결하십시오.
* 본문내용 바로가기 주메뉴 바로가기 <theShortDescriptionHtml> '태그' datasets.xml ` 파일.
(하나가 없는 경우, 기본적으로 복사 ERDDAP™ 'tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml'의 ' 파일 형식
로그인 datasets.xml ` 그것을 편집합니다.) 예를 들면, 당신은 할 수 있었습니다:
  * 조직 및/또는 그룹이 무엇인지 설명합니다.
  * 이 데이터의 어떤 종류의 설명 ERDDAP™ 있습니다.
  * 브라우저 탭에 나타나는 아이콘을 변경하려면 조직의 favicon을 넣으십시오. ico 에 `tomcat/content/erddap/images/`.
이름 *https://en.wikipedia.org/wiki/Favicon.
