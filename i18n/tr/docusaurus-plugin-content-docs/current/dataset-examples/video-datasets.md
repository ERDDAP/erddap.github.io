Video-datasets
=
2026-05-27

# Aramak ve Videoları Ekranlamak ERDDAP™ 

Bu belge, videoları nasıl göstereceğinizi gösteriyor ERDDAP™ Ayrıca,
Video metadata'yı aramak için sağlayan bir veri kümesi oluşturmak için
Seçilen arama kriterlerini karşılayan videoları bulun.

Bunu ayarlamak için gerekli olan temel bileşenler ilk, videolardır,
Bir web tarayıcısında gösterilebilecek bir formatta ( ERDDAP™ Kendisinin kendisi
Videoyu göstermiyor, sadece bir bağlantı sağlıyor, ikincisi bir csv
Dosya dosyası (veya parquet gibi benzer bir tablo) Bu, içeriyor
Metadata videolarla ilgili.

Uygun bir video formatına sahip olmak önemlidir. Örneğin aşağıda
Başlangıçta, Windows tarayıcılarının bile bulunduğu eski bir Pencere formatıydı.
Kutudan çıkamadı ve bir eklenti ekledi. Old Old Old Old Old
formatlar genellikle çok büyük dosyalardır. Handbrake uygulaması olabilir
Videoları dönüştürmek için kullanıldı, hangi yapıldı.

## Kurulum

İlk adım, "EDDTable FromFileNames" veri setini oluşturmaktır, böylece bu yüzden
Her video ile erişilebilir olan bir URL var
The the the the ERDDAP™ “Doğallar” komut. Bu veri kümesinin bir örneği verildiğinde
Aşağıda, videolarınız için bu xml üretmenin en iyi yolu kullanmak, kullanmak.
GenrateDatasets X ml.sh ve bunu videolarla diziye işaret edin (in
Genel olarak yeni veri setlerini eklemek için en iyi yol ERDDAP™ kullanmak is to use
GenrateDatasets X ml.sh, sizi oraya giden yoldan alacak ve
Daha sonra bunu nihai sonuç için düzenler).

İkinci adım, AsciiFiles'den bir EDDTable oluşturmak. (veya benzer veya) 
Videoda kullanılan metadata'yı içeren veri setleri videoda kullanılır
Arama. Aşağıda bir örnek verilir. Bu çalışma için bir tane olmalı
Videoya bir bağlantı içeren sütun, örneğin,
değişken "videoFile". Bu değişken sadece tam URL'yi içerebilir
İlk adımda yaratıldı, ancak sonra dosya taşınabilir değil, sanki sanki gibi
Bir makinede test etmek ve sonra aslında başka bir şeye hizmet etmek istiyorsunuz
makine.

Dosyayı "videoFile" giriş yaparak taşınabilir hale getirebilirsin
Videoya göre, böyle bir yolun altındaki örnekte:

2010_Piggy_Bank_audio_stripped/0001_20100627_144631.mp4

Sonra "DoğalyaBaseUrl" özelliklerini ekleyebilirsiniz, ki bu da bunu yapar.
Köşedeki yolda URL. Örneğin:

```
<att name="fileAccessBaseUrl"><https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/></att>
```

Sonra sunucuları değiştirirseniz, sadece o bir özelliği değiştirmek gerekir
xml parçaları, csv dosyasını düzenlemeniz gerekmez.

Bir kez yapıldığında, dosyalar olarak erişilebilir olan videoların bir listesine sahipsiniz:

 [ https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/ ](https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/) 

“EDDTable FromFileNames” veri setleri tarafından oluşturulan basit bir arama:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey.html ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey.html) 

ve metadata arama:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.html ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.html) 

Son URL'deki varsayılan seçenekler URL'yi üretir:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.htmlTable?time,CommonName,latitude,longitude,depth,videoFile&time%3E%3D2022-09-06&CommonName=“black rockfish"](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.htmlTable?time%2CCommonName%2Clatitude%2Clongitude%2Cdepth%2CvideoFile%26time%3C%3D2022-09-06%26CommonName%3D%E2%80%9Cblack%20rockfish%E2%80%9D) 

Ve bu son sütunla bir masa üretir:

```
1997_dives/4193_19971001_093243.mp4
2002_Cowcod_audio_stripped/5806_20021020_134540.mp4
2002_Cowcod_audio_stripped/5806_20021020_134540.mp4
2002_Cowcod_audio_stripped/5806_20021020_134540.mp4
2002_Cowcod_audio_stripped/5806_20021020_134540.mp4
2002_Cowcod_audio_stripped/5806_20021020_134540.mp4
2007_IMPACT_audio_stripped/6895_20071012_140715.mp4
2008_IMPACT/7014_20080914_102413.mp4
2008_IMPACT/7017_20080914_152921.mp4
```

Yanıtdaki girişlerin her biri bir videoya bağlantı sağlar, örneğin
İlk aldığınızın üzerinde fare varsa:

 [ https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/1997_dives/4193_19971001_093243.mp4 ](https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/1997_dives/4193_19971001_093243.mp4) 

Ve bunu html'da tıkırsanız Video ekranları senin içinde
tarayıcı.

## Örnek Örnek Örnek Örnek Örnek Örnek Örnek Örnek

```
    <dataset type="EDDTableFromFileNames" datasetID="fed_HAGE_VisualSurvey" active="true">
        <fileDir>/erddap/new_HAGE_videos/</fileDir>
        <fileNameRegex>.*\\.mp4</fileNameRegex>
        <recursive>true</recursive>
        <pathRegex>.*</pathRegex>
        <reloadEveryNMinutes>10080</reloadEveryNMinutes>
        <!-- sourceAttributes>
        </sourceAttributes -->
        <addAttributes>
            <att name="cdm_data_type">Other</att>
            <att name="Conventions">COARDS, CF-1.10, ACDD-1.3</att>
            <att name="creator_email">diana.watters@no.gov, tom.laidig@oaa.gov</att>
            <att name="creator_name">Diana Watters, Tom Laidig</att>
            <att name="creator_url">null</att>
            <att name="history"> The orginal video files were converted to the present mp4 format using Handbrake with the command "HandBrakeCLI -Z "Fast 1080p30""</att>
            <att name="infoUrl"> https://www.fisheries.noaa.gov/west-coast/science-data/habitat-and-groundfish-ecology-research-california-current</att>
            <att name="institution">NOAA/NMFS/SWFSC/FED</att>
            <att name="keywords">visual survey, video survey, rockfish, corals, sponges, seafloor habitat,
    submersible, human-occupied vehicle, remotely operated vehicle, towed camera sled</att>
            <att name="sourceUrl">(local files)</att>
            <att name="subsetVariables">fileType</att>
            <att name="summary">Since 1992, the Southwest Fisheries Science Center's Habitat and Groundfish
    Ecology team has conducted visual surveys using submersible vehicles to quantify demersal
    fish communities in deep seafloor habitats that are typically inaccessible to bottom trawls.
    Data are collected from strip transects recorded with video and still cameras. To date, this
    georeferenced dataset contains 460,000 individual fishes and 201 taxa, including 242,000
    rockfishes (genus Sebastes) comprising 55 species, recorded from more than 2,000 transects
    at depths 25-1,200 meters, primarily off California. Other data include estimated fish total
    lengths, habitat, and in situ depth and temperature. The data have applications for a variety
    of research topics, including ecology, distribution modeling, essential fish habitat, and stock
    assessment. Videos from the surveys are available for download in mp4 format and
    searchable by location, depth, species observed, and other factors.

    This project was born out of a need to collect habitat-specific information on
    rockfish abundance and ecology that cannot be obtained by traditional survey methods,
    such as bottom trawling.</att>
            <att name="title">FED Demersal Fish and Habitat Visual Survey, Data and Video</att>
        </addAttributes>
        <dataVariable>
            <sourceName>url</sourceName>
            <destinationName>url</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
                <att name="ioos_category">Identifier</att>
                <att name="long_name">URL</att>
            </sourceAttributes -->
            <addAttributes>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>name</sourceName>
            <destinationName>name</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
                <att name="ioos_category">Identifier</att>
                <att name="long_name">File Name</att>
            </sourceAttributes -->
            <addAttributes>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>lastModified</sourceName>
            <destinationName>lastModified</destinationName>
            <dataType>double</dataType>
            <!-- sourceAttributes>
                <att name="ioos_category">Time</att>
                <att name="long_name">Last Modified</att>
                <att name="units">seconds since 1970-01-01T00:00:00Z</att>
            </sourceAttributes -->
            <addAttributes>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>size</sourceName>
            <destinationName>size</destinationName>
            <dataType>double</dataType>
            <!-- sourceAttributes>
                <att name="ioos_category">Other</att>
                <att name="long_name">Size</att>
                <att name="units">bytes</att>
            </sourceAttributes -->
            <addAttributes>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>fileType</sourceName>
            <destinationName>fileType</destinationName>
            <dataType>String</dataType>
            <addAttributes>
                <att name="extractRegex">.*(\\..+?)</att>
                <att name="extractGroup" type="int">1</att>
                <att name="ioos_category">Identifier</att>
                <att name="long_name">File Type</att>
            </addAttributes>
        </dataVariable>
     </dataset>


    <dataset type="EDDTableFromAsciiFiles" datasetID="fed_HAGE_VisualSurvey_Query" active="true">
        <reloadEveryNMinutes>10080</reloadEveryNMinutes>
        <updateEveryNMillis>10000</updateEveryNMillis>
        <fileDir>/erddap/new_HAGE_videos/</fileDir>
        <fileNameRegex>.*\\.csv</fileNameRegex>
        <recursive>true</recursive>
        <pathRegex>.*</pathRegex>
        <metadataFrom>last</metadataFrom>
        <standardizeWhat>0</standardizeWhat>
        <charset>UTF-8</charset>
        <columnSeparator>,</columnSeparator>
        <columnNamesRow>1</columnNamesRow>
        <firstDataRow>2</firstDataRow>
        <sortedColumnSourceName>DiveDate</sortedColumnSourceName>
        <sortFilesBySourceNames>DiveDate</sortFilesBySourceNames>
        <fileTableInMemory>false</fileTableInMemory>
        <defaultDataQuery>time,CommonName,latitude,longitude,depth,videoFile&amp;time&lt;=max(time)&amp;CommonName=&quot;black rockfish&quot;</defaultDataQuery> 
        <!-- sourceAttributes>
        </sourceAttributes -->
        <!-- Please specify the actual cdm_data_type (TimeSeries?) and related info below, for example...
            <att name="cdm_timeseries_variables">station_id, longitude, latitude</att>
            <att name="subsetVariables">station_id, longitude, latitude</att>
        -->
        <addAttributes>

            <att name="cdm_data_type">Other</att>
            <att name="Conventions">COARDS, CF-1.10, ACDD-1.3</att>
            <att name="infoUrl">https://www.fisheries.noaa.gov/west-coast/science-data/habitat-and-groundfish-ecology-research-california-current</att>
            <att name="institution">NOAA/NMFS/SWFSC/FED</att>
            <att name="keywords">blackfin, blackfin_poacher, blackgill, blackgill_rockfish, blacktail, blacktail_snailfish, data, dive, dover, dover_sole, file, fish, halfbanded, halfbanded_rockfish, heads, institution, latitude, local, longitude, poacher, pygmy, pygmy_rockfish, rockfish, sharpchinrock, sharpchinrock_fish, skate, slender, slender_sole, snailfish, sole, source, starry, starry_skate, thorny, thorny_heads, time, video, videoFile</att>
            <att name="license">[standard]</att>
            <att name="sourceUrl">(local files)</att>
            <att name="standard_name_vocabulary">CF Standard Name Table v70</att>
            <att name="subsetVariables">DiveID, Vehicle, Region, location, CommonName, ScientificName, HabitatType, videoFile </att>
            <att name="summary">Since 1992, the Southwest Fisheries Science Center's Habitat and Groundfish
    Ecology team has conducted visual surveys using submersible vehicles to quantify demersal
    fish communities in deep seafloor habitats that are typically inaccessible to bottom trawls.
    Data are collected from strip transects recorded with video and still cameras. To date, this
    georeferenced dataset contains 460,000 individual fishes and 201 taxa, including 242,000
    rockfishes (genus Sebastes) comprising 55 species, recorded from more than 2,000 transects
    at depths 25-1,200 meters, primarily off California. Other data include estimated fish total
    lengths, habitat, and in situ depth and temperature. The data have applications for a variety
    of research topics, including ecology, distribution modeling, essential fish habitat, and stock
    assessment. Videos from the surveys are available for download in mp4 format and
    searchable by location, depth, species observed, and other factors.

    This project was born out of a need to collect habitat-specific information on
    rockfish abundance and ecology that cannot be obtained by traditional survey methods,
    such as bottom trawling.</att>
            <att name="title">FED Demersal Fish and Habitat Visual Survey Query.</att>
        </addAttributes>
        <dataVariable>
            <sourceName>DiveIdent</sourceName>
            <destinationName>DiveID</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Dive Id</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Vehicle</sourceName>
            <destinationName>Vehicle</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Vehicle</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>DiveDate</sourceName>
            <destinationName>time</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Time</att>
                <att name="long_name">Dive Date</att>
                <att name="source_name">DiveDate</att>
                <att name="standard_name">time</att>
                <att name="time_precision">1970-01-01</att>
                <att name="units">yyyy-MM-dd</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Year</sourceName>
            <destinationName>Year</destinationName>
            <dataType>short</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="short">32767</att>
                <att name="ioos_category">Time</att>
                <att name="long_name">Year</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Region</sourceName>
            <destinationName>Region</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Location</att>
                <att name="long_name">Region</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>location</sourceName>
            <destinationName>location</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Location</att>
                <att name="long_name">Location</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Transect</sourceName>
            <destinationName>Transect</destinationName>
            <dataType>byte</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="byte">127</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Transect</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Segment</sourceName>
            <destinationName>Segment</destinationName>
            <dataType>byte</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="byte">127</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Segment</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Transect_Start_Time</sourceName>
            <destinationName>Transect_Start_Time</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Time</att>
                <att name="long_name">Transect Start Time</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Transect_End_Time</sourceName>
            <destinationName>Transect_End_Time</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Time</att>
                <att name="long_name">Transect End Time</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>TransectWidthMeters</sourceName>
            <destinationName>TransectWidthMeters</destinationName>
            <dataType>float</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="float">-9999.0</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Transect Width Meters</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>SegmentLengthMeters</sourceName>
            <destinationName>SegmentLengthMeters</destinationName>
            <dataType>short</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="short">-9999</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Segment Length Meters</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Fish_Time</sourceName>
            <destinationName>Fish_Time</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Time</att>
                <att name="long_name">Fish Time</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>CommonName</sourceName>
            <destinationName>CommonName</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Taxonomy</att>
                <att name="long_name">Common Name</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>ScientificName</sourceName>
            <destinationName>ScientificName</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Taxonomy</att>
                <att name="long_name">Scientific Name</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>SizeClass</sourceName>
            <destinationName>SizeClass</destinationName>
            <dataType>short</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="short">-9999</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Size Class</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Frequency</sourceName>
            <destinationName>Frequency</destinationName>
            <dataType>short</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="short">-9999</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Frequency</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Latitude</sourceName>
            <destinationName>latitude</destinationName>
            <dataType>double</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="colorBarMaximum" type="double">90.0</att>
                <att name="colorBarMinimum" type="double">-90.0</att>
                <att name="ioos_category">Location</att>
                <att name="long_name">Latitude</att>
                <att name="standard_name">latitude</att>
                <att name="units">degrees_north</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Longitude</sourceName>
            <destinationName>longitude</destinationName>
            <dataType>double</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="colorBarMaximum" type="double">180.0</att>
                <att name="colorBarMinimum" type="double">-180.0</att>
                <att name="ioos_category">Location</att>
                <att name="long_name">Longitude</att>
                <att name="standard_name">longitude</att>
                <att name="units">degrees_east</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>Depth</sourceName>
            <destinationName>depth</destinationName>
            <dataType>short</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="_FillValue" type="short">-9999</att>
                <att name="colorBarMaximum" type="double">8000.0</att>
                <att name="colorBarMinimum" type="double">-8000.0</att>
                <att name="colorBarPalette">TopographyDepth</att>
                <att name="ioos_category">Location</att>
                <att name="long_name">Depth</att>
                <att name="standard_name">depth</att>
                <att name="units">m</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>HabitatType</sourceName>
            <destinationName>HabitatType</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Habitat Type</att>
            </addAttributes>
        </dataVariable>
        <dataVariable>
            <sourceName>videoFile</sourceName>
            <destinationName>videoFile</destinationName>
            <dataType>String</dataType>
            <!-- sourceAttributes>
            </sourceAttributes -->
            <addAttributes>
                <att name="fileAccessBaseUrl">https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/</att>
                <att name="ioos_category">Unknown</att>
                <att name="long_name">Video File</att>
            </addAttributes>
        </dataVariable>
    </dataset>
```
