# Reconheceções

O contribuinte[créditos](https://github.com/erddap/erddap/blob/main/CREDITS.md)paraERDDAP™está agora em uma página separada.ERDDAP™é um produto do[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division").

Bob Simons é o autor principal original deERDDAP™  (o designer e desenvolvedor de software que escreveu oERDDAP- código específico) . O ponto de partida foi Roy Mendelssohn's (Chefe do Bob) sugestão de que Bob gire seu programa ConvertTable (um pequeno utilitário que converte dados tabulares de um formato para outro e que foi em grande parte código do pré-NOAAtrabalho que Bob relicenciado para ser open source) em um serviço web.

Foi e é ideias de Roy Mendelssohn sobre sistemas de dados distribuídos, sua sugestão inicial a Bob, e seu apoio contínuo (incluindo hardware, rede e outro suporte de software, e liberando o tempo de Bob para que ele pudesse passar mais tempo noERDDAP™código de código) que tornou este projeto possível e permitiu seu crescimento.

OERDDAP- código específico é licenciado como código aberto protegido por direitos autorais, com[NOAA](https://www.noaa.gov)mantendo os direitos autorais. Ver[ERDDAP™licença](/license).
ERDDAP™usa código aberto protegido por direitos autorais, Apache, LGPL, MIT/X, Mozilla, e bibliotecas e dados de domínio público.
ERDDAP™não requer nenhum código GPL ou programas comerciais.

A maior parte do financiamento para o trabalhoERDDAP™ele tem vindoNOAANa medida em que pagou o salário do Bob Simons. Pelo primeiro ano deERDDAP™, quando ele era um contratante do governo, o financiamento veio do[NOAARelógio de montanha](https://coastwatch.noaa.gov/)programa, o[NOAAIOOS](https://ioos.noaa.gov/)programa, e agora extinta Pacific Ocean Shelf Tracking (AM POSTAM) programa.

Muito crédito vai para muitosERDDAP™administradores e usuários que fizeram sugestões e comentários que levaram a muitas melhorias emERDDAP. Muitos são mencionados pelo nome no[Lista de Mudanças](/changes). Obrigado a todos (nomeado e não nomeado) Muito. Assim,ERDDAP™é um grande exemplo de[Inovação orientada pelo usuário](https://en.wikipedia.org/wiki/User_innovation), onde a inovação do produto vem frequentemente dos consumidores (ERDDAP™usuários) Não apenas os produtores (ERDDAP™desenvolvedores) .

Aqui está a lista de softwares e conjuntos de dados que estão noERDDAP™distribuição. Estamos muito gratos por todos estes. Muito obrigado.
\\[A partir de 2021, tornou-se quase impossível listar corretamente todas as fontes de código paraERDDAP™porque algumas das bibliotecas que usamos (notavelmente netcdf-java e especialmente AWS) por sua vez use muitas, muitas outras bibliotecas. Todas as bibliotecas queERDDAP™chamadas de código diretamente estão incluídas abaixo, assim como muitas das bibliotecas que as outras bibliotecas chamam por sua vez. Se você vê que omitimos um projeto abaixo, por favor nos avise para que possamos adicionar o projeto abaixo e dar crédito onde o crédito é devido.\\]

## Visão geral{#overview} 
ERDDAP™é um[JavaServlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)programa. EmERD, corre dentro de um[Tomcat](https://tomcat.apache.org/)servidor de aplicativos (licença:[Apache](https://www.apache.org/licenses/)) com um[Apache](https://httpd.apache.org/)servidor web (licença:[Apache](https://www.apache.org/licenses/)) , executando em um computador usando o[Red Hat Linux](https://www.redhat.com/)sistema operacional (licença:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) .
     
## Conjuntos de dados{#datasets} 
Os conjuntos de dados são de várias fontes. Veja os metadados (em particular o "sourceUrl",infoUrl""institution"e "licença") para cada conjunto de dados. Muitos conjuntos de dados têm uma restrição de seu uso que exige que você cite/credite o provedor de dados sempre que você usar os dados. É sempre uma boa forma de citar/crédito o provedor de dados. Ver[Como Citar um Dataset em um Documento](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset).
     
## Software de CoHort{#cohort-software} 
[As aulas de com / coorte](#cohort-software)são de CoHort Software ( https://www.cohortsoftware.com ) que torna essas classes disponíveis com uma licença MIT/X-like (veja classes/com/coorte/util/LICENSE.txt) .
     
## Navegador CoastWatch{#coastwatch-browser} 
ERDDAP™usa código do projeto CoastWatch Browser (agora descomissionado) do[NOAARelógio de montanha](https://coastwatch.noaa.gov) [Node regional da Costa Oeste](https://coastwatch.pfeg.noaa.gov/)  (Licença: copyrighted open source) . Esse projeto foi iniciado e gerenciado por Dave Foley, um ex-coordenador doNOAACoastWatch West Coast Node Regional. Todo o código CoastWatch Browser foi escrito por Bob Simons.
     
## OPeNDAP {#opendap} 
Dados de[OPeNDAP](https://www.opendap.org)os servidores são lidos com[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (licença: LGPL) .
     
## NetCDF- Java&#33;{#netcdf-java} 
NetCDFarquivos (.nc) , estilo GMTNetCDFarquivos (Senhor.) , GRIB e BUFR são lidos e escritos com código no[NetCDF JavaBiblioteca](https://www.unidata.ucar.edu/software/netcdf-java/)  (licença:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) a partir de[Unidata](https://www.unidata.ucar.edu/).

Software incluído noNetCDF Java.jar:

* O que é isto?
ONetCDF JavaBiblioteca e Cassandra precisam[slf4j do Simple Logging Facade paraJava](https://www.slf4j.org/)projeto. Atualmente,ERDDAP™usa o slf4j-simple-xxx.jar renomeado como slf4j.jar para atender a esta necessidade. (licença:[MIT/X](https://www.slf4j.org/license.html)) .
     
* JDOM
ONetCDF Java.jar inclui o código de processamento XML de[JDOM](http://www.jdom.org/)  (licença:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , que está incluído no netcdfAll.jar.
     
* Joda.
ONetCDF Java.jar inclui[Joda.](https://www.joda.org/joda-time/)para cálculos de calendário (que provavelmente não são usados porERDDAP) . (licença:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) .
     
* Apache
ONetCDF Java.jar inclui arquivos .jar de vários[Projetos Apache](https://www.apache.org/):
    [códigos de barras](https://commons.apache.org/proper/commons-codec/),
    [descobertas comuns](https://commons.apache.org/discovery/),
    [comuns...httpcliente](https://hc.apache.org/httpcomponents-client-ga/),
    [Abertura de dados](https://commons.apache.org/proper/commons-logging/)  
    [HttpComponentes](https://hc.apache.org),
     (Para todos: licença:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Estes são incluídos no netcdfAll.jar.
     
* Outros
ONetCDF Java.jar também inclui código de: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.com. (O Google usa licenças como Apache e BSD.)   
         
## SGT{#sgt} 
Os gráficos e mapas são criados on-the-fly com uma versão modificada deNOAASGT (no https://www.pmel.noaa.gov/epic/java/sgt/ , agora descontinuado) versão 3 (umJava-based Scientific Graphics Toolkit escrito por Donald Denbo em[NOAAPMEL](https://www.pmel.noaa.gov/))   (Licença: copyrighted open source (no https://www.pmel.noaa.gov/epic/java/license.html ) ) .
     
## Walter Zorn{#walter-zorn} 
Grande, dicas de ferramentas HTML emERDDAPAs páginas HTML são criadas com o wz\\_tooltip de Walter Zorn. Js (licença: LGPL) .
Sliders e o recurso de arrastar e soltar do Slide Sorter são criados com o wz\\_dragdrop.js de Walter Zorn (licença: LGPL) .
     
## abrir o arquivo{#openpdf} 
Os arquivos .pdf são criados com[Abertura](https://github.com/LibrePDF/OpenPDF), um livreJava- Biblioteca PDF.
     
## GSHHS{#gshhs} 
Os dados da costa e do lago são[GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)-- Um Global Self-consistente, Hierárquico, Base de dados Shoreline de alta resolução (licença:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) e criado por Paul Wessel e Walter Smith.

NÃ3s nÃ3s não podemos falar sobre a corrreta dos dados de SHORELINE que vem comERDDAP™-- Não use isso para as puRPOSES NAVIGACIONAIS.
     
    
## Pscoast GMT{#gmt-pscoast} 
A fronteira política e os dados do rio são de[Pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)programa em[GMT](https://www.soest.hawaii.edu/gmt/), que utiliza dados de[CIA Banco Mundial de Dados II](https://www.evl.uic.edu/pape/data/WDB/)  (licença: domínio público) .

NÃ3s nÃ3s não podemos falar sobre a corrreta do DADOS BOUNÁRIO POLÍTICO que vem comERDDAP.
    
## ETOPO{#etopo} 
Os dados de bathymetry/topography usados no fundo de alguns mapas são os[ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Superfície do gelo, grade registrada, binária, 2 byte int: etopo1\\_ice\\_g\\_i2.zip)   (licença:[domínio público](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) , que é distribuído gratuitamente por[NOAANGDC](https://www.ngdc.noaa.gov).

NÃ3s nÃ3s não podemos falar sobre a corrija do BATHYMETRY/TOPOGRAPHY DATA que vem comERDDAP. Não use isso para as puRPOSES NAVIGATIONAL.
    
## JavaCorreio{#javamail} 
Os e-mails são enviados usando o código no correio. jarro deOracle'[JavaAPI do Mail](https://javaee.github.io/javamail/)  (licença:[DESENVOLVIMENTO COMUM E DISTRIBUIÇÃO (CD-ROM) Versão 1.1](https://javaee.github.io/javamail/LICENSE)) .
     
## JSON{#json} 
ERDDAP™uso[Json.org'sJava- biblioteca JSON baseada](https://www.json.org/index.html)para analisar[JSON](https://www.json.org/)dados (licença:[fonte aberta protegida por direitos autorais](https://www.json.org/license.html)) .
     

## PostgrsQL{#postgrsql} 
ERDDAP™inclui o[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)motorista (licença:[BSD](https://www.postgresql.org/about/licence/)) . O driver é Copyright (c) 1997-2010, Grupo de Desenvolvimento Global PostgreSQL. Todos os direitos reservados.
     
## Lucene{#lucene} 
ERDDAP™usar código do Apache[Lucene](https://lucene.apache.org/). (licença:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) para a opção "luceno" motor de busca (mas não para o motor de pesquisa "original" padrão) .
     
## Comprimidos{#commons-compress} 
ERDDAP™usar código do Apache[Comprimidos](https://commons.apache.org/compress/). (licença:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## JEXL{#jexl} 
ERDDAP™suporte para avaliar expressões e scripts em&lt;sourceNames&gt; depende do[Projeto Apache](https://www.apache.org/):[JavaLíngua da expressão (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licença:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## Cassandra{#cassandra} 
ERDDAP™inclui Apache[Cassandra](https://cassandra.apache.org/) [Cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (licença:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) .
Cassandra-driver-core.jar requer (e assimERDDAP™inclui) :
*   [Água.](https://github.com/google/guava)  (licença:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) .
*   [Iz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (licença:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) .
*   [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (licença:[MIT](https://github.com/codahale/metrics/blob/master/LICENSE)) .
*   [netty-all.jar](https://netty.io/downloads.html)  (licença:[Apache 2.0](https://netty.io/downloads.html)) .
*   [Gerenciamento de contas](https://xerial.org/snappy-java/)  (licença:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) .
         
## KT\\_paletas{#kt_-palettes} 
As paletas de cores que têm o prefixo "KT\\_"são um[coleção de paletas .cpt por Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (licença:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , mas ligeiramente reformatado por Jennifer Sevadjian deNOAApara que eles estejam em conformidadeERDDAPRequisitos .cpt.
     
## Leaflet {#leaflet} 
ERDDAP™usa oJavaBiblioteca de script[Leaflet](https://leafletjs.com/)  (licença:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) como oWMScliente emWMSpáginas web emERDDAP. É um excelente software (bem projetado, fácil de usar, rápido e livre) de Vladimir Agafonkin.
     
## AWS{#aws} 
Para trabalhar com Amazon AWS (incluindo S3) ,ERDDAP™usa v2 do[SDK AWS paraJava](https://aws.amazon.com/sdk-for-java/)  (licença:[Apache](https://www.apache.org/licenses/)) .

AWS exige que Maven puxe as dependências. Eles incluem os seguintes arquivos .jar (onde xxx é o número da versão, que muda ao longo do tempo, e o tipo de licença está em parênteses) : anotações-xxx.jar (Apache) , apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analysis-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , checker-qual-xxx.jar (MIT) , erro\\_prone\\_annotations-xxx.jar (Apache) , eventstream-xxx.jar (Apache) , acesso ao fracasso-xxx.jar (Apache) ,httpxxx. (Apache) , j2objc-annotations-xxx.jar (Apache) , jackson-annotations-xxx.jar (Apache) , jackson-core-xxx.jar (Apache) , jackson-databind-xxx.jar (Apache) , jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apache) Nativo. jarra (Apache) , jnr-constants-xxx.jar (Apache) , jnr-ffi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) , jnr-x86asm-xxx.jar (Apache) , json-xxx.jar (Fonte aberta de direitos autorais) , jsr305-xxx.jar (Apache) , listenablefuture-xxx.jar (Apache) , cerca de uma dúzia de netty . O frasco (Apache) , profiles-xxx.jar (Apache) , protocol-core-xxx.jar (Apache) , reactive-streams-xxx.jar (CCO 1.0.) , regiões-xxx.jar (Apache) , s3-xxx.jar (Apache) , sdk-core-xxx.jar (Apache) , utils-xxx.jar (?) . Para ver as licenças reais, procure o nome .jar no[Repositório Maven](https://mvnrepository.com/)e, em seguida, vasculhar nos arquivos do projeto para encontrar a licença.
    

Também estamos muito gratos por todo o software e sites que usamos ao desenvolverERDDAP, incluindo
[Chrome](https://www.google.com/chrome/browser/desktop/),
[curl](https://curl.haxx.se/),
[Duckduck&#33;](https://duckduckgo.com/?q=),
[Editar](https://www.editplus.com/),
[ArquivoZilla](https://filezilla-project.org/).
[GitHub](https://github.com/),
[Google Search](https://www.google.com/webhp),
[Puttle&#33;](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html),
[excesso de pilha](https://stackoverflow.com/),
[Tudo bem.](https://todoist.com/?lang=en),
[Wikipedia](https://www.wikipedia.org/),
a Internet, a World Wide Web, e todos os outros, grandes, sites úteis.
Muito obrigado.
