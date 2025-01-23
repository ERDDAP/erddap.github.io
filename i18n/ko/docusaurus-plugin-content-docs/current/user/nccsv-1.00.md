---
title: "NCCSV 1.00"
---

# 사이트맵
·NetCDF- 호환 ASCII CSV 파일 사양,
버전 1.00

Bob Simons 과 Steve Hankin
"NCCSV" by Bob Simons and Steve Hankin은 아래 라이센스가 있습니다.[에 의해 CC 4.0](https://creativecommons.org/licenses/by/4.0/)

## [제품정보](#introduction) {#introduction} 

이 문서는 모든 정보를 포함 할 수있는 ASCII CSV 텍스트 파일 형식을 지정합니다. (메타데이터 및 데이터) 그것은에서 찾을 수 있습니다NetCDF .ncCSV-file-like 테이블을 포함하는 파일. 이 사양을 따르는 ASCII CSV 텍스트 파일에 대한 파일 확장은 Excel 및 Google 시트와 같은 스프레드 시트 프로그램에 쉽게 읽고 올바르게 읽을 수 있도록 .csv이어야한다. Bob Simons는 NCCSV 파일을 변환하는 소프트웨어를 쓸 것입니다.NetCDF-3명 (그리고 아마도NetCDF-4의)  .nc파일 및 역, 정보의 손실 없음. Bob Simons가 수정되었습니다.[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)이 유형의 파일을 읽고 쓰는 것을 지원한다.

NCCSV 형식은 Excel 및 Google 시트와 같은 스프레드 시트 소프트웨어가 편집 할 수있는 스프레드 시트의 셀에 대한 모든 정보가 Csv 파일로 NCCSV 파일을 가져올 수 있도록 설계되었습니다. 또는 스프레드 시트는 NCCSV 컨벤션에 따라 처음부터 만들 수 있습니다. 스프레드 시트의 소스에 관계없이 다음 .csv 파일로 수출되면 NCCSV 사양에 따라 정보를 잃지 않습니다. NCCSV 파일과 이러한 규칙을 따르는 아날로그 스프레드 시트 파일의 유일한 차이점은 다음과 같습니다.

* NCCSV 파일은 commas에 의해 분리되는 선에 값을 가집니다.
Spreadsheets는 인접한 셀의 선에 값을 가집니다.
* NCCSV 파일의 문자열은 종종 두 배의 견적으로 둘러싸여 있습니다.
스프레드 시트의 문자열은 두 배의 견적으로 둘러싸여 있지 않습니다.
* 내부 두 배 인용 (·) NCCSV 파일의 문자열은 두 배의 따옴표로 나타납니다.
스프레드 시트의 내부 더블 인용은 1 더블 인용으로 나타납니다.

이름 *[스프레드시트](#spreadsheets)더 많은 정보를 위한 단면도.

### 스트레이트{#streamable} 
일반적으로 CSV 파일처럼, NCCSV 파일이 간소화됩니다. 따라서, NCSV가 데이터 서버로 발생하면[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html), 서버는 데이터가 수집되기 전에 요청자에게 데이터를 스트림 할 수 있습니다. 이것은 유용하고 바람직한 특징입니다.NetCDF파일, 대비, 스트리밍 할 수 없습니다.

### ERDDAP™ {#erddap} 
이 사양은 NCCSV 파일과.nc그들에게서 창조될 수 있는 파일은에 의해 사용될 수 있습니다[ERDDAP™데이터 서버](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (을 통해[EDDTableNccsvFiles에서](/docs/server-admin/datasets#eddtablefromnccsvfiles)이름 *[EDDTableFromNcFiles는](/docs/server-admin/datasets#eddtablefromncfiles)dataset 유형) , 그러나 이 명세는 외부에ERDDAP·ERDDAP™몇 가지 필수 글로벌 속성과 많은 권장 글로벌 및 가변 속성, 주로 CF 및 ACDD 속성을 기반으로 (보기
[/docs/server-admin/datasets#글로벌위트](/docs/server-admin/datasets#global-attributes)).

### (주){#balance} 
NCCSV 형식의 디자인은 몇몇 필요조건의 균형입니다:

* 이 파일은 모든 데이터와 메타데이터를 포함해야 합니다.NetCDF특정 데이터 유형을 포함하여 파일.
* 이 파일은 읽을 수 있어야하고 정보의 손실없이 스프레드 시트를 작성했습니다.
* 파일을 작성하고 편집, 읽기 및 이해하기 위해 인간을 쉽게해야합니다.
* 이 파일은 컴퓨터 프로그램에 의해 악화 될 수 있어야합니다.

이 문서의 일부 요구 사항이 이상한 것 또는 선택, 그것은 아마도 이러한 요구 사항 중 하나를 충족해야합니다.

### 다른 명세{#other-specifications} 
이 사양은 여러 가지 사양과 라이브러리를 참조하여 작업하도록 설계되었지만, 이 사양은 다른 사양의 일부가 아니며 변경 사항이 필요하지 않으며 그와 충돌하지 않습니다. 이 표준 중 하나와 관련된 세부 사항이 여기에 지정되지 않은 경우, 관련 사양을 참조하십시오. 물론,이 포함:

* Dataset Discovery에 대한 Attribute 협약 (사이트맵) metadata 기준:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)·
* 기후와 예측 (사이트맵) metadata 기준:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)·
* 더 보기NetCDF사용자 가이드 (이름 *) ::
    [ https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html)·
* 더 보기NetCDF같은 소프트웨어 라이브러리NetCDF- 자바 및NetCDF유형:
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/)· 이 라이브러리는 NCCSV 파일을 읽을 수 없습니다, 그러나 그들은 읽을 수 있습니다.ncNCCSV 파일에서 생성된 파일.
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### 이름 *{#notation} 
이 명세에서, 부류,\\[ \\], denote 선택적인 품목.

## [파일 구조](#file-structure) {#file-structure} 

완전한 NCCSV 파일은 두 개의 섹션으로 구성되어 있습니다 : 메타 데이터 섹션, 다음 데이터 섹션.

NCCSV 파일은 7비트 ASCII 문자만 포함해야 합니다. 이 때문에 문자 세트 또는 인코딩을 작성하고 파일이 7 비트 ASCII 문자 세트와 호환되는 문자 집합 또는 인코딩이 될 수 있습니다 예를 들어, ISO-8859-1.ERDDAP™ISO-8859-1 charset로 NCCSV 파일을 읽고 작성합니다.

NCCSV 파일은 newline을 사용할 수 있습니다. (\\n)   (Linux 및 Mac OS X 컴퓨터에서 일반) 또는 캐리지리턴 플러스 newline (\\r\\n)   (Windows 컴퓨터에서 일반) end-of-line markers로, 하지만 둘 다.

### .nccsv메타데이터{#nccsvmetadata} 
제작자와 독자 모두 기대할 때, 그것은 또한 가능하고 때로는 메타 데이터 섹션을 포함하는 NCCSV 파일의 변형을 만드는 데 유용 (한국어\\*END\\_METADATA에 대해서\\*제품정보) · 결과는 파일의 속성, 변수 이름 및 데이터 유형의 완전한 설명을 제공합니다. 따라서 .das plus .dds 응답과 같은 목적을 제공OPeNDAP서버.ERDDAP™파일을 요청하면 이 변형을 반환합니다. 유형 =.nccsv메타데이터ERDDAP™데이터셋.

## [Metadata 섹션](#the-metadata-section) {#the-metadata-section} 

NCCSV 파일에서, 메타데이터 섹션의 각 라인은 형식을 사용합니다.
[지원하다 이름 *](#variablename)·[이름 * 이름 *](#attributename)·[값1](#value)\\[, 값 2\\]\\[, 값3\\]\\[, 값4\\]\\[·\\]  
스프레드 시트 프로그램에 파일을 가져올 때 문제가 발생할 수 있기 때문에 항목이 허용되지 않으면 스페이스.

### 행사일정{#conventions} 
NCCSV 파일의 첫 번째 라인은 메타데이터 섹션의 첫 번째 라인이며 반드시 있어야 합니다.[\\*- 연혁\\*](#global)대회 속성은 CSV 목록을 포함하는 문자열로 파일에 사용되는 모든 컨벤션을 나열합니다. 예를 들어:
\\*- 연혁\\*, 발명품, "COARDS, CF-1.6의 ACDD-1.3의 NCCSV-1.0”
나열된 컨벤션 중 하나는 NCCSV-1.0이 사양의 현재 버전을 나타냅니다.

### 사이트맵{#end_metadata} 
NCCSV 파일의 메타 데이터 섹션의 끝은 라인에 의해 삭제되어야한다
\\*END\\_METADATA에 대해서\\*

그것은 권장하지만, 주어진 변수에 대한 모든 속성은 메타 데이터 섹션의 인접한 줄에 나타납니다. NCCSV 파일이 변환되면NetCDFfile, the order that the variableNames first appear in the metadata section will be a order of the variables in the variables in the variables in the variables in the variables in the variables in the variables in the variables in the variables in the variables in the variables in the variables of the variables of the variables of the variables of the variables in the variables of the variables in the variables of the variables of the variables of the variables of the variables of the variables of the variables of the variables of the variables of the variables of the variables of the variables of the variables.NetCDF파일.

선택적인 공백 선은 필수 첫번째 선 후에 metadata 단면도에서 함께 허용됩니다[\\*- 연혁\\*](#global) [행사일정](#conventions)* 이름 (더 보기) 마지막 선의 앞에\\*END\\_METADATA에 대해서\\*·

스프레드 시트가 NCCSV 파일에서 생성되면 메타데이터 데이터 섹션은 컬럼 A의 변수 이름과 열 B의 속성 이름과 열 C의 값으로 나타날 것입니다.

이 규칙을 따르는 스프레드 시트가 CSV 파일로 저장되면, 메타 데이터 섹션의 라인의 끝에서 종종 여분의 commas가됩니다. NCCSV 파일을 변환하는 소프트웨어.nc파일은 여분의 commas를 무시합니다.

### [지원하다 이름 *](#variablename) {#variablename} 

 *지원하다 이름 ** 데이터 파일에서 변수의 case-sensitive name입니다. 모든 변수 이름은 7 비트 ASCII 문자 또는 밑줄로 시작하고 7 비트 ASCII 문자, 밑줄 및 7 비트 ASCII 숫자로 구성됩니다.
#### - 연혁{#global} 
특별한 variableName[\\*- 연혁\\*](#global)글로벌 메타데이터를 해독하는 데 사용됩니다.

### [이름 * 이름 *](#attributename) {#attributename} 

 *이름 * 이름 ** 변수와 관련된 속성의 case-sensitive name 또는[\\*- 연혁\\*](#global)· 모든 속성 이름은 7 비트 ASCII 문자 또는 밑줄로 시작하고 7 비트 ASCII 문자, 밑줄 및 7 비트 ASCII 숫자로 구성됩니다.

#### 사이트맵{#scalar} 
특별한 속성 이름 *\\*사이트맵\\*scalar data 변수를 생성하고 값을 정의할 수 있습니다. 데이터 유형\\*사이트맵\\*변수의 데이터 유형을 정의하므로 지정하지 마십시오.\\*사이트맵\\*scalar 변수의 속성. NCCSV 파일의 데이터 섹션에서 scalar 변수에 대한 데이터가 없어야합니다.

예를 들어, 값 "Okeanos Explorer"과 cf\\_role 속성으로 "ship"라는 scalar 변수를 생성하려면 다음을 사용하십시오.
배,\\*사이트맵\\*, "Okeanos Explorer"
배,cf\\_role,trajectory\\_id
scalar 데이터 변수가 읽을 때ERDDAP™, scalar 가치는 각 줄에 동일한 가치를 가진 자료 테이블에 있는 란으로 개조됩니다.

### [제품정보](#value) {#value} 

 *제품정보* metadata 속성의 값이며 바이트, 짧은, int, long, float, double, String, char 중 하나 이상의 배열이 있어야 합니다. 다른 데이터 유형이 지원되지 않습니다. 값은 무시되지 않습니다. 하위 값이 1개 이상인 경우, 하위 값은 모두 동일한 데이터 유형과 commas로 분리되어야 합니다. 예를 들어:
sst·actual\\_range· 0.17f, 23.58f
여러 문자열 값이 있는 경우, 단일 문자열을 사용하여\\n  (새 소식) substrings를 분리하는 문자.

속성 데이터 유형의 정의는:

#### 사이트맵{#byte} 
* byte 속성 값 (8 비트, 서명) suffix 'b', e.g., -7b, 0b, 7b로 작성해야합니다. 유효한 바이트 값의 범위는 -128에서 127입니다. 바이트처럼 보이는 숫자는 무효 (예, 128b) 오류 메시지를 생성합니다.
     
#### 뚱 베어{#short} 
* 짧은 속성 값 (16 비트, 서명) suffix 's', 예를 들어 -30000s, 0s, 30000s로 작성해야합니다. 유효한 짧은 값의 범위는 -32768에서 32767입니다. 짧은 것처럼 보이는 숫자는 무효 (예, 32768s) 오류 메시지를 생성합니다.
     
#### 뚱 베어{#int} 
* int 속성 값 (32 비트, 서명) 소수점 또는 exponent없이 JSON ints로 작성되어야하지만, suffix 'i', 예를 들어, -12067978i, 0i, 12067978i. 유효한 int 값의 범위는 -2147483648에서 2147483647 입니다. int처럼 보이는 숫자는 무효 (전화기:+86-21-5668888 팩스:+86-21-5669999) 오류 메시지를 생성합니다.
     
#### 긴 수명{#long} 
* 긴 속성 값 (64-bit, 서명, 현재 NUG에 의해 지원ERDDAP™CF에 의해 아직 지원되지 않음) 소수점없이 작성해야하며 suffix 'L', 예를 들어 -12345678987654321L, 0L, 12345678987654321L . 변환 소프트웨어를 사용하는 경우 긴 값으로 NCCSV 파일을 변환NetCDF-3 파일, 긴 값은 두 배 값으로 변환됩니다. 유효한 긴 가치의 범위는 -9223372036854775808에 9223372036854775807입니다. 긴 것처럼 보이는 숫자는 무효 (전화기:+86-21-52551888 팩스:+86-21-52551) 오류 메시지를 생성합니다.
     
#### 팟캐스트{#float} 
* float 속성 값 (32 비트) suffix 'f'로 작성해야하며 소수점이 있고 / 또는 exponent, e.g., 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f가 있습니다. NaNf를 float NaN 사용 (한국어) 가치. 부유물의 범위는 대략 +/- 3.40282347E+38f입니다 (~7 중요한 소수 자리) · 부유물처럼 보이는 숫자는 무효 (예, 1.0e39f) 오류 메시지를 생성합니다.
     
#### 더블 더블{#double} 
* 더블 속성 값 (64 비트) suffix 'd'로 작성해야하며 소수점이 있고 / 또는 exponent, e.g., 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d가 있습니다. 두 배 NaNd를 위해 NaNd를 사용하십시오 (한국어) 가치. 두 배의 범위는 대략 +/- 1.79769313486231570E+308d입니다 (~15 중요한 소수 자리) · 두 배처럼 보이는 숫자는 무효 (예를 들어, 1.0e309d) 오류 메시지를 생성합니다.
     
#### 스트레이트{#string} 
* 문자열 속성 값은 UCS-2 문자의 순서입니다. (i.e., 2-byte 유니코드 문자,Java) , 7비트 ASCII로 작성해야 하는 경우, JSON-like 문자열은 비-ASCII 문자가 지정될 수 있습니다.
    * 두 배 인용 (·) 2개의 두 배 따옴표로 인코딩되어야 합니다 ("") · 스프레드 시트 프로그램이 .csv 파일을 읽을 때 필요한 것입니다. 그것은 당신이 스프레드 시트를 .csv 파일로 저장할 때 스프레드 시트 프로그램 쓰기입니다.
    * 특수 JSON backslash-encoded 문자는 JSON으로 인코딩되어야 합니다.\\n(신선), 또한 \\\\(backslash), \\f(formfeed), \\t(tab), \\r(carriage return) 또는[₢ 킹 *뚱 베어* ](#uhhhh)구문. 스프레드 시트에서 Alt Enter를 사용하여 텍스트 셀 내에서 새로운 라인을 지정하십시오. 대신 사용\\n  (2개의 문자: backslash와 'n 이름 *) 새 줄을 나타냅니다.
##### \\uhhh₢ 킹{#uhhhh} 
    * 문자 #32 또는 문자 #126보다 더 큰 모든 문자는 그렇지 않으면 인코딩되지 않아 구문 \\ \\u로 인코딩해야합니다 *뚱 베어* , hhhh는 캐릭터의 4 자리 hexadecimal 수, 예를 들어, 유로 기호는 \\u20AC입니다. 참조된 코드 페이지 참조[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)특정 유니코드 문자와 관련된 16 진수 번호를 찾으려면 소프트웨어 라이브러리를 사용하십시오.
    * 문자열이 시작이나 끝에서 공간을 가지고 있다면, " (더블 인용) 또는 comma, 또는 다른 데이터 유형으로 해석 될 값을 포함 (예, int) , 또는 단어 "null", 전체 문자열은 두 배 인용에서 동봉되어야한다; 그렇지 않으면, JSON과는 달리, 두 배 인용을 삽입하는 것은 선택 사항입니다. 우리는 권장 : 의심 할 여지없이 전체 문자열을 두 배 인용합니다. 문자열의 시작 또는 끝에서 공간은 강력하게 식별됩니다.
    * 이제 #255보다 더 큰 문자의 사용은 discouraged입니다. NCCSV 지원ERDDAP™내부 지원 몇몇 산출 파일 유형은 그들을 지원합니다 (₢ 킹.json이름 *.nccsv) · 그러나 많은 출력 파일 유형은 그들을 지원하지 않습니다. 예를 들어,NetCDF-3 파일은 그런 문자를 지원하지 않습니다.NetCDF파일 사용 1 바이트 문자와 CF는 현재 Unicode 문자가 인코딩 된 방법을 지정하기위한 시스템이 없습니다NetCDF사이트맵 (예, UTF-8) · 이것은 아마도 시간이 지남에 따라 향상됩니다.
         
#### ₢ 킹{#char} 
* char 속성 값은 단일 UCS-2 문자입니다. (i.e., 2-byte 유니코드 문자,Java) , 7 비트 ASCII로 작성해야, 다른 문자가 지정될 수 있도록 JSON 같은 문자 (특별한 문자의 인코딩을 위해 위의 문자열 정의를 참조, 인코딩의 추가와 함께 단일 견적 \\ 이름 *) · Char 속성 값은 단일 인용문에 동봉되어야 합니다. (내부 견적) 그리고 두 배 인용 (외부 견적) , 예를들면, "'a'", """" (더블 인용 문자) , "''''''''''''', (단일 인용 문자) , "\\t'" 를 (탭) , "\\u20AC" " (유로 문자) · 단일 및 이중 인용을 사용하는 이 시스템은 확률과 조잡하지만 스프레드 시트와 함께 작동하는 방식으로 문자열에서 char 값을 구별하는 방법입니다. 숯처럼 보이는 값이지만 잘못된 오류 메시지를 생성합니다. 문자열로, #255보다 더 큰 문자의 사용은 현재 discouraged.

### 스핑크{#suffix} 
NCCSV 파일의 속성 섹션에서, 모든 숫자 속성 값은 suffix 문자가 있어야 (예, 'b') 숫자 데이터 유형을 식별 (예를 들어, 바이트) · 그러나 NCCSV 파일의 데이터 섹션에서 숫자 데이터 값은이 suffix 문자가 없습니다. (긴 정수를 위한 'L' 예외로) — 데이터 유형은 지정됩니다.\\*사이트맵\\*변수의 속성.

#### 사이트맵{#data_type} 
각 비에 대한 데이터 유형[뚱 베어](#scalar)변수는 지정해야 합니다.\\*사이트맵\\*바이트, 짧은, int, long, float, double, String, char의 값을 가질 수 있는 속성 (케이스 insensitive) · 예를 들어,
사이트맵\\*사이트맵\\*, 바이트
경고 : 올바른 지정\\*사이트맵\\*당신의 책임. 잘못된 데이터 유형 지정 (e.g., 지정된 플로트가 있어야 할 때 int) 오류 메시지를 생성하지 않고 손실 될 정보를 일으킬 수 있습니다 (e.g., float 값은 ints에 둥글게 됩니다.) NCCSV 파일이 읽을 때ERDDAP™또는 변환NetCDF파일.

### 숯 Discouraged{#char-discouraged} 
char data 값의 사용은 다른 파일 유형에서 널리 지원되지 않기 때문에 discouraged입니다. char 값은 단일 문자 또는 문자열로 데이터 섹션에서 작성될 수 있습니다. (그렇지 않다면 특별한 문자를 쓸 필요가 있습니다.) · 문자열이 발견되면 문자열의 첫 문자는 char의 값으로 사용됩니다. Zero 길이 문자열과 누락 된 값은 \\uFFFF로 변환됩니다. 이름 *NetCDF파일 만 지원 단일 바이트 숯, 그래서 숯보다 더 큰 #255 '로 변환 될 것?' 쓰기 때NetCDF파일. charset 속성은 char 변수의 다른 charset을 지정하는 데 사용됩니다. ISO-8859-1 charset은 사용됩니다.

### 긴 차별{#long-discouraged} 
많은 파일 형식 (₢ 킹NetCDF-4과 json) 이름 *ERDDAP™긴 데이터 값 지원, NCCSV 파일의 긴 데이터 값의 사용은 현재 Excel, CF에 의해 지원되지 않았기 때문입니다.NetCDF-3 파일. NCCSV 파일에 긴 데이터 값을 지정하려면 (또는 해당 Excel 스프레드 시트에서) , 당신은 suffix 'L'를 사용해야 합니다 그래서 Excel은 낮은 정밀도를 가진 뜨 점 번호로 숫자를 대우하지 않습니다. 현재 NCCSV 파일이 변환되면NetCDF-3명.nc파일, 긴 데이터 값은 두 배 값으로 변환되며, 매우 큰 값에 대한 정밀도의 손실을 유발합니다. (-2^53 이하 또는 2^53 보다는 더 중대한) ·

### CF, ACDD 및ERDDAP™메타데이터{#cf-acdd-and-erddap-metadata} 
대부분의 NCCSV 파일이나.nc파일에서 생성, 읽을 것이다ERDDAP, NCCSV 파일이 필요한 메타데이터 속성을 포함하거나 권장하는 것을 강력하게 권장합니다.ERDDAP™(보기)
[/docs/server-admin/datasets#글로벌위트](/docs/server-admin/datasets#global-attributes)). 속성은 CF 및 ACDD 메타 데이터 표준에서 거의 모든이며 제대로 dataset를 설명하는 역할을합니다. (누구, 언제, 어디, 왜, 방법) 그렇지 않으면 dataset에 대해 아무것도 모른다. 특히 중요성의 거의 모든 수치 변수는 단위 속성이 있어야UDUNITS- 호환 값, 예,
sst, 단위, 정도 \\_C

CF 또는 ACDD 표준 또는ERDDAP·

## [데이터 섹션](#the-data-section) {#the-data-section} 

### [제품 설명](#structure) {#structure} 

데이터 섹션의 첫 번째 라인은 변하기 쉬운 이름의 case-sensitive, comma-separated 목록을해야합니다. 이 목록의 모든 변수는 metadata 섹션에 설명되어야하며, vice versa (다른 것 보다는[\\*- 연혁\\*](#global)속성 및[\\*사이트맵\\*](#scalar)옵션 정보) ·

데이터 섹션의 penultimate 라인을 통해 두 번째는 값의 comma-separated 목록을해야합니다. 데이터의 각 행은 변수 이름의 comma-separated 목록과 같은 값이 있어야 합니다. 스프레드 시트 프로그램에 파일을 가져올 때 문제가 발생할 수 있기 전에 또는 값이 허용되지 않습니다. 이 단면도에 있는 각 란은 단지 가치를 포함해야 합니다\\*사이트맵\\*그 변수에 의해 지정된\\*사이트맵\\*그 변수에 대한 속성. 속성 섹션과는 달리, 데이터 섹션의 숫자 값은 데이터 유형에 대한 suffix 문자가 있어야합니다. 속성 섹션과는 달리, 데이터 섹션의 숯 값은 분리를 위해 필요하지 않은 경우 단일 인용문을 삽입 할 수 있습니다. (이렇게, ',' 및 '\\'는 여기에 표시되어야 합니다.) · NCCSV 파일에 이러한 데이터 행의 수는 없지만 현재ERDDAP™최대 2 억 줄의 NCCSV 파일을 읽을 수 있습니다. 일반적으로 큰 데이터셋을 1 백만개 이상의 행을 가진 여러 NCCSV 데이터 파일로 분할하는 것이 좋습니다.

#### 끝 자료{#end-data} 
데이터 섹션의 끝은 라인에 의해 denoted해야합니다
\\*END\\_데이터\\*

NCCSV 파일의 추가 내용이 있는 경우\\*END\\_데이터\\*라인, NCCSV 파일이 변환 될 때 무시됩니다..nc파일. 그런 내용은 그러므로 discouraged입니다.

이 규칙을 따르는 스프레드 시트에서 변수 이름과 데이터 값은 여러 열에있을 것입니다. 아래 예제를 참조하십시오.

### [공급 업체](#missing-values) {#missing-values} 

숫자 누락된 값은 숫자 값으로 식별될 수 있습니다.missing\\_value또는 \\_FillValue 속성은 그 변수입니다. 예를 들어, 이 데이터 행에 두 번째 값을 참조하십시오.
벨 M. 시마다,99,123.4
byte, short, int, long variables에 누락된 값을 처리하는 것이 좋습니다.

float 또는 double NaN 값은 NaN으로 작성될 수 있습니다. 예를 들어, 이 데이터 행에 두 번째 값을 참조하십시오.
벨 M. 시마다,나,123.4

문자열 및 숫자 누락 값은 빈 필드에 의해 표시 될 수 있습니다. 예를 들어, 이 데이터 행에 두 번째 값을 참조하십시오.
벨 M. 시마다,123.4

바이트의 경우, 짧은, int 및 긴 변수, NCCSV 변환기 유틸리티 및ERDDAP™이 데이터 유형의 최대 허용값으로 빈 필드를 변환합니다. (e.g., 바이트 127) · 이 작업을 수행하면,missing\\_value또는 \\_FillValue 속성은 이 값을 식별하기 위해, 예를 들어,
 *지원하다 이름 ** ,\\_그림,127b
float 및 double 변수의 경우, 빈 필드는 NaN로 변환됩니다.

### [DateTime 값](#datetime-values) {#datetime-values} 

DateTime 값 (시간 구성 요소가없는 날짜 값) NCCSV 파일의 문자열로 숫자 또는 문자열로 표현할 수 있습니다. 주어진 dateTime 변수는 String 값 또는 numeric 값만 가질 수 있습니다. NCCSV 소프트웨어는 String dateTime 값을 숫자로 변환합니다. 시간 값 생성시.nc파일 형식 (CF에 의해 요구되는) · String dateTime 값은 인간이 쉽게 읽을 수 있는 장점이 있습니다.

DateTime 값은 숫자 값으로 표현되어야 합니다. *단위 단위* 이름 * *이름 * (주)* "CF에 의해 요구되는 것과 같이UDUNITS, 예를들면
시간, 단위, 1970-01-01T00:00:00Z 이후 초

DateTime 값은 String 값으로 표현되어야 합니다.\\*사이트맵\\*속성과 날짜를 지정하는 단위 속성 지정된 시간 패턴JavaDateTimeFormatter 클래스
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) · 예를 들어,
시간, 단위,yyyy-MM-dd'T'HH:mm:sZ
주어진 데이터 변수에 대한 모든 dateTime 값은 동일한 형식을 사용한다.
대부분의 경우, dateTime 패턴은 단위 속성의 변형이 될 것입니다:

*   yyyy-MM-dd'T'HH:mm:ss. SSSZ - ISO 8601 : 2004 (₢ 킹) 이름 * 시간 형식. 이 버전의 단축이 필요할 수 있습니다.yyyy-MM-dd'T'HH:mm:sZ (권장 형식) 또는yyyy-MM-dd· dateTime 값의 형식을 변경하는 경우, NCCSV는 이 형식으로 변경하는 것이 좋습니다. (아마 단축) · 이것은 형식이다ERDDAP™NCCSV 파일을 쓸 때 사용할 수 있습니다.
* yyyymmddHmms.SSS - ISO 8601 : 2004 날짜의 컴팩트 버전입니다. 시간 형식. 이 버전의 단축이 필요할 수 있습니다. 예를 들어, yyyymmdd.
* 사이트맵 H: mm: ss. SSS - 미국 스타일의 날짜와 날짜를 처리하는 시간은 다음과 같습니다. "3/23/2017 16:22:03.000". 이 버전의 단축이 필요할 수 있습니다. 예를 들어, M/d/yyyyyy.
* yyyyDDDHHmmsSSS - 올해와 올해의 제로패드 일 (e.g, 001 = 1 월 1, 365 = 12 월 31 일 비-leap 년; 이것은 때때로 줄리안 날짜라고 불린다.) · 이 버전의 단축이 필요할 수 있습니다. 예를 들어, yyyyyDDD .

#### 제품정보{#precision} 
소프트웨어 라이브러리가 변환될 때.ncNCCSV 파일로 파일, 모든 날짜 시간 값은 ISO 8601:2004와 문자열로 작성됩니다. (₢ 킹) 이름 * 시간 체재, 예를들면, 1970-01-01T00:00:00Z. 정밀도를 제어할 수 있습니다.ERDDAP- 특정 속성time\\_precision· 이름 *
[/docs/server-admin/datasets#time\\_precision](/docs/server-admin/datasets#time_precision)·

#### 시간 영역{#time-zone} 
날짜의 기본 시간대 시간 값은Zulu  (또는 GMT) 일광 절약 시간 기간이 없는 시간대. dateTime 변수가 다른 시간대의 dateTime 값이 있는 경우, 이 값을 지정해야 합니다.ERDDAP- 특정 속성time\\_zone· 이것은 요구 사항입니다.ERDDAP™(보기)
[/docs/server-admin/datasets#time\\_zone](/docs/server-admin/datasets#time_zone)).

### [학위 값](#degree-values) {#degree-values} 

CF에 의해 요구되는, 모든 정도 가치 (e.g. 경도와 고도를 위해) 소수도 두 배 값으로 지정되어야 합니다., degree°min'sec" String 또는 도, 분, 초에 대한 별도의 변수로 지정되어야 합니다. 방향 설계자 N, S, E 및 W는 허용되지 않습니다. 서쪽 경도와 남쪽 위도에 대한 부정적인 값을 사용합니다.

## [사이트맵 기능 유형](#dsg-feature-types) {#dsg-feature-types} 

NCCSV 파일은 CF Discrete 샘플링 기하학을 포함 할 수 있습니다.
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) 데이터. 이 작업을 만드는 속성입니다:

1. CF에 의해 요구되는 경우, NCCSV 파일은 식별 메타 데이터 섹션의 라인을 포함해야합니다[\\*- 연혁\\*](#global) featureType속성, 예를들면,
    \\*- 연혁\\*·featureType, 부속품
2. 이용안내ERDDAP™, NCCSV 파일은 cf\\_role=...\\_id 변수, e.g.를 식별하는 메타데이터 섹션의 라인 또는 라인을 포함해야 합니다.
배,cf\\_role,trajectory\\_id
이것은 CF를 위해 선택적이지만, NCCSV에 필요합니다.
3. 이용안내ERDDAP™, NCCSV 파일은 각 timeSeries, trajectory, 또는 프로파일과 관련된 메타데이터 섹션에서 라인 또는 라인을 포함해야ERDDAP™(보기)
    [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)), 예를들면
    \\*- 연혁\\*,cdm\\_trajectory\\_variables,"선"
또는
    \\*- 연혁\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon"

## [샘플 파일](#sample-file) {#sample-file} 

NCCSV 파일의 많은 기능을 보여주는 샘플 파일입니다.
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
참고 :

* 이 표본 파일은 많은 어려운 케이스를 포함합니다 (e.g., char 및 긴 변수 및 어려운 문자열 값) · 대부분의 NCCSV 파일은 훨씬 간단합니다.
* 라이센스 라인은 여기에 두 개의 라인으로 끊겨져 있지만 샘플 파일에 한 줄입니다.
* \\u20AC는 유로 문자의 인코딩이며 \\u00FC는 ü의 인코딩입니다.
* 이름 * 예를 들어 문자열은 두 배의 따옴표로 동봉되지만, 예를 들어, 제목, lon 단위 속성, 그리고 데이터의 3 줄을 포함한 많은 글로벌 속성이 있습니다.)
* testLong 변수에 대 한 단위 속성이 문자열 값 인 두 배 인용에 기록 된 경우 명확 하 고 더 나은 것 이다. 그러나 현재 표현 (인용 없는 1,) 문자열로 올바르게 해석됩니다. 정수가 없기 때문에 'i' suffix가 없습니다.
* 다른 숫자 데이터 유형과는 달리 데이터 섹션의 긴 값은 suffix가 있습니다. (사이트맵) 그것은 그들의 수치 데이터 유형을 식별합니다. 부동점 번호로 값을 해석하고 정밀도를 잃는 스프레드시트를 방지해야 합니다.

## [스프레드시트](#spreadsheets) {#spreadsheets} 

스프레드 시트에서 NCCSV 파일로 :

* NCCSV 파일에 지정된 숫자 속성 값을 쓰기 (e.g. suffix Letter, e.g., 'f', 속성의 데이터 유형을 식별하기 위해) ·
* 문자열에서, 모든 문자를 ASCII 문자 #32 또는 문자보다 더 큰 #126을 JSON과 같은 backslashed 문자로 쓰기 (₢ 킹\\n새 소식) 또는 hexadecimal 유니코드 문자 번호로 (케이스 insensitive) 구문과[₢ 킹 *뚱 베어* ](#uhhhh)  (e.g., 유로 사인 \\u20AC) · 제품 정보\\n  (2개의 문자: backslash와 'n 이름 *) 새로운 줄을 나타내는 것은 Alt Enter가 아닙니다.

NCCSV 파일과 이러한 규칙을 따르는 아날로그 스프레드 시트의 유일한 차이점은 다음과 같습니다.

* NCCSV 파일은 commas에 의해 분리되는 선에 값을 가집니다.
Spreadsheets는 인접한 셀의 선에 값을 가집니다.
* NCCSV 파일의 문자열은 종종 두 배의 견적으로 둘러싸여 있습니다.
스프레드 시트의 문자열은 두 배의 견적으로 둘러싸여 있지 않습니다.
* 내부 두 배 인용 (·) NCCSV 파일의 문자열은 두 배의 따옴표로 나타납니다.
스프레드 시트의 내부 더블 인용은 1 더블 인용으로 나타납니다.

이 규칙을 따르는 스프레드 시트가 CSV 파일로 저장되면, 많은 라인의 끝에 여분의 commas가됩니다. NCCSV 파일을 변환하는 소프트웨어.nc파일은 여분의 commas를 무시합니다.

### [엑셀 엑셀](#excel) {#excel} 

NCCSV 파일을 Excel로 가져올 수 있습니다.

1. 파일 선택 : .
2. 파일 형식을 Text Files로 변경 (\\*· .prn;\\*.txt; \\*.csv를) ·
3. 디렉토리를 검색하고 NCCSV .csv 파일을 클릭합니다.
4. 공지사항

Excel 스프레드 시트에서 NCCSV 파일을 만들려면:

1. 파일 선택 : 저장 .
2. CSV로 저장 변경: (만화 delimited)   (₢ 킹) ·
3. 호환성 경고에 대한 응답에서, 클릭 예 .
4. 결과 .csv 파일은 CSV 행보다 다른 모든 행의 끝에 여분의 commas가있을 것입니다. 당신은 그들을 무시할 수 있습니다.

Excel에서 위의 샘플 NCCSV 파일은 다음과 같습니다.

![파일 형식](/img/sampleExcel.png)

### [Google 시트](#google-sheets) {#google-sheets} 

NCCSV 파일을 Google 시트로 가져 오기 :

1. 파일 선택 : .
2. 파일을 업로드하고 컴퓨터에 파일을 업로드하려면 클릭하십시오. 파일을 선택한 다음 열기를 클릭합니다.
      
또는, 내 드라이브를 선택하고 모든 파일 유형에 파일을 드롭 다운 선택 변경합니다. 파일을 선택한 다음 열기를 클릭합니다.

Google 스프레드 시트에서 NCCSV 파일을 만들려면 :

1. 파일 선택 : 저장 .
2. CSV로 저장 변경: (만화 delimited)   (₢ 킹) ·
3. 호환성 경고에 대한 응답에서, 클릭 예 .
4. 결과 .csv 파일은 CSV 행보다 다른 모든 행의 끝에 여분의 commas가있을 것입니다. 나는 그들을 무시한다.

## [문제 / 경고](#problemswarnings) {#problemswarnings} 

* 텍스트 편집기로 NCCSV 파일을 만들거나 스프레드 시트 프로그램에서 아날로그 스프레드 시트를 만들면 텍스트 편집기 또는 스프레드 시트 프로그램은 이러한 규칙을 올바르게 수행 할 수 없습니다. 이 규칙을 올바르게 따르는 것이 최대입니다.
* csv 파일에 따라 스프레드 시트의 변환 (따라서, NCCSV 파일) CSV 데이터 행보다 다른 모든 행의 끝에 여분의 commas로 이어질 것입니다. 나는 그들을 무시한다. 다음 소프트웨어로 NCCSV 파일을 변환.nc파일이 무시됩니다.
* NCCSV 파일이 행 끝에 초과된 commas가 있으면 NCCSV 파일을 변환하여 제거할 수 있습니다.NetCDF파일 및 그 후 변환NetCDFNCCSV 파일로 다시 파일.
* NCCSV 파일을 변환하려고 할 때NetCDF파일, 일부 오류는 소프트웨어에 의해 감지되고 오류 메시지를 생성하고 변환을 실패합니다. 다른 문제는 어렵거나 불가능하며 오류 메시지 또는 경고를 생성하지 않습니다. 다른 문제 (e.g., 행 끝에 과잉 commas) 무시됩니다. 파일 변환기는 결과의 교정의 최소 검사 만 수행됩니다.NetCDFCF 준수와 관련하여 파일, 예를 들어. 파일 제작자의 및 파일 사용자의 책임은 변환의 결과가 원하고 정확하다는 것을 확인하는 것입니다. 검사하는 2가지 방법:
    * 본문내용 바로가기.ncncdump 파일
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) ·
    * 데이터의 내용 보기ERDDAP·
