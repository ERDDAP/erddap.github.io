---
sidebar_position: 7
---
#  `Ekran görüntüsü Info Info` ve `EkranAttribute` Etiketler

## Açıklama
Bu özellik, seçiminizin global özelliklerini veri setleri sayfasında görüntülemek için izin verir `Bilgi Bilgileri` satır.

## Kullanım talimatları
Bu etiketler sadece ile kullanılabilir `Sax parser` . Onları sağlamak ve kullanmak için, bu adımları takip edin:

1.  **SAX Parser** :
Aşağıdaki çizgiyi senin için ekleyin `Kurulum.xml` Dosya:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Add Tags in Add Tags ` datasets.xml ` ** :
İçinde ` datasets.xml ` Dosya, iki üst düzey etiket içerir:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Varsayılan Davranış** :
   - Bu etiketler eklenmez veya boş bırakılırsa ` datasets.xml ` Dosya, varsayılan değerler aşağıdaki gibi uygulanır:
     -  `Ekran görüntüsü Info Info` : `Özet,License` 
     -  `EkranAttribute` : `Özet,license` 

4.  **Anlaşıcılık** :
Her ikisinde de ortak değer sayısı `Ekran görüntüsü Info Info` ve `EkranAttribute` etiketler aynı olmalıdır.

## Nasıl çalışır
- The The The The The The The The `EkranAttribute` etiket küresel özellikleri belirtir (aşağıda tanımlanır).&lt; ` addAttributes ` Vegt; tag) her veri kümesi için gösteriliyor.
- İlgili değerler içinde `Ekran görüntüsü Info Info` etiket, etiketler olarak gösterilir `Bilgi Bilgileri` UI sıra.
- Kullanıcı, görüntülenen etiketler üzerinde ilerlerken, bir alettip görünür, küresel özelliklerin değerini gösterir.

## Örnek Örnek Örnek Örnek Örnek Örnek Örnek Örnek
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributes Örnek:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI Davranışı:
- Kelimeler `Ekran1` ve `Ekran2` gösterilecek. `Bilgi Bilgileri` UI'de sıra.
- Atıldığı zaman, alettipleri ilgili özellikleri gösterecektir:
  -  `Ekran1` : Tooltip gösteriyor _This is att1_
  -  `Ekran2` : Tooltip gösteriyor _This is att2_

## Notlar Notlar Notlar Notlar Notlar Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Not Notlar
- Özelliklerin isimlerinin belirtilmesini sağlayın `EkranAttribute` etiket, veri kümesinde tanımlanan küresel özellikleri eşleştirir.
- Incorrect veya eksik özellikler hata mesajlarını girişecektir.

Bu adımları takip ederek, özelleştirebilirsiniz `Bilgi Bilgileri` İlgili küresel özellikleri ilgili alettiplerle görüntülemek için datasets sayfasında sıralayın.
