这一内容基于 [罗伊·门德尔索恩致 ERDDAP 用户组](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) 。 。 。 。

我们收到的很多帮助请求都涉及到内存使用的问题 ERDDAP™ 。 。 。 其中一些来自内存管理的变化 Java ,并与Linux OS内存管理进行交互. 我开始相信 Java 17岁, Java 使用比堆积设置中放下的更多内存. 如果您查看了您的堆积设置, 然后使用诸如顶部、 htop 或 btop 等命令来检查应用程序的内存使用情况, 您可以看到这个 。 举个例子,我们被大量使用 ERDDAP™ 将堆积空间设置在 21GB, 但实际上内存的使用可以运行到 28GB- 30GB, 有时更高。 如果同时对系统提出大量要求,这个值可能会激增。

在大多数Linux系统中,一旦内存使用率超过50%左右,OS就会开始互换内存. 此外,对于大多数系统交换空间来说,在绝对必要之前,不收集垃圾,因为 ERDDAP™ 来不及了,有原因的 ERDDAP™ 要冻结。 和交换空间是缓慢的, 对于大 datasets.xml 可以导致重大更新不完成,从而加剧问题。

你能怎么办呢? 首先,找出真实的内存使用情况或您的系统,并有足够的内存,这样内存使用情况不会超过50%. 但也有两种设置可以改变这种行为,vm.swappiness. 和 vm.vfs_cache_压力。

vm.swappiness 控制 Linux 内核使用交换空间的激烈性. 您可以用 :

> cat /proc/sys/vm/swappiness
>
• 支助 默认为60 (比例从0到100) 。 。 。 。
• 支助 数值较低使得系统更不可能互换.
• 支助 10或1的值常用于内存丰富的系统.


要更改数值直到重启, 请说为 10 :

> sudo sysctl vm.swappiness=10
>

并永久更改:

> sudo nano /etc/sysctl.conf
>

而编辑 vm.swappiness 的值. 然后应用修改:

> sudo sysctl -p
>

vm.vfs_cache_压力. 告诉系统在恢复记忆时有多积极 更高的价值。 (100岁或以上) 告诉系统更具攻击性, 检查当前值 :

> cat /proc/sys/vm/vfs_cache_pressure
>

更改值以待下次重启 :

> sudo sysctl vm.vfs_cache_pressure=150
>

要永久更改值 :

> sudo nano /etc/sysctl.conf
>

然后添加或更新该行:

> vm.vfs_cache_pressure = 100
>

然后应用修改:

> sudo sysctl -p
>


如果您监视您的交换空间使用, 并且您注意到交换使用开始增加, 您能做什么 ? 有一个命令会空置交换空间,并将内容移动到内存中. 在使用前,需要确定可用的内存大于互换使用. 我说可用的内存是因为在磁盘使用量大的Linux系统中,“cached内存”可能相当高,所以“free内存”将显示非常低,但是,如果需要这样的命令,“cache内存”将会提供。

> sudo swapoff -a && sudo swapon -a
>

只是为了确定 我喜欢强迫垃圾收集 之后:

> sudo jcmd $(pgrep java) GC.run
>

我再次希望有些人认为这一信息是有用的。 我们想做 ERDDAP™ 尽可能的坚固, 并尽可能的无缝工作 与人们的实际工作。
