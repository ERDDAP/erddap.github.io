---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# 일하기datasets.xml파일 형식

\\[이 웹 페이지는 오직 관심의 것입니다ERDDAP™관리자.\\]

너 뒤에ERDDAP™ [설치 설명서](/docs/server-admin/deploy-install), 당신은 편집해야합니다datasets.xml파일 형식 *뚱 베어* /content/erddap/ 당신의 데이터셋을 설명하기 위해ERDDAP™임명은 봉사할 것입니다.

예제를 볼 수 있습니다.[datasets.xmlGitHub에서](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)·

- - - -

## [제품정보](#introduction) {#introduction} 

### 몇몇 회의 필수{#some-assembly-required} 
dataset 설정ERDDAP™dataset의 디렉토리 또는 URL에 포인팅의 문제가 없습니다. XML의 펑크를 작성해야 합니다.datasets.xmldataset를 설명합니다.

* gridded datasets를 위해, dataset를 만들기 위하여는ERDDAP's data Structure for gridded data, 당신은 같은 크기를 공유하는 dataset의 변수의 하위 집합을 식별해야합니다. ([왜?](#why-just-two-basic-data-structures) [어떻게?](#dimensions)) 
* dataset의 현재 metadata는 자동적으로 수입됩니다. 그러나 메타데이터를 수정하거나 다른 메타데이터를 추가하려는 경우, 당신은 그것을 지정해야datasets.xml· 이름 *ERDDAP™다른 메타데이터를 필요[글로벌 특성](#global-attributes)  (·infoUrl, 기관,sourceUrl, 요약 및 제목) 이름 *[변수 속성](#variable-addattributes)  (·long\\_name및 단위) · dataset에 있는 metadata로 dataset에 대한 descriptive 정보를 dataset에 추가합니다.ERDDAP™dataset에 descriptive 정보를 추가합니다. 추가 메타데이터는 데이터셋에 더 좋으며 도움이 됩니다.ERDDAP™데이터의 더 나은 일을 할 수 있습니다.
*   ERDDAP™특별한 일을 할 필요[경도, 위도, 고도 (또는 깊이) , 시간 변수](#destinationname)·

이 아이디어로 살면 XML을 만들기 위해 노력이 만료됩니다.datasets.xml, 당신은의 모든 이점을 얻습니다ERDDAP™다음을 포함:

* datasets에 대한 전체 텍스트 검색
* Datasets에 대한 검색
* 데이터 액세스 양식 ( *datasetID* 사이트맵) 그래서 당신은 다른 파일 형식의 많은 데이터의 하위 세트를 요청할 수 있습니다
* 그래프와 지도를 요청하는 양식 ( *datasetID* ·) 
* 웹 맵 서비스 (WMS) gridded datasets를 위해
*   RESTful당신의 자료에 접근

이름 *datasets.xml몇 가지 datasets에 대한 상당한 노력이 필요하지만, **더 쉽게** · 첫번째 dataset 후에, 당신은 수시로 다음 dataset를 위한 당신의 일의 많음을 재사용할 수 있습니다. 다행히,ERDDAP™두 가지[제품정보](#tools)각 dataset에 XML을 만들 수 있도록datasets.xml·
갇혀있는 경우, 우리를 참조하십시오[더 많은 지원 얻기에 섹션](/docs/intro#support)·

### 데이터 공급자 이름 *{#data-provider-form} 
데이터 공급자가 귀하의 데이터에 추가 할 때ERDDAP, 그것은 어려울 수 있고 metadata의 모든 것을 수집하는 시간 consuming (dataset에 대한 정보) dataset을 추가하는 데 필요한ERDDAP· 많은 데이터 소스 (예를 들면, .csv 파일, Excel 파일, 데이터베이스) 내부 metadata가 없습니다.ERDDAP™데이터 제공 업체의 메타데이터 수집 및 데이터 제공 업체에 대한 광범위한 지도를 포함한 데이터 제공 업체 양식을 보유하고 있습니다.[데이터베이스의 데이터](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases)· 제출된 정보는datasets.xml형식과 그 다음에 이메일ERDDAP™관련 기사 (이름 *) 관련 기사 (이름 *) 이름 * *큰Parent감독* /logs/dataProviderForm.log . 또는 . 따라서, the form semi-automates the process of getting dataset intoERDDAP, 하지만ERDDAP™관리자는 여전히 완료해야datasets.xmlchunk 과 거래 와 getting 데이터 파일 (₢ 킹) 공급자에서 또는 데이터베이스에 연결.

외부 소스에서 실제 데이터 파일의 제출은 거대한 보안 위험이므로ERDDAP™그것을 취급하지 않습니다. 예를 들어, 이메일에 대한 데이터 공급자와 함께 작동하는 솔루션을 파악해야 합니다. (작은 파일) , 구름에서 잡아 (예를 들면, DropBox 또는 Google 드라이브) , sftp 사이트 (비밀번호) , 또는 운동화 이름 * (USB 엄지 드라이브 또는 외부 하드 드라이브) · 당신은 아마 당신이 알고있는 사람들로부터 파일을 받아 들일 수 있습니다. 바이러스에 대한 파일을 스캔하고 다른 보안 주의를해야합니다.

링크가 없습니다.ERDDAP™데이터 공급자 양식에 (예를 들어,ERDDAP™홈 페이지) · 대신 누군가가 자신의 데이터를 가지고 싶어 할 때ERDDAP, 당신은 같은 이메일 말을 보낼 수 있습니다:
그렇습니다, 우리는 당신의 자료를에 얻을 수 있습니다ERDDAP· 시작하려면 양식을 작성하십시오. https://*yourUrl*/erddap/dataProviderForm.html   (또는http://이름 *https://지원되지 않음) ·
당신이 끝내기 후에, 나는 당신에게 마지막 세부사항을 밖으로 일할 것입니다.
양식을 보면 (충전하지 않고) , 당신은 위에 모양을 볼 수 있습니다ERD이름 *ERDDAP::[제품정보](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html)·[부품 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html)·[부품 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html)·[부품 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)·[부품 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html)· 이 링크에ERD ERDDAP™데이터에 데이터를 추가하려는 경우, 정보를 제출하지 마십시오.ERD ERDDAP·

데이터 공급자 양식을 제거하려면ERDDAP™, 칫
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
setup.xml 파일에서.

이에 대한 impetus는NOAA2014년[연구 결과에 대한 공공 액세스 (뚱 베어) 기타 제품](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf)그 모든 것을 요구하는NOAATaxpayer 달러를 통한 환경 데이터 펀딩 가능 (그냥 파일) 창조의 12 달 안에. 그래서 사용에 관심 증가ERDDAP™서비스 ASAP을 통해 데이터셋을 만들 수 있습니다. 우리는 많은 데이터 공급자와 거래 할 수있는 더 효율적인 방법이 필요합니다.

피드백/문제? 이 양식은 새로운, 그래서 이메일을 보내erd dot data at noaa dot gov이 개선을 위한 피드백이나 제안이 있는 경우.

### 제품정보{#tools} 
ERDDAP™도구가 있는 두 개의 명령 줄 프로그램과 함께 XML을 만들 수 있도록 돕습니다.ERDDAP™관련 기사 설정하면ERDDAP™그리고 그것을 실행 (적어도 1 시간) , 이 프로그램을 찾을 수 있습니다 *뚱 베어* /webapps/erddap/WEB-INF 디렉토리. Linux/유닉스 쉘 스크립트가 있습니다. (확장으로 .sh) Windows 스크립트 (확장으로 .bat) 각 프로그램.\\[리눅스에서, 같은 사용자와 같은 도구를 실행 (톰캣?) 그것은 Tomcat을 실행합니다.\\]각 프로그램을 실행할 때, 당신은 질문을 할 것입니다. 각 질문에 대한 응답을 입력 한 다음 Enter를 누릅니다. 또는 ^C를 눌러 프로그램을 언제든지 종료합니다.

#### 프로그램은 실행되지 않습니다?{#program-wont-run} 

* 알 수없는 프로그램을 얻는 경우 (또는 유사한) 오류 메시지, 문제는 아마 운영 체제 찾을 수 없습니다Java· 당신은 어디를 알아야Java컴퓨터에서 사용하려고하는 .bat 또는 .sh 파일에 java 참조를 편집합니다.
* jar 파일을 찾을 수 없거나 클래스가 오류 메시지를 찾을 수 없으면Java.bat 또는 .sh 파일에 나열된 클래스 중 하나를 찾을 수 없습니다. 이 솔루션은 .jar 파일이 무엇인지 파악하고 .bat 또는 .sh 파일에서 java 참조를 편집합니다.
* 버전의 경우Java그것은 너무 오래 된 프로그램, 프로그램은 실행되지 않고 당신은 같은 오류 메시지를 볼 수
스레드 "main" java.lang.UnsupportedClassVersionError의 예외 :
     *몇몇/종류/이름* : Major.minor 버전 지원 *한국어*   
이 솔루션은 최신 버전으로 업데이트됩니다.Java그리고 프로그램을 위한 .sh 또는 .bat 파일이 그것을 사용하고 있는지 확인합니다.

#### 공구 인쇄 각종 진단 메시지:{#the-tools-print-various-diagnostic-messages} 

* "ERROR"라는 단어는 절차가 완료되면 잘못되었을 때 사용됩니다. 오류를 얻기 위해 성가신이지만, 문제를 처리하는 오류 힘.
* "WARNING"라는 단어는 잘못되었을 때 사용되지만 절차가 완료 될 수 있습니다. 이것은 꽤 드문다.
* 다른 것은 단지 유익한 메시지입니다. \\-verbose를 추가 할 수 있습니다.[생성데이터셋Xml](#generatedatasetsxml)또는[팟캐스트](#dasdds)추가 정보 메시지를 얻기 위해 명령 줄, 때로는 문제를 해결하는 데 도움이됩니다.

두 도구는 큰 도움이되지만,이 페이지의 모든 지침을 주의 깊게 읽고 중요한 결정을해야합니다.

### 생성데이터셋Xml{#generatedatasetsxml} 
*    **생성데이터셋Xml** dataset XML의 거친 초안을 생성 할 수있는 명령 줄 프로그램입니다 거의 모든 유형의 dataset.
    
우리는 당신이 GenerateDatasets를 사용하는 STRONGLY RECOMMEND 대신 Xml의 펑크 만들기datasets.xml때문에 손으로:
    
    * Generate데이터셋 Xml는 초에서 작동합니다. 손에 의해 이것을하는 것은 적어도 1 시간의 일입니다, 당신이 무슨 일을 알고있을 때.
    * Generate데이터셋 Xml는 더 나은 일을합니다. 손에 의해이 수행은 광범위한 지식이 필요합니다.ERDDAP™이름 * 그것은 당신이 손으로 더 나은 일을 할 것입니다. (Bob Simons는 항상 GenerateDatasets를 사용합니다. 첫번째 초안을 위한 Xml, 그는 썼습니다ERDDAP·) 
    * Generate데이터셋 Xml는 항상 유효한 펑크를 생성합니다datasets.xml· 모든 펑크datasets.xml당신이 글을 쓰는 것은 아마 예방하는 최소 몇 가지 오류가 있습니다.ERDDAP™dataset 로딩 중. 그것은 종종이 문제를 진단하는 데 시간이 걸립니다. 시간을 낭비하지 마십시오. 관련 기사 데이터셋 Xml는 열심히 일합니다. 그런 다음 원하는 경우 손으로 .xml을 정제 할 수 있습니다.
    
GenerateDatasets를 사용할 때 Xml 프로그램:
    
    * Windows에서, 당신이 GenerateDatasetsXml를 실행하는 첫 번째 시간, 당신은 java에 경로를 변경하기 위해 텍스트 편집기로 GenerateDatasetsXml.bat 파일을 편집해야합니다. Windows가 찾을 수 있도록 exe 파일Java·
    * Generate데이터셋 Xml는 먼저 EDDType을 지정해야 합니다. (Erd Dap 데이터 세트 제품정보) dataset의. 이름 *[Dataset 유형 목록](#list-of-types-datasets)  (이 문서에서) dataset에 적합한 형식을 파악하기 위해 일반 EDDTypes 외에도 몇 가지가 있습니다.[특수/Pseudo Dataset 유형](#specialpseudo-dataset-types)  (e.g., THREDDS 카탈로그를 크롤링하는 것datasets.xml카탈로그의 각 datasets) ·
    * Generate데이터셋 Xml는 EDDType에 따라 일련의 질문을 합니다. 자주 묻는 질문ERDDAP™dataset의 소스에 액세스합니다. 무엇을 이해ERDDAP™EDDType에 대한 문서를 참조하여 동일한 데이터셋 유형을 클릭하여 지정한 EDDType에 대한[Dataset 유형 목록](#list-of-types-datasets)·
        
특수 문자로 문자열을 입력해야 하는 경우 (e.g., 시작 또는 끝, non-ASCII 문자의 whitespace 문자) , 입력[JSON 스타일 문자열](https://www.json.org/json-en.html)  (\\ 문자로 탈출하는 특수 문자) · 예를 들어, 탭 문자를 입력하려면, "\\t"를 입력합니다 (거의 두 배 따옴표와 함께)ERDDAP™JSON 스타일 문자열입니다.
        
    * 종종, 답변 중 하나는 GenerateDatasetsXml가 필요로하는 것입니다. 당신은 다시 시도 할 수 있습니다, 질문에 대한 개정 된 답변, GenerateDatasets까지 Xml는 성공적으로 소스 데이터를 발견하고 이해할 수 있습니다.
    * 자주 묻는 질문 (또는 제대로) , 생성데이터셋 Xml는 dataset의 소스에 연결하고 기본 정보를 수집합니다. (예를 들어, 변수명 및 metadata) ·
현지의 데이터 세트NetCDF .nc관련 파일, GenerateDatasets Xml는 종종 파일을 읽은 후 파일의 ncdump-like 구조를 인쇄합니다. 이것은 GenerateDatasetsXml를 통해 후속 루프에서 더 잘 질문에 응답 할 수있는 정보를 줄 수 있습니다.
    * Generate데이터셋 Xml는 그런 dataset에 대한 dataset XML의 거친 초안을 생성합니다.
    * 진단 정보 및 dataset XML의 거친 초안은 작성됩니다. *큰Parent감독* /logs/GenerateDatasetsXml.log .
    * dataset XML의 거친 초안은 작성됩니다. *큰Parent감독* /logs/GenerateDatasetsXml.out .
#### "0 파일" 오류 메시지{#0-files-error-message} 
GenerateDatasets를 실행하는 경우 Xml 또는[팟캐스트](#dasdds), 또는 당신이 로드하려고 하는 경우EDDGrid...Files 또는 EDDTable에서 ... 파일 datasetERDDAP™, 그리고 당신은 "0 파일" 오류 메시지를 표시ERDDAP™디렉토리에 0 일치하는 파일 발견 (그 디렉토리에 일치하는 파일이 있다고 생각하면) ::
* 디렉토리의 전체 이름을 지정했는지 확인하십시오. 그리고 샘플 파일 이름을 지정하면 전체 디렉토리 이름을 포함하여 파일의 전체 이름을 지정해야합니다.
* 파일이 실제로 그 디렉토리에 있는지 확인합니다.
* 디렉토리 이름의 맞춤법 확인.
* fileNameRegex를 확인합니다. 그것은 정말, 정말 쉽게 regexes와 실수를 만들. 시험 목적을 위해, 모든 파일명과 일치해야 regex .\\*를 시도하십시오. (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·) 
* 프로그램을 실행하는 사용자 확인 (예를 들어, user=tomcat (·) 톰캣/ERDDAP) 그 파일에 대한 'read' 권한이 있습니다.
* 몇몇 운영 체계에서 (예를 들어, SELinux) 그리고 시스템 설정에 따라, 프로그램을 실행하는 사용자는 파일이 있는 디렉토리의 전체 체인에 대한 '읽' 권한이 있어야 합니다.


* 당신이 해결할 수없는 문제가 있다면,[자주 묻는 질문](/docs/intro#support)가능한 한 많은 정보가 있습니다. 마찬가지로 주어진 데이터 세트에 적합한 EDDType과 같을 경우 해당 데이터 세트와 작동하지 않거나 적절한 EDDType이 없다면 파일을 보내주십시오.[GitHub에서](https://github.com/ERDDAP/erddap/issues)자주 묻는 질문 (관련 샘플 파일) ·
         
#### GenerateDatasets에서 출력을 편집해야 합니다. Xml를 더 잘 만들 수 있습니다.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* 지불 조건:
한국어datasets.xmlMADE BE Generate데이터셋 Xml ISN'T 부품 XML BEFORE가 PUBLIC에 대해 자세히 알아보세요.ERDDAP· Generate데이터셋 Xml는 RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT의 LOT에 의존합니다. XML의 CORRECTNESS를 준수 할 책임이 있습니다.ERDDAP사이트맵datasets.xml첨부파일
    
     (재미 사실: 나는 외치는 아니에요. 역사적인 법적인 이유를 위해, 불평은 모든 모자에서 썼습니다.) 
    
GenerateDatasetsXml의 출력은 거친 초안입니다.
당신은 거의 항상 그것을 편집해야합니다.
우리는 가능한 한 준비로 출력을 만들기 위해 엄청난 노력을 계속하고 있습니다. 그러나 제한이 있습니다. 종종 필요한 정보는 소스 메타 데이터에서 사용할 수 없습니다.
    
근본적인 문제는 우리가 컴퓨터 프로그램을 요구한다는 것입니다 (생성데이터셋Xml) 작업을 수행하려면, 당신이 같은 작업을 준 경우 100 사람들, 당신은 100 다른 결과를 얻을 것이다. 단일 "right"응답이 없습니다. 분명히, 프로그램은 밥의 마음을 읽는 가장 가까운 (이름 *) , 하지만 너무, 그것은 모든 이해 AI 프로그램이 아니다, 단지 현실의 무리는 함께 AI 같은 작업을 수행. (그날의 알-understanding AI 프로그램은 올 수 있지만 아직은 없습니다. 그렇지 않으면 인간이 더 큰 문제가 있을 수 있습니다. 당신이 원하는 것을주의하십시오.) 
    
* 정보 목적으로, 출력은 global sourceAttributes and variable sourceAttributes as comments를 보여줍니다.ERDDAP™sourceAttributes를 결합하고addAttributes  (그대는) 결합하기 사용자가 표시된 속성 (다른 속성은 경도, 위도, 고도, 깊이 및 시간 변수에 자동으로 추가됩니다.ERDDAP™실제로 dataset을 만든다) ·
     
* sourceAttribute를 좋아하지 않으면 addAttribute를 같은 이름과 다른 값으로 추가하여 씁니다. (또는 값이 없다면 제거하려면) ·
     
* 모든 것addAttributes컴퓨터 생성 제안입니다. 수정하기 addAttribute를 좋아하지 않으면 변경하십시오.
     
* 다른 것을 추가하려면addAttributes, 추가합니다.
     
* 변경하려면destinationName, 그것을 바꾸십시오. 그러나 변경하지 마십시오sourceName₢ 킹
     
* 주문을 변경할 수 있습니다.dataVariables 또는 그들을 제거.


    * 다음을 사용할 수 있습니다.[팟캐스트](#dasdds)  (더 보기) 반복적으로 그 dataset에 대한 XML을 테스트하여 결과 데이터셋이 원하는대로 나타납니다.ERDDAP·
    * 작은 변화를 만들 수 있습니다.datasets.xml생성 된 chunk, 예를 들어, 더 나은 공급infoUrl, 요약, 또는 제목.
#### doNotAdd표준이름{#donotaddstandardnames} 
\\-doNotAddStandardNames를 실행할 때 명령줄 매개변수로 포함하면 데이터셋 Xml, 생성 데이터셋 Xml는 추가하지 않습니다standard\\_name으로addAttributes위도, 경도, 고도, 깊이 또는 시간이라는 변수 이외의 변수에 대해 (그것은 분명하다standard\\_name₢ 킹) · 이것은 당신이 생성에서 산출을 사용하는 경우에 유용합니다 데이터셋 직접 XmlERDDAP™출력을 편집하지 않고 생성하기 때문에 데이터셋 Xml는 종종 추측standard\\_names 잘못된. (우리는 항상 당신이 그것을 사용하기 전에 출력을 편집하는 것이 좋습니다ERDDAP·) 이 매개 변수를 사용 하 여 다른 미성년자 관련 효과 때문에 추측standard\\_name다른 목적으로 종종 사용됩니다. 예를 들어, 새를 만들려면long\\_name, 그리고 colorBar 설정을 만들.
#### 스크립팅{#scripting} 
키보드 및 루프에서 상호 작용하는 질문에 응답하는 대안으로 추가 데이터 세트를 생성 할 수 있습니다, 당신은 하나의 데이터 세트를 생성하는 질문의 모든 질문에 응답 할 수있는 명령 줄 인수를 제공 할 수 있습니다. Generate데이터셋 Xml는 그 매개 변수를 처리하고 출력 파일에 출력을 작성하고 프로그램을 종료합니다.
        
이 작업을 설정하려면 먼저 대화 형 모드에서 프로그램을 사용하고 답변을 작성하십시오. 다음은 부분 예입니다:
스크립트를 실행해봅시다: ./GenerateDatasetsXml.sh
다음 입력: EDDTableFromAsciiFiles
다음 입력: /u00/data/
다음 입력: .\\*\\.asc
다음 입력: /u00/data/sampleFile.asc
다음 입력: ISO-8859-1
        
비동기적인 방식으로 이것을 실행하려면, 이 명령 줄을 사용하십시오:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
그래서 기본적으로, 당신은 단지 명령 줄에 모든 답변을 나열합니다.
이것은 re-running GenerateDatasets를 necessitates로 자주 변경하는 datasets에 유용합니다 사이트맵 (뚱 베어EDDGrid인기 카테고리) ·
        
상세 정보:

* 매개 변수가 공간 또는 일부 특수 문자를 포함하면 매개 변수를 인코딩합니다.[JSON 스타일 문자열](https://www.json.org/json-en.html), e.g., 공백과 2를 가진 나의 모수\\n라인".
* 매개 변수로 빈 문자열을 지정하려면, use: nothing
* 매개변수의 기본값을 지정하려면, use: default
             
* Generate데이터셋 Xml는 -i를 지원합니다 *데이터셋 Xml이름* ₢ 킹 *태그이름* 지정된 출력을 삽입하는 명령줄 매개변수datasets.xml파일 형식 (기본값은 *뚱 베어* /content/카지노사이트datasets.xml) · Generate데이터셋 Xml는 datasets에 있는 2개의 선을 찾습니다 모델 번호:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
이름 *
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
그리고 새 콘텐츠와 함께 그 라인 사이에 모든 것을 대체하고, someDatetime을 변경합니다.
* -i 스위치는 단지 가공됩니다 (관련 기사datasets.xml상품정보) GenerateDatasets를 실행하는 경우 Xml 명령줄 인수를 사용하여 모든 질문에 대한 답변을 지정합니다. (위의 'Scripting'을 참조하십시오.)   (생각은: 이 매개 변수는 스크립트와 함께 사용됩니다. 대화형 모드에서 프로그램을 사용하는 경우 (키보드의 정보를 입력) , 당신은 당신이 원하는 것을 생성하기 전에 XML의 잘못된 펑크를 생성 할 가능성이있다.) 
* 시작과 끝 선이 발견되지 않은 경우, 그 줄과 새로운 내용이 바로 앞에 삽입됩니다.&lt;/erddapDatasets&gt;.
* -I도 있습니다 (자본 i) -i와 동일하게 작동하는 테스트 목적을 위한 스위치, 그러나 불린 파일을 창조하십시오datasets.xml *날짜시간* 변경은 하지 않습니다.datasets.xml·
* GenerateDatasets를 실행하지 마십시오 한 번에 두 개의 프로세스에서 Xml. 한 세트의 변화만 유지됩니다. 심각한 문제가 있을 수 있습니다. (예를 들어 손상된 파일) ·
    
"GenerateDatasetsXml -verbose"를 사용하는 경우 평소보다 더 진단 메시지를 인쇄합니다.
    
#### 특수/Pseudo Dataset 유형{#specialpseudo-dataset-types} 
일반적으로 GenerateDatasets의 EDDType 옵션 이 문서에 설명 된 EDD 유형의 Xml 일치 (자세히보기[Dataset 유형 목록](#list-of-types-datasets)) 그리고 하나 생성datasets.xmlchunk는 하나의 특정 데이터 소스에서 하나의 데이터 세트를 만듭니다. 몇 가지 예외와 특별 사례가 있습니다.
    
##### EDDGrid언어: en{#eddgridfromerddap} 
이 EDDType은 모든 것을 생성합니다datasets.xmlchunks 필요 에 확인[EDDGrid언어: en](#eddfromerddap)모든 데이터 세트EDDGrid원격의 datasetsERDDAP· 당신은 원래 유지의 옵션을 가질 것이다datasetID₢ 킹 (몇몇을 복제할 수 있습니다.datasetID이미 당신의ERDDAP) 또는 새로운 이름을 생성 (그러나 보통 인간 읽을 수 없는) ·
     
##### EDDTableErddap에서{#eddtablefromerddap} 
이 EDDType은 모든 것을 생성합니다datasets.xmlchunks 필요 에 확인[EDDTableErddap에서](#eddfromerddap)리모트에 있는 EDDTable datasets의 전부에서 datasetsERDDAP· 당신은 원래 유지의 옵션을 가질 것이다datasetID₢ 킹 (몇몇을 복제할 수 있습니다.datasetID이미 당신의ERDDAP) 또는 새로운 이름을 생성 (그러나 보통 인간 읽을 수 없는) ·
     
##### EDDGrid인기 카테고리{#eddgridfromthreddscatalog} 
이 EDDType은 모든 것을 생성합니다datasets.xml모두에 필요한 펑크[EDDGrid사이트맵](#eddgridfromdap)THREDDS를 통해 crawling recursively에 의해 찾을 수있는 데이터 세트 (이름 *) 카탈로그. THREDDS 카탈로그 URL의 많은 형태가 있습니다. 이 옵션은 /catalog/와 함께 THREDDS .xml URL을 요구합니다. 예를 들어,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml 또는
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(관련 .html 카탈로그에
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html 허용되지 않는,EDDGridfromThreddsCatalog).
당신은 문제가있는 경우EDDGrid인기 동영상 상표:
* 사용중인 URL을 확인하면 /catalog/가 포함되어 있으며 /catalog.xml .
* 가능한 경우 공용 IP 주소를 사용하십시오. (예를 들어, https://oceanwatch.pfeg.noaa.gov ) URL에서 로컬 숫자 IP 주소가 아닌 (예를 들어, https://12.34.56.78 ) · THREDDS가 로컬 숫자 IP 주소를 통해 접근 할 수 있다면, [&lt;변환ToPublicSourceUrl&gt;] (#converttopublicsourceurl에 대해) ·ERDDAP™사용자는 심지어 공공 주소를 참조ERDDAP™로컬 숫자 주소에서 데이터를 가져옵니다.
* 당신이 해결할 수없는 문제가 있다면,[문제 해결 팁](#troubleshooting-tips)·
* 이들의 저수준 부호는 지금 사용합니다Unidatanetcdf-java 카탈로그 크롤러 코드 (사이트맵 카탈로그) 그래서 그것은 모든 THREDDS 카탈로그를 처리 할 수 (surprisingly complex일 수 있는) 이름 *Unidata그 코드.
         
##### EDDGridLonPM180Erddap카탈로그{#eddgridlonpm180fromerddapcatalog} 
이 EDDType은datasets.xml이름 *[EDDGrid론PM180](#eddgridlonpm180)모든 데이터 세트EDDGrid데이터 세트ERDDAP180보다 더 큰 경도 값이 있습니다.
* 가능한 경우 공용 IP 주소를 사용하십시오. (예를 들어, https://oceanwatch.pfeg.noaa.gov ) URL에서 로컬 숫자 IP 주소가 아닌 (예를 들어, https://12.34.56.78 ) · 만약에ERDDAP™로컬 숫자 IP 주소를 통해만 액세스할 수 있습니다. [&lt;변환ToPublicSourceUrl&gt;] (#converttopublicsourceurl에 대해) ·ERDDAP™사용자는 심지어 공공 주소를 참조ERDDAP™로컬 숫자 주소에서 데이터를 가져옵니다.
         
##### EDDGridLon0360ErddapCatalog에서{#eddgridlon0360fromerddapcatalog} 
이 EDDType은datasets.xml이름 *[EDDGrid론0360](#eddgridlon0360)모든 데이터 세트EDDGrid데이터 세트ERDDAP어떤 경도 값이 0 미만입니다.
* 가능한 경우 공용 IP 주소를 사용하십시오. (예를 들어, https://oceanwatch.pfeg.noaa.gov ) URL에서 로컬 숫자 IP 주소가 아닌 (예를 들어, https://12.34.56.78 ) · 만약에ERDDAP™로컬 숫자 IP 주소를 통해만 액세스할 수 있습니다. [&lt;변환ToPublicSourceUrl&gt;] (#converttopublicsourceurl에 대해) ·ERDDAP™사용자는 심지어 공공 주소를 참조ERDDAP™로컬 숫자 주소에서 데이터를 가져옵니다.
         
##### EDDs파일{#eddsfromfiles} 
시작 디렉토리를 제공,이 디렉토리와 모든 하위 디렉토리를 가로 질러 검색하는 데이터 파일의 각 그룹에 대한 데이터 세트를 만들 수 있습니다.
* dataset가 발견되면 dataset가 모든 하위 디렉토리를 포함합니다.
* dataset가 발견되면, 유사한 형제는 별도의 datasets로 대우될 것입니다 (예를 들어, 1990 년대의 이사, 2000 년대, 2010 년대, 별도의 데이터 세트 생성) · 그들은 손으로 쉽게 결합해야합니다 -- 그냥 첫 번째 dataset의 변경&lt;fileDir&gt; 을 부모 디렉토리로 삭제하고 이후의 데이터셋을 삭제합니다.
* 이것은 단지 펑크를 생성하려고합니다.datasets.xml디렉토리에 파일 확장의 가장 일반적인 유형 (무시되는 .md5를 계산하지 않는) · 그래서, 디렉토리를 부여 10.nc파일 및 5 .txt 파일, dataset 생성됩니다.nc파일 만.
* 이 디렉토리의 모든 파일이 동일한 dataset에 속한다는 것을 가정합니다. 디렉토리가 있다면.ncSST 데이터 및 일부 파일.ncchlorophyll 자료가있는 파일, 단지 하나의 샘플.nc파일이 읽을 것입니다 (사이트맵 엽록소?) 그리고 하나의 dataset은 그 유형의 파일로 만들 것입니다. 데이터 세트는 아마도 같은 데이터 세트로 파일의 두 가지 유형의 파일을로드하려고 complications 때문에로드하지 못합니다.
* 디렉토리에서 가장 일반적인 확장이있는 4 개 이상의 파일이 있다면, 이것은 그들이 데이터 파일이 아니라 디렉토리를 건너는 것을 가정합니다.
* 디렉토리에 4 개 이상의 파일이 있는 경우, 이것은 성공적으로 chunk를 생성 할 수 없습니다.datasets.xml파일에 대한 (예를 들면, unsupported 파일 유형) , 이것은 생성한다[EDDTable파일이름](#eddtablefromfilenames)파일에 대한 dataset.
* 이 로그 파일에 쓴 진단의 끝에서, 다만 전에datasets.xmlchunks, 이것은 모든 하위 디렉토리에 의해 수집 된 정보 요약 테이블을 인쇄합니다. 테이블은 모든 하위 디렉토리를 나열하고 파일 확장의 가장 일반적인 유형을 나타냅니다, 파일의 총 수, 그리고 dataset의 유형이 파일을 위해 생성되었다 (이름 *) · 당신은 단지 직면 한 경우, 깊은 배열 된 파일 구조, GenerateDatasets를 고려 EDDType=EDDsFromFiles를 가진 Xml는 이 정보를 생성하기 위하여,
* 이 옵션은 데이터 파일의 주어진 그룹에 가장 적합한 EDDType을 추측하는 훌륭한 작업을 수행 할 수 없지만 빠르고 쉬운 시도 가치가 있습니다. 소스 파일이 적합하다면 잘 작동하며 생성하는 좋은 첫 번째 단계입니다.datasets.xml하위디렉토리의 많은 파일 시스템을 위해, 각 다른 데이터셋에서 데이터 파일.
         
##### EDDTableFromEML 및 EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
이 특별한 EDDType는 생성합니다datasets.xml제품정보[EDDTableAsciiFiles에서](#eddtablefromasciifiles)각 테이블에서 데이터 세트가 설명되었습니다.[Ecological 메타데이터 언어](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML 파일. "Batch" 변형은 로컬 또는 원격 디렉토리의 모든 EML 파일에서 작동합니다. 자주 묻는 질문[EDDTableFromEML에 대한 문서](/docs/server-admin/EDDTableFromEML)·
     
##### EDDTable인포트{#eddtablefrominport} 
이 특별한 EDDType는 생성합니다datasets.xml제품정보[EDDTableAsciiFiles에서](#eddtablefromasciifiles)정보의 dataset[파일 형식](https://inport.nmfs.noaa.gov/inport)파일. 소스 데이터 파일에 액세스 할 수 있다면 (inport-xml 파일은 찾을 수있는 위치에 대한 clues해야합니다) , 당신은 일 dataset를 안으로 만들 수 있습니다ERDDAP·

GenerateDatasets를 사용하는 다음 단계 개요 inport-xml 파일이있는 Xml는 작업 데이터 세트를 얻기 위해ERDDAP·

1. inport-xml 파일에 액세스 할 때 (URL 또는 로컬 파일로) : GenerateDatasets 실행 Xml, EDDType=EDDTableFromInPort를 지정하고, inport-xml URL 또는 전체 파일 이름을 지정하고, thatChild=0을 지정하고, 다른 요청한 정보를 지정합니다. (이름 *) · (이 시점에서 소스 데이터 파일이 있거나 이름을 지정할 필요가 없습니다.) 어떤Child=0 설정은 GenerateDatasets를 알려줍니다. Xml에 대한 정보를 작성 **모든 것** 이름 *&lt;법인 정보&gt;&lt;entity&gt;'s inport-xml 파일 (어떤 경우) · 또한 inport-xml 파일에 나열된 다운로드 URL의 모든 것을 포함하여 배경 정보 요약을 인쇄합니다.
2. 그 모든 정보를 확인 (GenerateDatasets를 포함한 배경 정보 Xml 인쇄) 다운로드 URL을 방문 (₢ 킹) 소스 데이터 파일을 찾기 위해 (₢ 킹) · 당신이 그것을 찾을 수 있다면 (뚱 베어) , 다운로드 (뚱 베어) 할 수있는 디렉토리에ERDDAP· (소스 데이터 파일을 찾을 수없는 경우 진행 중에는 포인트가 없습니다.) 
3. 회사연혁 데이터셋 Xml 다시.
소스 데이터 파일이 inport-xml 파일의 하나에 해당하는 경우&lt;법인 정보&gt;&lt;entity&gt;'s, 그Child=를 지정합니다. *그엔티니*   (예를 들어, 1, 2, 3, ...) ·ERDDAP™엔티티티 정보의 이름에 소스 데이터 파일의 열 이름과 일치하려고하고, 모든 discrepancies를 수락 / 거부 / 수정하기 위해 신속한.
또는 inport-xml 파일이 없는 경우&lt;법인 정보&gt;&lt;entity&gt;'s, 그Child=0을 지정합니다.
4. 펑크에서datasets.xmlGenerateDatasets에 의해 만들어진 Xml, [글로벌 개정&lt;addAttributes&gt;] (#글로벌) 필요에 따라 /desired.
5. 펑크에서datasets.xmlGenerateDatasetsXml에 의해 만들어졌다, add/revise [&lt;dataVariable&gt;] (#데이터variable) 필요한 정보 / 변수의 각을 설명합니다. 각 변수를 올바르게 식별해야합니다.
[기타]&lt;sourceName&gt;] (#출처)   (그것은 소스에 나타납니다) ·
[기타]&lt;destinationName&gt;] (#destination이름)   (허용된 문자에 더 제한이 있습니다.sourceName) ·
[기타]&lt;단위&gt;] (#단위)   (특히 그것이라면[시간 또는 timestamp 변수](#timestamp-variables)단위가 형식을 지정해야 할 곳) ·
[기타]&lt;missing\\_value&gt;] (#missing_value의 값) ·
6. 마무리에 닫을 때 반복적으로 사용[팟캐스트](#dasdds)dataset description가 유효하다면, dataset가 나타나면ERDDAP™당신이 그것을 원한다.
     

InPort를 사용하여 데이터셋을 문서화하는 경우 그룹이 훌륭합니다.ERDDAP™실제 데이터를 사용할 수 있도록:

*   ERDDAP™지금 사용할 수 있는 솔루션입니다.NOAA이름 *[연구 결과에 대한 공공 액세스 (뚱 베어) 제품 정보](https://nosc.noaa.gov/EDMC/PD.DSP.php)지금, 미래의 일부 vague 시간에.
*   ERDDAP™사용자가 사용할 수있는 실제 데이터를 만들고, 메타 데이터가 아닙니다. (데이터없이 Metadata는 무엇입니까?) 
*   ERDDAP™metadata 지원 (notably, 변수의 단위) , 일부 다른 데이터 서버 소프트웨어와 달리 고려. (metadata없이 데이터는 무엇입니까?) metadata를 지원하지 않는 소프트웨어를 사용하려면 데이터를 misunder 서서 및 misused로 초대합니다.
*   ERDDAP™일부 다른 소프트웨어와 달리는 무료 및 오픈 소스 소프트웨어입니다. Ongoing 개발ERDDAP™이미 지불됩니다. 고객지원ERDDAP™사용자는 무료입니다.
*   ERDDAP's 외관은 쉽게 반영하고 당신의 그룹을 강조 할 수 있습니다 (아니다.ERD또는ERDDAP) ·
*   ERDDAP™모든 datasets에 액세스 할 수있는 일관된 방법을 제공합니다.
*   ERDDAP™많은 유형의 데이터 파일 및 관계 데이터베이스에서 데이터를 읽을 수 있습니다.
*   ERDDAP™소스 데이터가 많은 데이터 파일에 있는 데이터셋을 포함하여 대용량 데이터셋을 처리할 수 있습니다.
*   ERDDAP™netCDF, ESRI .csv 및 같은 과학 데이터 파일 형식을 포함하여 사용자의 요청에 데이터 파일의 많은 유형에 데이터를 쓸 수 있습니다.ODV .txt·
*   ERDDAP™사용자의 사양을 기반으로 데이터의 하위 세트의 사용자 정의 그래프와지도를 만들 수 있습니다.
*   ERDDAP™이미지, 비디오, 오디오 파일의 수집과 같은 비 데이터셋을 처리할 수 있습니다.
*   ERDDAP™설치 및 사용[전 세계 60개 이상의 기관](/#who-uses-erddap)·
*   ERDDAP™데이터 서버 중 하나로 나열되어 있습니다.NOAA내 계정[NOAA데이터 액세스 Procedural 지침](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), 어떤 다른 소프트웨어든지 고려되는.
*   ERDDAP™제품의NMFS/ 한국어NOAA, 그래서 그것 안에 사용NMFS이름 *NOAA자부심의 점이 있어야한다.NMFS이름 *NOAA·

견적 요청ERDDAP™인기있는 도움이 필요하면 메시지가 전송됩니다.ERDDAP™Google 그룹.
     
##### addFillValueAttributes 추가하기{#addfillvalueattributes} 
이 특별한 EDDType 선택권은 dataset 유형이 아닙니다. \\_FillValue 속성을 일부 데이터셋에서 일부 변수에 추가할 수 있는 도구입니다. 이름 *[addFillValueAttributes 추가하기](#add-_fillvalue-attributes)·
     
##### 연락처 (주){#findduplicatetime} 
이 특별한 EDDType 선택권은 dataset 유형이 아닙니다. 대신 GenerateDatasets를 말합니다. 격자의 수집을 통해 검색 Xml.nc  (및 관련) 파일 찾기 및 중복 시간 값이있는 파일의 목록을 인쇄합니다. 시간 값에서 볼 때, 원래 단위에서 변환"seconds since 1970-01-01"경우 다른 파일 사용 다른 단위 문자열. 시작 디렉토리를 제공해야 합니다. (썰매 없이 또는) , 파일 이름 정규 표현식 (예, .\\*\\.nc ) , 그리고 파일의 시간 변수의 이름.
     
##### 채용정보{#ncdump} 
이 특별한 EDDType 선택권은 dataset 유형이 아닙니다. 대신 GenerateDatasets를 말합니다. Xml를 인쇄[채용정보](https://linux.die.net/man/1/ncdump)\\-like 인쇄.nc·.ncml 또는.hdf파일. 그것은 실제로 netcdf-java를 사용합니다.[채용정보](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html)NCdump의 C 버전보다 제한된 도구입니다. 이 옵션을 사용하는 경우, GenerateDatasetsXml는 옵션 중 하나를 사용하도록 요청합니다. "-h" (기타 제품) · "-c" (연락처) , "볼" (기본 정보) , "-v var1;var2", "-v var1 (0,0:10,0:20) · 이것은 ncdump없이, 그것이 무엇인지 알기 어렵기 때문에 유용합니다..nc·.ncml 또는.hdfFile and 따라서 EDDType은 GenerateDatasets에 지정해야 합니다. Xml의 장점 한국어.ncml 파일, 이것은 ncdump 출력을 출력합니다..nc밑에 적용된 ml 파일 변화.nc또는.hdf파일.
         
### 팟캐스트{#dasdds} 
*   [ **팟캐스트** ](#dasdds)XML의 첫 번째 시도를 만든 후 사용할 수 있는 명령줄 프로그램입니다.datasets.xml· DasDds로, 당신은 XML를 반복적으로 시험하고 정제할 수 있습니다. DasDds 프로그램을 사용할 때:
    1. Windows에서 DasDds를 실행하는 첫 번째 시간은 DasDds를 편집해야합니다. 텍스트 편집기를 사용하여 java로 경로를 변경합니다. Windows가 찾을 수 있도록 exe 파일Java·
    2. DasDds는 당신을 위해 요구합니다datasetIDdataset에 대해 작업 중입니다.
    3. DasDds는 데이터 세트를 만들고datasetID·
        * DasDds는 항상 진단 메시지의 제비를 인쇄합니다.
"DasDds -verbose"를 사용하는 경우 DasDds는 평소보다 더 진단 메시지를 인쇄합니다.
        * 안전을 위해 DasDds는 항상 모든 캐시 된 데이터셋 정보를 삭제합니다. (파일 형식) dataset를 만들기 전에 dataset를 위해. 이것은 설정과 동일하다[하드 플래그](/docs/server-admin/additional-information#hard-flag)그래서 집계 된 데이터 세트, 당신은 일시적으로 fileNameRegex를 조정할 수 있습니다.
        * dataset가 로드에 실패하면 (어떤 이유) , DasDds는 중지하고 첫번째 오류에 대한 오류 메시지를 표시합니다.
             **문제가 될 수 있는지 추측하지 마십시오. ERROR 메시지를 주의 깊게 읽으십시오.**   
필요한 경우, 더 많은 clues 및 정보를 찾을 사전 진단 메시지를 읽으십시오.
        *    **dataset의 XML로 변경하여 그 문제를 해결하려고 합니다.**   
DasDds가 데이터셋을 다시 만들려고 합니다.
        *    **반복적으로 각 문제를 해결하면 결국 모든 문제를 해결합니다.**   
그리고 dataset는 적재할 것입니다.
    4. 모든 DasDds 출력 (진단 및 결과) 화면에 작성하고 *큰Parent감독* /logs/DasDds.log . . /logs/DasDds.log . . /logs/DasDds.log . /logs/DasDds.log . /logs/DasDds.log . /logs/DasDds.log . /logs/DasDds.log . /logs/DasDds.log . /logs/DasDds.log .log . /logs/DasDds.logs.log . ./ .logs/ . /logs/ .logsDds.logs.logs.logs.logs.logs/.logs.logs.logs.logs.logs.logs.logs.logs.logs.logs.logs.logs/ .logs.logs/.logs.logs/.logs.logs.logs.logs.logs.logs.logs.logs.logs
    5. DasDds가 dataset을 만들 수 있다면 DasDds는 다음 당신을 보여줍니다[· .das (Dataset 특성) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das)·[사이트맵 (Dataset 기술 제품 설명) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)·[.timeGaps의 (시간 간격) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)당신의 화면에 dataset에 대한 정보와 쓰기 *큰Parent감독* /logs/DasDds.out .
    6. 종종 dataset의 metadata 및 rerun DasDds를 청소하기 위해 dataset의 XML에 약간의 변경을 할 것입니다.

### 보너스 제삼자 공구:ERDDAP- 린트{#bonus-third-party-tool-erddap-lint} 
ERDDAP- 린트는 Rob Fuller 및 Adam Leadbetter of the Irish Marine Institute의 프로그램을 통해 메타 데이터를 향상시킬 수 있습니다.ERDDAP™데이터셋.ERDDAP-lint "contains 규칙과 간단한 정적 웹 응용 프로그램을 실행에 대한 확인 테스트ERDDAP™서버. 모든 테스트는 웹 브라우저에서 실행됩니다." 이름 *[유닉스/리눅스 lint 도구](https://en.wikipedia.org/wiki/Lint_(software)), 당신은 기존 규칙을 편집하거나 새로운 규칙을 추가 할 수 있습니다. 이름 *[ERDDAP- 린트](https://github.com/IrishMarineInstitute/erddap-lint)더 많은 정보.

이 도구는 특히 몇 시간 전에 생성 된 데이터 세트에 유용합니다. 현재 메타 데이터 선호도와 최신을 가져와야합니다. 예를 들어, GenerateDatasets의 초기 버전 Xml는 세계를 창조하기 위하여 어떤 노력을 둬지 않았습니다creator\\_name·creator\\_email, 제작자\\_type, 또는creator\\_url메타데이터 당신은 사용할 수ERDDAP-이 메타데이터 속성이 부족한 데이터셋을 식별합니다.

Rob와 Adam 덕분에이 도구를 만들고 그것을 사용할 수 있습니다ERDDAP™커뮤니티
 
## 기본 구조datasets.xml파일 형식{#the-basic-structure-of-the-datasetsxml-file} 
필수 및 옵션 태그는datasets.xml파일 형식 (그들이 나타나는 시간의 수) 아래와 같습니다. 연습, 당신의datasets.xml많이 있다&lt;dataset&gt;의 태그와 다른 태그를 사용&lt;erddapDatasets&gt; 필요에 따라.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

다른 인코딩이 미래에 허용되지만, 이제는 ISO-8859-1만 권장됩니다.
 
### 사이트맵{#xinclude} 
버전 2.25의 새로운 버전은 XInclude에 대한 지원입니다. 이것은 SAX 파서 사용을 요구합니다&lt;useSaxParser&gt;true 사용&lt;/useSaxParser&gt; 설정에서.xml. 이 파일에서 각 dataset을 작성할 수 있습니다. 다음 주에 모두 포함datasets.xml, dataset 정의의 재사용 부분, 또는 둘 다. 예를 보시려면,[다운로드](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)XInclude를 사용하여 변수 정의를 재사용합니다.
 

- - - -

## 지원하다{#notes} 

일하기datasets.xml파일은 비 trivial 프로젝트입니다. 이 모든 것을 주의 깊게 읽으십시오. 당신은 후[dataset 유형](#list-of-types-datasets), 주의깊게 그것의 상세한 묘사를 읽으십시오.
     
### Dataset 유형 선택{#choosing-the-dataset-type} 
대부분의 경우, 단지 하나가있다ERDDAP™주어진 데이터 소스에 적합한 dataset 유형. 몇 가지 경우 (₢ 킹.nc파일 형식) , 몇 가지 가능성이있다, 그러나 일반적으로 그들 중 하나는 확실히 최고입니다. 먼저 가장 큰 결정은 다음과 같습니다. 다차원 배열 그룹으로 dataset을 치료하는 것이 적절합니다. (이렇게 하면[EDDGriddataset 유형](#eddgrid)) 또는 데이터의 데이터베이스와 같은 표 (이렇게 하면[EDDTable dataset 유형](#eddtable)) ·
     
### 데이터 봉사{#serving-the-data-as-is} 
일반적으로 데이터 소스를 수정할 필요가 없습니다. (e.g., 다른 파일 유형에 파일을 변환) 그래서ERDDAP™할 수 있습니다. 가정의 한ERDDAP™데이터 소스가 사용됩니다. 일반적으로이 작품은 훌륭합니다. 몇몇 예외는:
* Relational 데이터베이스 및 Cassandra --ERDDAP™관련 데이터베이스 및 Cassandra에서 데이터를 직접 제공 할 수 있습니다. 그러나 보안, 로드 밸런싱 및 성능 문제, 같은 데이터로 다른 데이터베이스를 설정하거나 데이터를 저장할 수 있습니다NetCDFv3의.nc파일 및 있다ERDDAP™새 데이터 소스에서 데이터를 제공합니다. 이름 *[EDDTable데이터베이스](#eddtablefromdatabase)이름 *[EDDTableCassandra에서](#eddtablefromcassandra)·
* 지원되지 않은 데이터 소스 --ERDDAP™많은 유형의 데이터 소스를 지원할 수 있지만, 세계는 1000 개로 채워집니다. (수백만?) 다른 데이터 소스의 (notably, 데이터 파일 구조) · 이름 *ERDDAP™데이터 소스를 지원하지 않습니다:
    * 데이터 소스가 있다면NetCDF .nc파일, 당신은 사용할 수 있습니다[사이트맵](#ncml-files)On-the-fly의 데이터 파일을 수정하거나 사용[NCO](#netcdf-operators-nco)영구적으로 데이터 파일을 수정합니다.
    * 데이터 소스 유형에 데이터를 쓸 수 있습니다.ERDDAP™지원하다.NetCDF-3명.nc파일은 좋은, 일반적인 권고 때문에 그들은 바이너리 파일이다ERDDAP™아주 빨리 읽을 수 있습니다. 탭 데이터의 경우 수집에 데이터를 저장 고려.nc파일 사용[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged 배열 자료 구조 etc로 취급될 수 있습니다ERDDAP이름 *[EDDTableNcCFFiles에서](#eddtablefromnccffiles)). 로그인한 경우 (각 공간과 시간의 펑크에 대한 데이터) ·ERDDAP™데이터를 신속하게 추출할 수 있습니다.
    * 해당 데이터 소스에 대한 지원을 요청할 수 있습니다.ERDDAP™에 의해 이메일 Chris. noaaa.gov에서 존.
    * 해당 데이터 소스에 대한 지원을 추가 할 수 있습니다. 코드를 작성하여 자신을 처리 할 수 있습니다. 이름 *[이름 *ERDDAP™프로그래머의 가이드](/docs/contributing/programmer-guide)
* 속도 --ERDDAP™몇몇 자료 근원에서 자료를 다른 사람 보다는 매우 빨리 읽을 수 있습니다. 예를 들어, 읽기NetCDFv3의.nc파일은 빠르고 읽기 ASCII 파일은 더 느립니다. 그리고 큰 경우 (&gt;1000년) 또는 큰 (&gt;10,000원) 소스 데이터 파일 수,ERDDAP™약간의 데이터 요청으로 응답합니다. 일반적으로 차이는 인간에게 눈에 띄지 않습니다. 그러나 생각하면ERDDAP™주어진 dataset를 위해 느린, 당신은 더 능률적인 체제에 자료를 쓰기해서 문제를 해결하기 위하여 선택할지도 모릅니다 (보통: 약간, 잘 구조해,NetCDFv3의.nc파일 형식) · 탭 데이터의 경우, see[이 조언](#millions-of-files)·
         
### 힌트{#hint} 
Dataset.xml의 작업 데이터셋 설명의 복사본을 작성하여 XML을 생성하는 것이 더 쉽습니다.
    
### 특수 문자 인코딩{#encoding-special-characters} 
이름 *datasets.xmlXML 파일입니다, 당신은 MUST[& 인코딩](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;", 그리고 "&gt; "&amp;", "&lt;", 그리고 "&gt;".
잘못된 :&lt;제목&gt; 시간 & Tides&lt;/제작품
오른쪽:&lt;제목&gt; 시간 &amp; Tides&lt;/제작품
     
### XML은 구문 오류를 견딜 수 없습니다.{#xml-doesnt-tolerate-syntax-errors} 
dataset.xml 파일을 편집 한 후 결과가 확인하는 좋은 아이디어입니다.[잘 형성된 XML](https://www.w3schools.com/xml/xml_dtd.asp)XML 텍스트를 XML 검수원으로 붙여넣기[XML 유효성](https://www.xmlvalidation.com/)·
     
### 문제 해결 팁{#troubleshooting-tips} 
*    **Datasets를 가진 문제를 진단하는 다른 방법**   
두 주 외에[제품정보](#tools)·
    *   [로그.txt](/docs/server-admin/additional-information#log)모든 로그 파일입니다.ERDDAP진단 메시지.
    * 더 보기[매일 보고서](/docs/server-admin/additional-information#daily-report)datasets의 리스트를 포함한 상태 페이지보다 더 많은 정보를 가지고 있으며, 예외는 아닙니다. (오류 수정) 그들은 생성.
    * 더 보기[상태 페이지](/docs/server-admin/additional-information#status-page)확인하는 빠른 방법ERDDAP웹 브라우저의 상태. 로드하지 않은 데이터셋 목록이 포함되어 있습니다. (관련 예외는 아니지만) taskThread 통계 (의 발전을 보여주는[EDDGrid이름 *](#eddgridcopy)이름 *[EDDTable코피](#eddtablecopy)datasets와 어떤[EDDGrid파일 형식](#eddgridfromfiles)또는[EDDTable파일](#eddtablefromfiles)사용하는 datasets[캐시FromUrl](#cachefromurl)  (하지만 캐시하지 크기GB) ) ·
    * 갇혀있는 경우, 우리를 참조하십시오[더 많은 지원 얻기에 섹션](/docs/intro#support)·
         
### 특수 변수{#special-variables} 
*    **[경도, 위도, 고도 (또는 깊이) , 및 시간 (릴트) 지원하다](#destinationname) [destinationName](#destinationname)s는 특별합니다.** 
    * 일반:
        * LLAT 변수는ERDDAP™축 변수의 경우 (제품정보EDDGrid데이터셋) 또는 data 변수의 (EDDTable datasets를 위해)  [destinationName](#destinationname)"longitude", "latitude", "altitude", "depth", 또는"time"·
        * 우리는 강력하게 이러한 변수에 대한 이러한 표준 이름을 사용할 것을 권장합니다. 그들 중 하나가 요구됩니다. 이 특별한 변수 이름을 사용하지 않는 경우,ERDDAP™자신의 중요성을 인식하지 않습니다. 예를 들어, LLAT 변수는 Graph로 특별히 처리됩니다. ( *datasetID* ·) : X 축 변수가 "longitude"이고 Y 축 변수는 "latitude",지도를 얻을 것이다 (표준 투상 및 토지 마스크, 정치 경계 등) 그래프 대신.
        *   ERDDAP™메타데이터를 LLAT 변수에 자동적으로 추가 (예를 들어, "[ioos\\_category](#ioos_category)", "[단위 단위](#units)", 그리고 "\\_CoordinateAxisType"과 같은 여러 표준 관련 속성) ·
        *   ERDDAP™선택된 데이터 서브셋의 LLAT 값과 관련된 글로벌 메타데이터를 많이 추가합니다. (예를 들어, "geospatial\\_lon\\_min") ·
        * 이 메타데이터 표준을 지원하는 클라이언트는 추가 메타데이터를 활용할 수 있어 시간과 공간에 데이터를 배치할 수 있습니다.
        * 클라이언트는 변수의 이름은 모든 관련 데이터셋과 동일하기 때문에 LLAT 변수를 포함하는 쿼리를 생성하는 것이 더 쉽습니다.
    * "longitude"변수와 "latitude"변수의 경우:
        * 사용 방법[destinationName](#destinationname)s "longitude" 과 "latitude"만하면[단위 단위](#units)도 \\_east 및 도 \\_north, 각각입니다. 데이터가 이러한 요구 사항을 적합하지 않으면 다른 변수 이름을 사용하십시오. (예를 들어, x, y, lonRadians, latRadians) ·
        * 다른 단위로 표현된 경도와 위도 자료가 있는 경우에 따라서 다른destinationNames, 예를 들면, lonRadians 및 latRadians는, 도표를 만듭니다 ( *datasetID* ·) 그래프를 만들 (예를 들면, 시간 시리즈) 지도 대신.
    * "altitude"변수와 "depth"변수의 경우:
        * 사용 방법[destinationName](#destinationname)"altitude"는 해수면 위의 데이터의 거리를 확인합니다. (positive="up" 값) · 선택적으로, 당신은 바다의 밑에 부정적인 경우에 바다 수준의 밑에 거리를 위한 "altitude"를 사용할지도 모릅니다 (또는 당신이 예를 들면,
[기타]&lt;이름 =scale\\_factor" 타입="int"&gt;- 1개&lt;/att&gt;] (#scale_공장) 깊이값을 고도로 변환합니다.
        * 사용 방법destinationName"depth"는 해수면 아래 데이터의 거리를 식별합니다. (positive="down"값) ·
        * dataset는 "altitude"와 "depth"변수를 모두 가질 수 없습니다.
        * 이 변수 이름의 경우,[단위 단위](#units)"m", "미터", "미터"이어야 합니다. 단위가 다른 경우 (예를 들어, fathoms) , 당신은 사용할 수 있습니다
[기타]&lt;이름 =scale\\_factor"&gt; *이름 * 주요 특징* &lt;/att&gt;] (#scale_공장) 그리고 [&lt;att name="units"&gt; 미터&lt;/att&gt;] (#단위) 단위를 미터로 변환합니다.
        * 데이터가 이러한 요구 사항을 적합하지 않으면 다른 사용destinationName  (예를 들면, overGround, 거리 회사 소개) ·
        * 수직 CRS를 알고 있다면 메타 데이터에 지정하십시오. 예를 들어 "EPSG:5829" (해수면의 위 즉석 고도) , "EPSG:5831" (해수면의 밑에 즉석 깊이) , 또는 "EPSG:5703" (NAVD88 고도) ·
    * 제품정보"time"변수:
        * 사용 방법[destinationName](#destinationname) "time"전체 date+time을 포함하는 변수만 (또는 날짜, 그 모든 것이있다면) · 예를 들어, 날짜와 timeOfDay에 대한 별도의 열이 있으며, 변수 이름을 사용하지 않습니다."time"·
        * 이름 *[단위 단위](#time-units)시간 및 timeStamp 변수의 단위 속성에 대한 자세한 내용은.
        * 시간 변수 및 관련[시간 : Stamp 변수](#timestamp-variables)항상 소스의 시간 형식으로 데이터 값을 변환하는 것은 독특합니다. (모든 것) 숫자 값으로 (1970-01-01T00:00:00Z 이후 초) 또는 문자열 값 (ISO 8601:2004년 (₢ 킹) 지원하다) , 상황에 따라.
        * 사용자 요청 시간 데이터 때, 그들은 숫자 값으로 시간을 지정하여 요청할 수 있습니다. (1970-01-01T00:00:00Z 이후 초) 또는 문자열 값 (ISO 8601:2004년 (₢ 킹) 지원하다) ·
        *   ERDDAP™유틸리티를 가지고[숫자 변환 시간 /에서 문자열 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)·
        * 이름 *[이름 *ERDDAP거래 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)·
            
### 왜 두 가지 기본 데이터 구조?{#why-just-two-basic-data-structures} 
* 클라이언트와 컴퓨터 클라이언트가 가능한 dataset 구조의 복잡한 집합을 처리하기가 어렵기 때문에,ERDDAP™2개의 기본적인 자료 구조를 이용합니다:
    * 한국어[Gridded 데이터 구조](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (예를 들어, 위성 데이터 및 모델 데이터) 이름 *
    * 한국어[탭 데이터 구조](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (예를 들면, in-situ buoy, 역 및 trajectory 자료) ·
* 물론, 모든 데이터는 이러한 구조에서 표현 될 수 없습니다, 하지만 그것은 많은 수 있습니다. 테이블, 특히, 매우 유연한 데이터 구조 (관계 데이터베이스 프로그램의 성공 살펴보기) ·
* 이 데이터 쿼리를 쉽게 구성합니다.
* 이 데이터 응답은 단순한 구조가 있습니다. 이는 표준 파일 유형의 다양한 데이터에 쉽게 접근할 수 있도록 합니다. (종종 간단한 데이터 구조를 지원) · 이것은 우리가 설정 한 주요 이유입니다ERDDAP™이 방법.
* 이, 차례로, 우리에게 매우 쉽게 (또는 누구) 클라이언트 소프트웨어를 작성하는 것은 모두ERDDAP™데이터셋.
* 이것은 다른 소스에서 데이터를 쉽게 비교할 수 있습니다.
* 우리는 당신이 다른 데이터 구조에서 데이터를 작업하는 데 사용되는 경우 매우 aware는 처음이 접근법이 단순하거나 충분하다고 생각할 수 있습니다. 그러나 모든 자료 구조에는 tradeoffs가 있습니다. 없음은 완벽합니다. do-it-all 구조에는 그들의 downsides가 있습니다. 그들과 일하는 것은 복잡하고 파일만 쓸 수 있고 특별한 소프트웨어 도서관과 읽을 수 있습니다. 자주 묻는 질문ERDDAP그와 함께 일하기에 충분한 접근, 당신은 그것의 이점이 있다는 것을 찾아낼지도 모릅니다 (데이터 응답을 파악할 수 있는 여러 파일 유형의 지원) · 더 보기[ERDDAP™슬라이드 쇼](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (특히,[데이터 구조 슬라이드](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) 이 문제에 대해 많은 이야기.
* 그리고 심지어이 접근이 당신에게 이상한 소리, 대부분의ERDDAP™클라이언트는 결코 통지하지 않습니다 -- 그들은 단순히 데이터 세트의 모든 좋은 간단한 구조가 있고 그들은 다양한 파일 형식에서 반환된 다양한 소스에서 데이터를 얻을 수 있다는 것을 감사할 것입니다.
         
### 크기 (mm){#dimensions} 
*    **source dataset DON'T의 그리드 변수가 동일한 축 변수를 공유하는 경우?**   
내 계정EDDGriddatasets, 모든 데이터 변수 MUST 사용 (공유하기) 모든 축 변수. 그래서 소스 데이터 세트는 치수의 한 세트와 일부 변수를 가지고, 다른 크기의 다른 세트와 다른 변수, 당신은에 두 개의 데이터 세트를 만들 필요가있다ERDDAP· 예를 들어, 하나를 만들 수 있습니다.ERDDAP™"Some Title"의 데이터 세트 (지상에) "만 사용할 변수를 잡아\\[시간 :\\]\\[이름 *\\]\\[경도\\]차원과 다른 것ERDDAP™"Some Title"의 데이터 세트 (깊이에) "사용하는 변수를 파악하기\\[시간 :\\]\\[이름 *\\]\\[이름 *\\]\\[경도\\]· 또는 단일 값으로 크기를 추가하는 데이터 소스를 변경할 수 있습니다. (예를 들면, altitude=0) 변수를 생성한다.
    
    ERDDAP™더 복잡한 datasets를 취급하지 않습니다 (예를 들어, 삼각형의 메쉬를 사용하는 모델) 이름 * 이 datasets를 사용할 수 있습니다.ERDDAP™두 개 이상의 데이터 세트를 만들기ERDDAP™  (그래서 각 새로운 dataset의 모든 데이터 변수는 축 변수의 동일한 집합을 공유) , 하지만 그 사용자가 원하는 것은 아닙니다. 몇몇 datasets를 위해, 당신은 dataset의 일정한 gridded 버전을 만들고 본래 자료 이외에 제안할지도 모릅니다. 일부 클라이언트 소프트웨어는 일반 그리드 만 처리 할 수 있으므로이 작업을 수행하면 추가 클라이언트에 도달합니다.
     
    
### Projected Gridded 데이터{#projected-gridded-data} 
몇몇 gridded 자료에는 복잡한 구조가 있습니다. 예를 들어, 위성 레벨 2 ("곡 트랙") 데이터는 간단한 투상을 사용하지 않습니다. 모델러 (기타) 종종 다양한 비 원통형 투사 데이터와 함께 작업 (예를 들면, conic, 극 스테레오 그래픽, tripolar) 또는 unstructured 격자에서 (더 복잡한 데이터 구조) · 일부 최종 사용자는이 데이터를 원하는대로, 그래서 정보의 손실이 없습니다. 그 고객을 위해,ERDDAP™데이터를 제공 할 수 있습니다.ERDDAP™관리자는 몇 가지 데이터 세트로 원래 데이터 세트를 깰, 같은 축 변수를 공유하는 변수를 포함한 각 부분. 예, 그것은 사람들이 참여하는 확률이 보인다, 그것은 대부분의 다른OPeNDAP서버. 한국어ERDDAP™많은 형식에서 사용할 수있는 데이터를 강조합니다. 가능한 한ERDDAP™use/requires 더 균일 한 데이터 구조. 조금 어둡지만 (i.e., 예상보다 다른) ·ERDDAP™계획된 자료를 배포할 수 있습니다.

\\[예,ERDDAP™데이터 구조를 위한 느슨한 필요조건이 있을 수 있었습니다, 그러나 산출 체재를 위한 필요조건을 지킵니다. 그러나 그것은 많은 사용자 중 혼란에 이어, 특히 초보자, 다른 구조와 데이터에 대한 많은 겉보기로 유효한 요청 때문에 데이터가 파일 유형에 적합하지 않기 때문에. 우리는 현재 체계의 디자인에 돌아갑니다.\\]

일부 최종 사용자는 다른 상황에서 쉽게 사용할 수 있도록 Equirectangular / plate carrée 또는 Mercator와 같은 lat lon 원통형 투사에 데이터를 원합니다. 이러한 상황에서 우리는 격려ERDDAP™다른 소프트웨어를 사용하는 관리자 (NCO·Matlab· 사이트맵 IDV는? ...?) data를 지리적으로 재구성 (직사각형 투사 / 판 carrée) 또는 다른 원통형 투사 및 데이터의 형태를ERDDAP™다른 dataset로. 이것은 그들이 위성 레벨 2 데이터를 수준 3 데이터로 변환 할 때 어떤 사람들와 유사합니다. 그런 도구는[NCO](https://nco.sourceforge.net/nco.html#Regridding)regridding 데이터에 대한 확장 옵션을 제공합니다.

#### GIS 및 Reprojecting 데이터{#gis-and-reprojecting-data} 
GIS 세계는 종종지도 중심이기 때문에 GIS 프로그램은 일반적으로 데이터를 재구성하기위한 지원을 제공합니다, 즉, 다른 투사와지도에 데이터를 플로팅.

현재,ERDDAP™reproject 데이터에 도구가 없습니다. 대신 데이터셋의 변형을 만들기 위해 외부 도구를 사용하는 것이 좋습니다. 데이터가 직사각형에 원래 형태로 재구성 된 곳 (위도 경도) 적당한 배열ERDDAP·

우리의 의견에서, CF/DAP세계는 GIS 세계에서 약간 다르며 약간 낮은 수준에서 작동합니다.ERDDAP™그 반사. 일반적으로,ERDDAP™data로 일하기 위하여 디자인됩니다 (지도 없음) 변경하고 싶지 않아 (프로젝트) 그 데이터. 제품 정보ERDDAP™, gridded 자료는 수시로/보통/preferably lat lon 가치와 원통 모양 투상과 관련되고, 몇몇 투상의 x,y 가치 아닙니다. 어떤 경우,ERDDAP™데이터의 투상과는 아무것도하지 않습니다; 그것은 단지 데이터를 통과, 으로, 현재의 투상, reprojection는 데이터에 상당한 변화가 있다는 이론에,ERDDAP™중요한 변화와 관련이 없습니다. 또한, 이후 사용자는 데이터를 다시 재구성 할 수 있습니다. 즉, 한 번의 리프로젝션을 수행하지 않을 것입니다. (그래서,ERDDAP™관리자는 다른 투사, 벌금에 데이터를 제공하려는; 그냥 데이터 오프라인을 다시 시작하고 다른 데이터 세트로 제공ERDDAP· 위성 기반 데이터 세트의 랏은 NASA 통화 수준 2로 제공된다 (뚱 베어) 레벨 3 (견적 요청) 버전.) 시간 :ERDDAP™맵 만들기 (직접 또는 통해WMS또는 KML) ·ERDDAP™현재 Equirectangular / plate carrée projection과 함께 맵을 만들 수있는 유일한 제안이 가장 매핑 프로그램에 의해 허용됩니다.

우리는 격려합니다ERDDAP™다른 소프트웨어를 사용하는 관리자 (NCO·Matlab· 사이트맵 IDV는? ...?) data를 지리적으로 재구성 (직사각형 투사 / 판 carrée) 또는 다른 원통형 투사 및 데이터의 형태를ERDDAP™다른 dataset로. 이것은 그들이 위성 레벨 2 데이터를 수준 3 데이터로 변환 할 때 어떤 사람들와 유사합니다. 그런 도구는[NCO](https://nco.sourceforge.net/nco.html#Regridding)regridding 데이터에 대한 확장 옵션을 제공합니다.

우리는 희망ERDDAP™앞으로의 다른 계획과지도를 제공하는 내장 도구가 있습니다. 우리는 또한 미래에 GIS 세계에 더 나은 연결을 희망 (현재 보다는 다른WMS제품정보) · 그것은이 "현대"세계에서 끔찍하다, CF / 사이 링크DAP세계와 GIS 세계는 여전히 약합니다. 두 가지는 두 가지 목록입니다. (당신이 돕고 싶은 경우에, 연결에 notablyERDDAP™to MapServer, 이메일을 보내 주시기 바랍니다 Chris. noaaa.gov의 존.) 
    
### 데이터 유형{#data-types} 
ERDDAP™다음 데이터 유형 지원
 (이름은 민감합니다;'u'prefix는 "unsigned"를 뜻합니다. 다른 시스템에 있는 많은 이름은 조금의 수입니다) ::

#### 사이트맵{#byte} 
*    **사이트맵** -128에서 127의 범위로 정수 값을 서명했습니다.
다른 시스템에서, 이것은 때때로 int8 호출됩니다.
이것은 SQL과 Cassandra에 의해 "tinyint"라고합니다.
    ERDDAP™변환하기[한국어](#boolean-data)몇몇 근원에서 (e.g., SQL 및 Cassandra) 바이트로ERDDAP™0=false, 1=true, 127=의 값으로missing\\_value·
#### 우바이트{#ubyte} 
*    **우바이트** 0 ~ 255 범위의 정수 값을 지정했습니다.
다른 시스템에서는 때때로 uint8라고합니다.
#### 뚱 베어{#short} 
*    **뚱 베어** -32768에서 32767 범위로 정수 값을 서명했습니다.
다른 시스템에서, 이것은 때때로 int16이라고 불립니다.
이것은 SQL과 Cassandra에 의해 "smallint"라고합니다.
#### 뚱 베어{#ushort} 
*    **뚱 베어** 0 ~ 65535 범위의 정수 값을 지정했습니다.
다른 시스템에서는 때때로 uint16라고합니다.
#### 뚱 베어{#int} 
*    **뚱 베어** 2147483647에 -2147483648의 범위를 가진 정수 값을 서명했습니다.
다른 시스템에서는 때때로 int32라고합니다.
이것은 "integer라고합니다.|한국어 (·) "SQL과 "int"로 Cassandra.
#### 뚱 베어{#uint} 
*    **뚱 베어** 0 ~ 4294967295 범위의 정수 값을 지정했습니다.
다른 시스템에서는 때때로 uint32라고합니다.
#### 긴 수명{#long} 
*    **긴 수명** -9223372036854775808에서 9223372036854775807의 범위를 가진 정수 가치 서명했습니다.
다른 시스템에서는 때때로 int64라고합니다.
이것은 "bigint라고합니다.|한국어 (·) "SQL과 "bigint"에 의해 Cassandra.
많은 파일 유형이 긴 데이터를 지원하지 않기 때문에, 그들의 사용은 discouraged입니다. 가능한 경우 대신 더블 사용 (더 보기) ·
#### 로드 중 ...{#ulong} 
*    **로드 중 ...** 0 ~ 18446744073709551615 범위의 정수 값
다른 시스템에서는 때때로 uint64라고합니다.
많은 파일 유형이 ulong 데이터를 지원하지 않기 때문에, 그들의 사용은 discouraged입니다. 가능한 경우 대신 더블 사용 (더 보기) ·
#### 팟캐스트{#float} 
*    **팟캐스트** 대략 +/- 3.402823466e+38의 범위를 가진 IEEE 754 float입니다.
다른 시스템에서, 이것은 때때로 float32라고합니다.
이것은 "real이라고합니다.|팟캐스트 (·) |댓글 RSS (·) |한국어 (·) Cassandra의 SQL 및 "float"에 의해 ".
특별한 값 NaN은 Not-a-Number를 의미합니다.
    ERDDAP™NaN에 긍정적이고 부정적인 불평 값을 변환합니다.
#### 더블 더블{#double} 
*    **더블 더블** IEEE 754 이중으로 약 범위
+/- 1.7976931348623157E+308.
다른 시스템에서, 이것은 때때로 float64라고합니다.
이것은 "두 배 정밀도라고합니다.|팟캐스트 (·) |댓글 RSS (·) |한국어 (·) "SQL과 Cassandra에 의해 "더블".
특별한 값 NaN은 Not-a-Number를 의미합니다.
    ERDDAP™NaN에 긍정적이고 부정적인 불평 값을 변환합니다.
#### ₢ 킹{#char} 
*    **₢ 킹** 단 하나, 2 바이트 (16 비트)  [유니코드 UCS-2 문자](https://en.wikipedia.org/wiki/UTF-16)의 범위\\u0000  (₢ 킹) 제품정보\\uffff  (전화기:+86-21-52551666 팩스:+86-21-52551) ·
    \\uffff's 정의는 NaN의 두 배 가치에 아날로그 Not-a-Character입니다.
숯의 사용은 많은 파일 유형이 숯을 지원하지 않거나 1 바이트 숯만 지원하지 않기 때문에 차별됩니다. (더 보기) · 대신 문자열을 사용하여 고려하십시오.
사용자는 char 변수를 사용하여 그래프를 만들 수 있습니다.ERDDAP™숫자 데이터로 사용할 수 있는 유니코드 코드 포인트 번호로 문자를 변환합니다.
#### 스트레이트{#string} 
*    **스트레이트** 0 이상의 순서, 2 바이트 (16 비트)  [유니코드 UCS-2 문자](https://en.wikipedia.org/wiki/UTF-16)·
    ERDDAP™use/interprets a 0-length string as a 누락된 값.ERDDAP™true null 문자열을 지원하지 않습니다.
이론적 인 최대 문자열 길이는 2147483647 문자이지만 다소 짧은 문자열과도 다양한 장소에 다양한 문제가 있습니다.
제품 정보ERDDAP's String for SQL's character, varchar, character varying, binary, varbinary, interval, array, multiset, xml, and any other database data type that doesn't fit cleanly with any otherERDDAP™데이터 유형.
제품 정보ERDDAPCassandra 's String for Cassandra's "text" 과 다른 어떤 Cassandra data type that doesn't fit cleanly 와ERDDAP™데이터 유형.
     

이전 다음ERDDAP™v2.10,ERDDAP™integer 형식을 내부적으로 지원하지 않고 데이터 리더 및 작가의 제한된 지원을 제공하지 않았습니다.
    
### Data Type 제한{#data-type-limitations} 
당신은 생각할 수 있습니다ERDDAP™가상 데이터셋을 가지고 있는 시스템으로 데이터셋의 소스를 내부 데이터 모델로 읽고 데이터를 다양한 서비스(e.g.,(OPeN)DAP·WMS) 및 사용자 요청에 응답의 파일 유형.

* 각 입력 리더는 데이터 유형의 하위 세트를 지원합니다.ERDDAP™지원하다. 데이터 읽기ERDDAP's 내부 데이터 구조는 문제가 없습니다.
* 각 산출 작가는 또한 자료 유형의 subset를 지원합니다. 그 때문에 문제입니다.ERDDAP긴 데이터를 지원하지 않는 파일 유형에 예를 들어 긴 데이터가 있습니다.
     

아래는 제한의 설명입니다 (또는 없음) 다양한 출력 작가 및 방법ERDDAP™문제와 거래. 이러한 합병증은 inherent 부분입니다.ERDDAPinteroperable disparate 체계의 목표.

#### 사이트맵{#ascii} 
* 사이트맵 (사이트맵.tsv등) 텍스트 파일 -
    * 모든 수치 데이터는 문자열 표현을 통해 작성됩니다. (0 길이 문자열로 표시되는 누락된 데이터 값) ·
    * 그러나ERDDAP™ASCII 텍스트 파일, 많은 독자에게 정확하고 ulong 값 쓰기 (e.g., 스프레드 시트 프로그램) 긴 값과 ulong 값으로 올바르게 처리하지 않고 두 배 값으로 변환 할 수 없습니다. (몇몇 경우에 있는 정밀도의 손실) ·
    * Char 및 String data는 JSON String을 통해 작성되며, 모든 유니코드 문자를 처리합니다. (아마, ASCII #127, 예를 들어, 유로 문자 "\\u20ac"로 나타납니다) ·
    
        
#### 구글 맵{#json} 
* 구글 맵 (.json·.jsonlCSV등) 텍스트 파일 -
    * 모든 숫자 데이터는 문자열 표현을 통해 작성됩니다.
    * Char와 String data는 JSON String으로 작성되며, 모든 유니코드 문자를 처리합니다. (아마, ASCII #127, 예를 들어, 유로 문자 "\\u20ac"로 나타납니다) ·
    * 모든 숫자 데이터 유형의 미스링 값은 null로 나타났습니다.
         
#### .nc3 파일{#nc3-files} 
*   .nc3개의 파일은 기본적으로 어떤 unsigned integer 자료 유형을 지원하지 않습니다. CF v1.9의 앞에, CF는 불신뢰한 정수 유형을 지원하지 않았습니다. 이 작업을 수행ERDDAP™2.10+는 NUG 표준을 따르고 항상 "true" 또는 "false"의 값으로 "\\_Unsigned" 속성을 추가하여 데이터가 할당되거나 서명되지 않은 변수를 나타냅니다. 모든 integer 속성은 서명 된 속성으로 작성됩니다. (예를 들어, 바이트) 서명 값(예: ubyteactual\\_range0 ~ 255 값을 가진 속성은 0 ~ -1 값으로 바이트 속성으로 나타났습니다. (아웃 범위 값의 두 가지의 보완 값). (signed) integer 속성이 표시되지 않은 속성으로 읽을 수있는 쉬운 방법이 없습니다.ERDDAP™읽을 때 "\\_Unsigned" 속성을 지원.nc3 파일.
*   .nc3개의 파일은 긴 또는 ulong 자료 유형을 지원하지 않습니다.ERDDAP™이 작업을 일시적으로 변환하여 두 배의 변수가 될 것입니다. 두 배는 +/- 9,007,199,254,740,992까지 모든 가치를 정확하게 표현할 수 있습니다 2^53입니다. 이것은 불완전한 해결책입니다.Unidata사소한 업그레이드를 거부.nc3 이 및 관련 문제, 인용.nc4개 (주요 변화) 해결책으로.
* CF 사양 (v1.9의 앞에) 숯 데이터 유형을 지원했지만 숯이 숯의 건물 블록으로만 예정되어 효과적으로 묶는 것은 불연합니다. 메일링 리스트에 대한 질문은 답을 혼동합니다. 이 합병증 때문에, 그것은에서 char 변수를 방지하는 것이 가장 좋습니다ERDDAP™가능한 한 문자열 변수를 사용합니다.
* 한국어.ncASCII-encoded를 가진 3개의 파일만 지원되는 끈 (7 비트, #0 - #12) 이름 * 이름 * (이름 *ERDDAP) 확장하다 (시작 ~2017) "ISO-8859-1"의 값을 가진 속성 "\\_Encoding"을 포함함으로써 (각 8 비트 문자의 모든 256 값을 정의하는 ASCII의 확장) 또는 문자열 데이터를 인코딩하는 방법을 나타내는 "UTF-8". 다른 인코딩은 법적일 수 있지만 discouraged.
         
#### .nc4 파일{#nc4-files} 
*   .nc4개의 파일 지원 모두의ERDDAP데이터 유형.
    
#### NCCSV 파일{#nccsv-files} 
NCCSV 1.0 파일은 무수한 정수 데이터 유형을 지원하지 않습니다.
[NCCSV 1.1+ 파일](/docs/user/nccsv-1.00)모든 unsigned integer 데이터 유형 지원.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII 파일 및 .dods 바이너리 파일) - - -
    *   (OPeN)DAP짧고, ushort, int, uint, float 및 더블 값을 올바르게 처리합니다.
    *   (OPeN)DAP"byte" 데이터 유형이 존재하며, 실제로, THREDDS 및ERDDAP™"byte"를 처리했습니다.(OPeN)DAP서비스. 이 더 나은 거래,ERDDAP™2.10+는 NUG 표준을 따르고 항상 "true"또는 "false"의 값으로 "\\_Unsigned" 속성을 추가하여 데이터가 무엇인지 나타냅니다.ERDDAP™호출 바이트 또는 ubyte. 모든 바이트와 ubyte 속성은 서명 값 (예를 들어, ubyteactual\\_range0 ~ 255 값을 가진 속성은 0 ~ -1 값으로 바이트 속성으로 나타났습니다. (아웃 범위 값의 두 가지의 보완 값). "byte" 속성이 ubyte 속성으로 읽을 수 없다는 것을 알 수있는 방법이 없습니다.
    *   (OPeN)DAP서명 또는 서명되지 않은 긴을 지원하지 않습니다.ERDDAP™이 작업을 일시적으로 변환하여 두 배의 변수와 속성이 될 수 있습니다. 두 배는 9,007,199,254,740,992까지 모든 가치를 정확하게 표현할 수 있습니다 2^53입니다. 이것은 불완전한 해결책입니다.OPeNDAP  (회사연혁) 사소한 업그레이드를 거부DAP2.0 이 및 관련 문제, 인용DAP4개 (주요 변화) 해결책으로.
    * 이름 *(OPeN)DAP별도의 숯 데이터 유형이 없으며 기술적으로 1 바이트 ASCII 문자를 지원하지 않습니다. (#0 - #12) 문자열에서 char data variables는 1-character-long Strings로 나타날 것입니다.(OPeN)DAP.das, .dds 및 .dods 응답.
    * 기술적으로,(OPeN)DAPASCII-encoded 문자로 문자열만 지원 (#0 - #12) · 이름 * (이름 *ERDDAP) 확장하다 (시작 ~2017) "ISO-8859-1"의 값을 가진 속성 "\\_Encoding"을 포함함으로써 (각 8 비트 문자의 모든 256 값을 정의하는 ASCII의 확장) 또는 문자열 데이터를 인코딩하는 방법을 나타내는 "UTF-8". 다른 인코딩은 법적일 수 있지만 discouraged.
         
### Data Type 댓글{#data-type-comments} 
* 긴, ulong 및 많은 파일 유형의 char 데이터에 대한 가난한 지원 때문에, 우리는 이러한 데이터 유형의 사용을 차별ERDDAP· 가능한 경우, 긴과 우롱 대신 두 배를 사용하며, 차 대신 문자열을 사용합니다.
     
* 메타데이터 -(OPeN)DAP's .das 및 .dds 응답은 긴 또는 ulong 속성 또는 데이터 유형을 지원하지 않습니다 (그리고 대신 두 배로 표시) , 대신 사용할 수 있습니다ERDDAPmetadata의 tabular 표현http· erddap/ **(주)** / 한국어 *datasetID* HTML 웹 페이지 (예를 들어,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (다른 파일 유형, 예를 들어, .csv,.htmlTable·.itx·.json·.jsonlCSV1·.jsonlCSV·.jsonlKVP·.mat·.nc·.nccsv·.tsv·.xhtml) 또는.nccsvMetadata 응답 (예를 들어,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)한국어.nccsvMetadata는 tabular datasets에서만 가능합니다.) , 모든 자료 유형을 지원하는 둘 다 (, 긴, ulong 및 차) ·
         
### 미디어 파일{#media-files} 
모든 데이터는 숫자 또는 텍스트의 배열입니다. 일부 데이터 세트는 이미지, 오디오 및 비디오 파일과 같은 미디어 파일을 포함하고 있습니다.ERDDAP™미디어 파일에 대한 액세스를 얻기 위해 쉽게 만들 수있는 몇 가지 특수 기능이 있습니다. 그것은 2 단계 과정입니다:
 

1. byte 범위 요청을 지원하는 시스템을 통해 자신의 URL을 통해 액세스 할 수있는 각 파일을 만드십시오.
이 작업을 수행하는 가장 쉬운 방법은 디렉토리에 파일을 넣어ERDDAP™접속하다 (그들은 용기에 있다면.zip파일, 압축 해제, 당신이 제공 할 수 있지만.zip파일에 너무.) 그런 다음[EDDTable파일이름](#eddtablefromfilenames)dataset 을 통해 접근 가능한 그 파일을 만들기ERDDAP™, 확실히 통해ERDDAP이름 *["files"시스템](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)·
    
모든 파일은 EDDTableFromFileNames를 통해 접근 가능ERDDAP이름 *"files"시스템 지원[byte 범위 요청](https://en.wikipedia.org/wiki/Byte_serving)· 정상적으로, 클라이언트 때 (e.g., 브라우저) URL에 요청을, 그것은 응답으로 전체 파일을 가져옵니다. 그러나 byte 범위 요청으로, 요청은 파일에서 바이트의 범위를 지정하고 서버는 그 바이트를 반환합니다. 이 파일은 byte 범위 요청을 통해 액세스 할 수 있는 경우에만 브라우저의 오디오 및 비디오 플레이어가 작동하기 때문에 관련이 있습니다.
    
선택 사항: 관련 미디어 파일이있는 하나의 데이터 세트가 있다면, 각 그룹에 대한 하위 폴더가있는 하나의 EDDTableFromFileNames를 만들 수 있습니다. 장점은 새로운 데이터 세트에 대한 새로운 미디어 파일을 추가 할 때, 당신이해야 할 모든 새로운 폴더를 만들고 그 폴더에 파일을 넣어. 폴더와 파일은 EDDTableFromFileNames dataset에 자동으로 추가됩니다.
    
2. 선택 사항: 미디어 파일에 대한 참조를 포함하는 데이터 세트가있는 경우, 추가ERDDAP·
예를 들어, .csv 파일이 있을 수 있습니다. 각 시간 누군가가 그 광경과 관련된 이미지 파일의 이름을 포함하는 고래와 열을 보았다. 이미지 파일의 이름은 파일 이름, 예를 들어, Img20141024T192403Z, 전체 URL이 아니라면 추가해야합니다.[파일AccessBase Url 및 / 또는 파일AccessSuffix](#fileaccessbaseurl)metadata에 속성dataVariablebaseURL과 그 파일명에 대한 suffix를 지정합니다. EDDTableFromFileNames를 통해 액세스 할 수있는 파일을 만든 경우 URL은 양식에있을 것입니다.
     *사이트맵* /erddap/파일/ *datasetID* / 한국어
예를 들어,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
거기에 있다면.zip또는 데이터 변수와 관련된 모든 미디어 파일과 다른 컨테이너 파일, 우리는 또한 사용자가 액세스 할 수있는 파일을 만드는 것이 좋습니다 (단계 1 위) 그리고 그 후에 그것을 확인합니다[파일AccessArchive 뚱 베어](#fileaccessarchiveurl)이름 *
    

\\[시작하다ERDDAP™v1.82의\\]위의 첫 번째 단계를 수행하면 (또는 두 단계) , 다음 사용자가 볼 때ERDDAP™ "files"그 dataset를 위한 체계 (또는 dataset의 하위 세트를 참조하십시오..htmlTable요청, 두 번째 단계가 된 경우) ·ERDDAP™filename의 왼쪽에 '?' 아이콘을 표시합니다. 이 아이콘을 통해 사용자가 이미지를 보여주는 팝업 또는 오디오 플레이어 또는 비디오 플레이어를 볼 수 있습니다. 브라우저는 제한된 수의 유형만 지원합니다.

* 이름 * (파일 형식: .gif, .jpg, .png) ·
* 언어: 영어 (보통 .mp3, .ogg 및 .wav) ·
* 동영상 파일 (보통 .mp4, .ogv 및 . 사이트맵) ·

지원은 다른 운영 체계에 다른 브라우저의 다른 버전과 변화합니다. 그래서 당신이 제공 할 파일 유형의 선택이 있다면,이 유형의 제안을 의미한다.

또는 사용자가 표시된 파일명에서 클릭한 경우ERDDAP™웹 페이지, 브라우저는 이미지, 오디오 또는 비디오 파일을 별도의 웹 페이지로 표시합니다. 이것은 매우 큰 이미지 또는 비디오가 팝업 대신 풀 스크린에 확장하는 것을 매우 유용합니다.
    
### AWS S3 파일로 작업{#working-with-aws-s3-files} 
[Amazon 웹 서비스 (사이트맵) ](https://aws.amazon.com)의 판매[클라우드 컴퓨팅](https://en.wikipedia.org/wiki/Cloud_computing)서비스.[사이트맵](https://aws.amazon.com/s3/)AWS가 제공하는 객체 저장 시스템입니다. 전통적인 파일 시스템의 감독 및 파일 대신 (PC에서 하드 드라이브처럼) , S3는 "objects"를 붙드는 다만 "buckets"를 제안합니다 (우리는 그들을 호출합니다"files") ·

ASCII 파일 (예를 들어, .csv) ·ERDDAP™물통에 있는 파일과 직접 작동할 수 있습니다. 할 필요가있는 유일한 것은 지정합니다.&lt;fileDir&gt; AWS 버킷의 특정 형식을 사용하여 dataset에 대한, 예를 들어, https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ · 사용 안 함&lt;캐시FromUrl&gt; . 자세히 보기

그러나 바이너리 파일 (₢ 킹.nc, .grib, .bufr, 그리고.hdf파일 형식) , 당신은 사용을 필요로 합니다&lt;cacheFromUrl&gt; 시스템 아래에 설명.ERDDAP, netcdf 자바 (이름 *ERDDAP™이 파일에서 데이터를 읽는 용도) , 및 다른 과학적인 자료 소프트웨어는 제안하는 전통적인 파일 시스템에 있는 파일로 일하기 위하여 디자인됩니다[블록 레벨](https://en.wikipedia.org/wiki/Block-level_storage)파일 연결 (파일의 펑크를 읽을 수 있음) S3만 제공[파일 수준 (기타 제품) ](https://en.wikipedia.org/wiki/Block-level_storage)파일 연결 (전체 파일을 읽을 수 있음) · AWS는 S3에 대안을 제공합니다,[회사 소개 (사이트맵) ](https://aws.amazon.com/ebs/)), 파일에 구획 수평 접근을 지원하는 그러나 S3 보다는 더 비싼, 그래서 자료 파일의 대량 저장을 위해 드물게 사용됩니다. (그래서 사람들이 구름에 데이터를 저장한다고 말할 때 (사이트맵) 저렴 한, 그것은 일반적으로 오렌지 비교에 사과입니다.) 

#### S3 버킷{#s3-buckets} 
 **물통의 내용. 키. 객체. Delimiters.**   
기술적으로, S3 물통은 컴퓨터에 파일 체계 같이 계층 파일 구조에서 조직되지 않습니다. 대신, 물통은 "objects"를 포함 (파일 형식) , "키"가 있는 각 (이름 *) · noaa-goes17 버킷의 키의 예

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
해당 객체의 대응 URl은

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS는 URL이 어떻게 구성되었는지에 약간의 변화를 지원하지만,ERDDAP™이 1개의 특정한 체재를 요구합니다:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
그것은 일반적인 연습, 이 예제와 같이, 키 이름은 계층 경로와 파일 이름과 같은 보이는, 하지만 기술적으로 그들은 아니다. 그것은 일반적이 고 유용,ERDDAP™/'s 를 가진 키는 hierarchical path plus file name 이며, 이 문서는 다음과 같습니다. 버킷의 키가 사용하지 않는 경우 /의 (예를 들어, 같은 열쇠
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), 다음ERDDAP™긴 파일 이름으로 전체 키를 치료합니다.

개인 대 공공 버킷 -- S3 버킷의 관리자는 버킷과 그 내용의 공개 또는 개인을 만들 수 있습니다. 공개적으로 버킷의 모든 파일이 파일 URL을 사용하여 누구나 다운로드 할 수 있습니다. Amazon은[열린 Data](https://aws.amazon.com/opendata/)public datasets를 호스트하는 프로그램 (데이터 포함NOAA, NASA 및 미국) 무료 및 그 버킷에서 파일을 다운로드 할 수 없습니다. 버킷이 개인이라면, 버킷의 파일은 공인된 사용자 및 AWS 요금으로만 액세스할 수 있습니다. (일반적으로 물통의 소유자에 의해 지불) 비-AWS S3 컴퓨터에 파일을 다운로드합니다.ERDDAP™대중과 개인 물통에 있는 자료로 일할 수 있습니다.

#### AWS 자격{#aws-credentials} 
그렇게 만들기ERDDAP™개인 물통의 내용을 읽을 수 있습니다, 당신은 AWS credentials를 필요로 하고 당신은 표준 장소에 있는 credentials 파일을 저장해야 합니다ERDDAP™자주 묻는 질문 AWS SDK 보기Java2.x 문서:[기본 자격 설정](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)· (값을 저장하는 옵션Java명령 줄 매개변수 in\\[뚱 베어\\]/bin/setenv.sh는 좋은 선택권일지도 모릅니다.) 
#### AWS /파일/{#aws-files} 
* /files/시스템 -- 더 보기ERDDAP™ [/files/시스템](#accessibleviafiles)사용자는 dataset에 소스 파일을 다운로드 할 수 있습니다. 소스 파일을 다운로드하려는 많은 사용자가 원본 소스 파일을 다운로드하고 있기 때문에 소스 파일이있는 모든 데이터 세트에 이것을 켜는 것이 좋습니다.
    * 파일이 개인 S3 버킷에 있다면, 파일을 다운로드하는 사용자의 요청이 처리됩니다.ERDDAP™, 파일에서 데이터를 읽을 것입니다 그리고 그 후에 사용자에게 전송, 따라서 당신의 짐 증가ERDDAP™, 들어오고 나가는 대역폭을 사용하고, 당신을 만들기 (이름 *ERDDAP™관련 기사) AWS에 데이터 egress 수수료를 지불합니다.
    * 파일이 공개 S3 버킷에 있는 경우, 파일을 다운로드하는 사용자의 요청은 AWS S3 URL로 그 파일로 리디렉션됩니다. 따라서 데이터가 흐르지 않습니다.ERDDAP™, 따라서 짐을 위에 감소시키십시오ERDDAP· 그리고 Amazon Open Data에 있는 경우 (무료 와이파이) 공중 물통, 그 후에 당신 (이름 *ERDDAP™관련 기사) AWS에 데이터 egress 수수료를 지불하지 않습니다. 따라서, 대중에서 큰 이점 서빙 자료가 있습니다 (아니다.) S3 버킷 및 Amazon Open Data에서 데이터를 제공하는 거대한 장점 (무료 와이파이) 물통.

#### ERDDAP™AWS S3 버킷{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™AWS S3 버킷** ](#erddap-and-aws-s3-buckets)  
다행히, 많은 노력 후에,ERDDAP™S3의 블록 레벨 액세스와 함께 작업의 inherent 문제를 처리 할 수있는 여러 가지 기능이 있습니다.

*   \\[법적 고지: AWS S3 버킷과 작업은 많은 추가 작업입니다. AWS는 서비스 및 기능의 거대한 생태계입니다. 많이 배울 수 있습니다. 그것은 시간과 노력이 걸립니다, 그러나 그것은 할 수 있습니다. 환자와 당신은 일을 얻을 것이다. 도움을위한 Look/ask
(주)[AWS 문서](https://aws.amazon.com/documentation/gettingstarted/), 웹사이트[스택 오버플로](https://stackoverflow.com/), 그리고 일반
    [ERDDAP™지원 옵션](/docs/intro#support)) if/when 당신이 붙어 있는 경우에.\\]  
     
* S3 버킷의 파일 디렉토리 구조 및 파일 이름을 찾을 수 없습니다.ERDDAP™이 문제를 위한 해결책이 있습니다: EDDTableFromFileNames에는 특별한 있습니다[\\*\\*\\*fromOn더플라이](#fromonthefly)사용자가 S3 버킷의 내용을 검색 할 수있는 EDDTableFromFileNames 데이터 세트를 만들 수있는 옵션 (파일 다운로드) dataset를 통해"files"옵션. 있습니다.[아래 예제](#viewing-the-contents-of-a-bucket)·
     
*   ERDDAP™데이터 읽기[외부 압축 데이터 파일](#externally-compressed-files), 그래서 S3에 파일을 저장하면 괜찮습니다.gz·.gzip·.bz2, .Z, 또는 다른 유형의 외부 압축 데이터 파일, 극적으로 할 수 있습니다 (2개 - 20X) 파일 저장 비용을 삭감하십시오. S3에서 더 작은 파일을 전송하여 저장된 시간 이후, 외부 압축 파일을 사용하기위한 시간이 없습니다.ERDDAP대략 균형 여분 시간 필요ERDDAP™파일 압축. 이 기능을 사용하려면 dataset의 확인해야 합니다.&lt;파일이름Regex&gt; 압축 파일 형식을 허용 (e.g., 추가 (|.gz) regex의 끝에) ·
     
* 가장 일반적인 경우, 어디 당신은ERDDAP™테스트 / 개발을위한 PC에 설치하고 데이터 세트가 S3 버킷의 개체로 저장되는 바이너리 데이터 파일이있는 경우 데이터 세트를 얻기위한 하나의 접근법ERDDAP™이름:
    1. PC에 디렉토리를 작성하여 몇 가지 테스트 데이터 파일을 보유합니다.
    2. 소스에서 만든 디렉토리에 두 개의 데이터 파일을 다운로드합니다.
    3. 제품 정보[생성데이터셋Xml](#generatedatasetsxml)chunk를 생성하기 위해datasets.xml두 로컬 데이터 파일에 근거한 dataset를 위해.
    4. dataset가 원하는 것과 같이 작동합니다.[팟캐스트](#dasdds)당신의 지역ERDDAP·
        
         **다음 단계는 dataset의 사본을 만듭니다 (S3 버킷에서 데이터를 얻을 것) 대중의ERDDAP·** 
        
    5. chunk를 복사datasets.xmldataset에 대한datasets.xml대중을 위한ERDDAP™그것은 데이터를 봉사한다.
    6. 본문 바로가기ERDDAP로컬 하드 드라이브는 임시 파일의 캐시를 잡아. 디렉토리는 많은 디스크 공간을 사용하지 않습니다. (아래 cacheSizeGB를 참조하십시오.) ·
    7. dataset의 값 변경&lt;fileDir&gt; tag 그래서 그냥 만든 디렉토리에 포인트 (디렉토리가 비어있더라도) ·
    8. 더 보기[캐시FromUrl](#cachefromurl)dataset의 물통 이름과 선택적인 접두사를 지정하는 꼬리표 (i.e., 디렉토리) 특정한[Aws S3 URL 형식ERDDAP™견적 요청](#accessing-files-in-an-aws-s3-bucket)·
    9. 한국어&lt;캐시 크기GB&gt;] (#cachefromurl의 경우) dataset의 XML에 태그 (e.g., 10는 대부분의 datasets를 위한 좋은 가치입니다) 이름 *ERDDAP™로컬 캐시의 크기를 제한하기 (i.e., 원격 파일의 모든 캐시하려고하지 마십시오) ·
    10. 대중에서 작동하는 경우ERDDAP· 첫 번째 시간ERDDAP™dataset를 적재하기 때문에, 그것은 적재하는 장시간을 가지고 갈 것입니다,ERDDAP™모든 데이터 파일을 다운로드하고 읽을 필요가 있습니다.
        
dataset가 거대한 Gridded 데이터 파일의 거대한 컬렉션 인 경우, 이것은 매우 오랜 시간이 걸릴 것입니다. 몇몇 경우에, gridded 자료 파일을 위해,ERDDAP™필요한 정보를 추출할 수 있습니다. (e.g., 그리드 데이터 파일의 데이터의 시간 지점) 파일 이름에서이 문제를 피합니다. 이름 *[집회 파일 이름](#aggregation-via-file-names-or-global-metadata)·
        
    11. 옵션으로 (특히 EDDTableFromFiles 데이터셋) , 당신은 추가할 수 있습니다[뚱 베어](#nthreads)dataset에 태그를 붙입니다.ERDDAP데이터에 대한 사용자의 요청에 응답 할 때 1 이상의 스레드를 사용합니다. 이 때 발생하는 지연의 효과를 최소화ERDDAP™data 파일 읽기 (원격 제어) AWS S3 버킷은 로컬 캐시와 (아마) 그들을 압축.

#### AWS S3 오픈 데이터{#aws-s3-open-data} 
현재 위치NOAA이름 *[Big Data 프로그램](https://www.noaa.gov/nodd/about)·NOAAAWS를 포함한 다섯 개의 조직과 파트너십을 맺고, "더 많은 배포를 필요로하지 않고 데이터를 직접 컴퓨팅 할 수 있도록 클라우드의 주요 관측 및 모델 출력의 저장 사본의 잠재적 이점을 탐구하기 위해". AWS는 datasets를 포함합니다 그것에서 얻NOAA프로그램의 일부로 큰 컬렉션에 대한 공공 액세스 제공[AWS S3에 데이터 열기](https://registry.opendata.aws/)어떤 컴퓨터에서 Amazon compute 인스턴스인지 (임대된 컴퓨터) AWS 네트워크 또는 어떤 네트워크에서 자신의 PC에. 아래 예제는 공개적으로 접근 가능한 데이터 세트와 함께 작업하고 있습니다.

#### AWS S3 버킷의 액세스 파일{#accessing-files-in-an-aws-s3-bucket} 
개인 S3 데이터 버킷의 소유자는 버킷에 액세스해야합니다. (AWS 문서 보기) 

모든 경우 AWS SDK가 필요하므로 AWS 계정이 필요합니다.Java  (이름 *ERDDAP™버킷의 내용에 대한 정보를 검색) AWS 계정 자격 증명을 요구합니다. (더 많은) 

ERDDAP™AWS S3 Buckets만 접근할 수 있습니다.&lt;캐시FromUrl&gt;] (#cachefromurl의 경우) (주)&lt;fileDir&gt;) 특정 형식으로:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
이름 *

* BucketName은 버킷 이름의 짧은 형태입니다, 예를 들어 noaaa-goes17 .
* aws-region, e.g., us-east-1, 테이블 중 하나에있는 "Region"열에서[AWS 서비스 종료점](https://docs.aws.amazon.com/general/latest/gr/rande.html)버킷이 실제로 있습니다.
* 접두사는 선택 사항입니다. 현재, 그것은 끝해야'/'·

예를 들어, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
이 URL 형식은 AWS S3 권고 중 하나입니다.[버킷 접근](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)이름 *[접두사의이 설명](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html)·ERDDAP™버킷 URL과 옵션 접두사를 지정하려면 하나의 URL로 결합해야 합니다.&lt;cacheFromUrl&gt; (또는&lt;fileDir&gt;) 파일이 있습니다.

#### 공중 AWS S3 물통을 시험하십시오{#test-public-aws-s3-buckets} 
공개 버킷의 경우 브라우저의 AWS S3 디렉토리의 버킷 URL을 테스트하고, 예를 들어,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)버킷 URL이 정확하고 적합하다면ERDDAP, XML 문서를 반환합니다. (이름 *) 그 버킷의 내용 목록. 불행히도, 전체 URL (i.e., 버킷 URL 플러스 접두사) 이름 *ERDDAP™주어진 dataset를 원하면 브라우저에서 작동하지 않습니다. AWS는 브라우저에서 쉽게 버킷의 계층을 검색 할 수있는 시스템을 제공하지 않습니다. (부정확한 경우, Chris에게 이메일을 보내십시오. noaaa.gov에서 존. 그렇지 않으면, 아마존,이에 대한 지원을 추가하십시오&#33;) 

#### 버킷의 내용보기{#viewing-the-contents-of-a-bucket} 
S3 버킷은 종종 파일의 두 가지 범주를 포함, 가짜 하위 디렉토리의 몇, 이는 몇 가지가 될 수ERDDAP™데이터셋. 으로ERDDAP™datasets, 시작 디렉토리를 알아야 합니다.&lt;cacheFromUrl&gt; (또는&lt;fileDir&gt;) 및 파일의 하위 설정 식별 파일 이름의 형식. 브라우저의 버킷 전체 내용을 보려면 S3가 먼저 1000 파일을 보여 주면 충분합니다. 현재 버킷의 모든 내용을 볼 수있는 가장 좋은 방법은 버킷을 만드는 것입니다.[EDDTable파일이름](#eddtablefromfilenames)데이터셋 (PC에서ERDDAP™그리고/또는 당신의 공중에ERDDAP) , 디렉토리 구조를 검색하고 파일을 다운로드 할 수있는 쉬운 방법을 제공합니다. 더 보기&lt;fileDir&gt; 위의 URL이 될 것입니다, 예, https://noaa-goes17.s3.us-east-1.amazonaws.com ·\\[왜 AWS S3가 AWS 계정없이이 작업을 할 수있는 빠르고 쉬운 방법을 제공합니까?\\]나는 비 아마존 네트워크에 내 PC에 이것을 할 때, 아마존은 속임수에 대한 응답을 느리게 나타납니다 (약 100 (·) chunk 당 파일) 첫 번째 몇 척 후 (chunk 당 1000의 파일) 다운로드 버킷이 많은 파일이 있을 수 있기 때문에 (noaaa-goes17 은 26 백만) , 버킷의 모든 내용을 얻을 수 있습니다 EDDTableFromFileNames 몇 시간 (예, 12&#33;) 끝으로.\\[아마존은 맞습니까?&#33;\\]

#### EDDTable 만들기 FromFileNames AWS S3 버킷과 데이터 세트{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
만약 당신이 물통 이름이 있는 경우, 하지만 이미 S3 버킷의 파일 목록 또는 버킷의 관련 파일의 위치를 식별, EDDTableFromFileNames 데이터 세트를 만들기 위해 아래의 지침을 사용 하 여 S3 버킷의 디렉토리 계층을 검색할 수 있습니다ERDDAP이름 *"files"시스템.

1. AWS 계정 열기
    ERDDAP™사용 방법[AWS SDK를 위한Java](https://docs.aws.amazon.com/sdk-for-java/index.html)AWS에서 버킷 정보를 얻기 위해, 그래서 당신은 필요[AWS 계정 생성 및 활성화](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)· 그것은 꽤 큰 일, 학습에 많은 것들.
     
2. AWS Credentials를 넣어ERDDAP™찾을 수 있습니다.
자주 묻는 질문[AWS Credentials 및 개발 지역 설정](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)·ERDDAP™  (특히 AWS SDKJava) AWS 자격 증명을 찾을 수 있습니다. 이름 *ERDDAP™자격 증명을 찾을 수 없습니다.
다운로드 IllegalArgumentException: 프로파일 파일은 null 오류가 없습니다.ERDDAP's log.txt 파일.
    
Linux 및 Mac OS 용 Hint : 자격 증명 파일은 Tomcat을 실행하는 사용자의 홈 디렉토리에 있어야합니다. (이름 *ERDDAP)   (이 단락을 위해, 우리는 user=tomcat을 가정할 것입니다) ~/.aws/credentials라는 파일에서. /home/tomcat -- 실제로 cd ~ 운영 체제가 ~ user=tomcat을 생각하는 곳을 찾을 수 있음을 가정하지 마십시오. 존재하지 않는 경우 디렉토리를 만듭니다. 또한, 파일에 대한 credentials 파일을 넣어 한 후, 파일에 대한 사용자 및 그룹이 tomcat이고, chmod 400 credentials를 사용하여 파일이 user=tomcat에 대한 읽기 전용인지 확인합니다.
    
3. 버킷 URL 만들기[파일 형식ERDDAP™견적 요청](#accessing-files-in-an-aws-s3-bucket), 예를들면
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)· (대중적인 물통) 브라우저에서 테스트하여 그 버킷의 내용을 나열한 XML 문서를 반환합니다.
     
4. 제품 정보[생성데이터셋Xml](#generatedatasetsxml)더 보기[EDDTable파일이름](#eddtablefromfilenames)데이터 세트:
    * 시작 디렉토리에 대 한, 이 구문을 사용:
        \\*\\*이름 * *에서OnTheFly,* 당신의BucketUrl*
예를 들어,
        \\*\\*\\*fromOn더플라이, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * 파일 이름 regex? ·
    * 반복? 한국어
    * 관련 제품 모든 분? 10080년
    *   infoUrl· https://registry.opendata.aws/noaa-goes/
 
    * 기관?NOAA
    * 요약? 이름 * (ERDDAP™decent Summary를 자동으로 생성합니다.) 
    * 이름 * 이름 * (ERDDAP™decent title을 자동으로 생성합니다.) 평소처럼, 당신은 정확한 확인하기 위해 XML을 편집하고 데이터 세트의 펑크 전에 개선을해야합니다datasets.xml·
5. 위의 지시를 따르고 dataset을로드하면ERDDAP, 당신은 EDDTableFromFiles 데이터셋을 만들었습니다. 예를 들어, AWS Open Data Buckets에서 파일을 검색하고 다운로드하기 위해 누구나 쉽게 만들려면 EDDTableFromFileNames datasets를 만들었습니다 (목록을 참조)
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) 거의 모든[AWS S3는 자료 물통을 엽니다](https://registry.opendata.aws/)·
    \\[우리가 포함하지 않은 몇 개의 버킷에는 루트 디렉토리에 많은 파일이 있습니다. (합리적인 시간에 다운로드 할 수 있습니다) , 또는 공공 액세스 허용하지 않습니다 (그들은 모두 공개되어야합니까?) , 또는 Requester 급여 물통입니다 (예, Sentinel) ·\\]  
클릭하시면"files"이 데이터셋 중 하나에 대한 링크는 S3 버킷의 디렉토리 트리 및 파일을 검색할 수 있습니다. 방법 때문에\\*\\*\\*fromOnTheFly EDDTableFromFiles 작품, 이 디렉토리 목록은 항상 완벽하게 최신이기 때문에ERDDAP™을 얻 그 에 a-fly. 디렉토리 트리를 실제 파일 이름로 클릭하고 파일 이름을 클릭합니다.ERDDAP™AWS에서 파일을 직접 다운로드 할 수 있도록 AWS S3에 요청을 리디렉션합니다. 그런 파일을 검사 할 수 있습니다.
    
트러블?
EDDTableFromFiles가 로드되지 않을 경우ERDDAP™  (또는 DasDds) , 오류 메시지에 대한 log.txt 파일을 찾습니다. 당신이 볼 경우
다운로드 IllegalArgumentException: 프로필 파일은 null 오류가 될 수 없습니다, 문제는 AWS SDK가Java  (에 의해ERDDAP) credentials 파일을 찾을 수 없습니다. 위의 자격 지침을 참조하십시오.
     

AWS가 단순히 브라우저를 사용하여 공용 버킷의 내용을 볼 수 있도록 허용하지 않는 것은 불행하지 않습니다.

 **그런 다음ERDDAP™사용자가 파일에 액세스하는 데이터 세트.**   
자주 묻는 질문[ERDDAP™S3 버킷](#erddap-and-aws-s3-buckets)  (이름 *) ·
위에 만든 샘플 EDDTableFromFileNames dataset의 경우, 디렉토리 트리의 디렉토리 및 파일 이름과 함께 작은 포킹을 수행하면 최상위 디렉토리 이름이 명확하게됩니다. (예, ABI-L1b-RadC) 관련 기사ERDDAP™별도의 데이터셋을 호출합니다. 당신이 일하는 물통은 유사할지도 모릅니다. 별도의 데이터 세트를 만들 수 있습니다.ERDDAP™그 datasets의 각각을 위해, 예를 들면,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
으로&lt;cacheFromUrl&gt;. 불행히도, 이 특정한 예를 위해, 물통에 있는 자료 세트는 1개 수준 2 datasets이기 위하여 봅니다,ERDDAP™ [특히 좋지 않습니다.](#dimensions)dataset가 다른 크기를 사용하는 변수의 더 복잡한 컬렉션이기 때문에.
     
    
### NcML 파일{#ncml-files} 
NcML 파일을 지정할 수 있습니다.NetCDF  (v3 또는 v4)  .nc, .grib, .bufr 또는.hdf  (v4 또는 v5) 파일, 그리고 그 후에 있다ERDDAP™치료하기.nc소스 파일로 ml 파일.ERDDAP™datasets는 받아들입니다.ncml 파일.nc파일이 예상됩니다. NcML 파일은 확장.ncml입니다. 이름 *[UnidataNcML 문서](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)· NcML은 당신이 그것을 가진 몇몇 일을 할 수 있기 때문에 유용합니다 (예를 들어, 수집에 다른 파일에 다른 변경을 만들고, 파일에 특정 값으로 크기를 추가) , 당신은 할 수 없습니다ERDDAP이름 *datasets.xml·

* 변경 사항.ncml 파일의 lastModified 시간은 dataset가 재로드 될 때마다 재로드 될 파일이 발생하지만, underlying으로 변경됩니다..nc데이터 파일은 직접 통지되지 않습니다.
* 힌트: NcML는 입니다\\*이름 *\\*NcML 파일의 일부 항목의 순서에 민감한. NcML의 생각으로 지정된 순서의 일련의 지시를 지정하고, 소스 파일을 변경하는 의도 (NcML 파일의 시작/위에 상태) 대상 파일로 (NcML 파일의 끝/바닥에 국가) ·

NcML의 대안은[NetCDF회사 소개 (NCO) ](#netcdf-operators-nco)· 큰 차이는 NcML이 변화하는 것을 위한 체계입니다 (그래서 소스 파일은 변경되지 않습니다) , 어디NCO변경할 수 있습니다. (또는 새 버전의) 파일. 둘 다NCONcML은 매우 유연하고 파일을 생각할 수있는 거의 모든 변화를 만들 수 있습니다. 둘 다를 위해, 그것은 당신이해야 하는 무슨을 정확하게 파악하는 것을 도전할 수 있습니다 -- 유사한 예를 위한 웹을 검사하십시오. 둘 다 netCDF를 준비하는 유용한 도구입니다.HDF파일 사용ERDDAP, notably, 무엇을 넘어 변화ERDDAP조작 시스템은 할 수 있습니다.

예제 #1: 단일 값으로 시간 치수 추가
현재 위치.nc새로운 외부 차원을 창조하는 ml 파일 (시간, 1 값 : 1041379200) 그리고 A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km라는 파일에서 사진 변수에 그 크기를 추가합니다..nc::
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
예제 #2: 기존 시간 값 변경
자주 묻는 질문.nc파일이 이미 시간과 시간의 값을 가지고 있지만, 값은 잘못 (당신의 목적) · 이름 *.ncml 파일 말한다: ""19810825230030-NCEI라는 데이터 파일에 대 한...", 차원 변수에 대 한"time", 단위 속성은 1970-01-01T00:00:00Z 이후 '둘째로 설정하고 367588800로 시간 값을 설정합니다.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDF회사 소개 (NCO)  {#netcdf-operators-nco} 
"NETCDF 운영자 (NCO) netCDF를 가지고 있는 명령행 프로그램\\[v3 또는 v4\\]·HDF \\[v4 또는 v5\\]·\\[.grib의 .bufr,\\]및/또는DAP입력으로 파일, 다음 작동 (e.g., 새로운 자료, compute 통계, 인쇄, 하이퍼스랩, metadata 조작) 그리고 텍스트, 바이너리 또는 netCDF 형식으로 화면 또는 파일에 결과를 출력합니다.NCOgridded 과학적인 자료의 aids 분석. 포탄 결합 작풍의NCO사용자가 상호 작용하는 파일을 조작하고 분석 할 수 있습니다. 또는 고급 프로그래밍 환경의 일부 오버 헤드를 피하는 표현 스크립트가 있습니다. (이름 *[NCO](https://nco.sourceforge.net/)홈페이지) ·

자주 묻는 질문NCO이름 *[사이트맵](#ncml-files)· 큰 차이는 NcML이 변화하는 것을 위한 체계입니다 (그래서 소스 파일은 변경되지 않습니다) , 어디NCO변경할 수 있습니다. (또는 새 버전의) 파일. 둘 다NCONcML은 매우 유연하고 파일을 생각할 수있는 거의 모든 변화를 만들 수 있습니다. 둘 다를 위해, 그것은 당신이해야 하는 무슨을 정확하게 파악하는 것을 도전할 수 있습니다 -- 유사한 예를 위한 웹을 검사하십시오. 둘 다 netCDF를 준비하는 유용한 도구입니다.HDF파일 사용ERDDAP, notably, 무엇을 넘어 변화ERDDAP조작 시스템은 할 수 있습니다.

예를 들어, 사용할 수 있습니다.NCO의 단위를 만들려면 일정한 원래 일관되게되지 않은 파일 그룹에 일관성있는. 또는, 당신은 사용할 수 있습니다NCO지원하다scale\\_factor이름 *add\\_offset파일 그룹에서scale\\_factor이름 *add\\_offset다른 소스 파일에 다른 값이 있다.
 (또는, 당신은 지금 그 문제를 처리 할 수 있습니다ERDDAP™이름 *[EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked), 이는 변종의EDDGridfromNcFiles에서 포장된 데이터를 풀고 값이 낮은 수준으로 표준화하여 다른 컬렉션 파일을 처리할 수 있습니다.scale\\_factors와add\\_offset, 또는 다른 시간 단위.) 

NCO무료 및 오픈 소스 소프트웨어입니다.[GPL 3.0 이상](https://www.gnu.org/licenses/gpl-3.0.html)이름 *

예제 #1: 단위 일관성 만들기
EDDGrid파일 및 EDDTable 파일에서 주어진 변수에 대한 단위는 모든 파일에서 동일합니다. 몇몇의 파일이 trivially인 경우에 (기능적으로) 다른 사람 (예, 시간 단위)
1970-01-01 00:00:00 UTC 이후의 두 번째
"seconds since 1970-01-01T00:00:00Z", 당신은 사용할 수 있었습니다NCO이름 *[뚱 베어](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). 모든 파일에서 단위를 변경하는 것은 동일합니다
nco/ncatted - 단위, 시간, o, c의 1970-01-01T00:00:00Z' \\*부터 두번째.nc  
\\[EDDTable에서 같은 많은 문제를 위해... 파일 datasets, 당신은 지금 사용할 수 있습니다[표준화 이름 *](#standardizewhat)이름 *ERDDAP소스 파일을 표준화하기 위해ERDDAP·\\]
    
### Dataset의 크기에 제한{#limits-to-the-size-of-a-dataset} 
당신은 아래에 "2 억"에 많은 참조를 볼 수 있습니다. 더 정확하게, 그것은 2,147,483,647에 참고입니다 (2^31-1) 32 비트의 최대 값은 정수를 서명했습니다. 일부 컴퓨터 언어에서 예를 들어Java  (이름 *ERDDAP™에 게시 됨) , 그것은 많은 자료 구조를 위해 사용될 수 있는 가장 큰 자료 유형입니다 (예를 들어, 배열의 크기) ·

문자열 값 (예를 들어, 변수 이름, 속성 이름, 문자열 속성 값 및 문자열 데이터 값) , 문자열 당 문자의 최대 수ERDDAP™~2억원 그러나 거의 모든 경우에, 문자열이 합리적인 크기를 초과하면 작거나 큰 문제가있을 것입니다. (e.g., 80자 변수 이름과 속성 이름, 그리고 대부분의 문자열 속성 값과 데이터 값에 대한 255자) · 예를 들어, 긴 변수 이름을 표시하는 웹 페이지는 awkwardly 넓고 긴 변수 이름은 응답 파일 유형의 한계를 초과하면 truncated 것입니다.

gridded datasets를 위해:

* 최대 수axisVariables는 2 억입니다.
최대 수dataVariables는 2 억입니다.
그러나 dataset에는 &gt;100 변수가 있는 경우, 사용자가 사용할 수 있는 커다란 것입니다.
그리고 dataset가 &gt;1 백만개의 변수가 있는 경우, 서버는 많은 물리적 메모리를 필요로 하고 다른 문제가 있을 것입니다.
* 각 차원의 최대 크기 (axisVariable) ~2 억 값입니다.
* 나는 세포의 최대 총 수 생각 (모든 차원 크기의 제품) 무제한이지만 ~9e18일 수 있습니다.

tabular datasets를 위해:

* 최대 수dataVariables는 2 억입니다.
그러나 dataset에는 &gt;100 변수가 있는 경우, 사용자가 사용할 수 있는 커다란 것입니다.
그리고 dataset가 &gt;1 백만개의 변수가 있는 경우, 서버는 많은 물리적 메모리를 필요로 하고 다른 문제가 있을 것입니다.
* 소스의 최대 수 (예를 들어, 파일) 집계는 2 억입니다.
* 일부 경우에, 개인 소스에서 행의 최대 수 (예를 들어, 파일이지만 데이터베이스가 아닙니다.) ~2 억 줄입니다.
* 다른 제한이 없습니다.

Gridded와 tabular datasets 둘 다를 위해, 단 하나 요구에 의해 요구될 수 있는 subset의 크기에 몇몇 내부 한계가 있습니다 (자주 관련 &gt;2 억의 뭔가 또는 ~9e18 뭔가) , 그러나 사용자가 파일 유형 별 한계를 명중 할 가능성이 훨씬 더 있습니다.

*   NetCDF버전 3.nc파일은 2GB 바이트로 제한됩니다. (누군가에게 문제가 있다면, 나를 알고: 나는 지원을 추가 할 수 있었다NetCDF버전 3.nc64 비트 확장 또는NetCDF버전 4, 이는 한계를 크게 늘리고 있지만 무한하지 않을 것입니다.) 
* 브라우저는 데이터의 단지 ~500MB 후 충돌, 그래서ERDDAP™응답 제한.htmlTable~400MB의 데이터 요청.
* 많은 데이터 분석 프로그램이 비슷한 한계가 있습니다. (예를 들어, 차원의 최대 크기는 종종 ~2 억 값입니다.) , 그래서 file-type-specific limits 주변을 얻기 위해 열심히 일하는 이유가 없습니다.
* file-type-specific limits는 진정한 엄청난 양의 데이터를 막는 데 유용하다. (예를 들어, 데이터셋이 데이터셋이 20TB의 데이터셋이 있을 때 "이 dataset의 모든 것") 몇 주 또는 달을 다운로드 할 것입니다. 더 긴 다운로드, 더 가능성이 그것은 다양한 이유로 실패합니다.
* file-type-specific limits는 사용자가 합리적인 크기의 서브셋을 처리하는 데 유용합니다. (예를 들어, 한 번에 한 번에 데이터로 파일을 통해 큰 Gridded dataset 처리) ·
         
### ACDD-1.3로 전환{#switch-to-acdd-13} 
제품정보 (뚱 베어[생성데이터셋Xml](#generatedatasetsxml)) 현재 추천[ACDD 버전 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)2015년 초에 쥐가고 있는 , 글로벌 컨벤션 속성에서 "ACDD-1.3"라고 불립니다. 이름 *ERDDAP™버전 1.62 (2015년 6월 출시) ·ERDDAP™중고/추천 원본, 버전 1.0,[NetCDFDataset Discovery에 대한 Attribute 협약](https://wiki.esipfed.org/ArchivalCopyOfVersion1)"라고 함UnidataDataset Discovery v1.0" 글로벌 컨벤션 및Metadata\\_Conventions이름 *

ACDD의 데이터셋이 이전 버전인 경우, ACDD-1.3으로 전환하는 것이 좋습니다. 그것은 어렵지 않습니다. ACDD-1.3은 버전 1.0과 매우 뒤로 호환됩니다. 모든 datasets를 위한 스위치에 (이름 *EDDGridInErddap 및 EDDTable 사용 FromErddap 데이터셋) ::

1. 새로 발굴된 글로벌 제거Metadata\\_Conventions으로 add (또는 기존의 변경Metadata\\_Conventions이름 *)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
데이터셋의 글로벌&lt;addAttributes&gt;.
     
2. dataset이 글로벌에 있는 Conventions 속성이 있는 경우&lt;addAttributes&gt;, 모든 변경 "UnidataDataset Discovery v1.0"에 참조 "ACDD-1.3".
dataset가 글로벌에 있는 Conventions 속성이 없는 경우&lt;addAttributes&gt;, 다음 ACDD-1.3을 나타내는 것을 추가하십시오. 예를 들어,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. dataset이 글로벌 경우standard\\_name\\_vocabulary속성, 값의 형식을 변경하시기 바랍니다, 예를 들어,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
참고가 이전 버전의 경우[CF 표준 이름 테이블](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)· 그것은 아마도 현재 버전으로 전환하는 좋은 아이디어입니다. (65, 우리가 이것을 쓰고) , 새로운 표준 이름은 그 테이블에 그 이후 버전 추가되었지만, 오래된 표준 이름은 거의 deprecated 결코 제거되지 않습니다.
     
4. ACDD-1.0은 글로벌 속성을 포함하지만creator\\_name·creator\\_email·creator\\_url·[생성데이터셋Xml](#generatedatasetsxml)몇 시간 전에 자동으로 추가하지 않았다ERDDAP™v1.50입니다. 이것은 중요한 정보입니다:
        
    *   creator\\_name사용자가 dataset의 제작자를 알 수 있습니다.
    *   creator\\_email사용자가 dataset에 대한 질문이있는 경우 dataset의 제작자에게 연락하는 선호 이메일 주소를 알려줍니다.
    *   creator\\_url사용자가 제작자에 대해 더 많은 것을 찾을 수있는 방법을 제공합니다.
    *   ERDDAP™FGDC 및 ISO 19115-2/19139 메타데이터 문서를 생성 할 때이 정보를 모두 사용합니다. 이 문서는 외부 검색 서비스에 의해 자주 사용됩니다.
    
dataset의 글로벌에 이러한 속성을 추가하십시오.&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
그게 다. 나는 너무 열심히하지 않았다.
     
### 로드 중 ...{#zarr} 
버전 2.25로ERDDAP™읽을 수 있습니다 Zarr 파일 사용[EDDTableFromNcFiles는](#eddtablefromncfiles)이름 *[EDDGrid파일 형식](#eddgridfromncfiles)·

 (2019년 8월 현재) 우리는 쉽게 잘못 될 수 있지만, 우리는 아직 확신하지[로드 중 ...](https://github.com/zarr-developers/zarr-python), 또는 더 작은 펑크로 데이터 파일을 깰 유사한 시스템은 문제의 큰 솔루션입니다ERDDAP™Amazon AWS S3와 같은 클라우드 서비스에 저장된 데이터를 읽으십시오. Zarr은 다양한 상황에서의 유용성을 보여준 훌륭한 기술입니다.ERDDAP+S3는 그 상황 중 하나입니다. Zarr의 모든 데이터를 저장하기 위해 노력하기 전에, 실제로 더 나은 솔루션인지 볼 수있는 몇 가지 테스트를 수행 할 수 있습니다.

구름에 접근 데이터와 문제는 대기 (lag to first get data – 품질 협력 업체 중국에서) 파일 수준 접근 (block-level 보다는 오히려 접근) · Zarr은 파일 수준의 액세스 문제를 해결하지만 지연에 대해 아무것도하지 않습니다. 파일 다운로드 비교 (그래서 블록 레벨 액세스와 로컬 파일로 읽을 수 있습니다.) , Zarr은 Zarr과 같은 지연 문제를 exacerbate 할 수있다, 파일을 읽고 지금 여러 통화의 시리즈를 포함 파일의 다른 부분을 읽을 수 (각자의 lag) · 지연 문제는 요청을 병렬화하여 해결 될 수 있지만 Zarr에 따라 더 높은 수준의 솔루션입니다.

그리고 Zarr (관련 데이터베이스) , 우리는 데이터 파일이 간단한, 쉽게 무결성을 확인 할 수있는 단일 파일, 또는 make/download a copy of.

ERDDAP™  (v2의) URL 소스에서 파일의 로컬 캐시를 유지하기위한 시스템 (예, S3) (필수)&lt;cacheFromUrl&gt;와&lt;캐시최대GB&gt;] (#cachefromurl의 경우) ). 그리고 새로운 [&lt;₢ 킹 (한국어) 높은 수준의 데이터 검색을 병렬화하여 대기시간 문제를 최소화해야 합니다.&lt;cacheFromUrl&gt;는 많은 시나리오에 대해 매우 잘 작동합니다. (우리는 얼마나 유익한지 모르겠습니다.&lt;nThreads&gt;는 더 시험 없이 입니다.) 우리는 좋은 네트워크 연결을 가진 AWS 인스턴스에 타이밍 테스트를 수행하지 않았지만, 우리는 파일의 다양한 원격 URL 소스로 성공적으로 테스트했습니다. 이름 *ERDDAP이름 *&lt;cacheFromUrl&gt; 모든 유형의 데이터 파일과 함께 작동합니다. (₢ 킹.nc·.hdf, .csv의.jsonlCSV) 외부 압축 경우에도 (₢ 킹.gz) , 파일의 변경 없이 (e.g., Zarr 컬렉션으로 다시 작성) ·

그것은 다른 시나리오가 다른 솔루션을 호의 할 가능성이, 예를 들어, 한 번 파일의 일부를 읽을 필요가 (Zarr 승리) , 대. 한 번 모든 파일을 읽을 필요가, 대. 반복된 파일의 일부 또는 모든 부분을 읽을 필요가 (&lt;cacheFromUrl&gt;가 승리합니다.

Zarr의 모든 데이터를 저장하기 위해 노력하기 전에, 실제로 더 나은 솔루션인지 볼 수있는 몇 가지 테스트를 수행 할 수 있습니다.

- - - -
## Types Datasets의 목록{#list-of-types-datasets} 
필요한 경우 적절한 dataset 유형 선택, 참조[Dataset 유형 선택](#choosing-the-dataset-type)·

datasets의 유형은 2개의 종류로 떨어졌습니다. ([왜?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)datasets 핸들 gridded 자료.
    * 내 계정EDDGriddatasets, 데이터 변수는 데이터의 다차원 배열입니다.
    * 각 치수의 축 변수가 있습니다. Axis variables MUST는 데이터 변수가 그(것)들을 사용한다는 순서로 지정됩니다.
    * 내 계정EDDGriddatasets, 모든 데이터 변수 MUST 사용 (공유하기) 모든 축 변수.
         ([왜?](#why-just-two-basic-data-structures) [그렇지 않으면?](#dimensions)) 
    * 분류된 차원 가치 - 모든 것EDDGriddatasets, 각 차원 MUST는 분류한 순서에서 일 것입니다 (ascending 또는 후손) · 각각은 불규칙하게 간격을 붙일 수 있습니다. 아무 것도 없습니다. 이것은의 필요조건입니다[CF 메타데이터 표준](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)· 어떤 차원의 값이 정렬되지 않은 경우, dataset는 로드되지 않고ERDDAP™로그 파일에 첫 번째 취소 된 값을 식별합니다. *큰Parent감독* /logs/log.txt 파일 형식
        
몇 가지 하위 클래스에는 추가 제한이 있습니다 (notably,EDDGridAggregateExistingDimension은 외부 (왼쪽, 첫 번째) 차원이 간결되어야합니다.
        
Unsorted 치수 값은 거의 항상 소스 데이터 세트와 문제를 나타냅니다. 가장 일반적으로 잘못되거나 부적절한 파일이 집계에 포함될 때 발생합니다. 이 문제를 해결하려면 오류 메시지를 참조하십시오.ERDDAP™log.txt 파일이 종료된 시간값을 찾을 수 있습니다. 그런 다음 해당 파일을 찾을 소스 파일에서 (또는 그 후에 1) 그것은 집계에 속하지 않습니다.
        
    * 더 완전한 설명보기[EDDGrid데이터 모델](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)·
    * 더 보기EDDGriddataset 유형은:
        *   [EDDGrid파일 형식](#eddfromaudiofiles)로컬 오디오 파일 그룹에서 데이터를 수집합니다.
        *   [EDDGrid사이트맵](#eddgridfromdap)데이터 처리DAP서버.
        *   [EDDGridInEDDTable에서](#eddgridfromeddtable)지정된 dataset을 gridded dataset로 변환합니다.
        *   [EDDGrid언어: en](#eddfromerddap)원격에서 Gridded 데이터를 처리ERDDAP·
        *   [EDDGrid서포토](#eddgridfrometopo)내장 ETOPO 토피 데이터를 처리합니다.
        *   [EDDGrid파일 형식](#eddgridfromfiles)모두의 수퍼 클래스EDDGrid...Files 클래스에서.
        *   [EDDGrid파일 형식](#eddgridfrommergeirfiles)지역 MergeIR 그룹에서 데이터 수집.gz파일.
        *   [EDDGrid파일 형식](#eddgridfromncfiles)로컬 그룹에서 데이터를 집계NetCDF  (v3 또는 v4)  .nc관련 파일.
        *   [EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked)변종은EDDGridfromNcFiles는 로컬 그룹에서 데이터를 집계합니다.NetCDF  (v3 또는 v4)  .nc관련 파일,ERDDAP™낮은 수준에서 포장.
        *   [EDDGrid론PM180](#eddgridlonpm180)아이의 경도값을 수정EDDGrid그들은 범위 -180에서 180이다.
        *   [EDDGrid론0360](#eddgridlon0360)아이의 경도값을 수정EDDGrid그들은 범위 0에서 360입니다.
        *   [EDDGrid사이드 바이트](#eddgridsidebyside)2개 이상의 집계EDDGrid측에 의하여 datasets 측.
        *   [EDDGridAggregateExisting디멘션](#eddgridaggregateexistingdimension)2개 이상의 집계EDDGriddatasets는, 첫번째 차원을 위한 다른 가치의 있는 각, 그러나 다른 차원을 위한 동일한 가치.
        *   [EDDGrid이름 *](#eddgridcopy)다른 지역 복사본을 만들 수 있습니다.EDDGrid's data and serves data from the local copy. 이 데이터는 다음과 같습니다.
             
    * 모든 것EDDGriddatasets는 nThreads 설정을 지원한다.ERDDAP™요청에 응답 할 때 사용하는 많은 스레드가 얼마나. 이름 *[뚱 베어](#nthreads)자주 묻는 질문
         
### 연락처{#eddtable} 
*   [ **연락처** ](#eddtable)datasets 손잡이 tabular 자료.
    * 탭 데이터는 행과 열을 가진 데이터베이스와 같은 테이블으로 표현할 수 있습니다. 각 란 (a data 변수) name, 속성 세트, 저장 단지 하나의 유형의 데이터. 각 행에는 관측이 있습니다. (또는 관련 값의 그룹) · 데이터 소스는 다른 데이터 구조, 더 복잡한 데이터 구조 및/또는 여러 데이터 파일에 데이터를 가질 수 있지만ERDDAP™소스 데이터를 데이터베이스와 같은 테이블에 평평하게 할 수 있어야합니다.ERDDAP·
    * 더 완전한 설명보기[EDDTable 자료 모형](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)·
    * EDDTable dataset 유형은:
        *   [EDDTable모든 데이터 세트](#eddtablefromalldatasets)다른 모든 데이터셋에 대한 정보가 있는 고급 데이터셋입니다.ERDDAP·
        *   [EDDTableAsciiFiles에서](#eddtablefromasciifiles)comma-, tab-, semicolon-, 또는 space-separated tabular ASCII 데이터 파일에서 데이터를 수집합니다.
        *   [EDDTableAscii서비스](#eddtablefromasciiservice)모든 EDDTableFromAsciiService... 클래스의 수퍼 클래스입니다.
        *   [연락처](#eddtablefromasciiservicenos)일부의 데이터 처리NOAANOS 웹 서비스.
        *   [EDDTable오디오파일](#eddfromaudiofiles)로컬 오디오 파일 그룹에서 데이터를 수집합니다.
        *   [EDDTable에서 AwsXml파일](#eddtablefromawsxmlfiles)자동 기상역 세트에서 데이터 수집 (사이트맵) XML 파일.
        *   [EDDTableCassandra에서](#eddtablefromcassandra)하나의 Cassandra 테이블에서 탭 데이터를 처리합니다.
        *   [EDDTableColumnarAsciiFiles에서](#eddtablefromcolumnarasciifiles)고정폭 데이터 열을 가진 tabular ASCII 데이터 파일에서 데이터를 수집합니다.
        *   [연락처](#eddtablefromdapsequence)탭 데이터 처리DAP순서 서버.
        *   [EDDTable데이터베이스](#eddtablefromdatabase)하나의 데이터베이스 테이블에서 탭 데이터를 처리합니다.
        *   [EDDTable에서EDDGrid](#eddtablefromeddgrid)EDDTable dataset을 만들 수 있습니다.EDDGrid데이터셋.
        *   [EDDTableErddap에서](#eddfromerddap)원격에서 탭 데이터를 처리ERDDAP·
        *   [EDDTable파일이름](#eddtablefromfilenames)서버의 파일 시스템의 파일 그룹에 대한 정보에서 데이터셋을 생성하지만 파일 내에서 데이터를 제공하지 않습니다.
        *   [EDDTable파일](#eddtablefromfiles)모든 EDDTableFrom...Files 클래스의 수퍼 클래스입니다.
        *   [다운로드](#eddtablefromhttpget)이름 *ERDDAP데이터 가져 오기 및 데이터 내보내기를위한 유일한 시스템.
        *   [EDDTable에서Hyrax파일 형식](#eddtablefromhyraxfiles)  (관련 상품) 여러 변수와 함께 파일에서 데이터를 수집합니다.[Hyrax OPeNDAP계정 관리](https://www.opendap.org/software/hyrax-data-server)·
        *   [EDDTableInvalidCRAFiles에서](#eddtablefrominvalidcrafiles)데이터 수집NetCDF  (v3 또는 v4)  .nc특정, 잘못된, CF DSG Contiguous Ragged Array의 변형을 사용하는 파일 (사이트맵) 파일. 그러나ERDDAP™이 파일 형식을 지원, 그것은 잘못된 파일 유형은 아무도 사용 시작해야. 이 파일 형식을 사용하는 그룹은 강력하게 사용하도록 권장합니다.ERDDAP™유효한 CF DSG CRA 파일을 생성하고 이 파일을 사용하여 중지합니다.
        *   [EDDTableFromJsonlCSV파일](#eddtablefromjsonlcsvfiles)데이터 수집[구글 맵 라인 CSV 파일](https://jsonlines.org/examples/)·
        *   [EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)데이터 수집NetCDF  (v3 또는 v4)  .nc몇 가지 변수를 가진 파일 공유 차원.
        *   [EDDTableFromNcFiles는](#eddtablefromncfiles)데이터 수집NetCDF  (v3 또는 v4)  .nc몇 가지 변수를 가진 파일 공유 차원. 기존 데이터셋을 위한 이 데이터셋 유형을 계속 사용하는 것이 좋습니다. 하지만 새로운 데이터셋을 위해 대신 EDDTableFromMultidimNcFiles를 사용하는 것이 좋습니다.
        *   [EDDTableNcCFFiles에서](#eddtablefromnccffiles)데이터 수집NetCDF  (v3 또는 v4)  .nc지정된 파일 형식 중 하나를 사용하는 파일[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)대회. 그러나 다차원 CF DSG 변형 중 하나를 사용하여 파일에 대한 사용[EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)대신.
        *   [EDDTableNccsvFiles에서](#eddtablefromnccsvfiles)데이터 수집[사이트맵](/docs/user/nccsv-1.00)ASCII .csv 파일.
        *   [연락처](#eddtablefromnos)  (관련 상품) NOS XML 서버에서 탭 데이터를 처리합니다.
        *   [EDDTable온도](#eddtablefromobis)OBIS 서버에서 탭 데이터를 처리합니다.
        *   [EDDTableFromParquet파일](#eddtablefromparquetfiles)데이터 처리[스낵 바](https://parquet.apache.org/)·
        *   [EDDTable에서SOS](#eddtablefromsos)탭 데이터 처리SOS서버.
        *   [EDDTableFromThredds파일](#eddtablefromthreddsfiles)  (관련 상품) 여러 변수와 함께 파일에서 데이터를 수집합니다.[사이트맵OPeNDAP계정 관리](https://www.unidata.ucar.edu/software/tds/)·
        *   [EDDTable에서WFS파일 형식](#eddtablefromwfsfiles)  (관련 상품) 모든 데이터의 로컬 복사본을 만듭니다.ArcGISMapServer로 이동WFS서버 그래서 자료는 그 후에 빨리 보존될 수 있습니다ERDDAP™사용자.
        *   [연락처](#eddtableaggregaterows)EDDTable datasets의 그룹에서 EDDTable dataset를 만들 수 있습니다.
        *   [EDDTable코피](#eddtablecopy)EDDTable datasets의 많은 유형의 국부적으로 사본을 만들고 그 후에 국부적으로 사본에서 자료를 빨리 보존할 수 있습니다.

  
- - - -

## Dataset 유형의 상세한 설명{#detailed-descriptions-of-dataset-types} 

### EDDGrid사이트맵{#eddgridfromdap} 
[ **EDDGrid사이트맵** ](#eddgridfromdap)핸들 그리드 변수에서[DAP](https://www.opendap.org/)서버.

* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 해당 정보를 수집하거나 자신의 XML을 만들 필요가 있습니다.EDDGridFromDap dataset 를 클릭하여 소스 데이터셋의 DDS 및 DAS 파일을 브라우저에서 찾으세요 (.das 및 .dds를 추가하여sourceUrl, 예를 들면,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) ·
     
*   EDDGridFromDap은 모든 다차원 변수에서 데이터를 얻을 수 있습니다.DAP데이터 서버. (이전,EDDGridfromDap은 "grid"로 지정된 변수에 제한되었지만 더 이상 요구 사항은 없습니다.)   
     
* 분류된 차원 가치 - 각 차원의 값은 정렬된 순서에 있습니다. (ascending 또는 후손) · 값은 불규칙하게 공간화 될 수 있습니다. 아무 것도 없습니다. 이것은의 필요조건입니다[CF 메타데이터 표준](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)· 어떤 차원의 값이 정렬되지 않은 경우, dataset는 로드되지 않고ERDDAP™로그 파일에 첫 번째 취소 된 값을 식별합니다. *큰Parent감독* /logs/log.txt 파일 형식
    
Unsorted 치수 값은 거의 항상 소스 데이터 세트와 문제를 나타냅니다. 가장 일반적으로 잘못되거나 부적절한 파일이 집계에 포함될 때 발생합니다. 이 문제를 해결하려면 오류 메시지를 참조하십시오.ERDDAP™log.txt 파일이 종료된 시간값을 찾을 수 있습니다. 그런 다음 해당 파일을 찾을 소스 파일에서 (또는 그 후에 1) 그것은 집계에 속하지 않습니다.
    
#### EDDGrid스낵 바 사이트맵{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridInEDDTable에서{#eddgridfromeddtable} 
[ **EDDGridInEDDTable에서** ](#eddgridfromeddtable)EDDTable tabular dataset을 변환 할 수 있습니다.EDDGridGridded 데이터 세트. 그 외ERDDAP™datasets를 어느것으로 대우하십시오[데이터 세트 (서브클래스EDDGrid) 또는 tabular datasets (EDDTable의 종류) ](#why-just-two-basic-data-structures)·

* 정상적으로, 당신은 gridded 자료가 있는 경우에, 당신은 다만 설치합니다EDDGriddataset 직접. 예를 들어, 관계 데이터베이스에 저장된 데이터가 있는 경우ERDDAP™EDDTableFromDatabase를 통해서만 접근할 수 있습니다.EDDGridFromEDDTable 클래스는 그 상황을 치료 할 수 있습니다.
     
* 분명히, 밑에 EDDTable dataset에 있는 자료는이어야 합니다 (기본으로) Gridded data, 하지만 탭 형태로. 예를 들어, EDDTable dataset에는 CTD 데이터가 있을 수 있습니다. 동방향 및 북방향 전류의 측정은 여러 깊이에서 여러 번 측정합니다. 깊이가 각 시점과 동일하므로EDDGridFromEDDTable은 한 번에 그리드 데이터 세트를 만들 수 있으며, 아래 EDDTable dataset을 통해 데이터를 액세스 할 수있는 깊이 치수.
     
* Generate데이터셋 사이트맵 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 거친 초안을 개선해야 할 정보를 수집 할 수 있습니다.
     
* 소스 특성 -- datasets의 다른 유형으로,EDDGridFromTable은 Global sourceAttributes가 있는 아이디어와[주요사업addAttributes](#global-attributes)  (설정하기datasets.xml) 글로벌 결합을 만들기 위해 결합 된 , Attributes, 어떤 사용자가 볼 수 있습니다. 글로벌 소스Attributes의 경우,EDDGridFromEDDTable은 글로벌 결합을 사용합니다. EDDTable dataset의 특성 (1 분 동안 생각한다면, 그것은 감각을 만든다.) 
    
마찬가지로, 각각axisVariable이름과dataVariable이름 *[addAttributes](#addattributes)·EDDGridFromEDDTable은 변수의 결합을 사용합니다. Underlying EDDTable dataset의 특성EDDGridfromEDDTable 변수의 sourceAttributes. (1 분 동안 생각한다면, 그것은 감각을 만든다.) 
    
결과적으로 EDDTable이 좋은 메타 데이터가있는 경우EDDGridFromEDDTable 종종 약간의 필요addAttributesmetadata -- 여기에 몇 가지 tweaks.
    
*   dataVariable사이트맵axisVariable사이트맵 아래 EDDTable은 오직dataVariable₢ 킹 이름 *EDDGridFromEDDTable dataset에는 몇몇이 있을 것입니다axisVariable₢ 킹 (EDDTable의 몇몇에서 창조하는dataVariable₢ 킹) 그리고 몇dataVariable₢ 킹 (남아있는 EDDTable에서 창조하는dataVariable₢ 킹) ·[생성데이터셋Xml](#generatedatasetsxml)EDDTable 으로 추측 할 것dataVariables는EDDGridInEDDTable에서axisVariables, 하지만 그것은 단지 추측. GenerateDatasetsXml의 출력을 수정해야 합니다.dataVariables는axisVariables, 그리고 어떤 순서에서.
     
* 축밸류 -- EDDTable에 대해 아무것도 없다EDDGridfromEDDTable의 가능한 값axisVariabledataset의 gridded 버전에 있는 s는, 그래서 당신은 각을 위한 그 정보를 제공합니다axisVariable이 속성 중 하나를 통해:
    
    * AxisValues -- 값을 지정할 수 있습니다. 예를 들어,
        &lt;att name="axisValues"(영어)[유형 = 더블 목록](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;/에트&gt;
주의사항[데이터 유형](#data-types)더 많은 언어 또한, 목록의 유형 (예를 들면, 두 배) , MUST는 자료 일치합니다 EDDTable에서 변수의 종류와EDDGridfromEDDTable 데이터셋.
    * AxisValuesStartStrideStop -- 시작, stride 및 스톱값을 지정하여 정기적으로 우주 값을 지정할 수 있도록 합니다. 다음은 AxisValues 예제와 같습니다.
        &lt;att name="axisValuesStartStrideStop" 의 확장 파일[유형 = 더블 목록](#attributetype)\\&gt;2, 0.5, 4&lt;/에트&gt;
다시, 목록 데이터 유형의 사용. 또한, 목록의 유형 (예를 들면, 두 배) , MUST는 자료 일치합니다 EDDTable에서 변수의 종류와EDDGridfromEDDTable 데이터셋.
         
    
업데이트 -- 그냥 아무 길도 없다EDDGridInEDDTable에서 EDDTable의 AxisValues를 처음에 결정하는 것은 또한 믿을 수 있는 방법이 없습니다EDDGridAxisValues가 변경되었을 때 EDDTable에서 결정할 수 있습니다. (notably, 시간 변수에 대한 새로운 값이있을 때) · 현재 유일한 솔루션은 AxisValues 속성을 변경하는 것입니다.datasets.xmldataset를 다시로드합니다. 예를 들어, 스크립트를 작성할 수 있습니다.
    
    1. 제품정보datasets.xml제품정보
        datasetID· *데이터셋ID* ·
그래서 당신은 정확한 dataset로 일하고 있습니다.
    2. 제품정보datasets.xml다음의 발생에 대한
        <sourceName> *다운로드* </sourceName>  
그래서 당신은 올바른 변수와 작업.
    3. 제품정보datasets.xml다음의 발생에 대한
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
그래서 당신은 태그의 시작 위치를 알고.
    4. 제품정보datasets.xml다음의 발생에 대한
```
        </att>  
```
그래서 당신은 축선 가치의 끝 위치를 알고 있습니다.
    5. 이전 시작을 대체, stride, 새로운 값으로 값을 중지.
    6. 연락처[플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)dataset에 대해ERDDAP™dataset를 다시로드합니다.
    
이것은 이상하지 않지만 작동합니다.
     
* 정밀 -- 시간 :EDDGridfromEDDTable은 데이터에 대한 사용자 요청에 응답합니다. EDDTable 응답 테이블에서 EDDTable 응답 테이블의 행을 이동EDDGrid응답 격자. 이렇게하려면 테이블의 주어진 행에 "축"값이 그리드의 축 값의 일부 조합과 일치하면 알아야합니다. integer 데이터 유형의 경우 두 값이 동일하게 결정하기 쉽습니다. 그러나 부유물과 두 배를 위해, 이것은 부유물 점 수의 끔찍한 문제를 가져옵니다[정확히 일치하지 않음](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)· (예를 들면, 0.2 versus 0.19999999996) · 으로 (뚱 베어) 거래 이,EDDGridFromTable 은밀한 속성을 지정합니다.axisVariables, 동일한 숫자의 총 수를 지정합니다.
    * 예를 들어,&lt;att name="precision" type="int"&gt;5&lt;/에트&gt;
    * 다른 유형의 데이터 변수를 위해 다른 기본 정밀도 값이 있습니다. 기본값은 보통 적절합니다. 그렇지 않으면 다른 값을 지정해야합니다.
    * 제품 정보axisVariables는[시간 또는 시간 Stamp 변수](#timestamp-variables), 기본값은 전체 정밀도입니다 (정확한 일치) ·
    * 제품 정보axisVariablefloats는, 기본 정밀도는 5.입니다.
    * 제품 정보axisVariable두 배는, 기본 정밀도입니다 9.
    * 제품 정보axisVariableinteger 데이터 유형이 있는 s,EDDGridfromEDDTable은 정밀 특성을 무시하고 항상 전체 정밀도를 사용합니다. (정확한 일치) ·
         
    *    **여행 정보** 탭 데이터의 펑크 변환을 할 때 그리드 데이터의 펑크로,EDDGridfromEDDTable은 예상 중 하나에 EDDTable "축"값과 일치 할 수 없습니다EDDGridFromEDDTable 축선 가치,EDDGridinEDDTable 조용히 (오류 없음) 테이블의 행에서 데이터를 던져. 예를 들어, 다른 데이터가 있을 수 있습니다. (격자에) EDDTable dataset에서. (그리고 만약 stride &gt; 1, 그것은 명백하지 않습니다EDDGrid축 값이 원하는 값이며, 하나는 stride 때문에 건너 뛸 수 있습니다.) 그래서, 정밀도 값이 너무 높으면, 사용자는 유효 데이터 값이 실제로 존재할 때 데이터 응답에 누락 된 값을 볼 수 있습니다.
        
Conversely, 정밀도 값이 너무 낮은 경우, EDDTable "축"값은 일치하지 않아EDDGridFromEDDTable 축선 가치는 (맹렬하게) 이름 *
        
이 잠재적 인 문제는 사용자가 잘못된 데이터를 얻는 것이기 때문입니다. (또는 누락된 값) 적절한 데이터를 얻을 때 (또는 적어도 오류 메시지) ·
이것은 결함이 없습니다.EDDGrid사용 방법EDDGridFromTable는 이 문제를 해결할 수 없습니다. 문제는 격자 된 데이터로 tabular data의 변환에 필수적입니다. (다른 가정이 만들 수 없다면, 여기에 할 수 없습니다.) ·
당신까지,ERDDAP™관리자, **시험하기EDDGridinEDDTable 완전히** 정밀도 값이 이러한 잠재적 인 문제를 방지하기 위해 설정되도록합니다.
        
#### 뚱 베어{#gapthreshold} 
*   [뚱 베어](#gapthreshold)-- 이것은 dataset의 아주 특이한 유형입니다. 할 수있는 쿼리의 유형부터 (에 의해 처리) 이름 *EDDGrid데이터셋 (범위와 strides와 관련된axisVariable₢ 킹) 할 수있는 쿼리의 종류에서 매우 다릅니다. (에 의해 처리) EDDTable 데이터셋 (일부 변수의 범위와 관련) , 성과의EDDGridfromEDDTable datasets는 정확한 요청에 따라 크게 다를 것입니다. stride 값이 있는 요청 &gt; 1개,EDDGridfromEDDTable은 데이터의 상대적으로 큰 펑크를 위해 EDDTable을 요구할 수 있습니다 (stride=1인 경우) 그리고 그 결과 sift는, 몇몇 줄에서 자료를 지키고 다른 사람에서 자료를 던지고. 데이터가 필요하기 때문에 많은 데이터를 통해 sift를 갖는 경우, 요청은 더 오래 걸릴 것입니다.
    
이름 *EDDGridFromEDDTable에는 큰 간격이 있다는 것을 말할 수 있습니다 (원치 않는 자료의 행으로) 원하는 데이터를 가진 행 사이,EDDGridFromEDDTable는 큰 간격에 있는 자료의 쓸모 없는 줄을 건너서 1개의 큰 요구 대신에 결심한 EDDTable에 몇몇 subrequests를 만들기 위하여 선택할지도 모릅니다. 이 결정에 대한 감도는 gapThreshold 값에 의해 지정됩니다&lt;gapThreshold&gt; 태그 (default=1000 소스 데이터의 행) · gapThreshold를 작은 숫자로 설정하면 dataset 만들기 (제품 정보) 더 많은 잠수함. gapThreshold를 더 큰 숫자로 설정하면 dataset 만들기 (제품 정보) 몇몇 subrequests.
    
gapThreshold가 너무 작으면EDDGridfromEDDTable은 여러 요청의 오버 헤드가 초과 된 데이터를 얻기 위해 저장된 시간보다 더 낫기 때문에 더 천천히 작동합니다. gapThreshold가 너무 커지면,EDDGridfromEDDTable은 너무 많은 과잉 데이터가 EDDTable에서 재생되기 때문에 더 천천히 작동합니다. (발견 된 Goldilocks로, 중간은 "조절 권리"입니다.) EDDTable datasets의 다른 유형을 위한 머리 위는 크게 변화합니다, 그래서 당신의 dataset를 위한 실제적인 제일 조정을 아는 유일한 방법은 실험을 통해 입니다. 그러나 당신은 너무 멀리 잘못이 기본값으로 찔렀다.
    
간단한 예는: 상상해EDDGridFromTable 와 단 하나axisVariable  (100000의 크기로 시간,) ·dataVariable  (제품 정보) , 그리고 1000의 기본 gapThreshold.
    
    * 사용자 요청 온도\\[0&#58;100&#58;5000\\], stride는 100입니다 그래서 간격 크기는 gapThreshold 보다는 더 적은인 99입니다. 이름 *EDDGridFromTable은 요청에 필요한 모든 데이터에 대해 EDDTable에 하나의 요청을 만들 것입니다 (온도에 동등\\[0:5000 원\\]) 그리고 필요한 데이터의 모든 행을 던져.
    * 사용자 요청 온도\\[0:2500:5000의\\], 그 stride 2500 그래서 격차 크기는 2499, 이는 gapThreshold보다 더 큰. 이름 *EDDGridfromTable은 온도와 동등한 EDDTable에 분리된 요청을 할 것입니다\\[0 댓글\\], 온도\\[명세\\], 온도\\[5000 원\\]·
    
갭 크기의 계산은 여러 축이있을 때 더 복잡합니다.
    
각 사용자 요구에 대 한,EDDGridfromEDDTable prints 이와 관련된 진단 메시지[로그.txt](/docs/server-admin/additional-information#log)파일.
    
    * 이름 *&lt;로그레벨&gt; (#로그레블) 내 계정datasets.xml은 정보로 설정, 이 같은 메시지를 인쇄
\\* nOuterAxes=1 의 4 nOuterRequests=22
nOuterAxes=0, gapThreshold가 초과되지 않았을 경우, 하나의 요청만 EDDTable으로 만들 수 있습니다.
nOuterAxes&gt;0, gapThreshold가 초과되고 nOuterRequests는 왼쪽 nOuterAxes의 각 요청한 조합과 일치하는 EDDTable에, 할 것입니다. 예를 들어, dataset이 4인 경우axisVariables와dataVariables 같은 동상\\[시간 :\\]\\[이름 *\\]\\[경도\\]\\[(주)\\], 가장 왼쪽 (1 년 전) Axis 변수는 시간입니다.
    * 이름 *&lt;로그레벨&gt; 내 계정datasets.xml모든 것을 설정하고, 추가 정보는 log.txt 파일로 작성됩니다.
         
#### EDDGrid사용 약관 사이트맵{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD*에서ERDDAP {#eddfromerddap} 
 **EDDGrid언어: en** 원격에서 Gridded 데이터를 처리ERDDAP™서버.
 **EDDTableErddap에서** 원격에서 탭 데이터를 처리ERDDAP™서버.

*   EDDGridFromErddap 및 EDDTableFromErddap은 다른 모든 데이터 세트에서 다르게 행동합니다.ERDDAP·
    * datasets의 다른 유형 같이, 이 datasets는 근원에서 dataset에 관하여 정보를 얻고 기억에서 그것을 지킵니다.
    * datasets의 다른 유형 같이, 때ERDDAP™datasets 검색, Data Access Form 표시 ( *datasetID* 사이트맵) , 또는 표시는 도표 모양을 만듭니다 ( *datasetID* ·) ·ERDDAP™메모리에 있는 dataset에 대한 정보를 사용합니다.
    *   EDDGridInErddap 및 EDDTable 사용 fromErddap은 기초입니다.[그리드 / 클러스터 / 페더레이션](/docs/server-admin/scaling)이름 *ERDDAPCPU 사용량을 효율적으로 배포하는 s (주로 맵 만들기) , 메모리 사용, dataset 저장 및 대용량 데이터 센터의 대역폭 사용.
#### 지원하다{#redirect} 
* datasets의 다른 유형과는 달리, 때ERDDAP™이 datasets에서 데이터 또는 이미지에 대한 요청을받습니다.ERDDAP [관련 기사](https://en.wikipedia.org/wiki/URL_redirection)리모트에 요구ERDDAP™서버. 결과는:
    * 이것은 아주 능률적입니다 (CPU, 메모리 및 대역폭) , 그렇지 않으면
        1. 합성ERDDAP™다른 사람에게 요청을 보낼 수 있습니다.ERDDAP™  (시간 제한) ·
        2. 기타ERDDAP™데이터를 얻기 위해, reformat it, and send the data to the CompositeERDDAP·
        3. 합성ERDDAP™데이터 수신 (대역폭 사용) , reformat 그것 (CPU 및 메모리 사용) , 사용자가 데이터를 전송 (대역폭 사용) · 요청을 리디렉션하고 다른 것을 허용ERDDAP™사용자에 직접 응답을 보내기 위해, 합성ERDDAP™CPU 시간, 메모리, 또는 요청에 대역폭을 사용하지 않습니다.
    * 리디렉션은 클라이언트 소프트웨어에 상관없이 사용자에게 투명합니다. (브라우저 또는 다른 소프트웨어 또는 명령 줄 도구) ·
*   [당신은 말할 수 있습니다ERDDAP™](#redirect)설정하여 사용자 요청을 리디렉션하지 마십시오.&lt;리디렉션&gt;false&lt;/redirect&gt;, 그러나이는 ...FromErddap dataset 유형의 장점의 대부분을 negates (뿐만 아니라, 정면 끝에 짐을 분산ERDDAP™원격 / 백업ERDDAP) ·
         
     
#### 이름 *{#subscriptions} 
일반적으로, 때EDDGridInErddap 및 EDDTable 사용 보낸 사람Erddap (이름 *) 당신의 의견ERDDAP, 그들은 원격 데이터셋에 가입을 추가하려고ERDDAP이메일/URL 구독 시스템 즉, 먼 dataset가 변화할 때마다, 리모트ERDDAP™연락처[설정Dataset 플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)내 계정ERDDAP™로컬 데이터 세트는 ASAP를 다시로드하고 로컬 데이터 세트가 항상 완벽하게 최신이며 원격 데이터 세트를 mimics합니다. 그래서, 첫 번째 시간이 발생, 당신은 당신이 구독을 검증하는 이메일 요청을 받아야. 그러나, 로컬 경우ERDDAP™이메일을 보낼 수 없습니다 또는 원격 경우ERDDAP's email/URL 구독 시스템은 활성화되지 않습니다, 당신은 원격 이메일을 보내야ERDDAP™관리자 및 요청 s/he 수동 추가 [&lt;onChange&gt;에 대하여 (#오름) ·&lt;/onChange&gt; 태그는 모든 관련 데이터셋을 호출하기 위해[설정Dataset 플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)· 더 보기ERDDAP™setDataset 목록의 일일 보고서 플래그 URL, 하지만 그냥 하나를 보낼EDDGridfromErddap 및 EDDTableFromErddap 데이터셋을 원격으로ERDDAP™관리자.
    
이것은 작동하지 않습니까? 원격 데이터셋과 동기화하지 않는 로컬 데이터셋은?
데이터셋이 최신 상태로 유지되도록 이 시스템을 올바르게 작동해야 합니다. 순서에 이러한 것들을 각각 확인:
    
    1. 내 계정ERDDAP™이메일을 보낼 수 있어야합니다. setup.xml의 이메일 설정을 참조하십시오.
    2. 일반 정보 (그러나 항상) , 당신의ERDDAP이름 *&lt;baseUrl&gt;와&lt;baseHttpsUrl&gt;must 포트 번호가 없습니다 (예) : 8080, : 8443) · 그들이 하는 경우, 사용[프록시](/docs/server-admin/deploy-install#proxypass)Url에서 포트를 제거하기 위해.
    3. 설정에서.xml,&lt;JoinToRemoteErddapDataset&gt;는 true로 설정되어야 합니다.
    4. 현지 EDD가 될 때 ... FromErddap dataset는 다시로드되어, 리모트에 요청을 보내야 합니다.ERDDAP™원격 데이터셋에 가입하십시오. 이 일이 일어나는지 확인하려면 log.txt 를 참조하십시오.
    5. 구독 요청을 확인하려면 이메일이 있어야 합니다.
    6. 구독 요청을 확인하려면 해당 이메일의 링크를 클릭하십시오.
    7. 원격 제어ERDDAP™유효성 검사가 성공했다는 것을 말해야합니다. 언제든지 원격으로 이메일을 요청할 수 있습니다.ERDDAP™대출 및 유효한 구독 목록. 자주 묻는 질문 *리모트ErddapBase 뚱 베어* /erddap/subscriptions/list.html .
    8. 먼 dataset가 변화할 때 (e.g., 추가 데이터를 가져옵니다) , 먼ERDDAP™flagURL에 문의하려면ERDDAP· 당신은 이것을 검사할 수 없습니다, 그러나 당신은 원격의 관리자에게 요구할 수 있습니다ERDDAP™확인하기
    9. 내 계정ERDDAP™flagURL을 설정할 요청을 받아야 합니다. "setDatasetFlag.txt"에 대한 log.txt에서 보기 (₢ 킹) 요청과 관련된 오류 메시지가 있는지 확인하십시오.
    10. 내 계정ERDDAP™그런 다음 dataset를 다시로드하려고 (아마 즉시,하지만 ASAP) ·
         
#### 최대 최신 (시간 :) ·{#up-to-date-maxtime} 
EDDGrid/TableFromErddap datasets는 소스 데이터셋이 될 때 각 소스 데이터셋에 대한 저장된 정보를 변경합니다.["부속"](#reloadeverynminutes)그리고 metadata의 몇몇 조각 변화 (e.g., 시간 변수의actual\\_range) , 구독 알림 생성. 소스 데이터셋이 자주 변경되는 데이터가 있는 경우 (예를 들면, 새로운 자료 매 초) 그리고 사용["업데이트"](#updateeverynmillis)아래 데이터로 빈번한 변경을 통지하는 시스템,EDDGrid/TableFromErddap은 다음 dataset "reload"까지 이러한 빈번한 변경 사항에 대해 통보하지 않습니다.EDDGrid/TableFromErddap은 완벽하게 업데이트되지 않습니다. 이 문제를 최소화하여 소스 데이터셋의 변경&lt;reloadEveryNMinutes&gt; 더 작은 값 (60? 15?) 더 많은 구독 알림이 있음을 알려드립니다.EDDGrid/TableFromErddap 소스 데이터셋에 대한 정보를 업데이트합니다.

또는 데이터 관리 시스템이 소스 데이터셋이 새로운 데이터가 있는지 알고 있다면 (e.g., 데이터 파일을 배치하는 스크립트를 통해) , 그리고 그것이 슈퍼 빈번하지 않는 경우 (e.g., 매 5 분, 또는 덜 자주) , 더 나은 해결책이 있습니다:

1. 이용안내&lt;source dataset up-to-date를 유지하기 위해 모든NMillis&gt;를 업데이트합니다.
2. 소스 dataset의 설정&lt;reloadEveryNMinutes&gt; 더 큰 수에 (1440년?) ·
3. 스크립트는 소스 dataset의 접촉[플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)새 데이터 파일을 배치 한 후 오른쪽.
     

그것은 소스 데이터셋이 완벽하게 최신 상태로 이어지고 구독 알림을 생성하는 원인이 될 것입니다.EDDGrid/TableFromErddap 데이터 세트. 그대는EDDGrid/TableFromErddap dataset은 완벽하게 업데이트됩니다. (잘, 추가되는 새로운 자료의 5 초 안에) · 그리고 모든 것이 효율적으로 수행됩니다. (불필요한 dataset reloads 없이) ·
     
#### 이름 *addAttributes·axisVariable, 또는dataVariable {#no-addattributes-axisvariable-or-datavariable} 
다른 유형의 데이터 세트와 달리, EDDTableFromErddap 및EDDGridFromErddap datasets는 세계를 허용하지 않습니다&lt;addAttributes&gt;·&lt;axisVariable&gt; 또는&lt;dataVariable&gt; 섹션에서datasets.xml그 dataset를 위해. 문제는 그 사람들이 주장에 이끌 수 있다는 것입니다:
    
1. 허용되고 새로운 글로벌 속성을 추가했습니다.
2. 사용자 요청시ERDDAP™글로벌 속성의 경우, 새로운 속성이 나타납니다.
3. 그러나 사용자가 요청할 때ERDDAP™데이터 파일에 대한, 당신의ERDDAP™소스에 요청을 리디렉션ERDDAP· 이름 *ERDDAP™새로운 속성의 인식입니다. 그래서 metadata, e.g., a와 데이터 파일을 만들면.nc파일, metadata는 새로운 속성이 없습니다.

2개의 일 주위가 있습니다:

1. Convince 소스의 관리자ERDDAP™메타데이터를 원하는 변경을 할 수 있습니다.
2. 대신 EDDTableFromErddap, 사용[연락처](#eddtablefromdapsequence)· 또는 대신EDDGridFromErddap, 사용[EDDGrid사이트맵](#eddgridfromdap)· 이러한 EDD 유형은 원격에서 dataset에 효율적으로 연결할 수 있습니다.ERDDAP™  (하지만 데이터 요청을 리디렉션하지 않고) 그리고 그들은 세계를 포함 하 여&lt;addAttributes&gt;·&lt;axisVariable&gt; 또는&lt;dataVariable&gt; 섹션에서datasets.xml· 다른 차이점 : 원격 데이터셋에 수동으로 가입해야하므로 데이터셋이 됩니다.ERDDAP™공지 사항 (을 통해[플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)) 먼 dataset에 변화가 있을 때. 따라서, 당신은 원격 데이터셋에 연결 대신 새로운 데이터셋을 만들 것입니다.
         
#### 다른 노트{#other-notes} 
* 보안상의 이유로,EDDGridfromErddap 및 EDDTable 사용 FromErddap는 지원하지 않습니다 [&lt;접속하다&gt;] (#액세스) 태그 및 원격 데이터 세트와 함께 사용할 수 없습니다 (사용하기 때문에 [&lt;접속하다&gt;] (#액세스) ).. 이름 *ERDDAP이름 *[보안 시스템](/docs/server-admin/additional-information#security)일부 데이터셋에 대한 액세스를 제한하는 경우.
     
* 시작하기ERDDAP™v2.10,EDDGridfromErddap 및 EDDTableFromErddap 지원 [&lt;액세스ViaFiles&gt; (#액세서리) 태그. datasets의 다른 유형과는 달리, 기본값은 true이지만, dataset의 파일은 source dataset도 가지고 있는 경우에만 accessViaFiles일 것입니다&lt;accessViaFiles&gt; true로 설정합니다.
     
* 당신은 사용할 수 있습니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)으로datasets.xml이 유형의 dataset에 대한 chunk. 그러나 당신은 손으로 쉽게 데이터 세트의 이러한 유형을 할 수 있습니다.
     
#### EDDGrid인더스트리 사이트맵{#eddgridfromerddap-skeleton-xml} 
*   EDDGrid인더스트리 XML dataset는 매우 간단합니다, intent가 이미 사용에 적합 한 원격 데이터 세트를 mimic하기 때문에ERDDAP::
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableErddap 스켈레톤 사이트맵{#eddtablefromerddap-skeleton-xml} 
* EDDTableFromErddap dataset에 대한 skeleton XML은 매우 간단합니다. intent는 원격 데이터 세트를 mimic로 마이그레이션하기 때문에 이미 사용에 적합ERDDAP::
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid서포토{#eddgridfrometopo} 
[ **EDDGrid서포토** ](#eddgridfrometopo)그냥 봉사[ETOPO1 글로벌 1 분 그리드 Elevation 데이터 세트](https://www.ngdc.noaa.gov/mgg/global/global.html)  (얼음 표면, 그리드 등록, 바이너리, 2 바이트 int : etopo1\\_ice\\_g\\_i2.zip) 는ERDDAP·

* 만 2datasetIDs는 지원됩니다EDDGridFromEtopo는 경도값 -180에서 180까지의 데이터에 액세스할 수 있으므로 경도값 또는 경도값 0에서 360으로 접속할 수 있습니다.
* 데이터가 이미 설명되어 있기 때문에 어떤 하위 태그가 없습니다.ERDDAP·
* 그래서 두 가지 옵션EDDGridFromEtopo 데이터셋은 (한국어) ::
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGrid파일 형식{#eddgridfromfiles} 
[ **EDDGrid파일 형식** ](#eddgridfromfiles)모두의 수퍼 클래스EDDGrid...Files 클래스에서. 사용할 수 없습니다.EDDGrid파일에서 직접. 대신, subclass를 사용EDDGridfromFiles에서 특정 파일 유형을 처리하십시오:

*   [EDDGrid파일 형식](#eddgridfrommergeirfiles)gridded에서 데이터 처리[지원하다.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)파일.
*   [EDDGrid파일 형식](#eddfromaudiofiles)로컬 오디오 파일 그룹에서 데이터를 수집합니다.
*   [EDDGrid파일 형식](#eddgridfromncfiles)gridded에서 데이터 처리[사이트맵](https://en.wikipedia.org/wiki/GRIB)파일,[HDF  (v4 또는 v5)  .hdf](https://www.hdfgroup.org/)파일,[.nc단백질](#ncml-files)파일 및[NetCDF  (v3 또는 v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)파일. 이것은 다른 파일 유형과 함께 작동 할 수 있습니다. (예를 들어, BUFR) , 우리는 다만 그것을 시험하지 않았습니다 -- 당신이 흥미있는 경우에 저희에게 몇몇 표본 파일을 보내십시오.
*   [EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked)의 변형EDDGridGridded에서 데이터를 처리하는 FromNcFilesNetCDF  (v3 또는 v4)  .nc관련 파일,ERDDAP™낮은 수준에서 포장.

현재 다른 파일 형식이 지원되지 않습니다. 하지만 그것은 일반적으로 상대적으로 쉽게 다른 파일 유형에 대한 지원을 추가. 자주 묻는 질문 또는 데이터가 오래된 파일 형식의 경우, 우리는 파일을 변환하는 것이 좋습니다.NetCDFv3의.nc파일.NetCDF널리 지원, 바이너리 형식, 데이터에 빠른 임의 액세스를 허용, 이미 지원ERDDAP·

#### 파일 상세 정보{#from-files-details} 
다음 정보는 모든 하위 클래스에 적용됩니다.EDDGrid파일에서.

##### Existing 차원의 집단{#aggregation-of-an-existing-dimension} 
모든 변화의EDDGridFromFiles는 각 파일이 1인 로컬 파일에서 데이터를 수집할 수 있습니다. (더 보기) leftmost의 다른 값 (1 년 전) 차원, 보통\\[시간 :\\], 이는 집계됩니다. 예를 들면, 차원은 일 수 있습니다\\[시간 :\\]\\[이름 *\\]\\[이름 *\\]\\[경도\\], 파일에는 하나의 데이터가 있을 수 있습니다. (또는 몇) 시간 값 (₢ 킹) 파일 당. 결과 데이터셋은 파일의 모든 데이터가 결합된 것처럼 나타납니다. 집계의 큰 이점은:

* 집계 된 데이터 세트의 크기는 단일 파일보다 훨씬 더 커질 수 있습니다. (~2GB의) ·
* 실시간 데이터의 경우 최신 데이터의 펑크로 새 파일을 쉽게 추가할 수 있습니다. 전체 dataset을 다시 작성할 필요가 없습니다.

총계를 위한 필요조건은:
* 로컬 파일은 동일하지 않습니다.dataVariable₢ 킹 (dataset의 정의datasets.xml) · dataset에는dataVariable정의 된 sdatasets.xml· 주어진 파일이 주어진 경우dataVariable·ERDDAP™필요한 값을 추가합니다.
* 모든 것dataVariables MUST 사용axisVariables/디멘션 (dataset의 정의datasets.xml) · 이 파일은 첫 번째에 따라 집계됩니다. (맨 위로) 차원, ascending 순서에서 분류하는.
* 각 파일 MAY는 첫번째 차원의 하나 또는 더 많은 가치를 위한 자료가 있습니다, 그러나 파일 사이 아무 overlap도 일 수 없습니다. 파일이 첫 번째 차원에 대한 1 개 이상의 값을 가지고 있다면, 값 MUST는 ties가없는 ascending 순서로 분류됩니다.
* 모든 파일 MUST는 다른 모든 차원의 동일한 값을 정확하게 가지고 있습니다. 시험의 정밀도는에 의해 결정됩니다[경기AxisNDigits](#matchaxisndigits)·
* 모든 파일 MUST 정확히 동일[단위 단위](#units)메타데이터axisVariables와dataVariable· 문제가 있다면, 사용할 수 있습니다.[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)문제 해결.
         
##### 파일 이름 또는 Global Metadata를 통한 집단{#aggregation-via-file-names-or-global-metadata} 
모든 변화의EDDGridFromFiles는 또한 새로운 leftmost를 추가하여 파일 그룹을 구성할 수 있습니다. (1 년 전) 차원, 보통 시간, 각 파일명에서 파생된 값 또는 각 파일에 있는 세계적인 속성의 가치에 기초를 두어. 예를 들어, filename은 파일의 데이터의 시간값을 포함할 수 있습니다.ERDDAP™새로운 시간 크기를 만들 것입니다.

THREDDS의 유사한 기능과는 달리,ERDDAP™항상 창조axisVariable숫자 값 (CF에 의해 요구되는) , 결코 문자열 값 (CF에 의해 허용되지 않음) · 또한,ERDDAP™숫자에 근거를 둔 집계에 있는 파일을 분류할 것입니다axisVariable각 파일에 할당 된 값은, 그래서 축 변수가 항상 CF에 의해 필요한 값을 정렬한다. 파일 이름에 따라 lexicographic 종류를 수행하는 THREDDS 접근은 축 값이 분류되지 않은 집계로 이동합니다. (CF에 의해 허용되지 않음) 파일 이름이 파생된 것보다 다르게 정렬될 때axisVariable가치.

이 집계 중 하나를 설정ERDDAP™, 당신은 새로운 왼쪽을 정의 할 것이다 (1 년 전)  [axisVariable](#axisvariable)특별 한, 의사&lt;sourceName&gt;, 어떤 말ERDDAP™어디에 그리고 각 파일에서 새 차원의 값을 찾는 방법.

* 가짜 형식sourceNamefilename에서 값을 가져옵니다. (파일이름.ext) 이름 *
    \\*\\*이름 * *파일이름,* [제품정보 제품정보](#data-types) *·* 추출물Regex *·* 캡처그룹Number*
* 가짜 형식sourceName파일의 절대 경로명에서 값을 얻는 것은
    \\*\\*이름 * *패스워드* [제품정보 제품정보](#data-types) *·* 추출물Regex *·* 캡처그룹Number*
    \\[이것을 위해, 경로 이름은 항상 사용합니다'/'디렉토리 구분 문자로, 절대 '\'.\\]
* 가짜 형식sourceName글로벌 속성의 가치를 얻는 것은
    \\*\\*이름 * *글로벌:* 이름 * 이름 * *·* [제품정보 제품정보](#data-types) *·* 추출물Regex *·* 캡처그룹Number*
* 이 의사sourceName옵션은 다른 사람에서 다르게 작동합니다. 대신 새로운 leftmost를 만들기 (1 년 전)  axisVariable, 이것은 현재의 가치를 대체합니다axisVariablefilename에서 추출된 값 (파일이름.ext) · 형식은
    \\*\\*이름 * *기타 제품 파일명* [제품정보 제품정보](#data-types) *·* 추출물Regex *·* 캡처그룹Number*
     

제공해야 할 부품의 설명은 다음과 같습니다.

*    *이름 * 이름 ** -- 각 파일에 있는 글로벌 속성의 이름과 차원값을 포함하는.
*    *제품정보 제품정보* -- 이 값을 저장하기 위해 사용되는 데이터 유형을 지정합니다. 표준 리스트 보기[제품정보 제품정보](#data-types)이름 *ERDDAP™지원, 문자열을 제외하고는 여기에 축 변수 이후 허용되지 않습니다ERDDAP™문자열 변수가 없습니다.
    
추가적인 의사 dataType, timeFormat= *이름 * 시간Format* , 어떤 말ERDDAP™값은 String timeStamp입니다.[문자열 시간에 적합 한 단위](#string-time-units)· 대부분의 경우, stringTimeFormat는 이러한 형식 중 하나가 될 것입니다.
    
    *   yyyy-MM-dd'T'HH:mm:ss.SSSZ -- ISO 8601:2004 (₢ 킹) 날짜 시간 체재. 이 버전의 단축이 필요할 수 있습니다.yyyy-MM-dd'T'HH:mm:ss 또는yyyy-MM-dd·
    * yyyymmddHmms.SSS -- ISO 8601 날짜 시간 형식의 소형 버전입니다. 이 버전의 단축이 필요할 수 있습니다. 예를 들어, yyyyMMddHHmms 또는 yyymmdd.
    * 사이트맵 H:mm:ss.SSS -- 미국 슬래시 날짜 체재인. 이 버전의 단축이 필요할 수 있습니다. 예를 들어, M/d/yyyyyy.
    * yyyyDDDHHmmsSSS -- 올해와 올해의 제로패드 일 (e.g, 001 = 1 월 1, 365 = 12 월 31 일 비-leap 년; 이것은 때때로 줄리안 날짜라고 불린다.) · 이 버전의 단축이 필요할 수 있습니다. 예를 들어, yyyyyDDD .
    
이 가짜 dataType을 사용하는 경우, 새로운 변수에 추가&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
시간의 모든 값을 이동하려면 단위의 시간 값을 이동, 예를 들어,
1970-01-01T12:00:00Z.
*    *추출물Regex* -- 이것은[일반 표현](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([관련 기사](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) 캡처 그룹 포함 (부모의) filename 또는 global 속성 값에서 값을 추출하는 방법을 설명합니다. 예를 들어, S19980011998031.L3b\\_MO\\_CHL과 같은 파일 이름을 주었다..nc, 캡처 그룹 #1, "\\d관련 기사", 정규식 S에서 (이름 *\\d관련 기사) 이름 *\\d관련 기사\\.L3b.\\*는 'S': 1998001 후 첫 7자리를 캡처합니다.
*    *캡처그룹Number* -- 이것은 캡처 그룹의 수입니다 (부모의 쌍 안에) 관심의 정보를 포함하는 정규식에서. 일반적으로 1, 첫 번째 캡처 그룹입니다. 때때로 당신은 regex에서 다른 목적으로 캡처 그룹을 사용해야합니다, 그래서 중요한 캡처 그룹 번호가 될 것이다 2 (두 번째 캡처 그룹) 또는 3 (세 번째) 등

전체 예시axisVariable각 파일의 파일명에서 시간값을 얻는 새로운 시간 축선을 가진 집계된 dataset는 입니다
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
"timeFormat=" 가짜 데이터를 사용할 때 유형,ERDDAP™2 속성을 추가합니다.axisVariable그래서 그들은 소스에서 오는 것 같다:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
그래서이 경우,ERDDAP™새로운 축을 만들 것입니다"time"두 배 값으로 (1970-01-01T00:00:00Z 이후 초) 'S' 이후 7자리를 추출하고 파일명에서 ".L3m" 이전에는 yyyyyDDD로 포맷 된 시간 값으로 해석합니다.

기본 기본 시간을 초과할 수 있습니다. (1970-01-01T00:00:00Z) 이름 *[추가Attribute](#addattributes)다른 기본 시간에 다른 단위 속성을 지정합니다. 일반적인 상황은 다음과 같습니다. 데이터 파일 그룹, 위성 데이터 세트의 1 일 복합체와 함께, 파일 이름에 언급 된 날의 정오가 될 시간 값을 원하는 곳 (매일의 중심 시간) 변수를 원한다long\\_name"Centered Time"이 될 것입니다. 다음과 같은 예:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
참고 시간 = 12 기본 시간에, 이는 1970-01-01T00:00:00Z의 원래 기지 시간에 상대 12 시간을 추가합니다.

전체 예시axisVariable새로운 "run"축으로 집계 된 데이터 세트를 만드는 (int 값) 각 파일에서 "runID"글로벌 속성에서 실행 값을 얻는다 ("r17\\_global"와 같은 값으로 17은 실행 번호입니다.) 이름 *
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
캡처 그룹 번호 2의 사용을 참고하여 'r' 또는 's' 이후 발생하는 손가락을 캡처하고, "\\_global". 이 예제는 또한 추가 속성을 추가하는 방법을 보여줍니다. (₢ 킹ioos\\_category및 단위) 축 변수에.
     
#### 외부 압축 파일{#externally-compressed-files} 
* Datasets는EDDGrid파일 및 EDDTable fromFiles는 외부 압축 데이터 파일에서 직접 데이터를 제공 할 수 있습니다..tgz·.tar.gz·.tar.gzip·.gz·.gzip·.zip·.bz2, 그리고 .Z 파일.
     
*    **이것은 놀랍게도 잘 작동합니다&#33;**   
대부분의 경우, 소중하고 중간 크기의 데이터 파일을 압축하는 데 관련 된 느린 다운. 디스크 공간을 구성해야하는 경우, 우리는이 기능을 사용하는 것을 강력하게 권장합니다. 특히 접근 된 이전 파일.
     
*    **돈을 저장&#33;**   
이것은 몇 가지 기능 중 하나입니다ERDDAP™많은 돈을 절약 할 수있는 기회를 제공합니다 (약간 감소된 성과의 비용에서 비록) · 압축 비율이 예를 들면, 6:1 (때로는 훨씬 더 높을 것입니다.) , 그 후에 dataset의 자료 파일은 단지 1/6 디스크 공간을 필요로 할 것입니다. 그런 다음 1 RAID로 얻을 수 있습니다. (주어진 크기의) 6개의 RAIDS 대신 (같은 크기의) · 그것은 엄청난 비용 절감입니다. 희망적으로 수집한 일부 파일을 압축하는 능력 (오래된 것?) 다른 사람을 압축하지 (더 새로운 것?) , 그리고 어떤 시간에 그것을 바꾸기 위하여는, 당신은 파일의 일부를 압축하기 위하여 downside를 극소화합니다 (느린 접근) · 그리고 선택이 테이프에 파일을 저장하는 사이 (요청 시에만 접근 가능) RAID에 압축된 저장 (자주 묻는 질문ERDDAP) , 그런 다음 압축을 사용하는 거대한 장점이 있으므로 사용자가 대화 형 및 (상대적으로) 데이터에 빠른 액세스. 그리고 추가 RAID를 구입하여 저장할 수 있다면, 이 기능은 $30,000에 대해 저장할 수 있습니다.
     
* 모든 것EDDGridfromFiles subclasses, 데이터 파일이 외부 압축 파일임을 나타내는 확장자가 있다면 (현재:.tgz·.tar.gz·.tar.gzip·.gz·.gzip·.zip·.bz2, 또는 .Z) ·ERDDAP™dataset의 캐시 디렉토리에 파일을 decompress합니다. (그들은 이미 캐시에 있지 않다면) · 같은 바이너리 파일에 대한 사실 (₢ 킹.nc) EDDTableFromFiles의 하위 클래스.
     
* EDDTableFromFiles 하위 클래스의 경우 (예를 들어, .csv) , 파일이 읽을 때 외부 압축 파일이 켜져있는 확장이있는 데이터 파일.
     
* REQUIREMENT: 외부 압축 파일의 유형이 사용되는 경우 (₢ 킹.tgz또는.zip) 압축 파일 내부 1 개 이상의 파일을 지원하며 압축 파일에는 1 개의 파일을 포함해야합니다.
     
* REQUIREMENT : 이 기능은 외부 압축 파일의 내용이 변경되지 않았으므로 캐시 된 압축 파일이 재사용 될 수 있음을 가정합니다. 일부 또는 모든 dataset의 데이터 파일이 때때로 변경되면 해당 파일을 압축하지 마십시오. 이것은 일반적인 사용법과 일관되게, 사람들이 때때로 변화하는 필요로 하는 일반적으로 압축 파일을 하지 않기 때문에.
     
*   &lt;파일이름Regex&gt; 이 작업을하기 위해 dataset의&lt;fileNameRegex&gt;는 압축된 파일명과 일치해야 합니다. 분명히, 같은 regexes.\\*모든 파일 이름과 일치합니다. 특정 파일 형식을 지정하면, 예를 들어, .\\*\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.nc, 다음 압축 확장을 포함하기 위해 regex를 수정해야, 예를 들어, .\\ *\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.nc\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.gz(모든 파일이 있을 경우* 이름 *.nc.gz파일) .
     
* 데이터셋이 압축 및 압축 파일의 혼합을 포함하면 괜찮습니다. 이것은 당신이 어떤 파일을 믿는 경우에 유용합니다 (e.g., 이전 파일) 디스크 공간을 절약 할 수 있습니다. 이 작업을하기 위해,&lt;fileNameRegex&gt;는 압축되지 않고 압축된 파일명, 예를 들어, .\\*또는 .\\*\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.nc (|\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.gz) (그의 끝에 캡처 그룹이 있음을 지정합니다..gz옵션입니다.
     
* 언제든지 수집에 특정 파일을 압축하거나 압축하면 괜찮습니다.
dataset가 사용하지 않는 경우 [&lt;update모든NMillis&gt;] (#updateeverynmillis의 장점) , dataset의 설정[기본 정보](/docs/server-admin/additional-information#flag)이름 *ERDDAP™dataset을 다시로드하고 변경 사항을 공지합니다. 흥미롭게도 같은 dataset에서 다른 파일에 대한 다른 압축 알고리즘과 설정을 사용할 수 있습니다. (₢ 킹.bz2거의 사용된 파일을 위해,.gz자주 사용되는 파일 및 자주 사용되는 파일에 대한 압축 없음) , 단지 regex가 사용중인 파일 확장자의 모든 것을 지원해야, 예를 들어, .\\*\\.nc (|\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.gz|\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\.bz2) ·
     
* 물론, 압축 비율 및 다른 압축 알고리즘의 속도는 소스 파일과 설정과 다릅니다. (e.g., 압축 레벨) · 이 시스템을 파일에 최적화하려면 파일과 압축 설정의 범위와 함께 다른 압축 방법의 테스트를 수행하십시오. 믿을 수 없을 경우 (절대로) 설정, 우리는 약간 추천합니다gzip  (.gz) ·gzip가장 작은 압축 파일을 만들지 않습니다. (그것은 아마도 가까이) , 그러나 그것은 파일을 매우 빨리 압축하고 (더 중요한ERDDAP™이름 *) 파일을 매우 빠르게 압축합니다. 더하기,gzip소프트웨어는 모든 Linux 및 Mac OS 설치와 표준을 제공하며 Git Bash와 같은 7Zip 및 Linux 애드온과 같은 무료 도구를 통해 Windows에서 쉽게 사용할 수 있습니다. 예를 들어, 소스 파일을 into.gz파일 버전 (같은 filename, 하지만.gz이름 *) , 사용 (리눅스, 맥 OS, Git Bash)   
    gzip  *sourceName*   
으로 decompress.gz원래 파일, 사용
전체장편 *sourceName.gz*   
각 소스 파일을 디렉토리 및 하위 디렉토리에 압축하려면 recursively, use
    gzip· *감독이름*   
각각을 decompress.gz디렉토리 및 하위 디렉토리의 파일 , recursively, use
다운로드 *감독이름*   
     
* 경고: 외부 압축하지 마십시오 (gzip) 이미 내부 압축 된 파일&#33;
많은 파일이 이미 압축 된 데이터를 내부적으로 가지고 있습니다. 당신은gzip이 파일, 결과 파일이 훨씬 작지 않습니다 (&lt;5%)와ERDDAP™그들을 읽을 때 시간을 낭비 할 것입니다. 예를 들면:
    
    * 데이터 파일: 예,.nc4, 그리고.hdf5 파일: 몇몇 파일은 내부 압축을 이용합니다; 몇몇은 하지 않습니다. 압축 된 변수는 "\\_ChunkSize" 속성이 있습니다. 또한, Gridded의 그룹이면.nc또는.hdf파일은 모든 다른 크기, 그들은 내부 압축 될 가능성이있다. 그들은 모두 동일한 크기 인 경우 내부 압축되지 않습니다.
    * 이미지 파일: 예를들면, .gif, .jpg, 그리고 .png
    * 오디오 파일 : 예를 들어, .mp3 및 .ogg.
    * 비디오 파일 : 예, .mp4, .ogv 및 .webm.
    
        
하나의 불행한 확률 케이스: .wav 오디오 파일은 거대하고 내부 압축되지 않습니다. 압축하기 좋은 것 (gzip) 그러나 일반적으로 당신이 할 경우, 사용자는 자신의 브라우저에서 압축 파일을 재생할 수 없습니다.
     
* 시험 케이스: 압축 (이름 *gzip) 1523 그리드가있는 데이터 세트.nc파일.
    
    * 소스 파일의 데이터는 sparse이었다 (누락된 값의 제비) ·
    * 총 디스크 공간은 압축하기 전에 57 GB에서 7 GB로 갔다.
    * 1 시간 시점에서 데이터의 많은 요청은&lt;압축 후에 1 s.
    * 365 시간 동안 1개의 데이터 포인트 요청 (최악의 경우 상황) 에서 갔다 4 s 에 71 s.
         
    
어떤 dataset에 대한 합리적인 거래 오프이며, 확실히 infrequently 사용되는 datasets를 위해.
     
* 내부 versus 외부 압축 --
제공된 내부 파일 압축에 비교.nc4와.hdf5 파일,ERDDAP외부 압축 이진 파일에 대한 접근은 장점과 단점이 있습니다. 단점은 다음과 같습니다. 하나의 파일의 작은 부분을 읽을 때 내부 압축은 더 낫습니다.EDDGridfromFiles는 단지 몇 펑크를 제거해야합니다 (₢ 킹) 파일의 전체 파일이 아닌. 한국어ERDDAP's 접근에는 몇 가지 이점이 있습니다.
    
    *   ERDDAP™모든 유형의 데이터 파일 압축 지원 (이진과 비-빈, 예,.nc3 및 .csv) 아니다..nc4와.hdf4. 명세
    * 파일의 대량이 짧은 시간에 한 번 이상 읽을 필요가 있다면, 한 번 파일을 압축하고 많은 시간을 읽는 시간을 절약합니다. 이 글은ERDDAP™사용자는 데이터셋을 위한 Make-A-Graph를 사용하고 그래프에 작은 변화를 만듭니다.
    * 압축된 파일이 있고 동일한 수집에 압축된 파일이 없는 기능은, 어떤 파일이 압축되어 있지 않다는 것을 더 통제할 수 있습니다. 그리고 이 추가 컨트롤은 소스 파일을 정말 수정하지 않고 온다 (예를 들어 파일을 압축 할 수 있으므로,.gz그리고 그 후에 원본 파일을 얻기 위하여 그것을 decompress) ·
    * 지정된 파일이 압축되어 압축되는지 언제든지 변경할 수있는 능력 (다른 알고리즘 및 설정) 시스템의 성능에 더 많은 제어를 제공합니다. 그리고 당신은 쉽게 어떤 시간에 원본 압축 파일을 복구 할 수 있습니다.
    
접근은 모든 상황에서 승자가 아니지만, 그것은 분명하다ERDDAP외부 압축 파일에서 데이터를 제공 할 수있는 기능은 외부 압축을 사용하여 내부 압축에 합리적인 대안을 만듭니다..nc4와.hdf5. 명세 내부 압축은 주요 이유 중 하나입니다 사용.nc4와.hdf5. 명세
     
##### Cache를 제거{#decompressed-cache} 
ERDDAP™압축 된 바이너리의 decompressed 버전 (₢ 킹.nc) 파일을 읽을 필요가 있을 때 데이터 파일. decompressed 파일은 dataset의 디렉토리에 보관됩니다. *큰Parent감독* /decompressed/. 최근에 사용되지 않은 파일을 압축하면 누적 파일 크기가 &gt;10GB일 때 공간을 제거 할 수 있습니다. 설정하여 변경할 수 있습니다.&lt;압축CacheMaxGB&gt; (기본값=10) datasets에서 Xml.xml, 예를 들어,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
또한 마지막 15 분에 사용되지 않은 파일을 압축 해제하면 각 주요 데이터셋 리로드의 시작 부분에 삭제됩니다. 설정하여 변경할 수 있습니다.&lt;decompressedCacheMaxMinutes늙은&gt; (기본값=15) datasets에서 Xml.xml, 예를 들어,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
더 큰 숫자는 좋, 그러나 decompressed 파일의 cumulative 크기는 원인이 될지도 모릅니다 *큰Parent감독* 디스크 공간에서 실행하려면 심한 문제가 발생합니다.
     
* 파일을 압축하기 때문에 상당한 시간이 걸릴 수 있습니다 (0.1초에서 10초) , 압축 파일이있는 datasets는 dataset의 [설정]에서 혜택을 누릴 수 있습니다.&lt;₢ 킹 (한국어) 더 높은 숫자로 설정 (2? · 3? · 4?) · 더 높은 숫자로의 단점 (예, 5? 6? · 7?) 한 사용자의 요청이 시스템의 리소스의 높은 비율을 사용할 수 있도록, 따라서 크게 다른 사용자의 요청의 처리를 느리게. 따라서, 이상적인 nThreads 설정, 다른 설정과 다른 상황에서 다른 결과가 없습니다.
         
#### 분류된 차원 가치{#sorted-dimension-values} 
각 차원의 값은 정렬된 순서에 있습니다. (ascending 또는 후손, 제외한 첫 번째 (맨 위로) ascending이어야 하는 차원) · 값은 불규칙하게 공간화 될 수 있습니다. 어떤 관계도 없습니다. 이것은의 필요조건입니다[CF 메타데이터 표준](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)· 어떤 차원의 값이 정렬되지 않은 경우, dataset는 로드되지 않고ERDDAP™로그 파일에 첫 번째 취소 된 값을 식별합니다. *큰Parent감독* /logs/log.txt 파일 형식
    
Unsorted 치수 값은 거의 항상 소스 데이터 세트와 문제를 나타냅니다. 가장 일반적으로 잘못되거나 부적절한 파일이 집계에 포함될 때 발생합니다. 이 문제를 해결하려면 오류 메시지를 참조하십시오.ERDDAP™log.txt 파일이 종료된 시간값을 찾을 수 있습니다. 그런 다음 해당 파일을 찾을 소스 파일에서 (또는 그 후에 1) 그것은 집계에 속하지 않습니다.
    
#### 주요연혁{#directories} 
MAY 는 하나의 디렉토리 또는 디렉토리 및 하위 디렉토리에 있습니다. (자주 묻는 질문) · 대용량 파일이 있는 경우 (예를 들면, &gt;1,000) , 운영 체계 (그리고 이렇게EDDGrid파일 형식) 당신은 일련의 하위디렉토리에 파일을 저장하면 훨씬 더 효율적으로 작동합니다. (1 년 당, 또는 아주 빈번한 파일을 가진 datasets를 위한 달 당 하나) , 그래서 주어진 디렉토리에 파일의 거대한 수 없습니다.
     
#### &lt;캐시FromUrl&gt;{#cachefromurl} 
모든 것EDDGridfromFiles 및 모든 EDDTableFromFiles 데이터셋은 태그 세트를 지원합니다.ERDDAP™다운로드 및 원격 데이터셋의 모든 파일 사본을 유지, 또는 몇 가지 파일의 캐시 (다운로드) · 이것은 매우 유용합니다. 이름 *[뚱 베어 InUrl 문서](#cachefromurl)·
    
#### 원격 감독 및 HTTP 범위 요청{#remote-directories-and-http-range-requests} 
 (AKA Byte 서빙, Byte Range Requests, 수신 범위http기타 제품)   
EDDGridfromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles 및 EDDTableFromNcCFFiles, 할 수 있습니다 *현재 위치* 데이터 제공.nc원격 서버의 파일 및 서버가 지원되는 경우 HTTP를 통해 액세스[리뷰 쓰기](https://en.wikipedia.org/wiki/Byte_serving)HTTP 범위 요청을 통해 (byte 서빙을위한 HTTP 메커니즘) · 이것은 netcdf-java 때문에 가능합니다. (이름 *ERDDAP™자주 묻는 질문.nc파일 형식) 원격에서 읽기 데이터를 지원.ncHTTP 범위 요청을 통해 파일.

 **이것을 하지 마세요&#33;** 그것은 horribly 계수와 느린입니다.
대신, 사용 [&lt;cacheFromUrl&gt; 시스템 (#cachefromurl의 경우) ·

오시는 길ERDDAP™byte 범위 요청을 통해 파일로 datasets --
이 주위에 플러핑, 당신이 할 수있는 주어진 (한국어) dataset의 생각ERDDAP™큰자지.nc첨부 파일 ".nc"베이스 OPenDAP주어진 dataset를 위한 URL (₢ 킹 https://myserver.org/erddap/griddap/datasetID.nc 그리고 ?query를 추가하여 subset을 지정합니다.) , 그것은 아마도 당신이 netcdf-java를 사용할 수 있는지 묻는 것입니다,Ferret다른 것NetCDF클라이언트 소프트웨어를 통해 데이터를 읽기 HTTP 범위 요청ERDDAP· 대답은 아니, 정말 거대하지 않기 때문에 ".nc" 파일. 이 작업을 수행하려면 대신이 옵션 중 하나를 수행하십시오.

* 제품 정보(OPeN)DAP클라이언트 소프트웨어가 제공하는 griddap 서비스에 연결ERDDAP· 그것은 무엇인가DAP  (그리고 이렇게ERDDAP) 설계 되었습니다. 그것은 아주 능률적입니다.
* 또는, 소스 파일을 다운로드 (₢ 킹) 이름 *"files"시스템 (또는 subset 파일.nc· 이름 *) 컴퓨터에 netcdf-java,Ferret다른 것NetCDF클라이언트 소프트웨어 읽기 (현재 위치) 지역 파일 (₢ 킹) ·
         
#### 자주 묻는 질문{#cached-file-information} 
으로EDDGridFromFiles dataset는 첫번째 적재됩니다,EDDGridFromFiles는 모든 관련 파일에서 정보를 읽고 테이블을 만듭니다. (각 파일을 위한 1개의 줄) 각 유효 파일에 대한 정보와 각 "bad" (다른 또는 잘못된) 파일.
* 테이블도 디스크에 저장됩니다.NetCDFv3의.nc파일 형식 *큰Parent감독* /데이터셋/ *Last2CharsOf데이터셋ID* / 한국어 *datasetID* / 파일명:
사이트 맵.nc  (독특한 디렉토리 이름 목록을 보유) ·
파일 형식 제품정보.nc  (각 유효한 파일 정보로 테이블을 보유) ·
파일 형식.nc  (각 나쁜 파일 정보로 테이블을 보유) ·
* 액세스 속도EDDGridfromFiles 데이터셋 (그러나 더 많은 메모리를 사용하는 비용) , 당신은 사용할 수 있습니다
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
이름 *ERDDAP™메모리의 파일 정보 테이블의 사본을 보관합니다.
* 디스크의 파일 정보 테이블의 복사도 유용 할 때ERDDAP™종료 및 재시작: 그것은 저장EDDGridfromFiles from has to re-read 모든 데이터 파일.
* dataset가 다시로드되면ERDDAP™변경된 새 파일 및 파일에 데이터를 읽을 필요가 있습니다.
* 파일이 다른 파일에서 다른 구조가있는 경우 (예를 들어, 변수 중 하나에 대한 다른 데이터 유형, 또는 "에 대한 다른 값[단위 단위](#units)" 속성) ·ERDDAP"bad" 파일의 목록에 파일을 추가합니다. 파일에 대한 문제에 대한 정보는 *큰Parent감독* /logs/log.txt 파일.
* 이 파일로 삭제하거나 작업할 필요가 없습니다. 한 예외는: 여전히 dataset의 변경을 만드는 경우datasets.xml설정, 당신은이 파일을 강제로 삭제 할 수 있습니다ERDDAP™파일이 읽을 수 있으므로 파일의 모든 파일을 다시 읽을 수 있습니다. 이 파일을 삭제해야 할 경우, 언제 할 수 있습니다.ERDDAP™계속. (그런 다음[기본 정보](/docs/server-admin/additional-information#set-dataset-flag)dataset ASAP를 다시로드합니다.) 그러나,ERDDAP™일반적으로 그 통지datasets.xml파일은 일치하지 않습니다. 테이블 정보 및 파일 테이블을 자동으로 삭제합니다.
* 당신이 격려하고 싶은 경우에ERDDAP™저장된 dataset 정보를 업데이트하려면 (예를 들어, 방금 추가된 경우, 제거하거나 dataset의 데이터 디렉토리에 일부 파일을 변경) , 사용[주력 시스템](/docs/server-admin/additional-information#flag)힘으로ERDDAP™cached 파일 정보를 업데이트합니다.
         
#### 관련 상품{#handling-requests} 
고객의 요청이 처리되면EDDGridFromFiles는 파일이 요청한 데이터를 볼 수 있는 유효한 파일 정보로 테이블에서 신속하게 볼 수 있습니다.
     
#### 자주 묻는 질문{#updating-the-cached-file-information} 
dataset가 다시로드되면 캐시 된 파일 정보가 업데이트됩니다.
    
* dataset는 주기적으로 재부팅됩니다.&lt;dataset의 정보에 reloadEveryNMinutes&gt;datasets.xml·
* dataset는 가능한 한 빨리 다시로드됩니다.ERDDAP™당신이 추가, 제거, 감지[연락처](https://en.wikipedia.org/wiki/Touch_(Unix)· (파일의 마지막 변경 수정 시간) , 또는 datafile을 변경.
* dataset는 가능한 한 빨리 다시로드됩니다.[주력 시스템](/docs/server-admin/additional-information#flag)·

dataset가 다시로드되면ERDDAP™현재 사용 가능한 파일을 캐시 파일 정보 테이블에 비교합니다. 새 파일은 유효 파일 테이블에 읽고 추가됩니다. 더 이상 존재하지 않는 파일 테이블에서 떨어졌다. 파일 timestamp가 변경된 파일이 읽고 그 정보는 업데이트됩니다. 새로운 테이블은 메모리와 디스크에 오래된 테이블을 대체합니다.
     
#### 나쁜 파일{#bad-files} 
나쁜 파일의 테이블과 파일이 나쁜 선언 된 이유 (손상된 파일, 누락된 변수, 등.) 이메일 주소 모든 것 자주 묻는 질문 (아마 당신) dataset가 다시로드됩니다. 가능한 한 빨리이 파일을 교체하거나 수리해야합니다.
     
#### 미스링 변수{#missing-variables} 
몇몇의 파일은 몇몇이 없는 경우에dataVariabledataset의 정의된 sdatasets.xmlchunk, 그건 괜찮아. 시간 :EDDGridfromFiles는 그 파일 중 하나를 읽습니다. 파일이 변수를 가지고 있지만 모든 누락 된 값이 있습니다.
     
#### FTP Trouble/광고{#ftp-troubleadvice} 
FTP 새로운 데이터 파일이 있으면ERDDAP™서버 whileERDDAP™실행, 그 기회가있다ERDDAP™FTP 프로세스 중에 dataset을 다시로드합니다. 생각보다 더 자주 발생합니다&#33; 그것이 일어나는 경우, 파일은 유효하다 (유효한 이름이 있습니다.) , 하지만 파일은 아직 유효하지 않습니다. 이름 *ERDDAP™잘못된 파일에서 데이터를 읽으려면 결과 오류가 잘못된 파일의 테이블에 추가 될 파일이 발생할 수 있습니다. 이것은 좋지 않습니다. 이 문제를 방지하기 위해, 예를 들면 FTP'ing 파일, ABC2005를 위해 임시 파일 이름을 사용하십시오.nc\\_TEMP . 그런 다음 fileNameRegex 테스트 (더 보기) 이 관련 파일이 없다는 것을 나타냅니다. FTP 프로세스가 완료되면 올바른 이름으로 파일을 이름을 변경합니다. renaming 프로세스는 즉시 관련이 될 파일을 일으킬 것입니다.
     
#### "0 파일" 오류 메시지{#0-files-error-message-1} 
당신이 실행하는 경우[생성데이터셋Xml](#generatedatasetsxml)또는[팟캐스트](#dasdds), 또는 당신이 로드하려고 하는 경우EDDGrid...Files dataset에서ERDDAP™, 그리고 당신은 "0 파일" 오류 메시지를 표시ERDDAP™디렉토리에 0 일치하는 파일 발견 (그 디렉토리에 일치하는 파일이 있다고 생각하면) ::
    * 파일이 실제로 그 디렉토리에 있는지 확인합니다.
    * 디렉토리 이름의 맞춤법 확인.
    * fileNameRegex를 확인합니다. 그것은 정말, 정말 쉽게 regexes와 실수를 만들. 시험 목적을 위해, 모든 파일명과 일치해야 regex .\\*를 시도하십시오. (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·) 
    * 프로그램을 실행하는 사용자 확인 (예를 들어, user=tomcat (·) 톰캣/ERDDAP) 그 파일에 대한 'read' 권한이 있습니다.
    * 몇몇 운영 체계에서 (예를 들어, SELinux) 그리고 시스템 설정에 따라, 프로그램을 실행하는 사용자는 파일이 있는 디렉토리의 전체 체인에 대한 '읽' 권한이 있어야 합니다.
         
#### EDDGrid파일 스켈레톤 사이트맵{#eddgridfromfiles-skeleton-xml} 
*    **스켈레톤 XML** 모든 것EDDGridfromFiles 하위 클래스는:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*오디오파일{#eddfromaudiofiles} 
 **EDDGrid파일 형식** 이름 * **EDDTable오디오파일** 로컬 오디오 파일 모음에서 집계 데이터. (이 첫 등장ERDDAP™v1.82 니다.) 차이점은EDDGridFromAudioFiles는 다차원 데이터셋으로 데이터를 처리합니다. (2개의 차원에 보통:\\[파일 시작 (주)\\]이름 *\\[뚱 베어 파일 내 시간\\]) , 어디 EDDTableFromAudioFiles 탭 데이터로 데이터를 치료 (일반적으로 파일 startTime에 대한 열, 파일의 elapsedTime 및 오디오 채널의 데이터) ·EDDGridFromAudioFiles는 모든 파일이 동일한 샘플을 가지고 있으므로 true가 아닌 경우 EDDTableFromAudioFiles를 사용해야합니다. 그렇지 않으면, 사용할 EDD 유형의 선택은 완전히 당신의 선택입니다. EDDTableFromAudioFiles의 한 장점 : 다른 정보, 예를 들어 다른 변수를 추가 할 수 있습니다.stationID, 역 유형. 두 경우, 통일된 시간 변수의 부족은 이러한 EDD 유형의 데이터와 함께 작동하기 어렵지만, 통일된 시간 변수를 설정하는 좋은 방법이 없었습니다.

이 클래스의 슈퍼 클래스를 참조,[EDDGrid파일 형식](#eddgridfromfiles)이름 *[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 일반적인 정보.

우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 오디오 파일이 사운드 데이터의 인코딩과 관련된 정보 이외의 메타 데이터가 없기 때문에 GenerateDatasets에서 출력을 편집해야합니다. Xml는 필수 정보를 제공하기 위해 (e.g., 제목, 요약,creator\\_name, 기관, 역사) ·

상세 정보:

* 다수의 오디오 파일 형식이 있습니다. 현재,ERDDAP™.wav 및 .au 파일에서 데이터를 읽을 수 있습니다. 그것은 현재 오디오 파일의 다른 유형을 읽을 수 없습니다, 예를들면, .aiff 또는 .mp3. 다른 오디오 파일 형식 또는 .wav 및 .au의 다른 변형에 대한 지원이 필요한 경우 Chris에게 요청을 보내주십시오. noaaa.gov의 존. 또는 지금 사용할 수있는 작업으로, 당신은 PCM\\_로 오디오 파일을 변환 할 수 있습니다 제품정보 (integer 데이터) 또는 PCM\\_FLOAT (부동점 데이터) .wav 파일 그래서 그ERDDAP™그들과 함께 일할 수 있습니다.
* 현재,ERDDAP™오디오 파일을 읽을 수 있습니다.JavaAudioFormat 클래스는 PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW 및 ULAW 인코딩을 호출합니다.ERDDAP™PCM\\_UNSIGNED 값을 변환 (예, 0에서 255) 로그인 값 (예, -128에서 128) 데이터 값에 비트를 리어링함으로써.ERDDAP™ALAW와 ULAW를 변환하여 기본 인코딩된 바이트 형식을 단축합니다. (인치16) 가치. 이름 *JavabigEndian=true 데이터를 원합니다.ERDDAP™bigEndian=false로 저장된 데이터의 바이트를 리어 레인지로 (작은 endian) 정확한 값을 읽기 위해. 다른 모든 인코딩 (사이트맵) ·ERDDAP™데이터를 읽습니다.
* 시간 :ERDDAP™오디오 파일에서 데이터를 읽습니다. 파일의 사용 가능한 오디오 메타데이터를 글로벌 속성으로 변환합니다. 이것은 항상 포함합니다 (샘플 값으로 표시) 
    
문자열 audioBigEndian "false"; //true 또는 false
int 오디오 채널 1;
문자열 audioEncoding "PCM\\_SIGNED";
float audioFrameRate 96000.0; //초당
int audioFrameSize 2; // 프레임 당 데이터 바이트의 #
float audioSampleRate 96000.0; //초당
int audioSampleSizeInBits 16; // 샘플 당 채널 당 비트의 #
    
제품 정보ERDDAP's목적, 프레임은 샘플과 동일하며, 한 시점의 데이터입니다.
속성에ERDDAP™데이터에 대한 정보는 소스 파일에 있었다.ERDDAP™종종 데이터, 예를 들어, PCM\\_UNSIGNED, ALAW 및 ULAW 인코딩 된 데이터를 PCM\\_SIGNED로 변환하고 BigEndian=false 데이터는 bigEndian=true 데이터로 변환됩니다. (는 방법Java그것을 읽는) · 끝에서 데이터 값ERDDAP™항상[PCM 인코딩](https://en.wikipedia.org/wiki/Pulse-code_modulation)데이터 값 (i.e., 사운드파의 간단한 디지털 샘플) ·
* 시간 :ERDDAP™오디오 파일에서 데이터를 읽습니다. 전체 파일을 읽습니다.ERDDAP™수로 당 약 2 억 표본으로 읽을 수 있습니다. 예를 들어 샘플 속도가 초당 44,100 샘플 인 경우 2 억 샘플은 파일 당 사운드 데이터의 약 756 분으로 번역합니다. 이 데이터의 양 이상을 가진 오디오 파일이있는 경우 파일을 더 작은 펑크로 깰 필요가 있습니다.ERDDAP™읽을 수 있습니다.
* 이름 *ERDDAP™전체 오디오 파일 읽기,ERDDAP™대용량의 메모리에 액세스해야 할 수 있습니다. 이름 *[ERDDAP's Memory 설정](/docs/server-admin/deploy-install#memory)· 다시,이 문제가 있다면, 당신이 지금 사용할 수있는 작업은 작은 펑크로 파일을 파괴하는 것입니다 그래서ERDDAP™더 적은 기억으로 그들을 읽을 수 있습니다.
* 일부 오디오 파일은 잘못 작성되었습니다.ERDDAP™이러한 경우를 다루는 작은 노력. 그러나 일반적으로 오류가있을 때,ERDDAP™예외를 던질 것 (그리고 그 파일을 거부) 또는 (오류가 발견되지 않는 경우) 데이터 읽기 (그러나 데이터는 잘못 될 것입니다.) ·
*   ERDDAP™소리의 볼륨을 확인하거나 변경하지 않습니다. 이상적으로, integer 오디오 데이터는 데이터 유형의 전체 범위를 사용하도록 확장됩니다.
* 오디오 파일 및 오디오 플레이어는 누락 된 값에 대한 시스템이 없습니다. (예, -999 또는 Float.NaN) · 그래서 오디오 데이터는 누락된 값이 없습니다. 누락된 값이 있는 경우 (e.g., 오디오 파일을 길게 할 경우) , 완벽한 침묵으로 해석될 0의 시리즈를 이용합니다.
* 시간 :ERDDAP™오디오 파일에서 데이터를 읽으십시오. 항상 elapsed라는 열을 만듭니다. 각 견본을 위한 시간, 초에서 (더블로 저장) , 첫번째 표본에 관계되는 (할당 된 탈출 시각=0.0 s) · 이름 *EDDGridfromAudioFiles, 이것은 elapsedTime 축 변수가된다.
*   EDDGridFromAudioFiles는 모든 파일이 동일한 수의 샘플을 가지고 있어야 합니다. 그렇지 않다면 EDDTableFromAudioFiles를 사용해야합니다.
* 제품 정보EDDGridFromAudioFiles, 우리는 당신이 설정하는 것을 권장합니다 [&lt;치수ValuesInMemory&gt;] (#dimensionvaluesinmemory에 대하여) 으로 false (GenerateDatasets에 의해 권장 사이트맵) , 수시로 시간 차원에는 다수가 있기 때문에.
* 제품 정보EDDGridfromAudioFiles, 당신은 거의 항상 사용해야EDDGridInFiles 시스템[집회 파일 이름](#aggregation-via-file-names-or-global-metadata), 거의 항상 기록의 시작 날짜 추출 파일명에서 시간. 예를 들어,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Generate데이터셋 Xml는 이것을 격려하고 도움을 줄 것입니다.
* EDDTableFromAudioFiles의 경우, 항상 EDDTableFromFiles 시스템을 사용해야 합니다.[\\*\\*\\*fileName 가짜sourceName₢ 킹](#filename-sourcenames)파일명에서 정보를 추출하기 (거의 항상 시작 날짜 녹음 시간) 데이터의 열을 촉진합니다. 예를 들어,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
시간 형식은 단위 속성으로 지정되어야한다 :&lt;att name="units"&gt; yyyMMdd'\\_'Hmmss&lt;/에트&gt;
     
### EDDGrid파일 형식{#eddgridfrommergeirfiles} 
[ **EDDGrid파일 형식** ](#eddgridfrommergeirfiles)현지의 데이터 수집[지원하다](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)파일, 에서[Tropical Rainfall 측정 임무 (사이트맵) ](https://trmm.gsfc.nasa.gov)NASA와 일본 항공 우주 탐험기구 간의 공동 임무는 (JAXA 소개) · 한국어 IR 파일에서 다운로드 할 수 있습니다[NASA의](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/)·

EDDGridFromMergeIRFiles.java가 작성되었고 기여했습니다.ERDDAP™Jonathan Lafite와 Philippe Makowski의 R.Tech 공학 프로젝트 (라이센스: 저작권이 있는 오픈 소스) ·

EDDGridFromMergeIRFiles는 약간 특이합니다:

*   EDDGridfromMergeIRFiles는 압축 또는 압축되지 않은 소스 데이터 파일을 지원하며, 모든 조합에서 동일한 데이터 세트에 있습니다. 이것은 예를 들어, 거의 액세스 할 수없는 이전 파일을 압축 할 수 있지만 자주 액세스하는 새로운 파일을 압축합니다. 또는, 당신은 본래에서 압축의 유형을 바꿀 수 있습니다. Z 예제,.gz·
* 동일한 디렉토리에 동일한 데이터 파일의 압축 및 압축 버전이있는 경우, 확인하시기 바랍니다&lt;fileNameRegex&gt; for your dataset match and doesn't match filenames that you don't want it to match.
* Uncompressed 소스 데이터 파일에는 파일 확장이 없습니다. (i.e., no "." 파일명) ·
* 압축 소스 데이터 파일은 파일 확장이 있어야하지만,ERDDAP™파일의 내용을 검사하여 압축의 유형을 결정합니다. (예를 들어, ".Z") · 지원되는 압축 유형은 "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", "z"를 포함합니다. 시간 :ERDDAP™압축된 파일을 읽으십시오, 그것은 임시 파일에 쓰기 없이 on-the-fly를 삭제합니다.
* 모든 소스 데이터 파일은 원본 파일 이름을 사용한다: i.e., merg\\_ *프로젝트* \\_4km 픽셀 (이름 * *프로젝트* 파일의 데이터와 관련된 시간을 나타냅니다.) , 파일이 압축되면 파일 확장.

이 클래스의 슈퍼 클래스를 참조,[EDDGrid파일 형식](#eddgridfromfiles), 이 클래스의 작품과 사용법에 대한 일반적인 정보.

우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
 
### EDDGrid파일 형식{#eddgridfromncfiles} 
[ **EDDGrid파일 형식** ](#eddgridfromncfiles)현지의 데이터, 그리드,[GRIB .grb 및 .grb2](https://en.wikipedia.org/wiki/GRIB)파일,[HDF  (v4 또는 v5)  .hdf](https://www.hdfgroup.org/)파일,[.nc단백질](#ncml-files)파일,[NetCDF  (v3 또는 v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)파일 및[로드 중 ...](https://github.com/zarr-developers/zarr-python)파일 형식 (버전 2.25의) · Zarr 파일은 약간 다른 행동을 가지고 있으며 fileNameRegex 또는 pathRegex는 "zarr"을 포함해야합니다.

이것은 다른 파일 유형과 함께 작동 할 수 있습니다. (예를 들어, BUFR) , 우리는 그것을 시험하지 않았습니다 -- 저희에게 몇몇 표본 파일을 보내십시오.

* GRIB 파일을 위해,ERDDAP™.gbx 인덱스 파일을 첫번째로 만들겠습니다. 그래서 GRIB 파일은 ran Tomcat이 read+write 권한을 가지고있는 "user" 디렉토리에 있어야합니다.
* 이 클래스의 슈퍼 클래스를 참조,[EDDGrid파일 형식](#eddgridfromfiles), 이 클래스의 작품과 사용법에 대한 정보.
* 시작하기ERDDAP™v2.12의EDDGridfromNcFiles 및EDDGrid파일 형식 Unpacked는 "structures"에서 데이터를 읽을 수 있습니다..nc4와.hdf4 파일. 구조에서 변수를 식별하려면,&lt;sourceName· 형식을 사용한다: *전체StructureName* | *회원 이름* 예를 들면 groups1/myStruct|내회원
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
    
#### Gridded Nc 파일 그룹{#groups-in-gridded-nc-files} 
    [Netcdf4 파일은 그룹을 포함 할 수 있습니다.](#groups-in-gridded-nc-files) ERDDAP™단 하나의 그룹과 부모 그룹의 모든 변수에서 dataset을 만듭니다. GenerateDatasets의 특정 그룹 이름을 지정할 수 있습니다. 사이트맵 (트레일 슬래시) , 또는 ""를 사용하여 GenerateDatasets Xml는 대부분의 크기를 사용하는 변수에 대한 모든 그룹을 검색하거나 "\\[이름 *\\]" GenerateDatasets는 root 그룹에서 변수를 찾습니다.
    
첫 번째 것은 GenerateDatasetsXml는 이 유형의 dataset을 위해 질문을 대답하고 샘플 파일의 ncdump-like 구조를 인쇄합니다. 그래서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
    

### EDDGrid보낸 사람NcFilesUnpacked{#eddgridfromncfilesunpacked} 
[ **EDDGrid보낸 사람NcFilesUnpacked** ](#eddgridfromncfilesunpacked)의 변형[EDDGrid파일 형식](#eddgridfromncfiles)현지의 데이터 수집NetCDF  (v3 또는 v4)  .nc관련 파일. 차이점은이 클래스가 각 데이터 파일을 풀기 전에EDDGridfromFiles는 파일에서 보입니다:

* 그것은으로 포장 된 변수를 풀[scale\\_factor및/또는add\\_offset](#scale_factor)·
* \\_FillValue를 변환하고missing\\_valueNaN의 가치 (또는 MAX\\_VALUE integer 데이터 유형) ·
* 시간 및 타임스탬프 값을 변환합니다."seconds since 1970-01-01T00:00:00Z"·

이 클래스의 큰 장점은 다양한 가치를 다루는 방법을 제공합니다scale\\_factor·add\\_offset, \\_FillValue,missing\\_value, 또는 수집에 있는 다른 근원 파일에 있는 시간 단위. 그렇지 않으면, 당신은 같은 도구를 사용해야합니다[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)각 파일을 수정하여 파일이 처리 될 수 있도록 차이를 제거EDDGrid파일 형식 이 클래스를 위해 제대로 작동하려면 관련 속성에 대한 CF 표준을 따르십시오.

* 자주 묻는 질문EDDGrid파일 형식 이전에 시도하고 사용 실패 한 파일 그룹에서 포장EDDGridFromNcFiles, cd에서
     *큰Parent감독* /데이터셋/ *최근2Letters* / 한국어 *datasetID* / 한국어
이름 * *최근2Letters* 마지막 2 문자의datasetID·
그리고 그 디렉토리의 모든 파일을 삭제합니다.
* 시작하기ERDDAP™v2.12의EDDGridfromNcFiles 및EDDGrid파일 형식 Unpacked는 "structures"에서 데이터를 읽을 수 있습니다..nc4와.hdf4 파일. 구조에서 변수를 식별하려면,&lt;sourceName· 형식을 사용한다: *전체StructureName* | *회원 이름* 예를 들면 groups1/myStruct|내회원
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
    
Netcdf4 파일은 그룹을 포함 할 수 있습니다. 이름 *[이 문서](#groups-in-gridded-nc-files)·
    
첫번째 것은 GenerateDatasetsXml는 당신이 질문에 대답한 후에 dataset의 이 유형을 위해 입니다 표본 파일의 ncdump 같이 구조를 인쇄합니다 **이전 다음** 그것은 포장되지 않습니다. 따라서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
    
### EDDGrid론PM180{#eddgridlonpm180} 
[ **EDDGrid론PM180** ](#eddgridlonpm180)아이의 경도값을 수정 (뚱 베어)  EDDGrid어떤 경도 값이 180 이상인 dataset (예를 들면, 0에서 360) 그들은 범위 -180에서 180이다 (경도 Plus 또는 Minus 180, 그러므로 이름) ·

* 이것은 경도가 180보다 더 큰 데이터 세트를 만들 수있는 방법을 제공합니다.OGC(주) (예를 들어WMS서버에서ERDDAP) , 모두부터OGC서비스는 -180에서 180까지 경도 값을 요구합니다.
* discontinuity 근처의 작업은 장애가 경도 0 또는 경도 180에 있는지 여부에 관계없이 문제가 발생합니다. 이 dataset 유형은 당신이 같은 dataset의 2개의 버전을 제안해서 모두를 위한 그 문제를 피할 것입니다:
범위 0 ~ 360의 경도 값 ("Pacificentric"?) ·
범위의 경도 값으로 1 ~ 180 ~ 180 ("Atlanticentric"?) ·
* 모든 경도 값이 180보다 큰 어린이 데이터 세트를 위해 새로운 경도 값의 모든 것은 단순히 360도 낮습니다. 예를 들어, 180 ~ 240의 경도 값이있는 데이터 세트는 -180 ~ -120의 경도 값으로 데이터 세트가됩니다.
* 세계 전체의 경도 값이 있는 아이 데이터셋 (대략 0에서 360) , 새로운 경도 가치는 둥글게 될 것입니다 (에 대해) 180에서 180:
원래 0 ~ 거의 180 값은 변경되지 않습니다.
원래 180 ~ 360 값은 -180 ~ 0으로 변환되며 경도 배열의 시작으로 이동합니다.
* 180을 넘은 어린이 데이터 세트를 위해 전 세계를 커버하지 마십시오.ERDDAP™세계를 커버하는 dataset를 만들기 위해 필요한 누락된 값을 삽입합니다. 예를 들어, 140 ~ 200의 경도 값이있는 어린이 데이터 세트는 -180 ~ 180의 경도 값으로 데이터 세트가됩니다.
180 ~ 200의 어린이 값은 -180 ~ -160입니다.
새로운 경도 값은 -160에서 140로 삽입됩니다. 해당 데이터 값은 \\_FillValues입니다.
140~180의 어린이 값은 변경되지 않습니다.
누락 된 값의 삽입은 확률이 보일 수 있지만, 갑자기 점프 경도 값에서 결과 몇 가지 문제를 피합니다. (-160에서 140으로) ·
* 내 계정[생성데이터셋Xml](#generatedatasetsxml), 특별한 "dataset 유형",EDDGridLonPM180ErddapCatalog, 당신이 생성 할 수 있도록datasets.xml제품정보EDDGrid각 LonPM180 데이터 세트EDDGrid데이터 세트ERDDAP180보다 더 큰 경도 값이 있습니다. 이 데이터셋의 두 가지 버전을 제공합니다:
원래, 범위 0에서 360의 경도 값,
그리고 새로운 데이터 세트, 범위의 경도 값 -180에서 180.
    
각 어린이 데이터 세트EDDGridLonPM180 데이터 세트는EDDGridfromErddap dataset는 원래의 데이터셋을 점합니다.
새로운 dataset의datasetID원본 데이터 세트의 이름은 "\\_LonPM180"입니다.
예를 들어,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
뚱 베어EDDGridLonPM180 데이터 세트 **이름 *** 원본 dataset에datasets.xml· 그것은 가능한 문제를 피합니다.
    
대안으로, 당신은 대체할 수 있습니다EDDGridfromErddap 어린이 데이터 세트 원본 데이터 세트datasets.xml· 그런 다음 dataset의 한 버전이있을 것입니다. -180에서 180까지의 경도 값이 있습니다. Dataset의 각 버전이 더 편리할 때 시간이 있기 때문에 이것을 discourage.
    
* dataset의 두 가지 버전을 제공하면 예를 들어, 경도 0 ~ 360과 경도 -180에서 180로 하나씩 :
    * 선택하실 수 있습니다 [&lt;(주) 이름 *WMS&gt;공개&lt;/액세스 이름 *WMS&gt;] (#액세서리) 0-360 dataset을 forcibly 비활성화하여WMSdataset에 대한 서비스. 그런 다음 데이터셋의 LonPM180 버전만 사용할 수 있습니다.WMS·
    * LonPM180 dataset up-to-date를 유지하는 방법의 몇 가지가 있습니다.
        * 아이 dataset이면EDDGridfromErddap dataset는 같은 데이터셋을 참조합니다.ERDDAP™, LonPM180 dataset 직접 아래 데이터 세트에 가입하려고합니다 그래서 항상 최신입니다. 직접 구독은 구독을 유효하게 하는 이메일이 생성되지 않습니다 - 검증은 자동으로 수행되어야 합니다.
        * 아이 dataset가 아니라면EDDGridfromErddap dataset 같은ERDDAP™, LonPM180 dataset는 아래 데이터셋에 가입하기 위해 정기 구독 시스템을 사용하려고 합니다. 구독 시스템이 있는 경우ERDDAP™설정, 당신은 구독을 검증하는 이메일을 요청해야합니다. 이용안내
        * 구독 시스템이 있는 경우ERDDAP™LonPM180 데이터셋은 LonPM180 데이터셋이 다시로드될 때까지 때때로 메타데이터를 출력할 수 있습니다. 구독 시스템이 꺼져 있다면, [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) LonPM180 dataset의 설정은 더 작은 숫자로, 그래서 그것은 더 많은 가능성이 아이 dataset sooner에 변화를 잡아.

#### EDDGridLonPM180 스켈레톤 사이트맵{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid론0360{#eddgridlon0360} 
[ **EDDGrid론0360** ](#eddgridlon0360)아이의 경도값을 수정 (뚱 베어)  EDDGrid몇몇 경도 가치가 있는 dataset 0 보다는 더 적은 (예를 들면, -180에서 180) 그들은 범위 0에서 360 (이름 *) ·

* discontinuity 근처의 작업은 장애가 경도 0 또는 경도 180에 있는지 여부에 관계없이 문제가 발생합니다. 이 dataset 유형은 당신이 같은 dataset의 2개의 버전을 제안해서 모두를 위한 그 문제를 피할 것입니다:
범위의 경도 값으로 1 ~ 180 ~ 180 ("Atlanticentric"?) ·
범위 0 ~ 360의 경도 값 ("Pacificentric"?) ·
* 모든 경도 값이 0보다 적은 어린이 데이터 세트를 위해, 새로운 경도 값의 모든 것은 단순히 360도입니다. 예를 들어, -180 ~ -120의 경도값을 가진 데이터셋은 180 ~ 240의 경도값으로 데이터셋이 됩니다.
* 세계 전체의 경도 값이 있는 아이 데이터셋 (대략 -180에서 180) , 새로운 경도 가치는 둥글게 될 것입니다 (에 대해) 0에서 360:
원래 -180 ~ 0 값은 180 ~ 360로 변환되며 경도 배열의 끝으로 이동합니다.
원래 0 ~ 거의 180 값은 변경되지 않습니다.
* lon=0을 초과하는 아동 데이터셋을 위해 전 세계를 커버하지 마십시오.ERDDAP™세계를 커버하는 dataset를 만들기 위해 필요한 누락된 값을 삽입합니다. 예를 들어, -40 ~ 20의 경도 값이있는 어린이 데이터 세트는 0 ~ 360의 경도 값으로 데이터 세트가됩니다.
0 ~ 20의 어린이 값은 변경되지 않습니다.
새로운 경도 값은 20에서 320로 삽입됩니다. 해당 데이터 값은 \\_FillValues입니다.
-40 ~ 0의 어린이 값은 320 ~ 360입니다.
누락 된 값의 삽입은 확률이 보일 수 있지만, 갑자기 점프 경도 값에서 결과 몇 가지 문제를 피합니다. (예, 20에서 320까지) ·
* 내 계정[생성데이터셋Xml](#generatedatasetsxml), 특별한 "dataset 유형",EDDGridLon0360에서 ErddapCatalog, 당신이 생성 할 수 있도록datasets.xml제품정보EDDGrid각 Lon0360 데이터 세트EDDGrid데이터 세트ERDDAP180보다 더 큰 경도 값이 있습니다. 이 데이터셋의 두 가지 버전을 제공합니다:
원래, 범위 0에서 360의 경도 값,
그리고 새로운 데이터 세트, 범위의 경도 값 -180에서 180.
    
각 어린이 데이터 세트EDDGridLon0360 dataset는 일 것입니다EDDGridfromErddap dataset는 원래의 데이터셋을 점합니다.
새로운 dataset의datasetID원본 데이터 세트의 이름은 "\\_Lon0360"입니다.
예를 들어,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
뚱 베어EDDGridLon0360 데이터 세트 **이름 *** 원본 dataset에datasets.xml· 그것은 가능한 문제를 피합니다.
    
대안으로, 당신은 대체할 수 있습니다EDDGridfromErddap 어린이 데이터 세트 원본 데이터 세트datasets.xml· 그런 다음, dataset의 한 버전이있을 것입니다. 0 ~ 360의 경도 값이 있습니다. Dataset의 각 버전이 더 편리할 때에는 시간이 있기 때문에 이것을 discourage.
    
* dataset의 두 가지 버전을 제공하면 예를 들어, 경도 0 ~ 360과 경도 -180에서 180로 하나씩 :
    * 선택하실 수 있습니다 [&lt;(주) 이름 *WMS&gt;공개&lt;/액세스 이름 *WMS&gt;] (#액세서리) 0 ~ 360 데이터 세트로 즉시 비활성화WMSdataset에 대한 서비스. 그런 다음 데이터 세트의 -180 ~ 180 버전 만 사용할 수 있습니다.WMS·
    * Lon0360 dataset up-to-date를 유지하기 위한 두 가지 방법이 있습니다.
        * 아이 dataset이면EDDGridfromErddap dataset는 같은 데이터셋을 참조합니다.ERDDAP™, Lon0360 dataset 직접 underlying dataset에 가입하여 항상 최신입니다. 직접 구독은 구독을 유효하게 하는 이메일이 생성되지 않습니다 - 검증은 자동으로 수행되어야 합니다.
        * 아이 dataset가 아니라면EDDGridfromErddap dataset 같은ERDDAP™, Lon0360 dataset는 아래 데이터셋을 구독하기 위해 정기 구독 시스템을 사용하려고 합니다. 구독 시스템이 있는 경우ERDDAP™설정, 당신은 구독을 검증하는 이메일을 요청해야합니다. 이용안내
        * 구독 시스템이 있는 경우ERDDAP™Lon0360 데이터셋은 Lon0360 데이터셋이 다시로드될 때까지 때때로 메타데이터를 출력할 수 있습니다. 구독 시스템이 꺼져 있다면, [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) Lon0360 dataset의 설정은 더 작은 숫자로, 그래서 그것은 더 많은 가능성이 아이 dataset sooner에 변화를 잡아.
#### EDDGridLon0360 스켈레톤 사이트맵{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid사이드 바이트{#eddgridsidebyside} 
[ **EDDGrid사이드 바이트** ](#eddgridsidebyside)2개 이상의 집계EDDGrid데이터셋 (아이들) 측에 의하여 측.

* resulting dataset는 모든 자식 datasets에서 변수를 가지고 있습니다.
* 부모 dataset 및 모든 자식 datasets MUST에는 다른datasetID· 가족의 이름이 정확히 동일하다면, dataset은 로드에 실패합니다. (축의 값이 분류되지 않은 오류 메시지) ·
* 모든 어린이 MUST에는 동일한 소스 값이 있습니다.axisVariable₢ 킹\\[1개 이상\\]  (예를 들면, 위도, 경도) · 시험의 정밀도는에 의해 결정됩니다[경기AxisNDigits](#matchaxisndigits)·
* 아이들은 다른 소스 값을 가질 수 있습니다.axisVariable₢ 킹\\[0 댓글\\]  (예를 들면, 시간) , 그러나 그들은 보통 크게 동일합니다.
* 부모의 데이터 세트는 모든 것을 가지고 나타납니다axisVariable₢ 킹\\[0 댓글\\]모든 어린이의 소스 값.
* 예를 들어, 벡터의 u-component 및 벡터의 v-component를 가진 다른 소스 데이터 세트와 함께 소스 데이터 세트를 결합하므로 결합 된 데이터가 제공 될 수 있습니다.
* 이 방법으로 만든 아이들은 개인적으로 개최됩니다. 데이터셋은 별도로 접근하지 않습니다. (예를 들어, 클라이언트 데이터 요청 또는[flag 파일](/docs/server-admin/additional-information#flag)) ·
* 부모의 글로벌 메타데이터 및 설정은 글로벌 메타데이터와 첫 아이를 위한 설정에서 제공됩니다.
* 첫 아이를 만드는 동안 예외가 있다면 부모가 만들지 않습니다.
* 다른 아이들을 창조하는 동안 예외가 있는 경우, 이것은 이메일을 이메일로 보냅니다EverythingTo (지정된[설정.xml](/docs/server-admin/deploy-install#setupxml)) 다른 아이들과 함께 계속.
#### EDDGridSideBySide 스켈레톤 사이트맵{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridAggregateExisting디멘션{#eddgridaggregateexistingdimension} 
[ **EDDGridAggregateExisting디멘션** ](#eddgridaggregateexistingdimension)2개 이상의 집계EDDGriddatasets 각 값의 다른 범위가 있는 값은 첫번째 차원이지만 다른 차원의 동일한 값입니다.

* 예를 들어, 어린이 데이터 세트는 366 값을 가질 수 있습니다. (2004년) 시간 차원 및 다른 아이의 경우 365 값을 가질 수 있습니다. (2005년) 시간 차원을 위해.
* 다른 모든 차원의 모든 값 (예를 들면, 위도, 경도) 모든 아이들과 동일합니다. 시험의 정밀도는에 의해 결정됩니다[경기AxisNDigits](#matchaxisndigits)·
* 분류된 차원 가치 - 각 차원의 값은 정렬된 순서에 있습니다. (ascending 또는 후손) · 값은 불규칙하게 공간화 될 수 있습니다. 아무 것도 없습니다. 이것은의 필요조건입니다[CF 메타데이터 표준](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)· 어떤 차원의 값이 정렬되지 않은 경우, dataset는 로드되지 않고ERDDAP™로그 파일에 첫 번째 취소 된 값을 식별합니다. *큰Parent감독* /logs/log.txt 파일 형식
    
Unsorted 치수 값은 거의 항상 소스 데이터 세트와 문제를 나타냅니다. 가장 일반적으로 잘못되거나 부적절한 파일이 집계에 포함될 때 발생합니다. 이 문제를 해결하려면 오류 메시지를 참조하십시오.ERDDAP™log.txt 파일이 종료된 시간값을 찾을 수 있습니다. 그런 다음 해당 파일을 찾을 소스 파일에서 (또는 그 후에 1) 그것은 집계에 속하지 않습니다.
    
* 부모 데이터 세트와 어린이 데이터 세트 MUST는 다른datasetID· 가족의 이름이 정확히 동일하다면, dataset은 로드에 실패합니다. (축의 값이 분류되지 않은 오류 메시지) ·
* 현재 아이 dataset MUST는EDDGridFromDap dataset 및 MUST는 집계된 차원의 가장 낮은 값이 있습니다. (일반적으로 가장 오래된 시간 값) · 다른 아이들의 모든 것은 거의 동일한 datasets일 것입니다 (첫번째 차원을 위한 가치에서 다만 다르게) 그들은 단지 그들의 것에 의해 지정됩니다.sourceUrl·
* 집계 데이터 세트는 첫 아이에서 메타 데이터를 가져옵니다.
* 더 보기[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들 수 있습니다datasets.xml한국어EDDGridAggregateExistingDimension based on the set of files, 그리스Hyrax또는 THREDDS 서버. 예를 들어, 이 입력을 사용하여 프로그램을 (URL의 "/1988"은 예가 더 빠릅니다.) ::
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
결과를 사용할 수 있습니다.&lt;sourceUrl&gt; 태그 또는 삭제 및 취소&lt;sourceUrl&gt; 태그 (그래서 새 파일이 각 시간마다 공지됩니다. dataset은 다시로드됩니다.
#### EDDGridAggregateExistingDimension 골격 사이트맵{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGrid이름 *{#eddgridcopy} 
[ **EDDGrid이름 *** ](#eddgridcopy)다른 지역의 사본을 만들고 유지EDDGrid's data and serves data from the local copy. 이 데이터는 다음과 같습니다.

*   EDDGrid이름 * (그리고 탭 데이터의 경우,[EDDTable코피](#eddtablecopy)) 사용 하 고 매우 효과적인
     **먼 자료 근원에서 서빙 자료로 가장 큰 문제의 몇몇에 해결책:** 
    * 원격 데이터 소스에서 데이터 액세스는 느립니다.
        * 그것은 느리게 느리기 때문에 (예를 들어, 서버의 효율적인 유형) ·
        * 너무 많은 요청에 의해 압도적이기 때문에,
        * 또는 서버 또는 원격 서버가 제한되는 대역폭이기 때문에.
    * 먼 dataset는 때때로 사용할 수 없습니다 (다시, 다양한 이유로) ·
    * 데이터에 대한 한 소스에 의존하지 않습니다 잘 (예를 들어, 많은 사용자와 많은 경우ERDDAPs 사용) ·
         
* 어떻게 작동 --EDDGrid복사는 자동으로 작성하여 이 문제를 해결하고 로컬 복사본의 로컬 복사본을 유지하고 로컬 복사본에서 데이터를 게재합니다.ERDDAP™로컬 복사에서 데이터를 매우 빠르게 제공 할 수 있습니다. 로컬 복사가 원격 서버에 부담을 완화합니다. 그리고 로컬 복사본은 원래의 백업이며, 뭔가가 원래에 발생합니다.
    
dataset의 로컬 복사본을 만드는 것에 대해 새로운 것은 없습니다. 여기에 새로운 것은이 클래스가 그것을 만드는 것입니다\\*뚱 베어\\*생성 및\\*제품정보\\*데이터의 로컬 복사\\*·\\*원격 데이터 소스 및\\*메타데이터 추가\\*데이터를 복사하는 동안.
    
* 데이터의 Chunks --EDDGrid복사는 원격에서 데이터를 요청하여 데이터의 로컬 복사본을 만듭니다.&lt;dataset&gt;. 왼쪽의 각 값에 대한 펑크가 있습니다. (1 년 전) 축 변수.EDDGrid복사는 축선을 위한 원격 데이터셋의 색인 수에 의존하지 않습니다 -- 그 변화할지도 모릅니다.
    
경고: 데이터의 펑크의 크기가 너무 크면 (· 2기가바이트) 그것은 문제 발생,EDDGrid복사는 사용할 수 없습니다. (죄송합니다, 우리는 미래의이 문제에 대한 해결책을 가지고 있기를 바랍니다.) 
    
*   \\[자주 묻는 질문EDDGrid복사 -
원격 데이터가 다운로드 가능한 파일을 통해 사용할 수 있다면, 웹 서비스, 사용[뚱 베어 FromUrl 옵션EDDGrid파일 형식](#cachefromurl)원격 파일의 로컬 복사본을 만들고 로컬 파일에서 데이터를 제공합니다.\\]
* 로컬 파일 -- 데이터의 각 척은 별도에 저장됩니다.NetCDF하위 디렉토리에 파일 *큰Parent감독* / 복사/ *datasetID* / 한국어 (지정된[설정.xml](/docs/server-admin/deploy-install#setupxml)) · 축 값에서 생성된 파일명은 파일명-safe를 만들기 위해 수정됩니다. (예를 들어, hyphens는 "x2D"로 대체됩니다.) -- 이것은 실제적인 자료에 영향을 미치지 않습니다.
     
* 새로운 자료 -- 각 시간EDDGrid복사는 다시로드, 그것은 원격 검사&lt;dataset&gt;는 chunks가 사용할 수 있는지 확인합니다. 데이터의 펑크 파일이 이미 존재하지 않는 경우, 펑크가 큐에 추가되는 요청.ERDDAP's taskThread 프로세스 데이터의 펑크에 대한 모든 누적 요청, one-by-one. taskThread의 활동에 대한 통계를 볼 수 있습니다.[상태 페이지](/docs/server-admin/additional-information#status-page)그리고 에서[매일 보고서](/docs/server-admin/additional-information#daily-report)· (예,ERDDAP™이 프로세스에 여러 작업을 할당할 수 있지만, 원격 데이터 소스의 대역폭, 메모리 및 CPU 시간 및 로컬의 많은 사용ERDDAP's 대역폭, 메모리 및 CPU 시간, 좋은 아이디어는 아닙니다.) 
    
참고 : 첫 번째 시간EDDGrid복사는 적재됩니다, (모두 잘 가면) 데이터의 펑크에 대한 많은 요청은 taskThread의 큐에 추가되지만 로컬 데이터 파일이 생성되지 않습니다. 그래서 생성자는 실패하지만 taskThread는 계속 작동하고 로컬 파일을 만들 것입니다. 모든 것이 잘되면 taskThread는 로컬 데이터 파일과 dataset를 다시로드하는 다음 시도를 만들 것입니다. (15 분) 성공하지만, 초기 데이터의 매우 제한된 금액으로.
    
참고 : 로컬 데이터 세트가 몇 가지 데이터가 있으며 귀하의ERDDAP먼 dataset가 일시적으로 또는 영구적으로 접근하지 않는 경우에, 국부적으로 dataset는 아직도 일할 것입니다.
    
경고: 먼 dataset가 크고/또는 먼 서버가 느리면 (그게 문제가 아니라?&#33;) , 그것은 완벽한 현지 사본을 만들기 위하여 장시간을 가지고 갈 것입니다. 일부 경우에, 필요한 시간은 허용되지 않습니다. 예를 들어, T1 라인에 1 TB 데이터를 전송 (0.15 GB / s의) 최적의 조건 하에서 최소 60 일 소요. 또한, 원격 및 로컬 컴퓨터에서 대역폭, 메모리 및 CPU 시간을 많이 사용합니다. 이 솔루션은 원격 데이터 세트의 관리자에게 하드 드라이브를 메일하는 것입니다. s/he는 데이터 세트의 복사본을 만들 수 있으며 하드 드라이브를 다시 메일합니다. 그 데이터를 시작점으로 사용EDDGrid복사하면 데이터가 추가됩니다. (즉,[Amazon의 EC2 클라우드 서비스](https://aws.amazon.com/importexport/)시스템에는 대역폭이 많이 있습니다.) 
    
경고: 왼쪽에 주어진 값이 있는 경우 (1 년 전) 축 변수는 원격 데이터셋에서 사라집니다.EDDGrid복사는 로컬 복사된 파일을 삭제하지 않습니다. 당신이 원하는 경우, 당신은 스스로 삭제할 수 있습니다.
    
#### 그리드 복사 checkSource 자료실{#grid-copy-checksourcedata} 
더 보기datasets.xml이 dataset를 위해 선택적인 꼬리표가 있을 수 있습니다
```
    <checkSourceData>true</checkSourceData>  
```
기본값은 true입니다. false로 설정한 경우, dataset는 추가 데이터가 있는지 확인하기 위해 소스 데이터셋을 확인하지 않습니다.

#### 한국어{#onlysince} 
당신은 말할 수 있습니다EDDGrid소스 데이터 세트의 하위 세트 사본을 만들려면 전체 소스 데이터 세트 대신 양식에 태그를 추가하여&lt;만시간&gt; *이름 * 주요 특징* &lt;/onlySince&gt; dataset의datasets.xml펑크.EDDGridCopy는 첫 번째 차원의 값과 관련된 데이터 값을 다운로드합니다. (보통 시간 차원) 더 큰 *이름 * 주요 특징* · *이름 * 주요 특징* 일 수 있습니다:
    * 지정된 상대 시간now- *n단위* ·
예를 들어,&lt;만시간&gt;now-2 년&lt;/onlySince&gt; dataset은 외부 차원의 값이 있는 데이터에 대한 로컬 복사본을 만듭니다. (보통 시간 값) 마지막 2 년 안에 있습니다 (re-evaluated는 dataset가 reloaded 때, 새로운 자료를 복사하기 위하여 봅니다) · 이름 *[now- *n단위* 구문 설명](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)· 이것은 첫번째 차원이 시간 자료가 있는 경우에 유용합니다, 보통 그것.
        
        EDDGrid복사는 시간이 지남에 따라 데이터가 있는 로컬 데이터 파일을 삭제하지 않습니다.now- *n단위* · 당신은 당신이 선택하는 경우에 그 파일을 언제든지 삭제할 수 있습니다. 당신이 할 경우, 우리는 강력하게 당신이 설정하는 것이 좋습니다[기본 정보](/docs/server-admin/additional-information#flag)파일 삭제 후EDDGridcached 파일의 목록을 업데이트하려면 복사하십시오.
        
    * ISO 8601 문자열로 지정된 시간에 고정 점yyyy-MM-ddTHH:mm:ssZ·
예를 들어,&lt;onlySince&gt;2000-01-01T00:00:00Z&lt;/onlySince&gt;는 첫번째 차원의 값이 \\&gt;=2000-01-01T00:00:00Z인 데이터의 로컬 복사본을 만들기 위해서만 dataset를 말합니다. 이것은 첫번째 차원이 시간 자료가 있는 경우에 유용합니다, 보통 그것.
         
    * 부동점 번호.
예를 들어,&lt;페이지:1234567...»&lt;/onlySince&gt; . 단위는 첫번째 차원의 목적지 단위일 것입니다. 예를 들면, 시간 차원을 위해, 단위에ERDDAP™항상"seconds since 1970-01-01T00:00:00Z"· 너무 946684800.0"seconds since 1970-01-01T00:00:00Z"2000-01-01T00:00:00Z와 동일합니다. 이것은 항상 유용한 옵션이지만 특히 유용합니다. 첫 번째 치수가 시간 데이터가 없을 때.

#### EDDGrid복사 Recomended 사용{#eddgridcopy-recomended-use} 
1. 이름 *&lt;데이터셋&gt; 이름 * (기본 유형, 아니EDDGrid이름 *) 먼 자료 근원을 위해.
     **원하는 메타데이터를 포함한 올바르게 작동하십시오.** 
2. 너무 느리면 XML 코드를 추가하여EDDGrid복사 dataset.
    * 다른 용도datasetID  (아마datasetID의 이전datasetID약간의) ·
    * 제출하기&lt;(주) 에&gt;,&lt;reloadEveryNMinutes&gt; 과&lt;onChange&gt; 원격에서EDDGridXML에EDDGrid복사의 XML. (그들의 가치EDDGrid복사 문제; 내부 dataset에 대한 그들의 값은 부과됩니다.) 
3.  ERDDAP™데이터의 로컬 복사를 만들고 유지한다.
         
* 경고:EDDGrid복사는 각 펑크의 데이터 값이 변경되지 않는다는 것을 가정한다. if/when they do, 당신은 수동으로 펑크 파일을 삭제해야 *큰Parent감독* / 복사/ *datasetID* / 변경 및[기본 정보](/docs/server-admin/additional-information#flag)삭제 된 펑크가 교체되는 데이터 세트. dataset에 이메일 구독이 있는 경우, dataset가 먼저 다시로드할 때, dataset가 다시로드할 때, dataset가 다시로드할 때, dataset가 다시로드될 때 두 개의 이메일을 받게 됩니다. (제품정보) 새로운 로컬 데이터 파일을 감지합니다.
     
* 모든 축 값은 동일해야합니다.
왼쪽을 제외한 각 축의 경우 (1 년 전) , 모든 값은 모든 아이들과 동일해야합니다. 시험의 정밀도는에 의해 결정됩니다[경기AxisNDigits](#matchaxisndigits)·
     
* 설정, 메타데이터, 변수 --EDDGrid복사는 설정, 메타데이터 및 동봉된 소스 데이터셋에서 변수를 사용합니다.
     
* 메타데이터 -- 어떤 것을 바꿀 필요가 있는 경우에addAttributes또는 소스 dataset과 관련된 변수의 순서를 변경:
    1. 관련 기사addAttributes소스 dataset에 대한datasets.xml, 필요에 따라.
    2. 복사된 파일 중 하나를 삭제합니다.
    3. 설정하기[기본 정보](/docs/server-admin/additional-information#flag)dataset를 즉시 재로드합니다. 만약 플래그를 사용 하 고 데이터 세트에 이메일 구독이 있는 경우, 두 개의 이메일: dataset first reloads 그리고 데이터를 복사 하기 시작 하는 경우, 그리고 dataset loads 다시 (제품정보) 새로운 로컬 데이터 파일을 감지합니다.
    4. 삭제 된 파일은 새로운 메타 데이터로 재생됩니다. 소스 데이터 세트가 사용할 수없는 경우,EDDGrid복사 dataset는 재생된 파일에서 metadata를 얻을 것이다, 그것이 가장 젊은 파일이기 때문에.
#### EDDGrid복사 skeleton 사이트맵{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCassandra에서{#eddtablefromcassandra} 
[ **EDDTableCassandra에서** ](#eddtablefromcassandra)데이터 처리[Cassandra, 그리스](https://cassandra.apache.org/)테이블. Cassandra 이다 a noSQL 데이터베이스.

*   ERDDAP™Cassandra v2 및 v3를 사용하여 설정의 변경이나 차이가 없습니다. 우리는 시험했습니다[Cassandra v2 과 v3 부터 아파치](https://cassandra.apache.org/download/)· 그것은 가능성이ERDDAP™또한 DataStax에서 Cassandra로 다운로드 할 수 있습니다.
     
* 2019년 8월 - 2021년 5월, 우리는 AdoptOpenJdk에 일하기 위하여 Cassandra를 얻고 말했습니다Javav8. 그것은 EXCEPTION\\_ACCESS\\_VIOLATION). 뚱 베어 (2021년 5월) , 그 문제는 사라졌다 : 우리는 성공적으로 Cassandra v2.1.22 및 AdoptOpenJdk jdk8u292-b10을 사용할 수 있습니다.
     
#### 1개의 테이블{#one-table} 
Cassandra는 관계있는 데이터베이스가하는 방식으로 "joins"를 지원하지 않습니다. 한국어ERDDAP™EDDTableFromCassandra dataset maps 에 한 (아마도 1의 하위 세트) Cassandra 테이블.

#### Cassandra, 그리스datasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™Cassandra와 함께 제공Java드라이버, 그래서 당신은 별도로 설치할 필요가 없습니다.
* EDDTableFromCassandra에 관한 문서의 모든 정보를 조심하십시오. 몇 가지 세부 사항은 매우 중요합니다.
* 더 CassandraJava드라이버는 Apache Cassandra와 함께 작동하도록 합니다. (1.2 이상) DataStax 기업 (3.1 이상) · Apache Cassandra 1.2.x를 사용하는 경우, start\\_native\\_transport를 설정하려면 각 노드의 cassandra.yaml 파일을 편집해야 합니다. true, 각 노드를 다시 시작합니다.
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다 (특히 [&lt;뚱 베어 KeySourceNames&gt;에 대하여 (#partitionkeysourcenames의 이름) ). CASSandra 관리자에게 연락하여 EDDTableFromCassandra dataset에 XML을 생성해야 하는 대부분의 정보를 수집할 수 있습니다.
    
Generate데이터셋 Xml에는 EDDTableFromCassandra의 두 가지 특별한 옵션이 있습니다.
    
    1. "&#33;&#33;&#33;LIST&#33;&#33;&#33;"를 입력하면 (견적 요청) keyspace를 위해, 프로그램은 keyspaces의 명부를 표시할 것입니다
    2. 특정 키 스페이스를 입력하고 "&#33;&#33;&#33;LIST&#33;&#33;&#33;"를 입력하면 (견적 요청) 테이블 이름의 경우, 프로그램은 그 키 공간과 열에 테이블의 목록을 표시합니다.
##### 케이스 감도{#case-sensitivity} 
* Case-insensitive Keyspace 및 테이블 이름 -
Cassandra는 케이스 과민한 방법에 있는 keyspace와 테이블 이름을 대우합니다. 이 때문에, 당신은 결코 예약 된 단어를 사용 (하지만 다른 경우) Cassandra keyspace 또는 테이블 이름으로.
* 케이스 과민한 란 이름 --
기본적으로 Cassandra는 케이스 과민한 방법에 있는 열명을 대우합니다. Cassandra의 예약 된 단어 중 하나를 열 이름으로 사용하는 경우 (하지 마세요&#33;) , 당신은 MUST 사용
```
        <columnNameQuotes>"<columnNameQuotes>  
```
내 계정datasets.xml이 dataset 그래서 Cassandra 과ERDDAP™경우에 과민한 방법에 있는 란 이름을 대우할 것입니다. 이것은 당신을 위한 다량 두통일 것입니다, 그것이 란 이름의 케이스 과민한 버전을 결정하기 위하여 어렵기 때문에 - Cassandra는 거의 항상 진실한 케이스에 관계없이 모든 더 낮은 케이스로 란 이름을 표시합니다.
* 관련 경험을 가질 수있는 Cassandra 관리자와 긴밀하게 협력하십시오. dataset가 로드에 실패하면 read the[오류 메시지](#troubleshooting-tips)왜 찾지 못했습니다.
         
#### Cassandra, 그리스&lt;연결하기 재산 & gt;{#cassandra-connectionproperty} 
Cassandra에는 안으로 지정될 수 있는 연결 재산이 있습니다datasets.xml· 이들 중 대부분은 Cassandra-의 성능에 영향을 미칩니다.ERDDAP™연결. 불행히도, Cassandra 재산은 programmatically에서 놓아야 합니다Java, 그래서ERDDAP™각 재산에 대한 코드가 있어야합니다.ERDDAP™지원하다. 현재,ERDDAP™이 속성을 지원:
 (기본값은 우리가 보는 것 이다. 시스템의 기본값은 다를 수 있습니다.) 

*    **일반 옵션**   
    &lt;연결하기 재산 name=" **압축** "&gt; *이름 *|사이트맵|다운로드* &lt;/연결 재산&gt; (case-insensitive, 기본값=none)   
     (일반 압축 조언 : Cassandra와 연결하면 'none'을 사용하십시오.ERDDAP™로컬/빠른 사용 'LZ4' 연결이 Remote/slow인지.)   
    &lt;연결하기 재산 name=" **한국어** "&gt; *비밀번호* &lt;/연결 재산&gt; (그것은 리터럴'/')   
    &lt;연결하기 재산 name=" **미터** "&gt; *한국어|이름 ** &lt;/연결 재산&gt; (2021-01-25는 default=true, 이제 무시하고 항상 false)   
    &lt;연결하기 재산 name=" **항구 항구** "&gt; *뚱 베어* &lt;/연결 재산&gt; (기본 바이너리 프로토콜 =9042)   
    &lt;연결하기 재산 name=" **네트워크** "&gt; *한국어|이름 ** &lt;/연결 재산&gt; (기본값=false)   
     (SSL을 사용하지 않는 빠른 시도. 성공하면 어떻게 했는지 말해주세요.) 
*    **Query 옵션**   
    &lt;연결하기 재산 name=" **이름 * 1 단계** "&gt; *모든 것|이름 *|각 \\_quorum|로컬\\_one|지역 \\_quorum|로컬\\_serial|한국어| |(주)|상세 정보|두 번째* &lt;/연결 재산&gt; (case-insensitive, 기본값=ONE)   
    &lt;연결하기 재산 name=" **회사 소개** "&gt; *뚱 베어* &lt;/연결 재산&gt; (기본값=5000)   
     (더 작은 값으로 fetchSize를 설정하지 마십시오.)   
    &lt;연결하기 재산 name=" **serialConsistency 수준** "&gt; *모든 것|이름 *|각 \\_quorum|로컬\\_one|지역 \\_quorum|로컬\\_serial|한국어| |(주)|상세 정보|두 번째* &lt;/연결 재산&gt; (case-insensitive, default=SERIAL의 경우) 
*    **소켓 옵션**   
    &lt;연결하기 재산 name=" **연결TimeoutMillis** "&gt; *뚱 베어* &lt;/연결 재산&gt; (기본값=5000)   
     (연결되지 않음 TimeoutMillis는 더 작은 값입니다.)   
    &lt;연결하기 재산 name=" **계속하기** "&gt; *한국어|이름 ** &lt;/연결 재산&gt;
    &lt;연결하기 재산 name=" **읽음TimeoutMillis** "&gt; *뚱 베어* &lt;/연결 재산&gt;
     (Cassandra의 기본값 readTimeoutMillis는 12000이지만ERDDAP™기본값을 120000로 변경합니다. Cassandra가 readTimeouts를 던지고 있다면 Cassandra가 때때로이 시간 전에 던지기 때문입니다. 문제는 파티션 당 너무 많은 데이터를 저장하는 가능성이 더 높습니다. 열쇠 조합.)   
    &lt;연결하기 재산 name=" **수신BufferSize** "&gt; *뚱 베어* &lt;/연결 재산&gt;
     (default receiveBufferSize가 무엇인지 무시합니다. 작은 값으로 설정하지 마십시오.)   
    &lt;연결하기 재산 name=" **회사 소개** "&gt; *뚱 베어* &lt;/연결 재산&gt;
    &lt;연결하기 재산 name=" **사이트맵** "&gt; *한국어|이름 ** &lt;/연결 재산&gt; (기본값=null) 

다른 연결 속성을 설정할 수 있는 경우, 우리의 참조[더 많은 지원 얻기에 섹션](/docs/intro#support)·

Tomcat의 주어진 시작을 위해, connectionProperties는 주어진 Cassandra URL을 위해 첫번째로 데이터셋 생성됩니다. 모든 데이터셋과 같은 URL을 공유하는 모든 후속 데이터셋은 그 고유의 connectionProperties를 사용합니다.
    
#### 사이트맵{#cql} 
Cassandra Query 언어 (사이트맵) SQL과 같은 superficially, 전통적인 데이터베이스에 의해 사용되는 쿼리 언어. 이름 *OPeNDAP'탭 데이터 요청은 mimic SQL tabular 데이터 요청으로 설계되었으며, 가능ERDDAP™CQL Bound/PreparedStatements로 탭 데이터 요청을 변환합니다.ERDDAP™자주 묻는 질문[로그.txt](/docs/server-admin/additional-information#log)이름 *
텍스트로 성명: *사이트 맵*   
당신이 볼 진술의 버전은 문장의 텍스트 표현이 될 것이며 "?" 제약 값은 배치됩니다.
       
너무 간단합니다 -- 불행히도, CQL에는 많은 제한이 있습니다. 예를 들어, 파티션 키 열은 = 및 IN으로 변형 될 수 있으므로ERDDAP™Cassandra에 몇몇 constraints를 보내고 자료가 Cassandra에서 받은 후에 모든 constraints를 적용합니다. 지원하다ERDDAP™Cassandra와 효율적으로 거래, 당신은 지정해야합니다 [&lt;뚱 베어 KeySourceNames&gt;에 대하여 (#partitionkeysourcenames의 이름) ·&lt;클러스터ColumnSourceNames&gt;] (#clustercolumnsourcenames의 이름) · [&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames의 이름) 내 계정datasets.xml이 dataset를 위해. 이것은 도움이 가장 중요한 방법입니다ERDDAP™Cassandra와 효율적으로 작업. 당신이 말하지 않는 경우ERDDAP™이 정보, dataset은 고통스럽게 느립니다ERDDAP™Cassandra 자원의 톤을 사용합니다.
     
#### &lt;뚱 베어 KeySourceNames&gt; 또는{#partitionkeysourcenames} 
파티션 키는 Cassandra 테이블에 중앙 역할을합니다.ERDDAP™그들의 것을 알고 있어야sourceNames 및, 관련 경우, 그와 함께 일하는 방법에 대한 다른 정보.
* 당신은 MUST 파티션 키 소스 열 이름의 comma-separated 목록을 지정datasets.xml이름 *&lt;뚱 베어 KeySourceNames&gt;.
간단한 예,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
더 복잡한 예제,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp 파티션 키 -- 파티션 키 열 중 하나가 다른 타임스탬프 열의 coarser 버전을 가지고있는 타임스탬프 열, 이것을 통해 지정
     *PartitionKeySourcName/otherColumnSourceName/time\\_precision*   
이름 *time\\_precision중 하나[time\\_precision](#time_precision)strings 다른 곳에서 사용ERDDAP·
Z를 타고time\\_precision문자열은 기본적으로, 그래서 그것은 중요하지 않다면time\\_precision문자열은 Z 또는 아닙니다.
예를 들어,ERDDAP™날짜/표시시간/1970-01-01 as "일련은 이것을 사용하여 표본 시간에 constraints에서 건설될 수 있습니다time\\_precision· constraints의 실제 변환은 더 복잡하지만, 개요입니다.
     **관련이 있을 때마다 이것을 사용하십시오.** 지원하다ERDDAP™Cassandra와 효율적으로 작업합니다. 열 사이의 관계가 Cassandra 테이블에 존재하고 말할 수없는 경우ERDDAP™, dataset는 고통스럽게 느립니다ERDDAP™Cassandra 자원의 톤을 사용합니다.
* 제품정보 가치 분할 열쇠 -- 당신이 원하는 경우ERDDAP™하나의 파티션 키의 하나의 값으로 작업하는 dataset, 지정 *partitionKeySourceName=값* ·
숫자 열에 대한 견적을 사용하지 마십시오. 예를 들어, deviceid=1007
문자열 열에 대한 견적을 사용, 예를 들어, stationid="Point Pinos"
* Dataset 기본 정렬 순서 -- 파티션 키의 순서&lt;dataVariable&gt;에서datasets.xmlCassandra의 결과의 기본 정렬 순서를 결정합니다. 물론, 사용자는 승인 및 결과의 주어진 세트에 대한 다른 종류의 주문을 요청할 수 있습니다.orderBy (· *변수의 comma-separated 목록* ·) 자주 묻는 질문
* 기본적으로 Cassandra 및ERDDAP™case-insensitive 방식으로 열명을 치료합니다. 그러나 설정하면[열NameQuotes](#case-sensitivity)에 ",ERDDAP™case-sensitive 방식으로 Cassandra 열 이름을 대우할 것입니다.
         
#### &lt;뚱 베어 KeyCSV&gt;{#partitionkeycsv} 
이 지정한 경우,ERDDAP™파티션에 대한 Cassandra를 묻는 대신 사용할 것입니다 데이터셋이 다시로드됩니다. 이것은 다른 파티션 키 값의 목록을 제공합니다. 타임즈는 1970-01-01T00:00:00Z 이후 초로 지정되어야 합니다. 그러나 두 가지 특별한 대체 방법이 있습니다. (각 문자열로 인코딩) ::

1) 시간 (사이트맵 (주))   (MAY는 문자열로 인코딩됩니다)   
2) "시간 (anISO8601StartTime, strideSeconds, 스톱 타임) · (문자열로 인코딩됩니다.)   
뚱 베어 시간은 ISO8601일 수 있습니다 시간 또는 "now-nUnits" 시간 (예, "now-3분) ·
뚱 베어 시간은 시작의 정확한 경기가 될 필요가 없습니다. 시간 + x strideSeconds.
한 번에 행 () 값은 각 쿼리 전에 여러 행으로 확장되므로 파티션 목록 열쇠는 항상 완벽하게 최신일 수 있습니다.
예를 들어,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
파티션 키 조합의이 테이블에 확장:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;클러스터ColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra는 클러스터 컬럼에서 SQL-like constraints를 수용합니다. (파티션 키 후 (₢ 킹) ) · 그래서, 당신이이 열을 통해 식별하는 데 필수적입니다&lt;클러스터ColumnSourceNames&gt;. 이 활성화ERDDAP™Cassandra와 효율적으로 작업합니다. 클러스터 란이 있는 경우, 당신은 말할 수 없습니다ERDDAP, dataset는 고통스럽게 느립니다ERDDAP™Cassandra 자원의 톤을 사용합니다.
    * 예를 들어,&lt;클러스터ColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2에 대한 의견* &lt;/ 클러스터ColumnSourceNames&gt;
    * Cassandra 테이블에는 클러스터 열이 없습니다.&lt;clusterColumnSourceNames&gt;, 또는 값을 지정합니다.
    * 기본적으로 Cassandra 및ERDDAP™case-insensitive 방식으로 열명을 치료합니다. 그러나 설정하면[열NameQuotes](#case-sensitivity)에 ",ERDDAP™케이스 과민한 방법에 있는 Cassandra 란 이름을 대우할 것입니다.
         
#### &lt;색인ColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra 수락'='이차 색인 열에 대한 제약, 당신이 명시적으로 생성 된 열은을 통해
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (예, 보호자가 필요합니다.)   
그래서, 당신이이 열을 통해 식별하는 경우 매우 유용합니다&lt;indexColumnSourceNames&gt;. 이 활성화ERDDAP™Cassandra와 효율적으로 작업합니다. 인덱스 열이 있는 경우, 당신은 말할 수 없습니다ERDDAP, 몇몇 쿼리는, 고통스럽게 느립니다ERDDAP™Cassandra 자원의 톤을 사용합니다.
* 예를 들어,&lt;indexColumnSource이름&gt; *myIndexColumn1, myIndexColumn2에 대한 자세한 정보* &lt;/indexColumnSource이름&gt;
* Cassandra 테이블에는 색인 란이 없는 경우에, 지정하지 마십시오&lt;indexColumnSourceNames&gt;, 또는 값을 지정합니다.
* 경고: Cassandra 색인은 데이타베이스 색인과 같이 아닙니다. Cassandra indexes만 도움으로'='제약. 그들은 단지[(주)](https://cassandra.apache.org/doc/latest/cql/indexes.html)총 값보다 훨씬 더 명백한 값을 가진 열을 위해.
* 기본적으로 Cassandra 및ERDDAP™case-insensitive 방식으로 열명을 치료합니다. 그러나 설정하면[열NameQuotes](#case-sensitivity)에 ",ERDDAP™케이스 과민한 방법에 있는 Cassandra 란 이름을 대우할 것입니다.
         
#### &lt;maxRequestFraction&gt; 또는{#maxrequestfraction} 
시간 :ERDDAP™  (이름 *) dataset를 적재하십시오,ERDDAP™Cassandra에서 파티션 키의 명백한 조합의 목록을 가져옵니다. 거대한 데이터 세트를 위해, 조합의 수는 거대일 것입니다. 대부분의 요청 또는 dataset의 모든 요청을 방지하려면 (자주 묻는 질문ERDDAP™대부분의 또는 모든 데이터를 더 필터링하기 위해) , 당신은 말할 수 있습니다ERDDAP™일부 양의 조합을 줄 수 있는 요청만 허용&lt;maxRequestFraction&gt;, 1e-10 사이의 부동점 번호입니다. (이는 요청이 10 억 달러 이상의 조합을 필요로 할 수 없다는 것을 의미합니다.) 과 1 (기본값은 전체 dataset에 대한 요청이 될 수 있음을 의미합니다.) ·
예를 들어, dataset이 파티션 키와 maxRequestFraction의 10000 가지 조합이 0.1로 설정되면
그런 다음 1001 이상의 조합에서 데이터가 오류 메시지를 생성합니다.
1000 또는 몇몇 조합에서 자료를 필요로 하는 그러나 요구는 허용될 것입니다.
    
일반적으로, 더 큰 dataset, 더 낮은 당신은 설정해야&lt;maxRequestFraction&gt;. 그래서 당신은 작은 데이터 세트에 대해 1로 설정할 수 있습니다, 0.1 중간 크기의 데이터 세트, 0.01 큰 데이터 세트에 대한, 그리고 0.0001 거대한 데이터 세트.
    
이 접근법은 완벽합니다. 그것은 거부되고 허용되는 몇몇 적당한 요구에 지도할 것입니다. 그러나 그것은 어려운 문제이며이 솔루션은 아무것도보다 훨씬 낫다.
    
#### Cassandra, 그리스subsetVariables {#cassandra-subsetvariables} 
다른 EDDTable datasets로, 당신은 comma-separated 명부를 지정할 수 있습니다&lt;dataVariable·destinationName"라는 글로벌 속성에 s[subsetVariables](#subsetvariables)" 값의 제한된 수를 가진 변수를 식별합니다. dataset은 .subset 웹 페이지를 가지고 있으며 많은 웹 페이지에 드롭다운 목록에서 해당 변수에 대한 구별 값 목록을 표시합니다.
    
단지 파티션 키 변수와 목록의 정적 열을 포함 STRONGLY ENCO사이트 맵 Cassandra는 명백한 조합의 명부를 아주 빨리 생성하고 쉽게 매번 dataset는 다시 로드될 수 있을 것입니다. 하나의 예외는 몇 가지 다른 타임스탬프 열의 coarse 버전 인 타임스탬프 파티션 키입니다. 아마도이 목록에서 벗어나는 것이 가장 좋습니다.subsetVariables많은 값이 있기 때문에 사용자에게 매우 유용합니다.
    
non-partition key 를 포함 하는 경우, 비 정적 변수 목록에, 그것은 아마 **이름 *** Cassandra를 위한 computationally 비싼 매번 dataset는 reloaded, 때문에ERDDAP™dataset의 모든 행을 통해 정보를 생성합니다. 사실, 쿼리는 실패 할 가능성이있다. 그래서, 매우 작은 데이터 세트를 제외하고, 이것은 STRONGLY DISCOURAGED입니다.
    
#### Cassandra 데이터 유형{#cassandra-datatypes} 
그에 대한 몇몇 주변[Cassandra 데이터 유형](https://cassandra.apache.org/doc/latest/cql/types.html)지도에ERDDAP™데이터 유형, 당신은 지정해야합니다 [&lt;데이터타입&gt;] (#자료) 각 태그 [&lt;dataVariable&gt;] (#데이터variable) 이름 *ERDDAP™어떤 dataType 사용. 표준ERDDAP™제품정보 제품정보 (가장 일반적인 대응 Cassandra 데이터 유형) 이름:
    
*   [한국어](#boolean-data)  (한국어) ·ERDDAP™그런 다음 바이트로 저장
* 사이트맵 (int, 범위가 -128에서 127 인 경우) 
* 뚱 베어 (int, 범위가 -32768에서 32767 인 경우) 
* 뚱 베어 (int, 카운터?, varint?, 범위가 -2147483648에서 2147483647) 
* 긴 수명 (bigint, 카운터?, varint?, 범위가 -9223372036854775808에 9223372036854775807 인 경우에) 
* 팟캐스트 (팟캐스트) 
* 더블 더블 (더블, 소수 (정밀의 손실) , 타임스탬프) 
* ₢ 킹 (ascii 또는 텍스트, 그들은 이상의 1 문자) 
* 스트레이트 (ascii, text, varchar, inet, uuid, timeuuid, blob, 지도, 설정, 목록?) 

Cassandra의[타임 스탬프](#cassandra-timestamp-data)특별한 경우: 사용ERDDAP두 배 자료 유형.

String dataType을 지정하면ERDDAP™Cassandra 지도, 세트 또는 명부를 위해, 각 Cassandra 줄에 지도, 세트 또는 명부는 단 하나 줄에 단일 문자열로 개조될 것입니다ERDDAP™테이블.ERDDAP™목록의 대안 시스템; 아래 참조.

 *제품정보* 목록 --ERDDAP한국어&lt;데이터타입&gt;] (#자료) Cassandra 태그dataVariables는 일정을 포함 할 수 있습니다.ERDDAP™제품정보 제품정보 (더 보기) Cassandra 목록 열에 사용될 수 있는 몇몇 특별한 dataTypes 플러스: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. 이 목록 열 중 하나가 결과에 전달 될 때ERDDAP™, 소스 데이터의 각 행은 목록으로 확장될 것입니다. 크기 (mm) () 데이터의 행ERDDAP; 간단한 자료 제품정보 (예를 들어, int) 그 소스 데이터 행은 중복 목록입니다. 크기 (mm) () 시간. 결과가 1 개 이상의 목록 변수를 포함하면 데이터의 주어진 행에 모든 목록은 동일한 크기와 MUST는 "parallel"리스트 또는ERDDAP™오류 메시지를 생성합니다. 예를 들어, ADCP의 현재 측정을 위해
(주)\\[0 댓글\\], uCurrent의\\[0 댓글\\], vCurrent의\\[0 댓글\\], 그리고 zCurrent\\[0 댓글\\]모든 관련, 및
(주)\\[1개\\], uCurrent의\\[1개\\], vCurrent의\\[1개\\], 그리고 zCurrent\\[1개\\]모든 관련, ...
그렇지 않다면ERDDAP™여러 행으로 목록을 확장하려면ERDDAP™테이블, 문자열을 지정dataVariable비밀번호 전체 목록은 한 줄에 하나의 문자열로 표시됩니다.ERDDAP·
    
#### Cassandra TimeStamp 자료{#cassandra-timestamp-data} 
Cassandra의 타임스탬프 데이터는 항상 시간대의 인식입니다. timezone을 지정하지 않고 타임 스탬프 데이터를 입력하면 Cassandra는 타임 스탬프가 로컬 시간대를 사용합니다.
    
ERDDAP™timestamp 데이터를 지원하며 항상 데이터를 제공합니다.Zulu/GMT 시간대. 그래서 당신은 다른 시간대를 사용하여 Cassandra의 타임스탬프 데이터를 입력하면Zulu/GMT, 타임스탬프 데이터에 대한 모든 쿼리를 할 필요가 있음ERDDAP™사용 방법Zulu/GMT 시간대. 시간표시 값이 나올 때 놀랐습니다.ERDDAP현지에서 시간대 스위치로 인해 몇 시간으로 이동Zulu/GMT 시간.

* 내 계정ERDDAP이름 *datasets.xml, 에서&lt;dataVariable&gt; timestamp 변수 태그, 설정
```
          <dataType>double</dataType>  
```
·&lt;addAttributes&gt; 세트
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 제안 : 데이터가 시간 범위 인 경우, 타임 스탬프 값이 implied time range의 중심을 참조하는 것이 유용합니다. (예를 들어, noon) · 예를 들어, 사용자가 다른 데이터 세트에서 2010-03-26T13:00Z에 대한 데이터를 가지고 있으며, 매일 데이터가있는이 Cassandra 데이터 세트에서 가장 가까운 데이터를 원하면 2010-03-26T12:00Z에 대한 데이터 (그 날짜에 대한 Cassandra 데이터를 대표) 가장 잘 (이전 또는 이후의 자정과 반대, 그것이 가장 적은 명백한 곳) ·
*   ERDDAP™유틸리티를 가지고[숫자 변환 시간 /에서 문자열 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)·
* 이름 *[이름 *ERDDAP™거래 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)·
         
#### 정수 null{#integer-nulls} 
Cassandra는 Cassandra int에서 null을 지원합니다. (ERDDAP™뚱 베어) 그리고 bigint (ERDDAP™긴 수명) 열, 하지만ERDDAP™integer data type에 대한 true null을 지원하지 않습니다.
기본적으로 Cassandra 정수 null이 변환됩니다.ERDDAP™에 2147483647 int 열, 또는 9223372036854775807 긴 열을 위해. 이 텍스트 출력 파일의 일부 유형에서 "NaN"로 나타날 것입니다. (예를 들어, .csv) , ""다른 유형의 텍스트 출력 파일 (예를 들어,.htmlTable) , 그리고 특정 번호 (누락 된 int 값에 대한 2147483647) 다른 유형의 파일 (예를 들어, 같은 바이너리 파일.nc그리고 매트) · 사용자는 "NaN", e.g, "&windSpeed=NaN"을 참조하여 누락 된 값의이 유형의 데이터를 검색 할 수 있습니다.
    
Cassandra 테이블에 누락 된 값을 나타내는 다른 정수 값을 사용하는 경우, 그 값을 확인하시기 바랍니다datasets.xml::

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Cassandra 부동점 열의 경우, null은 NaNs로 변환됩니다.ERDDAP· Cassandra 데이터 유형에 대한 문자열로 변환ERDDAP™, null은 빈 문자열로 변환됩니다. 그것은 문제가되지 않습니다.
    
#### "WARNING : 이미 쿼리를 준비하는 재 준비"{#warning-re-preparing-already-prepared-query} 
* "WARNING : 이미 쿼리를 준비" *뚱 베어* /logs/카탈리나.out (또는 기타 Tomcat 로그 파일)   
Cassandra 문서는 동일한 쿼리가 PreparedStatement로 두 번 만들면 문제가 있습니다. (더 보기) · (더 보기[버그 보고서](https://datastax-oss.atlassian.net/browse/JAVA-236)·) Cassandra mad를 만들기 위해,ERDDAP™모든 PreparedStatements를 캐시하여 재사용 할 수 있습니다. 그 캐시는 톰캣 / when이 손실됩니다.ERDDAP™다시 시작하지만, PreparedStatements가 주어진 세션과 관련되어 있기 때문에 괜찮다고 생각합니다. (이름 *Java그리고 Cassandra) , 또한 잃어버린. 그래서, 당신은이 메시지를 볼 수 있습니다. 다른 솔루션이 없습니다. 다행히, 그것은 경고, 오류 (Cassandra 위협이 성능 문제로 이어질 수 있음) ·
    
Cassandra 주장 그 PreparedStatements 이다 좋은 영원히, 그래서ERDDAP's cached PreparedStatements는 최신/무효하지 않아야 합니다. 그것이 사실이 아니라면 특정 PreparedStatements에 대한 오류가 발생합니다.ERDDAP™이름 *ERDDAPPreparedStatements의 캐시.
    
#### Cassandra 보안{#cassandra-security} 
이름 *[Securing 케이드라](https://cassandra.apache.org/doc/latest/operating/security.html)

Cassandra와 함께 일할 때, 당신은 안전 하 고 안전 하 게 당신의 Cassandra 손상 또는 데이터에 액세스할 수 있도록 악의적인 사용자를 방지 하 고 안전 하 게 해야 합니다.ERDDAP™안전한 방법으로 일을 할 수 있습니다.

* 우리는 당신을 격려합니다ERDDAP™Cassandra와 Cassandra 사용자에게만 액세스 할 수있는 연결 **이름 *** · (₢ 킹) 그리고 READ 특권을 가지고 있습니다.
* 우리는 당신이 연결에서 설정하는 것을 권장합니다ERDDAP™에 Cassandra 그래서 그 그것
    * 항상 SSL을 사용합니다.
    * 만 하나의 IP 주소에서 연결을 허용 (또는 주소의 한 블록) 그리고 하나에서ERDDAP™사용자 및
    * MD5 해시드 양식의 비밀번호만 전송합니다.
*   \\[KNOWN 장점\\]연결하기 (비밀번호) 일반 텍스트로 저장datasets.xml· 관리자가 Cassandra 암호를 입력 할 수있는 방법을 발견하지 않았습니다.ERDDAPTomcat의 시작 (사용자 입력 없이 발생) , 그래서 암호는 파일에 접근해야합니다. 이 더 안전한 것을 만들기 위하여:
    * 이름 * (이름 *ERDDAP™관련 기사) 소유자이어야한다datasets.xmlREAD 및 WRITE 액세스가 있습니다.
    * user=tomcat만 포함하는 그룹을 만드십시오. chgrp를 사용하여 그룹을 만들기 위해datasets.xmlREAD 특권과 함께.
    * chmod를 사용하여 o-rwx 특권을 할당합니다. ("other" 사용자를위한 READ 또는 WRITE 액세스 없음) 제품정보datasets.xml·
* 현재 위치ERDDAP™, 암호 및 기타 연결 속성은 "private"에 저장됩니다Java변수.
* 클라이언트의 요청은 Cassandra에 대한 CQL 요청을 생성하기 전에 유효성 검사됩니다.
* Cassandra에 요청은 CQL 주입을 방지하기 위해 CQL Bound / PreparedStatements로 만들어졌습니다. 어쨌든, Cassandra는 기존 데이터베이스보다 CQL 주사에 감염되지 않습니다.[SQL 주입](https://en.wikipedia.org/wiki/SQL_injection)·
         
#### Cassandra 속도{#cassandra-speed} 
Cassandra는 빠르고 느린 일 수 있습니다. 당신이 그것을 빨리 만들 수있는 몇 가지가있다 :
* 일반 -
CQL의 자연은 쿼리는[이름 *](https://en.wikipedia.org/wiki/Declarative_programming)· 사용자가 원하는 것을 지정합니다. 쿼리가 처리되거나 최적화되는 방법을 위한 사양이나 힌트가 포함되지 않습니다. 그래서 아무 방법도 없다ERDDAP™Cassandra가 쿼리를 최적화하는 그런 방식으로 쿼리를 생성 (또는 어떤 방식으로 쿼리가 처리되는지 지정합니다.) · 일반적으로 Cassandra 관리자가 일을 설정하는 것입니다. (예를 들면, 색인) 특정 유형의 쿼리를 최적화합니다.
     
* coarser-precision timestamp 파티션 키와 관련있는 타임스탬프 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬 컬럼을 지정 []&lt;뚱 베어 KeySourceNames&gt;에 대하여 (#partitionkeysourcenames의 이름) 가장 중요한 방법은 도움이ERDDAP™Cassandra와 효율적으로 작업. 이 관계가 Cassandra 테이블에 존재한다면 당신은 말할 수 없습니다ERDDAP™, dataset는 고통스럽게 느립니다ERDDAP™Cassandra 자원의 톤을 사용합니다.
     
* 클러스터 열 지정 [&lt;클러스터ColumnSourceNames&gt;] (#clustercolumnsourcenames의 이름) 가장 중요한 방법은 두 번째입니다.ERDDAP™Cassandra와 효율적으로 작업. 클러스터 란이 있는 경우, 당신은 말할 수 없습니다ERDDAP, 데이터에 대 한 가능한 쿼리의 큰 하위 세트가 필요 하 고 통증이 느립니다ERDDAP™Cassandra 자원의 톤을 사용합니다.
     
* 이름 *[제품정보](https://cassandra.apache.org/doc/latest/cql/indexes.html)일반적으로 변형 된 변수 --
당신은 종종 " =" constraints로 변형 된 Cassandra 열에 대한 색인을 생성하여 몇 쿼리를 단축 할 수 있습니다.
    
Cassandra는 목록, 세트, 또는 지도 란을 위한 색인을 만들 수 없습니다.
    
* 인덱스 컬럼 지정 [&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames의 이름) 도움이 중요한 방법ERDDAP™Cassandra와 효율적으로 작업. 인덱스 열이 있는 경우, 당신은 말할 수 없습니다ERDDAP, 데이터에 대한 일부 쿼리는 무효, 통증이 느리다ERDDAP™Cassandra 자원의 톤을 사용합니다.
     
#### Cassandra 통계{#cassandra-stats} 
*   ["Cassandra stats" 진단 메시지](#cassandra-stats)-- 모든 것ERDDAP™Cassandra dataset에 사용자 쿼리,ERDDAP™로그 파일에 줄을 인쇄합니다. *큰Parent감독* /logs/log.txt, 예를 들어 쿼리와 관련된 일부 통계와 함께,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
위의 예에서 숫자를 사용하여, 즉:

* 시간 :ERDDAP™이름 * (이름 *) 이 데이터 세트로드, Cassandra는 말했다ERDDAP™파티션 키의 10000 가지 조합이 있었다.ERDDAP™파일에 다른 조합의 모든 캐시.
* 사용자의 제약으로 인해,ERDDAP™식별 2 원하는 데이터를 가질 수있는 10000의 조합. 그래서,ERDDAP™Cassandra에 2개의 전화를, 분할 열쇠의 각 조합을 위해 하나 만들 것입니다. (그것은 Cassandra가 필요한 것.) 분명히, 큰 데이터 세트가 파티션 키의 많은 조합을 가지고 있고 주어진 요청은 압축되지 않습니다. 각 요청이 설정하여 키 공간을 줄일 수 있습니다 [&lt;maxRequest활동&gt; (#maxrequestfraction의 특징) · 여기에, 2/10000=2e-4, 이는 maxRequestFraction 보다 적은 (0.10%년) , 그래서 요청이 허용되었습니다.
* 파티션 키에 제약을 적용 한 후,[클러스터 열](#clustercolumnsourcenames)·[색인 열](#indexcolumnsourcenames)는ERDDAP™, Cassandra는 자료의 1200의 줄을에 돌려주었습니다ERDDAP™결과 설정에서.
* 더 보기 설정해야 함[제품정보 유형 = *이름 ** 이름 *](#cassandra-datatypes)사이트맵 (목록 당 평균 10 항목) , 때문에ERDDAP™Cassandra에서 12000 행으로 1200 행 확장ERDDAP·
*   ERDDAP™항상 Cassandra의 데이터에 사용자의 제약을 모두 적용합니다. 이 경우 Cassandra가 줄의 수를 7405로 줄을 처리하지 않은 제약. 그것은 사용자에게 보내진 행 수입니다.

이 진단 메시지의 가장 중요한 사용은 확인하는 것입니다ERDDAP™당신이 그것을하는 것을 생각하고 있습니다. 그렇지 않다면 (예를 들어, 예상대로 다른 조합의 수를 줄 수 없습니까?) , 다음 당신은 잘못된 것을 파악하려고 정보를 사용할 수 있습니다.
 
* 연구 및 실험을 찾아 더 나은 설정 [&lt;연결Property&gt;] (#cassandra 연결 property) 이름 *
 
* Cassandra와의 네트워크 연결 속도 확인ERDDAP· 연결이 느리면 개선 할 수 있는지 확인하십시오. 가장 좋은 상황은 때ERDDAP™같은 서버에 실행 (빠른 속도) 연결되는 Cassandra 노드를 실행하는 서버로 전환합니다.
 
* 진료시간 여기에서 정보를 읽고 Cassandra 문서에 신중하게. 실험. 자주 묻는 질문 Cassandra-의 경우ERDDAP™연결은 여전히 예상보다 느립니다, 당신의 Cassandra 테이블의 스키마와 당신의 포함ERDDAP™펑크의datasets.xml우리를보고[더 많은 지원 얻기에 섹션](/docs/intro#support)·
 
* 다른 모든 것이 실패하면
데이터 저장을 고려하십시오.NetCDFv3의.nc파일 형식 (기타 제품.nc파일 사용[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged 배열 자료 구조 etc로 취급될 수 있습니다ERDDAP이름 *[EDDTableNcCFFiles에서](#eddtablefromnccffiles)) · 로그인한 경우 (각 공간과 시간의 펑크에 대한 데이터) ·ERDDAP™데이터를 신속하게 추출할 수 있습니다.
         
#### EDDTableCassandra 스켈레톤 XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 연락처{#eddtablefromdapsequence} 
[ **연락처** ](#eddtablefromdapsequence)1- 및 2-level sequences 내의 변수 처리[DAP](https://www.opendap.org/)서버와 같은DAP1개 (에 의해 https://www.pmel.noaa.gov/epic/software/dapper/ , 이제 중단) ·

* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다. 브라우저의 소스 데이터셋의 DDS 및 DAS 파일을 찾는 데 필요한 정보를 수집할 수 있습니다 (.das 및 .dds를 추가하여sourceUrl(예: 예) https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* 변수는DAP.dds 응답이 변수를 붙드는 데이터 구조가 "sequence"임을 나타냅니다. (케이스 insensitive) ·
* 일부 경우에, 당신은 순서 내에서 시퀀스를 볼 것 이다, 2-level sequence -- EDDTableFromDapSequence 이러한 핸들, 너무.
#### EDDTableFromDapSequence 골격 사이트맵{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTable데이터베이스{#eddtablefromdatabase} 
[ **EDDTable데이터베이스** ](#eddtablefromdatabase)하나의 관계 데이터베이스 테이블에서 데이터를 처리하거나[이름 *](https://en.wikipedia.org/wiki/View_(database)).

#### 1개의 테이블 또는 전망{#one-table-or-view} 
당신이 봉사하는 자료가 2개 이상 테이블에 있는 경우에 (따라서 한 번에 테이블에서 데이터를 추출하기 위해 가입해야합니다.) , 당신은 1개를 만들 필요가 있습니다[관련 제품](https://en.wikipedia.org/wiki/Denormalization)  (이미 가입) 테이블 또는[이름 *](https://en.wikipedia.org/wiki/View_(SQL)) 당신이 1개의 dataset로 유효한 만드는 자료의 전부에ERDDAP·

큰, 복잡한 데이터베이스에 대해, 그것은 다른 유형의 데이터로 여러 개의 펑크를 분리하는 감각을 만들 수 있습니다.ERDDAP·

사용의 denormalized 테이블 만들기ERDDAP™당신에게 미적 생각처럼 들릴 수 있습니다. 견적 요청 왜 몇 가지 이유가 있습니다ERDDAP™denormalized 테이블과 일:

* 사용자를 위해 광대하게 쉽습니다.
시간 :ERDDAP™데이터 세트를 하나의 단순하고 정정 된 단일 테이블으로 제시하면 데이터를 이해하는 사람에게 매우 쉽습니다. 대부분의 사용자는 정상화 된 테이블을 듣지 못하고, 매우 몇 가지 이해 키, 외국 키, 또는 테이블 가입, 그리고 그들은 거의 확실히 가입의 다른 유형의 세부 사항을 알 수 없습니다, 또는 SQL을 지정하는 방법 가입 (또는 여러 가입) 견적 요청 denormalized 테이블을 사용하여 모든 문제를 피합니다. 이 이유는 혼자 dataset의 프리젠 테이션에 대한 denormalized 단일 테이블의 사용을 단지ERDDAP™사용자.
     
* 일반 테이블 (키 열과 관련된 여러 테이블) 데이터베이스에 데이터를 저장하는 것이 좋습니다.
그러나 SQL에서, 사용자가 비정상화 된 결과 (이름 *) 단일 테이블. 그래서 데이터 세트를 사용자에게 거대한, denormalized, 단일 테이블으로 설정할 수 있습니다. (e.g., 온도가 있는 테이블의 저 줄을 보여줍니다&gt; 30 분) ·
     
* 변경할 수 있습니다.ERDDAP™테이블을 변경하지 않고.
    ERDDAP™데이터베이스를 설정 한 방법에서 다른 몇 가지 요구 사항이 있습니다.
예를 들어,ERDDAP™타임스탬프 데이터는 'timestamp with timezone' 필드에 저장되어야 합니다.
별도의 테이블/뷰 만들기ERDDAP™, 당신은 당신이 denormalized 테이블을 만들 때 이 변경을 만들 수 있습니다ERDDAP· 그래서, 당신은 당신의 테이블에 어떤 변화를 만들 필요가 없습니다.
     
*   ERDDAP™정상화 된 테이블의 구조의 일부를 재구성합니다.
데이터의 열이 'outer' 테이블에서 나온다는 것을 지정할 수 있으며, 해당 값의 제한된 수가 있습니다.ERDDAP™이 열에 있는 가치의 다른 조합의 모두를 모으고 특별한 사용자에게 선물할 것입니다. 사용자가 신속하게 dataset의 subsets를 선택합니다. 각 열에 대한 명백한 가치는 또한 dataset의 다른 웹 페이지에 드롭다운 목록에서 보입니다.
     
* denormalized 테이블은 당신에게서 자료 손 떨어져 만듭니다ERDDAP관리자 쉬운.
이 데이터 세트에 대한 전문가이므로 테이블에 대한 결정을 내리고 열을 결합하고 어떻게 참여하는지에 대한 결정을 내립니다. 그래서 당신은 우리에게 손을 가지고 있지 않습니다 (또는 악화, 최종 사용자) 몇몇 테이블과 그(것)들을 결합하는 방법을 위한 상세한 지시, 당신은 다만 저희에게 denormalized 테이블에 접근을 주어야 합니다.
     
* denormalized 테이블은 데이터에 효율적인 액세스를 허용합니다.
denormalized 모양은 정상적인 모양 보다는 접근하기 위하여 보통 빠릅니다. 참여는 느리게 될 수 있습니다. 다중 가입은 매우 느립니다.
     

데이터베이스에서 두 개 이상의 테이블에서 데이터를 얻기 위해ERDDAP™, 3개의 선택권이 있습니다:
 

* 권장 옵션:
정상적인 테이블에서 데이터를 가진 comma- 또는 tab-separated-value 파일을 만들 수 있습니다.
dataset이 거 대 한 경우, 그것은 여러 파일을 만들 감각, denormalized 테이블의 cohesive subset와 각각 (예를 들어, 작은 시간 범위의 데이터) ·
    
여기에 큰 장점은ERDDAP™데이터베이스에 의해 더 많은 노력 없이 데이터에 대한 사용자 요청을 처리할 수 있습니다. 이름 *ERDDAP™데이터베이스 또는 보안 위험에 대한 부담이 없습니다. 이것은 거의 모든 상황에서 최고의 옵션입니다.ERDDAP™일반적으로 데이터베이스에서 더 빠른 파일에서 데이터를 얻을 수 있습니다. (.csv 파일을 변환하면.ncCF 파일) · (이유의 일부는ERDDAP+files는 읽기 전용 시스템이며 변경 사항을 처리 할 필요가 없습니다.[사이트맵](https://en.wikipedia.org/wiki/ACID)  (Atomicity, 일관성, 고립, 내구성) ·) 또한 RAID 중 하나에 데이터를 저장하고 기존에 액세스 할 수 있기 때문에 별도의 서버가 필요하지 않습니다.ERDDAP™기존 서버에서.
    
* 좋은 선택권:
당신은 다른 컴퓨터에 새로운 데이터베이스를 설정 그냥 denormalized 테이블.
그 데이터베이스는 MariaDB, MySQL 및 PostgreSQL과 같은 무료 및 오픈 소스 데이터베이스가 될 수 있으므로이 옵션은 많은 비용이 들지 않습니다.
    
여기에 큰 장점은ERDDAP™현재 데이터베이스에 의해 더 많은 노력 없이 데이터에 대한 사용자 요청을 처리할 수 있습니다. 이름 *ERDDAP™현재 데이터베이스에 부담이 없습니다. 또한 보안 문제의 많은 제거ERDDAP™현재 데이터베이스에 액세스 할 수 없습니다.
    
* Discouraged 선택권:
우리는 연결할 수 있습니다ERDDAP™현재 데이터베이스에.
이렇게하려면:
    
    * 별도의 테이블을 만들거나 데이터의 denormalized 테이블을 볼 수 있습니다.
    * "erddap"사용자를 생성하여 정정된 테이블에만 액세스할 수 있습니다. (₢ 킹) ·
         
    
데이터가 매우 자주 변경하고 싶은 경우 옵션입니다.ERDDAP™사용자는 그 변화에 즉시 접근; 그러나, 너무, 그것 위에 파일 선택권을 이용하기 위하여 감각을 만들지도 모릅니다 (30분 간격) 오늘날의 데이터가 있는 파일을 대체합니다.
이 접근의 거대한 단점은 그ERDDAP™사용자 요청은 아마도 데이터베이스에 큰 부담을 배치하고 그ERDDAP™연결은 보안 위험 (위험 최소화/관리) ·

비정상 테이블을 만들고,ERDDAP™몇 가지 변화를 만드는 좋은 기회입니다.ERDDAP™필요, 원래 테이블에 영향을 미치지 않는 방법:

* date 및 timestamp 필드/columns를 변경하여 Postgres 호출 데이터 유형 사용[시간대별 시간표](#database-date-time-data)  (또는 데이터베이스에 해당) ·
시간대 정보가 없는 타임스탬프는 제대로 작동하지 않습니다.ERDDAP·
* 사용자가 자주 검색하는 열에 대한 인덱스를 만듭니다.
* 매우 알고[field/column 이름의 경우](#quotes-for-names-and-case-sensitivity)  (예를 들어, 모든 Lowercase 사용) 당신이 그들을 입력 할 때.
* 테이블에 대한 예약 된 단어를 사용하지 않고 필드 / 컬럼 이름을 들어.

비정상 테이블을 만들거나 보시려면 데이터베이스 관리자에게 문의하십시오.
이 전체적인 접근법에 대해 이야기하고 싶으시다면, 어떻게 해야 하는가? noaaa.gov의 존.
    
#### 데이터베이스datasets.xml {#database-in-datasetsxml} 
올바른 만들기가 어렵습니다.datasets.xml자주 묻는 질문ERDDAP™데이터베이스에 연결하기. 환자에게 방법.
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
        
Generate데이터셋 Xml는 EDDTableFromDatabase를 위한 3개의 특별한 선택권이 있습니다:
1. "&#33;&#33;&#33;LIST&#33;&#33;&#33;"를 입력하면 (견적 요청) 카탈로그 이름의 경우, 이 프로그램은 카탈로그 이름의 목록을 표시합니다.
2. "&#33;&#33;&#33;LIST&#33;&#33;&#33;"를 입력하면 (견적 요청) 스키마 이름의 경우, 프로그램은 스키마 이름의 목록을 표시합니다.
3. "&#33;&#33;&#33;LIST&#33;&#33;&#33;"를 입력하면 (견적 요청) 테이블 이름의 경우, 프로그램은 테이블과 열의 목록을 표시합니다. 첫번째 "&#33;&#33;&#33;LIST&#33;&#33;&#33;" 당신이 만드는 항목은 사용 될 것입니다.
* EDDTableFromDatabase에 대한이 문서의 모든 정보를 조심하십시오.
* 데이터베이스 관리자에 문의하여 EDDTableFromDatabase 데이터셋에 XML을 생성해야 하는 대부분의 정보를 수집할 수 있습니다.
* 데이터베이스는 종종 열 이름과 테이블 이름을 케이스 과민한 방식으로 치료하지만, 그들은 케이스 과민성에서ERDDAP· 그래서 데이터베이스의 오류 메시지가 열 이름이 알 수 없다는 것을 말한다 (예를 들어, "Unknown 식별자 = 이름 * *컬럼* ₢ 킹) 당신이 존재하더라도, 모든 자본을 사용하려고, 예를 들어, *COLUMN_이름* , 종종 사실, 열 이름의 case-sensitive 버전입니다.
* 데이터베이스 관리자와 긴밀히 협력하여 관련 경험을 가질 수 있습니다. dataset가 로드에 실패하면 read the[오류 메시지](#troubleshooting-tips)왜 찾지 못했습니다.
         
#### JDBC 드라이버{#jdbc-driver} 
* [JDBC 드라이버 및&lt;드라이버이름&gt;] (#jdbc 드라이버) -- 데이터베이스에 적합한 JDBC 3 또는 JDBC 4 드라이버 .jar 파일을 가져야하며
내 계정 *뚱 베어* /webapps/erddap/WEB-INF/lib 설치 후ERDDAP· 그때, 당신의datasets.xml이 dataset의 경우, 지정해야 합니다.&lt;driverName&gt; 이 드라이버의 경우, 이는 (불행히도) 파일명과 다릅니다. 데이터베이스 및 driverName에 대한 JDBC 드라이버에 대한 웹 검색Java사용해야 합니다.
    
    * MariaDB의 경우, 시도[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
더 보기&lt;driverName&gt; 사용datasets.xml  (더 보기) 아마 org.mariadb.jdbc. 드라이버 .
    * MySQL 및 Amazon RDS의 경우[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
더 보기&lt;driverName&gt; 사용datasets.xml  (더 보기) 아마 com.mysql.jdbc. 드라이버 .
    * 제품 정보Oracle, 시도[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html)·
더 보기&lt;driverName&gt; 사용datasets.xml  (더 보기) 아마도 oracle.jdbc.driver입니다.Oracle드라이버 .
    * Postgresql의 경우 JDBC 4 드라이버가 있습니다.[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
더 보기&lt;driverName&gt; 사용datasets.xml  (더 보기) 아마 org.postgresql입니다. 드라이버 .
    * SQL Server의 경우 JTDS JDBC 드라이버를 얻을 수 있습니다.[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net)·
더 보기&lt;driverName&gt; 사용datasets.xml  (더 보기) is 아마 net.sourceforge.jtds.jdbc. 드라이버 .
    
당신은 JDBC 드라이버 .jar를 넣어 후ERDDAP™lib 디렉토리, 당신은 .bat 및 / 또는 .sh 스크립트 파일에 .jar 파일에 대한 참조를 추가해야합니다 GenerateDatasets Xml, DasDds 및 ArchiveADataset는 *뚱 베어* /webapps/erddap/WEB-INF/ 디렉토리; 그렇지 않으면, 당신은 그 스크립트를 실행할 때 ClassNotFoundException을 얻을 것이다.
    
불행히도, JDBC는 때때로 문제의 근원입니다. 그 역할은 중간에ERDDAP™그리고 데이터베이스, 그것은 때로는 표준 / 일반 데이터베이스 SQL 요청에 하위 변경ERDDAP™생성, 문제 발생 (예를 들면, 관련[위/lowercase 식별자](#quotes-for-names-and-case-sensitivity)그리고 관련[날짜/시간 시간대](#database-date-time-data)) · 환자는 여기 정보를 조심스럽게 읽고, 당신의 일을 확인하고,[더 많은 지원 얻기에 섹션](/docs/intro#support)·
    
#### 관련 기사&lt;연결하기 재산 & gt;{#database-connectionproperty} 
* [기타]&lt;연결Property&gt;] (#database 연결 property) -- 내 계정datasets.xml데이터셋을 위해 여러 연결을 정의해야 합니다. 부동산 태그 to tellERDDAP™당신의 데이터베이스에 연결하는 방법 (예를 들어, 사용자 이름, 비밀번호, SSL 연결 및 지정[fetch 크기](#set-the-fetch-size)) · 이 모든 상황에 대 한 다르 고 조금 열심히 알아. JDBC 드라이버를 사용하여 웹을 검색하여 데이터베이스에 연결하십시오. 더 보기&lt;connectionProperty&gt; 이름 (예를 들어, "user", "password", "ssl") , 연결의 일부Property 값은 "JDBC 연결 속성에 대한 웹을 검색하여 찾을 수 있습니다 *관련 기사 제품정보* · (예를 들어,Oracle, MySQL, 아마존 RDS, MariaDB, PostgreSQL) ·
     
#### 이름과 케이스 감도에 대한 인용{#quotes-for-names-and-case-sensitivity} 
*   [Field/Column Names에 대한 인용; 케이스 감도](#quotes-for-names-and-case-sensitivity)- 기본적으로 EDDTableFromDatabase는 필드 / 컬럼 이름의 주위에 ANSI-SQL 표준 더블 인용을 배치합니다. 필드 / 컬럼 이름 또는 필드 / 컬럼 이름의 특수 문자. 두 배는 또한 SQL 주입 공격의 특정 유형을 사악합니다. 당신은 말할 수 있습니다ERDDAP™", ', 또는 따옴표를 사용하려면&lt;열NameQuotes&gt; 내 계정datasets.xml이 dataset를 위해.
    
많은 데이터베이스의 경우 어떤 유형의 견적을 사용하여 데이터베이스가 필드 / 컬럼 이름을 사용하여 작업하는 데 민감한 방법 (대신 기본 데이터베이스의 경우 insensitive 방법) · 데이터베이스는 종종 모든 위 케이스로 file/column 이름을 표시, 때 현실에서 케이스 민감한 형태는 다릅니다. 내 계정ERDDAP™, 항상 케이스 과민한으로 데이타베이스 열 이름을 대우하십시오.
    
    * 마리아 DB, 당신은 데이터베이스를 실행해야[\\--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/)·
    * MySQL 및 Amazon RDS의 경우 데이터베이스를 실행해야 합니다.[\\--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes)·
    *   OracleANSI-SQL-standard 더블 견적 지원[으로 default](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223)·
    * PostgreSQL은 기본적으로 ANSI-SQL-standard 더블 시일을 지원합니다.
    
      
데이터베이스, 카탈로그, 스키마 또는 테이블의 이름에 대한 예약 된 단어를 사용하지 마십시오.ERDDAP™견적 요청
    
가능한 경우 데이터베이스, 카탈로그, 스키마, 테이블 이름 및 필드 이름에 대한 모든 낮은 케이스를 사용하여 데이터베이스 테이블을 만들 때 (또는 보기) 그리고 필드/column 이름을 참조할 때datasets.xml내 계정ERDDAP· 그렇지 않으면 데이터베이스, 카탈로그, 스키마, 테이블 및/또는 필드가 발견되지 않은 오류 메시지를 얻을 수 있습니다. 오류 메시지가 발생하면 케이스 감지 된 버전을 사용해보십시오. 모든 상부 케이스 버전 및 이름의 모든 낮은 케이스 버전ERDDAP· 그들 중 하나는 일할 수 있습니다. 그렇지 않으면 데이터베이스의 이름을 변경해야합니다, 카탈로그, 스키마, 및 / 또는 테이블은 모든 더 낮은 케이스.
    
#### 관련 기사&lt;제품정보 유형 & gt;{#database-datatype} 
*   [관련 기사](#database-datatype)[기타]&lt;데이터타입&gt;] (#자료) 태그 -- 그에 대한 몇몇 주변[데이터베이스 데이터 유형](https://www.w3schools.com/sql/sql_datatypes_general.asp)지도에ERDDAP™데이터 유형, 당신은 지정해야합니다 [&lt;데이터타입&gt;] (#자료) 각 태그 [&lt;dataVariable&gt;] (#데이터variable) 이름 *ERDDAP™어떤 dataType 사용. 문제의 일부는 다른 데이터 세트가 다양한 데이터 유형에 대한 다른 용어를 사용합니다 -- 그래서 항상 정의와 일치하려고, 뿐만 아니라 이름. 설명 보기[표준:ERDDAP™제품정보 제품정보](#data-types), 해당 SQL 데이터 유형에 대한 참조를 포함.[날짜 및 타임스탬프](#database-date-time-data)특별한 경우: 사용ERDDAP두 배 자료 유형.
     
#### Database Date 시간 데이터{#database-date-time-data} 
일부 데이터베이스 날짜 시간 열에는 명시된 시간대가 없습니다. 그런 열은 말썽입니다ERDDAP· 데이터베이스는 날짜의 개념을 지원합니다 (시간 없이) 시간대 없이, 시간의 대략적인 범위로. 한국어Java  (그리고 이렇게ERDDAP) timezone을 가진 즉석 date+times를 가진 유일한 거래. 따라서 날짜 시간 데이터가 현지 시간대에 근거한 것을 알 수 있습니다. (일광 절약 시간 없이 또는) 또는 GMT/Zulu시간대, 하지만Java  (이름 *ERDDAP) 아니. 우리는 원래이 문제를 해결할 수 있다고 생각했습니다. (e.g, 열에 대한 시간대 지정) , 하지만 데이터베이스+JDBC+Java상호 작용은 이 믿을 수 없는 해결책을 만들었습니다.
* 그래서,ERDDAP™데이터베이스 테이블에 모든 날짜와 날짜 시간 데이터를 저장해야 JDBC 유형에 대응하는 데이터베이스 데이터 유형 "시간 영역" (이상적으로, 그것은 GMT /를 사용Zulu시간 영역) ·
* 내 계정ERDDAP이름 *datasets.xml, 에서&lt;dataVariable&gt; timestamp 변수 태그, 설정
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

·&lt;addAttributes&gt; 세트
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* 제안 : 데이터가 시간 범위 인 경우, 타임 스탬프 값이 implied time range의 중심을 참조하는 것이 유용합니다. (예를 들어, noon) · 예를 들어, 사용자가 다른 데이터 세트에서 2010-03-26T13:00Z에 대한 데이터를 가지고 있으며 매일 데이터가있는 데이터베이스 데이터 세트에서 가장 가까운 데이터를 원하면 2010-03-26T12:00Z에 대한 데이터베이스 데이터 (그 날짜에 대한 데이터를 나타내는) 가장 잘 (이전 또는 이후의 자정과 반대, 그것이 가장 적은 명백한 곳) ·
*   ERDDAP™유틸리티를 가지고[숫자 변환 시간 /에서 문자열 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)·
* 이름 *[이름 *ERDDAP거래 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)·
       
#### 정수 null{#integer-nulls-1} 
데이터베이스 지원 null integer (int, 작은, 작은) 열, 하지만ERDDAP™true null을 지원하지 않습니다.
Database null은 변환됩니다.ERDDAP™127 바이트 열, ubyte 열을 위해 255, 짧은 열을 위해 32767, ushort 열을 위한 65535, int 란을 위한 2147483647, uint 란을 위한 4294967295, 9,223,372,036,854,775,807, 긴 열을 위한 18446744073709551615를 위해. 그 기본값을 사용하는 경우, 그(것)들을 확인하시기 바랍니다missing\\_valuedataset의 사용자를 위한 sERDDAP™이름 *

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

또는

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

대안으로, 당신은 "을 사용할 수 있습니다missing\\_value"\\_FillValue 대신 속성".
Generate데이터셋 Xml는 이 \\_FillValue 속성을 자동으로 추가합니다.datasets.xml데이터베이스 datasets에 대한.

데이터베이스 부동점 열의 경우, null은 NaNs로 변환됩니다.ERDDAP·
데이터베이스 데이터 유형에 대해 Strings로 변환ERDDAP™, null은 빈 문자열로 변환됩니다.
    
#### Database 보안{#database-security} 
* 데이터베이스에서 작업할 때 데이터베이스에 손상하거나 데이터에 액세스할 수 없습니다.ERDDAP™안전한 방법으로 일을 할 수 있습니다.
    * 다른 컴퓨터에서 복제, 데이터베이스 및 데이터베이스 테이블을 고려하여 원하는 데이터ERDDAP™관련 기사 (예, 상업 데이터베이스Oracle, 이것은 추가 라이센스 수수료가 포함되어 있습니다. 그러나 PostgreSQL, MySQL, Amazon RDS 및 MariaDB와 같은 오픈 소스 데이터베이스에 대한이 비용은 아무것도 없습니다.) 이것은 당신에게 높은 수준의 보안을 제공하고 또한 예방합니다.ERDDAP™원래 데이터베이스를 느리게하는 요청.
    * 우리는 당신을 격려합니다ERDDAP™to connect to database as a database user that only has access to **이름 *** 관련 기사 (₢ 킹) 그리고 READ 특권을 가지고 있습니다.
    * 우리는 당신이 연결에서 설정하는 것을 권장합니다ERDDAP™데이터베이스로
        * 항상 SSL을 사용합니다.
        * 만 하나의 IP 주소에서 연결을 허용 (또는 주소의 한 블록) 그리고 하나에서ERDDAP™사용자 및
        * MD5 해시드 양식의 비밀번호만 전송합니다.
    *   \\[KNOWN 장점\\]연결하기 (비밀번호) 일반 텍스트로 저장datasets.xml· 우리는 관리자가 데이터베이스 암호를 입력 할 수있는 방법을 발견하지 않았습니다.ERDDAPTomcat의 시작 (사용자 입력 없이 발생) , 그래서 암호는 파일에 접근해야합니다. 이 더 안전한 것을 만들기 위하여:
        * 이름 * (이름 *ERDDAP™관련 기사) 소유자이어야한다datasets.xmlREAD 및 WRITE 액세스가 있습니다.
        * user=tomcat만 포함하는 그룹을 만드십시오. chgrp를 사용하여 그룹을 만들기 위해datasets.xmlREAD 특권과 함께.
        * chmod를 사용하여 o-rwx 특권을 할당합니다. ("other" 사용자를위한 READ 또는 WRITE 액세스 없음) 제품정보datasets.xml·
    * 현재 위치ERDDAP™, 암호 및 기타 연결 속성은 "private"에 저장됩니다Java변수.
    * 클라이언트의 요청은 데이터베이스에 대한 SQL 요청을 생성하기 전에 검증 및 확인됩니다.
    * 데이터베이스에 요청은 SQL PreparedStatements로 만들어졌으며 예방[SQL 주입](https://en.wikipedia.org/wiki/SQL_injection)·
    * 데이터베이스에 대한 요청은 실행으로 제출됩니다. 글쓰기 (실행하기) 읽을 수있는 제한 요청 (그래서 데이터베이스를 변경하는 SQL 주입은이 이유에 실패, 너무) ·
         
#### 사이트맵{#sql} 
* 이름 *OPeNDAP' 탭 데이터 요청은 mimic SQL tabular 데이터 요청으로 설계되었습니다.ERDDAP™간단한 SQL PreparedStatements로 탭 데이터 요청을 변환합니다. 예를 들어,ERDDAP™이름 *
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
SQL PreparedStatement로 변환됩니다.
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™&distinct 요청 () 및/또는 &orderBy ( *옵션 정보* ) DISTINCT 및/또는 ORDER를 추가합니다. *옵션 정보* SQL 준비된 문에. 일반적으로 데이터베이스의 응답을 크게 느리게합니다.
ERDDAP™PreparedStatement에 로그인[로그.txt](/docs/server-admin/additional-information#log)이름 *
```
    statement=*thePreparedStatement*  
```
이것은 PreparedStatement의 텍스트 표현이 될 것입니다. 실제 PreparedStatement에서 약간 다를 수 있습니다. 예를 들어, PreparedStatement에서, 시간은 특별한 방법으로 인코딩됩니다. 그러나 텍스트 표현에서, 그들은 ISO 8601 날짜 시간으로 나타납니다.
     
#### Database 속도{#database-speed} 
* 데이터베이스가 느릴 수 있습니다. 할 수있는 몇 가지가 있습니다 :
    * 일반 -
SQL의 본질은 쿼리는[이름 *](https://en.wikipedia.org/wiki/Declarative_programming)· 사용자가 원하는 것을 지정합니다. 쿼리가 처리되거나 최적화되는 방법을 위한 사양이나 힌트가 포함되지 않습니다. 그래서 아무 방법도 없다ERDDAP™데이터베이스가 쿼리를 최적화하는 그런 방식으로 쿼리를 생성 (또는 어떤 방식으로 쿼리가 처리되는지 지정합니다.) · 일반적으로, 그것은 데이터베이스 관리자가 일을 설정하기 위해 (예를 들면, 색인) 특정 유형의 쿼리를 최적화합니다.
##### Fetch 크기 설정{#set-the-fetch-size} 
Databases는 데이터를 반환합니다.ERDDAP™에 chunks. 기본적으로 다른 데이터베이스는 펑크의 다른 줄을 반환합니다. 종종이 숫자는 매우 작기 때문에 매우 비효율적입니다. 예를 들어, 기본값은Oracle10입니다&#33; 데이터베이스의 JDBC 드라이버에 대한 JDBC 문서를 읽어 연결 속성을 설정하여 이를 증가시키고 dataset의 설명에 추가하십시오.datasets.xml· 예를 들어,
MySQL 및 Amazon RDS의 경우 사용
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
MariaDB는 현재 fetch 크기를 변경하는 방법이 없습니다. 그러나 요청한 기능이므로 웹을 검색하여이 구현되었는지 확인하십시오.
제품 정보Oracle, 사용
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
PostgreSQL의 경우, 사용
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
하지만 숫자를 변경할 수 없습니다. 너무 큰 번호를 설정 원인ERDDAP™메모리를 많이 사용하고 메모리를 실행할 가능성이 더 높습니다.
#### 연결Properties{#connectionproperties} 
각 데이터베이스에는 지정된 다른 연결 속성이 있습니다.datasets.xml· 이들 중 대부분은 데이터베이스의 성능에 영향을 미칩니다.ERDDAP™연결. 데이터베이스의 JDBC 드라이버에 대한 문서를 읽어보시기 바랍니다. 해당 이용 후기에 달린 코멘트가 없습니다.erd dot data at noaa dot gov·
* 테이블 만들기 --
당신은 아마 더 빠른 응답을 얻을 것이다 경우에 정기적으로 (매일? 새로운 데이터가 있을 때?) 실제 테이블 생성 (VIEW를 생성하는 방법) 그리고 말ERDDAP™VIEW 대신 테이블에서 데이터를 얻을 수 있습니다. 테이블에 어떤 요구든지 그 후에 다른 테이블에 가입 없이 성취될 수 있기 때문에, 응답은 매우 빨리 일 것입니다.
* 테이블 진공 -
MySQL 및 Amazon RDS는 사용하는 경우 훨씬 빨리 응답합니다.[OPTIMIZE 테이블](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html)·
마리아 DB는 당신이 사용하는 경우에 다량 빨리 반응할 것입니다[OPTIMIZE 테이블](https://mariadb.com/kb/en/optimize-table/)·
PostgreSQL은 훨씬 빨리 반응합니다.[채용정보](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)테이블.
    Oracle아날로그 명령이 필요하지 않습니다.
* 이름 *[제품정보](https://en.wikipedia.org/wiki/Database_index)일반적으로 변형 된 변수 --
변수에 대한 데이터베이스의 인덱스를 생성함으로써 많은/most 쿼리를 가속화 할 수 있습니다. (어떤 데이터베이스 호출 "columns") 그것은 종종 사용자의 쿼리에 제약. 일반적으로, 이것은 [에 의해 지정된 동일한 변수입니다]&lt;subsetVariables&gt;] (#subsetvariables의 특징) 그리고/또는 위도, 경도 및 시간 변수.
##### 연결 풀링{#use-connection-pooling} 
일반적으로,ERDDAP™각 요청에 대한 데이터베이스에 별도의 연결을 만듭니다. 이것은 가장 신뢰할 수있는 방법입니다. 더 빠른 대안은 연결 풀링을 지원하는 DataSource를 사용합니다. 설정하려면, 지정 (예를 들어)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
다음 것&lt;sourceUrl&gt;,&lt;driverName&gt;, 그리고&lt;연결하기 재산&gt;.
그리고에서 *뚱 베어* /conf/context.xml, 같은 정보를 가진 리소스를 정의합니다. 예를 들어,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
DataSource를 사용하는 일반 정보[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html)·
이름 *[Tomcat DataSource 정보](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)이름 *[Tomcat DataSource 예제](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)또는 다른 애플리케이션 서버와 DataSources를 사용하여 웹을 검색합니다.
* 다른 모든 것이 실패하면
데이터 저장을 고려하십시오.NetCDFv3의.nc파일 형식 (기타 제품.nc파일 사용[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged 배열 자료 구조 etc로 취급될 수 있습니다ERDDAP이름 *[EDDTableNcCFFiles에서](#eddtablefromnccffiles)) · 로그인한 경우 (각 공간과 시간의 펑크에 대한 데이터) ·ERDDAP™데이터를 신속하게 추출할 수 있습니다.
         
#### EDDTable데이터베이스 skeleton 사이트맵{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable에서EDDGrid {#eddtablefromeddgrid} 
[ **EDDTable에서EDDGrid** ](#eddtablefromeddgrid)EDDTable dataset을 만들 수 있습니다.EDDGrid데이터셋.

* 이 일을 위한 몇몇 일반적인 이유는:
    * 이 데이터셋이 queried 할 수 있습니다.OPeNDAP선택 제약, 의 유형은 "값에 의해 query" (사용자가 요청한 경우) ·
    * dataset는 inherently의 tabular dataset입니다.
* 글로벌 속성의 값 "maxAxis0" (보통 type="int") · (기본값은 10입니다.) 축선의 수를 제한하기 위하여 사용될 것입니다\\[0 댓글\\]  (일반적으로"time"채용 정보) 동봉의 값EDDGrid데이터 요청 당 액세스 할 수있는 dataset. 제한이 없으면 0의 값을 지정합니다. 이 설정은 중요하기 때문에, 그렇지 않으면, 사용자가 EDDTableFrom 요청하기 쉬운 것EDDGridgridded dataset의 모든 데이터를 살펴보십시오. 그것은 장시간을 가지고 가고 거의 확실히 timeout 과실에 실패할 것입니다. 이것은 EDDTableFrom가 안전한 설정입니다.EDDGrid데이터 세트ERDDAP그들은 컴퓨팅 리소스를 사용하지 않는 사용으로 이어질 것이라는 두려움없이.
* 동봉하는 경우EDDGrid이름 *[EDDGrid언어: en](#eddfromerddap)그리고ERDDAP™같은ERDDAP, 다음 EDDTableFromEDDGrid항상 참조된 dataset의 현재 사용 가능한 버전을 직접 사용합니다. 이것은 EDDTableFrom에 매우 효율적인 방법입니다EDDGridGridded 데이터에 액세스합니다.
* 이 클래스의 [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) 어떤 수입니다. 연락처EDDGrid이름 *&lt;reloadEveryNMinutes&gt;는 무시됩니다.
* 값이 있는 경우 [&lt;update모든NMillis&gt;] (#updateeverynmillis의 장점) 이 dataset를 위해 공급되고, 무시됩니다. 연락처EDDGrid이름 *&lt;updateEveryNMillis&gt;는 무슨 사정입니다.
*   [생성데이터셋Xml](#generatedatasetsxml)dataset type=EDDTableFrom 옵션이 있습니다.EDDGridURL의 요청ERDDAP  (보통 동일ERDDAP)   ("/erddap/"에서 종료) 그리고 일반 표현. Generate데이터셋 Xml는 EDDTable에서 XML을 생성합니다.EDDGrid각 gridded dataset에 대한 datasetERDDAP™는datasetID일반 표현과 일치 (사용 .\\* 모든 일치datasetIDgridded datasets를 위한 s) ·
    
생성되는 XML의 펑크는 각 dataset의 GenerateDatasetsXml에 의해 포함합니다:
    
    * ·datasetID그것은EDDGrid이름 *datasetID플러스 "\\_AsATable".
    * 새로운 요약 글로벌 속성은EDDGrid's Summary plus this dataset이 무엇인지 설명하는 새로운 첫 번째 단락.
    * 새로운 타이틀 글로벌 속성은EDDGrid's title plus ", (테이블으로) ·
    * 10의 값으로 새로운 maxAxis0 글로벌 속성.
#### EDDTable에서EDDGrid스켈레톤 XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTable파일이름{#eddtablefromfilenames} 
[ **EDDTable파일이름** ](#eddtablefromfilenames)서버의 파일 시스템에 대한 파일 그룹에 대한 정보의 데이터 세트를 생성하므로 사용자가 파일을 통해 다운로드 할 수 있도록 각 파일에 대한 URL을 포함ERDDAP이름 *["files"시스템](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)· 모든 것[EDDTable파일](#eddtablefromfiles)subclasses, 이 dataset 유형은 파일 내에서 데이터를 제공하지 않습니다.

* EDDTableFromFileNames는 유용할 때:
    * 일반 데이터 파일이 데이터가 있는 것과 같은 방식으로 "data"를 포함하지 않기 때문에 전체 파일로 배포하려는 파일의 그룹이 있습니다. 예를 들어, 이미지 파일, 비디오 파일, Word 문서, Excel 스프레드 시트 파일, PowerPoint 프레젠테이션 파일, 또는 unstructured 텍스트 파일.
    * 형식의 데이터가 있는 파일 그룹이 있습니다.ERDDAP™아직 읽을 수 없습니다. 예를 들어, 프로젝트 별, 사용자 정의, 바이너리 형식.
         
#### EDDTableFromFileNames 데이터{#eddtablefromfilenames-data} 
*   [EDDTableFromFileNames dataset의 데이터](#eddtablefromfilenames-data)테이블은ERDDAP™로컬 파일 그룹에 대한 정보로 on-the-fly를 만듭니다. 테이블에는 각 파일에 대한 행이 있습니다. 4개의 특수 속성[datasets.xml이 dataset를 위해](#eddtablefromfilenames-skeleton-xml)이 dataset에 어떤 파일이 포함될지 결정하십시오:
    
##### 파일 형식 사이트맵{#filedir} 
    *   &lt;파일Dir&gt; -- 이 데이터셋의 파일로 서버의 파일 시스템에 소스 디렉토리를 지정합니다. 실제로 서버의 파일 시스템에 위치하는 파일&lt;fileDir&gt;는 가상 디렉토리에서 이 dataset의 URL 열에 나타납니다. https://*serverUrl*/erddap/files/*datasetID/* ·
예를 들어,datasetIDjplMU 이다RSS사이트맵
그리고&lt;fileDir&gt;는 /home/data/mur/,
그리고 그 디렉토리에는 jplMU라는 파일이 있습니다.RSS파일 형식: .png (2000x2400)
그 파일에 대한 사용자에 표시된 URL은
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png ·
        
로컬 디렉토리를 사용하여&lt;fileDir&gt;, 당신은 또한 원격의 URL을 지정할 수 있습니다, 디렉토리 같은 웹 페이지. 이 작품 :
        
        * THREDDS, e.g에 통합 된 데이터 세트,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020년 10월 21일 이 서버는 더 이상 믿을 수 없습니다.\\]
        * 통합된 datasetsHyrax, 예를들면
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * 대부분의 Apache-like 디렉토리 목록, 예,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### 으로OnTheFly{#fromonthefly} 
[\\*\\*\\*fromOn더플라이](#fromonthefly)-- 어떤 거대한 S3 물통을 위해 (noaa-goes17 처럼, 이는 26 백만 파일) , 그것은 걸릴 수 있습니다ERDDAP™최대 12 시간 동안 버킷의 내용에 대한 모든 정보를 다운로드 (그런 다음 다른 문제가 있습니다.) · 이 주변을 얻으려면, 사용할 수있는 특별한 방법이 있습니다.&lt;fileDir&gt; 에 EDDTableFromFileNames 을 사용하여 디렉토리와 파일 이름을 AWS S3 버킷. dataset는 S3 버킷의 감독 및 파일 이름의 모든 목록이 데이터 세트에 요청을 통해 검색 할 수 없습니다. 그러나 dataset는 디렉토리의 이름을 얻을 것이다 및 파일 on-the-fly if user traverses the directory hierarchy with dataset's"files"옵션. 따라서, 사용자는 데이터셋을 통해 S3 버킷의 파일 계층 및 파일을 검색 할 수 있습니다."files"시스템. 이렇게하려면 S3 버킷의 URL을 "시작 디렉토리"로 지정합니다. (GenerateDatasets에 대하여 사이트맵) 또는&lt;파일Dir&gt; (내 계정datasets.xml) , 사용:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
예를 들면:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
문서 보기[S3 버킷 작업ERDDAP™](#working-with-aws-s3-files)S3 버킷 URL에 사용해야하는 특정 형식의 설명. 그리고 보고
[이 세부 사항과 예](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)이름 *\\*\\*\\*fromOn더플라이.
        
##### 관련 상품{#recursive} 
*   &lt;recursive&gt; -- 하위 디렉토리의 파일&lt;fileDir&gt; 일치하는 이름&lt;fileRegex&gt;는 동일한 하위 디렉토리에 나타납니다."files"URL 경우&lt;recursive&gt;는 true로 설정됩니다. 기본값은 false입니다.
* [기타]&lt;경로Regex&gt;] (#경쟁) -- recursive=true 의 경우, pathRegex와 일치하는 디렉토리 이름만 (기본값=".\\*") 접수합니다. recursive=false가면 무시됩니다. 이것은 드물게 사용되지만 비정상적인 상황에서 매우 유용합니다. (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·) 
##### 파일Regex{#fileregex} 
*   &lt;파일Regex&gt; -- 전체 파일명의 파일명만 (디렉토리 이름을 포함하지) 이름 *&lt;fileRegex&gt; 이 dataset에 포함될 것입니다. 예를 들어, jplMURSS다운로드 (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·)   
         
##### File Names 데이터 테이블 내용에서{#from-file-names-data-table-contents} 
테이블에는 다음과 같은 열이 있습니다.
* url -- 사용자가 파일을 다운로드 할 수있는 URLERDDAP이름 *["files"시스템](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)·
* 이름 -- 파일 이름 (디렉토리 이름 없이) ·
* lastModified -- 이 파일은 마지막으로 수정되었습니다. (이중으로 저장"seconds since 1970-01-01T00:00:00Z") · 이 변수는 사용자가 마지막 변경된 지정된 파일의 내용이 있는 경우/when을 볼 수 있기 때문에 유용합니다. 이 변수는[시간 : Stamp 변수](#timestamp-variables), 그래서 데이터는 숫자 값으로 나타날 수 있습니다 (1970-01-01T00:00:00Z 이후 초) 또는 문자열 값 (ISO 8601:2004년 (₢ 킹) 지원하다) , 상황에 따라.
* 크기 -- 바이트의 파일 크기, 이중으로 저장. 몇몇 파일이 ints 허용하골 몇몇 응답 파일 유형에서 지원되지 않기 때문에 두 배로 저장됩니다. Doubles는 매우 큰 파일에도 정확한 크기를 줄 것입니다.
* 정의된 추가 열ERDDAP™파일명에서 추출한 정보 관리자 (예를 들어, 파일의 데이터와 관련된 시간) 각 추가 열에 대한 메타 데이터에 지정하는 두 가지 속성을 기반으로dataVariable::
    
    * 추출물Regex -- 이것은[일반 표현](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([관련 기사](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) · 전체 regex는 전체 filename과 일치해야합니다. (디렉토리 이름을 포함하지) · regex는 적어도 하나의 캡처 그룹을 포함해야합니다 (괄호에 의해 동봉되는 정규식의 단면도) 이름 *ERDDAP™filename의 어떤 부분을 정의하여 data가 될 수 있습니다.
    * 뚱 베어 그룹 -- 이것은 캡처 그룹의 수입니다 (#1 첫 번째 캡처 그룹) 정규 표현식에서. 기본값은 1입니다. 캡처 그룹은 모체로 둘러싸인 정규식의 섹션입니다.
    
다음은 두 가지 예입니다.
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
시간 변수의 경우, 파일 이름이 jplMU가있는 경우RSST20150103000000.png, extractRegex는 filename과 일치하며, 첫 캡처 그룹과 일치하는 문자를 추출합니다. (· 20150103000000) dataType=String으로 다음을 사용합니다.[문자열 시간에 적합 한 단위](#string-time-units)문자열을 시간 데이터 값으로 파기 (2015-01-03T00:00:00Z) ·

일 변수의 경우, 파일 이름이 jplMU가있는 경우RSST20150103000000.png, extractRegex는 filename과 일치하며, 첫 캡처 그룹과 일치하는 문자를 추출합니다. ("03") 으로 [&lt;데이터타입&gt;] (#자료) \\=int, 3.의 데이터 값을 산출
        
#### 기타 정보{#other-information} 
* 없음 [&lt;update모든NMillis&gt;] (#updateeverynmillis의 장점) -- dataset의 이 유형은 필요로 하지 않으며 사용할 수 없습니다&lt;EDDTableFromFileNames에 의해 제공되는 정보가 항상 완전히 최신이기 때문에 updateEveryNMillis&gt; tag를 업데이트하십시오ERDDAP™데이터에 대한 각 요청에 응답하기 위해 파일 시스템을 쿼리합니다. 많은 파일이 있다면,이 접근법은 상당히 잘 작동해야합니다. 많은 파일이 있는 경우 응답이 느리게 될 수 있으며, 데이터셋은 잠시 동안 정복되지 않았습니다. 그러나 그 후에 몇몇 분 동안, 운영 체계는 캐시에 있는 정보를 지킵니다, 그래서 응답은 아주 빠릅니다.
     
* 당신은 사용할 수 있습니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)으로datasets.xml이 유형의 dataset에 대한 chunk. 위와 같이 파일명에서 추출한 정보로 추가/제거할 수 있습니다.
     
#### EDDTableFromFileNames 스켈레톤 사이트맵{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable파일{#eddtablefromfiles} 
[ **EDDTable파일** ](#eddtablefromfiles)모든 EDDTableFrom...Files 클래스의 수퍼 클래스입니다. EDDTableFromFiles를 직접 사용할 수 없습니다. 대신 EDDTableFromFiles의 하위 클래스를 사용하여 특정 파일 유형을 처리하십시오.

*   [EDDTableAsciiFiles에서](#eddtablefromasciifiles)comma-, tab-, semicolon-, 또는 space-separated tabular ASCII 데이터 파일에서 데이터를 수집합니다.
*   [EDDTable오디오파일](#eddfromaudiofiles)로컬 오디오 파일 그룹에서 데이터를 수집합니다.
*   [EDDTable에서 AwsXml파일](#eddtablefromawsxmlfiles)자동 기상역 세트에서 데이터 수집 (사이트맵) XML 파일.
*   [EDDTableColumnarAsciiFiles에서](#eddtablefromcolumnarasciifiles)고정폭 데이터 열을 가진 tabular ASCII 데이터 파일에서 데이터를 수집합니다.
*   [EDDTable에서Hyrax파일 형식](#eddtablefromhyraxfiles)  (관련 상품) 여러 변수를 가진 데이터를 집계, 공유된 차원으로 각각 (예를 들면, 시간, 고도 (또는 깊이) , 위도, 경도) , 에 의해 제공[Hyrax OPeNDAP계정 관리](https://www.opendap.org/software/hyrax-data-server)·
*   [EDDTableInvalidCRAFiles에서](#eddtablefrominvalidcrafiles)데이터 수집NetCDF  (v3 또는 v4)  .nc특정, 잘못된, CF DSG Contiguous Ragged Array의 변형을 사용하는 파일 (사이트맵) 파일. 그러나ERDDAP™이 파일 형식을 지원, 그것은 잘못된 파일 유형은 아무도 사용 시작해야. 이 파일 형식을 사용하는 그룹은 강력하게 사용하도록 권장합니다.ERDDAP™유효한 CF DSG CRA 파일을 생성하고 이 파일을 사용하여 중지합니다.
*   [EDDTableFromJsonlCSV파일](#eddtablefromjsonlcsvfiles)데이터 수집[구글 맵 라인 CSV 파일](https://jsonlines.org/examples/)·
*   [EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)데이터 수집NetCDF  (v3 또는 v4)  .nc  (또는[.nc단백질](#ncml-files)) 몇몇 변수를 가진 파일, 공유된 차원으로 각각 (예를 들면, 시간, 고도 (또는 깊이) , 위도, 경도) ·
*   [EDDTableFromNcFiles는](#eddtablefromncfiles)데이터 수집NetCDF  (v3 또는 v4)  .nc  (또는[.nc단백질](#ncml-files)) 몇몇 변수를 가진 파일, 공유된 차원으로 각각 (예를 들면, 시간, 고도 (또는 깊이) , 위도, 경도) · 기존 데이터셋을 위한 이 데이터셋 유형을 계속 사용하는 것이 좋습니다. 하지만 새로운 데이터셋을 위해 대신 EDDTableFromMultidimNcFiles를 사용하는 것이 좋습니다.
*   [EDDTableNcCFFiles에서](#eddtablefromnccffiles)데이터 수집NetCDF  (v3 또는 v4)  .nc  (또는[.nc단백질](#ncml-files)) 지정된 파일 형식 중 하나를 사용하는 파일[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)대회. 그러나 다차원 CF DSG 변형 중 하나를 사용하여 파일에 대한 사용[EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)대신.
*   [EDDTableNccsvFiles에서](#eddtablefromnccsvfiles)데이터 수집[사이트맵](/docs/user/nccsv-1.00)ASCII .csv 파일.
*   [EDDTableFromParquet파일](#eddtablefromparquetfiles)데이터 처리[스낵 바](https://parquet.apache.org/)·
*   [EDDTableFromThredds파일](#eddtablefromthreddsfiles)  (관련 상품) 여러 변수와 함께 파일에서 데이터를 수집합니다.[사이트맵OPeNDAP계정 관리](https://www.unidata.ucar.edu/software/tds/)·
*   [EDDTable에서WFS파일 형식](#eddtablefromwfsfiles)  (관련 상품) 모든 데이터의 로컬 복사본을 만듭니다.ArcGISMapServer로 이동WFS서버 그래서 자료는 그 후에 빨리 보존될 수 있습니다ERDDAP™사용자.

현재 다른 파일 형식이 지원되지 않습니다. 하지만 그것은 일반적으로 상대적으로 쉽게 다른 파일 유형에 대한 지원을 추가. 자주 묻는 질문 또는 데이터가 오래된 파일 형식의 경우, 우리는 파일을 변환하는 것이 좋습니다.NetCDFv3의.nc파일 형식 (그리고 특히.nc파일 첨부[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array 데이터 구조 --ERDDAP™데이터를 신속하게 추출할 수 있습니다.) ·NetCDF널리 지원, 바이너리 형식, 데이터에 빠른 임의 액세스를 허용, 이미 지원ERDDAP·

#### fromFiles 세부사항{#fromfiles-details} 
다음 정보는 EDDTableFromFiles의 하위 클래스에 적용됩니다.
##### 학회소개{#aggregation} 
이 클래스는 로컬 파일에서 데이터를 집계합니다. 각 파일 보유 (상대적으로) 데이터의 작은 표.
    * 결과 데이터셋은 파일의 테이블이 결합된 경우 나타납니다. (파일 #1에서 데이터의 모든 행, 파일 #2에서 행의 모든, ...) ·
    * 이 파일은 지정된 변수의 모든 것을 가지고 있지 않습니다. 지정된 파일이 없는 경우,ERDDAP™필요한 값을 추가합니다.
    * 파일의 모든 변수 MUST에는 동일한 값이 있습니다.[add\\_offset](#scale_factor)·[missing\\_value](#missing_value)·[\\_요금 주요 특징](#missing_value)·[scale\\_factor](#scale_factor)·[단위 단위](#units)이름 * (이름 *) ·ERDDAP™검사,하지만 그것은 불완전한 시험 -- 다른 값이 있는 경우에,ERDDAP수정되지 않고, 파일이 유효하지 않습니다. 문제가 있다면, 사용할 수 있습니다.[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)문제 해결.
         
##### 압축 파일{#compressed-files} 
모든 EDDTableFromFiles subclasses에 대한 소스 데이터 파일은 외부 압축 될 수 있습니다. (₢ 킹.tgz·.tar.gz·.tar.gzip·.gz·.gzip·.zip·.bz2, 또는 .Z) · 이름 *[외부 압축 파일 문서](#externally-compressed-files)·
     
##### 자주 묻는 질문{#cached-file-information-1} 
* EDDTableFromFiles dataset이 첫번째 로드될 때, EDDTableFromFiles는 관련된 모든 파일에서 정보를 읽고 테이블을 만듭니다 (각 파일을 위한 1개의 줄) 각 유효 파일에 대한 정보와 각 "bad" (다른 또는 잘못된) 파일.
    * 테이블도 디스크에 저장됩니다.NetCDFv3의.nc파일 형식 *큰Parent감독* /데이터셋/ *Last2CharsOf데이터셋ID* / 한국어 *datasetID* / 파일명:
사이트 맵.nc  (독특한 디렉토리 이름 목록을 보유) ·
파일 형식 제품정보.nc  (각 유효한 파일 정보로 테이블을 보유) ·
파일 형식.nc  (각 나쁜 파일 정보로 테이블을 보유) ·
    * EDDTableFromFiles 데이터셋에 액세스하기 (그러나 더 많은 메모리를 사용하는 비용) , 당신은 사용할 수 있습니다
[기타]&lt;파일TableInMemory&gt;true&lt;/파일TableInMemory&gt;] (파일 형식)   
이름 *ERDDAP™메모리의 파일 정보 테이블의 사본을 보관합니다.
    * 디스크의 파일 정보 테이블의 복사도 유용 할 때ERDDAP™종료 및 재시작: 그것은 EDDTable을 저장 fromFiles from has to re-read 모든 데이터 파일.
    * dataset가 다시로드되면ERDDAP™변경된 새 파일 및 파일에 데이터를 읽을 필요가 있습니다.
    * 파일이 다른 파일에서 다른 구조가있는 경우 (예를 들어, 변수 중 하나에 대한 다른 데이터 유형, 또는 "에 대한 다른 값[단위 단위](#units)" 속성) ·ERDDAP"bad" 파일의 목록에 파일을 추가합니다. 파일에 대한 문제에 대한 정보는 *큰Parent감독* /logs/log.txt 파일.
    * 이 파일로 삭제하거나 작업할 필요가 없습니다. 한 예외는: 여전히 dataset의 변경을 만드는 경우datasets.xml설정, 당신은이 파일을 강제로 삭제 할 수 있습니다ERDDAP™파일이 읽을 수 있으므로 파일의 모든 파일을 다시 읽을 수 있습니다. 이 파일을 삭제해야 할 경우, 언제 할 수 있습니다.ERDDAP™계속. (그런 다음[기본 정보](/docs/server-admin/additional-information#set-dataset-flag)dataset ASAP를 다시로드합니다.) 그러나,ERDDAP™일반적으로 그 통지datasets.xml파일은 일치하지 않습니다. 테이블 정보 및 파일 테이블을 자동으로 삭제합니다.
    * 당신이 격려하고 싶은 경우에ERDDAP™저장된 dataset 정보를 업데이트하려면 (예를 들어, 방금 추가된 경우, 제거하거나 dataset의 데이터 디렉토리에 일부 파일을 변경) , 사용[주력 시스템](/docs/server-admin/additional-information#flag)힘으로ERDDAP™cached 파일 정보를 업데이트합니다.
         
##### 관련 상품{#handling-requests-1} 
*   ERDDAP™tabular 데이터 요청은 변수에 제약을 넣을 수 있습니다.
    * 데이터에 대한 클라이언트 요청이 처리되면, EDDTableFromFiles는 파일이 관련 데이터를 가질 수 있다는 것을 볼 수있는 유효한 파일 정보와 테이블에서 신속하게 볼 수 있습니다. 예를 들어, 각 소스 파일이 하나의 고정 배치 부표에 대한 데이터를 가지고 있다면, EDDTableFromFiles는 매우 효율적으로 파일이 주어진 경도 범위와 고도 범위 내에서 데이터를 가질 수 있음을 결정할 수 있습니다.
    * 유효한 파일 정보 테이블은 모든 유효 파일에 대한 모든 변수의 최소 및 최대 값을 포함하므로, EDDTableFromFiles는 종종 다른 쿼리를 효율적으로 처리 할 수 있습니다. 예를 들어, 부표 중 일부는 공기 압력 센서가 없으며 airPressure에 대한 클라이언트 요청 데이터가 없습니다&#33; = NaN, EDDTableFromFiles는 공기 압력 데이터를 효율적으로 결정할 수 있습니다.
         
##### 자주 묻는 질문{#updating-the-cached-file-information-1} 
dataset가 다시로드되면 캐시 된 파일 정보가 업데이트됩니다.
    
* dataset는 주기적으로 재부팅됩니다.&lt;dataset의 정보에 reloadEveryNMinutes&gt;datasets.xml·
* dataset는 가능한 한 빨리 다시로드됩니다.ERDDAP™당신이 추가, 제거, 감지[연락처](https://en.wikipedia.org/wiki/Touch_(Unix)· (파일의 마지막 변경 수정 시간) , 또는 datafile을 변경.
* dataset는 가능한 한 빨리 다시로드됩니다.[주력 시스템](/docs/server-admin/additional-information#flag)·

dataset가 다시로드되면ERDDAP™현재 사용 가능한 파일을 캐시 파일 정보 테이블에 비교합니다. 새 파일은 유효 파일 테이블에 읽고 추가됩니다. 더 이상 존재하지 않는 파일 테이블에서 떨어졌다. 파일 timestamp가 변경된 파일이 읽고 그 정보는 업데이트됩니다. 새로운 테이블은 메모리와 디스크에 오래된 테이블을 대체합니다.
     
##### 나쁜 파일{#bad-files-1} 
나쁜 파일의 테이블과 파일이 나쁜 선언 된 이유 (손상된 파일, 누락된 변수, incorrect 축 값, 등.) 이메일 주소 모든 것 자주 묻는 질문 (아마 당신) dataset가 다시로드됩니다. 가능한 한 빨리이 파일을 교체하거나 수리해야합니다.
     
##### 미스링 변수{#missing-variables-1} 
몇몇의 파일은 몇몇이 없는 경우에dataVariabledataset의 정의된 sdatasets.xmlchunk, 그건 괜찮아. EDDTableFromFiles가 그 파일 중 하나를 읽을 때, 파일이 변수를 가지고 있지만 모든 누락 된 값으로 작동합니다.
     
##### 실시간 데이터{#near-real-time-data} 
* EDDTableFromFiles는 특별한 경우에 아주 최근 자료 요청을 대우합니다. 문제: dataset를 만드는 파일이 자주 업데이트되면 dataset가 파일을 변경할 때마다 업데이트되지 않을 가능성이 있습니다. 그래서 EDDTableFromFiles는 변경된 파일의 인식이 되지 않습니다. (당신은 사용할 수[주력 시스템](/docs/server-admin/additional-information#flag), 그러나 이것은 지도할지도 모릅니다ERDDAP™거의 continually dataset를 다시로드하십시오. 그래서 대부분의 경우, 우리는 그것을 추천하지 않습니다.) 대신, EDDTableFromFiles는 다음과 같은 시스템에 의해 거래: 시간 :ERDDAP™마지막 20 시간 안에 데이터를 위한 요청을 가져옵니다 (예를 들어, 8 시간 전부터) ·ERDDAP™마지막 20 시간에 데이터가 있는 모든 파일을 검색할 수 있습니다. 그래서,ERDDAP™최신 데이터를 찾을 수 있도록 모든 파일에 완벽하게 최신 데이터가 필요하지 않습니다. 아직도 설정해야 [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) 작은 값으로 (예를 들면, 60) ,하지만 그것은 작아야 (예를 들어, 3) ·
     
    *    **이용안내** 파일 내의 실시간 데이터의 조직: 예를 들어, 수많은 역에 데이터를 저장하는 데이터 세트가 있습니다. (또는 부표, 또는 쓰레기, ...) 몇 년 동안, 당신은 파일을 배치 할 수 있으므로 예를 들어, 역 당 하나의 파일이 있습니다. 그러나, 역에 대한 모든 시간 새로운 데이터가 도착, 당신은 큰 오래된 파일을 읽고 큰 새로운 파일을 작성해야합니다. 그리고 때ERDDAP™dataset를 다시로드, 그것은 일부 파일이 변경되었는지, 그래서 그것은 그 파일을 완전히 읽는다. 그것은 비효율적입니다.
         
    *    **(주)** 파일 내의 실시간 데이터의 조직: 예를 들면, 1개의 역/buoy/trajectory를 위한 모든 자료의 펑크에 있는 자료를 저장하십시오 (또는 1 달) · 그런 다음 새로운 다툼이 도착하면 올해의 파일 만 (또는 달) 데이터는 영향을받습니다.
        
        * 제품 정보: 제품 정보NetCDFv3의.nc무제한 차원 파일 (시간 :) · 그런 다음 새 데이터를 추가하려면 전체 파일을 읽지 않고 새 데이터를 추가 할 수 있습니다. 변경은 매우 효율적이 고 근본적으로 원자로, 그래서 파일은 의도 한 상태에 있지 않습니다.
        * 그렇지 않으면: 당신이/사용할 수 없는 경우에.nc무제한 차원 파일 (시간 :) , 다음, 새로운 데이터를 추가 할 때, 당신은 전체 영향을 파일을 읽고 다시 작성해야 (한 해가 되기 때문에 희망적으로 작습니다. (또는 달) 데이터의 가치) · 다행히, 이전 년 동안 모든 파일 (또는 달) 그 역은 변하지 않습니다.
        
두 경우에, 때ERDDAP™dataset를 다시로드, 대부분의 파일이 변경되지 않습니다; 단지 몇 가지, 작은 파일이 변경 및 읽기해야합니다.
         
##### 주요연혁{#directories-1} 
이 파일은 하나의 디렉토리 또는 디렉토리 및 하위 디렉토리에 있을 수 있습니다. (자주 묻는 질문) · 대용량 파일이 있는 경우 (예를 들면, &gt;1,000) , 운영 체계 (그리고 따라서 EDDTableFromFiles) 당신은 일련의 하위디렉토리에 파일을 저장하면 훨씬 더 효율적으로 작동합니다. (1 년 당, 또는 아주 빈번한 파일을 가진 datasets를 위한 달 당 하나) , 그래서 주어진 디렉토리에 파일의 거대한 수 없습니다.
     
##### 원격 감독 및 HTTP 범위 요청{#remote-directories-and-http-range-requests-1} 
*    **원격 감독 및 HTTP 범위 요청**   (AKA Byte 서빙, Byte 범위 요청) --
    EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles 및 EDDTableFromNcCFFiles는 때때로 자료에서 봉사할 수 있습니다.nc원격 서버의 파일 및 서버가 지원되는 경우 HTTP를 통해 액세스[리뷰 쓰기](https://en.wikipedia.org/wiki/Byte_serving)HTTP 범위 요청을 통해 (byte 서빙을위한 HTTP 메커니즘) · 이것은 netcdf-java 때문에 가능합니다. (이름 *ERDDAP™자주 묻는 질문.nc파일 형식) 원격에서 읽기 데이터를 지원.ncHTTP 범위 요청을 통해 파일.
    
     **이것을 하지 마세요&#33;**   
대신, 사용 [&lt;cacheFromUrl&gt; 시스템 (#cachefromurl의 경우) ·
    
##### 캐시FromUrl{#cachefromurl} 
* [기타] ** &lt;캐시FromUrl&gt; ** · (#cachefromurl의 경우) - - -
모든 것EDDGridfromFiles 및 모든 EDDTableFromFiles 데이터셋은 태그 세트를 지원합니다.ERDDAP™다운로드 및 원격 데이터셋의 모든 파일 사본을 유지, 또는 몇 가지 파일의 캐시 (다운로드) · **이것은 매우 유용합니다.** 
    * 더 보기&lt;cacheFromUrl&gt; 태그는 원격 파일 목록에서 원격 데이터셋의 파일 목록으로 URL을 지정할 수 있습니다.
        
        * THREDDS, e.g에 통합 된 데이터 세트,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020년 10월 21일 이 서버는 더 이상 믿을 수 없습니다.\\]
        * 통합된 datasetsHyrax, 예를들면
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * 대부분의 Apache-like 디렉토리 목록, 예,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * S3 물통, 예를들면,
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
그러나 AWS 계정과 설정이 필요할 수 있습니다.
이름 *[S3 버킷 작업ERDDAP™](#working-with-aws-s3-files)·
또한, 당신은 보통 캐시를 사용할 필요가 없습니다 파일이 ASCII 파일 인 경우 S3 버킷의 파일이있는 FromUrl (예를 들어, .csv) , 때문에ERDDAP™효율적으로 스트림을 통해 버킷에서 데이터를 읽을 수 있습니다.
        
        ERDDAP™dataset의 파일을 복사하거나 캐시합니다.&lt;fileDir&gt; 디렉토리. 원격 파일 목록의 다른 유형에 대한 지원이 필요한 경우 (예를 들어, FTP) , Chris에게 당신의 요구를 이메일을 보내십시오. noaaa.gov의 존.
        
        * 기본 값&lt;cacheFromUrl&gt; 태그는 null입니다. 값을 지정하지 않으면&lt;cacheFromUrl&gt; 태그, 복사 / 캐시 시스템은이 데이터 세트에 사용할 수 없습니다.
        * dataset의 경우&lt;파일Regex&gt; 설정은 다른 것 .\\*,ERDDAP™fileRegex와 일치하는 파일만 다운로드합니다.
        * dataset의 경우&lt;recursive&gt; 설정은 true이며 원격 파일은 하위 디렉토리에 있습니다.ERDDAP™dataset의 []와 일치하는 원격 하위 디렉토리에 표시됩니다.&lt;경로Regex&gt;] (#경쟁) , 같은 디렉토리 구조를 로컬로 만들고, 같은 하위 디렉토리에 로컬 파일을 넣어.
        * GenerateDatasets에 대하여 Xml, 지정할 경우&lt;cacheFromUrl&gt; 값, 생성 데이터셋 Xml는 로컬 생성&lt;fileDir&gt; 디렉토리 및 복사 1 원격 파일로. Generate데이터셋 Xml는 다음을 생성합니다.datasets.xmlchunk based on 그 샘플 파일 (표본 지정 파일=nothing) ·
        * 데이터 소스가 원격이라면ERDDAP™, 사용[EDDGrid언어: en](#eddfromerddap)또는[EDDTableErddap에서](#eddfromerddap)대신에&lt;cacheFromUrl&gt;. 그 길, 당신의 지역ERDDAP™dataset을 가지고 있지만 로컬의 데이터를 저장 할 필요가 없습니다. 자주 묻는 질문&lt;cacheFromUrl&gt; 원격에서 데이터를 얻을ERDDAP™데이터 파일의 로컬 복사본을 가지고 싶은 다른 이유가 있을 때입니다. 그 경우:
            * 이 dataset는 리모트에 dataset에 구독하려고 합니다ERDDAP그래서 그 dataset이 dataset의 flag로 변경됩니다. Url, 이 로컬 dataset을 다시로드하고 변경 된 원격 파일을 다운로드합니다. 따라서 로컬 데이터셋은 변경 후 곧 업데이트될 것입니다.
            * 원격 관리자에게 이메일을 보내야 합니다.ERDDAP™자주 묻는 질문datasets.xml원격 데이터셋을 위해 로컬의 데이터셋을 만들 수 있습니다.ERDDAP™리모트에 dataset 처럼 보이는ERDDAP·
        * 데이터 소스가 원격이라면ERDDAP™, 로컬 데이터 세트는 원격 데이터 세트에 가입하려고합니다.
            * 구독이 성공하면 원격ERDDAPreloads and has new data, it will contact the flagURL for this dataset, it to reload and download the new and/or changes data files.
            * 구독이 실패한 경우 (어떤 이유) 또는 로컬 데이터 세트가 최신인지 확인하려면 설정할 수 있습니다.[기본 정보](/docs/server-admin/additional-information#flag)로컬 데이터 세트를 위해, 그래서 다시로드됩니다, 그래서 그것은 새로운 및 / 또는 원격 데이터 파일을 변경합니다.
        * 데이터 소스가 원격이 아닌 경우ERDDAP: dataset는 새로운 및 / 또는 다시로드 할 때마다 원격 파일을 변경합니다. 정상적으로, 이것은에 의해 통제됩니다 [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) · 그러나 새로운 원격 파일이있을 때 알고 있다면, 당신은 설정할 수 있습니다[기본 정보](/docs/server-admin/additional-information#flag)로컬 데이터셋을 위해, 그래서 새로운 및/또는 원격 데이터 파일을 다시로드하고 검사합니다. 이 일의 특정 시간에 일상적으로 발생하면 (예, 오전 7시) , 당신은 cron 일을 사용할 수 있습니다curl본문 바로가기 이 dataset를 위한 Url, 그래서 새로운 및/또는 변경된 먼 자료 파일을 위한 재부하 그리고 검사할 것입니다.
    * 더 보기&lt;cacheSizeGB&gt; 태그는 로컬 캐시의 크기를 지정합니다. 클라우드 스토리지 시스템과 같은 작업을 할 때만 사용할 필요가 있습니다.[아마존 S3](https://aws.amazon.com/s3/)일반적으로 사용되는 저장 시스템입니다.[Amazon 웹 서비스 (사이트맵) ](https://aws.amazon.com/)· 기본값은 -1입니다.
        * 값이 있는 경우&lt;=0 (예를 들어, -1의 기본 값) ·
            ERDDAP™다운로드 및 유지 **전체 복사** dataset의 모든 파일&lt;파일Dir&gt;.
            * 가능한 한 권장되는 설정입니다.
            * 항상 dataset는 다시로드되고, 그것은 원격 파일 및 로컬 파일의 이름, 크기 및 lastModified 시간을 비교하고, 새로운 또는 변경 된 모든 원격 파일을 다운로드합니다.
            * 원격 서버가 사라지는 파일이 있다면,ERDDAP™해당 로컬 파일을 삭제하지 않습니다. (그렇지 않으면 원격 서버와 일시적으로 잘못되었는지,ERDDAP™일부 또는 모든 로컬 파일을 삭제할 수 있습니다&#33;) ·
            * 이 조정으로, 보통 당신은 놓을 것입니다&lt;updateEveryNMillis&gt; 에 -1, dataset가 새로운 데이터 파일을 배치 할 때 인식이기 때문에.
        * 값이 &gt;0이라면,
            ERDDAP™로컬에 필요한 원격 데이터셋에서 파일을 다운로드합니다. **뚱 베어** (데이터셋에서&lt;fileDir&gt;) GB의 지정된 수의 임계값을 가진다.
            * 캐시는 적어도 몇몇 자료 파일을 붙들기 위하여 충분히 크아야 합니다.
            * 일반적으로, 더 큰 캐시, 더 나은, 다음 요청된 데이터 파일이 이미 캐시에있을 가능성이 더.
            * 캐싱은 사용될 때만 사용되어야 합니다ERDDAP™클라우드 컴퓨팅 서버에서 실행 (e.g., AWS compute 인스턴스) 클라우드 스토리지 시스템의 원격 파일 (예를 들어, AWS S3) ·
            * 로컬 파일에 의해 사용되는 디스크 공간이 캐시를 초과 할 때 크기GB,ERDDAP™곧 (어쩌면 즉시) 캐시 된 파일의 일부를 삭제 (현재 Least를 기반으로 최근 사용 (로드 중 ...) 언어: English) 로컬 파일에 의해 사용되는 디스크 공간까지&lt;0.75 \\ * 캐시 크기GB ("골") · 예, LRU가 매우 나쁜 것을 수행하는 경우 -- 완벽한 알고리즘이 없습니다.
            *   ERDDAP™캐시 된 파일을 삭제하려고하지 않을 것입니다.ERDDAP™마지막 10 초에서 사용하기 시작했습니다. 이 시스템은 캐시 시스템 및 데이터 파일 리더 시스템뿐만 아니라 느슨하게 통합됩니다. 이 규칙 때문에,ERDDAP™이 웹 사이트는 애플 리케이션에 전념. 우리는 정품 앱과 게임을 제공 할 목적으로이 사이트를 만들었습니다. 4AppsApk 최고의 안드로이드 애플 리케이션을위한 무료 APK 파일 다운로드 서비스, 계략. 이런 일이 발생하면 dataset에 더 큰 cacheSizeGB 설정을 사용합니다.
            * 현재,ERDDAP™원격 서버가 로컬 캐시에 있는 파일의 더 새로운 버전이 있는지 확인하지 마십시오. 이 기능을 필요로 하는 경우에, Chris를 이메일을 보내십시오. noaaa.gov의 존.
        * 동일한 태그 이름의 사용은 복사 시스템 및 캐시 시스템을 사용하여 동일한 underlying 시스템을 사용할 수 있지만 올바른 것은 아닙니다.
            * Copy system proactively start taskThread task to download new and changes files every time the dataset is reloaded. 실제로 로컬 디렉토리에 복사 된 파일 만 사용할 수 있습니다.ERDDAP™데이터셋.
            * 캐시 시스템은 원격 파일 목록을 매번 얻습니다. dataset는 다시로드되고 그 파일의 모든 파일을 통해 사용할 수 있습니다.ERDDAP™데이터셋. 흥미롭게도, 모든 원격 파일도 dataset의 /files/ 웹 페이지에 나타나고 다운로드 할 수 있습니다 (파일이 원격 서버에서 로컬 캐시에 처음 다운로드되는 동안 지연 후만.) 
        * cacheSizeGB를 사용하는 데이터 세트는 사용에서 혜택을 누릴 수 있습니다.[뚱 베어](#nthreads)1보다 더 큰 설정을 설정하기 때문에 데이터 세트가 한 번에 1 이상의 원격 파일을 다운로드 할 수 있기 때문입니다.
    * 더 보기&lt;cachePartialPathRegex&gt; 태그는 데이터셋의 대안을 지정할 수 있는 드물게 사용되는 태그입니다 [&lt;경로Regex&gt;] (#경쟁) · 기본값은 null입니다.
        * 기본값을 통해 전체 dataset을 복사하는 경우만 사용하십시오.&lt;-1의 cacheSizeGB&gt; 값.&lt;cacheSizeGB&gt; 값의 &gt;1, 이것은 비감적이기 때문에 무시됩니다.
        * 자주 묻는 질문&lt;경로Regex&gt;] (#경쟁) regex를 건설하는 방법에 대한 지침.
        * 이 지정되면 데이터 세트가 다시로드됩니다. 데이터 세트는 한 달의 시작 부분에 다시로드됩니다.
        * 원격 데이터셋이 하위디렉토리에 저장되고 그 파일의 광대한 대다수가 드물게 변하면 됩니다. (주)&lt;한국어 NASA의&lt;기침&gt;) 예를 들어, 지정할 수 있습니다.&lt;cachePartialPathRegex&gt;는 현재 연도 또는 현재 달과 일치합니다. 이 regexes는 부분과 전체 경로 이름은 모두 일치하기 때문에 매우 까다로운 것입니다.&lt;cachePartialPathRegex&gt; 과 때문에&lt;cachePartialPathRegex&gt;는 원격 URL과 로컬 디렉터리로 작업해야합니다. 실제 생활 예는:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
위의 샘플 URL은 년을 기준으로 하위 디렉토리에 파일이 있습니다. (2018년) 일 년 (예를 들어, 001, 002, ..., 365 또는 366) ·
주의사항&lt;cachePartialPathRegex를 호출합니다. 시작 .\\*,
그런 다음 원격 URL과 로컬 디렉토리에 공통되는 특정 하위 디렉토리가 있습니다. 예를 들어 /v4\\.1/
그런 다음 첫 번째 옵션이 아무것도없는 둥지 캡처 그룹의 시리즈가 있습니다.
두 번째 옵션은 특정 값입니다.
            
위의 예는 2018 년 2 월 10 일, 예를 들어,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020년 10월 21일 이 서버는 더 이상 믿을 수 없습니다.\\]  
일 011, 012, ..., 019.
             (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·)   
당신이 만드는 데 도움이 필요한 경우&lt;cachePartialPathRegex&gt;, 이메일을 보내&lt;cacheFromUrl&gt; 에 Chris. noaaa.gov의 존.
            
        * 일반적인 접근법: 사용하려는 경우&lt;cachePartialPathRegex&gt;, 처음 사용 하지 않습니다, 당신이 원하는 때문에ERDDAP™파일을 처음에 다운로드합니다. 이름 *ERDDAP™모든 파일을 다운로드, dataset의 chunk에 추가datasets.xml·
             
##### 파일의 수천{#thousands-of-files} 
데이터셋이 수천 개의 파일이 있다면,ERDDAP™dataset에서 dataset에 대한 요청에 대한 응답이 느릴 수 있습니다. 여기에 두 가지 문제가 있습니다:
 

1. 디렉토리 당 파일 수.
내부적으로,ERDDAP™n 파일이 하나의 디렉토리에 있거나 여러 디렉토리에 분산 여부에 관계없이 동일한 속도로 작동합니다.
     
그러나 문제가 있습니다 : 주어진 디렉토리에 더 많은 파일, 느린 운영 체제는 디렉토리에 파일 목록 반환에 (파일 당) 이름 *ERDDAP· 응답 시간은 O일 수 있습니다 (n 로그 n) · 그것은 하나의 디렉토리에 여러 파일이 너무 많은 것을 말하는 것은 어렵지만 10,000은 아마도 너무 많은 것입니다. 그래서 설정이 많은 파일을 생성하는 경우, 여기에 권장 사항이 될 수 있습니다: 논리적으로 조직 된 하위 디렉토리에 파일을 넣어 (e.g., 역 또는 역/년) ·
    
subdirectories를 사용하는 또 다른 이유 : 사용자가 사용하려는 경우ERDDAP이름 *"files"역 X의 가장 오래된 파일의 이름을 찾는 시스템, 파일이 역 / 년 하위 디렉토리에 있는지, 훨씬 적은 정보가 전송되어야하기 때문에 더 빠르고 효율적입니다.
    
2. 총 파일 수.
tabular datasets를 위해,ERDDAP™각 파일에서 각 변수에 대한 값의 범위를 추적합니다. 사용자가 요청할 때,ERDDAP™사용자 요청과 일치하는 데이터가 있을 수 있는 모든 파일에서 모든 데이터를 읽을 수 있습니다. 사용자가 제한된 시간에 데이터를 요청하는 경우 (e.g., 1 일 또는 1 달) , 다음ERDDAP™데이터셋에 너무 많은 파일을 열 필요가 없습니다. 그러나 거의 모든 파일이 데이터를 일치 할 수있는 극단적 인 경우가있다 (예를들면, waterTemperature=13.2C) · 시작하기ERDDAP™조금의 시간 (부분적으로 HDD에서 추구 시간, 부분적으로 파일의 헤더를 읽는 시간) 주어진 파일을 여는 다만 (그리고 더 많은 경우 디렉토리에 파일의 많은) , 그 파일의 총 수 인 경우 상당한 시간의 벌금이 있습니다.ERDDAP™열려있게 아주 크다. 1000 파일을 여는 것은 상당한 시간이 걸립니다. 그래서 주기적으로 더 큰 펑크로 매일 파일을 통합하는 이점이 있습니다. (e.g., 1 년간 1 역) · 나는 당신이 다양한 이유로 이것을 할 수없는 것을 이해하지만 훨씬 빠른 응답으로 이어질 수 있습니다. 극단적인 경우 (e.g., ~35 백만 소스 파일이있는 GTSPP 데이터 세트와 거래) , 엄청난 수의 소스 파일에서 데이터를 서빙하기 때문에ERDDAP간단한 쿼리에 대한 응답은 시간과 메모리 톤을 사용할 수 있습니다. 소스 파일을 더 작은 숫자로 통합 (GTSPP를 위해, 나는 지금 720, 달 당 2가 있습니다) ·ERDDAP™신속하게 대응할 수 있습니다. 이름 *[수백만의 파일](#millions-of-files)  
     

N.B. 솔리드 스테이트 드라이브는 훌륭합니다&#33; 가장 빠르고 쉬운, 가장 싼 방법ERDDAP™거대한 수의 거래 (작은 가슴) 파일은 고체 드라이브를 사용합니다. 이름 *[솔리드 스테이트 드라이브는 훌륭합니다&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### 수백만의 파일{#millions-of-files} 
* 몇몇 datasets에는 소스 파일의 수백만이 있습니다.ERDDAP™이것을 처리할 수 있습니다, 하지만 혼합 된 결과.
    
    * 단지 변수를 포함하는 요청을 위해 [&lt;subsetVariables&gt;] (#subsetvariables의 특징) ·ERDDAP™이미 datafiles에서 추출 하 고 하나의 파일에 저장, 그래서 그것은 매우 빨리 응답할 수 있습니다.
    * 다른 요청에 대 한,ERDDAP™dataset를 스캔할 수 있습니다.[관련 파일](#cached-file-information)그리고 몇 가지 파일만 요청과 관련된 데이터가 있을 수 있으므로 신속하게 대응할 수 있습니다.
    * 그러나 다른 요청 (예를 들어, waterTemperature=18도\\_C) 어떤 파일은 관련 데이터가있을 수 있습니다.ERDDAP™파일의 각이 요청과 관련된 모든 데이터가 있는지 볼 수있는 많은 파일을 엽니 다. 파일이 순차적으로 열립니다. 모든 운영 체제 및 모든 파일 시스템 (고체 드라이브 이외의) , 이것은 긴 시간이 걸립니다 (·ERDDAP™자주 묻는 질문) 파일 시스템을 정말 ties (·ERDDAP™다른 요청에 천천히 대응) ·
    
다행히, 해결책이 있습니다.
    
    1. 비공개에 dataset 설정ERDDAP™  (개인 컴퓨터?) ·
    2. 시리즈를 요청하고 스크립트를 실행.ncCF 파일, dataset의 큰 펑크 각각, 보통 시간 (예를 들어, 주어진 달에 대한 모든 데이터) · 결과 파일의 전부가 2GB 미만인 시간 기간을 선택하십시오. (그러나 1GB 보다는 더 중대한) · dataset가 언리얼타임 데이터가 있는 경우, 현재 시간 동안 파일을 재생하기 위해 스크립트를 실행합니다. (예, 이번 달) 기타 제품 (각 10 분? 각 시간?) · 견적 요청ERDDAP™제품정보.ncCF 파일 생성NetCDFv3의.nc파일 사용[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged 배열 자료 구조).
    3. 설정하기[EDDTableNcCFFiles에서](#eddtablefromnccffiles)당신의 공개에 datasetERDDAP™그것은에서 데이터를 가져옵니다.nc (사이트맵) 파일.ERDDAP™이 파일에서 데이터를 아주 빨리 추출할 수 있습니다. 그리고 지금 수십 개 또는 수백 (수백만 대신) 파일의 경우도ERDDAP™파일을 모두 열려면 신속하게 수행 할 수 있습니다.
    
예,이 시스템은 설정하는 데 시간과 노력이 걸립니다, 하지만 그것은 매우 잘 작동합니다. 대부분의 데이터 요청은 이전보다 100 배 더 빨리 처리 할 수 있습니다.
    \\[Bob은이 가능성을 알고 있었지만, 먼저이 일을 한 Kevin O'Brien이었습니다. 지금, Bob은 약 18 만 소스 파일이 있는 GTSPP 데이터 세트를 위해 이것을 사용하고 있습니다.ERDDAP™지금 약 500을 통해 봉사.nc (사이트맵) 파일.\\]
    
N.B. 솔리드 스테이트 드라이브는 훌륭합니다&#33; 가장 빠르고 쉬운, 가장 싼 방법ERDDAP™거대한 수의 거래 (작은 가슴) 파일은 고체 드라이브를 사용합니다. 이름 *[솔리드 스테이트 드라이브는 훌륭합니다&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### 큰 파일{#huge-files} 
* 단일 거대 데이터 파일 (ASCII 데이터 파일) OutOfMemoryError를 일으킬 수 있습니다. 이 문제가 있다면, 그것은 분명해야ERDDAP™dataset를 로드하지 못합니다. 가능한 경우, 파일을 여러 파일로 분할하는 것입니다. 이상적으로, 당신은 논리 펑크로 파일을 분할 할 수 있습니다. 예를 들어, 파일이 데이터의 20 개월의 가치가있는 경우, 20 파일로 분할, 데이터의 1 개월의 값으로 각각. 그러나 주요 파일이 arbitrarily를 분할하더라도 이점이 있습니다. 이 접근법에는 여러 이점이 있습니다: a) 1/20로 데이터 파일을 읽는 데 필요한 메모리를 줄일 수 있으므로 한 번에 하나의 파일이 읽습니다. ₢ 킹 뚱 베어ERDDAP™요청을 처리 할 수 있기 때문에 그것은 단지 하나 또는 주어진 요청에 대한 데이터를 찾기 위해 몇 가지 파일에서 볼 수. (주) 데이터 수집이 진행되면 기존 20 파일이 변경되지 않을 수 있으며, 다음 달의 데이터가 데이터셋에 추가할 수 있도록 하나의 작은 새 파일을 수정해야 합니다.
     
##### FTP Trouble/광고{#ftp-troubleadvice-1} 
* FTP 새로운 데이터 파일이 있으면ERDDAP™서버 whileERDDAP™실행, 그 기회가있다ERDDAP™FTP 프로세스 중에 dataset을 다시로드합니다. 생각보다 더 자주 발생합니다&#33; 그것이 일어나는 경우, 파일은 유효하다 (유효한 이름이 있습니다.) , 하지만 파일은 유효하지 않습니다. 이름 *ERDDAP™잘못된 파일에서 데이터를 읽으려면 결과 오류가 잘못된 파일의 테이블에 추가 될 파일이 발생할 수 있습니다. 이것은 좋지 않습니다. 이 문제를 방지하기 위해, 예를 들면 FTP'ing 파일, ABC2005를 위해 임시 파일 이름을 사용하십시오.nc\\_TEMP . 그런 다음 fileNameRegex 테스트 (더 보기) 이 관련 파일이 없다는 것을 나타냅니다. FTP 프로세스가 완료되면 올바른 이름으로 파일을 이름을 변경합니다. renaming 프로세스는 즉시 관련이 될 파일을 일으킬 것입니다.
    
##### 파일 이름 Extracts{#file-name-extracts} 
\\[이 기능은 DEPRECATED입니다. 이용안내[\\*\\*\\*fileName 가짜sourceName](#filename-sourcenames)대신.\\]  
EDDTableFromFiles는 각 파일명에서 문자열을 추출하고 가짜 데이터 변수를 만들기 위해 사용하는 시스템을 가지고 있습니다. 현재 날짜 / 시간으로이 문자열을 해석 할 수있는 시스템이 없습니다. 이 시스템을 설정하는 여러 XML 태그가 있습니다. 이 시스템의 일부 또는 모든 것을 필요로하지 않으면이 태그를 지정하거나 ""값을 사용하십시오.

* preExtractRegex는[일반 표현](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([관련 기사](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) filename의 시작에서 제거 할 텍스트를 식별하는 데 사용됩니다. regex가 일치하면 제거 만 발생합니다. 이것은 일반적으로 "^"로 시작한다.
* 이름 * ExtractRegex는 filename의 끝에 제거 할 텍스트를 식별하는 데 사용되는 일반 표현입니다. regex가 일치하면 제거 만 발생합니다. 이것은 보통 파일 이름의 끝과 일치하기 위해 "$"로 끝납니다.
* 추출물Regex 현재, 이 정규식은 preExtractRegex 및 postExtractRegex가 파일명에서 추출한 문자열을 식별하기 위해 사용됩니다. (예를 들어,stationID) · regex가 일치하지 않으면 전체 파일 이름은 사용됩니다. (minus preExtract 및 포스트 제품 정보) · preExtractRegex 및 postExtractRegex 이후 왼쪽 전체 파일 이름과 일치하려면 ".\\*"을 사용하십시오.
* 주요 특징 NameForExtract는 추출된 문자열의 데이터 열 소스 이름입니다. ·dataVariable으로[sourceName](#sourcename)자주 묻는 질문dataVariables 목록 (모든 데이터 유형으로, 하지만 보통 문자열) ·

예를 들어, dataset이 XYZAble과 같은 이름으로 파일이 있는 경우.nc· XYZBaker.nc· XYZCharlie.nc, ..., 당신은 새로운 변수를 만들려면 (stationID) 각 파일이 역 ID 값이 있는 경우 (, 빵집, 찰리, ·) 파일명에서 추출, 이 태그를 사용할 수:

*   &lt;이전ExtractRegex&gt;^XYZ&lt;·preExtractRegex&gt;
초기 ^는 힘의 정규식 특수 문자입니다.ERDDAP™filename의 시작 부분에 XYZ를 찾습니다. 이 원인 XYZ, 파일 이름의 시작 부분에 발견되면 제거 (예를 들어, filename XYZAble.nc현재 위치.nc) ·
*   &lt;포스트ExtractRegex&gt;\\\.nc$ 6,000 원&lt;/postExtractRegex&gt;의 경우
끝에서 $는 종래의 특별한 문자입니다.ERDDAP™더 보기.nc파일명의 끝에서. . 정규 표현식 특수 문자 (어떤 문자를 일치) , \\로 인코딩됩니다. 이름 * (2E는 주기를 위한 hexadecimal 특성 수입니다) · 이 원인.nc, filename의 끝에 발견되면 제거 (예를 들면, 부분적인 filename 제품정보.nc현재 위치) ·
*   &lt;추출Regex&gt;.\\*&lt;/extractRegex&gt;의 경우
.\\* 정규 표현식은 나머지 모든 문자 일치 (예를 들면, 부분적인 filename 첫 번째 파일에 대한 추출이된다) ·
*   &lt;열NameForExtract&gt;stationID&lt;/columnName포스트&gt;
이 말ERDDAP™새 소스 열을 만들려면stationID각 파일을 읽을 때. 주어진 파일의 모든 행에는 파일명에서 추출된 텍스트가 있습니다. (예를 들어, 제품정보) 값으로stationID열.

대부분의 경우, 동일한 결과를 산출 할 수있는이 추출물 태그에 대한 수많은 값이 있습니다 -- 일반 표현은 매우 유연합니다. 그러나 몇 가지 경우, 원하는 결과를 얻을 수있는 한 가지 방법이 있습니다.
     
##### 사이트맵sourceName₢ 킹{#pseudo-sourcenames} 
각 dataset의 모든 변수ERDDAP™한국어&lt;sourceName&gt;] (#출처) 변수의 소스의 이름을 지정합니다. EDDTableFromFiles는 몇몇 가짜를 지원합니다sourceName다른 곳에서 값을 추출하는 s (e.g., 파일명 또는 글로벌 속성의 값) 그리고 그 값은 데이터의 펑크에 대한 일정한 값이 될 것 (e.g., 그 파일의 테이블) · 이 변수의 경우, 당신은 [을 통해 변수의 데이터 유형을 지정해야&lt;데이터타입&gt;] (#자료) 태그. 추출된 정보가 dateTime 문자열인 경우, dateTime 문자열의 형식을 지정합니다.[단위 속성](#string-time-units)· 뚱 베어sourceName옵션은:
 
###### 글로벌:sourceName₢ 킹{#global-sourcenames} 
각 소스 데이터 파일의 글로벌 메타데이터 속성은 데이터의 열에 기여할 수 있습니다. 변수의 경우&lt;sourceName&gt; 형식이 있습니다.
```
        <sourceName>global:*attributeName*</sourceName>
```
그 때ERDDAP™파일에서 데이터를 읽고,ERDDAP™그 이름의 글로벌 속성을 찾습니다. (예를 들면, PI) 속성의 값으로 채워진 열을 만듭니다. 이 속성이 다른 소스 파일에 다른 값을 가지고있을 때 유용합니다. 그렇지 않으면 사용자는 전체 데이터셋에 대한 그 값 중 하나를 볼 수 있습니다. 예를 들어,
```
        <sourceName>global:PI</sourceName>
```
데이터가 될 속성을 홍보 할 때,ERDDAP™해당 속성을 제거합니다. 이것은 값이 모든 파일에서 다르기 때문에 적절합니다. 집계 된 데이터 세트의 위치ERDDAP™그것은 단지 1개의 가치가 있을 것입니다. 원하는 경우, 추가하여 전체 데이터셋의 속성에 대한 새로운 가치를 추가할 수 있습니다.&lt;이름 = *이름 * 이름 ** "&gt; *새로운 소식 주요 특징* &lt;/att&gt; dataset의 글로벌 [&lt;addAttributes&gt;] (#addattributes를 추가) · 글로벌 속성ERDDAP™필요한 경우, 예를 들어, 기관, 당신은 속성에 대한 새로운 가치를 추가합니다.
     
###### 변수:sourceName₢ 킹{#variable-sourcenames} 
각 파일의 변수의 메타데이터 속성은 데이터의 열을 촉진 할 수 있습니다. 변수의 경우&lt;[sourceName](#sourcename)\\&gt; 형식이 있습니다.
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
그 때ERDDAP™파일에서 데이터를 읽고,ERDDAP™지정된 속성을 찾습니다. (예를 들면, ID) 지정된 변수의 (예를 들면, 계기) 속성의 값으로 채워진 열을 만듭니다. 부모 변수 (예를 들면, 계기) Needn't는dataVariabledataset의 정의에 포함 된 sERDDAP· 예를 들어,
```
        <sourceName>variable:instrument:ID</sourceName>
```
이 속성이 다른 소스 파일에 다른 값을 가지고있을 때 유용합니다. 그렇지 않으면 사용자는 전체 데이터셋에 대한 그 값 중 하나를 볼 수 있습니다.

데이터가 될 속성을 홍보 할 때,ERDDAP™해당 속성을 제거합니다. 이것은 값이 모든 파일에서 다르기 때문에 적절합니다. 집계 된 데이터 세트의 위치ERDDAP™그것은 단지 1개의 가치가 있을 것입니다. 원하는 경우, 추가하여 전체 데이터셋의 속성에 대한 새로운 가치를 추가할 수 있습니다.&lt;이름 = *이름 * 이름 ** "&gt; *새로운 소식 주요 특징* &lt;/att&gt; 변수의 [&lt;addAttributes&gt;] (#addattributes를 추가) · 속성에 대 한ERDDAP™예를 들어,ioos\\_category  (설정에 따라) , 당신은 속성에 대한 새로운 가치를 추가합니다.
        
###### 파일이름sourceName₢ 킹{#filename-sourcenames} 
fileName의 일부를 추출하고 데이터의 열을 촉진 할 수 있습니다. 이 가짜의 형식 [&lt;sourceName&gt;] (#출처) 이름 *
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
예를 들어,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
EDDTableFromFiles가 파일에서 데이터를 읽을 때 fileName을 확인합니다. (예를 들어, A201807041442.slcpV1.nc) 지정된 정규 표현 ("regex"를) 그리고 지정된 추출 (이 경우, 첫 번째) 캡쳐 그룹 (모체로 둘러싸인 부분) , 예를 들면, "201807041442". (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·) regex는 주위 인용 없이 문자열로 지정될 수 있습니다. regex가 주위 따옴표로 문자열로 지정되면 문자열이 있어야 합니다.[JSON 스타일 문자열](https://www.json.org/json-en.html)  (\\ 문자로 탈출하는 특수 문자) · 캡처 그룹 번호는 보통 1입니다. (첫 번째 캡처 그룹) , 하지만 수 있습니다.
     
###### 패스워드sourceName₢ 킹{#pathname-sourcenames} 
파일의 전체 경로의 일부를 추출할 수 있습니다. 이름 * (/directories / 파일이름.ext) 데이터의 열이 될 것을 촉진합니다. 이 가짜의 형식 [&lt;sourceName&gt;] (#출처) 이름 *
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
예를 들어,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
EDDTableFromFiles가 파일에서 데이터를 읽을 때, 전체 pathName을 확인합니다. (예를 들면, /data/myDatasetID/BAY17/B201807041442.nc· 이 시험을 위해, 디렉토리 분리기는 항상 일 것입니다'/', 절대 '\\ 이름 *) 지정된 정규 표현 ("regex"를) 그리고 지정된 추출 (이 경우, 첫 번째) 캡쳐 그룹 (모체로 둘러싸인 부분) 예를 들어, "BAY17". (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·) regex는 주위 인용 없이 문자열로 지정될 수 있습니다. regex가 주위 따옴표로 문자열로 지정되면 문자열은[JSON 스타일 문자열](https://www.json.org/json-en.html)  (\\ 문자로 탈출하는 특수 문자) · 캡처 그룹 번호는 보통 1입니다. (첫 번째 캡처 그룹) , 하지만 수 있습니다.
         
##### "0 파일" 오류 메시지{#0-files-error-message-2} 
* 당신이 실행하는 경우[생성데이터셋Xml](#generatedatasetsxml)또는[팟캐스트](#dasdds), 또는 당신은 EDDTableFrom로드하려고 ... 파일 datasetERDDAP™, 그리고 당신은 "0 파일" 오류 메시지를 표시ERDDAP™디렉토리에 0 일치하는 파일 발견 (그 디렉토리에 일치하는 파일이 있다고 생각하면) ::
    * 파일이 실제로 그 디렉토리에 있는지 확인합니다.
    * 디렉토리 이름의 맞춤법 확인.
    * fileNameRegex를 확인합니다. 그것은 정말, 정말 쉽게 regexes와 실수를 만들. 시험 목적을 위해, 모든 파일명과 일치해야 regex .\\*를 시도하십시오. (더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)·) 
    * 프로그램을 실행하는 사용자 확인 (예를 들어, user=tomcat (·) 톰캣/ERDDAP) 그 파일에 대한 'read' 권한이 있습니다.
    * 몇몇 운영 체계에서 (예를 들어, SELinux) 그리고 시스템 설정에 따라, 프로그램을 실행하는 사용자는 파일이 있는 디렉토리의 전체 체인에 대한 '읽' 권한이 있어야 합니다.
         
##### 표준화 이름 *{#standardizewhat} 
* EDDTableFromFiles의 하위 클래스가 주어진 변수에 대한 소스 파일의 집합을 구성하는 경우, 소스 파일의 모든 MUST는 여러 속성에 대한 동일한 속성 값을 가지고:scale\\_factor·add\\_offset, \\_수신,missing\\_value, \\_FillValue 및 단위). 그것에 대해 생각 : 한 파일이 windSpeed units=knots 및 또 다른 경우 windSpeed units=m / s, 다음 두 파일의 데이터 값은 동일한 집계 된 데이터 세트에 포함되지 않아야합니다. 그래서, EDDTableFromFiles가 먼저 dataset을 생성 할 때, 그것은 하나의 파일에서 속성 값을 읽습니다. 그런 중요한 속성에 대한 다른 값이있는 모든 파일을 거부합니다. 대부분의 파일 컬렉션의 경우, 모든 변수의 속성이 일관성 있기 때문에 문제가 없습니다. 그러나 파일의 다른 컬렉션의 경우, 이것은 %, 10 %, 50 %, 90 %, 또는 "bad" 파일로 거부되는 파일의 99 %로 이어질 수 있습니다. 그것은 문제입니다.
    
EDDTable파일에서 이 문제를 처리하는 시스템: 표준화 이름 * 표준화 무엇 설정은 EDDTableFromFiles가 파일을 곧 업데이트하기 전에 EDDTableFromFiles가 일관성있는 경우 볼 수있는 속성에서 보이는 것처럼 알 수 있습니다.
    
플립 측은: dataset가 이 문제가 없는 경우에, 표준화하지 않습니다 이름 * 표준화 어떤 잠재적 위험이 있습니까? (아래에서) 관련 기사 그래서 실제로 standardize의 기능을 필요로하지 않는 경우 무엇, 잠재적 위험과 불평을 직면 할 필요가 없습니다. 가장 큰 inefficiency는: 각종 표준화할 때 dataset에서 어떤 옵션이 사용되는지, 소스 파일이 크게 다른 방법으로 데이터를 저장한다는 것을 의미한다. (e.g., 다른scale\\_factor이름 *add\\_offset, 또는 다른 형식을 사용하여 시간 문자열) · 따라서, 사용자 요청에 주어진 constraint를 위해, 아무 방법도 없습니다ERDDAP™모든 소스 파일에 적용 할 수있는 단일 소스 레벨 제약을 만들려면. 이름 *ERDDAP™더 높은 수준에서 영향을받는 제약 만 적용 할 수 있습니다. 이름 *ERDDAP™더 높은 목적지 수준의 제약을 적용하기 전에 더 많은 파일에서 데이터를 읽으십시오. 그래서 표준을 사용하는 datasets에 요청 더 이상 처리 될 수 있습니다.
    
이 시스템을 사용하려면 지정해야 합니다.
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
내 계정[datasets.xmlEDDTable에서 ... 파일 dataset](#eddtablefromfiles-skeleton-xml)(내에서&lt;dataset&gt; 태그).
    
더 보기 *표준화 이름 ** EDDTableFromFiles를 변경하는 값은 적용하려고 합니다. 변경은 일부 조합의 요약입니다:
    
1. 옵션 정보
이 파일은 숫자 열을 표준화하기 위해 많은 공통적이고 안전한 작업입니다.
    * 이름 *scale\\_factor및/또는add\\_offset속성은 현재, 제거하고 데이터 값을 풀기 위해 적용.
    * Unpack 포장 된 속성 (e.g., 실제 \\_min, 실제 \\_max,actual\\_range·data\\_min·data\\_max, 데이터 \\_range,valid\\_min·valid\\_max·valid\\_range) , 현재, 변수가 포장 된 경우, 속성 값이 포장 된 경우 (이것은 까다로운, 그러나 믿을 수 있는) ·
    * \\_FillValue 및/또는missing\\_value현재, 그 데이터 값을 변환ERDDAP'표준' 누락된 값: MAX\\_VALUE integer 유형 (e.g., 바이트 127, 짧은 32,767, 그리고 2,147,483,647 ints, 9223372036854775807 긴 수명) 두 배와 뜨기를 위한 NaN.
    * 이전 \\_FillValue 및/or 제거missing\\_value이름 * (이름 *) , 그냥 \\_FillValue =로 교체\\[이름 *ERDDAP™표준 누락 값\\]·
         
2. 표준 수치 시간
숫자 열이 CF-style 숫자 시간 단위가있는 경우 (· *시간단위* 이름 * *기본시간* ", 예를 들어, "일 이후 1900-01-01") ,이 날짜를 변환 시간 값으로"seconds since 1970-01-01T00:00:00Z"값과 그를 나타내는 단위 속성을 변경합니다.
이 선택된 경우 이 변수는scale\\_factor또는add\\_offset, #1 MUST도 선택.
     
3. String 적용missing\\_value  
문자열 열이 \\_FillValue 및/or가있는 경우missing\\_value속성, 이것은 그 값을 ""로 변환하고 속성을 제거합니다.
     
4. 숫자 찾기missing\\_value  
숫자가 없다면 \\_FillValue가 없거나missing\\_value속성, 이 트리는 정의되지 않은 수치를 식별missing\\_value  (예, -999, 9999, 1e37f) 그리고 "standard"값으로 인스턴스를 변환 (MAX\\_VALUE integer 유형 및 NAN 더블 및 플로트) ·
     **이 옵션에는 위험이 있습니다.** 가장 큰 또는 가장 작은 유효한 데이터 값이 누락 된 값처럼 보입니다. (예, 999) , 그 유효 데이터 값은 누락된 값으로 변환됩니다. (예, NaN) ·
     
5. 문자열 "N/A"를 ""로 변경
각 문자열 열의 경우, 일반적으로 ""에 누락 된 문자열 값을 나타내는 데 사용됩니다. 현재 ".", "...", "-", "?", "???", "N/A", "NA", "none", "not 적용되지 않음", "null", "unknown", "unspecified". 문자열 검색은 case-insensitive이며 문자열이 트리거 된 후 적용된다. "nd"및 "other"는 목록에 특히 없습니다.
     **이 옵션에는 위험이 있습니다.** 유효한 값이 "로 변환 될 수 있다는 것을 문자열.
     
6. ISO 8601 DateTimes에 표준화
각 문자열 열의 경우, not-purely-numeric String dateTimes를 변환하십시오. (예, "Jan 2, 2018") ISO 8601 문자열 dateTimes에 (· 2018-01-02) ·
     **이름 *** 열의 모든 데이터 값은 동일한 형식을 사용해야합니다. 그렇지 않으면이 옵션은 주어진 열에 어떤 변경을하지 않습니다.
     **이 옵션에는 위험이 있습니다.** 문자열 값이 있는 열이 있는 경우, 일반적인 날짜처럼 보일 수 있습니다. 시간 형식, 그들은 ISO 8601 문자열 dateTimes로 변환됩니다.
     
7. ISO 8601 DateTimes에 컴팩트한 DateTimes 표준화
각 문자열 또는 정수 형 컬럼의 경우, Purely-numeric String dateTimes를 변환하십시오. (예, "20180102") ISO 8601 문자열 dateTimes에 (· 2018-01-02) ·
     **이름 *** 열의 모든 데이터 값은 동일한 형식을 사용해야합니다. 그렇지 않으면이 옵션은 주어진 열에 어떤 변경을하지 않습니다.
     **이 옵션에는 위험이 있습니다.** 컴팩트한 날짜가 없는 값과 열이 있는 경우 시간이지만 컴팩트 한 dateTimes처럼 보이면 ISO 8601 String dateTimes로 변환됩니다.
     
8. 단위를 표준화
각 변수의 단위 문자열을 표준화합니다. 예를 들어, "초당 미터", "meter/second","m.s^-1"·"m s-1", "m.s-1"는 모두 "m.s-1"로 변환됩니다. 이 데이터 값을 변경하지 않습니다. 이 작품은 잘 유효합니다.UDUNITS단위 문자열, 하지만 잘못된 또는 복잡한 문자열에 문제가 있을 수 있습니다. 특정 from-to 쌍을 지정하여 문제를 처리 할 수 있습니다.&lt;표준화Udunits&gt; 내 계정ERDDAP이름 *
    \\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일. Chris에게 어떤 변화든지 이메일을 보내십시오. noaaa.gov에서 존은 기본적으로 message.xml에 통합 될 수 있습니다.
     **이 옵션에는 위험이 있습니다.** 이것은 약간 복잡하거나 잘못된 단위를 수 있습니다; 그러나, 그들은 발생하면 상황 문제로 위에서 설명 된 작업 주위를 사용할 수 있습니다.
         
    
표준화의 기본 값 아무것도하지 않는 0입니다.

표준의 값을 변경하면 dataset가 다시로드 된 다음 시간,ERDDAP™각 파일에 대한 정보와 미니 데이터베이스를 재구성하기 위해 dataset에 대한 모든 데이터 파일을 다시 볼 수 있습니다. dataset가 많은 파일이 있다면, 이것은 오랫동안 걸릴 것입니다.
    
참고 :

* 까다로운 것은 -
표준화 어떤 설정은 소스 파일에있는 모든 열에 사용됩니다. 그래서, 예를 들어, #2048을 사용하면 ISO 8601 String dateTimes의 열을 성공적으로 변환 할 수 있지만, 컴팩트 한 dateTimes와 같은 것으로 보인다 문자열과 열을 실수로 변환 할 수도 있습니다.
     
*   datasets.xml그리고 GenerateDatasets 사이트맵
그것은 특히 까다로운 설정이 수정되도록datasets.xml데이터셋을 만들기 위해 원하는 방법을 사용합니다. 가장 좋은 방법 (항상) 이름:
    1. 제품 정보[생성데이터셋Xml](#generatedatasetsxml)표준의 값을 지정합니다. 무엇을 사용 하 여 싶습니다.
    2. 제품 정보[팟캐스트](#dasdds)dataset가 올바르게로드하고 표준화를 반영하도록 지정된 어떤 설정.
    3. 데이터셋을 손으로 테스트하면ERDDAP™영향을받는 변수는 예상대로 작동합니다.
         
* 위험 -
옵션 #256 이상 위험, 즉, 더 큰 기회가있다ERDDAP™하지 않는 변경을 만들 것입니다. 예를 들어, 옵션 #2048은 실수로 ISO 8601 "compact" 날짜를 볼 수있는 역 ID 문자열과 변수를 변환 할 수 있습니다 (· 2018-10-20) ISO 8601에"extended"이름 * (· 2018-01-02) ·
     
* 변경 후 느린 --
표준의 값부터 EDDTableFromFiles가 표준을 변경하면 각 데이터 파일을 볼 수 있는 데이터 값이 변경됩니다. 어떤 설정, EDDTableFromFiles는 각 파일에 대한 모든 캐시 된 정보를 던져 (각 파일에서 각 데이터 변수에 대한 min 및 max 포함) re-read 각 데이터 파일. dataset에는 많은 파일이 있는 경우에, 이것은 아주 시간 consuming 일 수 있습니다, 그래서 dataset를 위한 장시간을 첫번째로 다시 로드하기 위하여 가지고 갈 것입니다ERDDAP™변경 후 다시로드합니다.
     
* 미래 -
옵션 #256 및 위의 사용 heuristics 그들의 변경을 만들기. 당신이 현실이 나쁜 결정을 내릴 수있는 상황에서 온 경우, Chris에게 문제를 설명하십시오. 노아아의 존. gov 그래서 우리는 heuristics를 향상시킬 수 있습니다.
     
* 대안 --
standardizeWhat 옵션 중 하나는 주어진 dataset에 대한 문제를 해결하지 않는 경우 문제를 해결할 수 있습니다.[.ncml 파일](#ncml-files)모든 데이터 파일을 병렬로 설정하고 파일이 일관되게되는 파일에 대한 변경을 정의합니다. 그런 다음 EDDTableFrom를... 파일 dataset 을 집계.ncml 파일.
    
또는, 사용[NCO](#netcdf-operators-nco)실제로 파일을 변경하기 때문에 파일이 일관되게됩니다.
        
##### 년, 월, 일, 시간, 분, 초 동안 분리 된 열{#separate-columns-for-year-month-date-hour-minute-second} 
그것은 일년, 달, 날짜, 시간, 분, 초를 위한 분리되는 란이 있는 tabular 자료 파일을 위해 상당히 일반적입니다. 이전 다음ERDDAP™v2.10, 유일한 해결책은 지정된 시간 란으로 그 란을 결합하기 위하여 자료 파일을 편집하기 위하여 이었습니다. 이름 *ERDDAP™2.10+, 당신은 사용할 수 있습니다
[기타]&lt;sourceName&gt;= *이름 ** &lt;sourceName&gt;] (#출처) 이름 *ERDDAP™소스 열을 결합하는 방법은 통합 된 시간 열을 만들기 위해 더 이상 소스 파일을 편집 할 필요가 없습니다.
##### &lt;건너뛰기{#skipheadertoregex} 
* [기타]&lt;건너뛰기 (프로젝트) --
옵션. (EDDTableFromAsciiFiles 및 EDDTableFromColumnarAsciiFiles 데이터 세트 전용.)   
EDDTableFromAsciiFiles가 데이터 파일을 읽을 때, 이 정규 표현식과 일치하는 줄을 포함하여 모든 줄을 무시합니다. 기본값은 ""이며, 이 옵션을 사용하지 않습니다. 예제는
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
"로 시작하는 줄을 포함하여 모든 줄을 무시합니다.\\*\\*\\* 머리 끝.

이 태그를 사용할 때,&lt;columnNamesRow&gt;와&lt;firstDataRow&gt; 헤더가 파일이 읽기 전에 제거 된 것처럼 작동합니다. 예를 들어, 열 이름은 헤더 후에 행 오른쪽에 있는 경우 columnNamesRow=0을 사용한다.

사용하려는 경우 데이터셋 이 태그를 필요로 하는 dataset를 가진 Xml:

1. 기존 파일을 복사하고 헤더를 제거하여 새, 임시, 샘플 파일을 만듭니다.
2. 실행 생성 데이터셋 Xml는 샘플 파일을 지정합니다.
3. 수동으로 추가&lt;SkipHeaderToRegex&gt; 태그에datasets.xml펑크.
4. 임시, 샘플 파일 삭제.
5. dataset 사용ERDDAP·
##### &lt;건너뛰기{#skiplinesregex} 
옵션. (EDDTableFromAsciiFiles 및 EDDTableFromColumnarAsciiFiles 데이터 세트 전용.)   
EDDTableFromAsciiFiles가 데이터 파일을 읽을 때, 이 정규식과 일치하는 모든 줄을 무시합니다. 기본값은 ""이며, 이 옵션을 사용하지 않습니다. 예제는
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
"#"로 시작하는 모든 줄을 무시합니다.

이 태그를 사용할 때,&lt;columnNamesRow&gt;와&lt;firstDataRow&gt; 일치하는 선의 전부가 파일이 읽기 전에 제거된 것처럼 행동합니다. 예를 들어, 여러 줄이 있는 경우에도 columnNamesRow=0을 사용할 수 있습니다. 예를 들어, "#"는 파일의 시작 부분에 있습니다.
    
#### EDDTableFromFiles 스켈레톤 XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableAscii서비스{#eddtablefromasciiservice} 
[ **EDDTableAscii서비스** ](#eddtablefromasciiservice)스크린 스크레이퍼입니다. 데이터 요청을 위한 간단한 웹 서비스가 있는 데이터 소스를 처리하는 것이 목적입니다. (웹 페이지의 HTML 양식) 일부 구조 ASCII 형식의 데이터를 반환 할 수 (예를 들어, comma-separated-value 또는 Columnar ASCII 텍스트 형식, 종종 데이터 전에 다른 정보와 / 또는 데이터 후) ·

EDDTableFromAsciiService는 모든 EDDTableFromAsciiService의 최고 등급입니다. EDDTableFromAsciiService를 직접 사용할 수 없습니다. 대신 EDDTableFromAsciiService의 하위 클래스를 사용하여 특정 유형의 서비스를 처리하십시오.

*   [연락처](#eddtablefromasciiservicenos)데이터 가져오기NOAANOS의 ASCII 서비스.

현재 다른 서비스 유형은 지원되지 않습니다. 하지만 그것은 일반적으로 상대적으로 쉽게 다른 서비스를 지원 하는 경우 그들은 비슷한 방법으로 작동. 자주 묻는 질문

#### 이름 *{#details} 
다음 정보는 EDDTableFromAsciiService의 하위 클래스에 적용됩니다.

* 제약 --ERDDAP™tabular 데이터 요청은 변수에 제약을 넣을 수 있습니다. underlying 서비스는 또는 모든 변수에 제약을 허용할 수 없습니다. 예를 들면, 많은 서비스는 역 이름, 위도, 경도 및 시간에 단지 지원 constraints만. 따라서 EDDTableFromAsciiService의 하위 클래스가 데이터 세트의 하위 세트에 대한 요청을 얻을 때 소스 데이터 서비스에 가능한 한 많은 제약을 통과 한 다음 사용자가 데이터를 처리하기 전에 서비스로 반품 한 데이터에 남아있는 제약을 적용합니다.
* 유효한 범위 -- 다른 많은 dataset 유형과는 달리, EDDTableFromAsciiService는 보통 각 변하기 쉬운을 위한 자료의 범위를 알고 있지 않습니다, 그래서 유효한 범위의 외부 자료를 위한 빨리 거부할 수 없습니다.
* ASCII 텍스트 응답을 파 -- EDDTableFromAsciiService가 ASCII Text Service에서 응답을 얻을 때 응답이 예상되는 형식과 정보를 가지고 있으며 데이터를 추출해야합니다. XML의 펑크에 다양한 특수 태그를 사용하여 형식을 지정할 수 있습니다.
    *   &lt;전에Data1&gt;를 통해&lt;beforeData10&gt; 태그 -- 일련의 텍스트를 지정할 수 있습니다. (원하는 만큼, 최대 10) EDDTableFromAsciiService는 ASCII 텍스트의 헤더에 대해 확인해야 합니다.&lt;전에Data1&gt;를 통해&lt;이전Data10&gt;. 예를 들어, 응답이 예상되는 단위를 사용하여 예상된 변수를 포함하는 것으로 확인하는 것이 유용합니다. 마지막 beforeData 태그를 지정하면 데이터가 시작되기 전에 올바른 텍스트를 식별합니다.
    *   &lt;이후데이터&gt; -- 이것은 EDDTableFromAsciiService가 데이터의 끝을 표시하는 서비스에 의해 반환되는 ASCII 텍스트에서 볼 텍스트를 지정합니다.
    *   &lt;없음자료&gt; -- EDDTableFromAsciiService가 서비스에 의해 반환 된 ASCII 텍스트에이 텍스트를 발견하면 요청을 일치하는 데이터가 없다는 결론을 내립니다.
#### EDDTableFromAsciiService 스켈레톤 XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### 연락처{#eddtablefromasciiservicenos} 
[ **연락처** ](#eddtablefromasciiservicenos)ASCII 텍스트 데이터 서비스에서 EDDTable datasets를 만듭니다.NOAA이름 *[국립 해양 서비스 (이름 *) ](https://oceanservice.noaa.gov/)· 이 클래스의 작품과 사용법에 대한 정보는이 클래스의 수퍼 클래스를 참조하십시오.[EDDTableAscii서비스](#eddtablefromasciiservice)· Bob Simons 이외의 사람이이 하위 클래스를 사용해야합니다.

NOS 서비스의 응답 내에서 데이터가 열악한 ASCII 텍스트 형식을 사용하므로, 위도와 경도 이외의 데이터 변수는 각 데이터 라인의 문자가 변수의 데이터를 포함하도록 지정하는 특수 속성이 있어야 합니다. 예를 들어,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTable모든 데이터 세트{#eddtablefromalldatasets} 
[ **EDDTable모든 데이터 세트** ](#eddtablefromalldatasets)현재 로드된 다른 모든 데이터셋에 대한 정보가 있는 더 높은 수준의 데이터셋입니다.ERDDAP· datasets의 다른 유형과는 달리, 아무 명세도 없습니다allDatasets데이터 세트datasets.xml·ERDDAP™자동적으로 한 EDDTableFromAllDatasets dataset를 만듭니다 (이름 *datasetID= = =allDatasets) · 이태리allDatasetsdataset는 각각 생성될 것입니다ERDDAP™임명은 각에 있는 동일한 방법을 작동할 것입니다ERDDAP™설치.

더 보기allDatasetsdataset는 tabular dataset입니다. 각 dataset에 대한 정보의 행이 있습니다. 각 dataset, e.g에 대한 정보와 열을 가지고 있습니다.datasetID, 접근 가능한, 기관, 제목, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, 등. 이름 *allDatasetstabular dataset 이므로 다른 모든 tabular dataset 를 쿼리할 수 있습니다.ERDDAP™, 당신은 응답을 위한 파일 유형을 지정할 수 있습니다. 이것은 사용자가 매우 강력한 방법으로 관심의 데이터 세트를 검색합니다.
 
### EDDTableAsciiFiles에서{#eddtablefromasciifiles} 
[ **EDDTableAsciiFiles에서** ](#eddtablefromasciifiles)comma-, tab-, semicolon-, 또는 space-separated tabular ASCII 데이터 파일에서 데이터를 수집합니다.

* 가장 자주, 파일은 두 번째 행을 시작하는 첫 번째 행 및 데이터에 열 이름을 가질 것입니다. (여기, 파일의 첫 번째 행은 행 번호 1라고합니다.) 그러나 당신은 사용할 수 있습니다&lt;columnNamesRow&gt;와&lt;당신의 첫번째DataRow&gt;datasets.xml다른 행 번호를 지정하는 파일.
*   ERDDAP™데이터 값의 다른 숫자를 가지고 데이터의 행을 허용한다.ERDDAP™누락된 데이터 값이 행의 최종 열임을 가정합니다.ERDDAP™누락된 데이터 값의 표준 누락 값 값을 지정합니다. (추가 v1.56) 
* ASCII 파일은 쉽게 작동하지만 저장 / 검색 데이터에 가장 효율적인 방법이 아닙니다. 더 큰 효율성을 위해, 파일을 것과 같이 저장하십시오NetCDFv3의.nc파일 형식 (1개의 차원으로, "row", 모든 변수에 의해 공유) 대신. 당신은 할 수[제품 정보ERDDAP™새 파일을 생성하기](#millions-of-files)·
* 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. ASCII 파일에서 메타 데이터의 총 부족 때문에 항상 GenerateDatasetsXml의 결과를 편집해야합니다.
* 경고: 때ERDDAP™ASCII 데이터 파일을 읽으면 주어진 줄에 오류가 발견됩니다. (e.g., 항목의 잘못된 수) , 그것은 경고 메시지를 기록 ("WARNING : 배선 (₢ 킹) data" ... 후속 선의 목록으로) 으로[log.txt 파일](/docs/server-admin/additional-information#log)그런 다음 데이터 파일의 나머지를 읽을 수 있습니다. 그러므로, 그것은 당신의 책임은 주기적으로 보입니다 (또는 스크립트를 작성하여) 로그에 그 메시지. txt 그래서 당신은 데이터 파일에 문제가 해결 할 수 있습니다.ERDDAP™이 방법을 설정하므로 사용자는 파일의 일부 줄이 결함이있는 경우에도 사용 가능한 모든 데이터를 읽을 수 있습니다.
     
### EDDTable에서 AwsXml파일{#eddtablefromawsxmlfiles} 
[ **EDDTable에서 AwsXml파일** ](#eddtablefromawsxmlfiles)자동 기상역 세트에서 데이터 수집 (사이트맵) WeatherBug Rest XML API를 사용하여 XML 데이터 파일 (더 이상 활성화되지 않습니다) ·

* 이 유형의 파일은 데이터를 저장하는 단순하지만 효율적인 방법이며, 각 파일이 보통 한 번의 시점에서 관측을 포함하기 때문입니다. 그래서 많은 파일이있을 수 있습니다. 성능 향상을 원한다면, 관찰 그룹을 통합 고려 (일주일의 가치?) 내 계정NetCDFv3의.nc파일 형식 (제품 정보:.nc파일 첨부[사이트맵 분리된 표본 추출 Geometries (사이트맵) Contiguous Ragged 배열 체재](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) 이름 *[EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)  (또는[EDDTableNcCFFiles에서](#eddtablefromnccffiles)) 데이터 제공 당신은 할 수[제품 정보ERDDAP™새 파일을 생성하기](#millions-of-files)·
* 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.
     
### EDDTableColumnarAsciiFiles에서{#eddtablefromcolumnarasciifiles} 
[ **EDDTableColumnarAsciiFiles에서** ](#eddtablefromcolumnarasciifiles)고정폭 열을 가진 tabular ASCII 데이터 파일에서 데이터를 집계합니다.

* 가장 자주, 파일은 두 번째 행을 시작하는 첫 번째 행 및 데이터에 열 이름을 가질 것입니다. 파일의 첫 번째 줄 / 줄은 행 #1라고합니다. 그러나 당신은 사용할 수 있습니다&lt;columnNamesRow&gt;와&lt;당신의 첫번째DataRow&gt;datasets.xml다른 행 번호를 지정하는 파일.
* 더 보기&lt;addAttributes&gt; 각별&lt;dataVariable&gt; 이 datasets MUST에는 이 2개의 특별한 특성이 있습니다:
    
    *   &lt;att name="startColumn"&gt; *뚱 베어* &lt;att&gt; -- 이 데이터 변수의 시작인 각 줄의 문자 열을 지정합니다.
    *   &lt;att name="stopColumn"&gt; *뚱 베어* &lt;att&gt; -- 이 데이터 변수의 끝 후에 1인 각 줄의 문자 열을 지정합니다.
    
첫번째 문자 열은 열 #0이라고 불립니다.
예를 들어, 이 파일에는 시간 값이 abutting 온도 값이 있습니다.
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
time data 변수는
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
그리고 시간 데이터 변수는
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
이 속성은 제외한 모든 변수에 지정됩니다.[고정값](#fixed-value-sourcenames)이름 *[파일명-source-name](#filename-sourcenames)변수.
* ASCII 파일은 작업이 용이하지만 저장 / 검색 데이터에 효율적인 방법이 아닙니다. 더 큰 효율성을 위해, 파일을 것과 같이 저장하십시오NetCDFv3의.nc파일 형식 (1개의 차원으로, "row", 모든 변수에 의해 공유) 대신. 당신은 할 수[제품 정보ERDDAP™새 파일을 생성하기](#millions-of-files)·
* 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 각 데이터 열의 시작과 끝 위치를 결정하는 어려움 때문에 ASCII 파일에서 메타 데이터의 총 부족, 당신은 항상 GenerateDatasetsXml에서 결과를 편집해야합니다.
     
### 다운로드{#eddtablefromhttpget} 
연락처 FromHttpGet는 다른 모든 데이터셋과 다릅니다.ERDDAP™특정 "authors"가 데이터를 추가 할 수있는 시스템이있는 경우, 데이터를 수정하거나 일반 데이터 세트에서 데이터를 삭제HTTP GET또는[사이트맵](#http-post)컴퓨터 프로그램, 스크립트 또는 브라우저에서 요청. dataset는 다른 모든 EDDTable datasets가 쿼리 할 수있는 동일한 방법으로 사용자에 의해 쿼리됩니다ERDDAP· 이 클래스의 수퍼 클래스의 설명을 참조,[EDDTable파일](#eddtablefromfiles), 그 superclass에서 상속되는 기능에 대해 읽으십시오.

EDDTableFromHttpGet의 독특한 특징은 아래와 같습니다. 당신은이 초기 섹션의 모든 것을 읽고 이해해야합니다; 그렇지 않으면, 당신은 현실적인 기대가 있거나 해결하기 어려운 문제로 자신을 얻을 수 있습니다.

#### 연락처{#intended-use} 
이 시스템은:

* 기타 제품 (에 situ) 데이터, Gridded 데이터.
* 실시간 데이터 -
목표는 저자를 허용하는 것입니다. (e.g., 센서, 자동화된 QC 스크립트, 또는 특정 인간) dataset로 변경하기 (한국어[.insert 또는 .delete 명령](#insert-and-delete)) 그리고 그 변화는ERDDAP™사용자, 모두 1 초 미만, 아마도 훨씬 빨리. 그 1 초의 대부분은 네트워크 시간입니다.ERDDAP™약 1m의 요청을 처리 할 수 있으며 데이터는 사용자에게 즉시 액세스 할 수 있습니다. 이것은[빠른 속도](#httpget-speed)·[사이트맵](#robust)·[믿을 수 있는 체계](#system-reliability)·
* 데이터의 거의 모든 주파수 -
이 시스템은 잘못된 데이터를 받아들일 수 있습니다. (예, 일) 매우 빈번한 자료를 통해 (e.g., 100 Hz 자료) · 시스템을 최적화하면 고주파 데이터를 처리 할 수 있습니다. (극단적으로 가면 아마 10 KHz 자료) ·
* 1개의 감지기 또는 유사한 감지기의 수집에서 자료.
*   [관련 기사](#versioning)/ 한국어[교육 과학](https://en.wikipedia.org/wiki/Reproducibility)/ 한국어DOI₢ 킹
데이터를 변경할 수 있는 상황 (e.g. 품질 관리 플래그 변경) , 저자가 각 변화를 만든 것을 알고, 저자가 변경을 만들 때 타임스탬프를 알고, (요청시) 변경 전에 원본 데이터를 볼 수 있습니다. 따라서 이러한 데이터 세트는 자격이 있습니다.[DOI₢ 킹](https://en.wikipedia.org/wiki/Digital_object_identifier)· 그들이 만나기 때문에DOIdataset가 통하지 않는 요구 사항, 집계를 제외하고. 일반적으로 실시간 데이터셋에 대한 자격이 없습니다.DOI데이터가 종종 retroactively 변경되기 때문에 s (e.g., QA/QC 목적을 위해) ·
     

일단 데이터가 EDDTableFromHttpGet 데이터 세트에 있으면 다른 EDDTable 데이터 세트에서 데이터를 요청하는 것과 같은 방식으로 데이터를 요청할 수 있습니다.
     
#### 실험: 감사합니다.{#experimental-be-careful} 
이 시스템은 새로운 잃어버린 환경 데이터가 reacquired 할 수 없기 때문에, 당신은 EDDTableFromHttpGet 실험으로 치료해야합니다. 다른 시스템에서 전환하는 경우, 오래된 시스템을 실행하고 새로운 시스템이 잘 작동하는 것을 확신 할 때까지 병렬의 새로운 시스템 (주 또는 달, 다만 시간 또는 일 아닙니다) · 모든 경우 EDDTableFromHttpGet 데이터셋에 전송되는 .insert 및 .delete URL을 별도로 보관하여 주십시오. (아파치 및/또는 Tomcat 로그에 있는 경우에도) , 적어도 동안. 그리고 모든 경우에, 당신의 EDDTableFromHttpGet dataset에 의해 창조된 자료 파일이 일상적으로 외부 자료 저장 장치에 백업된다는 것을 확인하십시오. (이름 *[rsync의](https://en.wikipedia.org/wiki/Rsync). EDDTableFromHttpGet 매우 효율적으로 만든 데이터 파일을 백업할 수 있습니다.)   
     
#### .insert와 .delete{#insert-and-delete} 

어떤 dataset를 위해ERDDAP™, 당신이 요청에 보낼 때ERDDAP™dataset에 있는 자료의 subset를 위해, 당신은 응답을 원하는 파일 유형을 지정합니다, 예를들면, .csv,.htmlTable·.nc·.json· EDDTableHttp에서 삽입 할 수있는 두 개의 추가 "파일 유형"을 지원하는이 시스템을 확장 (또는 변경) 또는 dataset의 데이터를 삭제:

* 사이트맵
    * 요청은 '&'에 의해 분리된 key=value 쌍과 더불어 표준 HTML 형태 응답과 같이 형식화됩니다. 예를 들어,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
이름 *ERDDAP™데이터 추가 또는 변경stationID지정된 시간에 =46088.
    * 이 변화의 저자는 JohnSmith이고 열쇠는 someKey1입니다.
    * URL은 유효한 값을 포함해야 합니다. (누락된 값) 모든 것[http자주 묻는 질문](#httpgetrequiredvariables-global-attribute)
    * 값이 있는 경우http자주 묻는 질문 요청의 변수 (₢ 킹stationID그리고 시간) dataset에서 열에 대한 값을 일치, 새로운 값은 효과적으로 오래된 값을 덮어 (이전 값이 여전히 이전의 사용자 요청 데이터에 접근하는 경우[이름 *](#versioning)dataset의) ·
    * .insert URL은 &timestamp=를 포함하지 않아야 합니다. (ERDDAP™그 값 생성) 또는 &command= (그것은 .insert에 의해 지정됩니다 (명령어=0) 또는 .delete (명령어 = 1개) ) ·
    * .insert URL이 dataset에 있는 다른 열에 대한 값을 지정하지 않는 경우, 그들은 네이티브 누락 값이어야 한다. (MAX\\_VALUE for integer data types, NaN for floats and doubles, and "" 문자열) ·
             
    * · .delete
        * 요청은 '&'에 의해 분리된 key=value 쌍과 더불어 표준 HTML 형태 응답과 같이 형식화됩니다. 예를 들어,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
이름 *ERDDAP™데이터 삭제stationID지정된 시간에 =46088.
        * 이 변화의 저자는 JohnSmith이고 열쇠는 someKey1입니다.
        * URL을 지정해야 합니다.[http자주 묻는 질문](#httpgetrequiredvariables-global-attribute)자주 묻는 질문 (₢ 킹stationID그리고 시간) · 그 값이 dataset에서 행에 이미 일치하면 (그들은 일반적으로) , 오래된 값은 효과적으로 삭제됩니다 (이전 값이 여전히 이전의 사용자 요청 데이터에 접근하는 경우[이름 *](#versioning)dataset의) ·
        * non-HttpGetRequiredVariables에 대한 값을 지정할 필요가 없습니다.
             
    
상세 정보:
    * .insert 및 .delete 요청은 '&'에 의해 분리된 key=value 쌍과 표준 HTML 형태 응답과 같이 형식됩니다. 값은[% 인코딩](https://en.wikipedia.org/wiki/Percent-encoding)· 따라서 HH가 문자의 2 자리 6 진수 값 인 형식 %HH로 특수 문자를 인코딩해야합니다. 보통, 당신은 단지 몇 가지의 구두 문자를 변환해야합니다: %25 %, & %26, "%22,&lt;%3C로, = %3D로, &gt; %3E로, + %2B로,|%7C로,\\[%5B로,\\]%5D로, %20로 공간, #127 이상의 모든 문자를 UTF-8 양식으로 변환하고 UTF-8 양식의 각 바이트를 %H 형식으로 인코딩합니다. (도움을위한 프로그래머에게 물어보십시오) ·
    * .insert 및 .delete 요청은 포함해야 합니다.[http자주 묻는 질문](#httpgetrequiredvariables-global-attribute), 예를들면stationID그리고 시간. .insert 요청의 경우 요청에 지정되지 않은 변수는 누락된 값으로 가정됩니다. (integer 변수에 대한 MAX\\_VALUE, float 및 더블 변수의 NaN, 문자열 변수의 빈 문자열) · .delete 요청의 경우, non-HttpGetRequired의 값 변수 (다른 저자보다, 필요한) 무시.
    * .insert 및 .delete 요청은 저자의 이름을 포함해야하며 저자의 키 양식 작성자의 매개 변수를 통해 = *저자\\_key* 요청의 마지막 매개 변수로. 마지막으로이 요구는 전체 요청이 수신 한 것을 보장ERDDAP· 저자만 (키가 없다) 데이터 파일에 저장됩니다. 허용된 목록을 지정해야 합니다. *저자\\_key* 글로벌 속성을 통해[http다운로드](#httpgetkeys)
    * .insert와 .delete 모수는 사기일지도 모릅니다 (한국어) 모든 길이의 값 또는 배열\\[value1,value2,value3, ..., 값\\]· 주어진 요청의 경우, 배열과 모든 변수는 같은 값으로 배열해야 합니다. (다른 그것은 오류) · 요청이 scalar 및 array 값이 있는 경우, scalar 값은 지정된 배열과 같은 길이로 배열될 수 있습니다. 예를 들어, &stationID=46088 처리 될 수 있습니다 &stationID= = =\\[46088,46088,46088호\\]· 배열은 열쇠입니다[높은 처리량](#httpget-speed)· 배열 없이, 그것은 .insert 또는 .delete 원격 저자에서 초당 자료의 8개 이상 줄에 도전할 것입니다 (네트워크의 모든 오버헤드 때문에) · 배열으로, 그것은 .insert 또는 .delete에 원격 센서에서 초당 자료의 1000 이상 줄이 더 쉽습니다.
    * .insert와 .delete는 받아들입니다 (오류 메시지 없이) 정수가 예상될 때 부동점 번호. 이 경우, dataset는 정수에 값을 매깁니다.
    * .insert와 .delete는 받아들입니다 (오류 메시지 없이) integer 및 플로팅 포인트 번호는 변수의 데이터 유형의 아웃 범위입니다. 이 경우, dataset는 값들을 저장합니다.ERDDAP그 데이터 유형의 기본 누락 값 (MAX\\_VALUE integer 유형과 NaN에 대한 플로트와 더블) ·
         
#### 관련 기사{#response} 
.insert 또는 .delete URL이 성공하면 HTTP 응답 코드는 200 일 것입니다. (이름 *) 그리고 응답은 텍스트가 될 것입니다..json객체, 예를 들어,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
타임스탬프에는 밀리 초 정밀도가 있습니다.

.insert 또는 .delete URL이 실패하면 200 개 이상의 HTTP 응답 코드를 얻을 수 있습니다. (이름 *) , 예를들면, 오류 403 incorrect author\\_key 값을 제출하면 Forbidden.ERDDAP™HTTP 응답 코드를 보냅니다 (아니, 예, a.json파일 형식) 인터넷에서 어떻게 수행되고 오류가 시스템에서 어디에서 발생할 수 있기 때문에 (e.g., 네트워크에서 HTTP 오류를 반환) · 오류가 발생하면ERDDAP™, 응답은 몇몇 원본을 포함할지도 모릅니다 (아니다..json) 무엇이 잘못되었는지 더 상세한 설명과 더불어, 그러나 HTTP 응답 부호 (200=Okay, 다른 사람은 말썽입니다) .insert 또는 .delete가 성공했는지 확인하는 적절한 방법입니다. HTTP 응답 코드를 확인하거나 불편하지 않는 경우, 응답 텍스트에서 "status":"success"를 검색하여 성공의 신뢰할 수있는 표시가되어야합니다.
    
#### 로그 파일{#log-files} 
EDDTableFromHttpGet이 .insert 및 .delete 명령을 받으면 로그 파일 세트에 관련된 파일에 대한 정보를 간단히 추가합니다.[구글 맵 라인 CSV 파일](https://jsonlines.org/examples/)· 사용자가 데이터를 요청할 때,ERDDAP™빠른 관련 로그 파일을 읽고, 그들이 만든 순서에 dataset의 변경을 적용, 다음 사용자의 제약을 통해 요청을 필터링ERDDAP™데이터 요청. 다양한 로그 파일로 데이터의 파티션, 다양한 정보의 저장 (예, 명령의 타임스탬프, 명령이 .insert 또는 .delete인지 여부) , 그리고 dataset의 설치의 각종 양상은, 모두 그것을 위해 가능하게 합니다ERDDAP이 dataset에서 데이터를 저장하고 데이터를 매우 빠르고 효율적으로 관리합니다.
     
#### 보안 및 저자{#security-and-author} 
.insert와 .delete 명령은 &author=를 포함해야 합니다. *저자\\_key* 마지막 매개 변수로, 저자\\_key가 저자의 식별자로 구성 (당신은 선택: 이름, 처음, pseudonym, 번호) , underscore 및 비밀 열쇠. 더 보기ERDDAP™관리자는 언제든지 변경할 수 있는 유효한 author\\_key 값 목록을 생성하기 위해 저자와 함께 작동합니다.
EDDTableFromHttpGet가 .insert 또는 .delete 명령을 받으면, 마지막 매개 변수와 유효하다는 것을 확인합니다. 마지막 매개 변수이기 때문에 전체 명령 줄이 도달 한 것을 나타냅니다.ERDDAP™그리고 truncated. 비밀 키는 특정 저자만 데이터셋에 데이터를 삽입하거나 삭제할 수 있다는 것을 보증합니다.ERDDAP™그런 다음 authorID를 추출하고 저자 변수에 저장합니다. 누군가가 dataset에 주어진 변경에 대해 책임을 볼 수 있습니다.
.insert 및 .delete 명령은 를 통해만 만들 수 있습니다.https:  (제품정보)  ERDDAP™URL. 이 정보는 전송 중에 비밀을 유지한다는 것을 보증합니다.
     
#### 타임 스탬프{#timestamp} 
로그 시스템의 일부로서, EDDTableFromHttpGet adds a timestamp (그 시간ERDDAP자주 묻는 질문) 로그 파일에 저장하는 각 명령에. 이름 *ERDDAP™Timetamp를 생성, 저자가 아닌, 다른 저자가 약간 다른 시간에 설정 시계와 컴퓨터에서 변경을 만드는 경우 중요하지 않습니다. timetamp reliably는 변경이 dataset에 만들 때 시간을 나타냅니다.
     
#### HTTP 메시지{#http-post} 
*   ["HTTP POST란?&#33;"](#http-post)  
HTTP를[사이트맵](https://en.wikipedia.org/wiki/POST_(HTTP))는 더 나은 대안입니다 (관련 기사HTTP GET) 클라이언트에서 HTTP 서버로 정보를 전송합니다. 보안을 개선하려는 경우, 정보를 보내려면 GET 대신 POST를 사용하십시오.ERDDAP· POST는 더 안전하기 때문에: GET과https, URL은 안전한 방법으로 전송되지만 전체 URL (author\\_key를 포함한 매개변수) 아파치, 톰캣, 그리고ERDDAP™로그 파일, 누군가가 파일을 제대로 보안하지 않은 경우 그들을 읽을 수 있습니다. POST로, 매개 변수는 안전한 방법으로 전송되며 로그 파일에 기록되지 않습니다. POST는 클라이언트를 위한 작은 더 열심히 일하고 클라이언트 소프트웨어에 의해 넓게 지원되지 않습니다, 그러나 프로그램 언어는 그것을 지원합니다. GET 또는 POST를 통해 dataset에 보낼 콘텐츠는 다른 방법으로 포맷됩니다.
     
#### http자주 묻는 질문 변수 Global Attribute{#httpgetrequiredvariables-global-attribute} 
이 전체 시스템 작업이 필요한 글로벌 속성을 만드는 근본적인 부분http자주 묻는 질문 변수, 이는 comma-separated 목록의dataVariable고유하게 데이터의 행을 식별하는 소스 이름. 이것은 가능한 최소한이어야하며 거의 항상 시간 변수를 포함합니다. 예를 들어, 여기에 권장됩니다http자주 묻는 질문 각각의 변수[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (물론, ID 이름은 당신의 dataset에서 다를 수 있습니다.) ::

* TimeSeries의 경우:stationID, 시간
* Trajectory를 위해: trajectoryID의 시간
* 단면도를 위해: 시간 (assuming 시간 이다 profile\\_id) , 깊이
* TimeSeries에 대해 단면도:stationID, 시간 (assuming 시간 이다 profile\\_id) , 깊이
* Trajectory를 위해 프로필: trajectoryID, 시간 (assuming 시간 이다 profile\\_id) , 깊이

    
TimeSeries를 예로 가져 오기 :
포함 된 .insert 명령을 주기stationID=46088 과 time=2016-06-23T19:53:00Z (다른 변수의 다른 값) ::
* 그 역과 그 시간에 대한 기존 데이터가 없다면, 그 효과는 dataset에 데이터를 추가 할 것입니다.
* 그 역과 그 시간 동안 기존의 데이터가 있는 경우, 이 새로운 데이터로 기존의 데이터를 대체할 수 있습니다. (물론, 이후ERDDAP™모든 명령의 로그를 유지하면 오래된 데이터가 여전히 로그에 있습니다. 이 변경 전에 dataset의 버전에서 사용자 요청 데이터가 있으면 이전 데이터를 볼 수 있습니다.)   
         
#### httpGetDirectoryStructure의 장점{#httpgetdirectorystructure} 
*   [http다운로드 구조 글로벌 특성 및 데이터 (로그인) 파일 이름](#httpgetdirectorystructure)  
이 전체적인 시스템 작업을 효율적으로 만드는 것은ERDDAP™데이터 세트 (이름 *) 파일, dataset의 다른 펑크로 각각. 이것을 잘 설정하면ERDDAP™데이터에 대한 대부분의 요청에 신속하게 대응할 수 있습니다. 이 설정은 지정된httpGetDirectoryStructure 글로벌 속성은 상대적인 파일명, 예를들면, "stationID/10years", 그러나 실제로 디렉토리 구조를 위한 명세입니다. 데이터의 디렉토리 및 파일 이름을 나타내는 부분 (이름 *) 파일이 건설될 것입니다.
    
    * 부분이 정수인 경우 (&gt;= 1개) 더 많은 시간Period (밀리 초, 초, 분, 시간, 날짜, 월, 년, 또는 그들의 복수) , 예를 들면, 10years, 그 후에 EDDTableFromHttpGet dataset는 자료의 줄을 위한 시간 가치를 가지고 갈 것입니다 (2016-06-23T19:53:00) , 그 정밀도에 truncated 시간을 산출하십시오 (2010년) , 그리고 그에서 폴더 또는 fileName를 만들.
        
목표는 각 파일에 데이터의 합리적인 큰 펑크를 얻는 것이지만 2GB 미만입니다.
        
    * 그렇지 않으면, 명세의 부분은 있어야 합니다dataVariable이름 *sourceName, 예를들면stationID· 이 경우, EDDTableFromHttpGet는 데이터의 새로운 행에 대한 그 변수의 값에서 폴더 또는 파일 이름을 만들 것입니다 (예, "46088") ·
    
.insert 및 .delete 명령 데이터가 특정 데이터에 저장되기 때문에 (이름 *) 파일, EDDTableFromHttpGet는 보통 하나 또는 몇몇 자료를 여는 필요 (이름 *) 주어진 사용자 요청에 대한 데이터를 찾을 수 있습니다. 그리고 각 자료 때문에 (이름 *) 파일에는 dataset의 펑크에 대한 모든 관련 정보가 있습니다, 그것은 빠르고 쉽게 EDDTableFromHttpGet 특정 버전을 만들기 위해 (또는 현재 버전) 그 파일에 대한 데이터 세트의 (전체 dataset의 요청된 버전을 생성하지 않아도) ·
    
일반 지침은 데이터의 수량 및 주파수에 근거합니다. 우리는 데이터의 행당 100 바이트를 가정하면 ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
예를 들어, 디렉토리 구조가 있다면stationID/2months와 당신은 2개의 역에서 자료를 삽입합니다 (46088 과 46155) 12월 2015일부터 5월 2016일까지의 시간값으로, EDDTableFromHttp 46088과 46155라는 디렉터리를 작성하고 각 이름의 파일을 만들 것입니다 2015-11.json2016년.json2016년.json2016년.json₢ 킹 (각 보유 관련 역에 대한 데이터의 2 개월의 가치) · 미래에 언제든지 .insert 또는 .delete을 사용하여 변경하거나 삭제하는 경우, 예를 들어, 2016-04-05T14:45:00Z, EDDTableFromHttp에서 46088 46088/2016-03에 명령을 추가합니다..jsonl, 관련 자료 (이름 *) 파일. 그리고 명확하게, 그것은 미래에 다른 역에 대한 데이터를 추가하는 것이 좋습니다, dataset는 단순히 새로운 역에서 데이터를 보유하기 위해 필요한대로 추가 감독을 만들 것입니다.
    
#### http다운로드{#httpgetkeys} 
모든 EDDTable 에서Http dataset가 글로벌 속성을 가지고 있어야 합니다.http허용 된 저자 및 비밀 키의 목록을 지정하는 GetKeys는 comma-separated 목록으로 *저자\\_key* , 예를들면 JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* author\\_key's are case-sensitive and must be totally ASCII 문자 (#33 - #126, 그리고 어떤 comma 없이, " 또는 ' 문자
* 키는 암호처럼, 그래서 그들은 &gt;=8 문자, 추측하기 어렵다, 내부 사전 단어없이. 당신은 암호를 치료해야 -- 그들을 개인 유지.
* 첫번째 '\\_' 문자는 키에서 저자를 분리하므로 저자 이름은 '\\_' 캐릭터를 포함 할 수 없습니다. (그러나 열쇠는 할 수 있습니다) ·
* 주어진 저자는 하나 또는 더 많은 저자가 있을 수 있습니다_key's, 예를들면, JohnSmith\\_some Key1, 존스미스\\_some Key7 등
* 이 속성의 값을 언제든지 변경할 수 있습니다. 변경은 dataset이 로드된 다음 시간이 걸립니다.
* 이 정보는 공개되기 전에 dataset의 globalAttributes에서 제거됩니다.
* Dataset에 각 요청을 삽입하거나 삭제하려면 &author= *저자\\_key* 모수. 키의 유효성을 확인한 후,ERDDAP™단지 저자 부분을 저장 (키가 없다) 데이터 파일에서.

#### 설정하기{#set-up} 

여기 EDDTableFromHttpGet 데이터 세트를 설정하는 권장 단계입니다.

1. 이 dataset의 데이터를 파악하기 위한 주요 디렉토리를 만듭니다. 이 예제의 경우, use /data/testGet/ . 사용자 실행 GenerateDatasetsXml 및 사용자 실행ERDDAP™이 디렉토리에 읽을 수 있습니다.
     
2. 텍스트 편집기를 사용하여 샘플을 만들기.jsonl CSV 파일 확장.jsonl 그 디렉토리.
이름은 중요하지 않습니다. 예를 들어, 샘플을 호출 할 수 있습니다..json₢ 킹
2라인.jsonl CSV 파일, 첫 번째 라인 및 dummy/typical 값의 열 이름 (정확한 데이터 유형의) 두번째 선에. 여기에 샘플 파일은 수집에 적합featureType공기와 수온을 측정하는 =TimeSeries 데이터.
    \\[제품 정보featureType=Trajectory, 당신은 변경할 수 있습니다stationIDtrajectoryID이기 위하여.\\]  
    \\[제품 정보featureType=Profile을 변경할 수 있습니다.stationIDprofileID가 되고 깊이 변수를 추가합니다.\\]
    
    \\[·stationID","time", "latitude", "longitude", "airTemp", "waterTemp", "timestamp", "author", "command"\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0\\]
    
참고 :
    * 실제 데이터 값은 결국이 파일을 삭제하기 때문에 중요하지 않지만 올바른 데이터 유형이어야합니다. Notably, 시간 변수는 소스에서 실제 데이터가 사용되도록 동일한 형식을 사용한다.
    * 모든 변수의 경우,sourceName같은 것destinationName, 그래서 현재 올바른 /final 변수 이름을 사용, 시간, 위도, 경도 및 때때로 깊이 또는 그 정보와 변수가 포함되는 경우 고도.
    * 거의 항상 관측 시간을 기록하는 변수가 될 것입니다. dataType String이 될 수 있습니다.[문자열 시간에 적합 한 단위](#string-time-units)  (₢ 킹yyyy-MM-dd'T'HH:mm:ss.SSSZ) 또는 자료 유형 두 배로[숫자 시간에 적합 한 단위](#time-units)  (예, 1970-01-01T00:00:00Z 이후 초, 또는 다른 기본 시간) ·
    * 열의 3 (일반적으로 마지막 3) 타임스탬프, 저자, 명령이어야 합니다.
    * 타임스탬프 컬럼은 EDDTableFromHttpGet에 의해 데이터 파일에 주어진 줄을 추가 할 때 타임스탬프를 추가합니다. 그것에는 1970-01-01T00:00:00Z부터 dataType 두 배 그리고 단위 초가 있을 것입니다.
    * dataType String을 가진 저자 열은 이 선의 데이터를 제공한 허가한 저자를 기록하기 위하여 사용될 것입니다. 승인 된 저자는 지정됩니다.[httpGetKeys 글로벌 속성](#httpgetkeys)· 키가 지정되었지만 *저자\\_key* 이 양식의 "request" URL에, 저자는 데이터 파일에 저장됩니다.
    * dataType byte를 가진 명령 열은 이 선에 자료가 인 경우에 나타냅니다 (0 댓글) 또는 삭제 (1개) ·
         
3. 실행 GenerateDatasets Xml와 그것을 말해
    
    1. dataset 유형은 EDDTableFromHttpGet입니다.
    2. 디렉토리는 (이 예제) /데이터/테스트 지원하다
    3. 표본 파일은 입니다 (이 예제) /data/testGet/스타트업.json₢ 킹
    4. 더 보기http자주 묻는 질문 변수는 (이 예제)  stationID, 시간 자주 묻는 질문[http자주 묻는 질문](#httpgetrequiredvariables-global-attribute)아래.
    5. 데이터가 매 5 분마다 수집되면httpGetDirectoryStructure 이 예제는stationID/2개월 자주 묻는 질문[httpGetDirectoryStructure의 장점](#httpgetdirectorystructure)아래.
    6. 더 보기[http다운로드](#httpgetkeys)
    
출력 추가 (펑크의datasets.xmldataset에 대한) 이름 *datasets.xml·
     
4. 수정하기datasets.xml이 dataset에 대한 펑크가 정확하고 완료합니다.
확실히, 모든 교체 ??? 정확한 내용.
     
5. 제품정보&lt;fileTableInMemory&gt; 설정:
    * dataset가 보통 빈번한 .insert 및/또는 .delete 요청을 얻는 경우에 이것을 true로 설정하십시오 (e.g,. 한 번 이상 10 초) · EDDTableFromHttpGet는 .insert 및/또는 .delete 요청으로 빠른 응답을 돕습니다. true로 설정한 경우, EDDTableFromHttpGet는 여전히 디스크에 fileTable 및 관련 정보를 저장합니다. (필요에 따라 약 5 초) ·
    * false로 설정 (기본값) dataset가 보통 infrequent .insert 및/또는 .delete 요청을 얻을 경우 (e.g., 매 10 초 미만) ·
         
6. 참고 : 이용 가능&lt;cacheFromUrl&gt; 및 관련 설정datasets.xmlEDDTable를 위해 에서Http datasets를 만들기 위한 방법으로 가져오기 및 원격 EDDTableFromHttpGet dataset의 로컬 복사를 유지ERDDAP· 그러나이 경우,이 로컬 데이터 세트는 .insert 및 .delete 요청을 거부합니다.

#### EDDTable 사용 FromHttpGet 데이터 세트{#using-eddtablefromhttpget-datasets} 

* 저자는 "requests"를 만들 수 있습니다.[dataset에서 데이터를 삽입하거나 삭제](#insert-and-delete)·
     
* 실제 데이터가 dataset에 삽입 된 후, 원본 샘플 데이터 파일을 삭제할 수 있습니다.
     
* 사용자는 dataset에서 다른 모든 EDDTable dataset를 위해 할 수 있습니다ERDDAP· 요청이 타임스탬프 열에 제약을 포함하지 않으면 요청은 dataset의 현재 버전에서 데이터를 가져옵니다 (삽입 및 삭제 명령의 모든 처리 후 로그 파일 및 재 정렬http자주 묻는 질문) ·
     
* 사용자는 EDDTableFromHttpGet datasets에 특정한 요청을 만들 수 있습니다:
    * 요청이 포함되면&lt;또는&lt;타임스탬프 열의 제약, 그 후ERDDAP™지정된 타임스탬프까지 로그 파일의 행을 처리한다. 효력에서, 이 일시적으로 그 타임스탬프 값 때문에 dataset에 만들어진 변화 전부를 삭제합니다. 더 많은 정보를 원하시면,[관련 기사](#versioning)·
    * 요청이 포함되면 &gt;, &gt;=, 또는 타임탬프 열의 제약, 예를 들어, &timestamp&lt;=0, 다음ERDDAP™삽입 및 삭제 명령을 처리하지 않고 데이터 파일에서 데이터를 반환합니다.
* 미래에, 우리는 도구가 내장 될 것을 감독 (우리? 너?) 이 datasets와 일하기를 위해. 예를 들어, 원시 로그 파일을 읽을 수있는 스크립트가 될 수 있으며 다른 교정 방정식을 적용하고 파생 된 정보와 다른 dataset을 생성 / 업데이트 할 수 있습니다. 스크립트가 요청을 통해 원본 데이터를 얻을 수 있음을 주의하십시오.ERDDAP™  (을 얻 data 에 the file format which is easiest 용 the script 에 작업 와) .insert "requests"를 통해 새 데이터셋 생성ERDDAP· 스크립트는 데이터 파일에 직접 액세스가 필요하지 않습니다. 그것은 공인 된 저자의 컴퓨터에있을 수 있습니다.
     

#### EDDTableFromHttpGet에 대한 자세한 정보{#detailed-information-about-eddtablefromhttpget} 

주제는:

*   [DON'T 설정 변경&#33;](#dont-change-the-setup)
*   [프로젝트](#crud)
*   [잘못된Requests](#invalidrequests)
*   [제품 정보](#httpget-speed)
*   [뚱 베어](#robust)
*   [시스템 신뢰성](#system-reliability)
*   [관련 기사](#versioning)
*   ["HTTP PUT 및 DELETE는 무엇입니까?&#33;"](#https-put-and-delete)
*   [지원하다](#httpget-notes)
*   [기본 아이디어에 대한 CHORDS 덕분에.](#thanks)

상세 정보:

##### DON'T 설정 변경&#33;{#dont-change-the-setup} 
dataset이 생성되면 데이터가 추가되었습니다.

* DON'T 추가 또는 제거dataVariable₢ 킹
* DON'T는 변화합니다sourceName또는destinationName이름 *dataVariable₢ 킹
* DON'T 데이터 변경 유형의dataVariable₢ 킹 그러나 당신은 바꿀 수 있습니다dataVariable메타데이터
* DON'T는 변화합니다http자주 묻는 질문 변수 글로벌 속성.
* DON'T는 변화합니다httpGetDirectoryStructure 글로벌 속성.

이러한 것들을 바꾸려면 새 데이터셋을 만들고 새로운 데이터셋을 전송하십시오.
     
##### 프로젝트{#crud} 
컴퓨터 과학에서 dataset 작업을위한 4 가지 기본 명령은[카테고리 (프로젝트) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)· SQL, 관계 데이터베이스와 작업을위한 언어는 INSERT, SELECT, UPDATE 및 DELETE와 동일합니다. 에 EDDTableFromHttpGet,

* .insert는 CREATE와 UPDATE의 조합입니다.
* .delete는 DELETE입니다.
* 데이터의 하위 설정을 요청하는 일반 시스템은 READ입니다.

따라서, EDDTableFromHttpGet는 dataset와 함께 작업하기위한 기본 명령의 모든 것을 지원합니다.
     
* 오류가 없는 .insert 또는 .delete 요청은 HTTP 상태 code=200 및 JSON 객체, 예를 들어,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
두 배의 타임스탬프 값은 삽입되거나 삭제 된 데이터의 행에 대한 타임스탬프 변수에 저장되는 밀리 초입니다.ERDDAP™이 키 값 쌍의 이름을 변경하지 않을 것입니다.ERDDAP™향후 JSON 객체에 추가 키값 쌍을 추가할 수 있습니다.
     
##### 잘못된Requests{#invalidrequests} 
잘못된 .insert 또는 .delete 요청은 status=200 이외의 HTTP 오류 상태 코드를 반환하고 dataset에 변경되지 않습니다. 이에는 incorrect 저자 정보, incorrect 변수 이름, 다른 변수에 대한 다른 배열 길이, 필요한 변수를 누락, 누락 된 필수 변수 값 등을 포함합니다. 요청이 1 개 이상의 데이터 파일이 포함되면 요청의 일부가 성공하고 일부가 실패 할 수 있습니다. 그러나이 요청을 보내는 센서가 실패한 경우 문제가되지 않습니다. 예를 들어,ERDDAP™연결하기 (또는 삭제) 행에서 동일한 데이터 두 번, 최악의 경우는 로그 파일에서 두 번 저장됩니다. 문제가 발생할 수있는 방법을 볼 수 있습니다.
     
##### HttpGet 속도{#httpget-speed} 
.insert 또는 .delete 요청 (계산하기http맨 위로) , ballpark는 .insert 또는 .delete의 속도를 파악합니다
.insert 당 1ms 자료의 1개의 줄
.insert 당 2ms 배열에 있는 자료의 10의 줄 (\\[\\])   
.insert 당 3ms 배열에 있는 자료의 100개의 줄 (\\[\\])   
.insert 당 13ms 배열에 있는 자료의 1000의 줄 (\\[\\])   
명확한 배열은 열쇠입니다[높은 처리량](#httpget-speed)· 배열 없이, 그것은 .insert 또는 .delete 원격 저자에서 초당 자료의 8개 이상 줄에 도전할 것입니다 (네트워크의 모든 오버헤드 때문에) · 배열으로, 그것은 .insert 또는 .delete에 원격 센서에서 초당 자료의 1000 이상 줄이 더 쉽습니다.

요청 당 데이터의 매우 큰 금액으로 Tomcat의 최대 쿼리 길이에 제한을 명중합니다. (기본값은 8KB입니까?) , 그러나 그것은 당신의에 있는 maxHttpHeaderSize 조정을 편집해서 증가될 수 있습니다 *뚱 베어* /conf/server.xml의 HTTP/1.1 연결관 입장.

시간 :ERDDAP™JSON Lines CSV 데이터 읽기 (이름 *) 파일, 바이너리 데이터 파일을 읽기와 비교하여 작은 시간의 처벌이 있습니다. 읽을 때이 시간의 벌금은 데이터를 작성할 때 시스템의 속도와 견고성을 지불 할 수있는 합리적인 가격이었습니다. (주요 중요성) ·

##### SSD{#ssd} 
[더 큰 속도를 위해,](#ssd)사용 방법[솔리드 스테이트 드라이브 (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)데이터를 저장합니다. 그들은 훨씬 빠른 파일 액세스 시간 (&lt;하드 디스크 드라이브보다 0.1ms) (3 - 12 미터) · 또한 빠른 데이터 전송률이 있습니다. (200 - 2500의 MB/s) 하드 디스크 드라이브보다 (~200메가바이트) · 그들의 비용은 최근 몇 년 동안 상당히 상승했습니다. 초기 SSD의 많은 수의 쓰기 후 문제가 있었지만,이 문제는 이제 크게 감소했습니다. SSD를 사용하여 데이터를 한 번 작성하면 많은 시간을 읽을 수 있습니다. 소비자 등급 SSD (기업 등급 SSD보다 상당히 덜 비싼) 긴 시간을 지속해야합니다.
    
##### 뚱 베어{#robust} 
우리는이 시스템을 쉽게 작업과 가능한만큼 견고하게 만들기 위해 노력했습니다.
* 시스템은 여러 스레드를 가지고 설계 (e.g., 센서, 자동화된 QC 스크립트, 인간) 동시에 같은 dataset과 같은 파일에서 작업. Much of this is made possible by using the log file method to storage the data and by using the very simple file types,[구글 맵 라인 CSV 파일](https://jsonlines.org/examples/), 데이터를 저장합니다.
* JSON Lines CSV에 또 다른 거대한 장점은 파일이 손상된 경우 (e.g., 선에 오류가 발생하지 않는) , 그것은 텍스트 편집기에 파일을 열고 문제를 해결하는 것이 쉽습니다.
* 또 다른 이점은, 파일에 있는 선에 과실이 있는 경우에, 체계 아직도 온갖 자료를 읽을 수 있고 과실 선 후에. 그리고 시스템은 추가 .insert 및 .delete 정보를 기록할 수 있습니다.
* admin-accessible 표준 파일을 사용하는 거대한 장점 (관계 데이터베이스 또는 Cassandra 또는 기타 소프트웨어에 비해) :: 유지해야 할 다른 소프트웨어가 없으며 저장하거나 데이터를 검색하려면 실행해야합니다. 그리고 데이터가 펑크에 있기 때문에 항상 표준 파일을 백업하는 것이 쉽습니다. (잠시 후에, 각 역을 위한 현재 시간 파일만 변화될 것입니다) · 대조적으로, 그것은 고려할 수 있는 노력 및 체계 데이타베이스에서 외부 백업 파일을 만들고 Cassandra에서.
         
##### 시스템 신뢰성{#system-reliability} 
하나의 서버를 기대할 수 있습니다.ERDDAP™99.9% 가동 시간 -- 년 당 가동불능시간의 대략 9 시간입니다 (그러나, 당신은 한밤에 그것을 사용할 수 있습니다&#33;) ·
당신이 유대하고 운이 좋은 경우, 당신은 99.99% 가동 시간을 얻을 수 있습니다 (연간 53분 가동) , 다만 몇몇 갱신을 위한 재시작은 그 다량 시간을 가지고 갈 것입니다.
극단적 인 조치를 취해야 할 것 (별도의 백업 서버, 무정전 전원 공급 장치, 백업 공기 조절, 24x7x365 인력 사이트 모니터링, 등.) 99.999% 가동불능시간에 호리호리한 기회가 있으십시오 (년 당 5.25 분 가동 시간) · 그 이후로 99.999% 가동 시간이 지남에 따라 매우 다를 수 있습니다. (또는 99.99%) 문제가 자주 당신의 통제의 외부이기 때문에. 예를 들어, Amazon Web Service 및 Google Offer는 astonishingly 신뢰할 수있는 웹 서비스이지만 큰 섹션은 때때로 시간입니다.

얼굴, 모두 원ERDDAP™100 % 가동 시간 또는 적어도 "six 9s" (99.9999% 가동 시간은 년 당 가동불능시간의 32 초를 동등합니다) ,하지만 당신이 그것을 얻을 것이다 방법이 없습니다 얼마나 많은 시간, 노력, 그리고 당신이 지출 돈.

한국어ERDDAP™가동 시간은 여기에서 진짜 목표가 아닙니다. 목표는 신뢰할 수 있는 **시스템** , 어떤 자료를 잃지 않는 한. 이것은 solvable 문제입니다.

이 솔루션은: 데이터를 전송하는 컴퓨터 소프트웨어에 결함 허용ERDDAP· 특히, 그 소프트웨어는 데이터 대기의 큐를 유지해야ERDDAP· 데이터가 큐에 추가되면 소프트웨어가 응답을 확인해야합니다.ERDDAP· 응답이 수신되지 않는 경우. 오류가 없습니다. 그런 다음 소프트웨어는 큐에 데이터를 남겨야합니다. 더 많은 데이터가 생성되고 큐에 추가되면 소프트웨어가 다시 .insert queue에 데이터를 시도해야합니다 (아마\\[\\]시스템) · 성공하거나 실패합니다. 실패하면 나중에 다시 시도합니다. 이 방법을 작동하기 위해 소프트웨어를 작성하고 소프트웨어가 데이터의 몇 일 가치에 따라 준비되면 실제로 센서의 데이터의 100 %를 업로드 할 수있는 좋은 기회가 있습니다.ERDDAP· 그리고 당신은 중대한 노력 또는 비용 없이 그것을 행해질 것입니다.

\\[배경: 우리는 이것을 생각하지 않았다.[이것은 컴퓨터 네트워크가 신뢰성을 달성하는 방법입니다.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)· 컴퓨터 네트워크는 믿을 수 없습니다. 그래서 하나의 컴퓨터에서 다른 파일로 전송할 때, 소프트웨어를 전송하는 것은 / 일부 패킷이 손실 될 수 있음. 수신기에서 주어진 패킷에 적합한 acknowledgment를 얻지 못하면 손실 된 패킷을 재사용합니다. 이 접근으로, 상대적으로 간단한 sender 및 수신기 소프트웨어는 믿을 수 없는 네트워크의 정상에 믿을 수 있는 파일 이동 체계를 건설할 수 있습니다.\\]
    
##### 왜 JSON 라인 CSV 파일?&#33;{#why-json-lines-csv-files} 
EDDTableFromHttpGet 사용[구글 맵 라인 CSV 파일](https://jsonlines.org/examples/). 자료 저장을 위해. 그 이유는:

* 주요 이유는 다음과 같습니다. JSON Lines CSV 파일의 단순성은 주어진 파일에 쓸 수있는 다중 스레드를 허용하는 빠르고 쉽고 신뢰할 수있는 방법을 제공합니다. (e.g., filename에 동기화) ·
* JSON Lines CSV 파일이 손상된 경우 (e.g., 선에 오류가 발생하지 않는) , EDDTableFromHttpGet는 여전히 모든 데이터를 모두 읽을 수 있었다 전에 그리고 오류 라인 후. 그리고 .insert 및 .delete 시스템은 데이터 파일에 새로운 데이터를 추가 할 수 있습니다.
* JSON Lines CSV 파일이 ASCII 파일이기 때문에, 파일이 손상된 경우, 수정하기 쉽습니다. (텍스트 편집기) ·
* JSON Lines CSV 지원 유니코드 문자열.
* JSON Lines CSV는 가변 길이 문자열을 지원합니다. (어떤 최대 길이로 제한되지 않음) ·
* JSON Lines CSV는 64비트 정수를 지원합니다. (뚱 베어) ·
* JSON Lines CSV의 형식적 성격 및 추가 구문 (이전 학교 CSV) 주어진 선이 손상되지 않은 몇 가지 추가 보증을 제공합니다.

우리는 처음 사용하려고.nc무제한 차원을 가진 3개의 파일. 그러나, 문제가 있었다 :

* 주요 문제는: 여러 스레드를 허용하는 신뢰할 수있는 방법이 없습니다..nc스레드가 동기화 된 방식으로 쓰기를 수행하는 경우에도 3 파일.
* 이름 *.nc3 파일은 손상됩니다, .insert 및 .delete 시스템은 파일을 계속 사용할 수 없습니다.
* 이름 *.nc3 파일은 이진, 파일이 손상되면 (그들은 다 스레드 문제 때문에) 그들은 과도하게 열심히 또는 수정할 수 없습니다. 수리에 도움이 될 도구가 없습니다.
* CF는 문자열의 인코딩을 지정하는 방법이 없습니다, 그래서 Unicode, e.g., UTF-8 인코딩을 지원하는 공식 방법이 없습니다. CF가 \\_Encoding 속성을 지원하는 것을 시도했지만 진행 상황을 만들 수 없습니다. (Unidata, 자신의 신용에, \\_Encoding 속성을 지원한다.) 
*   .nc3개의 파일만 지원 고정 길이 끈. 다시, 우리는 CF를 얻기 위해 시도Unidata변수 길이 문자열을 지원하지만 어떤 진행을 만들 수 없습니다.
*   .nc3 파일은 문자열 변수에서 단일 문자 변수를 구별하는 쉬운 방법을 지원하지 않습니다. 다시, 우리는 CF를 얻기 위해 시도Unidata이러한 두 가지 데이터 유형을 구별하기위한 시스템을 지원하지만 어떤 진행 상황을 만들 수 없습니다.
*   .nc3개의 파일은 unspecified 인코딩을 가진 8 비트 문자만 지원합니다. 다시, 우리는 CF를 얻기 위해 시도Unidata인코딩을 지정하는 시스템을 지원하지만 어떤 진행도 할 수 없습니다.
*   .nc3개의 파일은 64bit 정수를 지원하지 않습니다 (뚱 베어) · 다시, 우리는 CF를 얻기 위해 시도Unidata긴 시스템을 지원하지만 어떤 진행도 할 수 없습니다.
         
##### 관련 기사{#versioning} 
EDDTable 때문에 에서Http Dataset의 모든 변경 사항을 저장하고, 각 변경의 저자와 함께 dataset의 로그를 다시 생성 할 수 있습니다. 감각에서, 시간에 어떤 점을 위한 버전이 있습니다. 데이터에 대한 사용자 요청이 타임스탬프 포함&lt;= 제약, 예를 들어, &timestamp&lt;=2016-06-23T16:32:22.128Z (또는 어떤 시간 점) , 그러나 저자 또는 명령의 제약 없음,ERDDAP™먼저 dataset의 버전을 생성하여 요청에 응답합니다. 다음 것,ERDDAP™데이터에 대한 다른 요청과 같이 사용자의 다른 제약을 적용합니다ERDDAP· EDDTableFromHttpGet는 이렇게 이 과정이 아주 빠르고 능률적인, 아주 큰 datasets를 위해 조차 설치됩니다.

마찬가지로 데이터 세트가 요청하여 업데이트되었을 때 사용자를 찾을 수 있습니다 ...?timestamp&timestamp=max (타임 스탬프) &distinct는 () 

그리고 데이터에 대한 모든 요청을 위해 데이터셋의 모든 버전에 대해 사용자가 변경한 저자를 볼 수 있고, 그들이 만든 경우.

이 버전 시스템 활성화[교육 과학](https://en.wikipedia.org/wiki/Reproducibility)누구라도 언제든지 데이터셋을 언제든지 요청할 수 있습니다. 이 고급 버전은 우리가 알고있는 다른 시스템과는 불가능합니다. underlying 기계장치는 매우 능률적, 그것에서 여분 저장 공간은 필요로 하고, 가공 머리는 진짜로 최소한입니다.

모든 사람이 잘 grained versioning의이 유형에 대한 필요는 없지만 큰 데이터 관리 조직의 맥락에서 유용 할 필요가 없습니다. (e.g., OOI, 지구 큐브, 데이터 하나, 및NOAA한국어) dataset가 여러 저자를 가질 수있는 곳 (e.g., 센서, 자동화된 QC 스크립트, 인간의 편집기) ·

\\[역사: 첫번째 버전의 이 유형을 위한 필요는 나를 위해 올랐습니다 (뚱 베어) 2008 년 OOI에 대해 읽고 토론 할 때 당시, OOI는 Git를 기반으로하는 버전화를위한 조밀하고 효율적인 시스템을 가지고있다. Git은 설계되었지만, 이것을하지 않았습니다. 2008년에, OOI 토론에서, 나는 데이터 관리를 위한 광대하고, 능률적인 대안에 OI 체계를 디자인했습니다, 내가 추가한 특징의 많은을 포함하여ERDDAP™그런 다음이 버전 시스템을 포함하여. 그 당시부터, OOI는 버전화 시스템에 전념하고 대안에 관심이 없습니다. 2016년에, 이 계획의 다른 면은 장소로 떨어졌고 나는 그것을 실행하기 시작했습니다. 다른 프로젝트에서 일하는 중단이 많기 때문에 2018까지 끝나지 않았습니다. 이제는, 나는 다른 과학적인 자료 체계의 aware가 그런 빠른 제안하고 수시로 datasets를 바꾸기를 위한 어떤 시점에서 자료의 버전에 쉬운 접근하지 않습니다. 간단한 파일 시스템은 이것을 제공하지 않습니다. Relational 데이터베이스가 없습니다. Cassandra 하지 않습니다.\\]
    
##### HTTPS 넣어 및 삭제{#https-put-and-delete} 
*   ["HTTP PUT 및 DELETE는 어떻습니까?&#33;"](#https-put-and-delete)  
    [Hypertext 전송 프로토콜 (HTTP를) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)월드 와이드 웹의 기초이며 웹 페이지 URL이 "로 시작하는 이유 http://" 또는 " https://" · HTTPS는 추가 보안 레이어와 HTTP입니다. 매일, 브라우저, 스크립트 및 컴퓨터 프로그램은 수십억 개의 HTTP를 만듭니다. (사이트맵)   **이름 *** 원격 소스에서 정보를 얻는 요청. HTTP를 (사이트맵) 기타[한국어](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), 믿을 수 있는 PUT (데이터를 서버에 밀어) 그리고 DELETE (서버에서 DELETE 데이터) · 예, PUT 및 DELETE는 데이터를 삽입하는 적절한 방법이며, HTTP를 통해 데이터셋을 삭제합니다. (사이트맵) · HTTP와 함께 작동 할 수있는 소프트웨어의 모든 조각에 의해 지원됩니다 (사이트맵) · 함께 일하는 것은 정말 쉽습니다. 누구나 이미 POST를 사용하는 방법을 알고 (일반적으로 같은 방법으로 사용할 수 있습니다.) , 그래서 우리는 EDDTableFromHttpGet 작업을 수행 GET 및 POST. 매우 몇 명 (몇몇 컴퓨터 프로그래머) PUT와 DELETE와 함께 일했습니다. PUT 및 DELETE는 일반적으로 컴퓨터 언어로만 지원되므로 숙련 된 프로그램을 사용하십시오. 그래서 PUT 및 DELETE는 일반적으로 도구가 진화 한 방법을 주어진 훨씬 더 커진 접근입니다.
     
##### HttpGet 노트{#httpget-notes} 
*   [지원하다](#httpget-notes)
    * 이름 *dataVariabledataType=char를 가질 수 있습니다. 대신 dataType=String을 사용하십시오. 만약 당신이 정말로 dataType=char, 이메일 Chris가 필요합니다. noaaa.gov의 존.
         
##### 이름 *{#thanks} 
*   [기본 아이디어에 대한 CHORDS 덕분에.](#thanks)  
EDDTableFromHttpGet의 기본 아이디어 (i.e., 사용HTTP GETdataset에 데이터 추가 요청) UCAR에서 (NCAR의?)  [Cloud-Hosted 실시간 데이터 서비스 (주요 특징) ](https://github.com/earthcubeprojects-chords)프로젝트. 요청에 매개 변수의 형식 (반복되는 *name=값* , &'s에 의해 분리하는) 웹 페이지에 HTML 형태로 사용되는 동일한 표준 형식입니다. 그것은 간단 하 고 화려한 아이디어와 더 많은 그래서 그것 때문에 메쉬 너무 완벽 하 게ERDDAP탭 데이터 처리를위한 기존 시스템. 아이디어는 힌트에 분명하지만, 나는 (뚱 베어) 생각하지 않았다. EDDTableHttp에서 기본 아이디어를 사용하여 구현하는 방법의 우리의 아이디어와 결합하여 시스템을 만들기ERDDAP™데이터 업로드 을 사용하는 기본 아이디어 이외의 을 사용하여 데이터를 시스템에 밀어, EDDTableFromHttpGet 구현은 완전히 CHORDS의 독립적이며 다른 기능을 가지고 (e.g., 로그 파일, 데이터의 Chunking, 다른 보안 시스템, CRUD 지원, 재현성 데이터) · CHORDS에 대한 우리의 노출은 웹 세미나였습니다. 우리는 코드를보고하지 않았거나 프로젝트에 대해 읽지 않았다. 즉시 우리가 시스템을 다른 방식으로 구현하려는 것을 알고 있기 때문에. 그러나 우리는 기본적인 아이디어를 위해 그들에게 감사하고 있습니다. CHORDS에 대한 전체 참조는
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., 염료, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014년) · Geosciences를 위한 Cloud-Hosted 실시간 데이터 서비스 (주요 특징) 소프트웨어. UCAR/NCAR -- 지구 관찰 실험실.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTable에서Hyrax파일 형식{#eddtablefromhyraxfiles} 
[ **EDDTable에서Hyrax파일 형식** ](#eddtablefromhyraxfiles)  (뚱 베어) 여러 변수를 가진 데이터 파일, 각각 하나 이상의 공유 크기 (예를 들면, 시간, 고도 (또는 깊이) , 위도, 경도) , 에 의해 제공[Hyrax OPeNDAP계정 관리](https://www.opendap.org/software/hyrax-data-server)·

* 이 dataset 유형은 입니다 **관련 상품** · 더 새롭고 더 일반적인 솔루션은 사용하기 위한 것입니다[뚱 베어 EDDTable을 위한 FromUrl 선택권 파일 형식](#cachefromurl)  (또는 변형) 원격 파일의 로컬 복사본을 만들고 로컬 파일에서 데이터를 제공합니다. 더 보기&lt;cacheFromUrl&gt; 옵션은 모든 유형의 탭 데이터 파일과 함께 사용할 수 있습니다. **   
어떤 이유로 일할 수없는 경우, Chris. noaaa.gov의 존.
2020년 전 불만이 없는 경우, 이 데이터셋 유형이 제거될 수 있습니다. ** 
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
* 대부분의 경우, 각 파일에는 왼쪽의 여러 값이 있습니다. (1 년 전) 예를 들면, 시간.
* 자주 묻는 질문 (하지만 하지 않아도) 다른 차원을 위한 단 하나 가치가 있습니다 (예를 들면, 고도 (또는 깊이) , 위도, 경도) ·
* 파일에는 추가적인 차원과 문자 변수가 있을 수 있습니다. (예를 들어, nCharacters) ·
*   Hyrax서버는 URL에서 "/dods-bin/nph-dods/"또는 "/opendap/"로 식별할 수 있습니다.
* 이 클래스 스크린 스크랩Hyrax각 디렉토리의 파일 목록이있는 웹 페이지. 이 때문에, 그것은 현재의 형식에 매우 구체적인Hyrax웹 페이지. 우리는 조정하려고합니다.ERDDAP™/when 미래 버전의 경우Hyrax파일이 나열된 방법을 변경합니다.
* 더 보기&lt;fileDir&gt; 설정은 무시됩니다. 이 클래스 다운로드 이후 각 원격 데이터 파일의 로컬 복사본을 만듭니다.ERDDAP™파일 힘 Dir는 *큰Parent감독* / 복사/ *datasetID* ·.
* 제품 정보&lt;sourceUrl&gt;, dataset의 기본 디렉토리의 URL을 사용Hyrax서버, 예를 들면,
    &lt;sourceUrl· http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/ 한국어sourceUrl·
     (하지만 한 줄에 넣어)   (죄송합니다, 서버는 더 이상 사용할 수 없습니다.) ·
더 보기sourceUrl웹 페이지는 일반적으로 "OPeNDAPServer 인덱스\\[디렉토리Name\\]" 상단에.
* 이 클래스는 항상 다운로드하고 각 원격 데이터 파일의 로컬 복사본을 만들려면이 데이터 세트를 결코 감싸지 않아야합니다.[EDDTable코피](#eddtablecopy)·
* 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.
* 1D, 2D, 3D 및 4D 예제를 참조하십시오.[EDDTableFromNcFiles는](#eddtablefromncfiles)·
     
### EDDTableInvalidCRAFiles에서{#eddtablefrominvalidcrafiles} 
[ **EDDTableInvalidCRAFiles에서** ](#eddtablefrominvalidcrafiles)데이터 수집NetCDF  (v3 또는 v4)  .nc특정, 잘못된, CF DSG Contiguous Ragged Array의 변형을 사용하는 파일 (사이트맵) 파일. 그러나ERDDAP™이 파일 형식을 지원, 그것은 잘못된 파일 유형은 아무도 사용 시작해야. 이 파일 형식을 사용하는 그룹은 강력하게 사용하도록 권장합니다.ERDDAP™유효한 CF DSG CRA 파일을 생성하고 이 파일을 사용하여 중지합니다.

상세 정보: 이 파일은 여러 행 \\_size 변수가 있으며, 각 샘플 \\_dimension 속성이 있습니다. 파일은 여러 샘플 때문에 비표준 파일입니다. (뚱 베어) 차원은 이 추가 규칙과 다른 각과 개정되고 관계되고 CF DSG 명세의 부분이 아닙니다 약속합니다: "당신은 주어진 예를들면, 온도 가치를 연관시킬 수 있습니다 (temp\\_obs 차원) 주어진 깊이 값으로 (z\\_obs 차원, 가장 값이 있는 차원) , 때문에: 온도 행 \\_size (주어진 던지기를 위해) 해당 심도 행 \\_size과 동일하게 0이 될 것입니다. (그 캐스팅)   (그것은 규칙) · 그래서, 온도 행 \\_size가 0이 아닌 경우, 그 캐스트의 n 온도 값은 n 깊이 값에 직접 팽창합니다. (그 약속) ·

이 파일과 또 다른 문제: Principal\\_Investigator row\\_size 변수는 sample\\_dimension 속성이 없고 위의 규칙을 따르지 않습니다.

이 dataset 유형을 위한 표본 파일은에서 찾아낼 수 있습니다 https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020년 10월 21일 이 서버는 더 이상 믿을 수 없습니다\\]·

이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.

첫 번째 것 GenerateDatasets Xml는 샘플 파일의 ncdump-like 구조를 인쇄한 후 이 유형의 dataset에 사용됩니다. 그래서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
 
### EDDTableFromJsonlCSV파일{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFromJsonlCSV파일** ](#eddtablefromjsonlcsvfiles)데이터 수집[구글 맵 라인 CSV 파일](https://jsonlines.org/examples/)· 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

* jsonlines.org 말한다, 이 형식은 "CPT보다 더 나은" (그리고 법적으로, 연방 직원으로, 나는 동의하거나 그들과 동의 할 수 없습니다 -- 어떻게 미쳐는?) · CSV는 정형적으로 정의되지 않으며 원래 스프레드 시트 프로그램에 대한 연결과 관련된 역사적인 수하물에 의해 hampered. JSON Lines CSV, 비교에서, 완전히 정의되고 그것의 연결에서 그것의 연결에서 이익이 그것의 연결에서 그것의 연결에 있는 널리 이용되는 JSON 기준에 이익입니다Java스크립트 및Java· 물론, 긴 정수에 대한 전체 지원과 문자열의 Unicode 문자, 다른 특수 문자를 포함 하는 명확한 방법 (믿을 수 없는 탭과 newlines) 문자열 안에.
    
이 형식은 특히 주어진 데이터 파일의 끝에 datasets에 추가 줄을 추가해야합니다. 그 이유와 다른 사람 (더 보기) ·[다운로드](#eddtablefromhttpget)Json Lines CSV 파일 사용
    
* 입력 파일은 UTF-8 인코딩되어야한다. 그러나 \\u를 주어진 *팟캐스트* 인코딩 특수 문자의 형식 (e.g., \\u20ac는 유로 캐릭터의 인코딩입니다.) , 당신은 파일을 작성하는 옵션이 그래서 그들은 \\u를 사용하여 7 비트 ASCII 문자 만 포함 *팟캐스트* #127 위의 모든 문자를 인코딩합니다.
     
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
    
첫 번째 것은 GenerateDatasetsXml는 이 유형의 dataset을 위해 질문을 대답하고 샘플 파일의 ncdump-like 구조를 인쇄합니다. 그래서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
    
* 경고: 때ERDDAP™JSON 읽기 Lines CSV 데이터 파일, 주어진 줄에 오류를 발견하면 (e.g., 항목의 잘못된 수) , 그것은 경고 메시지를 기록 ("WARNING : 배선 (₢ 킹) data" ... 후속 선의 목록으로) 으로[log.txt 파일](/docs/server-admin/additional-information#log)그런 다음 데이터 파일의 나머지를 읽을 수 있습니다. 그러므로, 그것은 당신의 책임은 주기적으로 보입니다 (또는 스크립트를 작성하여) 로그에 그 메시지. txt 그래서 당신은 데이터 파일에 문제가 해결 할 수 있습니다.ERDDAP™이 방법을 설정하므로 사용자는 파일의 일부 줄이 결함이있는 경우에도 사용 가능한 모든 데이터를 읽을 수 있습니다.
     
### EDDTableMultidimNcFiles에서{#eddtablefrommultidimncfiles} 
[ **EDDTableMultidimNcFiles에서** ](#eddtablefrommultidimncfiles)데이터 수집NetCDF  (v3 또는 v4)  .nc  (또는[.nc단백질](#ncml-files)) 여러 변수를 가진 파일, 각각 하나 이상의 공유 크기. 파일에는 추가적인 차원이 없는 문자 변수가 있을 수 있습니다. (예를 들어, 봄14) · 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

* 파일이 다차원 CF DSG 변종인 경우, 이 dataset 유형 대신 사용[EDDTableNcCFFiles에서](#eddtablefromncfiles)·
     
* 새로운 tabular datasets를 위해.nc파일, 이전 시도하기 전에이 옵션을 사용[EDDTableFromNcFiles는](#eddtablefromncfiles)· 이 종류의 몇몇 이점은:
    * 이 클래스는 다양한 파일 구조에서 더 많은 변수를 읽을 수 있습니다. DimensionCSV를 지정한 경우 (차원 이름의 comma-separated 명부) GenerateDatasets에 대하여 Xml (또는&lt;치수CSV&gt;datasets.xml이러한 데이터 세트 중 하나에 대한 정보), 다음ERDDAP™이 크기의 일부 또는 모든 것을 사용하는 소스 파일에서 변수를 읽을 것입니다. 모든 scalar 변수. 차원이 그룹에 있다면, 당신은 그것의 이름을 지정해야, 예를 들어, " *그룹이름/dimensionName* ·
    * 이 클래스는 종종 요청의 제약과 일치하지 않는 경우 파일을 신속하게 거부 할 수 있습니다. 그래서 큰 컬렉션에서 데이터를 읽는 것은 종종 훨씬 빠릅니다.
    * 이 클래스는 true char 변수를 처리합니다. (non-String 변수) 견적 요청
    * 이 클래스는 제작자가 Netcdf-java의 writeStrings를 사용하지 않을 때 문자열 변수를 트리밍 할 수 있습니다. (char #0이 문자열의 끝을 표시한다) ·
    * 이 클래스는 특정 변수 또는 크기가 부족한 개별 파일과 처리하는 것이 좋습니다.
    * 이 클래스는 누락된 값으로 블록을 제거할 수 있습니다.[사이트맵 분리된 표본 추출 Geometries (사이트맵) Incomplete 다차원 배열 파일](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
    
첫 번째 것은 GenerateDatasetsXml는 이 유형의 dataset을 위해 질문을 대답하고 샘플 파일의 ncdump-like 구조를 인쇄합니다. 그래서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
    
그룹 -- Generate데이터셋 Xml는 "그룹"을 요청합니다. 모든 그룹을 검색하려면 ""을 입력 할 수 있습니다. " *이름 * 이름 ** " 또는 " *일부그룹/someSubGroup* " 특정 그룹을 검색하려면, 또는 "\\[이름 *\\]"그것은 단지 루트 그룹을 검색해야합니다. "그룹" 문자열이&lt;그룹&gt; 에서datasets.xmldataset에 대한 정보 (그러나 "\\[이름 *\\]"가된다") ·
    
치수CSV -- Generate데이터셋 Xml는 "DimensionsCSV" 문자열을 요청합니다. 이것은 차원의 세트의 근원 이름의 comma 격리 가치 명부입니다. Generate데이터셋 Xml는 샘플의 데이터 변수만 읽습니다..nc일부 또는 그 모든 크기를 사용하는 파일 (다른 차원 없음) , 파일에 scalar 변수의 모든 플러스, 그리고 그 데이터 변수에서 dataset을한다. 차원이 그룹에 있다면, 당신은 그것의 이름을 지정해야, 예를 들어, " *그룹이름/dimensionName* ·
아무것도 지정하지 않는 경우 (빈 문자열) , 생성데이터셋 Xml는 가장 흥미로운 이론에 대부분의 치수와 변수를 찾습니다. 그러나 다른 그룹을 사용하는 데이터 변수의 일부 다른 그룹에서 데이터 세트를 만들려면 시간이있을 수 있습니다.
존재하지 않는 차원 이름을 지정하면 (예, NO\\_MATCH) ·ERDDAP™scalar 변수의 모든 것을 찾을 수 있습니다.
"DimensionsCSV" 문자열이 됩니다.&lt;치수CSV&gt;datasets.xmldataset에 대한 정보.
    
#### 치료방법As{#treatdimensionsas} 
잘못된 범주가 있습니다.nc파일 형식 (CF 규칙을 따르지 않기 때문에) 다수 차원이 있는 (e.g., lat, 론, 시간) 그들은 단지 1 차원을 사용해야 할 때 (예, 시간) 예를 들면:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles는 이러한 파일과 관련된 특별한 기능을 가지고 있습니다. 데이터셋 글로벌에 대한 글로벌 속성 "treatDimensionsAs"를 추가하면addAttributes, 당신은 말할 수 있습니다ERDDAP™특정 차원을 대우하기 (e.g., lat 및 나일론) 다른 차원이 있다면 (예, 시간) · 속성 값은 "from" 치수를 지정하고 "to" 치수, 예를 들어, comma 분리 된 목록이어야한다.
<att name="treatDimensionsAs">lat, lon, 시간</att>  
다음 것ERDDAP™파일이 있다면:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
물론, 목록의 각 치수의 현재 크기는 동일해야합니다; 그렇지 않으면,ERDDAP™"Bad File"로 파일을 치료합니다.

이 파일은 CF 규칙을 따르지 않기 때문에 유효하지 않습니다. 그러나ERDDAP™읽을 수 있습니다. 다른 CF 기반 소프트웨어 도구가 올바르게 읽을 수 없기 때문에 파일을 만들지 않는 것이 좋습니다. 이미 그런 파일이 있으면 가능한 한 빨리 유효한 파일로 교체하는 것이 좋습니다.
    
### EDDTableFromNcFiles는{#eddtablefromncfiles} 
[ **EDDTableFromNcFiles는** ](#eddtablefromncfiles)데이터 수집NetCDF  (v3 또는 v4)  .nc  (또는[.nc단백질](#ncml-files)) 파일 및[로드 중 ...](https://github.com/zarr-developers/zarr-python)파일 형식 (버전 2.25의) 여러 변수와 함께, 각각 하나의 공유 차원 (예를 들면, 시간) 또는 1 개 이상의 공유 치수 (예를 들면, 시간, 고도 (또는 깊이) , 위도, 경도) · 파일에는 동일한 차원 이름이 있어야 합니다. 주어진 파일에는 차원의 각각을 위한 다수 가치가 있고 가치는 다른 근원 파일에서 다를지도 모릅니다. 파일에는 추가적인 차원과 문자 변수가 있을 수 있습니다. (예를 들어, 봄14) · 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

Zarr 파일은 약간 다른 행동을 가지고 있으며 fileNameRegex 또는 pathRegex는 "zarr"을 포함해야합니다.

* 만약에.nc파일 사용 중 하나[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)파일 형식, 사용 시도[EDDTableNcCFFiles에서](#eddtablefromncfiles)이것을 시도하기 전에.
     
* 새로운 tabular datasets를 위해.nc파일, 더 새로운 시도[EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)처음.
     
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
    
첫 번째 것은 GenerateDatasetsXml는 이 유형의 dataset을 위해 질문을 대답하고 샘플 파일의 ncdump-like 구조를 인쇄합니다. 그래서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
    
치수CSV -- Generate데이터셋 Xml는 "DimensionsCSV" 문자열을 요청합니다. 이것은 차원의 세트의 근원 이름의 comma 격리 가치 명부입니다. Generate데이터셋 Xml는 데이터 변수를 찾을 것입니다..nc일부 또는 모든 치수를 사용하는 파일, 플러스 모든 scalar 변수, 그리고 그 데이터 변수에서 dataset을한다. 당신이 아무것도 지정하는 경우 (빈 문자열) , 생성데이터셋 Xml는 가장 흥미로운 이론에 대부분의 치수와 변수를 찾습니다. 그러나 다른 그룹을 사용하는 데이터 변수의 일부 다른 그룹에서 데이터 세트를 만들려면 시간이있을 수 있습니다.
    
* 1D 예제: 1D 파일은 2D, 3D, 4D, ... 파일과 다소 다릅니다.
    * 당신은 세트가있을 수 있습니다.nc각 파일이 한 달의 데이터의 가치가있는 데이터 파일.
    * 각 파일에는 1개의 차원이, 예를 들면, 시간 있습니다 (크기 =\\[한국어\\]) ·
    * 각 파일에는 예를 들어, 시간, 경도, 위도, 공기 온도, ....
    * 각 파일에는 2D 문자 변수가 있습니다. 예를 들어, 치수 (시간, nCharacters) ·
         
* 2D 예제:
    * 당신은 세트가있을 수 있습니다.nc각 파일이 한 달의 데이터의 가치가있는 데이터 파일.
    * 각 파일에는 예를 들면 2 차원이, 시간 있습니다 (크기 =\\[한국어\\]) 그리고 id (크기 = 1) ·
    * 각 파일에는 크기와 같은 이름과 같은 2개의 1D 변수가 있고 예를 들어, 시간 (시간 :) , 아이 (이름 *) · 이 1D 변수는 목록에서 포함되어야 합니다.&lt;dataVariable&gt; dataset의 XML에 있습니다.
    * 각 파일은 예를 들어, 경도, 위도, 공기 온도, 수온, ...
    * 각 파일에는 3D 문자 변수가 있습니다. 예를 들어, 치수 (시간, ID, nCharacters) ·
         
* 3D 예제:
    * 당신은 세트가있을 수 있습니다.nc각 파일이있는 데이터 파일은 1 개의 정지 buoy에서 데이터의 1 개월의 가치가 있습니다.
    * 각 파일에는 예를 들면 3 차원이, 시간 있습니다 (크기 =\\[한국어\\]) , 선반 (크기 = 1) , 그리고 lon (크기 = 1) ·
    * 각 파일에는 3개의 1D 변수가 있습니다. 같은 이름과 같은 크기로, 예를 들면, 시간 (시간 :) , 선반 (뚱 베어) , 나일론 (뚱 베어) · 이 1D 변수는 목록에서 포함되어야 합니다.&lt;dataVariable&gt; dataset의 XML에 있습니다.
    * 각 파일에는 예를 들어, 공기 온도, 수온, 3D 변수가 하나 이상 있습니다 ...
    * 각 파일에는 4D 문자 변수가 있습니다. 예를 들어, 크기와 (시간, 편평한, 나일론, nCharacters) ·
    * 파일의 이름은 파일의 이름 안에 부표의 이름을 가질 수 있습니다.
         
* 4D 예제:
    * 당신은 세트가있을 수 있습니다.nc각 파일이 한 역의 데이터의 1 개월의 가치가있는 데이터 파일. 각 시점에서 역은 일련의 깊이로 읽습니다.
    * 각 파일에는 4개의 차원이, 예를 들면, 시간 있습니다 (크기 =\\[한국어\\]) , 깊이 (크기 =\\[한국어\\]) , 선반 (크기 = 1) , 그리고 lon (크기 = 1) ·
    * 각 파일에는 크기와 같은 이름과 같은 4개의 1D 변수가 있고 예를 들어, 시간 (시간 :) , 깊이 ((주)) , 선반 (뚱 베어) , 나일론 (뚱 베어) · 이 1D 변수는 목록에서 포함되어야 합니다.&lt;dataVariable&gt; dataset의 XML에 있습니다.
    * 각 파일에는 1 개 이상의 4D 변수가 있습니다. 예를 들어, 공기 온도, 수온, ...
    * 각 파일에는 5D 문자 변수가 있습니다. 예를 들어, 치수 (시간, 심도, 편평한, 나일론, nCharacters) ·
    * 파일의 이름은 파일의 이름 안에 부표의 이름을 가질 수 있습니다.
         
### EDDTableNcCFFiles에서{#eddtablefromnccffiles} 
[ **EDDTableNcCFFiles에서** ](#eddtablefromnccffiles)집계 데이터 집계NetCDF  (v3 또는 v4)  .nc  (또는[.nc단백질](#ncml-files)) 지정된 파일 형식 중 하나를 사용하는 파일[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)대회. 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

다차원 CF DSG 변형 중 하나를 사용하는 파일에 대해서는 사용[EDDTableMultidimNcFiles에서](#eddtablefrommultidimncfiles)대신.

CF DSG 컨벤션은 수십 개의 파일 형식을 정의하고 수많은 사소한 변화를 포함합니다. 이 클래스는 우리가 알고있는 변화의 모든 거래, 하지만 우리는 놓칠 수 있습니다 (더 보기) · 이 클래스가 CF DSG 파일에서 데이터를 읽을 수 없다면, 제발[추가 지원](/docs/intro#support)·

우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
 
### EDDTableNccsvFiles에서{#eddtablefromnccsvfiles} 
[ **EDDTableNccsvFiles에서** ](#eddtablefromnccsvfiles)데이터 수집[사이트맵](/docs/user/nccsv-1.00)ASCII .csv 파일. 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
    
첫 번째 것은 GenerateDatasetsXml는 이 유형의 dataset을 위해 질문을 대답하고 샘플 파일의 ncdump-like 구조를 인쇄합니다. 그래서 GenerateDatasets를 통해 첫 번째 루프에 대한 몇 가지 goofy 답변을 입력하면 Xml, 적어도 당신이 볼 수 있습니다ERDDAP™파일을 읽고 어떤 치수와 변수가 파일에 있는지 볼 수 있습니다. 그런 다음 GenerateDatasetsXml를 통해 두 번째 루프에 대한 더 나은 답변을 줄 수 있습니다.
    
* 경고: 때ERDDAP™NCCSV 데이터 파일을 읽으면 주어진 줄에 오류가 발견됩니다. (e.g., 항목의 잘못된 수) , 그것은 경고 메시지를 기록 ("WARNING : 배선 (₢ 킹) data" ... 후속 선의 목록으로) 으로[log.txt 파일](/docs/server-admin/additional-information#log)그런 다음 데이터 파일의 나머지를 읽을 수 있습니다. 그러므로, 그것은 당신의 책임은 주기적으로 보입니다 (또는 스크립트를 작성하여) 로그에 그 메시지. txt 그래서 당신은 데이터 파일에 문제가 해결 할 수 있습니다.ERDDAP™이 방법을 설정하므로 사용자는 파일의 일부 줄이 결함이있는 경우에도 사용 가능한 모든 데이터를 읽을 수 있습니다.
     
### 연락처{#eddtablefromnos} 
[ **연락처** ](#eddtablefromnos)  (관련 상품) 데이터 처리NOAA [이름 *](https://opendap.co-ops.nos.noaa.gov/axis/)사용 설명서[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)요청 및 응답을 위해. 그것은 아주 특정합니다NOAANOS의 XML. datasets2.xml의 sample EDDTableFromNOS dataset을 참조하십시오.
 
### EDDTable온도{#eddtablefromobis} 
[ **EDDTable온도** ](#eddtablefromobis)Ocean Biogeographic Information System의 데이터 처리 (오비스) 계정 관리 (· http://www.iobis.org  ) · 이제 OBIS 서버 시스템의 최신형을 사용하는 더 많은 활성 서버가 없습니다.

* OBIS 서버는 XML 요청을 기대하고 XML 응답을 반환합니다.
* 모든 OBIS 서버는 동일한 변수를 동일하게 제공합니다. (· http://iobis.org/tech/provider/questions ) , OBIS dataset을 설정하기 위해 다량을 지정할 필요가 없습니다.ERDDAP·
* 당신은 "을 포함creator\\_email"글로벌의 특성addAttributes, 그 정보는 라이센스 내에서 사용됩니다. 적합한 이메일 주소는 sourceURL에서 XML 응답을 읽을 수 있습니다.
* 글로벌 속성을 얻을 수 없거나 할 수 없습니다 [&lt;subsetVariables&gt;] (#subsetvariables의 특징) 주어진 OBIS 서버로 일하기. 시도하면, 단지 하나의 변수를 시도 (예를 들면, ScientificName 또는 Genus) ·
#### EDDTable온도 스켈레톤 XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquet파일{#eddtablefromparquetfiles} 
[ **EDDTableFromParquet파일** ](#eddtablefromparquetfiles)데이터 처리[스낵 바](https://parquet.apache.org/)· 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.

* Parquet는 매우 효율적으로 압축하도록 설계되었으므로 다른 형식보다 작은 파일 크기를 줄 수 있습니다.
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
* 경고: 때ERDDAP™주어진 줄에 오류를 발견하면 Parquet 데이터 파일을 읽습니다. (e.g., 항목의 잘못된 수) , 그것은 경고 메시지를 기록 ("WARNING : 배선 (₢ 킹) data" ... 후속 선의 목록으로) 으로[log.txt 파일](/docs/server-admin/additional-information#log)그런 다음 데이터 파일의 나머지를 읽을 수 있습니다. 그러므로, 그것은 당신의 책임은 주기적으로 보입니다 (또는 스크립트를 작성하여) 로그에 그 메시지. txt 그래서 당신은 데이터 파일에 문제가 해결 할 수 있습니다.ERDDAP™이 방법을 설정하므로 사용자는 파일의 일부 줄이 결함이있는 경우에도 사용 가능한 모든 데이터를 읽을 수 있습니다.
     
### EDDTable에서SOS {#eddtablefromsos} 
[ **EDDTable에서SOS** ](#eddtablefromsos)Sensor Observation Service의 데이터 처리 (사이트맵[SOS](https://www.ogc.org/standards/sos)) 서버.

* 이 dataset 유형은 1개의 역의 그룹에서 자료를 집계합니다SOS서버.
* 모든 역은 변수의 동일한 세트를 봉사 (각 역의 소스는 모든 변수를 제공 할 필요가 없습니다) ·
*   SOS서버는 XML 요청을 기대하고 XML 응답을 반환합니다.
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다. Dataset XML을 생성하는 것은 쉽지 않습니다.SOS손으로 datasets. 자주 묻는 질문sourceUrl+"? 서비스 =SOS관련 기사GetCapabilities"브라우저; XML을 봐; 손으로 GetObservation 요청을; 요청에 XML 응답을 봐.
* 새로운 유형의 경우 추가SOS서버 및 이전 서버로 변경, 그것은 더 열심히 얻을ERDDAP™서버의 응답에서 서버 유형을 자동으로 감지합니다. 의 사용&lt;sosServerType 지시어 (IOOS\\_NDBC, IOOS\\_NOS의 값으로,OOSTethys또는 WHOI) 지금 STRONGLY RECOMMENDED입니다. 이 유형의 데이터셋에 문제가 있는 경우, Re-running GenerateDatasets를 사용해 보세요. Xml 용SOS서버. 제품 정보 데이터셋 Xml는 다른 시도 할 수 있습니다.&lt;sosServerType&gt; 옵션은 주어진 서버에서 올바른 것을 찾을 수 있습니다.
*   SOS개요 :
    * 사이트맵 (Sensor 웹 사용) 이름 *SOS  (센서 관측 서비스) 이름 *[OpenGIS® 표준](https://www.ogc.org/standards)· 이 웹 사이트는 표준 문서가 있습니다.
    * 더 보기OGC웹 서비스 일반적인 명세 ver 1.1.0 (OGC06-121r3에) GET 및 POST 쿼리의 구성 (단면도를 보십시오 7.2.3와 단면도 9) ·
    * getCapabilities xml 요청을 보내면SOS계정 관리 (sourceUrl+ "?서비스 =SOS관련 기사GetCapabilities·) , 당신은 역과 관찰의 목록으로 xml 결과를 얻을 데이터가 있는 속성.
    * ObservProperty는 URI의 공식 참조입니다. 예를 들면, urn:ogc:phenomenon: 경도: wgs84 또는 https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * discoverProperty는 변수가 아닙니다.
    * 1 개 이상의 변수는 동일한 관찰을 가질 수 있습니다. 제품정보 (예를 들면, insideTemp 및 외부 임시 직원은 둘 다 관찰했습니다 제품정보 https://mmisw.org/ont/cf/parameter/air\\_temperature ) ·
    * getObservation xml 요청을 보낼 경우SOS서버, 당신은 응답, 필드 단위 및 데이터에 필드 이름의 설명으로 xml 결과를 얻을. 분야 이름은 경도, 위도, 깊이를 포함합니다 (아마) , 그리고 시간.
    * 각 각dataVariableEDDTableFrom를 위해SOS서버에서 요청해야 하는 ObservProperty를 식별하는 "observedProperty" 속성을 포함해야 합니다. 종종, 몇몇dataVariables는 동일한 복합 ObservProperty를 나열합니다.
    * 각 데이터 유형dataVariable서버로 지정할 수 없습니다. 그래서, 서버에서 XML 데이터 응답을보고 적절한 할당해야합니다 [&lt;dataType&gt;s는 (#자료) 내 계정ERDDAP™데이터셋dataVariable정의.
    *    (이 글을 쓰는 시간) 이름 *SOS서버는 한 개 이상에 대한 getObservation 요청에 응답 ObservProperties의 첫 번째 결과를 반환함으로써 속성. (오류 메시지 없음&#33;) constructor 매개변수 요청 보기 ObservedProperties심리.
* EDDTable에서SOS자동 추가
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
dataset가 생성될 때 dataset의 글로벌 속성에.
*   SOS서버는 보통 표현합니다[단위 단위](#units)이름 *[한국어](https://unitsofmeasure.org/ucum.html)시스템. 이름 *ERDDAP™서버 Express 단위[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)시스템. 두 시스템 사이에서 변환해야하는 경우, 사용할 수 있습니다.[ERDDAPUCUM 단위로 변환하는 웹 서비스UDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)·
#### EDDTable에서SOS스켈레톤 XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThredds파일{#eddtablefromthreddsfiles} 
[ **EDDTableFromThredds파일** ](#eddtablefromthreddsfiles)  (뚱 베어) 여러 변수를 가진 데이터 파일, 각각 하나 이상의 공유 크기 (예를 들면, 시간, 고도 (또는 깊이) , 위도, 경도) , 에 의해 제공[사이트맵OPeNDAP계정 관리](https://www.unidata.ucar.edu/software/tds/)·

* 이 dataset 유형은 입니다 **관련 상품** · 더 새롭고 더 일반적인 솔루션은 사용하기 위한 것입니다[뚱 베어 EDDTable을 위한 FromUrl 선택권 파일 형식](#cachefromurl)  (또는 변형) 원격 파일의 로컬 복사본을 만들고 로컬 파일에서 데이터를 제공합니다. 더 보기&lt;cacheFromUrl&gt; 옵션은 파일 디렉토리와 같은 목록을 게시하는 웹 기반 소스에서 탭 데이터 파일의 모든 유형과 함께 사용할 수 있습니다. **   
어떤 이유로 일할 수없는 경우, Chris. noaaa.gov의 존.
2020년 전 불만이 없는 경우, 이 데이터셋 유형이 제거될 수 있습니다. ** 
* 우리는 강하게 추천합니다[Generate데이터셋 Xml 프로그램](#generatedatasetsxml)거친 초안을 만들기 위해datasets.xml이 dataset에 대한 펑크. 그런 다음 수정할 수 있습니다.
* 대부분의 경우, 각 파일에는 왼쪽의 여러 값이 있습니다. (1 년 전) 예를 들면, 시간.
* 자주 묻는 질문 (하지만 하지 않아도) 다른 차원을 위한 단 하나 가치가 있습니다 (예를 들면, 고도 (또는 깊이) , 위도, 경도) ·
* 파일에는 추가적인 차원과 문자 변수가 있을 수 있습니다. (예를 들어, nCharacters) ·
* THREDDS 서버는 URL의 "/thredds/"에 의해 식별 될 수 있습니다. 예를 들어,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* THREDDS 서버는 다양한 장소에 카탈로그가 있습니다. 이 클래스는 URL이 "/thredds/catalog/"를 포함합니다. 당신은 일반적으로이 변수를 찾을 수 있습니다 루트 카탈로그에서 브라우저에서 시작, 다음을 클릭하여 원하는 subcatalog.
* 이 클래스는 THREDDS가 제공하는 Catalog.xml 파일을 목록으로 읽습니다.&lt;카탈로그Refs (추가 Catalog.xml 하위 파일 참조) 이름 *&lt;데이터셋&gt;s (데이터 파일) ·
* 더 보기&lt;fileDir&gt; 설정은 무시됩니다. 이 클래스 다운로드 이후 각 원격 데이터 파일의 로컬 복사본을 만듭니다.ERDDAP™파일 힘 Dir는 *큰Parent감독* / 복사/ *datasetID* ·.
* 제품 정보&lt;sourceUrl&gt;, THREDDS 서버의 dataset에 대한 Catalog.xml 파일의 URL을 사용, 예를 들어: 웹 브라우저에서 사용할 수있는이 URL의 경우,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020년 10월 21일 이 서버는 더 이상 믿을 수 없습니다.\\]·
제품 정보&lt;sourceUrl· https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/ 한국어sourceUrl·
     (하지만 한 줄에 넣어) ·
* 이 클래스는 항상 다운로드하고 각 원격 데이터 파일의 로컬 복사본을 만들려면이 데이터 세트를 결코 감싸지 않아야합니다.[EDDTable코피](#eddtablecopy)·
* 이 dataset 유형은 OPTIONAL, 드물게 사용된, 특별한 꼬리표를 지원합니다,&lt;특수모드&gt; *지원하다* &lt;/specialMode&gt; 특별한 것을 지정할 수 있는, 하드 코딩된 규칙은 서버에서 다운로드해야 하는 파일을 결정하기 위하여 사용되어야 합니다. 현재, 유일한 유효한 *지원하다* datasets와 함께 사용되는 SAMOS https://tds.coaps.fsu.edu/thredds/catalog/samos 마지막 버전 번호로만 파일을 다운로드합니다.
* 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 정보.
* 1D, 2D, 3D 및 4D 예제를 참조하십시오.[EDDTableFromNcFiles는](#eddtablefromncfiles)·
     
### EDDTable에서WFS파일 형식{#eddtablefromwfsfiles} 
[ **EDDTable에서WFS파일 형식** ](#eddtablefromwfsfiles)  (관련 상품) 모든 데이터의 로컬 복사본을 만듭니다.ArcGISMapServer로 이동WFS서버 그래서 자료는 그 후에 빨리 보존될 수 있습니다ERDDAP™사용자.

* 특별히 형식을 지정해야 합니다.sourceUrl글로벌 특성ERDDAP™서버에서 기능 정보를 요청하는 방법. 이 예제를 템플릿으로 사용하세요:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (하지만 한 줄에 모두 넣어) 
* 특별한 글로벌 속성을 추가해야합니다.ERDDAP™다운로드해야 할 데이터의 펑크의 이름을 식별하는 방법. 이것은 아마도 모든 EDDTable에서 작동합니다.WFS파일 datasets:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* 이 클래스는 항상 다운로드하고 각 원격 데이터 파일의 로컬 복사본을 만들려면이 데이터 세트를 결코 감싸지 않아야합니다.[EDDTable코피](#eddtablecopy)·
* 이 클래스의 슈퍼 클래스를 참조,[EDDTable파일](#eddtablefromfiles), 이 클래스의 작품과 사용법에 대한 추가 정보를 위해.
     
### 연락처{#eddtableaggregaterows} 
[ **연락처** ](#eddtableaggregaterows)"child" EDDTable datasets의 그룹에서 EDDTable dataset를 만들 수 있습니다.

* 다음은 EDDTableAggregateRows의 일부 용도입니다.
    * 당신은 파일을 두 가지 다른 종류의 파일 또는 데이터 소스에서 EDDTableAggregateRows 데이터 세트를 만들 수 있습니다, 예를 들어, 데이터 세트 마지막 달의 끝에 저장.ncCF 파일 및 관계 데이터베이스에 저장된 현재 달에 대한 데이터 세트.
    * EDDTableAggregateRows dataset을 만들 수 있습니다. (예를 들어, 시간 형식 변경, 또는 변수 이름 변경, 또는 데이터 유형/scale\\_factor/ 한국어add\\_offset수정하기) · 이 경우, 어린이는 변경하기 전에 만들어진 파일에서 데이터를 얻을 것이며 다른 어린이는 변경 후 만들어진 파일에서 데이터를 얻을 것이다. EDDTableAggregateRows의 이 사용은 사용하기에 대한 대안입니다.[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)· 파일명에 구별 기능이 없습니다 (그래서 당신은 사용할 수 있습니다&lt;fileNameRegex&gt; 파일을 결정하기 위해, 당신은 아마 다른 디렉토리에 두 개의 어린이 데이터 세트에 대한 파일을 저장해야합니다.
    * 당신은 하나 이상의 유사하지만 다른 데이터 세트의 변수의 공유 하위 설정이있는 EDDTableAggregateRows 데이터 세트를 만들 수 있습니다, 예를 들어, 프로필 데이터 세트의 조합에서 프로파일 데이터 세트를 만드는 데이터 세트, TimeSeriesProfile 데이터 세트, 및 TrajectoryProfile 데이터 세트 (어떤 다른 변수와 일반적인 변수를 가지고 -- 어느 경우 당신은 아이 datasets에 대한 특별한 변형을 만들 필요가, 단지 in-common 변수) ·
    * 여러 독립 데이터 세트가있을 수 있습니다. 각각 같은 유형의 데이터가 있지만 다른 역. 당신은 그 datasets intact를 남겨둘 수 있었습니다, 그러나 또한 역 전부에서 자료가 있는 EDDTableAggregateRows dataset를 창조합니다 -- 아이 datasets의 각각은 간단한 일 수 있었습니다[EDDTableErddap에서](#eddfromerddap)기존의 역 데이터셋 중 하나에 해당합니다. 이 작업을 수행하면 EDDTableFromErddap 데이터 세트의 각각을 다른datasetID원래 독립 데이터 세트보다, 예를 들어, 원래에 "Child"를 승인datasetID·
* 자녀의 각&lt;dataset&gt;'s 지정된 완전한 dataset이어야 합니다. 각은 동일해야합니다.[dataVariable₢ 킹](#datavariable), 동일한 순서에서, 것과 같이[destinationName₢ 킹](#destinationname)·[제품정보 제품정보](#datatype)·[missing\\_value₢ 킹](#missing_value)·[\\_FillValues의 특징](#missing_value)·[단위 단위](#units)· EDDTableAggregateRows 데이터셋의 각 변수에 대한 메타데이터는 첫 번째 자식 데이터셋의 변수에서 제공되지만 EDDTableAggregateRows는 업데이트합니다.[actual\\_range](#actual_range)metadata는 모든 아이들을위한 실제 범위입니다.
* 이름: 독립 데이터셋으로 작업하는 어린이 데이터셋 각각을 가져옵니다. 그런 다음 EDDTableAggregateRows 데이터 세트를 절단하고 붙여 넣기 위해 노력하십시오.datasets.xml새로운 EDDTableAggregate 행 dataset.
* Dataset 기본 정렬 순서 -- 아이 datasets의 순서는 결과의 전반적인 기본 정렬 순서를 결정합니다. 물론, 사용자는 승인 및 결과의 주어진 세트에 대한 다른 종류의 주문을 요청할 수 있습니다.orderBy (· *변수의 comma-separated 목록* ·) 자주 묻는 질문
* "출처"[주요사업 관련 기사](#global-attributes)EDDTableAggregateRows는 첫 번째 어린이 데이터 세트에서 결합된 globalAttributes입니다. EDDTableAggregate의 특징 Rows는 글로벌&lt;addAttributes&gt; 추가 글로벌 속성을 제공하거나 소스 글로벌 속성을 override.
#### 연락처 행 스켈레톤 XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable코피{#eddtablecopy} 
[ **EDDTable코피** ](#eddtablecopy)EDDTable datasets의 많은 유형의 국부적으로 사본을 만들고 그 후에 국부적으로 사본에서 자료를 빨리 보존할 수 있습니다.

* EDDTable코피 (및 그리드 데이터,[EDDGrid이름 *](#eddgridcopy)) 사용 하 고 매우 효과적인 **먼 자료 근원에서 서빙 자료로 가장 큰 문제의 몇몇에 해결책:** 
    * 원격 데이터 소스에서 데이터 액세스는 느립니다.
        * 그들은 느리게 느리기 때문에 (예를 들어, 서버의 효율적인 유형) ·
        * 그들은 너무 많은 요청에 의해 압도적 인,
        * 또는 서버 또는 원격 서버가 제한되는 대역폭이기 때문에.
    * 먼 dataset는 때때로 사용할 수 없습니다 (다시, 다양한 이유로) ·
    * 데이터에 대한 한 소스에 의존하지 않습니다 잘 (예를 들어, 많은 사용자와 많은 경우ERDDAPs 사용) ·
         
* 어떻게 작동 -- EDDTableCopy는 로컬 복사본을 자동으로 만들고 로컬 복사본을 유지함으로써 이러한 문제를 해결합니다.ERDDAP™로컬 복사에서 데이터를 매우 빠르게 제공 할 수 있습니다. 로컬 복사를 사용하여 원격 서버에 부담을 완화합니다. 그리고 로컬 복사본은 원래의 백업이며, 뭔가가 원래에 발생합니다.
    
dataset의 로컬 복사본을 만드는 것에 대해 새로운 것은 없습니다. 여기에 새로운 것은이 클래스가 그것을 만드는 것입니다\\*뚱 베어\\*생성 및\\*제품정보\\*데이터의 로컬 복사\\*·\\*원격 데이터 소스 및\\*메타데이터 추가\\*데이터를 복사하는 동안.
    
#### EDDTableCopy 대&lt;캐시FromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt;는 EDDTableCopy의 대안입니다. 그들은 다르게 작동합니다.

* 연락처 원격 서비스에서 데이터의 펑크를 요청하고 로컬 파일에 해당 펑크를 저장하여 작업합니다. 따라서 EDDTableCopy는 원격 서비스를 통해 데이터가 접근 할 수있는 일부 경우에 유용합니다.
* [기타]&lt;캐시FromUrl&gt;] (#cachefromurl의 경우) 원격 웹 사이트에 나열된 기존 파일을 다운로드합니다.&lt;cacheFromUrl&gt;는 사용하기 쉽고 신뢰할 수 있기 때문에 새로운 원격 데이터 파일이 있거나 원격 데이터 파일이 변경되면 다운로드해야합니다.

EDDTableCopy 또는&lt;cacheFromUrl&gt;는 사용될 수 있었습니다, 사용&lt;cacheFromUrl&gt; 그것은 더 쉽고 믿을 수 있기 때문에.
     
#### &lt;추출물Destination 이름 & gt;{#extractdestinationnames} 
연락처 복사는 원격 데이터셋에서 데이터를 요청하여 데이터의 로컬 복사본을 만듭니다. 연락처 복사는 &distinct을 요청하여 펑크를 결정한다. () 값&lt;추출물DestinationNames&gt; (지정된datasets.xml, 아래 참조) , 원격 데이터셋에서 변수의 space-separated 대상 이름입니다. 예를 들어,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
drifter=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251, ...의 구별 값 조합을 수 있습니다.

한 열이 있는 상황에서 (예를 들면, 단면도) 예를 들어, 프로필은 매우 큰 숫자가 있는 경우, 데이터의 행 그룹을 고유하게 식별해야 할 수 있습니다. 또한 추가 추출물을 지정할 수도 있습니다. 여행 정보 이름 * (예를 들어, drifter) 어떤 역할을 subdivide the profiles. 그것은 주어진 디렉토리에 몇 가지 데이터 파일로 리드, 이는 빠른 액세스로 이어질 수 있습니다.
    
#### 지역 파일{#local-files} 
데이터의 각 척은 별도에 저장됩니다.NetCDF하위 디렉토리에 파일 *큰Parent감독* / 복사/ *datasetID* / 한국어 (지정된[설정.xml](/docs/server-admin/deploy-install#setupxml)) · 모든 것을 위한 1개의 subdirectory 수준이 있습니다 그러나 마지막 extractDestinationName. 예를 들면, tig17+1017를 위한 자료는, 저장될 것입니다
     *큰Parent감독* /copy/sample데이터셋/tig17/1017.nc·
예를 들면, une12+1251를 위한 자료는, 저장될 것입니다
     *큰Parent감독* /copy/sample데이터셋/une12/1251.nc·
데이터 값에서 생성된 디렉토리 및 파일명은 파일명-safe를 만들기 위해 수정됩니다. (예를 들어, 공간은 "x20"로 대체됩니다.) -- 이것은 실제적인 자료에 영향을 미치지 않습니다.
     
#### 새로운 자료{#new-data} 
각 시간 EDDTable 복사는 다시로드, 그것은 어떤 차이를 볼 원격 데이터 세트를 확인합니다. 데이터의 펑크 파일이 이미 존재하지 않는 경우, 펑크가 큐에 추가되는 요청.ERDDAP's taskThread 프로세스 데이터의 펑크에 대한 모든 누적 요청, one-by-one. taskThread의 활동에 대한 통계를 볼 수 있습니다.[상태 페이지](/docs/server-admin/additional-information#status-page)그리고 에서[매일 보고서](/docs/server-admin/additional-information#daily-report)· (예,ERDDAP™이 프로세스에 여러 작업을 할당할 수 있지만, 원격 데이터 소스의 대역폭, 메모리 및 CPU 시간 및 로컬의 많은 사용ERDDAP's 대역폭, 메모리 및 CPU 시간, 좋은 아이디어는 아닙니다.) 
    
참고 : EDDTableCopy가로드 된 첫 번째 시간, (모두 잘 가면) 데이터의 펑크에 대한 많은 요청은 taskThread의 큐에 추가되지만 로컬 데이터 파일이 생성되지 않습니다. 그래서 생성자는 실패하지만 taskThread는 계속 작동하고 로컬 파일을 만들 것입니다. 모든 것이 잘되면 taskThread는 로컬 데이터 파일과 dataset를 다시로드하는 다음 시도를 만들 것입니다. (15 분) 성공하지만, 초기 데이터의 매우 제한된 금액으로.
    
참고 : 로컬 데이터 세트가 몇 가지 데이터가 있으며 귀하의ERDDAP먼 dataset가 일시적으로 또는 영구적으로 접근하지 않는 경우에, 국부적으로 dataset는 아직도 일할 것입니다.
    
경고: 먼 dataset가 크고/또는 먼 서버가 느리면 (그게 문제가 아니라?&#33;) , 그것은 완벽한 현지 사본을 만들기 위하여 장시간을 가지고 갈 것입니다. 일부 경우에, 필요한 시간은 허용되지 않습니다. 예를 들어, T1 라인에 1 TB 데이터를 전송 (0.15 GB / s의) 최적의 조건 하에서 최소 60 일 소요. 또한, 원격 및 로컬 컴퓨터에서 대역폭, 메모리 및 CPU 시간을 많이 사용합니다. 이 솔루션은 원격 데이터 세트의 관리자에게 하드 드라이브를 메일하는 것입니다. s/he는 데이터 세트의 복사본을 만들 수 있으며 하드 드라이브를 다시 메일합니다. 시작점과 EDDTableCopy로 데이터를 추가할 수 있습니다. (Amazon의 EC2 Cloud Service가 문제 처리에 사용되었는지, 시스템에는 대역폭이 많이 있습니다.) 
    
WARNING : 값의 주어진 조합이 원격 데이터셋에서 사라지면 EDDTableCopy는 로컬 복사 된 파일을 삭제하지 않습니다. 당신이 원하는 경우, 당신은 스스로 삭제할 수 있습니다.
    
#### 테이블Copy&lt;checkSource데이터&지;{#tablecopy-checksourcedata} 
더 보기datasets.xml이 dataset를 위해 선택적인 꼬리표가 있을 수 있습니다
```
    <checkSourceData>true</checkSourceData>  
```
기본값은 true입니다. false로 설정한 경우, dataset는 추가 데이터가 있는지 확인하기 위해 소스 데이터셋을 확인하지 않습니다.
     
#### 자주 묻는 질문{#recommended-use} 
1. 이름 *&lt;데이터셋&gt; 이름 * (기본 유형, EDDTableCopy하지) 먼 자료 근원을 위해. **원하는 메타데이터를 포함한 올바르게 작동하십시오.** 
2. 너무 느리면 EDDTableCopy dataset에서 감싸는 XML 코드를 추가하십시오.
    * 다른 용도datasetID  (아마datasetID의 이전datasetID약간의) ·
    * 제출하기&lt;(주) 에&gt;,&lt;reloadEveryNMinutes&gt; 과&lt;onChange&gt; 리모트 EDDTable의 XML에서 EDDTableCopy의 XML에. (EDDTableCopy에 대한 그들의 가치; 내부 dataset에 대한 그들의 값은 유의가된다.) 
    * 이름 *&lt;extractDestinationNames&gt; 태그 (더 보기) ·
    *   &lt;orderExtractBy&gt;는 원격 데이터셋의 대상 변수 이름을 분리한 OPTIONAL 공간입니다. 각 데이터의 펑크가 원격 서버에서 다운로드되면, 펑크는 이러한 변수에 의해 분류됩니다. (첫번째 변수에 의해, 다음 두 번째 변수에 의해 첫 번째 변수가 묶는 경우, ...) · 어떤 경우에,ERDDAP™목록의 첫번째 변수가 숫자 변수인 경우 로컬 데이터 파일에서 데이터를 빠르게 추출할 수 있습니다. ("time"숫자 변수로 계산) · 그러나 dataset에 적합한 방식으로 이러한 변수를 선택합니다.
3.  ERDDAP™데이터의 로컬 복사를 만들고 유지한다.
         
* WARNING: EDDTableCopy는 각 펑크가 변경되지 않는 데이터 값이 있다고 가정합니다. if/when they do, 당신은 수동으로 펑크 파일을 삭제해야 *큰Parent감독* / 복사/ *datasetID* / 변경 및[기본 정보](/docs/server-admin/additional-information#flag)삭제 된 펑크가 교체되는 데이터 세트. dataset에 이메일 구독이 있는 경우, dataset가 먼저 다시로드할 때, dataset가 다시로드할 때, dataset가 다시로드할 때, dataset가 다시로드될 때 두 개의 이메일을 받게 됩니다. (제품정보) 새로운 로컬 데이터 파일을 감지합니다.
     
* 메타데이터 -- 어떤 것을 바꿀 필요가 있는 경우에addAttributes또는 소스 dataset과 관련된 변수의 순서를 변경:
    1. 관련 기사addAttributes소스 dataset에 대한datasets.xml, 필요에 따라.
    2. 복사된 파일 중 하나를 삭제합니다.
    3. 설정하기[기본 정보](/docs/server-admin/additional-information#flag)dataset를 즉시 재로드합니다. 만약 플래그를 사용 하 고 데이터 세트에 이메일 구독이 있는 경우, 두 개의 이메일: dataset first reloads 그리고 데이터를 복사 하기 시작 하는 경우, 그리고 dataset loads 다시 (제품정보) 새로운 로컬 데이터 파일을 감지합니다.
    4. 삭제 된 파일은 새로운 메타 데이터로 재생됩니다. 소스 데이터셋이 사용되지 않는 경우, EDDTableCopy 데이터셋은 재생된 파일로부터 메타데이터를 얻을 것이다.
         
*   [EDDGrid이름 *](#eddgridcopy)EDDTableCopy와 매우 유사하지만 Gridded datasets와 함께 작동합니다.
#### EDDTableCopy 스켈레톤 XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - - -

## 이름 *{#details-1} 

일반적인 태그와 속성의 상세한 설명입니다.

### &lt;angularDegreeUnits&gt;{#angulardegreeunits} 
* [기타] ** &lt;angularDegreeUnits&gt;에 대하여 ** · (#angulardegreeunits의 특징) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml단위 문자열의 comma-separated 목록을 포함ERDDAP™각도 단위로 대우되어야 합니다. 변수가 이러한 단위 중 하나가 있다면,tabledap이름 *orderByMean필터는 특별한 방법으로 의미를 계산합니다. 그런 다음 -180에서 180까지의 값으로 의미를 보여줍니다. 이름 *ERDDAP현재 기본 목록의 EDStatic.java 소스 코드 파일. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
### &lt;angularDegreeTrueUnits&gt;{#angulardegreetrueunits} 
* [기타] ** &lt;주요 특징 학위TrueUnits&gt; ** · (#angulardegreetrueunits의 특징) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml단위 문자열의 comma-separated 목록을 포함ERDDAP™각도 true 단위로 대우해야 합니다. 변수가 이러한 단위 중 하나가 있다면,tabledap이름 *orderByMean필터는 특별한 방법으로 의미를 계산합니다. 즉 0 ~ 360의 값으로 의미를 보여줍니다. 이름 *ERDDAP현재 기본 목록의 EDStatic.java 소스 파일. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
     
### &lt;일반 표준 이름 & gt;{#commonstandardnames} 
* [기타] ** &lt;일반표준이름&gt; ** · (#commonstandardnames는) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml공통의 comma-separated 목록을 지정하기[CF 표준 이름](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)· ₢ 킹
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
이 목록은 사용자의 편의를 위해 DataProviderForm3.html에서 사용됩니다.
이 정보를 제공하려는 경우datasets.xml, 현재 기본 목록을 복사하여 시작&lt;DEFAULT\\_common표준이름&gt; 내 계정ERDDAP이름 *
\\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일.
     
### &lt;캐시Minutes&gt;{#cacheminutes} 
* [기타] ** &lt;캐시미트&gt; ** · (#cache분) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml연령 지정 (몇 분) 캐시에 있는 파일이 삭제되어야 합니다. (기본값=60) · ₢ 킹
```
    <cacheMinutes>60</cacheMinutes>  
```
일반적으로 이미지 파일 만 (동일한 이미지가 종종 반복적으로 요구되기 때문에) 이름 *.nc파일 형식 (사용자가 전송하기 전에 완전히 생성되어야하기 때문에) 캐시입니다. 주어진 요청처럼 보일 수도 있지만 항상 동일한 응답을 반환해야합니다. 사실이 아닙니다. 예를 들어,tabledap시간 포함 요청&gt; *이름 * (주)* 새 데이터가 dataset에 도착하면 변경됩니다. 그리고 포함되는 griddap 요청\\[이름 *\\]새 데이터가 dataset에 도착하면 시간 치수가 변경됩니다. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.

### &lt;캐시ClearMinutes&gt;{#cacheclearminutes} 
* [기타] ** &lt;캐시ClearMinutes&gt; ** · (#cacheclear분) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml캐시된 파일을 확인하고 오래된 것을 제거하는 빈도를 지정하기 위해 (몇 분)   (기본값=15) · ₢ 킹
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
서버가 요청을 처리 할 때 그것은 얼마나 오래 전에 마지막 캐시가 명확했는지 확인하십시오. 너무 오래 전이었다면 TaskThread에서 작업을 수행 할 수 있습니다. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이것은 setup.xml에서 지정할 수 있지만, discouraged입니다.
     
### &lt;변환InterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* [기타] ** &lt;변환InterpolateRequestCSVExample&gt; ** · (#convertinterpolaterequestcsvexample에 대한 의견) OPTIONAL 태그는&lt;erddap데이터셋&gt; 태그 :datasets.xml \\[시작하기ERDDAP™v2.10의\\]Interpolate Converter의 웹 페이지에 표시될 예가 들어 있습니다. 기본 값은: jplMURSST41/analysed\\_에 대해sst/비행기/4 .
### &lt;ConvertInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [기타] ** &lt;ConvertInterpolate데이터셋IDVariableList&gt; ** · (#convertinterpolate데이터셋idvariablelist) OPTIONAL 태그는&lt;erddap데이터셋&gt; 태그 :datasets.xml \\[시작하기ERDDAP™v2.10의\\]CSV 목록을 포함datasetID/variable의 Interpolate 변환기 웹 페이지에 의해 제안으로 사용될 이름 예. 기본 값은: jplMURSST41/analysed\\_에 대해sst·
### &lt;변환ToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [기타] ** &lt;변환ToPublicSourceUrl&gt; ** · (#converttopublicsourceurl에 대해) OPTIONAL 태그는&lt;erddap데이터셋&gt; 태그 :datasets.xml"from"과 "to" 속성을 포함하면 매칭 로컬 변환 방법을 지정합니다.sourceUrl  (일반적으로 IP 번호) 관련 기사sourceUrl  (도메인 이름) . "from" 양식을해야합니다 "\\[이름 *\\]//\\[이름 *\\]· 이 태그의 0 이상이 될 수 있습니다. 더 많은 정보 보기 [&lt;sourceUrl&gt;] (한국어) · 예를 들어,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
해당 지역은sourceUrl  (· https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
관련 기사sourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) ·
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·

그러나, 가입 시스템과 관련된 보안상의 이유로, **이 태그를 사용할 수 없습니다&#33;**   
대신, 항상 공용 도메인 이름을 사용합니다.&lt;sourceUrl&gt; 태그 및 사용[/etc/hosts 테이블](https://linux.die.net/man/5/hosts)서버에서 DNS 서버를 사용하지 않고 로컬 도메인 이름을 IP 번호로 변환합니다. 도메인 이름이 제대로 IP 번호로 변환되면 테스트 할 수 있습니다.
뚱 베어 *일부.domain.name*   
     
### 자료:image/png;base64,{#dataimagepngbase64} 
* 사용자 요청시.htmlTable응답에서ERDDAP™문자열 셀의 데이터가 데이터가 포함되는 경우:image/png;base64, base64 인코딩된 .png 이미지에 따라ERDDAP™아이콘 표시 (그래서 사용자는 이미지를 볼 수 있습니다.) 텍스트 또는 클립보드에 이미지를 저장하는 버튼. 이 기능은 추가되었습니다.ERDDAP™v2.19 으로 Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)때를 제어하는 기본 설정을 지정하고 landmask가 어떻게 그려야 하는지ERDDAP™지도를 그리십시오. 그것은 안으로 3개의 다른 장소에서 지정될 수 있습니다datasets.xml  (가장 높은 우선 순위에서 나열) ::
    
    1. 이름 *drawLandMask안에 지정됩니다&lt;erddap데이터셋&gt; (어떤 dataset도 연결되지 않음) , 그런 다음 기본값을 지정합니다.drawLandMask모든 datasets에서 모든 변수에 대해. 예를 들어,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP지원하다datasets.xml·
이 태그가 존재하지 않는 경우, 기본 값의 밑줄이 아래에 있습니다.
         
    2. 이름 *drawLandMask주어진 dataset의 글로벌 속성으로 지정되며, 기본값을 지정합니다.drawLandMaskdataset의 모든 변수에 대한, 어떤 낮은 우선 순위 설정 overriding. 예를 들어,
    ```
        <att name="drawLandMask">under</att>  
    ```
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™dataset를 다시로드합니다.
         
    3. 이름 *drawLandMask주어진 dataset에 있는 변수의 속성으로 지정되고, 기본값을 지정합니다.drawLandMask그 dataset에서 그 변수에 대한, 어떤 낮은 우선 순위 설정 overriding. 예를 들어,
    ```
        <att name="drawLandMask">under</att>  
    ```
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™dataset를 다시로드합니다.
    
사용자가 기본값을 무시할 수 있습니다. (지정된 위치) dataset's Make A Graph web page에서 드롭다운 목록에서 "Draw land mask"의 값을 선택하거나, &.land=를 포함해서 *제품정보* URL에서 지도를 요청ERDDAP·
    
모든 상황에서는 속성에 대한 4 가지 가능한 값이 있습니다.
    
    * "under"는 맵에 데이터를 그리기 전에 landmask를 그립니다.
gridded datasets를 위해, 땅은 일정한 밝은 회색 색깔로 나타납니다.
tabular datasets를 위해, "under"는 땅과 바다에 topography 자료를 보여줍니다.
    * "over" -- gridded datasets를 위해, “over”는 지도에 자료를 그립니다 후에 landmask를 그립니다. tabular datasets의 경우, "over"는 바다의 목욕과 일정한 빛 회색을 보여줍니다. 땅에 그려진 둘 다.
    * "outline"은 단지 Landmask, 정치 경계, 호수 및 강의 개요를 그립니다.
    * "off"는 아무것도 그리지 않습니다.
### &lt;이메일DiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* [기타] ** &lt;이메일DiagnosticsToErdData&gt; ** · (#이메일diagnosticstoerddata) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml· 태그의 값은 true일 수 있습니다. (기본값) 또는 false. 사실,ERDDAP™Chris에게 스택 추적을 이메일로 보내드립니다. 노아아의 존. 한국어 (이름 *ERDDAP™개발 팀) · 은밀한 정보 없이 안전하고 안전해야 합니다. (예를 들어, requestUrl) 이메일에 포함되어 있습니다. 이것은 NullPointerExceptions로 이어지는 완전히 예기치 않은 버그를 잡을 수 있습니다. 그렇지 않으면 사용자는 예외를 볼 수 있지만ERDDAP™개발 팀은 하지 않습니다 (그래서 우리는 고정 될 필요가 문제가 없다.) ·
     
### &lt;도표BackgroundColor&gt;{#graphbackgroundcolor} 
* [기타] ** &lt;그래프BackgroundColor&gt; ** · (그림 배경색) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml그래프에 기본 배경 색상을 지정합니다. 이것은 거의 모든 그래프에 영향을줍니다. 영향을받지 않는 몇 가지 상황이 있습니다. 색상은 AA, RR, GG 및 BB가 불투명, 빨간색, 녹색 및 파란색 구성 요소 인 양식 0xAARRGGBB에서 8 자리 16 진수 값으로 지정됩니다. "0x"는 민감하지만, 16 진수 자리는 민감하지 않습니다. 예를 들어, 완전한 opaque (₢ 킹) red=22, green=88, blue=ee를 가진 초록색 파란 색깔은 0xff2288ee일 것입니다. Opaque 백색은 0xffffffffffffff입니다. 기본값은 opaque light blue입니다. (0xffccccff의) 백색과 다른 이점이 있는 , 자료를 끌기 위하여 이용되는 많은 팔레트에 있는 중요한 색깔인. 예를 들어,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
### &lt;ip주소MaxRequests&gt;{#ipaddressmaxrequests} 
* [기타] ** &lt;ip주소MaxRequests&gt; ** · (#ipaddress최대 요청) 거의 사용 된 옵션 태그 (첫 번째 지원ERDDAP™v2.12의) 이름 *&lt;erddap데이터셋&gt; 태그 :datasets.xml그것은 시스템의 일부가 과도하게 적극적인 합법적 인 사용자 및 악의적 인 사용자의 능력을 제한하고 다른 사용자의 시스템 성능을 향상시키기 위해 다수의 동시 요청을 만들 수 있습니다. IP주소 MaxRequests는 특정 IP 주소에서 허용되는 최대의 동시 요청을 지정합니다. 추가 요청은 HTTP 429 오류가 발생합니다. 너무 많은 요청. 작은, erddap/download/ 및 erddap/images/에 있는 정체되는 파일은 이 조사에서 면제되지 않습니다. 기본값은 15입니다. 최대 허용 1000, 미끄러운 높은 --하지 않습니다&#33;ERDDAP™많은 합법적인 사용자이기 때문에 숫자를 6 미만 허용하지 않습니다. (웹 브라우저 및WMS회사 소개) 한 번에 최대 6개의 요청을 만듭니다. 더 보기ERDDAP™Daily Report 및 각 Major Dataset Reload의 log.txt 파일에 기록된 유사한 정보는 이제 제목 "Requester's IP Address에서 이러한 IP 주소로 요청의 키가 큰 것을 포함합니다. (너무 많은 요청) ·
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
    
status.html의 "Major LoadDatasets Time Series" 섹션에는 사용자의 IPAddressMaxRequests 설정을 초과하는 요청의 수를 나열하는 "tooMany" 컬럼이 포함되어 있으며 "Too Many Requests" 오류를 보았습니다. 그것은 당신이 쉽게 볼 때 활성 overly 적극적인 합법적 인 사용자와 악의적 인 사용자 그래서 당신은 할 수 (옵션으로) log.txt 파일을 살펴보고 사용자가 블랙리스트를 원하는 경우 결정하십시오.
    
더 높은 숫자로 이것을 설정하는 것은 전혀 틀리지 않습니다. 당신까지입니다. 그러나 그렇게 할 수 / 환경 사람들은 프로젝트에서 일하기 위해 많은 스레드를 사용하는 시스템을 설정하고 그들은 어떤 이득을 얻지 못하는 것에 대한 피드백을 제공하지 않습니다.
### &lt;ip주소MaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [기타] ** &lt;ip주소MaxRequestsActive&gt; ** · (#ipaddress최대 요청) 거의 사용 된 옵션 태그 (첫 번째 지원ERDDAP™v2.12의) 이름 *&lt;erddap데이터셋&gt; 태그 :datasets.xml그것은 시스템의 일부가 과도하게 적극적인 합법적 인 사용자 및 악의적 인 사용자의 능력을 제한하고 다른 사용자의 시스템 성능을 향상시키기 위해 다수의 동시 요청을 만들 수 있습니다. ipAddressMaxRequestsActive는 특정 IP 주소에서 적극적으로 처리 될 동시 요청의 최대 번호를 지정합니다. 추가 요청은 이전 요청이 처리 될 때까지 큐에 앉아 것입니다. erddap/download/ 및 erddap/images/에 있는 작은, 정체되는 파일은 이 조사 및 관련 throttling에서 면제됩니다. 기본값은 2.입니다. 허용되는 최대는 100입니다. -- 그것을하지 마십시오&#33; 이 작업을 1 에 엄격하게 설정할 수 있습니다, 특히 당신이 지나치게 공격하거나 악의적 인 사용자와 문제가있는 경우. 사용자는 여전히 신속하게 그들이 요청하는 모든 데이터를 얻을 것이다 (최대 ipAddressMaxRequests) , 그러나 그들은 hog 체계 자원 할 수 없습니다. 우리는 적극적인 합법적인 사용자와 악의적 인 사용자를 허용하기 때문에 더 큰 숫자로 이것을 설정하는 것이 좋습니다.ERDDAP처리 능력.
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
     
### &lt;ip주소Unlimited&gt;{#ipaddressunlimited} 
* [기타] ** &lt;ip주소무제한&gt; ** · (#ipaddressun 제한) 거의 사용 된 옵션 태그 (첫 번째 지원ERDDAP™v2.12의) 이름 *&lt;erddap데이터셋&gt; 태그 :datasets.xml그것은 시스템의 일부가 과도하게 적극적인 합법적 인 사용자 및 악의적 인 사용자의 능력을 제한하고 다른 사용자의 시스템 성능을 향상시키기 위해 다수의 동시 요청을 만들 수 있습니다. ipAddressUnlimited는 IP 주소의 필수 목록입니다.ERDDAP· 로그인 txt 파일은 서버가 IP 주소를 사용하는 것을 볼 수 있습니다. 일부 서버에서 IP 주소는 형식 #.#.#.#에있을 것입니다. (여기서 #는 0에서 255까지 정수입니다.) ; 다른 곳에서는 형식 # : # : # : # : # : # : # : # : # : # : # · 이 목록에 요청자는 ipAddressMaxRequests 또는 ipAddressMaxRequestsActive 설정 중에는 적용되지 않습니다. 이차 될 수 있습니다ERDDAP™또는 시스템의 특정 사용자 또는 서버.ERDDAP™항상 "을 추가 (unknownIP주소) ", 즉ERDDAP™요청자의 IP 주소가 결정될 수 없는 경우, 예를 들어, 다른 프로세스가 동일한 서버에서 실행될 수 있습니다.
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
    
사용자의 요청의 모든 이유가 오류 메시지 "공정에 대한 타임 아웃 대기"를 얻을 경우, 그런 다음 사용자가 IP 주소에 IP 주소를 추가하여 문제를 해결할 수 있습니다 ipAddressUnlimited 목록, 그 변경 적용, 그 목록에서 제거.
    
### &lt;로드데이터셋Minutes&gt;{#loaddatasetsminminutes} 
* [기타] ** &lt;로드데이터셋Minutes&gt; ** · (#loaddatasetsmin 분) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml최소 시간을 지정하기 (몇 분) 주요 짐 사이 데이터셋 (현재 위치ERDDAP™재처리datasets.xml각 dataset 검사를 포함하여, 그것은 그것의 reloaded에 따라 reloaded 필요로 하는 경우에 everyNMinutes 설정, default=15) · ₢ 킹
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
loadDatasets의 주어진 실행이 시간이 지남에 걸리는 경우, loader는 플래그 디렉토리에서 반복적으로 보이고 나머지 시간이 전달될 때까지 잠을 자릅니다. 기본값은 15 분이며 거의 모든 사람에게 잘해야합니다. 작은 숫자로 이것을 설정하는 유일한 단점은 빈도를 증가시킬 것입니다.ERDDAP™Loaded에서 그들을 방지하는 오류가있는 데이터 세트 (e.g., 원격 서버가 다운) · 이러한 데이터 세트가 많을 경우, 데이터 소스는 pestering/aggressive 행동을 고려할 수 있습니다. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [기타] ** &lt;loadDatasets최대분&gt; ** · (#loaddatasetsmax 분) OPTIONAL 태그는&lt;erddap데이터셋&gt; 태그 :datasets.xml최대 시간을 지정하기 (몇 분) 주요 부하 Datasets 노력은 (짐의 앞에 Datasets 실은 "stalled"로 대우되고 중단됩니다)   (기본값=60) · ₢ 킹
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
일반적으로 데이터셋을 모두 다시로드하는 것이 바람직하게 생각하기 때문에 적어도 두 번 설정해야합니다. (질내 사정) 자주 묻는 질문 (컴퓨터와 네트워크는 때때로 예상보다 느리다) 이것은 loadDatasetsMinutes 보다는 항상 매우 더 길 것입니다. 기본값은 60분입니다. 어떤 사람들은 이것을 더 길게 설정할 것입니다. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.
     
### &lt;로그Level&gt;{#loglevel} 
* [기타] ** &lt;로그레벨&gt; ** · (#로그레블) OPTIONAL 태그는&lt;erddap데이터셋&gt; 태그 :datasets.xml많은 진단 메시지가 log.txt 파일로 전송되는 방법을 지정합니다. "warning"로 설정할 수 있습니다. (가장 적은 메시지) , "정보" (기본값) , 또는 "모든" (가장 큰 메시지) · ₢ 킹
```
    <logLevel>info</logLevel>  
```
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.
     
### &lt;부분RequestMaxBytes&gt; 및&lt;부분RequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [기타] ** &lt;부분RequestMaxBytes&gt; **· (#partialrequestmaxbytes-및partialrequestmaxcells) 그리고 [** &lt;부분RequestMaxCells&gt; ** · (#partialrequestmaxbytes-및partialrequestmaxcells) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml· 현재 위치 (항상 불가능합니다.) ·ERDDAP™큰 데이터 요청을 chunks로 메모리를 입력합니다.
    
32 조금으로Java, 단순 감각에서, 동시의 최대 수 *큰 가슴* 요청은 약 3/4의 메모리 사용 가능 (톰캣에 전달된 Xmx 값) chunk 크기로 나뉩니다. (e.g., 1200 MB / 100 MB =&gt; 12 요청) · 다른 것들은 메모리가 필요하므로 실제 요청 수는 덜 것입니다. 연습에서 chunking은 항상 불가능합니다. 이렇게 거대하거나 몇몇 아주 큰 동시 non-chunkable 요구는 32 조금에 문제를 일으킬 수 있었습니다Java·

64 조금으로Java, -Xmx 가치는 매우 더 큰 일 수 있습니다. 그래서 메모리는 제약이 될 가능성이 훨씬 적습니다.

이 태그를 정의하여 기본 펑크 크기를 무시할 수 있습니다.datasets.xml  (이것보다 다른 값으로) ::
격자를 위해:&lt;부분RequestMaxBytes&gt;100000000&lt;/partialRequest최대 바이트&gt;
테이블을 위해:&lt;부분RequestMaxCells&gt;1000000&lt;/partialRequest최대셀&gt;

partRequestMaxBytes는 부분 그리드 데이터 요청에 대한 바이트의 선호 최대 수입니다. (전체 요청의 펑크) · 기본값=100000000 (10 ^ 8) · 더 큰 크기는 반드시 더 낫지 않습니다 (THREDDS의 기본 제한이기 때문에 500MB 이상 이동하지 마십시오.DAP관련 기사) · 그러나 더 큰 크기는 파일 톤의 몇 가지 액세스가 필요할 수 있습니다. (인기 있는ERD별도의 파일에 각 시간 지점이있는 위성 데이터 - 각 부분 요청에 각 파일에서 더 많은 데이터를 얻는 것이 좋습니다.) ·

부분RequestMaxCells는 세포의 선호한 최대 수입니다 (₢ 킹 nColumns 데이터 테이블) 부분 TABLE 데이터 요청 (전체 요청의 펑크) · 기본 = 100000. 더 큰 크기는 반드시 더 낫지 않습니다. 그들은 더 이상 소스에서 데이터의 초기 배치를 기다립니다.

이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.
     
### &lt;요구Blacklist&gt;{#requestblacklist} 
* [기타] ** &lt;요청Blacklist&gt; ** · (#request블랙리스트)  [OPTIONAL 태그](/docs/server-admin/additional-information#frequent-crashes-or-freezes)이름 *&lt;erddap데이터셋&gt; 태그 :datasets.xml블랙리스트가 될 수 있는 숫자 IP 주소의 comma-separated 목록을 포함합니다. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
    * 이것은 떼어낼 수 있습니다[서비스 공격의 부인](https://en.wikipedia.org/wiki/Denial_of_service), 지나치게[웹 로봇](https://en.wikipedia.org/wiki/Internet_bot), 또는 어떤 다른 유형의 말썽some 사용자.
    * Troublesome 사용자 - 이름 *ERDDAP™크롤링 또는 동결 / 정지로 느리게, 원인은 종종 한 번에 하나의 스크립트를 실행하고 / 또는 큰 숫자를 만들기, 매우 효율적인, 또는 잘못된 요청, 또는 동시 요청. 자세히 보기[로그.txt](/docs/server-admin/additional-information#log)이 경우를 볼 수 있고 문제 발생 사용자의 숫자 IP 주소를 찾습니다. 문제가 있다면, 아마 사용자가 블랙리스트해야합니다.
        
시간 :ERDDAP™블랙리스트 IP 주소에서 요청을 가져옵니다. HTTP 오류 403 : Forbidden을 반환합니다. 동반된 텍스트 오류 메시지는 사용자를 이메일로 권장합니다.ERDDAP관리자, 문제를 해결합니다. 오류 메시지를 읽는 시간을 보내는 경우 (많은 분명히 don't) 그리고 연락을 주시면 한 번에 한 번의 스크립트를 실행하기 위해 작업을 수행 할 수 있습니다. 더 효율적인 요청을 만들고, 그들의 스크립트에서 문제를 해결하십시오. (예를 들어, 원격 데이터셋에서 데이터를 요청하면 타이밍 전에 응답할 수 없습니다.) , 또는 다른 사람은 말썽의 근원이었습니다.
        
사용자는 종종 단순히 그들의 요청이 문제가되는지 모른다. 그들은 종종 버그의 인식, 심한 불임, 또는 그들의 스크립트와 다른 문제. 그들은 종종 당신 때문에 생각ERDDAP™무료 데이터 제공, 그들이 원하는만큼 많은 데이터를 요청할 수 있습니다, 예를 들어, 여러 스크립트를 실행하거나 여러 스레드를 동시에 사용하여.
        
        * 각각 설명할 수 있습니다.ERDDAP™, 이제는 얼마나 크고 강력한, finite 리소스가 (CPU 시간, 하드 드라이브 I/O, 네트워크 대역폭, 등.) 그리고 다른 사용자 또는 overburdens를 군중하는 방법에 있는 1개의 사용자 요구 자료가 공정하지 않습니다ERDDAP·
        * 사용자가 2 동시 요청을 만드는 방법을 알고 있다면, 그들은 종종 5, 10 또는 20 동시 요청을 만들지 않는 이유를 볼 수 없습니다. 추가 요청이 아무것도 비용이 들기 때문에. 비대칭 전쟁처럼 : 여기, 공격 무기는 엄청난 이점을 가지고 (0 비용) 방어 무기 (실제 비용을 가진 finite 임명) ·
        * 다른 사용자의 요청에 더 많은 동시 요청을 만들기 위해 반환을 줄이는 것을 지적합니다. 추가 요청은 다른 사용자의 요청을 차단합니다. 그들은 그들을 위해 거대한 개선을 산출하지 않습니다.
        * 다른 사용자가 있다는 것을 제거 (모두 캐주얼 사용자 및 기타 사용자 실행 스크립트) , 그래서 그것은 그들 모두를 hog에 공정하지 않습니다ERDDAP이름 *
        * 기술 거인이 웹 서비스에서 무한한 리소스를 기대하기 위해 유도 된 사용자를 지적. 설정하는 방법[그리드 / 클러스터 / 불꽃의ERDDAP₢ 킹](/docs/server-admin/scaling)제품정보ERDDAP™더 많은 리소스를 가진 체계, 대부분ERDDAP™관리자는 돈이나 인력이 그런 시스템을 설정하지 않으며 그러한 시스템은 여전히 무한합니다. 으로ERD예를 들어, 한 사람 (뚱 베어) 이름 *ERDDAP™, 투여 2ERDDAP₢ 킹 (내 보스에서 도움) , 및 여러 데이터 소스 관리, 모든 연간 하드웨어 예산 $0 (우리는 하드웨어를 지불 할 수있는 가끔 보조금에 의존) · 이것은 Google, Facebook, Amazon 등 100 명의 엔지니어와 수백만 달러의 매출이 더 큰 시스템에 재활용되지 않습니다. 그리고 우리는 단지 우리의 이동할 수 없습니다ERDDAP™예를 들어, Amazon AWS는 데이터 저장 비용이 크기 때문에 데이터 egress 요금은 크고 가변이며 외부 서비스에 대한 예산이 고정 $0입니다.
        * 사용자에 대한 나의 요청은: non-time-sensitive 요청 (가장 일반적인 케이스에 의해) , 그들의 체계는 다만 1개의 요구를 한 번에 만드야 합니다. 요청이 민감한 경우 (예, 웹 페이지에 여러 .pngs, 여러 타일WMS클라이언트, 등.) , 그 후에 아마 4 동시 요구는 최대이어야 합니다 (매우 짧은 시간 동안) ·
        * 사용자에 대한 상황을 설명하는 경우 대부분의 사용자는 필요한 변경 사항을 확인하여 블랙리스트의 IP 주소를 제거 할 수 있습니다.
             
    * 사용자가 블랙리스트에, IP 주소의 comma-separated 목록에 숫자 IP 주소를 추가&lt;requestBlacklist&gt; 당신의datasets.xml파일. killsome user's IP 주소를 찾으려면ERDDAP™  *큰Parent감독* /logs/log.txt 파일 ( *큰Parent감독* 정의된[설정.xml](/docs/server-admin/deploy-install#setupxml)) 이 경우를 볼 수 있으며 사용자의 IP 주소를 찾을 수 있습니다. 모든 요청에 대한 IP 주소는 "&#123;&#123;&#123;&#123;&#123;#"로 시작하는 라인에 나열되어 있으며, 예를 들어, 123.45.67.8 . "ERROR"에 대한 검색은 잘못된 요청과 같은 문제를 찾을 수 있습니다.
    * IP 주소에서 마지막 번호를 대체할 수도 있습니다.\\*(예를 들어, 202.109.200.\\*) IP 주소의 범위를 차단, 0-255.
    * IP 주소에서 마지막 2 숫자를 대체할 수도 있습니다.\\*·\\*  (예를 들면, 121.204.\\*·\\*) IP 주소의 더 넓은 범위를 차단하기 위해, 0-255.0-255.
    * 예를 들어,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * 재시작할 필요가 없습니다.ERDDAP™변경사항&lt;requestBlacklist&gt; 효과를 가져다줍니다. 변경은 다음 시간을 감지합니다.ERDDAP™reloaded 어떤 datasets 필요든지 검사하십시오. 또는, 당신은 방문해서 과정을 가속화할 수 있습니다[설정Dataset 플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)어떤 dataset든지를 위해.
    * 내 계정ERDDAP™매일 보고서에는 가장 활발한 허용 및 차단 된 요청자 목록을 포함합니다.
    * 도메인/소용이 숫자 IP 주소와 관련되었는지 파악하려면 무료 DNS 웹 서비스를 이용할 수 있습니다.[ https://network-tools.com/ ](https://network-tools.com/)·
    * 더 높은 수준에서 특정 사용자를 차단 할 때 시간이 될 수 있습니다, 예를 들어, 악성 사용자. 예를 들어, 서버의 모든 것에 대한 액세스를 차단할 수 있습니다.ERDDAP· Linux에서 그러한 방법은 다음과 같습니다.[IP 테이블](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/)· 예를 들어, 명령을 사용하여 198.51.100.0에서 오는 모든 것을 차단하는 규칙을 추가 할 수 있습니다.
iptables -I 입력 -s 198.51.100.0 -j 드롭
       
### &lt;SlowDownTroubleMillis&gt;에 대 한{#slowdowntroublemillis} 
* [기타] ** &lt;SlowDownTroubleMillis&gt;에 대하여 ** · (#slowdowntroublemillis의 장점) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xmlmilliseconds 수를 지정하는 정수를 포함합니다. (기본값=1000) 모든 실패 요청에 응답 할 때 일시 중지, 예를 들어, 알 수없는 데이터 세트, 너무 큰 요청, 블랙리스트에 사용자. ₢ 킹
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
스크립트가 다른 후 즉시 하나의 요청을 만들고 있다면, 신속하게 다른 한 가지 나쁜 요청을 만들 수 있습니다. 이 설정으로 실패 스크립트를 느리게 할 수 있습니다.ERDDAP™나쁜 요청으로 홍수가 없습니다. 인간의 나쁜 요청을 만드는 경우, 그들은 심지어이 지연을 통지하지 않습니다. 추천 :
    
    * 문제가 분산 된 Denial Of Service (다운로드) 공격 100 + 공격자, 작은 숫자로 설정 (100개?) · 너무 긴 리드를 너무 많은 활성 스레드로 낮추기.
    * 문제가 1-10 소스에서라면 1000 ms로 설정하십시오. (기본값) , 하지만 더 큰 수 (같이 10000) 또한 적당합니다. 즉, 그들은 더 적은 네트워크 리소스를 낭비. 또한, 1000 ms 또는 그렇게 나쁜 요청을 만드는 성스러운 인간 사용자.
    
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
     
### &lt;구독이메일Blacklist&gt;{#subscriptionemailblacklist} 
* [기타] ** &lt;이름 * 이메일Blacklist&gt; ** · (#subscription이메일블랙리스트) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml즉시 블랙리스트 인 이메일 주소의 comma-separated 목록을 포함[구독 시스템](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions), 예를 들면
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
이것은 케이스 과민한 체계입니다. 이메일 주소가 이 목록에 추가되면, 이메일 주소가 구독이 있는 경우, 구독이 취소됩니다. 이메일 주소가 구독하려면, 요청은 거부됩니다. 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
     
### 표준 텍스트{#standard-text} 
*   [ **표준 텍스트** ](#standard-text)-- 몇몇 OPTIONAL 꼬리표가 있습니다 (가장 드물게 사용) 이름 *&lt;erddap데이터셋&gt; 태그 :datasets.xml다양한 장소에 나타나는 텍스트를 지정ERDDAP· 기본 텍스트를 변경하려면, 같은 이름의 태그에서 기존 값을 복사
     *뚱 베어* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml의 로그인datasets.xml, 다음 내용을 수정합니다. 이것의 이점datasets.xml새로운 값을 언제든지 지정할 수 있습니다.ERDDAP™계속. 이 태그의 값에 대한 모든 변경은 다음 시간이 걸릴 것입니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 태그 이름은 그들의 목적을 설명하지만, 더 깊은 이해를 위해 message.xml의 기본 내용을 참조하십시오.
    
    *   &lt;표준License&gt;
    *   &lt;표준문의&gt;
    *   &lt;표준DataLicenses&gt;
    *   &lt;표준면책OfEndorsement&gt;
    *   &lt;표준면책OfExternalLinks&gt;
    *   &lt;표준 일반 면책사항&gt;
    *   &lt;표준: 개인정보 보호정책
    *   &lt;시작HeadHtml5&gt;
    *   &lt;startBodyHtml5&gt;는 당신의 웹 페이지의 상단의 외관을 사용자 정의하기 위해 좋은 태그입니다ERDDAP· 그렇지 않은, 당신은 쉽게에 임시 메시지를 추가 할 수 있습니다ERDDAP™홈 페이지 (e.g., "새로운 JPL MUR SST v4.1 데이터 세트를 체크 아웃 ..."또는 "이ERDDAP™2019-05-08T17:00:00 PDT - 2019-05-08T20:00:00 PDT) · 이 태그를 넣어의 한 quirkdatasets.xml: 당신이 재시작할 때ERDDAP, 아주 첫번째 요구에ERDDAP™기본값을 반환합니다. BodyHtml5 HTML을 사용하지만, 이후 요청은 startBodyHtml5 HTML을 사용하여 지정됩니다.datasets.xml·
    *   &lt;theShort 묘사 Html&gt;는 당신의 묘사를 주문을 받아서 만들기 위하여 변화하는 좋은 꼬리표입니다ERDDAP· 이 페이지를 쉽게 변경할 수 있습니다. (예, "이ERDDAP™2019-05-08T17:00:00 PDT - 2019-05-08T20:00:00 PDT) ·
    *   &lt;엔드바디Html5&gt;
    
      
이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.
     
### &lt;이름 * 활동 & gt;{#unusualactivity} 
* [기타] ** &lt;특별한활동&gt; ** · (#유연성) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml일반으로 간주되는 LoadDatasets의 두 가지 실행 사이의 최대 요청을 지정하려면 (기본값=10000) · 그 숫자가 초과되는 경우, 이메일은 emailEverythingTo로 보내집니다. (setup.xml에 지정됨) · ₢ 킹
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)· 이전 다음ERDDAP™v2.00, 이것은 여전히 허용되지만 discouraged 인 setup.xml에 지정되었습니다.
     
### &lt;업데이트MaxEvents&gt;{#updatemaxevents} 
* [기타] ** &lt;업데이트MaxEvents&gt; ** · (#updatemaxevents에) 거의 사용되는 OPTIONAL 태그&lt;erddap데이터셋&gt; 태그 :datasets.xml파일 변경 이벤트의 최대 수를 지정하려면 (기본값=10) 그것은에 의해 처리됩니다 [&lt;update모든NMillis&gt;] (#updateeverynmillis의 장점) 대신 dataset를 다시로드하기 전에 시스템. 예를 들어,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
updateEveryNMillis 시스템은 사용자의 요청이 처리되기 전에 매우 신속하게 실행되도록 합니다. 많은 파일 변경 이벤트가 있다면, 아마도 빨리 실행할 수 없습니다, 그래서 그것은 대신 데이터 세트에 대한 호출을 다시로드합니다. 이름 *ERDDAP™대용량 데이터 파일로 변경 될 때도 최신 상태로 유지해야하는 데이터 세트와 거래, 더 큰 숫자로 설정할 수 있습니다 (100개?) ·

### &lt;사용자 & gt;{#user} 
* [기타] ** &lt;사용자&gt; ** · (#사용자) OPTIONAL 태그는&lt;erddap데이터셋&gt; 태그 :datasets.xml사용자의 사용자 이름, 비밀번호 식별 (인증=custom) , 및 역할 (a comma-separated 목록) · 사용자 이름과 암호의 사용은 약간의 값에 따라 다릅니다 [&lt;인증&gt;] (/docs/server-admin/additional-information#authentication) 내 계정ERDDAP's setup.xml 파일.
    * 이것은 부분의ERDDAP이름 *[보안 시스템](/docs/server-admin/additional-information#security)일부 데이터셋에 대한 액세스를 제한하는 경우.
    * 자주 묻는 질문&lt;user&gt; 각 사용자의 태그. 인증=oauth2가 선택적으로 설정할 수 있는 경우&lt;사용자&gt; 각 사용자를 위한 태그: 사용자가 로그인할 때 Google은 Orcid을 통해 사용자 로그를 사용할 때 동일한 역할과 똑같은 역할을합니다.
    * 없음&lt;user&gt; tag for client, s/he will only be able to access public datasets, i.e., datasets which don't have a [&lt;접속하다&gt;] (#액세스) 태그.
    * 이름 *
인증=custom의 경우, 사용자 이름은 일반적으로 문자, 숫자, 밑줄, 기간의 조합입니다.
authentication=email의 경우, 사용자의 이메일 주소입니다. 그것은 어떤 이메일 주소일 수 있습니다.
authentication=google의 경우, 사용자의 전체 Google 이메일 주소입니다. Google 관리 계정이 포함되어 있습니다.@noaa.gov계정.
authentication=orcid의 경우, 사용자의 Orcid 계정 번호입니다. (으로 dashes) ·
인증 = oauth2의 경우, 사용자의 전체 Google 이메일 주소 또는 사용자의 Orcid 계정 번호입니다. (으로 dashes) ·
    * 비밀번호
authentication=email, google, orcid, 또는 oauth2는 비밀번호 속성을 지정하지 않습니다.
인증=custom을 위해 각 사용자의 암호 속성을 지정해야합니다.
        * 사용자가 입력한 암호는 민감하고 8개 이상의 문자를 가지고 있어야 합니다. 요즘 8 문자는 AWS에서 컴퓨터 클러스터를 사용하여 빠르고 저렴하게 부수 될 수 있습니다.ERDDAP™사용자가 로그인할 때만 8-character 최소를 시행합니다.&lt;user&gt; tag is being processing, because that code only sees the hash digest of the password, not the Plaintext password).
        * setup.xml의&lt;비밀번호 비밀번호가 저장되는 방법을 결정합니다.&lt;사용자&gt; 태그들datasets.xml· 보안을 증가시키기 위해 옵션은 다음과 같습니다.
            *   [사이트맵](https://en.wikipedia.org/wiki/MD5)  (이것을 사용하지 마십시오&#33;) -- 암호 속성에 대한, 사용자의 암호의 MD5 해시 소화를 지정합니다.
            * 사이트맵 (이것을 사용하지 마십시오&#33;) -- 암호 속성에 대한, MD5 해시 digest를 지정 *이름 ** ::ERDDAP:: *비밀번호* · 사용자 이름과 "ERDDAP"사용[·](https://en.wikipedia.org/wiki/Salt_(cryptography)) 해시 값, 더 어려운 코드를 디코딩.
            *   [모델: SHA256](https://en.wikipedia.org/wiki/SHA-2)  (참고사항) -- 암호 속성에 대한, 사용자의 암호의 SHA-256 해시 소화를 지정합니다.
            * 모델: UEPSHA256 (기본적으로, 추천된 passwordEncoding. 그러나 훨씬 더 : Google, orchid 또는 oauth2 인증 옵션을 사용하십시오.) -- 암호 속성에 대한, SHA-256 해시 digest를 지정 *이름 ** ::ERDDAP:: *비밀번호* · 사용자 이름과 "ERDDAP"는 해시 값 소금에 사용되며 코드를 더 어렵게 만듭니다.
        * Windows에서 MD5 프로그램을 다운로드하여 MD5 암호 다이제스트 값을 생성할 수 있습니다. (·[사이트맵](https://www.fourmilab.ch/md5/)) 이름 * (예를 들어) ::
md5 - djsmith:ERDDAP:: *실제Password* 
        * Linux/유닉스에서 내장된 md5sum 프로그램을 이용하여 MD5 digest 값을 생성할 수 있습니다. (예를 들어) ::
echo -n "jsmith :ERDDAP:: *실제Password* ·|사이트맵
        * 저장된 Plaintext 암호는 민감한 경우입니다. MD5와 UEPMD5 암호의 저장된 모양은 과민하지 않습니다.
        * 예를 들어 (UEPMD5 사용) 사용자명 = jsmith&lt;user&gt; 태그는:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
저장된 비밀번호가 생성된 곳
md5 - djsmith:ERDDAP:마이비
        * 역할은 사용자가 허가한 역할의 comma-separated 목록입니다. 이름 *&lt;dataset&gt;는 있다 [&lt;접속하다&gt;] (#액세스) dataset에 액세스 할 수있는 역할 목록을 나열합니다. 주어진 사용자 및 주어진 데이터 세트를 위해, 사용자의 역할 목록의 역할 중 하나가 dataset의 명부에 있는 역할의 한을 일치합니다&lt;accessTo&gt; 역할, 그런 다음 사용자는 dataset에 액세스 할 수 있습니다.
            
로그인한 모든 사용자는 자동으로 역할을 합니다.\\[로그인 내 계정\\], 거기는&lt;user&gt; 태그에서datasets.xml또는 아니. 주어진 dataset가 있는 경우에 따라서
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
그런 다음 로그인 한 사용자는 데이터셋에 액세스 할 수 없습니다.&lt;user&gt; 태그에서datasets.xml·
            
    * 이 태그의 값에 대한 변경은 다음 번 효력을 발생합니다.ERDDAP™지원하다datasets.xmldataset에 응답을 포함하여[기본 정보](/docs/server-admin/additional-information#flag)·
         
### &lt;경로Regex&gt;{#pathregex} 
* [기타] ** &lt;경로Regex&gt; ** · (#경쟁) 경로를 제한하는 정규 표현식을 지정할 수 있습니다. (관련 기사) dataset에 포함될 것입니다. 기본값은 .\\*, 모든 경로와 일치합니다. 이것은 드문 사용, 드문 필요, OPTIONAL 태그EDDGridfromFiles datasets, EDDTableFromFiles datasets, 그리고 몇몇 다른 dataset 유형. 그러나, 당신이 그것을 필요로 할 때, 당신은 정말 필요합니다.
    
이 작업을 수행하려면 일반 표현으로 정말 좋습니다. 더 보기[regex 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)이름 *[regex 튜토리얼](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)· 특히, 캡처 그룹에 대해 알아야 할 (괄호 안에 뭔가) , 그리고 "또는" 기호 "|·
함께, 이 옵션을 지정할 수 있습니다, 예, (옵션1|옵션2|옵션3) ·
또한 옵션의 모든 것은 아무것도 할 수 없습니다, 예, (|옵션2|옵션3) ·
또한 캡처 그룹이 배열 될 수 있다는 것을 알고 있어야합니다, 즉, 캡처 그룹에있는 모든 옵션은 다른 캡처 그룹, 예를 들어, (|옵션2 (|옵션2 ₢ 킹|옵션2c) |옵션3) option2는 아무것도, 또는 option2b, 또는 option2c에 의해 따를 수 있다는 것을 말한다.
pathRegexes의 경우, 각 옵션은 /, e.g., bar/에 의해 한 폴더 이름을 따를 것입니다.
    
pathRegex의 까다로운 부분은: 언제ERDDAP™recurs는 디렉토리 트리를 후손으로, pathRegex는 데이터와 디렉토리에 모든 경로가 발생해야합니다. Regex의 둥지 캡처 그룹은이 작업을 처리하는 좋은 방법입니다.
    
예:
다음 디렉토리 구조가 있습니다.
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
그리고 지정된 fileDirectory는 /foo/bar/이고, 우리는 다만 원합니다.ncD 파일\\[0-9의\\]&#123;4&#125;/a/ 하위 디렉토리.
이 솔루션은 pathRegex를 /foo/bar/로 설정하는 것입니다. (|사이트맵\\[0-9의\\]이름 * (|·) )   
말한다:
경로는 /foo/bar/로 시작해야 합니다.
그것은 아무것도 또는 D에 의해 따를 수 있습니다\\[0-9의\\]이름 *
그것은 아무것도 또는 a/에 의해 따를 수 있습니다
    
예, pathRegex의 형태가 매우 어려울 수 있습니다. 갇혀있는 경우, 컴퓨터 프로그래머에게 물어보십시오 (실제 세계에서 가장 가까운 것은 마법사를 묶는 incantations?) 또는 Chris에 이메일을 보내. noaaa.gov에서 존.
    
### &lt;dataset&gt;{#dataset} 
* [기타] ** &lt;데이터셋&gt; ** · (#데이터셋) 옵션은 (그러나 항상 사용) 태그 안에&lt;erddap데이터셋&gt; 태그 :datasets.xml그 (당신이 사이의 모든 정보를 포함 하는 경우&lt;dataset&gt; 및&lt;/dataset&gt;)는 완전히 1개의 dataset를 설명합니다. 예를 들어,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
MAY는 데이터셋 태그의 숫자가 있습니다.datasets.xml파일.
3개의 특성 MAY는 안에 나타납니다&lt;dataset&gt; 태그:
     
    *    **유형 =" *한국어 제품정보* ·** REQUIRED 속성은&lt;dataset&gt; 태그datasets.xmldataset 유형 식별 (예를 들어, 그것이 무엇인지EDDGrid/gridded 또는 EDDTable / tabular 데이터 세트) 데이터의 소스 (예를 들어, 데이터베이스, 파일 또는 원격OPeNDAP계정 관리) · 이름 *[ **Dataset 유형 목록** ](#list-of-types-datasets)·
         
#### 데이터셋 ₢ 킹{#datasetid} 
*   [ **datasetID· *데이터셋ID* ·** ](#datasetid)REQUIRED 속성은&lt;dataset&gt; 태그는 짧은 할당 (보통)&lt;15자), 고유, dataset에 이름을 식별.
    * 더 보기datasetIDs는 문자입니다 (사이트맵) A-Z, a-z, 0-9 및 \\_ (하지만 가장 좋은 경우&lt;총 32자).
    * 데이터셋 ID는 민감하지만 DON'T는 두 가지를 만듭니다.datasetIDs는 위/lowercase 편지에서만 다릅니다. 그것은 Windows 컴퓨터에서 문제를 일으킬 것입니다 (사용자 및/또는 사용자의 컴퓨터) ·
    * 가장 좋은 관행: 자주 묻는 질문[뚱 베어 제품정보](https://en.wikipedia.org/wiki/CamelCase)·
    * 가장 좋은 관행: 우리는 첫 번째 부분은 소스 기관의 이름의 약어 또는 약어이며 두 번째 부분은 dataset의 이름의 약어 또는 약어입니다. 가능한 경우 dataset의 소스명을 반영한 이름을 만듭니다. 예를 들면, 우리는datasetID₢ 킹ssta8day" dataset에 대한NOAA NMFS SWFSC환경연구과 (ERD) 소스에 의해 지정되는 위성/PH/sst8일
    * dataset의 이름을 변경하면 오래된 dataset (이름과 함께) 아직도 살고있다ERDDAP· 이것은 "orphan" dataset입니다.datasets.xml지금 사라. 이것은 다음과 같이 처리해야 합니다:
        1. 제품 정보ERDDAP™v2.19 이상, 당신은 아무것도 할 필요가 없습니다.ERDDAP™자동적으로 이 orphan datasets를 제거합니다.
        2. 제품 정보ERDDAP™v2.18 및 이전, 당신은 orphan datasets를 제거해야: Active="false" dataset, 예를 들면,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
다음 주요 부하 후 데이터 세트, 오래된 dataset이 비활성 후 태그를 제거 할 수 있습니다.
                 
#### 이름 *{#active} 
*   [ **활동 = *한국어* ·** ](#active)OPTIONAL 속성은&lt;dataset&gt; 태그datasets.xmldataset가 활성화되면 나타냅니다. (이용 약관ERDDAP) 또는 아니.
    * 유효한 값은 true입니다. (기본값) 그리고 false.
    * 기본적으로 true이므로, 이 속성을 사용하지 않아도 일시적으로 또는 영구적으로 이 dataset을 제거 할 수 없습니다.ERDDAP·
    * if you just remove active="true" dataset fromdatasets.xml, dataset는 아직도 안으로 활동적일 것입니다ERDDAP™그러나 업데이트되지 않습니다. 그런 dataset는 "orphan"이며 상태에 따라 나열됩니다. html 웹 페이지는 로드에 실패한 datasets의 목록 아래 오른쪽.
    * Active="false"를 설정하면ERDDAP™dataset를 비활성화하면 dataset을 업데이트합니다. 당신이 이것을 할 때,ERDDAP™데이터셋에 대해 저장하고 실제 데이터에 아무것도 할 수 없습니다.
    * dataset을 제거하려면ERDDAP™, 참조[힘 Dataset 제거](/docs/server-admin/additional-information#removing-datasets)·
         

 ** 몇몇 꼬리표는 사이 보일 수 있습니다&lt;dataset&gt; 및&lt;/dataset&gt; 태그. **   
어떤 유형의 datasets에 의해 허용되는 몇몇 변이 있습니다. 특정 문서 보기[dataset의 유형](#list-of-types-datasets)상세 정보

#### &lt;(주) 토 & gt;{#accessibleto} 
* [기타] ** &lt;(주) 으로 ** · (#액세스) OPTIONAL 태그는&lt;dataset&gt; 태그는 comma-separated 리스트를 지정합니다.[이름 *](#user)이 dataset에 액세스 할 수 있습니다. 예를 들어,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * 이것은 부분의ERDDAP이름 *[보안 시스템](/docs/server-admin/additional-information#security)일부 데이터셋에 대한 액세스를 제한하는 경우.
    * 이 태그가 존재하지 않는 경우, 모든 사용자 (로그인하지 않은 경우) 이 dataset에 액세스 할 수 있습니다.
    * 이 태그가 존재하는 경우, 이 dataset는 지정된 역할 중 하나가 있는 로그인된 사용자에 접근할 수 있습니다. 이 데이터셋은 로그인하지 않는 사용자에게 볼 수 없습니다.
    * 로그인한 모든 사용자는 자동으로 역할을 합니다.\\[로그인 내 계정\\], 거기는&lt;user&gt; 태그에서datasets.xml또는 아니. 주어진 dataset가 있는 경우에 따라서
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
그런 다음 로그인 한 사용자는 데이터셋에 액세스 할 수 없습니다.&lt;user&gt; 태그에서datasets.xml·
         
#### &lt;도표AccessibleTo&gt;{#graphsaccessibleto} 
* [기타] ** &lt;그래프AccessibleTo&gt; ** · (#graphsaccessibleto에) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml데이터셋의 그래픽과 메타데이터가 공개될 수 있는지 결정합니다. 그것은 부분적으로 dataset의 [를 override하는 방법을 제공합니다&lt;접속하다&gt;] (#액세스) 설정. 허용된 값은:
    * 자동 -- 이 값 (또는 부재)&lt;graphsAccessibleTo&gt; tag for the dataset)는 dataset의 dataset의 Graphs와 metadata에 접근할 수 있습니다.&lt;accessTo&gt; 설정.
데이터셋이 개인이라면 그 그래프와 메타데이터가 개인이 될 것입니다.
데이터셋이 공개되면 그래프와 메타데이터가 공개됩니다.
    * 한국어 -- 이 설정은 데이터셋의 그래프와 메타데이터를 누구나 접근할 수 있게 해줍니다. 데이터셋이 그렇지 않으면 개인이 있기 때문에 로그인하지 않는 사용자도&lt;accessTo&gt; 태그.
         
#### &lt;(주) 파일 & gt;{#accessibleviafiles} 
* [기타] ** &lt;액세스ViaFiles&gt; ** · (#액세서리) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml제품정보[EDDGridAggregateExisting디멘션](#eddgridaggregateexistingdimension)·[EDDGrid이름 *](#eddgridcopy)·[EDDGridInEDDTable에서](#eddgridfromeddtable)·[EDDGrid언어: en](#eddfromerddap)·[EDDGrid서포토](#eddgridfrometopo)·[EDDGrid파일 형식](#eddgridfromfiles)  (모든 subclasses를 포함) ·[EDDGrid사이드 바이트](#eddgridsidebyside)·[EDDTable코피](#eddtablecopy) [EDDTableErddap에서](#eddfromerddap)·[EDDTable에서EDDGrid](#eddtablefromeddgrid)·[EDDTable파일](#eddtablefromfiles)  (모든 subclasses를 포함) 데이터셋. true 또는 false의 값을 가질 수 있습니다. 예를 들어,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
값이 true인 경우,ERDDAP™사용자가 검색하고 다운로드 할 수 있도록 만들 것입니다 dataset의 소스 데이터 파일 viaERDDAP이름 *["files"시스템](https://coastwatch.pfeg.noaa.gov/erddap/files/)· 이름 *"files"시스템의[관련 기사](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)더 많은 정보.
    
기본 값&lt;액세스ViaFiles&gt; 에 의해&lt;default액세서리ViaFiles&gt; 내 계정[설정.xml](/docs/server-admin/deploy-install#setupxml)· 그것은 거짓의 기본 값이 있지만, true의 값으로 setup.xml에 태그를 추가하는 것이 좋습니다.
    
추천 -- 파일 시스템을 통해 액세스 할 수있는 모든 관련 데이터 세트를 만드는 것이 좋습니다.&lt;defaultAccessibleViaFiles&gt; to true in setup.xml because there is a group of users for who this is a prefer way to get data. 다른 이유로,"files"시스템은 사용자가 파일을 사용할 수 있고 마지막으로 변경 될 때 파일을 볼 수 있도록 쉽게 만듭니다. 따라서 전체 dataset의 자신의 사본을 유지하기 위해 사용하기 쉽습니다. 당신은 일반적으로 파일 시스템을 통해 액세스 할 수있는 데이터 세트를 만들려면, 설정&lt;defaultAccessibleViaFiles&gt; 에 false. 어떤 경우, 그냥 사용&lt;accessViaFiles&gt;는 일반적인 정책 설정에 예외가 되는 몇몇 datasets를 위해&lt;default액세서리ViaFiles&gt; (예를 들어, dataset 사용시[.nc단백질](#ncml-files)파일, 이는 사용자에게 정말 유용하지) ·
     
#### &lt;(주) 이름 *WMS·{#accessibleviawms} 
* [기타] ** &lt;(주) 이름 *WMS· ** · (#액세서리) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml모든 것[EDDGrid](#eddgrid)하위 클래스. 진정한 가치를 가질 수 있습니다. (기본값) 또는 false. 예를 들어,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
값이 false인 경우ERDDAP이름 *WMS서버는 이 dataset를 사용할 수 없습니다. 이것은 일반적으로 180보다 약간 경도가 큰 데이터 세트에 사용됩니다. (기술적으로는 유효하지 않습니다WMS(주)) , 그리고 당신은 또한 범위 -180에서 180까지 경도 가치로 dataset의 변종을 전적으로 제안하는 것을 위해[EDDGrid론PM180](#eddgridlonpm180)·
값이 true인 경우,ERDDAP™dataset을 통해 사용할 수 있도록 노력하겠습니다.ERDDAP이름 *WMS서버. 그러나 dataset가 완전히 unsuitable 인 경우에WMS  (e.g., 경도 또는 고도 자료가 없습니다) , 그 후에 dataset는 통해 유효하지 않을 것입니다ERDDAP이름 *WMS이 설정에 관계없이 서버.
     
#### &lt;더 보기 변수 어디 & gt;{#addvariableswhere} 
* [기타]&lt;addVariablesWhere&gt; 추가하기 (#addvariableswhere의 특징) OPTIONAL 태그는&lt;dataset&gt; 모든 EDDTable datasets를 위한 꼬리표.
    
모든 EDDTable dataset에 요청은 &add를 포함할 수 있습니다 변수 이름 * (· *이름 * 이름 ** · *이름 * 주요 특징* ·) , 어떤 말ERDDAP™dataset에서 모든 변수를 추가하려면 *속성Name=attributeValue* 요청된 변수의 목록에. 예를 들어, 사용자가 추가하면 &add 변수 이름 * (·ioos\\_category","바람") 자주 묻는 질문ERDDAPdataset에서 모든 변수를 추가합니다.ioos\\_category요청된 변수의 리스트에 =Wind 속성 (예를 들면, 풍속, windDirection, windGustSpeed) · *이름 * 이름 ** 이름 * *이름 * 주요 특징* 케이스 과민한.
    
내 계정datasets.xmldataset.xml의 펑크가 있다면
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
예를 들어,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
데이터 액세스 양식 (HTML 웹 페이지) dataset에 대한 위젯을 포함 (comma-separated 목록의 각 속성Name) user가 속성값을 지정할 수 있는 변수의 목록 아래 오른쪽. 사용자가 속성 이름의 하나 이상의 속성 값을 선택하면 &add를 통해 요청에 추가됩니다. 변수 이름 * (· *이름 * 이름 ** · *이름 * 주요 특징* ·) · 그래서,이 태그에datasets.xmldataset을 위한 Data Access Form에 나타나게 되는 속성 이름 목록을 지정하고, 사용자가 add &addVariables를 쉽게 만들 수 있도록 합니다. 요청에 대한 기능. 더 보기 *속성NamesCSV* 목록은 case-sensitive입니다.
    
#### &lt;altitudeMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [기타] ** &lt;위도MetersPerSourceUnit&gt; ** · (#altitudemeterspersourceunit에 관하여) OPTIONAL 태그는&lt;datasets의 dataset&gt; 태그. EDDTable에서 xxmlSOS데이터셋 (만&#33;) 그것은 소스 고도 또는 깊이 값에 의해 곱한 수를 지정하여 고도 값으로 변환 (해수면 위의 미터) · 예를 들어,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
이 태그는 dataset의 수직 축 값이 미터가없는 경우, positive=up. 그렇지 않으면, 기본 값이 1이기 때문에 OPTIONAL입니다. 예를 들어,
    * 소스가 이미 해수면 미터에서 측정되면 1을 사용하십시오. (또는 이 태그를 사용하지 마십시오. 1이 기본 값이기 때문에) ·
    * 소스가 해수면 아래에 미터로 측정되면 -1을 사용하십시오.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * 소스가 해수면 위 km에서 측정되면 0.001을 사용하십시오.
         
#### &lt;defaultDataQuery와 gt;{#defaultdataquery} 
* [기타] ** &lt;기본값DataQuery&gt; ** · (기본 정보) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml이름 *ERDDAP™지정된 쿼리를 사용 ("?" 후 URL의 일부) .html 파일이 있다면 제품정보 (데이터 액세스 양식) 질문 없이 요구됩니다.
    * 당신은 아마 거의 이것을 사용해야합니다.
    * XML-encode가 필요합니다. (% 인코딩) XML 문서에 있기 때문에 기본 쿼리. 예를 들어, &는 &amp; ,&lt;은&lt;, &gt;가 &gt; .
    * 자주 묻는 질문 실수를하고 원하는 것을 얻을 수있는 것은 쉽습니다.ERDDAP™오류를 청소하려고합니다 -- 하지만 그에 의존하지 않습니다, 이후\\*어떻게?\\*변경할 수 있습니다.
    * griddap datasets를 위해, 이것의 일반적인 사용은 다른 과도한 차원 가치를 지정하는 것입니다 (예를 들어,\\[0 댓글\\]대신에\\[이름 *\\]) ·
어떤 경우, 항상 모든 변수를 나열해야, 항상 모든 변수에 동일한 차원 값을 사용, 거의 항상 사용\\[0 댓글\\]·\\[이름 *\\], 또는\\[0:마지막\\]차원 값을 위해.
예를 들면:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * 제품 정보tabledapdatasets, 어떤 제약을 지정하지 않는 경우, 요청은 dataset에 따라 전 dataset을 반환합니다. 어떤 제약을 지정하지 않는 경우, 오히려 빈&lt;기본값DataQuery&gt; (기본값을 지정하지 않는 것과 동일하다 데이터 쿼리) , defaultDataQuery에 포함하려는 모든 변수를 명시적으로 나열해야합니다.
    * 제품 정보tabledapdatasets, this의 가장 일반적인 사용은 다른 기본 시간 범위를 지정하는 것입니다 (최대에 관계되는 (시간 :) , 예를 들면, &time&gt;=max (시간 :) -1일, 또는 현재 상대, 예를 들어, &time&gt;=now-1일) ·
데이터 변수를 요청하는 것은 모든 데이터 변수를 지정하는 것과 동일하므로 일반적으로 새로운 시간 제약을 지정할 수 있습니다.
예를 들면:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
또는
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* [기타] ** &lt;defaultGraphQuery를 ** · (#기본) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml이름 *ERDDAP™지정된 쿼리를 사용 ("?" 후 URL의 일부) .graph 파일 경우 제품정보 (그래프 양식 만들기) 질문 없이 요구됩니다.
    * 당신은 아마 거의 이것을 사용해야합니다.
    * XML-encode가 필요합니다. (% 인코딩) XML 문서에 있기 때문에 기본 쿼리. 예를 들어, &는 &amp; ,&lt;은&lt;, &gt;가 &gt; .
    * 자주 묻는 질문 실수를하고 원하는 것을 얻을 수있는 것은 쉽습니다.ERDDAP™오류를 청소하려고합니다 -- 하지만 그에 의존하지 않습니다, 이후\\*어떻게?\\*변경할 수 있습니다.
    * griddap datasets를 위해, 이것의 일반적인 사용은 다른 과도한 차원 가치를 지정하는 것입니다 (예를 들어,\\[0 댓글\\]대신에\\[이름 *\\]) 그리고/또는 특정 변수가 그래프로 지정합니다.
어떤 경우에, 당신은 거의 항상 사용합니다\\[0 댓글\\]·\\[이름 *\\], 또는\\[0:마지막\\]차원 값을 위해.
예를 들면:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (하지만 한 줄에 모두 넣어) 
    * 제품 정보tabledapdatasets, 어떤 제약을 지정하지 않는 경우, 요청은 dataset에 따라 긴 시간을 걸릴 수있는 전체 dataset을 그래프합니다.
    * 제품 정보tabledapdatasets, this의 가장 일반적인 사용은 다른 기본 시간 범위를 지정하는 것입니다 (최대에 관계되는 (시간 :) , 예를 들면, &time&gt;=max (시간 :) -1일, 또는 현재 상대, 예를 들어, &time&gt;=now-1일) ·
데이터 변수를 요청하는 것은 모든 데이터 변수를 지정하는 것과 동일하므로 일반적으로 새로운 시간 제약을 지정할 수 있습니다.
예를 들면:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
또는
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;차원ValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [기타] ** &lt;제품 설명 가치InMemory&gt; ** · (#dimensionvaluesinmemory에 대하여)   (한국어 (기본값) 또는 false) OPTIONAL 및 거의 사용 된 태그입니다.&lt;dataset&gt; 태그EDDGriddataset 그 말ERDDAP™치수의 소스 값을 유지하는 곳 (또한 알려진axisVariable₢ 킹) ::
    
    * true = 기억 (더 빠른 것은 아니지만 더 많은 메모리를 사용합니다.) 
    * false = 디스크에 (즉, 메모리를 사용하지 않고) 
    
예를 들어,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
이 값은 false 값으로만 사용해야 합니다.ERDDAP™매우 큰 차원을 가진 많은 datasets가 있습니다 (e.g., 수백만의 가치, 예를 들어,EDDGridFromAudioFiles 데이터셋) 이름 *ERDDAP'사용 메모리 사용은 항상 너무 높다. 기억을 보십시오: 현재 선을 사용하여\\[계정 관리\\]/erddap/status.html감시하기ERDDAP™메모리 사용.
     
#### &lt;파일TableInMemory&gt;{#filetableinmemory} 
* [기타] ** &lt;파일TableInMemory&gt; ** · (파일 형식)   (true 또는 false (기본값) ) OPTIONAL 태그는&lt;dataset&gt; 태그EDDGrid파일 및 EDDTable fromFiles dataset에서 말하는 것ERDDAP™fileTable을 유지하는 곳 (각 소스 데이터 파일에 대한 정보) ::
    
    * true = 기억 (더 빠른 것은 아니지만 더 많은 메모리를 사용합니다.) 
    * false = 디스크에 (즉, 메모리를 사용하지 않고) 
    
예를 들어,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
어떤 dataset에 대해 true로 설정하면 메모리에 눈을 유지하십시오. 현재 라인 사용\\[계정 관리\\]/erddap/status.html의 장점ERDDAP™아직도 많은 무료 메모리가 있습니다.
     
#### &lt;fgdcFile&gt; 또는{#fgdcfile} 
* [기타] ** &lt;fgdc파일&gt; ** · (#fgdc파일) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml이름 *ERDDAP™대신 FGDC 파일을 사용하려면ERDDAP™파일을 생성하려고 합니다. 사용법:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *인기있는 파일이름* 로컬 파일 참조 (서버의 파일 시스템에 어딘가) 또는 원격 파일의 URL.
이름 * *인기있는 파일이름* \\=""또는 파일이 발견되지 않습니다. dataset은 FGDC 메타데이터가 없습니다. 따라서 특정 데이터셋을 위한 FGDC 메타데이터를 억제하고 싶다면 유용합니다.
또는, 당신은 둘 수 있습니다&lt;fgdc액티비티&lt;/fgdcActive&gt; setup.xml에 대해ERDDAP™어떤 dataset를 위한 FGDC metadata를 제안하지 마십시오.
     
#### &lt;모델 번호: ISO19115 파일 및 gt;{#iso19115file} 
* [기타] ** &lt;ISO19115파일&gt; ** · (#iso19115파일) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml이름 *ERDDAP™대신 ISO 19115 파일을 사용하려면ERDDAP™파일을 생성하려고 합니다. 사용법:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *인기있는 파일이름* 로컬 파일 참조 (서버의 파일 시스템에 어딘가) 또는 원격 파일의 URL.
이름 * *인기있는 파일이름* \\=""또는 파일이 발견되지 않습니다, dataset는 ISO 19115 메타데이터가 없습니다. 그래서 특정 데이터 세트에 대한 ISO 19115 메타데이터를 억제하려는 경우에도 유용합니다.
또는, 당신은 둘 수 있습니다&lt;ISO19115액티비티&gt;false&lt;/iso19115Active&gt; setup.xml에서ERDDAP™데이터셋에 대한 ISO 19115 메타데이터를 제공하지 않습니다.
     
#### &lt;경기Axis NDigits&gt;{#matchaxisndigits} 
* [기타] ** &lt;경기AxisNDigits&gt; ** · (#matchaxisndigits의 특징) OPTIONAL 태그는EDDGrid &lt;dataset&gt; 태그EDDGrid집계, 예를 들어, 파일의 집계. dataset는 재부팅될 때마다,ERDDAP™집합의 각 성분의 축선 가치는 동일하다는 것을 검사합니다. 시험의 정밀도는 결정됩니다[경기AxisNDigits](#matchaxisndigits)두 배 정밀도 축선 가치, 0 - 18를 시험할 때 일치해야 하는 손가락의 총 수를 지정하는 (기본값) · 플로트 축 값을 테스트 할 때, 테스트는 matchAxisNDigits/2 자리로 수행됩니다. 18세 이상의 가치EDDGrid정확한 시험을 하기 위하여. 0의 값은 말한다EDDGrid어떤 테스트도 할 수 없습니다. 권장되지 않습니다.
    
그러나EDDGrid축 값의 1 세트만 사용할 수 있는 집계의 구성품을 허용한다. 설정은 dataset의 소스 metadata를 제공하는 동일한 구성 요소입니다. 예를 들어,EDDGridfromFiles datasets는, 지정된&lt;metadataFrom&gt; 설정 (default=마지막) ·
    
matchAxisNDigits\\=0의 사용은 모든 검사를 해제하기 때문에 대부분의 경우에 강력하게 discouraged입니다. 최소 검사는 구성 요소가 집계에 적합하기 때문에 유용합니다. 우리는 모든 구성 요소가 적합하다고 가정하지만 항상 그렇게하지 않습니다. 이것은 이렇게 중요한 위생 시험입니다. matchAxisNDigits1, 2, 3 또는 4의 값은 다른 축 값이 종종 구성품이 생성 된 것을 나타내는 것을 나타냅니다. (이름 *) 다른 방법은 따라서 집계에 적합하지 않습니다.
    
matchAxisNDigits\\=0를 사용하는 경우 유용하고 권장됩니다: 원격 파일의 집계, 예를 들어, S3 버킷의 데이터. 이 경우, dataset가 cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, 그리고EDDGridInFiles 시스템[집회 파일 이름](#aggregation-via-file-names-or-global-metadata), 다음EDDGrid원격 파일의 모든 것을 집계 할 필요가 없습니다. 이것은 S3 물통에 있는 자료에서 아주 빨리 적재하기 위하여 만든 datasets를 허용합니다 (자주 묻는 질문EDDGrid모든 파일을 다운로드하고 읽을 수 있습니다) ·
    
#### &lt;nThreads&gt;{#nthreads} 
* 시작하기ERDDAP™버전 2.00, EDDTableFromFiles의 어떤 subclass 또는EDDGrid소스에서 데이터를 읽으십시오. 데이터의 한 척을 읽을 수 있습니다. (e.g., 원 소스 파일) 시간 (1개의 실에서)   (기본값은) 또는 데이터의 1개 이상 chunk (₢ 킹 2+ 소스 파일) 시간 (2개 이상 실에서) 각 요청을 처리하는 동안.
     
    * 엄지의 규칙:
대부분의 시스템에서 대부분의 데이터셋을 위해 nThreads=1, 기본값을 사용합니다. 강력한 컴퓨터가있는 경우 (CPU 핵심의 제비, 기억의 제비) nThreads를 2, 3, 4 또는 더 높은 설정 고려 (하지만 컴퓨터에서 CPU 코어의 수 이상) 장점을 가질 수 있는 datasets:
        
        * 대부분의 EDDTableFromFiles 데이터셋은 혜택을 누릴 수 있습니다.
        * 데이터의 펑크 전에 지연을 일으키는 데이터 세트는 실제로 처리됩니다. 예를 들어:
            * 데이터 세트[외부 압축 (₢ 킹.gz) ](#externally-compressed-files)이름 * (₢ 킹.nc) 파일, 때문에ERDDAP™파일을 읽을 수 있기 전에 전체 파일을 압축해야합니다.
            * 사용 데이터셋[캐시 크기GB](#cachefromurl), 때문에ERDDAP™종종 파일을 다운로드 할 수 있습니다.
            * 대용량 파일 시스템에 저장된 데이터 파일이있는 데이터 세트, 더 많은 데이터를 제공 할 수 있기 때문에, 요청시 빠른. 병렬 파일 시스템의 예는 다음과 같습니다.[사이트맵](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures)·[사이트맵](http://www.pnfs.com/)·[사이트맵](https://en.wikipedia.org/wiki/Gluster), 아마존 S3 및 구글 클라우드 스토리지.
                 
        
경고: nThreads&gt;1을 사용할 때 눈에 유지ERDDAP's Memory use, Thread use, 전반적인 반응성 (이름 *[ERDDAP비밀번호](/docs/server-admin/additional-information#status-page)) · 이 문제에 대한 의견보기.
         
    * 주어진 dataset를 위해, 이 nThreads 조정은 다른 장소에서 올 수 있습니다:
        
        * 만약에datasets.xmldataset의 chunk는&lt;nThreads&gt; 태그 (안으로&lt;dataset&gt; 태그, 글로벌 속성이 아닌) 값 &gt;= 1, nThreads의 값은 사용됩니다. 그래서, 각 dataset에 대한 다른 번호를 지정할 수 있습니다.
        * 그렇지 않으면,datasets.xml한국어&lt;nTableThreads&gt; 태그 (EDDTable를 위해 fromFiles 데이터셋) 또는&lt;nGridThreads&gt; 태그 (제품정보EDDGrid데이터셋) 값으로 &gt;= 1, 외부의&lt;dataset&gt; 태그, nThreads의 값이 사용됩니다.
        * 그렇지 않으면, 1개의 실은, 그것 때문에 안전한 선택입니다 기억의 가장 작은 양을 이용합니다.
             
        
제품정보[이름 *ERDDAP™설치하기](https://coastwatch.pfeg.noaa.gov/erddap/index.html), 우리는 사용합니다
        &lt;nTableThreads를 사용하려면 6개&lt;/nTableThreads&gt;에 대한 자세한 정보 (강력한 서버입니다.) 지금 Difficult 요청은 이전 시간의 30 %를받습니다.
         
##### 감시자 Resource 사용법{#monitor-resource-usage} 
다른 nThreads 설정으로 실험 할 때 (그리고 아마도 어려운 샘플 요청을 당신의ERDDAP) , 당신은 당신의 컴퓨터의 자원 사용법을 감시할 수 있습니다:
* Macs, use Finder : 응용 프로그램 : 유틸리티 : 활동 모니터
* Linux에서 상단 사용
* Windows 10에서, 사용 *Ctrl + Shift + 에스크로* 작업 관리자를 엽니 다
             
##### 경고: 결정된 책임{#warning-decreased-responsiveness} 
고립에서,ERDDAP™nThreads=1보다 더 높은 nThreads 설정으로 dataset에 대한 요청을 수행 할 것입니다. 그러나 그 요청은 처리되고, 다른 사용자의 다른 요청은 다소 혼잡하고 더 느린 응답을 얻을 것이다. 또한, 때ERDDAP™주어진 요청에 응답, 다른 컴퓨팅 리소스 (e.g., 디스크 드라이브 액세스, 네트워크 대역폭) 더 높은 nThreads 설정으로 제한 될 수 있습니다. 따라서 더 높은 nThreads 설정, 전체 시스템 응답은 처리되는 여러 요청이있을 때 악화 될 것입니다 -- 이것은 사용자에게 매우 성가신 될 수 있습니다&#33; 이 때문에: nThreads를 컴퓨터에 있는 CPU 핵심의 수 보다는 더 많은 것 놓지 마십시오. nThreads=1는 각 요구로 공정한 조정입니다 (몇몇 동시 요청 중) 컴퓨팅 리소스의 동등한 공유를 얻을 것이다. 그러나 더 강력한 컴퓨터, 더 적은 이것은 문제가 될 것입니다.
         
##### 경고: 더 높은 기억 제품 정보EDDGrid데이터셋{#warning-higher-memory-use-for-eddgrid-datasets} 
처리 요청이 nThreads 설정에 직접 비례하는 동안 메모리 사용. 엄지의 믿을 수 있는 규칙은: 당신은 놓아야 합니다[ERDDAP's Memory 설정](/docs/server-admin/deploy-install#memory)최소 2GB 이상 + (2GB \\ * nThreads를) · 몇몇 datasets에 몇몇 요구는 그것 보다는 더 많은 기억을 필요로 할 것입니다. 예를 들어 nThreads=3를 설정하면EDDGriddataset는 -Xmx 조정이 적어도 있어야한다는 것을 의미합니다 -Xmx8000M. 그 메모리 설정이 더 큰 경우 3/4 컴퓨터의 물리적 메모리, 메모리 설정을 줄일 수 있도록 nThreads 설정을 감소.

EDDTable datasets에 대한 스레드 처리 요청의 메모리 사용은 일반적으로 훨씬 작기 때문에 거의 항상 낮습니다. 그러나 주어진 EDDTable dataset가 거대한 경우 (e.g., &gt;=1개 GB) 데이터 파일, 위의 의견은 해당 데이터 세트뿐만 아니라 적용됩니다.

nThreads 설정이 무엇이든, 메모리 사용 통계에 가까운 눈을 유지[ERDDAP비밀번호](/docs/server-admin/additional-information#status-page)· 메모리 사용량을 최대화하지 않아야합니다.ERDDAP; 그렇지 않으면 심각한 과실 및 실패가 있을 것입니다.
        
##### Temporarily 1로 설정{#temporarily-set-to-1} 
현재 메모리 사용량이 약간 높으면,ERDDAP™이 요청에 대한 nThreads를 1로 설정합니다. 그래서,ERDDAP™메모리가 scarce 때 보존 메모리.
         
##### 수익 창출{#diminishing-returns} 
nThreads 설정을 증가시키기 위해 리턴이 있습니다 : 2 스레드는 1보다 더 나은 방법입니다 (동적 overclocking을 무시하면) · 그러나 3은 2보다 크다. 그리고 4는 단지 마진 낫습니다 3.

큰 EDDTable dataset에 어려운 쿼리의 한 테스트에서 1, 2, 3, 4, 5, 6 스레드를 사용하는 응답 시간은 38, 36, 20, 18, 13, 11 초였습니다. (이제 nTableThreads=6을 서버에서 사용합니다.) 

nThreads=2: nThreads = 2 대신 nThreads = 2를 지정하는 것이 종종 상당한 이점이 있지만 주어진 사용자 요청에 응답하기 위해 필요한 시계 시간에 많은 차이를 만들 수 없습니다. 이유는: nThreads=1로, 대부분의 현대 CPU의 수시로[동적인 오버 클럭](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (터보 부스트) 일시적으로 CPU의 시계 속도를 증가시킵니다. 따라서 nThreads=1로, 1개의 핵심은 수시로 당신이 nThreads=2를 사용하는 경우에 2개의 핵심의 각 보다는 더 높은 시계 속도로 일할 것입니다. 에 관계없이, 우리는 여전히 nThreads = 2보다 nThreads = 2를 사용하는 것이 좋습니다. nThreads = 1, 그 설정은 다양한 상황에서 더 나은 결과를 가져올 것입니다. 물론, 컴퓨터가 충분한 CPU 코어를 가지고 있다면, 심지어 더 높은 nThreads 설정은 더 나은 결과를 산출해야합니다.

위에서 논의 된 것처럼, 매우 높은 nThreads 설정은 약간의 요청에 대한 빠른 응답으로 이어질 수 있지만 전반적인 감소 위험ERDDAP™responsiveness와 높은 기억 사용 (위와 같이) 그 요청이 처리되는 동안 일반적으로 좋은 아이디어가 아닙니다.
        
##### CPU의 사이트맵{#cpu-cores} 
nThreads를 컴퓨터의 CPU에 있는 CPU 핵심의 수 보다는 더 큰 숫자로 설정하지 않아야 합니다. 완전히 모든 현대 CPU에는 다수 핵심이 있습니다 (예, 2, 4, 8) · 몇몇 컴퓨터에는 다수 CPU가 있습니다 (e.g., 2개의 CPU \\* 4 핵심/CPU = 8개의 CPU 핵심) · 많은 CPU 및 코어가 컴퓨터가 있는지 알아보십시오.

* Mac에서 사용 *옵션 키* : Apple 메뉴 : 시스템 정보
* 리눅스에서, 고양이 /proc/cpuinfo를 사용
* Windows 10에서, 사용 *Ctrl + Shift + 에스크로* 이름 * 작업 관리자 : 성능 (논리적인 가공업자는 CPU 핵심의 총 수를 보여줍니다) 

예, 대부분의 프로세서는 요즘 그들은 코어 당 2 개의 스레드를 지원한다고 말 (이름 *[하이퍼 스레드](https://en.wikipedia.org/wiki/Hyper-threading)) , 그러나 2개의 실은 계산 자원을 공유합니다, 그래서 당신은 무거운 짐의 밑에 CPU에 처리량을 두번 볼 수 없습니다. 예를 들어, 4개의 코어를 가진 1개의 CPU를 가진 컴퓨터는 8개의 실까지 지원 주장할지도 모르지만, nThreads=4를 초과하지 않아야 합니다.ERDDAP· 참고 :

* nThreads 설정ERDDAP™요구 당 입니다.ERDDAP™종종 여러 요청을 동시에 처리합니다.
*   ERDDAP™프로세스 요청, e.g., reload datasets 이외의 것들.
* 시간 :ERDDAP™주어진 요청에 응답, 다른 컴퓨팅 리소스 (e.g., 디스크 드라이브 액세스, 네트워크 대역폭) 제한이 있을 수 있습니다. 더 높은 당신은 nThreads를 설정, 이러한 다른 리소스가 최대화되고 느려질 가능성이 더ERDDAP's 일반 응답.
* 운영 체제는 달리 이외의 것들ERDDAP·

따라서 컴퓨터의 CPU에 있는 핵심의 수 보다는 더 많은 것에 nThreads 조정을 설치하지 않는 것이 최상 입니다.
         
##### 당신의 마일리지 5월 언어 선택 (사이트맵)  {#your-mileage-may-vary-ymmv} 
다른 nThreads 설정의 결과는 다른 시스템에 다른 데이터셋에 크게 다를 것입니다. 다른 nThreads 설정의 효과를 알고 싶다면 현실적인 테스트를 실행하십시오.
         
##### 왜 요청 당 nThreads?{#why-nthreads-per-request} 
나는 당신이 "왜 요청 당 nThreads입니다 왜 생각의 일부를들을 수 있습니까? 나는 이것을 코딩 한 경우, 나는 하나의 영구 노동자 스레드 풀과 더 나은 성능을위한 메시징 큐를 사용합니다." 하나의 노동자 스레드 풀과 메시징 큐를 사용하는 문제는 하나의 어려운 요청이 수많은 느린 작업으로 큐를 홍수 것입니다. 그것은 효과적으로 막을 것입니다ERDDAP™초기 요청이 될 때까지 다른 요청과 관련된 작업에서 작업 시작 (에 의해) 완료. 그래서, 심지어 간단한 후속 요청은 매우 천천히 응답 할 것입니다.ERDDAP요청 당 nThreads의 사용은 컴퓨팅 리소스의 많은 공정한 사용으로 이동합니다.
         
##### nThreads vs. 복수 노동자 컴퓨터{#nthreads-vs-multiple-worker-computers} 
불행히도,ERDDAPnThreads 시스템은 Hadoop 또는 Apache Spark가 일반적으로 사용되는 방식으로 데이터의 펑크에 각 작업과 함께 여러 worker 컴퓨터를 통해 진정한 병렬화만큼 효과적 일 것입니다. 작업이 진정한 병렬화 / 여러 컴퓨터에 분산되면 각 컴퓨터는 작업의 일부에 모든 리소스를 사용할 수 있습니다. 이름 *ERDDAP's nThreads 시스템, 각 스레드는 같은 컴퓨터의 대역폭, 디스크 드라이브, 메모리 등을 위해 계산됩니다. 불행히도, 우리 중 대부분은 자원이나 자금을 설정하거나 임대하지 않습니다. (Amazon 웹 서비스 (사이트맵) 또는 Google Cloud 플랫폼 (사이트맵) ) 컴퓨터의 다량 격자. 또한, 관계 데이터베이스와는 달리 결과 줄을 어떤 순서로 반환 할 수 있습니다,ERDDAP™일관된 순서로 결과를 반환하는 약속. 이 제약은ERDDAPnThreads 구현은 덜 효율적입니다. 한국어ERDDAPnThreads는 많은 경우에 유용합니다.

그러나, 만드는 방법ERDDAP™대규모 요청을 신속하게 처리 할 수 있습니다.[그리드 / 클러스터 / 패딩ERDDAP₢ 킹](/docs/server-admin/scaling)·
         
#### &lt;팔레트 & gt;{#palettes} 
* 시작하기ERDDAP™버전 2.12,datasets.xml수 있습니다.&lt;palettes&gt; 태그 (안에서&lt;erddapDatasets&gt;)는&lt;palettes&gt; 메시지의 태그 값.xml (또는 message.xml 값으로 태그가 있는 경우datasets.xml비어 있는) · 사용 가능한 팔레트 목록을 변경할 수 있습니다.ERDDAP™계속. 그것은 또한 변경을 만들고 당신이 새로운 버전을 설치할 때 persist를 가지고ERDDAP·
경고: 목록에 있는 팔레트datasets.xmlmessage.xml에 나열된 팔레트의 superset이어야 합니다. 그렇지 않으면ERDDAP™예외를 던지고 처리 중지datasets.xml· 이 모든 것을 보장ERDDAP™설치는 적어도 동일한 핵심 팔레트를 지원합니다.
경고:ERDDAP™checks that the palettes files specific in message.xml, 실제로 존재하지만, 그것은에 나열된 팔레트 파일을 검사하지 않습니다datasets.xml· 파일이 존재하는 것을 보장하기 위해 귀하의 책임입니다.
    
또한 시작ERDDAP™버전 2.12, 당신은 cptfiles 하위 디렉토리를 만들 경우ERDDAP™내용 디렉토리,ERDDAP™디렉토리의 모든 \\*.cpt 파일을 복사합니다.\\[뚱 베어\\]/webapps/erddap/WEB-INF/cptfiles 디렉토리 매번ERDDAP™시작하기 그래서, 당신은 그 디렉토리에 사용자 지정 cpt 파일을 넣어 경우, 그 파일에 의해 사용될 것이다ERDDAP™, 당신의 부분에 여분 노력 없이, 당신이 새로운 버전을 설치할 때ERDDAP·
    
경고: 당신이 당신의에 주문 팔레트를 추가하는 경우에ERDDAP™그리고 당신은EDDGridfromErddap 및 / 또는 EDDTableFromErddap 데이터 세트에서ERDDAP™, 그 후에 사용자는 당신의 주문 팔레트 선택권을 위에 볼 것입니다ERDDAP™Graph 웹 페이지를 만들기, 하지만 사용자가 그들을 사용하려고하는 경우, 그들은 기본으로 그래프를 얻을 것이다 (보통 레인보우) 팔레트. 이것은 이미지가 리모트에 의해 합니다ERDDAP™사용자 정의 팔레트가 없습니다. 유일한 해결책은 지금 먼 이메일을 보냅니다ERDDAP™사용자 정의 팔레트를 자신의 / 그녀의에 추가하는 관리자ERDDAP또는 이메일 Chris. noaaa.gov의 존은 팔레트가 표준에 추가되도록 요청합니다.ERDDAP™관련 상품
    
#### &lt;onChange&gt에;{#onchange} 
* [기타] ** &lt;onChange에 대하여 ** · (#오름) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml이 dataset이 생성될 때 동작을 지정합니다. (현재 위치ERDDAP™재시작) 이 데이터셋이 어떤 방법으로 변경할 수 있습니다.
    * 현재EDDGridsubclasses, metadata 또는 축 변수로 변경 (예를 들면, 근실한 시간 자료를 위한 새로운 시간 점) 변화로 간주되지만 dataset의 재부팅은 변경되지 않습니다. (으로 그들) ·
    * 현재, EDDTable subclasses의 경우, dataset의 재부팅은 변경으로 간주됩니다.
    * 현재 두 가지 유형의 작업이 허용됩니다.
        * · http://" 또는 " https://" -- 행동이 시작되면 " http://" 또는 " https://" ·ERDDAP™메시지 보내기HTTP GET지정된 URL에 요청합니다. 응답은 무시됩니다. 예를 들어 URL은 다른 웹 서비스에 대해 뭔가 할 수 있습니다.
            * URL이 쿼리 부분이있는 경우 ("?"후) , 그것은 이미[% 인코딩](https://en.wikipedia.org/wiki/Percent-encoding)· constraints의 특수 문자를 인코딩해야합니다. (초기 '&'와 주 이외의'='제약 분야) HH가 문자의 2 자리 6 진수 값 인 형태 %HH로. 보통, 당신은 단지 몇 가지의 구두 문자를 변환해야합니다: %25 %, & %26, "%22,&lt;%3C로, = %3D로, &gt; %3E로, + %2B로,|%7C로,\\[%5B로,\\]%5D로, %20로 공간, #127 이상의 모든 문자를 UTF-8 양식으로 변환하고 UTF-8 양식의 각 바이트를 %H 형식으로 인코딩합니다. (도움을위한 프로그래머에게 물어보십시오) ·
예를 들어, &stationID&gt;=41004"
은 &stationID%3E=%2241004%22
Percent 인코딩은 일반적으로 액세스 할 때 필요합니다.ERDDAP브라우저 이외의 소프트웨어를 통해. 브라우저는 보통 % 인코딩을 처리합니다.
일부 상황에서는 A-Za-z0-9\\_-&#33;.~ 이외의 모든 문자를 % 인코딩해야합니다. 이름 * () \\*, 아직 초기 '&' 또는 주를 인코딩하지 않습니다'='제약에서.
프로그래밍 언어는 이것을 할 수있는 도구가 (예를 들어, 참조Java이름 *[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)이름 *Java스크립트 [encodeURIComponent()· ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) 거기에
                [웹 사이트 % encode / decode 당신을 위해](https://www.url-encode-decode.com/)·
            * 이름 *datasets.xmlXML 파일이며, 모든 '&', '&lt;', '&gt;' URL에서 '&amp;', '&lt;', and '&gt;'% 인코딩 후.
            * 예: 브라우저로 입력할 수 있는 URL:
                 https://www.company.com/webService?department=R%26D&param2=value2   
지정해야 합니다.&lt;onChange&gt; 태그를 통해 (1개의 선에) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * 우편 번호: -- 행동이 "mailto :"로 시작되면ERDDAP™dataset가 업데이트 / 변경되었는지 나타내는 후속 이메일 주소로 이메일을 보내드립니다.
예를 들면:&lt;이메일:john.smith@company.com&lt;/onChange에 좋은 이유가 있다면ERDDAP™다른 유형의 작업을 지원하려면 원하는 것을 설명하는 이메일을 보내주십시오.
    * 이 태그는 OPTIONAL입니다. 당신이 원하는대로 이 꼬리표의 많은 일 수 있습니다. 이 태그 중 하나를 사용하여 각 작업을 수행 할 수 있습니다.
    * 이것은 아날로그입니다ERDDAP'이메일/URL 구독 시스템, 하지만 이러한 작업은 영구적으로 저장되지 않습니다 (i.e., 그들은 EDD 객체에서만 저장됩니다.) ·
    * 구독을 제거하려면, 그냥 제거&lt;onChange&gt; 태그. 변경은 dataset가 다시로드됩니다.
         
#### &lt;reload 모든NMinutes&gt;{#reloadeverynminutes} 
* [기타] ** &lt;관련 제품 모든 것&gt; ** · (#reloadeveryn분) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml거의 모든 데이터 세트 유형의 데이터 세트는 종종 데이터 세트가 다시로드되어야합니다. 예를 들어,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * 자주 묻는 질문 (예를 들어, 새 데이터 파일 받기) 자주 재부팅되어야 합니다. 예를 들어, 각 60 분.
    * infrequently를 바꾸는 데이터 세트는, 예를 들면, 매 1440 분을 재부팅해야 합니다 (1 일) 또는 10080 분 (주 메뉴) ·
    * 이 태그는 OPTIONAL이지만 권장됩니다. 기본값은 10080입니다.
    * 예는:&lt;다시로드AllNMinutes&gt;1440&lt;관련 제품 모든 것&gt;
    * dataset가 다시로드되면 모든 파일 *큰Parent감독* / 캐시 / *datasetID* 디렉토리는 삭제됩니다.
    * 이 설정되지 않은 경우, dataset는 더 자주로드되지 않습니다.&lt;로드데이터셋Minutes&gt; (기본 = 15) , 안으로 지정되는 것과 같이[설정.xml](/docs/server-admin/deploy-install#setupxml)· Datasets가 매우 자주 재부팅하려면 reloadEveryNMinutes와 LoadDatasets를 둘 다 설정해야 합니다. 작은 값으로 MinMinutes.
    * LoadDatasets와 같은 값으로 reloadEveryNMinutes를 설정하지 마십시오. 사소한 시간이 될 가능성이 있기 때문에 (예를 들어) 14:58 또는 15:02, 그래서 dataset는 주요 재로드의 약 절반에 다시로드됩니다. 대신, 더 작은 사용 (예를 들어, 10) 또는 더 큰 (예를 들면, 20) 관련 제품 EveryNMinutes 값.
    * reloadEveryNMinutes에 대하여, 당신은 수동으로 말할 수 있습니다ERDDAP™가능한 한 빨리 특정 dataset을 다시로드[flag 파일](/docs/server-admin/additional-information#flag)·
    * 커리언스 프로그래머 -- InERDDAP™, 모든 datasets의 reloading는 2개의 단 하나 목적 실에 의해 취급됩니다. 하나의 스레드는 플래그 파일 또는 주요 재로드를 찾을 경우 미성년자 재로드를 시작합니다. (모든 datasets를 확인하여 다시로드해야하는 경우) · 다른 실은 한 번에 datasets의 실제 재부하를 합니다. 이 스레드는 배경에서 작업은 모든 데이터 세트가 최신 상태로 유지된다는 것을 보장합니다. reloads가 dataset의 새로운 버전을 준비하고있는 스레드는 배치로 교환합니다. (atomically 이전 버전 교체) · 그래서 다음과 같은 이벤트의 순서가 발생합니다. (그것은 좋은 일) ::
        
        1.  ERDDAP™dataset를 다시로드 (새 버전 만들기) 배경에서.
        2. User 'A'는 dataset에 요청합니다.ERDDAP™dataset의 현재 버전을 사용하여 응답을 만듭니다. (그것은 좋다. 사용자에 대한 지연이 없으며, dataset의 현재 버전은 매우 stale이어야합니다.) 
        3.  ERDDAP™dataset의 새로운 재로드 된 버전을 만들고 새로운 버전을 생산으로 교환합니다. 이후 모든 새로운 요청은 dataset의 새로운 버전에 의해 처리됩니다. 일관성을 위해, 사용자 A의 요청은 원래 버전에 의해 채워집니다.
        4. User 'B'는 dataset에 대한 요청을 만들고ERDDAP™dataset의 새로운 버전을 사용하여 응답을 만듭니다.
        5. Eventually user A's and user B의 요청이 완료됩니다. (아마 A의 첫 번째 끝, 아마도 B의 첫 번째 끝) ·
        
나는 누군가가 말하는 것을들을 수 있습니다. "Just two thredds&#33; 하&#33; 그것은 라임입니다&#33; 데이터셋의 재부팅이 필요한 만큼 많은 스레드로 사용되도록 설정해야 하므로 모든 것이 빠르고 또는 지연이 없습니다." 예, 아니오. 문제는 한 번에 하나의 데이터 세트를로드하는 것이 몇 가지 어려운 새로운 문제를 만듭니다. 그들은 모두 해결하거나 처리해야합니다. 현재 시스템은 잘 작동하고 문제가 있습니다. (예를 들어, flag 앞에 lag의 잠재력은 공지) · (당신이 그들을 관리하는 데 도움이 필요한 경우, 우리의 참조[더 많은 지원 얻기에 섹션](/docs/intro#support)·) 관련 기사[(주) 모든NMillis](#updateeverynmillis). 체계는 응답 실 내의 작동, 그래서 그것 할 수 있고 갱신되는 다수 datasets에 지도합니다 (전체 재부하) 동시.
##### Proactive 대. 민감{#proactive-vs-reactive} 
ERDDAP'reload system is proactive -- datasets는 다시로드 한 후 곧 다시로드됩니다. EveryNMinutes 시간 (i.e., 그들은 "숨겨진", 하지만 매우 stale) , dataset가 사용자로부터 요청을 받고 있는지 여부. 이름 *ERDDAP™datasets는 항상 최신이고 사용을 위해 준비되어 있습니다. 이것은 THREDDS의 민감하는 접근에 대비합니다. 사용자의 요청은 데이터셋이 stale인지 확인하기 위해 THREDDS를 알려줍니다. (그것은 아주 stale일지도 모릅니다) · 그것이 stale 인 경우, THREDDS는 사용자가 대기합니다. (몇 분 동안 종종) dataset가 다시로드되는 동안.
        
#### &lt;(주) 모든NMillis&gt;{#updateeverynmillis} 
* [기타] ** &lt;update모든NMillis&gt; ** · (#updateeverynmillis의 장점) OPTIONAL 태그는&lt;dataset&gt; 태그datasets.xml어떤 dataset 유형의 도움ERDDAP™매우 자주 변경되는 datasets와 작업 (종종 두 번째로) · 이름 *ERDDAP일반, proactive, [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) 완전히 각 dataset를 다시로드하는 체계를, 이 OPTIONAL 추가 체계는 민감합니다 (사용자 요청에 의해 트리거) 그리고 더 빠른 때문에 incremental (업데이트 될 필요가있는 정보를 업데이트) · 예를 들어, 요청에 따라EDDGridfromDap dataset은 마지막 업데이트 이후 밀리 초의 지정된 수보다 더 발생합니다.ERDDAP™leftmost의 새로운 값이 있는 경우 (첫째, 보통"time") 차원과, 그래서, 다만 사용자의 요구를 취급하기 전에 그 새로운 가치를 다운로드하십시오. 이 시스템은 데이터 소스의 최소 요구와 함께 빠르게 변화하는 dataset up-to-date를 유지하면서 매우 좋습니다. 그러나 약간의 사용자 요청 처리를 느리게하는 비용.
    * 이 시스템을 사용하려면 추가 (예를 들어) ::
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
오른쪽 후&lt;reload모든NMinutes&gt; dataset에 대한 태그datasets.xml· 지정할 수 있는 밀리 초 수는 1로 작을 수 있습니다. (dataset는 항상 최신입니다.) · 0의 값 (기본값) 또는 부정적인 숫자는 체계 떨어져 켭니다.
    * 그들의 증가 자연 때문에, 갱신은 아주 빨리 완료해야 합니다, 그래서 사용자는 장시간을 기다릴 필요가 없습니다.
    * 두 번째 데이터 요청이 이전 업데이트 전에 도착하면 두 번째 요청은 다른 업데이트를 트리거하지 않습니다.
    * 문서를 통해, 우리는 정기적으로 "reload"라는 단어를 사용하려고 할 것입니다, 전체 데이터셋 재로드, 그리고 "update" 이러한 새로운 증가에 대한, 부분 업데이트.
    * 테스트 목적을 위해, 몇몇 진단은 log.txt로 인쇄됩니다 [&lt;로그레벨&gt; (#로그레블) 내 계정datasets.xml"모든"로 설정됩니다.
    * 당신은 incremental 업데이트를 사용하고 특히 leftmost 경우 (1 년 전) 예를 들면, 시간, 축선은 크, 당신 놓고 싶을지도 모릅니다&lt;reloadEveryNMinutes&gt; 더 큰 수에 (1440년?) , 그래서 업데이트는 dataset up-to-date를 유지 하기 위해 작업의 대부분을 수행, 그리고 전체 reloads are done infrequently.
    * Note: 이 새로운 업데이트 시스템 업데이트 메타데이터 (예를 들면, 시간actual\\_range, 시간 \\_coverage\\_end, ...) 하지만 onChange를 트리거하지 않습니다. (이메일 또는 터치 URL) 또는 변경RSS제품정보 (아마 ...) ·
    * subclasses를 사용하는 모든 datasets[EDDGrid파일 형식](#eddgridfromfiles)이름 *[EDDTable파일](#eddtablefromfiles)::
        *    **경고:** 새 데이터 파일을 dataset에 추가하면 디렉토리에 복사하여ERDDAP™봐, 위험이 있음ERDDAP™부분적으로 작성된 파일을 알 수 있습니다. 그것을 읽으려고하지만 파일이 불완전하기 때문에 실패합니다. 파일을 "bad"파일로 선언하고 제거하십시오. (일시 정지) dataset에서.
이를 피하기 위해, 우리는 **STRONGLY 수익** 새 파일을 임시 이름으로 복사 (예를 들면, 20150226.nc뚱 베어) datasets 파일과 일치하지 않는 이름Regex (\\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\.nc) , 다음 올바른 이름에 파일을 이름을 변경 (예를 들면, 20150226.nc) · 이 접근을 사용하는 경우,ERDDAP™임시 파일을 무시하고 제대로 지정된 파일을 알 수 있습니다.
        * 기존의 datafiles를 배치하는 경우 (예를 들어, 새 데이터 포인트를 추가하기) ·&lt;updateEveryNMillis&gt;는 변화가 원자로 나타나는 경우에 잘 작동할 것입니다 (즉시) 그리고 파일은 항상 유효한 파일입니다. 예를 들어 netcdf-java 라이브러리는 "classic"의 무제한 치수에 추가 할 수 있습니다..ncatomically로 만든 v3 파일.
            &lt;updateEveryNMillis&gt;는 변경이 이루어지는 동안 파일이 유효하지 않다면 악화됩니다.
        *   &lt;updateEveryNMillis&gt;는 짧은 시간안에 1개의 몇몇 파일 변화가 있는 datasets를 위해 잘 작동할 것입니다.
        *   &lt;updateEveryNMillis&gt;는 짧은 시간에 있는 파일 변화가 있는 datasets를 위해 자주적으로 작동할 것입니다 (변화가 atomically 나타나지 않는 한) · 이 datasets를 위해, 그것은 사용하지 않는 것이 좋습니다&lt;updateEveryNMillis&gt; 과 설정[기본 정보](/docs/server-admin/additional-information#set-dataset-flag)이름 *ERDDAP™dataset를 다시로드합니다.
        *   &lt;업데이트모든NMillis&gt; 관련 정보를 업데이트하지 않습니다 [&lt;subsetVariables&gt;] (#subsetvariables의 특징) · 정상적으로, 이것은 문제 아닙니다, 때문에subsetVariables자주 변경하지 않는 것들에 대한 정보 (예를 들어, 역 이름, 위도 및 경도 목록) · 만약에subsetVariables데이터 변경 (예를 들어, 새로운 역이 dataset에 추가될 때) , 다음 접촉[플래그 URL](/docs/server-admin/additional-information#set-dataset-flag)dataset에 대해ERDDAP™dataset를 다시로드합니다. 다른 것,ERDDAP™새로운 subset를 알 수 없습니다. dataset가 다시로드 될 때까지 변수 정보 (변수 정보)&lt;reloadEveryNMinutes&gt;).
        * 우리의 일반적인 권고는 다음과 같습니다:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * 로그인 Linux 컴퓨터에서 사용중인 경우&lt;update모든NMillis&gt; 이름 *EDDGridfromFiles 또는 EDDTableFromFiles 클래스, 데이터셋이 로드에 실패한 문제를 볼 수 있습니다. (때때로 또는 일관되게) 오류 메시지 : "IOException : 인스턴스의 사용자 제한이 도달하거나 너무 많은 열린 파일" 원인은 버그가 될 수 있습니다.Javainotify 인스턴스가 수집되지 않습니다. 이 문제는 피ERDDAP™v1.66 이상. 그래서 최고의 솔루션은 최신 버전을 전환하는 것입니다ERDDAP·
문제가 해결되지 않는 경우 (즉, 당신이 사용하는 데이터 세트의 정말 큰 숫자가 있다면&lt;updateEveryNMillis&gt;), 이 문제를 호출하여 수정할 수 있습니다:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
또는 문제가 발생하면 더 높은 숫자를 사용합니다. 시계의 기본은 8192입니다. 인스턴스의 기본값은 128입니다.
    * 당신은 할 수 있습니다&lt;업데이트MaxEvents&gt;10&lt;/업데이트MaxEvents&gt; 내 계정datasets.xml  (상단의 다른 설정으로) 파일 변경의 최대 수를 변경 (기본값=10) updateEveryNMillis 시스템에서 처리됩니다. 더 큰 숫자는 항상 최신 상태로 유지되는 매우 중요한 데이터 세트에 유용합니다. 이름 *[updateMaxEvents 문서](#updatemaxevents)·
    * Curious Programrs의 경우 -- 이러한 incremental 업데이트는 달리ERDDAP전체보기[reload모든NMinutes](#reloadeverynminutes)시스템, 사용자 요청 스레드 내에서 발생. 따라서 데이터셋의 수는 동시에 업데이트될 수 있습니다. 암호가 없습니다 (그리고 자물쇠) 1개의 실만 어떤 주어진 순간든지에 주어진 dataset를 위한 갱신에 작동한다는 것을 보증하기 위하여. 다수 동시 갱신을 허용하는 것은 쉽습니다; 다수 동시 가득 차있는 reload를 허용하는 것은 더 열심히 일 것입니다.
         
#### &lt;소스CanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [기타] ** &lt;소스CanConstrainStringEQNE&gt; ** · (#sourcecanconstrainstringeqne의) EDDTable 내의 OPTIONAL 태그&lt;dataset&gt; 태그datasets.xml소스가 = 및 &#33;= 연산자와 문자열 변수를 제약 할 수 있는지 지정합니다.
    * EDDTableFromDapSequence의 경우, 외부 스태프 문자열 변수에만 적용됩니다. 소스가 내부 순서 변수에 어떤 제약을 처리 할 수 없다는 것을 가정한다.
    * 이 태그는 OPTIONAL입니다. 유효한 값은 true입니다. (기본값) 그리고 false.
    * EDDTableFromDapSequence에 대 한OPeNDAPDRDS 서버는 true로 설정해야 합니다. (기본값) ·
    * EDDTableFromDapSequence에 대 한 Dapper 서버, 이것은 false로 설정해야합니다.
    * 예는:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [기타] ** &lt;소스CanConstrainStringGTLT&gt; ** · (#sourcecanconstrainstringgtlt에 대 한) EDDTable 내의 OPTIONAL 태그&lt;dataset&gt; 태그는 소스가 문자열 변수를 제약 할 수 있는지 지정합니다.&lt;·&lt;=, &gt;, 그리고 &gt;= 연산자.
    * EDDTableFromDapSequence의 경우, 외부 스태프 문자열 변수에만 적용됩니다. 소스가 내부 순서 변수에 어떤 제약을 처리 할 수 없다는 것을 가정한다.
    * 유효한 값은 true입니다. (기본값) 그리고 false.
    * 이 태그는 OPTIONAL입니다. 기본값은 true입니다.
    * EDDTableFromDapSequence에 대 한OPeNDAPDRDS 서버는 true로 설정해야 합니다. (기본값) ·
    * EDDTableFromDapSequence에 대 한 Dapper 서버, 이것은 false로 설정해야합니다.
    * 예는:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;소스CanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [기타] ** &lt;소스CanConstrainStringRegex&gt; ** · (#sourcecanconstrainstringregex는) EDDTable 내의 OPTIONAL 태그&lt;dataset&gt; 태그는 소스가 정규 표현식에 의해 문자열 변수를 변형시킬 수 있는지, 그래서, 연산자는 무엇인가.
    * 유효 값은 "=~"입니다. (이름 *DAP표준:) · (실수로 많은 지원DAP서버 서버) , 또는 " (소스가 정규 표현식을 지원하지 않는 것을 나타냅니다.) ·
    * 이 태그는 OPTIONAL입니다. 기본값은 ""입니다.
    * EDDTableFromDapSequence에 대 한OPeNDAPDRDS 서버는 ""로 설정해야합니다. (기본값) ·
    * EDDTableFromDapSequence에 대 한 Dapper 서버는 ""로 설정해야합니다. (기본값) ·
    * 예는:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct&gt;{#sourcecandodistinct} 
* [기타] ** &lt;소스CanDoDistinct&gt; ** · (#sourcecandodistinct는) EDDTableFromDatabase 내의 OPTIONAL 태그&lt;dataset&gt; 태그를 지정하는 경우 소스 데이터베이스를 처리해야 &distinct () 사용자 쿼리에 제약.
    * 이 태그는 OPTIONAL입니다. 유효 값은 없습니다 (ERDDAP™핸들; 기본값) , 부분 (근원은 명백하고 취급합니다ERDDAP™다시 핸들) , 그리고 그렇습니다 (소스는 구별) ·
    * 아무 것도 사용하되ERDDAP™구별 할 때 메모리에서 실행, 사용 예.
    * 그래와 소스 데이터베이스를 사용하는 경우도 뚜렷하게 처리되며, 사용하지 않습니다.
    * 부분 모두의 최악을 제공합니다 : 그것은 명백한 데이터베이스 처리가 느리기 때문에 느리며 메모리에서 실행할 수 있습니다ERDDAP·
    * 데이터베이스는 결과의 유일한 행에 대한 요청으로 DISTINCT를 해석, whereasERDDAP™결과의 고유 한 행의 정렬 된 목록에 대한 요청으로 해석합니다. 부분 또는 예로 이것을 설정하면ERDDAP™자동적으로 결과를 분류하는 데이터베이스를 말합니다.
    * 결과의 작은 차이 :
없음|부분,ERDDAP™결과의 시작에서 "" 정렬 (non-"의 앞에 끈) ·
예로, 데이터베이스는 할 수 있습니다. (Postgres는) 결과의 끝에 "" 정렬 (non-" strings 후) ·
나는 또한 짧은 단어로 시작하는 짧은 단어의 정렬에 영향을 줄 것 같아요. 예를 들어,ERDDAP™"Simons"의 앞에 "Simon"를 분류합니다.
    * 예는:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;소스CanOrderBy&gt;{#sourcecanorderby} 
* [기타] ** &lt;이름 * 주문제작 ** · (#sourcecanorderby'실제 이름입) EDDTableFromDatabase 내의 OPTIONAL 태그&lt;dataset&gt; 태그를 지정하는 경우 소스 데이터베이스를 처리해야 &orderBy (·) 사용자 쿼리에 제약.
    * 이 태그는 OPTIONAL입니다. 유효 값은 없습니다 (ERDDAP™기타 제품orderBy (·) ; 기본값) , 부분 (소스 핸들orderBy이름 *ERDDAP™다시 핸들) , 그리고 그렇습니다 (소스 핸들orderBy (·) ) ·
    * 아무 것도 사용하되ERDDAP™취급시 메모리를 실행orderBy (·) , 사용 예.
    * 그래와 소스 데이터베이스 핸들을 사용하는 경우orderBy (·) 너무 천천히, 사용하지 않습니다.
    * 부분 모두의 최악을 제공합니다 : 그것은 데이터베이스 취급 때문에 느립니다.orderBy (·) 느리고 메모리를 실행할 수 있습니다.ERDDAP·
    * 결과의 작은 차이 :
없음|부분,ERDDAP™결과의 시작에서 "" 정렬 (non-"의 앞에 끈) ·
예로, 데이터베이스는 할 수 있습니다. (Postgres는) 결과의 끝에 "" 정렬 (non-" strings 후) ·
짧은 단어로 시작하는 짧은 단어의 정렬에 영향을 줄 수 있습니다. 예를 들어,ERDDAP™"Simons"의 앞에 "Simon"를 정렬하지만, 데이터베이스가 정렬하는 방법에 대해 확실하지 않습니다.
    * 예는:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [기타] ** &lt;소스NeedsExpandedFP\\_EQ&gt; ** · (#sourceneedsexpandedfp_eq의 경우) EDDTable 내의 OPTIONAL 태그&lt;dataset&gt; 태그 지정 (한국어 (기본값) 또는 false) 소스가 쿼리에 도움이 필요한 경우&lt;한국어 변수&gt;=&lt;floatPointValue&gt; (및 &#33;=, &gt;=,&lt;=). 예를 들어,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * 일부 데이터 소스의 경우 =, &#33;=,&lt;=, 또는 &gt;= 부동점 번호로 원하는대로 작동하지 않을 수 있습니다. 예를 들어, 경도 = 220.2에 대한 검색은 값이 220.20000000000001로 저장되면 실패 할 수 있습니다.
    * 부동점 번호가 있기 때문에이 문제 발생[컴퓨터에서 정확히 표현하지 않음](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)·
    * sourceNeedsExpandedFP\\_EQ의 경우 true로 설정 (기본값) ·ERDDAP™이 문제를 피하기 위해 데이터 소스에 보내진 쿼리를 수정합니다. 그것은 항상 안전 하 고 정확 하 게이 세트를 떠나.
         
#### &lt;sourceUrl·{#sourceurl} 
* [기타] ** &lt;sourceUrl· ** · (한국어) dataset의 글로벌 내에서 공통 태그&lt;addAttributes&gt; 데이터의 소스인 URL을 지정하는 태그.
    * 예는:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (하지만 한 줄에 모두 넣어) 
    * 내 계정ERDDAP™, 모든 데이터 세트는 "sourceUrl"사용자에 표시된 결합 된 글로벌 속성에서.
    * 대부분의 데이터셋 유형의 경우, 이 태그는 REQUIRED입니다. dataset 유형의 설명을 참조하여이 REQUIRED 또는 아닙니다.
    * 몇몇 datasets를 위해, 분리되는&lt;sourceUrl&gt; 태그가 허용되지 않습니다. 대신 "을 제공해야합니다.sourceUrl·[글로벌 특성](#global-attributes), 일반적으로 글로벌 \\&gt;addAttributes&lt;· 실제 소스 URL이 없는 경우 (예를 들어, 데이터가 로컬 파일에 저장되는 경우) , 이 속성은 종종 placeholder 값, 예를 들어,&lt;이름 ="name"&gt; (지역 파일) &lt;/att&gt; .
    * 대부분의 데이터 세트의 경우 데이터 요청에 사용되는 URL의 기초입니다. 예를 들어,DAP서버는 .dods, .das, .dds 또는 .html이 추가될 수 있는 URL입니다.
    * 이름 *datasets.xmlXML 파일이며, '&'를 인코딩하고, '&lt;', '&gt;' URL에서 '&amp;', '&lt;', '&gt;'.
    * 대부분의 dataset 유형의 경우,ERDDAP™원래 추가sourceUrl  (소스 코드의 "localSourceUrl") 으로[글로벌 특성](#global-attributes)  (소스 코드에서 "publicSourceUrl"가되는 곳) · 데이터 소스가 로컬 파일일 때,ERDDAP™더 보기sourceUrl· (지역 파일) "글로벌 속성에 보안 precaution. 데이터 소스가 데이터베이스일 때,ERDDAP™더 보기sourceUrl· (소스 데이터베이스) "글로벌 속성에 보안 precaution. 데이터셋의 일부가 비공개를 사용한다면sourceUrl이름 * (일반적으로 자신의 컴퓨터가 DMZ 또는 현지 LAN에 있기 때문에) 사용할 수 있습니다 [&lt;변환ToPublicSourceUrl&gt;] (#converttopublicsourceurl에 대해) 로컬 변환 방법sourceUrls 에 공공sourceUrl₢ 킹
    * ·sourceUrl시작하기http://·https://, ftp://, 아마 다른 접두사.https연결이 읽고 소스의 디지털 인증서를 확인하고 소스가 그들이 말하는 누구인지 확인합니다. 드문 경우, 이 체크는 오류 "javax.net.sssl.SSLProtocolException: handhake alert: uncognized\\_name"로 실패할 수 있습니다. 이것은 아마도 당신이 사용하는 도메인 이름과 일치하는 인증서의 도메인 이름 때문에. 당신은 할 수 있고 세부 사항을 읽어야한다sourceUrl웹 브라우저의 인증서, notably, the list of "DNS Name"s in the "Subject Alternative Name"섹션.
        
어떤 경우,sourceUrl당신은 인증서에 도메인 이름의 별명이 될 수 있습니다. 예를 들어,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ 이 오류를 발생하지만,
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , 인증서의 도메인 이름을 사용하는 것은 원하지 않습니다. 이 경우의 해결책은 그러므로 인증서에 도메인 이름을 찾아내고 사용합니다. 인증서에 찾을 수없는 경우 데이터 공급자에 문의하십시오.
        
다른 경우, 인증서의 도메인 이름은 이름의 그룹에있을 수 있습니다. 이 발생하거나 문제가 그렇지 않으면 해지지 않는 경우 Chris에게 이메일을 보내주십시오. noaaa.gov의 존은 문제를보고.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [기타] ** &lt;addAttributes· ** · (#addattributes를 추가) 각 dataset에 대한 OPTIONAL 태그이며 각 변수에 대한ERDDAPadministrators는 dataset 및 그 변수와 관련된 메타데이터 속성을 제어합니다.
    *   ERDDAP™dataset의 소스에서 속성을 결합 ("sourceAttributes"에 대해) 그리고 "addAttributes" 당신은 정의datasets.xml  (우선 순위) "combinedAttributes"를 만들기 위해, 이는 무엇인가ERDDAP™사용자 참조. 따라서, 당신은 사용할 수 있습니다addAttributessourceAttributes의 값을 redefine하고, 새로운 속성을 추가하거나 속성을 제거하십시오.
    * 더 보기&lt;addAttributes&gt; 태그가 0 이상 닫힙니다. ** &lt;사이트맵 ** subtags는 개별 속성을 지정하는 데 사용됩니다.
    * 각 속성은 이름과 값으로 구성됩니다. (예를 들어, 더블) ·
    * 주어진 이름과 하나의 속성만 가질 수 있습니다. 더 많은 경우, 마지막 하나는 우선 순위가 있습니다.
    * 값은 단일 값 또는 값의 공간 변환 목록일 수 있습니다.
    * 옵션 정보
        * 의 순서&lt;att&gt; subtags 안에addAttributes중요하지 않습니다.
        * 더 보기&lt;att&gt; subtag 체재는 입니다
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * 모든 속성의 대상 이름 MUST 문자로 시작 (사이트맵) 그리고 MUST는 문자 A-Z, a-z, 0-9, 또는 '\\_'만 포함합니다.
        * 이름 *&lt;att&gt; subtag에는 값이 없거나 null 값이 없다. 속성은 결합 속성에서 제거된다.
예를 들어,&lt;att name="rows" /&gt;는 결합 된 속성에서 행을 제거합니다.
예를 들어,&lt;att name="coordinates"&gt;누들&lt;/att&gt;는 결합 된 속성에서 좌표를 제거합니다.
##### 이름 * 제품정보{#attributetype} 
* [OPTIONAL 타입 값&lt;att&gt; 하위 태그] (#attribute 유형) 값의 데이터 유형을 나타냅니다. 기본값은 문자열입니다. 문자열 속성의 예는:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * 단일 값의 유효 유형은 바이트입니다. (8 비트 정수) , 짧은 (16비트 서명 정수) , 인치 (32비트 서명 정수) , 긴 (64 비트 서명 integer) , 부유물 (32 비트 부동점) , 더블 (64 비트 부동점) , 숯 및 문자열. 예를 들어,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
이 노트를 참조하십시오.[char 데이터 유형](#char)·
이 노트를 참조하십시오.[긴 데이터 유형](#long)·
        
    * space-separated 값에 대한 유효한 유형 (또는 단일 값) byteList, shortList, unsignedShortList, charList, intList, longList, floatList, 더블 이름 * 예를 들어,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
unsignedShortList는 지정되지 않은 단락의 목록을 지정하지만 해당 유니코드 문자 목록으로 변환됩니다 (예 : "65 67 69" "A C E"로 변환됩니다.
charList를 지정하면 특별한 문자(예: 공백, 더블 인용, backslash,&lt;#32, 또는 &gt;#127) 당신은 NCCSV 파일의 데이터 섹션에서 인코딩 할 것 (e.g., ", "\"또는 """, "\\\\", "\\n", "\\u20ac") ·
stringList는 없습니다. 문자열 값을 멀티 라인 문자열로 저장합니다. 예를 들어,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### 글로벌 기여{#global-attributes} 
* [기타] ** Global Attributes / 글로벌&lt;addAttributes· ** · (#글로벌) --
    &lt;addAttributes&gt; 내의 OPTIONAL 태그입니다&lt;dataset&gt; 태그 전체 dataset에 적용 속성을 변경하는 데 사용됩니다.
    
    *    ** 글로벌&lt;addAttributes&gt; dataset의 글로벌 속성을 변경합니다. ** ERDDAP™dataset의 소스에서 글로벌 속성을 결합 (** 소스Attributes **) 및 글로벌** addAttributes **당신이 정의하는datasets.xml  (우선 순위) 글로벌** 관련 기사 ** , 무엇ERDDAP™사용자 참조. 따라서, 당신은 사용할 수 있습니다addAttributessourceAttributes의 값을 redefine하고, 새로운 속성을 추가하거나 속성을 제거하십시오.
    * 보기 [ ** &lt;addAttributes· **이름 * (#addattributes를 추가) 글로벌 및 변수에 적용** &lt;addAttributes· ** ·
    *   [사이트맵](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)이름 *[ISO 19115-2/19139에](https://en.wikipedia.org/wiki/Geospatial_metadata)메타데이터 -- 일반적으로,ERDDAP™ISO 19115-2/19139 및 FGDC를 자동으로 생성합니다. (FGDC-STD-001-1998년) dataset의 metadata에서 정보를 사용하는 각 dataset의 XML 메타데이터 파일. 그래서, **좋은 dataset metadata는 좋은 지도합니다ERDDAP- ISO 19115 및 FGDC 메타데이터 생성 데이터셋의 메타데이터 개선을 위해 시간과 노력의 제비를 고려하십시오. (어쨌든 할 수있는 좋은 일) ·** 대부분의 데이터셋 메타데이터 속성은 ISO 19115 및 FGDC 메타데이터를 생성하는 데 사용됩니다.[ACDD 메타데이터 표준](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)아래에서
    * 많은 글로벌 특성은 특별한 점입니다.ERDDAP™그들에 대 한 보고 다양 한 방법으로 그들을 사용. 예를 들어, 링크infoUrldatasets 및 기타 장소 목록이있는 웹 페이지에 포함되어 있으므로 데이터 세트에 대해 더 많은 정보를 찾을 수 있습니다.
    * user selects the subset of data, 변수의 경도, 위도, 고도와 관련된 globalAttributes (또는 깊이) , 및 시간 범위 (예를 들어, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) 자동 생성 또는 업데이트.
    * 간단한 샘플 글로벌&lt;addAttributes&gt;는:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
빈 cwhdf\\_version 속성은 소스 cwhdf\\_version 속성을 원인 (이름 *) 마지막으로, 속성의 결합 목록에서 제거됩니다.
    * 이 정보를 공급하는 데 도움이ERDDAP™더 나은 일을 하고 사용자는 datasets를 이해합니다.
좋은 metadata는 dataset usable 만듭니다.
metadata는 dataset 쓸모가 있습니다.
metadata 속성에 좋은 일을 할 시간을 가져 가라.
##### 특수 글로벌 특성ERDDAP™
###### 회사연혁{#acknowledgement} 
*   [ **회사연혁** ](#acknowledgement)이름 * **채용 정보**   (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 지원되는 그룹 또는 그룹을 인정하는 RECOMMENDED 방법입니다 (, 금융) 이 데이터를 생성하는 프로젝트에 대해. 예를 들어,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
ACDD 1.0 및 1.1은 맞춤법 "acknowledgment"을 사용 (미국의 일반적인 철자입니다.) , 그러나 ACDD 1.3이 "가상"으로 변경 (U.K의 일반적인 맞춤법입니다.) · 내 이해는 변화가 근본적으로 사고 이었기 때문에 그들은 확실히 변화의 확대를 인식하지 못했습니다. 어떤 메시&#33; 이제 "acknowledgment"와 "acknowledgement"가 있는 수백만 개의 데이터 파일이 있습니다. 이 강조는 표준에 "simple"변경의 폴리를 강조하고 표준의 안정성을 강조합니다. ACDD 1.3부터 (ACDD의 버전은ERDDAP™지원하다) 말한다 "acknowledgement", 그게 무엇인가ERDDAP™  (믿을 수 있는 GenerateDatasets 사이트맵) 감사합니다.
     
###### cdm\\_altitude\\_proxy를 설정한다.{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy를 설정한다.** ](#cdm_altitude_proxy)고도 또는 깊이 변수가 없는 EDDTable datasets를 위해서만, 고도 또는 깊이에 대한 프록시인 변수가 있다. (예를 들어, 압력, sigma, BottleNumber) , 이 속성을 사용하여 변수를 식별 할 수 있습니다. 예를 들어,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
만약에[cdm\\_data\\_타입](#cdm_data_type)프로파일 또는 TrajectoryProfile은 고도 또는 깊이 변수가 없습니다. cdm\\_altitude\\_proxy MUST는 정의됩니다. cdm\\_altitude\\_proxy가 정의된 경우,ERDDAP™다음 metadata를 변수에 추가합니다. \\_Coordinate AxisType=높이와 축=Z.
     
###### cdm\\_data\\_타입{#cdm_data_type} 
*   [ **cdm\\_data\\_타입** ](#cdm_data_type)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 글로벌 속성은Unidata [일반 데이터 모델](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)dataset에 대한 데이터 유형. 예를 들어,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM은 여전히 진화하고 다시 변경할 수 있습니다.ERDDAP™관련 및 자세한 내용을 준수[분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)의 장[CF 1.6의](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata 협약 (이전에 CF Point Observation Conventions를 호출) ·
    * dataset의 글로벌[소스Attributes](#global-attributes)또는 글로벌&lt;addAttributes· MUST는 cdm\\_data\\_type 속성을 포함합니다. 몇몇 dataset 유형 (EDDTable 처럼 오비스) 이 자동적으로 설정한다.
    * 제품 정보EDDGriddatasets, cdm\\_data\\_type 옵션은 그리드입니다. (기본적으로 가장 일반적인 유형에 의해EDDGrid데이터셋) , MovingGrid, 기타, 포인트, 프로필, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory 및 TrajectoryProfile. 현재,EDDGrid관련 메타데이터가 지정되지 않거나, 데이터가 cdm\\_data\\_type과 일치한다는 것을 확인할 수 없습니다. 그것은 아마도 가까운 미래에 변화합니다.
    * EDDTable는 cdm\\_data\\_type을 사용하여, CF의 DSG 사양을 따르는 rigorous 방식으로 cdm\\_data\\_type을 사용하여 DSG로 일관되게 업데이트되지 않았습니다. dataset의 metadata가 준수하지 않는 경우ERDDAPcdm\\_data\\_type의 요구 사항 (더 보기) , dataset는 짐에 실패하고 생성할 것입니다[오류 메시지](#troubleshooting-tips)· (그것은 좋은 일이다, 오류 메시지가 당신이 그것을 해결 할 수 있도록 잘못된 것을 알려줄 감각에서.) dataset의 데이터가 dataset의 metadata 설정과 일치하지 않는 경우 (e.g., timeseries dataset에 주어진 역을 위한 1개의 고도 가치가 있는 경우에) , 데이터에 대한 일부 요청은 응답에 잘못된 데이터를 반환합니다. 그래서 당신은이 모든 것을 얻을 수 있습니다.
        
이 모든 데이터 세트, 컨벤션 및Metadata\\_Conventions글로벌 속성, CF-1.6 참조 (아니다 CF-1.0, 1.1, 1.2, 1.3, 1.4, 또는 1.5) CF-1.6 이후는 Discrete Sampling Geometry와 관련된 변화를 포함하는 첫 번째 버전입니다. (사이트맵) 대회.
        *   **ERDDAP™CF DSG에 대한 단순한 관계** 
        *   ERDDAP™이미 유효한 DSG 파일인 소스 데이터셋에서 유효한 DSG 데이터셋을 만들 수 있습니다 (₢ 킹) , 또는 DSG를 위해 설치하지 않는 소스 dataset의 밖으로 그러나 metadata에 변화를 통해 만들 수 있습니다 (어떤 것ERDDAP- DSG 설정을 지정하는 더 일반적인 접근 방식을 제공하기 위해 특정) ·
        *   ERDDAP™데이터셋을 로드할 때 많은 유효성 검사를 수행합니다. cdm\\_data\\_type이 있는 데이터셋이 있다면 (또는featureType) 속성에 성공적으로로드ERDDAP™, 다음ERDDAP™dataset가 DSG 요구 사항을 충족한다고 말합니다. (다른 것,ERDDAP™발견 된 첫 번째 문제 설명 예외를 던져) ·
경고: 성공적으로 로드된 dataset는 DSG 요구에 응하기 위하여 나타납니다 (속성의 올바른 조합이 있습니다.) , 하지만 여전히 잘못 설정 될 수 있습니다, incorrect 결과에 선도.ncCF와.ncCFMA 응답 파일. (소프트웨어는 다른 사람에 있는 몇몇 방법 및 clueless에서 똑똑한 입니다.) 
        * dataset의 metadata를 보면ERDDAP™, DSG dataset는 안으로 나타납니다ERDDAP's 내부 형식 (a 거인, database-like 테이블) · DSG 형식 중 하나가 아닙니다. (e.g., 차원 및 metadata는 맞지 않습니다) , 그러나 DSG dataset가 metadata에 있는 dataset를 대우하기 위하여 필요한 정보 (예를 들어, cdm\\_data\\_type=TimeSeries 및 cdm\\_timeseries\\_variables= *aCsvListOfStation관련Varables* 글로벌 메타데이터 및 cf\\_role=timeseries\\_id 에 대한 변수) ·
        * user가 dataset의 subset를 요청하면.nc사이트맵 (이름 *.ncDSG의 Contiguous Ragged Array 파일 형식의 파일) 또는.ncCFMA 파일 (한국어.ncDSG의 다차원 배열 파일 형식의 파일) , 그 파일은 유효한 CF DSG 파일일 것입니다.
경고: 그러나, dataset가 잘못 설정된 경우 (metadata가 만든 약속은 사실이 아닙니다.) , 그 후에 응답 파일은 기술적으로 유효할 것입니다 그러나 몇몇 방법에 incorrect 일 것입니다.
             
###### EDDTable cdm_data_타입
* EDDTable datasets를 위해, cdm\\_data\\_type 선택권 (관련 요구사항ERDDAP) 이름 *
###### 이름 *{#point} 
*   [이름 *](#point)-- 관련 시간 및 위치에서 가져온 측정 세트입니다.
    * cdm\\_data\\_types 이외의 다른 점 datasets MUST에는 경도, 위도 및 시간 변수가 있습니다.
###### 제품정보{#profile} 
*   [제품정보](#profile)-- 1개의 위도 경도 위치에서 한 번에 걸린 측정의 세트, 그러나 1개 깊이에 (또는 고도) · dataset는 이러한 프로필의 컬렉션이 될 수 있습니다, 예를 들어, 다른 위치에서 7 프로필. 이 cdm\\_data\\_type은 프로파일의 모든 논리적인 연결을 무시하지 않습니다.
    
* 변수의 한 (예를 들어, profile\\_number) MUST에는 cf\\_role=profile\\_id 변수를 식별하여 프로파일을 고유하게 식별합니다.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
다른 변수가 적합하지 않은 경우, 시간 변수를 사용하여 고려하십시오.
###### cdm\\_profile\\_variables의 경우{#cdm_profile_variables} 
* dataset MUST는 globalAttribute를 포함합니다[cdm\\_profile\\_variables의 경우](#cdm_profile_variables), 값은 각 프로파일에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 프로필의 경우, 이 변수의 값은 일정합니다. 예를 들어,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
목록 MUST에는 cf\\_role=profile\\_id 변수와 프로필에 대한 정보와 다른 모든 변수와 시간, 위도 및 경도가 포함됩니다.
목록은 고도, 깊이, 또는 어떤 관측 변수를 포함하지 않습니다.
     

\\[Opinion: cdm\\_data\\_type=Profile은 거의 사용되어야 합니다. 연습에서 주어진 dataset는 일반적으로 TimeSeriesProfile 중 하나입니다. (고정 위치에 프로필) 또는 TrajectoryProfile (trajectory에 따라 프로파일) , etc로 제대로 식별되어야 합니다.\\]  
###### 타임 시리즈{#timeseries} 
*   [타임 시리즈](#timeseries)-- 측정의 순서입니다 (e.g.의 바다 수온) 하나, 조정, 위도, 경도, 깊이에 가지고 가십시오 (또는 고도) 이름 * ("station"로 생각하십시오.) dataset는 이 TimeSeries의 컬렉션이 될 수 있습니다. 예를 들어, 각 3개의 다른 위치에서 순서입니다.
    * 변수의 한 (예를 들어, station\\_id) MUST에는 cf\\_role=timeseries\\_id 변수를 고유하게 식별합니다.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables의 경우{#cdm_timeseries_variables} 
* dataset MUST는 globalAttribute를 포함합니다[cdm\\_timeseries\\_variables의 경우](#cdm_timeseries_variables), 값은 각 역에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 역의 경우, 이 변수의 값은 일정합니다. 예를 들어,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
목록 MUST에는 cf\\_role=timeseries\\_id 변수와 역에 대한 정보와 다른 모든 변수가 포함되어 있으며 거의 항상 위도와 경도를 포함합니다. (그리고 고도 또는 깊이, 경우 현재) ·
목록은 시간 또는 어떤 관측 변수를 포함하지 않습니다.
* 몇몇 moored buoys를 위해, dataset는 위도와 경도 변하기 쉬운의 2 세트가 있을지도 모릅니다:
    1. 상수도 및 경도 값의 한 쌍 (i.e., mooring의 고정 위치) · 내 계정ERDDAP™, 이러한 변수를 부여destinationName위도와 경도의 s는 cdm\\_timeseries\\_variables의 목록에서 이러한 변수를 포함합니다.
    2. 각 관측과 관련된 정확한 위도 및 경도 값. 내 계정ERDDAP™, 이 변수를 다른 줄destinationName₢ 킹 (e.g., 정확하고 정확한 런) cdm\\_timeseries\\_variables의 목록에서 이러한 변수를 포함하지 마십시오.
이 이유는: 이론적인 관점에서, DSG TimeSeries dataset를 위한, 위도 및 경도 (그리고 고도 또는 깊이, 경우 현재) 역의 위치는 일정합니다.
###### TimeSeries프로필{#timeseriesprofile} 
*   [TimeSeries프로필](#timeseriesprofile)-- 한, 고정, 위도 경도 위치에 걸린 단면도의 순서를 위해 입니다. 각 단면도는 다수 고도 또는 깊이에서 가지고 가는 측정의 세트입니다. dataset는 이러한 TimeSeriesProfiles의 컬렉션이 될 수 있습니다. 예를 들어, 각 12개의 다른 위치에서 가져온 프로파일의 순서입니다.
    * 변수의 한 (예를 들어, station\\_id) MUST에는 cf\\_role=timeseries\\_id 변수를 고유하게 식별합니다.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * 변수의 한 (예를 들어, profile\\_number) MUST에는 cf\\_role=profile\\_id 변수를 식별하여 프로파일을 고유하게 식별합니다.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (주어진 프로파일 \\_id 만 주어진 timeseries\\_id에 고유해야합니다.) 다른 변수가 적합하지 않은 경우, 시간 변수를 사용하여 고려하십시오.
    * dataset MUST에는 globalAttribute cdm\\_timeseries\\_variables가 포함되어 있으며, 값은 각 역에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 역의 경우, 이 변수의 값은 일정합니다. 예를 들어,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
목록 MUST에는 cf\\_role=timeseries\\_id 변수와 역에 대한 정보와 다른 모든 변수가 포함되어 있으며 거의 항상 위도와 경도를 포함합니다.
목록은 시간이 포함되지 않습니다, 고도, 깊이, 또는 어떤 관측 변수.
    * dataset MUST에는 globalAttribute cdm\\_profile\\_variables, 값이 각 프로파일에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 프로필의 경우, 이 변수의 값은 일정합니다. 예를 들어,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
목록 MUST는 cf\\_role=profile\\_id 변수와 거의 항상 시간을 포함 프로필에 대한 정보와 다른 모든 변수를 포함합니다.
목록은 고도, 경도, 고도, 깊이, 또는 어떤 관측 변수를 포함하지 않습니다.
###### 회사 소개{#trajectory} 
*   [회사 소개](#trajectory)-- trajectory를 따르는 측정의 순서입니다 (공간과 시간을 통해 경로)   (예를 들어, 바다 \\_water\\_temperature는 물로 이동하여 배로) · dataset은 이 Trajectories의 컬렉션이 될 수 있습니다. 예를 들어, 각 4 개의 다른 선박의 순서.
    * 변수의 한 (예를 들어, ship\\_id) MUST는 cf\\_role=trajectory\\_id 속성을 가지고 있으며, 고유하게 trajectories를 식별합니다.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables의 경우{#cdm_trajectory_variables} 
* dataset MUST는 globalAttribute를 포함합니다[cdm\\_trajectory\\_variables의 경우](#cdm_trajectory_variables), 값은 각 trajectory에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 trajectory를 위해, 이 변수의 값은 일정합니다. 예를 들어,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
목록 MUST에는 cf\\_role=trajectory\\_id 변수와 trajectory에 대한 정보와 다른 모든 변수가 포함되어 있습니다.
목록은 시간이 포함되지 않습니다, 위도, 경도, 또는 어떤 관측 변수.
###### Trajectory프로필{#trajectoryprofile} 
*   [Trajectory프로필](#trajectoryprofile)-- trajectory를 따라 가져온 프로파일의 순서입니다. dataset은 이러한 TrajectoryProfiles의 컬렉션이 될 수 있습니다. 예를 들어, 14 개의 다른 선박으로 찍은 프로파일의 순서.
    * 변수의 한 (예를 들어, ship\\_id) MUST에는 cf\\_role=trajectory\\_id 변수를 고유하게 식별할 수 있습니다.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * 변수의 한 (예를 들어, profile\\_number) MUST에는 cf\\_role=profile\\_id 변수를 식별하여 프로파일을 고유하게 식별합니다.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (주어진 프로파일 \\_id 만 주어진 trajectory\\_id에 고유해야합니다.) 다른 변수가 적합하지 않은 경우, 시간 변수를 사용하여 고려하십시오.
    * dataset MUST는 globalAttribute cdm\\_trajectory\\_variables를 포함, 값은 각 trajectory에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 trajectory를 위해, 이 변수의 값은 일정합니다. 예를 들어,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
목록 MUST에는 cf\\_role=trajectory\\_id 변수와 trajectory에 대한 정보와 다른 모든 변수가 포함되어 있습니다.
목록은 프로파일 관련 변수, 시간, 위도, 경도, 또는 어떤 관측 변수를 포함하지 않습니다.
    * dataset MUST에는 globalAttribute cdm\\_profile\\_variables, 값이 각 프로파일에 대한 정보가 있는 변수의 comma-separated 목록입니다. 주어진 프로필의 경우, 이 변수의 값은 일정합니다. 예를 들어,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
목록 MUST는 cf\\_role=profile\\_id 변수와 프로파일에 대한 정보와 다른 모든 변수를 포함, 거의 항상 시간을 포함, 경도 및 경도.
목록은 고도, 깊이, 또는 어떤 관측 변수를 포함하지 않습니다.
###### 이름 *{#other} 
*   [이름 *](#other)-- 아무 필요조건도 없습니다. dataset가 다른 옵션 중 하나에 적합하지 않으면 dataset가 위도, 경도 및 시간 변수를 포함하지 않는 경우를 사용하십시오.
     
###### 관련 노트{#related-notes} 
* cdm\\_data\\_type 이외의 모든 EDDTable datasets에는 "Other" MUST에는 경도, 위도 및 시간 변수가 있습니다.
* 프로파일을 가진 데이터셋은 고도 변수, 깊이 변수 또는[cdm\\_altitude\\_proxy를 설정한다.](#cdm_altitude_proxy)변수.
* 데이터 세트가 이상적인 CDm\\_data\\_type에 대한 모든 요구 사항을 준수 할 수없는 경우 "Point"를 사용하십시오. (몇몇 필요조건이 있는) 또는 "기타" (어떤 요구도 없다) 대신.
* 이 정보는 다음과 같습니다.ERDDAP™다양한 방법으로 예를 들어, 대부분 만들기.ncCF 파일 (.ncdataset의 cdm\\_data\\_type과 관련된 Contiguous Ragged Array Representations에 따르는 파일) 이름 *.ncCFMA 파일 (.ncdataset의 cdm\\_data\\_type과 관련된 Multidimensional Array Representations에 따르는 파일) 정의 된[분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)의 장[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이전에 "CF Point Observation Conventions"라는 이름의 메타데이터 컨벤션.
* 유형: 이 datasets를 위해, 정확한 조정을 위한[subsetVariables](#subsetvariables)일반적으로 cdm\\_...\\_variables 속성에 나열된 모든 변수의 조합입니다. 예를 들어, TimeSeriesProfile은 cdm\\_timeseries\\_variables와 cdm\\_profile\\_variables를 사용합니다.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 이 데이터셋에 기여한 사람, 조직 또는 프로젝트를 식별하는 방법입니다. (예를 들어, 데이터의 원본 제작자가 이 데이터셋의 제작자가 재처리되기 전에) · 예를 들어,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
"contributor"가 dataset에 정말 적용되지 않으면이 속성을 omit. 더 보기[creator\\_name](#creator_name), 이것은 때때로 펀딩 소스에 초점을 맞추고있다.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 다음과 같습니다.[contributor\\_name](#creator_name)· 예를 들어,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
"contributor"가 dataset에 정말 적용되지 않으면이 속성을 omit.
###### 행사일정{#conventions} 
*   [ **행사일정** ](#conventions)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata 표준) STRONGLY RECOMMENDED입니다. (그것은 미래에 필요한 수 있습니다.) 값은 이 dataset이 따르는 메타데이터 표준의 필수 목록입니다. 예를 들면:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
사용 된 일반적인 메타 데이터 협약ERDDAP™이름:
    
    *   [COARDS행사일정](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)CF에 선구자입니다.
    *   [기후와 예측 (사이트맵) 행사일정](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)권장하고 필요한 속성의 소스는ERDDAP· CF의 현재 버전은 "CF-1.6"로 식별됩니다.
    * 더 보기NetCDFDataset Discovery에 대한 Attribute 협약 (사이트맵) 권장하고 필요한 속성의 소스는ERDDAP· ACDD의 원래 1.0 버전 (Ethan Davis의 화려한 작품) , 확인되었습니다[Unidata데이터셋 디스커버리 v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)현재 위치 (2015년) ACDD의 1.3 버전이 확인됩니다.[크기: ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)· 데이터셋이 사용중인 경우UnidataDataset Discovery v1.0, 우리는 당신을 격려[ACDD-1.3을 사용하여 데이터셋을 전환](#switch-to-acdd-13)·
    
dataset가 추가 메타데이터 표준을 따르면, Conventions 속성의 CSV 목록에 이름을 추가하십시오.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (이름 *[ISO 19115 인증](https://en.wikipedia.org/wiki/Geospatial_metadata)metadata 표준) 그리드 데이터의 유형을 식별하는 RECOMMENDED 방법 (내 계정EDDGrid데이터셋) · 예를 들어,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
허용된 값은 auxiliaryInformation, 이미지, modelResult, 물리적입니다. 제품정보 (ISO 19115 메타데이터가 생성될 때 기본값) , qualityInformation, referenceInformation 및 thematicClassification. (EDDTable datasets를 위한 이 꼬리표를 사용하지 마십시오.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 사람, 조직 또는 프로젝트를 식별하는 방법입니다. (특정한 사람 또는 조직이 아닌 경우) , 창조에 가장 책임 (또는 가장 최근의 재처리) 이 자료의. 예를 들어,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
데이터가 광범위하게 재처리 된 경우 (예를 들어, 레벨 2에서 레벨 3 또는 4로 위성 데이터) , 보통 재처리기는 제작자로 목록으로 만들고 원본 제작자는 통해 목록으로 만들어집니다[contributor\\_name](#contributor_name)· 더 보기[주요사업](#project), 이것은 더 유연합니다, 그것이 사람, 조직 또는 프로젝트를 식별할 수 있기 때문에.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 이메일 주소를 식별하는 RECOMMENDED 방법 (정확한 형식) 제작자에게 연락하는 방법을 제공합니다. 예를 들어,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 dataset 또는 URL을 생성하는 조직의 URL을 식별하는 방법입니다. (그러나 그 목적은 더[infoUrl](#infourl)) · 예를 들어,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 데이터가 처음 생성 된 날짜를 식별하는 방법입니다. (예를 들어, 이 양식으로 처리) , ISO 8601 체재에서. 예를 들어,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
데이터가 주기적으로 dataset에 추가되면, 원본 데이터가 사용할 수 있는 첫 번째 날짜입니다.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 데이터가 마지막으로 수정된 날짜를 식별하는 RECOMMENDED 방법은 (예를 들어, 오류가 수정되거나 최신 데이터가 추가되었을 때) , ISO 8601 체재에서. 예를 들어,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 데이터가 다른 사람에게 먼저 만든 날짜를 식별하는 RECOMMENDED 방법은, 예를 들면, 2012-03-15. 예를 들어,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
예를 들어, dataset에는[date\\_created](#date_created)의 2010-01-30, 하지만 단지 사용할 수 있었다 2010-07-30.date\\_issued보다는 더 적은 통용되는date\\_created이름 *date\\_modified· 이름 *date\\_issuedomitted, 그것은 같은 가정date\\_created·
###### 주요사업drawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- 이것은 OPTIONAL 글로벌 속성입니다.ERDDAP™  (그리고 metadata 기준 없음) dataset의 Make A Graph 형태로 "Draw Land Mask" 옵션에 대한 기본 값을 지정합니다. ( *datasetID* ·) and for the &.land 매개변수 in a URL requesting a map of the data. 예를 들어,
    ```
    <att name="drawLandMask">over</att>  
    ```
이름 *[drawLandMask관련 기사](#drawlandmask)·
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata 표준) IGNORED 및 / 또는 REPLACED입니다. dataset의 경우[cdm\\_data\\_타입](#cdm_data_type)적합하다,ERDDAP™자동으로 생성featureType이름 * 그래서 추가 할 필요가 없습니다.
    
그러나 사용중인 경우[EDDTableNcCFFiles에서](#eddtablefromnccffiles)파일에서 dataset를 만들려면[사이트맵 분리된 표본 추출 Geometries (사이트맵) 표준:](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), 파일 자체가 있어야합니다featureType제대로 정의되므로ERDDAP™파일을 올바르게 읽을 수 있습니다. 그 유형의 파일에 CF DSG 요구 사항의 일부입니다.
     
###### 이름 *{#history} 
*   [ **이름 *** ](#history)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 멀티 라인 문자열 글로벌 속성은 데이터가 겪는 모든 처리 단계에 대한 라인입니다. 예를 들어,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * 이상적으로, 각 선에는 ISO 8601:2004가 있습니다 (₢ 킹) 지정된 date+timeZ (예를 들면, 2011-08-05T08:55:02Z) 처리 단계의 설명에 따라.
    *   ERDDAP™이미 존재하지 않는 경우 이것을 만듭니다.
    * 이미 존재한다면,ERDDAP™새로운 정보를 기존 정보에 추가합니다.
    * 역사는 클라이언트가 데이터의 원본 소스에 backtrack를 허용하기 때문에 중요합니다.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)웹 페이지의 URL을 가진 REQUIRED 글로벌 속성은 이 dataset에 대한 자세한 정보 (일반적으로 소스 기관의 웹 사이트에서) · 예를 들어,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * dataset의 글로벌[소스Attributes](#global-attributes)또는 글로벌&lt;addAttributes· MUST는 이 속성을 포함합니다.
    *   infoUrl클라이언트가 원본 소스에서 데이터에 대해 더 알아낼 수 있기 때문에 중요합니다.
    *   ERDDAP™링크를 표시합니다.infoUrldataset의 데이터 액세스 양식에 ( *datasetID* 사이트맵) , Graph 웹 페이지를 만드십시오 ( *datasetID* ·) , 다른 웹 페이지.
    * URL이 쿼리 부분이있는 경우 ("?"후) , 그것은 이미[% 인코딩](https://en.wikipedia.org/wiki/Percent-encoding)· constraints의 특수 문자를 인코딩해야합니다. (초기 '&'와 주 이외의'=', 어떤 경우에) HH가 문자의 2 자리 6 진수 값 인 형태 %HH로. 보통, 당신은 단지 몇 가지의 구두 문자를 변환해야합니다: %25 %, & %26, "%22,&lt;%3C로, = %3D로, &gt; %3E로, + %2B로,|%7C로,\\[%5B로,\\]%5D로, %20로 공간, #127 이상의 모든 문자를 UTF-8 양식으로 변환하고 UTF-8 양식의 각 바이트를 %H 형식으로 인코딩합니다. (도움을위한 프로그래머에게 물어보십시오) ·
예를 들어, &stationID&gt;=41004"
은 &stationID%3E=%2241004%22
Percent 인코딩은 일반적으로 액세스 할 때 필요합니다.ERDDAP브라우저 이외의 소프트웨어를 통해. 브라우저는 보통 % 인코딩을 처리합니다.
일부 상황에서는 A-Za-z0-9\\_-&#33;.~ 이외의 모든 문자를 % 인코딩해야합니다. 이름 * () \\*, 아직 초기 '&' 또는 주를 인코딩하지 않습니다'='·
프로그래밍 언어는 이것을 할 수있는 도구가 (예를 들어, 참조Java이름 *[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
이름 *Java스크립트 [encodeURIComponent()· ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) 거기에
        [웹 사이트 % encode / decode 당신을 위해](https://www.url-encode-decode.com/)·
    * 이름 *datasets.xmlXML 파일이며, 모든 '&', '&lt;', '&gt;' URL에서 '&amp;', '&lt;', and '&gt;'% 인코딩 후.
    *   infoUrl이란ERDDAP· 그것은 어떤 metadata 표준에서 아닙니다.
###### 교육기관{#institution} 
*   [ **교육기관** ](#institution)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 이 데이터의 소스 인 기관의 이름의 짧은 버전과 REQUIRED 글로벌 속성 (보통 약어, 일반적으로&lt;20자). 예를 들어,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * dataset의 글로벌[소스Attributes](#global-attributes)또는 글로벌&lt;addAttributes· MUST는 이 속성을 포함합니다.
    *   ERDDAP™datasets의 목록을 표시합니다. 기관의 이름이 20자 이상인 경우, 첫 번째 20자만 데이터셋 목록에서 볼 수 있습니다. (그러나 전체 기관은 마우스 커서를 삽입하여 볼 수 있습니다 "?" 아이콘) ·
    * 기관을 리스트에 추가하면&lt;categoryAttributes· 내 계정ERDDAP이름 *[설정.xml](/docs/server-admin/deploy-install#setupxml)파일, 사용자는 쉽게 같은 기관에서 datasets를 찾을 수 있습니다ERDDAP's "Search for Datasets by Category" 홈 페이지.
###### 이름 *{#keywords} 
*   [ **이름 *** ](#keywords)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 단어와 짧은 구문의 RECOMMENDED 기념 목록 (예를 들어,[사이트맵 과학 키워드](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) dataset을 일반 방식으로 설명하고, dataset의 다른 지식과 함께하지 않는 (예를 들면, oceanographic 자료를 위해, 바다를 포함합니다) · 예를 들어,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
이름 *datasets.xmlXML 문서, 문자 및,&lt;, and &gt; 속성에서 키워드 (e.g., GCMD 과학 키워드의 &gt; 문자) &amp로 인코딩해야합니다;,&lt;, 그리고 &gt;, 각각.
dataset가 로드될 때ERDDAP·
    
    * "Earth Science &gt; "이 부족한 GCMD 키워드의 시작에 추가됩니다.
    * GCMD 키워드는 Title Case로 변환됩니다. (i.e., 첫 글자는 자본화) ·
    * 키워드는 정렬 된 순서로 뒤집어지고 새로운 문자가 제거됩니다.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 속성은: 키워드 속성 속성의 단어 / 알파벳에 대한 지침을 따르는 경우 (예를 들어, GCMD 과학 키워드) , 그 가이드라인의 이름을 여기에 넣어. 예를 들어,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### 이름 *{#license} 
*   [ **이름 *** ](#license)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) STRONGLY RECOMMENDED 글로벌 속성은 라이센스 및 / 또는 사용 제한입니다. 예를 들어,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * 이름 *\\[표준:\\]" 속성 값에서 발생, 그것은 표준에 의해 대체 될 것이다ERDDAP™의 라이센스&lt;standardLicense&gt; 태그ERDDAP이름 *
        \\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)결과가 없습니다.[추가 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (정의 된Metadata\\_Conventions으로 "Unidata데이터셋 디스커버리 v1.0") metadata 표준. 속성 값은 이 dataset에 의해 사용되는 메타 데이터 협약의 기념 목록이었다.
dataset가 ACDD 1.0을 사용하는 경우, 이 속성은 STRONGLY RECOMMENDED, 예를 들어,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
한국어ERDDAP™이제 ACDD-1.3을 추천합니다. 당신은[ACDD-1.3을 사용하여 데이터셋을 전환](#switch-to-acdd-13), 사용Metadata\\_ConventionsSTRONGLY DISCOURAGED: 그냥 사용 [&lt;대회&gt;] (#컨벤션) 대신.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 처리의 RECOMMENDED 텍스트 설명 (예를 들어,[NASA 위성 데이터 처리 수준](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), 예를 들면, 수준 3) 또는 품질 관리 수준 (예를 들면, 과학 질) 데이터의. 예를 들어,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### 주요사업{#project} 
*   [ **주요사업** ](#project)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) OpTIONAL 속성은 dataset의 일부임을 확인하는 것입니다. 예를 들어,
    ```
    <att name="project">GTSPP</att>  
    ```
dataset가 프로젝트의 일부가 아니라면 이 속성을 사용하지 마십시오. 더 보기[creator\\_name](#creator_name), 이것은 프로젝트에 초점을 (여러 프로젝트에 참여할 수 있는 사람 또는 조직이 아닙니다.) ·
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 이 데이터셋을 게시하는 사람, 조직 또는 프로젝트를 식별하는 방법입니다. 예를 들어,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
예를 들어, 다른 사람이나 그룹이 있다면 게시자입니다.[제품정보](#creator_name)dataset와 당신은 단지 그것을 통해 보존하고 있습니다ERDDAP· "publisher"가 dataset에 정말 적용되지 않으면이 속성을 omit. 더 보기[creator\\_name](#creator_name), 게시자는 단순히 데이터를 수정하거나 재처리하지 않았다; 게시자는 새로운 장소에서 사용할 수있는 데이터를 만드는 것입니다.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 이메일 주소를 식별하는 RECOMMENDED 방법 (예를 들어, john\\_smith@great.org) 게시자에게 연락하는 방법을 제공합니다. 예를 들어,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
"publisher"가 dataset에 정말 적용되지 않으면이 속성을 omit.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 방법은 데이터셋을 출판하는 조직의 URL을 식별하거나, 이 데이터셋에 대한 게시자의 정보를 URL을 식별하는 방법입니다. (그러나 그 목적은 더[infoUrl](#infourl)) · 예를 들어,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
"publisher"가 dataset에 정말 적용되지 않으면이 속성을 omit.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)글로벌 문자열 속성 (어떤 표준에서) 실시간 dataset인 경우를 나타냅니다. 예를 들어,
    ```
    <att name="real\\_time">true</att>  
    ```
이것은 거짓 (기본값) ·ERDDAP™전체 파일이 생성되어야 파일 형식의 요청에 대한 응답을 캐시합니다.ERDDAP™사용자의 응답을 보내고 약 15 분 동안 재사용 할 수 있습니다. (₢ 킹.nc파일 형식) ·
이 true로 설정되면ERDDAP™응답 파일을 결코 캐시하지 않으며 항상 새로 생성 된 파일을 반환합니다.
###### sourceUrl이름 *{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)데이터 소스의 URL과 글로벌 속성입니다. 예를 들어,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (하지만 한 줄에 모두 넣어) 
    *   ERDDAP™일반적으로이 글로벌 속성을 자동으로 생성합니다. 두 예외는 EDDTableFrom입니다Hyrax파일 및 EDDTableFromThreddsFiles.
    * 소스가 로컬 파일과 파일이 조직에 의해 생성 된 경우, 사용
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * 소스는 로컬 데이터베이스이며 데이터가 조직에 의해 생성 된 경우, 사용
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrl클라이언트가 데이터의 원본 소스에 backtrack를 허용하기 때문에 중요합니다.
    *   sourceUrl이란ERDDAP· 그것은 어떤 metadata 표준에서 아닙니다.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 속성은 어떤 변수에서 제어 된 어휘의 이름을 식별하는[standard\\_name](#standard_name)한국어 예를 들어,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
버전 77의[CF 표준 이름 테이블](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)·
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (EDDTable 데이터셋 전용) RECOMMENDED 글로벌 속성은 다음과 같습니다. [&lt;dataVariable&gt;] (#데이터variable)  [destinationName](#destinationname)s 값의 제한된 수의 변수를 식별 (다른 방법을 명시: 값의 각각에 대한 변수는 많은 중복) · 예를 들어,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
이 속성이 존재하는 경우, dataset는 *datasetID* .subset 웹 페이지 (모든 dataset 목록에 대한 링크) 사용자가 빠르고 쉽게 데이터의 다양한 하위 세트를 선택합니다.
    * dataset는 각각 적재됩니다,ERDDAP디스크에로드 및 저장은 모든 종류의 테이블 () subset의 조합 변수의 변수의 값.ERDDAP™읽을 수 있음subsetVariables테이블과 가공 그것은 매우 빨리 (특히 데이터 파일의 랏을 읽거나 데이터베이스 또는 기타 외부 서비스에서 데이터를 얻고 비교) ·
    * 즉,ERDDAP™3 가지를 수행 :
        1. 그것은 허용ERDDAP™데이터 액세스 양식의 드롭다운 목록에서 가능한 값 목록을 넣어 Graph 웹 페이지를 만들고 .subset 웹 페이지.
        2. 그것은 허용ERDDAP™.subset 웹 페이지를 제공합니다. 이 페이지는 매우 어렵습니다. 그 변수의 값의 유효한 조합을 쉽게 찾을 수 있기 때문에 흥미롭습니다. (거의 불가능) · 그런 다음, 모든 사용자 요청에 대한 () 기타 제품 가변 데이터는 매우 빠릅니다.
        3. 사용자 요청이 있는 경우, 그 변수의 하위 집합을 나타냅니다.ERDDAP™빨리 읽을 수 있습니다subsetVariables테이블, 요청에 응답합니다. 그것은 시간 및 노력의 톤을 저장할 수 있습니다ERDDAP·
    * 의 순서destinationNames 지정할 정렬 순서에 *datasetID* .subset 웹 페이지, 그래서 당신은 일반적으로 가장 중요한 변수를 먼저 지정할 것입니다, 그리고 적어도 중요한. 예를 들면, 몇몇 역을 위한 시간 시리즈 자료를 가진 datasets를 위해, 당신은 예를 들면, 사용될지도 모릅니다,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
그래서 값은 역\\_id에 의해 분류됩니다.
    * 분명히, 그것은 당신의 선택은 변수에 포함subsetVariables목록, 그러나 건의한 사용법은:
        
일반적으로 원하는 변수를 포함ERDDAP™dataset의 Data Access Form의 드롭다운 목록 표시 (사이트맵) 그리고 Make-A-Graph (·) 웹 페이지.
        
일반적으로 dataset의 기능에 대한 정보와 변수를 포함 (역, 단면도, 및/또는 trajectories, notably에서[cdm\\_timeseries\\_variables의 경우](#cdm_timeseries_variables)·[cdm\\_profile\\_variables의 경우](#cdm_profile_variables)·[cdm\\_trajectory\\_variables의 경우](#cdm_trajectory_variables)) · 이 변수에 대한 몇 가지 다른 값이 있으므로 드롭다운 목록에서 잘 작동합니다.
        
개별 관측과 관련된 데이터 변수를 포함하지 마십시오. (e.g., 시간, 온도, 연고, 현재 속도) 내 계정subsetVariables이름 * 이 변수에 대한 너무 많은 다른 값이 있으므로 드롭다운 목록은로드가 느리고 작업하기가 어렵습니다. (또는 일) ·
        
    * 이 변수의 다른 조합의 수가 약 1,000,000보다 큰 경우, 당신은 제한 고려해야subsetVariables1,000,000 미만의 다른 조합의 수를 줄이기 위해 지정; 그렇지 않으면, *datasetID* .subset 웹 페이지는 천천히 생성될 수 있습니다. 극단적인 경우에, dataset는 안으로 적재하지 않을지도 모릅니다ERDDAP™다른 조합의 목록을 생성하기 때문에 너무 많은 메모리를 사용합니다. 그래서, 당신은 MUST에서 일부 변수를 제거subsetVariables이름 *
    * 어떤 하위 설정 변수의 특정 값의 수는 약 20,000보다 크면, 그 변수를 포함하지 않아야합니다.subsetVariables; 그렇지 않으면, 그것은 전달하는 장시간이 걸립니다 *datasetID* .subset, *datasetID* .graph, 그리고 *datasetID* .html 웹 페이지. 또한 Mac에서 스크롤 바의 부족 때문에 500 개 이상의 항목이있는 드롭 다운 목록에서 선택을하는 것이 매우 어렵습니다. 타협은: 사용자가 드롭다운 목록에서 값을 선택하지 않을 때 목록에서 변수를 제거한다.
    * 각 dataset을 테스트해야 합니다.subsetVariables설정은 괜찮습니다. 소스 데이터 서버가 느리면 너무 오래 걸립니다. (또는 실패) 데이터를 다운로드하려면 지정된 변수의 수를 감소시키거나 제거하십시오.subsetVariables글로벌 특성.
    * 구독하기 변수는 매우 유용합니다. 데이터셋이 적합한 경우,subsetVariables이름 *
    * EDDTable에서SOS자동 추가
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
dataset이 생성되면
        * 가능한 경고: 사용자가 사용하는 경우 *datasetID* .subset web page는 캐리지Return 또는 newline 문자가 있는 값을 선택합니다. *datasetID* .subset는 실패합니다.ERDDAP™일부 HTML 세부 사항 때문에이 문제를 해결할 수 없습니다. 어떤 경우에, 그것은 거의 항상 데이터에서 포로 및 신형 문자를 제거하는 좋은 아이디어입니다. 문제를 해결하는 데 도움이, EDDTable 경우.subsetVariablesDataTable 방법ERDDAP문제가 발생할 수있는 데이터 값을 감지, 그것은 이메일에 오프로드 값의 목록으로 경고를 이메일로 모든 것 setup.xml에 명시된 이메일 주소로. 즉, 당신은 조정해야 할 것을 알고 있습니다.
        *    **사전 제작된 서브셋 테이블.** 일반적으로, 때ERDDAP™dataset를로드, 그것은 명백하게 요청 () subset 변수 data table from the data source, 그냥 정상적인 데이터 요청을 통해. 일부 경우에, 이 데이터는 데이터 소스에서 사용할 수 없습니다 또는 데이터 소스에서 검색 할 수 있습니다 데이터 소스 서버에서 하드. 그래서, 당신은에서 정보를 가진 테이블을 공급할 수 있습니다.json또는 .csv 파일 이름 *뚱 베어* /content/erddap/subset/에 *datasetID* .json  (또는 .csv) · 현재 위치ERDDAP™dataset가 로드되고 하위 설정 데이터의 소스로 사용할 때 한 번 읽을 것입니다.
            * 읽는 동안 오류가 있다면, dataset는 로드가 실패합니다.
            * 그것은 정확한 동일한 열 이름이 있습니다 (예를 들어, 같은 경우) 이름 *&lt;subsetVariables&gt;, 그러나 란 MAY는 어떤 순서든지에 있습니다.
            * 그것은 MAY 추가 열이 (그들은 제거되고 새로 중복 행이 제거됩니다.) ·
            * 값이 누락된 값 (가짜 숫자는 -99) ·
            *   .json파일을 만들 수 있지만 Unicode 문자를 잘 처리 할 수 있습니다..json파일을 만들면 쉽게 만들 수 있습니다.ERDDAP·
            * .csv 파일은 작업이 용이하지만 ISO 8859-1 문자에만 적합합니다. .csv 파일 MUST는 연속 행에 첫번째 줄과 자료에 열 이름이 있습니다.
        * 거대한 datasets를 위해 또는 때&lt;subsetVariables&gt;는 misconfigured, 값의 조합의 테이블은 Too Much Data 또는 OutOfMemory 오류를 일으킬 정도로 큰 수 있습니다. 이 솔루션은 목록에서 변수를 제거하는 것입니다.&lt;subsetVariables&gt; 큰 수의 값이 있거나 테이블의 크기가 합리적 때까지 필요한 변수를 제거하십시오. 오류에 관계없이, 부품ERDDAP™즉,subsetVariables시스템은 잘 작동하지 않습니다. (e.g., 웹 페이지로드 매우 천천히) 너무 많은 행이있을 때 (e.g., 백만 이상) 그 테이블에.
        *   subsetVariables변수 사용자가 constraints, i.e에서 사용할 수 있는 변수를 지정하는 것은 아무것도 없다., 사용자가 dataset의 하위 설정을 요청할 수 있는 방법.ERDDAP™항상 constraints는 변수를 참조 할 수 있습니다.
###### 시간 단위{#time-units} 
[시간 및 타임스탬프](#time-units)열에는 ISO 8601:2004가 있어야 합니다 (₢ 킹) 체재된 date+time Z 문자열 (예를 들면, 1985-01-31T15:31:00Z) ·
             
###### 제품정보{#summary} 
*   [ **제품정보** ](#summary)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) Dataset의 긴 설명과 함께 필요한 글로벌 속성입니다 (보통적으로&lt;500자). 예를 들어,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * dataset의 글로벌[소스Attributes](#global-attributes)또는 글로벌&lt;addAttributes· MUST는 이 속성을 포함합니다.
    * 요약은 클라이언트가 제목보다 더 많은 정보를 가지고 데이터 세트의 설명을 읽을 수 있기 때문에 매우 중요합니다. 따라서 신속하게 데이터 세트가 무엇인지 이해합니다.
    * 조언 : 요약을 작성하십시오. 거리 또는 동료에 만나는 일부 임의 사람에게 데이터 세트를 설명 할 것입니다. 자주 묻는 질문[5W와 1H](https://en.wikipedia.org/wiki/Five_Ws): 누가 dataset을 만들었습니다? 어떤 정보가 수집되었습니까? 수집된 데이터는? 어디 수집? 왜 수집되었습니까? 어떻게 수집되었습니까?
    *   ERDDAP™dataset의 Data Access Form에 요약 표시 ( *datasetID* 사이트맵) , Graph 웹 페이지를 만드십시오 ( *datasetID* ·) , 다른 웹 페이지.ERDDAP™FGDC 및 ISO 19115 문서를 만들 때 요약을 사용합니다.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (선택 사항ERDDAP- 특정 글로벌 메타데이터 속성, 어떤 표준에서) simplistic 방식으로, 근실한 dataset를 위한 자료가 out-of-date로 지정될 때, 지정합니다now- *n단위* , 예를 들면,now-시간 값 후에 보통 2448 시간을 나타나는 자료를 위한 2days. 예측 데이터, 사용 **+ 더보기**  *n단위* , 예를 들면, 미래에 있는 가장, 8 일에서 예측 자료에 대한 now+6days. (이름 *[now- *n단위* 구문 설명](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)·) dataset의 최대 시간 값이 지정된 시간보다 더 최근 더 있다면, dataset는 최신으로 간주됩니다. 최대 시간 값이 지정된 시간보다 오래된 경우, dataset는 최신으로 간주됩니다. out-of-date datasets를 위해, 자료 근원을 가진 아마 문제가 있습니다, 그래서ERDDAP™더 최근 몇 점에서 데이터에 액세스 할 수 없습니다.
    
더 보기testOutOfDate값은 열으로 표시됩니다.[allDatasets데이터셋](#eddtablefromalldatasets)내 계정ERDDAP· 또한 outOfDate 인덱스를 계산하는 데 사용됩니다. 다른 열은allDatasets데이터셋.
인덱스가 있다면&lt;1, dataset는 최신 것으로 간주됩니다.
인덱스가 있다면&lt;=1, dataset는 out-of-date로 간주됩니다.
인덱스가 있다면&lt;=2, dataset는 매우 최신 것으로 간주됩니다.
    
더 보기testOutOfDate값도 사용ERDDAP™생성하기 https://*yourDomain*/erddap/outOfDateDatasets.html 웹 페이지 ([이름 *](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) datasets를 보여준다.&lt;testOutOfDate&gt; 태그, datasets는 의 날짜에 의해 순위. 파일 형식을 변경하면 (.html에서 .csv로,.jsonlCSV·.nc·.tsv, ...) , 당신은 다른 파일 형식으로 그 정보를 얻을 수 있습니다.
    
가능한 한,[생성데이터셋Xml](#generatedatasetsxml)추가하기testOutOfDate글로벌 특성addAttributes데이터셋의. 이 값은 GenerateDatasetsXml에 대한 정보를 기반으로 제안입니다. 값이 적합하지 않은 경우, 변경하십시오.
    
"Out-of-date"는 여기에 매우 다릅니다 [&lt;관련 제품 모든 분&gt;] (#reloadeveryn분) , 그것은 어떻게 최신 상태로 거래ERDDAPdataset의 지식은 더 보기&lt;testOutOfDate&gt; 체계는 그것을 가정합니다ERDDAPdataset의 지식은 최신입니다. 자주 묻는 질문&lt;testOutOfDate&gt; 거래는 다음과 같습니다. 데이터의 소스에 잘못되어 있기 때문에 최근 데이터가 액세스 할 수 없습니다.ERDDAP·
    
###### 이름 *{#title} 
*   [ **이름 *** ](#title)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) Dataset의 짧은 설명과 함께 REQUIRED 글로벌 속성입니다 (보통적으로&lt;=95 문자). 예를 들어,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * dataset의 글로벌[소스Attributes](#global-attributes)또는 글로벌&lt;addAttributes· MUST는 이 속성을 포함합니다.
    * 제목은 datasets의 각 목록이 제시한 것이 중요합니다.ERDDAP  (검색 결과 이외의) 알파벳 순서로 datasets를 나열합니다. datasets의 순서를 지정하고 싶으면, 몇몇 datasets는 함께 그룹화했습니다, 당신은 그 마음에서 제목을 창조해야 합니다. datasets의 많은 목록 (예를 들어, 카테고리 검색에 대한 응답) , 전체 목록의 subset를 보여주고 다른 순서에서. 그래서 각 dataset의 제목은 자체에 서 있어야한다.
    * 제목이 "DEPRECATED"라는 단어를 포함하면 (모든 자본 문자) , 그런 dataset는 검색에서 더 낮은 순위를 얻을 것이다.
             
##### &lt;axisVariable·{#axisvariable} 
* [기타] ** &lt;axisVariable· ** · (#축 가변) 차원을 설명하는 데 사용됩니다 ("축"이라고도 함) ·
제품 정보EDDGriddatasets, 1개 이상axisVariable태그가 필요합니다.[dataVariable₢ 킹](#datavariable)항상 공유/사용 모든 축 변수. ([왜?](#why-just-two-basic-data-structures) [그렇지 않으면?](#dimensions))   
MUST는 데이터 변수의 각 치수에 대한 축 변수가 있습니다.
Axis variables MUST는 데이터 변수가 그(것)들을 사용한다는 순서로 지정됩니다.
(EDDTable datasets는 사용할 수 없습니다&lt;axisVariable&gt; 태그.)
살해된 예는:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; 뒤에 오는 subtags를 지원합니다:
###### &lt;sourceName\\ 및 gt;{#sourcename} 
* [기타]&lt;sourceName\\&gt;] (#출처) -- 변수의 데이터 소스의 이름. 이것은 그 이름입니다ERDDAP™데이터 소스에서 데이터를 요청할 때 사용할 것입니다. 이것은 그 이름입니다ERDDAP™데이터 소스에서 데이터를 반환 할 때 볼 수 있습니다. 이것은 민감합니다. 견적 요청
###### &lt;destinationName\\ 및 gt;{#destinationname} 
* [기타]&lt;destinationName\\&gt;] (#destination이름) 에 의해 표시 될 변수의 이름은ERDDAP™사용자.
    * 이것은 OPTIONAL입니다. 부패 한 경우,sourceName사용.
    * 이것은 당신이 암호화 또는 확률을 변경할 수 있기 때문에 유용합니다sourceName·
    *   destinationName는 경우에 과민합니다.
    *   destinationNames는 문자로 시작 (사이트맵) 그리고 MUST는 0개 이상의 문자로 이어질 것입니다. (A-Z, a-z, 0-9 및 \\_) · ('-'은 이전 가능ERDDAP™버전 1.10.) 이 제한은 축 변수 이름을 축으로 동일하게 할 수 있습니다.ERDDAP™응답 파일에서, 그리고 그 파일이 프로그램 언어를 포함하여 사용될 모든 소프트웨어에서 (이름 *Python·Matlab·Java스크립트) 변수 이름에 비슷한 제한이 있습니다.
    * 내 계정EDDGrid데이터셋,[경도, 위도, 고도, 깊이 및 시간](#destinationname)축 변수는 특별합니다.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [기타]&lt;addAttributes&gt;] (#variable-addattributes는) 속성의 OPTIONAL 설정 정의 ( *이름 ** = = = *제품정보* ) 변수에 대한 소스의 속성에 추가되어 변수에 대한 결합 속성을 만듭니다.
변수의 경우[소스Attributes](#variable-addattributes)또는&lt;addAttributes&gt; 포함[scale\\_factor및/또는add\\_offset](#scale_factor)속성, 그들의 값은 배포하기 전에 소스에서 데이터를 unpack하는 데 사용됩니다
     (이름 * 값 = 소스 가치 \\*scale\\_factor+ 더보기add\\_offset) · unpacked 변수는 동일한 데이터 유형의 것입니다. (예를 들어 float) 으로scale\\_factor이름 *add\\_offset가치.
         
##### &lt;dataVariable·{#datavariable} 
* [기타] ** &lt;dataVariable· ** · (#데이터variable) 자주 묻는 질문 (거의 모든 datasets를 위해) 태그 안에&lt;dataset&gt; 태그는 data 변수를 설명하는 데 사용됩니다. 이 태그의 1 개 이상의 인스턴스가 있습니다. 살해된 예는:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; 뒤에 오는 subtags를 지원합니다:
###### &lt;sourceName·{#sourcename-1} 
* [기타]&lt;sourceName&gt;] (#출처) -- 변수의 데이터 소스의 이름. 이것은 그 이름입니다ERDDAP™데이터 소스에서 데이터를 요청할 때 사용할 것입니다. 이것은 그 이름입니다ERDDAP™데이터 소스에서 데이터를 반환 할 때 볼 수 있습니다. 이것은 민감합니다. 견적 요청
###### 그룹{#groups} 
CF v1.8와 그룹에 대한 CF 추가 지원. 에서 시작 ~2020,NetCDF도구 지원 putting variables into groups in a.nc파일. 실제로, 이것은 단지 변수가 그룹을 식별하는 긴 이름이 있음을 의미합니다. (₢ 킹) 그리고 변수 이름, 예를 들면, groups1a/group2c/varName ).ERDDAP™변수의 "/"를 변환하여 그룹을 지원합니다.&lt;sourceName&gt; "\\_" 변수의&lt;destinationName&gt;, 예를 들면, groups1a\\_group2c\\_varName . (당신이 그것을 볼 때, 당신은 그룹이 구문 협약보다 훨씬 더 없다는 것을 깨달아야한다.) 변수가 나열될 때ERDDAP™, 그룹에 있는 모든 변수는 함께 나타날 것입니다.\\[이름 *ERDDAP™, notably Generate데이터셋 Xml는 물론 그룹이있는 소스 파일과 함께 수행 할 수 없습니다. Chris에 샘플 파일을 보내주십시오. noaaa.gov의 존.\\]

EDDTableFromFiles datasets는 특별히 인코딩된, 가짜를 사용할 수 있습니다sourceNames는 새로운 데이터 변수를 정의하기 위해, 예를 들어, 글로벌 속성을 데이터 변수로 홍보하기 위해. 이름 *[이 문서](#pseudo-sourcenames)·
###### HDF회사연혁{#hdf-structures} 
시작하기ERDDAP™v2.12의EDDGridfromNcFiles 및EDDGrid파일 형식 Unpacked는 "structures"에서 데이터를 읽을 수 있습니다..nc4와.hdf4 파일. 구조에서 변수를 식별하려면,&lt;sourceName· 형식을 사용한다: *전체StructureName* | *회원 이름* 예를 들면 groups1/myStruct|내회원

###### 고정 값 SourceNames{#fixed-value-sourcenames} 
EDDTable dataset에서 변수를 만들려면 (단일, 고정 값으로) 그것은 소스 dataset, 사용 되지 않습니다:
```
    <sourceName>=*fixedValue*</sourceName>  
```
초기 동등 기호는 말한다ERDDAP™고정 된 가치는 따릅니다.

* 숫자 변수의 경우, 고정 값은 단일 finite 값 또는 NaN이어야 합니다. (대소문자, 예, \\=NaN) ·
* 문자열 변수의 경우, 고정 값은 단일해야 합니다.[JSON 스타일 문자열](https://www.json.org/json-en.html)  (\\ 문자로 탈출하는 특수 문자) , e.g., \\="My \"Special\" String" .
* timestamp 변수의 경우, 고정값을 숫자로 지정합니다."seconds since 1970-01-01T00:00:00Z"이름 *
단위 = 1970-01-01T00:00:00Z 이후 초.
    
다른 태그&lt;dataVariable&gt; 일반 변수가 있다면 작업.
예를 들어, 0.0의 고정 값으로 고도라는 변수를 만들려면 (팟캐스트) , 사용:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

특별한 상황에서도 지정할 수 있습니다.actual\\_rangeaddAttribute, 대상의 예상값을 무시합니다.Min and destinationMax (그렇지 않으면 고정 주요 특징) ·
 
###### 스크립트 SourceNames/Derived 변수{#script-sourcenamesderived-variables} 
시작하기ERDDAP™v2.10, 에[EDDTable파일](#eddtablefromfiles)·[EDDTable데이터베이스](#eddtablefromdatabase), 또는[EDDTable파일이름](#eddtablefromfilenames)데이터 세트,&lt;sourceName&gt; 일 수 있습니다
이름 * (단일 값으로 평가하는 방정식) , 형식을 사용하여
```
    <sourceName>=*expression*</sourceName>  
```
또는 스크립트 (단일 값을 반환하는 일련의 진술) , 형식을 사용하여
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™자주 묻는 질문[아파치 프로젝트](https://www.apache.org/) [JavaExpression 언어 (사이트맵) ](https://commons.apache.org/proper/commons-jexl/)  (이름:[아파치](https://www.apache.org/licenses/LICENSE-2.0)) 표현을 평가하고 스크립트를 실행합니다.
주어진 새로운 변수의 계산은 결과의 한 줄 내에서 수행되며 모든 행에 반복적으로 수행됩니다.
표현과 스크립트는Java- 및JavaScript-like 구문을 사용할 수 있습니다.
[JEXL에 내장 된 연산자 및 방법](https://commons.apache.org/proper/commons-jexl/reference/syntax.html)·
스크립트도 사용할 수 있습니다 방법 (제품정보) 이 수업에서:
*   [달력2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2)com.cohort.util.Calendar2의 정적, 시간 및 캘린더 관련 방법의 일부에 대한 래퍼입니다 ([이름 *](/acknowledgements#cohort-software)) · 예를 들어,
달력2.parseToEpochSeconds ( *sourceTime, 날짜 시간Format* ) 소스를 파는 것 dateTimeFormat 문자열을 통해 시간 문자열을 반환"seconds since 1970-01-01T00:00:00Z"  (epochSeconds의 특징) 두 배 가치.
*   [수학](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), 거의 모든 정적, 수학 관련 방법에 대한 래퍼입니다[다운로드 수학](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html)· 예를 들어, Math.atan2 ( *₢ 킹* ) 직사각형 좌표 (₢ 킹) 그리고 polar 좌표를 반환 (이중의 배열\\[r, 아타\\]) ·
*   [수학2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2)com.cohort.util의 정적, 수학 관련 방법의 거의 모든 래퍼입니다. 수학2 ([이름 *](/acknowledgements#cohort-software)) · 예를 들어,
수학2.roundTo ( *d의 nPlaces* ) 소수점의 오른쪽에 지정된 숫자의 d를 돌릴 것입니다.
* String, 정적, String-related 메소드의 모든 접근을 제공합니다.[다운로드 스트레이트](https://docs.oracle.com/javase/8/docs/api/java/lang/String)· 문자열 객체ERDDAP™표현과 스크립트는 관련한 모든 것을 사용할 수 있습니다.Javajava.lang에 설명 된 것과 같이 방법. 문자열 문서. 예를 들어 String.valueOf (₢ 킹) 두 배 값 d를 문자열로 변환합니다. (또한 ""+d를 사용할 수 있지만) ·
*   [문자열2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2)com.cohort.util.String2에서 정적, 문자열 및 배열 관련 방법을 위한 래퍼입니다. ([이름 *](/acknowledgements#cohort-software)) · 예를 들어 String2.z에어 패드 ( *번호, nDigits* ) 숫자 문자열의 왼쪽에 0을 추가하므로 숫자의 숫자는 nDigits입니다. (예를 들어, String2.z에어 패드 ("6", 2) 반환 "06") ·
*   [이름 *](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), 소스 데이터 테이블의 현재 행에 다양한 열에서 데이터를 액세스하기위한 비 정적 방법이 있습니다. 예를 들어, row.columnString ("년") 문자열로 "year" 열에서 값을 읽습니다. 여기서, row.column 지원하다 ("년") integer로 "year" 열에서 값을 읽습니다.

보안상의 이유로 표현과 스크립트는 다른 클래스를 사용할 수 없습니다 6.ERDDAP™이 제한을 기본 블랙리스트 생성 (모든 클래스의 블랙리스트) 백리스트 (특히 위에 설명된 6개의 클래스를 허용) · 다른 방법 및 / 또는 다른 클래스가 작업을 수행해야하는 경우, Chris에게 요청을 이메일을 보내주십시오. noaaa.gov의 존.
    
###### 제품정보
EDDTableFromFiles datasets를 위해, 단지 아주, 아주 최소한 있습니다 (아마도 눈에 띄지 않는) 이 변수의 데이터에 대한 요청에 대한 slowdown. EDDTableFromDatabase의 경우, 이 변수에 제약을 포함하는 요청에 대한 거대한 속도의 처벌이 있습니다 (예 : & longitude0360&gt;30 & longitude0360&lt;40) constraints가 데이터베이스에 통과 할 수 없기 때문에 데이터베이스는 훨씬 더 많은 데이터를 돌려줍니다.ERDDAP™  (그것은 아주 시간 consuming) 그래서ERDDAP™새로운 변수를 만들고 constraint를 적용할 수 있습니다. 최악의 경우를 방지하기 위해 (데이터베이스에 전달되지 않는 제약이 없습니다.) ·ERDDAP™데이터베이스가 테이블의 전체 내용을 반환하지 않도록 오류 메시지를 던집니다. (이를 우회하려는 경우, 항상 true, e.g., &time이 아닌 텍스트 컬럼에 제약을 추가하십시오.&lt;3000-01-01.) 이 이유를 들어, EDDTableFromDatabase와 함께, 그것은 항상 더 나은 데이터베이스에서 파생 된 열을 생성하는 것보다 사용sourceName=script 에서ERDDAP·

###### Expression의 개요 (또는 스크립트) 사용 :
tabular data에 대한 사용자 요청에 대한 응답ERDDAP™일련의 소스 파일에서 데이터를 가져옵니다. 각 소스 파일은 원시 테이블을 생성합니다. (소스에서 똑바로) 데이터.ERDDAP™그런 다음 원시 데이터의 테이블을 통해 이동, 행에 의해 행, 그리고 모든 행에 한 번 표현 또는 스크립트를 평가, 그 표현 또는 스크립트를 가지고 새로운 열을 생성하기 위해sourceName·
    
###### 생성데이터셋Xml
GenerateDatasets 참고 Xml는 완전히 unaware 때 변수를 만들 필요가&lt;sourceName&gt;= *이름 ** &lt;/ 한국어sourceName&gt;. 변수를 만들려면datasets.xml손으로.

###### 표현 예제:
새로운 데이터의 열을 생성하는 표현을 사용하는 데이터 변수의 몇 가지 완전한 예입니다. 이 예제를 기대합니다. (그들의 변형) 모든 표현의 사용법의 약 95 %를 커버합니다.sourceName₢ 킹

###### 별도의 "날짜"와 결합"time"지정된 시간 열으로 열:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
이름 *sourceName새로운 표현"time""date"의 문자열 값을 concatenating에 의해 열 (yyyy-MM-dd) 이름 *"time"  (HH: mm: ss의) 소스 파일의 각 행에 열, 그 문자열을 변환하여"seconds since 1970-01-01"  (epochSeconds의 특징) 두 배 가치.

또는 물론, 각 dataset의 소스 날짜와 시간 열에 특정 형식으로 처리 할 시간 형식 문자열을 사용자 정의해야합니다, 참조
[시간 단위 문서](#string-time-units)·

기술적으로, 당신은 사용할 필요가 없습니다 달력2.parseToEpochSeconds () 결합된 date+time을 epochSeconds로 변환합니다. date+time String을 전달할 수 있습니다.ERDDAP™그리고 형식을 지정합니다 (예:
yyyy-MM-dd'T'HH:mm:ss'Z') 단위 속성을 통해. 그러나 epochSeconds로 변환하는 것이 중요한 이점이 있습니다 -- notably, EDDTableFromFiles는 그 때 쉽게 각 파일에 있는 시간 가치의 범위를 추적하고 이렇게 빨리 시간 제약이 있는 요청에 응답할 때 주어진 파일에서 보기를 결정할 수 있습니다.

관련 문제는 별도 년, 월, 날짜, 시간, 분, 두 번째로 소스에서 unified date+time 컬을 만들 필요가있다. 해결책은 아주 유사합니다, 그러나 당신은 수시로 분야의 제로 패드 많은 필요에, 그래서 예를 들면, 달 (1 - 1개) 이름 * (1 - 31 일) 항상 2 자리가 있습니다. 여기에 년, 월, 날짜와 예입니다:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
관련 문제는 소스 테이블의 별도도, 분 및 초 열에 데이터를 결합하여 통합 적도 또는 경도 열을 만들 필요가 있습니다. 예를 들어,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### 0 - 360°에서 -180 - 180°의 값으로 "longitude"라는 열으로 "lon"라는 열을 변환
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
이름 *sourceName표현은 소스 파일의 각 행에 "lon" 열에서 더블 값을 변환하여 새로운 "longitude"열을 만듭니다. (0 - 360의 값으로) -180에서 180의 두 배 가치로 변환하여.

-180의 소스 경도 값을 변환하려는 경우 - 180° 0 - 360°, 사용
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
두 경도 변수를 남는:
dataset가 2개의 경도 변수가 있는 경우, 우리는 사용하는 것을 추천합니다destinationName-180 - 180° 변수와 =longitudedestinationName=경도0360 (그리고 longName=\\Longitude 0-360°") 0 - 360° 변수의 경우. 사용자가 특정 경도 범위 내에서 데이터를 검색하기 위해 Advanced Search를 사용합니다. 그 검색은 지속적으로 모든 데이터 세트에 대한 -180 - 180° 값을 가지고 있다면 더 잘 작동합니다. 또한 dataset의 geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting 및 Easternmost\\_Eastings 글로벌 속성은 일관된 방식으로 설정됩니다. (경도값 -180에서 180°로) ·
    
###### degree\\_의 온도 값으로 "tempF"라는 열을 변환 F는 "tempC"라는 열으로도의 온도가_ 유형:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
이름 *sourceNameexpression은 float degree\\_를 변환하여 새로운 "tempC"열을 만듭니다. 소스 파일의 각 행에 "tempF"열에서 F 값은 float degree\\_ C 값.

데이터셋이 원래 온도를 모두 가질 수 있음을 주의하십시오. F 변수와 새로운 온도 C 변수가 다른 변수를 가지고
```
    <sourceName>tempF</sourceName>
```
###### 바람 "속도"와 "direction" 열을 u,v 구성 요소로 변환
* u 변수를 만들기 위해, use
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* v 변수를 만들기 위해, use
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
또는 주어진 u, v:
* 속도 변수를 만들기 위해, use
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* 방향 변수를 만들기 위해, use
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### 스크립트 예:
스크립트를 사용하지 않는 예입니다.sourceName· 우리는 스크립트를 기대, 표현과 반대, 종종 필요하지 않습니다. 이 경우 목표는 비 NaN 누락 된 값을 반환하는 것입니다. (-99년) 특정한 범위 밖에 온도값을 위해. 스크립트는 "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### 하드 플래그
표현 또는 스크립트를 변경하는 경우sourceName, 당신은 설정해야[하드 플래그](/docs/server-admin/additional-information#hard-flag)dataset의 경우ERDDAP™dataset 및 re-reads에 대한 모든 캐시 된 정보를 삭제 (새로운 표현 또는 스크립트 사용) 다음 시간 그것은 dataset을로드합니다. 대안으로, 당신은 사용할 수 있습니다[팟캐스트](#dasdds)하드 플래그를 설정하는 것과 같다.

###### 퍼센트 인코딩
이것은 단지 거의 관련: 표현과 스크립트가 작성되기 때문에datasets.xmlXML 문서 인 경우 % 인코딩해야합니다.&lt;, \\&gt;, 및 문자의 표현과 스크립트&lt;, &gt;, 및 &amp; .

###### 일반적인 문제
일반적인 문제는 당신이 변수를 만들 것입니다sourceName= = = *이름 ** 그러나 data의 resulting column은 값이 누락되었습니다. 대체로, 새로운 열의 일부 행에는 누락 된 값이 있으며 그들은 그렇지 않다. 아래 문제는 표현과 잘못되어 있습니다.ERDDAP오류가 누락된 값으로 변환됩니다. 문제를 해결하기 위해,

* 문제를 볼 수있는 표현을 봐.
* 자세히 보기[로그.txt](/docs/server-admin/additional-information#log), 이는 각 새로운 열의 생성 중에 생성 된 첫 번째 오류 메시지를 표시합니다.

일반적인 원인은:

* 잘못된 경우를 사용합니다. 표현과 스크립트는 민감한 경우입니다.
* 당신은 클래스의 이름을 omitted. 예를 들어, Math.abs를 사용해야 합니다. () , 뿐만 아니라 abs () ·
* 변환을 하지 않았다. 예를 들어, 매개 변수 값의 데이터 유형이 문자열이며 두 배 값이 있습니다. "+d를 통해 문자열로 두 배를 변환해야합니다.
* 표현의 열명은 파일의 열명을 정확히 일치하지 않습니다. (또는 이름은 일부 파일에서 다를 수 있습니다.) ·
* 표현의 구문 오류가 있습니다. (e.g., 누락 또는 추가 ') ).

당신이 갇히거나 도움이 필요하면,
자주 묻는 질문[더 많은 지원 얻기에 섹션](/docs/intro#support)·
        
###### &lt;destinationName·{#destinationname-1} 
* [기타]&lt;destinationName&gt;] (#destination이름) --에 의해 표시되고 사용 될 변수의 이름ERDDAP™사용자.
    * 이것은 OPTIONAL입니다. 부패 한 경우,[sourceName](#sourcename)사용.
    * 이것은 당신이 암호화 또는 확률을 변경할 수 있기 때문에 유용합니다sourceName·
    *   destinationName는 경우에 과민합니다.
    *   destinationNames는 문자로 시작 (사이트맵) 그리고 MUST는 0개 이상의 문자로 이어질 것입니다. (A-Z, a-z, 0-9 및 \\_) · ('-'은 이전 가능ERDDAP™버전 1.10.) 이 제한은 데이터 변수 이름과 동일 할 수 있습니다.ERDDAP™응답 파일에서, 그리고 그 파일이 프로그램 언어를 포함하여 사용될 모든 소프트웨어에서 (이름 *Python·Matlab·Java스크립트) 변수 이름에 비슷한 제한이 있습니다.
    * EDDTable datasets에서,[경도, 위도, 고도 (또는 깊이) , 및 시간](#destinationname)데이터 변수는 특별합니다.
             
###### &lt;제품정보 유형 & gt;{#datatype} 
* [기타]&lt;데이터타입&gt;] (#자료) -- 소스에서 나오는 데이터 유형을 지정합니다. (어떤 경우, 예를 들어, ASCII 파일에서 데이터를 읽을 때 소스에서 오는 데이터가 저장되어야합니다.) 
    * 이것은 몇몇 dataset 유형 및 다른 사람에 의해 IGNORED에 의해 요구됩니다. Dataset 유형이 필요합니다.dataVariables는:EDDGridfromXxxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTableFromNOS, EDDTableFromSOS· 다른 dataset 유형은 소스에서 정보를 얻기 때문에이 태그를 무시합니다.
         
    * 유효한 가치는 표준의 무엇이든입니다[ERDDAP™데이터 유형](#data-types)플러스 boolean (더 보기) · dataType 이름은 case-sensitive입니다.
         
###### boolean 데이터{#boolean-data} 
*   ["불린"](#boolean-data)특별한 경우입니다.
    * 내부적으로,ERDDAP™booleans가 누락된 값과 대부분의 파일 유형을 저장할 수 없기 때문에 boolean type을 지원하지 않습니다. 또한,DAPbooleans를 지원하지 않으므로 boolean 변수를 쿼리하는 표준 방법이 없습니다.
    * 데이터에 대한 "boolean" 지정 제품정보datasets.xmlboolean 값이 저장되고 바이트로 표현됩니다. 0=false, 1=true, 127=missing\\_value·
    * 사용자는 수치 값을 이용하여 제약을 지정할 수 있습니다. (예를 들어, "isAlive=1") ·
    *   ERDDAP™관리자는 때때로 "boolean" 데이터를 사용해야합니다 제품정보datasets.xml이름 *ERDDAP™데이터 소스와 상호 작용하는 방법 (e.g., 관계 데이터베이스에서 boolean 값을 읽고 0, 1, 또는 127로 변환) ·
         
* dataType에서 소스 파일에서 데이터 변수를 변경하려면 (예를 들면, 짧은) 다른 데이터로 dataset에 있는 유형 (예를 들어, int) , 사용하지 마십시오&lt;dataType&gt; 원하는 것을 지정합니다. (그것은 몇몇 유형의 datasets를 위해 작동합니다, 그러나 다른 사람.) 대신:
    * 제품 정보&lt;dataType&gt; 파일을 지정하려면 (예를 들면, 짧은) ·
    * 내 계정&lt;addAttributes&gt; 변수에 대한, 추가[scale\\_factor](#scale_factor)새로운 데이터와 속성 제품정보 (예를 들어, int) 예를 들어 1의 값,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [기타]&lt;addAttributes&gt;] (#variable-addattributes는) -- 속성 세트 정의 ( *이름 ** = = = *제품정보* ) 변수에 대한 소스의 속성에 추가되어 변수에 대한 결합 속성을 만듭니다. 이것은 OPTIONAL입니다.
변수의 경우[소스Attributes](#variable-addattributes)또는&lt;addAttributes&gt; 포함[scale\\_factor및/또는add\\_offset](#scale_factor)속성, 그들의 값은 클라이언트에 배포하기 전에 소스에서 데이터를 해제하는 데 사용됩니다. unpacked 변수는 동일한 데이터 유형의 것입니다. (예를 들어 float) 으로scale\\_factor이름 *add\\_offset가치.
        
###### 옵션 정보&lt;addAttributes&gt; {#variable-addattributes} 
* [기타] ** Variable Attributes / 변수&lt;addAttributes· ** · (#variable-addattributes는) --&lt;addAttributes&gt; 내의 OPTIONAL 태그입니다&lt;axisVariable&gt; 또는&lt;dataVariable&gt; 변수의 속성을 변경하는 데 사용되는 태그.
    
    *    ** 변수의 사용&lt;addAttributes&gt; 변수의 속성을 변경합니다. ** ERDDAP™dataset의 소스에서 변수의 속성을 결합 (** 소스Attributes **)와 변수의** addAttributes **당신이 정의하는datasets.xml  (우선 순위) 변수의 "** 관련 기사 ** ", 이는 무엇인가ERDDAP™사용자 참조. 따라서, 당신은 사용할 수 있습니다addAttributessourceAttributes의 값을 redefine하고, 새로운 속성을 추가하거나 속성을 제거하십시오.
    * 보기 [ ** &lt;addAttributes· **이름 * (#addattributes를 추가) 글로벌 및 변수에 적용** &lt;addAttributes· ** ·
    *   ERDDAP™다양한 방법으로 이러한 속성을 많이 사용합니다. 예를 들어, colorBar 값은 사용할 수 있는 변수를 만들기 위해서는WMS지도는 일관된 colorBars로 할 수 있다 그래야.
    *   [경도, 위도, 고도 (또는 깊이) , 시간 변수](#destinationname)메타데이터를 많이 자동적으로 (예를 들어,[단위 단위](#units)) ·
    * 샘플&lt;addAttributes&gt; 데이터 변수의 경우:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

빈 NumberOfObservations 속성은 소스 번호OfObservations 속성을 원인 (이름 *) 마지막으로, 속성의 결합 목록에서 제거됩니다.
    * 이 정보를 공급하는 데 도움이ERDDAP™더 나은 일을 하고 사용자는 datasets를 이해합니다.
좋은 metadata는 dataset usable 만듭니다.
metadata는 dataset 쓸모가 있습니다.
metadata 속성에 좋은 일을 할 시간을 가져 가라.
    
###### 댓글에 대한 변수 속성은 특별한에서ERDDAP::

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)RECOMMENDED 변수 속성입니다. 예를 들어,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* 이 속성은[사이트맵COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)이름 *[CF 1.7 이상](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata 기준.
* 현재, 그것은 같은 데이터 유형의 두 값의 배열이 변수의 대상 데이터 유형으로, 실제 지정 (이론적 또는 허용되지 않음) 그 변수에 대한 데이터의 최소 및 최대 값.
* 데이터가 포장되면[scale\\_factor및/또는add\\_offset](#scale_factor)·actual\\_rangeunpacked 값이 있어야 하며 unpacked 값과 같은 데이터 유형이 있어야 합니다.
* 몇몇 자료 근원을 위해 (예를 들어, 모든 EDDTableFrom ... 파일 datasets) ·ERDDAP™수정하기actual\\_range각 변수와 설정actual\\_range이름 * 다른 자료 소스로 (예를 들어, 관계 데이터베이스, Cassandra,DAP당,Hyrax) , 그것은 문제 일 수 있습니다 또는 범위를 계산 소스에 대 한 부담, 그래서ERDDAP™요청하지 않습니다. 이 경우 설정할 수 있는 경우actual\\_range  (특히 경도, 위도, 고도, 깊이 및 시간 변수) 이름 *actual\\_range각 변수의 속성 [&lt;addAttributes&gt;] (#addattributes를 추가) 이 dataset에 대해datasets.xml, 예를 들면,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* 한국어[시간 및 타임스탬프 변수](#time-units), 지정된 값은 관련 소스이어야한다 (여행안내) 숫자 값. 예를 들어, 소스 시간 값이 1985-01-01 년 이후 "일로 저장되면actual\\_range1985-01-01년부터 "일에서 지정되어야 합니다. 그리고 당신이 정기적으로 갱신되는 근실한 자료의 가까이에 두번째 가치로 지금 참조하고 싶은 경우에, 당신은 NaN를 사용해야 합니다. 예를 들어, 현재까지 1985-01-17의 데이터 범위를 지정하려면

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* 이름 *actual\\_range알려진 (이더에 의해ERDDAP™calculating 그것 또는 당신이 그것을 통해 추가해서&lt;addAttributes&gt;),ERDDAP™데이터 액세스 양식에 사용자에 표시 ( *datasetID* 사이트맵) 그리고 Graph 웹 페이지를 만드십시오 ( *datasetID* ·) 데이터셋을 위해 FGDC 및 ISO 19115 메타데이터를 생성할 때 사용합니다. 또한, 마지막 시간의 7 일actual\\_range기본 시간 설정으로 사용됩니다.
* 이름 *actual\\_range알려진, 사용자는 사용할 수[소요시간 () 그리고 최대 () 제품정보](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)종종 매우 유용합니다.
* 모든 EDDTable... datasets를 위해, 만약에actual\\_range이름 * (그것을 지정하거나ERDDAP™그것을 계산) ·ERDDAP™데이터에 대한 모든 요청을 신속하게 거부 할 수 있습니다. 예를 들어, dataset의 가장 낮은 시간 값이 1985-01-17에 해당한다면 1985-01-16을 통해 1985-01-16을 통해 모든 데이터에 대한 요청은 즉시 오류 메시지로 거부됩니다 "당신의 쿼리는 일치하는 결과를 생성하지." 이것은actual\\_rangemetadata의 아주 중요한 조각, 그것을 저장할 수 있기 때문에ERDDAP™많은 노력과 사용자를 많은 시간을 절약. 그리고이 하이라이트는actual\\_range값은 데이터의 실제 범위보다 좁아서는 안됩니다. 그렇지 않으면,ERDDAP™자주 묻는 질문 "관련 데이터가 없을 때 일치하는 데이터가 없습니다."
* 사용자가 데이터의 하위 세트를 선택하고 메타데이터를 포함하는 파일 유형 요청 (예를 들어,.nc) ·ERDDAP™수정하기actual\\_range응답 파일에서 subset의 범위를 반영합니다.
* 더 보기[data\\_min이름 *data\\_max](#data_min-and-data_max), 어떤 대안 방법이 지정하는actual\\_range· 그러나, 이들은 지금 deprecatedactual\\_rangeCF 1.7+에 의해 정의됩니다.
         
###### 색상 바 특성{#color-bar-attributes} 
Color bar의 제안된 기본 속성을 지정하는 여러 OPTIONAL 변수 속성이 있습니다. (이미지에 데이터값을 색상으로 변환하기) 이 변수에.
* 현재 이 정보는 griddap에 의해 기본 정보로 사용됩니다.tabledap색상 바를 사용하는 이미지를 요청할 때마다.
* 예를 들어, latitude-longitude gridded data가 맵의 적용으로 도포 될 때, Color bar는 데이터 값이 색상으로 변환되는 방법을 지정합니다.
* 이 값을 사용하면ERDDAP™다른 요청에 따라 일관된 색상 막대를 사용하는 이미지를 만들려면 시간과 다른 치수 값이 다를 때도 다릅니다.
* 이 속성 이름은 사용 중 생성되었습니다.ERDDAP· 메타데이터 표준은 없습니다.
* 색상 바와 관련된 속성은 다음과 같습니다.
    *    **colorBarMinimum** colorBar의 최소값을 지정합니다. 예를 들어,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * 데이터가 포장되면[scale\\_factor및/또는add\\_offset](#scale_factor), 지정colorBarMinimumunpacked 값으로.
    * Data 값 더 낮은colorBarMinimum같은 색상으로 표현됩니다.colorBarMinimum가치.
    * 속성이 있어야한다[type="더블"](#attributetype), 데이터 변수의 유형에 관계없이.
    * 값은 보통 좋은 둥근 수입니다.
    * 가장 좋은 관행: 최소 데이터 값보다 약간 더 높은 값을 권장합니다.
    * 기본값은 없습니다.
*    **colorBarMaximum** colorBar에 최대값을 지정합니다. 예를 들어,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * 데이터가 포장되면[scale\\_factor및/또는add\\_offset](#scale_factor), 지정colorBarMinimumunpacked 값으로.
    * 데이터 값보다 높은colorBarMaximum같은 색상으로 표현됩니다.colorBarMaximum가치.
    * 속성이 있어야한다[type="더블"](#attributetype), 데이터 변수의 유형에 관계없이.
    * 값은 보통 좋은 둥근 수입니다.
    * 가장 좋은 관행: 최대 데이터 값보다 약간 낮은 값을 추천합니다.
    * 기본값은 없습니다.
*    **색상 : BarPalette의 특징** colorBar에 대한 팔레트를 지정합니다. 예를 들어,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * 모든 것ERDDAP™임명은 이 표준 팔레트를 지원합니다: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, 토피, 토피, 토피, 토피\\[추가 v1.74\\], WhiteBlack, WhiteBlueBlack 및 WhiteRedBlack.
    * 설치 방법[추가 팔레트](/docs/server-admin/additional-information#palettes), 당신은 그들 중 하나를 참조 할 수 있습니다.
    * 이 속성이 존재하지 않는 경우, 기본값은 BlueWhiteRed if \\-1\\*colorBarMinimum= = =colorBarMaximum; 그렇지 않으면 기본값은 레인보우입니다.
*    **색상바스카** ColorBar의 스케일을 지정합니다. 예를 들어,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * 유효 값은 선형 및 로그입니다.
    * 값이 로그인 경우colorBarMinimum0 이상이어야합니다.
    * 이 속성이 존재하지 않는 경우, 기본값은 선형입니다.
*    **색상 : Bar연속** ColorBar는 색상의 연속 팔레트를 가지고 있는지 여부를 지정하거나 ColorBar는 몇 가지 분리 색상이 있는지 여부. 예를 들어,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * 유효한 값은 true와 false 문자열입니다.
    * 이 속성이 존재하지 않는 경우, 기본값은 true입니다.
*    **색상BarNSections** ColorBar의 기본 숫자를 지정합니다. 예를 들어,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * 유효 값은 긍정적 인 정수입니다.
    * 이 속성이 존재하지 않는 경우, 기본값은 \\-1입니다.ERDDAP™ColorBar의 범위에 따라 섹션의 수를 선택합니다.
###### WMS {#wms} 
변수에 대한 주요 요구 사항은ERDDAP이름 *WMS서버는:
* dataset는 있어야 합니다EDDGrid... 데이터 세트.
* 데이터 변수 MUST는 gridded 변수입니다.
* 데이터 변수 MUST에는 경도와 위도 축 변수가 있습니다. (다른 축 변수는 OPTIONAL입니다.) 
* -180과 180 사이 약간 경도값이 있습니다.
* 더 보기colorBarMinimum이름 *colorBarMaximum속성 MUST 지정됩니다. (다른 색상 바 속성은 OPTIONAL입니다.) 

###### data\\_min이름 *data\\_max {#data_min-and-data_max} 
*   [ **data\\_min** 이름 * **data\\_max** ](#data_min-and-data_max)-- 이들은 World Ocean Circulation Experiment에서 정의된 변수 속성을 deprecated (한국어) metadata 묘사. 예를 들어,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * 우리는 당신이 사용하는 것이 좋습니다[actual\\_range](#actual_range), 대신data\\_min이름 *data\\_max, 때문에actual\\_rangeCF 사양에 의해 정의됩니다.
    * 현재, 그들은 같은 데이터 유형의 대상 데이터 유형의 변수, 그리고 실제 지정해야 (이론적 또는 허용되지 않음) 그 변수에 대한 데이터의 최소 및 최대 값.
    * 데이터가 포장되면[scale\\_factor및/또는add\\_offset](#scale_factor)·data\\_min이름 *data\\_maxunpacked data type을 사용하여 값이 부과되어야 합니다.
         
###### 지원하다drawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- 이것은 OPTIONAL 변수 속성입니다.ERDDAP™  (그리고 metadata 기준 없음) dataset의 Make A Graph 형태로 "Draw Land Mask" 옵션에 대한 기본 값을 지정합니다. ( *datasetID* ·) and for the &.land 매개변수 in a URL requesting a map of the data. 예를 들어,
    ```
        <att name="drawLandMask">under</att>  
    ```
이름 *[drawLandMask관련 기사](#drawlandmask)·
###### 로그인{#encoding} 
*   [ **\\_코딩** ](#encoding)
    * 이 속성은 String variables에서만 사용할 수 있습니다.
    * 이 속성은 강력하게 권장됩니다.
    * 이 속성은[NetCDF사용자 가이드 (이름 *) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html)·
    * 내부에서ERDDAP™, Strings는 사용하는 2-byte 문자의 순서입니다.[유니코드 UCS-2 문자 세트](https://en.wikipedia.org/wiki/UTF-16)·
    * 많은 파일 형식은 문자열에 1 바이트 문자 만 지원하므로이 속성이 관련성을 식별해야합니다.
        [사이트맵 (AKA 코드 페이지) ](https://en.wikipedia.org/wiki/Code_page)이는 UCS-2 문자 집합에서 그려진 256 문자 집합에 256 가능한 값을 매핑하는 방법을 정의하고 인코딩 시스템, 예를 들어,[사이트맵](https://en.wikipedia.org/wiki/UTF-8)  (문자당 1과 4 바이트 사이 필요) ·
    * \\_Encoding의 값은 case-insensitive입니다.
    * 이론,ERDDAP™\\_Encoding 식별자 지원[이 IANA 목록](https://www.iana.org/assignments/character-sets/character-sets.xhtml), 그러나 연습에서,ERDDAP™현재 지원
        * ISO-8859-1 인증 (그것은 dashes, underscores가없는주의) , 그것은 Unicode의 첫 번째 256 문자와 동일 하 고
        * UTF-8입니다.
    * 소스 파일을 읽을 때, 기본 값은 ISO-8859-1이며, netcdf-4 파일을 제외하고 기본값은 UTF-8입니다.
    * 이것은 많은 소스 파일 사용 charsets 또는 ISO-8859-1와 다른 인코딩 때문에 지속적인 문제가 발생하지만 charset 또는 인코딩을 식별하지 않습니다. 예를 들어, 많은 소스 데이터 파일에는 Windows에서 Microsoft Word에서 복사 및 붙여 넣기가 있으며 ASCII hyphens 및 apostrophes 대신 Windows-specific charset에서 멋진 하이픈 및 apostrophes가 있습니다. 이 문자는 확률 문자 또는 '?'로 표시됩니다.ERDDAP·
         
###### 파일AccessBaseUrl{#fileaccessbaseurl} 
*    **[파일AccessBaseUrl](#fileaccessbaseurl)파일AccessSuffix** 어떤 표준을 사용하지 않는 매우 희소한 속성입니다. EDDTable 열이 웹 액세스 파일의 파일명이있는 경우 (e.g., 이미지, 비디오, 또는 오디오 파일) , 당신은 추가할 수 있습니다
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
기본 URL을 지정하기 (으로 종료 /) filenames를 완전한 URL로 만들기 위해서는 필요하다. 열이 .png 파일에 참조 할 때와 같은 예외적 인 경우, ".png", 당신은 추가 할 수 있습니다
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(예:&lt;파일 형식: .png (2000x2400)&lt;/a&gt;)
suffix 를 지정하여 filenames 를 완전한 URL로 지정합니다. 다음 것.htmlTable응답,ERDDAP™전체 URL 링크로 filename을 표시합니다. (기본 정보 Url 플러스 파일 이름 플러스 suffix) ·

당신이 원하는 경우ERDDAP™관련 파일을 제공하기 위해 별도의[EDDTable파일이름](#eddtablefromfilenames)해당 파일에 대한 dataset (개인 데이터셋이 될 수 있습니다.) ·
    
###### 파일AccessArchive 뚱 베어{#fileaccessarchiveurl} 
*   [ **파일AccessArchive 뚱 베어** ](#fileaccessarchiveurl)어떤 표준이 아닌 매우 드문 사용 속성입니다. EDDTable 열이 웹 액세스 파일의 파일명이있는 경우 (e.g., 이미지, 비디오, 또는 오디오 파일) 아카이브를 통해 접근 가능 (₢ 킹.zip파일 형식) URL을 통해 액세스, 사용&lt;att 이름="fileAccessArchiveUrl"&gt; *사이트맵* &lt;/att&gt; 아카이브 URL을 지정합니다.
    
당신이 원하는 경우ERDDAP™아카이브 파일을 제공하기 위해 별도의[EDDTable파일이름](#eddtablefromfilenames)그 파일에 대한 dataset (개인 데이터셋이 될 수 있습니다.) ·
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- 이것은 REQUIRED 변수 속성입니다.&lt;variablesMustHaveIoosCategory&gt;는 true로 설정됩니다. (기본값) 내 계정[설정.xml](/docs/server-admin/deploy-install#setupxml); 그렇지 않으면, OPTIONAL입니다.
예를 들어,&lt;이름 =ioos\\_category"&gt; 서비스&lt;/에트&gt;
이 카테고리에서[NOAA통합 Ocean Observing System (IOOS 정보) ](https://ioos.noaa.gov/)·
    
    *    (이 글을 쓰는 것) 우리는이 이름의 형식 정의를 인식하지 않습니다.
    * 핵심 이름은 Zdenka Willis의 .ppt "Integrated Ocean Observing System입니다. (IOOS 정보)  NOAA's Approach to Building an Initial Operating Capability" 과에서[미국 IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (페이지 1-5) ·
    * 이 목록이 미래에 개정 될 가능성이있다. 요청이 있으시면 Chris에게 이메일을 보내주십시오. noaaa.gov에서 존.
    *   ERDDAP™Bob Simons가 추가 이름을 추가했기 때문에 IOOS보다 더 큰 범주를 지원합니다. (주로 과학 분야의 이름을 기반으로 예를 들어, 생물학, 생태, Meteorology, 통계, 세금) 다른 유형의 자료.
    * 현재 유효한 값ERDDAP™Bathymetry, Biology, Bottom Character, CO2, Colored Dissolved Organic Matter, Contaminants, Currents, Dissolved Nutrients, Dissolved O2, Ecology, Fish Abundance, Fish Species, Heat Flux, Hydrology, Ice Distribution, Identifier, Location, Meteorology, Ocean Color, Optical Properties, Other, Pathogens, Phytoplankton Species, Pressure, Productivity, Quality, Salinity, Rainforest, Contton, Rainforest, Contensor, Zoos, Rainforest, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Wild Waves, Greens, Greens, Greens, Greens, Greens, Greens, Greens, Wild Waves, Greens, Greens, Wild Waves, Greens, Greens, Greens, Greens, Greens, Greens, Greens, Green
    * 다른 용어들 사이의 약간 과도한 관계가 있습니다 -- 너의 베스트를하십시오.
    * 추가하기ioos\\_category본문 바로가기&lt;categoryAttributes· 내 계정ERDDAP이름 *[설정.xml](/docs/server-admin/deploy-install#setupxml)파일, 사용자는 쉽게 유사한 자료를 가진 datasets를 찾아낼 수 있습니다ERDDAP's "Search for Datasets by Category" 홈 페이지.
        [사용 방법ioos\\_categorydatasets of interest를 검색합니다.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * 자세히보기[자주 묻는 질문ERDDAP™이름 *ioos\\_category내 계정ERDDAP™Google 그룹.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
설정할 수 있습니다.&lt;variablesMustHaveIoosCategory&gt; 에 false 그래서 이 속성은 필요하지 않습니다. ("Pfft&#33; 나에게 무엇을?) 어떤 이유로 그것을 true로 설정 (기본값) 이름 *ioos\\_category이름:
    
    * setup.xml의 경우&lt;변수MustHaveIoosCategory&gt; true로 설정[생성데이터셋Xml](#generatedatasetsxml)항상 생성/쓰기ioos\\_category각 새로운 dataset에서 각 변수에 대한 속성. 왜 그냥 떠나지?
    *   ERDDAP™datasets of interest by category를 검색할 수 있습니다.ioos\\_categoryioos\\_categories 때문에 매우 유용한 검색 카테고리입니다 (예를 들면, 온도) 꽤 넓습니다. 이것은ioos\\_category이 목적을 위해 훨씬 더, 예를 들면, 다량 finer-grained CFstandard\\_name₢ 킹 (모든 문법과 약간의 변이 때문에 이 목적을 위해 그렇게 좋지 않다. 예를 들어, sea\\_surface\\_temperature versus sea\\_water\\_온도) ·
(미국)ioos\\_category이 목적을 위해 통제됩니다&lt;categoryAttributes&gt; 당신의 setup.xml 파일에서.)
        [사용 방법ioos\\_categorydatasets of interest를 검색합니다.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * 이 카테고리에서[NOAA통합 Ocean Observing System (IOOS 정보) ](https://ioos.noaa.gov/)· 이 카테고리는 IOOS의 미션의 설명에 기초합니다. 로그인NOAA, 지원ioos\\_category좋은 한국어NOAA할 일. (이 시계[한국어NOAA비디오](https://www.youtube.com/watch?v=nBnCsMYm2yQ)감사합니다&#33;) 다른 미국 또는 국제 기관에 있는 경우에, 또는 정부 기관과 일, 또는 다른 어떤 대양 관측 체계도 일하고, 미국 IOOS 사무실과 협력하는 좋은 아이디어가 아닙니다?
    * 더 이상, 당신은 다른 것을 원할지도 모릅니다ERDDAP™데이터셋에 연결하기[EDDGrid언어: en](#eddfromerddap)이름 *[EDDTableErddap에서](#eddfromerddap)· 다른 경우ERDDAP™견적 요청ioos\\_category, 당신의 datasets는 있어야 합니다ioos\\_category주문하기EDDGridFromErddap 및 EDDTableFromErddap에서 작업합니다.
    * 그것은 심리적으로 훨씬 쉽게 포함ioos\\_categorydataset를 만들 때 (그것은 단지 또 다른 것ERDDAP™dataset을 추가해야 합니다.ERDDAP) , 사실 후에 그것을 추가하기 보다는 (미래에 그것을 사용하기로 결정한 경우) ·
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)·[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) RECOMMENDED 변수 속성은ERDDAP· 예를 들어,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™사용 방법long\\_name그래프에서 axes 라벨링을 위해.
    * 가장 좋은 관행: 단어를 자본화long\\_name제목이 있다면 (첫 번째 단어와 모든 비 입자 단어를 수도) · 단위를 포함하지 마십시오long\\_name· 긴 이름은 매우 길지 않아야합니다 (보통)&lt;20자), 그러나 더 원시적이어야한다[destinationName](#destinationname), 수시로 아주 concise입니다.
    * 이름 *long\\_name" 변수의 정의되지 않습니다.[소스Attributes](#variable-addattributes)또는&lt;addAttributes&gt;,ERDDAP™청소에 의해 생성[standard\\_name](#standard_name)  (현재 위치) 또는destinationName·
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)이름 * **\\_요금 주요 특징**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) 숫자를 설명하는 변수 속성 (예를 들면, -9999) 누락 된 값을 나타내는 데 사용됩니다. 예를 들어,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

String 변수의 경우, 기본값은 ""입니다. (빈 문자열) ·
숫자 변수의 경우, 기본값은 NaN입니다.
*   ERDDAP™모두 지원missing\\_value그리고 \\_FillValue는, 몇몇 자료 근원이 그들에 약간 다른 의미를 할당하기 때문에.
* 현재 같은 데이터 유형의 변수가 있어야 합니다.
* 데이터가 포장되면[scale\\_factor및/또는add\\_offset](#scale_factor)·missing\\_value그리고 \\_FillValue 값은 마찬가지로 포장되어야한다. 유사하게, 문자열 date/time 값과 열에 대한 로컬 사용[time\\_zone](#time_zone)·missing\\_value그리고 \\_FillValue 값은 로컬 시간대를 사용한다.
* 변수가 이러한 특별한 값을 사용하는 경우,missing\\_value그리고/또는 \\_FillValue 속성은 REQUIRED입니다.
* 제품 정보[시간 및 타임스탬프 변수](#time-units)  (소스가 문자열 또는 숫자인지 여부) ·missing\\_values와 \\_FillValues는 ""로 나타납니다 (빈 문자열) 시간이 문자열로 작성되면 NaN 때 시간이 두 배로 작성됩니다. 소스 값missing\\_value그리고 \\_FillValue는 변수의 메타데이터에 표시되지 않습니다.
* 문자열 변수를 위해,ERDDAP™항상 변환missing\\_values 또는 \\_FillValue 데이터 값 "" (빈 문자열) · 소스 값missing\\_value그리고 \\_FillValue는 변수의 메타데이터에 표시되지 않습니다.
* 숫자 변수의 경우:
더 보기missing\\_value그리고 \\_FillValue는 변수의 메타데이터에 표시됩니다.
몇몇 산출 자료 체재를 위해,ERDDAP™이 특별한 숫자 intact, 예를 들면, 당신은 -9999를 볼 것입니다.
다른 산출 자료 체재를 위해 (.csv와 같은 텍스트와 같은 형식.htmlTable) ·ERDDAP™NaN 또는 ""로 이러한 특수 번호를 대체합니다.
* 일부 데이터 유형에는 명시적으로 식별 할 필요가 없습니다 누락 된 값 마커가 있습니다.missing\\_value또는 \\_FillValue 속성 : float 및 더블 변수는 NaN (번호) , String 값은 빈 문자열을 사용, char 값은 문자가 있다\\uffff  (캐릭터 #65535, 유니코드의 캐릭터가 아닌 값입니다.) · Integer 데이터 유형은 잘못된 누락 된 값 마커가 없습니다.
* integer 변수가 누락된 값이 있다면 (예를 들어, .csv 파일에 빈 위치) ·ERDDAP™정의로 값을 해석한다.missing\\_value또는 \\_FillValue는 그 변수입니다. 정의되지 않은 경우,ERDDAP™그 데이터 유형에 대한 기본 누락 값으로 값을 해석합니다. 즉, 데이터 유형에 의해 수행 할 수있는 최대 값입니다.
127 바이트 변수, 32767 짧은, 2147483647 int, 9223372036854775807 긴,
ubyte, ushort 용 65535, uint 용 4294967295 및 ulong 용 18446744073709551615에 대한 255.
###### ADD \\_FillValue ATTRIBUTES·{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES·](#add-_fillvalue-attributes)  
각 시간ERDDAP™dataset을로드하면 integer 소스 데이터 유형의 변수가 정의 된 경우 확인합니다.missing\\_value또는 \\_FillValue 속성. 변수가 없다면,ERDDAP™로그 파일에 메시지를 인쇄 ("Add \\_FillValue Attribute"로 시작하는 것은?) 추천하는 것ERDDAP™관리자 추가 \\_Fill 이 변수의 값 속성datasets.xml· \\_FillValue가 있는 모든 변수에 매우 유용합니다.missing\\_value잘못된 값이 항상 가능하기 때문에, 예를 들어, dataset의 주어진 파일이 주어진 변수가 없으면,ERDDAP™그 변수에 대한 모든 누락된 값이 있는 변수를 제시할 수 있어야 합니다. 변수를 결정하면 \\_FillValue 속성이 없으므로 추가 할 수 있습니다.
    &lt;int name="\\_FillValue"&gt;누엘&lt;/att&gt; 대신 그 메시지를 억제 할 것datasetID미래에 +variable 조합.
    
각 시간ERDDAP™시작, 그것은 로그 파일에 기록 된 메시지로 모든 것을 수집 (시작하기ADD \\_FillValue ATTRIBUTES·) , 이메일ERDDAP™관리자 및 CSV 데이터 파일에 기록\\[큰Parent감독\\]/logs/ 디렉토리. 원한다면 GenerateDatasetsXml 프로그램을 사용할 수 있습니다. (addFillValueAttributes 옵션) CSV 파일에서 모든 제안을 적용하려면datasets.xml파일. 모든 것datasetID/variable는 그 파일에 조합, 당신이 속성을 추가 할 필요가 없다는 것을 결정하면, 속성을 변경할 수 있습니다&lt;int name="\\_FillValue"&gt;누엘&lt;/att&gt; 그 권고를 억제하기 위해datasetID미래에 +variable 조합.
    
이것은 중요합니다&#33;
밥은 종종 말했다 : 그것은 나쁜 것 (그리고 embarrasing) 지구 온난화의 증거의 일부가 데이터에 인식 된 누락 된 값에 의해 발생했다 (e.g., 99 또는 127도의 온도 값_ C는 누락된 값으로 표시되고 따라서 의미와 / 또는 미디어 통계를 더 많이 접목) ·

* \\_FillValue와missing\\_value다른 소스 파일에서 주어진 변수에 대한 값은 일관성이어야한다; 그렇지 않으면,ERDDAP™값의 한 세트로 파일을 수락하고 "Bad Files"로 다른 모든 파일을 거부합니다. 문제를 해결하기 위해,
    * 파일이 gridded 경우.nc파일, 당신은 사용할 수 있습니다[EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked)·
    * 파일이 tabular 데이터 파일인 경우, EDDTableFrom...Files를 사용할 수 있습니다. 이름 *[표준화 이름 *](#standardizewhat)이름 *ERDDAP소스 파일을 표준화하기 위해ERDDAP·
    * 더 단단한 문제를 위해, 당신은 사용할 수 있습니다[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)문제 해결.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (기본 = 1) 이름 * **add\\_offset**   (기본 = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) 간단한 변환을 통해 단순 데이터 유형에서 포장되는 데이터를 설명하는 OPTIONAL 가변 속성입니다.
    * 현재 데이터 유형은 소스 데이터 유형과 다르며 대상 값의 데이터 유형을 설명합니다.
예를 들어, 데이터 소스는 짧은 ints로 포장 된 한 소수 손가락으로 플로트 데이터 값을 저장할 수 있습니다. (인치16) , 사용scale\\_factor= 0.1 과add\\_offset= 0. 예를 들어,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

이 예제에서,ERDDAP™데이터를 풀고 사용자가 플로트 데이터 값으로 제공합니다.
    * 현재 위치ERDDAP™이 속성에서 값을 추출하고 속성을 제거하고 사용자가 데이터를 자동으로 해제합니다.
이름 * 값 = 소스 가치 \\*scale\\_factor+ 더보기add\\_offset  
또는, 다른 방법을 명시:
unpackedValue = 포장 가치 \\*scale\\_factor+ 더보기add\\_offset
    * 더 보기scale\\_factor이름 *add\\_offset다른 소스 파일에서 주어진 변수에 대한 값은 일관성이어야한다; 그렇지 않으면,ERDDAP™값의 한 세트로 파일을 수락하고 "Bad Files"로 다른 모든 파일을 거부합니다. 문제를 해결하기 위해,
        * 파일이 gridded 경우.nc파일, 당신은 사용할 수 있습니다[EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked)·
        * 파일이 tabular 데이터 파일인 경우, EDDTableFrom...Files를 사용할 수 있습니다. 이름 *[표준화 이름 *](#standardizewhat)이름 *ERDDAP소스 파일을 표준화하기 위해ERDDAP·
        * 더 단단한 문제를 위해, 당신은 사용할 수 있습니다[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)문제 해결.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata 표준) RECOMMENDED 변수 속성은ERDDAP· CF는 허용된 목록을 유지합니다.[CF 표준 이름](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)· 예를 들어,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * 추가하기standard\\_name변수의 속성에 추가standard\\_name본문 바로가기&lt;categoryAttributes· 내 계정ERDDAP이름 *[설정.xml](/docs/server-admin/deploy-install#setupxml)파일, 사용자는 쉽게 유사한 자료를 가진 datasets를 찾아낼 수 있습니다ERDDAP's "Search for Datasets by Category" 홈 페이지.
    * CF를 지정하면standard\\_name변수의 단위 속성은 CF 표준 이름 테이블의 표준 이름을 지정하는 Canonical Units와 동일하지만, 단위는 Canonical Units로 변환 할 수 없습니다. 예를 들어, 모든 온도 관련 CFstandard\\_names에는 "K" (켈빈) Canonical 단위로. 그래서 온도 관련 변수standard\\_nameMUST에는 K, degree\\_C, degree\\_F, 또는 그 이름의 일부 UDUnits 변형이 있으며, 모든 상호 변환이 가능합니다.
    * 가장 좋은 관행: 힘의 부분[통제되는 vocabularies](https://en.wikipedia.org/wiki/Controlled_vocabulary)목록의 용어만 사용할 수 있습니다. 그래서 우리는 통제 된 구급차에서 정의 된 용어에 넣을 것이 좋습니다, 그리고 우리는 목록에서 적절한 것을하지 않는 경우 용어를 만들기에 대해 권장합니다. 추가 조건이 필요한 경우, 표준위원회가 통제 된 구급차에 추가하는 경우.
    *   standard\\_name값은 케이스가 민감한 유일한 CF 속성 값입니다. 그들은 항상 모든 lowcase입니다. 시작하다ERDDAP™v1.82, GenerateDatasets는 더 낮은 케이스 문자로 대문자를 변환합니다. dataset가 로드될 때ERDDAP, uppercase 편지는 더 낮은 케이스 문자로 조용히 변경됩니다.
         
###### time\\_precision {#time_precision} 
*   time\\_precision사용한 OPTIONAL 속성입니다.ERDDAP™  (그리고 metadata 기준 없음) 제품정보[시간 및 타임스탬프 변수](#time-units), 이는 gridded datasets 또는 tabular datasets에 있을지도 모르다, 안으로axisVariables 또는dataVariable₢ 킹 예를 들어,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precision언제 사용할 정밀도를 지정합니다.ERDDAP™웹 페이지에 문자열로 그 변수에서 시간값을 지정합니다..htmlTable응답. 파일 형식ERDDAP™문자열로 형식 시간 (예를 들면, .csv 및.json) ·ERDDAP™만 사용time\\_precision- 분수 초를 포함하는 경우에 지정한 체재; 그렇지 않으면,ERDDAP™1970-01-01T00:00:00 사용 Z 형식.
* 유효 값은 1970-01, 1970-01-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (기본값) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00.00Z, 1970-01-01T00:00:00.000Z.\\[1970은 단일 번호이므로 옵션이 아닙니다.ERDDAP™formatted time string이라면 알 수 없습니다. (1년) 또는 1970-01-01T00:00:00Z 이후 몇 초의 수입니다.\\]
* 이름 *time\\_precision지정하지 않거나 값은 일치하지 않습니다. 기본값은 사용됩니다.
* 여기, 다른 부분에서ERDDAP™, 표시되지 않은 형식 된 시간의 모든 필드는 최소한의 값을 가지고 가정됩니다. 예를 들어 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z 및 1985-07-01T00:00:00 Z는 모두 동일하게 간주됩니다, 정밀도의 다른 수준과는 달리. 이 경기[ISO 8601:2004년"extended"시간 체재 명세](https://www.iso.org/iso/date_and_time_format)·
*    **경고:** 제한을 사용해야 합니다.time\\_precision이름 * **모든 것** 변수의 데이터 값은 숨겨져 있는 모든 필드에 대한 최소값만 가지고 있습니다.
    * 예를 들어, 사용할 수 있습니다.time\\_precision1970-01-01의 모든 데이터 값이 hour=0, min=0, Second=0이 있는 경우 (예를 들면 2005-03-04T00:00:00Z와 2005-03-05T00:00:00Z) ·
    * 예를 들어, 사용하지 마십시오time\\_precision1970-01-01-01의 비-0 시간, 분, 또는 초 가치가 있는 경우에, (예를 들면 2005-03-05T12:00:00Z) 비 과태 시간 값이 표시되지 않기 때문에. 그렇지 않으면 사용자가 time=2005-03-05로 모든 데이터를 요청하면 요청이 예기치 않게 실패합니다.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zone사용한 OPTIONAL 속성입니다.ERDDAP™  (그리고 metadata 기준 없음) 제품정보[시간 및 타임스탬프 변수](#time-units), 이는 gridded datasets 또는 tabular datasets에 있을지도 모릅니다.
    * 기본값은 "Zulu· (GMT의 현대 시간대 버전) ·
    * 배경 정보: "time offsets" (e.g., 태평양 표준시, -08:00, GMT-8) 고정, 특정, 상쇄 상대Zulu  (주요특징) · 대조적으로, "시간 영역"은 Daylight Saving에 영향을받는 훨씬 더 복잡한 것들입니다. (예, "미국 / 태평양") , 다른 시간에 다른 장소에 다른 규칙이 있었다. 시간대는 항상 간단한 오프셋 값으로 요약 할 수 없기 때문에 이름이 있습니다. (테이블에 "TZ 데이터베이스 이름"열을 참조하십시오[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) ·ERDDAP이름 *time\\_zone속성은 일부 시간대에서 현지 시간 데이터를 처리하는 데 도움이됩니다. (예, 1987-03-25T17:32:05 주요사업 (주)) · 문자열 또는 숫자 시간 데이터가있는 경우 (설치하기) 시간 상쇄, 당신은 단순히 자료를 조정해야 합니다Zulu  (그것은 무엇인가ERDDAP™이름 *) 단위 속성에 다른 기본 시간을 지정하여 (e.g., "시간 이후 1970-01-01T08:00:00Z", T08을 참고하여 시간 오프셋을 지정합니다.) , 항상 당신이 원하는 결과를 얻을 수있는 결과를 확인합니다.
    * Strings에서 소스 데이터를 가진 timestamp 변수를 위해, 이 속성은 당신이 리드 타임 영역을 지정할 수 있습니다ERDDAP™로컬 시간대 소스 시간을 변환 (어떤 표준 시간에, 일광 절약 시간에 약간) 로그인Zulu시간 : (항상 표준 시간에) · 유효한 시간대의 목록은 아마도 TZ 칼럼의 목록과 동일합니다.[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)· 일반 미국 시간대는 미국/하와이, 미국/알래스카, 미국/태평양, 미국/산, 미국/아리조나, 미국/중앙, 미국/동부입니다.
    * numeric source data를 가진 timestamp variables를 위해, 당신은 "를 지정할 수 있습니다time\\_zone" 속성이지만 값은 "이어야한다.Zulu"또는 "UTC". 다른 시간대에 대한 지원이 필요하면 Chris에게 이메일을 보내주십시오. noaaa.gov의 존.
         
###### 단위 단위{#units} 
*   [ **단위 단위** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)·[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 표준) 데이터 값의 단위를 정의합니다. 예를 들어,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "units"는 sourceAttribute 또는 addAttribute로 필요합니다."time"변수와 적절한 경우 다른 변수에 대해 STRONGLY RECOMMENDED (거의 항상) ·
    * 일반적으로, 우리는 추천합니다[UD단위](https://www.unidata.ucar.edu/software/udunits/)\\-compatible 단위에 의해 요구되는[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)이름 *[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)표준.
    * 다른 일반적인 기준은 입니다[한국어](https://unitsofmeasure.org/ucum.html)-- 측정 단위의 통합 코드.[OGC](https://www.ogc.org/)같은 서비스[SOS](https://www.ogc.org/standards/sos)·[WCS](https://www.ogc.org/standards/wcs)·[WMS](https://www.ogc.org/standards/wms)UCUM을 요구하고 수시로 UOM을 참조 (측정의 단위) ·
    * 모든 데이터 세트에 대해 하나의 단위 표준을 사용하는 것이 좋습니다.ERDDAP· 당신은 말해야ERDDAP™어떤 표준을 사용하여&lt;units\\_standard&gt;, 당신의[설정.xml](/docs/server-admin/deploy-install#setupxml)파일.
    * 다른 소스 파일에서 주어진 변수에 대한 단위는 일관성해야합니다. 파일의 한 하위 세트가 파일의 다른 단위 값을 사용 하는 데이터 파일의 모음이 있다면 (예를 들어,
"일 이후 1985-01-01"는 "일 이후 2000-01-01",
"degree\\_Celsius"는 "deg\\_C", 또는
"knots" versus "m/s") 당신은 단위 값을 표준화하는 방법을 찾을 필요가, 그렇지 않으면,ERDDAP™파일의 한 하위 설정만로드합니다. 그것에 대해 생각 : 한 파일이 windSpeed units=knots 및 또 다른 경우 windSpeed units=m / s, 두 파일에서 값은 동일한 집계 된 데이터 세트에 포함되지 않아야합니다.
        * 파일이 gridded 경우.nc파일, 많은 상황에서 당신은 사용할 수[EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked)·
        * 파일이 탭 데이터 파일 인 경우, 많은 상황에서 당신은 EDDTableFrom...Files를 사용할 수 있습니다 이름 *[표준화 이름 *](#standardizewhat)이름 *ERDDAP소스 파일을 표준화하기 위해ERDDAP·
        * 더 단단한 문제를 위해, 당신은 사용할 수 있습니다[사이트맵](#ncml-files)또는[NCO](#netcdf-operators-nco)문제 해결.
    * CF 표준 섹션 8.1 변수의 데이터가 통해 포장 된 경우[scale\\_factor및/또는add\\_offset](#scale_factor), "변수의 단위는 포장되지 않은 데이터의 대표자이어야한다."
    *   [시간 및 타임스탬프 변수의 경우,](#time-units)변수의[소스Attributes](#variable-addattributes)또는&lt;addAttributes· (선지자들) 지원하다[단위 단위](#units)이름 *
        
        * 시간 축 변수 또는 시간 데이터 변수를 숫자 데이터로:[UD단위](https://www.unidata.ucar.edu/software/udunits/)\\ 호환 문자열 (파일 형식 *단위 단위* 이름 * *기본시간* ) 소스 시간 값을 해석하는 방법 (예를 들어, 1970-01-01T00:00:00Z 이후 초) ·
            
         *단위 단위* 어떤 것일 수 있습니다:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
기술적으로,ERDDAP™하지 않습니다.UDUNITS변환 할 때 표준"years since"이름 *"months since"시간 값"seconds since"· 더 보기UDUNITS표준은 고정으로 1 년을 정의, 단일 값 : 3.15569259747e7 초. 이름 *UDUNITS년/12으로 달을 정의합니다. 불행히도, 우리가 사용했던 모든 datasets"years since"또는"months since"명확하게 달력 년 또는 달력 달이 될 가치. 예를 들어, 3"months since 1970-01-01"보통 1970-04-01를 의미하는 것입니다. 그래서,ERDDAP™연구분야"years since"이름 *"months since"달력 년 및 달로, 엄격히 따르지 않습니다UDUNITS표준.
            
더 보기 *기본시간* ISO 8601:2004이어야 합니다 (₢ 킹) formatted 날짜 시간 문자열 (yyyy-MM-dd'T'HH:mm:sZ, 예를 들어, 1970-01-01T00:00:00Z) , 또는 그 어떤 변화 (예를 들어, 끝에 누락된 부품) ·ERDDAP™예를 들어, "1970-1-1 0:0:0"이 지원됩니다. 시간대 정보가 누락되면, 그것은 가정됩니다Zulu시간 영역 (AKA의 GMT) · 다른 시간 오프셋이 지정되면,ERDDAP™Daylight 저축 시간을 결코 사용하지 마십시오. baseTime이 다른 형식을 사용한다면, 사용해야 합니다.&lt;addAttributes&gt; ISO 8601:2004의 변화를 사용하는 새로운 단위 문자열을 지정합니다. (₢ 킹) 형식 (예 : 1985년 1월 1일부터 1985년 1월 1일 이후 변경일
        
당신은 시험할 수 있습니다ERDDAP특정할 수 있는 능력 *단위 단위* 이름 * *기본시간* 이름 *ERDDAP이름 *[시간 변환기](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)· 희망적으로, 당신은 수에 플러그를 할 수 있습니다 (데이터 소스의 첫 번째 시간 값?) 그리고 단위 문자열, 변환을 클릭, 과ERDDAP™ISO 8601:2004로 변환 할 수 있습니다 (₢ 킹) formatted 날짜 시간 문자열. 변환기는 단위 문자열이 인식되지 않는 경우 오류 메시지를 반환합니다.

###### 문자열 시간 단위{#string-time-units} 
*   [문자열 데이터와 시간 또는 타임스탬프 데이터 변수의 단위 속성을 위해,](#string-time-units)지정해야 합니다.[JavaScript licenses API 웹 사이트](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)제품 정보 (java.text와 주로 호환됩니다. SimpleDate구성) 문자열 시간을 해석하는 방법을 설명합니다.
    
ISO 8601:2004의 변화인 통용된 시간 체재를 위해 (₢ 킹) 표준 체재 (예를 들어, 2018-01-02T00:00:00Z) , 당신은 변이를 지정할 수 있습니다yyyy-MM-dd'T'HH:mm:sZ, 예를 들면, 사용yyyy-MM-dd문자열 시간만 날짜가 있다면. yyyyy-M로 시작하는 모든 형식을 위해,ERDDAP형식의 미성년자 변이의 매우 포용되는 특별한 파서를 사용합니다. 파서는 형식의 'Z', "UTC", "GMT", ±XX : XX, ±XXXX 및 ±XX 형식의 시간대를 처리 할 수 있습니다. 날짜 시간의 부분이 지정되지 않은 경우 (예를 들면, 분 및 초) ·ERDDAP™그 분야에 가장 낮은 가치를 가정 (예를 들어, 초가 지정되지 않은 경우, seconds=0은 가정됩니다.) ·
    
다른 모든 문자열 시간 형식의 경우, 당신은 정확하게 DateTimeFormatter 호환 시간 형식 문자열을 지정해야합니다. 이름 *yyyy-MM-dd'T'HH:mm:ssZ, 이 형식의 문자열은 문자열의 특정 유형의 정보를 식별하는 문자에서 내장되어, 예를 들어, m은 분 시간을 의미합니다. 형식의 문자를 몇 번 반복하면 의미를 더 정제합니다. 예를 들어 m은 숫자의 숫자에 의해 지정 될 수 있음을 의미합니다. mm는 값이 2 자리에 지정되어야한다는 것을 의미합니다. 더 보기JavaDateTimeFormatter에 대한 문서는 crude 개요이며이 세부 사항을 명확하게 만들지 않습니다. 그래서 여기에 형식 문자 변형과 그들의 의미의 목록입니다ERDDAP™  (때로는 약간 다릅니다.Java's DateTimeFormatter'에 대해) ::
    
    |이름 *|이름 *|이름 *|
    |--- ---|--- ---|--- ---|
    |U, 그렇습니다, Y|\\-4712, 0, 1, 10, 100, 2018|1 년 번호, 숫자의 모든 수.ERDDAP™y 치료 (1년차) 그리고 Y (일주일에 근거하여, 이것은 종종 y 대신 실수로 사용) 으로 u,[astronomical 년 번호](https://en.wikipedia.org/wiki/Astronomical_year_numbering)· 천문학 년은 BCE를 사용하지 않는 긍정적 또는 부정적인 정수입니다. (BC 주) 또는 세륨 (광고안내) 시대 설계자 : 2018 = 2018CE, ..., 2 = 2CE, 1 = 1CE, 0 = 1BCE, -1 = 2BCE, -2 = 3BCE, ...|
    |우우유, yyyy, 인기 있는|\\-4712, 0000, 0001, 0010, 0100, 2018|a 4 자리 천문학 년 번호 ("-"를 의하면)  |
    |사이트맵|1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,|한 달 번호, 숫자의 모든 수 (1=1월)  |
    |모델 번호: MM|01, 12, 12, 12, 12, 12, 12, 12, 12, 14|2자리 (제로 패딩) 월 번호|
    |모형: MMM|1월, jan, JAN|a 3 문자 영어 월 이름, 케이스 insensitive|
    |모델 번호: MMMM|1월, jan, JAN, 1월, 재연, JANUARY|a 3 문자 또는 전체 영어 월 이름, 케이스 무감각|
    |₢ 킹|1, 01, 31일|일 개월 번호, 숫자의 모든 수|
    |₢ 킹|01, 31일|2자리 (제로 패딩) 1 개월. 첫번째 'digit'은 공간일 수 있습니다.|
    |사이트맵|1, 001, 366명|일년, 숫자의 수, 001=Jan 1|
    |사이트맵|001, 366명|일 년, 3 자리, 001=Jan 1|
    |₢ 킹|thu, 목, 목|a 3 Letter day-of-week, 값은 파싱 할 때 무시됩니다|
    |₢ 킹|목요일, 목요일, 목요일, 목요일|3개의 편지 또는 가득 차있는 영어 일의 주, 케이스 과민한, 가치는 파싱 때 무시됩니다|
    |사이트맵|0, 00, 23 ·|영업시간 (0-23년) , 숫자의 어떤 수|
    |사이트맵|00 · 23|HH 시간의 일 (00-23 ·) , 2개의 손가락. 첫번째 'digit'은 공간일 수 있습니다.|
    |한국어|오전, 오후, 오후|AM 또는 PM, 케이스 민감성|
    |₢ 킹|12, 1, 01, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12|시계 시간의 - am - pm (12, 1, 2, ... 11) , 숫자의 어떤 수|
    |뚱 베어|12, 01, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12|시계 시간의 - am - pm (12, 1, 2, ... 11) , 2개의 손가락. 첫번째 'digit'은 공간일 수 있습니다.|
    |·|0, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1|영업시간 (0, 1, ... 11) , 숫자의 어떤 수|
    |사이트맵|00, 01, 11월|시간-of-am-pm, 2 자리|
    |m/분|0, 00, 59, ·|분당 시간, 숫자의 수|
    |두께: mm|00, 59, ·|분 시간, 2 자리|
    |₢ 킹|0, 00, 59, ·|두 번째 분, 숫자의 수|
    |사이트맵|00, 59, ·|초당 분, 2 자리|
    |사이트맵|0, 000, 9, 999번|소수점, 숫자의 숫자를 따르는 것처럼 fraction-of-second,|
    |사이트맵|00, 99 원|두 번째의 백, 2 자리|
    |사이트맵|100, 999, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000, 000|초당 수천, 3 자리|
    |·|0, 000, 86399999번|millisecond-of-day, 숫자 수|
    |AAA어학원|팩스:+81-3-3221-2619|millisecond-of-day, 8개의 손가락|
    |사이트맵|0, 00000000000000, 86399999999999|nanosecond-of-day, 숫자의 수. 내 계정ERDDAP™, 이것은 nMillis에 truncated.|
    |프로젝트|팩스: +49 (0) 86399999999999|nanosecond-of-day, 14의 손가락. 내 계정ERDDAP™이것은 nMillis에 truncated.|
    |₢ 킹|0, 00000,000,000, 59999999999|nanosecond-of-second의 어떤 수 손가락. 내 계정ERDDAP™이것은 nMillis에 truncated.|
    |nnnnnnnnnnn, 영국|00000000000, 599999999999999의|nanosecond-of-second의 11의 손가락. 내 계정ERDDAP™이것은 nMillis에 truncated.|
    |Xxx 영화|Z, -08:00, +01:00|형식 'Z' 또는 ±의 시간대 (2개의 손가락 시간 상쇄) :: (2 자리 분 오프셋) · 이 치료 *(주)* 으로 + (비표준) · ZZZ 지원 'Z'는 비표준이지만 일반적인 사용자 오류로 거래됩니다.|
    |XX의 ZZ|· +0100|형식 'Z' 또는 ±의 시간대 (2개의 손가락 시간 상쇄) :: (2 자리 분 오프셋) · 이 치료 *(주)* 으로 + (비표준) · ZZ 지원 'Z'는 비표준이지만 일반적인 사용자 오류로 거래됩니다.|
    |사이트맵|Z, -08, +01, ·|형식 'Z' 또는 ±의 시간대 (2개의 손가락 시간 상쇄) :: (2 자리 분 오프셋) · 이 치료 *(주)* 으로 + (비표준) · Z 지원 'Z'는 비표준이지만 일반적인 사용자 오류로 거래됩니다.|
    |XXX 튜브|\\-08:00, +01:00|체재 ±를 가진 시간대 (2개의 손가락 시간 상쇄) :: (2 자리 분 오프셋) · 이 치료 *(주)* 으로 + (비표준) ·|
    |뚱 베어|\\-0800, +0100|체재 ±를 가진 시간대 (2개의 손가락 시간 상쇄)  (2 자리 분 오프셋) · 이 치료 *(주)* 으로 + (비표준) ·|
    |₢ 킹|\\-08, +01|체재 ±를 가진 시간대 (2개의 손가락 시간 상쇄) · 이 치료 *(주)* 으로 + (비표준) ·|
    |이름 *|'T', 'Z', 'GMT'|리터 문자의 시리즈의 시작과 끝|
    |이름 * 이름 * (두 개의 단일 견적)  |이름 * 이름 *|두 개의 단일 인용문은 리터 단일 인용문을 나타냅니다.|
    | \\[\\] | \\[ \\] |시작하기 (·\\[·) 그리고 끝 (·\\]·) 선택 영역의. 이 표기는 리터 문자와 형식 문자열의 끝에만 지원됩니다.|
    |#, &#123;, &#125;|#, &#123;, &#125;|공지사항|
    |G, L, Q, E, C, V, Z, O, p, L, Q, E, C, V, Z, O, P, O, P, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T|     |이 형식의 문자가 지원됩니다.Java's DateTimeFormatter, 하지만 현재 지원되지 않음ERDDAP· 당신이 그들을 위해 지원을 필요로하는 경우, Chris. noaaa.gov의 존.|
    
참고 :
    
    * 의 날짜 시간에 punctuation, 숫자 값은 숫자의 변수 수를 가질 수있다 (예를 들어, 미국 슬래시 날짜 형식 "1/2/1985", 달과 날짜는 1 또는 2 자리 일 수 있습니다.) 그래서 형식은 1-letter 토큰, 예를 들어, M/d/yyyyyyyyy, 달과 날짜에 대한 숫자를 허용해야합니다.
    * 항목의 숫자가 일정한 경우, 예를 들어, 01/02/1985, 그리고 형식의 숫자의 숫자를 지정합니다. 예를 들어, MM/dd/yyyyyyyyyyyyy for 2-digit month, 2-digit date, 그리고 4 digit year.
    * 이 형식은 까다로운 작업입니다. 주어진 형식은 대부분을 위해 작동 할 수 있지만, 모든, 주어진 변수의 시간 문자열. 항상 지정된 형식이 예상대로 작동한다는 것을 확인합니다.ERDDAP모든 변수의 시간 문자열.
    * 가능한 경우 GenerateDatasetXml는 시간 형식 문자열을 제안합니다.
    * 형식 문자열을 생성하는 데 도움이 필요하면 Chris에게 이메일을 보내주십시오. noaaa.gov의 존.

주요 시간 데이터 변수 (tabular datasets를 위해) 주요 시간 축 변수 (gridded datasets를 위해) 인증 및 인증[destinationName](#destinationname)시간. 그들의 단위 메타 데이터는 숫자 시간 값에 대한 UDUnits 호환 단위 문자열, 예를 들어, "일 이후 1970-01-01" (tabular 또는 gridded datasets를 위해) , 또는[문자열 시간에 적합 한 단위](#string-time-units), 예를들면, "M/d/yyyyy" (tabular datasets를 위해) ·

다른 Griddeded에 있는 다른 시간 단위.nc파일 - Gridded의 컬렉션이 있다면.nc파일, 시간 변수의 경우, 파일의 한 하위 세트는 파일의 하나 이상의 다른 하위 세트보다 다른 시간을 사용, 당신은 사용할 수 있습니다[EDDGrid보낸 사람NcFilesUnpacked](#eddgridfromncfilesunpacked)· 시간값을 변환합니다."seconds since 1970-01-01T00:00:00Z"더 낮은 수준에서, 차이를 숨기고, 당신이 이질 파일의 수집에서 하나의 데이터 세트를 만들 수 있습니다.

###### TimeStamp 변수{#timestamp-variables} 
[TimeStamp 변수](#timestamp-variables)-- 다른 변수 (axisVariable또는dataVariable, 에서EDDGrid또는 EDDTable dataset) timeStamp 변수가 될 수 있습니다. Timestamp 변수는 시간 관련 단위와 시간 데이터가 있는 변수이지만,&lt;destinationName&gt; 시간 보다는 다른. TimeStamp 변수는 소스의 시간 형식을 변환하는 주요 시간 변수와 같은 동작"seconds since 1970-01-01T00:00:00Z"ISO 8601:2004년 (₢ 킹) 형식).ERDDAP™시간 인식 그들의 시간 관련 "에 의해 스탬프 변수[단위 단위](#units)" metadata, 이 정규식과 일치해야합니다"\\[사이트맵\\]+ +주 +\\[0-9의\\]· (숫자 날짜 예를 들어,"seconds since 1970-01-01T00:00:00Z") 또는 날짜 "uuuuu", "yyyyyyyy"또는 "YYYYYYY"를 포함하는 시간 형식 문자열 (예를 들어, "yyyy-MM-dd"T'HH:mm:sZ") · 그러나 아직도 사용destinationName "time"주요 날짜 시간 변수.

 **항상 당신의 일을 확인합니다 그 시간 자료에서 표시ERDDAP™정확한 시간 자료입니다.** 시간 데이터 작업은 항상 까다로운 오류가 있습니다.

이름 *[time variables에 대한 더 많은 정보](#destinationname)·
ERDDAP™유틸리티를 가지고[숫자 변환 시간 /에서 문자열 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)·
이름 *[이름 *ERDDAP™거래 시간](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)·
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** , 또는 **valid\\_min** 이름 * **valid\\_max** ](#valid_range)-- 이것들은 OPTIONAL 변수 속성이 정의되어 있습니다.[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)metadata 협약. 예를 들어,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

또는

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * 현재, 그들은 같은 데이터 유형의 변수, 그리고 그 변수에 대한 데이터의 유효한 최소 및 최대 값을 지정한다. 사용자는 이 범위 밖에 값을 고려해야 합니다.
    *   ERDDAP™적용되지 않음valid\\_range· 다른 방법:ERDDAP™외부의 데이터 값을 변환하지 않습니다.valid\\_range\\_Fill에 가치 또는missing\\_value·ERDDAP™그냥이 메타 데이터에 전달하고 당신에게 응용 프로그램을 잎.
왜? 이 메타데이터가 무엇인지. 데이터 공급자가 원했다면 데이터 공급자는 외부의 데이터 값을 변환 할 수 있습니다valid\\_range으로 \\_FillValues.ERDDAP™두 번째는 데이터 공급자를 추측하지 않습니다. 이 접근법은 더 안전합니다. 나중에 보았던 경우valid\\_range너무 좁거나 그렇지 않으면 잘못되었습니다.ERDDAP™데이터가 유출되지 않습니다.
    * 데이터가 포장되면[scale\\_factor및/또는add\\_offset](#scale_factor)·valid\\_range·valid\\_min이름 *valid\\_max포장된 데이터 유형과 값이어야 합니다. 이름 *ERDDAP™이름 *scale\\_factor이름 *add\\_offset데이터셋을 로드할 때,ERDDAP™할 수 없습니다valid\\_range·valid\\_min이름 *valid\\_max대상 metadata (사용자에 표시) unpacked 데이터 유형과 범위를 나타냅니다.
또는 unpacked\\_인 경우valid\\_range속성은 현재, 그것은 renamedvalid\\_range현재 위치ERDDAP™dataset를 로드합니다.
##### &lt;removeMVRows&gt;{#removemvrows} 
* [기타] ** &lt;removeMVRows를 제거하십시오 ** · (#removemvrows에 대 한) 태그 내의 OPTIONAL 태그입니다datasets.xml에 대한 EDDTableFromFiles (모든 subclasses를 포함) EDDTableFromMultidimNcFiles에서만 사용되는 데이터 세트. true 또는 false의 값을 가질 수 있습니다. 예를 들어, true
이 모든 값이 있는 그룹 끝에 행의 모든 블록을 제거한다.missing\\_value, \\_FillValue, 또는 CoHort ...Array 기본 누락 값 (또는 CharArrays의 char=#32) · 이것은 CF DSG 다차원 배열 파일 유형 및 유사한 파일을 위해 입니다. true이면 적절한 테스트를 수행하므로 항상 모든 max dim 변수를로드하므로 여분의 시간을 취할 수 있습니다.
기본값은 false입니다.
추천 -- 데이터셋을 위해 가능한 경우, removeMVRows를 false로 설정하는 것이 좋습니다. removeMVRows를 true로 설정하면 약간의 데이터셋이 필요할 수 있습니다.
