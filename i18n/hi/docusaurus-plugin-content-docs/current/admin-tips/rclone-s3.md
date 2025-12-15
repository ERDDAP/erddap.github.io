यह सामग्री एक पर आधारित है [Roy Mendelssohn से संदेश ERDDAP उपयोगकर्ता समूह](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) ।

हाल ही में, हमें AWS S3 पर फ़ाइलों को एक्सेस करने में मदद करने के लिए कई पूछताछ मिली है। ERDDAP™ । पहला, ERDDAP™ संस्करण 2.29 में S3 एक्सेस में सुधार होगा, जिसे गैर-AWS ऑब्जेक्ट स्टोर के साथ भी काम करना चाहिए। (धन्यवाद&#33;) । लेकिन मैंने पहले एक FUSE आधारित प्रणाली का उपयोग करने के बारे में बताया है ताकि S3 स्टोर आपके सर्वर या VM पर एक फाइल सिस्टम की तरह दिखाई दे।

ऐसा करने का एक तरीका "rclone" है। (https://rclone.org/) Rclone कई अलग-अलग S3 सिस्टम पर काम करता है, और इसमें प्रदर्शन को अनुकूलित करने के लिए कई अलग-अलग सेटिंग्स हैं, जिनमें एक कैश साइज सेट करना शामिल है, जो उम्मीद है कि कुछ स्पीड जुर्माना को चलाने से FUSE को ऑफसेट कर सकता है। Rclone का उपयोग करके लाभ ERDDAP TM यह है कि rclone S3 के साथ सभी बातचीत को संभालती है, इसलिए डेटासेट प्रकार जैसे EDDGrid से NcFiles सीधे इस्तेमाल किया जा सकता है जैसे कि स्थानीय फाइलें हैं। इसका मतलब यह है कि आपको केवल यह जानने की जरूरत है कि कैसे अपने ऑब्जेक्ट स्टोर तक पहुंचने के लिए Rclone सेटअप करें, और बाकी सिर्फ सामान्य लिनक्स टाइप सेटअप है।

अब अगर मैंने अभी इसे छोड़ दिया है, तो मुझे याद करना होगा, न कि उदाहरण देना। निम्नलिखित मैं गुमनाम रूप से माउंट करने जा रहा हूँ NOAA Goes17 डेटा जो हमारे उबंटू सर्वरों में से एक पर सार्वजनिक सुलभ AWS S3 स्टोर पर है, प्रारंभिक सेटअप में Rclone प्रक्रिया अग्रभूमि में चली जाएगी ताकि यह परीक्षण करना आसान हो सके कि सब कुछ काम कर रहा है, और फिर मैं चर्चा करूंगा कि कैसे ii को पृष्ठभूमि में चलने वाली सेवा में बदल दिया जाए। ध्यान दें कि नीचे क्या है, कैश 1GB पर सेट किया गया है। प्रदर्शन को कैश को बहुत बड़ा बनाकर बढ़ाया जा सकता है, 5GB-10GB या इससे भी बड़ा कह सकता है। इसके अलावा सेटिंग्स मेरे अनुमान हैं कि क्या प्रदर्शन को अनुकूलित कर सकते हैं, लेकिन यह बेहतर नहीं हो सकता है। ERDDAP™ ।


1. आवश्यक सॉफ्टवेयर स्थापित करें:
---------------

sudo apt अद्यतन
sudo apt स्थापित rclone फ्यूज3 -y

2. अनाम S3 रिमोट बनाएं
---------------

Rclone config build 17 s3 \\
प्रदाता AWS \\
क्षेत्र us-east-1
Location_constraint us-east-1
v_auth झूठ \\
गुमनाम सच

3. इसका परीक्षण करें।
---

Rclone lsd go17:noaa-goes17 | सिर

4. डेटा के लिए एक माउंट पॉइंट बनाएं
---------------

sudo mkdir -p / mnt/goes17
Sudo chown $USER:$USER / mnt/goes17

5. डेटा माउंट करें। (ध्यान दें कि यह प्रक्रिया अग्रभूमि में चलती है, इसलिए यह कुछ आउटपुट दिखाएगा और वहां बैठेगा) 
-----

rclone-vv माउंट go17: noaa-goes17 / mnt/goes17 \\
केवल
-vfs-cache-mode full \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m
-vfs-read-chunk-size 64M
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
- बफर आकार 64M \\
--dir-cache-time 24h \\
- attr timeout 1s \\
-नो-मोडटाइम

6. सर्वर पर एक नया टैब खोलें और चेक करें
-------

ls / mnt/goes17 | सिर

7. जाँच करें कि डेटा तक पहुंच सकता है
-------
सीडी / mnt/goes17/ABI-L1b-RadC/2023/010/15
एनसीडंप -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
परिणाम आश्चर्यजनक रूप से जल्दी वापस आ गया था, खासकर चूंकि हमारी स्थापना दुनिया में सबसे तेज पाइप नहीं है।

8. सिस्टम सेवा में बदलाव (उपयोगकर्ता आदि के लिए उपयुक्त रूप में संशोधित करें) :
---------------

A. एक व्यवस्थित इकाई बनाएँ:

sudo नैनो/etc/systemd/system/rclone-goes17.service

और दर्ज करें:

[Unit]
विवरण=GoES17 सार्वजनिक S3 के लिए Rclone माउंट
After=network-online .tar मिलना

[सेवा]
प्रकार = सरल
उपयोगकर्ता
ExecStart =/usr/bin/rclone माउंट Go17:noaa-goes17 /mnt/goes17 \\
केवल
-vfs-cache-mode full \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m
-vfs-read-chunk-size 64M
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
- बफर आकार 64M \\
--dir-cache-time 24h \\
- attr timeout 1s \\
-no-modtime \\
--s3-no-check-bucket
ExecStop =/bin/fusermount3 -u /mnt/goes17
Restart=always
RestartSec=10

[Install]
Wantedby=multi-user .tar मिलना

b. सेवा को सक्षम करें और शुरू करें:

sudo systemctl daemon-reload
sudo systemctl सक्षम - अब rclone-goes17

c. टेस्ट

systemctl स्थिति rclone-goes17
ls / mnt/goes17 | सिर



उम्मीद है कि यह लोगों के लिए इस्तेमाल किया जाएगा। हमने Google क्लाउड प्लेटफॉर्म पर gcsfuse का उपयोग करके परीक्षण किया है जिसमें एक बाल्टी है जिसमें कुछ सफलताओं के साथ पदानुक्रमित नाम स्थान है। Rclone का एक लाभ (इसके अलावा यह विक्रेता विशिष्ट नहीं है) यह प्रदर्शन को अनुकूलित करने के लिए अधिक सेटिंग्स है। विशेष रूप से अगर आप स्थानीय चल रहे हैं ERDDAP™ क्लाउड में, यह संक्रमण को लगभग निर्बाध बना सकता है।
