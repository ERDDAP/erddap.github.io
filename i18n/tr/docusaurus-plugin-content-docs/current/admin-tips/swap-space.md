Bu içerik bir şeye dayanıyor [Roy Mendelssohn'dan gelen mesaj ERDDAP kullanıcılar grubu](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Çok fazla yardım talebi, hafıza kullanımı ile ilgili sorunları hafıza kullanımı ile dahil ediyoruz ERDDAP™ . Bazıları hafıza yönetimindeki değişikliklerden geliyor Java Ayrıca Linux OS hafıza yönetimi ile etkileşimler. Starting I believe in Java 17, Java Heap ayarlarında yer alandan daha fazla hafıza kullanır. Bunu heap ayarlarınıza bakarsanız görebilirsiniz ve sonra uygulamanın hafıza kullanımını kontrol etmek için üst, htop veya btop gibi komutları kullanabilirsiniz. Örneğin ağır kullanımımız ERDDAP™ 21GB'de yer alan heap alanı var, ancak aslında hafıza kullanımı 28GB-30GB'ye, bazen daha yüksek olabilir. Bu değer, sisteme çok fazla eşzamanlı büyük istek varsa artabilir.

Çoğu Linux sistemlerinde, bir kez bellek kullanımı yaklaşık% 50'den fazla sürer, OS hafızayı takas etmeye başlayacaktır. Dahası, çoğu sistem takas alanı kesinlikle gerekli olana kadar toplanan çöp değildir, bunun için ERDDAP™ Çok geç ve neden olabilir ERDDAP™ Dondurmak için. Ve takas alanı yavaştır, büyük için datasets.xml Büyük güncellemelerin tamamlanmamasına neden olabilir, sonra sorunları birleştirin.

Bu konuda ne yapabilirsiniz. İlk olarak, gerçek hafıza kullanımını veya sisteminizi öğrenin ve hafıza kullanımının %50'yi aşmadığı için yeterli RAM'a sahip olun. Ancak bu davranışı değiştirebilecek iki ayar da vardır, vm.swappiness. ve vm.vfs_cache_bas.

vm.swappiness, Linux çekirdeğinin değişim alanını nasıl agresif bir şekilde kullandığını kontrol eder. Mevcut değerini kontrol edebilirsiniz:

> cat /proc/sys/vm/swappiness
>
• • • Temsil genellikle 60 (0 ila 100 arasında bir ölçek) .
• • • Alt değerler, sistemi daha az muhtemel bir şekilde takas eder.
• • • 10 veya 1 değeri genellikle birçok RAM ile sistemler için kullanılır.


10'a kadar değeri değiştirmek için:

> sudo sysctl vm.swappiness=10
>

Ve kalıcı olarak değiştirmek için:

> sudo nano /etc/sysctl.conf
>

Ve vm.swappiness için değerini düzenler. Sonra değişikliği uygulamak için:

> sudo sysctl -p
>

vm.vfs_cache_bas. Sisteme hafızayı yeniden talep etmeye nasıl agresif olduğunu söyler. Yüksek değerler. (100 veya daha fazlası) Sistemin daha agresif olmasını söyleyin, mevcut değeri kontrol etmek için:

> cat /proc/sys/vm/vfs_cache_pressure
>

Bir sonraki yeniden başlatmaya kadar değeri değiştirmek için:

> sudo sysctl vm.vfs_cache_pressure=150
>

Değeri kalıcı olarak değiştirmek için:

> sudo nano /etc/sysctl.conf
>

Ve sonra çizgiyi ekleyin veya güncelleyin:

> vm.vfs_cache_pressure = 100
>

Ve sonra değişikliği uygulayın:

> sudo sysctl -p
>


Uygulama alanı kullanımını izlerseniz ne yapabilirsiniz ve takas kullanımının artacağını fark ediyorsunuz? Boş bir uzay takas edecek ve içeriği hafızaya taşıyacak bir komut var. Bunu kullanmadan önce, mevcut hafızanın takas kullanımından daha büyük olduğundan emin olmanız gerekir. Mevcut hafızayı söylüyorum, çünkü Linux sistemleri ağır disk kullanımı ile “yapay hafıza” oldukça yüksek olabilir, bu yüzden “özgür hafıza” çok düşük olarak gösterilecek, ancak “cache memory” bunun gibi komutlara ihtiyaç duyulacak.

> sudo swapoff -a && sudo swapon -a
>

Sadece belli olmak için Çöp koleksiyonu da bunu yaptıktan sonra zorlamak istiyorum:

> sudo jcmd $(pgrep java) GC.run
>

Yine umarım bazı insanlar bu bilgiyi faydalı bulur. Biz yapmak istiyoruz ERDDAP™ Mümkün olduğunca sağlam ve insanların gerçekte nasıl çalıştığını mümkün olduğunca çabuk çalışmak.
