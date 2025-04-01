---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `displayInfo`와 `displayAttribute` 이름 *

### 이름 *
이 기능은 `Information` 행의 datasets 페이지에서 선택된 글로벌 속성을 표시할 수 있습니다.

### 사용 설명서
이 태그는 `Sax 파서`에서만 사용할 수 있습니다. 사용 및 사용하려면 다음 단계를 따르십시오.

1.  **SAX 파서 사용** ::
`setup.xml` 파일에 다음 줄을 추가하십시오.
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **태그 추가datasets.xml₢ 킹** ::
으로datasets.xml` 파일, 두 개의 최상위 태그를 포함:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **기본 Behavior** ::
   - 이 태그가 추가되지 않은 경우 또는 ``에서 빈을 왼쪽datasets.xml` 파일, 기본 값은 다음과 같이 적용됩니다:
     - `displayInfo`: `Summary,라이센스 ₢ 킹
     - `displayAttribute`: `summary,라이센스 ₢ 킹

4.  **책임감** ::
`displayInfo`와 `displayAttribute` 태그 모두에서 comma-separated 값의 수는 동일해야합니다.

### 어떻게 작동합니까?
- `displayAttribute` 태그는 글로벌 속성을 지정합니다. (정의된 `<addAttributes>` 태그) 각 dataset에 표시될 수 있습니다.
- `displayInfo` 태그의 해당 값은 UI의 `Information` 행에서 레이블으로 표시됩니다.
- 표시된 라벨을 통해 사용자가 표시되면, 도구 끝이 나타납니다.

### 이름 *
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset 글로벌 속성 예:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI 행동:
- `Display1`와 `Display2`는 UI에서 `Information` 행에 표시됩니다.
- hovered 때, tooltips는 해당 속성 값을 표시한다:
  - `Display1`: Tooltip show _이 att1_입니다.
  - `Display2`: Tooltip show _이 att2_입니다.

### 지원하다
- 'displayAttribute` 태그에 지정된 속성 이름을 dataset에서 정의 된 글로벌 속성에 일치시킵니다.
- 잘못된 또는 누락 된 속성은 오류 메시지를 기록합니다.

이 단계에 따라 해당 툴팁과 관련된 글로벌 속성을 표시하기 위해 datasets 페이지의 `Information` 행을 사용자 정의할 수 있습니다.
