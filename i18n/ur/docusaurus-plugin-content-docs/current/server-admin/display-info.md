---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `display Info' اور'display Atribute' تاج

### تفصیل
اس خصوصیت کی مدد سے آپ اعدادوشمار کے صفحہ پر اپنے انتخاب کی عالمی خصوصیات کو شمار کر سکتے ہیں

### ہدایات کا استعمال
ان ٹیگوں کو صرف 'سکس سیریز' کے ساتھ استعمال کیا جا سکتا ہے. انہیں قابل بنانے اور استعمال کرنے کے لیے، ان اقدامات پر عمل کریں:

1.  **SAX Parser کو فعال کرتا ہے۔** :
آپ کے `Setup.xl' فائل تک مندرجہ ذیل لائن شامل کریں:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **میں ٹیگ شامل کریں‘datasets.xml‘‘** :
'اس میںdatasets.xml‘‘ فائل میں دو اوپری سطح کے ٹیگ شامل ہیں:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **طے شدہ** :
   - اگر ان ٹیگز کو شامل نہ کیا جائے یا انہیں باقی رہ جائے‘‘۔datasets.xml‘‘ فائل، متناسب اقدار کا اطلاق اس طرح کیا جاتا ہے:
     - `display Info':* کشمیری، لیکینز‘‘
     - `display Atribute':‘sumary, License) ایک بھارتی فلمی اداکارہ ہے۔‘‘

4.  **غیر متصل** :
دونوں میں 'display Info' اور'display Atribute' ٹیگ ایک ہی ہونا ضروری ہے.

### یہ کیسے کام کرتا ہے
- 'display Atribute' ٹیگ عالمی خصوصیات (طے شدہ' کے اندر<addAttributes>‘‘ ٹیگ) ہر ڈیٹا سیٹ کے لیے ڈسپلے کیے جائیں۔
- 'display Info' ٹیگ میں متعلقہ قدروں کا مظاہرہ کیا جاتا ہے
- جب صارف ظاہر کردہ لیبلوں سے تجاوز کر جاتا ہے تو ایک ٹولٹیپ سامنے آتا ہے جو عالمی پیمانے کی قدر ظاہر کرتا ہے۔

### مثال
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Glomals مثال:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### وعدہ :
- 'Display1' اور'Display2' کے الفاظ یو آئی پر قطر میں دکھائے جائیں گے۔
- جب یہ واضح ہو جائے گا تو آلات کی نقل و حمل سے متعلقہ اقدار ظاہر ہوں گی:
  - `Display1':Toltip ظاہر کرتا ہے "یہ Att1_ ہے۔
  - `Display2':Toltip ظاہر کرتا ہے "یہ Att2_ ہے۔

### نوٹ
- ^ ا ب پ ت ٹ ث ج چ ح خ د ڈ ٹ ث ج چ ح خ د ڈ ذ https://www.com/g.com/brography. اخذ شدہ بتاریخ 06 جنوری 2018. تحقق من التاريخ في:
- لاگ انسس یا گمنام خصوصیات میں لاگ ان

ان اقدامات پر عمل کرنے سے، آپ اعداد و شمار کے صفحے پر مبنی عالمی خصوصیات دکھانے کے لئے
