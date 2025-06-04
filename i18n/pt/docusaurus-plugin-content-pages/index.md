---
title: "ERDDAP™ Documentation"
---
## Mais recentesERDDAP™versão{#latest-erddap-version} 

2.27.0, ver o[muda a documentação](/changes#version-2270)e[Faça o download](https://github.com/ERDDAP/erddap/releases/tag/v2.27.0).

## ERDDAP™informação{#erddap-information} 

ERDDAP™é um servidor de dados científicos que dá aos usuários uma maneira simples e consistente de baixar subconjuntos de
conjuntos de dados científicos grelhados e tabulares em formatos de arquivo comuns e fazer gráficos e mapas.
ERDDAP™é uma fonte livre e aberta (Apache e Apache)  JavaServlet deNOAA NMFS SWFSCDivisão de Investigação Ambiental (ERD) .

* Para ver / usar umERDDAP™instalação:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Para começar com uma leitura de instalação[o guia de instalação de implantação](/docs/server-admin/deploy-install).
* Para contribuir com o código ver o[guia do programador](/docs/contributing/programmer-guide).


Abaixo você encontrará links relevantes para fazer perguntas e como contribuir.
* Analise conversas e faça perguntas em[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)ou em[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Reveja e envie questões para[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Para propor solicitações de recursos, siga esta orientação:[ERDDAPDiscussões #93 (comentário) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## MúltiplosERDDAP™S
Existem duas maneiras de pesquisar váriosERDDAP™s para conjuntos de dados:[MúltiplosERDDAP™S](/SearchMultipleERDDAPs.html)e[ERDDAP™Dataset Discovery](http://erddap.com/).


## Configure o seu próprioERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™é um[Fonte livre e aberta](https://en.wikipedia.org/wiki/Free_and_open-source_software)Tudo...Java  (- Sim.) , aplicação web que é executado em um servidor de aplicativos web (por exemplo, Tomcat (recomendado) , ou Jetty (funciona, mas não o apoiamos) ) . Esta página web é principalmente para pessoas ("ERDDAP™administradores") quem quer montar seu próprioERDDAP™instalação em seu próprio site.

Para começar com uma leitura de instalação[o guia de instalação de implantação](/docs/server-admin/deploy-install).

### Por que usarERDDAP™para distribuir seus dados?{#why-use-erddap-to-distribute-your-data} 

Porque o pequeno esforço para configurarERDDAP™traz muitos benefícios.

* Se você já tem um serviço web para distribuir seus dados,
você pode configurarERDDAP™para acessar seus dados através do serviço existente.
Ou você pode configurarERDDAP™para acessar seus dados diretamente de arquivos locais.
* Para cada conjunto de dados, você só tem que escrever um pequeno pedaço de XML para contarERDDAP™como acessar o conjunto de dados.
* Uma vez que você temERDDAP™servir seus dados, usuários finais podem:
    * Solicitar os dados de várias maneiras (DAP,WMS, e mais no futuro) .
    * Obtenha a resposta de dados em vários formatos de arquivo. (Essa é provavelmente a maior razão&#33;) 
    * Faça gráficos e mapas. (Todos gostam de fotos bonitas.) 
    * Construa outras coisas úteis e interessantes em cima deERDDAP's serviços web -- ver o[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)lista de incrívelERDDAP- projetos relacionados.

Você pode[personalizar](/docs/server-admin/deploy-install#customize)Tu ésERDDAPA aparência é assimERDDAP™reflete sua organização e se encaixa com o resto do seu site.

## O procedimento de instalação é difícil? Posso fazer isso?{#is-the-installation-procedure-hard-can-i-do-it} 

A instalação inicial leva algum tempo, mas não é muito difícil. Tu consegues. Se ficares preso, envia-me um e-mail.erd dot data at noaa dot gov. Eu ajudo-te.
Ou você pode se juntar a[ERDDAP™Google Group / Lista de Correios](https://groups.google.com/g/erddap)e postar sua pergunta lá.

## Quem usaERDDAP™ {#who-uses-erddap} 

ERDDAP™foi instalado por aproximadamente 100 organizações em pelo menos 17 países

 (Austrália, Bélgica, Canadá, China, França, Índia, Irlanda, Itália, Nova Zelândia, Rússia, África do Sul, Espanha, Sri Lanka, Suécia, Tailândia, Reino Unido, EUA) , incluindo:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Centro de Pesquisa de Dados Ásia-Pacífico, Centro Internacional de Pesquisa do Pacífico) na Universidade do Havaí (UH)  
*   [BCO-DMO na WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Oceanografia Biológica e Química Escritório de gerenciamento de dados em Woods Hole Oceanographic Instituição)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Rede de Informação Canadenses) no Centro de Ciências da Observação da Terra (CEOS) , Universidade de Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Programa de Informação de Dados Costeiros na UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Conselho Nacional de Pesquisa da Itália, Instituto de Ciências Polares)  
* CSIRO e IMOS (Comunidade da Austrália Organização de Pesquisa Científica e Industrial e Sistema Integrado de Observação Marinha) 
*   [DIVERSIDADE (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAEscritório de Resposta e Restauração)  
*   [EMODnet Física](https://erddap.emodnet-physics.eu/erddap/index.html)  (A European Marine Observation and Data Network -- Física)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Iniciativa de Pesquisa do Golfo do México)  
*   [Instituto Hakai](https://catalogue.hakai.org/erddap/index.html)  (O Instituto Hakai na Costa Central da Colúmbia Britânica, Canadá) 
*   [Serviços de Tecnologia da Escola Superior](https://myhsts.org), que oferece formação de codificação e tecnologia para estudantes e adultos
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Centro irlandês para computação de alto nível) 
*   [Eu...NCOÉ.](https://erddap.incois.gov.in/erddap/index.html)  (Centro Nacional Indiano de Serviços de Informação do Oceano)  
* IRD (Institut de Recherche pour le Développement, França)   
CNRS (Centre National de la Recherche Scientifique, France)   
UPMC (Université Pierre et Marie CURIE, Paris, França)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger - Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUT-BOIGNY, Abidjan, Costa do Marfim)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, França)   
LMI ECLAIRS (Mistura do Laboratoire Internacional «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques») 
* JRC (Comissão Europeia - Centro Comum de Investigação, União Europeia) 
*   [Instituto Marinho](https://erddap.marine.ie/erddap/index.html)  (Irlanda)  
* Instrumentos marinhos S.A. (Espanha) 
* NIC (Infraestrutura Computacional Nacional da Austrália) 
*   [NOAARelógio de montanha](https://coastwatch.noaa.gov/erddap/index.html)  (central central central)  
*   [NOAACGOM relógio costeiro](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Caribe / Golfe do México Node)  
*   [NOAACosta relógio GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Great Lakes Node)  
*   [NOAACosta Oeste da Costa](https://coastwatch.pfeg.noaa.gov/erddap/index.html)que é co-localizado com e trabalha com
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Divisão de Investigação AmbientalSWFSCdeNMFS) 
*   [NOAASensores IOOS](https://erddap.sensors.ioos.us/erddap/index.html)  (Sistema Integrado de Observação do Oceano)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Sistema de Observação do Oceano da Califórnia Central e do Norte, gerido pela Axiom Data Science)  
*   [NOAAIOOS GCOOS Dados Atmosféricos e Oceanográficos: Sistema de Observação](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Dados Atmosféricos e Oceanográficos: Coleções Históricas](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biológico e Socioeconomia](https://gcoos4.tamu.edu/erddap/index.html)  (Sistema de Observação da Costa do Golfo) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Associação Regional Nordeste de Sistemas de Observação Costeira e Oceânica)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Glider nacional Centro de montagem de dados)  
*   NOAAIOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Sistema de Observação Oceano Pacífico) na Universidade do Havaí (UH)  
*   NOAAIOOS SCCOOS (Sistema de Observação do Oceano Costeiro da Califórnia) 
*   [NOAAIOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Southeast Coastal Ocean Observando Associação Regional)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Centros Nacionais de Informação Ambiental)    
*   NOAANGDC STP (Geofísica Nacional Data Center, Solar -- Física Terrestre) 
*   NOAA NMFSNEFSC (Centro de Ciência da Pesca do Nordeste) 
*   [NOAANOS CO-OPs](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Centro de Produtos e Serviços Oceânicos Operacionais)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Observando o Centro de Monitoramento do Sistema)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Centro de Ciência da Pesca das Ilhas do Pacífico)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Quadro de acesso unificado)  
*   [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Rede de Acompanhamento do Oceano](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Todos os dados](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Iniciativa de Observação do Oceano)   
OOI / Dados não habilitados
* Princeton, Grupo de Pesquisa de Hidrometeorologia
* R.Tech Engineering, França
*   [Universidade de Rutgers, Departamento de Ciências Marinhas e Costeiras](https://tds.marine.rutgers.edu/erddap/index.html)  
* Instituto Estuário de São Francisco
*   [Scripps Instituição de Oceanografia, Pulverizador de Gliders Subaquáticos](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Atlântico inteligente](https://www.smartatlantic.ca/erddap/index.html)Memorial University of Newfoundland
* Rede de Observação Ambiental da África do Sul
* Tecnologias de Spyglass
* Stanford University, Hopkins Marine Station
*   [IODE UNESCO](https://erddap.oa.iode.org/erddap/index.html)  (International Oceanographic and Information Troca de dados)  
*   [Universidade da Colúmbia Britânica, Terra, Oceano e Atmosférico Departamento de Ciências](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Universidade da Califórnia em Davis, Laboratório marinho de Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Universidade de Delaware, Estação de recebimento por satélite](https://basin.ceoe.udel.edu/erddap/index.html) 
* Universidade de Washington, Laboratório de Física Aplicada
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Programa de Geologia Costeira e Marinha)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Voz do Oceano, Suécia)  

Esta é uma lista de apenas algumas das organizações ondeERDDAP™foi instalado por algum indivíduo ou algum grupo. Não implica que o indivíduo, o grupo, ou a organização recomenda ou aprovaERDDAP.

### ERDDAP™é recomendado dentroNOAAe CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAADirectiva relativa ao acesso aos dados](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)incluiERDDAP™em sua lista de servidores de dados recomendados para uso por grupos dentroNOAA.ERDDAP™é favoravelmente mencionado na seção 4.2.3 do
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Gestão de Dados de Pesquisa Guia de melhores práticas) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) do Centro Nacional de la Recherche Scientifique (CNRS) em França.

## Apresentação de Slides{#slide-shows} 

Aqui estão alguns slide shows PowerPoint e documentos que Bob Simons criou relacionadosERDDAP.

 **DISCLAIMER: O conteúdo e as opiniões expressas nestes documentos são as opiniões pessoais de Bob Simons e não refletem necessariamente qualquer posição do Governo ou do Governo.National Oceanic and Atmospheric Administration.** 

Os quatro documentos principais:

*   [A introdução principalERDDAP™  (versão 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Você também pode[assistir a este vídeo de Bob dando esta conversa![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Uma página Descrição deERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Cargas pesadas, Grades, Clusters, Federações e Computação em Nuvem](/docs/server-admin/scaling)
*   [Diretrizes da Bob para Sistemas de Distribuição de Dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Outras apresentações:

*   [2020 EDM: Novos recursos emERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Ingestão de dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Ou[assistir a este vídeo de Bob dando esta conversa](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Novos recursos emERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Verão ESIP: Subconfiguração emERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 ESIP Verão: Suporte JSON emERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Um Sistema Distribuído de Serviços Web (Mais rápido, mais fácil, menos caro)   (Ou porque estava feliz há 4 anos.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™em 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Novos recursos emERDDAP™para dados de imagem, áudio e vídeo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF eERDDAP™Soluções para integração de dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Uma introdução rápida aERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM e 2017 IOOS: Novo ou Pequeno ConhecidoERDDAP™Características (para usuários) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM e 2017 IOOS: Novo ou Pequeno ConhecidoERDDAP™Características (para administradores) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, eERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Como os dados chegam da fonte ao usuário final? Escola antiga versus Escola Nova](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Verão ESIP: O grande quadro: PARR,OPeNDAP,ERDDAP™, e distribuição de dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: um e feito](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 API do Gov: próxima geração Servidores de dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Verão ESIP: Agregação Tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's e não para dados tabulares](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: A interface de usuário ideal](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Verão ESIP: Dados Tabulares](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Não Trate Dados In-Situ e Tabulares como dados raivosos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Fazer mais com menos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Diretrizes para sistemas de distribuição de dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Apresentações por outras pessoas:

*   [Uma ferramenta baseada na FAIR para melhorar o compartilhamento global de dados![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
por Kevin O'Brien no Sistema Global de Observação do Oceano (GOOS) Webinar / Grupo de Coordenação de Observação (OCG) Série / 1, 12 de novembro de 2020.
*   [Construindo seu próprio aplicativo de tempo usandoNOAAOpen Data and Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
por Filipe Fernandes e Rich Signell na SciPy 2018, 13 de julho de 2018.
*   [Usando a OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
por Rich Signell, fevereiro de 2018.
*   [ESIP Tech Dive: "ERDDAPConversas de relâmpago![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Oito conversas de 5 minutos sobre coisas interessantes que as pessoas estão fazendo comERDDAPpor Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton e Eli Hunter apresentaram como um ESIP Tech Dive em 31 de agosto de 2017.
*   [UsandoERDDAP™para acessar dados tabulares![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
por Rich Signell, agosto de 2015.
*   [Teste usandoERDDAP™para dados de carbono azul![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
por Rich Signell, agosto de 2015.
*   [Usando dados deERDDAP™emNOAA'GNOMESoftware![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Neste vídeo, Rich Signell baixa dados da previsão de correntes oceânicasERDDAP™para modelar um derramamento tóxico no oceano usando[NOAA'GNOMEsoftware de software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (em 5 minutos&#33;) . (Um pequeno erro no vídeo: ao procurar conjuntos de dados, não use E entre termos de pesquisa. É implícito.) Por Rich Signell, 8 de abril de 2011.
