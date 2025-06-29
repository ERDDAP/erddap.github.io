---
sidebar_position: 4
---
# 자주 묻는 질문

## 당신이 알아야 할 것들{#things-you-need-to-know} 
     
###    **[프록시 오류](#proxy-errors)**  {#proxy-errors} 
때때로, 요청ERDDAP™프록시 오류, HTTP 502 Bad Gateway Error, 또는 일부 유사한 오류를 반환합니다. 이 오류는 아파치 또는 톰캣에 의해 던진다.ERDDAP™이름 *
* 모든 요청이 이러한 오류를 발생하면 특히 첫 번째 설정을하면ERDDAP™, 그때 그것은 아마도 프록시 또는 나쁜 게이트웨이 오류, 그리고 솔루션은 아마 해결[ERDDAP's 프록시 설정](/docs/server-admin/deploy-install#proxypass)· 설치시 문제가 될 수 있습니다.ERDDAP™갑자기 모든 요청에 대한 이러한 오류를 던져 시작합니다.
* 그렇지 않으면, "proxy" 오류는 보통 실제로 아파치 또는 톰캣에 의한 오류가 발생한다. 그들은 상대적으로 빨리 일어날 때, 그것은 Apache 또는 Tomcat에서 응답의 일부 종류입니다ERDDAP™매우 바쁜, 메모리 제한, 또는 다른 자원에 의해 제한. 이 경우 아래 조언을 참조하여 처리하십시오.[ERDDAP™자주 묻는 질문](#responding-slowly)·
        
장시간 범위를 위한 요구 (&gt;30시간) gridded dataset에서 prone to time out failures, 이는 종종 프록시 오류로 나타나기 때문에 상당한 시간이 걸립니다ERDDAP™모든 데이터 파일을 One-by-one로 엽니다. 이름 *ERDDAP™요청시 그렇지 않으면 바쁜, 문제는 발생할 가능성이 더있다. dataset의 파일이 압축된 경우, 문제는 데이터셋의 파일이 압축되었는지 결정하는 사용자를 위해 어렵지 않다.
해결책은 몇몇 요구에, 더 작은 시간 범위로 각각 만들 것입니다. 시간 범위의 작은 방법? 나는 정말 작은 시작을 건의 (~30 시간 포인트?) , 다음 (소요시간) 요청이 실패할 때까지 시간 범위를 두 배로, 그 후에 1개의 두배로 갑니다. 그런 다음 모든 요청 (각각의 다른 펑크 시간) 모든 데이터를 얻을 필요.
이름 *ERDDAP™관리자는이 문제를 줄일 수 있습니다.[Apache 타임아웃 설정](/docs/server-admin/deploy-install#apache-timeout)·
        
### 관련 기사{#monitoring} 
우리는 그들의 청중을 발견하고 광대하게 사용되, 그러나 때때로 당신의 자료 서비스를 원합니다ERDDAP™너무 많이 사용될 수 있습니다, 문제 발생, 모든 요청에 대한 슈퍼 느린 응답을 포함. 문제를 피하는 우리의 계획은:

* 관련 기사ERDDAP™을 통해[status.html 웹 페이지](#status-page)·
그것은 유용한 정보의 톤이 있습니다. 요청의 거대한 숫자가 사용되거나 메모리의 톤, 또는 실패 요청의 톤, 또는 각 주요 LoadDatasets는 오랜 시간이 걸릴 것입니다, 또는 기록 된 물건의 표시를보고 천천히 반응, 다음 봐ERDDAP이름 *[log.txt 파일](#log)무엇을 볼 수 있습니다.
    
그것은 또한 단순히 상태 페이지가 응답하는 방법을 참고하는 것이 유용합니다. 천천히 반응하면 중요한 지표입니다.ERDDAP™아주 바쁘다.
    
* 관련 기사ERDDAP™을 통해[매일 보고서](#daily-report)이메일.
     
* 최신 데이터셋을 위한 시계 *사이트맵* /erddap/outOfDateDatasets.html선택된 웹 페이지[testOutOfDate](/docs/server-admin/datasets#testoutofdate)글로벌 특성.
     
#### 외부 감시자{#external-monitors} 
위에 나열된 방법ERDDAP자체 감시의 방법. 외부 시스템을 만들거나 사용할 수 있습니다.ERDDAP· 이 작업을 수행하는 하나의 프로젝트는[Axiom의 erddap-metrics 프로젝트](https://github.com/axiom-data-science/erddap-metrics)· 그런 외부 체계는 몇몇 이점이 있습니다:
* 그들은 당신이 원하는 정보를 제공 할 수 있습니다, 원하는 방법으로 표시.
* 해당 이용 후기에 달린 코멘트가 없습니다.ERDDAP™이름 *ERDDAP™쉽게 접근할 수 없습니다 또는 모든 (예를 들면, CPU 사용법, 디스크 여유 공간,ERDDAP™사용자의 관점에서 볼 때 응답 시간,ERDDAP™가동 시간,
* 경고를 제공 할 수 있습니다. (이메일, 전화, 텍스트) 몇몇 문턱을 초과할 때 관리자에게.
             
### 다수 동시 제품정보{#multiple-simultaneous-requests} 
*    **여러 동시 요청을 만드는 Blacklist 사용자&#33;** 
어떤 사용자가 하나의 동시 요청보다 더 많은 것을 만드는 것이 분명하다면 반복적으로 지속적으로 IP 주소를 추가합니다.ERDDAP한국어&lt;요청블랙리스트&gt;] (/docs/server-admin/datasets#request블랙리스트) 내 계정datasets.xml파일. 때때로 요청은 모든 IP 주소입니다. 때때로 그들은 여러 IP 주소에서, 하지만 명확하게 같은 사용자. 무효한 요청 또는 톤의 마음 numbingly 효율적인 요청을 만들 수 있습니다.
    
그런 다음 각 요청을 위해,ERDDAP™반환:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
사용자가이 메시지를 볼 수 있으며 문제를 해결하고 블랙리스트를 얻은 방법을 알아보십시오. 때때로, 그들은 단지 IP 주소를 전환하고 다시 시도.
    
전쟁에서 공격과 방어 무기 사이의 힘의 균형과 같습니다. 여기, 방어 무기 (ERDDAP) CPU의 코어 수에 의해 제한 된 고정 용량, 디스크 액세스 대역폭 및 네트워크 대역폭. 그러나 공격 무기 (사용자, notably 스크립트) 무제한 수용량이 있습니다:
    
    * 많은 시간대의 데이터에 대한 단일 요청은 발생할 수 있습니다.ERDDAP거대한 수의 파일을 엽니 다 (순서 또는 partly 다 스레드) · 극단적인 경우에, 1개의 "simple" 요구는 쉽게 RAID를 붙일 수 있습니다ERDDAP™몇 분 동안, 효과적으로 다른 요청의 처리를 차단.
         
    * 단일 요청은 대용량의 메모리를 소비 할 수 있습니다. (한국어ERDDAP™대용량 요청을 처리하기 위해 필요한 메모리를 최소화하는 코딩) ·
         
    * 병렬화 - - -
수많은 스레드를 생성하여 큰 작업을 병렬화하는 clever 사용자를 위해 쉽게, 각각의 다른 요청을 제출 (크고 작은 것) · 이 행동은 큰 문제를 다루는 효율적인 방법으로 컴퓨터 과학 커뮤니티에 의해 격려된다 (병렬화는 다른 상황에서 능률적입니다) · 전쟁 아날로그로 돌아 가기 : 사용자는 필수로 0이되는 각 비용과 동시 요청의 필수 무제한 수를 만들 수 있지만, 각 요청의 비용은ERDDAP™큰 수 있습니다ERDDAP's 응답 기능은 무한합니다. 꽉,ERDDAP™이 전투를 잃게됩니다.ERDDAP™관리자 blacklists 사용자가 다른 사용자를 방해하지 않는 여러 동시 요청을 만들기.
         
    * 다중 스크립트 -
이제 여러 clever 사용자들이 서로 평행한 스크립트를 실행할 때 무슨 일이 일어나는지 생각한다. 사용자가 다른 사용자가 혼잡 한 많은 요청을 생성 할 수 있다면, 그런 사용자가 많은 요청을 생성 할 수 있습니다.ERDDAP™압도적이고 겉으로도 반응하지 않습니다. 그것은 효과적으로 입니다[DDOS 공격](https://en.wikipedia.org/wiki/Denial-of-service_attack)다시, 유일한 방어ERDDAP™다른 사용자를 방해하지 않는 여러 동시 요청을 만드는 blacklist 사용자에게 있습니다.
         
    * 팽창된 기대 -
대규모 기술 기업 (아마존, 구글, 페이스 북, ...) , 사용자는 공급자에게서 근본적으로 무제한 기능을 예상하기 위하여 옵니다. 이 회사는 돈을 벌기 때문에 더 많은 사용자는 IT 인프라를 확장해야 더 많은 수익이 있습니다. 그래서 그들은 요청을 처리하는 대규모 IT 인프라를 감당할 수 있습니다. 그리고 그들은 사용자가 단일 요청이 부담되지 않도록 만들 수 있도록 요청의 종류를 제한하여 사용자의 요청에 따라 각 요청의 요청 및 비용의 수를 제한하고, 결코 이유가 없다 (또는 방법) 여러 동시 요청을 만들기 위해 사용자. 그래서이 거대한 기술 회사는 훨씬 더 많은 사용자를 가질 수있다ERDDAP™, 하지만 그들은 크게 더 많은 리소스와 각 사용자에서 요청을 제한하는 방법. 그것은 큰 IT 회사에 대한 관리 가능한 상황입니다 (그들은 부유 한&#33;) 그러나 아니ERDDAP™설치. 다시, 유일한 방어ERDDAP™다른 사용자를 방해하지 않는 여러 동시 요청을 만드는 blacklist 사용자에게 있습니다.
         
    
그래서 사용자 : 여러 동시 요청을하지 않거나 블랙리스트가 될 것입니다&#33;
     

명확하게, 그것은 당신의 서버가 많은 핵심, 많은 기억이 있는 경우에 베스트입니다 (그래서 당신은 많은 메모리를 할당 할 수 있습니다ERDDAP™, 그것 보다는 더 많은 것 필요) , 높은 대역폭 인터넷 연결. 그런 다음 메모리는 드물게 또는 제한 요소가 아니지만 네트워크 대역폭은 더 일반적인 제한 요소가됩니다. 기본적으로 더 많은 동시 요청이 있기 때문에 주어진 사용자의 속도가 줄어듭니다. 즉, 사용자가 한 번에 한 번에 한 번의 요청을 제출하는 경우 자연적으로 요청의 수를 느립니다.
    
### ERDDAP™THREDDS에서 데이터 받기{#erddap-getting-data-from-thredds} 
이름 *ERDDAP™사이트의 THREDDS에서 데이터의 일부를 얻을, THREDDS 데이터 파일의 사본을 만드는 데 몇 가지 이점이 있습니다 (가장 인기 있는 datasets를 위해 적어도) 다른 RAID에서ERDDAP™이렇게 접근ERDDAP™파일을 직접 제공 할 수 있습니다. 으로ERD, 우리는 우리의 대중적인 datasets를 위해 그것 합니다.

*   ERDDAP™데이터를 직접 얻을 수 있고 THREDDS를 기다리지 않아도 데이터 세트를 다시로드하거나 ...
*   ERDDAP™dataset가 변경된 경우, dataset가 변경된 경우, pester THREDDS가 자주 볼 필요가 없습니다. 보기 [&lt;update모든NMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis의 경우) ·
* 부하는 2개의 RAIDS와 2개의 서버 사이에서 분할됩니다, 대신 둘 다에 단단한 요구의ERDDAP™그리고 THREDDS.
* 당신은 작은 THREDDS에 기인 한 잡화 문제를 방지 (으로 default) 최대 요청 크기.ERDDAP™잘못을 처리하는 시스템을 가지고 있지만 문제를 피하는 것은 더 낫습니다.
* 항상 좋은 아이디어 인 데이터의 백업 사본이 있습니다.

어떤 경우, 이제 THREDDS를 실행하지 마십시오ERDDAP™같은 Tomcat에서. 별도의 Tomcats 또는 더 나은 서버에서 실행하십시오.

우리는 THREDDS 주기적으로 요청이 걸려있는 상태에서 가져옵니다. 이름 *ERDDAP™THREDDS와 THREDDS의 데이터가이 상태에 있습니다.ERDDAP™방어 (THREDDS 기반 데이터 세트는 사용할 수 없습니다.) , 그러나 아직도 말썽someERDDAP™이름 *ERDDAP™시간이 지남에 따라 기다릴 필요가있다. 일부 그룹 (기타 제품ERD) THREDDS를 자주 재시작하여 이것을 피하십시오. (e.g., cron 일에서 밤) ·

### 자주 묻는 질문{#responding-slowly} 
*    **이름 *ERDDAP™응답은 천천히** 또는 특정 요청이 천천히 응답하면
심도가 합리적이고 일시적인 경우 알아볼 수 있습니다. (e.g., 스크립트에서 요청의 제비 또는WMS이름 *) , 또는 뭔가 잘못 된 경우 당신은 필요[종료 및 재시작 Tomcat 및ERDDAP™](#shut-down-and-restart)·
    
이름 *ERDDAP™이 문제를 해결하기 위해, 희망적으로 문제를 해결 할 수있는 원인을 결정하기 위해 아래의 조언을 참조하십시오.
특정 출발점이 있을 수 있습니다. (e.g., 특정 요청 URL) 또는 vague 시작점 (₢ 킹ERDDAP™느리게) ·
당신은 관련된 사용자를 알 수 있습니다 (e.g., 그들이 당신을 이메일로 보내기 때문에) , 또는 아닙니다.
다른 clues, 또는 그렇지 않을 수 있습니다.
이 모든 상황과 함께 문제의 가능한 원인의 모든 때문에, 아래의 조언은 모든 가능한 출발점과 느린 응답과 관련된 모든 가능한 문제를 처리합니다.
    
    *    **clues에 대 한 보기[ERDDAP로그 파일](#log)**   ( *큰Parent감독* 다운로드) ·
        \\[드문 경우에, 거기에서 clues[Tomcat의 로그 파일](#tomcat-logs)  ( *뚱 베어* /logs/카탈리나.out) ·\\]  
오류 메시지를 찾습니다.
한 곳에서 오는 많은 요청을 찾습니다. (또는 몇) 사용자와 서버의 리소스를 많이 기록 (메모리, CPU 시간, 디스크 액세스, 인터넷 대역폭) ·
        
문제가 묶어지면 **1 사용자** , 당신은 종종 사용자가 웹 서비스를 통해 누구에 대해 clue를 얻을 수[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)사용자의 IP 주소와 관련된 정보를 제공 할 수 있습니다. (찾을 수 있습니다ERDDAP이름 *[로그.txt](#log)파일 형식) ·
        
        * 사용자가 될 것 같다면 **봇** 뚱 베어 (notably, 검색 엔진을 채우려고ERDDAP™입력 값의 각 가능한 permutation과 형태) , 서버가 제대로 설정했는지 확인하십시오.[로봇.txt](#robotstxt)파일.
        * 사용자가 될 것 같다면 **한국어 (₢ 킹) ** 그것은 여러 동시 요청을 만들고, 사용자에 게 연락, 설명ERDDAP™제한된 자원 (e.g., 메모리, CPU 시간, 디스크 액세스, 인터넷 대역폭) , 그리고 다른 사용자의 고려 하 고 그냥 한 번에 한 요청을 만들. 당신은 또한 당신이 그들을 블랙리스트를 언급 할 수 있습니다 그들은 다시하지 않는 경우.
        * 사용자가 될 것 같다면 **한국어** 많은 시간 소모 요청을 만들고, 사용자가 작은 일시 중지를 함으로써 다른 사용자의 고려해야 (2 초?) 요청 사이에 스크립트.
        *    **WMS고객 소프트웨어** 아주 수요일 수 있습니다. 한 클라이언트는 수시로 6개의 주문 이미지를 한 번에 요구할 것입니다. 사용자가 될 것 같다면WMS합법적 인 요청을 만드는 클라이언트, 당신은 할 수:
            * 그것을 무시합니다. (추천, 그들은 곧 꽤 이동) 
            * 서버 설정WMS서비스 viaERDDAP's setup.html 파일. (참고사항) 
        * 요청이 보이는 경우 **어, insane, 과도한, 또는 악의,** 또는 다른 방법을 해결하지 못할 경우, 일시적으로 또는 영구적으로 사용자의 IP 주소를 [에 추가&lt;requestBlacklist&gt; 당신의datasets.xml파일] (/docs/server-admin/datasets#request블랙리스트) ·
             
    *    **컴퓨터에서 스스로 문제를 복제하려고합니다.**   
문제가 1개의 dataset 또는 모든 datasets로, 1명의 사용자 또는 모든 사용자를 위해, 다만 특정 유형의 요구에 의하여, 등 .
문제를 중복 할 수 있다면, 문제를 축소하려고합니다.
문제가 없으면, 문제가 사용자의 컴퓨터, 사용자의 인터넷 연결 또는 기관의 인터넷 연결에 연결될 수 있습니다.
         
    * 이름 * **1개의 dataset** 자주 묻는 질문 (아마도 단지 **1개의 유형의 요구** 1개의 사용자에서) , 문제는 일 수 있습니다:
        *   ERDDAPdataset의 소스 데이터에 액세스 (관계형 데이터베이스, Cassandra 및 원격 데이터셋에서) 일시적으로 또는 영구적으로 느립니다. 소스의 속도를 독립적으로 확인하려고ERDDAP· 느린 경우, 아마도 당신은 그것을 향상시킬 수 있습니다.
        * 특정 요청 또는 일반적인 유형과 관련된 문제입니까?
더 큰 요청된 데이터 세트의 하위 세트, 더 많은 가능성이 요청이 실패합니다. 사용자가 거대한 요청을 만드는 경우, 사용자가 빠른 성공적인 응답을 얻을 가능성이 더 작은 요청을 만들 수 있습니다.
            
거의 모든 데이터 세트는 다른 유형의 요청을 처리하는 데 더 낫습니다. 예를 들어, dataset가 다른 파일에서 다른 시간의 펑크를 저장하면 엄청난 시간의 데이터 요청은 매우 느립니다. 현재 요청이 어려운 유형이라면 이러한 요청에 최적화 된 데이터 세트의 변형을 고려하십시오. 또는 그 유형의 요청이 어렵고 시간이 많이 걸리는 사용자에 대해 설명합니다.
            
        * dataset는 최적의 구성이 될 수 없습니다. dataset의 변경을 할 수 있습니다.datasets.xml도움이되는 chunkERDDAP™dataset를 더 잘 처리하십시오. 예를 들어,
            
            *   EDDGridFromNcFiles datasets는 압축 nc4/hdf5 파일로부터 데이터에 액세스하는 것은 전체 지리적 범위에 대한 데이터를 얻을 때 느립니다. (e.g., 세계지도) 전체 파일이 압축되어야하기 때문에. 파일을 압축하지 않는 파일로 변환 할 수 있지만 디스크 공간 요구 사항은 훨씬 크다. 이러한 데이터셋이 특정 상황에서 느리게 될 것이라는 점을 잘 알고 있습니다.
            * [의 구성]&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables의 경우) 태그는 방법에 대한 거대한 영향을ERDDAP™EDDTable datasets를 취급합니다.
            * 당신은 증가 할 수 있습니다[EDDTableFromDatabase의 속도](/docs/server-admin/datasets#database-speed)데이터셋.
            * 많은 EDDTable datasets는 sped 할 수 있습니다[데이터의 복사본 저장NetCDFContiguous Ragged Array 파일](/docs/server-admin/datasets#eddtablefromfiles)·ERDDAP™아주 빨리 읽을 수 있습니다.
            
특정 데이터 세트를 가속화하는 데 도움이 필요하면 문제와 dataset의 펑크에 대한 설명을 포함합니다.datasets.xml우리를보고[더 많은 지원 얻기에 섹션](/docs/intro#support)·
             
    * 이름 * **모든 것** 내 계정ERDDAP™이름 * **항상** 느린, 문제는 일 수 있습니다:
        * 실행중인 컴퓨터ERDDAP™충분한 기억 또는 가공 힘이 있을지도 모릅니다. 실행에 좋은ERDDAP™현대 멀티 코어 서버에서. 무거운 사용을 위해, 서버는 64 비트 운영 체계 및 기억의 8개 GB 또는 더 많은 것을 가지고 있어야 합니다.
        * 실행중인 컴퓨터ERDDAP™시스템 리소스를 많이 소비하는 다른 응용 프로그램을 실행할 수도 있습니다. 그래서, 전용 서버를 얻을 수 있습니다ERDDAP· 예를 들어 (이것은 보증이 아닙니다.) , ~ $ 1100의 8 GB 메모리가있는 쿼드 코어 Mac Mini Server를 얻을 수 있습니다.
             
    * 이름 * **모든 것** 내 계정ERDDAP™이름 * **일시 정지** 느린,보기ERDDAP이름 *[ **/erddap/status.html(주)** ](#status-page)당신의 브라우저.
        * 이름 *ERDDAP™상태 페이지가로드 실패?
그래서,[지원하다ERDDAP™](#shut-down-and-restart)·
        * 는ERDDAP™상태 페이지로드 천천히 (예, &gt;5 초) ·
즉, 모든 것이 모든 것이ERDDAP™천천히 실행되지만 반드시 문제가 없습니다.ERDDAP™그냥 정말 바쁜 일 수 있습니다.
        * "Response 실패 시간 (로드데이터셋) ", n = 큰 숫자입니까?
그것은 최근 실패한 요청의 제비가 있음을 나타냅니다. 그것은 문제 또는 문제의 시작일 수 있습니다. 실패의 미디어 시간은 종종 큰 (예, 210000 ms) ·
그대는 (이름 *) 활동적인 실의 제비.
자원의 tying up 제비 (메모리, 파일 열기, 소켓을 열고 ...) ·
좋은 것.
        * "Response Succeeded Time의 경우 (로드데이터셋) ", n = 큰 숫자입니까?
그것은 최근 성공적인 요청의 제비를 나타냅니다. 이것은 말하지 않습니다. 그것은 단지 당신의 뜻ERDDAP™무거운 사용.
        * "Non-Tomcat-waiting Threads의 수"는 일반적인 값을 두 배로 늘리고 있습니까?
이것은 종종 심각한 문제가 발생합니다.ERDDAP™아래로 느리고 결국 동결. 이 시간이 지속될 경우[지원하다ERDDAP™](#shut-down-and-restart)·
        * "Memory Use Summary" 목록의 하단에 마지막 "Memory : 현재 사용"값이 매우 높습니까?
그것은 단지 높은 사용을 나타냅니다, 또는 그것은 문제의 표시일 수 있습니다.
        * 스레드와 그 상태의 목록을 봐. 특별한 점은 무엇인가?
             
    * 이름 * **귀하의 기관의 인터넷 연결** 현재 느리나요?
인터넷 검색 "internet speed test" 무료 온라인 테스트 중 하나 사용[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)· 기관의 인터넷 연결이 느리면, 그 사이에 연결ERDDAP™원격 데이터 소스는 느리고, 연결ERDDAP™그리고 사용자는 느리게 될 것입니다. 때때로, 당신은 불필요한 인터넷 사용을 중지해서 이것을 해결할 수 있습니다 (e.g., 스트리밍 비디오를 시청하거나 화상 회의 통화) ·
         
    * 이름 * **사용자의 인터넷 연결** 현재 느리나요?
사용자는 "internet speed test"를 위해 인터넷을 검색하고 무료 온라인 테스트 중 하나를 사용합니다.[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)· 사용자의 인터넷 연결이 느리다면, 액세스가 느리게 됩니다.ERDDAP· 때때로, 그들은 그들의 기관에 불필요한 인터넷 사용을 중지해서 이것을 해결할 수 있습니다 (e.g., 스트리밍 비디오를 시청하거나 화상 회의 통화) ·
         
    *    **뚱 베어?**   
더 보기[더 많은 지원 얻기에 섹션](/docs/intro#support)·

### 폐쇄 및 재시작{#shut-down-and-restart} 
*    **톰캣과 멈춰가는 방법ERDDAP™**   
톰캣을 종료하고 재시작할 필요가 없습니다.ERDDAP이름 *ERDDAP™일시적으로 느린, 약간 알려진 이유에 대한 느린 (스크립트에서 많은 요청과 같은WMS이름 *) , 또는 변경을 적용datasets.xml파일.
    
톰캣을 종료하고 재시작해야 합니다.ERDDAP™당신은 setup.xml 파일에 변경을 적용해야하는 경우, 또는ERDDAP™동결, 걸림, 또는 잠금. 극단적인 상황에서,Java1 분 또는 2 동안 동결 될 수 있습니다. 전체 쓰레기 수집, 하지만 다음 복구. 그래서 그것은 1 분 또는 2을 기다릴 것이 좋습니다Java/ 한국어ERDDAP™정말 냉동 또는 긴 쓰레기 수집을하는 경우. (쓰레기 수집이 일반적인 문제인 경우,[Tomcat에 더 많은 메모리를 할당](/docs/server-admin/deploy-install#memory)·) 
    
Tomcat Web Application Manager를 사용하여 Tomcat 또는 Shutdown Tomcat을 사용하는 것이 좋습니다. 완전 폐쇄 및 시작 Tomcat이 아닌 경우, 빨리 또는 나중에 PermGen 메모리 문제가있을 것입니다.
    
종료 및 Tomcat을 다시 시작ERDDAP::
    
    * Linux 또는 Mac을 사용하는 경우:
         (Tomcat, e.g., tomcat을 실행하는 특별한 사용자를 만들면 다음 단계를 사용자로 기억하십시오.)   
         
        1. CD 사용 *뚱 베어* /빈
             
        2. 사용 ps -ef|grep tomcat java/tomcat 프로세스 이름 * (희망적으로, 다만 1개의 과정은 목록으로 만들어질 것입니다) , 우리는 호출 할 *javaProcessID로* 아래.
             
        3. 이름 *ERDDAP™냉동/hung/locked 올라, use kill -3 *javaProcessID로* 이름 *Java  (Tomcat을 실행하는 것) Tomcat 로그 파일에 스레드 덤프를 수행하려면: *뚱 베어* /logs/catalina.out 니다. 재부팅 후, 스레드 덤프 정보를 찾아서 문제를 진단할 수 있습니다. (그리고 그 위에 다른 유용한 정보) 내 계정 *뚱 베어* /logs/catalina.out 및 또한 관련 부품을 읽을 수[ERDDAP™로그 아카이브](#log)· 당신이 원하는 경우, 당신은 그 정보를 포함 하 고 우리의 참조[더 많은 지원 얻기에 섹션](/docs/intro#support)·
             
        4. 사용 ./shutdown. 뚱 베어
             
        5. 사용 ps -ef|grep tomcat 반복적으로 java/tomcat 프로세스가 나열되지 않습니다.
            
때때로, java/tomcat 과정은 완전히 폐쇄하는 2 분까지 가지고 갈 것입니다. 그 이유는:ERDDAP™그 배경 스레드에 메시지를 보내 그들에 게 중지, 하지만 때로는이 스레드가 좋은 중지 장소에 얻을 긴 시간을 걸립니다.
            
        6. 분 후에 또는 이렇게, java/tomcat는 스스로 멈추지 않습니다, 당신은 사용할 수 있습니다
킬 -9 *javaProcessID로*   
java/tomcat 프로세스를 강제로 즉시 중지합니다. 해당 이용 후기에 달린 코멘트가 없습니다. -9 스위치는 강력하지만 다양한 문제를 일으킬 수 있습니다.
             
        7. 재시작ERDDAP™, 사용 ./startup.sh
             
        8. (주)ERDDAP™브라우저에서 다시 시작이 성공했는지 확인하십시오. (때때로 30 초를 기다리고로드하려고ERDDAP™당신의 브라우저에서 다시 성공합니다.)   
             
    * Windows를 사용하는 경우:
         
        1. CD 사용 *뚱 베어* /빈
             
        2. 제품 정보shutdown.bat  
             
        3. Windows 작업 관리자를 사용하려면 /need 할 수 있습니다 (Ctrl Alt Del를 통해 액세스) 그것을 보장하기 위해Java·Tomcat/ERDDAP™process/application은 완전히 멈추었습니다.
때때로, 프로세스/복제는 두 분까지 아래로 폐쇄할 것입니다. 그 이유는:ERDDAP™그 배경 스레드에 메시지를 보내 그들에 게 중지, 하지만 때로는이 스레드가 좋은 중지 장소에 얻을 긴 시간을 걸립니다.
             
        4. 재시작ERDDAP™, use 개시.bat
             
        5. (주)ERDDAP™브라우저에서 다시 시작이 성공했는지 확인하십시오. (때때로 30 초를 기다리고로드하려고ERDDAP™당신의 브라우저에서 다시 성공합니다.)   
             
### 빈번한 충돌 또는 동결{#frequent-crashes-or-freezes} 
이름 *ERDDAP™느린, 충돌 또는 동결, 뭔가 잘못. 자세히 보기[ERDDAP로그 파일](#log)원인을 파악하려고합니다. 당신이 할 수없는 경우, 세부 사항을 포함하고 우리의보기[더 많은 지원 얻기에 섹션](/docs/intro#support)·

가장 일반적인 문제는 한 번에 여러 스크립트를 실행하고 / 또는 잘못된 요청의 많은 번호를 만드는 사람입니다. 이 일이 발생하면 사용자가 블랙리스트를해야합니다. blacklisted user가 요청을 할 때, 응답의 오류 메시지는 문제를 해결하기 위해 이메일을 보내도록 권장합니다. 그런 다음 한 번에 한 개의 스크립트를 실행하고 스크립트에 문제를 해결하기 위해 격려 할 수 있습니다. (e.g., 원격 데이터 세트에서 데이터를 요청하여 타이밍 전에 응답 할 수 없습니다.) · 보기 [&lt;requestBlacklist&gt; 당신의datasets.xml파일] (/docs/server-admin/datasets#request블랙리스트) ·

극단적인 상황에서,Java1 분 또는 2 동안 동결 될 수 있습니다. 전체 쓰레기 수집, 하지만 다음 복구. 그래서 그것은 1 분 또는 2을 기다릴 것이 좋습니다Java/ 한국어ERDDAP™정말 냉동 또는 긴 쓰레기 수집을하는 경우. (쓰레기 수집이 일반적인 문제인 경우,[Tomcat에 더 많은 메모리를 할당](/docs/server-admin/deploy-install#memory)·) 

이름 *ERDDAP™느리거나 동결이 되고 문제는 말썽일한 사용자 또는 긴 쓰레기 수집이 아닙니다, 당신은 보통 문제를 해결할 수 있습니다[재시작ERDDAP™](#shut-down-and-restart)· 내 경험은ERDDAP™재시작 없이 달 동안 실행할 수 있습니다.
     

### 관련 기사{#monitor} 
모니터할 수 있습니다.ERDDAP's 상태 보고[/erddap/status.html(주)](#status-page), 위쪽의 통계. 이름 *ERDDAP™느리거나 동결되고 문제는 단지 극단적으로 무거운 사용법이 아닙니다, 당신은 보통 문제를 해결할 수 있습니다[재시작ERDDAP™](#shut-down-and-restart)· /erddap/metrics에서 Prometheus 통합을 통해 추가 메트릭스가 있습니다.

내 경험은ERDDAP™재시작 없이 달 동안 실행할 수 있습니다. 당신은 당신이 만든 몇 가지 변경을 적용하려는 경우 다시 시작해야ERDDAP's setup.xml 또는 새 버전을 설치해야 할 경우ERDDAP™·Java, Tomcat, 또는 운영 체계. 재시작해야 하는 경우ERDDAP™자주, 뭔가 잘못. 더 보기[ERDDAP로그 파일](#log)원인을 파악하려고합니다. 당신이 할 수없는 경우, 세부 사항을 포함하고 우리의보기[더 많은 지원 얻기에 섹션](/docs/intro#support)· 임시 해결책으로, 당신은 사용 시도할지도 모릅니다[모나이트](https://mmonit.com/monit/)사용자 정의ERDDAP™그리고 그것을 다시 시작하면. 또는, 당신은 다시 시작 cron 작업을 만들 수ERDDAP™  (뚱 베어) 자주 묻는 질문 모니터링 및 재시작하기 위해 스크립트를 작성하는 것은 조금 어려울 수 있습니다.ERDDAP· 도움이 될 수있는 몇 가지 팁 :

* Tomcat 프로세스가 여전히 grep과 함께 -c 스위치를 사용하여 실행되는 경우 테스트를 단순화 할 수 있습니다.
₢ 킹 *뚱 베어 사용자 이름*  |사이트맵
그것은 "1"으로 출력을 감소시킬 것입니다. tomcat 프로세스가 여전히 살아있을 경우, 또는 "0" 프로세스가 중단되면.
     
* 당신이 어둡게 좋은 경우에, 당신은 processID를 결과에서 추출할 수 있습니다
₢ 킹 *뚱 베어 사용자 이름*  |grep java, 스크립트의 다른 줄에서 processID를 사용합니다.
     

Monit 또는 cron 작업을 설정하면 세부 사항을 공유 할 수 있다면 좋습니다.[더 많은 지원 얻기에 섹션](/docs/intro#support)공유 할 수있는 곳.

#### 채용정보{#permgen} 
반복적으로 Tomcat Manager를 다시로드하는 경우 (또는 정지 및 시작)  ERDDAP™·ERDDAP™java.lang을 시작하고 던질 수 없습니다. OutOfMemoryError: 퍼머젠. 해결책은 주기적으로 입니다 (또는 매번?)  [종료 및 재시작 tomcat 및ERDDAP™](#shut-down-and-restart), 다만 reloading 대신ERDDAP·
\\[업데이트: 이 문제는 크게 최소화되거나 고정되었습니다.ERDDAP™버전 1.24.\\]  
     
#### 로그인{#log} 
*    **[로그.txt](#log)**   
이름 *ERDDAP™시작하지 않거나 뭔가 예상대로 작동하지 않는 경우, 그것은 오류 및 진단 메시지를보고 매우 유용합니다ERDDAP™로그 파일.
    * 로그 파일 *큰Parent감독* 다운로드
         ( *큰Parent감독* 정의된[설정.xml](/docs/server-admin/deploy-install#setupxml)) · 로그인이 없습니다. txt 파일 또는 로그인 경우. txt 파일은 재시작 이후 업데이트되지 않았습니다ERDDAP™, 봐[Tomcat 로그 파일](#tomcat-logs)오류 메시지가 있으면 볼 수 있습니다.
    * 로그 파일에서 진단 메시지의 유형:
        * "error"라는 단어는 무언가가 그렇게 잘못되었을 때 사용됩니다. 오류를 얻기 위해 성가신이지만, 문제를 처리하는 오류 힘. 우리의 생각은 오류를 던지는 것이 더 낫습니다.ERDDAP™따라 호블, 당신이 기대하지 않은 방식으로 일.
        * "warning"라는 단어는 잘못되었을 때 사용되지만 절차가 완료 될 수 있습니다. 이것은 꽤 드문다.
        * 다른 것은 단지 유익한 메시지입니다. 당신은 얼마나 많은 정보를 기록 할 수 있습니다 [&lt;로그레벨&gt; (/docs/server-admin/datasets#loglevel의 경우)  datasets.xml·
        * Dataset reloads and user responses that take &gt;10 초 완료 (성공적으로 또는 실패) "으로 표시 (&gt;10s&#33;) · 따라서, 이 구문에 대한 log.txt 파일을 검색할 수 있습니다. 데이터셋을 다시로드하거나 마무리하는 요청 수를 찾을 수 있습니다. 그런 다음 dataset 문제가되었거나 사용자 요청이 무엇인지 확인하기 위해 log.txt 파일에서 더 높을 수 있습니다. 이 느린 dataset 짐 및 사용자 요구는 때때로 과세입니다ERDDAP· 그래서 이러한 요청에 대해 더 알고 당신은 문제를 식별하고 해결 할 수 있습니다.
    * 이 정보는 상당히 큰 펑크에 디스크 드라이브에 로그 파일에 기록됩니다. 장점은 매우 효율적입니다 --ERDDAP™로그 파일에 기록 될 정보를 기다리지 않을 것입니다. 단점은 로그가 거의 항상 부분 메시지로 끝나고 다음 펑크가 작성 될 때까지 완료되지 않습니다. 업데이트 할 수 있습니다. (즉시) 으로 보고ERDDAP's 상태 웹 페이지' https://*your.domain.org*/erddap/status.html   (또는http://이름 *https지원되지 않음) ·
    * log.txt 파일이 20MB로 얻을 때,
파일이 renamed 로그입니다. txt.previous 새로운 log.txt 파일이 생성됩니다. 그래서 로그 파일은 축적되지 않습니다.
        
setup.xml에서 로그 파일에 대한 다른 최대 크기를 지정할 수 있습니다., MegaBytes. 허용되는 최소 1 (사이트맵) · 허용되는 최대 2000 (사이트맵) · 기본값은 20 (사이트맵) · 예를 들면:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * 언제 다시 시작ERDDAP™·
        ERDDAP™log.txt 및 log의 아카이브 복사본을 만듭니다. txt.previous files 파일 이름의 타임 스탬프. 다시 시작 전에 문제가 발생하면 문제가 무엇인지에 따라 clues에 이러한 아카이브 파일을 분석하는 데 유용 할 수 있습니다. 더 이상 필요하지 않은 경우 아카이브 파일을 삭제할 수 있습니다.
         
##### 로그인.txt{#parsing-logtxt} 
ERDDAP로그인 txt 파일은 파싱을 위해 설계되지 않습니다. (원하는 정보를 추출하는 정규 표현식을 만들 수 있지만) · 뭔가 잘못 될 때 잘못 될 때 인간적인 인물을 돕기 위해 설계되었습니다. 버그 또는 문제 보고서를 제출할 때ERDDAP™개발자, 가능한 경우, troublesome 요청과 관련된 log.txt 파일에서 모든 정보를 포함하십시오.

효율성 이유를 위해,ERDDAP™로그에 대한 정보를 작성합니다. 정보의 큰 펑크가 축적 된 후 txt. 로그인을 하시면 됩니다. 오류가 발생한 후 txt는 오류 관련 정보가 아직 log.txt에 기록되지 않았습니다. log.txt에서 최신 정보를 얻으려면,ERDDAP이름 *[status.html 페이지](#status-page)· 시간 :ERDDAP™요청 프로세스, 그것은 log.txt에 모든 공개 정보를 플러시합니다.

제품 정보ERDDAP™사용 통계, please use[Apache 및/또는 Tomcat 로그 파일](#tomcat-logs)대신에ERDDAP로그인 이름 *ERDDAP이름 *[status.html 페이지](#status-page)  (이름 *) 이름 *[매일 보고서](#daily-report)  (더 보기) 많은 수의 사용 통계를 가지고 있습니다.
    
### Tomcat 로그{#tomcat-logs} 
이름 *ERDDAP™오류가 매우 일찍 발생했기 때문에 시작하지 않습니다.ERDDAP's start, 오류 메시지는 Tomcat의 로그 파일에서 표시됩니다. ( *뚱 베어* /logs/카탈리나. *오늘* .log 또는 *뚱 베어* /logs/카탈리나.out) ·[ERDDAP's log.txt 파일](#log)·

사용법 통계: 로그인 파일에서 수집하려는 대부분의 정보 (e.g., 사용 통계) , Apache 및/또는 Tomcat 로그 파일을 사용하십시오. 그들은 멋지게 포맷되어 정보의 유형이 있습니다. 수많은 도구가 있습니다. 예를 들어,[AWS 통계](https://www.awstats.org)·[ElasticSearch의 Kibana](https://www.elastic.co/products/kibana)·[사이트맵](https://jmeter.apache.org), 그러나 웹을 검색하여 귀하의 목적을 위해 올바른 도구를 찾을 수 있습니다.

로그 파일만 IP 주소로 사용자를 식별합니다. 주어진 IP 주소, e.g와 관련된 정보를 얻을 수있는 웹 사이트가 있습니다.[IsMyIP주소](https://whatismyipaddress.com/ip-lookup), 그러나 당신은 일반적으로 사용자의 이름을 찾을 수 없습니다.

또한, 때문에[사이트맵](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), 주어진 사용자의 IP 주소는 다른 일에 다를지도 모릅니다, 또는 다른 사용자는 다른 시간에 동일한 IP 주소를 비치할지도 모릅니다.

그렇지 않으면 뭔가를 사용할 수 있습니다.[Google 웹 로그 분석](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision)· 그러나 beware: Google Analytics와 같은 외부 서비스를 사용할 때, Google에 대한 Google 전체 액세스 권한을 제공하는 사용자의 개인 정보를 포기하고 있습니다. (기타?) 어떤 목적을 위해 영원히 그리고 사용을 지킬 수 있습니다 (아마 기술적으로,하지만 아마 연습) · 이 웹 사이트는 귀하가 웹 사이트를 탐색하는 동안 귀하의 경험을 향상시키기 위해 쿠키를 사용합니다. 이 쿠키들 중에서 필요에 따라 분류 된 쿠키는 웹 사이트의 기본적인 기능을 수행하는 데 필수적이므로 브라우저에 저장됩니다. 이 일, 많은 사용자는 웹에서 할 모든 것이이 큰 회사에 의해 모니터링된다는 것을 매우 우려하고있다 (Google, Facebook 등) 그리고 정부에 의해, 그들의 삶에 불멸된 침입을 발견 (책에서, 1984) · 이것은 같은 제품을 설치하기 위해 많은 사용자를 구동[개인 정보 보호](https://www.eff.org/privacybadger/faq)추적을 최소화하기 위해, 같은 대안 브라우저를 사용[다운로드](https://www.torproject.org/)  (또는 전통적인 브라우저에서 추적을 해제) , 그리고 같은 대안 검색 엔진을 사용[덕덕고](https://duckduckgo.com/)· Google Analytics와 같은 서비스를 사용하는 경우, 최소한의 문서와 그 결과가 변경됩니다.&lt;standardPrivacyPolicy&gt; 태그ERDDAP이름 *
\\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일.
    
### E-Mail 로그인{#e-mail-log} 
*    **이메일로그인-MM-DD.txt**   
    ERDDAP™항상 현재 일의 이메일에 있는 모든 나가는 이메일 메시지의 텍스트를 쓰십시오 LogYEAR-MM-DD.txt 파일에 *큰Parent감독* /로그 ( *큰Parent감독* 정의된[설정.xml](/docs/server-admin/deploy-install#setupxml)) ·
    * 서버가 전자 메일 메시지를 보낼 수 없거나, 설정한 경우ERDDAP™이메일 메시지를 보내거나 의심스러운 경우이 파일은 전송 된 이메일 메시지의 모든 것을 볼 수있는 편리한 방법입니다.
    * 이전 날의 이메일 로그 파일을 삭제할 수 있습니다.
         
### 매일 보고서{#daily-report} 
Daily Report는 유용한 정보를 많이 가지고 있습니다 -- 귀하의 정보의 모든ERDDAP이름 *[/erddap/status.html(주)](#status-page)더 많은 것.
    * 그것은 당신의 가장 완벽한 요약입니다ERDDAP's 상태.
    * 다른 통계 중, 그것은로드하지 않은 데이터 세트의 목록과 생성 된 예외를 포함한다.
    * 시작할 때 생성됩니다.ERDDAP™  (그 후ERDDAP™datasets의 모든 부하하려고) 그리고 매일 아침 7시 이후 곧 생성되었습니다.
    * 그것이 생성되면, 그것은 기록됩니다[ERDDAP's log.txt 파일](#log)·
    * 생성되면 이메일로 전송됩니다.&lt;이메일DailyReportsTo&gt; 및&lt;이메일Everything 으로 (지정된[설정.xml](/docs/server-admin/deploy-install#setupxml)) 이메일 시스템을 설정했습니다. (설정에서.xml) ·

### 상태 페이지{#status-page} 
당신은 당신의 상태를 볼 수 있습니다ERDDAP™본문 바로가기&lt;기본Url&gt;/erddap/status.html
* 이 페이지는 역동적으로 생성됩니다, 그래서 그것은 항상 당신의 것을 위한 up-to-the-moment 통계가 있습니다ERDDAP·
* 그것은 요청, 메모리 사용, 스레드 스택 추적, taskThread 등의 수에 대한 통계를 포함한다.
* 상태 페이지가 누군가가 볼 수 있기 때문에 많은 정보가 포함되지 않습니다.[매일 보고서](#daily-report)·
         
### Datasets 추가/Changing{#addingchanging-datasets} 
ERDDAP™일반적으로 rereadsdatasets.xml모든 제품 *로드데이터셋Minutes*   (설정하기[설정.xml](/docs/server-admin/deploy-install#setupxml)) · 이렇게 변경할 수 있습니다.datasets.xml어떤 시간도ERDDAP™계속.
새로운 dataset는 곧 검출될 것입니다, 보통 안에 *로드데이터셋Minutes* ·
변경된 dataset는 reloaded 때 그것입니다 *reload모든NMinutes* 뚱 베어 (지정된datasets.xml) ·
    
#### 팟캐스트{#flag} 
*    **[A Flag 파일](#flag)이름 *ERDDAP™가능한 한 빨리 Dataset를 다시로드하려고** 
    
    *   ERDDAP™dataset의 설정에 대한 변경 사항이 없습니다.datasets.xml까지ERDDAP™dataset를 다시로드합니다.
         
    * 이름 *ERDDAP™가능한 한 빨리 dataset를 다시로드하십시오 (dataset의 데이터 세트를 위해&lt;reloadEveryNMinutes&gt;는 재부하될 원인이 될 것입니다), 안으로 파일을 끼워넣으십시오 *큰Parent감독* /플라그 ( *큰Parent감독* 정의된[설정.xml](/docs/server-admin/deploy-install#setupxml)) dataset's와 같은 이름이 있습니다.datasetID·
이 말ERDDAP™dataset ASAP를 다시로드하려고합니다.
dataset의 오래된 버전은 사용자가 새 버전이 사용할 수있을 때까지 유지하고 원자로를 배치합니다.
제품 정보EDDGrid파일 및 EDDTable fromFiles, reloading dataset은 새 또는 변경된 파일에 대해 볼 수 있으며, 이를 읽고 dataset에 통합합니다. 그래서 다시로드 할 시간은 새로운 또는 변경 된 파일의 수에 따라 다릅니다.
dataset가 active="false"인 경우ERDDAP™dataset를 제거합니다.
         
##### 나쁜 파일 플래그{#bad-files-flag} 
* /flag 디렉토리의 한 변형은 /badFilesFlag 디렉토리입니다. (에 게시 됨ERDDAP™v2.12 니다.)   
파일에 넣으면 *큰Parent감독* /badFilesFlag 디렉토리와datasetID파일명 (파일 내용이 중요하지 않습니다.) , 그때 곧ERDDAP™badFiles를 참조하십시오 플래그 파일,ERDDAP™다음 것:
    
    1. badFilesFlag 파일을 삭제합니다.
    2. 잘못된 파일 삭제.nc파일 형식 (그대는) , 그 dataset에 대한 나쁜 파일 목록이 있습니다.
datasets를 위해EDDGridsideBySide that have childDatasets, this also deletes the badFiles.nc모든 아이 데이터 세트에 대한 파일.
    3. Dataset ASAP를 다시로드합니다.
    
따라서,이 원인ERDDAP™파일을 다시 시도하기 전에 (자주 묻는 질문) 나쁘다.
         
##### 하드 플래그{#hard-flag} 
* /flag 디렉토리의 또 다른 변형은 /hardFlag 디렉토리입니다. (에 게시 됨ERDDAP™v1.74입니다.)   
파일에 넣으면 *큰Parent감독* /hardFlag와 함께datasetID파일명 (파일 내용이 중요하지 않습니다.) , 그때 곧ERDDAP™열심히 볼 플래그 파일,ERDDAP™다음 것:
    
    1. hardFlag 파일을 삭제합니다.
    2. dataset 제거ERDDAP·
    3. 모든 정보를 삭제ERDDAP™이 dataset에 대해 저장했습니다.
제품 정보EDDGrid파일 및 EDDTable fromFiles subclasses, 이 데이터 파일과 내용의 내부 데이터베이스를 삭제합니다.
datasets를 위해EDDGridsideBySide that have childDatasets, this also deletes internal database of data files and their content for all child datasets.
    4. dataset를 다시로드합니다.
제품 정보EDDGrid파일 및 EDDTable fromFiles 하위 클래스, 이 원인ERDDAP™관련 기사 **모든 것** 데이터 파일의. 따라서 reload 시간은 dataset에 있는 자료 파일의 총 수에 의존합니다. dataset가 제거되었기 때문에ERDDAP™hardFlag이 통지되었을 때 dataset은 reloading을 완료할 때까지 사용할 수 없습니다. 환자에게 자세히 보기[로그.txt](#log)당신이 무엇을 할 것인지보고 싶다면 파일.
    
hardFlag 변형은 dataset의 저장된 정보를 데이터셋이 현재 로드되지 않는 경우에도 삭제합니다.ERDDAP·
    
뚱 베어 Flags는 당신이 어떻게 변화하는 무언가를 할 때 매우 유용합니다ERDDAP™소스 데이터를 읽고 해석, 예를 들어, 새 버전을 설치할 때ERDDAP™또는 dataset의 정의로 변경할 때datasets.xml
    
* flag, badFilesFlag 및 hardFlag 파일의 내용은 관련이 없습니다.ERDDAP™그냥 파일 이름을 보면datasetID·
     
* 중요한 dataset reloads 사이에서,ERDDAP™flag, badFilesFlag 및 hardFlag 파일에 대해 지속적으로 볼 수 있습니다.
     
* dataset가 다시로드 될 때, 모든 파일 *큰Parent감독* / 한국어[뚱 베어](#cached-responses)/ 한국어 *datasetID* 디렉토리는 삭제됩니다. 이 포함.nc일반적으로 ~15 분 동안 캐시 된 이미지 파일.
     
* dataset의 xml이 포함되는 경우 주의[활동 = false](/docs/server-admin/datasets#active), flag는 dataset가 inactive 되게 한다 (활동이 있다면) , 그리고 어떤 경우에, reloaded.
     
* 모든 시간ERDDAP™LoadDatasets를 실행하여 주요 재로드를 수행하십시오 (시간 재로드 제어&lt;loadDatasetsMinutes&gt; 또는 작은 재부하 (외부 또는 내부 플래그의 결과로) ·ERDDAP™모든 것&lt;decompressedCacheMaxGB&gt;,&lt;decompressedCacheMaxMinutesOld&gt;,&lt;사용자&gt;,&lt;requestBlacklist&gt;,&lt;slowDownTroubleMillis&gt;, 그리고&lt;subscriptionEmailBlacklist&gt; 태그 및 스위치를 새로운 설정. 그래서 당신은 얻을 수있는 방법으로 플래그를 사용할 수ERDDAP™태그 ASAP의 변경 사항

##### Dataset 플래그 설정{#set-dataset-flag} 
*  ERDDAP™URL을 통해 설정할 수 있도록 웹 서비스가 있습니다.
    
    * 예를 들어,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (그것은 가짜 깃발입니다 이름 *) rPmelTao dataset에 대한 플래그를 설정합니다.
    * 각각 다른 flagKey가 있습니다.datasetID·
    * Administrators는 모든 데이터 세트에 대한 플래그 URL 목록을 볼 수 있습니다.[매일 보고서](#daily-report)이메일.
    * Administrators는 이러한 URL을 기밀로 취급해야합니다. 그들은 누군가에게 데이터셋을 재설정하기 위해 권리를 부여합니다.
    * flagKeys를 생각하면 누군가의 손에 떨어졌다면 변경할 수 있습니다.&lt;flagKeyKey&gt; 에[설정.xml](/docs/server-admin/deploy-install#setupxml)그리고 재시작ERDDAP힘으로ERDDAP™flagKeys의 다른 세트를 생성하고 사용합니다.
    * 당신은&lt;flagKeyKey&gt;, 이전 구독의 모든 삭제 (Daily Report의 목록보기) 새로운 URL을 보내는 것을 기억하십시오.
    
주력 시스템은 더 효율적인 메커니즘을 위해 역할을 할 수 있습니다.ERDDAP™dataset를 다시로드 할 때. 예를 들어, dataset's를 설정할 수 있습니다.&lt;reloadEveryNMinutes&gt; 에 큰 수 (예를 들어, 10080 = 1 주) · 그런 다음 dataset이 변경되었을 때 (아마도 dataset의 데이터 디렉토리에 파일을 추가했기 때문에) , dataset가 가능한 한 빨리 다시로드되는 플래그를 설정. 깃발은 보통 빨리 본다. 하지만 LoadDatasets 스레드가 이미 바쁜 경우, 플래그에 행동하기 위해 사용할 수 있기 전에 잠시 될 수 있습니다. 하지만 주력 시스템은 훨씬 더 반응하고 훨씬 더 효율적으로 설정&lt;reloadEveryNMinutes&gt; 작은 번호로.
    
#### Datasets 제거{#removing-datasets} 
dataset가 활성화된 경우ERDDAP™그리고 당신은 일시적으로 또는 영구적으로 비활성화하고 싶습니다:
1. 내 계정datasets.xmldataset를 위해, 세트[활동 = false](/docs/server-admin/datasets#active)dataset 태그에서.
2. 자세히보기ERDDAP™다음 주요 재부하중에 dataset를 제거하거나[플래그 설정](#flag)dataset에 대해ERDDAP™가능한 한 빨리이 변경을 알 수 있습니다. 당신이 이것을 할 때,ERDDAP™데이터셋에 대해 저장하고 실제 데이터에 아무것도 할 수 없습니다.
3. 그런 다음 활성 ="false" dataset을 떠날 수 있습니다.datasets.xml또는 제거.
         
#### Datasets가 다시로드 될 때?{#when-are-datasets-reloaded} 
RunLoadDatasets라는 스레드는 datasets가 다시로드 될 때 제어하는 마스터 스레드입니다. 다운로드 영원히 Datasets 반복:

1. RunLoadDatasets는 현재 시간을 메모합니다.
2. RunLoadDatasets는 LoadDatasets 스레드를 시작합니다. "majorLoad" 현재/이전 MajorLoad에 대한 정보를 확인할 수 있습니다.ERDDAP이름 *
    [/erddap/status.html(주)](#status-page)  (예를 들어,[상태 페이지 예](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) ·
    
    1. LoadDatasets는 사본을 만듭니다datasets.xml·
    2. LoadDatasets는 사본을 통해 읽습니다datasets.xml그리고, 각 dataset를 위해, dataset가 있어야 하는지 확인합니다 (이름 *) 로드 또는 제거.
        * 이름 *[기본 정보](#flag)이 dataset에 대한 파일은 삭제되고 dataset는 active="false"또는 (이름 *) Active="true"가 로드됨 (dataset의 연령에 관계없이) ·
        * dataset의 dataset.xml chunk가 active="false"를 가지고 있고 dataset는 현재 로드됩니다. (이름 *) , 그것은 unloaded (이름 *) ·
        * dataset가 active="true"를 가지고 있고 dataset는 이미 로드되지 않습니다.
        * dataset가 active="true"를 가지고 있고 dataset는 이미 적재되고 있는 경우에, dataset의 나이가 있는 경우에 자료 세트는 다시 로드됩니다 (마지막 짐부터 시간) 그것의 더 중대한&lt;관련 제품 모든 것&gt; (기본 = 10080 분) , 그렇지 않으면, dataset는 혼자 떠났습니다.
    3. LoadDatasets 끝.
    
RunLoadDatasets 스레드는 LoadDatasets 스레드를 기다립니다. LoadDatasets가 loadDatasets 보다는 더 길어지는 경우에 민분 (setup.xml에 지정됨) , RunLoadDatasets는 LoadDatasets 실을 중단합니다. 이상적으로, LoadDatasets는 중단과 끝을 주의합니다. 그러나 1 분 안에 중단을 통지하지 않는 경우, RunLoadDatasets는 loadDatasets를 호출합니다. 뚱 베어 () , undesirable 이다.
3. 마지막 mainLoad의 시작부터 시간이 loadDatasets보다 적습니다. 민분 (setup.xml, 예를 들면, 15 분) , RunLoadDatasets 반복적으로 보기를 위해[기본 정보](#flag)파일에 *큰Parent감독* /flag 디렉토리. 하나 이상의 플래그 파일이 발견되면 삭제되고 RunLoadDatasets는 LoadDatasets 스레드를 시작으로 "minorLoad" (mainLoad=false의 장점) · minorLoad 정보를 볼 수 없습니다.ERDDAP이름 *[/erddap/status.html(주)](#status-page)·
    1. LoadDatasets는 사본을 만듭니다datasets.xml·
    2. LoadDatasets는 사본을 통해 읽습니다datasets.xml그리고, 플래그 파일이 있는 각 dataset의 경우:
        * dataset의 dataset.xml chunk가 active="false"를 가지고 있고 dataset는 현재 로드됩니다. (이름 *) , 그것은 unloaded (이름 *) ·
        * dataset가 active="true" 인 경우 dataset는 (이름 *) 그 나이에 관계없이로드 됨. Non-flagged datasets는 무시됩니다.
    3. LoadDatasets 끝.
4. 다운로드 Datasets는 1 단계로 돌아갑니다.

참고 :
* - 연혁
다시 시작ERDDAP™, active="true"를 가진 각 dataset는 적재됩니다.
* 스낵 바
dataset이 있을 때 (이름 *) 로드, 캐시 (모든 데이터 응답 파일 및/또는 이미지 파일 포함) 이름 *
* Datasets의 제비
많은 datasets 및/또는 하나 이상의 datasets가 느린 경우에 (이름 *) 로드, LoadDatasets 스레드는 긴 시간이 걸릴 수 있습니다. 작업 완료, 아마도 loadDatasets 보다는 더 긴 민민.
* 1 LoadDatasets 스레드
한 번에 하나의 LoadDatasets 스레드가 실행되지 않습니다. LoadDatasets가 이미 실행될 때 flag가 설정되면, flag는 LoadDatasets 스레드가 실행될 때까지 통지되거나 행동되지 않습니다. 당신은 말할 수 있습니다: "그들은 어둡다. 왜 데이터셋을 로드하기 위해 새 스레드의 무리를 시작하지 않습니까? 그러나 하나의 원격 서버에서 데이터를 얻는 데이터 세트를 많이 가지고 있다면, 하나의 LoadDatasets 스레드는 원격 서버에 실질적인 스트레스를 넣을 것입니다. 한 RAID에 파일에서 데이터를 얻는 데이터 세트를 많이 가지고 있다면 동일합니다. LoadDatasets 스레드보다 더 많은 것을 갖는 것은 급속하게 감소합니다.
* 플래그 = ASAP
dataset가 있어야 하는 플래그를 설정 (이름 *) 가능한 한 빨리 로드, 반드시 즉시. LoadDatasets 스레드가 현재 실행되지 않은 경우, dataset은 몇 초 안에 다시로드됩니다. 하지만 LoadDatasets 스레드가 현재 실행중인 경우, dataset은 LoadDatasets 스레드가 완료된 후까지 다시로드되지 않습니다.
* Flag 파일 삭제
일반적으로, 플래그 파일을 넣어 경우 *큰Parent감독* /erddap/flag 디렉토리 (dataset의 플래그를 방문 Url 또는 실제 파일을 넣어) , dataset는 보통 그 flag 파일이 삭제된 후에 아주 빨리 재부팅될 것입니다.
* Flag versus 작은 reload 모든 분
데이터 세트가 재로드 될 때 알아야 할 몇 가지 외부 방법이 있으면 데이터 세트가 항상 업데이트되는지 확인하는 가장 좋은 방법은 재로드를 설정하는 것입니다. 각NMinutes에서 큰 숫자 (10080년) 플래그 설정 (스크립트를 통해?) 다시로드해야 할 때마다. 그것은 시스템이다EDDGridfromErddap 및 EDDTableFromErddap 사용은 데이터 세트가 다시로드되어야하는 메시지를 수신합니다.
* 로그인.txt
관련 정보의 제비는 *큰Parent감독* /logs/log.txt 파일. 당신이 기대하는대로 일하지 않는 경우, 로그를보고. txt는 정확히 어떤 것을 발견하여 문제를 진단합니다.ERDDAP™한국어
    
    * 주요 LoadDataset 스레드의 시작을위한 "majorLoad=true"검색.
    * minor LoadDatasets thread의 시작을 위해 "majorLoad=false"를 검색합니다.
    * 주어진 dataset의 검색datasetID그것에 대한 정보 (이름 *) 적재되거나 queried.
        
          
         
#### 자주 묻는 질문{#cached-responses} 
일반적으로,ERDDAP™캐시가 없습니다. (이름 *) 사용자 요청에 응답. 합리적은 대부분의 요청이 약간 다르기 때문에 캐시가 매우 효과적 일 것입니다. 가장 큰 예외는 이미지 파일에 대한 요청입니다 (브라우저와 같은 프로그램으로 캐시됩니다.Google Earth종종 re-request 이미지) 및 요청.nc파일 형식 (그들이 할 수 없기 때문에) ·ERDDAP™각 dataset의 캐시 된 파일을 다른 디렉토리에 저장하십시오. *큰Parent감독* / 캐시 / *datasetID* 단일 캐시 디렉토리가 액세스가 느리게 될 수있는 파일의 거대한 수를 가질 수 있기 때문에.
파일은 세 가지 이유로 캐시에서 제거됩니다.
* 이 캐시의 모든 파일은 삭제됩니다.ERDDAP™재시작.
* 주기적으로, 어떤 파일 더 많은 것&lt;cacheMinutes&gt; 늙은 (지정된[설정.xml](/docs/server-admin/deploy-install#setupxml)) 삭제됩니다. 시대를 기준으로 캐시에서 파일을 제거 (사용되지 않음) 이 파일은 매우 긴 캐시에 머물지 않습니다. 주어진 요청처럼 보일 수도 있지만 항상 동일한 응답을 반환해야합니다. 사실이 아닙니다. 예를 들어,tabledap&time을 포함하는 요청&gt; *이름 * (주)* 새 데이터가 dataset에 도착하면 변경됩니다. 그리고 포함되는 griddap 요청\\[이름 *\\]새 데이터가 dataset에 도착하면 시간 치수가 변경됩니다.
* 오류 상태를 보여주는 이미지는 캐시되지만 몇 분 동안만 (어려운 상황) ·
* 모든 데이터셋이 다시로드되고, 모든 파일이 dataset의 캐시가 삭제됩니다. 요청이 있을 수 있기 때문에"last"gridded dataset에 있는 색인은, dataset가 다시 로드될 때 캐시에 있는 파일이 유효하지 않을지도 모릅니다.
         
#### 저장된 Dataset 정보{#stored-dataset-information} 
모든 유형의 datasets를 위해,ERDDAP™dataset가 로드되고 메모리에 보관할 때 많은 정보를 수집합니다. 이 허용ERDDAP™데이터셋에 대한 정보와 데이터셋에 대한 요청을 검색, 요청하기 위해 매우 빠르게 응답합니다.

몇몇 유형의 datasets를 위해 (뚱 베어EDDGrid복사, EDDTableCopy,EDDGrid이름 * *뚱 베어* 파일 및 EDDTableFrom *뚱 베어* 파일 형식) ·ERDDAP™dataset가 다시로드 될 때 dataset에 대한 몇 가지 정보를 저장합니다. 이것은 매우 다시로드 프로세스를 가속화합니다.

* dataset 정보 파일의 일부는 인간의 읽기.json파일 및 저장 *큰Parent감독* /데이터셋/ *last2LettersOf데이터셋ID/datasetID* ·
*   ERDDAP™dataset의 변수를 추가하거나 삭제하면 예외적인 상황에서 이러한 파일을 삭제합니다.datasets.xml펑크.
* dataset의 가장 큰 변화datasets.xml뚱 베어 (e.g., 글로벌 속성 또는 변수 속성 변경) 이 파일을 삭제하는 데 도움이되지 않습니다. 정기적인 데이터셋 재로드는 이러한 유형의 변경을 처리합니다. 당신은 말할 수 있습니다ERDDAP™데이터셋 ASAP를 다시 로드하려면[기본 정보](#flag)dataset를 위해.
* 마찬가지로, 추가, 삭제, 또는 데이터 파일의 변경은 처리됩니다.ERDDAP™dataset를 다시로드합니다. 한국어ERDDAP™dataset가 사용하는 경우 이 유형의 변경이 곧 자동으로 표시됩니다 [&lt;update모든NMillis&gt;] (/docs/server-admin/datasets#updateeverynmillis의 경우) 시스템.
* 이 파일을 삭제하려면 단지 드문 일이 필요합니다. 당신이 힘을 필요로하는 가장 일반적인 상황ERDDAP™자주 묻는 질문 (그것이 out-of-date/incorrect이고 자동적으로 고쳐지지 않을 것입니다ERDDAP) dataset의 변경을 할 때datasets.xml어떻게 영향을 미치는 척ERDDAP™소스 데이터 파일에서 데이터를 해석, 예를 들어, 시간 변수의 형식 문자열을 변경.
* dataset의 저장된 정보 파일을 삭제하려면ERDDAP™그것은 (dataset가 현재 로드되지 않는 경우에도) , 설정[뚱 베어 팟캐스트](#hard-flag)그 dataset를 위해. dataset가 대용량 파일의 집계인 경우, dataset를 다시로드하면 상당한 시간이 걸릴 수 있습니다.
* Dataset의 저장된 정보 파일을 삭제하려면ERDDAP™실행되지 않습니다, 실행[팟캐스트](/docs/server-admin/datasets#dasdds)그 dataset에 대한 (어떤 디렉토리에 figuring 보다 쉽게 정보를 위치 하 고 손으로 파일을 삭제) · dataset가 대용량 파일의 집계인 경우, dataset를 다시로드하면 상당한 시간이 걸릴 수 있습니다.
         
### 메모리 상태{#memory-status} 
ERDDAP™실패하거나 동결하지 마십시오. 그것이라면, 가장 가능성이있는 원인 중 하나는 충분한 기억입니다. 상태.html 웹 페이지를 보면 메모리 사용을 모니터링 할 수 있습니다.

0 gc 호출, 0 요청 헛간, 그리고 0 위험한 마지막 중요한 LoadDatasets부터 MemoryEmail

 (그들은 진보적으로 더 심각한 사건입니다)   
및 MB inUse 및 gc는 통계의 테이블에 열을 호출합니다. 당신은 어떻게 메모리를 파괴 할 수ERDDAP™이 번호를 보시려면. 높은 숫자는 더 긴장을 나타냅니다.

* MB inUse는 항상 절반 이상이어야 합니다[\\-Xmx 메모리 설정](/docs/server-admin/deploy-install#memory)· 더 큰 숫자는 나쁜 표시입니다.
* gc 통화는 시간의 번호를 나타냅니다ERDDAP™쓰레기 수집가에게 높은 메모리 사용을 완화하려고합니다. &gt;100이 될 경우 심각한 문제의 징후입니다.
* shed는 헛간된 수신 요청의 수를 나타냅니다 (HTTP 오류 번호 503, 서비스 사용 불가) 메모리 사용은 이미 너무 높았습니다. 이상적으로, 요구는 헛간이어야 합니다. 몇 가지 요청이 헛된 경우 괜찮습니다. 그러나 많은 것이 헛된 경우 심각한 문제의 징후.
* 위험 경고 MemoryEmails - 메모리 사용이 위험한 경우,ERDDAP™이메일 주소로 이메일 보내기&lt;이메일Everything 으로 (설정에서.xml) 활성 사용자 요청의 목록으로. 이메일은 말한다, Chris에게이 이메일을 전달. 노아아의 존. gov 그래서 우리는 정보를 사용하여 미래의 버전의 향상ERDDAP·
     

이름 *ERDDAP™기억 스트레스:
* 서버의 메모리가 더 많은 것을 고려하십시오.ERDDAP™Tomcat의 변화[‐Xmx 메모리 설정](/docs/server-admin/deploy-install#memory)·
* 이미 많은 메모리로 할당 된 경우ERDDAP™-Xmx를 통해 서버에서 더 많은 메모리를 구입하십시오. 기억은 싸다 (새 서버의 가격 또는 시간에 비해) · 다음 증가 -Xmx.
* 내 계정datasets.xml, 세트&lt;nGridThreads&gt; 에 1, 세트&lt;nTableThreads&gt;에서 1, 그리고 세트&lt;ipAddressMaxRequestsActive&gt; 에 1.
* inefficient 또는 troublesome를 위한 log.txt에 있는 요구에 보십시오 (법적고지) 이름 * IP 주소 추가&lt;요청Blacklist&gt; 내 계정datasets.xml· 블랙리스트 오류 메시지는ERDDAP™관리자의 이메일 주소는 그 사용자가 사용할 수 있도록 연락 할 수 있도록 희망의 이메일 주소입니다.ERDDAP™더 효율적으로. 그것은 당신이 블랙리스트와 왜 IP 주소의 목록을 유지하는 것이 좋습니다, 그래서 당신은 그들이 접촉하는 경우에 사용자가 작동 할 수 있습니다.
* 악성 사용자의 요청에 대한 log.txt 요청을 봐. IP 주소 추가&lt;요청Blacklist&gt; 내 계정datasets.xml· 비슷한 요청이 여러 유사한 IP 주소에서 오는 경우, 당신은 어떤 who-is 서비스를 사용할 수 있습니다 (₢ 킹[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) 그 소스에서 IP 주소의 범위를 찾기 및 전체 범위를 블랙리스트. 보기 [&lt;requestBlacklist&gt; 문서 (/docs/server-admin/datasets#request블랙리스트) ·
         
#### 아웃OfMemoryError{#outofmemoryerror} 
설정할 때ERDDAP™, 당신은 메모리의 최대 금액을 지정Java사용 가능[\\-Xmx 설정](/docs/server-admin/deploy-install#memory)· 이름 *ERDDAP™그보다 더 많은 메모리를 필요로, 그것은 자바를 던질 것이다. 한국어 아웃 OfMemoryError.ERDDAP™오류가 우아하게 처리 할 수 있도록 많은 검사 (e.g., 이렇게 말썽some 요구는 실패할 것입니다, 그러나 체계는 그것의 무결성을 유지합니다) · 그러나 때때로, 오류 손상 시스템 무결성 당신은 다시 시작해야ERDDAP· 희망적으로, 그것은 드문다.

OutOfMemoryError에 빠르고 쉬운 해결책은 증가하는 것입니다[\\-Xmx 설정](/docs/server-admin/deploy-install#memory), 그러나 서버에서 물리적 메모리의 80 % 이상으로 -Xmx 설정을 늘리지 않아야합니다. (e.g., 10GB 서버를 위해, 8GB의 위 -Xmx를 놓지 마십시오) · 메모리는 상대적으로 저렴하므로 서버에서 메모리를 늘릴 수있는 좋은 옵션이 될 수 있습니다. 그러나 서버에서 메모리를 maxed 경우 또는 다른 이유로 그것을 증가 할 수 없습니다, 당신은 OutOfMemoryError의 원인이 더 직접 처리해야합니다.

당신이 본다면[로그.txt](#log)파일 보기ERDDAP™오류가 발생했을 때, 당신은 일반적으로 OutOfMemoryError의 원인으로 좋은 큐를 얻을 수 있습니다. 가능한 많은 원인이 있습니다.

* 단일 거대한 데이터 파일은 OutOfMemoryError, notably, 거대한 ASCII 데이터 파일을 일으킬 수 있습니다. 이 문제가 있다면, 그것은 분명해야ERDDAP™dataset를 로드하지 못합니다. (tabular datasets를 위해) 또는 그 파일에서 데이터를 읽으십시오 (gridded datasets를 위해) · 가능한 경우, 파일을 여러 파일로 분할하는 것입니다. 이상적으로, 당신은 논리 펑크로 파일을 분할 할 수 있습니다. 예를 들어, 파일이 데이터의 20 개월의 가치가있는 경우, 20 파일로 분할, 데이터의 1 개월의 값으로 각각. 그러나 주요 파일이 arbitrarily를 분할하더라도 이점이 있습니다. 이 접근법에는 여러 이점이 있습니다: a) 1/20로 데이터 파일을 읽는 데 필요한 메모리를 줄일 수 있으므로 한 번에 하나의 파일이 읽습니다. ₢ 킹 뚱 베어ERDDAP™요청을 처리 할 수 있기 때문에 그것은 단지 하나 또는 주어진 요청에 대한 데이터를 찾기 위해 몇 가지 파일에서 볼 수. (주) 데이터 수집이 진행되면 기존 20 파일이 변경되지 않을 수 있으며, 다음 달의 데이터가 데이터셋에 추가할 수 있도록 하나의 작은 새 파일을 수정해야 합니다.
* 하나의 거대한 요청은 OutOfMemoryError를 일으킬 수 있습니다. 특히, 일부orderBy옵션에는 두 번째 메모리의 전체 응답이 있습니다. (e.g., 정렬) · 응답이 거대하면 오류로 이어질 수 있습니다. 다양한 방법으로 항상 몇 가지 요청이 될 것입니다. -Xmx 설정 증가로 문제를 해결할 수 있습니다. 또는, 당신은 사용자가 더 작은 요청의 시리즈를 만들 수 있습니다.
* 파일의 큰 숫자가 파일 색인을 일으킬 수 있음과는 달리ERDDAP™그 파일이 오류를 일으킬 수 있도록 만들 수 있습니다. 각 파일이 300 바이트를 사용한다고 가정하면 1,000,000 파일이 300MB를 차지합니다. 그러나 데이터 파일의 거대한 수를 가진 datasets는 다른 문제를 일으키는 원인이 됩니다ERDDAP, 확실히, 그것은 오랫동안 가지고ERDDAP™데이터에 대한 사용자 요청에 응답 할 때 모든 데이터 파일을 엽니 다. 이 경우, 솔루션은 몇 가지 데이터 파일이 있기 때문에 파일을 집계 할 수 있습니다. tabular datasets의 경우 현재 dataset에서 데이터를 저장하면 종종 훌륭합니다.[사이트맵 분리된 표본 추출 Geometries (사이트맵) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array 데이터 파일 (이름 *.ncCF 파일ERDDAP) 그리고 그 후에 새로운 dataset를 만듭니다. 이 파일은 매우 효율적으로 처리 할 수 있습니다.ERDDAP이름 *[EDDTableNcCFFiles에서](/docs/server-admin/datasets#eddtablefromnccffiles)· 로그인한 경우 (각 공간과 시간의 펑크에 대한 데이터) ·ERDDAP™데이터를 신속하게 추출할 수 있습니다.
* 사용중인 tabular datasets에 대해 [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables의 경우) 특성,ERDDAP™그 변수의 값의 독특한 조합의 테이블을 만든다. 거대한 datasets를 위해 또는 때&lt;subsetVariables&gt; misconfigured, 이 테이블은 OutOfMemoryErrors를 일으킬 충분히 큰 수 있습니다. 이 솔루션은 목록에서 변수를 제거하는 것입니다.&lt;subsetVariables&gt; 큰 수의 값이 있거나 테이블의 크기가 합리적 때까지 필요한 변수를 제거하십시오. 부품의ERDDAP™즉,subsetVariables시스템은 잘 작동하지 않습니다. (e.g., 웹 페이지로드 매우 천천히) 그 테이블에 100,000 개 이상의 행이있을 때.
* 몇 가지 동시 큰 요청이 가능 (정말 바쁜ERDDAP) 메모리 문제를 일으킬 수 있습니다. 예를 들어, 8 요청, 각각 1GB를 사용하여 -Xmx=8GB 설정에 대한 문제를 일으킬 것입니다. 그러나 각 요청이 동시에 메모리 사용의 피크에있을 것입니다. 그리고 당신은 쉽게 볼 수 있습니다.ERDDAP™큰 요청에 정말 바쁜. 그러나,그것은 가능합니다. -Xmx 설정 증가에 의해 다른이 문제를 처리하는 것은 어렵습니다.
* 다른 시나리오가 있습니다. 당신이 본다면[로그.txt](#log)파일 보기ERDDAP™오류가 발생했을 때, 당신은 일반적으로 원인에 좋은 큐를 얻을 수 있습니다. 대부분의 경우, 그 문제를 최소화하는 방법이 있습니다. (더 보기) , 그러나 때때로 당신은 더 많은 메모리와 더 높은 - Xmx 설정이 필요합니다.
         
### 너무 많은 오픈 파일{#too-many-open-files} 
시작하기ERDDAP™v2.12의ERDDAP™열린 파일의 수를 모니터링하는 시스템 (소켓과 다른 것들을 포함, 그냥 파일) Linux 컴퓨터에서 Tomcat에서. 어떤 파일이 실수로 닫지 않는 경우 ("자료 누출") , 열려있는 파일의 수는 운영 체계에 의해 허용된 최대를 초과할 때까지 증가할지도 모르고 수많은 진짜로 나쁜 일 일어났습니다. 이제 Linux 컴퓨터에서 (정보는 Windows에서 사용할 수 없습니다.) ::

* status.html 웹 페이지의 오른쪽에 "Open Files"열이 있습니다. Windows에서 "?"를 보여줍니다.
* 시간 :ERDDAP™각 주요 데이터셋 리로드의 끝에서 정보를 생성하면 로그에 인쇄됩니다. txt 파일:
오픈FileCount= *현재 위치* max=의 *최대.* % = *%의 %* 
* 비율이 &gt;50%인 경우에, 이메일은 보내집니다ERDDAP™관리자 및 이메일 모든 것 이메일 주소

비율이 100%인 경우에,ERDDAP™끔찍한 문제입니다. 이 일이 일어나지 마십시오.
비율이 &gt;75%인 경우에,ERDDAP™끔찍한 문제입니다. 그게 괜찮아.
비율이 &gt;50%인 경우에, 스파이크가 100을 명중하는 비율을 일으키는 것이 매우 가능하다.
백분율이 이제 &gt;50%인 경우:
* 허용된 파일의 최대 수를 증가:
    * tomcat 시작하기 전에 이 변경 사항을 작성하십시오. (Tomcat Startup.sh 파일에 넣어?) ::
ulimit -Hn 16384년
ulimit -Sn 16384의
    * 또는 편집하여 영구적인 변경 (으로 root) /etc/security/limits.conf와 줄을 추가:
tomcat 소프트 nofile 16384
tomcat 단단한 nofile 16384
그 명령은 Tomcat을 실행하는 사용자가 "tomcat"라고 가정합니다.
많은 Linux 변형에서 서버가 변경 사항을 적용하도록 재시작해야 합니다. 두 옵션의 경우 위의 "16384"은 예입니다. 당신은 당신이 생각하는 숫자를 선택합니다.
* 여행 정보ERDDAP· 운영 체제는 열려있는 파일을 닫을 것입니다.
         
### 실패 요청{#failed-requests} 
*    **비정상적인 활동: &gt;25% 요청의 실패**   
각 reloadDatasets의 부분으로, 일반적으로 매 15 분,ERDDAP™마지막 reloadDatasets 이후 실패한 요청의 비율로 보입니다. &gt;25%인 경우,ERDDAP™이메일 보내기ERDDAP™"보통 활동 :&gt;25% 요청이 실패했습니다. 이 이메일에는 "Requester's IP Address가 있습니다. (뚱 베어)   (마지막 주요 LoadDatasets부터) · 그 결과 가장 실패한 요청을 만드는 컴퓨터의 IP 주소를 알려줍니다. 그런 IP 주소를 검색할 수 있습니다.\\[큰Parent감독\\]/로그 /[로그.txt](#log)파일과 그들이 만드는 요청의 종류를 볼 수 있습니다.
    
사용자의 IP 번호를 사용할 수 있습니다 (예를 들어,[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) 누구 또는 사용자가 누구인지 파악하려고합니다. 때로는 사용자가 꽤 정확하게 말할 것입니다. (e.g., 검색 엔진의 웹 크롤러) · 대부분의 시간 그것 다만 gives 당신 a clue (e.g., 그것은 amazonaws 컴퓨터, 그것은 일부 대학에서, 그것은 일부 특정 도시에 누군가입니다) ·
    
실제 요청에 따라 IP 번호 및 오류 메시지 (모두에서[로그.txt](#log)) 일련의 오류를 위해, 당신은 일반적으로 잘못되는 것을 기본적으로 파악할 수 있습니다. 내 경험에서 실패한 요청의 4 가지 일반적인 원인이 있습니다.
    
1) 요청은 악의 (e.g., 보안 약점을 찾고, 또는 요청을 작성하고 완료하기 전에 취소) · 자주 묻는 질문&lt;요청Blacklist&gt; 내 계정datasets.xmlto blacklist 그 IP 주소.
    
2) 검색 엔진은 naively에 나열된 URL을 시도ERDDAP™웹 페이지 및 ISO 19115 문서. 예를 들어,베이스를 나열하는 많은 장소가 있습니다.OPeNDAPURL, 예를 들면, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , 사용자가 파일 유형을 추가해야 (예, .das, .dds, 사이트맵) · 그러나 검색 엔진은 이것을 모른다. 기본 URL에 대한 요청은 실패합니다. 관련 상황은 검색 엔진이 bizarre 요청을 생성하거나 "숨겨진"웹 페이지로 얻기 위해 양식을 작성하는 것입니다. 그러나 검색 엔진은 종종 나쁜 일을 수행, 실패를 선도. 해결책은: 창조합니다[로봇.txt](#robotstxt)파일.
    
3) 몇몇 사용자는 거기 없는 무언가를 위해 반복적으로 요구한 스크립트를 실행하고 있습니다. 아마도 존재에 사용되는 데이터 세트이지만 지금은 사라 (일시적으로 또는 영구적으로) · Scripts는 종종 이것을 기대하지 않으며 지능적으로 취급하지 않습니다. 그래서 스크립트는 요청을 유지하고 요청은 실패합니다. 사용자가 누구인지 추측할 수 있다면 (위의 IP 번호에서) , 그(것)들을 접촉하고 dataset는 더 이상 유효하지 않으며 그들의 스크립트를 바꾸기 위하여 그(것)들을 요구하지 않습니다.
    
4) 무언가는 몇몇 dataset와 진짜로 잘못됩니다. 보통,ERDDAP™잘못된 dataset inactive를 만들 것입니다. 때때로 그것은하지 않습니다, 그래서 모든 요청은 그냥 오류로 이어. 그래서, dataset 또는 문제 수정 (당신이 할 수없는 경우) dataset 설정[활동 = false](/docs/server-admin/datasets#active)· 물론, 이것은 문제 #2로 이어질 수 있습니다.
    
때로는 오류가 너무 나쁘지 않습니다. 그렇지 않으면ERDDAP™오류를 감지하고 신속하게 대응할 수 있습니다 (&lt;1ms). 그래서 당신은 아무런 행동을 결정할 수 있습니다.
    
다른 모든 것이 실패하면 범용 솔루션이 있습니다. 사용자의 IP 번호를 [&lt;요청블랙리스트&gt;] (/docs/server-admin/datasets#request블랙리스트) · 이것은 나쁜 것 같지 않습니다 또는 그것이 보이는 것처럼 옵션. 사용자는 오류 메시지가 s/he가 blacklisted 되었으므로 알려줍니다. (이름 *ERDDAP™관리자의) 이메일 주소 때때로 사용자는 당신에게 연락하고 당신은 문제를 해결할 수 있습니다. 때때로 사용자는 당신에게 연락하지 않으며 다른 IP 번호에서 오는 정확한 동일한 행동을 다음 날 볼 수 있습니다. 블랙리스트 새로운 IP 번호와 그들이 결국 메시지를 얻을 희망. (또는 이것은 당신이 결코 탈출하지 않을 것에서 당신의 Groundhog 일입니다. 사이트 맵) 
    
### 로봇.txt{#robotstxt} 
검색 엔진 회사 사용 웹 크롤러 (예, Google 봇) 웹상의 모든 페이지를 검사하여 검색 엔진에 내용을 추가합니다. 제품 정보ERDDAP™, 그것은 기본적으로 좋습니다.ERDDAP™페이지 사이에 많은 링크가 있으므로 크롤러는 웹 페이지의 모든 것을 찾을 수 있으며 검색 엔진에 추가합니다. 그런 다음 검색 엔진의 사용자는 데이터셋을 찾을 수 있습니다.ERDDAP·
    
불행히도, 몇몇 웹 크롤러 (예, Google 봇) 이제 추가 콘텐츠를 찾기 위해 양식을 작성하고 제출합니다. 웹 상거래 사이트를 위해, 이것은 훌륭합니다. 그러나 이것은 끔찍한ERDDAP™그냥 지도 하기 때문에 **이름 *** 실제 데이터를 크롤러 및 pointless 시도의 수. 이 모든 다른 사용자보다 데이터를 더 많은 요청으로 이어질 수 있습니다. 그리고 그것은 검색 엔진을 goofy, 실제 데이터의 pointless subsets.
    
웹 크롤러가 양식을 작성 중지하고 일반적으로 웹 페이지를보고하지 않는 웹 페이지를보고, 당신은 호출 된 텍스트 파일을 만들 필요가[로봇.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)웹 사이트의 문서 hierarchy의 루트 디렉토리에서 누군가에 의해 볼 수 있도록, 예를 들어, http://*www.your.domain*/robots.txt ·
새로운 로봇을 만드는 경우. txt 파일, 이것은 좋은 시작:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (그러나 교체 *당신의.institutions.url* 너와 함께ERDDAP기본 URL.)   
검색 엔진에 대한 며칠이 걸릴 수 있습니다.
     
### 사이트 맵.xml{#sitemapxml} 
이름 *[ https://www.sitemaps.org ](https://www.sitemaps.org/)웹 사이트 말한다:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

실제로, 이후ERDDAP™이름 *RESTful, 검색 엔진 거미 쉽게 당신의 크롤러ERDDAP· 그러나 그들은 더 자주하는 경향이 (매일&#33;) 지원하다 (월?) ·

* 각 검색 엔진이 전체를 칠 수 있음을 알려줍니다.ERDDAP™매일, 이것은 많은 불필요한 요구에 지도할 수 있습니다.
* 이름 *ERDDAP™sitemap.xml 파일을 생성ERDDAP™검색 엔진을 알려줍니다.ERDDAP™한 달에 crawled만 필요.
* 참고사항을 추가해야 합니다.ERDDAP's sitemap.xml 당신의[로봇.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)파일 :
이름: http://**www.yoursite.org**/erddap/sitemap.xml
 
* 크롤러에 메시지를 얻지 못하면 sitemap.xml 파일에 대한 다양한 검색 엔진을 말할 수 있습니다. (하지만 변경 **계정 관리** 기관의 약어 또는 약어와 **웹사이트: www.yoursite.org** 내 계정ERDDAPURL을) ::
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I 생각) 당신은 한 번 각 검색 엔진을 ping해야합니다, 모든 시간. 검색 엔진은 다음 사이트 맵.xml의 변경 사항을 감지합니다.
     
### Data Dissemination / 데이터 배포 네트워크:Push이름 *Pull기술 정보{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* 일반적으로,ERDDAP™상호 작용: 그것은 사용자에서 요구가 걸립니다; 먼 자료 근원에서 자료를 얻으십시오; 자료를 새롭게 하십시오; 그리고 사용자에게 보냅니다.
*   [Pull기술 정보](https://en.wikipedia.org/wiki/Pull_technology)::ERDDAP™또한 원격 데이터 소스에서 사용 가능한 모든 데이터를 적극적으로 얻을 수있는 능력이 있습니다.[데이터의 로컬 복사본을 저장](/docs/server-admin/datasets#eddgridcopy)·
*   [Push기술 정보](https://en.wikipedia.org/wiki/Push_technology):: 이용안내ERDDAP이름 *[구독 서비스](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), 다른 자료 서버는 새로운 자료가 유효한 것처럼 곧 통지될 수 있습니다 그래서 그들은 자료를 요청할 수 있습니다 (데이터 당기기) ·
*   ERDDAP이름 *[EDDGrid언어: en](/docs/server-admin/datasets#eddfromerddap)이름 *[EDDTableErddap에서](/docs/server-admin/datasets#eddfromerddap)제품 정보ERDDAP구독 서비스 및[주력 시스템](#flag)그래서 새로운 데이터가 사용할 때 즉시 통지됩니다.
* 당신은 중대한 효력에 이 결합할 수 있습니다: 당신이 포장하는 경우에EDDGrid자주 묻는 질문EDDGrid보낸 사람Erddap dataset (또는 EDDTableCopy를 EDDTableFromErddap dataset에 감싸기) ·ERDDAP™자동적으로 창조하고 다른 지역의 사본을 유지합니다ERDDAP데이터셋
* 새로운 데이터가 사용할 수 있기 때문에 구독 서비스가 작동하기 때문에 푸시 기술이 데이터가 매우 빠르게 중단합니다. (초 안에) ·

이 건축은 각을 뒀습니다ERDDAP™관리자는 자신의 / 그에 대한 데이터를 결정ERDDAP™에 의해

* 이름 *ERDDAP™관리자는 동일 할 수 있습니다. 관리자 간의 조정이 필요 없습니다.
* 이름 *ERDDAP™관리자는 서로의 링크ERDDAPs의 자료 배급 네트워크는 형성됩니다.
* Data는 신속하고 효율적이며, 데이터 소스에서 자동으로 비활성화됩니다. (ERDDAPs 및 기타 서버) 데이터 redistribution 사이트 (ERDDAP₢ 킹) 네트워크에서 어디.
* 이름 *ERDDAP™몇몇 datasets를 위한 자료의 근원과 다른 datasets를 위한 redistribution 위치일 수 있습니다.
* 결과 네트워크는 데이터 배포 네트워크와 비슷합니다.[Unidata의 IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), 그러나 단단하게 구조되는 더 적은.
         
### 보안, 인증 및 권한{#security-authentication-and-authorization} 
기본적으로,ERDDAP™완전히 공용 서버로 실행 (이름 *http및/또는https) 로그인 없음 ([인증 및 인증](https://en.wikipedia.org/wiki/Authentication)) 시스템 및 데이터 액세스 제한 없음 ([이름 *](https://en.wikipedia.org/wiki/Authorization)) ·

#### 보안 보안{#security} 
일부 또는 모든 데이터 세트에 대한 액세스를 제한하려면, 당신은 사용할 수 있습니다ERDDAP보안시스템 구축 보안 시스템은 사용할 때:

*   ERDDAP™제품정보[역할 기반 액세스 제어](https://en.wikipedia.org/wiki/Role-based_access_control)·
    * 더 보기ERDDAP™관리자는 사용자를 정의 [&lt;사용자&gt; (/docs/server-admin/datasets#user) 태그 :datasets.xml· 각 사용자에는 사용자 이름, 비밀번호가 있습니다. (인증=custom) , 그리고 하나 이상의 역할.
    * 더 보기ERDDAP™관리자는 역할이 주어진 dataset에 접근하는 것을 정의한다 [&lt;접속하다&gt;] (/docs/server-admin/datasets#accessibleto) 태그 :datasets.xml어떤 dataset에 대 한 공공 액세스 하지.
* 사용자의 로그인 상태 (로그인/아웃) 웹 페이지 상단에 표시됩니다. (그러나 로그인한 사용자는ERDDAP™그가 사용하는 경우 로그인하지 않아httpURL.) 
* 만약에&lt;baseUrl&gt; 당신은 setup.xml에 지정하는 **http** URL, 로그인하지 않은 사용자는 사용할 수 있습니다.ERDDAP이름 * **http** URL. 이름 *&lt;BaseHttpsUrl&gt;도 지정되어 있지 않은 사용자도 사용할 수 있습니다.httpsURL.
* HTTPS 만 -- 이름 *&lt;baseUrl&gt; 당신은 setup.xml에 지정하는 **https** URL, 로그인하지 않은 사용자는 격려 (힘없는) 제품정보ERDDAP이름 * **https** URL -- 링크의 모든ERDDAP™웹 페이지는httpsURL.
    
사용자가 사용하는 경우httpsURL, Redirect 영구 라인 추가&lt;VirtualHost \\*:80&gt; Apache의 설정 파일 섹션 ((주)http사이트맵) , 예를들면
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

원하는 경우, 추가 방법이 있습니다.https: [HTTP 엄격한 운송 보안 (사이트맵) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)· 그것을 사용하는:
    
    1. 아파치 헤더 모듈을 사용: a2enmod headers
    2. 추가 헤더를 HTTPS VirtualHost 지시어에 추가한다. Max-age는 초에서 측정되고 몇몇 긴 가치로 놓일 수 있습니다.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
이 헤더는 HTTPS VirtualHost에서만 유효합니다.
    
사용자를 강제하지 않는 이유httpsURL은 다음과 같습니다. SSL/TLS 링크는 설정할 시간이 소요되며 사용자가 서버간에 전송된 모든 정보를 암호화하고 해독할 수 있습니다. 그러나 몇몇 기관은 요구합니다https이름 *
    
* MUST 사용 로그인ERDDAP이름 * **https** URL. 그들이 사용하는 경우httpURL, 그들은 나타납니다ERDDAP™로그인하지 않습니다. 이 통신의 개인 정보를 보장하고 예방[세션 납치 및 sidejacking](https://en.wikipedia.org/wiki/Session_hijacking)·
* 로그인하지 않은 사람은 공공 데이터셋을 이용할 수 있습니다. 기본적으로, private datasets는 사용자가 로그인하지 않는 경우 datasets 목록에서 나타나지 않습니다. 관리자가 setup.xml의 설정이있는 경우&lt;listPrivateDatasets&gt; 진정한, 그들은 나타납니다. 개인 데이터셋에서 데이터 요청하기 (사용자가 URL을 알고 있다면) 로그인 페이지로 이동합니다.
* 로그인 한 사람은 공개 데이터셋과 모든 개인 데이터셋에서 데이터를 볼 수 있고 요청할 수 있습니다. 기본적으로, 사용자가 접근하지 않은 개인 데이터셋은 datasets 목록에서 나타나지 않습니다. 관리자가 setup.xml의 설정이있는 경우&lt;listPrivateDatasets&gt; 진정한, 그들은 나타납니다. 사용자가 로그인 페이지로 이동할 수 없는 개인 데이터셋에서 데이터를 요청할 수 있습니다.
* 더 보기RSS완전히 개인 데이터 세트에 대한 정보는 사용자에게만 제공됩니다. (이름 *RSS관련 기사) 로그인 및 권한이 있는 경우 dataset. 이것은RSS완전히 개인 데이터셋에 매우 유용합니다.
    
dataset이 개인이지만 그 [&lt;그래프AccessibleTo&gt; (/docs/server-admin/datasets#graphsaccessibleto) dataset의 설정RSS누구에게도 접근할 수 있습니다.
    
* 이메일 구독은 사용자가 dataset에 액세스 할 때만 설정할 수 있습니다. 사용자가 개인 데이터 세트에 가입하면, 사용자는 로그인 한 후 계속 기능합니다.

##### 보안 설정{#setup-security} 
security/authentication/authorization 체계를 설치하십시오:

* 표준을ERDDAP™ [초기 설정](/docs/server-admin/deploy-install)·
* 내 계정[설정.xml](/docs/server-admin/deploy-install#setupxml)·
    * 추가/변경&lt;인증&gt; custom에 아무것도에서 가치 (이것을 사용하지 마십시오) , 이메일 (이것을 사용하지 마십시오) , 구글 ((주)) , 구두 ((주)) , 또는 oauth2 (google+orcid인 경우) · 아래의 옵션에 대한 의견보기.
    * 추가/변경&lt;baseHttpsUrl&gt; 값입니다.
    * 삽입/uncomment&loginInfo;내 계정&lt;startBodyHtml&gt;는 각 웹 페이지 상단의 사용자 로그 / 아웃 정보를 표시합니다.
* 개인 컴퓨터에서 테스트 목적으로,[SSL을 지원하는 tomcat을 구성하는 이러한 지침을 따르십시오.](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (기본 정보https연결하기) keystore 만들기[자기 위탁 증명서](https://en.wikipedia.org/wiki/Self-signed_certificate)그리고 수정 *뚱 베어* /conf/server.xml 포트 8443에 대한 커넥터를 구성합니다. Windows에서 "c:\\Users\\\\\에서 .keystore를 이동해야 할 수도 있습니다. *이름 ** \\.keystore" 에 "c:\\Users\\Default User\\.keystore" 또는 "c:\\.keystore" (이름 * *뚱 베어* /logs/카탈리나. *오늘* .log if the application doesn't load or users can't see the log in 페이지) · .keystore 인증서가 로그인 할 때 인증서를 시험하여 만료 될 수 있습니다.
    
자체 서명 된 인증서를 사용하는 대신 공공 액세스 서버의 경우, 그것은 당신이 구입하고 서명 한 인증서를 설치하는 것이 좋습니다[인증 기관](https://en.wikipedia.org/wiki/Certificate_authority), 그것은 당신의 클라이언트에게 진실한 당신에 연결되는 더 보증을 주기 때문에ERDDAP™, 당신의 남자에서 --middle의 버전ERDDAP· 많은 공급 업체는 디지털 인증서를 판매합니다. (웹 검색.) 그들은 비싸지 않습니다.
    
* Linux 컴퓨터에서 Tomcat이 Apache에서 실행되면 /etc/를 수정합니다.httpd/conf.d/ssl.conf 파일을 사용하여 HTTPS 트래픽을/from로 허용ERDDAP™필요 없이: URL에 있는 8443 항구 수:
    1. 현재 수정&lt;VirtualHost&gt; 태그 (그대는) , 또는 파일의 끝에서 하나를 추가 그래서 적어도이 줄을 가지고:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. 그런 다음 아파치를 다시 시작: /usr/sbin/apachectl -k 우아한 (하지만 때로는 다른 디렉토리에) ·
* 내 계정 *뚱 베어* /conf/server.xml, 포트 = 8443을 uncomment&lt;connector&gt; 꼬리표:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
인증서KeystoreFile의 위치를 변경합니다.
##### 이름 *{#authorization} 
*   [내 계정datasets.xml, 만들기](#authorization)[기타]&lt;사용자&gt; (/docs/server-admin/datasets#user) 사용자 이름, 비밀번호로 각 사용자에 대한 태그 (if authorization=custom) , 그리고 역할 정보. 이것은 허가의 일부입니다ERDDAP보안 시스템
     
* 내 계정datasets.xml, 추가 [&lt;접속하다&gt;] (/docs/server-admin/datasets#accessibleto) 각 dataset에 태그는 공개 액세스가 없습니다.&lt;accessTo&gt;는 해당 dataset에 접근할 수 있는 역할을 지정할 수 있습니다.
     
* 레퍼런스 Tomcat 트러블? Tomcat 로그를 확인하십시오.
     
* 당신의 일을 체크&#33; 모든 실수는 보안 결함으로 이어질 수 있습니다.
     
* 로그인 페이지를 확인https  (아니다.http) · 로그인하기http자주 묻는 질문https항구 8443 (포트 번호가 Apache 프록시를 통해 숨길 수 있지만) · 네트워크 관리자와 협력하여 서버에서 포트 8443에 액세스 할 수있는 외부 웹 요청을 허용해야합니다.
     
* 변경할 수 있습니다.&lt;사용자&gt; 및&lt;언제든지 accessTo&gt; 태그. 변경사항은 데이터셋의 다음 일정한 재부하에 적용되며, 사용시 ASAP[기본 정보](#flag)·

##### 회사연혁{#authentication} 
[ **회사연혁 (로그인) ** ](#authentication)  
로그인할 수 없는 경우 로그인할 수 없습니다.&lt;setup.xml의 인증&gt;.
사용자가 로그인 할 수 있도록하려면 값을 지정해야 합니다.&lt;인증&gt;. 현재,ERDDAP™지원하다
[사용자 정의](#custom)  (이것을 사용하지 마십시오) ·
[이름 *](#email)  (이것을 사용하지 마십시오) ·
[구글 +](#google)  ((주)) ·
[이름 *](#orcid)  ((주)) ·
[오우스2](#oauth2)  ((주)) 인증방법
로그인을 활성화하려면 Google, orcid 또는 oauth2 옵션을 권장합니다. 사용자의 암호를 저장하고 처리하기 때문에 (주문에 필요한) 이메일 옵션보다 더 안전합니다. 사용자가 다른 사이트에서 동일한 암호를 사용하는 것을 기억하십시오. 그래서 그들은 당신의 동일한 암호를 사용할 수 있습니다ERDDAP™그들은 은행에서. 그것은 그들의 암호를 매우 귀중하게 만듭니다 -- 그들이 요청하는 다만 자료 보다는 사용자에게 훨씬 더 가치. 그래서 당신은 암호를 개인을 유지하기 위해 할 수만큼해야. 그것은 큰 책임입니다. 이메일, Google, orcid 및 oauth2 옵션은 암호를 돌봐, 그래서 당신은 수집 할 필요가 없습니다, 저장, 또는 그들과 함께 작업. 그래서 당신은 그 책임에서 자유롭습니다.

모든 것&lt;authentication&gt; 옵션 사용[제품정보](https://en.wikipedia.org/wiki/HTTP_cookie)사용자의 컴퓨터에서 사용자의 브라우저는 쿠키를 허용하도록 설정해야합니다. 사용자가 만드는 경우ERDDAP™컴퓨터 프로그램에서 요청 (이름 *) , 쿠키 및 인증은 함께 일하기 어렵습니다. 그것은 모든 인증 시스템과 일반적인 문제입니다. 사이트 맵

의 세부 사항&lt;인증&gt; 옵션은:

###### 제품 정보{#custom} 
사용자 정의ERDDAP사용자 이름과 비밀번호에 입력하여 사용자 로그인을 위한 사용자 정의 시스템. 사용자가 3 시간 이내에 로그인하고 실패하면 사용자는 10 분 동안 로그인하려고 차단됩니다. 이것은 단지 수백만의 암호를 시도에서 해커를 방지하여 올바른 것을 찾을 수 있습니다.

사용자 이름과 비밀번호가 전송되기 때문에 다소 안전합니다.https  (아니다.http) , 하지만 인증=google, orcid, 또는 oauth2는 암호를 처리하기 위해 무료 때문에 더 나은. 사용자의 이름과 비밀번호의 혼동을 수집해야 합니다. (휴대폰 사용&#33; 이메일은 안전하지 않습니다&#33;) 그들을 저장datasets.xml에서 [&lt;사용자&gt; (/docs/server-admin/datasets#user) 태그.

사용자 정의 옵션으로, 아무도 당신까지 로그인 할 수 없습니다 (이름 *ERDDAP™관련 기사) 더 보기&lt;user&gt; tag for user, user's name as the user, the hash digest of their password as the password, 그리고 그들의 역할.

이름 *
사용자의 비밀번호의 해체를 생성하고 전달하는 awkwardness 때문에 관련 위험 때문에ERDDAP™암호의 해체를 들고,이 옵션은 권장되지 않습니다.

이 선택권의 안전을 증가시키기 위하여:

* 서버에서 다른 사용자를 확인해야 합니다. (i.e., 리눅스 사용자, 아니ERDDAP™이름 *) Tomcat 디렉토리에 파일을 읽을 수 없습니다. (특히,datasets.xml이름 *) 또는ERDDAP의 bigParentDirectory.
Linux에서 user=tomcat, 사용:
프로젝트 *큰Parent감독*   
프로젝트 *큰Parent감독*   
프로젝트 *tomcat감독*   
프로젝트 *tomcat감독*   
     
* UEPSHA256 사용&lt;setup.xml의 passwordEncoding&gt;.
     
* 사용자의 비밀번호의 해체를 전달하기 위한 as-secure-as-possible 메소드를 사용하십시오.ERDDAP™관련 기사 (전화?) ·
         
###### 이름 *{#email} 
이메일 인증 옵션은 사용자의 이메일 계정을 사용하여 사용자 인증 (로그인하려면 로그인해야 하는 특별한 링크로 이메일을 보내) · 다른 이메일과는 달리ERDDAP™전송,ERDDAP™기밀 정보를 포함하기 때문에 이메일 로그 파일에 이러한 초대 이메일을 작성하지 않습니다.
이론에서, 이것은 매우 안전하지 않습니다, 이메일은 항상 암호화되지 않기 때문에, 그래서 이메일이 유효 사용자의 이메일 주소를 사용하여이 시스템을 학대 할 수있는 능력을 가진 나쁜 녀석은 초대 이메일을 가로 질러 초대합니다.
연습에서 설정하면ERDDAP™Google 이메일 계정을 사용하여 이메일을 보내려면 연결을위한 TLS 옵션 중 하나를 사용하기 위해 설정 한 경우 사용자는 Google 이메일 계정이있는 경우 이메일이 암호화되기 때문에 다소 안전합니다.ERDDAP™사용자에.

이 선택권의 안전을 증가시키기 위하여:

* 서버에서 다른 사용자가 확인 (i.e., 리눅스 사용자, 아니ERDDAP™이름 *) Tomcat 디렉토리에 파일을 읽을 수 없거나ERDDAP의 bigParentDirectory.
Linux에서 user=tomcat, 사용:
프로젝트 *큰Parent감독*   
프로젝트 *큰Parent감독*   
프로젝트 *tomcat감독*   
프로젝트 *tomcat감독*   
     
* 이메일에 대한 엔드 투 엔드 보안을 설정ERDDAP™사용자에. 예를 들어, Google-centric 시스템을 만들 수 있습니다.&lt;user&gt; 태그 Google 관리 이메일 주소 및 설정하여ERDDAP™보안/TLS 연결을 통해 Google 이메일 서버를 사용하려면: setup.xml에서, e.g를 사용합니다.
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

이름 *
이메일 인증 옵션은 권장되지 않습니다. 대신 Google, orcid 또는 oauth2 옵션을 사용하십시오.

Google, orcid 및 oauth2 옵션과 마찬가지로 이메일은 매우 편리합니다.ERDDAP™관리자 -- 암호 또는 해시 다이제스트를 처리 할 필요가 없습니다. 당신이 창조해야 할 모든 것은 [&lt;사용자&gt; (/docs/server-admin/datasets#user) 사용자를 위한 태그datasets.xml사용자의 이메일 주소입니다.ERDDAP™사용자 이름으로 사용합니다. (인증=email, google, orcid, 또는 oauth2를 사용할 때 암호 속성이 사용되지 않습니다.) 

이메일 옵션으로, 오직 사용자가 있습니다.&lt;user&gt; 태그datasets.xml로그인할 수 있습니다.ERDDAP™이메일 주소를 제공 하 고 이메일에 링크 클릭ERDDAP™그들을 보내라.

ERDDAP™Case-insensitive로 이메일 주소를 치료합니다. 입력된 이메일 주소를 변환하여 이 작업을 수행합니다.&lt;user&gt; 태그) 또는 사용자 입력 (로그인 양식) 그들의 모든 Lowercase 버전에.

인증 = 이메일 설정:

1. setup.xml에서, 변경&lt;baseHttpsUrl&gt; 태그의 값.
개인 컴퓨터에 실험/작업
     https://localhost:8443   
당신의 대중ERDDAP™, 사용
     https://*your.domain.org*:8443   
또는 아파치를 사용하는 경우 : 8443[프록시](/docs/server-admin/deploy-install#proxypass)포트 번호가 필요하지 않습니다.
     
2. setup.xml에서, 변경&lt;인증&gt; 태그의 이메일 값:
```
    <authentication>email</authentication>  
```

3. setup.xml에서 이메일 시스템이 모든 것을 통해 설정되도록하십시오.&lt;email...&gt; 태그 등ERDDAP™이메일을 보낼 수 있습니다. 가능한 경우, 보안 연결을 사용하려면 (사이트맵) 이메일 서버로.
     
4. 내 계정datasets.xml, 생성 [&lt;사용자&gt; (/docs/server-admin/datasets#user) 개인 데이터셋에 접근할 수 있는 각 사용자를 위한 태그.
사용자의 이메일 주소를 태그의 사용자 이름으로 사용하십시오.
user tag에 비밀번호 속성을 지정하지 마십시오.
     
5. 여행 정보ERDDAP™그래서 setup.xml의 변경 사항과datasets.xml효력.
         
###### Google, 오스틴, oauth2{#google-orcid-oauth2} 
*   [ **구글 +** ](#google)·[ **이름 *** ](#orcid)·[ **오우스2** ](#oauth2)   ((주))   
이 옵션의 모든 세가 권장됩니다.ERDDAP™인증 옵션. 그들은 모든 가장 안전한 옵션입니다. 다른 옵션은 크게 약한 보안이 있습니다.
     
###### 구글 +{#google} 
* Google 인증 옵션 사용[이름 * Google에서](https://developers.google.com/identity/gsi/web/guides/overview), 이는 구현의[OAuth 2.0 인증 프로토콜](https://oauth.net/2/)·ERDDAP™사용자는 Google 관리 계정 등 Google 이메일 계정으로 로그인합니다.@noaa.gov계정. 이 허용ERDDAP™사용자의 정체성을 확인 (이름 및 이메일 주소) 그리고 프로필 이미지에 액세스, 하지만 포기 하지 않습니다ERDDAP™그들의 이메일, 그들의 Google 드라이브, 또는 다른 어떤 개인 정보에 접근.
    
제품 정보ERDDAP™v2.22 이하,ERDDAP™"Google Sign-In" 사용 Google은 3 월 31, 2023 이후의 시스템을 감안했다고 말합니다. 이미 수행하지 않은 경우, 스위치를ERDDAP™v2.23+를 사용하여 새로운 "Sign In with Google" 기반 인증 시스템.
    
제품 정보ERDDAP™v2.23 인스턴스와 Content-Security-Policy 구성 및 Google 인증 사용, 당신은 추가 해야 https://accounts.google.com 허용되는 script-src의 목록으로 (또는 스크립트-src-elem) ·ERDDAP™더 이상 사용 https://apis.google.com , 당신이 허용 한 경우, 당신은 지금 제거 할 수 있습니다.
    
제품 정보ERDDAP™v2.24+ 당신은 또한 추가할 필요가 있을지도 모릅니다 https://accounts.google.com/gsi/style stlye-src에 https://accounts.google.com/gsi/ 연결 src. script-src의 경우 이제 사용할 수 있습니다. https://accounts.google.com/gsi/client.
 
    
더 많은 정보를 원하시면[Google 페이지](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP 구성에 대해. 질문이 있으시면, noaaa.gov에서 chris.john에게 연락하십시오.
         
###### 이름 *{#orcid} 
* orcid 인증 옵션 사용[Orcid 인증](https://members.orcid.org/api/integrate/orcid-sign-in), 이는 구현의[OAuth 2.0 인증 프로토콜](https://oauth.net/2/)·ERDDAP™사용자 로그인[Orcid 계정](https://members.orcid.org/api/integrate/orcid-sign-in)연구원에 의해 통용되는 연구원은 스스로 식별합니다. 이 허용ERDDAP™사용자의 오용 정체성을 확인하고 오용 계정 번호를 얻을 수 있지만, 제공하지 않습니다.ERDDAP™다른 Orcid 계정 정보에 접근.

###### 오우스2{#oauth2} 
* oauth2 옵션은 사용자가 Google 계정 또는 Orcid 계정으로 로그인 할 수 있습니다.

Google, orcid 및 oauth2 옵션은 openid 옵션에 대한 승계입니다.ERDDAP™버전 1.68, 그리고 공개의 버전에 근거했다 현재는 ID입니다. Google, orcid 또는 oauth2 옵션으로 전환하십시오.

이 옵션은 매우 편리합니다.ERDDAP™관리자 -- 암호 또는 해시 다이제스트를 처리 할 필요가 없습니다. 당신이 창조해야 할 모든 것은 [&lt;사용자&gt; (/docs/server-admin/datasets#user) 사용자를 위한 태그datasets.xml사용자의 Google 이메일 주소 또는 Orcid 계정 번호를 사용자 이름 속성으로 지정합니다. (인증=email, google, orcid 또는 oauth2를 사용할 때 암호 속성이 사용되지 않습니다.) 

이러한 옵션으로 누구나 로그인할 수 있습니다.ERDDAP™Google 이메일 계정 또는 Orcid 계정으로 로그인하여 개인 데이터셋에 액세스할 수 없습니다. (이름 *ERDDAP™관련 기사) 더 보기&lt;user&gt; tag, 구글 이메일 주소 또는 Orcid 계정 번호를 사용자 이름으로 지정하고, 자신의 역할을 지정합니다.

ERDDAP™Case-insensitive로 이메일 주소를 치료합니다. 입력된 이메일 주소를 변환하여 이 작업을 수행합니다.&lt;user&gt; 태그) 또는 사용자 입력 (로그인 양식) 그들의 모든 Lowercase 버전에.

Google, orcid 또는 oauth2 인증을 설정하려면:

* setup.xml에서, 변경&lt;baseHttpsUrl&gt; 태그의 값.
개인 컴퓨터에 실험/작업
     https://localhost:8443   
당신의 대중ERDDAP™, 사용
     https://*your.domain.org*:8443   
또는 아파치를 사용하는 경우 : 8443이 아닌 더 나은[프록시](/docs/server-admin/deploy-install#proxypass)포트 번호가 필요하지 않습니다.
     
* setup.xml에서, 변경&lt;인증&gt; 태그의 값 구글, orcid, 또는 oauth2, 예를 들어:
```
    <authentication>oauth2</authentication>  
```
###### Google 설정{#google-setup} 
* Google 및 oauth2 옵션의 경우 :
아래 지침을 따라 Google 인증 설정ERDDAP·
     
    1. Google 이메일 계정이 없다면,[하나 만들기](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. 이름 *[이 지침](https://developers.google.com/identity/sign-in/web/devconsole-project)Google Developers Console 프로젝트를 만들고 클라이언트 ID를 얻습니다.
        
Google 양식이 승인되면Java스크립트 소스, 값 입력&lt;baseHttpsUrl&gt; 개인 컴퓨터에서ERDDAP™setup.xml, 예를 들어,
         https://localhost:8443   
두 번째 라인에서 추가&lt;baseHttpsUrl&gt; 당신의 공개에서ERDDAP™setup.xml, 예를 들어,
         https://*your.domain.org*:8443
 
        
공인 리디렉션 URI를 지정하지 마십시오.
        
이 프로젝트의 클라이언트 ID를 볼 때, 복사 및 설정에 붙여 넣기.xml (보통 아래)&lt;인증&gt; 주문하지만 배치는 실제로 중요하지 않습니다.&lt;googleClientID&gt; 태그, 예를 들어,
        &lt;구글클라이언트 *계정 관리* &lt;/google클라이언트
클라이언트 ID는 .apps.googleusercontent.com과 함께 몇 자리와 끝나는 약 75 문자의 문자열이 될 것입니다.
         
        
    3. 내 계정datasets.xml, 만들기 [&lt;사용자&gt; (/docs/server-admin/datasets#user) private datasets에 접근할 수 있는 각 사용자를 위한 꼬리표. 태그의 사용자 속성에 대한:
        
        * Google에 로그인 할 경우 사용자의 Google 이메일 주소를 사용하십시오.
        * orcid에 로그인할 경우, user's Orcid 계정 번호를 사용하십시오. (으로 dashes) ·
        
사용자 태그의 암호 속성을 지정하지 마십시오.
         
    4. 여행 정보ERDDAP™그래서 setup.xml의 변경 사항과datasets.xml효력.
         
###### Orcid 설정{#orcid-setup} 
* orcid 및 oauth2 옵션의 경우:
Orcid 인증을 설정하려면 아래 지침을 따르십시오.ERDDAP·
     (자주 묻는 질문[Orcid의 인증 API 문서](https://members.orcid.org/api/integrate/orcid-sign-in)·)   
     
    1. Orcid 계정이 없다면,[하나 만들기](https://orcid.org/signin)  
         
    2. Orcid에 로그인[ https://orcid.org/signin ](https://orcid.org/signin)개인 Orcid 계정을 사용하여.
         
    3. "Developer Tools"를 클릭하십시오. (상단의 "연구자") ·
         
    4. "무료 ORCID 공개 API에 대한 등록". 이 정보를 입력:
이름:ERDDAP™으로\\[당신의 조직\\]  
웹사이트:\\[이름 *ERDDAP도메인 이름\\]  
묘사:ERDDAP™과학 데이터 서버입니다. 사용자는 비공개 데이터셋에 액세스하려면 Google 또는 Orcid로 인증해야 합니다.
간접 URI:\\[이름 *ERDDAP도메인 이름\\]/erddap/loginOrcid.html의 경우
         
    5. Save 아이콘을 클릭 (3.5" 디스크처럼 보입니다&#33;) ·
ORCID APP 클라이언트 ID와 ORCID 클라이언트 비밀을 볼 수 있습니다.
         
    6. ORCID APP 클라이언트 ID 복사 및 붙여넣기 ("APP-"로 시작하는 것) setup.xml으로&lt;orcidClientID&gt; 태그, 예를 들어,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. ORCID 클라이언트 비밀 복사 및 붙여넣기 (더 낮은 케이스 알파벳 문자와 dashes) setup.xml으로&lt;orcidClientSecret&gt; 태그, 예를 들어,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. 내 계정datasets.xml, 만들기 [&lt;사용자&gt; (/docs/server-admin/datasets#user) private datasets에 접근할 수 있는 각 사용자를 위한 꼬리표. 태그의 사용자 속성에 대한:
        
        * Google에 로그인 할 경우 사용자의 Google 이메일 주소를 사용하십시오.
        * orcid에 로그인할 경우, user's Orcid 계정 번호를 사용하십시오. (으로 dashes) ·
        
사용자 태그의 암호 속성을 지정하지 마십시오.
         
    9. 여행 정보ERDDAP™그래서 setup.xml의 변경 사항과datasets.xml효력.
             

###### 로그인 방법{#log-in-either-way} 
Google, orcid 또는 oauth2 인증 옵션 및 Google Sign-In 또는 Orcid의 인증 API를 사용하면 작업을 중단합니다. (어떤 이유) 또는 작업 중지ERDDAP™기대, 사용자는 로그인 할 수 없습니다ERDDAP· 자주 묻는 질문 (또는 영구) 해결책, 당신은 사용자에게 다른 체계로 서명할 수 있습니다 (Google 이메일 계정을 얻거나 Orcid 계정을 받으세요.) · 이 작업을 수행:

1. 관련 기사&lt;인증&gt; 태그를 사용하여 다른 인증 시스템을 허용합니다. oauth2 옵션은 사용자가 시스템에 로그인 할 수 있습니다.
2. 각 중복&lt;user&gt; 태그 및 해당 Orcid 계정 번호에 Google 이메일 주소의 사용자 속성을 변경 (또는 vice-versa) , 하지만 역할 속성을 동일.

###### 오시는 길{#openid} 
ERDDAP™더 이상 openid 인증 옵션을 지원하지, 이는 오픈 버전에 기반 현재는 ID입니다. 대신 Google, orcid 또는 oauth2 옵션을 사용하십시오.

###### 사이트맵{#basic} 
ERDDAP™BASIC 인증을 지원하지 않습니다.
* BASIC는 보안 액세스 또는 담요 온/오프 액세스가 필요한 사전 정의 웹 페이지를 통해 기어되었지만,ERDDAP™지원하다 (제한적 접근) on-the-fly에 추가되는 datasets.
* BASIC 인증은 사용자가 로그 아웃 할 수있는 방법을 제공하지 않습니다&#33;
* BASIC 인증은 안전하지 않습니다.

##### 보안 데이터 소스{#secure-data-sources} 
데이터 설정이 제한되는 경우ERDDAP™사용자, 데이터 소스 (어디로ERDDAP™데이터를 가져옵니다) 자주 묻는 질문 어떻게 할 수 있습니까?ERDDAP™제한된 액세스 데이터셋에 대한 데이터를 얻을 수 있습니까? 몇몇 선택권은:

*   ERDDAP™로컬 파일에서 데이터 제공 (예를 들어, EDDTable을 통해 파일 또는EDDGrid파일 형식) ·
     
*   ERDDAP™할 수 있습니다[프로젝트](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) 및 데이터 소스 (예,OPeNDAP서버 또는 데이터베이스) 뒤에 있을 수 있습니다[팟캐스트](https://en.wikipedia.org/wiki/Firewall), 여기서 접근 가능ERDDAP™그러나 대중에.
     
* 데이터 소스는 공공 웹 사이트에있을 수 있지만 데이터를 얻기 위해 로그인해야합니다. Dataset의 두 가지 유형ERDDAP™로그인할 수 있습니다.[EDDTable데이터베이스](/docs/server-admin/datasets#eddtablefromdatabase)이름 *[EDDTableCassandra에서](/docs/server-admin/datasets#eddtablefromcassandra)· 이 datasets 지원 (자주 묻는 질문) 사용자 이름 (이름 *ERDDAP™읽기 전용 권한만 있는 사용자) , 암호, SSL 연결 및 기타 보안 조치.
    
그러나 일반적으로, 현재,ERDDAP™데이터 소스에 로그인하지 않기 때문에 이러한 데이터 소스를 처리 할 수 없습니다. 이것은 왜 접근하는 이유입니다[EDDGridInErddap 및 EDDTable 사용 언어: en](/docs/server-admin/datasets#eddfromerddap)datasets는 제한될 수 없습니다. 현재 지역ERDDAP™로그인 및 원격에서 메타데이터 정보를 액세스 할 수있는 방법이 없습니다ERDDAP· 그리고 "remote"를 넣어ERDDAP™방화벽 뒤에 데이터셋의 접근을 제거 제한에 문제가 해결되지 않습니다 : EDDXxx에 대한 사용자 요청 이후 FromErddap 데이터는 원격으로 리디렉션해야 합니다.ERDDAP™, 먼ERDDAP™자주 묻는 질문
    
#### Hackers에 대한 방어{#defenses-against-hackers} 
서버 소프트웨어에서 보안 약점을 악용하려고 하는 나쁜 녀석 해커가 있다.ERDDAP·ERDDAP™몇몇 방어의 층이 있는 일반적인 안전 통보를 따르십시오:

* 금지된 특전 -- 가장 중요한 방어 중 하나는 암호가없는 tomcat라는 사용자를 통해 Tomcat을 실행하는 것입니다. (그래서 아무도 그 사용자로 로그인 할 수 없습니다) 그리고 제한된 파일 시스템 권한 (e.g., 데이터에 대한 읽기 전용 액세스) · 이름 *ERDDAP's 지침[tomcat 설정](/docs/server-admin/deploy-install#tomcat)·
* 무거운 사용 - 일반적으로,ERDDAP™수천 개의 요청을 만들 수있는 스크립트를 포함하여 무거운 사용을 위해 내장, 다른 후 하나. 그것은 열심히ERDDAP™동시에 무거운 합법적 인 사용으로 자신을 열고 학대에서 방패. 그것은 때때로 강력하게 합법적 인 사용, 과도한 합법적 인 사용 및 illegitimate 사용 (그리고 때때로 그것은 정말 쉽습니다) · 다른 방어 중,ERDDAP™의식적으로 시스템의 자원의 좌표를 사용하는 단일 요청을 허용하지 않습니다 (시스템은 그렇지 않으면 활성화되지 않습니다.) ·
* Troublesome 사용자 식별 - 경우ERDDAP™아래로 느리고 또는 얼기 (네이티브 사용자 또는 봇이 여러 스크립트를 실행하기 때문에 동시에 여러 요청을 제출하거나 나쁜 녀석 때문에[부인 성명](https://en.wikipedia.org/wiki/Denial-of-service_attack)뚱 베어) , 당신은 볼 수 있습니다[Daily Report 이메일](#daily-report)  (더 자주 동일한 정보[ERDDAP™로그 파일](#log)) 가장 활동적인 사용자에 의해 한 요청의 수를 표시 ("Requester's IP 주소 참조 (지원하다) ·) ·ERDDAP™또한 관리자에게 이메일을 보낼 때마다["보통 활동: &gt;25% 요청 실패"](#failed-requests)· 다음을 볼 수 있습니다ERDDAP™로그인하여 요청의 성격을 볼 수 있습니다. 누군가가 너무 많은 요청을하고 있다고 느끼면 bizarre 요청 (내가 본 것을 믿지 않을 것입니다, 잘, 어쩌면 당신은) , 또는 공격 유형 요청, 당신은 블랙리스트에 자신의 IP 주소를 추가 할 수 있습니다.
* 블랙리스트 -- 당신은 말썽some 사용자의 IP 주소를 추가할 수 있습니다, 봇,[부인 성명](https://en.wikipedia.org/wiki/Denial-of-service_attack)공격자에ERDDAP [블랙리스트](/docs/server-admin/datasets#requestblacklist), 그 미래 요청은 즉시 거부됩니다. 이 설정은datasets.xml그래서 당신은 신속하게 목록에 IP 주소를 추가 할 수[기본 정보](#flag)데이터 세트 그래서 그ERDDAP™즉시 통지 및 변경 적용. blacklisted users로 보내진 오류 메시지는 그들에게 연락하는 것이 좋습니다.ERDDAP™그들은 실수로 블랙리스트에 넣었는지 관리자. (우리의 경험에서, 몇몇 사용자는 다수 스크립트를 동시에 실행하고 있었다는 것을 unaware, 또는 그들의 스크립트는 nonsense 요구를 만들기 시작했습니다.) 
* Dataset Security - 일부 유형의 데이터셋 (물론, EDDTableFromDatabase) 현재 추가 보안 위험 (e.g., SQL 주입) 그리고 자신의 보안 조치가 있습니다. 데이터셋의 이러한 유형에 대한 정보를 보세요.[일하기datasets.xml파일 형식](/docs/server-admin/datasets)·[EDDTableFromDatabase 보안](/docs/server-admin/datasets#database-security)·
* 보안 감사 -- 그러나NOAAIT 보안은 몇 년 동안 스캔에 대한 우리의 요청을 거부, 그들은 지금 일상적으로 내 스캔 (밥의)  ERDDAP™설치. 초기 스캔은 내가 그 다음 고정 된 몇 가지 문제를 발견했지만, 후속 스캔은 문제가 발견되지 않았습니다.ERDDAP· 스캔은 많은 것들에 대해 걱정합니다 : 믿을 수 없기 때문에tabledapSQL 요청과 같은 요청, 그들은 SQL 주입 취약점에 대해 걱정. 그러나 그 우려는 확고한ERDDAP™항상 쿼리를 파고 검증하고 별도로 주입 취약성을 피하는 방식으로 SQL 쿼리를 구축합니다. 그들은 때때로 불평은 우리의Java버전 또는 Tomcat 버전은 원하는대로 업데이트되지 않습니다. 그래서 우리는 응답으로 업데이트합니다. 나는 이전에 사람들이 보안 보고서를 보여주기 위해 제안했지만 지금은 내가 할 수 없다고 말했습니다.

#### 질문? 제안?{#questions-suggestions} 
자주 묻는 질문ERDDAP'보안 시스템 또는 질문, 의심, 우려, 또는 설정 방법에 대한 제안이, 우리의 참조[더 많은 지원 얻기에 섹션](/docs/intro#support)·
    

## 당신이 알아야 할 것들{#things-you-dont-need-to-know} 

필요한 일이 될 때까지 알 필요가 없습니다.

### 으로ERDDAP™ {#second-erddap} 
*    **두 번째 설정ERDDAP™테스트/개발**   
이렇게하려면 두 가지 방법이 있습니다.
    *    (인기 있는) Tomcat 설치 및ERDDAP™컴퓨터 이외의 컴퓨터에 공개ERDDAP· 개인 컴퓨터를 사용하는 경우:
        1. 설치 한 번에 한 단계. Tomcat을 먼저 실행하십시오.
Tomcat이 실행되면 Tomcat Manager가 있어야 합니다.
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (또는 아마도[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. 설치하기ERDDAP·
        3. ProxyPass를 사용하지 마십시오.ERDDAP™URL.
        4. 내 계정[설정.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl 에 http://127.0.0.1:8080
 
        5. 시작 후ERDDAP™, 당신은 그것을 볼 수 있어야
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (또는 아마도[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### 톰캣{#second-tomcat} 
*    (두 번째 베스트) 당신의 공개와 같은 컴퓨터에 다른 Tomcat 설치ERDDAP·
    1. 설치 한 번에 한 단계. Tomcat을 먼저 실행하십시오.
두 번째 Tomcat과 관련된 포트 번호의 모든 변경 (예, 8080에서 8081로 변경)   (자세히보기[여러 톰캣 Instances 단면도](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)그 문서를 통해 반도) ·
    2. 설치하기ERDDAP™새로운 Tomcat에서.
    3. ProxyPass를 사용하지 마십시오.ERDDAP™URL.
    4. 내 계정[설정.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl 에 http://www.*yourDomainName*:8081
 
    5. 시작 후ERDDAP™, 당신은 그것을 볼 수 있어야
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### 솔리드 스테이트 드라이브{#solid-state-drives} 
*    **솔리드 스테이트 드라이브 (SSD) 좋은&#33;**   
가장 빠른, 가장 쉬운, 가장 싼 방법 가속화ERDDAP's access to tabular data is to put data files on 솔리드 스테이트 드라이브 (SSD) · 대부분의 tabular datasets는 상대적으로 작습니다, 그래서 1개 2 TB SSD는 아마 당신의 tabular datasets 전부를 위한 모든 자료 파일을 붙들게 충분합니다. SSD는 결국 셀에 데이터를 작성하면 삭제하고, 새로운 데이터를 그 세포에 너무 많은 시간을 쓸 수 있습니다. SSD를 사용하면 데이터를 한 번 작성하고 여러 번 읽을 수 있으므로 소비자 등급 SSD는 오랫동안 지속되어야하며 하드 디스크 드라이브보다 훨씬 긴 시간 만 지속됩니다. (HDD 하드 디스크) · 소비자 등급 SSD는 이제 저렴합니다. (에서 2018, ~$200 에 대한 1 TB 또는 ~$400 에 대한 2 TB) 그리고 가격은 아직도 빠릅니다. 시간 :ERDDAP™데이터 파일에 액세스, SSD는 더 짧은 지연 시간을 제공합니다 (~0.1ms, HDD의 경우 ~3ms, versus ~10 (·) RAID에 대한 ms, 아마존 S3에 대한 ~55ms) 높은 처리량 (~500 MB/S, HDD용 ~75MB/s, RAID용 ~500MB/s) · 그래서 당신은 큰 성능 향상을 얻을 수 있습니다 (HDD 10X까지) 에 $200&#33; 시스템에 가장 다른 가능한 변화와 비교 ($ 10,000의 새로운 서버? $35,000의 새로운 RAID? $ 5000의 새로운 네트워크 스위치? 기타) , 이것은 투자에 가장 좋은 반환에 의해 (투자정보) · SSD가 죽으면 (에 1, 2, ... 8 년) , 그것을 대체하십시오. 데이터의 장기, 아카이브 스토리지에 의존하지 마십시오. 데이터의 프런트 엔드 복사본을 위해.\\[SSD의 Gridded 데이터에 대 한 좋은 것, 너무, 하지만 대부분의 Gridded 데이터 세트는 훨씬 더, SSD를 매우 비싼 만들기.\\]
    
서버가 메모리로로드되지 않으면 서버의 추가 메모리는 모든 측면을 가속화하는 크고 상대적으로 저렴한 방법입니다.ERDDAP·
     
    
### [무거운 짐/Contraints](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
무거운 사용으로, 독립ERDDAP™다양한 문제로 변형 될 수 있습니다. 더 많은 정보를 원하시면,[제약 및 솔루션 목록](/docs/server-admin/scaling#heavy-loads--constraints)·
     
### 그리드, 클러스터 및 연맹{#grids-clusters-and-federations} 
매우 무거운 사용 하 여, 단일 독립ERDDAP™한 개 이상의 제약 및 제안 된 솔루션으로 실행됩니다. 그런 상황을 위해,ERDDAP™확장 가능한 그리드를 구성하기 쉬운 기능을 가지고 (또한 클러스터 또는 federations 호출) 이름 *ERDDAP매우 무거운 사용을 처리하는 시스템을 허용하는 s (e.g., 대용량 데이터 센터) · 더 많은 정보를 원하시면,[그리드, 클러스터 및 federations의ERDDAP₢ 킹](/docs/server-admin/scaling)·
     
### 클라우드 컴퓨팅{#cloud-computing} 
몇몇 회사는 제안하기 시작합니다[클라우드 컴퓨팅 서비스](https://en.wikipedia.org/wiki/Cloud_computing)  (₢ 킹[Amazon 웹 서비스](https://aws.amazon.com/)) ·[웹 호스팅 회사](https://en.wikipedia.org/wiki/Web_hosting_service)1990년대 중반부터 간단한 서비스를 제공했지만, "클라우드"서비스는 시스템의 유연성과 제공되는 서비스의 범위를 크게 확장했습니다. 이 서비스를 사용하여 단일 설정할 수 있습니다.ERDDAP™또는 그리드 / 클러스터ERDDAP매우 무거운 사용을 처리하는 s. 더 많은 정보를 원하시면,[클라우드 컴퓨팅ERDDAP™](/docs/server-admin/scaling#cloud-computing)·

### 아마존 320{#amazon} 
*    **[Amazon 웹 서비스 (사이트맵) EC2 설치 개요](#amazon)**   
    [Amazon 웹 서비스 (사이트맵) ](https://aws.amazon.com/)·[클라우드 컴퓨팅 서비스](https://en.wikipedia.org/wiki/Cloud_computing)시간당 임대할 수 있는 다양한 컴퓨터 인프라를 제공합니다. 설치 가능ERDDAP™이름 *[Elastic Compute 클라우드 (적능력2) ](https://aws.amazon.com/ec2/)이름 * (한 시간에 빌릴 수있는 컴퓨터의 이름) · AWS는 우수한[AWS 사용자 가이드](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)Google을 사용하여 특정 질문에 대한 답변을 찾을 수 있습니다. 자신감 -- 시작하기 위해 공정한 금액입니다. 그러나 한 번 당신은 한 서버로 실행, 당신은 쉽게 많은 추가 리소스로 임대 할 수 (서버, 데이터베이스, SSD-스페이스 등) 합리적인 가격으로 필요한대로.\\[이것은 Amazon Web Services의 권고 또는 승인이 아닙니다. 다른 클라우드 공급자가 있습니다.\\]
    
당신이해야 할 것들의 개요ERDDAP™AWS에서 실행은:
    
    * 일반적으로, 당신은에 설명 된 모든 일을 할 것입니다[AWS 사용자 가이드](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)·
    * AWS 계정 설정.
    * AWS 사용자를 관리자 권한으로 설정하십시오. 이 사용자로 로그인하여 다음 단계를 수행하십시오.
    * 탄력 있는 구획 저장 (사이트맵) 서버에 연결된 하드 드라이브의 AWS와 동일합니다. 일부 EBS 공간은 EC2 인스턴스를 처음 만들 때 할당됩니다. persistent storage -- 정보는 EC2 인스턴스를 중지할 때 손실되지 않습니다. 그리고 인스턴스 유형을 변경하면 EBS 스페이스가 자동으로 새 인스턴스에 첨부됩니다.
    * EC2 인스턴스가 안정적이고 공개적인 URL을 가지고 있는 Elastic IP 주소를 만듭니다. (예를 다시 시작 때마다 변경되는 개인 URL과 반대) ·
    * EC2 인스턴스 생성 및 시작 (뚱 베어) · 넓은 범위의[인스턴스 유형](https://aws.amazon.com/ec2/instance-types/), 다른 가격에 각각. m4.large 또는 m4.xlarge 인스턴스는 강력하며 대부분의 용도에 적합하지만 필요에 맞는 것을 선택하십시오. Amazon의 Linux를 운영 체제로 사용하고 싶습니다.
    * 데스크탑/랩탑 컴퓨터가 Windows 컴퓨터인 경우에, 당신은 사용할 수 있습니다[뚱 베어](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), Windows 용 무료 SSH 클라이언트, EC2 인스턴스의 명령 줄에 액세스 할 수 있습니다. 또는 선호하는 다른 SSH 프로그램이있을 수 있습니다.
    * EC2 인스턴스에 로그인하면, 사용자 이름 "ec2-user"로 관리 사용자로 로그인됩니다. ec2-user에는 sudo 특권이 있습니다. 그래서, 루트 사용자로 무언가를 할 필요가 있을 때, 사용: sudo *일부Command* 
    * 데스크탑/랩탑 컴퓨터가 Windows 컴퓨터인 경우에, 당신은 사용할 수 있습니다[파일Zilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), 무료 SFTP 프로그램, 파일을 전송하기 위해 EC2 인스턴스. 또는 선호하는 다른 SFTP 프로그램이있을 수 있습니다.
    *   [아파치 설치](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)EC2 인스턴스에서.
    * 표준을 따르십시오[ERDDAP™설치 설명서](/docs/server-admin/deploy-install)·
         
### WaitThenTryAgain 예외{#waitthentryagain-exception} 
사용자가 같은 오류 메시지를 얻을 수 있습니다.
WaitThenTryAgainException:
있다 (임시?) 문제. 잠시 후 다시 시도하십시오. (브라우저에서 Reload 버튼을 클릭합니다.)   
세부사항: GridDataAccessor.increment: 부분적인 결과\\[0 댓글\\]="123542730"는 "123532800"일 것으로 예상되었습니다.

WaitThenTryAgainException의 일반적인 설명은 다음과 같습니다.
시간 :ERDDAP™사용자 요청에 응답, 데이터 세트와 예기치 않은 오류가있을 수 있습니다 (e.g., 파일에서 데이터를 읽는 동안 오류, 또는 원격 데이터셋에 액세스하는 오류) · waitThenTryAgain 신호ERDDAP™요청이 실패 (뚱 베어) 그러나 그ERDDAP™dataset을 신속하게 다시로드하려고 (그것은 호출[요청ReloadASAP](#requestreloadasap)) 그리고 요청을 retry. 종종,이 성공,그리고 사용자는 단지 요청에 대한 응답이 느립니다. 다른 시간, 재로드 실패 또는 너무 느리거나, 또는 요청을 처리하는 이후 시도는 실패하고 다른 WaitThenTryAgain을 던졌습니다. 그 일이 발생하면ERDDAP™reloading를 위한 dataset를 표시하고 사용자를 말합니다 (WaitThenTryAgain 예외를 통해) 요청에 응답하는 동안 실패했다.

그것은 정상적인 행동입니다. 이 체계는 많은 일반적인 문제로 취급할 수 있습니다.
그러나 과도하게 방아쇠를 얻는 이 체계를 위해 가능합니다. 가장 일반적인 원인은ERDDAPdataset의 로딩은 문제가 없지만ERDDAP데이터 요청에 대한 응답은 문제를 볼 수 있습니다. 원인이 무엇인지에 상관없이, 솔루션은 데이터 세트와 잘못되는 것을 다루는 것입니다. log.txt에서 실제 오류 메시지와 문제를 처리할 수 있습니다. 파일이 유효한 헤더가 있지만 잘못된 데이터가 있는 경우 (손상된 파일) , uncorrupted 파일로 파일을 대체합니다. RAID에 연결이 flakey 인 경우 수정하십시오. 원격 서비스에 연결하면 flakey, flakey를 만들거나 원격 소스에서 모든 파일을 다운로드하고 로컬 파일에서 데이터를 제공합니다.

특정 오류의 상세한 설명 (이름 *) 이름:
각EDDGrid데이터 세트,ERDDAP™메모리의 축 변수 값을 유지. 그들은 예를 들어, "을 사용하는 요청 된 축 값을 변환 () " 인덱스 번호로 형식. 예를 들어, 축 값이 "10, 15, 20, 25"인 경우, 요청 (20명) index #2의 요청으로 해석됩니다. (0기반 인덱스) · 시간 :ERDDAP™데이터에 대한 요청을 얻고 소스에서 데이터를 얻고, 소스에서 얻은 축 값은 메모리의 축 값과 일치합니다. 정상적으로, 그들은 합니다. 하지만 때로는 데이터 소스는 뜻깊은 방법으로 변경되었다: 예를 들어, 축 변수의 시작에서 인덱스 값은 제거 될 수있다 (예, "10, 15, 20, 25"가 될 수있다 "20, 25, 30") · 그것이 일어나는 경우, 그것은 명확하다ERDDAP요청의 해석 (예, " (20명) " 인덱스 #2) 지금 잘못. 이름 *ERDDAP™예외 및 호출 RequestReloadASAP.ERDDAP™곧 dataset를 업데이트합니다 (몇 초 안에, 보통 분 안에) · 다른, 유사한 문제는 또한 WaitThenTryAgain 예외를 던졌습니다.
    
#### 요청ReloadASAP{#requestreloadasap} 
오류 메시지가 끝난 후 Log.txt 파일에서 RequestReloadASAP를 볼 수 있습니다.[WaitThenTryAgain 예외](#waitthentryagain-exception)· 기본적으로 내부, programmatic 방법ERDDAP™설정하기[기본 정보](#flag)dataset가 ASAP를 다시 로드해야 하는 신호에.
     
### 파일 삭제되지 않음{#files-not-being-deleted} 
몇 가지ERDDAP™설치, 만든 일부 임시 파일과 문제가있다ERDDAP™이름 * (뚱 베어) 그래서 삭제되지 않습니다. 몇몇 경우에, 이 파일의 많은 축적하고 디스크 공간의 뜻깊은 양을 가지고 갑니다.

희망, 이러한 문제는 고정 (이름 *ERDDAP™v2.00의) · 이 문제를 볼 경우, Chris에 오프로드 파일의 디렉토리 + 이름을 이메일을 보내주십시오. noaaa.gov에서 존. 당신은 문제를 다루는 몇 가지 옵션이 있습니다:

* 파일이 크지 않은 경우 디스크 공간에서 실행하는 원인이되지 않습니다. 문제가 무시할 수 있습니다.
* 가장 간단한 해결책은 tomcat/를 폐쇄하기 위한 것입니다ERDDAP™  (시간 후에 그래서 몇몇 사용자는 영향을 받습니다) · 종료 중에 운영 체제가 파일을 삭제하지 않는 경우, 손으로 삭제합니다. 다음 시작ERDDAP·
         
### JSON 기반{#json-ld} 
*    **[json-ld를 가진 Datasets의 Semantic Markup (구글 맵 링크 된 데이터) ](#json-ld)**   
    ERDDAP™현재 사용[주 메뉴 (구글 맵 링크 된 데이터) ](https://json-ld.org)데이터 카탈로그 및 datasets 부분을 만들려면[웹 사이트](https://en.wikipedia.org/wiki/Semantic_Web)Tim Berners-Lee의 아이디어는 웹 내용을 더 읽을 수 있는 기계 및 기계 "understandable" 만드는 입니다. json-ld 콘텐츠 사용[사이트맵](https://schema.org/)용어 및 정의. 검색 엔진 ([특히 Google](https://developers.google.com/search/docs/data-types/datasets)) 그리고 다른 semantic 공구는 발견과 색인을 붙이는 것을 촉진하기 위하여 이 Structured markup를 사용할 수 있습니다. json-ld 구조화 마크업은 보이지 않는-to-humans로 나타납니다&lt;스크립트&gt; 코드에 https://.../erddap/info/index.html 웹 페이지 (semantic 웹[데이터카탈로그](https://schema.org/DataCatalog)) 서로 https://.../erddap/info/*datasetID*/index.html 웹 페이지 (semantic 웹[데이터셋](https://schema.org/Dataset)) · (Adam Leadbetter 및 Rob Fuller of Marine Institute in Ireland의 특별 감사는이 부분을 만들기 위해 작업의 단단한 부분을 수행하기 위해ERDDAP·)   
     
### 아웃 Of-Date URL{#out-of-date-urls} 
데이터 제공업체가 데이터 파일에 기록된 URL은 업데이트되지 않습니다. (예를 들어,http은https, 웹사이트는 , NODC/NGDC/NCDC와 같은 조직은 NCEI로 재구성됩니다) · 결과 깨진 링크는 모든 웹 사이트에 직면 한 현재 문제입니다. 이 작업을 수행ERDDAP™이제는 최신 URL을 자동으로 업데이트하는 시스템이 있습니다. GenerateDatasets의 경우 Xml는 최신 URL을 보며 최신 URL을 추가합니다.&lt;addAttributes&gt;. 또한, dataset가 로드될 때ERDDAP™최신 URL을 보시려면 최신 URL로 자동 변경됩니다. 변화는 일련의 검색-for/replace-with 쌍에 의해 정의됩니다&lt;업데이트Urls&gt; 내 계정ERDDAP이름 *
\\[뚱 베어\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml 파일. 변경할 수 있습니다. 변경에 대한 제안이 있는 경우, 또는 이 서비스를 설정해야 하는 경우 (변환기처럼) , Chris에게 이메일을 보내십시오. noaaa.gov에서 존.
     
### 사이트맵{#cors} 
* 사이트맵 ([Cross-Origin 리소스 공유](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"정한 리소스를 허용하는 메커니즘 (e.g. 글꼴 또는ERDDAP™제품정보) 웹 페이지에서 다른 도메인에서 도메인 외부에서 요청할 수 있습니다. (아룬 Ranganathan) · 기본적으로 CORS는 응답의 HTTP 헤더에 넣을 수있는 메시지입니다. 기본적으로 "다른 사이트가 있으면이 사이트에 괜찮습니다. (특정한 것, 또는 모두) 회사연혁 (e.g. 데이터) 이 사이트에서 사용할 수 있습니다. 따라서, 그것은 대안입니다[JSONP를](https://en.wikipedia.org/wiki/JSONP)·
    
개발자의ERDDAP™보안 전문가가 될 자격이 없습니다. 우리는 CORS와 관련된 보안 문제에 대해 완전히 명확하지 않습니다. 우리는 보안을 줄이는 행동을 종료하는 모든 진술을하지 않습니다. 그래서 우리는 단지 중립을 유지하고 각으로 떠나ERDDAP™CORS 헤더가 위험이 있는 경우를 결정하는 관리자. 항상, 만약ERDDAP™모든 개인 데이터 세트를 가지고, 그것은 보안에 대해 조심해야 할 좋은 아이디어입니다.
    
CORS를 활성화하려면ERDDAP™, 거기[자주 묻는 질문](https://enable-cors.org/index.html)웹 사이트 관리자가 더 낮은 수준 서버 소프트웨어를 통해 CORS 헤더를 활성화 할 수있는 방법을 설명 (₢ 킹 아파치 또는 nginx) ·
    
### 패스워드{#palettes} 
* 팔레트는 사용ERDDAP™그래프와 지도를 만들 때 데이터 값의 범위로 변환합니다.
    
각 팔레트는 .cpt-style 팔레트 파일에 의해 사용됩니다.[주요특징](https://www.soest.hawaii.edu/gmt/)· 모든 것ERDDAP™.cpt 파일은 유효 GMT .cpt 파일이지만 반대는 사실이 아닙니다. 이용안내ERDDAP™, .cpt 파일이 있다:
    
    * "#"로 시작하는 파일의 시작에 선택적인 의견 선.
    * 팔레트의 세그먼트에 대한 설명이있는 주요 섹션, 라인 당 하나의 세그먼트. 각 세그먼트 묘사 선에는 8개의 가치가 있습니다:
시작하기 값, startRed, 시작 녹색, 시작 파랗고, endValue, endRed, endGreen, endBlue.
어떤 세그먼트가 있을 수 있습니다.ERDDAP™각 세그먼트의 startRed/Green/Blue와 endRed/Green/Blue 사이 선형 interpolation를 이용합니다.
        
각 세그먼트는 시작과 끝 색상을 지정하는 것이 좋습니다. 각 세그먼트의 시작 색상은 이전 세그먼트의 끝 색상과 동일하므로 팔레트는 색상의 연속 혼합을 설명합니다.ERDDAP™색상의 연속 혼합으로 팔레트에서 분리 색상의 팔레트를 만드는 시스템을 가지고 있습니다. 이름 *ERDDAP™사용자는 연속으로 팔레트를 원하는 경우 지정할 수 있습니다. (이름 *) 또는 Discrete (원래에서 파생) · 그러나 일부 팔레트에 대한 이러한 권장 사항을 따르지 않는 합법적 인 이유가 있습니다.
        
    * startValue와 endValues는 정수가 있어야 합니다.
첫번째 세그먼트는 startValue=0 및 endValue=1가 있어야 합니다.
두 번째 세그먼트는 startValue=1 및 endValue=2를해야합니다.
기타.
    * 빨간색, 녹색 및 파란색 값은 0에서 정수이어야합니다. (이름 *) · 255 (전체보기) ·
    * 파일의 끝에는 3개의 선이 있어야 합니다:
        1. 데이터 값에 대한 배경 rgb 색상 최소보다 적은, 예를 들어: B 128 128 128
그것은 종종 startRed, startGreen 및 StartBlue 첫 번째 세그먼트입니다.
        2. 데이터 값에 대한 전경 rgb 색상은 컬러바 최대보다 더, 예를 들어: F 128 0 0
그것은 종종 endRed, endGreen 및 마지막 세그먼트의 endBlue입니다.
        3. NaN 데이터 값에 대한 rgb 색상, 예를 들어, N 128 128 128
그것은 종종 중간 회색 (128개 128개 128개 128개) ·
    * 각 선의 값은 탭에 의해 분리되어야하며, 여분의 공간이 없습니다.
    
표본 .cpt 파일은 BlueWhiteRed.cpt입니다:
    
₢ 킹 이것은 BlueWhiteRed.cpt입니다.
0 0 0 0 0 0 0 0
1 0 1 2 3 4 5 6 7 8 9 10 이상
255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255
3 255 255 255 4 255 255 0
1 2 3 4 5 6 7 8 9 10 11 12 13 14
1 2 3 4 5 6 7 8 9 10 다음
₢ 킹
₢ 킹
전화 번호: +86 592 512 8
    
다른 예의 .cpt 파일을 참조하십시오. .cpt 파일에 문제가 있다면,ERDDAP™.cpt 파일이 파싱될 때 오류를 던질 것입니다 (정보보다 더 나은) ·
    
추가 팔레트를 추가할 수 있습니다.ERDDAP· 당신은 스스로 만들 수 있습니다 또는 웹에서 그들을 찾을 (예를 들어,[cpt 도시](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) 아마도 형식을 약간 편집해야 할 것입니다.ERDDAP.cpt 필요조건. 이름 *ERDDAP™새 .cpt 파일을 사용하려면 파일 저장 *뚱 베어* /웹앱/erddap/WEB-INF/cptfiles (각 새 버전의 작업을 해야 합니다.ERDDAP) 그리고:
    
    * default message.xml 파일을 사용하는 경우: filename을&lt;palettes&gt; 태그에
         *뚱 베어* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
이 작업을 수행하면 업그레이드 할 때마다해야합니다.ERDDAP·
    * custom message.xml 파일을 사용하는 경우: filename을 파일명에 추가&lt;custom message.xml 파일에 palettes&gt; 태그: *뚱 베어* /content/erddap/messages.xml . 이 작업을 수행하면 한 번만 할 필요가 있습니다. (그러나 custom message.xml 파일을 유지하기 위해 다른 작업이 있습니다.) ·
    
다음 시작ERDDAP™·ERDDAP™변경 사항 이 접근법의 장점은 사용자가 제시한 목록에서 팔레트의 순서를 지정할 수 있다는 것입니다. 수집을 추가하면 저자의 초기에 접두사를 추가하는 것이 좋습니다. (예, "KT\\_·) 각 팔레트의 이름으로 수집을 식별하고 다른 이름과 동일한 이름을 가질 수있는 여러 팔레트가있을 수 있도록합니다.
    
표준 팔레트를 제거하거나 변경하지 마십시오. 그들은 모두의 표준 특징입니다ERDDAP™설치. 팔레트 또는 팔레트의 수집을 생각하면 표준에 포함해야합니다.ERDDAP™일반적으로 사용되기 때문에 배포, Chris에게 이메일을 보내주십시오. noaaa.gov에서 존.
    
### 색상 바{#colorbars} 
*    **계정 정보ERDDAP™컬러바에서 색상을 생성합니까?** 
    
    1. 사용자는 predefined 중 하나를 선택합니다.[패스워드](#palettes)또는 기본, 예를 들어, 레인보우를 사용합니다. 팔레트는 GMT .cpt Color Palette Table 파일에 저장 / 정의됩니다. 각의ERDDAP's predefined 팔레트는 간단한 정수 범위, 예를 들어, 0 ~ 1 (팔레트에 있는 단 하나 단면도가 있는 경우에) , 또는 0에서 4 (팔레트에 4 개의 섹션이 있다면) · 파일에 있는 각 세그먼트는 n에서 n+1에, n=0에서 시작 커버합니다.
    2.  ERDDAP™미리 정의된 팔레트의 범위를 스케일링하여 새로운 .cpt 파일 On-the-fly 생성 (예, 0에서 4) 사용자가 필요로 한 팔레트의 범위에 (예, 0.1 ~ 50) 새로운 팔레트의 각 섹션에 새 팔레트의 섹션을 생성 (e.g., 0.1, 0.5, 1, 5, 10, 50의 진드기를 가진 통나무 가늠자에는 5개의 단면도가 있습니다) · 각 단면도의 끝점을 위한 색깔은 .cpt 파일에 있는 팔레트의 관련 부분을 찾아내서 생성되고, 그 후에 선형으로 R, G 및 B 가치를 교환하. (그리하면 GMT가 Color Palette Table 파일에서 색상을 생성합니다.) 이 시스템은ERDDAP™일반적인 팔레트로 시작 (e.g., 8개의 세그먼트를 가진 무지개, 합계에 대하여 0에서 8) 그리고 사용자 정의 팔레트 On-the-fly 만들기 (e.g., 무지개에 0.1 50 mg/L를 지도하는 주문 무지개) ·
    3.  ERDDAP™그런 다음 새로운 .cpt 파일을 사용하여 색상 막대의 각 다른 색 픽셀 색상을 생성 (그래프 또는 지도에 데이터를 플로팅 할 때 각 데이터 포인트에 대한) , 다시 .cpt 파일에 팔레트의 관련 부분을 찾을 수, 다음 선형으로 R, G 및 B 값을 교환.
    
이 과정은 unnecessarily 복잡할 수 있습니다. 그러나 다른 방법을 해결하기 위해 열심히 로그 스케일과 관련된 문제를 해결합니다.
    
그래서 당신은 어떻게 mimic 할 수ERDDAP™은? 그것은 쉽지 않습니다. 기본적으로 당신은 그 과정을 중복해야합니다ERDDAP™이용안내 당신이라면Java프로그래머, 당신은 동일을 사용할 수 있습니다Java클래스 그ERDDAP™이것의 전부를 하기 위하여 사용:
     *뚱 베어* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Data Distribution Systems의 가이드라인{#guidelines-for-data-distribution-systems} 
데이터 배포 시스템의 설계 및 평가에 대한 더 일반적인 의견은 찾을 수 있습니다[이름 *](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)·
     
### 아카이브ADataset{#archiveadataset} 
내 계정ERDDAP™설치는 아카이브를 만들 수 있는 ArchiveADataset라는 명령줄 도구입니다. (한국어.zip또는.tar.gz파일 형식) netcdf-3의 시리즈에 저장된 dataset의 부분 또는 전부로.nc제출에 적합한 파일 형식의 데이터 파일NOAANCEI 아카이브 (.ncgridded datasets를 위해 또는[.nc사이트맵](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)tabular datasets를 위해, 지정된 것과 같이[한국어NetCDF템플릿 v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) ·

아카이브A Dataset는 두 가지 다른 아카이브 형식을 만들 수 있습니다:

* "original" 형식은 다음과 같습니다.[NCEI 건축 가이드라인](https://www.ncdc.noaa.gov/atrac/guidelines.html), 이 가이드[NCEI에서 데이터를 보관](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), 그리고 관련[Data Integrity 관리](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity)·
* "BagIt" 형식은[BagIt 파일](https://en.wikipedia.org/wiki/BagIt), 표준화 된 아카이브 형식은 미국 의회의 도서관에 의해 추진,[BagIt v0.97 명세](https://tools.ietf.org/html/draft-kunze-bagit-14)·NOAA's NCEI는 BagIt 파일을 아카이브에 표준화 할 수 있습니다.

놀랍게도,[글로벌 및 가변 메타데이터](/docs/server-admin/datasets#global-attributes)이름 *ERDDAP™격려 / 요구는 거의 정확히 같은 in-file CF 및 ACDD 메타 데이터 NCEI 격려 / 필요, 그래서 모든 데이터 세트를 통해 NCEI에 제출 할 준비가되어야한다[Send2NCEI 소개](https://www.nodc.noaa.gov/s2n/)또는[사이트맵](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI의 고급 추적 및 리소스 도구 Archive Collections) ·

당신은 (이름 *ERDDAP™관련 기사) ArchiveADataset을 사용하여 데이터를 NCEI로 제출하십시오. (아니 NCEI) NCEI에 데이터의 펑크를 제출 할 때 결정하고 그 펑크가 될 것입니다. 새로운 데이터가있을 때 알아야 할 것이므로 펑크가 지정하는 방법 (NCEI 원) · 따라서, ArchiveADataset은 NCEI에 제출하기 위해 패키지를 생성하는 데 사용할 수있는 도구입니다.

아카이브A Dataset은 다른 상황에서 유용 할 수 있습니다, 예를 들어,ERDDAP™dataset의 subset를 변환해야하는 관리자 (자주 묻는 질문ERDDAP) 기본 파일 형식에서 세트로[.ncCF 파일](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), 그래서 대중ERDDAP™데이터 제공.nc원래 파일 대신 CF 파일.

설정하면ERDDAP™그리고 그것을 실행 (적어도 1 시간) , 당신은 찾을 수 있습니다 아카이브ADataset에서 *뚱 베어* /webapps/erddap/WEB-INF 디렉토리. 쉘 스크립트가 있습니다 (아카이브ADataset.sh) Linux/유닉스 및 일괄 파일 (아카이브ADataset.bat) Windows를 위해.

Windows에서 ArchiveADataset을 실행하는 첫 번째 시간, 당신은 ArchiveADataset을 편집해야합니다. 텍스트 편집기를 사용하여 java로 경로를 변경합니다. Windows가 찾을 수 있도록 exe 파일Java·

ArchiveADataset을 실행하면 일련의 질문을합니다. 각 질문에 대한 응답을 입력 한 다음 Enter를 누릅니다. 또는 ^C를 눌러 프로그램을 언제든지 종료합니다.

또는, 명령줄의 순서에서 질문에 대한 답변을 넣을 수 있습니다. 이렇게하려면 한 번 프로그램을 실행하고 입력하고 답을 작성하십시오. 그런 다음 단일 명령 줄을 만들 수 있습니다. (매개변수로 답변) 프로그램을 실행하고 모든 질문에 답변합니다.
지정된 매개 변수의 기본값을 사용하려면 기본값을 사용합니다.
사용 "" (두 개의 더블 견적) 빈 문자열을 위한 placeholder로.
명령줄에 매개 변수를 지정하는 것은 매우 편리 할 수 있습니다. 예를 들어, 한 달에 한 번 아카이브를 사용하는 경우 데이터의 가치. 매개 변수로 명령 줄을 생성하고 메모 또는 쉘 스크립트에서 저장하면 매달 작은 변화를 만들 필요가 있습니다.

ArchiveADataset의 질문은 다음과 같습니다.

* 원래 또는 Bagit 파일 포장 지정. NCEI를 위해, 사용 Bagit.
* zip 또는 tar 지정.gz패키지의 압축. NCEI를 위해, 사용 방수포.gz·
* 이 아카이브에 대한 연락처 이메일 주소를 지정 (아카이브에서 READ\\_ME.txt 파일에 기록됩니다.) ·
* 이름 *datasetID아카이브하려는 dataset의.
* 아카이브를 원하는 데이터 변수 지정 (보통 모두) ·
* 아카이브하려는 dataset의 하위 설정 지정. 데이터 요청을 위해 하위 세트를 포맷 할 필요가 있으므로 탭 데이터 세트보다 격자가 다릅니다.
    * gridded datasets를 위해, 당신은 왼쪽 차원의 범위를 지정할 수 있습니다, 보통 시간의 범위입니다. ArchiveADataset은 별도의 요청을 만들고 각각의 값에 대한 별도의 데이터 파일을 생성합니다. gridded datasets가 보통 크기 때문에, 당신은 거의 항상 전체 dataset의 크기에 작은 subset 상대를 지정해야 할 것입니다.
예를 들어,\\[ (2015-12-01 ·) :: (2015년 12월 31일) \\]\\[\\]\\[\\]\\[\\]
    * tabular datasets를 위해, 당신은 constraints의 어떤 수집든지 지정할 수 있습니다, 그러나 수시로 시간의 범위입니다. tabular datasets가 보통 작기 때문에, 전체 dataset이 아카이브되어 있지 않다 그래야 제약을 지정할 수 있습니다.
예를 들면, &time&gt;=2015-12-01&time&lt;2016-01-01
* tabular datasets의 경우: 0 이상의 변수의 comma 분리된 목록을 지정하면 아카이브된 데이터가 다른 데이터 파일로 더 서브셋됩니다. datasets에 대해
    [cdm\\_data\\_타입](/docs/server-admin/datasets#cdm_data_type)\\=시간 시리즈|TimeSeries프로필|회사 소개|Trajectory프로필
cf\\_role=timeseries\\_id가 있는 변수를 항상 지정해야 합니다. (₢ 킹stationID) 또는 cf\\_role=trajectory\\_id 속성. ArchiveADataset은 별도의 요청을 만들 것이며, 각 변수의 값의 각 조합에 대한 별도의 데이터 파일을 생성합니다.stationID·
다른 모든 tabular datasets를 위해, 당신은 아마 이 목적을 위해 어떤 변수를 지정하지 않을 것입니다.
경고: dataset의 하위 설정이 어려워지는 경우 (&gt;2GB의) 그리고 이 목적을 위해 적합하지 않은 변수가 없다, then ArchiveADataset is not usable with this dataset. 이것은 드문 것입니다.
* 생성된 데이터 파일 형식을 지정합니다.
gridded datasets를 위해, NCEI를 위해, 사용.nc·
NCEI를 위한 tabular datasets를 위해, 사용[.nc사이트맵](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)옵션이 있다면; 그렇지 않으면 사용.nc·
* 각 데이터 파일 및 전체 아카이브 패키지에 대한 파일 다이제스트의 유형 지정 : MD5, SHA-1, 또는 SHA-256. 파일 digest는 클라이언트를 위한 방법을 제공합니다 (예, NCEI) 데이터 파일이 손상된지 여부를 테스트합니다. 전통적으로, 이들은[.md5 파일](https://en.wikipedia.org/wiki/MD5), 그러나 이제 더 나은 옵션이 있습니다. NCEI를 위해, 사용 SHA-256.

모든 질문에 답한 후, ArchiveADataset은 다음과 같습니다.

1. dataset에 일련의 요청을 만들고 결과 데이터 파일을 단계 *큰Parent감독* /아카이브데이터셋/ *datasetID\\_timestamp에* ·.
gridded datasets를 위해, 좌측 차원의 각 가치를 위한 파일이 있을 것입니다 (예, 시간) · 파일의 이름은 그 값이 될 것입니다. (e.g., 시간 값) ·
tabular datasets의 경우, 각 값에 대한 파일이 될 것입니다 ... 변수 (₢ 킹) · 파일의 이름은 그 값이 될 것입니다. 변수가 1개 이상인 경우, 왼쪽 변수는 하위디렉토리 이름을 만들기 위해 사용될 것이며, 가장 적절한 변수는 filenames를 만드는 데 사용됩니다.
각 데이터 파일이 있어야 합니다.&lt;2기가바이트 (최대 허용.nc버전 3 파일) ·
2. 데이터 파일의 다이제스트와 함께 각 데이터 파일과 관련된 파일을 만드십시오. 예를 들어, 데이터 파일이 46088 인 경우.nc그리고 digest 유형은 .sha256이고, digest 파일에는 46088가 있을 것입니다.nc.sha256 ..
3. 이 아카이브를 생성하기 위해 지정된 모든 설정 목록을 포함하여 아카이브에 대한 정보가 READ\\_ME.txt 파일을 만듭니다.
4. 3 파일 만들기 *큰Parent감독* /아카이브데이터셋/ :
    
    * ·.zip또는.tar.gz첨부 파일 *datasetID\\_timestamp에* .zip  (또는.tar.gz) 모든 단계 데이터 파일과 digest 파일이 포함되어 있습니다. 이 파일은 디스크 공간에 의해서만 제한되는 크기일 수 있습니다.
    * 아카이브 파일에 대한 digest 파일, 예를 들어, *datasetID\\_timestamp에* .zip다운로드
    * 아카이브의 "original" 유형의 경우, 이름의 텍스트 파일 *datasetID\\_timestamp에* .zip파일 형식 (또는.tar.gz) 모든 파일을 나열.zip  (또는.tar.gz) 파일.
    
당신은 NCEI에 대한 아카이브를 준비하는 경우, 이들은 당신이 NCEI에 보낼 파일, 아마 통해[Send2NCEI 소개](https://www.nodc.noaa.gov/s2n/)또는[사이트맵](https://www.ncdc.noaa.gov/atrac/index.html)  (NCEI의 고급 추적 및 리소스 도구 Archive Collections) ·
5. 모든 단계의 파일을 삭제하여 아카이브 파일 만 (₢ 킹.zip) , 소화 (예, .sha256.txt) 아카이브의, 그리고 (옵션으로) .listOfFiles.txt 파일은 남아 있습니다.

#### ISO 19115의 .xml Metadata 파일{#iso-19115-xml-metadata-files} 
ArchiveADataset 아카이브 패키지는 데이터셋에 대한 ISO 19115 .xml 메타데이터 파일을 포함하지 않습니다. NCEI에 데이터셋에 대한 ISO 19115 파일을 제출하려면 ISO 19115 .xml 메타데이터 파일을 보낼 수 있습니다.ERDDAP™dataset 생성 (그러나NMFS사람들은 InPort에서 데이터셋을 위한 ISO 19115 파일을 받아야 합니다.ERDDAP™이미 그 파일을 제공 하지 않습니다) ·

문제? 제안? ArchiveADataset은 새로운 기능입니다. 문제 또는 제안이있는 경우, 우리의 참조[더 많은 지원 얻기에 섹션](/docs/intro#support)·
     
