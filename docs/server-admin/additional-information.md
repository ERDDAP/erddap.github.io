---
sidebar_position: 4
---
ERDDAP™ - Set Up Your Own ERDDAP™    

## Things You Need To Know {#things-you-need-to-know}
     
###   **[Proxy Errors](#proxy-errors)** {#proxy-errors}
Sometimes, a request to ERDDAP™ will return a Proxy Error, an HTTP 502 Bad Gateway Error, or some similar error. These errors are being thrown by Apache or Tomcat, not ERDDAP™ itself.
*   If every request generates these errors, especially when you are first setting up your ERDDAP™, then it probably is a proxy or bad gateway error, and the solution is probably to fix [ERDDAP's proxy settings](/docs/server-admin/deploy-install#proxypass). This may also be the problem when an established ERDDAP™ suddenly starts throwing these errors for every request.
*   Otherwise, "proxy" errors are usually actually time out errors thrown by Apache or Tomcat. Even when they happen relatively quickly, it is some sort of response from Apache or Tomcat that occurs when ERDDAP™ is very busy, memory-limited, or limited by some other resource. In these cases, see the advice below to deal with [ERDDAP™ responding slowly](#responding-slowly).
        
Requests for a long time range (>30 time points) from a gridded dataset are prone to time out failures, which often appear as Proxy Errors, because it takes significant time for ERDDAP™ to open all of the data files one-by-one. If ERDDAP™ is otherwise busy during the request, the problem is more likely to occur. If the dataset's files are compressed, the problem is more likely to occur, although it's hard for a user to determine if a dataset's files are compressed.  
The solution is to make several requests, each with a smaller time range. How small of a time range? I suggest starting really small (~30 time points?), then (approximately) double the time range until the request fails, then go back one doubling. Then make all the requests (each for a different chunk of time) needed to get all of the data.  
An ERDDAP™ administrator can lessen this problem by increasing the [Apache timeout settings](/docs/server-admin/deploy-install#apache-timeout).
        
### Monitoring {#monitoring}
We all want our data services to find their audience and be extensively used, but sometimes your ERDDAP™ may be used too much, causing problems, including super slow responses for all requests. Our plan to avoid problems is:

*   Monitor ERDDAP™ via the [status.html web page](#status-page).  
    It has tons of useful information. If you see that a huge number of requests are coming in, or tons of memory being used, or tons of failed requests, or each Major LoadDatasets is taking a long time, or see any sign of things getting bogged down and responding slowly, then look in ERDDAP's [log.txt file](#log) to see what's going on.
    
    It's also useful to simply note how fast the status page responds. If it responds slowly, that is an important indicator that ERDDAP™ is very busy.
    
*   Monitor ERDDAP™ via the [Daily Report](#daily-report) email.  
     
*   Watch for out-of-date datasets via the *baseUrl*/erddap/outOfDateDatasets.html web page which is based on the optional [testOutOfDate](/docs/server-admin/datasets#testoutofdate) global attribute.  
     
#### External Monitors {#external-monitors}
The methods listed above are ERDDAP's ways of monitoring itself. It is also possible to make or use external systems to monitor your ERDDAP. One project to do this is [Axiom's erddap-metrics project](https://github.com/axiom-data-science/erddap-metrics). Such external systems have some advantages:
*   They can be customized to provide the information you want, displayed in the way you want.
*   They can include information about ERDDAP™ that ERDDAP™ can't access easily or at all (for example, CPU usage, disk free space, ERDDAP™ response time as seen from the user's perspective, ERDDAP™ uptime,
*   They can provide alerts (emails, phone calls, texts) to administrators when problems exceed some threshold.  
             
### Multiple Simultaneous Requests {#multiple-simultaneous-requests}
*   **Blacklist users making multiple simultaneous requests!**
    If it is clear that some user is making more than one simultaneous request, repeatedly and continuously, then add their IP address to ERDDAP's [&lt;requestBlacklist>](/docs/server-admin/datasets#requestblacklist) in your datasets.xml file.   Sometimes the requests are all from one IP address. Sometimes they are from multiple IP addresses, but clearly the same user. You can also blacklist people making tons of invalid requests or tons of mind-numbingly inefficient requests.
    
    Then, for each request they make, ERDDAP™ returns:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \[ERDDAP™ administrator's email address\] to request to be taken off of the blacklist.
    
    Hopefully the user will see this message and contact you to find out how to fix the problem and get off the blacklist. Sometimes, they just switch IP addresses and try again.
    
    It is like the balance of power between offensive and defensive weapons in war. Here, the defensive weapons (ERDDAP) have a fixed capacity, limited by the number of cores in the CPU, the disk access bandwidth, and the network bandwidth. But the offensive weapons (users, notably scripts) have unlimited capacity:
    
    *   A single request for data from a lot of time points may cause ERDDAP to open a huge number of files (in sequence or partly multi-threaded). In extreme cases, one "simple" request can easily tie up the RAID attached to ERDDAP™ for a minute, effectively blocking the handling of other requests.  
         
    *   A single request may consume a large chunk of memory (even though ERDDAP™ is coded to minimize the memory needed to handle large requests).  
         
    *   Parallelization -  
        It is easy for a clever user to parallelize a big task by generating lots of threads, each of which submits a separate request (which may be large or small). This behavior is encouraged by the computer science community as an efficient way to deal with a large problem (and parallelizing is efficient in other circumstances). Going back to the war analogy: users can make an essentially unlimited number of simultaneous requests with the cost of each being essentially zero, but the cost of each request coming into ERDDAP™ can be large and ERDDAP's response capability is finite. Clearly, ERDDAP™ will lose this battle, unless the ERDDAP™ administrator blacklists users who are making multiple simultaneous requests which are unfairly crowding out other users.  
         
    *   Multiple Scripts -  
        Now think about what happens when there are several clever users each running parallelized scripts. If one user can generate so many requests that other users are crowded out, then multiple such users can generate so many requests that ERDDAP™ becomes overwhelmed and seemingly unresponsive. It is effectively a [DDOS attack](https://en.wikipedia.org/wiki/Denial-of-service_attack) Again, the only defense for ERDDAP™ is to blacklist users making multiple simultaneous requests which are unfairly crowding out other users.  
         
    *   Inflated Expectations -  
        In this world of massive tech companies (Amazon, Google, Facebook, ...), users have come to expect essentially unlimited capabilities from the providers. Since these companies are money making operations, the more users they have, the more revenue they have to expand their IT infrastructure. So they can afford a massive IT infrastructure to handle requests. And they cleverly limit the number of requests and cost of each request from users by limiting the kinds of requests that users can make so that no single request is burdensome, and there is never a reason (or a way) for users to make multiple simultaneous requests. So these huge tech companies may have far more users than ERDDAP™, but they have massively more resources and clever ways to limit the requests from each user. It's a manageable situation for the big IT companies (and they get rich!) but not for ERDDAP™ installations. Again, the only defense for ERDDAP™ is to blacklist users making multiple simultaneous requests which are unfairly crowding out other users.  
         
    
    So users: Don't make multiple simultaneous requests or you will be blacklisted!  
     

Clearly, it is best if your server has a lot of cores, a lot of memory (so you can allocate a lot of memory to ERDDAP™, more than it ever needs), and a high bandwidth internet connection. Then, memory is rarely or never a limiting factor, but network bandwidth becomes the more common limiting factor. Basically, as there are more and more simultaneous requests, the speed to any given user decreases. That naturally slows down the number of requests coming in if each user is just submitting one request at a time.
    
### ERDDAP™ Getting Data from THREDDS {#erddap-getting-data-from-thredds}
If your ERDDAP™ gets some of its data from a THREDDS at your site, there are some advantages to making a copy of the THREDDS data files (at least for the most popular datasets) on another RAID that ERDDAP™ has access to so that ERDDAP™ can serve data from the files directly. At ERD, we do that for our most popular datasets.

*   ERDDAP™ can get the data directly and not have to wait for THREDDS to reload the dataset or ...
*   ERDDAP™ can notice and incorporate new data files immediately, so it doesn't have to pester THREDDS frequently to see if the dataset has changed. See [&lt;updateEveryNMillis>](/docs/server-admin/datasets#updateeverynmillis).
*   The load is split between 2 RAIDS and 2 servers, instead of the request being hard on both ERDDAP™ and THREDDS.
*   You avoid the mismatch problem caused by THREDDS having a small (by default) maximum request size. ERDDAP™ has a system to handle the mismatch, but avoiding the problem is better.
*   You have a backup copy of the data which is always a good idea.

In any case, don't ever run THREDDS and ERDDAP™ in the same Tomcat. Run them in separate Tomcats, or better, on separate servers.

We find that THREDDS periodically gets in a state where requests just hang. If your ERDDAP™ is getting data from a THREDDS and the THREDDS is in this state, ERDDAP™ has a defense (it says the THREDDS-based dataset isn't available), but it is still troublesome for ERDDAP™ because ERDDAP™ has to wait until the timeout each time it tries to reload a dataset from a hung THREDDS. Some groups (including ERD) avoid this by proactively restarting THREDDS frequently (e.g., nightly in a cron job).

### Responding Slowly {#responding-slowly}
*   **If ERDDAP™ Is Responding Slowly** or if just certain requests are responding slowly,  
    you may be able to figure out if the slowness is reasonable and temporary (e.g., because of lots of requests from scripts or WMS users), or if something is inexplicably wrong and you need to [shut down and restart Tomcat and ERDDAP™](#shut-down-and-restart).
    
    If ERDDAP™ is responding slowly, see the advice below to determine the cause, which hopefully will enable you to fix the problem.  
    You may have a specific starting point (e.g., a specific request URL) or a vague starting point (e.g., ERDDAP™ is slow).  
    You may know the user involved (e.g., because they emailed you), or not.  
    You may have other clues, or not.  
    Since all of these situations and all of the possible causes of the problems blur together, the advice below tries to deal with all possible starting points and all possible problems related to slow responses.
    
    *   **Look for clues in [ERDDAP's log file](#log)** (*bigParentDirectory*/logs/log.txt).  
        \[On rare occasions, there are clues in [Tomcat's log file](#tomcat-logs) (*tomcat*/logs/catalina.out).\]  
        Look for error messages.  
        Look for a large number of requests coming from one (or a few) users and perhaps hogging a lot of your server's resources (memory, CPU time, disk access, internet bandwidth).
        
        If the trouble is tied to **one user**, you can often get a clue about who the user is via web services like [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) that can give you information related to the user's IP address (which you can find in ERDDAP's [log.txt](#log) file).
        
        *   If the user seems to be a **bot** behaving badly (notably, a search engine trying to fill out the ERDDAP™ forms with every possible permutation of entry values), make sure you have properly set up your server's [robots.txt](#robotstxt) file.
        *   If the user seems to be a **script(s)** that is making multiple simultaneous requests, contact the user, explain that your ERDDAP™ has limited resources (e.g., memory, CPU time, disk access, internet bandwidth), and ask them to be considerate of other users and just make one request at a time. You might also mention that you will blacklist them if they don't back off.
        *   If the user seems to be a **script** making a large number of time-consuming requests, ask the user to be considerate of other users by putting a small pause (2 seconds?) in the script between requests.
        *   **WMS client software** can be very demanding. One client will often ask for 6 custom images at a time. If the user seems to be a WMS client that is making legitimate requests, you can:
            *   Ignore it. (recommended, because they'll move on pretty soon)
            *   Turn off your server's WMS service via ERDDAP's setup.html file. (not recommended)
        *   If the requests seem **stupid, insane, excessive, or malicious,** or if you can't resolve the problem any other way, consider temporarily or permanently adding the user's IP address to the [&lt;requestBlacklist> in your datasets.xml file](/docs/server-admin/datasets#requestblacklist).  
             
    *   **Try to duplicate the problem yourself, from your computer.**  
        Figure out if the problem is with one dataset or all datasets, for one user or all users, for just certain types of requests, etc..  
        If you can duplicate the problem, try to narrow down the problem.  
        If you can't duplicate the problem, then the problem may be tied to the user's computer, the user's internet connection, or your institution's internet connection.  
         
    *   If just **one dataset** is responding slowly (perhaps only for **one type of request** from one user), the problem may be:
        *   ERDDAP's access to the dataset's source data (notably from relational databases, Cassandra, and remote datasets) may be temporarily or permanently slow. Try to check the source's speed independent of ERDDAP. If it is slow, perhaps you can improve it.
        *   Is the problem related to the specific request or general type of request?  
            The larger the requested subset of a dataset, the more likely the request will fail. If the user is making huge requests, ask the user to make smaller requests that are more likely to get a fast and successful response.
            
            Almost all data sets are better at handling some types of requests than others types of requests. For example, when a dataset stores different time chunks in different files, requests for data from a huge number of time points may be very slow. If the current requests are of a difficult type, consider offering a variant of the dataset that is optimized for these requests. Or just explain to the user that that type of request is difficult and time consuming, and ask for their patience.
            
        *   The dataset may be not optimally configured. You may be able to make changes to the dataset's datasets.xml chunk to help ERDDAP™ handle the dataset better. For example,
            
            *   EDDGridFromNcFiles datasets that access data from compressed nc4/hdf5 files are slow when getting data for the entire geographic range (e.g., for a world map) because the entire file must be decompressed. You could convert the files to uncompressed files, but then the disk space requirement will be much, much larger. It is probably better to just accept that such datasets will be slow in certain circumstances.
            *   The configuration of the [&lt;subsetVariables>](/docs/server-admin/datasets#subsetvariables) tag has a huge influence on how ERDDAP™ handles EDDTable datasets.
            *   You may be able to increase the [speed of an EDDTableFromDatabase](/docs/server-admin/datasets#database-speed) dataset.
            *   Many EDDTable datasets can be sped up by [storing a copy of the data in NetCDF Contiguous Ragged Array files](/docs/server-admin/datasets#eddtablefromfiles), which ERDDAP™ can read very quickly.
            
            If you want help speeding up a specific dataset, include a description of the problem and the dataset's chunk of datasets.xml and see our [section on getting additional support](/docs/intro#support).
             
    *   If **everything** in ERDDAP™ is **always** slow, the problem may be:
        *   The computer that is running ERDDAP™ may not have enough memory or processing power. It is good to run ERDDAP™ on a modern, multi-core server. For heavy use, the server should have a 64-bit operating system and 8 GB or more of memory.
        *   The computer that is running ERDDAP™ may be also running other applications that are consuming lots of system resources. If so, can you get a dedicated server for ERDDAP? For example (this is not an endorsement), you can get a quad-core Mac Mini Server with 8 GB of memory for ~$1100.  
             
    *   If **everything** in ERDDAP™ is **temporarily** slow, view your ERDDAP's [**/erddap/status.html page**](#status-page) in your browser.
        *   Does the ERDDAP™ status page fail to load?  
            If so, [restart ERDDAP™](#shut-down-and-restart).
        *   Did the ERDDAP™ status page load slowly (e.g., >5 seconds)?  
            That is a sign that everything in ERDDAP™ is running slowly, but it isn't necessarily trouble. ERDDAP™ may just be really busy.
        *   For "Response Failed Time (since last major LoadDatasets)", is n= a large number?  
            That indicates there have been lots of failed requests recently. That may be trouble or the start of trouble. The median time for the failures is often large (e.g., 210000 ms),  
            which means that there were (are?) lots of active threads.  
            which were tying up lots of resources (like memory, open files, open sockets, ...),  
            which is not good.
        *   For "Response Succeeded Time (since last major LoadDatasets)", is n= a large number?  
            That indicates there have been lots of successful requests recently. This isn't trouble. It just means your ERDDAP™ is getting heavy use.
        *   Is the "Number of non-Tomcat-waiting threads" double a typical value?  
            This is often serious trouble that will cause ERDDAP™ to slow down and eventually freeze. If this persists for hours, you may want to proactively [restart ERDDAP™](#shut-down-and-restart).
        *   At the bottom of the "Memory Use Summary" list, is the last "Memory: currently using" value very high?  
            That may just indicate high usage, or it may be a sign of trouble.
        *   Look at the list of threads and their status. Are an unusual number of them doing something unusual?  
             
    *   Is **your institution's internet connection** currently slow?  
        Search the internet for "internet speed test" and use one of the free online tests, such as [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/). If your institution's internet connection is slow, then connections between ERDDAP™ and remote data sources will be slow, and connections between ERDDAP™ and the user will be slow. Sometimes, you can solve this by stopping unnecessary internet use (e.g., people watching streaming videos or on video conference calls).  
         
    *   Is **the user's internet connection** currently slow?  
        Have the user search the internet for "internet speed test" and use one of the free online tests, such as [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/). If the user's internet connection is slow, it slows down their access to ERDDAP. Sometimes, they can solve this by stopping unnecessary internet use at their institution (e.g., people watching streaming videos or on video conference calls).  
         
    *   **Stuck?**  
        See our [section on getting additional support](/docs/intro#support). 

### Shut Down and Restart {#shut-down-and-restart}
*   **How to Shut Down and Restart Tomcat and ERDDAP™**  
    You don't need to shut down and restart Tomcat and ERDDAP if ERDDAP™ is temporarily slow, slow for some known reason (like lots of requests from scripts or WMS users), or to apply changes to datasets.xml file.
    
    You do need to shut down and restart Tomcat and ERDDAP™ if you need to apply changes to the setup.xml file, or if ERDDAP™ freezes, hangs, or locks up. In extreme circumstances, Java may freeze for a minute or two while it does a full garbage collection, but then recover. So it is good to wait a minute or two to see if Java/ERDDAP™ is really frozen or if it is just doing a long garbage collection. (If garbage collection is a common problem, [allocate more memory to Tomcat](/docs/server-admin/deploy-install#memory).)
    
    I don't recommend using the Tomcat Web Application Manager to start or shutdown Tomcat. If you don't fully shutdown and startup Tomcat, sooner or later you will have PermGen memory issues.
    
    To shutdown and restart Tomcat and ERDDAP:  
    
    *   If you use Linux or a Mac:  
        (If you have created a special user to run Tomcat, e.g., tomcat, remember to do the following steps as that user.)  
         
        1.  Use cd *tomcat*/bin  
             
        2.  Use ps -ef | grep tomcat to find the java/tomcat processID (hopefully, just one process will be listed), which we'll call *javaProcessID* below.  
             
        3.  If ERDDAP™ is frozen/hung/locked up, use kill -3 *javaProcessID* to tell Java (which is running Tomcat) to do a thread dump to the Tomcat log file: *tomcat*/logs/catalina.out . After you reboot, you can diagnose the problem by finding the thread dump information (and any other useful information above it) in *tomcat*/logs/catalina.out and also by reading relevant parts of the [ERDDAP™ log archive](#log). If you want, you can include that information and see our [section on getting additional support](/docs/intro#support).  
             
        4.  Use ./shutdown.sh  
             
        5.  Use ps -ef | grep tomcat repeatedly until the java/tomcat process isn't listed.
            
            Sometimes, the java/tomcat process will take up to two minutes to fully shut down. The reason is: ERDDAP™ sends a message to its background threads to tell them to stop, but sometimes it takes these threads a long time to get to a good stopping place.
            
        6.  If after a minute or so, java/tomcat isn't stopping by itself, you can use  
            kill -9 *javaProcessID*  
            to force the java/tomcat process to stop immediately. If possible, use this only as a last resort. The -9 switch is powerful, but it may cause various problems.  
             
        7.  To restart ERDDAP™, use ./startup.sh  
             
        8.  View ERDDAP™ in your browser to check that the restart succeeded. (Sometimes, you need to wait 30 seconds and try to load ERDDAP™ again in your browser for it to succeed.)  
             
    *   If you use Windows:  
         
        1.  Use cd *tomcat*/bin  
             
        2.  Use shutdown.bat  
             
        3.  You may want/need to use the Windows Task Manager (accessible via Ctrl Alt Del) to ensure that the Java/Tomcat/ERDDAP™ process/application has fully stopped.  
            Sometimes, the process/application will take up to two minutes to shut down. The reason is: ERDDAP™ sends a message to its background threads to tell them to stop, but sometimes it takes these threads a long time to get to a good stopping place.  
             
        4.  To restart ERDDAP™, use startup.bat  
             
        5.  View ERDDAP™ in your browser to check that the restart succeeded. (Sometimes, you need to wait 30 seconds and try to load ERDDAP™ again in your browser for it to succeed.)  
             
### Frequent Crashes or Freezes {#frequent-crashes-or-freezes}
If ERDDAP™ becomes slow, crashes or freezes, something is wrong. Look in [ERDDAP's log file](#log) to try to figure out the cause. If you can't, please include the details and see our [section on getting additional support](/docs/intro#support).

The most common problem is a troublesome user who is running several scripts at once and/or someone making a large number of invalid requests. If this happens, you should probably blacklist that user. When a blacklisted user makes a request, the error message in the response encourages them to email you to work out the problems. Then, you can encourage them to run just one script at a time and to fix the problems in their script (e.g., requesting data from a remote dataset that can't respond before timing out). See [&lt;requestBlacklist> in your datasets.xml file](/docs/server-admin/datasets#requestblacklist).

In extreme circumstances, Java may freeze for a minute or two while it does a full garbage collection, but then recover. So it is good to wait a minute or two to see if Java/ERDDAP™ is really frozen or if it is just doing a long garbage collection. (If garbage collection is a common problem, [allocate more memory to Tomcat](/docs/server-admin/deploy-install#memory).)

If ERDDAP™ becomes slow or freezes and the problem isn't a troublesome user or a long garbage collection, you can usually solve the problem by [restarting ERDDAP™](#shut-down-and-restart). My experience is that ERDDAP™ can run for months without needing a restart.  
     

### Monitor {#monitor}
You can monitor your ERDDAP's status by looking at the [/erddap/status.html page](#status-page), notably the statistics in the top section. If ERDDAP™ becomes slow or freezes and the problem isn't just extremely heavy usage, you can usually solve the problem by [restarting ERDDAP™](#shut-down-and-restart). There's additional metrics available through the Prometheus integration at /erddap/metrics.

My experience is that ERDDAP™ can run for months without needing a restart. You should only need to restart it if you want to apply some changes you made to ERDDAP's setup.xml or when you need to install new versions of ERDDAP™, Java, Tomcat, or the operating system. If you need to restart ERDDAP™ frequently, something is wrong. Look in [ERDDAP's log file](#log) to try to figure out the cause. If you can't, please include the details and see our [section on getting additional support](/docs/intro#support). As a temporary solution, you might try using [Monit](https://mmonit.com/monit/) to monitor your ERDDAP™ and restart it if needed. Or, you could make a cron job to restart ERDDAP™ (proactively) periodically. It may be a little challenging to write a script to automate monitoring and restarting ERDDAP. Some tips that might help:

*   You can simplify testing if the Tomcat process is still running by using the -c switch with grep:  
    ps -u *tomcatUser* | grep -c java  
    That will reduce the output to "1" if the tomcat process is still alive, or "0" if the process has stopped.  
     
*   If you are good with gawk, you can extract the processID from the results of  
    ps -u *tomcatUser* | grep java, and use the processID in other lines of the script.  
     

If you do set up Monit or a cron job, it'd be great if you could share the details so others could benefit see our [section on getting additional support](/docs/intro#support) for where you can share.  

#### Permgen {#permgen}
If you repeatedly use Tomcat Manager to Reload (or Stop and Start) ERDDAP™, ERDDAP™ may fail to start up and throw java.lang.OutOfMemoryError: PermGen. The solution is to periodically (or every time?) [shut down and restart tomcat and ERDDAP™](#shut-down-and-restart), instead of just reloading ERDDAP.  
\[Update: This problem was greatly minimized or fixed in ERDDAP™ version 1.24.\]  
     
#### Log {#log}
*   **[log.txt](#log)**  
    If ERDDAP™ doesn't start up or if something isn't working as expected, it is very useful to look at the error and diagnostic messages in the ERDDAP™ log file.
    *   The log file is *bigParentDirectory*/logs/log.txt  
        (*bigParentDirectory* is specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)). If there is no log.txt file or if the log.txt file hasn't been updated since you restarted ERDDAP™, look in the [Tomcat Log Files](#tomcat-logs) to see if there is an error message there.
    *   Types of diagnostic messages in the log file:
        *   The word "error" is used when something went so wrong that the procedure failed to complete. Although it is annoying to get an error, the error forces you to deal with the problem. Our thinking is that it is better to throw an error, than to have ERDDAP™ hobble along, working in a way you didn't expect.
        *   The word "warning" is used when something went wrong, but the procedure was able to be completed. These are pretty rare.
        *   Anything else is just an informative message. You can control how much information is logged with [&lt;logLevel>](/docs/server-admin/datasets#loglevel) datasets.xml.
        *   Dataset reloads and user responses that take >10 seconds to finish (successfully or unsuccessfully) are marked with "(>10s!)". Thus, you can search the log.txt file for this phrase to find the datasets that were slow to reload or the request number of the requests that were slow to finish. You can then look higher in the log.txt file to see what the dataset problem was or what the user request was and who it was from. These slow dataset loads and user requests are sometimes taxing on ERDDAP. So knowing more about these requests can help you identify and solve problems.
    *   Information is written to the log file on the disk drive in fairly big chunks. The advantage is that this is very efficient -- ERDDAP™ will never block waiting for information to be written to the log file. The disadvantage is that the log will almost always end with a partial message, which won't be completed until the next chunk is written. You can make it up-to-date (for an instant) by viewing your ERDDAP's status web page at https://*your.domain.org*/erddap/status.html (or http:// if https isn't enabled).
    *   When the log.txt files gets to 20 MB,  
        the file is renamed log.txt.previous and a new log.txt file is created. So log files don't accumulate.
        
        In setup.xml, you can specify a different maximum size for the log file, in MegaBytes. The minimum allowed is 1 (MB). The maximum allowed is 2000 (MB). The default is 20 (MB). For example: 
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    *   Whenever you restart ERDDAP™,  
        ERDDAP™ makes an archive copy of the log.txt and log.txt.previous files with a time stamp in the file's name. If there was trouble before the restart, it may be useful to analyze these archived files for clues as to what the trouble was. You can delete the archive files if they are no longer needed.  
         
##### Parsing log.txt {#parsing-logtxt}
ERDDAP's log.txt file isn't designed for parsing (although you might be able to create regular expressions that extract desired information). It is designed to help a human figure out what is going wrong when something is going wrong. When you submit a bug or problem report to ERDDAP™ developers, when possible, please include all of the information from the log.txt file related to the troublesome request.

For efficiency reasons, ERDDAP™ only writes information to log.txt after a large chunk of information has accumulated. So if you visit log.txt right after an error has occurred, information related to the error may not yet have been written to log.txt. In order to get perfectly up-to-date information from log.txt, visit your ERDDAP's [status.html page](#status-page). When ERDDAP™ processes that request, it flushes all pending information to log.txt.

For ERDDAP™ usage statistics, please use the [Apache and/or Tomcat log files](#tomcat-logs) instead of ERDDAP's log.txt. Note that ERDDAP's [status.html page](#status-page) (some) and [Daily Report](#daily-report) (more) have a large number of usage statistics precalculated for you.
    
### Tomcat Logs {#tomcat-logs}
If ERDDAP™ doesn't start up because an error occurred very early in ERDDAP's startup, the error message will show up in Tomcat's log files (*tomcat*/logs/catalina.*today*.log or *tomcat*/logs/catalina.out), not in [ERDDAP's log.txt file](#log).

Usage Statistics: For most of the information that people want to gather from a log file (e.g., usage statistics), please use the Apache and/or Tomcat log files. They are nicely formatted and have that type of information. There are numerous tools for analyzing them, for example, [AWStats](https://www.awstats.org), [ElasticSearch's Kibana](https://www.elastic.co/products/kibana), and [JMeter](https://jmeter.apache.org), but search the web to find the right tool for your purposes.

Note that the log files only identify users as IP addresses. There are websites to help you get information related to a given IP address, e.g., [WhatIsMyIPAddress](https://whatismyipaddress.com/ip-lookup), but you normally won't be able to find the name of the user.

Also, because of [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), a given user's IP address may be different on different days, or different users may have the same IP address at different times.

Alternatively, you can use something like [Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). But beware: when you use external services like Google Analytics, you are giving up your users' privacy by giving Google full access to their activity on your site which Google (and others?) can keep forever and use for any purpose (perhaps not technically, but probably in practice). Your users haven't consented to this and probably aren't aware that they will be tracked on your website, just as they probably aren't aware of the extent they are being tracked on almost all websites. These days, many users are very concerned that everything they do on the web is being monitored by these big companies (Google, Facebook, etc.) and by the government, and find this an unwarranted intrusion into their lives (as in the book, 1984). This has driven many users to install products like [Privacy Badger](https://www.eff.org/privacybadger/faq) to minimize tracking, to use alternative browsers like [Tor Browser](https://www.torproject.org/) (or turn off tracking in traditional browsers), and to use alternative search engines like [Duck Duck Go](https://duckduckgo.com/). If you use a service like Google Analytics, please at least document its use and the consequences by changing the &lt;standardPrivacyPolicy> tag in ERDDAP's  
\[tomcat\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
    
### E-Mail Log {#e-mail-log}
*   **emailLogYEAR-MM-DD.txt**  
    ERDDAP™ always writes the text of all out-going email messages in the current day's emailLogYEAR-MM-DD.txt file in *bigParentDirectory*/logs (*bigParentDirectory* is specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)).
    *   If the server can't send out email messages, or if you have configured ERDDAP™ not to send out email messages, or if you are just curious, this file is a convenient way to see all of the email messages that have been sent out.
    *   You can delete previous days' email log files if they are no longer needed.  
         
### Daily Report {#daily-report}
    The Daily Report has lots of useful information -- all of the information from your ERDDAP's [/erddap/status.html page](#status-page) and more.
    *   It is the most complete summary of your ERDDAP's status.
    *   Among other statistics, it includes a list of datasets that didn't load and the exceptions they generated.
    *   It is generated when you start up ERDDAP™ (just after ERDDAP™ finishes trying to load all of the datasets) and generated soon after 7 am local time every morning.
    *   Whenever it is generated, it is written to [ERDDAP's log.txt file](#log).
    *   Whenever it is generated, it is emailed to &lt;emailDailyReportsTo> and &lt;emailEverythingTo> (which are specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)) provided you have set up the email system (in setup.xml).  

### Status Page {#status-page}
You can view the status of your ERDDAP™ from any browser by going to &lt;baseUrl>/erddap/status.html
*   This page is generated dynamically, so it always has up-to-the-moment statistics for your ERDDAP.
*   It includes statistics regarding the number of requests, memory usage, thread stack traces, the taskThread, etc.
*   Because the Status Page can be viewed by anyone, it doesn't include quite as much information as the [Daily Report](#daily-report).  
         
### Adding/Changing Datasets {#addingchanging-datasets}
ERDDAP™ usually rereads datasets.xml every *loadDatasetsMinMinutes* (specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)). So you can make changes to datasets.xml any time, even while ERDDAP™ is running.  
A new dataset will be detected soon, usually within *loadDatasetsMinMinutes*.  
A changed dataset will be reloaded when it is *reloadEveryNMinutes* old (as specified in datasets.xml).  
    
#### Flag {#flag}
*   **[A Flag File](#flag) Tells ERDDAP™ to Try to Reload a Dataset As Soon As Possible**
    
    *   ERDDAP™ won't notice any changes to a dataset's setup in datasets.xml until ERDDAP™ reloads the dataset.  
         
    *   To tell ERDDAP™ to reload a dataset as soon as possible (before the dataset's &lt;reloadEveryNMinutes> would cause it to be reloaded), put a file in *bigParentDirectory*/flag (*bigParentDirectory* is specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)) that has the same name as the dataset's datasetID.  
        This tells ERDDAP™ to try to reload that dataset ASAP.  
        The old version of the dataset will remain available to users until the new version is available and swapped atomically into place.  
        For EDDGridFromFiles and EDDTableFromFiles, the reloading dataset will look for new or changed files, read those, and incorporate them into the dataset. So the time to reload is dependent on the number of new or changed files.  
        If the dataset has active="false", ERDDAP™ will remove the dataset.  
         
##### Bad Files Flag {#bad-files-flag}
*   One variant of the /flag directory is the /badFilesFlag directory. (Added in ERDDAP™ v2.12.)  
    If you put a file in the *bigParentDirectory*/badFilesFlag directory with a datasetID as the file name (the file contents don't matter), then as soon as ERDDAP™ sees the badFilesFlag file, ERDDAP™ will:
    
    1.  Delete the badFilesFlag file.
    2.  Delete the badFiles.nc file (if there is one), which has the list of bad files for that dataset.  
        For datasets like EDDGridSideBySide that have childDatasets, this also deletes the badFiles.nc file for all child datasets.
    3.  Reload the dataset ASAP.
    
    Thus, this causes ERDDAP™ to try again to work with the files previously (erroneously?) marked as bad.  
         
##### Hard Flag {#hard-flag}
*   Another variant of the /flag directory is the /hardFlag directory. (Added in ERDDAP™ v1.74.)  
    If you put a file in *bigParentDirectory*/hardFlag with a datasetID as the file name (the file contents don't matter), then as soon as ERDDAP™ sees the hardFlag file, ERDDAP™ will:
    
    1.  Delete the hardFlag file.
    2.  Remove the dataset from ERDDAP.
    3.  Delete all of the information that ERDDAP™ has stored about this dataset.  
        For EDDGridFromFiles and EDDTableFromFiles subclasses, this deletes the internal database of data files and their contents.  
        For datasets like EDDGridSideBySide that have childDatasets, this also deletes the internal database of data files and their contents for all child datasets.
    4.  Reload the dataset.  
        For EDDGridFromFiles and EDDTableFromFiles subclasses, this causes ERDDAP™ to reread **all** of the data files. Thus, the reload time is dependent on the total number of data files in the dataset. Because the dataset was removed from ERDDAP™ when the hardFlag was noticed, the dataset will be unavailable until the dataset finishes reloading. Be patient. Look in the [log.txt](#log) file if you want to see what's going on.
    
    The hardFlag variant deletes the dataset's stored information even if the dataset isn't currently loaded in ERDDAP.
    
    HardFlags are very useful when you do something that causes a change in how ERDDAP™ reads and interprets the source data, for example, when you install a new version of ERDDAP™ or when you have made a change to a dataset's definition in datasets.xml
    
*   The contents of the flag, badFilesFlag, and hardFlag files are irrelevant. ERDDAP™ just looks at the file name to get the datasetID.  
     
*   In between major dataset reloads, ERDDAP™ looks continuously for flag, badFilesFlag, and hardFlag files.  
     
*   Note that when a dataset is reloaded, all files in the *bigParentDirectory*/[cache](#cached-responses)/*datasetID* directory are deleted. This includes .nc and image files that are normally cached for ~15 minutes.  
     
*   Note that if the dataset's xml includes [active="false"](/docs/server-admin/datasets#active), a flag will cause the dataset to be made inactive (if it is active), and in any case, not reloaded.  
     
*   Any time ERDDAP™ runs LoadDatasets to do a major reload (the timed reload controlled by &lt;loadDatasetsMinMinutes>) or a minor reload (as a result of an external or internal flag), ERDDAP™ reads all &lt;decompressedCacheMaxGB>, &lt;decompressedCacheMaxMinutesOld>, &lt;user>, &lt;requestBlacklist>, &lt;slowDownTroubleMillis>, and &lt;subscriptionEmailBlacklist> tags and switches to the new settings. So you can use a flag as a way to get ERDDAP™ to notice changes to those tags ASAP.

##### Set Dataset Flag {#set-dataset-flag}
*  ERDDAP™ has a web service so that flags can be set via URLs.
    
    *   For example,  
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
        (that's a fake flagKey) will set a flag for the rPmelTao dataset.
    *   There is a different flagKey for each datasetID.
    *   Administrators can see a list of flag URLs for all datasets by looking at the bottom of their [Daily Report](#daily-report) email.
    *   Administrators should treat these URLs as confidential, since they give someone the right to reset a dataset at will.
    *   If you think the flagKeys have fallen into the hands of someone who is abusing them, you can change &lt;flagKeyKey> in [setup.xml](/docs/server-admin/deploy-install#setupxml) and restart ERDDAP to force ERDDAP™ to generate and use a different set of flagKeys.
    *   If you change &lt;flagKeyKey>, delete all of the old subscriptions (see the list in your Daily Report) and remember to send the new URLs to the people who you do want to have them.
    
    The flag system can serve as the basis for a more efficient mechanism for telling ERDDAP™ when to reload a dataset. For example, you could set a dataset's &lt;reloadEveryNMinutes> to a large number (e.g., 10080 = 1 week). Then, when you know the dataset has changed (perhaps because you added a file to the dataset's data directory), set a flag so that the dataset is reloaded as soon as possible. Flags are usually seen quickly. But if the LoadDatasets thread is already busy, it may be a while before it is available to act on the flag. But the flag system is much more responsive and much more efficient than setting &lt;reloadEveryNMinutes> to a small number.
    
#### Removing Datasets {#removing-datasets}
If a dataset is active in ERDDAP™ and you want to deactivate it temporarily or permanently:
1.  In datasets.xml for the dataset, set [active="false"](/docs/server-admin/datasets#active) in the dataset tag.
2.  Wait for ERDDAP™ to remove the dataset during the next major reload or [set a flag](#flag) for the dataset to tell ERDDAP™ to notice this change as soon as possible. When you do this, ERDDAP™ doesn't throw out any information it may have stored about the dataset and certainly doesn't do anything to the actual data.
3.  Then you can leave the active="false" dataset in datasets.xml or remove it.  
         
#### When Are Datasets Reloaded? {#when-are-datasets-reloaded}
A thread called RunLoadDatasets is the master thread that controls when datasets are reloaded. RunLoadDatasets loops forever:

1.  RunLoadDatasets notes the current time.
2.  RunLoadDatasets starts a LoadDatasets thread to do a "majorLoad". You can see information about the current/previous majorLoad at the top of your ERDDAP's  
    [/erddap/status.html page](#status-page) (for example, [status page example](https://coastwatch.pfeg.noaa.gov/erddap/status.html)).
    
    1.  LoadDatasets makes a copy of datasets.xml.
    2.  LoadDatasets reads through the copy of datasets.xml and, for each dataset, sees if the dataset needs to be (re)loaded or removed.
        *   If a [flag](#flag) file exists for this dataset, the file is deleted and the dataset is removed if active="false" or (re)loaded if active="true" (regardless of the dataset's age).
        *   If the dataset's dataset.xml chunk has active="false" and the dataset is currently loaded (active), it is unloaded (removed).
        *   If the dataset has active="true" and the dataset isn't already loaded, it is loaded.
        *   If the dataset has active="true" and the dataset is already loaded, the data set is reloaded if the dataset's age (time since last load) is greater than its &lt;reloadEveryNMinutes> (default = 10080 minutes), otherwise, the dataset is left alone.
    3.  LoadDatasets finishes.
    
    The RunLoadDatasets thread waits for the LoadDatasets thread to finish. If LoadDatasets takes longer than loadDatasetsMinMinutes (as specified in setup.xml), RunLoadDatasets interrupts the LoadDatasets thread. Ideally, LoadDatasets notices the interrupt and finishes. But if it doesn't notice the interrupt within a minute, RunLoadDatasets calls loadDatasets.stop(), which is undesirable.
3.  While the time since the start of the last majorLoad is less than loadDatasetsMinMinutes (as specified in setup.xml, e.g., 15 minutes), RunLoadDatasets repeatedly looks for [flag](#flag) files in the *bigParentDirectory*/flag directory. If one or more flag files are found, they are deleted, and RunLoadDatasets starts a LoadDatasets thread to do a "minorLoad" (majorLoad=false). You can't see minorLoad information on your ERDDAP's [/erddap/status.html page](#status-page).
    1.  LoadDatasets makes a copy of datasets.xml.
    2.  LoadDatasets reads through the copy of datasets.xml and, for each dataset for which there was a flag file:
        *   If the dataset's dataset.xml chunk has active="false" and the dataset is currently loaded (active), it is unloaded (removed).
        *   If the dataset has active="true", the dataset is (re)loaded, regardless of its age.Non-flagged datasets are ignored.
    3.  LoadDatasets finishes.
4.  RunLoadDatasets goes back to step 1.

Notes:
*   Startup  
    When you restart ERDDAP™, every dataset with active="true" is loaded.
*   Cache  
    When a dataset is (re)loaded, its cache (including any data response files and/or image files) is emptied.
*   Lots of Datasets  
    If you have a lot of datasets and/or one or more datasets are slow to (re)load, a LoadDatasets thread may take a long time to finish its work, perhaps even longer than loadDatasetsMinMinutes.
*   One LoadDatasets Thread  
    There is never more than one LoadDatasets thread running at once. If a flag is set when LoadDatasets is already running, the flag probably won't be noticed or acted on until that LoadDatasets thread finishes running. You might say: "That's stupid. Why don't you just start a bunch of new threads to load datasets?" But if you have lots of datasets which get data from one remote server, even one LoadDatasets thread will put substantial stress on the remote server. The same is true if you have lots of datasets which get data from files on one RAID. There are rapidly diminishing returns from having more than one LoadDatasets thread.
*   Flag = ASAP  
    Setting a flag just signals that the dataset should be (re)loaded as soon as possible, not necessarily immediately. If no LoadDatasets thread is currently running, the dataset will start to be reloaded within a few seconds. But if a LoadDatasets thread is currently running, the dataset probably won't be reloaded until after that LoadDatasets thread is finished.
*   Flag File Deleted  
    In general, if you put a flag file in the *bigParentDirectory*/erddap/flag directory (by visiting the dataset's flagUrl or putting an actual file there), the dataset will usually be reloaded very soon after that flag file is deleted.
*   Flag versus Small reloadEveryNMinutes  
    If you have some external way of knowing when a dataset needs to be reloaded and if it is convenient for you, the best way to make sure that a dataset is always up-to-date is to set its reloadEveryNMinutes to a large number (10080?) and set a flag (via a script?) whenever it needs to be reloaded. That is the system that EDDGridFromErddap and EDDTableFromErddap use receive messages that the dataset needs to be reloaded.
*   Look in log.txt  
    Lots of relevant information is written to the *bigParentDirectory*/logs/log.txt file. If things aren't working as you expect, looking at log.txt lets you diagnose the problem by finding out exactly what ERDDAP™ did.
    
    *   Search for "majorLoad=true" for the start of major LoadDataset threads.
    *   Search for "majorLoad=false" for the start of minor LoadDatasets threads.
    *   Search for a given dataset's datasetID for information about it being (re)loaded or queried.
        
          
         
#### Cached Responses {#cached-responses}
In general, ERDDAP™ doesn't cache (store) responses to user requests. The rationale was that most requests would be slightly different so the cache wouldn't be very effective. The biggest exceptions are requests for image files (which are cached since browsers and programs like Google Earth often re-request images) and requests for .nc files (because they can't be created on-the-fly). ERDDAP™ stores each dataset's cached files in a different directory: *bigParentDirectory*/cache/*datasetID* since a single cache directory might have a huge number of files which might become slow to access.  
Files are removed from the cache for one of three reasons:
*   All files in this cache are deleted when ERDDAP™ is restarted.
*   Periodically, any file more than &lt;cacheMinutes> old (as specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)) will be deleted. Removing files in the cache based on age (not Least-Recently-Used) ensures that files won't stay in the cache very long. Although it might seem like a given request should always return the same response, that isn't true. For example, a tabledap request which includes &time>*someTime* will change if new data arrives for the dataset. And a griddap request which includes \[last\] for the time dimension will change if new data arrives for the dataset.
*   Images showing error conditions are cached, but only for a few minutes (it's a difficult situation).
*   Every time a dataset is reloaded, all files in that dataset's cache are deleted. Because requests may be for the "last" index in a gridded dataset, files in the cache may become invalid when a dataset is reloaded.  
         
#### Stored Dataset Information {#stored-dataset-information}
For all types of datasets, ERDDAP™ gathers lots of information when a dataset is loaded and keeps that in memory. This allows ERDDAP™ to respond very quickly to searches, requests for lists of datasets, and requests for information about a dataset.

For a few types of datasets (notably EDDGridCopy, EDDTableCopy, EDDGridFrom*Xxx*Files, and EDDTableFrom*Xxx*Files), ERDDAP™ stores on disk some information about the dataset that is reused when the dataset is reloaded. This greatly speeds the reloading process.

*   Some of the dataset information files are human-readable .json files and are stored in *bigParentDirectory*/dataset/*last2LettersOfDatasetID/datasetID* .
*   ERDDAP™ only deletes these files in unusual situations, e.g., if you add or delete a variable from the dataset's datasets.xml chunk.
*   Most changes to a dataset's datasets.xml chunk (e.g., changing a global attribute or a variable attribute) don't necessitate that you delete these files. A regular dataset reload will handle these types of changes. You can tell ERDDAP™ to reload a dataset ASAP by setting a [flag](#flag) for the dataset.
*   Similarly, the addition, deletion, or change of data files will be handled when ERDDAP™ reloads a dataset. But ERDDAP™ will notice this type of change soon and automatically if the dataset is using the [&lt;updateEveryNMillis>](/docs/server-admin/datasets#updateeverynmillis) system.
*   It should only rarely be necessary for you to delete these files. The most common situation where you need to force ERDDAP™ to delete the stored information (because it is out-of-date/incorrect and won't be automatically fixed by ERDDAP) is when you make changes to the dataset's datasets.xml chunk that affect how ERDDAP™ interprets data in the source data files, for example, changing the time variable's format string.
*   To delete a dataset's stored information files from an ERDDAP™ that is running (even if the dataset isn't currently loaded), set a [hardFlag](#hard-flag) for that dataset. Remember that if a dataset is an aggregation of a large number of files, reloading the dataset may take considerable time.
*   To delete a dataset's stored information files when ERDDAP™ isn't running, run [DasDds](/docs/server-admin/datasets#dasdds) for that dataset (which is easier than figuring in which directory the info is located and deleting the files by hand). Remember that if a dataset is an aggregation of a large number of files, reloading the dataset may take considerable time.  
         
### Memory Status {#memory-status}
ERDDAP™ shouldn't ever crash or freeze up. If it does, one of the most likely causes is insufficient memory. You can monitor memory usage by looking at the status.html web page, which includes a line like

0 gc calls, 0 requests shed, and 0 dangerousMemoryEmails since last major LoadDatasets

(those are progressively more serious events)  
and MB inUse and gc Calls columns in the table of statistics. You can tell how memory-stressed your ERDDAP™ is by watching these numbers. Higher numbers indicate more stress.

*   MB inUse should always be less than half of the [\-Xmx memory setting](/docs/server-admin/deploy-install#memory). Larger numbers are a bad sign.
*   gc calls indicates the number of times ERDDAP™ called the garbage collector to try to alleviate high memory usage. If this gets to be >100, that's a sign of serious trouble.
*   shed indicates the number of incoming requests that were shed (with HTTP error number 503, Service Unavailable) because memory use was already too high. Ideally, no requests should be shed. It's okay if a few requests are shed, but a sign of serious trouble if many are shed.
*   dangerousMemoryEmails - If memory use becomes dangerously high, ERDDAP™ sends an email to the email addresses listed in &lt;emailEverythingTo> (in setup.xml) with a list of the active user requests. As the email says, please forward these emails to Chris.John at noaa.gov so we can use the information to improve future versions of ERDDAP.  
     

If your ERDDAP™ is memory-stressed:
*   Consider allocating more of your server's memory to ERDDAP™ by changing the Tomcat [‑Xmx memory setting](/docs/server-admin/deploy-install#memory).
*   If you've already allocated as much memory as you can to ERDDAP™ via -Xmx, consider buying more memory for your server. Memory is cheap (compared to the price of a new server or your time)! Then increase -Xmx.
*   In datasets.xml, set &lt;nGridThreads> to 1, set &lt;nTableThreads> to 1, and set &lt;ipAddressMaxRequestsActive> to 1.
*   Look at the requests in log.txt for inefficient or troublesome (but legitimate) requests. Add their IP addresses to &lt;requestBlacklist> in datasets.xml. The blacklist error message includes the ERDDAP™ administrator's email address with the hope that those users will contact you so that you can work with them to use ERDDAP™ more efficiently. It's good to keep a list of IP addresses you blacklist and why, so that you can work with the users if they contact you.
*   Look at the requests in log.txt for requests from malicious users. Add their IP addresses to &lt;requestBlacklist> in datasets.xml. If similar requests are coming from multiple similar IP address, you can use some who-is services (e.g., [https://www.whois.com/whois/](https://www.whois.com/whois/)) to find out the range of IP addresses from that source and blacklist the entire range. See the [&lt;requestBlacklist> documentation](/docs/server-admin/datasets#requestblacklist).  
         
#### OutOfMemoryError {#outofmemoryerror}
When you set up ERDDAP™, you specify the maximum amount of memory that Java can use via the [\-Xmx setting](/docs/server-admin/deploy-install#memory). If ERDDAP™ ever needs more memory than that, it will throw a java.lang.OutOfMemoryError. ERDDAP™ does a lot of checking to enable it to handle that error gracefully (e.g., so a troublesome request will fail, but the system retains its integrity). But sometimes, the error damages system integrity and you have to restart ERDDAP. Hopefully, that is rare.

The quick and easy solution to an OutOfMemoryError is to increase the [\-Xmx setting](/docs/server-admin/deploy-install#memory), but you shouldn't ever increase the -Xmx setting to more than 80% of the physical memory in the server (e.g., for a 10GB server, don't set -Xmx above 8GB). Memory is relatively cheap, so it may be a good option to increase the memory in the server. But if you have maxed out the memory in the server or for other reasons can't increase it, you need to deal more directly with the cause of the OutOfMemoryError.

If you look in the [log.txt](#log) file to see what ERDDAP™ was doing when the error arose, you can usually get a good clue as to the cause of the OutOfMemoryError. There are lots of possible causes, including:

*   A single huge data file can cause the OutOfMemoryError, notably, huge ASCII data files. If this is the problem, it should be obvious because ERDDAP™ will fail to load the dataset (for tabular datasets) or read data from that file (for gridded datasets). The solution, if feasible, is to split the file into multiple files. Ideally, you can split the file into logical chunks. For example, if the file has 20 month's worth of data, split it into 20 files, each with 1 month's worth of data. But there are advantages even if the main file is split up arbitrarily. This approach has multiple benefits: a) This will reduce the memory needed to read the data files to 1/20th, because only one file is read at a time. b) Often, ERDDAP™ can deal with requests much faster because it only has to look in one or a few files to find the data for a given request. c) If data collection is ongoing, then the existing 20 files can remain unchanged, and you only need to modify one, small, new file to add the next month's worth of data to the dataset.
*   A single huge request can cause the OutOfMemoryError. In particular, some of the orderBy options have the entire response in memory for a second (e.g., to do a sort). If the response is huge, it can lead to the error. There will always be some requests which are, in various ways, too big. You can solve the problem by increasing the -Xmx setting. Or, you can encourage the user to make a series of smaller requests.
*   It is unlikely that a large number of files would cause the file index that ERDDAP™ creates to be so large that that file would cause the error. If we assume that each file uses 300 bytes, then 1,000,000 files would only take up 300MB. But datasets with a huge number of data files cause other problems for ERDDAP, notably, it takes a long time for ERDDAP™ to open all those data files when responding to a user request for data. In this case, the solution may be to aggregate the files so that there are fewer data files. For tabular datasets, it is often great if you save the data from the current dataset in [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data files (request .ncCF files from ERDDAP) and then make a new dataset. These files can be handled very efficiently with ERDDAP's [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). If they are logically organized (each with data for a chunk of space and time), ERDDAP™ can extract data from them very quickly.
*   For tabular datasets that use the [&lt;subsetVariables>](/docs/server-admin/datasets#subsetvariables) attribute, ERDDAP™ makes a table of unique combinations of the values of those variables. For huge datasets or when &lt;subsetVariables> is misconfigured, this table can be large enough to cause OutOfMemoryErrors. The solution is to remove variables from the list of &lt;subsetVariables> for which there are a large number of values, or remove variables as needed until the size of that table is reasonable. The parts of ERDDAP™ that use the subsetVariables system don't work well (e.g., web pages load very slowly) when there are more than 100,000 rows in that table.
*   It's always possible that several simultaneous large requests (on a really busy ERDDAP) can combine to cause memory trouble. For example, 8 requests, each using 1GB each, would cause problems for an -Xmx=8GB setup. But it is rare that each request would be at the peak of its memory use simultaneously. And you would easily be able to see that your ERDDAP™ is really busy with big requests. But, it's possible. It's hard to deal with this problem other than by increasing the -Xmx setting.
*   There are other scenarios. If you look at the [log.txt](#log) file to see what ERDDAP™ was doing when the error arose, you can usually get a good clue as to the cause. In most cases, there is a way to minimize that problem (see above), but sometimes you just need more memory and a higher -Xmx setting.  
         
### Too Many Open Files {#too-many-open-files}
Starting with ERDDAP™ v2.12, ERDDAP™ has a system to monitor the number of open files (which includes sockets and some other things, not just files) in Tomcat on Linux computers. If some files mistakenly never get closed (a "resource leak"), the number of open files may increase until it exceeds the maximum allowed by the operating system and numerous really bad things happen. So now, on Linux computers (because the information isn't available for Windows):

*   There is an "Open Files" column on the far right of the status.html web page showing the percent of max files open. On Windows, it just shows "?".
*   When ERDDAP™ generates that information at the end of each major dataset reload, it will print to the log.txt file:  
      openFileCount=*current* of max=*max* %=*percent*
*   If the percentage is >50%, an email is sent to the ERDDAP™ administrator and the emailEverythingTo email addresses.

If the percentage is 100%, ERDDAP™ is in terrible trouble. Don't let this happen.  
If the percentage is >75%, ERDDAP™ is close to terrible trouble. That's not okay.  
If the percentage is >50%, it is very possible that a spike will cause the percentage to hit 100.  
If the percentage is ever >50%, you should:
*   Increase the maximum number of open files allowed by either:
    *   Making these changes each time before you start tomcat (put them in the Tomcat startup.sh file?):  
          ulimit -Hn 16384  
          ulimit -Sn 16384
    *   Or making a permanent change by editing (as root) /etc/security/limits.conf and adding the lines:  
          tomcat soft nofile 16384  
          tomcat hard nofile 16384  
        Those commands assume that the user running Tomcat is called "tomcat".  
        On many Linux variants, you have to restart the server to apply those changes.For both options, the "16384" above is an example. You choose the number that you think is best.
*   Restart ERDDAP. The operating system will close any open files.  
         
### Failed Requests {#failed-requests}
*   **Unusual Activity: >25% of requests failed**  
    As part of every reloadDatasets, which is usually every 15 minutes, ERDDAP™ looks at the percentage of requests which failed since the last reloadDatasets. If it is >25%, ERDDAP™ sends an email to the ERDDAP™ administrator with the subject "Unusual Activity: >25% of requests failed". That email includes a tally near the bottom entitled "Requester's IP Address (Failed) (since last Major LoadDatasets)". Search for that. It tells you the IP address of the computers making the most failed requests. You can then search for those IP addresses in the \[bigParentDirectory\]/logs/[log.txt](#log) file and see what type of requests they are making.
    
    You can use the user's IP number (for example, with [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup)) to try to figure out who or what the user is. Sometimes that will tell you pretty accurately who the user is (e.g., it's a search engine's web crawler). Most of the time it just gives you a clue (e.g., it's an amazonaws computer, it's from some university, it's someone in some specific city).
    
    By looking at the actual request, the IP number, and the error message (all from [log.txt](#log)) for a series of errors, you can usually figure out basically what is going wrong. In my experience, there are four common causes of lots of failed requests:
    
    1) The requests are malicious (e.g., looking for security weaknesses, or making requests and then cancelling them before they are completed). You should use &lt;requestBlacklist> in datasets.xml to blacklist those IP addresses.
    
    2) A search engine is naively trying the URLs listed in ERDDAP™ web pages and ISO 19115 documents. For example, there are many places which list the base OPeNDAP URL, for example, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST, to which the user is supposed to add a file type (e.g., .das, .dds, .html). But the search engine doesn't know this. And the request to the base URL fails. A related situation is when the search engine generates bizarre requests or tries to fill out forms in order to get to "hidden" web pages. But the search engines often do a bad job of this, leading to failures. The solution is: create a [robots.txt](#robotstxt) file.
    
    3) Some user is running a script that is repeatedly asking for something that isn't there. Maybe it is a dataset that used to exist, but is gone now (temporarily or permanently). Scripts often don't expect this and so don't deal with it intelligently. So the script just keeps making requests and the requests keep failing. If you can guess who the user is (from the IP number above), contact them and tell them the dataset is no longer available and ask them to change their script.
    
    4) Something is really wrong with some dataset. Usually, ERDDAP™ will make the troubled dataset inactive. Sometimes it doesn't, so all the requests to it just lead to errors. If so, fix the problem with the dataset or (if you can't) set the dataset to [active="false"](/docs/server-admin/datasets#active). Of course, this may lead to problem #2.
    
    Sometimes the errors aren't so bad, notably, if ERDDAP™ can detect the error and respond very quickly (&lt;=1ms). So you may decide to take no action.
    
    If all else fails, there is a universal solution: add the user's IP number to the [&lt;requestBlacklist>](/docs/server-admin/datasets#requestblacklist). This isn't as bad or as drastic an option as it might seem. The user will then get an error message saying s/he has been blacklisted and telling them your (the ERDDAP™ administrator's) email address. Sometimes the user will contact you and you can resolve the problem. Sometimes the user doesn't contact you and you will see the exact same behavior coming from a different IP number the next day. Blacklist the new IP number and hope that they will eventually get the message. (Or this is your Groundhog Day, from which you will never escape. Sorry.)
    
### robots.txt {#robotstxt}
    The search engine companies use web crawlers (e.g., GoogleBot) to examine all of the pages on the web to add the content to the search engines. For ERDDAP™, that is basically good. ERDDAP™ has lots of links between pages, so the crawlers will find all of the web pages and add them to the search engines. Then, users of the search engines will be able to find datasets on your ERDDAP.
    
    Unfortunately, some web crawlers (e.g., GoogleBot) are now filling out and submitting forms in order to find additional content. For web commerce sites, this is great. But this is terrible for ERDDAP™ because it just leads to an **infinite** number of undesirable and pointless attempts to crawl the actual data. This can lead to more requests for data than from all other users combined. And it fills the search engine with goofy, pointless subsets of the actual data.
    
    To tell the web crawlers to stop filling out forms and just generally not looking at web pages they don't need to look at, you need to create a text file called [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) in the root directory of your website's document hierarchy so that it can be viewed by anyone as, e.g., http://*www.your.domain*/robots.txt .  
    If you are creating a new robots.txt file, this is a good start:
```
    User-Agent: \*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\*?
    Disallow: /\*?\*
    Disallow: /\*.asc\*
    Disallow: /\*.csv\*
    Disallow: /\*.dods\*
    Disallow: /\*.esriAscii\*
    Disallow: /\*.esriCsv\*
    Disallow: /\*.geoJson\*
    Disallow: /\*.htmlTable\*
    Disallow: /\*.json\*
    Disallow: /\*.mat\*
    Disallow: /\*.nc\*
    Disallow: /\*.odvTxt\*
    Disallow: /\*.tsv\*
    Disallow: /\*.xhtml\*
    Disallow: /\*.geotif\*
    Disallow: /\*.itx\*
    Disallow: /\*.kml\*
    Disallow: /\*.pdf\*
    Disallow: /\*.png\*
    Disallow: /\*.large\*
    Disallow: /\*.small\*
    Disallow: /\*.transparentPng\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
    (But replace *your.institutions.url* with your ERDDAP's base URL.)  
    It may take a few days for the search engines to notice and for the changes to take effect.  
     
### sitemap.xml {#sitemapxml}
As the [https://www.sitemaps.org](https://www.sitemaps.org/) website says:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Actually, since ERDDAP™ is RESTful, search engine spiders can easily crawl your ERDDAP. But they tend to do it more often (daily!) than necessary (monthly?).

*   Given that each search engine may be crawling your entire ERDDAP™ every day, this can lead to a lot of unnecessary requests.
*   So ERDDAP™ generates a sitemap.xml file for your ERDDAP™ which tells search engines that your ERDDAP™ only needs to be crawled every month.
*   You should add a reference to ERDDAP's sitemap.xml to your [robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) file:  
    Sitemap: http://**www.yoursite.org**/erddap/sitemap.xml
*   If that doesn't seem to be getting the message to the crawlers, you can tell the various search engines about the sitemap.xml file by visiting these URLs (but change **YourInstitution** to your institution's acronym or abbreviation and **www.yoursite.org** to your ERDDAP's URL):
    *   https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
    *   https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I think) you just need to ping each search engine once, for all time. The search engines will then detect changes to sitemap.xml periodically.
     
### Data Dissemination / Data Distribution Networks: Push and Pull Technology {#data-dissemination--data-distribution-networks-push-and-pull-technology}
*   Normally, ERDDAP™ acts as an intermediary: it takes a request from a user; gets data from a remote data source; reformats the data; and sends it to the user.
*   [Pull Technology](https://en.wikipedia.org/wiki/Pull_technology): ERDDAP™ also has the ability to actively get all of the available data from a remote data source and [store a local copy of the data](/docs/server-admin/datasets#eddgridcopy).
*   [Push Technology](https://en.wikipedia.org/wiki/Push_technology): By using ERDDAP's [subscription services](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), other data servers can be notified as soon as new data is available so that they can request the data (by pulling the data).
*   ERDDAP's [EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap) and [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) use ERDDAP's subscription services and [flag system](#flag) so that it will be notified immediately when new data is available.
*   You can combine these to great effect: if you wrap an EDDGridCopy around an EDDGridFromErddap dataset (or wrap an EDDTableCopy around an EDDTableFromErddap dataset), ERDDAP™ will automatically create and maintain a local copy of another ERDDAP's dataset.
*   Because the subscription services work as soon as new data is available, push technology disseminates data very quickly (within seconds).

This architecture puts each ERDDAP™ administrator in charge of determining where the data for his/her ERDDAP™ comes from.

*   Other ERDDAP™ administrators can do the same. There is no need for coordination between administrators.
*   If many ERDDAP™ administrators link to each other's ERDDAPs, a data distribution network is formed.
*   Data will be quickly, efficiently, and automatically disseminated from data sources (ERDDAPs and other servers) to data redistribution sites (ERDDAPs) anywhere in the network.
*   A given ERDDAP™ can be both a source of data for some datasets and a redistribution site for other datasets.
*   The resulting network is roughly similar to data distribution networks set up with programs like [Unidata's IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), but less rigidly structured.  
         
### Security, Authentication, and Authorization {#security-authentication-and-authorization}
By default, ERDDAP™ runs as an entirely public server (using http and/or https) with no login ([authentication](https://en.wikipedia.org/wiki/Authentication)) system and no restrictions to data access ([authorization](https://en.wikipedia.org/wiki/Authorization)).

#### Security {#security}
If you want to restrict access to some or all datasets to some users, you can use ERDDAP's built-in security system. When the security system is in use:

*   ERDDAP™ uses [role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control).
    *   The ERDDAP™ administrator defines users with the [&lt;user>](/docs/server-admin/datasets#user) tag in datasets.xml. Each user has a username, a password (if authentication=custom), and one or more roles.
    *   The ERDDAP™ administrator defines which roles have access to a given dataset via the [&lt;accessibleTo>](/docs/server-admin/datasets#accessibleto) tag in datasets.xml for any dataset that shouldn't have public access.
*   The user's login status (and a link to log in/out) will be shown at the top of every web page. (But a logged in user will appear to ERDDAP™ to be not logged in if he uses an http URL.)
*   If the &lt;baseUrl> that you specify in your setup.xml is an **http** URL, users who are not logged in may use ERDDAP's **http** URLs. If &lt;baseHttpsUrl> is also specified, users who are not logged in can also use https URLs.
*   HTTPS Only -- If the &lt;baseUrl> that you specify in your setup.xml is an **https** URL, users who are not logged in are encouraged (not forced) to use ERDDAP's **https** URLs -- all of the links on ERDDAP™ web pages will refer to https URLs.
    
    If you want to force users to use https URL, add a Redirect permanent line inside the &lt;VirtualHost \*:80> section in your Apache's config file (usually httpd.conf), e.g.,
    
```
    <VirtualHost \*:80>
        \[...\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

    If you want, there is an additional method to force the use of https: [HTTP Strict Transport Security (HSTS)](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). To use it:
    
    1.  Enable the Apache Headers Module: a2enmod headers
    2.  Add the additional header to the HTTPS VirtualHost directive. Max-age is measured in seconds and can be set to some long value.
        
```
        <VirtualHost \*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
    Please note that this header is only valid on a HTTPS VirtualHost.
    
    A reason not to force users to use https URLs is: the underlying SSL/TLS link takes time to establish and then takes time to encrypt and decrypt all information transmitted between the user and the server. But some institutions require https only.
    
*   Users who are logged in MUST use ERDDAP's **https** URLs. If they use http URLs, they appear to ERDDAP™ to be not logged in. This ensures the privacy of the communications and helps prevent [session hijacking and sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
*   Anyone who isn't logged in can access and use the public datasets. By default, private datasets don't appear in lists of datasets if a user isn't logged in. If the administrator has set setup.xml's &lt;listPrivateDatasets> to true, they will appear. Attempts to request data from private datasets (if the user knows the URL) will be redirected to the login page.
*   Anyone who is logged in will be able to see and request data from any public dataset and any private dataset to which their role allows them access. By default, private datasets to which a user doesn't have access don't appear in lists of datasets. If the administrator has set setup.xml's &lt;listPrivateDatasets> to true, they will appear. Attempts to request data from private datasets to which the user doesn't have access will be redirected to the login page.
*   The RSS information for fully private datasets is only available to users (and RSS readers) who are logged in and authorized to use that dataset. This makes RSS not very useful for fully private datasets.
    
    If a dataset is private but its [&lt;graphsAccessibleTo>](/docs/server-admin/datasets#graphsaccessibleto) is set to public, the dataset's RSS is accessible to anyone.
    
*   Email subscriptions can only be set up when a user has access to a dataset. If a user subscribes to a private dataset, the subscription continues to function after the user has logged out.

##### Setup Security {#setup-security}
To set up the security/authentication/authorization system:

*   Do the standard ERDDAP™ [initial setup](/docs/server-admin/deploy-install).
*   In [setup.xml](/docs/server-admin/deploy-install#setupxml),
    *   Add/change the &lt;authenticate> value from nothing to custom (don't use this), email (don't use this), google (recommended), orcid (recommended), or oauth2 (which is google+orcid, recommended). See the comments about these options below.
    *   Add/change the &lt;baseHttpsUrl> value.
    *   Insert/uncomment &loginInfo; in &lt;startBodyHtml> to display the user's log in/out info at the top of each web page.
*   For testing purposes on your personal computer, [follow these instructions to configure tomcat to support SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html) (the basis for https connections) by creating a keystore with a [self-signed certificate](https://en.wikipedia.org/wiki/Self-signed_certificate) and by modifying *tomcat*/conf/server.xml to uncomment the connector for port 8443. On Windows, you may need to move .keystore from "c:\\Users\\*you*\\.keystore" to "c:\\Users\\Default User\\.keystore" or "c:\\.keystore" (see *tomcat*/logs/catalina.*today*.log if the application doesn't load or users can't see the log in page). You can see when the .keystore certificate will expire by examining the certificate when you log in.
    
    For a publicly accessible server, instead of using a self-signed certificate, it is strongly recommended that you buy and install a certificate signed by a [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority), because it gives your clients more assurance that they are indeed connecting to your ERDDAP™, not a man-in-the-middle's version of your ERDDAP. Many vendors sell digital certificates. (Search for web.) They are not expensive.
    
*   On Linux computers, if Tomcat is running in Apache, modify the /etc/httpd/conf.d/ssl.conf file to allow HTTPS traffic to/from ERDDAP™ without requiring the :8443 port number in the URL:
    1.  Modify the existing &lt;VirtualHost> tag (if there is one), or add one at the end of the file so that it at least has these lines:
```
        <VirtualHost \_default\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2.  Then restart Apache: /usr/sbin/apachectl -k graceful (but sometimes it is in a different directory).
*   In *tomcat*/conf/server.xml, uncomment the port=8443 &lt;Connector> tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
    and change the location of the certificateKeystoreFile.
##### Authorization {#authorization}
*   [In datasets.xml, create a](#authorization) [&lt;user>](/docs/server-admin/datasets#user) tag for each user with username, password (if authorization=custom), and roles information. This is the authorization part of ERDDAP's security system.  
     
*   In datasets.xml, add an [&lt;accessibleTo>](/docs/server-admin/datasets#accessibleto) tag to each dataset that shouldn't have public access. &lt;accessibleTo> lets you specify which roles have access to that dataset.  
     
*   Restart Tomcat. Trouble? Check the Tomcat logs.  
     
*   CHECK YOUR WORK! Any mistake could lead to a security flaw.  
     
*   Check that the login page uses https (not http). Attempts to login via http should be automatically redirected to https and port 8443 (although the port number may be hidden via an Apache proxy). You may need to work with your network administrator to allow external web requests to access port 8443 on your server.  
     
*   You can change the &lt;user> and &lt;accessibleTo> tags at any time. The changes will be applied at the next regular reload of any dataset, or ASAP if you use a [flag](#flag).

##### Authentication {#authentication}
[**Authentication (logging in)**](#authentication)  
If you don't want to allow users to log in, don't specify a value for &lt;authentication> in setup.xml.  
If you do want to allow users to log in, you must specify a value for &lt;authentication>. Currently, ERDDAP™ supports  
[custom](#custom) (don't use this),  
[email](#email) (don't use this),  
[google](#google) (recommended),  
[orcid](#orcid) (recommended), and  
[oauth2](#oauth2) (recommended) for the authentication method.  
If you want to enable logging in, we strongly recommend the google, orcid, or oauth2 options because they free you from storing and handling user's passwords (needed for custom) and are more secure than the email option. Remember that users often use the same password at different sites. So they may be using the same password for your ERDDAP™ as they do at their bank. That makes their password very valuable -- much more valuable to the user than just the data they are requesting. So you need to do as much as you can to keep the passwords private. That is a big responsibility. The email, google, orcid, and oauth2 options take care of passwords, so you don't have to gather, store, or work with them. So you are freed from that responsibility.

All &lt;authentication> options use a [cookie](https://en.wikipedia.org/wiki/HTTP_cookie) on the user's computer, so the user's browser must be set to allow cookies. If a user is making ERDDAP™ requests from a computer program (not a browser), cookies and authentication are hard to work with. That's a common problem with all authentication systems. Sorry.

The details of the &lt;authentication> options are:

###### Custom {#custom}
custom is ERDDAP's custom system for letting users log in by entering their User Name and Password in a form on a web page. If a user tries and fails to log in 3 times within 10 minutes, the user is blocked from trying to log in for 10 minutes. This prevents hackers from simply trying millions of passwords until they find the right one.

This is somewhat secure because the User Name and Password are transmitted via https (not http), but authentication=google, orcid, or oauth2 are better because they free you from having to handle passwords. The custom approach requires you to collect a user's Name and a hash digest of their Password (use your phone! email isn't secure!) and store them in datasets.xml in [&lt;user>](/docs/server-admin/datasets#user) tags.

With the custom option, no one can log in until you (the ERDDAP™ administrator) create a &lt;user> tag for the user, specifying the user's name as the username, the hash digest of their password as the password, and their roles.

Not Recommended  
Because of the awkwardness of generating and transmitting the hash digest of the user's password and because of the risks associated with ERDDAP™ holding the hash digests of the passwords, this option is not recommended.

To increase the security of this option:

*   You MUST make sure that other users on the server (i.e., Linux users, not ERDDAP™ users) can't read files in the Tomcat directory (especially the datasets.xml file!) or ERDDAP's bigParentDirectory.  
    On Linux, as user=tomcat, use:  
    chmod -R g-rwx *bigParentDirectory*  
    chmod -R o-rwx *bigParentDirectory*  
    chmod -R g-rwx *tomcatDirectory*  
    chmod -R o-rwx *tomcatDirectory*  
     
*   Use UEPSHA256 for &lt;passwordEncoding> in setup.xml.  
     
*   Use an as-secure-as-possible method to pass the hash digest of the user's password from the user to the ERDDAP™ administrator (phone?).  
         
###### email {#email}
The email authentication option uses a user's email account to authenticate the user (by sending them an email with a special link that they have to access in order to log in). Unlike other emails that ERDDAP™ sends, ERDDAP™ does not write these invitation emails to the email log file because they contain confidential information.  
In theory, this is not very secure, because emails aren't always encrypted, so a bad guy with the ability to intercept emails could abuse this system by using a valid user's email address and intercepting the invitation email.  
In practice, if you set up ERDDAP™ to use a Google email account to send emails, and if you set it up to use one of the TLS options for the connection, and if the user has a Google email account, this is somewhat secure because the emails are encrypted all the way from ERDDAP™ to the user.

To increase the security of this option:

*   Make sure that other users on the server (i.e., Linux users, not ERDDAP™ users) can't read files in the Tomcat directory or ERDDAP's bigParentDirectory.  
    On Linux, as user=tomcat, use:  
    chmod -R g-rwx *bigParentDirectory*  
    chmod -R o-rwx *bigParentDirectory*  
    chmod -R g-rwx *tomcatDirectory*  
    chmod -R o-rwx *tomcatDirectory*  
     
*   Set things up to get end-to-end security for the emails sent from ERDDAP™ to the users. For example, you could make a Google-centric system by only creating &lt;user> tags for Google-managed email addresses and by setting up your ERDDAP™ to use a Google email server via a secure/TLS connection: in your setup.xml, use e.g.,  
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Not Recommended  
The email authentication option isn't recommended. Please use the google, orcid, or oauth2 option instead.

As with the google, orcid, and oauth2 options, email is very convenient for ERDDAP™ administrators -- you don't ever have to deal with passwords or their hash digests. All you need to create is a [&lt;user>](/docs/server-admin/datasets#user) tag for a user in datasets.xml is the user's email address, which ERDDAP™ uses as the user's name. (The password attribute isn't used when authentication=email, google, orcid, or oauth2.)

With the email option, only users that have a &lt;user> tag in datasets.xml can try to log in to ERDDAP™ by providing their email address and clicking on the link in the email that ERDDAP™ sends them.

ERDDAP™ treats email addresses as case-insensitive. It does this by converting email addresses you enter (in &lt;user> tags) or users enter (on the login form) to their all lowercase version.

To set up authentication=email:

1.  In your setup.xml, change the &lt;baseHttpsUrl> tag's value.  
    For experimenting/working on your personal computer, use  
    https://localhost:8443  
    For your public ERDDAP™, use  
    https://*your.domain.org*:8443  
    or without the :8443 if you are using an Apache [proxypass](/docs/server-admin/deploy-install#proxypass) so that the port number isn't needed.  
     
2.  In your setup.xml, change the &lt;authentication> tag's value to email:  
```
    <authentication>email</authentication>  
```

3.  In your setup.xml, make sure the email system is set up via all of the &lt;email...> tags, so that ERDDAP™ can send out emails. If possible, set this up to use a secure connection (SSL / TLS) to the email server.  
     
4.  In your datasets.xml, create [&lt;user>](/docs/server-admin/datasets#user) tags for each user who will have access to private datasets.  
    Use the user's email address as the username in the tag.  
    Don't specify the password attribute in the user tag.  
     
5.  Restart ERDDAP™ so that the changes to setup.xml and datasets.xml take effect.  
         
###### Google, orcid, oauth2 {#google-orcid-oauth2}
*   [**google**](#google), [**orcid**](#orcid), and [**oauth2**](#oauth2)  (recommended)  
    All three of these options are the recommended ERDDAP™ authentication options. They are all the most secure options. The other options have significantly weaker security.  
     
###### Google {#google}
*   The google authentication option uses [Sign In with Google](https://developers.google.com/identity/gsi/web/guides/overview), which is an implementation of the [OAuth 2.0 authentication protocol](https://oauth.net/2/). ERDDAP™ users sign into their Google email account, including Google-managed accounts such as @noaa.gov accounts. This allows ERDDAP™ to verify the user's identity (name and email address) and access their profile image, but does not give ERDDAP™ access to their emails, their Google Drive, or any other private information.
    
    For ERDDAP™ v2.22 and below, ERDDAP™ used "Google Sign-In". Google says that system is deprecated after March 31, 2023. If you haven't already done so, please switch to ERDDAP™ v2.23+ to use the new "Sign In with Google"-based authentication system.
    
    For ERDDAP™ v2.23 instances with a Content-Security-Policy configured and using Google Authentication, you need to add https://accounts.google.com to the list of allowed script-src (or script-src-elem). ERDDAP™ no longer uses https://apis.google.com, so if you have that allowed, you may be able to remove it now.
    
    For ERDDAP™ v2.24+ you may also need to add https://accounts.google.com/gsi/style to stlye-src and https://accounts.google.com/gsi/ to connect-src. For the script-src you can now use https://accounts.google.com/gsi/client.
    
    For more information you can go to the [Google page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) about CSP configuration. If you have any questions, contact chris.john at noaa.gov.  
         
###### Orcid {#orcid}
*   The orcid authentication option uses [Orcid authentication](https://members.orcid.org/api/integrate/orcid-sign-in), which is an implementation of the [OAuth 2.0 authentication protocol](https://oauth.net/2/). ERDDAP™ users sign into their [Orcid account](https://members.orcid.org/api/integrate/orcid-sign-in), which is commonly used by researchers to identify themselves. This allows ERDDAP™ to verify the user's Orcid identity and get their Orcid account number, but does not give ERDDAP™ access to their other Orcid account information.  

###### Oauth2 {#oauth2}
*   The oauth2 option lets users sign in with either their Google account or their Orcid account.

The google, orcid, and oauth2 options are the successors to the openid option, which was discontinued after ERDDAP™ version 1.68, and which was based on a version of openID that is now out-of-date. Please switch to the google, orcid, or oauth2 option.

These options are very convenient for ERDDAP™ administrators -- you don't ever have to deal with passwords or their hash digests. All you need to create is a [&lt;user>](/docs/server-admin/datasets#user) tag for a user in datasets.xml which specifies the user's Google email address or Orcid account number as the username attribute. (The password attribute isn't used when authentication=email, google, orcid or oauth2.)

With these options, anyone can log in to ERDDAP™ by signing into their Google email account or Orcid account, but no one will have the right to access private datasets until you (the ERDDAP™ administrator) create a &lt;user> tag, specifying their Google email address or Orcid account number as the username, and specifying their roles.

ERDDAP™ treats email addresses as case-insensitive. It does this by converting email addresses you enter (in &lt;user> tags) or users enter (on the login form) to their all lowercase version.

To set up google, orcid, or oauth2 authentication:

*   In your setup.xml, change the &lt;baseHttpsUrl> tag's value.  
    For experimenting/working on your personal computer, use  
    https://localhost:8443  
    For your public ERDDAP™, use  
    https://*your.domain.org*:8443  
    or, better, without the :8443 if you are using an Apache [proxypass](/docs/server-admin/deploy-install#proxypass) so that the port number isn't needed.  
     
*   In your setup.xml, change the &lt;authentication> tag's value to google, orcid, or oauth2, for example:  
```
    <authentication>oauth2</authentication>  
```
###### Google setup {#google-setup}
*   For the google and oauth2 options:  
    Follow the instructions below to set up Google authentication for your ERDDAP.  
     
    1.  If you don't have a Google email account, [create one](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2.  Follow [these instructions](https://developers.google.com/identity/sign-in/web/devconsole-project) to create a Google Developers Console project and get a client ID.
        
        When the Google form asks for authorized JavaScript origins, enter the value from &lt;baseHttpsUrl> from your personal computer's ERDDAP™ setup.xml, e.g.,  
        https://localhost:8443  
        On a second line, add the &lt;baseHttpsUrl> from your public ERDDAP™ setup.xml, e.g.,  
        https://*your.domain.org*:8443
        
        Don't specify any Authorized redirect URIs.
        
        When you see your Client ID for this project, copy and paste it into your setup.xml (usually just below &lt;authentication> to be orderly, but placement doesn't actually matter), in the &lt;googleClientID> tag, e.g.,  
        &lt;googleClientID>*yourClientID*&lt;/googleClientID>  
        The client ID will be a string of about 75 characters, probably starting with several digits and ending with .apps.googleusercontent.com .  
         
        
    3.  In your datasets.xml, create a [&lt;user>](/docs/server-admin/datasets#user) tag for each user who will have access to private datasets. For the username attribute in the tag:
        
        *   For users who will sign in with google, use the user's Google email address.
        *   For users who will sign in with orcid, use the user's Orcid account number (with dashes).
        
        Don't specify the password attribute for the user tag.  
         
    4.  Restart ERDDAP™ so that the changes to setup.xml and datasets.xml take effect.  
         
###### Orcid setup {#orcid-setup}
*   For the orcid and oauth2 options:  
    Follow the instructions below to set up Orcid authentication for your ERDDAP.  
    (For details, see [Orcid's authentication API documentation](https://members.orcid.org/api/integrate/orcid-sign-in).)  
     
    1.  If you don't have an Orcid account, [create one](https://orcid.org/signin)  
         
    2.  Log into Orcid [https://orcid.org/signin](https://orcid.org/signin) using your personal Orcid account.  
         
    3.  Click on "Developer Tools" (under "For Researchers" at the top).  
         
    4.  Click on "Register for the free ORCID public API". Enter this information:  
        Name: ERDDAP™ at \[your organization\]  
        Website: \[your ERDDAP's domain\]  
        Description: ERDDAP™ is a scientific data server. Users need to authenticate with Google or Orcid to access non-public datasets.  
        Redirect URIs: \[your ERDDAP's domain\]/erddap/loginOrcid.html  
         
    5.  Click on the Save icon (it looks like a 3.5" disk!).  
        You can then see your ORCID APP Client ID and ORCID Client Secret.  
         
    6.  Copy and paste the ORCID APP Client ID (which will start with "APP-") into setup.xml in the &lt;orcidClientID> tag, e.g.,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7.  Copy and paste the ORCID Client Secret (lowercase alpha-numeric characters with dashes) into setup.xml in the &lt;orcidClientSecret> tag, e.g.,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8.  In your datasets.xml, create a [&lt;user>](/docs/server-admin/datasets#user) tag for each user who will have access to private datasets. For the username attribute in the tag:
        
        *   For users who will sign in with google, use the user's Google email address.
        *   For users who will sign in with orcid, use the user's Orcid account number (with dashes).
        
        Don't specify the password attribute for the user tag.  
         
    9.  Restart ERDDAP™ so that the changes to setup.xml and datasets.xml take effect.  
             

###### Log In Either Way {#log-in-either-way}
If you use the google, orcid, or oauth2 authentication options, and Google Sign-In or Orcid's Authentication API suddenly ceases to work (for whatever reason) or ceases to work as ERDDAP™ expects, users won't be able to log in to your ERDDAP. As a temporary (or permanent) solution, you can ask users to sign up with the other system (get a Google email account, or get an Orcid account). To do this:

1.  Change the &lt;authentication> tag so that it allows the other authentication system. The oauth2 option allows users to log in with either system.
2.  Duplicate each of the &lt;user> tags and change the username attribute from the Google email address to the corresponding Orcid account number (or vice-versa), but keep the roles attribute the same.

###### OpenId {#openid}
ERDDAP™ no longer supports the openid authentication option, which was based on a version of openID that is now out-of-date. Please use the google, orcid, or oauth2 options instead.

###### BASIC {#basic}
ERDDAP™ doesn't support BASIC authentication because:
*   BASIC seems geared toward predefined web pages needing secure access or blanket on/off access to the whole site, but ERDDAP™ allows (restricted access) datasets to be added on-the-fly.
*   BASIC authentication doesn't offer a way for users to log out!
*   BASIC authentication is known to be not secure.

##### Secure Data Sources {#secure-data-sources}
If a data set is to have restricted access to ERDDAP™ users, the data source (from where ERDDAP™ gets the data) should not be publicly accessible. So how can ERDDAP™ get the data for restricted access datasets? Some options are:

*   ERDDAP™ can serve data from local files (for example, via EDDTableFromFiles or EDDGridFromFiles).  
     
*   ERDDAP™ can be in a [DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) and the data source (e.g., an OPeNDAP server or a database) can be behind a [firewall](https://en.wikipedia.org/wiki/Firewall), where it is accessible to ERDDAP™ but not to the public.  
     
*   The data source can be on a public website, but require a login to get the data. The two types of dataset that ERDDAP™ can log on to access are [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) and [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra). These datasets support (and should always use) user names (create an ERDDAP™ user who only has read-only privileges), passwords, SSL connections, and other security measures.
    
    But in general, currently, ERDDAP™ can't deal with these data sources because it has no provisions for logging on to the data source. This is the reason why access to [EDDGridFromErddap and EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) datasets can't be restricted. Currently, the local ERDDAP™ has no way to login and access the metadata information from the remote ERDDAP. And putting the "remote" ERDDAP™ behind your firewall and removing that dataset's accessibleTo restrictions doesn't solve the problem: since user requests for EDDXxxFromErddap data need to be redirected to the remote ERDDAP™, the remote ERDDAP™ must be accessible.
    
#### Defenses Against Hackers {#defenses-against-hackers}
There are bad guy hackers who try to exploit security weaknesses in server software like ERDDAP. ERDDAP™ follows the common security advice to have several layers of defenses:

*   Restricted Privileges -- One of the most important defenses is to run Tomcat via a user called tomcat that doesn't have a password (so no one can log in as that user) and has limited file system privileges (e.g., read-only access to the data). See ERDDAP's instructions for [setting up tomcat](/docs/server-admin/deploy-install#tomcat).
*   Heavy Use - In general, ERDDAP™ is built for heavy use, including by scripts which make tens of thousands of requests, one after another. It is hard for ERDDAP™ to simultaneously open itself up to heavy legitimate use and shield itself from abuse. It is sometimes hard to differentiate heavy legitimate use, excessive legitimate use, and illegitimate use (and sometimes it is really easy). Among other defenses, ERDDAP™ consciously does not allow a single request to use an inordinate fraction of the system's resources (unless the system is otherwise not active).
*   Identify Troublesome Users - If ERDDAP™ is slowing down or freezing (perhaps because a naive user or a bot is running multiple scripts to submit multiple requests simultaneously or perhaps because of a bad guy's [Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack), you can look at the [Daily Report email](#daily-report) (and more frequent identical information in the [ERDDAP™ log file](#log)) which displays the number of requests made by the most active users (see "Requester's IP Address (Allowed)"). ERDDAP™ also sends emails to the administrator whenever there is ["Unusual activity: >25% of requests failed"](#failed-requests). You can then look in the ERDDAP™ log file to see the nature of their requests. If you feel that someone is making too many requests, bizarre requests (you wouldn't believe what I've seen, well, maybe you would), or attack-type requests, you can add their IP address to the blacklist.
*   Blacklist -- You can add the IP address of troublesome users, bots, and [Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attackers to the ERDDAP [blacklist](/docs/server-admin/datasets#requestblacklist), so that future requests from them will be immediately rejected. This setting is in datasets.xml so that you can quickly add an IP address to the list and then [flag](#flag) a dataset so that ERDDAP™ immediately notices and applies the change. The error message sent to blacklisted users encourages them to contact the ERDDAP™ administrator if they feel they have been mistakenly put on the blacklist. (In our experience, several users have been unaware that they were running multiple scripts simultaneously, or that their scripts were making nonsense requests.)
*   Dataset Security - Some types of datasets (notably, EDDTableFromDatabase) present additional security risks (e.g., SQL injection) and have their own security measures. See the information for those types of datasets in [Working with the datasets.xml File](/docs/server-admin/datasets), notably [EDDTableFromDatabase security](/docs/server-admin/datasets#database-security).
*   Security Audit -- Although NOAA IT security refused our requests for scans for years, they now routinely scan my (Bob's) ERDDAP™ installation. Although the initial scans found some problems that I then fixed, subsequent scans haven't found problems with ERDDAP. The scans worry about a lot of things: notably, since tabledap requests look like SQL requests, they worry about SQL injection vulnerabilities. But those concerns are unfounded because ERDDAP™ always parses and validates queries and then separately builds the SQL query in a way that avoids injection vulnerabilities. The other thing they sometimes complain about is that our Java version or Tomcat versions aren't as up-to-date as they want, so we update them in response. I previously offered to show people the security reports, but I'm now told I can't do that.

#### Questions? Suggestions? {#questions-suggestions}
If you have any questions about ERDDAP's security system or have any questions, doubts, concerns, or suggestions about how it is set up, see our [section on getting additional support](/docs/intro#support).
    

## Things You Don't Need To Know {#things-you-dont-need-to-know}

These are details that you don't need to know until a need arises.

### Second ERDDAP™ {#second-erddap}
*   **Setting Up a Second ERDDAP™ for Testing/Development**  
    If you want to do this, there are two approaches:
    *   (Best) Install Tomcat and ERDDAP™ on a computer other than the computer that has your public ERDDAP. If you use your personal computer:
        1.  Do the installation one step at a time. Get Tomcat up and running first.  
            When Tomcat is running, the Tomcat Manager should be at  
            [http://127.0.0.1:8080/manager/html/](http://127.0.0.1:8080/manager/html/) (or perhaps [http://localhost:8080/manager/html/](http://localhost:8080/manager/html/))
        2.  Install ERDDAP.
        3.  Don't use ProxyPass to eliminate the port number from the ERDDAP™ URL.
        4.  In [setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://127.0.0.1:8080
        5.  After you start up this ERDDAP™, you should be able to see it at  
            [http://127.0.0.1:8080/erddap/status.html](http://127.0.0.1:8080/erddap/status.html) (or perhaps [http://localhost:8080/erddap/status.html](http://localhost:8080/erddap/status.html))
#### Second Tomcat {#second-tomcat}
*   (Second Best) Install another Tomcat on the same computer as your public ERDDAP.
    1.  Do the installation one step at a time. Get Tomcat up and running first.  
        Change all of the port numbers associated with the second Tomcat (e.g., change 8080 to 8081) (see the [Multiple Tomcat Instances section](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt) halfway through that document).
    2.  Install ERDDAP™ in the new Tomcat.
    3.  Don't use ProxyPass to eliminate the port number from the ERDDAP™ URL.
    4.  In [setup.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://www.*yourDomainName*:8081
    5.  After you start up this ERDDAP™, you should be able to see it at  
        http://www.*yourDomainName*:8081/erddap/status.html  
             
### Solid State Drives {#solid-state-drives}
*   **Solid State Drives (SSDs) are great!**  
    The quickest, easiest, and cheapest way to speed up ERDDAP's access to tabular data is to put the data files on a Solid State Drive (SSD). Most tabular datasets are relatively small, so a 1 or 2 TB SSD is probably sufficient to hold all of the data files for all of your tabular datasets. SSD's eventually wear out if you write data to a cell, delete it, and write new data to that cell too many times. So if you just use your SSD to write the data once and read it many times, even a consumer-grade SSD should last a very long time, probably much longer than any Hard Disk Drive (HDD). Consumer-grade SSD's are now cheap (in 2018, ~$200 for 1 TB or ~$400 for 2 TB) and prices are still falling fast. When ERDDAP™ accesses a data file, an SSD offers both shorter latency (~0.1ms, versus ~3ms for an HDD, versus ~10(?)ms for a RAID, versus ~55ms for Amazon S3) and higher throughput (~500 MB/S, versus ~75 MB/s for an HDD, versus ~500 MB/s for a RAID). So you can get a big performance boost (up to 10X versus a HDD) for $200! Compared to most other possible changes to your system (a new server for $10,000? a new RAID for $35,000? a new network switch for $5000? etc.), this is by far the best Return On Investment (ROI). If/when the SSD dies (in 1, 2, ... 8 years), replace it. Don't rely on it as for long term, archival storage of the data, just for the front-end copy of the data. \[SSD's would be great for gridded data, too, but most gridded datasets are much larger, making the SSD very expensive.\]
    
    If your server isn't loaded with memory, additional memory for your server is also a great and relatively inexpensive way to speed up all aspects of ERDDAP.  
     
    
### [Heavy Loads / Constraints](#heavy-loads--constraints)** {#heavy-loads--constraints}
With heavy use, a standalone ERDDAP™ may be constrained by various problems. For more information, see the [list of constraints and solutions](/docs/server-admin/scaling#heavy-loads--constraints).  
     
### Grids, Clusters, and Federations {#grids-clusters-and-federations}
Under very heavy use, a single standalone ERDDAP™ will run into one or more constraints and even the suggested solutions will be insufficient. For such situations, ERDDAP™ has features that make it easy to construct scalable grids (also called clusters or federations) of ERDDAPs which allow the system to handle very heavy use (e.g., for a large data center). For more information, see [grids, clusters, and federations of ERDDAPs](/docs/server-admin/scaling).  
     
### Cloud Computing {#cloud-computing}
Several companies are starting to offer [cloud computing services](https://en.wikipedia.org/wiki/Cloud_computing) (e.g., [Amazon Web Services](https://aws.amazon.com/)). [Web hosting companies](https://en.wikipedia.org/wiki/Web_hosting_service) have offered simpler services since the mid-1990's, but the "cloud" services have greatly expanded the flexibility of the systems and the range of services offered. You can use these services to set up a single ERDDAP™ or a grid/cluster of ERDDAPs to handle very heavy use. For more information, see [cloud computing with ERDDAP™](/docs/server-admin/scaling#cloud-computing).  

### Amazon {#amazon}
*   **[Amazon Web Services (AWS) EC2 Installation Overview](#amazon)**  
    [Amazon Web Services (AWS)](https://aws.amazon.com/) is a [cloud computing service](https://en.wikipedia.org/wiki/Cloud_computing) that offers a wide range of computer infrastructure that you can rent by the hour. You can install ERDDAP™ on an [Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/) instance (their name for a computer that you can rent by the hour). AWS has an excellent [AWS User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) and you can use Google to find answers to specific questions you might have. Brace yourself -- it is a fair amount of work to get started. But once you get one server up and running, you can easily rent as many additional resources (servers, databases, SSD-space, etc.) as you need, at a reasonable price. \[This isn't a recommendation or endorsement of Amazon Web Services. There are other cloud providers.\]
    
    An overview of things you need to do to get ERDDAP™ running on AWS is:
    
    *   In general, you will do all the things described in the [AWS User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    *   Set up an AWS account.
    *   Set up an AWS user within that account with administrator privileges. Log in as this user to do all the following steps.
    *   Elastic Block Storage (EBS) is the AWS equivalent of a hard drive attached to your server. Some EBS space will be allocated when you first create an EC2 instance. It is persistent storage -- the information isn't lost when you stop your EC2 instance. And if you change instance types, your EBS space automatically gets attached to the new instance.
    *   Create an Elastic IP address so that your EC2 instance has a stable, public URL (as opposed to just a private URL that changes every time you restart your instance).
    *   Create and start up an EC2 instance (computer). There are a wide range of [instance types](https://aws.amazon.com/ec2/instance-types/), each at a different price. An m4.large or m4.xlarge instance is powerful and is probably suitable for most uses, but choose whatever meets your needs. You will probably want to use Amazon's Linux as the operating system.
    *   If your desktop/laptop computer is a Windows computer, you can use [PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), a free SSH client for Windows, to get access to your EC2 instance's command line. Or, you may have some other SSH program that you prefer.
    *   When you log into your EC2 instance, you will be logged in as the administrative user with the user name "ec2-user". ec2-user has sudo privileges. So, when you need to do something as the root user, use: sudo *someCommand*
    *   If your desktop/laptop computer is a Windows computer, you can use [FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), a free SFTP program, to transfer files to/from your EC2 instance. Or, you may have some other SFTP program that you prefer.
    *   [Install Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html) on your EC2 instance.
    *   Follow the standard [ERDDAP™ installation instructions](/docs/server-admin/deploy-install).  
         
### WaitThenTryAgain Exception {#waitthentryagain-exception}
A user may get an error message like  
WaitThenTryAgainException:  
There was a (temporary?) problem. Wait a minute, then try again. (In a browser, click the Reload button.)  
Details: GridDataAccessor.increment: partialResults\[0\]="123542730" was expected to be "123532800".

The general explanation of the WaitThenTryAgainException is:  
When ERDDAP™ is responding to a user request, there may be an unexpected error with the dataset (e.g., an error while reading data from the file, or an error accessing a remote dataset). WaitThenTryAgain signals to ERDDAP™ that the request failed (so far) but that ERDDAP™ should try to reload the dataset quickly (it calls [RequestReloadASAP](#requestreloadasap)) and retry the request. Often, this succeeds, and the user just sees that the response to the request was slow. Other times, the reload fails or is too slow, or the subsequent attempt to deal with the request also fails and throws another WaitThenTryAgain. If that happens, ERDDAP™ marks the dataset for reloading but tells the user (via a WaitThenTryAgain Exception) that there was a failure while responding to the request.

That is the normal behavior. This system can deal with many common problems.  
But it is possible for this system to get triggered excessively. The most common cause is that ERDDAP's loading of the dataset doesn't see a problem, but ERDDAP's response to a request for data does see the problem. No matter what the cause is, the solution is for you to deal with whatever is wrong with the dataset. Look in log.txt to see the actual error messages and deal with the problems. If lots of files have valid headers but invalid data (a corrupted file), replace the files with uncorrupted files. If the connection to a RAID is flakey, fix it. If the connection to a remote service is flakey, find a way to make it not flakey or download all the files from the remote source and serve the data from the local files.

The detailed explanation of that specific error (above) is:  
For each EDDGrid dataset, ERDDAP™ keeps the axis variable values in memory. They are used, for example, to convert requested axis values that use the "()" format into index numbers. For example, if the axis values are "10, 15, 20, 25", a request for (20) will be interpreted as a request for index #2 (0-based indices). When ERDDAP™ gets a request for data and gets the data from the source, it verifies that the axis values that it got from the source match the axis values in memory. Normally, they do. But sometimes the data source has changed in a significant way: for example, index values from the beginning of the axis variable may have been removed (e.g., "10, 15, 20, 25" may have become "20, 25, 30"). If that happens, it is clear that ERDDAP's interpretation of the request (e.g., "(20)" is index #2) is now wrong. So ERDDAP™ throws an exception and calls RequestReloadASAP. ERDDAP™ will update the dataset soon (often in a few seconds, usually within a minute). Other, similar problems also throw the WaitThenTryAgain exception.
    
#### RequestReloadASAP {#requestreloadasap}
You may see RequestReloadASAP in the log.txt file right after an error message and often near a [WaitThenTryAgain Exception](#waitthentryagain-exception). It is basically an internal, programmatic way for ERDDAP™ to set a [flag](#flag) to signal that the dataset should be reloaded ASAP.  
     
### Files Not Being Deleted {#files-not-being-deleted}
For a few ERDDAP™ installations, there has been a problem with some temporary files being created by ERDDAP™ staying open (mistakenly) and thus not being deleted. In a few cases, many of these files have accumulated and taken up a significant amount of disk space.

Hopefully, these problems are fixed (as of ERDDAP™ v2.00). If you see this problem, please email the directory+names of the offending files to Chris.John at noaa.gov. You have a few options for dealing with the problem:

*   If the files aren't big and aren't causing you to run out of disk space, you can ignore the problem.
*   The simplest solution is to shut down tomcat/ERDDAP™ (after hours so fewer users are affected). During the shutdown, if the operating system doesn't delete the files, delete them by hand. Then restart ERDDAP.  
         
### JSON-ld {#json-ld}
*   **[Semantic Markup of Datasets with json-ld (JSON Linked Data)](#json-ld)**  
    ERDDAP™ now uses [json-ld (JSON Linked Data)](https://json-ld.org) to make your data catalog and datasets part of the [semantic web](https://en.wikipedia.org/wiki/Semantic_Web), which is Tim Berners-Lee's idea to make web content more machine readable and machine "understandable". The json-ld content uses [schema.org](https://schema.org/) terms and definitions. Search engines ([Google in particular](https://developers.google.com/search/docs/data-types/datasets)) and other semantic tools can use this structured markup to facilitate discovery and indexing. The json-ld structured markup appears as invisible-to-humans &lt;script> code on the https://.../erddap/info/index.html web page (which is a semantic web [DataCatalog](https://schema.org/DataCatalog)) and on each https://.../erddap/info/*datasetID*/index.html web page (which is a semantic web [Dataset](https://schema.org/Dataset)). (Special thanks to Adam Leadbetter and Rob Fuller of the Marine Institute in Ireland for doing the hard parts of the work to make this part of ERDDAP.)  
     
### Out-Of-Date URLs {#out-of-date-urls}
Slowly but surely, the URLs that data providers have written into data files are becoming out-of-date (for example, http becomes https, websites are rearranged, and organizations like NODC/NGDC/NCDC are reorganized into NCEI). The resulting broken links are an ever-present problem faced by all websites. To deal with this, ERDDAP™ now has a system to automatically update out-of-date URLs. If GenerateDatasetsXml sees an out-of-date URL, it adds the up-to-date URL to &lt;addAttributes>. Also, when a dataset loads, if ERDDAP™ sees an out-of-date URL, it silently changes it to the up-to-date URL. The changes are controlled by a series of search-for/replace-with pairs defined in &lt;updateUrls> in ERDDAP's  
\[tomcat\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. You can make changes there. If you have suggestions for changes, or if you think this should be turned into a service (like the Converters), please email Chris.John at noaa.gov.  
     
### CORS {#cors}
*   CORS ([Cross-Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))  
    "is a mechanism that allows restricted resources (e.g. fonts or ERDDAP™ data) on a web page to be requested from another domain outside the domain from which the first resource was served" (Arun Ranganathan). Basically, CORS is a message that can be put in the HTTP header of a response, saying essentially, "it is okay with this site if certain other sites (specific ones, or all) grab resources (e.g., data) from this site and make it available on their site". Thus, it is an alternative to [JSONP](https://en.wikipedia.org/wiki/JSONP).
    
    The developers of ERDDAP™ do not claim to be security experts. We are not entirely clear about the security issues related to CORS. We don't want to make any statement endorsing an action that decreases security. So we'll just stay neutral and leave it up to each ERDDAP™ admin to decide if the benefits or enabling a CORS header are worth the risks. As always, if your ERDDAP™ has any private datasets, it's a good idea to be extra careful about security.
    
    If you want to enable CORS for your ERDDAP™, there are [readily available instructions](https://enable-cors.org/index.html) describing how website administrators can enable a CORS header via their lower level server software (e.g., Apache or nginx). 
    
### Palettes {#palettes}
*   Palettes are used by ERDDAP™ to convert a range of data values into a range of colors when making graphs and maps.
    
    Each palette is defined in a .cpt-style palette file as used by [GMT](https://www.soest.hawaii.edu/gmt/). All ERDDAP™ .cpt files are valid GMT .cpt files, but the opposite is not true. For use in ERDDAP™, .cpt files have:
    
    *   Optional comments lines at the start of the file, starting with "#".
    *   A main section with a description of the segments of the palette, one segment per line. Each segment description line has 8 values:  
        startValue, startRed, startGreen, startBlue, endValue, endRed, endGreen, endBlue.  
        There may be any number of segments. ERDDAP™ uses linear interpolation between the startRed/Green/Blue and endRed/Green/Blue of each segment.
        
        We recommend that each segment specify a start and end color which are different, and that the start color of each segment be the same as the end color of the previous segment, so that the palette describes a continuous blend of colors. ERDDAP™ has a system for creating on-the-fly a palette of discrete colors from a palette with a continuous blend of colors. An ERDDAP™ user can specify if they want the palette to be Continuous (the original) or Discrete (derived from the original). But there are legitimate reasons for not following these recommendations for some palettes.
        
    *   The startValue and endValues must be integers.  
        The first segment must have startValue=0 and endValue=1.  
        The second segment must have startValue=1 and endValue=2.  
        Etc.
    *   The red, green, and blue values must be integers from 0 (none) ... 255 (full on).
    *   The end of the file must have 3 lines with:
        1.  A background rgb color for data values less than the colorbar minimum, e.g.: B 128 128 128  
            It is often the startRed, startGreen, and startBlue of the first segment.
        2.  A foreground rgb color for data values more than the colorbar maximum, e.g.: F 128 0 0  
            It is often the endRed, endGreen, and endBlue of the last segment.
        3.  An rgb color for NaN data values, e.g., N 128 128 128  
            It is often middle gray (128 128 128).
    *   The values on each line must be separated by tabs, with no extraneous spaces.
    
    A sample .cpt file is BlueWhiteRed.cpt:
    
    \# This is BlueWhiteRed.cpt.
    0  0    0    128  1  0    0    255
    1  0    0    255  2  0    255  255
    2  0    255  255  3  255  255  255
    3  255  255  255  4  255  255  0
    4  255  255  0    5  255  0    0
    5  255  0    0    6  128  0    0
    B  0    0    128
    F  128  0    0
    N  128  128  128
    
    See the existing .cpt files for other examples. If there is trouble with a .cpt file, ERDDAP™ will probably throw an error when the .cpt file is parsed (which is better than misusing the information).
    
    You can add additional palettes to ERDDAP. You can make them yourself or find them on the web (for example, at [cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) although you'll probably have to edit their format slightly to conform to ERDDAP's .cpt requirements. To get ERDDAP™ to use a new .cpt file, store the file in *tomcat*/webapps/erddap/WEB-INF/cptfiles (you'll need to do that for each new version of ERDDAP) and either:
    
    *   If you use the default messages.xml file: add the filename to the &lt;palettes> tag in  
        *tomcat*/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.  
        If you do this, you need to do it every time you upgrade ERDDAP.
    *   If you use a custom messages.xml file: add the filename to the &lt;palettes> tag in your custom messages.xml file: *tomcat*/content/erddap/messages.xml . If you do this, you only need to do it once (but there is other work to maintain a custom messages.xml file).
    
    Then restart ERDDAP™ so ERDDAP™ notices the changes. An advantage of this approach is that you can specify the order of the palettes in the list presented to users. If you add a collection, we encourage you to add a prefix with the authors initials (e.g., "KT\_") to the name of each palette to identify the collection and so that there can be multiple palettes which would otherwise have the same name.
    
    Please don't remove or change any of the standard palettes. They are a standard feature of all ERDDAP™ installations. If you think a palette or collection of palettes should be included in the standard ERDDAP™ distribution because it/they would be of general use, please email them to Chris.John at noaa.gov.  
    
### Colorbars {#colorbars}
*   **How does ERDDAP™ generate the colors in a colorbar?**
    
    1.  The user selects one of the predefined [palettes](#palettes) or uses the default, e.g., Rainbow. Palettes are stored/defined in GMT-style .cpt Color Palette Table files. Each of ERDDAP's predefined palettes has a simple integer range, e.g., 0 to 1 (if there is just one section in the palette), or 0 to 4 (if there are four sections in the palette). Each segment in the file covers n to n+1, starting at n=0.
    2.  ERDDAP™ generates a new .cpt file on-the-fly, by scaling the predefined palette's range (e.g., 0 to 4) to the range of the palette needed by the user (e.g., 0.1 to 50) and then generating a section in the new palette for each section of the new palette (e.g., a log scale with ticks at 0.1, 0.5, 1, 5, 10, 50 will have 5 sections). The color for the end point of each section is generated by finding the relevant section of the palette in the .cpt file, then linearly interpolating the R, G, and B values. (That's the same as how GMT generates colors from its Color Palette Table files.) This system allows ERDDAP™ to start with generic palettes (e.g., Rainbow with 8 segments, in total spanning 0 to 8) and create custom palettes on-the-fly (e.g., a custom Rainbow, which maps 0.1 to 50 mg/L to the rainbow colors).
    3.  ERDDAP™ then uses that new .cpt file to generate the color for each different colored pixel in the color bar (and later for each data point when plotting data on a graph or map), again by finding the relevant section of the palette in the .cpt file, then linearly interpolating the R, G, and B values.
    
    This process may seem unnecessarily complicated. But it solves problems related to log scales that are hard to solve other ways.
    
    So how can you mimic what ERDDAP™ is doing? That isn't easy. Basically you need to duplicate the process that ERDDAP™ is using. If you are a Java programmer, you can use the same Java class that ERDDAP™ uses to do all of this:  
    *tomcat*/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Guidelines for Data Distribution Systems {#guidelines-for-data-distribution-systems}
More general opinions about the design and evaluation of data distribution systems can be found [here](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).  
     
### ArchiveADataset {#archiveadataset}
Included in your ERDDAP™ installation is a command line tool called ArchiveADataset which can help you make an archive (a .zip or .tar.gz file) with part or all of a dataset stored in a series of netcdf-3 .nc data files in a file format that is suitable for submission to NOAA's NCEI archive (.nc for gridded datasets or [.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) for tabular datasets, as specified by the [NCEI NetCDF Templates v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)).

ArchiveADataset can make two different archive formats:

*   The "original" format follows these [NCEI Archiving Guidelines](https://www.ncdc.noaa.gov/atrac/guidelines.html), this guide for [Archiving Your Data at NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), and the related [Practices for Ensuring Data Integrity](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
*   The "BagIt" format makes [BagIt files](https://en.wikipedia.org/wiki/BagIt), a standardized archive format promoted by the U.S. Library of Congress, as specified by the [BagIt v0.97 specification](https://tools.ietf.org/html/draft-kunze-bagit-14). NOAA's NCEI may standardize on BagIt files for submissions to the archive.

Not surprisingly, the [global and variable metadata](/docs/server-admin/datasets#global-attributes) that ERDDAP™ encourages/requires is almost exactly the same in-file CF and ACDD metadata that NCEI encourages/requires, so all of your datasets should be ready for submission to NCEI via [Send2NCEI](https://www.nodc.noaa.gov/s2n/) or [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html) (NCEI's Advanced Tracking and Resource tool for Archive Collections).

If you (the ERDDAP™ administrator) use ArchiveADataset to submit data to NCEI, then you (not NCEI) will determine when to submit a chunk of data to NCEI and what that chunk will be, because you will know when there is new data and how to specify that chunk (and NCEI won't). Thus, ArchiveADataset is a tool for you to use to create a package to submit to NCEI.

ArchiveADataset may be useful in other situations, for example, for ERDDAP™ administrators who need to convert a subset of a dataset (on a private ERDDAP) from its native file format into a set of [.ncCF files](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), so that a public ERDDAP™ can serve the data from the .ncCF files instead of the original files.

Once you have set up ERDDAP™ and run it (at least one time), you can find and use ArchiveADataset in the *tomcat*/webapps/erddap/WEB-INF directory. There is a shell script (ArchiveADataset.sh) for Linux/Unix and a batch file (ArchiveADataset.bat) for Windows.

On Windows, the first time you run ArchiveADataset, you need to edit the ArchiveADataset.bat file with a text editor to change the path to the java.exe file so that Windows can find Java.

When you run ArchiveADataset, it will ask you a series of questions. For each question, type a response, then press Enter. Or press ^C to exit a program at any time.

Or, you can put the answers to the questions, in order, on the command line. To do this, run the program once and type in and write down your answers. Then, you can create a single command line (with the answers as parameters) which runs the program and answers all the questions.  
Use the word default if you want to use the default value for a given parameter.  
Use "" (two double quotes) as a placeholder for an empty string.  
Specifying parameters on the command line can be very convenient, for example, if you use ArchiveADataset once a month to archive a month's worth of data. Once you have generated the command line with parameters and saved that in your notes or in a shell script, you just need to make small changes each month to make that month's archive.

The questions that ArchiveADataset asks allow you to:

*   Specify original or Bagit file packaging. For NCEI, use Bagit.
*   Specify zip or tar.gz compression for the package. For NCEI, use tar.gz.
*   Specify a contact email address for this archive (it will be written in the READ\_ME.txt file in the archive).
*   Specify the datasetID of the dataset you want to archive.
*   Specify which data variables you want to archive (usually all).
*   Specify which subset of the dataset you want to archive. You need to format the subset in the same way you would format a subset for a data request, so it will be different for gridded than for tabular datasets.
    *   For gridded datasets, you can specify a range of values of the leftmost dimension, usually that is a range of time. ArchiveADataset will make a separate request and generate a separate data file for each value in the range of values. Since gridded datasets are usually large, you will almost always have to specify a small subset relative to the size of the entire dataset.  
        For example, \[(2015-12-01):(2015-12-31)\]\[\]\[\]\[\]
    *   For tabular datasets, you can specify any collection of constraints, but it is often a range of time. Since tabular datasets are usually small, it is often possible to specify no constraints, so that the entire dataset is archived.  
        For example, &time>=2015-12-01&time&lt;2016-01-01
*   For tabular datasets: specify a comma separated list of 0 or more variables that will determine how the archived data is further subsetted into different data files. For datasets that have  
    [cdm\_data\_type](/docs/server-admin/datasets#cdm_data_type)\=TimeSeries|TimeSeriesProfile|Trajectory|TrajectoryProfile  
    you should almost always specify the variable that has the cf\_role=timeseries\_id (e.g., stationID) or cf\_role=trajectory\_id attribute. ArchiveADataset will make a separate request and generate a separate data file for each combination of the values of these variables, e.g., for each stationID.  
    For all other tabular datasets, you will probably not specify any variables for this purpose.  
    Warning: If the subset of the dataset you are archiving is very large (>2GB) and there is no suitable variable for this purpose, then ArchiveADataset is not usable with this dataset. This should be rare.
*   Specify the file format for the data files that will be created.  
    For gridded datasets, for NCEI, use .nc .  
    For tabular datasets, for NCEI, use [.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) if it is an option; otherwise use .nc.
*   Specify the type of file digest to be created for each data file and for the entire archive package: MD5, SHA-1, or SHA-256. The file digest provides a way for the client (e.g., NCEI) to test whether the data file has become corrupted. Traditionally, these were [.md5 files](https://en.wikipedia.org/wiki/MD5), but now there are better options. For NCEI, use SHA-256 .

After you answer all of the questions, ArchiveADataset will:

1.  Make a series of requests to the dataset and stage the resulting data files in *bigParentDirectory*/ArchiveADataset/*datasetID\_timestamp*/.  
    For gridded datasets, there will be a file for each value of the leftmost dimension (e.g., time). The name of the file will be that value (e.g., the time value).  
    For tabular datasets, there will be a file for each value of the ... variable(s). The name of the file will be that value. If there is more than one variable, the left variables will be used to make subdirectory names, and the rightmost variable will be used to make the filenames.  
    Each data file must be &lt;2GB (the maximum allowed by .nc version 3 files).
2.  Make a file related to each data file with the digest of the data file. For example, if the data file is 46088.nc and the digest type is .sha256, then the digest file will have the name 46088.nc.sha256 .
3.  Make a READ\_ME.txt file with information about the archive, including a list of all the settings you specified to generate this archive.
4.  Make 3 files in *bigParentDirectory*/ArchiveADataset/ :
    
    *   A .zip or .tar.gz archive file named *datasetID\_timestamp*.zip (or .tar.gz) containing all of the staged data files and digest files. This file may be any size, limited only by disk space.
    *   A digest file for the archive file, for example, *datasetID\_timestamp*.zip.sha256.txt
    *   For the "original" type of archive, a text file named *datasetID\_timestamp*.zip.listOfFiles.txt (or .tar.gz) which lists all of the files in the .zip (or .tar.gz) file.
    
    If you are preparing the archive for NCEI, these are the files that you will send to NCEI, perhaps via [Send2NCEI](https://www.nodc.noaa.gov/s2n/) or [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html) (NCEI's Advanced Tracking and Resource tool for Archive Collections).
5.  Delete all of the staged files so that only the archive file (e.g., .zip), the digest (e.g., .sha256.txt) of the archive, and (optionally) the .listOfFiles.txt files remain.

#### ISO 19115 .xml Metadata Files {#iso-19115-xml-metadata-files}
The ArchiveADataset archive package does not include the ISO 19115 .xml metadata file for the dataset. If you want/need to submit an ISO 19115 file for your dataset to NCEI, you can send them the ISO 19115 .xml metadata file that ERDDAP™ created for the dataset (but NMFS people should get the ISO 19115 file for their datasets from InPort if ERDDAP™ isn't already serving that file).

Problems? Suggestions? ArchiveADataset is new. If you have problems or suggestions, See our [section on getting additional support](/docs/intro#support).  
     
