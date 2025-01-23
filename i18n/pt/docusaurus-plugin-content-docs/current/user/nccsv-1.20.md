---
title: "NCCSV 1.20"
---

# NCCSV -
ANetCDF-Compatível, UTF-8, CSV Especificação do arquivo,
Versão 1.20

Bob Simons e Steve Hankin
"NCCSV" por Bob Simons e Steve Hankin é licenciado sob[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## [Introdução](#introduction) {#introduction} 

Este documento especifica um formato de arquivo de texto CSV UTF-8 que pode conter todas as informações (metadados e dados) que pode ser encontrado em umNetCDF .ncarquivo que contém uma tabela CSV-file-como de dados. A extensão de arquivo para um arquivo de texto CSV UTF-8 após esta especificação deve ser .csv para que ele possa ser lido facilmente e corretamente em programas de planilha como Excel e Google Sheets. Bob Simons vai escrever software para converter um arquivo NCCSV em umNetCDF-3 (e talvez também umNetCDF-4)  .ncarquivo, e o reverso, sem perda de informação. Bob Simons modificado[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)para apoiar a leitura e a escrita deste tipo de arquivo.

O formato NCCSV é projetado para que o software de planilha, como Excel e Google Sheets, possa importar um arquivo NCCSV como um arquivo csv, com todas as informações nas células da planilha prontas para edição. Ou, uma planilha pode ser criada a partir do zero após as convenções NCCSV. Independentemente da fonte da planilha, se for então exportada como um arquivo .csv, ela estará em conformidade com a especificação NCCSV e nenhuma informação será perdida. As únicas diferenças entre arquivos NCCSV e os arquivos de planilha analógicos que seguem essas convenções são:

* Arquivos NCCSV têm valores em uma linha separada por vírgulas.
As planilhas têm valores em uma linha em células adjacentes.
* Strings em arquivos NCCSV são muitas vezes cercados por citações duplas.
Strings em planilhas nunca são cercados por citações duplas.
* Cotações duplas internas (") em Strings em arquivos NCCSV aparecem como 2 citações duplas.
Aspas duplas internas em planilhas aparecem como 1 cotação dupla.

Ver[Folha de cálculo](#spreadsheets)seção abaixo para mais informações.

### Streamable{#streamable} 
Como arquivos CSV em geral, arquivos NCCSV são transmissíveis. Assim, se um NCSV é gerado on-the-fly por um servidor de dados, como[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html), o servidor pode começar a transmitir dados ao solicitante antes de todos os dados terem sido recolhidos. Esta é uma característica útil e desejável.NetCDFarquivos, por contraste, não são córregos.

### ERDDAP {#erddap} 
Esta especificação é projetada para que os arquivos NCCSV e os.ncarquivos que podem ser criados a partir deles podem ser usados por um[ERDDAP™servidor de dados](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (através do[EDDTable De NccsvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles)e[EDDTable De NcFiles](/docs/server-admin/datasets#eddtablefromncfiles)tipos de conjuntos de dados) , mas esta especificação é externaERDDAP.ERDDAP™tem vários atributos globais necessários e muitos atributos globais e variáveis recomendados, principalmente baseados em atributos CF e ACDD (veja
[/docs/server-admin/datasets#global-attributes](/docs/server-admin/datasets#global-attributes)).

### Balanço{#balance} 
O design do formato NCCSV é um equilíbrio de vários requisitos:

* Os arquivos devem conter todos os dados e metadados que estariam em um tabularNetCDFarquivo, incluindo tipos de dados específicos.
* Os arquivos devem ser capazes de ser lidos e depois escritos de uma planilha sem perda de informações.
* Os arquivos devem ser fáceis de criar, editar, ler e entender.
* Os arquivos devem ser capazes de ser inequivocamente analisados por programas de computador.

Se algum requisito neste documento parece estranho ou picante, provavelmente é necessário atender a um desses requisitos.

### Outras especificações{#other-specifications} 
Esta especificação refere-se a várias outras especificações e bibliotecas com as quais ele é projetado para trabalhar, mas esta especificação não é uma parte de qualquer uma dessas outras especificações, nem precisa de quaisquer mudanças para eles, nem que ele conflite com eles. Se um detalhe relacionado a uma dessas normas não for especificado aqui, consulte a especificação relacionada. Notavelmente, isso inclui:

* A Convenção de Atributo para o Descobrimento de Dados (ACÓRDÃO) padrão de metadados:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3).
* O clima e a previsão (CF) padrão de metadados:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).
* ONetCDFGuia do utilizador (NUG) :
    [ https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
* ONetCDFbibliotecas de software comoNetCDF-java eNetCDF-C.
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/). Essas bibliotecas não podem ler arquivos NCCSV, mas podem ler.ncarquivos criados a partir de arquivos NCCSV.
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### Notação{#notation} 
Nesta especificação, suportes,\\[ \\], denote itens opcionais.

## [Estrutura de arquivo](#file-structure) {#file-structure} 

Um arquivo NCCSV completo consiste em duas seções: a seção metadados, seguida pela seção de dados.

Arquivos NCCSV podem conter quaisquer caracteres UCS-2 (ou seja, caracteres Unicode de 2 bytes, como emJava) codificado via UTF-8.ERDDAP™lê e escreve arquivos NCCSV usando a codificação UTF-8.

Arquivos NCCSV podem usar qualquer nova linha (\\n)   (que é comum em computadores Linux e Mac OS X) ou carruagemReturn plus newline (\\r\\n)   (que é comum em computadores Windows) como marcadores de fim de linha, mas não ambos.

### .nccsvMetadados{#nccsvmetadata} 
Quando tanto o criador quanto o leitor estão esperando, também é possível e às vezes útil fazer uma variante de um arquivo NCCSV que contém apenas a seção de metadados (incluindo\\*END\\_METADATA\\*linha de linha) . O resultado fornece uma descrição completa dos atributos do arquivo, nomes variáveis e tipos de dados, servindo assim a mesma finalidade que as respostas .das plus .dds de umaOPeNDAPservidor.ERDDAP™retornará esta variação se você solicitar o arquivo Tipo....nccsvMetadados de umERDDAP™conjunto de dados.

## [A seção de metadados](#the-metadata-section) {#the-metadata-section} 

Em um arquivo NCCSV, cada linha da seção de metadados usa o formato
[variável Nome](#variablename),[atributos Nome](#attributename),[valor1](#value)\\[, valor2\\]\\[, valor3\\]\\[, valor4\\]\\[...\\]  
Espaços antes ou após itens não são permitidos porque causam problemas ao importar o arquivo em programas de planilha.

### Convenções{#conventions} 
A primeira linha de um arquivo NCCSV é a primeira linha da seção de metadados e deve ter uma[\\*GLOBAL\\*](#global)Convenções atribuem a listagem de todas as convenções utilizadas no arquivo como uma string contendo uma lista CSV, por exemplo:
\\*GLOBAL\\*"Convenções"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.2"
Uma das convenções listadas deve ser NCCSV-1.2, que se refere à versão atual desta especificação.

### End Metadata{#end-metadata} 
O fim da seção de metadados de um arquivo NCCSV deve ser denotado por uma linha com apenas
\\*END\\_METADATA\\*

Recomenda-se, mas não é necessário que todos os atributos para uma determinada variável apareçam em linhas adjacentes da seção metadados. Se um arquivo NCCSV for convertido em umNetCDFarquivo, a ordem de que a variávelNames aparece primeiro na seção metadados será a ordem das variáveis naNetCDFficheiro.

Linhas em branco opcionais são permitidas na seção de metadados após a primeira linha necessária com[\\*GLOBAL\\*](#global) [Convenções](#conventions)informação (ver abaixo) e antes da última linha exigida com\\*END\\_METADATA\\*.

Se uma planilha for criada a partir de um arquivo NCCSV, a seção de dados de metadados aparecerá com nomes variáveis na coluna A, nomes de atributos na coluna B e valores na coluna C.

Se uma planilha que segue estas convenções for salva como um arquivo CSV, muitas vezes haverá vírgulas extras no final das linhas na seção metadados. O software que converte arquivos NCCSV em.ncarquivos irá ignorar as vírgulas extra.

### [variável Nome](#variablename) {#variablename} 

 *variável Nome* é o nome sensível ao caso de uma variável no arquivo de dados. Todos os nomes variáveis devem começar com uma letra ASCII de 7 bits ou underscore e ser composta de letras ASCII de 7 bits, sublinhados e dígitos ASCII de 7 bits.
#### GLOBAL{#global} 
A variável especialNome[\\*GLOBAL\\*](#global)é usado para denotar metadados globais.

### [atributos Nome](#attributename) {#attributename} 

 *atributos Nome* é o nome sensível ao caso de um atributo associado a uma variável ou[\\*GLOBAL\\*](#global). Todos os nomes de atributos devem começar com uma letra ASCII de 7 bits ou underscore e ser composta de letras ASCII de 7 bits, sublinhados e dígitos ASCII de 7 bits.

#### SCALAR{#scalar} 
O atributo especial Nome\\*SCALAR\\*pode ser usado para criar uma variável de dados escalar e definir seu valor. O tipo de dados do\\*SCALAR\\*define o tipo de dados para a variável, portanto, não especifique um\\*DATA\\_TYPE\\*atributo para variáveis escalares. Note que não deve haver dados para a variável escalar na Seção de Dados do arquivo NCCSV.

Por exemplo, para criar uma variável escalar chamada "nave" com o valor "Okeanos Explorer" e um atributo cf\\_role, use:
navio,\\*SCALAR\\*"Okeanos Explorer"
navio,cf\\_role,trajectory\\_id
Quando uma variável de dados escalar é lida emERDDAP™, o valor escalar é convertido em uma coluna na tabela de dados com o mesmo valor em cada linha.

### [valor](#value) {#value} 

 *valor* é o valor do atributo metadados e deve ser um array com um ou mais de um byte, ubyte, curto, ushort, int, uint, longo, ulong, flutuador, duplo, String, ou char. Nenhum outro tipo de dados é suportado. Atributos sem valor serão ignorados. Se houver mais de um subvalor, os subvalores devem ser todos do mesmo tipo de dados. Para tipos de dados que não Strings, os valores devem ser separados por vírgulas, por exemplo:
sst,actual\\_range,0.17f,23.58f
Para cordas, use uma única corda com\\n  (nova linha) caracteres que separam as substrings.

As definições dos tipos de dados de atributos são:

#### bytes{#byte} 
* byte atributos (8 bits, assinado) deve ser escrito com o sufixo 'b', por exemplo, -7b, 0b, 7b . A gama de valores byte válidos é -128 a 127. Um número que parece um byte, mas é inválido (por exemplo, 128b) será convertido em um valor ausente ou gerar uma mensagem de erro.
     
#### O que é?{#ubyte} 
* valores de atributos ubyte (8 bits, sem assinatura) deve ser escrito com o sufixo 'ub', por exemplo, 0ub, 7ub, 250ub . A gama de valores byte válidos é de 0 a 255. Um número que parece um ubyte mas é inválido (por exemplo, 256ub) será convertido em um valor ausente ou gerar uma mensagem de erro. Quando possível, use byte em vez de ubyte, porque muitos sistemas não suportam bytes não assinados (por exemplo, atributosNetCDF-3 arquivos) .
     
#### curto{#short} 
* valores de atributos curtos (16 bits, assinado) deve ser escrito com o sufixo 's', por exemplo, -30000s, 0s, 30000s. A gama de valores curtos válidos é -32768 a 32767. Um número que parece curto, mas é inválido (por exemplo, 32768s) será convertido em um valor ausente ou gerar uma mensagem de erro.
     
#### - Não.{#ushort} 
* valores de atributos ushort (16 bits, sem assinatura) deve ser escrito com o sufixo 'us', por exemplo, 0us, 30000us, 60000us. A gama de valores curtos válidos é de 0 a 65535. Um número que parece um ushort mas é inválido (por exemplo, 65536us) será convertido em um valor ausente ou gerar uma mensagem de erro. Quando possível, use curto em vez de ushort, porque muitos sistemas não suportam bytes não assinados (por exemplo, atributosNetCDF-3 arquivos) .
     
#### bytes{#byte-1} 
* valores de atributos (32 bits, assinado) deve ser escrito como ints JSON sem um ponto decimal ou exponente, mas com o sufixo 'i', por exemplo, -12067978i, 0i, 12067978i. A gama de valores int válidos é -2147483648 para 2147483647. Um número que parece uma formiga mas é inválido (por exemplo, 2147483648i) será convertido em um valor ausente ou gerar uma mensagem de erro.
     
#### *{#uint} 
* valores de atributos (32 bits, sem assinatura) deve ser escrito como ints JSON sem um ponto decimal ou exponente, mas com o sufixo 'ui', por exemplo, 0ui, 12067978ui, 4123456789ui. A gama de valores int válidos é de 0 a 4294967295. Um número que parece um uint mas é inválido (por exemplo, 2147483648ui) será convertido em um valor ausente ou gerar uma mensagem de erro. Quando possível, use int em vez de uint, porque muitos sistemas não suportam bytes não assinados (por exemplo, atributosNetCDF-3 arquivos) .
     
#### longo{#long} 
* valores de atributos longos (64 bits, assinados, atualmente suportados por NUG eERDDAP™mas ainda não suportado por CF) deve ser escrito sem um ponto decimal e com o sufixo 'L', por exemplo, -12345678987654321L, 0L, 12345678987654321L . Se você usar o software de conversão para converter um arquivo NCCSV com valores longos em umNetCDF-3 arquivo, quaisquer valores longos serão convertidos em valores duplos. A gama de valores longos válidos é -9223372036854775808 a 9223372036854775807. Um número que parece longo, mas é inválido (por exemplo, 9223372036854775808L) será convertido em um valor ausente ou gerar uma mensagem de erro. Quando possível, use o dobro em vez de ulong, porque muitos sistemas não suportam muito (por exemplo,NetCDF-3 arquivos) .
     
#### ulongo{#ulong} 
* valores de atributo ulong (64 bits, não assinados, atualmente suportados por NUG eERDDAP™mas ainda não suportado por CF) deve ser escrito sem um ponto decimal e com o sufixo 'uL', por exemplo, 0uL, 12345678987654321uL, 9007199254740992uL . Se você usar o software de conversão para converter um arquivo NCCSV com valores longos em umNetCDF-3 arquivo, quaisquer valores longos serão convertidos em valores duplos. A gama de valores longos válidos é de 0 a 18446744073709551615. Um número que parece um ulong mas é inválido (por exemplo, 184467440737095516uL) será convertido em um valor ausente ou gerar uma mensagem de erro. Quando possível, use o dobro em vez de ulong, porque muitos sistemas não suportam assinados ou não assinados longos (por exemplo,NetCDF-3 arquivos) .
     
#### flutuar{#float} 
* valores de atributo float (32 bits) deve ser escrito com o sufixo 'f' e pode ter um ponto decimal e/ou um expoente, por exemplo, 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Use NaNf para um flutuador NaN (desaparecido) valor. A gama de flutuadores é aproximadamente +/-3.40282347E+38f (~7 dígitos decimais significativos) . Um número que parece um flutuador, mas é inválido (por exemplo, 1.0e39f) será convertido em um valor ausente ou gerar uma mensagem de erro.
     
#### duplo{#double} 
* valores de atributo duplo (64 bits) deve ser escrito com o sufixo 'd' e pode ter um ponto decimal e/ou um expoente, por exemplo, 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Use NaNd para um NaN duplo (desaparecido) valor. A gama de duplos é aproximadamente +/-1.79769313486231570E+308d (~15 dígitos decimais significativos) . Um número que parece um duplo, mas é inválido (por exemplo, 1.0e309d) será convertido em um valor ausente ou gerar uma mensagem de erro.
     
#### String{#string} 
* Os valores de atributos de string são uma sequência de caracteres UCS-2 (ou seja, caracteres Unicode de 2 bytes, como emJava) , que deve ser escrito como cordas JSON-como.
    * Cotações duplas (") dentro de um valor de string deve ser codificado como duas citações duplas (") . É isso que os programas de planilha exigem ao ler arquivos .csv. É isso que os programas de planilha escrevem quando você salva uma planilha como um arquivo .csv.
    * Os caracteres de backslash codificados JSON especiais dentro de um valor String devem ser codificados como em JSON (nomeadamente\\n(newline), \\\\\ (backslash), \\f (formfeed), \\t (tab), \\r (retorno de transporte) ou com o[\\u *Hhhhhhh* ](#uhhhh)sintaxe. Em uma planilha, não use Alt Enter para especificar uma nova linha dentro de uma célula de texto; em vez disso, use\\n  (2 caracteres: backslash e 'n ') para indicar uma nova linha.
##### uhhhh {#uhhhh} 
    * Todos os outros caracteres menos do que o caracter #32 devem ser codificados com a sintaxe \\u *Hhhhhhh* , onde hhhhh é o número hexadecimal de 4 dígitos do personagem.
    * Todos os caracteres imprimíveis maiores que o caracter #126, por exemplo, o sinal Euro, podem aparecer não codificados, por exemplo, € (O carácter euro) , ou codificado com o[\\u *Hhhhhhh* ](#uhhhh)sintaxe, por exemplo, \\u20AC. Veja as páginas de código referenciadas em[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)para encontrar os números hexadecimais associados a caracteres Unicode específicos, ou usar uma biblioteca de software. Note que algunsERDDAP™tipos de arquivo de saída, por exemplo, .csv, use o conjunto de caracteres ISO 8859-1, então os caracteres Unicode acima de #255 serão perdidos quando esses valores de dados são escritos para esses tipos de arquivo.
    * Todos os caracteres não imprimíveis maiores do que o caracter #126, por exemplo, o caracter #127, são STRONGLY DISCOURAGED, mas você deve usar o \\u *Hhhhhhh* sintaxe se você as incluir.
    * Se o String tem um espaço no início ou fim, ou inclui " (citação dupla) ou uma vírgula, ou contém valores que seriam interpretados de outra forma como alguns outros tipos de dados (por exemplo, uma formiga) , ou é a palavra "null", todo o String deve ser incluído em citações duplas; caso contrário, ao contrário de JSON, as citações duplas de encerramento são opcionais. Recomendamos: quando em dúvida, inclua toda a corda em citações duplas. Espaços no início ou fim de uma corda são fortemente desencorajados.
         
#### Charlie.{#char} 
* valores de atributo char são um único caractere UCS-2 (ou seja, caracteres Unicode de 2 bytes, como emJava) . Personagens imprimíveis (além de caracteres especiais como newline, ", ', e \\) pode ser escrito como é. Personagens especiais (por exemplo, nova linha) e outros caracteres imprimíveis (por exemplo, #127) deve ser escrito com o[\\u *Hhhhhhh* ](#uhhhh)sintaxe. Os valores do atributo Char devem ser incluídos em citações únicas (as citações internas) e citações duplas (as citações externas) Por exemplo: (um caractere de citação dupla) , "'\'''" (um único caractere de citação) , "'\t'" (uma guia) , "'\\u007F'" (o excluir 'caracter ') e "'" (O carácter euro) . Este sistema de usar citações simples e duplas é estranho e pesado, mas é uma maneira de distinguir valores de carvão de Strings de uma maneira que funciona com planilhas. Um valor que parece um char mas é inválido irá gerar uma mensagem de erro. Note que algunsERDDAP™tipos de arquivo de saída, por exemplo, .csv, use o conjunto de caracteres ISO 8859-1, então os caracteres Unicode acima de #255 serão perdidos quando esses valores de dados são escritos para esses tipos de arquivo.

### Sufixo{#suffix} 
Note que na seção de atributos de um arquivo NCCSV, todos os valores de atributos numéricos devem ter uma letra sufixo (por exemplo, 'b') para identificar o tipo de dados numérico (por exemplo, byte) . Mas na seção de dados de um arquivo NCCSV, os valores de dados numéricos nunca devem ter essas letras sufixas (com excepção de 'L' para inteiros longos e 'uL' para inteiros ulongos) — o tipo de dados é especificado pelo\\*DATA\\_TYPE\\*atributo para a variável.

### Tipo de dados{#data-type} 
O tipo de dados para cada não-[escalão](#scalar)variável deve ser especificada por uma\\*DATA\\_TYPE\\*atributo que pode ter um valor de byte, ubyte, curto, ushort, int, uint, long, ulong, float, double, String, or char (caso insensível) . Por exemplo,
qc\\_flag,\\*DATA\\_TYPE\\*,
ATENÇÃO: Especificando o correto\\*DATA\\_TYPE\\*é sua responsabilidade. Especificando o tipo de dados errado (por exemplo, quando você deve ter especificado flutuador) não gerará uma mensagem de erro e pode fazer com que as informações sejam perdidas (por exemplo, os valores de flutuação serão arredondados para ints) quando o arquivo NCCSV é lido porERDDAP™ou convertido em umNetCDFficheiro.

### Car Discordo{#char-discouraged} 
O uso de valores de dados de carvão é desencorajado porque eles não são amplamente suportados em outros tipos de arquivos. valores de carvão podem ser escritos na seção de dados como caracteres únicos ou como caracteres (notavelmente, se você precisa escrever um personagem especial) . Se um String for encontrado, o primeiro personagem do String será usado como valor do char. Cordas de comprimento zero e valores ausentes serão convertidos para o caracter \\uFFFF. Note queNetCDFarquivos só suportam único byte chars, então qualquer chars maior do que char #255 será convertido para '?' ao escreverNetCDFarquivos. A menos que um atributo charset seja usado para especificar um charset diferente para uma variável de carvão, o charset ISO-8859-1 será usado.

### Discouragem longa e não assinada{#long-and-unsigned-discouraged} 
Tipos longos e não assinados são descorados. Embora muitos tipos de arquivo (por exemplo,NetCDF-4 e json) eERDDAP™suporte longo e não assinado (ubyte, ushort, uint, ulong) valores, o uso de valores longos e não assinados em arquivos NCCSV é atualmente desencorajado porque eles atualmente não são suportados pelo Excel, CF eNetCDF-3 ficheiros. Se você quiser especificar valores longos ou não assinados em um arquivo NCCSV (ou na planilha correspondente do Excel) , você deve usar o sufixo 'L' para que o Excel não trate os números como números de ponto flutuante com menor precisão. Atualmente, se um arquivo NCCSV é convertido em umNetCDF-3.ncarquivos, valores de dados longos e longos serão convertidos em valores duplos, causando uma perda de precisão para valores muito grandes (menos de -2^53 por longo, ou superior a 2^53 por longo e longo) . EmNetCDF-3.ncarquivos, ubyte, ushort e variáveis uint aparecem como byte, short e int com o atributo metadados \\_Unsigned=true. EmNetCDF-3.ncarquivos, atributos ubyte, ushort e uint aparecem como atributos byte, short e int contendo o valor correspondente de dois componentes (por exemplo, 255ub aparece como -1b) . Este é obviamente um problema, então os tipos de dados assinados devem ser usados em vez de tipos de dados não assinados sempre que possível.

### CF, ACDD, eERDDAP™Metadados{#cf-acdd-and-erddap-metadata} 
Uma vez que é previsto que a maioria dos arquivos NCCSV, ou o.ncarquivos criados a partir deles, serão lidos emERDDAP, é fortemente recomendado que os arquivos NCCSV incluem os atributos de metadados que são exigidos ou recomendados porERDDAP™(ver
[/docs/server-admin/datasets#global-attributes](/docs/server-admin/datasets#global-attributes)). Os atributos são quase todos dos padrões de metadados CF e ACDD e servem para descrever corretamente o conjunto de dados (quem, o quê, quando, onde, porquê, como) para alguém que não sabe nada sobre o conjunto de dados. De particular importância, quase todas as variáveis numéricas devem ter um atributo de unidades com umaUDUNITS- valor compatível, por exemplo,
sst, unidades, graus\\_C

É bom incluir atributos adicionais que não são dos padrões CF ou ACDD ou deERDDAP.

## [A seção de dados](#the-data-section) {#the-data-section} 

### [Estrutura](#structure) {#structure} 

A primeira linha da seção de dados deve ter uma lista de nomes variáveis sensitiva e vírgula. Todas as variáveis desta lista devem ser descritas na seção de metadados e vice-versa (outros[\\*GLOBAL\\*](#global)atributos e[\\*SCALAR\\*](#scalar)variáveis variáveis) .

A segunda através das linhas penúltimas da seção de dados deve ter uma lista separada por vírgula de valores. Cada linha de dados deve ter o mesmo número de valores que a lista separada por vírgula de nomes variáveis. Espaços antes ou após valores não são permitidos porque causam problemas ao importar o arquivo em programas de planilha. Cada coluna nesta seção deve conter apenas valores da\\*DATA\\_TYPE\\*especificado para essa variável por\\*DATA\\_TYPE\\*atributo para essa variável. Ao contrário da seção atributos, valores numéricos na seção de dados não devem ter letras sufixas para denotar o tipo de dados. Ao contrário da seção de atributos, os valores de carvão na seção de dados podem omitir as citações únicas de encerramento se não forem necessários para a desambiguação (assim, ',' e '\\' deve ser citado como mostrado aqui) . Pode haver qualquer número dessas linhas de dados em um arquivo NCCSV, mas atualmenteERDDAP™só pode ler arquivos NCCSV com até 2 bilhões de linhas. Em geral, recomenda-se que você dividir grandes conjuntos de dados em vários arquivos de dados NCCSV com menos de 1 milhão de linhas cada.

#### Dados finais{#end-data} 
O fim da seção de dados deve ser denotado por uma linha com apenas
\\*END\\_DATA\\*

Se houver conteúdo adicional no arquivo NCCSV após o\\*END\\_DATA\\*linha, ele será ignorado quando o arquivo NCCSV é convertido em um.ncficheiro. Esse conteúdo é, portanto, desencorajado.

Em uma planilha seguindo estas convenções, os nomes variáveis e os valores de dados estarão em várias colunas. Veja o exemplo abaixo.

### [Valores perdidos](#missing-values) {#missing-values} 

Valores ausentes numéricos podem ser escritos como um valor numérico identificado por ummissing\\_valueou atributo \\_FillValue para essa variável. Por exemplo, veja o segundo valor nesta linha de dados:
Bell M. Shimada,99,123.4
Esta é a maneira recomendada de lidar com valores ausentes para byte, ubyte, curto, ushort, int, uint, longa e variáveis ulongas.

flutuar ou valores de NaN duplos podem ser escritos como NaN. Por exemplo, veja o segundo valor nesta linha de dados:
Bell M. Shimada, NaN,123.4

Valores de caracteres e falta numéricos podem ser indicados por um campo vazio. Por exemplo, veja o segundo valor nesta linha de dados:
Bell M. Shimada, 123.4

Para byte, ubyte, curto, ushort, int, uint, variáveis longas e ulongas, o utilitário conversor NCCSV eERDDAP™converterá um campo vazio no valor máximo permitido para esse tipo de dados (por exemplo, 127 para bytes) . Se você fizer isso, certifique-se de adicionar ummissing\\_valueou atributo \\_FillValue para essa variável para identificar esse valor, por exemplo,
 *variável Nome* ,\\_FillValue,127b
Para variáveis flutuantes e duplas, um campo vazio será convertido para NaN.

### [Valores de DataTime](#datetime-values) {#datetime-values} 

Valores do DateTime (incluindo valores de data que não têm um componente de tempo) pode ser representado como números ou como Strings em arquivos NCCSV. Uma determinada variável dateTime só pode ter valores String ou apenas valores numéricos, não ambos. O software NCCSV irá converter os valores String dateTime em data numérica Valores de tempo ao criar.ncarquivos (conforme exigido por CF) . Os valores de dataTime de caracteres têm a vantagem de ser facilmente legíveis pelos seres humanos.

Os valores DateTime representados como valores numéricos devem ter um atributo de unidades que especifica o " *unidades* desde então *data Tempo* " conforme exigido por CF e especificado porUDUNITS, por exemplo,
time,unidades, segundos desde 1970-01T00:00:00Z

Os valores de DateTime representados como valores String devem ter um String\\*DATA\\_TYPE\\*atributo e um atributo de unidades que especifica uma data Padrão de tempo conforme especificado peloJavaClasse DateTimeFormatter
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) . Por exemplo,
tempo, unidades,yyyy-MM-dd'T'HH: mm: ssZ
Todos os valores dateTime para uma determinada variável de dados devem usar o mesmo formato.
Na maioria dos casos, o padrão dateTime que você precisa para o atributo unidades será uma variação de um desses formatos:

*   yyyy-MM-dd'T'HH:mm: ss. SSSZ — que é a ISO 8601:2004 (E) data Formato do tempo. Você pode precisar de uma versão encurtada disto, por exemplo,yyyy-MM-dd'T'HH: mm: ssZ (o único formato recomendado) ouyyyy-MM-dd. Se você está mudando o formato de seus valores de dataTime, NCCSV recomenda fortemente que você mude para este formato (talvez encurtado) . Este é o formato queERDDAP™usará quando ele escreve arquivos NCCSV.
* yyyyyMMddHHmmss.SSS — que é a versão compacta da data ISO 8601:2004 Formato do tempo. Você pode precisar de uma versão encurtada disto, por exemplo, yyyyMMdd.
* M/d/yyyyyy H: mm: ss. SSS — que lida com datas e datas de estilo americanoTimes como "3/23/2017 16:22:03.000". Você pode precisar de uma versão encurtada deste, por exemplo, M/d/yyyyy .
* yyyyDDDHHmmssSSS — que é o ano mais o dia acolchoado zero do ano (por exemplo, 001 = 1 de janeiro de 365 = 31 de dezembro em um ano não-leap; isso é às vezes erroneamente chamado de data Juliana) . Você pode precisar de uma versão encurtada deste, por exemplo, yyyyyDDD .

#### Precisão{#precision} 
Quando uma biblioteca de software converte um.ncarquivo em um arquivo NCCSV, toda a data Os valores de tempo serão escritos como cordas com o ISO 8601:2004 (E) data Formato do tempo, por exemplo, 1970-01T00:00:00Z . Você pode controlar a precisão com aERDDAP- atributo específicotime\\_precision. Ver
[/docs/admin/datasets#time\\_precision](/docs/server-admin/datasets#time_precision).

#### Zona do tempo{#time-zone} 
O fuso horário padrão para data Os valores do tempo são osZulu  (ou GMT) fuso horário, que não tem períodos de tempo de verão. Se uma variável dateTime tiver valores dateTime de um fuso horário diferente, você deve especificar isso com oERDDAP- atributo específicotime\\_zone. Este é um requisito paraERDDAP™(ver
[/docs/admin/datasets#time\\_zone](/docs/server-admin/datasets#time_zone)).

### [Valores de grau](#degree-values) {#degree-values} 

Como exigido por CF, todos os valores de graduação (por exemplo, por longitude e latitude) devem ser especificados como valores duplos de grau decimal, não como string de grau °min'sec ou como variáveis separadas para graus, minutos, segundos. Os designadores de direção N, S, E e W não são permitidos. Use valores negativos para longitudes ocidentais e para latitudes sul.

## [DSG Tipos de recurso](#dsg-feature-types) {#dsg-feature-types} 

Um arquivo NCCSV pode conter Geometria de amostragem discreta CF
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) dados. São os atributos que fazem isso funcionar:

1. Como exigido pelo CF, o arquivo NCCSV deve incluir uma linha na seção de metadados identificando a[\\*GLOBAL\\*](#global) featureTypeatributo, por exemplo,
    \\*GLOBAL\\*,featureType, trajectória
2. Para uso emERDDAP™, o arquivo NCCSV deve incluir uma linha ou linhas na seção de metadados identificando as variáveis cf\\_role=...\\_id, por exemplo,
navio,cf\\_role,trajectory\\_id
Isso é opcional para CF, mas necessário no NCCSV.
3. Para uso emERDDAP™, o arquivo NCCSV deve incluir uma linha ou linhas na seção de metadados identificando quais variáveis estão associadas a cada série, trajetória ou perfil conforme exigido porERDDAP™(ver
    [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)), por exemplo,
    \\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
ou
    \\*GLOBAL\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon"

## [Arquivo de amostra](#sample-file) {#sample-file} 

Aqui está um arquivo de amostra que demonstra muitas das características de um arquivo NCCSV:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.2"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.20
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'€'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Notas:

* Este arquivo de amostra inclui muitos casos difíceis (por exemplo, char e variáveis longas e valores de String difíceis) . A maioria dos arquivos NCCSV será muito mais simples.
* A linha de licença é quebrada em duas linhas aqui, mas é apenas uma linha no arquivo de amostra.
* \\u20ac é o\\uhhhh codificação de €. \\u00FC é o\\uhhhh codificação de ü. Você também pode usar os caracteres não codificados diretamente.
* Muitos Os caracteres no exemplo são fechados por citações duplas, mesmo que não tenham de ser, por exemplo, muitos atributos globais, incluindo o título, as unidades de lon atributo e a 3a linha de dados.)
* Seria mais claro e melhor se as unidades atributo para a variável testLong foram escritas em citações duplas indicando que é um valor String. Mas a representação atual (1, sem citações) será interpretado corretamente como uma corda, não um inteiro, porque não há sufixo 'i'.
* Ao contrário de outros tipos de dados numéricos, os valores longos na seção de dados têm o sufixo ("L") que identifica seu tipo de dados numéricos. Isso é necessário para evitar que planilhas interpretem os valores como números de ponto flutuante e, portanto, perder precisão.

## [Planilhas](#spreadsheets) {#spreadsheets} 

Em uma planilha, como em um arquivo NCCSV:

* Escreva valores de atributos numéricos conforme especificado para arquivos NCCSV (por exemplo, com uma carta de sufixo, por exemplo, 'f', para identificar o tipo de dados do atributo) .
* Em Strings, todos os personagens não imprimíveis e especiais devem ser escritos como um personagem de backslashed semelhante a JSON (por exemplo,\\npara nova linha) ou como o número de caracteres Unicode hexadecimal (caso insensível) com a sintaxe[\\u *Hhhhhhh* ](#uhhhh). Notavelmente, use\\n  (2 caracteres: backslash e 'n ') para indicar uma nova linha dentro de uma corda, não Alt Enter. Todos os caracteres imprimíveis podem ser escritos não codificados ou com a sintaxe[\\u *Hhhhhhh* ](#uhhhh).

As únicas diferenças entre arquivos NCCSV e a planilha análoga que seguem essas convenções são:

* Arquivos NCCSV têm valores em uma linha separada por vírgulas.
As planilhas têm valores em uma linha em células adjacentes.
* Strings em arquivos NCCSV são muitas vezes cercados por citações duplas.
Strings em planilhas nunca são cercados por citações duplas.
* Cotações duplas internas (") em Strings em arquivos NCCSV aparecem como 2 citações duplas.
Aspas duplas internas em planilhas aparecem como 1 cotação dupla.

Se uma planilha que segue estas convenções for salva como um arquivo CSV, muitas vezes haverá vírgulas extras no final de muitas das linhas. O software que converte arquivos NCCSV em.ncarquivos irá ignorar as vírgulas extra.

### [Excelso](#excel) {#excel} 

Para importar um arquivo NCCSV no Excel:

1. Escolha o arquivo : Open .
2. Alterar o tipo de arquivo para arquivos de texto (\\*.prn;\\*.txt; \\*.csv) .
3. Procure os diretórios e clique no arquivo NCCSV .csv.
4. Clique em Abrir .

Para criar um arquivo NCCSV de uma planilha do Excel:

1. Escolha o arquivo : Salvar como .
2. Alterar o Salvar como tipo: para ser CSV (Comma delimitado)   (\\*.csv) .
3. Em resposta ao aviso de compatibilidade, clique em Sim .
4. O arquivo .csv resultante terá vírgulas extras no final de todas as linhas que não as linhas CSV. Podes ignorá-los.

No Excel, o arquivo NCCSV da amostra acima aparece como

![amostraExcel.png](/img/sampleExcel.png)

### [Folhas do Google](#google-sheets) {#google-sheets} 

Para importar um arquivo NCCSV no Google Sheets:

1. Escolha o arquivo : Import .
2. Escolha Carregar um arquivo e clique em Carregar um arquivo do seu computador . Selecione o arquivo e clique em Abrir .
      
Ou, escolha My Drive e altere o tipo de arquivo drop down selection para Todos os tipos de arquivo . Selecione o arquivo e clique em Abrir .

Para criar um arquivo NCCSV de uma planilha do Google Sheets:

1. Escolha o arquivo : Salvar como .
2. Alterar o Salvar como tipo: para ser CSV (Comma delimitado)   (\\*.csv) .
3. Em resposta ao aviso de compatibilidade, clique em Sim .
4. O arquivo .csv resultante terá vírgulas extras no final de todas as linhas que não as linhas CSV. Ignora-os.

## [Problemas / Avisos](#problemswarnings) {#problemswarnings} 

* Se você criar um arquivo NCCSV com um editor de texto ou se criar uma planilha análoga em um programa de planilha, o editor de texto ou o programa de planilha não verificará que você seguiu essas convenções corretamente. Cabe a você seguir essas convenções corretamente.
* A conversão de uma planilha seguindo esta convenção em um arquivo csv (assim, um arquivo NCCSV) levará a vírgulas extras no final de todas as linhas que não as linhas de dados CSV. Ignora-os. O software então converte arquivos NCCSV em.ncarquivos irá ignorá-los.
* Se um arquivo NCCSV tiver vírgulas em excesso no final das linhas, você pode removê-las convertendo o arquivo NCCSV em umNetCDFarquivo e depois converter oNetCDFarquivo de volta para um arquivo NCCSV.
* Quando você tenta converter um arquivo NCCSV em umNetCDFarquivo, alguns erros serão detectados pelo software e gerarão mensagens de erro, fazendo com que a conversão falhe. Outros problemas são difíceis ou impossíveis de capturar e não gerarão mensagens de erro ou avisos. Outros problemas (por exemplo, excesso de vírgulas no final das linhas) será ignorado. O conversor de arquivo fará apenas uma verificação mínima da correção do resultadoNetCDFarquivo, por exemplo, em relação à conformidade do CF. É responsabilidade do criador de arquivos e do usuário de arquivos verificar que os resultados da conversão são tão desejados e corretos. Duas maneiras de verificar são:
    * Imprima o conteúdo do.ncarquivo com ncdump
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) .
    * Ver o conteúdo dos dados emERDDAP™.

## [Mudanças](#changes) {#changes} 

A versão original foi[NCCSV v1.00](/docs/user/nccsv-1.00)  (emERDDAP™v1.76, lançado 2017-05-12) 

* Alterações introduzidas[NCCSV v1.10](/docs/user/nccsv-1.10)  (emERDDAP™v2.10, lançado 2020-11-05) :
    * Adicionado suporte para ubyte, ushort, uint, ulong. Graças ao CF para adicionar suporte a esses tipos de dados no CF.
* Alterações introduzidas em v1.20 (emERDDAP™v2.23, lançado 2023-02-27) :
    * Mudado de codificação de caracteres ASCII para codificação UTF-8 para arquivos NCCSV .csv.
        *   ERDDAP™ainda pode ler arquivos de todas as versões anteriores e atuais do NCCSV.
        *   ERDDAP™agora sempre escreve arquivos NCCSV v1.20.
        * Se você escreveu um cliente para ler arquivos NCCSV, altere-o para que ele trate todos os arquivos NCCSV como arquivos UTF-8. Isso funcionará com arquivos NCCSV mais antigos porque ASCII é um subconjunto da codificação de caracteres UTF-8.
        * Graças a Pauline Chauvet, Nate e Thomas Gardiner.
