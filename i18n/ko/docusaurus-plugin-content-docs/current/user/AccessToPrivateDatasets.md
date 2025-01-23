---
title: "Access to Private Datasets"
---
# Private Datasets에 대한 액세스ERDDAP™

이름 *ERDDAP™설치는 인증이 활성화되지 않으며 로그인 할 수있는 사용자에게 어떤 방법을 제공하지 않으며 개인 데이터 세트가 없습니다.

이름 *ERDDAP™설치는 인증이 가능합니다. 현재,ERDDAP™Google-managed 이메일 계정을 통해 인증 지원, 이메일 계정 포함NOAA그리고 많은 대학. 이름 *ERDDAP™인증이 활성화되었지만 Google 관리 이메일 계정으로 로그인 할 수 있지만 개인 데이터 세트에만 액세스 할 수 있습니다.ERDDAP™관리자는 명시적으로 액세스 권한을 부여했습니다.

## 자주 묻는 질문{#updated-instructions} 

아래의 정보 중 일부는 날짜 중입니다. 이 얻은 업데이트 될 때까지[이 블로그 게시물](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html)스크립트를 가진 private dataset에서 데이터를 얻는 최근 단계.

## 브라우저를 가진 사람{#humans-with-browsers} 

인간 사용자의ERDDAP™로그인ERDDAP™이 웹 사이트는 귀하가 웹 사이트를 탐색하는 동안 귀하의 경험을 향상시키기 위해 쿠키를 사용합니다.

로그인:

1. 왼쪽 상단의 링크에서 로그인을 클릭합니다ERDDAP™웹 페이지.
로그인이 없다면,ERDDAP™설치가 활성화되지 않으며 개인 데이터셋이 없습니다.
     
2. 로그인 버튼을 클릭하여 Google 계정으로 로그인하십시오.
버튼의 텍스트는 "Signed in"로 변경해야합니다.
     
3. 로그인ERDDAP버튼.
웹 페이지가 말해야 로그인 *이름 * 이메일주소* ·
그렇지 않으면 5 초를 기다립니다.ERDDAP다시 버튼.
극단적인 경우에, 당신은 기다릴 필요가 있고 그 후에 몇 번 시도할지도 모릅니다.
     
4. 브라우저의 Back 버튼을 사용하지 마십시오. " 사용ERDDAP" 위의 상단에 링크, 다음 다른 링크를 사용하여 이동ERDDAP™당신이 관심이있는 페이지. 캐시 된 웹 페이지가 로그인하지 않은 경우 페이지를 다시로드하십시오.
     

## 스크립트{#scripts} 

\\[이것은 Lynn DeWitt에 의해 제공된 정보에서 경미하게, 이 밖으로 피구의 단단한 일을 했습니다. 린, 대단히 감사합니다&#33;
수정이나 제안이있는 경우 erd.data @ noaaa.gov 으로 이메일을 보내주십시오.\\]

로그인 할 수도 있습니다.ERDDAP™그리고 스크립트를 통해 private datasets에 액세스합니다. 여기에 사용하는 예입니다.curl::

1. 이 지침은 2단계 인증이 켜지지 않는 gmail 주소를 사용합니다. gmail 주소가 2단계 인증이 진행된 경우, 2단계 인증이 해제된 다른 gmail 주소를 생성하는 것이 좋습니다.
     
2. 로그인ERDDAP™스크립트에서 사용하려는 gmail 주소로 수동으로, 필요한 모든 권한을 허용, 다음 완전히 다시 로그.
     
3. 브라우저 Developer Tools를 열고 Network 탭으로 이동합니다.
     
4. 자주 묻는 질문ERDDAP™"log in" link, 그런 다음 "Sign in"버튼을 선택하고 신속한 경우 적절한 이메일 주소를 선택하십시오.
     
5. "Sign in"버튼을 "Signed in"로 변경한 후 개발자 도구 네트워크 탭은 다음과 같은 두 항목이 표시됩니다. (Firefox에서 예) ::
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
마우스 오른쪽 클릭 컨텍스트 메뉴를 사용하여 "cURL로 복사" 이 URL 모두 일반 텍스트 편집기로 붙여넣기
     
6. "로그인ERDDAP" 버튼과 "cURL로 복사"같은 링크 :
```
    login.html  
```
그리고이 세 번째를 붙여curl텍스트 파일로 명령.
     
7. 텍스트 파일에서, 당신은 지금 다음과 같은 3 라인이있을 것입니다, 당신이 로그인 한 곳ERDDAP™서버에서 ' * https://host.somewhere.com/erddap * 이름 * 첫 번째curl명령은 "login\\_hint"에서 사용자 프로필을 얻고 "id\\_token"을 생성합니다. 두 번째는 id\\_token을 사용하여 Google로 로그인하고 세 번째로 로그인합니다.ERDDAP·
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. 위의 3 줄, 명령 줄에서 순차적으로 실행할 때, 로그인하면ERDDAP· 이 스크립트에서 사용하려면 먼저 id\\_token을 캡처해야하며, 두 번째 줄에 먹이고, 쿠키를 작성하여 다음 줄에 읽을 수 있습니다.
     
9. 스크립트를 개발하려면 먼저 실행 (이름 * https://accounts.google.com )  curl개발자 도구에서 복사 한 것과 정확히 라인, 응답을 캡처 (당신은 얻을 수 있습니다curl플래그에 대한 오류 "--2.0" 그냥 제거) · php에서 다음과 같이 보입니다 :
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
$id\\_token을 사용하여 두 번째 줄을 실행하여 Google에 로그인하여 "-H '쿠키 : 재료 '" 매개 변수를 제거하고 대신 말하는curl쿠키를 쓰기:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
로그인ERDDAP™, 다시 "-H '쿠키 : 재료 '" 매개 변수를 제거하고 이전에 작성된 쿠키를 사용합니다.
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
이제 같은 쿠키를 사용하여 서버에서 데이터를 요청할 수 있어야 합니다.
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
