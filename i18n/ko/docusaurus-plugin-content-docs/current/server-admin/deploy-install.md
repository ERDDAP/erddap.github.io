---
sidebar_position: 1
---

# 설치하기
초기 설정 방법ERDDAP™서버에서


ERDDAP™지원되는 모든 서버에 실행할 수 있습니다.Java톰캣 (Jetty와 같은 다른 응용 서버, 그러나 우리는 그들을 지원하지 않습니다) ·ERDDAP™Linux에서 테스트되었습니다. (Amazon의 AWS를 포함한) , Mac 및 Windows 컴퓨터.

*    **아마존 320** -- 설치 방법ERDDAP™Amazon Web Services EC2 인스턴스에서, 이 참조[Amazon 웹 서비스 개요](/docs/server-admin/additional-information#amazon)처음.
*    **팟캐스트** -- Axiom 지금 제안[ERDDAP™Docker 컨테이너](https://hub.docker.com/u/axiom/)IOOS는 이제[빠른 시작 가이드ERDDAP™Docker 컨테이너](https://ioos.github.io/erddap-gold-standard/index.html)·
그것은 기준입니다ERDDAP™설치하지만, Axiom은 도커 컨테이너에 넣어.
이미 Docker를 사용한다면 Docker 버전을 선호합니다.
이미 Docker를 사용하지 않는 경우, 우리는 일반적으로 이것을 추천하지 않습니다.
설치를 선택한 경우ERDDAP™Docker를 통해, 우리는 임명 과정을 위한 어떤 지원을 제안하지 않습니다.
Docker는 아직 작동하지 않았습니다. 이 작업을 수행하면 의견을 보내주십시오.
*    **리눅스 및 맥** --ERDDAP™Linux 및 Mac 컴퓨터에서 잘 작동합니다. 아래 지침을 참조하십시오.
*    **윈도우** -- Windows는 시험을 위해 정밀합니다ERDDAP™자주 묻는 질문 (아래 지침을 참조) , 그러나 우리는 대중을 위해 그것을 사용하는 추천하지 않습니다ERDDAP₢ 킹 지원하다ERDDAP™Windows에서 문제가 발생할 수 있습니다.ERDDAP™삭제 및/또는 파일 이름을 신속하게 변경할 수 없습니다. 이것은 아마도 바이러스 백신 소프트웨어로 인해 (예를 들어, McAfee와 Norton에서) 바이러스에 대한 파일을 검사하는 것. 이 문제로 실행하는 경우 (오류 메시지로 볼 수 있습니다.[로그.txt](/docs/server-admin/additional-information#log)같은 파일 " 삭제할 수 없습니다 ...") 백신 소프트웨어의 설정을 변경하면 부분적으로 문제를 완화할 수 있습니다. 또는 대신 Linux 또는 Mac 서버를 사용하는 것이 좋습니다.

 **표준ERDDAP™Linux, Mac 및 Windows 컴퓨터의 설치 지침은 다음과 같습니다.** 

0. 어떤 의존도가 설치되어 있는지 확인하십시오. 비 Windows 기계에 (리눅스와 맥) , 당신은 csh를 필요로 합니다.
## Java {#java} 
1.  [제품 정보ERDDAP™v2.19+, 설정Java21. ·](#java)
보안상의 이유로, 그것은 항상 최신 버전을 사용하는 것이 가장 좋습니다Java21. ·
최신 버전을 다운로드하고 설치하십시오
    [채택의 OpenJDK (테무린) 24시간 (사이트맵) ](https://adoptium.net/temurin/releases/?version=21)· 설치를 확인하려면, "/_javaJreBinDirectory_/java -version", 예를 들어
/usr/local/jdk-21.0.3+9/jre/bin/java -버전
    
    ERDDAP™일하기Java다른 소스에서,하지만 우리는 Adoptium을 권장합니다. 그것은 주요, 커뮤니티 지원, 무료 (맥주와 연설) 버전의Java21 장기 지원 제공 (몇 년 동안 무료 업그레이드 초기 출시) · 보안상의 이유로, 업데이트하십시오ERDDAP's 버전Java주기적으로 새로운 버전의Java21는 Adoptium에서 유효합니다.
    
    ERDDAP™테스트 되었으며 광범위하게 사용되었습니다. 21, 다른 버전. 다양한 이유로, 우리는 다른 버전을 지원하지 않습니다Java·
     
## 톰캣{#tomcat} 
2.  [설치하기](#tomcat) [톰캣](https://tomcat.apache.org)·
Tomcat은 널리 사용됩니다.JavaApplication Server, 이는Java운영 체제의 네트워크 서비스 및Java서버 소프트웨어 likeERDDAP™· 그것은 무료 및 오픈 소스 소프트웨어 (제품정보) ·
    
다른 것을 사용할 수 있습니다.JavaApplication 서버 (예, Jetty) , 하지만 우리는 단지 테스트와 지원 Tomcat.
     
    
    * Tomcat을 다운로드하고 서버 또는 PC에서 해제하십시오.
보안상의 이유로 Tomcat 10의 최신 버전을 사용하는 것이 거의 항상 최고입니다. (버전 9 이하 허용되지 않습니다) 일하기 위하여 디자인되는Java21명 이상 아래, Tomcat 디렉토리는 _tomcat_로 참조됩니다.
        
공지사항 이미 Tomcat이 다른 웹 응용 프로그램을 실행하는 경우 (특히 THREDDS) , 우리는 당신이 설치하는 것을 추천합니다ERDDAP™내 계정[두 번째 톰캣](/docs/server-admin/additional-information#second-tomcat), 때문에ERDDAP™다른 Tomcat 설정을 필요로하고 메모리에 대한 다른 응용 프로그램을 계속하지 않아야합니다.
        
        * 리눅스에서,[다운로드 "Core" "tar.gz"톰캣 배포](https://tomcat.apache.org/download-10.cgi)그리고 그것을 풀. /usr/local에서 unpacking을 권장합니다.
        * Mac에서 Tomcat은 아마도 이미 /Library / Tomcat에 설치되었지만 Tomcat 10의 최신 버전으로 업데이트해야합니다.
다운로드하면,[다운로드 "Core" "tar.gz"톰캣 배포](https://tomcat.apache.org/download-10.cgi)/Library/Tomcat에서 해제하십시오.
        * Windows에서, 당신은 할 수 있습니다[다운로드 "Core" "zip"Tomcat 배포](https://tomcat.apache.org/download-10.cgi)  (Windows 레지스트리를 가진 메시가 아니며 DOS 명령 줄에서 제어할 수 없습니다.) 그리고 적절한 디렉토리에 붙여넣기. (개발을 위해 "Core" "zip" 배포를 사용합니다. 우리는 /programs 디렉토리를 만들고 그것을 포장합니다.) 또는 "Core" "64-bit Windows zip" 배포를 다운로드 할 수 있습니다. 배포가 Windows 설치자인 경우, 예를 들어, /Program Files/apache-tomcat-10.0.23 을 넣을 것입니다.
             
### 서버.xml{#serverxml} 
*   [서버.xml](#serverxml)- _tomcat_/conf/server.xml 파일에서 두 개의 변경 사항이 있습니다.&lt;connector&gt; 꼬리표 하나를 위해
```
        <Connector port="8080" 
```
그리고 하나
```
        <Conector port="8443"
```
    1.   ((주)) connectionTimeout 매개 변수 값을 증가, 아마 300000 (밀리 초)   (5 분) ·
    2.   ((주)) 새로운 매개 변수를 추가: relaxedQueryChars="\\[\\]|· 이것은 옵션이며 약간 덜 안전하지만 사용자가 사용자의 요청 URL의 매개 변수에 발생할 때이 문자를 % 인코딩 할 필요가 제거합니다.
             
### 콘텐츠.xml{#contentxml} 
* context.xml -- 자원 캐시 - 에서 _tomcat_/conf/context.xml, 오른쪽 전에&lt;/Context&gt; 태그, 리소스 태그 변경 (또는 이미 없다면 추가) 캐시 설정 80000에 MaxSize 모수:
    &lt;자원 캐싱Allowed="true" cacheMaxSize="80000" /&gt;
이것은 catalina에 있는 수많은 경고를 피합니다. 그 모든 시작
"수신\\[이름 *\\]org.apache.catalina.webresources.Cache.get 리소스 리소스를 추가할 수 없습니다.\\[/WEB-INF / 클래스 / ...]
         
### 아파치 Timeout{#apache-timeout} 
* Linux 컴퓨터에서 Apache 타임아웃 설정을 변경하여 사용자 요청이 타임아웃되지 않도록 (종종 "Proxy" 또는 "Bad Gateway" 오류로 나타납니다.) · 루트 사용자로서:
    1. 아파치 수정httpd.conf 파일 (/etc/에서 보통http₢ 킹) ::
현재 변경&lt;Timeout&gt; 설정 (또는 파일의 끝에 하나를 추가) 에 3600 (지원하다) , 대신 기본 60 또는 120 초.
현재 변경&lt;ProxyTimeout&gt; 설정 (또는 파일의 끝에 하나를 추가) 에 3600 (지원하다) , 대신 기본 60 또는 120 초.
    2. 아파치 재시작: /usr/sbin/apachectl -k 우아한 (하지만 때로는 다른 디렉토리에) ·
             
    * 보안 권고: 이름 *[이 지침](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)톰캣 설치의 보안을 증가시키기 위해, 특히 공공 서버.
         
    * 관련 기사ERDDAP™Linux 및 Mac에서 설치, Tomcat을 설정하는 것이 가장 좋습니다. (한국어) 사용자 "tomcat"에 속하는 (제한된 권한과 별도의 사용자[비밀번호](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) · 따라서, 슈퍼 사용자는 사용자 tomcat로 작동 할 수 있습니다. 이것은 사용자가 tomcat로 서버에 로그인하는 해커에 대해 불가능합니다. 그리고 어떤 경우, tomcat 사용자가 서버의 파일 시스템 (read+write+execute 특권 apache-tomcat 디렉토리 트리에 매우 제한적인 권한을 가지고 있어야한다.&lt;bigParentDirectory&gt; 그리고 데이터와 디렉토리에 대한 읽 전용 권한ERDDAP™연결하기
        * tomcat 사용자 계정을 만들 수 있습니다 (비밀번호) 명령을 사용하여
sudo useradd tomcat -s /bin/bash -p '\\* 이름 *
        * 명령을 사용하여 사용자 tomcat로 작동 할 수 있습니다.
sudo su - 고양이
             (이 작업을 수행 할 수있는 권한을위한 슈퍼 사용자 암호를 요청합니다.) 
        * 명령을 사용하여 사용자 tomcat로 작동 할 수 있습니다.
오시는길
        * 톰캣의 나머지와ERDDAP™사용자 "tomcat"로 설정 지침. 나중에, start.sh 및 Shutdown.sh 스크립트를 사용자 "tomcat"으로 실행하여 Tomcat은 로그 파일에 쓰기 권한이 있습니다.
        * apache-tomcat 디렉토리의 부모로부터 톰캣을 포장한 후:
            
            * apache-tomcat 디렉토리 트리의 소유권을 tomcat 사용자로 변경하십시오.
chown -R tomcat apache-tomcat-_10.0.23_
                 (하지만 tomcat 디렉토리의 실제 이름을 대체) ·
            * "그룹"을 tomcat로 변경, 사용자 이름, 또는 Tomcat/의 모든 관리자를 포함하는 작은 그룹의 이름ERDDAP, 예를들면
카테고리 apache-tomcat-_10.0.23_ 지시어
            * tomcat과 그룹이 읽기, 쓰기, 실행 권한, 예를 들면 변경 권한을 변경합니다.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * "other"사용자의 권한을 읽고, 쓰기, 또는 실행:
chmod -R o-rwx apache-tomcat-_10.0.23_
이 중요한 것은, 그것 때문에 다른 사용자를 읽기에서 아마도 민감한 정보를 inERDDAP™설정 파일.
            
              
### 기억하기{#memory} 
* Tomcat의 환경 변수 설정
    
Linux 및 Mac에서:
파일 만들기 _tomcat_/bin/setenv.sh (또는 Red Hat Enterprise Linux에서\\[IR 정보\\], 편집 ~tomcat/conf/tomcat10.conf) Tomcat의 환경 변수 설정. 이 파일은 _tomcat_/bin/startup.sh 및 Shutdown.sh에 의해 사용됩니다. 파일은 다음과 같이 무언가를 포함해야 한다:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (하지만 컴퓨터에서 디렉토리 이름을 대면) ·
 (이전에 JRE\\_HOME을 설정하면 제거 할 수 있습니다.)   
Mac에서 JAVA\\_HOME을 설정할 필요가 없습니다.

Windows에서:
파일 만들기 _tomcat_\\bin\\setenv.bat 을 설정 Tomcat의 환경 변수. 이 파일은 _tomcat_\bin\\startup.bat에 의해 사용됩니다.shutdown.bat· 파일은 다음과 같이 무언가를 포함해야 한다:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (하지만 컴퓨터에서 디렉토리 이름을 대면) ·
로컬 테스트의 경우 "-server"를 제거하십시오.
 (이전에 JRE\\_HOME을 설정하면 제거 할 수 있습니다.) 

-Xmx 및 -Xms 메모리 설정이 중요하기 때문에ERDDAP™더 많은 메모리와 잘 작동합니다. 항상 -Xmx와 동일한 값으로 -Xms를 설정합니다.

* 32 비트 운영 체제 및 32 비트Java::
64 비트Java32 조금 보다는 매우 더 낫습니다Java, 하지만 32 비트Java서버가 정말 바쁘지 않다. 서버에서 더 물리적 메모리가 더 나은: 4+ GB는 진짜로 좋습니다, 2 GB는 좋습니다, 더 적은 추천되지 않습니다. 32 조금으로Java, 풍부한 신체 기억, Tomcat 및Java설정하려고하면 실행되지 않습니다 -Xmx 1500M 이상 (몇몇 컴퓨터에 1200M) · 서버가 메모리의 2GB 미만이면 -Xmx 값을 감소시킵니다. (에 'M'egaBytes) 컴퓨터의 물리적 기억의 1/2에.
* 64 비트 운영 체제 및 64 비트에 대 한Java::
64 비트Java64 비트 운영 체제에서만 작동합니다.
    
    * 이름 *Java8, setenv.bat에 \\-d64를 Tomcat CATALINA\\_OPTS 매개 변수에 추가해야합니다.
    * 이름 *Java21, 당신은 64 비트를 선택Java다운로드 할 때 버전의Java표시된 "64 비트".
    
64 조금으로Java, 톰캣과Java매우 높은 -Xmx 및 -Xms 설정을 사용할 수 있습니다. 더 나은 서버에서 물리적 메모리. 단순 제안으로 : 우리는 당신이 설정하는 것을 권장합니다 -Xmx 및 -Xms (에 'M'egaBytes) 1/2에서 (또는 더 적은) 컴퓨터의 물리적 기억. Tomcat이 있다면 볼 수 있습니다.Java·ERDDAP™실제로 64 비트 모드에서 실행하여 "비트"를 검색하여ERDDAP's Daily Report 이메일 또는 _bigParentDirectory_/logs/[로그.txt](/docs/server-admin/additional-information#log)파일 형식 (_bigParentDirectory_는 지정됩니다.[설정.xml](#setupxml)) ·
#### Garbage 수집{#garbage-collection} 
* 내 계정ERDDAP™이름 *[로그.txt](/docs/server-admin/additional-information#log)파일, 당신은 많은 "GC를 볼 수 있습니다 (Allocation 실패) " 메시지.
이것은 일반적으로 문제가 아닙니다. 일반적으로 작동에서 빈번한 메시지입니다Java에덴의 방 밖으로 ran 있기 때문에 단지 미성년자 쓰레기 수집을 완료 (의 영역Javaheap 용 대단히 젊은 개체) · 보통 메시지가 표시됩니다. _memoryUseBefore_\\-&gt;_memoryUseAfter_. 두 개의 숫자가 함께 닫으면 쓰레기 수집이 생산되지 않았는 것을 의미합니다. 메시지는 매우 빈번하다면 문제의 징후입니다. (몇 초) , 생산적이지 않으며, 숫자는 크고 성장하지 않습니다, 함께 그것을 나타냅니다Java더 많은 메모리를 필요로, 무료 메모리에 struggling, 그리고 메모리를 무료로 할 수 없습니다. 이것은 스트레스가 많은 시간 동안 일어날 수 있습니다. 그러나 그것이 주장한다면, 그것은 문제의 징후입니다.
* java.lang.OutOfMemoryError가 있는 경우ERDDAP™이름 *[로그.txt](/docs/server-admin/additional-information#log)파일, 참조[아웃OfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)진단하고 문제를 해결하는 방법에 대한 팁.
         
### 제출{#permissions} 
*   [Linux 및 Mac에서 권한 변경](#permissions)모든 것\\*.sh_tomcat_/bin/의 파일은 소유자, 예를 들면,
```
    chmod +x \\*.sh  
```
### 이름 *{#fonts} 
*   [이미지의 글꼴:](#fonts)우리는 강하게 자유롭게 선호합니다[DejaVu 폰트](https://dejavu-fonts.github.io/)다른 것Java글꼴. 이 글꼴을 사용하여 강력하게 권장하지만 필요하지 않습니다.
    
DejaVu 글꼴을 사용하지 않는 경우, 당신은 setup.xml의 fontFamily 설정을 변경해야합니다&lt;fontFamily&gt;샌스Serif&lt;/fontFamily&gt; 모든 것을 사용할 수 있는Java관련 상품 fontFamily를 사용할 수 없는 글꼴의 이름으로 설정하면ERDDAP™로드하지 않고 log.txt 파일에서 사용할 수 있는 글꼴 목록을 인쇄합니다. 그 폰트 중 하나를 사용해야합니다.
    
DejaVu 글꼴을 사용하려면 setup.xml의 fontFamily 설정을 확인하십시오.&lt;제품정보 Family&gt;DejaVu 산&lt;/fontFamily&gt;..
    
DejaVu 글꼴을 설치하려면 다운로드하십시오.[디자비프.zip](/DejaVuFonts.zip)  (5,522,795 바이트, MD5=33E1E61FAB06A547851ED308B4FFEF42) 글꼴 파일을 임시 디렉토리에 압축합니다.
    
    * 리눅스에서:
        * Linux 채택Java배포, 참조[이 지침](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/)·
        * 다른 것Java공급 능력: Tomcat 사용자로서 글꼴 파일을 _JAVA\\_HOME_/lib/fonts로 복사합니다.Java글꼴을 찾을 수 있습니다. 기억 : 나중에 새 버전으로 업그레이드하면Java, 당신은이 글꼴을 다시 설치해야합니다.
    * Mac에서: 각 글꼴 파일을 위해, 두 번 클릭 한 다음 설치 글꼴을 클릭합니다.
    * Windows 7 및 10 : Windows Explorer에서 모든 글꼴 파일을 선택하십시오. 자주 묻는 질문 설치를 클릭합니다.
             
### 톰캣 테스트{#test-tomcat} 
* Tomcat 설치를 테스트하십시오.
    * 리눅스:
        * 사용자 "tomcat", 실행 _tomcat_/bin/startup.sh
        * 브라우저에서 URL + ":8080/" 보기 (₢ 킹[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) ·
        * Tomcat "Congratulations" 페이지를 참조하십시오.
문제가 있다면 Tomcat 로그 파일을 참조하십시오 _tomcat_/logs/catalina.out.
    * 한국어 (tomcat을 시스템 관리자 사용자로 실행) ::
        * 실행 _tomcat_/bin/startup.sh
        * 브라우저에서 URL + ":8080/" 보기 (₢ 킹[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) · 기본적으로 Tomcat을 사용할 수 있습니다. 그것은 공개적으로 접근 할 수 없습니다.
        * Tomcat "Congratulations" 페이지를 참조하십시오.
문제가 있다면 Tomcat 로그 파일을 참조하십시오 _tomcat_/logs/catalina.out.
    * Windows 로컬 호스트:
        
        * 시스템 트레이에서 Tomcat 아이콘을 마우스 오른쪽 클릭하고 "Start service"를 선택하십시오.
        * (주)[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), 또는 아마[ http://localhost:8080/ ](http://localhost:8080/), 브라우저에서. 기본적으로 Tomcat을 사용할 수 있습니다. 그것은 공개적으로 접근 할 수 없습니다.
        * Tomcat "Congratulations" 페이지를 참조하십시오.
문제가 있다면 Tomcat 로그 파일을 참조하십시오 _tomcat_/logs/catalina.out.
            
### Tomcat 설치를 가진 Troubles?{#troubles-with-the-tomcat-installation} 
* Linux 및 Mac에서 Tomcat에 도달할 수 없는 경우ERDDAP™  (또는 아마도 방화벽 외부 컴퓨터에서 그들을 도달할 수 없습니다.) , Tomcat이 8080 포트를 듣는 경우 테스트 할 수 있습니다. (으로 root) 서버의 명령줄에:
```  
    netstat -tuplen | grep 8080  
```
즉, 다음과 같은 것을 가진 1개의 선을 돌려야 합니다:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (여기서 '#'는 몇 자리입니다.) , "java"공정을 나타내는 (톰캣) "tcp" 트래픽에 대한 포트 "808080"을 듣는다. 라인이 반환되지 않은 경우, 라인이 크게 다르거나, 두 개 이상의 라인이 반환된 경우, 포트 설정에 문제가 있을 수 있습니다.
* Tomcat 로그 파일을 참조하십시오 _tomcat_/logs/catalina.out. Tomcat 문제 및 일부ERDDAP™시작 문제는 거의 항상 표시된다. 이것은 당신이 첫번째 조정인 때 일반적입니다ERDDAP™·
* 이름 *[톰캣](https://tomcat.apache.org/)웹 사이트 또는 도움을위한 웹을 검색, 그러나 우리가 당신이 가지고있는 문제를 알고 당신이 발견 한 솔루션.
* 더 보기[더 많은 지원 얻기에 섹션](/docs/intro#support)·
             
### ERDDAP™이름 *{#erddap-content} 
3.  [설정하기_tomcat_/content/erddap구성 파일.](#erddap-content)  
Linux, Mac 및 Windows에서 다운로드[erddap 내용.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (버전 1.0.0, 20333 바이트, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 날짜 2024-10-14) 그리고 unzip it into _tomcat_, 만들기_tomcat_/content/erddap·

    \\[몇몇 이전 버전은 또한 유효합니다:
    [2.17의](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 바이트, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 날짜 2022-02-16)   
    [2.18년](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 바이트, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 날짜 2022-02-16)   
    [2.21의](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 바이트, MD5=1E26F62E7A06191EE6868C40B9A29362, 날짜 2022-10-09)   
    [2.22의](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 바이트, MD5=1E26F62E7A06191EE6868C40B9A29362, 날짜 2022-12-08) 
    [2.23의](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 바이트, MD5=1E26F62E7A06191EE6868C40B9A29362, 날짜 2023-02-27) 
그리고 unzip it into _tomcat_, 만들기_tomcat_/content/erddap·\\]
    
#### 다른 디렉토리{#other-directory} 
Red Hat Enterprise Linux용 (IR 정보) 또는 다른 상황에서 Tomcat 디렉토리를 수정할 수 없거나 원하는 곳을 입력하여ERDDAP™몇몇 다른 이유를 위한 몇몇 다른 위치에 있는 content directory (예를 들어, Tomcat 대신 Jetty를 사용하는 경우) , 압축 erddapContent.zip원하는 디렉토리에 (user=tomcat만 접근) 그리고 설정erddapContentDirectory시스템 재산 (₢ 킹erddapContentDirectory=~tomcat/content/erddap) ·ERDDAP™이 새로운 콘텐츠 디렉토리를 찾을 수 있습니다.
    
### 설정.xml{#setupxml} 
*   [댓글을 읽으십시오_tomcat_/content/erddap/ 한국어 **설정.xml** ](#setupxml)자주 묻는 질문 setup.xml은 모든 설정으로 파일입니다.ERDDAP™관련 기사
초기 설정의 경우, 당신은 적어도이 설정을 변경:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
bigParentDirectory를 만들 때, bigParentDirectory의 부모 디렉토리에서:
    
    * user=tomcat을 bigParentDirectory, 예를 들어,
```
        chown -R tomcat _bigParentDirectory_
```
    * "그룹"을 tomcat로 변경, 사용자 이름, 또는 Tomcat/의 모든 관리자를 포함하는 작은 그룹의 이름ERDDAP, 예를들면
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * tomcat과 그룹이 읽기, 쓰기, 실행 권한, 예를 들면 변경 권한을 변경합니다.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * "other"사용자의 권한을 읽고, 쓰기, 또는 실행합니다. 이것은 아마도 민감한 정보를 읽는 것을 방지하는 것이 중요합니다.ERDDAP™개인 데이터셋에 대한 정보와 파일로 로그 파일 및 파일.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### 환경 변수{#environment-variables} 
시작하기ERDDAP™v2.13의ERDDAP™관리자는 setup.xml의 값을 무시할 수 있습니다.ERDDAP\\__valueName_ 실행하기 전에ERDDAP™· 예를 들어, 사용ERDDAP\\_baseUrl은&lt;baseUrl&gt; 가치. 배치 할 때 손이 될 수 있습니다.ERDDAP™Docker와 같은 컨테이너로, setup.xml의 표준 설정을 넣을 수 있으며 환경 변수를 통해 특수 설정을 공급합니다. 비밀 정보를 공급하는 경우ERDDAP™이 방법을 통해 정보는 비밀을 유지해야합니다.ERDDAP™시작 당 한 번만 환경 변수를 읽고, 처음 두 번째 시작에서, 그래서 이것을 사용하는 한 가지 방법: 환경 변수를 설정, 시작ERDDAP, 때까지 기다립니다ERDDAP™시작하면 환경 변수를 설정할 수 없습니다.
    
### datasets.xml {#datasetsxml} 
* 댓글을 읽으십시오[ **일하기datasets.xml파일 형식** ](/docs/server-admin/datasets)· 그 후,ERDDAP™처음으로 실행 (일반적으로 기본 datasets로) XML을 수정합니다._tomcat_/content/erddap/ 한국어 **datasets.xml** 원하는 모든 datasets를 지정하려면ERDDAP™관련 기사 이것은 당신이 당신의 시간의 대량을 보내고 있는 곳에 입니다ERDDAP™그리고 나중에 유지하면서ERDDAP™·

예제를 볼 수 있습니다.[datasets.xmlGitHub에서](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)·
     
*    (이름 *) 지금 또는 (더 많은 것) erddap의 CSS 파일을 수정하려는 경우, 복사본을_tomcat_/content/erddap/images/erddapStart2.css는 erddap2.css를 호출하고 그로 변경합니다. erddap2.css로 변경하면 효력이 발생합니다.ERDDAP™다시 시작하고 자주 브라우저의 캐시 된 파일을 삭제하는 사용자가 필요합니다.
     
ERDDAP™setup.xml 또는 설정이 제대로 작동하지 않을 경우datasets.xml파일은 잘 만들어진 XML 파일이 아닙니다. 그래서,이 파일을 편집 한 후, 그 결과가 XML 텍스트를 XML 검사기와 같은 XML 검사기로 붙여 넣기하여 XML의 결과를 확인할 수있는 좋은 아이디어입니다.[XML 유효성](https://www.xmlvalidation.com/)·
     
### erddap.war 파일을 설치{#install-the-erddapwar-file} 
4. Linux, Mac 및 Windows에서 다운로드[다운로드](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)으로 _tomcat_/webapps .
     (버전 2.25_1, 592,292,039 바이트, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 날짜 2024-11-07) 
    
.war 파일은 고해상도 해안선, 경계선 및 지도를 생성하는 데 필요한 고도 데이터가 포함되어 있기 때문에 큰 파일입니다.
    
    \\[일부 이전 버전도 있습니다.
    [2.17의](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 바이트, MD5=5FEA912B5D42E50EAB9591F773EA848D, 날짜 2022-02-16)   
    [2.18년](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 바이트, MD5=461325E97E7577EC671DD50246CCFB8B, 날짜 2022-02-23)   
    [2.21의](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 바이트, MD5=F2CFF805893146E932E498FDDBD519B6, 날짜 2022-10-09)   
    [2.22의](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 바이트, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 날짜 2022-12-08) 
    [2.23의](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 바이트, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 날짜 2023-03-03) 
    [2.24의](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 바이트, MD5=970fbee172e28b0b8a07756eecbc898e, 날짜 2024-06-07) 
    \\]
    
#### 프록시Pass{#proxypass} 
5. Proxy 사용 그래서 사용자가 포트 번호, 예를 들어, : 8080, URL에 넣을 필요가 없습니다.
Linux 컴퓨터에서 Tomcat이 Apache에서 실행되는 경우, Apache를 수정하십시오.httpd.conf 파일 (/etc/에서 보통http₢ 킹) HTTP 트래픽을 /에서 허용ERDDAP™포트 번호가 필요하지 않고, 예를 들어, :8080, URL. 루트 사용자로서:
    1. 현재 수정&lt;VirtualHost&gt; 태그 (그대는) , 또는 파일의 끝에 하나를 추가:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. 그런 다음 아파치를 다시 시작: /usr/sbin/apachectl -k 우아한 (하지만 때로는 다른 디렉토리에) ·
         
### NGINX 소개{#nginx} 
 (·NCO(주)엠몬) 이용안내[NGINX 소개](https://www.nginx.com/)  (웹 서버 및 로드밸런서) ::
NGINX 및ERDDAP™자주 묻는 질문https, 당신은 Tomcat server.xml의 다음 스니펫을 넣어해야합니다&lt;Host&gt; 블록:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
그리고 nginx config 파일에서, 당신은이 헤더를 설정해야:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Kyle Wilcox 덕분에.)   
     
### Tomcat 시작하기{#start-tomcat} 
*    (Tomcat Web Application Manager를 사용하는 것이 좋습니다. 완전 폐쇄 및 시작 Tomcat이 아닌 경우, 빨리 또는 나중에 PermGen 메모리 문제가있을 것입니다.)   
     
*    (Linux 또는 Mac OS에서 Tomcat, e.g., tomcat을 실행하는 특별한 사용자를 만든 경우 다음 단계를 사용자로 기억하십시오.)   
     
* Tomcat이 이미 실행중인 경우 Tomcat을 닫습니다. (Linux 또는 Mac OS에서) _tomcat_/빈/슈트다운.sh
또는 (Windows에서) _tomcat_\bin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\shutdown.bat
    
리눅스에서 ps -ef를 사용|grep tomcat 전에 and after Shutdown.sh to make sure the tomcat process has stop. 프로세스는 종료 전에 나열되어야하며 결국 종료 후 나열되지 않습니다. 1분 또는 2분 정도 걸릴 수 있습니다.ERDDAP™완전히 종료합니다. 환자에게 또는 그것이 스스로 멈추지 않는 것처럼 보이는 경우, 사용:
kill -9 _프로덕트_
    
* Tomcat 시작하기 (Linux 또는 Mac OS에서) _tomcat_/빈/스타트업.sh
또는 (Windows에서) _tomcat_\bin\\스타트업.bat

## 이름 *ERDDAP™실행?{#is-erddap-running} 
본문 바로가기 http://_www.YourServer.org_/erddap/status.html   
ERDDAP™로드된 모든 datasets 없이 시작. Datasets는 배경 실에서 적재되고 그래서 유효한 1-by-one가 됩니다.

### 문제 해결{#troubleshooting} 
* 사용자의 요청에 따라 아파치로 이동 (Linux 및 Mac OS 컴퓨터에서) , 다음 톰캣, 다음ERDDAP™·
* Apache에 관해서는 (관련 오류) 아파치 로그 파일에서.
*   [이름 *](/docs/server-admin/additional-information#tomcat-logs)Tomcat에 관해서는 (관련 오류) Tomcat 로그 파일에서 (_tomcat_/logs/catalina.out 및 그 디렉토리에 다른 파일) ·
*   [이름 *](/docs/server-admin/additional-information#log)무엇을 볼 수 있습니다ERDDAP, 진단 메시지ERDDAP, 오류 메시지ERDDAP, 에서ERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt 파일.
* Tomcat 시작하기ERDDAP™Tomcat이 요청할 때까지ERDDAP™· 그래서 시작하면 Tomcat 로그 파일에서 볼 수 있습니다.ERDDAP™또는 그 시도와 관련된 오류 메시지가 있다면.
* 시간 :ERDDAP™시작, 그것은 오래된 이름을 변경ERDDAP™log.txt 파일 (로그아카이브At_CurrentTime_.txt) 새로운 log.txt 파일을 만듭니다. 로그가 있다면. txt 파일은 오래된, 그것은 그 기호입니다ERDDAP™최근 재시작하지 않았습니다.ERDDAP™버퍼에 대한 로그 정보를 작성하고 로그 파일 주기적으로 버퍼를 작성하지만 강제 할 수 있습니다.ERDDAP™로그 파일에 버퍼를 작성하려면 .../erddap/status.html·

### Trouble: 오래된 버전의Java {#trouble-old-version-of-java} 
버전의 경우Java너무 오래 된ERDDAP·ERDDAP™실행되지 않고 Tomcat의 로그 파일에서 오류 메시지를 볼 수 있습니다.
스레드 "main" java.lang.UnsupportedClassVersionError의 예외 :
_some/class/name_: 지원되는 major.minor version _someNumber_
이 솔루션은 최신 버전으로 업데이트됩니다.JavaTomcat이 그것을 사용하고 있는지 확인하십시오.

### Trouble: 느린 시작 첫번째 시간{#trouble-slow-startup-first-time} 
Tomcat은 많은 작업을 수행 할 수 있습니다.ERDDAP™시작; notably, 그것은 erddap을 풀 필요가있다. 전쟁 파일 (그것은.zip파일 형식) · 일부 서버에서, 첫 번째 시도를 볼 수ERDDAP™기타 제품 (30 초?) 이 작업이 완료 될 때까지. 다른 서버에서 첫 번째 시도는 즉시 실패합니다. 그러나 30 초를 기다립니다. 다시 시도하면 성공할 것입니다.ERDDAP™제대로 설치되었습니다.
이것에 대한 수정이 없습니다. 이것은 Tomcat이 어떻게 작동하나요? 그러나 새로운 버전을 설치 한 후 첫 번째 시간 만 발생합니다.ERDDAP™·

## 종료 및 재시작{#shut-down-and-restart} 
미래에, 종료 (그리고 재시작)  ERDDAP, 참조[톰캣과 멈춰가는 방법ERDDAP](/docs/server-admin/additional-information#shut-down-and-restart)·
## 트러블?{#trouble} 
Tomcat 설치 또는ERDDAP· 더 보기[더 많은 지원 얻기에 섹션](/docs/intro#support)·
## 새 버전의 이메일 알림ERDDAP {#email-notification-of-new-versions-of-erddap} 
새 버전을 할 때마다 이메일을 수신하려면ERDDAP™사용 가능 또는 기타 중요ERDDAP™공지 사항, 참여할 수 있습니다ERDDAP™공지사항 목록[이름 *](https://groups.google.com/g/erddap-announce)· 이 목록은 대략 1개의 이메일을 매 3 달마다 평균합니다.
## 사용자 정의{#customize} 
[사용자 정의ERDDAP™당신의 조직을 강조 (아니다.NOAA ERD) ·](#customize)
    * 모든 것 위에 나타나는 배너 변경ERDDAP™.html 페이지 편집&lt;startBodyHtml5&gt; 당신의 꼬리표datasets.xml파일. (하나가 없는 경우, 기본적으로 복사ERDDAP이름 *
        \\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일datasets.xml그리고 그것을 편집합니다.) 예를 들면, 당신은 할 수 있었습니다:
        * 다른 이미지를 사용 (i.e., 조직의 로고) ·
        * 배경 색상 변경.
        * 변화 "ERDDAP"에 "_YourOrganization_'sERDDAP·
        * "Easier access to science data"를 "Easier access to _YourOrganization_'s data"로 변경하십시오.
        * "Brought to you by" 링크를 변경하여 조직 및 기금 소스에 연결하십시오.
    * 홈 페이지의 왼쪽에 정보를 변경하여 편집&lt;theShortDescriptionHtml&gt; 당신의 태그datasets.xml파일. (하나가 없는 경우, 기본적으로 복사ERDDAP이름 *
        \\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일datasets.xml그리고 그것을 편집합니다.) 예를 들면, 당신은 할 수 있었습니다:
        * 조직 및/또는 그룹이 무엇인지 설명합니다.
        * 이 데이터의 어떤 종류의 설명ERDDAP™이름 *
    * 브라우저 탭에 나타나는 아이콘을 변경하려면 조직의 favicon을 넣으십시오. ico에_tomcat_/content/erddap/이미지 / . 이름 *[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon)·
