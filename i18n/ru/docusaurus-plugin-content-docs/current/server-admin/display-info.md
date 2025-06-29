---
sidebar_position: 7
---
# "displayInfo" и "displayAttribute" Тэги

## Описание
Эта функция позволяет отображать глобальные атрибуты по вашему выбору на странице наборов данных в строке «Информация».

## Инструкции по использованию
Эти теги можно использовать только с помощью «Sax parser». Чтобы включить и использовать их, выполните следующие шаги:

1.  **Скачать SAX Parser** :
Добавьте следующую строку в файл «setup.xml»:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Добавить теги в 'datasets.xmlпункт** :
В этомdatasets.xml"файл, включает два тега верхнего уровня:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Поведение по умолчанию** :
   - Если эти метки не добавлены или не оставлены пустыми вdatasets.xml"файл, значения по умолчанию применяются следующим образом:
     - "ДисплейИнфо": Краткое изложение, Лицензия пункт
     - "displayAttribute": "резюме, лицензия" пункт

4.  **Обеспечить последовательность** :
Количество разделенных запятыми значений в тегах «displayInfo» и «displayAttribute» должно быть одинаковым.

## Как это работает
- Тег "displayAttribute" определяет глобальные атрибуты (определяется в пределах&lt;пунктaddAttributes'&gt; tag) для каждого набора данных.
- Соответствующие значения в теге «displayInfo» отображаются в виде меток в строке «Информация» пользовательского интерфейса.
- Когда пользователь нависает над отображаемыми этикетками, появится подсказка, показывающая ценность глобального атрибута.

## Пример
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Пример глобальных атрибутов Dataset:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Поведение UI:
- Слова «Display1» и «Display2» будут отображаться в строке «Информация» на пользовательском интерфейсе.
- При зависании подсказки инструментов будут отображать соответствующие значения атрибутов:
  - «Display1»: Tooltip показывает, что это Att1
  - «Display2»: Tooltip показывает _This is att2_

## Заметки
- Убедитесь, что имена атрибутов, указанные в теге «displayAttribute», соответствуют глобальным атрибутам, определенным в наборе данных.
- Неправильные или отсутствующие атрибуты будут регистрировать сообщения об ошибках.

Следуя этим шагам, вы можете настроить строку «Информация» на странице наборов данных для отображения соответствующих глобальных атрибутов с соответствующими подсказками инструментов.
