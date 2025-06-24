---
sidebar_position: 8
---
# Yerelleştirilmiş Metadata

### Açıklama
Bu özellik, veri setleri ve değişkenleriniz hakkında yerelleştirilmiş metadata dahil etmenizi sağlar. Herhangi bir özellik içinde tanımlananaddAttributesetiket yerelleştirilebilir. Bu, başlık, özet, lisans, instituion gibi ortak dize özellikleri için kullanılması amaçlanmıştır. numeric için kullanılması tavsiye edilmez (E.g. "_FillValue") veya standart değerler (E.g. "ioos_category") Ve bu değerlerin yerelleştirilmesi şaşırtıcı davranışlar olabilir.

### Kullanım talimatları
Onları sağlamak ve kullanmak için, bu adımları takip edin:

1.  **Tags: Add Tagsdatasets.xml"** :
"In the "datasets.xml“ Dosya, ek özellikler bölümünde yerelleştirilmiş metadata ekleyin:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Varsayılan Davranış** :
   - xml:lang etiketleri sağlandığında, sağlanan bilgiler tüm diller için gösterilecektir. Bu önceki behavoir'i karşılaştırır.
   - Bazı xml:lang etiketleri sağlanırsa, bu değerler bu dillerde talepler için kullanılacaktır. Bir kullanıcı sağlanan bir dili talep ederse xml:lang değeri, varsayılan dilden değer (İngilizce İngilizce İngilizce English) kullanılacak.
