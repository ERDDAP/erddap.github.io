اس تحریر کے لیے رائے میندلسن کا شکریہ.

جواب Python پیکج 'xarray' مختلف فارمیٹ میں رسائی، ذیلی انفنٹری اور نظریاتی کشش کے لیے بہت مقبول ہو گیا ہے۔ غور کریں کہ 'xarray' کے ساتھ اچھا کام کرتے ہیں۔ ERDDAP™ 'سپن DAP دونوں کے لئے جواب tabledap اور گریناڈاپ پروٹوکول xarray کی OPen استعمال کرتے ہیں۔ DAP انجن نیٹکڈف4 یا پدمپ جیسے ہوتے ہیں۔ کیا ہے OPeNDAP جواب ؟ کوئی نہیں ERDDAP صرف datasetID . . تاہم ، فیلڈر یا حتیٰ‌کہ استعمال کرتے وقت OPeNDAP خود بھی، ایک ایرڈاپی استعمال کر سکتا ہے۔ ( https://github.com/ioos/erddapy ) xarray engine کے طور پر. مندرجہ ذیل مثال سے پتہ چلتا ہے کہ ایک 'griddap' dataset کیسے لوڈ کیا جائے۔

میرے پسندیدہ اعداد و شمار میں سے ایک JPL MURv4.1 ایس ٹی ڈاٹا ہے۔ https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.html . . اگر میں 28 جنوری 2026ء کے لیے اعداد و شمار کا ایک ذیلی مجموعہ کرنا چاہتا ہوں، تو لاٹیٹیوز (20,50) اور لمبے لمبے سایوں (-140، -105) . . . . ERDDAP™ اس کے لئے دادی ہو جائے گا https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z 1: (2026-01-28T09:00Z) [] (۲۰) سوال : (50) [] (-140) سوال : (-105) []

```python
import xarray as xr


url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.nc?analysed_sst[(2026-01-28T09:00:00Z):1:(2026-01-28T09:00:00Z)][(20):1:(50)][(-140):1:(-105)]"

ds = xr.open_dataset(url, engine="erddapy")
```

ایک وہی حاصل کر سکتے ہیں جو صرف استعمال کر سکتے ہیں OPeNDAP حضرات. اگر ہم کسی مقامی تک رسائی کے اقدامات کے بارے میں سوچیں NetCDF فائل 'xarray' میں ہم مندرجہ ذیل اقدامات کرتے ہیں:

- فائل فہرست حاصل کرنے کے لیے فائل کا بھرپور راستہ کھولیں
- پہلے مرحلے سے متعلقہ معلومات کو دیکھیں
- ڈیٹا کو زیر کرنے کے لیے مختلف " انتخابی" طریقوں میں سے ایک استعمال کریں۔

اوپر موجود فائل کو سب سے پہلے کھول دو پھر ذیلی تقسیم کریں۔ کے ساتھ 'xarray' استعمال کرنے کے لئے ERDDAP™ اعداد و شمار سے اندازہ ہوتا ہے کہ آپ بھی اسی طرح کرتے ہیں، ایک بار آپ کو احساس ہوتا ہے، جیسا کہ وضاحت میں، ERDDAP™ دستاویز، کہ " فائل کی طرف سفر"، بغیر کسی واپسی کے فارمیٹ اور بغیر کسی کوائن کے، MUR dataset کے معاملے میں https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.
 

ایم آر ڈیٹا سیٹ استعمال کرتے ہوئے، پہلے مجھے ان پیکجوں کو درآمد کرنے کی ضرورت ہے جو استعمال ہوں گے:


```python
import matplotlib.pyplot as plt
import xarray as xr
```

اس کے بعد، جیسا کہ میں نے ڈیٹا سیٹ کو "نام" اور "فل" کھول دیا۔ (یہ حقیقت نہیں کہ یہ فائلوں کی ایک ذیلی شاخ ہے۔) "xr.open_dataset" استعمال کرتے ہوئے


```python
mur_url = "https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41"
ds = xr.open_dataset(mur_url, decode_times=True)


```

یہ مندرجہ ذیل پیدا کرتا ہے۔ (جزو) "دس" میں نتائج ملتے ہیں:

پیدائش:

وقت: 8641l at ititude: 1799 طول البلد: 36000 ہے۔

حساب :

وقت (وقت) تاریخ وقت64[ss] 2002-06-01T09:00:00... 2026-01-
غیر متصل (غیر متصل) . . . . . . . . . . . .
لمبائی (لمبائی) . . . . . . . . . . .

انڈیکس:

وقت پانڈوؤں کی تقسیم
پُراسرار جانور
لمبائی پانڈو


اس وقت آپ اسی طرح چلتے جس طرح آپ کو ایک مقامی فائل ہوتی۔ میں دو مثالیں دیتا ہوں، ایک وہ جو پچھلے دو بار صف بندی انڈیکس کا استعمال کرتا ہے اور ایک جو پچھلے دو اوقات کی قیمتیں حاصل کرتا ہے اور جو زیریں سیٹ بنانے کے لیے استعمال ہوتا ہے، لیکن دونوں صورتوں میں یہ آپ کو ایک مقامی فائل کے لیے کیا کرنا ہوگا


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

لہٰذا گھریلو پیغام یہ ہے کہ 'xarray' کسی ڈیٹا کے لیے بڑا کام کرتی ہے۔ ERDDAP™ سرور اگر آپ 'xr.open_dataset تک عبور کریں تو سرور () ' ERDDAP™ فائل قسم کے بغیر اور رکاوٹوں کے بغیر، یا پھر اردندی انجن استعمال کریں۔
