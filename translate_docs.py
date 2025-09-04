import os
from pathlib import Path
import re
import sys
import argostranslate.package
import argostranslate.translate

# NOTES These are machine translations, and so are inherently imperfect. The use of ERDDAP and
# domain-related jargon makes it even harder. Most of the translated text hasn't even be
# read/proofed by a human.

from_code = "en"

# Download and install Argos Translate package
argostranslate.package.update_package_index()
available_packages = argostranslate.package.get_available_packages()

markdown_formatting_line_start = [
    "# ",
    "## ",
    "### ",
    "#### ",
    "##### ",
    "###### ",
]

markdown_formatting_preserve_preceding_whitespace = [
    "* ",
    "- ",
    # also number.
]

language_code_list  = [
    # "en", # Don't do en->en translation
    "bn",
    "zh", # was "zh-CN"
    "zt", # was "zh-TW"
    "cs",
    "da",
    "nl",
    "fi",
    "fr",
    "de",
    "el",
    #"gu", # not supported in argos
    "hi",
    "hu",
    "id",
    "ga",
    "it",
    "ja",
    "ko",
    #"mr", # not supported in argos
    "nb", # was "no"
    "pl",
    "pt",
    #"pa", # not supported in argos
    "ro",
    "ru",
    "es",
    #"sw", # not supported in argos
    "sv",
    "tl",
    "th",
    "tr",
    "uk",
    "ur",
    #"vi" # not supported in argos
]

dont_translate_strings = [
    # !!!ESSENTIAL: if a short phrase (DAP) is in a long phrase (ERDDAP), the long phrase must come
    # first.
    # main() below has a test for this.
    # phrases in quotes
    "\" since \"",
    
    "\"&amp;units=...\"",
    "\"&C;\"",
    "\"&micro;\"", # otherwise it is often dropped from the translation.   Only used in one place
    # in messages.xml.
    "\"BLANK\"",
    "\"c/s\"",
    "\"CA, Monterey\"",
    "\"Cel\"",
    "\"Coastlines\"",
    "\"comment\"",
    "\"content-encoding\"",
    "\"count\"",
    "\"days since Jan 1, 1900\"",
    "\"deg\"",

    "\"degree\"",
    "\"degree_north\"",
    "\"extended\"",
    "\"farad\"",
    "\"files\"",
    "\"gram\"",
    "\"hours since 0001-01-01\"",
    "\"import\"",
    "\"institution\"",
    "\"J\"",
    "\"joule\"",
    "\"joules\"",
    "\"kg.m2.s-2\"",
    "\"kilo\"",
    "\"LakesAndRivers\"",
    "\"Land\"",
    "\"last\"",
    "\"Linear\"",
    "\"Log\"",
    "\"log\"",
    "\"long_name\"",
    "\"m s-1\"",
    "\"m.s^-1\"",
    "\"meter per second\"",
    "\"meters/second\"",
    "\"mo_g\"",
    "\"months since 1970-01-01\"",
    "\"months since\"",
    "\"Nations\"",
    "\"per\"",
    "\"PER\"",
    "\"Range\"",

    "\"Sea Surface Temperature\"",
    "\"searchFor=wind%20speed\"",
    "\"seconds since\"",
    "\"seconds since 1970-01-01\"",
    "\"seconds since 1970-01-01T00:00:00Z\"",
    "\"since\"",
    "\"SOS\"",
    "\"sos\"",
    "\"sst\"",
    "\"States\"",
    "\"stationID,time/1day,10\"",
    "\"time\"",
    "\"times\"",
    "\"times 1000\"",
    "\"title\"",
    "\"years since\"",
    "'u'",
    "'/'",
    "'*'",
    "'^'",
    "'='",
    # <kbd> was here

    # All psuedo entities (used for param names, proper nouns, substitutions)
    #  MUST be here by themselves
    #  OR in <kbd>&pseudoEntity;</kbd> above
    #  so code in postProcessHtml works correctly.
    # postProcessHtml() REQUIRES that "pseudoEntity" only use [a-zA-Z0-9].
    "&acceptEncodingHtml;",
    "&acceptEncodingHtmlh3tErddapUrl;",
    "&adminContact;",
    "&advancedSearch;",
    "&algorithm;",
    "&bgcolor;",
    "&BroughtToYouBy;",
    "&C;",
    # above is <kbd>&category;</kbd>
    "&convertTimeReference;",
    "&cookiesHelp;",
    "&dataFileTypeInfo1;",
    "&dataFileTypeInfo2;",
    "&descriptionUrl;",
    "&datasetListRef;",
    "&e0;",
    "&EasierAccessToScientificData;",
    "&elevation;",
    "&encodedDefaultPIppQuery;",
    "&erddapIs;",
    "&erddapUrl;",
    "&erddapVersion;",
    "&exceptions;",
    "&externalLinkHtml;",
    "&F;",
    "&FALSE;",
    "&format;",
    "&fromInfo;",
    "&g;",
    "&griddapExample;",
    "&headingType;",
    "&height;",
    "&htmlQueryUrl;",
    "&htmlQueryUrlWithSpaces;",
    "&htmlTooltipImage;",
    "&info;",
    "&initialHelp;",
    "&jsonQueryUrl;",
    "&langCode;",
    "&language;",
    "&layers;",
    "&license;",
    "&likeThis;",
    "&loginInfo;",

    # these <tag>s were gathered by code in main that matches a regex in messages.xml
    
    "&makeAGraphListRef;",
    "&makeAGraphRef;",
    "&nbsp;",
    "&niceProtocol;",
    "&NTU;",
    "&offerValidMinutes;",
    "&partNumberA;",
    "&partNumberB;",
    "&plainLinkExamples1;",
    "&plainLinkExamples2;",
    "&plainLinkExamples3;",
    "&plainLinkExamples4;",
    "&plainLinkExamples5;",
    "&plainLinkExamples6;",
    "&plainLinkExamples7;",
    "&plainLinkExamples8;",
    "&protocolName;",
    "&PSU;",
    "&requestFormatExamplesHtml;",
    "&requestGetCapabilities;",
    "&requestGetMap;",
    "&resultsFormatExamplesHtml;",
    # above is <kbd>&safeEmail;</kbd>
    "&sampleUrl;",
    "&secondPart;",
    # above is <kbd>&searchButton;</kbd>
    "&serviceWMS;",
    "&sheadingType;",
    "&ssUse;",
    "&standardLicense;",
    "&styles;",
    "&subListUrl;",
    "&tabledapExample;",
    "&tagline;",
    "&tEmailAddress;",
    "&tErddapUrl;",
    "&time;",
    "&transparentTRUEFALSE;",
    "&TRUE;",
    "&tTimestamp;",
    "&tWmsGetCapabilities130;",
    "&tWmsOpaqueExample130Replaced;",
    "&tWmsOpaqueExample130;",
    "&tWmsTransparentExample130Replaced;",
    "&tWmsTransparentExample130;",
    "&tYourName;",
    "&unitsStandard;",
    "&variable;",
    "&version;",
    "&versionLink;",
    "&versionResponse;",
    "&versionStringLink;",
    "&versionStringResponse;",
    "&widgetEmailAddress;",
    "&widgetFrequencyOptions;",
    "&widgetGriddedOptions;",
    "&widgetSelectGroup;",
    "&widgetSubmitButton;",
    "&widgetTabularOptions;",
    "&widgetYourName;",
    "&width;",
    "&wmsVersion;",
    "&wmsManyDatasets;",
    "&WMSSEPARATOR;",
    "&WMSSERVER;",

    # things that are never translated
    "@noaa.gov",
    ".bz2",
    ".fileType",
    ".gzip",
    ".gz",
    ".hdf",
    ".htmlTable",
    ".itx",
    ".jsonlCSV1",
    ".jsonlCSV", # must be after the .jsonlCSV1
    ".jsonlKVP",
    ".json", # must be after the longer versions
    ".kml",
    ".mat",
    ".nccsv",
    ".nc", # must be after .nccsv
    ".tar",
    ".tgz",
    ".tsv",
    ".xhtml",
    ".zip",
    ".z",

    # text (proper nouns, parameter names, phrases, etc) that shouldn't be translated
    "1230768000 seconds since 1970-01-01T00:00:00Z",
    "2452952 \"days since -4712-01-01\"",
    "2009-01-21T23:00:00Z",
    "60000=AS=AMERICA SAMOA",
    "64000=FM=FEDERATED STATES OF MICRONESIA",
    "66000=GU=GUAM",
    "68000=MH=MARSHALL ISLANDS",
    "69000=MP=NORTHERN MARIANA ISLANDS",
    "70000=PW=PALAU",
    "72000=PR=PUERTO RICO",
    "74000=UM=U.S. MINOR OUTLYING ISLANDS",
    "78000=VI=VIRGIN ISLANDS OF THE UNITED STATES",
    "actual\_range",
    "addAttributes",
    "add\_offset",
    "ADD \_FillValue ATTRIBUTES",
    "AJAX",
    "algorithm=Nearest",
    "algorithms for oligotrophic oceans: A novel approach",
    "allDatasets",
    "ArcGIS for Server",
    "ArcGIS",
    "Ardour",
    "Audacity",
    "Awesome ERDDAP",
    "axisVariable",
    "based on three-band reflectance difference, J. Geophys.",
    "beginTime",
    "bob dot simons at noaa dot gov",
    "bob.simons at noaa.gov",
    
    "categoryAttributes",
    "centeredTime",

    "COARDS",
    "colorBarMaximum",
    "colorBarMinimum",
    "Conda",
    "content-encoding",
    "contributor\_name",
    "contributor\_role",
    "coverage\_content\_type",
    "creator\_name",
    "creator\_email",
    "creator\_url",
    "curl",
    # "DAP",  is below, after OPeNDAP
    "d, day, days,",
    "datasetID/variable/algorithm/nearby", # before datasetID
    "datasetID",
    "datasets.xml",
    "dataVariable",
    "data\_max",
    "data\_min",
    "date\_created",
    "date\_modified",
    "date\_issued",
    "Davis, J.C. 1986. Statistics and Data Analysis in Geology, 2nd Ed. John Wiley and Sons. New York, New York.",
    "days since 2010-01-01",
    "deflate",
    "degree_C",
    "degree_F",
    "degrees_east",
    "degrees_north",
    "destinationName",
    "DODS",
    "DOI",

    "drawLandMask",
    "Earth Science &amp; Atmosphere &amp; Atmospheric Pressure &amp; Atmospheric Pressure Measurements",
    "Earth Science &amp; Atmosphere &amp; Atmospheric Pressure &amp; Sea Level Pressure",
    "Earth Science &amp; Atmosphere &amp; Atmospheric Pressure &amp; Static Pressure",
    "EDDGrid",
    
    "endTime",
    "ERDDAP™",
    "erddapContentDirectory",
    "featureType",
    "=~tomcat/content/erddap",
    "_tomcat_/content/erddap",
    "_tomcat_\\bin\\startup.bat",
    "_tomcat_\\bin\\setenv.bat",
    "/erddap/outOfDateDatasets.html",
    "outOfDateDatasets.html",
    "/erddap/status.html",
    "ERDDAP", # before ERD and DAP
    "erd dot data at noaa dot gov",
    "erd.data at noaa.gov",
    "ERD",
    "ESPRESSO",
    "ESPreSSO",
    "ESRI .asc",
    "ESRI GeoServices REST",
    "excludedWord",
    "Ferret",
    "FileInfo.com",
    
    "FIPS",
    "GetCapabilities",
    "GetMap",
    "Gimp",
    "GNOME",
    "Google Charts",
    "Google Earth",
    "Google Visualization",
    # "gzip", #is below after x-gzip
    "h, hr, hrs, hour, hours,",
    "HDF",
    
    # "http://127.0.0.1:8080",
    # "https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv",
    # "https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/",
    # "https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html",
    # "https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata",
    # "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html",
    # "https://coastwatch.pfeg.noaa.gov/erddap/index.html",
    # "https://coastwatch.pfeg.noaa.gov",
    # "https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml",
    # "https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml",
    # "https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html",
    # "https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day",
    # "https://oceanwatch.pfeg.noaa.gov",
    "HTTP GET",
    "Hyrax",
    "InverseDistance",
    "IOOS DIF SOS",
    "IOOS Animal Telemetry Network",
    "ioos\_category",
    "infoUrl",
    "IrfanView",
    "Java",
    "java.net.URLEncoder",
    "keywords\_vocabulary",
    "KT\_",
    "Leaflet",
    "long\_name",
    "long_name",
    "m, min, mins, minute, minutes,",
    "mashups",
    "Matlab",
    "maximum=37.0",
    "minimum=32.0",
    "missing\_value",
    "Metadata\_Conventions",
    "mon, mons, month, months,",
    "ms, msec, msecs, millis, millisecond, milliseconds,",
    "NASA's Panoply",
    "National Oceanic and Atmospheric Administration",
    "NCO",
    "Ncview",
    "Nearest, Bilinear, Scaled",
    "NetCDF",
    "NMFS",
    "NOAA",
    "now-7days", # before now-
    "now-",
    "ODV .txt",
    "OGC",
    "OOSTethys",
    "OPeNDAP",
    "DAP", # out of place, so that it is after ERDDAP and OPeNDAP
    "OpenID",
    "OpenLayers",
    "OpenSearch",
    "Oracle",
    "orderByClosest",
    "orderByCount",
    "orderByLimit",
    "orderByMax",
    "orderByMean",
    "orderByMinMax",
    "orderBy", # must be after the longer versions
    "Panoply",
    "Photoshop",
    
    "Practical Salinity Units",
    "processing\_level",
    "protocol=griddap",
    "protocol=tabledap",
    "PSU",
    "publisher\_name",
    "publisher\_email",
    "publisher\_url",
    "Pull",
    "Push",
    "Python",
    "real\_time",
    "Res., 117, C01011, doi:10.1029/2011JC007395.",
    "RESTful", # before REST
    "REST",
    "ROA",
    "RSS",
    "s, sec, secs, second, seconds,",
    "Satellite Application Facility",
    "scale\_factor",
    "Sea Surface Temperature",
    "searchEngine=lucene",
    "shutdown.bat",
    "SOAP+XML",
    "SOS",
    "sourceName",
    "sourceUrl",
    "sst",
    "standard\_name\_vocabulary",
    "standard\_name",
    "stationID",
    "StickX",
    "StickY",
    
    "subsetVariables",
    "Surface Skin Temperature",
    "SWFSC", # before WFS
    "Synthetic Aperture Focusing",
    "tabledap",
    "testOutOfDate",
    "time\_precision",
    "time\_zone",
    "Todd",
    "uDig",
    "UDUNITS",
    "Unidata",
    "URN",
    "valid\_max",
    "valid\_min",
    "valid\_range",
    "WCS",
    "week, weeks,",
    "WFS",
    "wget",
    "Wikipedia",
    "WMS",
    "x-gzip",
    "gzip", # must be after x-gzip
    "yr, yrs, year, or years",
    "yyyy-MM-ddTHH:mm:ssZ", # before yyyy-MM-dd
    "yyyy-MM-dd",
    "Zulu",
    "\*.sh",

    "\\\\uhhh",
    "\\uhhhh",
    "\\\\u*hhhh*",
    "\\u*hhhh*",
    "uhhhh",
    "\\\\r\\\\n",
    "\\\\n",
    "\\r\\n",
    "\\n",
    "\r\n",
    "\\[",
    "\\]",
    "\[",
    "\]",
    "http://",
    "https://",
    "https:",
    "https",
    "http",
    "httpGetRequiredVariables",
    
    "\\d{7}",
    "\\\\uffff",
    "\\uffff",
    "\\\\u0000",
    "\\u0000"
    "=",
    "|", # Used to define tables, needs to be kept as |
]

pre_matcher_dont_translate_strings = [
    "S(\\d{7})\\d{7}\\.L3b.\*",
    "S(\\\\d{7})\\\\d{7}\\\\.L3b.\\\*",
    "\"{0}\"",
    "\"{1}\"",
    "\"{count}\"",
    "\"\\*\\*\"",
    "\"[in_i]\"",
    "\"[todd'U]\"",
    "\"%{vol}\"",
    "\"deg{north}\"",
    "\"s{since 1970-01-01T00:00:00Z}\"",
    # lots of things that shouldn't be translated are within <kbd> and <strong>
    "<kbd>\"long_name=Sea Surface Temperature\"</kbd>",
    "<kbd>{0} : {1}</kbd>",
    "<kbd>{0}</kbd>",
    "<kbd>{1} : {2}</kbd>",
    "<kbd>{41008,41009,41010}</kbd>",
    "<kbd>#1</kbd>",
    # there are some <kbd>&pseudoEntity;</kbd>  The translation system REQUIRES that "pseudoEntity"
    # only use [a-zA-Z0-9].
    "<kbd>&adminEmail;</kbd>",
    "<kbd>&amp;addVariablesWhere(\"<i>attName</i>\",\"<i>attValue</i>\")</kbd>",
    "<kbd>&amp;</kbd>",
    "<kbd>&amp;stationID%3E=%2241004%22</kbd>",
    "<kbd>&amp;stationID&gt;=\"41004\"</kbd>",
    "<kbd>&amp;time&gt;now-7days</kbd>",
    "<kbd>&amp;units(\"UDUNITS\")</kbd>",
    "<kbd>&amp;units(\"UCUM\")</kbd>",
    "<kbd>&category;</kbd>",
    "<kbd>&lt;att name=\"units\"&gt;days since -4712-01-01T00:00:00Z&lt;/att&gt;</kbd>",
    "<kbd>&lt;units_standard&gt;</kbd>",
    "<kbd>&quot;wind speed&quot;</kbd>",
    "<kbd>&quot;datasetID=<i>erd</i>&quot;</kbd>",
    "<kbd>&safeEmail;</kbd>",
    "<kbd>&searchButton;</kbd>",
    "<kbd>(last)</kbd>",
    "<kbd>(unknown)</kbd>",
    "<kbd>--compressed</kbd>",
    "<kbd>-999</kbd>",
    "<kbd>-g</kbd>",
    "<kbd>-o <i>fileDir/fileName.ext</i></kbd>",
    "<kbd>-<i>excludedWord</i></kbd>",
    "<kbd>-&quot;<i>excluded phrase</i>&quot;</kbd>",
    "<kbd>01</kbd>",
    "<kbd>2014</kbd>",
    "<kbd>2020-06-12T06:17:00Z</kbd>",
    "<kbd><i>attName</i>=<i>attValue</i></kbd>",
    "<kbd><i>attName=attValue</i></kbd>",
    "<kbd><i>erddapUrl</i></kbd>",
    "<kbd><i>units</i> since <i>basetime</i></kbd>",
    "<kbd>air_pressure</kbd>",
    "<kbd>algorithm</kbd>",
    "<kbd>altitude</kbd>",
    "<kbd>attribute=value</kbd>",
    "<kbd>AND</kbd>",
    "<kbd>Back</kbd>",
    "<kbd>Bilinear</kbd>",
    "<kbd>Bilinear/4</kbd>",
    "<kbd>bob dot simons at noaa dot gov</kbd>",
    "<kbd>boolean</kbd>",
    "<kbd>Bypass this form</kbd>",
    "<kbd>byte</kbd>",
    "<kbd>Cel</kbd>",
    "<kbd>CMC0.2deg-CMC-L4-GLOB-v2.0</kbd>",
    "<kbd>cmd</kbd>",
    "<kbd>count</kbd>",
    "<kbd>curl --compressed \"<i>erddapUrl</i>\" -o <i>fileDir/fileName#1.ext</i></kbd>",
    "<kbd>curl --compressed -g \"<i>erddapUrl</i>\" -o <i>fileDir/fileName.ext</i></kbd>",
    "<kbd>datasetID</kbd>",
    "<kbd>datasetID/variable/algorithm/nearby</kbd>",
    "<kbd>days since 2010-01-01</kbd>",
    "<kbd>deflate</kbd>",
    "<kbd>degC</kbd>",
    "<kbd>degF</kbd>",
    "<kbd>degK</kbd>",
    "<kbd>degree_C</kbd>",
    "<kbd>degree_F</kbd>",
    "<kbd>degrees_east</kbd>",
    "<kbd>degrees_north</kbd>",
    "<kbd>depth</kbd>",
    "<kbd>double</kbd>",
    "<kbd>File : Open</kbd>",
    "<kbd>File : Save As</kbd>",
    "<kbd>File Type</kbd>",
    "<kbd>File type</kbd>",
    "<kbd>float</kbd>",
    "<kbd>fullName=National Oceanic and Atmospheric Administration</kbd>",
    "<kbd>fullName=National%20Oceanic%20and%20Atmospheric%20Administration</kbd>",
    "<kbd>graph</kbd>",
    "<kbd>Graph Type</kbd>",
    "<kbd>Grid</kbd>",
    "<kbd>HTTP 404 Not-Found</kbd>",
    "<kbd>https://spray.ucsd.edu</kbd>",
    "<kbd>https://www.yourWebSite.com?department=R%26D&amp;action=rerunTheModel</kbd>",
    "<kbd>Identifier</kbd>",
    "<kbd>In 8x</kbd>",
    "<kbd>InverseDistance2</kbd>",
    "<kbd>InverseDistance4</kbd>",
    "<kbd>InverseDistance6</kbd>",
    "<kbd>InverseDistance</kbd>",
    "<kbd>int</kbd>",
    "<kbd>John Smith</kbd>",
    "<kbd>jplMURSST41/analysed_sst/Bilinear/4</kbd>",
    "<kbd>jplMURSST41_analysed_sst_Bilinear_4</kbd>",
    "<kbd>Just generate the URL</kbd>",
    "<kbd>keywords</kbd>",
    "<kbd>last</kbd>",
    # "<kbd>(last)</kbd>" is above
    "<kbd>latitude</kbd>",
    "<kbd>Location</kbd>",
    "<kbd>long</kbd>",
    "<kbd>longitude</kbd>",
    "<kbd>maximum=37.0</kbd>",
    "<kbd>mean</kbd>",
    "<kbd>Mean</kbd>",
    "<kbd>Median</kbd>",
    "<kbd>minimum=32.0</kbd>",
    "<kbd>NaN</kbd>",
    "<kbd>nearby</kbd>",
    "<kbd>Nearest</kbd>",
    "<kbd>No animals were harmed during the collection of this data.</kbd>",
    "<kbd>NOAA NMFS SWFSC</kbd>",
    "<kbd>now-7days</kbd>",
    "<kbd>Ocean Color</kbd>",
    "<kbd>org.ghrsst</kbd>",
    "<kbd>Other</kbd>",
    "<kbd>Point</kbd>",
    "<kbd>Profile</kbd>",
    "<kbd>protocol=griddap</kbd>",
    "<kbd>protocol=tabledap</kbd>",
    "<kbd>Redraw the Graph</kbd>",
    "<kbd>Refine ...</kbd>",
    "<kbd>Scaled</kbd>",
    "<kbd>SD</kbd>",
    "<kbd>sea_water_temperature</kbd>",
    "<kbd>short</kbd>",
    "<kbd>Simons, R.A. 2022. ERDDAP. https://coastwatch.pfeg.noaa.gov/erddap . Monterey, CA: NOAA/NMFS/SWFSC/ERD.</kbd>",
    "<kbd>spee</kbd>",
    "<kbd>speed</kbd>",
    "<kbd>Spray Gliders, Scripps Institution of Oceanography</kbd>",
    "<kbd>[standard]</kbd>",
    "<kbd>STANDARDIZE_UDUNITS=<i>udunitsString</i></kbd>",
    "<kbd>Start:Stop</kbd>",
    "<kbd>Start:Stride:Stop</kbd>",
    "<kbd>Start</kbd>",
    "<kbd>Stop</kbd>",
    "<kbd>Stride</kbd>",
    "<kbd>String</kbd>",
    "<kbd>Submit</kbd>",
    "<kbd>Subset</kbd>",
    "<kbd>Taxonomy</kbd>",
    "<kbd>testOutOfDate</kbd>",
    "<kbd>text=<i>some%20percent-encoded%20text</i></kbd>",
    "<kbd>Time</kbd>",
    "<kbd>time</kbd>",
    "<kbd>time&gt;now-2days</kbd>",
    "<kbd>time&gt;max(time)-2days</kbd>",
    "<kbd>timestamp</kbd>",
    "<kbd>TimeSeries</kbd>",
    "<kbd>TimeSeriesProfile</kbd>",
    "<kbd>title=Spray Gliders, Scripps Institution of Oceanography</kbd>",
    "<kbd>Trajectory</kbd>",
    "<kbd>TrajectoryProfile</kbd>",
    "<kbd>true</kbd>",
    "<kbd>UCUM=<i>ucumString</i></kbd>",
    "<kbd>units=degree_C</kbd>",
    # "<kbd><i>units</i> since <i>basetime</i></kbd>" is above
    "<kbd>Unknown</kbd>",
    "<kbd>URL/action</kbd>",
    "<kbd>variable</kbd>",
    "<kbd>view the URL</kbd>",
    "<kbd>Water Temperature</kbd>",
    "<kbd>waterTemp</kbd>",
    "<kbd>WindSpeed</kbd>",
    "<kbd>wt</kbd>",
    "<kbd>your.name@yourOrganization.org</kbd>",
    "<kbd>yyyy-MM-ddTHH:mm:ssZ</kbd>",
    "<pre>curl --compressed -g \"https://coastwatch.pfeg.noaa.gov/erddap/files/cwwcNDBCMet/nrt/NDBC_41008_met.nc\" -o ndbc/41008.nc</pre>",
    "<pre>curl --compressed \"https://coastwatch.pfeg.noaa.gov/erddap/files/cwwcNDBCMet/nrt/NDBC_{41008,41009,41010}_met.nc\" -o ndbc/#1.nc</pre>",
"&lt;/att&gt;",
    "&lt;addAttributes&gt;",
    "&lt;subsetVariables&gt;",
    "&lt;time_precision&gt;",
    "&lt;units_standard&gt;",
    "&lt;updateUrls&gt;",
    "&lt;",
    "{ }",
    "{east}",
    "{north}",
    "{NTU}",
    "{PSU}",
    "{true}",
    "{west}",
    "( )",
    "(Davis, 1986, eq 5.67, page 367)",
    "(Nephelometric Turbidity Unit)",
    "(OPeN)DAP",
    "(Practical Salinity Units)",
    "[ ]",
    "[standardContact]",
    "[standardDataLicenses]",
    "[standardDisclaimerOfEndorsement]",
    "[standardDisclaimerOfExternalLinks]",
    "[standardPrivacyPolicy]",
    "[standardShortDescriptionHtml]",
    "C., Lee Z., and Franz, B.A. (2012). Chlorophyll-a",
    "Chronological Julian Dates (CJD)",
    "E = &sum;(w Y)/&sum;(w)",
    "encodeURIComponent()",
    "fileType={0}",
    "http<strong>s</strong>",
    "position={1}",
    "orderBy(\"stationID, time\")", # before orderBy
    "orderByClosest(\"stationID, time/2hours\")",
    "orderByCount(\"stationID, time/1day\")",
    "orderByMax(\"stationID, time/1day\")",
    "orderByMax(\"stationID, time/1day, 10\")",
    "orderByMax(\"stationID, time/1day, temperature\")",
    "orderByMinMax(\"stationID, time/1day, temperature\")",
    "<strong>lines</strong>",
    "<strong>linesAndMarkers</strong>",
    "<strong>markers</strong>",
    "<strong>sticks</strong>",
    "<strong>surface</strong>",
    "<strong>vectors</strong>",
]

# For testing
# language_code_list  = [
#    "es",
# ]

def get_file_name(file_path):
    file_path_components = file_path.split('/')
    return file_path_components[-1]

def get_docs_file_path(file_path):
    path = Path(file_path)
    if path.parent.name == "docs":
        return path.name
    else:
        return os.path.join(path.parent.name, path.name)
    
def get_json_path(file_path):
    path = Path(file_path)
    if path.parent.name == "en":
        return path.name
    else:
        return os.path.join(path.parent.name, path.name)

def find_files(src_filepath, extension, filter_filepaths):
    filepath_list = []
    #This for loop uses the os.walk() function to walk through the files and directories
    #and records the filepaths of the files to a list
    for root, dirs, files in os.walk(src_filepath):
        #iterate through the files currently obtained by os.walk() and
        #create the filepath string for that file and add it to the filepath_list list
        for file in files:
            #Checks to see if the root is '.' and changes it to the correct current
            #working directory by calling os.getcwd(). Otherwise root_path will just be the root variable value.
            if root == '.':
                root_path = os.getcwd() + "/"
            else:
                root_path = root
            filepath = root_path + "/" + file
            #If filter_filepaths is not empty, remove any filepaths not contained in the filter list
            if filter_filepaths and filepath not in filter_filepaths:
                continue
            #Appends filepath to filepath_list if filepath does not currently exist in filepath_list
            # Also don't include auto generated documentation (dokka)
            if filepath not in filepath_list and filepath.endswith(extension) and not "dokka" in filepath:
                filepath_list.append(filepath)
    #Return filepath_list        
    return filepath_list

def find_and_install_langauge_package(target):
    package_to_install = next(
        filter(
            lambda x: x.from_code == from_code and x.to_code == target, available_packages
        )
    )
    argostranslate.package.install_from_path(package_to_install.download())

class ImageMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"[!]\[(.*?)\]\((.*?)\)", chunk)

  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
    
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1

  def processMatch(self, processed_line, idx, chunk):
    # before link text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # link text
    processed_line["translate_text"].append(self.match.group(1))
    # text after the link
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "[" +"{legnth-2}" +"]" + "(" + match.group(2) + ")" + "{length-1}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + "![{" + str(len(processed_line["translate_text"]) -2) + "}](" + self.match.group(2) + "){" + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line

class LinkMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"\[((?:[^][]|\[[^]]*\])*)]\(([^)]*?)\)", chunk)

  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
    
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1

  def processMatch(self, processed_line, idx, chunk):
    # before link text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # link text
    processed_line["translate_text"].append(self.match.group(1))
    # text after the link
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "[" +"{legnth-2}" +"]" + "(" + match.group(2) + ")" + "{length-1}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " [{" + str(len(processed_line["translate_text"]) -2) + "}](" + self.match.group(2) + ") {" + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line
  
class TagMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"<(.*?)>", chunk)

  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "<" + match.group(0) + ">" + "{length-1}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " " + self.match.group(0) + " {" + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line

class EscapedTagMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"\&lt\;(.*?)\&gt\;", chunk)

  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "<" + match.group(0) + ">" + "{length-1}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " " + self.match.group(0) + "{" + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line
  
class StarEmphasisMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"\\\*(.*?)\\\*", chunk)
  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # The match text
    processed_line["translate_text"].append(self.match.group(1))
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "*" + {length-1} + "*" + "{length-2}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + "\\*" + "{" + str(len(processed_line["translate_text"]) -2) + "}\\*{"  + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line
  
class BoldMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"\*\*(.*?)\*\*", chunk)

  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # The match text
    processed_line["translate_text"].append(self.match.group(1))
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "**" + {length-1} + "**" + "{length-2}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " **" + "{" + str(len(processed_line["translate_text"]) -2) + "}** {"  + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line

class ItalicMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"\*(.*?)\*", chunk)
  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # The match text
    processed_line["translate_text"].append(self.match.group(1))
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "*" + {length-1} + "*" + "{length-2}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " *" + "{" + str(len(processed_line["translate_text"]) -2) + "}* {"  + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line

class ParenthesisMatcher:
  def getMatch(self, chunk):
    # This is getting the first outermost pair of parenthesis, so if there are nested parenthesis
    # eg. a statement (with a parenthetical [and a link](http://example.com) in it)
    # this matches the outermost paired parenthesis.
    """Finds the outermost matching parentheses in a given text."""
    stack = []
    start_index = -1
    self.start = -1
    self.end = -1
    for i, char in enumerate(chunk):
        if char == '(':
            if not stack:
                start_index = i
            stack.append(i)
        elif char == ')' and stack:
            stack.pop()
            if not stack:
                self.start = start_index
                self.end = i+1
                return # get the earliest "outer" pair
  def getStart(self):
    return self.start
  def getEnd(self):
    return self.end
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.start]
    # The text inside the parenthesis
    processed_line["translate_text"].append(chunk[(self.start+1):(self.end-1)])
    # text after the tag
    processed_line["translate_text"].append(chunk[self.end:])
    # update format {idx} -> {idx} + "*" + {length-1} + "*" + "{length-2}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " (" + "{" + str(len(processed_line["translate_text"]) -2) + "}) {"  + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line
  
class BracesMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"\{(.*?)\}", chunk)
  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "<" + match.group(0) + ">" + "{length-1}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + self.match.group(0) + " {" + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line
  
class UrlMatcher:
  def getMatch(self, chunk):
    self.match = re.search(r"(?:http|https|ftp)://[^ \)<]+(?<![.,?!])", chunk)

  def getStart(self):
    if self.match:
        return self.match.start()
    else:
        return -1
  def getEnd(self):
    if self.match:
        return self.match.end()
    else:
        return -1
  def processMatch(self, processed_line, idx, chunk):
    # before tag text
    processed_line["translate_text"][idx] = chunk[:self.match.start()]
    # text after the tag
    processed_line["translate_text"].append(chunk[self.match.end():])
    # update format {idx} -> {idx} + "<" + match.group(0) + ">" + "{length-1}"
    placeholder = "{"+ str(idx) +"}"
    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + self.match.group(0) + "{" + str(len(processed_line["translate_text"]) -1) + "}")
    return processed_line

markdown_matchers = [
    ImageMatcher(),
    LinkMatcher(),
    TagMatcher(),
    EscapedTagMatcher(),
    StarEmphasisMatcher(),
    BoldMatcher(),
    ItalicMatcher(),
    ParenthesisMatcher(),
    UrlMatcher(),
]
def preprocess_file(text):
    line_info = []
    # {
    #   format: "1. **{0}** *{1}*"
    #   0: "text to be translated"
    #   1: "more text to be translated"
    # }

    # check order:
    # markdown_formatting_line_start
    # markdown_formatting_preserve_preceding_whitespace (also check whitespace + num + '.')
    # markdown links, <a> links and other text within <>
    # dont_translate_strings
    # markdown_text_styling (check for pre and post) (is this one needed?)
    is_code_block = False
    for line in text:
        processed_line = {
            "format": "{0}",
            "translate_text": [line],
        }

        # "---", # frontmatter boundaries
        if processed_line["translate_text"][0].strip() == "---":
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue

        if processed_line["translate_text"][0].strip().startswith("sidebar_position:"):
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue

        if processed_line["translate_text"][0].strip().startswith("title:"):
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue

        # Detect code blocks (start or stop)
        if processed_line["translate_text"][0].strip().startswith("```"):
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            is_code_block = not is_code_block
            continue

        # Don't translate block quote lines
        if processed_line["translate_text"][0].strip().startswith(">"):
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue

        # if in a code block, don't translate
        if is_code_block:
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue
        

        for formatting in markdown_formatting_line_start:
            if processed_line["translate_text"][0].strip().startswith(formatting):
                index = processed_line["translate_text"][0].index(formatting)
                processed_line["format"] = processed_line["translate_text"][0][:(index+len(formatting))] + processed_line["format"]
                processed_line["translate_text"][0] = processed_line["translate_text"][0][(index+len(formatting)):]
                # Handle explicit tags in headers
                matcher = BracesMatcher()
                chunk = processed_line["translate_text"][0]
                best_match = None
                matcher.getMatch(chunk)
                if matcher.getStart() > -1:
                    processed_line = matcher.processMatch(processed_line, 0, chunk)

        if processed_line["translate_text"][0].startswith("title: \""):
            processed_line["format"] = "title: \"{0}\"\n"
            processed_line["translate_text"][0] = processed_line["translate_text"][0][8:-2]

        # only do these checks if we didn't already have formatting on this line.
        if len(processed_line["format"]) == 3:
            for formatting in markdown_formatting_preserve_preceding_whitespace:
                if processed_line["translate_text"][0].strip().startswith(formatting):
                    index = processed_line["translate_text"][0].index(formatting)
                    processed_line["format"] = processed_line["translate_text"][0][:(index+len(formatting))] + processed_line["format"]
                    processed_line["translate_text"][0] = processed_line["translate_text"][0][(index+len(formatting)):]

        # Numbered lists
        if (len(processed_line["format"]) == 3):
            pattern = r"^(\s*\d+\. )"
            match = re.match(pattern, processed_line["translate_text"][0])
            if match:
                formatting = match.group(0)
                processed_line["format"] = formatting + processed_line["format"]
                processed_line["translate_text"][0] = processed_line["translate_text"][0][len(formatting):]

        for no_translate in pre_matcher_dont_translate_strings:
            for idx, chunk in enumerate(processed_line["translate_text"]):
                index = chunk.find(no_translate)
                if index > -1:
                    # If there's more than one, we will find it later in the for loop,
                    # this iterates over chunks that are appended during the iteration
                    processed_line["translate_text"][idx] = chunk[:index]
                    processed_line["translate_text"].append(chunk[index+len(no_translate):])
                    placeholder = "{"+ str(idx) +"}"
                    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + no_translate + "{" + str(len(processed_line["translate_text"]) -1) + "}")

        idx = 0
        while idx < len(processed_line["translate_text"]):
            chunk = processed_line["translate_text"][idx]
            best_match = None
            for matcher in markdown_matchers:
                matcher.getMatch(chunk)
                if matcher.getStart() > -1:
                    if not best_match:
                        best_match = matcher
                    elif matcher.getStart() > -1 and (matcher.getStart() < best_match.getStart() or (matcher.getStart() == best_match.getStart() and matcher.getEnd() > best_match.getEnd())):
                        best_match = matcher
            if best_match:
                processed_line = best_match.processMatch(processed_line, idx, chunk)
                # reprocess this chunk, don't incerment the index
            else:
                idx = idx + 1

        for no_translate in dont_translate_strings:
            for idx, chunk in enumerate(processed_line["translate_text"]):
                index = chunk.find(no_translate)
                if index > -1:
                    # If there's more than one, we will find it later in the for loop,
                    # this iterates over chunks that are appended during the iteration
                    processed_line["translate_text"][idx] = chunk[:index]
                    processed_line["translate_text"].append(chunk[index+len(no_translate):])
                    placeholder = "{"+ str(idx) +"}"
                    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + " " + no_translate + " {" + str(len(processed_line["translate_text"]) -1) + "}")

        line_info.append(processed_line)

    return line_info

def postprocess_line(format, chunks):
    # escape special characters in translation
    for idx, chunk in enumerate(chunks):
        chunks[idx] = chunks[idx].replace('<', '&lt;')
        chunks[idx] = chunks[idx].replace('>', '&gt;')
        chunks[idx] = chunks[idx].replace('!', '&#33;')
        chunks[idx] = chunks[idx].replace('{', '&#123;')
        chunks[idx] = chunks[idx].replace('}', '&#125;')
    index = 0
    end_span = 0
    count = 0
    while index > -1 and end_span > -1:
        index = format.find("{", index)
        end_span = format.find("}", index)
        if index > -1 and end_span > -1:
            chunk_id = format[index+1:end_span]
            if index + 5 > end_span and chunk_id.isdigit() and int(chunk_id) < len(chunks):
                chunk = chunks[int(chunk_id)]
                format = format[0:index] + chunk + format[end_span+1:]
                count = count + 1
                index = index + len(chunk)
            else:
                index = index + 1
    format = fix_invalid_escapes(format)
    if not format.endswith('\n'):
        format = format + "\n"
    return format


def translate_markdown(file_contents, output_file, to_code):
    translated_file = []
    for line in file_contents:
        translated_text = []
        for chunk in line["translate_text"]:
            # Empty or just white space strings, just append.
            if not chunk.strip():
               translated_text.append(chunk)
            else:
                translated_text.append(argostranslate.translate.translate(chunk, from_code=from_code, to_code=to_code))

        translated_file.append(postprocess_line(line["format"], translated_text))
    
    Path(os.path.dirname(output_file)).mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as out_file:
        out_file.writelines(translated_file)

def translate_markdown_all(input_file, i18n_path):
    with open(input_file, 'r', encoding="utf-8") as to_translate:
        file_contents = to_translate.readlines()

        file_contents = preprocess_file(file_contents)
        for lang_code in language_code_list:
            print("translating to language: " + lang_code)
            translate_markdown(file_contents, "i18n/" + lang_code + i18n_path, lang_code)

def preprocess_json_file(lines):
    line_info = []
    json_matches = [
        "{",
        "},",
        "}",
    ]
    for line in lines:
        processed_line = {
            "format": "{0}",
            "translate_text": [line],
        }

        for pattern in json_matches:
            if processed_line["translate_text"][0].strip() == pattern:
                processed_line["format"] = processed_line["translate_text"][0]
                processed_line["translate_text"].clear()
                break
        if not processed_line["translate_text"]:
            line_info.append(processed_line)
            continue

        # if line is "{text}": {
        # don't translate it, treat it as formatting
        match = re.search(r'\".*?\": {', processed_line["translate_text"][0])
        if match:
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue

        # if line is "description": "{text}"
        # don't translate it, treat it as formatting
        match = re.search(r'\"description\": \".*?\"', processed_line["translate_text"][0])
        if match:
            processed_line["format"] = processed_line["translate_text"][0]
            processed_line["translate_text"].clear()
            line_info.append(processed_line)
            continue

        match = re.search(r'\"message\": \"(.*?)\"', processed_line["translate_text"][0])
        if match:
            processed_line["format"] = processed_line["translate_text"][0][:match.start()] + "\"message\": \"{0}\""
            if processed_line["translate_text"][0].endswith(',\n'):
                processed_line["format"] = processed_line["format"] + ',\n'
                processed_line["translate_text"][0] = processed_line["translate_text"][0][match.start()+12:-3]
            else:
                processed_line["format"] = processed_line["format"] + '\n'
                processed_line["translate_text"][0] = processed_line["translate_text"][0][match.start()+12:-2]

        # Handle translation placeholders
        for idx, chunk in enumerate(processed_line["translate_text"]):
            match = re.search(r"{(.*?)}", chunk)
            if match:
                # before tag text
                processed_line["translate_text"][idx] = chunk[:match.start()]
                # text after the tag
                processed_line["translate_text"].append(chunk[match.end():])
                # update format {idx} -> {idx} + "<" + match.group(0) + ">" + "{length-1}"
                placeholder = "{"+ str(idx) +"}"
                processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + match.group(0) + "{" + str(len(processed_line["translate_text"]) -1) + "}")

        # handle html tags
        for idx, chunk in enumerate(processed_line["translate_text"]):
            match = re.search(r"<(.*?)>", chunk)
            if match:
                # before tag text
                processed_line["translate_text"][idx] = chunk[:match.start()]
                # text after the tag
                processed_line["translate_text"].append(chunk[match.end():])
                # update format {idx} -> {idx} + "<" + match.group(0) + ">" + "{length-1}"
                placeholder = "{"+ str(idx) +"}"
                processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + match.group(0) + "{" + str(len(processed_line["translate_text"]) -1) + "}")

        for no_translate in dont_translate_strings:
            for idx, chunk in enumerate(processed_line["translate_text"]):
                index = chunk.find(no_translate)
                if index > -1:
                    # If there's more than one, we will find it later in the for loop,
                    # this iterates over chunks that are appended during the iteration
                    processed_line["translate_text"][idx] = chunk[:index]
                    processed_line["translate_text"].append(chunk[index+len(no_translate):])
                    placeholder = "{"+ str(idx) +"}"
                    processed_line["format"] = processed_line["format"].replace(placeholder, placeholder + no_translate + "{" + str(len(processed_line["translate_text"]) -1) + "}")

        line_info.append(processed_line)
    return line_info

def fix_invalid_escapes(text):
  """Detects and fixes invalid escape sequences by adding an extra backslash.

  Args:
    text: The input string.

  Returns:
    The string with invalid escape sequences fixed.
  """
  pattern = r"(?<!\\)\\([^ntbfr\"'\\\0])"
  while True:
    match = re.search(pattern, text)
    if match:
        text = text[:match.start()] + "\\" + text[match.start():]
    else:
        break
  
  return text

def translate_json(file_contents, output_file, to_code):
    translated_file = []
    for line in file_contents:
        translated_text = []
        for chunk in line["translate_text"]:
            translated_chunk = argostranslate.translate.translate(chunk, from_code=from_code, to_code=to_code)
            # make sure quotes are escapted
            translated_chunk = re.sub(r'(?<!\\)"', r'\\"', translated_chunk)
            translated_text.append(translated_chunk)

        translated_file.append(postprocess_line(line["format"], translated_text))
    
    Path(os.path.dirname(output_file)).mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as out_file:
        out_file.writelines(translated_file)

def translate_json_all(input_file, i18n_path):
    print (input_file)
    with open(input_file, 'r', encoding="utf-8") as to_translate:
        file_contents = to_translate.readlines()

        file_contents = preprocess_json_file(file_contents)
        for lang_code in language_code_list:
            print("translating to language: " + lang_code)
            translate_json(file_contents, "i18n/" + lang_code + "/" + i18n_path, lang_code)

if len(sys.argv) > 1:
    translate_paths = sys.argv[1:]
else:
    translate_paths = []

if 'LANGUAGE_CODE_LIST' in os.environ:
    language_code_list = os.environ['LANGUAGE_CODE_LIST'].lower().split(",")

for lang_code in language_code_list:
    print("Installing language: " + lang_code)
    find_and_install_langauge_package(lang_code)
 
# translate markdown pages
pages_dir = "src/pages"
pages_list = find_files(pages_dir, ".md", translate_paths)
for page in pages_list:
    # page output: i18n/{lang_code}/docusaurus-plugin-content-pages/{pageName}.md
    print(get_file_name(page))
    translate_markdown_all(page, "/docusaurus-plugin-content-pages/" + get_file_name(page))

# translate markdown docs
docs_dir = "docs/"
docs_list = find_files(docs_dir, ".md", translate_paths)
for doc in docs_list:
    # page output: i18n/{lang_code}/docusaurus-plugin-content-docs/current/{docName}.md
    print(get_file_name(doc))
    translate_markdown_all(doc, "/docusaurus-plugin-content-docs/current/" + get_docs_file_path(doc))

# translate json text
json_dir = "i18n\en"
json_list = find_files(json_dir, ".json", translate_paths)
for file in json_list:
    # page output: i18n/{lang_code}/docusaurus-plugin-content-pages/{pageName}.md
    print(get_file_name(file))
    translate_json_all(file, get_json_path(file))
