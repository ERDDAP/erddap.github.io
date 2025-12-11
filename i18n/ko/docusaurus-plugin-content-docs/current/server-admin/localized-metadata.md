---
sidebar_position: 8
---
# 메타데이터

### 이름 *
이 기능은 데이터셋과 변수에 대한 로컬화된 메타데이터를 포함합니다. 정의된 모든 속성 addAttributes 태그는 현지화 될 수 있습니다. 이것은 title, Summary, license, instituion과 같은 일반적인 문자열 속성에 사용됩니다. 그것은 수치에 사용할 수 없습니다 (예. "_FillValue") 또는 표준화된 값 (예: "ioos_category") 그리고 이러한 유형의 값을 로컬라이제이션할 수 있습니다.

### 사용 설명서
사용 및 사용하려면 다음 단계를 따르십시오.

1.  **태그 추가 ` datasets.xml ` ** ::
내 계정 ` datasets.xml ` file, add 속성 섹션에서 localized metadata 추가:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **기본 Behavior** ::
   - xml:lang 태그가 제공되지 않은 경우, 제공된 정보는 모든 언어로 표시됩니다. 이것은 이전 행동과 일치합니다.
   - 일부 XML:lang 태그가 제공되면 해당 값은 해당 언어의 요청에 사용됩니다. 사용자가 제공한 XML:lang 값이 없는 언어를 요청하면, 기본 언어의 값 (한국어) 사용할 수 있습니다.
