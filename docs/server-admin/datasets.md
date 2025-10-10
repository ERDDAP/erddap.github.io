---
sidebar_position: 3
---
# Working with the datasets.xml File

\[This web page will only be of interest to ERDDAP™ administrators.\]

After you have followed the ERDDAP™ [installation instructions](/docs/server-admin/deploy-install), you must edit the datasets.xml file in *tomcat*/content/erddap/ to describe the datasets that your ERDDAP™ installation will serve.

You can see an example [datasets.xml on GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- - -

## [Introduction](#introduction) {#introduction}

### Some Assembly Required {#some-assembly-required}
Setting up a dataset in ERDDAP™ isn't just a matter of pointing to the dataset's directory or URL. You have to write a chunk of XML for datasets.xml which describes the dataset.

*   For gridded datasets, in order to make the dataset conform to ERDDAP's data structure for gridded data, you have to identify a subset of the dataset's variables which share the same dimensions. ([Why?](#why-just-two-basic-data-structures) [How?](#dimensions))
*   The dataset's current metadata is imported automatically. But if you want to modify that metadata or add other metadata, you have to specify it in datasets.xml. And ERDDAP™ needs other metadata, including [global attributes](#global-attributes) (such as infoUrl, institution, sourceUrl, summary, and title) and [variable attributes](#variable-addattributes) (such as long\_name and units). Just as the metadata that is currently in the dataset adds descriptive information to the dataset, the metadata requested by ERDDAP™ adds descriptive information to the dataset. The additional metadata is a good addition to your dataset and helps ERDDAP™ do a better job of presenting your data to users who aren't familiar with it.
*   ERDDAP™ needs you to do special things with the [longitude, latitude, altitude (or depth), and time variables](#destinationname).

If you buy into these ideas and expend the effort to create the XML for datasets.xml, you get all the advantages of ERDDAP™, including:

*   Full text search for datasets
*   Search for datasets by category
*   Data Access Forms (*datasetID*.html) so you can request a subset of data in lots of different file formats
*   Forms to request graphs and maps (*datasetID*.graph)
*   Web Map Service (WMS) for gridded datasets
*   RESTful access to your data

Making the datasets.xml takes considerable effort for the first few datasets, but **it gets easier**. After the first dataset, you can often re-use a lot of your work for the next dataset. Fortunately, ERDDAP™ comes with two [Tools](#tools) to help you create the XML for each dataset in datasets.xml.  
If you get stuck, see our [section on getting additional support](/docs/intro#support).

### Data Provider Form {#data-provider-form}
When a data provider comes to you hoping to add some data to your ERDDAP, it can be difficult and time consuming to collect all of the metadata (information about the dataset) needed to add the dataset into ERDDAP. Many data sources (for example, .csv files, Excel files, databases) have no internal metadata, so ERDDAP™ has a Data Provider Form which gathers metadata from the data provider and gives the data provider some other guidance, including extensive guidance for [Data In Databases](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). The information submitted is converted into the datasets.xml format and then emailed to the ERDDAP™ administrator (you) and written (appended) to *bigParentDirectory*/logs/dataProviderForm.log . Thus, the form semi-automates the process of getting a dataset into ERDDAP, but the ERDDAP™ administrator still has to complete the datasets.xml chunk and deal with getting the data file(s) from the provider or connecting to the database.

The submission of actual data files from external sources is a huge security risk, so ERDDAP™ does not deal with that. You have to figure out a solution that works for you and the data provider, for example, email (for small files), pull from the cloud (for example, DropBox or Google Drive), an sftp site (with passwords), or sneakerNet (a USB thumb drive or external hard drive). You should probably only accept files from people you know. You will need to scan the files for viruses and take other security precautions.

There isn't a link in ERDDAP™ to the Data Provider Form (for example, on the ERDDAP™ home page). Instead, when someone tells you they want to have their data served by your ERDDAP, you can send them an email saying something like:  
Yes, we can get your data into ERDDAP. To get started, please fill out the form at https://*yourUrl*/erddap/dataProviderForm.html (or http:// if https:// isn't enabled).  
After you finish, I'll contact you to work out the final details.  
If you just want to look at the form (without filling it out), you can see the form on ERD's ERDDAP: [Introduction](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html), [Part 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html), [Part 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html), [Part 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html), and [Part 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). These links on the ERD ERDDAP™ send information to me, not you, so don't submit information with them unless you actually want to add data to the ERD ERDDAP.

If you want to remove the Data Provider Form from your ERDDAP™, put  
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
in your setup.xml file.

The impetus for this was NOAA's 2014 [Public Access to Research Results (PARR) directive](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), which requires that all NOAA environmental data funded through taxpayer dollars be made available via a data service (not just files) within 12 months of creation. So there is increased interest in using ERDDAP™ to make datasets available via a service ASAP. We needed a more efficient way to deal with a large number of data providers.

Feedback/Suggestions? This form is new, so please email erd dot data at noaa dot gov if you have any feedback or suggestions for improving this.

### Tools {#tools}
ERDDAP™ comes with two command line programs which are tools to help you create the XML for each dataset that you want your ERDDAP™ to serve. Once you have set up ERDDAP™ and run it (at least one time), you can find and use these programs in the *tomcat*/webapps/erddap/WEB-INF directory. There are Linux/Unix shell scripts (with the extension .sh) and Windows scripts (with the extension .bat) for each program. \[On Linux, run these tools as the same user (tomcat?) that will run Tomcat.\] When you run each program, it will ask you questions. For each question, type a response, then press Enter. Or press ^C to exit a program at any time.

#### Program won't run? {#program-wont-run}

*   If you get an unknown program (or similar) error message, the problem is probably that the operating system couldn't find Java. You need to figure out where Java is on your computer, then edit the java reference in the .bat or .sh file that you are trying to use.
*   If you get a jar file not found or class not found error message, then Java couldn't find one of the classes listed in the .bat or .sh file you are trying to use. The solution is to figure out where that .jar file is, and edit the java reference to it in the .bat or .sh file.
*   If you are using a version of Java that is too old for a program, the program won't run and you will see an error message like  
    Exception in thread "main" java.lang.UnsupportedClassVersionError:  
    *some/class/name*: Unsupported major.minor version *someNumber*  
    The solution is to update to the most recent version of Java and make sure the .sh or .bat file for the program is using it.

#### The tools print various diagnostic messages: {#the-tools-print-various-diagnostic-messages}

*   The word "ERROR" is used when something went so wrong that the procedure failed to complete. Although it is annoying to get an error, the error forces you to deal with the problem.
*   The word "WARNING" is used when something went wrong, but the procedure was able to be completed. These are pretty rare.
*   Anything else is just an informative message. You can add \-verbose to the [GenerateDatasetsXml](#generatedatasetsxml) or [DasDds](#dasdds) command line to get additional informative messages, which sometimes helps solve problems.

The two tools are a big help, but you still must read all of these instructions on this page carefully and make important decisions yourself.

### GenerateDatasetsXml {#generatedatasetsxml}
*   **GenerateDatasetsXml**is a command line program that can generate a rough draft of the dataset XML for almost any type of dataset.
    
    We STRONGLY RECOMMEND that you use GenerateDatasetsXml instead of creating chunks of datasets.xml by hand because:
    
    *   GenerateDatasetsXml works in seconds. Doing this by hand is at least an hour's work, even when you know what you're doing.
    *   GenerateDatasetsXml does a better job. Doing this by hand requires extensive knowledge of how ERDDAP™ works. It is unlikely that you will do a better job by hand. (Bob Simons always uses GenerateDatasetsXml for the first draft, and he wrote ERDDAP.)
    *   GenerateDatasetsXml always generates a valid chunk of datasets.xml. Any chunk of datasets.xml that you write will probably have at least a few errors that prevent ERDDAP™ from loading the dataset. It often takes people hours to diagnose these problems. Don't waste your time. Let GenerateDatasetsXml do the hard work. Then you can refine the .xml by hand if you want.
    
    When you use the GenerateDatasetsXml program:
    
    *   On Windows, the first time you run GenerateDatasetsXml, you need to edit the GenerateDatasetsXml.bat file with a text editor to change the path to the java.exe file so that Windows can find Java.
    *   GenerateDatasetsXml first asks you to specify the EDDType (Erd Dap Dataset Type) of the dataset. See the [List of Dataset Types](#list-of-types-datasets) (in this document) to figure out which is type appropriate for the dataset you are working on. In addition to the regular EDDTypes, there are also a few [Special/Pseudo Dataset Types](#specialpseudo-dataset-types) (e.g., one which crawls a THREDDS catalog to generate a chunk of datasets.xml for each of the datasets in the catalog).
    *   GenerateDatasetsXml then asks you a series of questions specific to that EDDType. The questions gather the information needed for ERDDAP™ to access the dataset's source. To understand what ERDDAP™ is asking for, see the documentation for the EDDType that you specified by clicking on the same dataset type in the [List of Dataset Types](#list-of-types-datasets).
        
        If you need to enter a string with special characters (e.g., whitespace characters at the beginning or end, non-ASCII characters), enter a [JSON-style string](https://www.json.org/json-en.html) (with special characters escaped with \\ characters). For example, to enter just a tab character, enter "\\t" (with the surrounding double quotes, which tell ERDDAP™ that this is a JSON-style string.
        
    *   Often, one of your answers won't be what GenerateDatasetsXml needs. You can then try again, with revised answers to the questions, until GenerateDatasetsXml can successfully find and understand the source data.
    *   If you answer the questions correctly (or sufficiently correctly), GenerateDatasetsXml will connect to the dataset's source and gather basic information (for example, variable names and metadata).  
        For datasets that are from local NetCDF .nc and related files, GenerateDatasetsXml will often print the ncdump-like structure of the file after it first reads the file. This may give you information to answer the questions better on a subsequent loop through GenerateDatasetsXml.
    *   GenerateDatasetsXml will then generate a rough draft of the dataset XML for that dataset.
    *   Diagnostic information and the rough draft of the dataset XML will be written to *bigParentDirectory*/logs/GenerateDatasetsXml.log .
    *   The rough draft of the dataset XML will be written to *bigParentDirectory*/logs/GenerateDatasetsXml.out .
####  "0 files" Error Message {#0-files-error-message}
If you run GenerateDatasetsXml or [DasDds](#dasdds), or if you try to load an EDDGridFrom...Files or EDDTableFrom...Files dataset in ERDDAP™, and you get a "0 files" error message indicating that ERDDAP™ found 0 matching files in the directory (when you think that there are matching files in that directory):
*   Check that you have specified the full name of the directory. And if you specified the sample filename, make sure you specified the file's full name, including the full directory name.
*   Check that the files really are in that directory.
*   Check the spelling of the directory name.
*   Check the fileNameRegex. It's really, really easy to make mistakes with regexes. For test purposes, try the regex .\* which should match all filenames. (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)
*   Check that the user who is running the program (e.g., user=tomcat (?) for Tomcat/ERDDAP) has 'read' permission for those files.
*   In some operating systems (for example, SELinux) and depending on system settings, the user who ran the program must have 'read' permission for the whole chain of directories leading to the directory that has the files.


*   If you have problems that you can't solve, [request support](/docs/intro#support) with as much information as possible. Similarly, if it seems like the appropriate EDDType for a given dataset doesn't work with that dataset, or if there is no appropriate EDDType, please file an [issue on GitHub](https://github.com/ERDDAP/erddap/issues) with the details (and a sample file if relevant).  
         
#### You need to edit the output from GenerateDatasetsXml to make it better. {#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better}
         
*   DISCLAIMER:  
    THE CHUNK OF datasets.xml MADE BE GenerateDatasetsXml ISN'T PERFECT. YOU MUST READ AND EDIT THE XML BEFORE USING IT IN A PUBLIC ERDDAP. GenerateDatasetsXml RELIES ON A LOT OF RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT. YOU ARE RESPONSIBLE FOR ENSURING THE CORRECTNESS OF THE XML THAT YOU ADD TO ERDDAP'S datasets.xml FILE.
    
    (Fun Fact: I'm not shouting. For historical legal reasons, disclaimers must be written in all caps.)
    
    The output of GenerateDatasetsXml is a rough draft.  
    You will almost always need to edit it.  
    We've made and continue to make a huge effort to make the output as ready-to-go as possible, but there are limits. Often, needed information is simply not available from the source metadata.
    
    A fundamental problem is that we're asking a computer program (GenerateDatasetsXml) to do a task where, if you gave the same task to 100 people, you would get 100 different results. There is no single "right" answer. Obviously, the program comes closest to reading Bob's mind (not yours), but even so, it isn't an all-understanding AI program, just a bunch of heuristics cobbled together to do an AI-like task. (That day of an all-understanding AI program may come, but it hasn't yet. If/when it does, we humans may have bigger problems. Be careful what you wish for.)
    
*   For informational purposes, the output shows the global sourceAttributes and variable sourceAttributes as comments. ERDDAP™ combines sourceAttributes and addAttributes (which have precedence) to make the combinedAttributes that are shown to the user. (And other attributes are automatically added to longitude, latitude, altitude, depth, and time variables when ERDDAP™ actually makes the dataset).  
     
*   If you don't like a sourceAttribute, overwrite it by adding an addAttribute with the same name but a different value (or no value, if you want to remove it).  
     
*   All of the addAttributes are computer-generated suggestions. Edit them! If you don't like an addAttribute, change it.  
     
*   If you want to add other addAttributes, add them.  
     
*   If you want to change a destinationName, change it. But don't change sourceNames.  
     
*   You can change the order of the dataVariables or remove any of them.  


    *   You can then use [DasDds](#dasdds) (see below) to repeatedly test the XML for that dataset to ensure that the resulting dataset appears as you want it to in ERDDAP.
    *   Feel free to make small changes to the datasets.xml chunk that was generated, for example, supply a better infoUrl, summary, or title.
#### doNotAddStandardNames {#donotaddstandardnames}
If you include \-doNotAddStandardNames as a command line parameter when you run generateDatasetsXml, generateDatasetsXml will not add standard\_name to the addAttributes for any variables other than variables named latitude, longitude, altitude, depth or time (which have obvious standard\_names). This can be useful if you are using the output from generateDatasetsXml directly in ERDDAP™ without editing the output, because generateDatasetsXml often guesses standard\_names incorrectly. (Note that we always recommend that you do edit the output before using it in ERDDAP.) Using this parameter will have other minor related effects because the guessed standard\_name is often used for other purposes, e.g., to create a new long\_name, and to create the colorBar settings.
#### Scripting {#scripting}
As an alternative to answering the questions interactively at the keyboard and looping to generate additional datasets, you can provide command line arguments to answer all of the questions to generate one dataset. GenerateDatasetsXml will process those parameters, write the output to the output file, and exit the program.
        
To set this up, first use the program in interactive mode and write down your answers. Here's a partial example:  
Let's say you run the script: ./GenerateDatasetsXml.sh  
Then enter: EDDTableFromAsciiFiles  
Then enter: /u00/data/  
Then enter: .\*\\.asc  
Then enter: /u00/data/sampleFile.asc  
Then enter: ISO-8859-1
        
To run this in a non-interactive way, use this command line:  
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\*\\.asc /u00/data/sampleFile.asc ISO-8859-1  
So basically, you just list all the answers on the command line.  
This should be useful for datasets that change frequently in a way that necessitates re-running GenerateDatasetsXml (notably EDDGridFromThreddsCatalog).
        
Details:

*   If a parameter contains a space or some special character, then encode the parameter as a [JSON-style string](https://www.json.org/json-en.html), e.g., "my parameter with spaces and two\\nlines".
*   If you want to specify an empty string as a parameter, use: nothing
*   If you want to specify the default value of a parameter, use: default  
             
*   GenerateDatasetsXml supports a -i*datasetsXmlName*#*tagName* command line parameter which inserts the output into the specified datasets.xml file (the default is *tomcat*/content/erddap/datasets.xml). GenerateDatasetsXml looks for two lines in datasetsXmlName:  
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
        and  
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
and replaces everything in between those lines with the new content, and changes the someDatetime.
*   The -i switch is only processed (and changes to datasets.xml are only made) if you run GenerateDatasetsXml with command line arguments which specify all the answers to all of the questions for one loop of the program. (See 'Scripting' above.) (The thinking is: This parameter is for use with scripts. If you use the program in interactive mode (typing info on the keyboard), you are likely to generate some incorrect chunks of XML before you generate the one you want.)
*   If the Begin and End lines are not found, then those lines and the new content are inserted right before &lt;/erddapDatasets>.
*   There is also a -I (capital i) switch for testing purposes which works the same as -i, but creates a file called datasets.xml*DateTime* and doesn't make changes to datasets.xml.
*   Don't run GenerateDatasetsXml with -i in two processes at once. There is a chance only one set of changes will be kept. There may be serious trouble (for example, corrupted files).
    
If you use "GenerateDatasetsXml -verbose", it will print more diagnostic messages than usual.
    
#### Special/Pseudo Dataset Types {#specialpseudo-dataset-types}
In general, the EDDType options in GenerateDatasetsXml match of the EDD types described in this document (see the [List of Dataset Types](#list-of-types-datasets)) and generate one datasets.xml chunk to create one dataset from one specific data source. There are a few exceptions and special cases:
    
##### EDDGridFromErddap {#eddgridfromerddap}
This EDDType generates all of the datasets.xml chunks needed to make [EDDGridFromErddap](#eddfromerddap) datasets from all of the EDDGrid datasets in a remote ERDDAP. You will have the option of keeping the original datasetIDs (which may duplicate some datasetIDs already in your ERDDAP) or generating new names which will be unique (but usually aren't as human-readable).  
     
##### EDDTableFromErddap {#eddtablefromerddap}
This EDDType generates all of the datasets.xml chunks needed to make [EDDTableFromErddap](#eddfromerddap) datasets from all of the EDDTable datasets in a remote ERDDAP. You will have the option of keeping the original datasetIDs (which may duplicate some datasetIDs already in your ERDDAP) or generating new names which will be unique (but usually aren't as human-readable).  
     
##### EDDGridFromThreddsCatalog {#eddgridfromthreddscatalog}
This EDDType generates all of the datasets.xml chunks needed for all of the [EDDGridFromDap](#eddgridfromdap) datasets that it can find by crawling recursively through a THREDDS (sub) catalog. There are many forms of THREDDS catalog URLs. This option REQUIRES a THREDDS .xml URL with /catalog/ in it, for example,  
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml or  
https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml  
(a related .html catalog is at  
https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , which is not acceptable for EDDGridFromThreddsCatalog).  
If you have problems with EDDGridFromThreddsCatalog:
*   Make sure the URL you are using is valid, includes /catalog/, and ends with /catalog.xml .
*   If possible, use a public IP address (for example, https://oceanwatch.pfeg.noaa.gov) in the URL, not a local numeric IP address (for example, https://12.34.56.78). If the THREDDS is only accessible via the local numeric IP address, you can use [&lt;convertToPublicSourceUrl>](#converttopublicsourceurl) so ERDDAP™ users see the public address, even though ERDDAP™ gets data from the local numeric address.
*   If you have problems that you can't solve, [check the troubleshooting tips](#troubleshooting-tips).
*   The low level code for this now uses the Unidata netcdf-java catalog crawler code (thredds.catalog classes) so that it can handle all THREDDS catalogs (which can be surprisingly complex) Thanks to Unidata for that code.  
         
##### EDDGridLonPM180FromErddapCatalog {#eddgridlonpm180fromerddapcatalog}
This EDDType generates the datasets.xml to make [EDDGridLonPM180](#eddgridlonpm180) datasets from all of the EDDGrid datasets in an ERDDAP that have any longitude values greater than 180.
*   If possible, use a public IP address (for example, https://oceanwatch.pfeg.noaa.gov) in the URL, not a local numeric IP address (for example, https://12.34.56.78). If the ERDDAP™ is only accessible via the local numeric IP address, you can use [&lt;convertToPublicSourceUrl>](#converttopublicsourceurl) so ERDDAP™ users see the public address, even though ERDDAP™ gets data from the local numeric address.  
         
##### EDDGridLon0360FromErddapCatalog {#eddgridlon0360fromerddapcatalog}
This EDDType generates the datasets.xml to make [EDDGridLon0360](#eddgridlon0360) datasets from all of the EDDGrid datasets in an ERDDAP that have any longitude values less than 0.
*   If possible, use a public IP address (for example, https://oceanwatch.pfeg.noaa.gov) in the URL, not a local numeric IP address (for example, https://12.34.56.78). If the ERDDAP™ is only accessible via the local numeric IP address, you can use [&lt;convertToPublicSourceUrl>](#converttopublicsourceurl) so ERDDAP™ users see the public address, even though ERDDAP™ gets data from the local numeric address.  
         
##### EDDsFromFiles {#eddsfromfiles}
Given a start directory, this traverses the directory and all subdirectories and tries to create a dataset for each group of data files that it finds.
*   This assumes that when a dataset is found, the dataset includes all subdirectories.
*   If a dataset is found, similar sibling directories will be treated as separate datasets (for example, directories for the 1990's, the 2000's, the 2010's, will generate separate datasets). They should be easy to combine by hand -- just change the first dataset's &lt;fileDir> to the parent directory and delete all the subsequent sibling datasets.
*   This will only try to generate a chunk of datasets.xml for the most common type of file extension in a directory (not counting .md5, which is ignored). So, given a directory with 10 .nc files and 5 .txt files, a dataset will be generated for the .nc files only.
*   This assumes that all files in a directory with the same extension belong in the same dataset. If a directory has some .nc files with SST data and some .nc files with chlorophyll data, just one sample .nc file will be read (SST? chlorophyll?) and just one dataset will be created for that type of file. That dataset will probably fail to load because of complications from trying to load two types of files into the same dataset.
*   If there are fewer than 4 files with the most common extension in a directory, this assumes that they aren't data files and just skips the directory.
*   If there are 4 or more files in a directory, but this can't successfully generate a chunk of datasets.xml for the files (for example, an unsupported file type), this will generate an [EDDTableFromFileNames](#eddtablefromfilenames) dataset for the files.
*   At the end of the diagnostics that this writes to the log file, just before the datasets.xml chunks, this will print a table with a summary of information gathered by traversing all the subdirectories. The table will list every subdirectory and indicate the most common type of file extension, the total number of files, and which type of dataset was created for these files (if any). If you are faced with a complex, deeply nested file structure, consider running GenerateDatasetsXml with EDDType=EDDsFromFiles just to generate this information,
*   This option may not do a great job of guessing the best EDDType for a given group of data files, but it is quick, easy, and worth a try. If the source files are suitable, it works well and is a good first step in generating the datasets.xml for a file system with lots of subdirectories, each with data files from different datasets.  
         
##### EDDTableFromEML and EDDTableFromEMLBatch {#eddtablefromeml-and-eddtablefromemlbatch}
These special EDDType generates the datasets.xml to make an [EDDTableFromAsciiFiles](#eddtablefromasciifiles) dataset from each of the tables described in an [Ecological Metadata Language](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML file. The "Batch" variant works on all of the EML files in a local or remote directory. Please see the separate [documentation for EDDTableFromEML](/docs/server-admin/EDDTableFromEML).  
     
##### EDDTableFromInPort {#eddtablefrominport}
This special EDDType generates the datasets.xml to make an [EDDTableFromAsciiFiles](#eddtablefromasciifiles) dataset from the information in an [inport-xml](https://inport.nmfs.noaa.gov/inport) file. If you can get access to the source data file (the inport-xml file should have clues for where to find it), you can make a working dataset in ERDDAP.

The following steps outline how to use GenerateDatasetsXml with an inport-xml file in order to get a working dataset in ERDDAP.

1.  Once you have access to the inport-xml file (either as a URL or a local file): run GenerateDatasetsXml, specify EDDType=EDDTableFromInPort, specify the inport-xml URL or full filename, specify whichChild=0, and specify the other requested information (if known). (At this point, you don't need to have the source data file or specify its name.) The whichChild=0 setting tells GenerateDatasetsXml to write out the information for **all** of the &lt;entity-attribute-information>&lt;entity>'s in the inport-xml file (if there are any). It also prints out a Background information summary, including all of the download-url's listed in the inport-xml file.
2.  Look through all that information (including the Background information that GenerateDatasetsXml prints) and visit the download-url(s) in order to try to find the source data file(s). If you can find it(them), download it(them) into a directory that is accessible to ERDDAP. (If you can't find any source data files, there is no point in proceeding.)
3.  Run GenerateDatasetsXml again.  
    If the source data file corresponds to one of the inport-xml file's &lt;entity-attribute-information>&lt;entity>'s, specify whichChild=*thatEntity'sNumber* (e.g., 1, 2, 3, ...). ERDDAP™ will try to match the column names in the source data file to names in the entity information, and prompt to accept/reject/fix any discrepancies.  
    Or, if the inport-xml file doesn't have any &lt;entity-attribute-information>&lt;entity>'s, specify whichChild=0.
4.  In the chunk of datasets.xml that was made by GenerateDatasetsXml, revise the [global &lt;addAttributes>](#global-attributes) as needed/desired.
5.  In the chunk of datasets.xml that was made by GenerateDatasetsXml, add/revise the [&lt;dataVariable>](#datavariable) information as needed/desired to describe each of the variables. Be sure you properly identify each variable's  
    [&lt;sourceName>](#sourcename) (as it appears in the source),  
    [&lt;destinationName>](#destinationname) (which has more limitations on allowed characters than sourceName),  
    [&lt;units>](#units) (especially if it is a [time or timestamp variable](#timestamp-variables) where the units need to specify the format), and  
    [&lt;missing\_value>](#missing_value),
6.  When you are close to finishing, repeatedly use the [DasDds](#dasdds) tool to quickly see if the dataset description is valid and if the dataset will appear in ERDDAP™ as you want it to.  
     

It would be great if groups using InPort to document their datasets would also use ERDDAP™ to make the actual data available:

*   ERDDAP™ is a solution that can be used right now so you can fulfill NOAA's [Public Access to Research Results (PARR) requirements](https://nosc.noaa.gov/EDMC/PD.DSP.php) right now, not at some vague time in the future.
*   ERDDAP™ makes the actual data available to users, not just the metadata. (What good is metadata without data?)
*   ERDDAP™ supports metadata (notably, the units of variables), unlike some other data server software being considered. (What good is data without metadata?) To use software that doesn't support metadata is to invite the data to be misunderstood and misused.
*   ERDDAP™ is free and open-source software unlike some other software being considered. Ongoing development of ERDDAP™ is already paid for. Support for ERDDAP™ users is free.
*   ERDDAP's appearance can be easily customized to reflect and highlight your group (not ERD or ERDDAP).
*   ERDDAP™ offers a consistent way to access all datasets.
*   ERDDAP™ can read data from many types of data files and from relational databases.
*   ERDDAP™ can deal with large datasets, including datasets where the source data is in many data files.
*   ERDDAP™ can write data to many types of data files, at the user's request, including scientific data file types like netCDF, ESRI .csv, and ODV .txt.
*   ERDDAP™ can make custom graphs and maps of subsets of the data, based on the user's specifications.
*   ERDDAP™ can deal with non-data datasets such as collections of image, video, or audio files.
*   ERDDAP™ has been installed and used at [more than 60 institutions around the world](/#who-uses-erddap).
*   ERDDAP™ is listed as one of the data servers recommended for use within NOAA in the [NOAA Data Access Procedural Directive](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), unlike some other software being considered.
*   ERDDAP™ is a product of NMFS/NOAA, so using it within NMFS and NOAA should be a point of pride for NMFS and NOAA.

Please give ERDDAP™ a try. If you need help, please post a message in the ERDDAP™ Google group.  
     
##### addFillValueAttributes {#addfillvalueattributes}
This special EDDType option isn't a dataset type. It is a tool which can add \_FillValue attributes to some variables in some datasets. See [addFillValueAttributes](#add-_fillvalue-attributes).  
     
##### findDuplicateTime {#findduplicatetime}
This special EDDType option isn't a dataset type. Instead, it tells GenerateDatasetsXml to search through a collection of gridded .nc (and related) files to find and print out a list of files with duplicate time values. When it looks at the time values, it converts them from the original units to "seconds since 1970-01-01" in case different files use different units strings. You need to provide the starting directory (with or without the trailing slash), the file name regular expression (e.g., .\*\\.nc ), and the name of the time variable in the files.  
     
##### ncdump {#ncdump}
This special EDDType option isn't a dataset type. Instead, it tells GenerateDatasetsXml to print an [ncdump](https://linux.die.net/man/1/ncdump)\-like printout of an .nc, .ncml, or .hdf file. It actually uses the netcdf-java's [NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), which is a more limited tool than the C version of NCdump. If you use this option, GenerateDatasetsXml will ask you to use one of the options: "-h" (header), "-c" (coordinate vars), "-vall" (default), "-v var1;var2", "-v var1(0,0:10,0:20)". This is useful because, without ncdump it is hard to know what is in an .nc, .ncml, or .hdf file and thus which EDDType you should specify for GenerateDatasetsXml. For an .ncml file, this will print the ncdump output for the result of the .ncml file changes applied to the underlying .nc or .hdf file.  
         
### DasDds {#dasdds}
*   [**DasDds**](#dasdds) is a command line program that you can use after you have created a first attempt at the XML for a new dataset in datasets.xml. With DasDds, you can repeatedly test and refine the XML. When you use the DasDds program:
    1.  On Windows, the first time you run DasDds, you need to edit the DasDds.bat file with a text editor to change the path to the java.exe file so that Windows can find Java.
    2.  DasDds asks you for the datasetID for the dataset you are working on.
    3.  DasDds tries to create the dataset with that datasetID.
        *   DasDds always prints lots of diagnostic messages.  
            If you use "DasDds -verbose", DasDds will print more diagnostic messages than usual.
        *   For safety, DasDds always deletes all of the cached dataset information (files) for the dataset before trying to create the dataset. This is the equivalent of setting a [hard flag](/docs/server-admin/additional-information#hard-flag) So for aggregated datasets, you might want to adjust the fileNameRegex temporarily to limit the number of files the data constructor finds.
        *   If the dataset fails to load (for whatever reason), DasDds will stop and show you the error message for the first error it finds.  
            **Don't try to guess what the problem might be. Read the ERROR message carefully.**  
            If necessary, read the preceding diagnostic messages to find more clues and information, too.
        *   **Make a change to the dataset's XML to try to solve THAT problem**  
            and let DasDds try to create the dataset again.
        *   **If you repeatedly solve each problem, you will eventually solve all the problems**  
            and the dataset will load.
    4.  All DasDds output (diagnostics and results) are written to the screen and to *bigParentDirectory*/logs/DasDds.log .
    5.  If DasDds can create the dataset, DasDds will then show you the [.das (Dataset Attribute Structure)](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das), [.dds (Dataset Descriptor Structure)](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds), and [.timeGaps (time gaps)](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) information for the dataset on your screen and write them to *bigParentDirectory*/logs/DasDds.out .
    6.  Often, you will want to make some small change to the dataset's XML to clean up the dataset's metadata and rerun DasDds.

### Bonus Third-Party Tool: ERDDAP-lint {#bonus-third-party-tool-erddap-lint}
ERDDAP-lint is a program from Rob Fuller and Adam Leadbetter of the Irish Marine Institute that you can use to improve the metadata of your ERDDAP™ datasets. ERDDAP-lint "contains rules and a simple static web application for running some verification tests against your ERDDAP™ server. All the tests are run in the web browser." Like the [Unix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software)), you can edit the existing rules or add new rules. See [ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint) for more information.

This tool is especially useful for datasets that you created some time ago and now want to bring up-to-date with your current metadata preferences. For example, early versions of GenerateDatasetsXml didn't put any effort into creating global creator\_name, creator\_email, creator\_type, or creator\_url metadata. You could use ERDDAP-lint to identify the datasets that lack those metadata attributes.

Thanks to Rob and Adam for creating this tool and making it available to the ERDDAP™ community.  
 
## The Basic Structure of the datasets.xml File {#the-basic-structure-of-the-datasetsxml-file}
The required and optional tags allowed in a datasets.xml file (and the number of times they may appear) are shown below. In practice, your datasets.xml will have lots of &lt;dataset>'s tags and only use the other tags within &lt;erddapDatasets> as needed.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

It is possible that other encodings will be allowed in the future, but for now, only ISO-8859-1 is recommended.  
 
### XInclude {#xinclude}
New in version 2.25 is support for XInclude. This requires you are using the SAX parser &lt;useSaxParser>true&lt;/useSaxParser> in your setup.xml. This can allow you to write each dataset in its own file, then include them all in the main datasets.xml, reuse parts of dataset definitions, or both. If you want to see an example, [EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java) sets up XInclude to reuse variable definitions.  
 

- - -

## Notes {#notes}

Working with the datasets.xml file is a non-trivial project. Please read all of these notes carefully. After you pick a [dataset type](#list-of-types-datasets), please read the detailed description of it carefully.
     
### Choosing the Dataset Type {#choosing-the-dataset-type}
In most cases, there is just one ERDDAP™ dataset type that is appropriate for a given data source. In a few cases (e.g., .nc files), there are a few possibilities, but usually one of them is definitely best. The first and biggest decision you must make is: is it appropriate to treat the dataset as a group of multidimensional arrays (if so see the [EDDGrid dataset types](#eddgrid)) or as a database-like table of data (if so see the [EDDTable dataset types](#eddtable)).  
     
### Serving the Data As Is {#serving-the-data-as-is}
Usually, there is no need to modify the data source (e.g., convert the files to some other file type) so that ERDDAP™ can serve it. One of the assumptions of ERDDAP™ is that the data source will be used as is. Usually this works fine. Some exceptions are:
*   Relational Databases and Cassandra -- ERDDAP™ can serve data directly from relational databases and Cassandra. But for security, load balancing, and performance issues, you may choose to set up another database with the same data or save the data to NetCDF v3 .nc files and have ERDDAP™ serve the data from the new data source. See [EDDTableFromDatabase](#eddtablefromdatabase) and [EDDTableFromCassandra](#eddtablefromcassandra).
*   Not Supported Data Sources -- ERDDAP™ can support a large number of types of data sources, but the world is filled with 1000's (millions?) of different data sources (notably, data file structures). If ERDDAP™ doesn't support your data source:
    *   If the data source is NetCDF .nc files, you can use [NcML](#ncml-files) to modify the data files on-the-fly, or use [NCO](#netcdf-operators-nco) to permanently modify the data files.
    *   You can write the data to a data source type that ERDDAP™ supports. NetCDF-3 .nc files are a good, general recommendation because they are binary files that ERDDAP™ can read very quickly. For tabular data, consider storing the data in a collection of .nc files that use the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data structures and so can be handled with ERDDAP's [EDDTableFromNcCFFiles](#eddtablefromnccffiles)). If they are logically organized (each with data for a chunk of space and time), ERDDAP™ can extract data from them very quickly.
    *   You can request that support for that data source be added to ERDDAP™ by emailing Chris.John at noaa.gov.
    *   You can add support for that data source by writing the code to handle it yourself. See [the ERDDAP™ Programmer's Guide](/docs/contributing/programmer-guide)
*   Speed -- ERDDAP™ can read data from some data sources much faster than others. For example, reading NetCDF v3 .nc files is fast and reading ASCII files is slower. And if there is a large (>1000) or huge (>10,000) number of source data files, ERDDAP™ will respond to some data requests slowly. Usually, the difference isn't noticeable to humans. However, if you think ERDDAP™ is slow for a given dataset, you may choose to solve the problem by writing the data to a more efficient setup (usually: a few, well-structured, NetCDF v3 .nc files). For tabular data, see [this advice](#millions-of-files).  
         
### Hint {#hint}
It is often easier to generate the XML for a dataset by making a copy of a working dataset description in dataset.xml and then modifying it.  
    
### Encoding Special Characters {#encoding-special-characters}
Since datasets.xml is an XML file, you MUST [&-encode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML) "&", "&lt;", and ">" in any content as "&amp;", "&lt;", and "&gt;".  
Wrong: &lt;title>Time & Tides&lt;/title>  
Right:   &lt;title>Time &amp; Tides&lt;/title>  
     
### XML doesn't tolerate syntax errors {#xml-doesnt-tolerate-syntax-errors}
After you edit the dataset.xml file, it is a good idea to verify that the result is [well-formed XML](https://www.w3schools.com/xml/xml_dtd.asp) by pasting the XML text into an XML checker like [xmlvalidation](https://www.xmlvalidation.com/).  
     
### Troubleshooting Tips {#troubleshooting-tips}
*   **Other Ways To Diagnose Problems With Datasets**  
    In addition to the two main [Tools](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log) is a log file with all of ERDDAP's diagnostic messages.
    *   The [Daily Report](/docs/server-admin/additional-information#daily-report) has more information than the status page, including a list of datasets that didn't load and the exceptions (errors) they generated.
    *   The [Status Page](/docs/server-admin/additional-information#status-page) is a quick way to check ERDDAP's status from any web browser. It includes a list of datasets that didn't load (although not the related exceptions) and taskThread statistics (showing the progress of [EDDGridCopy](#eddgridcopy) and [EDDTableCopy](#eddtablecopy) datasets and any [EDDGridFromFiles](#eddgridfromfiles) or [EDDTableFromFiles](#eddtablefromfiles) datasets that use [cacheFromUrl](#cachefromurl) (but not cacheSizeGB)).
    *   If you get stuck, see our [section on getting additional support](/docs/intro#support).
         
### Special variables {#special-variables}
*   **[The longitude, latitude, altitude, depth, pressure, and time (LLAT) variable](#destinationname) [destinationName](#destinationname)s are special.**
    *   In general:
        *   LLAT variables are made known to ERDDAP™ if the axis variable's (for EDDGrid datasets) or data variable's (for EDDTable datasets) [destinationName](#destinationname) is "longitude", "latitude", "altitude", "depth", or "time".
        *   We strongly encourage you to use these standard names for these variables whenever possible. None of them is required. If you don't use these special variable names, ERDDAP™ won't recognize their significance. For example, LLAT variables are treated specially by Make A Graph (*datasetID*.graph): if the X Axis variable is "longitude" and the Y Axis variable is "latitude", you will get a map (using a standard projection, and with a land mask, political boundaries, etc.) instead of a graph.
        *   ERDDAP™ will automatically add lots of metadata to LLAT variables (for example, "[ioos\_category](#ioos_category)", "[units](#units)", and several standards-related attributes like "\_CoordinateAxisType").
        *   ERDDAP™ will automatically, on-the-fly, add lots of global metadata related to the LLAT values of the selected data subset (for example, "geospatial\_lon\_min").
        *   Clients that support these metadata standards will be able to take advantage of the added metadata to position the data in time and space.
        *   Clients will find it easier to generate queries that include LLAT variables because the variable's names are the same in all relevant datasets.
    *   For the "longitude" variable and the "latitude" variable:
        *   Use the [destinationName](#destinationname)s "longitude" and "latitude" only if the [units](#units) are degrees\_east and degrees\_north, respectively. If your data doesn't fit these requirements, use different variable names (for example, x, y, lonRadians, latRadians).
        *   If you have longitude and latitude data expressed in different units and thus with different destinationNames, for example, lonRadians and latRadians, Make A Graph (*datasetID*.graph) will make graphs (for example, time series) instead of maps.
    *   For the "altitude", "presure", or "depth" variable:
        *   Use the [destinationName](#destinationname) "altitude" to identify the data's distance above sea level (positive="up" values). Optionally, you may use "altitude" for distances below sea level if the values are negative below the sea (or if you use, for example,  
            [&lt;att name="scale\_factor" type="int">-1&lt;/att>](#scale_factor) to convert depth values into altitude values.
        *   Use the destinationName "depth" to identify the data's distance below sea level (positive="down" values).
        *   Alternatively, for elevations defined by air pressure levels (such as [isobars](https://en.wikipedia.org/wiki/Contour_line#Barometric_pressure)), you should set the destinationName to "pressure". This supports units in "hPa", "Pa", and "mbar" (positive="down" values).
        *   A dataset may have only one "altitude", "pressure", or "depth" variable.
        *   For these "altitude" and "depth" variables, the [units](#units) must be "m", "meter", or "meters". If the units different (for example, fathoms), you can use  
            [&lt;att name="scale\_factor">*someValue*&lt;/att>](#scale_factor) and [&lt;att name="units">meters&lt;/att>](#units) to convert the units to meters.
        *   If your data doesn't fit these requirements, use a different destinationName (for example, aboveGround, distanceToBottom).
        *   If you know the vertical CRS please specify it in the metadata, e.g., "EPSG:5829" (instantaneous height above sea level), "EPSG:5831" (instantaneous depth below sea level), or "EPSG:5703" (NAVD88 height).
    *   For the "time" variable:
        *   Use the [destinationName](#destinationname) "time" only for variables that include the entire date+time (or date, if that is all there is). If, for example, there are separate columns for date and timeOfDay, don't use the variable name "time".
        *   See [units](#time-units) for more information about the units attribute for time and timeStamp variables.
        *   The time variable and related [timeStamp variables](#timestamp-variables) are unique in that they always convert data values from the source's time format (whatever it is) into a numeric value (seconds since 1970-01-01T00:00:00Z) or a String value (ISO 8601:2004(E) format), depending on the situation.
        *   When a user requests time data, they can request it by specifying the time as a numeric value (seconds since 1970-01-01T00:00:00Z) or a String value (ISO 8601:2004(E) format).
        *   ERDDAP™ has a utility to [Convert a Numeric Time to/from a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        *   See [How ERDDAP Deals with Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).  
            
### Why just two basic data structures? {#why-just-two-basic-data-structures}
*   Since it is difficult for human clients and computer clients to deal with a complex set of possible dataset structures, ERDDAP™ uses just two basic data structures:
    *   a [gridded data structure](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel) (for example, for satellite data and model data) and
    *   a [tabular data structure](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel) (for example, for in-situ buoy, station, and trajectory data).
*   Certainly, not all data can be expressed in these structures, but much of it can. Tables, in particular, are very flexible data structures (look at the success of relational database programs).
*   This makes data queries easier to construct.
*   This makes data responses have a simple structure, which makes it easier to serve the data in a wider variety of standard file types (which often just support simple data structures). This is the main reason that we set up ERDDAP™ this way.
*   This, in turn, makes it very easy for us (or anyone) to write client software which works with all ERDDAP™ datasets.
*   This makes it easier to compare data from different sources.
*   We are very aware that if you are used to working with data in other data structures you may initially think that this approach is simplistic or insufficient. But all data structures have tradeoffs. None is perfect. Even the do-it-all structures have their downsides: working with them is complex and the files can only be written or read with special software libraries. If you accept ERDDAP's approach enough to try to work with it, you may find that it has its advantages (notably the support for multiple file types that can hold the data responses). The [ERDDAP™ slide show](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html) (particularly the [data structures slide](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) talks a lot about these issues.
*   And even if this approach sounds odd to you, most ERDDAP™ clients will never notice -- they will simply see that all of the datasets have a nice simple structure and they will be thankful that they can get data from a wide variety of sources returned in a wide variety of file formats.  
         
### Dimensions {#dimensions}
*   **What if the grid variables in the source dataset DON'T share the same axis variables?**  
    In EDDGrid datasets, all data variables MUST use (share) all of the axis variables. So if a source dataset has some variables with one set of dimensions, and other variables with a different set of dimensions, you will have to make two datasets in ERDDAP. For example, you might make one ERDDAP™ dataset entitled "Some Title (at surface)" to hold variables that just use \[time\]\[latitude\]\[longitude\] dimensions and make another ERDDAP™ dataset entitled "Some Title (at depths)" to hold the variables that use \[time\]\[altitude\]\[latitude\]\[longitude\]. Or perhaps you can change the data source to add a dimension with a single value (for example, altitude=0) to make the variables consistent.
    
    ERDDAP™ doesn't handle more complicated datasets (for example, models that use a mesh of triangles) well. You can serve these datasets in ERDDAP™ by creating two or more datasets in ERDDAP™ (so that all data variables in each new dataset share the same set of axis variables), but that isn't what users want. For some datasets, you might consider making a regular gridded version of the dataset and offering that in addition to the original data. Some client software can only deal with a regular grid, so by doing this, you reach additional clients.  
     
    
### Projected Gridded Data {#projected-gridded-data}
Some gridded data has a complex structure. For example, satellite level 2 ("along track") data does not use a simple projection. Modelers (and others) often work with gridded data on various non-cylindrical projections (for example, conic, polar stereographic, tripolar) or in unstructured grids (a more complex data structure). Some end users want this data as is, so there is no loss of information. For those clients, ERDDAP™ can serve the data, as is, only if the ERDDAP™ administrator breaks the original dataset into a few datasets, with each part including variables which share the same axis variables. Yes, that seems odd to people involved and it is different from most OPeNDAP servers. But ERDDAP™ emphasizes making the data available in many formats. That is possible because ERDDAP™ uses/requires a more uniform data structure. Although it is a little awkward (i.e., different than expected), ERDDAP™ can distribute the projected data.

\[Yes, ERDDAP™ could have looser requirements for the data structure, but keep the requirements for the output formats. But that would lead to confusion among many users, particularly newbies, since many seemingly valid requests for data with different structures would be invalid because the data wouldn't fit into the file type. We keep coming back to the current system's design.\]

Some end users want data in a lat lon cylindrical projection like Equirectangular / plate carrée or Mercator) for ease-of-use in different situations. For these situations, we encourage the ERDDAP™ administrator to use some other software (NCO? Matlab? R? IDV? ...?) to re-project the data onto a geographic (Equirectangular projection / plate carrée) or other cylindrical projection and serve that form of the data in ERDDAP™ as a different dataset. This is similar to what people do when they convert satellite level 2 data into level 3 data. One such tool is [NCO](https://nco.sourceforge.net/nco.html#Regridding) which offers extension options for regridding data.

#### GIS and Reprojecting Data {#gis-and-reprojecting-data}
Since the GIS world is often map oriented, GIS programs usually offer support for reprojecting the data, i.e., plotting the data on a map with a different projection.

Currently, ERDDAP™ does not have tools to reproject data. Instead, we recommend that you use an external tool to make a variant of the dataset, where data has been reprojected from its original form onto a rectangular (latitude longitude) array suitable for ERDDAP.

In our opinion, the CF/DAP world is a little different than the GIS world and works at a slightly lower level. ERDDAP™ reflects that. In general, ERDDAP™ is designed to work primarily with data (not maps) and doesn't want to change (e.g., reproject) that data. For ERDDAP™, gridded data is often/usually/preferably associated with lat lon values and a cylindrical projection, and not some projection's x,y values. In any case, ERDDAP™ doesn't do anything with the data's projection; it just passes the data through, as is, with its current projection, on the theory that a reprojection is a significant change to the data and ERDDAP™ doesn't want to be involved with significant changes. Also, subsequent users might naively reproject the data again, which would be not as good as just doing one reprojection. (So, if the ERDDAP™ administrator wants to offer the data in a different projection, fine; just reproject the data offline and offer that as a different dataset in ERDDAP. Lots of satellite-based datasets are offered as what NASA calls Level 2 (swath) and as Level 3 (Equirectangular projection) versions.) When ERDDAP™ makes maps (directly or via WMS or KML), ERDDAP™ currently only offers to make maps with the Equirectangular / plate carrée projection which, fortunately, is accepted by most mapping programs.

We encourage ERDDAP™ administrators to use some other software (NCO? Matlab? R? IDV? ...?) to re-project the data onto a geographic (Equirectangular projection / plate carrée) or other cylindrical projection and serve that form of the data in ERDDAP™ as a different dataset. This is similar to what people do when they convert satellite level 2 data into level 3 data. One such tool is [NCO](https://nco.sourceforge.net/nco.html#Regridding) which offers extension options for regridding data.

We hope that ERDDAP™ will have built-in tools to offer maps with other projections in the future. We also hope to have better connections to the GIS world in the future (other than the current WMS service). It is terrible that in this "modern" world, the links between the CF/DAP world and the GIS world are still so weak. Both of those things are on the To Do list. (If you want to help, notably with connecting ERDDAP™ to MapServer, please email Chris.John at noaa.gov .)
    
### Data Types {#data-types}
ERDDAP™ supports the following data types  
(the names are case sensitive; 'u' prefix stands for "unsigned"; the number many of the names in other systems is the number of bits):

#### byte {#byte}
*   **byte** has signed integer values with a range of -128 to 127.  
    In other systems, this is sometimes called int8.  
    This is called "tinyint" by SQL and Cassandra.  
    ERDDAP™ converts [boolean](#boolean-data) from some sources (e.g., SQL and Cassandra) into bytes in ERDDAP™ with a value of 0=false, 1=true, and 127=missing\_value.
#### ubyte {#ubyte}
*   **ubyte** has unsigned integer values with a range of 0 to 255.  
    In other systems, this is sometimes called uint8.
#### short {#short}
*   **short** has signed integer values with a range of -32768 to 32767.  
    In other systems, this is sometimes called int16.  
    This is called "smallint" by SQL and Cassandra.
#### ushort {#ushort}
*   **ushort** has unsigned integer values with a range of 0 to 65535.  
    In other systems, this is sometimes called uint16.
#### int {#int}
*   **int** has signed integer values with a range of -2147483648 to 2147483647.  
    In other systems, this is sometimes called int32.  
    This is called "integer|numeric(?)" by SQL and "int" by Cassandra.
#### uint {#uint}
*   **uint** has unsigned integer values with a range of 0 to 4294967295.  
    In other systems, this is sometimes called uint32.
#### long {#long}
*   **long** has signed integer values with a range of -9223372036854775808 to 9223372036854775807.  
    In other systems, this is sometimes called int64.  
    This is called "bigint|numeric(?)" by SQL and "bigint" by Cassandra.  
    Because many file types don't support long data, their use is discouraged. When possible, use double instead (see below).
#### ulong {#ulong}
*   **ulong** has unsigned integer values with a range of 0 to 18446744073709551615  
    In other systems, this is sometimes called uint64.  
    Because many file types don't support ulong data, their use is discouraged. When possible, use double instead (see below).
#### float {#float}
*   **float** is an IEEE 754 float with a range of approximately +/- 3.402823466e+38.  
    In other systems, this is sometimes called float32.  
    This is called "real|float(?)|decimal(?)|numeric(?)" by SQL and "float" by Cassandra.  
    The special value NaN means Not-a-Number.  
    ERDDAP™ converts positive and negative infinity values to NaN.
#### double {#double}
*   **double** is an IEEE 754 double with a range of approximately  
    +/- 1.7976931348623157E+308.  
    In other systems, this is sometimes called float64.  
    This is called "double precision|float(?)|decimal(?)|numeric(?)" by SQL and "double" by Cassandra.  
    The special value NaN means Not-a-Number.  
    ERDDAP™ converts positive and negative infinity values to NaN.
#### char {#char}
*   **char** is a single, 2-byte (16-bit) [Unicode UCS-2 character](https://en.wikipedia.org/wiki/UTF-16) ranging from \\u0000 (#0) through \\uffff (#65535).  
    \\uffff's definition is Not-a-Character, analogous to a double value of NaN.  
    The use of char is discouraged because many file types either don't support chars or only support 1-byte chars (see below). Consider using String instead.  
    Users can use char variables to make graphs. ERDDAP™ will convert the characters to their Unicode code point number, which can be used as numeric data.
#### String {#string}
*   **String** is a sequence of 0 or more, 2-byte (16-bit) [Unicode UCS-2 characters](https://en.wikipedia.org/wiki/UTF-16).  
    ERDDAP™ uses/interprets a 0-length string as a missing value. ERDDAP™ does not support a true null string.  
    The theoretical maximum string length is 2147483647 characters, but there are probably various problems in various places even with somewhat shorter Strings.  
    Use ERDDAP's String for SQL's character, varchar, character varying, binary, varbinary, interval, array, multiset, xml, and any other database data type that doesn't fit cleanly with any other ERDDAP™ data type.  
    Use ERDDAP's String for Cassandra's "text" and any other Cassandra data type that doesn't fit cleanly with any other ERDDAP™ data type.  
     

Before ERDDAP™ v2.10, ERDDAP™ did not support unsigned integer types internally and offered limited support in its data readers and writers.
    
### Data Type Limitations {#data-type-limitations}
You can think of ERDDAP™ as a system which has virtual datasets, and which works by reading data from a dataset's source into an internal data model and writing data to various services (e.g., (OPeN)DAP, WMS) and file types in response to user requests.

*   Each input reader supports a subset of the data types that ERDDAP™ supports. So reading data into ERDDAP's internal data structures isn't a problem.
*   Each output writer also supports a subset of data types. That's a problem because ERDDAP has to squeeze, for example, long data into file types that don't support long data.  
     

Below are explanations of the limitations (or none) of various output writers and how ERDDAP™ deals with the problems. Such complications are an inherent part of ERDDAP's goal of making disparate systems interoperable.

#### ASCII {#ascii}
*   ASCII (.csv, .tsv, etc.) text files -
    *   All numeric data is written via its String representation (with missing data values appearing as 0-length strings).
    *   Although ERDDAP™ writes long and ulong values correctly to ASCII text files, many readers (e.g., spreadsheet programs) can't correctly deal with long and ulong values and instead convert them to double values (with loss of precision in some cases).
    *   Char and String data are written via JSON Strings, which handle all Unicode characters (notably, the "unusual" characters beyond ASCII #127, e.g., the Euro character appears as "\\u20ac").
    
        
#### JSON {#json}
*   JSON (.json, .jsonlCSV, etc.) text files -
    *   All numeric data is written via its String representation.
    *   Char and String data are written as JSON Strings, which handle all Unicode characters (notably, the "unusual" characters beyond ASCII #127, e.g., the Euro character appears as "\\u20ac").
    *   Missing values for all numeric data types appear as null.  
         
#### .nc3 files {#nc3-files}
*   .nc3 files don't natively support any unsigned integer data types. Before CF v1.9, CF did not support unsigned integer types. To deal with this, ERDDAP™ 2.10+ follows the NUG standard and always adds an "\_Unsigned" attribute with a value of "true" or "false" to indicate if the data is from an unsigned or signed variable. All integer attributes are written as signed attributes (e.g., byte) with signed values (e.g., a ubyte actual\_range attribute with values 0 to 255, appears as a byte attribute with values 0 to -1 (the inverse of the two's complement value of the out-of-range value). There is no easy way to know which (signed) integer attributes should be read as unsigned attributes. ERDDAP™ supports the "\_Unsigned" attribute when it reads .nc3 files.
*   .nc3 files don't support the long or ulong data types. ERDDAP™ deals with this by temporarily converting them to be double variables. Doubles can exactly represent all values up to +/- 9,007,199,254,740,992 which is 2^53. This is an imperfect solution. Unidata refuses to make a minor upgrade to .nc3 to deal with this and related problems, citing .nc4 (a major change) as the solution.
*   The CF specification (before v1.9) said it supports a char data type but it is unclear if char is intended only as the building blocks of char arrays, which are effectively Strings. Questions to their mailing list yielded only confusing answers. Because of these complications, it is best to avoid char variables in ERDDAP™ and use String variables whenever possible.
*   Traditionally, .nc3 files only supported strings with ASCII-encoded (7-bit, #0 - #127) characters. NUG (and ERDDAP) extend that (starting ~2017) by including the attribute "\_Encoding" with a value of "ISO-8859-1" (an extension of ASCII which defines all 256 values of each 8-bit character) or "UTF-8" to indicate how the String data is encoded. Other encodings may be legal but are discouraged.  
         
#### .nc4 files {#nc4-files}
*   .nc4 files support all of ERDDAP's data types.  
    
#### NCCSV files {#nccsv-files}
NCCSV 1.0 files don't support any unsigned integer data types.  
[NCCSV 1.1+ files](/docs/user/nccsv-1.00) support all unsigned integer data types.  
     
#### DAP {#dap}
*   (OPeN)DAP (.das, .dds, .asc ASCII files, and .dods binary files) -
    *   (OPeN)DAP handles short, ushort, int, uint, float and double values correctly.
    *   (OPeN)DAP has a "byte" data type that it defines as unsigned, whereas historically, THREDDS and ERDDAP™ have treated "byte" as signed in their (OPeN)DAP services. To deal with this better, ERDDAP™ 2.10+ follows the NUG standard and always adds an "\_Unsigned" attribute with a value of "true" or "false" to indicate if the data is what ERDDAP™ calls byte or ubyte. All byte and ubyte attributes are written as "byte" attributes with signed values (e.g., a ubyte actual\_range attribute with values 0 to 255, appears as a byte attribute with values 0 to -1 (the inverse of the two's complement value of the out-of-range value). There is no easy way to know which "byte" attributes should be read as ubyte attributes.
    *   (OPeN)DAP does not support signed or unsigned longs. ERDDAP™ deals with this by temporarily converting them to be double variables and attributes. Doubles can exactly represent all values up to 9,007,199,254,740,992 which is 2^53. This is an imperfect solution. OPeNDAP (the organization) refuses to make a minor upgrade to DAP 2.0 to deal with this and related problems, citing DAP4 (a major change) as the solution.
    *   Because (OPeN)DAP has no separate char data type and technically only supports 1-byte ASCII characters (#0 - #127) in Strings, char data variables will appear as 1-character-long Strings in (OPeN)DAP .das, .dds, and .dods responses.
    *   Technically, the (OPeN)DAP specification only supports strings with ASCII-encoded characters (#0 - #127). NUG (and ERDDAP) extend that (starting ~2017) by including the attribute "\_Encoding" with a value of "ISO-8859-1" (an extension of ASCII which defines all 256 values of each 8-bit character) or "UTF-8" to indicate how the String data is encoded. Other encodings may be legal but are discouraged.  
         
### Data Type Comments {#data-type-comments}
*   Because of the poor support for long, ulong, and char data in many file types, we discourage the use of these data types in ERDDAP. When possible, use double instead of long and ulong, and use String instead of char.  
     
*   Metadata - Because (OPeN)DAP's .das and .dds responses don't support long or ulong attributes or data types (and instead show them as doubles), you may instead want to use ERDDAP's tabular representation of metadata as seen in the http.../erddap/**info**/*datasetID*.html web page (for example, [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) (which you can also get in other file types, e.g., .csv, .htmlTable, .itx, .json, .jsonlCSV1, .jsonlCSV, .jsonlKVP, .mat, .nc, .nccsv, .tsv, .xhtml) or the .nccsvMetadata response (for example, [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) although .nccsvMetadata is only available for tabular datasets), both of which supports all data types (notably, long, ulong, and char).  
         
### Media Files {#media-files}
Not all data are arrays of numbers or text. Some datasets consist of or include media files, such as image, audio and video files. ERDDAP™ has some special features to make it easier for users to get access to media files. It's a two step process:  
 

1.  Make each file accessible via its own URL, via a system that supports byte range requests.  
    The easiest way to do this is to put the files in a directory that ERDDAP™ has access to. (If they are in a container like a .zip file, unzip them, although you may want to offer the .zip file to users too.) Then, make an [EDDTableFromFileNames](#eddtablefromfilenames) dataset to make those files accessible via ERDDAP™, notably via ERDDAP's ["files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
    All files made accessible via EDDTableFromFileNames and ERDDAP's "files" system support [byte range requests](https://en.wikipedia.org/wiki/Byte_serving). Normally, when a client (e.g., a browser) makes a request to a URL, it gets the entire file as the response. But with a byte range request, the request specifies a range of bytes from the file, and the server only returns those bytes. This is relevant here because the audio and video players in browsers only work if the file can be accessed via byte range requests.
    
    Optional: If you have more than one dataset with associated media files, you can make just one EDDTableFromFileNames which has a subfolder for each group of files. The advantage is that when you want to add new media files for a new dataset, all you have to do is create a new folder and put the files in that folder. The folder and files will be automatically added to the EDDTableFromFileNames dataset.
    
2.  Optional: If you have a dataset which includes references to media files, add it to ERDDAP.  
    For example, you may have a .csv file with a row for each time someone saw a whale and a column which includes the name of an image file related to that sighting. If the name of the image file is just the filename, e.g., Img20141024T192403Z, not a full URL, then you need to add [fileAccessBaseUrl and/or fileAccessSuffix](#fileaccessbaseurl) attributes to the metadata for that dataVariable which specifies the baseURL and suffix for those filenames. If you made the files accessible via EDDTableFromFileNames, the URL will be in the form  
    *baseUrl*/erddap/files/*datasetID*/  
    For example,  
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
If there is a .zip or other container file with all of the media files related to a data variable, we recommend that you also make that file accessible to users (see step 1 above) and then identify it with a [fileAccessArchiveUrl](#fileaccessarchiveurl) attribute.
    

\[Starting in ERDDAP™ v1.82\] If you do the first step above (or both steps), then when a user views the ERDDAP™ "files" system for that dataset (or asks to see a subset of the dataset via an .htmlTable request, if you did the second step), ERDDAP™ will show a '?' icon to the left of the filename. If the user hovers over that icon, they will see a popup showing the image, or an audio player, or a video player. Browsers only support a limited number of types of

*   image (usually .gif, .jpg, and .png),
*   audio (usually .mp3, .ogg, and .wav), and
*   video files (usually .mp4, .ogv, and .webm).

Support varies with different versions of different browsers on different operating systems. So if you have a choice of which file type to offer, it makes sense to offer these types.

Or, if a user clicks on the filename shown on a ERDDAP™ web page, their browser will show the image, audio or video file as a separate web page. This is mostly useful to see a very large image or video scaled to full screen, instead of in a popup.
    
### Working with AWS S3 Files {#working-with-aws-s3-files}
[Amazon Web Service (AWS)](https://aws.amazon.com) is a seller of [cloud computing](https://en.wikipedia.org/wiki/Cloud_computing) services. [S3](https://aws.amazon.com/s3/) is an object storage system offered by AWS. Instead of the hierarchical system of directories and files of a traditional file system (like a hard drive in your PC), S3 offers just "buckets" which hold "objects" (we'll call them "files").

For ASCII files (e.g., .csv), ERDDAP™ can work with the files in the buckets directly. The only thing you need to do is specify the &lt;fileDir> for the dataset using a specific format for the AWS bucket, e.g., https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . You should not use &lt;cacheFromUrl> . See below for details.

But for binary files (e.g., .nc, .grib, .bufr, and .hdf files), you do need to use the &lt;cacheFromUrl> system described below. ERDDAP, netcdf-java (which ERDDAP™ uses to read data from these files), and other scientific data software are designed to work with files in a traditional file system which offers [block level](https://en.wikipedia.org/wiki/Block-level_storage) access to files (which permits reading chunks of a file), but S3 only offers [file level (object)](https://en.wikipedia.org/wiki/Block-level_storage) access to files (which only permits reading the entire file). AWS offers an alternative to S3, [Elastic Block Store (EBS)](https://aws.amazon.com/ebs/)), which supports block level access to files but it is more expensive than S3, so it is rarely used for bulk storage of large quantities of data files. (So when people say storing data in the cloud (S3) is cheap, it is usually an apples to oranges comparison.)

#### S3 Buckets {#s3-buckets}
**The Contents of a Bucket. Keys. Objects. Delimiters.**  
Technically, S3 buckets aren't organized in a hierarchical file structure like a file system on a computer. Instead, buckets only contain "objects" (files), each of which has a "key" (a name). An example of a key in that noaa-goes17 bucket is

```
ABI-L1b-RadC/2019/235/22/OR\_ABI-L1b-RadC-M6C01\_G17\_s20192352201196\_e20192352203569\_c20192352204013.nc
```
The corresponding URl for that object is

[https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\_ABI-L1b-RadC-M6C01\_G17\_s20192352201196\_e20192352203569\_c20192352204013.nc](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS supports a little variation in how that URL is constructed, but ERDDAP™ requires this one specific format:  
  https://*bucketName*.s3.*region*.amazonaws.com/*key*  
It is common practice, as with this example, to make key names look like a hierarchical path plus a file name, but technically they aren't. Since it is common and useful, ERDDAP™ treats keys with /'s as if they are a hierarchical path plus file name, and this documentation will refer to them as such. If a bucket's keys don't use /'s (e.g., a key like  
ABI-Lib.2018.052.22.OR\_ABI-L1b-RadM2-M3C10\_G16\_s20180522247575), then ERDDAP™ will just treat the whole key as a long file name.

Private vs Public Buckets -- The administrator for the S3 bucket may make the bucket and its contents public or private. If public, any file in the bucket may be downloaded by anyone using the URL for the file. Amazon has an [Open Data](https://aws.amazon.com/opendata/) program which hosts public datasets (including data from NOAA, NASA, and USGS) for free and doesn't charge for anyone to download the files from those buckets. If a bucket is private, files in the bucket are only accessible to authorized users and AWS charges a fee (usually paid by the bucket's owner) for downloading files to a non-AWS S3 computer. ERDDAP™ can work with data in public and private buckets.

#### AWS Credentials {#aws-credentials}
To make it so that ERDDAP™ can read the contents of private buckets, you need AWS credentials and you need to store a credentials file in the standard place so ERDDAP™ can find the information. See the AWS SDK for Java 2.x documentation: [Set default credentials](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (The option to store the values as Java command line parameters in \[tomcat\]/bin/setenv.sh may be a good option.)
#### AWS /files/ {#aws-files}
*   /files/ system -- The ERDDAP™ [/files/ system](#accessibleviafiles) allows users to download the source files for a dataset. We recommend that you turn this on for all datasets with source files because many users want to download the original source files.
    *   If the files are in a private S3 bucket, the user's request to download a file will be handled by ERDDAP™, which will read the data from the file and then transmit it to the user, thus increasing the load on your ERDDAP™, using incoming and outgoing bandwidth, and making you (the ERDDAP™ administrator) pay the data egress fee to AWS.
    *   If the files are in a public S3 bucket, the user's request to download a file will be redirected to the AWS S3 URL for that file, so the data won't flow through ERDDAP™, thus reducing the load on ERDDAP. And if the files are in an Amazon Open Data (free) public bucket, then you (the ERDDAP™ administrator) won't have to pay any data egress fee to AWS. Thus, there is a big advantage serving data from public (not private) S3 buckets, and a huge advantage to serving data from Amazon Open Data (free) buckets.

#### ERDDAP™ and AWS S3 Buckets {#erddap-and-aws-s3-buckets}
[**ERDDAP™ and AWS S3 Buckets**](#erddap-and-aws-s3-buckets)  
Fortunately, after much effort, ERDDAP™ has a number of features which allow it to deal with the inherent problems of working with S3's block level access to files in a reasonably efficient way:

*   \[Disclaimer: Working with AWS S3 buckets is a lot of extra work. AWS is a huge ecosystem of services and features. There's a lot to learn. It takes time and effort, but it is do-able. Be patient and you'll get things working. Look/ask for help  
    ([AWS documentation](https://aws.amazon.com/documentation/gettingstarted/), websites like [Stack Overflow](https://stackoverflow.com/), and the regular  
    [ERDDAP™ support options](/docs/intro#support)) if/when you get stuck.\]  
     
*   It can be hard to even find out the directory structure and file names of the files in an S3 bucket. ERDDAP™ has a solution for this problem: EDDTableFromFileNames has a special [\*\*\*fromOnTheFly](#fromonthefly) option which lets you make an EDDTableFromFileNames dataset which allows users to browse the contents of an S3 bucket (and download files) via the dataset's "files" option. There is an [example of this below](#viewing-the-contents-of-a-bucket).  
     
*   ERDDAP™ can read data from [externally compressed data files](#externally-compressed-files), so it is fine if the files on S3 are stored as .gz, .gzip, .bz2, .Z, or other types of externally compressed data files, which can dramatically (2 - 20X) cut down on file storage costs. There is often no time penalty for using externally compressed files, since the time saved by transferring a smaller file from S3 to ERDDAP roughly balances the extra time needed for ERDDAP™ to decompress the file. To use this feature, you just have to make sure that the dataset's &lt;fileNameRegex> allows for the compressed file type (e.g., by adding (|.gz) to the end of the regex).  
     
*   For the most common case, where you have an ERDDAP™ installed on your PC for test/development and where the dataset has binary data files which are stored as objects in an S3 bucket, one approach to getting the dataset in ERDDAP™ is:
    1.  Create a directory on your PC to hold a few test data files.
    2.  Download two data files from the source to the directory you just created.
    3.  Use [GenerateDatasetsXml](#generatedatasetsxml) to generate the chunk of datasets.xml for the dataset based on the two local data files.
    4.  Check that that dataset works as desired with [DasDds](#dasdds) and/or your local ERDDAP.
        
        **The following steps make a copy of that dataset (which will get data from the S3 bucket) on a public ERDDAP.**
        
    5.  Copy the chunk of datasets.xml for the dataset to the datasets.xml for the public ERDDAP™ that will serve the data.
    6.  Create a directory on the public ERDDAP's local hard drive to hold a cache of temporary files. The directory won't use a lot of disk space (see cacheSizeGB below).
    7.  Change the value of the dataset's &lt;fileDir> tag so that it points to the directory you just created (even though the directory is empty).
    8.  Add a [cacheFromUrl](#cachefromurl) tag which specifies the dataset's bucket name and optional prefix (i.e., directory) in the specific [Aws S3 URL Format that ERDDAP™ requires](#accessing-files-in-an-aws-s3-bucket).
    9.  Add a [&lt;cacheSizeGB>](#cachefromurl) tag to the dataset's xml (e.g., 10 is a good value for most datasets) to tell ERDDAP™ to limit the size of the local cache (i.e., don't try to cache all of the remote files).
    10.  See if that works in the public ERDDAP. Note that the first time ERDDAP™ loads the dataset, it will take a long time to load, because ERDDAP™ needs to download and read all of the data files.
        
        If the dataset is a huge collection of huge gridded data files, this will take a very long time and be impractical. In some cases, for gridded data files, ERDDAP™ can extract the needed information (e.g., the time point for the data in a gridded data file) from the file name and avoid this problem. See [Aggregation via File Names](#aggregation-via-file-names-or-global-metadata).
        
    11.  Optionally (but especially for EDDTableFromFiles datasets), you can add an [nThreads](#nthreads) tag to the dataset to tell ERDDAP to use more than 1 thread when responding to a user's request for data. This minimizes the effects of the delay that occurs when ERDDAP™ reads data files from (remote) AWS S3 buckets into the local cache and (perhaps) decompressing them.

#### AWS S3 Open Data {#aws-s3-open-data}
As part of NOAA's [Big Data Program](https://www.noaa.gov/nodd/about), NOAA has partnerships with five organizations, including AWS, "to explore the potential benefits of storing copies of key observations and model outputs in the Cloud to allow computing directly on the data without requiring further distribution". AWS includes the datasets it gets from NOAA as part of its program to offer public access to a large collection of [Open Data on AWS S3](https://registry.opendata.aws/) from any computer, whether it is an Amazon compute instance (a rented computer) on the AWS network or your own PC on any network. The example below assumes you are working with a publicly accessible dataset.

#### Accessing Files in an AWS S3 Bucket {#accessing-files-in-an-aws-s3-bucket}
For a private S3 data bucket, the bucket's owner must give you access to the bucket. (See the AWS documentation.)

In all cases, you will need an AWS account because the AWS SDK for Java (which ERDDAP™ uses to retrieve information about the contents of a bucket) requires AWS account credentials. (more on this below)

ERDDAP™ can only access AWS S3 buckets if you specify the [&lt;cacheFromUrl>](#cachefromurl) (or &lt;fileDir>) in a specific format:  
https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*  
where

*   The bucketName is the short form of the bucket name, e.g. noaa-goes17 .
*   The aws-region, e.g., us-east-1, is from the "Region" column in one of the tables of [AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html) where the bucket is actually located.
*   The prefix is optional. If present, it must end with '/'.

For example, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
This URL format is one of the AWS S3 recommendations: see [Accessing a Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) and [this description of prefixes](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html). ERDDAP™ requires that you combine the bucket URL and the optional prefix into one URL in order to specify the &lt;cacheFromUrl> (or &lt;fileDir>) where the files are located.

#### Test Public AWS S3 Buckets {#test-public-aws-s3-buckets}
For public buckets, you can and should test the bucket URL of the AWS S3 directory in your browser, e.g.,  
[https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) If the bucket URL is correct and appropriate for ERDDAP, it will return an XML document which has (partial) listing of the contents of that bucket. Unfortunately, the full URL (i.e., bucket URL plus prefix) that ERDDAP™ wants for a given dataset doesn't work in a browser. AWS doesn't offer a system to browse the hierarchy of a bucket easily in your browser. (If that is incorrect, please email Chris.John at noaa.gov. Otherwise, Amazon, please add support for this!)

#### Viewing the Contents of a Bucket {#viewing-the-contents-of-a-bucket}
S3 buckets often contain a couple of categories of files, in a couple of pseudo subdirectories, which could become a couple of ERDDAP™ datasets. To make the ERDDAP™ datasets, you need to know the starting directory for &lt;cacheFromUrl> (or &lt;fileDir>) and the format of the file names which identify that subset of files. If you try to view the entire contents of a bucket in a browser, S3 will just show you the first 1000 files, which is insufficient. Currently, the best way for you to view all of the contents of a bucket is to make an [EDDTableFromFileNames](#eddtablefromfilenames) dataset (on your PC's ERDDAP™ and/or on your public ERDDAP), which also gives you an easy way to browse the directory structure and download files. The &lt;fileDir> for that will be the URL you made above, e.g., https://noaa-goes17.s3.us-east-1.amazonaws.com . \[Why doesn't AWS S3 offer a quick and easy way for anyone to do this without an AWS account?\] Note that when I do this on my PC on a non-Amazon network, it appears that Amazon slows down the response to a trickle (about 100(?) files per chunk) after the first few chunks (of 1000 of files per chunk) are downloaded. Since buckets may have a huge number of files (noaa-goes17 has 26 million), getting all of the contents of a bucket may take EDDTableFromFileNames several hours (e.g., 12!) to finish. \[Amazon, is that right?!\]

#### Making an EDDTableFromFileNames Dataset with an AWS S3 Bucket {#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket}
If you have a bucket name, but don't already have a list of files in the S3 bucket or the prefix that identifies location of the relevant files in the bucket, use the instructions below to make an EDDTableFromFileNames dataset so you can browse the directory hierarchy of the S3 bucket via ERDDAP's "files" system.

1.  Open an AWS Account  
    ERDDAP™ uses the [AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/index.html) to get bucket information from AWS, so you need to [create and activate an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). That's a pretty big job, with lots of things to learn.  
     
2.  Put your AWS Credentials where ERDDAP™ can find them.  
    Follow the instructions at [Set up AWS Credentials and Region for Development](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials) so ERDDAP™ (specifically, the AWS SDK for Java) will be able to find and use your AWS credentials. If ERDDAP™ can't find the credentials, you will see a  
    java.lang.IllegalArgumentException: profile file cannot be null error in ERDDAP's log.txt file.
    
    Hint for Linux and Mac OS: the credentials file must be in the home directory of the user that is running Tomcat (and ERDDAP) (for this paragraph, we'll assume user=tomcat) in a file called ~/.aws/credentials . Don't assume that ~ is /home/tomcat -- actually use cd ~ to find out where the operating system thinks ~ for user=tomcat is. Create the directory if it doesn't exist. Also, after you put the credentials file in place, make sure the user and group for the file are tomcat and then use chmod 400 credentials to make sure the file is read-only for user=tomcat.
    
3.  Create the bucket URL in the [format that ERDDAP™ requires](#accessing-files-in-an-aws-s3-bucket), e.g.,  
    [https://noaa-goes17.s3.us-east-1.amazonaws.com](https://noaa-goes17.s3.us-east-1.amazonaws.com) , and (for public buckets) test it in a browser to make sure it returns an XML document which has a partial listing the contents of that bucket.  
     
4.  Use [GenerateDatasetsXml](#generatedatasetsxml) to create an [EDDTableFromFileNames](#eddtablefromfilenames) dataset:
    *     For the Starting directory, use this syntax:  
        \*\*\*fromOnTheFly,*yourBucketUrl*  
        for example,  
        \*\*\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/
    *   File name regex? .\*
    *   Recursive? true
    *   reloadEveryNMinutes? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
    *   institution? NOAA
    *   summary? nothing (ERDDAP™ will create a decent summary automatically.)
    *   title? nothing     (ERDDAP™ will create a decent title automatically.)As usual, you should edit the resulting XML to verify correctness and make improvements before the chunk of datasets using it in datasets.xml.
5.  If you follow the instructions above and load the dataset in ERDDAP, you have created an EDDTableFromFiles dataset. As an example, and to make it easier for anyone to browse and download files from the AWS Open Data buckets, we have created EDDTableFromFileNames datasets (see the list at  
    [https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\_](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) for almost all of the [AWS S3 Open Data buckets](https://registry.opendata.aws/).  
    \[The few buckets that we didn't include either have a large number of files in the root directory (more than can be downloaded in a reasonable amount of time), or don't allow public access (aren't they all supposed to be public?), or are Requester Pays buckets (e.g., Sentinel).\]  
    If you click on the "files" link for one of these datasets, you can browse the directory tree and files in that S3 bucket. Because of the way \*\*\*fromOnTheFly EDDTableFromFiles works, these directory listings are always perfectly up-to-date because ERDDAP™ gets them on-the-fly. If you click down the directory tree to an actual file name and click on the file name, ERDDAP™ will redirect your request to AWS S3 so that you can download the file directly from AWS. You can then inspect that file.
    
    Trouble?  
    If your EDDTableFromFiles won't load in ERDDAP™ (or DasDds), look in the log.txt file for an error message. If you see a  
    java.lang.IllegalArgumentException: profile file cannot be null error, the problem is that the AWS SDK for Java (used by ERDDAP) isn't finding the credentials file. See the credentials instructions above.  
     

It is unfortunate that AWS doesn't simply allow people to use a browser to view the contents of a public bucket.

**Then you can make ERDDAP™ datasets that give users access to the data in the files.**  
See the instructions in [ERDDAP™ and S3 Buckets](#erddap-and-aws-s3-buckets) (above).  
For the sample EDDTableFromFileNames dataset that you made above, if you do a little poking around with the directory and file names in the directory tree, it becomes clear that the top level directory names (e.g., ABI-L1b-RadC) correspond to what ERDDAP™ would call separate datasets. The bucket you are working with may be similar. You could then pursue creating separate datasets in ERDDAP™ for each of those datasets, using, e.g.,  
https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/  
as the &lt;cacheFromUrl>. Unfortunately, for this particular example, the datasets in the bucket all seem to be level 1 or level 2 datasets, which ERDDAP™ [isn't particularly good at](#dimensions), because the dataset is a more complicated collection of variables which use different dimensions.  
     
    
### NcML files {#ncml-files}
NcML files let you specify on-the-fly changes to one or more original source NetCDF (v3 or v4) .nc, .grib, .bufr, or .hdf (v4 or v5) files, and then have ERDDAP™ treat the .ncml files as the source files. ERDDAP™ datasets will accept .ncml files whenever .nc files are expected. The NcML files MUST have the extension .ncml. See the [Unidata NcML documentation](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML is useful because you can do some things with it (for example, making different changes to different files in a collection, including adding a dimension with a specific value to a file), that you can't do with ERDDAP's datasets.xml.

*   Changes to an .ncml file's lastModified time will cause the file to be reloaded whenever the dataset is reloaded, but changes to the underlying .nc data files won't be directly noticed.
*   Hint: NcML is \*very\* sensitive to the order of some items in the NcML file. Think of NcML as specifying a series of instructions in the specified order, with the intention of changing the source files (the state at the start/top of the NcML file) into the destination files (the state at the end/bottom of the NcML file).

An alternative to NcML is the [NetCDF Operators (NCO)](#netcdf-operators-nco). The big difference is that NcML is a system for making changes on-the-fly (so the source files aren't altered), whereas NCO can be used to make changes to (or new versions of) the files. Both NCO and NcML are very, very flexible and allow you to make almost any change you can think of to the files. For both, it can be challenging to figure out exactly how to do what you want to do -- check the web for similar examples. Both are useful tools for preparing netCDF and HDF files for use with ERDDAP, notably, to make changes beyond what ERDDAP's manipulation system can do.

Example #1: Adding a Time Dimension with a Single Value  
Here's an .ncml file that creates a new outer dimension (time, with 1 value: 1041379200) and adds that dimension to the pic variable in the file named A2003001.L3m\_DAY\_PIC\_pic\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\_DAY\_PIC\_pic\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Example #2: Changing an Existing Time Value  
Sometimes the source .nc file already has a time dimension and time value, but the value is incorrect (for your purposes). This .ncml file says: for the data file named ""19810825230030-NCEI...", for the dimension variable "time", set the units attribute to be 'seconds since 1970-01-01T00:00:00Z' and set the time value to be 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\_GHRSST-SSTskin-AVHRR\_Pathfinder-PFV5.3\_NOAA07\_G\_1981237\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDF Operators (NCO) {#netcdf-operators-nco}
"The netCDF Operators (NCO) comprise a dozen standalone, command-line programs that take netCDF \[v3 or v4\], HDF \[v4 or v5\], \[.grib, .bufr,\] and/or DAP files as input, then operate (e.g., derive new data, compute statistics, print, hyperslab, manipulate metadata) and output the results to screen or files in text, binary, or netCDF formats. NCO aids analysis of gridded scientific data. The shell-command style of NCO allows users to manipulate and analyze files interactively, or with expressive scripts that avoid some overhead of higher-level programming environments." (from the [NCO](https://nco.sourceforge.net/) homepage).

An alternative to NCO is [NcML](#ncml-files). The big difference is that NcML is a system for making changes on-the-fly (so the source files aren't altered), whereas NCO can be used to make changes to (or new versions of) the files. Both NCO and NcML are very, very flexible and allow you to make almost any change you can think of to the files. For both, it can be challenging to figure out exactly how to do what you want to do -- check the web for similar examples. Both are useful tools for preparing netCDF and HDF files for use with ERDDAP, notably, to make changes beyond what ERDDAP's manipulation system can do.

For example, you can use NCO to make the units of the time variable consistent in a group of files where they weren't consistent originally. Or, you can use NCO to apply scale\_factor and add\_offset in a group of files where scale\_factor and add\_offset have different values in different source files.  
(Or, you can now deal with those problems in ERDDAP™ via [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked), which is a variant of EDDGridFromNcFiles which unpacks packed data and standardizes time values at a low level in order to deal with a collection files that have different scale\_factors and add\_offset, or different time units.)

NCO is Free and Open Source Software which uses the [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html) license.

Example #1: Making Units Consistent  
EDDGridFromFiles and EDDTableFrom Files insist that the units for a given variable be identical in all of the files. If some of the files are trivially (not functionally) different from others (e.g., time units of  
"seconds since 1970-01-01 00:00:00 UTC" versus  
"seconds since 1970-01-01T00:00:00Z", you could use NCO's [ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). to change the units in all of the files to be identical with  
nco/ncatted -a units,time,o,c,'seconds since 1970-01-01T00:00:00Z' \*.nc  
\[For many problems like this in EDDTableFrom...Files datasets, you can now use [standardizeWhat](#standardizewhat) to tell ERDDAP to standardize the source files as they are read into ERDDAP.\]
    
### Limits to the Size of a Dataset {#limits-to-the-size-of-a-dataset}
You'll see many references to "2 billion" below. More accurately, that is a reference to 2,147,483,647 (2^31-1), which is the maximum value of a 32-bit signed integer. In some computer languages, for example Java (which ERDDAP™ is written in), that is the largest data type that can be used for many data structures (for example, the size of an array).

For String values (for example, for variable names, attribute names, String attribute values, and String data values), the maximum number of characters per String in ERDDAP™ is ~2 billion. But in almost all cases, there will be small or large problems if a String exceeds a reasonable size (e.g., 80 characters for variable names and attribute names, and 255 characters for most String attribute values and data values). For example, web pages which display long variable names will be awkwardly wide and long variable names will be truncated if they exceed the limit of the response file type.

For gridded datasets:

*   The maximum number of axisVariables is ~2 billion.  
    The maximum number of dataVariables is ~2 billion.  
    But if a dataset has >100 variables, it will be cumbersome for users to use.  
    And if a dataset has >1 million variables, your server will need a lot of physical memory and there will be other problems.
*   The maximum size of each dimension (axisVariable) is ~2 billion values.
*   I think the maximum total number of cells (the product of all dimension sizes) is unlimited, but it may be ~9e18.

For tabular datasets:

*   The maximum number of dataVariables is ~2 billion.  
    But if a dataset has >100 variables, it will be cumbersome for users to use.  
    And if a dataset has >1 million variables, your server will need a lot of physical memory and there will be other problems.
*   The maximum number of sources (for example, files) that can be aggregated is ~2 billion.
*   In some cases, the maximum number of rows from an individual source (for example, a file, but not a database) is ~2 billion rows.
*   I don't think there are other limits.

For both gridded and tabular datasets, there are some internal limits on the size of the subset that can be requested by a user in a single request (often related to >2 billion of something or ~9e18 of something), but it is far more likely that a user will hit the file-type-specific limits.

*   NetCDF version 3 .nc files are limited to 2GB bytes. (If this is really a problem for someone, let me know: I could add support for the NetCDF version 3 .nc 64-bit extension or NetCDF Version 4, which would increase the limit significantly, but not infinitely.)
*   Browsers crash after only ~500MB of data, so ERDDAP™ limits the response to .htmlTable requests to ~400MB of data.
*   Many data analysis programs have similar limits (for example, the maximum size of a dimension is often ~2 billion values), so there is no reason to work hard to get around the file-type-specific limits.
*   The file-type-specific limits are useful in that they prevent naive requests for truly huge amounts of data (for example, "give me all of this dataset" when the dataset has 20TB of data), which would take weeks or months to download. The longer the download, the more likely it will fail for a variety of reasons.
*   The file-type-specific limits are useful in that they force the user to deal with reasonably-sized subsets (for example, dealing with a large gridded dataset via files with data from one time point each).  
         
### Switch to ACDD-1.3 {#switch-to-acdd-13}
We (notably [GenerateDatasetsXml](#generatedatasetsxml)) currently recommend [ACDD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), which was ratified in early 2015 and which is referred to as "ACDD-1.3" in the global Conventions attribute. Prior to ERDDAP™ version 1.62 (released in June 2015), ERDDAP™ used/recommended the original, version 1.0, of the [NetCDF Attribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) which was referred to as "Unidata Dataset Discovery v1.0" in the global Conventions and Metadata\_Conventions attributes.

If your datasets use earlier versions of ACDD, we RECOMMEND that you switch to ACDD-1.3. It isn't hard. ACDD-1.3 is highly backward compatible with version 1.0. To switch, for all datasets (except EDDGridFromErddap and EDDTableFromErddap datasets):

1.  Remove the newly deprecated global Metadata\_Conventions attribute by adding (or by changing the existing Metadata\_Conventions attribute)  
```
        <att name="Metadata\_Conventions">null</att>  
```
    to the dataset's global &lt;addAttributes>.  
     
2.  If the dataset has a Conventions attribute in the global &lt;addAttributes>, change all "Unidata Dataset Discovery v1.0" references to "ACDD-1.3".  
    If the dataset doesn't have a Conventions attribute in the global &lt;addAttributes>, then add one that refers to ACDD-1.3. For example,  
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3.  If the dataset has a global standard\_name\_vocabulary attribute, please change the format of the value to, for example,  
```
        <att name="standard\_name\_vocabulary">CF Standard Name Table v65</att>  
```
    If the reference is to an older version of the [CF standard name table](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). it is probably a good idea to switch to the current version (65, as we write this), since new standard names are added to that table with subsequent versions, but old standard names are rarely deprecated and never removed.  
     
4.  Although ACDD-1.0 included global attributes for creator\_name, creator\_email, creator\_url, [GenerateDatasetsXml](#generatedatasetsxml) didn't automatically add them until sometime around ERDDAP™ v1.50. This is important information:
        
    *   creator\_name lets users know/cite the creator of the dataset.
    *   creator\_email tells users the preferred email address for contacting the creator of the dataset, for example if they have questions about the dataset.
    *   creator\_url gives users a way to find out more about the creator.
    *   ERDDAP™ uses all of this information when generating FGDC and ISO 19115-2/19139 metadata documents for each dataset. Those documents are often used by external search services.
    
    Please add these attributes to the dataset's global &lt;addAttributes>.  
```
        <att name="creator\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\_email">erd.data@noaa.gov</att>  
        <att name="creator\_url">https://www.pfeg.noaa.gov</att>  
```
    
That's it. I hope that wasn't too hard.  
     
### Zarr {#zarr}
As of version 2.25 ERDDAP™ can read local Zarr files using [EDDTableFromNcFiles](#eddtablefromncfiles) and [EDDGridFromNcFiles](#eddgridfromncfiles).

(As of August 2019) We could easily be wrong, but we are not yet convinced that [Zarr](https://github.com/zarr-developers/zarr-python), or similar systems which break data files up into smaller chunks, are great solutions to the problem of ERDDAP™ reading data stored in cloud services like Amazon AWS S3. Zarr is a great technology that has shown its usefulness in a variety of situations, we're just not sure that ERDDAP+S3 will be one of those situations. Mostly we're saying: before we rush to make the effort to store all our data in Zarr, let's do some tests to see if it is actually a better solution.

The problems with accessing data in the cloud are latency (the lag to first get data) and file-level access (rather than block-level access). Zarr solves the file-level access problem, but does nothing about latency. Compared to just downloading the file (so it can be read as a local file with block-level access), Zarr may even exacerbate the latency problem because, with Zarr, reading a file now involves a series of several calls to read different parts of the file (each with its own lag). The latency problem can be solved by parallelizing the requests, but that is a higher-level solution, not dependent on Zarr.

And with Zarr (as with relational databases), we lose the convenience of having a data file be a simple, single file that you can easily verify the integrity of, or make/download a copy of.

ERDDAP™ (as of v2) has a system for maintaining a local cache of files from a URL source (e.g., S3) (see [&lt;cacheFromUrl> and &lt;cacheMaxGB>](#cachefromurl)). And the new [&lt;nThreads>](#nthreads) should minimize the latency problem by parallelizing data retrieval at a high level. &lt;cacheFromUrl> seems to work very well for many scenarios. (We're not sure how beneficial &lt;nThreads> is without further tests.) We admit we haven't done timing tests on an AWS instance with a good network connection, but we have successfully tested with various remote URL sources of files. And ERDDAP's &lt;cacheFromUrl> works with any type of data file (e.g., .nc, .hdf, .csv, .jsonlCSV), even if externally compressed (e.g., .gz), without any changes to the files (e.g., rewriting them as Zarr collections).

It is likely that different scenarios will favor different solutions, e.g., only need to read part of a file once (Zarr will win), vs. need to read all of a file once, vs. need to read part or all of a file repeatedly (&lt;cacheFromUrl> will win).

Mostly we're saying: before we rush to make the effort to store all our data in Zarr, let's do some tests to see if it is actually a better solution.

- - -
## List of Types Datasets {#list-of-types-datasets}
If you need help choosing the right dataset type, see [Choosing the Dataset Type](#choosing-the-dataset-type).

The types of datasets fall into two categories. ([Why?](#why-just-two-basic-data-structures))

### EDDGrid {#eddgrid}
*   [**EDDGrid**](#eddgrid) datasets handle gridded data.
    *   In EDDGrid datasets, data variables are multi-dimensional arrays of data.
    *   There MUST be an axis variable for each dimension. Axis variables MUST be specified in the order that the data variables use them.
    *   In EDDGrid datasets, all data variables MUST use (share) all of the axis variables.  
        ([Why?](#why-just-two-basic-data-structures) [What if they don't?](#dimensions))
    *   Sorted Dimension Values - In all EDDGrid datasets, each dimension MUST be in sorted order (ascending or descending). Each can be irregularly spaced. There can be no ties. This is a requirement of the [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). If any dimension's values aren't in sorted order, the dataset won't be loaded and ERDDAP™ will identify the first unsorted value in the log file, *bigParentDirectory*/logs/log.txt .
        
        A few subclasses have additional restrictions (notably, EDDGridAggregateExistingDimension requires that the outer (leftmost, first) dimension be ascending.
        
        Unsorted dimension values almost always indicate a problem with the source dataset. This most commonly occurs when a misnamed or inappropriate file is included in the aggregation, which leads to an unsorted time dimension. To solve this problem, see the error message in the ERDDAP™ log.txt file to find the offending time value. Then look in the source files to find the corresponding file (or one before or one after) that doesn't belong in the aggregation.
        
    *   See the more complete description of the [EDDGrid data model](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    *   The EDDGrid dataset types are:
        *   [EDDGridFromAudioFiles](#eddfromaudiofiles) aggregates data from a group of local audio files.
        *   [EDDGridFromDap](#eddgridfromdap) handles gridded data from DAP servers.
        *   [EDDGridFromEDDTable](#eddgridfromeddtable) lets you convert a tabular dataset into a gridded dataset.
        *   [EDDGridFromErddap](#eddfromerddap) handles gridded data from a remote ERDDAP.
        *   [EDDGridFromEtopo](#eddgridfrometopo) just handles the built-in ETOPO topography data.
        *   [EDDGridFromFiles](#eddgridfromfiles) is the superclass of all EDDGridFrom...Files classes.
        *   [EDDGridFromMergeIRFiles](#eddgridfrommergeirfiles) aggregates data from a group of local MergeIR .gz files.
        *   [EDDGridFromNcFiles](#eddgridfromncfiles) aggregates data from a group of local NetCDF (v3 or v4) .nc and related files.
        *   [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked) is a variant if EDDGridFromNcFiles which also aggregates data from a group of local NetCDF (v3 or v4) .nc and related files, which ERDDAP™ unpacks at a low level.
        *   [EDDGridLonPM180](#eddgridlonpm180) modifies the longitude values of a child EDDGrid so that they are in the range -180 to 180.
        *   [EDDGridLon0360](#eddgridlon0360) modifies the longitude values of a child EDDGrid so that they are in the range 0 to 360.
        *   [EDDGridSideBySide](#eddgridsidebyside) aggregates two or more EDDGrid datasets side by side.
        *   [EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension) aggregates two or more EDDGrid datasets, each of which has a different range of values for the first dimension, but identical values for the other dimensions.
        *   [EDDGridCopy](#eddgridcopy) can make a local copy of another EDDGrid's data and serves data from the local copy.  
             
    *   All EDDGrid datasets support an nThreads setting, which tells ERDDAP™ how many threads to use when responding to a request. See the [nThreads](#nthreads) documentation for details.  
         
### EDDTable {#eddtable}
*   [**EDDTable**](#eddtable) datasets handle tabular data.
    *   Tabular data can be represented as a database-like table with rows and columns. Each column (a data variable) has a name, a set of attributes, and stores just one type of data. Each row has an observation (or group of related values). The data source may have the data in a different data structure, a more complicated data structure, and/or multiple data files, but ERDDAP™ needs to be able to flatten the source data into a database-like table in order to present the data as a tabular dataset to users of ERDDAP.
    *   See the more complete description of the [EDDTable data model](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    *   The EDDTable dataset types are:
        *   [EDDTableFromAllDatasets](#eddtablefromalldatasets) is a higher-level dataset which has information about all the other datasets in your ERDDAP.
        *   [EDDTableFromAsciiFiles](#eddtablefromasciifiles) aggregates data from comma-, tab-, semicolon-, or space-separated tabular ASCII data files.
        *   [EDDTableFromAsciiService](#eddtablefromasciiservice) is the superclass of all EDDTableFromAsciiService... classes.
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) handles data from some of the NOAA NOS web services.
        *   [EDDTableFromAudioFiles](#eddfromaudiofiles) aggregates data from a group of local audio files.
        *   [EDDTableFromAwsXmlFiles](#eddtablefromawsxmlfiles) aggregates data from a set of Automatic Weather Station (AWS) XML files.
        *   [EDDTableFromCassandra](#eddtablefromcassandra) handles tabular data from one Cassandra table.
        *   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) aggregates data from tabular ASCII data files with fixed-width data columns.
        *   [EDDTableFromDapSequence](#eddtablefromdapsequence) handles tabular data from DAP sequence servers.
        *   [EDDTableFromDatabase](#eddtablefromdatabase) handles tabular data from one database table.
        *   [EDDTableFromEDDGrid](#eddtablefromeddgrid) lets you create an EDDTable dataset from an EDDGrid dataset.
        *   [EDDTableFromErddap](#eddfromerddap) handles tabular data from a remote ERDDAP.
        *   [EDDTableFromFileNames](#eddtablefromfilenames) creates a dataset from information about a group of files in the server's file system, but it doesn't serve data from within the files.
        *   [EDDTableFromFiles](#eddtablefromfiles) is the superclass of all EDDTableFrom...Files classes.
        *   [EDDTableFromHttpGet](#eddtablefromhttpget) is ERDDAP's only system for data import as well as data export.
        *   [EDDTableFromHyraxFiles](#eddtablefromhyraxfiles) (DEPRECATED) aggregates data from files with several variables with shared dimensions served by a [Hyrax OPeNDAP server](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) aggregates data from NetCDF (v3 or v4) .nc files which use a specific, invalid, variant of the CF DSG Contiguous Ragged Array (CRA) files. Although ERDDAP™ supports this file type, it is an invalid file type that no one should start using. Groups that currently use this file type are strongly encouraged to use ERDDAP™ to generate valid CF DSG CRA files and stop using these files.
        *   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles) aggregates data from [JSON Lines CSV files](https://jsonlines.org/examples/).
        *   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) aggregates data from NetCDF (v3 or v4) .nc files with several variables with shared dimensions.
        *   [EDDTableFromNcFiles](#eddtablefromncfiles) aggregates data from NetCDF (v3 or v4) .nc files with several variables with shared dimensions. It is fine to continue using this dataset type for existing datasets, but for new datasets we recommend using EDDTableFromMultidimNcFiles instead.
        *   [EDDTableFromNcCFFiles](#eddtablefromnccffiles) aggregates data from NetCDF (v3 or v4) .nc files which use one of the file formats specified by the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) conventions. But for files using one of the multidimensional CF DSG variants, use [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) instead.
        *   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles) aggregates data from [NCCSV](/docs/user/nccsv-1.00) ASCII .csv files.
        *   [EDDTableFromNOS](#eddtablefromnos) (DEPRECATED) handles tabular data from NOS XML servers.
        *   [EDDTableFromOBIS](#eddtablefromobis) handles tabular data from OBIS servers.
        *   [EDDTableFromParquetFiles](#eddtablefromparquetfiles) handles data from [Parquet](https://parquet.apache.org/).
        *   [EDDTableFromSOS](#eddtablefromsos) handles tabular data from SOS servers.
        *   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles) (DEPRECATED) aggregates data from files with several variables with shared dimensions served by a [THREDDS OPeNDAP server](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTableFromWFSFiles](#eddtablefromwfsfiles) (DEPRECATED) makes a local copy of all of the data from an ArcGIS MapServer WFS server so the data can then be re-served quickly to ERDDAP™ users.
        *   [EDDTableAggregateRows](#eddtableaggregaterows) can make an EDDTable dataset from a group of EDDTable datasets.
        *   [EDDTableCopy](#eddtablecopy) can make a local copy of many types of EDDTable datasets and then re-serve the data quickly from the local copy.

  
- - -

## Detailed Descriptions of Dataset Types {#detailed-descriptions-of-dataset-types}

### EDDGridFromDap {#eddgridfromdap}
[**EDDGridFromDap**](#eddgridfromdap) handles grid variables from [DAP](https://www.opendap.org/) servers.

*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can gather the information you need to tweak that or create your own XML for an EDDGridFromDap dataset by looking at the source dataset's DDS and DAS files in your browser (by adding .das and .dds to the sourceUrl, for example, [https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)).  
     
*   EDDGridFromDap can get data from any multi-dimensional variable from a DAP data server. (Previously, EDDGridFromDap was limited to variables designated as "grid"'s, but that is no longer a requirement.)  
     
*   Sorted Dimension Values - The values for each dimension MUST be in sorted order (ascending or descending). The values can be irregularly spaced. There can be no ties. This is a requirement of the [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). If any dimension's values aren't in sorted order, the dataset won't be loaded and ERDDAP™ will identify the first unsorted value in the log file, *bigParentDirectory*/logs/log.txt .
    
    Unsorted dimension values almost always indicate a problem with the source dataset. This most commonly occurs when a misnamed or inappropriate file is included in the aggregation, which leads to an unsorted time dimension. To solve this problem, see the error message in the ERDDAP™ log.txt file to find the offending time value. Then look in the source files to find the corresponding file (or one before or one after) that doesn't belong in the aggregation.
    
#### EDDGridFromDap skeleton XML {#eddgridfromdap-skeleton-xml}

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridFromEDDTable {#eddgridfromeddtable}
[**EDDGridFromEDDTable**](#eddgridfromeddtable) lets you convert an EDDTable tabular dataset into an EDDGrid gridded dataset. Remember that ERDDAP™ treats datasets as either [gridded datasets (subclasses of EDDGrid) or tabular datasets (subclasses of EDDTable)](#why-just-two-basic-data-structures).

*   Normally, if you have gridded data, you just set up an EDDGrid dataset directly. Sometimes this isn't possible, for example, when you have the data stored in a relational database that ERDDAP™ can only access via EDDTableFromDatabase. EDDGridFromEDDTable class lets you remedy that situation.  
     
*   Obviously, the data in the underlying EDDTable dataset must be (basically) gridded data, but in a tabular form. For example, the EDDTable dataset may have CTD data: measurements of eastward and northward current, at several depths, at several times. Since the depths are the same at each time point, EDDGridFromEDDTable can create a gridded dataset with a time and a depth dimension which accesses the data via the underlying EDDTable dataset.  
     
*   GenerateDatasetsXml -- We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can gather the information you need to improve the rough draft.  
     
*   Source Attributes -- As with all other types of datasets, EDDGridFromTable has the idea that there are global sourceAttributes and [global addAttributes](#global-attributes) (specified in datasets.xml), which are combined to make the global combinedAttributes, which are what users see. For global sourceAttributes, EDDGridFromEDDTable uses the global combinedAttributes of the underlying EDDTable dataset. (If you think about it for a minute, it makes sense.)
    
    Similarly, for each axisVariable's and dataVariable's [addAttributes](#addattributes), EDDGridFromEDDTable uses the variable's combinedAttributes from the underlying EDDTable dataset as the EDDGridFromEDDTable variable's sourceAttributes. (If you think about it for a minute, it makes sense.)
    
    As a consequence, if the EDDTable has good metadata, the EDDGridFromEDDTable often needs very little addAttributes metadata -- just a few tweaks here and there.
    
*   dataVariables versus axisVariables -- The underlying EDDTable has only dataVariables. An EDDGridFromEDDTable dataset will have some axisVariables (created from some of the EDDTable dataVariables) and some dataVariables (created from the remaining EDDTable dataVariables). [GenerateDatasetsXml](#generatedatasetsxml) will make a guess as to which EDDTable dataVariables should become EDDGridFromEDDTable axisVariables, but it is just a guess. You need to modify the output of GenerateDatasetsXml to specify which dataVariables will become axisVariables, and in which order.  
     
*   axisValues -- There is nothing about the underlying EDDTable to tell EDDGridFromEDDTable the possible values of the axisVariables in the gridded version of the dataset, so you MUST provide that information for each axisVariable via one of these attributes:
    
    *   axisValues -- lets you specify a list of values. For example,  
        &lt;att name="axisValues" [type="doubleList"](#attributetype)\>2, 2.5, 3, 3.5, 4&lt;/att>  
        Note the use of a [data type](#data-types) plus the word List. Also, the type of list (for example, double), MUST match the dataType of the variable in the EDDTable and EDDGridFromEDDTable datasets.
    *   axisValuesStartStrideStop -- lets you specify a sequence of regularly spaced values by specifying the start, stride, and stop values. Here is an example that is equivalent to the axisValues example above:  
        &lt;att name="axisValuesStartStrideStop" [type="doubleList"](#attributetype)\>2, 0.5, 4&lt;/att>  
        Again, note the use of a list data type. Also, the type of list (for example, double), MUST match the dataType of the variable in the EDDTable and EDDGridFromEDDTable datasets.  
         
    
    Updates -- Just as there is no way for EDDGridFromEDDTable to determine the axisValues from the EDDTable initially, there is also no reliable way for EDDGridFromEDDTable to determine from the EDDTable when the axisValues have changed (notably, when there are new values for the time variable). Currently, the only solution is to change the axisValues attribute in datasets.xml and reload the dataset. For example, you could write a script to
    
    1.  Search datasets.xml for  
        datasetID="*theDatasetID*"  
        so you are working with the correct dataset.
    2.  Search datasets.xml for the next occurrence of  
        <sourceName>*theVariablesSourceName*</sourceName>  
        so you are working with the correct variable.
    3.  Search datasets.xml for the next occurrence of  
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
        so you know the start position of the tag.
    4.  Search datasets.xml for the next occurrence of  
```
        </att>  
```
        so you know the end position of the axis values.
    5.  Replace the old start, stride, stop values with the new values.
    6.  Contact the [flag URL](/docs/server-admin/additional-information#set-dataset-flag) for the dataset to tell ERDDAP™ to reload the dataset.
    
    This isn't ideal, but it works.  
     
*   precision -- When EDDGridFromEDDTable responds to a user's request for data, it moves a row of data from the EDDTable response table into the EDDGrid response grid. To do this, it has to figure out if the "axis" values on a given row in the table match some combination of axis values in the grid. For integer data types, it is easy to determine if two values are equal. But for floats and doubles, this brings up the horrible problem of floating point numbers [not matching exactly](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (for example, 0.2 versus 0.199999999999996). To (try to) deal with this, EDDGridFromTable lets you specify a precision attribute for any of the axisVariables, which specifies the total number of decimal digits which must be identical.
    *   For example, &lt;att name="precision" type="int">5&lt;/att>
    *   For different types of data variables, there are different default precision values. The defaults are usually appropriate. If they aren't, you need to specify different values.
    *   For axisVariables that are [time or timeStamp variables](#timestamp-variables), the default is full precision (an exact match).
    *   For axisVariables that are floats, the default precision is 5.
    *   For axisVariables that are doubles, the default precision is 9.
    *   For axisVariables that have integer data types, EDDGridFromEDDTable ignores the precision attribute and always uses full precision (an exact match).  
         
    *   **WARNING!** When doing the conversion of a chunk of tabular data into a chunk of gridded data, if EDDGridFromEDDTable can't match an EDDTable "axis" value to one of the expected EDDGridFromEDDTable axis values, EDDGridFromEDDTable silently (no error) throws away the data from that row of the table. For example, there may be other data (not on the grid) in the EDDTable dataset. (And if stride > 1, it isn't obvious to EDDGridFromTable which axis values are desired values and which ones are the one's to be skipped because of the stride.) So, if the precision values are too high, the user will see missing values in the data response when valid data values actually exist.
        
        Conversely, if the precision values are set too low, EDDTable "axis" values that shouldn't match EDDGridFromEDDTable axis values will (erroneously) match.
        
        These potential problems are horrible, because the user gets the wrong data (or missing values) when they should get the right data (or at least an error message).  
        This is not a flaw in EDDGridFromTable. EDDGridFromTable can't solve this problem. The problem is inherent in the conversion of tabular data into gridded data (unless other assumptions can be made, but they can't be made here).  
        It is up to you, the ERDDAP™ administrator, to **test your EDDGridFromEDDTable thoroughly** to ensure that the precision values are set to avoid these potential problems.
        
#### gapThreshold {#gapthreshold}
*   [gapThreshold](#gapthreshold) -- This is a very unusual type of dataset. Since the types of queries that can be made to (handled by) an EDDGrid dataset (related to the ranges and strides of the axisVariables) are very different from the types of queries that can be made to (handled by) an EDDTable dataset (just related to the ranges of some variables), the performance of EDDGridFromEDDTable datasets will vary greatly depending on the exact request which is made and the speed of the underlying EDDTable dataset. For requests that have a stride value > 1, EDDGridFromEDDTable may ask the underlying EDDTable for a relatively big chunk of data (as if stride=1) and then sift through the results, keeping the data from some rows and throwing away the data from others. If it has to sift through a lot of data to get the data it needs, the request will take longer to fill.
    
    If EDDGridFromEDDTable can tell that there will be large gaps (with rows of unwanted data) between the rows with desired data, EDDGridFromEDDTable may choose to make several subrequests to the underlying EDDTable instead of one big request, thereby skipping the unwanted rows of data in the large gaps. The sensitivity for this decision is controlled by the gapThreshold value as specified in the &lt;gapThreshold> tag (default=1000 rows of source data). Setting gapThreshold to a smaller number will lead to the dataset making (generally) more subrequests. Setting gapThreshold to a larger number will lead to the dataset making (generally) fewer subrequests.
    
    If gapThreshold is set too small, EDDGridFromEDDTable will operate more slowly because the overhead of multiple requests will be greater than the time saved by getting some excess data. If gapThreshold is set too big, EDDGridFromEDDTable will operate more slowly because so much excess data will be retrieved from the EDDTable, only to be discarded. (As Goldilocks discovered, the middle is "just right".) The overhead for different types of EDDTable datasets varies greatly, so the only way to know the actual best setting for your dataset is via experimentation. But you won't go too far wrong sticking to the default.
    
    A simple example is: Imagine an EDDGridFromTable with just one axisVariable (time, with a size of 100000), one dataVariable (temperature), and the default gapThreshold of 1000.
    
    *   If a user requests temperature\[0&#58;100&#58;5000\], the stride is 100 so the gap size is 99, which is less than the gapThreshold. So EDDGridFromTable will make just one request to EDDTable for all of the data needed for the request (equivalent to temperature\[0:5000\]) and throw away all the rows of data it doesn't need.
    *   If a user requests temperature\[0:2500:5000\], that stride is 2500 so the gap size is 2499, which is greater than the gapThreshold. So EDDGridFromTable will make separate requests to EDDTable which are equivalent to temperature\[0\], temperature\[2500\], temperature\[5000\].
    
    Calculation of the gap size is more complicated when there are multiple axes.
    
    For each user request, EDDGridFromEDDTable prints diagnostic messages related to this in the [log.txt](/docs/server-admin/additional-information#log) file.
    
    *   If [&lt;logLevel>](#loglevel) in datasets.xml is set to info, this prints a message like  
        \* nOuterAxes=1 of 4 nOuterRequests=22  
        If nOuterAxes=0, gapThreshold wasn't exceeded and only one request will be made to EDDTable.  
        If nOuterAxes>0, gapThreshold was exceeded and nOuterRequests will be made to EDDTable, corresponding to each requested combination of the leftmost nOuterAxes. For example, if the dataset has 4 axisVariables and dataVariables like eastward\[time\]\[latitude\]\[longitude\]\[depth\], the leftmost (first) axis variable is time.
    *   If &lt;logLevel> in datasets.xml is set to all, additional information is written to the log.txt file.  
         
#### EDDGridFromEDDTable skeleton XML {#eddgridfromeddtable-skeleton-xml}
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD*FromERDDAP {#eddfromerddap}
**EDDGridFromErddap** handles gridded data from a remote ERDDAP™ server.  
**EDDTableFromErddap** handles tabular data from a remote ERDDAP™ server.

*   EDDGridFromErddap and EDDTableFromErddap behave differently from all other types of datasets in ERDDAP.
    *   Like other types of datasets, these datasets get information about the dataset from the source and keep it in memory.
    *   Like other types of datasets, when ERDDAP™ searches for datasets, displays the Data Access Form (*datasetID*.html), or displays the Make A Graph form (*datasetID*.graph), ERDDAP™ uses the information about the dataset which is in memory.
    *   EDDGridFromErddap and EDDTableFromErddap are the basis for [grids/clusters/federations](/docs/server-admin/scaling) of ERDDAPs, which efficiently distribute the CPU usage (mostly for making maps), memory usage, dataset storage, and bandwidth usage of a large data center.  
#### Redirect {#redirect}
*   Unlike other types of datasets, when ERDDAP™ receives a request for data or images from these datasets, ERDDAP [redirects](https://en.wikipedia.org/wiki/URL_redirection) the request to the remote ERDDAP™ server. The result is:
    *   This is very efficient (CPU, memory, and bandwidth), because otherwise
        1.  The composite ERDDAP™ has to send the request to the other ERDDAP™ (which takes time).
        2.  The other ERDDAP™ has to get the data, reformat it, and transmit the data to the composite ERDDAP.
        3.  The composite ERDDAP™ has to receive the data (using bandwidth), reformat it (using CPU and memory), and transmit the data to the user (using bandwidth).By redirecting the request and allowing the other ERDDAP™ to send the response directly to the user, the composite ERDDAP™ spends essentially no CPU time, memory, or bandwidth on the request.
    *   The redirect is transparent to the user regardless of the client software (a browser or any other software or command line tool).
*   [You can tell ERDDAP™](#redirect) not to redirect any user requests by setting &lt;redirect>false&lt;/redirect>, but this negates most of the advantages of the ...FromErddap dataset type (notably, dispersing the load on the front end ERDDAP™ to the remote/backend ERDDAP).  
         
     
#### Subscriptions {#subscriptions}
Normally, when an EDDGridFromErddap and EDDTableFromErddap are (re)loaded on your ERDDAP, they try to add a subscription to the remote dataset via the remote ERDDAP's email/URL subscription system. That way, whenever the remote dataset changes, the remote ERDDAP™ contacts the [setDatasetFlag URL](/docs/server-admin/additional-information#set-dataset-flag) on your ERDDAP™ so that the local dataset is reloaded ASAP and so that the local dataset is always perfectly up-to-date and mimics the remote dataset. So, the first time this happens, you should get an email requesting that you validate the subscription. However, if the local ERDDAP™ can't send an email or if the remote ERDDAP's email/URL subscription system isn't active, you should email the remote ERDDAP™ administrator and request that s/he manually add [&lt;onChange>](#onchange)...&lt;/onChange> tags to all of the relevant datasets to call your dataset's [setDatasetFlag URLs](/docs/server-admin/additional-information#set-dataset-flag). See your ERDDAP™ daily report for a list of setDatasetFlag URLs, but just send the ones for EDDGridFromErddap and EDDTableFromErddap datasets to the remote ERDDAP™ administrator.
    
    Is this not working? Are your local datasets not staying in sync with the remote datasets?  
    Several things must all work correctly for this system to work so that your datasets stay up-to-date. Check each of these things in order:
    
    1.  Your ERDDAP™ must be able to send out emails. See the email settings in your setup.xml.
    2.  In general (but not always), your ERDDAP's &lt;baseUrl> and &lt;baseHttpsUrl>must not have a port number (e.g., :8080, :8443). If they do, use a [proxypass](/docs/server-admin/deploy-install#proxypass) to remove the port from the Url.
    3.  In your setup.xml, &lt;subscribeToRemoteErddapDataset> must be set to true.
    4.  When your local EDD...FromErddap dataset is reloaded, it should send a request to the remote ERDDAP™ to subscribe to the remote dataset. Look in log.txt to see if this is happening.
    5.  You should get an email asking you to validate the subscription request.
    6.  You must click on the link in that email to validate the subscription request.
    7.  The remote ERDDAP™ should say that the validation was successful. At any time, you can request an email from the remote ERDDAP™ with a list of your pending and valid subscriptions. See the form at *remoteErddapBaseUrl*/erddap/subscriptions/list.html .
    8.  When the remote dataset changes (e.g., gets additional data), the remote ERDDAP™ should try to contact the flagURL on your ERDDAP. You can't check this, but you can ask the administrator of the remote ERDDAP™ to check this.
    9.  Your ERDDAP™ should receive a request to set that flagURL. Look in your log.txt for "setDatasetFlag.txt?" request(s) and see if there is an error message associated with the requests.
    10.  Your ERDDAP™ should then try to reload that dataset (perhaps not immediately, but ASAP).  
         
#### Up-to-date max(time)? {#up-to-date-maxtime}
EDDGrid/TableFromErddap datasets only changes their stored information about each source dataset when the source dataset is ["reload"ed](#reloadeverynminutes) and some piece of metadata changes (e.g., the time variable's actual\_range), thereby generating a subscription notification. If the source dataset has data that changes frequently (for example, new data every second) and uses the ["update"](#updateeverynmillis) system to notice frequent changes to the underlying data, the EDDGrid/TableFromErddap won't be notified about these frequent changes until the next dataset "reload", so the EDDGrid/TableFromErddap won't be perfectly up-to-date. You can minimize this problem by changing the source dataset's &lt;reloadEveryNMinutes> to a smaller value (60? 15?) so that there are more subscription notifications to tell the EDDGrid/TableFromErddap to update its information about the source dataset.

Or, if your data management system knows when the source dataset has new data (e.g., via a script that copies a data file into place), and if that isn't super frequent (e.g., every 5 minutes, or less frequent), there's a better solution:

1.  Don't use &lt;updateEveryNMillis> to keep the source dataset up-to-date.
2.  Set the source dataset's &lt;reloadEveryNMinutes> to a larger number (1440?).
3.  Have the script contact the source dataset's [flag URL](/docs/server-admin/additional-information#set-dataset-flag) right after it copies a new data file into place.  
     

That will lead to the source dataset being perfectly up-to-date and cause it to generate a subscription notification, which will be sent to the EDDGrid/TableFromErddap dataset. That will lead the EDDGrid/TableFromErddap dataset to be perfectly up-to-date (well, within 5 seconds of new data being added). And all that will be done efficiently (without unnecessary dataset reloads).  
     
#### No addAttributes, axisVariable, or dataVariable {#no-addattributes-axisvariable-or-datavariable}
Unlike other types of datasets, EDDTableFromErddap and EDDGridFromErddap datasets don't allow global &lt;addAttributes&gt;, &lt;axisVariable&gt;, or &lt;dataVariable&gt; sections in the datasets.xml for that dataset. The problem is that allowing those would lead to inconsistencies:
    
1.  Let's say it was allowed and you added a new global attribute.
2.  When a user asks your ERDDAP™ for the global attributes, the new attribute will appear.
3.  But when a user asks your ERDDAP™ for a data file, your ERDDAP™ redirects the request to the source ERDDAP. That ERDDAP™ is unaware of the new attribute. So if it creates a data file with metadata, e.g., a .nc file, the metadata won't have the new attribute.

There are two work-arounds:

1.  Convince the admin of the source ERDDAP™ to make the changes that you want to the metadata.
2.  Instead of EDDTableFromErddap, use [EDDTableFromDapSequence](#eddtablefromdapsequence). Or instead of EDDGridFromErddap, use [EDDGridFromDap](#eddgridfromdap). Those EDD types allow you to connect efficiently to a dataset on a remote ERDDAP™ (but without redirecting data requests) and they allow you to include global &lt;addAttributes&gt;, &lt;axisVariable&gt;, or &lt;dataVariable&gt; sections in the datasets.xml. One other difference: you will need to manually subscribe to the remote dataset, so that the dataset on your ERDDAP™ will be notified (via the [flag URL](/docs/server-admin/additional-information#set-dataset-flag)) when there are changes to the remote dataset. Thus, you are creating a new dataset, instead of linking to a remote dataset.  
         
#### Other notes {#other-notes}
*   For security reasons, EDDGridFromErddap and EDDTableFromErddap don't support the [&lt;accessibleTo>](#accessibleto) tag and can't be used with remote datasets that require logging in (because they use [&lt;accessibleTo>](#accessibleto)).. See ERDDAP's [security system](/docs/server-admin/additional-information#security) for restricting access to some datasets to some users.  
     
*   Starting with ERDDAP™ v2.10, EDDGridFromErddap and EDDTableFromErddap support the [&lt;accessibleViaFiles>](#accessibleviafiles) tag. Unlike other types of datasets, the default is true, but the dataset's files will be accessibleViaFiles only if the source dataset also has &lt;accessibleViaFiles> set to true.  
     
*   You can use the [GenerateDatasetsXml program](#generatedatasetsxml) to make the datasets.xml chunk for this type of dataset. But you can do these types of datasets easily by hand.  
     
#### EDDGridFromErddap skeleton XML {#eddgridfromerddap-skeleton-xml}
*   EDDGridFromErddap skeleton XML  dataset is very simple, because the intent is just to mimic the remote dataset which is already suitable for use in ERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap skeleton XML {#eddtablefromerddap-skeleton-xml}
*   The skeleton XML for an EDDTableFromErddap dataset is very simple, because the intent is just to mimic the remote dataset, which is already suitable for use in ERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridFromEtopo {#eddgridfrometopo}
[**EDDGridFromEtopo**](#eddgridfrometopo) just serves the [ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html) (Ice Surface, grid registered, binary, 2byte int: etopo1\_ice\_g\_i2.zip) which is distributed with ERDDAP.

*   Only two datasetIDs are supported for EDDGridFromEtopo, so that you can access the data with longitude values -180 to 180, or longitude values 0 to 360.
*   There are never any sub tags, since the data is already described within ERDDAP.
*   So the two options for EDDGridFromEtopo datasets are (literally):
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridFromFiles {#eddgridfromfiles}
[**EDDGridFromFiles**](#eddgridfromfiles) is the superclass of all EDDGridFrom...Files classes. You can't use EDDGridFromFiles directly. Instead, use a subclass of EDDGridFromFiles to handle the specific file type:

*   [EDDGridFromMergeIRFiles](#eddgridfrommergeirfiles) handles data from gridded [MergeIR .gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) files.
*   [EDDGridFromAudioFiles](#eddfromaudiofiles) aggregates data from a group of local audio files.
*   [EDDGridFromNcFiles](#eddgridfromncfiles) handles data from gridded [GRIB .grb](https://en.wikipedia.org/wiki/GRIB) files, [HDF (v4 or v5) .hdf](https://www.hdfgroup.org/) files, [.ncml](#ncml-files) files, and [NetCDF (v3 or v4) .nc](https://www.unidata.ucar.edu/software/netcdf/) files. This may work with other file types (for example, BUFR), we just haven't tested it -- please send us some sample files if you are interested.
*   [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked) is a variant of EDDGridFromNcFiles which handles data from gridded NetCDF (v3 or v4) .nc and related files, which ERDDAP™ unpacks at a low level.

Currently, no other file types are supported. But it is usually relatively easy to add support for other file types. Contact us if you have a request. Or, if your data is in an old file format that you would like to move away from, we recommend converting the files to be NetCDF v3 .nc files. NetCDF is a widely supported, binary format, allows fast random access to the data, and is already supported by ERDDAP.

#### From Files Details {#from-files-details}
The following information applies to all of the subclasses of EDDGridFromFiles.

##### Aggregation of an Existing Dimension {#aggregation-of-an-existing-dimension}
All variations of EDDGridFromFiles can aggregate data from local files, where each file has 1 (or more) different values for the leftmost (first) dimension, usually \[time\], which will be aggregated. For example, the dimensions might be \[time\]\[altitude\]\[latitude\]\[longitude\], and the files might have the data for one (or a few) time value(s) per file. The resulting dataset appears as if all of the file's data had been combined. The big advantages of aggregation are:

*   The size of the aggregated data set can be much larger than a single file can be conveniently (~2GB).
*   For near-real-time data, it is easy to add a new file with the latest chunk of data. You don't have to rewrite the entire dataset.

The requirements for aggregation are:
*   The local files needn't have the same dataVariables (as defined in the dataset's datasets.xml). The dataset will have the dataVariables defined in datasets.xml. If a given file doesn't have a given dataVariable, ERDDAP™ will add missing values as needed.
*   All of the dataVariables MUST use the same axisVariables/dimensions (as defined in the dataset's datasets.xml). The files will be aggregated based on the first (left-most) dimension, sorted in ascending order.
*   Each file MAY have data for one or more values of the first dimension, but there can't be any overlap between files. If a file has more than one value for the first dimension, the values MUST be sorted in ascending order, with no ties.
*   All files MUST have exactly the same values for all of the other dimensions. The precision of the testing is determined by [matchAxisNDigits](#matchaxisndigits).
*   All files MUST have exactly the same [units](#units) metadata for all axisVariables and dataVariables. If this is a problem, you may be able to use [NcML](#ncml-files) or [NCO](#netcdf-operators-nco) to fix the problem.  
         
##### Aggregation via File Names or Global Metadata {#aggregation-via-file-names-or-global-metadata}
All variations of EDDGridFromFiles can also aggregate a group of files by adding a new leftmost (first) dimension, usually time, based on a value derived from each filename or from the value of a global attribute that is in each file. For example, the filename might include the time value for the data in the file. ERDDAP™ would then create a new time dimension.

Unlike the similar feature in THREDDS, ERDDAP™ always creates an axisVariable with numeric values (as required by CF), never String values (which are not allowed by CF). Also, ERDDAP™ will sort the files in the aggregation based on the numeric axisVariable value which is assigned to each file, so that the axis variable will always have sorted values as required by CF. The THREDDS approach of doing a lexicographic sort based on the file names leads to aggregations where the axis values aren't sorted (which is not allowed by CF) when the file names sort differently than the derived axisVariable values.

To set up one of these aggregations in ERDDAP™, you will define a new leftmost (first) [axisVariable](#axisvariable) with a special, pseudo &lt;sourceName>, which tells ERDDAP™ where and how to find the value for the new dimension from each file.

*   The format for the pseudo sourceName which gets the value from a filename (just filename.ext) is  
    \*\*\*fileName,*[dataType](#data-types)*,*extractRegex*,*captureGroupNumber*
*   The format for the pseudo sourceName which gets the value from a file's absolute path name is  
    \*\*\*pathName,*[dataType](#data-types)*,*extractRegex*,*captureGroupNumber*  
    \[For this, the path name always uses '/' as the directory separator character, never '\\'.\]
*   The format for the pseudo sourceName which gets the value from a global attribute is  
    \*\*\*global:*attributeName*,*[dataType](#data-types)*,*extractRegex*,*captureGroupNumber*
*   This pseudo sourceName option works differently from the others: instead of creating a new leftmost (first) axisVariable, this replaces the value of the current axisVariable with a value extracted from the filename (just filename.ext). The format is  
    \*\*\*replaceFromFileName,*[dataType](#data-types)*,*extractRegex*,*captureGroupNumber*  
     

The descriptions of the parts you need to provide are:

*   *attributeName* -- the name of the global attribute which is in each file and which contains the dimension value.
*   *dataType* -- This specifies the data type that will be used to store the values. See the standard list of [dataTypes](#data-types) that ERDDAP™ supports, except that String is not allowed here since axis variables in ERDDAP™ can't be String variables.
    
    There is an additional pseudo dataType, timeFormat=*stringTimeFormat*, which tells ERDDAP™ that the value is a String timeStamp [units suitable for string times](#string-time-units). In most cases, the stringTimeFormat you need will be a variation of one of these formats:
    
    *   yyyy-MM-dd'T'HH:mm:ss.SSSZ -- which ISO 8601:2004(E) date time format. You may need a shortened version of this, e.g., yyyy-MM-dd'T'HH:mm:ss or yyyy-MM-dd.
    *   yyyyMMddHHmmss.SSS -- which is the compact version of the ISO 8601 date time format. You may need a shortened version of this, e.g., yyyyMMddHHmmss or yyyyMMdd.
    *   M/d/yyyy H:mm:ss.SSS -- which is the U.S. slash date format. You may need a shortened version of this, e.g., M/d/yyyy .
    *   yyyyDDDHHmmssSSS -- which is the year plus the zero-padded day of the year (e.g, 001 = Jan 1, 365 = Dec 31 in a non-leap year; this is sometimes erroneously called the Julian date). You may need a shortened version of this, e.g., yyyyDDD .
    
    If you use this pseudo dataType, add this to the new variable's &lt;addAttributes>:  
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
    If you want to shift all of the time values, shift the time value in units, e.g.,  
    1970-01-01T12:00:00Z.
*   *extractRegex* -- This is the [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) which includes a capture group (in parentheses) which describes how to extract the value from the filename or global attribute value. For example, given a filename like S19980011998031.L3b\_MO\_CHL.nc, capture group #1, "\\d{7}", in the regular expression S(\\d{7})\\d{7}\\.L3b.\* will capture the first 7 digits after 'S': 1998001.
*   *captureGroupNumber* -- This is the number of the capture group (within a pair of parentheses) in the regular expression which contains the information of interest. It is usually 1, the first capture group. Sometimes you need to use capture groups for other purposes in the regex, so then the important capture group number will be 2 (the second capture group) or 3 (the third), etc.

A full example of an axisVariable which makes an aggregated dataset with a new time axis which gets the time values from the filename of each file is
```
      <axisVariable>
        <sourceName>\*\*\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
When you use the "timeFormat=" pseudo dataType, ERDDAP™ will add 2 attributes to the axisVariable so that they appear to be coming from the source:  
```
    <att name="standard\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
So in this case, ERDDAP™ will create a new axis named "time" with double values (seconds since 1970-01-01T00:00:00Z) by extracting the 7 digits after 'S' and before ".L3m" in the filename and interpreting those as time values formatted as yyyyDDD.

You can override the default base time (1970-01-01T00:00:00Z) by adding an [addAttribute](#addattributes) which specifies a different units attribute with a different base time. A common situation is: there are groups of data files, each with a 1 day composite of a satellite dataset, where you want the time value to be noon of the day mentioned in the filename (the centered time of each day) and want the variable's long\_name to be "Centered Time". An example which does this is:
```
      <axisVariable>
        <sourceName>\*\*\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Note hours=12 in the base time, which adds 12 hours relative to the original base time of 1970-01-01T00:00:00Z.

A full example of an axisVariable which makes an aggregated dataset with a new "run" axis (with int values) which gets the run values from the "runID" global attribute in each file (with values like "r17\_global", where 17 is the run number) is
```
      <axisVariable> 
        <sourceName>\*\*\*global:runID,int,(r|s)(\\d+)\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Note the use of the capture group number 2 to capture the digits which occur after 'r' or 's', and before "\_global". This example also shows how to add additional attributes (e.g., ioos\_category and units) to the axis variable.  
     
#### Externally Compressed Files {#externally-compressed-files}
*   Datasets that are subsets of EDDGridFromFiles and EDDTableFromFiles can serve data directly from externally compressed data files, including .tgz, .tar.gz, .tar.gzip, .gz, .gzip, .zip, .bz2, and .Z files.  
     
*   **This works surprisingly well!**  
    In most cases, the slowdown related to decompressing small and medium-sized data files is minor. If you need to conserve disk space, we strongly encourage using this feature, especially for older files that are rarely accessed.  
     
*   **Save money!**  
    This is one of the few features in ERDDAP™ that offers you a chance to save a lot of money (although at the cost of slightly decreased performance). If the compression ratio is e.g., 6:1 (sometimes it will be much higher), then the dataset's data files will only need 1/6 the disk space. Then perhaps you can get by with 1 RAID (of a given size) instead of 6 RAIDS (of the same size). That is a huge cost savings. Hopefully, the ability to compress some files in a collection (the older ones?) and not compress others (the newer ones?), and to change that at any time, let's you minimize the downside to compressing some of the files (slower access). And if the choice is between storing the files on tape (and only accessible upon request, after a delay) vs storing them compressed on a RAID (and accessible via ERDDAP), then there is a huge advantage to using compression so that users get interactive and (relatively) quick access to the data. And if this can save you from purchasing an additional RAID, this feature can save you about $30,000.  
     
*   For all EDDGridFromFiles subclasses, if the data files have an extension indicating that they are externally compressed files (currently: .tgz, .tar.gz, .tar.gzip, .gz, .gzip, .zip, .bz2, or .Z), ERDDAP™ will decompress the files to the dataset's cache directory when it reads them (if they aren't already in the cache). The same is true for binary file (e.g., .nc) subclasses of EDDTableFromFiles.  
     
*   For EDDTableFromFiles subclasses for non-binary files (e.g., .csv), data files with an extension indicating that they are externally compressed files will be decompressed on-the-fly as the file is read.  
     
*   REQUIREMENT: If the type of externally compressed file used (e.g., .tgz or .zip) supports more than 1 file inside the compressed file, the compressed file must contain just 1 file.  
     
*   REQUIREMENT: This feature assumes that the contents of the externally compressed files don't change, so that a cached decompressed file can be reused. If some or all of a dataset's data files are sometimes changed, don't compress those files. This is consistent with common usage, since people don't normally compress files that they sometimes need to change.  
     
*   &lt;fileNameRegex> To make this work, the dataset's &lt;fileNameRegex> must match the compressed files' names. Obviously, regexes like .\* will match all file names. If you specify a specific file type, e.g., .\*\\.nc, then you need to modify the regex to include the compression extension too, e.g., .\*\\.nc\\.gz (if all of the files will be *something*.nc.gz files) .  
     
*   It is fine if your dataset includes a mix of compressed and not compressed files. This may be useful if you believe that some files (e.g., older files) will be used less often and therefore it would be useful to save disk space by compressing them. To make this work, the &lt;fileNameRegex> must match the compressed and not compressed files' names, e.g., .\* or .\*\\.nc(|\\.gz) (where the capture group at the end of that specifies that .gz is optional.  
     
*   It is fine if you compress or decompress specific files in the collection at any time.  
    If the dataset doesn't use [&lt;updateEveryNMillis>](#updateeverynmillis), set the dataset's [flag](/docs/server-admin/additional-information#flag) to tell ERDDAP™ to reload the dataset and thus notice the changes. Interestingly, you could use different compression algorithms and settings for different files in the same dataset (e.g., .bz2 for rarely used files, .gz for not often used files, and no compression for frequently used files), just be sure that the regex supports all of the file extensions that are in use, e.g., .\*\\.nc(|\\.gz|\\.bz2) .  
     
*   Of course, compression ratios and speeds for the different compression algorithms vary with the source file and the settings (e.g., compression level). If you want to optimize this system for your files, do a test of the different compression methods with your files and with a range of compression settings. If you want a reliably good (not necessarily the best) setup, we will slightly recommend gzip (.gz). gzip doesn't make the smallest compressed file (it's reasonably close), but it compresses the file very quickly and (more important for ERDDAP™ users) decompresses the file very quickly. Plus, gzip software comes standard with every Linux and Mac OS installation and is readily available for Windows via free tools like 7Zip and Linux add-ons like Git Bash. For example, to compress a source file into the .gz version of the file (same filename, but with .gz appended), use (in Linux, Mac OS, and Git Bash)  
    gzip *sourceName*  
    To decompress a .gz file back to the original, use  
    gunzip *sourceName.gz*  
    To compress each of the source files in directory and its subdirectories, recursively, use  
    gzip -r *directorName*  
    To decompress each of the .gz files in directory and its subdirectories , recursively, use  
    gunzip -r *directorName*  
     
*   WARNING: Don't externally compress (gzip) files that are already internally compressed!  
    Many files already have compressed data internally. If you gzip these files, the resulting files won't be much smaller (&lt; 5%) and ERDDAP™ will waste time decompressing them when it needs to read them. For example:
    
    *   data files: e.g., .nc 4, and .hdf 5 files: Some files use internal compression; some don't. How to tell: compressed variables have "\_ChunkSize" attributes. Also, if a group of gridded .nc or .hdf files are all different sizes, they are likely internally compressed. If they are all the same size, they are not internally compressed.
    *   image files: e.g., .gif, .jpg, and .png
    *   audio files: e.g., .mp3, and .ogg.
    *   video files: e.g., .mp4, .ogv, and .webm.
    
        
    One unfortunate odd case: .wav audio files are huge and not internally compressed. It would be nice to compress (gzip) them, but generally you shouldn't because if you do, users won't be able to play the compressed files in their browser.  
     
*   Test Case: compressing (with gzip) a dataset with 1523 gridded .nc files.
    
    *   The data in the source files was sparse (lots of missing values).
    *   Total disk space went from 57 GB before compression to 7 GB after.
    *   A request for lots of data from 1 time point is &lt; 1 s before and after compression.
    *   A request for 1 data point for 365 time points (the worst case situation) went from 4 s to 71 s.  
         
    
    To me that is a reasonable trade-off for any dataset, and certainly for datasets that are infrequently used.  
     
*   Internal versus External Compression --  
    Compared to the internal file compression offered by .nc4 and .hdf5 files, ERDDAP's approach for externally compressed binary files has advantages and disadvantages. The disadvantage is: for a one time read of a small part of one file, internal compression is better because EDDGridFromFiles only needs to decompress a few chunk(s) of the file, not the entire file. But ERDDAP's approach has some advantages:
    
    *   ERDDAP™ supports compression of all types of data files (binary and non-binary, e.g., .nc3 and .csv) not just .nc4 and .hdf4.
    *   If the bulk of a file needs to be read more than once in a short period of time, then it saves time to decompress the file once and read it many times. This happens in ERDDAP™ when a user uses Make-A-Graph for the dataset and makes a series of small changes to the graph.
    *   The ability to have compressed files and not compressed files in the same collection, allows you more control over which files are compressed and which aren't. And this added control comes without really modifying the source file (since you can compress a file with e.g., .gz and then decompress it to get the original file).
    *   The ability to change at any time whether a given file is compressed and how it is compressed (different algorithms and settings) gives you more control over the performance of the system. And you can easily recover the original uncompressed file at any time.
    
    While neither approach is a winner in all situations, it is clear that ERDDAP's ability to serve data from externally compressed files makes external compression a reasonable alternative to the internal compression offered by .nc4 and .hdf5. That is significant given that internal compression is one of the main reasons people choose to use .nc4 and .hdf5.  
     
##### Decompressed Cache {#decompressed-cache}
ERDDAP™ makes a decompressed version of any compressed binary (e.g., .nc) data file when it needs to read the file. The decompressed files are kept in the dataset's directory within *bigParentDirectory*/decompressed/ . Decompressed files which haven't been used recently will be deleted to free up space when the cumulative file size is >10GB. You can change that by setting &lt;decompressedCacheMaxGB> (default=10) in datasetsXml.xml, e.g.,  
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Also, decompressed files that haven't been used in the last 15 minutes will be deleted at the start of each major dataset reload. You can change that by setting &lt;decompressedCacheMaxMinutesOld> (default=15) in datasetsXml.xml, e.g.,  
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
    Larger numbers are nice, but the cumulative size of the decompressed files may cause *bigParentDirectory* to run out of disk space, which causes severe problems.  
     
*   Because decompressing a file can take a significant amount of time (0.1 to 10 seconds), datasets with compressed files may benefit from setting the dataset's [&lt;nThreads>](#nthreads) setting to a higher number (2? 3? 4?). The downsides to even higher numbers (e.g., 5? 6? 7?) are diminishing returns and that one user's request can then use a high percentage of the system's resources, thus significantly slowing down the processing of other user's requests. Thus, there is no ideal nThreads setting, just different consequences in different situations with different settings.  
         
#### Sorted Dimension Values {#sorted-dimension-values}
The values for each dimension MUST be in sorted order (ascending or descending, except for the first (left-most) dimension which must be ascending). The values can be irregularly spaced. There can't be any ties. This is a requirement of the [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). If any dimension's values aren't in sorted order, the dataset won't be loaded and ERDDAP™ will identify the first unsorted value in the log file, *bigParentDirectory*/logs/log.txt .
    
    Unsorted dimension values almost always indicate a problem with the source dataset. This most commonly occurs when a misnamed or inappropriate file is included in the aggregation, which leads to an unsorted time dimension. To solve this problem, see the error message in the ERDDAP™ log.txt file to find the offending time value. Then look in the source files to find the corresponding file (or one before or one after) that doesn't belong in the aggregation.
    
#### Directories {#directories}
The files MAY be in one directory, or in a directory and its subdirectories (recursively). If there are a large number of files (for example, >1,000), the operating system (and thus EDDGridFromFiles) will operate much more efficiently if you store the files in a series of subdirectories (one per year, or one per month for datasets with very frequent files), so that there are never a huge number of files in a given directory.  
     
#### &lt;cacheFromUrl> {#cachefromurl}
All EDDGridFromFiles and all EDDTableFromFiles datasets support a set of tags which tell ERDDAP™ to download and maintain a copy of all of a remote dataset's files, or a cache of a few files (downloaded as needed). This can be incredibly useful. See the [cacheFromUrl documentation](#cachefromurl).  
    
#### Remote Directories and HTTP Range Requests {#remote-directories-and-http-range-requests}
(AKA Byte Serving, Byte Range Requests, Accept-Ranges http header)  
EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles, can *sometimes* serve data from .nc files on remote servers and accessed via HTTP if the server supports [Byte Serving](https://en.wikipedia.org/wiki/Byte_serving) via HTTP range requests (the HTTP mechanism for byte serving). This is possible because netcdf-java (which ERDDAP™ uses to read .nc files) supports reading data from remote .nc files via HTTP range requests.

**Don't do this!** It is horribly inefficient and slow.  
Instead, use the [&lt;cacheFromUrl> system](#cachefromurl).

Accessing ERDDAP™ datasets as files via byte range requests --  
Flipping this around, given that you can (in theory) think of a dataset in ERDDAP™ as a giant .nc file by appending ".nc" to the base OPenDAP URL for a given dataset (e.g., https://myserver.org/erddap/griddap/datasetID.nc and also by adding a ?query after that to specify a subset), it is perhaps reasonable to ask whether you can use netcdf-java, Ferret, or some other NetCDF client software to read data via HTTP Range Requests from ERDDAP. The answer is no, because there isn't really a huge ".nc" file. If you want to do this, instead do one of these options:

*   Use (OPeN)DAP client software to connect to the griddap services offered by ERDDAP. That is what DAP (and thus ERDDAP) was designed for. It is very efficient.
*   Or, download the source file(s) from the "files" system (or a subset file via a .nc?query) to your computer and use netcdf-java, Ferret, or some other NetCDF client software to read the (now) local file(s).  
         
#### Cached File Information {#cached-file-information}
When an EDDGridFromFiles dataset is first loaded, EDDGridFromFiles reads information from all of the relevant files and creates tables (one row for each file) with information about each valid file and each "bad" (different or invalid) file.
*   The tables are also stored on disk, as NetCDF v3 .nc files in *bigParentDirectory*/dataset/*last2CharsOfDatasetID*/*datasetID*/ in files named:  
      dirTable.nc (which holds a list of unique directory names),  
      fileTable.nc (which holds the table with each valid file's information),  
      badFiles.nc (which holds the table with each bad file's information).
*   To speed up access to an EDDGridFromFiles dataset (but at the expense of using more memory), you can use [&lt;fileTableInMemory>true&lt;/fileTableInMemory>](#filetableinmemory) to tell ERDDAP™ to keep a copy of the file information tables in memory.
*   The copy of the file information tables on disk is also useful when ERDDAP™ is shut down and restarted: it saves EDDGridFromFiles from having to re-read all of the data files.
*   When a dataset is reloaded, ERDDAP™ only needs to read the data in new files and files that have changed.
*   If a file has a different structure from the other files (for example, a different data type for one of the variables, or a different value for the "[units](#units)" attribute), ERDDAP adds the file to the list of "bad" files. Information about the problem with the file will be written to the *bigParentDirectory*/logs/log.txt file.
*   You shouldn't ever need to delete or work with these files. One exception is: if you are still making changes to a dataset's datasets.xml setup, you may want to delete these files to force ERDDAP™ to reread all of the files since the files will be read/interpreted differently. If you ever do need to delete these files, you can do it when ERDDAP™ is running. (Then set a [flag](/docs/server-admin/additional-information#set-dataset-flag) to reload the dataset ASAP.) However, ERDDAP™ usually notices that the datasets.xml information doesn't match the fileTable information and deletes the file tables automatically.
*   If you want to encourage ERDDAP™ to update the stored dataset information (for example, if you just added, removed, or changed some files to the dataset's data directory), use the [flag system](/docs/server-admin/additional-information#flag) to force ERDDAP™ to update the cached file information.  
         
#### Handling Requests {#handling-requests}
When a client's request for data is processed, EDDGridFromFiles can quickly look in the table with the valid file information to see which files have the requested data.  
     
#### Updating the Cached File Information {#updating-the-cached-file-information}
Whenever the dataset is reloaded, the cached file information is updated.
    
*   The dataset is reloaded periodically as determined by the &lt;reloadEveryNMinutes> in the dataset's information in datasets.xml.
*   The dataset is reloaded as soon as possible whenever ERDDAP™ detects that you have added, removed, [touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (to change the file's lastModified time), or changed a datafile.
*   The dataset is reloaded as soon as possible if you use the [flag system](/docs/server-admin/additional-information#flag).

When the dataset is reloaded, ERDDAP™ compares the currently available files to the cached file information tables. New files are read and added to the valid files table. Files that no longer exist are dropped from the valid files table. Files where the file timestamp has changed are read and their information is updated. The new tables replace the old tables in memory and on disk.  
     
#### Bad Files {#bad-files}
The table of bad files and the reasons the files were declared bad (corrupted file, missing variables, etc.) is emailed to the emailEverythingTo email address (probably you) every time the dataset is reloaded. You should replace or repair these files as soon as possible.  
     
#### Missing Variables {#missing-variables}
If some of the files don't have some of the dataVariables defined in the dataset's datasets.xml chunk, that's okay. When EDDGridFromFiles reads one of those files, it will act as if the file had the variable, but with all missing values.  
     
#### FTP Trouble/Advice {#ftp-troubleadvice}
If you FTP new data files to the ERDDAP™ server while ERDDAP™ is running, there is the chance that ERDDAP™ will be reloading the dataset during the FTP process. It happens more often than you might think! If it happens, the file will appear to be valid (it has a valid name), but the file isn't yet valid. If ERDDAP™ tries to read data from that invalid file, the resulting error will cause the file to be added to the table of invalid files. This is not good. To avoid this problem, use a temporary filename when FTP'ing the file, for example, ABC2005.nc\_TEMP . Then, the fileNameRegex test (see below) will indicate that this is not a relevant file. After the FTP process is complete, rename the file to the correct name. The renaming process will cause the file to become relevant in an instant.  
     
#### "0 files" Error Message {#0-files-error-message-1}
If you run [GenerateDatasetsXml](#generatedatasetsxml) or [DasDds](#dasdds), or if you try to load an EDDGridFrom...Files dataset in ERDDAP™, and you get a "0 files" error message indicating that ERDDAP™ found 0 matching files in the directory (when you think that there are matching files in that directory):
    *   Check that the files really are in that directory.
    *   Check the spelling of the directory name.
    *   Check the fileNameRegex. It's really, really easy to make mistakes with regexes. For test purposes, try the regex .\* which should match all filenames. (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)
    *   Check that the user who is running the program (e.g., user=tomcat (?) for Tomcat/ERDDAP) has 'read' permission for those files.
    *   In some operating systems (for example, SELinux) and depending on system settings, the user who ran the program must have 'read' permission for the whole chain of directories leading to the directory that has the files.  
         
#### EDDGridFromFiles skeleton XML {#eddgridfromfiles-skeleton-xml}
*   **The skeleton XML** for all EDDGridFromFiles subclasses is:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*FromAudioFiles {#eddfromaudiofiles}
**EDDGridFromAudioFiles** and **EDDTableFromAudioFiles** aggregate data from a collection of local audio files. (These first appeared in ERDDAP™ v1.82.) The difference is that EDDGridFromAudioFiles treats the data as a multidimensional dataset (usually with 2 dimensions: \[file startTime\] and \[elapsedTime within a file\]), whereas EDDTableFromAudioFiles treats the data as tabular data (usually with columns for the file startTime, the elapsedTime with the file, and the data from the audio channels). EDDGridFromAudioFiles requires that all files have the same number of samples, so if that is not true, you must use EDDTableFromAudioFiles. Otherwise, the choice of which EDD type to use is entirely your choice. One advantage of EDDTableFromAudioFiles: you can add other variables with other information, e.g., stationID, stationType. In both cases, the lack of a unified time variable makes it more difficult to work with the data from these EDD types, but there was no good way to set up a unified time variable.

See these class' superclasses, [EDDGridFromFiles](#eddgridfromfiles) and [EDDTableFromFiles](#eddtablefromfiles), for general information on how this class works and how to use it.

We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. Since audio files have no metadata other than information related to the encoding of the sound data, you will have to edit the output from GenerateDatasetsXml to provide essential information (e.g., title, summary, creator\_name, institution, history).

Details:

*   There are a large number of audio file formats. Currently, ERDDAP™ can read data from most .wav and .au files. It currently can't read other types of audio files, e.g., .aiff or .mp3. If you need support for other audio file formats or other variants of .wav and .au, please email your request to Chris.John at noaa.gov . Or, as a workaround you can use right now, you can convert your audio files into PCM\_SIGNED (for integer data) or PCM\_FLOAT (for floating point data) .wav files so that ERDDAP™ can work with them.
*   Currently, ERDDAP™ can read audio files with what Java's AudioFormat class calls PCM\_FLOAT, PCM\_SIGNED, PCM\_UNSIGNED, ALAW, and ULAW encodings. ERDDAP™ converts PCM\_UNSIGNED values (e.g., 0 to 255) into signed values (e.g., -128 to 128) by rearranging the bits in the data values. ERDDAP™ converts ALAW and ULAW encoded from their native encoded byte format into short (int16) values. Since Java wants bigEndian=true data, ERDDAP™ rearranges the bytes of data stored with bigEndian=false (little endian) in order to read the values correctly. For all other encodings (PCM), ERDDAP™ reads the data as is.
*   When ERDDAP™ reads data from audio files, it converts the file's available audio metadata into global attributes. This will always include (with sample values shown)
    
      String audioBigEndian  "false";     //true or false
      int    audioChannels   1;              
      String audioEncoding   "PCM\_SIGNED";
      float  audioFrameRate  96000.0;     //per second
      int    audioFrameSize  2;           //# of data bytes per frame
      float  audioSampleRate 96000.0;     //per second
      int    audioSampleSizeInBits 16;    //# of bits per channel per sample
    
    For ERDDAP's purposes, a frame is synonymous with a sample, which is the data for one point in time.  
    The attributes in ERDDAP™ will have the information describing the data as it was in the source files. ERDDAP™ will often have changed this while reading the data, e.g., PCM\_UNSIGNED, ALAW, and ULAW encoded data are converted to PCM\_SIGNED, and bigEndian=false data is converted to bigEndian=true data (which is how Java wants to read it). In the end, data values in ERDDAP™ will always be the [PCM-encoded ](https://en.wikipedia.org/wiki/Pulse-code_modulation) data values (i.e., simple digitized samples of the sound wave).
*   When ERDDAP™ reads data from audio files, it reads the entire file. ERDDAP™ can read as many as about 2 billion samples per channel. For example, if the sample rate is 44,100 samples per second, 2 billion samples translates to about 756 minutes of sound data per file. If you have audio files with more than this amount of data, you need to break up the files into smaller chunks so that ERDDAP™ can read them.
*   Because ERDDAP™ reads entire audio files, ERDDAP™ must have access to a large amount of memory to work with large audio files. See [ERDDAP's memory settings](/docs/server-admin/deploy-install#memory). Again, if this is a problem, a workaround that you can use right now is to break up the files into smaller chunks so that ERDDAP™ can read them with less memory.
*   Some audio files were written incorrectly. ERDDAP™ makes a small effort to deal with such cases. But in general, when there is an error, ERDDAP™ will throw an Exception (and reject that file) or (if the error is undetectable) read the data (but the data will be incorrect).
*   ERDDAP™ does not check or alter the volume of the sound. Ideally, integer audio data is scaled to use the entire range of the data type.
*   Audio files and audio players have no system for missing values (e.g., -999 or Float.NaN). So audio data shouldn't have any missing values. If there are missing values (e.g., if you need to lengthen an audio file), use a series of 0's which will be interpreted as perfect silence.
*   When ERDDAP™ reads data from audio files, it always creates a column called elapsedTime with the time for each sample, in seconds (stored as doubles), relative to the first sample (which is assigned elapsedTime=0.0 s). With EDDGridFromAudioFiles, this becomes the elapsedTime axis variable.
*   EDDGridFromAudioFiles requires that all files have the same number of samples. So if that is not true, you must use EDDTableFromAudioFiles.
*   For EDDGridFromAudioFiles, we recommend that you set [&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory) to false (as is recommended by GenerateDatasetsXml), because the time dimension often has a huge number of values.
*   For EDDGridFromAudioFiles, you should almost always use the EDDGridFromFiles system for [Aggregation via File Names](#aggregation-via-file-names-or-global-metadata), almost always by extracting the recording's start dateTime from the filenames. For example,
```
    <sourceName>\*\*\*fileName,"timeFormat=yyyyMMdd'\_'HHmmss",aco\_acoustic\\.(\[0-9\]{8}\_\[0-9\]{6})\\.wav,1</sourceName>
```
    GenerateDatasetsXml will encourage this and help you with this.
*   For EDDTableFromAudioFiles, you should almost always use the EDDTableFromFiles system for [\*\*\*fileName pseudo sourceNames](#filename-sourcenames) to extract information from the file's name (almost always the start dateTime for the recording) and promote it to be a column of data. For example,
```
    <sourceName>\*\*\*fileName,aco\_acoustic\\.(\[0-9\]{8}\_\[0-9\]{6})\\.wav,1</sourceName>
```
    The time format should then be specified as the units attribute: &lt;att name="units">yyyMMdd'\_'HHmmss&lt;/att>  
     
### EDDGridFromMergeIRFiles {#eddgridfrommergeirfiles}
[**EDDGridFromMergeIRFiles**](#eddgridfrommergeirfiles) aggregates data from local, [MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README) files, which are from the [Tropical Rainfall Measuring Mission (TRMM)](https://trmm.gsfc.nasa.gov), which is a joint mission between NASA and the Japan Aerospace Exploration Agency (JAXA). MergeIR files can be downloaded from [NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridFromMergeIRFiles.java was written and contributed to the ERDDAP™ project by Jonathan Lafite and Philippe Makowski of R.Tech Engineering (license: copyrighted open source).

EDDGridFromMergeIRFiles is a little unusual:

*   EDDGridFromMergeIRFiles supports compressed or uncompressed source data files, in any combination, in the same dataset. This allows you, for example, to compress older files that are rarely accessed, but uncompress new files that are often accessed. Or, you can change the type of compression from the original .Z to for example, .gz.
*   If you have compressed and uncompressed versions of the same data files in the same directory, please make sure the &lt;fileNameRegex> for your dataset matches the filenames that you want it to match and doesn't match filenames that you don't want it to match.
*   Uncompressed source data files must have no file extension (i.e., no "." in the filename).
*   Compressed source data files must have a file extension, but ERDDAP™ determines the type of compression by inspecting the contents of the file, not by looking at the file's file extension (for example, ".Z"). The supported compression types include "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", and "z". When ERDDAP™ reads compressed files, it decompresses on-the-fly, without writing to a temporary file.
*   All source data files must use the original file naming system: i.e., merg\_*YYYYMMDDHH*\_4km-pixel (where *YYYYMMDDHH* indicates the time associated with the data in the file), plus a file extension if the file is compressed.

See this class' superclass, [EDDGridFromFiles](#eddgridfromfiles), for general information on how this class works and how to use it.

We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.  
 
### EDDGridFromNcFiles {#eddgridfromncfiles}
[**EDDGridFromNcFiles**](#eddgridfromncfiles) aggregates data from local, gridded, [GRIB .grb and .grb2](https://en.wikipedia.org/wiki/GRIB) files, [HDF (v4 or v5) .hdf](https://www.hdfgroup.org/) files, [.ncml](#ncml-files) files, [NetCDF (v3 or v4) .nc](https://www.unidata.ucar.edu/software/netcdf/) files, and [Zarr](https://github.com/zarr-developers/zarr-python) files (as of version 2.25). Zarr files have slightly different behavior and require either the fileNameRegex or the pathRegex to include "zarr".

This may work with other file types (for example, BUFR), we just haven't tested it -- please send us some sample files.

*   For GRIB files, ERDDAP™ will make a .gbx index file the first time it reads each GRIB file. So the GRIB files must be in a directory where the "user" that ran Tomcat has read+write permission.
*   See this class' superclass, [EDDGridFromFiles](#eddgridfromfiles), for information on how this class works and how to use it.
*   Starting with ERDDAP™ v2.12, EDDGridFromNcFiles and EDDGridFromNcFilesUnpacked can read data from "structures" in .nc4 and .hdf4 files. To identify a variable that is from a structure, the &lt;sourceName> must use the format: *fullStructureName*|*memberName*, for example group1/myStruct|myMember .
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
    
#### Groups in Gridded Nc Files {#groups-in-gridded-nc-files}
    [Netcdf4 files can contain groups.](#groups-in-gridded-nc-files) ERDDAP™ just makes a dataset from the variables in one group and all of its parent groups. You can specify a specific group name in GenerateDatasetsXml (omit the trailing slash), or use "" to have GenerateDatasetsXml search all groups for the variables that use the most dimensions, or use "\[root\]" to have GenerateDatasets just look for variables in the root group.
    
    The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.
    

### EDDGridFromNcFilesUnpacked {#eddgridfromncfilesunpacked}
[**EDDGridFromNcFilesUnpacked**](#eddgridfromncfilesunpacked) is a variant of [EDDGridFromNcFiles](#eddgridfromncfiles) which aggregates data from local, gridded NetCDF (v3 or v4) .nc and related files. The difference is that this class unpacks each data file before EDDGridFromFiles looks at the files:

*   It unpacks variables that are packed with [scale\_factor and/or add\_offset](#scale_factor).
*   It converts \_FillValue and missing\_value values to be NaN's (or MAX\_VALUE for integer data types).
*   It converts time and timestamp values to "seconds since 1970-01-01T00:00:00Z".

The big advantage of this class is that it provides a way to deal with different values of scale\_factor, add\_offset, \_FillValue, missing\_value, or time units in different source files in a collection. Otherwise, you would have to use a tool like [NcML](#ncml-files) or [NCO](#netcdf-operators-nco) to modify each file to remove the differences so that the files could be handled by EDDGridFromNcFiles. For this class to work properly, the files must follow the CF standards for the related attributes.

*   If try to make an EDDGridFromNcFilesUnpacked from a group of files with which you previously tried and failed to use EDDGridFromNcFiles, cd to  
    *bigParentDirectory*/dataset/*last2Letters*/*datasetID*/  
    where *last2Letters* is the last 2 letters of the datasetID,  
    and delete all of the files in that directory.
*   Starting with ERDDAP™ v2.12, EDDGridFromNcFiles and EDDGridFromNcFilesUnpacked can read data from "structures" in .nc4 and .hdf4 files. To identify a variable that is from a structure, the &lt;sourceName> must use the format: *fullStructureName*|*memberName*, for example group1/myStruct|myMember .
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
    
    Netcdf4 files can contain groups. See [this documentation](#groups-in-gridded-nc-files).
    
    The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file **before** it is unpacked. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.
    
### EDDGridLonPM180 {#eddgridlonpm180}
[**EDDGridLonPM180**](#eddgridlonpm180) modifies the longitude values of a child (enclosed) EDDGrid dataset that has some longitude values greater than 180 (for example, 0 to 360) so that they are in the range -180 to 180 (Longitude Plus or Minus 180, hence the name).

*   This provides a way to make datasets that have longitude values greater than 180 compliant in/with OGC services (for example the WMS server in ERDDAP), since all OGC services require longitude values within -180 to 180.
*   Working near a discontinuity causes problems, regardless of whether the discontinuity is at longitude 0 or at longitude 180. This dataset type lets you avoid those problems for everyone, by offering two versions of the same dataset:  
    one with longitude values in the range 0 to 360 ("Pacificentric"?),  
    one with longitude values in the range -180 to 180 ("Atlanticentric"?).
*   For child datasets with all longitude values greater than 180, all of the new longitude values are simply 360 degrees lower. For example, a dataset with longitude values of 180 to 240 would become a dataset with longitude values of -180 to -120.
*   For child datasets that have longitude values for the entire globe (roughly 0 to 360), the new longitude value will be rearranged to be (roughly) -180 to 180:  
    The original 0 to almost 180 values are unchanged.  
    The original 180 to 360 values are converted to -180 to 0 and shifted to the beginning of the longitude array.
*   For child datasets that span 180 but don't cover the globe, ERDDAP™ inserts missing values as needed to make a dataset which covers the globe. For example, a child dataset with longitude values of 140 to 200 would become a dataset with longitude values of -180 to 180.  
    The child values of 180 to 200 would become -180 to -160.  
    New longitude values would be inserted from -160 to 140. The corresponding data values will be \_FillValues.  
    The child values of 140 to almost 180 would be unchanged.  
    The insertion of missing values may seem odd, but it avoids several problems that result from having longitude values that jump suddenly (e.g, from -160 to 140).
*   In [GenerateDatasetsXml](#generatedatasetsxml), there is a special "dataset type", EDDGridLonPM180FromErddapCatalog, that lets you generate the datasets.xml for EDDGridLonPM180 datasets from each of the EDDGrid datasets in an ERDDAP that have any longitude values greater than 180. This facilitates offering two versions of these datasets:  
    the original, with longitude values in the range 0 to 360,  
    and the new dataset, with longitude values in the range -180 to 180.
    
    The child dataset within each EDDGridLonPM180 dataset will be an EDDGridFromErddap dataset which points to the original dataset.  
    The new dataset's datasetID will be the name of the original dataset plus "\_LonPM180".  
    For example,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
    Put the EDDGridLonPM180 dataset **below** the original dataset in datasets.xml. That avoids some possible problems.
    
    Alternatively, you can replace the EDDGridFromErddap child dataset with the original dataset's datasets.xml. Then, there will be only one version of the dataset: the one with longitude values within -180 to 180. We discourage this because there are times when each version of the dataset is more convenient.
    
*   If you offer two versions of a dataset, for example, one with longitude 0 to 360 and one with longitude -180 to 180:
    *   You can use the optional [&lt;accessibleViaWMS>false&lt;/accessibleViaWMS>](#accessibleviawms) with the 0-360 dataset to forcibly disable the WMS service for that dataset. Then, only the LonPM180 version of the dataset will be accessible via WMS.
    *   There are a couple of ways to keep the LonPM180 dataset up-to-date with changes to the underlying dataset:
        *   If the child dataset is a EDDGridFromErddap dataset that references a dataset in the same ERDDAP™, the LonPM180 dataset will try to directly subscribe to the underlying dataset so that it is always up-to-date. Direct subscriptions don't generate emails asking you to validate the subscription - validation should be done automatically.
        *   If the child dataset is not an EDDGridFromErddap dataset that is on the same ERDDAP™, the LonPM180 dataset will try to use the regular subscription system to subscribe to the underlying dataset. If you have the subscription system in your ERDDAP™ turned on, you should get emails asking you to validate the subscription. Please do so.
        *   If you have the subscription system in your ERDDAP™ turned off, the LonPM180 dataset may sometimes have outdated metadata until the LonPM180 dataset is reloaded. So if the subscription system is turned off, you should set the [&lt;reloadEveryNMinutes>](#reloadeverynminutes) setting of the LonPM180 dataset to a smaller number, so that it is more likely to catch changes to the child dataset sooner.

#### EDDGridLonPM180 skeleton XML {#eddgridlonpm180-skeleton-xml}

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360 {#eddgridlon0360}
[**EDDGridLon0360**](#eddgridlon0360) modifies the longitude values of a child (enclosed) EDDGrid dataset that has some longitude values less than 0 (for example, -180 to 180) so that they are in the range 0 to 360 (hence the name).

*   Working near a discontinuity causes problems, regardless of whether the discontinuity is at longitude 0 or at longitude 180. This dataset type lets you avoid those problems for everyone, by offering two versions of the same dataset:  
    one with longitude values in the range -180 to 180 ("Atlanticentric"?).  
    one with longitude values in the range 0 to 360 ("Pacificentric"?),
*   For child datasets with all longitude values less than 0, all of the new longitude values are simply 360 degrees higher. For example, a dataset with longitude values of -180 to -120 would become a dataset with longitude values of 180 to 240.
*   For child datasets that have longitude values for the entire globe (roughly -180 to 180), the new longitude value will be rearranged to be (roughly) 0 to 360:  
    The original -180 to 0 values are converted to 180 to 360 and shifted to the end of the longitude array.  
    The original 0 to almost 180 values are unchanged.
*   For child datasets that span lon=0 but don't cover the globe, ERDDAP™ inserts missing values as needed to make a dataset which covers the globe. For example, a child dataset with longitude values of -40 to 20 would become a dataset with longitude values of 0 to 360.  
    The child values of 0 to 20 would be unchanged.  
    New longitude values would be inserted from 20 to 320. The corresponding data values will be \_FillValues.  
    The child values of -40 to 0 would become 320 to 360.  
    The insertion of missing values may seem odd, but it avoids several problems that result from having longitude values that jump suddenly (e.g, from 20 to 320).
*   In [GenerateDatasetsXml](#generatedatasetsxml), there is a special "dataset type", EDDGridLon0360FromErddapCatalog, that lets you generate the datasets.xml for EDDGridLon0360 datasets from each of the EDDGrid datasets in an ERDDAP that have any longitude values greater than 180. This facilitates offering two versions of these datasets:  
    the original, with longitude values in the range 0 to 360,  
    and the new dataset, with longitude values in the range -180 to 180.
    
    The child dataset within each EDDGridLon0360 dataset will be an EDDGridFromErddap dataset which points to the original dataset.  
    The new dataset's datasetID will be the name of the original dataset plus "\_Lon0360".  
    For example,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
    Put the EDDGridLon0360 dataset **below** the original dataset in datasets.xml. That avoids some possible problems.
    
    Alternatively, you can replace the EDDGridFromErddap child dataset with the original dataset's datasets.xml. Then, there will be only one version of the dataset: the one with longitude values within 0 to 360. We discourage this because there are times when each version of the dataset is more convenient.
    
*   If you offer two versions of a dataset, for example, one with longitude 0 to 360 and one with longitude -180 to 180:
    *   You can use the optional [&lt;accessibleViaWMS>false&lt;/accessibleViaWMS>](#accessibleviawms) with the 0 to 360 dataset to forcibly disable the WMS service for that dataset. Then, only the -180 to 180 version of the dataset will be accessible via WMS.
    *   There are a couple of ways to keep the Lon0360 dataset up-to-date with changes to the underlying dataset:
        *   If the child dataset is a EDDGridFromErddap dataset that references a dataset in the same ERDDAP™, the Lon0360 dataset will try to directly subscribe to the underlying dataset so that it is always up-to-date. Direct subscriptions don't generate emails asking you to validate the subscription - validation should be done automatically.
        *   If the child dataset is not an EDDGridFromErddap dataset that is on the same ERDDAP™, the Lon0360 dataset will try to use the regular subscription system to subscribe to the underlying dataset. If you have the subscription system in your ERDDAP™ turned on, you should get emails asking you to validate the subscription. Please do so.
        *   If you have the subscription system in your ERDDAP™ turned off, the Lon0360 dataset may sometimes have outdated metadata until the Lon0360 dataset is reloaded. So if the subscription system is turned off, you should set the [&lt;reloadEveryNMinutes>](#reloadeverynminutes) setting of the Lon0360 dataset to a smaller number, so that it is more likely to catch changes to the child dataset sooner.
#### EDDGridLon0360 skeleton XML {#eddgridlon0360-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSideBySide {#eddgridsidebyside}
[**EDDGridSideBySide**](#eddgridsidebyside) aggregates two or more EDDGrid datasets (the children) side by side.

*   The resulting dataset has all of the variables from all of the child datasets.
*   The parent dataset and all of the child datasets MUST have different datasetIDs. If any names in a family are exactly the same, the dataset will fail to load (with the error message that the values of the aggregated axis are not in sorted order).
*   All children MUST have the same source values for axisVariables\[1+\] (for example, latitude, longitude). The precision of the testing is determined by [matchAxisNDigits](#matchaxisndigits).
*   The children may have different source values for axisVariables\[0\] (for example, time), but they are usually largely the same.
*   The parent dataset will appear to have all of the axisVariables\[0\] source values from all of the children.
*   For example, this lets you combine a source dataset with a vector's u-component and another source dataset with a vector's v-component, so the combined data can be served.
*   Children created by this method are held privately. They are not separately accessible datasets (for example, by client data requests or by [flag files](/docs/server-admin/additional-information#flag)).
*   The global metadata and settings for the parent comes from the global metadata and settings for the first child.
*   If there is an exception while creating the first child, the parent will not be created.
*   If there is an exception while creating other children, this sends an email to emailEverythingTo (as specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)) and continues with the other children.
#### EDDGridSideBySide skeleton XML {#eddgridsidebyside-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridAggregateExistingDimension {#eddgridaggregateexistingdimension}
[**EDDGridAggregateExistingDimension**](#eddgridaggregateexistingdimension) aggregates two or more EDDGrid datasets each of which has a different range of values for the first dimension, but identical values for the other dimensions.

*   For example, one child dataset might have 366 values (for 2004) for the time dimension and another child might have 365 values (for 2005) for the time dimension.
*   All the values for all of the other dimensions (for example, latitude, longitude) MUST be identical for all of the children. The precision of the testing is determined by [matchAxisNDigits](#matchaxisndigits).
*   Sorted Dimension Values - The values for each dimension MUST be in sorted order (ascending or descending). The values can be irregularly spaced. There can be no ties. This is a requirement of the [CF metadata standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). If any dimension's values aren't in sorted order, the dataset won't be loaded and ERDDAP™ will identify the first unsorted value in the log file, *bigParentDirectory*/logs/log.txt .
    
    Unsorted dimension values almost always indicate a problem with the source dataset. This most commonly occurs when a misnamed or inappropriate file is included in the aggregation, which leads to an unsorted time dimension. To solve this problem, see the error message in the ERDDAP™ log.txt file to find the offending time value. Then look in the source files to find the corresponding file (or one before or one after) that doesn't belong in the aggregation.
    
*   The parent dataset and the child dataset MUST have different datasetIDs. If any names in a family are exactly the same, the dataset will fail to load (with the error message that the values of the aggregated axis are not in sorted order).
*   Currently, the child dataset MUST be an EDDGridFromDap dataset and MUST have the lowest values of the aggregated dimension (usually the oldest time values). All of the other children MUST be almost identical datasets (differing just in the values for the first dimension) and are specified by just their sourceUrl.
*   The aggregate dataset gets its metadata from the first child.
*   The [GenerateDatasetsXml program](#generatedatasetsxml) can make a rough draft of the datasets.xml for an EDDGridAggregateExistingDimension based on a set of files served by a Hyrax or THREDDS server. For example, use this input for the program (the "/1988" in the URL makes the example run faster):
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\*\\.nc")? month.\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
    You can use the resulting &lt;sourceUrl> tags or delete them and uncomment the &lt;sourceUrl> tag (so that new files are noticed each time the dataset is reloaded.
#### EDDGridAggregateExistingDimension skeleton XML {#eddgridaggregateexistingdimension-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\=".\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridCopy {#eddgridcopy}
[**EDDGridCopy**](#eddgridcopy) makes and maintains a local copy of another EDDGrid's data and serves data from the local copy.

*   EDDGridCopy (and for tabular data, [EDDTableCopy](#eddtablecopy)) is a very easy to use and a very effective  
    **solution to some of the biggest problems with serving data from a remote data source:**
    *   Accessing data from a remote data source can be slow.
        *   It may be slow because it is inherently slow (for example, an inefficient type of server),
        *   because it is overwhelmed by too many requests,
        *   or because your server or the remote server is bandwidth limited.
    *   The remote dataset is sometimes unavailable (again, for a variety of reasons).
    *   Relying on one source for the data doesn't scale well (for example, when many users and many ERDDAPs utilize it).  
         
*   How It Works -- EDDGridCopy solves these problems by automatically making and maintaining a local copy of the data and serving data from the local copy. ERDDAP™ can serve data from the local copy very, very quickly. And making a local copy relieves the burden on the remote server. And the local copy is a backup of the original, which is useful in case something happens to the original.
    
    There is nothing new about making a local copy of a dataset. What is new here is that this class makes it \*easy\* to create and \*maintain\* a local copy of data from a \*variety\* of types of remote data sources and \*add metadata\* while copying the data.
    
*   Chunks of Data -- EDDGridCopy makes the local copy of the data by requesting chunks of data from the remote &lt;dataset> . There will be a chunk for each value of the leftmost (first) axis variable. EDDGridCopy doesn't rely on the remote dataset's index numbers for the axis -- those may change.
    
    WARNING: If the size of a chunk of data is so big (> 2GB) that it causes problems, EDDGridCopy can't be used. (Sorry, we hope to have a solution for this problem in the future.)
    
*   \[An alternative to EDDGridCopy -  
    If the remote data is available via downloadable files, not a web service, use [cacheFromUrl option for EDDGridFromFiles](#cachefromurl), which makes a local copy of the remote files and serves the data from the local files.\]
*   Local Files -- Each chunk of data is stored in a separate NetCDF file in a subdirectory of *bigParentDirectory*/copy/*datasetID*/ (as specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)). Filenames created from axis values are modified to make them file-name-safe (for example, hyphens are replaced by "x2D") -- this doesn't affect the actual data.  
     
*   New Data -- Each time EDDGridCopy is reloaded, it checks the remote &lt;dataset> to see what chunks are available. If the file for a chunk of data doesn't already exist, a request to get the chunk is added to a queue. ERDDAP's taskThread processes all the queued requests for chunks of data, one-by-one. You can see statistics for the taskThread's activity on the [Status Page](/docs/server-admin/additional-information#status-page) and in the [Daily Report](/docs/server-admin/additional-information#daily-report). (Yes, ERDDAP™ could assign multiple tasks to this process, but that would use up lots of the remote data source's bandwidth, memory, and CPU time, and lots of the local ERDDAP's bandwidth, memory, and CPU time, neither of which is a good idea.)
    
    NOTE: The very first time an EDDGridCopy is loaded, (if all goes well) lots of requests for chunks of data will be added to the taskThread's queue, but no local data files will have been created. So the constructor will fail but taskThread will continue to work and create local files. If all goes well, the taskThread will make some local data files and the next attempt to reload the dataset (in ~15 minutes) will succeed, but initially with a very limited amount of data.
    
    NOTE: After the local dataset has some data and appears in your ERDDAP, if the remote dataset is temporarily or permanently not accessible, the local dataset will still work.
    
    WARNING: If the remote dataset is large and/or the remote server is slow (that's the problem, isn't it?!), it will take a long time to make a complete local copy. In some cases, the time needed will be unacceptable. For example, transmitting 1 TB of data over a T1 line (0.15 GB/s) takes at least 60 days, under optimal conditions. Plus, it uses lots of bandwidth, memory, and CPU time on the remote and local computers. The solution is to mail a hard drive to the administrator of the remote data set so that s/he can make a copy of the dataset and mail the hard drive back to you. Use that data as a starting point and EDDGridCopy will add data to it. (That is one way that [Amazon's EC2 Cloud Service](https://aws.amazon.com/importexport/) handles the problem, even though their system has lots of bandwidth.)
    
    WARNING: If a given value for the leftmost (first) axis variable disappears from the remote dataset, EDDGridCopy does NOT delete the local copied file. If you want to, you can delete it yourself.
    
#### Grid Copy checkSourceData {#grid-copy-checksourcedata}
The datasets.xml for this dataset can have an optional tag  
```
    <checkSourceData>true</checkSourceData>  
```
    The default value is true. If/when you set it to false, the dataset won't ever check the source dataset to see if there is additional data available.  

#### onlySince {#onlysince}
You can tell EDDGridCopy to make a copy of a subset of the source dataset, instead of the entire source dataset, by adding a tag in the form &lt;onlySince>*someValue*&lt;/onlySince> to the dataset's datasets.xml chunk. EDDGridCopy will only download data values related to the values of the first dimension (usually the time dimension) which are greater than *someValue*. *someValue* can be:
    *   A relative time specified via now-*nUnits*.  
        For example, &lt;onlySince>now-2years&lt;/onlySince> tells the dataset to only make local copies of the data for data where the outer dimension's values (usually time values) are within the last 2 years (which is re-evaluated each time the dataset is reloaded, which is when it looks for new data to copy). See the [now-*nUnits* syntax description](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). This is useful if the first dimension has time data, which it usually does.
        
        EDDGridCopy does not delete local data files which have data that, over time, becomes older than now-*nUnits*. You can delete those files any time if you choose to. If you do, we strongly recommend that you set a [flag](/docs/server-admin/additional-information#flag) after you delete the files to tell EDDGridCopy to update the list of cached files.
        
    *   A fixed point in time specified as an ISO 8601 string yyyy-MM-ddTHH:mm:ssZ .  
        For example, &lt;onlySince>2000-01-01T00:00:00Z&lt;/onlySince> tells the dataset only to make local copies of data where the first dimension's value is \>=2000-01-01T00:00:00Z . This is useful if the first dimension has time data, which it usually does.  
         
    *   A floating point number.  
        For example, &lt;onlySince>946684800.0&lt;/onlySince> . The units will be the destination units of the first dimension. For example, for time dimensions, the units in ERDDAP™ are always "seconds since 1970-01-01T00:00:00Z". So 946684800.0 "seconds since 1970-01-01T00:00:00Z" is equivalent to 2000-01-01T00:00:00Z. This is always a useful option, but is especially useful when the first dimension doesn't have time data.  

#### EDDGridCopy Recomended use {#eddgridcopy-recomended-use}
1.  Create the &lt;dataset> entry (the native type, not EDDGridCopy) for the remote data source.  
    **Get it working correctly, including all of the desired metadata.**
2.  If it is too slow, add XML code to wrap it in an EDDGridCopy dataset.
    *   Use a different datasetID (perhaps by changing the datasetID of the old datasetID slightly).
    *   Copy the &lt;accessibleTo>, &lt;reloadEveryNMinutes> and &lt;onChange> from the remote EDDGrid's XML to the EDDGridCopy's XML. (Their values for EDDGridCopy matter; their values for the inner dataset become irrelevant.)
3.  ERDDAP™ will make and maintain a local copy of the data.  
         
*   WARNING: EDDGridCopy assumes that the data values for each chunk don't ever change. If/when they do, you need to manually delete the chunk files in *bigParentDirectory*/copy/*datasetID*/ which changed and [flag](/docs/server-admin/additional-information#flag) the dataset to be reloaded so that the deleted chunks will be replaced. If you have an email subscription to the dataset, you will get two emails: one when the dataset first reloads and starts to copy the data, and another when the dataset loads again (automatically) and detects the new local data files.  
     
*   All axis values must be equal.  
    For each of the axes except the leftmost (first), all of the values must be equal for all children. The precision of the testing is determined by [matchAxisNDigits](#matchaxisndigits).  
     
*   Settings, Metadata, Variables -- EDDGridCopy uses settings, metadata, and variables from the enclosed source dataset.  
     
*   Change Metadata -- If you need to change any addAttributes or change the order of the variables associated with the source dataset:
    1.  Change the addAttributes for the source dataset in datasets.xml, as needed.
    2.  Delete one of the copied files.
    3.  Set a [flag](/docs/server-admin/additional-information#flag) to reload the dataset immediately. If you do use a flag and you have an email subscription to the dataset, you will get two emails: one when the dataset first reloads and starts to copy the data, and another when the dataset loads again (automatically) and detects the new local data files.
    4.  The deleted file will be regenerated with the new metadata. If the source dataset is ever unavailable, the EDDGridCopy dataset will get metadata from the regenerated file, since it is the youngest file.  
#### EDDGridCopy skeleton XML {#eddgridcopy-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromCassandra {#eddtablefromcassandra}
[**EDDTableFromCassandra**](#eddtablefromcassandra) handles data from one [Cassandra](https://cassandra.apache.org/) table. Cassandra is a NoSQL database. 

*   ERDDAP™ can work with Cassandra v2 and v3 with no changes or differences in setup. We have tested with [Cassandra v2 and v3 from Apache](https://cassandra.apache.org/download/). It is likely that ERDDAP™ can also work with Cassandra downloaded from DataStax.  
     
*   For Aug 2019 - May 2021, we had trouble getting Cassandra to work with AdoptOpenJdk Java v8. It threw an EXCEPTION\_ACCESS\_VIOLATION). But now (May 2021), that problem is gone: we can successfully use Cassandra v2.1.22 and AdoptOpenJdk jdk8u292-b10.  
     
#### One Table {#one-table}
Cassandra doesn't support "joins" in the way that relational databases do. One ERDDAP™ EDDTableFromCassandra dataset maps to one (perhaps a subset of one) Cassandra table.  

#### Cassandra datasets.xml {#cassandra-datasetsxml}
*   ERDDAP™ comes with the Cassandra Java driver, so you don't need to install it separately.
*   Carefully read all of this document's information about EDDTableFromCassandra. Some of the details are very important.
*   The Cassandra Java driver is intended to work with Apache Cassandra (1.2+) and DataStax Enterprise (3.1+). If you are using Apache Cassandra 1.2.x, you must edit the cassandra.yaml file for each node to set start\_native\_transport: true, then restart each node.
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it (especially [&lt;partitionKeySourceNames>](#partitionkeysourcenames)). You can gather most of the information you need to create the XML for an EDDTableFromCassandra dataset by contacting the Cassandra administrator and by searching the web.
    
    GenerateDatasetsXml has two special options for EDDTableFromCassandra:
    
    1.  If you enter "!!!LIST!!!" (without the quotes) for the keyspace, the program will display a list of keyspaces
    2.  If you enter a specific keyspace and then enter "!!!LIST!!!" (without the quotes) for the tablename, the program will display a list of tables in that keyspace and their columns.
##### Case sensitivity {#case-sensitivity}
*   Case-insensitive Keyspace and Table Names -  
    Cassandra treats keyspace and table names in a case-insensitive way. Because of this, you MUST NEVER use a reserved word (but with a different case) as a Cassandra keyspace or table name.
*   Case-insensitive Column Names --  
    By default, Cassandra treats column names in a case-insensitive way. If you use one of Cassandra's reserved words as a column name (please don't!), you MUST use  
```
        <columnNameQuotes>"<columnNameQuotes>  
```
    in datasets.xml for this dataset so that Cassandra and ERDDAP™ will treat the column names in a case-sensitive way. This will likely be a massive headache for you, because it is hard to determine the case-sensitive versions of the column names -- Cassandra almost always displays the column names as all lower-case, regardless of the true case.
*   Work closely with the Cassandra administrator, who may have relevant experience. If the dataset fails to load, read the [error message](#troubleshooting-tips) carefully to find out why.  
         
#### Cassandra &lt;connectionProperty&gt; {#cassandra-connectionproperty}
Cassandra has connection properties which can be specified in datasets.xml. Many of these will affect the performance of the Cassandra-ERDDAP™ connection. Unfortunately, Cassandra properties must be set programmatically in Java, so ERDDAP™ must have code for each property ERDDAP™ supports. Currently, ERDDAP™ supports these properties:  
(The defaults shown are what we see. Your system's defaults may be different.)

*   **General Options**  
    &lt;connectionProperty name="**compression**">*none|LZ4|snappy*&lt;/connectionProperty> (case-insensitive, default=none)  
    (General compression advice: use 'none' if the connection between Cassandra and ERDDAP™ is local/fast and use 'LZ4' if the connection is remote/slow.)  
    &lt;connectionProperty name="**credentials**">*username/password*&lt;/connectionProperty> (that's a literal '/')  
    &lt;connectionProperty name="**metrics**">*true|false*&lt;/connectionProperty> (2021-01-25 was default=true, now ignored and always false)  
    &lt;connectionProperty name="**port**">*anInteger*&lt;/connectionProperty> (default for native binary protocol=9042)  
    &lt;connectionProperty name="**ssl**">*true|false*&lt;/connectionProperty> (default=false)  
    (My quick attempt to use ssl failed. If you succeed, please tell me how you did it.)
*   **Query Options**  
    &lt;connectionProperty name="**consistencyLevel**">*all|any|each\_quorum|local\_one|local\_quorum| local\_serial|one|quorum|serial|three|two*&lt;/connectionProperty> (case-insensitive, default=ONE)  
    &lt;connectionProperty name="**fetchSize**">*anInteger*&lt;/connectionProperty> (default=5000)  
    (Do not set fetchSize to a smaller value.)  
    &lt;connectionProperty name="**serialConsistencyLevel**">*all|any|each\_quorum|local\_one|local\_quorum| local\_serial|one|quorum|serial|three|two*&lt;/connectionProperty> (case-insensitive, default=SERIAL)
*   **Socket Options**  
    &lt;connectionProperty name="**connectTimeoutMillis**">*anInteger*&lt;/connectionProperty> (default=5000)  
    (Do not set connectTimeoutMillis to a smaller value.)  
    &lt;connectionProperty name="**keepAlive**">*true|false*&lt;/connectionProperty>  
    &lt;connectionProperty name="**readTimeoutMillis**">*anInteger*&lt;/connectionProperty>  
    (Cassandra's default readTimeoutMillis is 12000, but ERDDAP™ changes the default to 120000. If Cassandra is throwing readTimeouts, increasing this may not help, because Cassandra sometimes throws them before this time. The problem is more likely that you are storing too much data per partitionKey combination.)  
    &lt;connectionProperty name="**receiveBufferSize**">*anInteger*&lt;/connectionProperty>  
    (It is unclear what the default receiveBufferSize is. Don't set this to a small value.)  
    &lt;connectionProperty name="**soLinger**">*anInteger*&lt;/connectionProperty>  
    &lt;connectionProperty name="**tcpNoDelay**">*true|false*&lt;/connectionProperty> (default=null)

If you need to be able to set other connection properties, see our [section on getting additional support](/docs/intro#support).

For a given startup of Tomcat, connectionProperties are only used the first time a dataset is created for a given Cassandra URL. All reloads of that dataset and all subsequent datasets that share the same URL will use those original connectionProperties.
    
#### CQL {#cql}
The Cassandra Query Language (CQL) is superficially like SQL, the query language used by traditional databases. Because OPeNDAP's tabular data requests were designed to mimic SQL tabular data requests, it is possible for ERDDAP™ to convert tabular data requests into CQL Bound/PreparedStatements. ERDDAP™ logs the statement in [log.txt](/docs/server-admin/additional-information#log) as  
    statement as text: *theStatementAsText*  
    The version of the statement you see will be a text representation of the statement and will only have "?" where constraint values will be placed.  
       
    Not so simple -- Unfortunately, CQL has many restrictions on which columns can be queried with which types of constraints, for example, partition key columns can be constrained with = and IN, so ERDDAP™ sends some constraints to Cassandra and applies all constraints after the data is received from Cassandra. To help ERDDAP™ deal efficiently with Cassandra, you need to specify [&lt;partitionKeySourceNames>](#partitionkeysourcenames), [&lt;clusterColumnSourceNames>](#clustercolumnsourcenames), and [&lt;indexColumnSourceNames>](#indexcolumnsourcenames) in datasets.xml for this dataset. These are the most important ways to help ERDDAP™ work efficiently with Cassandra. If you don't tell ERDDAP™ this information, the dataset will be painfully slow in ERDDAP™ and use tons of Cassandra resources.  
     
#### &lt;partitionKeySourceNames&gt; {#partitionkeysourcenames}
Because partition keys play a central role in Cassandra tables, ERDDAP™ needs to know their sourceNames and, if relevant, other information about how to work with them.
*   You MUST specify a comma-separated list of partition key source column names in datasets.xml via &lt;partitionKeySourceNames>.  
    Simple example,  
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
        More complex example,  
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
*   TimeStamp Partition Keys -- If one of the partition key columns is a timestamp column that has a coarser version of another timestamp column, specify this via  
    *partitionKeySourcName/otherColumnSourceName/time\_precision*  
    where time\_precision is one of the [time\_precision](#time_precision) strings used elsewhere in ERDDAP.  
    The trailing Z in the time\_precision string is the default, so it doesn't matter if the time\_precision string ends in Z or not.  
    For example, ERDDAP™ will interpret date/sampletime/1970-01-01 as "Constraints for date can be constructed from constraints on sampletime by using this time\_precision." The actual conversion of constraints is more complex, but that is the overview.  
    **Use this whenever it is relevant.** It enables ERDDAP™ to work efficiently with Cassandra. If this relationship between columns exists in a Cassandra table and you don't tell ERDDAP™, the dataset will be painfully slow in ERDDAP™ and use tons of Cassandra resources.
*   Single Value Partition Keys -- If you want an ERDDAP™ dataset to work with only one value of one partition key, specify *partitionKeySourceName=value*.  
    Don't use quotes for a numeric column, for example, deviceid=1007  
    Do use quotes for a String column, for example, stationid="Point Pinos"
*   Dataset Default Sort Order -- The order of the partition key &lt;dataVariable>'s in datasets.xml determines the default sort order of the results from Cassandra. Of course, users can request a different sort order for a given set of results by appending &orderBy("*comma-separated list of variables*") to the end of their query.
*   By default, Cassandra and ERDDAP™ treat column names in a case-insensitive way. But if you set [columnNameQuotes](#case-sensitivity) to ", ERDDAP™ will treat Cassandra column names a in case-sensitive way.  
         
#### &lt;partitionKeyCSV&gt; {#partitionkeycsv}
If this is specified, ERDDAP™ will use it instead of asking Cassandra for the partitionKey information each time the dataset is reloaded. This provides the list of distinct partition key values, in the order they'll be used. Times must be specified as seconds since 1970-01-01T00:00:00Z. But there are also two special alternate ways to specify times (each encoded as a string):  

1) time(aISO8601Time) (MAY be encoded as a string)  
2) "times(anISO8601StartTime, strideSeconds, stopTime)" (MUST be encoded as a string)  
stopTime can be an ISO8601Time or a "now-nUnits" time (e.g., "now-3minutes").  
stopTime doesn't have to be an exact match of startTime + x strideSeconds.  
A row with a times() value gets expanded into multiple rows before every query, so the list of partitionKeys can be always perfectly up-to-date.  
For example,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
expands into this table of partition key combinations:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames&gt; {#clustercolumnsourcenames}
Cassandra accepts SQL-like constraints on cluster columns, which are the columns that form the second part of the primary key (after the partition key(s)). So, it is essential that you identify these columns via &lt;clusterColumnSourceNames>. This enables ERDDAP™ to work efficiently with Cassandra. If there are cluster columns and you don't tell ERDDAP, the dataset will be painfully slow in ERDDAP™ and use tons of Cassandra resources.
    *   For example, &lt;clusterColumnSourceNames>*myClusterColumn1, myClusterColumn2*&lt;/clusterColumnSourceNames>
    *   If a Cassandra table has no cluster columns, either don't specify &lt;clusterColumnSourceNames>, or specify it with no value.
    *   By default, Cassandra and ERDDAP™ treat column names in a case-insensitive way. But if you set [columnNameQuotes](#case-sensitivity) to ", ERDDAP™ will treat Cassandra column names in a case-sensitive way.  
         
#### &lt;indexColumnSourceNames&gt; {#indexcolumnsourcenames}
Cassandra accepts '=' constraints on secondary index columns, which are the columns that you have explicitly created indexes for via  
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
(Yes, the parentheses are required.)  
So, it is very useful if you identify these columns via &lt;indexColumnSourceNames>. This enables ERDDAP™ to work efficiently with Cassandra. If there are index columns and you don't tell ERDDAP, some queries will be needlessly, painfully slow in ERDDAP™ and use tons of Cassandra resources.
*   For example, &lt;indexColumnSourceNames>*myIndexColumn1, myIndexColumn2*&lt;/indexColumnSourceNames>
*   If a Cassandra table has no index columns, either don't specify &lt;indexColumnSourceNames>, or specify it with no value.
*   WARNING: Cassandra indexes aren't like database indexes. Cassandra indexes only help with '=' constraints. And they are only [recommended](https://cassandra.apache.org/doc/latest/cql/indexes.html) for columns that have far fewer distinct values than total values.
*   By default, Cassandra and ERDDAP™ treat column names in a case-insensitive way. But if you set [columnNameQuotes](#case-sensitivity) to ", ERDDAP™ will treat Cassandra column names in a case-sensitive way.  
         
#### &lt;maxRequestFraction&gt; {#maxrequestfraction}
When ERDDAP™ (re)loads a dataset, ERDDAP™ gets from Cassandra the list of distinct combinations of the partition keys. For a huge dataset, the number of combinations will be huge. If you want to prevent users requests from requesting most or all of the dataset (or even a request that asks ERDDAP™ to download most or all of the data in order to further filter it), you can tell ERDDAP™ only to allow requests that reduce the number of combinations by some amount via &lt;maxRequestFraction>, which is a floating point number between 1e-10 (which means that the request can't need more than 1 combination in a billion) and 1 (the default, which means that the request can be for the entire dataset).  
    For example, if a dataset has 10000 distinct combinations of the partition keys and maxRequestFraction is set to 0.1,  
    then requests which need data from 1001 or more combinations will generate an error message,  
    but requests which need data from 1000 or fewer combinations will be allowed.
    
    Generally, the larger the dataset, the lower you should set &lt;maxRequestFraction>. So you might set it to 1 for a small dataset, 0.1 for a medium-sized dataset, 0.01 for a large dataset, and 0.0001 for a huge dataset.
    
    This approach is far from perfect. It will lead to some reasonable requests being rejected and some too-big requests being allowed. But it is a difficult problem and this solution is much better than nothing.
    
#### Cassandra subsetVariables {#cassandra-subsetvariables}
As with other EDDTable datasets, you can specify a comma-separated list of &lt;dataVariable> destinationNames in a global attribute called "[subsetVariables](#subsetvariables)" to identify variables which have a limited number of values. The dataset will then have a .subset web page and show lists of distinct values for those variables in drop-down lists on many web pages.
    
    Including just partition key variables and static columns in the list is STRONGLY ENCOURAGED. Cassandra will be able to generate the list of distinct combinations very quickly and easily each time the dataset is reloaded. One exception is timestamp partition keys that are coarse versions of some other timestamp column -- it is probably best to leave these out of the list of subsetVariables since there are a large number of values and they aren't very useful to users.
    
    If you include non-partition key, non-static variables in the list, it will probably be **very** computationally expensive for Cassandra each time the dataset is reloaded, because ERDDAP™ has to look through every row of the dataset to generate the information. In fact, the query is likely to fail. So, except for very small datasets, this is STRONGLY DISCOURAGED.
    
#### Cassandra DataTypes {#cassandra-datatypes}
Because there is some ambiguity about which [Cassandra data types](https://cassandra.apache.org/doc/latest/cql/types.html) map to which ERDDAP™ data types, you need to specify a [&lt;dataType>](#datatype) tag for each [&lt;dataVariable>](#datavariable) to tell ERDDAP™ which dataType to use. The standard ERDDAP™ dataTypes (and the most common corresponding Cassandra data types) are:
    
*   [boolean](#boolean-data) (boolean), which ERDDAP™ then stores as bytes
*   byte (int, if the range is -128 to 127)
*   short (int, if the range is -32768 to 32767)
*   int (int, counter?, varint?, if the range is -2147483648 to 2147483647)
*   long (bigint, counter?, varint?, if the range is -9223372036854775808 to 9223372036854775807)
*   float (float)
*   double (double, decimal (with possible loss of precision), timestamp)
*   char (ascii or text, if they never have more than 1 character)
*   String (ascii, text, varchar, inet, uuid, timeuuid, blob, map, set, list?)

Cassandra's [timestamp](#cassandra-timestamp-data) is a special case: use ERDDAP's double dataType.

If you specify a String dataType in ERDDAP™ for a Cassandra map, set or list, the map, set or list on each Cassandra row will be converted to a single string on a single row in the ERDDAP™ table. ERDDAP™ has an alternative system for lists; see below.

*type*Lists -- ERDDAP's [&lt;dataType>](#datatype) tag for Cassandra dataVariables can include the regular ERDDAP™ dataTypes (see above) plus several special dataTypes that can be used for Cassandra list columns: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. When one of these list columns is in the results being passed to ERDDAP™, each row of source data will be expanded to list.size() rows of data in ERDDAP; simple dataTypes (for example, int) in that source data row will be duplicated list.size() times. If the results contain more than one list variable, all lists on a given row of data MUST have the same size and MUST be "parallel" lists, or ERDDAP™ will generate an error message. For example, for currents measurements from an ADCP,  
  depth\[0\], uCurrent\[0\], vCurrent\[0\], and zCurrent\[0\] are all related, and  
  depth\[1\], uCurrent\[1\], vCurrent\[1\], and zCurrent\[1\] are all related, ...  
Alternatively, if you don't want ERDDAP™ to expand a list into multiple rows in the ERDDAP™ table, specify String as the dataVariable's dataType so the entire list will be represented as one String on one row in ERDDAP.
    
#### Cassandra TimeStamp Data {#cassandra-timestamp-data}
Cassandra's timestamp data is always aware of time zones. If you enter timestamp data without specifying a timezone, Cassandra assumes the timestamp uses the local time zone.
    
ERDDAP™ supports timestamp data and always presents the data in the Zulu/GMT time zone. So if you enter timestamp data in Cassandra using a time zone other than Zulu/GMT, remember that you need to do all queries for timestamp data in ERDDAP™ using the Zulu/GMT time zone. So don't be surprised when the timestamp values that come out of ERDDAP are shifted by several hours because of the time zone switch from local to Zulu/GMT time.

*   In ERDDAP's datasets.xml, in the &lt;dataVariable> tag for a timestamp variable, set  
```
          <dataType>double</dataType>  
```
and in &lt;addAttributes> set  
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
*   Suggestion: If the data is a time range, it is useful to have the timestamp values refer to the center of the implied time range (for example, noon). For example, if a user has data for 2010-03-26T13:00Z from another dataset and they want the closest data from this Cassandra dataset that has data for each day, then the data for 2010-03-26T12:00Z (representing Cassandra data for that date) is obviously the best (as opposed to the midnight before or after, where it is less obvious which is best).
*   ERDDAP™ has a utility to [Convert a Numeric Time to/from a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
*   See [How ERDDAP™ Deals with Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).  
         
#### Integer nulls {#integer-nulls}
Cassandra supports nulls in Cassandra int (ERDDAP™ int) and bigint (ERDDAP™ long) columns, but ERDDAP™ doesn't support true nulls for any integer data type.  
    By default, Cassandra integer nulls will be converted in ERDDAP™ to 2147483647 for int columns, or 9223372036854775807 for long columns. These will appear as "NaN" in some types of text output files (for example, .csv), "" in other types of text output files (for example, .htmlTable), and the specific number (2147483647 for missing int values) in other types of files (for example, binary files like .nc and mat). A user can search for rows of data with this type of missing value by referring to "NaN", e.g, "&windSpeed=NaN".
    
    If you use some other integer value to indicate missing values in your Cassandra table, please identify that value in datasets.xml:  

>    &lt;att name="missing\_value" [type="int"](#attributetype)\>-999&lt;/att>

    For Cassandra floating point columns, nulls get converted to NaNs in ERDDAP. For Cassandra data types that are converted to Strings in ERDDAP™, nulls get converted to empty Strings. That shouldn't be a problem.
    
#### "WARNING: Re-preparing already prepared query" {#warning-re-preparing-already-prepared-query}
*   "WARNING: Re-preparing already prepared query" in *tomcat*/logs/catalina.out (or some other Tomcat log file)  
    Cassandra documentation says there is trouble if the same query is made into a PreparedStatement twice (or more). (See this [bug report](https://datastax-oss.atlassian.net/browse/JAVA-236).) To avoid making Cassandra mad, ERDDAP™ caches all PreparedStatements so it can reuse them. That cache is lost if/when Tomcat/ERDDAP™ is restarted, but I think that is okay because the PreparedStatements are associated with a given session (between Java and Cassandra), which is also lost. So, you may see these messages. I know of no other solution. Fortunately, it is a warning, not an error (although Cassandra threatens that it may lead to performance problems).
    
    Cassandra claims that PreparedStatements are good forever, so ERDDAP's cached PreparedStatements should never become out-of-date/invalid. If that isn't true, and you get errors about certain PreparedStatements being out-of-date/invalid, then you need to restart ERDDAP™ to clear ERDDAP's cache of PreparedStatements.
    
#### Cassandra Security {#cassandra-security}
See [Securing Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

When working with Cassandra, you need to do things as safely and securely as possible to avoid allowing a malicious user to damage your Cassandra or gain access to data they shouldn't have access to. ERDDAP™ tries to do things in a secure way, too.

*   We encourage you to set up ERDDAP™ to connect to Cassandra as a Cassandra user that only has access to the **relevant** table(s) and only has READ privileges.
*   We encourage you to set up the connection from ERDDAP™ to Cassandra so that it
    *   always uses SSL,
    *   only allows connections from one IP address (or one block of addresses) and from the one ERDDAP™ user, and
    *   only transfers passwords in their MD5 hashed form.
*   \[KNOWN PROBLEM\] The connectionProperties (including the password!) are stored as plain text in datasets.xml. We haven't found a way to allow the administrator to enter the Cassandra password during ERDDAP's startup in Tomcat (which occurs without user input), so the password must be accessible in a file. To make this more secure:
    *   You (the ERDDAP™ administrator) should be the owner of datasets.xml and have READ and WRITE access.
    *   Make a group that includes only user=tomcat. Use chgrp to make that the group for datasets.xml, with just READ privileges.
    *   Use chmod to assign o-rwx privileges (no READ or WRITE access for "other" users) for datasets.xml.
*   When in ERDDAP™, the password and other connection properties are stored in "private" Java variables.
*   Requests from clients are parsed and checked for validity before generating the CQL requests for Cassandra.
*   Requests to Cassandra are made with CQL Bound/PreparedStatements, to prevent CQL injection. In any case, Cassandra is inherently less susceptible to CQL injection than traditional databases are to [SQL injection](https://en.wikipedia.org/wiki/SQL_injection).  
         
#### Cassandra Speed {#cassandra-speed}
Cassandra can be fast or slow. There are some things you can do to make it fast:
*   In General -  
    The nature of CQL is that queries are [declarative](https://en.wikipedia.org/wiki/Declarative_programming). They just specify what the user wants. They don't include a specification or hints for how the query is to be handled or optimized. So there is no way for ERDDAP™ to generate the query in such a way that it helps Cassandra optimize the query (or in any way specifies how the query is to be handled). In general, it is up to the Cassandra administrator to set things up (for example, indexes) to optimize for certain types of queries.  
     
*   Specifying the timestamp columns that are related to coarser-precision timestamp partition keys via [&lt;partitionKeySourceNames>](#partitionkeysourcenames) is the most important way to help ERDDAP™ work efficiently with Cassandra. If this relationship exists in a Cassandra table and you don't tell ERDDAP™, the dataset will be painfully slow in ERDDAP™ and use tons of Cassandra resources.  
     
*   Specifying the cluster columns via [&lt;clusterColumnSourceNames>](#clustercolumnsourcenames) is the second most important way to help ERDDAP™ work efficiently with Cassandra. If there are cluster columns and you don't tell ERDDAP, a large subset of the possible queries for data will be needlessly, painfully slow in ERDDAP™ and use tons of Cassandra resources.  
     
*   Make [Indexes](https://cassandra.apache.org/doc/latest/cql/indexes.html) for Commonly Constrained Variables --  
    You can speed a few queries by creating indexes for Cassandra columns that are often constrained with "=" constraints.
    
    Cassandra can't make indexes for list, set, or map columns.
    
*   Specifying the index columns via [&lt;indexColumnSourceNames>](#indexcolumnsourcenames) is an important way to help ERDDAP™ work efficiently with Cassandra. If there are index columns and you don't tell ERDDAP, some queries for data will be needlessly, painfully slow in ERDDAP™ and use tons of Cassandra resources.  
     
#### Cassandra Stats {#cassandra-stats}
*   ["Cassandra stats" Diagnostic Messages](#cassandra-stats) -- For every ERDDAP™ user query to a Cassandra dataset, ERDDAP™ will print a line in the log file, *bigParentDirectory*/logs/log.txt, with some statistics related to the query, for example,  
```
        \* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Using the numbers in the example above, this means:

*   When ERDDAP™ last (re)loaded this dataset, Cassandra told ERDDAP™ that there were 10000 distinct combinations of the partition keys. ERDDAP™ cached all of the distinct combinations in a file.
*   Due to the user's constraints, ERDDAP™ identified 2 combinations out of the 10000 that might have the desired data. So, ERDDAP™ will make 2 calls to Cassandra, one for each combination of the partition keys. (That's what Cassandra requires.) Clearly, it is troublesome if a large dataset has a large number of combinations of the partition keys and a given request doesn't drastically reduce that. You can require that each request reduce the key space by setting [&lt;maxRequestFraction>](#maxrequestfraction). Here, 2/10000=2e-4, which is less than the maxRequestFraction (0.1), so the request was allowed.
*   After applying the constraints on the partition keys, [cluster columns](#clustercolumnsourcenames), and [index columns](#indexcolumnsourcenames) which were sent by ERDDAP™, Cassandra returned 1200 rows of data to ERDDAP™ in the ResultSet.
*   The ResultSet must have had [dataType=*sometype*List](#cassandra-datatypes) columns (with an average of 10 items per list), because ERDDAP™ expanded the 1200 rows from Cassandra into 12000 rows in ERDDAP.
*   ERDDAP™ always applies all of the user's constraints to the data from Cassandra. In this case, constraints which Cassandra had not handled reduced the number of rows to 7405. That is the number of rows sent to the user.

The most important use of these diagnostic messages is to make sure that ERDDAP™ is doing what you think it is doing. If it isn't (for example, is it not reducing the number of distinct combinations as expected?), then you can use the information to try to figure out what's going wrong.  
 
*   Research and experiment to find and set better [&lt;connectionProperty>](#cassandra-connectionproperty)'s.  
 
*   Check the speed of the network connection between Cassandra and ERDDAP. If the connection is slow, see if you can improve it. The best situation is when ERDDAP™ is running on a server attached to the same (fast) switch as the server running the Cassandra node to which you are connecting.  
 
*   Please be patient. Read the information here and in the Cassandra documentation carefully. Experiment. Check your work. If the Cassandra-ERDDAP™ connection is still slower than you expect, please include your Cassandra table's schema and your ERDDAP™ chunk of datasets.xml and see our [section on getting additional support](/docs/intro#support).
 
*   If all else fails,  
consider storing the data in a collection of NetCDF v3 .nc files (especially .nc files that use the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data structures and so can be handled with ERDDAP's [EDDTableFromNcCFFiles](#eddtablefromnccffiles)). If they are logically organized (each with data for a chunk of space and time), ERDDAP™ can extract data from them very quickly.  
         
#### EDDTableFromCassandra skeleton XML {#eddtablefromcassandra-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \[nothing\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequence {#eddtablefromdapsequence}
[**EDDTableFromDapSequence**](#eddtablefromdapsequence) handles variables within 1- and 2-level sequences from [DAP](https://www.opendap.org/) servers such as DAPPER (was at https://www.pmel.noaa.gov/epic/software/dapper/, now discontinued).

*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it. You can gather the information you need by looking at the source dataset's DDS and DAS files in your browser (by adding .das and .dds to the sourceUrl (an example was at https://dapper.pmel.noaa.gov/dapper/epic/tao\_time\_series.cdp.dds ).
    
*   A variable is in a DAP sequence if the .dds response indicates that the data structure holding the variable is a "sequence" (case insensitive).
*   In some cases, you will see a sequence within a sequence, a 2-level sequence -- EDDTableFromDapSequence handles these, too.
#### EDDTableFromDapSequence skeleton XML {#eddtablefromdapsequence-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDatabase {#eddtablefromdatabase}
[**EDDTableFromDatabase**](#eddtablefromdatabase) handles data from one relational database table or [view](https://en.wikipedia.org/wiki/View_(database)).

#### One Table or View {#one-table-or-view}
If the data you want to serve is in two or more tables (and thus needs a JOIN to extract data from both tables at once), you need to make one [denormalized](https://en.wikipedia.org/wiki/Denormalization) (already joined) table or [view](https://en.wikipedia.org/wiki/View_(SQL)) with all of the data that you want to make available as one dataset in ERDDAP.

For large, complex databases, it may make sense to separate out several chunks as denormalized tables, each with a different type of data, which will become separate datasets in ERDDAP.

Making a denormalized table for use in ERDDAP™ may sound like a crazy idea to you. Please trust us. There are several reasons why ERDDAP™ works with denormalized tables:

*   It's vastly easier for users.  
    When ERDDAP™ presents the dataset as one, simple, denormalized, single table, it is very easy for anyone to understand the data. Most users have never heard of normalized tables, and very few understand keys, foreign keys, or table joins, and they almost certainly don't know the details of the different types of joins, or how to specify the SQL to do a join (or multiple joins) correctly. Using a denormalized table avoids all those problems. This reason alone justifies the use of a denormalized single table for the presentation of a dataset to ERDDAP™ users.  
     
*   Normalized tables (multiple tables related by key columns) are great for storing data in a database.  
    But even in SQL, the result that is returned to the user is a denormalized (joined) single table. So it seems reasonable to present the dataset to users as a huge, denormalized, single table from which they can then request subsets (e.g., show me rows of the table where temperature>30).  
     
*   You can make changes for ERDDAP™ without changing your tables.  
    ERDDAP™ has a few requirements that may be different from how you have set up your database.  
    For example, ERDDAP™ requires that timestamp data be stored in 'timestamp with timezone' fields.  
    By making a separate table/view for ERDDAP™, you can make these changes when you make the denormalized table for ERDDAP. Thus, you don't have to make any changes to your tables.  
     
*   ERDDAP™ will recreate some of the structure of the normalized tables.  
    You can specify which columns of data come from the 'outer' tables and therefore have a limited number of distinct values. ERDDAP™ will collect all of the different combinations of values in these columns and present them to users on a special .subset web page that helps users quickly select subsets of the dataset. The distinct values for each column are also shown in drop-down lists on the dataset's other web pages.  
     
*   A denormalized table makes the data hand-off from you to the ERDDAP administrator easy.  
    You're the expert for this dataset, so it makes sense that you make the decisions about which tables and which columns to join and how to join them. So you don't have to hand us (or worse, the end users) several tables and detailed instructions for how to join them, you just have to give us access to the denormalized table.  
     
*   A denormalized table allows for efficient access to the data.  
    The denormalized form is usually faster to access than the normalized form. Joins can be slow. Multiple joins can be very slow.  
     

In order to get the data from two or more tables in the database into ERDDAP™, there are three options:  
 

*   Recommended Option:  
    You can create a comma- or tab-separated-value file with the data from the denormalized table.  
    If the dataset is huge, then it makes sense to create several files, each with a cohesive subset of the denormalized table (for example, data from a smaller time range).
    
    The big advantage here is that ERDDAP™ will be able to handle user requests for data without any further effort by your database. So ERDDAP™ won't be a burden on your database or a security risk. This is the best option under almost all circumstances because ERDDAP™ can usually get data from files faster than from a database (if we convert the .csv files to .ncCF files). (Part of the reason is that ERDDAP+files is a read-only system and doesn't have to deal with making changes while providing [ACID](https://en.wikipedia.org/wiki/ACID) (Atomicity, Consistency, Isolation, Durability).) Also, you probably won't need a separate server since we can store the data on one of our RAIDs and access it with an existing ERDDAP™ on an existing server.
    
*   Okay Option:  
    You set up a new database on a different computer with just the denormalized table.  
    Since that database can be a free and open source database like MariaDB, MySQL, and PostgreSQL, this option needn't cost a lot.
    
    The big advantage here is that ERDDAP™ will be able to handle user requests for data without any further effort by your current database. So ERDDAP™ won't be a burden on your current database. This also eliminates a lot of security concerns since ERDDAP™ will not have access to your current database.
    
*   Discouraged Option:  
    We can connect ERDDAP™ to your current database.  
    To do this, you need to:
    
    *   Create a separate table or view with the denormalized table of data.
    *   Create an "erddap" user who has read-only access to only the denormalized table(s).  
         
    
    This is an option if the data changes very frequently and you want to give ERDDAP™ users instant access to those changes; however, even so, it may make sense to use the file option above and periodically (every 30 minutes?) replace the file that has today's data.  
    The huge disadvantages of this approach are that ERDDAP™ user requests will probably place an unbearably large burden on your database and that the ERDDAP™ connection is a security risk (although we can minimize/manage the risk).

Making the denormalized table or view for ERDDAP™ is a good opportunity to make a few changes that ERDDAP™ needs, in a way that doesn't affect your original tables:

*   Change the date and timestamp fields/columns to use the dataType that Postgres calls [timestamp with time zone](#database-date-time-data) (or the equivalent in your database).  
    Timestamps without time zone information don't work correctly in ERDDAP.
*   Make indexes for the columns that users often search.
*   Be very aware of [the case of the field/column names](#quotes-for-names-and-case-sensitivity) (for example, use all lowercase) when you type them.
*   Don't use reserved words for the table and for the field/column names.

If you need help making the denormalized table or view, please contact your database administrator.  
If you want to talk about this whole approach or strategize how best to do it, please email Chris.John at noaa.gov .
    
#### database in datasets.xml {#database-in-datasetsxml}
It is difficult to create the correct datasets.xml information needed for ERDDAP™ to establish a connection to the database. Be patient. Be methodical.
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
        
GenerateDatasetsXml has three special options for EDDTableFromDatabase:
1.  If you enter "!!!LIST!!!" (without the quotes) for the catalog name, the program will display a list of the catalog names.
2.  If you enter "!!!LIST!!!" (without the quotes) for the schema name, the program will display a list of the schema names.
3.  If you enter "!!!LIST!!!" (without the quotes) for the tablename, the program will display a list of tables and their columns.The first "!!!LIST!!!" entry that you make is the one that will be used.
*   Carefully read all of this document's information about EDDTableFromDatabase.
*   You can gather most of the information you need to create the XML for an EDDTableFromDatabase dataset by contacting the database administrator and by searching the web.
*   Although databases often treat column names and table names in a case-insensitive way, they are case-sensitive in ERDDAP. So if an error message from the database says that a column name is unknown (for example, "Unknown identifier='*column\_name*'") even though you know it exists, try using all capitals, for example, *COLUMN\_NAME*, which is often the true, case-sensitive version of the column name.
*   Work closely with the database administrator, who may have relevant experience. If the dataset fails to load, read the [error message](#troubleshooting-tips) carefully to find out why.  
         
#### JDBC Driver {#jdbc-driver}
*   [JDBC Driver and &lt;driverName>](#jdbc-driver) -- You must get the appropriate JDBC 3 or JDBC 4 driver .jar file for your database and  
    put it in *tomcat*/webapps/erddap/WEB-INF/lib after you install ERDDAP. Then, in your datasets.xml for this dataset, you must specify the &lt;driverName> for this driver, which is (unfortunately) different from the filename. Search on the web for the JDBC driver for your database and the driverName that Java needs to use it.
    
    *   For MariaDB, try [https://mariadb.com/kb/en/about-the-mariadb-java-client/](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
        The &lt;driverName> to use in datasets.xml (see below) is probably org.mariadb.jdbc.Driver .
    *   For MySQL and Amazon RDS, try [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)  
        The &lt;driverName> to use in datasets.xml (see below) is probably com.mysql.jdbc.Driver .
    *   For Oracle, try [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).  
        The &lt;driverName> to use in datasets.xml (see below) is probably oracle.jdbc.driver.OracleDriver .
    *   For Postgresql, we got the JDBC 4 driver from [https://mvnrepository.com/artifact/org.postgresql/postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
        The &lt;driverName> to use in datasets.xml (see below) is probably org.postgresql.Driver .
    *   For SQL Server, you can get the JTDS JDBC driver from [https://jtds.sourceforge.net](https://jtds.sourceforge.net).  
        The &lt;driverName> to use in datasets.xml (see below) is probably net.sourceforge.jtds.jdbc.Driver .
    
    After you put the JDBC driver .jar in ERDDAP™ lib directory, you need to add a reference to that .jar file in the .bat and/or .sh script files for GenerateDatasetsXml, DasDds, and ArchiveADataset which are in the *tomcat*/webapps/erddap/WEB-INF/ directory; otherwise, you'll get a ClassNotFoundException when you run those scripts.
    
    Unfortunately, JDBC is sometimes the source of trouble. In its role as intermediary between ERDDAP™ and the database, it sometimes makes subtle changes to the standard/generic database SQL request that ERDDAP™ creates, thereby causing problems (for example, related to [upper/lowercase identifiers](#quotes-for-names-and-case-sensitivity) and related to [date/time timezones](#database-date-time-data)). Please be patient, read the information here carefully, check your work, and see our [section on getting additional support](/docs/intro#support).
    
#### Database &lt;connectionProperty&gt; {#database-connectionproperty}
*   [&lt;connectionProperty>](#database-connectionproperty) -- In the datasets.xml for your dataset, you must define several connectionProperty tags to tell ERDDAP™ how to connect to your database (for example, to specify the user name, password, ssl connection, and [fetch size](#set-the-fetch-size)). These are different for every situation and are a little hard to figure out. Search the web for examples of using a JDBC driver to connect to your database. The &lt;connectionProperty> names (for example, "user", "password", and "ssl"), and some of the connectionProperty values can be found by searching the web for "JDBC connection properties *databaseType*" (for example, Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL).  
     
#### Quotes for Names and Case Sensitivity {#quotes-for-names-and-case-sensitivity}
*   [Quotes for Field/Column Names; Case Sensitivity](#quotes-for-names-and-case-sensitivity) - By default, EDDTableFromDatabase puts ANSI-SQL-standard double quotes around field/column names in SELECT statements in case you have used a reserved word as a field/column name, or a special character in a field/column name. The double quotes also thwart certain types of SQL injection attacks. You can tell ERDDAP™ to use ", ', or no quotes via &lt;columnNameQuotes> in datasets.xml for this dataset.
    
    For many databases, using any type of quotes causes the database to work with field/column names in a case sensitive way (instead of the default database case insensitive way). Databases often display file/column names as all upper-case, when in reality the case sensitive form is different. In ERDDAP™, please always treat database column names as case sensitive.
    
    *   For MariaDB, you need to run the database with [\--sql-mode=ANSI\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/) .
    *   For MySQL and Amazon RDS, you need to run the database with [\--sql-mode=ANSI\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes) .
    *   Oracle supports ANSI-SQL-standard double quotes [by default](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    *   PostgreSQL supports ANSI-SQL-standard double quotes by default.
    
      
    Don't use a reserved word for a database, catalog, schema or table's name. ERDDAP™ doesn't put quotes around them.
    
    If possible, use all lower-case for database, catalog, schema, table names and field names when creating the database table (or view) and when referring to the field/column names in datasets.xml in ERDDAP. Otherwise, you may get an error message saying the database, catalog, schema, table, and/or field wasn't found. If you do get that error message, try using the case-sensitive version, the all upper-case version, and the all lower-case version of the name in ERDDAP. One of them may work. If not, you need to change the name of database, catalog, schema, and/or table to all lower-case.
    
#### Database &lt;dataType&gt; {#database-datatype}
*   [Database](#database-datatype) [&lt;dataType>](#datatype) Tags -- Because there is some ambiguity about which [database data types](https://www.w3schools.com/sql/sql_datatypes_general.asp) map to which ERDDAP™ data types, you need to specify a [&lt;dataType>](#datatype) tag for each [&lt;dataVariable>](#datavariable) to tell ERDDAP™ which dataType to use. Part of the problem is that different datasets use different terms for the various data types -- so always try to match the definitions, not just the names. See the description of the [standard ERDDAP™ dataTypes](#data-types), which includes references to the corresponding SQL data types. [Date and timestamp](#database-date-time-data) are special cases: use ERDDAP's double dataType.  
     
#### Database Date Time Data {#database-date-time-data}
Some database date time columns have no explicit time zone. Such columns are trouble for ERDDAP. Databases support the concept of a date (with or without a time) without a time zone, as an approximate range of time. But Java (and thus ERDDAP) only deals with instantaneous date+times with a timezone. So you may know that the date time data is based on a local time zone (with or without daylight saving time) or the GMT/Zulu time zone, but Java (and ERDDAP) don't. We originally thought we could work around this problem (e.g, by specifying a time zone for the column), but the database+JDBC+Java interactions made this an unreliable solution.
*   So, ERDDAP™ requires that you store all date and date time data in the database table with a database data type that corresponds to the JDBC type "timestamp with time zone" (ideally, that uses the GMT/Zulu time zone).
*   In ERDDAP's datasets.xml, in the &lt;dataVariable> tag for a timestamp variable, set  
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

    and in &lt;addAttributes> set  
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
*   Suggestion: If the data is a time range, it is useful to have the timestamp values refer to the center of the implied time range (for example, noon). For example, if a user has data for 2010-03-26T13:00Z from another dataset and they want the closest data from a database dataset that has data for each day, then the database data for 2010-03-26T12:00Z (representing data for that date) is obviously the best (as opposed to the midnight before or after, where it is less obvious which is best).
*   ERDDAP™ has a utility to [Convert a Numeric Time to/from a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
*   See [How ERDDAP Deals with Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).  
       
#### Integer nulls {#integer-nulls-1}
Databases support nulls in integer (int, smallint, tinyint) columns, but ERDDAP™ doesn't support true nulls.  
Database nulls will be converted in ERDDAP™ 127 for byte columns, 255 for ubyte columns, 32767 for short columns, 65535 for ushort columns, 2147483647 for int columns, 4294967295 for uint columns, 9,223,372,036,854,775,807 for long columns, or 18446744073709551615 for ulong columns. If you use those defaults, please identify those missing\_values for the dataset's users in ERDDAP™ with  

>    &lt;att name="\_FillValue" [type="int"](#attributetype)\>2147483647&lt;/att>  

    or  

>    &lt;att name="\_FillValue" [type="short"](#attributetype)\>32767&lt;/att>  

Alternatively, you can use the "missing\_value" attribute instead of "\_FillValue".  
GenerateDatasetsXml automatically adds these \_FillValue attributes when it generates the suggested datasets.xml for database datasets.

For database floating point columns, nulls get converted to NaNs in ERDDAP.  
For database data types that are converted to Strings in ERDDAP™, nulls get converted to empty Strings.
    
#### Database Security {#database-security}
*   When working with databases, you need to do things as safely and securely as possible to avoid allowing a malicious user to damage your database or gain access to data they shouldn't have access to. ERDDAP™ tries to do things in a secure way, too.
    *   Consider replicating, on a different computer, the database and database tables with the data that you want ERDDAP™ to serve. (Yes, for commercial databases like Oracle, this involves additional licensing fees. But for open source databases, like PostgreSQL, MySQL, Amazon RDS, and MariaDB, this costs nothing.) This gives you a high level of security and also prevents ERDDAP™ requests from slowing down the original database.
    *   We encourage you to set up ERDDAP™ to connect to the database as a database user that only has access to the **relevant** database(s) and only has READ privileges.
    *   We encourage you to set up the connection from ERDDAP™ to the database so that it
        *   always uses SSL,
        *   only allows connections from one IP address (or one block of addresses) and from the one ERDDAP™ user, and
        *   only transfers passwords in their MD5 hashed form.
    *   \[KNOWN PROBLEM\]The connectionProperties (including the password!) are stored as plain text in datasets.xml. We haven't found a way to allow the administrator to enter the database password during ERDDAP's startup in Tomcat (which occurs without user input), so the password must be accessible in a file. To make this more secure:
        *   You (the ERDDAP™ administrator) should be the owner of datasets.xml and have READ and WRITE access.
        *   Make a group that includes only user=tomcat. Use chgrp to make that the group for datasets.xml, with just READ privileges.
        *   Use chmod to assign o-rwx privileges (no READ or WRITE access for "other" users) for datasets.xml.
    *   When in ERDDAP™, the password and other connection properties are stored in "private" Java variables.
    *   Requests from clients are parsed and checked for validity before generating the SQL requests for the database.
    *   Requests to the database are made with SQL PreparedStatements, to prevent [SQL injection](https://en.wikipedia.org/wiki/SQL_injection).
    *   Requests to the database are submitted with executeQuery (not executeStatement) to limit requests to be read-only (so attempted SQL injection to alter the database will fail for this reason, too).  
         
#### SQL {#sql}
*    Because OPeNDAP's tabular data requests were designed to mimic SQL tabular data requests, it is easy for ERDDAP™ to convert tabular data requests into simple SQL PreparedStatements. For example, the ERDDAP™ request  
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
will be converted into the SQL PreparedStatement  
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™ requests with &distinct() and/or &orderBy(*variables*) will add DISTINCT and/or ORDER BY *variables* to the SQL prepared statement. In general, this will greatly slow down the response from the database.  
ERDDAP™ logs the PreparedStatement in [log.txt](/docs/server-admin/additional-information#log) as  
```
    statement=*thePreparedStatement*  
```
This will be a text representation of the PreparedStatement, which may be slightly different from the actual PreparedStatement. For example, in the PreparedStatement, times are encoded in a special way. But in the text representation, they appear as ISO 8601 date times.  
     
#### Database Speed {#database-speed}
*   Databases can be slow. There are some things you can do:
    *   In General -  
        The nature of SQL is that queries are [declarative](https://en.wikipedia.org/wiki/Declarative_programming). They just specify what the user wants. They don't include a specification or hints for how the query is to be handled or optimized. So there is no way for ERDDAP™ to generate the query in such a way that it helps the database optimize the query (or in any way specifies how the query is to be handled). In general, it is up to the database administrator to set things up (for example, indexes) to optimize for certain types of queries.
##### Set the Fetch Size {#set-the-fetch-size}
Databases return the data to ERDDAP™ in chunks. By default, different databases return a different number of rows in the chunks. Often this number is very small and so very inefficient. For example, the default for Oracle is 10! Read the JDBC documentation for your database's JDBC driver to find the connection property to set in order to increase this, and add this to the dataset's description in datasets.xml. For example,  
For MySQL and Amazon RDS, use  
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
For MariaDB, there is currently no way to change the fetch size. But it is a requested feature, so search the web to see if this has been implemented.  
For Oracle, use  
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
For PostgreSQL, use  
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
but feel free to change the number. Setting the number too big will cause ERDDAP™ to use lots of memory and be more likely to run out of memory.  
#### ConnectionProperties {#connectionproperties}
Each database has other connection properties which can be specified in datasets.xml. Many of these will affect the performance of the database to ERDDAP™ connection. Please read the documentation for your database's JDBC driver to see the options. If you find connection properties that are useful, please send an email with the details to erd dot data at noaa dot gov.
*   Make a Table --  
    You will probably get faster responses if you periodically (everyday? whenever there is new data?) generate an actual table (similarly to how you generated the VIEW) and tell ERDDAP™ to get data from the table instead of the VIEW. Since any request to the table can then be fulfilled without JOINing another table, the response will be much faster.
*   Vacuum the Table -  
    MySQL and Amazon RDS will respond much faster if you use [OPTIMIZE TABLE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).  
    MariaDB will respond much faster if you use [OPTIMIZE TABLE](https://mariadb.com/kb/en/optimize-table/).  
    PostgreSQL will respond much faster if you [VACUUM](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html) the table.  
    Oracle doesn't have or need an analogous command.
*   Make [Indexes](https://en.wikipedia.org/wiki/Database_index) for Commonly Constrained Variables --  
    You can speed up many/most queries by creating indexes in the database for the variables (which databases call "columns") that are often constrained in the user's query. In general, these are the same variables specified by [&lt;subsetVariables>](#subsetvariables) and/or the latitude, longitude, and time variables.
##### Use Connection Pooling {#use-connection-pooling}
Normally, ERDDAP™ makes a separate connection to the database for each request. This is the most reliable approach. The faster alternative is to use a DataSource which supports connection pooling. To set it up, specify (for example)  
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
right next to &lt;sourceUrl>, &lt;driverName>, and &lt;connectionProperty>.  
And in *tomcat*/conf/context.xml, define a resource with the same information, for example,  
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
General information about using a DataSource is at [https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).  
See [Tomcat DataSource information](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources) and [Tomcat DataSource examples](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html) or search the web for examples of using DataSources with other application servers. 
*   If all else fails,  
    consider storing the data in a collection of NetCDF v3 .nc files (especially .nc files that use the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data structures and so can be handled with ERDDAP's [EDDTableFromNcCFFiles](#eddtablefromnccffiles)). If they are logically organized (each with data for a chunk of space and time), ERDDAP™ can extract data from them very quickly.  
         
#### EDDTableFromDatabase skeleton XML {#eddtablefromdatabase-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \[nothing\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromEDDGrid {#eddtablefromeddgrid}
[**EDDTableFromEDDGrid**](#eddtablefromeddgrid) lets you create an EDDTable dataset from any EDDGrid dataset.

*   Some common reasons for doing this are:
    *   This allows the dataset to be queried with OPeNDAP selection constraints, which is a type of "query by value" (which a user may have requested).
    *   The dataset is inherently a tabular dataset.
*   The value of the global attribute "maxAxis0" (usually of type="int"), (the default is 10) will be used to limit the number of axis\[0\] (usually the "time" axis) values of the enclosed EDDGrid dataset that can be accessed per request for data. If you don't want there to be any limit, specify a value of 0. This setting is important because, otherwise, it would be too easy for a user to ask EDDTableFromEDDGrid to look through all of the gridded dataset's data. That would take a long time and would almost certainly fail with a timeout error. This is the setting that makes it safe to have EDDTableFromEDDGrid datasets in your ERDDAP without fear that they will lead to an unreasonable use of computing resources.
*   If the enclosed EDDGrid is an [EDDGridFromErddap](#eddfromerddap) and the ERDDAP™ is the same ERDDAP, then EDDTableFromEDDGrid will always use the currently available version of the referenced dataset directly. This is a very efficient way for EDDTableFromEDDGrid to access the gridded data.
*   This class's [&lt;reloadEveryNMinutes>](#reloadeverynminutes) is what counts. The enclosed EDDGrid's &lt;reloadEveryNMinutes> is ignored.
*   If a value for [&lt;updateEveryNMillis>](#updateeverynmillis) is supplied for this dataset, it is ignored. The enclosed EDDGrid's &lt;updateEveryNMillis> is what matters.
*   [GenerateDatasetsXml](#generatedatasetsxml) has an option for dataset type=EDDTableFromEDDGrid which asks for the URL of an ERDDAP (usually the same ERDDAP) (ending in "/erddap/") and a regular expression. GenerateDatasetsXml will then generate the XML for an EDDTableFromEDDGrid dataset for each gridded dataset in the ERDDAP™ which has a datasetID which matches the regular expression (use .\* to match all datasetIDs for gridded datasets).
    
    The chunk of XML that is generated by GenerateDatasetsXml for each dataset includes:
    
    *   A datasetID which is the EDDGrid's datasetID plus "\_AsATable".
    *   A new summary global attribute which is the EDDGrid's summary plus a new first paragraph describing what this dataset is.
    *   A new title global attribute which is the EDDGrid's title plus ", (As A Table)".
    *   A new maxAxis0 global attribute with a value of 10.
#### EDDTableFromEDDGrid skeleton XML {#eddtablefromeddgrid-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames {#eddtablefromfilenames}
[**EDDTableFromFileNames**](#eddtablefromfilenames) creates a dataset from information about a group of files in the server's file system, including a URL for each file so that users can download the files via ERDDAP's ["files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Unlike all of the [EDDTableFromFiles](#eddtablefromfiles) subclasses, this dataset type does not serve data from within the files.

*   EDDTableFromFileNames is useful when:
    *   You have a group of files that you want to distribute as whole files because they don't contain "data" in the same way that regular data files have data. For example, image files, video files, Word documents, Excel spreadsheet files, PowerPoint presentation files, or text files with unstructured text.
    *   You have a group of files which have data in a format that ERDDAP™ can't yet read. For example, a project-specific, custom, binary format.  
         
#### EDDTableFromFileNames Data {#eddtablefromfilenames-data}
*   [The data in an EDDTableFromFileNames dataset](#eddtablefromfilenames-data) is a table that ERDDAP™ creates on-the-fly with information about a group of local files. In the table, there is a row for each file. Four special attributes in the [datasets.xml for this dataset](#eddtablefromfilenames-skeleton-xml) determine which files will be included in this dataset:
    
##### fileDir {#filedir}
    *   &lt;fileDir> -- This specifies the source directory in the server's file system with the files for this dataset. The files that are actually located in the server's file system in &lt;fileDir> will appear in the url column of this dataset within a virtual directory named https://*serverUrl*/erddap/files/*datasetID/* .  
        For example, if the datasetID is jplMURSST,  
        and the &lt;fileDir> is /home/data/mur/ ,  
        and that directory has a file named jplMURSST20150103000000.png,  
        then the URL that will be shown to users for that file will be  
        https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
        In addition to using a local directory for the &lt;fileDir>, you can also specify the URL of a remote, directory-like web page. This works with:
        
        *   Unaggregated datasets in THREDDS, e.g.,  
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\_binned\_V3.0/monthly/ \[2020-10-21 This server is no longer reliably available.\]
        *   Unaggregated datasets in Hyrax, e.g.,  
            [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        *   Most Apache-like directory listings, e.g.,  
            [https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### fromOnTheFly {#fromonthefly}
[\*\*\*fromOnTheFly](#fromonthefly) -- For some huge S3 buckets (like noaa-goes17, which has 26 million files), it may take ERDDAP™ up to 12 hours to download all the information about the contents of the bucket (and then there are other problems). To get around this, there is a special way to use &lt;fileDir> in EDDTableFromFileNames to make a dataset with the directory and file names from an AWS S3 bucket. The dataset won't have the list of all of the S3 bucket's directories and file names that a user can search via requests to the dataset. But the dataset will get the names of directories and files on-the-fly if the user traverses the directory hierarchy with the dataset's "files" option. Thus, this allows users to browse the S3 bucket's file hierarchy and files via the dataset's "files" system. To do this, instead of specifying the URL for the S3 bucket as the "Starting directory" (in GenerateDatasetsXml) or &lt;fileDir> (in datasets.xml), use:  
```
\*\*\*fromOnTheFly,*theS3BucketUrl*  
```
for example:  
```
\*\*\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
See the documentation for [working with S3 Buckets in ERDDAP™](#working-with-aws-s3-files), notably the description of the specific format that must be used for S3 bucket URL. And see  
[these details and an example](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket) of using \*\*\*fromOnTheFly.
        
##### recursive {#recursive}
*   &lt;recursive> -- Files in subdirectories of &lt;fileDir> with names which match &lt;fileRegex> will appear in the same subdirectories in the "files" URL if &lt;recursive> is set to true. The default is false.
*   [&lt;pathRegex>](#pathregex) -- If recursive=true, Only directory names which match the pathRegex (default=".\*") will be accepted. If recursive=false, this is ignored. This is rarely used, but can be very useful in unusual circumstances. (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)
##### fileRegex {#fileregex}
*   &lt;fileRegex> -- Only the filenames where the whole filename (not including the directory name) match the &lt;fileRegex> will be included in this dataset. For example, jplMURSST.{14}\\.png . (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)  
         
##### From File Names Data table Contents {#from-file-names-data-table-contents}
In the table, there will be columns with:
*   url -- The URL that users can use to download the file via ERDDAP's ["files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
*   name -- The file's name (without a directory name).
*   lastModified -- The time the file was last modified (stored as doubles with "seconds since 1970-01-01T00:00:00Z"). This variable is useful because users can see if/when the contents of a given file last changed. This variable is a [timeStamp variable](#timestamp-variables), so the data may appear as numeric values (seconds since 1970-01-01T00:00:00Z) or a String value (ISO 8601:2004(E) format), depending on the situation.
*   size -- The size of the file in bytes, stored as doubles. They are stored as doubles because some files may be larger than ints allow and longs are not supported in some response file types. Doubles will give the exact size, even for very large files.
*   addition columns defined by the ERDDAP™ administrator with information extracted from the filename (for example, the time associated with the data in the file) based on two attributes that you specify in the metadata for each additional column/dataVariable:
    
    *   extractRegex -- This is a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)). The entire regex must match the entire filename (not including the directory name). The regex must include at least one capture group (a section of a regular expression that is enclosed by parentheses) which ERDDAP™ uses to determine which section of the filename to extract to become data.
    *   extractGroup -- This is the number of the capture group (#1 is the first capture group) in the regular expression. The default is 1. A capture group is a section of a regular expression that is enclosed by parentheses.
    
    Here are two examples:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
In the case of the time variable, if a file has the name jplMURSST20150103000000.png, the extractRegex will match the filename, extract the characters which match the first capture group ("20150103000000") as dataType=String, then use the [units suitable for string times](#string-time-units) to parse the strings into time data values (2015-01-03T00:00:00Z).

In the case of the day variable, if a file has the name jplMURSST20150103000000.png, the extractRegex will match the filename, extract the characters which match the first capture group ("03") as [&lt;dataType>](#datatype)\=int, yielding a data value of 3.
        
#### Other Information {#other-information}
*   No [&lt;updateEveryNMillis>](#updateeverynmillis) -- This type of dataset doesn't need and can't use the &lt;updateEveryNMillis> tag because the information served by EDDTableFromFileNames is always perfectly up-to-date because ERDDAP™ queries the file system in order to respond to each request for data. Even if there are a huge number of files, this approach should work reasonably well. A response may be slow if there are a huge number of files and the dataset hasn't been queried for a while. But for several minutes after that, the operating system keeps the information in a cache, so responses should be very fast.  
     
*   You can use the [GenerateDatasetsXml program](#generatedatasetsxml) to make the datasets.xml chunk for this type of dataset. You can add/define additional columns with information extracted from the filename, as shown above.  
     
#### EDDTableFromFileNames skeleton XML {#eddtablefromfilenames-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles {#eddtablefromfiles}
[**EDDTableFromFiles**](#eddtablefromfiles) is the superclass of all EDDTableFrom...Files classes. You can't use EDDTableFromFiles directly. Instead, use a subclass of EDDTableFromFiles to handle the specific file type:

*   [EDDTableFromAsciiFiles](#eddtablefromasciifiles) aggregates data from comma-, tab-, semicolon-, or space-separated tabular ASCII data files.
*   [EDDTableFromAudioFiles](#eddfromaudiofiles) aggregates data from a group of local audio files.
*   [EDDTableFromAwsXmlFiles](#eddtablefromawsxmlfiles) aggregates data from a set of Automatic Weather Station (AWS) XML files.
*   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles) aggregates data from tabular ASCII data files with fixed-width data columns.
*   [EDDTableFromHyraxFiles](#eddtablefromhyraxfiles) (DEPRECATED) aggregates data with several variables, each with shared dimensions (for example, time, altitude (or depth), latitude, longitude), and served by a [Hyrax OPeNDAP server](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFromInvalidCRAFiles](#eddtablefrominvalidcrafiles) aggregates data from NetCDF (v3 or v4) .nc files which use a specific, invalid, variant of the CF DSG Contiguous Ragged Array (CRA) files. Although ERDDAP™ supports this file type, it is an invalid file type that no one should start using. Groups that currently use this file type are strongly encouraged to use ERDDAP™ to generate valid CF DSG CRA files and stop using these files.
*   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles) aggregates data from [JSON Lines CSV files](https://jsonlines.org/examples/).
*   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) aggregates data from NetCDF (v3 or v4) .nc (or [.ncml](#ncml-files)) files with several variables, each with shared dimensions (for example, time, altitude (or depth), latitude, longitude).
*   [EDDTableFromNcFiles](#eddtablefromncfiles) aggregates data from NetCDF (v3 or v4) .nc (or [.ncml](#ncml-files)) files with several variables, each with shared dimensions (for example, time, altitude (or depth), latitude, longitude). It is fine to continue using this dataset type for existing datasets, but for new datasets we recommend using EDDTableFromMultidimNcFiles instead.
*   [EDDTableFromNcCFFiles](#eddtablefromnccffiles) aggregates data from NetCDF (v3 or v4) .nc (or [.ncml](#ncml-files)) files which use one of the file formats specified by the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) conventions. But for files using one of the multidimensional CF DSG variants, use [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) instead.
*   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles) aggregates data from [NCCSV](/docs/user/nccsv-1.00) ASCII .csv files.
*   [EDDTableFromParquetFiles](#eddtablefromparquetfiles) handles data from [Parquet](https://parquet.apache.org/).
*   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles) (DEPRECATED) aggregates data from files with several variables with shared dimensions served by a [THREDDS OPeNDAP server](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTableFromWFSFiles](#eddtablefromwfsfiles) (DEPRECATED) makes a local copy of all of the data from an ArcGIS MapServer WFS server so the data can then be re-served quickly to ERDDAP™ users.

Currently, no other file types are supported. But it is usually relatively easy to add support for other file types. Contact us if you have a request. Or, if your data is in an old file format that you would like to move away from, we recommend converting the files to be NetCDF v3 .nc files (and especially .nc files with the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data structure -- ERDDAP™ can extract data from them very quickly). NetCDF is a widely supported, binary format, allows fast random access to the data, and is already supported by ERDDAP.

#### FromFiles Details {#fromfiles-details}
The following information applies to all of the subclasses of EDDTableFromFiles.
##### Aggregation {#aggregation}
This class aggregates data from local files. Each file holds a (relatively) small table of data.
    *   The resulting dataset appears as if all of the file's tables had been combined (all of the rows of data from file #1, plus all of the rows from file #2, ...).
    *   The files don't all have to have all of the specified variables. If a given file doesn't have a specified variable, ERDDAP™ will add missing values as needed.
    *   The variables in all of the files MUST have the same values for the [add\_offset](#scale_factor), [missing\_value](#missing_value), [\_FillValue](#missing_value), [scale\_factor](#scale_factor), and [units](#units) attributes (if any). ERDDAP™ checks, but it is an imperfect test -- if there are different values, ERDDAP doesn't know which is correct and therefore which files are invalid. If this is a problem, you may be able to use [NcML](#ncml-files) or [NCO](#netcdf-operators-nco) to fix the problem.  
         
##### Compressed Files {#compressed-files}
The source data files for all EDDTableFromFiles subclasses can be externally compressed (e.g., .tgz, .tar.gz, .tar.gzip, .gz, .gzip, .zip, .bz2, or .Z). See the [Externally Compressed Files documentation](#externally-compressed-files).  
     
##### Cached File Information {#cached-file-information-1}
*   When an EDDTableFromFiles dataset is first loaded, EDDTableFromFiles reads information from all of the relevant files and creates tables (one row for each file) with information about each valid file and each "bad" (different or invalid) file.
    *   The tables are also stored on disk, as NetCDF v3 .nc files in *bigParentDirectory*/dataset/*last2CharsOfDatasetID*/*datasetID*/ in files named:  
          dirTable.nc (which holds a list of unique directory names),  
          fileTable.nc (which holds the table with each valid file's information),  
          badFiles.nc (which holds the table with each bad file's information).
    *   To speed up access to an EDDTableFromFiles dataset (but at the expense of using more memory), you can use  
        [&lt;fileTableInMemory>true&lt;/fileTableInMemory>](#filetableinmemory)  
        to tell ERDDAP™ to keep a copy of the file information tables in memory.
    *   The copy of the file information tables on disk is also useful when ERDDAP™ is shut down and restarted: it saves EDDTableFromFiles from having to re-read all of the data files.
    *   When a dataset is reloaded, ERDDAP™ only needs to read the data in new files and files that have changed.
    *   If a file has a different structure from the other files (for example, a different data type for one of the variables, or a different value for the "[units](#units)" attribute), ERDDAP adds the file to the list of "bad" files. Information about the problem with the file will be written to the *bigParentDirectory*/logs/log.txt file.
    *   You shouldn't ever need to delete or work with these files. One exception is: if you are still making changes to a dataset's datasets.xml setup, you may want to delete these files to force ERDDAP™ to reread all of the files since the files will be read/interpreted differently. If you ever do need to delete these files, you can do it when ERDDAP™ is running. (Then set a [flag](/docs/server-admin/additional-information#set-dataset-flag) to reload the dataset ASAP.) However, ERDDAP™ usually notices that the datasets.xml information doesn't match the fileTable information and deletes the file tables automatically.
    *   If you want to encourage ERDDAP™ to update the stored dataset information (for example, if you just added, removed, or changed some files to the dataset's data directory), use the [flag system](/docs/server-admin/additional-information#flag) to force ERDDAP™ to update the cached file information.  
         
##### Handling Requests {#handling-requests-1}
*   ERDDAP™ tabular data requests can put constraints on any variable.
    *   When a client's request for data is processed, EDDTableFromFiles can quickly look in the table with the valid file information to see which files might have relevant data. For example, if each source file has the data for one fixed-location buoy, EDDTableFromFiles can very efficiently determine which files might have data within a given longitude range and latitude range.
    *   Because the valid file information table includes the minimum and maximum value of every variable for every valid file, EDDTableFromFiles can often handle other queries quite efficiently. For example, if some of the buoys don't have an air pressure sensor, and a client requests data for airPressure!=NaN, EDDTableFromFiles can efficiently determine which buoys have air pressure data.  
         
##### Updating the Cached File Information {#updating-the-cached-file-information-1}
Whenever the dataset is reloaded, the cached file information is updated.
    
*   The dataset is reloaded periodically as determined by the &lt;reloadEveryNMinutes> in the dataset's information in datasets.xml.
*   The dataset is reloaded as soon as possible whenever ERDDAP™ detects that you have added, removed, [touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (to change the file's lastModified time), or changed a datafile.
*   The dataset is reloaded as soon as possible if you use the [flag system](/docs/server-admin/additional-information#flag).

When the dataset is reloaded, ERDDAP™ compares the currently available files to the cached file information table. New files are read and added to the valid files table. Files that no longer exist are dropped from the valid files table. Files where the file timestamp has changed are read and their information is updated. The new tables replace the old tables in memory and on disk.  
     
##### Bad Files {#bad-files-1}
The table of bad files and the reasons the files were declared bad (corrupted file, missing variables, incorrect axis values, etc.) is emailed to the emailEverythingTo email address (probably you) every time the dataset is reloaded. You should replace or repair these files as soon as possible.  
     
##### Missing Variables {#missing-variables-1}
If some of the files don't have some of the dataVariables defined in the dataset's datasets.xml chunk, that's okay. When EDDTableFromFiles reads one of those files, it will act as if the file had the variable, but with all missing values.  
     
##### Near Real Time Data {#near-real-time-data}
*   EDDTableFromFiles treats requests for very recent data as a special case. The problem: If the files making up the dataset are updated frequently, it is likely that the dataset won't be updated every time a file is changed. So EDDTableFromFiles won't be aware of the changed files. (You could use the [flag system](/docs/server-admin/additional-information#flag), but this might lead to ERDDAP™ reloading the dataset almost continually. So in most cases, we don't recommend it.) Instead, EDDTableFromFiles deals with this by the following system: When ERDDAP™ gets a request for data within the last 20 hours (for example, 8 hours ago until Now), ERDDAP™ will search all files which have any data in the last 20 hours. Thus, ERDDAP™ doesn't need to have perfectly up-to-date data for all of the files in order to find the latest data. You should still set [&lt;reloadEveryNMinutes>](#reloadeverynminutes) to a reasonably small value (for example, 60), but it doesn't have to be tiny (for example, 3).  
     
    *   **Not recommended** organization of near-real-time data in the files: If, for example, you have a dataset that stores data for numerous stations (or buoy, or trajectory, ...) for many years, you could arrange the files so that, for example, there is one file per station. But then, every time new data for a station arrives, you have to read a large old file and write a large new file. And when ERDDAP™ reloads the dataset, it notices that some files have been modified, so it reads those files completely. That is inefficient.  
         
    *   **Recommended** organization of near-real-time data in the files: Store the data in chunks, for example, all data for one station/buoy/trajectory for one year (or one month). Then, when a new datum arrives, only the file with this year's (or month's) data is affected.
        
        *   Best: Use NetCDF v3 .nc files with an unlimited dimension (time). Then, to add new data, you can just append the new data without having to read and rewrite the entire file. The change is made very efficiently and essentially atomically, so the file isn't ever in an inconsistent state.
        *   Otherwise: If you don't/can't use .nc files with an unlimited dimension (time), then, when you need to add new data, you have to read and rewrite the entire affected file (hopefully small because it just has a year's (or month's) worth of data). Fortunately, all of the files for previous years (or months) for that station remain unchanged.
        
        In both cases, when ERDDAP™ reloads the dataset, most files are unchanged; only a few, small files have changed and need to be read.  
         
##### Directories {#directories-1}
The files can be in one directory, or in a directory and its subdirectories (recursively). If there are a large number of files (for example, >1,000), the operating system (and thus EDDTableFromFiles) will operate much more efficiently if you store the files in a series of subdirectories (one per year, or one per month for datasets with very frequent files), so that there are never a huge number of files in a given directory.  
     
##### Remote Directories and HTTP Range Requests {#remote-directories-and-http-range-requests-1}
*   **Remote Directories and HTTP Range Requests** (AKA Byte Serving, Byte Range Requests) --  
    EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles, can sometimes serve data from .nc files on remote servers and accessed via HTTP if the server supports [Byte Serving](https://en.wikipedia.org/wiki/Byte_serving) via HTTP range requests (the HTTP mechanism for byte serving). This is possible because netcdf-java (which ERDDAP™ uses to read .nc files) supports reading data from remote .nc files via HTTP range requests.
    
    **Don't do this!**  
    Instead, use the [&lt;cacheFromUrl> system](#cachefromurl).
    
##### CacheFromUrl {#cachefromurl}
*   [**&lt;cacheFromUrl>**](#cachefromurl) -  
    All EDDGridFromFiles and all EDDTableFromFiles datasets support a set of tags which tell ERDDAP™ to download and maintain a copy of all of a remote dataset's files, or a cache of a few files (downloaded as needed). **This is an incredibly useful feature.**
    *   The &lt;cacheFromUrl> tag lets you specify a URL with a list of a remote dataset's files from a remote file list.
        
        *   Unaggregated datasets in THREDDS, e.g.,  
            https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\_binned\_V3.0/monthly/ \[2020-10-21 This server is no longer reliably available.\]
        *   Unaggregated datasets in Hyrax, e.g.,  
            [https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        *   Most Apache-like directory listings, e.g.,  
            [https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        *   S3 buckets, e.g,  
            [https://noaa-goes17.s3.us-east-1.amazonaws.com/](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
            However, this may require an AWS account and more setup.  
            See [working with S3 Buckets in ERDDAP™](#working-with-aws-s3-files).  
            Also, you usually don't need to use cacheFromUrl with files in S3 buckets if the files are ASCII files (e.g., .csv), because ERDDAP™ can efficiently read the data from the bucket directly via a stream.
        
        ERDDAP™ will copy or cache these files in the dataset's &lt;fileDir> directory. If you need support for another type of remote file list (e.g., FTP), please email your request to Chris.John at noaa.gov .
        
        *   The default value for the &lt;cacheFromUrl> tag is null. If you don't specify a value for the &lt;cacheFromUrl> tag, the copy/cache system won't be used for this dataset.
        *   If the dataset's &lt;fileRegex> setting is something other than .\*, ERDDAP™ will only download files that match the fileRegex.
        *   If the dataset's &lt;recursive> setting is true and the remote files are in subdirectories, ERDDAP™ will look in remote subdirectories that match the dataset's [&lt;pathRegex>](#pathregex), create the same directory structure locally, and put the local files in the same subdirectories.
        *   In GenerateDatasetsXml, if you specify a &lt;cacheFromUrl> value, GenerateDatasetsXml will create the local &lt;fileDir> directory and copy 1 remote file into it. GenerateDatasetsXml will then generate the datasets.xml chunk based on that sample file (specify sampleFile=nothing).
        *   If the data source is a remote ERDDAP™, use [EDDGridFromErddap](#eddfromerddap) or [EDDTableFromErddap](#eddfromerddap) instead of &lt;cacheFromUrl>. That way, your local ERDDAP™ will appear to have the dataset but won't need to store any of the data locally. The only reason to use &lt;cacheFromUrl> to get data from a remote ERDDAP™ is when you have some other reason why you want to have a local copy of the data files. In that case:
            *   This dataset will try to subscribe to the dataset on the remote ERDDAP so that changes to that dataset will call this dataset's flagUrl, causing this local dataset to reload and download the changed remote files. Thus, the local dataset will be up-to-date very soon after changes are made to the remote dataset.
            *   You should email the administrator of the remote ERDDAP™ to ask for the datasets.xml for the remote dataset so that you can make the dataset in your local ERDDAP™ look like the dataset in the remote ERDDAP.
        *   If the data source is a remote ERDDAP™, the local dataset will try to subscribe to the remote dataset.
            *   If the subscription succeeds, whenever the remote ERDDAP reloads and has new data, it will contact the flagURL for this dataset, causing it to reload and download the new and/or changed data files.
            *   If the subscription fails (for whatever reason) or if you simply want to ensure that the local dataset is up-to-date, you can set a [flag](/docs/server-admin/additional-information#flag) for the local dataset, so it will reload, so it will check for new and/or changed remote data files.
        *   If the data source isn't a remote ERDDAP: the dataset will check for new and/or changed remote files whenever it reloads. Normally, this is controlled by [&lt;reloadEveryNMinutes>](#reloadeverynminutes). But if you know when there are new remote files, you can set a [flag](/docs/server-admin/additional-information#flag) for the local dataset, so it will reload and check for new and/or changed remote data files. If this happens routinely at a certain time of day (e.g., at 7am), you can make a cron job to use curl to contact the flagUrl for this dataset, so it will reload and check for new and/or changed remote data files.
    *   The &lt;cacheSizeGB> tag specifies the size of the local cache. You probably only need to use this when working with cloud storage systems like [Amazon S3](https://aws.amazon.com/s3/) which is a commonly used storage system that is part of [Amazon Web Services (AWS)](https://aws.amazon.com/). The default is -1.
        *   If the value is &lt;=0 (e.g., the default value of -1),  
            ERDDAP™ will download and maintain a **complete copy** of all of the remote dataset's files in the dataset's &lt;fileDir>.
            *   This is the setting which is recommended whenever possible.
            *   Everytime the dataset is reloaded, it compares the names, sizes, and lastModified times of the remote files and the local files, and downloads any remote files which are new or have changed.
            *   If a file that was on the remote server disappears, ERDDAP™ will not delete the corresponding local file (otherwise, if something was temporarily wrong with the remote server, ERDDAP™ might delete some or all of the local files!).
            *   With this setting, usually you will set &lt;updateEveryNMillis> to -1, since the dataset is aware of when it has copied new data files into place.
        *   If the value is >0,  
            ERDDAP™ will download files from the remote dataset as needed into a local **cache** (in the dataset's &lt;fileDir>) with a threshold size of that specified number of GB.
            *   The cache must be large enough to hold at least several data files.
            *   In general, the larger the cache, the better, because the next requested data file will be more likely to already be in the cache.
            *   Caching should only be used when ERDDAP™ is running in a cloud computing server (e.g., an AWS compute instance) and the remote files in a cloud storage system (e.g., AWS S3).
            *   When the disk space used by the local files exceeds cacheSizeGB, ERDDAP™ will soon (maybe not immediately) delete some of the cached files (currently, based on the Least Recently Used (LRU) algorithm) until the disk space used by the local files is &lt;0.75\*cacheSizeGB (the "goal"). Yes, there are cases where LRU performs very badly -- there is no perfect algorithm.
            *   ERDDAP™ will never try to delete a cached file that ERDDAP™ started to use in the last 10 seconds. This is an imperfect system to deal with the cache system and the data file reader system being only loosely integrated. Because of this rule, ERDDAP™ may not be able to delete enough files to reach its goal, in which case it will print a WARNING to the log.txt file, and the system will waste a lot of time trying to prune the cache, and it is possible that the size of the files in the cache may greatly exceed the cacheSizeGB. If this ever occurs, use a larger cacheSizeGB setting for that dataset.
            *   Currently, ERDDAP™ never checks if the remote server has a newer version of a file that is in the local cache. If you need this feature, please email Chris.John at noaa.gov .
        *   Although the use of the same tag names might imply that the copy system and the cache system use the same underlying system, that is not correct.
            *   The copy system proactively starts taskThread tasks to download new and changed files every time the dataset is reloaded. Only files that have actually been copied to the local directory are available via the ERDDAP™ dataset.
            *   The cache system gets the remote file list every time the dataset is reloaded and pretends that all of those files are available via the ERDDAP™ dataset. Interestingly, all of the remote files even appear in the dataset's /files/ web pages and are available for downloading (although perhaps only after a delay while the file is first downloaded from the remote server to the local cache.)
        *   Datasets that use cacheSizeGB may benefit from using an [nThreads](#nthreads) setting greater than 1, because this will enable the dataset to download more than 1 remote file at a time.
    *   The &lt;cachePartialPathRegex> tag is a rarely used tag that can specify an alternative for the dataset's [&lt;pathRegex>](#pathregex). The default is null.
        *   Only use this if you are copying the entire dataset via the default &lt;cacheSizeGB> value of -1. With &lt;cacheSizeGB> values of >1, this will be ignored because it is nonsensical.
        *   See [the documentation for &lt;pathRegex>](#pathregex) for guidance on how to construct the regex.
        *   If this is specified, it will be used every time the dataset is reloaded, except the first time a dataset is reloaded at the beginning of a month.
        *   This is useful when the remote dataset is stored in a labyrinth of subdirectories and when the vast majority of those files rarely, if ever, change. (&lt;cough>NASA&lt;cough>) You could, for example, specify a &lt;cachePartialPathRegex> which just matches the current year or the current month. These regexes are very tricky to specify, because all of the partial and full path names must match the &lt;cachePartialPathRegex> and because the &lt;cachePartialPathRegex> must work with the remote URLs and the local directories. A real life example is:  
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \>!-- \[2020-10-21 This server is no longer reliably available.\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\*</pathRegex>  
            <cachePartialPathRegex>.\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
            The sample URL above has files in subdirectories based on year (e.g., 2018) and day of year (e.g., 001, 002, ..., 365 or 366).  
            Note that the &lt;cachePartialPathRegex> starts with .\*,  
            then has a specific subdirectory which is common to the remote URLs and the local directories, e.g., /v4\\.1/  
            then has a series of nested capture groups where the first option is nothing  
            and the second option is a specific value.
            
            The example above will only match directories for the second 10 days of 2018, e.g.,  
            https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/ \[2020-10-21 This server is no longer reliably available.\]  
            and day 011, 012, ..., 019.  
            (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)  
            If you need help creating &lt;cachePartialPathRegex>, please email the &lt;cacheFromUrl> to Chris.John at noaa.gov .
            
        *   A common approach: If you want to use &lt;cachePartialPathRegex>, don't use it initially, because you want ERDDAP™ to download all of the files initially. After ERDDAP™ has downloaded all of the files, add it to the dataset's chunk of datasets.xml.  
             
##### Thousands of Files {#thousands-of-files}
If your dataset has many thousands of files, ERDDAP™ may be slow to respond to requests for data from that dataset. There are two issues here:  
 

1.  The number of files per directory.  
    Internally, ERDDAP™ operates at the same speed regardless of whether n files are in one directory or dispersed in several directories.  
     
    But there is a problem: The more files in a given directory, the slower the operating system is at returning the list of files in the directory (per file) to ERDDAP. The response time might be O(n log n). It is hard to say how many files in one directory is too many, but 10,000 is probably too many. So if your setup is generating lots of files, a recommendation here might be: put the files in logically organized subdirectories (e.g., station or station/year).
    
    Another reason to use subdirectories: if a user wants to use ERDDAP's "files" system to find the name of the oldest file for station X, it is faster and more efficient if the files are in station/year subdirectories, because much less information needs to be transferred.
    
2.  The total number of files.  
    For tabular datasets, ERDDAP™ keeps track of the range of values for each variable in each file. When a user makes a request, ERDDAP™ has to read all the data from all of the files that might have data matching the user's request. If the user asks for data from a limited time (e.g., one day or one month), then ERDDAP™ won't have to open too many files in your dataset. But there are extreme cases where almost every file might have matching data (e.g., when waterTemperature=13.2C). Since it takes ERDDAP™ a little bit of time (partly the seek time on the HDD, partly the time to read the file's header) just to open a given file (and more if there are lots of files in the directory), there is a significant time penalty if the total number of files that ERDDAP™ has to open is very large. Even opening 1000 files takes significant time. So there are benefits to periodically consolidating the daily files into larger chunks (e.g., 1 station for 1 year). I understand that you might not want to do this for various reasons, but it does lead to much faster responses. In extreme cases (e.g., I deal with a GTSPP dataset that has ~35 million source files), serving data from a huge number of source files is impractical because ERDDAP's response to simple queries can take hours and use tons of memory. By consolidating source files into a smaller number (for GTSPP, I have 720 now, 2 per month), ERDDAP™ can respond reasonably quickly. See [Millions of Files](#millions-of-files)  
     

N.B. Solid State Drives are great! The fastest, easiest, cheapest way to help ERDDAP™ deal with a huge number of (small) files is to use a solid state drive. See [Solid State Drives are great!](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Millions of Files {#millions-of-files}
*   Some datasets have millions of source files. ERDDAP™ can handle this, but with mixed results.
    
    *   For requests that just involve variables listed in [&lt;subsetVariables>](#subsetvariables), ERDDAP™ has all of the needed information already extracted from the datafiles and stored in one file, so it can respond very, very quickly.
    *   For other requests, ERDDAP™ can scan the dataset's [cached file information](#cached-file-information) and figure out that only a few of the files might have data which is relevant to the request and thus respond quickly.
    *   But for other requests (for example, waterTemperature=18 degree\_C) where any file might have relevant data, ERDDAP™ has to open a large number of files to see if each of the files has any data which is relevant to the request. The files are opened sequentially. On any operating system and any file system (other than solid state drives), this takes a long time (so ERDDAP™ responds slowly) and really ties up the file system (so ERDDAP™ responds slowly to other requests).
    
    Fortunately, there is a solution.
    
    1.  Set up the dataset on a non-public ERDDAP™ (your personal computer?).
    2.  Create and run a script which requests a series of .ncCF files, each with a large chunk of the dataset, usually a time period (for example, all of the data for a given month). Choose the time period so that all of the resulting files are less than 2GB (but hopefully greater than 1GB). If the dataset has near-real-time data, run the script to regenerate the file for the current time period (e.g., this month) frequently (every 10 minutes? every hour?). Requests to ERDDAP™ for .ncCF files create a NetCDF v3 .nc file that uses the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array data structures).
    3.  Set up an [EDDTableFromNcCFFiles](#eddtablefromnccffiles) dataset on your public ERDDAP™ which gets data from the .nc(CF) files. ERDDAP™ can extract data from these files very quickly. And since there are now dozens or hundreds (instead of millions) of files, even if ERDDAP™ has to open all of the files, it can do so quickly.
    
    Yes, this system takes some time and effort to set up, but it works very, very well. Most data requests can be handled 100 times faster than before.  
    \[Bob knew this was a possibility, but it was Kevin O'Brien who first did this and showed that it works well. Now, Bob uses this for the GTSPP dataset which has about 18 million source files and which ERDDAP™ now serves via about 500 .nc(CF) files.\]
    
    N.B. Solid State Drives are great! The fastest, easiest, cheapest way to help ERDDAP™ deal with a huge number of (small) files is to use a solid state drive. See [Solid State Drives are great!](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Huge Files {#huge-files}
*   A single huge data file (notably huge ASCII data files) can cause an OutOfMemoryError. If this is the problem, it should be obvious because ERDDAP™ will fail to load the dataset. The solution, if feasible, is to split the file into multiple files. Ideally, you can split the file into logical chunks. For example, if the file has 20 month's worth of data, split it into 20 files, each with 1 month's worth of data. But there are advantages even if the main file is split up arbitrarily. This approach has multiple benefits: a) This will reduce the memory needed to read the data files to 1/20th, because only one file is read at a time. b) Often, ERDDAP™ can deal with requests much faster because it only has to look in one or a few files to find the data for a given request. c) If data collection is ongoing, then the existing 20 files can remain unchanged, and you only need to modify one, small, new file to add the next month's worth of data to the dataset.  
     
##### FTP Trouble/Advice {#ftp-troubleadvice-1}
*   If you FTP new data files to the ERDDAP™ server while ERDDAP™ is running, there is the chance that ERDDAP™ will be reloading the dataset during the FTP process. It happens more often than you might think! If it happens, the file will appear to be valid (it has a valid name), but the file isn't valid. If ERDDAP™ tries to read data from that invalid file, the resulting error will cause the file to be added to the table of invalid files. This is not good. To avoid this problem, use a temporary filename when FTP'ing the file, for example, ABC2005.nc\_TEMP . Then, the fileNameRegex test (see below) will indicate that this is not a relevant file. After the FTP process is complete, rename the file to the correct name. The renaming process will cause the file to become relevant in an instant.  
    
##### File Name Extracts {#file-name-extracts}
\[This feature is DEPRECATED. Please use [\*\*\*fileName pseudo sourceName](#filename-sourcenames) instead.\]  
EDDTableFromFiles has a system for extracting a String from each filename and using that to make a pseudo data variable. Currently, there is no system to interpret these Strings as dates/times. There are several XML tags to set up this system. If you don't need part or all of this system, just don't specify these tags or use "" values.

*   preExtractRegex is a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) used to identify text to be removed from the start of the filename. The removal only occurs if the regex is matched. This usually begins with "^" to match the beginning of the filename.
*   postExtractRegex is a regular expression used to identify text to be removed from the end of the filename. The removal only occurs if the regex is matched. This usually ends with "$" to match the end of the filename.
*   extractRegex If present, this regular expression is used after preExtractRegex and postExtractRegex to identify a string to be extracted from the filename (for example, the stationID). If the regex isn't matched, the entire filename is used (minus preExtract and postExtract). Use ".\*" to match the entire filename that is left after preExtractRegex and postExtractRegex.
*   columnNameForExtract is the data column source name for the extracted Strings. A dataVariable with this [sourceName](#sourcename) must be in the dataVariables list (with any data type, but usually String).

For example, if a dataset has files with names like XYZAble.nc, XYZBaker.nc, XYZCharlie.nc, ..., and you want to create a new variable (stationID) when each file is read which will have station ID values (Able, Baker, Charlie, ...) extracted from the filenames, you could use these tags:

*   &lt;preExtractRegex>^XYZ&lt;/preExtractRegex>  
    The initial ^ is a regular expression special character which forces ERDDAP™ to look for XYZ at the beginning of the filename. This causes XYZ, if found at the beginning of the filename, to be removed (for example, the filename XYZAble.nc becomes Able.nc).
*   &lt;postExtractRegex>\\.nc$&lt;/postExtractRegex>  
    The $ at the end is a regular expression special character which forces ERDDAP™ to look for .nc at the end of the filename. Since . is a regular expression special character (which matches any character), it is encoded as \\. here (because 2E is the hexadecimal character number for a period). This causes .nc, if found at the end of the filename, to be removed (for example, the partial filename Able.nc becomes Able).
*   &lt;extractRegex>.\*&lt;/extractRegex>  
    The .\* regular expression matches all remaining characters (for example, the partial filename Able becomes the extract for the first file).
*   &lt;columnNameForExtract>stationID&lt;/columnNameForExtract>  
    This tells ERDDAP™ to create a new source column called stationID when reading each file. Every row of data for a given file will have the text extracted from its filename (for example, Able) as the value in the stationID column.

In most cases, there are numerous values for these extract tags that will yield the same results -- regular expressions are very flexible. But in a few cases, there is just one way to get the desired results.  
     
##### Pseudo sourceNames {#pseudo-sourcenames}
Every variable in every dataset in ERDDAP™ has a [&lt;sourceName>](#sourcename) which specifies the source's name for the variable. EDDTableFromFiles supports a few pseudo sourceNames which extract a value from some other place (e.g., the file's name or the value of a global attribute) and promote that value to be a column of constant values for that chunk of data (e.g., the table of that file's data). For these variables, you must specify the variable's data type via the [&lt;dataType>](#datatype) tag. If the extracted information is a dateTime string, you specify the format of the dateTime string in the [units attribute](#string-time-units). The pseudo sourceName options are:  
 
###### global: sourceNames {#global-sourcenames}
A global metadata attribute in each source data file can be promoted to be a column of data. If a variable's &lt;sourceName> has the format
```
        <sourceName>global:*attributeName*</sourceName>
```
then when ERDDAP™ is reading the data from a file, ERDDAP™ will look for a global attribute of that name (for example, PI) and create a column filled with the attribute's value. This is useful when the attribute has different values in different source files, because otherwise, users would only see one of those values for the whole dataset. For example,
```
        <sourceName>global:PI</sourceName>
```
When you promote an attribute to be data, ERDDAP™ removes the corresponding attribute. This is appropriate because the value is presumably different in every file; whereas in the aggregated dataset in ERDDAP™ it will have only one value. If you want, you can add a new value for the attribute for the whole dataset by adding &lt;att name="*attributeName*">*newValue*&lt;/att> to the dataset's global [&lt;addAttributes>](#addattributes). For global attributes that ERDDAP™ requires, for example, institution, you MUST add a new value for the attribute.  
     
###### variable: sourceNames {#variable-sourcenames}
A variable's metadata attribute in each file can be promoted to be a column of data. If a variable's &lt;[sourceName](#sourcename)\> has the format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
then when ERDDAP™ is reading the data from a file, ERDDAP™ will look for the specified attribute (for example, ID) of the specified variable (for example, instrument) and create a column filled with the attribute's value. The parent variable (for example, instrument) needn't be one of the dataVariables included in the dataset's definition in ERDDAP. For example,
```
        <sourceName>variable:instrument:ID</sourceName>
```
This is useful when the attribute has different values in different source files, because otherwise, users would only see one of those values for the whole dataset.

When you promote an attribute to be data, ERDDAP™ removes the corresponding attribute. This is appropriate because the value is presumably different in every file; whereas in the aggregated dataset in ERDDAP™ it will have only one value. If you want, you can add a new value for the attribute for the whole dataset by adding &lt;att name="*attributeName*">*newValue*&lt;/att> to the variable's [&lt;addAttributes>](#addattributes). For attributes that ERDDAP™ requires, for example, ioos\_category (depending on your setup), you MUST add a new value for the attribute.
        
###### fileName sourceNames {#filename-sourcenames}
You can extract part of a file's fileName and promote that to be a column of data. The format for this pseudo [&lt;sourceName>](#sourcename) is
```
        <sourceName>\*\*\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
For example,
```
        <sourceName>\*\*\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
When EDDTableFromFiles is reading the data from a file, it will make sure the fileName (for example, A201807041442.slcpV1.nc) matches the specified regular expression ("regex") and extract the specified (in this case, the first) capture group (which is a part surrounded by parentheses), for example, "201807041442". (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) The regex may be specified as a string with or without surrounding quotes. If the regex is specified as a string with surrounding quotes, the string must be [JSON-style string](https://www.json.org/json-en.html) (with special characters escaped with \\ characters). The capture group number is usually 1 (the first capture group), but may be any number.  
     
###### pathName sourceNames {#pathname-sourcenames}
You can extract part of a file's full pathName (/directories/fileName.ext) and promote that to be a column of data. The format for this pseudo [&lt;sourceName>](#sourcename) is
```
        <sourceName>\*\*\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
For example,
```
        <sourceName>\*\*\*pathName,/data/myDatasetID/(\[A-Z0-9\]\*)/B(\\d{12}).nc,1</sourceName>
```
When EDDTableFromFiles is reading the data from a file, it will make sure the full pathName (for example, /data/myDatasetID/BAY17/B201807041442.nc . For this test, the directory separators will always be '/', never '\\') matches the specified regular expression ("regex") and extract the specified (in this case, the first) capture group (which is a part surrounded by parentheses), for example, "BAY17". (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) The regex may be specified as a string with or without surrounding quotes. If the regex is specified as a string with surrounding quotes, the string must be a [JSON-style string](https://www.json.org/json-en.html) (with special characters escaped with \\ characters). The capture group number is usually 1 (the first capture group), but may be any number.  
         
##### "0 files" Error Message {#0-files-error-message-2}
*   If you run [GenerateDatasetsXml](#generatedatasetsxml) or [DasDds](#dasdds), or if you try to load an EDDTableFrom...Files dataset in ERDDAP™, and you get a "0 files" error message indicating that ERDDAP™ found 0 matching files in the directory (when you think that there are matching files in that directory):
    *   Check that the files really are in that directory.
    *   Check the spelling of the directory name.
    *   Check the fileNameRegex. It's really, really easy to make mistakes with regexes. For test purposes, try the regex .\* which should match all filenames. (See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)
    *   Check that the user who is running the program (e.g., user=tomcat (?) for Tomcat/ERDDAP) has 'read' permission for those files.
    *   In some operating systems (for example, SELinux) and depending on system settings, the user who ran the program must have 'read' permission for the whole chain of directories leading to the directory that has the files.  
         
##### standardizeWhat {#standardizewhat}
*   When any subclass of EDDTableFromFiles is aggregating a set of source files, for a given variable, all of the source files MUST have identical attribute values for several attributes: scale\_factor, add\_offset, \_Unsigned, missing\_value, \_FillValue, and units). Think about it: if one file has windSpeed units=knots and another has windSpeed units=m/s, then the data values from the two files shouldn't be included in the same aggregated dataset. So, when EDDTableFromFiles first creates the dataset, it reads the attribute values from one file, then rejects all of the files that have different values for those important attributes. For most collections of files, this is not a problem because the attributes of all the variables are consistent. However, for other collections of files, this can lead to 1%, 10%, 50%, 90%, or even 99% of the files being rejected as "bad" files. That is trouble.
    
    EDDTableFrom files has a system to deal with this problem: standardizeWhat. The standardizeWhat setting tells EDDTableFromFiles to standardize the files as soon as it reads them, before EDDTableFromFiles looks at the attributes to see if they are consistent.
    
    The flip side is: if the dataset doesn't have this problem, don't use standardizeWhat. standardizeWhat has some potential risks (discussed below) and inefficiencies. So if you don't actually need the features of standardizeWhat, there is no need to face the potential risks and inefficiencies. The biggest inefficiency is: When various standardizeWhat options are used by a dataset, it implies that the source files are storing data in significantly different ways (e.g., with different scale\_factor and add\_offset, or with time strings using different formats). Thus, for a given constraint in a user request, there is no way for ERDDAP™ to make a single source-level constraint that can be applied to all source files. So ERDDAP™ can only apply the affected constraints at a higher level. So ERDDAP™ has to read the data from more files before applying the higher, destination-level constraints. So requests to datasets that use standardizeWhat take longer to be processed.
    
    To use this system, you need to specify  
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
in the [datasets.xml for the EDDTableFrom...Files dataset](#eddtablefromfiles-skeleton-xml) (within the &lt;dataset> tag).
    
The *standardizeWhat* value specifies which changes EDDTableFromFiles should try to apply. The changes are the sum of some combination of:
    
1.  Unpack  
    This does many common and safe operations to standardize numeric columns in the files:
    *   If scale\_factor and/or add\_offset attributes are present, remove them and apply them to unpack the data values.
    *   Unpack packed attributes (e.g., actual\_min, actual\_max, actual\_range, data\_min, data\_max, data\_range, valid\_min, valid\_max, valid\_range), if present, if the variable was packed, and if the attribute values were packed (this is tricky, but reasonably reliable).
    *   If \_FillValue and/or missing\_value are present, convert those data values to ERDDAP's "standard" missing values: MAX\_VALUE for integer types (e.g., 127 for bytes, 32,767 for short, and 2,147,483,647 for ints, 9223372036854775807 for longs) and NaN for doubles and floats.
    *   Remove the old \_FillValue and/or missing\_value attributes (if any), and replace them with just \_FillValue=\[the ERDDAP™ standard missing value\].  
         
2.  Standardize Numeric Times  
    If a numeric column has CF-style numeric time units ("*timeUnits* since *baseTime*", e.g., "days since 1900-01-01"), this converts the dateTime values into "seconds since 1970-01-01T00:00:00Z" values and changes the units attribute to indicate that.  
    If this is selected and there is a chance that this variable has scale\_factor or add\_offset, #1 MUST be selected also.  
     
3.  Apply String missing\_value  
    If a String column has \_FillValue and/or missing\_value attributes, this converts those values to "" and removes the attributes.  
     
4.  Find Numeric missing\_value  
    If a numeric column doesn't have \_FillValue or missing\_value attributes, this tries to identify an undefined numeric missing\_value (e.g., -999, 9999, 1e37f) and convert instances of it to the "standard" values (MAX\_VALUE for integer types, and NAN for doubles and floats).  
    **This option has a risk:** if the largest or smallest valid data value looks like a missing value (e.g., 999), then those valid data values will be converted to missing values (e.g., NaN).  
     
5.  Change String "N/A" to ""  
    For each String column, convert several strings commonly used to indicate a missing String value to "". Currently, this looks for ".", "...", "-", "?", "???", "N/A", "NA", "none", "not applicable", "null", "unknown", "unspecified". The string search is case-insensitive and applied after the strings are trim'd. "nd" and "other" are specifically not on the list.  
    **This option has a risk:** Strings that you consider to be valid values may be converted to "".  
     
6.  Standardize to String ISO 8601 DateTimes  
    For each String column, try to convert not-purely-numeric String dateTimes (e.g., "Jan 2, 2018") to ISO 8601 String dateTimes ("2018-01-02").  
    **Note** that all data values for the column must use the same format, otherwise, this option won't make any changes to a given column.  
    **This option has a risk:** If there is a column with string values that just happen to look like a common dateTime format, they will be converted to ISO 8601 String dateTimes.  
     
7.  Standardize Compact DateTimes To ISO 8601 DateTimes  
    For each String or integer-type column, try to convert purely-numeric String dateTimes (e.g., "20180102") to ISO 8601 String dateTimes ("2018-01-02").  
    **Note** that all data values for the column must use the same format, otherwise, this option won't make any changes to a given column.  
    **This option has a risk:** If there is a column with values that aren't compact dateTimes but look like compact dateTimes, they will be converted to ISO 8601 String dateTimes.  
     
8.  Standardize Units  
    This tries to standardize the units string for each variable. For example, "meters per second", "meter/second", "m.s^-1", "m s-1", "m.s-1" will all be converted to "m.s-1". This doesn't change the data values. This works well for valid UDUNITS units strings, but can have problems with invalid or complex strings. You can deal with problems by specifying specific from-to pairs in &lt;standardizeUdunits> in ERDDAP's  
    \[tomcat\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Please email any changes you make to Chris.John at noaa.gov so they can be incorporated into the default messages.xml.  
    **This option has a risk:** This may mangle some complex or invalid units; however, you can use the work-around described above to circumvent problems if they occur.  
         
    
The default value of standardizeWhat is 0, which doesn't do anything.

If/when you change the value of standardizeWhat, the next time the dataset is reloaded, ERDDAP™ will reread all of the data files for the dataset in order to rebuild the mini-database with information about each file. If the dataset has lots of files, this will take a long time.
    
Notes:

*   A tricky thing is -  
    The standardizeWhat setting is used for all columns in the source file. So, for example, using #2048 might successfully convert a column of compact String dateTimes into ISO 8601 String dateTimes, but it might also mistakenly convert a column with Strings that just happen to look like compact dateTimes.  
     
*   datasets.xml and GenerateDatasetsXml -  
    It is especially tricky to get the settings correct in datasets.xml to make your dataset work the way you want it to. The best approach (as always) is:
    1.  Use [GenerateDatasetsXml](#generatedatasetsxml) and specify the value of standardizeWhat that you would like to use.
    2.  Use [DasDds](#dasdds) to ensure that the dataset loads correctly and reflects the standardizeWhat setting that you specified.
    3.  Test the dataset by hand when it is in ERDDAP™ to ensure that the affected variables work as expected.  
         
*   Risks -  
    Options #256 and above are more risky, i.e., there is a greater chance that ERDDAP™ will make a change that shouldn't be made. For example, option #2048 might accidentally convert a variable with station ID strings that all just happen to look ISO 8601 "compact" dates (e.g., 20180102) into ISO 8601 "extended" dates ("2018-01-02").  
     
*   Slow after a change --  
    Since the value of standardizeWhat changes the data values that EDDTableFromFiles sees for each data file, if you change the standardizeWhat setting, EDDTableFromFiles will throw away all the cached information about each file (which includes the min and max for each data variable in each file) and re-read each data file. If a dataset has a large number of files, this can be very time consuming, so it will take a long time for the dataset to reload the first time ERDDAP™ reloads it after you make the change.  
     
*   Heuristics -  
    Options #256 and above use heuristics to make their changes. If you come across a situation where the heuristics make a bad decision, please email a description of the problem to Chris.John at noaa.gov so we can improve the heuristics.  
     
*   Alternatives --  
    If one of the standardizeWhat options doesn't solve a problem for a given dataset, you may be able to solve the problem by making an [.ncml file](#ncml-files) to parallel every data file and define changes to things in the files so that the files are consistent. Then, tell the EDDTableFrom...Files dataset to aggregate the .ncml files.
    
    Or, use [NCO](#netcdf-operators-nco) to actually make changes to the files so that the files are consistent.
        
##### Separate Columns for Year, Month, Date, Hour, Minute, Second {#separate-columns-for-year-month-date-hour-minute-second}
It is fairly common for tabular data files to have separate columns for year, month, date, hour, minute, second. Before ERDDAP™ v2.10, the only solution was to edit the data file to combine those columns into a unified time column. With ERDDAP™ 2.10+, you can use the  
[&lt;sourceName>=*expression*&lt;sourceName>](#sourcename) to tell ERDDAP™ how to combine the source columns to make a unified time column, so you no longer have to edit the source file.
##### &lt;skipHeaderToRegex&gt; {#skipheadertoregex}
*   [&lt;skipHeaderToRegex>](#skipheadertoregex) --  
    OPTIONAL. (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles datasets only.)  
    When EDDTableFromAsciiFiles reads a data file, it will ignore all of the lines up to and including the line that matches this regular expression. The default is "", which doesn't use this option. An example is  
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\*<skipHeaderToRegex>  
```
which will ignore all lines up to and including a line that starts with "\*\*\* END OF HEADER".

When you use this tag, &lt;columnNamesRow> and &lt;firstDataRow> act as if the header has been removed before the file is read. For example, you would use columnNamesRow=0 if the column names are on the row right after the header.

If you want to use generateDatasetsXml with a dataset that needs this tag:

1.  Make a new, temporary, sample file by copying an existing file and removing the header.
2.  Run generateDatasetsXml and specify that sample file.
3.  Manually add the &lt;skipHeaderToRegex> tag to the datasets.xml chunk.
4.  Delete the temporary, sample file.
5.  Use the dataset in ERDDAP.
##### &lt;skipLinesRegex&gt; {#skiplinesregex}
OPTIONAL. (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles datasets only.)  
When EDDTableFromAsciiFiles reads a data file, it will ignore all lines which match this regular expression. The default is "", which doesn't use this option. An example is  
```
    <skipLinesRegex>#.\*<skipLinesRegex>  
```
which will ignore all lines which start with "#".

When you use this tag, &lt;columnNamesRow> and &lt;firstDataRow> act as if all of the matching lines had been removed before the file is read. For example, you would use columnNamesRow=0 even if there are several lines starting with, for example, "#" at the start of the file.
    
#### EDDTableFromFiles skeleton XML {#eddtablefromfiles-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService {#eddtablefromasciiservice}
[**EDDTableFromAsciiService**](#eddtablefromasciiservice) is essentially a screen scraper. It is intended to deal with data sources which have a simple web service for requesting data (often an HTML form on a web page) and which can return the data in some structured ASCII format (for example, a comma-separated-value or columnar ASCII text format, often with other information before and/or after the data).

EDDTableFromAsciiService is the superclass of all EDDTableFromAsciiService... classes. You can't use EDDTableFromAsciiService directly. Instead, use a subclass of EDDTableFromAsciiService to handle specific types of services:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos) gets data from NOAA NOS's ASCII services.

Currently, no other service types are supported. But it is usually relatively easy to support other services if they work in a similar way. Contact us if you have a request.

#### Details {#details}
The following information applies to all of the subclasses of EDDTableFromAsciiService.

*   Constraints -- ERDDAP™ tabular data requests can put constraints on any variable. The underlying service may or may not allow constraints on all variables. For example, many services only support constraints on station names, latitude, longitude, and time. So when a subclass of EDDTableFromAsciiService gets a request for a subset of a dataset, it passes as many constraints as possible to the source data service and then applies the remaining constraints to the data returned by the service, before handing the data to the user.
*   Valid Range -- Unlike many other dataset types, EDDTableFromAsciiService usually doesn't know the range of data for each variable, so it can't quickly reject requests for data outside of the valid range.
*   Parsing the ASCII Text Response -- When EDDTableFromAsciiService gets a response from an ASCII Text Service, it must validate that the response has the expected format and information, and then extract the data. You can specify the format by using various special tags in the chunk of XML for this dataset:
    *   &lt;beforeData1> through &lt;beforeData10> tags -- You can specify a series of pieces of text (as many as you want, up to 10) that EDDTableFromAsciiService must look for in the header of the ASCII text returned by the service with &lt;beforeData1> through &lt;beforeData10>. For example, this is useful for verifying that the response includes the expected variables using the expected units. The last beforeData tag that you specify identifies the text that occurs right before the data starts.
    *   &lt;afterData> -- This specifies the text that EDDTableFromAsciiService will look for in the ASCII text returned by the service which signifies the end of the data.
    *   &lt;noData> -- If EDDTableFromAsciiService finds this text in the ASCII text returned by the service, it concludes that there is no data which matches the request.
#### EDDTableFromAsciiService skeleton XML {#eddtablefromasciiservice-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS {#eddtablefromasciiservicenos}
[**EDDTableFromAsciiServiceNOS**](#eddtablefromasciiservicenos) makes EDDTable datasets from the ASCII text data services offered by NOAA's [National Ocean Service (NOS)](https://oceanservice.noaa.gov/). For information on how this class works and how to use it, see this class's superclass [EDDTableFromAsciiService](#eddtablefromasciiservice). It is unlikely that anyone other than Bob Simons will need to use this subclass.

Since the data within the response from a NOS service uses a columnar ASCII text format, data variables other than latitude and longitude must have a special attribute which specifies which characters of each data line contain that variable's data, for example,  
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets {#eddtablefromalldatasets}
[**EDDTableFromAllDatasets**](#eddtablefromalldatasets) is a higher-level dataset which has information about all of the other datasets which are currently loaded in your ERDDAP. Unlike other types of datasets, there is no specification for the allDatasets dataset in datasets.xml. ERDDAP™ automatically creates one EDDTableFromAllDatasets dataset (with datasetID=allDatasets). Thus, an allDatasets dataset will be created in each ERDDAP™ installation and will work the same way in each ERDDAP™ installation.

The allDatasets dataset is a tabular dataset. It has a row of information for each dataset. It has columns with information about each dataset, e.g., datasetID, accessible, institution, title, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. Because allDatasets is a tabular dataset, you can query it the same way you can query any other tabular dataset in ERDDAP™, and you can specify the file type for the response. This lets users search for datasets of interest in very powerful ways.  
 
### EDDTableFromAsciiFiles {#eddtablefromasciifiles}
[**EDDTableFromAsciiFiles**](#eddtablefromasciifiles) aggregates data from comma-, tab-, semicolon-, or space-separated tabular ASCII data files.

*   Most often, the files will have column names on the first row and data starting on the second row. (Here, the first row of the file is called row number 1.) But you can use &lt;columnNamesRow> and &lt;firstDataRow> in your datasets.xml file to specify a different row number.
*   ERDDAP™ allows the rows of data to have different numbers of data values. ERDDAP™ assumes that the missing data values are the final columns in the row. ERDDAP™ assigns the standard missing value values for the missing data values. (added v1.56)
*   ASCII files are easy to work with, but they are not the most efficient way to store/retrieve data. For greater efficiency, save the files as NetCDF v3 .nc files (with one dimension, "row", shared by all variables) instead. You can [use ERDDAP™ to generate the new files](#millions-of-files).
*   See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. Because of the total lack of metadata in ASCII files, you will always need to edit the results of GenerateDatasetsXml.
*   WARNING: When ERDDAP™ reads ASCII data files, if it finds an error on a given line (e.g., incorrect number of items), it logs a warning message ("WARNING: Bad line(s) of data" ... with a list of the bad lines on subsequent lines) to the [log.txt file](/docs/server-admin/additional-information#log) and then continues to read the rest of the data file. Thus, it is your responsibility to look periodically (or write a script to do so) for that message in the log.txt so that you can fix the problems in the data files. ERDDAP™ is set up this way so that users can continue to read all of the available valid data even though some lines of the file have flaws.  
     
### EDDTableFromAwsXmlFiles {#eddtablefromawsxmlfiles}
[**EDDTableFromAwsXmlFiles**](#eddtablefromawsxmlfiles) aggregates data from a set of Automatic Weather Station (AWS) XML data files using the WeatherBug Rest XML API (which is no longer active).

*   This type of file is a simple but inefficient way to store the data, because each file usually seems to contain the observation from just one time point. So there may be a large number of files. If you want to improve performance, consider consolidating groups of observations (a week's worth?) in NetCDF v3 .nc files (best: .nc files with the [CF Discrete Sampling Geometries (DSG) Contiguous Ragged Array format](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) and using [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) (or [EDDTableFromNcCFFiles](#eddtablefromnccffiles)) to serve the data. You can [use ERDDAP™ to generate the new files](#millions-of-files).
*   See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.  
     
### EDDTableFromColumnarAsciiFiles {#eddtablefromcolumnarasciifiles}
[**EDDTableFromColumnarAsciiFiles**](#eddtablefromcolumnarasciifiles) aggregates data from tabular ASCII data files with fixed-width columns.

*   Most often, the files will have column names on the first row and data starting on the second row. The first line/row in the file is called row #1. But you can use &lt;columnNamesRow> and &lt;firstDataRow> in your datasets.xml file to specify a different row number.
*   The &lt;addAttributes> for each &lt;dataVariable> for these datasets MUST include these two special attributes:
    
    *   &lt;att name="startColumn">*integer*&lt;att> -- specifies the character column in each line that is the start of this data variable.
    *   &lt;att name="stopColumn">*integer*&lt;att> -- specifies the character column in each line that is the 1 after the end of this data variable.
    
    The first character column is called column #0.  
    For example, for this file that has time values abutting temperature values :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
the time data variable would have
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
and the time data variable would have
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
These attributes MUST be specified for all variables except [fixed-value](#fixed-value-sourcenames) and [file-name-source-names](#filename-sourcenames) variables.
*   ASCII files are easy to work with, but they are not an efficient way to store/retrieve data. For greater efficiency, save the files as NetCDF v3 .nc files (with one dimension, "row", shared by all variables) instead. You can [use ERDDAP™ to generate the new files](#millions-of-files).
*   See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. Because of the difficulty of determining the start and end positions for each data column and the total lack of metadata in ASCII files, you will always need to edit the results from GenerateDatasetsXml.  
     
### EDDTableFromHttpGet {#eddtablefromhttpget}
EDDTableFromHttpGet is different from all other types of datasets in ERDDAP™ in that it has a system whereby specific "authors" can add data, revise data, or delete data from the dataset by regular HTTP GET or [POST](#http-post) requests from a computer program, a script or a browser. The dataset is queryable by users in the same way that all other EDDTable datasets are queryable in ERDDAP. See the description of this class's superclass, [EDDTableFromFiles](#eddtablefromfiles), to read about the features which are inherited from that superclass.

The unique features of EDDTableFromHttpGet are described below. You need to read all of this initial section and understand it; otherwise, you may have unrealistic expectations or get yourself into trouble that is hard to fix.

#### Intended Use {#intended-use}
This system is intended for:

*   Tabular (in situ) data, not gridded data.
*   Real time data -  
    The goal is to allow an author (e.g., the sensor, an automated QC script, or a specific human) to make a change to the dataset (via an [.insert or .delete command](#insert-and-delete)) and make that change accessible to ERDDAP™ users, all in less than 1 second, and possibly much faster. Most of that 1 second is network time. ERDDAP™ can process the request in about 1 ms and the data is immediately accessible to users. This is a [fast](#httpget-speed), [robust](#robust), and [reliable system](#system-reliability).
*   Almost any frequency of data -  
    This system can accept infrequent data (e.g., daily) through very frequent data (e.g., 100 Hz data). If you optimize the system, it can handle higher frequency data (perhaps 10 KHz data if you go to extremes).
*   Data from one sensor or a collection of similar sensors.
*   [Versioning](#versioning) / [Reproducible Science](https://en.wikipedia.org/wiki/Reproducibility) / DOIs --  
    Situations where you need to be able to make changes to the data (e.g., change a quality control flag), know which author made each change, know the timestamp of when the author made the change, and (upon request) be able to see the original data from before the change was made. Thus, these datasets are eligible for [DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). because they meet the DOI requirement that the dataset is unchanging, except by aggregation. In general, near real time datasets are not eligible for DOIs because the data is often retroactively changed (e.g., for QA/QC purposes).  
     

Once data is in an EDDTableFromHttpGet dataset, any user can request data in the same way that they request data from any other EDDTable dataset.  
     
#### Experimental: Be Careful {#experimental-be-careful}
Since this system is new and since lost environmental data can't be reacquired, you should treat EDDTableFromHttpGet as experimental. If you are transitioning from another system, please run the old system and the new system in parallel until you are confident that the new system works well (weeks or months, not just hours or days). In all cases, please make sure your system separately archives the .insert and .delete URLs that are sent to the EDDTableFromHttpGet dataset (even if just in the Apache and/or Tomcat logs), at least for a while. And in all cases, make sure that the data files created by your EDDTableFromHttpGet dataset are routinely backed up to external data storage devices. (Note that [rsync](https://en.wikipedia.org/wiki/Rsync). can back up the data files created by EDDTableFromHttpGet very efficiently.)  
     
#### .insert and .delete {#insert-and-delete}

For any dataset in ERDDAP™, when you send a request to ERDDAP™ for a subset of the data in a dataset, you specify the file type that you want for the response, e.g., .csv, .htmlTable, .nc, .json. EDDTableFromHttpGet extends this system to support two additional "file types" which can insert (or change) or delete data in the dataset:

*   .insert
    *   The request is formatted like a standard HTML form response, with key=value pairs, separated by '&'. For example,  
        https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\_someKey1  
        tells ERDDAP™ to add or change the data for stationID=46088 for the specified time.
    *   The author of this change is JohnSmith and the key is someKey1.
    *   The URL must include valid values (not missing values) for all of the [httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)
    *   If the values of the httpGetRequiredVariables in the request (e.g., stationID and time) match the values on a row already in the dataset, the new values effectively overwrite the old values (although the old values are still accessible if the user requests data from a previous [version](#versioning) of the dataset).
    *   The .insert URL must never include &timestamp= (ERDDAP™ generates that value) or &command= (that is specified by .insert (which is command=0) or .delete (which is command=1)).
    *   If the .insert URL doesn't specify values for other columns that are in the dataset, they are assumed to be the native missing values (MAX\_VALUE for integer data types, NaN for floats and doubles, and "" for Strings).  
             
    *   .delete
        *   The request is formatted like a standard HTML form response, with key=value pairs, separated by '&'. For example,  
            https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\_someKey1  
            tells ERDDAP™ to delete the data for stationID=46088 at the specified time.
        *   The author of this change is JohnSmith and the key is someKey1.
        *   The URL must specify the [httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute) in the request (e.g., stationID and time). If those values match the values on a row already in the dataset (which they usually will), the old values are effectively deleted (although the old values are still accessible if a user requests data from a previous [version](#versioning) of the dataset).
        *   There is no need to specify values for non-HttpGetRequiredVariables, other than author, which is needed to authenticate the request.  
             
    
    Details:
    *   .insert and .delete requests are formatted like standard HTML form responses, with key=value pairs, separated by '&'. The values must be [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding). Thus, you need to encode special characters into the form %HH, where HH is the 2 digit hexadecimal value of the character. Usually, you just need to convert a few of the punctuation characters: % into %25, & into %26, " into %22, &lt; into %3C, = into %3D, > into %3E, + into %2B, | into %7C, \[ into %5B, \] into %5D, space into %20, and convert all characters above #127 into their UTF-8 form and then percent encode each byte of the UTF-8 form into the %HH format (ask a programmer for help).
    *   .insert and .delete requests must include the [httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute), e.g., stationID and time. For .insert requests, variables which are not specified in the request are assumed to be missing values (MAX\_VALUE for integer variables, NaN for float and double variables, and an empty String for String variables). For .delete requests, values for non-HttpGetRequiredVariables (other than author, which is required) are ignored.
    *   .insert and .delete requests must include the name of the author and the author's key via a parameter in the form author=*author\_key* as the last parameter in the request. Requiring this to be last ensures that the entire request has been received by ERDDAP. Only the author (not the key) will be stored in the data file. You must specify the list of allowed *author\_key*'s via the global attribute [httpGetKeys](#httpgetkeys)
    *   .insert and .delete parameters may be scalar (single) values or arrays of any length in the form \[value1,value2,value3,...,valueN\]. For a given request, all variables with arrays must have arrays with the same number of values (else it is an error). If a request has scalar and array values, the scalar values are replicated to become arrays with the same length as the specified arrays, e.g., &stationID=46088 might be treated as &stationID=\[46088,46088,46088\]. Arrays are the key to [high throughput](#httpget-speed). Without arrays, it will be challenging to .insert or .delete more than 8 rows of data per second from a remote author (because of all the overhead of the network). With arrays, it will be easy to .insert or .delete more than 1000 rows of data per second from a remote sensor.
    *   .insert and .delete accept (without an error message) floating point numbers when integers are expected. In these cases, the dataset rounds the values to integers.
    *   .insert and .delete accept (without an error message) integer and floating point numbers which are out-of-range of the variable's data type. In these cases, the dataset stores the values as ERDDAP's native missing values for that data type (MAX\_VALUE for integer types and NaN for floats and doubles).  
         
#### Response {#response}
If the .insert or .delete URL succeeds, the HTTP response code will be 200 (OK) and the response will be text with a .json object, e.g.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Note that the timestamps have millisecond precision.

If the .insert or .delete URL fails, you will get an HTTP response code other than 200 (Okay), e.g., Error 403 Forbidden if you submit an incorrect author\_key value. ERDDAP™ sends the HTTP response code (not, eg., a .json formatted error) because that's how things are done in the internet and because errors can occur anywhere in the system (e.g., in the network, which returns an HTTP error). If the error is from ERDDAP™, the response may include some text (not .json) with a more detailed explanation of what went wrong, but the HTTP response code (200=Okay, anything else is trouble) is the proper way to check if the .insert or .delete succeeded. If checking the HTTP response code isn't possible or is inconvenient, search for "status":"success" in the response text which should be a reliable indication of success.
    
#### Log Files {#log-files}
When EDDTableFromHttpGet receives .insert and .delete commands, it simply appends the information to the relevant file in a set of log files, each of which is a table stored in a [JSON Lines CSV file](https://jsonlines.org/examples/). When a user makes a request for data, ERDDAP™ quickly reads the relevant log files, applies the changes to the dataset in the order they were made, and then filters the request via the user's constraints like any other ERDDAP™ data request. The partitioning of the data into various log files, the storage of various pieces of information (e.g., the timestamp of the command, and whether the command was .insert or .delete), and various aspects of the setup of the dataset, all make it possible for ERDDAP to store data to and retrieve data from this dataset very quickly and very efficiently.  
     
#### Security and Author {#security-and-author}
Every .insert and .delete command must include &author=*author\_key* as the last parameter, where author\_key is composed of the author's identifier (you chose: name, initials, pseudonym, number), an underscore, and a secret key. The ERDDAP™ administrator will work with authors to generate the list of valid author\_key values, which can be changed at any time.  
When EDDTableFromHttpGet receives an .insert or .delete command, it makes sure that the authorID\_key is the last parameter and valid. Because it is the last parameter, it indicates that the entire command line reached ERDDAP™ and wasn't truncated. The secret key ensures that only specific authors may insert or delete data in the dataset. ERDDAP™ then extracts the authorID and saves that in the author variable, so that anyone can see who was responsible for a given change to the dataset.  
.insert and .delete commands can only be made via https: (secure) ERDDAP™ URLs. This ensures that the information being transferred is kept secret during transit.  
     
#### timestamp {#timestamp}
As part of the log system, EDDTableFromHttpGet adds a timestamp (the time that ERDDAP received the request) to each command that it stores in the log files. Because ERDDAP™ generates the timestamp, not the authors, it doesn't matter if different authors are making changes from computers with clocks set to slightly different times. The timestamp reliably indicates the time when the change was made to the dataset.  
     
#### HTTP POST {#http-post}
*   ["What about HTTP POST?!"](#http-post)  
    HTTP [POST](https://en.wikipedia.org/wiki/POST_(HTTP)) is the better alternative (compared to HTTP GET) for sending information from a client to an HTTP server. If you can, or if you really want to improve security, use POST instead of GET to send the information to ERDDAP. POST is more secure because: with GET and https, the URL is transmitted in a secure way, but the entire URL (including parameters, including the author\_key) will be written to the Apache, Tomcat, and ERDDAP™ log files, where someone could read them if the files are not properly secured. With POST, the parameters are transmitted in a secure way and aren't written to the log files. POST is a little harder for clients to work with and isn't supported as widely by client software, but programming languages do support it. The content that you send to the dataset via GET or POST will be the same, just formatted in a different way.  
     
#### httpGetRequiredVariables Global Attribute {#httpgetrequiredvariables-global-attribute}
An essential part of what makes this whole system work is the required global attribute httpGetRequiredVariables, which is a comma-separated list of the dataVariable source names which uniquely identify a row of data. This should be as minimal as possible and will almost always include the time variable. For example, here are the recommended httpGetRequiredVariables for each of the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) (Of course, the ID names may be different in your dataset.):

*   For TimeSeries: stationID, time
*   For Trajectory: trajectoryID, time
*   For Profile: time (assuming time is the profile\_id), depth
*   For TimeSeriesProfile: stationID, time (assuming time is the profile\_id), depth
*   For TrajectoryProfile: trajectoryID, time (assuming time is the profile\_id), depth

    
Taking TimeSeries as an example:  
Given a .insert command that includes stationID=46088 and time=2016-06-23T19:53:00Z (and other values for other variables):
*   If there is no existing data for that station and that time, then the effect will be to add the data to the dataset.
*   If there is existing data for that station and that time, then the effect will be to replace the existing row of data with this new data. (Of course, since ERDDAP™ keeps the log of every command it receives, the old data is still in the log. If a user requests data from a version of the dataset before this change, they will see the older data.)  
         
#### httpGetDirectoryStructure {#httpgetdirectorystructure}
*   [httpGetDirectoryStructure Global Attribute and Data (Log) File Names](#httpgetdirectorystructure)  
    Part of what makes this whole system work efficiently is that ERDDAP™ creates a set of data (log) files, each with a different chunk of the dataset. If these are set up well, ERDDAP™ will be able to respond quickly to most requests for data. This setup is specified by the httpGetDirectoryStructure global attribute, which is a String that looks like a relative filename, e.g., "stationID/10years", but is actually a specification for the directory structure. The parts of that indicate how directory and filenames for the data (log) files will be constructed.
    
    *   If a part is an integer (>= 1) plus a timePeriod (millisecond, second, minute, hour, date, month, year, or their plurals), e.g., 10years, then the EDDTableFromHttpGet dataset will take the time value for the row of data (e.g., 2016-06-23T19:53:00Z), calculate the time truncated to that precision (e.g., 2010), and make a folder or fileName from that.
        
        The goal is to get a reasonably large chunk of data into each file, but far less than 2GB.
        
    *   Otherwise, the part of the specification must be a dataVariable's sourceName, e.g., stationID. In this case, EDDTableFromHttpGet will make a folder or filename from the value of that variable for the new row of data (e.g., "46088").
    
    Because the .insert and .delete command data is stored in specific data (log) files, EDDTableFromHttpGet usually only needs to open one or a few data (log) files to find the data for a given user request. And because each data (log) file has all of the relevant information for its chunk of the dataset, it is fast and easy for EDDTableFromHttpGet to make a specific version (or the current version) of the dataset for the data in that file (and not have to generate the requested version of the entire dataset).
    
    General guidelines are based on the quantity and frequency of the data. If we assume 100 bytes per row of data, then ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \>=1 per second | *featureID*/1year/1day |
    | \>=1 per minute | *featureID*/2months |
    | \>=1 per hour | *featureID*/10years |
    | \>=1 per day | *featureID* |
```
For example, if the directory structure is stationID/2months and you insert data from two stations (46088 and 46155) with time values from Dec 2015 through May 2016, EDDTableFromHttpGet will create directories named 46088 and 46155 and create files in each named 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.jsonl (each holding 2 months worth of data for the relevant station). At any time in the future, if you use .insert or .delete to change or delete the data for, for example, station 46088 at 2016-04-05T14:45:00Z, EDDTableFromHttpGet will append that command to 46088/2016-03.jsonl, the relevant data (log) file. And clearly, it is fine to add data for other stations at any time in the future, since the dataset will simply create additional directories as needed to hold the data from the new stations.
    
#### httpGetKeys {#httpgetkeys}
Every EDDTableFromHttpGet dataset must have a global attribute httpGetKeys which specifies the list of allowed authors and their secret keys as a comma-separated list of *author\_key*, e.g., JohnSmith\_someKey1, HOBOLogger\_someKey2, QCScript59\_someKey3 .
*   author\_key's are case-sensitive and must be entirely ASCII characters (#33 - #126, and without any comma, " or ' characters
*   Keys are like passwords, so they MUST be >=8 characters, hard to guess, and without internal dictionary words. You should treat them as you would treat passwords -- keep them private.
*   The first '\_' character separates the author from the key, so the author name can't include a '\_' character (but a key can).
*   Any given author can have one or more author\_key's, e.g., JohnSmith\_someKey1, JohnSmith\_someKey7, etc.
*   You can change the value of this attribute any time. The changes take effect the next time the dataset is loaded.
*   This information will be removed from the dataset's globalAttributes before it is made public.
*   Each request to the dataset to insert or delete data must include an &author=*author\_key* parameter. After verifying the validity of the key, ERDDAP™ only saves the author part (not the key) in the data file.

#### Set Up {#set-up}

Here are the recommended steps to setting up an EDDTableFromHttpGet dataset:

1.  Make the main directory to hold this dataset's data. For this example, let's use /data/testGet/ . The user running GenerateDatasetsXml and the user running ERDDAP™ must both have read-write access to this directory.  
     
2.  Use a text editor to make a sample .jsonl CSV file with the extension .jsonl in that directory.  
    The name isn't important. For example, you could call it sample.jsonl  
    Make a 2 line .jsonl CSV file, with column names on the first line and dummy/typical values (of the correct data type) on the second line. Here is a sample file that is suitable for a collection of featureType=TimeSeries data that measured air and water temperature.  
    \[For featureType=Trajectory, you might change stationID to be trajectoryID.\]  
    \[For featureType=Profile, you might change stationID to be profileID and add a depth variable.\]
    
    \["stationID", "time", "latitude", "longitude", "airTemp", "waterTemp", "timestamp", "author", "command"\]
    \["myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0\]
    
    Note:
    *   The actual data values don't matter because you will eventually delete this file, but they should be of the correct data type. Notably, the time variable should use the same format that the actual data from the source will use.
    *   For all variables, the sourceName will equal the destinationName, so use the correct/final variable names now, including time, latitude, longitude and sometimes depth or altitude if variables with that information will be included.
    *   There will almost always be a variable named time which records the time the observation was made. It can be dataType String with [units suitable for string times](#string-time-units) (e.g., yyyy-MM-dd'T'HH:mm:ss.SSSZ) or dataType double with [units suitable for numeric times](#time-units) (e.g., seconds since 1970-01-01T00:00:00Z, or some other base time).
    *   Three of the columns (usually the last three) must be timestamp, author, command.
    *   The timestamp column will be used by EDDTableFromHttpGet to add a timestamp indicating when it added a given line of data to the data file. It will have dataType double and units seconds since 1970-01-01T00:00:00Z.
    *   The author column with dataType String will be used to record which authorized author provided this line's data. Authorized authors are specified by the [httpGetKeys global attribute](#httpgetkeys). Although the keys are specified as *author\_key* and are in the "request" URL in that form, only the author part is saved in the data file.
    *   The command column with dataType byte will indicate if the data on this line is an insertion (0) or a deletion (1).  
         
3.  Run GenerateDatasetsXml and tell it
    
    1.  The dataset type is EDDTableFromHttpGet
    2.  The directory is (for this example) /data/testGet/
    3.  The sample file is (for this example) /data/testGet/startup.jsonl
    4.  The httpGetRequiredVariables are (for this example) stationID, time See the description of [httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute) below.
    5.  If data is collected every 5 minutes, the httpGetDirectoryStructure for this example is stationID/2months . See the description of [httpGetDirectoryStructure](#httpgetdirectorystructure) below.
    6.  The [httpGetKeys](#httpgetkeys)
    
    Add the output (the chunk of datasets.xml for the dataset) to datasets.xml.  
     
4.  Edit the datasets.xml chunk for this dataset to make it correct and complete.  
    Notably, replace all the ??? with correct content.  
     
5.  For the &lt;fileTableInMemory> setting:
    *   Set this to true if the dataset will usually get frequent .insert and/or .delete requests (e.g,. more often than once every 10 seconds). This helps EDDTableFromHttpGet respond faster to .insert and/or .delete requests. If you set this to true, EDDTableFromHttpGet will still save the fileTable and related information to disk periodically (as needed, roughly every 5 seconds).
    *   Set this to false (the default) if the dataset will usually get infrequent .insert and/or .delete requests (e.g., less than once every 10 seconds).  
         
6.  Note: It is possible to use &lt;cacheFromUrl> and related settings in datasets.xml for EDDTableFromHttpGet datasets as a way to make and maintain a local copy of a remote EDDTableFromHttpGet dataset on another ERDDAP. However, in this case, this local dataset will reject any .insert and .delete requests.

#### Using EDDTableFromHttpGet Datasets {#using-eddtablefromhttpget-datasets}

*   Authors can make "requests" which [insert data to or delete data from the dataset](#insert-and-delete).  
     
*   After real data has been inserted into the dataset, you can and should delete the original sample data file.  
     
*   Users can request data from the dataset as they do for any other EDDTable dataset in ERDDAP. If the request doesn't include a constraint on the timestamp column, then the request gets data from the current version of the dataset (the log file after processing all of the insertion and deletion commands and re-sorting by the httpGetRequiredVariables).  
     
*   Users can also make requests which are specific to EDDTableFromHttpGet datasets:
    *   If the request includes a &lt; or &lt;= constraint of the timestamp column, then ERDDAP™ processes rows of the log file up until the specified timestamp. In effect, this temporarily deletes all of the changes made to the dataset since that timestamp value. For more info, see [Versioning](#versioning).
    *   If the request includes a >, >=, or = constraint of the timestamp column, e.g., &timestamp&lt;=0, then ERDDAP™ returns the data from the data files as is, without processing the insertion and deletion commands.
*   In the future, we envision that tools will be built (by us? by you?) for working with these datasets. For example, there could be a script which reads the raw log files, applies a different calibration equation, and generates/updates a different dataset with that derived information. Note that the script can get the original data via a request to ERDDAP™ (which gets the data in the file format which is easiest for the script to work with) and generate/update the new dataset via .insert "requests" to ERDDAP. The script doesn't need direct access to the data files; it can be on any authorized author's computer.  
     

#### Detailed Information about EDDTableFromHttpGet {#detailed-information-about-eddtablefromhttpget}

The topics are:

*   [DON'T change the setup!](#dont-change-the-setup)
*   [CRUD](#crud)
*   [InvalidRequests](#invalidrequests)
*   [Speed](#httpget-speed)
*   [Robust](#robust)
*   [System Reliability](#system-reliability)
*   [Versioning](#versioning)
*   ["What about HTTP PUT and DELETE?!"](#https-put-and-delete)
*   [Notes](#httpget-notes)
*   [Thanks to CHORDS for the basic idea.](#thanks)

Here is the detailed information:

##### DON'T change the setup! {#dont-change-the-setup}
Once the dataset has been created and you have added data to it:

*   DON'T add or remove any dataVariables.
*   DON'T change the sourceName or destinationName of the dataVariables.
*   DON'T change the dataType of the dataVariables. But you can change the dataVariable's metadata.
*   DON'T change the httpGetRequiredVariables global attribute.
*   DON'T change the httpGetDirectoryStructure global attribute.

If you need to change any of these things, make a new dataset and transfer all of the data to the new dataset.  
     
##### CRUD {#crud}
In computer science, the four fundamental commands for working with a dataset are [CREATE, READ, UPDATE, DELETE (CRUD)](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, the language for working with relational databases, has the equivalent in INSERT, SELECT, UPDATE, and DELETE. In EDDTableFromHttpGet,

*   .insert is a combination of CREATE and UPDATE.
*   .delete is DELETE.
*   The regular system for requesting subsets of data is READ.

Thus, EDDTableFromHttpGet supports all of the fundamental commands for working with a dataset.  
     
*   .insert or .delete requests with no errors will return HTTP status code=200 and a JSON object, e.g.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
The two timestamp values refer to the same millisecond, which is the millisecond that will be stored in the timestamp variable for the rows of data that were inserted or deleted. ERDDAP™ won't change the name and formatting of these key-value pairs in the future. ERDDAP™ may add additional key-value pairs to the JSON object in the future.  
     
##### InvalidRequests {#invalidrequests}
Invalid .insert or .delete requests will return an HTTP error status code other than status=200 and no change will be made to the dataset. This includes requests with incorrect author information, incorrect variable names, different array lengths for different variables, missing required variables, missing required variable values, etc. If the request involves more than one data file, it is possible that part of the request will succeed and part will fail. However this shouldn't be a problem if the sensor sending the request treats any failure as a complete failure. For example, if you tell ERDDAP™ to insert (or delete) the same data twice in a row, the worst case is that that information is stored twice, close together in the log file. It is hard to see how that could cause trouble.  
     
##### HttpGet Speed {#httpget-speed}
For .insert or .delete requests (not counting http overhead), ballpark figures the speed of .insert or .delete are  
1ms per .insert with 1 row of data  
2ms per .insert with 10 rows of data in arrays (\[\])  
3ms per .insert with 100 rows of data in arrays (\[\])  
13ms per .insert with 1000 rows of data in arrays (\[\])  
Clearly arrays are the key to [high throughput](#httpget-speed). Without arrays, it will be challenging to .insert or .delete more than 8 rows of data per second from a remote author (because of all the overhead of the network). With arrays, it will be easy to .insert or .delete more than 1000 rows of data per second from a remote sensor.

With very large amounts of data per request, you will hit Tomcat's limit to the maximum query length (default is 8KB?), but that can be increased by editing the maxHttpHeaderSize setting in your *tomcat*/conf/server.xml's HTTP/1.1 Connector entry.

When ERDDAP™ reads the JSON Lines CSV data (log) files, there is a small time penalty compared to reading binary data files. We felt that this time penalty when reading was a reasonable price to pay for the speed and robustness of the system when writing data (which is of primary importance).

##### SSD {#ssd}
[For greater speed,](#ssd) use a [Solid State Drive (SSD)](https://en.wikipedia.org/wiki/Solid-state_drive) to store the data. They have a much faster file access time (&lt;0.1ms) than hard disk drives (3 - 12 ms). They also have a faster data transfer rate (200 - 2500 MB/s) than hard disk drives (~200 MB/s). Their cost has come down considerably in recent years. Although early SSD's had problems after a large number of writes to a given block, this problem is now greatly reduced. If you just use the SSD to write the data once then read it many times, even a consumer-grade SSD (which is considerably less expensive than an enterprise-grade SSD) should last a long time.
    
##### Robust {#robust}
We have tried to make this system as easy-to-work-with and as robust as possible.
*   The system is designed to have multiple threads (e.g., the sensor, an automated QC script, and a human) simultaneously working on the same dataset and even the same file. Much of this is made possible by using a log file approach to storing the data and by using a very simple file type, [JSON Lines CSV files](https://jsonlines.org/examples/), to store the data.
*   Another huge advantage to JSON Lines CSV is that if a file ever does become corrupted (e.g., invalid because of an error on a line), it is easy to open the file in a text editor and fix the problem.
*   Another advantage is, if there is an error on a line in a file, the system can still read all the data on lines before and after the error line. And the system can still log additional .insert and .delete information.
*   A huge advantage of using admin-accessible standard files (compared to a relational database or Cassandra or other software): There is no other software which has to be maintained and which has to be running in order to store or retrieve data. And it is easy to back up standard files at any time and in an incremental way because the data is in chunks (after a while, only the current-time file for each station will be changing). In contrast, it takes considerable effort and system down time to make external backup files from databases and from Cassandra.  
         
##### System Reliability {#system-reliability}
It's reasonable to expect one server with ERDDAP™ to have 99.9% uptime -- that's about 9 hours of downtime per year (although, you can use that up in one bad night!).  
If you are diligent and lucky, you might get 99.99% uptime (53 minutes downtime per year), since just a few restarts for updates will take that much time.  
You would have to take extreme measures (a separate backup server, uninterruptible power supply, backup air conditioning, 24x7x365 personnel to monitor the site, etc.) to have a slim chance at 99.999% uptime (5.25 minutes downtime per year). Even then, it is extremely unlikely that you will attain 99.999% uptime (or even 99.99%) because problems are often outside of your control. For example, Amazon Web Service and Google offer astonishingly reliable web services, yet big sections of them are sometimes down for hours.

Face it, everyone wants ERDDAP™ to have 100% uptime, or at least the vaunted "six nines" (99.9999% uptime equals 32 seconds of downtime per year), but there's no way you're going to get it no matter how much time, effort, and money you spend.

But ERDDAP™ uptime isn't the real goal here. The goal is to build a reliable **system**, one that doesn't lose any data. This is a solvable problem.

The solution is: build fault-tolerance into the computer software that is sending the data to ERDDAP. Specifically, that software should maintain a queue of data waiting to go to ERDDAP. When data is added to the queue, the software should check the response from ERDDAP. If the response doesn't include Data received. No errors., then the software should leave the data in the queue. When more data is generated and added to the queue, the software should again try to .insert the data in the queue (perhaps with the \[\] system). It will succeed or fail. If it fails, it will try again later. If you write the software to work this way and if the software is prepared to queue a few days worth of data, you actually do have a good chance of uploading 100% of the sensor's data to ERDDAP. And you will have done it without going to great effort or expense.

\[Background: We didn't think this up. [This is how computer networks achieve reliability.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Computer networks are inherently unreliable. So when you transfer a file from one computer to another, the sending software knows/expects that some packets may be lost. If it doesn't get a proper acknowledgment for a given packet from the receiver, it resends the lost packet. With this approach, relatively simple sender and receiver software can build a reliable file transfer system on top of an unreliable network.\]
    
##### Why JSON Lines CSV files?! {#why-json-lines-csv-files}
EDDTableFromHttpGet uses [JSON Lines CSV files](https://jsonlines.org/examples/). for storing the data. The reasons are:

*   The main reason is: The simplicity of JSON Lines CSV files offers a fast, easy and reliable way to allow multiple threads to write to a given file (e.g., by synchronizing on the filename).
*   If a JSON Lines CSV file ever did become corrupted (e.g., invalid because of an error on a line), EDDTableFromFromHttpGet could still read all of the data on all of the lines before and after the error line. And the .insert and .delete system could continue to add new data to the data file.
*   Because the JSON Lines CSV files are ASCII files, if a file ever did become corrupted, it would be easy to fix (in a text editor).
*   JSON Lines CSV supports Unicode strings.
*   JSON Lines CSV supports variable length strings (not limited to some max length).
*   JSON Lines CSV supports 64-bit integers (longs).
*   The formal nature and extra syntax of JSON Lines CSV (vs old-school CSV) provides some extra assurance that a given line hasn't been corrupted.

We initially tried to use .nc3 files with an unlimited dimension. However, there were problems:

*   The main problem was: There is no reliable way to allow multiple threads to write to a .nc3 file, even if the threads cooperate by doing the writes in a synchronized way.
*   If an .nc3 file becomes corrupted, the .insert and .delete system can't continue to use the file.
*   Because the .nc3 files are binary, if a file becomes corrupted (which they do because of the multi-threading problem) they are exceedingly hard or impossible to fix. There are no tools to help with the repair.
*   CF has no way to specify the encoding of strings, so there is no official way to support Unicode, e.g., the UTF-8 encoding. We tried to get CF to support an \_Encoding attribute but were unable to make any progress. (Unidata, to their credit, does support the \_Encoding attribute.)
*   .nc3 files only support fixed length strings. Again, we tried to get CF and Unidata to support variable length strings but were unable to make any progress.
*   .nc3 files don't support an easy way to distinguish single character variables from String variables. Again, we tried to get CF and Unidata to support a system for distinguishing these two data types, but were unable to make any progress.
*   .nc3 files only support 8-bit characters with an unspecified encoding. Again, we tried to get CF and Unidata to support a system for specifying the encoding, but were unable to make any progress.
*   .nc3 files don't support 64-bit integers (longs). Again, we tried to get CF and Unidata to support a system for longs, but were unable to make any progress.  
         
##### Versioning {#versioning}
Because EDDTableFromHttpGet stores a log of all of the changes to the dataset with the timestamp and the author of each change, it can quickly recreate that dataset as of any point in time. In a sense, there is a version for any point in time. If a user's request for data includes a timestamp &lt;= constraint, e.g., &timestamp&lt;=2016-06-23T16:32:22.128Z (or any time point), but no constraint of author or command, ERDDAP™ will respond to the request by first generating a version of the dataset as of that point in time. Then, ERDDAP™ applies the user's other constraints, as with any other request for data from ERDDAP. EDDTableFromHttpGet is set up so that this process is very fast and efficient, even for very large datasets.

Similarly, a user can find out when the dataset was last updated by requesting ...?timestamp&timestamp=max(timestamp)&distinct()

And for any request for data, for any version of the dataset, users can see which author made which changes, and when they made them.

This versioning system enables [Reproducible Science](https://en.wikipedia.org/wiki/Reproducibility) because anyone, at any time, can request data from the version of the dataset at any point in time. This fine-grained versioning is not possible with any other system that we know of. The underlying mechanism is very efficient, in that no extra storage space is needed, and the processing overhead is truly minimal.

Not everyone has a need for this type of fine-grained versioning, but it is exceedingly useful, perhaps necessary, in the context of a large data management organization (e.g., OOI, Earth Cube, Data One, and NOAA's NCEI) where a dataset can have multiple authors (e.g., the sensor, an automated QC script, and a human editor).

\[History: The need for this type of versioning first came up for me (Bob) when reading about and discussing OOI in 2008. At the time, OOI had a cumbersome, slow, inefficient system for versioning based on Git. Git is great for what it was designed for, but not this. In 2008, while at an OOI discussion, I designed an extensive, efficient alternative-to-OOI system for data management, including many of the features that I have added to ERDDAP™ since then, and including this versioning system. At that time and since, OOI was committed to their versioning system and not interested in alternatives. In 2016, other aspects of this plan fell into place and I started to implement it. Because there were lots of interruptions to work on other projects, I didn't finish until 2018. Even now, I'm not aware of any other scientific data system that offers such quick and easy access to a version of the data from any point in time, for frequently changing datasets. Simple file systems don't offer this. Relational databases don't. Cassandra doesn't.\]
    
##### HTTPS Put and Delete {#https-put-and-delete}
*   ["What about HTTPS PUT and DELETE?!"](#https-put-and-delete)  
    [Hypertext Transfer Protocol (HTTP)](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) is the basis of the World Wide Web and the reason that web page URLs begin with "http://" or "https://". HTTPS is HTTP with an additional security layer. Every day, browsers, scripts and computer programs make billions of HTTP(S) **GET** requests to get information from remote sources. HTTP(S) also includes other [verbs](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), notably PUT (to push data to the server) and DELETE (to DELETE data from the server). Yes, PUT and DELETE are the proper way to insert data into, and delete data from, a dataset via HTTP(S). GET is supported by every piece of software that can work with HTTP(S). GET is really easy to work with. Everyone already knows how to work with GET and many know how to use POST (which can be used in essentially the same way as GET), so we made EDDTableFromHttpGet work with GET and POST. Very few people (even few computer programmers) have ever worked with PUT and DELETE. PUT and DELETE are generally only supported by computer languages, so using them requires a skillful program. So PUT and DELETE are usually a much more cumbersome approach given the way the tools have evolved.  
     
##### HttpGet Notes {#httpget-notes}
*   [Notes](#httpget-notes)
    *   No dataVariable may have dataType=char. Use dataType=String instead. If you really need dataType=char, email Chris.John at noaa.gov .  
         
##### Thanks {#thanks}
*   [Thanks to CHORDS for the basic idea.](#thanks)  
    The basic idea for EDDTableFromHttpGet (i.e., using an HTTP GET request to add data to a dataset) is from UCAR's (NCAR's?) [Cloud-Hosted Real-time Data Services (CHORDS)](https://github.com/earthcubeprojects-chords) project. The format for the parameters in the request (repeated *name=value*, separated by &'s) is the same standard format that is used by HTML forms on web pages. It is a simple and brilliant idea and even more so because it meshes so perfectly with ERDDAP's existing system for dealing with tabular data. The idea is obvious in hindsight, but I (Bob) didn't think of it. EDDTableFromHttpGet uses that basic idea, combined with our ideas of how to implement it, to make a system in ERDDAP™ for uploading data. Other than the basic idea of using GET to push data into the system, the EDDTableFromHttpGet implementation is entirely different and entirely independent of CHORDS and has different features (e.g., log files, chunking of data, different security system, CRUD support, reproducible data). Our exposure to CHORDS was just a webinar. We did not look at their code or read about their project because we immediately knew we wanted to implement the system a different way. But we are grateful to them for the basic idea. The full reference to CHORDS is  
    Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014). Cloud-Hosted Real-time Data Services for the Geosciences (CHORDS) software. UCAR/NCAR -- Earth Observing Laboratory. [https://doi.org/10.5065/d6v1236q](https://doi.org/10.5065/d6v1236q)  
     
### EDDTableFromHyraxFiles {#eddtablefromhyraxfiles}
[**EDDTableFromHyraxFiles**](#eddtablefromhyraxfiles) (deprecated) aggregates data files with several variables, each with one or more shared dimensions (for example, time, altitude (or depth), latitude, longitude), and served by a [Hyrax OPeNDAP server](https://www.opendap.org/software/hyrax-data-server).

*   This dataset type is **DEPRECATED**. The newer and more general solution is to use the [cacheFromUrl option for EDDTableFromFiles](#cachefromurl) (or a variant), which makes a local copy of the remote files and serves the data from the local files. The &lt;cacheFromUrl> option can be used with any type of tabular data file.**  
    If you can't make that work for some reason, email Chris.John at noaa.gov .  
    If there are no complaints before 2020, this dataset type may be removed.**
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
*   In most cases, each file has multiple values for the leftmost (first) dimension, for example, time.
*   The files often (but don't have to) have a single value for the other dimensions (for example, altitude (or depth), latitude, longitude).
*   The files may have character variables with an additional dimension (for example, nCharacters).
*   Hyrax servers can be identified by the "/dods-bin/nph-dods/" or "/opendap/" in the URL.
*   This class screen-scrapes the Hyrax web pages with the lists of files in each directory. Because of this, it is very specific to the current format of Hyrax web pages. We will try to adjust ERDDAP™ quickly if/when future versions of Hyrax change how the files are listed.
*   The &lt;fileDir> setting is ignored. Since this class downloads and makes a local copy of each remote data file, ERDDAP™ forces the fileDir to be *bigParentDirectory*/copy/*datasetID*/.
*   For &lt;sourceUrl>, use the URL of the base directory of the dataset in the Hyrax server, for example,  
    &lt;sourceUrl>http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/&lt;/sourceUrl>  
    (but put it on one line) (sorry, that server is no longer available).  
    The sourceUrl web page usually has "OPeNDAP Server Index of \[directoryName\]" at the top.
*   Since this class always downloads and makes a local copy of each remote data file, you should never wrap this dataset in [EDDTableCopy](#eddtablecopy).
*   See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.
*   See the 1D, 2D, 3D, and 4D examples for [EDDTableFromNcFiles](#eddtablefromncfiles).  
     
### EDDTableFromInvalidCRAFiles {#eddtablefrominvalidcrafiles}
[**EDDTableFromInvalidCRAFiles**](#eddtablefrominvalidcrafiles) aggregates data from NetCDF (v3 or v4) .nc files which use a specific, invalid, variant of the CF DSG Contiguous Ragged Array (CRA) files. Although ERDDAP™ supports this file type, it is an invalid file type that no one should start using. Groups that currently use this file type are strongly encouraged to use ERDDAP™ to generate valid CF DSG CRA files and stop using these files.

Details: These files have multiple row\_size variables, each with a sample\_dimension attribute. The files are non-CF-standard files because the multiple sample (obs) dimensions are to be decoded and related to each other with this additional rule and promise that is not part of the CF DSG specification: "you can associate a given e.g., temperature value (temp\_obs dimension) with a given depth value (z\_obs dimension, the dimension with the most values), because: the temperature row\_size (for a given cast) will be either 0 or equal to the corresponding depth row\_size (for that cast) (that's the rule). So, if the temperature row\_size isn't 0, then the n temperature values for that cast relate directly to the n depth values for that cast (that's the promise)."

Another problem with these files: the Principal\_Investigator row\_size variable doesn't have a sample\_dimension attribute and doesn't follow the above rule.

Sample files for this dataset type can be found at https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/ \[2020-10-21 This server is no longer reliably available\].

See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.

The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.  
 
### EDDTableFromJsonlCSVFiles {#eddtablefromjsonlcsvfiles}
[**EDDTableFromJsonlCSVFiles**](#eddtablefromjsonlcsvfiles) aggregates data from [JSON Lines CSV files](https://jsonlines.org/examples/). See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

*   As jsonlines.org says, this format is "Better than CSV" (and legally, as a federal employee, I can't agree or disagree with them -- how crazy is that?). CSV has never been formally defined and is hampered by the historical baggage related to its connection to the original spreadsheet programs. JSON Lines CSV, in comparison, is fully defined and benefits from its connection to the widely used JSON standard, which in turn benefits from its connection to JavaScript and Java. Notably, there is full support for long integers and for Unicode characters in strings, and a clear way to include other special characters (notably tabs and newlines) within strings.
    
    This format is particularly good for datasets where you need to periodically append additional rows to the end of a given data file. For that reason and others (see above), [EDDTableFromHttpGet](#eddtablefromhttpget) uses Json Lines CSV files for data storage.
    
*   The input files are assumed to be UTF-8 encoded. However, given the \\u*dddd* format for encoding special characters (e.g., \\u20ac is the encoding for the Euro character), you have the option to write the files so that they contain only 7-bit ASCII characters by using \\u*dddd* to encode all characters above #127.  
     
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
    
    The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.
    
*   WARNING: When ERDDAP™ reads JSON Lines CSV data files, if it finds an error on a given line (e.g., incorrect number of items), it logs a warning message ("WARNING: Bad line(s) of data" ... with a list of the bad lines on subsequent lines) to the [log.txt file](/docs/server-admin/additional-information#log) and then continues to read the rest of the data file. Thus, it is your responsibility to look periodically (or write a script to do so) for that message in the log.txt so that you can fix the problems in the data files. ERDDAP™ is set up this way so that users can continue to read all of the available valid data even though some lines of the file have flaws.  
     
### EDDTableFromMultidimNcFiles {#eddtablefrommultidimncfiles}
[**EDDTableFromMultidimNcFiles**](#eddtablefrommultidimncfiles) aggregates data from NetCDF (v3 or v4) .nc (or [.ncml](#ncml-files)) files with several variables, each with one or more shared dimensions. The files may have character variables with or without an additional dimension (for example, STRING14). See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

*   If the files are multidimensional CF DSG variants, use this dataset type instead of [EDDTableFromNcCFFiles](#eddtablefromncfiles).  
     
*   For new tabular datasets from .nc files, use this option before trying the older [EDDTableFromNcFiles](#eddtablefromncfiles). Some advantages of this class are:
    *   This class can read more variables from a wider variety of file structures. If you specify DimensionsCSV (a comma-separated list of dimension names) in GenerateDatasetsXml (or &lt;dimensionsCSV> in the datasets.xml info for one of these datasets), then ERDDAP™ will only read variables in the source files which use some or all of these dimensions, plus all scalar variables. If a dimension is in a group, you must specify its fullName, e.g., "*groupName/dimensionName*".
    *   This class can often reject files very quickly if they don't match a request's constraints. So reading data from large collections will often go much faster.
    *   This class handles true char variables (non-String variables) correctly.
    *   This class can trim String variables when the creator didn't use Netcdf-java's writeStrings (which appends char #0 to mark the end of the string).
    *   This class is better at dealing with individual files that lack certain variables or dimensions.
    *   This class can remove blocks of rows with missing values as specified for [CF Discrete Sampling Geometries (DSG) Incomplete Multidimensional Array files](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
    
    The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.
    
    Group -- GenerateDatasetsXml will ask for a "Group". You can enter "" to have it search any/all groups, "*someGroup*" or "*someGroup/someSubGroup*" to have it search a specific group, or "\[root\]" to have it search just the root group. The "Group" string becomes &lt;group> in the datasets.xml info for the dataset (although "\[root\]" becomes "").
    
    DimensionsCSV -- GenerateDatasetsXml will ask for a "DimensionsCSV" string. This is a comma-separated-value list of source names of a set of dimensions. GenerateDatasetsXml will only read data variables in sample .nc files which use some or all of those dimensions (and no other dimensions), plus all of the scalar variables in the file, and make the dataset from those data variables. If a dimension is in a group, you must specify its fullName, e.g., "*groupName/dimensionName*".  
    If you specify nothing (an empty string), GenerateDatasetsXml will look for the variables with the most dimensions, on the theory that they will be the most interesting, but there may be times when you will want to make a dataset from some other group of data variables that uses some other group of dimensions.  
    If you just specify a dimension name that doesn't exist (e.g., NO\_MATCH), ERDDAP™ will just find all of the scalar variables.  
    The "DimensionsCSV" string becomes &lt;dimensionsCSV> in the datasets.xml info for the dataset.
    
#### treatDimensionsAs {#treatdimensionsas}
There is a category of invalid .nc files (because they don't follow the CF rules) that have multiple dimensions (e.g., lat, lon, time) when they should have used just one dimension (e.g., time), for example:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles has a special feature to deal with these files: if you add the global attribute "treatDimensionsAs" to the datasets global addAttributes, you can tell ERDDAP™ to treat certain dimensions (e.g., lat and lon) as if they were another dimension (e.g., time). The attribute value must be a comma separated list specifying the "from" dimensions and then the "to" dimension, e.g.,  
<att name="treatDimensionsAs">lat, lon, time</att>  
Then ERDDAP™ will read the file as if it were:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Of course, the current size of each of the dimensions in the list must be the same; otherwise, ERDDAP™ will treat the file as a "Bad File".

Note that these files are invalid because they don't follow CF rules. So even though ERDDAP™ can read them, we strongly recommend that you don't create files like this because other CF-based software tools won't be able to read them correctly. If you already have such files, we strongly recommend replacing them with valid files as soon as possible.
    
### EDDTableFromNcFiles {#eddtablefromncfiles}
[**EDDTableFromNcFiles**](#eddtablefromncfiles) aggregates data from NetCDF (v3 or v4) .nc (or [.ncml](#ncml-files)) files and [Zarr](https://github.com/zarr-developers/zarr-python) files (as of version 2.25) with several variables, each with one shared dimension (for example, time) or more than one shared dimensions (for example, time, altitude (or depth), latitude, longitude). The files must have the same dimension names. A given file may have multiple values for each of the dimensions and the values may be different in different source files. The files may have character variables with an additional dimension (for example, STRING14). See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

Zarr files have slightly different behavior and require either the fileNameRegex or the pathRegex to include "zarr".

*   If the .nc files use one of the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) file formats, try using [EDDTableFromNcCFFiles](#eddtablefromncfiles) before trying this.  
     
*   For new tabular datasets from .nc files, try the newer [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) first.  
     
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
    
    The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.
    
    DimensionsCSV -- GenerateDatasetsXml will ask for a "DimensionsCSV" string. This is a comma-separated-value list of source names of a set of dimensions. GenerateDatasetsXml will find the data variables in the .nc files which use some or all of those dimensions, plus all scalar variables, and make the dataset from those data variables. If you specify nothing (an empty string), GenerateDatasetsXml will look for the variables with the most dimensions, on the theory that they will be the most interesting, but there may be times when you will want to make a dataset from some other group of data variables that uses some other group of dimensions.
    
*   1D Example: 1D files are somewhat different from 2D, 3D, 4D, ... files.
    *   You might have a set of .nc data files where each file has one month's worth of data from one drifting buoy.
    *   Each file will have 1 dimension, for example, time (size = \[many\]).
    *   Each file will have one or more 1D variables which use that dimension, for example, time, longitude, latitude, air temperature, ....
    *   Each file may have 2D character variables, for example, with dimensions (time,nCharacters).  
         
*   2D Example:
    *   You might have a set of .nc data files where each file has one month's worth of data from one drifting buoy.
    *   Each file will have 2 dimensions, for example, time (size = \[many\]) and id (size = 1).
    *   Each file will have 2 1D variables with the same names as the dimensions and using the same-name dimension, for example, time(time), id(id). These 1D variables should be included in the list of &lt;dataVariable>'s in the dataset's XML.
    *   Each file will have one or more 2D variables, for example, longitude, latitude, air temperature, water temperature, ...
    *   Each file may have 3D character variables, for example, with dimensions (time,id,nCharacters).  
         
*   3D Example:
    *   You might have a set of .nc data files where each file has one month's worth of data from one stationary buoy.
    *   Each file will have 3 dimensions, for example, time (size = \[many\]), lat (size = 1), and lon (size = 1).
    *   Each file will have 3 1D variables with the same names as the dimensions and using the same-name dimension, for example, time(time), lat(lat), lon(lon). These 1D variables should be included in the list of &lt;dataVariable>'s in the dataset's XML.
    *   Each file will have one or more 3D variables, for example, air temperature, water temperature, ...
    *   Each file may have 4D character variables, for example, with dimensions (time,lat,lon,nCharacters).
    *   The file's name might have the buoy's name within the file's name.  
         
*   4D Example:
    *   You might have a set of .nc data files where each file has one month's worth of data from one station. At each time point, the station takes readings at a series of depths.
    *   Each file will have 4 dimensions, for example, time (size = \[many\]), depth (size = \[many\]), lat (size = 1), and lon (size = 1).
    *   Each file will have 4 1D variables with the same names as the dimensions and using the same-name dimension, for example, time(time), depth(depth), lat(lat), lon(lon). These 1D variables should be included in the list of &lt;dataVariable>'s in the dataset's XML.
    *   Each file will have one or more 4D variables, for example, air temperature, water temperature, ...
    *   Each file may have 5D character variables, for example, with dimensions (time,depth,lat,lon,nCharacters).
    *   The file's name might have the buoy's name within the file's name.  
         
### EDDTableFromNcCFFiles {#eddtablefromnccffiles}
[**EDDTableFromNcCFFiles**](#eddtablefromnccffiles) aggregates data aggregates data from NetCDF (v3 or v4) .nc (or [.ncml](#ncml-files)) files which use one of the file formats specified by the [CF Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) conventions. See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

For files using one of the multidimensional CF DSG variants, use [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles) instead.

The CF DSG conventions defines dozens of file formats and includes numerous minor variations. This class deals with all of the variations we are aware of, but we may have missed one (or more). So if this class can't read data from your CF DSG files, please [reach out for additional support](/docs/intro#support).

We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.  
 
### EDDTableFromNccsvFiles {#eddtablefromnccsvfiles}
[**EDDTableFromNccsvFiles**](#eddtablefromnccsvfiles) aggregates data from [NCCSV](/docs/user/nccsv-1.00) ASCII .csv files. See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
    
    The first thing GenerateDatasetsXml does for this type of dataset after you answer the questions is print the ncdump-like structure of the sample file. So if you enter a few goofy answers for the first loop through GenerateDatasetsXml, at least you'll be able to see if ERDDAP™ can read the file and see what dimensions and variables are in the file. Then you can give better answers for the second loop through GenerateDatasetsXml.
    
*   WARNING: When ERDDAP™ reads NCCSV data files, if it finds an error on a given line (e.g., incorrect number of items), it logs a warning message ("WARNING: Bad line(s) of data" ... with a list of the bad lines on subsequent lines) to the [log.txt file](/docs/server-admin/additional-information#log) and then continues to read the rest of the data file. Thus, it is your responsibility to look periodically (or write a script to do so) for that message in the log.txt so that you can fix the problems in the data files. ERDDAP™ is set up this way so that users can continue to read all of the available valid data even though some lines of the file have flaws.  
     
### EDDTableFromNOS {#eddtablefromnos}
[**EDDTableFromNOS**](#eddtablefromnos) (DEPRECATED) handles data from a NOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/) source, which uses [SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp) for requests and responses. It is very specific to NOAA NOS's XML. See the sample EDDTableFromNOS dataset in datasets2.xml.  
 
### EDDTableFromOBIS {#eddtablefromobis}
[**EDDTableFromOBIS**](#eddtablefromobis) handles data from an Ocean Biogeographic Information System (OBIS) server (was http://www.iobis.org ). It is possible that there are no more active servers which use this now out-of-date type of OBIS server system.

*   OBIS servers expect an XML request and return an XML response.
*   Because all OBIS servers serve the same variables the same way (was http://iobis.org/tech/provider/questions), you don't have to specify much to set up an OBIS dataset in ERDDAP.
*   You MUST include a "creator\_email" attribute in the global addAttributes, since that information is used within the license. A suitable email address can be found by reading the XML response from the sourceURL.
*   You may or may not be able to get the global attribute [&lt;subsetVariables>](#subsetvariables) to work with a given OBIS server. If you try, just try one variable (for example, ScientificName or Genus).
#### EDDTableFromOBIS skeleton XML {#eddtablefromobis-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles {#eddtablefromparquetfiles}
[**EDDTableFromParquetFiles**](#eddtablefromparquetfiles) handles data from [Parquet](https://parquet.apache.org/). See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.

*   Parquet is designed to compress very efficiently, so it may give you smaller file sizes than other formats.
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
*   WARNING: When ERDDAP™ reads Parquet data files, if it finds an error on a given line (e.g., incorrect number of items), it logs a warning message ("WARNING: Bad line(s) of data" ... with a list of the bad lines on subsequent lines) to the [log.txt file](/docs/server-admin/additional-information#log) and then continues to read the rest of the data file. Thus, it is your responsibility to look periodically (or write a script to do so) for that message in the log.txt so that you can fix the problems in the data files. ERDDAP™ is set up this way so that users can continue to read all of the available valid data even though some lines of the file have flaws.  
     
### EDDTableFromSOS {#eddtablefromsos}
[**EDDTableFromSOS**](#eddtablefromsos) handles data from a Sensor Observation Service (SWE/[SOS](https://www.ogc.org/standards/sos)) server.

*   This dataset type aggregates data from a group of stations which are all served by one SOS server.
*   The stations all serve the same set of variables (although the source for each station doesn't have to serve all variables).
*   SOS servers expect an XML request and return an XML response.
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it. It is not easy to generate the dataset XML for SOS datasets by hand. To find the needed information, you must visit sourceUrl+"?service=SOS&request=GetCapabilities" in a browser; look at the XML; make a GetObservation request by hand; and look at the XML response to the request.
*   With the occasional addition of new types of SOS servers and changes to the old servers, it is getting harder for ERDDAP™ to automatically detect the server type from the server's responses. The use of &lt;sosServerType> (with a value of IOOS\_NDBC, IOOS\_NOS, OOSTethys, or WHOI) is now STRONGLY RECOMMENDED. If you have problems with any datasets of this type, try re-running GenerateDatasetsXml for the SOS server. GenerateDatasetsXml will let you try out the different &lt;sosServerType> options until you find the right one for a given server.
*   SOS overview:
    *   SWE (Sensor Web Enablement) and SOS (Sensor Observation Service) are [OpenGIS® standards](https://www.ogc.org/standards). That website has the standards documents.
    *   The OGC Web Services Common Specification ver 1.1.0 (OGC 06-121r3) covers construction of GET and POST queries (see section 7.2.3 and section 9).
    *   If you send a getCapabilities xml request to an SOS server (sourceUrl + "?service=SOS&request=GetCapabilities"), you get an xml result with a list of stations and the observedProperties that they have data for.
    *   An observedProperty is a formal URI reference to a property. For example, urn:ogc:phenomenon:longitude:wgs84 or https://mmisw.org/ont/cf/parameter/sea\_water\_temperature
    *   An observedProperty isn't a variable.
    *   More than one variable may have the same observedProperty (for example, insideTemp and outsideTemp might both have observedProperty https://mmisw.org/ont/cf/parameter/air\_temperature).
    *   If you send a getObservation xml request to an SOS server, you get an xml result with descriptions of field names in the response, field units, and the data. The field names will include longitude, latitude, depth(perhaps), and time.
    *   Each dataVariable for an EDDTableFromSOS must include an "observedProperty" attribute, which identifies the observedProperty that must be requested from the server to get that variable. Often, several dataVariables will list the same composite observedProperty.
    *   The dataType for each dataVariable may not be specified by the server. If so, you must look at the XML data responses from the server and assign appropriate [&lt;dataType>s](#datatype) in the ERDDAP™ dataset dataVariable definitions.
    *   (At the time of writing this) some SOS servers respond to getObservation requests for more than one observedProperty by just returning results for the first of the observedProperties. (No error message!) See the constructor parameter requestObservedPropertiesSeparately.
*   EDDTableFromSOS automatically adds  
  >  <att name="[subsetVariables](#subsetvariables)">station\_id, longitude, latitude</att>  
    to the dataset's global attributes when the dataset is created.
*   SOS servers usually express [units](#units) with the [UCUM](https://unitsofmeasure.org/ucum.html) system. Most ERDDAP™ servers express units with the [UDUNITS](https://www.unidata.ucar.edu/software/udunits/) system. If you need to convert between the two systems, you can use [ERDDAP's web service to convert UCUM units to/from UDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTableFromSOS skeleton XML {#eddtablefromsos-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\_NDBC, IOOS\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\* For IOOS SOS servers, \*every\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles {#eddtablefromthreddsfiles}
[**EDDTableFromThreddsFiles**](#eddtablefromthreddsfiles) (deprecated) aggregates data files with several variables, each with one or more shared dimensions (for example, time, altitude (or depth), latitude, longitude), and served by a [THREDDS OPeNDAP server](https://www.unidata.ucar.edu/software/tds/).

*   This dataset type is **DEPRECATED**. The newer and more general solution is to use the [cacheFromUrl option for EDDTableFromFiles](#cachefromurl) (or a variant), which makes a local copy of the remote files and serves the data from the local files. The &lt;cacheFromUrl> option can be used with any type of tabular data file from any web-based source that publishes a directory-like list of files.**  
    If you can't make that work for some reason, email Chris.John at noaa.gov .  
    If there are no complaints before 2020, this dataset type may be removed.**
*   We strongly recommend using the [GenerateDatasetsXml program](#generatedatasetsxml) to make a rough draft of the datasets.xml chunk for this dataset. You can then edit that to fine tune it.
*   In most cases, each file has multiple values for the leftmost (first) dimension, for example, time.
*   The files often (but don't have to) have a single value for the other dimensions (for example, altitude (or depth), latitude, longitude).
*   The files may have character variables with an additional dimension (for example, nCharacters).
*   THREDDS servers can be identified by the "/thredds/" in the URLs. For example,  
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\_strs\_agg/catalog.html
```
*   THREDDS servers have catalogs in various places. This class REQUIRES that the URL include "/thredds/catalog/". You can usually find this variable by starting in a browser in the root catalog, and then clicking through to the desired subcatalog.
*   This class reads the catalog.xml files served by THREDDS with the lists of &lt;catalogRefs> (references to additional catalog.xml sub-files) and &lt;dataset>s (data files).
*   The &lt;fileDir> setting is ignored. Since this class downloads and makes a local copy of each remote data file, ERDDAP™ forces the fileDir to be *bigParentDirectory*/copy/*datasetID*/.
*   For &lt;sourceUrl>, use the URL of the catalog.xml file for the dataset in the THREDDS server, for example: for this URL which may be used in a web browser,  
    https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html \[2020-10-21 This server is no longer reliably available.\],  
    use &lt;sourceUrl>https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml&lt;/sourceUrl>  
    (but put it on one line).
*   Since this class always downloads and makes a local copy of each remote data file, you should never wrap this dataset in [EDDTableCopy](#eddtablecopy).
*   This dataset type supports an OPTIONAL, rarely-used, special tag, &lt;specialMode>*mode*&lt;/specialMode> which can be used to specify that special, hard-coded rules should be used to determine which files should be downloaded from the server. Currently, the only valid *mode* is SAMOS which is used with datasets from https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the files with the last version number.
*   See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for information on how this class works and how to use it.
*   See the 1D, 2D, 3D, and 4D examples for [EDDTableFromNcFiles](#eddtablefromncfiles).  
     
### EDDTableFromWFSFiles {#eddtablefromwfsfiles}
[**EDDTableFromWFSFiles**](#eddtablefromwfsfiles) (DEPRECATED) makes a local copy of all of the data from an ArcGIS MapServer WFS server so the data can then be re-served quickly to ERDDAP™ users.

*   You need to specify a specially formatted sourceUrl global attribute to tell ERDDAP™ how to request feature information from the server. Please use this example as a template:  
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
    (but put it all on one line)
*   You need to add a special global attribute to tell ERDDAP™ how to identify the names of the chunks of data that should be downloaded. This will probably work for all EDDTableFromWFSFiles datasets:  
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
*   Since this class always downloads and makes a local copy of each remote data file, you should never wrap this dataset in [EDDTableCopy](#eddtablecopy).
*   See this class' superclass, [EDDTableFromFiles](#eddtablefromfiles), for additional information on how this class works and how to use it.  
     
### EDDTableAggregateRows {#eddtableaggregaterows}
[**EDDTableAggregateRows**](#eddtableaggregaterows) can make an EDDTable dataset from a group of "child" EDDTable datasets.

*   Here are some uses for EDDTableAggregateRows:
    *   You could make an EDDTableAggregateRows dataset from two different kinds of files or data sources, for example, a dataset with data up to the end of last month stored in .ncCF files and a dataset with data for the current month stored in a relational database.
    *   You could make an EDDTableAggregateRows dataset to deal with a change in source files (for example, the time format changed, or a variable name changed, or dataType/scale\_factor/add\_offset changed). In this case, one child would get data from files made before the change and the other child would get data from files made after the change. This use of EDDTableAggregateRows is an alternative to using [NcML](#ncml-files) or [NCO](#netcdf-operators-nco). Unless there is a distinguishing feature in the filenames (so you can use &lt;fileNameRegex> to determine which file belongs to which child dataset), you probably need to store the files for the two child datasets in different directories.
    *   You could make an EDDTableAggregateRows dataset which has a shared subset of variables of one or more similar but different datasets, for example, a dataset which makes a Profile dataset from the combination of a Profile dataset, a TimeSeriesProfile dataset, and a TrajectoryProfile dataset (which have some different variables and some variables in common -- in which case you'll have to make special variants for the child datasets, with just the in-common variables).
    *   You could have several standalone datasets, each with the same type of data but from a different station. You could leave those datasets intact, but also create an EDDTableAggregateRows dataset which has data from all of the stations -- each of the child datasets could be a simple [EDDTableFromErddap](#eddfromerddap), which points to one of the existing station datasets. If you do this, give each of the EDDTableFromErddap datasets a different datasetID than the original standalone datasets, e.g., by appending "Child" to the original datasetID.
*   Each of the child &lt;dataset>'s specified must be a complete dataset, as if it were a stand-alone dataset. Each must have the same [dataVariables](#datavariable), in the same order, with the same [destinationNames](#destinationname), [dataTypes](#datatype), [missing\_values](#missing_value), [\_FillValues](#missing_value), and [units](#units). The metadata for each variable for the EDDTableAggregateRows dataset comes from variables in the first child dataset, but EDDTableAggregateRows will update the [actual\_range](#actual_range) metadata to be the actual range for all of the children.
*   Recommendation: Get each of the child datasets working as stand-alone datasets. Then try to make the EDDTableAggregateRows dataset by cutting and pasting the datasets.xml chunk for each into the new EDDTableAggregateRows dataset.
*   Dataset Default Sort Order -- The order of the child datasets determines the overall default sort order of the results. Of course, users can request a different sort order for a given set of results by appending &orderBy("*comma-separated list of variables*") to the end of their query.
*   The "source" [globalAttributes](#global-attributes) for the EDDTableAggregateRows is the combined globalAttributes from the first child dataset. The EDDTableAggregateRows can have a global &lt;addAttributes> to provide additional global attributes or override the source global attributes.
#### EDDTableAggregateRows skeleton XML {#eddtableaggregaterows-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy {#eddtablecopy}
[**EDDTableCopy**](#eddtablecopy) can make a local copy of many types of EDDTable datasets and then re-serve the data quickly from the local copy.

*   EDDTableCopy (and for grid data, [EDDGridCopy](#eddgridcopy)) is a very easy to use and a very effective **solution to some of the biggest problems with serving data from remote data sources:**
    *   Accessing data from a remote data source can be slow.
        *   They may be slow because they are inherently slow (for example, an inefficient type of server),
        *   because they are overwhelmed by too many requests,
        *   or because your server or the remote server is bandwidth limited.
    *   The remote dataset is sometimes unavailable (again, for a variety of reasons).
    *   Relying on one source for the data doesn't scale well (for example, when many users and many ERDDAPs utilize it).  
         
*   How It Works -- EDDTableCopy solves these problems by automatically making and maintaining a local copy of the data and serving data from the local copy. ERDDAP™ can serve data from the local copy very, very quickly. And making and using a local copy relieves the burden on the remote server. And the local copy is a backup of the original, which is useful in case something happens to the original.
    
    There is nothing new about making a local copy of a dataset. What is new here is that this class makes it \*easy\* to create and \*maintain\* a local copy of data from a \*variety\* of types of remote data sources and \*add metadata\* while copying the data.
    
#### EDDTableCopy vs &lt;cacheFromUrl&gt; {#eddtablecopy-vs-cachefromurl}
&lt;cacheFromUrl> is an alternative to EDDTableCopy. They work differently.

*   EDDTableCopy works by requesting chunks of data from a remote service and storing those chunks in local files. Thus, EDDTableCopy is useful in some cases where the data is accessible via a remote service.
*   [&lt;cacheFromUrl>](#cachefromurl) downloads the existing files listed on a remote website. &lt;cacheFromUrl> is easier to use and more reliable since it can easily tell when there is a new remote data file or when a remote data file has changed and thus needs to be downloaded.

If there are situations where EDDTableCopy or &lt;cacheFromUrl> could be used, use &lt;cacheFromUrl> because it is easier and more reliable.  
     
#### &lt;extractDestinationNames&gt; {#extractdestinationnames}
EDDTableCopy makes the local copy of the data by requesting chunks of data from the remote dataset. EDDTableCopy determines which chunks to request by requesting the &distinct() values for the &lt;extractDestinationNames> (specified in the datasets.xml, see below), which are the space-separated destination names of variables in the remote dataset. For example,  
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
might yield distinct values combinations of drifter=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251, ....

In situations where one column (for example, profile) may be all that is required to uniquely identify a group of rows of data, if there are a very large number of, for example, profiles, it may be useful to also specify an additional extractDestinationName (for example, drifter) which serves to subdivide the profiles. That leads to fewer data files in a given directory, which may lead to faster access.
    
#### Local Files {#local-files}
Each chunk of data is stored in a separate NetCDF file in a subdirectory of *bigParentDirectory*/copy/*datasetID*/ (as specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)). There is one subdirectory level for all but the last extractDestinationName. For example, data for tig17+1017, would be stored in  
    *bigParentDirectory*/copy/sampleDataset/tig17/1017.nc .  
    For example, data for une12+1251, would be stored in  
    *bigParentDirectory*/copy/sampleDataset/une12/1251.nc .  
    Directory and filenames created from data values are modified to make them file-name-safe (for example, spaces are replaced by "x20") -- this doesn't affect the actual data.  
     
#### New Data {#new-data}
Each time EDDTableCopy is reloaded, it checks the remote dataset to see what distinct chunks are available. If the file for a chunk of data doesn't already exist, a request to get the chunk is added to a queue. ERDDAP's taskThread processes all the queued requests for chunks of data, one-by-one. You can see statistics for the taskThread's activity on the [Status Page](/docs/server-admin/additional-information#status-page) and in the [Daily Report](/docs/server-admin/additional-information#daily-report). (Yes, ERDDAP™ could assign multiple tasks to this process, but that would use up lots of the remote data source's bandwidth, memory, and CPU time, and lots of the local ERDDAP's bandwidth, memory, and CPU time, neither of which is a good idea.)
    
    NOTE: The very first time an EDDTableCopy is loaded, (if all goes well) lots of requests for chunks of data will be added to the taskThread's queue, but no local data files will have been created. So the constructor will fail but taskThread will continue to work and create local files. If all goes well, the taskThread will make some local data files and the next attempt to reload the dataset (in ~15 minutes) will succeed, but initially with a very limited amount of data.
    
    NOTE: After the local dataset has some data and appears in your ERDDAP, if the remote dataset is temporarily or permanently not accessible, the local dataset will still work.
    
    WARNING: If the remote dataset is large and/or the remote server is slow (that's the problem, isn't it?!), it will take a long time to make a complete local copy. In some cases, the time needed will be unacceptable. For example, transmitting 1 TB of data over a T1 line (0.15 GB/s) takes at least 60 days, under optimal conditions. Plus, it uses lots of bandwidth, memory, and CPU time on the remote and local computers. The solution is to mail a hard drive to the administrator of the remote data set so that s/he can make a copy of the dataset and mail the hard drive back to you. Use that data as a starting point and EDDTableCopy will add data to it. (That is how Amazon's EC2 Cloud Service used to handle the problem, even though their system has lots of bandwidth.)
    
    WARNING: If a given combination of values disappears from a remote dataset, EDDTableCopy does NOT delete the local copied file. If you want to, you can delete it yourself.
    
#### TableCopy &lt;checkSourceData&gt; {#tablecopy-checksourcedata}
The datasets.xml for this dataset can have an optional tag  
```
    <checkSourceData>true</checkSourceData>  
```
The default value is true. If/when you set it to false, the dataset won't ever check the source dataset to see if there is additional data available.  
     
#### Recommended Use {#recommended-use}
1.  Create the &lt;dataset> entry (the native type, not EDDTableCopy) for the remote data source. **Get it working correctly, including all of the desired metadata.**
2.  If it is too slow, add XML code to wrap it in an EDDTableCopy dataset.
    *   Use a different datasetID (perhaps by changing the datasetID of the old datasetID slightly).
    *   Copy the &lt;accessibleTo>, &lt;reloadEveryNMinutes> and &lt;onChange> from the remote EDDTable's XML to the EDDTableCopy's XML. (Their values for EDDTableCopy matter; their values for the inner dataset become irrelevant.)
    *   Create the &lt;extractDestinationNames> tag (see above).
    *   &lt;orderExtractBy> is an OPTIONAL space separated list of destination variable names in the remote dataset. When each chunk of data is downloaded from the remote server, the chunk will be sorted by these variables (by the first variable, then by the second variable if the first variable is tied, ...). In some cases, ERDDAP™ will be able to extract data faster from the local data files if the first variable in the list is a numeric variable ("time" counts as a numeric variable). But choose these variables in a way that is appropriate for the dataset.
3.  ERDDAP™ will make and maintain a local copy of the data.  
         
*   WARNING: EDDTableCopy assumes that the data values for each chunk don't ever change. If/when they do, you need to manually delete the chunk files in *bigParentDirectory*/copy/*datasetID*/ which changed and [flag](/docs/server-admin/additional-information#flag) the dataset to be reloaded so that the deleted chunks will be replaced. If you have an email subscription to the dataset, you will get two emails: one when the dataset first reloads and starts to copy the data, and another when the dataset loads again (automatically) and detects the new local data files.  
     
*   Change Metadata -- If you need to change any addAttributes or change the order of the variables associated with the source dataset:
    1.  Change the addAttributes for the source dataset in datasets.xml, as needed.
    2.  Delete one of the copied files.
    3.  Set a [flag](/docs/server-admin/additional-information#flag) to reload the dataset immediately. If you do use a flag and you have an email subscription to the dataset, you will get two emails: one when the dataset first reloads and starts to copy the data, and another when the dataset loads again (automatically) and detects the new local data files.
    4.  The deleted file will be regenerated with the new metadata. If the source dataset is ever unavailable, the EDDTableCopy dataset will get metadata from the regenerated file, since it is the youngest file.  
         
*   [EDDGridCopy](#eddgridcopy) is very similar to EDDTableCopy, but works with gridded datasets.  
#### EDDTableCopy skeleton XML {#eddtablecopy-skeleton-xml}
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\="..." [active](#active)\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - -

## Details {#details-1}

Here are detailed descriptions of common tags and attributes.

### &lt;angularDegreeUnits&gt; {#angulardegreeunits}
*   [**&lt;angularDegreeUnits>**](#angulardegreeunits) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml which contains a comma-separated list of units strings that ERDDAP™ should treat as angular degrees units. If a variable has one of these units, tabledap's orderByMean filter will calculate the mean in a special way, then report the mean as a value from -180 to 180. See ERDDAP's EDStatic.java source code file for the current default list. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
### &lt;angularDegreeTrueUnits&gt; {#angulardegreetrueunits}
*   [**&lt;angularDegreeTrueUnits>**](#angulardegreetrueunits) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml which contains a comma-separated list of units strings that ERDDAP™ should treat as angular degrees true units. If a variable has one of these units, tabledap's orderByMean filter will calculate the mean in a special way, then report the mean as a value from 0 to 360. See ERDDAP's EDStatic.java source file for the current default list. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
     
### &lt;commonStandardNames&gt; {#commonstandardnames}
*   [**&lt;commonStandardNames>**](#commonstandardnames) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify a comma-separated list of common [CF standard names](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). E.g.,  
```
    <commonStandardNames>air\_pressure, ..., wind\_to\_direction</commonStandardNames>  
```
This list is used in DataProviderForm3.html as a convenience to users.  
If you want to provide this information in datasets.xml, start by copying the current default list in &lt;DEFAULT\_commonStandardNames> in ERDDAP's  
\[tomcat\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.  
     
### &lt;cacheMinutes&gt; {#cacheminutes}
*   [**&lt;cacheMinutes>**](#cacheminutes) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify the age (in minutes) at which files in the cache should be deleted (default=60). E.g.,  
```
    <cacheMinutes>60</cacheMinutes>  
```
In general, only image files (because the same images are often requested repeatedly) and .nc files (because they must be fully created before sending to the user) are cached. Although it might seem like a given request should always return the same response, that isn't true. For example, a tabledap request which includes time>*someTime* will change when new data arrives for the dataset. And a griddap request which includes \[last\] for the time dimension will change when new data arrives for the dataset. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). Before ERDDAP™ v2.00, this was specified in setup.xml, which is still allowed but discouraged.  

### &lt;cacheClearMinutes&gt; {#cacheclearminutes}
*   [**&lt;cacheClearMinutes>**](#cacheclearminutes) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify the frequency to check cached files and remove old ones (in minutes) (default=15). E.g.,  
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
When the server finishes handling a request it will check how long ago the last cache clear was. If it was too long ago, it will queue a task on the TaskThread to clear the cache. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). This can be specified in specified in setup.xml, but that is discouraged.  
     
### &lt;convertInterpolateRequestCSVExample&gt; {#convertinterpolaterequestcsvexample}
*   [**&lt;convertInterpolateRequestCSVExample>**](#convertinterpolaterequestcsvexample) is an OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml \[starting with ERDDAP™ v2.10\] which contains an example which will be shown on the Interpolate converter's web page. The default value is: jplMURSST41/analysed\_sst/Bilinear/4 .
### &lt;convertInterpolateDatasetIDVariableList&gt; {#convertinterpolatedatasetidvariablelist}
*   [**&lt;convertInterpolateDatasetIDVariableList>**](#convertinterpolatedatasetidvariablelist) is an OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml \[starting with ERDDAP™ v2.10\] which contains a CSV list of datasetID/variableName examples which will be used as suggestions by the Interpolate converter's web page. The default value is: jplMURSST41/analysed\_sst .
### &lt;convertToPublicSourceUrl&gt; {#converttopublicsourceurl}
*   [**&lt;convertToPublicSourceUrl>**](#converttopublicsourceurl) is an OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml which contains a "from" and a "to" attribute which specifies how to convert a matching local sourceUrl (usually an IP number) into a public sourceUrl (a domain name). "from" must have the form "\[something\]//\[something\]/". There can be 0 or more of these tags. For more information see [&lt;sourceUrl>](#sourceurl). For example,  
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
will cause a matching local sourceUrl (such as https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day)  
into a public sourceUrl (https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day).  
Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).

But, for security reasons and reasons related to the subscription system, **DON'T USE THIS TAG!**  
Instead, always use the public domain name in the &lt;sourceUrl> tag and use the [/etc/hosts table](https://linux.die.net/man/5/hosts) on your server to convert local domain names to IP numbers without using a DNS server. You can test if a domain name is properly converted into an IP number by using:  
ping *some.domain.name*  
     
### data:image/png;base64, {#dataimagepngbase64}
*   When a user requests an .htmlTable response from ERDDAP™, if the data in a String cell contains data:image/png;base64, followed by a base64 encoded .png image, ERDDAP™ will display an icon (so the user can see the image if they hover over it) and buttons to save the text or the image to the clipboard. This feature was added in ERDDAP™ v2.19 by Marco Alba.
### drawLandMask {#drawlandmask}
*   [**drawLandMask**](#drawlandmask) specifies the default setting which controls when and how the landmask should be drawn when ERDDAP™ draws a map. It can be specified in three different places in datasets.xml (listed from lowest to highest priority):
    
    1.  If drawLandMask is specified within &lt;erddapDatasets> (not connected with any specific dataset), then it specifies the default value of drawLandMask for all variables in all datasets. For example,  
    ```
        <drawLandMask>under</drawLandMask>  
    ```
        Any changes to this tag's value will take effect the next time ERDDAP reads datasets.xml.  
        If this tag isn't present, the underlying default value is under.  
         
    2.  If drawLandMask is specified as a global attribute of a given dataset, then it specifies the default value of drawLandMask for all variables in that dataset, overriding any lower priority setting. For example,  
    ```
        <att name="drawLandMask">under</att>  
    ```
        Any changes to this tag's value will take effect the next time ERDDAP™ reloads that dataset.  
         
    3.  If drawLandMask is specified as a variable's attribute in a given dataset, then it specifies the default value of drawLandMask for that variable in that dataset, overriding any lower priority setting. For example,  
    ```
        <att name="drawLandMask">under</att>  
    ```
        Any changes to this tag's value will take effect the next time ERDDAP™ reloads that dataset.
    
    A user can override the default (wherever it is specified) by selecting a value for "Draw land mask" from a dropdown list on the dataset's Make A Graph web page, or by including &.land=*value* in the URL that requests a map from ERDDAP.
    
    In all situations, there are 4 possible values for the attribute:
    
    *   "under" draws the landmask before it draws data on the map.  
        For gridded datasets, land appears as a constant light gray color.  
        For tabular datasets, "under" shows topography data over land and oceans.
    *   "over" -- For gridded datasets, "over" draws the landmask after it draws data on maps so that it will mask any data over land. For tabular datasets, "over" shows bathymetry of the ocean and a constant light gray where there is land, both drawn under the data.
    *   "outline" just draws the outline of the landmask, political boundaries, lakes and rivers.
    *   "off" doesn't draw anything.  
### &lt;emailDiagnosticsToErdData&gt; {#emaildiagnosticstoerddata}
*   [**&lt;emailDiagnosticsToErdData>**](#emaildiagnosticstoerddata) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml. The tag's value can be true (the default) or false. If true, ERDDAP™ will email the stack trace to Chris.John at noaa.gov (the ERDDAP™ development team). This should be safe and secure since no confidential information (e.g., the requestUrl) is included in the email. This should make it possible to catch any obscure, totally unexpected bugs that lead to NullPointerExceptions. Otherwise, the user sees the exceptions, but the ERDDAP™ development team doesn't (so we don't know there is a problem that needs to be fixed).  
     
### &lt;graphBackgroundColor&gt; {#graphbackgroundcolor}
*   [**&lt;graphBackgroundColor>**](#graphbackgroundcolor) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify default background color on graphs. This affects almost all graphs. There are a few situations not affected. The color is specified as an 8 digit hexadecimal value in the form 0xAARRGGBB, where AA, RR, GG, and BB are the opacity, red, green and blue components, respectively. "0x" is case sensitive, but the hexadecimal digits are not case sensitive. For example, a fully opaque (ff) greenish-blue color with red=22, green=88, blue=ee would be 0xff2288ee. Opaque white is 0xffffffff. The default is opaque light blue (0xffccccff), which has the advantage of being different from white, which is an important color in many palettes used to draw data. For example,  
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
    Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
### &lt;ipAddressMaxRequests&gt; {#ipaddressmaxrequests}
*   [**&lt;ipAddressMaxRequests>**](#ipaddressmaxrequests) is a rarely used optional tag (first supported with ERDDAP™ v2.12) within an &lt;erddapDatasets> tag in datasets.xml that is part of a system to limit the ability of overly aggressive legitimate users and malicious users to make a large number of simultaneous requests which would degrade system performance for other users. ipAddressMaxRequests specifies the maximum number of simultaneous requests that will be accepted from any specific IP address. Additional requests will receive an HTTP 429 error: Too Many Requests. The small, static files in erddap/download/ and erddap/images/ are NOT exempt from this count. The default is 15. The maximum allowed is 1000, which is crazy high -- don't do it! ERDDAP™ won't accept a number less than 6 because many legitimate users (notably web browsers and WMS clients) make up to 6 requests at a time. The ERDDAP™ Daily Report and the similar information written to the log.txt file with each Major Dataset Reload, will now include a tally of the requests by these IP addresses under the title "Requester's IP Address (Too Many Requests)".  
    Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).
    
    The "Major LoadDatasets Time Series" section of status.html includes a "tooMany" column which lists the number of requests which exceeded a user's ipAddressMaxRequests setting and thus saw a "Too Many Requests" error. This lets you easily see when there are active overly aggressive legitimate users and malicious users so you can (optionally) look in the log.txt file and decide if you want to blacklist those users.
    
    There's nothing specifically wrong with setting this to a higher number. It's up to you. But doing so allows/encourages people to set up systems that use a large number of threads to work on projects and then gives them no feedback that what they are doing isn't getting them any benefit.
### &lt;ipAddressMaxRequestsActive&gt; {#ipaddressmaxrequestsactive}
*   [**&lt;ipAddressMaxRequestsActive>**](#ipaddressmaxrequestsactive) is a rarely used optional tag (first supported with ERDDAP™ v2.12) within an &lt;erddapDatasets> tag in datasets.xml that is part of a system to limit the ability of overly aggressive legitimate users and malicious users to make a large number of simultaneous requests which would degrade system performance for other users. ipAddressMaxRequestsActive specifies the maximum number of simultaneous requests that will be actively processed from any specific IP address. Additional requests will sit in a queue until the previous requests have been processed. The small, static files in erddap/download/ and erddap/images/ ARE exempt from this count and the related throttling. The default is 2. The maximum allowed is 100, which is crazy high -- don't do it! You can set this to 1 to be strict, especially if you have problems with overly aggressive or malicious users. Users will still quickly get all the data they request (up to ipAddressMaxRequests), but they won't be able to hog system resources. We don't recommend setting this to a larger number because it allows overly aggressive legitimate users and malicious users to dominate ERDDAP's processing capacity.  
    Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
     
### &lt;ipAddressUnlimited&gt; {#ipaddressunlimited}
*   [**&lt;ipAddressUnlimited>**](#ipaddressunlimited) is a rarely used optional tag (first supported with ERDDAP™ v2.12) within an &lt;erddapDatasets> tag in datasets.xml that is part of a system to limit the ability of overly aggressive legitimate users and malicious users to make a large number of simultaneous requests which would degrade system performance for other users. ipAddressUnlimited is a comma-separated list of IP addresses that you want to allow unlimited access to your ERDDAP. Look in your log.txt file to see which format your server is using for the IP addresses. On some servers, the IP addresses will be in the format #.#.#.# (where # is an integer from 0 to 255); whereas on others it will be in the format #:#:#:#:#:#:#:# . Requesters on this list are not subject to either the ipAddressMaxRequests or the ipAddressMaxRequestsActive settings. This might be a secondary ERDDAP™ or for certain users or servers in your system. ERDDAP™ always adds "(unknownIPAddress)", which ERDDAP™ uses when the requester's IP address can't be determined, e.g., for other processes running on the same server.  
    Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).
    
    If for some reason all of a user's requests get the error message "Timeout waiting for your other requests to process.", then you can solve the problem by adding the user's IP address to the ipAddressUnlimited list, applying that change, then removing it from that list.
    
### &lt;loadDatasetsMinMinutes&gt; {#loaddatasetsminminutes}
*   [**&lt;loadDatasetsMinMinutes>**](#loaddatasetsminminutes) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify the minimum time (in minutes) between major loadDatasets (when ERDDAP™ reprocesses datasets.xml, including checking each dataset to see if it needs to be reloaded according to its reloadEveryNMinutes setting, default=15). E.g.,  
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
If a given run of loadDatasets takes less than this time, the loader just repeatedly looks at the flag directory and/or sleeps until the remaining time has passed. The default is 15 minutes, which should be fine for almost everyone. The only disadvantage to setting this to a smaller number is that it will increase the frequency that ERDDAP™ retries datasets that have errors that prevent them from being loaded (e.g., a remote server is down). If there are lots of such datasets and they are retested frequently, the data source might consider it pestering/aggressive behaviour. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). Before ERDDAP™ v2.00, this was specified in setup.xml, which is still allowed but discouraged.  
     
### &lt;loadDatasetsMaxMinutes&gt; {#loaddatasetsmaxminutes}
*   [**&lt;loadDatasetsMaxMinutes>**](#loaddatasetsmaxminutes) is an OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify the maximum time (in minutes) a major loadDatasets effort is allowed to take (before the loadDatasets thread treated as "stalled" and is interrupted) (default=60). E.g.,  
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
In general, this should be set to at least twice as long as you reasonably think that reloading all of the datasets (cumulatively) should take (since computers and networks sometimes are slower than expected) This should always be much longer than loadDatasetsMinMinutes. The default is 60 minutes. Some people will set this to longer. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). Before ERDDAP™ v2.00, this was specified in setup.xml, which is still allowed but discouraged.  
     
### &lt;logLevel&gt; {#loglevel}
*   [**&lt;logLevel>**](#loglevel) is an OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify how many diagnostic messages are sent to the log.txt file. It can be set to "warning" (the fewest messages), "info" (the default), or "all" (the most messages). E.g.,  
```
    <logLevel>info</logLevel>  
```
Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). Before ERDDAP™ v2.00, this was specified in setup.xml, which is still allowed but discouraged.  
     
### &lt;partialRequestMaxBytes&gt; and &lt;partialRequestMaxCells&gt; {#partialrequestmaxbytes-and-partialrequestmaxcells}
*   [**&lt;partialRequestMaxBytes>**](#partialrequestmaxbytes-and-partialrequestmaxcells) and [**&lt;partialRequestMaxCells>**](#partialrequestmaxbytes-and-partialrequestmaxcells) are rarely used OPTIONAL tags within an &lt;erddapDatasets> tag in datasets.xml. When possible (and it isn't always possible), ERDDAP™ breaks large data requests into chunks to conserve memory.
    
With 32 bit Java, in a simplistic sense, the maximum number of simultaneous *large* requests is roughly 3/4 of the memory available (the -Xmx value passed to Tomcat) divided by the chunk size (e.g., 1200 MB / 100 MB => 12 requests). Other things require memory, so the actual number of requests will be less. In practice, chunking isn't always possible. So one huge or a few very large simultaneous non-chunkable requests could cause problems on 32 bit Java.

With 64 bit Java, the -Xmx value can be much larger. So memory is much less likely to be a constraint.

You can override the default chunk size by defining these tags in datasets.xml (with different values than shown here):  
For grids: &lt;partialRequestMaxBytes>100000000&lt;/partialRequestMaxBytes>  
For tables: &lt;partialRequestMaxCells>1000000&lt;/partialRequestMaxCells>

partialRequestMaxBytes is the preferred maximum number of bytes for a partial grid data request (a chunk of the total request). default=100000000 (10^8). Larger sizes aren't necessarily better (and don't go over 500 MB because that is THREDDS's default limit for DAP responses). But larger sizes may require fewer accesses of tons of files (think of ERD's satellite data with each time point in a separate file - it's better to get more data from each file in each partial request).

partialRequestMaxCells is the preferred maximum number of cells (nRows \* nColumns in the data table) for a partial TABLE data request (a chunk of the total request). Default = 100000. Larger sizes aren't necessarily better. They result in a longer wait for the initial batch of data from the source.

Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). Before ERDDAP™ v2.00, these were specified in setup.xml, which is still allowed but discouraged.  
     
### &lt;requestBlacklist&gt; {#requestblacklist}
*   [**&lt;requestBlacklist>**](#requestblacklist) [is an OPTIONAL tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes) within an &lt;erddapDatasets> tag in datasets.xml which contains a comma-separated list of numeric IP addresses which will be blacklisted. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).
    *   This can be used to fend off a [Denial of Service attack](https://en.wikipedia.org/wiki/Denial_of_service), an overly zealous [web robot](https://en.wikipedia.org/wiki/Internet_bot), or any other type of troublesome user.
    *   Troublesome User -- If ERDDAP™ slows to a crawl or freezes/stops, the cause is often a troublesome user who is running more than one script at once and/or making a large number of very large, extremely inefficient, or invalid requests, or simultaneous requests. Look in [log.txt](/docs/server-admin/additional-information#log) to see if this is the case and to find the numeric IP address of the troublesome user. If this is the problem, you should probably blacklist that user.
        
        When ERDDAP™ gets a request from a blacklisted IP address, it will return HTTP Error 403: Forbidden. The accompanying text error message encourages the user to email you, the ERDDAP administrator, to work out the problems. If they take the time to read the error message (many apparently don't) and contact you, you can then work with them to get them to run just one script at a time, make more efficient requests, fix the problems in their script (for example, requesting data from a remote dataset that can't respond before timing out), or whatever else was the source of trouble.
        
        Users are often simply unaware that their requests are troublesome. They are often unaware of bugs, gross inefficiencies, or other problems with their scripts. They often think that because your ERDDAP™ offers data for free, that they can ask for as much data as they want, e.g., by running multiple scripts or by using multiple threads simultaneously.
        
        *   You can explain to them that each ERDDAP™, now matter how large and powerful, has finite resources (CPU time, hard drive I/O, network bandwidth, etc.) and it isn't fair if one user requests data in a way that crowds out other users or overburdens ERDDAP.
        *   Once a user knows how to make 2 simultaneous requests, they often see no reason not to make 5, 10 or 20 simultaneous requests, since the additional requests cost them nothing. It's like asymmetric warfare: here, the offensive weapons have a tremendous advantage (zero cost) over the defensive weapons (a finite installation with real costs).
        *   Point out to them that there are diminishing returns to making more and more simultaneous requests; the additional requests just further block out other user's requests; they don't yield a huge improvement for them.
        *   Remind them that there are other users (both casual users and other users running scripts), so it isn't fair of them to hog all of ERDDAP's resources.
        *   Point out that the tech giants have induced users to expect infinite resources from web services. While there are ways to set up [grids/clusters/federations of ERDDAPs](/docs/server-admin/scaling) to make an ERDDAP™ system with more resources, most ERDDAP™ administrators don't have the money or the manpower to set up such systems, and such a system will still be finite. At ERD for example, there's one person (me) writing ERDDAP™, administering two ERDDAPs (with help from my boss), and managing several data sources, all with an annual hardware budget of $0 (we rely on occasional grants to pay for hardware). This isn't Google, Facebook, Amazon, etc with 100's of engineers, and millions of dollars of revenue to recycle into ever larger systems. And we can't just move our ERDDAP™ to, for example, Amazon AWS, because the data storage costs are large and the data egress charges are large and variable, while our budget for external services is a fixed $0.
        *   My request to users is: for non-time-sensitive requests (which is by far the most common case), their system should just make one request at a time. If the requests are time sensitive (e.g., multiple .pngs on a web page, multiple tiles for a WMS client, etc.), then perhaps 4 simultaneous requests should be the max (and just for a very short time).
        *   If you explain the situation to the user, most users will understand and be willing to make the necessary changes so that you can remove their IP address from the blacklist.  
             
    *   To blacklist a user, add their numeric IP address to the comma-separated list of IP addresses in &lt;requestBlacklist> in your datasets.xml file. To find the troublesome user's IP address, look in the ERDDAP™ *bigParentDirectory*/logs/log.txt file (*bigParentDirectory* is specified in [setup.xml](/docs/server-admin/deploy-install#setupxml)) to see if this is the case and to find that user's IP address. The IP address for every request is listed on the lines starting with "&#123;&#123;&#123;&#123;#" and is 4 numbers separated by periods, for example, 123.45.67.8 . Searching for "ERROR" will help you find problems such as invalid requests.
    *   You can also replace the last number in an IP address with \* (for example, 202.109.200.\*) to block a range of IP addresses, 0-255.
    *   You can also replace the last 2 numbers in an IP address with \*.\* (for example, 121.204.\*.\*) to block a wider range of IP addresses, 0-255.0-255.
    *   For example,  
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\*, 121.204.\*.\*</requestBlacklist>
    ```
    *   You don't need to restart ERDDAP™ for the changes to &lt;requestBlacklist> to take effect. The changes will be detected the next time ERDDAP™ checks if any datasets need to be reloaded. Or, you can speed up the process by visiting a [setDatasetFlag URL](/docs/server-admin/additional-information#set-dataset-flag) for any dataset.
    *   Your ERDDAP™ daily report includes a list/tally of the most active allowed and blocked requesters.
    *   If you want to figure out what domain/institution is related to a numeric IP address, you can use a free, reverse DNS web service like [https://network-tools.com/](https://network-tools.com/).
    *   There may be times when it makes sense to block certain users at a higher level, for example, malicious users. For example, you can block their access to everything on your server, not just ERDDAP. On Linux, one such method is to use [iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). For example, you can add a rule that will block everything coming from 198.51.100.0 with the command  
        iptables -I INPUT -s 198.51.100.0 -j DROP  
       
### &lt;slowDownTroubleMillis&gt; {#slowdowntroublemillis}
*   [**&lt;slowDownTroubleMillis>**](#slowdowntroublemillis) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml which contains an integer specifying the number of milliseconds (default=1000) to pause when responding to all failed requests, e.g., unknown dataset, request too large, user on the blacklist. E.g.,  
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
    If a script is making one request immediately after another, then it might rapidly make one bad request after another. With this setting, you can slow down a failing script so ERDDAP™ isn't flooded with bad requests. If a human makes a bad request, they won't even notice this delay. Recommendations:
    
    *   If the trouble is a Distributed Denial Of Service (DDOS) attack from 100+ attackers, set this to a smaller number (100?). Slowing them all down for too long leads to too many active threads.
    *   If the trouble is from 1-10 sources, set this to 1000 ms (the default), but a larger number (like 10000) is also reasonable. That slows them down so they waste fewer network resources. Also, 1000 ms or so won't annoy human users who make a bad request.
    
    Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
     
### &lt;subscriptionEmailBlacklist&gt; {#subscriptionemailblacklist}
*   [**&lt;subscriptionEmailBlacklist>**](#subscriptionemailblacklist) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml which contains a comma-separated list of email addresses which are immediately blacklisted from the [subscription system](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions), for example  
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
    This is a case-insensitive system. If an email address is added to this list, if that email address has subscriptions, the subscriptions will be cancelled. If an email address on the list tries to subscribe, the request will be refused. Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
     
### Standard Text {#standard-text}
*   [**Standard Text**](#standard-text) -- There are several OPTIONAL tags (most are rarely used) within an &lt;erddapDatasets> tag in datasets.xml to specify text that appears in various places in ERDDAP. If you want to change the default text, copy the existing value from the tag of the same name in  
    *tomcat*/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml into datasets.xml, then modify the content. The advantage of having these in datasets.xml is that you can specify new values at any time, even when ERDDAP™ is running. Any changes to these tags' values will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). The tag names describe their purpose, but see the default content in messages.xml for a deeper understanding.
    
    *   &lt;standardLicense>
    *   &lt;standardContact>
    *   &lt;standardDataLicenses>
    *   &lt;standardDisclaimerOfEndorsement>
    *   &lt;standardDisclaimerOfExternalLinks>
    *   &lt;standardGeneralDisclaimer>
    *   &lt;standardPrivacyPolicy>
    *   &lt;startHeadHtml5>
    *   &lt;startBodyHtml5> is a good tag to change in order to customize the appearance of the top of every web page in your ERDDAP. Notably, you can use this to easily add a temporary message on the ERDDAP™ home page (e.g., "Check out the new JPL MUR SST v4.1 dataset ..." or "This ERDDAP™ will be offline for maintenance 2019-05-08T17:00:00 PDT through 2019-05-08T20:00:00 PDT."). One quirk of putting this tag in datasets.xml is: when you restart ERDDAP, the very first request to ERDDAP™ will return the default startBodyHtml5 HTML, but every subsequent request will use the startBodyHtml5 HTML specified in datasets.xml.
    *   &lt;theShortDescriptionHtml> is a good tag to change in order to customize the description of your ERDDAP. Note that you can easily change this to add a temporary message on the home page (e.g., "This ERDDAP™ will be offline for maintenance 2019-05-08T17:00:00 PDT through 2019-05-08T20:00:00 PDT.").
    *   &lt;endBodyHtml5>
    
      
    Before ERDDAP™ v2.00, these were specified in setup.xml, which is still allowed but discouraged.  
     
### &lt;unusualActivity&gt; {#unusualactivity}
*   [**&lt;unusualActivity>**](#unusualactivity) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify the maximum number of requests between two runs of LoadDatasets that is considered normal (default=10000). If that number is exceeded, an email is sent to emailEverythingTo (as specified in setup.xml). E.g.,  
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
    Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag). Before ERDDAP™ v2.00, this was specified in setup.xml, which is still allowed but discouraged.  
     
### &lt;updateMaxEvents&gt; {#updatemaxevents}
*   [**&lt;updateMaxEvents>**](#updatemaxevents) is a rarely used OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml to specify the maximum number of file change events (default=10) that will be handled by the [&lt;updateEveryNMillis>](#updateeverynmillis) system before switching to reloading the dataset instead. For example,  
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
    The updateEveryNMillis system is intended to run very quickly right before a user's request is processed. If there are a lot of file change events, then presumably it can't run quickly, so it instead calls for the dataset to be reloaded. If your ERDDAP™ deals with datasets that must be kept up-to-date even when there are changes to a large number of data files, you can set this to a larger number (100?).  

### &lt;user&gt; {#user}
*   [**&lt;user>**](#user) is an OPTIONAL tag within an &lt;erddapDatasets> tag in datasets.xml that identifies a user's username, password (if authentication=custom), and roles (a comma-separated list). The use of username and password varies slightly based on the value of [&lt;authentication>](/docs/server-admin/additional-information#authentication) in your ERDDAP's setup.xml file.
    *   This is part of ERDDAP's [security system](/docs/server-admin/additional-information#security) for restricting access to some datasets to some users.
    *   Make a separate &lt;user> tag for each user. Optionally, if authentication=oauth2, you can set up two &lt;user> tags for each user: one for when the user logs in via Google, one for when the user logs in via Orcid, presumably with the same roles.
    *   If there is no &lt;user> tag for a client, s/he will only be able to access public datasets, i.e., datasets which don't have an [&lt;accessibleTo>](#accessibleto) tag.
    *   username  
        For authentication=custom, the username is usually a combination of letters, digits, underscores, and periods.  
        For authentication=email, the username is the user's email address. It may be any email address.  
        For authentication=google, the username is the user's full Google email address. This includes Google-managed accounts like @noaa.gov accounts.  
        For authentication=orcid, the username is the user's Orcid account number (with dashes).  
        For authentication=oauth2, the username is the user's full Google email address or the user's Orcid account number (with dashes).
    *   password  
        For authentication=email, google, orcid, or oauth2, don't specify a password attribute.  
        For authentication=custom, you must specify a password attribute for each user.
        *   The passwords that users enter are case sensitive and must have 8 or more characters so they are harder to crack. Nowadays, even 8 characters can be cracked quickly and inexpensively by brute force using a cluster of computers on AWS. ERDDAP™ only enforces the 8-character minimum when the user tries to log in (not when the &lt;user> tag is being processed, because that code only sees the hash digest of the password, not the plaintext password).
        *   setup.xml's &lt;passwordEncoding> determines how passwords are stored in the &lt;user> tags in datasets.xml. In order of increasing security, the options are:
            *   [MD5](https://en.wikipedia.org/wiki/MD5) (Don't use this!) -- for the password attribute, specify the MD5 hash digest of the user's password.
            *   UEPMD5 (Don't use this!) -- for the password attribute, specify the MD5 hash digest of *username*:ERDDAP:*password* . The username and "ERDDAP" are used to [salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) the hash value, making it more difficult to decode.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2) (not recommended) -- for the password attribute, specify the SHA-256 hash digest of the user's password.
            *   UEPSHA256 (default, recommended passwordEncoding. But much better: use the google, orchid, or oauth2 authentication options.) -- for the password attribute, specify the SHA-256 hash digest of *username*:ERDDAP:*password* . The username and "ERDDAP" are used to salt the hash value, making it more difficult to decode.
        *   On Windows, you can generate MD5 password digest values by downloading an MD5 program (such as [MD5](https://www.fourmilab.ch/md5/)) and using (for example):  
            md5 -djsmith:ERDDAP:*actualPassword*
        *   On Linux/Unix, you can generate MD5 digest values by using the built-in md5sum program (for example):  
            echo -n "jsmith:ERDDAP:*actualPassword*" | md5sum
        *   Stored plaintext passwords are case sensitive. The stored forms of MD5 and UEPMD5 passwords are not case sensitive.
        *   For example (using UEPMD5), if username="jsmith" and password="myPassword", the &lt;user> tag is:  
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
            where the stored password was generated with  
            md5 -djsmith:ERDDAP:myPassword
        *   roles is a comma-separated list of roles for which the user is authorized. Any &lt;dataset> may have an [&lt;accessibleTo>](#accessibleto) tag which lists the roles which are allowed to access that dataset. For a given user and a given dataset, if one of the roles in the user's list of roles matches one of the roles in the dataset's list of &lt;accessibleTo> roles, then the user is authorized to access that dataset.
            
            Every user who logs in is automatically given the role \[anyoneLoggedIn\], whether there is a &lt;user> tag for them in datasets.xml or not. So if a given dataset has  
```
            <accessibleTo>\[anyoneLoggedIn\]</accessibleTo>  
```
            then any user that is logged in will be authorized to access that dataset, even if there is no &lt;user> tag for them in datasets.xml.
            
    *   Any changes to this tag's value will take effect the next time ERDDAP™ reads datasets.xml, including in response to a dataset [flag](/docs/server-admin/additional-information#flag).  
         
### &lt;pathRegex&gt; {#pathregex}
*   [**&lt;pathRegex>**](#pathregex) lets you specify a regular expression which limits which paths (which subdirectories) will be included in the dataset. The default is .\*, which matches all paths. This is a rarely used, rarely needed, OPTIONAL tag for EDDGridFromFiles datasets, EDDTableFromFiles datasets, and a few other dataset types. However, when you need it, you really need it.
    
    To make this work, you need to be really good with regular expressions. See this [regex documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) and [regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). In particular, you need to know about capture groups (something inside parentheses), and the "or" symbol "|".  
    Together, these let you specify any number of options, e.g., (option1|option2|option3) .  
    Also, any of the options can be nothing, e.g., (|option2|option3) .  
    Also, you need to know that capture groups can be nested, i.e., any option in a capture group can contain another capture group, e.g., (|option2(|option2b|option2c)|option3) which says that option2 can be followed by nothing, or option2b, or option2c.  
    For pathRegexes, each option will be one folder name followed by a /, e.g., bar/ .
    
    The tricky part of the pathRegex is: When ERDDAP™ recursively descends the directory tree, the pathRegex must accept all the paths it encounters on its way to the directories with data. Regex's with nested capture groups are a good way to deal with this.
    
    An Example:  
    Suppose we have the following directory structure:  
    ```
    /foo/bar/D0001/a/\*.nc  
    /foo/bar/D0001/b/\*.nc  
    /foo/bar/D0002/a/\*.nc  
    /foo/bar/D0002/b/\*.nc  
    ...  
    /foo/bar/E0001/a/\*.nc  
    ...  
    ```
    and the specified fileDirectory is /foo/bar/, and we just want the .nc files in the D\[0-9\]{4}/a/ subdirectories.  
    The solution is to set pathRegex to /foo/bar/(|D\[0-9\]{4}/(|a/))  
    That says:  
    The path must start with /foo/bar/  
      That may be followed by nothing or D\[0-9\]{4}/  
        That may be followed by nothing or a/
    
    Yes, pathRegex's can be incredibly difficult to formulate. If you get stuck, ask a computer programmer (the closest thing in the real world to a wizard spouting incantations?) or send an email to Chris.John at noaa.gov.
    
### &lt;dataset&gt; {#dataset}
*   [**&lt;dataset>**](#dataset) is an OPTIONAL (but always used) tag within an &lt;erddapDatasets> tag in datasets.xml that (if you include all of the information between &lt;dataset> and &lt;/dataset>) completely describes one dataset. For example,  
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
    There MAY be any number of dataset tags in your datasets.xml file.  
    Three attributes MAY appear within a &lt;dataset> tag:  
     
    *   **type="*aType*"** is a REQUIRED attribute within a &lt;dataset> tag in datasets.xml which identifies the dataset type (for example, whether it is an EDDGrid/gridded or EDDTable/tabular dataset) and the source of the data (for example, a database, files, or a remote OPeNDAP server). See the [**List of Dataset Types**](#list-of-types-datasets).  
         
#### datasetId {#datasetid}
*   [**datasetID="*aDatasetID*"**](#datasetid) is a REQUIRED attribute within a &lt;dataset> tag which assigns a short (usually &lt;15 characters), unique, identifying name to a dataset.
    *   The datasetIDs MUST be a letter (A-Z, a-z) followed by any number of A-Z, a-z, 0-9, and \_ (but best if &lt;32 characters total).
    *   DatasetIDs are case sensitive, but DON'T create two datasetIDs that only differ in upper/lowercase letters. It will cause problems on Windows computers (yours and/or a user's computer).
    *   Best practices: We recommend using [camelCase](https://en.wikipedia.org/wiki/CamelCase).
    *   Best practices: We recommend that the first part be an acronym or abbreviation of the source institution's name and the second part be an acronym or abbreviation of the dataset's name. When possible, we create a name which reflects the source's name for the dataset. For example, we used datasetID="erdPHssta8day" for a dataset from the NOAA NMFS SWFSC Environmental Research Division (ERD) which is designated by the source to be satellite/PH/ssta/8day.
    *   If you change a dataset's name, the old dataset (with the old name) will still be live in ERDDAP. This is an "orphan" dataset, because the specification for it in datasets.xml is now gone. This must be dealt with:
        1.  For ERDDAP™ v2.19 and later, you don't need to do anything. ERDDAP™ will automatically remove these orphan datasets.
        2.  For ERDDAP™ v2.18 and earlier, you need to do something to remove the orphan datasets: Make a active="false" dataset, e.g.,  
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
After the next major loadDatasets, You can remove that tag after the old dataset is inactive.  
                 
#### active {#active}
*   [**active="*boolean*"**](#active) is an OPTIONAL attribute within a &lt;dataset> tag in datasets.xml which indicates if a dataset is active (eligible for use in ERDDAP) or not.
    *   Valid values are true (the default) and false.
    *   Since the default is true, you don't need to use this attribute until you want to temporarily or permanently remove this dataset from ERDDAP.
    *   If you just remove an active="true" dataset from datasets.xml, the dataset will still be active in ERDDAP™ but will never be updated. Such a dataset will be an "orphan" and will be listed as such on the status.html web page right below the list of datasets that failed to load.
    *   If you set active="false", ERDDAP™ will deactivate the dataset the next time it tries to update the dataset. When you do this, ERDDAP™ doesn't throw out any information it may have stored about the dataset and certainly doesn't do anything to the actual data.
    *   In order to remove a dataset from ERDDAP™, see [Force Dataset Removal](/docs/server-admin/additional-information#removing-datasets).  
         

**Several tags can appear between the &lt;dataset> and &lt;/dataset> tags.**  
There is some variation in which tags are allowed by which types of datasets. See the documentation for a specific [type of dataset](#list-of-types-datasets) for details.

#### &lt;accessibleTo&gt; {#accessibleto}
*   [**&lt;accessibleTo>**](#accessibleto) is an OPTIONAL tag within a &lt;dataset> tag that specifies a comma-separated list of [roles](#user) which are allowed to have access to this dataset. For example,  
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    *   This is part of ERDDAP's [security system](/docs/server-admin/additional-information#security) for restricting access to some datasets to some users.
    *   If this tag is not present, all users (even if they haven't logged in) will have access to this dataset.
    *   If this tag is present, this dataset will only be visible and accessible to logged-in users who have one of the specified roles. This dataset won't be visible to users who aren't logged in.
    *   Every user who logs in is automatically given the role \[anyoneLoggedIn\], whether there is a &lt;user> tag for them in datasets.xml or not. So if a given dataset has  
    ```
        <accessibleTo>\[anyoneLoggedIn\]</accessibleTo>  
    ```
    then any user that is logged in will be authorized to access that dataset, even if there is no &lt;user> tag for them in datasets.xml.  
         
#### &lt;graphsAccessibleTo&gt; {#graphsaccessibleto}
*   [**&lt;graphsAccessibleTo>**](#graphsaccessibleto) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml which determines whether graphics and metadata for the dataset are available to the public. It offers a way to partially override the dataset's [&lt;accessibleTo>](#accessibleto) setting. The allowed values are:
    *   auto -- This value (or the absence of a &lt;graphsAccessibleTo> tag for the dataset) makes access to graphs and metadata from the dataset mimic the dataset's &lt;accessibleTo> setting.  
        So if the dataset is private, its graphs and metadata will be private.  
        And if the dataset is public, its graphs and metadata will be public.
    *   public -- This setting makes the dataset's graphs and metadata accessible to anyone, even users who aren't logged in, even if the dataset is otherwise private because it has an &lt;accessibleTo> tag.  
         
#### &lt;accessibleViaFiles&gt; {#accessibleviafiles}
*   [**&lt;accessibleViaFiles>**](#accessibleviafiles) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml for [EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension), [EDDGridCopy](#eddgridcopy), [EDDGridFromEDDTable](#eddgridfromeddtable), [EDDGridFromErddap](#eddfromerddap), [EDDGridFromEtopo](#eddgridfrometopo), [EDDGridFromFiles](#eddgridfromfiles) (including all subclasses), [EDDGridSideBySide](#eddgridsidebyside), [EDDTableCopy](#eddtablecopy) [EDDTableFromErddap](#eddfromerddap), [EDDTableFromEDDGrid](#eddtablefromeddgrid), and [EDDTableFromFiles](#eddtablefromfiles) (including all subclasses) datasets. It can have a value of true or false. For example,  
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
    If the value is true, ERDDAP™ will make it so that users can browse and download the dataset's source data files via ERDDAP's ["files" system](https://coastwatch.pfeg.noaa.gov/erddap/files/). See the "files" system's [documentation](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) for more information.
    
    The default value of &lt;accessibleViaFiles> comes from &lt;defaultAccessibleViaFiles> in [setup.xml](/docs/server-admin/deploy-install#setupxml). It has a default value of false, but we recommend that you add that tag to your setup.xml with a value of true.
    
    Recommendation -- We recommend making all relevant datasets accessible via the files system by setting &lt;defaultAccessibleViaFiles> to true in setup.xml because there is a group of users for whom this is the preferred way to get the data. Among other reasons, the "files" system makes it easy for users to see which files are available and when they last changed, thus making it easy for a user to maintain their own copy of the entire dataset. If you generally don't want to make datasets accessible via the files system, set &lt;defaultAccessibleViaFiles> to false. In either case, just use &lt;accessibleViaFiles> for the few datasets which are exceptions to the general policy set by &lt;defaultAccessibleViaFiles> (for example, when the dataset uses [.ncml](#ncml-files) files, which aren't really useful to users).  
     
#### &lt;accessibleViaWMS&gt; {#accessibleviawms}
*   [**&lt;accessibleViaWMS>**](#accessibleviawms) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml for all [EDDGrid](#eddgrid) subclasses. It can have a value of true (the default) or false. For example,  
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
    If the value is false, ERDDAP's WMS server won't be available for this dataset. This is commonly used for datasets that have some longitude values greater than 180 (which technically is invalid for WMS services), and for which you are also offering a variant of the dataset with longitude values entirely in the range -180 to 180 via [EDDGridLonPM180](#eddgridlonpm180).  
    If the value is true, ERDDAP™ will try to make the dataset available via ERDDAP's WMS server. But if the dataset is completely unsuitable for WMS (e.g., there is no longitude or latitude data), then the dataset won't be available via ERDDAP's WMS server, regardless of this setting.  
     
#### &lt;addVariablesWhere&gt; {#addvariableswhere}
*   [&lt;addVariablesWhere>](#addvariableswhere) is an OPTIONAL tag within the &lt;dataset> tag for all EDDTable datasets.
    
    Requests to any EDDTable dataset can include &addVariablesWhere("*attributeName*","*attributeValue*"), which tells ERDDAP™ to add all of the variables in the dataset where *attributeName=attributeValue* to the list of requested variables. For example, if a user adds &addVariablesWhere("ioos\_category","Wind") to a query, ERDDAP will add all variables in the dataset that have an ioos\_category=Wind attribute to the list of requested variables (for example, windSpeed, windDirection, windGustSpeed). *attributeName* and *attributeValue* are case-sensitive.
    
    In datasets.xml, if the chunk of dataset.xml for a dataset has  
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
    for example,  
    ```
    <addVariablesWhere>ioos\_category,units<addVariablesWhere>  
    ```
    the Data Access Form (.html web page) for the dataset will include a widget (for each attributeName in the comma-separated list) right below the list of variables which lets users specify an attribute value. If the user selects an attribute value for one or more of the attribute names, they will be added to the request via &addVariablesWhere("*attributeName*","*attributeValue*"). Thus, this tag in datasets.xml lets you specify the list of attribute names which will appear on the Data Access Form for that dataset and makes it easy for users to add &addVariablesWhere functions to the request. The *attributeNamesCSV* list is case-sensitive.
    
#### &lt;altitudeMetersPerSourceUnit&gt; {#altitudemeterspersourceunit}
*   [**&lt;altitudeMetersPerSourceUnit>**](#altitudemeterspersourceunit) is an OPTIONAL tag within the &lt;dataset> tag in datasets.xxml for EDDTableFromSOS datasets (only!) that specifies a number which is multiplied by the source altitude or depth values to convert them into altitude values (in meters above sea level). For example,  
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
    This tag MUST be used if the dataset's vertical axis values aren't meters, positive=up. Otherwise, it is OPTIONAL, since the default value is 1. For example,
    *   If the source is already measured in meters above sea level, use 1 (or don't use this tag, since 1 is the default value).
    *   If the source is measured in meters below sea level, use -1.  
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    *   If the source is measured in km above sea level, use 0.001.  
         
#### &lt;defaultDataQuery&gt; {#defaultdataquery}
*   [**&lt;defaultDataQuery>**](#defaultdataquery) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml that tells ERDDAP™ to use the specified query (the part of the URL after the "?") if the .html fileType (the Data Access Form) is requested with no query.
    *   You will probably rarely need to use this.
    *   You need to XML-encode (not percent-encode) the default queries since they are in an XML document. For example, & becomes &amp; , &lt; becomes &lt; , > becomes &gt; .
    *   Please check your work. It is easy to make a mistake and not get what you want. ERDDAP™ will try to clean up your errors -- but don't rely on that, since \*how\* it is cleaned up may change.
    *   For griddap datasets, a common use of this is to specify a different default depth or altitude dimension value (for example, \[0\] instead of \[last\]).  
        In any case, you should always list all of the variables, always use the same dimension values for all variables, and almost always use \[0\], \[last\], or \[0:last\] for the dimension values.  
        For example:  
    ```
        <defaultDataQuery>u\[last\]\[0\]\[0:last\]\[0:last\],v\[last\]\[0\]\[0:last\]\[0:last\]</defaultDataQuery>
    ```
    *   For tabledap datasets, if you don't specify any constraint, the request will return the entire dataset, which may be impractically large, depending on the dataset. If you don't want to specify any constraints, rather than have an empty &lt;defaultDataQuery> (which is the same as not specifying a defaultDataQuery), you need to explicitly list all of the variables you want to include in the defaultDataQuery.
    *   For tabledap datasets, the most common use of this is to specify a different default time range (relative to max(time), for example, &time>=max(time)-1day, or relative to now, for example, &time>=now-1day ).  
        Remember that requesting no data variables is the same as specifying all data variables, so usually you can just specify the new time constraint.  
        For example:  
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
        or  
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt; {#defaultgraphquery}
*   [**&lt;defaultGraphQuery>**](#defaultgraphquery) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml that tells ERDDAP™ to use the specified query (the part of the URL after the "?") if the .graph fileType (the Make A Graph Form) is requested with no query.
    *   You will probably rarely need to use this.
    *   You need to XML-encode (not percent-encode) the default queries since they are in an XML document. For example, & becomes &amp; , &lt; becomes &lt; , > becomes &gt; .
    *   Please check your work. It is easy to make a mistake and not get what you want. ERDDAP™ will try to clean up your errors -- but don't rely on that, since \*how\* it is cleaned up may change.
    *   For griddap datasets, the most common use of this is to specify a different default depth or altitude dimension value (for example, \[0\] instead of \[last\]) and/or to specify that a specific variable be graphed.  
        In any case, you will almost always use \[0\], \[last\], or \[0:last\] for the dimension values.  
        For example:  
    ```
        <defaultGraphQuery>temp\[last\]\[0\]\[0:last\]\[0:last\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
        (but put it all on one line)
    *   For tabledap datasets, if you don't specify any constraint, the request will graph the entire dataset, which may take a long time, depending on the dataset.
    *   For tabledap datasets, the most common use of this is to specify a different default time range (relative to max(time), for example, &time>=max(time)-1day, or relative to now, for example, &time>=now-1day ).  
        Remember that requesting no data variables is the same as specifying all data variables, so usually you can just specify the new time constraint.  
        For example:  
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
        or  
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory&gt; {#dimensionvaluesinmemory}
*   [**&lt;dimensionValuesInMemory>**](#dimensionvaluesinmemory) (true (the default) or false) is an OPTIONAL and rarely used tag within the &lt;dataset> tag for any EDDGrid dataset that tells ERDDAP™ where to keep the source values of the dimensions (also known as the axisVariables):
    
    *   true = in memory (which is faster but uses more memory)
    *   false = on disk (which is slower but uses no memory)
    
    For example,  
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
    You should only use this with the non-default value of false if your ERDDAP™ has a lot of datasets with very large dimensions (e.g., millions of values, e.g., in EDDGridFromAudioFiles datasets) and ERDDAP's In Use memory usage is always too high. See the Memory: currently using line at \[yourDomain\]/erddap/status.html to monitor ERDDAP™ memory usage.  
     
#### &lt;fileTableInMemory&gt; {#filetableinmemory}
*   [**&lt;fileTableInMemory>**](#filetableinmemory) (true or false (the default)) is an OPTIONAL tag within the &lt;dataset> tag for any EDDGridFromFiles and EDDTableFromFiles dataset that tells ERDDAP™ where to keep the fileTable (which has information about each source data file):
    
    *   true = in memory (which is faster but uses more memory)
    *   false = on disk (which is slower but uses no memory)
    
    For example,  
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
    If you set this to true for any dataset, keep an eye on the Memory: currently using line at \[yourDomain\]/erddap/status.html to ensure that ERDDAP™ still has plenty of free memory.  
     
#### &lt;fgdcFile&gt; {#fgdcfile}
*   [**&lt;fgdcFile>**](#fgdcfile) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml that tells ERDDAP™ to use a pre-made FGDC file instead of having ERDDAP™ try to generate the file. Usage:  
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
    *fullFileName* can refer to a local file (somewhere on the server's file system) or the URL of a remote file.  
    If *fullFileName*\="" or the file isn't found, the dataset will have no FGDC metadata. So this is also useful if you want to suppress the FGDC metadata for a specific dataset.  
    Or, you can put &lt;fgdcActive>false&lt;/fgdcActive> in setup.xml to tell ERDDAP™ not to offer FGDC metadata for any dataset.  
     
#### &lt;iso19115File&gt; {#iso19115file}
*   [**&lt;iso19115File>**](#iso19115file) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml that tells ERDDAP™ to use a pre-made ISO 19115 file instead of having ERDDAP™ try to generate the file. Usage:  
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
    *fullFileName* can refer to a local file (somewhere on the server's file system) or the URL of a remote file.  
    If *fullFileName*\="" or the file isn't found, the dataset will have no ISO 19115 metadata. So this is also useful if you want to suppress the ISO 19115 metadata for a specific dataset.  
    Or, you can put &lt;iso19115Active>false&lt;/iso19115Active> in setup.xml to tell ERDDAP™ not to offer ISO 19115 metadata for any dataset.  
     
#### &lt;matchAxisNDigits&gt; {#matchaxisndigits}
*   [**&lt;matchAxisNDigits>**](#matchaxisndigits) is an OPTIONAL tag within an EDDGrid &lt;dataset> tag for EDDGrid datasets that are aggregations, e.g., aggregations of files. Each time the dataset is reloaded, ERDDAP™ checks that the axis values of each component of the aggregation are the same. The precision of the testing is determined by the [matchAxisNDigits](#matchaxisndigits), which specifies the total number of digits which must match when testing double precision axis values, 0 - 18 (the default). When testing float axis values, the test is done with matchAxisNDigits/2 digits. A value of 18 or above tells EDDGrid to do an exact test. A value of 0 tells EDDGrid not to do any testing, which is not recommended, except as described below.
    
    Although EDDGrid allows the components of the aggregation to have slightly different axis values, only one set of axis values is shown to the user. The set is from the same component that provides the dataset's source metadata. For example, for EDDGridFromFiles datasets, that is specified by the &lt;metadataFrom> setting (default=last).
    
    Use of matchAxisNDigits\=0 is strongly discouraged in most cases, because it turns off all checking. Even minimal checking is useful because it ensures that the components are suitable for aggregating. We all assume that all the components are suitable, but it isn't always so. This is thus an important sanity test. Even values of matchAxisNDigits1, 2, 3 or 4 are discouraged because the different axis values often indicate that the components were created (binned?) a different way and are thus not suitable for aggregation.
    
    There is one case where using matchAxisNDigits\=0 is useful and recommended: with aggregations of remote files, e.g., data in S3 buckets. In this case, if the dataset uses cacheFromUrl, cacheSizeGB, matchAxisNDigits\=0, and the EDDGridFromFiles system for [Aggregation via File Names](#aggregation-via-file-names-or-global-metadata), then EDDGrid doesn't have to read all of the remote files to do the aggregation. This allows datasets made from data in S3 buckets to load very quickly (as opposed to absurdly slowly if EDDGrid has to download and read all of the files).
    
#### &lt;nThreads&gt; {#nthreads}
*   Starting with ERDDAP™ version 2.00, when any subclass of EDDTableFromFiles or EDDGrid reads data from its source, it can read one chunk of data (e.g., one source file) at a time (in one thread) (that's the default) or more than one chunk of data (e.g., 2+ source files) at a time (in 2 or more threads) while processing each request.  
     
    *   Rule of Thumb:  
        For most datasets on most systems, use nThreads=1, the default. If you have a powerful computer (lots of CPU cores, lots of memory), then consider setting nThreads to 2, 3, 4, or higher (but never more than the number of CPU cores in the computer) for datasets that might benefit:
        
        *   Most EDDTableFromFiles datasets will benefit.
        *   Datasets where something causes a lag before a chunk of data can actually be processed will benefit, for example:
            *   Datasets with [externally-compressed (e.g., .gz)](#externally-compressed-files) binary (e.g., .nc) files, because ERDDAP™ has to decompress the whole file before it can start to read the file.
            *   Datasets that use [cacheSizeGB](#cachefromurl), because ERDDAP™ often has to download the file before it can read it.
            *   Datasets with data files stored on a high-bandwidth parallel file system, because it can deliver more data, faster, when requested. Examples of parallel file systems include [JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures), [pNFS](http://www.pnfs.com/), [GlusterFS](https://en.wikipedia.org/wiki/Gluster), Amazon S3, and Google Cloud Storage.  
                 
        
        Warning: When using nThreads>1, keep an eye on ERDDAP's memory use, thread use, and overall responsiveness (see [ERDDAP's status page](/docs/server-admin/additional-information#status-page)). See comments about these issues below.  
         
    *   For a given dataset, this nThreads setting can come from different places:
        
        *   If the datasets.xml chunk for a dataset has an &lt;nThreads> tag (within the &lt;dataset> tag, not as a global attribute) with a value >= 1, that value of nThreads is used. So, you can specify a different number for each dataset.
        *   Otherwise, if datasets.xml has an &lt;nTableThreads> tag (for EDDTableFromFiles datasets) or an &lt;nGridThreads> tag (for EDDGrid datasets) with a value >= 1, outside of a &lt;dataset> tag, that value of nThreads is used.
        *   Otherwise, 1 thread is used, which is a safe choice since it uses the smallest amount of memory.  
             
        
        For the [original ERDDAP™ installation](https://coastwatch.pfeg.noaa.gov/erddap/index.html), we use  
        &lt;nTableThreads>6&lt;/nTableThreads> (It's a powerful server.) Difficult requests now take 30% of the previous time.  
         
##### Monitor Resource Usage {#monitor-resource-usage}
When you are experimenting with different nThreads settings (and perhaps making difficult sample requests to your ERDDAP), you can monitor your computer's resource usage:
*   On Macs, use Finder : Applications : Utilities : Activity Monitor
*   On Linux, use top
*   On Windows 10, use *Ctrl + Shift + Esc* to open Task Manager  
             
##### Warning: Decreased Responsiveness {#warning-decreased-responsiveness}
In isolation, ERDDAP™ will fulfill a request to a dataset with a higher nThreads setting faster than if nThreads=1. But while that request is being processed, other requests from other users will be somewhat crowded out and get a slower response. Also, when ERDDAP™ responds to a given request, other computing resources (e.g., disk drive access, network bandwidth) may be limiting, especially with higher nThreads settings. Thus with higher nThreads settings, the overall system responsiveness will be worse when there are multiple requests being processed -- this can be very annoying to users! Because of this: never set nThreads to more than the number of CPU cores in the computer. nThreads=1 is the fairest setting since each request (among several simultaneous requests) will get an equal share of computing resources. But the more powerful the computer, the less this will be a problem.  
         
##### Warning: Higher Memory Use for EDDGrid Datasets {#warning-higher-memory-use-for-eddgrid-datasets}
Memory use while processing requests is directly proportional to the nThreads setting. A reasonably safe rule of thumb is: you need to set [ERDDAP's memory settings](/docs/server-admin/deploy-install#memory) to at least 2GB + (2GB \* nThreads). Some requests to some datasets will need more memory than that. For example, setting nThreads=3 for any EDDGrid dataset means that the -Xmx setting should be at least -Xmx8000M. If that memory setting is greater than 3/4 the physical memory of the computer, decrease the nThreads setting so that you can decrease the memory setting.

The memory use of threads processing requests to EDDTable datasets is almost always lower because the files are usually much smaller. However, if a given EDDTable dataset has huge (e.g., >=1 GB) data files, then the comments above will apply to those datasets as well.

Whatever the nThreads setting, keep a close eye on the memory usage statistics on your [ERDDAP's status page](/docs/server-admin/additional-information#status-page). You shouldn't ever come close to maxing out the memory usage in ERDDAP; otherwise there will be serious errors and failures.
        
##### Temporarily Set to 1 {#temporarily-set-to-1}
If current memory usage is even slightly high, ERDDAP™ will set nThreads for this request to 1. Thus, ERDDAP™ conserves memory when memory is scarce.  
         
##### Diminishing Returns {#diminishing-returns}
There are diminishing returns to increasing the nThreads setting: 2 threads will be way better than 1 (if we ignore dynamic overclocking). But 3 will be only a chunk better than 2. And 4 will be only marginally better than 3.

In one test of a difficult query to a large EDDTable dataset, the response time using 1, 2, 3, 4, 5, 6 threads was 38, 36, 20, 18, 13, 11 seconds. (We now use nTableThreads=6 on that server.)

nThreads=2: Although, there is often a significant benefit to specifying nThreads=2 instead of nThreads=1, it often won't make much difference in the clock time needed to respond to a given user's request. The reason is: with nThreads=1, most modern CPU's will often [dynamically overclock](https://en.wikipedia.org/wiki/Intel_Turbo_Boost) (turbo boost) to temporarily increase the clock speed of the CPU. Thus with nThreads=1, the one core will often be working at a higher clock speed than each of the two cores if you used nThreads=2. Regardless, we still think it is better to use nThreads=2 rather than nThreads=1, since that setting will yield better results in a wider variety of situations. And of course, if your computer has sufficient CPU cores, an even higher nThreads setting should yield better results.

As discussed above, very high nThreads settings may lead to faster responses to some requests, but the risk of overall decreased ERDDAP™ responsiveness and high memory use (as noted above) while those requests are being processed means it generally isn't a good idea.
        
##### CPU Cores {#cpu-cores}
You shouldn't ever set nThreads to a number larger than the number of CPU cores in the computer's CPU. Essentially all modern CPUs have multiple cores (e.g., 2, 4, or 8). Some computers even have multiple CPUs (e.g., 2 CPUs \* 4 cores/CPU = 8 CPU cores). To find out how many CPUs and cores a computer has:

*   On Macs, use *Option key* : Apple Menu : System Information
*   On Linux, use cat /proc/cpuinfo
*   On Windows 10, use *Ctrl + Shift + Esc* to open Task Manager : Performance (Logical processors shows the total number of CPU cores)

Yes, most processors these days say that they support 2 threads per core (via [hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading)), but the 2 threads share computing resources, so you won't see twice the throughput on a CPU under heavy load. For example, a computer with one CPU with 4 cores may claim to support up to 8 threads, but you should never exceed nThreads=4 in that ERDDAP. Remember that:

*   The nThreads setting in ERDDAP™ is per request. ERDDAP™ often handles multiple requests simultaneously.
*   ERDDAP™ does things other than process requests, e.g., reload datasets.
*   When ERDDAP™ responds to a given request, other computing resources (e.g., disk drive access, network bandwidth) may be limiting. The higher you set nThreads, the more likely that these other resources will be maxed out and will slow down ERDDAP's general responsiveness.
*   The operating system does things other than run ERDDAP.

So it is best not to set the nThreads setting to more than the number of cores in the computer's CPU.  
         
##### Your Mileage May Vary (YMMV) {#your-mileage-may-vary-ymmv}
The results of different nThreads settings will vary greatly for different requests to different datasets on different systems. If you really want to know the effect of different nThreads settings, run realistic tests.  
         
##### Why nThreads per request? {#why-nthreads-per-request}
I can hear some of you thinking "Why is nThreads per request? If I were coding this, I would use one permanent worker thread pool and a messaging queue for better performance." The problem with using one worker thread pool and a messaging queue is that one difficult request would flood the queue with numerous slow tasks. That would effectively block ERDDAP™ from even starting work on tasks related to other requests until the initial request was (essentially) finished. Thus, even simple subsequent requests would respond super slowly. ERDDAP's use of nThreads per request leads to a much fairer use of computing resources.  
         
##### nThreads vs. Multiple Worker Computers {#nthreads-vs-multiple-worker-computers}
Unfortunately, ERDDAP's nThreads system will never be as effective as true parallelizing via multiple worker computers, with each working on a chunk of data, in the way that Hadoop or Apache Spark are usually used. When the task is truly parallelized/distributed to multiple computers, each computer can use all of its resources on its part of the task. With ERDDAP's nThreads system, each of the threads is competing for the same computer's bandwidth, disk drives, memory, etc. Unfortunately, most of us don't have the resources or funds to set up or even rent (on Amazon Web Services (AWS) or Google Cloud Platform (GCP)) massive grids of computers. Also, unlike a relational database which is allowed to return the result rows in any order, ERDDAP™ makes a promise to return the result rows in a consistent order. This constraint makes ERDDAP's nThreads implementation less efficient. But ERDDAP's nThreads is useful in many cases.

However, there are ways to make ERDDAP™ scale to handle a huge number of requests quickly by setting up a [grid/cluster/federation of ERDDAPs](/docs/server-admin/scaling).  
         
#### &lt;palettes&gt; {#palettes}
*   Starting with ERDDAP™ version 2.12, datasets.xml can include a &lt;palettes> tag (within &lt;erddapDatasets>) which overrides the &lt;palettes> tag value from messages.xml (or reverts to the messages.xml value if the tag in datasets.xml is empty). This lets you change the list of available palettes while ERDDAP™ is running. It also lets you make a change and have it persist when you install a new version of ERDDAP.  
    WARNING: The palettes listed in datasets.xml must be a superset of the palettes listed in messages.xml; otherwise ERDDAP™ will throw an exception and stop processing datasets.xml. This ensures that all ERDDAP™ installations at least support the same core palettes.  
    WARNING: ERDDAP™ checks that the palettes files specified in messages.xml actually exist, but it doesn't check the palette files listed in datasets.xml. It's your responsibility to ensure the files are present.
    
    Also starting with ERDDAP™ version 2.12, if you make a cptfiles subdirectory in the ERDDAP™ content directory, ERDDAP™ will copy all the \*.cpt files in that directory into the \[tomcat\]/webapps/erddap/WEB-INF/cptfiles directory each time ERDDAP™ starts up. Thus, if you put custom cpt files in that directory, those files will be used by ERDDAP™, with no extra effort on your part, even when you install a new version of ERDDAP.
    
    WARNING: If you add custom palettes to your ERDDAP™ and you have EDDGridFromErddap and/or EDDTableFromErddap datasets in your ERDDAP™, then users will see your custom palette options on the ERDDAP™ Make A Graph web pages, but if the user tries to use them, they'll get a graph with the default (usually Rainbow) palette. This is because the image is made by the remote ERDDAP™ which doesn't have the custom palette. The only solutions now are to email the remote ERDDAP™ administrator to add your custom palettes to his/her ERDDAP or email Chris.John at noaa.gov to ask that the palettes be added to the standard ERDDAP™ distribution.
    
#### &lt;onChange&gt; {#onchange}
*   [**&lt;onChange>**](#onchange) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml that specifies an action which will be done when this dataset is created (when ERDDAP™ is restarted) and whenever this dataset changes in any way.
    *   Currently, for EDDGrid subclasses, any change to metadata or to an axis variable (for example, a new time point for near-real-time data) is considered a change, but a reloading of the dataset is not considered a change (by itself).
    *   Currently, for EDDTable subclasses, any reloading of the dataset is considered a change.
    *   Currently, only two types of actions are allowed:
        *   "http://" or "https://" -- If the action starts with "http://" or "https://", ERDDAP™ will send an HTTP GET request to the specified URL. The response will be ignored. For example, the URL might tell some other web service to do something.
            *   If the URL has a query part (after the "?"), it MUST be already [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding). You need to encode special characters in the constraints (other than the initial '&' and the main '=' in constraints) into the form %HH, where HH is the 2 digit hexadecimal value of the character. Usually, you just need to convert a few of the punctuation characters: % into %25, & into %26, " into %22, &lt; into %3C, = into %3D, > into %3E, + into %2B, | into %7C, \[ into %5B, \] into %5D, space into %20, and convert all characters above #127 into their UTF-8 form and then percent encode each byte of the UTF-8 form into the %HH format (ask a programmer for help).  
                For example, &stationID>="41004"  
                becomes       &stationID%3E=%2241004%22  
                Percent encoding is generally required when you access ERDDAP via software other than a browser. Browsers usually handle percent encoding for you.  
                In some situations, you need to percent encode all characters other than A-Za-z0-9\_-!.~'()\*, but still don't encode the initial '&' or the main '=' in constraints.  
                Programming languages have tools to do this (for example, see Java's [java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html) and JavaScript's [encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)) and there are  
                [websites that percent encode/decode for you](https://www.url-encode-decode.com/).
            *   Since datasets.xml is an XML file, you MUST also &-encode ALL '&', '&lt;', and '>' in the URL as '&amp;', '&lt;', and '&gt;' after percent encoding.
            *   Example: For a URL that you might type into a browser as:  
                https://www.company.com/webService?department=R%26D&param2=value2  
                You should specify an &lt;onChange> tag via (on one line)
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        *   mailto: -- If the action starts with "mailto:", ERDDAP™ will send an email to the subsequent email address indicating that the dataset has been updated/changed.  
            For example: &lt;onChange>mailto:john.smith@company.com&lt;/onChange>If you have a good reason for ERDDAP™ to support some other type of action, send us an email describing what you want.
    *   This tag is OPTIONAL. There can be as many of these tags as you want. Use one of these tags for each action to be performed.
    *   This is analogous to ERDDAP's email/URL subscription system, but these actions aren't stored persistently (i.e., they are only stored in an EDD object).
    *   To remove a subscription, just remove the &lt;onChange> tag. The change will be noted the next time the dataset is reloaded.  
         
#### &lt;reloadEveryNMinutes&gt; {#reloadeverynminutes}
*   [**&lt;reloadEveryNMinutes>**](#reloadeverynminutes) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml of almost all dataset types that specifies how often the dataset should be reloaded. For example,  
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    *   Generally, datasets that change frequently (for example, get new data files) should be reloaded frequently, for example, every 60 minutes.
    *   Datasets that change infrequently should be reloaded infrequently, for example, every 1440 minutes (daily) or 10080 minutes (weekly).
    *   This tag is OPTIONAL, but recommended. The default is 10080.
    *   An example is: &lt;reloadEveryNMinutes>1440&lt;/reloadEveryNMinutes>
    *   When a dataset is reloaded, all files in the *bigParentDirectory*/cache/*datasetID* directory are deleted.
    *   No matter what this is set to, a dataset won't be loaded more frequently than &lt;loadDatasetsMinMinutes> (default = 15), as specified in [setup.xml](/docs/server-admin/deploy-install#setupxml). So if you want datasets to be reloaded very frequently, you need to set both reloadEveryNMinutes and loadDatasetsMinMinutes to small values.
    *   Don't set reloadEveryNMinutes to the same value as loadDatasetsMinMinutes, because the elapsed time is likely to be (for example) 14:58 or 15:02, so the dataset will only be reloaded in about half of the major reloads. Instead, use a smaller (for example, 10) or larger (for example, 20) reloadEveryNMinutes value.
    *   Regardless of reloadEveryNMinutes, you can manually tell ERDDAP™ to reload a specific dataset as soon as possible via a [flag file](/docs/server-admin/additional-information#flag).
    *   For Curious Programmers -- In ERDDAP™, the reloading of all datasets is handled by two single purpose threads. One thread initiates a minor reload if it finds a flag file or a major reload (which checks all datasets to see if they need to be reloaded). The other thread does the actual reload of the datasets one at a time. These threads work in the background ensuring that all datasets are kept up-to-date. The thread which actually does the reloads prepares a new version of a dataset then swaps it into place (essentially replacing the old version atomically). So it is very possible that the following sequence of events occurs (it's a good thing):
        
        1.  ERDDAP™ starts reloading a dataset (making a new version) in the background.
        2.  User 'A' makes a request to the dataset. ERDDAP™ uses the current version of the dataset to create the response. (That is good. There was no delay for the user, and the current version of the dataset should never be very stale.)
        3.  ERDDAP™ finishes creating the new reloaded version of the dataset and swaps that new version into production. All subsequent new requests are handled by the new version of the dataset. For consistency, user A's request is still being filled by the original version.
        4.  User 'B' makes a request to the dataset and ERDDAP™ uses the new version of the dataset to create the response.
        5.  Eventually user A's and user B's requests are completed (perhaps A's finishes first, perhaps B's finishes first).
        
        I can hear someone saying, "Just two thredds! Ha! That's lame! He should set that up so that reloading of datasets uses as many threads as are needed, so it all gets done faster and with little or no lag." Yes and no. The problem is that loading more than one dataset at a time creates several hard new problems. They all need to be solved or dealt with. The current system works well and has manageable problems (for example, potential for lag before a flag is noticed). (If you need help managing them, see our [section on getting additional support](/docs/intro#support).) The related [updateEveryNMillis](#updateeverynmillis). system works within response threads, so it can and does lead to multiple datasets being updated (not the full reload) simultaneously.
##### Proactive vs. Reactive {#proactive-vs-reactive}
ERDDAP's reload system is proactive -- datasets are reloaded soon after their reloadEveryNMinutes time is up (i.e., they become "stale", but never very stale), whether the dataset is getting requests from users or not. So ERDDAP™ datasets are always up-to-date and ready for use. This is in contrast to THREDDS' reactive approach: a user's request is what tells THREDDS to check if a dataset is stale (it may be very stale). If it is stale, THREDDS makes the user wait (often for a few minutes) while the dataset is reloaded.
        
#### &lt;updateEveryNMillis&gt; {#updateeverynmillis}
*   [**&lt;updateEveryNMillis>**](#updateeverynmillis) is an OPTIONAL tag within a &lt;dataset> tag in datasets.xml of some dataset types that helps ERDDAP™ work with datasets that change very frequently (as often as roughly every second). Unlike ERDDAP's regular, proactive, [&lt;reloadEveryNMinutes>](#reloadeverynminutes) system for completely reloading each dataset, this OPTIONAL additional system is reactive (triggered by a user request) and quicker because it is incremental (just updating the information that needs to be updated). For example, if a request to an EDDGridFromDap dataset occurs more than the specified number of milliseconds since the last update, ERDDAP™ will see if there are any new values for the leftmost (first, usually "time") dimension and, if so, just download those new values before handling the user's request. This system is very good at keeping a rapidly changing dataset up-to-date with minimal demands on the data source, but at the cost of slightly slowing down the processing of some user requests.
    *   To use this system, add (for example):  
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
        right after the &lt;reloadEveryNMinutes> tag for the dataset in datasets.xml. The number of milliseconds that you specify can be as small as 1 (to ensure that the dataset is always up-to-date). A value of 0 (the default) or a negative number turns off the system.
    *   Due to their incremental nature, updates should finish very quickly, so users should never have to wait a long time.
    *   If a second data request arrives before the previous update has finished, the second request won't trigger another update.
    *   Throughout the documentation, we will try to use the word "reload" for regular, full dataset reloads, and "update" for these new incremental, partial updates.
    *   For testing purposes, some diagnostics are printed to log.txt if [&lt;logLevel>](#loglevel) in datasets.xml is set to "all".
    *   If you use incremental updates and especially if the leftmost (first), for example, time, axis is large, you may want to set &lt;reloadEveryNMinutes> to a larger number (1440?), so that updates do most of the work to keep the dataset up-to-date, and full reloads are done infrequently.
    *   Note: this new update system updates metadata (for example, time actual\_range, time\_coverage\_end, ...) but doesn't trigger onChange (email or touch URL) or change the RSS feed (perhaps it should...).
    *   For all datasets that use subclasses of [EDDGridFromFiles](#eddgridfromfiles) and [EDDTableFromFiles](#eddtablefromfiles):
        *   **WARNING:** when you add a new data file to a dataset by copying it into the directory that ERDDAP™ looks at, there is a danger that ERDDAP™ will notice the partially written file; try to read it, but fail because the file is incomplete; declare the file to be a "bad" file and remove it (temporarily) from the dataset.  
            To avoid this, we **STRONGLY RECOMMEND** that you copy a new file into the directory with a temporary name (for example, 20150226.ncTmp) that doesn't match the datasets fileNameRegex (\*\\.nc), then rename the file to the correct name (for example, 20150226.nc). If you use this approach, ERDDAP™ will ignore the temporary file and only notice the correctly named file when it is complete and ready to be used.
        *   If you modify existing datafiles in place (for example, to add a new data point), &lt;updateEveryNMillis> will work well if the changes appear atomically (in an instant) and the file is always a valid file. For example, the netcdf-java library allows for additions to the unlimited dimension of a "classic" .nc v3 file to be made atomically.  
            &lt;updateEveryNMillis> will work badly if the file is invalid while the changes are being made.
        *   &lt;updateEveryNMillis> will work well for datasets where one or a few files change in a short amount of time.
        *   &lt;updateEveryNMillis> will work poorly for datasets where a large number of files change in a short amount of time (unless the changes appear atomically). For these datasets, it is better to not use &lt;updateEveryNMillis> and to set a [flag](/docs/server-admin/additional-information#set-dataset-flag) to tell ERDDAP™ to reload the dataset.
        *   &lt;updateEveryNMillis> does not update the information associated with the [&lt;subsetVariables>](#subsetvariables). Normally, this is not a problem, because the subsetVariables have information about things that don't change very often (for example, the list of station names, latitudes, and longitudes). If the subsetVariables data changes (for example, when a new station is added to the dataset), then contact the [flag URL](/docs/server-admin/additional-information#set-dataset-flag) for the dataset to tell ERDDAP™ to reload the dataset. Otherwise, ERDDAP™ won't notice the new subsetVariable information until the next time the dataset is reloaded (&lt;reloadEveryNMinutes>).
        *   Our generic recommendation is to use:  
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        *   TROUBLE? On Linux computers, if you are using &lt;updateEveryNMillis> with EDDGridFromFiles or EDDTableFromFiles classes, you may see a problem where a dataset fails to load (occasionally or consistently) with the error message: "IOException: User limit of inotify instances reached or too many open files". The cause may be a bug in Java which causes inotify instances to be not garbage collected. This problem is avoided in ERDDAP™ v1.66 and higher. So the best solution is to switch the latest version of ERDDAP.  
            If that doesn't solve the problem (that is, if you have a really large number of datasets using &lt;updateEveryNMillis>), you can fix this problem by calling:  
            ```
            sudo sysctl fs.inotify.max\_user\_watches=65536  
            sudo sysctl fs.inotify.max\_user\_instances=1024  
            sudo sysctl -p  
            ```
            Or, use higher numbers if the problem persists. The default for watches is 8192. The default for instances is 128.
    *   You can put &lt;updateMaxEvents>10&lt;/updateMaxEvents> in datasets.xml (in with the other settings near the top) to change the maximum number of file changes (default=10) that will be processed by the updateEveryNMillis system. A larger number may be useful for dataset where it is very important that they be kept always up-to-date. See the [updateMaxEvents documentation](#updatemaxevents).
    *   For Curious Programmers -- these incremental updates, unlike ERDDAP's full [reloadEveryNMinutes](#reloadeverynminutes) system, occur within user request threads. So, any number of datasets can be updating simultaneously. There is code (and a lock) to ensure that only one thread is working on an update for any given dataset at any given moment. Allowing multiple simultaneous updates was easy; allowing multiple simultaneous full reloads would be harder.  
         
#### &lt;sourceCanConstrainStringEQNE&gt; {#sourcecanconstrainstringeqne}
*   [**&lt;sourceCanConstrainStringEQNE>**](#sourcecanconstrainstringeqne) is an OPTIONAL tag within an EDDTable &lt;dataset> tag in datasets.xml that specifies if the source can constrain String variables with the = and != operators.
    *   For EDDTableFromDapSequence, this applies to the outer sequence String variables only. It is assumed that the source can't handle any constraints on inner sequence variables.
    *   This tag is OPTIONAL. Valid values are true (the default) and false.
    *   For EDDTableFromDapSequence OPeNDAP DRDS servers, this should be set to true (the default).
    *   For EDDTableFromDapSequence Dapper servers, this should be set to false.
    *   An example is:  
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt; {#sourcecanconstrainstringgtlt}
*   [**&lt;sourceCanConstrainStringGTLT>**](#sourcecanconstrainstringgtlt) is an OPTIONAL tag within an EDDTable &lt;dataset> tag that specifies if the source can constrain String variables with the &lt;, &lt;=, >, and >= operators.
    *   For EDDTableFromDapSequence, this applies to the outer sequence String variables only. It is assumed that the source can't handle any constraints on inner sequence variables.
    *   Valid values are true (the default) and false.
    *   This tag is OPTIONAL. The default is true.
    *   For EDDTableFromDapSequence OPeNDAP DRDS servers, this should be set to true (the default).
    *   For EDDTableFromDapSequence Dapper servers, this should be set to false.
    *   An example is:  
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex&gt; {#sourcecanconstrainstringregex}
*   [**&lt;sourceCanConstrainStringRegex>**](#sourcecanconstrainstringregex) is an OPTIONAL tag within an EDDTable &lt;dataset> tag that specifies if the source can constrain String variables by regular expressions, and if so, what the operator is.
    *   Valid values are "=~" (the DAP standard), "~=" (mistakenly supported by many DAP servers), or "" (indicating that the source doesn't support regular expressions).
    *   This tag is OPTIONAL. The default is "".
    *   For EDDTableFromDapSequence OPeNDAP DRDS servers, this should be set to "" (the default).
    *   For EDDTableFromDapSequence Dapper servers, this should be set to "" (the default).
    *   An example is:  
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct&gt; {#sourcecandodistinct}
*   [**&lt;sourceCanDoDistinct>**](#sourcecandodistinct) is an OPTIONAL tag within an EDDTableFromDatabase &lt;dataset> tag that specifies if the source database should handle &distinct() constraints in user queries.
    *   This tag is OPTIONAL. Valid values are no (ERDDAP™ handles distinct; the default), partial (the source handles distinct and ERDDAP™ handles it again), and yes (the source handles distinct).
    *   If you are using no and ERDDAP™ is running out of memory when handling distinct, use yes.
    *   If you are using yes and the source database handles distinct too slowly, use no.
    *   partial gives you the worst of both: it is slow because the database handling of distinct is slow and it may run out of memory in ERDDAP.
    *   Databases interpret DISTINCT as a request for just unique rows of results, whereas ERDDAP™ interprets it as a request for a sorted list of unique rows of results. If you set this to partial or yes, ERDDAP™ automatically also tells the database to sort the results.
    *   One small difference in the results:  
        With no|partial, ERDDAP™ will sort "" at the start of the results (before non-"" strings).  
        With yes, the database may (Postgres will) sort "" at the end of the results (after non-"" strings).  
        I will guess that this will also affect the sorting of short words versus longer words that start with the short word. For example, ERDDAP™ will sort "Simon" before "Simons".
    *   An example is:  
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy&gt; {#sourcecanorderby}
*   [**&lt;sourceCanOrderBy>**](#sourcecanorderby) is an OPTIONAL tag within an EDDTableFromDatabase &lt;dataset> tag that specifies if the source database should handle &orderBy(...) constraints in user queries.
    *   This tag is OPTIONAL. Valid values are no (ERDDAP™ handles orderBy(...); the default), partial (the source handles orderBy and ERDDAP™ handles it again), and yes (the source handles orderBy(...)).
    *   If you are using no and ERDDAP™ is running out of memory when handling orderBy(...), use yes.
    *   If you are using yes and the source database handles orderBy(...) too slowly, use no.
    *   partial gives you the worst of both: it is slow because the database handling of orderBy(...) is slow and it may run out of memory in ERDDAP.
    *   One small difference in the results:  
        With no|partial, ERDDAP™ will sort "" at the start of the results (before non-"" strings).  
        With yes, the database may (Postgres will) sort "" at the end of the results (after non-"" strings).  
        This may also affect the sorting of short words versus longer words that start with the short word. For example, ERDDAP™ will sort "Simon" before "Simons", but I'm not sure about how a database will sort them.
    *   An example is:  
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\_EQ&gt; {#sourceneedsexpandedfp_eq}
*   [**&lt;sourceNeedsExpandedFP\_EQ>**](#sourceneedsexpandedfp_eq) is an OPTIONAL tag within an EDDTable &lt;dataset> tag that specifies (true (the default) or false) if the source needs help with queries with &lt;numericVariable>=&lt;floatingPointValue> (and !=, >=, &lt;=). For example,  
    ```
    <sourceNeedsExpandedFP\_EQ>false</sourceNeedsExpandedFP\_EQ>
    ```
    *   For some data sources, numeric queries involving =, !=, &lt;=, or >= may not work as desired with floating point numbers. For example, a search for longitude=220.2 may fail if the value is stored as 220.20000000000001.
    *   This problem arises because floating point numbers are [not represented exactly within computers](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    *   If sourceNeedsExpandedFP\_EQ is set to true (the default), ERDDAP™ modifies the queries sent to the data source to avoid this problem. It is always safe and fine to leave this set to true.  
         
#### &lt;sourceUrl&gt; {#sourceurl}
*   [**&lt;sourceUrl>**](#sourceurl) is a common tag within a dataset's global &lt;addAttributes> tag that specifies the URL that is the source of the data.
    *   An example is:  
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
        (but put it all on one line)
    *   In ERDDAP™, all datasets will have a "sourceUrl" in the combined global attributes which are shown to the users.
    *   For most dataset types, this tag is REQUIRED. See the dataset type's description to find out if this is REQUIRED or not.
    *   For some datasets, the separate &lt;sourceUrl> tag is not allowed. Instead, you must provide a "sourceUrl" [global attribute](#global-attributes), usually in the global \>addAttributes&lt;. If there is no actual source URL (for example, if the data is stored in local files), this attribute often just has a placeholder value, for example, &lt;att name="name">(local files)&lt;/att> .
    *   For most datasets, this is the base of the URL that is used to request data. For example, for DAP servers, this is the URL to which .dods, .das, .dds, or .html could be added.
    *   Since datasets.xml is an XML file, you MUST also encode '&', '&lt;', and '>' in the URL as '&amp;', '&lt;', and '&gt;'.
    *   For most dataset types, ERDDAP™ adds the original sourceUrl (the "localSourceUrl" in the source code) to the [global attributes](#global-attributes) (where it becomes the "publicSourceUrl" in the source code). When the data source is local files, ERDDAP™ adds sourceUrl="(local files)" to the global attributes as a security precaution. When the data source is a database, ERDDAP™ adds sourceUrl="(source database)" to the global attributes as a security precaution. If some of your datasets use non-public sourceUrl's (usually because their computer is in your DMZ or on a local LAN) you can use [&lt;convertToPublicSourceUrl>](#converttopublicsourceurl) tags to specify how to convert the local sourceUrls to public sourceUrls.
    *   A sourceUrl may begin with http://, https://, ftp://, and perhaps other prefixes. https connections read and check the source's digital certificate to ensure that the source is who they say they are. In rare cases, this check may fail with the error "javax.net.ssl.SSLProtocolException: handshake alert: unrecognized\_name". This is probably due to the domain name on the certificate not matching the domain name that you are using. You can and should read the details of the sourceUrl's certificate in your web browser, notably, the list of "DNS Name"s in the "Subject Alternative Name" section.
        
        In some cases, the sourceUrl you are using may be an alias of the domain name on the certificate. For example,  
        https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ will throw this error, but  
        https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , which uses the domain name on the certificate, won't. The solution in these cases is therefore to find and use the domain name on the certificate. If you can't find it on the certificate, contact the data provider.
        
        In other cases, the domain name on the certificate may be for a group of names. If this occurs or the problem is otherwise unsolvable, please email Chris.John at noaa.gov to report the problem.  
         

#### &lt;addAttributes&gt; {#addattributes}
*   [**&lt;addAttributes>**](#addattributes) is an OPTIONAL tag for each dataset and for each variable which lets ERDDAP administrators control the metadata attributes associated with a dataset and its variables.
    *   ERDDAP™ combines the attributes from the dataset's source ("sourceAttributes") and the "addAttributes" which you define in datasets.xml (which have priority) to make the "combinedAttributes", which are what ERDDAP™ users see. Thus, you can use addAttributes to redefine the values of sourceAttributes, add new attributes, or remove attributes.
    *   The &lt;addAttributes> tag encloses 0 or more **&lt;att>** subtags, which are used to specify individual attributes.
    *   Each attribute consists of a name and a value (which has a specific data type, for example, double).
    *   There can be only one attribute with a given name. If there are more, the last one has priority.
    *   The value can be a single value or a space-separated list of values.
    *   Syntax
        *   The order of the &lt;att> subtags within addAttributes is not important.
        *   The &lt;att> subtag format is  
        ```
            <att name="*name*" \[type="*type*"\] >*value*</att>
        ```
        *   The destination name of all attributes MUST start with a letter (A-Z, a-z) and MUST contain only the characters A-Z, a-z, 0-9, or '\_'.
        *   If an &lt;att> subtag has no value or a value of null, that attribute will be removed from the combined attributes.  
            For example, &lt;att name="rows" /> will remove rows from the combined attributes.  
            For example, &lt;att name="coordinates">null&lt;/att> will remove coordinates from the combined attributes.
##### attributeType {#attributetype}
*   [The OPTIONAL type value for &lt;att> subtags](#attributetype) indicates the data type for the values. The default type is String. An example of a String attribute is:  
    ```
    <att name="creator\_name">NASA/GSFC OBPG</att>
    ```
    *   Valid types for single values are byte (8-bit integer), short (16-bit signed integer), int (32-bit signed integer), long (64-bit signed integer), float (32-bit floating point), double (64-bit floating point), char, and String. For example,  
        ```
        <att name="scale\_factor" type="float">0.1</att>
        ```
        See these notes about the [char data type](#char).  
        See these notes about the [long data type](#long).
        
    *   Valid types for space-separated lists of values (or single values) are byteList, shortList, unsignedShortList, charList, intList, longList, floatList, doubleList. For example,  
        ```
        <att name="actual\_range" type="doubleList">10.34 23.91</att>  
        ```
        An unsignedShortList lets you specify a list of unsigned shorts, but they will be converted into a list of the corresponding Unicode characters (e.g., "65 67 69" will be converted into "A C E".  
        If you specify a charList, encode any special characters (e.g., space, double quotes, backslash, &lt;#32, or >#127) as you would encode them in the data section of an NCCSV file (e.g., " ", "\\"" or """", "\\\\", "\\n", "\\u20ac").  
        There is no stringList. Store the String values as a multi-line String. For example,  
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Global Attributes {#global-attributes}
*   [**Global Attributes / Global &lt;addAttributes>**](#global-attributes) --  
    &lt;addAttributes> is an OPTIONAL tag within the &lt;dataset> tag which is used to change attributes that apply to the entire dataset.
    
    *   **Use the global &lt;addAttributes> to change the dataset's global attributes.** ERDDAP™ combines the global attributes from the dataset's source (**sourceAttributes**) and the global **addAttributes** which you define in datasets.xml (which have priority) to make the global **combinedAttributes**, which are what ERDDAP™ users see. Thus, you can use addAttributes to redefine the values of sourceAttributes, add new attributes, or remove attributes.
    *   See the [**&lt;addAttributes>** information](#addattributes) which applies to global and variable **&lt;addAttributes>**.
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html) and [ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata) Metadata -- Normally, ERDDAP™ will automatically generate ISO 19115-2/19139 and FGDC (FGDC-STD-001-1998) XML metadata files for each dataset using information from the dataset's metadata. So, **good dataset metadata leads to good ERDDAP-generated ISO 19115 and FGDC metadata. Please consider putting lots of time and effort into improving your datasets' metadata (which is a good thing to do anyway).** Most of the dataset metadata attributes which are used to generate the ISO 19115 and FGDC metadata are from the [ACDD metadata standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) and are so noted below.
    *   Many global attributes are special in that ERDDAP™ looks for them and uses them in various ways. For example, a link to the infoUrl is included on web pages with lists of datasets, and other places, so that users can find out more about the dataset.
    *   When a user selects a subset of data, globalAttributes related to the variable's longitude, latitude, altitude (or depth), and time ranges (for example, Southernmost\_Northing, Northernmost\_Northing, time\_coverage\_start, time\_coverage\_end) are automatically generated or updated.
    *   A simple sample global &lt;addAttributes> is:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\_ssta\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\_version" />
        </addAttributes>  
        ```
        The empty cwhdf\_version attribute causes the source cwhdf\_version attribute (if any) to be removed from the final, combined list of attributes.
    *   Supplying this information helps ERDDAP™ do a better job and helps users understand the datasets.  
        Good metadata makes a dataset usable.  
        Insufficient metadata makes a dataset useless.  
        Please take the time to do a good job with metadata attributes.
##### Special global attributes in ERDDAP™
###### acknowledgement {#acknowledgement}
*   [**acknowledgement**](#acknowledgement) and **acknowledgment** (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a RECOMMENDED way to acknowledge the group or groups that provided support (notably, financial) for the project that created this data. For example,  
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
    Note that ACDD 1.0 and 1.1 used the spelling "acknowledgment" (which is the usual spelling in the U.S.), but ACDD 1.3 changed this to "acknowledgement" (which is the usual spelling in the U.K.). My understanding is that the change was essentially an accident and that they certainly didn't recognize the ramifications of the change. What a mess! Now there are millions of data files around the world that have "acknowledgment" and millions that have "acknowledgement". This highlights the folly of "simple" changes to a standard, and emphasizes the need for stability in standards. Because ACDD 1.3 (which is the version of ACDD that ERDDAP™ supports) says "acknowledgement", that is what ERDDAP™ (notably GenerateDatasetsXml) encourages.  
     
###### cdm\_altitude\_proxy {#cdm_altitude_proxy}
*   [**cdm\_altitude\_proxy**](#cdm_altitude_proxy) is just for EDDTable datasets that don't have an altitude or depth variable but do have a variable that is a proxy for altitude or depth (for example, pressure, sigma, bottleNumber), you may use this attribute to identify that variable. For example,  
    ```
    <att name="cdm\_altitude\_proxy">pressure</att>  
    ```
    If the [cdm\_data\_type](#cdm_data_type) is Profile or TrajectoryProfile and there is no altitude or depth variable, cdm\_altitude\_proxy MUST be defined. If cdm\_altitude\_proxy is defined, ERDDAP™ will add the following metadata to the variable: \_CoordinateAxisType=Height and axis=Z.  
     
###### cdm\_data\_type {#cdm_data_type}
*   [**cdm\_data\_type**](#cdm_data_type) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a global attribute that indicates the Unidata [Common Data Model](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html) data type for the dataset. For example,  
    ```
    <att name="cdm\_data\_type">Point</att>  
    ```
    The CDM is still evolving and may change again. ERDDAP™ complies with the related and more detailed [Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) chapter of the [CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata conventions (previously called the CF Point Observation Conventions).
    *   Either the dataset's global [sourceAttributes](#global-attributes) or its global &lt;addAttributes> MUST include the cdm\_data\_type attribute. A few dataset types (like EDDTableFromObis) will set this automatically.
    *   For EDDGrid datasets, the cdm\_data\_type options are Grid (the default and by far the most common type for EDDGrid datasets), MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory, and TrajectoryProfile. Currently, EDDGrid does not require that any related metadata be specified, nor does it check that the data matches the cdm\_data\_type. That will probably change in the near future.
    *   EDDTable uses cdm\_data\_type in a rigorous way, following CF's DSG specification rather than CDM, which for some reason hasn't been updated to be consistent with DSG. If a dataset's metadata doesn't comply with the ERDDAP's cdm\_data\_type's requirements (see below), the dataset will fail to load and will generate an [error message](#troubleshooting-tips). (That's a good thing, in the sense that the error message will tell you what is wrong so that you can fix it.) And if the dataset's data doesn't match the dataset's metadata setup (e.g., if there is more than one latitude value for a given station in a timeseries dataset), some requests for data will return incorrect data in the response. So make sure you get all of this right.
        
        For all of these datasets, in the Conventions and Metadata\_Conventions global attributes, please refer to CF-1.6 (not CF-1.0, 1.1, 1.2, 1.3, 1.4, or 1.5), since CF-1.6 is the first version to include the changes related to Discrete Sampling Geometry (DSG) conventions.
        *  **ERDDAP™ has a not-simple relationship to CF DSG**
        *   ERDDAP™ can make a valid DSG dataset out of a source dataset that is already a valid DSG file(s), or out of a source dataset that isn't set up for DSG but can be made so via changes to metadata (some of which are ERDDAP-specific in order to provide a more general approach to specifying the DSG setup).
        *   ERDDAP™ does a lot of validity tests when it loads a dataset. If the dataset that has a cdm\_data\_type (or featureType) attribute successfully loads in ERDDAP™, then ERDDAP™ is saying the dataset meets the DSG requirements (otherwise, ERDDAP™ will throw an exception explaining the first problem that it found).  
            WARNING: A successfully-loaded dataset appears to meet the DSG requirements (it has the right combination of attributes), but still may be incorrectly set up, leading to incorrect results in .ncCF and .ncCFMA response files. (Software is smart in some ways and clueless in others.)
        *   When you look at the dataset's metadata in ERDDAP™, the DSG dataset appears to be in ERDDAP's internal format (a giant, database-like table). It isn't in one of the DSG formats (e.g., the dimensions and metadata aren't right), but the information needed to treat the dataset as a DSG dataset is in the metadata (for example, cdm\_data\_type=TimeSeries and cdm\_timeseries\_variables=*aCsvListOfStationRelatedVarables* in the global metadata and cf\_role=timeseries\_id for some variable).
        *   If a user requests a subset of the dataset in a .ncCF (an .nc file in DSG's Contiguous Ragged Array file format) or .ncCFMA file (a .nc file in DSG's Multidimensional Array file format), that file will be a valid CF DSG file.  
            WARNING: However, if the dataset was set up incorrectly (so that the promises made by the metadata aren't true), then the response file will be technically valid but will be incorrect in some way.  
             
###### EDDTable cdm_data_types    
*   For EDDTable datasets, the cdm\_data\_type options (and related requirements in ERDDAP) are
###### Point {#point}
*   [Point](#point) -- is for a set of measurements taken at unrelated times and locations.
    *   As with all cdm\_data\_types other than Other, Point datasets MUST have longitude, latitude, and time variables.  
###### Profile {#profile}
*   [Profile](#profile) -- is a set of measurements all taken at one time, at one latitude longitude location, but at more than one depth (or altitude). The dataset may be a collection of these Profiles, for example, 7 profiles from different locations. This cdm\_data\_type doesn't imply any logical connection between any of the profiles.
    
*   One of the variables (for example, profile\_number) MUST have the variable attribute cf\_role=profile\_id to identify the variable that uniquely identifies the profiles.  
    ```
    <att name="cf\_role">profile\_id</att>  
    ```
    If no other variable is suitable, consider using the time variable.
###### cdm\_profile\_variables {#cdm_profile_variables}
*   The dataset MUST include the globalAttribute [cdm\_profile\_variables](#cdm_profile_variables), where the value is a comma-separated list of the variables which have the information about each profile. For a given profile, the values of these variables MUST be constant. For example,
    ```
    <att name="cdm\_profile\_variables">profile\_number,time,latitude,longitude</att>
    ```
    The list MUST include the cf\_role=profile\_id variable and all other variables with information about the profile, and time, latitude and longitude.  
    The list will never include altitude, depth, or any observation variables.  
     

\[Opinion: cdm\_data\_type=Profile should rarely be used. In practice, a given dataset is usually actually either a TimeSeriesProfile (profiles at a fixed position) or a TrajectoryProfile (profiles along a trajectory), and so should be properly identified as such.\]  
###### TimeSeries {#timeseries}
*   [TimeSeries](#timeseries) -- is a sequence of measurements (e.g., sea water temperature) taken at one, fixed, latitude, longitude, depth (or altitude) location. (Think of it as "station".) The dataset may be a collection of these TimeSeries, for example, a sequence from each of 3 different locations.
    *   One of the variables (for example, station\_id) MUST have the variable attribute cf\_role=timeseries\_id to identify the variable that uniquely identifies the stations.  
        ```
        <att name="cf\_role">timeseries\_id</att>
        ```
###### cdm\_timeseries\_variables {#cdm_timeseries_variables}
*   The dataset MUST include the globalAttribute [cdm\_timeseries\_variables](#cdm_timeseries_variables), where the value is a comma-separated list of the variables which have the information about each station. For a given station, the values of these variables MUST be constant. For example,
    ```
    <att name="cdm\_timeseries\_variables">station\_id,station\_type,latitude,longitude</att>
    ```
    The list MUST include the cf\_role=timeseries\_id variable and all other variables with information about the station, which almost always includes latitude and longitude (and altitude or depth, if present).  
    The list will never include time or any observation variables.
*   For some moored buoys, a dataset may have two sets of latitude and longitude variables:
    1.  One pair of latitude and longitude values that are constant (i.e., the fixed location of the mooring). In ERDDAP™, give these variables the destinationNames of latitude and longitude, and include these variables in the list of cdm\_timeseries\_variables.
    2.  Precise latitude and longitude values associated with each observation. In ERDDAP™, give these variables different destinationNames (e.g., preciseLat and preciseLon) and don't include these variables in the list of cdm\_timeseries\_variables.  
         The reasoning for this is: from a theoretical perspective, for a DSG TimeSeries dataset, the latitude and longitude (and altitude or depth, if present) location of the station MUST be constant.
###### TimeSeriesProfile {#timeseriesprofile}
*   [TimeSeriesProfile](#timeseriesprofile) -- is for a sequence of profiles taken at one, fixed, latitude longitude location. Each profile is a set of measurements taken at multiple altitudes or depths. The dataset may be a collection of these TimeSeriesProfiles, for example, a sequence of profiles taken at each of 12 different locations.
    *   One of the variables (for example, station\_id) MUST have the variable attribute cf\_role=timeseries\_id to identify the variable that uniquely identifies the stations.  
    ```
        <att name="cf\_role">timeseries\_id</att>
    ```
    *   One of the variables (for example, profile\_number) MUST have the variable attribute cf\_role=profile\_id to identify the variable that uniquely identifies the profiles.  
        ```
        <att name="cf\_role">profile\_id</att>  
        ```
        (A given profile\_id only has to be unique for a given timeseries\_id.) If no other variable is suitable, consider using the time variable.
    *   The dataset MUST include the globalAttribute cdm\_timeseries\_variables, where the value is a comma-separated list of the variables which have the information about each station. For a given station, the values of these variables MUST be constant. For example,
        ```
        <att name="cdm\_timeseries\_variables">station\_id,station\_type,latitude,longitude</att>
        ```
        The list MUST include the cf\_role=timeseries\_id variable and all other variables with information about the station, which almost always includes latitude and longitude.  
        The list will never include time, altitude, depth, or any observation variables.
    *   The dataset MUST include the globalAttribute cdm\_profile\_variables, where the value is a comma-separated list of the variables which have the information about each profile. For a given profile, the values of these variables MUST be constant. For example,
        ```
        <att name="cdm\_profile\_variables">profile\_number,time</att>
        ```
        The list MUST include the cf\_role=profile\_id variable and all other variables with information about the profile, which almost always includes time.  
        The list will never include latitude, longitude, altitude, depth, or any observation variables.  
###### Trajectory {#trajectory}
*   [Trajectory](#trajectory) -- is a sequence of measurements taken along a trajectory (a path through space and time) (e.g., sea\_water\_temperature taken by a ship as it moves through the water). The dataset may be a collection of these Trajectories, for example, a sequence from each of 4 different ships.
    *   One of the variables (for example, ship\_id) MUST have the attribute cf\_role=trajectory\_id to identify the variable that uniquely identifies the trajectories.
        ```  
        <att name="cf\_role">trajectory\_id</att>
        ```
###### cdm\_trajectory\_variables {#cdm_trajectory_variables}
*   The dataset MUST include the globalAttribute [cdm\_trajectory\_variables](#cdm_trajectory_variables), where the value is a comma-separated list of the variables which have the information about each trajectory. For a given trajectory, the values of these variables MUST be constant. For example,
    ```
    <att name="cdm\_trajectory\_variables">ship\_id,ship\_type,ship\_owner</att>
    ```
    The list MUST include the cf\_role=trajectory\_id variable and all other variables with information about the trajectory.  
    The list will never include time, latitude, longitude, or any observation variables.  
###### TrajectoryProfile {#trajectoryprofile}
*   [TrajectoryProfile](#trajectoryprofile) -- is a sequence of profiles taken along a trajectory. The dataset may be a collection of these TrajectoryProfiles, for example, a sequence of profiles taken by 14 different ships.
    *   One of the variables (for example, ship\_id) MUST have the variable attribute cf\_role=trajectory\_id to identify the variable that uniquely identifies the trajectories. 
        ``` 
        <att name="cf\_role">trajectory\_id</att>
        ```
    *   One of the variables (for example, profile\_number) MUST have the variable attribute cf\_role=profile\_id to identify the variable that uniquely identifies the profiles.  
        ```
        <att name="cf\_role">profile\_id</att>  
        ```
        (A given profile\_id only has to be unique for a given trajectory\_id.) If no other variable is suitable, consider using the time variable.
    *   The dataset MUST include the globalAttribute cdm\_trajectory\_variables, where the value is a comma-separated list of the variables which have the information about each trajectory. For a given trajectory, the values of these variables MUST be constant. For example,
        ```
        <att name="cdm\_trajectory\_variables">ship\_id,ship\_type,ship\_owner</att>
        ```
        The list MUST include the cf\_role=trajectory\_id variable and all other variables with information about the trajectory.  
        The list will never include profile-related variables, time, latitude, longitude, or any observation variables.
    *   The dataset MUST include the globalAttribute cdm\_profile\_variables, where the value is a comma-separated list of the variables which have the information about each profile. For a given profile, the values of these variables MUST be constant. For example,
        ```
        <att name="cdm\_profile\_variables">profile\_number,time,latitude,longitude</att>
        ```
        The list MUST include the cf\_role=profile\_id variable and all other variables with information about the profile, which almost always includes time, latitude and longitude.  
        The list will never include altitude, depth, or any observation variables.  
###### Other {#other}
*   [Other](#other) -- has no requirements. Use it if the dataset doesn't fit one of the other options, notably, if the dataset doesn't include latitude, longitude and time variables.  
     
###### Related Notes {#related-notes}
*   All EDDTable datasets with a cdm\_data\_type other than "Other" MUST have longitude, latitude, and time variables.
*   Datasets with profiles MUST have an altitude variable, a depth variable, or an [cdm\_altitude\_proxy](#cdm_altitude_proxy) variable.
*   If you can't make a dataset comply with all of the requirements for the ideal cdm\_data\_type, use "Point" (which has few requirements) or "Other" (which has no requirements) instead.
*   This information is used by ERDDAP™ in various ways, for example, but mostly for making .ncCF files (.nc files which comply with the Contiguous Ragged Array Representations associated with the dataset's cdm\_data\_type) and .ncCFMA files (.nc files which comply with the Multidimensional Array Representations associated with the dataset's cdm\_data\_type) as defined in [Discrete Sampling Geometries (DSG)](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) chapter of the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata conventions, which were previously named "CF Point Observation Conventions".
*   Hint: For these datasets, the correct setting for [subsetVariables](#subsetvariables) is usually the combination of all the variables listed in the cdm\_...\_variables attributes. For example, for TimeSeriesProfile, use the cdm\_timeseries\_variables plus the cdm\_profile\_variables.  
###### contributor\_name {#contributor_name}
*   [**contributor\_name**](#contributor_name) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify a person, organization, or project which contributed to this dataset (for example, the original creator of the data, before it was reprocessed by the creator of this dataset). For example,  
    ```
        <att name="contributor\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
    If "contributor" doesn't really apply to a dataset, omit this attribute. Compared to [creator\_name](#creator_name), this is sometimes more focused on the funding source.  
###### contributor\_role {#contributor_role}
*   [**contributor\_role**](#contributor_role) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify the role of [contributor\_name](#creator_name). For example,  
    ```
        <att name="contributor\_role">Source of Level 2b data</att>  
    ```
    If "contributor" doesn't really apply to a dataset, omit this attribute.  
###### Conventions {#conventions}
*   [**Conventions**](#conventions) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata standard) is STRONGLY RECOMMENDED. (It may be REQUIRED in the future.) The value is a comma-separated list of metadata standards that this dataset follows. For example:  
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
    The common metadata conventions used in ERDDAP™ are:
    
    *   [COARDS Conventions](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) is the precursor to CF.
    *   [Climate and Forecast (CF) Conventions](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) is the source of many of the recommended and required attributes in ERDDAP. The current version of CF is identified as "CF-1.6".
    *   The NetCDF Attribute Convention for Dataset Discovery (ACDD) is the source of many of the recommended and required attributes in ERDDAP. The original 1.0 version of ACDD (a brilliant piece of work by Ethan Davis), was identified as [Unidata Dataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) The current (starting in 2015) 1.3 version of ACDD is identified as [ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). If your datasets have been using Unidata Dataset Discovery v1.0, we encourage you to [switch your datasets to use ACDD-1.3](#switch-to-acdd-13).
    
    If your dataset follows some additional metadata standard, please add the name to the CSV list in the Conventions attribute.  
###### coverage\_content\_type {#coverage_content_type}
*   [**coverage\_content\_type**](#coverage_content_type) (from the [ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata) metadata standard) is the RECOMMENDED way to identify the type of gridded data (in EDDGrid datasets). For example,  
    ```
    <att name="coverage\_content\_type">modelResult</att>  
    ```
    The only allowed values are auxiliaryInformation, image, modelResult, physicalMeasurement (the default when ISO 19115 metadata is generated), qualityInformation, referenceInformation, and thematicClassification. (Don't use this tag for EDDTable datasets.)  
###### creator\_name {#creator_name}
*   [**creator\_name**](#creator_name) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify the person, organization, or project (if not a specific person or organization), most responsible for the creation (or most recent reprocessing) of this data. For example,  
    ```
    <att name="creator\_name">NOAA NMFS SWFSC ERD</att>  
    ```
    If the data was extensively reprocessed (for example, satellite data from level 2 to level 3 or 4), then usually the reprocessor is listed as the creator and the original creator is listed via [contributor\_name](#contributor_name). Compared to [project](#project), this is more flexible, since it may identify a person, an organization, or a project.  
###### creator\_email {#creator_email}
*   [**creator\_email**](#creator_email) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify an email address (correctly formatted) that provides a way to contact the creator. For example,  
    ```
    <att name="creator\_email">erd.data@noaa.gov</att>  
    ```
###### creator\_url {#creator_url}
*   [**creator\_url**](#creator_url) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify a URL for organization that created the dataset, or a URL with the creator's information about this dataset (but that is more the purpose of [infoUrl](#infourl)). For example,  
    ```
    <att name="creator\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\_created {#date_created}
*   [**date\_created**](#date_created) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify the date on which the data was first created (for example, processed into this form), in ISO 8601 format. For example,  
    ```
    <att name="date\_created">2010-01-30</att>  
    ```
    If data is periodically added to the dataset, this is the first date that the original data was made available.  
###### date\_modified {#date_modified}
*   [**date\_modified**](#date_modified) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify the date on which the data was last modified (for example, when an error was fixed or when the latest data was added), in ISO 8601 format. For example,  
    ```
    <att name="date\_modified">2012-03-15</att>  
    ```
###### date\_issued {#date_issued}
*   [**date\_issued**](#date_issued) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify the date on which the data was first made available to others, in ISO 8601 format, for example, 2012-03-15. For example,  
    ```
    <att name="date\_issued">2010-07-30</att>  
    ```
    For example, the dataset may have a [date\_created](#date_created) of 2010-01-30, but was only made publicly available 2010-07-30. date\_issued is less commonly used than date\_created and date\_modified. If date\_issued is omitted, it is assumed to be the same as the date\_created.  
###### global drawLandMask {#global-drawlandmask}
*   [**drawLandMask**](#global-drawlandmask) -- This is an OPTIONAL global attribute used by ERDDAP™ (and no metadata standards) which specifies the default value for the "Draw Land Mask" option on the dataset's Make A Graph form (*datasetID*.graph) and for the &.land parameter in a URL requesting a map of the data. For example, 
    ```
    <att name="drawLandMask">over</att>  
    ```
    See the [drawLandMask overview](#drawlandmask).  
###### featureType {#featuretype}
*   [**featureType**](#featuretype) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata standard) is IGNORED and/or REPLACED. If the dataset's [cdm\_data\_type](#cdm_data_type) is appropriate, ERDDAP™ will automatically use it to create a featureType attribute. So there is no need for you to add it.
    
    However, if you are using [EDDTableFromNcCFFiles](#eddtablefromnccffiles) to create a dataset from files that follow the [CF Discrete Sampling Geometries (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), the files themselves must have featureType correctly defined, so that ERDDAP™ can read the files correctly. That is part of the CF DSG requirements for that type of file.  
     
###### history {#history}
*   [**history**](#history) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standards) is a RECOMMENDED multi-line String global attribute with a line for every processing step that the data has undergone. For example,  
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    *   Ideally, each line has an ISO 8601:2004(E) formatted date+timeZ (for example, 2011-08-05T08:55:02Z) followed by a description of the processing step.
    *   ERDDAP™ creates this if it doesn't already exist.
    *   If it already exists, ERDDAP™ will append new information to the existing information.
    *   history is important because it allows clients to backtrack to the original source of the data.  
###### infoUrl {#infourl}
*   [**infoUrl**](#infourl) is a REQUIRED global attribute with the URL of a web page with more information about this dataset (usually at the source institution's website). For example,  
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    *   Either the dataset's global [sourceAttributes](#global-attributes) or its global &lt;addAttributes> MUST include this attribute.
    *   infoUrl is important because it allows clients to find out more about the data from the original source.
    *   ERDDAP™ displays a link to the infoUrl on the dataset's Data Access Form (*datasetID*.html), Make A Graph web page (*datasetID*.graph), and other web pages.
    *   If the URL has a query part (after the "?"), it MUST be already [percent encoded](https://en.wikipedia.org/wiki/Percent-encoding). You need to encode special characters in the constraints (other than the initial '&' and the main '=', if any) into the form %HH, where HH is the 2 digit hexadecimal value of the character. Usually, you just need to convert a few of the punctuation characters: % into %25, & into %26, " into %22, &lt; into %3C, = into %3D, > into %3E, + into %2B, | into %7C, \[ into %5B, \] into %5D, space into %20, and convert all characters above #127 into their UTF-8 form and then percent encode each byte of the UTF-8 form into the %HH format (ask a programmer for help).  
        For example, &stationID>="41004"  
        becomes       &stationID%3E=%2241004%22  
        Percent encoding is generally required when you access ERDDAP via software other than a browser. Browsers usually handle percent encoding for you.  
        In some situations, you need to percent encode all characters other than A-Za-z0-9\_-!.~'()\*, but still don't encode the initial '&' or the main '='.  
        Programming languages have tools to do this (for example, see Java's [java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
        and JavaScript's [encodeURIComponent()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)) and there are  
        [websites that percent encode/decode for you](https://www.url-encode-decode.com/).
    *   Since datasets.xml is an XML file, you MUST also &-encode ALL '&', '&lt;', and '>' in the URL as '&amp;', '&lt;', and '&gt;' after percent encoding.
    *   infoUrl is unique to ERDDAP. It is not from any metadata standard.  
###### institution {#institution}
*   [**institution**](#institution) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standards) is a REQUIRED global attribute with the short version of the name of the institution which is the source of this data (usually an acronym, usually &lt;20 characters). For example,  
    ```
    <att name="institution">NASA GSFC</att>
    ```
    *   Either the dataset's global [sourceAttributes](#global-attributes) or its global &lt;addAttributes> MUST include this attribute.
    *   ERDDAP™ displays the institution whenever it displays a list of datasets. If an institution's name here is longer than 20 characters, only the first 20 characters will be visible in the list of datasets (but the whole institution can be seen by putting the mouse cursor over the adjacent "?" icon).
    *   If you add institution to the list of &lt;categoryAttributes> in ERDDAP's [setup.xml](/docs/server-admin/deploy-install#setupxml) file, users can easily find datasets from the same institution via ERDDAP's "Search for Datasets by Category" on the home page.  
###### keywords {#keywords}
*   [**keywords**](#keywords) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a RECOMMENDED comma-separated list of words and short phrases (for example, [GCMD Science Keywords](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) that describe the dataset in a general way, and not assuming any other knowledge of the dataset (for example, for oceanographic data, include ocean). For example,  
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\_sea\_water\_velocity, experimental, hf radio, meridional, noaa, northward, northward\_sea\_water\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
    Since datasets.xml is an XML document, the characters &, &lt;, and > in an attribute like keywords (e.g., the > characters in GCMD science keywords) must be encoded as &amp;, &lt;, and &gt;, respectively.  
    When a dataset is loaded in ERDDAP,
    
    *   "Earth Science > " is added to the start of any GCMD keyword that lacks it.
    *   GCMD keywords are converted to Title Case (i.e., the first letters are capitalized).
    *   The keywords are rearranged into sorted order and any newline characters are removed.
     
###### keywords\_vocabulary {#keywords_vocabulary}
*   [**keywords\_vocabulary**](#keywords_vocabulary) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a RECOMMENDED attribute: if you are following a guideline for the words/phrases in your keywords attribute (for example, GCMD Science Keywords), put the name of that guideline here. For example,  
    ```
    <att name="keywords\_vocabulary">GCMD Science Keywords</att>  
    ```
###### license {#license}
*   [**license**](#license) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a STRONGLY RECOMMENDED global attribute with the license and/or usage restrictions. For example,  
    ```
    <att name="license">\[standard\]</att>
    ```
    *   If "\[standard\]" occurs in the attribute value, it will be replaced by the standard ERDDAP™ license from the &lt;standardLicense> tag in ERDDAP's  
        \[tomcat\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.  
         
###### Metadata\_Conventions {#metadata_conventions}
*   [**Metadata\_Conventions**](#metadata_conventions) is from the outdated [ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1) (which was identified in Metadata\_Conventions as "Unidata Dataset Discovery v1.0") metadata standard. The attribute value was a comma-separated list of metadata conventions used by this dataset.  
    If a dataset uses ACDD 1.0, this attribute is STRONGLY RECOMMENDED, for example,  
    ```
    <att name="Metadata\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
    But ERDDAP™ now recommends ACDD-1.3. If you have [switched your datasets to use ACDD-1.3](#switch-to-acdd-13), use of Metadata\_Conventions is STRONGLY DISCOURAGED: just use [&lt;Conventions>](#conventions) instead.  
###### processing\_level {#processing_level}
*   [**processing\_level**](#processing_level) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a RECOMMENDED textual description of the processing (for example, [NASA satellite data processing levels](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), for example, Level 3) or quality control level (for example, Science Quality) of the data. For example,  
    ```
    <att name="processing\_level">3</att>  
    ```
###### project {#project}
*   [**project**](#project) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is an OPTIONAL attribute to identify the project that the dataset is part of. For example,  
    ```
    <att name="project">GTSPP</att>  
    ```
    If the dataset isn't part of a project, don't use this attribute. Compared to [creator\_name](#creator_name), this is focused on the project (not a person or an organization, which may be involved in multiple projects).  
###### publisher\_name {#publisher_name}
*   [**publisher\_name**](#publisher_name) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify the person, organization, or project which is publishing this dataset. For example,  
    ```
    <att name="publisher\_name">JPL</att>  
    ```
    For example, you are the publisher if another person or group [created](#creator_name) the dataset and you are just re-serving it via ERDDAP. If "publisher" doesn't really apply to a dataset, omit this attribute. Compared to [creator\_name](#creator_name), the publisher probably didn't significantly modify or reprocess the data; the publisher is just making the data available in a new venue.  
###### publisher\_email {#publisher_email}
*   [**publisher\_email**](#publisher_email) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify an email address (correctly formatted, for example, john\_smith@great.org) that provides a way to contact the publisher. For example,  
    ```
    <att name="publisher\_email">john\_smith@great.org</att>  
    ```
    If "publisher" doesn't really apply to a dataset, omit this attribute.  
###### publisher\_url {#publisher_url}
*   [**publisher\_url**](#publisher_url) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is the RECOMMENDED way to identify a URL for the organization that published the dataset, or a URL with the publisher's information about this dataset (but that is more the purpose of [infoUrl](#infourl)). For example,  
    ```
    <att name="publisher\_url">https://podaac.jpl.nasa.gov</att>  
    ```
    If "publisher" doesn't really apply to a dataset, omit this attribute.  
###### real\_time {#real_time}
*   [**real\_time**](#real_time) is a global String attribute (not from any standard) indicating if this is a real time dataset. For example,  
    ```
    <att name="real\_time">true</att>  
    ```
    If this is false (the default), ERDDAP™ will cache responses to requests for file types where the entire file must be created before ERDDAP™ can begin to send the response to the user and reuse them for up to about 15 minutes (e.g., .nc, .png).  
    If this is set to true, ERDDAP™ will never cache the response files and will always return newly created files.  
###### sourceUrl attribute {#sourceurl-attribute}
*   [**sourceUrl**](#sourceurl-attribute) is a global attribute with the URL of the source of the data. For example,  
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
    (but put it all on one line)
    *   ERDDAP™ usually creates this global attribute automatically. Two exceptions are EDDTableFromHyraxFiles and EDDTableFromThreddsFiles.
    *   If the source is local files and the files were created by your organization, use  
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    *   If the source is local database and the data was created by your organization, use  
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrl is important because it allows clients to backtrack to the original source of the data.
    *   sourceUrl is unique to ERDDAP. It is not from any metadata standard.  
        
###### standard\_name\_vocabulary {#standard_name_vocabulary}
*   [**standard\_name\_vocabulary**](#standard_name_vocabulary) (from the [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) is a RECOMMENDED attribute to identify the name of the controlled vocabulary from which variable [standard\_name](#standard_name)s are taken. For example,  
    ```
    <att name="standard\_name\_vocabulary">CF Standard Name Table v77</att>  
    ```
    for version 77 of the [CF standard name table](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).  
         
##### subsetVariables {#subsetvariables}
*   **subsetVariables** (for EDDTable datasets only) is a RECOMMENDED global attribute that lets you specify a comma-separated list of [&lt;dataVariable>](#datavariable) [destinationName](#destinationname)s to identify variables which have a limited number of values (stated another way: variables for which each of the values has many duplicates). For example,  
    ```
        <att name="subsetVariables">station\_id, longitude, latitude</att>  
    ```
    If this attribute is present, the dataset will have a *datasetID*.subset web page (and a link to it on every dataset list) which lets users quickly and easily select various subsets of the data.
    *   Each time a dataset is loaded, ERDDAP loads and stores on disk a table with all of the distinct() combinations of the subsetVariable's variable's values. ERDDAP™ can read that subsetVariables table and process it very quickly (especially compared to reading lots of data files or getting data from a database or other external service).
    *   That allows ERDDAP™ to do 3 things:
        1.  It allows ERDDAP™ to put a list of possible values in a dropdown list on the Data Access Form, Make A Graph web page, and .subset webpages.
        2.  It allows ERDDAP™ to offer a .subset webpage for that dataset. That page is interesting because it makes it easy to find valid combinations of the values of those variables, which for some datasets and some variables is very, very hard (almost impossible). Then, all user requests for distinct() subsetVariable data will be very fast.
        3.  If there is a user request that only refers to a subset of those variables, ERDDAP™ can quickly read the subsetVariables table, and respond to the request. That can save a ton of time and effort for ERDDAP.
    *   The order of the destinationNames you specify determines the sort order on the *datasetID*.subset web page, so you will usually specify the most important variables first, then the least important. For example, for datasets with time series data for several stations, you might use, for example,  
        ```
            <att name="subsetVariables">station\_id, longitude, latitude</att>  
        ```
        so that the values are sorted by station\_id.
    *   Obviously, it is your choice which variables to include in the subsetVariables list, but the suggested usage is:
        
        In general, include variables for which you want ERDDAP™ to display a drop-down list of options on the dataset's Data Access Form (.html) and Make-A-Graph (.graph) web pages.
        
        In general, do include variables with information about the dataset's features (the stations, profiles, and/or trajectories, notably from [cdm\_timeseries\_variables](#cdm_timeseries_variables), [cdm\_profile\_variables](#cdm_profile_variables), [cdm\_trajectory\_variables](#cdm_trajectory_variables)). There are only a few different values for these variables so they work well with drop-down lists.
        
        Don't ever include any data variables associated with individual observations (e.g., time, temperature, salinity, current speed) in the subsetVariables list. There are too many different values for these variables, so a drop-down list would be slow to load and be hard to work with (or not work).
        
    *   If the number of distinct combinations of these variables is greater than about 1,000,000, you should consider restricting the subsetVariables that you specify to reduce the number of distinct combinations to below 1,000,000; otherwise, the *datasetID*.subset web pages may be generated slowly. In extreme cases, the dataset may not load in ERDDAP™ because generating the list of distinct combinations uses too much memory. If so, you MUST remove some variables from the subsetVariables list.
    *   If the number of distinct values of any one subset variable is greater than about 20,000, you should consider not including that variable in the list of subsetVariables; otherwise, it takes a long time to transmit the *datasetID*.subset, *datasetID*.graph, and *datasetID*.html web pages. Also, on a Mac, it is very hard to make selections from a drop down list with more than 500 items because of the lack of a scroll bar. A compromise is: remove variables from the list when users are not likely to select values from a drop down list.
    *   You should test each dataset to see if the subsetVariables setting is okay. If the source data server is slow and it takes too long (or fails) to download the data, either reduce the number of variables specified or remove the subsetVariables global attribute.
    *   SubsetVariables is very useful. So if your dataset is suitable, please create a subsetVariables attribute.
    *   EDDTableFromSOS automatically adds  
        ```
            <att name="subsetVariables">station\_id, longitude, latitude</att>  
        ```
            when the dataset is created.
        *   Possible warning: if a user using the *datasetID*.subset web page selects a value which has a carriageReturn or newline character, *datasetID*.subset will fail. ERDDAP™ can't work around this issue because of some HTML details. In any case, it is almost always a good idea to remove the carriageReturn and newline characters from the data. To help you fix the problem, if the EDDTable.subsetVariablesDataTable method in ERDDAP detects data values that will cause trouble, it will email a warning with a list of offending values to the emailEverythingTo email addresses specified in setup.xml. That way, you know what needs to be fixed.
        *   **Pre-generated subset tables.** Normally, when ERDDAP™ loads a dataset, it requests the distinct() subset variables data table from the data source, just via a normal data request. In some cases, this data is not available from the data source or retrieving from the data source may be hard on the data source server. If so, you can supply a table with the information in a .json or .csv file with the name *tomcat*/content/erddap/subset/*datasetID*.json (or .csv). If present, ERDDAP™ will read it once when the dataset is loaded and use it as the source of the subset data.
            *   If there is an error while reading it, the dataset will fail to load.
            *   It MUST have exact same column names (for example, same case) as &lt;subsetVariables>, but the columns MAY be in any order.
            *   It MAY have extra columns (they'll be removed and newly redundant rows will be removed).
            *   Missing values should be missing values (not fake numbers like -99).
            *   .json files may be a little harder to create but deal with Unicode characters well. .json files are easy to create if you create them with ERDDAP.
            *   .csv files are easy to work with, but suitable for ISO 8859-1 characters only. .csv files MUST have column names on the first row and data on subsequent rows.
        *   For huge datasets or when &lt;subsetVariables> is misconfigured, the table of combinations of values can be large enough to cause Too Much Data or OutOfMemory errors. The solution is to remove variables from the list of &lt;subsetVariables> for which there are a large number of values, or remove variables as needed until the size of that table is reasonable. Regardless of the error, the parts of ERDDAP™ that use the subsetVariables system don't work well (e.g., web pages load very slowly) when there are too many rows (e.g., more than a million) in that table.
        *   subsetVariables has nothing to do with specifying which variables users can use in constraints, i.e., how users can request subsets of the dataset. ERDDAP™ always allows constraints to refer to any of the variables.  
###### Time Units {#time-units}
[Time and timestamp](#time-units) columns should have ISO 8601:2004(E) formatted date+timeZ strings (for example, 1985-01-31T15:31:00Z).
             
###### summary {#summary}
*   [**summary**](#summary) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standards) is a REQUIRED global attribute with a long description of the dataset (usually &lt;500 characters). For example,  
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    *   Either the dataset's global [sourceAttributes](#global-attributes) or its global &lt;addAttributes> MUST include this attribute.
    *   summary is very important because it allows clients to read a description of the dataset that has more information than the title and thus quickly understand what the dataset is.
    *   Advice: please write the summary so it would work to describe the dataset to some random person you meet on the street or to a colleague. Remember to include the [Five W's and one H](https://en.wikipedia.org/wiki/Five_Ws): Who created the dataset? What information was collected? When was the data collected? Where was it collected? Why was it collected? How was it collected?
    *   ERDDAP™ displays the summary on the dataset's Data Access Form (*datasetID*.html), Make A Graph web page (*datasetID*.graph), and other web pages. ERDDAP™ uses the summary when creating FGDC and ISO 19115 documents.  
###### testOutOfDate {#testoutofdate}
*   [**testOutOfDate**](#testoutofdate) (an optional ERDDAP-specific global metadata attribute, not from any standard) specifies, in a simplistic way, when the data for a near-real-time dataset is considered out-of-date, specified as now-*nUnits*, for example, now-2days for data that usually appears 24-48 hours after the time value. For forecast data, use now**+***nUnits*, for example, now+6days for forecast data that is, at most, 8 days in the future. (See the [now-*nUnits* syntax description](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) If the maximum time value for the dataset is more recent than the specified time, the dataset is considered up-to-date. If the maximum time value is older than the specified time, the dataset is considered up-to-date. For out-of-date datasets, there is presumably a problem with the data source, so ERDDAP™ is unable to access data from more recent time points.
    
    The testOutOfDate value is displayed as a column in the [allDatasets dataset](#eddtablefromalldatasets) in your ERDDAP. It is also used to calculate the outOfDate index, which is another column in the allDatasets dataset.  
    If the index is &lt;1, the dataset is considered up-to-date.  
    If the index is &lt;=1, the dataset is considered out-of-date.  
    If the index is &lt;=2, the dataset is considered very out-of-date.
    
    The testOutOfDate value is also used by ERDDAP™ to generate the https://*yourDomain*/erddap/outOfDateDatasets.html web page ([example](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) which shows the datasets which have &lt;testOutOfDate> tags, with the datasets ranked by how out-of-date they are. If you change the file type (from .html to .csv, .jsonlCSV, .nc, .tsv, ...), you can get that information in different file formats.
    
    When possible, [GenerateDatasetsXml](#generatedatasetsxml) adds a testOutOfDate attribute to the global addAttributes of a dataset. This value is a suggestion based on the information available to GenerateDatasetsXml. If the value isn't appropriate, change it.
    
    "Out-of-date" here is very different from [&lt;reloadEveryNMinutes>](#reloadeverynminutes), which deals with how up-to-date ERDDAP's knowledge of the dataset is. The &lt;testOutOfDate> system assumes that ERDDAP's knowledge of the dataset is up-to-date. The question &lt;testOutOfDate> deals with is: does there appear to be something wrong with the source of the data, causing more recent data to be not accessible by ERDDAP?
    
###### title {#title}
*   [**title**](#title) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standards) is a REQUIRED global attribute with the short description of the dataset (usually &lt;=95 characters). For example,  
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    *   Either the dataset's global [sourceAttributes](#global-attributes) or its global &lt;addAttributes> MUST include this attribute.
    *   title is important because every list of datasets presented by ERDDAP (other than search results) lists the datasets in alphabetical order, by title. So if you want to specify the order of datasets, or have some datasets grouped together, you have to create titles with that in mind. Many lists of datasets (for example, in response to a category search), show a subset of the full list and in a different order. So the title for each dataset should stand on its own.
    *   If the title contains the word "DEPRECATED" (all capital letters), then the dataset will get a lower ranking in searches.  
             
##### &lt;axisVariable&gt; {#axisvariable}
*   [**&lt;axisVariable>**](#axisvariable) is used to describe a dimension (also called "axis").  
    For EDDGrid datasets, one or more axisVariable tags is REQUIRED, and all [dataVariables](#datavariable) always share/use all axis variables. ([Why?](#why-just-two-basic-data-structures) [What if they don't?](#dimensions))  
    There MUST be an axis variable for each dimension of the data variables.  
    Axis variables MUST be specified in the order that the data variables use them.  
    (EDDTable datasets can NOT use &lt;axisVariable> tags.)  
    A fleshed out example is:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable> supports the following subtags:
###### &lt;sourceName\&gt; {#sourcename}
*   [&lt;sourceName\>](#sourcename) -- the data source's name for the variable. This is the name that ERDDAP™ will use when requesting data from the data source. This is the name that ERDDAP™ will look for when data is returned from the data source. This is case sensitive. This is REQUIRED.
###### &lt;destinationName\&gt; {#destinationname}
*   [&lt;destinationName\>](#destinationname) is the name for the variable that will be shown to and used by ERDDAP™ users.
    *   This is OPTIONAL. If absent, the sourceName is used.
    *   This is useful because it allows you to change a cryptic or odd sourceName.
    *   destinationName is case sensitive.
    *   destinationNames MUST start with a letter (A-Z, a-z) and MUST be followed by 0 or more characters (A-Z, a-z, 0-9, and \_). ('-' was allowed before ERDDAP™ version 1.10.) This restriction allows axis variable names to be the same in ERDDAP™, in the response files, and in all the software where those files will be used, including programming languages (like Python, Matlab, and JavaScript) where there are similar restrictions on variable names.
    *   In EDDGrid datasets, the [longitude, latitude, altitude, depth, and time](#destinationname) axis variables are special.  
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes}
*   [&lt;addAttributes>](#variable-addattributes) defines an OPTIONAL set of attributes (*name* = *value*) which are added to the source's attributes for a variable, to make the combined attributes for a variable.  
    If the variable's [sourceAttributes](#variable-addattributes) or &lt;addAttributes> include [scale\_factor and/or add\_offset](#scale_factor) attributes, their values will be used to unpack the data from the source before distribution to the client  
    (resultValue = sourceValue \* scale\_factor + add\_offset) . The unpacked variable will be of the same data type (for example, float) as the scale\_factor and add\_offset values.  
         
##### &lt;dataVariable&gt; {#datavariable}
*   [**&lt;dataVariable>**](#datavariable) is a REQUIRED (for almost all datasets) tag within the &lt;dataset> tag which is used to describe a data variable. There MUST be 1 or more instances of this tag. A fleshed out example is:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\>sea\_water\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\_name](#standard_name)">sea\_water\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable> supports the following subtags:
###### &lt;sourceName&gt; {#sourcename-1}
*   [&lt;sourceName>](#sourcename) -- the data source's name for the variable. This is the name that ERDDAP™ will use when requesting data from the data source. This is the name that ERDDAP™ will look for when data is returned from the data source. This is case sensitive. This is REQUIRED.
###### Groups {#groups}
CF added support for groups with CF v1.8. Starting in ~2020, NetCDF tools support putting variables into groups in a .nc file. In practice, this just means that the variables have a long name which identifies the group(s) and the variable name, for example, group1a/group2c/varName ). ERDDAP™ supports groups by converting the "/"'s in the variable's &lt;sourceName> into "\_"'s in the variable's &lt;destinationName>, for example, group1a\_group2c\_varName . (When you see that, you should realize that groups are not much more than a syntax convention.) When the variables are listed in ERDDAP™, all the variables in a group will appear together, mimicking the underlying group. \[If ERDDAP™, notably GenerateDatasetsXml, doesn't perform as well as it could with source files that have groups, please email a sample file to Chris.John at noaa.gov .\]

EDDTableFromFiles datasets can use some specially-encoded, pseudo sourceNames to define new data variables, e.g., to promote a global attribute to be a data variable. See [this documentation](#pseudo-sourcenames).
###### HDF Structures {#hdf-structures}
Starting with ERDDAP™ v2.12, EDDGridFromNcFiles and EDDGridFromNcFilesUnpacked can read data from "structures" in .nc4 and .hdf4 files. To identify a variable that is from a structure, the &lt;sourceName> must use the format: *fullStructureName*|*memberName*, for example group1/myStruct|myMember .

###### Fixed Value SourceNames {#fixed-value-sourcenames}
In an EDDTable dataset, if you want to create a variable (with a single, fixed value) that isn't in the source dataset, use:  
```
    <sourceName>=*fixedValue*</sourceName>  
```
The initial equals sign tells ERDDAP™ that a fixedValue will follow.

*   For numeric variables, the fixed value must be a single finite value or NaN (case insensitive, e.g., \=NaN ).
*   For String variables, the fixed value must be single, [JSON-style string](https://www.json.org/json-en.html) (with special characters escaped with \\ characters), e.g., \="My \\"Special\\" String" .
*   For a timestamp variable, specify the fixed value as a number in "seconds since 1970-01-01T00:00:00Z" and use  
    units=seconds since 1970-01-01T00:00:00Z .
    
The other tags for the &lt;dataVariable> work as if this were a regular variable.  
For example, to create a variable called altitude with a fixed value of 0.0 (float), use:  

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

For unusual situations, you can even specify an actual\_range addAttribute, which will override the expected values of destinationMin and destinationMax (which would otherwise equal the fixedValue).  
 
###### Script SourceNames/Derived Variables {#script-sourcenamesderived-variables}
Starting with ERDDAP™ v2.10, in an [EDDTableFromFiles](#eddtablefromfiles), [EDDTableFromDatabase](#eddtablefromdatabase), or [EDDTableFromFileNames](#eddtablefromfilenames) dataset, the &lt;sourceName> can be  
an expression (an equation that evaluates to a single value), using the format  
```
    <sourceName>=*expression*</sourceName>  
```
or a script (a series of statements that returns a single value), using the format  
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™ relies on the [Apache project's](https://www.apache.org/) [Java Expression Language (JEXL)](https://commons.apache.org/proper/commons-jexl/) (license: [Apache](https://www.apache.org/licenses/LICENSE-2.0)) to evaluate the expressions and run the scripts.  
The calculation for a given new variable is done within one row of the results, repeatedly for all rows.  
The expressions and scripts use a Java- and JavaScript-like syntax and can use any of the  
[operators and methods which are built into JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).  
The scripts can also use methods (functions) from these classes:
*   [Calendar2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), which is a wrapper for some of the static, time- and calendar-related methods in com.cohort.util.Calendar2 ([license](/acknowledgements#cohort-software)). For example,  
    Calendar2.parseToEpochSeconds(*sourceTime, dateTimeFormat*) will parse the sourceTime string via the dateTimeFormat string and return a "seconds since 1970-01-01T00:00:00Z" (epochSeconds) double value.
*   [Math](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), which is a wrapper for almost all of the static, math-related methods in [java.lang.Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). For example, Math.atan2(*y, x*) takes in rectangular coordinates (y, x) and returns polar coordinates (an array of doubles with \[r, theta\]).
*   [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), which is a wrapper for almost all of the static, math-related methods in com.cohort.util.Math2 ([license](/acknowledgements#cohort-software)). For example,  
    Math2.roundTo(*d, nPlaces*) will round d to the specified number of digits to the right of the decimal point.
*   String, which gives you access to all of the static, String-related methods in [java.lang.String](https://docs.oracle.com/javase/8/docs/api/java/lang/String). String objects in ERDDAP™ expressions and scripts can use any of their associated Java methods, as described in the java.lang.String documentation. For example, String.valueOf(d) will convert the double value d into a String (although you can also use ""+d).
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), which is a wrapper for most of the static, String- and array-related methods in com.cohort.util.String2 ([license](/acknowledgements#cohort-software)). For example, String2.zeroPad(*number, nDigits*) will add 0's to the left of the number String so that the total number of digits is nDigits (e.g., String2.zeroPad("6", 2) will return "06").
*   [row](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), which has non-static methods for accessing the data from the various columns in the current row of the source data table. For example, row.columnString("year") reads the value from the "year" column as a String, whereas, row.columnInt("year") reads the value from the "year" column as an integer.

For security reasons, expressions and scripts can't use other classes other than those 6. ERDDAP™ enforces this limitation by creating a default blacklist (which blacklists all classes) and then a whitelist (which specifically allows the 6 classes described above). If you need other methods and/or other classes to do your work, please email your requests to Chris.John at noaa.gov .
    
###### Efficiency  
For EDDTableFromFiles datasets, there is only a very, very minimal (probably not noticeable) slowdown for requests for data from these variables. For EDDTableFromDatabase, there is huge speed penalty for requests that include constraints on these variables (e.g., (&longitude0360>30&longitude0360&lt;40) because the constraints can't be passed through to the database, so the database has to return much much more data to ERDDAP™ (which is very time consuming) so that ERDDAP™ can create the new variable and apply the constraint. To avoid the worst case (where there are no constraints being passed to the database), ERDDAP™ throws an error message so that the database doesn't have to return the entire contents of the table. (If you want to bypass this, add a constraint to a non-script column which will always be true, e.g., &time&lt;3000-01-01.) For this reason, with EDDTableFromDatabase, it is probably always better to create a derived column in the database rather than use sourceName=script in ERDDAP.

###### Overview Of How An Expression (Or Script) Is Used:  
In response to a user's request for tabular data, ERDDAP™ gets data from a series of source files. Each source file will generate a table of raw (straight from the source) data. ERDDAP™ will then go through the table of raw data, row by row, and evaluate the expression or script once for every row, in order to create a new column which has that expression or script as a sourceName.
    
###### GenerateDatasetsXml  
Note that GenerateDatasetsXml is completely unaware when there is a need to create a variable with &lt;sourceName>=*expression*&lt;/sourceName>. You have to create the variable in datasets.xml by hand.

###### Expression Examples:  
Here are some complete examples of data variables which use an expression to create a new column of data. We expect that these examples (and variants of them) will cover about 95% of the usage of all expression-derived sourceNames.

###### Combining separate "date" and "time" columns into a unified time column:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
That sourceName expression makes a new "time" column by concatenating the String values from the "date" (yyyy-MM-dd) and "time" (HH:mm:ss) columns on each row of the source file, and by converting that string into a "seconds since 1970-01-01" (epochSeconds) double value.

Or course, you'll have to customize the time format string to deal with the specific format in each dataset's source date and time columns, see the  
[time units documentation](#string-time-units).

Technically, you don't have to use Calendar2.parseToEpochSeconds() to convert the combined date+time into epochSeconds. You could just pass the date+time String to ERDDAP™ and specify the format (e.g.,  
yyyy-MM-dd'T'HH:mm:ss'Z') via the units attribute. But there are significant advantages to converting to epochSeconds -- notably, EDDTableFromFiles can then easily keep track of the range of time values in each file and so quickly decide whether to look in a given file when responding to a request which has time constraints.

A related problem is the need to create a unified date+time column from a source with separate year, month, date, hour, minute, second. The solution is very similar, but you will often need to zero-pad many of the fields, so that, for example, month (1 - 12) and date (1 - 31) always have 2 digits. Here's an example with year, month, date:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
    A related problem is the need to create a unified latitude or longitude column by combining the data in the source table's separate degrees, minutes, and seconds columns, each stored as integers. For example,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Converting a column named "lon" with longitude values from 0 - 360° into a column named "longitude" with values from -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\_east</att>
        </addAttributes>
    </dataVariable>
```
That sourceName expression makes a new "longitude" column by converting the double value from the "lon" column on each row of the source file (presumably with 0 - 360 values), and by converting that into a -180 to 180 double value.

If you instead want to convert source longitude values of -180 - 180° into 0 - 360°, use
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Naming the Two Longitude Variables:  
If the dataset will have 2 longitude variables, we recommend using destinationName=longitude for the -180 - 180° variable and destinationName=longitude0360 (and longName=\\"Longitude 0-360°") for the 0 - 360° variable. This is important because users sometimes use Advanced Search to search for data within a specific longitude range. That search will work better if longitude consistently has -180 - 180° values for all datasets. Also, the dataset's geospatial\_lon\_min, geospatial\_lon\_max, Westernmost\_Easting and Easternmost\_Eastings global attributes will then be set in a consistent way (with longitude values -180 to 180°);
    
###### Converting a column named "tempF" with temperature values in degree\_F into a column named "tempC" with temperatures in degree\_C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\_C</att>
        </addAttributes>
    </dataVariable>
```
That sourceName expression makes a new "tempC" column by converting the float degree\_F value from the "tempF" column on each row of the source file into a float degree\_C value.

Note that your dataset can have both the original tempF variable and the new tempC variable by having another variable with  
```
    <sourceName>tempF</sourceName>
```
###### Converting wind "speed" and "direction" columns into two columns with the u,v components
*   To make a u variable, use
```
    <sourceName>=row.columnFloat("speed") \* Math.cos(row.columnFloat("direction"))</sourceName>
```
*   To make a v variable, use
```
    <sourceName>=row.columnFloat("speed") \* Math.sin(row.columnFloat("direction"))</sourceName>
```
Or, given u,v:
*   To make a speed variable, use
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\[0\]</sourceName>
```
*   To make a direction variable, use
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\[1\])</sourceName>
```
    
###### Script Example:
Here is an example of using a script, not just an expression, as a sourceName. We expect that scripts, as opposed to expressions, won't be needed often. In this case the goal is to return a non-NaN missing value (-99) for temperature values outside a specific range. Note that the script is the part after the "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Hard Flag  
If you change the expression or script defined in a sourceName, you must set a [hard flag](/docs/server-admin/additional-information#hard-flag) for the dataset so the ERDDAP™ deletes all of the cached information for the dataset and re-reads every data file (using the new expression or script) the next time it loads the dataset. Alternatively, you can use [DasDds](#dasdds) which does the equivalent of setting a hard flag.

###### Percent Encode
This is only rarely relevant: Because the expressions and scripts are written in datasets.xml, which is an XML document, you must percent encode any &lt;, \>, and & characters in the expressions and scripts as &lt;, &gt;, and &amp; .

###### Common Problems
A common problem is that you create a variable with sourceName=*expression* but the resulting column of data just has missing values. Alternatively, some rows of the new column have missing values and you think they shouldn't. The underlying problem is that something is wrong with the expression and ERDDAP is converting that error into a missing value. To solve the problem,

*   Look at the expression to see what the problem might be.
*   Look in [log.txt](/docs/server-admin/additional-information#log), which will show the first error message generated during the creation of each new column.

Common causes are:

*   You used the wrong case. Expressions and scripts are case sensitive.
*   You omitted the name of the class. For example, you must use Math.abs(), not just abs().
*   You didn't do type conversions. For example, if a parameter value's data type is String and you have a double value, you need to convert a double into a String via ""+d.
*   The column name in the expression doesn't exactly match the column name in the file (or the name might be different in some files).
*   There is a syntax error in the expression (e.g., a missing or extra ')').

If you get stuck or need help,  
please include the details and see our [section on getting additional support](/docs/intro#support).
        
###### &lt;destinationName&gt; {#destinationname-1}
*   [&lt;destinationName>](#destinationname) -- the name for the variable that will be shown to and used by ERDDAP™ users.
    *   This is OPTIONAL. If absent, the [sourceName](#sourcename) is used.
    *   This is useful because it allows you to change a cryptic or odd sourceName.
    *   destinationName is case sensitive.
    *   destinationNames MUST start with a letter (A-Z, a-z) and MUST be followed by 0 or more characters (A-Z, a-z, 0-9, and \_). ('-' was allowed before ERDDAP™ version 1.10.) This restriction allows data variable names to be the same in ERDDAP™, in the response files, and in all the software where those files will be used, including programming languages (like Python, Matlab, and JavaScript) where there are similar restrictions on variable names.
    *   In EDDTable datasets, [longitude, latitude, altitude (or depth), and time](#destinationname) data variables are special.  
             
###### &lt;dataType&gt; {#datatype}
*   [&lt;dataType>](#datatype) -- specifies the data type coming from the source. (In some cases, for example, when reading data from ASCII files, it specifies how the data coming from the source should be stored.)
    *   This is REQUIRED by some dataset types and IGNORED by others. Dataset types that require this for their dataVariables are: EDDGridFromXxxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTableFromNOS, EDDTableFromSOS. Other dataset types ignore this tag because they get the information from the source.  
         
    *   Valid values are any of the standard [ERDDAP™ data types](#data-types) plus boolean (see below). The dataType names are case-sensitive.  
         
###### boolean data {#boolean-data}
*   ["boolean"](#boolean-data) is a special case.
    *   Internally, ERDDAP™ doesn't support a boolean type because booleans can't store missing values and most file types don't support booleans. Also, DAP doesn't support booleans, so there would be no standard way to query boolean variables.
    *   Specifying "boolean" for the dataType in datasets.xml will cause boolean values to be stored and represented as bytes: 0=false, 1=true, 127=missing\_value.
    *   Users can specify constraints by using the numeric values (for example, "isAlive=1").
    *   ERDDAP™ administrators sometimes need to use the "boolean" dataType in datasets.xml to tell ERDDAP™ how to interact with the data source (e.g., to read boolean values from a relational database and convert them to 0, 1, or 127).  
         
*   If you want to change a data variable from the dataType in the source files (for example, short) into some other dataType in the dataset (for example, int), don't use &lt;dataType> to specify what you want. (It works for some types of datasets, but not others.) Instead:
    *   Use &lt;dataType> to specify what is in the files (for example, short).
    *   In the &lt;addAttributes> for the variable, add a [scale\_factor](#scale_factor) attribute with the new dataType (for example, int) and a value of 1, for example,  
```
            <att name="scale\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes}
*   [&lt;addAttributes>](#variable-addattributes) -- defines a set of attributes (*name* = *value*) which are added to the source's attributes for a variable, to make the combined attributes for a variable. This is OPTIONAL.  
    If the variable's [sourceAttributes](#variable-addattributes) or &lt;addAttributes> include [scale\_factor and/or add\_offset](#scale_factor) attributes, their values will be used to unpack the data from the source before distribution to the client. The unpacked variable will be of the same data type (for example, float) as the scale\_factor and add\_offset values.  
        
###### Variable &lt;addAttributes&gt; {#variable-addattributes}
*   [**Variable Attributes / Variable &lt;addAttributes>**](#variable-addattributes) -- &lt;addAttributes> is an OPTIONAL tag within an &lt;axisVariable> or &lt;dataVariable> tag which is used to change the variable's attributes.
    
    *   **Use a variable's &lt;addAttributes> to change the variable's attributes.** ERDDAP™ combines a variable's attributes from the dataset's source (**sourceAttributes**) and the variable's **addAttributes** which you define in datasets.xml (which have priority) to make the variable's "**combinedAttributes**", which are what ERDDAP™ users see. Thus, you can use addAttributes to redefine the values of sourceAttributes, add new attributes, or remove attributes.
    *   See the [**&lt;addAttributes>** information](#addattributes) which applies to global and variable **&lt;addAttributes>**.
    *   ERDDAP™ looks for and uses many of these attributes in various ways. For example, the colorBar values are required to make a variable available via WMS, so that maps can be made with consistent colorBars.
    *   [The longitude, latitude, altitude (or depth), and time variables](#destinationname) get lots of appropriate metadata automatically (for example, [units](#units)).
    *   A sample &lt;addAttributes> for a data variable is:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

    The empty numberOfObservations attribute causes the source numberOfObservations attribute (if any) to be removed from the final, combined list of attributes.
    *   Supplying this information helps ERDDAP™ do a better job and helps users understand the datasets.  
        Good metadata makes a dataset usable.  
        Insufficient metadata makes a dataset useless.  
        Please take the time to do a good job with metadata attributes.
    
###### Comments about variable attributes that are special in ERDDAP:

###### actual\_range {#actual_range}
*   [**actual\_range**](#actual_range) is a RECOMMENDED variable attribute. For example,  

>    &lt;att name="actual\_range" [type="floatList"](#attributetype)\>0.17 23.58&lt;/att>

*   This attribute is from the [CDC COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) and [CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata standards.
*   If present, it MUST be an array of two values of the same data type as the destination data type of the variable, specifying the actual (not the theoretical or the allowed) minimum and maximum values of the data for that variable.
*   If the data is packed with [scale\_factor and/or add\_offset](#scale_factor), actual\_range must have unpacked values and be of the same data type as the unpacked values.
*   For some data sources (for example, all EDDTableFrom...Files datasets), ERDDAP™ determines the actual\_range of each variable and sets the actual\_range attribute. With other data sources (for example, relational databases, Cassandra, DAPPER, Hyrax), it might be troublesome or burdensome for the source to calculate the range, so ERDDAP™ doesn't request it. In this case, it is best if you can set actual\_range (especially for the longitude, latitude, altitude, depth, and time variables) by adding an actual\_range attribute to each variable's [&lt;addAttributes>](#addattributes) for this dataset in datasets.xml, for example,  

>    &lt;att name="actual\_range" [type="doubleList"](#attributetype)\>-180 180&lt;/att>

*   For numeric [time and timestamp variables](#time-units), the values specified should be the relevant source (not destination) numeric values. For example, if the source time values are stored as "days since 1985-01-01", then the actual\_range should be specified in "days since 1985-01-01". And if you want to refer to NOW as the second value for near-real-time data that is periodically updated, you should use NaN . For example, to specify a data range of 1985-01-17 until NOW, use  

>    &lt;att name="actual\_range" [type="doubleList"](#attributetype)\>16 NaN&lt;/att>

*   If actual\_range is known (either by ERDDAP™ calculating it or by you adding it via &lt;addAttributes>), ERDDAP™ will display it to the user on the Data Access Form (*datasetID*.html) and Make A Graph web pages (*datasetID*.graph) for that dataset and use it when generating the FGDC and ISO 19115 metadata. Also, the last 7 days of time's actual\_range are used as the default time subset.
*   If actual\_range is known, users can use the [min() and max() functions](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) in requests, which is often very useful.
*   For all EDDTable... datasets, if actual\_range is known (either by you specifying it or by ERDDAP™ calculating it), ERDDAP™ will be able to quickly reject any requests for data outside that range. For example, if the dataset's lowest time value corresponds to 1985-01-17, then a request for all data from 1985-01-01 through 1985-01-16 will be immediately rejected with the error message "Your query produced no matching results." This makes actual\_range a very important piece of metadata, as it can save ERDDAP™ a lot of effort and save the user a lot of time. And this highlights that the actual\_range values must not be narrower than the data's actual range; otherwise, ERDDAP™ may erroneously say "There is no matching data" when in fact there is relevant data.
*   When a user selects a subset of data and requests a file type that includes metadata (for example, .nc), ERDDAP™ modifies actual\_range in the response file to reflect the subset's range.
*   See also [data\_min and data\_max](#data_min-and-data_max), which are an alternative way to specify the actual\_range. However, these are deprecated now that actual\_range is defined by CF 1.7+.  
         
###### Color Bar Attributes {#color-bar-attributes}
There are several OPTIONAL variable attributes which specify the suggested default attributes for a color bar (used to convert data values into colors on images) for this variable.
*   If present, this information is used as default information by griddap and tabledap whenever you request an image that uses a color bar.
*   For example, when latitude-longitude gridded data is plotted as a coverage on a map, the color bar specifies how the data values are converted to colors.
*   Having these values allows ERDDAP™ to create images which use a consistent color bar across different requests, even when the time or other dimension values vary.
*   These attribute names were created for use in ERDDAP. They are not from a metadata standard.
*   The attributes related to the color bar are:
    *   **colorBarMinimum** specifies the minimum value on the colorBar. For example,  

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\>-5&lt;/att>  

    *   If the data is packed with [scale\_factor and/or add\_offset](#scale_factor), specify the colorBarMinimum as an unpacked value.
    *   Data values lower than colorBarMinimum are represented by the same color as colorBarMinimum values.
    *   The attribute should be of [type="double"](#attributetype), regardless of the data variable's type.
    *   The value is usually a nice round number.
    *   Best practices: We recommend a value slightly higher than the minimum data value.
    *   There is no default value.
*   **colorBarMaximum** specifies the maximum value on the colorBar. For example,  

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\>5&lt;/att>  

    *   If the data is packed with [scale\_factor and/or add\_offset](#scale_factor), specify the colorBarMinimum as an unpacked value.
    *   Data values higher than colorBarMaximum are represented by the same color as colorBarMaximum values.
    *   The attribute should be of [type="double"](#attributetype), regardless of the data variable's type.
    *   The value is usually a nice round number.
    *   Best practices: We recommend a value slightly lower than the maximum data value.
    *   There is no default value.
*   **colorBarPalette** specifies the palette for the colorBar. For example,  
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    *   All ERDDAP™ installations support these standard palettes: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topography, TopographyDepth \[added in v1.74\], WhiteBlack, WhiteBlueBlack, and WhiteRedBlack.
    *   If you have installed [additional palettes](/docs/server-admin/additional-information#palettes), you can refer to one of them.
    *   If this attribute isn't present, the default is BlueWhiteRed if \-1\*colorBarMinimum = colorBarMaximum; otherwise the default is Rainbow.
*   **colorBarScale** specifies the scale for the colorBar. For example, 
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    *   Valid values are Linear and Log.
    *   If the value is Log, colorBarMinimum must be greater than 0.
    *   If this attribute isn't present, the default is Linear.
*   **colorBarContinuous** specifies whether the colorBar has a continuous palette of colors, or whether the colorBar has a few discrete colors. For example,  
    ```
            <att name="colorBarContinuous">false</att>
    ```
    *   Valid values are the strings true and false.
    *   If this attribute isn't present, the default is true.
*   **colorBarNSections** specifies the default number of sections on the colorBar. For example,  
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    *   Valid values are positive integers.
    *   If this attribute isn't present, the default is \-1, which tells ERDDAP™ to pick the number of sections based on the range of the colorBar.  
###### WMS {#wms}
The main requirements for a variable to be accessible via ERDDAP's WMS server are:
*   The dataset must be an EDDGrid... dataset.
*   The data variable MUST be a gridded variable.
*   The data variable MUST have longitude and latitude axis variables. (Other axis variables are OPTIONAL.)
*   There MUST be some longitude values between -180 and 180.
*   The colorBarMinimum and colorBarMaximum attributes MUST be specified. (Other color bar attributes are OPTIONAL.)

###### data\_min and data\_max {#data_min-and-data_max}
*   [**data\_min** and **data\_max**](#data_min-and-data_max) -- These are deprecated variable attributes defined in the World Ocean Circulation Experiment (WOCE) metadata description. For example,  

    >    &lt;att name="data\_min" [type="float"](#attributetype)\>0.17&lt;/att>  
    >    &lt;att name="data\_max" [type="float"](#attributetype)\>23.58&lt;/att>

    *   We recommend that you use [actual\_range](#actual_range), instead of data\_min and data\_max, because actual\_range is now defined by the CF specification.
    *   If present, they must be of the same data type as the destination data type of the variable, and specify the actual (not the theoretical or the allowed) minimum and maximum values of the data for that variable.
    *   If the data is packed with [scale\_factor and/or add\_offset](#scale_factor), data\_min and data\_max must be unpacked values using the unpacked data type.  
         
###### variable drawLandMask {#variable-drawlandmask}
*   [**drawLandMask**](#variable-drawlandmask) -- This is an OPTIONAL variable attribute used by ERDDAP™ (and no metadata standards) which specifies the default value for the "Draw Land Mask" option on the dataset's Make A Graph form (*datasetID*.graph) and for the &.land parameter in a URL requesting a map of the data. For example,  
    ```
        <att name="drawLandMask">under</att>  
    ```
    See the [drawLandMask overview](#drawlandmask).
###### Encoding {#encoding}
*   [**\_Encoding**](#encoding)
    *   This attribute may only be used with String variables .
    *   This attribute is strongly recommended.
    *   This attribute is from the [NetCDF User's Guide (NUG)](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    *   Internally in ERDDAP™, Strings are a sequence of 2-byte characters that use the [Unicode UCS-2 character set](https://en.wikipedia.org/wiki/UTF-16).
    *   Many file types only support 1-byte characters in Strings and thus need this attribute to identify an associated  
        [charset (AKA code page)](https://en.wikipedia.org/wiki/Code_page) which defines how to map the 256 possible values to a set of 256 characters drawn from the UCS-2 character set and/or the encoding system, e.g., [UTF-8](https://en.wikipedia.org/wiki/UTF-8) (which requires between 1 and 4 bytes per character).
    *   Values for \_Encoding are case-insensitive.
    *   In theory, ERDDAP™ could support \_Encoding identifiers from [this IANA list](https://www.iana.org/assignments/character-sets/character-sets.xhtml), but in practice, ERDDAP™ currently just supports
        *   ISO-8859-1 (note that it has dashes, not underscores), which has the advantage that it is identical to the first 256 characters of Unicode, and
        *   UTF-8.
    *   When reading source files, the default value is ISO-8859-1, except for netcdf-4 files, where the default is UTF-8.
    *   This is an ongoing troublesome issue because many source files use charsets or encodings that are different from ISO-8859-1, but don't identify the charset or encoding. For example, many source data files have some metadata copied and pasted from Microsoft Word on Windows and thus have fancy hyphens and apostrophes from a Windows-specific charset instead of ASCII hyphens and apostrophes. These characters then show up as odd characters or '?' in ERDDAP.  
         
###### fileAccessBaseUrl {#fileaccessbaseurl}
*   **[fileAccessBaseUrl](#fileaccessbaseurl) and fileAccessSuffix** are very rarely used attributes that are not from any standard. If an EDDTable column has filenames of web accessible files (e.g., image, video, or audio files), you can add  
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
to specify the base URL (ending with / ) needed to make the filenames into complete URLs. In unusual cases, such as when a column has references to .png files but the values lack ".png", you can add  
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(for example, &lt;att name="fileAccessSuffix">.png&lt;/a>)  
to specify a suffix to be added to make the filenames into complete URLs. Then for .htmlTable responses, ERDDAP™ will show the filename as a link to the full URL (the baseUrl plus the filename plus the suffix).

If you want ERDDAP™ to serve the related files, make a separate [EDDTableFromFileNames](#eddtablefromfilenames) dataset for those files (it may be a private dataset).
    
###### fileAccessArchiveUrl {#fileaccessarchiveurl}
*   [**fileAccessArchiveUrl**](#fileaccessarchiveurl) is a very rarely used attribute that is not from any standard. If an EDDTable column has filenames of web accessible files (e.g., image, video, or audio files) which are accessible via an archive (e.g., .zip file) accessible via a URL, use &lt;att name="fileAccessArchiveUrl">*theURL*&lt;/att> to specify the URL for the archive.
    
    If you want ERDDAP™ to serve the archive file, make a separate [EDDTableFromFileNames](#eddtablefromfilenames) dataset for that file (it may be a private dataset).
    
###### ioos\_category {#ioos_category}
*   [**ioos\_category**](#ioos_category) -- This is a REQUIRED variable attribute if &lt;variablesMustHaveIoosCategory> is set to true (the default) in [setup.xml](/docs/server-admin/deploy-install#setupxml); otherwise, it is OPTIONAL.  
    For example, &lt;att name="ioos\_category">Salinity&lt;/att>  
    The categories are from [NOAA's Integrated Ocean Observing System (IOOS)](https://ioos.noaa.gov/).
    
    *   (As of writing this) we aren't aware of formal definitions of these names.
    *   The core names are from Zdenka Willis' .ppt "Integrated Ocean Observing System (IOOS) NOAA's Approach to Building an Initial Operating Capability" and from the [US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf) (page 1-5).
    *   It is likely that this list will be revised in the future. If you have requests, please email Chris.John at noaa.gov.
    *   ERDDAP™ supports a larger list of categories than IOOS does because Bob Simons added additional names (mostly based on the names of scientific fields, for example, Biology, Ecology, Meteorology, Statistics, Taxonomy) for other types of data.
    *   The current valid values in ERDDAP™ are Bathymetry, Biology, Bottom Character, CO2, Colored Dissolved Organic Matter, Contaminants, Currents, Dissolved Nutrients, Dissolved O2, Ecology, Fish Abundance, Fish Species, Heat Flux, Hydrology, Ice Distribution, Identifier, Location, Meteorology, Ocean Color, Optical Properties, Other, Pathogens, Phytoplankton Species, Pressure, Productivity, Quality, Salinity, Sea Level, Statistics, Stream Flow, Surface Waves, Taxonomy, Temperature, Time, Total Suspended Matter, Unknown, Wind, Zooplankton Species, and Zooplankton Abundance.
    *   There is some overlap and ambiguity between different terms -- do your best.
    *   If you add ioos\_category to the list of &lt;categoryAttributes> in ERDDAP's [setup.xml](/docs/server-admin/deploy-install#setupxml) file, users can easily find datasets with similar data via ERDDAP's "Search for Datasets by Category" on the home page.  
        [Try using ioos\_category to search for datasets of interest.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    *   There was [a discussion about ERDDAP™ and ioos\_category in the ERDDAP™ Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
    You may be tempted to set &lt;variablesMustHaveIoosCategory> to false so that this attribute isn't required. ("Pfft! What's it to me?") Some reasons to leave it set to true (the default) and use ioos\_category are:
    
    *   If setup.xml's &lt;variablesMustHaveIoosCategory> is set to true, [GenerateDatasetsXml](#generatedatasetsxml) always creates/suggests an ioos\_category attribute for each variable in each new dataset. So why not just leave it in?
    *   ERDDAP™ lets users search for datasets of interest by category. ioos\_category is a very useful search category because the ioos\_categories (for example, Temperature) are quite broad. This makes ioos\_category much better for this purpose than, for example, the much finer-grained CF standard\_names (which aren't so good for this purpose because of all the synonyms and slight variations, for example, sea\_surface\_temperature versus sea\_water\_temperature).  
        (Using ioos\_category for this purpose is controlled by &lt;categoryAttributes> in your setup.xml file.)  
        [Try using ioos\_category to search for datasets of interest.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    *   These categories are from [NOAA's Integrated Ocean Observing System (IOOS)](https://ioos.noaa.gov/). These categories are fundamental to IOOS's description of IOOS's mission. If you are in NOAA, supporting ioos\_category is a good One-NOAA thing to do. (Watch this [One NOAA video](https://www.youtube.com/watch?v=nBnCsMYm2yQ) and be inspired!) If you are in some other U.S. or international agency, or work with governmental agencies, or work with some other Ocean Observing System, isn't it a good idea to cooperate with the U.S. IOOS office?
    *   Sooner or later, you may want some other ERDDAP™ to link to your datasets via [EDDGridFromErddap](#eddfromerddap) and [EDDTableFromErddap](#eddfromerddap). If the other ERDDAP™ requires ioos\_category, your datasets must have ioos\_category in order for EDDGridFromErddap and EDDTableFromErddap to work.
    *   It is psychologically much easier to include ioos\_category when you create the dataset (it's just another thing that ERDDAP™ requires to add the dataset to ERDDAP), than to add it after the fact (if you decided to use it in the future).  
         
###### long\_name {#long_name}
*   [**long\_name**](#long_name) ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html), [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standards) is a RECOMMENDED variable attribute in ERDDAP. For example,  
    ```
        <att name="long\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™ uses the long\_name for labeling axes on graphs.
    *   Best practices: Capitalize the words in the long\_name as if it were a title (capitalize the first word and all non-article words). Don't include the units in the long\_name. The long name shouldn't be very long (usually &lt;20 characters), but should be more descriptive than the [destinationName](#destinationname), which is often very concise.
    *   If "long\_name" isn't defined in the variable's [sourceAttributes](#variable-addattributes) or &lt;addAttributes>, ERDDAP™ will generate it by cleaning up the [standard\_name](#standard_name) (if present) or the destinationName.  
         
###### missing\_value {#missing_value}
*   [**missing\_value**](#missing_value) and **\_FillValue** ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) and [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) are variable attributes which describe a number (for example, -9999) which is used to represent a missing value. For example,  

>  &lt;att name="missing\_value" [type="double"](#attributetype)\>-9999&lt;/att>  

For String variables, the default for both is "" (the empty string).  
For numeric variables, the default for both is NaN.
*   ERDDAP™ supports both missing\_value and \_FillValue, since some data sources assign slightly different meanings to them.
*   If present, they should be of the same data type as the variable.
*   If the data is packed with [scale\_factor and/or add\_offset](#scale_factor), the missing\_value and \_FillValue values should be likewise packed. Similarly, for a column with String date/time values that use a local [time\_zone](#time_zone), the missing\_value and \_FillValue values should use the local time zone.
*   If a variable uses these special values, the missing\_value and/or \_FillValue attributes are REQUIRED.
*   For [time and timestamp variables](#time-units) (whether the source is strings or numeric), missing\_values and \_FillValues appear as "" (the empty string) when the time is written as a String and as NaN when the time is written as a double. The source values for missing\_value and \_FillValue will not appear in the variable's metadata.
*   For String variables, ERDDAP™ always converts any missing\_values or \_FillValue data values into "" (the empty string). The source values for missing\_value and \_FillValue will not appear in the variable's metadata.
*   For numeric variables:  
    The missing\_value and \_FillValue will appear in the variable's metadata.  
    For some output data formats, ERDDAP™ will leave these special numbers intact, e.g., you will see -9999.  
    For other output data formats (notably text-like formats like .csv and .htmlTable), ERDDAP™ will replace these special numbers with NaN or "".
*   Some data types have inherent missing value markers that don't need to be explicitly identified with missing\_value or \_FillValue attributes: float and double variables have NaN (Not a Number), String values use the empty string, and char values have character \\uffff (character #65535, which is Unicode's value for Not a Character). Integer data types do not have inherent missing value markers.
*   If an integer variable has a missing value (for example, an empty position in a .csv file), ERDDAP™ will interpret the value as the defined missing\_value or \_FillValue for that variable. If none is defined, ERDDAP™ will interpret the value as the default missing value for that data type, which is always the maximum value which can be held by that data type:  
    127 for byte variables, 32767 for short, 2147483647 for int, 9223372036854775807 for long,  
    255 for ubyte, 65535 for ushort, 4294967295 for uint, and 18446744073709551615 for ulong.
###### ADD \_FillValue ATTRIBUTES? {#add-_fillvalue-attributes}
*   [ADD \_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
    Each time ERDDAP™ loads a dataset, it checks if the variables with integer source data types have a defined missing\_value or \_FillValue attribute. If a variable doesn't, then ERDDAP™ prints a message to the log file (starting with "Add \_FillValue Attribute?") recommending that the ERDDAP™ administrator add a \_FillValue attribute for this variable in datasets.xml. It is very useful for every variable to have a \_FillValue or missing\_value because missing values are always possible, e.g., if a given file in a dataset doesn't have a given variable, ERDDAP™ needs to be able to present that variable as having all missing values for that variable. If you decide a variable should not have a \_FillValue attribute, you can add  
    &lt;att names="\_FillValue">null&lt;/att> instead, which will suppress the message for that datasetID+variable combination in the future.
    
    Each time ERDDAP™ starts up, it collects all of those recommendations into a message which is written to the log file (starting with "ADD \_FillValue ATTRIBUTES?"), emailed to the ERDDAP™ administrator, and written to a CSV data file in the \[bigParentDirectory\]/logs/ directory. If you wish to, you can use the GenerateDatasetsXml program (and the AddFillValueAttributes option) to apply all the suggestions in the CSV file to the datasets.xml file. For any of the datasetID/variable combinations in that file, if you decide there is no need to add the attributed, you can change the attribute to &lt;att names="\_FillValue">null&lt;/att> to suppress the recommendation for that datasetID+variable combination in the future.
    
    This is important!  
    As Bob has often said: it would be bad (and embarrassing) if some of the evidence of global warming was caused by unidentified missing values in the data (e.g., temperatures values of 99 or 127 degree\_C that should have been marked as missing values and thus skewed the mean and/or median statistics higher).

*   The \_FillValue and missing\_value values for a given variable in different source files must be consistent; otherwise, ERDDAP™ will accept files with one set of values and reject all of the other files as "Bad Files". To solve the problem,
    *   If the files are gridded .nc files, you can use [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked).
    *   If the files are tabular data files, you can use EDDTableFrom...Files' [standardizeWhat](#standardizewhat) to tell ERDDAP to standardize the source files as they are read into ERDDAP.
    *   For harder problems, you can use [NcML](#ncml-files) or [NCO](#netcdf-operators-nco) to solve the problem.  
             
###### scale\_factor {#scale_factor}
*   [**scale\_factor**](#scale_factor) (default = 1) and **add\_offset** (default = 0) ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) and [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) are OPTIONAL variable attributes which describe data which is packed in a simpler data type via a simple transformation.
    *   If present, their data type is different from the source data type and describes the data type of the destination values.  
        For example, a data source might have stored float data values with one decimal digit packed as short ints (int16), using scale\_factor = 0.1 and add\_offset = 0. For example,  

    >    &lt;att name="scale\_factor" [type="float"](#attributetype)\>0.1&lt;/att>  
    >    &lt;att name="add\_offset" [type="float"](#attributetype)\>0&lt;/att>  

        In this example, ERDDAP™ would unpack the data and present it to the user as float data values.
    *   If present, ERDDAP™ will extract the values from these attributes, remove the attributes, and automatically unpack the data for the user:  
        destinationValue = sourceValue \* scale\_factor + add\_offset  
        Or, stated another way:  
        unpackedValue = packedValue \* scale\_factor + add\_offset
    *   The scale\_factor and add\_offset values for a given variable in different source files must be consistent; otherwise, ERDDAP™ will accept files with one set of values and reject all of the other files as "Bad Files". To solve the problem,
        *   If the files are gridded .nc files, you can use [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked).
        *   If the files are tabular data files, you can use EDDTableFrom...Files' [standardizeWhat](#standardizewhat) to tell ERDDAP to standardize the source files as they are read into ERDDAP.
        *   For harder problems, you can use [NcML](#ncml-files) or [NCO](#netcdf-operators-nco) to solve the problem.  
             
###### standard\_name {#standard_name}
*   [**standard\_name**](#standard_name) (from the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata standard) is a RECOMMENDED variable attribute in ERDDAP. CF maintains the list of allowed [CF standard names](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). For example,  
    ```
        <att name="standard\_name">eastward\_sea\_water\_velocity</att>
    ```
    *   If you add standard\_name to variables' attributes and add standard\_name to the list of &lt;categoryAttributes> in ERDDAP's [setup.xml](/docs/server-admin/deploy-install#setupxml) file, users can easily find datasets with similar data via ERDDAP's "Search for Datasets by Category" on the home page.
    *   If you specify a CF standard\_name for a variable, the units attribute for the variable doesn't have to be identical to the Canonical Units specified for the standard name in the CF Standard Name table, but the units MUST be convertible to the Canonical Units. For example, all temperature-related CF standard\_names have "K" (Kelvin) as the Canonical Units. So a variable with a temperature-related standard\_name MUST have units of K, degree\_C, degree\_F, or some UDUnits variant of those names, since they are all inter-convertible.
    *   Best practices: Part of the power of [controlled vocabularies](https://en.wikipedia.org/wiki/Controlled_vocabulary) comes from using only the terms in the list. So we recommend sticking to the terms defined in the controlled vocabulary, and we recommend against making up a term if there isn't an appropriate one in the list. If you need additional terms, see if the standards committee will add them to the controlled vocabulary.
    *   standard\_name values are the only CF attribute values which are case sensitive. They are always all lowercase. Starting in ERDDAP™ v1.82, GenerateDatasets will convert uppercase letters to lowercase letters. And when a dataset is loaded in ERDDAP, uppercase letters are silently changed to lowercase letters.  
         
###### time\_precision {#time_precision}
*   time\_precision is an OPTIONAL attribute used by ERDDAP™ (and no metadata standards) for [time and timestamp variables](#time-units), which may be in gridded datasets or tabular datasets, and in axisVariables or dataVariables. For example,  
    ```
        <att name="time\_precision">1970-01-01</att>  
    ```
    time\_precision specifies the precision to be used whenever ERDDAP™ formats the time values from that variable as strings on web pages, including .htmlTable responses. In file formats where ERDDAP™ formats times as strings (for example, .csv and .json), ERDDAP™ only uses the time\_precision-specified format if it includes fractional seconds; otherwise, ERDDAP™ uses the 1970-01-01T00:00:00Z format.
*   Valid values are 1970-01, 1970-01-01, 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (the default), 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00.00Z, 1970-01-01T00:00:00.000Z. \[1970 is not an option because it is a single number, so ERDDAP™ can't know if it is a formatted time string (a year) or if it is some number of seconds since 1970-01-01T00:00:00Z.\]
*   If time\_precision isn't specified or the value isn't matched, the default value will be used.
*   Here, as in other parts of ERDDAP™, any fields of the formatted time that are not displayed are assumed to have the minimum value. For example, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, and 1985-07-01T00:00:00Z are all considered equivalent, although with different levels of precision implied. This matches the [ISO 8601:2004 "extended" Time Format Specification](https://www.iso.org/iso/date_and_time_format).
*   **WARNING:** You should only use a limited time\_precision if **all** of the data values for the variable have only the minimum value for all of the fields that are hidden.
    *   For example, you can use a time\_precision of 1970-01-01 if all of the data values have hour=0, minute=0, and second=0 (for example 2005-03-04T00:00:00Z and 2005-03-05T00:00:00Z).
    *   For example, don't use a time\_precision of 1970-01-01 if there are non-0 hour, minute, or seconds values, (for example 2005-03-05T12:00:00Z) because the non-default hour value wouldn't be displayed. Otherwise, if a user asks for all data with time=2005-03-05, the request will fail unexpectedly.  
             
###### time\_zone {#time_zone}
*   [**time\_zone**](#time_zone)
    *   time\_zone is an OPTIONAL attribute used by ERDDAP™ (and no metadata standards) for [time and timestamp variables](#time-units), which may be in gridded datasets or tabular datasets.
    *   The default is "Zulu" (which is the modern time zone version of GMT).
    *   Background information: "time offsets" (e.g., Pacific Standard Time, -08:00, GMT-8) are fixed, specific, offsets relative to Zulu (GMT). In contrast, "time zones" are the much more complex things that are affected by Daylight Saving (e.g., "US/Pacific"), which have had different rules in different places at different times. The time zones always have names since they can't be summarized by a simple offset value (see the "TZ database names" column in the table at [https://en.wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)). ERDDAP's time\_zone attribute helps you deal with local time data from some time zone (e.g., 1987-03-25T17:32:05 Pacific Time). If you have string or numeric time data with a (fixed) time offset, you should simply adjust the data to Zulu (which is what ERDDAP™ wants) by specifying a different base time in the units attribute (e.g., "hours since 1970-01-01T08:00:00Z", note the T08 to specify the time offset), and always check the results to ensure you get the results you want.
    *   For timestamp variables with source data from Strings, this attribute lets you specify a time zone which leads ERDDAP™ to convert the local-time-zone source times (some in Standard time, some in Daylight Saving time) into Zulu times (which are always in Standard time). The list of valid time zone names is probably identical to the list in the TZ column at [https://en.wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Common US time zones are: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    *   For timestamp variables with numeric source data, you can specify the "time\_zone" attribute, but the value must be "Zulu" or "UTC". If you need support for other time zones, please email Chris.John at noaa.gov .  
         
###### units {#units}
*   [**units**](#units) ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html), [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standard) defines the units of the data values. For example,  
    ```
        <att name="units">degree\_C</att>
    ```
    *   "units" is REQUIRED as either a sourceAttribute or an addAttribute for "time" variables and is STRONGLY RECOMMENDED for other variables whenever appropriate (which is almost always).
    *   In general, we recommend [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\-compatible units which is required by the [COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html) and [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) standards.
    *   Another common standard is [UCUM](https://unitsofmeasure.org/ucum.html) -- the Unified Code for Units of Measure. [OGC](https://www.ogc.org/) services such as [SOS](https://www.ogc.org/standards/sos), [WCS](https://www.ogc.org/standards/wcs), and [WMS](https://www.ogc.org/standards/wms) require UCUM and often refer to UCUM as UOM (Units Of Measure).
    *   We recommend that you use one units standard for all datasets in your ERDDAP. You should tell ERDDAP™ which standard you are using with &lt;units\_standard>, in your [setup.xml](/docs/server-admin/deploy-install#setupxml) file.
    *   The units for a given variable in different source files must be consistent. If you have a collection of data files where one subset of the files uses different units values than one or more other subsets of the files (for example,  
        "days since 1985-01-01" versus "days since 2000-01-01",  
        "degree\_Celsius" versus "deg\_C", or  
        "knots" versus "m/s") you need to find a way to standardize the units values, otherwise, ERDDAP™ will only load one subset of the files. Think about it: if one file has windSpeed units=knots and another has windSpeed units=m/s, then the values from the two files shouldn't be included in the same aggregated dataset.
        *   If the files are gridded .nc files, in many situations you can use [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked).
        *   If the files are tabular data files, in many situations you can use EDDTableFrom...Files' [standardizeWhat](#standardizewhat) to tell ERDDAP to standardize the source files as they are read into ERDDAP.
        *   For harder problems, you can use [NcML](#ncml-files) or [NCO](#netcdf-operators-nco) to solve the problem.
    *   The CF standard section 8.1 says that if a variable's data is packed via [scale\_factor and/or add\_offset](#scale_factor), "The units of a variable should be representative of the unpacked data."
    *   [For time and timestamp variables,](#time-units) either the variable's [sourceAttributes](#variable-addattributes) or &lt;addAttributes> (which takes precedence) MUST have [units](#units) which is either
        
        *   For time axis variables or time data variables with numeric data: [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\-compatible string (with the format *units* since *baseTime*) describing how to interpret source time values (for example, seconds since 1970-01-01T00:00:00Z).
            
        *units* can be any one of:  
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
        Technically, ERDDAP™ does NOT follow the UDUNITS standard when converting "years since" and "months since" time values to "seconds since". The UDUNITS standard defines a year as a fixed, single value: 3.15569259747e7 seconds. And UDUNITS defines a month as year/12. Unfortunately, most/all datasets that we have seen that use "years since" or "months since" clearly intend the values to be calendar years or calendar months. For example, 3 "months since 1970-01-01" is usually intended to mean 1970-04-01. So, ERDDAP™ interprets "years since" and "months since" as calendar years and months, and does not strictly follow the UDUNITS standard.
            
        The *baseTime* must be an ISO 8601:2004(E) formatted date time string (yyyy-MM-dd'T'HH:mm:ssZ, for example, 1970-01-01T00:00:00Z), or some variation of that (for example, with parts missing at the end). ERDDAP™ tries to work with a wide range of variations of that ideal format, for example, "1970-1-1 0:0:0" is supported. If the time zone information is missing, it is assumed to be the Zulu time zone (AKA GMT). Even if another time offset is specified, ERDDAP™ never uses Daylight Saving Time. If the baseTime uses some other format, you must use &lt;addAttributes> to specify a new units string which use a variation of the ISO 8601:2004(E) format (e.g., change days since Jan 1, 1985 into days since 1985-01-01.
        
        You can test ERDDAP's ability to deal with a specific *units* since *baseTime* with ERDDAP's [Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Hopefully, you can plug in a number (the first time value from the data source?) and a units string, click on Convert, and ERDDAP™ will be able to convert it into an ISO 8601:2004(E) formatted date time string. The converter will return an error message if the units string isn't recognizable.

###### String Time Units {#string-time-units}
*   [For the units attribute for time or timestamp data variables with String data,](#string-time-units) you must specify a [java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) pattern (which is mostly compatible with java.text.SimpleDateFormat) which describes how to interpret the string times.
    
    For the commonly used time formats that are variations of the ISO 8601:2004(E) standard format (for example, 2018-01-02T00:00:00Z), you can specify variations of yyyy-MM-dd'T'HH:mm:ssZ, for example, use yyyy-MM-dd if the string time only has a date. For any format that starts with yyyy-M, ERDDAP uses a special parser that is very forgiving of minor variations in the format. The parser can handle time zones in the format 'Z', "UTC", "GMT", ±XX:XX, ±XXXX, and ±XX formats. If parts of the date time are not specified (for example, minutes and seconds), ERDDAP™ assumes the lowest value for that field (e.g., if seconds aren't specified, seconds=0 is assumed).
    
    For all other string time formats, you need to precisely specify a DateTimeFormatter-compatible time format string. Like yyyy-MM-dd'T'HH:mm:ssZ, these format strings are built from characters which identify a specific type of information from the time string, e.g., m means minute-of-hour. If you repeat the format character some number of times, it further refines the meaning, e.g., m means that the value may be specified by any number of digits, mm means that the value must be specified by 2 digits. The Java documentation for DateTimeFormatter is a crude overview and does not make these details clear. So here is a list of format character variations and their meaning within ERDDAP™ (which is sometimes slightly different from Java's DateTimeFormatter):
    
    | Characters | Examples | Meaning |
    | --- | --- | --- |
    | u, y, Y | \-4712, 0, 1, 10, 100, 2018 | a year number, any number of digits. ERDDAP™ treats y (year-of-era) and Y (week-based-year, because this is often mistakenly used instead of y) as u, the [astronomical year number](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Astronomical years are positive or negative integers that don't use the BCE (BC) or CE (AD) era designators: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ... |
    | uuuu, yyyy, YYYY | \-4712, 0000, 0001, 0010, 0100, 2018 | a 4 digit astronomical year number (ignoring any preceding '-') |
    | M   | 1, 01, 12 | a month number, any number of digits (1=January) |
    | MM  | 01, 12 | a 2 digit (zero padded) month number |
    | MMM | Jan, jan, JAN | a 3 letter English month name, case insensitive |
    | MMMM | Jan, jan, JAN, January, january, JANUARY | a 3 letter or full English month name, case insensitive |
    | d   | 1, 01, 31 | a day-of-month number, any number of digits |
    | dd  | 01, 31 | a 2 digit (zero padded) day-of-month. The first 'digit' may be a space. |
    | D   | 1, 001, 366 | day-of-year, any number of digits, 001=Jan 1 |
    | DDD | 001, 366 | day-of-year, 3 digits, 001=Jan 1 |
    | EEE | thu, THU, Thu | a 3 letter day-of-week, value is ignored when parsing |
    | EEEE | thu, THU, Thu, thursday, THURSDAY, Thursday | a 3 letter or full English day-of-week, case insensitive, value is ignored when parsing |
    | H   | 0, 00, 23 | H hour-of-day (0-23), any number of digits |
    | HH  | 00, 23 | HH hour-of-day (00-23), 2 digits. The first 'digit' may be a space. |
    | a   | am, AM, pm, PM | AM or PM, case-insensitive |
    | h   | 12, 1, 01, 11 | clock-hour-of-am-pm (12, 1, 2, ... 11), any number of digits |
    | hh  | 12, 01, 11 | clock-hour-of-am-pm (12, 1, 2, ... 11), 2 digits. The first 'digit' may be a space. |
    | K   | 0, 1, 11 | hour-of-am-pm (0, 1, ...11), any number of digits |
    | KK  | 00, 01, 11 | hour-of-am-pm, 2 digits |
    | m   | 0, 00, 59 | minute-of-hour, any number of digits |
    | mm  | 00, 59 | minute-of-hour, 2 digits |
    | s   | 0, 00, 59 | second-of-minute, any number of digits |
    | ss  | 00, 59 | second-of-minute, 2 digits |
    | S   | 0, 000, 9, 999 | fraction-of-second, as if following a decimal point, any number of digits |
    | SS  | 00, 99 | hundredths of a second, 2 digits |
    | SSS | 000, 999 | thousands of a second, 3 digits |
    | A   | 0, 0000, 86399999 | millisecond-of-day, any number of digits |
    | AAAAAAAA | 00000000, 86399999 | millisecond-of-day, 8 digits |
    | N   | 0, 00000000000000, 86399999999999 | nanosecond-of-day, any number of digits. In ERDDAP™, this is truncated to nMillis. |
    | NNNNNNNNNNNNNN | 00000000000000, 86399999999999 | nanosecond-of-day, 14 digits. In ERDDAP™ this is truncated to nMillis. |
    | n   | 0, 00000000000, 59999999999 | nanosecond-of-second, any number of digits. In ERDDAP™ this is truncated to nMillis. |
    | nnnnnnnnnnn | 00000000000, 59999999999 | nanosecond-of-second, 11 digits. In ERDDAP™ this is truncated to nMillis. |
    | XXX, ZZZ | Z, -08:00, +01:00 | a time zone with the format 'Z' or ±(2 digit hour offset):(2 digit minute offset). This treats *space* as + (non-standard). ZZZ supporting 'Z' is non-standard but deals with a common user error. |
    | XX, ZZ | Z -0800, +0100 | a time zone with the format 'Z' or ±(2 digit hour offset):(2 digit minute offset). This treats *space* as + (non-standard). ZZ supporting 'Z' is non-standard but deals with a common user error. |
    | X, Z | Z, -08, +01 | a time zone with the format 'Z' or ±(2 digit hour offset):(2 digit minute offset). This treats *space* as + (non-standard). Z supporting 'Z' is non-standard but deals with a common user error. |
    | xxx | \-08:00, +01:00 | a time zone with the format ±(2 digit hour offset):(2 digit minute offset). This treats *space* as + (non-standard). |
    | xx  | \-0800, +0100 | a time zone with the format ±(2 digit hour offset)(2 digit minute offset). This treats *space* as + (non-standard). |
    | x   | \-08, +01 | a time zone with the format ±(2 digit hour offset). This treats *space* as + (non-standard). |
    | '   | 'T', 'Z', 'GMT' | start and end of a series of literal characters |
    | '' (two single quotes) | ''  | two single quotes denotes a literal single quote |
    | \[\] | \[ \] | the start ("\[") and end ("\]") of an optional section. This notation is only supported for literal characters and at the end of the format string. |
    | #, &#123;, &#125; | #, &#123;, &#125; | reserved for future use |
    | G,L,Q,e,c,V,z,O,p |     | These formatting characters are supported by Java's DateTimeFormatter, but currently not supported by ERDDAP. If you need support for them, email Chris.John at noaa.gov . |
    
    Notes:
    
    *   In a date time with punctuation, numeric values may have a variable number of digits (e.g., in the US slash date format "1/2/1985", the month and the date may be 1 or 2 digits) so the format must use 1-letter tokens, e.g., M/d/yyyy, which accept any number of digits for month and date.
    *   If the number of digits for an item is constant, e.g., 01/02/1985, then specify the number of digits in the format, e.g., MM/dd/yyyy for 2-digit month, 2-digit date, and 4 digit year.
    *   These formats are tricky to work with. A given format may work for most, but not all, time strings for a given variable. Always check that the format you specify is working as expected in ERDDAP for all of a variable's time strings.
    *   When possible, GenerateDatasetXml will suggest time format strings.
    *   If you need help generating a format string, please email Chris.John at noaa.gov .

The main time data variable (for tabular datasets) and the main time axis variable (for gridded datasets) are recognized by the [destinationName](#destinationname) time. Their units metadata must be a UDUnits-compatible units string for numeric time values, e.g., "days since 1970-01-01" (for tabular or gridded datasets), or [units suitable for string times](#string-time-units), e.g., "M/d/yyyy" (for tabular datasets).

Different Time Units in Different Gridded .nc Files - If you have a collection of gridded .nc files where, for the time variable, one subset of the files uses different time units than one or more other subsets of the files, you can use [EDDGridFromNcFilesUnpacked](#eddgridfromncfilesunpacked). It converts time values to "seconds since 1970-01-01T00:00:00Z" at a lower level, thereby hiding the differences, so that you can make one dataset from the collection of heterogeneous files.

###### TimeStamp Variables {#timestamp-variables}
[TimeStamp Variables](#timestamp-variables) -- Any other variable (axisVariable or dataVariable, in an EDDGrid or EDDTable dataset) can be a timeStamp variable. Timestamp variables are variables that have time-related units and time data, but have a &lt;destinationName> other than time. TimeStamp variables behave like the main time variable in that they convert the source's time format into "seconds since 1970-01-01T00:00:00Z" and/or ISO 8601:2004(E) format). ERDDAP™ recognizes timeStamp variables by their time-related "[units](#units)" metadata, which must match this regular expression "\[a-zA-Z\]+ +since +\[0-9\].+" (for numeric dateTimes, for example, "seconds since 1970-01-01T00:00:00Z") or be a dateTime format string containing "uuuu", "yyyy" or "YYYY" (for example, "yyyy-MM-dd'T'HH:mm:ssZ"). But please still use the destinationName "time" for the main dateTime variable.

**Always check your work to be sure that the time data that shows up in ERDDAP™ is the correct time data.** Working with time data is always tricky and error prone.

See [more information about time variables](#destinationname).  
ERDDAP™ has a utility to [Convert a Numeric Time to/from a String Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).  
See [How ERDDAP™ Deals with Time](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).  
         
        
###### valid\_range {#valid_range}
*   [**valid\_range**, or **valid\_min** and **valid\_max**](#valid_range) -- These are OPTIONAL variable attributes defined in the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) metadata conventions. For example,  

    >    &lt;att name="valid\_range" [type="floatList"](#attributetype)\>0.0 40.0&lt;/att>  

    or  

    >    &lt;att name="valid\_min" [type="float"](#attributetype)\>0.0&lt;/att>  
    >    &lt;att name="valid\_max" [type="float"](#attributetype)\>40.0&lt;/att>  

    *   If present, they should be of the same data type as the variable, and specify the valid minimum and maximum values of the data for that variable. Users should consider values outside this range to be invalid.
    *   ERDDAP™ does not apply the valid\_range. Said another way: ERDDAP™ does not convert data values outside the valid\_range to the \_FillValue or missing\_value. ERDDAP™ just passes on this metadata and leaves the application up to you.  
        Why? That's what this metadata is for. If the data provider had wanted to, the data provider could have converted the data values outside of the valid\_range to be \_FillValues. ERDDAP™ doesn't second guess the data provider. This approach is safer: if it is later shown that the valid\_range was too narrow or otherwise incorrect, ERDDAP™ won't have obliterated the data.
    *   If the data is packed with [scale\_factor and/or add\_offset](#scale_factor), valid\_range, valid\_min and valid\_max should be the packed data type and values. Since ERDDAP™ applies scale\_factor and add\_offset when it loads the dataset, ERDDAP™ will unpack the valid\_range, valid\_min and valid\_max values so that the destination metadata (shown to users) will indicate the unpacked data type and range.  
        Or, if an unpacked\_valid\_range attribute is present, it will be renamed valid\_range when ERDDAP™ loads the dataset.
##### &lt;removeMVRows&gt; {#removemvrows}
*   [**&lt;removeMVRows>**](#removemvrows) is an OPTIONAL tag within a tag in datasets.xml for EDDTableFromFiles (including all subclasses) datasets, though it is only used for EDDTableFromMultidimNcFiles. It can have a value of true or false. For example, true  
    This removes any block of rows at the end of a group where all the values are missing\_value, \_FillValue, or the CoHort ...Array native missing value (or char=#32 for CharArrays). This is for the CF DSG Multidimensional Array file type and similar files. If true, this does the proper test and so always loads all the max dim variables, so it may take extra time.  
    The default value of is false.  
    Recommendation -- If possible for your dataset, we recommend setting removeMVRows to false. Setting removeMVRows to true can significantly slow down requests, though may be needed for some datasets. 
