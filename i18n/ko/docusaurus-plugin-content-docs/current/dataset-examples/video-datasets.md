영상 데이터셋
===================
2026-05-27 ·

# 검색 및 표시 동영상 ERDDAP™ 

이 문서는 비디오 표시 방법을 보여줍니다 ERDDAP™ , 뿐 아니라
비디오 메타데이터를 검색하기 위한 데이터셋 생성
선택한 검색 기준에 맞는 동영상을 찾을 수 있습니다.

설정해야 하는 필수 구성 요소는 첫 번째, 동영상입니다.
웹 브라우저에서 표시 할 수있는 형식입니다 ( ERDDAP™ 기타 제품
비디오를 표시하지 않습니다,그것은 단지 링크 제공),그리고 두 번째,csv
파일 형식 (또는 parquet와 같은 유사한 테이블 기반 형식) 그것은 포함
동영상과 관련된 메타데이터.

적절한 비디오 형식이 키입니다. 아래 예제에서
원래는 Windows 브라우저도 오래된 창의 형식이었다
상자에서 표시 할 수 없으며 플러그인을 추가해야합니다. 뚱 베어
형식은 종종 매우 큰 파일입니다. Handbrake 신청은 일 수 있습니다
비디오를 변환하는 데 사용, 이는 무슨 일이 수행.

## 설치하기

첫 번째 단계는 "EDDTableFromFileNames" dataset 그래서
각 비디오와 관련된 URL이 있습니다.
이름 * ERDDAP™ "파일" 명령. 이 dataset의 예는 주어진
아래, 당신의 동영상에 대한이 XML을 생성하는 가장 좋은 방법은 사용
Generate데이터셋 Xml.sh 및 비디오와 디렉토리에 포인트 (in
새로운 datasets를 추가하는 가장 좋은 방법 ERDDAP™ 이용안내
Generate데이터셋 당신이 거기 방법의 대부분을 얻을 Xml.sh,
그런 다음 최종 결과에 대한 편집).

두 번째 단계는 EDDTableFromAsciiFiles를 만드는 것입니다 (또는 유사한) 
비디오에서 사용되는 metadata를 포함하는 dataset
관련 기사 예제는 아래와 같습니다. 이 작업을 위해 하나 있어야한다
비디오에 대한 링크를 포함하는 열, 예를 들어 그것은
변수 “videoFile”. 이 변수는 전체 URL을 포함 할 수 있습니다
첫 번째 단계에서 생성하지만, 파일이 휴대용이 아닌 경우
당신은 1대의 기계에 시험하고 그 후에 실제로 다른 것에 봉사합니다
기계.

"videoFile"에 입력하여 휴대용 파일을 만들 수 있습니다.
동영상의 상대 경로는 다음과 같습니다.

2010_Piggy_Bank_audio_stripped/0001_20100627_144631.mp4

그런 다음 "fileAccessBaseUrl" 속성을 추가 할 수 있습니다.
열의 경로에 URL. 예를 들어:

```
<att name="fileAccessBaseUrl"><https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/></att>
```

그런 다음 서버를 전환하면 서버가 하나의 속성을 변경해야합니다.
xml snippet, 당신은 csv 파일을 편집 할 필요가 없습니다.

한 번, 당신은 파일로 액세스 할 수있는 비디오 목록이 있습니다 :

 [ https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/ ](https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/) 

“EDDTableFromFileNames” dataset에 의해 설정된 간단한 검색:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey.html ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey.html) 

그리고 metadata 검색:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.html ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.html) 

마지막 URL의 기본 옵션은 URL을 생성합니다.

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.htmlTable?time,CommonName,latitude,longitude,depth,videoFile&time%3E%3D2022-09-06&CommonName=“black 바위낚시](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.htmlTable?time%2CCommonName%2Clatitude%2Clongitude%2Cdepth%2CvideoFile%26time%3C%3D2022-09-06%26CommonName%3D%E2%80%9Cblack%20rockfish%E2%80%9D) 

그리고 마지막 열을 가진 테이블을 일으킵니다:

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

응답의 각 항목은 비디오에 대한 링크를 제공합니다.
당신이 얻을 첫 번째 하나 이상 마우스 경우:

 [ https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/1997_dives/4193_19971001_093243.mp4 ](https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/1997_dives/4193_19971001_093243.mp4) 

html에서 클릭하면 테이블에서 비디오 표시
사이트 맵

## 이름 *

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
