---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ Ve Bulut

## Bulut Nedir

En basit tanım yerel sunucular değildir. Bu çok geniş ve birçok farklı kurulum anlamına gelebilir. Örneğin, bir veri merkezinde, bir Sanal Özel Server, paylaşılan bir sunucu, sunucusuz veya başka bir şey olabilir.

### Bulut Neden Bulut

Birçok neden organizasyon buluta taşınmak istiyor. En önemli olanı, fiziksel donanım satın almak için karşılaştırıldığında hesaplama/storage ihtiyaçları için sağladığı esnekliktir.

Bu, bir veri merkezi / sunucu odasının korunması ihtiyacını ortadan kaldırır. Ayrıca mevcut ihtiyaçlarınız için hesaplama kaynaklarını ölçeklendirmeye olanak sağlar. Bulut gibi birçok farklı şey anlamına gelebilir, kaynaklarınızı ölçeklendirebilmek de. Daha fazla ödeme yapmak anlamına gelebilir (veya daha az) sunucusuz kaynaklar. Paylaşılan bir sunucudan özel bir sunucuya taşınmak anlamına gelebilir. Daha büyük bir özel fiziksel sunucuya yükseltme anlamına gelebilir.

## Can Can Can Can Can Can Can ERDDAP™ Bulutta koşmak mı?

Evet.

 ERDDAP™ Yerel veya bulut ortamlarında koşabilen Tomcat içinde koşmak için tasarlanmıştır. Docker'da koşmak için topluluk desteği var ve orada [resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi resmi Docker desteği yakında geliyor](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .

dedi ki, ERDDAP™ Özel sunucular norm olduğunda bir zamanda tasarlanmıştır. Bu sunucusuz değil ve sunucusuz yapmak imkansız değilse son derece zor olurdu.

### Can Can Can Can Can Can Can ERDDAP™ ölçek?

Scaling ERDDAP™ Sadece daha sunucusuz kaynakları kullanmaktan daha karmaşıktır. Bazı büyük belgelerimiz var [Nasıl ölçeklenecek ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) . ölçeklendirmek daha kolay hale getirmek ERDDAP™ İlgilendiğimiz bir şey.

### Autoscaling'i ne önler?

 ERDDAP™ Bugüne kadar veri setlerini tutmak, veri setlerine değişiklikler aboneleri, tarama verileri, kullanıcı isteklerini ve daha fazlasını işlemek dahil olmak üzere birçok şey yapıyor. yeterince büyük için ERDDAP™ sunucu gibi [CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Bu, sürekli olarak bir şey yapmak anlamına gelir. Sürekli kullanım aslında sunucusuz seçenekler için son derece pahalı bir durumdur (serverless yaparken hesaplama için büyük bir prim ödersiniz ve bu yüzden ana avantaj sadece bazen arama çağrıları yaptığınızda) . Ayrıca, tüm hareket etmeye çalışın ERDDAP™ Sunucusuz versiyonlara çeşitli işlevsellik, yöneticiler için gerekli önemli ölçüde daha karmaşık bir kurulumla sona erecek.

### Can Can Can Can Can Can Can ERDDAP™ Cloud Storage kullanıyor musunuz?

Evet.

 ERDDAP™ Bulut depolamasını destekler (AWS S3 de dahil olmak üzere) Ve bu desteği geliştirmek ve geliştirmek (Örneğin, AWS S3) Yüksek bir önceliktir. ERDDAP™ gelişim yol haritası. ERDDAP™ Ayrıca mevcut birçok online hizmetten veri çekme yeteneğine sahiptir. Daha fazla bilgi için, aramamızı tavsiye ederim [dataset type documents](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) .
