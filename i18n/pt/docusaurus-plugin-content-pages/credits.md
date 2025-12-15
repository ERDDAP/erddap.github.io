# Créditos

## Contribuições ERDDAP™ código de código{#contributions-to-erddap-code} 
* Mergeir
     [ EDDGrid A partir deMergeIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles) foi escrito e contribuído por Jonathan Lafite e Philippe Makowski da R.Tech Engineering (Licença: copyrighted open source) . Obrigado, Jonathan e Philippe&#33;
     
* Tabela de dados de autor
     [.data Quadro (TabelaWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) foi escrito e contribuído por Roland Schweitzer de NOAA   (Licença: copyrighted open source) . Obrigado. Roland&#33;
     
* json-ld
A versão inicial da [Marcação semântica de conjuntos de dados com json-ld (JSON Dados ligados) ](/docs/server-admin/additional-information#json-ld) recurso (e assim todo o trabalho árduo na concepção do conteúdo) foi escrito e contribuído (Licença: copyrighted open source) por Adam Leadbetter e Rob Fuller do Instituto Marinho na Irlanda. Obrigado. Adam e Rob&#33;
     
*    orderBy   
O código para o [ orderByMean filtro de filtro](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean) em tabledap e as extensas mudanças no código para apoiar [_variableName/divisor:offset_ notation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions) para todos orderBy filtros foi escrito e contribuído (Licença: copyrighted open source) por Rob Fuller e Adam Leadbetter do Instituto Marinho na Irlanda. Obrigado. Rob e Adam&#33;
     
* Tipos de marcador sem fronteiras
O código para três novos tipos de marcadores (Praça cheia sem fronteiras, Círculo preenchido sem fronteiras, Triângulo preenchido sem fronteiras) foi contribuído por Marco Alba da ETT / EMODnet Physics. Obrigado. Marco Alba&#33;
     
* Traduções de mensagens.xml
A versão inicial do código em TranslateMessages.java que usa o serviço de tradução do Google para traduzir message.xml em vários idiomas foi escrita por Qi Zeng, que estava trabalhando como um interno Google Summer of Code. Obrigado. Qi&#33;
     
*    orderBy Sumário
O código para o [ orderBy Filtro de soma](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum) em tabledap   (baseado em Rob Fuller e Adam Leadbetter's orderByMean ) e o Check All e Desmarque Todos os botões no EDDGrid O Formulário de Acesso a Dados foi escrito e contribuído (Licença: copyrighted open source) por Marco Alba da ETT Solutions e EMODnet. Obrigado. Marco&#33;
     
* Out-of-range .transparent Pedidos de Png
     ERDDAP™ agora aceita pedidos para . transparente Png é quando os valores de latitude e / ou longitude são em parte ou totalmente fora de alcance. (Isto foi... ERDDAP™ GitHub Questões #19, postado por Rob Fuller -- Obrigado por postar isso, Rob.) O código para corrigir isso foi escrito por Chris John. Obrigado. Chris&#33;
     
* Exibir dados de imagem base64 em .htmlTable respostas
O código para exibir dados de imagem base64 em .htmlTable respostas foram contribuídas por Marco Alba da ETT / EMODnet Physics. Obrigado. Marco Alba&#33;
     
* NThreads Melhoria
O sistema nThreads para EDDTableFromFiles foi significativamente melhorado. Estas mudanças levam a uma enorme melhoria de velocidade (por exemplo, 2X speedup quando nThreads é definido para 2 ou mais) para os pedidos mais desafiadores (quando um grande número de arquivos deve ser processado para reunir os resultados) . Essas mudanças também levarão a uma aceleração geral ao longo de todo ERDDAP™ . O código para essas mudanças foi contribuído por Chris John. Obrigado. Chris&#33;

* Paleta de cores EK80 para conjuntos de dados acústicos. Obrigado Rob Cermak&#33;

* EDDTableAggregateRows agregação em todas as crianças fixas. Obrigado Marco Alba&#33;

* Fix para varNames incorretos em logs. Obrigado Ayush Singh&#33;
