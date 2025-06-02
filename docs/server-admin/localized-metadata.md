---
title: "Localized Metadata"
sidebar_position: 8
---
## Localized Metadata

### Description
This feature allows you to include localized metadata about your datasets and variables. Any attribute defined within an addAttributes tag can be localized. This is intended to be used for common string attributes like title, summary, license, instituion. It is not recommended to be used for numeric (e.g. "_FillValue") or standardized values (e.g. "ioos_category") and localizing these types of values may have surprising behavior.

### Usage Instructions
These tags can only be used with the `Sax parser`. To enable and use them, follow these steps:

1. **Enable the SAX Parser**:
   Add the following line to your `setup.xml` file:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2. **Add Tags in `datasets.xml`**:
   In the `datasets.xml` file, add your localized metadata in the add attributes section:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

3. **Default Behavior**:
   - If no xml:lang tags are provided, the provided information will be displayed for all languages. This matches the previous behavoir.
   - If some xml:lang tags are provided, those values will be used for requests in those languages. If a user requests a language that does not have a provided xml:lang value, the value from the default language (English) will be used.
