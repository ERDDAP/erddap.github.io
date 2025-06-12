---
title: "ERDDAP™ Documentation"
---
## Latest ERDDAP™ version {#latest-erddap-version}

2.27.0, see the [changes documentation](/changes#version-2270) and [download it](https://github.com/ERDDAP/erddap/releases/tag/v2.27.0).

## ERDDAP™ information {#erddap-information}

ERDDAP™ is a scientific data server that gives users a simple, consistent way to download subsets of
gridded and tabular scientific datasets in common file formats and make graphs and maps.
ERDDAP™ is a Free and Open Source (Apache and Apache-like) Java Servlet from NOAA NMFS SWFSC Environmental Research Division (ERD).

* To see/use an ERDDAP™ installation: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* To get started with an installation read [the deploy install guide](/docs/server-admin/deploy-install).
* To contribute code see the [programmer's guide](/docs/contributing/programmer-guide).


Below you will find relevant links for asking questions and how to contribute.
* Review conversations and ask questions at [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) or at [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions)
* Review and submit issues to [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues)
* To propose feature requests, follow this guidance: [ERDDAP Discussions #93 (comment)](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Search Multiple ERDDAP™s
There are two ways to search multiple ERDDAP™s for datasets: [Search Multiple ERDDAP™s](/SearchMultipleERDDAPs.html) and [ERDDAP™ Dataset Discovery](http://erddap.com/).


## Set Up Your Own ERDDAP™ {#set-up-your-own-erddap}

ERDDAP™ is a [Free and Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software), all-Java (servlet), web application that runs in a web application server (for example, Tomcat (recommended), or Jetty (it works, but we don't support it)). This web page is mostly for people ("ERDDAP™ administrators") who want to set up their own ERDDAP™ installation at their own website.

To get started with an installation read [the deploy install guide](/docs/server-admin/deploy-install).

### Why use ERDDAP™ to distribute your data? {#why-use-erddap-to-distribute-your-data}

Because the small effort to set up ERDDAP™ brings many benefits.

*   If you already have a web service for distributing your data,  
    you can set up ERDDAP™ to access your data via the existing service.  
    Or, you can set up ERDDAP™ to access your data directly from local files.
*   For each dataset, you only have to write a small chunk of XML to tell ERDDAP™ how to access the dataset.
*   Once you have ERDDAP™ serving your data, end users can:
    *   Request the data in various ways (DAP, WMS, and more in the future).
    *   Get the data response in various file formats. (That's probably the biggest reason!)
    *   Make graphs and maps. (Everyone likes pretty pictures.)
    *   Build other useful and interesting things on top of ERDDAP's web services -- see the [Awesome ERDDAP™](https://github.com/IrishMarineInstitute/awesome-erddap) list of awesome ERDDAP-related projects.

You can [customize](/docs/server-admin/deploy-install#customize) your ERDDAP's appearance so ERDDAP™ reflects your organization and fits in with the rest of your website.

## Is the installation procedure hard? Can I do it? {#is-the-installation-procedure-hard-can-i-do-it}

The initial installation takes some time, but it isn't very hard. You can do it. If you get stuck, email me at erd dot data at noaa dot gov . I will help you.  
Or, you can join the [ERDDAP™ Google Group / Mailing List](https://groups.google.com/g/erddap) and post your question there.

## Who Uses ERDDAP™ {#who-uses-erddap}

ERDDAP™ has been installed by approximately 100 organizations in at least 17 countries

(Australia, Belgium, Canada, China, France, India, Ireland, Italy, New Zealand, Russia, South Africa, Spain, Sri Lanka, Sweden, Thailand, UK, USA), including:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html) (Asia-Pacific Data-Research Center, International Pacific Research Center) at the University of Hawaii (UH) 
*   [BCO-DMO at WHOI](https://erddap.bco-dmo.org/erddap/index.html) (Biological and Chemical Oceanography Data Management Office at Woods Hole Oceanographic Institution) 
*   [CanWIN ERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html) (Canadian Watershed Information Network) at the Centre for Earth Observation Science (CEOS), University of Manitoba 
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html) (Coastal Data Information Program at UCSD) 
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html) (National Research Council of Italy, Institute of Polar Sciences) 
*   CSIRO and IMOS (Australia's Commonwealth Scientific and Industrial Research Organisation and the Integrated Marine Observing System)
*   [DIVER (NOAA ORR)](https://pub-data.diver.orr.noaa.gov/erddap/index.html) (NOAA Office of Response and Restoration) 
*   [EMODnet Physics](https://erddap.emodnet-physics.eu/erddap/index.html) (The European Marine Observation and Data Network -- Physics) 
*   [GoMRI](https://erddap.griidc.org/erddap/index.html) (Gulf of Mexico Research Initiative) 
*   [Hakai Institute](https://catalogue.hakai.org/erddap/index.html) (The Hakai Institute on the Central Coast of British Columbia, Canada)
*   [High School Technology Services](https://myhsts.org), which offers coding and technology training for students and adults 
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html) (Irish Centre for High-End Computing)
*   [INCOIS](https://erddap.incois.gov.in/erddap/index.html) (Indian National Centre for Ocean Information Services) 
*   IRD (Institut de Recherche pour le Développement, France)  
    CNRS (Centre National de la Recherche Scientifique, France)  
    UPMC (Université Pierre et Marie CURIE, Paris, France)  
    UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)  
    UGB (Université Gaston Berger -- Saint-Louis du Sénégal)  
    UFHB (Université Félix HOUPHOUËT-BOIGNY, Abidjan, Côte d'Ivoire)  
    IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, France)  
    LMI ECLAIRS (Laboratoire Mixte International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques»)
*   JRC (European Commission - Joint Research Centre, European Union)
*   [The Marine Institute](https://erddap.marine.ie/erddap/index.html) (Ireland) 
*   Marine Instruments S.A. (Spain)
*   NCI (Australia's National Computational Infrastructure)
*   [NOAA CoastWatch](https://coastwatch.noaa.gov/erddap/index.html) (central) 
*   [NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html) (Caribbean/Gulf of Mexico Node) 
*   [NOAA CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html) (Great Lakes Node) 
*   [NOAA CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) which is co-located with and works with  
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html) (Environmental Research Division of SWFSC of NMFS)
*   [NOAA IOOS Sensors](https://erddap.sensors.ioos.us/erddap/index.html) (Integrated Ocean Observing System) 
*   [NOAA IOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html) (Central and Northern California Ocean Observing System, run by Axiom Data Science) 
*   [NOAA IOOS GCOOS Atmospheric and Oceanographic Data: Observing System](https://erddap.gcoos.org/erddap/index.html)  
    [NOAA IOOS GCOOS Atmospheric and Oceanographic Data: Historical Collections](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAA IOOS GCOOS Biological and Socioeconomics](https://gcoos4.tamu.edu/erddap/index.html) (Gulf Coast Ocean Observing System)
*   [NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html) (Northeastern Regional Association of Coastal and Ocean Observing Systems) 
*   [NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html) (National Glider Data Assembly Center) 
*   NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems)
*   [NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html) (Pacific Islands Ocean Observing System) at the University of Hawaii (UH) 
*   NOAA IOOS SCCOOS (Southern California Coastal Ocean Observing System)
*   [NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html) (Southeast Coastal Ocean Observing Regional Association) 
*   [NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html) (National Centers for Environmental Information)   
*   NOAA NGDC STP (National Geophysical Data Center, Solar -- Terrestrial Physics)
*   NOAA NMFS NEFSC (Northeast Fisheries Science Center)
*   [NOAA NOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html) (Center for Operational Oceanographic Products and Services) 
*   [NOAA OSMC](http://osmc.noaa.gov/erddap/index.html) (Observing System Monitoring Center) 
*   [NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html) (Pacific Islands Fisheries Science Center) 
*   [NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html) (Unified Access Framework) 
*   [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / All Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html) (Ocean Observatories Initiative)  
    OOI / Uncabled Data
*   Princeton, Hydrometeorology Research Group
*   R.Tech Engineering, France
*   [Rutgers University, Department of Marine and Coastal Sciences](https://tds.marine.rutgers.edu/erddap/index.html)  
*   San Francisco Estuary Institute
*   [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html) Memorial University of Newfoundland
*   South African Environmental Observation Network
*   Spyglass Technologies
*   Stanford University, Hopkins Marine Station
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html) (International Oceanographic and Information Data Exchange) 
*   [University of British Columbia, Earth, Ocean & Atmospheric Sciences Department](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [University of California at Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [University of Delaware, Satellite Receiving Station](https://basin.ceoe.udel.edu/erddap/index.html) 
*   University of Washington, Applied Physics Laboratory
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html) (Coastal and Marine Geology Program) 
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html) (Voice Of The Ocean, Sweden) 

This is a list of just some of the organizations where ERDDAP™ has been installed by some individual or some group. It does not imply that the individual, the group, or the organization recommends or endorses ERDDAP.

### ERDDAP™ is recommended within NOAA and CNRS {#erddap-is-recommended-within-noaa-and-cnrs}
[NOAA's Data Access Procedural Directive](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) includes ERDDAP™ in its list of recommended data servers for use by groups within NOAA. ERDDAP™ is favorably mentioned in section 4.2.3 of the  
[Guide de bonnes pratiques sur la gestion des données de la recherche  
(Research Data Management Best Practices Guide)](https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) of the Centre National de la Recherche Scientifique (CNRS) in France.

## Slide Shows {#slide-shows}

Here are some PowerPoint slide shows and documents that Bob Simons has created related to ERDDAP.

**DISCLAIMER: The content and opinions expressed in these documents are Bob Simons' personal opinions and do not necessarily reflect any position of the Government or the National Oceanic and Atmospheric Administration.**

The Four Main Documents:

*   [The main introduction to ERDDAP™ (version 5)](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).  
    You can also [watch this video of Bob giving this talk![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [A One Page Description of ERDDAP™ (.pdf)](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Heavy Loads, Grids, Clusters, Federations, and Cloud Computing](/docs/server-admin/scaling)
*   [Bob's Guidelines for Data Distribution Systems](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Other Presentations:

*   [2020 EDM: New Features in ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx) (Or [watch this video of Bob giving this talk](https://www.youtube.com/watch?v=9ArYxgwON2k).)
*   [2019 IOOS DMAC: New Features in ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Summer ESIP: Subsetting In ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Summer ESIP: JSON Support In ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: A Distributed System of Web Services (Faster, Easier, Less Expensive) (Or, why I was happy 4 years ago.)](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM: ERDDAP™ in 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: New Features in ERDDAP™ for Image, Audio, and Video Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF and ERDDAP™ Solutions for Data Integration](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: A Quick Introduction to ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM and 2017 IOOS: New or Little Known ERDDAP™ Features (for Users)](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM and 2017 IOOS: New or Little Known ERDDAP™ Features (for Administrators)](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, and ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: How does data get from the source to the end user? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Summer ESIP: The Big Picture: PARR, OPeNDAP, ERDDAP™, and Data Distribution](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: One And Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: Next Generation Data Servers](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Summer ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: The Ideal User Interface](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Summer ESIP: Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Don't Treat In-Situ and Tabular Data Like Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Do More With Less](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Guidelines for Data Distribution Systems](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Presentations By Other People:

*   [A FAIR based tool for improving Global Data sharing![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
    by Kevin O'Brien at the Global Ocean Observing System (GOOS) Webinar / Observation Coordination Group (OCG) Series / 1, November 12, 2020.
*   [Building Your Own Weather App Using NOAA Open Data and Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
    by Filipe Fernandes and Rich Signell at SciPy 2018, July 13, 2018.
*   [Using the OOI ERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
    by Rich Signell, February 2018.
*   [ESIP Tech Dive: "ERDDAP Lightning Talks"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
    Eight 5-Minute Talks About Interesting Things People Are Doing With ERDDAP by Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton and Eli Hunter presented as an ESIP Tech Dive on August 31, 2017.
*   [Using ERDDAP™ to Access Tabular Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
    by Rich Signell, August 2015.
*   [Test Using ERDDAP™ for Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
    by Rich Signell, August 2015.
*   [Using Data From ERDDAP™ in NOAA's GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).  
    In this video, Rich Signell downloads ocean currents forecast data from ERDDAP™ to model a toxic spill in the ocean using [NOAA's GNOME software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html) (in 5 minutes!). (One tiny error in the video: when searching for datasets, don't use AND between search terms. It is implicit.) By Rich Signell, April 8, 2011.
