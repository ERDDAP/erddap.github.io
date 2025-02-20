---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `displayInfo` and `displayAttribute` Tags

### Description
This feature allows you to display global attributes of your choice on the datasets page in the `Information` row.

### Usage Instructions
These tags can only be used with the `Sax parser`. To enable and use them, follow these steps:

1. **Enable the SAX Parser**:
   Add the following line to your `setup.xml` file:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2. **Add Tags in `datasets.xml`**:
   In the `datasets.xml` file, include two top-level tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3. **Default Behavior**:
   - If these tags are not added or left empty in the `datasets.xml` file, the default values are applied as follows:
     - `displayInfo`: `Summary,License`
     - `displayAttribute`: `summary,license`

4. **Ensure Consistency**:
   The number of comma-separated values in both `displayInfo` and `displayAttribute` tags must be the same.

### How It Works
- The `displayAttribute` tag specifies global attributes (defined within the `<addAttributes>` tag) to be displayed for each dataset.
- The corresponding values in the `displayInfo` tag are displayed as labels in the `Information` row of the UI.
- When the user hovers over the displayed labels, a tooltip will appear, showing the value of the global attribute.

### Example
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Global Attributes Example:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### UI Behavior:
- The words `Display1` and `Display2` will be displayed in the `Information` row on the UI.
- When hovered, tooltips will display the corresponding attribute values:
  - `Display1`: Tooltip shows _This is att1_
  - `Display2`: Tooltip shows _This is att2_

### Notes
- Ensure the attribute names specified in the `displayAttribute` tag match the global attributes defined in the dataset.
- Incorrect or missing attributes will log error messages.

By following these steps, you can customize the `Information` row on the datasets page to display relevant global attributes with corresponding tooltips.
