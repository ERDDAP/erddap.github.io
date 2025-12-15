---
sidebar_position: 7
---
#  `제품정보 - 한국어` 이름 * `디스플레이Attribute` 이름 *

## 이름 *
이 기능은 데이터셋 페이지에서 선택한 글로벌 속성을 표시할 수 있습니다. `- 기타` 이름 *

## 사용 설명서
이 태그는 사용할 수 있습니다 `Sax 파서` · 사용 및 사용하려면 다음 단계를 따르십시오.

1.  **SAX 파서 사용** ::
다음 줄을 추가하여 `설정.xml` 파일 :
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **태그 추가 ` datasets.xml ` ** ::
내 계정 ` datasets.xml ` 파일에는, 2개의 최고 수준 꼬리표가 있습니다:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **기본 Behavior** ::
   - 이 태그가 추가되지 않은 경우 또는 빈에서 왼쪽 ` datasets.xml ` 파일, 기본 값은 다음과 같이 적용됩니다:
     -  `제품정보 - 한국어` :: `요약,License` 
     -  `디스플레이Attribute` :: `요약,license` 

4.  **책임감** ::
둘 다에 있는 comma-separated 가치의 수 `제품정보 - 한국어` 이름 * `디스플레이Attribute` 태그는 동일해야합니다.

## 어떻게 작동합니까?
- 더 보기 `디스플레이Attribute` 태그는 글로벌 속성을 지정합니다 (내 정의 된)&lt; ` addAttributes ` &gt; tag)는 각 dataset를 위해 표시될 것입니다.
- 해당 값 `제품정보 - 한국어` 꼬리표는 상표로 표시됩니다 `- 기타` UI의 행.
- 표시된 라벨을 통해 사용자가 표시되면, 도구 끝이 나타납니다.

## 이름 *
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset 글로벌 속성 예:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI 행동:
- 이름 * `디스플레이1` 이름 * `디스플레이2` 표시될 것 `- 기타` UI의 행.
- hovered 때, tooltips는 해당 속성 값을 표시한다:
  -  `디스플레이1` : 툴팁 쇼 _ 이것은 att1_입니다.
  -  `디스플레이2` : 툴팁 쇼 _이 att2_

## 지원하다
- 속성 이름을 지정합니다. `디스플레이Attribute` dataset에서 정의된 글로벌 속성을 일치합니다.
- 잘못된 또는 누락 된 속성은 오류 메시지를 기록합니다.

다음 단계로, 당신은 사용자 정의 할 수 있습니다 `- 기타` datasets 페이지의 행은 해당 툴팁과 관련된 글로벌 속성을 표시합니다.
