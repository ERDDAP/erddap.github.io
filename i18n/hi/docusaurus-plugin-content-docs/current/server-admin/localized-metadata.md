---
sidebar_position: 8
---
# स्थानीयकृत मेटाडाटा

### विवरण
यह सुविधा आपको अपने डेटासेट और चर के बारे में स्थानीयकृत मेटाडाटा को शामिल करने की अनुमति देती है। किसी भी विशेषता के भीतर परिभाषितaddAttributesटैग स्थानीयकृत किया जा सकता है। इसका उद्देश्य आम स्ट्रिंग विशेषताओं जैसे शीर्षक, सारांश, लाइसेंस, इंस्टीट्यूशन के लिए किया जाना है। इसे संख्यात्मक के लिए उपयोग करने की अनुशंसा नहीं की जाती है (उदाहरण के लिए "_FillValue") या मानकीकृत मान (उदाहरण के लिए "ioos_category") और इन प्रकार के मूल्यों को स्थानीयकरण में आश्चर्यजनक व्यवहार हो सकता है।

### उपयोग निर्देश
उन्हें सक्षम और उपयोग करने के लिए, इन चरणों का पालन करें:

1.  **में जोड़ेंdatasets.xml`** :
` मेंdatasets.xml` फ़ाइल, ऐड विशेषताओं अनुभाग में अपना स्थानीय मेटाडाटा जोड़ें:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **डिफ़ॉल्ट व्यवहार** :
   - यदि कोई xml:lang टैग प्रदान नहीं किया जाता है, तो प्रदान की गई जानकारी सभी भाषाओं के लिए प्रदर्शित की जाएगी। यह पिछले behavoir से मेल खाता है।
   - यदि कुछ xml:lang टैग प्रदान किए जाते हैं, तो उन मूल्यों का उपयोग उन भाषाओं में अनुरोधों के लिए किया जाएगा। यदि कोई उपयोगकर्ता ऐसी भाषा का अनुरोध करता है जिसमें प्रदान की गई xml:lang मान, डिफ़ॉल्ट भाषा से मान (अंग्रेज़ी) इस्तेमाल किया जाएगा।
