---
title: "EDDTableFromEML" 
---
# The EDDTableFromEML and EDDTableFromEMLBatch Options in GenerateDatasetsXml

\[This web page will only be of interest to ERDDAP™ administrators who work with EML files.  
This document was originally created in 2016. It was last edited on 2020-11-30. \]

[**ERDDAP™**](https://coastwatch.pfeg.noaa.gov/erddap/index.html) is a data server that gives users a simple, consistent way to download subsets of gridded and tabular scientific datasets in common file formats and make graphs and maps. ERDDAP™ works with a given dataset as either a group of multidimensional gridded variables (e.g., satellite or model data) or as a database-like table (with a column for each type of information and a row for each observation). ERDDAP™ is Free and Open Source Software, so anyone can [download and install ERDDAP™](/docs/server-admin/deploy-install) to serve their data.

To add a dataset to an ERDDAP™ installation, the ERDDAP™ administrator must add a chunk of XML describing the dataset to a file called datasets.xml. (There is [thorough documentation for datasets.xml](/docs/server-admin/datasets).) Although it is possible to generate the chunk of XML for datasets.xml entirely by hand, ERDDAP™ comes with a tool called [**GenerateDatasetsXml**](/docs/server-admin/datasets#tools) which can generate the rough draft of the chunk of XML needed for a given dataset based on some source of information about the dataset.

The first thing GenerateDatasetsXml asks is what type of dataset you want to create. GenerateDatasetsXml has a special option, **EDDTableFromEML**, which uses the information in an [Ecological Metadata Language (EML)](https://knb.ecoinformatics.org/external//emlparser/docs/index.html) XML file to generate the chunk of XML for datasets.xml to create an [EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) dataset from each data table in an EML file. This works very well for most EML files, mostly because EML files do an excellent job of storing all of the needed metadata for a dataset in an easy-to-work-with format. The information that GenerateDatasetsXml needs to create the datasets is in the EML file, including the URL for the data file, which GenerateDatasetsXml downloads, parses, and compares to the description in the EML file. (Many groups would do well to switch to EML, which is a great system for documenting any tabular scientific dataset, not just ecological data. And many groups that create XML schemas would do well to use EML as a case study for XML schema that are clear, to the point, not excessively deep (i.e., too many levels), and easy for humans and computers to work with.)

## Questions {#questions}

Here are all the questions GenerateDatasetsXml will ask, with comments about how you should answer if you want to process just one EML file or a batch of EML files:

*   Which EDDType?  
    If you want to process just one file, answer: EDDTableFromEML  
    If you want to process a group of files, answer: EDDTableFromEMLBatch
*   Directory to store files?  
    Enter the name of the directory that will be used to store downloaded EML and/or data files.  
    If the directory doesn't exist, it will be created.
*   (For EDDTableFromEML only) EML URL or local fileName?  
    Enter the URL or local filename of an EML file.
*   (For EDDTableFromEMLBatch only) EML dir (URL or local)?  
    Enter the name of the directory with the EML files (a URL or a local dir).  
    For example: http://sbc.lternet.edu/data/eml/files/
*   (For EDDTableFromEMLBatch only) Filename regex?  
    Enter the regular expression which will be used to identify the desired EML files in the EML directory.  
    For example: knb-lter-sbc\\.\\d+
*   Use local files if present (true|false)?  
    Enter true to use the existing local EML files and data files, if they exist.  
    Enter false to always re-download the EML files and/or data files.
*   accessibleTo?  
    If you want the new datasets to be private datasets in ERDDAP, specify the name of the group(s) that will be allowed access.  
    Recommended for LTER groups: combine "lter" plus the group, e.g., lterSbc .  
    If you enter "null", there will be no &lt;accessibleTo&gt; tag in the output.  
    See [accessibleTo](/docs/server-admin/datasets#accessibleto).
*   localTimeZone (e.g., US/Pacific)?  
    If a time variable indicates that it has local time values, this time zone will be assigned.  
    This must be a value from the [TZ column list of time zone names](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).  
    Note all of the easy-to-use "US/..." names at the end of the list.  
    If you later find that to be incorrect, you can change the time\_zone in the chunk of datasets.xml.

EML plus ERDDAP™ is a great combination, since ERDDAP™ can give users more direct access to the wealth of [Knowledge Network for Biocomplexity (KNB)](https://knb.ecoinformatics.org/) and [Long Term Ecological Research (LTER)](https://lternet.edu/) data and help those projects meet the US government's [Public Access to Research Results (PARR) requirements](https://nosc.noaa.gov/EDMC/PD.DSP.php) by making the data available via a web service. Also, EML plus ERDDAP™ seems like a great bridge between scientists in the academic / NSF-funded realm and scientists in the federal agency (NOAA, NASA, USGS) realm.

See our [section on getting additional support](/docs/intro#support).
 
## Design Details {#design-details}

Here are the design details of the EDDTableFromEML option in GenerateDatasetsXml.  
Some are related to differences in how EML and ERDDAP™ do things and how GenerateDatasetsXml deals with these problems.

### One dataTable Becomes One ERDDAP™ Dataset {#one-datatable-becomes-one-erddap-dataset}
One EML file may have multiple &lt;dataTable&gt;s. ERDDAP™ makes one ERDDAP™ dataset per EML dataTable. The datasetID for the dataset is  
*EMLName*\_t*tableNumber* (when EMLname is text) or  
*system\_EMLName*\_t*tableNumber* (when EMLname is a number).  
For example, table #1 in the file knb-lter-sbc.28, becomes ERDDAP™ datasetID=knb\_lter\_sbc\_28\_t1,  
     
### EML versus CF+ACDD {#eml-versus-cfacdd}
Almost all of the metadata in the EML files gets into ERDDAP, but in a different format. ERDDAP™ uses the [CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) and [ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) metadata standards. They are complementary metadata systems that use key=value pairs for global metadata and for each variable's metadata.  
Yes, the EML representation of the metadata is nicer than the CF+ACDD representation. I'm not suggesting using the CF+ACDD representation as a replacement for the EML. Please think of CF+ACDD as part of the bridge from the EML world to the OPeNDAP/CF/ACDD world.  
     
### Small Changes {#small-changes}
ERDDAP™ makes a lot of small changes. For example, ERDDAP™ uses the EML non-DOI alternateIdentifier plus a dataTable number as the ERDDAP™ datasetID, but slightly changes alternateIdentifier to make it a valid variable name in most computer languages, e.g., knb-lter-sbc.33 dataTable #1 becomes knb\_lter\_sbc\_33\_t1.  
     
### DocBook {#docbook}
EML uses DocBook's markup system to provide structure to blocks of text in EML files. CF and ACDD require that metadata be plain text. So GenerateDatasetsXml converts the marked up text into plain text that looks like the formatted version of the text. The inline tags are sanitized with square brackets, e.g., \[emphasized\], and left in the plain text.  
     
### Data Files {#data-files}
Since the EML dataTable includes the URL of the actual data file, GenerateDatasetsXml will:
1.  Download the data file.
2.  Store it in the same directory as the EML file.
3.  Read the data.
4.  Compare the description of the data in the EML with the actual data in the file.
5.  If GenerateDatasetsXml finds differences, it deals with them, or asks the operator if the differences are okay, or returns an error message. The details are in various items below.  
         
### .zip'd Data Files {#zipd-data-files}
If the referenced data file is a .zip file, it must contain just one file. That file will be used for the ERDDAP™ dataset. If there is more than 1 file. ERDDAP™ will reject that dataset. If needed, this could be modified. (In practice, all SBC LTER zip files have just one data file.)  
     
### StorageType {#storagetype}
If a column's storageType isn't specified, ERDDAP™ uses its best guess based on the data in the data file. This works pretty well.  
     
### Units {#units}
ERDDAP™ uses [UDUNITS formatting for units](https://www.unidata.ucar.edu/software/udunits/). GenerateDatasetsXml is able to convert EML units to UDUNITS cleanly about 95% of the time. The remaining 5% results in a readable description of the units, e.g., "biomassDensityUnitPerAbundanceUnit" in EML becomes "biomass density unit per abundance unit" in ERDDAP. Technically this isn't allowed. I don't think it's so bad under the circumstances. \[If necessary, units that can't be made UDUNITS compatible could be moved to the variable's comment attribute.\]  
     
### EML version 2.1.1 {#eml-version-211}
This support for EML v2.1.1 files was added to GenerateDatasetsXml in 2016 with the hope that there would be some uptake in the EML community. As of 2020, that has not happened. The ERDDAP™ developers would be happy to add support for more recent versions of EML, but only if the new features will actually be used. Please email erd.data at noaa.gov if you want support for more recent versions of EML and will actually use this feature.  
     

## Issues with the EML Files {#issues-with-the-eml-files}

There are some issues/problems with the EML files that cause problems when a software client (such as the EDDTableFromEML option in GenerateDatasetsXML) tries to interpret/process the EML files.

*   Although there are several issues listed here, they are mostly small, solvable problems. In general, EML is a great system and it has been my pleasure to work with it.
*   These are roughly sorted from worst / most common to least bad / less common.
*   Most are related to small problems in specific EML files (which are not EML's fault).
*   Most can be fixed by simple changes to the EML file or data file.
*   Given that LTER people are building an EML checker to test the validity of EML files, I have added some suggestions below regarding features that could be added to the checker.

Here are the issues:

### Separate Date and Time Columns {#separate-date-and-time-columns}
Some data files have separate columns for date and for time, but no unified date+time column. Currently, GenerateDatasetsXml creates a dataset with these separate columns, but it isn't ideal because:

*   It is best if datasets in ERDDAP™ have a combined date+time column called "time".
*   Often the dataset won't load in ERDDAP™ because the "time" column doesn't have date+time data.

There are two possible solutions:
1.  Edit the source data file to add a new column in the datafile (and describe it in the EML) where the date and time columns are merged into one column. Then rerun GenerateDatasetsXml so it finds the new column.
2.  Use the [Derived Variables](/docs/server-admin/datasets#script-sourcenamesderived-variables) feature in ERDDAP™ to define a new variable in datasets.xml which is created by concatenating the date and the time columns. One of the examples deals specifically with this situation.  
         
### Inconsistent Column Names {#inconsistent-column-names}
The EML files list the data file's columns and their names. Unfortunately, they are often different from the column names in the actual data file. Normally, the column order in the EML file is the same as the column order in the data file, even if the names vary slightly, but not always. GenerateDatasetsXml tries to match the column names. When it can't (which is common), it will stop, show you the EML/data filename pairs, and ask if they are correctly aligned. If you enter 's' to skip a table, GeneratedDatasetsXml will print an error message and go on to the next table.  
The solution is to change the erroneous column names in the EML file to match the column names in the data file.  
     
### Different Column Order {#different-column-order}
There are several cases where the EML specified the columns in a different order than they exist in the data file. GenerateDatasetsXml will stop and ask the operator if the matchups are okay or if the dataset should be skipped. If it is skipped, there will be an error message in the results file, e.g.,:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\_lter\_sbc\_17\_t1
      dataFile=all\_fish\_all\_years\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\_TIMING        = notes
        NOTES                = survey\_timing
      --&gt;
```
The solution is to fix the column order in these EML files so that they match the order in the data files.

It would be nice if the EML checker checked that the columns and column order in the source file match the columns and column order in the EML file.
    
### Incorrect numHeaderLines {#incorrect-numheaderlines}
Several dataTables incorrectly state numHeaderLines=1, e.g., ...sbc.4011. This causes ERDDAP™ to read the first line of data as the column names. I tried to manually SKIP all of these dataTables. They are obvious because the unmatched source col names are all data values. And if there are files that incorrectly have numHeaderLines=0, my system doesn't make it obvious. Here's an example from the SBC LTER failures file:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\_lter\_sbc\_3017\_t1
      dataFile=MC06\_allyears\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\_local
        2008-10-01T07:00     = timestamp\_UTC
        2.27                 = discharge\_lps
        -999.0               = water\_temperature\_celsius
      --&gt;
```
So the error may appear as if GenerateDatasetsXml thinks that the first line with data in the file (e.g., with 2008-10-01T00:00 etc.) is the line with column names (as if 2008-10-01T00:00 were a column name).

It would be nice if the EML checker checked the numHeaderLines value.
    
### numHeaderLines = 0 {#numheaderlines--0}
Some source files don't have column names. ERDDAP™ accepts that if the EML describes the same number of columns.

In my opinion: this seems very dangerous. There could be columns in a different order or with different units (see below) and there is no way to catch those problems. It is much better if all ASCII data files have a row with column names.
    
### DateTime Format Strings {#datetime-format-strings}
EML has a standard way to describe date time formats. but there is considerable variation in its use in EML files. (I was previously wrong about this. I see the EML documentation for formatString which appears to match the [Java DateTimeFormatter specification](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), but which lacks the important guidelines about its use, with the result that formatString is often/usually improperly used.) There are several instances with incorrect case, and/or incorrect duplication of a letter, and/or non-standard formatting. That puts an unreasonable burden on clients, especially software clients like GenerateDatasetsXml. GenerateDatasetsXml tries to convert the incorrectly defined formats in the EML files into  
[the date/time format that ERDDAP™ requires](/docs/server-admin/datasets#string-time-units), which is almost identical to for Java/Joda time format specification, but is slightly more forgiving.

It would be nice if the EML checker required strict adherence to the Java/Joda/ERDDAP time units specification and verified that date time values in the data table could be parsed correctly with the specified format.
    
### DateTime But No Time Zone {#datetime-but-no-time-zone}
GenerateDatasetsXml looks for a column with dateTime and a specified time zone (either Zulu: from time units ending in 'Z' or a column name or attribute definition that includes "gmt" or "utc", or local: from "local" in the column name or attribute definition). Also acceptable is a file with a date column but no time column. Also acceptable is a file with no date or time information.

GenerateDatasetsXml treats all "local" times as being from the time zone which you can specify for a given batch of files, e.g., for SBC LTER, use US/Pacific. The information is sometimes in the comments, but not in a form that is easy for a computer program to figure out.

Files that don't meet this criteria are rejected with the message "NO GOOD DATE(TIME) VARIABLE". Common problems are:

*   There is a column with dates and a column with times, but not dateTime column.
*   There are time units, but the time zone isn't specified.

Other comments:  
If there is a good date+time with time zone column, that column will be named "time" in ERDDAP. ERDDAP™ requires that time column data be understandable/convertible to Zulu/UTC/GMT time zone dateTimes. \[My belief is: using local times and different date/time formats (2-digit years! mm/dd/yy vs dd/mm/yy vs ... ) in data files forces the end user to do complicated conversions to Zulu time in order to compare data from one dataset with data from another. So ERDDAP™ standardizes all time data: For string times, ERDDAP™ always uses the ISO 8601:2004(E) standard format, for example, 1985-01-02T00:00:00Z. For numeric times, ERDDAP™ always uses "seconds since 1970-01-01T00:00:00Z". ERDDAP™ always uses the Zulu (UTC, GMT) time zone to remove the difficulties of working with different time zones and standard time versus daylight saving time. So GenerateDatasetsXml seeks an EML dataTable column with date+time Zulu. This is hard because EML doesn't use a formal vocabulary/system (like [Java/Joda time format](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) for specifying the dataTime format:  
If there is a col with numeric time values (e.g., Matlab times) and Zulu timezone (or just dates, with no time columns), it is used as "time".  
If there is a col with date and time data, using the Zulu time zone, it is used as "time" and any other date or time column is removed.  
Else if a col with just date information is found, it is used as the "time" variable (with no time zone).  
If there is a data column and a time column and no combined dateTime column, the dataset is REJECTED — but the dataset could be made usable by adding a combined dateTime column (preferably, Zulu time zone) to the datafile and adding its description in the EML file.  
EXAMPLE from SBC LTER: [https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\_2018\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable #2.

It would be nice if EML/LTER required the inclusion of a column with Zulu (UTC, GMT) time zone times in all relevant source data files. Next best is to add a system to EML to specify a time\_zone attribute using standard names (from the [TZ column](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)).
    
### Missing missing\_value {#missing-missing_value}
Some columns use a missing\_value but don't list it in the EML metadata, e.g., precipitation\_mm in knb-lter-sbc.5011 uses -999. If no missing value is specified in the EML, GenerateDatasetsXml automatically searches for common missing values (e.g., 99, -99, 999, -999, 9999, -9999, etc) and creates that metadata. But other missing missing\_values are not caught.

It would be nice if the EML checker looked for missing missing\_values.
    
### Small Problems {#small-problems}
There are a lot of small problems (spelling, punctuation) which will probably only be found by a human inspecting each dataset.

It would be nice if the EML checker looked for spelling and grammatical errors. This is a difficult problem because words in science are often flagged by spell checkers. Human editing is probably needed.
    
### Invalid Unicode Characters {#invalid-unicode-characters}
Some of the EML content contains invalid Unicode characters. These are probably characters from the Windows charset that were incorrectly copied and pasted into the UTF-8 EML files. GenerateDatasetsXml sanitizes these characters to e.g., \[#128\], so they are easy to search for in the ERDDAP™ datasets.xml file.

It would be nice if the EML checker checked for this. It is easy to find and easy to fix.
    
### Different Column Units](#differentColumnUnits) {#different-column-unitsdifferentcolumnunits}
Some EML dataTables define columns that are inconsistent with the columns in the data file, notably because they have different units. GenerateDatasetsXml flags these. It is up to the operator to decide if the differences are okay or not. These appear in the failures file as "SKIPPED" dataTables. EXAMPLE in SBC LTER failures file:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\_lter\_sbc\_3\_t1
      dataFile=SBCFC\_Precip\_Daily\_active\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\_Precipitation\_Total\_mm = Daily\_Precipitation\_Total\_inch
        Flag\_Daily\_Precipitation\_Total\_mm = Flag\_Daily\_Precipitation\_Total\_inch
      -->
```
It would be nice if the EML checker checked that the units match. Unfortunately, this is probably impossible to catch and then impossible to resolve without contacting the dataset creator, given that the source file doesn't include units. The discrepancy for the example above was only noticeable because the units were included in the source column name and the EML column name. How many other dataTables have this problem but are undetectable?
    
### Different Versions of EML {#different-versions-of-eml}
GenerateDatasetsXml is designed to work with EML 2.1.1. Other versions of EML will work to the extent that they match 2.1.1 or that GenerateDatasetsXml has special code to deal with it. This is a rare problem. When it occurs, the solution is to convert your files to EML 2.1.1, or send the EML file to erd.data at noaa.gov, so I can make changes to GenerateDatasetsXml to deal with the differences.

Bob added support for EML files to GenerateDatasetsXml in 2016 with the hope that there would be some uptake in the EML community. As of 2020, that has not happened. Bob is happy to add support for more recent versions of EML, but only if the new features will actually be used. Please email erd.data at noaa.gov if you want support for more recent versions of EML and will actually use this feature.
    
### Trouble Parsing the Data File {#trouble-parsing-the-data-file}
Rarely, a dataTable may be rejected with the error "unexpected number of items on line #120 (observed=52, expected=50)" An error message like this means that a line in the datafile had a different number of values than the other lines. It may be a problem in ERDDAP™ (e.g., not parsing the file correctly) or in the file. EXAMPLE from SBC LTER:  
[https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\_2018\_erddap/](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/) dataTable #3, see datafile=LTER\_monthly\_bottledata\_registered\_stations\_20140429.txt  
