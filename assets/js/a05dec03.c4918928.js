"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[6600],{28453:(e,t,a)=>{a.d(t,{R:()=>r,x:()=>o});var s=a(96540);const i={},n=s.createContext(i);function r(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(n.Provider,{value:t},e.children)}},40290:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"server-admin/EDDTableFromEML","title":"EDDTableFromEML","description":"\\\\[This web page will only be of interest to ERDDAP\u2122 administrators who work with EML files.","source":"@site/docs/server-admin/EDDTableFromEML.md","sourceDirName":"server-admin","slug":"/server-admin/EDDTableFromEML","permalink":"/docs/server-admin/EDDTableFromEML","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/EDDTableFromEML.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"EDDTableFromEML","sidebar_position":6},"sidebar":"docSidebar","previous":{"title":"Scaling","permalink":"/docs/server-admin/scaling"},"next":{"title":"displayInfo and displayAttribute","permalink":"/docs/server-admin/display-info"}}');var i=a(74848),n=a(28453);const r={title:"EDDTableFromEML",sidebar_position:6},o="The EDDTableFromEML and EDDTableFromEMLBatch Options in GenerateDatasetsXml",l={},d=[{value:"Questions",id:"questions",level:2},{value:"Design Details",id:"design-details",level:2},{value:"One dataTable Becomes One ERDDAP\u2122 Dataset",id:"one-datatable-becomes-one-erddap-dataset",level:3},{value:"EML versus CF+ACDD",id:"eml-versus-cfacdd",level:3},{value:"Small Changes",id:"small-changes",level:3},{value:"DocBook",id:"docbook",level:3},{value:"Data Files",id:"data-files",level:3},{value:".zip&#39;d Data Files",id:"zipd-data-files",level:3},{value:"StorageType",id:"storagetype",level:3},{value:"Units",id:"units",level:3},{value:"EML version 2.1.1",id:"eml-version-211",level:3},{value:"Issues with the EML Files",id:"issues-with-the-eml-files",level:2},{value:"Separate Date and Time Columns",id:"separate-date-and-time-columns",level:3},{value:"Inconsistent Column Names",id:"inconsistent-column-names",level:3},{value:"Different Column Order",id:"different-column-order",level:3},{value:"Incorrect numHeaderLines",id:"incorrect-numheaderlines",level:3},{value:"numHeaderLines = 0",id:"numheaderlines--0",level:3},{value:"DateTime Format Strings",id:"datetime-format-strings",level:3},{value:"DateTime But No Time Zone",id:"datetime-but-no-time-zone",level:3},{value:"Missing missing_value",id:"missing-missing_value",level:3},{value:"Small Problems",id:"small-problems",level:3},{value:"Invalid Unicode Characters",id:"invalid-unicode-characters",level:3},{value:"Different Column Units](#differentColumnUnits)",id:"different-column-unitsdifferentcolumnunits",level:3},{value:"Different Versions of EML",id:"different-versions-of-eml",level:3},{value:"Trouble Parsing the Data File",id:"trouble-parsing-the-data-file",level:3}];function h(e){const t={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"the-eddtablefromeml-and-eddtablefromemlbatch-options-in-generatedatasetsxml",children:"The EDDTableFromEML and EDDTableFromEMLBatch Options in GenerateDatasetsXml"})}),"\n",(0,i.jsxs)(t.p,{children:["[This web page will only be of interest to ERDDAP\u2122 administrators who work with EML files.",(0,i.jsx)(t.br,{}),"\n","This document was originally created in 2016. It was last edited on 2020-11-30. ]"]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:(0,i.jsx)(t.strong,{children:"ERDDAP\u2122"})})," is a data server that gives users a simple, consistent way to download subsets of gridded and tabular scientific datasets in common file formats and make graphs and maps. ERDDAP\u2122 works with a given dataset as either a group of multidimensional gridded variables (e.g., satellite or model data) or as a database-like table (with a column for each type of information and a row for each observation). ERDDAP\u2122 is Free and Open Source Software, so anyone can ",(0,i.jsx)(t.a,{href:"/docs/server-admin/deploy-install",children:"download and install ERDDAP\u2122"})," to serve their data."]}),"\n",(0,i.jsxs)(t.p,{children:["To add a dataset to an ERDDAP\u2122 installation, the ERDDAP\u2122 administrator must add a chunk of XML describing the dataset to a file called datasets.xml. (There is ",(0,i.jsx)(t.a,{href:"/docs/server-admin/datasets",children:"thorough documentation for datasets.xml"}),".) Although it is possible to generate the chunk of XML for datasets.xml entirely by hand, ERDDAP\u2122 comes with a tool called ",(0,i.jsx)(t.a,{href:"/docs/server-admin/datasets#tools",children:(0,i.jsx)(t.strong,{children:"GenerateDatasetsXml"})})," which can generate the rough draft of the chunk of XML needed for a given dataset based on some source of information about the dataset."]}),"\n",(0,i.jsxs)(t.p,{children:["The first thing GenerateDatasetsXml asks is what type of dataset you want to create. GenerateDatasetsXml has a special option, ",(0,i.jsx)(t.strong,{children:"EDDTableFromEML"}),", which uses the information in an ",(0,i.jsx)(t.a,{href:"https://knb.ecoinformatics.org/external//emlparser/docs/index.html",children:"Ecological Metadata Language (EML)"})," XML file to generate the chunk of XML for datasets.xml to create an ",(0,i.jsx)(t.a,{href:"/docs/server-admin/datasets#eddtablefromasciifiles",children:"EDDTableFromAsciiFiles"})," dataset from each data table in an EML file. This works very well for most EML files, mostly because EML files do an excellent job of storing all of the needed metadata for a dataset in an easy-to-work-with format. The information that GenerateDatasetsXml needs to create the datasets is in the EML file, including the URL for the data file, which GenerateDatasetsXml downloads, parses, and compares to the description in the EML file. (Many groups would do well to switch to EML, which is a great system for documenting any tabular scientific dataset, not just ecological data. And many groups that create XML schemas would do well to use EML as a case study for XML schema that are clear, to the point, not excessively deep (i.e., too many levels), and easy for humans and computers to work with.)"]}),"\n",(0,i.jsx)(t.h2,{id:"questions",children:"Questions"}),"\n",(0,i.jsx)(t.p,{children:"Here are all the questions GenerateDatasetsXml will ask, with comments about how you should answer if you want to process just one EML file or a batch of EML files:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Which EDDType?",(0,i.jsx)(t.br,{}),"\n","If you want to process just one file, answer: EDDTableFromEML",(0,i.jsx)(t.br,{}),"\n","If you want to process a group of files, answer: EDDTableFromEMLBatch"]}),"\n",(0,i.jsxs)(t.li,{children:["Directory to store files?",(0,i.jsx)(t.br,{}),"\n","Enter the name of the directory that will be used to store downloaded EML and/or data files.",(0,i.jsx)(t.br,{}),"\n","If the directory doesn't exist, it will be created."]}),"\n",(0,i.jsxs)(t.li,{children:["(For EDDTableFromEML only) EML URL or local fileName?",(0,i.jsx)(t.br,{}),"\n","Enter the URL or local filename of an EML file."]}),"\n",(0,i.jsxs)(t.li,{children:["(For EDDTableFromEMLBatch only) EML dir (URL or local)?",(0,i.jsx)(t.br,{}),"\n","Enter the name of the directory with the EML files (a URL or a local dir).",(0,i.jsx)(t.br,{}),"\n","For example: ",(0,i.jsx)(t.a,{href:"http://sbc.lternet.edu/data/eml/files/",children:"http://sbc.lternet.edu/data/eml/files/"})]}),"\n",(0,i.jsxs)(t.li,{children:["(For EDDTableFromEMLBatch only) Filename regex?",(0,i.jsx)(t.br,{}),"\n","Enter the regular expression which will be used to identify the desired EML files in the EML directory.",(0,i.jsx)(t.br,{}),"\n","For example: knb-lter-sbc\\.\\d+"]}),"\n",(0,i.jsxs)(t.li,{children:["Use local files if present (true|false)?",(0,i.jsx)(t.br,{}),"\n","Enter true to use the existing local EML files and data files, if they exist.",(0,i.jsx)(t.br,{}),"\n","Enter false to always re-download the EML files and/or data files."]}),"\n",(0,i.jsxs)(t.li,{children:["accessibleTo?",(0,i.jsx)(t.br,{}),"\n","If you want the new datasets to be private datasets in ERDDAP, specify the name of the group(s) that will be allowed access.",(0,i.jsx)(t.br,{}),"\n",'Recommended for LTER groups: combine "lter" plus the group, e.g., lterSbc .',(0,i.jsx)(t.br,{}),"\n",'If you enter "null", there will be no <accessibleTo> tag in the output.',(0,i.jsx)(t.br,{}),"\n","See ",(0,i.jsx)(t.a,{href:"/docs/server-admin/datasets#accessibleto",children:"accessibleTo"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["localTimeZone (e.g., US/Pacific)?",(0,i.jsx)(t.br,{}),"\n","If a time variable indicates that it has local time values, this time zone will be assigned.",(0,i.jsx)(t.br,{}),"\n","This must be a value from the ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"TZ column list of time zone names"}),".",(0,i.jsx)(t.br,{}),"\n",'Note all of the easy-to-use "US/..." names at the end of the list.',(0,i.jsx)(t.br,{}),"\n","If you later find that to be incorrect, you can change the time_zone in the chunk of datasets.xml."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["EML plus ERDDAP\u2122 is a great combination, since ERDDAP\u2122 can give users more direct access to the wealth of ",(0,i.jsx)(t.a,{href:"https://knb.ecoinformatics.org/",children:"Knowledge Network for Biocomplexity (KNB)"})," and ",(0,i.jsx)(t.a,{href:"https://lternet.edu/",children:"Long Term Ecological Research (LTER)"})," data and help those projects meet the US government's ",(0,i.jsx)(t.a,{href:"https://nosc.noaa.gov/EDMC/PD.DSP.php",children:"Public Access to Research Results (PARR) requirements"})," by making the data available via a web service. Also, EML plus ERDDAP\u2122 seems like a great bridge between scientists in the academic / NSF-funded realm and scientists in the federal agency (NOAA, NASA, USGS) realm."]}),"\n",(0,i.jsxs)(t.p,{children:["See our ",(0,i.jsx)(t.a,{href:"/docs/intro#support",children:"section on getting additional support"}),".\n\xa0"]}),"\n",(0,i.jsx)(t.h2,{id:"design-details",children:"Design Details"}),"\n",(0,i.jsxs)(t.p,{children:["Here are the design details of the EDDTableFromEML option in GenerateDatasetsXml.",(0,i.jsx)(t.br,{}),"\n","Some are related to differences in how EML and ERDDAP\u2122 do things and how GenerateDatasetsXml deals with these problems."]}),"\n",(0,i.jsx)(t.h3,{id:"one-datatable-becomes-one-erddap-dataset",children:"One dataTable Becomes One ERDDAP\u2122 Dataset"}),"\n",(0,i.jsxs)(t.p,{children:["One EML file may have multiple <dataTable>s. ERDDAP\u2122 makes one ERDDAP\u2122 dataset per EML dataTable. The datasetID for the dataset is",(0,i.jsx)(t.br,{}),"\n",(0,i.jsx)(t.em,{children:"EMLName"}),"_t",(0,i.jsx)(t.em,{children:"tableNumber"})," (when EMLname is text) or",(0,i.jsx)(t.br,{}),"\n",(0,i.jsx)(t.em,{children:"system_EMLName"}),"_t",(0,i.jsx)(t.em,{children:"tableNumber"})," (when EMLname is a number).",(0,i.jsx)(t.br,{}),"\n","For example, table #1 in the file knb-lter-sbc.28, becomes ERDDAP\u2122 datasetID=knb_lter_sbc_28_t1,",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"eml-versus-cfacdd",children:"EML versus CF+ACDD"}),"\n",(0,i.jsxs)(t.p,{children:["Almost all of the metadata in the EML files gets into ERDDAP, but in a different format. ERDDAP\u2122 uses the ",(0,i.jsx)(t.a,{href:"https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html",children:"CF"})," and ",(0,i.jsx)(t.a,{href:"https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3",children:"ACDD"})," metadata standards. They are complementary metadata systems that use key=value pairs for global metadata and for each variable's metadata.",(0,i.jsx)(t.br,{}),"\n","Yes, the EML representation of the metadata is nicer than the CF+ACDD representation. I'm not suggesting using the CF+ACDD representation as a replacement for the EML. Please think of CF+ACDD as part of the bridge from the EML world to the OPeNDAP/CF/ACDD world.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"small-changes",children:"Small Changes"}),"\n",(0,i.jsxs)(t.p,{children:["ERDDAP\u2122 makes a lot of small changes. For example, ERDDAP\u2122 uses the EML non-DOI alternateIdentifier plus a dataTable number as the ERDDAP\u2122 datasetID, but slightly changes alternateIdentifier to make it a valid variable name in most computer languages, e.g., knb-lter-sbc.33 dataTable #1 becomes knb_lter_sbc_33_t1.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"docbook",children:"DocBook"}),"\n",(0,i.jsxs)(t.p,{children:["EML uses DocBook's markup system to provide structure to blocks of text in EML files. CF and ACDD require that metadata be plain text. So GenerateDatasetsXml converts the marked up text into plain text that looks like the formatted version of the text. The inline tags are sanitized with square brackets, e.g., [emphasized], and left in the plain text.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"data-files",children:"Data Files"}),"\n",(0,i.jsx)(t.p,{children:"Since the EML dataTable includes the URL of the actual data file, GenerateDatasetsXml will:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Download the data file."}),"\n",(0,i.jsx)(t.li,{children:"Store it in the same directory as the EML file."}),"\n",(0,i.jsx)(t.li,{children:"Read the data."}),"\n",(0,i.jsx)(t.li,{children:"Compare the description of the data in the EML with the actual data in the file."}),"\n",(0,i.jsxs)(t.li,{children:["If GenerateDatasetsXml finds differences, it deals with them, or asks the operator if the differences are okay, or returns an error message. The details are in various items below.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"zipd-data-files",children:".zip'd Data Files"}),"\n",(0,i.jsxs)(t.p,{children:["If the referenced data file is a .zip file, it must contain just one file. That file will be used for the ERDDAP\u2122 dataset. If there is more than 1 file. ERDDAP\u2122 will reject that dataset. If needed, this could be modified. (In practice, all SBC LTER zip files have just one data file.)",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"storagetype",children:"StorageType"}),"\n",(0,i.jsxs)(t.p,{children:["If a column's storageType isn't specified, ERDDAP\u2122 uses its best guess based on the data in the data file. This works pretty well.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"units",children:"Units"}),"\n",(0,i.jsxs)(t.p,{children:["ERDDAP\u2122 uses ",(0,i.jsx)(t.a,{href:"https://www.unidata.ucar.edu/software/udunits/",children:"UDUNITS formatting for units"}),". GenerateDatasetsXml is able to convert EML units to UDUNITS cleanly about 95% of the time. The remaining 5% results in a readable description of the units, e.g., \"biomassDensityUnitPerAbundanceUnit\" in EML becomes \"biomass density unit per abundance unit\" in ERDDAP. Technically this isn't allowed. I don't think it's so bad under the circumstances. [If necessary, units that can't be made UDUNITS compatible could be moved to the variable's comment attribute.]",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"eml-version-211",children:"EML version 2.1.1"}),"\n",(0,i.jsxs)(t.p,{children:["This support for EML v2.1.1 files was added to GenerateDatasetsXml in 2016 with the hope that there would be some uptake in the EML community. As of 2020, that has not happened. The ERDDAP\u2122 developers would be happy to add support for more recent versions of EML, but only if the new features will actually be used. Please email erd.data at noaa.gov if you want support for more recent versions of EML and will actually use this feature.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h2,{id:"issues-with-the-eml-files",children:"Issues with the EML Files"}),"\n",(0,i.jsx)(t.p,{children:"There are some issues/problems with the EML files that cause problems when a software client (such as the EDDTableFromEML option in GenerateDatasetsXML) tries to interpret/process the EML files."}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Although there are several issues listed here, they are mostly small, solvable problems. In general, EML is a great system and it has been my pleasure to work with it."}),"\n",(0,i.jsx)(t.li,{children:"These are roughly sorted from worst / most common to least bad / less common."}),"\n",(0,i.jsx)(t.li,{children:"Most are related to small problems in specific EML files (which are not EML's fault)."}),"\n",(0,i.jsx)(t.li,{children:"Most can be fixed by simple changes to the EML file or data file."}),"\n",(0,i.jsx)(t.li,{children:"Given that LTER people are building an EML checker to test the validity of EML files, I have added some suggestions below regarding features that could be added to the checker."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Here are the issues:"}),"\n",(0,i.jsx)(t.h3,{id:"separate-date-and-time-columns",children:"Separate Date and Time Columns"}),"\n",(0,i.jsx)(t.p,{children:"Some data files have separate columns for date and for time, but no unified date+time column. Currently, GenerateDatasetsXml creates a dataset with these separate columns, but it isn't ideal because:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:'It is best if datasets in ERDDAP\u2122 have a combined date+time column called "time".'}),"\n",(0,i.jsx)(t.li,{children:"Often the dataset won't load in ERDDAP\u2122 because the \"time\" column doesn't have date+time data."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"There are two possible solutions:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Edit the source data file to add a new column in the datafile (and describe it in the EML) where the date and time columns are merged into one column. Then rerun GenerateDatasetsXml so it finds the new column."}),"\n",(0,i.jsxs)(t.li,{children:["Use the ",(0,i.jsx)(t.a,{href:"/docs/server-admin/datasets#script-sourcenamesderived-variables",children:"Derived Variables"})," feature in ERDDAP\u2122 to define a new variable in datasets.xml which is created by concatenating the date and the time columns. One of the examples deals specifically with this situation.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"inconsistent-column-names",children:"Inconsistent Column Names"}),"\n",(0,i.jsxs)(t.p,{children:["The EML files list the data file's columns and their names. Unfortunately, they are often different from the column names in the actual data file. Normally, the column order in the EML file is the same as the column order in the data file, even if the names vary slightly, but not always. GenerateDatasetsXml tries to match the column names. When it can't (which is common), it will stop, show you the EML/data filename pairs, and ask if they are correctly aligned. If you enter 's' to skip a table, GeneratedDatasetsXml will print an error message and go on to the next table.",(0,i.jsx)(t.br,{}),"\n","The solution is to change the erroneous column names in the EML file to match the column names in the data file.",(0,i.jsx)(t.br,{}),"\n","\xa0"]}),"\n",(0,i.jsx)(t.h3,{id:"different-column-order",children:"Different Column Order"}),"\n",(0,i.jsx)(t.p,{children:"There are several cases where the EML specified the columns in a different order than they exist in the data file. GenerateDatasetsXml will stop and ask the operator if the matchups are okay or if the dataset should be skipped. If it is skipped, there will be an error message in the results file, e.g.,:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n      datasetID=knb\\_lter\\_sbc\\_17\\_t1\n      dataFile=all\\_fish\\_all\\_years\\_20140903.csv\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        SURVEY\\_TIMING        = notes\n        NOTES                = survey\\_timing\n      --&gt;\n"})}),"\n",(0,i.jsx)(t.p,{children:"The solution is to fix the column order in these EML files so that they match the order in the data files."}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker checked that the columns and column order in the source file match the columns and column order in the EML file."}),"\n",(0,i.jsx)(t.h3,{id:"incorrect-numheaderlines",children:"Incorrect numHeaderLines"}),"\n",(0,i.jsx)(t.p,{children:"Several dataTables incorrectly state numHeaderLines=1, e.g., ...sbc.4011. This causes ERDDAP\u2122 to read the first line of data as the column names. I tried to manually SKIP all of these dataTables. They are obvious because the unmatched source col names are all data values. And if there are files that incorrectly have numHeaderLines=0, my system doesn't make it obvious. Here's an example from the SBC LTER failures file:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n       datasetID=knb\\_lter\\_sbc\\_3017\\_t1\n      dataFile=MC06\\_allyears\\_2012-03-03.txt\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        2008-10-01T00:00     = timestamp\\_local\n        2008-10-01T07:00     = timestamp\\_UTC\n        2.27                 = discharge\\_lps\n        -999.0               = water\\_temperature\\_celsius\n      --&gt;\n"})}),"\n",(0,i.jsx)(t.p,{children:"So the error may appear as if GenerateDatasetsXml thinks that the first line with data in the file (e.g., with 2008-10-01T00:00 etc.) is the line with column names (as if 2008-10-01T00:00 were a column name)."}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker checked the numHeaderLines value."}),"\n",(0,i.jsx)(t.h3,{id:"numheaderlines--0",children:"numHeaderLines = 0"}),"\n",(0,i.jsx)(t.p,{children:"Some source files don't have column names. ERDDAP\u2122 accepts that if the EML describes the same number of columns."}),"\n",(0,i.jsx)(t.p,{children:"In my opinion: this seems very dangerous. There could be columns in a different order or with different units (see below) and there is no way to catch those problems. It is much better if all ASCII data files have a row with column names."}),"\n",(0,i.jsx)(t.h3,{id:"datetime-format-strings",children:"DateTime Format Strings"}),"\n",(0,i.jsxs)(t.p,{children:["EML has a standard way to describe date time formats. but there is considerable variation in its use in EML files. (I was previously wrong about this. I see the EML documentation for formatString which appears to match the ",(0,i.jsx)(t.a,{href:"https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html",children:"Java DateTimeFormatter specification"}),", but which lacks the important guidelines about its use, with the result that formatString is often/usually improperly used.) There are several instances with incorrect case, and/or incorrect duplication of a letter, and/or non-standard formatting. That puts an unreasonable burden on clients, especially software clients like GenerateDatasetsXml. GenerateDatasetsXml tries to convert the incorrectly defined formats in the EML files into",(0,i.jsx)(t.br,{}),"\n",(0,i.jsx)(t.a,{href:"/docs/server-admin/datasets#string-time-units",children:"the date/time format that ERDDAP\u2122 requires"}),", which is almost identical to for Java/Joda time format specification, but is slightly more forgiving."]}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker required strict adherence to the Java/Joda/ERDDAP time units specification and verified that date time values in the data table could be parsed correctly with the specified format."}),"\n",(0,i.jsx)(t.h3,{id:"datetime-but-no-time-zone",children:"DateTime But No Time Zone"}),"\n",(0,i.jsx)(t.p,{children:'GenerateDatasetsXml looks for a column with dateTime and a specified time zone (either Zulu: from time units ending in \'Z\' or a column name or attribute definition that includes "gmt" or "utc", or local: from "local" in the column name or attribute definition). Also acceptable is a file with a date column but no time column. Also acceptable is a file with no date or time information.'}),"\n",(0,i.jsx)(t.p,{children:'GenerateDatasetsXml treats all "local" times as being from the time zone which you can specify for a given batch of files, e.g., for SBC LTER, use US/Pacific. The information is sometimes in the comments, but not in a form that is easy for a computer program to figure out.'}),"\n",(0,i.jsx)(t.p,{children:'Files that don\'t meet this criteria are rejected with the message "NO GOOD DATE(TIME) VARIABLE". Common problems are:'}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"There is a column with dates and a column with times, but not dateTime column."}),"\n",(0,i.jsx)(t.li,{children:"There are time units, but the time zone isn't specified."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["Other comments:",(0,i.jsx)(t.br,{}),"\n",'If there is a good date+time with time zone column, that column will be named "time" in ERDDAP. ERDDAP\u2122 requires that time column data be understandable/convertible to Zulu/UTC/GMT time zone dateTimes. [My belief is: using local times and different date/time formats (2-digit years! mm/dd/yy vs dd/mm/yy vs ... ) in data files forces the end user to do complicated conversions to Zulu time in order to compare data from one dataset with data from another. So ERDDAP\u2122 standardizes all time data: For string times, ERDDAP\u2122 always uses the ISO 8601:2004(E) standard format, for example, 1985-01-02T00:00:00Z. For numeric times, ERDDAP\u2122 always uses "seconds since 1970-01-01T00:00:00Z". ERDDAP\u2122 always uses the Zulu (UTC, GMT) time zone to remove the difficulties of working with different time zones and standard time versus daylight saving time. So GenerateDatasetsXml seeks an EML dataTable column with date+time Zulu. This is hard because EML doesn\'t use a formal vocabulary/system (like ',(0,i.jsx)(t.a,{href:"https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html",children:"Java/Joda time format"}),") for specifying the dataTime format:",(0,i.jsx)(t.br,{}),"\n",'If there is a col with numeric time values (e.g., Matlab times) and Zulu timezone (or just dates, with no time columns), it is used as "time".',(0,i.jsx)(t.br,{}),"\n",'If there is a col with date and time data, using the Zulu time zone, it is used as "time" and any other date or time column is removed.',(0,i.jsx)(t.br,{}),"\n",'Else if a col with just date information is found, it is used as the "time" variable (with no time zone).',(0,i.jsx)(t.br,{}),"\n","If there is a data column and a time column and no combined dateTime column, the dataset is REJECTED \u2014 but the dataset could be made usable by adding a combined dateTime column (preferably, Zulu time zone) to the datafile and adding its description in the EML file.",(0,i.jsx)(t.br,{}),"\n","EXAMPLE from SBC LTER: ",(0,i.jsx)(t.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/"})," dataTable #2."]}),"\n",(0,i.jsxs)(t.p,{children:["It would be nice if EML/LTER required the inclusion of a column with Zulu (UTC, GMT) time zone times in all relevant source data files. Next best is to add a system to EML to specify a time_zone attribute using standard names (from the ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"TZ column"}),")."]}),"\n",(0,i.jsx)(t.h3,{id:"missing-missing_value",children:"Missing missing_value"}),"\n",(0,i.jsx)(t.p,{children:"Some columns use a missing_value but don't list it in the EML metadata, e.g., precipitation_mm in knb-lter-sbc.5011 uses -999. If no missing value is specified in the EML, GenerateDatasetsXml automatically searches for common missing values (e.g., 99, -99, 999, -999, 9999, -9999, etc) and creates that metadata. But other missing missing_values are not caught."}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker looked for missing missing_values."}),"\n",(0,i.jsx)(t.h3,{id:"small-problems",children:"Small Problems"}),"\n",(0,i.jsx)(t.p,{children:"There are a lot of small problems (spelling, punctuation) which will probably only be found by a human inspecting each dataset."}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker looked for spelling and grammatical errors. This is a difficult problem because words in science are often flagged by spell checkers. Human editing is probably needed."}),"\n",(0,i.jsx)(t.h3,{id:"invalid-unicode-characters",children:"Invalid Unicode Characters"}),"\n",(0,i.jsx)(t.p,{children:"Some of the EML content contains invalid Unicode characters. These are probably characters from the Windows charset that were incorrectly copied and pasted into the UTF-8 EML files. GenerateDatasetsXml sanitizes these characters to e.g., [#128], so they are easy to search for in the ERDDAP\u2122 datasets.xml file."}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker checked for this. It is easy to find and easy to fix."}),"\n",(0,i.jsx)(t.h3,{id:"different-column-unitsdifferentcolumnunits",children:"Different Column Units](#differentColumnUnits)"}),"\n",(0,i.jsx)(t.p,{children:'Some EML dataTables define columns that are inconsistent with the columns in the data file, notably because they have different units. GenerateDatasetsXml flags these. It is up to the operator to decide if the differences are okay or not. These appear in the failures file as "SKIPPED" dataTables. EXAMPLE in SBC LTER failures file:'}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\n       datasetID=knb\\_lter\\_sbc\\_3\\_t1\n      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv\n      The data file and EML file have different column names.\n      ERDDAP\u2122 would like to equate these pairs of names:\n        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch\n        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch\n      --\x3e\n"})}),"\n",(0,i.jsx)(t.p,{children:"It would be nice if the EML checker checked that the units match. Unfortunately, this is probably impossible to catch and then impossible to resolve without contacting the dataset creator, given that the source file doesn't include units. The discrepancy for the example above was only noticeable because the units were included in the source column name and the EML column name. How many other dataTables have this problem but are undetectable?"}),"\n",(0,i.jsx)(t.h3,{id:"different-versions-of-eml",children:"Different Versions of EML"}),"\n",(0,i.jsx)(t.p,{children:"GenerateDatasetsXml is designed to work with EML 2.1.1. Other versions of EML will work to the extent that they match 2.1.1 or that GenerateDatasetsXml has special code to deal with it. This is a rare problem. When it occurs, the solution is to convert your files to EML 2.1.1, or send the EML file to erd.data at noaa.gov, so I can make changes to GenerateDatasetsXml to deal with the differences."}),"\n",(0,i.jsx)(t.p,{children:"Bob added support for EML files to GenerateDatasetsXml in 2016 with the hope that there would be some uptake in the EML community. As of 2020, that has not happened. Bob is happy to add support for more recent versions of EML, but only if the new features will actually be used. Please email erd.data at noaa.gov if you want support for more recent versions of EML and will actually use this feature."}),"\n",(0,i.jsx)(t.h3,{id:"trouble-parsing-the-data-file",children:"Trouble Parsing the Data File"}),"\n",(0,i.jsxs)(t.p,{children:['Rarely, a dataTable may be rejected with the error "unexpected number of items on line #120 (observed=52, expected=50)" An error message like this means that a line in the datafile had a different number of values than the other lines. It may be a problem in ERDDAP\u2122 (e.g., not parsing the file correctly) or in the file. EXAMPLE from SBC LTER:',(0,i.jsx)(t.br,{}),"\n",(0,i.jsx)(t.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/"})," dataTable #3, see datafile=LTER_monthly_bottledata_registered_stations_20140429.txt"]})]})}function c(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}}}]);