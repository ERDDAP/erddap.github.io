---
sidebar_position: 2
---
# (주)
Existing의 업데이트를 수행하는 방법 ERDDAP™ 서버에서

## 기타{#changes} 
1. 자주 묻는 질문 [기타](/changes) "Things"라는 섹션에서 ERDDAP™ Administrators Need to know and Do"모든에 대한 ERDDAP™ 당신이 사용 된 버전부터 버전.
     
##  Java  {#java} 
2. 당신은에서 격상시키는 경우에 ERDDAP™ 버전 2.18 이하, 당신은 전환해야 Java 25 분 (또는 newer) 그리고 관련 Tomcat 10. 자주 묻는 질문 ERDDAP™ 설치 설명서 [ Java ](/docs/server-admin/deploy-install#java) 이름 * [톰캣](/docs/server-admin/deploy-install#tomcat) · 당신은 또한 당신의 복사해야합니다 _tomcat_/content/erddap 오래된 Tomcat 설치에서 새로운 Tomcat 설치로 디렉토리.

## 다운로드{#download} 
3. 다운로드 [다운로드](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) 으로 _tomcat_/webapps .
     (버전 2.29.0, 706,788,135 바이트, MD5=A5ED0DCC8D46CA27640FFEB8CE4A8560, 날짜 12-15-2025) 
     
## 메시지.xml{#messagesxml} 
4. 
    * 일반: 당신은에서 격상시키는 경우에 ERDDAP™ 버전 1.46 (또는 위) 그리고 당신은 그냥 표준 메시지를 사용, 새로운 표준 message.xml 자동으로 설치됩니다 (erddap을 통해 .class 파일 중. 전쟁 전쟁) ·
         
    * 희귀 : 당신은에서 격상시키는 경우에 ERDDAP™ 버전 1.44 (또는 아래) ·
당신은 이전 message.xml 파일을 삭제:
         _tomcat_/content/erddap /messages.xml의.
새로운 표준 message.xml은 자동으로 설치됩니다. (erddap을 통해 .class 파일 중. 전쟁 전쟁) ·
         
    * 희귀 : 항상 표준 message.xml 파일 변경 (내 계정) ·
새로운 message.xml 파일로 변경해야 합니다.
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml erddap.war가 Tomcat에 의해 decompressed 후에.
         
    * 희귀 : custom message.xml 파일을 유지하면 _tomcat_/content/erddap ·
당신은 알아낼 필요가 (diff를 통해) 어떤 변경이 default message.xml (새로운 erddap에 있습니다. 전쟁으로
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) 및 사용자 정의 메시지를 수정합니다.xml 파일에 따라.
         
## 설치하기{#install} 
5. 새 설치 ERDDAP™ Tomcat에서:
이름 * Tomcat Manager를 사용하지 마십시오. 곧 또는 나중에 PermGen 메모리 문제가있을 것입니다. 실제로 종료 및 시작 Tomcat에 더 나은.
\\* 컴퓨터에서 실제 Tomcat 디렉토리와 아래 _tomcat_에 참조를 대체하십시오.
     
### 리눅스 및 맥{#linux-and-macs} 
1. 폐쇄 Tomcat: 명령줄에서 사용: _tomcat_/bin/shutdown.sh
그리고 사용 ps -ef | grep tomcat은 if/when 프로세스가 중지되었습니다. (1분 또는 2분 정도 걸릴 수 있습니다.) 
2. decompressed 제거 ERDDAP™ 임명: 에서 _tomcat_/webapps, 사용
rm -rf의 erddap
3. 오래된 erddap을 삭제합니다. 전쟁 파일: 에서 _tomcat_/webapps, 사용 rm erddap. 전쟁 전쟁
4. 새로운 erddap을 복사합니다. 임시 디렉토리의 전쟁 파일 _tomcat_/webapps
5. 톰캣과 ERDDAP : 사용 _tomcat_/bin/startup.sh
6. (주) ERDDAP™ 브라우저에서 다시 시작이 성공했는지 확인하십시오.
     (종종, 당신은 몇 번 시도하고 당신이 볼 전에 분 기다립니다 ERDDAP™ ·)   
             
### 윈도우{#windows} 
1. 폐쇄 Tomcat: 명령줄에서 use: _tomcat_\bin\\\\ shutdown.bat 
2. decompressed 제거 ERDDAP™ 임명: 에서 _tomcat_/webapps, 사용
델 /S / Q erddap
3. 오래된 erddap을 삭제합니다. 전쟁 파일: 에서 _tomcat_\\webapps, 사용 del erddap. 전쟁 전쟁
4. 새로운 erddap을 복사합니다. 임시 디렉토리의 전쟁 파일 _tomcat_\\webapps
5. 톰캣과 ERDDAP : 사용 _tomcat_\\bin\\startup.bat
6. (주) ERDDAP™ 브라우저에서 다시 시작이 성공했는지 확인하십시오.
     (종종, 당신은 몇 번 시도하고 당신이 볼 전에 분 기다립니다 ERDDAP™ ·) 

Troubles 업데이트 ERDDAP · 더 보기 [더 많은 지원 얻기에 섹션](/docs/intro#support) ·
