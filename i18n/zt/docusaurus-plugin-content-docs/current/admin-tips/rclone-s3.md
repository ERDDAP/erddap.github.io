此內容基于 [羅伊·門德爾索恩致 ERDDAP 使用者群組](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

最近我們收到多起詢問, ERDDAP™ . 首先 ERDDAP™ 2.29版本將改善 S3 存取功能, (多謝賽斯&#33;) . 但我之前提到過 使用基于 FUSE 的系統 讓 S3 商店在您的伺服器或 VM 上出現成檔案系統 。

其一, (https://rclone.org/) . rclone 在许多不同的 S3 系統上工作, 并且有很多不同的設定來优化性能, 包括設定缓存大小, 希望它能抵消一些运行 FUSE 的速罰 。 使用 rclone 的优点 ERDDAP TM 是 rclone 處理所有與 S3 的互動, 所以數據集類型像 EDDGrid 從 NcFiles 可以直接使用, 好像有本地檔案一樣 。 這意味著你只需要想出如何設置 Rclone 才能進入你的物件商店, 其他的只是普通的 Linux 類型設定 。

現在如果我把它留在那 而不舉個例子 我會失職的 我將匿名登上 NOAA 在Ubuntu伺服器的一個公開的 AWS S3 商店上的Goes17 資料, 在最初設置中, rclone 行程將在前線執行, 以更容易測試所有東西都起作用, 然後我會討論如何將 ii 轉換成在背景中執行的服務 。 注意下面的快取被設定為 1GB 。 可能會增加性能, 這些設定也是我的猜測, ERDDAP™ .


1. 安裝必要的軟體 :
————————————————————

sudo 完美更新
sudo apt 安裝 Rclone 引信 3 - 是的

2. 建立匿名的 S3 遙控器
———————————————————————

rclone 配置建立去 17 s3 \\
提供者 AWS \\
我們東方的區域
位置(_C)
env_aut 錯誤 \\
匿名的真

3. 試試看
——————

rcloneIsd去17:noaaa -goes17 | 頭部

4. 建立數據的挂载點
———————————————————————

sudo mkdir -p / mnt/goes17
Sudo chown 美元:USER /mnt/goes 17

5. 上載資料 。 (注意此行程在前景中執行, 所以會顯示一些輸出並坐在那裡 。) 
——————————

rclone -vv mount gos 17:noaa -goes 17/mnt/goes 17\\
- 只讀 ?
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

6. 在伺服器上開啟新分頁並檢查
——————————————————————————

是/mnt/goes 17 | 頭部

7. 檢查可以存取的資料
——————————————————————
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
弧度 -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
我們的設備沒有世界上最快的管道,

8. 做成系統服務 (酌情修改使用者等) :
—————————————————

a. 建立系統化單位 :

sudo 纳米/etc/ systemd/ system/rclone-goes17. service

而輸入 :

[單
描述= GOES17 公用 S3 的 Rclone 挂载
after=網路上 .tar 得到

[服務]
型態 :
使用者=ubuntu
ExecStart=/usr/bin/rclone Mount gos 17:noaa-goes17/mnt/goes17=
- 只讀 ?
-vfs - cache - mode 完整
-vfs-cache-max 大小 1G =
--vfs-cache-poll-interval 1米\\
--vfs- read-chunk 大小 64M \\
-vfs - read -chunk - 大小 - 限制 1G \\
-vfs - 讀取前端 256M \\
-- 缓冲大小 64M \\
-- dir- cache - time 24h \\
超時1秒
不時刻
-- s3 - 不檢查盒
Execstop=/bin/fusermount3 -u/mnt/goes17
重新啟動=永遠
重新啟動Sec=10

[安置]
通缉By=多使用者 .tar 得到

b. 開啟服務並啟動 :

sudo systemctl 戴蒙重載
sudo systemctl 啟用─現在是 rclone- goes17

丙. 測試

systemctl 狀態 rclone-goes17
是/mnt/goes 17 | 頭部



希望這對人們有用 我們在Google雲平台上用gcsfuse做測試, rclone的优点之一 (除此之外,它不是特定商家) 是它有更多的設定可以优化性能。 尤其是當地移動 ERDDAP™ 這可以讓轉變幾乎無缝
