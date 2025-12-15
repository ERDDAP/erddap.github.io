此內容基于 [羅伊·門德爾索恩致 ERDDAP 使用者群組](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

我們收到的很多幫助要求 都涉及到內存用法的問題 ERDDAP™ . 其中一部分來自內存管理的改變 Java , 并与 Linux OS 記憶體管理器互動。 我開始相信 Java 17, Java 使用的記憶體比在堆積的設定中要多 。 您可以看到這個, 若您查看您的堆積設定, 然後使用上部、 htop 或 btop 等命令來檢查應用程式的內存用量 。 譬如說我們用得很重 ERDDAP™ 但實際上的內存使用可以跑到28GB-30GB, 如果系統有許多同時的大型要求, 此值可能會激增 。

在Linux系統上, 一旦內存用量超过50%, OS就會開始互換內存 。 而且,對大多數系統互換空間來說,除非有完全必要,否则不收集垃圾。 ERDDAP™ 太晚了,可能會造成 ERDDAP™ 冷藏。 而互換的空間很慢,對大 datasets.xml 可能會使主要更新不完成, 這會使問題更加複雜。

你能做些什么呢? 首先, 找出真正的內存用量或您的系統, 並且有足夠的RAM, 以便內存用量不超过50% 。 但也有兩個設定可以改變此行為, vm. swappy. 和 vm.vfs_cache_壓力 。

vm. swappiness 控制 Linux 內核使用互換空間的強烈性。 您可以用 :

> cat /proc/sys/vm/swappiness
>
· 預設值一般是60 (0到100) .
· 值降低會降低系統互換的可能性 。
· 數值為 10 或 1 的系統常被使用於 RAM 多數的系統 。


要改變數值直到重新啟動, 對 10 :

> sudo sysctl vm.swappiness=10
>

要永久更改 :

> sudo nano /etc/sysctl.conf
>

並編輯 vm. swappiness 的值 。 然后应用變更 :

> sudo sysctl -p
>

vm.vfs_cache_壓縮 。 告訴系統在恢復記憶方面有多強烈 更高的價值。 (100或以上) 要讓系統更具攻擊性, 檢查目前的值 :

> cat /proc/sys/vm/vfs_cache_pressure
>

要變更值到下次重新啟動 :

> sudo sysctl vm.vfs_cache_pressure=150
>

永久變更值 :

> sudo nano /etc/sysctl.conf
>

然后添加或更新此行 :

> vm.vfs_cache_pressure = 100
>

然后应用變更 :

> sudo sysctl -p
>


如果你監控您的互換空間用量 並且注意到互換用量開始增加, 你能做什麼? 有命令會空置空間, 將內容移到內存 。 在使用前, 您需要確定可用的內存大于互換用量 。 我認為可用的記憶體是因為在Linux系統中,

> sudo swapoff -a && sudo swapon -a
>

只是想確定 我也喜歡強制收集垃圾,

> sudo jcmd $(pgrep java) GC.run
>

希望有些人認為這項資訊有用。 我們想做 ERDDAP™ 盡可能堅強 盡可能與人合作
