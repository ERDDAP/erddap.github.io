इस लेखन के लिए रॉय मेंडेलसोहन के लिए धन्यवाद।

The The most of the Python पैकेज 'xarray' विभिन्न प्रारूपों में ग्रिडड डेटा को एक्सेस करने, सबसेट करने और देखने के लिए बहुत लोकप्रिय हो गया है। ध्यान दें कि 'xarray' ठीक काम करता है ERDDAP™ 'ओपन' DAP दोनों के लिए प्रतिक्रिया tabledap एक्सरे के ओपेन का उपयोग करके ग्रिडडाप प्रोटोकॉल DAP Netcdf4 या pydap जैसे इंजन। क्या है? OPeNDAP प्रतिक्रिया? यह कोई है ERDDAP बिना स्लाइसिंग या फिल्टर के यूआरएल, सिर्फ़ datasetID । हालांकि फिल्टर के स्लाइस का उपयोग करते समय, या यहां तक कि OPeNDAP स्वयं, एक erddapy का उपयोग कर सकते हैं ( https://github.com/ioos/erddapy ) एक एक्सरे इंजन के रूप में। नीचे दिए गए उदाहरण से पता चलता है कि कैसे एक 'griddap' डेटासेट लोड करने के लिए।

मेरे पसंदीदा डेटासेट में से एक JPL MURv4.1 SST डेटा उपलब्ध है https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html । यदि मैं 28 जनवरी, 2026 को कहते हैं, तो latitdues (20,50) और देशांतर (140 -105) एक netcdf फ़ाइल डाउनलोड करें ERDDAP™ इसके लिए यूआरएल होगा https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z 1): (2026-01-28T09:00:00Z) [] (20) :1: (50) [] (-140) :1: (-105) ]

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

केवल एक ही उपयोग को प्राप्त कर सकता है OPeNDAP यूआरएल यदि हम स्थानीय लोगों तक पहुंचने के लिए कदम उठाते हैं NetCDF 'xarray' में फ़ाइल हम निम्नलिखित कदम करेंगे:

- फ़ाइल के लिए पूर्ण पथ पर इंगित करके फ़ाइल खोलें
- पहले चरण से समन्वय जानकारी देखें
- डेटा को सबसेट करने के लिए विभिन्न "चयन" विधियों में से एक का उपयोग करें

उपरोक्त में आप पहले फ़ाइल खोलते हैं, फिर सबसेटिंग करते हैं। एक 'xarray' का उपयोग करने के लिए ERDDAP™ डेटासेट आप ऐसा ही करते हैं, एक बार जब आप महसूस करते हैं, जैसा कि आपको बताया गया है ERDDAP™ दस्तावेज़ीकरण, कि "फ़ाइल के लिए पथ" किसी भी वापसी प्रारूप के बिना यूआरएल है और बिना किसी बाधा के, MUR डेटासेट के मामले में जो है https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

MUR डेटासेट का उपयोग करके एक ठोस उदाहरण के रूप में, पहले मुझे उन पैकेजों को आयात करने की आवश्यकता है जिनका उपयोग किया जाएगा:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

फिर, जैसा कि ऊपर descibed मैंने URL को डेटासेट "नाम" में सेट किया और "फ़ाइल" को खोल दिया। (नहीं कि यह वास्तव में फ़ाइलों का एकत्रीकरण है) "xr.open_dataset" का उपयोग करके


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

यह निम्नलिखित का उत्पादन करता है (आंशिक) "ds" में परिणाम:

आयाम:

समय: 8641l अक्षांश: 17999 देशांतर: 36000

निर्देशांक:

समय (समय) Datetime64[ns] 2002-06-01T09:00:00 ... 2026-01-...
अक्षांश (अक्षांश) फ्लोट 32-89.99-889.98 ... 89.98 89.99
लंबाई (लंबाई) फ्लोट32 -180.0 -180.0 ... 180.0 180.0

सूचकांक:

समय PandasIndex
अक्षांश PandasIndex
लंबाई PandasIndex


इस बिंदु पर आप आगे बढ़ते हैं जैसे कि आप चाहते थे कि यह एक स्थानीय फ़ाइल है। मैं नीचे दो उदाहरण देता हूं, एक जो सरणी अनुक्रमण का उपयोग करके अंतिम दो बार लेता है और एक जो पिछले दो बार मूल्यों को प्राप्त करता है और उस सबसेट को बनाने के लिए उपयोग करता है, लेकिन किसी भी मामले में यह वही है जो आप स्थानीय फ़ाइल के लिए क्या करेंगे।


```python
lat_min, lat_max = 20, 50
lon_min, lon_max = -140, -105
sub_isel = ds.isel(time=slice(-2, None)).sel(
    latitude=slice(lat_min, lat_max),
    longitude=slice(lon_min, lon_max),
)
# plot the result
#sub_isel["analysed_sst"].isel(time=0).plot()
```


```python
last2 = ds["time"].values[-2:]
sub_sel = ds.sel(time=last2).sel(
    latitude=slice(lat_min, lat_max),
    longitude=slice(lon_min, lon_max),
)
# plot the result
#sub_sel["analysed_sst"].isel(time=0).plot()


```

इसलिए टेक होम संदेश यह है कि 'xarray' डेटा पर डेटा के लिए बहुत अच्छा काम करता है ERDDAP™ यदि आप 'xr.open_dataset' से गुजरते हैं तो सर्वर () ' ERDDAP™ किसी फ़ाइल प्रकार के बिना यूआरएल और बिना बाधा के, या erddapy इंजन का उपयोग करें।
