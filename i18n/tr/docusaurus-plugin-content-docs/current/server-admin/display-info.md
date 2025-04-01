---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## "displayInfo" ve "displayAttribute" Etiketler

### Açıklama
Bu özellik, "Bilgi" sırasındaki veri setlerinde seçiminizin global özelliklerini göstermenize olanak sağlar.

### Kullanım talimatları
Bu etiketler sadece “Sax .” ile kullanılabilir. Onları sağlamak ve kullanmak için, bu adımları takip edin:

1.  **SAX Parser** :
Aşağıdaki çizgiyi "setup.xml" dosyasına ekleyin:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tags: Add Tagsdatasets.xml"** :
"In the "datasets.xmlDosya, iki üst düzey etiket içerir:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Varsayılan Davranış** :
   - Bu etiketler eklenmez veya boş bırakılırsa “datasets.xml“ Dosya, varsayılan değerler aşağıdaki gibi uygulanır:
     - "displayInfo": "Summary,License "
     - "displayAttribute": "summary,license "

4.  **Anlaşıcılık** :
Hem "displayInfo" hem de "displayAttribute" etiketleri aynı olmalıdır.

### Nasıl çalışır
- “displayAttribute’ etiketi küresel özellikleri işaret ediyor ("The" (İngilizce).<addAttributes>" etiketi") Her veri kümesi için gösteriliyor.
- “displayInfo’ etiketindeki karşılık gelen değerler, UI’nin ‘Bilgi’ sıralarında etiketler olarak gösteriliyor.
- Kullanıcı, görüntülenen etiketler üzerinde ilerlerken, bir alettip görünür, küresel özelliklerin değerini gösterir.

### Örnek Örnek Örnek Örnek Örnek Örnek Örnek Örnek
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Global Attributes Örnek:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI Davranışı:
- "Display1" ve "Display2", UI'de "Bilgi" sırasında gösteriliyor.
- Atıldığı zaman, alettipleri ilgili özellikleri gösterecektir:
  - "Display1": Tooltip gösteriyor _This is att1_
  - "Display2": Tooltip gösteriyor _This is att2_

### Notlar Notlar Notlar Notlar Notlar Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Notlar
- “displayAttribute’ etiketinde belirtilen özelliklerden emin olun, veri kümesinde tanımlanan küresel özellikleri eşleştirin.
- Incorrect veya eksik özellikler hata mesajlarını girişecektir.

Bu adımları takip ederek, "Bilgi" sırasını, ilgili global özellikleri ilgili araç uçları ile görüntülemek için özelleştirebilirsiniz.
