---
sidebar_position: 3
---
# ERDDAP™공지사항
* 이미지 비교 파일 확인 (이것은 여전히 Jetty 테스트를 실행해야하지만, ImageComparison 그룹에 제한하는 속도를 원하는 경우 `mvn Verified`를 실행하는 것을 의미 할 수 있습니다.) 
* 업데이트 의존
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* 플러그인 업데이트
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* 신뢰할 수 있는 업데이트를 확인하는 테스트는 모든 주요 구성에 대해 아무것도 깨지지 않았습니다. (datasets는 다른 중요한 조정 뿐 아니라,) 
```
mvn verify
```
* 번역메시지.translate () 필요한 경우 번역을 업데이트
* EDStatic.java 설정 개발 false로 모드, 버전 번호를 변경하고 릴리스 날짜를 지정합니다.
* 설치하기
```
mvn clean
mvn compile
mvn package
```
## 수의사
Coastwatch 서버 또는 데이터 세트 유형의 대부분을 사용하는 다른 서버의 배포에 대한 전쟁 파일을 보내고 많은 트래픽을받습니다.
우리는 빌드의 더 넓은 배포 전에 오류를 발견하려고합니다.

새 릴리스에 대해 알려줄 때 메시지 포함.

표준 절차는:
* .war 파일을 coastwatch에 업로드\\[뚱 베어\\]/content/카지노사이트
* user=tomcat로:
  * 내 계정\\[뚱 베어\\]/빈 / :
./shutdown.sh // "ps -fu tomcat"을 사용하여 중지되었습니다.
  * 내 계정\\[뚱 베어\\]/웹앱/ :
rm -rf의 erddap
rm erddap입니다. 전쟁 전쟁
사이트맵 ../content/erddap/erddap2.22.war에 관하여 erddap.war // 또는 숫자가 무엇인지
  * 내 계정\\[뚱 베어\\]/빈 / :
. /스타트업.sh
  * 이후ERDDAP웹 페이지를 반환, 에서\\[뚱 베어\\]/웹앱/ :
chgrp -R erddap erddap 를
chmod - r g + rw erddap의
chmod -R o-rwx의 erddap

## GitHub 릴리스
GitHub 릴리스를 초안, erddap.war 및 erddapContent 포함.zip  (버전 번호) 

title: The official v2.25 version
설명 : 변경 목록 보기
       https://erddap.github.io/changes#version-225
 

## 문서 업데이트
* docusaurus.config.ts 파일의 버전 번호를 업데이트 (footer 섹션에서) ·
* 문서 편집 (배포-install.md 및 배포-update.md) ·
  * 관련 기사\\[다운로드\\] 
  * 자주 묻는 질문 (약간 reformatted) 이전 설치 목록 2. 명세
  * erddap의 현재 릴리스 정보 변경. 전쟁에서\\[다운로드\\]
* 문서 사이트의 번역을 실행합니다.
* Pull 요청을 만들고 변경을 병합합니다.
* 문서 사이트 배포 (자세히보기) ·

## 다른 repos가 필요한 날짜까지 보장
주로 ErddapContent 및 ErddapTest를 의미하지만 개발 변경 중에 최신 상태로 유지해야합니다.

## 사용자 정의
요청된 변경 사항이 있는 사용자의 첫 번째 통지 (또는 버그가 수정되었습니다.) · 변경 및/또는 제기 문제를 확인하는 데 시간을 주기.

ERDDAP버전 2.25 사용할 수 있습니다&#33;

변경 사항에 대해 읽을 수 있습니다.
 https://erddap.github.io/changes#version-225
 

변경 사항 중 일부는 제안 된 변경 사항입니다. 감사합니다. 자주 묻는 질문 새로운 기능을 곧 시도 할 수 있다면 좋을 것입니다. 이 새로운 버전을 더 넓은 관객에게 발표하기 전에.

당신이라면ERDDAP관리자, 업그레이드 지침은 at
 https://erddap.github.io/docs/server-admin/deploy-update
 

문제가있는 경우, 질문, 제안, 이메일을 보내주십시오.

감사합니다.ERDDAP·

### 공지사항
공지 메일링 리스트에 공지를 보냅니다.
