---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Trabalhar com odatasets.xmlArquivo

\\[Esta página será apenas de interesse paraERDDAP™administradores.\\]

Depois de ter seguido oERDDAP™ [instruções de instalação](/docs/server-admin/deploy-install), você deve editar odatasets.xmlarquivo em *Toca a brincar.* /content/erddap/ para descrever os conjuntos de dados que seuERDDAP™instalação irá servir.

Você pode ver um exemplo[datasets.xmlem GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).

- - Não.

## [Introdução](#introduction) {#introduction} 

### Um conjunto necessário{#some-assembly-required} 
Configurar um conjunto de dadosERDDAP™não é apenas uma questão de apontar para o diretório ou URL do conjunto de dados. Você tem que escrever um pedaço de XML paradatasets.xmlque descreve o conjunto de dados.

* Para conjuntos de dados gradeados, a fim de fazer o conjunto de dados conformeERDDAP's estrutura de dados para dados gradeados, você tem que identificar um subconjunto das variáveis do conjunto de dados que compartilham as mesmas dimensões. ([Porquê?](#why-just-two-basic-data-structures) [Como?](#dimensions)) 
* Os metadados atuais do conjunto de dados são importados automaticamente. Mas se você quiser modificar esses metadados ou adicionar outros metadados, você precisa especificá-lo emdatasets.xml. EERDDAP™precisa de outros metadados, incluindo[atributos globais](#global-attributes)  (comoinfoUrl, instituição,sourceUrl, resumo e título) e[atributos variáveis](#variable-addattributes)  (comolong\\_namee unidades) . Assim como os metadados que estão atualmente no conjunto de dados adicionam informações descritivas para o conjunto de dados, os metadados solicitados porERDDAP™adiciona informações descritivas ao conjunto de dados. Os metadados adicionais são uma boa adição ao seu conjunto de dados e ajudamERDDAP™fazer um trabalho melhor de apresentar seus dados aos usuários que não estão familiarizados com isso.
*   ERDDAP™precisa que você faça coisas especiais com o[longitude, latitude, altitude (ou profundidade) , e variáveis de tempo](#destinationname).

Se você comprar essas ideias e gastar o esforço para criar o XML paradatasets.xml, você tem todas as vantagens deERDDAP™, incluindo:

* Busca de texto completo para conjuntos de dados
* Procurar conjuntos de dados por categoria
* Formulários de acesso de dados ( *datasetID* .html) para que você possa solicitar um subconjunto de dados em vários formatos de arquivo diferentes
* Formulários para solicitar gráficos e mapas ( *datasetID* .) 
* Serviço de Mapa Web (WMS) para conjuntos de dados gradeados
*   RESTfulacesso aos seus dados

Fazendo adatasets.xmlleva um esforço considerável para os primeiros conjuntos de dados, mas **fica mais fácil** . Após o primeiro conjunto de dados, você pode frequentemente reutilizar muito do seu trabalho para o próximo conjunto de dados. Felizmente,ERDDAP™vem com dois[Ferramentas](#tools)para ajudá-lo a criar o XML para cada conjunto de dadosdatasets.xml.
Se ficares preso, vê o nosso[seção sobre como obter suporte adicional](/docs/intro#support).

### Provedor de dados Formulário{#data-provider-form} 
Quando um provedor de dados vem a você esperando adicionar alguns dados ao seuERDDAP, pode ser difícil e demorado para coletar todos os metadados (informações sobre o conjunto de dados) necessário para adicionar o conjunto de dadosERDDAP. Muitas fontes de dados (por exemplo, arquivos .csv, Arquivos do Excel, bancos de dados) não tem metadados internos, entãoERDDAP™tem um formulário de provedor de dados que reúne metadados do provedor de dados e dá ao provedor de dados alguma outra orientação, incluindo ampla orientação para[Dados em Bancos de Dados](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). As informações apresentadas são convertidas emdatasets.xmlformato e depois enviado para oERDDAP™administrador (tu) e escrito (apêndice) para *Diretriz de grande porte* /logs/dataProviderForm.log . Assim, o formulário semi-automatiza o processo de obtenção de um conjunto de dados emERDDAP, mas oERDDAP™administrador ainda tem que completar odatasets.xmlchunk e lidar com a obtenção do arquivo de dados (S) do provedor ou conectando ao banco de dados.

A submissão de arquivos de dados reais de fontes externas é um enorme risco de segurança, portantoERDDAP™não lida com isso. Você tem que descobrir uma solução que funciona para você e o provedor de dados, por exemplo, e-mail (para arquivos pequenos) , puxar da nuvem (por exemplo, DropBox ou Google Drive) , um site de sftp (com senhas) , ou tênis Rede (uma pen drive USB ou disco rígido externo) . Você provavelmente só deve aceitar arquivos de pessoas que você conhece. Você precisará verificar os arquivos para vírus e tomar outras precauções de segurança.

Não há ligação.ERDDAP™para o formulário de fornecedor de dados (por exemplo, noERDDAP™Página inicial) . Em vez disso, quando alguém lhe diz que eles querem ter seus dados servidos por seuERDDAP, você pode enviar-lhes um e-mail dizendo algo como:
Sim, nós podemos colocar seus dados emERDDAP. Para começar, preencha o formulário no https://*yourUrl*/erddap/dataProviderForm.html   (ouhttp://sehttps://não está habilitado) .
Depois de terminares, contacto-te para resolveres os pormenores finais.
Se você só quer olhar para o formulário (sem encher) , você pode ver o formulário emERD'ERDDAP:[Introdução](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Parte 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Parte 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Parte 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)e[Parte 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Estas ligaçõesERD ERDDAP™enviar informações para mim, não você, então não envie informações com eles a menos que você realmente queira adicionar dados aoERD ERDDAP.

Se você quiser remover o Formulário de Provedor de Dados do seuERDDAP™, posto
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
em seu arquivo setup.xml.

O impulso para isto foiNOAA2014[Acesso público aos resultados da pesquisa (PARR) directiva](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), que requer tudoNOAAdados ambientais financiados através de dólares contribuintes ser disponibilizado através de um serviço de dados (não apenas arquivos) dentro de 12 meses de criação. Assim, há maior interesse em usarERDDAP™para disponibilizar conjuntos de dados através de um serviço ASAP. Precisávamos de uma forma mais eficiente de lidar com um grande número de provedores de dados.

Feedback/Sugestões? Este formulário é novo, então por favor e-mailerd dot data at noaa dot govse você tem algum feedback ou sugestões para melhorar isso.

### Ferramentas{#tools} 
ERDDAP™vem com dois programas de linha de comando que são ferramentas para ajudá-lo a criar o XML para cada conjunto de dados que você desejaERDDAP™servir. Uma vez que você tenha configuradoERDDAP™e executar (pelo menos uma vez) , você pode encontrar e usar estes programas no *Toca a brincar.* /webapps/erddap/WEB-INF diretório. Existem scripts de shell Linux/Unix (com a extensão .sh) e scripts do Windows (com a extensão .bat) para cada programa.\\[No Linux, execute essas ferramentas como o mesmo usuário (Tomcat?) Isso vai correr Tomcat.\\]Quando você executar cada programa, ele fará perguntas. Para cada pergunta, digite uma resposta e, em seguida, pressione Enter. Ou pressione ^C para sair de um programa a qualquer momento.

#### O programa não funciona?{#program-wont-run} 

* Se você conseguir um programa desconhecido (ou similar) mensagem de erro, o problema é provavelmente que o sistema operacional não conseguiu encontrarJava. Você precisa descobrir ondeJavaestá em seu computador, em seguida, editar a referência java no arquivo .bat ou .sh que você está tentando usar.
* Se você receber um arquivo jar não encontrado ou classe não encontrada mensagem de erro, entãoJavanão encontrou uma das classes listadas no arquivo .bat ou .sh que você está tentando usar. A solução é descobrir onde está o arquivo .jar e editar a referência java para ele no arquivo .bat ou .sh.
* Se você estiver usando uma versão deJavaque é muito velho para um programa, o programa não será executado e você verá uma mensagem de erro como
Exceção na linha "principal" java.lang.UnsupportedClassVersionError:
     *alguns/classe/nome* : Versão principal não suportada.minor *um pouco de madeira*   
A solução é atualizar para a versão mais recente deJavae certifique-se de que o arquivo .sh ou .bat para o programa está usando-o.

#### As ferramentas imprimem várias mensagens diagnósticas:{#the-tools-print-various-diagnostic-messages} 

* A palavra "ERROR" é usada quando algo correu tão mal que o procedimento não foi concluído. Embora seja irritante para obter um erro, o erro força você a lidar com o problema.
* A palavra "ARNING" é usada quando algo correu mal, mas o procedimento foi capaz de ser concluído. São muito raros.
* Qualquer outra coisa é apenas uma mensagem informativa. Você pode adicionar \\-verbose ao[Gerar conjuntos de dadosXml](#generatedatasetsxml)ou[DasDds](#dasdds)linha de comando para obter mensagens informativas adicionais, que às vezes ajuda a resolver problemas.

As duas ferramentas são uma grande ajuda, mas você ainda deve ler todas essas instruções nesta página cuidadosamente e tomar decisões importantes você mesmo.

### Gerar conjuntos de dadosXml{#generatedatasetsxml} 
*    **Gerar conjuntos de dadosXml** é um programa de linha de comando que pode gerar um rascunho áspero do conjunto de dados XML para quase qualquer tipo de conjunto de dados.
    
Nós STRONGLY RECOMEND que você usa GenerateDatasets Xml em vez de criar pedaços dedatasets.xmlpor mão porque:
    
    * Gerar conjuntos de dados Xml funciona em segundos. Fazer isto à mão é pelo menos uma hora de trabalho, mesmo quando você sabe o que está fazendo.
    * Gerar conjuntos de dados Xml faz um trabalho melhor. Fazer isso à mão requer amplo conhecimento de comoERDDAP™funciona. É improvável que você faça um trabalho melhor à mão. (Bob Simons sempre usa GerrateDatasets Xml para o primeiro rascunho, e ele escreveuERDDAP.) 
    * Gerar conjuntos de dados Xml sempre gera um pedaço válido dedatasets.xml. Qualquer pedaço dedatasets.xmlque você escreve provavelmente terá pelo menos alguns erros que impedemERDDAP™de carregar o conjunto de dados. Muitas vezes leva as pessoas horas para diagnosticar esses problemas. Não percas tempo. Deixe Gerar Conjuntos de dados Xml faz o trabalho duro. Então você pode refinar o .xml à mão se quiser.
    
Quando você usa o GerarDatasets Programa Xml:
    
    * No Windows, a primeira vez que você executa GenerateDatasetsXml, você precisa editar o arquivo GenerateDatasetsXml.bat com um editor de texto para mudar o caminho para o java. exe arquivo para que o Windows possa encontrarJava.
    * Gerar conjuntos de dados Xml pede primeiro para especificar o EDDType (Erd Dap Dataset Tipo) do conjunto de dados. Ver[Lista de Tipos de Conjunto de Dados](#list-of-types-datasets)  (neste documento) para descobrir qual é o tipo apropriado para o conjunto de dados em que você está trabalhando. Além dos EDDTypes regulares, há também alguns[Tipos Especiais/Pseudo Dataset](#specialpseudo-dataset-types)  (por exemplo, um que rasteja um catálogo THREDDS para gerar um pedaço dedatasets.xmlpara cada um dos conjuntos de dados no catálogo) .
    * Gerar conjuntos de dados Xml então faz uma série de perguntas específicas para esse EDDType. As perguntas reúnem as informações necessárias paraERDDAP™para acessar a fonte do conjunto de dados. Para entender o queERDDAP™está pedindo, veja a documentação para o EDDType que você especificou clicando no mesmo tipo de conjunto de dados no[Lista de Tipos de Conjunto de Dados](#list-of-types-datasets).
        
Se você precisar inserir uma string com caracteres especiais (por exemplo, caracteres do espaço branco no início ou fim, caracteres não-ASCII) , entrar em[Corda de estilo JSON](https://www.json.org/json-en.html)  (com caracteres especiais escapou com caracteres \\) . Por exemplo, para inserir apenas um caractere de aba, digite "\\t" (com aspas duplas circundantes, que dizemERDDAP™que esta é uma corda de estilo JSON.
        
    * Muitas vezes, uma de suas respostas não será o que GenerateDatasetsXml precisa. Você pode tentar novamente, com respostas revisadas para as perguntas, até GerarDatasets Xml pode encontrar e entender com sucesso os dados de origem.
    * Se você responder corretamente às perguntas (ou suficientemente corretamente) , Gerar conjuntos de dados Xml se conectará à fonte do conjunto de dados e recolherá informações básicas (por exemplo, nomes variáveis e metadados) .
Para conjuntos de dados que são de localNetCDF .nce arquivos relacionados, GerarDatasets Xml muitas vezes imprimir a estrutura semelhante ao ncdump do arquivo depois que ele lê primeiro o arquivo. Isso pode lhe dar informações para responder às perguntas melhor em um loop subsequente através do GerrateDatasetsXml.
    * Gerar conjuntos de dados Xml irá então gerar um rascunho áspero do conjunto de dados XML para esse conjunto de dados.
    * InformaÃ§Ãμes diagnósticas e o rascunho áspero do conjunto de dados XML serÃ¡ escrito para *Diretriz de grande porte* /logs/GenerateDatasetsXml.log .
    * O rascunho áspero do conjunto de dados XML será escrito para *Diretriz de grande porte* /logs/GenerateDatasetsXml.out .
#### "0 ficheiros" Mensagem de erro{#0-files-error-message} 
Se você executar GerarDatasets Xml ou[DasDds](#dasdds), ou se você tentar carregar umEDDGridDe...Files ou EDDTableDe... Dataset de arquivos emERDDAP™, e você recebe uma mensagem de erro "0 files" indicando queERDDAP™encontrado 0 arquivos correspondentes no diretório (quando você acha que existem arquivos correspondentes nesse diretório) :
* Verifique se você especificou o nome completo do diretório. E se você especificou o nome do arquivo da amostra, certifique-se de especificar o nome completo do arquivo, incluindo o nome completo do diretório.
* Verifique se os arquivos estão realmente nesse diretório.
* Verifique a ortografia do nome do diretório.
* Verifique o arquivoNameRegex. É realmente, muito fácil cometer erros com regexes. Para fins de teste, tente o regex .\\* que deve corresponder a todos os nomes de arquivos. (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Verifique se o usuário que está executando o programa (por exemplo, user=tomcat (?) para Tomcat /ERDDAP) tem permissão 'read' para esses arquivos.
* Em alguns sistemas operacionais (por exemplo, SELinux) e dependendo das configurações do sistema, o usuário que executou o programa deve ter permissão de 'leitura' para toda a cadeia de diretórios que levam ao diretório que tem os arquivos.


* Se você tem problemas que você não pode resolver,[suporte de solicitação](/docs/intro#support)com o máximo de informação possível. Da mesma forma, se parece que o EDDType apropriado para um determinado conjunto de dados não funciona com esse conjunto de dados, ou se não houver nenhum EDDType apropriado, por favor, apresente um[questão sobre GitHub](https://github.com/ERDDAP/erddap/issues)com os detalhes (e um arquivo de amostra se relevante) .
         
#### Você precisa editar a saída de GerarDatasets Xml para torná-lo melhor.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* - Não.
O Reino Unidodatasets.xmlMADE BE Gerar conjuntos de dados Xml não é perfeito. Você deve ler e identificar o XML antes de usá-lo em um públicoERDDAP. Gerar conjuntos de dados RELAÇÕES de Xml sobre um monte de regras de THUMB quando não estão sempre em ordem. Você é irresponsável por ter encontrado a corrreta do XML que você gostaria deERDDAP'datasets.xmlFILE.
    
     (Fato divertido: não estou gritando. Por razões legais históricas, as reclamações devem ser escritas em todos os bonés.) 
    
A saída de GerarDatasetsXml é um rascunho áspero.
Você quase sempre precisará editá-lo.
Fizemos e continuamos a fazer um enorme esforço para fazer a saída o mais pronta possível, mas há limites. Muitas vezes, as informações necessárias simplesmente não estão disponíveis a partir dos metadados de origem.
    
Um problema fundamental é que estamos a pedir um programa de computador (Gerar conjuntos de dadosXml) para fazer uma tarefa onde, se você deu a mesma tarefa para 100 pessoas, você obteria 100 resultados diferentes. Não há nenhuma resposta "direita". Obviamente, o programa é mais próximo de ler a mente de Bob. (não é seu) , mas mesmo assim, não é um programa AI abrangente, apenas um monte de heurísticas cobbled juntos para fazer uma tarefa semelhante a AI. (Esse dia de um programa de IA pode vir, mas ainda não chegou. Se / quando isso acontecer, nós humanos podem ter problemas maiores. Tenha cuidado com o que deseja.) 
    
* Para fins informativos, a saída mostra a fonte globalAttributes e fonte variávelAttributes como comentários.ERDDAP™combina sourceAttributes eaddAttributes  (que têm precedência) para fazer o combinado Atributos que são mostrados ao usuário. (E outros atributos são automaticamente adicionados a variáveis longitude, latitude, altitude, profundidade e tempo quandoERDDAP™realmente faz o conjunto de dados) .
     
* Se você não gosta de um sourceAttribute, substituí-lo adicionando um addAttribute com o mesmo nome, mas um valor diferente (ou nenhum valor, se você quiser removê-lo) .
     
* Todos osaddAttributessão sugestões geradas por computador. Edite-os&#33; Se você não gosta de um addAttribute, mude-o.
     
* Se você quiser adicionar outrosaddAttributesAcrescente-os.
     
* Se você quiser mudar umdestinationNameMuda-a. Mas não mudes.sourceNameS.
     
* Você pode alterar a ordem dodataVariables ou remover qualquer um deles.


    * Você pode então usar[DasDds](#dasdds)  (ver abaixo) para testar repetidamente o XML para esse conjunto de dados para garantir que o conjunto de dados resultante aparece como você querERDDAP.
    * Sinta-se livre para fazer pequenas mudanças nodatasets.xmlchunk que foi gerado, por exemplo, fornecer um melhorinfoUrl, resumo ou título.
#### não adicionar nomes padrão{#donotaddstandardnames} 
Se você incluir \\-doNotAddStandardNames como um parâmetro de linha de comando quando você executar gerar Conjuntos de dados Xml, gerar Conjuntos de dados Xml não vai adicionarstandard\\_nameaoaddAttributespara quaisquer variáveis que não as variáveis denominadas latitude, longitude, altitude, profundidade ou tempo (que tem óbviostandard\\_nameS) . Isso pode ser útil se você estiver usando a saída de gerar Conjuntos de dados Xml diretamente emERDDAP™sem editar a saída, porque gerar Conjuntos de dados Xml muitas vezes adivinhastandard\\_nameincorretamente. (Note que sempre recomendamos que você edite a saída antes de usá-la emERDDAP.) Usando este parâmetro terá outros efeitos relacionados menores porque o adivinhadostandard\\_nameé frequentemente usado para outros fins, por exemplo, para criar um novolong\\_name, e para criar as configurações colorBar.
#### Scripting{#scripting} 
Como uma alternativa para responder as perguntas interativamente no teclado e looping para gerar conjuntos de dados adicionais, você pode fornecer argumentos de linha de comando para responder a todas as perguntas para gerar um conjunto de dados. Gerar conjuntos de dados Xml irá processar esses parâmetros, escrever a saída para o arquivo de saída e sair do programa.
        
Para configurar isso, primeiro use o programa em modo interativo e escreva suas respostas. Aqui está um exemplo parcial:
Digamos que você execute o script: ./GenerateDatasetsXml.sh
Em seguida, digite: EDDTableFromAsciiFiles
Em seguida, digite: /u00/data/
Em seguida, digite: .\\*\\.asc
Em seguida, digite: /u00/data/sampleFile.asc
Em seguida, digite: ISO-8859-1
        
Para executar isso de forma não interativa, use esta linha de comando:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
Basicamente, lista todas as respostas na linha de comando.
Isso deve ser útil para conjuntos de dados que mudam com freqüência de uma forma que exige a reinicialização de GerarDatasets Xml (notadamenteEDDGridA partir de três) .
        
Detalhes:

* Se um parâmetro contém um espaço ou algum caractere especial, então codifique o parâmetro como um[Corda de estilo JSON](https://www.json.org/json-en.html), por exemplo, "meu parâmetro com espaços e dois\\nlinhas".
* Se você quiser especificar uma string vazia como parâmetro, use: nada
* Se você quiser especificar o valor padrão de um parâmetro, use: default
             
* Gerar conjuntos de dados Xml suporta um -i *conjuntos de dados XmlName* # *Nome* parâmetro linha de comando que insere a saída no especificadodatasets.xmlarquivo (o padrão é *Toca a brincar.* /conteúdo/erddap/datasets.xml) . Gerar conjuntos de dados Xml procura duas linhas em conjuntos de dados XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
e
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
e substitui tudo entre essas linhas com o novo conteúdo, e muda o datado.
* O interruptor -i só é processado (e mudançasdatasets.xmlsão apenas feitos) se você executar GerarDatasets Xml com argumentos de linha de comando que especificam todas as respostas para todas as perguntas para um loop do programa. (Veja 'Scripting' acima.)   (O pensamento é: Este parâmetro é para uso com scripts. Se você usar o programa no modo interativo (digitando informações no teclado) , é provável que você gere alguns pedaços incorretos de XML antes de gerar o que você quer.) 
* Se as linhas Iniciar e Final não forem encontradas, então essas linhas e o novo conteúdo são inseridos logo antes&lt;/erddapDatasets&gt;.
* Há também um -I (capital i) interruptor para fins de teste que funciona o mesmo que -i, mas cria um arquivo chamadodatasets.xml *Data de início* e não faz mudanças paradatasets.xml.
* Não execute GenerateDatasets Xml com -i em dois processos ao mesmo tempo. Há uma chance de apenas um conjunto de mudanças será mantido. Pode haver sérios problemas (por exemplo, arquivos corrompidos) .
    
Se você usar "GenerateDatasetsXml -verbose", ele imprimirá mais mensagens diagnósticas do que o habitual.
    
#### Tipos Especiais/Pseudo Dataset{#specialpseudo-dataset-types} 
Em geral, as opções EDDType em GerarDatasets Combinação Xml dos tipos EDD descritos neste documento (ver o[Lista de Tipos de Conjunto de Dados](#list-of-types-datasets)) e gerar umdatasets.xmlchunk para criar um conjunto de dados de uma fonte de dados específica. Existem algumas exceções e casos especiais:
    
##### EDDGridDe Erddap{#eddgridfromerddap} 
Este EDDType gera todo odatasets.xmlchunks necessário para fazer[EDDGridDe Erddap](#eddfromerddap)conjuntos de dados de todos osEDDGriddatasets em um remotoERDDAP. Você terá a opção de manter o originaldatasetIDS (que pode duplicar algunsdatasetIDjá está em seuERDDAP) ou gerar novos nomes que serão únicos (mas geralmente não são tão legíveis como humanos) .
     
##### EDDTable FromErddap{#eddtablefromerddap} 
Este EDDType gera todo odatasets.xmlchunks necessário para fazer[EDDTable FromErddap](#eddfromerddap)datasets de todos os conjuntos de dados EDDTable em um remotoERDDAP. Você terá a opção de manter o originaldatasetIDS (que pode duplicar algunsdatasetIDjá está em seuERDDAP) ou gerar novos nomes que serão únicos (mas geralmente não são tão legíveis como humanos) .
     
##### EDDGridA partir de três{#eddgridfromthreddscatalog} 
Este EDDType gera todo odatasets.xmlpedaços necessários para todos os[EDDGridA partir de](#eddgridfromdap)conjuntos de dados que ele pode encontrar rastejando recursivamente através de um THREDDS (Subscrição) catálogo. Existem muitas formas de URLs de catálogo THREDDS. Esta opção REQUIRES um URL THREDDS .xml com /catalog/ nele, por exemplo,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml ou
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(um catálogo .html relacionado está em
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , que não é aceitável paraEDDGridFromThreddsCatalog (em inglês).
Se você tiver problemas comEDDGridDe Thredds Catálogo:
* Certifique-se de que a URL que você está usando é válida, inclui /catalog/, e termina com /catalog.xml .
* Se possível, use um endereço IP público (por exemplo, https://oceanwatch.pfeg.noaa.gov ) na URL, não um endereço IP numérico local (por exemplo, https://12.34.56.78 ) . Se o THREDDS for apenas acessível através do endereço IP numérico local, você pode usar [&lt;convertToPublicSourceUrl&gt;] (# Convert to publicsourceurl) Então...ERDDAP™os usuários veem o endereço público, emboraERDDAP™recebe dados do endereço numérico local.
* Se você tem problemas que você não pode resolver,[verificar as dicas de solução de problemas](#troubleshooting-tips).
* O código de baixo nível para isso agora usa oUnidatanetcdf-java catálogo rastreador código (Thredds. aulas de catálogo) para que possa lidar com todos os catálogos THREDDS (que pode ser surpreendentemente complexo) Graças aUnidatapara esse código.
         
##### EDDGridLonPM180 De ErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Este EDDType gera odatasets.xmlpara fazer[EDDGridLonPM180](#eddgridlonpm180)conjuntos de dados de todos osEDDGridconjuntos de dados em umERDDAPque têm valores de longitude maiores que 180.
* Se possível, use um endereço IP público (por exemplo, https://oceanwatch.pfeg.noaa.gov ) na URL, não um endereço IP numérico local (por exemplo, https://12.34.56.78 ) . Se oERDDAP™é apenas acessível através do endereço IP numérico local, você pode usar [&lt;convertToPublicSourceUrl&gt;] (# Convert to publicsourceurl) Então...ERDDAP™os usuários veem o endereço público, emboraERDDAP™recebe dados do endereço numérico local.
         
##### EDDGridLon0360 De ErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Este EDDType gera odatasets.xmlpara fazer[EDDGridLon0360](#eddgridlon0360)conjuntos de dados de todos osEDDGridconjuntos de dados em umERDDAPque têm valores de longitude menos de 0.
* Se possível, use um endereço IP público (por exemplo, https://oceanwatch.pfeg.noaa.gov ) na URL, não um endereço IP numérico local (por exemplo, https://12.34.56.78 ) . Se oERDDAP™é apenas acessível através do endereço IP numérico local, você pode usar [&lt;convertToPublicSourceUrl&gt;] (# Convert to publicsourceurl) Então...ERDDAP™os usuários veem o endereço público, emboraERDDAP™recebe dados do endereço numérico local.
         
##### EDDs De Ficheiros{#eddsfromfiles} 
Dado um diretório de início, isso atravessa o diretório e todos os subdiretórios e tenta criar um conjunto de dados para cada grupo de arquivos de dados que ele encontra.
* Isso pressupõe que quando um conjunto de dados é encontrado, o conjunto de dados inclui todos os subdiretórios.
* Se um conjunto de dados for encontrado, diretórios de irmãos semelhantes serão tratados como conjuntos de dados separados (por exemplo, diretórios para os anos 90, os anos 2000, os anos 2010, gerarão conjuntos de dados separados) . Eles devem ser fáceis de combinar à mão - basta alterar o primeiro conjunto de dados&lt;fileDir&gt; para o diretório pai e excluir todos os conjuntos de dados de irmãos subsequentes.
* Isso só vai tentar gerar um pedaço dedatasets.xmlpara o tipo mais comum de extensão de arquivo em um diretório (não contando .md5, que é ignorado) . Então, dado um diretório com 10.ncarquivos e arquivos 5.txt, um conjunto de dados será gerado para o.ncarquivos apenas.
* Isso pressupõe que todos os arquivos em um diretório com a mesma extensão pertencem ao mesmo conjunto de dados. Se um diretório tiver alguns.ncarquivos com dados SST e alguns.ncarquivos com dados de clorofila, apenas uma amostra.ncarquivo será lido (SST? clorofila?) e apenas um conjunto de dados será criado para esse tipo de arquivo. Esse conjunto de dados provavelmente não será carregado por causa de complicações de tentar carregar dois tipos de arquivos no mesmo conjunto de dados.
* Se houver menos de 4 arquivos com a extensão mais comum em um diretório, isso assume que eles não são arquivos de dados e apenas pula o diretório.
* Se houver 4 ou mais arquivos em um diretório, mas isso não pode gerar com sucesso um pedaço dedatasets.xmlpara os arquivos (por exemplo, um tipo de arquivo não suportado) , isto vai gerar um[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)dataset para os arquivos.
* No final dos diagnósticos que isso escreve para o arquivo de log, pouco antes dodatasets.xmlchunks, isso imprimirá uma tabela com um resumo de informações recolhidas atravessando todos os subdiretórios. A tabela irá listar cada subdiretório e indicar o tipo mais comum de extensão de arquivo, o número total de arquivos, e que tipo de conjunto de dados foi criado para esses arquivos (se houver) . Se você é confrontado com uma estrutura de arquivo complexa, profundamente aninhada, considere executar GerrateDatasets Xml com EDDType=EDDsFromFiles apenas para gerar esta informação,
* Esta opção pode não fazer um grande trabalho de adivinhar o melhor EDDType para um determinado grupo de arquivos de dados, mas é rápido, fácil e vale a pena tentar. Se os arquivos de origem são adequados, ele funciona bem e é um bom primeiro passo na geração dodatasets.xmlpara um sistema de arquivos com lotes de subdiretórios, cada um com arquivos de dados de diferentes conjuntos de dados.
         
##### EDDTable FromEML e EDDTable FromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Estes EDDType especial gera odatasets.xmlpara fazer um[EDDTable FromAsciiFiles](#eddtablefromasciifiles)dataset de cada uma das tabelas descritas em um[Idioma de Metadados Ecológicos](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)Arquivo XML. A variante "Batch" funciona em todos os arquivos EML em um diretório local ou remoto. Por favor, veja o separado[documentação para EDDTableFromEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDTable FromInPort{#eddtablefrominport} 
Este EDDType especial gera odatasets.xmlpara fazer um[EDDTable FromAsciiFiles](#eddtablefromasciifiles)dataset da informação em um[inport-xml](https://inport.nmfs.noaa.gov/inport)ficheiro. Se você pode obter acesso ao arquivo de dados de origem (o arquivo inport-xml deve ter pistas para onde encontrá-lo) , você pode fazer um conjunto de dados de trabalhoERDDAP.

Os seguintes passos descrevem como usar GerarDatasets Xml com um arquivo inport-xml para obter um conjunto de dados de trabalho emERDDAP.

1. Uma vez que você tenha acesso ao arquivo inport-xml (ou como uma URL ou um arquivo local) : executar GerarDatasets Xml, especifique EDDType=EDDTableFromInPort, especifique o URL inport-xml ou nome de arquivo completo, especifique qualChild=0, e especifique as outras informações solicitadas (se sabe) . (Neste ponto, você não precisa ter o arquivo de dados de origem ou especificar seu nome.) A configuração queChild=0 diz GerarDatasets Xml para escrever as informações para **Todos** do&lt;entidade-atributo-informação&gt;&lt;entidade&gt; está no arquivo inport-xml (se houver algum) . Ele também imprime um resumo de informações de fundo, incluindo todos os listados no arquivo inport-xml.
2. Olhe através de toda a informação (incluindo as informações de fundo que GeramDatasets Impressões de Xml) e visite o download de (S) para tentar encontrar o arquivo de dados de origem (S) . Se você puder encontrá-lo (eles) , baixar o (eles) em um diretório acessívelERDDAP. (Se você não consegue encontrar nenhum arquivo de dados de origem, não há nenhum ponto no processo.) 
3. Executar Geração Conjuntos de dados Xml outra vez.
Se o arquivo de dados de origem corresponder a um dos arquivos inport-xml&lt;entidade-atributo-informação&gt;&lt;entidade&gt;'s, especifique qualChild= *Que a Entidade é Entidade*   (Por exemplo, 1, 2, 3, ...) .ERDDAP™tentará combinar os nomes das colunas no arquivo de dados de origem para nomes nas informações da entidade e solicitará aceitar/rejeitar/fixar quaisquer discrepâncias.
Ou, se o arquivo inport-xml não tiver nenhum&lt;entidade-atributo-informação&gt;&lt;entidade&gt;'s, especifique qualChild=0.
4. No pedaço dedatasets.xmlque foi feito por GenerateDatasets Xml, revise o [global&lt;addAttributes&gt; (Atributos globais) como necessário / desejado.
5. No pedaço dedatasets.xmlque foi feito por GenerateDatasetsXml, adicione/revise o [&lt;dataVariable&gt; (#datavariable) informação conforme necessário/desejado para descrever cada uma das variáveis. Certifique-se de identificar adequadamente cada variável
Não.&lt;sourceName&gt; (Nome de fonte)   (como aparece na fonte) ,
Não.&lt;destinationName&gt; (Nome de destino)   (que tem mais limitações em caracteres permitidos do quesourceName) ,
Não.&lt;Unidades&gt; (#units)   (especialmente se for um[variável time ou timestamp](#timestamp-variables)onde as unidades precisam especificar o formato) e
Não.&lt;missing\\_value&gt; (#missing_value) ,
6. Quando você está perto de terminar, use repetidamente o[DasDds](#dasdds)ferramenta para ver rapidamente se a descrição do conjunto de dados é válida e se o conjunto de dados aparecerERDDAP™como queiras.
     

Seria ótimo se grupos usando o InPort para documentar seus conjuntos de dados também usaremERDDAP™para disponibilizar os dados reais:

*   ERDDAP™é uma solução que pode ser usada agora para que você possa cumprirNOAA'[Acesso público aos resultados da pesquisa (PARR) requisitos](https://nosc.noaa.gov/EDMC/PD.DSP.php)Neste momento, não em algum momento vago no futuro.
*   ERDDAP™torna os dados reais disponíveis para os usuários, não apenas os metadados. (O que é bom metadados sem dados?) 
*   ERDDAP™suporta metadados (notavelmente, as unidades de variáveis) , ao contrário de algum outro software de servidor de dados que está sendo considerado. (O que é bom os dados sem metadados?) Usar software que não suporta metadados é convidar os dados a serem mal interpretados e mal utilizados.
*   ERDDAP™é software livre e de código aberto ao contrário de algum outro software que está sendo considerado. Desenvolvimento contínuoERDDAP™já está pago. Suporte paraERDDAP™os usuários são livres.
*   ERDDAPA aparência pode ser facilmente personalizada para refletir e destacar seu grupo (nãoERDouERDDAP) .
*   ERDDAP™oferece uma maneira consistente de acessar todos os conjuntos de dados.
*   ERDDAP™pode ler dados de muitos tipos de arquivos de dados e de bancos de dados relacionais.
*   ERDDAP™pode lidar com grandes conjuntos de dados, incluindo conjuntos de dados onde os dados de origem estão em muitos arquivos de dados.
*   ERDDAP™pode escrever dados para muitos tipos de arquivos de dados, a pedido do usuário, incluindo tipos de arquivos de dados científicos como netCDF, ESRI .csv, eODV .txt.
*   ERDDAP™pode fazer gráficos personalizados e mapas de subconjuntos dos dados, com base nas especificações do usuário.
*   ERDDAP™pode lidar com conjuntos de dados não-dados, como coleções de arquivos de imagem, vídeo ou áudio.
*   ERDDAP™foi instalado e usado em[mais de 60 instituições em todo o mundo](/#who-uses-erddap).
*   ERDDAP™é listado como um dos servidores de dados recomendados para uso dentroNOAAno[NOAADiretiva de Acesso aos Dados](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), ao contrário de algum outro software sendo considerado.
*   ERDDAP™é um produto deNMFS/NOAA, então usá-lo dentroNMFSeNOAAdeve ser um ponto de orgulho paraNMFSeNOAA.

Por favor.ERDDAP™uma tentativa. Se você precisar de ajuda, por favor publique uma mensagem noERDDAP™Grupo Google.
     
##### addFillValueAtributos{#addfillvalueattributes} 
Esta opção especial EDDType não é um tipo de conjunto de dados. É uma ferramenta que pode adicionar atributos \\_FillValue a algumas variáveis em alguns conjuntos de dados. Ver[addFillValueAtributos](#add-_fillvalue-attributes).
     
##### encontrar Duplicado Tempo{#findduplicatetime} 
Esta opção especial EDDType não é um tipo de conjunto de dados. Em vez disso, ele diz GerarDatasets Xml para pesquisar através de uma coleção de grade.nc  (e relacionados) arquivos para encontrar e imprimir uma lista de arquivos com valores de tempo duplicados. Quando olha para os valores do tempo, converte-os das unidades originais para"seconds since 1970-01-01"no caso de arquivos diferentes usar diferentes cadeias de unidades. Você precisa fornecer o diretório inicial (com ou sem o barramento) , o nome do arquivo expressão regular (por exemplo, .\\\\.nc ) , e o nome da variável de tempo nos arquivos.
     
##### Não.{#ncdump} 
Esta opção especial EDDType não é um tipo de conjunto de dados. Em vez disso, ele diz GerarDatasets Xml para imprimir um[Não.](https://linux.die.net/man/1/ncdump)impressão de um.nc,.ncml, ou.hdfficheiro. Ele realmente usa o netcdf-java's[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), que é uma ferramenta mais limitada do que a versão C do NCdump. Se você usar esta opção, GerarDatasetsXml irá pedir-lhe para usar uma das opções: "-h" (Cabeçalho) "C" (coordena vars) "vall" (padrão) , "-v var1;var2", "-v var1 (0,0:10,0:20) ". Isso é útil porque, sem ncdump é difícil saber o que está em um.nc,.ncml, ou.hdfarquivo e, portanto, que EDDType você deve especificar para GerarDatasets Xml. Para um.ncarquivo ml, isso imprimirá a saída ncdump para o resultado do.ncalterações de arquivo ml aplicadas ao subjacente.ncou.hdfficheiro.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)é um programa de linha de comando que você pode usar depois de ter criado uma primeira tentativa no XML para um novo conjunto de dadosdatasets.xml. Com DasDds, você pode repetidamente testar e refinar o XML. Quando você usa o programa DasDds:
    1. No Windows, a primeira vez que você executar DasDds, você precisa editar os DasDds. arquivo de morcego com um editor de texto para mudar o caminho para o java. exe arquivo para que o Windows possa encontrarJava.
    2. DasDds pede para vocêdatasetIDpara o conjunto de dados em que você está trabalhando.
    3. DasDds tenta criar o conjunto de dados com issodatasetID.
        * DasDds sempre imprime muitas mensagens diagnósticas.
Se você usar "DasDds -verbose", DasDds imprimirá mais mensagens diagnósticas do que o habitual.
        * Para segurança, a DasDds sempre exclui todas as informações de conjunto de dados em cache (arquivos) para o conjunto de dados antes de tentar criar o conjunto de dados. Este é o equivalente a definir uma[bandeira dura](/docs/server-admin/additional-information#hard-flag)Assim, para conjuntos de dados agregados, você pode querer ajustar o arquivoNameRegex temporariamente para limitar o número de arquivos que o construtor de dados encontra.
        * Se o conjunto de dados não carregar (por qualquer razão) , DasDds vai parar e mostrar-lhe a mensagem de erro para o primeiro erro que ele encontra.
             **Não tente adivinhar qual é o problema. Leia a mensagem ERROR com cuidado.**   
Se necessário, leia as mensagens diagnósticas anteriores para encontrar mais pistas e informações também.
        *    **Faça uma mudança no XML do conjunto de dados para tentar resolver esse problema**   
e deixe DasDds tentar criar o conjunto de dados novamente.
        *    **Se você resolver repetidamente cada problema, você vai eventualmente resolver todos os problemas**   
e o conjunto de dados irá carregar.
    4. Todos os DasDds saída (diagnósticos e resultados) são escritos para a tela e para *Diretriz de grande porte* /logs/DasDds.log .
    5. Se o DasDds pode criar o conjunto de dados, o DasDds irá mostrar-lhe o[Não. (Estrutura de atributos de conjuntos de dados) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.dds (Descritor de Dados Estrutura) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)e[.timeGaps (lacunas de tempo) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informações para o conjunto de dados em sua tela escrevê-los para *Diretriz de grande porte* /logs/DasDds.out .
    6. Muitas vezes, você vai querer fazer uma pequena mudança no XML do conjunto de dados para limpar os metadados do conjunto de dados e reprimir DasDds.

### Bônus Ferramenta de terceiros:ERDDAP- Não.{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint é um programa de Rob Fuller e Adam Leadbetter do Irish Marine Institute que você pode usar para melhorar os metadados de seuERDDAP™conjuntos de dados.ERDDAP-lint "contém regras e uma aplicação web estática simples para executar alguns testes de verificação contra o seuERDDAP™servidor. Todos os testes são executados no navegador da web." Como o[Ferramenta de lint Unix/Linux](https://en.wikipedia.org/wiki/Lint_(software)), você pode editar as regras existentes ou adicionar novas regras. Ver[ERDDAP- Não.](https://github.com/IrishMarineInstitute/erddap-lint)para mais informações.

Esta ferramenta é especialmente útil para conjuntos de dados que você criou há algum tempo e agora quer trazer up-to-date com suas preferências atuais de metadados. Por exemplo, versões iniciais do GerrateDatasets Xml não fez nenhum esforço para criar globalcreator\\_name,creator\\_email, criador\\_type, oucreator\\_urlmetadados. Você pode usarERDDAP-inclinar para identificar os conjuntos de dados que não possuem esses atributos de metadados.

Graças a Rob e Adam para criar esta ferramenta e torná-la disponível para oERDDAP™comunidade.
 
## A estrutura básica dodatasets.xmlArquivo{#the-basic-structure-of-the-datasetsxml-file} 
As tags necessárias e opcionais permitidas em umdatasets.xmlarquivo (e o número de vezes que podem aparecer) são mostrados abaixo. Na prática, o seudatasets.xmlterá muitos&lt;tags do dataset&gt; e somente usar as outras tags dentro&lt;erddapDatasets&gt; conforme necessário.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

É possível que outras codificações sejam permitidas no futuro, mas por enquanto, somente ISO-8859-1 é recomendado.
 
### XI.{#xinclude} 
Nova versão 2.25 é suporte para XInclude. Isso requer que você esteja usando o analisador SAX&lt;useSaxParser&gt;true&lt;/useSaxParser&gt; em seu setup.xml. Isso pode permitir que você escreva cada conjunto de dados em seu próprio arquivo, em seguida, incluí-los todos no principaldatasets.xml, reutilizar partes de definições de conjuntos de dados, ou ambos. Se você quiser ver um exemplo,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)define o XInclude para reutilizar definições variáveis.
 

- - Não.

## Notas{#notes} 

Trabalhar com odatasets.xmlarquivo é um projeto não trivial. Por favor, leia todas essas notas cuidadosamente. Depois de escolher um[tipo de conjunto de dados](#list-of-types-datasets), por favor, leia a descrição detalhada dele cuidadosamente.
     
### Escolhendo o Tipo de Conjunto de Dados{#choosing-the-dataset-type} 
Na maioria dos casos, há apenas umERDDAP™tipo de dataset que é apropriado para uma determinada fonte de dados. Em alguns casos (por exemplo,.ncarquivos) , há algumas possibilidades, mas geralmente um deles é definitivamente melhor. A primeira e maior decisão que você deve tomar é: é apropriado tratar o conjunto de dados como um grupo de arrays multidimensionais (se assim vir o[EDDGridtipos de conjuntos de dados](#eddgrid)) ou como uma tabela de dados semelhante a banco de dados (se assim vir o[Tipos de conjunto de dados EDDTable](#eddtable)) .
     
### Servindo os dados como é{#serving-the-data-as-is} 
Normalmente, não há necessidade de modificar a fonte de dados (por exemplo, converter os arquivos para algum outro tipo de arquivo) assimERDDAP™pode servir. Uma das suposições deERDDAP™é que a fonte de dados será usada como é. Normalmente isto funciona bem. Algumas exceções são:
* Bases de Dados Relacionais e Cassandra - ...ERDDAP™pode servir dados diretamente de bases de dados relacionais e Cassandra. Mas para problemas de segurança, balanceamento de carga e desempenho, você pode optar por configurar outro banco de dados com os mesmos dados ou salvar os dados paraNetCDFv3.ncarquivos e têmERDDAP™servir os dados da nova fonte de dados. Ver[EDDTable FromDatabase](#eddtablefromdatabase)e[EDDTable FromCasandra](#eddtablefromcassandra).
* Não suportado fontes de dados --ERDDAP™pode suportar um grande número de tipos de fontes de dados, mas o mundo está cheio de 1000 (milhões?) de diferentes fontes de dados (notavelmente, estruturas de arquivos de dados) . SeERDDAP™não suporta sua fonte de dados:
    * Se a fonte de dados forNetCDF .ncarquivos, você pode usar[NcML](#ncml-files)para modificar os arquivos de dados on-the-fly, ou usar[NCO](#netcdf-operators-nco)para modificar permanentemente os arquivos de dados.
    * Você pode escrever os dados para um tipo de fonte de dados queERDDAP™suportes.NetCDF-3.ncarquivos são uma boa, recomendação geral porque eles são arquivos binários queERDDAP™pode ler muito rapidamente. Para dados tabulares, considere armazenar os dados em uma coleção de.ncarquivos que usam[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Estruturas de dados Ragged Array contíguas e assim pode ser tratada comERDDAP'[EDDTable FromNcCFFiles](#eddtablefromnccffiles)). Se eles são logicamente organizados (cada um com dados para um pedaço de espaço e tempo) ,ERDDAP™pode extrair dados deles muito rapidamente.
    * Você pode solicitar que o suporte para essa fonte de dados seja adicionadoERDDAP™enviando um e-mail para Chris. John no noaaa.gov.
    * Você pode adicionar suporte para essa fonte de dados escrevendo o código para lidar com ele mesmo. Ver[oERDDAP™Guia do programador](/docs/contributing/programmer-guide)
* Velocidade...ERDDAP™pode ler dados de algumas fontes de dados muito mais rápido do que outros. Por exemplo, leituraNetCDFv3.ncarquivos é rápido e ler arquivos ASCII é mais lento. E se houver um grande (&gt; 1000) ou enorme (&gt; 100 000) número de arquivos de dados de origem,ERDDAP™responderá a alguns pedidos de dados lentamente. Normalmente, a diferença não é perceptível para os seres humanos. No entanto, se você pensarERDDAP™é lento para um determinado conjunto de dados, você pode optar por resolver o problema, escrevendo os dados para uma configuração mais eficiente (geralmente: alguns, bem estruturados,NetCDFv3.ncarquivos) . Para dados tabulares, consulte[este conselho](#millions-of-files).
         
### Olá.{#hint} 
Muitas vezes é mais fácil gerar o XML para um conjunto de dados, fazendo uma cópia de uma descrição de conjunto de dados de trabalho em dataset.xml e, em seguida, modificá-lo.
    
### Codificação de caracteres especiais{#encoding-special-characters} 
Desde entãodatasets.xmlé um arquivo XML, você MUST[&amp; nbsp;](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;", and "&gt;" in any content as "&amp;", "&lt;«, and "&gt;» (em inglês).
Errado:&lt;Título Tempo e marés&lt;- Sim.
Certo.&lt;Título Tempo &amp; Tides&lt;- Sim.
     
### XML não tolera erros de sintaxe{#xml-doesnt-tolerate-syntax-errors} 
Depois de editar o arquivo dataset.xml, é uma boa ideia verificar se o resultado é[XML bem formado](https://www.w3schools.com/xml/xml_dtd.asp)colando o texto XML em um verificador XML como[xmlvalidação](https://www.xmlvalidation.com/).
     
### Dicas de resolução de problemas{#troubleshooting-tips} 
*    **Outras formas de diagnosticar problemas com conjuntos de dados**   
Além dos dois principais[Ferramentas](#tools),
    *   [- Não.](/docs/server-admin/additional-information#log)é um arquivo de log com todosERDDAPAs mensagens de diagnóstico.
    * O[Relatório diário](/docs/server-admin/additional-information#daily-report)tem mais informações do que a página de status, incluindo uma lista de conjuntos de dados que não carregaram e as exceções (erros) eles geraram.
    * O[Página de status](/docs/server-admin/additional-information#status-page)é uma maneira rápida de verificarERDDAP's status de qualquer navegador web. Inclui uma lista de conjuntos de dados que não carregaram (embora não as exceções relacionadas) e tarefaTermos estatísticas (mostrar o progresso de[EDDGridEntendido.](#eddgridcopy)e[EDDTableCopy](#eddtablecopy)conjuntos de dados e qualquer[EDDGridDos quartos](#eddgridfromfiles)ou[Tabela EDD dos arquivos](#eddtablefromfiles)conjuntos de dados que usam[Cache De Url](#cachefromurl)  (mas não cache Tamanho GB) ) .
    * Se ficares preso, vê o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
         
### Variáveis especiais{#special-variables} 
*    **[A longitude, latitude, altitude (ou profundidade) e tempo (LLAT) variável](#destinationname) [destinationName](#destinationname)s são especiais.** 
    * Em geral:
        * As variáveis LLAT são conhecidas porERDDAP™se a variável eixo (paraEDDGridconjuntos de dados) ou variável de dados (para conjuntos de dados EDDTable)  [destinationName](#destinationname)é "longitude", "latitude", "altitude", "profundidade", ou"time".
        * Encorajamos fortemente você a usar esses nomes padrão para essas variáveis sempre que possível. Nenhum deles é necessário. Se você não usar esses nomes variáveis especiais,ERDDAP™Não reconhecerá o seu significado. Por exemplo, as variáveis LLAT são tratadas especialmente por Make A Graph ( *datasetID* .) : se a variável X Axis for "longitude" e a variável Y Axis for "latitude", você terá um mapa (usando uma projeção padrão, e com uma máscara de terra, limites políticos, etc.) em vez de um gráfico.
        *   ERDDAP™adicionará automaticamente lotes de metadados para variáveis LLAT (por exemplo, "[ioos\\_category](#ioos_category)",[unidades](#units)", e vários atributos relacionados a padrões como "\\_CoordinateAxisType") .
        *   ERDDAP™automaticamente, on-the-fly, adicionar lotes de metadados globais relacionados aos valores LLAT do subconjunto de dados selecionado (por exemplo, "geospatial\\_lon\\_min") .
        * Os clientes que suportam esses padrões de metadados poderão aproveitar os metadados adicionados para posicionar os dados no tempo e no espaço.
        * Os clientes acharão mais fácil gerar consultas que incluam variáveis LLAT porque os nomes da variável são os mesmos em todos os conjuntos de dados relevantes.
    * Para a variável "longitude" e a variável "latitude":
        * Use o[destinationName](#destinationname)s "longitude" e "latitude" somente se o[unidades](#units)são graus\\_east e graus\\_north, respectivamente. Se seus dados não atenderem a esses requisitos, use diferentes nomes de variáveis (por exemplo, x, y, lonRadians, latRadians) .
        * Se você tiver dados de longitude e latitude expressos em diferentes unidades e assim com diferentesdestinationNames, por exemplo, lonRadians e latRadians, Faça um gráfico ( *datasetID* .) fará gráficos (por exemplo, série de tempo) em vez de mapas.
    * Para a variável "altitude" e a variável "depth":
        * Use o[destinationName](#destinationname)"altitude" para identificar a distância dos dados acima do nível do mar (valores positivos="up") . Opcionalmente, você pode usar "altitude" para distâncias abaixo do nível do mar se os valores forem negativos abaixo do mar (ou se você usar, por exemplo,
Não.&lt;Nome do anúncioscale\\_factor" type="int"&gt;- 1&lt;/att&gt; (#scale_factor) converter valores de profundidade em valores de altitude.
        * Use odestinationName"profundidade" para identificar a distância dos dados abaixo do nível do mar (valores positivos="down") .
        * Um conjunto de dados pode não ter ambas as variáveis "altitude" e "profundidade".
        * Para esses nomes variáveis, o[unidades](#units)deve ser "m", "meter", ou "meters". Se as unidades diferentes (por exemplo,) , você pode usar
Não.&lt;Nome do anúncioscale\\_factor" *alguns Valor* &lt;/att&gt; (#scale_factor) E...&lt;att name="units"&gt;meters&lt;/att&gt; (#units) converter as unidades em metros.
        * Se seus dados não atenderem a esses requisitos, use um diferentedestinationName  (por exemplo, acimaGround, distância Toque no peito) .
        * Se você sabe o CRS vertical, especifique-o nos metadados, por exemplo, "EPSG:5829" (altura instantânea acima do nível do mar) , "EPSG:5831" (profundidade instantânea abaixo do nível do mar) , ou "EPSG:5703" (NAVD88 altura) .
    * Pelo"time"variável:
        * Use o[destinationName](#destinationname) "time"somente para variáveis que incluam toda a data+hora (ou data, se é tudo o que há) . Se, por exemplo, houver colunas separadas para data e horaOfDay, não use o nome variável"time".
        * Ver[unidades](#time-units)para mais informações sobre as unidades atributo por tempo e variáveis timeStamp.
        * A variável de tempo e relacionada[Tempo Variáveis do carimbo](#timestamp-variables)são únicos em que eles sempre convertem valores de dados do formato de hora da fonte (o que quer que seja) em um valor numérico (segundos desde 1970-01-01T00:00:00Z) ou um valor de string (ISO 8601:2004 (E) formato) , dependendo da situação.
        * Quando um usuário solicita dados de tempo, eles podem solicitá-lo especificando o tempo como um valor numérico (segundos desde 1970-01-01T00:00:00Z) ou um valor de string (ISO 8601:2004 (E) formato) .
        *   ERDDAP™tem um utilitário para[Converter um numérico Tempo para / de um tempo de corda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Ver[Como?ERDDAPLidas com o tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Por que apenas duas estruturas básicas de dados?{#why-just-two-basic-data-structures} 
* Uma vez que é difícil para clientes humanos e clientes de computador lidar com um conjunto complexo de possíveis estruturas de conjuntos de dados,ERDDAP™usa apenas duas estruturas básicas de dados:
    * um[estrutura de dados gradeada](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (por exemplo, para dados de satélite e dados de modelo) e
    * um[estrutura de dados tabular](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (por exemplo, para dados no local, estação e trajetória) .
* Certamente, nem todos os dados podem ser expressos nessas estruturas, mas muito dele pode. Os quadros, em especial, são estruturas de dados muito flexíveis (olhar para o sucesso de programas de banco de dados relacional) .
* Isso torna as consultas de dados mais fáceis de construir.
* Isso faz com que as respostas de dados tenham uma estrutura simples, o que torna mais fácil atender os dados em uma variedade mais ampla de tipos de arquivos padrão (que muitas vezes apenas suportam estruturas de dados simples) . Esta é a principal razão pela qual montamosERDDAP™Por aqui.
* Isto, por sua vez, torna muito fácil para nós (ou qualquer pessoa) para escrever software cliente que funciona com tudoERDDAP™conjuntos de dados.
* Isso torna mais fácil comparar dados de diferentes fontes.
* Estamos muito cientes de que, se você estiver acostumado a trabalhar com dados em outras estruturas de dados, você pode inicialmente pensar que essa abordagem é simplista ou insuficiente. Mas todas as estruturas de dados têm negociações. Nenhuma é perfeita. Mesmo as estruturas do-it-all têm suas desvantagens: trabalhar com eles é complexo e os arquivos só podem ser escritos ou lidos com bibliotecas de software especiais. Se aceitarERDDAP's abordagem suficiente para tentar trabalhar com ele, você pode descobrir que tem suas vantagens (notavelmente o suporte para vários tipos de arquivos que podem segurar as respostas de dados) . O[ERDDAP™apresentação de slides](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (em especial[estruturas de dados slide](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) fala muito sobre esses problemas.
* E mesmo que esta abordagem pareça estranha para você, a maioriaERDDAP™clientes nunca vai notar -- eles vão simplesmente ver que todos os conjuntos de dados têm uma estrutura simples agradável e eles serão gratos que eles podem obter dados de uma grande variedade de fontes retornadas em uma ampla variedade de formatos de arquivo.
         
### Dimensões{#dimensions} 
*    **E se as variáveis de grade no conjunto de dados de origem não compartilham as mesmas variáveis de eixo?**   
EmEDDGriddatasets, todas as variáveis de dados (Compartilhar) todas as variáveis do eixo. Então, se um conjunto de dados de origem tiver algumas variáveis com um conjunto de dimensões e outras variáveis com um conjunto diferente de dimensões, você terá que fazer dois conjuntos de dados emERDDAP. Por exemplo, você pode fazer umERDDAP™dataset intitulado "Algumas Título (na superfície) " para manter variáveis que apenas usam\\[Tempo\\]\\[latitude\\]\\[longitude\\]dimensões e fazer outroERDDAP™dataset intitulado "Algumas Título (em profundidades) " para manter as variáveis que usam\\[Tempo\\]\\[altitude\\]\\[latitude\\]\\[longitude\\]. Ou talvez você possa alterar a fonte de dados para adicionar uma dimensão com um único valor (por exemplo, altitude=0) para tornar as variáveis consistentes.
    
    ERDDAP™não lida com conjuntos de dados mais complicados (por exemplo, modelos que usam uma malha de triângulos) Bem. Você pode servir esses conjuntos de dados emERDDAP™criando dois ou mais conjuntos de dadosERDDAP™  (para que todas as variáveis de dados em cada novo conjunto de dados compartilhem o mesmo conjunto de variáveis de eixo) , mas não é isso que os usuários querem. Para alguns conjuntos de dados, você pode considerar fazer uma versão regular do conjunto de dados e oferecer isso além dos dados originais. Alguns software cliente só pode lidar com uma grade regular, por isso, fazendo isso, você atinge clientes adicionais.
     
    
### Dados de grade projetados{#projected-gridded-data} 
Alguns dados gradeados têm uma estrutura complexa. Por exemplo, nível de satélite 2 ("uma longa faixa") os dados não usam uma projeção simples. Modelos (e outros) muitas vezes trabalham com dados gradeados em várias projeções não cilíndricas (por exemplo, conic, polar stereographic, tripolar) ou em redes não estruturadas (uma estrutura de dados mais complexa) . Alguns usuários finais querem esses dados como é, então não há perda de informações. Para esses clientes,ERDDAP™pode servir os dados, como é, apenas se oERDDAP™administrador quebra o conjunto de dados original em alguns conjuntos de dados, com cada parte incluindo variáveis que compartilham as mesmas variáveis de eixo. Sim, isso parece estranho para as pessoas envolvidas e é diferente da maioriaOPeNDAPservidores. Mas...ERDDAP™enfatiza tornar os dados disponíveis em muitos formatos. Isso é possível porqueERDDAP™usa/requer uma estrutura de dados mais uniforme. Embora seja um pouco estranho (ou seja, diferente do esperado) ,ERDDAP™pode distribuir os dados projetados.

\\[Sim.ERDDAP™poderia ter requisitos mais soltos para a estrutura de dados, mas manter os requisitos para os formatos de saída. Mas isso levaria à confusão entre muitos usuários, particularmente novatos, já que muitos pedidos aparentemente válidos para dados com diferentes estruturas seriam inválidos porque os dados não se encaixariam no tipo de arquivo. Continuamos a voltar ao design do sistema atual.\\]

Alguns usuários finais querem dados em uma projeção cilíndrica lat lon como Equirectangular / carrée de placa ou Mercator) para facilitar-de-uso em diferentes situações. Para estas situações, encorajamos oERDDAP™administrador para usar algum outro software (NCO?Matlab? R? IDV? ...?) para re-projetar os dados em uma geografia (Equirectangular projeção/placa carrée) ou outra projeção cilíndrica e servir essa forma dos dados emERDDAP™como um conjunto de dados diferente. Isso é semelhante ao que as pessoas fazem quando convertem dados de nível de satélite 2 em dados de nível 3. Uma dessas ferramentas é[NCO](https://nco.sourceforge.net/nco.html#Regridding)que oferece opções de extensão para dados de reciclagem.

#### GIS e dados de reprojeção{#gis-and-reprojecting-data} 
Uma vez que o mundo do GIS é muitas vezes orientada para o mapa, os programas do GIS geralmente oferecem suporte para reprojetar os dados, ou seja, traçar os dados em um mapa com uma projeção diferente.

Atualmente,ERDDAP™não tem ferramentas para reprojetar dados. Em vez disso, recomendamos que você use uma ferramenta externa para fazer uma variante do conjunto de dados, onde os dados foram reprojetados de sua forma original em um retangular (longitude de latitude) array adequado paraERDDAP.

Em nossa opinião, o CF/DAPO mundo é um pouco diferente do mundo do GIS e funciona a um nível ligeiramente inferior.ERDDAP™reflete isso. Em geral,ERDDAP™é projetado para trabalhar principalmente com dados (não mapas) e não quer mudar (por exemplo, reprojeto) esses dados. ParaERDDAP™, dados gradeados é frequentemente / geralmente / preferencialmente associado com valores de lon lat e uma projeção cilíndrica, e não os valores x,y de alguma projeção. Em qualquer caso,ERDDAP™não faz nada com a projeção dos dados; apenas passa os dados através, como é, com sua projeção atual, sobre a teoria de que uma reprojeção é uma mudança significativa para os dados eERDDAP™não quer estar envolvido com mudanças significativas. Além disso, os usuários subsequentes podem reprojetar ingênuamente os dados novamente, o que não seria tão bom como apenas fazer uma reprojeção. (Então, se oERDDAP™administrador quer oferecer os dados em uma projeção diferente, multa; basta reprojetar os dados off-line e oferecer que como um conjunto de dados diferente emERDDAP. Muitos conjuntos de dados baseados em satélite são oferecidos como o que a NASA chama Nível 2 (Natação) e como Nível 3 (Projeção equirectar) versões.) QuandoERDDAP™faz mapas (diretamente ou viaWMSou KML) ,ERDDAP™atualmente só oferece para fazer mapas com a projeção de carrée Equirectangular / placa que, felizmente, é aceito pela maioria dos programas de mapeamento.

Nós encorajamosERDDAP™administradores para usar algum outro software (NCO?Matlab? R? IDV? ...?) para re-projetar os dados em uma geografia (Equirectangular projeção/placa carrée) ou outra projeção cilíndrica e servir essa forma dos dados emERDDAP™como um conjunto de dados diferente. Isso é semelhante ao que as pessoas fazem quando convertem dados de nível de satélite 2 em dados de nível 3. Uma dessas ferramentas é[NCO](https://nco.sourceforge.net/nco.html#Regridding)que oferece opções de extensão para dados de reciclagem.

Esperamos queERDDAP™terá ferramentas embutidas para oferecer mapas com outras projeções no futuro. Também esperamos ter melhores conexões com o mundo do GIS no futuro (diferente da correnteWMSserviço) . É terrível que neste mundo "moderno" as ligações entre a CF/DAPO mundo e o mundo do SIG ainda são tão fracos. Ambas as coisas estão na lista Para Fazer. (Se você quiser ajudar, notavelmente com a conexãoERDDAP™para MapServer, por favor envie um e-mail para Chris. John em noaaa.gov .) 
    
### Tipos de dados{#data-types} 
ERDDAP™suporta os seguintes tipos de dados
 (os nomes são sensíveis a casos;'u'prefixo significa "não assinado"; o número muitos dos nomes em outros sistemas é o número de bits) :

#### bytes{#byte} 
*    **bytes** assinou valores inteiros com um intervalo de -128 a 127.
Em outros sistemas, isso às vezes é chamado de int8.
Isso é chamado de "tinyint" por SQL e Cassandra.
    ERDDAP™converte[booleano](#boolean-data)de algumas fontes (por exemplo, SQL e Cassandra) em bytes emERDDAP™com um valor de 0=false, 1=true, e 127=missing\\_value.
#### O que é?{#ubyte} 
*    **O que é?** tem valores inteiros não assinados com um intervalo de 0 a 255.
Em outros sistemas, isso às vezes é chamado de uint8.
#### curto{#short} 
*    **curto** assinou valores inteiros com um intervalo de -32768 a 32767.
Em outros sistemas, isso é às vezes chamado int16.
Isso é chamado de "smallint" por SQL e Cassandra.
#### - Não.{#ushort} 
*    **- Não.** tem valores inteiros não assinados com um intervalo de 0 a 65535.
Em outros sistemas, isso é às vezes chamado de uint16.
#### - Não.{#int} 
*    **- Não.** assinou valores inteiros com um intervalo de -2147483648 para 2147483647.
Em outros sistemas, isso é às vezes chamado int32.
Isto chama-se "integer"|numérico (?) " por SQL e "int" por Cassandra.
#### *{#uint} 
*    ***** tem valores inteiros não assinados com um intervalo de 0 a 4294967295.
Em outros sistemas, isso às vezes é chamado de uint32.
#### longo{#long} 
*    **longo** assinou valores inteiros com uma gama de -9223372036854775808 a 9223372036854775807.
Em outros sistemas, isso às vezes é chamado de int64.
Isto chama-se "bigint|numérico (?) " por SQL e "bigint" por Cassandra.
Como muitos tipos de arquivos não suportam dados longos, seu uso é desencorajado. Quando possível, use o dobro em vez (ver abaixo) .
#### ulongo{#ulong} 
*    **ulongo** tem valores inteiros não assinados com um intervalo de 0 a 18446744073709551615
Em outros sistemas, isso é às vezes chamado de uint64.
Como muitos tipos de arquivos não suportam dados longos, seu uso é desencorajado. Quando possível, use o dobro em vez (ver abaixo) .
#### flutuar{#float} 
*    **flutuar** é um flutuador IEEE 754 com uma gama de aproximadamente +/- 3.402823466e+38.
Em outros sistemas, isso às vezes é chamado de float32.
Isto chama-se "real|flutuar (?) |decimal (?) |numérico (?) " por SQL e "float" por Cassandra.
O valor especial NaN significa não-um-Number.
    ERDDAP™converte valores de infinito positivos e negativos para NaN.
#### duplo{#double} 
*    **duplo** é um IEEE 754 duplo com uma gama de aproximadamente
+/- 1.7976931348623157E+308.
Em outros sistemas, isso é às vezes chamado float64.
Isto é chamado de "precisão dupla|flutuar (?) |decimal (?) |numérico (?) " por SQL e "double" por Cassandra.
O valor especial NaN significa não-um-Number.
    ERDDAP™converte valores de infinito positivos e negativos para NaN.
#### Charlie.{#char} 
*    **Charlie.** é um único, 2-byte (16 bits)  [Característica Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16)variando de\\u0000  (#) através de\\uffff  (#65535) .
    \\uffffA definição é não-um-Character, análoga a um valor duplo de NaN.
O uso de char é desencorajado porque muitos tipos de arquivo não suportam chars ou apenas suportam 1-byte chars (ver abaixo) . Considere usar String em vez disso.
Os usuários podem usar variáveis de carvão para fazer gráficos.ERDDAP™converterá os caracteres em seu número de ponto de código Unicode, que pode ser usado como dados numéricos.
#### String{#string} 
*    **String** é uma sequência de 0 ou mais, 2-byte (16 bits)  [Unicode UCS-2 caracteres](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™usa/interpreta uma string de 0 comprimento como um valor ausente.ERDDAP™não suporta uma verdadeira cadeia nula.
O comprimento de corda máxima teórica é 2147483647 caracteres, mas há provavelmente vários problemas em vários lugares, mesmo com Strings um pouco mais curtos.
UsoERDDAP's String for SQL's character, varchar, caractere variando, binário, varbinário, intervalo, array, multiset, xml, e qualquer outro tipo de dados de banco de dados que não se encaixa de forma limpa com qualquer outroERDDAP™tipo de dados.
UsoERDDAP"S String for Cassandra" e qualquer outro tipo de dados Cassandra que não se encaixa de forma limpa com qualquer outroERDDAP™tipo de dados.
     

AntesERDDAP™v2.10,ERDDAP™não apoiou tipos inteiros não assinados internamente e ofereceu suporte limitado em seus leitores de dados e escritores.
    
### Limitações do tipo de dados{#data-type-limitations} 
Você pode pensar emERDDAP™como um sistema que tem conjuntos de dados virtuais, e que funciona lendo dados de uma fonte de dados em um modelo de dados interno e escrevendo dados para vários serviços (por exemplo,(OPeN)DAP,WMS) e tipos de arquivo em resposta às solicitações do usuário.

* Cada leitor de entrada suporta um subconjunto dos tipos de dados queERDDAP™suportes. Então, ler dados emERDDAPAs estruturas de dados internas não são um problema.
* Cada escritor de saída também suporta um subconjunto de tipos de dados. Isso é um problema porqueERDDAPtem que apertar, por exemplo, dados longos em tipos de arquivos que não suportam dados longos.
     

Abaixo estão explicações das limitações (ou nenhum) de vários escritores de saída e comoERDDAP™lida com os problemas. Tais complicações são uma parte inerente deERDDAPO objetivo de fazer sistemas diferentes interoperáveis.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, etc.) arquivos de texto -
    * Todos os dados numéricos são escritos através da sua representação String (com valores de dados ausentes aparecendo como strings de 0 comprimento) .
    * EmboraERDDAP™escreve valores longos e longos corretamente para arquivos de texto ASCII, muitos leitores (por exemplo, programas de planilha) não pode lidar corretamente com valores longos e longos e convertê-los em valores duplos (com perda de precisão em alguns casos) .
    * Os dados de caracteres e caracteres são escritos via JSON Strings, que lidam com todos os caracteres Unicode (notavelmente, os caracteres "unusual" além do ASCII #127, por exemplo, o personagem Euro aparece como "\\u20ac") .
    
        
#### JSON{#json} 
* JSON (.json,.jsonlCSV, etc.) arquivos de texto -
    * Todos os dados numéricos são escritos através da sua representação String.
    * Os dados de caracteres e caracteres são escritos como caracteres JSON, que lidam com todos os caracteres Unicode (notavelmente, os caracteres "unusual" além do ASCII #127, por exemplo, o personagem Euro aparece como "\\u20ac") .
    * Os valores perdidos para todos os tipos de dados numéricos aparecem como nulos.
         
#### .nc3 arquivos{#nc3-files} 
*   .nc3 arquivos não suportam nativamente qualquer tipo de dados inteiros não assinados. Antes de CF v1.9, CF não apoiou tipos inteiros não assinados. Para lidar com isto,ERDDAP™2.10+ segue o padrão NUG e sempre adiciona um atributo "\\_Unsigned" com um valor de "true" ou "false" para indicar se os dados são de uma variável não assinada ou assinada. Todos os atributos inteiros são escritos como atributos assinados (por exemplo, byte) com valores assinados (por exemplo, um ubyteactual\\_rangeo atributo com valores 0 a 255, aparece como um atributo byte com valores 0 a -1 (o inverso do valor do complemento dos dois do valor out-of-range). Não há nenhuma maneira fácil de saber quais (assinados) atributos inteiros devem ser lidos como atributos não assinados.ERDDAP™suporta o atributo "\\_Unsigned" quando lê.nc3 ficheiros.
*   .nc3 arquivos não suportam os tipos de dados longos ou longos.ERDDAP™lida com isso convertendo-os temporariamente para ser variáveis duplas. O dobro pode representar exatamente todos os valores até +/- 9,007,199,254,740,992 que é 2^53. Esta é uma solução imperfeita.Unidatarecusa fazer uma pequena atualização para.nc3 para lidar com isso e problemas relacionados, citando.nc4 (uma grande mudança) como a solução.
* A especificação CF (antes de v1.9) disse que suporta um tipo de dados de carvão, mas não é claro se o carvão é destinado apenas como os blocos de construção de matrizes de carvão, que são efetivamente Strings. Perguntas para sua lista de discussão renderam apenas respostas confusas. Por causa dessas complicações, é melhor evitar variáveis de caridade emERDDAP™e use variáveis de corda sempre que possível.
* Tradicionalmente,.nc3 arquivos apenas suportados strings com ASCII codificado (7 bits, #0 - #127) personagens. NUG (eERDDAP) estender (início ~ 2017) incluindo o atributo "\\_Encoding" com um valor de "ISO-8859-1" (uma extensão de ASCII que define todos os 256 valores de cada caractere de 8 bits) ou "UTF-8" para indicar como os dados String são codificados. Outras codificações podem ser legais, mas são desencorajadas.
         
#### .nc4 arquivos{#nc4-files} 
*   .nc4 arquivos suportam todosERDDAPOs tipos de dados.
    
#### Arquivos NCCSV{#nccsv-files} 
Os arquivos NCCSV 1.0 não suportam nenhum tipo de dados inteiros não assinados.
[NCCSV 1.1+ arquivos](/docs/user/nccsv-1.00)suporte todos os tipos de dados inteiros não assinados.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, arquivos .asc ASCII e arquivos binários .dods) - Não.
    *   (OPeN)DAPmanipula curto, ushort, int, uint, flutuar e valores duplos corretamente.
    *   (OPeN)DAPtem um tipo de dados "byte" que define como não assinado, enquanto historicamente, THREDDS eERDDAP™ter tratado "byte" como assinado em seu(OPeN)DAPserviços. Para lidar com isto melhor,ERDDAP™2.10+ segue o padrão NUG e sempre adiciona um atributo "\\_Unsigned" com um valor de "true" ou "false" para indicar se os dados são o queERDDAP™chamadas byte ou ubyte. Todos os atributos byte e ubyte são escritos como atributos "byte" com valores assinados (por exemplo, um ubyteactual\\_rangeo atributo com valores 0 a 255, aparece como um atributo byte com valores 0 a -1 (o inverso do valor do complemento dos dois do valor out-of-range). Não há nenhuma maneira fácil de saber quais atributos "byte" devem ser lidos como atributos ubyte.
    *   (OPeN)DAPnão suporta longos assinados ou não assinados.ERDDAP™lida com isso, convertendo-os temporariamente para serem variáveis e atributos duplos. Os dobros podem representar exatamente todos os valores até 9,007,199,254,740,992 que é 2^53. Esta é uma solução imperfeita.OPeNDAP  (a organização) recusa fazer uma pequena atualização paraDAP2.0 para lidar com isso e problemas relacionados, citandoDAP4 (uma grande mudança) como a solução.
    * Porque...(OPeN)DAPnão tem nenhum tipo de dados de carvão separado e tecnicamente só suporta caracteres 1-byte ASCII (#0 - #127) em Strings, as variáveis de dados de carvão aparecerão como Strings de 1 caracteres em(OPeN)DAP.das, .dds, e .dods respostas.
    * Tecnicamente, o(OPeN)DAPespecificação apenas suporta strings com caracteres codificados ASCII (#0 - #127) . NUG (eERDDAP) estender (início ~ 2017) incluindo o atributo "\\_Encoding" com um valor de "ISO-8859-1" (uma extensão de ASCII que define todos os 256 valores de cada caractere de 8 bits) ou "UTF-8" para indicar como os dados String são codificados. Outras codificações podem ser legais, mas são desencorajadas.
         
### Tipo de dados Comentários{#data-type-comments} 
* Devido ao mau suporte para dados longos, longos e de caridade em muitos tipos de arquivos, desencorajamos o uso desses tipos de dados emERDDAP. Quando possível, use o dobro em vez de longo e ulong, e use String em vez de char.
     
* Metadata - Porque(OPeN)DAPAs respostas .das e .dds não suportam atributos ou tipos de dados longos ou longos (e em vez mostrar-lhes como duplos) , você pode em vez disso querer usarERDDAP's representação tabular de metadados como visto nahttp... **info** / *datasetID* Página web .html (por exemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (que você também pode obter em outros tipos de arquivo, por exemplo, .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) ou o.nccsvResposta de metadados (por exemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)Embora.nccsvMetadata só está disponível para conjuntos de dados tabulares) , ambos suportam todos os tipos de dados (notavelmente, longo, ulongo e char) .
         
### Arquivos de mídia{#media-files} 
Nem todos os dados são arrays de números ou texto. Alguns conjuntos de dados consistem ou incluem arquivos de mídia, como imagens, arquivos de áudio e vídeo.ERDDAP™tem alguns recursos especiais para tornar mais fácil para os usuários obter acesso a arquivos de mídia. É um processo de dois passos:
 

1. Faça cada arquivo acessível através de sua própria URL, através de um sistema que suporta solicitações de intervalo byte.
A maneira mais fácil de fazer isso é colocar os arquivos em um diretório queERDDAP™tem acesso. (Se eles estão em um recipiente como um.ziparquivo, descompactá-los, embora você pode querer oferecer o.ziparquivo para usuários também.) Então, faça um[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)dataset para tornar esses arquivos acessíveis viaERDDAP™, nomeadamente atravésERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Todos os arquivos tornados acessíveis via EDDTableFromFileNames eERDDAP'"files"suporte ao sistema[pedidos de intervalo](https://en.wikipedia.org/wiki/Byte_serving). Normalmente, quando um cliente (por exemplo, um navegador) faz um pedido para uma URL, ele recebe todo o arquivo como a resposta. Mas com uma solicitação de intervalo byte, a solicitação especifica uma variedade de bytes do arquivo, e o servidor só retorna esses bytes. Isto é relevante aqui porque os leitores de áudio e vídeo em navegadores só funcionam se o arquivo pode ser acessado através de solicitações de intervalo byte.
    
Opcional: Se você tem mais de um conjunto de dados com arquivos de mídia associados, você pode fazer apenas um EDDTableFromFileNames que tem uma subpasta para cada grupo de arquivos. A vantagem é que quando você deseja adicionar novos arquivos de mídia para um novo conjunto de dados, tudo que você precisa fazer é criar uma nova pasta e colocar os arquivos nessa pasta. A pasta e os arquivos serão automaticamente adicionados ao conjunto de dados EDDTableFromFileNames.
    
2. Opcional: Se você tiver um conjunto de dados que inclui referências a arquivos de mídia, adicione-oERDDAP.
Por exemplo, você pode ter um arquivo .csv com uma linha por cada vez que alguém viu uma baleia e uma coluna que inclui o nome de um arquivo de imagem relacionado a esse avistamento. Se o nome do arquivo de imagem é apenas o nome do arquivo, por exemplo, Img20141024T192403Z, não uma URL completa, então você precisa adicionar[Arquivos de arquivos Url e/ou arquivoAccessSuffix](#fileaccessbaseurl)atributos para os metadados para issodataVariableque especifica a baseURL e sufixo para esses nomes de arquivo. Se você fez os arquivos acessíveis via EDDTableFromFileNames, a URL estará no formulário
     *BaseUrl* /erddap / arquivos / *datasetID* /
Por exemplo,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Se houver um.zipou outro arquivo de recipiente com todos os arquivos de mídia relacionados a uma variável de dados, recomendamos que você também torne esse arquivo acessível aos usuários (ver o passo 1 acima) e depois identificá-lo com um[arquivoAccessArchive Url.](#fileaccessarchiveurl)atributo.
    

\\[ComeçarERDDAP™V1.82\\]Se você fizer o primeiro passo acima (ou ambos os passos) , então quando um usuário vê oERDDAP™ "files"sistema para esse conjunto de dados (ou pede para ver um subconjunto do conjunto de dados através de um.htmlTablepedido, se você fez o segundo passo) ,ERDDAP™mostrará um ícone '?' à esquerda do nome do arquivo. Se o usuário pairar sobre esse ícone, eles verão um pop-up mostrando a imagem, ou um leitor de áudio, ou um leitor de vídeo. Os navegadores suportam apenas um número limitado de tipos de

* imagem (geralmente .gif, .jpg, e .png) ,
* áudio (geralmente .mp3, .ogg, e .wav) e
* arquivos de vídeo (geralmente .mp4, .ogv, e . Webm) .

O suporte varia com diferentes versões de diferentes navegadores em diferentes sistemas operacionais. Então, se você tem uma escolha de que tipo de arquivo para oferecer, faz sentido oferecer esses tipos.

Ou, se um usuário clicar no nome de arquivo mostrado em umERDDAP™página web, seu navegador irá mostrar a imagem, áudio ou arquivo de vídeo como uma página web separada. Isto é principalmente útil para ver uma imagem muito grande ou vídeo dimensionado para tela cheia, em vez de em um pop-up.
    
### Trabalhando com arquivos AWS S3{#working-with-aws-s3-files} 
[Serviço Web da Amazon (AWS) ](https://aws.amazon.com)é um vendedor de[computação em nuvem](https://en.wikipedia.org/wiki/Cloud_computing)serviços.[S3](https://aws.amazon.com/s3/)é um sistema de armazenamento de objetos oferecido pela AWS. Em vez do sistema hierárquico de diretórios e arquivos de um sistema de arquivos tradicional (como um disco rígido em seu PC) , S3 oferece apenas "buckets" que possuem "objetos" (Vamos chamá-los."files") .

Para arquivos ASCII (por exemplo, .csv) ,ERDDAP™pode trabalhar com os arquivos nos baldes diretamente. A única coisa que você precisa fazer é especificar o&lt;fileDir&gt; para o conjunto de dados usando um formato específico para o balde AWS, por exemplo, https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Você não deve usar&lt;cacheDeUrl&gt; . Veja abaixo os detalhes.

Mas para arquivos binários (por exemplo,.nc, .grib, .bufr, e.hdfarquivos) , você precisa usar o&lt;cacheDeUrl&gt; sistema descrito abaixo.ERDDAP, netcdf-java (queERDDAP™usa para ler dados desses arquivos) , e outros softwares de dados científicos são projetados para trabalhar com arquivos em um sistema de arquivos tradicional que oferece[nível de bloco](https://en.wikipedia.org/wiki/Block-level_storage)acesso a arquivos (que permite ler pedaços de um arquivo) , mas S3 apenas oferece[nível de arquivo (objeto) ](https://en.wikipedia.org/wiki/Block-level_storage)acesso a arquivos (que só permite ler todo o arquivo) . AWS oferece uma alternativa para S3,[Loja de bloco elástico (EBS) ](https://aws.amazon.com/ebs/)), que suporta o acesso de nível de bloco a arquivos, mas é mais caro do que S3, por isso raramente é usado para armazenamento em massa de grandes quantidades de arquivos de dados. (Então, quando as pessoas dizem armazenar dados na nuvem (S3) é barato, geralmente é uma comparação de maçãs a laranjas.) 

#### S3 Buckets{#s3-buckets} 
 **O conteúdo de um balde. Chaves. Objetos. Delimitadores.**   
Tecnicamente, baldes S3 não são organizados em uma estrutura hierárquica de arquivos como um sistema de arquivos em um computador. Em vez disso, os baldes contêm apenas "objetos" (arquivos) , cada um dos quais tem uma "chave" (um nome) . Um exemplo de uma chave nesse balde noaa-goes17 é

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
O URl correspondente para esse objeto é

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS suporta uma pequena variação de como essa URL é construída, masERDDAP™requer este formato específico:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
É prática comum, como com este exemplo, fazer nomes-chave parecer um caminho hierárquico mais um nome de arquivo, mas tecnicamente eles não são. Como é comum e útil,ERDDAP™trata chaves com /'s como se eles são um caminho hierárquico mais nome de arquivo, e esta documentação irá se referir a eles como tal. Se as chaves de um balde não usam /'s (por exemplo, uma chave como
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), entãoERDDAP™vai apenas tratar toda a chave como um nome de arquivo longo.

Privado vs Public Buckets - ... O administrador do balde S3 pode tornar o balde e seu conteúdo público ou privado. Se público, qualquer arquivo no balde pode ser baixado por qualquer pessoa usando a URL para o arquivo. Amazon tem um[Dados abertos](https://aws.amazon.com/opendata/)programa que hospeda conjuntos de dados públicos (incluindo dados deNOAA, NASA e USGS) gratuitamente e não cobra para que ninguém baixe os arquivos desses baldes. Se um balde é privado, os arquivos no balde são acessíveis apenas aos usuários autorizados e AWS cobra uma taxa (geralmente pago pelo proprietário do balde) para baixar arquivos para um computador não-AWS S3.ERDDAP™pode trabalhar com dados em baldes públicos e privados.

#### Credenciais AWS{#aws-credentials} 
Para fazer issoERDDAP™pode ler o conteúdo de baldes privados, você precisa de credenciais AWS e você precisa armazenar um arquivo de credenciais no lugar padrão assimERDDAP™pode encontrar as informações. Veja o SDK AWS paraJava2.x documentação:[Definir credenciais padrão](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (A opção de armazenar os valores comoJavaparâmetros de linha de comando em\\[Toca a brincar.\\]/bin/setenv.sh pode ser uma boa opção.) 
#### AWS / arquivos /{#aws-files} 
* /arquivos/sistema -- OERDDAP™ [/arquivos/sistema](#accessibleviafiles)permite que os usuários baixem os arquivos de origem para um conjunto de dados. Recomendamos que você ligue isso para todos os conjuntos de dados com arquivos de origem porque muitos usuários querem baixar os arquivos de origem originais.
    * Se os arquivos estiverem em um balde S3 privado, o pedido do usuário para baixar um arquivo será tratado porERDDAP™, que irá ler os dados do arquivo e, em seguida, transmiti-lo ao usuário, aumentando assim a carga em seuERDDAP™, usando largura de banda de entrada e saída, e fazendo você (oERDDAP™administrador) pagar a taxa de entrada de dados para AWS.
    * Se os arquivos estiverem em um balde público S3, o pedido do usuário para baixar um arquivo será redirecionado para a URL AWS S3 para esse arquivo, para que os dados não fluam atravésERDDAP™, reduzindo assim a carga emERDDAP. E se os arquivos estão em um Amazon Open Data (grátis) balde público, então você (oERDDAP™administrador) não terá que pagar qualquer taxa de entrada de dados para AWS. Assim, há uma grande vantagem servindo dados de público (não privado) baldes S3, e uma enorme vantagem para servir dados da Amazon Open Data (grátis) baldes.

#### ERDDAP™e AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™e AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
Felizmente, depois de muito esforço,ERDDAP™tem uma série de recursos que permitem lidar com os problemas inerentes de trabalhar com o nível de bloco S3 acesso a arquivos de uma forma razoavelmente eficiente:

*   \\[Disclaimer: Trabalhar com baldes AWS S3 é muito trabalho extra. AWS é um enorme ecossistema de serviços e recursos. Há muito para aprender. Leva tempo e esforço, mas é possível. Sê paciente e vais trabalhar. Olhar / pedir ajuda
([Documentação da AWS](https://aws.amazon.com/documentation/gettingstarted/), sites como[Overflow em pilha](https://stackoverflow.com/), e o regular
    [ERDDAP™opções de suporte](/docs/intro#support)) se / quando você ficar preso.\\]  
     
* Pode ser difícil até descobrir a estrutura do diretório e nomes de arquivos dos arquivos em um balde S3.ERDDAP™tem uma solução para este problema: EDDTableFromFileNames tem um especial[\\*\\*\\* a partir de](#fromonthefly)opção que permite fazer um conjunto de dados EDDTableFromFileNames que permite aos usuários navegar o conteúdo de um balde S3 (e arquivos de download) através do conjunto de dados"files"opção. Há um[exemplo deste abaixo](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™pode ler dados de[arquivos de dados compactados externamente](#externally-compressed-files), por isso é bom se os arquivos em S3 são armazenados como.gz,.gzip,.bz2, .Z, ou outros tipos de arquivos de dados externamente compactados, que podem dramaticamente (2 - 20X) corte nos custos de armazenamento de arquivos. Muitas vezes não há pena de tempo para usar arquivos compactados externamente, desde o tempo salvo, transferindo um arquivo menor de S3 paraERDDAPaproximadamente equilibra o tempo extra necessário paraERDDAP™para descomprimir o arquivo. Para usar esse recurso, você só precisa ter certeza de que o conjunto de dados&lt;fileNameRegex&gt; permite o tipo de arquivo comprimido (por exemplo, adicionando (|.gz) ao fim do regex) .
     
* Para o caso mais comum, onde você tem umERDDAP™instalado em seu PC para teste / desenvolvimento e onde o conjunto de dados tem arquivos de dados binários que são armazenados como objetos em um balde S3, uma abordagem para obter o conjunto de dados emERDDAP™é:
    1. Crie um diretório no seu PC para armazenar alguns arquivos de dados de teste.
    2. Baixe dois arquivos de dados da fonte para o diretório que você acabou de criar.
    3. Uso[Gerar conjuntos de dadosXml](#generatedatasetsxml)para gerar o pedaço dedatasets.xmlpara o conjunto de dados baseado nos dois arquivos de dados locais.
    4. Verifique se esse conjunto de dados funciona conforme desejado[DasDds](#dasdds)e/ou seu localERDDAP.
        
         **As seguintes etapas fazem uma cópia desse conjunto de dados (que receberá dados do balde S3) em um públicoERDDAP.** 
        
    5. Copie o pedaço dedatasets.xmlpara o conjunto de dados para odatasets.xmlpara o públicoERDDAP™que servirá os dados.
    6. Criar um diretório no públicoERDDAP's disco rígido local para segurar um cache de arquivos temporários. O diretório não usará muito espaço em disco (veja cacheSizeGB abaixo) .
    7. Alterar o valor do conjunto de dados&lt;fileDir&gt; tag para que ele aponta para o diretório que você acabou de criar (mesmo que o diretório esteja vazio) .
    8. Adicionar um[Cache De Url](#cachefromurl)tag que especifica o nome do balde do conjunto de dados e prefixo opcional (ou seja, diretório) em específico[Aws S3 URL Formato queERDDAP™requerimento](#accessing-files-in-an-aws-s3-bucket).
    9. Adicionar um [&lt;cacheSizeGB&gt;] (#cachefromurl) tag to the dataset's xml (por exemplo, 10 é um bom valor para a maioria dos conjuntos de dados) para contarERDDAP™para limitar o tamanho do cache local (ou seja, não tente guardar todos os arquivos remotos) .
    10. Veja se isso funciona em públicoERDDAP. Note que a primeira vezERDDAP™carrega o conjunto de dados, levará muito tempo para carregar, porqueERDDAP™precisa baixar e ler todos os arquivos de dados.
        
Se o conjunto de dados é uma enorme coleção de arquivos de dados gradeados enormes, isso levará muito tempo e será impraticável. Em alguns casos, para arquivos de dados gradeados,ERDDAP™pode extrair as informações necessárias (por exemplo, o ponto de hora para os dados em um arquivo de dados gradeado) do nome do arquivo e evitar este problema. Ver[Agregação via Nomes de arquivo](#aggregation-via-file-names-or-global-metadata).
        
    11. Opcionalmente (mas especialmente para conjuntos de dados EDDTableFromFiles) , você pode adicionar um[NTreads](#nthreads)tag to the dataset to tellERDDAPusar mais de 1 thread ao responder ao pedido de dados de um usuário. Isso minimiza os efeitos do atraso que ocorre quandoERDDAP™lê arquivos de dados de (remoto) AWS S3 baldes no cache local e (talvez) descomprimir-os.

#### AWS S3 Dados abertos{#aws-s3-open-data} 
Como parte deNOAA'[Programa de Big Data](https://www.noaa.gov/nodd/about),NOAAtem parcerias com cinco organizações, incluindo AWS, "para explorar os benefícios potenciais de armazenar cópias de observações-chave e saídas de modelos na nuvem para permitir a computação diretamente sobre os dados sem exigir mais distribuição". AWS inclui os conjuntos de dados que recebeNOAAcomo parte de seu programa para oferecer acesso público a uma grande coleção de[Dados abertos no AWS S3](https://registry.opendata.aws/)de qualquer computador, seja uma instância de computação da Amazon (um computador alugado) na rede AWS ou seu próprio PC em qualquer rede. O exemplo abaixo assume que você está trabalhando com um conjunto de dados publicamente acessível.

#### Acessando arquivos em um balde AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Para um balde de dados S3 privado, o proprietário do balde deve lhe dar acesso ao balde. (Veja a documentação da AWS.) 

Em todos os casos, você precisará de uma conta AWS porque o SDK AWS paraJava  (queERDDAP™usa para recuperar informações sobre o conteúdo de um balde) requer credenciais de conta AWS. (mais sobre este abaixo) 

ERDDAP™só pode acessar baldes AWS S3 se você especificar o [&lt;cacheDe Url&gt;] (#cachefromurl) (ou&lt;fileDir&gt;) em um formato específico:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
Onde?

* O baldeNome é a forma curta do nome do balde, por exemplo, noaa-goes17 .
* A aws-region, por exemplo, us-east-1, é da coluna "Region" em uma das tabelas de[Pontos finais de serviço AWS](https://docs.aws.amazon.com/general/latest/gr/rande.html)onde o balde está realmente localizado.
* O prefixo é opcional. Se presente, deve terminar com'/'.

Por exemplo, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Este formato URL é uma das recomendações AWS S3: ver[Acesso a um balde](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)e[esta descrição de prefixos](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™requer que você combine a URL do balde e o prefixo opcional em uma URL, a fim de especificar&lt;cacheDeUrl&gt; (ou&lt;fileDir&gt;) onde os arquivos estão localizados.

#### Teste público AWS S3 Buckets{#test-public-aws-s3-buckets} 
Para baldes públicos, você pode e deve testar a URL do balde do diretório AWS S3 em seu navegador, por exemplo,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Se a URL do balde estiver correta e apropriada paraERDDAP, ele retornará um documento XML que tem (parcial) listagem do conteúdo daquele balde. Infelizmente, a URL completa (i.e., URL do balde mais prefixo) queERDDAP™quer para um determinado conjunto de dados não funciona em um navegador. AWS não oferece um sistema para navegar na hierarquia de um balde facilmente em seu navegador. (Se isso estiver errado, por favor envie um e-mail para Chris. John no noaaa.gov. Caso contrário, Amazon, por favor, adicione suporte para isso&#33;) 

#### Visualizando o conteúdo de um balde{#viewing-the-contents-of-a-bucket} 
baldes S3 muitas vezes contêm um par de categorias de arquivos, em um par de subdiretórios pseudo, que poderiam se tornar um par deERDDAP™conjuntos de dados. Para fazer oERDDAP™datasets, você precisa saber o diretório inicial para&lt;cacheDeUrl&gt; (ou&lt;fileDir&gt;) e o formato dos nomes de arquivos que identificam esse subconjunto de arquivos. Se você tentar visualizar todo o conteúdo de um balde em um navegador, S3 irá apenas mostrar-lhe os primeiros 1000 arquivos, o que é insuficiente. Atualmente, a melhor maneira para você ver todos os conteúdos de um balde é fazer um[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)conjunto de dados (no seu PCERDDAP™e/ou em seu públicoERDDAP) , que também lhe dá uma maneira fácil de navegar na estrutura do diretório e baixar arquivos. O&lt;fileDir&gt; para isso será a URL que você fez acima, por exemplo, https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Por que o AWS S3 não oferece uma maneira rápida e fácil para alguém fazer isso sem uma conta AWS?\\]Note que quando eu faço isso no meu PC em uma rede não-Amazon, parece que a Amazon retarda a resposta a um truque (cerca de 100 (?) arquivos por chunk) após os primeiros pedaços (de 1000 arquivos por pedaço) são baixados. Uma vez que os baldes podem ter um grande número de arquivos (noaa-goes17 tem 26 milhões) , recebendo todo o conteúdo de um balde pode tomar EDDTableDeFileNames várias horas (Por exemplo, 12&#33;) para terminar.\\[Amazon, é verdade?&#33;\\]

#### Fazendo uma tabela EDD FromFileNames Dataset with a AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Se você tem um nome de balde, mas não já tem uma lista de arquivos no balde S3 ou o prefixo que identifica a localização dos arquivos relevantes no balde, use as instruções abaixo para fazer um conjunto de dados EDDTableFromFileNames para que você possa navegar na hierarquia de diretório do balde S3 viaERDDAP'"files"sistema.

1. Abra uma conta AWS
    ERDDAP™usa o[SDK AWS paraJava](https://docs.aws.amazon.com/sdk-for-java/index.html)para obter informações do balde da AWS, então você precisa[criar e ativar uma conta AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). É um grande trabalho, com muitas coisas para aprender.
     
2. Coloque suas credenciais AWS ondeERDDAP™pode encontrá-los.
Siga as instruções no[Configurar Credenciais AWS e Região para o Desenvolvimento](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)Então...ERDDAP™  (especificamente, o SDK AWS paraJava) será capaz de encontrar e usar suas credenciais AWS. SeERDDAP™não pode encontrar as credenciais, você verá uma
Java.lang. IllegalArgumentException: arquivo de perfil não pode ser erro nulo emERDDAPO arquivo log.txt.
    
Dica para Linux e Mac OS: o arquivo de credenciais deve estar no diretório inicial do usuário que está executando Tomcat (eERDDAP)   (para este parágrafo, vamos assumir user=tomcat) em um arquivo chamado ~/.aws/credentials . Não assuma que ~ é /home/tomcat -- realmente use cd ~ para descobrir onde o sistema operacional pensa ~ para usuário=tomcat é. Crie o diretório se não existir. Além disso, depois de colocar o arquivo de credenciais no lugar, certifique-se de que o usuário e grupo para o arquivo são tomcat e, em seguida, use credenciais chmod 400 para se certificar de que o arquivo é somente leitura para user=tomcat.
    
3. Criar a URL do balde no[formato queERDDAP™requerimento](#accessing-files-in-an-aws-s3-bucket), por exemplo,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)e (para baldes públicos) testá-lo em um navegador para certificar-se de que retorna um documento XML que tem uma listagem parcial do conteúdo daquele balde.
     
4. Uso[Gerar conjuntos de dadosXml](#generatedatasetsxml)para criar um[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)dataset:
    * Para o diretório Iniciar, use esta sintaxe:
        \\*\\*\\ *deOnTheFly,* O que foi?
por exemplo,
        \\*\\*\\*deOnTheFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Nome de arquivo regex? .
    * Recursivo? verdadeiro
    * recarregar Todas as NMinutes? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * instituição?NOAA
    * Sumário? Nada. (ERDDAP™criará um resumo decente automaticamente.) 
    * título? Nada. (ERDDAP™criará um título decente automaticamente.) Como de costume, você deve editar o XML resultante para verificar a correção e fazer melhorias antes do pedaço de conjuntos de dados usá-lo emdatasets.xml.
5. Se você seguir as instruções acima e carregar o conjunto de dados emERDDAP, você criou um conjunto de dados EDDTableFromFiles. Como exemplo, e para tornar mais fácil para qualquer pessoa navegar e baixar arquivos dos baldes AWS Open Data, criamos conjuntos de dados ETableDDFromFileNames (veja a lista em
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) para quase todos os[AWS S3 Abrir baldes de dados](https://registry.opendata.aws/).
    \\[Os poucos baldes que não incluímos ou têm um grande número de arquivos no diretório raiz (mais do que pode ser baixado em uma quantidade razoável de tempo) , ou não permitir acesso público (Não deviam ser todos públicos?) , ou são os baldes do Requester Pays (por exemplo, Sentinel) .\\]  
Se você clicar no"files"link para um desses conjuntos de dados, você pode navegar na árvore de diretórios e arquivos nesse balde S3. Por causa do caminho\\*\\*\\*deOnTheFly EDDTableDeFiles funciona, essas listagens de diretórios estão sempre perfeitamente atualizadas porqueERDDAP™Atinge-os. Se você clicar na árvore de diretório para um nome de arquivo real e clicar no nome do arquivo,ERDDAP™irá redirecionar seu pedido para AWS S3 para que você possa baixar o arquivo diretamente de AWS. Você pode então inspecionar esse arquivo.
    
Problemas?
Se o seu EDDTableFromFiles não carregarERDDAP™  (ou DasDds) , veja no arquivo log.txt para uma mensagem de erro. Se vires uma
Java.lang. IllegalArgumentException: arquivo de perfil não pode ser erro nulo, o problema é que o AWS SDK paraJava  (usado porERDDAP) Não está a encontrar o ficheiro das credenciais. Veja as instruções de credenciais acima.
     

É lamentável que a AWS não simplesmente permita que as pessoas usem um navegador para ver o conteúdo de um balde público.

 **Então você pode fazerERDDAP™conjuntos de dados que dão aos usuários acesso aos dados nos arquivos.**   
Veja as instruções em[ERDDAP™e S3 Buckets](#erddap-and-aws-s3-buckets)  (acima) .
Para a amostra EDDTableFromFileNames conjunto de dados que você fez acima, se você fizer um pouco poking ao redor com o diretório e nomes de arquivo na árvore de diretório, fica claro que os nomes de diretório de nível superior (por exemplo, ABI-L1b-RadC) corresponder ao queERDDAP™chamaria conjuntos de dados separados. O balde com que você está trabalhando pode ser semelhante. Você pode então prosseguir criando conjuntos de dados separados emERDDAP™para cada um desses conjuntos de dados, usando, por exemplo,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
como o&lt;cacheDeUrl&gt;. Infelizmente, para este exemplo particular, os conjuntos de dados no balde todos parecem ser conjuntos de dados de nível 1 ou nível 2, queERDDAP™ [não é particularmente bom](#dimensions), porque o conjunto de dados é uma coleção mais complicada de variáveis que usam diferentes dimensões.
     
    
### Arquivos NcML{#ncml-files} 
Arquivos NcML permitem que você especifique mudanças on-the-fly em uma ou mais fonte originalNetCDF  (v3 ou v4)  .nc, .grib, .bufr, ou.hdf  (v4 ou v5) arquivos, e depois terERDDAP™tratar o.ncarquivos de ml como os arquivos de origem.ERDDAP™conjuntos de dados irão aceitar.ncarquivos de ml sempre.ncarquivos são esperados. Os arquivos NcML MUST ter a extensão.ncml. Ver[UnidataDocumentação NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML é útil porque você pode fazer algumas coisas com ele (por exemplo, fazendo diferentes mudanças em arquivos diferentes em uma coleção, incluindo adicionar uma dimensão com um valor específico para um arquivo) , que você não pode fazer comERDDAP'datasets.xml.

* Mudanças em um.ncO último tempo do arquivo mlModified fará com que o arquivo seja recarregado sempre que o conjunto de dados for recarregado, mas muda para o subjacente.ncarquivos de dados não serão notados diretamente.
* Dica: NcML é\\*Muito bem.\\*sensível à ordem de alguns itens no arquivo NcML. Pense em NcML como especificando uma série de instruções na ordem especificada, com a intenção de alterar os arquivos de origem (o estado no início/top do arquivo NcML) para os arquivos de destino (o estado no final / fundo do arquivo NcML) .

Uma alternativa para NcML é o[NetCDFOperadores (NCO) ](#netcdf-operators-nco). A grande diferença é que NcML é um sistema para fazer mudanças na-the-fly (para que os arquivos de origem não sejam alterados) Considerando queNCOpode ser usado para fazer alterações (ou novas versões de) os ficheiros. AmbosNCOe NcML são muito, muito flexíveis e permitem que você faça quase qualquer mudança que você pode pensar nos arquivos. Para ambos, pode ser um desafio descobrir exatamente como fazer o que você quer fazer -- Verifique a web para exemplos semelhantes. Ambos são ferramentas úteis para preparar o netCDF eHDFarquivos para uso comERDDAP, nomeadamente, para fazer mudanças além do queERDDAPO sistema de manipulação pode fazer.

Exemplo #1: Adicionando uma dimensão de tempo com um único valor
Aqui está uma.ncarquivo de ml que cria uma nova dimensão externa (tempo, com 1 valor: 1041379200) e adiciona essa dimensão à variável pic no arquivo chamado A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Exemplo #2: Alterando um Valor de Tempo Existente
Às vezes a fonte.ncarquivo já tem uma dimensão de tempo e valor de tempo, mas o valor está incorreta (para os seus propósitos) . Isto é....ncarquivo ml diz: para o arquivo de dados chamado "19810825230030-NCEI...", para a variável dimensão"time", definir as unidades atribuem a ser 'segundos desde 1970-01T00:00:00Z' e definir o valor do tempo para ser 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFOperadores (NCO)  {#netcdf-operators-nco} 
"Os operadores netCDF (NCO) compõem uma dúzia de programas autônomos, linha de comando que levam o netCDF\\[v3 ou v4\\],HDF \\[v4 ou v5\\],\\[.grib, .bufr,\\]e/ouDAParquivos como entrada, em seguida, operar (por exemplo, derivar novos dados, estatísticas de computação, impressão, hiperslab, manipular metadados) e produzir os resultados para exibir ou arquivos em formatos de texto, binário ou netCDF.NCOajudas análise de dados científicos grelhados. O estilo de shell-commandNCOpermite aos usuários manipular e analisar arquivos de forma interativa, ou com scripts expressivos que evitam alguns ambientes de programação de nível superior." (do[NCO](https://nco.sourceforge.net/)Página inicial) .

Uma alternativa aNCOé[NcML](#ncml-files). A grande diferença é que NcML é um sistema para fazer mudanças na-the-fly (para que os arquivos de origem não sejam alterados) Considerando queNCOpode ser usado para fazer alterações (ou novas versões de) os ficheiros. AmbosNCOe NcML são muito, muito flexíveis e permitem que você faça quase qualquer mudança que você pode pensar nos arquivos. Para ambos, pode ser um desafio descobrir exatamente como fazer o que você quer fazer -- Verifique a web para exemplos semelhantes. Ambos são ferramentas úteis para preparar o netCDF eHDFarquivos para uso comERDDAP, nomeadamente, para fazer mudanças além do queERDDAPO sistema de manipulação pode fazer.

Por exemplo, você pode usarNCOpara tornar as unidades da variável de tempo consistentes em um grupo de arquivos onde eles não eram consistentes originalmente. Ou, você pode usarNCOpara aplicarscale\\_factoreadd\\_offsetem um grupo de arquivos ondescale\\_factoreadd\\_offsettem valores diferentes em arquivos de origem diferentes.
 (Ou agora você pode lidar com esses problemas emERDDAP™via via via via[EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked), que é uma variante deEDDGridFromNcFiles que descompacta dados embalados e padroniza valores de tempo em um nível baixo, a fim de lidar com um arquivos de coleção que têm diferentesscale\\_factoreadd\\_offset, ou unidades de tempo diferentes.) 

NCOé Livre e Open Source Software que usa o[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)licença.

Exemplo #1: Tornando as unidades consistentes
EDDGridDos Ficheiros e Tabela EDD De Arquivos insistem que as unidades para uma determinada variável sejam idênticas em todos os arquivos. Se alguns dos arquivos são trivialmente (não funcionalmente) diferente de outros (por exemplo, unidades de tempo de
"segundos desde 1970-01-01 00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z", você pode usarNCO'[ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). para alterar as unidades em todos os arquivos para ser idêntico com
nco/ncatted -a unidades, time,o,c,'seconds since 1970-01T00:00Z' \\*.nc  
\\[Para muitos problemas como este em EDDTableDe... Arquivos conjuntos de dados, você agora pode usar[padronizar O quê?](#standardizewhat)para contarERDDAPpara padronizar os arquivos de origem como eles são lidosERDDAP.\\]
    
### Limites ao tamanho de um conjunto de dados{#limits-to-the-size-of-a-dataset} 
Você verá muitas referências a "2 bilhões" abaixo. Mais precisamente, que é uma referência a 2,147,483,647 (2 - 1 - 2 - 2 - 3 - 2 - 3 - 3 - 2 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 2 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 2 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 3 - 2 -) , que é o valor máximo de um inteiro assinado de 32 bits. Em algumas linguagens de computador, por exemploJava  (queERDDAP™está escrito em) , esse é o maior tipo de dados que pode ser usado para muitas estruturas de dados (por exemplo, o tamanho de um array) .

Para valores de string (por exemplo, para nomes variáveis, nomes de atributos, valores de atributos de caracteres e valores de dados de caracteres) , o número máximo de caracteres por cordaERDDAP™é ~ 2 bilhões. Mas em quase todos os casos, haverá pequenos ou grandes problemas se uma corda exceder um tamanho razoável (por exemplo, 80 caracteres para nomes variáveis e nomes de atributos, e 255 caracteres para a maioria dos valores de atributos e valores de dados) . Por exemplo, páginas da web que exibem nomes variáveis longos serão desconfortavelmente largos e nomes variáveis longas serão truncados se excederem o limite do tipo de arquivo de resposta.

Para conjuntos de dados gradeados:

* O número máximo deaxisVariables é ~ 2 bilhões.
O número máximo dedataVariables é ~ 2 bilhões.
Mas se um conjunto de dados tiver variáveis &gt;100, será complicado para os usuários usarem.
E se um conjunto de dados tiver 1 milhão de variáveis, seu servidor precisará de muita memória física e haverá outros problemas.
* O tamanho máximo de cada dimensão (axisVariable) é ~ 2 bilhões de valores.
* Acho que o número total máximo de células (o produto de todos os tamanhos de dimensão) é ilimitado, mas pode ser ~9e18.

Para conjuntos de dados tabulares:

* O número máximo dedataVariables é ~ 2 bilhões.
Mas se um conjunto de dados tiver variáveis &gt;100, será complicado para os usuários usarem.
E se um conjunto de dados tiver 1 milhão de variáveis, seu servidor precisará de muita memória física e haverá outros problemas.
* O número máximo de fontes (por exemplo, arquivos) que pode ser agregado é ~ 2 bilhões.
* Em alguns casos, o número máximo de linhas de uma fonte individual (por exemplo, um arquivo, mas não um banco de dados) é ~ 2 bilhões de linhas.
* Acho que não há outros limites.

Para conjuntos de dados gradeados e tabulares, existem alguns limites internos no tamanho do subconjunto que pode ser solicitado por um usuário em um único pedido (muitas vezes relacionados com &gt;2 bilhões de algo ou ~9e18 de algo) , mas é muito mais provável que um usuário atinja os limites específicos do tipo de arquivo.

*   NetCDFversão 3.ncarquivos são limitados a 2GB bytes. (Se isto é realmente um problema para alguém, avise-me: Eu poderia adicionar suporte para oNetCDFversão 3.ncExtensão de 64 bits ouNetCDFVersão 4, que aumentaria o limite significativamente, mas não infinitamente.) 
* Navegadores falham após apenas ~500MB de dados, entãoERDDAP™limita a resposta a.htmlTablesolicitações para ~400MB de dados.
* Muitos programas de análise de dados têm limites semelhantes (por exemplo, o tamanho máximo de uma dimensão é frequentemente ~2 bilhões de valores) , então não há razão para trabalhar duro para se locomover os limites específicos do tipo de arquivo.
* Os limites específicos do tipo de arquivo são úteis na medida em que impedem pedidos ingênuos para quantidades verdadeiramente enormes de dados (por exemplo, "dar-me todo este conjunto de dados" quando o conjunto de dados tem 20TB de dados) , que levaria semanas ou meses para baixar. Quanto mais tempo o download, mais provável ele falhará por uma variedade de razões.
* Os limites específicos do tipo de arquivo são úteis na medida em que forçam o usuário a lidar com subconjuntos razoavelmente grandes (por exemplo, lidar com um grande conjunto de dados gradeado através de arquivos com dados de um ponto de tempo cada) .
         
### Mudar para ACDD-1.3{#switch-to-acdd-13} 
Nós (notadamente[Gerar conjuntos de dadosXml](#generatedatasetsxml)) recomendar atualmente[Versão ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), que foi ratificado no início de 2015 e que é referido como "ACDD-1.3" no atributo Convenções globais. Antes deERDDAP™versão 1.62 (lançado em junho de 2015) ,ERDDAP™usado/recomendado o original, versão 1.0, do[NetCDFAtribua a Convenção para o Descobrimento de Dados](https://wiki.esipfed.org/ArchivalCopyOfVersion1)que foi referido como "UnidataDataset Discovery v1.0" nas Convenções globais eMetadata\\_Conventionsatributos.

Se seus conjuntos de dados usar versões anteriores do ACDD, nós RECOMENDAR que você mudar para ACDD-1.3. Não é difícil. ACDD-1.3 é altamente compatível com a versão 1.0. Para alternar, para todos os conjuntos de dados (excetoEDDGridFromErddap e EDDTable Conjuntos de dados da Erddap) :

1. Remover o global recém-despregadoMetadata\\_Conventionsatributo adicionando (ou alterando o existenteMetadata\\_Conventionsatributos)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
para o conjunto de dados global&lt;addAttributes&gt;
     
2. Se o conjunto de dados tem um atributo Convenções no global&lt;addAttributes&gt;, mudar tudo "UnidataDataset Discovery v1.0" faz referência a "ACDD-1.3".
Se o conjunto de dados não tiver um atributo Conventions no global&lt;addAttributes&gt;, então adicione um que se refere a ACDD-1.3. Por exemplo,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Se o conjunto de dados tem um globalstandard\\_name\\_vocabularyatributo, altere o formato do valor para, por exemplo,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Se a referência for a uma versão mais antiga do[Tabela de nomes padrão CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). é provavelmente uma boa ideia mudar para a versão atual (65, como escrevemos isto) , uma vez que novos nomes padrão são adicionados a essa tabela com versões subseqüentes, mas os nomes padrão antigos raramente são depreciados e nunca removidos.
     
4. Embora ACDD-1.0 incluiu atributos globais paracreator\\_name,creator\\_email,creator\\_url,[Gerar conjuntos de dadosXml](#generatedatasetsxml)não os adicionou automaticamente até algum momento em tornoERDDAP™V1.50. Esta é uma informação importante:
        
    *   creator\\_namepermite aos usuários saber/citar o criador do conjunto de dados.
    *   creator\\_emailinforma aos usuários o endereço de e-mail preferido para entrar em contato com o criador do conjunto de dados, por exemplo, se eles têm perguntas sobre o conjunto de dados.
    *   creator\\_urldá aos usuários uma maneira de descobrir mais sobre o criador.
    *   ERDDAP™usa todas essas informações ao gerar documentos de metadados FGDC e ISO 19115-2/19139 para cada conjunto de dados. Esses documentos são frequentemente usados por serviços de busca externos.
    
Adicione esses atributos ao conjunto de dados global&lt;addAttributes&gt;
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
É isso. Espero que não tenha sido muito difícil.
     
### Zarr{#zarr} 
Como versão 2.25ERDDAP™pode ler local Arquivos de Zarr usando[EDDTable De NcFiles](#eddtablefromncfiles)e[EDDGridA partir de NcFiles](#eddgridfromncfiles).

 (A partir de agosto 2019) Podemos facilmente estar errados, mas ainda não estamos convencidos de que[Zarr](https://github.com/zarr-developers/zarr-python), ou sistemas semelhantes que quebram arquivos de dados em pedaços menores, são grandes soluções para o problema deERDDAP™ler dados armazenados em serviços de nuvem como Amazon AWS S3. Zarr é uma grande tecnologia que mostrou sua utilidade em uma variedade de situações, não temos certeza de queERDDAP+S3 será uma dessas situações. Principalmente estamos dizendo: antes de nos apressarmos para fazer o esforço para armazenar todos os nossos dados em Zarr, vamos fazer alguns testes para ver se é realmente uma solução melhor.

Os problemas com o acesso aos dados na nuvem são latência (o lag para primeiro obter dados) e acesso de nível de arquivo (em vez de acesso ao nível do bloco) . Zarr resolve o problema de acesso de nível de arquivo, mas não faz nada sobre latência. Comparado a apenas baixar o arquivo (para que possa ser lido como um arquivo local com acesso de nível de bloco) , Zarr pode até exacerbar o problema de latência porque, com Zarr, ler um arquivo agora envolve uma série de várias chamadas para ler diferentes partes do arquivo (cada um com seu próprio lag) . O problema de latência pode ser resolvido paralelamente às solicitações, mas essa é uma solução de nível superior, não dependente de Zarr.

E com Zarr (como com bases de dados relacionais) , perdemos a conveniência de ter um arquivo de dados ser um arquivo simples, único que você pode facilmente verificar a integridade de, ou fazer / baixar uma cópia de.

ERDDAP™  (a partir de v2) tem um sistema para manter uma cache local de arquivos de uma fonte de URL (por exemplo, S3) (veja [&lt;cacheDeUrl&gt; e&lt;cacheMaxGB&gt;] (#cachefromurl) ). E o novo [&lt;NThreads&gt;] (#nthreads) deve minimizar o problema de latência, paralelando a recuperação de dados em um alto nível.&lt;cacheDeUrl&gt; parece funcionar muito bem para muitos cenários. (Não temos certeza de quão benéfico&lt;nThreads&gt; é sem mais testes.) Admitimos que não fizemos testes de tempo em uma instância AWS com uma boa conexão de rede, mas testamos com sucesso com várias fontes de URL remotas de arquivos. EERDDAP'&lt;cacheFromUrl&gt; funciona com qualquer tipo de arquivo de dados (por exemplo,.nc,.hdf, .csv,.jsonlCSV) , mesmo que externamente comprimido (por exemplo,.gz) , sem quaisquer alterações nos arquivos (por exemplo, reescrevendo-os como coleções de Zarr) .

É provável que diferentes cenários favorecerão diferentes soluções, por exemplo, só precisam ler parte de um arquivo uma vez (Zarr vai ganhar) , vs. precisa ler todo um arquivo uma vez, vs. precisa ler parte ou todo um arquivo repetidamente (&lt;cacheFromUrl&gt; vai ganhar).

Principalmente estamos dizendo: antes de nos apressarmos para fazer o esforço para armazenar todos os nossos dados em Zarr, vamos fazer alguns testes para ver se é realmente uma solução melhor.

- - Não.
## Lista de conjuntos de dados de tipos{#list-of-types-datasets} 
Se você precisar de ajuda para escolher o tipo de conjunto de dados certo, consulte[Escolhendo o Tipo de Conjunto de Dados](#choosing-the-dataset-type).

Os tipos de conjuntos de dados caem em duas categorias. ([Porquê?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)datasets lidar com dados gradeados.
    * EmEDDGridconjuntos de dados, variáveis de dados são arrays multidimensionais de dados.
    * Deve haver uma variável de eixo para cada dimensão. As variáveis de eixo devem ser especificadas na ordem em que as variáveis de dados as usam.
    * EmEDDGriddatasets, todas as variáveis de dados (Compartilhar) todas as variáveis do eixo.
         ([Porquê?](#why-just-two-basic-data-structures) [E se não o fizerem?](#dimensions)) 
    * Valores de dimensão classificados - Em tudoEDDGridconjuntos de dados, cada dimensão deve estar em ordem ordenada (Ascendente ou descendente) . Cada um pode ser espaçado irregularmente. Não pode haver laços. Esta é uma exigência do[Padrão de metadados CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se os valores de qualquer dimensão não estiverem em ordem ordenada, o conjunto de dados não será carregado eERDDAP™identificará o primeiro valor não ousado no arquivo de log, *Diretriz de grande porte* /logs/log.txt .
        
Algumas subclasses têm restrições adicionais (nomeadamente,EDDGridAggregateExistingDimension exige que a dimensão externa (esquerda, primeira) seja ascendente.
        
Valores de dimensão não variados quase sempre indicam um problema com o conjunto de dados de origem. Isso ocorre mais comumente quando um arquivo mal nomeado ou inadequado está incluído na agregação, o que leva a uma dimensão de tempo não autorizada. Para resolver este problema, veja a mensagem de erro noERDDAP™arquivo log.txt para encontrar o valor de tempo ofensivo. Em seguida, procure nos arquivos de origem para encontrar o arquivo correspondente (ou um antes ou um após) Isso não pertence à agregação.
        
    * Veja a descrição mais completa do[EDDGridmodelo de dados](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * OEDDGridtipos de conjuntos de dados são:
        *   [EDDGridA partir deAudioFiles](#eddfromaudiofiles)agrega dados de um grupo de arquivos de áudio locais.
        *   [EDDGridA partir de](#eddgridfromdap)lida com dados gradeados deDAPservidores.
        *   [EDDGridTabela DED](#eddgridfromeddtable)permite converter um conjunto de dados tabular em um conjunto de dados gradeado.
        *   [EDDGridDe Erddap](#eddfromerddap)lida com dados gradeados de um remotoERDDAP.
        *   [EDDGridDe Etopo](#eddgridfrometopo)apenas lida com os dados de topografia ETOPO incorporados.
        *   [EDDGridDos quartos](#eddgridfromfiles)é a superclasse de todosEDDGridDe aulas.
        *   [EDDGridA partir deMergeIRFiles](#eddgridfrommergeirfiles)agrega dados de um grupo de MergeIR local.gzarquivos.
        *   [EDDGridA partir de NcFiles](#eddgridfromncfiles)agrega dados de um grupo de locaisNetCDF  (v3 ou v4)  .nce arquivos relacionados.
        *   [EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked)é uma variante seEDDGridFromNcFiles que também agrega dados de um grupo localNetCDF  (v3 ou v4)  .nce arquivos relacionados, queERDDAP™desempacotar a um nível baixo.
        *   [EDDGridLonPM180](#eddgridlonpm180)modifica os valores de longitude de uma criançaEDDGridde modo que eles estão no intervalo -180 a 180.
        *   [EDDGridLon0360](#eddgridlon0360)modifica os valores de longitude de uma criançaEDDGridde modo que eles estão no intervalo 0 a 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)agrega dois ou maisEDDGridconjuntos de dados lado a lado.
        *   [EDDGridDimensão existente agregada](#eddgridaggregateexistingdimension)agrega dois ou maisEDDGridconjuntos de dados, cada um dos quais tem uma gama diferente de valores para a primeira dimensão, mas valores idênticos para as outras dimensões.
        *   [EDDGridEntendido.](#eddgridcopy)pode fazer uma cópia local de outroEDDGrid's dados e serve dados da cópia local.
             
    * TudoEDDGriddatasets suportam uma configuração nThreads, que dizERDDAP™quantos threads usar ao responder a uma solicitação. Ver[NTreads](#nthreads)documentação para detalhes.
         
### Tabela de EDD{#eddtable} 
*   [ **Tabela de EDD** ](#eddtable)datasets lidar com dados tabulares.
    * Os dados tabulares podem ser representados como uma tabela de banco de dados com linhas e colunas. Cada coluna (uma variável de dados) tem um nome, um conjunto de atributos e armazena apenas um tipo de dados. Cada linha tem uma observação (ou grupo de valores relacionados) . A fonte de dados pode ter os dados em uma estrutura de dados diferente, uma estrutura de dados mais complicada e / ou vários arquivos de dados, masERDDAP™precisa ser capaz de achatar os dados de origem em uma tabela semelhante a banco de dados, a fim de apresentar os dados como um conjunto de dados tabular aos usuários deERDDAP.
    * Veja a descrição mais completa do[Modelo de dados EDDTable](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * Os tipos de conjuntos de dados da EDDTable são:
        *   [EDDTableDe todos os conjuntos de dados](#eddtablefromalldatasets)é um conjunto de dados de nível superior que tem informações sobre todos os outros conjuntos de dados em seuERDDAP.
        *   [EDDTable FromAsciiFiles](#eddtablefromasciifiles)agrega dados de vírgula, tab-, ponto-, ou arquivos de dados tabulares ASCII separados por espaço.
        *   [EDDTable De AsciiService](#eddtablefromasciiservice)é a superclasse de todas as classes EDDTableFromAsciiService....
        *   [EDDTable De ASciiServiceNOS](#eddtablefromasciiservicenos)lida com dados de alguns dosNOAANOS serviços web.
        *   [EDDTable FromAudioFiles](#eddfromaudiofiles)agrega dados de um grupo de arquivos de áudio locais.
        *   [Tabela de EDD TolsXmlFiles](#eddtablefromawsxmlfiles)agrega dados de um conjunto de Estação de Tempo Automático (AWS) Arquivos XML.
        *   [EDDTable FromCasandra](#eddtablefromcassandra)lida com dados tabulares de uma tabela Cassandra.
        *   [EDDTable FromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)agrega dados de arquivos de dados ASCII tabular com colunas de dados de largura fixa.
        *   [EDDTable FromDapSequence](#eddtablefromdapsequence)lida com dados tabulares deDAPservidores de sequência.
        *   [EDDTable FromDatabase](#eddtablefromdatabase)lida com dados tabulares de uma tabela de banco de dados.
        *   [Tabela de EDDEDDGrid](#eddtablefromeddgrid)permite criar um conjunto de dados EDDTable a partir de umEDDGridconjunto de dados.
        *   [EDDTable FromErddap](#eddfromerddap)lida com dados tabulares de um remotoERDDAP.
        *   [EDDTable De Nomes de Arquivo](#eddtablefromfilenames)cria um conjunto de dados a partir de informações sobre um grupo de arquivos no sistema de arquivos do servidor, mas não serve dados dentro dos arquivos.
        *   [Tabela EDD dos arquivos](#eddtablefromfiles)é a superclasse de todas as classes EDDTableDe...Files.
        *   [EDDTable FromHttpGet](#eddtablefromhttpget)éERDDAPO único sistema de importação de dados, bem como a exportação de dados.
        *   [Tabela de EDDHyraxArquivos](#eddtablefromhyraxfiles)  (DEPRIEDADE) agrega dados de arquivos com várias variáveis com dimensões compartilhadas servidas por uma[Hyrax OPeNDAPservidor](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTable De InvalidCRAFiles](#eddtablefrominvalidcrafiles)agrega dados deNetCDF  (v3 ou v4)  .ncarquivos que usam um específico, inválido, variante do CF DSG Contiguous Ragged Array (CRA) arquivos. EmboraERDDAP™suporta este tipo de arquivo, é um tipo de arquivo inválido que ninguém deve começar a usar. Grupos que atualmente usam este tipo de arquivo são fortemente encorajados a usarERDDAP™para gerar arquivos CF DSG CRA válidos e parar de usar esses arquivos.
        *   [EDDTable FromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)agrega dados de[JSON Linhas arquivos CSV](https://jsonlines.org/examples/).
        *   [EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)agrega dados deNetCDF  (v3 ou v4)  .ncarquivos com várias variáveis com dimensões compartilhadas.
        *   [EDDTable De NcFiles](#eddtablefromncfiles)agrega dados deNetCDF  (v3 ou v4)  .ncarquivos com várias variáveis com dimensões compartilhadas. É bom continuar usando este tipo de conjunto de dados para conjuntos de dados existentes, mas para novos conjuntos de dados recomendamos usar EDDTableFromMultidimNcFiles em vez disso.
        *   [EDDTable FromNcCFFiles](#eddtablefromnccffiles)agrega dados deNetCDF  (v3 ou v4)  .ncarquivos que usam um dos formatos de arquivo especificados pelo[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenções. Mas para arquivos usando uma das variantes multidimensionais CF DSG, use[EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)Em vez disso.
        *   [EDDTable De NccsvFiles](#eddtablefromnccsvfiles)agrega dados de[NCCSV](/docs/user/nccsv-1.00)Arquivos ASCII .csv.
        *   [EDDTable FromNOS](#eddtablefromnos)  (DEPRIEDADE) lida com dados tabulares de servidores XML NOS.
        *   [EDDTable FromOBIS](#eddtablefromobis)lida com dados tabulares de servidores OBIS.
        *   [EDDTable FromParquetFiles](#eddtablefromparquetfiles)lida com dados de[Parquete](https://parquet.apache.org/).
        *   [Tabela de EDDSOS](#eddtablefromsos)lida com dados tabulares deSOSservidores.
        *   [EDDTable FromThreddsFiles](#eddtablefromthreddsfiles)  (DEPRIEDADE) agrega dados de arquivos com várias variáveis com dimensões compartilhadas servidas por uma[TERCEIROSOPeNDAPservidor](https://www.unidata.ucar.edu/software/tds/).
        *   [Tabela de EDDWFSArquivos](#eddtablefromwfsfiles)  (DEPRIEDADE) faz uma cópia local de todos os dados de umaArcGISMapaServerWFSservidor para que os dados possam então ser re-servados rapidamente paraERDDAP™usuários.
        *   [EDDTable agregados](#eddtableaggregaterows)pode fazer um conjunto de dados EDDTable de um grupo de conjuntos de dados EDDTable.
        *   [EDDTableCopy](#eddtablecopy)pode fazer uma cópia local de muitos tipos de conjuntos de dados EDDTable e, em seguida, reserve os dados rapidamente a partir da cópia local.

  
- - Não.

## Descrições detalhadas de tipos de conjuntos de dados{#detailed-descriptions-of-dataset-types} 

### EDDGridA partir de{#eddgridfromdap} 
[ **EDDGridA partir de** ](#eddgridfromdap)manipula variáveis de grade de[DAP](https://www.opendap.org/)servidores.

* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode coletar as informações que você precisa para ajustar isso ou criar seu próprio XML para umEDDGridDataset FromDap analisando os arquivos DDS e DAS do conjunto de dados de origem no seu navegador (adicionando .das e .dds aosourceUrlPor exemplo,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFromDap pode obter dados de qualquer variável multidimensional de umaDAPservidor de dados. (Anteriormente...EDDGridFromDap foi limitado a variáveis designadas como "grid", mas isso não é mais um requisito.)   
     
* Valores de dimensão classificados - Os valores para cada dimensão devem estar em ordem ordenada (Ascendente ou descendente) . Os valores podem ser espaçados de forma irregular. Não pode haver laços. Esta é uma exigência do[Padrão de metadados CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se os valores de qualquer dimensão não estiverem em ordem ordenada, o conjunto de dados não será carregado eERDDAP™identificará o primeiro valor não ousado no arquivo de log, *Diretriz de grande porte* /logs/log.txt .
    
Valores de dimensão não variados quase sempre indicam um problema com o conjunto de dados de origem. Isso ocorre mais comumente quando um arquivo mal nomeado ou inadequado está incluído na agregação, o que leva a uma dimensão de tempo não autorizada. Para resolver este problema, veja a mensagem de erro noERDDAP™arquivo log.txt para encontrar o valor de tempo ofensivo. Em seguida, procure nos arquivos de origem para encontrar o arquivo correspondente (ou um antes ou um após) Isso não pertence à agregação.
    
#### EDDGridDo esqueleto de DNA XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridTabela DED{#eddgridfromeddtable} 
[ **EDDGridTabela DED** ](#eddgridfromeddtable)permite converter um conjunto de dados tabulares EDDTable em umEDDGridconjunto de dados gradeados. Lembre-se queERDDAP™trata conjuntos de dados como[conjuntos de dados gradeados (subclasses deEDDGrid) ou conjuntos de dados tabulares (subclasses de EDDTable) ](#why-just-two-basic-data-structures).

* Normalmente, se você tiver dados em grade, você apenas configurou umEDDGridconjunto de dados diretamente. Às vezes isso não é possível, por exemplo, quando você tem os dados armazenados em um banco de dados relacional queERDDAP™só pode acessar via EDDTableFromDatabase.EDDGridA classe FromEDDTable permite remediar essa situação.
     
* Obviamente, os dados no conjunto de dados EDDTable subjacente devem ser (basicamente) dados gradeados, mas em uma forma tabular. Por exemplo, o conjunto de dados EDDTable pode ter dados CTD: medições de corrente para leste e para o norte, em várias profundidades, em várias vezes. Uma vez que as profundidades são as mesmas em cada ponto do tempo,EDDGridA FromEDDTable pode criar um conjunto de dados em grade com um tempo e uma dimensão de profundidade que acessa os dados através do conjunto de dados EDDTable subjacente.
     
* Gerar conjuntos de dados Xml... Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode reunir as informações que você precisa para melhorar o rascunho áspero.
     
* Fonte Atributos -- Tal como acontece com todos os outros tipos de conjuntos de dados,EDDGridFromTable tem a ideia de que existem fontes globaisAttributes e[global globaladdAttributes](#global-attributes)  (especificado emdatasets.xml) , que são combinados para fazer a combinação global Atributos, que são o que os usuários vêem. Para fontes globaisAttributes,EDDGridA FromEDDTable usa a combinação global Atributos do conjunto de dados EDDTable subjacente. (Se pensares nisso por um minuto, faz sentido.) 
    
Da mesma forma, para cadaaxisVariable'dataVariable'[addAttributes](#addattributes),EDDGridFromEDDTable usa a variável combinada Atributos do conjunto de dados EDDTable subjacente comoEDDGridFonte da variávelEDDTableAttributes. (Se pensares nisso por um minuto, faz sentido.) 
    
Como consequência, se a Tabela EDD tiver bons metadados, oEDDGridFromEDDTable muitas vezes precisa muito poucoaddAttributesmetadados - apenas alguns ajustes aqui e ali.
    
*   dataVariable- Sim.axisVariables... A tabela EDD subjacente tem apenasdataVariableS. UmEDDGridDataset da TabelaEDD terá algunsaxisVariableS (criado a partir de alguns dos EDDTabledataVariableS) e algunsdataVariableS (criada a partir da tabela EDD restantedataVariableS) .[Gerar conjuntos de dadosXml](#generatedatasetsxml)fará um palpite sobre o qual EDDTabledataVariabledeve tornar-seEDDGridTabela DEDaxisVariables, mas é apenas um palpite. Você precisa modificar a saída de GerarDatasetsXml para especificar qualdataVariablese tornaráaxisVariables, e em que ordem.
     
* eixoValues -- Não há nada sobre o EDDTable subjacente para contarEDDGridFromEDDTable os valores possíveis doaxisVariables na versão gradeada do conjunto de dados, então você deve fornecer essas informações para cadaaxisVariableatravés de um desses atributos:
    
    * eixoValues -- permite especificar uma lista de valores. Por exemplo,
        &lt;Nome do att="axisValues"[Tipo="doubleList"](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;/att&gt;
Note o uso de um[tipo de dados](#data-types)mais a lista de palavras. Além disso, o tipo de lista (por exemplo, duplo) , DEVE corresponder aos dados Tipo da variável na tabela EDD eEDDGridConjuntos de dados da TabelaEDD.
    * eixoValuesStartStrideStop -- permite especificar uma sequência de valores regularmente espaçados especificando os valores de início, passada e parada. Aqui está um exemplo que é equivalente ao eixoValues exemplo acima:
        &lt;Nome do anúncio:[Tipo="doubleList"](#attributetype)\\&gt;2, 0.5, 4&lt;/att&gt;
Novamente, note o uso de um tipo de dados de lista. Além disso, o tipo de lista (por exemplo, duplo) , DEVE corresponder aos dados Tipo da variável na tabela EDD eEDDGridConjuntos de dados da TabelaEDD.
         
    
Atualizações... Assim como não há comoEDDGridFromEDDTable para determinar o eixoValues da tabela EDD inicialmente, não há também nenhuma maneira confiável paraEDDGridFromEDDTable para determinar a partir da tabela EDD quando o eixoValues mudou (notavelmente, quando há novos valores para a variável de tempo) . Atualmente, a única solução é mudar o atributo eixoValues emdatasets.xmle recarregar o conjunto de dados. Por exemplo, você pode escrever um script para
    
    1. Pesquisardatasets.xmlpara
        datasetID= *o conjunto de dadosID* "
assim você está trabalhando com o conjunto de dados correto.
    2. Pesquisardatasets.xmlpara a próxima ocorrência de
        <sourceName> *o viáveissourceName* </sourceName>  
então você está trabalhando com a variável correta.
    3. Pesquisardatasets.xmlpara a próxima ocorrência de
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
para que você saiba a posição inicial da tag.
    4. Pesquisardatasets.xmlpara a próxima ocorrência de
```
        </att>  
```
para que você conheça a posição final dos valores do eixo.
    5. Substitua o antigo início, passo, pare os valores com os novos valores.
    6. Contactar[URL da bandeira](/docs/server-admin/additional-information#set-dataset-flag)para o conjunto de dados para contarERDDAP™para recarregar o conjunto de dados.
    
Isto não é ideal, mas funciona.
     
* precisão -- QuandoEDDGridFromEDDTable responde ao pedido de dados de um usuário, ele move uma linha de dados da tabela de resposta EDDTable para aEDDGridgrade de resposta. Para fazer isso, ele tem que descobrir se os valores "axis" em uma determinada linha na tabela correspondem a alguma combinação de valores de eixo na grade. Para tipos de dados inteiros, é fácil determinar se dois valores são iguais. Mas para carros e dobras, isso traz o problema horrível de números de ponto flutuante[não combinando exatamente](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (por exemplo, 0,2 versus 0,199999999999996) . Para (tentar tentar) Trata disto.EDDGridFromTable permite especificar um atributo de precisão para qualquer um dosaxisVariables, que especifica o número total de dígitos decimais que devem ser idênticos.
    * Por exemplo,&lt;att name="precision" type="int"&gt;5&lt;/att&gt;
    * Para diferentes tipos de variáveis de dados, existem diferentes valores de precisão padrão. Os padrões são geralmente apropriados. Se eles não forem, você precisa especificar valores diferentes.
    * ParaaxisVariableque são[tempo ou tempo Variáveis do carimbo](#timestamp-variables), o padrão é de precisão completa (uma correspondência exata) .
    * ParaaxisVariables que são flutuadores, a precisão padrão é 5.
    * ParaaxisVariables que são duplos, a precisão padrão é 9.
    * ParaaxisVariables que têm tipos de dados inteiros,EDDGridFromEDDTable ignora o atributo de precisão e sempre usa a precisão completa (uma correspondência exata) .
         
    *    **ATENÇÃO&#33;** Ao fazer a conversão de um pedaço de dados tabular em um pedaço de dados gradeados, seEDDGridFromEDDTable não pode corresponder a um valor EDDTable "axis" a um dos esperadosEDDGridValores do eixo da TabelaEDD,EDDGridFromEDDTable silenciosamente (sem erro) desperdiça os dados dessa linha da tabela. Por exemplo, pode haver outros dados (não na grade) no conjunto de dados EDDTable. (E se esticar &gt; 1, não é óbvio paraEDDGridDe Tabela quais valores de eixo são valores desejados e quais são os que devem ser ignorados por causa do passo.) Então, se os valores de precisão são muito altos, o usuário verá valores ausentes na resposta de dados quando os valores de dados válidos realmente existem.
        
Por outro lado, se os valores de precisão são definidos muito baixos, os valores "axis" da EDDTable que não devem corresponderEDDGridValores do eixo da TabelaDED (erroneamente) Combinado.
        
Esses problemas potenciais são horríveis, porque o usuário obtém os dados errados (ou valores ausentes) quando eles devem obter os dados certos (ou pelo menos uma mensagem de erro) .
Isto não é uma falhaEDDGridDa Tabela.EDDGridFromTable não pode resolver este problema. O problema é inerente à conversão de dados tabulares em dados gradeados (a menos que outras suposições possam ser feitas, mas não podem ser feitas aqui) .
Cabe a você, oERDDAP™administrador, para **teste seuEDDGridDa Tabela DED cuidadosamente** para garantir que os valores de precisão sejam definidos para evitar esses problemas potenciais.
        
#### lacunas{#gapthreshold} 
*   [lacunas](#gapthreshold)- ... Este é um tipo muito incomum de conjunto de dados. Desde os tipos de consultas que podem ser feitas (manuseado por) umEDDGridconjunto de dados (relacionados com as gamas e eixos doaxisVariableS) são muito diferentes dos tipos de consultas que podem ser feitas (manuseado por) um conjunto de dados EDDTable (apenas relacionado às gamas de algumas variáveis) , o desempenho deEDDGridOs conjuntos de dados da FromEDDTable variam muito dependendo da solicitação exata que é feita e da velocidade do conjunto de dados EDDTable subjacente. Para pedidos que tenham um valor de passo &gt; 1,EDDGridFromEDDTable pode pedir a tabela EDD subjacente para um pedaço relativamente grande de dados (como se estivéssemos) e, em seguida, peneirar os resultados, mantendo os dados de algumas linhas e desperdiçando os dados de outros. Se ele tiver que peneirar através de muitos dados para obter os dados que ele precisa, a solicitação levará mais tempo para preencher.
    
SeEDDGridFromEDDTable pode dizer que haverá grandes lacunas (com linhas de dados indesejados) entre as linhas com dados desejados,EDDGridA FromEDDTable pode optar por fazer vários sub-requisitos para a EDDTable subjacente em vez de um grande pedido, ignorando assim as linhas indesejadas de dados nas grandes lacunas. A sensibilidade para esta decisão é controlada pelo gapThreshold valor como especificado no&lt;gapThreshold&gt; tag (default=1000 linhas de dados de origem) . Definir lacunaAtenção de um número menor levará ao conjunto de dados (em geral) mais sub-requisitos. Definir lacunaAtenção de um número maior levará ao conjunto de dados (em geral) menos sub-requisitos.
    
Se gapThreshold é definido muito pequeno,EDDGridA FromEDDTable operará mais lentamente porque a sobrecarga de várias solicitações será maior do que o tempo salvo, obtendo alguns dados em excesso. Se o gapThreshold estiver muito grande,EDDGridA FromEDDTable operará mais lentamente porque tanto excesso de dados será recuperado da EDDTable, apenas para ser descartado. (Como Goldilocks descobriu, o meio é "apenas certo".) A sobrecarga para diferentes tipos de conjuntos de dados EDDTable varia muito, então a única maneira de saber a melhor configuração real para o seu conjunto de dados é através de experimentação. Mas você não vai ficar muito errado aderindo ao padrão.
    
Um exemplo simples é: Imagine umEDDGridDa Tabela com apenas umaxisVariable  (tempo, com um tamanho de 100000) UmdataVariable  (temperatura) , e a lacuna padrãoThreshold de 1000.
    
    * Se um usuário solicitar temperatura\\[0&#58;100&#58;5000\\], o passo é 100 assim o tamanho da lacuna é 99, o que é menos do que o gapThreshold. Então...EDDGridA FromTable fará apenas um pedido à EDDTable para todos os dados necessários para a solicitação (equivalente à temperatura\\[0:5000\\]) e jogar fora todas as linhas de dados que não precisa.
    * Se um usuário solicitar temperatura\\[0:2500:5000\\], esse passo é 2500 assim o tamanho da lacuna é 2499, que é maior do que o gapThreshold. Então...EDDGridA FromTable fará solicitações separadas à EDDTable que são equivalentes à temperatura\\[0\\], temperatura\\[2500\\], temperatura\\[5000.\\].
    
A cálculo do tamanho da lacuna é mais complicada quando há vários eixos.
    
Para cada solicitação de usuário,EDDGridFromEDDTable imprime mensagens diagnósticas relacionadas a isso no[- Não.](/docs/server-admin/additional-information#log)ficheiro.
    
    * Se...&lt;logLevel&gt; (#loglevel) emdatasets.xmlestá definido para info, isto imprime uma mensagem como
\\* nOuterAxes=1 de 4 nOuterRequests=22
Se nOuterAxes=0, gapThreshold não foi excedido e apenas um pedido será feito para EDDTable.
Se nOuterAxes&gt;0, gapThreshold foi excedido e nOuterRequests será feita para EDDTable, correspondente a cada combinação solicitada do nOuterAxes mais esquerdo. Por exemplo, se o conjunto de dados tiver 4axisVariableedataVariablecomo a oriente\\[Tempo\\]\\[latitude\\]\\[longitude\\]\\[profundidade\\], o mais esquerdo (Primeiro) variável eixo é tempo.
    * Se&lt;logLevel&gt; emdatasets.xmlé definido para todos, informações adicionais são escritas para o arquivo log.txt.
         
#### EDDGridEsquema de tabelas XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDDERDDAP {#eddfromerddap} 
 **EDDGridDe Erddap** lida com dados gradeados de um remotoERDDAP™servidor.
 **EDDTable FromErddap** lida com dados tabulares de um remotoERDDAP™servidor.

*   EDDGridFromErddap e EDDTableFromErddap se comportam de forma diferente de todos os outros tipos de conjuntos de dados emERDDAP.
    * Como outros tipos de conjuntos de dados, esses conjuntos de dados obtêm informações sobre o conjunto de dados da fonte e mantê-lo na memória.
    * Como outros tipos de conjuntos de dados, quandoERDDAP™pesquisas para conjuntos de dados, exibe o formulário de acesso de dados ( *datasetID* .html) , ou exibe o formulário Make A Graph ( *datasetID* .) ,ERDDAP™usa a informação sobre o conjunto de dados que está na memória.
    *   EDDGridFromErddap e EDDTable FromErddap são a base para[grades/clusters/federações](/docs/server-admin/scaling)deERDDAPs, que eficientemente distribuir o uso da CPU (principalmente para fazer mapas) , uso de memória, armazenamento de dataset e uso de largura de banda de um grande data center.
#### Redirecionar{#redirect} 
* Ao contrário de outros tipos de conjuntos de dados, quandoERDDAP™recebe um pedido de dados ou imagens desses conjuntos de dados,ERDDAP [redirecionamentos](https://en.wikipedia.org/wiki/URL_redirection)o pedido ao remotoERDDAP™servidor. O resultado é:
    * Isto é muito eficiente. (CPU, memória e largura de banda) , porque de outra forma
        1. O compostoERDDAP™tem que enviar o pedido para o outroERDDAP™  (que leva tempo) .
        2. O outroERDDAP™tem que obter os dados, reformatar e transmitir os dados para o compostoERDDAP.
        3. O compostoERDDAP™tem de receber os dados (usando largura de banda) , reformatar (usando CPU e memória) , e transmitir os dados ao usuário (usando largura de banda) . Redirecionando o pedido e permitindo o outroERDDAP™para enviar a resposta diretamente ao usuário, o compostoERDDAP™gasta essencialmente nenhum tempo de CPU, memória ou largura de banda no pedido.
    * O redirecionamento é transparente para o usuário, independentemente do software cliente (um navegador ou qualquer outro software ou ferramenta de linha de comando) .
*   [Você pode dizerERDDAP™](#redirect)não redirecionar quaisquer solicitações de usuário, definindo&lt;redirecionar&gt;false&lt;/redirect&gt;, mas isso nega a maioria das vantagens do tipo de conjunto de dados... FromErddap (notavelmente, dispersando a carga na extremidade dianteiraERDDAP™para o remoto / backendERDDAP) .
         
     
#### Subscrições{#subscriptions} 
Normalmente, quando umEDDGridFromErddap e EDDTable De Erddap são (re) carregado em seuERDDAP, eles tentam adicionar uma assinatura ao conjunto de dados remoto através do remotoERDDAPSistema de assinatura por e-mail/URL. Assim, sempre que o conjunto de dados remoto muda, o remotoERDDAP™contactos[conjunto de dados URL da bandeira](/docs/server-admin/additional-information#set-dataset-flag)em seuERDDAP™de modo que o conjunto de dados local é recarregado ASAP e de modo que o conjunto de dados local está sempre perfeitamente atualizado e imita o conjunto de dados remoto. Então, a primeira vez que isso acontece, você deve obter um e-mail solicitando que você valide a assinatura. No entanto, se o localERDDAP™não pode enviar um e-mail ou se o remotoERDDAP's sistema de assinatura de e-mail/URL não está ativo, você deve enviar e-mail para o remotoERDDAP™administrador e solicitar que ele/ela adicione manualmente [&lt;em Mudança&gt; (#onchange #) ...&lt;/onChange&gt; tags para todos os conjuntos de dados relevantes para chamar o seu conjunto de dados[conjunto de dados URLs de bandeira](/docs/server-admin/additional-information#set-dataset-flag). Veja o seuERDDAP™relatório diário para uma lista de setDataset Bandeira URLs, mas basta enviar os paraEDDGridFromErddap e EDDTableDe conjuntos de dados Erddap para o remotoERDDAP™Administrador.
    
Isto não está a funcionar? Seus conjuntos de dados locais não estão em sincronia com os conjuntos de dados remotos?
Várias coisas devem funcionar corretamente para que este sistema funcione para que seus conjuntos de dados permaneçam atualizados. Verifique cada uma dessas coisas em ordem:
    
    1. Tu ésERDDAP™deve ser capaz de enviar e-mails. Consulte as configurações de e-mail em seu setup.xml.
    2. Em geral (mas nem sempre) , seuERDDAP'&lt;baseUrl&gt; e&lt;baseHttpsUrl&gt; não tem um número de porta (por exemplo, :8080, :8443) . Se o fizerem, usem um[proxy](/docs/server-admin/deploy-install#proxypass)para remover a porta do Url.
    3. Em seu setup.xml,&lt;assinaToRemoteErddapDataset&gt; deve ser definido como verdadeiro.
    4. Quando o seu EDD local... O conjunto de dados do FromErddap é recarregado, ele deve enviar uma solicitação para o remotoERDDAP™para se inscrever no conjunto de dados remoto. Olhe em log.txt para ver se isto está acontecendo.
    5. Você deve obter um e-mail pedindo-lhe para validar o pedido de assinatura.
    6. Você deve clicar no link nesse e-mail para validar o pedido de assinatura.
    7. O controle remotoERDDAP™deve dizer que a validação foi bem sucedida. A qualquer momento, você pode solicitar um e-mail do remotoERDDAP™com uma lista de suas assinaturas pendentes e válidas. Ver o formulário *Sistema de segurança Url.* /erddap/subscriptions/list.html .
    8. Quando o conjunto de dados remoto muda (por exemplo, obtém dados adicionais) , o remotoERDDAP™deve tentar entrar em contato com o flagURL em seuERDDAP. Você não pode verificar isso, mas você pode perguntar ao administrador do remotoERDDAP™para verificar isto.
    9. Tu ésERDDAP™deve receber um pedido para definir esse flagURL. Olhe em seu log.txt para "setDatasetFlag.txt?" pedido (S) e veja se há uma mensagem de erro associada aos pedidos.
    10. Tu ésERDDAP™deve então tentar recarregar esse conjunto de dados (talvez não imediatamente, mas ASAP) .
         
#### Máximo actualizado (Tempo) ?{#up-to-date-maxtime} 
EDDGrid/TableFromErddap datasets só muda suas informações armazenadas sobre cada conjunto de dados de origem quando o conjunto de dados de origem é["recarregar"](#reloadeverynminutes)e algumas mudanças de metadados (por exemplo, a variável de tempoactual\\_range) , gerando assim uma notificação de assinatura. Se o conjunto de dados de origem tiver dados que mudam frequentemente (por exemplo, novos dados a cada segundo) e usa o["update"](#updateeverynmillis)sistema para notar mudanças freqüentes nos dados subjacentes, oEDDGrid/TableFromErddap não será notificado sobre essas mudanças frequentes até que o próximo conjunto de dados "recarregar", de modo que oEDDGrid/TableFromErddap não estará perfeitamente atualizado. Você pode minimizar esse problema alterando o conjunto de dados de origem&lt;reloadEveryNMinutes&gt; para um valor menor (60? 15?) para que haja mais notificações de assinatura para dizer oEDDGrid/TableFromErddap para atualizar suas informações sobre o conjunto de dados de origem.

Ou, se o seu sistema de gerenciamento de dados souber quando o conjunto de dados de origem tem novos dados (por exemplo, através de um script que copia um arquivo de dados no lugar) , e se isso não é super frequente (por exemplo, a cada 5 minutos, ou menos frequentes) Há uma solução melhor:

1. Não use&lt;updateEveryNMillis&gt; para manter o conjunto de dados de origem atualizado.
2. Defina o conjunto de dados de origem&lt;reloadEveryNMinutes&gt; para um número maior (1440?) .
3. Tenha o script em contato com o conjunto de dados de origem[URL da bandeira](/docs/server-admin/additional-information#set-dataset-flag)logo após ele copia um novo arquivo de dados no lugar.
     

Isso levará ao conjunto de dados de origem perfeitamente atualizado e fará com que ele gere uma notificação de assinatura, que será enviada para aEDDGrid/TableFromErddap conjunto de dados. Isso vai liderar oEDDGrid/TableFromErddap dataset para estar perfeitamente atualizado (bem, dentro de 5 segundos de novos dados sendo adicionados) . E tudo o que será feito de forma eficiente (sem recargas de dados desnecessários) .
     
#### Não.addAttributes,axisVariableoudataVariable {#no-addattributes-axisvariable-or-datavariable} 
Ao contrário de outros tipos de conjuntos de dados, EDDTableFromErddap eEDDGridOs conjuntos de dados do FromErddap não permitem que o global&lt;addAttributes&gt;,&lt;axisVariable&gt; ou&lt;dataVariable&gt; seções nodatasets.xmlpara esse conjunto de dados. O problema é que permitir que aqueles levariam a inconsistências:
    
1. Digamos que foi permitido e você adicionou um novo atributo global.
2. Quando um usuário pergunta a vocêERDDAP™para os atributos globais, o novo atributo aparecerá.
3. Mas quando um usuário pergunta a vocêERDDAP™para um arquivo de dados, seuERDDAP™redireciona o pedido para a fonteERDDAP. Isso.ERDDAP™é inconsciente do novo atributo. Então, se ele criar um arquivo de dados com metadados, por exemplo, um.ncarquivo, os metadados não terão o novo atributo.

Há duas soluções:

1. Convencer o administrador da fonteERDDAP™para fazer as mudanças que você deseja aos metadados.
2. Em vez de EDDTableFromErddap, use[EDDTable FromDapSequence](#eddtablefromdapsequence). Ou em vez deEDDGridFromErddap, use[EDDGridA partir de](#eddgridfromdap). Esses tipos EDD permitem que você se conecte eficientemente a um conjunto de dados em um remotoERDDAP™  (mas sem redirecionar solicitações de dados) e eles permitem que você inclua global&lt;addAttributes&gt;,&lt;axisVariable&gt; ou&lt;dataVariable&gt; seções nodatasets.xml. Uma outra diferença: você precisará se inscrever manualmente no conjunto de dados remoto, de modo que o conjunto de dados em seuERDDAP™será notificado (através do[URL da bandeira](/docs/server-admin/additional-information#set-dataset-flag)) quando houver alterações no conjunto de dados remoto. Assim, você está criando um novo conjunto de dados, em vez de vincular a um conjunto de dados remoto.
         
#### Outras notas{#other-notes} 
* Por razões de segurança,EDDGridFromErddap e EDDTable De Erddap não apoiar o [&lt;acessível para&gt; (Acessível a) tag e não pode ser usado com conjuntos de dados remotos que exigem login (porque eles usam [&lt;acessível para&gt; (Acessível a) ). VerERDDAP'[sistema de segurança](/docs/server-admin/additional-information#security)para restringir o acesso a alguns conjuntos de dados a alguns usuários.
     
* Começar comERDDAP™v2.10,EDDGridFromErddap e EDDTableFromErddap apoiar o [&lt;acessívelViaFiles&gt;] (#acessível através de arquivos) tag. Ao contrário de outros tipos de conjuntos de dados, o padrão é verdadeiro, mas os arquivos do conjunto de dados serão acessíveis apenas se o conjunto de dados de origem também tiver&lt;acessívelViaFiles&gt; definido como true.
     
* Você pode usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer odatasets.xmlchunk para este tipo de conjunto de dados. Mas você pode fazer esses tipos de conjuntos de dados facilmente à mão.
     
#### EDDGridesqueleto de Erddap XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridesqueleto de Erddap O conjunto de dados XML é muito simples, porque a intenção é apenas imitar o conjunto de dados remoto que já é adequado para uso emERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTable FromErddap esqueleto XML{#eddtablefromerddap-skeleton-xml} 
* O esqueleto XML para um conjunto de dados EDDTableFromErddap é muito simples, porque a intenção é apenas imitar o conjunto de dados remoto, que já é adequado para uso emERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridDe Etopo{#eddgridfrometopo} 
[ **EDDGridDe Etopo** ](#eddgridfrometopo)apenas serve o[ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Superfície do gelo, grade registrada, binária, 2byte int: etopo1\\_ice\\_g\\_i2.zip) que é distribuído comERDDAP.

* Apenas dois.datasetIDs são suportados paraEDDGridFromEtopo, para que você possa acessar os dados com valores de longitude -180 a 180, ou valores de longitude 0 a 360.
* Nunca há sub tags, uma vez que os dados já estão descritos dentroERDDAP.
* Então as duas opções paraEDDGridOs conjuntos de dados do FromEtopo são (literalmente) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridDos quartos{#eddgridfromfiles} 
[ **EDDGridDos quartos** ](#eddgridfromfiles)é a superclasse de todosEDDGridDe aulas. Não podes usarEDDGridDos Ficheiros directamente. Em vez disso, use uma subclasse deEDDGridFromFiles para lidar com o tipo de arquivo específico:

*   [EDDGridA partir deMergeIRFiles](#eddgridfrommergeirfiles)lida com dados de grade[Mergeir.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)arquivos.
*   [EDDGridA partir deAudioFiles](#eddfromaudiofiles)agrega dados de um grupo de arquivos de áudio locais.
*   [EDDGridA partir de NcFiles](#eddgridfromncfiles)lida com dados de grade[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)arquivos,[HDF  (v4 ou v5)  .hdf](https://www.hdfgroup.org/)arquivos,[.ncml](#ncml-files)arquivos, e[NetCDF  (v3 ou v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)arquivos. Isso pode funcionar com outros tipos de arquivo (por exemplo, BUFR) , nós apenas não testamos - por favor envie-nos alguns arquivos de amostra se você estiver interessado.
*   [EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked)é uma variante deEDDGridFromNcFiles que lida com dados de gradeadoNetCDF  (v3 ou v4)  .nce arquivos relacionados, queERDDAP™desempacotar a um nível baixo.

Atualmente, nenhum outro tipo de arquivo é suportado. Mas geralmente é relativamente fácil adicionar suporte para outros tipos de arquivo. Contacte-nos se tiver um pedido. Ou, se seus dados estão em um formato de arquivo antigo que você gostaria de se afastar, recomendamos converter os arquivos para serNetCDFv3.ncarquivos.NetCDFé um formato binário amplamente suportado, permite acesso aleatório rápido aos dados, e já é suportado porERDDAP.

#### De Detalhes de Arquivos{#from-files-details} 
As seguintes informações aplicam-se a todas as subclasses deEDDGridDos Ficheiros.

##### Agregação de uma dimensão existente{#aggregation-of-an-existing-dimension} 
Todas as variações deEDDGridFromFiles pode agregar dados de arquivos locais, onde cada arquivo tem 1 (ou mais) valores diferentes para a esquerda (Primeiro) dimensão, geralmente\\[Tempo\\], que será agregado. Por exemplo, as dimensões podem ser\\[Tempo\\]\\[altitude\\]\\[latitude\\]\\[longitude\\], e os arquivos podem ter os dados para um (ou alguns) valor de tempo (S) por arquivo. O conjunto de dados resultante aparece como se todos os dados do arquivo tivessem sido combinados. As grandes vantagens da agregação são:

* O tamanho do conjunto de dados agregado pode ser muito maior do que um único arquivo pode ser convenientemente (~2GB) .
* Para dados quase em tempo real, é fácil adicionar um novo arquivo com o mais recente pedaço de dados. Você não precisa reescrever todo o conjunto de dados.

Os requisitos para agregação são:
* Os arquivos locais não precisam ter o mesmodataVariableS (como definido no conjunto de dadosdatasets.xml) . O conjunto de dados terádataVariables definido emdatasets.xml. Se um determinado arquivo não tiver um dadodataVariable,ERDDAP™adicionará valores ausentes conforme necessário.
* Todos osdataVariables DEVE usar o mesmoaxisVariables/dimensão (como definido no conjunto de dadosdatasets.xml) . Os arquivos serão agregados com base no primeiro (mais à esquerda) dimensão, ordenado em ordem ascendente.
* Cada arquivo MAY tem dados para um ou mais valores da primeira dimensão, mas não pode haver nenhuma sobreposição entre arquivos. Se um arquivo tem mais de um valor para a primeira dimensão, os valores devem ser classificados em ordem ascendente, sem laços.
* Todos os arquivos DEVE ter exatamente os mesmos valores para todas as outras dimensões. A precisão dos testes é determinada por[Jogos de Vestir](#matchaxisndigits).
* Todos os arquivos DEVE ter exatamente o mesmo[unidades](#units)metadados para todosaxisVariableedataVariableS. Se este é um problema, você pode ser capaz de usar[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)para corrigir o problema.
         
##### Agregação através de nomes de arquivo ou metadados globais{#aggregation-via-file-names-or-global-metadata} 
Todas as variações deEDDGridFromFiles também pode agregar um grupo de arquivos adicionando um novo leftmost (Primeiro) dimensão, geralmente tempo, com base em um valor derivado de cada nome de arquivo ou do valor de um atributo global que está em cada arquivo. Por exemplo, o nome do arquivo pode incluir o valor do tempo para os dados no arquivo.ERDDAP™então criaria uma nova dimensão do tempo.

Ao contrário do recurso semelhante em THREDDS,ERDDAP™sempre cria umaxisVariablecom valores numéricos (conforme exigido por CF) , nunca Valores de caracteres (que não são permitidos por CF) . Também,ERDDAP™irá classificar os arquivos na agregação com base no numéricoaxisVariablevalor que é atribuído a cada arquivo, de modo que a variável eixo sempre terá valores ordenados conforme exigido por CF. A abordagem THREDDS de fazer um tipo lexicográfico baseado nos nomes de arquivos leva a agregações onde os valores do eixo não são classificados (que não é permitido por CF) quando o nome do arquivo é diferente do derivadoaxisVariablevalores.

Criar uma dessas agregaçãosERDDAP™, você vai definir uma nova esquerda (Primeiro)  [axisVariable](#axisvariable)com um especial, pseudo&lt;sourceName&gt;, que dizERDDAP™onde e como encontrar o valor para a nova dimensão de cada arquivo.

* O formato para o pseudosourceNameque recebe o valor de um nome de arquivo (apenas nome de arquivo.ext) é
    \\*\\*\\ *fileName,* [dados Tipo](#data-types) *,* Extrato *,* capturaGrupoNumber*
* O formato para o pseudosourceNameque recebe o valor do nome do caminho absoluto de um arquivo é
    \\*\\*\\ *pathName,* [dados Tipo](#data-types) *,* Extrato *,* capturaGrupoNumber*
    \\[Para isso, o nome do caminho sempre usa'/'como o personagem separador de diretório, nunca '\'.\\]
* O formato para o pseudosourceNameque obtém o valor de um atributo global é
    \\*\\*\\ *global:* atributos Nome *,* [dados Tipo](#data-types) *,* Extrato *,* capturaGrupoNumber*
* Este pseudosourceNameopção funciona de forma diferente dos outros: em vez de criar uma nova esquerda (Primeiro)  axisVariable, isto substitui o valor da correnteaxisVariablecom um valor extraído do nome do arquivo (apenas nome de arquivo.ext) . O formato é
    \\*\\*\\ *substituir De FileName,* [dados Tipo](#data-types) *,* Extrato *,* capturaGrupoNumber*
     

As descrições das peças que você precisa fornecer são:

*    *atributos Nome* -- o nome do atributo global que está em cada arquivo e que contém o valor da dimensão.
*    *dados Tipo* - ... Isso especifica o tipo de dados que será usado para armazenar os valores. Veja a lista padrão de[dados Tipos](#data-types)queERDDAP™suportes, exceto que String não é permitido aqui desde variáveis de eixo emERDDAP™não pode ser variáveis de corda.
    
Há um pseudo dataType adicional, timeFormat= *string TimeFormat* , que dizERDDAP™que o valor é um String timeStamp[unidades adequadas para tempos de cadeia](#string-time-units). Na maioria dos casos, o stringTimeFormat que você precisa será uma variação de um desses formatos:
    
    *   yyyy-MM-dd«T'HH:mm:ss.SSSZ -- que ISO 8601:2004 (E) formato de data time. Você pode precisar de uma versão encurtada disto, por exemplo,yyyy-MM-dd'T'HH: mm: ss ouyyyy-MM-dd.
    * yyyyyMMddHHmmss.SSS -- que é a versão compacta do formato de hora de data ISO 8601. Você pode precisar de uma versão encurtada disto, por exemplo, yyyyyMMddHHmmss ou yyyyyMMdd.
    * M/d/yyyyyy H:mm:ss.SSS -- que é o formato de data slash dos EUA. Você pode precisar de uma versão encurtada deste, por exemplo, M/d/yyyyy .
    * yyyyDDDHHmmssSSS - que é o ano mais o dia acolchoado zero do ano (por exemplo, 001 = 1 de janeiro de 365 = 31 de dezembro em um ano não-leap; isso é às vezes erroneamente chamado de data Juliana) . Você pode precisar de uma versão encurtada deste, por exemplo, yyyyyDDD .
    
Se você usar esse pseudo dataType, adicione isso à nova variável&lt;addAttributes&gt;
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Se você quiser mudar todos os valores de tempo, mude o valor do tempo em unidades, por exemplo,
1970-01T12:00Z.
*    *Extrato* - ... Este é o[expressão regular](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) que inclui um grupo de captura (em parênteses) que descreve como extrair o valor do nome do arquivo ou do valor do atributo global. Por exemplo, dado um nome de arquivo como S19980011998031.L3b\\_MO\\_CHL.nc, grupo de captura #1, "\\dtutorial", na expressão regular S (\\dtutorial) \\dtutorial\\.L3b.\\* irá capturar os primeiros 7 dígitos após 'S': 1998001.
*    *capturaGrupoNumber* - ... Este é o número do grupo de captura (dentro de um par de par) na expressão regular que contém a informação de interesse. É geralmente 1, o primeiro grupo de captura. Às vezes você precisa usar grupos de captura para outros fins no regex, então o número importante do grupo de captura será 2 (o segundo grupo de captura) ou 3 (o terceiro) , etc.

Um exemplo completo de umaxisVariableque faz um conjunto de dados agregado com um novo eixo de tempo que recebe os valores de tempo do nome do arquivo de cada arquivo é
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Quando você usa os dados pseudo "timeFormat=" Tipo,ERDDAP™adicionará 2 atributos aoaxisVariablepara que pareçam vir da fonte:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Neste caso,ERDDAP™criará um novo eixo nomeado"time"com valores duplos (segundos desde 1970-01-01T00:00:00Z) extraindo os 7 dígitos após 'S' e antes ".L3m" no nome do arquivo e interpretando aqueles como valores de tempo formatados como yyyyDDD.

Você pode substituir o tempo de base padrão (1970-01T00:00:00) adicionando um[Adicionar ao cesto](#addattributes)que especifica um atributo diferente de unidades com um tempo de base diferente. Uma situação comum é: há grupos de arquivos de dados, cada um com um composto de 1 dia de um conjunto de dados de satélite, onde você quer que o valor do tempo seja meio-dia do dia mencionado no nome do arquivo (o tempo centralizado de cada dia) e quer a variávellong\\_namepara ser "Centered Time". Um exemplo que faz isso é:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Nota horas=12 no tempo de base, que adiciona 12 horas em relação ao tempo de base original de 1970-01T00:00Z.

Um exemplo completo de umaxisVariableque faz um conjunto de dados agregado com um novo eixo "run" (com valores int) que obtém os valores de execução do atributo global "runID" em cada arquivo (com valores como "r17\\_global", onde 17 é o número de execução) é
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Observe o uso do grupo de captura número 2 para capturar os dígitos que ocorrem após 'r' ou 's', e antes "\\_global". Este exemplo também mostra como adicionar atributos adicionais (por exemplo,ioos\\_categorye unidades) para a variável eixo.
     
#### Arquivos compactados externamente{#externally-compressed-files} 
* Datasets que são subconjuntos deEDDGridDos Ficheiros e Tabela EDD O FromFiles pode servir dados diretamente de arquivos de dados compactados externamente, incluindo.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, e arquivos .Z.
     
*    **Isso funciona surpreendentemente bem&#33;**   
Na maioria dos casos, a desaceleração relacionada à descompressão de arquivos de dados pequenos e médios é menor. Se você precisa economizar espaço em disco, recomendamos fortemente usar este recurso, especialmente para arquivos mais antigos que raramente são acessados.
     
*    **Poupe dinheiro&#33;**   
Esta é uma das poucas característicasERDDAP™que lhe oferece uma chance de economizar muito dinheiro (embora com o custo de desempenho ligeiramente reduzido) . Se a razão de compressão é, por exemplo, 6:1 (às vezes será muito maior) , então os arquivos de dados do conjunto de dados só precisarão de 1/6 o espaço de disco. Então, talvez você pode começar com 1 RAID (de um determinado tamanho) em vez de 6 RAIDS (do mesmo tamanho) . Isso é uma enorme economia de custos. Esperemos que a capacidade de comprimir alguns arquivos em uma coleção (os mais velhos?) e não comprimir outros (os mais novos?) , e para mudar isso a qualquer momento, vamos minimizar a desvantagem para comprimir alguns dos arquivos (acesso mais lento) . E se a escolha é entre armazenar os arquivos na fita (e só acessível mediante pedido, após um atraso) vs armazená-los comprimido em um RAID (e acessível viaERDDAP) , então há uma enorme vantagem de usar compressão para que os usuários sejam interativos e (relativamente) acesso rápido aos dados. E se isso pode salvá-lo de comprar um RAID adicional, este recurso pode salvá-lo sobre $30,000.
     
* Para todosEDDGridFromFiles subclasses, se os arquivos de dados têm uma extensão indicando que eles são arquivos compactados externamente (Atualmente:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, ou .Z) ,ERDDAP™irá decomprimir os arquivos para o diretório de cache do conjunto de dados quando lê-los (se eles já não estiverem em cache) . O mesmo é verdadeiro para o arquivo binário (por exemplo,.nc) subclasses de EDDTableFromFiles.
     
* Para EDDTableFromFiles subclasses para arquivos não binários (por exemplo, .csv) , arquivos de dados com uma extensão indicando que eles são arquivos compactados externamente serão descomprimidos on-the-fly como o arquivo é lido.
     
* REQUISIÇÃO: Se o tipo de arquivo compactado externamente usado (por exemplo,.tgzou.zip) suporta mais de 1 arquivo dentro do arquivo compactado, o arquivo compactado deve conter apenas 1 arquivo.
     
* REQUISIÇÃO: Este recurso assume que o conteúdo dos arquivos compactados externamente não muda, de modo que um arquivo descomprimido em cache pode ser reutilizado. Se alguns ou todos os arquivos de dados de um conjunto de dados forem alterados, não comprima esses arquivos. Isso é consistente com o uso comum, uma vez que as pessoas normalmente não comprimir arquivos que às vezes precisam mudar.
     
*   &lt;fileNameRegex&gt; Para fazer isso funcionar, o conjunto de dados&lt;fileNameRegex&gt; deve corresponder aos nomes dos arquivos compactados. Obviamente, regexes como .\\*corresponderá a todos os nomes de arquivos. Se você especificar um tipo de arquivo específico, por exemplo, .\\*\\\.nc, então você precisa modificar o regex para incluir a extensão de compressão também, por exemplo, .\\ *\\\.nc\\\.gz(se todos os arquivos serão* Alguma coisa?.nc.gzarquivos) .
     
* É bom se seu conjunto de dados inclui uma mistura de arquivos compactados e não compactados. Isso pode ser útil se você acredita que alguns arquivos (por exemplo, arquivos mais antigos) será usado menos frequentemente e, portanto, seria útil para economizar espaço em disco comprimindo-os. Para fazer isto funcionar, o&lt;fileNameRegex&gt; deve corresponder aos nomes dos arquivos compactados e não compactados, por exemplo, .\\*ou .\\*\\\.nc (|\\\.gz) (onde o grupo de captura no final disso especifica que.gzé opcional.
     
* É bom se você comprimir ou descomprimir arquivos específicos na coleção a qualquer momento.
Se o conjunto de dados não usar [&lt;updateEveryNMillis&gt;] (#updateeverynmillis #) , definir o conjunto de dados[bandeira](/docs/server-admin/additional-information#flag)para contarERDDAP™para recarregar o conjunto de dados e assim notar as alterações. Curiosamente, você pode usar diferentes algoritmos de compressão e configurações para arquivos diferentes no mesmo conjunto de dados (por exemplo,.bz2para arquivos raramente usados,.gzpara arquivos não frequentemente usados, e nenhuma compressão para arquivos usados com freqüência) , apenas certifique-se de que o regex suporta todas as extensões de arquivo que estão em uso, por exemplo, .\\*\\\.nc (|\\\.gz|\\\.bz2) .
     
* Naturalmente, as razões de compressão e as velocidades para os diferentes algoritmos de compressão variam com o arquivo de origem e as configurações (por exemplo, nível de compressão) . Se você quiser otimizar este sistema para seus arquivos, faça um teste dos diferentes métodos de compressão com seus arquivos e com uma variedade de configurações de compressão. Se você quiser um confiável bom (não necessariamente o melhor) configuração, vamos ligeiramente recomendargzip  (.gz) .gzipnão faz o menor arquivo compactado (é razoavelmente perto) , mas compreende o arquivo muito rapidamente e (mais importante paraERDDAP™usuários) decomprime o arquivo muito rapidamente. Além disso,gzipsoftware vem padrão com cada instalação Linux e Mac OS e está prontamente disponível para Windows através de ferramentas gratuitas como 7Zip e Linux add-ons como Git Bash. Por exemplo, para comprimir um arquivo de origem no.gzversão do arquivo (mesmo nome de arquivo, mas com.gzapêndice) , uso (em Linux, Mac OS e Git Bash)   
    gzip  *sourceName*   
Para decomprimir um.gzarquivo de volta para o original, use
Armazém *sourceName.gz*   
Para comprimir cada um dos arquivos de origem no diretório e seus subdiretórios, recursivamente, use
    gzip- O quê? *DirectorName*   
Descomprimir cada um dos.gzarquivos em diretório e seus subdiretórios, recursivamente, use
Armazém -r *DirectorName*   
     
* Não comprima externamente (gzip) arquivos que já estão internamente compactados&#33;
Muitos arquivos já têm dados compactados internamente. Se vocêgzipesses arquivos, os arquivos resultantes não serão muito menores (&lt;5%) eERDDAP™desperdiçará tempo descomprimindo-os quando precisar lê-los. Por exemplo:
    
    * arquivos de dados: por exemplo,.nc4,.hdf5 arquivos: Alguns arquivos usam compressão interna; alguns não. Como dizer: as variáveis compactadas têm atributos "\\_ChunkSize". Além disso, se um grupo de gradeados.ncou.hdfarquivos são todos os tamanhos diferentes, eles provavelmente internamente comprimido. Se eles são todos do mesmo tamanho, eles não são internamente comprimidos.
    * arquivos de imagem: por exemplo, .gif, .jpg, e .png
    * arquivos de áudio: por exemplo, .mp3 e .ogg.
    * arquivos de vídeo: por exemplo, .mp4, .ogv e .webm.
    
        
Um caso estranho infeliz: arquivos de áudio .wav são enormes e não internamente compactados. Seria bom comprimir (gzip) eles, mas geralmente você não deve porque se você fizer, os usuários não serão capazes de reproduzir os arquivos compactados em seu navegador.
     
* Caso de teste: compressão (comgzip) um conjunto de dados com 1523 gradeado.ncarquivos.
    
    * Os dados nos arquivos de origem foram esparsos (muitos valores perdidos) .
    * O espaço total do disco foi de 57 GB antes da compressão para 7 GB depois.
    * Um pedido de muitos dados a partir de 1 ponto de hora é&lt;1 s antes e depois da compressão.
    * Um pedido para 1 ponto de dados para 365 pontos de tempo (a pior situação caso) foi de 4 s a 71 s.
         
    
Para mim que é um trade-off razoável para qualquer conjunto de dados, e certamente para conjuntos de dados que são raramente usados.
     
* Compressão interna versus externa --
Comparado com a compressão interna do arquivo oferecido por.nc4 e.hdf5 arquivos,ERDDAP's abordagem para arquivos binários compactados externamente tem vantagens e desvantagens. A desvantagem é: por uma vez lido de uma pequena parte de um arquivo, compressão interna é melhor porqueEDDGridFromFiles só precisa descomprimir alguns pedaços (S) do arquivo, não todo o arquivo. Mas...ERDDAPA abordagem tem algumas vantagens:
    
    *   ERDDAP™suporta compressão de todos os tipos de arquivos de dados (binário e não binário, por exemplo,.nc3 e .csv) não apenas.nc4 e.hdf4.
    * Se a maior parte de um arquivo precisa ser lido mais de uma vez em um curto período de tempo, então economiza tempo para descomprimir o arquivo uma vez e lê-lo muitas vezes. Isto acontece emERDDAP™quando um usuário usa Make-A-Graph para o conjunto de dados e faz uma série de pequenas mudanças no gráfico.
    * A capacidade de ter arquivos compactados e não arquivos compactados na mesma coleção, permite que você controle mais sobre quais arquivos são compactados e que não são. E este controle adicionado vem sem realmente modificar o arquivo de origem (já que você pode comprimir um arquivo com, por exemplo,.gze, em seguida, descomprimir-o para obter o arquivo original) .
    * A capacidade de mudar a qualquer momento se um determinado arquivo é comprimido e como é comprimido (diferentes algoritmos e configurações) dá-lhe mais controle sobre o desempenho do sistema. E você pode facilmente recuperar o arquivo não comprimido original a qualquer momento.
    
Embora nenhuma abordagem seja um vencedor em todas as situações, é claro queERDDAP's capacidade de servir dados de arquivos compactados externamente faz compressão externa uma alternativa razoável para a compressão interna oferecida por.nc4 e.hdf5. Isso é significativo dado que a compressão interna é uma das principais razões pelas quais as pessoas escolhem usar.nc4 e.hdf5.
     
##### Cache descomprimido{#decompressed-cache} 
ERDDAP™faz uma versão descomprimida de qualquer binário comprimido (por exemplo,.nc) arquivo de dados quando ele precisa ler o arquivo. Os arquivos descomprimidos são mantidos no diretório do conjunto de dados dentro *Diretriz de grande porte* /decomprimido / . Arquivos descomprimidos que não foram usados recentemente serão excluídos para liberar espaço quando o tamanho do arquivo cumulativo é &gt;10GB. Você pode mudar isso configurando&lt;descomprimidoCacheMaxGB&gt; (padrão=10) em conjuntos de dados Xml.xml, por exemplo,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Além disso, os arquivos descomprimidos que não foram usados nos últimos 15 minutos serão excluídos no início de cada grande recarga de conjunto de dados. Você pode mudar isso configurando&lt;descompactadoCacheMaxMinutesOld&gt; (default=15) em conjuntos de dados Xml.xml, por exemplo,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Números maiores são agradáveis, mas o tamanho cumulativo dos arquivos descomprimidos pode causar *Diretriz de grande porte* para ficar sem espaço em disco, o que causa problemas graves.
     
* Porque descomprimir um arquivo pode levar uma quantidade significativa de tempo (0,1 a 10 segundos) , conjuntos de dados com arquivos compactados podem se beneficiar de definir o conjunto de dados [&lt;NThreads&gt;] (#nthreads) definição para um número maior (2? 3? 4?) . As desvantagens para números ainda maiores (Por exemplo, 5? 6? 7?) estão diminuindo os retornos e o pedido de um usuário pode então usar uma alta porcentagem dos recursos do sistema, diminuindo significativamente o processamento dos pedidos de outro usuário. Assim, não há nenhuma configuração nThreads ideal, apenas consequências diferentes em situações diferentes com configurações diferentes.
         
#### Valores de dimensão classificados{#sorted-dimension-values} 
Os valores para cada dimensão devem estar em ordem ordenada (ascendendo ou descendo, exceto para o primeiro (mais à esquerda) dimensão que deve ser crescente) . Os valores podem ser espaçados de forma irregular. Não pode haver laços. Esta é uma exigência do[Padrão de metadados CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se os valores de qualquer dimensão não estiverem em ordem ordenada, o conjunto de dados não será carregado eERDDAP™identificará o primeiro valor não ousado no arquivo de log, *Diretriz de grande porte* /logs/log.txt .
    
Valores de dimensão não variados quase sempre indicam um problema com o conjunto de dados de origem. Isso ocorre mais comumente quando um arquivo mal nomeado ou inadequado está incluído na agregação, o que leva a uma dimensão de tempo não autorizada. Para resolver este problema, veja a mensagem de erro noERDDAP™arquivo log.txt para encontrar o valor de tempo ofensivo. Em seguida, procure nos arquivos de origem para encontrar o arquivo correspondente (ou um antes ou um após) Isso não pertence à agregação.
    
#### Directoria{#directories} 
Os arquivos MAY estar em um diretório, ou em um diretório e seus subdiretórios (recorrentemente) . Se houver um grande número de arquivos (por exemplo, &gt;1,000) , o sistema operacional (e assimEDDGridDos quartos) irá operar muito mais eficientemente se você armazenar os arquivos em uma série de subdiretórios (um por ano, ou um por mês para conjuntos de dados com arquivos muito frequentes) , para que nunca haja um grande número de arquivos em um determinado diretório.
     
#### &lt;cacheDe Url&gt;{#cachefromurl} 
TudoEDDGridFromFiles e todos os conjuntos de dados EDDTableFromFiles suportam um conjunto de tags que contamERDDAP™para baixar e manter uma cópia de todos os arquivos de um conjunto de dados remoto, ou um cache de alguns arquivos (baixado conforme necessário) . Isto pode ser incrivelmente útil. Ver[cache Documentação de Url](#cachefromurl).
    
#### Diretórios remotos e solicitações de intervalo HTTP{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range Requests, Accept-RangeshttpCabeçalho)   
EDDGridDe NcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, e ETableDDFromNcCFFiles, pode *às vezes* servir dados de.ncarquivos em servidores remotos e acessados via HTTP se o servidor suporta[Servir Byte](https://en.wikipedia.org/wiki/Byte_serving)através de solicitações de intervalo HTTP (o mecanismo HTTP para byte servindo) . Isso é possível porque netcdf-java (queERDDAP™usos para ler.ncarquivos) suporta a leitura de dados de remoto.ncarquivos através de solicitações de intervalo HTTP.

 **Não faças isso&#33;** É horrivelmente ineficiente e lento.
Em vez disso, use o [&lt;cacheDeUrl&gt; sistema] (#cachefromurl) .

AcessoERDDAP™datasets como arquivos através de solicitações de intervalo byte --
Virando isto por aí, dado que você pode (em teoria) pensar em um conjunto de dados emERDDAP™como um gigante.ncarquivo por anexar ".nc" à base OPenDAPURL para um determinado conjunto de dados (por exemplo, https://myserver.org/erddap/griddap/datasetID.nc e também adicionando um ?query depois disso para especificar um subset) , é talvez razoável perguntar se você pode usar netcdf-java,Ferret, ou algum outroNetCDFsoftware cliente para ler dados via Pedidos de Intervalo HTTPERDDAP. A resposta é não, porque não há realmente um enorme ".nc" ficheiro. Se você quiser fazer isso, em vez de fazer uma dessas opções:

* Uso(OPeN)DAPsoftware cliente para se conectar aos serviços de griddap oferecidos porERDDAP. Isso é o queDAP  (e assimERDDAP) foi projetado para. É muito eficiente.
* Ou, baixe o arquivo de origem (S) do"files"sistema (ou um arquivo subconjunto através de um.nc? consulta) para o seu computador e usar netcdf-java,Ferret, ou algum outroNetCDFsoftware cliente para ler o (Agora) arquivo local (S) .
         
#### InformaÃ§Ãμes de arquivo Cached{#cached-file-information} 
Quando umEDDGridO conjunto de dados do FromFiles é primeiro carregado,EDDGridFromFiles lê informações de todos os arquivos relevantes e cria tabelas (uma linha para cada arquivo) com informações sobre cada arquivo válido e cada "mau" (diferente ou inválido) ficheiro.
* As tabelas também são armazenadas no disco, comoNetCDFv3.ncarquivos em *Diretriz de grande porte* /dataset/ *último2CharsOfDatasetID* / *datasetID* / em arquivos nomeados:
tabela de dados.nc  (que contém uma lista de nomes de diretório únicos) ,
arquivo Quadro.nc  (que contém a tabela com as informações de cada arquivo válido) ,
Arquivos ruins.nc  (que segura a tabela com as informações de cada arquivo ruim) .
* Para acelerar o acesso a umEDDGridConjunto de dados de Ficheiros (mas à custa de usar mais memória) , você pode usar
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
para contarERDDAP™para manter uma cópia das tabelas de informações do arquivo na memória.
* A cópia das tabelas de informações do arquivo no disco também é útil quandoERDDAP™é desligado e reiniciado: salvaEDDGridFromFiles de ter que reler todos os arquivos de dados.
* Quando um conjunto de dados é recarregado,ERDDAP™só precisa ler os dados em novos arquivos e arquivos que mudaram.
* Se um arquivo tem uma estrutura diferente dos outros arquivos (por exemplo, um tipo de dados diferente para uma das variáveis, ou um valor diferente para o "[unidades](#units)"Atributo) ,ERDDAPadiciona o arquivo à lista de arquivos "bad". InformaÃ§Ãμes sobre o problema com o arquivo serÃ¡ escrito para o *Diretriz de grande porte* /logs/log.txt arquivo.
* Você nunca deve precisar excluir ou trabalhar com esses arquivos. Uma exceção é: se você ainda está fazendo alterações em um conjunto de dadosdatasets.xmlconfiguração, você pode querer excluir esses arquivos para forçarERDDAP™para reler todos os arquivos desde que os arquivos serão lidos / interpretados de forma diferente. Se você precisar excluir esses arquivos, você pode fazê-lo quandoERDDAP™está a correr. (Em seguida, definir um[bandeira](/docs/server-admin/additional-information#set-dataset-flag)para recarregar o conjunto de dados ASAP.) No entanto,ERDDAP™geralmente percebe que odatasets.xmlinformações não correspondem ao arquivo InformaÃ§Ãμes da tabela e exclui as tabelas de arquivos automaticamente.
* Se você quiser encorajarERDDAP™para atualizar as informações do conjunto de dados armazenados (por exemplo, se você acabou de adicionar, remover ou alterar alguns arquivos no diretório de dados do conjunto de dados) , use o[sistema de bandeira](/docs/server-admin/additional-information#flag)à forçaERDDAP™para atualizar as informações de arquivo em cache.
         
#### Pedidos de manuseio{#handling-requests} 
Quando a solicitação de um cliente para dados for processada,EDDGridO FromFiles pode olhar rapidamente na tabela com as informações de arquivo válidas para ver quais arquivos têm os dados solicitados.
     
#### Atualizando as informações do arquivo Cached{#updating-the-cached-file-information} 
Sempre que o conjunto de dados é recarregado, as informações de arquivo em cache são atualizadas.
    
* O conjunto de dados é recarregado periodicamente conforme determinado pelo&lt;reloadEveryNMinutes&gt; nas informações do conjunto de dadosdatasets.xml.
* O conjunto de dados é recarregado o mais rápido possível sempreERDDAP™detecta que você adicionou, removido,[Tocava](https://en.wikipedia.org/wiki/Touch_(Unix)) (para alterar o último arquivo Tempo modificado) , ou mudou um arquivo de dados.
* O conjunto de dados é recarregado o mais rápido possível se você usar o[sistema de bandeira](/docs/server-admin/additional-information#flag).

Quando o conjunto de dados é recarregado,ERDDAP™compara os arquivos disponíveis atualmente às tabelas de informações de arquivo em cache. Novos arquivos são lidos e adicionados à tabela de arquivos válidos. Os arquivos que já não existem são retirados da tabela de arquivos válidos. Os arquivos onde o timestamp do arquivo mudou são lidos e suas informações são atualizadas. As novas tabelas substituem as mesas antigas na memória e no disco.
     
#### Arquivos ruins{#bad-files} 
A tabela de arquivos ruins e as razões que os arquivos foram declarados ruins (arquivo corrompido, variáveis ausentes, etc.) é enviado para o e-mail Tudo Para endereço de e-mail (Provavelmente.) sempre que o conjunto de dados é recarregado. Você deve substituir ou reparar esses arquivos o mais rápido possível.
     
#### Variáveis em falta{#missing-variables} 
Se alguns dos arquivos não têm alguns dosdataVariables definido no conjunto de dadosdatasets.xmlChuck, não faz mal. QuandoEDDGridFromFiles lê um desses arquivos, ele atuará como se o arquivo tivesse a variável, mas com todos os valores ausentes.
     
#### Problemas de FTP / Conselhos{#ftp-troubleadvice} 
Se você FTP novos arquivos de dados para oERDDAP™servidor enquantoERDDAP™está correndo, há a chance de queERDDAP™será recarregar o conjunto de dados durante o processo FTP. Acontece mais frequentemente do que você pode pensar&#33; Se acontecer, o arquivo parecerá válido (tem um nome válido) , mas o arquivo ainda não é válido. SeERDDAP™tenta ler dados desse arquivo inválido, o erro resultante fará com que o arquivo seja adicionado à tabela de arquivos inválidos. Isto não é bom. Para evitar este problema, use um nome de arquivo temporário quando FTP'ing o arquivo, por exemplo, ABC2005.nc\\_TEMP . Então, o teste fileNameRegex (ver abaixo) irá indicar que este não é um arquivo relevante. Depois que o processo FTP é completo, renomeie o arquivo para o nome correto. O processo de renomeação fará com que o arquivo se torne relevante em um instante.
     
#### "0 ficheiros" Mensagem de erro{#0-files-error-message-1} 
Se você correr[Gerar conjuntos de dadosXml](#generatedatasetsxml)ou[DasDds](#dasdds), ou se você tentar carregar umEDDGridA partir de...Files dataset inERDDAP™, e você recebe uma mensagem de erro "0 files" indicando queERDDAP™encontrado 0 arquivos correspondentes no diretório (quando você acha que existem arquivos correspondentes nesse diretório) :
    * Verifique se os arquivos estão realmente nesse diretório.
    * Verifique a ortografia do nome do diretório.
    * Verifique o arquivoNameRegex. É realmente, muito fácil cometer erros com regexes. Para fins de teste, tente o regex .\\* que deve corresponder a todos os nomes de arquivos. (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Verifique se o usuário que está executando o programa (por exemplo, user=tomcat (?) para Tomcat /ERDDAP) tem permissão 'read' para esses arquivos.
    * Em alguns sistemas operacionais (por exemplo, SELinux) e dependendo das configurações do sistema, o usuário que executou o programa deve ter permissão de 'leitura' para toda a cadeia de diretórios que levam ao diretório que tem os arquivos.
         
#### EDDGridesqueleto deFiles XML{#eddgridfromfiles-skeleton-xml} 
*    **O esqueleto XML** para todosEDDGridFromFiles subclasses é:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD * De áudioFiles{#eddfromaudiofiles} 
 **EDDGridA partir deAudioFiles** e **EDDTable FromAudioFiles** agregar dados de uma coleção de arquivos de áudio locais. (Estes apareceram primeiroERDDAP™v1.82.) A diferença é queEDDGridFromAudioFiles trata os dados como um conjunto de dados multidimensional (geralmente com 2 dimensões:\\[início de arquivo Tempo\\]e\\[decaída Tempo dentro de um arquivo\\]) , enquanto EDDTableFromAudioFiles trata os dados como dados tabulares (geralmente com colunas para o início do arquivoTime, o elapsedTime com o arquivo, e os dados dos canais de áudio) .EDDGridFromAudioFiles exige que todos os arquivos têm o mesmo número de amostras, então se isso não for verdade, você deve usar EDDTableFromAudioFiles. Caso contrário, a escolha de que tipo EDD usar é inteiramente sua escolha. Uma vantagem de EDDTableFromAudioFiles: você pode adicionar outras variáveis com outras informações, por exemplo,stationIDEstação Type. Em ambos os casos, a falta de uma variável de tempo unificada torna mais difícil trabalhar com os dados desses tipos de EDD, mas não havia nenhuma boa maneira de configurar uma variável de tempo unificada.

Veja as superclasses desta classe.[EDDGridDos quartos](#eddgridfromfiles)e[Tabela EDD dos arquivos](#eddtablefromfiles), para informações gerais sobre como esta classe funciona e como usá-la.

Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Uma vez que os arquivos de áudio não têm metadados além das informações relacionadas com a codificação dos dados de som, você terá que editar a saída de GenerateDatasets Xml para fornecer informações essenciais (por exemplo, título, resumo,creator\\_name, instituição, história) .

Detalhes:

* Há um grande número de formatos de arquivos de áudio. Atualmente,ERDDAP™pode ler dados da maioria dos arquivos .wav e .au. Atualmente não pode ler outros tipos de arquivos de áudio, por exemplo, .aiff ou .mp3. Se você precisar de suporte para outros formatos de arquivos de áudio ou outras variantes de .wav e .au, por favor envie um e-mail para Chris. John em noaaa.gov . Ou, como uma solução que você pode usar agora, você pode converter seus arquivos de áudio em PCM\\_ ASSINAR (para dados inteiros) ou PCM\\_FLOAT (para dados de ponto flutuante) Arquivos .wav para queERDDAP™pode trabalhar com eles.
* Atualmente,ERDDAP™pode ler arquivos de áudio com o queJava's classe AudioFormat chama PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW e codificações ULAW.ERDDAP™converte valores PCM\\_UNSIGNED (por exemplo, 0 a 255) em valores assinados (por exemplo, -128 a 128) reorganizando os bits nos valores de dados.ERDDAP™converte ALAW e ULAW codificado de seu formato de byte nativo codificado em curto (Intérprete) valores. Desde entãoJavaquer bigEndian = dados verdadeiros,ERDDAP™rearranja os bytes de dados armazenados com bigEndian=false (pequeno endiano) para ler os valores corretamente. Para todas as outras codificações (PCM) ,ERDDAP™lê os dados como é.
* QuandoERDDAP™lê dados de arquivos de áudio, ele converte os metadados de áudio disponíveis do arquivo em atributos globais. Isso sempre incluirá (com valores de amostra mostrados) 
    
String audioBigEndian "false"; //true ou false
em áudio Canais 1;
String audioEncoding "PCM\\_SIGNED";
float audioFrameRate 96000.0; //por segundo
int audioFrameSize 2; //# de dados bytes per frame
float audioSampleRate 96000.0; //por segundo
int audioSampleSizeInBits 16; //# de bits por canal por amostra
    
ParaERDDAPOs propósitos, um quadro é sinônimo de uma amostra, que é os dados para um ponto no tempo.
Os atributos emERDDAP™terá as informações descrevendo os dados como estava nos arquivos de origem.ERDDAP™muitas vezes mudou isso ao ler os dados, por exemplo, PCM\\_UNSIGNED, ALAW e ULAW dados codificados são convertidos para PCM\\_SIGNED, e bigEndian=false dados são convertidos para bigEndian=true data (que é comoJavaquer lê-lo) . No final, valores de dados emERDDAP™será sempre o[PCM codificado](https://en.wikipedia.org/wiki/Pulse-code_modulation)valores de dados (ou seja, amostras digitalizadas simples da onda sonora) .
* QuandoERDDAP™lê dados de arquivos de áudio, lê todo o arquivo.ERDDAP™pode ler até cerca de 2 bilhões de amostras por canal. Por exemplo, se a taxa de amostragem for de 44,100 amostras por segundo, 2 bilhões de amostras se traduz em cerca de 756 minutos de dados sonoros por arquivo. Se você tem arquivos de áudio com mais do que essa quantidade de dados, você precisa dividir os arquivos em pedaços menores para queERDDAP™pode lê-los.
* Porque...ERDDAP™lê arquivos de áudio inteiros,ERDDAP™deve ter acesso a uma grande quantidade de memória para trabalhar com grandes arquivos de áudio. Ver[ERDDAPconfigurações de memória](/docs/server-admin/deploy-install#memory). Novamente, se este é um problema, uma solução que você pode usar agora é quebrar os arquivos em pedaços menores para queERDDAP™pode lê-los com menos memória.
* Alguns arquivos de áudio foram escritos incorretamente.ERDDAP™faz um pequeno esforço para lidar com tais casos. Mas em geral, quando há um erro,ERDDAP™vai jogar uma exceção (e rejeitar esse arquivo) ou (se o erro é indetectável) ler os dados (mas os dados serão incorretos) .
*   ERDDAP™não verificar ou alterar o volume do som. Idealmente, dados de áudio inteiros são dimensionados para usar toda a gama do tipo de dados.
* Arquivos de áudio e leitores de áudio não têm sistema para valores ausentes (por exemplo, -999 ou Float.NaN) . Então os dados de áudio não devem ter nenhum valor ausente. Se houver valores ausentes (por exemplo, se você precisar alongar um arquivo de áudio) , use uma série de 0's que serão interpretados como perfeito silêncio.
* QuandoERDDAP™lê dados de arquivos de áudio, sempre cria uma coluna chamada de decaída Tempo com o tempo para cada amostra, em segundos (armazenados como duplos) , em relação à primeira amostra (que é atribuído decorrido Tempo = 0,0) . ComEDDGridFromAudioFiles, isso se torna a variável de eixo elapsedTime.
*   EDDGridFromAudioFiles exige que todos os arquivos têm o mesmo número de amostras. Então, se isso não for verdade, você deve usar EDDTableFromAudioFiles.
* ParaEDDGridFromAudioFiles, recomendamos que você configure [&lt;DimensionValuesInMemory&gt;] (#valores de dimensão em memória) ao falso (como é recomendado por GenerateDatasets Xml) , porque a dimensão do tempo muitas vezes tem um grande número de valores.
* ParaEDDGridFromAudioFiles, você deve quase sempre usar oEDDGridSistema FromFiles para[Agregação via Nomes de arquivo](#aggregation-via-file-names-or-global-metadata), quase sempre extraindo a data de início da gravação Hora dos nomes dos ficheiros. Por exemplo,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Gerar conjuntos de dados Xml vai encorajar isso e ajudá-lo com isso.
* Para EDDTableFromAudioFiles, você deve quase sempre usar o sistema EDDTableFromFiles para[\\*\\*\\*fileNome pseudosourceNameS](#filename-sourcenames)para extrair informações do nome do arquivo (quase sempre a data de início Tempo para a gravação) e promovê-lo para ser uma coluna de dados. Por exemplo,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
O formato de tempo deve então ser especificado como o atributo unidades:&lt;nome do att="units"&gt;yyyMMdd'\\_'Hmmss&lt;/att&gt;
     
### EDDGridA partir deMergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridA partir deMergeIRFiles** ](#eddgridfrommergeirfiles)agrega dados de local,[Mergeir](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)arquivos, que são do[Missão de Medição de Chuva Tropical (TRMM) ](https://trmm.gsfc.nasa.gov), que é uma missão conjunta entre a NASA e a Agência de Exploração Aeroespacial do Japão (JAXA) . Mergulho Arquivos IR podem ser baixados a partir de[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridFromMergeIRFiles.java foi escrito e contribuiu para oERDDAP™projeto de Jonathan Lafite e Philippe Makowski da R.Tech Engenharia (Licença: copyrighted open source) .

EDDGridFromMergeIRFiles é um pouco incomum:

*   EDDGridO FromMergeIRFiles suporta arquivos de dados de origem compactados ou não compactados, em qualquer combinação, no mesmo conjunto de dados. Isso permite que você, por exemplo, comprima arquivos antigos que raramente são acessados, mas descompacte novos arquivos que são frequentemente acessados. Ou, você pode alterar o tipo de compressão do original . Z, por exemplo,.gz.
* Se você tiver versões compactadas e não compactadas dos mesmos arquivos de dados no mesmo diretório, certifique-se de que&lt;fileNameRegex&gt; para o seu conjunto de dados corresponde aos nomes de arquivo que você deseja que ele combine e não combina com nomes de arquivo que você não quer que ele combine.
* Arquivos de dados de origem não compactados devem ter nenhuma extensão de arquivo (ou seja, não "." no nome do arquivo) .
* Os arquivos de dados de origem compacta devem ter uma extensão de arquivo, masERDDAP™determina o tipo de compressão inspecionando o conteúdo do arquivo, não olhando para a extensão do arquivo (por exemplo, ".Z") . Os tipos de compressão suportados incluem "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", e "z". QuandoERDDAP™lê arquivos compactados, descomprime on-the-fly, sem escrever para um arquivo temporário.
* Todos os arquivos de dados de origem devem usar o sistema de nomes de arquivos original: i.e., merg\\_ *Sim.* \\_4km-pixel (Onde? *Sim.* indica o tempo associado aos dados no arquivo) , mais uma extensão de arquivo se o arquivo for compactado.

Veja a superclasse desta classe.[EDDGridDos quartos](#eddgridfromfiles), para informações gerais sobre como esta classe funciona e como usá-la.

Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
 
### EDDGridA partir de NcFiles{#eddgridfromncfiles} 
[ **EDDGridA partir de NcFiles** ](#eddgridfromncfiles)agrega dados de local, gradeado,[GRIB .grb e .grb2](https://en.wikipedia.org/wiki/GRIB)arquivos,[HDF  (v4 ou v5)  .hdf](https://www.hdfgroup.org/)arquivos,[.ncml](#ncml-files)arquivos,[NetCDF  (v3 ou v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)arquivos, e[Zarr](https://github.com/zarr-developers/zarr-python)arquivos (a partir da versão 2.25) . Os arquivos Zarr têm um comportamento ligeiramente diferente e exigem o fileNameRegex ou o pathRegex para incluir "zarr".

Isso pode funcionar com outros tipos de arquivo (por exemplo, BUFR) Não o testámos, por favor envie-nos alguns ficheiros de amostra.

* Para arquivos GRIB,ERDDAP™fará um arquivo de índice .gbx a primeira vez que lê cada arquivo GRIB. Então os arquivos GRIB devem estar em um diretório onde o "usuário" que executou Tomcat tem permissão de leitura + gravação.
* Veja a superclasse desta classe.[EDDGridDos quartos](#eddgridfromfiles), para obter informações sobre como esta classe funciona e como usá-la.
* Começar comERDDAP™v2.12,EDDGridDe NcFiles eEDDGridA partir de NcFiles Unpacked pode ler dados de "estruturas" em.nc4 e.hdf4 ficheiros. Para identificar uma variável que é de uma estrutura, a&lt;sourceName&gt; deve usar o formato: *Design de moda* | *Nome do membro* , por exemplo, group1/myStruct|MyMember.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
    
#### Grupos em arquivos Nc Gridded{#groups-in-gridded-nc-files} 
    [Os arquivos Netcdf4 podem conter grupos.](#groups-in-gridded-nc-files) ERDDAP™apenas faz um conjunto de dados das variáveis em um grupo e todos os seus grupos-mãe. Você pode especificar um nome de grupo específico em GerarDatasets Xml (omit the trailing slash) , ou use "" para ter GerarDatasets Xml pesquisa todos os grupos para as variáveis que usam a maioria das dimensões, ou usam "\\[raiz raiz\\]" ter GenerateDatasets apenas procurar variáveis no grupo raiz.
    
A primeira coisa que GenerateDatasetsXml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura tipo ncdump do arquivo de amostra. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
    

### EDDGridA partir de NcFilesUnpacked{#eddgridfromncfilesunpacked} 
[ **EDDGridA partir de NcFilesUnpacked** ](#eddgridfromncfilesunpacked)é uma variante de[EDDGridA partir de NcFiles](#eddgridfromncfiles)que agrega dados de local, gradeadoNetCDF  (v3 ou v4)  .nce arquivos relacionados. A diferença é que esta classe descompacta cada arquivo de dados antesEDDGridFromFiles olha para os arquivos:

* Desbloqueia variáveis que são embaladas com[scale\\_factore/ouadd\\_offset](#scale_factor).
* Ele converte \\_FillValue emissing\\_valuevalores para ser NaN's (ou MAX\\_VALUE para tipos de dados inteiros) .
* Converte valores de tempo e timestamp para"seconds since 1970-01-01T00:00:00Z".

A grande vantagem desta classe é que ela fornece uma maneira de lidar com diferentes valores descale\\_factor,add\\_offset, \\_FillValue,missing\\_value, ou unidades de tempo em arquivos de origem diferentes em uma coleção. Caso contrário, você teria que usar uma ferramenta como[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)para modificar cada arquivo para remover as diferenças para que os arquivos possam ser tratadosEDDGridDe NcFiles. Para que esta classe funcione corretamente, os arquivos devem seguir os padrões CF para os atributos relacionados.

* Se tentar fazer umEDDGridA partir de NcFiles Desempacotado de um grupo de arquivos com os quais você anteriormente tentou e não conseguiu usarEDDGridDe NcFiles, cd a
     *Diretriz de grande porte* /dataset/ *último2Cartas* / *datasetID* /
Onde? *último2Cartas* é as últimas 2 letras dodatasetID,
e excluir todos os arquivos nesse diretório.
* Começar comERDDAP™v2.12,EDDGridDe NcFiles eEDDGridA partir de NcFiles Unpacked pode ler dados de "estruturas" em.nc4 e.hdf4 ficheiros. Para identificar uma variável que é de uma estrutura, a&lt;sourceName&gt; deve usar o formato: *Design de moda* | *Nome do membro* , por exemplo, group1/myStruct|MyMember.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
    
Os arquivos Netcdf4 podem conter grupos. Ver[esta documentação](#groups-in-gridded-nc-files).
    
A primeira coisa que GenerateDatasetsXml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura semelhante a ncdump do arquivo de amostra **antes** é desembalado. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)modifica os valores de longitude de uma criança (fechado)  EDDGriddataset que tem alguns valores de longitude maiores que 180 (por exemplo, 0 a 360) para que eles estejam no intervalo -180 a 180 (Longitude Plus ou Minus 180, daí o nome) .

* Isso fornece uma maneira de fazer conjuntos de dados que têm valores de longitude maiores que 180 em conformidade / comOGCserviços (por exemplo,WMSno servidorERDDAP) , desde tudoOGCserviços exigem valores de longitude dentro de -180 a 180.
* Trabalhar perto de uma descontinuidade causa problemas, independentemente de a descontinuidade estar em longitude 0 ou em longitude 180. Este tipo de conjunto de dados permite evitar esses problemas para todos, oferecendo duas versões do mesmo conjunto de dados:
um com valores de longitude na faixa 0 a 360 ("Pacificêntrico"?) ,
um com valores de longitude na faixa -180 a 180 ("Atlanticentric"?) .
* Para conjuntos de dados infantis com todos os valores de longitude maiores que 180, todos os novos valores de longitude são simplesmente 360 graus inferiores. Por exemplo, um conjunto de dados com valores de longitude de 180 a 240 se tornaria um conjunto de dados com valores de longitude de -180 a -120.
* Para conjuntos de dados infantis que têm valores de longitude para todo o globo (aproximadamente 0 a 360) , o novo valor de longitude será reorganizado para ser (aproximadamente) -180 a 180:
Os valores originais de 0 a quase 180 são inalterados.
Os valores originais de 180 a 360 são convertidos para -180 a 0 e deslocados para o início do array de longitude.
* Para conjuntos de dados infantis que abrangem 180 mas não cobrem o globo,ERDDAP™insere valores ausentes conforme necessário para fazer um conjunto de dados que cobre o globo. Por exemplo, um conjunto de dados infantis com valores de longitude de 140 a 200 se tornaria um conjunto de dados com valores de longitude de -180 a 180.
Os valores da criança de 180 a 200 se tornariam -180 a -160.
Novos valores de longitude seriam inseridos de -160 a 140. Os valores de dados correspondentes serão \\_FillValues.
Os valores da criança de 140 a quase 180 seriam inalterados.
A inserção de valores ausentes pode parecer estranha, mas evita vários problemas que resultam de ter valores de longitude que saltam de repente (por exemplo, de -160 a 140) .
* Em[Gerar conjuntos de dadosXml](#generatedatasetsxml), há um "tipo de conjunto de dados" especial,EDDGridLonPM180 FromErddapCatalog, que permite gerar odatasets.xmlparaEDDGridConjuntos de dados LonPM180 de cada um dosEDDGridconjuntos de dados em umERDDAPque têm valores de longitude maiores que 180. Isso facilita a oferta de duas versões desses conjuntos de dados:
o original, com valores de longitude na faixa 0 a 360,
e o novo conjunto de dados, com valores de longitude no intervalo -180 a 180.
    
O conjunto de dados da criança dentro de cadaEDDGridConjunto de dados LonPM180 será umEDDGridDataset FromErddap que aponta para o conjunto de dados original.
O novo conjunto de dadosdatasetIDserá o nome do conjunto de dados original mais "\\_LonPM180".
Por exemplo,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Coloque oEDDGridConjunto de dados LonPM180 **abaixo** o conjunto de dados original emdatasets.xml. Isso evita alguns possíveis problemas.
    
Alternativamente, você pode substituir oEDDGridDataset de criança FromErddap com o conjunto de dados originaldatasets.xml. Então, haverá apenas uma versão do conjunto de dados: aquela com valores de longitude dentro de -180 a 180. Nós desencorajamos isso porque há momentos em que cada versão do conjunto de dados é mais conveniente.
    
* Se você oferecer duas versões de um conjunto de dados, por exemplo, uma com longitude 0 a 360 e uma com longitude -180 a 180:
    * Você pode usar o opcional [&lt;acessível ViajandoWMS&gt;&lt;/acessível ViajandoWMS&gt; (#acessível através de) com o conjunto de dados 0-360 para desativar forçosamenteWMSserviço para esse conjunto de dados. Então, apenas a versão LonPM180 do conjunto de dados será acessível atravésWMS.
    * Existem algumas maneiras de manter o conjunto de dados LonPM180 atualizado com mudanças no conjunto de dados subjacente:
        * Se o conjunto de dados da criança é umEDDGridA partir do conjunto de dados Erddap que refere um conjunto de dados no mesmoERDDAP™, o conjunto de dados LonPM180 tentará se inscrever diretamente no conjunto de dados subjacente para que ele esteja sempre atualizado. As assinaturas diretas não geram e-mails pedindo que você valide a assinatura - a validação deve ser feita automaticamente.
        * Se o conjunto de dados da criança não for umEDDGridDataset FromErddap que está no mesmoERDDAP™, o conjunto de dados LonPM180 tentará usar o sistema de assinatura regular para se inscrever no conjunto de dados subjacente. Se você tem o sistema de assinatura em seuERDDAP™ligado, você deve obter e-mails pedindo-lhe para validar a assinatura. Por favor.
        * Se você tem o sistema de assinatura em seuERDDAP™desligado, o conjunto de dados LonPM180 pode, por vezes, ter ultrapassado metadados até que o conjunto de dados LonPM180 seja recarregado. Então, se o sistema de assinatura é desligado, você deve definir o [&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) configuração do conjunto de dados LonPM180 para um número menor, de modo que é mais provável capturar mudanças no conjunto de dados da criança mais cedo.

#### EDDGridesqueleto LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)modifica os valores de longitude de uma criança (fechado)  EDDGriddataset que tem alguns valores de longitude inferior a 0 (por exemplo, -180 a 180) para que eles estejam no intervalo 0 a 360 (daí o nome) .

* Trabalhar perto de uma descontinuidade causa problemas, independentemente de a descontinuidade estar em longitude 0 ou em longitude 180. Este tipo de conjunto de dados permite evitar esses problemas para todos, oferecendo duas versões do mesmo conjunto de dados:
um com valores de longitude na faixa -180 a 180 ("Atlanticentric"?) .
um com valores de longitude na faixa 0 a 360 ("Pacificêntrico"?) ,
* Para conjuntos de dados infantis com todos os valores de longitude inferior a 0, todos os novos valores de longitude são simplesmente 360 graus mais elevados. Por exemplo, um conjunto de dados com valores de longitude de -180 a -120 se tornaria um conjunto de dados com valores de longitude de 180 a 240.
* Para conjuntos de dados infantis que têm valores de longitude para todo o globo (aproximadamente -180 a 180) , o novo valor de longitude será reorganizado para ser (aproximadamente) 0 a 360:
Os valores originais -180 a 0 são convertidos para 180 a 360 e deslocados para o final do array de longitude.
Os valores originais de 0 a quase 180 são inalterados.
* Para conjuntos de dados infantis que abrangem lon=0 mas não cobrem o globo,ERDDAP™insere valores ausentes conforme necessário para fazer um conjunto de dados que cobre o globo. Por exemplo, um conjunto de dados infantis com valores de longitude de -40 a 20 se tornaria um conjunto de dados com valores de longitude de 0 a 360.
Os valores da criança de 0 a 20 seriam inalterados.
Novos valores de longitude seriam inseridos de 20 a 320. Os valores de dados correspondentes serão \\_FillValues.
Os valores da criança de -40 a 0 se tornariam 320 a 360.
A inserção de valores ausentes pode parecer estranha, mas evita vários problemas que resultam de ter valores de longitude que saltam de repente (por exemplo, de 20 a 320) .
* Em[Gerar conjuntos de dadosXml](#generatedatasetsxml), há um "tipo de conjunto de dados" especial,EDDGridLon0360 De ErddapCatalog, que permite gerar odatasets.xmlparaEDDGridConjuntos de dados Lon0360 de cada um dosEDDGridconjuntos de dados em umERDDAPque têm valores de longitude maiores que 180. Isso facilita a oferta de duas versões desses conjuntos de dados:
o original, com valores de longitude na faixa 0 a 360,
e o novo conjunto de dados, com valores de longitude no intervalo -180 a 180.
    
O conjunto de dados da criança dentro de cadaEDDGridConjunto de dados Lon0360 será umEDDGridDataset FromErddap que aponta para o conjunto de dados original.
O novo conjunto de dadosdatasetIDserá o nome do conjunto de dados original mais "\\_Lon0360".
Por exemplo,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Coloque oEDDGridConjunto de dados Lon0360 **abaixo** o conjunto de dados original emdatasets.xml. Isso evita alguns possíveis problemas.
    
Alternativamente, você pode substituir oEDDGridDataset de criança FromErddap com o conjunto de dados originaldatasets.xml. Então, haverá apenas uma versão do conjunto de dados: aquela com valores de longitude dentro de 0 a 360. Nós desencorajamos isso porque há momentos em que cada versão do conjunto de dados é mais conveniente.
    
* Se você oferecer duas versões de um conjunto de dados, por exemplo, uma com longitude 0 a 360 e uma com longitude -180 a 180:
    * Você pode usar o opcional [&lt;acessível ViajandoWMS&gt;&lt;/acessível ViajandoWMS&gt; (#acessível através de) com o conjunto de dados de 0 a 360 para desativar com forçaWMSserviço para esse conjunto de dados. Então, apenas a versão -180 a 180 do conjunto de dados será acessível viaWMS.
    * Existem algumas maneiras de manter o conjunto de dados Lon0360 atualizado com mudanças no conjunto de dados subjacente:
        * Se o conjunto de dados da criança é umEDDGridA partir do conjunto de dados Erddap que refere um conjunto de dados no mesmoERDDAP™, o conjunto de dados Lon0360 tentará se inscrever diretamente no conjunto de dados subjacente para que ele esteja sempre atualizado. As assinaturas diretas não geram e-mails pedindo que você valide a assinatura - a validação deve ser feita automaticamente.
        * Se o conjunto de dados da criança não for umEDDGridDataset FromErddap que está no mesmoERDDAP™, o conjunto de dados Lon0360 tentará usar o sistema de assinatura regular para se inscrever no conjunto de dados subjacente. Se você tem o sistema de assinatura em seuERDDAP™ligado, você deve obter e-mails pedindo-lhe para validar a assinatura. Por favor.
        * Se você tem o sistema de assinatura em seuERDDAP™desligado, o conjunto de dados Lon0360 pode, por vezes, ter ultrapassado metadados até que o conjunto de dados Lon0360 seja recarregado. Então, se o sistema de assinatura é desligado, você deve definir o [&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) configuração do conjunto de dados Lon0360 para um número menor, de modo que é mais provável capturar mudanças no conjunto de dados da criança mais cedo.
#### EDDGridesqueleto Lon0360 XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSideBySide{#eddgridsidebyside} 
[ **EDDGridSideBySide** ](#eddgridsidebyside)agrega dois ou maisEDDGridconjuntos de dados (as crianças) lado a lado.

* O conjunto de dados resultante tem todas as variáveis de todos os conjuntos de dados da criança.
* O conjunto de dados dos pais e todos os conjuntos de dados da criança DEVE ter diferentesdatasetIDS. Se algum nome em uma família for exatamente o mesmo, o conjunto de dados falhará em carregar (com a mensagem de erro que os valores do eixo agregado não estão em ordem ordenada) .
* Todas as crianças devem ter os mesmos valores-fonte paraaxisVariableS\\[1+\\]  (por exemplo, latitude, longitude) . A precisão dos testes é determinada por[Jogos de Vestir](#matchaxisndigits).
* As crianças podem ter diferentes valores-fonte paraaxisVariableS\\[0\\]  (por exemplo, tempo) , mas eles são geralmente em grande parte o mesmo.
* O conjunto de dados dos pais parece ter todo oaxisVariableS\\[0\\]valores-fonte de todas as crianças.
* Por exemplo, isso permite combinar um conjunto de dados de origem com um componente u do vetor e outro conjunto de dados de origem com um componente v do vetor, para que os dados combinados possam ser servidos.
* As crianças criadas por este método são mantidas em privado. Eles não são conjuntos de dados acessíveis separadamente (por exemplo, por solicitações de dados do cliente ou por[arquivos de bandeira](/docs/server-admin/additional-information#flag)) .
* Os metadados e configurações globais para o pai vêm dos metadados globais e configurações para a primeira criança.
* Se houver uma exceção ao criar a primeira criança, o pai não será criado.
* Se houver uma exceção ao criar outras crianças, isso envia um e-mail para e-mail Tudo Para (como especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) e continua com as outras crianças.
#### EDDGridesqueleto de SideBySide XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridDimensão existente agregada{#eddgridaggregateexistingdimension} 
[ **EDDGridDimensão existente agregada** ](#eddgridaggregateexistingdimension)agrega dois ou maisEDDGriddatasets cada um dos quais tem uma gama diferente de valores para a primeira dimensão, mas valores idênticos para as outras dimensões.

* Por exemplo, um conjunto de dados de crianças pode ter 366 valores (para 2004) para a dimensão do tempo e outra criança pode ter 365 valores (para 2005) para a dimensão do tempo.
* Todos os valores para todas as outras dimensões (por exemplo, latitude, longitude) Deve ser idêntico para todas as crianças. A precisão dos testes é determinada por[Jogos de Vestir](#matchaxisndigits).
* Valores de dimensão classificados - Os valores para cada dimensão devem estar em ordem ordenada (Ascendente ou descendente) . Os valores podem ser espaçados de forma irregular. Não pode haver laços. Esta é uma exigência do[Padrão de metadados CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se os valores de qualquer dimensão não estiverem em ordem ordenada, o conjunto de dados não será carregado eERDDAP™identificará o primeiro valor não ousado no arquivo de log, *Diretriz de grande porte* /logs/log.txt .
    
Valores de dimensão não variados quase sempre indicam um problema com o conjunto de dados de origem. Isso ocorre mais comumente quando um arquivo mal nomeado ou inadequado está incluído na agregação, o que leva a uma dimensão de tempo não autorizada. Para resolver este problema, veja a mensagem de erro noERDDAP™arquivo log.txt para encontrar o valor de tempo ofensivo. Em seguida, procure nos arquivos de origem para encontrar o arquivo correspondente (ou um antes ou um após) Isso não pertence à agregação.
    
* O conjunto de dados dos pais e o conjunto de dados da criança DEVE ter diferentesdatasetIDS. Se algum nome em uma família for exatamente o mesmo, o conjunto de dados falhará em carregar (com a mensagem de erro que os valores do eixo agregado não estão em ordem ordenada) .
* Atualmente, o conjunto de dados da criança DEVE ser umEDDGridA partir do conjunto de dados e DEVE ter os valores mais baixos da dimensão agregada (geralmente os valores de tempo mais antigos) . Todas as outras crianças devem ser conjuntos de dados quase idênticos (diferindo apenas nos valores para a primeira dimensão) e são especificados por apenas seussourceUrl.
* O conjunto de dados agregado recebe seus metadados da primeira criança.
* O[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)pode fazer um rascunho áspero dodatasets.xmlpara umEDDGridAggregateExistingDimension baseado em um conjunto de arquivos servidos por umHyraxou servidor THREDDS. Por exemplo, use esta entrada para o programa (o "/1988" na URL torna o exemplo mais rápido) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Você pode usar o resultado&lt;sourceUrl&gt; tags ou excluí-los e descompactar&lt;sourceUrl&gt; tag (para que novos arquivos sejam notados cada vez que o conjunto de dados é recarregado.
#### EDDGridesqueleto AggregateExistingDimension XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridEntendido.{#eddgridcopy} 
[ **EDDGridEntendido.** ](#eddgridcopy)faz e mantém uma cópia local de outraEDDGrid's dados e serve dados da cópia local.

*   EDDGridEntendido. (e para dados tabulares,[EDDTableCopy](#eddtablecopy)) é muito fácil de usar e muito eficaz
     **solução para alguns dos maiores problemas com a utilização de dados de uma fonte de dados remota:** 
    * Acessar dados de uma fonte de dados remota pode ser lento.
        * Pode ser lento porque é inerentemente lento (por exemplo, um tipo ineficiente de servidor) ,
        * porque é esmagado por muitos pedidos,
        * ou porque seu servidor ou o servidor remoto é de largura de banda limitada.
    * O conjunto de dados remoto é por vezes indisponível (novamente, por uma variedade de razões) .
    * Basear-se em uma fonte para os dados não escala bem (por exemplo, quando muitos usuários e muitosERDDAPs utilizá-lo) .
         
* Como funciona...EDDGridCopiar resolve esses problemas automaticamente fazendo e mantendo uma cópia local dos dados e servindo dados da cópia local.ERDDAP™pode servir os dados da cópia local muito, muito rapidamente. E fazer uma cópia local alivia o fardo no servidor remoto. E a cópia local é um backup do original, que é útil no caso de algo acontecer ao original.
    
Não há nada de novo sobre fazer uma cópia local de um conjunto de dados. O que é novo aqui é que esta classe faz\\*Fácil.\\*criar e\\*manter\\*uma cópia local de dados de uma\\*variedade\\*de tipos de fontes de dados remotas e\\*adicionar metadados\\*ao copiar os dados.
    
* Chunks of Data...EDDGridCopiar faz a cópia local dos dados solicitando pedaços de dados do remoto&lt;dataset&gt; . Haverá um pedaço para cada valor da esquerda (Primeiro) variável de eixo.EDDGridCopiar não depende dos números de índice do conjunto de dados remotos para o eixo -- aqueles podem mudar.
    
AVISO: Se o tamanho de um pedaço de dados é tão grande (&gt; 2 GB) que causa problemas,EDDGridA cópia não pode ser usada. (Desculpe, esperamos ter uma solução para este problema no futuro.) 
    
*   \\[Uma alternativa aEDDGridEntendido.
Se os dados remotos estiverem disponíveis através de arquivos transferíveis, não um serviço web, use[cache Opção de FromUrl paraEDDGridDos quartos](#cachefromurl), que faz uma cópia local dos arquivos remotos e serve os dados dos arquivos locais.\\]
* Arquivos locais -- Cada pedaço de dados é armazenado em um separadoNetCDFarquivo em um subdiretório de *Diretriz de grande porte* /cópia / *datasetID* / (como especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Os nomes de arquivos criados a partir de valores de eixo são modificados para torná-los seguros de nome de arquivo (por exemplo, hífens são substituídos por "x2D") - Isto não afecta os dados.
     
* Novos dados - ... Cada vezEDDGridCopiar é recarregado, ele verifica o remoto&lt;dataset&gt; para ver quais pedaços estão disponíveis. Se o arquivo para um pedaço de dados já não existir, um pedido para obter o pedaço é adicionado a uma fila.ERDDAP's taskThread processa todas as solicitações filadas para pedaços de dados, one-by-one. Você pode ver estatísticas para a atividade do Thread na tarefa[Página de status](/docs/server-admin/additional-information#status-page)e no[Relatório diário](/docs/server-admin/additional-information#daily-report). (Sim.ERDDAP™poderia atribuir várias tarefas para este processo, mas isso usaria muitos da largura de banda, memória e tempo de CPU da fonte de dados remotos, e muitos dos locaisERDDAP's largura de banda, memória e tempo de CPU, nenhum dos quais é uma boa ideia.) 
    
NOTA: A primeira vezEDDGridA cópia está carregada. (se tudo correr bem) lotes de pedidos de pedaços de dados serão adicionados à fila do taskThread, mas nenhum arquivo de dados local será criado. Assim, o construtor vai falhar, mas tarefaThread continuará a trabalhar e criar arquivos locais. Se tudo correr bem, a tarefaThread fará alguns arquivos de dados locais e a próxima tentativa de recarregar o conjunto de dados (em ~ 15 minutos) terá sucesso, mas inicialmente com uma quantidade muito limitada de dados.
    
NOTA: Depois que o conjunto de dados local tem alguns dados e aparece em seuERDDAP, se o conjunto de dados remoto for temporariamente ou permanentemente não acessível, o conjunto de dados local continuará funcionando.
    
AVISO: Se o conjunto de dados remoto é grande e/ou o servidor remoto é lento (É esse o problema, não é?&#33;) , levará muito tempo para fazer uma cópia local completa. Em alguns casos, o tempo necessário será inaceitável. Por exemplo, transmitindo 1 TB de dados sobre uma linha T1 (0.15 GB/s) leva pelo menos 60 dias, em condições ideais. Além disso, ele usa muita largura de banda, memória e tempo de CPU nos computadores remotos e locais. A solução é enviar um disco rígido para o administrador do conjunto de dados remotos para que ele / ele pode fazer uma cópia do conjunto de dados e enviar o disco rígido de volta para você. Use esses dados como um ponto de partida eEDDGridCopiar irá adicionar dados a ele. (Essa é uma maneira[Serviço de nuvem EC2 da Amazon](https://aws.amazon.com/importexport/)lida com o problema, mesmo que seu sistema tenha muita largura de banda.) 
    
ATENÇÃO: Se um determinado valor para a esquerda (Primeiro) variável do eixo desaparece do conjunto de dados remoto,EDDGridCopiar não exclui o arquivo copiado local. Se você quiser, você pode excluí-lo sozinho.
    
#### Grid Verificação de CópiaFonte Dados{#grid-copy-checksourcedata} 
Odatasets.xmlpara este conjunto de dados pode ter uma tag opcional
```
    <checkSourceData>true</checkSourceData>  
```
O valor padrão é verdadeiro. Se / quando você configurá-lo para false, o conjunto de dados nunca irá verificar o conjunto de dados de origem para ver se há dados adicionais disponíveis.

#### apenas{#onlysince} 
Você pode dizerEDDGridCopie para fazer uma cópia de um subconjunto do conjunto de dados de origem, em vez de todo o conjunto de dados de origem, adicionando uma tag no formulário&lt;somente de acordo com o *alguns Valor* &lt;/onlySince&gt; para o conjunto de dadosdatasets.xmlChuck.EDDGridCopiar só irá baixar os valores de dados relacionados aos valores da primeira dimensão (geralmente a dimensão do tempo) que são maiores do que *alguns Valor* . *alguns Valor* pode ser:
    * Um tempo relativo especificado vianow- *NUnits* .
Por exemplo,&lt;somente de acordo com onow-2 anos&lt;/onlySince&gt; diz ao conjunto de dados para apenas fazer cópias locais dos dados para dados onde os valores da dimensão externa (geralmente valores de tempo) estão dentro dos últimos 2 anos (que é reavaliado cada vez que o conjunto de dados é recarregado, que é quando procura novos dados para copiar) . Ver[now- *NUnits* Descrição da sintaxe](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Isso é útil se a primeira dimensão tiver dados de tempo, o que normalmente faz.
        
        EDDGridCopiar não exclui arquivos de dados locais que têm dados que, ao longo do tempo, se tornam mais antigos do quenow- *NUnits* . Você pode excluir esses arquivos a qualquer momento se você optar por. Se você fizer, recomendamos fortemente que você definir um[bandeira](/docs/server-admin/additional-information#flag)depois de excluir os arquivos para contarEDDGridCopie para atualizar a lista de arquivos em cache.
        
    * Um ponto fixo no tempo especificado como uma string ISO 8601yyyy-MM-ddTHH:mm:ssZ.
Por exemplo,&lt;onlySince&gt;2000-01-01T00:00:00&lt;/onlySince&gt; diz ao conjunto de dados apenas para fazer cópias locais de dados onde o valor da primeira dimensão é \\&gt;=2000-01T00:00:00Z . Isso é útil se a primeira dimensão tiver dados de tempo, o que normalmente faz.
         
    * Um número de ponto flutuante.
Por exemplo,&lt;somente após&gt;946684800.0&lt;/onlySince&gt; . As unidades serão as unidades de destino da primeira dimensão. Por exemplo, para dimensões do tempo, as unidades emERDDAP™sempre"seconds since 1970-01-01T00:00:00Z". Então 946684800.0"seconds since 1970-01-01T00:00:00Z"é equivalente a 2000-01-01T00:00:00Z. Esta é sempre uma opção útil, mas é especialmente útil quando a primeira dimensão não tem dados de tempo.

#### EDDGridCopiar Uso recomendado{#eddgridcopy-recomended-use} 
1. Criar&lt;dataset&gt; entrada (o tipo nativo, nãoEDDGridEntendido.) para a fonte de dados remota.
     **Faça funcionar corretamente, incluindo todos os metadados desejados.** 
2. Se for muito lento, adicione o código XML para embrulhá-lo em umEDDGridCopiar conjunto de dados.
    * Use um diferentedatasetID  (talvez mudando odatasetIDdo velhodatasetIDligeiramente) .
    * Entendido.&lt;acessível Para&gt;,&lt;reloadEveryNMinutes&gt; e&lt;onChange&gt; do remotoEDDGridXML para oEDDGridCópia é XML. (Seus valores paraEDDGridCopiar matéria; seus valores para o conjunto de dados interno tornam-se irrelevantes.) 
3.  ERDDAP™fará e manterá uma cópia local dos dados.
         
* ATENÇÃO:EDDGridCopiar assume que os valores de dados para cada pedaço nunca mudam. Se / quando eles fizerem, você precisa excluir manualmente os arquivos de chunk em *Diretriz de grande porte* /cópia / *datasetID* / que mudou e[bandeira](/docs/server-admin/additional-information#flag)o conjunto de dados a ser recarregado para que os pedaços excluídos serão substituídos. Se você tiver uma assinatura por e-mail para o conjunto de dados, você receberá dois e-mails: um quando o conjunto de dados primeiro recarrega e começa a copiar os dados, e outro quando o conjunto de dados carrega novamente (automaticamente) e detecta os novos arquivos de dados locais.
     
* Todos os valores do eixo devem ser iguais.
Para cada um dos eixos, exceto o mais esquerdo (Primeiro) , todos os valores devem ser iguais para todas as crianças. A precisão dos testes é determinada por[Jogos de Vestir](#matchaxisndigits).
     
* Configurações, Metadados, Variáveis --EDDGridCopiar usa configurações, metadados e variáveis do conjunto de dados de origem fechada.
     
* Alterar os metadados - ... Se você precisar mudar qualqueraddAttributesou alterar a ordem das variáveis associadas ao conjunto de dados de origem:
    1. AlteraraddAttributespara o conjunto de dados de origemdatasets.xml, como necessário.
    2. Apague um dos arquivos copiados.
    3. Definir um[bandeira](/docs/server-admin/additional-information#flag)para recarregar o conjunto de dados imediatamente. Se você usar uma bandeira e tiver uma assinatura por e-mail para o conjunto de dados, você receberá dois e-mails: um quando o conjunto de dados primeiro recarrega e começa a copiar os dados, e outro quando o conjunto de dados carregar novamente (automaticamente) e detecta os novos arquivos de dados locais.
    4. O arquivo excluído será regenerado com os novos metadados. Se o conjunto de dados de origem estiver indisponível, oEDDGridO conjunto de dados de cópia obterá metadados do arquivo regenerado, já que é o arquivo mais jovem.
#### EDDGridesqueleto de cópia XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable FromCasandra{#eddtablefromcassandra} 
[ **EDDTable FromCasandra** ](#eddtablefromcassandra)lida com dados de um[Cassandra](https://cassandra.apache.org/)mesa. Cassandra é uma base de dados NoSQL.

*   ERDDAP™pode trabalhar com Cassandra v2 e v3 sem alterações ou diferenças na configuração. Temos testado com[Cassandra v2 e v3 de Apache](https://cassandra.apache.org/download/). É provável queERDDAP™também pode trabalhar com Cassandra baixado de DataStax.
     
* Para agosto de 2019 - maio de 2021, tivemos dificuldade em fazer Cassandra trabalhar com o AdoptOpenJdkJavav8. Ele jogou uma EXCEPÇÃO\\_ACCESS\\_VIOLATION). Mas agora (Maio 2021) , esse problema foi: podemos usar com sucesso Cassandra v2.1.22 e AdoptOpenJdk jdk8u292-b10.
     
#### Quadro 1{#one-table} 
Cassandra não suporta "joins" da maneira que os bancos de dados relacionais fazem. Um.ERDDAP™EDDTableFromCassandra dataset maps para um (talvez um subconjunto de um) Mesa Cassandra.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™vem com a CassandraJavadriver, então você não precisa instalá-lo separadamente.
* Leia cuidadosamente todas as informações deste documento sobre EDDTableFromCassandra. Alguns dos detalhes são muito importantes.
* A CassandraJavadriver é destinado a trabalhar com Apache Cassandra (1.2+) e DataStax Enterprise (3.1+) . Se você estiver usando o Apache Cassandra 1.2.x, você deve editar o arquivo cassandra.yaml para cada nó para definir start\\_native\\_transport: true, então reinicie cada nó.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo (especialmente [&lt;partição KeySourceNames&gt;] (#partitionkeysourcenames) ). Você pode coletar a maioria das informações que você precisa para criar o XML para um conjunto de dados EDDTableFromCasandra contatando o administrador Cassandra e pesquisando a web.
    
Gerar conjuntos de dados Xml tem duas opções especiais para EDDTableFromCassandra:
    
    1. Se você entrar "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sem as citações) para o espaço-chave, o programa exibirá uma lista de espaços-chave
    2. Se você entrar em um espaço-chave específico e, em seguida, entrar "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sem as citações) para o nome da tabela, o programa exibirá uma lista de tabelas nesse espaço-chave e suas colunas.
##### Sensibilidade de caso{#case-sensitivity} 
* Caso-insensível Keyspace e Nomes de Tabela -
A Cassandra trata nomes de espaço-chave e tabelas de uma forma insensível a casos. Por causa disso, você deve nunca usar uma palavra reservada (mas com um caso diferente) como um espaço-chave Cassandra ou nome de tabela.
* Nomes de coluna sensível a casos --
Por padrão, Cassandra trata nomes de colunas de forma insensível a casos. Se você usar uma das palavras reservadas de Cassandra como um nome de coluna (Por favor, não&#33;) , você precisa usar
```
        <columnNameQuotes>"<columnNameQuotes>  
```
emdatasets.xmlpara este conjunto de dados de modo que Cassandra eERDDAP™tratará os nomes das colunas de forma sensível ao caso. Isso provavelmente será uma enorme dor de cabeça para você, porque é difícil determinar as versões sensíveis a casos dos nomes das colunas -- Cassandra quase sempre exibe os nomes das colunas como todos os casos inferiores, independentemente do caso verdadeiro.
* Trabalhe em estreita colaboração com o administrador Cassandra, que pode ter experiência relevante. Se o conjunto de dados não carregar, leia o[mensagem de erro](#troubleshooting-tips)cuidadosamente para descobrir o porquê.
         
#### Cassandra&lt;conexão Propriedade &gt;{#cassandra-connectionproperty} 
Cassandra tem propriedades de conexão que podem ser especificadas emdatasets.xml. Muitos deles afetarão o desempenho da Cassandra...ERDDAP™ligação. Infelizmente, as propriedades Cassandra devem ser definidas programaticamente emJavaEntãoERDDAP™deve ter código para cada propriedadeERDDAP™suportes. Atualmente,ERDDAP™suporta estas propriedades:
 (Os padrões mostrados são o que vemos. Os padrões do seu sistema podem ser diferentes.) 

*    **Opções gerais**   
    &lt;conexão Nome do imóvel **compressão** " *nenhum|LZ4|Snappy* &lt;/conexão Propriedade (case-insensitive, default=none)   
     (Conselho de compressão geral: use 'none' se a conexão entre Cassandra eERDDAP™é local / rápido e usar 'LZ4' se a conexão é remota / lenta.)   
    &lt;conexão Nome do imóvel **credenciais** " *nome de usuário/password* &lt;/conexão Propriedade (Isso é literal.'/')   
    &lt;conexão Nome do imóvel **métricas** " *verdadeiro|falso* &lt;/conexão Propriedade (2021-01-25 foi default=true, agora ignorado e sempre falso)   
    &lt;conexão Nome do imóvel **porto** " *um livro* &lt;/conexão Propriedade (padrão para protocolo binário nativo=9042)   
    &lt;conexão Nome do imóvel **sr.** " *verdadeiro|falso* &lt;/conexão Propriedade (default=false)   
     (A minha rápida tentativa de usar o ssl falhou. Se conseguires, diz-me como fizeste.) 
*    **Opções de consulta**   
    &lt;conexão Nome do imóvel **consistência Nível** " *Todos|qualquer um|cada um|local|local|local\\_serial|um|- Sim.|serial|três|dois.* &lt;/conexão Propriedade (case-insensitive, default=ONE)   
    &lt;conexão Nome do imóvel **Feche o tamanho** " *um livro* &lt;/conexão Propriedade (predefinição:5000)   
     (Não definir fetchSize para um valor menor.)   
    &lt;conexão Nome do imóvel **SérieConsistência** " *Todos|qualquer um|cada um|local|local|local\\_serial|um|- Sim.|serial|três|dois.* &lt;/conexão Propriedade (case-insensitive, default=SERIAL) 
*    **Opções de soquete**   
    &lt;conexão Nome do imóvel **Tempo de conexão** " *um livro* &lt;/conexão Propriedade (predefinição:5000)   
     (Não definir conexão TimeoutMillis para um valor menor.)   
    &lt;conexão Nome do imóvel **manter vivo** " *verdadeiro|falso* &lt;/conexão Propriedade
    &lt;conexão Nome do imóvel **Leia o TimeoutMillis** " *um livro* &lt;/conexão Propriedade
     (O padrão de leitura da CassandraTimeoutMillis é 12000, masERDDAP™muda o padrão para 120000. Se Cassandra está jogando leituraTimeouts, aumentando isso pode não ajudar, porque Cassandra às vezes os joga antes desta vez. O problema é mais provável que você esteja armazenando muitos dados por partição Combinação de chaves.)   
    &lt;conexão Nome do imóvel **receber o tamanho do buffer** " *um livro* &lt;/conexão Propriedade
     (Não está claro o que o padrão recebeBufferSize é. Não ponhas isto num pequeno valor.)   
    &lt;conexão Nome do imóvel **Por favor.** " *um livro* &lt;/conexão Propriedade
    &lt;conexão Nome do imóvel **TcpNo.** " *verdadeiro|falso* &lt;/conexão Propriedade (default=null) 

Se você precisar definir outras propriedades de conexão, consulte nosso[seção sobre como obter suporte adicional](/docs/intro#support).

Para uma dada inicialização do Tomcat, o ConnectionProperties é usado apenas na primeira vez que um conjunto de dados é criado para uma dada URL Cassandra. Todas as recargas desse conjunto de dados e todos os conjuntos de dados subseqüentes que compartilham a mesma URL usarão essas conexões originaisProperties.
    
#### CQL{#cql} 
The Cassandra Query Language (CQL) é superficialmente como SQL, a linguagem de consulta usada por bancos de dados tradicionais. Porque...OPeNDAPOs pedidos de dados tabulares foram projetados para imitar solicitações de dados tabulares SQL, é possível paraERDDAP™para converter solicitações de dados tabulares em CQL Bound/PreparedStatements.ERDDAP™registra a declaração em[- Não.](/docs/server-admin/additional-information#log)como
declaração como texto: *O estatuto*   
A versão da declaração que você vê será uma representação de texto da declaração e só terá "?" onde os valores de restrição serão colocados.
       
Não tão simples... Infelizmente, o CQL tem muitas restriÃ§Ãμes sobre quais colunas podem ser consultadas com que tipos de constrangimentos, por exemplo, colunas de partiÃ§Ã£o podem ser constrangidas com = e IN, portantoERDDAP™envia algumas restrições para Cassandra e aplica todas as restrições depois que os dados são recebidos da Cassandra. Para ajudarERDDAP™lidar eficientemente com Cassandra, você precisa especificar [&lt;partição KeySourceNames&gt;] (#partitionkeysourcenames) ,&lt;clusterColumnSourceNames&gt;] (Nomes de fonte) E...&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames) emdatasets.xmlpara este conjunto de dados. Estas são as formas mais importantes de ajudarERDDAP™trabalhar de forma eficiente com Cassandra. Se não contaresERDDAP™esta informação, o conjunto de dados será dolorosamente lento emERDDAP™e usar toneladas de recursos Cassandra.
     
#### &lt;partição KeySourceNames &gt;{#partitionkeysourcenames} 
Porque as chaves de partição desempenham um papel central em tabelas Cassandra,ERDDAP™precisa saber a suasourceNames e, se relevante, outras informações sobre como trabalhar com eles.
* Você precisa especificar uma lista separada por vírgula de nomes de colunas de código-fonte de partição emdatasets.xmlvia via via via&lt;partição KeySourceNames&gt;.
Exemplo simples,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Exemplo mais complexo,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* Chaves de partição TimeStamp -- Se uma das colunas de partição é uma coluna de timestamp que tem uma versão mais grossa de outra coluna de timestamp, especifique isso via
     *partiçãoKeySourcName/otherColumnSourceName/time\\_precision*   
Onde?time\\_precisioné um dos[time\\_precision](#time_precision)strings usadas em outros lugaresERDDAP.
A trilha Z notime\\_precisionstring é o padrão, então não importa se otime\\_precisiontermina em Z ou não.
Por exemplo,ERDDAP™irá interpretar data / hora do almoço / 1970-01-01 como "Os conjuntos para data podem ser construídos a partir de restrições no tempo de amostra usando estetime\\_precision" A conversão real de restrições é mais complexa, mas essa é a visão geral.
     **Use isso sempre que for relevante.** PermiteERDDAP™trabalhar de forma eficiente com Cassandra. Se esta relação entre colunas existe em uma tabela Cassandra e você não contaERDDAP™, o conjunto de dados será dolorosamente lento emERDDAP™e usar toneladas de recursos Cassandra.
* Único Chaves de partição de valor -- Se queres umERDDAP™dataset para trabalhar com apenas um valor de uma chave de partição, especifique *partiçãoKeySourceName=valor* .
Não use citações para uma coluna numérica, por exemplo, deviceid=1007
Use citações para uma coluna String, por exemplo, stationid="Point Pinos"
* Dataset Default Ordenar Ordem -- A ordem da chave de partição&lt;dataVariable&gt;datasets.xmldetermina a ordem de classificação padrão dos resultados de Cassandra. Naturalmente, os usuários podem solicitar uma ordem de classificação diferente para um determinado conjunto de resultados por afinação &orderBy (" *lista de variáveis separadas por vírgula* ") até ao fim da sua consulta.
* Por padrão, Cassandra eERDDAP™tratar nomes de colunas de forma insensível. Mas se você definir[colunaNomeQuotes](#case-sensitivity)para ",ERDDAP™tratará os nomes das colunas Cassandra de uma forma sensível ao caso.
         
#### &lt;partição KeyCSV &gt;{#partitionkeycsv} 
Se isso for especificado,ERDDAP™vai usá-lo em vez de pedir Cassandra para a partição InformaÃ§Ãμes-chave cada vez que o conjunto de dados Ã© recarregado. Isso fornece a lista de valores-chave de partição distintos, na ordem em que eles serão usados. Os tempos devem ser especificados como segundos desde 1970-01T00:00:00Z. Mas há também duas maneiras alternativas especiais para especificar tempos (cada codificado como uma string) :

1) tempo (AISO8601 Tempo)   (MAY ser codificado como uma string)   
2) "tempos (anISO8601StartTime, strideSeconds, stopTime) " (Deve ser codificado como uma string)   
Pare&#33; O tempo pode ser um ISO8601 Tempo ou um "now-nUnits" tempo (por exemplo, "now-3 minutos) .
Pare&#33; O tempo não tem que ser um jogo exato do início Tempo + x strideSeconds.
Uma linha com umas vezes () valor é expandido em várias linhas antes de cada consulta, então a lista de partição As chaves podem estar sempre prontas.
Por exemplo,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
expande nesta tabela de combinações de teclas de partição:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames &gt;{#clustercolumnsourcenames} 
Cassandra aceita restrições SQL-como em colunas de cluster, que são as colunas que formam a segunda parte da chave primária (após a chave de partição (S) ) . Então, é essencial que você identifique essas colunas via&lt;clusterColumnSourceNames&gt;. Isso permiteERDDAP™trabalhar de forma eficiente com Cassandra. Se houver colunas de cluster e você não contaERDDAP, o conjunto de dados será dolorosamente lento emERDDAP™e usar toneladas de recursos Cassandra.
    * Por exemplo,&lt;clusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Se uma tabela Cassandra não tiver colunas de cluster, não especifique&lt;clusterColumnSourceNames&gt;, ou especifique-o sem valor.
    * Por padrão, Cassandra eERDDAP™tratar nomes de colunas de forma insensível. Mas se você definir[colunaNomeQuotes](#case-sensitivity)para ",ERDDAP™tratará os nomes das colunas Cassandra de uma forma sensível ao caso.
         
#### &lt;indexColumnSourceNames &gt;{#indexcolumnsourcenames} 
Cassandra aceita'='restrições em colunas de índice secundário, que são as colunas que você criou explicitamente índices para via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Sim, os parênteses são necessários.)   
Então, é muito útil se você identificar essas colunas via&lt;indexColumnSourceNames&gt;. Isso permiteERDDAP™trabalhar de forma eficiente com Cassandra. Se houver colunas de índice e você não contaERDDAP, algumas consultas serão desnecessariamente, dolorosamente lentas emERDDAP™e usar toneladas de recursos Cassandra.
* Por exemplo,&lt;indexColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Se uma tabela Cassandra não tiver colunas de índice, não especifique&lt;indexColumnSourceNames&gt;, ou especifique-o sem valor.
* Os índices Cassandra não são como índices de banco de dados. Índices Cassandra só ajudam com'='restrições. E eles são apenas[recomendado](https://cassandra.apache.org/doc/latest/cql/indexes.html)para colunas que têm muito menos valores distintos do que valores totais.
* Por padrão, Cassandra eERDDAP™tratar nomes de colunas de forma insensível. Mas se você definir[colunaNomeQuotes](#case-sensitivity)para ",ERDDAP™tratará os nomes das colunas Cassandra de uma forma sensível ao caso.
         
#### &lt;maxRequestFraction &gt;{#maxrequestfraction} 
QuandoERDDAP™  (re) carrega um conjunto de dados,ERDDAP™recebe de Cassandra a lista de combinações distintas das teclas de partição. Para um conjunto de dados enorme, o número de combinações será enorme. Se você quiser evitar que os pedidos dos usuários solicitem a maioria ou todo o conjunto de dados (ou mesmo um pedido que pedeERDDAP™para baixar a maioria ou todos os dados, a fim de filtrar ainda mais) Você pode dizerERDDAP™apenas para permitir solicitações que reduzem o número de combinações por algum valor através&lt;maxRequestFraction&gt;, que é um número de ponto flutuante entre 1e-10 (o que significa que o pedido não pode precisar de mais de 1 combinação em um bilhão) e 1 (o padrão, o que significa que a solicitação pode ser para todo o conjunto de dados) .
Por exemplo, se um conjunto de dados tem 10000 combinações distintas das teclas de partição e maxRequestFraction é definido para 0.1,
então solicitações que precisam de dados de 1001 ou mais combinações gerarão uma mensagem de erro,
mas solicitações que precisam de dados de 1000 ou menos combinações serão permitidas.
    
Geralmente, quanto maior o conjunto de dados, menor você deve definir&lt;maxRequestFraction&gt;. Então você pode configurá-lo para 1 para um pequeno conjunto de dados, 0,1 para um conjunto de dados de tamanho médio, 0,01 para um grande conjunto de dados e 0,0001 para um conjunto de dados enorme.
    
Esta abordagem está longe de ser perfeita. Isso levará a alguns pedidos razoáveis sendo rejeitados e alguns pedidos demasiado grandes sendo permitidos. Mas é um problema difícil e esta solução é muito melhor do que nada.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Como com outros conjuntos de dados EDDTable, você pode especificar uma lista separada por vírgulas&lt;dataVariable&gt;destinationNames em um atributo global chamado "[subsetVariables](#subsetvariables)" identificar variáveis que tenham um número limitado de valores. O conjunto de dados terá então uma página web .subset e mostrará listas de valores distintos para essas variáveis em listas suspensas em muitas páginas da web.
    
Incluindo apenas variáveis de partição e colunas estáticas na lista é STRONGLY ENCOURAGED. Cassandra será capaz de gerar a lista de combinações distintas muito rapidamente e facilmente cada vez que o conjunto de dados é recarregado. Uma exceção é chaves de partição do timestamp que são versões grossas de alguma outra coluna do timestamp -- é provavelmente melhor deixá-los fora da lista desubsetVariablesuma vez que há um grande número de valores e eles não são muito úteis para os usuários.
    
Se você incluir a chave não-partição, variáveis não-estáticas na lista, provavelmente será **Muito bem.** computacionalmente caro para Cassandra cada vez que o conjunto de dados é recarregado, porqueERDDAP™tem que olhar através de cada linha do conjunto de dados para gerar as informações. Na verdade, a consulta provavelmente falhará. Assim, exceto para conjuntos de dados muito pequenos, este é STRONGLY DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Porque há alguma ambiguidade sobre a qual[Tipos de dados Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html)mapa a queERDDAP™tipos de dados, você precisa especificar um [&lt;dataType&gt;] (# Datatype #) tag para cada [&lt;dataVariable&gt; (#datavariable) para contarERDDAP™que dataType usar. O padrãoERDDAP™dados Tipos (e os tipos de dados Cassandra mais comuns correspondentes) são:
    
*   [booleano](#boolean-data)  (booleano) , queERDDAP™então armazena como bytes
* bytes (int, se o intervalo for -128 a 127) 
* curto (int, se o intervalo for -32768 a 32767) 
* - Não. (int, contador?, varint?, se o intervalo for -2147483648 para 2147483647) 
* longo (bigint, contra?, varint?, se o intervalo for -92233720368575808 a 92233720368575807) 
* flutuar (flutuar) 
* duplo (duplo, decimal (com possível perda de precisão) , timestamp) 
* Charlie. (ascii ou texto, se eles nunca têm mais de 1 caractere) 
* String (ascii, texto, varchar, inet, uuid, timeuuid, blob, mapa, conjunto, lista?) 

Cassandra[vezes](#cassandra-timestamp-data)é um caso especial: usoERDDAPDados duplos Tipo.

Se você especificar um string dataType emERDDAP™para um mapa Cassandra, conjunto ou lista, o mapa, conjunto ou lista em cada linha Cassandra será convertido para uma única string em uma única linha naERDDAP™mesa.ERDDAP™tem um sistema alternativo para listas; veja abaixo.

 *tipo* Listas...ERDDAPÉ...&lt;dataType&gt;] (# Datatype #) tag para CassandradataVariables pode incluir o regularERDDAP™dados Tipos (ver acima) mais vários dataTypes especiais que podem ser usados para colunas de lista Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Quando uma dessas colunas de lista está nos resultados que estão sendo passados paraERDDAP™, cada linha de dados de origem será expandida para lista. tamanho () linhas de dados emERDDAP; dados simples Tipos (por exemplo,) nessa linha de dados de origem será lista duplicada. tamanho () tempos. Se os resultados contiverem mais de uma variável lista, todas as listas em uma determinada linha de dados DEVE ter o mesmo tamanho e DEVE ser listas "paralelas", ouERDDAP™gerará uma mensagem de erro. Por exemplo, para medições de correntes de um ADCP,
profundidade\\[0\\], u\\[0\\], vCurrent\\[0\\]e zCurrent\\[0\\]são todos relacionados, e
profundidade\\[1\\], u\\[1\\], vCurrent\\[1\\]e zCurrent\\[1\\]estão todos relacionados, ...
Alternativamente, se você não quiserERDDAP™para expandir uma lista em várias linhas noERDDAP™tabela, especifique String como odataVariableDados Digite assim a lista inteira será representada como uma corda em uma linha emERDDAP.
    
#### Dados da Cassandra TimeStamp{#cassandra-timestamp-data} 
Os dados do timestamp da Cassandra estão sempre conscientes dos fusos horários. Se você inserir dados do timestamp sem especificar um fuso horário, Cassandra assume que o timestamp usa o fuso horário local.
    
ERDDAP™suporta dados do timestamp e sempre apresenta os dados noZulu/GMT fuso horário. Então, se você inserir dados do timestamp em Cassandra usando um fuso horário diferente deZulu/GMT, lembre-se de que você precisa fazer todas as consultas para dados do timestamp emERDDAP™usando oZulu/GMT fuso horário. Então não se surpreenda quando os valores do timestamp que saem deERDDAPsão deslocados por várias horas por causa do interruptor de fuso horário de local paraZulu- Hora da GMT.

* EmERDDAP'datasets.xml, no&lt;dataVariable&gt; tag para uma variável timestamp, conjunto
```
          <dataType>double</dataType>  
```
e em&lt;addAttributesConjunto
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugestão: Se os dados são um intervalo de tempo, é útil ter os valores do timestamp referem-se ao centro do intervalo de tempo implícito (por exemplo, noon) . Por exemplo, se um usuário tem dados para 2010-03-26T13:00Z de outro conjunto de dados e eles querem os dados mais próximos deste conjunto de dados Cassandra que tem dados para cada dia, em seguida, os dados para 2010-03-26T12:00Z (representando dados Cassandra para essa data) é obviamente o melhor (em oposição à meia-noite antes ou depois, onde é menos óbvio que é melhor) .
*   ERDDAP™tem um utilitário para[Converter um numérico Tempo para / de um tempo de corda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Ver[Como?ERDDAP™Lidas com o tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Nulls inteiros{#integer-nulls} 
Cassandra suporta nulls em Cassandra int (ERDDAP™- Não.) e grande (ERDDAP™longo) colunas, masERDDAP™não suporta nulas verdadeiras para qualquer tipo de dados inteiro.
Por padrão, as nulas de inteiro Cassandra serão convertidas emERDDAP™para 2147483647 para colunas int, ou 9223372036854775807 para colunas longas. Estes aparecerão como "NaN" em alguns tipos de arquivos de saída de texto (por exemplo, .csv) , "" em outros tipos de arquivos de saída de texto (por exemplo,.htmlTable) , e o número específico (2147483647 para valores int ausentes) em outros tipos de arquivos (por exemplo, arquivos binários como.nce esteira) . Um usuário pode procurar por linhas de dados com esse tipo de valor ausente, referindo-se a "NaN", por exemplo, "&windSpeed=NaN".
    
Se você usar algum outro valor inteiro para indicar valores ausentes em sua tabela Cassandra, por favor, identifique esse valor emdatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Para colunas de ponto flutuante Cassandra, nulls são convertidos para NaNs emERDDAP. Para tipos de dados Cassandra que são convertidos para Strings emERDDAP™, nulls se convertem em Strings vazios. Isso não deve ser um problema.
    
#### "WARNING: Re-preparing já preparado consulta"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Re-preparing já preparado consulta" em *Toca a brincar.* /logs/catalina.out (ou algum outro arquivo de log Tomcat)   
A documentação da Cassandra diz que há problemas se a mesma consulta for feita em um PreparedStatement duas vezes (ou mais) . (Veja isto[Relatório de bug](https://datastax-oss.atlassian.net/browse/JAVA-236).) Para evitar fazer Cassandra louco,ERDDAP™caches todos os estados preparados para que ele possa reutilizá-los. Esse cache é perdido se/quando Tomcat/ERDDAP™é reiniciado, mas eu acho que está tudo bem porque os estados preparados estão associados a uma dada sessão (entreJavae Cassandra) , que também está perdido. Então, você pode ver essas mensagens. Não sei outra solução. Felizmente, é um aviso, não um erro (embora Cassandra ameaça que pode levar a problemas de desempenho) .
    
Cassandra afirma que os estados preparados são bons para sempre, entãoERDDAPOs estados preparados em cache nunca devem ficar fora de data/inválidos. Se isso não é verdade, e você tem erros sobre certos estados preparados sendo fora de data / inválido, então você precisa reiniciarERDDAP™para limparERDDAPO cache dos estados preparados.
    
#### Segurança Cassandra{#cassandra-security} 
Ver[Protegendo Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Ao trabalhar com Cassandra, você precisa fazer as coisas com segurança e segurança, o mais seguro possível para evitar permitir que um usuário malicioso danifique sua Cassandra ou obtenha acesso aos dados que eles não devem ter acesso.ERDDAP™tenta fazer as coisas de uma forma segura, também.

* Nós encorajamos você a configurarERDDAP™para se conectar a Cassandra como um usuário Cassandra que só tem acesso ao **relevante** mesa de mesa (S) e só tem privilégios LER.
* Nós encorajamos você a configurar a conexão deERDDAP™para Cassandra para que
    * sempre usa SSL,
    * somente permite conexões de um endereço IP (ou um bloco de endereços) e de umERDDAP™usuário e
    * apenas transfere senhas em seu formulário de hasshed MD5.
*   \\[PROBLEMAS CONHECIDOS\\]A conexãopropriedades (incluindo a senha&#33;) são armazenados como texto simples emdatasets.xml. Não encontramos uma maneira de permitir ao administrador inserir a senha Cassandra duranteERDDAP's startup in Tomcat (que ocorre sem entrada do usuário) , então a senha deve ser acessível em um arquivo. Para tornar isso mais seguro:
    * Tu. (oERDDAP™administrador) deve ser o proprietário dedatasets.xmle têm acesso READ e WRITE.
    * Faça um grupo que inclua apenas user=tomcat. Use chgrp para fazer que o grupo paradatasets.xml, com apenas privilégios LER.
    * Use chmod para atribuir privilégios o-rwx (não LER ou WRITE acesso para "outros" usuários) paradatasets.xml.
* Quando entrarERDDAP™, a senha e outras propriedades de conexão são armazenadas em "privado"Javavariáveis.
* Os pedidos dos clientes são analisados e verificados para validade antes de gerar os pedidos CQL para Cassandra.
* Os pedidos de Cassandra são feitos com CQL Bound/PreparedStatements, para evitar a injeção de CQL. Em qualquer caso, Cassandra é inerentemente menos suscetível à injeção de CQL do que bancos de dados tradicionais são para[Injeção de SQL](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Velocidade de Cassandra{#cassandra-speed} 
A Cassandra pode ser rápida ou lenta. Há algumas coisas que você pode fazer para torná-lo rápido:
* Em geral -
A natureza do CQL é que as consultas são[declarativa](https://en.wikipedia.org/wiki/Declarative_programming). Eles apenas especificam o que o usuário quer. Eles não incluem uma especificação ou dicas para como a consulta deve ser tratada ou otimizada. Então não há maneira deERDDAP™para gerar a consulta de tal forma que ajuda Cassandra otimizar a consulta (ou de qualquer forma especifica como a consulta deve ser tratada) . Em geral, cabe ao administrador Cassandra configurar as coisas (por exemplo, índices) para otimizar para certos tipos de consultas.
     
* Especificando as colunas do timestamp que estão relacionadas com as teclas de partição do timestamp do coarser-precision via [&lt;partição KeySourceNames&gt;] (#partitionkeysourcenames) é a maneira mais importante de ajudarERDDAP™trabalhar de forma eficiente com Cassandra. Se este relacionamento existe em uma mesa Cassandra e você não contaERDDAP™, o conjunto de dados será dolorosamente lento emERDDAP™e usar toneladas de recursos Cassandra.
     
* Especificando as colunas de cluster através de [&lt;clusterColumnSourceNames&gt;] (Nomes de fonte) é a segunda maneira mais importante de ajudarERDDAP™trabalhar de forma eficiente com Cassandra. Se houver colunas de cluster e você não contaERDDAP, um grande subconjunto das possíveis consultas para dados será desnecessariamente, dolorosamente lento emERDDAP™e usar toneladas de recursos Cassandra.
     
* Fazer[Índices](https://cassandra.apache.org/doc/latest/cql/indexes.html)para Variáveis Comunicamente Restritas --
Você pode acelerar algumas consultas criando índices para colunas Cassandra que muitas vezes são limitados com restrições "=".
    
Cassandra não pode fazer índices para lista, definir ou mapear colunas.
    
* Especificando as colunas de índice através de [&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames) é uma maneira importante de ajudarERDDAP™trabalhar de forma eficiente com Cassandra. Se houver colunas de índice e você não contaERDDAP, algumas consultas para dados serão desnecessariamente, dolorosamente lentas emERDDAP™e usar toneladas de recursos Cassandra.
     
#### Cassandra Stats{#cassandra-stats} 
*   [Mensagens diagnósticas "Cassandra stats"](#cassandra-stats)- ... Para cadaERDDAP™consulta de usuário para um conjunto de dados Cassandra,ERDDAP™imprimirá uma linha no arquivo de log, *Diretriz de grande porte* /logs/log.txt, com algumas estatísticas relacionadas à consulta, por exemplo,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Usando os números no exemplo acima, isso significa:

* QuandoERDDAP™último (re) carregou este conjunto de dados, disse CassandraERDDAP™que havia 10000 combinações distintas das chaves de partição.ERDDAP™cacheou todas as combinações distintas em um arquivo.
* Devido às restrições do usuário,ERDDAP™identificou 2 combinações dos 10000 que podem ter os dados desejados. Então...ERDDAP™fará 2 chamadas para Cassandra, uma para cada combinação das teclas de partição. (É o que a Cassandra exige.) Claramente, é problemático se um grande conjunto de dados tem um grande número de combinações das chaves de partição e uma determinada solicitação não reduz drasticamente isso. Você pode exigir que cada pedido reduza o espaço chave através da configuração [&lt;maxRequestFraction&gt;] (#maxrequestfraction) . Aqui, 2/10000=2e-4, que é menos do que o maxRequestFraction (0.1) , então o pedido foi permitido.
* Depois de aplicar as restrições nas teclas de partição,[colunas de cluster](#clustercolumnsourcenames)e[colunas de índice](#indexcolumnsourcenames)que foram enviados porERDDAP™, Cassandra retornou 1200 linhas de dados paraERDDAP™no Resultado.
* O resultado conjunto deve ter sido[dados Tipo... *algum tipo* Lista](#cassandra-datatypes)colunas (com uma média de 10 itens por lista) PorqueERDDAP™expandiu as 1200 linhas de Cassandra em 12000 linhas emERDDAP.
*   ERDDAP™sempre aplica todas as restrições do usuário aos dados da Cassandra. Neste caso, as restrições que Cassandra não tinha tratado reduziram o número de linhas para 7405. Esse é o número de linhas enviadas para o usuário.

O uso mais importante dessas mensagens de diagnóstico é certificar-se de queERDDAP™está fazendo o que você acha que está fazendo. Se não for (por exemplo, não está reduzindo o número de combinações distintas como esperado?) , então você pode usar as informações para tentar descobrir o que está errado.
 
* Pesquisa e experiência para encontrar e definir melhor [&lt;conexãoProperty&gt;] (#cassandra-connectionproperty) 's.
 
* Verifique a velocidade da conexão de rede entre Cassandra eERDDAP. Se a conexão for lenta, veja se você pode melhorá-la. A melhor situação é quandoERDDAP™está em execução em um servidor anexado ao mesmo (rápido) mudar como o servidor executando o nó Cassandra para o qual você está conectando.
 
* Por favor, seja paciente. Leia as informações aqui e na documentação Cassandra cuidadosamente. Experimento. Vê o teu trabalho. Se a Cassandra...ERDDAP™conexão ainda é mais lenta do que você espera, inclua o esquema da sua mesa Cassandra e seuERDDAP™pedaço dedatasets.xmle ver o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
 
* Se tudo o resto falhar,
considerar armazenar os dados em uma coleção deNetCDFv3.ncarquivos (especialmente.ncarquivos que usam[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Estruturas de dados Ragged Array contíguas e assim pode ser tratada comERDDAP'[EDDTable FromNcCFFiles](#eddtablefromnccffiles)) . Se eles são logicamente organizados (cada um com dados para um pedaço de espaço e tempo) ,ERDDAP™pode extrair dados deles muito rapidamente.
         
#### EDDTable FromCasandra esqueleto XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable FromDapSequence{#eddtablefromdapsequence} 
[ **EDDTable FromDapSequence** ](#eddtablefromdapsequence)manipula variáveis dentro de seqüências de 1 e 2 níveis de[DAP](https://www.opendap.org/)servidores comoDAPPERGUNTA (no https://www.pmel.noaa.gov/epic/software/dapper/ , agora descontinuado) .

* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo. Você pode coletar as informações que você precisa, olhando para os arquivos DDS e DAS do conjunto de dados de origem em seu navegador ( adicionando .das e .dds aosourceUrl(um exemplo foi https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* Uma variável está emDAPse a resposta .dds indica que a estrutura de dados que segura a variável é uma "sequência" (caso insensível) .
* Em alguns casos, você verá uma sequência dentro de uma sequência, uma sequência de 2 níveis - EDDTableFromDapSequence lida com isso também.
#### EDDTable FromDapSequence esqueleto XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTable FromDatabase{#eddtablefromdatabase} 
[ **EDDTable FromDatabase** ](#eddtablefromdatabase)lida com dados de uma tabela de banco de dados relacional ou[vista](https://en.wikipedia.org/wiki/View_(database)).

#### Uma Tabela ou Vista{#one-table-or-view} 
Se os dados que você deseja servir estão em duas ou mais tabelas (e assim precisa de um JOIN para extrair dados de ambas as tabelas ao mesmo tempo) , você precisa fazer um[denormalização](https://en.wikipedia.org/wiki/Denormalization)  (já se juntou) tabela ou[vista](https://en.wikipedia.org/wiki/View_(SQL)) com todos os dados que você deseja disponibilizar como um conjunto de dadosERDDAP.

Para bases de dados grandes e complexas, pode fazer sentido separar vários pedaços como tabelas desnormalizadas, cada um com um tipo diferente de dados, que se tornará conjuntos de dados separados emERDDAP.

Fazer uma tabela desnormalizada para uso emERDDAP™Pode parecer uma ideia maluca para ti. Por favor, confia em nós. Há várias razões por queERDDAP™trabalhos com tabelas desnormalizadas:

* É muito mais fácil para os usuários.
QuandoERDDAP™apresenta o conjunto de dados como uma, simples, denormalizada, tabela única, é muito fácil para qualquer pessoa entender os dados. A maioria dos usuários nunca ouviu falar de tabelas normalizadas, e muito poucos entendem chaves, chaves estrangeiras, ou tabela se junta, e quase certamente não sabem os detalhes dos diferentes tipos de junções, ou como especificar o SQL para fazer uma união (ou múltiplas uniões) corretamente. Usar uma tabela desnormalizada evita todos esses problemas. Esta razão justifica apenas o uso de uma tabela única desnormalizada para a apresentação de um conjunto de dados paraERDDAP™usuários.
     
* Mesas normalizadas (várias tabelas relacionadas por colunas-chave) são ótimos para armazenar dados em um banco de dados.
Mas mesmo em SQL, o resultado que é retornado ao usuário é desnormalizado (se juntar) mesa única. Então parece razoável apresentar o conjunto de dados aos usuários como uma tabela única enorme, desnormalizada, da qual eles podem então solicitar subconjuntos (por exemplo, me mostre linhas da tabela onde a temperatura&gt; 30) .
     
* Você pode fazer alterações paraERDDAP™sem mudar suas mesas.
    ERDDAP™tem alguns requisitos que podem ser diferentes de como você configurou seu banco de dados.
Por exemplo,ERDDAP™requer que os dados do timestamp sejam armazenados em campos "timestamp com fuso horário".
Fazendo uma tabela/visão separada paraERDDAP™, você pode fazer essas mudanças quando você faz a tabela denormalizada paraERDDAP. Assim, você não precisa fazer nenhuma mudança em suas tabelas.
     
*   ERDDAP™recriará algumas das estruturas das tabelas normalizadas.
Você pode especificar quais colunas de dados vêm das tabelas 'outro' e, portanto, tem um número limitado de valores distintos.ERDDAP™irá recolher todas as diferentes combinações de valores nestas colunas e apresentá-los aos usuários em um especial . subset página web que ajuda os usuários a selecionar rapidamente subconjuntos do conjunto de dados. Os valores distintos para cada coluna também são mostrados em listas suspensas nas outras páginas do conjunto de dados.
     
* Uma tabela desnormalizada faz com que os dados sejam entregues de você para oERDDAPAdministrador fácil.
Você é o especialista para este conjunto de dados, então faz sentido que você tome as decisões sobre quais tabelas e quais colunas para se juntar e como se juntar a eles. Então não tens de nos entregar. (ou pior, os usuários finais) várias tabelas e instruções detalhadas para como se juntar a eles, você só tem que nos dar acesso à tabela denormalizada.
     
* Uma tabela desnormalizada permite um acesso eficiente aos dados.
A forma desnormalizada é geralmente mais rápida de acesso do que a forma normalizada. Juntas podem ser lentas. As múltiplas uniões podem ser muito lentas.
     

Para obter os dados de duas ou mais tabelas no banco de dadosERDDAP™, há três opções:
 

* Opção recomendada:
Você pode criar um arquivo de valor de vírgula ou separador com os dados da tabela desnormalizada.
Se o conjunto de dados é enorme, então faz sentido criar vários arquivos, cada um com um subconjunto coeso da tabela desnormalizada (por exemplo, dados de um intervalo de tempo menor) .
    
A grande vantagem aqui é queERDDAP™será capaz de lidar com solicitações de usuário para dados sem qualquer esforço adicional pelo seu banco de dados. Então...ERDDAP™Não será um fardo na sua base de dados ou um risco de segurança. Esta é a melhor opção em quase todas as circunstâncias porqueERDDAP™geralmente pode obter dados de arquivos mais rápido do que de um banco de dados (se convertermos os arquivos .csv para.ncArquivos CF) . (Parte da razão é queERDDAP+files é um sistema somente leitura e não precisa lidar com fazer mudanças ao fornecer[ACIDENTE](https://en.wikipedia.org/wiki/ACID)  (Atômica, Consistência, Isolamento, Durabilidade) .) Além disso, você provavelmente não precisará de um servidor separado, pois podemos armazenar os dados em um de nossos RAIDs e acessá-lo com um existenteERDDAP™em um servidor existente.
    
* Ok Opção:
Você configurou um novo banco de dados em um computador diferente com apenas a tabela desnormalizada.
Uma vez que esse banco de dados pode ser um banco de dados de código livre e aberto como MariaDB, MySQL e PostgreSQL, esta opção não precisa custar muito.
    
A grande vantagem aqui é queERDDAP™será capaz de lidar com solicitações de usuário para dados sem qualquer esforço adicional pelo seu banco de dados atual. Então...ERDDAP™Não será um fardo na sua base de dados actual. Isso também elimina muitas preocupações de segurança desdeERDDAP™não terá acesso ao seu banco de dados atual.
    
* Opção desactivada:
Podemos ligarERDDAP™para o seu banco de dados atual.
Para fazer isso, você precisa:
    
    * Crie uma tabela separada ou vista com a tabela denormalizada de dados.
    * Criar um usuário "erddap" que tenha acesso somente leitura a apenas a tabela denormalizada (S) .
         
    
Esta é uma opção se os dados mudam muito frequentemente e você quer darERDDAP™usuários acesso instantâneo a essas mudanças; no entanto, mesmo assim, pode fazer sentido usar a opção de arquivo acima e periodicamente (a cada 30 minutos?) substituir o arquivo que tem os dados de hoje.
As enormes desvantagens desta abordagem são queERDDAP™solicitações de usuários provavelmente colocarão um fardo insuportavelmente grande em seu banco de dados e que oERDDAP™conexão é um risco de segurança (embora possamos minimizar/gerir o risco) .

Fazendo a tabela denormalizada ou vista paraERDDAP™é uma boa oportunidade para fazer algumas mudanças queERDDAP™necessidades, de uma forma que não afeta suas tabelas originais:

* Mude a data e os campos/colunas do timestamp para usar os dadosTipo que os Correios chamam[timestamp com fuso horário](#database-date-time-data)  (ou o equivalente em seu banco de dados) .
Os timestamps sem informações do fuso horário não funcionam corretamente emERDDAP.
* Faça índices para as colunas que os usuários frequentemente pesquisam.
* Estar muito consciente de[o caso dos nomes de campo/coluna](#quotes-for-names-and-case-sensitivity)  (por exemplo, use todos os minúsculos) quando você digitá-los.
* Não use palavras reservadas para a tabela e para os nomes de campo/coluna.

Se você precisar de ajuda para fazer a tabela ou visualização desnormalizada, entre em contato com o administrador do banco de dados.
Se você quiser falar sobre toda essa abordagem ou estrategizar como melhor fazê-lo, por favor envie um e-mail para Chris. John em noaaa.gov .
    
#### banco de dados emdatasets.xml {#database-in-datasetsxml} 
É difícil criar o corretodatasets.xmlinformações necessárias paraERDDAP™estabelecer uma conexão com a base de dados. Sê paciente. Seja metódico.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
        
Gerar conjuntos de dados Xml tem três opções especiais para EDDTableFromDatabase:
1. Se você entrar "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sem as citações) para o nome do catálogo, o programa exibirá uma lista dos nomes do catálogo.
2. Se você entrar "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sem as citações) para o nome de esquema, o programa irá exibir uma lista dos nomes de esquema.
3. Se você entrar "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (sem as citações) para o nome da tabela, o programa exibirá uma lista de tabelas e suas colunas. A primeira entrada "&#33;&#33;&#33;LIST&#33;&#33;&#33;" que você faz é a que será usada.
* Leia cuidadosamente todas as informações deste documento sobre EDDTableFromDatabase.
* Você pode coletar a maioria das informações que você precisa para criar o XML para um conjunto de dados EDDTableFromDatabase, contatando o administrador do banco de dados e pesquisando a web.
* Embora os bancos de dados muitas vezes tratem nomes de colunas e nomes de tabela de uma forma insensível a casos, eles são sensíveis a casos emERDDAP. Então, se uma mensagem de erro do banco de dados diz que um nome de coluna é desconhecido (por exemplo, "Unknown identificador= ' *coluna\\_nome* ') mesmo sabendo que existe, tente usar todas as capitais, por exemplo, *COLUMN* , que é muitas vezes a versão verdadeira, sensível a caso do nome da coluna.
* Trabalhe em estreita colaboração com o administrador do banco de dados, que pode ter experiência relevante. Se o conjunto de dados não carregar, leia o[mensagem de erro](#troubleshooting-tips)cuidadosamente para descobrir o porquê.
         
#### Driver JDBC{#jdbc-driver} 
* [JDBC Driver e&lt;driverName&gt; (#jdbc-driver) - ... Você deve obter o arquivo JDBC 3 ou JDBC 4 apropriado para o seu banco de dados e
Ponham-no. *Toca a brincar.* /webapps/erddap/WEB-INF/lib depois de instalarERDDAP. Então, em seudatasets.xmlpara este conjunto de dados, você deve especificar o&lt;driverName&gt; para este driver, que é (Infelizmente,) diferente do nome do arquivo. Pesquisar na web para o driver JDBC para o seu banco de dados e o driverNome queJavaprecisa usá-lo.
    
    * Para MariaDB, tente[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
O&lt;driverNome&gt; para usar emdatasets.xml  (ver abaixo) é provavelmente org.mariadb.jdbc. Driver.
    * Para MySQL e Amazon RDS, tente[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
O&lt;driverNome&gt; para usar emdatasets.xml  (ver abaixo) provavelmente é com.mysql.jdbc. Driver.
    * ParaOracleTenta[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
O&lt;driverNome&gt; para usar emdatasets.xml  (ver abaixo) é provavelmente oracle.jdbc.driver.OracleDriver.
    * Para Postgresql, temos o driver JDBC 4 de[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
O&lt;driverNome&gt; para usar emdatasets.xml  (ver abaixo) é provavelmente org.postgresql. Driver.
    * Para SQL Server, você pode obter o driver JTDS JDBC de[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
O&lt;driverNome&gt; para usar emdatasets.xml  (ver abaixo) é provavelmente net.sourceforge.jtds.jdbc. Driver.
    
Depois de colocar o driver JDBC .jar emERDDAP™lib diretório, você precisa adicionar uma referência a esse arquivo .jar nos arquivos de script .bat e/ou .sh para GerarDatasets Xml, DasDds e ArchiveADataset que estão no *Toca a brincar.* /webapps/erddap/WEB-INF/ diretório; caso contrário, você receberá um ClassNotFoundException quando executar esses scripts.
    
Infelizmente, o JDBC Ã© por vezes a fonte de problemas. No seu papel de intermediário entreERDDAP™e o banco de dados, às vezes faz mudanças sutis no banco de dados padrão/genérico SQL solicitar queERDDAP™cria, causando problemas (por exemplo, relacionados com[identificadores de maiúscula / minúscula](#quotes-for-names-and-case-sensitivity)e relacionados com[data/hora fusos horários](#database-date-time-data)) . Por favor, seja paciente, leia as informações aqui cuidadosamente, verifique o seu trabalho e veja nosso[seção sobre como obter suporte adicional](/docs/intro#support).
    
#### Banco de dados&lt;conexão Propriedade &gt;{#database-connectionproperty} 
* Não.&lt;conexãoProperty&gt;] (#database-connectionproperty) - ... Nodatasets.xmlpara seu conjunto de dados, você deve definir várias conexões etiquetas de propriedade para contarERDDAP™como se conectar ao seu banco de dados (por exemplo, para especificar o nome de usuário, senha, conexão ssl e[tamanho de busca](#set-the-fetch-size)) . Estes são diferentes para cada situação e são um pouco difíceis de descobrir. Procure na web exemplos de usar um driver JDBC para se conectar ao seu banco de dados. O&lt;conexãoProperty&gt; nomes (por exemplo, "usuário", "password", e "sl") , e alguns dos valores de conexãoProperty podem ser encontrados procurando na web para "propriedades de conexão JDBC *banco de dados Tipo* " (por exemplo,Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Citações para Nomes e Sensibilidade de Caso{#quotes-for-names-and-case-sensitivity} 
*   [Citações para nomes de campo/cor; Sensibilidade de caso](#quotes-for-names-and-case-sensitivity)- Por padrão, EDDTableFromDatabase coloca aspas duplas padrão ANSI-SQL em torno de nomes de campo / coluna em declarações SELECT, caso você tenha usado uma palavra reservada como nome de campo / coluna, ou um caracter especial em um nome de campo / coluna. As citações duplas também frustram certos tipos de ataques de injeção SQL. Você pode dizerERDDAP™para usar ", ', ou nenhuma cotação via&lt;colunaNomeQuotes&gt; emdatasets.xmlpara este conjunto de dados.
    
Para muitos bancos de dados, usar qualquer tipo de citações faz com que o banco de dados trabalhe com nomes de campo/coluna de uma forma sensível ao caso (em vez da forma insensível do caso de banco de dados padrão) . Os bancos de dados geralmente exibem nomes de arquivo/coluna como todos os casos superiores, quando na realidade a forma sensível do caso é diferente. EmERDDAP™, por favor, sempre trate nomes de colunas de banco de dados como caso sensível.
    
    * Pela Maria DB, você precisa executar o banco de dados com[\\--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * Para MySQL e Amazon RDS, você precisa executar o banco de dados com[\\--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oraclesuporta aspas duplas padrão ANSI-SQL[por padrão](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL suporta aspas duplas padrão ANSI-SQL por padrão.
    
      
Não use uma palavra reservada para um banco de dados, catálogo, esquema ou nome da tabela.ERDDAP™não coloca citações à sua volta.
    
Se possível, use todos os casos inferiores para banco de dados, catálogo, esquema, nomes de tabelas e nomes de campo ao criar a tabela de banco de dados (ou vista) e quando se referem aos nomes de campo/coluna emdatasets.xmlemERDDAP. Caso contrário, você pode obter uma mensagem de erro dizendo que o banco de dados, catálogo, esquema, tabela e / ou campo não foi encontrado. Se você receber essa mensagem de erro, tente usar a versão sensível ao caso, a versão em maiúscula e a versão em minúscula do nomeERDDAP. Um deles pode funcionar. Se não, você precisa alterar o nome do banco de dados, catálogo, esquema e / ou tabela para todos os minúsculos.
    
#### Banco de dados&lt;dados Tipo &gt;{#database-datatype} 
*   [Banco de dados](#database-datatype)Não.&lt;dataType&gt;] (# Datatype #) Etiquetas... Porque há alguma ambiguidade sobre a qual[tipos de dados de banco de dados](https://www.w3schools.com/sql/sql_datatypes_general.asp)mapa a queERDDAP™tipos de dados, você precisa especificar um [&lt;dataType&gt;] (# Datatype #) tag para cada [&lt;dataVariable&gt; (#datavariable) para contarERDDAP™que dataType usar. Parte do problema é que diferentes conjuntos de dados usam termos diferentes para os vários tipos de dados -- então sempre tente combinar as definições, não apenas os nomes. Veja a descrição do[padrãoERDDAP™dados Tipos](#data-types), que inclui referências aos tipos de dados SQL correspondentes.[Data e timestamp](#database-date-time-data)são casos especiais: usoERDDAPDados duplos Tipo.
     
#### Data de início{#database-date-time-data} 
Algumas colunas de data de banco de dados não têm fuso horário explícito. Tais colunas são problemas paraERDDAP. Bancos de dados suportam o conceito de uma data (com ou sem tempo) sem um fuso horário, como uma gama aproximada de tempo. Mas...Java  (e assimERDDAP) só lida com data + hora instantânea com um fuso horário. Então você pode saber que os dados do horário de data são baseados em um fuso horário local (com ou sem horário de verão) ou o GMT/Zulufuso horário, masJava  (eERDDAP) Não. Nós originalmente pensamos que poderíamos trabalhar em torno deste problema (por exemplo, especificando um fuso horário para a coluna) , mas o banco de dados+JDBC+Javainterações fizeram desta uma solução não confiável.
* Então...ERDDAP™requer que você armazene todos os dados de data e data na tabela de banco de dados com um tipo de dados de banco de dados que corresponde ao tipo JDBC "timestamp com fuso horário" (idealmente, que usa o GMT/Zulufuso horário) .
* EmERDDAP'datasets.xml, no&lt;dataVariable&gt; tag para uma variável timestamp, conjunto
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

e em&lt;addAttributesConjunto
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Sugestão: Se os dados são um intervalo de tempo, é útil ter os valores do timestamp referem-se ao centro do intervalo de tempo implícito (por exemplo, noon) . Por exemplo, se um usuário tem dados para 2010-03-26T13:00Z de outro conjunto de dados e eles querem os dados mais próximos de um conjunto de dados de banco de dados que tem dados para cada dia, em seguida, os dados do banco de dados para 2010-03-26T12:00Z (representando dados para essa data) é obviamente o melhor (em oposição à meia-noite antes ou depois, onde é menos óbvio que é melhor) .
*   ERDDAP™tem um utilitário para[Converter um numérico Tempo para / de um tempo de corda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Ver[Como?ERDDAPLidas com o tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Nulls inteiros{#integer-nulls-1} 
Bancos de dados suportam nulls em inteiro (int, smallint, smallint) colunas, masERDDAP™não suporta nulas verdadeiras.
Nulls de banco de dados serão convertidos emERDDAP™127 para colunas byte, 255 para colunas ubyte, 32767 para colunas curtas, 65535 para colunas ushort, 2147483647 para colunas int, 4294967295 para colunas uint, 9,223,372,036,854,775,807 para colunas longas, ou 18446744073709551615 para colunas ulongas. Se você usar esses padrões, identifique osmissing\\_values para os usuários do conjunto de dados emERDDAP™com

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

ou

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Alternativamente, você pode usar o "missing\\_value« atributo em vez de "\\_FillValue".
Gerar conjuntos de dados Xml adiciona automaticamente esses atributos \\_FillValue quando gera o sugeridodatasets.xmlpara conjuntos de dados de banco de dados.

Para colunas de ponto flutuante de banco de dados, nulls são convertidos para NaNs emERDDAP.
Para tipos de dados de banco de dados que são convertidos para strings emERDDAP™, nulls se convertem em Strings vazios.
    
#### Segurança da base de dados{#database-security} 
* Ao trabalhar com bancos de dados, você precisa fazer as coisas com segurança e segurança para evitar permitir que um usuário malicioso danifique seu banco de dados ou obtenha acesso aos dados que não devem ter acesso.ERDDAP™tenta fazer as coisas de uma forma segura, também.
    * Considere replicar, em um computador diferente, as tabelas de banco de dados e banco de dados com os dados que você desejaERDDAP™servir. (Sim, para bancos de dados comerciais comoOracle, isso envolve taxas de licenciamento adicionais. Mas para bases de dados de código aberto, como PostgreSQL, MySQL, Amazon RDS e MariaDB, isso não custa nada.) Isso lhe dá um alto nível de segurança e também impedeERDDAP™solicitações de desacelerar o banco de dados original.
    * Nós encorajamos você a configurarERDDAP™para se conectar ao banco de dados como um usuário de banco de dados que só tem acesso ao **relevante** banco de dados (S) e só tem privilégios LER.
    * Nós encorajamos você a configurar a conexão deERDDAP™ao banco de dados para que
        * sempre usa SSL,
        * somente permite conexões de um endereço IP (ou um bloco de endereços) e de umERDDAP™usuário e
        * apenas transfere senhas em seu formulário de hasshed MD5.
    *   \\[PROBLEMAS CONHECIDOS\\]A conexãopropriedades (incluindo a senha&#33;) são armazenados como texto simples emdatasets.xml. Não encontramos uma maneira de permitir ao administrador inserir a senha do banco de dados duranteERDDAP's startup in Tomcat (que ocorre sem entrada do usuário) , então a senha deve ser acessível em um arquivo. Para tornar isso mais seguro:
        * Tu. (oERDDAP™administrador) deve ser o proprietário dedatasets.xmle têm acesso READ e WRITE.
        * Faça um grupo que inclua apenas user=tomcat. Use chgrp para fazer que o grupo paradatasets.xml, com apenas privilégios LER.
        * Use chmod para atribuir privilégios o-rwx (não LER ou WRITE acesso para "outros" usuários) paradatasets.xml.
    * Quando entrarERDDAP™, a senha e outras propriedades de conexão são armazenadas em "privado"Javavariáveis.
    * Os pedidos de clientes são analisados e verificados para validade antes de gerar os pedidos SQL para o banco de dados.
    * As solicitações ao banco de dados são feitas com SQL PreparedStatements, para evitar[Injeção de SQL](https://en.wikipedia.org/wiki/SQL_injection).
    * As solicitações ao banco de dados são enviadas com execução Query (não executarEstado) para limitar pedidos para ser somente leitura (assim tentou injeção SQL para alterar o banco de dados vai falhar por esta razão, também) .
         
#### SQL{#sql} 
* Porque...OPeNDAPOs pedidos de dados tabulares foram projetados para imitar solicitações de dados tabulares SQL, é fácil paraERDDAP™para converter solicitações de dados tabulares em simples SQL PreparedStatements. Por exemplo, oERDDAP™pedido
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
será convertido em SQL PreparedStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™pedidos com &distinct () e/ouorderBy ( *variáveis variáveis* ) irá adicionar DISTINCT e/ou ORDER BY *variáveis variáveis* para a instrução SQL preparada. Em geral, isso irá retardar muito a resposta do banco de dados.
ERDDAP™logs the PreparedStatement in[- Não.](/docs/server-admin/additional-information#log)como
```
    statement=*thePreparedStatement*  
```
Esta será uma representação de texto do PreparadStatement, que pode ser ligeiramente diferente do PreparadStatement real. Por exemplo, no PreparedStatement, os tempos são codificados de uma maneira especial. Mas na representação de texto, eles aparecem como ISO 8601 data times.
     
#### Velocidade do banco de dados{#database-speed} 
* Os bancos de dados podem ser lentos. Há algumas coisas que você pode fazer:
    * Em geral -
A natureza do SQL é que as consultas são[declarativa](https://en.wikipedia.org/wiki/Declarative_programming). Eles apenas especificam o que o usuário quer. Eles não incluem uma especificação ou dicas para como a consulta deve ser tratada ou otimizada. Então não há maneira deERDDAP™para gerar a consulta de tal forma que ajuda o banco de dados a otimizar a consulta (ou de qualquer forma especifica como a consulta deve ser tratada) . Em geral, cabe ao administrador do banco de dados configurar as coisas (por exemplo, índices) para otimizar para certos tipos de consultas.
##### Defina o tamanho da Fetch{#set-the-fetch-size} 
Bancos de dados retornam os dados paraERDDAP™em pedaços. Por padrão, bancos de dados diferentes retornam um número diferente de linhas nos pedaços. Muitas vezes este número é muito pequeno e muito ineficiente. Por exemplo, o padrão paraOracleSão 10&#33; Leia a documentação do JDBC para o driver do JDBC do seu banco de dados para encontrar a propriedade de conexão definida para aumentar isso, e adicione isso à descrição do conjunto de dados nodatasets.xml. Por exemplo,
Para MySQL e Amazon RDS, use
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Para MariaDB, atualmente não há como mudar o tamanho da busca. Mas é um recurso solicitado, então procure a web para ver se isso foi implementado.
ParaOracle, uso
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Para PostgreSQL, use
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
mas sinta-se livre para mudar o número. Definir o número muito grande causaráERDDAP™usar muita memória e ser mais propenso a ficar sem memória.
#### Properidades de conexão{#connectionproperties} 
Cada banco de dados tem outras propriedades de conexão que podem ser especificadas emdatasets.xml. Muitos deles afetarão o desempenho do banco de dados paraERDDAP™ligação. Por favor, leia a documentação para o driver JDBC do seu banco de dados para ver as opções. Se você encontrar propriedades de conexão que são úteis, envie um e-mail com os detalhes paraerd dot data at noaa dot gov.
* Faça uma mesa...
Você provavelmente terá respostas mais rápidas se você periodicamente (Todos os dias? sempre que houver novos dados?) gerar uma tabela real (da mesma forma como você gerou o VIEW) e contarERDDAP™para obter dados da tabela em vez da VIEW. Uma vez que qualquer pedido à tabela pode então ser cumprido sem JOINing outra tabela, a resposta será muito mais rápida.
* Vácuo da tabela -
MySQL e Amazon RDS responderão muito mais rápido se você usar[QUADRO OPTIMIZE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria Maria Maria DB responderá muito mais rápido se você usar[QUADRO OPTIMIZE](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL vai responder muito mais rápido se você[VACUÍDIO](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)a mesa.
    Oraclenão tem ou precisa de um comando analógico.
* Fazer[Índices](https://en.wikipedia.org/wiki/Database_index)para Variáveis Comunicamente Restritas --
Você pode acelerar muitas / mais consultas criando índices no banco de dados para as variáveis (que bases de dados chamam "colunas") que são frequentemente limitados na consulta do usuário. Em geral, estas são as mesmas variáveis especificadas por [&lt;subsetVariables&gt; (#subsetvariables) e/ou as variáveis de latitude, longitude e tempo.
##### Use a associação de conexão{#use-connection-pooling} 
Normalmente,ERDDAP™faz uma conexão separada ao banco de dados para cada solicitação. Esta é a abordagem mais confiável. A alternativa mais rápida é usar um DataSource que suporta o pool de conexões. Para configurá-lo, especifique (por exemplo)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
ao lado&lt;sourceUrl&gt;&lt;driverName&gt;, e&lt;conexão Propriedade&gt;.
E em *Toca a brincar.* /conf/context.xml, definir um recurso com a mesma informação, por exemplo,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
InformaÃ§Ãμes gerais sobre o uso de um DataSource[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Ver[Tomcat DataSource informações](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)e[Exemplos de Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)ou pesquisar a web para exemplos de usar o DataSources com outros servidores de aplicativos.
* Se tudo o resto falhar,
considerar armazenar os dados em uma coleção deNetCDFv3.ncarquivos (especialmente.ncarquivos que usam[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Estruturas de dados Ragged Array contíguas e assim pode ser tratada comERDDAP'[EDDTable FromNcCFFiles](#eddtablefromnccffiles)) . Se eles são logicamente organizados (cada um com dados para um pedaço de espaço e tempo) ,ERDDAP™pode extrair dados deles muito rapidamente.
         
#### EDDTableDo esqueleto da base de dados XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabela de EDDEDDGrid {#eddtablefromeddgrid} 
[ **Tabela de EDDEDDGrid** ](#eddtablefromeddgrid)permite criar um conjunto de dados EDDTable a partir de qualquerEDDGridconjunto de dados.

* Algumas razões comuns para fazer isso são:
    * Isso permite que o conjunto de dados seja consultado comOPeNDAPrestrições de seleção, que é um tipo de "coração por valor" (que um usuário pode ter solicitado) .
    * O conjunto de dados é inerentemente um conjunto de dados tabular.
* O valor do atributo global "maxAxis0" (geralmente de tipo="int") , (o padrão é 10) será usado para limitar o número de eixos\\[0\\]  (geralmente o"time"eixo) valores do anexoEDDGriddataset que pode ser acessado por solicitação de dados. Se você não quiser que haja qualquer limite, especifique um valor de 0. Esta configuração é importante porque, caso contrário, seria muito fácil para um usuário pedir EDDTableFromEDDGridpara analisar todos os dados do conjunto de dados. Isso levaria muito tempo e quase certamente falharia com um erro de timeout. Este é o cenário que o torna seguro ter EDDTableFromEDDGridconjuntos de dados em seuERDDAPsem medo de que eles levarão a um uso irracional de recursos de computação.
* Se o anexoEDDGridé um[EDDGridDe Erddap](#eddfromerddap)e oERDDAP™é o mesmoERDDAP, então EDDTable DeEDDGridusará sempre a versão atualmente disponível do conjunto de dados referenciado diretamente. Esta é uma maneira muito eficiente para EDDTableDeEDDGridpara acessar os dados gradeados.
* Esta classe é...&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) é o que conta. O anexoEDDGrid'&lt;reloadEveryNMinutes&gt; é ignorado.
* Se um valor para [&lt;updateEveryNMillis&gt;] (#updateeverynmillis #) é fornecido para este conjunto de dados, é ignorado. O anexoEDDGrid'&lt;updateEveryNMillis&gt; é o que importa.
*   [Gerar conjuntos de dadosXml](#generatedatasetsxml)tem uma opção para dataset type=EDDTableFromEDDGridque pede a URL de umERDDAP  (geralmente o mesmoERDDAP)   (terminando em "/erddap/") e uma expressão regular. Gerar conjuntos de dados Xml irá então gerar o XML para uma tabela EDDFromEDDGridconjunto de dados para cada conjunto de dados gradeado noERDDAP™que temdatasetIDque corresponde à expressão regular (use .\\* para combinar tudodatasetIDs para conjuntos de dados gradeados) .
    
O pedaço de XML que é gerado pela GenerateDatasetsXml para cada conjunto de dados inclui:
    
    * AdatasetIDque é oEDDGrid'datasetIDmais "\\_AsATable".
    * Um novo atributo global de resumo que é oEDDGrid's sumário mais um novo primeiro parágrafo descrevendo o que este conjunto de dados é.
    * Um novo atributo global de título que é oEDDGridO título mais ", (Como uma tabela) ".
    * Um novo atributo global maxAxis0 com um valor de 10.
#### Tabela de EDDEDDGridesqueleto XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTable De Nomes de Arquivo{#eddtablefromfilenames} 
[ **EDDTable De Nomes de Arquivo** ](#eddtablefromfilenames)cria um conjunto de dados de informações sobre um grupo de arquivos no sistema de arquivos do servidor, incluindo uma URL para cada arquivo para que os usuários possam baixar os arquivos viaERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Ao contrário de todos os[Tabela EDD dos arquivos](#eddtablefromfiles)subclasses, este tipo de conjunto de dados não serve dados de dentro dos arquivos.

* EDDTableFromFileNames é útil quando:
    * Você tem um grupo de arquivos que você deseja distribuir como arquivos inteiros porque eles não contêm "dados" da mesma forma que os arquivos de dados regulares têm dados. Por exemplo, arquivos de imagem, arquivos de vídeo, documentos do Word, arquivos de planilha do Excel, arquivos de apresentação do PowerPoint, ou arquivos de texto com texto não estruturado.
    * Você tem um grupo de arquivos que têm dados em um formato queERDDAP™Ainda não consigo ler. Por exemplo, um formato binário específico de projeto, personalizado.
         
#### EDDTable FromFileNames Data{#eddtablefromfilenames-data} 
*   [Os dados em um conjunto de dados EDDTableFromFileNames](#eddtablefromfilenames-data)é uma mesa queERDDAP™cria on-the-fly com informações sobre um grupo de arquivos locais. Na tabela, há uma linha para cada arquivo. Quatro atributos especiais no[datasets.xmlpara este conjunto de dados](#eddtablefromfilenames-skeleton-xml)determinar quais arquivos serão incluídos neste conjunto de dados:
    
##### arquivo Dir.{#filedir} 
    *   &lt;fileDir&gt; -- Isso especifica o diretório de origem no sistema de arquivos do servidor com os arquivos para este conjunto de dados. Os arquivos que estão localizados no sistema de arquivos do servidor no&lt;fileDir&gt; aparecerá na coluna url deste conjunto de dados dentro de um diretório virtual chamado https://*serverUrl*/erddap/files/*datasetID/* .
Por exemplo, se odatasetIDO que é?RSST,
e o&lt;fileDir&gt; é /home/data/mur/ ,
e esse diretório tem um arquivo chamado jplMURSST20150103000000.png,
então a URL que será mostrada aos usuários para esse arquivo será
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Além de usar um diretório local para o&lt;fileDir&gt;, você também pode especificar a URL de uma página web remota, como diretório. Isso funciona com:
        
        * Conjuntos de dados não agregados em THREDDS, por exemplo,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Este servidor não está mais disponível de forma confiável.\\]
        * Conjuntos de dados não agregadosHyrax, por exemplo,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * A maioria das listas de diretórios como Apache, por exemplo,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### a partir de{#fromonthefly} 
[\\*\\*\\* a partir de](#fromonthefly)- ... Para alguns baldes S3 enormes (como noaa-goes17, que tem 26 milhões de arquivos) , pode levarERDDAP™até 12 horas para baixar todas as informações sobre o conteúdo do balde (e depois há outros problemas) . Para se locomover, há uma maneira especial de usar&lt;fileDir&gt; em EDDTableFromFileNames para fazer um conjunto de dados com o diretório e nomes de arquivos de um balde AWS S3. O conjunto de dados não terá a lista de todos os diretórios do balde S3 e nomes de arquivos que um usuário pode pesquisar através de solicitações para o conjunto de dados. Mas o conjunto de dados terá os nomes de diretórios e arquivos on-the-fly se o usuário atravessar a hierarquia de diretórios com o conjunto de dados"files"opção. Assim, isso permite aos usuários navegar na hierarquia de arquivos e arquivos do balde S3 através do conjunto de dados"files"sistema. Para fazer isso, em vez de especificar a URL do balde S3 como o "Iniciar diretório" (em Gerar conjuntos de dados Xml) ou&lt;fileDir&gt; (emdatasets.xml) , use:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
por exemplo:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Veja a documentação para[trabalhando com S3 Buckets emERDDAP™](#working-with-aws-s3-files), nomeadamente a descrição do formato específico que deve ser usado para a URL do balde S3. E ver
[estes detalhes e um exemplo](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)de usar\\*\\*\\*deOnTheFly.
        
##### recursivo{#recursive} 
*   &lt;recursivo&gt; -- Arquivos em subdiretórios de&lt;fileDir&gt; com nomes que correspondem&lt;fileRegex&gt; aparecerá nos mesmos subdiretórios nos"files"URL se&lt;recursivo&gt; é definido como verdadeiro. O padrão é falso.
* Não.&lt;Caminhos-de-ferro (#) - ... Se recursive=true, Apenas nomes de diretório que correspondem ao pathRegex (default=.\\*") será aceito. Se recursive=false, isso é ignorado. Isso raramente é usado, mas pode ser muito útil em circunstâncias incomuns. (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### ficheiroRegex{#fileregex} 
*   &lt;fileRegex&gt; -- Apenas os nomes de arquivo onde todo o nome do arquivo (não incluindo o nome do diretório) corresponder a&lt;fileRegex&gt; será incluído neste conjunto de dados. Por exemplo, jplMURSST.&#123;14&#125;\\.png . (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### De Nomes de arquivo Conteúdo da tabela de dados{#from-file-names-data-table-contents} 
Na tabela, haverá colunas com:
* Url... A URL que os usuários podem usar para baixar o arquivo viaERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* Nome... O nome do arquivo (sem um nome de diretório) .
* último Modificado... O tempo que o arquivo foi modificado pela última vez (armazenados como duplos com"seconds since 1970-01-01T00:00:00Z") . Esta variável é útil porque os usuários podem ver se/quando o conteúdo de um determinado arquivo foi alterado. Esta variável é uma[Tempo Variável do carimbo](#timestamp-variables), para que os dados possam aparecer como valores numéricos (segundos desde 1970-01-01T00:00:00Z) ou um valor de string (ISO 8601:2004 (E) formato) , dependendo da situação.
* tamanho... O tamanho do arquivo em bytes, armazenado como duplos. Eles são armazenados como duplos, porque alguns arquivos podem ser maiores do que ints permitir e longs não são suportados em alguns tipos de arquivo de resposta. O dobro dará o tamanho exato, mesmo para arquivos muito grandes.
* colunas de adição definidas peloERDDAP™administrador com informações extraídas do nome do arquivo (por exemplo, o tempo associado aos dados no arquivo) com base em dois atributos que você especifica nos metadados para cada coluna/dataVariable:
    
    * ExtratoRegex -- Isto é...[expressão regular](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . Todo o regex deve corresponder a todo o nome do arquivo (não incluindo o nome do diretório) . O regex deve incluir pelo menos um grupo de captura (uma seção de uma expressão regular que é fechada por parênteses) queERDDAP™usa para determinar qual seção do nome do arquivo para extrair para se tornar dados.
    * extrato Grupo... Este é o número do grupo de captura (#1 é o primeiro grupo de captura) na expressão regular. O padrão é 1. Um grupo de captura é uma seção de uma expressão regular que é fechada por parênteses.
    
Aqui estão dois exemplos:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
No caso da variável tempo, se um arquivo tiver o nome jplMURSST20150103000000.png, o extratoRegex irá combinar o nome do arquivo, extrair os caracteres que correspondem ao primeiro grupo de captura ("20150103000000000") como dataType=String, então use o[unidades adequadas para tempos de cadeia](#string-time-units)para analisar as cadeias de caracteres em valores de dados de tempo (2015-01-03T00:00:00) .

No caso da variável dia, se um arquivo tiver o nome jplMURSST20150103000000.png, o extratoRegex irá combinar o nome do arquivo, extrair os caracteres que correspondem ao primeiro grupo de captura ("03") como...&lt;dataType&gt;] (# Datatype #) \\=int, produzindo um valor de dados de 3.
        
#### Outras informações{#other-information} 
* Não&#33;&lt;updateEveryNMillis&gt;] (#updateeverynmillis #) - ... Este tipo de conjunto de dados não precisa e não pode usar o&lt;updateEveryNMillis&gt; tag porque as informações servidas pela EDDTableFromFileNames estão sempre perfeitamente atualizadas porqueERDDAP™consulta o sistema de arquivos para responder a cada solicitação de dados. Mesmo que haja um grande número de arquivos, esta abordagem deve funcionar razoavelmente bem. Uma resposta pode ser lenta se houver um grande número de arquivos e o conjunto de dados não foi consultado por um tempo. Mas por vários minutos depois disso, o sistema operacional mantém as informações em um cache, então as respostas devem ser muito rápidas.
     
* Você pode usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer odatasets.xmlchunk para este tipo de conjunto de dados. Você pode adicionar / definir colunas adicionais com informações extraídas do nome do arquivo, como mostrado acima.
     
#### EDDTable Do esqueleto dos nomes de arquivo XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Tabela EDD dos arquivos{#eddtablefromfiles} 
[ **Tabela EDD dos arquivos** ](#eddtablefromfiles)é a superclasse de todas as classes EDDTableDe...Files. Você não pode usar EDDTableFromFiles diretamente. Em vez disso, use uma subclasse de EDDTableFromFiles para lidar com o tipo de arquivo específico:

*   [EDDTable FromAsciiFiles](#eddtablefromasciifiles)agrega dados de vírgula, tab-, ponto-, ou arquivos de dados tabulares ASCII separados por espaço.
*   [EDDTable FromAudioFiles](#eddfromaudiofiles)agrega dados de um grupo de arquivos de áudio locais.
*   [Tabela de EDD TolsXmlFiles](#eddtablefromawsxmlfiles)agrega dados de um conjunto de Estação de Tempo Automático (AWS) Arquivos XML.
*   [EDDTable FromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)agrega dados de arquivos de dados ASCII tabular com colunas de dados de largura fixa.
*   [Tabela de EDDHyraxArquivos](#eddtablefromhyraxfiles)  (DEPRIEDADE) agrega dados com várias variáveis, cada uma com dimensões compartilhadas (por exemplo, tempo, altitude (ou profundidade) , latitude, longitude) e servido por um[Hyrax OPeNDAPservidor](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTable De InvalidCRAFiles](#eddtablefrominvalidcrafiles)agrega dados deNetCDF  (v3 ou v4)  .ncarquivos que usam um específico, inválido, variante do CF DSG Contiguous Ragged Array (CRA) arquivos. EmboraERDDAP™suporta este tipo de arquivo, é um tipo de arquivo inválido que ninguém deve começar a usar. Grupos que atualmente usam este tipo de arquivo são fortemente encorajados a usarERDDAP™para gerar arquivos CF DSG CRA válidos e parar de usar esses arquivos.
*   [EDDTable FromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)agrega dados de[JSON Linhas arquivos CSV](https://jsonlines.org/examples/).
*   [EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)agrega dados deNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) arquivos com várias variáveis, cada uma com dimensões compartilhadas (por exemplo, tempo, altitude (ou profundidade) , latitude, longitude) .
*   [EDDTable De NcFiles](#eddtablefromncfiles)agrega dados deNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) arquivos com várias variáveis, cada uma com dimensões compartilhadas (por exemplo, tempo, altitude (ou profundidade) , latitude, longitude) . É bom continuar usando este tipo de conjunto de dados para conjuntos de dados existentes, mas para novos conjuntos de dados recomendamos usar EDDTableFromMultidimNcFiles em vez disso.
*   [EDDTable FromNcCFFiles](#eddtablefromnccffiles)agrega dados deNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) arquivos que usam um dos formatos de arquivo especificados pelo[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenções. Mas para arquivos usando uma das variantes multidimensionais CF DSG, use[EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)Em vez disso.
*   [EDDTable De NccsvFiles](#eddtablefromnccsvfiles)agrega dados de[NCCSV](/docs/user/nccsv-1.00)Arquivos ASCII .csv.
*   [EDDTable FromParquetFiles](#eddtablefromparquetfiles)lida com dados de[Parquete](https://parquet.apache.org/).
*   [EDDTable FromThreddsFiles](#eddtablefromthreddsfiles)  (DEPRIEDADE) agrega dados de arquivos com várias variáveis com dimensões compartilhadas servidas por uma[TERCEIROSOPeNDAPservidor](https://www.unidata.ucar.edu/software/tds/).
*   [Tabela de EDDWFSArquivos](#eddtablefromwfsfiles)  (DEPRIEDADE) faz uma cópia local de todos os dados de umaArcGISMapaServerWFSservidor para que os dados possam então ser re-servados rapidamente paraERDDAP™usuários.

Atualmente, nenhum outro tipo de arquivo é suportado. Mas geralmente é relativamente fácil adicionar suporte para outros tipos de arquivo. Contacte-nos se tiver um pedido. Ou, se seus dados estão em um formato de arquivo antigo que você gostaria de se afastar, recomendamos converter os arquivos para serNetCDFv3.ncarquivos (e especialmente.ncarquivos com o[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Estrutura contígua de dados Ragged Array --ERDDAP™pode extrair dados deles muito rapidamente) .NetCDFé um formato binário amplamente suportado, permite acesso aleatório rápido aos dados, e já é suportado porERDDAP.

#### Detalhes deFiles{#fromfiles-details} 
As seguintes informações aplicam-se a todas as subclasses de EDDTableFromFiles.
##### Agregação{#aggregation} 
Esta classe agrega dados de arquivos locais. Cada arquivo contém (relativamente) pequena tabela de dados.
    * O conjunto de dados resultante aparece como se todas as tabelas do arquivo tivessem sido combinadas (todas as linhas de dados do arquivo #1, mais todas as linhas do arquivo #2, ...) .
    * Os arquivos nem todos têm que ter todas as variáveis especificadas. Se um determinado arquivo não tiver uma variável especificada,ERDDAP™adicionará valores ausentes conforme necessário.
    * As variáveis em todos os arquivos DEVE ter os mesmos valores para[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[\\_Fill Valor](#missing_value),[scale\\_factor](#scale_factor)e[unidades](#units)atributos (se houver) .ERDDAP™verifica, mas é um teste imperfeito -- se houver valores diferentes,ERDDAPnão sabe qual é correto e, portanto, quais arquivos são inválidos. Se este é um problema, você pode ser capaz de usar[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)para corrigir o problema.
         
##### Arquivos compactados{#compressed-files} 
Os arquivos de dados de origem para todas as subclasses EDDTableFromFiles podem ser compactados externamente (por exemplo,.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, ou .Z) . Ver[Documentação de arquivos compactados externamente](#externally-compressed-files).
     
##### InformaÃ§Ãμes de arquivo Cached{#cached-file-information-1} 
* Quando um conjunto de dados EDDTableFromFiles é carregado pela primeira vez, EDDTableFromFiles lê informações de todos os arquivos relevantes e cria tabelas (uma linha para cada arquivo) com informações sobre cada arquivo válido e cada "mau" (diferente ou inválido) ficheiro.
    * As tabelas também são armazenadas no disco, comoNetCDFv3.ncarquivos em *Diretriz de grande porte* /dataset/ *último2CharsOfDatasetID* / *datasetID* / em arquivos nomeados:
tabela de dados.nc  (que contém uma lista de nomes de diretório únicos) ,
arquivo Quadro.nc  (que contém a tabela com as informações de cada arquivo válido) ,
Arquivos ruins.nc  (que segura a tabela com as informações de cada arquivo ruim) .
    * Para acelerar o acesso a um conjunto de dados EDDTableFromFiles (mas à custa de usar mais memória) , você pode usar
Não.&lt;arquivoTableInMemory&gt;true&lt;/fileTableInMemory&gt; (#filetableinmemory)   
para contarERDDAP™para manter uma cópia das tabelas de informações do arquivo na memória.
    * A cópia das tabelas de informações do arquivo no disco também é útil quandoERDDAP™é desligado e reiniciado: economiza tabela EDD FromFiles de ter que reler todos os arquivos de dados.
    * Quando um conjunto de dados é recarregado,ERDDAP™só precisa ler os dados em novos arquivos e arquivos que mudaram.
    * Se um arquivo tem uma estrutura diferente dos outros arquivos (por exemplo, um tipo de dados diferente para uma das variáveis, ou um valor diferente para o "[unidades](#units)"Atributo) ,ERDDAPadiciona o arquivo à lista de arquivos "bad". InformaÃ§Ãμes sobre o problema com o arquivo serÃ¡ escrito para o *Diretriz de grande porte* /logs/log.txt arquivo.
    * Você nunca deve precisar excluir ou trabalhar com esses arquivos. Uma exceção é: se você ainda está fazendo alterações em um conjunto de dadosdatasets.xmlconfiguração, você pode querer excluir esses arquivos para forçarERDDAP™para reler todos os arquivos desde que os arquivos serão lidos / interpretados de forma diferente. Se você precisar excluir esses arquivos, você pode fazê-lo quandoERDDAP™está a correr. (Em seguida, definir um[bandeira](/docs/server-admin/additional-information#set-dataset-flag)para recarregar o conjunto de dados ASAP.) No entanto,ERDDAP™geralmente percebe que odatasets.xmlinformações não correspondem ao arquivo InformaÃ§Ãμes da tabela e exclui as tabelas de arquivos automaticamente.
    * Se você quiser encorajarERDDAP™para atualizar as informações do conjunto de dados armazenados (por exemplo, se você acabou de adicionar, remover ou alterar alguns arquivos no diretório de dados do conjunto de dados) , use o[sistema de bandeira](/docs/server-admin/additional-information#flag)à forçaERDDAP™para atualizar as informações de arquivo em cache.
         
##### Pedidos de manuseio{#handling-requests-1} 
*   ERDDAP™solicitações de dados tabular podem colocar restrições em qualquer variável.
    * Quando o pedido de dados de um cliente for processado, o EDDTableFromFiles pode olhar rapidamente na tabela com as informações de arquivo válidas para ver quais arquivos podem ter dados relevantes. Por exemplo, se cada arquivo de origem tiver os dados para um buoy de localização fixa, o EDDTableFromFiles pode determinar de forma muito eficiente quais arquivos podem ter dados dentro de um determinado intervalo de longitude e intervalo de latitude.
    * Como a tabela de informações de arquivo válida inclui o valor mínimo e máximo de cada variável para cada arquivo válido, EDDTableFromFiles muitas vezes pode lidar com outras consultas de forma bastante eficiente. Por exemplo, se alguns dos buoys não têm um sensor de pressão de ar, e um cliente solicita dados para airPressure&#33;=NaN, EDDTableFromFiles pode determinar eficientemente quais buoys têm dados de pressão de ar.
         
##### Atualizando as informações do arquivo Cached{#updating-the-cached-file-information-1} 
Sempre que o conjunto de dados é recarregado, as informações de arquivo em cache são atualizadas.
    
* O conjunto de dados é recarregado periodicamente conforme determinado pelo&lt;reloadEveryNMinutes&gt; nas informações do conjunto de dadosdatasets.xml.
* O conjunto de dados é recarregado o mais rápido possível sempreERDDAP™detecta que você adicionou, removido,[Tocava](https://en.wikipedia.org/wiki/Touch_(Unix)) (para alterar o último arquivo Tempo modificado) , ou mudou um arquivo de dados.
* O conjunto de dados é recarregado o mais rápido possível se você usar o[sistema de bandeira](/docs/server-admin/additional-information#flag).

Quando o conjunto de dados é recarregado,ERDDAP™compara os arquivos disponíveis atualmente à tabela de informações de arquivo em cache. Novos arquivos são lidos e adicionados à tabela de arquivos válidos. Os arquivos que já não existem são retirados da tabela de arquivos válidos. Os arquivos onde o timestamp do arquivo mudou são lidos e suas informações são atualizadas. As novas tabelas substituem as mesas antigas na memória e no disco.
     
##### Arquivos ruins{#bad-files-1} 
A tabela de arquivos ruins e as razões que os arquivos foram declarados ruins (arquivo corrompido, variáveis ausentes, valores de eixo incorretos, etc.) é enviado para o e-mail Tudo Para endereço de e-mail (Provavelmente.) sempre que o conjunto de dados é recarregado. Você deve substituir ou reparar esses arquivos o mais rápido possível.
     
##### Variáveis em falta{#missing-variables-1} 
Se alguns dos arquivos não têm alguns dosdataVariables definido no conjunto de dadosdatasets.xmlChuck, não faz mal. Quando EDDTableFromFiles lê um desses arquivos, ele atuará como se o arquivo tivesse a variável, mas com todos os valores ausentes.
     
##### Dados em tempo real{#near-real-time-data} 
* EDDTableFromFiles trata pedidos de dados muito recentes como um caso especial. O problema: Se os arquivos que compõem o conjunto de dados forem atualizados com frequência, é provável que o conjunto de dados não seja atualizado sempre que um arquivo for alterado. Então EDDTableFromFiles não estará ciente dos arquivos alterados. (Você poderia usar o[sistema de bandeira](/docs/server-admin/additional-information#flag)Mas isto pode levar aERDDAP™recarregar o conjunto de dados quase continuamente. Então, na maioria dos casos, não recomendamos.) Em vez disso, EDDTableFromFiles lida com isso pelo seguinte sistema: QuandoERDDAP™recebe um pedido de dados nas últimas 20 horas (por exemplo, há 8 horas até Agora) ,ERDDAP™irá pesquisar todos os arquivos que têm quaisquer dados nas últimas 20 horas. Assim,ERDDAP™não precisa ter dados perfeitamente atualizados para todos os arquivos, a fim de encontrar os dados mais recentes. Você ainda deve definir [&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) a um valor razoavelmente pequeno (por exemplo, 60) Mas não tem de ser minúsculo (por exemplo, 3) .
     
    *    **Não recomendado** organização de dados quase em tempo real nos arquivos: Se, por exemplo, você tem um conjunto de dados que armazena dados para várias estações (ou bóia, ou trajetória, ...) por muitos anos, você pode organizar os arquivos para que, por exemplo, há um arquivo por estação. Mas então, cada vez que novos dados para uma estação chega, você tem que ler um arquivo velho grande e escrever um arquivo novo grande. E quandoERDDAP™recarrega o conjunto de dados, percebe que alguns arquivos foram modificados, então ele lê esses arquivos completamente. Isso é ineficiente.
         
    *    **Recomendado** organização de dados quase em tempo real nos arquivos: Armazene os dados em pedaços, por exemplo, todos os dados para uma estação/compra/trajectória por um ano (ou um mês) . Então, quando um novo dado chega, apenas o arquivo com este ano. (ou mês) os dados são afetados.
        
        * Melhor: UsoNetCDFv3.ncarquivos com uma dimensão ilimitada (Tempo) . Então, para adicionar novos dados, você pode apenas anexar os novos dados sem ter que ler e reescrever todo o arquivo. A mudança é feita de forma muito eficiente e essencialmente atomicamente, então o arquivo nunca está em um estado inconsistente.
        * Caso contrário: Se você não / não pode usar.ncarquivos com uma dimensão ilimitada (Tempo) , então, quando você precisa adicionar novos dados, você tem que ler e reescrever todo o arquivo afetado (esperançosamente pequeno porque tem apenas um ano de (ou mês) valor de dados) . Felizmente, todos os arquivos para anos anteriores (ou meses) para que a estação permaneça inalterada.
        
Em ambos os casos, quandoERDDAP™recarrega o conjunto de dados, a maioria dos arquivos são inalterados; apenas alguns, pequenos arquivos mudaram e precisam ser lidos.
         
##### Directoria{#directories-1} 
Os arquivos podem estar em um diretório, ou em um diretório e seus subdiretórios (recorrentemente) . Se houver um grande número de arquivos (por exemplo, &gt;1,000) , o sistema operacional (e, assim, EDDTableDeFiles) irá operar muito mais eficientemente se você armazenar os arquivos em uma série de subdiretórios (um por ano, ou um por mês para conjuntos de dados com arquivos muito frequentes) , para que nunca haja um grande número de arquivos em um determinado diretório.
     
##### Diretórios remotos e solicitações de intervalo HTTP{#remote-directories-and-http-range-requests-1} 
*    **Diretórios remotos e solicitações de intervalo HTTP**   (AKA Byte Serving, Byte Range Pedidos) - ...
    EDDGridFromNcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles, e ETableDDFromNcCFFiles, às vezes pode servir dados de.ncarquivos em servidores remotos e acessados via HTTP se o servidor suporta[Servir Byte](https://en.wikipedia.org/wiki/Byte_serving)através de solicitações de intervalo HTTP (o mecanismo HTTP para byte servindo) . Isso é possível porque netcdf-java (queERDDAP™usos para ler.ncarquivos) suporta a leitura de dados de remoto.ncarquivos através de solicitações de intervalo HTTP.
    
     **Não faças isso&#33;**   
Em vez disso, use o [&lt;cacheDeUrl&gt; sistema] (#cachefromurl) .
    
##### Cache De Url{#cachefromurl} 
* Não. ** &lt;cacheDe Url&gt; ** ] (#cachefromurl) - Não.
TudoEDDGridFromFiles e todos os conjuntos de dados EDDTableFromFiles suportam um conjunto de tags que contamERDDAP™para baixar e manter uma cópia de todos os arquivos de um conjunto de dados remoto, ou um cache de alguns arquivos (baixado conforme necessário) . **Este é um recurso incrivelmente útil.** 
    * O&lt;cacheFromUrl&gt; tag permite especificar um URL com uma lista de arquivos de um conjunto de dados remotos de uma lista de arquivos remotos.
        
        * Conjuntos de dados não agregados em THREDDS, por exemplo,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Este servidor não está mais disponível de forma confiável.\\]
        * Conjuntos de dados não agregadosHyrax, por exemplo,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * A maioria das listas de diretórios como Apache, por exemplo,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * Baldes S3, por exemplo,
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
No entanto, isso pode exigir uma conta AWS e mais configuração.
Ver[trabalhando com S3 Buckets emERDDAP™](#working-with-aws-s3-files).
Além disso, você geralmente não precisa usar cache FromUrl com arquivos em baldes S3 se os arquivos são arquivos ASCII (por exemplo, .csv) PorqueERDDAP™pode ler eficientemente os dados do balde diretamente através de um fluxo.
        
        ERDDAP™copiará ou armazenará esses arquivos no conjunto de dados&lt;fileDir&gt; diretório. Se você precisar de suporte para outro tipo de lista de arquivos remotos (por exemplo, FTP) , por favor envie seu pedido para Chris. John no noaaa.gov .
        
        * O valor padrão para o&lt;cacheDeUrl&gt; tag é nulo. Se você não especificar um valor para o&lt;cacheFromUrl&gt; tag, o sistema copy/cache não será usado para este conjunto de dados.
        * Se o conjunto de dados&lt;arquivoRegex&gt; configuração é algo diferente de .\\*,ERDDAP™só vai baixar arquivos que correspondem ao arquivoRegex.
        * Se o conjunto de dados&lt;configuração recursiva&gt; é verdadeira e os arquivos remotos estão em subdiretórios,ERDDAP™vai olhar em subdiretórios remotos que correspondem ao conjunto de dados [&lt;Caminhos-de-ferro (#) , criar a mesma estrutura de diretório localmente, e colocar os arquivos locais nas mesmas subdiretórios.
        * Em Gerar conjuntos de dados Xml, se você especificar um&lt;valor cacheFromUrl&gt;, Gerar Conjuntos de dados Xml vai criar o local&lt;fileDir&gt; diretório e copiar 1 arquivo remoto nele. Gerar conjuntos de dados Xml irá então gerar odatasets.xmlchunk baseado no arquivo de amostra (especificar amostra Não há nada) .
        * Se a fonte de dados for remotaERDDAP™, uso[EDDGridDe Erddap](#eddfromerddap)ou[EDDTable FromErddap](#eddfromerddap)em vez de&lt;cacheDeUrl&gt;. Por ali, o teu local.ERDDAP™parece ter o conjunto de dados, mas não precisará armazenar nenhum dos dados localmente. A única razão para usar&lt;cacheFromUrl&gt; para obter dados de um remotoERDDAP™é quando você tem alguma outra razão pela qual você quer ter uma cópia local dos arquivos de dados. Nesse caso:
            * Este conjunto de dados tentará assinar o conjunto de dados no remotoERDDAPpara que as mudanças nesse conjunto de dados chamem a bandeira deste conjunto de dados Url, fazendo com que este conjunto de dados local recarregue e baixe os arquivos remotos alterados. Assim, o conjunto de dados local será atualizado muito logo após as mudanças serem feitas no conjunto de dados remoto.
            * Você deve enviar e-mail ao administrador do remotoERDDAP™para pedirdatasets.xmlpara o conjunto de dados remoto para que você possa fazer o conjunto de dados em seu localERDDAP™olhar como o conjunto de dados no remotoERDDAP.
        * Se a fonte de dados for remotaERDDAP™, o conjunto de dados local tentará se inscrever no conjunto de dados remoto.
            * Se a assinatura for bem sucedida, sempre que o remotoERDDAPrecarrega e tem novos dados, ele entrará em contato com o flagURL para este conjunto de dados, fazendo com que ele recarregue e baixe os novos e/ou arquivos de dados alterados.
            * Se a assinatura falhar (por qualquer razão) ou se você simplesmente quiser garantir que o conjunto de dados local está atualizado, você pode definir um[bandeira](/docs/server-admin/additional-information#flag)para o conjunto de dados local, então ele irá recarregar, então ele irá verificar para novos e / ou mudou arquivos de dados remotos.
        * Se a fonte de dados não for remotaERDDAP: o conjunto de dados irá verificar para arquivos remotos novos e/ou alterados sempre que recarregar. Normalmente, isso é controlado por [&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) . Mas se você sabe quando há novos arquivos remotos, você pode definir um[bandeira](/docs/server-admin/additional-information#flag)para o conjunto de dados local, então ele irá recarregar e verificar para novos e / ou mudou arquivos de dados remotos. Se isso acontecer rotineiramente em um determinado momento do dia (por exemplo, às 7h) , você pode fazer um trabalho cron para usarcurlpara entrar em contato com a bandeira Url para este conjunto de dados, então ele irá recarregar e verificar para novos e / ou mudou arquivos de dados remotos.
    * O&lt;cacheSizeGB&gt; tag especifica o tamanho do cache local. Você provavelmente só precisa usar isso ao trabalhar com sistemas de armazenamento em nuvem como[Amazon S3](https://aws.amazon.com/s3/)que é um sistema de armazenamento comumente usado que faz parte de[Amazon Web Services (AWS) ](https://aws.amazon.com/). O padrão é -1.
        * Se o valor for&lt;= 0 (por exemplo, o valor padrão de -1) ,
            ERDDAP™vai baixar e manter um **cópia completa** de todos os arquivos do conjunto de dados remotos no conjunto de dados&lt;fileDir&gt;.
            * Esta é a configuração que é recomendada sempre que possível.
            * Sempre que o conjunto de dados é recarregado, ele compara os nomes, tamanhos e os últimos tempos modificados dos arquivos remotos e os arquivos locais, e downloads de quaisquer arquivos remotos que são novos ou mudaram.
            * Se um arquivo que estava no servidor remoto desaparecer,ERDDAP™não excluirá o arquivo local correspondente (caso contrário, se algo estava temporariamente errado com o servidor remoto,ERDDAP™pode excluir alguns ou todos os arquivos locais&#33;) .
            * Com esta configuração, geralmente você vai definir&lt;updateEveryNMillis&gt; to -1, uma vez que o conjunto de dados está ciente de quando ele copiou novos arquivos de dados no lugar.
        * Se o valor for &gt;0,
            ERDDAP™irá baixar arquivos do conjunto de dados remoto conforme necessário para um local **cache** (no conjunto de dados&lt;fileDir&gt;) com um tamanho de limiar desse número especificado de GB.
            * O cache deve ser grande o suficiente para segurar pelo menos vários arquivos de dados.
            * Em geral, quanto maior o cache, melhor, porque o próximo arquivo de dados solicitado será mais provável que já esteja no cache.
            * Caching só deve ser usado quandoERDDAP™está em execução em um servidor de computação em nuvem (por exemplo, uma instância de computação AWS) e os arquivos remotos em um sistema de armazenamento em nuvem (por exemplo, AWS S3) .
            * Quando o espaço em disco usado pelos arquivos locais excede o cache SizeGB,ERDDAP™em breve (talvez não imediatamente) excluir alguns dos arquivos armazenados (atualmente, com base no Least Recentemente Usado (LRU) algoritmo) até que o espaço de disco usado pelos arquivos locais seja&lt;0,75 € *cacheSizeGB (o "gol") . Sim, há casos em que LRU executa muito mal - não há algoritmo perfeito.
            *   ERDDAP™nunca tentará excluir um arquivo em cache queERDDAP™começou a usar nos últimos 10 segundos. Este é um sistema imperfeito para lidar com o sistema de cache e o sistema de leitor de arquivos de dados sendo apenas vagamente integrado. Por causa desta regra,ERDDAP™pode não ser capaz de excluir arquivos suficientes para alcançar seu objetivo, em que caso ele vai imprimir um WARNING para o arquivo log.txt, e o sistema vai desperdiçar muito tempo tentando ameixar o cache, e é possível que o tamanho dos arquivos no cache pode exceder muito o cacheSizeGB. Se isso ocorrer, use uma configuração maior do cacheSizeGB para esse conjunto de dados.
            * Atualmente,ERDDAP™nunca verifica se o servidor remoto tem uma versão mais recente de um arquivo que está no cache local. Se você precisar deste recurso, por favor envie um e-mail para Chris. John em noaaa.gov .
        * Embora o uso dos mesmos nomes de tags possa implicar que o sistema de cópia e o sistema de cache usam o mesmo sistema subjacente, que não está correto.
            * O sistema de cópia inicia proativamente tarefasThread tarefas para baixar arquivos novos e alterados cada vez que o conjunto de dados é recarregado. Apenas os arquivos que foram copiados para o diretório local estão disponíveis através doERDDAP™conjunto de dados.
            * O sistema de cache recebe a lista de arquivos remotos sempre que o conjunto de dados é recarregado e finge que todos esses arquivos estão disponíveis através doERDDAP™conjunto de dados. Curiosamente, todos os arquivos remotos até aparecem nas páginas /files/web do conjunto de dados e estão disponíveis para download (Embora talvez só depois de um atraso, enquanto o arquivo é primeiro baixado do servidor remoto para o cache local.) 
        * Os conjuntos de dados que usam cacheSizeGB podem se beneficiar de usar um[NTreads](#nthreads)configuração maior que 1, porque isso permitirá que o conjunto de dados baixe mais de 1 arquivo remoto de cada vez.
    * O&lt;cachePartialPathRegex&gt; tag é uma tag raramente usada que pode especificar uma alternativa para o conjunto de dados [&lt;Caminhos-de-ferro (#) . O padrão é nulo.
        * Use isso somente se você estiver copiando todo o conjunto de dados através do padrão&lt;valor cacheSizeGB&gt; de -1. Com&lt;valores cacheSizeGB&gt; de &gt;1, isso será ignorado porque não é sensato.
        * Veja [a documentação para&lt;Caminhos-de-ferro (#) para orientação sobre como construir o regex.
        * Se isso for especificado, ele será usado cada vez que o conjunto de dados é recarregado, exceto a primeira vez que um conjunto de dados é recarregado no início de um mês.
        * Isso é útil quando o conjunto de dados remoto é armazenado em um labirinto de subdiretórios e quando a grande maioria desses arquivos raramente, se nunca, mudar. (&lt;tosse NASA&lt;tosse&gt; Você poderia, por exemplo, especificar um&lt;cachePartialPathRegex&gt; que apenas corresponde ao ano atual ou ao mês atual. Estes regexes são muito complicados para especificar, porque todos os nomes de caminhos parciais e completos devem corresponder ao&lt;cachePartialPathRegex&gt; e porque&lt;cachePartialPathRegex&gt; deve trabalhar com as URLs remotas e os diretórios locais. Um exemplo de vida real é:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
A URL de amostra acima tem arquivos em subdiretórios com base no ano (por exemplo, 2018) e dia do ano (por exemplo, 001, 002, ..., 365 ou 366) .
Note que o&lt;cachePartialPathRegex&gt; começa com .\\*,
então tem um subdiretório específico que é comum às URLs remotas e aos diretórios locais, por exemplo, /v4\\\.1/
então tem uma série de grupos de captura aninhados onde a primeira opção não é nada
e a segunda opção é um valor específico.
            
O exemplo acima só corresponderá aos diretórios para os segundos 10 dias de 2018, por exemplo,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Este servidor não está mais disponível de forma confiável.\\]  
e dia 011, 012, ..., 019.
             (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Se você precisar de ajuda para criar&lt;cachePartialPathRegex&gt;, envie um e-mail para&lt;cache FromUrl&gt; para Chris. John no noaaa.gov .
            
        * Uma abordagem comum: Se você quiser usar&lt;cachePartialPathRegex&gt;, não usá-lo inicialmente, porque você querERDDAP™para baixar todos os arquivos inicialmente. DepoisERDDAP™baixado todos os arquivos, adicioná-lo ao pedaço do conjunto de dadosdatasets.xml.
             
##### Milhares de arquivos{#thousands-of-files} 
Se o seu conjunto de dados tem muitos milhares de arquivos,ERDDAP™pode ser lento para responder a pedidos de dados desse conjunto de dados. Há dois problemas aqui:
 

1. O número de arquivos por diretório.
Internamente,ERDDAP™opera na mesma velocidade, independentemente de n arquivos estão em um diretório ou dispersos em vários diretórios.
     
Mas há um problema: Quanto mais arquivos em um determinado diretório, mais lento o sistema operacional está retornando a lista de arquivos no diretório (por arquivo) paraERDDAP. O tempo de resposta pode ser O (n Registar n) . É difícil dizer quantos arquivos em um diretório são muitos, mas 10,000 é provavelmente muitos. Então, se sua configuração está gerando muitos arquivos, uma recomendação aqui pode ser: colocar os arquivos em subdiretórios logicamente organizados (por exemplo, estação ou estação/ano) .
    
Outra razão para usar subdiretórios: se um usuário quiser usarERDDAP'"files"sistema para encontrar o nome do arquivo mais antigo para a estação X, é mais rápido e mais eficiente se os arquivos estão em subdiretórios de estação / ano, porque muito menos informações precisam ser transferidas.
    
2. O número total de arquivos.
Para conjuntos de dados tabulares,ERDDAP™mantém o controle do intervalo de valores para cada variável em cada arquivo. Quando um usuário faz uma solicitação,ERDDAP™tem que ler todos os dados de todos os arquivos que podem ter dados correspondentes ao pedido do usuário. Se o usuário solicitar dados de um tempo limitado (por exemplo, um dia ou um mês) EntãoERDDAP™não terá que abrir muitos arquivos em seu conjunto de dados. Mas há casos extremos onde quase todos os arquivos podem ter dados correspondentes (por exemplo, quando a águaTemperature=13.2C) . Desde que é precisoERDDAP™um pouco de tempo (em parte o tempo de busca no HDD, em parte o tempo para ler o cabeçalho do arquivo) apenas para abrir um arquivo dado (e mais se houver muitos arquivos no diretório) , há uma pena de tempo significativa se o número total de arquivos queERDDAP™tem de abrir é muito grande. Mesmo abrir 1000 arquivos leva tempo significativo. Portanto, há benefícios para consolidar periodicamente os arquivos diários em pedaços maiores (por exemplo, 1 estação para 1 ano) . Eu entendo que você pode não querer fazer isso por várias razões, mas isso leva a respostas muito mais rápidas. Em casos extremos (por exemplo, eu lido com um conjunto de dados GTSPP que tem ~35 milhões de arquivos de origem) , servir dados de um grande número de arquivos de origem é impraticável porqueERDDAPA resposta a consultas simples pode levar horas e usar toneladas de memória. Ao consolidar arquivos de origem em um número menor (para GTSPP, eu tenho 720 agora, 2 por mês) ,ERDDAP™pode responder razoavelmente rapidamente. Ver[Milhões de arquivos](#millions-of-files)  
     

N.B. Solid State Drives são ótimos&#33; A maneira mais rápida, mais fácil e mais barata de ajudarERDDAP™lidar com um grande número de (pequeno pequeno) arquivos é usar uma unidade de estado sólida. Ver[Solid State Drives são ótimos&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Milhões de arquivos{#millions-of-files} 
* Alguns conjuntos de dados têm milhões de arquivos de origem.ERDDAP™pode lidar com isso, mas com resultados mistos.
    
    * Para pedidos que envolvam apenas variáveis listadas em [&lt;subsetVariables&gt; (#subsetvariables) ,ERDDAP™tem todas as informações necessárias já extraídas dos arquivos de dados e armazenadas em um arquivo, para que ele possa responder muito, muito rapidamente.
    * Para outros pedidos,ERDDAP™pode digitalizar o conjunto de dados[informações de arquivo em cache](#cached-file-information)e descobrir que apenas alguns dos arquivos podem ter dados que são relevantes para a solicitação e, portanto, responder rapidamente.
    * Mas para outros pedidos (por exemplo, waterTemperature=18 degree\\_C) onde qualquer arquivo pode ter dados relevantes,ERDDAP™tem que abrir um grande número de arquivos para ver se cada um dos arquivos tem quaisquer dados que sejam relevantes para a solicitação. Os arquivos são abertos sequencialmente. Em qualquer sistema operacional e qualquer sistema de arquivos (diferente de unidades de estado sólido) Isto leva muito tempo (Então...ERDDAP™responde lentamente) e realmente amarra o sistema de arquivos (Então...ERDDAP™responde lentamente a outros pedidos) .
    
Felizmente, há uma solução.
    
    1. Configurar o conjunto de dados em um não públicoERDDAP™  (O seu computador pessoal?) .
    2. Criar e executar um script que solicita uma série de.ncArquivos CF, cada um com um grande pedaço do conjunto de dados, geralmente um período de tempo (por exemplo, todos os dados para um determinado mês) . Escolha o período de tempo para que todos os arquivos resultantes sejam menos de 2GB (mas esperançosamente maior que 1GB) . Se o conjunto de dados tiver dados em tempo real, execute o script para regenerar o arquivo para o período de tempo atual (por exemplo, este mês) freqüentemente (A cada 10 minutos? A cada hora?) . Pedidos paraERDDAP™para.ncArquivos CF criam umNetCDFv3.ncarquivo que usa o[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Estruturas de dados de Ragged Array contíguas).
    3. Configurar um[EDDTable FromNcCFFiles](#eddtablefromnccffiles)dataset em seu públicoERDDAP™que recebe dados de.nc (CF) arquivos.ERDDAP™pode extrair dados desses arquivos muito rapidamente. E como há agora dezenas ou centenas (em vez de milhões) de arquivos, mesmo seERDDAP™tem que abrir todos os arquivos, ele pode fazê-lo rapidamente.
    
Sim, este sistema leva algum tempo e esforço para configurar, mas funciona muito, muito bem. A maioria dos pedidos de dados pode ser tratada 100 vezes mais rápido do que antes.
    \\[Bob sabia que era uma possibilidade, mas foi Kevin O'Brien que primeiro fez isso e mostrou que funciona bem. Agora. Bob usa isso para o conjunto de dados GTSPP que tem cerca de 18 milhões de arquivos de origem e queERDDAP™agora serve através de cerca de 500.nc (CF) arquivos.\\]
    
N.B. Solid State Drives são ótimos&#33; A maneira mais rápida, mais fácil e mais barata de ajudarERDDAP™lidar com um grande número de (pequeno pequeno) arquivos é usar uma unidade de estado sólida. Ver[Solid State Drives são ótimos&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Arquivos enormes{#huge-files} 
* Um único arquivo de dados enorme (notavelmente arquivos de dados ASCII enormes) pode causar um OutOfMemoryError. Se este é o problema, deve ser óbvio porqueERDDAP™não carregará o conjunto de dados. A solução, se possível, é dividir o arquivo em vários arquivos. Idealmente, você pode dividir o arquivo em pedaços lógicos. Por exemplo, se o arquivo tem 20 meses de dados, dividi-lo em 20 arquivos, cada um com 1 mês de dados. Mas há vantagens mesmo se o arquivo principal é dividido arbitrariamente. Esta abordagem tem vários benefícios: a) Isso reduzirá a memória necessária para ler os arquivos de dados para 1/20th, porque apenas um arquivo é lido em um momento. b) Muitas vezes,ERDDAP™pode lidar com pedidos muito mais rápido, porque só tem que olhar em um ou alguns arquivos para encontrar os dados para uma determinada solicitação. c) Se a coleta de dados estiver em andamento, os 20 arquivos existentes podem permanecer inalterados, e você só precisa modificar um, pequeno e novo arquivo para adicionar o valor dos dados do próximo mês para o conjunto de dados.
     
##### Problemas de FTP / Conselhos{#ftp-troubleadvice-1} 
* Se você FTP novos arquivos de dados para oERDDAP™servidor enquantoERDDAP™está correndo, há a chance de queERDDAP™será recarregar o conjunto de dados durante o processo FTP. Acontece mais frequentemente do que você pode pensar&#33; Se acontecer, o arquivo parecerá válido (tem um nome válido) , mas o arquivo não é válido. SeERDDAP™tenta ler dados desse arquivo inválido, o erro resultante fará com que o arquivo seja adicionado à tabela de arquivos inválidos. Isto não é bom. Para evitar este problema, use um nome de arquivo temporário quando FTP'ing o arquivo, por exemplo, ABC2005.nc\\_TEMP . Então, o teste fileNameRegex (ver abaixo) irá indicar que este não é um arquivo relevante. Depois que o processo FTP é completo, renomeie o arquivo para o nome correto. O processo de renomeação fará com que o arquivo se torne relevante em um instante.
    
##### Extratos de Nome de Ficheiro{#file-name-extracts} 
\\[Este recurso é DEPRECATED. Por favor use[\\*\\*\\*fileNome pseudosourceName](#filename-sourcenames)Em vez disso.\\]  
EDDTableFromFiles tem um sistema para extrair uma string de cada nome de arquivo e usar isso para fazer uma variável de dados pseudo. Atualmente, não há nenhum sistema para interpretar estes Strings como datas/horas. Existem várias tags XML para configurar este sistema. Se você não precisar de parte ou todo este sistema, apenas não especifique essas tags ou use "" valores.

* preExtractRegex é um[expressão regular](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) usado para identificar o texto a ser removido do início do nome do arquivo. A remoção só ocorre se o regex for combinado. Isso geralmente começa com "^" para combinar o início do nome do arquivo.
* postagens ExtractRegex é uma expressão regular usada para identificar o texto a ser removido do final do nome do arquivo. A remoção só ocorre se o regex for combinado. Isso geralmente termina com "$" para corresponder ao final do nome do arquivo.
* Extrato Se presente, esta expressão regular é usada após preExtractRegex e postExtractRegex para identificar uma string a ser extraída do nome do arquivo (por exemplo, ostationID) . Se o regex não for combinado, todo o nome do arquivo é usado (minus preExtract e post Extrato) . Use ".\\*" para combinar com todo o nome de arquivo que é deixado após preExtractRegex e postExtractRegex.
* coluna NameForExtract é o nome de origem da coluna de dados para as cadeias extraídas. AdataVariablecom isto[sourceName](#sourcename)deve estar nodataVariableLista s (com qualquer tipo de dados, mas geralmente String) .

Por exemplo, se um conjunto de dados tiver arquivos com nomes como XYZAble.nc, XYZBaker.ncXYZCharlie.nc, ... e você quer criar uma nova variável (stationID) quando cada arquivo é lido que terá valores de ID da estação (Able, Baker, Charlie, ...) extraído dos nomes de arquivos, você pode usar essas tags:

*   &lt;preExtractRegex&gt;XYZ&lt;/preExtractRegex&gt;
O ^ inicial é um caráter especial de expressão regular que forçaERDDAP™procurar XYZ no início do nome do arquivo. Isso faz com que XYZ, se encontrado no início do nome do arquivo, seja removido (por exemplo, o nome de arquivo XYZAble.ncse torna Able.nc) .
*   &lt;postExtractRegex&gt;\\.nc$&lt;/postExtractRegex&gt;
O $ no final é um caráter especial de expressão regular que forçaERDDAP™para procurar.ncno final do nome do arquivo. Desde . é uma expressão regular caráter especial (que corresponde a qualquer personagem) , é codificado como \\. aqui. (porque 2E é o número de caráter hexadecimal por um período) . Isso causa.nc, se encontrado no final do nome do arquivo, para ser removido (por exemplo, o nome de arquivo parcial Able.ncse torna Able) .
*   &lt;extractRegex&gt;.\\*&lt;/extractRegex&gt;
A expressão regular .\\* corresponde a todos os caracteres restantes (por exemplo, o nome de arquivo parcial Able torna-se o extrato para o primeiro arquivo) .
*   &lt;columnNameForExtract&gt;stationID&lt;/columnNameForExtract&gt;
Isso dizERDDAP™para criar uma nova coluna de origem chamadastationIDao ler cada arquivo. Cada linha de dados para um determinado arquivo terá o texto extraído de seu nome de arquivo (por exemplo, Able) como o valor nostationIDcoluna.

Na maioria dos casos, existem numerosos valores para essas tags de extrato que irão produzir os mesmos resultados - expressões regulares são muito flexíveis. Mas em alguns casos, há apenas uma maneira de obter os resultados desejados.
     
##### PseudosourceNameS{#pseudo-sourcenames} 
Cada variável em cada conjunto de dadosERDDAP™tem um [&lt;sourceName&gt; (Nome de fonte) que especifica o nome da fonte para a variável. EDDTableFromFiles suporta alguns pseudosourceNames que extraem um valor de algum outro lugar (por exemplo, o nome do arquivo ou o valor de um atributo global) e promover esse valor para ser uma coluna de valores constantes para esse pedaço de dados (por exemplo, a tabela dos dados desse arquivo) . Para essas variáveis, você deve especificar o tipo de dados da variável através do [&lt;dataType&gt;] (# Datatype #) tag. Se a informação extraída é uma string dateTime, você especifica o formato da string dateTime no[atributos de unidades](#string-time-units). O pseudosourceNameopções são:
 
###### global:sourceNameS{#global-sourcenames} 
Um atributo global de metadados em cada arquivo de dados de origem pode ser promovido a ser uma coluna de dados. Se uma variável&lt;sourceName&gt; tem o formato
```
        <sourceName>global:*attributeName*</sourceName>
```
então quandoERDDAP™está lendo os dados de um arquivo,ERDDAP™procurará um atributo global desse nome (por exemplo, PI) e criar uma coluna preenchida com o valor do atributo. Isso é útil quando o atributo tem valores diferentes em arquivos de origem diferentes, porque de outra forma, os usuários só veriam um desses valores para todo o conjunto de dados. Por exemplo,
```
        <sourceName>global:PI</sourceName>
```
Quando você promove um atributo a ser dados,ERDDAP™remove o atributo correspondente. Isso é apropriado porque o valor é presumivelmente diferente em cada arquivo; enquanto que no conjunto de dados agregados emERDDAP™terá apenas um valor. Se você quiser, você pode adicionar um novo valor para o atributo para todo o conjunto de dados adicionando&lt;Nome do anúncio *atributos Nome* " *novo novo Valor* &lt;/att&gt; para o conjunto de dados global [&lt;addAttributes&gt; (#addattributes) . Para atributos globais queERDDAP™requer, por exemplo, a instituição, você deve adicionar um novo valor para o atributo.
     
###### variável:sourceNameS{#variable-sourcenames} 
O atributo metadados de uma variável em cada arquivo pode ser promovido a ser uma coluna de dados. Se uma variável&lt;[sourceName](#sourcename)\\&gt; tem o formato
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
então quandoERDDAP™está lendo os dados de um arquivo,ERDDAP™procurará o atributo especificado (por exemplo, ID) da variável especificada (por exemplo, instrumento) e criar uma coluna preenchida com o valor do atributo. A variável pai (por exemplo, instrumento) não precisa ser um dosdataVariables incluído na definição do conjunto de dados emERDDAP. Por exemplo,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Isso é útil quando o atributo tem valores diferentes em arquivos de origem diferentes, porque de outra forma, os usuários só veriam um desses valores para todo o conjunto de dados.

Quando você promove um atributo a ser dados,ERDDAP™remove o atributo correspondente. Isso é apropriado porque o valor é presumivelmente diferente em cada arquivo; enquanto que no conjunto de dados agregados emERDDAP™terá apenas um valor. Se você quiser, você pode adicionar um novo valor para o atributo para todo o conjunto de dados adicionando&lt;Nome do anúncio *atributos Nome* " *novo novo Valor* &lt;/att&gt; para a variável [&lt;addAttributes&gt; (#addattributes) . Para atributos queERDDAP™requer, por exemplo,ioos\\_category  (dependendo da sua configuração) , você deve adicionar um novo valor para o atributo.
        
###### Nome do arquivosourceNameS{#filename-sourcenames} 
Você pode extrair parte do arquivoName e promover isso para ser uma coluna de dados. O formato deste pseudo [&lt;sourceName&gt; (Nome de fonte) é
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Por exemplo,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Quando EDDTableFromFiles estiver lendo os dados de um arquivo, ele irá certificar-se do arquivoNome (por exemplo, A201807041442.slcpV1.nc) corresponde à expressão regular especificada ("Regex") e extrair o especificado (neste caso, o primeiro) grupo de captura (que é uma parte cercada por parênteses) , por exemplo, "201807041442". (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) O regex pode ser especificado como uma string com ou sem citações circundantes. Se o regex for especificado como uma string com aspas circundantes, a string deve ser[Corda de estilo JSON](https://www.json.org/json-en.html)  (com caracteres especiais escapou com caracteres \\) . O número do grupo de captura é geralmente 1 (o primeiro grupo de captura) , mas pode ser qualquer número.
     
###### CaminhosourceNameS{#pathname-sourcenames} 
Você pode extrair parte do caminho completo de um arquivo Nome (/directories/fileName.ext) e promover isso para ser uma coluna de dados. O formato deste pseudo [&lt;sourceName&gt; (Nome de fonte) é
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Por exemplo,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Quando EDDTableFromFiles estiver lendo os dados de um arquivo, ele irá certificar-se do caminho completoNome (por exemplo, /data/myDatasetID/BAY17/B201807041442.nc. Para este teste, os separadores de diretório sempre serão'/', nunca '\\ ') corresponde à expressão regular especificada ("Regex") e extrair o especificado (neste caso, o primeiro) grupo de captura (que é uma parte cercada por parênteses) Por exemplo, "BAY17". (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) O regex pode ser especificado como uma string com ou sem citações circundantes. Se o regex for especificado como uma string com aspas circundantes, a string deve ser uma[Corda de estilo JSON](https://www.json.org/json-en.html)  (com caracteres especiais escapou com caracteres \\) . O número do grupo de captura é geralmente 1 (o primeiro grupo de captura) , mas pode ser qualquer número.
         
##### "0 ficheiros" Mensagem de erro{#0-files-error-message-2} 
* Se você correr[Gerar conjuntos de dadosXml](#generatedatasetsxml)ou[DasDds](#dasdds), ou se você tentar carregar um EDDTable From... Dataset de arquivos emERDDAP™, e você recebe uma mensagem de erro "0 files" indicando queERDDAP™encontrado 0 arquivos correspondentes no diretório (quando você acha que existem arquivos correspondentes nesse diretório) :
    * Verifique se os arquivos estão realmente nesse diretório.
    * Verifique a ortografia do nome do diretório.
    * Verifique o arquivoNameRegex. É realmente, muito fácil cometer erros com regexes. Para fins de teste, tente o regex .\\* que deve corresponder a todos os nomes de arquivos. (Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Verifique se o usuário que está executando o programa (por exemplo, user=tomcat (?) para Tomcat /ERDDAP) tem permissão 'read' para esses arquivos.
    * Em alguns sistemas operacionais (por exemplo, SELinux) e dependendo das configurações do sistema, o usuário que executou o programa deve ter permissão de 'leitura' para toda a cadeia de diretórios que levam ao diretório que tem os arquivos.
         
##### padronizar O quê?{#standardizewhat} 
* Quando qualquer subclasse de EDDTableFromFiles está agregando um conjunto de arquivos de origem, para uma determinada variável, todos os arquivos de origem DEVE ter valores de atributos idênticos para vários atributos:scale\\_factor,add\\_offset, \\_Unsigned,missing\\_value, \\_FillValue e unidades). Pense nisso: se um arquivo tiver windSpeed units=knots e outro tiver windSpeed units=m/s, então os valores de dados dos dois arquivos não devem ser incluídos no mesmo conjunto de dados agregado. Assim, quando o EDDTableFromFiles primeiro cria o conjunto de dados, ele lê os valores de atributos de um arquivo, então rejeita todos os arquivos que têm valores diferentes para esses atributos importantes. Para a maioria das coleções de arquivos, este não é um problema porque os atributos de todas as variáveis são consistentes. No entanto, para outras coleções de arquivos, isso pode levar a 1%, 10%, 50%, 90% ou até mesmo 99% dos arquivos sendo rejeitados como arquivos "maus". Isso é um problema.
    
EDDTableDe arquivos tem um sistema para lidar com este problema: padronizar O quê? A padronização Que configuração diz EDDTableFromFiles para padronizar os arquivos assim que lê-los, antes EDDTableFromFiles olha para os atributos para ver se eles são consistentes.
    
O lado flip é: se o conjunto de dados não tiver esse problema, não use padronizar O quê? padronizar O que tem riscos potenciais (discutido abaixo) e ineficiências. Então, se você não precisa realmente das características de padronização O que, não há necessidade de enfrentar os riscos potenciais e ineficiências. A maior ineficiência é: Quando vários padronizar Que opções são usadas por um conjunto de dados, implica que os arquivos de origem estão armazenando dados de maneiras significativamente diferentes (por exemplo, com diferentesscale\\_factoreadd\\_offset, ou com strings de tempo usando formatos diferentes) . Assim, para um determinado constrangimento em um pedido de usuário, não há nenhuma maneira paraERDDAP™para fazer uma única restrição de nível de fonte que pode ser aplicada a todos os arquivos de origem. Então...ERDDAP™só pode aplicar as restrições afetadas em um nível superior. Então...ERDDAP™tem que ler os dados de mais arquivos antes de aplicar as restrições de nível de destino mais altas. Assim, solicitações aos conjuntos de dados que usam a padronização O que demora mais para ser processado.
    
Para usar este sistema, você precisa especificar
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
no[datasets.xmlpara o EDDTable De... Dataset de arquivos](#eddtablefromfiles-skeleton-xml)(dentro de&lt;dataset&gt; tag).
    
O *padronizar O quê?* valor especifica quais mudanças EDDTableFromFiles devem tentar aplicar. As mudanças são a soma de alguma combinação de:
    
1. Unpack
Isso faz muitas operações comuns e seguras para padronizar colunas numéricas nos arquivos:
    * Sescale\\_factore/ouadd\\_offsetatributos estão presentes, removê-los e aplicá-los para descompactar os valores de dados.
    * Descompactar atributos embalados (por exemplo, real\\_min, real\\_max,actual\\_range,data\\_min,data\\_max, data\\_range,valid\\_min,valid\\_max,valid\\_range) , se presente, se a variável foi embalada, e se os valores dos atributos foram embalados (isso é complicado, mas razoavelmente confiável) .
    * Se \\_FillValue e/oumissing\\_valueestão presentes, convertam esses valores de dados paraERDDAP's "padrão" valores ausentes: MAX\\_VALUE para tipos inteiros (por exemplo, 127 para bytes, 32.767 para short, e 2,147,483,647 para ints, 9223372036854775807 por muito tempo) e NaN para dobras e flutuadores.
    * Remover o antigo \\_FillValue e/oumissing\\_valueatributos (se houver) , e substituí-los com apenas \\_FillValue=\\[oERDDAP™valor de falta padrão\\].
         
2. Normalizar Tempos Numéricos
Se uma coluna numérica tiver unidades de tempo numérico em estilo CF (" *timeUnits* desde então *baseTime* ", por exemplo, "dias desde 1900-01-01") , isso converte a data Valores de tempo em"seconds since 1970-01-01T00:00:00Z"valores e muda o atributo de unidades para indicar isso.
Se isso for selecionado e houver uma chance de que essa variável tenhascale\\_factorouadd\\_offset, #1 deve ser selecionado também.
     
3. Aplicar cordamissing\\_value  
Se uma coluna String tiver \\_FillValue e/oumissing\\_valueatributos, isso converte esses valores para "" e remove os atributos.
     
4. Encontrar numéricomissing\\_value  
Se uma coluna numérica não tiver \\_FillValue oumissing\\_valueatributos, isso tenta identificar um numérico indefinidomissing\\_value  (por exemplo, -999, 9999, 1e37f) e converter instâncias dele para os valores "padrão" (MAX\\_VALUE para tipos inteiros, e NAN para dobras e flutuadores) .
     **Esta opção tem um risco:** se o maior ou menor valor de dados válido se parece com um valor ausente (por exemplo, 999) , então esses valores de dados válidos serão convertidos em valores ausentes (por exemplo, NaN) .
     
5. Alterar corda "N/A" para ""
Para cada coluna String, converter várias cadeias comumente usadas para indicar um valor de String ausente para ". Atualmente, isso procura "., "...", "-", "?", "???", "N/A", "NA", "none", "não aplicável", "null", "não conhecido", "não especificado". A busca de string é insensível a maiúsculas e aplicada após as strings serem cortadas. "nd" e "other" não estão especificamente na lista.
     **Esta opção tem um risco:** As cordas que você considera serem valores válidos podem ser convertidas em ".
     
6. Normalizar para String ISO 8601 DateTimes
Para cada coluna String, tente converter não-purely-numeric String dateTimes (por exemplo, "Jan 2, 2018") para ISO 8601 Data de corda ("2018-01-02") .
     **Nota** que todos os valores de dados para a coluna devem usar o mesmo formato, caso contrário, esta opção não fará alterações em uma determinada coluna.
     **Esta opção tem um risco:** Se houver uma coluna com valores de cadeia de caracteres que por acaso pareçam uma data comum Formato de tempo, eles serão convertidos para ISO 8601 Data de corda.
     
7. Normalizar Tempos de Data Compacto para ISO 8601 DataTimes
Para cada String ou coluna do tipo inteiro, tente converter a data de String puramente numéricaTimes (por exemplo, "20180102") para ISO 8601 Data de corda ("2018-01-02") .
     **Nota** que todos os valores de dados para a coluna devem usar o mesmo formato, caso contrário, esta opção não fará alterações em uma determinada coluna.
     **Esta opção tem um risco:** Se houver uma coluna com valores que não sejam data compacta Tempos mas parecem datas compactasTimes, eles serão convertidos para ISO 8601 String dateTimes.
     
8. Normalizar unidades
Isso tenta padronizar a cadeia de unidades para cada variável. Por exemplo, "metros por segundo", "metro/segundo","m.s^-1","m s-1", "m.s-1" será convertido para "m.s-1". Isso não muda os valores dos dados. Isso funciona bem para válidoUDUNITSunidades strings, mas pode ter problemas com strings inválidas ou complexas. Você pode lidar com problemas especificando específicos de pares em&lt;padronizeUdunits&gt; emERDDAP'
    \\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheiro. Por favor envie um e-mail para quaisquer alterações que você fizer ao Chris. John noaa.gov para que eles possam ser incorporados no default message.xml.
     **Esta opção tem um risco:** Isso pode mangar algumas unidades complexas ou inválidas; no entanto, você pode usar a solução descrita acima para evitar problemas se ocorrerem.
         
    
O valor padrão de padronização O que é 0, o que não faz nada.

Se/quando você alterar o valor da padronização Da próxima vez que o conjunto de dados for recarregado,ERDDAP™irá reler todos os arquivos de dados para o conjunto de dados, a fim de reconstruir a mini-base de dados com informações sobre cada arquivo. Se o conjunto de dados tiver muitos arquivos, isso levará muito tempo.
    
Notas:

* Uma coisa complicada é...
A padronização Que configuração é usada para todas as colunas no arquivo de origem. Assim, por exemplo, usando #2048 pode converter com sucesso uma coluna de String dataTimes compactos em ISO 8601 String dateTimes, mas também pode erroneamente converter uma coluna com Strings que só por acaso parece uma data compactaTimes.
     
*   datasets.xmle Gerar conjuntos de dados Xml -
É especialmente complicado para corrigir as configuraçõesdatasets.xmlpara fazer seu conjunto de dados funcionar da maneira que você quer. A melhor abordagem (como sempre) é:
    1. Uso[Gerar conjuntos de dadosXml](#generatedatasetsxml)e especifique o valor de padronizar O que você gostaria de usar.
    2. Uso[DasDds](#dasdds)para garantir que o conjunto de dados carrega corretamente e reflete a padronização Que configuração que você especificou.
    3. Teste o conjunto de dados à mão quando estiver emERDDAP™para garantir que as variáveis afetadas funcionem conforme esperado.
         
* Riscos -
Opções #256 e acima são mais arriscadas, ou seja, há uma maior chance de queERDDAP™vai fazer uma mudança que não deve ser feita. Por exemplo, a opção #2048 pode acidentalmente converter uma variável com cadeias de caracteres de identificação de estação que tudo simplesmente parece datas de "compacto" ISO 8601 (por exemplo, 20180102) em ISO 8601"extended"datas ("2018-01-02") .
     
* Devagar depois de uma mudança...
Desde o valor de padronizar O que muda os valores de dados que EDDTableFromFiles vê para cada arquivo de dados, se você alterar a padronização Que configuração, EDDTableFromFiles vai jogar fora todas as informações em cache sobre cada arquivo (que inclui o min e max para cada variável de dados em cada arquivo) e reler cada arquivo de dados. Se um conjunto de dados tem um grande número de arquivos, isso pode ser muito demorado, então levará muito tempo para o conjunto de dados para recarregar a primeira vezERDDAP™recarrega-o depois de fazer a mudança.
     
* Heurística -
Opções #256 e acima usar heurística para fazer suas mudanças. Se você se deparar com uma situação em que as heurísticas tomar uma decisão ruim, por favor envie um e-mail para uma descrição do problema para Chris. John no Noaa. Gov para que possamos melhorar a heurística.
     
* Alternativas...
Se uma das opções standardizeWhat não resolver um problema para um determinado conjunto de dados, você pode ser capaz de resolver o problema, fazendo um[.ncarquivo de ml](#ncml-files)para paralelo a cada arquivo de dados e definir mudanças nas coisas nos arquivos para que os arquivos sejam consistentes. Então, diga ao EDDTable De... Dataset de arquivos para agregar o.ncArquivos de ml.
    
Ou, use[NCO](#netcdf-operators-nco)para realmente fazer alterações nos arquivos de modo que os arquivos são consistentes.
        
##### Colunas separadas para o ano, mês, data, hora, minuto, segundo{#separate-columns-for-year-month-date-hour-minute-second} 
É bastante comum para arquivos de dados tabular ter colunas separadas por ano, mês, data, hora, minuto, segundo. AntesERDDAP™v2.10, a única solução foi editar o arquivo de dados para combinar essas colunas em uma coluna de tempo unificada. ComERDDAP™2.10+, você pode usar o
Não.&lt;sourceName- Sim. *expressão* &lt;sourceName&gt; (Nome de fonte) para contarERDDAP™como combinar as colunas de origem para fazer uma coluna de tempo unificada, então você não precisa mais editar o arquivo de origem.
##### &lt;skipHeaderToRegex &gt;{#skipheadertoregex} 
* Não.&lt;skipHeaderToRegex&gt;] (O que é isso?) - ...
Opcional. (Para EDDTableFromAsciiFiles e EDDTableDeColumnarAsciiFiles conjuntos de dados apenas.)   
Quando EDDTableFromAsciiFiles lê um arquivo de dados, ele irá ignorar todas as linhas até e incluindo a linha que corresponde a esta expressão regular. O padrão é "", que não usa esta opção. Um exemplo é
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
que irá ignorar todas as linhas até e incluindo uma linha que começa com "\\*\\*\\* END OF HEADER».

Quando você usa esta tag,&lt;colunaNomesRow&gt; e&lt;firstDataRow&gt; agir como se o cabeçalho foi removido antes que o arquivo seja lido. Por exemplo, você usaria columnNamesRow=0 se os nomes das colunas estiverem na linha logo após o cabeçalho.

Se você quiser usar gerar gerar Conjuntos de dados Xml com um conjunto de dados que precisa desta tag:

1. Faça um novo, temporário, arquivo de amostra copiando um arquivo existente e removendo o cabeçalho.
2. Executar gerar Conjuntos de dados Xml e especifique esse arquivo de amostra.
3. Adicione manualmente o&lt;skipHeaderToRegex&gt; tag para odatasets.xmlChuck.
4. Excluir o arquivo temporário e amostra.
5. Use o conjunto de dados emERDDAP.
##### &lt;skipLinesRegex &gt;{#skiplinesregex} 
Opcional. (Para EDDTableFromAsciiFiles e EDDTableDeColumnarAsciiFiles conjuntos de dados apenas.)   
Quando EDDTableFromAsciiFiles lê um arquivo de dados, ele irá ignorar todas as linhas que correspondem a esta expressão regular. O padrão é "", que não usa esta opção. Um exemplo é
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
que irá ignorar todas as linhas que começam com "#".

Quando você usa esta tag,&lt;colunaNomesRow&gt; e&lt;firstDataRow&gt; agir como se todas as linhas correspondentes tivessem sido removidas antes que o arquivo seja lido. Por exemplo, você usaria columnNamesRow=0 mesmo se houver várias linhas começando com, por exemplo, "#" no início do arquivo.
    
#### EDDTable FromFiles esqueleto XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable De AsciiService{#eddtablefromasciiservice} 
[ **EDDTable De AsciiService** ](#eddtablefromasciiservice)é essencialmente um raspador de tela. Pretende-se lidar com fontes de dados que têm um serviço web simples para solicitar dados (muitas vezes um formulário HTML em uma página web) e que pode retornar os dados em algum formato ASCII estruturado (por exemplo, um formato de texto ASCII de valor de vírgula ou colunar, muitas vezes com outras informações antes e/ou após os dados) .

EDDTableFromAsciiService é a superclasse de todas as classes EDDTableFromAsciiService.... Você não pode usar EDDTableFromAsciiService diretamente. Em vez disso, use uma subclasse de EDDTableFromAsciiService para lidar com tipos específicos de serviços:

*   [EDDTable De ASciiServiceNOS](#eddtablefromasciiservicenos)recebe dados deNOAAServiços ASCII da NOS.

Atualmente, nenhum outro tipo de serviço é suportado. Mas geralmente é relativamente fácil apoiar outros serviços se eles trabalham de forma semelhante. Contacte-nos se tiver um pedido.

#### Detalhes{#details} 
As seguintes informações aplicam-se a todas as subclasses de EDDTableFromAsciiService.

* Restrições...ERDDAP™solicitações de dados tabular podem colocar restrições em qualquer variável. O serviço subjacente pode ou não permitir restrições em todas as variáveis. Por exemplo, muitos serviços só suportam restrições nos nomes das estações, latitude, longitude e tempo. Assim, quando uma subclasse de EDDTableFromAsciiService recebe um pedido para um subconjunto de um conjunto de dados, ele passa o máximo de restrições possível para o serviço de dados de origem e, em seguida, aplica as restrições restantes aos dados retornados pelo serviço, antes de entregar os dados ao usuário.
* Alcance válido -- Ao contrário de muitos outros tipos de conjuntos de dados, o EDDTableFromAsciiService geralmente não conhece o intervalo de dados para cada variável, por isso não pode rejeitar rapidamente solicitações de dados fora do intervalo válido.
* Parsing the ASCII Text Response -- Quando EDDTableFromAsciiService recebe uma resposta de um Serviço de Texto ASCII, deve validar que a resposta tem o formato e a informação esperados e, em seguida, extrair os dados. Você pode especificar o formato usando várias tags especiais no pedaço de XML para este conjunto de dados:
    *   &lt;antesData1&gt; através&lt;antesData10&gt; tags -- Você pode especificar uma série de peças de texto (quantos quiser, até 10) que EDDTableFromAsciiService deve procurar no cabeçalho do texto ASCII retornado pelo serviço com&lt;antesData1&gt; através&lt;antes deData10&gt;. Por exemplo, isso é útil para verificar se a resposta inclui as variáveis esperadas usando as unidades esperadas. A última tag antesData que você especifica identifica o texto que ocorre antes do início dos dados.
    *   &lt;depois de dados&gt; - ... Isso especifica o texto que o EDDTableFromAsciiService procurará no texto ASCII retornado pelo serviço que significa o fim dos dados.
    *   &lt;NoData&gt; - ... Se EDDTableFromAsciiService encontrar este texto no texto ASCII retornado pelo serviço, conclui que não há dados que correspondam ao pedido.
#### EDDTable FromAsciiService esqueleto XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable De ASciiServiceNOS{#eddtablefromasciiservicenos} 
[ **EDDTable De ASciiServiceNOS** ](#eddtablefromasciiservicenos)faz conjuntos de dados EDDTable dos serviços de dados de texto ASCII oferecidos porNOAA'[Serviço Nacional do Oceano (NÃO) ](https://oceanservice.noaa.gov/). Para obter informações sobre como esta classe funciona e como usá-la, veja a superclasse desta classe[EDDTable De AsciiService](#eddtablefromasciiservice). É improvável que qualquer outro que não Bob Simons precise usar esta subclasse.

Uma vez que os dados dentro da resposta de um serviço NOS utilizam um formato de texto ASCII colunar, as variáveis de dados que não sejam latitude e longitude devem ter um atributo especial que especifica quais caracteres de cada linha de dados contêm os dados dessa variável, por exemplo,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableDe todos os conjuntos de dados{#eddtablefromalldatasets} 
[ **EDDTableDe todos os conjuntos de dados** ](#eddtablefromalldatasets)é um conjunto de dados de nível superior que tem informações sobre todos os outros conjuntos de dados que estão atualmente carregados em seuERDDAP. Ao contrário de outros tipos de conjuntos de dados, não há especificação para oallDatasetsdataset indatasets.xml.ERDDAP™cria automaticamente um conjunto de dados EDDTableFromAllDatasets (comdatasetID= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =allDatasets) . Assim, umallDatasetsdataset será criado em cadaERDDAP™instalação e trabalhará da mesma maneira em cadaERDDAP™instalação.

OallDatasetsdataset é um conjunto de dados tabular. Tem uma linha de informações para cada conjunto de dados. Tem colunas com informações sobre cada conjunto de dados, por exemplo,datasetID, acessível, instituição, título, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, etc. Porque...allDatasetsé um conjunto de dados tabular, você pode consultar da mesma forma que você pode consultar qualquer outro conjunto de dados tabular emERDDAP™, e você pode especificar o tipo de arquivo para a resposta. Isso permite que os usuários procurem conjuntos de dados de interesse de maneiras muito poderosas.
 
### EDDTable FromAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTable FromAsciiFiles** ](#eddtablefromasciifiles)agrega dados de vírgula, tab-, ponto-, ou arquivos de dados tabulares ASCII separados por espaço.

* Na maioria das vezes, os arquivos terão nomes de colunas na primeira linha e dados começando na segunda linha. (Aqui, a primeira linha do arquivo é chamada linha número 1.) Mas você pode usar&lt;colunaNomesRow&gt; e&lt;primeiroDataRow&gt; em seudatasets.xmlarquivo para especificar um número de linha diferente.
*   ERDDAP™permite que as linhas de dados tenham diferentes números de valores de dados.ERDDAP™assume que os valores de dados ausentes são as colunas finais na linha.ERDDAP™atribui os valores de valor padrão ausentes para os valores de dados ausentes. (adicionado v1.56) 
* Os arquivos ASCII são fáceis de trabalhar, mas não são a maneira mais eficiente de armazenar / recuperar dados. Para maior eficiência, salve os arquivos comoNetCDFv3.ncarquivos (com uma dimensão, "row", compartilhada por todas as variáveis) Em vez disso. Você pode[usoERDDAP™para gerar novos arquivos](#millions-of-files).
* Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Por causa da falta total de metadados em arquivos ASCII, você sempre precisará editar os resultados de GerarDatasetsXml.
* Quando:ERDDAP™lê arquivos de dados ASCII, se encontrar um erro em uma determinada linha (por exemplo, número incorreto de itens) , registra uma mensagem de aviso ("WARNING: Linha má (S) de dados" ... com uma lista das linhas ruins em linhas subseqüentes) ao[arquivo log.txt](/docs/server-admin/additional-information#log)e, em seguida, continua a ler o resto do arquivo de dados. Assim, é sua responsabilidade olhar periodicamente (ou escrever um script para fazê-lo) para essa mensagem no log. txt para que você possa corrigir os problemas nos arquivos de dados.ERDDAP™é configurado desta forma para que os usuários possam continuar a ler todos os dados válidos disponíveis, mesmo que algumas linhas do arquivo tenham falhas.
     
### Tabela de EDD TolsXmlFiles{#eddtablefromawsxmlfiles} 
[ **Tabela de EDD TolsXmlFiles** ](#eddtablefromawsxmlfiles)agrega dados de um conjunto de Estação de Tempo Automático (AWS) Arquivos de dados XML usando a API XML do WeatherBug Rest (que não é mais ativo) .

* Este tipo de arquivo é uma maneira simples, mas ineficiente de armazenar os dados, porque cada arquivo geralmente parece conter a observação de apenas um ponto de tempo. Então pode haver um grande número de arquivos. Se você quiser melhorar o desempenho, considere consolidar grupos de observações (Vale uma semana?) emNetCDFv3.ncarquivos (melhor:.ncarquivos com o[CF Geometrias de amostragem discretas (DSG) Contígua Ragged Array formato](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) e usando[EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)  (ou[EDDTable FromNcCFFiles](#eddtablefromnccffiles)) para servir os dados. Você pode[usoERDDAP™para gerar novos arquivos](#millions-of-files).
* Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.
     
### EDDTable FromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTable FromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles)agrega dados de arquivos de dados ASCII tabular com colunas de largura fixa.

* Na maioria das vezes, os arquivos terão nomes de colunas na primeira linha e dados começando na segunda linha. A primeira linha / linha no arquivo é chamada linha #1. Mas você pode usar&lt;colunaNomesRow&gt; e&lt;primeiroDataRow&gt; em seudatasets.xmlarquivo para especificar um número de linha diferente.
* O&lt;addAttributes&gt; para cada um&lt;dataVariable&gt; para estes conjuntos de dados DEVE incluir estes dois atributos especiais:
    
    *   &lt;nome do att="startColumn"&gt; *Intérprete* &lt;att&gt; -- especifica a coluna de caracteres em cada linha que é o início desta variável de dados.
    *   &lt;nome do att="stopColumn"&gt; *Intérprete* &lt;att&gt; -- especifica a coluna de caracteres em cada linha que é a 1 após o final desta variável de dados.
    
A primeira coluna de caracteres é chamada coluna #0.
Por exemplo, para este arquivo que tem valores de tempo que aumentam os valores de temperatura :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
a variável de dados de tempo teria
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
e a variável de dados de tempo teria
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Esses atributos devem ser especificados para todas as variáveis exceto[valor fixo](#fixed-value-sourcenames)e[nome de arquivo-fonte-nomes](#filename-sourcenames)variáveis.
* Os arquivos ASCII são fáceis de trabalhar, mas não são uma maneira eficiente de armazenar / recuperar dados. Para maior eficiência, salve os arquivos comoNetCDFv3.ncarquivos (com uma dimensão, "row", compartilhada por todas as variáveis) Em vez disso. Você pode[usoERDDAP™para gerar novos arquivos](#millions-of-files).
* Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Devido à dificuldade de determinar as posições de início e fim para cada coluna de dados e a total falta de metadados em arquivos ASCII, você sempre precisará editar os resultados de GerarDatasetsXml.
     
### EDDTable FromHttpGet{#eddtablefromhttpget} 
Tabela de EDD FromHttpGet é diferente de todos os outros tipos de conjuntos de dados emERDDAP™na medida em que tem um sistema pelo qual "autores" específicos podem adicionar dados, revisar dados ou excluir dados do conjunto de dados por regularHTTP GETou[AM POSTAM](#http-post)solicitações de um programa de computador, um script ou um navegador. O conjunto de dados é queryable pelos usuários da mesma forma que todos os outros conjuntos de dados EDDTable são queryable inERDDAP. Veja a descrição da superclasse desta classe,[Tabela EDD dos arquivos](#eddtablefromfiles), para ler sobre as características que são herdadas dessa superclasse.

As características únicas do EDDTableFromHttpGet são descritas abaixo. Você precisa ler toda esta seção inicial e compreendê-la; caso contrário, você pode ter expectativas irrealistas ou se meter em problemas que é difícil de corrigir.

#### Uso intencional{#intended-use} 
Este sistema destina-se a:

* Tabular (in situ) dados, não dados gradeados.
* Dados em tempo real -
O objetivo é permitir um autor (por exemplo, o sensor, um script QC automatizado ou um humano específico) para fazer uma mudança no conjunto de dados (através de[.insert ou comando .delete](#insert-and-delete)) e tornar essa mudança acessível aERDDAP™usuários, todos em menos de 1 segundo, e possivelmente muito mais rápido. A maioria desse 1 segundo é tempo de rede.ERDDAP™pode processar a solicitação em cerca de 1 ms e os dados são imediatamente acessíveis aos usuários. Isto é...[rápido](#httpget-speed),[robusto](#robust)e[sistema confiável](#system-reliability).
* Quase qualquer frequência de dados -
Este sistema pode aceitar dados infrequentes (por exemplo, diariamente) através de dados muito frequentes (por exemplo, dados de 100 Hz) . Se você otimizar o sistema, ele pode lidar com dados de maior frequência (talvez 10 KHz dados se você ir para extremos) .
* Dados de um sensor ou uma coleção de sensores semelhantes.
*   [Versão](#versioning)/[Ciência reprodutiva](https://en.wikipedia.org/wiki/Reproducibility)/DOIs...
Situações onde você precisa ser capaz de fazer alterações nos dados (por exemplo, mudar uma bandeira de controle de qualidade) , saber qual autor fez cada mudança, saber o timestamp de quando o autor fez a mudança, e (mediante pedido) ser capaz de ver os dados originais de antes da mudança foi feita. Assim, esses conjuntos de dados são elegíveis para[DOIS](https://en.wikipedia.org/wiki/Digital_object_identifier). porque eles se encontramDOIexigência que o conjunto de dados é imutável, exceto por agregação. Em geral, quase conjuntos de dados em tempo real não são elegíveis paraDOIs porque os dados são frequentemente alterados retroativamente (por exemplo, para fins de QA/QC) .
     

Uma vez que os dados estão em um conjunto de dados EDDTableFromHttpGet, qualquer usuário pode solicitar dados da mesma forma que solicitar dados de qualquer outro conjunto de dados EDDTable.
     
#### Experimental: Cuidado.{#experimental-be-careful} 
Uma vez que este sistema é novo e uma vez que os dados ambientais perdidos não podem ser requisitados, você deve tratar EDDTableFromHttpGet como experimental. Se você está transicionando de outro sistema, execute o velho sistema e o novo sistema em paralelo até que você esteja confiante de que o novo sistema funciona bem (semanas ou meses, não apenas horas ou dias) . Em todos os casos, verifique se o seu sistema arquiva separadamente as URLs .insert e .delete que são enviadas para o conjunto de dados EDDTableFromHttpGet (mesmo se apenas nos logs Apache e/ou Tomcat) Pelo menos por um tempo. E em todos os casos, certifique-se de que os arquivos de dados criados pelo seu conjunto de dados EDDTableFromHttpGet são rotineiramente suportados até dispositivos de armazenamento de dados externos. (Note que[rsync](https://en.wikipedia.org/wiki/Rsync). pode fazer backup dos arquivos de dados criados pelo EDDTableFromHttpGet de forma muito eficiente.)   
     
#### .insert e .delete{#insert-and-delete} 

Para qualquer conjunto de dadosERDDAP™, quando você envia um pedido paraERDDAP™para um subconjunto dos dados em um conjunto de dados, você especifica o tipo de arquivo que deseja para a resposta, por exemplo, .csv,.htmlTable,.nc,.json. EDDTable FromHttp Obter estende este sistema para suportar dois tipos de arquivo adicionais que podem inserir (ou mudar) ou excluir dados no conjunto de dados:

* Inserir
    * A solicitação é formatada como uma resposta padrão do formulário HTML, com pares chave=valor, separados por '&'. Por exemplo,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
dizERDDAP™para adicionar ou alterar os dados parastationID=46088 para o tempo especificado.
    * O autor desta mudança é JohnSmith e a chave é algumKey1.
    * A URL deve incluir valores válidos (não faltando valores) para todos os[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)
    * Se os valores dohttpGetRequired Variáveis no pedido (por exemplo,stationIDe tempo) combinar os valores em uma linha já no conjunto de dados, os novos valores efetivamente substituir os valores antigos (embora os valores antigos ainda estejam acessíveis se o usuário solicitar dados de um anterior[versão](#versioning)do conjunto de dados) .
    * A URL .insert nunca deve incluir &timestamp= (ERDDAP™gera esse valor) ou e-mail: (que é especificado por .insert (que é comando=0) ou (que é o comando 1) ) .
    * Se a URL .insert não especificar valores para outras colunas que estão no conjunto de dados, elas são assumidas como os valores ausentes nativos. (MAX\\_VALUE para tipos de dados inteiros, NaN para flutuadores e duplos, e "" para cordas) .
             
    * Não.
        * A solicitação é formatada como uma resposta padrão do formulário HTML, com pares chave=valor, separados por '&'. Por exemplo,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
dizERDDAP™para excluir os dadosstationID=46088 no tempo especificado.
        * O autor desta mudança é JohnSmith e a chave é algumKey1.
        * A URL deve especificar[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)no pedido (por exemplo,stationIDe tempo) . Se esses valores corresponderem aos valores em uma linha já no conjunto de dados (que eles geralmente vão) , os valores antigos são efetivamente excluídos (embora os valores antigos ainda estejam acessíveis se um usuário solicitar dados de um anterior[versão](#versioning)do conjunto de dados) .
        * Não há necessidade de especificar valores para não-HttpGetRequiredVariables, além do autor, que é necessário para autenticar o pedido.
             
    
Detalhes:
    * .insert e .delete solicitações são formatadas como respostas de formulário HTML padrão, com pares key=value, separados por '&'. Os valores devem ser[por cento codificado](https://en.wikipedia.org/wiki/Percent-encoding). Assim, você precisa codificar caracteres especiais na forma %HH, onde HH é o valor hexadecimal de 2 dígitos do personagem. Normalmente, você só precisa converter alguns dos caracteres de pontuação: % em %25, & em %26, " em %22,&lt;em %3C, = em %3D, &gt; em %3E, + em %2B,|em %7C,\\[em %5B,\\]em %5D, espaço em %20, e converter todos os caracteres acima #127 em sua forma UTF-8 e, em seguida, por cento codificar cada byte da forma UTF-8 no formato %HH (pedir ajuda a um programador) .
    * .insert e .delete pedidos devem incluir o[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute), por exemplo,stationIDe tempo. Para pedidos .insert, as variáveis que não são especificadas no pedido são assumidas como valores ausentes (MAX\\_VALUE para variáveis integer, NaN para variáveis flutuantes e duplas, e uma string vazia para variáveis String) . Para pedidos .delete, valores para non-HttpGetRequired Variáveis (diferente do autor, que é necessário) são ignorados.
    * .insert e .delete solicitações devem incluir o nome do autor e a chave do autor através de um parâmetro no formulário autor= *autor\\_key* como o último parâmetro no pedido. Requirir isso para ser a última garante que todo o pedido foi recebido porERDDAP. Apenas o autor (não a chave) será armazenado no arquivo de dados. Você deve especificar a lista de permitidos *autor\\_key* 's através do atributo global[httpBeco](#httpgetkeys)
    * Os parâmetros .insert e .delete podem ser escalares (único) valores ou arrays de qualquer comprimento na forma\\[valor1, valor2, valor3,...,valueN\\]. Para um determinado pedido, todas as variáveis com arrays devem ter arrays com o mesmo número de valores (mais é um erro) . Se uma solicitação tiver valores escalares e array, os valores escalares são replicados para se tornar arrays com o mesmo comprimento que os arrays especificados, por exemplo, &stationID=46088 pode ser tratado como &gt;stationID= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =\\[46088, 46088, 46088\\]. Arrays são a chave para[alta taxa de transferência](#httpget-speed). Sem arrays, será desafiador para .insert ou .delete mais de 8 linhas de dados por segundo de um autor remoto (por causa de toda a sobrecarga da rede) . Com arrays, será fácil .insert ou .delete mais de 1000 linhas de dados por segundo de um sensor remoto.
    * .insert e .delete aceitar (sem uma mensagem de erro) números de ponto flutuante quando inteiros são esperados. Nesses casos, o conjunto de dados rodeia os valores para inteiros.
    * .insert e .delete aceitar (sem uma mensagem de erro) números inteiros e de ponto flutuante que estão fora de alcance do tipo de dados da variável. Nesses casos, o conjunto de dados armazena os valores comoERDDAPOs valores perdidos nativos para esse tipo de dados (MAX\\_VALUE para tipos inteiros e NaN para flutuadores e dobras) .
         
#### Resposta{#response} 
Se o URL .insert ou .delete tiver sucesso, o código de resposta HTTP será 200 (Está bem.) e a resposta será texto com um.jsonobjeto, por exemplo,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Note que os timestamps têm precisão milissegunda.

Se a URL .insert ou .delete falhar, você receberá um código de resposta HTTP diferente de 200 (Está bem.) , por exemplo, Erro 403 Proibido se você enviar um autor incorreta\\_key valor.ERDDAP™envia o código de resposta HTTP (não, por exemplo, um.jsonerro formatado) porque é assim que as coisas são feitas na internet e porque os erros podem ocorrer em qualquer lugar do sistema (por exemplo, na rede, que retorna um erro HTTP) . Se o erro é deERDDAP™, a resposta pode incluir algum texto (não.json) com uma explicação mais detalhada do que correu mal, mas o código de resposta HTTP (200 = Ok, qualquer outra coisa é problema) é a maneira adequada de verificar se o .insert ou .delete conseguiu. Se verificar o código de resposta HTTP não é possível ou é inconveniente, procure "status":"sucesso" no texto de resposta que deve ser uma indicação confiável do sucesso.
    
#### Arquivos de log{#log-files} 
Quando EDDTableFromHttpGet recebe comandos .insert e .delete, ele simplesmente anexa as informações ao arquivo relevante em um conjunto de arquivos de log, cada um dos quais é uma tabela armazenada em um[JSON Linhas arquivo CSV](https://jsonlines.org/examples/). Quando um usuário faz um pedido de dados,ERDDAP™lê rapidamente os arquivos de log relevantes, aplica as alterações no conjunto de dados na ordem que foram feitas e, em seguida, filtra a solicitação através das restrições do usuário como qualquer outroERDDAP™pedido de dados. O particionamento dos dados em vários arquivos de log, o armazenamento de várias peças de informação (por exemplo, o timestamp do comando, e se o comando era .insert ou .delete) , e vários aspectos da configuração do conjunto de dados, todos tornam possívelERDDAPpara armazenar dados e recuperar dados deste conjunto de dados muito rapidamente e muito eficiente.
     
#### Segurança e Autor{#security-and-author} 
Cada comando .insert e .delete deve incluir &author= *autor\\_key* como o último parâmetro, onde autor\\_key é composto pelo identificador do autor (você escolheu: nome, iniciais, pseudônimo, número) Um sublinhado e uma chave secreta. OERDDAP™administrador trabalhará com autores para gerar a lista de valores válidos do autor\\_key, que podem ser alterados a qualquer momento.
Quando EDDTableFromHttpGet recebe um comando .insert ou .delete, garante que o autorID\\_key é o último parâmetro e válido. Porque é o último parâmetro, indica que toda a linha de comando chegouERDDAP™e não foi truncado. A chave secreta garante que apenas autores específicos podem inserir ou excluir dados no conjunto de dados.ERDDAP™então extrai o autorID e salva que na variável do autor, para que qualquer pessoa possa ver quem foi responsável por uma determinada mudança no conjunto de dados.
.insert e .delete comandos só podem ser feitos viahttps:  (seguro)  ERDDAP™URLs. Isso garante que as informações que estão sendo transferidas sejam mantidas em segredo durante o trânsito.
     
#### vezes{#timestamp} 
Como parte do sistema de log, EDDTableFromHttpGet adiciona um timestamp (o tempo queERDDAPrecebeu o pedido) para cada comando que ele armazena nos arquivos de log. Porque...ERDDAP™gera o timestamp, não os autores, não importa se diferentes autores estão fazendo mudanças de computadores com relógios definidos para tempos ligeiramente diferentes. O timestamp indica de forma confiável o tempo em que a mudança foi feita para o conjunto de dados.
     
#### HTTP POST{#http-post} 
*   ["E o HTTP POST?&#33;"](#http-post)  
HTTP[AM POSTAM](https://en.wikipedia.org/wiki/POST_(HTTP)) é a melhor alternativa (em comparação comHTTP GET) para enviar informações de um cliente para um servidor HTTP. Se você puder, ou se realmente quiser melhorar a segurança, use o POST em vez do GET para enviar as informações paraERDDAP. POST é mais seguro porque: com GET ehttps, a URL é transmitida de forma segura, mas toda a URL (incluindo parâmetros, incluindo o autor\\_key) será escrito para o Apache, Tomcat, eERDDAP™logar arquivos, onde alguém poderia lê-los se os arquivos não são devidamente protegidos. Com o POST, os parâmetros são transmitidos de forma segura e não estão escritos nos arquivos de log. POST é um pouco mais difícil para os clientes trabalhar com e não é suportado tão amplamente pelo software cliente, mas as linguagens de programação o suportam. O conteúdo que você enviar para o conjunto de dados via GET ou POST será o mesmo, apenas formatado de uma forma diferente.
     
#### httpGetRequired Variáveis Atributo global{#httpgetrequiredvariables-global-attribute} 
Uma parte essencial do que faz todo este sistema funcionar é o atributo global exigidohttpGetRequired Variáveis, que é uma lista separada por vírgulasdataVariablenomes de origem que identificam exclusivamente uma linha de dados. Isso deve ser o mínimo possível e quase sempre incluirá a variável de tempo. Por exemplo, aqui estão os recomendadoshttpGetRequired Variáveis para cada um dos[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Claro, os nomes de ID podem ser diferentes no seu conjunto de dados.) :

* Para o TimeSeries:stationID, tempo
* Para Trajectory: trajectoryID, time
* Para Perfil: tempo (assumindo que o tempo é o perfil\\_id) , profundidade
* Para a série do tempo Perfil:stationID, tempo (assumindo que o tempo é o perfil\\_id) , profundidade
* Para Trajectória Perfil: trajectoryID, time (assumindo que o tempo é o perfil\\_id) , profundidade

    
Tomando TimeSeries como um exemplo:
Dado um comando .insert que incluistationID=46088 e time=2016-06-23T19:53:00Z (e outros valores para outras variáveis) :
* Se não houver dados existentes para essa estação e esse tempo, então o efeito será adicionar os dados ao conjunto de dados.
* Se houver dados existentes para essa estação e esse tempo, então o efeito será substituir a linha de dados existente com esses novos dados. (Claro, desdeERDDAP™mantém o registro de cada comando que recebe, os dados antigos ainda estão no log. Se um usuário solicitar dados de uma versão do conjunto de dados antes dessa mudança, eles verão os dados mais antigos.)   
         
#### httpIntrodução{#httpgetdirectorystructure} 
*   [httpIntrodução Estrutura Atributo global e dados (Login) Nomes de arquivo](#httpgetdirectorystructure)  
Parte do que faz todo este sistema funcionar de forma eficiente é queERDDAP™cria um conjunto de dados (log) arquivos, cada um com um pedaço diferente do conjunto de dados. Se estes forem bem configurados,ERDDAP™será capaz de responder rapidamente à maioria dos pedidos de dados. Esta configuração é especificada pelohttpGetDirectoryStructure atributo global, que é um String que parece um nome de arquivo relativo, por exemplo, "stationID/10years", mas é realmente uma especificação para a estrutura do diretório. As partes que indicam como diretório e nomes de arquivo para os dados (log) arquivos serão construídos.
    
    * Se uma parte é um inteiro (- Sim. 1) mais um tempoPeriod (milissegundo, segundo, minuto, hora, data, mês, ano, ou seus plurais) , por exemplo, 10 anos, então o conjunto de dados EDDTableFromHttpGet levará o valor do tempo para a linha de dados (por exemplo, 2016-06-23T19:53:00Z) , calcular o tempo truncado a essa precisão (por exemplo, 2010) , e fazer uma pasta ou arquivo Nome disso.
        
O objetivo é obter um pedaço razoavelmente grande de dados em cada arquivo, mas muito menos de 2GB.
        
    * Caso contrário, a parte da especificação deve ser umadataVariable'sourceName, por exemplo,stationID. Neste caso, EDDTableFromHttpGet fará uma pasta ou nome de arquivo do valor dessa variável para a nova linha de dados (por exemplo, "46088") .
    
Como os dados de comando .insert e .delete são armazenados em dados específicos (log) arquivos, EDDTableFromHttpGet geralmente só precisa abrir um ou alguns dados (log) arquivos para encontrar os dados para uma determinada solicitação de usuário. E porque cada dado (log) arquivo tem todas as informações relevantes para o seu pedaço do conjunto de dados, é rápido e fácil para EDDTableFromHttpGet para fazer uma versão específica (ou a versão atual) do conjunto de dados para os dados nesse arquivo (e não tem que gerar a versão solicitada de todo o conjunto de dados) .
    
As diretrizes gerais são baseadas na quantidade e frequência dos dados. Se assumirmos 100 bytes por linha de dados, então ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Por exemplo, se a estrutura do diretório forstationID/2 meses e você inserir dados de duas estações (46088 e 46155) com valores de tempo de dezembro de 2015 a maio de 2016, EDDTableFromHttp Get irá criar diretórios nomeados 46088 e 46155 e criar arquivos em cada nome 2015-11.jsonI, 2016-01.jsonI, 2016-03.jsonl, 2016-05.jsonEu... (2 meses de dados para a estação relevante) . Em qualquer momento no futuro, se você usar .insert ou .delete para alterar ou excluir os dados para, por exemplo, estação 46088 em 2016-04-05T14:45:00Z, EDDTableFromHtp Obter vai anexar esse comando para 46088/2016-03.jsonl, os dados relevantes (log) ficheiro. E claramente, é bom adicionar dados para outras estações a qualquer momento no futuro, uma vez que o conjunto de dados irá simplesmente criar diretórios adicionais conforme necessário para manter os dados das novas estações.
    
#### httpBeco{#httpgetkeys} 
Cada tabela EDD De Http Obter conjunto de dados deve ter um atributo globalhttpGetKeys que especifica a lista de autores permitidos e suas chaves secretas como uma lista separada por vírgulas *autor\\_key* , por exemplo, JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* autor\\_key's são sensíveis a casos e devem ser inteiramente caracteres ASCII (#33 - #126, e sem qualquer vírgula, " ou ' caracteres
* Chaves são como senhas, então eles devem ser &gt;=8 caracteres, difícil de adivinhar, e sem palavras de dicionário interno. Você deve tratá-los como você trataria senhas -- mantê-los privados.
* O primeiro caracter '\\_' separa o autor da chave, então o nome do autor não pode incluir um caracter '\\_' (mas uma chave pode) .
* Qualquer autor pode ter um ou mais autor\\_key's, por exemplo, JohnSmith\\_some Chave, JohnSmith\\_some Key7, etc.
* Você pode alterar o valor deste atributo a qualquer momento. As alterações entram em vigor na próxima vez que o conjunto de dados for carregado.
* Essas informações serão removidas dos atributos globais do conjunto de dados antes de serem tornados públicos.
* Cada solicitação ao conjunto de dados para inserir ou excluir dados deve incluir um &author= *autor\\_key* parâmetro. Depois de verificar a validade da chave,ERDDAP™apenas salva a parte do autor (não a chave) no arquivo de dados.

#### Configurar{#set-up} 

Aqui estão as etapas recomendadas para configurar um conjunto de dados EDDTableFromHttpGet:

1. Faça o diretório principal para manter os dados deste conjunto de dados. Por exemplo, vamos usar /data/testGet/ . O usuário executando GenerateDatasetsXml e o usuário executandoERDDAP™ambos devem ter acesso de leitura-escrita a este diretório.
     
2. Use um editor de texto para fazer uma amostra.jsonl Arquivo CSV com a extensão.jsonEu nesse diretório.
O nome não é importante. Por exemplo, você pode chamá-lo de amostra.jsonEu...
Faça uma linha 2.jsonl Arquivo CSV, com nomes de colunas na primeira linha e valores dummy/típicos (do tipo de dados correto) na segunda linha. Aqui está um arquivo de amostra que é adequado para uma coleção defeatureType=TimeSeries dados que mediram a temperatura do ar e da água.
    \\[ParafeatureType=Trajectory, você pode mudarstationIDpara ser trajectoryID.\\]  
    \\[ParafeatureType=Perfil, você pode mudarstationIDpara ser profileID e adicionar uma variável de profundidade.\\]
    
    \\["stationID""time", "latitude", "longitude", "airTemp", "waterTemp", "timestamp", "author", "command"\\]
    \\["myStation", "2018-06-25T17:00Z", 0,0, 0,0, 0,0, 0,0, 0,0, "SomeBody", 0\\]
    
Nota:
    * Os valores de dados reais não importam porque você eventualmente excluirá este arquivo, mas eles devem ser do tipo de dados correto. Notavelmente, a variável de tempo deve usar o mesmo formato que os dados reais da fonte usarão.
    * Para todas as variáveis, osourceNameserá igual adestinationName, então use os nomes das variáveis corretas/final agora, incluindo tempo, latitude, longitude e, às vezes, profundidade ou altitude se as variáveis com essa informação serão incluídas.
    * Quase sempre haverá uma variável chamada tempo que registra o tempo que a observação foi feita. Pode ser dataType String com[unidades adequadas para tempos de cadeia](#string-time-units)  (por exemplo,yyyy-MM-dd'T'HH: mm: ss. SSSZ) ou dados Tipo duplo com[unidades adequadas para tempos numéricos](#time-units)  (por exemplo, segundos desde 1970-01T00:00:00Z, ou algum outro tempo de base) .
    * Três das colunas (geralmente os três últimos) deve ser timestamp, autor, comando.
    * A coluna timestamp será usada pelo EDDTableFromHttpGet para adicionar um timestamp indicando quando adicionou uma determinada linha de dados ao arquivo de dados. Terá dataType duplo e unidades segundos desde 1970-01T00:00Z.
    * A coluna do autor com dataType String será usada para gravar qual autor autorizado forneceu os dados desta linha. Autorizados são especificados por[httpAtributo global do GetKeys](#httpgetkeys). Embora as chaves sejam especificadas como *autor\\_key* e estão na URL "request" nesse formulário, somente a parte do autor é salva no arquivo de dados.
    * A coluna de comando com o byte dataType indicará se os dados nesta linha são uma inserção (0) ou uma exclusão (1) .
         
3. Executar GenerateDatasets Xml e dizer-lhe
    
    1. O tipo de conjunto de dados é EDDTableFromHttpGet
    2. O diretório é (para este exemplo) /dados/teste Vai&#33;
    3. O arquivo de amostra é (para este exemplo) /data/testGet/startup.jsonEu...
    4. OhttpGetRequired Variáveis são (para este exemplo)  stationID, tempo Veja a descrição de[httpGetRequiredVariables](#httpgetrequiredvariables-global-attribute)abaixo.
    5. Se os dados forem recolhidos a cada 5 minutos, ohttpGetDirectoryStructure para este exemplo éstationID/2 meses . Veja a descrição de[httpIntrodução](#httpgetdirectorystructure)abaixo.
    6. O[httpBeco](#httpgetkeys)
    
Adicionar a saída (o pedaço dedatasets.xmlpara o conjunto de dados) paradatasets.xml.
     
4. Editardatasets.xmlchunk para este conjunto de dados para torná-lo correto e completo.
Notavelmente, substituir todos os ??? com conteúdo correto.
     
5. Pelo&lt;configuração fileTableInMemory&gt;:
    * Defina isso para true se o conjunto de dados geralmente vai obter frequentes .insert e / ou .delete solicitações (por exemplo, mais frequentemente do que uma vez a cada 10 segundos) . Isso ajuda EDDTableFromHttpGet responder mais rápido a pedidos .insert e/ou .delete. Se você definir isso para true, EDDTableFromHttpGet ainda salvará a tabela de arquivos e informações relacionadas ao disco periodicamente (como necessário, aproximadamente a cada 5 segundos) .
    * Defina isso para falso (o padrão) se o conjunto de dados geralmente receber solicitações infrequentes .insert e/ou .delete (por exemplo, menos de uma vez a cada 10 segundos) .
         
6. Nota: É possível usar&lt;cacheFromUrl&gt; e configurações relacionadas emdatasets.xmlpara EDDTable De Http Obtenha conjuntos de dados como uma maneira de fazer e manter uma cópia local de um conjunto de dados EDDTableFromHttpGet remoto em outroERDDAP. No entanto, neste caso, este conjunto de dados local rejeitará quaisquer pedidos .insert e .delete.

#### Usando EDDTable DeHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Os autores podem fazer "pedidos" que[inserir dados ou excluir dados do conjunto de dados](#insert-and-delete).
     
* Depois que os dados reais foram inseridos no conjunto de dados, você pode e deve excluir o arquivo de dados de amostra original.
     
* Os usuários podem solicitar dados do conjunto de dados como eles fazem para qualquer outro conjunto de dados EDDTable emERDDAP. Se a solicitação não incluir uma restrição na coluna timestamp, então a solicitação recebe dados da versão atual do conjunto de dados (o arquivo de log após o processamento de todos os comandos de inserção e exclusão e re-sorting pelohttpGetRequiredVariables) .
     
* Os usuários também podem fazer solicitações específicas para EDDTableFromHttpGet conjuntos de dados:
    * Se o pedido incluir um&lt;ou&lt;= restrição da coluna timestamp, entãoERDDAP™processa linhas do arquivo de log até o timestamp especificado. Com efeito, isso exclui temporariamente todas as alterações feitas no conjunto de dados desde o valor do timestamp. Para mais informações, consulte[Versão](#versioning).
    * Se o pedido incluir um &gt;, &gt;=, ou = restrição da coluna timestamp, por exemplo, &timestamp&lt;=0, entãoERDDAP™retorna os dados dos arquivos de dados como é, sem processar os comandos de inserção e exclusão.
* No futuro, imaginamos que as ferramentas serão construídas (por nós? Por ti?) para trabalhar com esses conjuntos de dados. Por exemplo, pode haver um script que lê os arquivos de registro bruto, aplica uma equação de calibração diferente e gera/atualiza um conjunto de dados diferente com essa informação derivada. Note que o script pode obter os dados originais através de uma solicitação paraERDDAP™  (que recebe os dados no formato de arquivo que é mais fácil para o script trabalhar com) e gerar/update o novo conjunto de dados via .insert "requests" paraERDDAP. O script não precisa de acesso direto aos arquivos de dados; ele pode estar no computador de qualquer autor autorizado.
     

#### InformaÃ§Ãμes detalhadas sobre EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Os tópicos são:

*   [Não mudes de configuração&#33;](#dont-change-the-setup)
*   [CRUDÊNCIA](#crud)
*   [InvalidRequests](#invalidrequests)
*   [Velocidade](#httpget-speed)
*   [Robusto.](#robust)
*   [Confiabilidade do sistema](#system-reliability)
*   [Versão](#versioning)
*   ["E o HTTP PUT e DELETE?&#33;"](#https-put-and-delete)
*   [Notas](#httpget-notes)
*   [Graças a CHORDS para a ideia básica.](#thanks)

Aqui está a informação detalhada:

##### Não mudes de configuração&#33;{#dont-change-the-setup} 
Uma vez que o conjunto de dados foi criado e você adicionou dados a ele:

* Não adicione ou remova nenhumdataVariableS.
* Não mudes osourceNameoudestinationNamedodataVariableS.
* Não altere os dados Tipo dedataVariableS. Mas você pode mudar odataVariableOs metadados.
* Não mudes ohttpGetRequired Variáveis atributo global.
* Não mudes ohttpAtributo global GetDirectoryStructure.

Se você precisar alterar qualquer uma dessas coisas, faça um novo conjunto de dados e transfira todos os dados para o novo conjunto de dados.
     
##### CRUDÊNCIA{#crud} 
Na ciência da computação, os quatro comandos fundamentais para trabalhar com um conjunto de dados são[CREATE, LER, UPDATE, DELETE (CRUDÊNCIA) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, a linguagem para trabalhar com bases de dados relacionais, tem o equivalente em INSERT, SELECT, UPDATE e DELETE. Em EDDTable FromHttpGet,

* .insert é uma combinação de CREATE e UPDATE.
* .delete é DELETE.
* O sistema regular para solicitar subconjuntos de dados é LER.

Assim, EDDTableFromHttpGet suporta todos os comandos fundamentais para trabalhar com um conjunto de dados.
     
* .insert ou .delete solicitações sem erros retornará o código de status HTTP=200 e um objeto JSON, por exemplo,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Os dois valores de timestamp referem-se ao mesmo milissegundo, que é o milissegundo que será armazenado na variável timestamp para as linhas de dados que foram inseridos ou excluídos.ERDDAP™Não mudará o nome e a formatação desses pares de valores-chave no futuro.ERDDAP™pode adicionar pares de valores-chave adicionais ao objeto JSON no futuro.
     
##### InvalidRequests{#invalidrequests} 
As solicitações .insert ou .delete inválidas retornarão um código de status de erro HTTP diferente do status=200 e nenhuma alteração será feita para o conjunto de dados. Isso inclui solicitações com informações incorretas do autor, nomes variáveis incorretas, diferentes comprimentos de matriz para variáveis diferentes, variáveis requeridas ausentes, valores variáveis variáveis ausentes, etc. Se a solicitação envolve mais de um arquivo de dados, é possível que parte do pedido seja bem-sucedida e a parte falhará. No entanto, isso não deve ser um problema se o sensor que envia a solicitação tratar qualquer falha como uma falha completa. Por exemplo, se você contarERDDAP™para inserir (ou excluir) os mesmos dados duas vezes seguidas, o pior caso é que essas informações são armazenadas duas vezes, fechar juntos no arquivo de log. É difícil ver como isso pode causar problemas.
     
##### Velocidade de HttpGet{#httpget-speed} 
Para pedidos .insert ou .delete (não contandohttpsobre a cabeça) , ballpark figura a velocidade de .insert ou .delete são
1ms por .insert com 1 linha de dados
2ms por .insert com 10 linhas de dados em arrays (\\[\\])   
3ms por .insert com 100 linhas de dados em arrays (\\[\\])   
13ms por .insert com 1000 linhas de dados em arrays (\\[\\])   
Claramente arrays são a chave para[alta taxa de transferência](#httpget-speed). Sem arrays, será desafiador para .insert ou .delete mais de 8 linhas de dados por segundo de um autor remoto (por causa de toda a sobrecarga da rede) . Com arrays, será fácil .insert ou .delete mais de 1000 linhas de dados por segundo de um sensor remoto.

Com grandes quantidades de dados por solicitação, você vai atingir o limite de Tomcat para o comprimento máximo de consulta (padrão é 8KB?) , mas isso pode ser aumentado editando a configuração maxHttpHeaderSize em seu *Toca a brincar.* /conf/server.xml's HTTP/1.1 Entrada do conector.

QuandoERDDAP™lê os dados CSV JSON Lines (log) arquivos, há uma pequena penalidade de tempo em comparação com a leitura de arquivos de dados binários. Sentimos que esta pena de tempo quando a leitura era um preço razoável para pagar pela velocidade e robustez do sistema ao escrever dados (que é de primeira importância) .

##### SSD{#ssd} 
[Para maior velocidade,](#ssd)usar um[Unidade de Estado Sólido (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)para armazenar os dados. Eles têm um tempo de acesso de arquivo muito mais rápido (&lt;0.1ms) do que discos rígidos (3 - 12 ms) . Eles também têm uma taxa de transferência de dados mais rápida (200 - 2500 MB/s) do que discos rígidos (~ 200 MB/s) . O seu custo diminuiu consideravelmente nos últimos anos. Embora o SSD inicial tenha tido problemas após um grande número de gravações em um determinado bloco, este problema agora é muito reduzido. Se você apenas usar o SSD para escrever os dados uma vez, leia-o muitas vezes, mesmo um SSD de nível de consumidor (que é consideravelmente menos caro do que um SSD de nível empresarial) deve durar muito tempo.
    
##### Robusto.{#robust} 
Tentámos tornar este sistema tão fácil de trabalhar e tão robusto quanto possível.
* O sistema é projetado para ter vários fios (por exemplo, o sensor, um script QC automatizado e um humano) simultaneamente trabalhando no mesmo conjunto de dados e até mesmo no mesmo arquivo. Muito disso é possível usando uma abordagem de arquivo de log para armazenar os dados e usando um tipo de arquivo muito simples,[JSON Linhas arquivos CSV](https://jsonlines.org/examples/)Para armazenar os dados.
* Outra enorme vantagem para JSON Lines CSV é que se um arquivo alguma vez se tornar corrompido (por exemplo, inválido por causa de um erro em uma linha) , é fácil abrir o arquivo em um editor de texto e corrigir o problema.
* Outra vantagem é, se houver um erro em uma linha em um arquivo, o sistema ainda pode ler todos os dados em linhas antes e depois da linha de erro. E o sistema ainda pode registrar informações adicionais .insert e .delete.
* Uma enorme vantagem de usar arquivos padrão acessíveis a administrador (em comparação com um banco de dados relacional ou Cassandra ou outro software) : Não há outro software que tem de ser mantido e que tem de ser executado para armazenar ou recuperar dados. E é fácil fazer backup de arquivos padrão a qualquer momento e de forma incremental porque os dados estão em pedaços (depois de um tempo, apenas o arquivo atual para cada estação estará mudando) . Em contraste, é preciso esforço considerável e sistema para baixo tempo para fazer arquivos de backup externos de bancos de dados e de Cassandra.
         
##### Confiabilidade do sistema{#system-reliability} 
É razoável esperar um servidor comERDDAP™para ter 99,9% de tempo de atividade - isso é cerca de 9 horas de inatividade por ano (Embora, você pode usar isso em uma noite ruim&#33;) .
Se você é diligente e sortudo, você pode ter 99,99% de tempo de atividade (53 minutos de inatividade por ano) , uma vez que apenas alguns reinícios para atualizações levará tanto tempo.
Você teria que tomar medidas extremas (um servidor de backup separado, fonte de alimentação ininterrupta, ar condicionado de backup, pessoal 24x7x365 para monitorar o site, etc.) ter uma chance magra em 99,999% de tempo de atividade (5.25 minutos de inatividade por ano) . Mesmo assim, é extremamente improvável que você alcançará 99,999% de tempo de atividade (ou mesmo 99.99%) porque os problemas estão muitas vezes fora de seu controle. Por exemplo, o Amazon Web Service e o Google oferecem serviços web surpreendentemente confiáveis, mas grandes seções delas são, por vezes, desativadas por horas.

Enfrenta, todos queremERDDAP™ter 100% de tempo de atividade, ou pelo menos o "seis noves" vaunted (99.9999% de tempo de atividade é igual a 32 segundos de tempo de inatividade por ano) , mas não há como você vai conseguir, não importa quanto tempo, esforço e dinheiro você gasta.

Mas...ERDDAP™o tempo de atividade não é o objetivo real aqui. O objetivo é construir uma confiança **sistema** Um que não perde dados. Este é um problema solvável.

A solução é: construir tolerância a falhas no software de computador que está enviando os dados paraERDDAP. Especificamente, esse software deve manter uma fila de dados esperando para ir paraERDDAP. Quando os dados são adicionados à fila, o software deve verificar a resposta deERDDAP. Se a resposta não incluir dados recebidos. Sem erros., então o software deve deixar os dados na fila. Quando mais dados são gerados e adicionados à fila, o software deve tentar novamente .inserir os dados na fila (talvez com o\\[\\]sistema) . Vai ter sucesso ou falhar. Se falhar, tentará novamente mais tarde. Se você escrever o software para funcionar desta forma e se o software está preparado para fila alguns dias de dados, você realmente tem uma boa chance de carregar 100% dos dados do sensor paraERDDAP. E você terá feito isso sem ir para grande esforço ou despesa.

\\[Fundo: Não pensámos nisto.[É assim que as redes de computador conseguem confiabilidade.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) As redes de computadores são inerentemente não confiáveis. Então, quando você transfere um arquivo de um computador para outro, o software de envio sabe / espera que alguns pacotes podem ser perdidos. Se não receber um reconhecimento adequado para um determinado pacote do receptor, ele reenvia o pacote perdido. Com esta abordagem, o software de remetente e receptor relativamente simples pode construir um sistema de transferência de arquivos confiável em cima de uma rede não confiável.\\]
    
##### Por que JSON Lines CSV arquivos?&#33;{#why-json-lines-csv-files} 
EDDTableDeHttpGet usa[JSON Linhas arquivos CSV](https://jsonlines.org/examples/). para armazenar os dados. As razões são:

* A principal razão é: A simplicidade dos arquivos CSV JSON Lines oferece uma maneira rápida, fácil e confiável para permitir que vários threads escrevam para um determinado arquivo (por exemplo, sincronizando no nome do arquivo) .
* Se um arquivo CSV JSON Lines alguma vez foi corrompido (por exemplo, inválido por causa de um erro em uma linha) , EDDTableFromHttpGet ainda pode ler todos os dados em todas as linhas antes e depois da linha de erro. E o sistema .insert e .delete pode continuar a adicionar novos dados ao arquivo de dados.
* Porque os arquivos CSV JSON Lines são arquivos ASCII, se um arquivo já se tornou corrompido, seria fácil corrigir (em um editor de texto) .
* JSON Lines CSV suporta Cordas Unicode.
* JSON Lines CSV suporta strings de comprimento variável (não limitado a algum comprimento máximo) .
* JSON Lines CSV suporta inteiros de 64 bits (longos) .
* A natureza formal e sintaxe extra de JSON Lines CSV (vs Oldschool CSV) fornece alguma garantia extra de que uma determinada linha não foi corrompida.

Nós inicialmente tentamos usar.nc3 arquivos com uma dimensão ilimitada. No entanto, houve problemas:

* O principal problema foi: Não há nenhuma maneira confiável de permitir que vários threads escrevam para um.nc3 arquivo, mesmo que os threads cooperam fazendo as escritas de forma sincronizada.
* Se um.nc3 arquivo fica corrompido, o sistema .insert e .delete não pode continuar a usar o arquivo.
* Porque....nc3 arquivos são binários, se um arquivo fica corrompido (que eles fazem por causa do problema multi-threading) são extremamente difíceis ou impossíveis de corrigir. Não há ferramentas para ajudar com o reparo.
* CF não tem como especificar a codificação de strings, então não há nenhuma maneira oficial de suportar Unicode, por exemplo, a codificação UTF-8. Tentamos obter CF para apoiar um atributo \\_Encoding, mas não conseguimos fazer nenhum progresso. (Unidata, para o seu crédito, suporta o atributo \\_Encoding.) 
*   .nc3 arquivos suportam apenas strings de comprimento fixo. Novamente, tentamos obter CF eUnidatapara suportar strings de comprimento variável, mas foram incapazes de fazer qualquer progresso.
*   .nc3 arquivos não suportam uma maneira fácil de distinguir variáveis de caracteres individuais de variáveis String. Novamente, tentamos obter CF eUnidataapoiar um sistema para distinguir estes dois tipos de dados, mas não foram capazes de fazer qualquer progresso.
*   .nc3 arquivos suportam apenas caracteres de 8 bits com uma codificação não especificada. Novamente, tentamos obter CF eUnidatapara apoiar um sistema para especificar a codificação, mas não foram capazes de fazer qualquer progresso.
*   .nc3 arquivos não suportam inteiros de 64 bits (longos) . Novamente, tentamos obter CF eUnidatapara apoiar um sistema por muito tempo, mas não foram capazes de fazer qualquer progresso.
         
##### Versão{#versioning} 
Porque EDDTable De Http Obter lojas um log de todas as mudanças no conjunto de dados com o timestamp e o autor de cada mudança, ele pode rapidamente recriar esse conjunto de dados a partir de qualquer ponto no tempo. Em certo sentido, há uma versão para qualquer ponto no tempo. Se o pedido de dados de um usuário incluir um timestamp&lt;= restrição, por exemplo, &timestamp&lt;=2016-06-23T16:32:22.128Z (ou qualquer ponto de hora) , mas nenhuma restrição de autor ou comando,ERDDAP™responderá à solicitação gerando primeiramente uma versão do conjunto de dados a partir desse ponto no tempo. Então,ERDDAP™aplica outras restrições do usuário, como com qualquer outra solicitação de dadosERDDAP. EDDTableFromHttpGet é configurado para que este processo seja muito rápido e eficiente, mesmo para conjuntos de dados muito grandes.

Da mesma forma, um usuário pode descobrir quando o conjunto de dados foi atualizado pela última vez solicitando ...?timestamp &timestamp=max (vezes) E distintiva () 

E para qualquer solicitação de dados, para qualquer versão do conjunto de dados, os usuários podem ver qual autor fez quais mudanças e quando eles fizeram.

Este sistema de versão permite[Ciência reprodutiva](https://en.wikipedia.org/wiki/Reproducibility)porque qualquer pessoa, a qualquer momento, pode solicitar dados da versão do conjunto de dados a qualquer momento do tempo. Esta versão fina não é possível com qualquer outro sistema que conhecemos. O mecanismo subjacente é muito eficiente, pois nenhum espaço de armazenamento extra é necessário, e a sobrecarga de processamento é verdadeiramente mínima.

Nem todo mundo tem necessidade deste tipo de versão fina, mas é extremamente útil, talvez necessário, no contexto de uma grande organização de gerenciamento de dados (por exemplo, OOOI, Earth Cube, Data One eNOAANCEI) onde um conjunto de dados pode ter vários autores (por exemplo, o sensor, um script QC automatizado e um editor humano) .

\\[História: A necessidade deste tipo de versão surgiu primeiro para mim (Bob.) ao ler sobre e discutir OOI em 2008. Na época, a OOI tinha um sistema cúmplice, lento e ineficiente para a versão baseada no Git. Git é ótimo para o que foi projetado, mas não para isso. Em 2008, enquanto em uma discussão da OOI, eu criei um extenso sistema alternativo-para-OOI eficiente para gerenciamento de dados, incluindo muitas das características que eu adicionei aERDDAP™desde então, e incluindo este sistema de versão. Naquela época e desde então, o OOI estava comprometido com seu sistema de versão e não estava interessado em alternativas. Em 2016, outros aspectos deste plano caíram e eu comecei a implementá-lo. Porque houve muitas interrupções para trabalhar em outros projetos, eu não terminei até 2018. Mesmo agora, eu não estou ciente de qualquer outro sistema de dados científicos que oferece acesso tão rápido e fácil a uma versão dos dados a partir de qualquer ponto no tempo, para frequentemente mudar conjuntos de dados. Sistemas de arquivos simples não oferecem isso. As bases de dados relacionais não. A Cassandra não.\\]
    
##### HTTPS Colocar e excluir{#https-put-and-delete} 
*   ["E o HTTPS PUT e DELETE?&#33;"](#https-put-and-delete)  
    [Protocolo de Transferência de Hipertexto (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)é a base da World Wide Web e a razão pela qual as URLs da página web começam com " http://" ou " https://" . HTTPS é HTTP com uma camada de segurança adicional. Todos os dias, navegadores, scripts e programas de computador fazem bilhões de HTTP (S)   **GERAIS** solicitações para obter informações de fontes remotas. HTTP (S) também inclui outros[Verbos](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), nomeadamente PUT (para empurrar dados para o servidor) e DELETE (para DELETE dados do servidor) . Sim, PUT e DELETE são a maneira adequada de inserir dados e excluir dados de, um conjunto de dados via HTTP (S) . GET é suportado por cada pedaço de software que pode trabalhar com HTTP (S) . O GET é muito fácil de trabalhar. Todo mundo já sabe como trabalhar com GET e muitos sabem como usar POST (que pode ser usado essencialmente da mesma forma que GET) , então fizemos EDDTableFromHttpGet trabalho com GET e POST. Muito poucas pessoas (mesmo alguns programadores de computador) já trabalhou com PUT e DELETE. PUT e DELETE são geralmente suportados apenas por linguagens de computador, então usá-los requer um programa hábil. Então PUT e DELETE são geralmente uma abordagem muito mais cômoda, dado a forma como as ferramentas evoluíram.
     
##### Notas de HttpGet{#httpget-notes} 
*   [Notas](#httpget-notes)
    * Não.dataVariablepode ter dataType=char. Use dataType=String em vez disso. Se você realmente precisa dataType=char, e-mail Chris. John em noaaa.gov .
         
##### Obrigado.{#thanks} 
*   [Graças a CHORDS para a ideia básica.](#thanks)  
A ideia básica para EDDTableFromHttpGet (ou seja, usando umHTTP GETsolicitar para adicionar dados a um conjunto de dados) é da UCAR (NCAR's?)  [Serviços de dados em tempo real (ESCORDOS) ](https://github.com/earthcubeprojects-chords)projeto. O formato para os parâmetros na solicitação (repetido *Nome=valor* , separados por &'s) é o mesmo formato padrão que é usado por formulários HTML em páginas web. É uma ideia simples e brilhante e ainda mais, porque ele malha tão perfeitamente comERDDAPO sistema existente para lidar com dados tabulares. A ideia é óbvia em retrospectiva, mas eu (Bob.) Não pensei nisso. EDDTable FromHttp Get usa essa ideia básica, combinada com nossas ideias de como implementá-la, para fazer um sistemaERDDAP™para carregar dados. Além da ideia básica de usar GET para empurrar dados para o sistema, a implementação EDDTableFromHttpGet é totalmente diferente e totalmente independente de CHORDS e tem características diferentes (por exemplo, arquivos de log, chunking de dados, sistema de segurança diferente, suporte CRUD, dados reproduzíveis) . A nossa exposição ao CHORDS era apenas um webinar. Nós não olhamos para o código deles ou lemos sobre o projeto deles porque imediatamente sabíamos queríamos implementar o sistema de uma forma diferente. Mas estamos gratos a eles pela ideia básica. A referência completa a CHORDS é
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Serviços de dados em tempo real para as Geociências (ESCORDOS) software. UCAR/NCAR -- Laboratório de Observação da Terra.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### Tabela de EDDHyraxArquivos{#eddtablefromhyraxfiles} 
[ **Tabela de EDDHyraxArquivos** ](#eddtablefromhyraxfiles)  (desprecaída) agrega arquivos de dados com várias variáveis, cada uma com uma ou mais dimensões compartilhadas (por exemplo, tempo, altitude (ou profundidade) , latitude, longitude) e servido por um[Hyrax OPeNDAPservidor](https://www.opendap.org/software/hyrax-data-server).

* Este tipo de conjunto de dados é **DEPRIEDADE** . A solução mais recente e mais geral é usar[cache Opção FromUrl para EDDTable Dos quartos](#cachefromurl)  (ou uma variante) , que faz uma cópia local dos arquivos remotos e serve os dados dos arquivos locais. O&lt;opção cacheFromUrl&gt; pode ser usado com qualquer tipo de arquivo de dados tabular. **   
Se você não pode fazer isso funcionar por algum motivo, e-mail Chris. John em noaaa.gov .
Se não houver reclamações antes de 2020, este tipo de conjunto de dados pode ser removido. ** 
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
* Na maioria dos casos, cada arquivo tem vários valores para a esquerda (Primeiro) dimensão, por exemplo, tempo.
* Os arquivos muitas vezes (mas não precisa) tem um único valor para as outras dimensões (por exemplo, altitude (ou profundidade) , latitude, longitude) .
* Os arquivos podem ter variáveis de caracteres com uma dimensão adicional (por exemplo, nCharacters) .
*   HyraxOs servidores podem ser identificados pelo "/dods-bin/nph-dods/" ou "/opendap/" na URL.
* Esta tela de classe-scrapes oHyraxpáginas web com as listas de arquivos em cada diretório. Por causa disso, é muito específico para o formato atual deHyraxpáginas da web. Vamos tentar ajustarERDDAP™rapidamente se/quando futuras versões deHyraxalterar como os arquivos estão listados.
* O&lt;configuração fileDir&gt; é ignorada. Uma vez que esta classe baixa e faz uma cópia local de cada arquivo de dados remoto,ERDDAP™força o arquivo Dir para ser *Diretriz de grande porte* /cópia / *datasetID* - Não.
* Para&lt;sourceUrl&gt;, use a URL do diretório base do conjunto de dados noHyraxservidor, por exemplo,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (mas colocá-lo em uma linha)   (Desculpe, esse servidor não está mais disponível) .
OsourceUrlpágina da web geralmente tem "OPeNDAPÍndice de Servidor\\[Google - Agências de publicidade\\]" no topo.
* Uma vez que esta classe sempre baixa e faz uma cópia local de cada arquivo de dados remoto, você nunca deve envolver esse conjunto de dados em[EDDTableCopy](#eddtablecopy).
* Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.
* Veja os exemplos 1D, 2D, 3D e 4D para[EDDTable De NcFiles](#eddtablefromncfiles).
     
### EDDTable De InvalidCRAFiles{#eddtablefrominvalidcrafiles} 
[ **EDDTable De InvalidCRAFiles** ](#eddtablefrominvalidcrafiles)agrega dados deNetCDF  (v3 ou v4)  .ncarquivos que usam um específico, inválido, variante do CF DSG Contiguous Ragged Array (CRA) arquivos. EmboraERDDAP™suporta este tipo de arquivo, é um tipo de arquivo inválido que ninguém deve começar a usar. Grupos que atualmente usam este tipo de arquivo são fortemente encorajados a usarERDDAP™para gerar arquivos CF DSG CRA válidos e parar de usar esses arquivos.

Detalhes: Esses arquivos têm múltiplas variáveis row\\_size, cada uma com um atributo sample\\_dimension. Os arquivos são arquivos não-CF-padrão porque a amostra múltipla (obs) dimensões devem ser decodificadas e relacionadas uns com os outros com esta regra adicional e promessa que não faz parte da especificação CF DSG: "você pode associar um dado, por exemplo, valor de temperatura (dimensão temp\\_obs) com um determinado valor de profundidade (z\\_obs dimensão, a dimensão com mais valores) , porque: a linha de temperatura\\_size (para um dado elenco) será 0 ou igual à linha de profundidade correspondente\\_size (para aquele elenco)   (Essa é a regra.) . Então, se a linha de temperatura\\_size não é 0, então os valores de temperatura n para esse elenco se relacionam diretamente com os valores de profundidade n para aquele elenco (Essa é a promessa) "

Outro problema com esses arquivos: a variável Principal\\_Investigator row\\_size não tem um atributo sample\\_dimensional e não segue a regra acima.

Arquivos de amostra para este tipo de conjunto de dados podem ser encontrados em https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Este servidor não está mais disponível de forma confiável\\].

Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.

A primeira coisa GerarDatasets Xml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura tipo ncdump do arquivo de amostra. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
 
### EDDTable FromJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTable FromJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)agrega dados de[JSON Linhas arquivos CSV](https://jsonlines.org/examples/). Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

* Como jsonlines.org diz, este formato é "Melhor do que CSV" (e legalmente, como funcionário federal, não posso concordar ou discordar com eles - como é louco?) . CSV nunca foi formalmente definido e é dificultado pela bagagem histórica relacionada à sua conexão com os programas de planilha original. JSON Lines CSV, em comparação, é totalmente definido e beneficia de sua conexão com o padrão JSON amplamente utilizado, que por sua vez se beneficia de sua conexão comJavaScript eJava. Notavelmente, há suporte completo para inteiros longos e para caracteres Unicode em strings, e uma maneira clara de incluir outros caracteres especiais (notavelmente guias e novas linhas) dentro de cordas.
    
Este formato é particularmente bom para conjuntos de dados onde você precisa periodicamente anexar linhas adicionais ao final de um determinado arquivo de dados. Por essa razão e outros (ver acima) ,[EDDTable FromHttpGet](#eddtablefromhttpget)usa arquivos CSV Json Lines para armazenamento de dados.
    
* Os arquivos de entrada são considerados UTF-8 codificados. No entanto, dado o \\u *Dddd* formato para codificação de caracteres especiais (e.g., \\u20ac é a codificação para o caracter Euro) , você tem a opção de escrever os arquivos para que eles contenham apenas caracteres ASCII de 7 bits usando \\u *Dddd* para codificar todos os caracteres acima #127.
     
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
    
A primeira coisa que GenerateDatasetsXml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura tipo ncdump do arquivo de amostra. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
    
* Quando:ERDDAP™lê JSON Linhas arquivos de dados CSV, se encontrar um erro em uma determinada linha (por exemplo, número incorreto de itens) , registra uma mensagem de aviso ("WARNING: Linha má (S) de dados" ... com uma lista das linhas ruins em linhas subseqüentes) ao[arquivo log.txt](/docs/server-admin/additional-information#log)e, em seguida, continua a ler o resto do arquivo de dados. Assim, é sua responsabilidade olhar periodicamente (ou escrever um script para fazê-lo) para essa mensagem no log. txt para que você possa corrigir os problemas nos arquivos de dados.ERDDAP™é configurado desta forma para que os usuários possam continuar a ler todos os dados válidos disponíveis, mesmo que algumas linhas do arquivo tenham falhas.
     
### EDDTable FromMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDTable FromMultidimNcFiles** ](#eddtablefrommultidimncfiles)agrega dados deNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) arquivos com várias variáveis, cada uma com uma ou mais dimensões compartilhadas. Os arquivos podem ter variáveis de caráter com ou sem uma dimensão adicional (por exemplo, STRING14) . Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

* Se os arquivos são variantes CF DSG multidimensionais, use este tipo de conjunto de dados em vez de[EDDTable FromNcCFFiles](#eddtablefromncfiles).
     
* Para novos conjuntos de dados tabulares.ncarquivos, use esta opção antes de experimentar o mais velho[EDDTable De NcFiles](#eddtablefromncfiles). Algumas vantagens desta classe são:
    * Esta classe pode ler mais variáveis de uma variedade mais ampla de estruturas de arquivos. Se você especificar DimensionsCSV (uma lista separada por vírgula de nomes de dimensão) em Gerar conjuntos de dados Xml (ou&lt;dimensõesCSV&gt; nodatasets.xmlinfo para um desses conjuntos de dados), entãoERDDAP™só lerá variáveis nos arquivos de origem que usam algumas ou todas essas dimensões, além de todas as variáveis escalares. Se uma dimensão está em um grupo, você deve especificar seu fullName, por exemplo, " *grupoNome/dimensãoNome* ".
    * Esta classe muitas vezes pode rejeitar arquivos muito rapidamente se eles não corresponder a restrições de um pedido. Então a leitura de dados de grandes coleções muitas vezes vai muito mais rápido.
    * Esta classe lida com variáveis de caridade verdadeiras (variáveis não padrão) corretamente.
    * Esta classe pode aparar variáveis String quando o criador não usou Netcdf-java's writeStrings (que acrescenta char #0 para marcar o fim da cadeia) .
    * Esta classe é melhor em lidar com arquivos individuais que não possuem certas variáveis ou dimensões.
    * Esta classe pode remover blocos de linhas com valores ausentes conforme especificado para[CF Geometrias de amostragem discretas (DSG) Arquivos multidimensionais Incompletos](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
    
A primeira coisa que GenerateDatasetsXml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura tipo ncdump do arquivo de amostra. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
    
Grupo... Gerar conjuntos de dados Xml vai pedir um "Grupo". Você pode entrar "" para tê-lo pesquisar qualquer / todos os grupos, " *alguns Grupo* "ou " *algunsGrupo / alguns SubGrupo* " para que ele procure um grupo específico, ou "\\[raiz raiz\\]" para que ele procure apenas o grupo raiz. A string "Group" torna-se&lt;grupo&gt; nodatasets.xmlinfo para o conjunto de dados (embora "\\[raiz raiz\\]Torna-se ") .
    
DimensõesCSV -- Gerar conjuntos de dados Xml vai pedir uma string "DimensionsCSV". Esta é uma lista de nomes de fontes separados por vírgulas de um conjunto de dimensões. Gerar conjuntos de dados Xml só lerá variáveis de dados na amostra.ncarquivos que usam algumas ou todas essas dimensões (e nenhuma outra dimensão) , além de todas as variáveis escalares no arquivo, e fazer o conjunto de dados dessas variáveis de dados. Se uma dimensão está em um grupo, você deve especificar seu fullName, por exemplo, " *grupoNome/dimensãoNome* ".
Se você não especificar nada (uma string vazia) , Gerar conjuntos de dados Xml procurará as variáveis com a maioria das dimensões, na teoria de que serão as mais interessantes, mas pode haver momentos em que você vai querer fazer um conjunto de dados de algum outro grupo de variáveis de dados que usa algum outro grupo de dimensões.
Se você apenas especificar um nome de dimensão que não existe (por exemplo, NO\\_MATCH) ,ERDDAP™vai apenas encontrar todas as variáveis escalares.
A string "DimensionsCSV" torna-se&lt;dimensõesCSV&gt; nodatasets.xmlinfo para o conjunto de dados.
    
#### Medidas de tratamento{#treatdimensionsas} 
Há uma categoria de inválido.ncarquivos (porque eles não seguem as regras do CF) que têm múltiplas dimensões (por exemplo, lat, lon, time) quando eles deveriam ter usado apenas uma dimensão (por exemplo, tempo) Por exemplo:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles tem uma característica especial para lidar com esses arquivos: se você adicionar o atributo global "treatDimensionsAs" aos conjuntos de dados globaisaddAttributesVocê pode dizerERDDAP™para tratar certas dimensões (e.g., lat e lon) como se fossem outra dimensão (por exemplo, tempo) . O valor do atributo deve ser uma lista separada por vírgula especificando as dimensões "de" e, em seguida, a dimensão "para", por exemplo,
<att name="treatDimensionsAs">lon, tempo</att>  
Então...ERDDAP™lerá o arquivo como se fosse:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Naturalmente, o tamanho atual de cada uma das dimensões na lista deve ser o mesmo; caso contrário,ERDDAP™irá tratar o arquivo como um "Bad File".

Note que esses arquivos são inválidos porque eles não seguem as regras do CF. Mesmo assim.ERDDAP™pode lê-los, recomendamos fortemente que você não crie arquivos como este porque outras ferramentas de software baseadas em CF não serão capazes de lê-los corretamente. Se você já tem tais arquivos, recomendamos fortemente substituí-los por arquivos válidos o mais rápido possível.
    
### EDDTable De NcFiles{#eddtablefromncfiles} 
[ **EDDTable De NcFiles** ](#eddtablefromncfiles)agrega dados deNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) arquivos e[Zarr](https://github.com/zarr-developers/zarr-python)arquivos (a partir da versão 2.25) com várias variáveis, cada uma com uma dimensão compartilhada (por exemplo, tempo) ou mais de uma dimensão compartilhada (por exemplo, tempo, altitude (ou profundidade) , latitude, longitude) . Os arquivos devem ter os mesmos nomes de dimensão. Um determinado arquivo pode ter vários valores para cada uma das dimensões e os valores podem ser diferentes em arquivos de origem diferentes. Os arquivos podem ter variáveis de caracteres com uma dimensão adicional (por exemplo, STRING14) . Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

Os arquivos Zarr têm um comportamento ligeiramente diferente e exigem o fileNameRegex ou o pathRegex para incluir "zarr".

* Se o.ncarquivos usar um dos[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)formatos de arquivo, tente usar[EDDTable FromNcCFFiles](#eddtablefromncfiles)antes de tentar isto.
     
* Para novos conjuntos de dados tabulares.ncarquivos, tente o mais novo[EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)primeiro.
     
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
    
A primeira coisa que GenerateDatasetsXml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura tipo ncdump do arquivo de amostra. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
    
DimensõesCSV -- Gerar conjuntos de dados Xml vai pedir uma string "DimensionsCSV". Esta é uma lista de nomes de fontes separados por vírgulas de um conjunto de dimensões. Gerar conjuntos de dados Xml vai encontrar as variáveis de dados no.ncarquivos que usam algumas ou todas essas dimensões, além de todas as variáveis escalares, e fazem o conjunto de dados dessas variáveis de dados. Se você não especificar nada (uma string vazia) , Gerar conjuntos de dados Xml procurará as variáveis com a maioria das dimensões, na teoria de que serão as mais interessantes, mas pode haver momentos em que você vai querer fazer um conjunto de dados de algum outro grupo de variáveis de dados que usa algum outro grupo de dimensões.
    
* Exemplo 1D: Os arquivos 1D são um pouco diferentes de arquivos 2D, 3D, 4D, ....
    * Você pode ter um conjunto de.ncarquivos de dados onde cada arquivo tem um mês de dados de um buoy drifting.
    * Cada arquivo terá 1 dimensão, por exemplo, tempo (tamanho =\\[muitos\\]) .
    * Cada arquivo terá uma ou mais variáveis 1D que usam essa dimensão, por exemplo, tempo, longitude, latitude, temperatura do ar, ....
    * Cada arquivo pode ter variáveis de caráter 2D, por exemplo, com dimensões (tempo, nCharacters) .
         
* Exemplo 2D:
    * Você pode ter um conjunto de.ncarquivos de dados onde cada arquivo tem um mês de dados de um buoy drifting.
    * Cada arquivo terá 2 dimensões, por exemplo, tempo (tamanho =\\[muitos\\]) e id (tamanho = 1) .
    * Cada arquivo terá 2 variáveis 1D com os mesmos nomes que as dimensões e usando a mesma dimensão, por exemplo, tempo (Tempo) Id (I) . Essas variáveis 1D devem ser incluídas na lista&lt;dataVariable&gt; está no XML do conjunto de dados.
    * Cada arquivo terá uma ou mais variáveis 2D, por exemplo, longitude, latitude, temperatura do ar, temperatura da água, ...
    * Cada arquivo pode ter variáveis de caráter 3D, por exemplo, com dimensões (tempo, trácticas, n) .
         
* Exemplo 3D:
    * Você pode ter um conjunto de.ncarquivos de dados onde cada arquivo tem um mês de dados de um buoy estacionário.
    * Cada arquivo terá 3 dimensões, por exemplo, tempo (tamanho =\\[muitos\\]) , (tamanho = 1) e lon (tamanho = 1) .
    * Cada arquivo terá 3 variáveis 1D com os mesmos nomes que as dimensões e usando a mesma dimensão, por exemplo, tempo (Tempo) , (Não.) lon (lon) . Essas variáveis 1D devem ser incluídas na lista&lt;dataVariable&gt; está no XML do conjunto de dados.
    * Cada arquivo terá uma ou mais variáveis 3D, por exemplo, temperatura do ar, temperatura da água, ...
    * Cada arquivo pode ter variáveis de caracteres 4D, por exemplo, com dimensões (tempo, mais tarde, mais tarde,) .
    * O nome do arquivo pode ter o nome do buoy no nome do arquivo.
         
* Exemplo 4D:
    * Você pode ter um conjunto de.ncarquivos de dados onde cada arquivo tem um mês de dados de uma estação. Em cada momento, a estação leva leituras em uma série de profundidades.
    * Cada arquivo terá 4 dimensões, por exemplo, tempo (tamanho =\\[muitos\\]) , profundidade (tamanho =\\[muitos\\]) , (tamanho = 1) e lon (tamanho = 1) .
    * Cada arquivo terá 4 variáveis 1D com os mesmos nomes que as dimensões e usando a mesma dimensão, por exemplo, tempo (Tempo) , profundidade (profundidade) , (Não.) lon (lon) . Essas variáveis 1D devem ser incluídas na lista&lt;dataVariable&gt; está no XML do conjunto de dados.
    * Cada arquivo terá uma ou mais variáveis 4D, por exemplo, temperatura do ar, temperatura da água, ...
    * Cada arquivo pode ter variáveis de caracteres 5D, por exemplo, com dimensões (tempo, aprofundado, galo, nCharacters) .
    * O nome do arquivo pode ter o nome do buoy no nome do arquivo.
         
### EDDTable FromNcCFFiles{#eddtablefromnccffiles} 
[ **EDDTable FromNcCFFiles** ](#eddtablefromnccffiles)agrega dados agregados deNetCDF  (v3 ou v4)  .nc  (ou[.ncml](#ncml-files)) arquivos que usam um dos formatos de arquivo especificados pelo[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenções. Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

Para arquivos usando uma das variantes multidimensionais CF DSG, use[EDDTable FromMultidimNcFiles](#eddtablefrommultidimncfiles)Em vez disso.

As convenções CF DSG definem dezenas de formatos de arquivo e incluem inúmeras pequenas variações. Esta classe lida com todas as variações de que estamos cientes, mas podemos ter perdido uma (ou mais) . Então, se esta classe não puder ler dados de seus arquivos CF DSG, por favor[alcance para suporte adicional](/docs/intro#support).

Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
 
### EDDTable De NccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDTable De NccsvFiles** ](#eddtablefromnccsvfiles)agrega dados de[NCCSV](/docs/user/nccsv-1.00)Arquivos ASCII .csv. Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
    
A primeira coisa que GenerateDatasetsXml faz para este tipo de conjunto de dados depois de responder às perguntas é imprimir a estrutura tipo ncdump do arquivo de amostra. Então, se você digitar algumas respostas patetas para o primeiro loop através de GerarDatasets Xml, pelo menos será capaz de ver seERDDAP™pode ler o arquivo e ver quais dimensões e variáveis estão no arquivo. Então você pode dar melhores respostas para o segundo loop através de GerarDatasetsXml.
    
* Quando:ERDDAP™lê arquivos de dados NCCSV, se ele encontrar um erro em uma determinada linha (por exemplo, número incorreto de itens) , registra uma mensagem de aviso ("WARNING: Linha má (S) de dados" ... com uma lista das linhas ruins em linhas subseqüentes) ao[arquivo log.txt](/docs/server-admin/additional-information#log)e, em seguida, continua a ler o resto do arquivo de dados. Assim, é sua responsabilidade olhar periodicamente (ou escrever um script para fazê-lo) para essa mensagem no log. txt para que você possa corrigir os problemas nos arquivos de dados.ERDDAP™é configurado desta forma para que os usuários possam continuar a ler todos os dados válidos disponíveis, mesmo que algumas linhas do arquivo tenham falhas.
     
### EDDTable FromNOS{#eddtablefromnos} 
[ **EDDTable FromNOS** ](#eddtablefromnos)  (DEPRIEDADE) lida com dados de umNOAA [NÃO](https://opendap.co-ops.nos.noaa.gov/axis/)fonte, que usa[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)para pedidos e respostas. É muito específicoNOAAO XML do NOS. Veja a amostra EDDTableFromNOS conjunto de dados em conjuntos de dados2.xml.
 
### EDDTable FromOBIS{#eddtablefromobis} 
[ **EDDTable FromOBIS** ](#eddtablefromobis)lida com dados de um Sistema de Informação Biogeográfica do Oceano (OBIS) servidor (foi http://www.iobis.org  ) . É possível que não haja servidores mais ativos que utilizem este tipo de sistema de servidor OBIS agora desatualizado.

* Os servidores OBIS esperam uma solicitação XML e retornam uma resposta XML.
* Porque todos os servidores OBIS servem as mesmas variáveis da mesma maneira (foi http://iobis.org/tech/provider/questions ) , você não precisa especificar muito para configurar um conjunto de dados OBISERDDAP.
* Você deve incluir um "creator\\_email" atributo no globaladdAttributes, uma vez que essa informação é usada dentro da licença. Um endereço de e-mail adequado pode ser encontrado lendo a resposta XML do sourceURL.
* Você pode ou não conseguir obter o atributo global [&lt;subsetVariables&gt; (#subsetvariables) para trabalhar com um determinado servidor OBIS. Se você tentar, tente apenas uma variável (por exemplo, ScientificName ou Genus) .
#### EDDTable FromOBIS esqueleto XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable FromParquetFiles{#eddtablefromparquetfiles} 
[ **EDDTable FromParquetFiles** ](#eddtablefromparquetfiles)lida com dados de[Parquete](https://parquet.apache.org/). Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.

* Parquet é projetado para comprimir muito eficientemente, por isso pode lhe dar tamanhos de arquivos menores do que outros formatos.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
* Quando:ERDDAP™lê arquivos de dados do Parquet, se ele encontrar um erro em uma determinada linha (por exemplo, número incorreto de itens) , registra uma mensagem de aviso ("WARNING: Linha má (S) de dados" ... com uma lista das linhas ruins em linhas subseqüentes) ao[arquivo log.txt](/docs/server-admin/additional-information#log)e, em seguida, continua a ler o resto do arquivo de dados. Assim, é sua responsabilidade olhar periodicamente (ou escrever um script para fazê-lo) para essa mensagem no log. txt para que você possa corrigir os problemas nos arquivos de dados.ERDDAP™é configurado desta forma para que os usuários possam continuar a ler todos os dados válidos disponíveis, mesmo que algumas linhas do arquivo tenham falhas.
     
### Tabela de EDDSOS {#eddtablefromsos} 
[ **Tabela de EDDSOS** ](#eddtablefromsos)lida com dados de um Serviço de Observação do Sensor (SWE/[SOS](https://www.ogc.org/standards/sos)) servidor.

* Este tipo de conjunto de dados agrega dados de um grupo de estações que são todas atendidas por umSOSservidor.
* Todas as estações servem o mesmo conjunto de variáveis (embora a fonte para cada estação não tenha que servir todas as variáveis) .
*   SOSservidores esperam um pedido XML e retornam uma resposta XML.
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo. Não é fácil gerar o conjunto de dados XML paraSOSconjuntos de dados à mão. Para encontrar as informações necessárias, você deve visitarsourceUrl+"? - Sim.SOS- O quê?GetCapabilities" em um navegador; olhar para o XML; fazer um pedido GetObservation à mão; e olhar para a resposta XML à solicitação.
* Com a adição ocasional de novos tipos deSOSservidores e mudanças nos servidores antigos, está ficando mais difícil paraERDDAP™para detectar automaticamente o tipo de servidor a partir das respostas do servidor. O uso de&lt;soserverType&gt; (com um valor de IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, ou QUEM) está agora firmemente recomendado. Se você tiver problemas com qualquer conjunto de dados deste tipo, tente reiniciar GerrateDatasets Xml para oSOSservidor. Gerar Conjuntos de dados Xml vai deixar você experimentar o diferente&lt;sosServerType&gt; opções até você encontrar o certo para um determinado servidor.
*   SOSvisão geral:
    * SWE (Activação Web do sensor) eSOS  (Serviço de Observação do Sensor) são[Normas OpenGIS®](https://www.ogc.org/standards). Esse site tem os documentos padrão.
    * OOGCWeb Services Especificação comum ver 1.1.0 (OGC06-121r3) cobre a construção de consultas GET e POST (ver seção 7.2.3 e seção 9) .
    * Se você enviar um pedido getCapabilities xml para umSOSservidor (sourceUrl- Sim.SOS- O quê?GetCapabilities") , você obtém um resultado xml com uma lista de estações e o observado Propriedades para as quais eles têm dados.
    * Um observadopropriedade é uma referência URI formal a uma propriedade. Por exemplo, urn:ogc:phenomenon:longitude:wgs84 ou https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Uma propriedade observada não é uma variável.
    * Mais de uma variável pode ter o mesmo observado Propriedade (por exemplo, dentroTemp e fora Temp pode ambos ter observado Propriedade https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Se você enviar um pedido xml getObservation para umSOSservidor, você obtém um resultado xml com descrições de nomes de campo na resposta, unidades de campo e os dados. Os nomes de campo incluirão longitude, latitude, profundidade (talvez) , e tempo.
    * Cada umdataVariablepara uma tabela EDDDeSOSdeve incluir um atributo "observedProperty", que identifica a propriedade observada que deve ser solicitada do servidor para obter essa variável. Muitas vezes, váriasdataVariables irá listar o mesmo composto observadopropriedade.
    * O dataType para cadadataVariablepode não ser especificado pelo servidor. Se assim for, você deve olhar para as respostas de dados XML do servidor e atribuir apropriado [&lt;dataType&gt;s] (# Datatype #) noERDDAP™conjunto de dadosdataVariabledefinições.
    *    (No momento de escrever isso) algunsSOSservidores respondem a pedidos de getObservation para mais de um observado Propriedade apenas retornando resultados para o primeiro dosPropriedades observadas. (Nenhuma mensagem de erro&#33;) Consulte o pedido do parâmetro construtor ObservadoPropertiesSeparadamente.
* Tabela de EDDSOSadiciona automaticamente
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
para os atributos globais do conjunto de dados quando o conjunto de dados é criado.
*   SOSservidores geralmente expressam[unidades](#units)com o[UCUM](https://unitsofmeasure.org/ucum.html)sistema. A maioriaERDDAP™servidores expressam unidades com o[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)sistema. Se você precisar converter entre os dois sistemas, você pode usar[ERDDAPServiço web para converter unidades UCUM para /UDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### Tabela de EDDSOSesqueleto XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable FromThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTable FromThreddsFiles** ](#eddtablefromthreddsfiles)  (desprecaída) agrega arquivos de dados com várias variáveis, cada uma com uma ou mais dimensões compartilhadas (por exemplo, tempo, altitude (ou profundidade) , latitude, longitude) e servido por um[TERCEIROSOPeNDAPservidor](https://www.unidata.ucar.edu/software/tds/).

* Este tipo de conjunto de dados é **DEPRIEDADE** . A solução mais recente e mais geral é usar[cache Opção FromUrl para EDDTable Dos quartos](#cachefromurl)  (ou uma variante) , que faz uma cópia local dos arquivos remotos e serve os dados dos arquivos locais. O&lt;opção cacheFromUrl&gt; pode ser usado com qualquer tipo de arquivo de dados tabular de qualquer fonte baseada na web que publica uma lista de arquivos como diretório. **   
Se você não pode fazer isso funcionar por algum motivo, e-mail Chris. John em noaaa.gov .
Se não houver reclamações antes de 2020, este tipo de conjunto de dados pode ser removido. ** 
* Recomendamos fortemente usar o[Gerar conjuntos de dados Programa Xml](#generatedatasetsxml)para fazer um rascunho áspero dodatasets.xmlchunk para este conjunto de dados. Você pode então editar isso para afiná-lo.
* Na maioria dos casos, cada arquivo tem vários valores para a esquerda (Primeiro) dimensão, por exemplo, tempo.
* Os arquivos muitas vezes (mas não precisa) tem um único valor para as outras dimensões (por exemplo, altitude (ou profundidade) , latitude, longitude) .
* Os arquivos podem ter variáveis de caracteres com uma dimensão adicional (por exemplo, nCharacters) .
* Os servidores THREDDS podem ser identificados pelos "/thredds/" nas URLs. Por exemplo,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Os servidores THREDDS têm catálogos em vários lugares. Esta classe REQUIRES que a URL inclui "/thredds/catalog/". Você geralmente pode encontrar essa variável iniciando em um navegador no catálogo raiz e clicando no subcatálogo desejado.
* Esta classe lê os arquivos catalog.xml servidos por THREDDS com as listas de&lt;catálogoRefs&gt; (referências a arquivos sub catálogo.xml adicionais) e&lt;dataset&gt; (arquivos de dados) .
* O&lt;configuração fileDir&gt; é ignorada. Uma vez que esta classe baixa e faz uma cópia local de cada arquivo de dados remoto,ERDDAP™força o arquivo Dir para ser *Diretriz de grande porte* /cópia / *datasetID* - Não.
* Para&lt;sourceUrl&gt;, use a URL do arquivo catálogo.xml para o conjunto de dados no servidor THREDDS, por exemplo: para esta URL que pode ser usada em um navegador da web,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Este servidor não está mais disponível de forma confiável.\\],
uso&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (mas colocá-lo em uma linha) .
* Uma vez que esta classe sempre baixa e faz uma cópia local de cada arquivo de dados remoto, você nunca deve envolver esse conjunto de dados em[EDDTableCopy](#eddtablecopy).
* Este tipo de conjunto de dados suporta uma tag especial OPTIONAL, raramente utilizada,&lt;especialModelo&gt; *modo* &lt;/specialMode&gt; que pode ser usado para especificar que regras especiais e codificadas devem ser usadas para determinar quais arquivos devem ser baixados do servidor. Atualmente, o único válido *modo* é SAMOS que é usado com conjuntos de dados de https://tds.coaps.fsu.edu/thredds/catalog/samos para baixar apenas os arquivos com o último número de versão.
* Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para obter informações sobre como esta classe funciona e como usá-la.
* Veja os exemplos 1D, 2D, 3D e 4D para[EDDTable De NcFiles](#eddtablefromncfiles).
     
### Tabela de EDDWFSArquivos{#eddtablefromwfsfiles} 
[ **Tabela de EDDWFSArquivos** ](#eddtablefromwfsfiles)  (DEPRIEDADE) faz uma cópia local de todos os dados de umaArcGISMapaServerWFSservidor para que os dados possam então ser re-servados rapidamente paraERDDAP™usuários.

* Você precisa especificar um especialmente formatadosourceUrlatributo global para contarERDDAP™como solicitar informações de recursos do servidor. Por favor, use este exemplo como um modelo:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (mas coloque tudo em uma linha) 
* Você precisa adicionar um atributo global especial para contarERDDAP™como identificar os nomes dos pedaços de dados que devem ser baixados. Isso provavelmente funcionará para todos EDDTableDeWFSConjuntos de dados de arquivos:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Uma vez que esta classe sempre baixa e faz uma cópia local de cada arquivo de dados remoto, você nunca deve envolver esse conjunto de dados em[EDDTableCopy](#eddtablecopy).
* Veja a superclasse desta classe.[Tabela EDD dos arquivos](#eddtablefromfiles), para informações adicionais sobre como esta classe funciona e como usá-la.
     
### EDDTable agregados{#eddtableaggregaterows} 
[ **EDDTable agregados** ](#eddtableaggregaterows)pode fazer um conjunto de dados EDDTable de um grupo de conjuntos de dados EDDTable "criança".

* Aqui estão alguns usos para EDDTableAggregateRows:
    * Você pode fazer um conjunto de dados EDDTableAggregateRows de dois tipos diferentes de arquivos ou fontes de dados, por exemplo, um conjunto de dados com dados até o final do mês passado armazenado em.ncArquivos CF e um conjunto de dados com dados para o mês atual armazenados em um banco de dados relacional.
    * Você pode fazer um conjunto de dados EDDTableAggregateRows para lidar com uma mudança de arquivos de origem (por exemplo, o formato de tempo alterado, ou um nome variável alterado, ou dados Tipo/scale\\_factor/add\\_offsetalterado) . Neste caso, uma criança obteria dados de arquivos feitos antes da mudança e a outra criança obteria dados de arquivos feitos após a mudança. Este uso de EDDTableAggregateRows é uma alternativa para usar[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco). A menos que haja uma característica distintiva nos nomes de arquivos (para que você possa usar&lt;fileNameRegex&gt; para determinar qual arquivo pertence a qual conjunto de dados da criança), você provavelmente precisa armazenar os arquivos para os dois conjuntos de dados da criança em diretórios diferentes.
    * Você pode fazer um conjunto de dados EDDTableAggregateRows que tem um subconjunto compartilhado de variáveis de um ou mais conjuntos de dados semelhantes, mas diferentes, por exemplo, um conjunto de dados que faz um conjunto de dados do perfil da combinação de um conjunto de dados do perfil, um conjunto de dados do TimeSeriesProfile e um conjunto de dados do TrajectoryProfile (que têm algumas variáveis diferentes e algumas variáveis em comum -- nesse caso você terá que fazer variantes especiais para os conjuntos de dados da criança, com apenas as variáveis em comum) .
    * Você pode ter vários conjuntos de dados autônomos, cada um com o mesmo tipo de dados, mas de uma estação diferente. Você pode deixar esses conjuntos de dados intactos, mas também criar um conjunto de dados EDDTableAggregateRows que tem dados de todas as estações - cada um dos conjuntos de dados da criança pode ser um simples[EDDTable FromErddap](#eddfromerddap), que aponta para um dos conjuntos de dados da estação existente. Se você fizer isso, dê a cada um dos conjuntos de dados EDDTableFromErddap um diferentedatasetIDdo que os conjuntos de dados autônomos originais, por exemplo, anexando "Criança" ao originaldatasetID.
* Cada criança&lt;dataset&gt; especificado deve ser um conjunto de dados completo, como se fosse um conjunto de dados autônomo. Cada um deve ter o mesmo[dataVariableS](#datavariable), na mesma ordem, com o mesmo[destinationNameS](#destinationname),[dados Tipos](#datatype),[missing\\_valueS](#missing_value),[\\_Valores de arquivo](#missing_value)e[unidades](#units). Os metadados para cada variável para o conjunto de dados EDDTableAggregateRows vem de variáveis no primeiro conjunto de dados da criança, mas EDDTableAggregateRows atualizará o[actual\\_range](#actual_range)metadados para ser o intervalo real para todas as crianças.
* Recomendação: Obtenha cada um dos conjuntos de dados da criança trabalhando como conjuntos de dados autônomos. Então tente fazer o conjunto de dados EDDTableAggregateRows cortando e colando odatasets.xmlpara cada um no novo agregado EDDTableA Conjunto de dados de linhas.
* Dataset Default Ordenar Ordem -- A ordem dos conjuntos de dados da criança determina a ordem de classificação padrão geral dos resultados. Naturalmente, os usuários podem solicitar uma ordem de classificação diferente para um determinado conjunto de resultados por afinação &orderBy (" *lista de variáveis separadas por vírgula* ") até ao fim da sua consulta.
* O "fonte"[global global Atributos](#global-attributes)para o EDDTableAggregateRows é o global combinadoAttributes do primeiro conjunto de dados da criança. O agregado EDDTable Linhas podem ter um global&lt;addAttributes&gt; fornecer atributos globais adicionais ou substituir os atributos globais de origem.
#### EDDTable agregado Linhas esqueleto XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
[ **EDDTableCopy** ](#eddtablecopy)pode fazer uma cópia local de muitos tipos de conjuntos de dados EDDTable e, em seguida, reserve os dados rapidamente a partir da cópia local.

* EDDTableCopy (e para dados de grade,[EDDGridEntendido.](#eddgridcopy)) é muito fácil de usar e muito eficaz **solução para alguns dos maiores problemas com a utilização de dados de fontes de dados remotas:** 
    * Acessar dados de uma fonte de dados remota pode ser lento.
        * Eles podem ser lentos porque eles são inerentemente lentos (por exemplo, um tipo ineficiente de servidor) ,
        * porque eles são esmagados por muitos pedidos,
        * ou porque seu servidor ou o servidor remoto é de largura de banda limitada.
    * O conjunto de dados remoto é por vezes indisponível (novamente, por uma variedade de razões) .
    * Basear-se em uma fonte para os dados não escala bem (por exemplo, quando muitos usuários e muitosERDDAPs utilizá-lo) .
         
* Como Funciona -- O EDDTableCopy resolve esses problemas automaticamente fazendo e mantendo uma cópia local dos dados e servindo dados da cópia local.ERDDAP™pode servir os dados da cópia local muito, muito rapidamente. E fazer e usar uma cópia local alivia o fardo no servidor remoto. E a cópia local é um backup do original, que é útil no caso de algo acontecer ao original.
    
Não há nada de novo sobre fazer uma cópia local de um conjunto de dados. O que é novo aqui é que esta classe faz\\*Fácil.\\*criar e\\*manter\\*uma cópia local de dados de uma\\*variedade\\*de tipos de fontes de dados remotas e\\*adicionar metadados\\*ao copiar os dados.
    
#### EDDTableCopy vs&lt;cacheDeUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; é uma alternativa para EDDTableCopy. Eles funcionam de forma diferente.

* Tabela de EDD Copie trabalhos solicitando pedaços de dados de um serviço remoto e armazenando esses pedaços em arquivos locais. Assim, o EDDTableCopy é útil em alguns casos em que os dados são acessíveis através de um serviço remoto.
* Não.&lt;cacheDe Url&gt;] (#cachefromurl) transfere os arquivos existentes listados em um site remoto.&lt;cacheFromUrl&gt; é mais fácil de usar e mais confiável, pois pode facilmente dizer quando há um novo arquivo de dados remoto ou quando um arquivo de dados remoto mudou e, portanto, precisa ser baixado.

Se houver situações em que EDDTableCopy ou&lt;cacheDeUrl&gt; poderia ser usado, use&lt;cacheDeUrl&gt; porque é mais fácil e confiável.
     
#### &lt;ExtratoDestinação Nomes &gt;{#extractdestinationnames} 
Tabela de EDD Copiar faz a cópia local dos dados solicitando pedaços de dados do conjunto de dados remoto. Tabela de EDD Copiar determina quais pedaços a solicitar solicitando o &distinct () valores para o&lt;extractDestinationNomes&gt; (especificado nodatasets.xml, veja abaixo) , que são os nomes de destino separados por espaço de variáveis no conjunto de dados remoto. Por exemplo,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
pode produzir combinações de valores distintos de drifter=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251, ....

Em situações em que uma coluna (por exemplo, perfil) pode ser tudo o que é necessário para identificar exclusivamente um grupo de linhas de dados, se houver um número muito grande de, por exemplo, perfis, pode ser útil também especificar um extrato adicional Destino Nome (por exemplo,) que serve para subdividir os perfis. Isso leva a menos arquivos de dados em um determinado diretório, o que pode levar a um acesso mais rápido.
    
#### Arquivos locais{#local-files} 
Cada pedaço de dados é armazenado em um separadoNetCDFarquivo em um subdiretório de *Diretriz de grande porte* /cópia / *datasetID* / (como especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Há um nível subdiretório para todos, mas o último extractoDestinationName. Por exemplo, dados para tig17+1017, seriam armazenados em
     *Diretriz de grande porte* /copy/sampleDataset/tig17/1017.nc.
Por exemplo, dados para une12+1251, seriam armazenados em
     *Diretriz de grande porte* /copy/sampleDataset/une12/1251.nc.
Diretório e nomes de arquivos criados a partir de valores de dados são modificados para torná-los seguros de nome de arquivo (por exemplo, os espaços são substituídos por "x20") - Isto não afecta os dados.
     
#### Novos dados{#new-data} 
Cada vez Tabela EDD A cópia é recarregada, verifica o conjunto de dados remoto para ver quais pedaços distintos estão disponíveis. Se o arquivo para um pedaço de dados já não existir, um pedido para obter o pedaço é adicionado a uma fila.ERDDAP's taskThread processa todas as solicitações filadas para pedaços de dados, one-by-one. Você pode ver estatísticas para a atividade do Thread na tarefa[Página de status](/docs/server-admin/additional-information#status-page)e no[Relatório diário](/docs/server-admin/additional-information#daily-report). (Sim.ERDDAP™poderia atribuir várias tarefas para este processo, mas isso usaria muitos da largura de banda, memória e tempo de CPU da fonte de dados remotos, e muitos dos locaisERDDAP's largura de banda, memória e tempo de CPU, nenhum dos quais é uma boa ideia.) 
    
NOTA: A primeira vez que um EDDTableCopy é carregado, (se tudo correr bem) lotes de pedidos de pedaços de dados serão adicionados à fila do taskThread, mas nenhum arquivo de dados local será criado. Assim, o construtor vai falhar, mas tarefaThread continuará a trabalhar e criar arquivos locais. Se tudo correr bem, a tarefaThread fará alguns arquivos de dados locais e a próxima tentativa de recarregar o conjunto de dados (em ~ 15 minutos) terá sucesso, mas inicialmente com uma quantidade muito limitada de dados.
    
NOTA: Depois que o conjunto de dados local tem alguns dados e aparece em seuERDDAP, se o conjunto de dados remoto for temporariamente ou permanentemente não acessível, o conjunto de dados local continuará funcionando.
    
AVISO: Se o conjunto de dados remoto é grande e/ou o servidor remoto é lento (É esse o problema, não é?&#33;) , levará muito tempo para fazer uma cópia local completa. Em alguns casos, o tempo necessário será inaceitável. Por exemplo, transmitindo 1 TB de dados sobre uma linha T1 (0.15 GB/s) leva pelo menos 60 dias, em condições ideais. Além disso, ele usa muita largura de banda, memória e tempo de CPU nos computadores remotos e locais. A solução é enviar um disco rígido para o administrador do conjunto de dados remotos para que ele / ele pode fazer uma cópia do conjunto de dados e enviar o disco rígido de volta para você. Use esses dados como ponto de partida e o EDDTableCopy irá adicionar dados a ele. (É assim que o Serviço de Nuvem EC2 da Amazon costumava lidar com o problema, mesmo que seu sistema tenha muita largura de banda.) 
    
AVISO: Se uma dada combinação de valores desaparece de um conjunto de dados remoto, o EDDTableCopy NÃO exclui o arquivo copiado local. Se você quiser, você pode excluí-lo sozinho.
    
#### Copiação de tabela&lt;checkSourceData &gt;{#tablecopy-checksourcedata} 
Odatasets.xmlpara este conjunto de dados pode ter uma tag opcional
```
    <checkSourceData>true</checkSourceData>  
```
O valor padrão é verdadeiro. Se / quando você configurá-lo para false, o conjunto de dados nunca irá verificar o conjunto de dados de origem para ver se há dados adicionais disponíveis.
     
#### Uso recomendado{#recommended-use} 
1. Criar&lt;dataset&gt; entrada (o tipo nativo, não EDDTableCopy) para a fonte de dados remota. **Faça funcionar corretamente, incluindo todos os metadados desejados.** 
2. Se for muito lento, adicione o código XML para envolvê-lo em um conjunto de dados EDDTableCopy.
    * Use um diferentedatasetID  (talvez mudando odatasetIDdo velhodatasetIDligeiramente) .
    * Entendido.&lt;acessível Para&gt;,&lt;reloadEveryNMinutes&gt; e&lt;onChange&gt; do XML do EDDTable remoto para o XML do EDDTableCopy. (Seus valores para a matéria EDDTableCopy; seus valores para o conjunto de dados interno tornam-se irrelevantes.) 
    * Criar&lt;extractDestinationNames&gt; tag (ver acima) .
    *   &lt;orderExtractBy&gt; é uma lista separada do espaço OPTIONAL de nomes variáveis de destino no conjunto de dados remoto. Quando cada pedaço de dados é baixado do servidor remoto, o pedaço será classificado por essas variáveis (pela primeira variável, então pela segunda variável se a primeira variável estiver ligada, ...) . Em alguns casos,ERDDAP™será capaz de extrair dados mais rapidamente dos arquivos de dados locais se a primeira variável na lista for uma variável numérica ("time"conta como uma variável numérica) . Mas escolha essas variáveis de uma forma adequada para o conjunto de dados.
3.  ERDDAP™fará e manterá uma cópia local dos dados.
         
* WARNING: EDDTableCopy assume que os valores de dados para cada pedaço nunca mudam. Se / quando eles fizerem, você precisa excluir manualmente os arquivos de chunk em *Diretriz de grande porte* /cópia / *datasetID* / que mudou e[bandeira](/docs/server-admin/additional-information#flag)o conjunto de dados a ser recarregado para que os pedaços excluídos serão substituídos. Se você tiver uma assinatura por e-mail para o conjunto de dados, você receberá dois e-mails: um quando o conjunto de dados primeiro recarrega e começa a copiar os dados, e outro quando o conjunto de dados carrega novamente (automaticamente) e detecta os novos arquivos de dados locais.
     
* Alterar os metadados - ... Se você precisar mudar qualqueraddAttributesou alterar a ordem das variáveis associadas ao conjunto de dados de origem:
    1. AlteraraddAttributespara o conjunto de dados de origemdatasets.xml, como necessário.
    2. Apague um dos arquivos copiados.
    3. Definir um[bandeira](/docs/server-admin/additional-information#flag)para recarregar o conjunto de dados imediatamente. Se você usar uma bandeira e tiver uma assinatura por e-mail para o conjunto de dados, você receberá dois e-mails: um quando o conjunto de dados primeiro recarrega e começa a copiar os dados, e outro quando o conjunto de dados carregar novamente (automaticamente) e detecta os novos arquivos de dados locais.
    4. O arquivo excluído será regenerado com os novos metadados. Se o conjunto de dados de origem estiver indisponível, o conjunto de dados EDDTableCopy obterá metadados do arquivo regenerado, uma vez que é o arquivo mais jovem.
         
*   [EDDGridEntendido.](#eddgridcopy)é muito semelhante ao EDDTableCopy, mas trabalha com conjuntos de dados gradeados.
#### EDDTableCopy esqueleto XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - Não.

## Detalhes{#details-1} 

Aqui estão descrições detalhadas de tags e atributos comuns.

### &lt;angularDegreeUnits &gt;{#angulardegreeunits} 
* Não. ** &lt;angularDegreeUnits&gt; ** ] (Unidades de grau angular) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque contém uma lista separada por vírgula de cadeias de unidades queERDDAP™deve tratar como unidades de graus angulares. Se uma variável tiver uma dessas unidades,tabledap'orderByMeanfiltro irá calcular a média de uma forma especial, em seguida, relatar a média como um valor de -180 a 180. VerERDDAP's EDStatic.java arquivo de código fonte para a lista padrão atual. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
### &lt;angularDegreeTrueUnits &gt;{#angulardegreetrueunits} 
* Não. ** &lt;angular GrauTrueUnits&gt; ** ] (#angulardegreetrueunits) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque contém uma lista separada por vírgula de cadeias de unidades queERDDAP™deve tratar como unidades verdadeiras angulares graus. Se uma variável tiver uma dessas unidades,tabledap'orderByMeanfiltro irá calcular a média de uma forma especial, em seguida, relatar a média como um valor de 0 a 360. VerERDDAP's EDStatic.java arquivo de origem para a lista padrão atual. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
     
### &lt;CommonStandardNames &gt;{#commonstandardnames} 
* Não. ** &lt;Nomes padrão comuns&gt; ** ] (#commonstandardnames) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar uma lista separada por vírgula de comum[Nomes padrão CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Por exemplo,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Esta lista é usada em DataProviderForm3.html como uma conveniência para os usuários.
Se você quiser fornecer essas informações emdatasets.xml, começar por copiar a lista padrão atual em&lt;DEFAULT\\_commonStandardNames&gt; emERDDAP'
\\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheiro.
     
### &lt;cacheMinutes &gt;{#cacheminutes} 
* Não. ** &lt;cacheMinuts&gt; ** ] (#cacheminutes) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar a idade (em minutos) em que os arquivos no cache devem ser excluídos (default=60) . Por exemplo,
```
    <cacheMinutes>60</cacheMinutes>  
```
Em geral, apenas arquivos de imagem (porque as mesmas imagens são frequentemente solicitadas repetidamente) e.ncarquivos (porque eles devem ser totalmente criados antes de enviar para o usuário) estão em cache. Embora possa parecer que um pedido deve sempre retornar a mesma resposta, isso não é verdade. Por exemplo, umtabledappedido que inclui tempo&gt; *alguns Tempo* irá mudar quando novos dados chegam para o conjunto de dados. E um pedido de griddap que inclui\\[último\\]para a dimensão do tempo vai mudar quando novos dados chegam para o conjunto de dados. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). AntesERDDAP™v2.00, isso foi especificado no setup.xml, que ainda é permitido mas desencorajado.

### &lt;cacheClearMinutes &gt;{#cacheclearminutes} 
* Não. ** &lt;cacheClearMinuts&gt; ** ] (#cacheclearminutes) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar a frequência para verificar arquivos em cache e remover antigos (em minutos)   (default=15) . Por exemplo,
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Quando o servidor terminar de manusear uma solicitação, verificará há quanto tempo o último cache limpo foi. Se foi há muito tempo, ele vai filar uma tarefa no TaskThread para limpar o cache. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). Isso pode ser especificado em setup.xml, mas isso é desencorajado.
     
### &lt;converterInterpolateRequestCSVExample &gt;{#convertinterpolaterequestcsvexample} 
* Não. ** &lt;converterInterpolateRequestCSVExample&gt; ** ] (#convertinterpolaterequestcsvexample) é uma tag OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xml \\[começar comERDDAP™v2.10\\]que contém um exemplo que será mostrado na página do conversor de interpolar. O valor padrão é: jplMURSST41/analysed\\_sst/Bilinear/4 .
### &lt;converterInterpolateDatasetIDVariableList &gt;{#convertinterpolatedatasetidvariablelist} 
* Não. ** &lt;converterInterpolateDatasetIDVariableList&gt; ** ] (#convertinterpolatedatasetidvariablelist) é uma tag OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xml \\[começar comERDDAP™v2.10\\]que contém uma lista CSV dedatasetID/variável Exemplos de nomes que serão usados como sugestões pela página do conversor de interpolar. O valor padrão é: jplMURSST41/analysed\\_sst.
### &lt;converterToPublicSourceUrl &gt;{#converttopublicsourceurl} 
* Não. ** &lt;convertToPublicSourceUrl&gt; ** ] (# Convert to publicsourceurl) é uma tag OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque contém um atributo "de" e "a" que especifica como converter um local correspondentesourceUrl  (geralmente um número IP) em um públicosourceUrl  (um nome de domínio) "de" deve ter a forma "\\[Alguma coisa?\\]//\\[Alguma coisa?\\]- Sim. Pode haver 0 ou mais dessas tags. Para mais informações consulte [&lt;sourceUrl&gt; (#sourceurl) . Por exemplo,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
vai causar um local correspondentesourceUrl  (como https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
em um públicosourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).

Mas, por razões de segurança e razões relacionadas com o sistema de assinatura, **Não use este saco&#33;**   
Em vez disso, use sempre o nome de domínio público no&lt;sourceUrl&gt; tag e usar[/etc/hosts tabela](https://linux.die.net/man/5/hosts)em seu servidor para converter nomes de domínio locais em números IP sem usar um servidor DNS. Você pode testar se um nome de domínio é convertido corretamente em um número IP usando:
ping *alguns.domínio.nome*   
     
### data:image/png;base64,{#dataimagepngbase64} 
* Quando um usuário solicita um.htmlTableresposta deERDDAP™, se os dados em uma célula String contém dados:image/png;base64, seguido por uma imagem .png codificada base64,ERDDAP™irá exibir um ícone (assim que o usuário pode ver a imagem se eles pairar sobre ele) e botões para salvar o texto ou a imagem para a área de transferência. Este recurso foi adicionado emERDDAP™v2.19 de Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)especifica a configuração padrão que controla quando e como a máscara de terra deve ser desenhada quandoERDDAP™desenha um mapa. Pode ser especificado em três lugares diferentes emdatasets.xml  (listado de menor para maior prioridade) :
    
    1. SedrawLandMaské especificado dentro&lt;erddapDatasets&gt; (não conectado com qualquer conjunto de dados específico) , então ele especifica o valor padrão dedrawLandMaskpara todas as variáveis em todos os conjuntos de dados. Por exemplo,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAPleiturasdatasets.xml.
Se esta tag não estiver presente, o valor padrão subjacente está abaixo.
         
    2. SedrawLandMaské especificado como um atributo global de um dado conjunto de dados, então ele especifica o valor padrão dedrawLandMaskpara todas as variáveis nesse conjunto de dados, substituindo qualquer configuração de prioridade menor. Por exemplo,
    ```
        <att name="drawLandMask">under</att>  
    ```
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™recarrega esse conjunto de dados.
         
    3. SedrawLandMaské especificado como atributo de uma variável em um dado conjunto de dados, então especifica o valor padrão dedrawLandMaskpara essa variável nesse conjunto de dados, substituindo qualquer configuração de prioridade menor. Por exemplo,
    ```
        <att name="drawLandMask">under</att>  
    ```
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™recarrega esse conjunto de dados.
    
Um usuário pode substituir o padrão (onde quer que seja especificado) selecionando um valor para "Mata de terra de rasteja" a partir de uma lista suspensa na página de web Make A Graph do conjunto de dados, ou incluindo &.land= *valor* na URL que solicita um mapa deERDDAP.
    
Em todas as situações, existem 4 valores possíveis para o atributo:
    
    * "sob" desenha a máscara de terra antes de desenhar dados no mapa.
Para conjuntos de dados gradeados, a terra aparece como uma cor cinza clara constante.
Para conjuntos de dados tabulares, "em" mostra dados de topografia sobre terra e oceanos.
    * "over"... Para conjuntos de dados gradeados, "over" desenha a máscara de terra após ele desenha dados sobre mapas para que ele mascarará qualquer dado sobre a terra. Para conjuntos de dados tabulares, "over" mostra a bathymetry do oceano e um cinza claro constante onde há terra, ambos desenhados sob os dados.
    * "fora" apenas desenha o contorno da máscara de terra, limites políticos, lagos e rios.
    * "fora" não saca nada.
### &lt;emailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* Não. ** &lt;e-mailDiagnosticsToErdData&gt; ** ] (#emaildiagnosticstoerddata) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xml. O valor da tag pode ser verdadeiro (o padrão) ou falso. Se for verdade,ERDDAP™vai enviar o rastreamento de pilha para Chris. John no Noaa. Vamos&#33; (oERDDAP™equipe de desenvolvimento) . Isso deve ser seguro, pois nenhuma informação confidencial (por exemplo, o pedido) está incluído no e-mail. Isso deve tornar possível pegar qualquer erro obscuro e totalmente inesperado que leve a NullPointerExceptions. Caso contrário, o usuário vê as exceções, mas oERDDAP™equipe de desenvolvimento não (então não sabemos que há um problema que precisa ser corrigido) .
     
### &lt;graphBackgroundColor &gt;{#graphbackgroundcolor} 
* Não. ** &lt;gráficoCorpo de fundo&gt; ** ] (#graphbackgroundcolor) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar a cor de fundo padrão em gráficos. Isso afeta quase todos os gráficos. Há algumas situações não afetadas. A cor é especificada como um valor hexadecimal de 8 dígitos na forma 0xAARRGGBB, onde AA, RR, GG e BB são os componentes opacidade, vermelho, verde e azul, respectivamente. "0x" é sensível a casos, mas os dígitos hexadecimais não são sensíveis a casos. Por exemplo, um totalmente opaco (?) cor verde-azul com vermelho=22, verde=88, azul=ee seria 0xff2288ee. Opaco branco é 0xffffffffff. O padrão é azul claro opaco (O que é que se passa?) , que tem a vantagem de ser diferente do branco, que é uma cor importante em muitas paletas usadas para desenhar dados. Por exemplo,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests &gt;{#ipaddressmaxrequests} 
* Não. ** &lt;ipAddressMaxRequests&gt; ** ] (#ipaddressmaxrequests) é uma tag opcional raramente usada (primeiro suportado comERDDAP™v2.) dentro de um&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque faz parte de um sistema para limitar a capacidade de usuários legítimos excessivamente agressivos e usuários maliciosos para fazer um grande número de pedidos simultâneos que degradam o desempenho do sistema para outros usuários. IpEndereço MaxRequests especifica o número máximo de solicitações simultâneas que serão aceitas a partir de qualquer endereço IP específico. As solicitações adicionais receberão um erro HTTP 429: Too Many Requests. Os pequenos arquivos estáticos no erddap/download/ erddap/images/ não estão isentos desta contagem. O padrão é 15. O máximo permitido é 1000, o que é louco alto -- não fazê-lo&#33;ERDDAP™não vai aceitar um número menor do que 6 porque muitos usuários legítimos (notavelmente navegadores da web eWMSclientes) fazer até 6 pedidos de cada vez. OERDDAP™O Relatório Diário e as informações semelhantes escritas no arquivo log.txt com cada Recarga de Dados Maiores, agora incluirão uma história das solicitações desses endereços IP sob o título "Requester's IP Address (Muitos pedidos) ".
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
    
A seção "Major LoadDatasets Time Series" de status.html inclui uma coluna "tooMany" que lista o número de solicitações que excedeu a configuração ipAddressMaxRequests de um usuário e, portanto, viu um erro "Too Many Requests". Isso permite que você veja facilmente quando há usuários legítimos super agressivos ativos e usuários maliciosos para que você possa (opcionalmente) veja no arquivo log.txt e decida se você deseja listar os usuários.
    
Não há nada de errado em definir isto para um número maior. Depende de ti. Mas fazer isso permite / encoraja as pessoas a configurar sistemas que usam um grande número de threads para trabalhar em projetos e, em seguida, não lhes dá nenhum feedback de que o que eles estão fazendo não está recebendo nenhum benefício.
### &lt;ipAddressMaxRequestsActive &gt;{#ipaddressmaxrequestsactive} 
* Não. ** &lt;ipAddressMaxRequestsActive&gt; ** ] (#ipaddressmaxrequestsactive) é uma tag opcional raramente usada (primeiro suportado comERDDAP™v2.) dentro de um&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque faz parte de um sistema para limitar a capacidade de usuários legítimos excessivamente agressivos e usuários maliciosos para fazer um grande número de pedidos simultâneos que degradam o desempenho do sistema para outros usuários. ipAddressMaxRequestsActive especifica o número máximo de solicitações simultâneas que serão processadas ativamente a partir de qualquer endereço IP específico. Os pedidos adicionais serão apresentados em uma fila até que os pedidos anteriores tenham sido processados. Os arquivos pequenos e estáticos no erddap/download/ erddap/images/ ARE isentos desta contagem e do estrangulamento relacionado. O padrão é 2. O máximo permitido é 100, o que é alto louco -- não faça isso&#33; Você pode definir isso para 1 para ser rigoroso, especialmente se você tiver problemas com usuários excessivamente agressivos ou maliciosos. Os usuários ainda obterão rapidamente todos os dados que solicitarem (até ipAddressMaxRequests) , mas eles não serão capazes de atrair recursos do sistema. Não recomendamos definir isso para um número maior porque permite que usuários legítimos excessivamente agressivos e usuários maliciosos dominemERDDAPcapacidade de processamento.
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited &gt;{#ipaddressunlimited} 
* Não. ** &lt;ipAddressUnlimited&gt; ** ] (#ipaddressunlimited) é uma tag opcional raramente usada (primeiro suportado comERDDAP™v2.) dentro de um&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque faz parte de um sistema para limitar a capacidade de usuários legítimos excessivamente agressivos e usuários maliciosos para fazer um grande número de pedidos simultâneos que degradam o desempenho do sistema para outros usuários. ipAddressUnlimited é uma lista separada por vírgula de endereços IP que você deseja permitir acesso ilimitado ao seuERDDAP. Olha no teu diário. arquivo txt para ver qual formato seu servidor está usando para os endereços IP. Em alguns servidores, os endereços IP estarão no formato #.#.#.#.#.# (onde # é um inteiro de 0 a 255) ; enquanto em outros estará no formato #:#:#:#:#:#:#:#:#:#:# . Os solicitantes nesta lista não estão sujeitos a as configurações ipAddressMaxRequests ou ipAddressMaxRequestsActive. Isto pode ser secundário.ERDDAP™ou para certos usuários ou servidores em seu sistema.ERDDAP™sempre adiciona " (desconhecido) ", queERDDAP™usa quando o endereço IP do solicitante não pode ser determinado, por exemplo, para outros processos em execução no mesmo servidor.
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
    
Se por algum motivo todas as solicitações de um usuário receberem a mensagem de erro "Timeout aguardando suas outras solicitações para processar"., então você pode resolver o problema adicionando o endereço IP do usuário à lista ipAddressUnlimited, aplicando essa alteração e removendo-a dessa lista.
    
### &lt;loadDatasetsMinMinutes &gt;{#loaddatasetsminminutes} 
* Não. ** &lt;loadDatasetsMinMinutes&gt; ** ] (#loaddatasetsminminutes) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar o tempo mínimo (em minutos) entre grandes cargas Conjuntos de dados (quandoERDDAP™reprocessadoresdatasets.xml, incluindo verificar cada conjunto de dados para ver se ele precisa ser recarregado de acordo com sua recarga definição EveryNMinutes, default=15) . Por exemplo,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Se uma dada execução de loadDatasets leva menos do que desta vez, o carregador apenas repetidamente olha para o diretório da bandeira e/ou dorme até que o tempo restante tenha passado. O padrão é 15 minutos, o que deve ser bom para quase todos. A única desvantagem para definir isso para um número menor é que ele aumentará a frequência queERDDAP™retries conjuntos de dados que têm erros que os impedem de serem carregados (por exemplo, um servidor remoto está em baixo) . Se houver muitos desses conjuntos de dados e eles são retestados frequentemente, a fonte de dados pode considerá-lo comportamento pestering/aggressive. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). AntesERDDAP™v2.00, isso foi especificado no setup.xml, que ainda é permitido mas desencorajado.
     
### &lt;loadDatasetsMaxMinutes &gt;{#loaddatasetsmaxminutes} 
* Não. ** &lt;loadDatasetsMaxMinutes&gt; ** ] (#loaddatasetsmaxminutes) é uma tag OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar o tempo máximo (em minutos) uma grande carga O esforço de conjuntos de dados é permitido tomar (antes da carga Datasets thread tratados como "stalled" e é interrompido)   (default=60) . Por exemplo,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Em geral, isso deve ser definido para pelo menos duas vezes desde que você razoavelmente pensar que recarregar todos os conjuntos de dados (cumulativamente) deve tomar (porque computadores e redes às vezes são mais lentos do que o esperado) Isso deve ser sempre muito mais longo do que carregarDatasetsMinMinutes. O padrão é de 60 minutos. Algumas pessoas vão definir isso para mais tempo. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). AntesERDDAP™v2.00, isso foi especificado no setup.xml, que ainda é permitido mas desencorajado.
     
### &lt;logLevel &gt;{#loglevel} 
* Não. ** &lt;logLevel&gt; ** ] (#loglevel) é uma tag OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar quantas mensagens de diagnóstico são enviadas para o arquivo log.txt. Pode ser definido como "avisar" (as mais poucas mensagens) , "info" (o padrão) , ou "todos" (o mais mensagens) . Por exemplo,
```
    <logLevel>info</logLevel>  
```
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). AntesERDDAP™v2.00, isso foi especificado no setup.xml, que ainda é permitido mas desencorajado.
     
### &lt;parcialRequestMaxBytes &gt; e&lt;parcialRequestMaxCells &gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* Não. ** &lt;parcialRequestMaxBytes&gt; **] (#partialrequestmaxbytes-e-partialrequestmaxcells) E...** &lt;parcialRequestMaxCells&gt; ** ] (#partialrequestmaxbytes-e-partialrequestmaxcells) raramente são usadas tags OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xml. Quando possível (e nem sempre é possível) ,ERDDAP™quebra grandes solicitações de dados em pedaços para conservar a memória.
    
Com 32 bitsJava, em sentido simplista, o número máximo de simultâneo *grande* pedidos é aproximadamente 3/4 da memória disponível (o valor -Xmx passou para Tomcat) dividido pelo tamanho do pedaço (por exemplo, 1200 MB / 100 MB =&gt; 12 pedidos) . Outras coisas exigem memória, então o número real de pedidos será menor. Na prática, chunking nem sempre é possível. Então um enorme ou alguns pedidos não-chunkable simultâneos muito grandes poderia causar problemas em 32 bitsJava.

Com 64 bitsJava, o valor -Xmx pode ser muito maior. Portanto, a memória é muito menos provável ser uma restrição.

Você pode substituir o tamanho do pedaço padrão, definindo essas tags emdatasets.xml  (com valores diferentes do que mostrado aqui) :
Para grades:&lt;parcialRequestMaxBytes&gt;100000000&lt;/partialRequestMaxBytes&gt;
Para tabelas:&lt;parcialRequestMaxCells&gt;1000000&lt;/partialRequestMaxCells&gt;

parcialRequestMaxBytes é o número máximo preferido de bytes para um pedido de dados de grade parcial (um pedaço do pedido total) . padrão = 100000000 (10^8) . Tamanhos maiores não são necessariamente melhores (e não vá mais de 500 MB porque esse é o limite padrão do THREDDS paraDAPrespostas) . Mas tamanhos maiores podem exigir menos acessos de toneladas de arquivos (pensar emERDOs dados de satélite com cada ponto de hora em um arquivo separado - é melhor obter mais dados de cada arquivo em cada solicitação parcial) .

parcialRequestMaxCells é o número máximo preferido de células (NRows \\* nColumns na tabela de dados) para um pedido parcial de dados TABLE (um pedaço do pedido total) . Padrão = 100000. Tamanhos maiores não são necessariamente melhores. Eles resultam em uma espera mais longa para o lote inicial de dados da fonte.

Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). AntesERDDAP™v2.00, estes foram especificados em setup.xml, que ainda é permitido mas desencorajado.
     
### &lt;requestBlacklist &gt;{#requestblacklist} 
* Não. ** &lt;requestBlacklist&gt; ** ] (#Requestblacklist)  [é uma tag OPTIONAL](/docs/server-admin/additional-information#frequent-crashes-or-freezes)dentro de um&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque contém uma lista separada por vírgula de endereços IP numéricos que serão listados em preto. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
    * Isso pode ser usado para afastar um[Denial de ataque de serviço](https://en.wikipedia.org/wiki/Denial_of_service), um zelo excessivamente[robô web](https://en.wikipedia.org/wiki/Internet_bot), ou qualquer outro tipo de usuário problemático.
    * Usuário problemático -- SeERDDAP™retarda um rastreamento ou congela / pára, a causa é muitas vezes um usuário problemático que está executando mais de um script ao mesmo tempo e / ou fazendo um grande número de pedidos muito grandes, extremamente ineficientes, ou inválidos, ou pedidos simultâneos. Olha...[- Não.](/docs/server-admin/additional-information#log)para ver se este é o caso e para encontrar o endereço IP numérico do usuário problemático. Se este é o problema, você provavelmente deve lista negra que o usuário.
        
QuandoERDDAP™recebe um pedido de um endereço IP na lista negra, ele retornará o erro HTTP 403: Proibido. A mensagem de erro de texto que acompanha incentiva o usuário a e-mail, oERDDAPadministrador, para resolver os problemas. Se eles levarem o tempo para ler a mensagem de erro (muitos aparentemente não) e contatá-lo, você pode então trabalhar com eles para fazê-los executar apenas um script de cada vez, fazer solicitações mais eficientes, corrigir os problemas em seu script (por exemplo, solicitando dados de um conjunto de dados remoto que não podem responder antes de sair) , ou qualquer outra coisa era a fonte de problemas.
        
Os usuários muitas vezes simplesmente não sabem que seus pedidos são problemáticos. Eles muitas vezes não têm conhecimento de bugs, ineficiências brutas, ou outros problemas com seus scripts. Eles muitas vezes pensam isso porque o seuERDDAP™oferece dados gratuitamente, que eles podem pedir o máximo de dados que quiserem, por exemplo, executando vários scripts ou usando vários threads simultaneamente.
        
        * Você pode explicar-lhes que cada umERDDAP™, agora importa quão grande e poderoso, tem recursos finitos (Tempo de CPU, disco rígido I/O, largura de banda de rede, etc.) e não é justo se um usuário solicitar dados de uma forma que aglomere outros usuários ou overburdensERDDAP.
        * Uma vez que um usuário sabe como fazer 2 pedidos simultâneos, eles muitas vezes não vêem nenhuma razão para não fazer 5, 10 ou 20 pedidos simultâneos, uma vez que os pedidos adicionais não custam nada. É como uma guerra assimétrica: aqui, as armas ofensivas têm uma enorme vantagem (custo zero) sobre as armas defensivas (uma instalação finita com custos reais) .
        * Apontar para eles que existem diminuindo retornos para fazer solicitações cada vez mais simultâneas; os pedidos adicionais apenas bloquear os pedidos de outros usuários; eles não produzem uma enorme melhoria para eles.
        * Lembre-os de que existem outros usuários (usuários casuais e outros usuários executando scripts) , então não é justo que eles abram todosERDDAPOs recursos.
        * Apontar que os gigantes tecnológicos induzem os usuários a esperar recursos infinitos de serviços web. Enquanto há maneiras de configurar[grades/clusters/federações deERDDAPS](/docs/server-admin/scaling)para fazer umERDDAP™sistema com mais recursos, a maioriaERDDAP™administradores não têm o dinheiro ou a mão-de-obra para configurar tais sistemas, e tal sistema ainda será finito. EmERDpor exemplo, há uma pessoa (eu...) escrevendoERDDAP™, administrando doisERDDAPS (com ajuda de meu chefe) , e gestão de várias fontes de dados, todos com um orçamento anual de hardware de $0 (confiamos em bolsas ocasionais para pagar por hardware) . Isto não é Google, Facebook, Amazon, etc com 100 de engenheiros, e milhões de dólares de receita para reciclar em sistemas cada vez maiores. E não podemos apenas mover o nossoERDDAP™para, por exemplo, Amazon AWS, porque os custos de armazenamento de dados são grandes e as taxas de entrada de dados são grandes e variáveis, enquanto nosso orçamento para serviços externos é fixo $0.
        * Meu pedido aos usuários é: para pedidos não sensíveis a tempo (que é, de longe, o caso mais comum) , seu sistema deve apenas fazer um pedido de cada vez. Se os pedidos forem sensíveis ao tempo (por exemplo, várias .pngs em uma página web, várias telhas para umaWMScliente, etc.) , então talvez 4 pedidos simultâneos devem ser o máximo (e apenas por um tempo muito curto) .
        * Se você explicar a situação ao usuário, a maioria dos usuários entenderá e estará disposto a fazer as mudanças necessárias para que você possa remover seu endereço IP da lista negra.
             
    * Para a lista negra de um usuário, adicione seu endereço IP numérico à lista de endereços IP separados por vírgula&lt;requestBlacklist&gt; em seudatasets.xmlficheiro. Para encontrar o endereço IP do usuário problemático, consulte oERDDAP™  *Diretriz de grande porte* arquivo /logs/log.txt ( *Diretriz de grande porte* é especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) para ver se este é o caso e para encontrar o endereço IP desse usuário. O endereço IP para cada solicitação está listado nas linhas começando com "&#123;&#123;&#123;&#123;#" e é 4 números separados por períodos, por exemplo, 123.45.67.8 . Procurando por "ERROR" irá ajudá-lo a encontrar problemas como pedidos inválidos.
    * Você também pode substituir o último número em um endereço IP com\\*(por exemplo, 202.109.200.\\*) bloquear uma gama de endereços IP, 0-255.
    * Você também pode substituir os últimos 2 números em um endereço IP com\\*.\\*  (por exemplo, 121.204.\\*.\\*) para bloquear uma gama mais ampla de endereços IP, 0-255.0-255.
    * Por exemplo,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Você não precisa reiniciarERDDAP™para as mudanças&lt;requestBlacklist&gt; para ter efeito. As alterações serão detectadas da próxima vezERDDAP™verifica se algum conjunto de dados precisa ser recarregado. Ou, você pode acelerar o processo visitando um[conjunto de dados URL da bandeira](/docs/server-admin/additional-information#set-dataset-flag)para qualquer conjunto de dados.
    * Tu ésERDDAP™O relatório diário inclui uma lista/tal dos solicitantes mais ativos permitidos e bloqueados.
    * Se você quiser descobrir qual domínio / instituição está relacionada a um endereço IP numérico, você pode usar um serviço de web DNS gratuito e inverso como[ https://network-tools.com/ ](https://network-tools.com/).
    * Pode haver momentos em que faz sentido bloquear certos usuários em um nível superior, por exemplo, usuários maliciosos. Por exemplo, você pode bloquear seu acesso a tudo em seu servidor, não apenasERDDAP. No Linux, um desses métodos é usar[Iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Por exemplo, você pode adicionar uma regra que irá bloquear tudo que vem de 198.51.100.0 com o comando
iptables - INPUT -s 198.51.100.0 - J DROP
       
### &lt;slowDownTroubleMillis &gt;{#slowdowntroublemillis} 
* Não. ** &lt;slowDownTroubleMillis&gt; ** ] (#Slowdowntroublemillis) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque contém um inteiro especificando o número de milissegundos (default=1000) para pausar ao responder a todas as solicitações falhadas, por exemplo, conjunto de dados desconhecidos, solicitar muito grande, usuário na lista negra. Por exemplo,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Se um script está fazendo um pedido imediatamente após o outro, então pode rapidamente fazer um mau pedido depois do outro. Com esta configuração, você pode retardar um script de falha assimERDDAP™não está cheia de maus pedidos. Se um humano fizer um mau pedido, eles nem vão notar este atraso. Recomendações:
    
    * Se o problema é uma negação distribuída do serviço (DDOS) ataque de mais de 100 atacantes, definir isso para um número menor (100?) . Atrasá-los todos para baixo por muito tempo leva a muitos fios ativos.
    * Se o problema for de 1-10 fontes, defina isso para 1000 ms (o padrão) , mas um número maior (como 10000) também é razoável. Isso os reduz para que eles percam menos recursos de rede. Além disso, 1000 ms ou assim não vai irritar os usuários humanos que fazem um mau pedido.
    
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
     
### &lt;assinaturaEmailBlacklist &gt;{#subscriptionemailblacklist} 
* Não. ** &lt;assinatura E-mailBlacklist ** ] (Lista negra de assinaturas) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque contém uma lista separada por vírgula de endereços de e-mail que são imediatamente listados a partir da[sistema de assinatura](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)Por exemplo
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Este é um sistema insensível a casos. Se um endereço de e-mail for adicionado a esta lista, se esse endereço de e-mail tiver assinaturas, as assinaturas serão canceladas. Se um endereço de e-mail na lista tentar assinar, o pedido será recusado. Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
     
### Texto padrão{#standard-text} 
*   [ **Texto padrão** ](#standard-text)- ... Existem várias tags OPTIONAL (mais raramente são usados) dentro de um&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar texto que aparece em vários lugares emERDDAP. Se você quiser alterar o texto padrão, copie o valor existente da tag do mesmo nome em
     *Toca a brincar.* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml para dentrodatasets.xml, então modifique o conteúdo. A vantagem de tê-los emdatasets.xmlé que você pode especificar novos valores a qualquer momento, mesmo quandoERDDAP™está a correr. Quaisquer alterações nos valores dessas tags entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). Os nomes de tags descrevem seu propósito, mas veja o conteúdo padrão em message.xml para um entendimento mais profundo.
    
    *   &lt;padrãoLicença&gt;
    *   &lt;padrãoContato&gt;
    *   &lt;standardDataLicenses&gt;
    *   &lt;padrãoDisclaimerOfEndorsement&gt;
    *   &lt;standardDisclaimerOfExternalLinks&gt;
    *   &lt;standardGeneralDisclaimer&gt;
    *   &lt;padrão Política de Privacidade&gt;
    *   &lt;startHeadHtml5&gt;
    *   &lt;startBodyHtml5&gt; é uma boa tag para mudar, a fim de personalizar a aparência do topo de cada página da web em suaERDDAP. Notavelmente, você pode usar isso para adicionar facilmente uma mensagem temporária noERDDAP™Página inicial (por exemplo, "Verifique o novo conjunto de dados JPL MUR SST v4.1 ..." ou "ThisERDDAP™estará offline para manutenção 2019-05-08T17:00 PDT até 2019-05-08T20:00 PDT.") . Um quirk de colocar esta tag emdatasets.xmlé: quando você reiniciarERDDAP, o primeiro pedido aERDDAP™retornará o início padrão BodyHtml5 HTML, mas cada solicitação subsequente usará o HTML startBodyHtml5 especificado emdatasets.xml.
    *   &lt;a descrição curta Html&gt; é uma boa tag para mudar, a fim de personalizar a descrição de seuERDDAP. Note que você pode facilmente mudar isso para adicionar uma mensagem temporária na página inicial (por exemplo, "IstoERDDAP™estará offline para manutenção 2019-05-08T17:00 PDT até 2019-05-08T20:00 PDT.") .
    *   &lt;endBodyHtml5&gt;
    
      
AntesERDDAP™v2.00, estes foram especificados em setup.xml, que ainda é permitido mas desencorajado.
     
### &lt;incomum Atividade &gt;{#unusualactivity} 
* Não. ** &lt;Atividade incomum&gt; ** ] (#unusualatividade) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar o número máximo de pedidos entre duas corridas de LoadDatasets que é considerado normal (default=10000) . Se esse número for excedido, um e-mail é enviado para e-mail (como especificado em setup.xml) . Por exemplo,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag). AntesERDDAP™v2.00, isso foi especificado no setup.xml, que ainda é permitido mas desencorajado.
     
### &lt;updateMaxEvents &gt;{#updatemaxevents} 
* Não. ** &lt;updateMaxEvents&gt; ** ] (#updatemaxevents) é uma tag OPTIONAL raramente usada dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlpara especificar o número máximo de eventos de mudança de arquivo (padrão=10) que será tratado pelo [&lt;updateEveryNMillis&gt;] (#updateeverynmillis #) sistema antes de mudar para recarregar o conjunto de dados. Por exemplo,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
O sistema updateEveryNMillis destina-se a executar muito rapidamente antes que a solicitação de um usuário seja processada. Se houver muitos eventos de mudança de arquivo, então presumivelmente não pode ser executado rapidamente, então, em vez disso, exige que o conjunto de dados seja recarregado. Se vocêERDDAP™lida com conjuntos de dados que devem ser mantidos atualizados mesmo quando houver mudanças em um grande número de arquivos de dados, você pode definir isso para um número maior (100?) .

### &lt;usuário &gt;{#user} 
* Não. ** &lt;utilizador&gt; ** ] (#user #) é uma tag OPTIONAL dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque identifica o nome de usuário, senha (se a autenticação = personalizada) , e papéis (uma lista separada por vírgula) . O uso de nome de usuário e senha varia ligeiramente com base no valor de [&lt;autenticação&gt; (/docs/servidor-admin/informação adicional#autenticação) em seuERDDAPÉ o arquivo setup.xml.
    * Isto faz parte deERDDAP'[sistema de segurança](/docs/server-admin/additional-information#security)para restringir o acesso a alguns conjuntos de dados a alguns usuários.
    * Faça um separado&lt;user&gt; tag para cada usuário. Opcionalmente, se autenticação=oauth2, você pode configurar dois&lt;utilizador&gt; tags para cada usuário: uma para quando o usuário faz login via Google, um para quando o usuário faz login via Orcid, presumivelmente com as mesmas funções.
    * Se não houver&lt;user&gt; tag para um cliente, ele só será capaz de acessar conjuntos de dados públicos, ou seja, conjuntos de dados que não têm um [&lt;acessível para&gt; (Acessível a) tag.
    * Nome de utilizador
Para autenticação=personalizado, o nome de usuário é geralmente uma combinação de letras, dígitos, sublinhados e períodos.
Para autenticação=email, o nome de usuário é o endereço de e-mail do usuário. Pode ser qualquer endereço de e-mail.
Para autenticação=google, o nome de usuário é o endereço de e-mail completo do Google. Isso inclui contas gerenciadas pelo Google como@noaa.govcontas.
Para autenticação=orcid, o nome de usuário é o número de conta Orcid do usuário (com traços) .
Para autenticação=oauth2, o nome de usuário é o endereço de e-mail completo do Google ou o número de conta Orcid do usuário (com traços) .
    * senha
Para autenticação=email, google, orcid ou oauth2, não especifique um atributo de senha.
Para autenticação=personalizado, você deve especificar um atributo de senha para cada usuário.
        * As senhas que os usuários entram são sensíveis a casos e devem ter 8 ou mais caracteres para que eles sejam mais difíceis de quebrar. Hoje em dia, até 8 caracteres podem ser rachados de forma rápida e barata pela força bruta usando um conjunto de computadores na AWS.ERDDAP™apenas impõe o mínimo de 8 caracteres quando o usuário tenta fazer login (não quando o&lt;user&gt; tag está sendo processado, porque esse código só vê o hash digest da senha, não a senha de texto simples).
        * setup.xml's&lt;codificação de senhas determina como as senhas são armazenadas no&lt;utilizador&gt; etiquetas emdatasets.xml. Para aumentar a segurança, as opções são:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Não uses isto&#33;) -- para o atributo password, especifique o resumo hash MD5 da senha do usuário.
            * UEPMD5 (Não uses isto&#33;) -- para o atributo password, especifique o resumo hash do MD5 *Nome de utilizador* :ERDDAP: *senha* . O nome de usuário e "ERDDAP" são usados para[sal](https://en.wikipedia.org/wiki/Salt_(cryptography)) o valor hash, tornando mais difícil decodificar.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (não recomendado) -- para o atributo password, especifique o resumo hash SHA-256 da senha do usuário.
            * UEPSHA256 (default, recomendado passwordEncoding. Mas muito melhor: use o google, orchid, ou oauth2 opções de autenticação.) -- para o atributo password, especifique o digestivo hash SHA-256 *Nome de utilizador* :ERDDAP: *senha* . O nome de usuário e "ERDDAP" são usados para sal o valor hash, tornando mais difícil decodificar.
        * No Windows, você pode gerar valores de digestão por senha MD5 baixando um programa MD5 (como[MD5](https://www.fourmilab.ch/md5/)) e usando (por exemplo) :
md5 -djsmith:ERDDAP: *Palavra-passe real* 
        * No Linux/Unix, você pode gerar valores de digestão MD5 usando o programa md5sum integrado (por exemplo) :
echo -n "jsmith:ERDDAP: *Palavra-passe real* "|Md5sum
        * Senhas de texto simples armazenadas são sensíveis a casos. As formas armazenadas de senhas MD5 e UEPMD5 não são sensíveis a casos.
        * Por exemplo (usando UEPMD5) , se username="jsmith" e password="myPassword", o&lt;user&gt; tag é:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
onde a senha armazenada foi gerada com
md5 -djsmith:ERDDAP: minha palavra
        * funções é uma lista separada por vírgula de funções para as quais o usuário está autorizado. Qualquer&lt;dataset&gt; pode ter um [&lt;acessível para&gt; (Acessível a) tag que lista as funções que são permitidas para acessar esse conjunto de dados. Para um determinado usuário e um dado conjunto de dados, se uma das funções na lista de funções do usuário corresponde a uma das funções na lista de conjuntos de dados&lt;funções acessíveisTo&gt;, então o usuário está autorizado a acessar esse conjunto de dados.
            
Cada usuário que faz login é automaticamente dado o papel\\[Qualquer pessoa Em\\], se há um&lt;user&gt; tag para eles emdatasets.xmlou não. Então, se um dado conjunto de dados tiver
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
então qualquer usuário que está conectado será autorizado a acessar esse conjunto de dados, mesmo que não haja&lt;user&gt; tag para eles emdatasets.xml.
            
    * Quaisquer alterações no valor desta tag entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml, incluindo em resposta a um conjunto de dados[bandeira](/docs/server-admin/additional-information#flag).
         
### &lt;pathRegex &gt;{#pathregex} 
* Não. ** &lt;pathRegex&gt; ** ] (#) permite especificar uma expressão regular que limita os caminhos (que subdiretórios) será incluído no conjunto de dados. O padrão é .\\*, que corresponde a todos os caminhos. Esta é uma tag raramente usada, raramente necessária, OPTIONAL paraEDDGridDeFiles conjuntos de dados, EDDTableDeFiles conjuntos de dados, e alguns outros tipos de conjuntos de dados. No entanto, quando você precisa, você realmente precisa.
    
Para fazer isso funcionar, você precisa ser realmente bom com expressões regulares. Veja isto[documentação](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial do regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). Em particular, você precisa saber sobre grupos de captura (algo dentro de parênteses) e o símbolo "ou"|".
Juntos, estes permitem especificar qualquer número de opções, por exemplo, (Opção1|opção2|opção3) .
Além disso, qualquer uma das opções não pode ser nada, por exemplo, (|opção2|opção3) .
Além disso, você precisa saber que grupos de captura podem ser aninhados, ou seja, qualquer opção em um grupo de captura pode conter outro grupo de captura, por exemplo, (|opção2 (|opção2 b)|opção2c) |opção3) que diz que opção2 pode ser seguido por nada, ou opção2b, ou opção2c.
Para pathRegexes, cada opção será um nome de pasta seguido por um /, por exemplo, bar / .
    
A parte complicada do caminhoRegex é: QuandoERDDAP™recursivamente desce a árvore de diretórios, o caminhoRegex deve aceitar todos os caminhos que encontra em seu caminho para os diretórios com dados. Regex's com grupos de captura aninhados são uma boa maneira de lidar com isso.
    
Um exemplo:
Suponha que temos a seguinte estrutura de diretório:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
e o fileDirectory especificado é /foo/bar/, e nós apenas queremos.ncarquivos no D\\[0-9\\]&#123;4&#125;/a/ subdirectories.
A solução é definir caminhoRegex para /foo/bar/ (|D\\[0-9\\](4) (|a)) )   
Isso diz:
O caminho deve começar com /foo/bar/
Isso pode ser seguido por nada ou D\\[0-9\\](4)
Isso pode ser seguido de nada ou a /
    
Sim, o PathRegex pode ser incrivelmente difícil de formular. Se você ficar preso, pergunte a um programador de computador (a coisa mais próxima no mundo real a um feiticeiro que brota incantações?) ou enviar um e-mail para Chris. John no noaaa.gov.
    
### &lt;dataset &gt;{#dataset} 
* Não. ** &lt;dataset&gt; ** ] (#dataset) é um OPTIONAL (mas sempre usado) tag dentro de uma&lt;erddapDatasets&gt; Identificaçãodatasets.xmlque (se você incluir todas as informações entre&lt;dataset&gt; e&lt;/dataset&gt;) descreve completamente um conjunto de dados. Por exemplo,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Pode haver qualquer número de tags de conjuntos de dados em suadatasets.xmlficheiro.
Três atributos MAY aparecem dentro de um&lt;dataset&gt; tag:
     
    *    **Tipo... *um Tipo* "** é um atributo REQUIRED dentro de um&lt;dataset&gt; tag indatasets.xmlque identifica o tipo de conjunto de dados (por exemplo, se é umEDDGrid/gridded ou EDDTable / conjunto de dados tabular) e a fonte dos dados (por exemplo, um banco de dados, arquivos ou um remotoOPeNDAPservidor) . Ver[ **Lista de Tipos de Conjunto de Dados** ](#list-of-types-datasets).
         
#### conjunto de dados I.{#datasetid} 
*   [ **datasetID= *aDatasetID* "** ](#datasetid)é um atributo REQUIRED dentro de um&lt;dataset&gt; tag que atribui um curto (geralmente&lt;15 caracteres), único, identificando nome para um conjunto de dados.
    * OdatasetIDdeve ser uma carta (A-Z, a-z) seguido por qualquer número de A-Z, a-z, 0-9, e \\_ (mas melhor se&lt;32 caracteres no total).
    * Conjunto de dados IDs são sensíveis a casos, mas NÃO criar doisdatasetIDs que só diferem em letras maiúsculas/baixas. Ele vai causar problemas em computadores Windows (seu e/ou computador de um usuário) .
    * Melhores práticas: Recomendamos usar[camelo Processo](https://en.wikipedia.org/wiki/CamelCase).
    * Melhores práticas: Recomendamos que a primeira parte seja uma sigla ou abreviação do nome da instituição-fonte e a segunda parte seja uma sigla ou abreviação do nome do conjunto de dados. Quando possível, criamos um nome que reflete o nome da fonte para o conjunto de dados. Por exemplo, usamosdatasetID- Não.ssta8day" para um conjunto de dados doNOAA NMFS SWFSCDivisão de Investigação Ambiental (ERD) que é designado pela fonte para ser satélite/PH/sst8 dias.
    * Se você alterar o nome de um conjunto de dados, o conjunto de dados antigo (com o nome antigo) vai continuar a viverERDDAP. Este é um conjunto de dados "órfãos", porque a especificação para eledatasets.xmlAgora desapareceu. Isto deve ser tratado:
        1. ParaERDDAP™v2.19 e mais tarde, você não precisa fazer nada.ERDDAP™removerá automaticamente esses conjuntos de dados órfãos.
        2. ParaERDDAP™v2.18 e antes, você precisa fazer algo para remover os conjuntos de dados órfãos: Faça um conjunto de dados ativo="false", por exemplo,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Após a próxima grande carga Conjuntos de dados, Você pode remover essa tag depois que o conjunto de dados antigo é inativo.
                 
#### ativo{#active} 
*   [ **Ativar *booleano* "** ](#active)é um atributo OPTIONAL dentro de um&lt;dataset&gt; tag indatasets.xmlo que indica se um conjunto de dados está ativo (elegíveis para uso emERDDAP) ou não.
    * Os valores válidos são verdadeiros (o padrão) e falso.
    * Uma vez que o padrão é verdadeiro, você não precisa usar esse atributo até que você queira remover temporariamente ou permanentemente este conjunto de dadosERDDAP.
    * Se você apenas remover um dataset ativo="true" dedatasets.xml, o conjunto de dados ainda estará ativo emERDDAP™mas nunca será atualizado. Tal conjunto de dados será um "órfão" e será listado como tal no status. html página web abaixo da lista de conjuntos de dados que não foram carregados.
    * Se você definir ativo="false",ERDDAP™irá desativar o conjunto de dados da próxima vez que tentar atualizar o conjunto de dados. Quando fazes isto,ERDDAP™não descarta qualquer informação que possa ter armazenado sobre o conjunto de dados e certamente não faz nada aos dados reais.
    * Para remover um conjunto de dadosERDDAP™Veja[Remoção de Dados de Força](/docs/server-admin/additional-information#removing-datasets).
         

 ** Várias tags podem aparecer entre as&lt;dataset&gt; e&lt;/dataset&gt; tags. **   
Há alguma variação em que as tags são permitidas por que tipos de conjuntos de dados. Veja a documentação para um específico[tipo de conjunto de dados](#list-of-types-datasets)para detalhes.

#### &lt;acessível Para &gt;{#accessibleto} 
* Não. ** &lt;acessível - A sério? ** ] (Acessível a) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag que especifica uma lista separada por vírgulas[papéis](#user)que são autorizados a ter acesso a este conjunto de dados. Por exemplo,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Isto faz parte deERDDAP'[sistema de segurança](/docs/server-admin/additional-information#security)para restringir o acesso a alguns conjuntos de dados a alguns usuários.
    * Se esta tag não estiver presente, todos os usuários (mesmo que não tenham entrado) terá acesso a este conjunto de dados.
    * Se esta tag estiver presente, este conjunto de dados só será visível e acessível a usuários conectados que tenham uma das funções especificadas. Este conjunto de dados não será visível para usuários que não estão conectados.
    * Cada usuário que faz login é automaticamente dado o papel\\[Qualquer pessoa Em\\], se há um&lt;user&gt; tag para eles emdatasets.xmlou não. Então, se um dado conjunto de dados tiver
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
então qualquer usuário que está conectado será autorizado a acessar esse conjunto de dados, mesmo que não haja&lt;user&gt; tag para eles emdatasets.xml.
         
#### &lt;gráficosAccessibleTo &gt;{#graphsaccessibleto} 
* Não. ** &lt;gráficosAccessibleTo&gt; ** ] (#graphsacessível para) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlque determina se gráficos e metadados para o conjunto de dados estão disponíveis para o público. Oferece uma maneira de substituir parcialmente o conjunto de dados [&lt;acessível para&gt; (Acessível a) configuração. Os valores permitidos são:
    * auto... Este valor (ou a ausência de um&lt;graphsAccessibleTo&gt; tag para o conjunto de dados) faz acesso a gráficos e metadados do conjunto de dados imitar o conjunto de dados&lt;configuração acessível para&gt;.
Então, se o conjunto de dados é privado, seus gráficos e metadados serão privados.
E se o conjunto de dados é público, seus gráficos e metadados serão públicos.
    * público - ... Esta configuração torna os gráficos e metadados do conjunto de dados acessíveis a qualquer pessoa, mesmo usuários que não estejam conectados, mesmo que o conjunto de dados seja de outra forma privado porque ele tem um&lt;acessível Para&gt; tag.
         
#### &lt;acessível ViaFiles &gt;{#accessibleviafiles} 
* Não. ** &lt;acessívelViaFiles&gt; ** ] (#acessível através de arquivos) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlpara[EDDGridDimensão existente agregada](#eddgridaggregateexistingdimension),[EDDGridEntendido.](#eddgridcopy),[EDDGridTabela DED](#eddgridfromeddtable),[EDDGridDe Erddap](#eddfromerddap),[EDDGridDe Etopo](#eddgridfrometopo),[EDDGridDos quartos](#eddgridfromfiles)  (incluindo todas as subclasses) ,[EDDGridSideBySide](#eddgridsidebyside),[EDDTableCopy](#eddtablecopy) [EDDTable FromErddap](#eddfromerddap),[Tabela de EDDEDDGrid](#eddtablefromeddgrid)e[Tabela EDD dos arquivos](#eddtablefromfiles)  (incluindo todas as subclasses) conjuntos de dados. Pode ter um valor de verdadeiro ou falso. Por exemplo,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Se o valor for verdadeiro,ERDDAP™irá fazê-lo para que os usuários possam navegar e baixar os arquivos de dados de origem do conjunto de dados viaERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/). Ver"files"sistema[documentação](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)para mais informações.
    
O valor padrão de&lt;acessívelViaFiles&gt; vem de&lt;defaultAccessibleViaFiles&gt; em[setup.xml](/docs/server-admin/deploy-install#setupxml). Tem um valor padrão de falso, mas recomendamos que você adicione essa tag ao seu setup.xml com um valor de verdade.
    
Recomendação -- Recomendamos fazer todos os conjuntos de dados relevantes acessíveis através do sistema de arquivos, definindo&lt;defaultAccessibleViaFiles&gt; para true no setup.xml porque há um grupo de usuários para quem esta é a maneira preferida para obter os dados. Entre outras razões, o"files"sistema torna mais fácil para os usuários ver quais arquivos estão disponíveis e quando eles são alterados pela última vez, facilitando que um usuário mantenha sua própria cópia de todo o conjunto de dados. Se você geralmente não quiser fazer conjuntos de dados acessíveis através do sistema de arquivos, defina&lt;defaultAccessibleViaFiles&gt; para false. Em qualquer caso, basta usar&lt;acessívelViaFiles&gt; para os poucos conjuntos de dados que são exceções à política geral definida por&lt;defaultAccessibleViaFiles&gt; (por exemplo, quando o conjunto de dados usa[.ncml](#ncml-files)arquivos, que não são realmente úteis para usuários) .
     
#### &lt;acessível ViajandoWMS&gt;{#accessibleviawms} 
* Não. ** &lt;acessível ViajandoWMS&gt; ** ] (#acessível através de) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlpara todos[EDDGrid](#eddgrid)subclasses. Pode ter um valor de verdade (o padrão) ou falso. Por exemplo,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Se o valor for falso,ERDDAP'WMSservidor não estará disponível para este conjunto de dados. Isso é comumente usado para conjuntos de dados que têm alguns valores de longitude maiores que 180 (que tecnicamente é inválido paraWMSserviços) , e para o qual você também está oferecendo uma variante do conjunto de dados com valores de longitude inteiramente no intervalo -180 a 180 via[EDDGridLonPM180](#eddgridlonpm180).
Se o valor for verdadeiro,ERDDAP™vai tentar tornar o conjunto de dados disponível atravésERDDAP'WMSservidor. Mas se o conjunto de dados é completamente inadequado paraWMS  (por exemplo, não há dados de longitude ou latitude) , então o conjunto de dados não estará disponível viaERDDAP'WMSservidor, independentemente desta configuração.
     
#### &lt;Adicionar Variáveis Onde &gt;{#addvariableswhere} 
* Não.&lt;addVariablesWhere&gt;] (#addvariableswhere) é uma tag OPTIONAL dentro do&lt;dataset&gt; tag para todos os conjuntos de dados EDDTable.
    
Os pedidos de qualquer conjunto de dados da EDDTable podem incluir &add Variáveis Onde? (" *atributos Nome* ", *atributos Valor* ") , que dizERDDAP™para adicionar todas as variáveis no conjunto de dados onde *Atributos relacionados* para a lista de variáveis solicitadas. Por exemplo, se um usuário adiciona &add Variáveis Onde? ("ioos\\_category","Wind") para uma consulta,ERDDAPirá adicionar todas as variáveis no conjunto de dados que têmioos\\_category= Atributo Wind à lista de variáveis solicitadas (por exemplo, windSpeed, windDirection, windGustSpeed) . *atributos Nome* e *atributos Valor* são sensíveis a casos.
    
Emdatasets.xml, se o pedaço de dataset.xml para um conjunto de dados tem
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
por exemplo,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
o formulário de acesso de dados (Página web .html) para o conjunto de dados incluirá um widget (para cada atributoNome na lista separada por vírgula) abaixo da lista de variáveis que permite aos usuários especificar um valor de atributo. Se o usuário selecionar um valor de atributos para um ou mais dos nomes de atributos, eles serão adicionados à solicitação via &add Variáveis Onde? (" *atributos Nome* ", *atributos Valor* ") . Assim, esta tag emdatasets.xmlpermite especificar a lista de nomes de atributos que aparecerão no Formulário de Acesso de Dados para esse conjunto de dados e facilita que os usuários adicionem &addVariables Onde funções para o pedido. O *atributosCSV* A lista é sensível a casos.
    
#### &lt;altitudeMetersPerSourceUnit &gt;{#altitudemeterspersourceunit} 
* Não. ** &lt;altitudeMetersPerSourceUnit&gt; ** ] (#altitudemeterspersourceunit) é uma tag OPTIONAL dentro do&lt;dataset&gt; tag em conjuntos de dados. xxml para EDDTableDeSOSconjuntos de dados (Só&#33;) que especifica um número que é multiplicado pelos valores de altitude ou profundidade da fonte para convertê-los em valores de altitude (em metros acima do nível do mar) . Por exemplo,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Esta tag DEVE ser usada se os valores do eixo vertical do conjunto de dados não são medidores, positivo=up. Caso contrário, é OPTIONAL, uma vez que o valor padrão é 1. Por exemplo,
    * Se a fonte já é medida em metros acima do nível do mar, use 1 (ou não use esta tag, uma vez que 1 é o valor padrão) .
    * Se a fonte for medida em metros abaixo do nível do mar, use -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Se a fonte for medida em km acima do nível do mar, use 0,001.
         
#### &lt;defaultDataQuery &gt;{#defaultdataquery} 
* Não. ** &lt;defaultDataQuery&gt; ** ] (Tradução e Revisão:) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlque dizERDDAP™para usar a consulta especificada (a parte da URL após o "?") se o arquivo .html Tipo (o formulário de acesso de dados) é solicitado sem consulta.
    * Você provavelmente raramente precisará usar isso.
    * Você precisa para XML-encode (não o código de porcentagem) as consultas padrão desde que estão em um documento XML. Por exemplo, & se torna &amp; ,&lt;torna-se&lt;, &gt; se torna &gt; .
    * Por favor, verifique o seu trabalho. É fácil cometer um erro e não ter o que você quer.ERDDAP™tentará limpar seus erros -- mas não confie nisso, desde\\*como fazer\\*é limpo pode mudar.
    * Para conjuntos de dados do griddap, um uso comum disso é especificar um valor diferente da profundidade padrão ou da dimensão da altitude (por exemplo,\\[0\\]em vez de\\[último\\]) .
Em qualquer caso, você deve sempre listar todas as variáveis, sempre usar os mesmos valores de dimensão para todas as variáveis, e quase sempre usar\\[0\\],\\[último\\]ou\\[0: última\\]para os valores de dimensão.
Por exemplo:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Paratabledapdatasets, se você não especificar qualquer restrição, a solicitação retornará todo o conjunto de dados, o que pode ser impraticamente grande, dependendo do conjunto de dados. Se você não quiser especificar quaisquer restrições, em vez de ter um vazio&lt;defaultDataQuery&gt; (que é o mesmo que não especificar um padrão Pergunta de dados) , você precisa listar explicitamente todas as variáveis que deseja incluir no defaultDataQuery.
    * Paratabledapdatasets, o uso mais comum disso é especificar um intervalo de tempo padrão diferente (em relação ao máximo (Tempo) , por exemplo, &time&gt;=max (Tempo) -1day, ou em relação a agora, por exemplo, &time&gt;=now-1 dia) .
Lembre-se que não requerer variáveis de dados é o mesmo que especificar todas as variáveis de dados, então geralmente você pode apenas especificar a nova restrição de tempo.
Por exemplo:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
ou
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery &gt;{#defaultgraphquery} 
* Não. ** &lt;defaultGraphQuery&gt; ** ] (#defaultgraphquery) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlque dizERDDAP™para usar a consulta especificada (a parte da URL após o "?") se o arquivo .graph Tipo (o fazer um formulário gráfico) é solicitado sem consulta.
    * Você provavelmente raramente precisará usar isso.
    * Você precisa para XML-encode (não o código de porcentagem) as consultas padrão desde que estão em um documento XML. Por exemplo, & se torna &amp; ,&lt;torna-se&lt;, &gt; se torna &gt; .
    * Por favor, verifique o seu trabalho. É fácil cometer um erro e não ter o que você quer.ERDDAP™tentará limpar seus erros -- mas não confie nisso, desde\\*como fazer\\*é limpo pode mudar.
    * Para conjuntos de dados do griddap, o uso mais comum disso é especificar um valor diferente da profundidade padrão ou da dimensão da altitude (por exemplo,\\[0\\]em vez de\\[último\\]) e/ou especificar que uma variável específica seja graficada.
Em qualquer caso, você quase sempre vai usar\\[0\\],\\[último\\]ou\\[0: última\\]para os valores de dimensão.
Por exemplo:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (mas coloque tudo em uma linha) 
    * Paratabledapdatasets, se você não especificar qualquer restrição, a solicitação irá gravar todo o conjunto de dados, o que pode demorar muito tempo, dependendo do conjunto de dados.
    * Paratabledapdatasets, o uso mais comum disso é especificar um intervalo de tempo padrão diferente (em relação ao máximo (Tempo) , por exemplo, &time&gt;=max (Tempo) -1day, ou em relação a agora, por exemplo, &time&gt;=now-1 dia) .
Lembre-se que não requerer variáveis de dados é o mesmo que especificar todas as variáveis de dados, então geralmente você pode apenas especificar a nova restrição de tempo.
Por exemplo:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
ou
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensionValuesInMemory &gt;{#dimensionvaluesinmemory} 
* Não. ** &lt;dimensão Valores em memória&gt; ** ] (#valores de dimensão em memória)   (verdadeiro (o padrão) ou falso) é uma tag OPTIONAL e raramente usada dentro do&lt;dataset&gt; tag para qualquerEDDGriddataset que dizERDDAP™onde manter os valores-fonte das dimensões (também conhecido como oaxisVariableS) :
    
    * true = em memória (que é mais rápido, mas usa mais memória) 
    * false = no disco (que é mais lento, mas não usa memória) 
    
Por exemplo,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Você só deve usar isso com o valor não-padrão de falso se o seuERDDAP™tem um monte de conjuntos de dados com dimensões muito grandes (por exemplo, milhões de valores, por exemplo,EDDGridConjuntos de dados da AudioFiles) eERDDAPO uso de memória é sempre muito alto. Veja a Memória: atualmente usando linha em\\[seu domínio\\]/erddap/status.htmlpara monitorarERDDAP™uso de memória.
     
#### &lt;arquivoTableInMemory &gt;{#filetableinmemory} 
* Não. ** &lt;arquivoTableInMemory&gt; ** ] (#filetableinmemory)   (verdadeiro ou falso (o padrão) ) é uma tag OPTIONAL dentro do&lt;dataset&gt; tag para qualquerEDDGridDos Ficheiros e Tabela EDD Conjunto de dados do FromFiles que contaERDDAP™onde manter a tabela de arquivos (que tem informações sobre cada arquivo de dados de origem) :
    
    * true = em memória (que é mais rápido, mas usa mais memória) 
    * false = no disco (que é mais lento, mas não usa memória) 
    
Por exemplo,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Se você definir isso para true para qualquer conjunto de dados, mantenha um olho na memória: atualmente usando linha em\\[seu domínio\\]/erddap/status.htmlpara garantir queERDDAP™ainda tem muita memória livre.
     
#### &lt;fgdcFile &gt;{#fgdcfile} 
* Não. ** &lt;FgdcFile ** ] (#fgdcfile) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlque dizERDDAP™para usar um arquivo FGDC pré-feito em vez de terERDDAP™tentar gerar o arquivo. Uso:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *completo Nome do arquivo* pode se referir a um arquivo local (algures no sistema de ficheiros do servidor) ou a URL de um arquivo remoto.
Se *completo Nome do arquivo* \\=" ou o arquivo não é encontrado, o conjunto de dados não terá metadados FGDC. Então isso também é útil se você quiser suprimir os metadados FGDC para um conjunto de dados específico.
Ou podes pôr&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; em setup.xml para dizerERDDAP™não oferecer metadados FGDC para qualquer conjunto de dados.
     
#### &lt;INSTITUIÇÕES Arquivo &gt;{#iso19115file} 
* Não. ** &lt;iso19115File&gt; ** ] (#iso19115file) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlque dizERDDAP™para usar um arquivo ISO 19115 pré-feito em vez de terERDDAP™tentar gerar o arquivo. Uso:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *completo Nome do arquivo* pode se referir a um arquivo local (algures no sistema de ficheiros do servidor) ou a URL de um arquivo remoto.
Se *completo Nome do arquivo* \\=" ou o arquivo não é encontrado, o conjunto de dados não terá metadados ISO 19115. Então isso também é útil se você quiser suprimir os metadados ISO 19115 para um conjunto de dados específico.
Ou podes pôr&lt;iso19115Active&gt;false&lt;/iso19115Active&gt; em setup.xml para contarERDDAP™não oferecer metadados ISO 19115 para qualquer conjunto de dados.
     
#### &lt;Axis de correspondência NDigits &gt;{#matchaxisndigits} 
* Não. ** &lt;O que é isso? ** ] (#matchaxisndigits) é uma tag OPTIONAL dentro de umaEDDGrid &lt;dataset&gt; tag paraEDDGridconjuntos de dados que são agregados, por exemplo, agregados de arquivos. Cada vez que o conjunto de dados é recarregado,ERDDAP™verifica se os valores do eixo de cada componente da agregação são os mesmos. A precisão dos testes é determinada pela[Jogos de Vestir](#matchaxisndigits), que especifica o número total de dígitos que devem corresponder ao testar valores de eixo de dupla precisão, 0 - 18 (o padrão) . Ao testar os valores do eixo flutuante, o teste é feito com os dígitos matchAxisNDigits/2. Um valor de 18 ou superior dizEDDGridpara fazer um teste exato. Um valor de 0 dizEDDGridnão fazer nenhum teste, o que não é recomendado, exceto conforme descrito abaixo.
    
EmboraEDDGridpermite que os componentes da agregação tenham valores de eixo ligeiramente diferentes, apenas um conjunto de valores de eixo é mostrado ao usuário. O conjunto é do mesmo componente que fornece os metadados de origem do conjunto de dados. Por exemplo,EDDGridConjuntos de dados do FromFiles, que é especificado pelo&lt;metadadosDe configuração do&gt; (default=last) .
    
O uso de matchAxisNDigits\\=0 é fortemente desencorajado na maioria dos casos, porque desliga toda a verificação. Mesmo a verificação mínima é útil porque garante que os componentes são adequados para agregar. Todos nós presumimos que todos os componentes são adequados, mas nem sempre é assim. É assim um importante teste de sanidade. Mesmo os valores de matchAxisNDigits1, 2, 3 ou 4 são desencorajados porque os diferentes valores de eixo muitas vezes indicam que os componentes foram criados (Binned?) uma maneira diferente e, portanto, não são adequados para agregação.
    
Há um caso em que usar o matchAxisNDigits\\=0 é útil e recomendado: com agregados de arquivos remotos, por exemplo, dados em baldes S3. Neste caso, se o conjunto de dados usa cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, e oEDDGridSistema FromFiles para[Agregação via Nomes de arquivo](#aggregation-via-file-names-or-global-metadata)EntãoEDDGridnão precisa ler todos os arquivos remotos para fazer a agregação. Isso permite que conjuntos de dados feitos a partir de dados em baldes S3 para carregar muito rapidamente (ao contrário de absurdamente lentamente seEDDGridtem que baixar e ler todos os arquivos) .
    
#### &lt;nThreads &gt;{#nthreads} 
* Começar comERDDAP™versão 2.00, quando qualquer subclasse de EDDTableFromFiles ouEDDGridlê dados de sua fonte, pode ler um pedaço de dados (por exemplo, um arquivo de origem) em um momento (em um fio)   (que é o padrão) ou mais de um pedaço de dados (por exemplo, 2+ arquivos de origem) em um momento (em 2 ou mais fios) ao processar cada pedido.
     
    * Regra de Tumb:
Para a maioria dos conjuntos de dados na maioria dos sistemas, use nThreads=1, o padrão. Se você tem um computador poderoso (muitos núcleos de CPU, muita memória) , em seguida, considerar a definição nTreads para 2, 3, 4 ou superior (mas nunca mais do que o número de núcleos de CPU no computador) para conjuntos de dados que podem beneficiar:
        
        * A maioria dos conjuntos de dados EDDTableFromFiles beneficiará.
        * Os conjuntos de dados onde algo causa um atraso antes que um pedaço de dados possa realmente ser processado irão beneficiar, por exemplo:
            * Datasets com[externamente comprimido (por exemplo,.gz) ](#externally-compressed-files)binário (por exemplo,.nc) arquivos, porqueERDDAP™tem que descomprimir todo o arquivo antes que ele possa começar a ler o arquivo.
            * Datasets que usam[cacheSizeGB](#cachefromurl)PorqueERDDAP™muitas vezes tem que baixar o arquivo antes que ele possa lê-lo.
            * Conjuntos de dados com arquivos de dados armazenados em um sistema de arquivos paralelo de alta largura de banda, porque ele pode fornecer mais dados, mais rápido, quando solicitado. Exemplos de sistemas de arquivos paralelos incluem[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[PNFS](http://www.pnfs.com/),[Gluster](https://en.wikipedia.org/wiki/Gluster), Amazon S3 e Google Cloud Storage.
                 
        
Atenção: Ao usar nThreads&gt;1, fique de olho emERDDAPuso de memória, uso de rosca e capacidade de resposta geral (ver[ERDDAPPágina de status](/docs/server-admin/additional-information#status-page)) . Veja comentários sobre essas questões abaixo.
         
    * Para um dado conjunto de dados, esta configuração nThreads pode vir de diferentes lugares:
        
        * Se odatasets.xmlchunk para um conjunto de dados tem&lt;nThreads&gt; tag (dentro do&lt;dataset&gt; tag, não como um atributo global) com um valor &gt;= 1, esse valor de nThreads é usado. Assim, você pode especificar um número diferente para cada conjunto de dados.
        * Caso contrário, sedatasets.xmltem um&lt;nTableThreads&gt; tag (para EDDTable Conjuntos de dados de Ficheiros) ou um&lt;nGridThreads&gt; tag (paraEDDGridconjuntos de dados) com um valor &gt;= 1, fora de um&lt;dataset&gt; tag, esse valor de nThreads é usado.
        * Caso contrário, 1 thread é usado, que é uma escolha segura, uma vez que usa a menor quantidade de memória.
             
        
Pelo[original originalERDDAP™instalação](https://coastwatch.pfeg.noaa.gov/erddap/index.html), usamos
        &lt;nTableThreads&gt; 6&lt;/nTableThreads&gt; (É um servidor poderoso.) Os pedidos difíceis agora levam 30% do tempo anterior.
         
##### Uso de Recursos do Monitor{#monitor-resource-usage} 
Quando você está experimentando com diferentes configurações nThreads (e talvez fazendo pedidos de amostra difíceis para o seuERDDAP) , você pode monitorar o uso de recursos do seu computador:
* Em Macs, use o Finder : Aplicações : Utilitários : Monitor de Atividade
* No Linux, use o topo
* No Windows 10, use *Ctrl + Shift + Esc* para abrir o Gerenciador de tarefas
             
##### Aviso: Diminuição da responsabilidade{#warning-decreased-responsiveness} 
Em isolamento,ERDDAP™cumprirá uma solicitação para um conjunto de dados com uma configuração mais alta de nThreads mais rápido do que se nThreads=1. Mas enquanto esse pedido está sendo processado, outras solicitações de outros usuários serão um pouco lotadas e obter uma resposta mais lenta. Também, quandoERDDAP™responde a uma determinada solicitação, outros recursos de computação (por exemplo, acesso de unidade de disco, largura de banda de rede) pode ser limitante, especialmente com configurações mais altas do nThreads. Assim, com configurações nThreads mais altas, a capacidade de resposta geral do sistema será pior quando houver várias solicitações sendo processadas - isso pode ser muito irritante para os usuários&#33; Devido a isso: nunca definir nThreads para mais do que o número de núcleos de CPU no computador. nThreads=1 é a configuração mais justa desde cada solicitação (entre várias solicitações simultâneas) terá uma parcela igual de recursos de computação. Mas quanto mais poderoso o computador, menos este será um problema.
         
##### Atenção: Memória superior Uso paraEDDGridConjuntos de dados{#warning-higher-memory-use-for-eddgrid-datasets} 
O uso de memória durante o processamento de pedidos é diretamente proporcional à configuração nThreads. Uma regra razoavelmente segura do polegar é: você precisa definir[ERDDAPconfigurações de memória](/docs/server-admin/deploy-install#memory)para pelo menos 2GB + (2GB \\* nTreads) . Alguns pedidos para alguns conjuntos de dados precisarão de mais memória do que isso. Por exemplo, definir nThreads=3 para qualquerEDDGriddataset significa que a configuração -Xmx deve ser pelo menos -Xmx8000M. Se essa configuração de memória é maior que 3/4 a memória física do computador, diminua a configuração nThreads para que você possa diminuir a configuração de memória.

O uso de memória de pedidos de processamento de threads para conjuntos de dados EDDTable é quase sempre menor porque os arquivos são geralmente muito menores. No entanto, se um dado conjunto de dados EDDTable tiver enorme (por exemplo, &gt;=1 GB) arquivos de dados, então os comentários acima serão aplicados a esses conjuntos de dados também.

Seja qual for a configuração nThreads, fique de olho nas estatísticas de uso de memória em seu[ERDDAPPágina de status](/docs/server-admin/additional-information#status-page). Você nunca deve chegar perto de maximizar o uso da memória emERDDAP; caso contrário haverá erros e falhas graves.
        
##### Temporariamente definido para 1{#temporarily-set-to-1} 
Se o uso atual da memória é ainda ligeiramente alto,ERDDAP™irá definir nThreads para este pedido para 1. Assim,ERDDAP™conserva a memória quando a memória é escassa.
         
##### Diminuindo Retornos{#diminishing-returns} 
Há retornos diminuindo para aumentar a configuração nThreads: 2 threads serão muito melhores do que 1 (se ignorarmos overclocking dinâmico) . Mas 3 será apenas um pedaço melhor que 2. E 4 serão apenas marginalmente melhores do que 3.

Em um teste de uma consulta difícil para um grande conjunto de dados EDDTable, o tempo de resposta usando 1, 2, 3, 4, 5, 6 threads foi 38, 36, 20, 18, 13, 11 segundos. (Agora usamos nTableThreads=6 nesse servidor.) 

NThreads=2: Embora, muitas vezes há um benefício significativo para especificar nThreads=2 em vez de nThreads=1, muitas vezes não fará muita diferença no tempo do relógio necessário para responder a um pedido de um determinado usuário. A razão é: com nThreads=1, a maioria da CPU moderna muitas vezes[dinamicamente overclock](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (impulso turbo) para aumentar temporariamente a velocidade do relógio da CPU. Assim, com nThreads=1, o um núcleo muitas vezes estará trabalhando em uma velocidade de clock maior do que cada um dos dois núcleos se você usou nThreads=2. Independentemente disso, ainda achamos que é melhor usar nThreads=2 em vez de nThreads=1, uma vez que essa configuração irá produzir melhores resultados em uma variedade mais ampla de situações. E, claro, se o seu computador possui núcleos de CPU suficientes, uma configuração de nThreads ainda maior deve produzir melhores resultados.

Como discutido acima, as configurações de nThreads muito altas podem levar a respostas mais rápidas a alguns pedidos, mas o risco de redução geralERDDAP™capacidade de resposta e uso de alta memória (como observado acima) enquanto esses pedidos estão sendo processados significa que geralmente não é uma boa ideia.
        
##### CPU Núcleos{#cpu-cores} 
Você nunca deve definir nThreads para um número maior do que o número de núcleos de CPU na CPU do computador. Essencialmente, todas as CPUs modernas têm múltiplos núcleos (por exemplo, 2, 4 ou 8) . Alguns computadores têm até várias CPUs (por exemplo, 2 CPUs \\* 4 núcleos/CPU = 8 núcleos de CPU) . Para descobrir quantos CPUs e núcleos um computador tem:

* Em Macs, use *Chave de opção* : Apple Menu : Informações do Sistema
* No Linux, use cat /proc/cpuinfo
* No Windows 10, use *Ctrl + Shift + Esc* para abrir Gerenciador de tarefas : Desempenho (Processadores lógicos mostram o número total de núcleos de CPU) 

Sim, a maioria dos processadores nos dias de hoje dizem que suportam 2 fios por núcleo (via via via via[hiperthreading](https://en.wikipedia.org/wiki/Hyper-threading)) , mas os 2 threads compartilham recursos de computação, então você não verá o dobro da taxa de transferência em uma CPU sob carga pesada. Por exemplo, um computador com uma CPU com 4 núcleos pode reivindicar para suportar até 8 threads, mas você nunca deve exceder nThreads=4 nissoERDDAP. Lembre-se que:

* A configuração nThreads emERDDAP™é por solicitação.ERDDAP™muitas vezes lida com várias solicitações simultaneamente.
*   ERDDAP™faz coisas que não sejam solicitações de processo, por exemplo, recarregar conjuntos de dados.
* QuandoERDDAP™responde a uma determinada solicitação, outros recursos de computação (por exemplo, acesso de unidade de disco, largura de banda de rede) pode ser limitante. Quanto maior você definir nThreads, mais provável que esses outros recursos serão maximizados e retardarãoERDDAPA resposta geral.
* O sistema operacional faz outras coisas além de executarERDDAP.

Então é melhor não definir a configuração nThreads para mais do que o número de núcleos na CPU do computador.
         
##### Sua Quilometragem Maio Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
Os resultados de diferentes configurações de nThreads variam muito para diferentes solicitações para diferentes conjuntos de dados em diferentes sistemas. Se você realmente quer saber o efeito de diferentes configurações nThreads, execute testes realistas.
         
##### Por que nThreads por solicitação?{#why-nthreads-per-request} 
Eu posso ouvir alguns de vocês pensando "Por que nThreads por solicitação? Se eu estivesse codificando isso, eu usaria um pool de threads de trabalhadores permanentes e uma fila de mensagens para melhor desempenho." O problema com a utilização de um conjunto de threads de trabalhadores e uma fila de mensagens é que um pedido difícil inundaria a fila com inúmeras tarefas lentas. Isso seria um bloqueio eficaz.ERDDAP™de até mesmo iniciar o trabalho em tarefas relacionadas a outros pedidos até que o pedido inicial foi (essencialmente) Acabou. Assim, mesmo pedidos subseqüentes simples responderiam super lentamente.ERDDAPO uso de nThreads por solicitação leva a um uso muito mais justo de recursos de computação.
         
##### nThreads vs. vários computadores do trabalhador{#nthreads-vs-multiple-worker-computers} 
Infelizmente,ERDDAP's nThreads sistema nunca será tão eficaz como verdadeiro paralelo através de vários computadores trabalhadores, com cada um trabalhando em um pedaço de dados, na maneira que Hadoop ou Apache Spark são geralmente usados. Quando a tarefa é verdadeiramente paralela/distribuída a vários computadores, cada computador pode usar todos os seus recursos na sua parte da tarefa. ComERDDAP's nThreads sistema, cada um dos fios está competindo para a largura de banda do mesmo computador, drives de disco, memória, etc. Infelizmente, a maioria de nÃ£o tem recursos ou fundos para configurar ou mesmo alugar (na Amazon Web Services (AWS) ou Google Cloud Platform (GCP) ) enormes redes de computadores. Além disso, ao contrário de um banco de dados relacional que é permitido retornar as linhas de resultados em qualquer ordem,ERDDAP™faz uma promessa de retornar as linhas de resultados em uma ordem consistente. Esta restrição fazERDDAP's nThreads implementação menos eficiente. Mas...ERDDAP's nThreads é útil em muitos casos.

No entanto, há maneiras de fazerERDDAP™escala para lidar com um grande número de pedidos rapidamente, estabelecendo um[grade/cluster/federação deERDDAPS](/docs/server-admin/scaling).
         
#### &lt;paletas &gt;{#palettes} 
* Começar comERDDAP™versão 2.12,datasets.xmlpode incluir um&lt;paletas&gt; tag (dentro&lt;erddapDatasets&gt;) que substitui o&lt;paletas&gt; valor de tag de mensagens.xml (ou reverte para o valor message.xml se a tag indatasets.xmlestá vazio) . Isso permite que você altere a lista de paletas disponíveis enquantoERDDAP™está a correr. Ele também permite que você faça uma mudança e tê-lo persistir quando você instalar uma nova versão deERDDAP.
WARNING: As paletas listadas emdatasets.xmldeve ser um superset das paletas listadas em mensagens.xml; caso contrárioERDDAP™vai lançar uma exceção e parar de processamentodatasets.xml. Isso garante que tudoERDDAP™instalações pelo menos suportam as mesmas paletas principais.
ATENÇÃO:ERDDAP™verifica se os arquivos de paletas especificados em mensagens.xml realmente existem, mas não verifica os arquivos de paleta listados emdatasets.xml. É sua responsabilidade garantir que os arquivos estão presentes.
    
Também começando comERDDAP™versão 2.12, se você fizer um subdiretório cptfiles noERDDAP™diretório de conteúdo,ERDDAP™copiará todos os arquivos \\*.cpt nesse diretório no\\[Toca a brincar.\\]/webapps/erddap/WEB-INF/cptfiles diretório cada vezERDDAP™Começa. Assim, se você colocar arquivos cpt personalizados nesse diretório, esses arquivos serão usados porERDDAP™, sem esforço extra em sua parte, mesmo quando você instala uma nova versão deERDDAP.
    
AVISO: Se você adicionar paletas personalizadas ao seuERDDAP™tu tensEDDGridFromErddap e/ou EDDTableDe conjuntos de dados Erddap em seuERDDAP™, então os usuários verão suas opções de paleta personalizadasERDDAP™Faça um gráfico páginas da web, mas se o usuário tentar usá-los, eles obterão um gráfico com o padrão (geralmente arco-íris) paleta. Isso porque a imagem é feita pelo controle remotoERDDAP™que não tem a paleta personalizada. As únicas soluções agora são para enviar um e-mail remotoERDDAP™administrador para adicionar suas paletas personalizadas ao seuERDDAPou e-mail Chris. John noaa.gov para pedir que as paletas sejam adicionadas ao padrãoERDDAP™distribuição.
    
#### &lt;onChange &gt;{#onchange} 
* Não. ** &lt;sobre a mudança ** ] (#onchange #) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlque especifica uma ação que será feita quando este conjunto de dados for criado (quandoERDDAP™é reiniciado) e sempre que este conjunto de dados muda de qualquer forma.
    * Atualmente, paraEDDGridsubclasses, qualquer mudança para metadados ou para uma variável eixo (por exemplo, um novo ponto de tempo para dados próximos do tempo real) é considerado uma mudança, mas uma recarga do conjunto de dados não é considerada uma mudança (por si só) .
    * Atualmente, para subclasses EDDTable, qualquer recarga do conjunto de dados é considerada uma mudança.
    * Atualmente, apenas dois tipos de ações são permitidas:
        * " http://" ou " https://" - ... Se a ação começar com " http://" ou " https://" ,ERDDAP™vai enviar umHTTP GETsolicitar a URL especificada. A resposta será ignorada. Por exemplo, a URL pode dizer a algum outro serviço web para fazer algo.
            * Se a URL tiver uma parte de consulta (depois do "?) , deve ser já[por cento codificado](https://en.wikipedia.org/wiki/Percent-encoding). Você precisa codificar caracteres especiais nas restrições (diferente do inicial '&' e o principal'='em restrições) na forma %HH, onde HH é o valor hexadecimal de 2 dígitos do personagem. Normalmente, você só precisa converter alguns dos caracteres de pontuação: % em %25, & em %26, " em %22,&lt;em %3C, = em %3D, &gt; em %3E, + em %2B,|em %7C,\\[em %5B,\\]em %5D, espaço em %20, e converter todos os caracteres acima #127 em sua forma UTF-8 e, em seguida, por cento codificar cada byte da forma UTF-8 no formato %HH (pedir ajuda a um programador) .
Por exemplo, &stationID&gt; = 41004
torna-se &amp; nbsp;stationID%3E =%2241004%22
A codificação por cento é geralmente necessária quando você acessaERDDAPvia software diferente de um navegador. Os navegadores geralmente lidam com a codificação por cento para você.
Em algumas situações, você precisa codificar por cento todos os caracteres que não A-Za-z0-9\\_-&#33;.~ ' () \\*, mas ainda não codifica a inicial '&' ou a principal'='em restrições.
Linguagens de programação têm ferramentas para fazer isso (por exemplo, verJava'[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)eJavaO script é [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) e há
                [sites que por cento codificar / decodificar para você](https://www.url-encode-decode.com/).
            * Desde entãodatasets.xmlé um arquivo XML, você MUST também &-encode ALL '&', '&lt;', e '&gt;' na URL como ' &amp;', '&lt;', and '&gt;' after percent encoding.
            * Exemplo: Para uma URL que você pode digitar em um navegador como:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Você deve especificar um&lt;onChange&gt; tag via (em uma linha) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * para: - ... Se a ação começar com "mailto:",ERDDAP™enviará um e-mail para o endereço de e-mail subsequente indicando que o conjunto de dados foi atualizado / alterado.
Por exemplo:&lt;onChange&gt;mail para:john.smith@company.com&lt;/onChange&gt; Se você tem uma boa razão paraERDDAP™para apoiar algum outro tipo de ação, envie-nos um e-mail descrevendo o que você quer.
    * Esta tag é OPTIONAL. Pode haver tantas etiquetas como quiser. Use uma dessas tags para cada ação a ser executada.
    * Isto é análogoERDDAPsistema de assinatura por e-mail/URL, mas essas ações não são armazenadas persistentemente (ou seja, eles são apenas armazenados em um objeto EDD) .
    * Para remover uma assinatura, basta remover o&lt;tag onChange&gt;. A mudança será notada na próxima vez que o conjunto de dados for recarregado.
         
#### &lt;reloadEveryNMinutes &gt;{#reloadeverynminutes} 
* Não. ** &lt;recarregar Cada NMinuts&gt; ** ] (#reloadeverynminutes) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlde quase todos os tipos de conjuntos de dados que especificam com que frequência o conjunto de dados deve ser recarregado. Por exemplo,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Geralmente, conjuntos de dados que mudam frequentemente (por exemplo, obter novos arquivos de dados) deve ser recarregado frequentemente, por exemplo, a cada 60 minutos.
    * Os conjuntos de dados que mudam raramente devem ser recarregados com frequência, por exemplo, a cada 1440 minutos (diariamente) ou 10080 minutos (semanal semanal semanal) .
    * Esta tag é OPTIONAL, mas recomendado. O padrão é 10080.
    * Um exemplo é:&lt;reloadEveryNMinuts&gt;1440&lt;/recarregar Cada NMinuts&gt;
    * Quando um conjunto de dados é recarregado, todos os arquivos no *Diretriz de grande porte* /cache / *datasetID* diretório são excluídos.
    * Não importa o que isso esteja definido, um conjunto de dados não será carregado mais frequentemente do que&lt;loadDatasetsMinMinutes&gt; (default = 15) , conforme especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml). Então, se você quiser que os conjuntos de dados sejam recarregados com muita frequência, você precisa definir ambos recarregar EveryNMinutes e carregarDatasets MinMinutes a pequenos valores.
    * Não configure reloadEveryNMinutes para o mesmo valor que loadDatasets MinMinutes, porque o tempo decorrido é provável que seja (por exemplo) 14:58 ou 15:02, assim o conjunto de dados só será recarregado em cerca de metade das principais recargas. Em vez disso, use um menor (por exemplo, 10) ou maior (por exemplo, 20) recarregar Cada NMinutes valor.
    * Independentemente da recarga EveryNMinutes, você pode dizer manualmenteERDDAP™para recarregar um conjunto de dados específico o mais rapidamente possível através de um[arquivo de bandeira](/docs/server-admin/additional-information#flag).
    * Para programadores curiosos -- emERDDAP™, a recarga de todos os conjuntos de dados é tratada por dois fios únicos. Um fio inicia uma pequena recarga se encontrar um arquivo de bandeira ou uma grande recarga (que verifica todos os conjuntos de dados para ver se eles precisam ser recarregados) . O outro thread faz a recarga real dos conjuntos de dados um de cada vez. Esses threads funcionam em segundo plano, garantindo que todos os conjuntos de dados sejam mantidos atualizados. O fio que realmente faz as recargas prepara uma nova versão de um conjunto de dados, em seguida, swap-lo no lugar (essencialmente substituindo a versão antiga atomicamente) . Então é muito possível que a seguinte sequência de eventos ocorra (É uma coisa boa.) :
        
        1.  ERDDAP™começa a recarregar um conjunto de dados (fazendo uma nova versão) no fundo.
        2. O usuário 'A' faz um pedido para o conjunto de dados.ERDDAP™usa a versão atual do conjunto de dados para criar a resposta. (Isso é bom. Não houve atraso para o usuário, e a versão atual do conjunto de dados nunca deve ser muito estável.) 
        3.  ERDDAP™termina criando a nova versão recarregada do conjunto de dados e swaps que nova versão em produção. Todos os novos pedidos subsequentes são tratados pela nova versão do conjunto de dados. Para consistência, o pedido do usuário A ainda está sendo preenchido pela versão original.
        4. O usuário 'B' faz um pedido para o conjunto de dados eERDDAP™usa a nova versão do conjunto de dados para criar a resposta.
        5. As solicitações do usuário A e do usuário B são concluídas (talvez A's termina primeiro, talvez B's termina primeiro) .
        
Consigo ouvir alguém a dizer: "Só dois trilhos&#33; Ha&#33; Isso é coxo&#33; Ele deve configurar isso para que o recarregamento de conjuntos de dados use tantos fios como são necessários, então tudo é feito mais rápido e com pouco ou nenhum atraso." Sim e não. O problema é que carregar mais de um conjunto de dados de cada vez cria vários novos problemas difíceis. Todos eles precisam ser resolvidos ou tratados. O sistema atual funciona bem e tem problemas gerenciáveis (por exemplo, potencial para lag antes que uma bandeira seja notada) . (Se você precisar de ajuda para gerenciá-los, consulte nosso[seção sobre como obter suporte adicional](/docs/intro#support).) O relacionado[atualização CadaNMillis](#updateeverynmillis). sistema funciona dentro de threads de resposta, assim que pode e leva a vários conjuntos de dados sendo atualizados (não a recarga completa) simultaneamente.
##### Proativo vs. Reativo{#proactive-vs-reactive} 
ERDDAPO sistema de recarga é proativo -- os conjuntos de dados são recarregados logo após a sua recarga Cada vez que o tempo está pronto (ou seja, eles se tornam "stale", mas nunca muito stale) , se o conjunto de dados está recebendo pedidos de usuários ou não. Então...ERDDAP™datasets são sempre atualizados e prontos para uso. Isso é em contraste com a abordagem reativa do THREDDS: o pedido de um usuário é o que diz ao THREDDS para verificar se um conjunto de dados é estável (pode ser muito estável) . Se for obsoleto, o THREDDS faz o usuário esperar (muitas vezes por alguns minutos) enquanto o conjunto de dados é recarregado.
        
#### &lt;atualização EveryNMillis &gt;{#updateeverynmillis} 
* Não. ** &lt;updateEveryNMillis&gt; ** ] (#updateeverynmillis #) é uma tag OPTIONAL dentro de uma&lt;dataset&gt; tag indatasets.xmlde alguns tipos de conjuntos de dados que ajudamERDDAP™trabalhar com conjuntos de dados que mudam muito frequentemente (tão frequentemente quanto cada segundo) . Ao contrárioERDDAPÉ normal, proactivo,&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) sistema para recarregar completamente cada conjunto de dados, este sistema adicional OPTIONAL é reativo (acionado por uma solicitação de usuário) e mais rápido porque é incremental (apenas atualizando as informações que precisam ser atualizadas) . Por exemplo, se um pedido para umEDDGridO conjunto de dados do FromDap ocorre mais do que o número especificado de milissegundos desde a última atualização,ERDDAP™vai ver se existem novos valores para a esquerda (primeiro, geralmente"time") dimension e, se assim for, basta baixar esses novos valores antes de lidar com o pedido do usuário. Este sistema é muito bom em manter um conjunto de dados em rápida mudança up-to-date com demandas mínimas sobre a fonte de dados, mas ao custo de retardar ligeiramente o processamento de algumas solicitações de usuário.
    * Para usar este sistema, adicione (por exemplo) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
logo após o&lt;reloadEveryNMinuts&gt; tag para o conjunto de dados emdatasets.xml. O número de milissegundos que você especificar pode ser tão pequeno quanto 1 (para garantir que o conjunto de dados esteja sempre atualizado) . Um valor de 0 (o padrão) ou um número negativo desliga o sistema.
    * Devido à sua natureza incremental, as atualizações devem terminar muito rapidamente, para que os usuários nunca devem esperar muito tempo.
    * Se uma segunda solicitação de dados chegar antes da atualização anterior terminar, a segunda solicitação não irá ativar outra atualização.
    * Ao longo da documentação, tentaremos usar a palavra "recarregar" para recargas regulares e completas de conjuntos de dados e "update" para essas novas atualizações incrementais e parciais.
    * Para fins de teste, alguns diagnósticos são impressos para log.txt se [&lt;logLevel&gt; (#loglevel) emdatasets.xmlestá definido para "todos".
    * Se você usar atualizações incrementais e especialmente se a esquerda (Primeiro) , por exemplo, tempo, eixo é grande, você pode querer definir&lt;reloadEveryNMinutes&gt; para um número maior (1440?) , de modo que as atualizações fazem a maior parte do trabalho para manter o conjunto de dados atualizado, e recargas completas são feitas com freqüência.
    * Nota: este novo sistema de atualização atualiza metadados (por exemplo, tempoactual\\_range, time\\_coverage\\_end, ...) mas não dispara noChange (URL de e-mail ou toque) ou alterar aRSSalimentação (Talvez devesse...) .
    * Para todos os conjuntos de dados que usam subclasses de[EDDGridDos quartos](#eddgridfromfiles)e[Tabela EDD dos arquivos](#eddtablefromfiles):
        *    **ATENÇÃO:** quando você adiciona um novo arquivo de dados a um conjunto de dados copiando-o no diretório queERDDAP™olha para, há um perigo queERDDAP™vai notar o arquivo parcialmente escrito; tentar lê-lo, mas falhar porque o arquivo é incompleto; declarar o arquivo para ser um arquivo "maio" e removê-lo (temporariamente) do conjunto de dados.
Para evitar isso, nós **RECOMENDAMENTE ESTRAMENTE** que você copie um novo arquivo no diretório com um nome temporário (por exemplo, 20150226.ncTEMPO) que não corresponde ao arquivo de conjuntos de dados NomeRegex (\\*\\\\.nc) , então renomeie o arquivo para o nome correto (por exemplo, 20150226.nc) . Se você usar essa abordagem,ERDDAP™irá ignorar o arquivo temporário e apenas notar o arquivo corretamente nomeado quando estiver completo e pronto para ser usado.
        * Se você modificar arquivos de dados existentes no lugar (por exemplo, para adicionar um novo ponto de dados) ,&lt;updateEveryNMillis&gt; funcionará bem se as mudanças aparecerem atomicamente (em um instante) e o arquivo é sempre um arquivo válido. Por exemplo, a biblioteca netcdf-java permite adições à dimensão ilimitada de um "clássico".ncarquivo v3 a ser feito atomicamente.
            &lt;updateEveryNMillis&gt; funcionará mal se o arquivo é inválido enquanto as alterações estão sendo feitas.
        *   &lt;updateEveryNMillis&gt; funcionará bem para conjuntos de dados onde um ou alguns arquivos mudam em um curto período de tempo.
        *   &lt;updateEveryNMillis&gt; trabalhará mal para conjuntos de dados onde um grande número de arquivos muda em um curto período de tempo (a menos que as alterações apareçam atomicamente) . Para esses conjuntos de dados, é melhor não usar&lt;updateEveryNMillis&gt; e para definir um[bandeira](/docs/server-admin/additional-information#set-dataset-flag)para contarERDDAP™para recarregar o conjunto de dados.
        *   &lt;updateEveryNMillis&gt; não atualiza as informações associadas ao [&lt;subsetVariables&gt; (#subsetvariables) . Normalmente, isso não é um problema, porque osubsetVariablester informações sobre coisas que não mudam muito (por exemplo, a lista de nomes de estações, latitudes e longitudes) . Se osubsetVariablesalterações de dados (por exemplo, quando uma nova estação é adicionada ao conjunto de dados) , em seguida, contate o[URL da bandeira](/docs/server-admin/additional-information#set-dataset-flag)para o conjunto de dados para contarERDDAP™para recarregar o conjunto de dados. Caso contrário,ERDDAP™não vai notar o novo subconjunto Informações variáveis até a próxima vez que o conjunto de dados for recarregado (&lt;reloadEveryNMinutes&gt;).
        * Nossa recomendação genérica é usar:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * TROUBLE? Em computadores Linux, se você estiver usando&lt;updateEveryNMillis&gt; comEDDGridFromFiles ou EDDTableFromFiles classes, você pode ver um problema onde um conjunto de dados não consegue carregar (ocasionalmente ou consistentemente) com a mensagem de erro: "IOException: limite de usuário de inotify instâncias alcançadas ou muitos arquivos abertos". A causa pode ser um erroJavao que faz inotificar instâncias para não ser lixo coletado. Este problema é evitado emERDDAP™v1.66 e superior. Então a melhor solução é mudar a versão mais recente deERDDAP.
Se isso não resolver o problema (isto é, se você tem um grande número de conjuntos de dados usando&lt;updateEveryNMillis&gt;), você pode corrigir este problema chamando:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Ou, use números mais altos se o problema persistir. O padrão para relógios é 8192. O padrão para instâncias é 128.
    * Você pode colocar&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; emdatasets.xml  (com as outras configurações perto da parte superior) para alterar o número máximo de alterações de arquivo (padrão=10) que será processado pelo sistema updateEveryNMillis. Um número maior pode ser útil para o conjunto de dados onde é muito importante que eles sejam mantidos sempre atualizados. Ver[atualizarMáxEventos documentação](#updatemaxevents).
    * Para programadores curiosos -- essas atualizações incrementais, ao contrárioERDDAPEstá cheio.[recarregar Cada um dos Minuts](#reloadeverynminutes)sistema, ocorrer dentro de threads de solicitação de usuário. Assim, qualquer número de conjuntos de dados pode ser atualizado simultaneamente. Há código (e uma fechadura) para garantir que apenas um thread está trabalhando em uma atualização para qualquer conjunto de dados em qualquer momento. Permitir múltiplas atualizações simultâneas foi fácil; permitir múltiplas recargas completas simultâneas seria mais difícil.
         
#### &lt;sourceCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* Não. ** &lt;fonteCanConstrainStringEQNE&gt; ** ] (#sourcecanconstrainstringqne) é uma tag OPTIONAL dentro de uma tabela EDD&lt;dataset&gt; tag indatasets.xmlque especifica se a fonte pode restringir as variáveis String com os operadores = e &#33;=.
    * Para EDDTableFromDapSequence, isso se aplica apenas às variáveis de sequência externa String. Assume-se que a fonte não pode lidar com quaisquer restrições em variáveis de sequência interna.
    * Esta tag é OPTIONAL. Os valores válidos são verdadeiros (o padrão) e falso.
    * Para EDDTable FromDapSequenceOPeNDAPServidores DRDS, isso deve ser definido como verdadeiro (o padrão) .
    * Para EDDTable FromDapSequence Servidores Dapper, isso deve ser definido como falso.
    * Um exemplo é:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT &gt;{#sourcecanconstrainstringgtlt} 
* Não. ** &lt;fonteCanConstrainStringGTLT&gt; ** ] (#sourcecanconstrainstringgtlt) é uma tag OPTIONAL dentro de uma tabela EDD&lt;dataset&gt; tag que especifica se a fonte pode restringir variáveis String com a&lt;,&lt;=, &gt; e &gt;= operadores.
    * Para EDDTableFromDapSequence, isso se aplica apenas às variáveis de sequência externa String. Assume-se que a fonte não pode lidar com quaisquer restrições em variáveis de sequência interna.
    * Os valores válidos são verdadeiros (o padrão) e falso.
    * Esta tag é OPTIONAL. O padrão é verdadeiro.
    * Para EDDTable FromDapSequenceOPeNDAPServidores DRDS, isso deve ser definido como verdadeiro (o padrão) .
    * Para EDDTable FromDapSequence Servidores Dapper, isso deve ser definido como falso.
    * Um exemplo é:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex &gt;{#sourcecanconstrainstringregex} 
* Não. ** &lt;fonteCanConstrainStringRegex&gt; ** ] (#sourcecanconstrainstrtrainregex) é uma tag OPTIONAL dentro de uma tabela EDD&lt;dataset&gt; tag que especifica se a fonte pode restringir variáveis String por expressões regulares, e se assim for, o que o operador é.
    * Os valores válidos são "=~" (oDAPpadrão) , "~=" (equivocadamente apoiado por muitosDAPservidores) ou " (indicando que a fonte não suporta expressões regulares) .
    * Esta tag é OPTIONAL. O padrão é ".
    * Para EDDTable FromDapSequenceOPeNDAPServidores DRDS, isso deve ser definido para "" (o padrão) .
    * Para EDDTable FromDapSequence Servidores Dapper, isso deve ser definido para "" (o padrão) .
    * Um exemplo é:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDoDistinct &gt;{#sourcecandodistinct} 
* Não. ** &lt;sourceCanDoDistinct&gt; ** ] (Tradução e Revisão:) é uma tag OPTIONAL dentro de uma EDDTableFromDatabase&lt;dataset&gt; tag que especifica se o banco de dados de origem deve lidar com &distinct () restrições em consultas de usuário.
    * Esta tag é OPTIONAL. Valores válidos não são (ERDDAP™manipula distinta; o padrão) , parcial (a fonte lida distinta eERDDAP™lida com ele novamente) e sim (a fonte lida distinta) .
    * Se você estiver usando não eERDDAP™está ficando sem memória quando manuseando distinto, use sim.
    * Se você estiver usando sim e o banco de dados de origem lida distinta muito lentamente, use não.
    * parcial dá-lhe o pior de ambos: é lento porque o tratamento de banco de dados de distinto é lento e pode ficar sem memória emERDDAP.
    * Bancos de dados interpretam DISTINCT como um pedido para apenas linhas únicas de resultados, enquantoERDDAP™interpreta-o como um pedido para uma lista ordenada de linhas únicas de resultados. Se você definir isso para parcial ou sim,ERDDAP™automaticamente também diz ao banco de dados para classificar os resultados.
    * Uma pequena diferença nos resultados:
Sem|parcial,ERDDAP™vai classificar "" no início dos resultados (antes de não-" cordas) .
Com sim, o banco de dados pode (Postgres vai) sort "" no final dos resultados (após strings não-") .
Vou adivinhar que isso também afetará a classificação de palavras curtas versus palavras mais longas que começam com a palavra curta. Por exemplo,ERDDAP™vai classificar "Simon" antes "Simons".
    * Um exemplo é:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrderBy &gt;{#sourcecanorderby} 
* Não. ** &lt;fonte CanOrderBy&gt; ** ] (#sourcecanorderby) é uma tag OPTIONAL dentro de uma EDDTableFromDatabase&lt;dataset&gt; tag que especifica se o banco de dados de origem deve lidar &orderBy (...) restrições em consultas de usuário.
    * Esta tag é OPTIONAL. Valores válidos não são (ERDDAP™cabosorderBy (...) ; o padrão) , parcial (a fonte lidaorderByeERDDAP™lida com ele novamente) e sim (a fonte lidaorderBy (...) ) .
    * Se você estiver usando não eERDDAP™está ficando sem memória ao lidarorderBy (...) Usa sim.
    * Se você estiver usando sim e o banco de dados de origem lidaorderBy (...) demasiado lentamente, use não.
    * parcial dá-lhe o pior de ambos: é lento porque o tratamento de banco de dados deorderBy (...) é lento e pode ficar sem memória emERDDAP.
    * Uma pequena diferença nos resultados:
Sem|parcial,ERDDAP™vai classificar "" no início dos resultados (antes de não-" cordas) .
Com sim, o banco de dados pode (Postgres vai) sort "" no final dos resultados (após strings não-") .
Isso também pode afetar a classificação de palavras curtas versus palavras mais longas que começam com a palavra curta. Por exemplo,ERDDAP™vai classificar "Simon" antes de "Simons", mas eu não tenho certeza sobre como um banco de dados irá classificá-los.
    * Um exemplo é:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* Não. ** &lt;fonteNeedsExpandedFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) é uma tag OPTIONAL dentro de uma tabela EDD&lt;dataset&gt; tag que especifica (verdadeiro (o padrão) ou falso) se a fonte precisa de ajuda com consultas com&lt;numérico Variável&lt;flutuantePointValue&gt; (e&#33;=, &gt;=,&lt;=). Por exemplo,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Para algumas fontes de dados, consultas numéricas envolvendo =,=,&lt;=, ou &gt;= pode não funcionar como desejado com números de ponto flutuante. Por exemplo, uma busca por longitude=220.2 pode falhar se o valor for armazenado como 220.20000000000001.
    * Este problema surge porque os números de ponto flutuante são[não representado exatamente dentro de computadores](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Se fonteNeedsExpandedFP\\_EQ é definido como verdadeiro (o padrão) ,ERDDAP™modifica as consultas enviadas para a fonte de dados para evitar esse problema. É sempre seguro e bom deixar este conjunto verdadeiro.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* Não. ** &lt;sourceUrl&gt; ** ] (#sourceurl) é uma tag comum dentro de um conjunto de dados global&lt;addAttributes&gt; tag que especifica a URL que é a fonte dos dados.
    * Um exemplo é:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (mas coloque tudo em uma linha) 
    * EmERDDAP™, todos os conjuntos de dados terão um "sourceUrl" nos atributos globais combinados que são mostrados aos usuários.
    * Para a maioria dos tipos de conjuntos de dados, esta tag é REQUIRED. Veja a descrição do tipo de conjunto de dados para descobrir se isso é REQUIREDO ou não.
    * Para alguns conjuntos de dados, o separado&lt;sourceUrl&gt; tag não é permitido. Em vez disso, você deve fornecer um "sourceUrl"[atributo global](#global-attributes), geralmente no global \\&gt;addAttributes&lt;. Se não houver URL de origem real (por exemplo, se os dados são armazenados em arquivos locais) , este atributo muitas vezes apenas tem um valor de placeholder, por exemplo,&lt;nome do att="name"&gt; (arquivos locais) &lt;/att&gt; .
    * Para a maioria dos conjuntos de dados, esta é a base da URL que é usada para solicitar dados. Por exemplo,DAPservidores, este é o URL para o qual .dods, .das, .dds, ou .html pode ser adicionado.
    * Desde entãodatasets.xmlé um arquivo XML, você MUST também codificar '&', '&lt;', e '&gt;' na URL como ' &amp;', '&lt;', e ' &gt;'.
    * Para a maioria dos tipos de conjuntos de dados,ERDDAP™adiciona o originalsourceUrl  (o "localSourceUrl" no código fonte) ao[atributos globais](#global-attributes)  (onde se torna o "publicSourceUrl" no código fonte) . Quando a fonte de dados é arquivos locais,ERDDAP™adicionasourceUrl= (arquivos locais) " aos atributos globais como precaução de segurança. Quando a fonte de dados é um banco de dados,ERDDAP™adicionasourceUrl= (base de dados) " aos atributos globais como precaução de segurança. Se alguns dos seus conjuntos de dados usarem não públicosourceUrl' (geralmente porque seu computador está em seu DMZ ou em uma LAN local) você pode usar [&lt;convertToPublicSourceUrl&gt;] (# Convert to publicsourceurl) tags para especificar como converter o localsourceUrls para o públicosourceUrlS.
    * AsourceUrlpode começar comhttp://,https://, ftp://, e talvez outros prefixos.httpsconexões ler e verificar o certificado digital da fonte para garantir que a fonte é quem eles dizem que são. Em casos raros, esta verificação pode falhar com o erro "javax.net.sl.SSLProtocolException: handshake alert: unrecognized\\_name". Isso é provavelmente devido ao nome de domínio no certificado que não corresponde ao nome de domínio que você está usando. Você pode e deve ler os detalhes dosourceUrl's certificado em seu navegador web, notavelmente, a lista de "DNS Name"s na seção "Subject Alternative Name".
        
Em alguns casos,sourceUrlvocê está usando pode ser um pseudônimo do nome de domínio no certificado. Por exemplo,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ vai lançar este erro, mas
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , que usa o nome de domínio no certificado, não vai. A solução nestes casos é, portanto, encontrar e usar o nome de domínio no certificado. Se não o encontrar no certificado, contacte o fornecedor de dados.
        
Em outros casos, o nome de domínio no certificado pode ser para um grupo de nomes. Se isso ocorrer ou o problema não for possível, por favor envie um e-mail para Chris. John noaa.gov para relatar o problema.
         

#### &lt;addAttributes&gt; {#addattributes} 
* Não. ** &lt;addAttributes&gt; ** ] (#addattributes) é uma tag OPTIONAL para cada conjunto de dados e para cada variável que permiteERDDAPOs administradores controlam os atributos de metadados associados a um conjunto de dados e suas variáveis.
    *   ERDDAP™combina os atributos da fonte do conjunto de dados ("fonteAttributes") e o "addAttributes"que você define emdatasets.xml  (que têm prioridade) para fazer o "combinedAttributes", que são o queERDDAP™os usuários veem. Assim, você pode usaraddAttributespara redefinir os valores do sourceAttributes, adicionar novos atributos ou remover atributos.
    * O&lt;addAttributes&gt; tag inclui 0 ou mais ** &lt;- Sim. ** subtags, que são usados para especificar atributos individuais.
    * Cada atributo consiste em um nome e um valor (que tem um tipo de dados específico, por exemplo, duplo) .
    * Pode haver apenas um atributo com um nome dado. Se houver mais, a última tem prioridade.
    * O valor pode ser um único valor ou uma lista separada do espaço de valores.
    * Sintaxe
        * A ordem do&lt;subtags att&gt; dentroaddAttributesnão é importante.
        * O&lt;formato de subtag att&gt; é
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * O nome de destino de todos os atributos DEVE começar com uma letra (A-Z, a-z) e DEVE conter apenas os caracteres A-Z, a-z, 0-9, ou '\\_'.
        * Se um&lt;subtag att&gt; não tem valor ou valor de null, esse atributo será removido dos atributos combinados.
Por exemplo,&lt;att name="rows" /&gt; irá remover linhas dos atributos combinados.
Por exemplo,&lt;int name= "coordenadas"&gt;null&lt;/att&gt; irá remover coordenadas dos atributos combinados.
##### atributos Tipo{#attributetype} 
* [O valor do tipo OPTIONAL para&lt;subtags att&gt;] (#attribuídotipo) indica o tipo de dados para os valores. O tipo padrão é String. Um exemplo de um atributo String é:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Tipos válidos para valores únicos são bytes (inteiro de 8 bits) , curto (inteiro assinado de 16 bits) , int (32-bit inscrito inteiro) , longo (Inteligente assinado de 64 bits) , flutuar (Ponto flutuante de 32 bits) , duplo (Ponto flutuante de 64 bits) Charlie e String. Por exemplo,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Veja estas notas sobre o[Tipo de dados de carvão](#char).
Veja estas notas sobre o[Tipo de dados longo](#long).
        
    * Tipos válidos para listas separadas por espaço de valores (ou valores únicos) são byteList, shortList, unsignedShortList, charList, intList, longList, floatList, double Lista. Por exemplo,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Um ShortList não assinado permite especificar uma lista de shorts não assinados, mas eles serão convertidos em uma lista dos caracteres Unicode correspondentes (por exemplo, "65 67 69" será convertido em "A C E".
Se você especificar um charList, codifique quaisquer caracteres especiais (por exemplo, espaço, citações duplas, backslash,&lt;#32, ou &gt;#127) como você os codificaria na seção de dados de um arquivo NCCSV (por exemplo, ", "\\" ou """, "\\\\\", "\\n", "\\u20ac") .
Não há nenhum cordelista. Armazene os valores String como um String multi-linha. Por exemplo,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Atributos globais{#global-attributes} 
* Não. ** Atributos globais / Global&lt;addAttributes&gt; ** ] (Atributos globais) - ...
    &lt;addAttributes&gt; é uma tag OPTIONAL dentro da&lt;dataset&gt; tag que é usado para alterar atributos que se aplicam a todo o conjunto de dados.
    
    *    ** Use o global&lt;addAttributes&gt; para alterar os atributos globais do conjunto de dados. ** ERDDAP™combina os atributos globais da fonte do conjunto de dados (** Atributos de fonte **) e global** addAttributes **que você define emdatasets.xml  (que têm prioridade) para fazer o global** Atributos combinados ** , que são o queERDDAP™os usuários veem. Assim, você pode usaraddAttributespara redefinir os valores do sourceAttributes, adicionar novos atributos ou remover atributos.
    * Veja o [ ** &lt;addAttributes&gt; **informação] (#addattributes) que se aplica a global e variável** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)e[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadados - ... Normalmente,ERDDAP™gerará automaticamente ISO 19115-2/19139 e FGDC (FGDC-STD-001-1998) Arquivos de metadados XML para cada conjunto de dados usando informações dos metadados do conjunto de dados. Então... **bons metadados de dataset leva a bomERDDAP-metadados ISO 19115 e FGDC. Por favor, considere colocar muito tempo e esforço para melhorar os metadados de seus conjuntos de dados (que é uma coisa boa a fazer de qualquer maneira) .** A maioria dos atributos de metadados de conjuntos de dados que são usados para gerar os metadados ISO 19115 e FGDC são do[Padrão de metadados ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)e são tão observados abaixo.
    * Muitos atributos globais são especiais nissoERDDAP™procura-los e usá-los de várias maneiras. Por exemplo, um link para oinfoUrlestá incluído em páginas web com listas de conjuntos de dados e outros lugares, para que os usuários possam descobrir mais sobre o conjunto de dados.
    * Quando um usuário seleciona um subconjunto de dados, globalAttributes relacionados à longitude da variável, latitude, altitude (ou profundidade) , e intervalos de tempo (por exemplo, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) são gerados ou atualizados automaticamente.
    * Uma amostra simples global&lt;addAttributes&gt; é:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
O atributo cwhdf\\_version vazio causa o atributo source cwhdf\\_version (se houver) para ser removido da lista final, combinada de atributos.
    * Fornecer esta informação ajudaERDDAP™fazer um trabalho melhor e ajuda os usuários a entender os conjuntos de dados.
Os bons metadados tornam um conjunto de dados utilizável.
Metadados insuficientes tornam um conjunto de dados inútil.
Por favor, tome o tempo para fazer um bom trabalho com atributos de metadados.
##### Atributos globais especiais emERDDAP™
###### reconhecimento{#acknowledgement} 
*   [ **reconhecimento** ](#acknowledgement)e **reconhecimento**   (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é uma maneira RECOMENDADA de reconhecer o grupo ou grupos que forneceram apoio (notavelmente, financeira) para o projeto que criou esses dados. Por exemplo,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Note que ACDD 1.0 e 1.1 usaram a ortografia "conhecimento" (que é a ortografia habitual nos EUA.) , mas ACDD 1.3 mudou isso para "conhecimento" (que é a ortografia habitual no Reino Unido.) . Minha compreensão é que a mudança foi essencialmente um acidente e que eles certamente não reconheceram as ramificações da mudança. Que confusão&#33; Agora existem milhões de arquivos de dados em todo o mundo que têm "conhecimento" e milhões que têm "conhecimento". Isso destaca a loucura das mudanças "simples" em um padrão, e enfatiza a necessidade de estabilidade em padrões. Porque ACDD 1.3 (que é a versão de ACDD queERDDAP™suportes) diz "conhecimento", é issoERDDAP™  (notavelmente Gerar conjuntos de dados Xml) encoraja.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)é apenas para conjuntos de dados EDDTable que não têm uma variável de altitude ou profundidade, mas têm uma variável que é um proxy para altitude ou profundidade (por exemplo, pressão, sigma, garrafaNumber) , você pode usar este atributo para identificar essa variável. Por exemplo,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Se o[cdm\\_data\\_type](#cdm_data_type)é Perfil ou TrajectoryProfile e não há nenhuma variável de altitude ou profundidade, cdm\\_altitude\\_proxy MUST ser definido. Se cdm\\_altitude\\_proxy for definido,ERDDAP™adicionará os seguintes metadados à variável: \\_Coordinate AxisType=Altura e eixo=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é um atributo global que indica oUnidata [Modelo de dados comum](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)tipo de dados para o conjunto de dados. Por exemplo,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
O CDM ainda está evoluindo e pode mudar novamente.ERDDAP™cumpre com os relacionados e mais detalhados[Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)capítulo do[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)convenções de metadados (anteriormente denominadas Convenções de Observação de Pontos CF) .
    * Ou o conjunto de dados global[Atributos de fonte](#global-attributes)ou seu global&lt;addAttributes&gt; MUST incluir o atributo cdm\\_data\\_type . Alguns tipos de conjunto de dados (como EDDTable De Obis) irá definir isso automaticamente.
    * ParaEDDGriddatasets, as opções cdm\\_data\\_type são Grid (o padrão e, de longe, o tipo mais comum paraEDDGridconjuntos de dados) , MovingGrid, Outro, Ponto, Perfil, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory e TrajectoryProfile. Atualmente,EDDGridnão requer que quaisquer metadados relacionados sejam especificados, nem verifica se os dados correspondem ao cdm\\_data\\_type. Isso provavelmente mudará no futuro próximo.
    * EDDTable usa cdm\\_data\\_type de uma forma rigorosa, seguindo a especificação DSG do CF em vez de CDM, que por alguma razão não foi atualizado para ser consistente com DSG. Se os metadados de um conjunto de dados não estiverem em conformidade com oERDDAP's cdm\\_data\\_type's requirements (ver abaixo) , o conjunto de dados falhará em carregar e gerará um[mensagem de erro](#troubleshooting-tips). (Isso é uma coisa boa, no sentido de que a mensagem de erro lhe dirá o que é errado para que você possa corrigi-lo.) E se os dados do conjunto de dados não corresponderem à configuração dos metadados do conjunto de dados (por exemplo, se houver mais de um valor de latitude para uma determinada estação em um conjunto de dados de séries de tempos) , alguns pedidos de dados retornarão dados incorretos na resposta. Por isso, certifica-te que percebes tudo isto.
        
Para todos esses conjuntos de dados, nas Convenções eMetadata\\_Conventionsatributos globais, consulte CF-1.6 (não CF-1.0, 1.1, 1.2, 1.3, 1.4 ou 1.5) , uma vez que CF-1.6 é a primeira versão a incluir as mudanças relacionadas à Geometria de Amostragem Discreta (DSG) convenções.
        *   **ERDDAP™tem uma relação não-simples com CF DSG** 
        *   ERDDAP™pode fazer um conjunto de dados DSG válido de um conjunto de dados de origem que já é um arquivo DSG válido (S) , ou fora de um conjunto de dados de origem que não é configurado para DSG, mas pode ser feito assim através de alterações de metadados (alguns dos quais sãoERDDAP- específica para fornecer uma abordagem mais geral para especificar a configuração do DSG) .
        *   ERDDAP™faz muitos testes de validade quando carrega um conjunto de dados. Se o conjunto de dados tiver um cdm\\_data\\_type (oufeatureType) atributos carregados com sucessoERDDAP™EntãoERDDAP™está dizendo que o conjunto de dados atende aos requisitos do DSG (caso contrário,ERDDAP™vai lançar uma exceção explicando o primeiro problema que encontrou) .
ATENÇÃO: Um conjunto de dados carregado com sucesso parece atender aos requisitos do DSG (tem a combinação certa de atributos) , mas ainda pode ser incorretamente configurado, levando a resultados incorretos.ncCF e.ncArquivos de resposta CFMA. (O software é inteligente de algumas maneiras e sem pistas em outros.) 
        * Quando você olha para os metadados do conjunto de dados emERDDAP™, o conjunto de dados DSG parece estar dentroERDDAPO formato interno (uma mesa gigante, semelhante a banco de dados) . Não está em um dos formatos DSG (por exemplo, as dimensões e os metadados não estão certos) , mas as informações necessárias para tratar o conjunto de dados como um conjunto de dados DSG estão nos metadados (por exemplo, cdm\\_data\\_type=TimeSeries e cdm\\_timeseries\\_variables= *aCsvListOfStationRelatedVarables* nos metadados globais e cf\\_role=timeseries\\_id para alguma variável) .
        * Se um usuário solicitar um subconjunto do conjunto de dados em um.ncCF (um.ncarquivo no formato de arquivo Contiguous Ragged Array da DSG) ou.ncArquivo CFMA (um.ncarquivo no formato de arquivo Multidimensional Array da DSG) , esse arquivo será um arquivo CF DSG válido.
ATENÇÃO: No entanto, se o conjunto de dados foi configurado incorretamente (para que as promessas feitas pelos metadados não sejam verdadeiras) , então o arquivo de resposta será tecnicamente válido, mas será incorreta de alguma forma.
             
###### EDDTable cdm_data_types
* Para conjuntos de dados EDDTable, as opções cdm\\_data\\_type (e requisitos relacionados emERDDAP) são
###### Ponto{#point} 
*   [Ponto](#point)-- é para um conjunto de medidas tomadas em horários e locais não relacionados.
    * Tal como acontece com todos os cdm\\_data\\_types que não sejam Outros, os conjuntos de dados de ponto MUST têm variáveis de longitude, latitude e tempo.
###### Perfil{#profile} 
*   [Perfil](#profile)-- é um conjunto de medidas todas tomadas ao mesmo tempo, em um local de longitude de latitude, mas em mais de uma profundidade (ou altitude) . O conjunto de dados pode ser uma coleção desses perfis, por exemplo, 7 perfis de diferentes locais. Este cdm\\_data\\_type não implica qualquer conexão lógica entre qualquer um dos perfis.
    
* Uma das variáveis (por exemplo, profile\\_number) MUST ter o atributo variável cf\\_role=profile\\_id para identificar a variável que identifica exclusivamente os perfis.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Se nenhuma outra variável for adequada, considere usar a variável tempo.
###### cdm\\_profile\\_variáveis{#cdm_profile_variables} 
* O conjunto de dados DEVE incluir o globalAttribute[cdm\\_profile\\_variáveis](#cdm_profile_variables), onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada perfil. Para um determinado perfil, os valores dessas variáveis devem ser constantes. Por exemplo,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
A lista DEVE incluir a variável cf\\_role=profile\\_id e todas as outras variáveis com informações sobre o perfil e tempo, latitude e longitude.
A lista nunca incluirá altitude, profundidade ou quaisquer variáveis de observação.
     

\\[Opinião: cdm\\_data\\_type=Profile raramente deve ser usado. Na prática, um dado conjunto de dados é geralmente ou um TimeSeriesProfile (perfis em posição fixa) ou um TrajectoryProfile (perfis ao longo de uma trajetória) , e assim deve ser devidamente identificado como tal.\\]  
###### Série de Tempo{#timeseries} 
*   [Série de Tempo](#timeseries)-- é uma sequência de medições (por exemplo, temperatura da água do mar) tomado em um, fixo, latitude, longitude, profundidade (ou altitude) localização. (Pense nisso como "estação".) O conjunto de dados pode ser uma coleção destes TimeSeries, por exemplo, uma sequência de cada um de 3 locais diferentes.
    * Uma das variáveis (por exemplo, station\\_id) MUST ter o atributo variável cf\\_role=timeseries\\_id para identificar a variável que identifica exclusivamente as estações.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* O conjunto de dados DEVE incluir o globalAttribute[cdm\\_timeseries\\_variables](#cdm_timeseries_variables), onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada estação. Para uma determinada estação, os valores dessas variáveis devem ser constantes. Por exemplo,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
A lista DEVE incluir a variável cf\\_role=timeseries\\_id e todas as outras variáveis com informações sobre a estação, que quase sempre inclui latitude e longitude (e altitude ou profundidade, se presente) .
A lista nunca incluirá tempo ou quaisquer variáveis de observação.
* Para alguns buoys amarrados, um conjunto de dados pode ter dois conjuntos de variáveis de latitude e longitude:
    1. Um par de valores de latitude e longitude constantes (i.e., a localização fixa da amarração) . EmERDDAP™, dar estas variáveisdestinationNames de latitude e longitude, e incluem essas variáveis na lista de cdm\\_timeseries\\_variables.
    2. Valores de latitude e longitude precisos associados a cada observação. EmERDDAP™, dar estas variáveis diferentesdestinationNameS (por exemplo, precisoLat e preciso Lon) e não inclua essas variáveis na lista de cdm\\_timeseries\\_variables.
O raciocínio para isso é: de uma perspectiva teórica, para um conjunto de dados DSG TimeSeries, a latitude e longitude (e altitude ou profundidade, se presente) localização da estação Deve ser constante.
###### TempoSeriesProfile{#timeseriesprofile} 
*   [TempoSeriesProfile](#timeseriesprofile)-- é para uma sequência de perfis tomados em um, fixo, localização longitude de latitude. Cada perfil é um conjunto de medidas tomadas em múltiplas altitudes ou profundidades. O conjunto de dados pode ser uma coleção destes TimeSeriesProfiles, por exemplo, uma sequência de perfis tomados em cada um dos 12 locais diferentes.
    * Uma das variáveis (por exemplo, station\\_id) MUST ter o atributo variável cf\\_role=timeseries\\_id para identificar a variável que identifica exclusivamente as estações.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Uma das variáveis (por exemplo, profile\\_number) MUST ter o atributo variável cf\\_role=profile\\_id para identificar a variável que identifica exclusivamente os perfis.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Um determinado perfil\\_id só tem de ser único para uma série dada\\_id.) Se nenhuma outra variável for adequada, considere usar a variável tempo.
    * O conjunto de dados DEVE incluir o globalAttribute cdm\\_timeseries\\_variables, onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada estação. Para uma determinada estação, os valores dessas variáveis devem ser constantes. Por exemplo,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
A lista DEVE incluir a variável cf\\_role=timeseries\\_id e todas as outras variáveis com informações sobre a estação, que quase sempre inclui latitude e longitude.
A lista nunca incluirá tempo, altitude, profundidade ou quaisquer variáveis de observação.
    * O conjunto de dados DEVE incluir o globalAttribute cdm\\_profile\\_variables, onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada perfil. Para um determinado perfil, os valores dessas variáveis devem ser constantes. Por exemplo,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
A lista DEVE incluir a variável cf\\_role=profile\\_id e todas as outras variáveis com informações sobre o perfil, que quase sempre inclui tempo.
A lista nunca incluirá latitude, longitude, altitude, profundidade ou quaisquer variáveis de observação.
###### Trajeto{#trajectory} 
*   [Trajeto](#trajectory)-- é uma sequência de medidas tomadas ao longo de uma trajetória (um caminho através do espaço e do tempo)   (e.g., mar\\_water\\_temperature tomado por um navio como ele se move através da água) . O conjunto de dados pode ser uma coleção destes Trajetórios, por exemplo, uma sequência de cada um de quatro navios diferentes.
    * Uma das variáveis (por exemplo, ship\\_id) MUST ter o atributo cf\\_role=trajectory\\_id para identificar a variável que identifica exclusivamente as trajetórias.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* O conjunto de dados DEVE incluir o globalAttribute[cdm\\_trajectory\\_variables](#cdm_trajectory_variables), onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada trajetória. Para uma determinada trajetória, os valores dessas variáveis devem ser constantes. Por exemplo,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
A lista DEVE incluir a variável cf\\_role=trajectory\\_id e todas as outras variáveis com informações sobre a trajetória.
A lista nunca incluirá tempo, latitude, longitude ou quaisquer variáveis de observação.
###### TrajetoProjecto{#trajectoryprofile} 
*   [TrajetoProjecto](#trajectoryprofile)-- é uma sequência de perfis levados ao longo de uma trajetória. O conjunto de dados pode ser uma coleção destes TrajectoryProfiles, por exemplo, uma sequência de perfis tomados por 14 navios diferentes.
    * Uma das variáveis (por exemplo, ship\\_id) MUST ter o atributo variável cf\\_role=trajectory\\_id para identificar a variável que identifica de forma única as trajetórias.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Uma das variáveis (por exemplo, profile\\_number) MUST ter o atributo variável cf\\_role=profile\\_id para identificar a variável que identifica exclusivamente os perfis.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Um determinado perfil\\_id só tem de ser único para uma determinada trajetória\\_id.) Se nenhuma outra variável for adequada, considere usar a variável tempo.
    * O conjunto de dados DEVE incluir o globalAttribute cdm\\_trajectory\\_variables, onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada trajetória. Para uma determinada trajetória, os valores dessas variáveis devem ser constantes. Por exemplo,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
A lista DEVE incluir a variável cf\\_role=trajectory\\_id e todas as outras variáveis com informações sobre a trajetória.
A lista nunca incluirá variáveis relacionadas ao perfil, tempo, latitude, longitude ou quaisquer variáveis de observação.
    * O conjunto de dados DEVE incluir o globalAttribute cdm\\_profile\\_variables, onde o valor é uma lista separada por vírgula das variáveis que têm a informação sobre cada perfil. Para um determinado perfil, os valores dessas variáveis devem ser constantes. Por exemplo,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
A lista DEVE incluir a variável cf\\_role=profile\\_id e todas as outras variáveis com informações sobre o perfil, que quase sempre inclui tempo, latitude e longitude.
A lista nunca incluirá altitude, profundidade ou quaisquer variáveis de observação.
###### Outros{#other} 
*   [Outros](#other)-- não tem requisitos. Use-o se o conjunto de dados não se encaixar em uma das outras opções, notavelmente, se o conjunto de dados não incluir variáveis de latitude, longitude e tempo.
     
###### Notas relacionadas{#related-notes} 
* Todos os conjuntos de dados EDDTable com um cdm\\_data\\_type diferente do "Outro" DEVE ter variáveis de longitude, latitude e tempo.
* Conjuntos de dados com perfis DEVE ter uma variável de altitude, uma variável de profundidade ou uma[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)variável.
* Se você não pode fazer um conjunto de dados cumprir com todos os requisitos para o ideal cdm\\_data\\_type, use "Point" (que tem poucos requisitos) ou "Outro" (que não tem requisitos) Em vez disso.
* Esta informação é utilizada porERDDAP™de várias maneiras, por exemplo, mas principalmente para fazer.ncArquivos CF (.ncarquivos que estão em conformidade com as Representações Ragged Array Contiguous associadas ao conjunto de dados cdm\\_data\\_type) e.ncArquivos CFMA (.ncarquivos que estão em conformidade com as Representações Multidimensionais de Array associadas ao conjunto de dados cdm\\_data\\_type) como definido em[Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)capítulo do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)convenções de metadados, que foram anteriormente nomeadas "Convenções de Observação de Pontos CCF".
* Dica: Para esses conjuntos de dados, a configuração correta para[subsetVariables](#subsetvariables)é geralmente a combinação de todas as variáveis listadas nos atributos cdm\\_...\\_variables. Por exemplo, para TimeSeriesProfile, use o cdm\\_timeseries\\_variables mais o cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar uma pessoa, organização ou projeto que contribuiu para este conjunto de dados (por exemplo, o criador original dos dados, antes de ser reprocessado pelo criador deste conjunto de dados) . Por exemplo,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Se "contributor" realmente não se aplica a um conjunto de dados, omitir este atributo. Comparado a[creator\\_name](#creator_name), isto às vezes é mais focado na fonte de financiamento.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar o papel de[contributor\\_name](#creator_name). Por exemplo,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Se "contributor" realmente não se aplica a um conjunto de dados, omitir este atributo.
###### Convenções{#conventions} 
*   [ **Convenções** ](#conventions)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)padrão de metadados) está firmemente recomendado. (Pode ser REQUIREDO no futuro.) O valor é uma lista separada por vírgula de padrões de metadados que este conjunto de dados segue. Por exemplo:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
As convenções comuns de metadados utilizadas emERDDAP™são:
    
    *   [COARDSConvenções](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)é o precursor da CF.
    *   [Clima e previsão (CF) Convenções](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)é a fonte de muitos dos atributos recomendados e exigidos emERDDAP. A versão atual do CF é identificada como "CF-1.6".
    * ONetCDFAtribua a Convenção para o Descobrimento de Dados (ACÓRDÃO) é a fonte de muitos dos atributos recomendados e exigidos emERDDAP. A versão original 1.0 de ACDD (um trabalho brilhante por Ethan Davis) , foi identificado como[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)A corrente (a partir de 2015) 1.3 versão do ACDD é identificada como[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Se seus conjuntos de dados estiverem usandoUnidataDataset Discovery v1.0, nós encorajamos você a[mudar seus conjuntos de dados para usar ACDD-1.3](#switch-to-acdd-13).
    
Se o seu conjunto de dados seguir algum padrão de metadados adicional, adicione o nome à lista CSV no atributo Conventions.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (do[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)padrão de metadados) é a maneira RECOMENDADA de identificar o tipo de dados gradeados (emEDDGridconjuntos de dados) . Por exemplo,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Os únicos valores permitidos são auxiliarInformação, imagem, modeloResulto, físico Medição (o padrão quando os metadados ISO 19115 são gerados) , qualidadeInformação, referênciaInformação e temáticaClassificação. (Não use esta tag para conjuntos de dados EDDTable.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar a pessoa, organização ou projeto (se não uma pessoa ou organização específica) , mais responsável pela criação (ou reprocessamento mais recente) destes dados. Por exemplo,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Se os dados foram amplamente reprocessados (por exemplo, dados de satélite do nível 2 ao nível 3 ou 4) , então geralmente o reprocessador é listado como o criador e o criador original é listado via[contributor\\_name](#contributor_name). Comparado a[projeto](#project), isso é mais flexível, uma vez que pode identificar uma pessoa, uma organização ou um projeto.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar um endereço de email (formatado corretamente) que fornece uma maneira de entrar em contato com o criador. Por exemplo,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar uma URL para a organização que criou o conjunto de dados, ou uma URL com as informações do criador sobre este conjunto de dados (mas esse é mais o propósito de[infoUrl](#infourl)) . Por exemplo,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar a data em que os dados foram criados pela primeira vez (por exemplo, processado neste formulário) , em formato ISO 8601. Por exemplo,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Se os dados forem periodicamente adicionados ao conjunto de dados, esta é a primeira data que os dados originais foram disponibilizados.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar a data em que os dados foram modificados pela última vez (por exemplo, quando um erro foi corrigido ou quando os dados mais recentes foram adicionados) , em formato ISO 8601. Por exemplo,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar a data em que os dados foram disponibilizados pela primeira vez para outros, no formato ISO 8601, por exemplo, 2012-03-15. Por exemplo,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Por exemplo, o conjunto de dados pode ter um[date\\_created](#date_created)de 2010-01-30, mas só foi disponibilizado publicamente 2010-07-30.date\\_issuedé menos comumente usado do quedate\\_creatededate\\_modified. Sedate\\_issuedé omitido, presume-se que é o mesmo que odate\\_created.
###### global globaldrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)- ... Este é um atributo global OPTIONAL usado porERDDAP™  (e sem padrões de metadados) que especifica o valor padrão para a opção "Draw Land Mask" no formulário Make A Graph do conjunto de dados ( *datasetID* .) e para o parâmetro &.land em uma URL solicitando um mapa dos dados. Por exemplo,
    ```
    <att name="drawLandMask">over</att>  
    ```
Ver[drawLandMaskVisão geral](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)padrão de metadados) é IGNORADO e/ou REPLACADO. Se o conjunto de dados[cdm\\_data\\_type](#cdm_data_type)é apropriado,ERDDAP™irá usá-lo automaticamente para criar umfeatureTypeatributo. Então não há necessidade de você adicioná-lo.
    
No entanto, se você estiver usando[EDDTable FromNcCFFiles](#eddtablefromnccffiles)para criar um conjunto de dados de arquivos que seguem[CF Geometrias de amostragem discretas (DSG) padrão](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), os próprios arquivos devem terfeatureTypecorretamente definido, de modo queERDDAP™pode ler os arquivos corretamente. Isso faz parte dos requisitos CF DSG para esse tipo de arquivo.
     
###### história{#history} 
*   [ **história** ](#history)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrões de metadados) é um atributo global String multi-linha RECOMENDADO com uma linha para cada etapa de processamento que os dados sofreram. Por exemplo,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealmente, cada linha tem um ISO 8601:2004 (E) data de formatação+timeZ (por exemplo, 2011-08-05T08:55:02Z) seguido por uma descrição da etapa de processamento.
    *   ERDDAP™cria isso se não existir já.
    * Se já existe,ERDDAP™irá anexar novas informações às informações existentes.
    * A história é importante porque permite que os clientes voltem à fonte original dos dados.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)é um atributo global REQUIRED com a URL de uma página web com mais informações sobre este conjunto de dados (geralmente no site da instituição de origem) . Por exemplo,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Ou o conjunto de dados global[Atributos de fonte](#global-attributes)ou seu global&lt;addAttributes&gt; Deve incluir este atributo.
    *   infoUrlé importante porque permite aos clientes descobrir mais sobre os dados da fonte original.
    *   ERDDAP™exibe um link para oinfoUrlno formulário de acesso de dados ( *datasetID* .html) , Faça uma página web gráfico ( *datasetID* .) , e outras páginas da web.
    * Se a URL tiver uma parte de consulta (depois do "?) , deve ser já[por cento codificado](https://en.wikipedia.org/wiki/Percent-encoding). Você precisa codificar caracteres especiais nas restrições (diferente do inicial '&' e o principal'=', se houver) na forma %HH, onde HH é o valor hexadecimal de 2 dígitos do personagem. Normalmente, você só precisa converter alguns dos caracteres de pontuação: % em %25, & em %26, " em %22,&lt;em %3C, = em %3D, &gt; em %3E, + em %2B,|em %7C,\\[em %5B,\\]em %5D, espaço em %20, e converter todos os caracteres acima #127 em sua forma UTF-8 e, em seguida, por cento codificar cada byte da forma UTF-8 no formato %HH (pedir ajuda a um programador) .
Por exemplo, &stationID&gt; = 41004
torna-se &amp; nbsp;stationID%3E =%2241004%22
A codificação por cento é geralmente necessária quando você acessaERDDAPvia software diferente de um navegador. Os navegadores geralmente lidam com a codificação por cento para você.
Em algumas situações, você precisa codificar por cento todos os caracteres que não A-Za-z0-9\\_-&#33;.~ ' () \\*, mas ainda não codifica a inicial '&' ou a principal'='.
Linguagens de programação têm ferramentas para fazer isso (por exemplo, verJava'[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
eJavaO script é [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) e há
        [sites que por cento codificar / decodificar para você](https://www.url-encode-decode.com/).
    * Desde entãodatasets.xmlé um arquivo XML, você MUST também &-encode ALL '&', '&lt;', e '&gt;' na URL como ' &amp;', '&lt;', and '&gt;' after percent encoding.
    *   infoUrlé únicoERDDAP. Não é de nenhum padrão de metadados.
###### instituição{#institution} 
*   [ **instituição** ](#institution)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrões de metadados) é um atributo global REQUIRED com a versão curta do nome da instituição que é a fonte desses dados (geralmente uma sigla, geralmente&lt;20 caracteres). Por exemplo,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Ou o conjunto de dados global[Atributos de fonte](#global-attributes)ou seu global&lt;addAttributes&gt; Deve incluir este atributo.
    *   ERDDAP™exibe a instituição sempre que exibe uma lista de conjuntos de dados. Se o nome de uma instituição aqui é mais de 20 caracteres, apenas os primeiros 20 caracteres serão visíveis na lista de conjuntos de dados (mas toda a instituição pode ser visto colocando o cursor do mouse sobre o ícone "?" adjacente) .
    * Se você adicionar instituição à lista de&lt;categoryAttributes&gt; emERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo, os usuários podem facilmente encontrar conjuntos de dados da mesma instituição viaERDDAP"Search for Datasets by Category" na página inicial.
###### palavras-chave{#keywords} 
*   [ **palavras-chave** ](#keywords)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é uma lista separada por vírgulas RECOMENDADA de palavras e frases curtas (por exemplo,[GCMD Palavras-chave da ciência](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) que descrevem o conjunto de dados de uma forma geral, e não assumindo qualquer outro conhecimento do conjunto de dados (por exemplo, para dados oceânicos, incluem o oceano) . Por exemplo,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Desde entãodatasets.xmlé um documento XML, os caracteres &,&lt;e &gt; em um atributo como palavras-chave (por exemplo, os caracteres &gt; nas palavras-chave da ciência do GCMD) deve ser codificado como &amp;,&lt;, e &gt;, respectivamente.
Quando um conjunto de dados é carregadoERDDAP,
    
    * "Earth Science &gt; " é adicionado ao início de qualquer palavra-chave GCMD que não tem.
    * As palavras-chave GCMD são convertidas em Title Case (ou seja, as primeiras letras são capitalizadas) .
    * As palavras-chave são reorganizadas em ordem ordenada e quaisquer caracteres de linha nova são removidos.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é um atributo RECOMENDADO: se você estiver seguindo uma diretriz para as palavras/frases em suas palavras-chave atributo (por exemplo, GCMD Science Keywords) , coloque o nome dessa diretriz aqui. Por exemplo,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licença{#license} 
*   [ **licença** ](#license)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é um atributo global STRONGLY RECOMENDED com as restrições de licença e/ou uso. Por exemplo,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Se...\\[padrão\\]" ocorre no valor do atributo, ele será substituído pelo padrãoERDDAP™licença da&lt;padrãoLicense&gt; tag inERDDAP'
        \\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheiro.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)é desatualizado[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (que foi identificado emMetadata\\_Conventionscomo "UnidataDataset Discovery v1.0") padrão de metadados. O valor do atributo foi uma lista separada por vírgula de convenções de metadados usadas por este conjunto de dados.
Se um conjunto de dados usa ACDD 1.0, este atributo é STRONGLY RECOMENDED, por exemplo,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
Mas...ERDDAP™agora recomenda ACDD-1.3. Se tiveres[alterne seus conjuntos de dados para usar ACDD-1.3](#switch-to-acdd-13), uso deMetadata\\_Conventionsé STRONGLY DISCOURAGED: basta usar [&lt;Convenções&gt;] (#convenções) Em vez disso.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é uma descrição textual RECOMENDADA do processamento (por exemplo,[Níveis de processamento de dados por satélite da NASA](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), por exemplo, Nível 3) ou nível de controle de qualidade (por exemplo, Qualidade da Ciência) dos dados. Por exemplo,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### projeto{#project} 
*   [ **projeto** ](#project)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é um atributo OPTIONAL para identificar o projeto que o conjunto de dados faz parte. Por exemplo,
    ```
    <att name="project">GTSPP</att>  
    ```
Se o conjunto de dados não faz parte de um projeto, não use esse atributo. Comparado a[creator\\_name](#creator_name), isto está focado no projeto (não uma pessoa ou uma organização, que pode estar envolvida em vários projetos) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar a pessoa, organização ou projeto que está publicando este conjunto de dados. Por exemplo,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Por exemplo, você é o editor se outra pessoa ou grupo[criado](#creator_name)o conjunto de dados e você está apenas reservá-lo viaERDDAP. Se "publicador" realmente não se aplica a um conjunto de dados, omitir este atributo. Comparado a[creator\\_name](#creator_name), o editor provavelmente não modificou significativamente ou reprocessou os dados; o editor está apenas disponibilizando os dados em um novo local.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar um endereço de email (formatado corretamente, por exemplo, john\\_smith@great.org) que fornece uma maneira de entrar em contato com o editor. Por exemplo,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Se "publicador" realmente não se aplica a um conjunto de dados, omitir este atributo.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é a maneira RECOMENDADA de identificar uma URL para a organização que publicou o conjunto de dados, ou uma URL com as informações do editor sobre este conjunto de dados (mas esse é mais o propósito de[infoUrl](#infourl)) . Por exemplo,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Se "publicador" realmente não se aplica a um conjunto de dados, omitir este atributo.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)é um atributo global String (não de qualquer padrão) indicando se este é um conjunto de dados em tempo real. Por exemplo,
    ```
    <att name="real\\_time">true</att>  
    ```
Se isto é falso (o padrão) ,ERDDAP™irá armazenar respostas a pedidos de tipos de arquivos onde todo o arquivo deve ser criado antesERDDAP™pode começar a enviar a resposta ao usuário e reutilizá-los por até cerca de 15 minutos (por exemplo,.nc, .png) .
Se isto for verdade,ERDDAP™nunca irá armazenar os arquivos de resposta e sempre retornará arquivos recém-criados.
###### sourceUrlatributos{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)é um atributo global com a URL da fonte dos dados. Por exemplo,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (mas coloque tudo em uma linha) 
    *   ERDDAP™geralmente cria esse atributo global automaticamente. Duas exceções são EDDTableDeHyraxArquivos e EDDTableDeThreddsFiles.
    * Se a fonte é arquivos locais e os arquivos foram criados por sua organização, use
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Se a fonte é banco de dados local e os dados foram criados por sua organização, use
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlé importante porque permite que os clientes sigam para a fonte original dos dados.
    *   sourceUrlé únicoERDDAP. Não é de nenhum padrão de metadados.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (do[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) é um atributo RECOMENDADO para identificar o nome do vocabulário controlado de que variável[standard\\_name](#standard_name)são levados. Por exemplo,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
para a versão 77 do[Tabela de nomes padrão CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (apenas para conjuntos de dados EDDTable) é um atributo global RECOMENDADO que permite especificar uma lista separada por vírgula de [&lt;dataVariable&gt; (#datavariable)  [destinationName](#destinationname)s para identificar variáveis que tenham um número limitado de valores (declarada de outra forma: variáveis para as quais cada um dos valores tem muitas duplicatas) . Por exemplo,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Se este atributo estiver presente, o conjunto de dados terá um *datasetID* Página web .subset (e um link para ele em cada lista de conjuntos de dados) que permite aos usuários selecionar rapidamente e facilmente vários subconjuntos dos dados.
    * Cada vez que um conjunto de dados é carregado,ERDDAPcargas e lojas no disco uma tabela com todos os distintos () combinações do subconjunto Valores da variável.ERDDAP™pode ler quesubsetVariablestabela e processá-lo muito rapidamente (especialmente em comparação com a leitura de muitos arquivos de dados ou obtenção de dados de um banco de dados ou outro serviço externo) .
    * Isso permiteERDDAP™para fazer 3 coisas:
        1. PermiteERDDAP™para colocar uma lista de valores possíveis em uma lista suspensa no formulário de acesso de dados, Faça uma página web do gráfico e .subset páginas da web.
        2. PermiteERDDAP™para oferecer uma página web .subset para esse conjunto de dados. Essa página é interessante porque torna fácil encontrar combinações válidas dos valores dessas variáveis, que para alguns conjuntos de dados e algumas variáveis é muito, muito difícil (quase impossível) . Então, todos os pedidos de usuário para distinto () subconjunto Os dados variáveis serão muito rápidos.
        3. Se houver uma solicitação de usuário que se refere apenas a um subconjunto dessas variáveis,ERDDAP™pode ler rapidamente osubsetVariablestabela e responder ao pedido. Isso pode economizar muito tempo e esforço paraERDDAP.
    * A ordem dodestinationNames você especificar determina a ordem de classificação no *datasetID* .subset página web, então você geralmente especificará as variáveis mais importantes primeiro, então o menos importante. Por exemplo, para conjuntos de dados com dados de série de tempo para várias estações, você pode usar, por exemplo,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
para que os valores sejam classificados pela estação\\_id.
    * Obviamente, é sua escolha que as variáveis a incluir nosubsetVariableslista, mas o uso sugerido é:
        
Em geral, inclua variáveis para as quais você desejaERDDAP™para exibir uma lista suspensa de opções no formulário de acesso de dados do conjunto de dados (.html) e Make-A-Graph (.) páginas da web.
        
Em geral, inclua variáveis com informações sobre os recursos do conjunto de dados (as estações, perfis e/ou trajetórias, nomeadamente[cdm\\_timeseries\\_variables](#cdm_timeseries_variables),[cdm\\_profile\\_variáveis](#cdm_profile_variables),[cdm\\_trajectory\\_variables](#cdm_trajectory_variables)) . Existem apenas alguns valores diferentes para essas variáveis para que elas funcionem bem com listas suspensas.
        
Nunca inclua quaisquer variáveis de dados associadas a observações individuais (por exemplo, tempo, temperatura, salinidade, velocidade atual) nosubsetVariableslista. Há muitos valores diferentes para essas variáveis, então uma lista suspensa seria lenta para carregar e ser difícil de trabalhar com (ou não trabalhar) .
        
    * Se o número de combinações distintas dessas variáveis for maior que cerca de 1.000.000, você deve considerar restringir osubsetVariablesque você especificar para reduzir o número de combinações distintas para abaixo de 1.000.000; caso contrário, o *datasetID* . páginas web subdefinidas podem ser geradas lentamente. Em casos extremos, o conjunto de dados não pode ser carregadoERDDAP™porque gerar a lista de combinações distintas usa muita memória. Se assim for, você deve remover algumas variáveis dosubsetVariableslista.
    * Se o número de valores distintos de qualquer variável subconjunto for maior que cerca de 20.000, você deve considerar não incluir essa variável na lista de valores distintos de qualquer variável subconjunto.subsetVariables; caso contrário, demora muito tempo para transmitir o *datasetID* .subset, *datasetID* .graph, e *datasetID* .html páginas web. Além disso, em um Mac, é muito difícil fazer seleções de uma lista suspensa com mais de 500 itens por causa da falta de uma barra de rolagem. Um compromisso é: remover variáveis da lista quando os usuários não são propensos a selecionar valores de uma lista suspensa.
    * Você deve testar cada conjunto de dados para ver se osubsetVariablesA configuração está bem. Se o servidor de dados de origem é lento e demora muito (ou falha) para baixar os dados, ou reduzir o número de variáveis especificadas ou remover osubsetVariablesatributo global.
    * Subconjunto Variáveis é muito útil. Então, se seu conjunto de dados é adequado, por favor crie umsubsetVariablesatributo.
    * Tabela de EDDSOSadiciona automaticamente
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
quando o conjunto de dados é criado.
        * Possível aviso: se um usuário usar o *datasetID* .subset página web seleciona um valor que tem um carruagemReturn ou caráter newline, *datasetID* .subset falhará.ERDDAP™não pode funcionar em torno deste problema por causa de alguns detalhes HTML. Em qualquer caso, é quase sempre uma boa ideia remover o carruagemReturn e caracteres de linha nova dos dados. Para ajudá-lo a corrigir o problema, se a Tabela EDD.subsetVariablesMétodo de tabela de dados emERDDAPdetecta valores de dados que causarão problemas, ele enviará um aviso com uma lista de valores ofendidos para o e-mail Tudo Para endereços de e-mail especificados no setup.xml. Assim, você sabe o que precisa ser corrigido.
        *    **Mesas subconjuntas pré-geradas.** Normalmente, quandoERDDAP™carrega um conjunto de dados, ele solicita o distinto () tabela de dados de variáveis subdefinidas da fonte de dados, apenas através de uma solicitação de dados normal. Em alguns casos, esses dados não estão disponíveis a partir da fonte de dados ou a recuperação da fonte de dados pode ser difícil no servidor de origem de dados. Se assim for, você pode fornecer uma tabela com as informações em uma.jsonou arquivo .csv com o nome *Toca a brincar.* /content/erddap/subset/ *datasetID* .json  (ou .csv) . Se presente,ERDDAP™irá lê-lo uma vez quando o conjunto de dados é carregado e usá-lo como fonte dos dados subconjuntos.
            * Se houver um erro ao lê-lo, o conjunto de dados não será carregado.
            * Deve ter os mesmos nomes de colunas (por exemplo, o mesmo caso) como&lt;subsetVariables&gt;, mas as colunas MAY estar em qualquer ordem.
            * Tem colunas extras (eles serão removidos e as linhas redundantes serão removidas) .
            * Valores perdidos devem estar faltando valores (não números falsos como -99) .
            *   .jsonarquivos podem ser um pouco mais difíceis de criar, mas lidar com personagens Unicode bem..jsonarquivos são fáceis de criar se você criá-los comERDDAP.
            * arquivos .csv são fáceis de trabalhar com, mas adequados apenas para caracteres ISO 8859-1. Arquivos .csv DEVE ter nomes de colunas na primeira linha e dados em linhas subseqüentes.
        * Para grandes conjuntos de dados ou quando&lt;subsetVariables&gt; é misconfigured, a tabela de combinações de valores pode ser grande o suficiente para causar erros Too Much Data ou OutOfMemory. A solução é remover variáveis da lista de&lt;subsetVariables&gt; para os quais há um grande número de valores, ou remover variáveis conforme necessário até que o tamanho dessa tabela seja razoável. Independentemente do erro, as partes deERDDAP™que use osubsetVariablessistema não funciona bem (por exemplo, páginas web carregam muito lentamente) quando há muitas linhas (por exemplo, mais de um milhão) naquela mesa.
        *   subsetVariablesnão tem nada a ver com especificar quais variáveis os usuários podem usar em restrições, ou seja, como os usuários podem solicitar subconjuntos do conjunto de dados.ERDDAP™sempre permite que restrições se referem a qualquer uma das variáveis.
###### Unidades do tempo{#time-units} 
[Tempo e timestamp](#time-units)colunas devem ter ISO 8601:2004 (E) data formatada + hora Cordas Z (por exemplo, 1985-01-31T15:31:00Z) .
             
###### resumo{#summary} 
*   [ **resumo** ](#summary)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrões de metadados) é um atributo global REQUIRED com uma longa descrição do conjunto de dados (geralmente&lt;500 caracteres). Por exemplo,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Ou o conjunto de dados global[Atributos de fonte](#global-attributes)ou seu global&lt;addAttributes&gt; Deve incluir este atributo.
    * resumo é muito importante porque permite aos clientes ler uma descrição do conjunto de dados que tem mais informações do que o título e, portanto, entender rapidamente o que é o conjunto de dados.
    * Conselho: por favor escreva o resumo para que ele funcione para descrever o conjunto de dados para alguma pessoa aleatória que você encontra na rua ou para um colega. Lembre-se de incluir o[Cinco W e um H](https://en.wikipedia.org/wiki/Five_Ws): Quem criou o conjunto de dados? Que informações foram coletadas? Quando foram coletados os dados? Onde foi recolhido? Porque foi recolhido? Como foi recolhido?
    *   ERDDAP™exibe o resumo no formulário de acesso de dados do conjunto de dados ( *datasetID* .html) , Faça uma página web gráfico ( *datasetID* .) , e outras páginas da web.ERDDAP™usa o resumo ao criar documentos FGDC e ISO 19115.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (um opcionalERDDAP- atributo específico de metadados globais, não de qualquer padrão) especifica, de forma simplista, quando os dados para um conjunto de dados em tempo quase real são considerados desatualizados, especificados comonow- *NUnits* Por exemplo,now-2 dias para dados que geralmente aparecem 2448 horas após o valor do tempo. Para dados de previsão, use agora **+**  *NUnits* , por exemplo, agora + 6 dias para dados de previsão que é, no máximo, 8 dias no futuro. (Ver[now- *NUnits* Descrição da sintaxe](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Se o valor máximo de tempo para o conjunto de dados for mais recente do que o tempo especificado, o conjunto de dados é considerado atualizado. Se o valor máximo de tempo for mais antigo do que o tempo especificado, o conjunto de dados é considerado atualizado. Para conjuntos de dados desatualizados, há presumivelmente um problema com a fonte de dados, portantoERDDAP™é incapaz de acessar dados de pontos de tempo mais recentes.
    
OtestOutOfDateo valor é exibido como uma coluna no[allDatasetsconjunto de dados](#eddtablefromalldatasets)em seuERDDAP. Também é usado para calcular o índice outOfDate, que é outra coluna noallDatasetsconjunto de dados.
Se o índice for&lt;1, o conjunto de dados é considerado atualizado.
Se o índice for&lt;=1, o conjunto de dados é considerado fora de data.
Se o índice for&lt;=2, o conjunto de dados é considerado muito fora de data.
    
OtestOutOfDatevalor também é usado porERDDAP™para gerar https://*yourDomain*/erddap/outOfDateDatasets.html Página web ([exemplo](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) que mostra os conjuntos de dados que têm&lt;testOutOfDate&gt; tags, com os conjuntos de dados classificados por como fora de data eles são. Se você alterar o tipo de arquivo (de .html para .csv,.jsonlCSV,.nc,.tsv,) , você pode obter essas informações em diferentes formatos de arquivo.
    
Quando possível,[Gerar conjuntos de dadosXml](#generatedatasetsxml)adiciona umtestOutOfDateatributo ao globaladdAttributesde um conjunto de dados. Este valor é uma sugestão baseada nas informações disponíveis para GerarDatasetsXml. Se o valor não for apropriado, altere-o.
    
"Out-of-date" aqui é muito diferente de [&lt;recarregar Cada NMinutes&gt; (#reloadeverynminutes) , que lida com como up-to-dateERDDAPO conhecimento do conjunto de dados é. O&lt;testOutOfDate&gt; sistema assume queERDDAPO conhecimento do conjunto de dados está atualizado. A pergunta&lt;testOutOfDate&gt; lida com é: parece haver algo errado com a fonte dos dados, fazendo com que os dados mais recentes não sejam acessíveisERDDAP?
    
###### título{#title} 
*   [ **título** ](#title)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrões de metadados) é um atributo global REQUIRED com a descrição curta do conjunto de dados (geralmente&lt;= 95 caracteres). Por exemplo,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Ou o conjunto de dados global[Atributos de fonte](#global-attributes)ou seu global&lt;addAttributes&gt; Deve incluir este atributo.
    * título é importante porque cada lista de conjuntos de dados apresentados porERDDAP  (outros resultados de pesquisa) lista os conjuntos de dados em ordem alfabética, por título. Então, se você quiser especificar a ordem dos conjuntos de dados, ou tiver alguns conjuntos de dados agrupados, você tem que criar títulos com isso em mente. Muitas listas de conjuntos de dados (por exemplo, em resposta a uma pesquisa de categoria) , mostrar um subconjunto da lista completa e em uma ordem diferente. Assim, o título de cada conjunto de dados deve ficar por conta própria.
    * Se o título contém a palavra "DEPRECATED" (letras maiúsculas) , então o conjunto de dados vai obter um ranking mais baixo em pesquisas.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* Não. ** &lt;axisVariable&gt; ** ] (#axisvariable) é usado para descrever uma dimensão (também chamado "axis") .
ParaEDDGridconjuntos de dados, um ou maisaxisVariabletags é REQUIREDO, e todos[dataVariableS](#datavariable)sempre compartilhar / usar todas as variáveis do eixo. ([Porquê?](#why-just-two-basic-data-structures) [E se não o fizerem?](#dimensions))   
Deve haver uma variável de eixo para cada dimensão das variáveis de dados.
As variáveis de eixo devem ser especificadas na ordem em que as variáveis de dados as usam.
(Os conjuntos de dados da TabelaEDD NÃO podem usar&lt;axisVariable&gt; tags.)
Um exemplo carnudo é:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; suporta as seguintes subtags:
###### &lt;sourceName\\ &gt;{#sourcename} 
* Não.&lt;sourceName- Sim. (Nome de fonte) -- o nome da fonte de dados para a variável. Este é o nome queERDDAP™usará ao solicitar dados da fonte de dados. Este é o nome queERDDAP™procurará quando os dados forem devolvidos da fonte de dados. Isto é sensível ao caso. Isto é necessário.
###### &lt;destinationName\\ &gt;{#destinationname} 
* Não.&lt;destinationName- Sim. (Nome de destino) é o nome da variável que será mostrada e usada porERDDAP™usuários.
    * Isto é OPTIONAL. Se ausente, osourceNameé usado.
    * Isso é útil porque permite que você altere um críptico ou estranhosourceName.
    *   destinationNameé sensível ao caso.
    *   destinationNames DEVE começar com uma carta (A-Z, a-z) e DEVE ser seguido por 0 ou mais caracteres (A-Z, a-z, 0-9, e \\_) . ("-" foi permitido antesERDDAP™versão 1.10.) Esta restrição permite que nomes variáveis de eixo sejam os mesmos emERDDAP™, nos arquivos de resposta, e em todo o software onde esses arquivos serão usados, incluindo linguagens de programação (Tipo...Python,MatlabeJavaScript) onde há restrições semelhantes em nomes variáveis.
    * EmEDDGridconjuntos de dados,[longitude, latitude, altitude, profundidade e tempo](#destinationname)variáveis do eixo são especiais.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* Não.&lt;addAttributes&gt; (#variável-addattributes) define um conjunto OPTIONAL de atributos ( *Nome* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = *valor* ) que são adicionados aos atributos da fonte para uma variável, para fazer os atributos combinados para uma variável.
Se a variável[Atributos de fonte](#variable-addattributes)ou&lt;addAttributes&gt; incluir[scale\\_factore/ouadd\\_offset](#scale_factor)atributos, seus valores serão usados para descompactar os dados da fonte antes da distribuição para o cliente
     (resultado Valor = fonte Valor \\*scale\\_factor+add\\_offset) . A variável descompactada será do mesmo tipo de dados (por exemplo, flutuar) como oscale\\_factoreadd\\_offsetvalores.
         
##### &lt;dataVariable&gt;{#datavariable} 
* Não. ** &lt;dataVariable&gt; ** ] (#datavariable) é um problema (para quase todos os conjuntos de dados) tag dentro do&lt;dataset&gt; tag que é usado para descrever uma variável de dados. Deve haver 1 ou mais casos desta tag. Um exemplo carnudo é:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; suporta as seguintes subtags:
###### &lt;sourceName&gt;{#sourcename-1} 
* Não.&lt;sourceName&gt; (Nome de fonte) -- o nome da fonte de dados para a variável. Este é o nome queERDDAP™usará ao solicitar dados da fonte de dados. Este é o nome queERDDAP™procurará quando os dados forem devolvidos da fonte de dados. Isto é sensível ao caso. Isto é necessário.
###### Grupos{#groups} 
CF adicionou suporte para grupos com CF v1.8. A partir de 2020,NetCDFferramentas suportam colocar variáveis em grupos em um.ncficheiro. Na prática, isso significa apenas que as variáveis têm um nome longo que identifica o grupo (S) e o nome variável, por exemplo, group1a/group2c/varName ).ERDDAP™suporta grupos convertendo o "/" na variável&lt;sourceName&gt; em "\\_" na variável&lt;destinationName&gt;, por exemplo, group1a\\_group2c\\_varName . (Quando você vê isso, você deve perceber que os grupos não são muito mais do que uma convenção de sintaxe.) Quando as variáveis são listadas emERDDAP™, todas as variáveis em um grupo aparecerão juntas, imitando o grupo subjacente.\\[SeERDDAP™, nomeadamente Gerar conjuntos de dados Xml, não executa bem como pode com arquivos de origem que têm grupos, por favor envie um arquivo de amostra para Chris. John em noaaa.gov .\\]

EDDTableDeFiles conjuntos de dados podem usar alguns especialmente codificados, pseudosourceNames para definir novas variáveis de dados, por exemplo, para promover um atributo global para ser uma variável de dados. Ver[esta documentação](#pseudo-sourcenames).
###### HDFEstruturas{#hdf-structures} 
Começar comERDDAP™v2.12,EDDGridDe NcFiles eEDDGridA partir de NcFiles Unpacked pode ler dados de "estruturas" em.nc4 e.hdf4 ficheiros. Para identificar uma variável que é de uma estrutura, a&lt;sourceName&gt; deve usar o formato: *Design de moda* | *Nome do membro* , por exemplo, group1/myStruct|MyMember.

###### Nomes de fonte de valor fixo{#fixed-value-sourcenames} 
Em um conjunto de dados EDDTable, se você quiser criar uma variável (com um único valor fixo) que não está no conjunto de dados de origem, use:
```
    <sourceName>=*fixedValue*</sourceName>  
```
O sinal de igualdade inicial dizERDDAP™que um fixo O valor seguirá.

* Para variáveis numéricas, o valor fixo deve ser um único valor finito ou NaN (caso insensível, por exemplo, \\=NaN) .
* Para variáveis String, o valor fixo deve ser único,[Corda de estilo JSON](https://www.json.org/json-en.html)  (com caracteres especiais escapou com caracteres \\) , por exemplo, \\="My \\"Special\\\" String" .
* Para uma variável timestamp, especifique o valor fixo como um número em"seconds since 1970-01-01T00:00:00Z"e uso
unidades=segundos desde 1970-01-01T00:00Z .
    
As outras tags para o&lt;dataVariable&gt; trabalho como se fosse uma variável regular.
Por exemplo, para criar uma variável chamada altitude com um valor fixo de 0,0 (flutuar) , use:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Para situações incomuns, você pode até especificar umactual\\_rangeaddAttribute, que irá substituir os valores esperados de destinoMin e destinoMax (que, de outro modo, seria igual ao fixo Valor) .
 
###### Nomes de fonte de script / Variáveis derivadas{#script-sourcenamesderived-variables} 
Começar comERDDAP™v2.10, em um[Tabela EDD dos arquivos](#eddtablefromfiles),[EDDTable FromDatabase](#eddtablefromdatabase)ou[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)dataset, o&lt;sourceName&gt; pode ser
uma expressão (uma equação que avalia a um único valor) , usando o formato
```
    <sourceName>=*expression*</sourceName>  
```
ou um script (uma série de declarações que retorna um único valor) , usando o formato
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™depende da[Projeto Apache](https://www.apache.org/) [JavaLíngua da expressão (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licença:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) para avaliar as expressões e executar os scripts.
O cálculo para uma determinada nova variável é feito dentro de uma linha dos resultados, repetidamente para todas as linhas.
As expressões e scripts usam umJava- eJavasintaxe semelhante a script e pode usar qualquer um dos
[operadores e métodos que são construídos em JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Os scripts também podem usar métodos (funções) destas classes:
*   [Calendário2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), que é um wrapper para alguns dos métodos relacionados com estática, tempo e calendário em com.cohort.util.Calendar2 ([licença](/acknowledgements#cohort-software)) . Por exemplo,
Calendário2.parseToEpochSeconds ( *sourceTime, data TimeFormat* ) analisará a fonte string de tempo através da string dateTimeFormat e retornar uma"seconds since 1970-01-01T00:00:00Z"  (épocaConds) valor duplo.
*   [Matemática](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), que é um wrapper para quase todos os métodos estáticos, relacionados com matemática em[Java.lang. Matemática](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Por exemplo, Math.atan2 ( *y, x* ) leva em coordenadas retangulares (y, x) e retorna coordenadas polares (um array de duplos com\\[r, theta\\]) .
*   [Matemática](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), que é um wrapper para quase todos os métodos estáticos, relacionados à matemática em com.cohort.util. Matemática ([licença](/acknowledgements#cohort-software)) . Por exemplo,
Math2.round ( *d, nPlaces* ) arredondará d para o número especificado de dígitos à direita do ponto decimal.
* String, que lhe dá acesso a todos os métodos estáticos, relacionados a corda em[Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Objetos de corda emERDDAP™expressões e scripts podem usar qualquer um de seus associadosJavamétodos, como descrito no java.lang. Documentação de corda. Por exemplo, String.valueOf (D) converterá o valor duplo d em uma corda (embora você também pode usar ""+d) .
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), que é um wrapper para a maioria dos métodos estáticos, String- e relacionados a array em com.cohort.util.String2 ([licença](/acknowledgements#cohort-software)) . Por exemplo, String2.zeropad ( *número, nDigits* ) adicionará 0s à esquerda do número Corda de modo que o número total de dígitos é nDigits (por exemplo, String2.zeropad (6, 2) voltará "06") .
*   [linha](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), que tem métodos não estáticos para acessar os dados das várias colunas na linha atual da tabela de dados de origem. Por exemplo, row.columnString ("ano") lê o valor da coluna "ano" como uma corda, enquanto, row.column Int ("ano") lê o valor da coluna "ano" como um inteiro.

Por razões de segurança, expressões e scripts não podem usar outras classes que não as 6.ERDDAP™impõe essa limitação criando uma lista negra padrão (que listas negras todas as classes) e depois uma lista branca (que permite especificamente as 6 classes descritas acima) . Se você precisar de outros métodos e/ou outras classes para fazer seu trabalho, por favor envie seus pedidos para Chris. John em noaaa.gov .
    
###### Eficiência
Para EDDTableDeFiles conjuntos de dados, há apenas um muito, muito mínimo (provavelmente não perceptível) desaceleração para pedidos de dados dessas variáveis. Para EDDTableFromDatabase, há uma enorme penalidade de velocidade para solicitações que incluem restrições sobre essas variáveis (por exemplo, (&longitude0360&gt;30&longitude0360&lt;40) porque as restrições não podem ser passadas para o banco de dados, então o banco de dados tem que retornar muito mais dados paraERDDAP™  (que é muito demorado) assimERDDAP™pode criar a nova variável e aplicar a restrição. Para evitar o pior caso (onde não há restrições sendo passado para o banco de dados) ,ERDDAP™lança uma mensagem de erro para que o banco de dados não tenha que devolver todo o conteúdo da tabela. (Se você quiser contornar isso, adicione uma restrição a uma coluna não-escrita que será sempre verdadeira, por exemplo, &time&lt;3000-01.) Por esta razão, com EDDTableFromDatabase, é provavelmente sempre melhor criar uma coluna derivada no banco de dados em vez de usarsourceName=script inERDDAP.

###### Visão geral de como uma expressão (Ou script) É usado:
Em resposta à solicitação de um usuário para dados tabulares,ERDDAP™recebe dados de uma série de arquivos de origem. Cada arquivo de origem gerará uma tabela de matérias-primas (diretamente da fonte) dados.ERDDAP™então passará pela tabela de dados brutos, linha por linha, e avaliará a expressão ou script uma vez por cada linha, a fim de criar uma nova coluna que tenha essa expressão ou script como umasourceName.
    
###### Gerar conjuntos de dadosXml
Note que Gerar conjuntos de dados Xml é completamente inconsciente quando há uma necessidade de criar uma variável com&lt;sourceName- Sim. *expressão* &lt;/sourceName&gt; Você tem que criar a variável emdatasets.xmlà mão.

###### Exemplos de expressão:
Aqui estão alguns exemplos completos de variáveis de dados que usam uma expressão para criar uma nova coluna de dados. Esperamos que estes exemplos (e variantes deles) cobrirá cerca de 95% do uso de toda expressãosourceNameS.

###### Combinando "data" e"time"colunas em uma coluna de tempo unificada:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Isso.sourceNameexpressão faz um novo"time"coluna concatenando os valores de string a partir do "date" (yyyy-MM-dd) e"time"  (HH:) colunas em cada linha do arquivo de origem, e convertendo essa string em uma"seconds since 1970-01-01"  (épocaConds) valor duplo.

Ou curso, você terá que personalizar a string de formato de tempo para lidar com o formato específico nas colunas de data e hora de origem de cada conjunto de dados, veja o
[documentação de unidades de tempo](#string-time-units).

Tecnicamente, você não precisa usar Calendário2.parseToEpochSeconds () converter a data + hora combinada em epochSeconds. Você pode simplesmente passar a data + hora String paraERDDAP™e especifique o formato (por exemplo,
yyyy-MM-dd'T'H:mm:ss'Z') através do atributo unidades. Mas há vantagens significativas para converter em epochSeconds -- notavelmente, EDDTableFromFiles pode então facilmente acompanhar o intervalo de valores de tempo em cada arquivo e assim decidir rapidamente se olhar em um determinado arquivo ao responder a uma solicitação que tem restrições de tempo.

Um problema relacionado é a necessidade de criar uma coluna data+hora unificada de uma fonte com ano separado, mês, data, hora, minuto, segundo. A solução é muito semelhante, mas muitas vezes você precisará de zero-pad muitos dos campos, de modo que, por exemplo, mês (1 - 12) e data (1 - 31) sempre tem 2 dígitos. Aqui está um exemplo com ano, mês, data:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Um problema relacionado é a necessidade de criar uma coluna de latitude ou longitude unificada combinando os dados nas colunas de graus, minutos e segundos da tabela de origem, cada uma armazenada como inteiros. Por exemplo,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Convertendo uma coluna chamada "lon" com valores de longitude de 0 - 360° em uma coluna chamada "longitude" com valores de -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Isso.sourceNameexpressão faz uma nova coluna "longitude" convertendo o valor duplo da coluna "lon" em cada linha do arquivo de origem (presumivelmente com 0 - 360 valores) , e convertendo isso em um -180 a 180 valor duplo.

Se você quiser converter valores de longitude fonte de -180 - 180° em 0 - 360°, use
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Nomeando as Duas Variáveis de Longitude:
Se o conjunto de dados tiver 2 variáveis de longitude, recomendamos usardestinationName= longitude para a variável -180 - 180° edestinationName= longitude0360 (e longName=\"Longitude 0-360°") para a variável 0 - 360°. Isso é importante porque os usuários às vezes usam a Pesquisa Avançada para procurar dados dentro de um intervalo de longitude específico. Essa busca funcionará melhor se a longitude consistentemente tiver -180 - 180° valores para todos os conjuntos de dados. Além disso, os atributos geoespaciais do conjunto de dados\\_lon\\_min, geoespacial\\_lon\\_max, Westernmost\\_Easting e Easternmost\\_Eastings globais serão definidos de forma consistente (com valores de longitude -180 a 180°) ;
    
###### Convertendo uma coluna chamada "tempF" com valores de temperatura em grau\\_ F em uma coluna chamada "tempC" com temperaturas em grau\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Isso.sourceNameexpressão faz uma nova coluna "tempC" convertendo o grau float\\_ Valor F da coluna "tempF" em cada linha do arquivo de origem em um grau float\\_ Valor C.

Note que seu conjunto de dados pode ter tanto o temp original F variável e o novo temp Variável C por ter outra variável com
```
    <sourceName>tempF</sourceName>
```
###### Convertendo colunas de "velocidade" e "direção" em duas colunas com os componentes u,v
* Para fazer uma variável u, use
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Para fazer uma variável v, use
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Ou, dado u,v:
* Para fazer uma variável de velocidade, use
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Para fazer uma variável de direção, use
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Exemplo de script:
Aqui está um exemplo de usar um script, não apenas uma expressão, como umsourceName. Esperamos que os scripts, ao contrário de expressões, não sejam necessários muitas vezes. Neste caso, o objetivo é retornar um valor não-NaN faltando (- 99) para valores de temperatura fora de um intervalo específico. Note que o script é a parte após o "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Bandeira dura
Se você alterar a expressão ou script definido em umsourceName, você deve definir um[bandeira dura](/docs/server-admin/additional-information#hard-flag)para o conjunto de dados paraERDDAP™exclui todas as informações em cache para o conjunto de dados e re-leia todos os arquivos de dados (usando a nova expressão ou script) da próxima vez que carregar o conjunto de dados. Alternativamente, você pode usar[DasDds](#dasdds)que faz o equivalente de definir uma bandeira dura.

###### Codificador de porcentagem
Isso raramente é relevante: Porque as expressões e scripts são escritos emdatasets.xml, que é um documento XML, você deve por cento codificar qualquer&lt;, \\&gt;, e & caracteres nas expressões e scripts como&lt;, &gt; e &amp; .

###### Problemas comuns
Um problema comum é que você cria uma variável comsourceName= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = *expressão* mas a coluna resultante de dados apenas tem valores ausentes. Alternativamente, algumas linhas da nova coluna têm valores perdidos e você acha que não deveriam. O problema subjacente é que algo está errado com a expressão eERDDAPestá convertendo esse erro em um valor perdido. Para resolver o problema,

* Veja a expressão para ver qual é o problema.
* Olha...[- Não.](/docs/server-admin/additional-information#log), que mostrará a primeira mensagem de erro gerada durante a criação de cada nova coluna.

As causas comuns são:

* Usaste o caso errado. Expressões e scripts são sensíveis a casos.
* Omitiste o nome da turma. Por exemplo, você deve usar Math.abs () , não apenas abs () .
* Você não digitou conversões. Por exemplo, se o tipo de dados de um valor de parâmetro é String e você tem um valor duplo, você precisa converter um duplo em uma string via "+d.
* O nome da coluna na expressão não corresponde exatamente ao nome da coluna no arquivo (ou o nome pode ser diferente em alguns arquivos) .
* Há um erro de sintaxe na expressão (por exemplo, um desaparecido ou extra) ').

Se você ficar preso ou precisar de ajuda,
por favor inclua os detalhes e veja nossos[seção sobre como obter suporte adicional](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* Não.&lt;destinationName&gt; (Nome de destino) -- o nome da variável que será mostrada e utilizadaERDDAP™usuários.
    * Isto é OPTIONAL. Se ausente, o[sourceName](#sourcename)é usado.
    * Isso é útil porque permite que você altere um críptico ou estranhosourceName.
    *   destinationNameé sensível ao caso.
    *   destinationNames DEVE começar com uma carta (A-Z, a-z) e DEVE ser seguido por 0 ou mais caracteres (A-Z, a-z, 0-9, e \\_) . ("-" foi permitido antesERDDAP™versão 1.10.) Esta restrição permite que nomes de variáveis de dados sejam os mesmos emERDDAP™, nos arquivos de resposta, e em todo o software onde esses arquivos serão usados, incluindo linguagens de programação (Tipo...Python,MatlabeJavaScript) onde há restrições semelhantes em nomes variáveis.
    * Em conjuntos de dados EDDTable,[longitude, latitude, altitude (ou profundidade) e tempo](#destinationname)variáveis de dados são especiais.
             
###### &lt;dados Tipo &gt;{#datatype} 
* Não.&lt;dataType&gt;] (# Datatype #) -- especifica o tipo de dados vindo da fonte. (Em alguns casos, por exemplo, ao ler dados de arquivos ASCII, ele especifica como os dados provenientes da fonte devem ser armazenados.) 
    * Isso é REQUIREDO por alguns tipos de conjuntos de dados e IGNORADO por outros. Tipos de conjuntos de dados que exigem isso para seusdataVariables são:EDDGridFromXxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTable FromNOS, EDDTable FromSOS. Outros tipos de conjuntos de dados ignoram esta tag porque eles obtêm as informações da fonte.
         
    * Os valores válidos são qualquer um dos padrões[ERDDAP™tipos de dados](#data-types)mais booleano (ver abaixo) . Os nomes de dataType são sensíveis a casos.
         
###### dados booleanos{#boolean-data} 
*   ["boolean"](#boolean-data)é um caso especial.
    * Internamente,ERDDAP™não suporta um tipo booleano porque os booleanos não podem armazenar valores perdidos e a maioria dos tipos de arquivos não suportam booleanos. Também,DAPnão suporta booleanos, então não haveria nenhuma maneira padrão de consultar variáveis booleanas.
    * Especificando "boolean" para os dados Tipo emdatasets.xmlfará com que os valores booleanos sejam armazenados e representados como bytes: 0=false, 1=true, 127=missing\\_value.
    * Os usuários podem especificar restrições usando os valores numéricos (por exemplo, "isAlive=1") .
    *   ERDDAP™administradores às vezes precisam usar os dados "boolean" Tipo emdatasets.xmlpara contarERDDAP™como interagir com a fonte de dados (por exemplo, para ler valores booleanos de um banco de dados relacional e convertê-los para 0, 1, ou 127) .
         
* Se você quiser alterar uma variável de dados do dataType nos arquivos de origem (por exemplo, curto) em alguns outros dados Digite o conjunto de dados (por exemplo,) Não use&lt;dataType&gt; para especificar o que você quer. (Ele funciona para alguns tipos de conjuntos de dados, mas não outros.) Em vez disso:
    * Uso&lt;dataType&gt; para especificar o que está nos arquivos (por exemplo, curto) .
    * No&lt;addAttributes&gt; para a variável, adicione um[scale\\_factor](#scale_factor)atributo com os novos dados Tipo (por exemplo,) e um valor de 1, por exemplo,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* Não.&lt;addAttributes&gt; (#variável-addattributes) -- define um conjunto de atributos ( *Nome* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = *valor* ) que são adicionados aos atributos da fonte para uma variável, para fazer os atributos combinados para uma variável. Isto é OPTIONAL.
Se a variável[Atributos de fonte](#variable-addattributes)ou&lt;addAttributes&gt; incluir[scale\\_factore/ouadd\\_offset](#scale_factor)atributos, seus valores serão usados para descompactar os dados da fonte antes da distribuição para o cliente. A variável descompactada será do mesmo tipo de dados (por exemplo, flutuar) como oscale\\_factoreadd\\_offsetvalores.
        
###### Variável&lt;addAttributes&gt; {#variable-addattributes} 
* Não. ** Atributos variáveis / Variável&lt;addAttributes&gt; ** ] (#variável-addattributes) - ...&lt;addAttributes&gt; é uma tag OPTIONAL dentro de uma&lt;axisVariable&gt; ou&lt;dataVariable&gt; tag que é usado para alterar os atributos da variável.
    
    *    ** Use uma variável&lt;addAttributes&gt; para alterar os atributos da variável. ** ERDDAP™combina atributos de uma variável a partir da fonte do conjunto de dados (** Atributos de fonte **) e da variável** addAttributes **que você define emdatasets.xml  (que têm prioridade) para fazer a variável "** Atributos combinados ** ", que são o queERDDAP™os usuários veem. Assim, você pode usaraddAttributespara redefinir os valores do sourceAttributes, adicionar novos atributos ou remover atributos.
    * Veja o [ ** &lt;addAttributes&gt; **informação] (#addattributes) que se aplica a global e variável** &lt;addAttributes&gt; ** .
    *   ERDDAP™procura e usa muitos desses atributos de várias maneiras. Por exemplo, os valores do colorBar são necessários para disponibilizar uma variável viaWMS, para que os mapas podem ser feitos com colorBars consistentes.
    *   [A longitude, latitude, altitude (ou profundidade) , e variáveis de tempo](#destinationname)obter muitos metadados apropriados automaticamente (por exemplo,[unidades](#units)) .
    * Uma amostra&lt;addAttributes&gt; para uma variável de dados é:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

O atributo numberOfObservations vazio causa o número de origemAtributos OfObservations (se houver) para ser removido da lista final, combinada de atributos.
    * Fornecer esta informação ajudaERDDAP™fazer um trabalho melhor e ajuda os usuários a entender os conjuntos de dados.
Os bons metadados tornam um conjunto de dados utilizável.
Metadados insuficientes tornam um conjunto de dados inútil.
Por favor, tome o tempo para fazer um bom trabalho com atributos de metadados.
    
###### Comentários sobre atributos variáveis que são especiais emERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)é um atributo variável RECOMENDADO. Por exemplo,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Este atributo é do[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)padrões de metadados.
* Se presente, deve ser um array de dois valores do mesmo tipo de dados que o tipo de dados de destino da variável, especificando o real (não o teórico ou o permitido) valores mínimos e máximos dos dados para essa variável.
* Se os dados forem embalados[scale\\_factore/ouadd\\_offset](#scale_factor),actual\\_rangedeve ter valores descompactados e ser do mesmo tipo de dados que os valores desempactados.
* Para algumas fontes de dados (por exemplo, todos EDDTableDe... Conjuntos de dados de arquivos) ,ERDDAP™determina oactual\\_rangede cada variável e define oactual\\_rangeatributo. Com outras fontes de dados (por exemplo, bases de dados relacionais, Cassandra,DAPPer...Hyrax) , pode ser problemático ou pesado para a fonte para calcular o intervalo, entãoERDDAP™não o pede. Neste caso, é melhor se você pode definiractual\\_range  (especialmente para as variáveis longitude, latitude, altitude, profundidade e tempo) adicionando umactual\\_rangeatributo a cada variável [&lt;addAttributes&gt; (#addattributes) para este conjunto de dadosdatasets.xmlPor exemplo,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Para numérico[variáveis tempo e timestamp](#time-units), os valores especificados devem ser a fonte relevante (não destino) valores numéricos. Por exemplo, se os valores de tempo de origem são armazenados como "dias desde 1985-01-01-01", então oactual\\_rangedeve ser especificado em "dias desde 1985-01-01". E se você quiser se referir a AGORA como o segundo valor para dados quase em tempo real que é periodicamente atualizado, você deve usar NaN . Por exemplo, para especificar um intervalo de dados de 1985-01-17 até AGORA, use

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Seactual\\_rangeé conhecido (porERDDAP™calculando-o ou adicionando-o via&lt;addAttributes&gt;ERDDAP™irá exibi-lo ao usuário no formulário de acesso de dados ( *datasetID* .html) e fazer um gráfico páginas da web ( *datasetID* .) para esse conjunto de dados e usá-lo ao gerar os metadados FGDC e ISO 19115. Além disso, os últimos 7 dias do tempoactual\\_rangesão usados como subconjunto de tempo padrão.
* Seactual\\_rangeé conhecido, os usuários podem usar[min () e máximo () funções](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)em pedidos, que muitas vezes é muito útil.
* Para toda a EDDTable... conjuntos de dados, seactual\\_rangeé conhecido (ou especificando-o ou porERDDAP™calculando-o) ,ERDDAP™será capaz de rejeitar rapidamente quaisquer pedidos de dados fora desse intervalo. Por exemplo, se o menor valor de tempo do conjunto de dados corresponder a 1985-01-17, então um pedido para todos os dados de 1985-01-01 até 1985-01-16 será imediatamente rejeitado com a mensagem de erro "Sua consulta não produziu resultados correspondentes". Isto fazactual\\_rangeum pedaço muito importante de metadados, como pode salvarERDDAP™muito esforço e salvar o usuário muito tempo. E isso ressalta queactual\\_rangevalores não devem ser mais estreitos do que o intervalo real dos dados; caso contrário,ERDDAP™pode dizer erroneamente "Não há dados correspondentes" quando de fato há dados relevantes.
* Quando um usuário seleciona um subconjunto de dados e solicita um tipo de arquivo que inclui metadados (por exemplo,.nc) ,ERDDAP™modificaactual\\_rangeno arquivo de resposta para refletir o intervalo do subconjunto.
* Ver também[data\\_minedata\\_max](#data_min-and-data_max), que são uma maneira alternativa de especificar oactual\\_range. No entanto, estes são deprecated agora queactual\\_rangeé definido por CF 1.7+.
         
###### Atributos da barra de cor{#color-bar-attributes} 
Existem vários atributos variáveis OPTIONAL que especificam os atributos padrão sugeridos para uma barra de cores (usado para converter valores de dados em cores em imagens) para esta variável.
* Se presente, essas informações são usadas como informações padrão por griddap etabledapsempre que você solicitar uma imagem que use uma barra de cores.
* Por exemplo, quando os dados gradeados de latitude-longitude são plotados como uma cobertura em um mapa, a barra de cores especifica como os valores de dados são convertidos em cores.
* Ter esses valores permiteERDDAP™criar imagens que usam uma barra de cores consistente em diferentes solicitações, mesmo quando o tempo ou outros valores de dimensão variam.
* Estes nomes de atributos foram criados para uso emERDDAP. Eles não são de um padrão de metadados.
* Os atributos relacionados à barra de cores são:
    *    **colorBarMinimum** especifica o valor mínimo no colorBar. Por exemplo,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Se os dados forem embalados[scale\\_factore/ouadd\\_offset](#scale_factor), especifique ocolorBarMinimumcomo um valor não embalado.
    * Valores de dados inferiores aocolorBarMinimumsão representados pela mesma cor quecolorBarMinimumvalores.
    * O atributo deve ser de[Tipo="duplo"](#attributetype), independentemente do tipo da variável de dados.
    * O valor é geralmente um bom número redondo.
    * Melhores práticas: Recomendamos um valor ligeiramente superior ao valor mínimo de dados.
    * Não há valor padrão.
*    **colorBarMaximum** especifica o valor máximo no colorBar. Por exemplo,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Se os dados forem embalados[scale\\_factore/ouadd\\_offset](#scale_factor), especifique ocolorBarMinimumcomo um valor não embalado.
    * Valores de dados mais elevados do quecolorBarMaximumsão representados pela mesma cor quecolorBarMaximumvalores.
    * O atributo deve ser de[Tipo="duplo"](#attributetype), independentemente do tipo da variável de dados.
    * O valor é geralmente um bom número redondo.
    * Melhores práticas: Recomendamos um valor ligeiramente inferior ao valor máximo dos dados.
    * Não há valor padrão.
*    **cor da cor BarPalette** especifica a paleta para o colorBar. Por exemplo,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * TudoERDDAP™instalações suportam estas paletas padrão: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topography, TopographyDepth\\[adicionado em v1.74\\], WhiteBlack, WhiteBlueBlack e WhiteRedBlack.
    * Se tiver instalado[paletas adicionais](/docs/server-admin/additional-information#palettes), você pode se referir a um deles.
    * Se este atributo não estiver presente, o padrão é BlueWhiteRed se \\-1\\*colorBarMinimum= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =colorBarMaximum; caso contrário, o padrão é Rainbow.
*    **cor de rosa** especifica a escala para o colorBar. Por exemplo,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Os valores válidos são Linear e Log.
    * Se o valor for Log,colorBarMinimumdeve ser maior que 0.
    * Se este atributo não estiver presente, o padrão é Linear.
*    **cor da cor BarContinuidade** especifica se o colorBar tem uma paleta contínua de cores, ou se o colorBar tem algumas cores discretas. Por exemplo,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Os valores válidos são as strings verdadeiras e falsas.
    * Se este atributo não estiver presente, o padrão é verdadeiro.
*    **colorBarNSections** especifica o número padrão de seções no colorBar. Por exemplo,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Os valores válidos são inteiros positivos.
    * Se este atributo não estiver presente, o padrão é \\-1, que dizERDDAP™para escolher o número de seções com base no intervalo do colorBar.
###### WMS {#wms} 
Os principais requisitos para uma variável a ser acessível atravésERDDAP'WMSservidor são:
* O conjunto de dados deve ser umEDDGrid... conjunto de dados.
* A variável de dados DEVE ser uma variável grelhada.
* A variável de dados MUST tem variáveis de longitude e de eixo de latitude. (Outras variáveis do eixo são OPTIONAL.) 
* Deve haver alguns valores de longitude entre -180 e 180.
* OcolorBarMinimumecolorBarMaximumatributos DEVE ser especificado. (Outros atributos de barras coloridas são OPTIONAL.) 

###### data\\_minedata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** e **data\\_max** ](#data_min-and-data_max)- ... Estes são atributos variáveis deprecated definidos no World Ocean Circulation Experiment (WOCE) descrição de metadados. Por exemplo,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Recomendamos que você use[actual\\_range](#actual_range), em vez dedata\\_minedata\\_maxPorqueactual\\_rangeé agora definido pela especificação CF.
    * Se presente, eles devem ser do mesmo tipo de dados que o tipo de dados de destino da variável, e especificar o real (não o teórico ou o permitido) valores mínimos e máximos dos dados para essa variável.
    * Se os dados forem embalados[scale\\_factore/ouadd\\_offset](#scale_factor),data\\_minedata\\_maxdeve ser desembalado valores usando o tipo de dados desembalado.
         
###### variáveldrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)- ... Este é um atributo variável OPTIONAL usado porERDDAP™  (e sem padrões de metadados) que especifica o valor padrão para a opção "Draw Land Mask" no formulário Make A Graph do conjunto de dados ( *datasetID* .) e para o parâmetro &.land em uma URL solicitando um mapa dos dados. Por exemplo,
    ```
        <att name="drawLandMask">under</att>  
    ```
Ver[drawLandMaskVisão geral](#drawlandmask).
###### Codificação{#encoding} 
*   [ **\\_Encontre** ](#encoding)
    * Este atributo só pode ser usado com variáveis String .
    * Este atributo é fortemente recomendado.
    * Este atributo é do[NetCDFGuia do usuário (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * Internamente emERDDAP™, Strings são uma sequência de caracteres de 2 bytes que usam o[Conjunto de caracteres Unicode UCS-2](https://en.wikipedia.org/wiki/UTF-16).
    * Muitos tipos de arquivo apenas suportam caracteres 1-byte em Strings e, portanto, precisam deste atributo para identificar um associado
        [charset (Página de código AKA) ](https://en.wikipedia.org/wiki/Code_page)que define como mapear os 256 valores possíveis para um conjunto de 256 caracteres desenhados do conjunto de caracteres UCS-2 e/ou do sistema de codificação, por exemplo,[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (que requer entre 1 e 4 bytes por caracter) .
    * Os valores para \\_Encoding são insensíveis a casos.
    * Em teoria,ERDDAP™poderia suportar identificadores de codificação \\_[esta lista de IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml)Mas na prática,ERDDAP™atualmente apenas suporta
        * ISO-8859-1 (note que tem traços, não sublinha) , que tem a vantagem de que é idêntico aos primeiros 256 caracteres do Unicode, e
        * UTF-8.
    * Ao ler arquivos de origem, o valor padrão é ISO-8859-1, exceto para arquivos netcdf-4, onde o padrão é UTF-8.
    * Este é um problema problemático em curso porque muitos arquivos de origem usam charsets ou codificações que são diferentes do ISO-8859-1, mas não identificam o charset ou codificação. Por exemplo, muitos arquivos de dados de origem têm alguns metadados copiados e colados a partir do Microsoft Word no Windows e, portanto, têm hífens extravagantes e apostrofes de um charset específico do Windows em vez de hífens e apostrofes ASCII. Esses personagens então aparecem como personagens estranhos ou '?' emERDDAP.
         
###### arquivoAccessBaseUrl{#fileaccessbaseurl} 
*    **[arquivoAccessBaseUrl](#fileaccessbaseurl)e arquivoAccessSuffix** são atributos muito raramente usados que não são de qualquer padrão. Se uma coluna EDDTable tiver nomes de arquivo de arquivos acessíveis à web (por exemplo, imagem, vídeo ou arquivos de áudio) , você pode adicionar
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
para especificar a URL base (final com /) necessário para fazer os nomes de arquivos em URLs completas. Em casos incomuns, como quando uma coluna tem referências a arquivos .png, mas os valores não ".png", você pode adicionar
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(por exemplo,&lt;att name="fileAccessSuffix"&gt;.png&lt;/a&gt;)
para especificar um sufixo a ser adicionado para fazer os nomes dos arquivos em URLs completas. Então,.htmlTablerespostas,ERDDAP™irá mostrar o nome do arquivo como um link para a URL completa (a base Url mais o nome do arquivo mais o sufixo) .

Se quiseresERDDAP™para servir os arquivos relacionados, fazer um separado[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)dataset para esses arquivos (pode ser um conjunto de dados privado) .
    
###### arquivoAccessArchive Url.{#fileaccessarchiveurl} 
*   [ **arquivoAccessArchive Url.** ](#fileaccessarchiveurl)é um atributo muito raramente usado que não é de qualquer padrão. Se uma coluna EDDTable tiver nomes de arquivo de arquivos acessíveis à web (por exemplo, imagem, vídeo ou arquivos de áudio) que são acessíveis através de um arquivo (por exemplo,.ziparquivo) acessível através de uma URL, use&lt;int name="fileAccessArchiveUrl"&gt; *O NOSSA* &lt;/att&gt; para especificar a URL para o arquivo.
    
Se quiseresERDDAP™para servir o arquivo, fazer um separado[EDDTable De Nomes de Arquivo](#eddtablefromfilenames)dataset para esse arquivo (pode ser um conjunto de dados privado) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)- ... Este é um atributo variável REQUIRED se&lt;variáveisMustHaveIoosCategory&gt; é definido como verdadeiro (o padrão) em[setup.xml](/docs/server-admin/deploy-install#setupxml); caso contrário, é OPTIONAL.
Por exemplo,&lt;Nome do anúncioioos\\_category"&lt;/att&gt;
As categorias são[NOAASistema Integrado de Observação do Oceano (IOOS) ](https://ioos.noaa.gov/).
    
    *    (Como escrever isto) Não estamos cientes de definições formais desses nomes.
    * Os nomes principais são de Zdenka Willis' .ppt "Integrated Ocean Observing System (IOOS)  NOAAAbordagem para construir uma capacidade operacional inicial" e do[US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (página 1-5) .
    * É provável que esta lista seja revisada no futuro. Se você tem pedidos, por favor envie um e-mail para Chris. John no noaaa.gov.
    *   ERDDAP™suporta uma lista maior de categorias do que IOOS faz porque Bob Simons adicionou nomes adicionais (principalmente com base nos nomes de campos científicos, por exemplo, Biologia, Ecologia, Meteorologia, Estatística, Taxonomia) para outros tipos de dados.
    * Os valores válidos atuais emERDDAP™são Bathymetry, Biology, Bottom Character, CO2, Colored Dissolved Organic Matter, Contaminants, Currents, Dissolved Nutrients, Dissolved O2, Ecology, Fish Abundance, Fish Species, Heat Flux, Hydrology, Ice Distribution, Identifier, Location, Meteorology, Ocean Color, Optical Properties, Other, Pathogens, Phytoplank
    * Há alguma sobreposição e ambiguidade entre termos diferentes - faça o seu melhor.
    * Se você adicionarioos\\_categorypara a lista de&lt;categoryAttributes&gt; emERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo, os usuários podem facilmente encontrar conjuntos de dados com dados semelhantes viaERDDAP"Search for Datasets by Category" na página inicial.
        [Tente usarioos\\_categorypara procurar conjuntos de dados de interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Houve[uma discussão sobreERDDAP™eioos\\_categorynoERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Você pode ser tentado a definir&lt;variáveisMustHaveIoosCategory&gt; para false para que este atributo não seja necessário. ("Pfft&#33; O que é para mim?") Algumas razões para deixá-lo definido como verdadeiro (o padrão) e usoioos\\_categorysão:
    
    * Se setup.xml&lt;variáveisMustHaveIoosCategoria&gt; está definido como verdadeiro,[Gerar conjuntos de dadosXml](#generatedatasetsxml)sempre cria/suggests anioos\\_categoryatributo para cada variável em cada novo conjunto de dados. Então porque não o deixa entrar?
    *   ERDDAP™permite que os usuários procurem conjuntos de dados de interesse por categoria.ioos\\_categoryé uma categoria de pesquisa muito útil porque o ioos\\_categories (por exemplo, Temperatura) são bastante amplas. Isto fazioos\\_categorymuito melhor para esta finalidade do que, por exemplo, o CF muito mais finostandard\\_nameS (que não são tão bons para este propósito por causa de todos os sinónimos e pequenas variações, por exemplo, mar\\_surface\\_temperatura versus sea\\_water\\_temperatura) .
(Utilizaçãoioos\\_categorypara esta finalidade é controlada por&lt;categoryAttributes&gt; no seu ficheiro setup.xml.)
        [Tente usarioos\\_categorypara procurar conjuntos de dados de interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Estas categorias são[NOAASistema Integrado de Observação do Oceano (IOOS) ](https://ioos.noaa.gov/). Essas categorias são fundamentais para a descrição do IOOS da missão do IOOS. Se você estiver dentroNOAA, apoioioos\\_categoryé bom Um...NOAAcoisa a fazer. (Olha para isto.[Um.NOAAvídeo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)e ser inspirado&#33;) Se você está em alguma outra agência dos EUA ou internacional, ou trabalhar com agências governamentais, ou trabalhar com algum outro Sistema de Observação do Oceano, não é uma boa ideia cooperar com o escritório do IOOS dos EUA?
    * Mais cedo ou mais tarde, você pode querer outrosERDDAP™link para seus conjuntos de dados via[EDDGridDe Erddap](#eddfromerddap)e[EDDTable FromErddap](#eddfromerddap). Se o outroERDDAP™requerimentoioos\\_category, seus conjuntos de dados devem terioos\\_categoryem ordem paraEDDGridDe Erddap e EDDTableDe Erddap para trabalhar.
    * É psicologicamente muito mais fácil incluirioos\\_categoryquando você cria o conjunto de dados (É só outra coisa queERDDAP™exige adicionar o conjunto de dados paraERDDAP) , do que adicioná-lo após o fato (se você decidiu usá-lo no futuro) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrões de metadados) é um atributo variável RECOMENDADO emERDDAP. Por exemplo,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™usa olong\\_namepara rotular eixos em gráficos.
    * Melhores práticas: Capitalizar as palavras nolong\\_namecomo se fosse um título (capitalizar a primeira palavra e todas as palavras não-artigo) . Não inclua as unidades nolong\\_name. O nome longo não deve ser muito longo (geralmente&lt;20 caracteres), mas deve ser mais descritivo do que o[destinationName](#destinationname), que é muitas vezes muito conciso.
    * Se...long\\_name" não é definido na variável[Atributos de fonte](#variable-addattributes)ou&lt;addAttributes&gt;ERDDAP™irá gerenciá-lo através da limpeza[standard\\_name](#standard_name)  (se apresentar) ou odestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)e **\\_Fill Valor**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) são atributos variáveis que descrevem um número (por exemplo, -9999) que é usado para representar um valor ausente. Por exemplo,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Para variáveis String, o padrão para ambos é "" (a string vazia) .
Para variáveis numéricas, o padrão para ambos é NaN.
*   ERDDAP™suportesmissing\\_valuee \\_FillValue, uma vez que algumas fontes de dados atribuem significados ligeiramente diferentes para eles.
* Se presente, eles devem ser do mesmo tipo de dados que a variável.
* Se os dados forem embalados[scale\\_factore/ouadd\\_offset](#scale_factor), omissing\\_valuee \\_FillValue valores devem ser igualmente embalados. Da mesma forma, para uma coluna com valores de data/hora de caracteres que usam um local[time\\_zone](#time_zone), omissing\\_valuee os valores \\_FillValue devem usar o fuso horário local.
* Se uma variável usa esses valores especiais, omissing\\_valuee/ou atributos \\_FillValue são REQUIRED.
* Para[variáveis tempo e timestamp](#time-units)  (se a fonte é strings ou numeric) ,missing\\_values e \\_FillValues aparecem como "" (a string vazia) quando o tempo é escrito como uma corda e como NaN quando o tempo é escrito como um duplo. Os valores-fonte paramissing\\_valuee \\_FillValue não aparecerá nos metadados da variável.
* Para variáveis String,ERDDAP™sempre converte qualquermissing\\_values ou \\_FillValue valores de dados em "" (a string vazia) . Os valores-fonte paramissing\\_valuee \\_FillValue não aparecerá nos metadados da variável.
* Para variáveis numéricas:
Omissing\\_valuee \\_FillValue aparecerá nos metadados da variável.
Para alguns formatos de dados de saída,ERDDAP™deixará estes números especiais intactos, por exemplo, você verá -9999.
Para outros formatos de dados de saída (notavelmente formatos como texto como .csv e.htmlTable) ,ERDDAP™substituirá esses números especiais com NaN ou ".
* Alguns tipos de dados têm marcadores de valor ausente inerentes que não precisam ser explicitamente identificados commissing\\_valueou atributos \\_FillValue: variáveis flutuantes e duplas têm NaN (Não um número) , Os valores de corda usam a string vazia e os valores de caridade têm caráter\\uffff  (personagem #65535, que é o valor de Unicode para Não um personagem) . Os tipos de dados inteiros não têm marcadores de valor inerentes a falta.
* Se uma variável integer tiver um valor ausente (por exemplo, uma posição vazia em um arquivo .csv) ,ERDDAP™interpretará o valor como definidomissing\\_valueou \\_FillValue para essa variável. Se nenhum for definido,ERDDAP™interpretará o valor como o valor ausente padrão para esse tipo de dados, que é sempre o valor máximo que pode ser mantido por esse tipo de dados:
127 para variáveis byte, 32767 para curto, 2147483647 para int, 9223372036854775807 por muito tempo,
255 para ubyte, 65535 para ushort, 4294967295 para uint, e 18446744073709551615 para ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Cada vezERDDAP™carrega um conjunto de dados, verifica se as variáveis com tipos de dados de fonte de inteiro têm um definidomissing\\_valueou atributo \\_FillValue. Se uma variável não, entãoERDDAP™imprime uma mensagem para o arquivo de log (começando com "Add \\_FillValue Attribute?") recomendando que oERDDAP™administrador adicionar um \\_Fill Atributo de valor para esta variável emdatasets.xml. É muito útil para cada variável ter um \\_FillValue oumissing\\_valueporque os valores ausentes são sempre possíveis, por exemplo, se um determinado arquivo em um conjunto de dados não tiver uma determinada variável,ERDDAP™precisa ser capaz de apresentar essa variável como tendo todos os valores ausentes para essa variável. Se você decidir que uma variável não deve ter um atributo \\_FillValue, você pode adicionar
    &lt;not names="\\_FillValue"&gt;null&lt;/att&gt; em vez disso, que irá suprimir a mensagem para issodatasetID+ combinação variável no futuro.
    
Cada vezERDDAP™inicia-se, recolhe todas essas recomendações em uma mensagem que é escrita no arquivo de log (começando com "ADD \\_FillValue ATTRIBUTES?") , enviado para oERDDAP™administrador e escrito em um arquivo de dados CSV no\\[Diretriz de grande porte\\]/logs / diretório. Se você quiser, você pode usar o programa GerarDatasetsXml (e a opção AddFillValueAttributes) para aplicar todas as sugestões no arquivo CSV para odatasets.xmlficheiro. Para qualquer um dosdatasetID/ combinações variáveis nesse arquivo, se você decidir que não há necessidade de adicionar o atribuído, você pode alterar o atributo&lt;not names="\\_FillValue"&gt;null&lt;/att&gt; para suprimir a recomendação para issodatasetID+ combinação variável no futuro.
    
Isto é importante&#33;
Como Bob disse muitas vezes: seria ruim (e embaraçoso) se algumas das evidências do aquecimento global foram causadas por valores ausentes não identificados nos dados (por exemplo, valores de temperaturas de 99 ou 127 graus\\_ C que deveria ter sido marcado como valores ausentes e, portanto, distorceu as estatísticas médias e/ou medianas mais altas) .

* O \\_FillValue emissing\\_valuevalores para uma determinada variável em diferentes arquivos de origem devem ser consistentes; caso contrário,ERDDAP™aceitará arquivos com um conjunto de valores e rejeitará todos os outros arquivos como "Bad Files". Para resolver o problema,
    * Se os arquivos são gradeados.ncarquivos, você pode usar[EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked).
    * Se os arquivos são arquivos de dados tabulares, você pode usar EDDTableFrom...Files '[padronizar O quê?](#standardizewhat)para contarERDDAPpara padronizar os arquivos de origem como eles são lidosERDDAP.
    * Para problemas mais difíceis, você pode usar[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)para resolver o problema.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (default = 1) e **add\\_offset**   (padrão = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) são atributos variáveis OPTIONAL que descrevem dados que são embalados em um tipo de dados mais simples através de uma transformação simples.
    * Se presente, seu tipo de dados é diferente do tipo de dados de origem e descreve o tipo de dados dos valores de destino.
Por exemplo, uma fonte de dados pode ter armazenado valores de dados flutuantes com um dígito decimal embalado como pequenos pontos (Intérprete) , usandoscale\\_factor= 0,1 eadd\\_offset= 0. Por exemplo,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Neste exemplo,ERDDAP™descompactar os dados e apresentá-los ao usuário como valores de dados flutuantes.
    * Se presente,ERDDAP™irá extrair os valores desses atributos, remover os atributos e descompactar automaticamente os dados para o usuário:
destino Valor = fonte Valor \\*scale\\_factor+add\\_offset  
Ou, declarou outra maneira:
unpackedValue = embalado Valor \\*scale\\_factor+add\\_offset
    * Oscale\\_factoreadd\\_offsetvalores para uma determinada variável em diferentes arquivos de origem devem ser consistentes; caso contrário,ERDDAP™aceitará arquivos com um conjunto de valores e rejeitará todos os outros arquivos como "Bad Files". Para resolver o problema,
        * Se os arquivos são gradeados.ncarquivos, você pode usar[EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Se os arquivos são arquivos de dados tabulares, você pode usar EDDTableFrom...Files '[padronizar O quê?](#standardizewhat)para contarERDDAPpara padronizar os arquivos de origem como eles são lidosERDDAP.
        * Para problemas mais difíceis, você pode usar[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)para resolver o problema.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (do[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)padrão de metadados) é um atributo variável RECOMENDADO emERDDAP. CF mantém a lista de permitidos[Nomes padrão CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Por exemplo,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Se você adicionarstandard\\_namea atributos de variáveis e adicionarstandard\\_namepara a lista de&lt;categoryAttributes&gt; emERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo, os usuários podem facilmente encontrar conjuntos de dados com dados semelhantes viaERDDAP"Search for Datasets by Category" na página inicial.
    * Se você especificar um CFstandard\\_namepara uma variável, as unidades atributo para a variável não têm de ser idênticas às Unidades Canonical especificadas para o nome padrão na tabela CF Standard Name, mas as unidades MUST ser convertíveis para as Unidades Canonical. Por exemplo, todos os CF relacionados à temperaturastandard\\_nametem "K" (Kelvin.) como Unidades Cânones. Assim, uma variável com relação à temperaturastandard\\_nameMUST ter unidades de K, grau\\_C, grau\\_F, ou alguma variante UDUnits desses nomes, uma vez que eles são todos interconversíveis.
    * Melhores práticas: Parte do poder do[vocabulários controlados](https://en.wikipedia.org/wiki/Controlled_vocabulary)vem de usar apenas os termos na lista. Então recomendamos manter os termos definidos no vocabulário controlado, e recomendamos contra a composição de um termo se não houver um apropriado na lista. Se você precisar de termos adicionais, consulte se o comitê de padrões os adicionará ao vocabulário controlado.
    *   standard\\_nameOs valores são os únicos valores de atributos CF que são sensíveis a casos. São sempre todos minúsculos. ComeçarERDDAP™v1.82, GerarDatasets irá converter letras maiúsculas para letras minúsculas. E quando um conjunto de dados é carregadoERDDAP, letras maiúsculas são silenciosamente alteradas para letras minúsculas.
         
###### time\\_precision {#time_precision} 
*   time\\_precisioné um atributo OPTIONAL usado porERDDAP™  (e sem padrões de metadados) para[variáveis tempo e timestamp](#time-units), que pode estar em conjuntos de dados ou conjuntos de dados tabulares, e emaxisVariableoudataVariableS. Por exemplo,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionespecifica a precisão a ser utilizada sempre queERDDAP™formata os valores de tempo dessa variável como strings em páginas web, incluindo.htmlTablerespostas. Em formatos de arquivo ondeERDDAP™formatos vezes como strings (por exemplo, .csv e.json) ,ERDDAP™apenas usa otime\\_precision- formato especificado se incluir segundos fracionários; caso contrário,ERDDAP™usa o 1970-01T00:00 Formato Z.
* Valores válidos são 1970-01, 1970-01-01-01, 1970-01T00Z, 1970-01-01T00:00Z, 1970-01T00:00 (o padrão) , 1970-01T00:00:00:00.0Z, 1970-01T00:00:00:00.00Z, 1970-01T00:00:00.000Z.\\[1970 não é uma opção porque é um único número, entãoERDDAP™não pode saber se é uma cadeia de tempo formatada (um ano) ou se for um número de segundos desde 1970-01T00:00Z.\\]
* Setime\\_precisionnão é especificado ou o valor não é correspondido, o valor padrão será usado.
* Aqui, como em outras partes deERDDAP™, quaisquer campos do tempo formatado que não são exibidos são assumidos ter o valor mínimo. Por exemplo, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, e 1985-07-01T00:00:00 Z são todos considerados equivalentes, embora com diferentes níveis de precisão implícitos. Isto corresponde ao[ISO 8601:2004"extended"Especificação do formato do tempo](https://www.iso.org/iso/date_and_time_format).
*    **ATENÇÃO:** Você só deve usar um limitadotime\\_precisionse **Todos** dos valores de dados para a variável têm apenas o valor mínimo para todos os campos ocultos.
    * Por exemplo, você pode usar umtime\\_precisionde 1970-01-01 se todos os valores de dados têm hora=0, minuto=0, e segundo=0 (por exemplo 2005-03-04T00:00:00Z e 2005-03-05T00:00:00Z) .
    * Por exemplo, não use umtime\\_precisionde 1970-01-01 se houver valores não-0 hora, minuto ou segundos, (por exemplo 2005-03-05T12:00Z) porque o valor de hora não padrão não seria exibido. Caso contrário, se um usuário pedir todos os dados com time=2005-03-05, o pedido falhará inesperadamente.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneé um atributo OPTIONAL usado porERDDAP™  (e sem padrões de metadados) para[variáveis tempo e timestamp](#time-units), que pode estar em conjuntos de dados gradeados ou conjuntos de dados tabulares.
    * O padrão é "Zulu" (que é a versão moderna do fuso horário de GMT) .
    * InformaÃ§Ãμes de fundo: "tempo compensa" (por exemplo, Pacific Standard Time, -08:00, GMT-8) são fixos, específicos, compensações em relação aZulu  (GMT) . Em contraste, "zonas do tempo" são as coisas muito mais complexas que são afetadas pelo Daylight Saving (por exemplo, "US/Pacific") , que tiveram regras diferentes em lugares diferentes em tempos diferentes. Os fusos horários sempre têm nomes, pois não podem ser resumidos por um simples valor de deslocamento (veja a coluna "Nomes de banco de dados TZ" na tabela[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'time\\_zoneatributo ajuda você a lidar com dados de tempo local de algum fuso horário (por exemplo, 1987-03-25T17:32:05 Pacífico Tempo) . Se você tiver dados de tempo de cadeia ou numérica com um (fixo) tempo de deslocamento, você deve simplesmente ajustar os dados paraZulu  (que é o queERDDAP™desejos) especificando um tempo de base diferente no atributo unidades (por exemplo, "horas desde 1970-01T08:00:00Z", note o T08 para especificar o deslocamento do tempo) , e sempre verifique os resultados para garantir que você obtenha os resultados que deseja.
    * Para variáveis de timestamp com dados de origem de Strings, este atributo permite especificar um fuso horário que levaERDDAP™para converter os tempos de origem da zona local (alguns em tempo padrão, alguns em tempo de verão) para dentroZuluvezes (que estão sempre em tempo padrão) . A lista de nomes de fuso horário válidos é provavelmente idêntica à lista na coluna TZ na[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Os fusos horários comuns dos EUA são: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    * Para variáveis de timestamp com dados de origem numérica, você pode especificar o "time\\_zone"atributo, mas o valor deve ser "Zulu"ou "UTC". Se você precisar de suporte para outros fusos horários, por favor envie um e-mail para Chris. John em noaaa.gov .
         
###### unidades{#units} 
*   [ **unidades** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACÓRDÃO](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)padrão de metadados) define as unidades dos valores de dados. Por exemplo,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "unidades" é REQUIREDO como uma fonteAttribute ou um addAttribute para"time"variáveis e é STRONGLY RECOMENDADO para outras variáveis sempre que apropriado (que é quase sempre) .
    * Em geral, recomendamos[UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\- unidades compatíveis que são exigidas pelo[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)padrões.
    * Outro padrão comum é[UCUM](https://unitsofmeasure.org/ucum.html)-- o Código Unificado para Unidades de Medição.[OGC](https://www.ogc.org/)serviços como[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs)e[WMS](https://www.ogc.org/standards/wms)exigem UCUM e muitas vezes referem-se a UCUM como UOM (Unidades de medida) .
    * Recomendamos que você use um padrão de unidades para todos os conjuntos de dados em seuERDDAP. Devias contar.ERDDAP™que padrão você está usando com&lt;unidades\\_standard&gt;, em seu[setup.xml](/docs/server-admin/deploy-install#setupxml)ficheiro.
    * As unidades para uma determinada variável em arquivos de origem diferentes devem ser consistentes. Se você tem uma coleção de arquivos de dados onde um subconjunto dos arquivos usa valores de unidades diferentes de um ou mais outros subconjuntos dos arquivos (por exemplo,
"dias desde 1985-01-01-01" versus "dias desde 2000-01-01",
"degree\\_Celsius" versus "deg\\_C", ou
"knots" versus "m/s") você precisa encontrar uma maneira de padronizar os valores das unidades, caso contrário,ERDDAP™só carregará um subconjunto dos arquivos. Pense nisso: se um arquivo tiver windSpeed units=knots e outro tiver windSpeed units=m/s, então os valores dos dois arquivos não devem ser incluídos no mesmo conjunto de dados agregados.
        * Se os arquivos são gradeados.ncarquivos, em muitas situações você pode usar[EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Se os arquivos são arquivos de dados tabulares, em muitas situações você pode usar EDDTableFrom...Files '[padronizar O quê?](#standardizewhat)para contarERDDAPpara padronizar os arquivos de origem como eles são lidosERDDAP.
        * Para problemas mais difíceis, você pode usar[NcML](#ncml-files)ou[NCO](#netcdf-operators-nco)para resolver o problema.
    * A seção padrão CF 8.1 diz que se os dados de uma variável forem embalados via[scale\\_factore/ouadd\\_offset](#scale_factor), "As unidades de uma variável devem ser representativas dos dados não embalados."
    *   [Para variáveis de tempo e timestamp,](#time-units)ou a variável[Atributos de fonte](#variable-addattributes)ou&lt;addAttributes&gt; (que tem precedência) MAIS[unidades](#units)que é ou
        
        * Para variáveis do eixo do tempo ou variáveis de dados do tempo com dados numéricos:[UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\- string compatível (com o formato *unidades* desde então *baseTime* ) descrevendo como interpretar valores de tempo de origem (por exemplo, segundos desde 1970-01-01T00:00Z) .
            
         *unidades* pode ser qualquer um de:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Tecnicamente,ERDDAP™não segue oUDUNITSpadrão ao converter"years since"e"months since"valores de tempo para"seconds since". OUDUNITSpadrão define um ano como um valor fixo, único: 3.15569259747e7 segundos. EUDUNITSdefine um mês como ano/12. Infelizmente, a maioria/todos os conjuntos de dados que vimos que usam"years since"ou"months since"claramente pretendem que os valores sejam anos de calendário ou meses de calendário. Por exemplo, 3"months since 1970-01-01"é geralmente destinado a significar 1970-04-01. Então...ERDDAP™interpreta"years since"e"months since"como anos de calendário e meses, e não segue estritamente oUDUNITSpadrão.
            
O *baseTime* deve ser uma ISO 8601:2004 (E) data formatada cadeia de tempo (yyyy-MM-dd'T'HH:mm:ssZ, por exemplo, 1970-01T00:00:00Z) , ou alguma variação disso (por exemplo, com partes faltando no final) .ERDDAP™tenta trabalhar com uma ampla gama de variações desse formato ideal, por exemplo, "1970-1-1 0:0:0" é suportado. Se a informação do fuso horário estiver faltando, presume-se que seja oZulufuso horário (AKA GMT) . Mesmo que outro deslocamento de tempo seja especificado,ERDDAP™nunca usa o horário de verão. Se o baseTime usa algum outro formato, você deve usar&lt;addAttributes&gt; especificar uma nova cadeia de unidades que utilize uma variação do ISO 8601:2004 (E) formato (por exemplo, dias de mudança desde 1 de janeiro de 1985 em dias desde 1985-01-01-01.
        
Você pode testarERDDAPcapacidade de lidar com um específico *unidades* desde então *baseTime* comERDDAP'[Conversor de Tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Esperemos que você possa conectar um número (o primeiro valor da fonte de dados?) e uma cadeia de unidades, clique em Converter eERDDAP™será capaz de convertê-lo em um ISO 8601:2004 (E) data formatada cadeia de tempo. O conversor retornará uma mensagem de erro se a cadeia de unidades não for reconhecível.

###### Unidades de tempo de corda{#string-time-units} 
*   [Para as unidades atribuem por variáveis de dados de tempo ou timestamp com dados String,](#string-time-units)você deve especificar um[java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)padrão (que é principalmente compatível com java.text. Simples de usar) que descreve como interpretar os tempos de cadeia.
    
Para os formatos de tempo comumente usados que são variações do ISO 8601:2004 (E) formato padrão (por exemplo, 2018-01-02T00:00Z) , você pode especificar variações deyyyy-MM-dd'T'HH:mm:ssZ, por exemplo, useyyyy-MM-ddse o tempo de cadeia só tiver uma data. Para qualquer formato que comece com yyyy-M,ERDDAPusa um parser especial que é muito perdoando de pequenas variações no formato. O parser pode lidar com fusos horários no formato 'Z', "UTC", "GMT", ±XX:XX, ±XXXX e formatos ±XX. Se partes do tempo de data não forem especificadas (por exemplo, minutos e segundos) ,ERDDAP™assume o menor valor para esse campo (por exemplo, se os segundos não forem especificados, segundos=0 é assumido) .
    
Para todos os outros formatos de tempo de cadeia de caracteres, você precisa especificar precisamente uma cadeia de formato de tempo compatível com DateTimeFormatter. Tipo...yyyy-MM-dd'T'HH:mm:ssZ, estas cadeias de formato são construídas a partir de caracteres que identificam um tipo específico de informação da cadeia de tempo, por exemplo, m significa minuto de hora. Se você repetir o caractere de formato algum número de vezes, ele refinará ainda mais o significado, por exemplo, m significa que o valor pode ser especificado por qualquer número de dígitos, mm significa que o valor deve ser especificado por 2 dígitos. OJavadocumentação para DateTimeFormatter é uma visão geral bruta e não torna esses detalhes claros. Então aqui está uma lista de variações de caracteres de formato e seu significado dentroERDDAP™  (que às vezes é ligeiramente diferente deJavaDataTimeFormatter) :
    
    |Personagens|Exemplos|Significado|
    |-...|-...|-...|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|um número de ano, qualquer número de dígitos.ERDDAP™guloseimas y (ano de idade) e Y (ano baseado na semana, porque isso é frequentemente usado erroneamente em vez de y) como u, o[número de ano astronômico](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Os anos astronômicos são inteiros positivos ou negativos que não usam o BC (A.C.) ou CE (ANÚNCIA) designadores da era: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |uuuuu, yyyy, Sim.|\\-4712, 0000, 0001, 0010, 0100, 2018|um número de ano astronômico de 4 dígitos (ignorando qualquer precedente '-)  |
    |M|1, 01, 12|um número de mês, qualquer número de dígitos (1 de Janeiro)  |
    |MM|01, 12|a 2 dígitos (zero acolchoado) número do mês|
    |MMM|Jan, jan, JAN|a 3 letra Nome do mês inglês, caso insensível|
    |MMMM|Janeiro, Janeiro, Janeiro, Janeiro, Janeiro, JANEIRO|uma letra 3 ou nome completo do mês Inglês, caso insensível|
    |D|1, 01, 31|um número de dia de mês, qualquer número de dígitos|
    |D|01, 31|a 2 dígitos (zero acolchoado) dia de mês. O primeiro 'digit' pode ser um espaço.|
    |D|1, 001, 366|dia-de-ano, qualquer número de dígitos, 001=Jan 1|
    |DDD|001, 366|dia de ano, 3 dígitos, 001=Jan 1|
    |E|thu, THU, Thu|uma carta dia-de-semana, o valor é ignorado ao analisar|
    |E|quinta-feira, quinta-feira|uma letra 3 ou dia-de-semana inglês completo, caso insensível, o valor é ignorado ao analisar|
    |H. H.|0, 00, 23|H hora do dia (0-23) , qualquer número de dígitos|
    |HH|00, 23|HH hora do dia (00-23) 2 dígitos. O primeiro 'digit' pode ser um espaço.|
    |um|am, AM, pm, PM|AM ou PM, caso-insensível|
    |h|12, 1, 01, 11|relógio de hora-de-m-pm (12, 1, 2, ... 11) , qualquer número de dígitos|
    |Hã|12, 01, 11|relógio de hora-de-m-pm (12, 1, 2, ... 11) 2 dígitos. O primeiro 'digit' pode ser um espaço.|
    |KK|1, 11|hora de am-pm (0, 1, ...11) , qualquer número de dígitos|
    |KKK|00, 01, 11|hora-de-am-pm, 2 dígitos|
    |m|0, 00, 59|minuto de hora, qualquer número de dígitos|
    |mm|00, 59|minuto de hora, 2 dígitos|
    |S|0, 00, 59|segundo minuto, qualquer número de dígitos|
    |S|00, 59|2 dígitos|
    |S|0, 000, 9, 999|fração de segundo, como se segue um ponto decimal, qualquer número de dígitos|
    |SS|00, 99|centos de um segundo, 2 dígitos|
    |SISTEMA|000, 999|milhares de segundo, 3 dígitos|
    |A|0, 0000, 8639999999|millisecond-of-day, qualquer número de dígitos|
    |AAAAAAAA|00000000, 8639999999|millisecond-of-day, 8 dígitos|
    |N|0, 00000000000000, 8639999999999999999999|nanossegundos-de-dia, qualquer número de dígitos. EmERDDAP™, isto é truncado para nMillis.|
    |NNNNNNNNNNNNNNN|00000000000000, 86399999999999999999|nanossegundo dia, 14 dígitos. EmERDDAP™Isto é truncado para nMillis.|
    |n|0, 00000000000, 5999999999999|nanossegundo de segundo, qualquer número de dígitos. EmERDDAP™Isto é truncado para nMillis.|
    |NENHUMN|00000000000, 599999999999999|nanossegundo de segundo, 11 dígitos. EmERDDAP™Isto é truncado para nMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|um fuso horário com o formato 'Z' ou ± (deslocamento de 2 dígitos hora) : (deslocamento de 2 dígitos minuto) . Isto trata *espaço* como + (não padrão) . ZZZ suportando 'Z' não é padrão, mas lida com um erro de usuário comum.|
    |XX, ZZ|Z -0800, +0100|um fuso horário com o formato 'Z' ou ± (deslocamento de 2 dígitos hora) : (deslocamento de 2 dígitos minuto) . Isto trata *espaço* como + (não padrão) . ZZ suportando 'Z' não é padrão, mas lida com um erro de usuário comum.|
    |X, Z|Z, -08, +01|um fuso horário com o formato 'Z' ou ± (deslocamento de 2 dígitos hora) : (deslocamento de 2 dígitos minuto) . Isto trata *espaço* como + (não padrão) . Z suportando 'Z' não é padrão, mas lida com um erro de usuário comum.|
    |?|\\-08:00, +01:00|um fuso horário com o formato ± (deslocamento de 2 dígitos hora) : (deslocamento de 2 dígitos minuto) . Isto trata *espaço* como + (não padrão) .|
    |xxxx|+0100|um fuso horário com o formato ± (deslocamento de 2 dígitos hora)  (deslocamento de 2 dígitos minuto) . Isto trata *espaço* como + (não padrão) .|
    |x|\\-08, +01|um fuso horário com o formato ± (deslocamento de 2 dígitos hora) . Isto trata *espaço* como + (não padrão) .|
    |'|'T', 'Z', 'GMT'|início e fim de uma série de caracteres literais|
    |' ' (duas citações únicas)  |' '|duas únicas citações denota uma única citação literal|
    | \\[\\] | \\[ \\] |o início ("\\[") e fim ("\\]") de uma seção opcional. Esta notação é suportada apenas para caracteres literais e no final da cadeia de formato.|
    |#, &#123;, &#125;|#, &#123;, &#125;|reservado para uso futuro|
    |G, L, Q,e,c,V,z,O,p|     |Estes caracteres de formatação são suportados porJava's DateTimeFormatter, mas atualmente não suportado porERDDAP. Se você precisar de suporte para eles, e-mail Chris. John em noaaa.gov .|
    
Notas:
    
    * Em um tempo de data com pontuação, valores numéricos podem ter um número variável de dígitos (por exemplo, no formato de data de folga dos EUA "1/2/1985", o mês e a data podem ser 1 ou 2 dígitos) assim o formato deve usar tokens de 1 letra, por exemplo, M/d/yyyyy, que aceitam qualquer número de dígitos por mês e data.
    * Se o número de dígitos para um item for constante, por exemplo, 01/02/1985, em seguida, especifique o número de dígitos no formato, por exemplo, MM/dd/yyyyyyyyy para 2 dígitos mês, data de 2 dígitos e 4 dígitos ano.
    * Estes formatos são complicados para trabalhar com. Um determinado formato pode funcionar para a maioria, mas não todos, strings de tempo para uma determinada variável. Sempre verifique se o formato que você especificar está funcionando como esperado emERDDAPpara todas as cadeias de tempo de uma variável.
    * Quando possível, GerarDatasetXml sugerirá strings de formato de tempo.
    * Se você precisar de ajuda para gerar uma string de formato, envie um e-mail para Chris. John em noaaa.gov .

A principal variável de dados de tempo (para conjuntos de dados tabulares) e a variável principal eixo de tempo (para conjuntos de dados gradeados) são reconhecidos pelo[destinationName](#destinationname)Hora. Seus metadados de unidades devem ser uma cadeia de unidades compatíveis com UDUnits para valores numéricos de tempo, por exemplo, "dias desde 1970-01-01" (para conjuntos de dados tabulares ou gradeados) ou[unidades adequadas para tempos de cadeia](#string-time-units)Por exemplo, "M/d/yyyyyy" (para conjuntos de dados tabulares) .

Unidades de tempo diferentes em diferentes grades.ncArquivos - Se você tem uma coleção de grade.ncarquivos onde, para a variável de tempo, um subconjunto dos arquivos usa unidades de tempo diferentes de um ou mais outros subconjuntos dos arquivos, você pode usar[EDDGridA partir de NcFilesUnpacked](#eddgridfromncfilesunpacked). Converte valores de tempo para"seconds since 1970-01-01T00:00:00Z"em um nível inferior, escondendo assim as diferenças, para que você possa fazer um conjunto de dados da coleção de arquivos heterogêneos.

###### Variáveis de fuso horário{#timestamp-variables} 
[Variáveis de fuso horário](#timestamp-variables)- ... Qualquer outra variável (axisVariableoudataVariableEm umEDDGridou conjunto de dados EDDTable) pode ser uma variável timeStamp. As variáveis de timestamp são variáveis que têm unidades relacionadas ao tempo e dados de tempo, mas têm&lt;destinationName&gt; excepto o tempo. As variáveis TimeStamp comportam-se como a variável de tempo principal na medida em que convertem o formato de tempo da fonte em"seconds since 1970-01-01T00:00:00Z"e/ou ISO 8601:2004 (E) formato).ERDDAP™reconhece o tempo Variáveis do carimbo por seu tempo relacionado "[unidades](#units)" metadados, que devem corresponder a esta expressão regular "\\[a-zA-Z\\]+ + uma vez +\\[0-9\\].+ (para data numérica Times, por exemplo,"seconds since 1970-01-01T00:00:00Z") ou ser uma data string de formato de tempo contendo "uuuuu", "yyyy" ou "YYYY" (por exemplo, "yyyy-MM-dd"T'HH:mm:sZ") . Mas por favor ainda usedestinationName "time"para a data principal Variável de tempo.

 **Verifique sempre o seu trabalho para ter certeza de que os dados de tempo que aparecemERDDAP™é os dados de tempo corretos.** Trabalhar com dados de tempo é sempre complicado e propenso a erros.

Ver[mais informações sobre variáveis de tempo](#destinationname).
ERDDAP™tem um utilitário para[Converter um numérico Tempo para / de um tempo de corda](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Ver[Como?ERDDAP™Lidas com o tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** ou **valid\\_min** e **valid\\_max** ](#valid_range)- ... Estes são atributos variáveis OPTIONAL definidos no[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)convenções de metadados. Por exemplo,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

ou

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Se presente, eles devem ser do mesmo tipo de dados que a variável, e especificar os valores mínimos e máximos válidos dos dados para essa variável. Os usuários devem considerar valores fora deste intervalo para ser inválido.
    *   ERDDAP™não aplica ovalid\\_range. Disse outra maneira:ERDDAP™não converte valores de dados fora dovalid\\_rangepara o \\_Fill Valor ou valormissing\\_value.ERDDAP™apenas passa neste metadados e deixa o aplicativo até você.
Porquê? É para isso que servem os metadados. Se o provedor de dados quisesse, o provedor de dados poderia ter convertido os valores de dados fora dovalid\\_rangepara ser \\_FillValues.ERDDAP™não segundo adivinhe o provedor de dados. Esta abordagem é mais segura: se for mais tarde mostrado que ovalid\\_rangeera muito estreito ou incorreto,ERDDAP™Não terá apagado os dados.
    * Se os dados forem embalados[scale\\_factore/ouadd\\_offset](#scale_factor),valid\\_range,valid\\_minevalid\\_maxdeve ser o tipo de dados embalado e valores. Desde entãoERDDAP™aplica-sescale\\_factoreadd\\_offsetquando ele carrega o conjunto de dados,ERDDAP™vai desfazer o pacotevalid\\_range,valid\\_minevalid\\_maxvalores para que os metadados de destino (mostrado aos usuários) indicará o tipo e o intervalo de dados não embalados.
Ou, se um unpacked\\_valid\\_rangeatributo está presente, ele será renomeadovalid\\_rangequandoERDDAP™carrega o conjunto de dados.
##### &lt;removeMVRows &gt;{#removemvrows} 
* Não. ** &lt;removeMVRows&gt; ** ] (#removemvrows) é uma tag OPTIONAL dentro de uma tag emdatasets.xmlpara EDDTable FromFiles (incluindo todas as subclasses) conjuntos de dados, embora seja usado apenas para EDDTableFromMultidimNcFiles. Pode ter um valor de verdadeiro ou falso. Por exemplo, verdadeiro
Isso remove qualquer bloco de linhas no final de um grupo onde todos os valores sãomissing\\_value, \\_FillValue, ou o CoHort ...Array valor perdido nativo (ou char=#32 para CharArrays) . Isto é para o tipo de arquivo CF DSG Multidimensional Array e arquivos semelhantes. Se for verdade, isso faz o teste adequado e assim sempre carrega todas as variáveis de dim máximo, então pode levar tempo extra.
O valor padrão é falso.
Recomendação -- Se possível para o seu conjunto de dados, recomendamos definir removeMVRows para false. Definir removeMVRows para true pode reduzir significativamente as solicitações, embora possam ser necessárias para alguns conjuntos de dados.
