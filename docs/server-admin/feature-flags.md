# Feature Flags

This page documents the configuration flags available in the system. These flags control various features, experimental capabilities, and legacy behaviors.

## **Flag Lifecycle Legend**

* **Stable:** Intended as long-term flags to allow admins to change functionality. Safe for production.  
* **Testing:** Features that are ready for testing. These will either graduate to "Stable" or eventually be set to their target value and have the flag removed.  
* **Under Construction:** Currently hardcoded to false in the code, regardless of configuration. The feature is not yet ready for use.

## **🚀 Optimizations in testing**

These are flags likely to be removed in the future. 

### **touchThreadOnlyWhenItems**

Description  
Optimization flag. If true, the touch thread only runs when there are items to process.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 2.29.0 |

### **taskCacheClear**

Description  
Enables the background task that clears expired items from the cache.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 2.27.0 |

### **ncHeaderMakeFile**

Description  
If true the server will generate the entire nc file before creating the ncheader result. The new (preferred) behavior when false is to directly generate the ncheader result.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | false |
| **History** | Added in 2.29.0 |

### **useEddReflection**

Description  
Enables the use of Java Reflection to instantiate EDD (ERDDAP Dataset) classes.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Default changed to true in 2.28.0, added in 2.25 |

### **backgroundCreateSubsetTables**

Description  
Allows subset tables to be created in background threads to improve datasets loading time.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 2.29.0 |

### **useNcMetadataForFileTable**

Description  
Uses NetCDF metadata to populate the file table view. In particular if an nc file includes actual_range for each variable, the dataset loading can skip reading the entire file.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 2.29.0 |

## **🛠 System & Core Behavior**

### **emailIsActive**

Description  
Controls whether the system attempts to send actual emails (e.g., for subscription updates or error reports) via the configured SMTP server.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | false |
| **Long-term Goal** | true (Dependent on admin config) |
| **History** | Legacy |

:::info Logic  
This flag is calculated dynamically at startup. It defaults to false unless all required SMTP credentials (host, port, user, password, from-address) are strictly provided in setup.xml.  
:::

### **showLoadErrorsOnStatusPage**

Description  
Determines if detailed dataset load errors are displayed publicly on the status page.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | set as desired |
| **History** | Added in 2.25 |

### **defaultAccessibleViaFiles**

Description  
Sets the default behavior for whether a dataset's underlying files can be accessed in the files service.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | false |
| **Long-term Goal** | false |
| **History** | Added in 2.10 |

## **🗃️ Datasets**

### **quickRestart**

Description  
If enabled, the system attempts to start up faster by skipping certain deep validation checks on datasets during initialization.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.38 |

### **enableEnvParsing**

Description  
Enables processing the datasets.xml file with a [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html). This has many uses including setting private values (like passwords) using environment variables.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | set as desired |
| **History** | Added in 2.29.0 |

### **useSaxParser**

Description  
Switches the internal XML parsing engine to use a SAX (Simple API for XML) parser instead of the DOM parser. This enables some new advanced features like XInclude, and [custom display attributes](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions).

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | true |
| **History** | Added in 2.25 |

### **listPrivateDatasets**

Description  
Determines if private datasets (those requiring authentication) appear in the main dataset list.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | false |
| **Long-term Goal** | false |
| **History** | Added in 1.20 |

### **politicalBoundariesActive**

Description  
Controls whether political boundaries can be drawn on maps.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.80 |

## **📂 Metadata & Standards**

### **fgdcActive**

Description  
Generates and serves FGDC (Federal Geographic Data Committee) metadata.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.38 |

### **iso19115Active**

Description  
Generates and serves ISO 19115 metadata.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.38 |

### **useSisISO19115**

Description  
Uses the Apache SIS library to generate ISO 19115 metadata instead of the legacy generator. If this is on and useSisISO19139 is not on, the default IOS 19115 metadata will be in ISO19115_3_2016 format. If this is false the default format will be in the legacy modified ISO19115_2 format.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | true |
| **History** | Added in 2.26 |

### **useSisISO19139**

Description  
Uses the Apache SIS library to generate ISO19139_2007 metadata.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | false |
| **History** | Added in 2.29.0 |

### **jsonldActive**

Description  
Generates and serves JSON-LD (Linked Data) metadata.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Legacy |

### **generateCroissantSchema**

Description  
Generates "Croissant" metadata schema as the default schema for machine learning readiness.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 2.28.0 |

### **variablesMustHaveIoosCategory**

Description  
Enforces that variables must have an IOOS category attribute.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | set as desired |
| **History** | Legacy |

### **includeNcCFSubsetVariables**

Description  
Legacy behavior was to generate subset variables only for EDDTableFromNcCFFiles datasets. This was added to default the behavior for EDDTableFromNcCFFiles to be consistent with other dataset types. If you need the legacy automatic subsetVariables you can enable this. The better solution would be to add subsetVariables to the dataset definition.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | false |
| **History** | Added in 2.26 |

## **🔔 Subscriptions and Notifications**

### **subscriptionSystemActive**

Description  
Enables the email subscription system for dataset updates.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.14 |

### **subscribeToRemoteErddapDataset**

Description  
Allows this ERDDAP instance to subscribe to remote ERDDAP datasets for updates.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.70 |

### **updateSubsRssOnFileChanges**

Description  
Triggers subscription and RSS updates when underlying files change. The legacy behavior was only to do updates on dataset reload (which some servers had as infrequently as weekly).

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 2.26 |

### **enableMqttBroker**

Description  
Starts an internal MQTT broker within the application to handle messaging.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | set as desired |
| **History** | Added in 2.29.0 |

### **publishMqttNotif**

Description  
Enables publishing of notifications (like dataset changes) to the MQTT broker.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | set as desired |
| **History** | Added in 2.29.0 |

## **🌐 Web Headers/Configuration**

### **useHeadersForUrl**

Description  
Allows using HTTP headers to determine the request URL details (useful behind proxies).

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Default changed to true in 2.28.0, Added in 2.27.0 |

### **enableCors**

Description  
Enables Cross-Origin Resource Sharing (CORS) headers on HTTP responses.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | false |
| **Long-term Goal** | set as desired |
| **History** | Added in 2.26 |

## **🔍 Search**

### **useLuceneSearchEngine**

Description  
Switches the internal search engine to use Apache Lucene.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Testing |
| **Current Default** | false |
| **Long-term Goal** | ? |
| **History** | Legacy |

## **📡 Services & Protocols**

### **filesActive**

Description  
Enables the "Files" browser view for datasets that support it.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.58 |

### **convertersActive**

Description  
Enables conversion tools in the UI.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.44 |

### **slideSorterActive**

Description  
Enables the Slide Sorter.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.44 |

### **dataProviderFormActive**

Description  
Enables the form allowing data providers to input metadata.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Legacy |

### **outOfDateDatasetsActive**

Description  
Enables the reporting of out-of-date datasets.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.82 |

### **wmsActive**

Description  
Enables the Web Map Service (WMS) interface.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Added in 1.44 |

### **wmsClientActive**

Description  
Enables the internal WMS client features.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Stable |
| **Current Default** | true |
| **Long-term Goal** | true |
| **History** | Legacy |

### **geoServicesRestActive**

Description  
Enables the RESTful interface for Geospatial Services. Not fully implemented.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Under Construction |
| **Current Default** | false (Hardcoded) |
| **Long-term Goal** | true |

### **wcsActive**

Description  
Enables the Web Coverage Service (WCS) interface. Not fully implemented.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Under Construction |
| **Current Default** | false (Hardcoded) |
| **Long-term Goal** | true |

### **sosActive**

Description  
Enables the Sensor Observation Service (SOS) interface.

| Property | Details |
| :---- | :---- |
| **Lifecycle** | Under Construction |
| **Current Default** | false (Hardcoded) |
| **Long-term Goal** | true |