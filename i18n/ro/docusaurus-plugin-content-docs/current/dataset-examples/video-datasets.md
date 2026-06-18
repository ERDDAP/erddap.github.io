seturi de date video
=================
2026-05-27

# Căutare și afișare video în ERDDAP™ 

Acest document arată cum se afișează videoclipurile în ERDDAP™ , precum și
crearea unui set de date care să prevadă căutarea metadatelor video către
găsiți videoclipurile care îndeplinesc criteriile de căutare selectate.

Componentele esențiale necesare pentru a configura acest lucru sunt în primul rând, videoclipuri care
sunt într-un format care poate fi afișat într-un browser web ( ERDDAP™ în sine
nu afișează videoclipul, oferă doar un link), iar în al doilea rând, un csv
fișier (sau un format pe bază de tabel similar, cum ar fi parchetul) care conţine
metadate relevante pentru videoclipuri.

Este cheia să avem un format video adecvat. În exemplul de mai jos,
videoclipurile au fost inițial un format vechi Windows care chiar și browsere Windows
nu a putut afișa din cutie și a necesitat adăugarea unui modul. Vechi
formatele sunt adesea fișiere foarte mari. Aplicația de frânare de mână poate fi
folosit pentru a converti videoclipurile, care este ceea ce a fost făcut.

## Configurare

Primul pas este de a crea un tabel EDDFromFileNames
există un URL asociat cu fiecare video care este accesibil prin
nu ERDDAP™ Comanda. În timp ce un exemplu al acestui set de date este dat
mai jos, cel mai bun mod de a genera acest xml pentru videoclipuri este de a utiliza
Generează dateName Xml.sh și indică-l la directorul cu videoclipurile (în
general cea mai bună modalitate de a adăuga noi seturi de date ERDDAP™ es să utilizaţi
Generează dateName Xml.sh care vă va ajunge cea mai mare parte a drumului acolo, și
apoi editați asta pentru rezultatul final).

Al doilea pas este crearea unui tabel EDD din AsciiFiles (sau similare) 
Set de date care conține metadatele care urmează să fie utilizate în video
Caută. Un exemplu este dat mai jos. Pentru ca asta să funcţioneze trebuie să fie unul.
coloana care conține un link către video, în exemplul este
Variabil  Această variabilă poate conține doar URL-ul complet
creat în primul pas, dar apoi fișierul nu este portabil, cum ar fi dacă
doriți să testați pe o mașină și apoi de fapt servi pe alta
Maşina.

Puteți face fișierul portabil de a face intrarea în 
calea relativă către video, în exemplul de mai jos o astfel de cale este:

2010_Piggy_Bank_audio_strapped/0001_20100627_144631.mp4

Apoi puteți adăuga atributul "fileAccessBaseUrl" care adaugă că
URL către calea din coloană. În exemplu:

```
<att name="fileAccessBaseUrl"><https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/></att>
```

Apoi, dacă comutați serverele, trebuie doar să modificați acel atribut în
fragmentul xml, nu aveți nevoie pentru a edita fișierul csv.

Odată terminat, aveți o listă de videoclipuri accesabile ca fișiere:

 [ https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/ ](https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/) 

o căutare simplă, creată de tabla EDDFromFileNames:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey.html ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey.html) 

și căutarea metadatelor la:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.html ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.html) 

Opțiunile implicite din ultimul URL produc URL-ul:

 [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.htmlTable?time,CommonName,latitude,longitude,depth,videoFile&time%3E%3D2022-09-06&CommonName=“black Sebastă](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/fed_HAGE_VisualSurvey_Query.htmlTable?time%2CCommonName%2Clatitude%2Clongitude%2Cdepth%2CvideoFile%26time%3C%3D2022-09-06%26CommonName%3D%E2%80%9Cblack%20rockfish%E2%80%9D) 

și care produce un tabel cu ultima coloană:

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

Fiecare dintre intrările din răspuns oferă un link către un video, cum ar fi
dacă șoarece peste primul veți obține:

 [ https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/1997_dives/4193_19971001_093243.mp4 ](https://coastwatch.pfeg.noaa.gov/erddap/files/fed_HAGE_VisualSurvey/1997_dives/4193_19971001_093243.mp4) 

şi dacă faceţi clic pe ea în html Masează display-urile video în
browser.

## Exemplu

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
