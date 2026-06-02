此內容基于 [羅伊·門德爾索恩致 ERDDAP 使用者群組](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

執行 ERDDAP™ 在雲中 已經成為熱門的话题 我應該注意到 ERDDAP™ 通常在云中运行, 只是大部分時間不是在 商業云提供商提供的伺服器上, ERDDAP™ 在商業雲端提供商上, 如果你愿意付出更多的錢來使用你的商業云端提供商提供的區塊存取選項,

2025年12月1日, 我用電子郵件裝了GOES17的圖片, ERDDAP™ 讓一切順利 孩子們 你可以在家試試 不需要找律師或醫療顧問 我在此登上NCDC OI sst AWS 上的 avhrr v2.1, 設置在 ERDDAP™ 和展示結果。

- 第1步:在rclone中定義端點

rclone 配置建立 Oi sst s3 \\
提供者 AWS \\
我們東方的區域
位置(_C)
env_aut 錯誤 \\
匿名的真


- 第2步:建立數據集的挂载點

sudo mkdir -p / mnt/oi sst 
sudo chown "$ER:$ER"/mnt/oi sst 

- 第3步: 把 S3 儲存器挂載到挂载點

權限 權限 權限 權限... (向史蒂夫·博爾默道歉 如果你知道) ,

此挂载必須做到讓任何使用者執行您的 tomcat, 通常是使用者“ tomcat ” , 可以存取資料 。 「 rclone 」 以使用者的擁有者和群組上載數據集, 使用者會執行上載指令, 並想將資訊儲存在使用者的家用目錄中 (如果您設定為系統關卡行程, 這可能會減輕 - 见下文) . 因此, 如果您可以的話, 將挂載命令執行為 'tomcat' , 但如果像我們一樣, 您的Tomcat沒有主目錄, 您需要以不同的使用者來執行挂載命令 。 要如此編輯导火索 。 信任文件 :

1. sudo vi/etc/fuse.conf

2. 不註解或新增:

使用者(_Allow)

3. 保存和退出。


實際數據有幾層深, 我在數據層而不是在頂層上架設, 在 tmux 终端中執行指令, 所以指令繼續執行 :

rclone -vv mount oi 變更 sst :noaa-cdr-海面-時空-最佳插值-pds/data/v2.1/avhrr /月/日 sst ~
- 只讀 ?
其他的...
-vfs - cache - mode 完整
-vfs-cache-max 大小 1G =
--vfs-cache-poll-interval 1米\\
--vfs- read-chunk 大小 64M \\
-vfs - read -chunk - 大小 - 限制 1G \\
-vfs - 讀取前端 256M \\
-- 缓冲大小 64M \\
-- dir- cache - time 24h \\
超時1秒
不時


- 第4步: 使用產生代碼 XML就像正常的,

使用 EDDGrid 來自 NcFiles 的數據型態, 目錄為 /mnt/oi sst /. 最初的傳球很不錯 而且很有效 我對 xml 片段做了三次變更, 執行 GenerateDatasets 時可以做到 Xml和那些:

1. 變更數據集為 Oi sst 弧形

2. 目錄中包含一些以「 」 結束的檔案的混合 .nc " 和以 " 初步 .nc 而只有前者是可取的。 要更改文件名正则 :

 <fileNameRegex> 哦 sst -avhrr-v02r01\\.\\d&#123;8&#125; – .nc  </fileNameRegex> 

我經常說 我發現regex是生命的奥秘之一 可能還有更好的方法做regex 但這成功了

3. ioos_類別沒有設定,

Xml 片段可以使用多一點的編輯來更完整。

- 第5步: 新增 Xml 片段到 datasets.xml 擺放旗子

這需要很長的時間來裝填第一個通行證, 所以去找別的事做

最後的結果是:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

現在看,

若您使用此結果, 請先注意 Rclone 設定是第一個猜測, 並應做測試以优化 。 我們團隊的喬納森·謝爾曼已經看過這些 可能在IOOS DMAC會議的談話中談到這些 他在Google Cloud平台上也將報導更多與設置相關的議題, 例如如何協調 VM 的設定, 設置 S3 桶, ERDDAP™ 如何設置。 如果你對此有興趣 我建議你聽聽他的話 其 ERDDAP™ 因為目前無法從外面接通 NMFS 网易.

第二,這不是裝著AWS S3桶的AWS VM, 這是我們的伺服器之一, 我們的管子現在已經完全滿足了, 所以你會期望前一個設置比我之前做的快. (我們的管子不太大,謝謝 NMFS -但我們是否滿足過 -對數據的需求是惊人的) .

最後你可能會想 我想自己翻,除此之外我還能從哪開始呢? 我發現LLMS最擅長的就是 熟知和記錄的資訊 我查過的AI (我的符號都掉了&#33;) 大家都很了解 Rclone 和 AWS 和 GCP, 而且可以為你做大部分的設計。 雖然我為自己的設計做了一些編輯。

還有,記住塞斯為目前的版本寫了新的S3 (2.30) 四, ERDDAP™ - 我沒有比對速度,而我想像看你們在做什麼 每個人都有它的優點 移植到已有的 ERDDAP™ 安裝, 使用 rclone 可以简化行程 。

-羅伊

PS - 記住 Rclone 專業於各種銷售商,


做成系統服務 (酌情修改使用者等) :
—————————————————

[單
描述= Rclone 挂载 NOAA OISST 在AWS上
想要=联网 .tar 得到
after=網路上 .tar 得到

[服務]
類型=通知
使用者
群組=您的群組

ExecStart=/usr/bin/rclone Mount oi sst :noaa-cdr-海面-時空-最佳插值-pds/data/v2.1/avhrr /月/日 sst ~
- 只讀 ?
其他的...
0755年?
0644 \\ #
-vfs - cache - mode 完整
-vfs-cache-max 大小 1G =
--vfs-cache-poll-interval 1米\\
--vfs- read-chunk 大小 64M \\
-vfs - read -chunk - 大小 - 限制 1G \\
-vfs - 讀取前端 256M \\
-- 缓冲大小 64M \\
-- dir- cache - time 24h \\
超時1秒
不時

Execstop=/bin/fusermount 中 - 嗯,/mnt/oi sst 
重新啟動=失敗
重新啟動Sec=10

[安置]
通缉By=多使用者 .tar 得到
