---
sidebar_position: 2
---
# Update
How To Do an Update of an Existing ERDDAP™ on Your Server

## Changes {#changes}
1.  Make the changes listed in [Changes](/changes) in the section entitled "Things ERDDAP™ Administrators Need to Know and Do" for all of the ERDDAP™ versions since the version you were using.  
     
## Java {#java}
2.  If you are upgrading from ERDDAP™ version 2.18 or below, you need to switch to Java 21 (or newer) and the related Tomcat 10. See the regular ERDDAP™ installation instructions for [Java](/docs/server-admin/deploy-install#java) and [Tomcat](/docs/server-admin/deploy-install#tomcat). You'll also have to copy your _tomcat_/content/erddap directory from your old Tomcat installation to your new Tomcat installation.  

## Download {#download}
3.  Download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war) into _tomcat_/webapps .  
    (version 2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, dated 06-11-2025)
     
## messages.xml {#messagesxml}
4. 
    *   Common: If you are upgrading from ERDDAP™ version 1.46 (or above) and you just use the standard messages, the new standard messages.xml will be installed automatically (amongst the .class files via erddap.war).  
         
    *   Rare: If you are upgrading from ERDDAP™ version 1.44 (or below),  
        you MUST delete the old messages.xml file:  
        _tomcat_/content/erddap/messages.xml .  
        The new standard messages.xml will be installed automatically (amongst the .class files via erddap.war).  
         
    *   Rare: If you always make changes to the standard messages.xml file (in place),  
        you need to make those changes to the new messages.xml file (which is  
        WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml after erddap.war is decompressed by Tomcat).  
         
    *   Rare: If you maintain a custom messages.xml file in _tomcat_/content/erddap/,  
        you need to figure out (via diff) what changes have been made to the default messages.xml (which are in the new erddap.war as  
        WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) and modify your custom messages.xml file accordingly.  
         
## Install {#install}
5.  Install the new ERDDAP™ in Tomcat:  
    \* Don't use Tomcat Manager. Sooner or later there will be PermGen memory issues. It is better to actually shutdown and startup Tomcat.  
    \* Replace references to _tomcat_ below with the actual Tomcat directory on your computer.  
     
### Linux and Macs {#linux-and-macs}
1.  Shutdown Tomcat: From a command line, use: _tomcat_/bin/shutdown.sh  
    And use ps -ef | grep tomcat to see if/when the process has been stopped. (It may take a minute or two.)
2.  Remove the decompressed ERDDAP™ installation: In _tomcat_/webapps, use  
    rm -rf erddap
3.  Delete the old erddap.war file: In _tomcat_/webapps, use rm erddap.war
4.  Copy the new erddap.war file from the temporary directory to _tomcat_/webapps
5.  Restart Tomcat and ERDDAP: use _tomcat_/bin/startup.sh
6.  View ERDDAP™ in your browser to check that the restart succeeded.  
    (Often, you have to try a few times and wait a minute before you see ERDDAP™.)  
             
### Windows {#windows}
1.  Shutdown Tomcat: From a command line, use: _tomcat_\\bin\\shutdown.bat
2.  Remove the decompressed ERDDAP™ installation: In _tomcat_/webapps, use  
    del /S/Q erddap
3.  Delete the old erddap.war file: In _tomcat_\\webapps, use del erddap.war
4.  Copy the new erddap.war file from the temporary directory to _tomcat_\\webapps
5.  Restart Tomcat and ERDDAP: use _tomcat_\\bin\\startup.bat
6.  View ERDDAP™ in your browser to check that the restart succeeded.  
    (Often, you have to try a few times and wait a minute before you see ERDDAP™.)

Troubles updating ERDDAP? See our [section on getting additional support](/docs/intro#support).
