---
title: "ERDDAP™ Documentation"
---
## Última ERDDAP™ versão{#latest-erddap-version} 

2.30.0, ver [altera a documentação](/changes#version-2300) e [obtê-lo](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) .

##  ERDDAP™ informação{#erddap-information} 

 ERDDAP™ é um servidor de dados científicos que dá aos usuários uma forma simples e consistente de baixar subconjuntos de
conjuntos de dados científicos grafados e tabulares em formatos de arquivos comuns e fazer gráficos e mapas.
 ERDDAP™ é uma fonte livre e aberta (Apache e Apache-like)   Java Servlet de NOAA   NMFS   SWFSC Divisão de Investigação Ambiental ( ERD ) .

* Para ver/usar um ERDDAP™ instalação: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Para começar com uma instalação lida [o guia de instalação de implantação](/docs/server-admin/deploy-install) .
* Para contribuir código ver o [guia do programador](/docs/contributing/programmer-guide) .


Abaixo você encontrará links relevantes para fazer perguntas e como contribuir.
* Reveja conversas e faça perguntas em [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) ou em [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* Revisão e apresentação de questões [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* Para propor solicitações de recursos, siga esta orientação: [ ERDDAP Discussão # 93 (comentário) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Procurar múltiplos ERDDAP™ s
Existem duas maneiras de pesquisar múltiplos ERDDAP™ s para conjuntos de dados: [Procurar múltiplos ERDDAP™ s](/SearchMultipleERDDAPs.html) e [ ERDDAP™ Discovery Dataset](http://erddap.com/) .


## Configurar o seu próprio ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ é um [Código livre e aberto](https://en.wikipedia.org/wiki/Free_and_open-source_software) , tudo... Java   (servlet) , aplicativo web que é executado em um servidor de aplicativos web (por exemplo, Tomcat (recomendado) , ou Jetty (funciona, mas não o apoiamos.) ) . Esta página web é principalmente para pessoas (" ERDDAP™ administradores") que querem montar o seu próprio ERDDAP™ instalação no seu próprio site.

Para começar com uma instalação lida [o guia de instalação de implantação](/docs/server-admin/deploy-install) .

### Por que utilizar ERDDAP™ para distribuir os seus dados?{#why-use-erddap-to-distribute-your-data} 

Porque o pequeno esforço para montar ERDDAP™ traz muitos benefícios.

* Se você já tem um serviço web para distribuir seus dados,
você pode configurar ERDDAP™ para acessar seus dados através do serviço existente.
Ou, você pode configurar ERDDAP™ para acessar seus dados diretamente de arquivos locais.
* Para cada conjunto de dados, você só precisa escrever um pequeno pedaço de XML para dizer ERDDAP™ como acessar o conjunto de dados.
* Uma vez que você tem ERDDAP™ servindo seus dados, os usuários finais podem:
    * Solicitar os dados de várias maneiras ( DAP , WMS , e mais no futuro) .
    * Obter a resposta de dados em vários formatos de arquivo. (É provavelmente a maior razão&#33;) 
    * Faça gráficos e mapas. (Toda a gente gosta de fotografias bonitas.) 
    * Construir outras coisas úteis e interessantes em cima de ERDDAP Web services -- veja o [ Awesome ERDDAP TM](https://github.com/IrishMarineInstitute/awesome-erddap) lista de impressionante ERDDAP - projectos relacionados.

Podes. [personalizar](/docs/server-admin/deploy-install#customize) sua ERDDAP 's aparência assim ERDDAP™ reflete sua organização e se encaixa com o resto de seu site.

## O procedimento de instalação é difícil? Posso fazê-lo?{#is-the-installation-procedure-hard-can-i-do-it} 

A instalação inicial leva algum tempo, mas não é muito difícil. Tu consegues. Se ficares preso, manda-me um e-mail. erd dot data at noaa dot gov . Eu ajudo-te.
Ou, você pode se juntar ao [ ERDDAP™ Grupo Google / Lista de Correios](https://groups.google.com/g/erddap) e postar sua pergunta lá.

## Quem Usa ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ foi instalado por aproximadamente 100 organizações em pelo menos 17 países

 (Austrália, Bélgica, Canadá, China, França, Índia, Irlanda, Itália, Nova Zelândia, Rússia, África do Sul, Espanha, Sri Lanka, Suécia, Tailândia, Reino Unido, EUA) , incluindo:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Centro de Pesquisa de Dados Ásia-Pacífico, Centro Internacional de Pesquisa do Pacífico) na Universidade do Havaí (UH)  
*    [BCO-DMO na WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Oceanografia Biológica e Química Escritório de Gestão de Dados em Woods Hole Oceanographic Instituição)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Rede Canadense de Informações sobre Bacias Hidrográficas) no Centro de Ciência de Observação da Terra (CEOS) , Universidade de Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Programa de Informação de Dados Costeira da UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (Conselho Nacional de Pesquisa da Itália, Instituto de Ciências Polares)  
* CSIRO e IMOS (Organização Australiana de Investigação Científica e Industrial e Sistema Integrado de Observação Marinha) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Gabinete de Resposta e Restauração)  
*    [Física EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)   (A Rede Europeia de Observação e Dados Marinhos -- Física)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Iniciativa de Investigação do Golfo do México)  
*    [Instituto Hakai](https://catalogue.hakai.org/erddap/index.html)   (Instituto Hakai na Costa Central da Colúmbia Britânica, Canadá) 
*    [Serviços de Tecnologia do Ensino Médio](https://myhsts.org) , que oferece codificação e formação tecnológica para estudantes e adultos
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Centro Irlandês de Computação de Alto Fim) 
*    [I NCO É](https://erddap.incois.gov.in/erddap/index.html)   (Centro Nacional Indiano de Serviços de Informação Oceânica)  
* IRD (Institut de Recherche pour le Développement, França)   
CNRS (Centre National de la Recherche Scientifique, França)   
UPMC (Universidade Pierre et Marie CURIE, Paris, França)   
UCAD (Universidade Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUÖT-BOIGNY, Abidjan, Costa do Marfim)   
IPSL (Instituto Pierre Simon Laplace des sciences de l'environnement, Paris, França)   
LMI ECLAIRS (Laboratoire Mixte International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques») 
* JRC (Comissão Europeia - Centro Comum de Investigação, União Europeia) 
*    [O Instituto Marinho](https://erddap.marine.ie/erddap/index.html)   (Irlanda)  
* S.A. (Espanha) 
* NCI (Infraestrutura Computacional Nacional da Austrália) 
*    [ NOAA Vigia Costeira](https://coastwatch.noaa.gov/erddap/index.html)   (central)  
*    [ NOAA CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Node das Caraíbas/Golfo do México)  
*    [ NOAA Relógio de Costa GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Nó dos Grandes Lagos)  
*    [ NOAA CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) que é co-localizado com e trabalha com
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Divisão de Investigação Ambiental SWFSC de NMFS ) 
*    [ NOAA Sensores IOOS](https://erddap.sensors.ioos.us/erddap/index.html)   (Sistema integrado de observação do oceano)  
*    [ NOAA IOOS Ce NCO SO](https://erddap.axiomdatascience.com/erddap/index.html)   (Sistema de Observação do Oceano Central e Norte da Califórnia, gerido pela Axiom Data Science)  
*    [ NOAA IOOS GCOOS Dados atmosféricos e oceanográficos: Sistema de observação](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Dados atmosféricos e oceanográficos: Coleções históricas](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologia e Socioeconomia](https://gcoos4.tamu.edu/erddap/index.html)   (Sistema de Observação do Oceano da Costa do Golfo) 
*    [ NOAA NERACOOS DE IOOS](http://www.neracoos.org/erddap/index.html)   (Associação Regional Nordeste de Sistemas de Observação Costeira e Oceânica)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Glider Nacional Centro de Montagem de Dados)  
*    NOAA IOOS NANOOS (Associação Noroeste de Sistemas de Observação de Oceanos em Rede) 
*    [ NOAA IOOS PACIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Sistema de Observação do Oceano das Ilhas do Pacífico) na Universidade do Havaí (UH)  
*    NOAA IOOS SCCOOS (Sistema de observação do oceano costeiro sul da Califórnia) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Associação Regional de Observação do Oceano Litoral Sudeste)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Centros Nacionais de Informação Ambiental)    
*    NOAA NGDC STP (Geofísica Nacional Data Center, Solar -- Física Terrestre) 
*    NOAA   NMFS NEFSC (Centro de Ciência da Pesca Nordeste) 
*    [ NOAA COOPS NOS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Centro de Produtos e Serviços Oceanográficos Operacionais)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Centro de Monitoramento do Sistema de Observação)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Centro Científico das Pescas das Ilhas do Pacífico)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA Relógio Polar](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Framework de Acesso Unificado)  
*    [Redes Oceânicas Canadá](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Rede de Rastreamento Oceânico](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Todos os Dados](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Iniciativa Observatórios do Oceano)   
OOI / Dados Incabled
* Princeton, Grupo de Pesquisa em Hidrometeorologia
* R.Tech Engenharia, França
*    [Universidade de Rutgers, Departamento de Ciências Marinhas e Costeiras](https://tds.marine.rutgers.edu/erddap/index.html)   
* Instituto Estuário de São Francisco
*    [Scripps Instituição de Oceanografia, Spray Subwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Atlântico Inteligente](https://www.smartatlantic.ca/erddap/index.html) Universidade Memorial de Terra Nova
* Rede Sul-Africana de Observação Ambiental
* Tecnologias Spyglass
* Universidade de Stanford, Estação Marinha de Hopkins
*    [IODE DA UNESCO](https://erddap.oa.iode.org/erddap/index.html)   (Oceanografia Internacional e Informação Intercâmbio de dados)  
*    [Universidade de Colúmbia Britânica, Terra, Oceano e Atmosférico Departamento de Ciências](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Universidade da Califórnia em Davis, Laboratório Marinho Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Universidade de Delaware, estação de recepção de satélite](https://basin.ceoe.udel.edu/erddap/index.html)  
* Universidade de Washington, Laboratório de Física Aplicada
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Programa de Geologia Costeira e Marinha)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Voz do oceano, Suécia)  

Esta é uma lista de apenas algumas das organizações onde ERDDAP™ foi instalado por algum indivíduo ou algum grupo. Não implica que o indivíduo, o grupo, ou a organização recomenda ou endossa ERDDAP .

###  ERDDAP™ é recomendado dentro de NOAA e CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Directiva relativa ao procedimento de acesso aos dados](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) inclui ERDDAP™ em sua lista de servidores de dados recomendados para uso por grupos dentro NOAA . ERDDAP™ é favoravelmente mencionado na secção 4.2.3 do
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Gestão de Dados de Investigação Guia de Boas Práticas) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) do Centro Nacional de la Recherche Scientifique (CNRS) em França.

## Apresentações{#slide-shows} 

Aqui estão alguns slides PowerPoint mostra e documentos que Bob Simons criou relacionados a ERDDAP .

 **DISCLAIMER: O conteúdo e as opiniões expressas nesses documentos são as opiniões pessoais de Bob Simons e não refletem necessariamente qualquer posição do Governo ou do National Oceanic and Atmospheric Administration .** 

Os Quatro Documentos Principais:

*    [A introdução principal de ERDDAP™   (Versão 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Você também pode [assistir este vídeo de Bob dando esta palestra![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Uma descrição de uma página ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Cargas Pesadas, Grades, Aglomerados, Federações e Computação em Nuvem](/docs/server-admin/scaling) 
*    [Diretrizes de Bob para Sistemas de Distribuição de Dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Outras Apresentações:

*    [2020 EDM: Novos recursos em ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 DMIT: Ingerir dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Ou [assistir este vídeo de Bob dando esta palestra](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Novos recursos em ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 ESIP de Verão: Subsetting In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Summer ESIP: Suporte da JSON ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Um Sistema Distribuído de Web Services (Mais rápido, mais fácil e menos caro)   (Ou porque estava feliz há 4 anos.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ em 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Novos recursos em ERDDAP™ para dados de imagem, áudio e vídeo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF e ERDDAP™ Soluções para Integração de Dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Uma rápida introdução a ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM e 2017 IOOS: Novo ou pouco conhecido ERDDAP™ Características (para Usuários) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM e 2017 IOOS: Novo ou pouco conhecido ERDDAP™ Características (para Administradores) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB, e ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Como os dados vão da fonte para o usuário final? Velha Escola contra Nova Escola](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Verão ESIP: A Grande Imagem: PARR, OPeNDAP , ERDDAP™ , e Distribuição de Dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Um e feito](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 API Gov: Próxima Geração Servidores de Dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Verão ESIP: Agregação tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob do fazer e não para dados tabulares](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: A interface ideal do usuário](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 ESIP de verão: Dados tabulares](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Não trate os dados in situ e tabular como dados cintilados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Fazer mais com menos](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Diretrizes para Sistemas de Distribuição de Dados](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Apresentações de outras pessoas:

*    [Uma ferramenta baseada em FAIR para melhorar o compartilhamento global de dados![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
por Kevin O'Brien no Sistema Global de Observação do Oceano (GOOS) Webinar / Grupo de Coordenação de Observação (OCG) Série / 1, novembro 12, 2020.
*    [Construindo sua própria aplicação meteorológica usando NOAA Abrir os livros de dados e notas do Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
por Filipe Fernandes e Rich Signell na SciPy 2018, 13 de julho de 2018.
*    [Usar o OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
por Rich Signell, fevereiro de 2018.
*    [ESIP Tech Dive: " ERDDAP Fala o Relâmpago"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Oito conversas de 5 minutos sobre coisas interessantes que as pessoas estão fazendo ERDDAP por Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton e Eli Hunter apresentaram-se como um mergulho técnico ESIP em 31 de agosto de 2017.
*    [Utilização ERDDAP™ para acessar dados tabulares![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
por Rich Signell, agosto de 2015.
*    [Usar o Teste ERDDAP™ para dados de carbono azul![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
por Rich Signell, agosto de 2015.
*    [Usar Dados De ERDDAP™ em NOAA 's GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
Neste vídeo, Rich Signell baixa dados de previsão de correntes oceânicas de ERDDAP™ para modelar um derrame tóxico no oceano usando [ NOAA 's GNOME software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (Em 5 minutos&#33;) . (Um pequeno erro no vídeo: ao procurar por conjuntos de dados, não use AND entre termos de pesquisa. Está implícito.) Por Rich Signell, 8 de abril de 2011.
