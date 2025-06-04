---
title: "Localized Metadata"
sidebar_position: 8
---
## メタデータ

### コンテンツ
この機能は、データセットと変数に関するローカライズされたメタデータを含めることができます。 内で定義される任意の属性addAttributesタグはローカライズできます。 これは、タイトル、要約、ライセンス、構成などの一般的な文字列属性に使用されます。 数値に使用することはお勧めしません (例: "_FillValue") または標準化された値 (例: "ioos_category") これらの値の型をローカライズすると、意外な挙動が生じる可能性があります。

### 使用法 指示
それらを有効にして使用するために、次の手順に従ってください。

1.  **にタグを追加datasets.xmlツイート** : : :
で、datasets.xml`ファイル、add 属性セクションに localized メタデータを追加します。
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **デフォルト行動** : : :
   - xml:lang タグが提供されていない場合は、すべての言語で提供された情報が表示されます。 これは、以前のbehavoirにマッチします。
   - いくつかの xml:lang タグが提供されている場合、これらの値はそれらの言語の要求に使用されます。 ユーザーが指定した xml:lang 値を持たない言語を要求する場合、デフォルト言語の値は (日本語 English) 利用します。
