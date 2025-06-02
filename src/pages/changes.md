---
title: "ERDDAP™ - Changes"
---
# ERDDAP™ Changes

ERDDAP™ is a great example of [User-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation), where product innovation often comes from consumers (ERDDAP™ users), not just the producers (ERDDAP™ developers). Over the years, most of the ideas for new features and changes in ERDDAP™ have come from users. Those users are credited below for their great ideas. Thank you! Please keep those great suggestions coming!

Here are the changes associated with each ERDDAP™ release.

## Version 2.27.0 {#version-2270}
(released 2025-06-??)

*   **New Features and Changes (for users):**
    *   New data to colorbar converter on servers at /erddap/convert/color.html

*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   Default behavoir is that the cache will now be cleared independent of the major load datasets task. This will allow for more reliable and regular clearing of old cache files. There is additional work to improve server behavoir when low on disk space (returning an error for requests likely to make the server run out of space, and clearing the cache more frequently in low disk circumstances to attempt to prevent errors). In datasets.xml (or setup.xml) you can add/set the new cacheClearMinutes parameter to control how frequently the server checks to clear the cache. Note, the existing cacheMinutes parameter controls the age of files to be kept, the new cacheClearMinutes is for how frequently to do a chache clear.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
    You can disable the new cache clear checks by setting taskCacheClear to false in setup.xml, though that is not recommended.
    cacheClearMinutes is also in the [datasets documentation](/docs/server-admin/datasets#cacheclearminutes).
    
    *   Localized dataset metadata support. It supports localization for values in an addAttributes section. Simply add an attribute with the additional xml:lang tag. For example to add a French title to a dataset your addAttributes section would include:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
    Additional details available in the [localized metadata documentation](/docs/server-admin/localized-metadata).

    *   New Docker Compose file with options for SSL and a barebones Prometheus server. Thanks to Shane St. Savage for the SSL and Jiahui Hu for the Prometheus.

    *   Support for using information in the headers to determine the server URL instead of relying on the config file. This will allow a server to be accessed by multiple names and may simplify certain configurations. Please enable it and send feedback.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    *   Some small changes, bug fixes, and optimizations.  

*   **For ERDDAP™ Developers:**
    *   Refactor to how output file types are defined in code. This should make it so file types can be added without needing to touch many code places.

## Version 2.26 {#version-226}
(released 2025-03-31)

*   **For All:**
    *   Large update to our documentation site: https://erddap.github.io/
        Besides the updated appearance there is improved navigation, search, translation, and it should be easier to maintain going forward!

*   **New Features and Changes (for users):**
    *   Subscriptions and RSS updates should happen more reliably for datasets that get updated frequently from file changes.

*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   The default release requires/supports Java version 21. Back in this release is being able to easily make a Java 17 compatible binary.

    *   New feature to customize the information displayed about datasets in the UI. We expect this to be particularly useful to add things like dataset citations. For more details you can read the [new documentation](/docs/server-admin/display-info). Thanks to Ayush Singh for the contribution!

    *   Additional Prometheus metrics. The biggest one is `http_request_duration_seconds` which includes request response times broken down by: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
        This machine readable format will enable better collection of metrics to understand how users are using the server.

    *   New way to generate ISO19115 XML files. It uses Apache SIS and is a new option in this release. Please enable it and send feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    *   The UI will now create individual links for each url in fields like the infoUrl and summary.

    *   Subscriptions and RSS updates should happen more reliably for datasets that get updated frequently from file changes. If this causes issues, please reach out on GitHub and disable the functionality by adding the below flag to your setup.xml.
    NOT RECOMMENDED
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    *   Subset variables will no longer be automatically generated for dataset type EDDTableFromNcCFFiles. If you were relying on the behavior, you can either (prefered solution) add the subsetVariables to the dataset definition in your datasets.xml, or add the below flag to your setup.xml. If you feel the need to turn this on, please reach out on GitHub so we can better support your use case moving forward.
    NOT RECOMMENDED
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    *   The server will now redirect documentation requests (under downloads/ which is the documentation that's been migrated) to the new documentation site. If needed you can disable this with a flag in setup.xml:
    NOT RECOMMENDED
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    *   Some small changes and bug fixes.  

*   **For ERDDAP™ Developers:**
    *   More code quality improvements and dead code cleanup. This includes minor optimizations, better handling of closable resources, and migrating away from long obsolete data types (like Vector).

    *   Large refactoring to EDStatic to pull out most of the config, message, and metric code. It also better encapsulates initialization and handling of directory paths (these last 2 have more to be done.)

    *   Lots of progress towards an officially supported Docker Image. The plan is to finalize and release after the ERDDAP™ 2.26 release is available.

## Version 2.25 {#version-225}
(released 2024-10-31)

*   **New Features and Changes (for users):**
    *   EDDTableFromFiles can now support queries with only derived outputs (globals, jexl script, or variables).  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   Version 2.25 requires Java 21 or newer. This is the LTS version and has been available for over a year.  
         
    *   The SharedWatchService is now the default. If you need to disable it, please contact chris.john at noaa.gov to let me know, so I can improve it in future versions and add:  
        &lt;useSharedWatchService>false&lt;/useSharedWatchService> to your setup.xml.  
         
    *   The ERDDAP™ servlet will now start at server startup. Which means datasets will begin loading immediately instead of waiting until a request is made.  
         
    *   The removeMVRows parameter in EDDTableFromMultidimNcFiles will now have an effect. Setting it to false may significantly speed up some queries, but this may not be suitable for all datasets. For more information see the [description of the parameter](/docs/server-admin/datasets#removemvrows).  
         
    *   Datasets (EDDTableFromNcFiles and EDDGridFromNcFiles) using zarr files are now supported. They must include "zarr" in either the fileNameRegex or pathRegex. See the [zarr secion in the datasets documentation](/docs/server-admin/datasets#zarr) for more details.  
         
    *   New dataset type, EDDTableFromParquetFiles is now supported. See the [EDDTableFromParquetFiles secion in the datasets documentation](/docs/server-admin/datasets#eddtablefromparquetfiles) for more details.  
         
    *   [Prometheus metrics](https://prometheus.io/) are now available at /erddap/metrics.  
         
    *   A new XML parser implementation is available. This new parser allows using XInclude in datasets.xml. Thanks to Ayush Singh for the feature.  
         
    *   New parameter in datasets.xml to control unusual activity emails. unusualActivityFailPercent defaults to the old value of 25%. Thanks to Ayush Singh for the feature.  
         
    *   New parameter in setup.xml that controls if dataset loading errors are shown on the status.html page. It defaults to true, to disable dataset errors on the status page, set showLoadErrorsOnStatusPage to false: &lt;showLoadErrorsOnStatusPage>false&lt;/showLoadErrorsOnStatusPage>  
         
    *   Some small changes and bug fixes.  
         
*   **For ERDDAP™ Developers:**
    *   Testing separated to unit and integration (slow) tests. Also more tests enabled and tests have been made less flaky.  
         
    *   Error Prone (some checks still disabled) and Spot Bugs integrated through Maven.  
         
    *   Full code base formatted to match the Google Style Guide.  
         

## Version 2.24 {#version-224}
(released 2024-06-07)

*   **New Features and Changes (for users):**
    *   New color palette EK80 for acoustic datasets available. Thanks to Rob Cermak for this.  
         
    *   Fixen an issue where EDDTableAggregateRows did not show proper ranges from all children. Thanks to Marco Alba for the fix and bug report.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: SECURITY CHANGE: Google Authentication might require changes to your CSP.
        
        Specifically, you may also need to add https://accounts.google.com/gsi/style to stlye-src and https://accounts.google.com/gsi/ to connect-src. For the script-src you can now use https://accounts.google.com/gsi/client.
        
        For more information you can go to the [Google page](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) about CSP configuration.  
         
        
    *   New Shared Watch Service. This is a new option for watching directories for updates. It has one thread for each filesystem instead of one thread per dataset. Most likely this will drastically reduce the number of threads used to watch for changes. It does mean all datasets get updated together instead of each dataset having its own update frequency. Most likely this will mean more frequent updates for most datasets.  
        
        To enable this add &lt;useSharedWatchService>true&lt;/useSharedWatchService> to your setup.xml.
        
          
        Please do try this and report back how it works for you to chris.john at noaa.gov.  
         
    *   Fix for incorrect var names in logs. Thanks to Ayush Singh for the fix.  
         
    *   Some small changes and bug fixes.  
         
*   **Improvements for ERDDAP™ developers:**
    *   Support for local development using Docker. Thanks Matt Hopson and Roje.  
         
    *   Support for local development using Jetty and documentation improvements. Thanks Micah Wengren.  
         
    *   Changes to tests to reduce issues cross platform. Thanks Shane St. Savage.  
         

## Version 2.23 {#version-223}
(released 2023-02-27)

Note that this release was done by Bob Simons, thereby showing that he is still around and active during the transition to Chris John, his successor. Stating with this release, all code changes are being done by Chis John, unless specified otherwise.

*   **New Features and Changes (for users):**
    *   (None)  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: SECURITY CHANGE: Google Authentication is now accomplished via the new Google Identity Services library which is part of "Sign In with Google". Google's support for the old "Google Sign In" system will be discontinued 2023-03-31. So if you use Google Authentication in your ERDDAP™ installation, you MUST update to ERDDAP™ v2.23+ before then. (Bob is sorry for the short notice. It's Bob's fault.)  
         
    *   IMPROVED: NCCSV is now v1.2. The change is that the files are now UTF-8-encoded files (they were ASCII) and so can now include any Unicode character as is, without encoding as \\u_hhhh_, although that is still allowed.  
        When writing NCCSV files, ERDDAP™ now writes v1.2 files.  
        ERDDAP™ will still read NCCSV files that follow the v1.0 and v1.1 specification.  
        Thanks to Pauline-Chauvet, n-a-t-e, and thogar-computer for suggesting this and doing the tests to ensure various spreadsheet programs can import UTF-8 files. Thanks to Bob Simons for this code change.  
         
    *   NEW: The status.html web page now has a line near the top which indicates which dataset loadDatasets is currently loading and related statistics, or none if no dataset is being loaded. This can be very helpful to ERDDAP™ administrators trying to figure out why loadDatasets is taking so long. Also, the nGridDatasets, nTableDatasets, and nTotalDatasets counts below that are now instantaneous (previously, they were as of the end of the last major loadDatasets).  
        This change is for Roy Mendelssohn. Thanks to Bob Simons for this code change.  
         
    *   IMPROVED: GenerateDatasetsXml now changes to CF-1.10 (was CF-1.6) in the "Conventions" attributes.  
        Thanks to Bob Simons for this code change.  
         
    *   Some small changes and bug fixes.  
         

## Version 2.22 {#version-222}
(released 2022-12-08)

Note that this release was done by Bob Simons, thereby showing that he is still around and active during the transition to his successor.

*   **New Features and Changes (for users):**
    *   (None)  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: nothing.  
         
    *   SECURITY BUG FIX: There was a Cross Site Scripting-related bug in the code for the language selection drop down. Thanks to NOAA security scans for catching this. This shows that NOAA security is actively and routinely looking for security weaknesses in ERDDAP.  
         
    *   SECURITY FIX: The many libraries used by ERDDAP™ were updated, as usual, as part of this release. This time, this included updating the PostgreSQL driver (which had a security bug) to 42.5.1.  
         
    *   IMPROVED: More small changes to ERDDAP's memory management system should reduce the chance of a given request failing due to lack of available memory.  
         
    *   Some small changes and bug fixes.  
         

## Version 2.21 {#version-221}
(released 2022-10-09)

*   **New Features and Changes (for users):**
    *   (None)  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: For Java 17, you shouldn't use \-d64 in JAVA\_OPTS in setenv.bat or setenv.sh. So if it is there, please remove it. I think that 64 bit mode is now selected when you download a 64 bit version of Java. Thanks to Sam Woodman.  
         
    *   BUG FIX: Sometimes, the new email system attempted to log in too often, which caused Google Email servers to reject all future log in attempts. Now, the email system avoids this and related problems.  
         

## Version 2.20 {#version-220}
(released 2022-09-30)

*   **Don't use v2.20. It is flawed.** But administrators still need to do the TO DO items listed below when upgrading to v2.21+.  
     
*   **New Features and Changes (for users):**
    *   (None)  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   IMPROVED: We re-enabled the old memory management system (Math2.ensureMemoryAvailable) and modified the new memory management system (EDStatic.shedThisRequest) to work better with it. See [Memory Status](/docs/server-admin/additional-information#memory-status) for details.  
         
    *   CHANGED: The default for &lt;ipAddressMaxRequests> in datasets.xml was increased from 7 to 15. It's clear that some legitimate WMS clients can generate more than 7 simultaneous requests.  
         

## Version 2.19 {#version-219}
(released 2022-09-01)

*   **Don't use v2.19. It is flawed.** But administrators still need to do the TO DO items listed below when upgrading to v2.20+.  
     
*   **New Features and Changes (for users):**
    *   NEW: There is a new server-side function, orderByDescending, which works like orderBy, but sorts in descending order. Thanks to Adam Leadbetter.  
         
    *   IMPROVED: Now, graphs (but not maps) will expand to fill the available space on the canvas, i.e., space not used by the legend. You can get tall graphs, square graphs, or wide graphs by adding and manipulating the &.size=_width_|_height_ parameter (where width and height specify the size of the canvas, in pixels) on the request URL. (This is not an option on the .graph web page. You have to add it to the URL manually.) If you don't specify the &.size parameter, requests for .smallPng, .png, .largePng, .smallPdf, .pdf, and .large.pdf have predefined canvas sizes, so your graph will expand to fill the available space, but will usually be roughly square. Thanks to Bob Fleming.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: ERDDAP™ now requires Java 17 and the related Tomcat 10. You must follow the ERDDAP™ installation instructions (or the equivalent e.g., for Docker) to install Java 17 and Tomcat 10 and copy your \[tomcat\]/content directory from your Tomcat 8 installation into the new \[tomcat\] directory. There are no other changes that you need to make to your ERDDAP installation related to this change. In other words, ERDDAP™ works as it did before.
        
        Don't forget to make the ERDDAP-related changes to Tomcat's server.xml and context.xml when you upgrade Tomcat. See ERDDAP's [Tomcat installation instructions](/docs/server-admin/deploy-install#tomcat).
        
        My impression of Java 17 is that it prefers more processing power and memory for long-running, larger applications like ERDDAP™, so it works slightly slower than Java 8 with low power computers (e.g., 2 cores and minimal RAM) and works slightly faster than Java 8 with higher power computers (e.g., 4+ cores and plentiful RAM). So if you see poor performance, use programs like Linux's [top](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) to check resource usage and consider giving ERDDAP™ more resources, notably more memory. Memory is cheap! Most phones have more processors and memory than the servers that some of you are using to run ERDDAP!  
        Thanks to Erin Turnbull.  
         
        
    *   TO DO: If you use ERDDAP™ to access Cassandra, for Cassandra, you need to keep using the version of Java that you were using for running the Cassandra. Just switch to Java 17 for running Tomcat+ERDDAP.  
         
    *   TO DO: Recommended: If your server's CPU has 4+ cores and 8+ GB of RAM, consider changing to these settings in your datasets.xml file: 
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

        If your server has fewer resources, stick to "1" for both of those settings.  
        The nThreads systems for EDDGridFromFiles and EDDTableFromFiles were significantly improved. These changes led to a huge speed improvement (e.g., 2X speedup when nThreads is set to 2 or more) for the most challenging requests (when a large number of files must be processed to gather the results). Some related changes from Chris John will also lead to a general speedup throughout ERDDAP. The code for these changes was contributed by Chris John. Thank you, Chris!  
         
    *   WARNING: hyphens in datasetID's are deprecated and no longer supported (although technically still allowed). They will probably be disallowed in the next release. If you use hyphens, switch to underscores now to avoid trouble. If you make the change now, it's at your own speed. If you wait till the next release, you'll be in a panic and have to deal with it that day.  
         
    *   NEW: Now, for .htmlTable data responses, if the data in a String cell contains data:image/png;base64, followed by a base64 encoded .png image, ERDDAP™ will display an icon (so the user can see the image if they hover over it) and buttons to save the text or the image to the clipboard. Thanks to Marco Alba (who contributed the code) and Bob Simons (who modified it slightly).  
         
    *   NEW: -doNotAddStandardNames  
        If you include \-doNotAddStandardNames as a command line parameter when you run generateDatasetsXml, generateDatasetsXml will not add standard\_name to the addAttributes for any variables other than variables named latitude, longitude, altitude, depth or time (which have obvious standard\_names). This can be useful if you are using the output from generateDatasetsXml directly in ERDDAP™ without editing the output, because generateDatasetsXml often guesses standard\_names incorrectly. (Note that we always recommend that you do edit the output before using it in ERDDAP.) Using this parameter will have other minor related effects because the guessed standard\_name is often used for other purposes, e.g., to create a new long\_name, and to create the colorBar settings. Thanks to Kevin O'Brien.  
         
    *   NEW: You can now put &lt;updateMaxEvents>10&lt;/updateMaxEvents> in datasets.xml (in with the other settings near the top) to change the maximum number of file changes (default=10) that will be processed by the updateEveryNMillis system. A larger number (100?) may be useful when it is very important that the dataset be kept always up-to-date. See the [updateMaxEvents documentation](/docs/server-admin/datasets#updatemaxevents). Thanks to John Maurer.  
         
    *   NEW: Added support for global "real\_time=true|false" String attribute.  
        If this is false (the default) and if the dataset doesn't use updateEveryNMillis, ERDDAP™ will cache responses to requests for file types where the entire file must be created before ERDDAP™ can begin to send the response to the user and reuse them for up to about 15 minutes (e.g., .nc, .png).  
        If this is set to true or if the dataset does use updateEveryNMillis, ERDDAP™ will never cache the response files and will always return newly created files.  
        Thanks to John Maurer.  
         
    *   NEW: Emails are now sent in a separate emailThread. This makes loading datasets and other actions that generate emails faster because loadDatasets doesn't have to wait for the email to be sent, which sometimes takes a long time. The new system can send multiple emails per email session, thus reducing the number of email server logins and reducing the risk of those failing because they are too frequent. There are statistics for the emailThread on the status.html page and diagnostic messages in log.txt -- look for "emailThread". Note that a tally of nEmailsPerSession=0, indicates trouble, i.e., an email session was unable to send any emails.  
        Thanks to Bob Simons.  
         
    *   CHANGED: Emails are now sent with slightly different code (because of Java 17 and the change to emailThread). If you have trouble sending emails, please email erd.data at noaa.gov .  
         
    *   NEW: Subscription actions that "touch" a remote URL are now handled in a separate touchThread. This makes loading datasets and other actions that touch URLs faster because loadDatasets doesn't have to wait for the touch to be completed, which sometimes takes a long time. There are statistics for the touchThread on the status.html page and diagnostic messages in log.txt -- look for "touchThread".  
        Thanks to Bob Simons.  
         
    *   NEW: On the status.html page, in the "Major LoadDatasets Time Series", there is a new "shed" column which indicates the number of requests which were shed because current ERDDAP™ memory use was too high. Requests which are shed will return HTTP status code 503 "Service Available". Those requests weren't necessarily a problem. They just arrived at a busy time. This was part of a revamp of how ERDDAP™ deals with high memory usage.  
         
    *   NEW: On Unix/Linux computers, there is now an "OS Info" line on the status.html web page with current operating system information including CPU load and memory use.  
         
    *   IMPROVED: Now, when ERDDAP™ is restarted and quickRestart=true, EDDTableFromFiles datasets will reuse subset.nc and distinct.nc. For some datasets, this greatly decreases the time to load the dataset (e.g., from 60 seconds to 0.3s). Along with the new emailThread and taskThread (see above), this should greatly speed up restarting ERDDAP™ for many ERDDAP™ installations. Thanks to Ben Adams and John Kerfoot.  
         
    *   CHANGED: Previously, orphan datasets (datasets that are live in ERDDAP™ but are not in datasets.xml) were simply noted on status.html and in log.txt after each major loadDatasets. Now, they are automatically removed from ERDDAP™ and noted on status.html and in log.txt, and emailed to emailEverythingTo. So if you want to remove a dataset from ERDDAP™, now all you have to do is remove its chunk of xml in datasets.xml and it will be removed in the next major loadDatasets. Thanks to Bob Simons.  
         
    *   KNOWN BUG in netcdf-java v5.5.2 and v5.5.3: The EDDGridFromThreddsCatalog option in GenerateDatasetsXml used to work for THREDDS catalogs that include references to datasets in remote THREDDS catalogs. Now it doesn't. I have reported the problem to the netcdf-java developers.  
         
    *   BUG FIX: For Docker users setting setup.xml parameters via ERDDAP\__paramName_: for int and boolean parameters (e.g., emailSmtpPort), ERDDAP™ was incorrectly looking for just _paramName_. Now it looks for _ERDDAP\_paramName_. Thanks to Alessandro De Donno.  
         
    *   CHANGE: The ERDDAP™ testing system now uses an automated system to check that newly created test images are exactly as expected. Thanks to Chris John for the suggestion and Bob Simons for the implementation.  
         

## Version 2.18 {#version-218}
(released 2022-02-23)

*   **New Features and Changes (for users):**
    *   NONE
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   BUG FIX: .nc files weren't closed in some circumstances. Now they are. Thanks to Marco Alba, Roland Schweitzer, John Maurer, and others.  
         

## Version 2.17 {#version-217}
(released 2022-02-16)

*   **New Features and Changes (for users):**
    *   BUG FIX: After changes to the orderBy system a few years ago, Tabledap's Make A Graph didn't properly handle many queries which used orderBy_Xxx_. Now it does. Thanks to Maurice Libes.  
         
    *   CHANGE: Previously, ERDDAP™ rejected requests for .transparentPng's when the latitude and/or longitude values were partly or fully out-of-range. (ERDDAP™ GitHub Issues #19, posted by Rob Fuller -- thanks for posting that Rob) Now it returns transparent pixels for any out-of-range areas of the image. This is useful for many client applications. The code changes to make this change were done entirely by Chris John. Thank you very much, Chris!  
         
    *   CHANGE: Previously, ERDDAP™ rejected griddap requests where the index values for a given dimension were \[high:low\]. Now it makes those requests valid by swapping the low and high values. This solves a longstanding problem for users and for external programs like xtracto which had to keep track of the few datasets that have latitude values which range from high to low in order to make request like \[(50):(20)\] so that the request in index space was \[low:high\]. See https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Now, a request like \[(20):(50)\] for one of these datasets is automatically interpreted as \[(50):(20)\].  
         
    *   CHANGED: .esriAscii requests now trigger a "File : Save As" dialog box in the user's browser. Thanks to Joel Van Noord.  
         
    *   BUG FIX: Now, if the longitude variable of a child dataset of a EDDGridLonPM180 or EDDGridLon0360 dataset has a valid\_min and/or valid\_max attribute, they are removed in the EDDGridLonPM180 or EDDGridLon0360 dataset. Thanks to Roy Mendelssohn.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: If you had set &lt;dataProviderFormActive> to false to temporarily deal with the XSS vulnerability, please set it back to true.  
         
    *   SECURITY BUG FIX: Fixed XSS vulnerability in Data Provider Form. Thanks to Genaro Contreras Gutiérrez.  
         
    *   BUG FIX: When an AWS S3 dirctory had more than 10000 files, ERDDAP™ threw an "Internal Error". This is now fixed. Thanks to Andy Ziegler.  
         
    *   BUG FIX: EDDGridSideBySide didn't allow to variable's sourceNames in different child datasets to be the same. Now it does. Thanks to Joshua Stanford.  
         

## Version 2.16 {#version-216}
(released 2021-12-17)

*   **New Features and Changes (for users):**
    *   CHANGES/BUG FIXES: Numerous small changes to the translation system thanks to suggestions from language-specific editors. Thanks to Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian, and Mike Smit.  
         
    *   ADDED a proper disclaimer and attribution for Google Translate, as required by the terms of Google Translate. Also, the &lt;html> tag in the HTML for every web page now properly identifies non-English web pages as having been machine translated. Thanks to Mike Smit.  
         
    *   BUG FIX: The login web pages are now working properly with different language settings. Thanks to Mike Smit.  
         
    *   NEW orderBySum filter. And new Check All and Uncheck All buttons on EDDGrid Data Access Form web page. Thanks to the code contribution by Marco Alba.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: If you have  
        &lt;questionMarkImageFile>QuestionMark.jpg&lt;/questionMarkImageFile>  
        in your setup.xml file, you need to either remove the whole tag (recommended, so the default file is used) or change it to:  
        &lt;questionMarkImageFile>QuestionMark.png&lt;/questionMarkImageFile>  
         
    *   CHANGE: Just so you know, [Adoptium](https://adoptium.net/?variant=openjdk8) has replaced AdoptOpenJDK as the main/recommended source of Java (OpenJDK).  
         
    *   CHANGE: The log files from ERDDAP™, GenerateDatasetsXml, and DasDds are now UTF-8, not the computer's default character set. I did a lot of checking and made a few changes to ensure that ERDDAP™ always specifies the proper character set when reading or writing all kinds of files, and no longer (in several cases) relies on the computer's default character set. This corrected a few mistakes and moved as close as I could to the goal of using UTF-8 for as many file types as possible (e.g., .log, .xml, .html, .json, .jsonl, .ncHeader). Note that many older file types are required to use ISO-8859-1 (e.g., OPeNDAP .das, .dds, .csv, .tsv, .nc3, .nccsv, .cpt). I previously tried to work with the CF group and with Unidata to add support for UTF-8 in .nc3 files; both were resistant.  
         
    *   NEW: When downloading files from AWS S3, ERDDAP's cacheFromUrl system in EDDGridFromFiles and EDDTableFromFiles now uses the new AWS Transfer Manager to download files via parallelized chunks (thus very fast). The target throughput is set to 20 Gbps, per file, so this works well with all AWS instance types, but especially ones which have excellent "Networking Performance". With this change ERDDAP's cacheFromUrl system now offers comparable speeds to xarray's approach of parallelized downloads of pre-chunked files, but without the need to convert the source files from .nc and .hdf into chunked xarray files. In fact, ERDDAP's system is better if there is a subsequent request to read from the same file, because ERDDAP™ now has a local copy of the file. Our community has spent years standardizing on .nc and .hdf files. Now we don't have to toss that all out just to get good performance when storing data in AWS S3. Thanks to Rich Signell.  
         
    *   CHANGE: searchEngine=Lucene is, for now, deprecated. It is a complex system which often yields results which are slightly different from the more desirable behavior of searchEngine=original. For almost all ERDDAP™ installations, the time savings of Lucene don't offset the differences in results. Please use searchEngine=original instead if possible. If that causes problems, please email Bob.  
         
    *   CHANGE: The Lucene searchEngine now behaves more like the original searchEngine. There are no longer any cases where lucene thinks a dataset matches and original doesn't. Also, lucene's rankings now equal original's rankings (because original is now always used to compute the rankings).  
         
    *   BUG FIX: Starting in a recent release, ERDDAP™ stopped seeing more than the first 1000 objects in a given AWS S3 bucket. Now, ERDDAP™ again sees all of the objects. Thanks to Andy Ziegler.  
         
    *   BUG FIX: Now EDDTableAggregateRows removes the actual\_range attribute whenever one or more of the child datasets doesn't ever know its variables' actual\_range (e.g., EDDTableFromDatabase). Thanks to Erik Geletti.  
         

## version 2.15 {#version-215}
(released 2021-11-19)

*   **New Features and Changes (for users):**
    *   ERDDAP™ has a new system to let user's specify the language to be used for all web pages. If an ERDDAP™ installation is set up to use it, the list of languages will appear in the upper right corner of every web page. ERDDAP™ URL's from before this version continue to work and always return English content, as before.
        
        Not all text or all web pages were translated. There were time constraints on this project that prevented Qi and Bob from getting to 100%.
        
        The obvious question is: why did we put so much effort into this when Chrome will translate web pages on-the-fly? The answer is: this way, we get much more control over how the translation is done. Notably, there are lots of words that shouldn't be translated on the web pages, e.g., the titles and summaries of datasets, the names of variables, parameters, units, and organizations. Much of the translation effort was identifying words and phrases that shouldn't be translated. Also, the machine translations tended to mangle certain types of HTML markup. Managing the translation allowed us to minimize this problem.
        
        The translation project was done by Qi Zeng (a Google Summer of Code intern) and Bob Simons using Google's Translation web service. It was a huge project. Thanks, Qi!
        
    *   BUG FIX: ERDDAP™ now allows ORCID ID's to have X as last digit. Thanks to Maurice Libes.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO:
        
        *   You need to make a few changes related to ERDDAP's new system to let users specify the language for web pages.
            *   On the first line of your setup.xml and datasets.xml files, change to: encoding="UTF-8" and change the document's encoding in your text editor so it is saved as a UTF-8 file. GenerateDatasetsXml now assumes that the datasets.xml is a UTF-8 file.
            *   Programmers who compile ERDDAP: All of ERDDAP™ .java files should be treated as UTF-8 files by default. You may need to add "-encoding UTF-8" to the javac command line. (I did.)
            *   To enable this system (strongly recommended), in the &lt;startBodyHtml5> tag that you specify in datasets.xml, change "&amp!loginInfo;" into "&amp!loginInfo; | &amp!language;" so that the list of languages appears in the upper right corner of every ERDDAP™ web page.
            *   ERDDAP™ only uses the &lt;startBodyHtml5> tag that you specify in datasets.xml to specify the HTML content for the banner at the top of every ERDDAP™ web page, no matter what language the user selects. If you change that tag to use  
                "&EasierAccessToScientificData;" instead of "Easier access to scientific data" and  
                "&BroughtToYouBy;" instead of "Brought to you by", ERDDAP™ will use translated versions of those phrases in the banner.
            *   Similarly, the new default &lt;theShortDescriptionHtml> in datasets.xml is
                
```
                <theShortDescriptionHtml><!\[CDATA\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \[standardShortDescriptionHtml\]
                \]\]></theShortDescriptionHtml>
```
                The last 3 lines of content are things that will be substituted with translated text. If you convert any of them (notably &thisParticularErddap;) or all of them to explicit text in datasets.xml (which has priority, if present) or messages.xml, that text will appear no matter what language the user selects. This is not perfect, but I figured that few administrators would want to edit &lt;theShortDescriptionHtml> in 35 different files to provide 35 different translated versions of that tag.
        
          
         
    *   CHANGED: Some errors are now handled slightly differently and so may be added to the tally of "Failed Requests" on status.html and in the Daily Report Email. So those numbers may be somewhat larger than before.  
         
    *   BUG FIX: GenerateDatasetsXml for EDDGridLon0360 and EDDGridLonPM180 now excludes source datasets with datasetID=~".\*\_LonPM180" and datasetID=~".\*\_Lon0360", respectively.  
         

## Version 2.14 {#version-214}
(released 2021-07-02)

*   **New Features and Changes (for users):**
    *   (none)  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   NEW: EDDGridLon0360 which makes a gridded dataset with longitude values &gt;=0 and &lt;=360 from a gridded dataset with longitude values &gt;=-180 and &lt;=180. See the [EDDGridLon0360 documentation](/docs/server-admin/datasets#eddgridlon0360). Thanks to Dale Robinson.  
         
    *   NEW: ERDDAP™ administrators can now override any value in setup.xml via an environment variable named ERDDAP\__valueName_ before running ERDDAP. For example, use ERDDAP\_baseUrl overrides the &lt;baseUrl> value. This can be handy when deploying ERDDAP™ with a container, as you can put standard settings in setup.xml and then supply special settings via environment variables. If you supply secret information to ERDDAP™ via this method, be sure to check that the information will remain secret. ERDDAP™ only reads the environment variables once per startup, in the first second of startup, so one way to use this is: set the environment variables, start ERDDAP™, wait until ERDDAP™ is started, then unset the environment variables. Thanks to Marc Portier.  
         
    *   IMPROVED: Now, if some files in an EDDTableFrom...Files dataset with a lot of files have some very long String values, the dataset will load much faster and respond to requests much faster. Previously, ERDDAP™ would allocate a lot of space for the min and max String values in the files which are stored with file information for such datasets. The resulting file was huge, causing it to be written and read slowly. Thanks to OBIS.  
         
    *   IMPROVED: Now, ERDDAP™ does a better job of interpreting unusual and invalid character sequences in CSV files. Thanks to OBIS.  
         
    *   FIX: After a year of trouble with Cassandra, I finally successfully installed Cassandra (v2) again and so was able to rerun the tests with Cassandra v2. So now I can more confidently state that ERDDAP™ works with Cassandra v2 and v3. Thanks to ONC.  
         

## Version 2.12 {#version-212}
(released 2021-05-14)

*   **New Features and Changes (for users):**
    *   BUG FIX: If you're on the subscription blacklist, you now can't request a list of your subscriptions.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   TO DO: NEW: system to automatically limit the ability of malicious users and overly aggressive legitimate users to make a large number of simultaneous requests which would degrade system performance for other users. There are 3 new optional tags in datasets.xml which you can/should add right after &lt;graphBackgroundColor> :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

        For further information, see [ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests). ERDDAP™ also now prints the "Number of unique users (since startup)" on the status.html page.  
        Thanks to the person in China attacking my ERDDAP™ installation.  
         
    *   CHANGE to Postgresql driver behavior: When I updated the Postgresql driver, the column names in the table list generated by Postgresql and GenerateDatasetsXml came back all uppercase, instead of all lowercase, as before. I don't know if that will affect other things since databases often consider those names to be case insensitive. My test dataset still works correctly. But if your dataset stops working with this ERDDAP™ update, this is the possible cause to pursue first.  
         
    *   BUG FIX: ERDDAP™ now also handles private AWS S3 files correctly. There were other related improvements to the handling of AWS S3 files. Thanks to Michael Gangl and Dylan Pugh.  
         
    *   NEW: EDDGridFromNcFiles and EDDGridFromNcFilesUnpacked can now read data from "structures" in .nc4 and .hdf4 files. To identify a variable that is from a structure, the &lt;sourceName> must use the format: _fullStructureName_|_memberName_, for example group1/myStruct|myMember . Thanks to NRL.  
         
    *   CHANGED: Now, if current memory usage plus this request is even slightly high, griddap sets nThreads for this request to 1. Thus, ERDDAP™ conserves memory when memory is scarce. Thanks to the person in China attacking my ERDDAP™ installation.  
         
    *   NEW system to monitor the number of open files (which includes sockets and some other things, not just files) in Tomcat on Linux computers. If some files mistakenly never get closed, the number of open files may increase until it exceeds the maximum allowed and numerous really bad things happen. So now, on Linux computers (the information isn't available for Windows):
        
        *   There is a new "Open Files" column on the far right of the status.html web page showing the percent of max files open. On Windows, it just shows "?".
        *   When ERDDAP™ generates that information at the end of each major dataset reload, it will print to the log.txt file:  
              openFileCount=_current_ of max=_max_ %=_percent_
        *   If the percentage is >50%, an email is sent to the ERDDAP™ administrator and the emailEverythingTo email addresses.
        
        To find out more, or if you see this problem on your ERDDAP™, see [Too Many Open Files](/docs/server-admin/additional-information#too-many-open-files).  
        Thanks to the person in China attacking my ERDDAP™ installation.  
         
    *   NEW: I added a lot of checking for and handling of "Too many open files", so the task just stops and the user sees the error message. Data files will no longer be marked as bad if reading them results in a "Too many open files" error.  
         
    *   NEW \[bigParentDirectory\]/badFilesFlag directory:  
        If you put a file in this directory with a datasetID as the file name (the file contents don't matter), ERDDAP™ will delete the badFiles.nc file for that dataset (if any) and reload the dataset ASAP. This causes ERDDAP™ to try again to work with the files previously (erroneously?) marked as bad. Thanks to Marco Alba.  
         
    *   CHANGED: At startup, if an EDDGridFrom...Files or EDDTableFrom...Files dataset initially has 0 files in its list of known valid files (e.g., it's a new dataset), then ERDDAP™ defers loading it and sets a flag so that it will be loaded ASAP after the major loadDatasets is finished. This speeds up the initial startup when there are new datasets.  
         
    *   CHANGED: FileVisitorDNLS.testAWSS3() and FileVisitorSubdir.testAWSS3(); now use the AWS v2 (not v1) SDK. So now the Git ERDDAP™ distribution now includes all needed files and you no longer need to manually add the massive v1 AWS SDK jar file.  
         
    *   CHANGED: I switched to using Maven to detect/gather dependencies (the .jar files in /lib). The change to v2 of the AWS SDK necessitated this. It will be needed for other imported code in the future. A huge thanks to Kyle Wilcox who provided the pom.xml he created and uses, which solved several problems for me.  
         
    *   CHANGED: The classpath parameter (-cp) used in GenerateDatasetXml, DasDds and other small programs that come with ERDDAP™, and in the advice to programmers is now much simpler and shouldn't ever change again since it refers to the directory, not the individual files:  
        \-cp classes;C:\\programs\\\_tomcat\\lib\\servlet-api.jar;lib\\\*  
        (or ':' instead of ';' for Linux and Macs).  
        (I should have done this years ago when it became an option.)  
         
    *   NEW: GenerateDatasetsXml has a new utility option: findDuplicateTime which will search through a collection of gridded .nc (and related) files to find files with duplicate time values. See [findDuplicateTime](/docs/server-admin/datasets#findduplicatetime)  
         
    *   NEW: datasets.xml can now include a &lt;palettes> tag which overrides the &lt;palettes> tag value from messages.xml (or reverts to the messages.xml value if it is empty). This lets you change the list of available palettes while ERDDAP™ is running. Also, if you have a cptfiles subdirectory in the ERDDAP™ content directory, ERDDAP™ will copy all the \*.cpt files in that directory into the \[tomcat\]/webapps/erddap/WEB-INF/cptfiles directory each time ERDDAP™ starts up. Together, these changes let you add palettes and have the changes persist when you install a new version of ERDDAP. See the [palettes documentation](/docs/server-admin/datasets#palettes)  
        Thanks to Jennifer Sevadjian, Melanie Abecassis, and perhaps other CoastWatch people.  
         
    *   CHANGED: [&lt;slowDownTroubleMillis>](/docs/server-admin/datasets#slowdowntroublemillis) is now used for all failed requests, not just a few types.  
         
    *   CHANGED: The RunLoadDatasets thread now interrupts the LoadDatasets thread at 3/4 LoadDatasetsMaxMinutes so there is more time for LoadDatasets to notice the interruption and exit gracefully. Also there are more and better diagnostic messages for this.  
         
    *   CHANGED from the old version of Lucene to v8.7.0.  
         
    *   CHANGE: Emails sent by ERDDAP™ now appear with a fixed width font.  
         
    *   CHANGE: EDDGridFromFiles now gets axis values as well as attributes from FIRST|LAST file, as specified in &lt;metadataFrom>. Thanks (not) to Ken Casey, et al.  
         
    *   ADDED support for the invalid units "degree\_North" and "degree\_East" which are erroneously used by the recent files (since 2020-10-01) in the AVHRR Pathfinder Version 5.3 L3-Collated (L3C) SST datasets (nceiPH53sstd1day and nceiPH53sstn1day). ERDDAP™ can now standardize them to valid units. Thanks (not) to Ken Casey, et al.  
         

## Version 2.11 {#version-211}
(released 2020-12-04)

*   **New Features and Changes (for users):**
    *   BUG FIX: OrderByMean threw a NullPointerException if a variable had just one of \_FillValue or missing\_Value defined. Now it handles the situation correctly. Thanks to Marco Alba.  
         
    *   BUG FIX: There were problems with the ODV text files created by ERDDAP™ in v2.10. Those problems are fixed. Thanks to Shaun Bell.  
         
    *   BUG FIX: Just in ERDDAP™ v2.10: If the lat lon bounds were specified in the URL, the bounding box wasn't drawn on the world map. Now it is again. Thanks to John Maurer.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   BUG FIX: Just in ERDDAP™ v2.10: The script files for ArchiveADataset, GenerateDatasetsXml and DasDds didn't work because they didn't have the changes to the classpath which were added with ERDDAP™ v2.10. Now they do. Thanks to Marco Alba.  
         
    *   NEW: In datasets.xml, you may now have the tag:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

        Currently, if true (or if the tag is empty, or if the tag isn't in the file), when a user's request leads to a NullPointerException, ERDDAP™ will email the stack trace to erd.data at noaa.gov (the ERDDAP™ development team). This should be safe and secure since no confidential information (e.g., the requestUrl) is included in the email. This should make it possible to catch any obscure, totally unexpected bugs that lead to NullPointerExceptions. Otherwise, the user sees the exceptions, but the ERDDAP™ developers don't, so we don't know there is a problem that needs to be fixed.
        
        It is possible that this tag will lead to other, similar diagnostic information being emailed to erd.data at noaa.gov in the future. The email's content will always be minimal and related to bugs, and not, for example, usage information. Thanks to Marco Alba.  
         
        
    *   CHANGED: Now, common compressed file types (.bz2, .gz, .gzip, .tar, .tgz, .z, .zip) are also forbidden for byte range requests. This is specified via &lt;extensionsNoRangeRequests> in messages.xml.  
         
    *   KNOWN PROBLEM: As with ERDDAP™ 2.10, .ncml files which try to change an attribute, don't change the attribute. This is a known bug in netcdf-java which I have reported and they say will be fixed in the next release of netcdf-java.  
         

## Version 2.10 {#version-210}
(released 2020-11-05)

*   **New Features and Changes (for users):**
    *   NEW: The new [Interpolate](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) converter efficiently interpolates values from a gridded dataset's values. As such, it is particularly useful for researchers working with animal track data. This converter takes in a table with latitude, longitude, and time columns (and perhaps other columns) and returns a table with additional columns with interpolated values. Thus, this is similar to the popular [Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto) script originally created by Dave Foley, but offers the advantage of processing up to 100 points per request. Thanks to Dave Foley and Jordan Watson (NMFS).  
         
    *   IMPROVED: Advanced Search is now strict for non-.html requests. It will now throw exceptions for requests that have permanent errors (e.g., requests where minLat > maxLat) or temporary errors (e.g., requests for a standard\_name that doesn't exist). For .html requests, Advanced Search is unchanged: as with Google searches, it does its best and silently fixes or ignores errors. Thanks to Rich Signell.  
         
    *   IMPROVED: The map on the Advanced Search page is now larger (you still have to squint, but less) and significantly more accurate (but still not perfect). Thanks to John Maurer.  
         
    *   IMPROVED: The "Draw land mask" setting on Make A Graph web pages and the &.land=... setting in URLs that request a map now supports two more options:  
        "outline" just draws the landmask outline, political boundaries, lakes and rivers.  
        "off" doesn't draw anything.  
        See the [&.land=... documentation](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).  
        Thanks to John Maurer.  
         
    *   IMPROVED: Graphs and maps created by ERDDAP™ can now use three new marker types: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. The code for this was contributed by Marco Alba of ETT / EMODnet Physics. Thanks to Marco Alba.  
         
    *   NEW: "files" system now supports plainFile type responses (.csv, .htmlTable, .itx, .json, .jsonlCSV1, .jsonlCSV, .jsonlKVP, .mat, .nc, .nccsv, .tsv, or .xhtml.), e.g., [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .  
        Thanks to Kyle Wilcox.  
         
    *   IMPROVED: The URLs generated when a user uses a Data Access Form (.html) or a Make-A-Graph (.graph) web page now properly percent-encode the characters \[ and \]. This makes the URLs a little harder for humans to read, but is better from a web-security standpoint. Administrators now have the option of setting relaxedQueryChars='\[\]|' in the Tomcat server.xml file (less secure) or not (more secure).  
        Thanks to Antoine Queric, Dominic Fuller-Rowell, and others.  
         
    *   NEW: If a request to an EDDTable datasets includes &addVariablesWhere(_attributeName, attributeValue_) , ERDDAP™ will add all variables which have _attributeName=attributeValue_ to the list of requested variables.  
        See the [&addVariablesWhere documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Thanks to Aurelie Briand, et al.  
         
    *   CHANGED: ERDDAP™ now refuses byte range requests to /files/ .nc or .hdf files. Don't try to connect to remote .nc or .hdf files as if they were local files. It is horribly inefficient and often causes other problems. Instead:
        *   Use (OPeN)DAP client software to connect to ERDDAP's DAP services for this dataset (which have /griddap/ or /tabledap/ in the URL). That's what DAP is for.
        *   Use the dataset's Data Access Form to request a subset of data.
        *   If you need the entire file or repeated access over a long period of time, use curl, wget, or your browser to download the entire file, then access the data from your local copy of the file.  
             
    *   IMPROVED: the .odvTxt output option has been rewritten to support the new version of ODV .txt files and to support the proper representation of trajectory, timeseries, and profile data.  
         
    *   IMPROVED: Now, search terms in double quotes are interpreted as a json string, so they can have \\ encoded characters. Among other things, this lets you search for an exact match for an attribute, e.g., "institution=NOAA\\n" won't match a dataset with institution=NOAA NMFS. Thanks to Dan Nowacki.  
         
    *   IMPROVED: In additional places, floating point numbers (especially floats converted to doubles) now appear as a slightly more rounded version of the number in additional places, e.g. a float previously shown as a double like 32.27998779296875, might now appear as 32.28. Thanks to Kyle Wilcox.  
         
    *   BUG FIX: unsigned integer audio files were read slightly incorrectly. Now they are read correctly.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   WARNING: The first time you run ERDDAP™ v2.10, some datasets based on local data files will load **very** slowly because ERDDAP™ needs to recreate its database of file information. After the slow initial reload, they will load quickly, as before. Please be patient.  
         
    *   THINGS YOU MUST DO:
        *   When you first run v2.10, some datasets may not load because ERDDAP™ is now stricter about some metadata. As before, ERDDAP™ will email you a Daily Report when it first loads up. That will include the error messages for each of the datasets that didn't load. Read the error messages to figure out the problems. In most cases, you just need to make a small change to the dataset's metadata to solve the problem.  
             
        *   In datasets.xml, search for &lt;sourceName&gt;= (note the '=' sign, which identifies a [fixed-value sourceName](/docs/server-admin/datasets#fixed-value-sourcenames)). For most ERDDAP™ setups, these are rare. If any of the values after '=' are strings (not numbers), you MUST now enclose the string in double quotes. For example,  
            Before: &lt;sourceName&gt;=KZ401&lt;/sourceName>  
            After: &lt;sourceName&gt;="KZ401"&lt;/sourceName>  
             
        *   NEW: There is a new optional setting in setup.xml, &lt;defaultAccessibleViaFiles>, which sets the default &lt;accessibleViaFiles> for each of the datasets. The default for this new tag is false, which mimics the previous ERDDAP™ behavior. This lower level setting can be overruled by a given dataset's &lt;accessibleViaFiles> setting.
            
            RECOMMENDED (because there are users who want this):  
            If you want to make all EDD...FromFiles datasets accessible via the files system, then
            
            1.  Add this tag to your setup.xml file: 
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.  (Optionally) Remove all the  
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
                in datasets.xml since the default is now true.  
                 
        *   Add \_FillValue Attributes:  
            ERDDAP™ used to have a default \_FillValue for all integer variables: the maximum value of the data type (e.g., 127 for byte variables). Now it doesn't. In order to avoid having these values shown as data values (not missing values), you need to explicitly state these via \_FillValue attributes. From now on, each time you start up ERDDAP™, it will send the administrator an email with a .csv table with a list of integer source variables which don't have \_FillValue or missing\_value attributes, and the suggested new \_FillValue attributes. See [Add \_FillValue Attributes](/docs/server-admin/datasets#add-_fillvalue-attributes) for more information and instructions.  
             
        *   If you compile ERDDAP™, you need to modify the classpath parameter on the javac command lines to add a reference to these new jar's: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .  
             
    *   CHANGED: Tomcat 9 is now the recommended version of Tomcat for ERDDAP. The latest version of Tomcat 8.5+ is also fine for now. We cleaned up ERDDAP's [Tomcat installation instructions](/docs/server-admin/deploy-install#tomcat).
        
        The latest version of Java 8 (not Java 9, 10, 11, ...) from [AdoptOpenJDK](https://adoptopenjdk.net/) remains the recommended version of Java for ERDDAP. Java 8 has Long Term Support from AdoptOpenJDK so it remains safe to use, but remember to get the latest version of it periodically for security reasons.
        
    *   NEW: Script SourceNames / Derived Variables in Tabular Datasets  
        EDDTableFromFiles, EDDTableFromDatabase, and EDDTableFromFileNames datasets may now include expressions and scripts in the sourceName. This lets you make new variables based on existing variables in the source files. The calculation for a given new variable is done within one row of the results, repeatedly for all rows. For example, to make a longitude variable with values in the range -180 - 180° from a variable with values in the range 0 - 360°:  
        &lt;sourceName&gt;=Math2.anglePM180(row.columnDouble("lon"))&lt;/sourceName>  
        For details, see [Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
        Thanks to Bob Simons (who planned this before ERDDAP™ v1.0 and finally found a way to implement it), Kevin O'Brien, Roland Schweitzer, John Maurer, and the Apache JEXL library for doing the really hard part (and doing it well).  
         
    *   NEW: Unsigned integer data types (ubyte, ushort, uint, ulong) are now supported. Note that many file types (e.g., .das, .dds, .nc3) don't support all of these new data types. See the [Data Type documentation](/docs/server-admin/datasets#data-types) for details about how ERDDAP™ deals with these differences. Notably, since (OPeN)DAP, notably the .dds response, doesn't support signed bytes, longs, or ulongs, you may want to use ERDDAP's tabular representation of .das and .das as seen in the http.../erddap/**info**/_datasetID_.html web page (for example, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) which you can also get in other file types or the .nccsvMetadata response (for example, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ), both of which supports all data types in all situations.
        
        WARNING: For datasets that are affected by this change, it is possible that you will see problems with the dataset because the data that ERDDAP™ reads from the source may be different (e.g., variables previously read as signed integers may now be read as unsigned integers). The resulting problems include: new files not being added to the dataset, and/or errors when you try to access the data. If a dataset has problems, the first thing to try is to [set a hardFlag](/docs/server-admin/additional-information#hard-flag) for the dataset. If that doesn't resolve the problem, then you have to look at log.txt to see the error messages, delve into the datasets.xml for the dataset, and/or perhaps rerun generateDatasets.xml for the dataset.  
        Thanks to netcdf-java 5.x (which forced the issue) and the upcoming CF 1.9.
        
    *   IMPROVED: There is now [better documentation/advice](/docs/server-admin/datasets#s3-buckets) for how to create a dataset from files in AWS S3 buckets. Thanks to Micah Wengren.  
         
    *   CHANGED: There are several changes related to the "files" system.
        *   The code to handle this was rewritten to be usable by more classes.  
             
        *   NEW: User requests for directory listings can now request that the response be one of the standard plain table types by appending the desired file extension: .csv, .htmlTable, .itx, .json, .jsonlCSV1, .jsonlCSV, .jsonlKVP, .mat, .nc, .nccsv, .tsv, or .xhtml). For example,  
            [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
            Thanks to Kyle Wilcox and Shane St Savage.  
             
        *   IMPROVED: Now, GenerateDatasetsXml won't include a &lt;accessibleViaFiles> tag in the output. The assumption is that the dataset will rely on the value of the new &lt;defaultAccessibleViaFiles> tag in setup.xml. See [accessibleViaFiles](/docs/server-admin/datasets#accessibleviafiles).  
             
        *   IMPROVED: Additional dataset types now support accessibleViaFiles: EDDGridSideBySide, EDDGridAggregateExistingDimension, EDDGridFromErddap, EDDTableFromErddap, EDDGridFromEDDTable, EDDTableFromEDDGrid, and EDDGridFromEtopo. For these, the files from a given remote/child dataset will only be accessible if both the parent and the the remote/child dataset have accessibleViaFiles set to true (perhaps via &lt;defaultAccessibleViaFiles>). Thanks to Damian Smyth and Rob Fuller.  
             
        *   TO DO / RECOMMENDATION: We recommend making all relevant datasets accessible via the files system by setting &lt;defaultAccessibleViaFiles> to true in setup.xml because there is a group of users for whom this is the preferred way to get the data. Among other reasons, the "files" system makes it easy for users to see which files are available and when they last changed, thus making it easy for a user to maintain their own copy of the entire dataset. If you generally don't want to make datasets accessible via the files system, set &lt;defaultAccessibleViaFiles> to false. In either case, just use &lt;accessibleViaFiles> for the few datasets which are exceptions to the general policy set by &lt;defaultAccessibleViaFiles> (for example, when the dataset uses .ncml files, which aren't really useful to users).  
             
    *   IMPROVED: Now, if a source dataset has CF grid\_mapping information, generateDatasetsXml for gridded datasets will add the information to global &lt;addAtts>, and the information will be added to global &lt;sourceAtts> everytime data is read from the file. The information will appear in the dataset's global attributes as a set of attributes with the prefix grid\_mapping\_ .  
         
    *   IMPROVED: Support for groups when reading .nc4 (and to some extent in .hdf5) files. Generally, an ERDDAP™ dataset will be constructed from the variables in one of the file's groups. Also, GenerateDatasetsXml for EDDGridFromNcFiles and EDDGridFromNcFilesUnpacked now asks for a "group" (e.g., "" for any/all groups, "someGroup", "someGroup/someSubGroup", or "\[root\]" for just the root group). Thanks to Charles Carleton and Jessica Hausman.  
         
    *   IMPROVED: GenerateDatasetsXml for EDDGridFromNcFiles and EDDGridFromNcFilesUnpacked now support an optional "DimensionsCSV" parameter which lets you specify the source names of the dimensions that you want this dataset to use. Use "" to get the variables that use the most dimensions, as before. Also, a related small bug that occurred with this type of file is now fixed. Thanks to Sujal Manandhar.  
         
    *   BUG FIX: GenerateDatasetsXml now properly lists "EDDTableFromJsonlCSVFiles" (not "EDDTableFromJsonlCSV") as one of the EDDType options. Thanks to Andy Ziegler.  
         
    *   IMPROVED: EDDGridFromNcFilesUnpacked now standardizes "units" attributes to standard/"canonical" udunits (the same method as the Units converter). For example, "meter per second", "meters/second", "m.s^-1", and "m s-1" all become "m s-1". Thanks to Andy Ziegler.
        
        WARNING: It is possible this will cause problems for some existing datasets (e.g., cause new files to be labeled "bad"). If so, [set a hardFlag](/docs/server-admin/additional-information#hard-flag) for the dataset so that all of the source files will be reread with the new system.
        
    *   IMPROVED: Now, a variable's &lt;sourceName> can specify a fixed value of =NaN and the variable can have an actual\_range attribute which specifies a finite range. This is sometimes useful so that a dataset (notably an EDDTableFromFileNames dataset) can have dummy variable(s) (e.g., latitude, longitude, time) with fixed values of NaN, but with a valid actual\_range (as set by the attribute). Then, in Advanced Search a user can search for datasets which have data in a specific latitude, longitude, time range and this dataset will be able to say it does have relevant data (although all the actual rows of data will show NaN). See the [fixed value documentation](/docs/server-admin/datasets#fixed-value-sourcenames).  
        Thanks to Mathew Biddle.  
         
    *   NEW: Now, the datasets.xml chunk for a EDDTableFromAsciiFiles or EDDTableFromColumnarAsciiFiles dataset can include a tag which tells ERDDAP™ to ignore all of the lines at the top of the file up to and including the line which matches the specified regular expression. For example,  
        &lt;skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\*&lt;/skipHeaderToRegex>  
        will ignore all lines up to and including a line that starts with "\*\*\* END OF HEADER". See the [&lt;skipHeaderToRegex> documentation](/docs/server-admin/datasets#skipheadertoregex).  
        Thanks to Eli Hunter  
         
    *   NEW: Now, the datasets.xml chunk for a EDDTableFromAsciiFiles or EDDTableFromColumnarAsciiFilesdataset can include a tag which tells ERDDAP™ to ignore all of the lines in the file which match the specified regular expression. For example,  
```
        <skipLinesRegex>#.\*</skipLinesRegex>  
```

        will skip all lines which start with "#". See the [&lt;skipLinesRegex> documentation](/docs/server-admin/datasets#skiplinesregex).  
        Thanks to Eli Hunter.  
         
    *   NEW: The datasets.xml chunk for any EDDTable dataset may now include &addVariablesWhere(_attributeNamesCSV_) . If it does, ERDDAP™ will add a widget for each of the specified attributeNames to the dataset's Data Access Form (.html web page) to make it easy for users to add &addVariablesWhere(_attributeName, attributeValue_) to the request.  
        See the [&addVariablesWhere documentation](/docs/server-admin/datasets#addvariableswhere).  
        Thanks to Aurelie Briand, et al.  
         
    *   NEW Third-Party Tool: ERDDAP-lint  
        ERDDAP-lint is a program from Rob Fuller and Adam Leadbetter of the Irish Marine Institute that you can use to improve the metadata of your ERDDAP™ datasets. ERDDAP-lint "contains rules and a simple static web application for running some verification tests against your ERDDAP™ server. All the tests are run in the web browser." Like the [Unix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software)), you can edit the existing rules or add new rules. See [ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint) for more information.
        
        This tool is especially useful for datasets that you created some time ago and now want to bring up-to-date with your current metadata preferences. For example, early versions of GenerateDatasetsXml didn't put any effort into creating global creator\_name, creator\_email, creator\_type, or creator\_url metadata. You could use ERDDAP-lint to identify the datasets that lack those metadata attributes.
        
        Thanks to Rob and Adam for creating this tool and making it available to the ERDDAP™ community.
        
    *   NEW: Now it is okay if some of the files in a EDDGridFromFiles dataset don't have all of the dataset's variables. The files will be included as if they had the variables (with all missing values).  
        Thanks to Dale Robinson and Doug Latornell.  
         
    *   NEW: There are new usage statistics in the log file and the Daily Report to help administrators identify the users who are causing memory problems. The statistics are named "OutOfMemory (Array Size)", "OutOfMemory (Too Big)", and "OutOfMemory (Way Too Big)". They show the IP addresses of the users who made requests in these categories and the number of requests they made. If there were no troublesome requests, these statistics won't appear. "OutOfMemory (Array Size)" and "OutOfMemory (Way Too Big)" requests are usually not a problem because the requests were so big that ERDDAP™ caught them quickly and returned an error message. The "OutOfMemory (Too Big)" requests are more dangerous because ERDDAP™ made some effort before it realized there was not enough memory currently available to handle the request (although the problem may be other requests right before these requests).
        
        There are also new statistics named "Large Request, IP address" which show the IP addresses of the users who made large requests (currently, gridded .nc files > 1GB).
        
        Also, the time series table on the status.html page now includes a "memFail" column showing the number of requests that failed with "OutOfMemory (Too Big)" errors since the last major Load Datasets. Any number other than 0 here is at least some cause for concern.  
        Thanks to Bob Simons.
        
    *   NEW: The new version of Hyrax displays directory listings differently than before. ERDDAP™ can now read the old and new directory listings.  
         
    *   NEW: Dataset reloads and user responses that take >10 seconds to finish (successfully or unsuccessfully) are marked with "(>10s!)". Thus, you can search the log.txt file for this phrase to find the datasets that were slow to reload or the request number of the requests that were slow to finish. You can then look higher in the log.txt file to see what the dataset problem was or what the user request was and who it was from. These slow dataset loads and user requests are sometimes taxing on ERDDAP. So knowing more about these requests can help you identify and solve problems.
    *   IMPROVED: When validating a CF DSG dataset, ERDDAP™ now ensures that variables with cf\_role attributes are in the corresponding cdm\_...\_variables list and aren't in other cdm\_...\_variables lists. For example, if a timeseriesProfile dataset has a "station\_id" variable which has the cf\_role=timeseries\_id attribute, then "station\_id" must be in the cf\_timeseries\_variables list, but must not be in the cf\_profile\_variables list.  
        Thanks to Micah Wengren.  
         
    *   IMPROVED: 'Simplify' is now faster, uses less memory, and may return LongArray. Thanks to Unidata.  
         
    *   IMPROVED: quickRestart is now significantly faster for EDDTableFrom(nc-related)Files (except EDDTableFromNcCFFiles and EDDTableFromInvalidCRAFiles) because makeExpected (and another place) now just reads the sample file's metadata instead of reading all of the data. Thanks to Jessica Austin.  
         
    *   IMPROVED: There is now support for time strings with precision greater than to-the-millisecond if the additional digits are all 0's, e.g., "2020-05-22T01:02:03.456000000Z". Thanks to Yibo Jiang.  
         
    *   IMPROVED: GenerateDatasetsXml's EDD.suggestDestinationName used to remove '(' and everything after. Now it removes (.\*) only if that is the end of the sourceName. Now it also removes \[.\*\] only if that is the end of the sourceName. Thanks to Julien Paul.  
         
    *   IMPROVED: GenerateDatasetsXml now makes the variable destinationNames unique by added \_2, \_3, ..., as needed. Thanks to Julien Paul.  
         
    *   IMPROVED: When Calendar2.parseDateTime parses dd, hh, or HH, the first 'digit' may now be a space.
    *   KNOWN PROBLEM: Starting with ERDDAP™ 2.10, .ncml files which try to change an attribute, don't change the attribute. This is a known bug in netcdf-java which I have reported and they say will be fixed in the next release of netcdf-java.  
         
    *   BROKEN LINKS FIX: I made a proper system for testing for broken links in ERDDAP™ web pages, so there should now be very few broken links (at least as of each release date -- new broken links arise often).  
         
    *   BUG FIX: EDDTableFromHttpGet failed with certain types of requests. Now it doesn't. Thanks to Emma at BODC.  
         
    *   BUG FIX: To handle some requests, EDDTable made a temporary file for each requested variable, with a file name ending in the variable's name. If the variable's name was also a type of compression (e.g., .Z), ERDDAP would try (and fail) to decompress the temporary file. Now the temporary file names end in ".temp". Thanks to Mathew Biddle.  
         
    *   BUG FIX: GenerateDatasetsXml and Calendar2.convertToJavaDateTimeFormat are now much less likely to make an incorrect change when trying to fix a possibly invalid date time format. Notably, no auto-suggested dateTime format will be modified. Thanks to Mathew Biddle.  
         
    *   BUG FIX: If there was an error while getting content from a remote URL, and if the errorStream content is compressed, ERDDAP™ now properly decompresses the error message. Thanks to Bob Simons.  
         
    *   BUG FIX: &lt;subscribeToRemoteErddapDataset> wasn't being applied when the EDD...FromErddap dataset was a child dataset. Now it is. Thanks to Chris Romsos.  
         
    *   BUG FIX: GenerateDatasetsXml no longer thinks a source variable name starting with "latin" might be latitude. Thanks to Vincent Luzzo.  
         
    *   BUG FIX: Now, an OutOfMemoryError while reading a data file while processing a user's request isn't a reason to add a file to the BadFiles list. Thanks to Bob Simons.  
         

## Version 2.02 {#version-202}
(released 2019-08-21)

*   **New Features and Changes (for users):**
    *   NEW: There are now two ways to search for datasets on multiple ERDDAPs. They work slightly differently and have different interfaces and options.
        
        *   [SearchMultipleERDDAPs.html](/SearchMultipleERDDAPs.html) from Bob Simons/NOAA NMFS SWFSC ERD.
        *   [http://erddap.com](http://erddap.com) from Rob Fuller/The Marine Institute of Ireland.
        
        Thanks to Tylar Murray for the original request.  
         
    *   IMPROVED: a request to the "files" system to download a file that is actually at a remote site (e.g., AWS S3) now leads to a redirect, so the user will actually download the data from the source, instead of using ERDDAP™ as an intermediary. Thanks to Andy Ziegler and NOAA.  
         
    *   NEW: As an example of the new AWS S3-related features, and to make it easier for anyone to browse and download files from public AWS S3 buckets, we have created  
        [~110 sample datasets](https://registry.opendata.aws/) that allow anyone to browse the contents of almost all of the  
        [AWS S3 Open Data buckets](https://registry.opendata.aws/). If you click on the "files" link for any of those sample datasets, you can browse the directory tree and files in that S3 bucket. Because of the way these datasets work, these directory listings are always perfectly up-to-date because ERDDAP™ gets them on-the-fly. If you click down the directory tree to an actual file name and click on the file name, ERDDAP™ will redirect your request to AWS S3 so that you can download the file directly from AWS. ERDDAP™ administrators can  
        [read directions for how to do this for other S3 buckets](/docs/server-admin/datasets#working-with-aws-s3-files). Thanks to Andy Ziegler and NOAA.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   THINGS YOU NEED TO DO: none  
         
    *   IMPROVED: ERDDAP's method of storing arrays of strings (StringArray) is now much more memory efficient. StringArrays are used throughout ERDDAP™, notably when reading tabular ASCII data files. Also, other changes make reading CSV/TSV/SSV ASCII, columnar ASCII, and jsonlCSV tabular data files faster and much more memory efficient. The result is: for a 764 MB ASCII data test file (but compressed to a 52MB .gz file) with 3,503,266 rows and 33 columns, the maximum memory usage went from 10GB down to 0.6GB (at peak). The time to read it went from ~7 minutes (but varies greatly with how much physical memory is in the computer) down to ~36 seconds (including 10s for simplify() which is only used by GenerateDatasetsXml). Many other places in ERDDAP™ will benefit from this increased memory efficiency. Thanks to Tylar Murray and Mathew Biddle.
        
        I explored a different solution (storing strings in StringArray as UTF-8-encoded byte arrays). That reduces memory usage another ~33%, but at the cost of ~33% slowdown. Compared to the system that is now being used, that seemed like a bad trade off. It's easier to give a computer more memory (buy more memory for ~$200) than to make it faster (buy a whole new computer).
        
        If it is convenient, it's still always a good idea to split huge tabular data files into several smaller files based on some criteria like stationID and/or time. ERDDAP™ will often only have to open one of the small files in response to a user's request, and thus be able to respond much faster.
        
    *   IMPROVED: There is now [ERDDAP™ AWS S3 documentation](/docs/server-admin/datasets#working-with-aws-s3-files), which describes how to get ERDDAP™ to work with data files in AWS S3 buckets.  
        Also, ERDDAP™ now uses new features in the AWS S3 Java API.  
        Also, ERDDAP™ now allows AWS S3 URLs to include additional characters (period, hyphen, underscore) in bucket names.  
        Also, ERDDAP™ now requires that AWS S3 bucket URLs be identified in a specific way:  
          https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/  
          where prefix is optional.  
        Thanks to Andy Ziegler and NOAA.  
         
    *   IMPROVED: GenerateDatasetsXml now treats additional common missing\_values stand-ins as missing values and so is more likely to convert a column to a numeric data type. Also, PrimitiveArray.simplify() now logs which particular data value caused it to treat a given column as a column of strings. Thanks to Mathew Biddle.  
         
    *   IMPROVED: &lt;requestBlacklist> now supports .\*.\* (or :\*:\* for IPv6) at the end of the IP addresses so that you can blacklist a bigger chunk of IP addresses, e.g., 110.52.\*.\* (China Unicom Tianjin). See the documentation for [&lt;requestBlacklist>](/docs/server-admin/datasets#requestblacklist) Thanks to China Unicom and China Telecom.  
         
    *   IMPROVED: If a dataset's source doesn't specify an "institution" attribute, GenerateDatasetsXml and loadDataset now get it from a "creator\_institution" attribute (if available). Thanks to Micah Wengren.  
         
    *   BUG FIX: standardizeWhat wasn't always applied to ASCII data files.  
        Also, EDDTable didn't properly handle constraints on time values when the source had String time values and standardizeWhat was being used.  
        Thanks to Paloma de la Vallee.
        
        I didn't clearly state before: you should just use standardizeWhat features when you actually need them (e.g., when different source files store time values in different ways), because some requests to datasets that use standardizeWhat will be processed a little slower.
        
    *   BUG FIX: A bug in code used by EDDGridFromNcFiles caused it to fail with .nc4 and .hdf5 files that have "long" (int64) variables. This is now fixed. Thanks to Friedemann Wobus.  
         
    *   BUG FIX: Small changes to ISO 19115 files to make a different validator happy. Thanks to Chris MacDermaid and Anna Milan.  
         

## Version 2.01 {#version-201}
(released 2019-07-02)

*   **New Features and Changes (for users):**
    *   None.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   BUG FIX: A bug in the code which generates the Data Access Form for tabledap datasets caused that web page to be blank for some datasets. Also, I improved the handling of unexpected errors on all HTML pages so they will (usually) display an error message. Thanks to Marco Alba.
    *   IMPROVED: GenerateDatasetsXml no longer prints a lengthy warning at the top of the output. Instead, please see [Editing GenerateDatasetsXml Output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Thanks to Steven Baum.
    *   IMPROVED: GenerateDatasetsXml now makes slightly different recommendations in different situations for &lt;updateEveryNMillis> for EDD...From...Files datasets. Also, GenerateDatasetsXml now discourages the original "extract" system for EDDTableFromFiles datasets.

## Version 2.00 {#version-200}
(released 2019-06-26)

*   **ERDDAP™ v2.00 is finally here! Yea!**  
     
    *   We apologize for the long delay needed to finish this version.  
        Thank you for your patience.  
         
    *   The good news is that the extra time was used to add more of the features that users had requested. The bad news is that even with the delay, not all requested features were added. We're sorry, but it seemed more important to get this release out than to delay more (forever?) continually adding new features. We promise to return to more frequent releases in the future.  
         
    *   "Version 2?! Are there big changes and incompatibilities?"  
        Big new features? Yes.  
        Big incompatibilities or changes for administrators or users? No.  
        We jumped from v1.82 to v2.00:
        *   partly to celebrate 10 years (now 11) since the first public release of ERDDAP™ (v1.00 on 2008-05-06, which outwardly looked remarkably like v2.00). In that time, ERDDAP™ has gone from one installation to almost 100 installations in at least 12 countries (Australia, Belgium, Canada, France, India, Ireland, Italy, South Africa, Spain, Thailand, UK, USA).
        *   partly to mark a major addition in an entirely new direction: ERDDAP™ now has a data ingest system to go with the existing data server services (see [EDDTableFromHttpGet](#eddtablefromhttpget)),
        *   and partly because it wasn't a big jump from 1.82 to 2.00 numerically, so this seemed like the right time.  
             
    *   The other good news is that there are now two other groups contributing code to ERDDAP™ (in this version and with indications they will continue): Rob Fuller and Adam Leadbetter of Ireland's Marine Institute, and Roland Schweitzer of PMEL and Weathertop Consulting. Thank you very much. It's true that they are working on projects of their own choosing, but that's the classic open-source development model -- groups contribute code for the features that they would most like to see added. The added benefit to contributors: they get to use the new features as soon as they are finished; they don't have to wait for the next release of ERDDAP. Your group is welcome to contribute, too! See the [ERDDAP™ Programmer's Guide](/docs/contributing/programmer-guide).  
         
    *   We hope you like ERDDAP™ v2.00. We look forward to the next 10 years of ERDDAP™ development and ever more use around the world.  
         
*   **New Features and Changes (for users):**  
     
    *   NEW: orderByMean filter  
        for tabledap datasets will calculate the means for the specified groups. Also, all of the orderBy options now support an additional way of defining groups: _numericVariable\[/number\[timeUnits\]\[:offset\]\]_, e.g., time/1day or depth/10:5. For example, stationID,time,waterTemp&orderByMean("stationID,time/1day") would sort the results by stationID and time, then calculate and return the mean of waterTemp for each stationID for each day. These are remarkably useful and powerful new features. The new code for these features and the changes to the old code were contributed by Rob Fuller and Adam Leadbetter of Ireland's Marine Institute and submitted via Git. Thank you, Rob and Adam!  
         
    *   NEW: output file type for tabular datasets: [.dataTable](https://developers.google.com/chart/interactive/docs/reference#dataparam),  
        a JSON file formatted for use with the Google Visualization client library (Google Charts). The code for this was contributed by Roland Schweitzer and submitted via Git. Thank you, Roland!  
         
    *   NEW: output file type for tabular datasets: [.jsonlCSV1](https://jsonlines.org/examples/),  
        which is like the existing .jsonlCSV option, but with column names on the first line. Thanks to Eugene Burger.  
         
    *   NEW: If the administrator enables it, users can now log in with their [ORCID](https://orcid.org) account.  
        It is an OAuth 2.0 authentication system, much like Google authentication. ORCID is widely used by researchers to uniquely identify themselves. ORCID accounts are free and don't have the privacy issues that Google accounts have. See ERDDAP's [Orcid authentication instructions](/docs/server-admin/additional-information#orcid). Thanks to BCO-DMO (Adam Shepard, Danie Kinkade, etc.).  
         
    *   NEW: A new URL converter converts out-of-date URLs into up-to-date URLs.  
        See .../erddap/convert/urls.html on any ERDDAP™ installation, e.g.,  
        [this link to the converter in the ERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). This should be useful to data managers. This is also used internally by GenerateDatasetsXml. Thanks to Bob Simons and Sharon Mesick.  
         
    *   IMPROVED: The [Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) now has options to convert any common string time into an ISO8601 string time, or convert a UDUNITS-like time units string into a proper UDUNITS time units string. This should also be useful to ERDDAP™ administrators who need to know what format to specify for the "units" attribute for string time variables. This is also used internally by GenerateDatasetsXml and the standardizeWhat feature of EDDTableFromFiles. Thanks to Bob Simons.  
         
    *   NEW: The [Units Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) has a new "Standardize UDUnits" option.  
        For example, "deg\_C/m" and "degrees\_C meters-1" are both converted to  
        "degree\_C m-1". This feature is also used by the standardizeWhat feature of EDDTableFromFiles. Thanks to Bob Simons.  
         
    *   NEW: For graphs (other than surface graphs) on griddap's and tabledap's Make A Graph web pages, when the x axis isn't a time axis, if only a subset of the x axis variable's range is visible, there are now buttons above the graph to shift the X Axis leftwards or rightwards. Thanks to Carrie Wall Bell / the Hydrophone project.  
         
    *   NEW: For graphs, the X and/or Y axis can now use a Log scale.  
        Users can control the Y Axis Scale via a new drop-down widget on the griddap and tabledap Make A Graph web pages. See the [.xRange and .yRange documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Thanks to Carrie Wall Bell / the Hydrophone project.  
         
    *   IMPROVED: ERDDAP™ now makes better use of various HTTP error codes and now returns an (OPeN)DAPv2.0-formatted error message payload. See [the details](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Thanks to Antoine Queric and Aurelie Briand.  
         
    *   IMPROVED: Don't use Netcdf-java/c or other software tools to connect to .nc or .hdf files served by ERDDAP's /files/ system as if they were local files. ERDDAP™ now refuses these requests. It is horribly inefficient and often causes other problems. Instead:
        
        *   Use (OPeN)DAP client software to connect to ERDDAP's DAP services for the dataset (which have /griddap/ or /tabledap/ in the URL). That's what DAP is for and does so well.
        *   Or, use the dataset's Data Access Form to request a subset of data.
        *   Or, if you need the entire file or repeated access over a long period of time, use curl, wget, or your browser to download the entire file, then access the data from your local copy of the file.
        
          
         
    *   IMPROVED: On the ERDDAP™ homepage, Full Text Search is now above "View a List of All Datasets" since it is the best starting point for most users. Thanks to Didier Mallarino and Maurice Libes.  
         
    *   IMPROVED: On DataProviderForm3.html there are now dropdown lists of common standard\_names. Thanks to someone at the IOOS DMAC meeting.  
         
    *   IMPROVED: On the /files/ web pages, there is now a link to the new "What can I do with these files?" section of the /files/ documentation. That section describes various file types and gives suggestions for how to work with them. Thanks to Maurice Libes.  
         
    *   IMPROVED: Almost every request to ERDDAP™ should be at least a little bit faster, and sometimes a lot faster.  
         
    *   BUG FIX: Under some circumstances, when an EDDTable dataset saved data in some types of .nc files, the global "id" attribute was set to the file's suggested name, which includes a hash to make it unique to that request. Now "id" is properly left unchanged (if specified) or set to the dataset's datasetID (if not specified). Thanks to John Maurer.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**  
     
    *   TO DO: This release will take some time and work from you. Please be patient and plan on taking a few hours to do the required changes and a few more hours to experiment with new features.  
         
    *   TO DO: For safety, make a backup copy of your current setup.xml and datasets.xml files so that you can revert to them in the unlikely case where you need to revert to ERDDAP™ v1.82.  
         
    *   TO DO: The recommended Java is now AdoptOpenJDK's OpenJDK 8 (LTS) + HotSpot.  
        This is an open source variant of Java that has no restrictions on its use (unlike Oracle's Java distribution). It is derived from Oracle's Java in an on-going way, with Oracle's blessing. For security reasons, it is important to keep your Java version up-to-date. See ERDDAP's [Java installation instructions](/docs/server-admin/deploy-install#java).  
         
    *   TO DO: AdoptOpenJDK's Java needs a small addition to your Tomcat installation: see the [Resources Cache instructions](/docs/server-admin/deploy-install#contentxml). I think that this is a replacement for the -XX:MaxPermSize setting, which (Adopt)OpenJDK no longer supports.  
         
    *   TO DO: The new default and recommend &lt;fontFamily> setting in setup.xml is  
        DejaVu Sans which are built into AdoptOpenJDK's Java. See the  
        [revised font installation instructions](/docs/server-admin/deploy-install#fonts).  
         
    *   TO DO: Many tags are moving from setup.xml to datasets.xml. The advantage is that you can change their values while ERDDAP™ is running, without restarting ERDDAP. Notably, you can easily change &lt;startBodyHtml5> to display a temporary message on the ERDDAP™ home page (e.g., "Check out the new JPL MUR SST v4.1 dataset ..." or "This ERDDAP™ will be offline for maintenance 2019-05-08T17:00:00 PDT through 2019-05-08T20:00:00 PDT."). If/when you change these tags in datasets.xml, the changes will take effect the next time ERDDAP™ reads datasets.xml.  
         
        
        1.  Copy this content into your datasets.xml file (anywhere near the start of the file, after &lt;erddapDatasets>):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2.  One-by-one, copy the value (if any) for each of those tags from your setup.xml file into the new tag that you just pasted (above) in datasets.xml. For example, if you had used a value of 30 for &lt;cacheMinutes> in setup.xml, you should copy that value into the new &lt;cacheMinutes> tag in datasets.xml (although if the value is the same as the new default value, it is best to just leave the tag in datasets.xml blank).
            
            If your value is different from the new suggested default (other than for &lt;startBodyHtml5> and &lt;theShortDescriptionHtml>, which are useful for customizing your ERDDAP™ installation), please consider switching to the new default values. This is particularly true of &lt;partialRequestMaxBytes> and &lt;partialRequestMaxCells>, where the default/suggested value has changed significantly over the years.
            
            After you copy each value, delete the tag and its description from setup.xml. It is better to have these tags in datasets.xml. And there are now better descriptions in [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
        A quirk of the new system is that the very first web page when you start up ERDDAP will be the default ERDDAP™ web page. Every subsequent webpage will use the ...Html content you specify in datasets.xml.
        
    *   WARNING: The first time you run ERDDAP™ v2.0, datasets based on local data files will load **very** slowly because ERDDAP™ needs to recreate its database of files in a slightly different format. After the slow initial reload, they will load quickly, as before. Please be patient.  
         
#### EDDTableFromHttpGet {#eddtablefromhttpget}
    *   [BIG NEW FEATURE: EDDTableFromHttpGet](#eddtablefromhttpget)  
        Until now, ERDDAP™ just read data and made it available to users. Now, ERDDAP™ has a simple, efficient system for ingesting real time data from sensors. Among other features, this dataset offers fine-grained versioning: it remembers every change made to the dataset, when it was made, and by whom. Usually, users will just want the latest version of the dataset, with all changes applied. But there is the option for users to request data from the dataset as it was at any point in time. This facilitates reproducible science. Thus, unlike most other near-real-time datasets, these datasets are eligible for [DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). because they meet the DOI requirement that the dataset is unchanging, except by aggregation. See [EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Thanks to OOI (from long ago and now) for talking about the need for this and Eugene Burger for the reminder about working on what is important.  
         
    *   BIG NEW FEATURE: ERDDAP™ can now serve data directly from externally-compressed data files, including .tgz, .tar.gz, .tar.gzip, .gz, .gzip, .zip, .bz2, or .Z. Datasets may include a mix of externally-compressed files (perhaps the older data files?) and non-externally-compressed files, and you can compress/decompress a file at any time.
        
        This works great!  
        In most cases, the slowdown related to decompressing the files is minor. We strongly encourage you to try this, notably for datasets and/or data files that are infrequently used.
        
        This may save you $30,000 or more!  
        This is one of the few ERDDAP™ features that can save you lots of money -- if you compress a lot of data files, you will need far fewer RAIDs/hard drives to store the data, or conversely, you can serve far more data (up to 10x) with the RAIDs you already have. If this feature saves you from buying another RAID, then it has saved you about $30,000.
        
        See the [Externally Compressed Files documentation](/docs/server-admin/datasets#externally-compressed-files). Thanks to Benoit Perrimond and Paloma de la Vallee.
        
    *   BIG NEW FEATURE: All EDDGridFromFiles and all EDDTableFromFiles datasets support a &lt;cacheFromUrl> tag and a &lt;cacheSizeGB> tag. If cacheSizeGB isn't specified, this will download and maintain a complete copy of a remote dataset's files. If cacheSizeGB is specified and is >0, this will download files from the remote dataset, as needed, into a local cache with a limited size, which is useful when working with cloud-based (e.g., S3) data files. See the [cacheFromUrl documentation](/docs/server-admin/datasets#cachefromurl) for details. Thanks to Bob Simons and Roy Mendelssohn (who for years have been writing scripts to handle making local copies of remote dataset files), Lloyd Cotten, Eugene Burger, Conor Delaney (when he was at Amazon Web Services), and the Google Cloud Platform.  
         
    *   NEW: The new EDDTableFromJsonlCSV class can read tabular data from  
        [JSON Lines CSV files](https://jsonlines.org/examples/) ("Better than CSV"). Thanks to the people at the Marine Institute of Ireland for telling me about this format and to Eugene Burger and PMEL for the request to support it as an input type.  
         
    *   NEW: All EDDGrid and all EDDTableFromFiles datasets support an &lt;nThreads> setting, which tells ERDDAP™ how many threads to use when responding to a request. See the [nThreads documentation](/docs/server-admin/datasets#nthreads) for details. Thanks to Rob Bochenek of Axiom Data Science, Eugene Burger, Conor Delaney (when he was at Amazon Web Services), and Google Cloud Platform.  
         
    *   NEW standardizeWhat for all EDDTableFromFiles subclasses -  
        Previously, if for a given variable, the values of the important attributes (e.g., scale\_factor, add\_offset, missing\_value, \_FillValue, units) weren't consistent, EDDTableFromFiles would pick one value for each attribute to be "valid" and mark files with other attribute values as "Bad Files". Now, there is a system to standardize the files as soon as EDDTableFromFiles reads the files. See [EDDTableFromFile's standardizeWhat](/docs/server-admin/datasets#standardizewhat). One of ERDDAP's main goals is to make data files and datasets accessible in a consistent way. standardizeWhat is an important new tool to make that a reality. Thanks to Marco Alba, Margaret O'Brien (and other EML users), BCO-DMO, and InPort users.  
         
    *   NEW EDDTableFromInvalidCRAFiles allows you to make a dataset from a collection of NetCDF (v3 or v4) .nc files which use a specific, invalid, variant of the CF DSG Contiguous Ragged Array (CRA) files. Sample files for this dataset type can be found at https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/ \[2020-10-21 This server is now not reliably available\]. Although ERDDAP™ supports this file type, it is an invalid file type that no one should start using. Groups that currently use this file type are strongly encouraged to use ERDDAP™ to generate valid CF DSG CRA files and stop using these files. Thanks to Ajay Krishnan and Tim Boyer.  
         
    *   EDDTableFromThreddsFiles and EDDTableFromHyraxFiles are now deprecated. Please switch to EDDTableFromNcFiles (or a variant) plus &lt;cacheFromUrl>. If that doesn't work for some reason, email erd.data at noaa.gov. If there are no complaints before 2020, these dataset types may be removed.  
         
    *   IMPROVED -- The system for automatically converting non-ISO 8601 times into ISO 8601 times (introduced in v1.82) has been greatly expanded to deal with a large number of additional formats. This affects GenerateDatasetsXml and ERDDAP's handling of source metadata.  
         
    *   IMPROVED -- With its third major revision of the String time parsing system (and hopefully the last), ERDDAP™ no longer uses Java's DateTimeFormatter because of bugs which sometimes affect extreme times (years &lt;=0000). ERDDAP™ now uses its own system for parsing time strings.  
         
    *   WARNING: The new String time parsing system is somewhat stricter. If one of your datasets suddenly has only missing values for time values, the cause is almost certainly that the time format string is slightly wrong. There should be error messages in log.txt related to time values that didn't match the time format -- that should help you fix the time format string for that dataset. If you need help, use the option in ERDDAP's Time Converter which "Convert\[s\] any common string time into an ISO 8601 string time" -- it indicates the format that the converter used to parse the source string.  
         
    *   RECOMMENDATION: The quickest, easiest, and cheapest way to speed up ERDDAP's access to tabular data is to put the data files on a Solid State Drive (SSD). Most tabular datasets are relatively small, so a 1 or 2 TB SSD is probably sufficient to hold all of the data files for all of your tabular datasets. SSD's eventually wear out if you write data to a cell, delete it, and write new data to that cell too many times. Instead, I recommend that (as much as possible) you just use your SSD to write the data once and read it many times. Then, even a consumer-grade SSD should last a very long time, probably much longer than any Hard Disk Drive (HDD). Consumer-grade SSD's are now cheap (in 2018, ~$200 for 1 TB or ~$400 for 2 TB) and prices are still falling fast. When ERDDAP™ accesses a data file, an SSD offers both
        
        *   shorter latency (~0.1ms, versus ~3ms for an HDD, versus ~10(?)ms for a RAID, versus ~55ms for Amazon S3), and
        *   higher throughput (~500 MB/S, versus ~75 MB/s for an HDD versus ~500 MB/s for a RAID).
        
        So you can get up to a ~10X performance boost (vs a HDD) for $200! Compared to most other possible changes to your system (a new server for $10,000? a new RAID for $35,000? a new network switch for $5,000? etc.), this is by far the best Return On Investment (ROI). If your server isn't loaded with memory, additional memory for your server is also a great and relatively inexpensive way to speed up all aspects of ERDDAP.  
        \[SSD's would be great for gridded data, too, but most gridded datasets are much larger, making the SSD very expensive.\]  
         
    *   NEW: Everyone who is logged in gets role=\[anyoneLoggedIn\], even if there is no &lt;user> tag for them in datasets.xml. If you set dataset's &lt;accessibleTo> to \[anyoneLoggedIn\], then anyone who has logged in to ERDDAP™ (e.g., via their Gmail or Orcid account) will be authorized to access the dataset, even if you haven't specified a &lt;user> tag for them in datasets.xml. Thanks to Maurice Libes.  
         
    *   IMPROVED: The UDUNITS/UCUM units converter was extensively improved.  
        It handles invalid units strings better (starting with an emphasis on preserving information, rather than enforcing validity). Also, the results now have a standardized syntax.  
         
    *   NEW: The UDUNITS/UCUM units converter has a new option to standardize a UDUNITS string.  
        This works well for valid UDUNITS strings and reasonably well for non-standard / invalid UDUNITS strings. For example, For example, UDUNITS="meters per second", "meter/second", "m.s^-1", and "m s-1" will all return "m.s-1". This was needed for the new standardizeWhat system described above. Thanks to Marco Alba, Margaret O'Brien (and other EML users), BCO-DMO, and InPort users.  
         
    *   NEW: EDDTableFromMultidimNcFiles now has a [treatDimensionsAs](/docs/server-admin/datasets#treatdimensionsas) option, that tells ERDDAP™ to treat certain dimensions (e.g., LAT and LON) as if they were other dimensions (e.g., TIME). This is useful for some incorrect files that use different dimensions for different variables when they should have used just one dimension (e.g., TIME). Thanks to Marco Alba and Maurice Libes.  
         
    *   NEW: Now, all EDDGridFrom...Files datasets support a new special axis sourceName which tells ERDDAP™ to extract information from the fileName (just filename.ext) and use the value to **replace** the existing leftmost axis value. The format is  
        \*\*\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_  
        See [this documentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Thanks to the NOAA Pathfinder Daily aggregation dataset.  
         
    *   NEW: Now, all EDDGridFrom...Files datasets support a new special axis sourceName which tells ERDDAP™ to extract information from the file's pathName (directories + filename.ext)  
        \*\*\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_  
        For this, the path name always uses '/' as the directory separator character, never '\\'.  
        See [this documentation](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Thanks to Paloma de la Vallee.  
         
    *   NEW: Now, all EDDTableFrom...Files datasets support additional pseudo variable sourceNames which extract information from the file's fileName (just filename.ext) (see [\*\*\*fileName](/docs/server-admin/datasets#filename-sourcenames)) or from the file's full pathName (/dir1/dir2/filename.ext) (see [\*\*\*pathName](/docs/server-admin/datasets#pathname-sourcenames)). Thanks to Paloma de la Vallee.  
         
    *   NEW: If an EDDGrid dataset has one or more very large dimensions (e.g., millions of values) which take up a lot of memory, you can set the new [&lt;dimensionValuesInMemory>](/docs/server-admin/datasets#dimensionvaluesinmemory) setting to false (the default is true), which causes the dataset to store the values on disk and retrieve them when needed. Thanks to David Rodriguez and Rich Signell (re: EDDGridFromAudioFiles).  
         
    *   IMPROVED: Previously, if you reordered the dataVariables for a EDDTableFromFiles dataset and reloaded the dataset, EDDTableFromFiles would reread all of the datafiles. Now, it can deal with the reordering without rereading all of the data files. Thanks to Roland Schweitzer.  
         
    *   IMPROVED: Now, when ERDDAP™ reads ASCII, NCCSV, and JSON Lines CSV tabular data files, if it finds an error on a given line (e.g., incorrect number of items), it logs a warning message ("WARNING: Skipping line #"... " unexpected number of items...") to the [log.txt file](/docs/server-admin/additional-information#log) and then continues to read the rest of the data file. Thus, it is your responsibility to look periodically (or write a script to do so) for that message in the log.txt so that you can fix the problems in the data files. ERDDAP™ is set up this way so that users can continue to read all of the available valid data even though some lines of the file have flaws. Previously, ERDDAP™ marked the file as "bad" and removed it from the dataset.  
         
    *   IMPROVED: When precise times (e.g., to the nearest second or millisecond) are stored at the source as "minutes since ..." (or larger units), ERDDAP™ now rounds them to the nearest millisecond when reading the values into ERDDAP. Otherwise, the floating point numbers are bruised and requests for data at specific times (e.g., &time=2018-06-15T01:30:00) will fail. Previously, it calculated them as precisely as possible (and still does if the units are e.g., "seconds since ..." or "milliseconds since ..."). It's best to avoid this problem by not using large units (e.g., minutes or hours) to store precise time values (e.g., microseconds) -- computers do a poor job of handling decimal digits. Thanks to Marco Alba.  
         
    *   CHANGES to EDDTableFromEDDGrid which make it much better. EDDTableFromEDDGrid lets users query gridded datasets as if they were tabular datasets ("query by value").
        
        *   It now supports a &lt;maxAxis0> tag (default=10) which specifies the maximum number of axis\[0\] (usually "time") values that can be queried at once. This prevents naive requests from getting EDDTableFromEDDGrid to search through an entire gridded dataset (which would fail with a timeout error).
        *   GenerateDatasetsXml now has an option to generate EDDTableFromEDDGrid datasets for all of the gridded datasets in a given ERDDAP™ which match a specified regex (use .\* to match all datasets). The datasets that it creates have additional information in the summary attribute indicating that this is a tabular version of a gridded dataset. And their datasetID is the datasetID of the gridded dataset, plus "\_AsATable".
        *   There is a big speed up for the most common setup: when the gridded dataset is an EDDGridFromErddap dataset that is in the same ERDDAP.
        
        Thanks to James Gallagher and Ed Armstrong.  
         
    *   NEW: generateDatasetsXml for all types of datasets is now much more likely to add a \_FillValue or missing\_value attribute to a numeric variable's addAttributes. For example, this occurs when string missing value markers (e.g., "", ".", "?", "NA", "nd", "NaN") for that variable in the sample file are converted to ERDDAP's native missing values (127 in byte columns, 32767 in short columns, 2147483647 in int columns, 9223372036854775807 in long columns, and NaN in float and double variables). It also occurs for NaN values in float and double variables. Also, "nd" was added to the list of common missing value markers in numeric data columns that ERDDAP™ should look for. Thanks to Matt Biddle of BCO-DMO.  
         
    *   IMPROVED: the ncdump option in generateDatasetsXml is now more like ncdump (but still uses the netcdf-java version of ncdump). Now, it prints a new list of options. Now, for .ncml files, it prints the ncdump output for the result of the .ncml file changes applied to the underlying .nc or .hdf file.  
         
    *   BUG FIX: There was a file handle leak (eventually causing ERDDAP™ to freeze up) caused when creating some types of output files, e.g., .geotif, notably when errors occurred during creation. I think/hope this is now all fixed. If you still see problems, please tell me the type of dataset (grid or table) and the type of file which is causing the problem. Thanks to Steven Beale, Lynn DeWitt, Jibei Zhao, and others.  
         
    *   BUG FIX: The WMS Leaflet demo didn't fully/properly convert the "depth" axis to "elevation". Now, it does, and the broken legend requests are fixed. Also, all axis options in the drop-down lists are always in ascending sorted order. Thanks to Antoine Queric and Aurelie Briand.  
         
    *   BUG FIX: EDDTableFromFiles now correctly supports constraints on String variables that were created from char variables in the data files. Thanks to Antoine Queric and Aurelie Briand.  
         
    *   BUG FIX: Now, when a dataset becomes unavailable, the dataset tries to notify (with the message "This dataset is currently unavailable.") its subscribers, listed actions, rss, and lonPM180 datasets that rely on it. Thanks to Roy Mendelssohn and Bob Simons.  
         
    *   BUG FIX: Two bugs related to EDDTableCopy. Thanks to Sam McClatchie.  
         
    *   IMPROVED: The number of failed requests shown on the status.html page will increase because more things are counted as failures than before.  
         
    *   IMPROVED: ERDDAP's status.html now shows "Requests (median times in ms)" in the time series. Previously, it showed median times truncated to integer seconds.  
         
    *   IMPROVED: In the jsonld output, the jsonld "name" now comes from the dataset's "title" in ERDDAP, and the jsonld "headline" now comes from the dataset's "datasetID" in ERDDAP. Previously, it was reversed. This seems wrong to me because in normal English usage, "name" is usually a short, (ideally) unique identifier that rarely/never changes (e.g., Robert Middlename Simons), not a description which isn't unique and which can easily and often change (e.g., "A guy who writes software for NOAA" vs. "A tall guy who writes software for NOAA"). Gee, it would be great if the schema.org definition of [Name](https://schema.org/name), in the context of a Dataset, were more specific. Software developers should be able to write an implementation of a specification based on the specification alone, without guidance from experts. But I defer to Google (notably Natasha Noy), NCEI (notably John Relph), and Rob Fuller.  
         
    *   IMPROVED: In the jsonld output, the four "spatialCoverage GeoShape box" values are now minLat minLon maxLat maxLon. Previously, the lat and lon positions were reversed. Gee, it would be great if the schema.org definition of [GeoShape](https://schema.org/GeoShape) specified the correct order. Software developers should be able to write an implementation of a specification based on the specification alone, without guidance from experts. Thanks to Natasha Noy and Rob Fuller.

## Version 1.82 {#version-182}
(released 2018-01-26)

*   **New Features (for users):**  
     
    *   Numerous subtle changes to the look-and-feel of ERDDAP™ web pages.
        *   IMPROVED: ERDDAP™ now uses HTML 5 and makes better use of CSS.
        *   IMPROVED: The web pages have been slightly modified to make them cleaner and less "busy". (They are still dense and there are still things one could complain about, but hopefully much less so than before.) Thanks to John Kerfoot for some comments.
        *   IMPROVED: The web pages now look much better on mobile phones and other small devices, particularly if you use them in landscape orientation. They also look better in very small and very large windows in desktop browsers.
        *   IMPROVED: To improve security and other reasons, the use of an out-of-date Openlayers version for the WMS demonstration pages has been replaced by Leaflet.
        *   NEW: support for previews of image, audio, and video files in the "files" system (for example, [this test data set](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) and in .htmlTable responses when a cell has the URL of an image, audio or video file (for example, [this request](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)). If you hover over a '?' icon, you should see an image, audio, or video file preview. You can also click on the file link to view the file full screen in your browser. See the [Media Files documentation](/docs/server-admin/datasets#media-files). Note that different browsers support different file types, so the examples may not work in your browser.  
            Thanks to these people/links for ideas and sample code for CSS-only image tooltips (was at https://codepen.io/electricalbah/pen/eJRLVd) and deferred image loading (was at https://varvy.com/pagespeed/defer-images.html) (although the code was modified before use in ERDDAP).  
            Thanks to Cara Wilson, Matthew Austin, and Adam Shepherd/BCO-DMO for requests for image support.  
            Thanks to Jim Potemra, Rich Signell, OOI, and Carrie Wall Bell for requests for audio/hydrophone file support.  
            Thanks to OOI for showing the need for video support.
        *   NEW: A subset of data from any ERDDAP™ dataset (but usually a dataset from audio files) can now be saved in a .wav audio file. ([documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Thanks to Jim Potemra, Rich Signell, OOI, and Carrie Wall Bell for requests for audio/hydrophone file support.
        *   IMPROVED: The format for the Web Accessible Folders (WAF) (e.g., the /files/ folders) has been updated to use an HTML table. The new format mimics the more recent version of the directory listing web pages created by more recent versions of Apache. Humans will find that the changes make the information easier to read. Software that parses these documents (e.g., software that harvests ISO 19115 documents from ERDDAP) will have to be revised, but the new format will be easier to parse than the previous format. (Attention, Anna Milan.)
        *   NEW outOfDateDatasets.html page. ([example](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) This web page shows a table with all of the near-real-time datasets that have a &lt;testOutOfDate> tag (see below), ranked by how out-of-date the datasets are. This dashboard should be useful for ERDDAP™ administrators and end users when they want to know which datasets are out-of-date. For out-of-date datasets, there is presumably a problem with the data source, so that ERDDAP™ is unable to see/get data from more recent time points.  
            Administrators: If you don't want an Out-Of-Date Datasets web page, add this to your setup.xml:  
            &lt;outOfDateDatasetsActive>false&lt;/outOfDateDatasetsActive>  
            There are now testOutOfDate and outOfDate columns in the allDatasets dataset.  
            Thanks to Bob Simons, who has wanted this for years, and to the clever people of Ireland's Marine Institute who gave me the inspiration via their dedicated Raspberry Pi and monitor which always shows a screen like this in their office.
        *   IMPROVED: .htmlTable and .xhtml response are now better formatted, more compact, and thus load faster. Thanks to HTML5 and CSS.
    *   NEW output file type for griddap datasets: .timeGaps. It shows a list of gaps in the time values which are larger than the median gap. ([example](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) This is useful for ERDDAP™ administrators and end users when they want to know if there are unexpected gaps in the time values for a dataset that is expected to have regularly spaced time values. Thanks to Bob Simons and Roy Mendelssohn who needed this feature.
    *   IMPROVED: The default graph for the allDatasets dataset is now a map with x=maxLon and y=maxLat. Thanks to John Kerfoot, Rich Signell, and OOI-CI.
    *   NEW: [erddapy](https://github.com/ioos/erddapy) -- isn't an ERDDAP™ feature, but will be of interest to many ERDDAP™ users. Erddapy (ERDDAP™ + Python) is a Python library created by Filipe Fernandes that "takes advantage of ERDDAP's RESTful web services and creates the ERDDAP™ URL for any request like searching for datasets, acquiring metadata, downloading data, etc." Thanks to Filipe Fernandes.
    *   I should have mentioned before: There is a third-party R package designed to make it easier to work with ERDDAP™ from within R: [rerddap](https://github.com/ropensci/rerddap#rerddap). Thanks to [rOpenSci](https://ropensci.org/) and Roy Mendelssohn.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**  
     
    *   TO DO: In setup.xml, right below &lt;adminInstitution>, please add a &lt;adminInstitutionUrl> tag which specifies a URL for your institution (or group).
    *   TO DO: These 3 tags in setup.xml are no longer used:  
        &lt;startHeadHtml>, &lt;startBodyHtml> and &lt;endBodyHtml>. They are replaced by  
        &lt;startHeadHtml5>, &lt;startBodyHtml5> and &lt;endBodyHtml5>, which have default values specified in messages.xml (and shown below).
        
        We recommend using the default &lt;startHeadHtml5> and &lt;endBodyHtml5>.  
        We recommend: If you made changes to the original &lt;startBodyHtml> and/or want to customize your ERDDAP™ now, please copy the new &lt;startBodyHtml5> tag (from below) into your setup.xml and modify it to customize your ERDDAP™ so that ERDDAP's web pages reflect your organization, not NOAA ERD. Notably, please change the "Brought to you by" to your organization(s). If you need help, please email erd.data at noaa.gov. (If you don't want to customize your ERDDAP™ now, use the default &lt;startBodyHtml5>.)
        
        Then delete the 3 old tags in your setup.xml which are no longer used.

```
        <startBodyHtml5><!\[CDATA\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \]\]></startBodyHtml5>
```

        There are additional ways you can [customize ERDDAP™](/docs/server-admin/deploy-install#customize) so ERDDAP's web pages reflect your organization instead of NOAA ERD.
        
    *   TO DO: The &lt;EDDGrid...Example&gt; tags (starting with &lt;EDDGridIdExample&gt;) and the &lt;EDDTable...Example&gt; tags (starting with &lt;EDDTableIdExample&gt;) in your setup.xml file are used to create examples in the griddap and tabledap documentation.html web pages in your ERDDAP.
        
        If you didn't customize those tags, please delete them from your setup.xml file. Now they all have defaults in messages.xml that refer to datasets in Bob's ERDDAP™ at https://coastwatch.pfeg.noaa.gov/erddap/index.html . So you no longer need to have specific datasets in your ERDDAP. If you want to override the defaults, copy some or all of those tags into your setup.xml and change their values.  
        If you want the examples to point to your ERDDAP™, the easiest method is:
        
        1.  Include these two datasets in your ERDDAP™ by adding this to your datasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2.  Add this tag to your setup.xml, but change the URL to your ERDDAP's (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
        If you did customize those tags, leave them as is and please add these 2 new tags to your setup.xml to specify the ERDDAP™ URL for these datasets, but change the URL to your ERDDAP's (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    *   TO DO: ERDDAP™ now uses a css file called erddap2.css. If you made changes to \[tomcat\]/webapps/erddap/images/erddap.css, consider making similar changes to erddap2.css (in the same directory).
    *   NEW: ERDDAP's web pages now have a large number of almost invisible internal links (the text is black and not underlined). If you hover over one of these links (usually the first few words of headings and paragraphs), the cursor becomes a hand. If you click on the link, the URL is the internal link to that section of the document. This makes it easy to refer to specific sections of the documentation. Thanks to Bob Simons, who has wanted this for years.
    *   NEW: ERDDAP™ now supports [Byte Range / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving) requests for portions of /files/ files. This was needed to support the audio and video viewers in browsers.
    *   TO DO: Now, to improve security, if you specified &lt;baseHttpsUrl> in setup.xml (and thus support https), the recommended flagUrl is an https URL with a more secure flagKey. If so, any previous flagUrls/flagKeys will become invalid. Admins: If these changes apply to your ERDDAP™ and if your ERDDAP™ has EDDGridFromErddap and EDDTableFromErddap's that subscribe to remote ERDDAPs, then, after you update ERDDAP, your ERDDAP™ will automatically try to subscribe with the new flagUrl, so you should delete the old subscriptions and validate the new subscriptions when you get the new subscription validation emails.
    *   TO DO: If your ERDDAP™ has EDDGridFromErddap datasets for erdVH3 datasets on Bob's coastwatch ERDDAP™, please change them to refer to the new erdVH2018 datasets.
    *   TO DO: If you include any of the jplAquariusSSS sample datasets in your ERDDAP™, please change "V4" in the datasetID's to "V5".
    *   TO DO: actual\_range is now a CF standard attribute (as of CF-1.7) and clearly says that if the variable uses add\_offset and/or scale\_factor to pack the data values, then the actual\_range values should use the unpacked data type and be unpacked values. Unfortunately, this conflicts with our previous advice. GenerateDatasetsXml now unpacks packed actual\_range values, but that won't fix existing datasets in your datasets.xml file.
        
        So, please check your datasets: if a variable's values are packed and if actual\_range is specified as packed data values, please add an &lt;addAttributes> actual\_range value to specify the unpacked values. Otherwise, the dataset will not load in ERDDAP. A simple and almost perfect way to do this is to search your datasets.xml for sourceAttributes that have  
```
        <att name="actual\_range" type="shortList">  
        or <att name="actual\_range" type="intList">  
```
        and a scale\_factor other than 1.0. Those are the actual\_range attributes that you might have to fix.
        
        For axis variables in EDDGrid datasets, ERDDAP™ always sets the actual\_range attribute to be the actual range of the values since it knows those values.
        
        For axis variables with descending values (e.g., some latitude variables), ERDDAP™ created actual\_range with the \[0\]...\[last\] values, which were high...low. Now it always uses low...high values to make the new CF definition.
        
        The correctness of the actual\_range values is particularly important for EDDTable datasets, because ERDDAP™ will quickly reject user requests for data values which are less than the actual\_range minimum value or which are greater than the actual\_range maximum value.
        
        Related: the actual\_min, actual\_max, data\_min and data\_max attributes are now deprecated. Please convert your datasets to use actual\_range instead.
        
    *   TO DO (optional, but recommended): For each near-real-time and forecast dataset in your ERDDAP™, please add a [&lt;testOutOfDate>](/docs/server-admin/datasets#testoutofdate) tag with a value in the form now-_nUnits_, e.g., now-2days. If the maximum time value for the dataset is older than that value, the dataset is considered out-of-date and will be marked as such on the [outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) web page. This provides an easy way for you to see when something is wrong with a dataset's source.
    *   [NEW: Semantic Markup of Datasets with json-ld (JSON Linked Data)](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™ now uses [json-ld (JSON Linked Data)](https://json-ld.org) to make your data catalog and datasets part of the [semantic web](https://en.wikipedia.org/wiki/Semantic_Web), which is Tim Berners-Lee's idea to make web content more machine readable and machine "understandable". Search engines ([Google in particular](https://developers.google.com/search/docs/data-types/datasets)) and other semantic tools can use this structured markup to facilitate discovery and indexing. The json-ld structured markup appears as invisible-to-humans &lt;script> code on the http://.../erddap/info/index.html web page (which is a semantic web [DataCatalog](https://schema.org/DataCatalog)) and on each http://.../erddap/info/_datasetID_/index.html web page (which is a semantic web [Dataset](https://schema.org/Dataset)). (Special thanks to Adam Leadbetter and Rob Fuller of the Marine Institute in Ireland for doing the hard parts of the work to make this part of ERDDAP.)
    *   NEW: There are new dataset types which can read data from audio files:  
        [EDDGridFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), which treats audio data as gridded data.  
        [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), which treats audio data as tabular data data. Thanks to Jim Potemra, Rich Signell, OOI, and Carrie Wall Bell for requests for audio/hydrophone file support.
    *   Changes to GenerateDatasetsXml (and related changes):
        *   NEW: ERDDAP™ now has a system to automatically [update out-of-date URLs](/docs/server-admin/additional-information#out-of-date-urls) both in GenerateDatasetsXml and when loading datasets. If you have suggestions for additional URLs that should be caught and updated, or if you think this should be turned into a service (like the Converters), please email erd.data at noaa.gov.
        *   NEW: Now, if GenerateDatasetsXml sees a CF standard\_name (which should be all lowercase) with an uppercase character, it adds the all lowercase version to &lt;addAttributes>. Also, when a dataset loads, if ERDDAP™ sees a CF standard\_name with an uppercase character, it silently changes it to the standard\_name. Thanks to Rich Signell.
        *   NEW: Now, if GenerateDatasetsXml sees an attribute with a time that isn't in ISO 8601 format, it adds the ISO 8601 formatted time to &lt;addAttributes>. If ERDDAP™ doesn't recognize the format, it leaves the time value unchanged. If you see a format that ERDDAP™ doesn't recognize and fix, please email it to erd.data at noaa.gov.
        *   IMPROVED: The low level code for the EDDGridFromThreddsCatalog option in GenerateDatasetsXml now relies on the Unidata netcdf-java catalog crawler code (thredds.catalog classes) so that it can handle all THREDDS catalogs (which can be surprisingly complex). Thanks to Roland Schweitzer for suggesting this change and thanks to Unidata for the code.
        *   NEW: GenerateDatasetsXml for EDDGridFromDap now adds ", startYear-EndYear" to end of title based on actual time axis values. EndYear="present" if data exists in the last 150 days.
        *   NEW: GenerateDatasetsXml for EDDGridFromDap now adds ", \[resolution\]°" to the title if the dataset is evenly spaced and the same for lat and lon.
        *   IMPROVED: The time converter now has additional features, notably the ability to convert string times in a wide variety of common formats into ISO 8601 strings or into a UDUnits-compatible number. All previously supported features continue to work, unchanged.
        *   BUG FIX: GenerateDatasetsXml and the Keywords converter now include "Earth Science > " at the start of GCMD Science Keywords. When a dataset is loaded in ERDDAP™, ERDDAP™ now fixes any GCMD keywords in the keywords attribute that don't start with "Earth Science > " or that use anything other than title case (where the first letter of each word is capitalized).
        *   IMPROVED: When suggesting &lt;destinationName>'s, GenerateDatasetsXml for EDDTableFromAsciiFiles just used the tail end of sourceNames with '/' (some were filename-like). Now it uses the entire sourceName (e.g., "blahblahblah (m/s)". This change will be good for some datasets and not for others, but it is safer behavior. Thanks to Maurice Libes.
        *   BUG FIX: GenerateDatasetsXml and the dataset constructors now ensure there are no duplicate column names. Thanks to Maurice Libes.
        *   BUG FIX: GenerateDatasetsXml for EDDTableFromAsciiFiles didn't write &lt;columnSeparator> to the output. Now it does. Thanks to Maurice Libes.
    *   NEW: The DasDds tool now prints out time gap information (the [.timeGaps information](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) if the dataset is a gridded dataset.
    *   NEW: Advanced Search now accepts "now_\-nUnits_" time values. Thanks to Rich Signell.
    *   IMPROVED: To improve security, when an email address in a dataset's metadata or data is written to an html web page, the "@" is replaced with " at ". This only catches email addresses that are the entire metadata or data value, not email addresses embedded in longer values.
    *   IMPROVED: To increase security, the RSS information for private datasets is now only available to users (and RSS readers) who are logged in and authorized to use that dataset.
    *   NEW: Now, when a dataset is loaded, if date\_created, date\_issued, date\_modified, or date\_metadata\_modified attribute has a time value that isn't in ISO 8601 format, ERDDAP™ changes it to the ISO 8601 formatted time. If ERDDAP™ doesn't recognize the format, it leaves the time value unchanged. If you see a format that ERDDAP™ doesn't recognize and fix, please email it to erd.data at noaa.gov.
    *   IMPROVED: .dods responses from EDDGrid datasets should now be significantly faster. Thanks to Rich Signell.
    *   Changes related to ERDDAP's creation of ISO 19115 documents:
        *   BUG FIX: when creating ISO 19115 documents, dataVariable units weren't HTML Attribute encoded and percent encoded. Now they are. Thanks to NGDC's ISO 19115 validator.
        *   BUG FIX: when creating ISO 19115 documents, date\_created was used as is, so often was the wrong format. Now it is converted to ISO 8601 Z string. Thanks to NGDC's ISO 19115 validator.
        *   BUG FIX: when creating ISO 19115 documents, ERDDAP™ now longer writes dates with year=0000 (as with climatology datasets), because the ISO 19115 schema doesn't allow dates with year=0000. Thanks to NGDC's ISO 19115 validator.
    *   NEW: As before a request to http.../erddap/version will return just the version number (as text), e.g., "ERDDAP\_version=1.82".  
        Now, a request to http.../erddap/version\_string will return a number and an optional suffix of '\_' plus ASCII text (no spaces or control characters), e.g., "ERDDAP\_version\_string=1.82\_JohnsFork". The people doing the fork will specify this by changing EDStatic.erddapVersion. This way of doing it doesn't cause problems for previous versions of ERDDAP. Thanks to Axiom (notably, Kyle Wilcox) and Ireland's Marine Institute (notably, Rob Fuller).
    *   BUG FIX: For wms version=1.3.0, request=GetMap, crs=EPSG:4326 (not CRS:84) requests: the bbox order must be minLat,minLon,maxLat,maxLon. For CRS:84 requests, as before, bbox order must be minLon,minLat,maxLon,maxLat. This may fix using ERDDAP's WMS 1.3.0 service in ArcGIS (thanks to Paola Arce). Thanks (not) to OGC for making this so complicated. Thanks to Leaflet for handling this correctly and for giving me a way to test this.
    *   IMPROVED: Previous, the suggested link for RSS and email subscriptions has the http URL for your ERDDAP. Now it is the https URL, if that is active.
    *   NEW: EDDGridCopy now supports an optional tag &lt;onlySince>_someValue_&lt;/onlySince>, where the value is a specific ISO-8601-formatted time or a now-nUnits (e.g., now-2years) time. See the [onlySince documentation](/docs/server-admin/datasets#onlysince). Thanks to Drew P.
    *   IMPROVED: If available, ERDDAP™ will show the https URL (from &lt;baseHttpsUrl>, if available) instead of the http URL when it tells users the URL to add/validate/remove/list a subscription.
    *   BUG FIX: ERDDAP™ now allows a subscription action to start with "https://". (Bob slaps his forehead.) Thanks to Jennifer Sevadjian.
    *   BUG FIX: .jsonlKVP now uses ':' between each key and value, instead of '='. (Bob slaps his forehead.) Thanks to Alexander Barth.
    *   BUG FIX: Previously, if you restarted ERDDAP™ with quickRestart=true, and if, before the dataset was reloaded normally, you made a call to a EDDTableFromFiles dataset that used updateEveryNMillis, and if a data file had just been changed, the request would fail with a null pointer error. Now the request will succeed. Thanks to John Kerfoot.
    *   NEW: When a dataset is loaded in ERDDAP™, the keywords are now rearranged into sorted order and any newline characters are removed.
    *   IMPROVED: Now, if a .geoJson, .json or .ncoJson request has .jsonp parameter, the response mime type is application/javascript. Note that .jsonp is not supported for .jsonlCSV or .jsonlKVP, since it wouldn't work. Thanks to Rob Fuller.
    *   IMPROVED: The mime type for json lines fileType options is now "application/x-jsonlines". It was application/jsonl. Currently, there is no definitive correct choice.
    *   IMPROVED: The number of failed requests shown on the status.html page will increase because more things are counted as failures than before, e.g., ClientAbortException.
    *   IMPROVED: Now, if a response from ERDDAP™ is not compressed, then the header of the response will include "Content-Encoding"="identity".
    *   IMPROVED: The "license" attribute wasn't required. Now, if it isn't specified, the standardLicense from messages.xml (or from setup.xml if present) is used as the default.
    *   NEW: There is now an optional [fileAccessSuffix attribute](/docs/server-admin/datasets#fileaccessbaseurl). which can be used with the existing [fileAccessBaseUrl attribute](/docs/server-admin/datasets#fileaccessbaseurl).
    *   IMPROVED: To increase security, this version was compiled with the latest Java JDK v8u162.
    *   NEW: To increase security, several common domains that offer temporary email addresses (e.g., @mailinator.com) are now on a permanent email blacklist for the subscriptions system.
    *   NEW: To increase security, the tallies in the Daily Report now include:  
        SetDatasetFlag IP Address Failed (since last daily report)  
        SetDatasetFlag IP Address Failed (since startup)  
        SetDatasetFlag IP Address Succeeded (since last daily report)  
        SetDatasetFlag IP Address Succeeded (since startup)  
        The "Failed" tallies let you see who (a hacker?) is trying to set a flag, but is failing.
    *   IMPROVED: To increase security, email addresses in the &lt;subscriptionEmailBlacklist> in your datasets.xml are now considered to be case-insensitive.  
         

## Version 1.80 {#version-180}
(released 2017-08-04)

*   **New Features (for users):**  
     
    *   NEW orderByCount() filter lets you specify how the results table will be sorted (or not) and just returns one row for each sort group, with the count of the number of non-missing-values for each variable.  
        For example, orderByCount("stationID") will sort by stationID and return one row for each stationID, with a count of the number of non-missing-values for each variable.  
        If you just specify orderByCount(""), the response will be just one row with the number of non-missing-values for each data variable.  
        See the [orderBy... documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Thanks to Ben Adams.
    *   NEW .ncoJson fileType option for gridded and tabular datasets. This option makes an NCO lvl=2 "pedantic" JSON file with all of the information normally found in a .nc file. See [http://nco.sourceforge.net/nco.html#json](https://nco.sourceforge.net/nco.html#json) Thanks to Charlie Zender.
    *   BUG FIX: The orderBy...() options on the Make A Graph web page are now handled correctly.
    *   BUG FIX: .geoJson output now doesn't print rows where the lat or lon values are missing. Also, altitude values (if available) are now included in the coordinates, not as data values. Thanks to Jonathan Wilkins.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**  
     
    *   SECURITY ISSUE: The protocols.js library used for the OpenLayers demo on the WMS pages in ERDDAP™ is out-of-date and has a bug that potentially allows it to be misused. (Unfortunately, updating OpenLayers and protocols.js isn't easy.) That opens up the possibility that the library could be set up to allow a cross-site vulnerability. However, since ERDDAP™ only uses OpenLayers in a specific pre-set-up way and only with specific ERDDAP-based data sources, we believe there is no cross-site vulnerability in ERDDAP's use of OpenLayers and protocols.js. However, if you don't believe this, you can now disable the use of the OpenLayers demo on the WMS pages of your ERDDAP™ by adding  
```
        <openLayersActive>false</openLayersActive>  
```
        to your setup.xml file. The default is "true". Thanks to Charles Carleton and NCEI.
    *   SECURITY CHANGES: Unused .jar files and duplicate .jar files (because they are also in netcdfAll.jar) have been removed from the ERDDAP™ distribution. Out-of-date .jar files have been updated. Thanks to Charles Carleton and NCEI.
    *   SECURITY CHANGES: The netcdfAll.jar file distributed with ERDDAP™ is the latest version (currently 4.6.10), but it still contains internal jackson .jar files that are known to be out-of-date and have security vulnerabilities, notably the Jackson libraries that are only used when accessing Amazon S3 data sources. If you aren't accessing data via Amazon S3 (you would know if you were), these vulnerabilities are not relevant.
        
        The netcdf-java developers maintain that these vulnerabilities are not relevant because of the way that netcdf code uses these libraries and in any case would only be relevant when accessing Amazon S3. See [https://github.com/Unidata/thredds/issues/866](https://github.com/Unidata/thredds/issues/866) . I believe them. If you still have concerns about this, please contact the netcdf-java developers. (Note that if you don't believe the netcdf-java developers and are contemplating not using ERDDAP™ because of this, you shouldn't use THREDDS either, because THREDDS uses netcdf-java more fundamentally and more extensively than ERDDAP.)
        
        Details: The troublesome code and the vulnerability warnings are:  
        netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml  
        See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- High  
        netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml  
        See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- High  
        netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml  
        See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- High  
        See https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critical  
        netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml  
        See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- High  
        See https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critical  
        "For version 4.6.10, aws-java-sdk-core pulls in version 2.6.6 of jackson-\* artifacts." (email from netcdf-java people).  
        Thanks to Charles Carleton and NCEI.
        
    *   COMPILER CHANGES: If you recompile ERDDAP™, note that the -cp classpath parameter needed for the command line is now much shorter than before. See the new -cp setting in [this documentation](/docs/contributing/programmer-guide#development-environment). Thanks to Charles Carleton and NCEI.
    *   NEW OPTION in GenerateDatasetsXml: EDDTableFromBcodmo, which is just for internal use at BCO-DMO.  
        Thanks to Adam Shepherd and BCODMO.
    *   NEW ATTRIBUTE and FEATURE: If an EDDTable column has filenames of web accessible files (e.g., image, video, or audio files), you can add  
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
        to specify the base URL (ending with / ) needed to make the filenames into complete URLs. Then for .htmlTable responses, ERDDAP™ will show the filename as a link to the combined URL (the baseUrl plus the filename).  
        If you want ERDDAP™ to serve the related files, make a separate EDDTableFromFileNames dataset for those files (it may be a private dataset).  
        Thanks to Adam Shepherd and BCODMO.
    *   NEW ATTRIBUTE RECOMMENDATION: If an EDDTable column has filenames of web accessible files (e.g., image, video, or audio files) which are accessible via an archive (e.g., .zip file) accessible via a URL, use  
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
        to specify the URL for the archive.  
        If you want ERDDAP™ to serve the archive file, make a separate EDDTableFromFileNames dataset for that file (it may be a private dataset).  
        Thanks to Adam Shepherd and BCODMO.
    *   IMPROVEMENTS to GenerateDatasetsXml to remove the causes of invalid/bad &lt;subsetVariables> suggestions and duplicate/bad suggested variable names, etc. Thanks to Rich Signell, Adam Shepherd, and BCO-DMO.
    *   NEW OPTION: The political boundary information distributed with ERDDAP is from a third party and somewhat out-of-date. Also, there are disputed boundaries at several places in the world, where different people will have different ideas about what is correct. WE MAKE NO CLAIM ABOUT THE CORRECTNESS OF THE POLITICAL BOUNDARY DATA THAT COMES WITH ERDDAP. If you don't like the political boundary information that comes with ERDDAP™, you can now tell ERDDAP™ to never draw political boundaries by adding  
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
        to your setup.xml file. The default is "true". Thanks to Raju Devender.
    *   NEW METADATA TAG: In the datasets.xml for a dataset, you can now specify the default number of colorBar sections for a dataVariable on graphs and maps with  
```
        <att name="colorBarNSections">_anInteger_</att>  
```
        (default=-1, which says to let ERDDAP™ decide). See the [colorBar settings](/docs/server-admin/datasets#color-bar-attributes).
    *   IMPROVED: the state boundary color on maps was purple (Deep Purple for you Baby Boomers). Now it is gray (in between the national boundary gray and the land gray).
    *   BUG FIX: &lt;iso19115File> and &lt;fgdcFile> in datasets.xml were not always handled correctly. Now they are. Thanks to BCO-DMO.

## Version 1.78 {#version-178}
(released 2017-05-27)

*   **New Features (for users):**  
     
    *   (none)  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**  
     
    *   IMPROVED: The order of lines in "Major LoadDatasets Time Series" on the status.html page is now newest on top to oldest at the bottom.
    *   BUG FIX: ERDDAP™ now writes .nccsv files with the time variable's actual\_range as an ISO-8601 String time. That fixes the bug with EDDTableFromErddap parsing info from a remote dataset and from the quickRestart file for all EDDTableFrom...Files datasets. (The time actual\_range will be wrong the first time the dataset loads in v1.78 but correct after it is reloaded, e.g., if you flag the dataset.)

## Version 1.76 {#version-176}
(released 2017-05-12)

*   **New Features (for users):**  
     
    *   CHANGE in Tomcat: For requests to ERDDAP™ coming from software other than web browsers (e.g., curl, R, Matlab, Python, Java):  
        As with previous changes in versions of Tomcat (the lower-level software that runs ERDDAP) since early 2016, more and more of the characters in the query part of the request URL must be [**Percent Encoded**](/docs/server-admin/datasets#infourl) for security reasons. Browsers take care of percent encoding for you. so using ERDDAP™ in a browser isn't affected unless the request gets redirected to another ERDDAP.
    *   IMPROVED: Previously, ERDDAP™ treated **char variables** more like unsigned short integers than characters. Now it treats them more like 1-character-long UCS-2 (Unicode) Strings. See the [char documentation](/docs/server-admin/datasets#char). Thanks to Aurelie Briand and the Argo project.
    *   IMPROVED: Previously, ERDDAP™ offered little support for **Unicode characters** above character #255 in Strings. Now, internally, ERDDAP™ fully supports 2-byte UCS-2 chars (characters numbered 0 through 65535) in Strings. When String data is written to various file types, ERDDAP™ does the best it can to support 2-byte chars. Another example is .csv files which ERDDAP™ writes with the ISO-8859-1 charset (a 1-byte charset), so ERDDAP™ writes any characters above character #255 with the JSON-like \\u_hhhh_ syntax. See [String data](/docs/server-admin/datasets#string).
    *   IMPROVED: In .nc files written by ERDDAP™, char variables to be interpreted as Strings will have the attribute  
        **\_Encoding=ISO-8859-1**  
        In .nc files read by ERDDAP™, char variables with "\_Encoding" will be interpreted as Strings with the specified charset.
    *   REMINDER: ERDDAP™ supports **JSON-like backslash-encoding** of special characters when you specify constraints of char and String variables. Thus you can request something like &myString="\\u20ac" when you want rows of data where myString=€ since 20ac is the hexadecimal version of the code point for the Euro symbol. Several sources on the web show the code point numbers for Unicode symbols, e.g., [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode).
    *   IMPROVED: Previously, ERDDAP™ offered limited support for **long integer** variables. Now ERDDAP™ fully supports longs internally and does its best when writing long data to various file types. . See the [long documentation](/docs/server-admin/datasets#long). Thanks to the Ireland's Marine Institute, Craig Risien, Rich Signell, Christopher Wingard and OOI.
    *   NEW: output file type for griddap and tabledap: **.nccsv**, which makes a NetCDF-like, ASCII, CSV file that also contains all of the metadata that would be in a comparable .nc file. See the [NCCSV Specification](/docs/user/nccsv-1.00). Thanks to Steve Hankin.
    *   NEW: **orderByClosest filter** lets you specify how the results table will be sorted and an interval (e.g., 2 hours). Within each sort group, only the rows closest to the interval will be kept. For example, orderByClosest("stationID, time, 2 hours") will sort by stationID and time, but only return the rows for each stationID where the last orderBy column (time) is closest to 2 hour intervals. This is the closest thing in tabledap to stride values in a griddap request. This option can be specified via any tabledap dataset's .html web page, .graph web page, and by any URL that you generate yourself. Thanks to the Ireland's Marine Institute and Ocean Networks Canada.
    *   NEW: **orderByLimit filter** lets you specify how the results table will be sorted and a limit number (e.g., 100). Within each sort group, only the first 'limit' rows will be kept. For example, orderByMax("stationID, 100") will sort by stationID, but only return the first 100 rows for each stationID. This is similar to SQL's LIMIT clause. This option can be specified via any tabledap dataset's .html web page, .graph web page, and by any URL that you generate yourself. Thanks to the Ireland's Marine Institute and Ocean Networks Canada.
    *   NEW: Two new response file types, **.jsonlCSV and .jsonlKVP** are available for requests to gridded datasets, tabular datasets and many other places in ERDDAP (e.g., requests for information about datasets). The files are JSON Lines files ([https://jsonlines.org/](https://jsonlines.org/)) where each line has a separate JSON object. .jsonlCSV just has the values in a CSV format. .jsonlKVP has Key:Value pairs. Each line stands on its own. The lines are not enclosed in a larger JSON array or object. For an example, see [this sample request](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Thanks to Damian Smyth, Rob Fuller, Adam Leadbetter, and Ireland's Marine Institute.
    *   NEW: There is new documentation describing [**How to Access Private Datasets in ERDDAP™ via Scripts**](/docs/user/AccessToPrivateDatasets). Thanks to Lynn DeWitt.
    *   IMPROVED: The minimum extent of the **OpenLayers** map was 2 degrees and is now 4 data pixels. Thanks to Rusty Holleman.
    *   IMPROVED: In some common cases, requests which include a **regular expression** constraint will be processed much faster.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**  
     
    *   **SLOW FIRST STARTUP:** The first time you start up this new version, it will take a long time for ERDDAP™ to load all of the datasets because it needs to re-read all of the source datafiles (although just the header for gridded data files). If you look at the logs you may see error messages saying "old/unsupported enhancedVersion" of some internal files -- that's okay -- ERDDAP™ will make the new versions of the internal files. Please be patient.
    *   ACTION: ERDDAP™ now uses the new **java.time** classes (also known as JSR 310) instead of Joda to parse String times into numeric times. Notes:
        *   If ERDDAP™ suddenly has problems parsing String times for a given dataset and thus just converts most or all times to NaN's (missing values), the problem is almost always with the dateTime format string that you specified as the "units" of the variable. The new system sometimes needs a slightly different dateTime format string.
        *   If numeric months and days in the dateTime strings aren't 0-padded (e.g., "3/7/2016"), make sure the format just has a single M and d (e.g., "M/d/yyyy", not "MM/dd/yyyy").
        *   Change any fractional seconds specification that uses lowercase s's (e.g., the .sss in yyyy-MM-dd'T'HH:mm:ss.sss), into capital S's, (e.g., yyyy-MM-dd'T'HH:mm:ss.SSS).
        *   ERDDAP™ no longer supports string dateTime formats with two-digit years (yy) with an implied century (e.g., 1900 or 2000). Businesses spent billions of dollars fixing this problem in the late 1990's. Scientists should not be using two digit years. Please fix the source file(s) by converting to 4-digit years, then use yyyy in the dateTime format.
        *   You can use yyyy or YYYY (which ERDDAP™ converts to uuuu) to parse 4 digit years, including negative years, e.g., -4712 (which is 4713 BC). Thanks to SeaDataNet, Thomas Gardner, and BODC.
        *   Please continue to use Z within a dateTime format to get ERDDAP to parse a time offset (e.g., Z, +0200, -08, -0800, -08:30).
        *   **Make sure you use Java version 1.8.0\_21 or higher.**
        *   Programmers -- If you write Java programs that run ERDDAP™ code, you need to remove the reference to joda-time.jar in the class path parameter.
    *   NEW: ERDDAP's [ArchiveADataset tool](/docs/server-admin/additional-information#archiveadataset) can now create [**BagIt files**](https://en.wikipedia.org/wiki/BagIt). NCEI may standardize on this format. Thanks to Scott Cross and John Relph.
    *   IMPROVED: The links to download the erddap.war on the ERDDAP™ web pages now point to **GitHub**. (They are public links, so you don't have to join GitHub.) This means much faster downloads (up to 12Mb/s versus 1Mb/s) and few problems with downloads. Thanks to Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney, and Ireland's Marine Institute.
    *   IMPROVED: The **status.html page and the daily Status Report email** now include a "Major LoadDatasets Time Series" section which shows statistics about ERDDAP™ as of the end of each major loadDatasets for the last 100 major loadDatasets. Thanks to our troublesome RAID.
    *   NEW: a new, optional (but recommended) parameter for EDDTableFromCassandra datasets: [**&lt;partitionKeyCSV>**](/docs/server-admin/datasets#partitionkeycsv). Thanks to Ocean Networks Canada.
    *   NEW: EDDTableFromAsciiFiles now supports **&lt;columnSeparator>** parameter. If null or "", the class will guess, as before, Otherwise, the first character will be used as the column separator when reading the files. Thanks to Sky Bristol and Abigail Benson.
    *   New: the new dataset type, [**EDDTableFromNccsvFiles**](/docs/server-admin/datasets#eddtablefromnccsvfiles), can make a dataset by aggregating [NCCSV .csv files](/docs/user/nccsv-1.00). Thanks to Steve Hankin.
    *   IMPROVED: **EDDTableFromErddap** now uses .nccsv to get information from remote ERDDAPs and for local archive of that metadata info. This enables full support for the char and long data types, and for Unicode (UCS-2) charset for chars and Strings. Thanks to Rob Fuller and Ireland's Marine Institute.
    *   IMPROVED: EDDTableFromErddap and EDDGridFromErddap now support **&lt;redirect>false&lt;/redirect>** which tells ERDDAP™ never to redirect the request to the remote ERDDAP. The default is true. This is useful when the remote ERDDAP™ is a private ERDDAP. Thanks to Damian Smyth, Rob Fuller, and Ireland's Marine Institute.
    *   IMPROVED: ERDDAP™ now catches **cancelled user requests** sooner. And ERDDAP™ now shuts down faster because the low level threads shut down faster. Thanks to our troublesome RAID.
    *   **GenerateDatasetsXml:**
        *   NEW: The new special EDDType "ncdump" prints an [ncdump](https://linux.die.net/man/1/ncdump)\-like printout of the header of an .nc file. You can also print the data values for specified variables (or enter "nothing" to not print any data values). This is useful because, without ncdump it is hard to know what is in a file and thus which EDDType you should specify for GenerateDatasetsXml. Thanks to Craig Risien, Rich Signell, Christopher Wingard and OOI.
        *   NEW: For SeaDataNet data:  
            When appropriate, GenerateDatasetsXml now does a specific semantic conversion using a remote SPARQL query: if a variable's source metadata includes an sdn\_parameter\_urn, e.g., sdn\_parameter\_urn = "SDN:P01::PSLTZZ01", GenerateDatasetsXml will add the corresponding P02 attribute, e.g., sdn\_P02\_urn = "SDN:P02::PSAL". If you have datasets that use these attributes, and if your ERDDAP's &lt;categoryAttributes> in setup.xml includes sdn\_parameter\_urn and sdn\_P02\_urn, users will be able to use ERDDAP™ Category search system to search for datasets with specific values of these attributes. Thanks to BODC and Alexandra Kokkinaki.
        *   IMPROVED: GenerateDatasetsXml now changes many http:// references in the metadata to https:// when appropriate.
        *   IMPROVED: GenerateDatasetsXml now tries to guess creator\_type and publisher\_type.
        *   IMPROVED: The variable's dataTypes suggested by GenerateDatasetsXml will now be a little better. Thanks to Margaret O'Brien, LTER, and EML.
        *   IMPROVED: GenerateDatasetsXml is better at specifying the &lt;cdm\_data\_type&gt;, and adding the related, required attributes (e.g., &lt;cdm\_timeseries\_variables&gt;), so you can supply that information. Thanks to Rich Signell.
        *   IMPROVED: In GenerateDatasetsXml, for EDDTable datasets, the suggestion for &lt;subsetVariables> is now much more conservative. Thanks to John Kerfoot.
        *   IMPROVED: If datasets.xml for a datasets specifies featureType but not cdm\_data\_type, the featureType will be used as the cdm\_data\_type. Thanks to Rich Signell.
        *   BUG FIX: generateDatasetsXml now suggests the correct &lt;dataType> for data variables that have scale\_factor, add\_offset and/or \_Unsigned attributes.
    *   IMPROVED: When ERDDAP™ opens a .nc file that is **shorter** than it is supposed to be (e.g., it didn't get completely copied into place), ERDDAP™ now treats the file as bad. Previously, ERDDAP™ returned missing values for any missing part of the file because that is the default behavior for netcdf-java. ERDDAP™ now uses ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Thanks to our troublesome RAID and Christian Ward-Garrison.
    *   IMPROVED: the ISO 19115 writer now makes use of **creator\_type**, if present.
    *   IMPROVED: ERDDAP™ now uses the latest netcdf-java v4.6.9 which can read additional types of **netcdf-4 files**. Thanks to Craig Risien, Rich Signell, Christopher Wingard and OOI.
    *   BUG FIX: avoid trouble if different source files have different data types for a given variable. Thanks to Roy Mendelssohn and Eugene Burger.
    *   BUG FIX: **Time format conversions** are now better protected against bad time values. Thanks to NDBC.
    *   BUG FIX: EDDGridFromNcFilesUnpacked now handles time values with **"months since ..." and "years since ..."** correctly (by incrementing the month or year, not by crudely adding e.g., 30days repeatedly). Thanks to Soda3.3.1.
    *   BUG FIX: just in v1.74, **subscriptions** required an action (e.g., http://...), which was and should be optional.
    *   BUG FIX: EDDGridFromMergeIRFiles.lowGetSourceMetadata() didn't add any global attributes. Now it does.  
         

## Version 1.74 {#version-174}
(released 2016-10-07)

*   **New Features (for users):**  
     
    *   Now, when a List of Datasets (All, or from a search) is displayed on a web page, long titles are displayed on multiple lines. Previously, the middle of a long title was replaced by " ... ". Thanks to Margaret O'Brien, LTER, and EML.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**  
     
    *   TO DO: On Linux computers, change the Apache timeout settings so that time-consuming user requests don't timeout (with what often appears as a "Proxy" or "Bad Gateway" error). As the root user:
        
        1.  Modify the Apache httpd.conf file (usually in /etc/httpd/conf/ ):  
            Change the existing &lt;Timeout> setting (or add one at the end of the file) to 3600 (seconds), instead of the default 60 or 120 seconds.  
            Change the existing &lt;ProxyTimeout> setting (or add one at the end of the file) to 3600 (seconds), instead of the default 60 or 120 seconds.
        2.  Restart Apache: /usr/sbin/apachectl -k graceful (but sometimes it is in a different directory).
        
        Thanks to Thomas Oliver.  
         
    *   NEW: \[bigParentDirectory/hardFlag directory  
        This works like the flag directory, but the hardFlag version also deletes all of the cached dataset information. There are no URLs to set a hardFlag. This can only be used by putting a file in that directory.  
        hardFlags are very useful when you do something that causes a change in how ERDDAP™ reads and interprets the source data, for example, when you install a new version of ERDDAP™ or when you have made certain types of changes to a dataset's definition in datasets.xml. See [this documentation](/docs/server-admin/additional-information#hard-flag). Thanks to John Kerfoot and all the Argo groups.  
         
    *   NEW: GenerateDatasetsXml now has a EDDTableFromEML option  
        which reads a dataset description in an Ecological Metadata Language (EML) file, downloads the related data file, and generates a chunk of datasets.xml so that the dataset can be added to ERDDAP. There is also an EDDTableFromEMLBatch which does the same thing for all of the EML files in a directory. This works very well because EML does an excellent job of describing the dataset and because KNB and LTER make the actual data files available.  
        EML plus ERDDAP™ could be a great combination, since ERDDAP™ could give users more direct access to the wealth of KNB and LTER data and help those projects meet the US government's [Public Access to Research Results (PARR) requirements](https://nosc.noaa.gov/EDMC/PD.DSP.php) by making the data available via a web service.  
        See [this documentation](/docs/server-admin/EDDTableFromEML). Thanks to Margaret O'Brien, LTER, and EML.  
         
    *   NEW: GenerateDatasetsXml now has a EDDTableFromInPort option  
        which reads a dataset description in an InPort XML file and tries to generate a chunk of datasets.xml so that the dataset can be added to ERDDAP. This rarely creates a ready-to-use chunk of XML for datasets.xml, but it will create a good rough draft that is a good starting point for editing by a human.  
        It would be great if people using InPort to document their datasets would also use ERDDAP™ to make the actual data available via ERDDAP's web services and thereby meet the US government's and NOAA's [Public Access to Research Results (PARR) requirements](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) by making the data available via a web service. This is a solution that could be used right now. (erd.data at noaa.gov is happy to help.)  
        See [this documentation](/docs/server-admin/datasets#eddtablefrominport). Thanks to Evan Howell and Melanie Abecassis.  
         
    *   IMPROVED: ERDDAP™ now uses netcdf-java 4.6.6.  
        With earlier versions, netcdf-java read some fill values (perhaps, just in netcdf-4 files) as 0's. Now it reads some of them as the netcdf standard fill value: -127 for bytes, -32767 for shorts, -2147483647 for ints. Unidata says the new behavior is the proper behavior. If a variable in a dataset starts showing one of these values where they used to show 0's, you can add, e.g.,  
```
        <att name="\_FillValue" type="short">-32767</att>  
```
        to the variable's addAttributes to tell ERDDAP™ to treat that value as a missing\_value/\_FillValue. However, in many cases, that will not yield the desired result: 0's. If so, consider modifying the files with NCO or rewriting the files. Complaints? Please contact Unidata ;-)  
         
    *   TO DO: New TopographyDepth palette  
        I encourage you to switch all datasets that use the OceanDepth palette to use the new TopographyDepth palette, which is like Topography except with the colors flipped, so that it is suitable for depth values (positive=down), instead of altitude values (positive=up). The recommended settings for this palette are:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    *   NEW FEATURE: String missing\_value and/or \_FillValue  
        If a String variable defines a missing\_value and/or \_FillValue, ERDDAP™ will now remove those values from the data and replace them with an empty string, so that missing values appear as empty strings, as with other datasets in ERDDAP. Thanks to Margaret O'Brien, LTER, and EML.  
         
    *   NEW FEATURE: Support for Local Times  
        timestamp variables with source data from Strings can now specify a time zone via a "time\_zone" attribute which leads ERDDAP™ to convert the local-time-zone source times (some in Standard time, some in Daylight Saving time) into Zulu times. The list of valid time zone names is probably identical to the list in the TZ column in [this table](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). The default is "Zulu". Common US time zones are: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. For timestamp variables with numeric source data, you can specify the "time\_zone" attribute, but the value must be "Zulu" or "UTC". Thanks to Margaret O'Brien, LTER, and EML.  
         
    *   NEW FEATURE: EDDTableFromAsciiFiles now supports semicolon-separated files  
        and is smarter about figuring out the separator. Thanks to Margaret O'Brien, LTER, and EML.  
         
    *   NEW FEATURE: If there is a significant error in loadDatasets (major or minor, e.g., a missing or invalid datasets.xml document), ERDDAP™ will now indicate it in status.html, right below "n Datasets Failed To Load" as ERROR: while processing datasets.xml: see log.txt for details.  
         
    *   NEW FEATURE: ERDDAP™ looks for orphans.  
        When ERDDAP™ does a major loadDatasets, it now looks for orphan datasets (datasets that are in ERDDAP™ but not in datasets.xml). If found, they are listed in status.html, right below "n Datasets Failed To Load" as ERROR: n Orphan Datasets (datasets in ERDDAP™ but not in datasets.xml) = ....  
        If you want to remove (unload) an orphan from ERDDAP™, you need to add  
        &lt;dataset type="_anyValidType_" datasetID="_theDatasetID_" active="false" />  
        to datasets.xml until the dataset is unloaded during the next major loadDatasets.  
         
    *   BUG FIX: If a dataset had a numeric timestamp variable with units other than "seconds since 1970-01-01T00:00:00Z" and with the &lt;updateEveryNMillis> system active, the timestamp variable's range was set incorrectly when the dataset was updated. Thanks to John Kerfoot.  
         
    *   BUG FIX: If &lt;quickRestart> was true in setup.xml and you requested data from an EDDTableFrom...Files dataset that used &lt;updateEveryNMillis>, the first request to the dataset would fail, but subsequent requests would succeed. Now the first request won't fail. Thanks to John Kerfoot.  
         
    *   BUG FIX: The GenerateDatasetsXml.sh and .bat didn't work with >9 parameters on the command line. Now they do. Thanks to John Kerfoot.  
         
    *   BUG FIX: The new EDDTableFromMultidimNcFiles didn't consistently remove trailing spaces from strings. Now it does. Notably, this affected ARGO files. Thanks to Kevin O'Brien and Roland Schweitzer.  
         
    *   BUG FIX: All access of remote DAP services is now initiated by more modern code. This fixes the "connection closed" error when accessing some EDDTableFromErddap datasets. Thanks to Kevin O'Brien.  
         
    *   BUG FIX: The handling of orderBy...() and distinct() are now back to the way they were before the recent changes: a given request may have multiple orderBy...() and/or a distinct() filter; ERDDAP™ will handle them in the order they are specified. Thanks to David Karuga.  
         
    *   BUG FIX: If the dataset is EDDTableFromDatabase and a query has [sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) and/or [sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), then the database may (depending on settings in datasets.xml) partly or completely handle **only the first** orderBy..() or distinct(). Thanks to David Karuga.  
         
    *   BUG FIX: The recent extra percent-encoding caused problems with some queries for .ncCF files, e.g., "HTTP Status 500 - Query error: variable=station is listed twice in the results variables list." Thanks to Kevin O'Brien.  
         
    *   BUG FIX: EDDTableFromFiles had trouble reloading a dataset when one of the columns was a true char column. Thanks to Roland Schweitzer.  
         
    *   BUG FIX: EDDGridFromNcFilesUnpacked now also converts missing\_value and \_FillValue to standard values so files with different values can be aggregated. Because of this change, after you install this new version of ERDDAP™, please set a [hardFlag](/docs/server-admin/additional-information#hard-flag) for each EDDGridFromNcFilesUnpacked dataset in your ERDDAP.  
         
    *   IMPROVED: EDDTableFromNcCFFiles can now handle files that have multiple sample\_dimension's. A given dataset must only use variables that use one of the sample\_dimensions. Thanks to Ajay Krishnan.  
         
    *   IMPROVED: For EDDTableFrom...Files, &lt;sortFilesBySourceNames> now allows comma-separated (recommended) or space separated lists of variable source names. In either case, individual variable names may be surrounded by double quotes, e.g., if the name has an internal space.

## Version 1.72 {#version-172}
(released 2016-05-12)

*   **New Features (for users):** None.  
     
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   NEW EDDTableFromMultidimNcFiles [EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) is a new alternative to EDDTableFromNcFiles. It is designed to deal with groups of files with several variables with shared dimensions, e.g., var1\[a\]\[b\], var2\[a\], var3\[b\], scalarVar. Thanks to the Argo Project, Aurélie Briand, and Roland Schweitzer.
    *   BUG FIX: ERDDAP™ (via the FileVisitorDNLS and FileVistorSubdir classes) now follows symbolic links on Linux. ERDDAP™ still doesn't follow .lnk's on Windows.
    *   BUG FIX of bug introduced in 1.70: distinct + orderBy were not allowed together in one request. Now they are again. They are not mutually exclusive/redundant. Thanks to David Karuga.
    *   CHANGE to datasets.xml blacklist of IP addresses:  
        IP v4 addresses appear to ERDDAP™ as 4 period-separated hex numbers.  
        I think IP v6 addresses appear as 8 colon-separated hex numbers.  
        So ERDDAP™ now supports colons in the IP addresses in that list and :\* at the end of the list to block a range of addresses.
    *   IMPROVED: ERDDAP™ now uses NetcdfFileWriter to write .nc files instead of the deprecated NetcdfFileWriteable. There should be no discernable change to the resulting files. This opens up the possibility of making big .nc files that use the .nc3 64bit extensions. If you want/need that, please send a request to erd.data at noaa.gov .
    *   IMPROVED: Many of the links to remote websites were out-of-date. Now they are up-to-date and use https: instead of http: whenever possible.
    *   Many small changes.

## Version 1.70 {#version-170}
(released 2016-04-15)

*   **New Features (for users):** None.  
     
*   **Things ERDDAP™ Administrators Need to Know and Do:** Below, there are several recommended changes to the documentation in your setup.xml file.  
    Please make these changes now.  
    30 minutes of work now may save you hours of confusion in the future.
    *   Bug fix: The problem was that requests which were redirected to a remote ERDDAP failed with a invalid character '|' error message. This only occurred with recent versions of Tomcat. Thanks to Rusty Holleman, Conor Delaney, and Roy Mendelssohn.
    *   Bug fix: ERDDAP™ now uses an up-to-date version of netcdf-java (it's a long story) which includes up-to-date support for NcML, which fixes the problem with NcML LogicalReduce not working as expected. There may be a few small changes to the metadata which ERDDAP™ reads via netcdf-java from .nc, .hdf, .grib, and .bufr files. Thanks to Favio Medrano.
    *   The new [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) allows you to make a merged EDDTable dataset from two or more EDDTable datasets which have the same data variables using the same units. Thanks To Kevin O'Brien.
    *   New options for EDDTableFromDatabase ([sourceCanOrderBy](/docs/server-admin/datasets#sourcecanorderby) and [sourceCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) let you specify whether ERDDAP™, the database, or both, handle distinct and orderBy (and all variants) constraints. Thanks to David Karuga.
    *   You can now make a private dataset's graphs and metadata available to the public via the new [&lt;graphsAccessibleTo>public&lt;/graphsAccessibleTo>](/docs/server-admin/datasets#graphsaccessibleto) tag. Thanks to Emanuele Lombardi.
    *   Now, if a string passed to GenerateDatasetsXml or DasDds is surrounded by double quotes, it is unquoted (as if it is a JSON string). Thanks to John Kerfoot and Melanie Abecassis.
    *   GenerateDatasetsXml now supports "default" to get the default and "nothing" to get an empty string (they work with or without quotes). This solves some problems related to passing empty strings.
    *   Now, in GenerateDatasetsXml, for all EDDGridFromFiles and EDDTableFromFiles datasets, if the sampleFileName you specify is "" (the empty string), it will use the last matching fileName from the directory + regex + recursive=true.
    *   Updated: The displayInBrowser code which is used to display the results of GenerateDatasetsXml and DasDds on Linux computers was out-of-date and gave an odd message about Netscape. Now, this uses a modern Linux tool: xdg-open. Thanks to Melanie Abecassis.
    *   The allDatasets dataset now has a "files" column, which indicates the base URL of the /files link (if there is one) for the dataset.
    *   Increase the general security of your ERDDAP™ by changing the permissions associated with the tomcat directory and the bigParentDirectory:  
        (The actual commands below are for Linux. For other OS's, make analogous changes.)
        *   Change the "group" to be tomcat, your username, or the name of a small group that includes tomcat and all the administrators of Tomcat/ERDDAP, e.g.,  
            chgrp -R _yourUserName_ apache-tomcat-_8.0.23_  
            chgrp -R _yourUserName bigParentDirectory_
        *   Change permissions so that tomcat and the group have read, write, execute privileges, e.g,.  
            chmod -R ug+rwx apache-tomcat-_8.0.23_  
            chmod -R ug+rwx _bigParentDirectory_
        *   Remove "other" user's permissions to read, write, or execute:  
            chmod -R o-rwx apache-tomcat-_8.0.23_  
            chmod -R o-rwx _bigParentDirectory_  
            This is important, because it prevents other users from reading possibly sensitive information in ERDDAP™ setup files, log files, and files with information about private datasets.
    *   The authentication/login system was revamped. Thanks to Thomas Gardner, Emanuele Lombardi, and the U.S. government's new [HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        *   The authentication=openid option was removed. It was out-of-date.
        *   The new, recommended, [authentication=google](/docs/server-admin/additional-information#google) option uses Google Sign-In (based on OAuth 2.0) to allow anyone with a Google email account (including Google managed accounts like @noaa.gov) to log in.
        *   The new, [authentication=email](/docs/server-admin/additional-information#email) option is a back up for authentication=google. It allows users with a &lt;user> tag in datasets.xml to log in by sending them an email with a special link.
        *   In your setup.xml, please change the description for &lt;authentication> to be
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \[No longer supported: "basic", "openid"\]
            -->
```

        *   In your setup.xml, please add this right below the &lt;authentication> tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        *   Now, users who aren't logged in can use http or https URLs (if you have set up &lt;baseHttpsUrl> in your setup.xml). Thanks to the U.S. government's new [HTTPS-Only Standard](https://https.cio.gov/).
        *   Now, you can encourage all users to use https (not http) by setting &lt;baseUrl> to be an https URL. To force users to use only https, you must also make changes to your Apache/Tomcat setup to block non-https access. Thanks to the U.S. government's new [HTTPS-Only Standard](https://https.cio.gov/).
            
            In your setup.xml, please change the description for &lt;baseUrl> to be
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        *   The options &lt;passwordEncoding> changed. In your setup.xml, please change the description for &lt;passwordEncoding> to be
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        *   In your setup.xml, please change the description for &lt;baseHttpsUrl> to be
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        *   Now, if listPrivateDatasets=true in setup.xml, even less information will be shown about datasets that a user doesn't have access to.
    *   Now, especially for when you are initially setting up your ERDDAP, you can now tell ERDDAP™ not to try to subscribe to remote ERDDAP™ datasets. Thanks to Filipe Rocha Freire.  
        In your setup.xml, right before &lt;fontFamily>, please add
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    *   In your setup.xml, in the instructions above &lt;emailFromAddress>, please insert:  
        If possible, set this up to use a secure connection (SSL / TLS) to the email server.  
        If your setup isn't using a secure connection to the email server, please make the changes to make it so.
    *   In your datasets.xml, please add this line to the description of &lt;subscriptionEmailBlacklist> in your datasets.xml:  
        You can use the name "\*" to blacklist an entire domain, e.g., \*@example.com .
    *   Since the change to the logging system in v1.66, the log file is never up-to-date. There are always messages or parts of messages waiting to be written to the log file. Now, you can make it up-to-date (for an instant) by viewing your ERDDAP's status web page at http://_your.domain.org_/erddap/status.html .
    *   HashDigest .......
    *   A small change (to String2.canonical) that should help keep things moving quickly when ERDDAP™ is very busy and also better deal with a very large number of datasets.
    *   Strongly Recommended: stop using &lt;convertToPublicSourceUrl> in datasets.xml to convert an IP number in a dataset's &lt;sourceUrl> (e.g., http://192.168.#.#/) into a domain name (e.g., http:my.domain.org/). From now on, new subscriptions to http://localhost, http://127.0.0.1, and http://192.168.#.# URLS won't be allowed for security reasons. So please always use the public domain name in the &lt;sourceUrl> tag (if needed because of DNS problems), you can use the [/etc/hosts table on your server](https://linux.die.net/man/5/hosts) to solve the problem by converting local domain names to IP numbers without using a DNS server. You can test if a given domain name gets properly resolved by using  
        ping _some.domain.name_
    *   In generateDatasets.xml, for remote datasets (e.g., from a THREDDS server), the automatically generated datasetIDs are unchanged for most domains. For a few domains, the first part (i.e., the name) of the automatically generated datasetID will be a little different. Notably, names that had one part are now more likely to have two parts. For example, datasets from http://oos.soest.hawaii.edu previously led to datasetIDs that started with hawaii\_, but now lead to datasetIDs that start with hawaii\_soest\_ . If this causes problems for you, please email me. There may be a work-around.
    *   The Cassandra driver was updated to cassandra-driver-core-3.0.0.jar and thus for Cassandra v3. EDDTableFromCassandra doesn't take advantage of any new features in Cassandra v3. Indexes in Cassandra can now be more complex, but ERDDAP™ still uses the Cassandra v2 index model, which assumes that an indexed column can be directly queried with '=' constraints. GenerateDatasetsXml for EDDTableFromCassandra no longer detects columns with indexes; if an index is simple, you need to specify it in datasets.xml by hand. If you need support for more complex indexes or other new features, please email erd.data at noaa.gov .  
        !!! If you still use Cassandra 2.x, please continue to use ERDDAP™ v1.68 until you upgrade to using Cassandra 3.x.
    *   Jars and the Classpath -- Almost all of the included third-party .jar files were updated to their latest versions.
        *   slf4j.jar was added to /lib and the classpath.
        *   joid.jar and tsik.jar were removed from /lib and the classpath.
        *   If you get error messages about classes not found when you compile or run ERDDAP™ or one of its tools, compare your command line's classpath to ERDDAP's [current classpath](/docs/contributing/programmer-guide#development-environment) to figure out which .jars are missing from your classpath.

## Version 1.68 {#version-168}
(released 2016-02-08)

*   **New Features (for users):** None.  
     
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   [EDDGridFromFiles Aggregation via File Names or Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --  
        All variations of EDDGridFromFiles can now aggregate a group of files by adding a new leftmost dimension, usually time, based on a value derived from each filename or from the value of a global attribute that is in each file.
    *   IMPROVED: We previously suggested that you might like to create an EDDGridFromErddap dataset in your datasets.xml that referenced and re-served the jplMURSST dataset in our ERDDAP. Since there is now a newer version of that dataset, that dataset is now deprecated. So if you have that dataset in your ERDDAP™, please add this new dataset  
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
        If you want to remove the old jplMURSST dataset from your ERDDAP™ (it's your choice), change its active setting from "true" to "false".
    *   Bug fix: Please check the bigParentDirectory that you specified in your setup.xml. If you didn't put a slash at the end of the &lt;bigParentDirectory> name, then ERDDAP™ will have created several directories by appending words directly to the name that you specified, instead of creating subdirectories. Starting with version 1.68, ERDDAP™ adds a slash to the end of the directory name if you didn't specify one. So if you previously didn't specify a slash at the end, then when you install ERDDAP™ v1.68 you need to move and rename those directories **after** you shutdown the old ERDDAP™ and **before** you startup the new ERDDAP. For example, if you mistakenly specified bigParentDirectory as /home/erddapBPD (no trailing slash) and ERDDAP™ has mistakenly created directories like  
        /home/erddapBPDcache  
        /home/erddapBPDcopy  
        /home/erddapBPDdataset  
        /home/erddapBPDflag  
        /home/erddapBPDlogs  
        /home/erddapBPDlucene  
        and a file named /home/erddapBPDsubscriptionsV1.txt,  
        then you need to move and rename them to be  
        /home/erddapBPD/cache  
        /home/erddapBPD/copy  
        /home/erddapBPD/dataset  
        /home/erddapBPD/flag  
        /home/erddapBPD/logs  
        /home/erddapBPD/lucene  
        and /home/erddapBPD/subscriptionsV1.txt
    *   Bug fix: There were bugs in EDDGridLonPM180 in ERDDAP™ v1.66 that occurred when the child dataset is an EDDGridFromErddap.
    *   Bug fix: There was a bug in EDDGridFromFiles and EDDTableFromFiles in ERDDAP™ v1.66 that caused &lt;updateEveryNMillis> to be ignored the first time the dataset was loaded after a restart.
    *   Bug fix/New Feature: If a child dataset within EDDGridAggregateExistingDimension, EDDGridCopy, EDDGridFromEDDTable, EDDGridLonPM180, EDDGridSideBySide, EDDTableCopy, or EDDTableFromEDDGrid is a ...FromErddap dataset, that parent dataset now subscribes to the underlying ERDDAP™ dataset. If the underlying ERDDAP™ dataset is in the same ERDDAP™, the subscription and its validation are done directly; you won't get an email asking you to validate the subscription. Otherwise, if the subscription system for your ERDDAP™ is turned off, set the &lt;reloadEveryNMinutes> setting for the parent dataset to a smallish number (60?) so that it stays up-to-date.
    *   Bug fix/New Feature: If a child dataset within EDDGridAggregateExistingDimension, EDDGridCopy, EDDGridFromEDDTable, EDDGridLonPM180, EDDGridSideBySide, EDDTableCopy, or EDDTableFromEDDGrid has active="false", that child dataset is now skipped.

## Version 1.66 {#version-166}
(released 2016-01-19)

*   **New Features (for users):**
    *   Graphs (not maps) can now have descending values on the axes. To get this when using a Make A Graph web page, change new Y Axis : ascending setting (the default) to descending. Or, in a URL that requests a graph, use the new optional 3rd '|' parameter for the [&.xRange and/or &.yRange switches](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), which can be nothing (the default), true, or t to get ascending values, or use false or f to get descending values. The true|false values are case insensitive. Thanks to Chris Fullilove, John Kerfoot, Luke Campbell, and Cara Wilson.
    *   Users can now specify the background color for graphs by adding a &.bgColor=0x_AARRGGBB_ switch to the URL which requests the graph. See .bgColor in the Graphics Commands section of the [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) and [tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) documentation. Thanks to John Kerfoot and Luke Campbell.
    *   For tabular datasets, constraints can now refer to min(_someVariableName_) or max(_someVariableName_) . See [min() and max()](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Thanks to John Kerfoot.
    *   For tabular datasets, time constraints that use [now](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) can now specify time units of milliseconds or millis.
    *   A request for an image of a tabular dataset now makes a map (not a graph) if the x and y variables are longitude-like and latitude-like variables (compatible units). Thanks to Rich Signell.
    *   Bug fix: Time axis labels and ticks sometimes had odd irregularities when requesting multiple graphs simultaneously (e.g., on a web page). The problem was a bug in the SGT graphics library that ERDDAP™ uses (one variable was "static" that shouldn't have been). Thanks to Bradford Butman.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   It is a security risk to put your email password in a plain text file like setup.xml. To mitigate that problem, we strongly recommend that you:
        1.  Set up an email account just for ERDDAP's use, e.g., erddap@yourInstitution.org . That has other benefits as well; notably, more than one ERDDAP™ administrator can then be given access to that email account.
        2.  Make the permissions of the setup.xml file rw (read+write) for the user who will run Tomcat and ERDDAP™ (user=tomcat?) and no permissions (not read or write) for the group and other users.Thanks to Filipe Rocha Freire.
    *   The new [ArchiveADataset](/docs/server-admin/additional-information#archiveadataset) tool simplifies making a .tar.gz archive with a subset of a dataset in a format that is suitable for archiving (notably, at NOAA's NCEI). This should be useful for many ERDDAP™ administrators in many situations, but especially for groups within NOAA.
    *   The new dataset type [EDDGridFromNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked) is a variant of EDDGridFromNcFiles. The difference is that this class unpacks each data file before EDDGridFromFiles looks at the files:
        
        *   It unpacks packed variables that use scale\_factor and/or add\_offset.
        *   It promotes integer variables that have \_Unsigned=true attributes to a larger integer data type so that the values appear as the unsigned values. For example, an \_Unsigned=true byte (8 bit) variable becomes a signed short (16 bit) variable.
        *   It converts \_FillValue and missing\_value values to be NaN's (or MAX\_VALUE for integer data types).
        
        The big advantage of this class is that it provides a way to deal with different values of scale\_factor, add\_offset, \_FillValue, or missing\_value in different files in a collection. Otherwise, you would have to use a tool like [NcML](/docs/server-admin/datasets#ncml-files) or [NCO](/docs/server-admin/datasets#netcdf-operators-nco) to modify each file to remove the differences so that the files could be handled by EDDGridFromNcFiles. For this class to work properly, the files must follow the CF standards for the related attributes. Thanks to Philippe Makowski.
    *   The new dataset type [EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180) lets you change datasets that have some longitude values greater than 180 (e.g., the range 0 to 360) into datasets with longitude values within the range -180 to 180 (Longitude Plus or Minus 180, hence the name). The big advantage to offering datasets with longitude values in the range -180 to 180 is that OGC services (e.g., WMS) require longitude values in this range. Thanks to Lynne Tablewski, Fabien Guichard, Philippe Makowski, and Martin Spel.  
        2016-01-26 Update: Eeek! This has a bug that occurs when the child dataset is an EDDGridFromErddap that references a dataset in the same ERDDAP. This bug is fixed in ERDDAP™ v1.68.
    *   In [GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), a new special dataset type, EDDGridLonPM180FromErddapCatalog, lets you generate the datasets.xml for EDDGridLonPM180 datasets from all of the EDDGrid datasets in an ERDDAP that have any longitude values greater than 180.
    *   For all EDDGrid datasets, in datasets.xml you can now use the optional  
        [&lt;accessibleViaWMS>true|false&lt;/accessibleViaWMS>](/docs/server-admin/datasets#accessibleviawms) (default=true). Setting this to false forcibly disables the WMS service for this dataset. If true, the dataset may still not be accessible via WMS for other reasons (e.g., no lat or lon axes). This is particularly useful for datasets that exist on their own and wrapped by EDDGridLonPM180, so that only the LonPM180 version is accessible via WMS.
    *   In setup.xml, you can specify a different default color for the background of graphs. The color is specified as an 8 digit hexadecimal value in the form 0x_AARRGGBB_, where AA, RR, GG, and BB are the opacity, red, green and blue components, respectively, specified as 2-digit hexadecimal numbers. Note that the canvas is always opaque white, so a (semi-)transparent graph background color blends into the white canvas. The default is light blue:  
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
        Thanks to John Kerfoot and Luke Campbell.
    *   In setup.xml, you can now specify the maximum size for the [log file](/docs/server-admin/additional-information#log) (when it is renamed to log.txt.previous and a new log.txt is created), in MegaBytes. The minimum allowed is 1. The maximum allowed is 2000. The default is 20 (MB). For example:  
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    *   In datasets.xml, [&lt;fgdcFile>](/docs/server-admin/datasets#fgdcfile) or [&lt;iso19115File>](/docs/server-admin/datasets#iso19115file) can now be a local file (as before) or a URL (which will be downloaded so there is a local copy). If ERDDAP™ is unable to download the file, the loading of the dataset will continue but the dataset won't have an fgdc or iso19115 file.
    *   EDDGridFromFiles and EDDTableFromFiles datasets can now do a quickRestart (the system that ERDDAP™ tries to use when datasets are first loaded when ERDDAP™ is restarted). This speeds up restarting ERDDAP.  
        2016-01-26 Update: Eeek! This has a bug that causes &lt;updateEveryNMillis> to be ignored the first time the dataset is loaded after a restart. This bug is fixed in ERDDAP™ v1.68.
    *   A general improvement to the quickRestart system allows ERDDAP™ to load datasets faster when ERDDAP™ is restarted.
    *   All EDDGridFromFiles and EDDTableFromFiles subclasses now accept a new &lt;pathRegex> tag, usually specified right below &lt;recursive>. If recursive is "true", only full subdirectory paths which match the pathRegex (default=".\*") will be accepted. Similarly, a &lt;sourceUrls> tag in an EDDGridAggregateExistingDimension can now include a pathRegex attribute (default=".\*").
    *   The default for &lt;partialRequestMaxBytes> in setup.xml is now 490000000 (~490 MB). This avoids some problems/timeouts related to getting data from THREDDS data servers. Thanks to Leslie Thorne.
    *   A small change to the log system should allow ERDDAP™ to be more responsive when it is very, very busy. Information is now written to the log file on the disk drive in fairly big chunks. The advantage is that this is very efficient -- ERDDAP™ will never block waiting for information to be written to the log file. The disadvantage is that the log will almost always end with a partial message, which won't be completed until the next chunk is written.
    *   Bug fix related to inotify and the [&lt;updateEveryNMillis>](/docs/server-admin/datasets#updateeverynmillis) system for EDDGridFromFiles and EDDTableFromFiles datasets: It is no longer necessary to specify a large of fs.inotify.max\_user\_watches or fs.inotify.max\_user\_instances. There is a bug in Java that causes some parts of Java's inotify/WatchDirectory system to be not garbage collected when they are finalized; eventually, the number of zombie inotify watches or instances would exceed the maximum number specified. ERDDAP™ now works around this Java bug.  
        Also, the number of inotify threads is listed on the status.html web page, so you can keep an eye on its usage. Typically, there is 1 inotify thread per EDDGridFromFiles and EDDTableFromFiles dataset.
    *   Bug fix: in many places, instead of an error being rethrown, a new error was generated which only included a short version of the original error message and without the stack trace. Now, when a new error is generated, it properly includes the entire original exception e.g., throw new Exception("some new message", e);  
        Thanks to Susan Perkins.
    *   Bug fix: until recently (v1.64?), if a .../datasetID URL was requested, ERDDAP™ would add .html to the URL. In v1.64, this failed (an incorrectly formatted URL was generated and then failed). Now this works again. Thanks to Chris Fullilove.

## Version 1.64 {#version-164}
(released 2015-08-19)

*   **New Features (for users):**
    *   There is now guidance for accessing the password-protected private ERDDAP™ datasets (https://) via curl and Python. See the [curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) and [Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) instructions.  
        Thanks to Emilio Mayorga of NANOOS and Paul Janecek of Spyglass Technologies.  
         
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   ERDDAP™ now requires Java 1.8+.  
        Java 1.7 reached its [end of life](https://www.oracle.com/technetwork/java/eol-135779.html) (no more security updates) in April 2015. This version of ERDDAP™ will not work with versions of Java below 1.8. If you update from Java 1.7x (or earlier), you should also update Tomcat. See the [ERDDAP™ Set Up Instructions](/docs/server-admin/deploy-install) for download links and advice.
    *   New Data Provider Form.  
        When a data provider comes to you hoping to add some data to your ERDDAP™, it can be difficult and time consuming to collect all of the metadata needed to add the dataset into ERDDAP. Many data sources (for example, .csv files, Excel files, databases) have no internal metadata, so ERDDAP™ has a new Data Provider Form which gathers metadata from the data provider and gives the data provider some other guidance, including extensive guidance for Data In Databases. The information submitted is converted into the datasets.xml format and then emailed to the ERDDAP™ administrator (you) and written (appended) to bigParentDirectory/logs/dataProviderForm.log . Thus, the form semi-automates the process of getting a dataset into ERDDAP™, but the ERDDAP™ administrator still has to complete the datasets.xml chunk and deal with getting the data file(s) from the provider or connecting to the database. For more information, see the [Data Provider Form description](/docs/server-admin/datasets#data-provider-form).
    *   New &lt;matchAxisNDigits>  
        can be used by EDDGridFromFiles (and thus fromNcFiles and fromMergeIRFiles), EDDGridAggregateExistingDimension, EDDGridCopy, and EDDGridSideBySide datasets to specify how precisely equal the axis values in different files must be (how many digits): 0=no checking (don't use this!), 1-18 for increasing precision, or 20 (the default) for exact equality. For n=1-18, ERDDAP™ ensures that the first n digits of double values (or (n+1) div 2 for float values) are equal.  
        &lt;matchAxisNDigits> replaces &lt;ensureAxisValuesAreEqual>, which is now deprecated. A value of 'true' will be converted to matchAxisNDigits=20. A value of 'false' (don't do this!) will be converted to matchAxisNDigits=0.
    *   EDDGridFromFiles and EDDTableFromFiles will load very slowly the first time you use this version of ERDDAP.  
        ERDDAP™ now stores the internal file information a little differently, so the internal file table for each of these datasets has to be rebuilt. So don't worry. Nothing is wrong. It's a one time thing.
    *   Remote Source Files  
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles now allow the files to be remote files in a directory accessible by http:// (and probably https:// and ftp://, but they are untested) if the remote server supports [Range Requests](https://en.wikipedia.org/wiki/Byte_serving) in the request header. THREDDS and Amazon S3 support Range Requests, Hyrax does not. This system allows you to access data in remote files without downloading the files (which is helpful if the remote files are too voluminous), but access to these files will be far slower than access to local files or even to a remote OPeNDAP source.  
        This includes "files" in an Amazon S3 bucket since they are accessible via http://. If the S3 object names are like filenames (with internal /'s like a Linux directory tree), ERDDAP™ can also make the files accessible via ERDDAP's "files" system. For this to work, your S3 credentials must be in ~/.aws/credentials (on Linux, OS X, or Unix), or C:\\Users\\USERNAME\\.aws\\credentials (on Windows) on the server with ERDDAP. See the [Amazon SDK documentation](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    *   GenerateDatasetsXml has a new, unusual option: EDDsFromFiles.  
        This will go through a file system (even a remote system like an Amazon S3 if the objects have file-like names) and create the datasets.xml chunks for a series of datasets. Your mileage may vary. This works well if the files are organized so that all the data files in a given directory (and its subdirectories) are suitable for one dataset (e.g., all SST 1-day composites). Otherwise (e.g., if a directory contains some SST files and some Chlorophyll-a files), this works poorly but may still be useful.
    *   Programmers: new /lib .jar files.  
        If you compile ERDDAP™, please note the new .jar files in the classpath -cp parameter listed in the ERDDAP™ [Programmer's Guide](/docs/contributing/programmer-guide).
    *   sea\_water\_practical\_salinity  
        If you use the CF standard name sea\_water\_salinity for any variable, I encourage you to switch to sea\_water\_practical\_salinity which is available in [version 29 of the CF Standard Name Table](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html) (and some previous versions -- I didn't know that). This name indicates that this is indeed a Practical Salinity value using Practical Salinity Units (PSU), as opposed to an older g/kg value. The canonical units are different, but still incredibly unhelpful: 1 (presumably implying PSU/PSS-78), as opposed to 1e-3 (presumably implying g/kg) for sea\_water\_salinity. \[Hey, Unidata and CF: We identify values that use other scales, for example Fahrenheit or Celsius, via a units string that is the name of the scale or some variation. Why can't we identify salinity units via their scale, e.g., PSS-78? I know: PSS-78 values are "unitless", but there is an implied scale, isn't there? If I invent a new practical salinity scale where the values are 0.875 times the PSS-78 values, should the canonical units still be "1"? How could a user tell them apart? Units of 1e-3 and 1 are neither descriptive nor helpful to users who are trying to figure out what the numbers indicate.\]

## Version 1.62 {#version-162}
(released 2015-06-08)

*   **New Features (for users):**
    *   For EDDGrid datasets, users can now make Graph Type: Surface graphs with any combination of numeric axes, not just longitude versus latitude. This lets you make x versus y (projected) graphs and various [Hovmöller Diagrams](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), for example, plotting longitude versus depth, or time versus depth. \[Note: if depth is on the Y Axis, it will probably be flipped from what you want. Sorry, un-flipping it is not yet an option.\] Thanks to Cara Wilson and Lynn DeWitt.
    *   There is a new [Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) which lets you convert a common oceanic/atmospheric acronym to/from a full name.
    *   There is a new [Oceanic/Atmospheric Variable Names Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) which lets you convert a common oceanic/atmospheric variable name to/from a full name.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   Java 7/8  
        Oracle no longer supports (provides security bug fixes for) Java 7. ERDDAP™ still supports Java 7, but please move to Java 8. The next release of ERDDAP™ will probably require Java 8.
    *   valid\_min/max/range  
        Previously and now, if a dataVariable had scale\_factor and add\_offset metadata, ERDDAP™ unpacks the data values and removes that metadata. Previously, ERDDAP™ did not modify/unpack any valid\_range, valid\_min, valid\_max metadata (which usually/should contain packed values) by scale\_factor and add\_offset. Now it does. Please search your ERDDAP™ for "valid\_" and make sure that all of the variables that have valid\_range, valid\_min, or valid\_max have the correct values when the datasets appear in the new version of ERDDAP. See [valid\_range/min/max documentation](/docs/server-admin/datasets#valid_range).
    *   ACDD-1.3  
        Previously, ERDDAP™ (notably GenerateDatasetsXml) used/recommended the original (1.0) version of the [NetCDF Attribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) which was referred to as "Unidata Dataset Discovery v1.0" in the global Conventions and Metadata\_Conventions attributes. Now, we recommend [ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) which was ratified in early 2015 and is referred to as "ACDD-1.3". Fortunately, ACDD-1.3 is highly backward compatible with version 1.0. We RECOMMEND that you [switch to ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). It isn't hard.
    *   GenerateDatasetsXml Attributes  
        There were a large number of changes to improve the &lt;addAttributes> values suggested by GenerateDatasetsXml for the global Conventions, creator\_name/email/url, keywords, summary, and title attributes and for the variable long\_name attribute. Some changes are related to the new use of ACDD-1.3.
    *   EDDTableFromSOS datasets  
        With the occasional addition of new types of SOS servers and changes to the old servers, it is getting harder for ERDDAP™ to automatically detect the server type from the server's responses. The use of [&lt;sosServerType>](/docs/server-admin/datasets#eddtablefromsos-skeleton-xml) (with a value of IOOS\_NDBC, IOOS\_NOS, OOSTethys, or WHOI) is now STRONGLY RECOMMENDED. If any of your datasets of this type have problems in the new version of ERDDAP, try re-running GenerateDatasetsXml for the SOS server to generate a new chunk of datasets.xml for that dataset. GenerateDatasetsXml will let you try out the different &lt;sosServerType> options until you find the right one for a given server. If you still have problems, please let me know the problem you see and the URL of the server and I will try to help.
    *   EDDTableFromFileNames datasets  
        Some attributes that were recommended addAttributes are now sourceAttributes. You probably don't have to change anything for existing datasets in your datasets.xml.
    *   Bug fix related to certain requests to EDDTableFromNcCFFiles datasets.  
        I also added a large number of unit tests to the existing large number of unit tests of the underlying methods (there are 100's of scenarios). Thanks to Eli Hunter.
    *   Bug fix/small changes to EDDGridFromMergeIR.  
        Thanks to Jonathan Lafite and Philippe Makowski
    *   Bug fix: EDDGridFromErddap now works even if a remote dataset doesn't have ioos\_category variable attributes.  
        Thanks to Kevin O'Brien.
    *   Bug fix in .graph web page for EDDGrid datasets when there is only one axis variable with more than one value.  
        Thanks to Charles Carleton.
    *   There were other small improvements, changes, and bug fixes.

## Version 1.60 {#version-160}
(released 2015-03-12)

*   **New Features (for users):** none
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   STRONGLY RECOMMENDED: Update your server's [robots.txt](/docs/server-admin/additional-information#robotstxt) file to include:  
        Disallow: /erddap/files/
    *   INotify Problem and Solution:  
        On Linux computers, if you are using &lt;updateEveryNMillis> with datasets with type=EDDGridFromFiles, EDDTableFromFiles, EDDGridCopy, EDDTableCopy, or their subclasses, you may see a problem where a dataset fails to load (occasionally or consistently) with the error message: "IOException: User limit of inotify instances reached or too many open files". If so, you can fix this problem by calling (as root):  
        echo fs.inotify.max\_user\_watches=65536 | tee -a /etc/sysctl.conf  
        echo fs.inotify.max\_user\_instances=1024 | tee -a /etc/sysctl.conf  
        sysctl -p  
        Or, use higher numbers if the problem persists. The default for watches is 8192. The default for instances is 128. \[UPDATE: There is a bug in Java which causes inotify instances to not be garbage collected. This problem is avoided in ERDDAP™ v1.66 and higher. So the better solution is to switch to the latest version of ERDDAP.\]
    *   NoSuchFileException Bug Fix:  
        There was a bug that could cause datasets of type=EDDGridFromFiles, EDDTableFromFiles, EDDGridCopy, EDDTableCopy, or their subclasses to not load occasionally with the error "NoSuchFileException: _someFileName_". The bug is related to uses of FileVisitor and was introduced in ERDDAP™ v1.56. The problem is rare and is most likely to affect datasets with a large number of frequently changing data files.
    *   There were some small improvements, changes, and bug fixes.

## Version 1.58 {#version-158}
(released 2015-02-25)

*   **New Features (for users):**
    *   The new ["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) system lets you browse a virtual file system and download source data files from many ERDDAP™ datasets. The "files" system is active by default, but ERDDAP™ administrators can disable it by putting  
```
        <filesActive>false</filesActive>  
```
        in the ERDDAP™ setup.xml file. Special thanks to Philippe Makowski, who persisted when I was slow to appreciate the beauty of this idea.
    *   time destinationMax -- Previously, the time variable of EDDTable datasets with near real time data had a destinationMax of NaN, which implied that the maximum time value for the dataset is recent, but not precisely known and changing frequently. Now, the destinationMax has a real value, indicating the currently-known last time. Many datasets have continuously updated data. ERDDAP™ supports accessing the latest data, even if it is after the currently-known last time. Note that the new [&lt;updateEveryNMillis>](/docs/server-admin/datasets#updateeverynmillis) support in EDDGridFromFiles and EDDTableFromFiles datasets updates the time variable's destinationMax. Another consequence of this change is that the datasetID=allDatasets dataset now includes the currently-known last time in the maxTime columns. Thanks to John Kerfoot.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   STRONGLY RECOMMENDED: Update your server's [robots.txt](/docs/server-admin/additional-information#robotstxt) file to include:  
        Disallow: /files/  
        Disallow: /erddap/files/
    *   Sample datasets.xml -- Last year, we recommended several excellent datasets in the coastwatch ERDDAP™ that you could add to your ERDDAP™ just by adding a few lines to your datasets.xml. If you added the erdVH datasets, please switch to the newer erdVH2 datasets:
        *   Make a copy of all the erdVH datasets and change the copied datasetID's from erdVH... to erdVH2... and change the referenced sourceUrl from erdVH... to erdVH2....
        *   Set the erdVH... datasets to active="false".
    *   All EDDGridFromFiles and EDDTableFromFiles subclasses now support [&lt;accessibleViaFiles>](/docs/server-admin/datasets#accessibleviafiles) to make the source data files accessible via the "files" systems. By default, this system is off for each dataset. You need to add the tag to enable it. Thanks to Philippe Makowski.
    *   All EDDGridFromFiles and EDDTableFromFiles subclasses now support [&lt;updateEveryNMillis>](/docs/server-admin/datasets#updateeverynmillis). By default, this system is off for each dataset. You need to add the tag to enable it. Thanks to Dominic Fuller-Rowell and NGDC.
    *   The new [EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) creates a dataset from information about a group of files in the server's file system, but it doesn't serve data from within the files. For example, this is useful for distributing collections of image files, audio files, video files, word-processing files, and spreadsheet files. This works hand-in-hand with the new ["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) system, so that users can download the files. Special thanks to Philippe Makowski, who persisted when I was slow to appreciate the beauty of this idea.
    *   The new [EDDGridFromEDDTable](/docs/server-admin/datasets#eddgridfromeddtable) lets you convert a tabular dataset into a gridded dataset. Thanks to Ocean Networks Canada.
    *   The new [EDDGridFromMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) aggregates data from a group of local MergeIR .gz files. EDDGridFromMergeIRFiles has the distinction of being the first chunk of code contributed to ERDDAP. It was done entirely without our help. Three cheers and special thanks to Jonathan Lafite and Philippe Makowski of R.Tech Engineering.
    *   There is a new, optional setup.xml tag, &lt;unitTestDataDir>, which specifies the directory with the unit test data files which are available via a new GitHub repository: [https://github.com/ERDDAP/erddapTest](https://github.com/ERDDAP/erddapTest) . For example:  
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
        This isn't useful yet, but is part of the move toward making as many of the unit tests runnable by other people as possible. Thanks to Terry Rankine.
    *   There were many small improvements, changes, and bug fixes.

## Version 1.56 {#version-156}
(released 2014-12-16)

*   **New Features (for users):** (None)
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   You probably already know about [EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap) and [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) which let you link to datasets in other ERDDAPs and have them appear in your ERDDAP. User requests for actual data from these datasets get routed invisibly to the source ERDDAP™, so the data doesn't flow through your system or use your bandwidth. There is now a large list of recommended datasets in the sample datasets.xml in erddapContent.zip. To include them in your ERDDAP™, all you have to do is copy and paste the ones you want into your datasets.xml. Thanks to Conor Delaney.
    *   If you compile ERDDAP™, you need to add some new .jar files to your [classpath -cp switch](/docs/contributing/programmer-guide#development-environment) for javac and java.
    *   The new [EDDTableFromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) handles getting data from [Cassandra](https://cassandra.apache.org/). Thanks to Ocean Networks Canada.
    *   The new [EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) handles getting data from ASCII data files with fixed-width columns. Thanks to Philippe Makowski.
    *   All EDDGridFromFiles and EDDTableFromFiles subclasses now use a new method, FileVisitor (added to Java in 1.7) to gather information about the files. This may have no benefit for the first gathering of file information for a given dataset but seems to have a huge benefit for subsequent gatherings if done soon, while the OS still has the information cached. Thanks to NGDC.
        
        We still recommend: If a dataset has a large number of files (e.g., >1,000), the operating system (and thus EDDGridFromFiles and EDDTableFromFiles) will operate much more efficiently if you store the files in a series of subdirectories (one per year, or one per month for datasets with very frequent files), so that there are never a huge number of files in a given directory.
        
    *   Several small improvements to EDDTableFromAsciiFiles.
    *   Some improvements to EDDTableFromAsciiServiceNOS, notably to get some additional columns of information from the source. Thanks to Lynn DeWitt.
    *   Some small bug fixes related to the ISO 19115 that ERDDAP™ generates. Thanks to Anna Milan.

## Version 1.54 {#version-154}
(released 2014-10-24)

*   **New Features (for users):**
    *   Some variables now work with time at the milliseconds precision, e.g., 2014-10-24T16:41:22.485Z. Thanks to Dominic Fuller-Rowell.
*   **Small changes/Bug Fixes:**
    *   Bug fix: with a certain combination of circumstances, EDDGridFromNcFile datasets returned data at reduced precision (e.g., floats instead of doubles). This could only affect data values with > 8 significant figures. My apologies. (And it was a classic computer programming bug: one wrong character.) Thanks to Dominic Fuller-Rowell.
    *   Many small changes.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   Griddap datasets now support timestamp axis variables and data variables (i.e., variables with time values, but a destinationName other than "time"). Thanks to Dominic Fuller-Rowell.
    *   ERDDAP™ now correctly supports milliseconds time\_precision "1970-01-01T00:00:00.000Z". One intentional quirk: when writing times to human-oriented files (e.g., .csv, .tsv, .json, .xhtml), ERDDAP™ uses the specified time\_precision if it includes seconds and/or decimal seconds; otherwise, it uses seconds time\_precision "1970-01-01T00:00:00Z" (for consistency and backwards compatibility). Thanks to Dominic Fuller-Rowell.
    *   EDDGridFromNcFiles now supports reading String dataVariables.
    *   .nc files written by griddap can now have String dataVariables.
    *   GenerateDatasetsXml now includes more flush() calls to avoid the problem of information not being written to the files. Thanks to Thierry Valero.
    *   The documentation for GenerateDatasetsXml was improved, notably to point out that the -i switch only works if you specify all the answers on the command line (e.g., script mode). And script mode is explained. Thanks to Thierry Valero.
    *   ERDDAP™ no longer allows two variables in a dataset to have the same sourceName. (If someone did it before, it probably led to error messages.) As before, ERDDAP™ doesn't allow two variables in a dataset to have the same destinationName.

## Version 1.52 {#version-152}
(released 2014-10-03)

*   **New Features:** (none)
*   **Small changes/Bug Fixes:**
    *   Another (smaller) change to make ERDDAP™ faster.
    *   Improvement to ISO 19115 files generated by ERDDAP: added newly recommended &lt;gmd:protocol&gt; values (information, search, OPeNDAP:OPeNDAP, ERDDAP:griddap, and ERDDAP:tabledap) within &lt;gmd:CI\_OnlineResource&gt;. Thanks to Derrick Snowden and John Maurer.
    *   Many small changes.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   Bug fix: GenerateDatasetsXml.sh and DasDds.sh weren't in erddap.war for 1.48 and 1.50. Now they are. Thanks to Thierry Valero.
    *   Small changes to some speed tests in TestAll to make them less susceptible to chance. Thanks to Terry Rankine.

## Version 1.50 {#version-150}
(released 2014-09-06)

*   **New Features:** (none)
*   **Small changes/Bug Fixes:**
    *   This ERDDAP™ should be much faster than recent versions.
*   **Things ERDDAP™ Administrators Need to Know and Do:** (nothing)

## Version 1.48 {#version-148}
(released 2014-09-04)

*   **New Features:**
    *   ERDDAP™ now always creates a tabular dataset, datasetID=allDatasets, which has a table of information about all of the datasets in this ERDDAP. It can be queried like any other tabular dataset. This is a useful alternative to the current system for getting information about datasets programmatically.
    *   There are two new output file types for EDDTable and EDDGrid, .csv0 and .tsv0. They are comma- and tab-separated-value files that don't have lines with column names or units. The data starts on the first line. They are especially useful for scripts that just want one piece of information from ERDDAP.
*   **Small changes/Bug Fixes:**
    *   Maps can now be made to longitudes in the range -720 to 720.
    *   The new .ncml response File Type is available for all EDDGrid datasets. It returns the [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\-formatted description of the dataset (similar to a combined .dds + .das).
    *   Bug fix: Saving tabular data to an .nc file was limited to 100,000 values per variable. Now it is just limited to 2 GB total file size. Thanks to Kevin O'Brien.
    *   Bug fix: the saveAsMatlab methods now ensure that datasetIDs are converted to safe Matlab variable names. But I still strongly recommend that you create datasetIDs that are valid variable names: starting with a letter and then just using A-Z, a-z, 0-9, and \_. See [datasetID](/docs/server-admin/datasets#datasetid). Thanks to Luke Campbell.
    *   Bug fix in EDDTableFromDatabase: With some types of databases, a NO\_DATA response from the database led to a pointless 30 second delay in ERDDAP. Thanks to Greg Williams.
    *   Bug fix: EDDGrid Make A Graph with Graph Type = lines (or markers or markers and lines) forced x axis variable to be time. Now it can be any axis. Thanks to Lynn DeWitt.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   STRONGLY RECOMMENDED: Update Java  
        This version of ERDDAP™ requires Java 7 or higher, but Java 7 will reach its end-of-life in April 2015 (soon!), so now is a good time to switch to Java 8. So Java 8 is STRONGLY RECOMMENDED. I test with Java 8. Note that Java 6 reached its end-of-life in February 2013 (no more security bug fixes!).
    *   STRONGLY RECOMMENDED: Update Tomcat  
        If you use Tomcat, please switch to the latest version of Tomcat. Tomcat 8 is designed to work with Java 8.
    *   "ERDDAP" is no longer an acronym. Now it is just a name. I don't want the name to highlight ERD. I want ERDDAP™ to highlight your institution and your data.
    *   PLEASE [customize the appearance of your ERDDAP™ installation to highlight your institution and your data](/docs/server-admin/deploy-install#customize). With an hour's work, you can make nice improvements that will last forever.
    *   In setup.xml, the &lt;displayDiagnosticInfo> option is now always ignored and treated as if the value were false.  
        RECOMMENDED: Remove the &lt;displayDiagnosticInfo> tag and related info from your setup.xml.
    *   In setup.xml, the default for &lt;drawLandMask> was "over", but now it is "under", which is a better general default (works well with all datasets).
    *   The GenerateDatasetsXml.sh and DadDds.sh Linux scripts now use bash instead of csh, and have the extension .sh. Thanks to Emilio Mayorga
    *   GenerateDatasetsXml and DasDds now create their own log files (GenerateDatasetsXml.log and DasDds.log) and output files (GenerateDatasetsXml.out and DadDds.out) in _bigParentDirectory_/logs/, and never put their results on the clipboard.
    *   GenerateDatasetsXml now supports a -i command line parameter which inserts the output into the specified file at a specified place. See the [documentation](/docs/server-admin/datasets#generatedatasetsxml). Thanks to Terry Rankine.
    *   EDDTableFromDatabase now supports &lt;columnNameQuotes>&lt;/columnNameQuotes>, with valid values " (the default), ', or nothing. This character (if any) will be used before and after column names in SQL queries. Different types of databases, set up in different ways, will need different column name quotation marks.
    *   Tabular latitude and longitude variables can now have customized long\_name's, e.g., Profile Latitude. Previously, they could only be Latitude and Longitude.
    *   From now on, specify "defaultDataQuery" and "defaultGraphQuery" as attributes in the dataset's global metadata (i.e., &lt;addAtts>), not as separate &lt;defaultDataQuery> and &lt;defaultGraphQuery> tags. (Although, if you still specify them via the tags, ERDDAP™ will automatically create global attributes with the information.)

## Version 1.46 {#version-146}
(released 2013-07-09)

*   **New Features:**
    *   (None)
*   **Small changes/Bug Fixes:**
    *   Bug fix: In EDDTableFromDatabase, in version 1.44 only, ERDDAP™ improperly quoted the database's table name in SQL statements. That is now fixed. Thanks to Kevin O'Brien.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   **If you don't modify the standard messages in messages.xml,  
        delete \[tomcat\]/content/erddap/messages.xml .**  
        The default messages.xml file is now in the erddap.war file, not erddapContent.zip. So, you no longer need to manually update messages.xml .
    *   If you do modify the messages in messages.xml, from now on, each time you update ERDDAP™, either:
        *   Make the same changes you made before to the new  
            \[tomcat\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.  
            And this one time: delete \[tomcat\]/content/erddap/messages.xml .
        *   Or, figure out what has changed in the new messages.xml (via diff), and modify your  
            \[tomcat\]/content/erddap/messages.xml file accordingly.

## Version 1.44 {#version-144}
(released 2013-05-30)

*   **New Features:**
    *   Queries to EDDTable datasets now support &orderByMin(...) and &orderByMinMax(...) (which returns two rows in each group, with the minimum and maximum of the last orderBy value). Thanks to Lynn DeWitt.
    *   There are two new tabledap file types: .ncCFHeader and .ncCFMAHeader (which return the ncdump-like header of the corresponding .ncCF and .ncCFMA file types). Thanks to Steve Hankin.
*   **Small changes/Bug Fixes:**
    *   Bug fix: loading the .graph and .html web pages for datasets with lots of time values was slow because ERDDAP™ was slow when generating the time slider options. Now it is always fast. Thanks to Michael Barry, OOICI, and Kristian Sebastian Blalid.
    *   Bug fix: In some EDDTable dataset types, the time constraints were not always handled correctly. Now they are. Thanks to John Maurer and Kevin O'Brien.
    *   Bug fix: datasets wouldn't load when all of the subsetVariables were fixed value variables. Now they will. Thanks to Lynn DeWitt and John Peterson.
    *   IMPROVED: now, all queries for just subset variables act as if &distinct() is part of the query.
    *   IMPROVED: now, for queries that include &.jsonp=_functionName_, _functionName_ MUST now be a series of 1 or more (period-separated) words. Each word must start with an ISO 8859 letter or "\_" and be followed by 0 or more ISO 8859 letters, digits, or "\_". Yes, this is more restrictive than JavaScript's requirements for function names.
    *   The time axis on graphs now works well for longer time ranges (80 - 10000 years) and shorter time ranges (0.003 - 180 seconds).
    *   ERDDAP™ is now more forgiving when parsing variations of ISO-8601-format time data.
    *   There were many other small changes and bug fixes.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   **You MUST update to the latest version to be secure.**  
        ERDDAP™ underwent a security audit. There were some bugs and weaknesses. Version 1.44 includes several important security bug fixes and several changes to increase security and accessibility (e.g., for vision impaired users). Version 1.44 has passed the follow-up security audit. Thanks to all the good people at USGS and Acunetix who made this possible. (Shouldn't NOAA be doing this?)
    *   The new [EDDTableFromWFSFiles](/docs/server-admin/datasets#eddtablefromwfsfiles) makes a local copy of all of the data from an ArcGIS MapServer WFS server and so the data can then be re-served quickly to ERDDAP™ users. Thanks to Christy Caudill.
    *   The new [EDDTableFromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid) lets you create an EDDTable dataset from an EDDGrid dataset. Some common reasons for doing this are:
        *   This allows the dataset to be queried with OPeNDAP selection constraints (which a user may have requested).
        *   The dataset is inherently a tabular dataset.Thanks to OOICI, Jim Potemra, Roy Mendelssohn.
    *   The variable name "depth" is now a special alternative to "altitude". The units must be some variant of "meters". The data values must be positive=down. ERDDAP™ is now fully aware of the meaning of "depth" and supports it wherever altitude is supported (e.g., as a component of a CF DSG cdm\_data\_type=profile dataset). A dataset must not have both "depth" and "altitude" variables.
    *   In your datasets.xml, please remove any uses of &lt;att name="cdm\_altitude\_proxy">depth&lt;/att> since depth is now a special alternative to altitude and so doesn't need to be specially identified.
    *   In your datasets.xml, please remove any uses of &lt;altitudeMetersPerSourceUnit>, except for EDDTableFromSOS.  
        When the value is 1, just delete it.  
        When the value is -1, consider changing the variable name to depth.  
        For other values, add to &lt;addAttributes>, for example,:  
```
        <att name="scale\_factor" type="float">-1</att>
```

    *   All datasets now support
        
        *   &lt;defaultDataQuery> which is used if .html is requested with no query.
            *   You will probably rarely need to use this.
            *   For griddap datasets, a common use of this is to specify a different default depth or altitude dimension value (e.g., \[0\] instead of \[last\]).  
                In any case, you should always list all of the variables, always use the same dimension values for all variables, and almost always use \[0\], \[last\], or \[0:last\] for the dimension values.  
                For example:  
```
                <defaultDataQuery>u\[last\]\[0\]\[0:last\]\[0:last\],v\[last\]\[0\]\[0:last\]\[0:last\]</defaultDataQuery>
```

            *   For tabledap datasets, the most common use of this is to specify a different default time range (relative to now, e.g., &time&gt;=now-1day).  
                Remember that requesting no data variables is the same as specifying all data variables, so usually you can just specify the new time constraint.  
                For example:  
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery> which is used if .graph is requested with no query.
            *   You will probably rarely need to use this.
            *   For griddap datasets, the most common use of this is to specify a different default depth or altitude dimension value (e.g., \[0\] instead of \[last\]) and/or to specify that a specific variable be graphed.  
                In any case, you will almost always use \[0\], \[last\], or \[0:last\] for the dimension values.  
                For example:  
```
                <defaultGraphQuery>temp\[last\]\[0\]\[0:last\]\[0:last\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            *   For tabledap datasets, the most common uses of this are to specify different variables to be graphed, a different default time range (relative to now, e.g., &time&gt;=now-1day) and/or different default graphics settings (e.g., marker type).  
                For example:  
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

        Remember that you need to XML-encode or percent-encode (either one, but not both) the default queries since they are in an XML document. For example, & becomes &amp;amp; , &lt; becomes &amp;lt; , and > becomes &amp;gt; .  
        And please check your work. It is easy to make a mistake and not get what you want.  
        Thanks to Charles Carleton, Kevin O'Brien, Luke Campbell, and others.
    *   EDDGridFromDap, EDDGridFromErddap, and EDDTableFromEDDGrid have a new system to deal with datasets that change frequently (as often as roughly every 0.5 s). Unlike ERDDAP's regular, proactive system for completely reloading each dataset, this optional additional system is reactive (triggered by a user request) and incremental (just updating the information that needs to be updated). For example, if a request to an EDDGridFromDap dataset occurs more than the specified number of milliseconds since the last update, ERDDAP™ will see if there are any new values for the leftmost (usually "time") dimension and, if so, just download those new values before handling the user's request. This system is very good at keeping a rapidly changing dataset up-to-date with minimal demands on the data source, but at the cost of slightly slowing down the processing of some user requests. See [&lt;updateEveryNMillis>](/docs/server-admin/datasets#updateeverynmillis)  
        Thanks to Michael Barry and OOICI.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles now support [NcML .ncml](/docs/server-admin/datasets#ncml-files) source files in place of .nc files. Thanks to Jose B Rodriguez Rueda.
    *   For EDDGridAggregateExistingDimension, ERDDAP™ supports a new serverType="dodsindex" option for the serverType attribute of the &lt;sourceUrls> tag. This works with web pages that have lists of files within &lt;pre>&lt;/pre> and often beneath an OPeNDAP logo. An example is [https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    *   For EDDTableFromSOS now supports an optional tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
        so you can specify the type of SOS server (so ERDDAP™ doesn't have to figure it out). Valid values of &lt;_serverType_\&gt; are IOOS\_NDBC, IOOS\_NOS, OOSTethys, and WHOI (a newly supported serverType). See [EDDTableFromSOS](/docs/server-admin/datasets#eddtablefromsos). Thanks to Derrick Snowden and Janet Fredericks.
    *   All EDDGridFrom...Files, EDDTableFrom...Files, EDDGridCopy, and EDDTableCopy now support an optional tag  
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
        which can tell ERDDAP™ to keep the fileTable (with information about each source data file) in memory instead of just on the disk (the default). Keeping the fileTable in memory speeds up requests for data (especially if there are >1000 source data files), but uses more memory. If you set this to true for any dataset, keep an eye on the Memory: currently using line at _yourDomain_/erddap/status.html to ensure that ERDDAP™ still has plenty of free memory. Thanks to Fredrik Stray.
    *   EDDTableFromASCIIFiles now supports &lt;charset>. The two most common charsets (case sensitive!) are ISO-8859-1 (the default) and UTF-8.
    *   Recommended: in setup.xml, within &lt;startHeadHtml>, please change &lt;html> into  
        &lt;html lang="en-US"> (or a different [language code](https://www.w3schools.com/tags/ref_language_codes.asp) if you have translated messages.xml).
    *   setup.xml has new optional tags to disable parts of ERDDAP:
        *   &lt;convertersActive>false&lt;/convertersActive> &lt;!-- the default is true -->
        *   &lt;slideSorterActive>false&lt;/slideSorterActive> &lt;!-- the default is true -->
        *   &lt;wmsActive>false&lt;/wmsActive> &lt;!-- the default is true -->In general, we recommend against setting any of these to false.
    *   GenerateDatasetsXml now writes results to _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, not log.txt. Thanks to Kristian Sebastian Blalid.
    *   GenerateDatasetsXml now makes a good suggestion for the &lt;reloadEveryNMinutes>. Thanks to the NOAA UAF project.
    *   Many small improvements to GenerateDatasetsXml. Thanks to the NOAA UAF project.

## Version 1.42 {#version-142}
(released 2012-11-26)

*   **New Features:**
    *   (No major new features.)
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   If you are upgrading from ERDDAP™ 1.38 or 1.40, there were no changes that require you to make changes to your configuration files (but you must use the new messages.xml file).
    *   ERDDAP™ once again can run with Java 1.6. (ERDDAP™ v1.40 required Java 1.7.) We still strongly recommend using the latest version of Java 1.7.
    *   A new dataset type, [EDDTableFromAwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), can read data from a set of Automatic Weather Station (AWS) XML data files. Thanks to Lynn Dewitt and the Exploratorium.
*   **Small changes/Bug Fixes:**
    *   Adjusted to changes to the NDBC SOS source data servers.
    *   Adjusted to changes to the NOS COOPS ASCII services.
    *   Made several small changes and bug fixes.

## Version 1.40 {#version-140}
(released 2012-10-25)

*   **New Features:**
    *   There is a new output file format for tabledap datasets: .ncCFMA, which saves the requested data in a .nc file which conforms to the CF [Discrete Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Multidimensional Array options, and which therefore conforms to the NODC templates \[2021: now the [NCEI templates](https://www.ncei.noaa.gov/netcdf-templates)\] for storing this type of data. Thanks to NODC.
    *   tabledap requests can now include time constraints such as &time>now-5days. See the [documentation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Thanks to James Gosling.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   If you are upgrading from ERDDAP™ 1.38, there were no changes that require you to make changes to your configuration files (but you must use the new messages.xml file).
    *   ERDDAP™ public releases and internal milestones are available via [ERDDAP™ on GitHub](https://github.com/ERDDAP). For more information, see the [Wiki](https://github.com/ERDDAP/erddap/wiki) for the ERDDAP™ project as well as the more general [ERDDAP™ Programmer's Guide](/docs/contributing/programmer-guide). (This was announced separately a few weeks after the ERDDAP™ 1.38 release.)
    *   GenerateDatasetsXml has been improved.
        *   The script was revised so it should work correctly on all Linux computers (not just a few).
        *   It now adds creator\_name, creator\_email, and creator\_url whenever possible.
        *   Many other small improvements.
    *   Refined how ERDDAP™ deals with time.
        *   Internally, ERDDAP™ now handles times at millisecond precision (not seconds).
        *   You can now optionally specify the time precision for a given dataset, see [time\_precision](/docs/server-admin/datasets#time_precision). For example, you might set a dataset to display time values with date precision (e.g., 1970-01-01).
        *   Your current datasets will use the default settings, so they are unaffected by these changes and will continue to display time with seconds precision.Thanks to Servet Cizmeli and Philip Goldstein.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) is a new dataset type which you can use in your datasets.xml file. It can read data from any of the numerous file formats defined by the [CF Discrete Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) conventions. Thanks to NODC and special thanks to Kyle Wilcox for making sample files for the huge number of valid DSG file formats and for making them publicly available.
*   **Small changes/Bug Fixes:**
    *   Expanded the [quickRestart](#quick-restart) system to all relevant EDDGrid and EDDTable subclasses.
    *   Improved documentation, especially related to how to use [griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) and [tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) from various client software.
    *   Changed advanced search to support minTime and/or maxTime expressed as epochSeconds. Thanks to Lynn Dewitt.
    *   Changed .htmlTable output to display urls and email addresses as links.
    *   Added "rel=" and "rev=" to relevant &lt;a href> tags. Thanks to Pat Cappelaere from the OGC REST project.
    *   Improved protection against unrealistically large data requests, notably within tabledap, where it is a harder problem.
    *   Moved more messages to messages.xml.
    *   Made speed improvements.
    *   Fixed EDDGridFromFiles to allow descending sorted axes. Thanks to Maricel Etchegaray.
    *   Removed references to iGoogle since it will be discontinued.
    *   Made several small changes and bug fixes.

## Version 1.38 {#version-138}
(released 2012-04-21)

*   **New Features:**
    *   ISO 19115 and FGDC -- ERDDAP™ can automatically generate ISO 19115 and FGDC XML metadata files for each dataset. Links to the files are visible on every list of datasets (e.g., from Full Text Search) and also in Web Accessible Folders (WAF) (see the [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) and [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)). Thanks to Ted Habermann, Dave Neufeld, and many others.
    *   Full Text Searches for Datasets now support \-_excludedWord_ and \-"_excluded phrase_" . Thanks to Rich Signell.
    *   Searches for datasets now return results a page at a time. The default uses the parameter string: page=1&itemsPerPage=1000, but you can change the values in the URL of your request. Thanks to Steve Hankin and the UAF project.
    *   OpenSearch -- ERDDAP™ now supports the [OpenSearch 1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standard for searching for datasets. Among other things, this allows catalog aggregation websites to do distributed searches (passing a search request to each catalog that it knows about).
    *   Comma Separated Value (CSV) Files -- ERDDAP™ now generates CSV files with just a comma between values (which Excel prefers), instead of comma+space. Thanks to Jeff deLaBeaujardiere.
    *   Million Datasets -- Several changes were made to support ERDDAPs having a huge number of datasets, perhaps even a million. Thanks to Steve Hankin and the UAF project.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
#### Quick Restart {#quick-restart}
*   [A](#quick-restart) quick restart system allows ERDDAP™ to restart much faster.  
    **Please add this to your setup.xml file** right after &lt;/datasetsRegex>:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    *   Full text searches for datasets can now be done with the Lucene search engine (although we recommend the original search engine if you have fewer than 10,000 datasets) or the original search system.  
        **Please add this to your setup.xml file** right after &lt;/displayDiagnosticInfo>:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    *   In setup.xml, you can/should now add two new categories to the comma-separated list of &lt;categoryAttributes>:
        *   global:keywords (add it right after global:institution) -- a new special case that parses a comma-separated list of keywords from the global keywords attribute to make a separate entry for each keyword.
        *   variableName (add it at the end) -- a new special case that categorizes each of the dataVariable destinationNames.
    *   In setup.xml, you can (but why?) tell ERDDAP™ not to offer FGDC and/or ISO 19115 metadata for any dataset by including  
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

        The default values for these settings is true.
    *   In datasets.xml, please consider improving the metadata for your datasets. ERDDAP™ now automatically generates ISO 19115 and FGDC XML metadata files for each dataset based on the dataset's metadata.  
        So, **good dataset metadata leads to good ERDDAP-generated ISO 19115 and FGDC metadata.**  
        **See the new documentation for the many new RECOMMENDED [Global Attributes](/docs/server-admin/datasets#global-attributes).**
    *   In datasets.xml, if you want to tell ERDDAP™ to use a pre-made FGDC and/or ISO 19115 file that is somewhere on the server's file system instead of having ERDDAP™ generate these files, use:  
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
        If _fullFileName_\="" or the file isn't found, the dataset will have no FGDC and/or ISO 19115 metadata. So this is also useful if you want to suppress the FGDC and/or ISO 19115 metadata for a specific dataset.
    *   In datasets.xml, for all EDDGridSideBySide and EDDGridAggregateExistingDimension datasets, make certain that child datasets have different datasetIDs than their parent datasets and than the other children. (For example, you could follow George Foreman's simple but effective system for naming his children.) If any names in a family are exactly the same, the dataset will fail to load (with the error message that the values of the aggregated axis are not in sorted order).
    *   In datasets.xml, there were some changes to the list of valid ioos\_category metadata values:
        *   "pCO2" was changed to "CO2".
        *   "Physical Oceanography" was added.
        *   "Soils" was added.
    *   In datasets.xml, ERDDAP™ no longer allows '.' in a datasetID. It was allowed but discouraged. (Sorry)
    *   In datasets.xml, the setup for EDDTableFromThreddsFiles and EDDTableFromHyraxFiles has changed slightly because both classes were just rewritten to be more efficient (both classes now always make a local copy of all of the remote data files). See the documentation for setting up these classes: [EDDTableFromHyraxFiles](/docs/server-admin/datasets#eddtablefromhyraxfiles) and [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). In particular, see the revised comments about &lt;fileDir> (now irrelevant) and &lt;sourceUrl> (now essential). Also, you should never wrap this class in EDDTableCopy for efficiency.
    *   In datasets.xml, if you use EDDTableFromDatabase with an Oracle database, you should include a connectionProperty such as  
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
        to specify how many rows of data to fetch at one time because the default is 10, which is horribly inefficient. See the [Oracle documentation](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql and PostgreSQL seem to have better defaults for this setting. Thanks to Kevin O'Brien.
    *   If you use EDDTableFromDatabase, see the improved ["Speed" documentation](/docs/server-admin/datasets#eddtablefromdatabase) for additional suggestions to improve performance. Thanks to Kevin O'Brien.
    *   In datasets.xml, for all EDDTable... datasets, in the Conventions and Metadata\_Conventions global attributes, please refer to CF-1.6 (not CF-1.0, 1.1, 1.2, 1.3, 1.4, or 1.5), since CF-1.6 is the first version to include the changes related to the Discrete Sampling Geometry.
    *   Programmers that are compiling the ERDDAP™ code need to add lib/lucene-core.jar to the list of jar files in their javac and java command line paths.
    *   ERDDAP™ has a [new service](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) to convert a CF Standard Name to/from a GCMD Science Keyword. You may find this useful when generating global keywords metadata for the datasets in your ERDDAP.
    *   Dealing with Bots -- Please read this advice to [prevent bots from crawling your ERDDAP™ in a stupid way](/docs/server-admin/additional-information#robotstxt).
    *   Translation -- The text on ERDDAP's web pages is now mostly in messages.xml and so suitable for translation to different languages (e.g., German, French). The messages now often use MessageFormat for formatting, also to aid in making translations. If you are interested in doing a translation, please email erd dot data at noaa dot gov .
    *   Sample datasets.xml -- There were several small but significant errors in the sample datasets.xml. If you use those datasets, please get the newer versions from the new sample datasets.xml in the new erddapContent.zip file. Thanks to James Wilkinson.
    *   Git -- I will try hard to make ERDDAP™ a GitHub project ASAP after this release.
*   **Small changes/Bug Fixes:**
    *   A new palette, OceanDepth, is useful for depth values (positive is down), e.g., 0 (shallow) to 8000 (deep).
    *   The .kml output from tabledap uses a better marker icon (it isn't fuzzy). And hovering over a marker now makes it bigger.
    *   EDDTableFromFiles -- In the last upgrade, the new netcdf-java library had tighter restrictions for variable names in .nc files. That caused problems for EDDTableFromFiles if a variable's sourceName had certain punctuation characters. EDDTableFromFiles is now modified to avoid that problem. Thanks to Thomas Holcomb.
    *   The .subset page now supports 0/10/100/1000/10000/100000 instead of a check box for Related Data. The tooltip warns that 100000 may cause your browser to crash. Thanks to Annette DesRochers, Richard (Abe) Coughlin, and the IOOS Biological Project.
    *   .../erddap/info/_datasetID_/index.html web pages now show urls and email addresses as clickable links. Thanks to Richard (Abe) Coughlin and the IOOS Biological Project.
    *   Bug fix: In tabledap, for datasets with altitudeMetersPerSourceUnit &lt; 0, queries with altitude constraints were handled incorrectly. Thanks to Kyle Wilcox.
    *   Bug fix: EDDGridAggregateFromExistingDimension now supports more diverse TDS URLs. Thanks to ?

## Version 1.36 {#version-136}
(released 2011-08-01)

*   **New Features:**
    *   No significant changes from a user's standpoint.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   The pmelTao dataset that was often used as the sample dataset for the tabledap  
        documentation is no longer available. ERDDAP™ administrators MUST make these changes:
        *   In your datasets.xml, if you have a datasetID="pmelTao" dataset, add  
            active="false" right before the ">" at the end of that line.
        *   In your setup.xml, if your &lt;EDDTableIdExample> is pmelTao, then:
            *   If your datasets.xml doesn't have a dataset with datasetID="erdGlobecBottle", add  
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            *   In your setup.xml, replace all of the tags from &lt;EDDTableIdExample> through  
                &lt;EDDTableMatlabPlotExample> with
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \[baseUrl\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    *   For datasets where the type is a subclass of EDDTableFromFiles, you can now make data from metadata.  
        Specifically, you can now make a variable from the values of an attribute of one of the original variables.  
        For example, in datasets.xml, within a &lt;dataVariable> tag, if you use  
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™ will make a variable with the values of the PI attribute of the cruise variable.  
        Thanks to WOD.
*   **Changes:**
    *   Small changes

## Version 1.34 {#version-134}
(released 2011-06-15)

*   **Changes:**
    *   Bug fix: Fixed a memory leak that occurred on some 64-bit Java installations.
    *   Bug fix: ERDDAP™ now correctly sets these global attributes when the latitude dimension's values range from high to low: geospatial\_lat\_min, geospatial\_lat\_max, Southernmost\_Northing, Northernmost\_Northing.
        
        Note that actual\_range is unchanged: it may have low,high values or high,low values, since it is intended to indicate the range and the order of storage.
        
    *   Small changes.
    *   ERDDAP™ administrators don't need to make any changes to their setup.xml or datasets.xml.

## Version 1.32 {#version-132}
(released 2011-05-20)

*   **Changes:**
    *   Support for the newly ratified, CF Discrete Sampling Geometries (which unfortunately is not yet available online), which replaces the proposed CF Point Observation Conventions.  
        ERDDAP™ users will see that cdm\_feature\_type=Station is replaced by TimeSeries and there are small changes to the files created for the .ncCF file type (flat\_dimension is now called sample\_dimension).  
        ERDDAP™ administrators will need to make these changes in datasets.xml:
        *   cdm\_data\_type=Station should be changed to cdm\_data\_type=TimeSeries.
        *   cdm\_data\_type=StationProfile should be changed to cdm\_data\_type=TimeSeriesProfile.
        *   cdm\_station\_variables should be changed to cdm\_timeseries\_variables.
        *   cf\_role=station\_id should be changed to cf\_role=timeseries\_id.
    *   New ioos\_category options: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    *   Possible solution to a possible memory leak on 64-bit Java. \[It didn't work.\]
    *   Small changes.

## Version 1.30 {#version-130}
(released 2011-04-29)

*   **New Features:**
    *   Support for 64-bit Java. When used with 64 bit Java, ERDDAP™ can now use much more heap memory and handle many more simultaneous requests.
    *   Support for .nc file requests up to 2GB (even without 64-bit Java) via better use of ERDDAP's handling of data in chunks.
    *   Many 2X speed improvements in the code and 2X speed ups from Java 1.6 make ERDDAP™ 2X to 4X faster than before.
    *   Memory saving improvements significantly lower ERDDAP's base memory usage.
    *   For tabular datasets, ERDDAP™ is now fully aware of a dataset's cdm\_data\_type, and how the data maps to the CDM type. See the [CF Discrete Sampling Geometries specification](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Perhaps someday soon, that Word file will be converted to .html and replace the current "OBSOLETE" information on that web page. Thanks to the NOAA UAF project.
    *   For most EDDTable datasets, a new output file type option, .ncCF, creates Contiguous Ragged Array .nc files which conform to the latest version of the [CF Discrete Sampling Geometries conventions](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). These files are structured to reflect the CDM data type of the dataset. Since the proposed conventions just changed, as of this writing, the netcdf-java library does not yet support reading the file formats created by ERDDAP and interpreting them as CDM data files. It probably will soon. Thanks to the NOAA UAF project.
    *   The View : Distinct Data option on the .subset web page is now a drop-down list that lets users specify the maximum number of rows of distinct data to be viewed (default = 1000). This change, and others, allow ERDDAP™ to work with datasets that have very large numbers of rows of distinct data. (The number of unique values for any single variable is still an issue, but it can be pretty high (20,000?) before the .subset and other web pages load really slowly.) Thanks to the NOAA UAF project.
    *   .subset web pages have a new option: View Distinct Data Counts. Thanks to the GTOPP project.
    *   To aid users, the distinct values (e.g., station names) are now shown on the Make-A-Graph and Data Access Forms. Thanks to the NOAA UAF project.
    *   .transparentPng requests now support all types of graphs and data representations. It draws just the data -- no axes, legends, landmask, or anything else. This makes it possible to make images as layers of transparentPngs. If &.size=_width_|_height_ is specified in the query (recommended), it is honored. The default is 360x360 pixels. The only exception is EDDGrid &.draw=surface, where the default (as before) is an image with ~1/pixel per data point (up to 3000 x and y pixels). Thanks to Fred Hochstaedter.
    *   The WMS web pages now show the color bar for the dataset's variable(s). Thanks to Emilio Mayorga and others.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   This release involves a lot of changes. They are all important. Please be patient and work through all of the changes listed below.
    *   This version is being pushed out earlier than intended to deal with some Java security bugs. Unfortunately, several features/fixes intended for this ERDDAP™ version are not in this version. Sorry. Hopefully, the next version will be relatively soon (and much easier to upgrade to).
    *   To avoid several security bugs in Java 6 update 23 and below, download and install the latest version of Java (Java 6 update 24 or higher). If you have a 64-bit operating system, please get a 64-bit version of Java.
    *   If you are using Tomcat 5, you MUST upgrade to Tomcat 6 or 7 (preferred). If you are using Tomcat 6, consider upgrading to Tomcat version 7.
    *   Please follow all of the instructions for [setting up a new ERDDAP™](/docs/server-admin/deploy-install), but where relevant, you will be copying files from your old installation to the new installation, notably the \[tomcat\]/content/erddap directory and files. As part of that, note the [new Tomcat setup recommendations](/docs/server-admin/deploy-install#tomcat).
    *   The default erddap.css is now included in the erddap.war file.
        *   To use the default erddap.css, **delete** your old \[tomcat\]/content/erddap/images/erddap.css .
        *   If you modified \[tomcat\]/content/erddap/images/erddap.css, and want to keep using it: just leave it in place and replace the &lt;input> section with:  
```
            /\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \*/  
            input\[type=button\], input\[type=submit\], button {  
              margin:0px; padding:0px 3px; }  
            input\[type=checkbox\], input\[type=password\],  
              input\[type=text\], select, textarea {  
              margin:0px; padding:0px; }  
            input\[type=radio\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    *   In your \[tomcat\]/content/erddap/setup.xml:
        *   Replace the comments and tags related to &lt;partialRequestMaxBytes> and &lt;partialRequestMaxCells> with  
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \-->
```
        *   Replace the comments related to &lt;categoryAttributes> and consider modifying the tag's value:  
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\_category/index.html  
            (ioos\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \-->  
            <categoryAttributes>global:institution, ioos\_category,  
            long\_name, standard\_name</categoryAttributes>  
```

            Individual &lt;categoryAttributes> that are global attributes now MUST be identified via the prefix global: (e.g., global:institution). Other attributes are assumed to be variable attributes (e.g., standard\_name). Also, institution values (the only ones) were left in the original case. Now all category values are converted to lowercase.
    *   In your \[tomcat\]/content/erddap/datasets.xml:
        *   Big IMPROVED: ERDDAP™ has new requirements related to a tabular dataset's cdm\_data\_type. Notably, each dataset MUST have the correct metadata and variables related to the cdm\_data\_type. If not, the dataset won't load and will throw an error. See the documentation for [cdm\_data\_type](/docs/server-admin/datasets#cdm_data_type).
        *   FYI: There is a new dataset type: EDDTableFromAsciiServiceNOS.
        *   FYI: There are three newly allowed ioos\_category options: Hydrology, Quality (e.g., for quality flags), and Statistics (e.g., mean).
        *   For EDDTableFrom...Files datasets, remove any &lt;nDimensions> tags. They are no longer needed or used.
        *   For variables with destinationName=altitude, ERDDAP™ no longer forces the long\_name to be Altitude. Please go through your datasets.xml and repeatedly search for &lt;destinationName>altitude and add to that variable's &lt;addAttributes>:  
```
              <att name="long\_name">Altitude</att>  
```
            (or a slightly different long\_name in special cases).
        *   Optional: All EDDTableFromFiles subclasses support variable [sourceName=global:...](/docs/server-admin/datasets#global-sourcenames) to convert global metadata from each file into a data variable. Thanks to Lynn DeWitt.
    *   EDDTableFromDatabase users -- ERDDAP™ comes with a new JDBC 4 driver for Postgres. For other databases, check the web for the latest JDBC .jar file for your database. Since ERDDAP™ now uses Java 1.6+, JDBC 4 (not 3) is probably recommended.
    *   FYI
        *   EDDGridFrom...Files and EDDTableFrom...Files datasets now store the fileTable information in  
            \[bigParentDirectory\]/datasetInfo/\[datasetID\]/\*.nc files.  
            Also, EDDTable datasets now store the subset information in  
            \[bigParentDirectory\]/datasetInfo/\[datasetID\]/\*.nc files. These files used to be  
            \[bigParentDirectory\]/datasetInfo/\[datasetID\].\*.json files.  
            The old files will be deleted automatically when ERDDAP™ starts up. Or, you can delete all files (but leave the empty subdirectories) in \[bigParentDirectory\]/datasetInfo/.
        *   I worked on a new EDDTableFromNcCFFiles which would read data from local and remote files using the proposed, new CF Point Observation Conventions. But it isn't in this release. There are problems in the netcdf-java libraries related to some methods for reading these files. And there were some very recent changes to the proposed CF Point Observation Conventions. When the netcdf-java library is fixed and updated to the latest proposal, I will resume work on this.
        *   Running ERDDAP™ on Windows may have problems: notably, you may see in the \[bigParentDirectory/logs/log.txt file that ERDDAP™ is sometimes unable to delete and/or rename files quickly. This is due to antivirus software (e.g., from McAfee and Norton) which is checking the files for viruses. If you run into this problem (which can be seen by error messages in the log.txt file like "Unable to delete ..."), changing the antivirus software's settings may partially alleviate the problem.  
            If the ERDDAP™ in Windows is just a test running on your desktop, this is just an annoyance.  
            If the ERDDAP™ in Windows is your public ERDDAP™, consider switching to a Linux server.
    *   Slow First Startup -- The first time you run ERDDAP™ after upgrading, ERDDAP™ may be slow to load the datasets. The way ERDDAP™ stores information about aggregated files has changed, so ERDDAP™ will need to re-read some info from all of those files. That will take time.
    *   Errors on Startup -- Given the changes related to cdm\_data\_type, it is likely that some of your datasets won't load and will throw errors. Carefully read the Daily Report email that ERDDAP™ sends you when ERDDAP™ is finished starting up. It will have a list of datasets that didn't load (at the top) and the reason they didn't load (near the bottom).
    *   If you get stuck or have other questions, email the details to me: erd.data at noaa.gov.
    *   Programmers -- If you write Java programs that run ERDDAP™ code, you need to change some of the command line parameter references:
        *   Change joda-time-1.6.2.jar to joda-time.jar
        *   Change the Postgres JDBC .jar reference to postgresql.jdbc.jar
*   **Small Changes and Bug Fixes:**
    
    *   Improved connection handling to avoid hung threads.
    *   Improved concurrency practices to handle nearly simultaneous identical requests more efficiently.
    *   ERDDAP™ now uses netcdfAll-4.2.jar (renamed to netcdfAll-latest.jar). This switch necessitated several internal changes and caused a few small external changes, e.g., changes to how grib files are read and tiny changes to the .ncHeader output.
    *   New feature: \[erddap\]/convert/fipscounty.html converts FIPS county codes to/from county names.
    *   On maps, state boundaries are now dark violet, so they stand out better on all background colors.
    *   Tabular .kml output again uses a circular icon to mark points (not the airplane icon Google recently switched to).
    *   The erdCalcofi datasets were rearranged and are now served from local files (faster).
    *   GenerateDatasetsXml fromThreddsCatalog now creates a results file:  
        \[tomcat\]/webapps/erddap/WEB-INF/temp/EDDGridFromThreddsCatalog.xml . Thanks to Kevin O'Brien.
    *   GenerateDatasetsXml fromThreddsCatalog now tries to remove unnecessary port numbers from the source URLs (e.g., :8080 and :8081 can sometimes be removed). Thanks to NOAA central's security team.
    *   For .subset web pages, the Map of Distinct Data now has a variable lat lon range.
    *   Several lists in ERDDAP™ (e.g., the table which shows all of the datasets) were sorted so that A..Z sorted before a..z. Now they sort in a case-insensitive way.
    *   Small changes to the .subset web pages, including: units are now indicated.
    *   GenerateDatasetsXml and DasDds no longer throw an exception if unable to put the results on the system clipboard or displayInBrowser. Thanks to Eric Bridger and Greg Williams.
    *   Bug fix: When datasets are loaded, ERDDAP™ now removes or adjusts the geospatial global attributes. Thanks to Charles Carleton.
    *   Bug fix: String2.getClassPath() now properly percent-decodes the classPath (notably, on Windows, spaces in the filename appeared as %20). This affected ERDDAP™ EDStatic calling SSR.getContextDirectory() and finding content/erddap. Thanks to Abe Coughlin.
    *   Bug fix: in EDDTableFromFiles related to getDataForDapQuery handling of distinct() requests. Thanks to Eric Bridger.
    *   Bug fix: tabledap requests didn't properly handle altitude constraints when the dataset's altitudeMetersPerSourceUnit was -1. Thanks to Eric Bridger.
    *   Bug fix: EDDTableFrom...Files datasets now correctly handle requests which include =NaN and !=NaN.
    
## Version 1.28 {#version-128}
(released 2010-08-27)

*   **New Features:** none.
*   **Things ERDDAP™ Administrators Need to Know and Do:** none.
*   **Bug Fix:** Fix a programming mistake (only in ver 1.26) that made ERDDAP™ very slow.  
     

## Version 1.26 {#version-126}
(released 2010-08-25)

*   **New Features:** none.
*   **Things ERDDAP™ Administrators Need to Know and Do:**
    *   From your \[tomcat\]/content/erddap/setup.xml,
        *   In &lt;legal>, on a new line below \[standardDataLicenses\], insert \[standardContact\]. \[standardContact\] refers to the &lt;adminEmail> specified higher up in setup.xml.
        *   Remove &lt;tableCommonBGColor> and &lt;tableHighlightBGColor>.
        *   Recommended: Change &lt;endBodyHtml> to 
```
            <endBodyHtml><!\[CDATA\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \]\]></endBodyHtml>
```

    *   Required: To your \[tomcat\]/content/erddap/images/erddap.css and erddapAlt.css, add at the bottom:  
```
        /\* This is used on the /info/\[datasetID\]/index.html pages to highlight a row or cell. \*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*   **Bug Fixes and Small Changes:**
    
    *   Bug fix: in some situations, forms didn't work in some versions of Internet Explorer. Thanks very much to Greg Williams.
    *   Bug fix: The Make A Graph buttons didn't work if the dataset was from a remote ERDDAP.
    *   Bug fix: WMS sometimes didn't work if the dataset was from a remote ERDDAP.
    *   Many small changes and bug fixes.
    

## Version 1.24 {#version-124}
(released 2010-08-06)

*   **New Features:**
    *   New [Subset web pages](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) use faceted search to select subsets of tabular datasets. Thanks to POST.
    *   New [Advanced Search](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) combines all of the other search options and adds longitude, latitude, and time bounding boxes. Thanks to Ellyn Montgomery. (Sorry for the delay.)
    *   New [Convert Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) web page and service let you convert numeric times to/from ISO string times.
    *   New [Convert Units](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) web page and service let you convert UDUNITS to/from UCUM units. Thanks to NOAA IOOS SOS.
    *   If a tabledap request includes &units("UCUM"), the units names will be converted from original names (usually UDUNITS) to [UCUM](https://unitsofmeasure.org/ucum.html) units names. This only affects units \*names\*, not data values. Thanks to NOAA IOOS SOS.
    *   Improvements to Make A Graph web pages and graphs and maps:
        *   If the graph is a map, there are new Make A Graph buttons to zoom in/out and a new option to click to change the map's center point. Thanks to POST.
        *   Filter settings added near the bottom. Thanks to Greg Williams.
        *   The built in coastline data files were updated to GSHHS v2.0. Thanks to POST.
        *   Maps now include lakes and rivers. Thanks to POST. (Sorry, the Sacramento River Delta is missing because neither the coastline data nor the lake/river dataset deals with it.)
        *   The built in pscoast-derived nation/state files were updated. Thanks to POST.
        *   Topography.cpt was modified slightly. (Sorry if this adversely affects you.) Thanks to POST.
        *   In griddap's Make A Graph, if a user changes a variable, the form is automatically resubmitted so that the axisVariables' showStartAndStop always reflects the graph variables. Thanks to Joaquin Trinanes.
        *   For png and pdf image URLs:
            *   New &.land=_value_, where _value_ can be "under" (show topography) or "over" (just show bathymetry). If not specified, the default is set by [drawLandMask](/docs/server-admin/datasets#global-drawlandmask) in datasets.xml or setup.xml. Thanks to POST.
            *   New: lines in the legend that are too long are automatically broken into multiple lines. Thanks to POST.
        *   For png image URLs:
            *   New &.legend=_value_, where _value_ can be "Bottom" (default), "Off" or "Only". This lets you include the legend, exclude the legend, or get only the legend. Thanks to Cara Wilson.
            *   New &.trim=_nPixels_ leaves a border of nPixels (e.g., 10) at the bottom of the image. It is applied after .legend=Off. Thanks to Cara Wilson.
            *   New &.size=_width_|_height_ lets you specify the width and height for the image, in pixels.
    *   New output file formats:
        *   .csvp and .tsvp -- like .csv and .tsv, but with "(_units_)" appended to column names on the first line.
        *   .odvTxt -- makes a .txt file that simplifies getting data into [Ocean Data View (ODV)](https://odv.awi.de/).
        *   .esriCsv -- makes a .csv file suitable for import in ESRI's ArcGIS. (tabular datasets only)Thanks to Jan Mason, Jeff de La Beaujardiere, and NOAA IOOS SOS project.
    *   GUI improvements to the [Categorize](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) web pages. Also, the categorize values (other than institution) are now all lowercase. Non-lowercase requests are accepted (redirected) for backwards compatibility. Thanks to Roy Mendelssohn.
    *   Error messages are now even shorter and more oriented to users. Thanks to Greg Williams.
    *   An internal change which greatly reduces ERDDAP's base memory usage.
    *   Many new features which are only relevant to the POST project.
*   **Things ERDDAP™ Administrators Need to Know and Do:** There are lots of changes. Sorry. But each one brings some nice benefits.
    *   Big changes to GenerateDatasetXml -- it now often asks more questions (see the relevant [datasetTypes](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) information) and now always generates essentially ready-to-use content for datasets.xml. You are still responsible for the setup, so you should still review the datasets.xml content before using it. A human putting effort into the project will always do better than a computer program. Thanks to the UAF project.
    *   REQUIRED: In setup.xml, you must revise the WMS section. It should now include these tags (but feel free to change the values):
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \[standardParts\] with your own HTML. -->
        <legal><!\[CDATA\[
        \[standardDisclaimerOfEndorsement\]
        \[standardDisclaimerOfExternalLinks\]
        \[standardPrivacyPolicy\]
        \[standardDataLicenses\]
        \]\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\_standard>UDUNITS</units\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    *   REQUIRED: In setup.xml, copy and paste this new suggested &lt;startHeadHtml> to replace your old version. But feel free to make changes for your preferences.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \[baseUrl\]/erddap (or \[baseUttpsUrl\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \[tomcat\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\[fileName\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \[tomcat\]/content/erddap/images. 
        
        \*\*\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \*\*\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \[tomcat\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \*all\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\[CDATA\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \]\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

        Thanks to POST, Hans Vedo, and Rick Blair.
    *   REQUIRED: In setup.xml, in &lt;startBodyHtml>, change the &lt;body> tag to be just &lt;body>, since the style is now set by erddap.css.
    *   REQUIRED: In setup.xml, change to this &lt;endBodyHtml> (but change the email address to your email address and feel free to make other changes):
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \[baseUrl\]/erddap (or \[baseUttpsUrl\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \[tomcat\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\[fileName\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\[CDATA\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \]\]></endBodyHtml>
```

    *   HIGHLY RECOMMENDED: In setup.xml, the recommended &lt;theShortDescriptionHtml> is now
```
        <theShortDescriptionHtml><!\[CDATA\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \[standardShortDescriptionHtml\]
        \]\]></theShortDescriptionHtml>
```

        Feel free to change this, particularly the last sentence in the first paragraph.
    *   In setup.xml, emailEverythingTo and emailDailyReportTo can now be comma-separated lists of email addresses. The first emailEverythingTo is special, e.g., subscriptions to EDDXxxxFromErddap datasets use that email address. Thanks to John Maurer.
    *   Email errors are now logged to the \[bigParentDirectory\]/logs/emailLogYYYY-MM-DD.txt file.
    *   In setup.xml, there is a new, optional parameter to set email account properties (usually right after &lt;emailPassword>):  
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

        The default is nothing. Thanks to Rich Signell.
    *   REQUIRED: If you use EDDTableCopy or EDDGridCopy, you must DELETE all \[bigParentDirectory\]/copy/ directories and files that contain "xh" in the directory or filenames after stopping the old ERDDAP™ and before starting the new ERDDAP™ so those files will be re-copied. I'm very sorry, but it was important to make the change and hopefully it affects few admins and few files.  
        In Linux, you can find these files with,  cd \[bigParentDirectory\]/copy  
          find . \*xh\*  
        In Windows, you can find these files with,  Start | Search  
           What do you want to search for: Documents  
            All or part of the filename: xh  
            Look in: Browse -> \[bigParentDirectory\]/copy  
            Click on 'Search'  
             ^A to select them all  
             Del to delete them all
    *   REQUIRED: In datasets.xml, for EDDTableFromDatabase datasets, for date and timestamp variables, change the dataType to double and the units to seconds since 1970-01-01T00:00:00Z. We REQUIRE that you store timestamp data in the database \*with\* a timezone. Without timezone information, the queries that ERDDAP™ sends to the database and the results that ERDDAP™ gets from the database via JDBC are ambiguous and are likely to be wrong. We tried, but found no reliable way to deal with "timestamp without timezone" data. We think this is good practice anyway. After all, "timestamp without timezone" data has an implied timezone. While it is great that the time zone is obvious to the database admin, it makes sense to specify it explicitly so that other software can properly interact with your database. Thanks/sorry Michael Urzen.
    *   HIGHLY RECOMMENDED: In datasets.xml, to enable .subset web pages for faceted search of your tabular datasets, you need to add [&lt;subsetVariables>](/docs/server-admin/datasets#subsetvariables) to the dataset's global attributes.
    *   RECOMMENDED: In datasets.xml, if you have the dataset with datasetID="pmelGtsppp", please change it to be  
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    *   RECOMMENDED: In datasets.xml, there are new valid options for the [&lt;cdm\_data\_type&gt;](/docs/server-admin/datasets#cdm_data_type) global attribute, so you should review/change the value for your datasets.
    *   In datasets.xml, the new [&lt;sourceNeedsExpandedFP\_EQ&gt;](/docs/server-admin/datasets#sourceneedsexpandedfp_eq) is helpful if the source server doesn't consistently handle &_variable_\=_value_ tests correctly (because of the [general difficulty of testing the equality of floating point numbers](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)). sourceNeedsExpandedFP\_EQ is set to true by default (the safest setting), so you don't need to make any changes.
    *   New [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Thanks to Jerry Yun Pan.
    *   New [EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Thanks to Roy Mendelssohn.
    *   Changes to [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) lets it be used with a wider range of files.
    *   EDDTableFromBMDE has been disabled. There are no longer any active, appropriate, data sources.
    *   In GenerateDatasetXml, the new EDDGridFromThreddsCatalog harvests an entire THREDDS catalog (or a subset) and generates datasets.xml content. Thanks to the UAF project.
    *   GenerateDatasetsXml and DasDds now also put their results in \[bigParentDirectory\]/logs/log.txt. Thanks to Rich Signell and Charles Carleton.
    *   Many improvements to the login system. Thanks to POST.
*   **Things ERDDAP™ Programmers Need to Know and Do:**
    *   There have been changes in the /WEB-INF/lib/ directory. Please change your javac and java classpath settings accordingly.
    *   There is a new \[yourUrl\]/erddap/version service to determine the version of an ERDDAP. The response is text, e.g., ERDDAP\_version=1.24 If you get an HTTP 404 Not-Found error message, treat the ERDDAP™ as version 1.22 or lower. Thanks to POST.
*   **Small Changes and Bug Fixes:**
    
    *   EDDTableFromSos changes:
        *   Dropped support for reading IOOS SOS XML responses.
        *   Added support for reading IOOS SOS text/csv. (So NOS SOS servers currently aren't supported.)
        *   Made lots of changes related to IOOS SOS server details.
        *   Added support for BBOX queries for IOOS SOS and OOSTethys SOS servers.These changes result in a big speed up for relevant data requests. Thanks to IOOS SOS.
    *   Text in .mat tabular data files is now saved correctly. Thanks to Roy Mendelssohn.
    *   WMS
        *   OpenLayers is now bundled with ERDDAP™ for use on the WMS web pages. This fixes the problem caused when OpenLayers changed a few months ago and prevents future problems.
        *   In the WMS GetCapabilities response, the &lt;OnlineResource> value is now the URL of the WMS service. Thanks to Charlton Galvarino.
        *   A legend is displayed on the WMS web page to show the colorbar. Thanks to Emilio Mayorga.
    *   EDDGridAggregateExistingDimension constructor had problems if an axis' sourceValues weren't equal to their destinationValues, e.g., if source time was something other than "seconds since 1970-01-01". Thanks to Todd Spindler.
    *   In TableWriterGeoJson, the excess ',' after bbox\[...\] has been removed. Thanks to Greg Williams.
    *   Many small changes and bug fixes.
    
## Version 1.22 {#version-122}
(released 2009-07-05)

*   The SlideSorter bug introduced in 1.20 is fixed.
*   The OBIS bug introduced in 1.20 is fixed.
*   The references to Jason datasets on the images/gadgets/GoogleGadgets page were removed.  
     
## Version 1.20 {#version-120}
(released 2009-07-02)

*   ERDDAP™ administrators, please add this to your setup.xml file:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

*   New dataset types [EDDGridCopy](/docs/server-admin/datasets#eddgridcopy) and [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) make and maintain a local copy of another EDDGrid or EDDTable dataset's data and serve data from the local copy. These are very easy to use and very effective **solutions to some of the biggest problems with serving data from remote data sources:**
    
    *   Accessing data from a remote data source can be slow (for a variety of reasons).
    *   The remote dataset is sometimes unavailable (again, for a variety of reasons).
    *   Relying on one source for the data doesn't scale well (e.g., when many users and many ERDDAPs utilize it).
    
    Plus, the local copy is a backup of the original, which is useful in case something happens to the original.
    
    There is nothing new about making a local copy of a dataset. What is new here is that these classes make it \*easy\* to create and \*maintain\* a local copy of data from a \*variety\* of types of remote data sources and \*add metadata\* while copying the data.
    
    These dataset types are part of a complete set of features that simplify the creation of [grids/clusters/federations of ERDDAPs](/docs/server-admin/scaling) to handle very heavy loads (e.g., in a data center).
    
*   New dataset type [EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) gets data from a local or remote database table.
*   ERDDAP™ now has a [security](/docs/server-admin/additional-information#security) system that supports authentication (letting users log in) and authorization (granting them access to certain private datasets).
*   There are [two, new, command-line tools](/docs/server-admin/datasets#tools) to help ERDDAP™ administrators generate the XML for a new dataset in datasets.xml:
    *   GenerateDatasetsXml can generate a rough draft of the dataset XML for almost any type of datasets.
    *   DasDds helps you repeatedly test and refine the XML for a dataset.ERDDAP's GenerateDatasetsXml web pages have been removed. For security reasons, they only supported a few dataset types. The new command line tools are a better solution.
*   The new [status page](/docs/server-admin/additional-information#status-page) lets anyone (but notably administrators) view the status of an ERDDAP™ from any browser by going to \[baseUrl\]/erddap/status.html .
*   Tabledap now supports [server-side functions](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    *   &distinct() removes duplicate rows from the response table,
    *   &orderBy(...) lets you specify how the response table should be sorted,
    *   &orderByMax(...) lets you specify how the response table should be sorted and removes all rows except for the rows with the maximum values in the last specified column. This can be used, for example, to get the last available data for each station.
*   Tabular datasets can now include additional dateTime variables which aren't named "time". These variables are recognized by their "units" metadata, which must contain " since " (for numeric dateTimes) or "yy" or "YY" (for formatted String dateTimes). But please still use the destinationName "time" for the main dateTime variable.
*   ERDDAP™ now generates a [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) file, which tells search engines that your ERDDAP only needs to be crawled every month. ERDDAP™ administrators, please follow [these instructions](/docs/server-admin/additional-information#sitemapxml) to notify the search engines about the new sitemap.xml file.
*   ERDDAP's error messages are now much shorter and geared to clients (not programmers). Thanks to Greg Williams.
*   [&lt;requestBlacklist>](/docs/server-admin/datasets#requestblacklist) now also supports IP addresses where the last number has been replaced by \*.
*   Requests for .json and .geoJson files may now include an optional [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) request by adding "&.jsonp=_functionName_" to the end of the query. Basically, this just tells ERDDAP™ to add "_functionName_(" to the beginning of the response and ")" to the end of the response. If originally there was no query, leave off the "&" in your query. Thanks to Greg Williams.
*   Lots of new statistics were added to the [Daily Report](/docs/server-admin/additional-information#daily-report).
*   On web pages with lists of datasets, institution and id are now at the far right. This moves subscription and other more useful columns into view on narrow computer screens.
*   On all web pages, the page's title (based on the &lt;title> in the &lt;startHeadHtml> that you define in setup.xml) is modified to include a better description of the web page (for example, by including the current dataset's title and institution).
*   Xmx information is now included with the memory information printed in log.txt, the Daily Report, and on status.html. Thanks to Ellyn Montgomery.
*   ERDDAP™ has additional, general-purpose protection against all errors (e.g., OutOfMemoryError). Thanks to Charles Carleton.
*   Improvements to error handling if the response has already been committed.
*   IMPROVED: EDDTableFromFiles and EDDGridFromFiles now just allow &lt;metadataFrom> first or last. penultimate is no longer supported. And first and last are now based on the files' lastModifiedTime.
*   Bug fix: in EDDTableFromSOS, invalid info for one station threw an exception and caused the whole dataset to be rejected. Now, those stations are just ignored (and the error message is logged to log.txt). Thanks to Rick Blair.  
     

## Version 1.18 {#version-118}
(released 2009-04-08)

*   Bug fix: Starting in 1.14, the EDDTable Data Access Form and Make A Graph web page didn't properly deal with quoted constraints.
*   Bug fix: Starting in 1.14, EDDTableFromDapSequence didn't handle time constraints correctly if the source time units weren't "seconds since 1970-01-01T00:00:00".  
     

## Version 1.16 {#version-116}
(released 2009-03-26)

*   ERDDAP™ administrators:
    *   This is an important release because it fixes a bug that left an ERDDAP™ thread running if you used Tomcat Manager to Stop/Start or Reload ERDDAP. So when you install 1.16, don't just use Tomcat manager to undeploy the old ERDDAP™ and deploy the new ERDDAP. Instead: **undeploy the old ERDDAP™, restart Tomcat (or the server), then deploy the new ERDDAP.** It's always a good idea to do that when installing a new version.
    *   Please add [&lt;requestBlacklist>&lt;/requestBlacklist>](/docs/server-admin/datasets#requestblacklist) to your datasets.xml. This can be used to specify a list of client IP addresses to be blocked (e.g., to fend off a Denial of Service attack or an overly zealous web robot).
*   There is now a \[bigParentDirectory\]/logs directory to hold the ERDDAP™ log files. When you start ERDDAP™, it makes an archive copy of the log.txt and log.txt.previous files with a time stamp. If there was trouble before the restart, it may be useful to analyze these files.
*   ERD's ERDDAP™ now has the subscription system turned on.
*   ERDDAP™ once again allows (but still doesn't recommend) the "%26" encoding of "&" in request URLs (see the [related v1.14 change](#percent26)).
*   Several new additions to the Tally section of the [Daily Report](/docs/server-admin/additional-information#daily-report).
*   Small bug fixes in generateDatasetsXml.
*   A few small bug fixes.  
     

## Version 1.14 {#version-114}
(released 2009-03-17)

*   Changes for users:
    *   In grid data requests, ERDDAP™ now supports: [last-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) where n is an integer number of indices and [(last-d)](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) where d is a numeric value (for time, it is in seconds).
    *   In tabular data requests, String constraints now require [double quotes](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) around the value, for example, &id="NDBC40121" This is required by the DAP protocol.
    *   In tabular data requests, ERDDAP™ now requires that [all constraints be properly percent encoded](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Browsers do this automatically, so this mostly affects computer programs/scripts that are accessing ERDDAP.
#### Percent26 {#percent26}
*   [Previously,](#percent26) the [embed a graph web page](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) and the [ERDDAP™ Google Gadget web page](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) said to replace the "&" in the image's URL with "%26". From now on, you should replace the "&" in the image's URL with "&amp;". So you need to replace any "%26" in existing web pages and Google Gadgets with "&amp;". (Sorry)
*   ERDDAP™ administrators, please:
    *   Add the following to your [setup.xml](/docs/server-admin/deploy-install#setupxml) file (and change the flagKeyKey value):
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \*\*\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \[bigParentDirectory\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    *   On the line after &lt;emailUserName> in your [setup.xml](/docs/server-admin/deploy-install#setupxml) file, add  
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
        and enter your real password.
    *   You can change &lt;wmsSampleBBox> in your [setup.xml](/docs/server-admin/deploy-install#setupxml) file to include longitude values up to 360, e.g.,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    *   In your datasets.xml file, rename the dataset type EDDTableFromNc4DFiles to EDDTableFromNcFiles (which now supports files with any number of dimensions). If you had an EDDTableFromNc4DFiles dataset:
        
        1.  You MUST change to type="EDDTableFromNcFiles" in your datasets.XML file.
        2.  You MUST add a &lt;nDimensions>4&lt;/nDimensions> tag to the dataset's XML.
        3.  You may add the new &lt;sortFilesBySourceNames> tag to specify the internal order for the files, which determines the overall order of the data returned.
        
        For details, see [EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    *   In the past, for EDDTableFromDapSequence, for OPeNDAP DRDS servers, in datasets.xml, we used &lt;sourceCanConstrainStringsRegex>~=&lt;/sourceCanConstrainStringRegex>. But we now see that the DRDS regex support is more limited than ERDDAP's, so we recommend &lt;sourceCanConstrainStringsRegex>&lt;/sourceCanConstrainStringRegex> so that regex constraints are not passed to the source, but are instead handled by ERDDAP.
    *   Revamped handling of sourceCanConstrain... in datasets.xml by [EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) and (internally) all EDDTable dataset types. The new system is simpler and better reflects the variability of different data sources. You may need to modify the XML for your datasets in datasets.xml.
*   There are several new features which are useful by themselves, but when combined, also facilitate the creation of [grids/clusters/federations of ERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    *   New dataset types:
        *   [EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap) and [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) which let one ERDDAP™ include a dataset from another ERDDAP™ in a very simple and very efficient way.
        *   [EDDGridFromFiles](/docs/server-admin/datasets#eddgridfromfiles) (and its subclass, [EDDGridFromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) which can read NetCDF .nc, GRIB .grb, and HDF .hdf files).
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) which can read NetCDF .nc which have a table-like structure.
    *   RunLoadDatasets and LoadDatasets were revamped so that ERDDAP™ is very responsive to reloading datasets based on files in the [flag](/docs/server-admin/additional-information#flag) directory (often &lt;5 seconds if main loadDatasets is currently done).
    *   New service to allow [a URL to create a flag file](/docs/server-admin/additional-information#set-dataset-flag) for a given dataset, e.g.,  
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
        creates a flag file in the flag directory for rPmelTao (although the flagKey here is wrong).
    *   New [subscription](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) service so that any client can specify an action which will be done when a specific dataset is created (when ERDDAP™ is restarted) and whenever the dataset changes in any way. This system can be disabled via &lt;subscriptionSystemActive> in your [setup.xml](/docs/server-admin/deploy-install#setupxml) file. The ERDDAP™ [Daily Report](/docs/server-admin/additional-information#daily-report) now lists all of the subscriptions and includes the URL needed to cancel each one, in case you feel the system is being abused. In datasets.xml, there is a new, optional [&lt;subscriptionEmailBlacklist>](/docs/server-admin/datasets#subscriptionemailblacklist) tag so that administrators can specify a comma-separated list of email addresses which are immediately blacklisted from the subscription system.
    *   New [&lt;onChange>](/docs/server-admin/datasets#onchange) attribute in datasets.xml lets the ERDDAP™ administrator specify an action which will be done when a specific dataset is created (when ERDDAP™ is restarted) and whenever the dataset changes in any way.
    *   Improvements to full text search: storing the search string for each dataset now uses 1/2 the memory. The search algorithm (Boyer-Moore-like) is now 3X faster.
    *   Emails from ERDDAP™ now always prepend the subject and content with \[erddapUrl\], so that it will be clear which ERDDAP™ this came from (in case you administer multiple ERDDAPs).
    *   More extensive statistics gathering for the [Daily Report](/docs/server-admin/additional-information#daily-report) email.
    *   New log file \[bigParentDirectory\]/emailLogYEAR-MM-DD.txt logs all emails sent by ERDDAP™ each day. This is especially useful if your server can't actually send emails -- you can at least read them in the log.
    *   ERDDAP™ now makes a \[bigParentDirectory\]/cache/(datasetID) directory for each dataset since there may be lots of files cached.
*   New [RSS 2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) feed for each dataset (look for the orange RSS icons on lists of datasets, Data Access Forms, and Make A Graph web pages).
*   EDDGrid .kml responses now use tiled images ("superoverlays" -- dynamically generated quadtree images). The initial image loads into GoogleEarth much faster than before. The resolution of the map increases as you zoom in, up to the full resolution of the dataset. Recommend: users should request .kml for one time point, but the dataset's entire longitude,latitude range. Unfortunately, support for time ranges was removed (I hope it will come back).
*   ERDDAP™ now adds [Expires and Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) to all files requested from the /images directory. This greatly reduces the number of static file requests sent to ERDDAP and thus greatly speeds up most ERDDAP™ page loads. Also, many JavaScript file references moved to the bottom of their HTML pages, which also speeds up many ERDDAP™ page loads. Thanks to the book "High Performance Web Sites" by Steve Souders and the ySlow addition to the FireBug plugin in FireFox.
*   ERDDAP™ switched from netcdf-java 2.2.22 to netcdf-java 4.0. Among other things, this allows EDDGridFromNcFiles to read HDF .hdf, as well as GRIB .grb and NetCDF .nc files.
*   EDDGridFromDap and EDDGridFromNcFiles now also support DArray (as well as DGrid) dataVariables. If a dimension doesn't have a corresponding coordinate variable, ERDDAP™ creates an axis variable with the index values (e.g., 0, 1, 2, ..., 311, 312). So all other aspects of EDDGrid remain the same:  
    \* It still serves all datasets as Grids, with an axis variable for each dimension.  
    \* Queries can still request values from the axis variables.  
    Thanks to Charles Carleton, Thomas Im, Dorian Raymer, and others.
*   The WMS OpenLayers pages now have a default longitude,latitude range that is a little larger than the dataset's range (not the exact range, so the context of small datasets is more obvious). The default range may now also be 0 to 360, which allows the full range of many datasets to be shown now. Thanks to Todd Spindler.
*   New sliders on some Data Access Forms and Make A Graph web pages. They simplify (crude) specification of the desired data and offer good visual feedback.
*   A new option for the &lt;dataset> tags in datasets.xml: [active="false"](/docs/server-admin/datasets#active).
*   References to ERD's ERDDAP™ changed from coastwatch.pfel (still works via proxy) to coastwatch.pfeg (preferred).
*   New support for [data\_min and data\_max](/docs/server-admin/datasets#data_min-and-data_max) variable metadata attributes.
*   A partial solution to the [WaitThenTryAgain / Partial Results Exception](/docs/server-admin/additional-information#waitthentryagain-exception): Now, some requests that previously failed when a data source change was detected will succeed because ERDDAP™ will reload the dataset and re-request the data automatically, all in the context of the original request.
*   Bug fix: generateDatasetsXml was disabled in ERDDAP™ version 1.12. Thanks to Ellyn Montgomery for pointing this out.
*   Small changes to error handling.
*   Many improvements to avoid/deal with possible race conditions (i.e., possible problems arising from the multi-threaded nature of ERDDAP) which caused small, infrequent problems.
*   Now, if an error message is written on an image, the image will only stay in the cache for ~5-10 minutes (not 60). Thanks to Cara Wilson.
*   The standard message when there is no data is now "Your query produced no matching results.", which is shorter, more accurate, and matches OPeNDAP servers.
*   EDDGrid no longer allows tied axis values.
*   Small changes to .ver and .help requests.
*   Many small changes and bug fixes.  
     

## Version 1.12 {#version-112}
(released 2008-10-31)

*   EDDTableFromSOS once again works with NDBC SOS and works with the new NOS SOS.
*   EDDTableFromBMDE now requires ERDDAP™ admin to specify dataVariables.
*   EDDGrid no longer requires that lat and lon be evenly spaced for .transparentPng or .kml. Thanks to Todd Spindler.
*   A few small changes.  
     

## Version 1.10 {#version-110}
(released 2008-10-14)

*   New "colorBar" metadata for data variables in datasets.xml defines the default color bar settings for graphs and maps. See [more information](/docs/server-admin/datasets#color-bar-attributes). This is important because it greatly improves the appearance of the default graphs and maps produced by Make A Graph and because the default graphs and maps now have a consistent color bar even when the client changes the requested time or geographic range. Also, this was necessary for WMS.
*   ERDDAP™ now serves most grid data via a WMS service. This is important because it shows that, in addition to getting data from many types of data servers, ERDDAP™ can distribute data via different protocols (DAP, WMS, ... more in future). See the [client documentation](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Or the [documentation for administrators](/docs/server-admin/datasets#wms). Or [try it out](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
*   New support for longitude values >180 in .kml files.
*   New cdm\_data\_type: Other .
*   ERDDAP™ now supports "boolean" source dataType. See [more information](/docs/server-admin/datasets#boolean-data) This will become useful for the future EDDTableFromDatabase.
*   New EDDTableFromBMDE supports DiGIR/BMDE data sources.
*   EDVGridAxis now allows descending sorted values. The pmelOscar datasets needed this.
*   ERDDAP™ now returns HTTP errors (e.g., "404 for resource/page not found") in more situations, instead of HTML pages with error messages.
*   Lots of changes/additions to the ERDDAP™ documentation.
*   Lots of small changes.
*   Some bug fixes.
*   **Things ERDDAP™ administrators should do to upgrade to this version:**
    *   In datasets.xml, for any EDDTableFromSOS datasets, change "observedProperty" metadata to "sourceObservedProperty".
    *   The rules for an axisVariable or dataVariable's destinationName are now [stricter](/docs/server-admin/datasets#datavariable-addattributes). You need to check that your variable names are valid. Either check them by hand, or run ERDDAP™ and look at the error messages in the report that is emailed to the administrator.
    *   In datasets.xml, if you want a grid data variable to be accessible via WMS, you need to add colorBar metadata. At least, for example,  &lt;att name="colorBarMinimum" type="double">0&lt;/att>
```
          <att name="colorBarMaximum" type="double">32</att>  
```
        See [more information](/docs/server-admin/datasets#wms).
    *   Add the following to your [setup.xml](/docs/server-admin/deploy-install#setupxml) file (but customize it with your information):

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Version 1.08 {#version-108}
(released 2008-07-13)

*   A new web service in ERDDAP™, generateDatasetsXml, assists ERDDAP™ administrators by creating a rough draft of the XML needed to describe a dataset in datasets.xml
*   Some changes/bug fixes related to allowing griddap to be seen by netcdf-java as an opendap server, including: global metadata is now labeled "NC\_GLOBAL" (instead of "GLOBAL").
*   The EDDGrid and EDDTable Data Access Forms now utilize query information in the URL. So, for example, if a user goes from a Make A Graph form to a Data Access Form, the constraints are now properly transferred.
*   tabledap's Make A Graph now allows constraints on String variables.
*   EDDTable's Make A Graph now allows NaN constraints. Thanks to Steve Hankin.
*   Bug fix: EDDTable saveAsImage didn't properly recognize the .colorbar min and max values. Thanks to Steve Hankin
*   Many improvements to setupDatasetsXml. Thanks to Ellyn Montgomery.
*   Griddap requests now allow ()-style requests slightly outside of the actual axis range. This is appropriate since ()-values are rounded to the nearest actual value. Thanks to Cindy Bessey
*   I made the FloatArray and DoubleArray test of isEvenlySpaced more sophisticated. It will always be imperfect (because the test would need to be customized for each dataset), but it should be better. Thanks to Ellyn Montgomery.
*   I moved setup.html and setupDatasetsXml.html erddap's /download directory and hard coded all links to them. Now, I can make changes and update the setup information immediately.
*   Many small changes. A few small bug fixes.
*   **Things ERDDAP™ administrators should do to upgrade to this version:**
    *   Move &lt;theShortDescriptionHtml> from your messages.xml to your [setup.xml](/docs/server-admin/deploy-install#setupxml) file. It specifies the text that appears in the middle of the left side of the ERDDAP™ home page. Also, add &lt;h1>ERDDAP&lt;/h1> (or some other headline) to the top of it. **Or,** copy &lt;theShortDescriptionHtml> in the new [setup.xml](/docs/server-admin/deploy-install#setupxml) file (from the new erddapContent.zip) into your setup.xml.  
         

## Version 1.06 {#version-106}
(released 2008-06-20)

*   New support for IOOS DIF SOS data sources.
*   Many small changes. A few small bug fixes.  
     

## Version 1.04 {#version-104}
(released 2008-06-10)

*   New Slide Sorter feature.
*   New Google Gadgets page and examples.
*   Bug fix in EDDGrid.saveAsNc for variable with scale and addOffset.  
     

## Version 1.02 {#version-102}
(released 2008-05-26)

*   New EDDGridSideBySide allows for different axisVariables\[0\] sourceValues.
*   All of the currents and winds datasets were merged into EDDGridSideBySide datasets.
*   Images from image requests are now cached for 1 hour.  
     

## Version 1.00 {#version-100}
(released 2008-05-06)

*   Make A Graph web pages and graphics commands in URLs.
*   Support for flag files to force reloading a dataset.
*   New dataset type: EDDTableFrom4DFiles (the first subclass of EDDTableFromFiles).
