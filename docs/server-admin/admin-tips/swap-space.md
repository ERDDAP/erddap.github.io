This content is based on a [message from Roy Mendelssohn to the ERDDAP users group](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ).

A lot of the help requests we get involve problems with memory usage in ERDDAP™. Some of this comes from changes in memory management in Java, and also interactions with Linux OS memory management. Starting I believe in Java 17, Java uses more memory than what is put down in the heap settings. You can see this if you look at your heap settings and then use commands such as top, htop, or btop to check the memory usage of applications. So for example our heavily used ERDDAP™ has heap space set at 21GB, but actually memory use can run to 28GB-30GB, sometimes higher. This value can spike if there is a lot of simultaneous large requests to the system.

On most Linux systems, once memory usage gets above about 50%, the OS will start swapping out memory. Moreover, for most systems swap space is not garbage collected until absolutely necessary, which for ERDDAP™ is too late, and can cause ERDDAP™ to freeze. And swap space is slow, which for large datasets.xml can cause major updates not to complete, which then compound the problems.

What can you do about this. First, find out the true memory usage or your system, and have enough RAM so that the memory usage does not exceed 50%. But there are also two settings that can change this behavior, vm.swappiness. and vm.vfs_cache_pressure.

vm.swappiness controls how aggressively the Linux kernel uses swap space. You can check its current value with:

> cat /proc/sys/vm/swappiness
>
• Default is usually 60 (on a scale from 0 to 100).
• Lower values make the system less likely to swap.
• A value of 10 or 1 is often used for systems with plenty of RAM.


To change the value until reboot, say to 10:

> sudo sysctl vm.swappiness=10
>

And to change permanently:

> sudo nano /etc/sysctl.conf
>

And edit the value for vm.swappiness. Then to apply the change:

> sudo sysctl -p
>

vm.vfs_cache_pressure. tells the system how aggressive to be in reclaiming memory. Higher values. (100 or more) tell the system to be more aggressive, To check the present value:

> cat /proc/sys/vm/vfs_cache_pressure
>

To change the value till the next reboot:

> sudo sysctl vm.vfs_cache_pressure=150
>

To change the value permanently:

> sudo nano /etc/sysctl.conf
>

And then add or update the line:

> vm.vfs_cache_pressure = 100
>

And then apply the change:

> sudo sysctl -p
>


What can you do if you monitor your swap space usage and you notice that swap usage is beginning to increase? There is a command that will empty swap space and move the contents to memory. Before using this, you need to make certain that available memory is larger than swap usage. I say available memory because in Linux systems with heavy disk usage “cached memory” can be quite high, so “free memory” will show as being very low, but “cache memory” will be made available if needed for commands like this.

> sudo swapoff -a && sudo swapon -a
>

Just to be certain I like to force garbage collection also after doing this:

> sudo jcmd $(pgrep java) GC.run
>

Again I hope some people find this information useful. We want to make ERDDAP™ as robust as possible, and to work as seamlessly as possible with how people actually work.