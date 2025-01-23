---
title: "EDDTableFromEML" 
---
# A tabela EDDFromEML e tabela EDDFromEMLBatch Opções em GerarDatasets Xml

\\[Esta página será apenas de interesse paraERDDAP™administradores que trabalham com arquivos EML.
Esse documento foi originalmente criado em 2016. Foi editado pela última vez em 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)é um servidor de dados que dá aos usuários uma maneira simples e consistente de baixar subconjuntos de conjuntos de dados científicos grelhados e tabulares em formatos de arquivo comuns e fazer gráficos e mapas.ERDDAP™funciona com um dado conjunto de dados como um grupo de variáveis multidimensionais gradeadas (por exemplo, dados de satélite ou modelo) ou como uma tabela de banco de dados (com uma coluna para cada tipo de informação e uma linha para cada observação) .ERDDAP™é Livre e Open Source Software, para que qualquer pessoa possa[baixar e instalarERDDAP™](/docs/server-admin/deploy-install)para servir seus dados.

Para adicionar um conjunto de dados a umERDDAP™instalação, aERDDAP™administrador deve adicionar um pedaço de XML descrevendo o conjunto de dados em um arquivo chamadodatasets.xml. (Há[documentação completa paradatasets.xml](/docs/server-admin/datasets).) Embora seja possível gerar o pedaço de XML paradatasets.xmlinteiramente à mão,ERDDAP™vem com uma ferramenta chamada[ **Gerar conjuntos de dadosXml** ](/docs/server-admin/datasets#tools)que pode gerar o rascunho áspero do pedaço de XML necessário para um dado conjunto de dados com base em alguma fonte de informação sobre o conjunto de dados.

A primeira coisa GerarDatasets Xml pergunta é que tipo de conjunto de dados que você deseja criar. Gerar conjuntos de dados Xml tem uma opção especial, **EDDTable FromEML** , que utiliza a informação num[Idioma de Metadados Ecológicos (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)arquivo XML para gerar o pedaço de XML paradatasets.xmlpara criar um[EDDTable FromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)dataset de cada tabela de dados em um arquivo EML. Isso funciona muito bem para a maioria dos arquivos EML, principalmente porque os arquivos EML fazem um excelente trabalho de armazenar todos os metadados necessários para um conjunto de dados em um formato fácil de trabalhar. As informações que GenerateDatasetsXml precisa para criar os conjuntos de dados estão no arquivo EML, incluindo a URL do arquivo de dados, que GerrateDatasetsXml downloads, parses e compara com a descrição no arquivo EML. (Muitos grupos fariam bem em mudar para EML, que é um grande sistema para documentar qualquer conjunto de dados científicos tabular, não apenas dados ecológicos. E muitos grupos que criam esquemas XML fariam bem em usar EML como um estudo de caso para esquemas XML que são claros, ao ponto, não excessivamente profundos (ou seja, muitos níveis) , e fácil para humanos e computadores para trabalhar com.) 

## Perguntas{#questions} 

Aqui estão todas as perguntas GerarDatasets Xml vai perguntar, com comentários sobre como você deve responder se você quer processar apenas um arquivo EML ou um lote de arquivos EML:

* Qual EDDType?
Se você quiser processar apenas um arquivo, responda: EDDTableFromEML
Se você quiser processar um grupo de arquivos, responda: EDDTableFromEMLBatch
* Diretório para armazenar arquivos?
Digite o nome do diretório que será usado para armazenar arquivos EML baixados e / ou dados.
Se o diretório não existir, ele será criado.
*    (Para EDDTable FromEML apenas) URL EML ou arquivo localName?
Digite o URL ou o nome de arquivo local de um arquivo EML.
*    (Para EDDTable FromEMLBatch somente) EML dir (URL ou local) ?
Digite o nome do diretório com os arquivos EML (uma URL ou um dir local) .
Por exemplo: http://sbc.lternet.edu/data/eml/files/
 
*    (Para EDDTable FromEMLBatch somente) Nome de arquivo regex?
Digite a expressão regular que será usada para identificar os arquivos EML desejados no diretório EML.
Por exemplo: knb-lter-sbc\\.\\d+
* Use arquivos locais se presentes (verdadeiro|falso) ?
Digite true para usar os arquivos EML locais existentes e arquivos de dados, se eles existirem.
Digite falso para sempre re-download dos arquivos EML e / ou arquivos de dados.
* acessível Para?
Se você quiser que os novos conjuntos de dados sejam conjuntos de dados privados emERDDAP, especifique o nome do grupo (S) que será permitido o acesso.
Recomendado para grupos LTER: combinar "lter" mais o grupo, por exemplo, lter Sbc.
Se você entrar "null", não haverá&lt;acessível To &gt; tag na saída.
Ver[acessível Para](/docs/server-admin/datasets#accessibleto).
* local local TimeZone (por exemplo, EUA/Pacífico) ?
Se uma variável de tempo indicar que possui valores de hora local, este fuso horário será atribuído.
Este deve ser um valor do[Lista de colunas TZ de nomes de fuso horário](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Note todos os nomes "US/..." fáceis de usar no final da lista.
Se você achar que está incorreta, você pode mudar otime\\_zoneno pedaço dedatasets.xml.

EML maisERDDAP™é uma grande combinação, desdeERDDAP™pode dar aos usuários mais acesso direto à riqueza de[Rede de Conhecimento para Biocomplexidade (KNB) ](https://knb.ecoinformatics.org/)e[Pesquisa Ecológica de Longo Prazo (LTER) ](https://lternet.edu/)dados e ajudar esses projetos a cumprir o governo dos EUA[Acesso público aos resultados da pesquisa (PARR) requisitos](https://nosc.noaa.gov/EDMC/PD.DSP.php)fazendo os dados disponíveis através de um serviço web. Além disso, EML plusERDDAP™parece uma grande ponte entre cientistas no campo acadêmico / NSF-fundado e cientistas na agência federal (NOAA, NASA, USGS) reino.

Veja o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
 
## Detalhes do projeto{#design-details} 

Aqui estão os detalhes do projeto da opção EDDTableFromEML em GerarDatasetsXml.
Alguns estão relacionados a diferenças em como EML eERDDAP™fazer coisas e como GerarDatasets Xml lida com esses problemas.

### Uma tabela de dados Becomes OneERDDAP™Conjunto de dados{#one-datatable-becomes-one-erddap-dataset} 
Um arquivo EML pode ter vários&lt;dados Table &gt;s.ERDDAP™faz umERDDAP™dataset per EML dataTable. OdatasetIDpara o conjunto de dados é
 *EMLNome* Não. *tabela de madeira*   (quando EMLname é texto) ou
 *sistema\\_EMLName* Não. *tabela de madeira*   (quando EMLname é um número) .
Por exemplo, a tabela #1 no arquivo knb-lter-sbc.28, torna-seERDDAP™ datasetID= knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Quase todos os metadados nos arquivos EML entramERDDAP, mas em um formato diferente.ERDDAP™usa o[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrões de metadados. Eles são sistemas de metadados complementares que usam pares chave=valor para metadados globais e para metadados de cada variável.
Sim, a representação EML dos metadados é mais agradável do que a representação CF+ACDD. Não estou a sugerir usar a representação CF+ACDD como substituto para o EML. Por favor, pense em CF+ACDD como parte da ponte do mundo EML para oOPeNDAP/CF/ACDD mundo.
     
### Pequenas mudanças{#small-changes} 
ERDDAP™faz muitas pequenas mudanças. Por exemplo,ERDDAP™usa o EML não-DOIalternativa Identificador mais um número de tabela de dados comoERDDAP™ datasetID, mas ligeiramente muda alternar Identificador para torná-lo um nome variável válido na maioria das linguagens de computador, por exemplo, dados knb-lter-sbc.33 A tabela #1 torna-se knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML usa o sistema de marcação do DocBook para fornecer estrutura para blocos de texto em arquivos EML. CF e ACDD exigem que os metadados sejam texto simples. Então Gerar conjuntos de dados Xml converte o texto marcado em texto simples que se parece com a versão formatada do texto. As tags inline são higienizadas com suportes quadrados, por exemplo,\\[enfatizado\\], e deixou no texto simples.
     
### Arquivos de dados{#data-files} 
Uma vez que a tabela de dados EML inclui a URL do arquivo de dados real, GerarDatasets Xml vai:
1. Baixe o arquivo de dados.
2. Armazená-lo no mesmo diretório que o arquivo EML.
3. Leia os dados.
4. Compare a descrição dos dados no EML com os dados reais no arquivo.
5. Se Gerar conjuntos de dados Xml encontra diferenças, lida com eles, ou pergunta ao operador se as diferenças estão bem, ou retorna uma mensagem de erro. Os detalhes estão em vários itens abaixo.
         
### .zipArquivos de dados{#zipd-data-files} 
Se o arquivo de dados referenciado for um.ziparquivo, ele deve conter apenas um arquivo. Esse arquivo será usado para oERDDAP™conjunto de dados. Se houver mais de 1 arquivo.ERDDAP™rejeitará esse conjunto de dados. Se necessário, isso pode ser modificado. (Na prática, todos os arquivos zip SBC LTER têm apenas um arquivo de dados.)   
     
### Tipo de armazenamento{#storagetype} 
Se um armazenamento de coluna O tipo não é especificado,ERDDAP™usa seu melhor palpite com base nos dados no arquivo de dados. Isto funciona muito bem.
     
### Unidades{#units} 
ERDDAP™uso[UDUNITSformatação para unidades](https://www.unidata.ucar.edu/software/udunits/). Gerar conjuntos de dados Xml é capaz de converter unidades EML paraUDUNITSlimpamente cerca de 95% do tempo. Os 5% restantes resultam em uma descrição legível das unidades, por exemplo, "biomassDensityUnitPerAbundanceUnit" em EML torna-se "unidade de densidade de biomassa por unidade de abundância" emERDDAP. Tecnicamente isto não é permitido. Acho que não é assim tão mau nas circunstâncias.\\[Se necessário, unidades que não podem ser feitasUDUNITScompatível pode ser movido para o atributo comentário da variável.\\]  
     
### EML versão 2.1.1{#eml-version-211} 
Este suporte para arquivos EML v2.1.1 foi adicionado ao GerarDatasets Xml em 2016 com a esperança de que haveria alguma aceitação na comunidade EML. A partir de 2020, isso não aconteceu. OERDDAP™desenvolvedores ficaria feliz em adicionar suporte para versões mais recentes do EML, mas apenas se os novos recursos realmente serão usados. Por favor e-mailerd.data at noaa.govse você quiser suporte para versões mais recentes do EML e vai realmente usar este recurso.
     

## Questões com os arquivos EML{#issues-with-the-eml-files} 

Existem alguns problemas / problemas com os arquivos EML que causam problemas quando um cliente de software (como a opção EDDTableFromEML em GerarDatasetsXML) tenta interpretar / processar os arquivos EML.

* Embora haja várias questões listadas aqui, eles são principalmente pequenos, problemas solváveis. Em geral, EML é um grande sistema e foi meu prazer trabalhar com ele.
* Estes são classificados aproximadamente do pior / mais comum ao menos ruim / menos comum.
* A maioria está relacionada a pequenos problemas em arquivos específicos EML (que não são culpa do EML) .
* A maioria pode ser corrigida por mudanças simples no arquivo EML ou arquivo de dados.
* Dado que as pessoas LTER estão construindo um verificador EML para testar a validade dos arquivos EML, eu adicionei algumas sugestões abaixo sobre recursos que poderiam ser adicionados ao verificador.

Aqui estão os problemas:

### Colunas de data e hora separadas{#separate-date-and-time-columns} 
Alguns arquivos de dados têm colunas separadas para data e para o tempo, mas nenhuma coluna data + hora unificada. Atualmente, GerarDatasets Xml cria um conjunto de dados com essas colunas separadas, mas não é ideal porque:

* É melhor se os conjuntos de dados emERDDAP™tem uma coluna de data + hora combinada chamada"time".
* Muitas vezes o conjunto de dados não vai carregarERDDAP™porque o"time"A coluna não tem dados de data+hora.

Existem duas soluções possíveis:
1. Editar o arquivo de dados de origem para adicionar uma nova coluna no arquivo de dados (e descrevê-lo no EML) onde as colunas de data e hora são mescladas em uma coluna. Em seguida, reinicie GerarDatasets Xml para que ele encontre a nova coluna.
2. Use o[Variáveis derivadas](/docs/server-admin/datasets#script-sourcenamesderived-variables)recurso emERDDAP™para definir uma nova variáveldatasets.xmlque é criado concatenando a data e as colunas do tempo. Um dos exemplos trata especificamente desta situação.
         
### Nomes de coluna persistentes{#inconsistent-column-names} 
Os arquivos EML listam as colunas do arquivo de dados e seus nomes. Infelizmente, eles sÃ£o muitas vezes diferentes dos nomes das colunas no arquivo de dados real. Normalmente, a ordem da coluna no arquivo EML é a mesma que a ordem da coluna no arquivo de dados, mesmo que os nomes variam ligeiramente, mas nem sempre. Gerar conjuntos de dados Xml tenta combinar os nomes das colunas. Quando não consegue (que é comum) , ele vai parar, mostrar-lhe os pares de nomes de arquivo EML/data, e perguntar se eles estão alinhados corretamente. Se você digitar 's' para pular uma tabela, GeneratedDatasetsXml imprimirá uma mensagem de erro e vai para a próxima tabela.
A solução é alterar os nomes de colunas errôneas no arquivo EML para corresponder aos nomes de colunas no arquivo de dados.
     
### Ordem de coluna diferente{#different-column-order} 
Existem vários casos em que o EML especificou as colunas em uma ordem diferente do que existem no arquivo de dados. Gerar conjuntos de dados O Xml vai parar e perguntar ao operador se os matchups estão bem ou se o conjunto de dados deve ser ignorado. Se ele for ignorado, haverá uma mensagem de erro no arquivo de resultados, por exemplo,:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
A solução é corrigir a ordem da coluna nestes arquivos EML para que eles correspondam à ordem nos arquivos de dados.

Seria bom se o verificador EML verificasse que as colunas e a ordem da coluna no arquivo de origem correspondessem às colunas e à ordem da coluna no arquivo EML.
    
### Incorreto numHeaderLines{#incorrect-numheaderlines} 
Vários dados Tabelas incorretamente estado numHeaderLines=1, por exemplo, ...sbc.4011. Isso causaERDDAP™para ler a primeira linha de dados como nomes de colunas. Eu tentei manualmente SKIP todas essas tabelas de dados. Eles são óbvios porque os nomes de col de origem inigualável são todos os valores de dados. E se houver arquivos que incorretamente têm numHeaderLines=0, meu sistema não torna óbvio. Aqui está um exemplo do arquivo de falhas SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Assim, o erro pode aparecer como se GerarDatasets Xml acha que a primeira linha com dados no arquivo (por exemplo, com 2008-10-01T00:00 etc.) é a linha com nomes de colunas (como se 2008-10-01T00:00 fosse um nome de coluna) .

Seria bom se o verificador EML verificar o valor numHeaderLines.
    
### númeroHeaderLines = 0{#numheaderlines--0} 
Alguns arquivos de origem não têm nomes de colunas.ERDDAP™aceita que se o EML descrever o mesmo número de colunas.

Na minha opinião, isto parece muito perigoso. Pode haver colunas em uma ordem diferente ou com unidades diferentes (ver abaixo) e não há maneira de pegar esses problemas. É muito melhor se todos os arquivos de dados ASCII têm uma linha com nomes de colunas.
    
### DataTime Formato cordas{#datetime-format-strings} 
EML tem uma maneira padrão de descrever formatos de data time. mas há uma variação considerável em seu uso em arquivos EML. (Eu estava anteriormente errado sobre isso. Eu vejo a documentação EML para formatString que parece combinar com o[JavaEspecificação DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), mas que não tem as diretrizes importantes sobre o seu uso, com o resultado que formatString é frequentemente/usualmente usado incorretamente.) Existem várias instâncias com caso incorreto e/ou duplicação incorreta de uma letra e/ou formatação não padrão. Isso coloca uma carga irracional sobre clientes, especialmente clientes de software como GenerateDatasetsXml. Gerar conjuntos de dados Xml tenta converter os formatos incorretamente definidos nos arquivos EML em
[o formato data/hora queERDDAP™requerimento](/docs/server-admin/datasets#string-time-units), que é quase idêntico aoJava/Joda especificação de formato de tempo, mas é ligeiramente mais perdoador.

Seria bom se o verificador EML exigisse a adesão rigorosa aoJava/JodaERDDAPespecificação de unidades de tempo e verificou que os valores de tempo de data na tabela de dados podem ser analisados corretamente com o formato especificado.
    
### DateTime Mas Sem fuso horário{#datetime-but-no-time-zone} 
Gerar conjuntos de dados Xml procura uma coluna com data Tempo e um fuso horário especificado (ouZulu: de unidades de tempo terminando em 'Z' ou uma definição de nome ou atributo de coluna que inclui "gmt" ou "utc", ou local: de "local" no nome da coluna ou definição de atributo) . Também aceitável é um arquivo com uma coluna de data mas sem coluna de tempo. Também aceitável é um arquivo sem data ou hora.

Gerar conjuntos de dados Xml trata todos os tempos "locais" como sendo do fuso horário que você pode especificar para um determinado lote de arquivos, por exemplo, para SBC LTER, usar US / Pacífico. A informação é às vezes nos comentários, mas não em uma forma que é fácil para um programa de computador para descobrir.

Os arquivos que não atendem a esse critério são rejeitados com a mensagem "NO GOOD DATE (TIME) VARIABLE". Os problemas comuns são:

* Há uma coluna com datas e uma coluna com tempos, mas não data Coluna do tempo.
* Há unidades de tempo, mas o fuso horário não é especificado.

Outros comentários:
Se houver uma boa data + hora com a coluna do fuso horário, essa coluna será nomeada"time"emERDDAP.ERDDAP™exige que os dados da coluna do tempo sejam compreensíveis/conversíveis paraZulu/UTC/GMT data fuso horárioTimes.\\[Minha crença é: usando tempos locais e diferentes formatos de data/hora (2 dígitos anos&#33; mm/dd/yy vs dd/mm/yyy vs...) em arquivos de dados força o usuário final a fazer conversões complicadas paraZulutempo para comparar dados de um conjunto de dados com dados de outro. Então...ERDDAP™padroniza todos os dados de tempo: Para tempos de cadeia,ERDDAP™sempre usa o ISO 8601:2004 (E) formato padrão, por exemplo, 1985-01-02T00:00Z. Para tempos numéricos,ERDDAP™sempre usa"seconds since 1970-01-01T00:00:00Z".ERDDAP™sempre usa oZulu  (UTC, GMT) fuso horário para remover as dificuldades de trabalhar com diferentes fusos horários e horário padrão versus horário de verão. Então Gerar conjuntos de dados Xml procura uma coluna de tabela de dados EML com data+horaZulu. Isso é difícil porque EML não usa um vocabulário/sistema formal (Tipo...[Java/Joda formato de tempo](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) para especificar os dados Formato do tempo:
Se houver um col com valores numéricos de tempo (por exemplo,Matlabvezes) eZulufuso horário (ou apenas datas, sem colunas de tempo) , é usado como"time".
Se houver um col com dados de data e hora, usando oZulufuso horário, é usado como"time"e qualquer outra coluna de data ou hora é removida.
Se um col com apenas informações de data é encontrado, ele é usado como o"time"variável (sem fuso horário) .
Se houver uma coluna de dados e uma coluna de tempo e nenhuma data combinada Coluna de tempo, o conjunto de dados é REJECTED — mas o conjunto de dados pode ser tornado utilizável adicionando uma data combinada Coluna de tempo (de preferência,Zulufuso horário) para o arquivo de dados e adicionando sua descrição no arquivo EML.
EXEMPLO DA SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #2.

Seria bom se EML/LTER exigisse a inclusão de uma coluna comZulu  (UTC, GMT) fuso horário em todos os arquivos de dados de origem relevantes. O próximo melhor é adicionar um sistema ao EML para especificar umtime\\_zoneatributo usando nomes padrão (do[Coluna TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Faltandomissing\\_value {#missing-missing_value} 
Algumas colunas usam umamissing\\_valuemas não listá-lo nos metadados EML, por exemplo, precipitação\\_mm em knb-lter-sbc.5011 usa -999. Se nenhum valor faltando for especificado no EML, GerarDatasetsXml procura automaticamente valores em falta comuns (por exemplo, 99, -99, 999, -999, 9999, -9999, etc.) e cria esses metadados. Mas outro desaparecidomissing\\_valuenão são apanhados.

Seria bom se o verificador EML procurasse faltarmissing\\_valueS.
    
### Problemas pequenos{#small-problems} 
Há muitos pequenos problemas (ortografia, pontuação) que provavelmente só será encontrado por um humano inspecionando cada conjunto de dados.

Seria bom se o verificador EML procurasse erros ortográficos e gramaticais. Este é um problema difícil porque as palavras na ciência são frequentemente sinalizadas por verificadores de feitiços. A edição humana é provavelmente necessária.
    
### Personagens inválidos do Unicode{#invalid-unicode-characters} 
Alguns dos conteúdos EML contém caracteres Unicode inválidos. Estes são provavelmente personagens do Windows charset que foram copiados incorretamente e colados nos arquivos UTF-8 EML. Gerar conjuntos de dados Xml sanita esses caracteres para, por exemplo,\\[#128\\], então eles são fáceis de procurar noERDDAP™ datasets.xmlficheiro.

Seria bom se o verificador EML verificasse isto. É fácil de encontrar e fácil de corrigir.
    
### Unidades de coluna diferentes] (# DifferentColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Algumas tabelas de dados EML definem colunas que são inconsistentes com as colunas no arquivo de dados, notadamente porque possuem unidades diferentes. Gerar conjuntos de dados Xml sinaliza estes. Cabe ao operador decidir se as diferenças estão bem ou não. Estes aparecem no arquivo de falhas como tabelas de dados "SKIPPED". EXEMPLO no arquivo de falhas SBC LTER:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Seria bom se o verificador EML verificasse que as unidades correspondem. Infelizmente, isso provavelmente Ã© impossível de capturar e, em seguida, impossível de resolver sem entrar em contato com o criador de conjuntos de dados, uma vez que o arquivo de origem nÃ£o inclui unidades. A discrepância para o exemplo acima só foi perceptível porque as unidades foram incluídas no nome da coluna de origem e no nome da coluna EML. Quantas outras tabelas de dados têm esse problema, mas são indetectáveis?
    
### Versões diferentes de EML{#different-versions-of-eml} 
Gerar conjuntos de dados Xml é projetado para trabalhar com EML 2.1.1. Outras versões do EML funcionarão na medida em que correspondem a 2.1.1 ou que o GerrateDatasetsXml tem um código especial para lidar com ele. Este é um problema raro. Quando ocorre, a solução é converter seus arquivos para EML 2.1.1, ou enviar o arquivo EML paraerd.data at noaa.gov, para que eu possa fazer alterações no GerarDatasets Xml para lidar com as diferenças.

Bob adicionou suporte para arquivos EML para GerarDatasets Xml em 2016 com a esperança de que haveria alguma aceitação na comunidade EML. A partir de 2020, isso não aconteceu. Bob está feliz em adicionar suporte para versões mais recentes do EML, mas apenas se os novos recursos realmente serão usados. Por favor e-mailerd.data at noaa.govse você quiser suporte para versões mais recentes do EML e vai realmente usar este recurso.
    
### Solucionar o arquivo de dados{#trouble-parsing-the-data-file} 
Raramente, uma tabela de dados pode ser rejeitada com o erro "número inesperado de itens na linha #120 (observado=52, esperado=50) " Uma mensagem de erro como esta significa que uma linha no arquivo de dados tinha um número diferente de valores do que as outras linhas. Pode ser um problema emERDDAP™  (por exemplo, não analisar o arquivo corretamente) ou no arquivo. EXEMPLO DA SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, veja datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt
