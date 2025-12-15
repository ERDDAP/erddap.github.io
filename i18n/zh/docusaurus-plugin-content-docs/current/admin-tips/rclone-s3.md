这一内容基于 [罗伊·门德尔索恩致 ERDDAP 用户组](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) 。 。 。 。

最近,我们收到一些查询,寻求帮助访问AWS S3的文件。 ERDDAP™ 。 。 。 。 首先, ERDDAP™ 2.29版本将改进S3访问,它也应与非AWS对象商店合作。 (谢谢赛斯&#33;) 。 。 。 但我之前提到过 使用基于FUSE的系统 使S3商店 看起来像一个文件系统 在你的服务器或VM。

这样做的一种方法是使用“克隆”。 (https://rclone.org/) . rclone在许多不同的S3系统中工作,并且有许多不同的设置来优化性能,包括设置缓存大小,希望这能够抵消运行FUSE时的一些速度罚单. 使用rclone的优点 ERDDAP TM是 rclone 处理所有与 S3 的相互作用,所以数据集类型像 EDDGrid 从NcFiles可以直接使用,好像有本地文件一样. 这意味着你只需要想出如何设置rclone就可以进入你的对象商店,剩下的只是普通的Linux类型设置.

现在,如果我只留下它,而不举个例子,那我就失职了。 下面我要匿名登上 NOAA Goes17数据是使用于我们Ubuntu服务器之一的可公开访问的AWS S3商店,在初始设置中,rclone进程将在前台运行,以方便测试一切在起作用,然后我将讨论如何将 ii 变成一个在背景中运行的服务. 注意在下面的内容中,缓存被设定为1GB. 通过使缓存大得多,例如5GB-10GB或甚至更大,可以提高性能。 这些设置也是我对什么可以优化性能的猜测,但可能不是最佳的 ERDDAP™ 。 。 。 。


1. 安装必要的软件 :
————————————————————

sudo 适切更新
sudo apt 安装 Rclone 引信 3 -对

2. 创建一个匿名的 S3 远程
———————————————————————

rclone 配置创建去 17 s3 \\
提供者 AWS \\
我们东一区
位置(_C)
env_aut 错误\\
匿名真实

3. 测试一下
——————

rclone lsd gos 17:noaaa -goes17 (英语). | 头

4. 为数据创建挂载点
———————————————————————

sudo mkdir - p / mnt/goes 17 (法语)
Sudo Chown 美元:美元/月/日

5. 挂载数据。 (注意此进程在前景中运行, 因此将显示一些输出并坐在那里) 
——————————

rclone -vv Mount gos 17:noaa -goes 17 / mnt/goes 17\\
-- 只读 \\
-vfs - cache - mode 完整 \\
-vfs-cache-max 大小 1G 大小 -\\
--vfs-cache-poll-interval (英语). 1米长
--vfs- read-chunk 大小 &#123;\fn华文楷体\fs16\\1cHE0E0E0&#125;64M &#123;\fn华文楷体\fs16\\1cHE0E0E0&#125;你在哪里?
-vfs - read -chunk - 大小 - 限制 1G \\
--vfs-read-ahead (英语). 256门
-- 缓冲大小 64M \\
- 时间24小时
超时1秒
无调制时间

6. 在服务器上打开新标签并检查
——————————————————————————

属于/mnt/goes17 | 头

7. 检查是否可以访问数据
——————————————————————
页:1
数字 - 嘘 OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c202301015414661 互联网档案馆的存檔,存档日期2011-09-04. .nc 
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
特别是因为我们的装置没有世界上最快的管道。

8. 成为系统服务 (酌情修改用户等) 数字 :
—————————————————

(单位:千美元) 创建系统单元 :

sudo纳米/etc/systemd/system/rclone-goes17. 服务

输入 :

[单位]
说明=GOES17公共S3的Rclone挂载
后=网络上 .tar 起来

[服务]
类型=简单
用户=ubuntu
ExecStart=/usr/bin/rclone Mount gos 17:noaa-goes 17/mnt/goes 17\\
-- 只读 \\
-vfs - cache - mode 完整 \\
-vfs-cache-max 大小 1G 大小 -\\
--vfs-cache-poll-interval (英语). 1米长
--vfs- read-chunk 大小 &#123;\fn华文楷体\fs16\\1cHE0E0E0&#125;64M &#123;\fn华文楷体\fs16\\1cHE0E0E0&#125;你在哪里?
-vfs - read -chunk - 大小 - 限制 1G \\
--vfs-read-ahead (英语). 256门
-- 缓冲大小 64M \\
- 时间24小时
超时1秒
无时无刻
-s3 -不检查-盒
Execstop=/bin/fusermount3 -u /mnt/goes17 (中文(简体) ).
重新开始=永远
重新启动Sec=10

[安
通缉By=多用户 .tar 起来

(b) 国家 启用服务并启动 :

sudo 系统ctl 守护进程重装
sudo systemctl 启用 -- 现在的 rclone-goes17

c. 调用 测试

systemctl 状态 rclone-goes17
属于/mnt/goes17 | 头



希望这对人们有用。 我们一直在Google云平台上使用gcsfuse进行测试,用一个具有等级命名空间的桶,取得了一定的成功. rclone的一个优势 (除此之外,它不是针对供应商的) 因为它有更多的设置来优化性能。 特别是如果你正在移动一个本地 ERDDAP™ 到云,这可以使过渡几乎无缝。
