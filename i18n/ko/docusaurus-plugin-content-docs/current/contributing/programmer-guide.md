---
sidebar_position: 2
---

# 프로그래머의 가이드

이런 것들은 프로그래머가 함께 일하는 것 ERDDAP 이름 * Java 수업은 알아야 합니다.

###  **소스 코드 받기**  {#getting-the-source-code} 
   

  - GitHub의 소스 코드
최근 공개 버전 및 개발 버전의 소스 코드도 사용할 수 있습니다 [프로젝트](https://github.com/ERDDAP) · 자주 묻는 질문 [다운로드](https://github.com/ERDDAP/erddap/wiki) 그 프로젝트 소스 코드를 수정하려면 (그리고 아마도 표준에 통합 된 변경이 있습니다. ERDDAP™ 제품정보) , 이것은 권장된 접근법입니다.

###  ** ERDDAP™ 관련 제품**  {#erddap-dependencies} 
 ERDDAP™ Maven을 사용하여 코드 의존도 및 일부 정적 참조 파일로드 (웹 INF/ref) · 저장소에 많은 큰 파일을 저장하기 위해 수행됩니다.
사용 가능 `mvn 컴파일` 그리고 그것은 의존성 및 ref 파일을 fetch한다. 당신은 또한 사용할 수 있습니다 `mvn 패키지` 전쟁 파일을 생성합니다.
파일을 수동으로 다운로드 할 수 있습니다 :

  -  [etopo1\\_ice\\_g\\_i2 을 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) 그리고 /WEB-INF/ref/로 압축.

  -  [ref\\_파일 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) 그리고 /WEB-INF/ref/로 압축.

  -  [erddap 내용 .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (버전 1.0.0, 20333 바이트, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 날짜 2024-10-14) 그리고 unzip it into _tomcat_, 만들기 _tomcat_/content/erddap ·

참고 : 기본 Maven은 정적 참조 및 테스트 데이터 아카이브 다운로드를 캐시하고 새로운 버전이 다운로드 될 때만 추출합니다. 다운로드를 건너뛰기 위해, 당신은 설정할 수 있습니다 `다운로드` 및/또는 `다운로드` Maven의 재산 (₢ 킹 `mvn -DskipResource다운로드 패키지` ) · 힘 적출에, 세트 `- 다운로드.unpack=true` 이름 * `-Ddownload.unpackWhenChanged=false의 경우` ·

-  ERDDAP™ 그리고 그것의 subcomponents에는 아주 자유롭고, 오픈 소스가 있습니다 [이름 *](/license) , 그래서 당신은 사용 하 고 어떤 목적, 비영리 또는 비영리에 대 한 소스 코드를 수정할 수 있습니다. 이름 * ERDDAP™ 그리고 많은 하위 구성 요소는 사용중인 코드의 소스를 인정하는 데 필요한 라이센스가 있습니다. 이름 * [계정 만들기](/credits) · 필수 또는 아닙니다. 이 기여자의 모든 것을 인정하는 것이 좋습니다.
  

-  **다른 프로젝트에 대한 코드 사용** 

당신이 사용할 수 있는 동안의 부품 ERDDAP™ 다른 프로젝트에 대한 코드는 코드가 변경 될 수 있음을 경고해야합니다. 우리는 우리의 코드의 다른 사용을 지원할 것을 약속하지 않습니다. Git 및 GitHub는 이러한 처리를위한 주요 솔루션이 될 것입니다 -- Git은 변경 사항에 우리의 변화를 합병 할 수 있습니다.
   **당신이의 부분을 사용하도록 유혹 될 수있는 많은 상황에서 ERDDAP™ 당신의 프로젝트에서, 우리는 당신이 설치하고 사용하게 매우 쉽게 찾을 것이라고 생각합니다 ERDDAP™ 으로** 그런 다음 다른 서비스를 쓸 ERDDAP '서비스' 당신은 당신의 자신을 설정할 수 있습니다 ERDDAP™ 설치 1 시간 또는 2에 crudely. 당신은 당신의 자신을 설정할 수 있습니다 ERDDAP™ 몇 일 안에 닦은 방법에 있는 임명 (데이터셋의 수와 복잡성에 따라) · 그러나의 부분을 해킹 ERDDAP™ 당신의 자신의 프로젝트는 주 걸릴 가능성이 (미묘함을 잡는 달) 그리고 당신은 변화와 버그 수정을 통합 할 수있는 능력을 잃게됩니다. ERDDAP™ 다운로드 제품정보 (옵션 정보) 많은 이점이 있습니다. ERDDAP™ 그리고 너의 것 ERDDAP™ 자주 묻는 질문 그러나, 일부 상황에서, 당신은 당신의 만들 필요가 없습니다 ERDDAP™ 자주 묻는 질문 그런 다음, 귀하의 서비스는 귀하의 개인에 액세스하고 사용할 수 있습니다. ERDDAP™ 고객 Needn't know ERDDAP™ ·

  ####  **반도** 

또는, 당신이 delving 사이 반도가 유용 할 수있는 또 다른 접근법이 있습니다 ERDDAP 비밀번호 ERDDAP™ 독립 웹 서비스로: EDD 클래스에서는 dataset의 인스턴스를 만들 수있는 정적 방법이 있습니다. (규격에 따라 datasets.xml ) ::
`oneFromDataset' 지시어 사이트맵 (문자열 tDatasetID) 
`EDDTable의 인스턴스를 반환하거나 EDDGrid 데이터셋. 그 인스턴스를 호출 할 수 있음
'makeNewFileForDapQuery'의 정의 (String userDapQuery, String dir, String fileName, String 파일 유형 이름) 
`to tell the example to make a data file, of specific fileType, 사용자 쿼리의 결과와. 따라서, 이것은 사용하기 쉬운 방법입니다 ERDDAP 's data를 요청하고 응답에 파일을 얻을 수있는 방법, 클라이언트로 ERDDAP™ 웹 신청. 그러나이 접근법은 당신의 안에서 작동합니다. Java 프로그램 및 Tomcat과 같은 애플리케이션 서버를 우회합니다. 우리는 EDDTable의 단위 테스트의 많은에 대한이 접근 방식을 사용합니다. EDDGrid subclasses, 그래서 당신은 그 클래스의 모든 소스 코드에서이 예제를 볼 수 있습니다.

###  **개발 환경**  {#development-environment} 

  - 구성이 있습니다. [기타 제품](https://github.com/ERDDAP/erddap/blob/main/development/jetty) 이름 * [팟캐스트](https://github.com/ERDDAP/erddap/blob/main/development/docker) GitHub에서 릴리스가 Tomcat에서 실행될 것으로 예상됩니다.

  -  **옵션 정보** :: 설치하기 ERDDAP™ 톰캣
이름 * ERDDAP™ 주로 Tomcat에서 servlet이 될 예정이며, 표준을 따르는 것이 좋습니다. [설치 설명서](/docs/server-admin/deploy-install) Tomcat을 설치하고 설치 ERDDAP™ Tomcat의 webapps 디렉토리. 다른 것들 중, ERDDAP™ Tomcat의 디렉토리 구조에 설치되고 Tomcat이 .jar 파일을 제공하기 위해 기대합니다.

  -  ERDDAP™ 특정 IDE가 필요하지 않습니다. (Chris는 주로 Visual Studio Code를 사용, Bob은 EditPlus를 사용) · 우리는 Eclipse, Ant, 등을 사용하지 않습니다. 또는 우리가 제공하는 것 ERDDAP -관련 지원 프로젝트는 Maven을 사용합니다.

  - 우리는 소스 트리의 .class 파일을 모두 삭제하는 일괄 파일을 사용하여 깨끗한 컴파일을 보장합니다. (javac와 함께) ·

  - 현재 Adoptium의 javac jdk-21.0.3+9를 사용하여 gov.noaa.pfeg.coastwatch.TestAll를 컴파일합니다. (컴파일되지 않을 몇 가지 클래스에 대한 링크가 있습니다.) 테스트 실행. 보안상의 이유로, 그것은 항상 최신 버전을 사용하는 것이 가장 좋습니다 Java 21 및 톰캣 10.

    - javac 또는 java를 실행할 때, 현재 디렉토리는 _tomcat_/webapps/erddap/WEB-INF입니다.

    - 우리의 javac 및 java classpath는
       `클래스;.././../lib/servlet-api.jar;lib/*` 

    - 그래서 javac 명령 줄은 다음과 같습니다.
       `javac - 인코딩 UTF-8 -cp 클래스;../../lib/servlet-api.jar;lib/* 클래스/gov/noaa/pfel/coastwatch/TestAll.java` 

    - 그리고 java 명령 줄은 다음과 같은 것입니다.
`java -cp 클래스;./.././lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M 수업/gov/noaa/pfel/coastwatch/테스트 모두
       `선택 사항: 추가할 수 있습니다` -verbose:gc`, 이는 말한다 Java 쓰레기 수집 통계를 인쇄합니다.

    - 테스트 모든 컴파일, 모든 ERDDAP™ 컴파일 된 필요. 몇 가지 클래스가 컴파일되어 있지 않다. ERDDAP™ · TestAll가 성공하지만 일부 클래스를 컴파일하지 않으면 클래스가 필요하지 않습니다. (일부 unfinished/unused 클래스가 있습니다.) 

  - 몇몇 경우에, 우리는 .jar 파일 대신 제 3 자 소스 코드를 사용합니다 (할 수 없습니다 DODS ) 그리고 그 문제를 방지하기 위해 약간 수정 Java 21. 우리는 수시로 다른 약간 수정을 만들었습니다 (뚱 베어 DODS ) 다른 이유.

  - 대부분의 클래스는 관련 src/test 파일에서 테스트 방법을 가지고 있습니다. JUnit 테스트를 실행할 수 있습니다. `mvn 테스트` 명령. 이것은 테스트가 최신 릴리스에서 의존하는 데이터의 여러 zip 파일을 다운로드합니다. [ ERDDAP 팟캐스트 제품정보](https://github.com/ERDDAP/erddapTest/releases/) ·
     
참고 : Maven 캐시 다운로드하지만 시간이 걸리는 각 실행에 다운로드 된 아카이브를 압축합니다. 다운로드 건너뛰기
및 압축 테스트 데이터 아카이브, 당신은 지정할 수 있습니다 `다운로드` Maven의 호텔 (₢ 킹 `mvn -DskipTestResource다운로드 패키지` ) ·

###   **중요한 분류**  {#important-classes} 

소스 코드를보고 싶다면 어떻게 알아볼까요? ERDDAP™ 일, 제발.

  - 이 코드는 Java Doc 댓글, 하지만 Java Docs 생성되지 않았습니다. 그들을 생성하기 위해 자유롭게 느끼십시오.

  - 가장 중요한 수업 (아래 언급된 것들을 포함하여) gov/noaa/pfel/erddap 안에 있습니다.

  - 더 보기 ERDDAP™ 클래스는 최고 수준의 방법이 있습니다. HttpServlet을 확장합니다.

  -  ERDDAP™ 하위 클래스의 인스턴스에 요청을 전달 EDDGrid 또는 EDDTable, 이는 개별 데이터셋을 나타냅니다.

  - EDStatic은 정적 정보와 설정의 대부분을 가지고 있습니다. (e.g., setup.xml 및 message.xml 파일에서) 그리고 static 서비스를 제공 (e.g., 이메일 보내기) ·

  -  EDDGrid 그리고 EDDTable subclasses는 요청을 파고, subclass-specific 방법에서 자료를 얻으십시오, 그 후에 응답을 위한 자료를 체재하십시오.

  -  EDDGrid GridDataAccessor에 데이터를 밀어 (Gridded 데이터에 대한 내부 데이터 컨테이너) ·

  - EDDTable subclasses push data into TableWriter subclasses, 이는 특정 파일 유형에 데이터를 쓰기.

  - 다른 수업 (e.g., 저수준 클래스) 또한 중요하지만, 변경할 가능성이 적습니다.
     

###  **코드 기여**  {#code-contributions} 

- GitHub 문제
기여하고 싶지만 프로젝트가 없다면, 목록을 참조하십시오. [GitHub 문제](https://github.com/ERDDAP/erddap/issues) , 당신이 가지고 갈 수 있는 프로젝트의 많은. 문제에서 일하고 싶으면, 다른 사람에게 알려주십시오. GitHub 이슈는 그 문제에 대해 어떻게 진행하는지에 대한 질문을 논의하는 가장 좋은 곳입니다.

- 당신이 만드는 것과 같은 변화가 일반 사례 중 하나 인 경우, [GitHub 문제](https://github.com/ERDDAP/erddap/issues) 당신이 만들려고 변경을 나타냅니다. 그런 다음 변경이 완료되면 병합을 요청하는 풀 요청을 만듭니다. 일반적인 변화는 다음을 포함합니다:

  - 다른 하위 클래스를 작성하고 싶습니다. EDDGrid 또는 다른 데이터 소스 유형을 처리하는 EDDTable. 그래서, 우리는 당신이 가장 가까운 기존의 하위 클래스를 발견하고 시작 시점으로 코드를 사용합니다.

  - 다른 saveAs_FileType_ 메소드를 작성하고 싶습니다. 그래서, 우리는 당신이 가까운 기존의 saveAs_FileType_ 방법을 발견하는 것이 좋습니다 EDDGrid 또는 EDDTable 및 코드를 시작점으로 사용합니다.

그 상황은 당신이 쓰는 코드가 자기 유지된다는 장점이 있습니다. 모든 세부 사항을 알 필요가 없습니다. ERDDAP '내부' 그리고 그것은 우리에게 코드를 통합하기 위해 쉽게 될 것입니다 ERDDAP · 코드를 제출하려면 라이센스가 호환됩니다. ERDDAP™   [이름 *](/license)   (₢ 킹 [아파치](https://www.apache.org/licenses/) · [사이트맵](https://www.opensource.org/licenses/bsd-license.php) , 또는 [사이트맵](https://www.opensource.org/licenses/mit-license.php) ) · 우리는 당신의 기여를 나열합니다. [이름 *](/credits) ·

- 위에 덮지 않는 기능이있는 경우 ERDDAP , 첫 번째 토론 스레드를 만들기 위해 권장 [GitHub의 의견](https://github.com/ERDDAP/erddap/discussions/categories/ideas) · 중요한 기능 / 변경 기술위원회는 그들에 대해 논의하고 그것을 추가하는지 결정합니다. ERDDAP™ ·

###  **귀하의 코드 기부**  {#judging-your-code-contributions} 
코드 또는 기타 변경 사항을 제출하려면 ERDDAP , 그것은 훌륭합니다. 귀하의 기여는 허용 될 특정 기준을 충족해야합니다. 아래 지침을 따르는 경우 기부금의 기회를 크게 늘리고 있습니다.
   

  - 더 보기 ERDDAP™ 프로젝트는 NATD에 의해 관리됩니다 ( NOAA 기술 책임자) 기술위원회의 입력으로.
2007년 (시작의 ERDDAP ) 2022년 Bob Simons이었던 것 (또한 Founder-Leader) · 시작 1월 2023, 그 Chris John입니다. 기본적으로 NATD는 책임입니다. ERDDAP , 그래서 s/he는 결정에 마지막 단어가 있다 ERDDAP™ 디자인에 관하여 부호, notably 및 주어진 잡아당기기 요구는 받아들여질 것입니다 또는 아닙니다. 그것은 효율성 이유를 위해 부분적으로 이 방법 일 필요가 있습니다 (Linus Torvalds 및 Linux에 대해 잘 작동합니다.) 보안상의 이유로 부분적으로: 누군가는 s/he가 코드의 보안 및 무결성에 대한 책임을 지고 IT 보안 사람들을 알려야합니다.
     

  - NATD는 s/he가 코드를 수락하는 보장하지 않습니다.
프로젝트가 끝나지 않는 경우, 우리는 희망을 가지고 있었고, 살바게 할 수없는 경우, NATD는 프로젝트가 포함되지 않습니다. ERDDAP™ 관련 상품 나쁜 느낌이 없습니다. 때때로 프로젝트는 잘 작동하지 않습니다. 그것은 모든 소프트웨어 개발자로 일합니다. 아래 지침을 따르면 성공의 기회를 크게 늘리고 있습니다.
     

  - 변화가 일반 관심사와 유용성의 경우 가장 좋습니다.
코드가 조직에 특이한 경우, 별도의 지점을 유지하기 위해 가장 좋습니다. ERDDAP™ 당신의 사용을 위해. Axiom이. 다행히, Git는 이렇게 쉽게 할 수 있습니다. NATD는 일관된 비전을 유지하기를 원합니다. ERDDAP , 모든 사람들이 프로젝트에 대한 사용자 정의 기능을 추가하는 부엌 싱크 프로젝트가 될 수 없습니다.
     

  - 자주 묻는 질문 Java 코드 협약.
일반적으로, 당신의 부호는 좋은 품질이어야 하고 본래를 따르야 합니다 [ Java 비밀번호](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : 디렉토리 구조의 적절한 장소에 .class 파일을 넣어 .class 파일을 적절한 이름을 부여하고 적절한 이름을 포함 Java Doc의 의견, 포함 //코드의 각 단락의 시작, 4 개의 공백과 indent (하지 탭) , 선을 피하십시오 &gt;80의 특성, 등. 컨벤션 변경 및 소스 코드는 항상 완전히 최신입니다. 의심 할 여지없이, 컨벤션에 코드와 기존 코드를 일치.

- descriptive class, 방법 및 변수 이름을 사용합니다.
그 코드를 쉽게 다른 사람들에게 읽을 수 있습니다.
   

- 공상 코드를 피하십시오.
긴 실행에서, 또는 다른 사람들은 그것을 유지하기 위해 코드를 파악해야합니다. 그래서 다른 사람들을 위해 쉽게 간단한 코딩 방법을 사용하시기 바랍니다 (미래에) 으로 분명히, 일부 공상을 사용하는 실제 장점이 있다면 Java 프로그래밍 기능, 그것을 사용, 하지만 광범위하게 문서 무엇, 왜, 그리고 어떻게 작동.
   

- 당신이 시작하기 전에 기술적인 널과 일.
코드 변경을 받으면 ERDDAP™ , 기술위원회는 확실히 당신이해야 할 일에 대해 이야기하고 당신이 코드를 변경하기 전에 그것을 할거야 방법. 즉, NATD가 끝나지 않는 변화를 피할 수 있습니다. 작업을 할 때, NATD 및 Technical Board는 기존 코드를 파악하는 데 도움이되는 질문에 대답하는 것입니다. (뚱 베어) 당신의 프로젝트를 해결하는 방법.
   

- 자주 작업 (가능한 한 많은) 시작 후.
NATD는 프로젝트에서 시작된 후 "Tech with Technical Board"와 비교하여 NATD는 독립적으로 일할 것을 권장합니다. NATD가 거의 모든 것을 말해주고 많은 질문에 답하십시오. (문서 또는 코드를 읽을 수 있는 특히 하나) , 그 때 당신의 노력은 NATD와 s/he를 위한 시간 저축은 또한 그(것)들을 일할지도 모릅니다. 그것은 [신화의 달](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) 문제. 물론, 우리는 여전히 의사 소통해야합니다. 프로젝트가 트랙에 있는지 확인하십시오. 그러나 더 자주 작업 할 수 있습니다 (기술위원회는 손으로 작업에 동의하고 일반적인 접근) , 더 나은.
   

- 버그를 피하십시오.
버그가 릴리스 전에 붙지 않는 경우, 사용자에 대한 문제가 발생합니다. (더 많은 정보) , 잘못된 정보를 반환 (에 최악) , 에 blot 이다 ERDDAP 's 명성, 그리고 현재의 주장 ERDDAP™ 몇 년 동안 설치. 버그를 방지하기 위해 매우 열심히 일하십시오. 이 부분은 깨끗한 코드를 작성 (그래서 문제를 쉽게 볼 수) · 이 부분은 단위 테스트를 작성하고 있습니다. 이 부분은 코드를 작성할 때 버그 방지의 일정한 태도입니다. NATD가 코드를 추가하지 마십시오 ERDDAP™ ·
   

- 단위 시험 또는 시험을 씁니다.
새로운 코드의 경우, 테스트 파일에서 JUnit 테스트를 작성해야 합니다.
쓰기를 철저히 테스트하는 최소 하나의 개별 테스트 방법을 작성하고 클래스의 JUnit 테스트 파일에 추가하여 자동으로 실행됩니다. 제품정보 (및 관련) 테스트는 버그를 잡는 가장 좋은 방법 중 하나입니다, 처음, 그리고 긴 실행 (다른 것 변화로 ERDDAP™ ) · 밥이 말했듯이, "단위 테스트는 밤에 잠을 수 있습니다."
   

- NATD를 쉽게 이해하고 당신의 잡아당기기 요구에 있는 변화를 받아들이십시오.
단위 테스트 방법을 쓰는 부분 (₢ 킹) · 코드의 한 부분으로 변경됩니다. (또는 1개의 종류) 가능한 한. NATD는 코드 전역의 수백 가지 변화로 모든 풀 요청을 수락하지 않습니다. NATD는 s/he가 코드의 보안 및 무결성에 대해 책임을 지는 IT 보안 사람들을 말합니다. 너무 많은 변경 사항이 있거나 그림이 너무 어렵다면 변경 사항을 확인하고 버그 또는 보안 문제를 소개하지 못합니다.
   

- 쉽게
코드를 위한 좋은 전반적인 테마는: 그것을 간단하게 유지하십시오. 간단한 부호는 다른 사람을 위해 쉽습니다 (미래에) 자주 묻는 질문 NATD에 쉽게 이해하고 따라서 받아들입니다.
   

- 코드에 대한 장기 책임.
긴 실행에서, 그것은 당신이 당신의 코드를 유지하고 그것에 대해 질문에 대한 질문에 대한 지속적인 책임을 가정하는 것이 가장 좋습니다 (예, 에서 ERDDAP™ Google 그룹) · 몇몇 저자의 메모로, 부호는 책임 뿐 아니라 자산입니다. 버그가 미래에 발견되면 코드를 더 잘 알고 있기 때문에 해결하는 것이 가장 좋습니다. (또한 첫 번째 장소에서 버그를 피하기 위해 인센티브가있다) · NATD는 지속적인 유지 보수를 제공하기 위해 회사의 약속을 요구하지 않습니다. NATD는 유지 보수가 크게 평가 될 것이라고 말하는 것입니다.
