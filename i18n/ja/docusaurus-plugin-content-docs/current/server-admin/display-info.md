---
sidebar_position: 7
---
# `displayInfo` と `displayAttribute` ニュース

## コンテンツ
この機能は、`インフォメーション` 行内のデータセットページで、選択したグローバル属性を表示することができます。

## 使用法 指示
これらのタグは `Sax パーサ` でのみ使用できます。 それらを有効にして使用するために、次の手順に従ってください。

1.  **SAXパーサーを有効にする** : : :
`setup.xml` ファイルに次の行を追加します。
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **にタグを追加datasets.xmlツイート** : : :
で、datasets.xml` ファイルには、2つのトップレベルのタグが含まれます。
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **デフォルト行動** : : :
   - これらのタグが追加されていない場合、または `` で空の左datasets.xml` file は、デフォルト値は次のようになります。
     - `displayInfo`: 用語集 ツイート
     - `displayAttribute`:`summary,license ツイート

4.  **一貫性を確保** : : :
`displayInfo` と `displayAttribute` タグのコンマ区切り値の数は同じでなければなりません。

## 仕組み
- `displayAttribute` タグは、グローバル属性を指定します (定義は内部)&lt;ツイートaddAttributes各データセットに `&gt; タグ) が表示されます。
- `display`Info タグの対応する値は、UIの `インフォメーション` 行のラベルとして表示されます。
- 表示されたラベルの上にユーザがカーソルを合わせると、ツールチップが現れ、グローバル属性の値を表示します。

## 事例紹介
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### データセット グローバル属性例:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UIの行動:
- 「表示1」と「表示2」という単語は、UIの「情報」行に表示されます。
- hovered の場合、ツールチップは対応する属性値を表示します。
  - `Display1`: ツールチップショー _これは att1_
  - `Display2`: ツールチップショー _これは att2_

## インフォメーション
- `displayAttribute` タグで指定された属性名が、データセットで定義されたグローバル属性にマッチすることを確認します。
- 誤りや欠落した属性はエラーメッセージを記録します。

これらの手順に従って、データセットページの「情報行」をカスタマイズして、関連するツールチップで関連するグローバル属性を表示することができます。
