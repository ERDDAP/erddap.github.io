---
title: "EDDTableFromEML" 
---
# EDDTableFromEML 및 EDDTableFromEMLBatch GenerateDatasets에 있는 선택권 사이트맵

\\[이 웹 페이지는 오직 관심의 것입니다ERDDAP™EML 파일로 작업하는 관리자.
이 문서는 원래 2016 년에 작성되었습니다. 2020-11-30에 마지막으로 편집되었습니다.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)사용자를 제공하는 데이터 서버는 일반 파일 형식의 그리드 및 탭 과학 데이터 세트의 하위 세트를 다운로드하고 그래프와지도를 만듭니다.ERDDAP™주어진 dataset와 다차원의 그룹으로 동작한다. (e.g., 위성 또는 모델 데이터) 또는 데이터베이스와 같은 테이블 (각 유형의 정보와 각 관측의 행에 대한 열) ·ERDDAP™무료이며 오픈 소스 소프트웨어이므로 누구나 할 수 있습니다.[다운로드 및 설치ERDDAP™](/docs/server-admin/deploy-install)데이터 제공

데이터셋을 추가하려면ERDDAP™설치,ERDDAP™관리자는 XML의 펑크를 추가해야합니다 dataset 파일을 호출datasets.xml· (있음[관련 문서datasets.xml](/docs/server-admin/datasets)·) XML의 펑크를 생성 할 수 있지만datasets.xml손으로 완전히,ERDDAP™호출 도구와 함께[ **생성데이터셋Xml** ](/docs/server-admin/datasets#tools)dataset에 대한 정보의 일부 소스를 기반으로 주어진 dataset에 필요한 XML의 펑크의 거친 초안을 생성 할 수 있습니다.

첫 번째 것 GenerateDatasets Xml는 만들고 싶은 dataset의 유형입니다. Generate데이터셋 Xml에는 특별한 선택권이 있습니다, **연락처** , 정보의 사용[Ecological 메타데이터 언어 (메시지:) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML 파일을 생성하기 위해 XML의 펑크datasets.xml더 보기[EDDTableAsciiFiles에서](/docs/server-admin/datasets#eddtablefromasciifiles)EML 파일에 각 데이터 테이블에서 dataset. 이것은 대부분의 EML 파일에 매우 잘 작동, 주로 때문에 EML 파일은 쉽게 작업과 형식으로 데이터 세트에 필요한 메타 데이터의 모든 저장의 우수한 작업을 수행. GenerateDatasetsXml가 datasets를 만드는 데 필요한 정보는 데이터 파일의 URL을 포함하여 EML 파일에 있으며, GenerateDatasetsXml의 다운로드, 구문 및 EML 파일에 대한 설명을 비교합니다. (많은 그룹은 EML로 전환 할뿐만 아니라 모든 tabular 과학 데이터 세트를 문서화하기위한 훌륭한 시스템입니다. XML 스키마를 만들 수있는 많은 그룹은 EML을 사용하는 것이 좋을 것입니다. XML 스키마에 대한 사례 연구는 점에, 과도하게 깊은 (i.e., 너무 많은 수준) 인간과 컴퓨터를 위해 쉽고.) 

## 이름 *{#questions} 

여기에 모든 질문 GenerateDatasets Xml는 당신이 단지 하나의 EML 파일 또는 EML 파일의 배치를 처리하려는 경우 대답하는 방법에 대한 의견과 함께 묻습니다 :

* 어떤 EDDType?
한 파일만을 처리하려면, 대답: EDDTableFromEML
파일 그룹을 처리하려는 경우, 대답: EDDTableFromEMLBatch
* 파일 저장 디렉토리?
다운로드 EML 및 / 또는 데이터 파일을 저장하는 데 사용되는 디렉토리의 이름을 입력하십시오.
디렉토리가 존재하지 않으면 생성됩니다.
*    (EDDTableFromEML에 대 한 한국어) EML URL 또는 로컬 파일 이름?
EML 파일의 URL 또는 로컬 파일 이름을 입력하십시오.
*    (EDDTableFromEMLBatch 전용) EML 디 (URL 또는 로컬) ·
EML 파일과 디렉토리의 이름을 입력 (URL 또는 로컬 dir) ·
예를 들면: http://sbc.lternet.edu/data/eml/files/
 
*    (EDDTableFromEMLBatch 전용) 파일 이름 regex?
EML 디렉토리에서 원하는 EML 파일을 식별하는 데 사용되는 일반 표현을 입력하십시오.
예를 들면: knb-lter-sbc\\.\\d+
* 현재 로컬 파일 사용 (한국어|이름 *) ·
기존의 로컬 EML 파일과 데이터 파일을 사용하기 위해 true를 입력하면 존재한다면.
항상 EML 파일을 다시 다운로드하고 / 또는 데이터 파일.
* (주) 이름 *
새 데이터셋을 원한다면 개인 데이터셋이 됩니다.ERDDAP, 그룹 이름 지정 (₢ 킹) 접근할 수 있습니다.
LTER 그룹에 대한 권장 : "lter" 플러스 그룹, 예를 들어, lter 한국어
"null"을 입력하면 아무 것도 없습니다.&lt;(주) To&gt; 산출에 있는 꼬리표.
이름 *[(주) 으로](/docs/server-admin/datasets#accessibleto)·
* 한국어 시간 영역 (미국/태평양) ·
시간 변수가 로컬 시간 값을 나타내는 경우, 이 시간대는 할당됩니다.
이것은 값이어야한다.[시간대 이름의 TZ 열 목록](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)·
목록의 끝에서 easy-to-use "US/..."이름을 모두 참고하십시오.
나중에 잘못된 것을 발견하면 변경할 수 있습니다.time\\_zone의 펑크에datasets.xml·

EML 플러스ERDDAP™좋은 조합, 이후ERDDAP™사용자에게 더 직접 액세스 할 수 있습니다.[Biocomplexity에 대한 지식 네트워크 (사이트맵) ](https://knb.ecoinformatics.org/)이름 *[장기 생태 연구 (사이트맵) ](https://lternet.edu/)데이터 및 해당 프로젝트는 미국 정부의[연구 결과에 대한 공공 액세스 (뚱 베어) 제품 정보](https://nosc.noaa.gov/EDMC/PD.DSP.php)웹 서비스를 통해 사용할 수있는 데이터를 만들기. 또한, EML 플러스ERDDAP™연방 기관의 과학자 / NSF-funded realm 및 과학자 사이의 위대한 교량처럼 보인다 (NOAA, NASA, 미국) 뚱 베어

더 보기[더 많은 지원 얻기에 섹션](/docs/intro#support)·
 
## 회사연혁{#design-details} 

여기에 GenerateDatasetsXml의 EDDTableFromEML 옵션의 디자인 세부 사항입니다.
일부는 어떻게 EML과 관련ERDDAP™것들과 GenerateDatasets 방법 Xml는 이러한 문제로 거래합니다.

### 1개의 dataTable는 1입니다ERDDAP™데이터셋{#one-datatable-becomes-one-erddap-dataset} 
하나의 EML 파일이 여러 가지&lt;제품정보 테이블 & gt;s.ERDDAP™하나하나ERDDAP™EML dataTable 당 dataset. 더 보기datasetIDdataset의 경우
 *EML이름* ₢ 킹 *테이블Number*   (EMLname은 텍스트입니다.) 또는
 *시스템 \\_EMLName* ₢ 킹 *테이블Number*   (EMLname이 숫자일 때) ·
예를 들어, knb-lter-sbc.28 파일에서 테이블 #1이 됩니다.ERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML은 CF + ACDD를 반대{#eml-versus-cfacdd} 
거의 모든 메타 데이터는 EML 파일에 도착ERDDAP, 그러나 다른 체재에서.ERDDAP™사용 방법[사이트맵](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)이름 *[사이트맵](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata 기준. 글로벌 메타데이터를 위한 key=value 쌍을 사용하고 각 변수의 메타데이터를 위한 보완적인 메타데이터 시스템입니다.
예, 메타 데이터의 EML 표현은 CF + ACDD 표현보다 더 훌륭합니다. 나는 CF + ACDD 표현을 사용하여 제안하지 않습니다. CF+ACDD의 일부로 생각하십시오.OPeNDAP/CF/ACDD 세계.
     
### 작은 변화{#small-changes} 
ERDDAP™작은 변화를 많이합니다. 예를 들어,ERDDAP™사용 EML 비-DOI이름 * Identifier와 dataTable 번호로ERDDAP™ datasetID, 하지만 약간 변경 교체 Identifier는 대부분의 컴퓨터 언어에서 유효한 가변 이름을, 예를 들어, knb-lter-sbc.33 데이터 테이블 #1 knb\\_lter\\_sbc\\_33\\_t1이 됩니다.
     
### DocBook을{#docbook} 
EML은 DocBook의 마크 업 시스템을 사용하여 구조가 EML 파일에 텍스트의 차단을 제공합니다. CF 및 ACDD는 metadata가 일반 텍스트라고 요구합니다. 그래서 GenerateDatasets Xml는 텍스트의 포맷 된 버전처럼 보이는 일반 텍스트로 표시된 텍스트를 변환합니다. 인라인 태그는 사각형 브래킷, 예를 들어,\\[더 보기\\], 그리고 일반 텍스트에서 왼쪽.
     
### 데이터 파일{#data-files} 
EML dataTable 이후 실제 데이터 파일의 URL을 포함, GenerateDatasets Xml는:
1. 데이터 파일 다운로드.
2. EML 파일과 같은 디렉토리에 저장합니다.
3. 데이터 읽기.
4. 파일의 실제 데이터와 EML의 데이터의 설명 비교.
5. GenerateDatasets의 경우 Xml는 차이를 발견, 그것은 그들과 거래, 또는 차이가 괜찮을 경우 연산자를 요청, 또는 오류 메시지를 반환. 자세한 내용은 아래의 다양한 항목에 있습니다.
         
### .zipd 데이터 파일{#zipd-data-files} 
참고된 데이터 파일이 있는 경우.zip파일, 그것은 단지 하나의 파일을 포함해야합니다. 그 파일은 사용할 수 있습니다ERDDAP™데이터셋. 1개 이상의 파일이 있는 경우.ERDDAP™데이터셋을 거부합니다. 필요한 경우, 이것은 수정 될 수 있습니다. (실제로 모든 SBC LTER zip 파일에는 하나의 데이터 파일이 있습니다.)   
     
### 저장 유형{#storagetype} 
열의 저장 유형은 지정하지 않습니다,ERDDAP™데이터 파일에 데이터를 기반으로 최고의 추측을 사용합니다. 이것은 꽤 잘 작동합니다.
     
### 제품정보{#units} 
ERDDAP™제품정보[UDUNITS단위를 위한 formatting](https://www.unidata.ucar.edu/software/udunits/)· Generate데이터셋 Xml는 EML 단위를 변환 할 수 있습니다UDUNITS시간의 95 %에 대해 깨끗하게합니다. 나머지 5 %는 단위의 읽기 쉬운 설명에서 결과, 예를 들어, "biomassDensityUnitPerAbundanceUnit"는 EML에서 "생물 밀도 단위"가됩니다ERDDAP· 기술이 허용되지 않습니다. 나는 그것을 생각하지 않는다.\\[필요한 경우, 할 수없는 단위UDUNITS호환은 변수의 주석 속성으로 이동할 수 있습니다.\\]  
     
### EML 버전 2.1.1{#eml-version-211} 
이 지원 EML v2.1.1 파일에 추가되었습니다 GenerateDatasets Xml 2016에서 EML 커뮤니티에 대한 몇 가지 섭취가 있음을 희망합니다. 2020 년 이후, 그 일이 없었다. 더 보기ERDDAP™개발자는 EML의 더 최근 버전에 대한 지원을 추가하는 것이 행복하지만, 새로운 기능이 실제로 사용될 경우에만. 자주 묻는 질문erd.data at noaa.gov당신은 EML의 더 최근 버전에 대한 지원을 원하면 실제로이 기능을 사용합니다.
     

## EML 파일 문제{#issues-with-the-eml-files} 

소프트웨어 클라이언트가 문제를 일으키는 원인이 되는 EML 파일에 몇몇 문제점/problems가 있습니다 (GenerateDatasetsXML의 EDDTableFromEML 옵션과 같은) 해석 / 처리하는 EML 파일.

* 여기에 나열된 몇 가지 문제가 있지만, 그들은 주로 작지만, 쉬운 문제입니다. 일반적으로, EML은 훌륭한 시스템이며, 그것은 그것과 함께 작동 내 기쁨이었다.
* 이들은 가장 나쁜 / 가장 일반적으로 적어도 나쁜 / 덜 일반으로 분류됩니다.
* 대부분 특정 EML 파일에 작은 문제와 관련 (EML의 오류가 없습니다.) ·
* 대부분의 EML 파일 또는 데이터 파일에 간단한 변경에 의해 고정 될 수 있습니다.
* LTER 사람들은 EML 파일의 유효성을 테스트하기 위해 EML 검사기를 구축하고, 나는 검사기에 추가 될 수있는 기능에 대한 아래의 일부 제안을 추가했다.

여기에 문제가 있습니다.

### 분리된 날짜 및 시간 란{#separate-date-and-time-columns} 
일부 데이터 파일에는 날짜 및 시간 동안 별도의 열이 있지만, 통합 된 date+time 열이 없습니다. 현재 GenerateDatasets Xml는 이 별도의 열을 가진 dataset를 만듭니다, 그러나 그것 때문에 이상적 아닙니다:

* 데이터셋이 있다면ERDDAP™결합된 date+time 란이 칭합니다"time"·
* dataset가 로드되지 않도록ERDDAP™으로"time"열은 date+time 자료가 없습니다.

2개의 가능한 해결책이 있습니다:
1. datafile에 새 열을 추가하기 위해 소스 데이터 파일을 편집 (그리고 EML에서 설명) 날짜와 시간 열이 하나의 열으로 병합됩니다. 그런 다음 Rerun GenerateDatasets Xml 그래서 새로운 열을 찾을 수 있습니다.
2. 사용 방법[변형된 변수](/docs/server-admin/datasets#script-sourcenamesderived-variables)제품정보ERDDAP™새로운 변수를 정의하기datasets.xml날짜와 시간의 열을 concatenating에 의해 생성됩니다. 예 중 하나는이 상황에 특히 적용됩니다.
         
### Inconsistent 란 이름{#inconsistent-column-names} 
EML 파일은 데이터 파일의 열과 그 이름을 나열합니다. 불행히도, 그들은 종종 실제 데이터 파일의 열 이름과 다릅니다. 일반적으로, EML 파일의 열 순서는 데이터 파일에서 열 순서와 동일하지만, 이름이 약간 다르더라도, 항상. Generate데이터셋 Xml는 열 이름과 일치합니다. 할 수 없을 때 (그것은) , 그것은 중지 될 것입니다, 당신에게 EML / 데이터 파일 이름 쌍을 표시, 그들은 올바르게 정렬하는 경우 요청. 테이블을 건너뛰기 위해 's'를 입력하면 GeneratedDatasetsXml는 오류 메시지를 인쇄하고 다음 표로 이동합니다.
이 솔루션은 데이터 파일의 열 이름과 일치하기 위해 EML 파일의 erroneous 열 이름을 변경하는 것입니다.
     
### 다른 란 순서{#different-column-order} 
EML이 데이터 파일에 존재하는 것보다 다른 주문에서 열을 지정하는 여러 가지 경우가 있습니다. Generate데이터셋 Xml는 연산자를 중지하고 호출합니다. matchups는 괜찮거나 dataset가 건너 뛸 경우. 그것이 건너 뛰는 경우에, 결과 파일에 오류 메시지가 있을 것입니다, 예를들면:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
해결책은 이 EML 파일에 있는 란 순서를 고치기 위한 것입니다 그래서 그들은 자료 파일에 있는 순서를 일치합니다.

그것은 EML 검사기가 소스 파일에 열과 열 순서가 일치하는 열과 열 순서가 확인한 경우에 좋을 것입니다.
    
### 잘못된 numHeaderLines{#incorrect-numheaderlines} 
몇몇 자료 테이블 잘못된 상태 numHeaderLines=1, 예를 들어, ...sbc.4011. 이 원인ERDDAP™열 이름으로 데이터의 첫 줄을 읽으십시오. 이 dataTables의 모든 SKIP를 수동으로 시도했습니다. 해당 소스 col 이름은 모든 데이터 값이기 때문에 분명합니다. 그리고 잘못된 파일이있는 경우 numHeaderLines=0, 내 시스템은 분명하지 않습니다. 다음은 SBC LTER 실패 파일에서 예입니다.
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
그래서 오류가 발생하면 GenerateDatasets Xml는 파일에 데이터가있는 첫 번째 줄이 있다고 생각합니다. (예를 들어, 2008-10-01T00:00 등) 열 이름의 선 (2008-10-01T00:00이 열 이름인 경우) ·

그것은 좋은 경우 EML 검수원은 numHeaderLines 값을 검사.
    
### num헤더 라인 = 0{#numheaderlines--0} 
몇몇 근원 파일은 란 이름이 없습니다.ERDDAP™EML이 열의 동일한 숫자를 설명하는 경우.

내 의견 : 이것은 매우 위험합니다. 다른 순서 또는 다른 단위에 있는 란이 있을 수 있었습니다 (더 보기) 그 문제를 잡는 방법이 없습니다. 모든 ASCII 데이터 파일이 열 이름과 행을 가지고 있다면 훨씬 더 좋습니다.
    
### DateTime 형식 문자열{#datetime-format-strings} 
EML은 날짜 시간 형식을 설명하는 표준 방법이 있습니다. 그러나 EML 파일에서 사용의 상당한 변화가 있습니다. (나는 이전에 이것을 잘못했다. 나는 formatString에 대한 EML 문서를 참조하십시오.[JavaDateTimeFormatter 명세](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), 그러나 그 사용에 대한 중요한 지침이 부족하지만, formatString은 종종 / 보통 improperly 사용 된 결과.) incorrect case, and/or incorrect duplication of the Letter, and/or non-standard formatting 와 여러 인스턴스가 있습니다. 그것은 클라이언트에 대한 무해한 부담을 넣어, 특히 소프트웨어 클라이언트 GenerateDatasetsXml 같은. Generate데이터셋 Xml는 EML 파일에 잘못된 정의 형식을 변환하는 것을 시도
[날짜/시간 형식ERDDAP™견적 요청](/docs/server-admin/datasets#string-time-units), 거의 동일을 위해Java/Joda 시간 체재 명세, 그러나 약간 더 forgiving입니다.

그것은 EML 검수원이 엄격한 준수에 필요한 경우 좋은 것입니다Java·Joda/ERDDAP시간 단위 명세 및 확인 된 데이터 테이블의 날짜 시간 값은 지정된 형식으로 올바르게 구부릴 수 있습니다.
    
### DateTime 하지만 시간대 없음{#datetime-but-no-time-zone} 
Generate데이터셋 Xml는 날짜를 가진 란을 찾습니다 시간과 지정된 시간대 (한국어Zulu: 'Z' 또는 'gmt' 또는 "utc"또는 "local"을 포함하는 열 이름 또는 속성 정의에서 끝나는 시간 단위에서 : 열 이름 또는 속성 정의에서 "local"에서) · 또한 허용은 날짜 열을 가진 파일이지만 시간 열이 없습니다. 또한 허용한 파일은 날짜 또는 시간 정보가 없습니다.

Generate데이터셋 Xml는 파일의 주어진 배치를 지정할 수 있는 시간대에서, 예를 들면, SBC LTER를 위해, 사용 US/Pacific를 위한 모든 “현지” 시간을 취급합니다. 이 정보는 때때로 의견에 있지만, 컴퓨터 프로그램에 쉽게 그림 할 수있는 형태로 없습니다.

이 기준을 충족하지 않는 파일은 메시지 "NO GOOD DATE (시간 :) VARIABLE. 일반적인 문제는:

* 날짜와 시간의 열이 있지만 날짜가 없습니다. 시간 열.
* 시간이 있지만 시간대는 지정되지 않습니다.

다른 의견:
시간대 열을 가진 좋은 date+time가 있는 경우에, 그 란은 명명될 것입니다"time"내 계정ERDDAP·ERDDAP™그 시간 열 자료가 이해할 수 있는/convertible를 요구합니다Zulu/UTC/GMT 시간대 dateTimes.\\[나의 믿음은: 현지 시간 및 다른 날짜/시간 체재를 사용하여 (2자리 년&#33; mm/dd/yyy 대 dd/mm/yyy 대 ...) 데이터 파일에서 최종 사용자를 강제로 복잡한 변환을Zulu한 dataset에서 데이터를 다른 데이터로 비교하기 위해 시간. 이름 *ERDDAP™모든 시간 자료를 표준화: 문자열 시간,ERDDAP™항상 ISO 8601:2004를 사용합니다 (₢ 킹) 표준 형식, 예를 들면, 1985-01-02T00:00:00Z. 숫자를 위해,ERDDAP™항상 사용"seconds since 1970-01-01T00:00:00Z"·ERDDAP™항상 사용Zulu  (UTC의 GMT) 다른 시간대 및 표준 시간대와 작업의 어려움을 제거 할 시간대는 일광 절약 시간. 그래서 GenerateDatasets Xml는 date+time을 가진 EML dataTable 란을 추구합니다Zulu· 이것은 형식적인 vocabulary/system을 사용하지 않기 때문에 하드입니다. (이름 *[Java/Joda 시간 형식](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) 데이터 지정 시간 체재:
숫자 시간 값으로 col이 있다면 (₢ 킹Matlab시간 :) 이름 *Zulu시간 영역 (또는 단지 날짜, 시간 열 없음) , 그것은 사용됩니다"time"·
날짜 및 시간 데이터가있는 경우Zulu시간대, 그것은 사용됩니다"time"그리고 다른 날짜 또는 시간 란은 제거됩니다.
그냥 날짜 정보와 함께 col이 발견되면, 그것은 사용"time"지원하다 (시간대 없음) ·
데이터 열과 시간 열과 결합 된 날짜가없는 경우 시간 열, dataset는 REJECTED입니다 — 그러나 dataset는 결합한 날짜를 추가해서 usable 할 수 있었습니다 시간 란 (선호도,Zulu시간 영역) datafile에 EML 파일에 대한 설명 추가.
SBC LTER의 경험:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)데이터테이블 #2.

그것은 EML / LTER가 열의 포함을 필요로하는 경우 좋은 것입니다Zulu  (UTC의 GMT) 모든 관련 소스 데이터 파일에서 시간대 시간. 다음 best는 EML에 시스템을 추가하는 것입니다.time\\_zone표준 이름을 사용하여 속성 (이름 *[TZ 열](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) ·
    
### 뚱 베어missing\\_value {#missing-missing_value} 
몇몇 란 사용missing\\_value그러나 EML 메타 데이터에 나열하지 마십시오, 예를 들어, knb-lter-sbc.5011의 강수 \\_mm 사용 -999. 누락 된 값이 EML에 지정되지 않은 경우, GenerateDatasetsXml는 일반적인 누락 된 값에 대한 자동으로 검색 (예를 들면, 99, -99, 999, -999, 9999, -9999, 등) 그리고 metadata를 만듭니다. 그러나 다른 누락missing\\_values는 붙지 않습니다.

그것은 좋은 경우 EML 검수원은 누락missing\\_value₢ 킹
    
### 작은 문제{#small-problems} 
많은 작은 문제가 있습니다. (맞춤법, 협력) 인간이 각 dataset 검사를 통해 발견 될 것입니다.

그것은 맞춤법과 문법 오류에 대해 볼 수있는 경우 좋은 것입니다. 이것은 과학의 단어가 종종 매끄럽기 때문에 어려운 문제입니다. 인간의 편집은 아마 필요합니다.
    
### 잘못된 유니코드 문자{#invalid-unicode-characters} 
몇몇의 EML 내용은 잘못된 유니코드 문자를 포함합니다. 이것은 아마도 UTF-8 EML 파일로 잘못 복사되고 붙여진 Windows charset의 문자입니다. Generate데이터셋 Xml는 이러한 문자를 e.g.,\\[#128\\], 그래서 그들은 쉽게에서 검색 할 수ERDDAP™ datasets.xml파일.

그것은 좋은 경우 EML 검수원이 확인. 쉽게 찾을 수 있습니다.
    
### 다른 란 단위] (#differentColumn단위)  {#different-column-unitsdifferentcolumnunits} 
일부 EML dataTables는 다른 단위가 있기 때문에 데이터 파일에서 열과 주장하는 열을 정의합니다. Generate데이터셋 Xml 플래그. 차이점이 괜찮지 않다면 결정하는 연산자까지. 이들은 "SKIPPED" dataTables로 실패 파일에서 나타납니다. SBC LTER 실패 파일에서 EXAMPLE:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
그것은 좋은 경우 EML 검수원은 단위 일치를 검사. 불행히도, 이것은 아마 붙잡을 수 없습니다 그리고 그 후에 데이터셋 제작자에게 연락 없이 결심할 수 없습니다, 소스 파일이 단위를 포함하지 않는 주어진. 위의 예에 대한 공개는 소스 열 이름과 EML 열 이름에 포함 된 단위가 있기 때문에 눈에 띄는 것이었다. 다른 많은 dataTables이 문제가 있지만 탐지 할 수 있습니까?
    
### EML의 다른 버전{#different-versions-of-eml} 
Generate데이터셋 Xml는 EML 2.1.1로 작동하도록 설계되었습니다. 다른 버전의 EML은 그들이 일치하는 범위에 작동한다 2.1.1 또는 그 GenerateDatasetsXml는 그것을 처리하는 특별한 코드를 가지고. 이것은 드문 문제입니다. 발생할 때, 솔루션은 EML 2.1.1에 파일을 변환하는 것입니다, 또는 EML 파일을 보내erd.data at noaa.gov, 그래서 나는 GenerateDatasets에 변화를 만들 수 있습니다 차이를 다루는 Xml.

Bob은 GenerateDatasets에 EML 파일에 대한 지원 추가 Xml 2016에서 EML 커뮤니티에 대한 몇 가지 섭취가 있음을 희망합니다. 2020 년 이후, 그 일이 없었다. 밥은 EML의 더 최근 버전에 대한 지원을 추가하는 것이 행복하지만, 새로운 기능이 실제로 사용될 경우에만. 자주 묻는 질문erd.data at noaa.gov당신은 EML의 더 최근 버전에 대한 지원을 원하면 실제로이 기능을 사용합니다.
    
### Trouble Parsing the 데이터 파일{#trouble-parsing-the-data-file} 
드물게, dataTable 오류로 거부 될 수있다 "선 #120에 항목의 예상 번호 (selected=52, 예상=50) · 이 같은 오류 메시지는 datafile의 라인이 다른 줄보다 다른 값을 가지고 있다는 것을 의미합니다. 그것은 문제에 있을 수 있습니다.ERDDAP™  (e.g., 파일을 올바르게 파싱하지 않음) 또는 파일. SBC LTER의 경험:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt 참조
