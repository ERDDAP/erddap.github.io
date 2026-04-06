---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Alterações

 ERDDAP™ é um grande exemplo de [Inovação Dirigida pelo Usuário](https://en.wikipedia.org/wiki/User_innovation) , onde a inovação de produtos vem frequentemente dos consumidores ( ERDDAP™ usuários) , não apenas os produtores ( ERDDAP™ programadores) . Ao longo dos anos, a maioria das ideias para novas funcionalidades e mudanças ERDDAP™ vieram de utilizadores. Esses usuários são creditados abaixo por suas grandes ideias. Obrigado&#33; Por favor, continuem com essas grandes sugestões&#33;

Aqui estão as alterações associadas a cada ERDDAP™ Soltar.

## Versão 2.30.0{#version-2300} 
 (lançado 2026-04-07) 

A versão v2.30.0 foca principalmente em correções de erros, atualizações de dependência para estabilidade e segurança e testes de melhorias de desempenho.

*    **Novas funcionalidades e alterações (para usuários) :** 
      * Melhorado [Croissant](https://mlcommons.org/working-groups/data/croissant/) compatibilidade com metadados e suporte manifesto, incluindo [mlcroissant](https://pypi.org/project/mlcroissant/) compatibilidade.
      * Suporte melhorado para booleanos parquet.

*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
      * Ferramentas de linha de comando não utilizadas e código associado foram removidos do codebase para reduzir a dívida técnica. Ver https://github.com/ERDDAP/erddap/pull/432.
 
      * Uma nova bandeira de recursos `forceSyncronousLoading` foi adicionado para substituir a abordagem de carregamento de dados diferido padrão. Isso raramente deve ser necessário, e só deve ser usado nos casos em que o carregamento diferido está causando problemas. Ver o [página da bandeira do recurso](/docs/server-admin/feature-flags#forcesynchronousloading) para mais pormenores.

## Versão 2.29.0{#version-2290} 
 (lançado 2025-12-15) 

Acção necessária.

 ERDDAP™ A versão 2.29.0 requer jdk 25 ou posterior. Por favor, atualize sua versão jdk. Se isso é um problema, você pode construir ERDDAP™ para um jdk mais antigo (de volta para pelo menos 17) alterando o ficheiro pom.xml. JDK 25 é uma versão LTS de Java e inclui muitas melhorias, mais notavelmente melhor desempenho.

*    **Novas funcionalidades e alterações (para usuários) :** 
    * Versão ISO 19115: Veja abaixo para informações de administrador. Para usuários, agora você pode solicitar versões específicas de metadados ISO 19115. Faça isto a partir da grelha/ tabledap páginas para um conjunto de dados com o tipo de ficheiro suspenso. Estas versões serão independentes do servidor padrão.

*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Novo recurso, suporte MQTT. Para mais detalhes, recomendo a leitura do [nova página sobre isso.](/docs/server-admin/mqtt-integration) Isso inclui ser capaz de construir conjuntos de dados de mensagens MQTT, e publicar mensagens MQTT quando um conjunto de dados muda. Ele está desligado por padrão, então se você quiser usá-lo, você precisa habilitá-lo.

Graças a Ayush Singh por trabalhar no MQTT&#33;

    * Melhorias S3: Adicionando suporte para URIs S3 como o valor cacheFromUrl. Isto permitirá ERDDAP para apoiar baldes privados hospedados fora amazonaws.com Também abordou um problema de vazamento de memória S3.

Graças a @SethChampagneNRL pelo trabalho em S3&#33;

    * Versão ISO 19115: Existe agora suporte para 3 versões diferentes de metadados ISO 19115. A versão padrão é controlada por configurações em seu setup.xml. Se useSisISO19115 for false, o servidor por padrão fornecerá NOAA ISO19115_2. Se o useSisISO19115 for verdadeiro, então o servidor usará uma versão diferente dependendo do valor do useSisISO19139. Se o useSisISO19139 for verdadeiro, o padrão será ISO19139_2007, se o useSisISO19139 for falso, o padrão será ISO19115_3_2016. Recomendamos o uso deSisISO19115=verdadeiro e usoSisISO19139=falso. Sua organização pode exigir configurações diferentes.

    * Migrado para o java. biblioteca de tempo (em vez de java.util. GregorianCalendar) . Isto deve proporcionar melhorias de desempenho em consultas que envolvam colunas de data/hora. Não deve haver impacto visível para a grande maioria dos conjuntos de dados. O único caso conhecido que isso causa uma mudança é se o conjunto de dados estiver usando `dias desde 0000-01-01` ou semelhantes. Se este for um problema para uma variável, você pode adicionar ` <att name="legacy_time_adjust"> verdadeiro </att> ` à addAttributes secção de qualquer uma das duas dataVariable ou axisVariable .
    
    *    datasets.xml é agora processado por um [Substitutor de Textos](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Isto tem muitos usos, incluindo definir valores privados (como senhas) utilizando variáveis de ambiente. Isso pode ser desativado definindo enableEnvParsing para false no setup.xml.

    * Eixo de pressão: Adiciona um caso especial para elevações definidas pela pressão. Isto é usado principalmente em conjuntos de dados de meteorologia que definem elevações verticais em níveis isobáricos. NOTA: Valores de pressão menores significam elevações maiores, de modo que o eixo corre em frente às elevações normais definidas em metros ou pés.

Graças a [SethChampagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid DeNcFiles com diferentes dimensões: Há (experimental) apoio à EDDGrid DeNcFiles datasets para ter variáveis que não usam o mesmo conjunto de eixos. Por favor, relate como isso funciona para você, ou se o comportamento não parece certo.

    * Há uma coleção de otimizações que devem ser seguras, mas ter bandeiras para reverter ao comportamento antigo, se necessário. Se você encontrar a necessidade de definir qualquer uma das bandeiras, por favor, arquive um bug. Se não soubermos de problemas, a maioria destes serão removidos com o novo comportamento padrão no futuro. Há um [nova página sobre bandeiras de funcionalidades](/docs/server-admin/feature-flags) onde você pode ler sobre estas e outras bandeiras.

      * toque Tópico Apenas WhenItems: Isso é uma mudança para que o touchThread só esteja rodando quando houver itens na fila para tocar. Uma execução menos thread é uma otimização menor, mas ainda útil. O padrão é verdadeiro.

      * usarNcMetadata Tabela de Ficheiros: Esta alteração permite que a tabela de arquivos internos use atributos nc, especificamente um atributo variável real_range para evitar a leitura do arquivo nc inteiro. Isso pode acelerar drasticamente o carregamento inicial de conjuntos de dados baseados em arquivos nc se o real_range para cada variável em cada arquivo for incluído como um atributo. Note que isso confia no valor, então se estiver errado, a tabela de arquivos internos terá informações incorretas. O padrão é verdadeiro.

      * ncHeader MakeFile: Esta alteração permite que os arquivos de cabeçalho nc sejam gerados sem gerar primeiro o arquivo nc representativo. Esta é uma pequena otimização para EDDTable, mas uma grande otimização para muitos EDDGrid pedidos. O padrão é false (como em false é o comportamento otimizado pretendido) .

      * fundo Criar Subset Tabelas: Esta alteração move algum do processamento inicial de conjuntos de dados para um tópico de fundo. Isto deverá melhorar o tempo de carregamento dos conjuntos de dados. Especificamente, a parte atrasada é tabelas de subconjunto, que também são geradas quando necessário se o processamento atrasado ainda não aconteceu. O padrão é verdadeiro.

    * Algumas pequenas alterações, correções de erros (Obrigado Italo Borrelli para a fixação de EDDTable FromAggregateRows, Obrigado. @SethChampagneNRL para permitir longitudes superiores a 360 pol EDDGrid LonPM180, e várias outras correções de erros) , e otimizações.

*    **Para ERDDAP™ Desenvolvedores:** 
    * Otimizações adicionais, incluindo o tempo de execução do teste de corte ao meio.

    * Novos perfis de teste para muito flácido (externo) ou extremamente lento (lowAWS) testes.

## Versão 2.28.1{#version-2281} 
 (lançado 2025-09-05) 

*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Suporte adicionado para X-Forwarded-Prefix. Isto é de particular interesse para administradores executando servidores em um sub-caminho. Por favor, leia nossa documentação atualizada para [Apache](/docs/server-admin/deploy-install#apache) e [Nginx](/docs/server-admin/deploy-install#nginx) para mais informações.

Graças a [@srstsavage](https://github.com/srstsavage) 

## Versão 2.28.0{#version-2280} 
 (lançado 2025-08-29) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    *    [Esquema croissant](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) já está disponível. Os administradores podem controlar se os metadados padrão usam Croissant, mas começando com 2.28.0 você pode solicitar a definição Croissant para com o novo tipo de arquivo de exportação ".croissant" (que fornece um arquivo jsonld) .

*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Novo Docker Imagem criada em cada pedido de pull. Estes são builds alfa, eles não são versões. Eles terão uma etiqueta como "20250814T034025", que indica quando foi construído. Se você quiser experimentar os recursos mais recentes você pode usar estes. Se você quiser algo mais estável use nossos lançamentos com uma tag de versão semântica (Por exemplo, 2.28.0) . Nós sempre pretendemos que os lançamentos alfa sejam utilizáveis, mas há menos testes para eles do que nossos lançamentos versionados. Nós sempre recomendamos que você use algo pelo menos tão novo quanto nosso "último" lançamento que será o mais recente versão semântica.

    * Acoplamento Imagens agora disponíveis em [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) para além de [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Graças a [@ ocefpaf](https://github.com/ocefpaf) , [@abkfenris](https://github.com/abkfenris) , [@srstsavage](https://github.com/srstsavage) , e [MathewBiddle](https://github.com/MathewBiddle) para suas contribuições em torno das Imagens Docker. Isto incluiu as primeiras contribuições de todos eles exceto @ststsavage&#33;
    
    * Há agora suporte para gerar [Esquema croissant](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) ficheiros. Está ligado por omissão. Você pode desativar o esquema Croissant em seu setup.xml com (NÃO RECOMENDADO- Por favor, contacte ou arquive um problema no GitHub se precisar de o fazer) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Algumas configurações tiveram seus valores padrão alterados. useHeadersForUrl e useEddReflexion agora ambos predefinidos para true. Se eles causam um problema e você precisa configurá-los como falsos, por favor crie um problema. A intenção é removê-los em uma liberação futura.

    * Algumas configurações foram removidas. useSharedWatchService e redirecioneDocumentação ToGitHubIo foi definido para true por padrão para várias versões e foi muito bem testado neste momento. Removendo estes permitidos para alguma limpeza de código.

    * Algumas pequenas mudanças, correções de erros e otimizações.

*    **Para ERDDAP™ Desenvolvedores:** 
    * Muito código morto removido. Muitos avisos foram corrigidos.

## Versão 2.27.0{#version-2270} 
 (lançado 2025-06-11) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * Novos dados para o conversor de barras de cores em servidores em /erddap/convert/color.html

*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * O comportamento padrão é que a cache será agora limpa independentemente da tarefa de conjuntos de dados de carga principal. Isso permitirá uma limpeza mais confiável e regular de arquivos de cache antigos. Há trabalho adicional para melhorar o comportamento do servidor quando em baixo no espaço em disco (retornando um erro para solicitações que provavelmente farão o servidor ficar sem espaço, e limpando o cache com mais frequência em circunstâncias de disco baixo para tentar evitar erros) . In datasets.xml   (ou setup.xml) você pode adicionar/set o novo cache O parâmetro ClearMinutes para controlar a frequência com que o servidor verifica para limpar o cache. Nota, o parâmetro cacheMinutes existente controla a idade dos arquivos a serem mantidos, o novo cache ClearMinutes é para com que frequência fazer um chache claro.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Você pode desativar a nova cache de verificação limpa definindo taskCacheClear para false in setup.xml, embora isso não seja recomendado.
cache ClearMinutes também está na [documentação dos conjuntos de dados](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Suporte a metadados localizados. Ele suporta a localização de valores em uma addAttributes secção. Basta adicionar um atributo com a tag xml:lang adicional. Por exemplo, para adicionar um título francês a um conjunto de dados addAttributes a secção incluiria:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Detalhes adicionais disponíveis no [documentação localizada de metadados](/docs/server-admin/localized-metadata) .

    * Novo Docker Componha o arquivo com opções para SSL e um servidor Prometheus. Graças ao Shane St. Savage pelo SSL e ao Jiahui Hu pelo Prometheus.

    * Suporte para usar informações nos cabeçalhos para determinar a URL do servidor em vez de confiar no arquivo de configuração. Isso permitirá que um servidor seja acessado por vários nomes e pode simplificar certas configurações. Por favor, habilite-o e envie feedback.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Algumas pequenas mudanças, correções de erros e otimizações.

*    **Para ERDDAP™ Desenvolvedores:** 
    * Refatora para como os tipos de arquivos de saída são definidos em código. Isso deve torná-lo para que os tipos de arquivos podem ser adicionados sem precisar tocar em muitos lugares de código.

## Versão 2.26{#version-226} 
 (lançado 2025-03-31) 

*    **Para Todos:** 
    * Grande atualização para o nosso site de documentação: https://erddap.github.io/
 
Além da aparência atualizada há navegação melhorada, pesquisa, tradução, e deve ser mais fácil de manter indo em frente&#33;

*    **Novas funcionalidades e alterações (para usuários) :** 
    * Assinaturas e RSS atualizações devem acontecer de forma mais confiável para conjuntos de dados que são atualizados frequentemente a partir de alterações de arquivos.

*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A versão padrão requer/suporta Java versão 21. De volta a esta versão é ser capaz de facilmente fazer um Java 17 binário compatível.

    * Novo recurso para personalizar as informações exibidas sobre conjuntos de dados na UI. Esperamos que isso seja particularmente útil para adicionar coisas como citações de dataset. Para mais detalhes você pode ler o [nova documentação](/docs/server-admin/display-info) . Graças a Ayush Singh pela contribuição&#33;

    * métricas Prometheus adicionais. O maior é ` http _pedir_duração_segundos` que inclui os tempos de resposta da solicitação discriminados por: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Este formato legível por máquina permitirá uma melhor coleção de métricas para entender como os usuários estão usando o servidor.

    * Nova forma de gerar arquivos XML ISO19115. Ele usa o Apache SIS e é uma nova opção nesta versão. Por favor, habilite-o e envie feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * A UI agora criará links individuais para cada url em campos como o infoUrl e resumo.

    * Assinaturas e RSS atualizações devem acontecer de forma mais confiável para conjuntos de dados que são atualizados frequentemente a partir de alterações de arquivos. Se isso causar problemas, por favor, entre em contato com o GitHub e desabilite a funcionalidade adicionando a bandeira abaixo ao seu setup.xml.
NÃO RECOMENDADO
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * As variáveis de subset não serão mais geradas automaticamente para o tipo de conjunto de dados EDDTableFromNcCFFiles. Se você estava confiando no comportamento, você pode (solução preferível) adicionar o subsetVariables para a definição de conjunto de dados no seu datasets.xml , ou adicione a bandeira abaixo ao seu setup.xml. Se você sentir a necessidade de ligar isso, por favor, entre em contato com o GitHub para que possamos apoiar melhor seu caso de uso avançando.
NÃO RECOMENDADO
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * O servidor irá agora redirecionar pedidos de documentação (sob downloads/ que é a documentação que foi migrada) para o novo site de documentação. Se necessário, você pode desabilitar isso com um flag no setup.xml:
NÃO RECOMENDADO
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Algumas pequenas alterações e correções de erros.

*    **Para ERDDAP™ Desenvolvedores:** 
    * Mais melhorias de qualidade de código e limpeza de código morto. Isso inclui pequenas otimizações, melhor manuseio de recursos clonáveis e migração para longe de tipos de dados obsoletos (como Vector) .

    * Refactoring grande para EDStatic para puxar a maior parte da configuração, mensagem e código métrico. Ele também encapsula melhor a inicialização e manipulação de caminhos de diretório (Estes dois últimos têm mais a fazer.) 

    * Muito progresso em direção a uma Imagem Docker suportada oficialmente. O plano é finalizar e liberar após o ERDDAP™ 2.26 lançamento está disponível.

## Versão 2.25{#version-225} 
 (lançado 2024-10-31) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * EDDTableFromFiles agora pode suportar consultas com apenas saídas derivadas (global, script jexl, ou variáveis) .
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Versão 2.25 exige Java 21 ou mais novo. Esta é a versão LTS e está disponível há mais de um ano.
         
    * O SharedWatchService é agora o padrão. Se precisar desativá-lo, contacte o Chris. John na Noaa.gov para me avisar, para que eu possa melhorá-lo em versões futuras e adicionar:
        &lt;useSharedWatchService&gt;false&lt;/useSharedWatchService&gt; para seu setup.xml.
         
    * A ERDDAP™ servlet irá agora iniciar na inicialização do servidor. O que significa que os conjuntos de dados começarão a carregar imediatamente em vez de esperar até que um pedido seja feito.
         
    * O parâmetro removeMVRows no EDDTableFromMultidimNcFiles terá agora um efeito. Configurando-o para false pode acelerar significativamente algumas consultas, mas isso pode não ser adequado para todos os conjuntos de dados. Para mais informações, consultar [descrição do parâmetro](/docs/server-admin/datasets#removemvrows) .
         
    * Conjuntos de dados (EDDTableFromNcFiles e EDDGrid FromNcFiles) usando arquivos zarr agora são suportados. Eles devem incluir "zarr" no arquivoNameRegex ou no caminhoRegex. Ver o [zarr section na documentação dos conjuntos de dados](/docs/server-admin/datasets#zarr) para mais detalhes.
         
    * Novo tipo de conjunto de dados, EDDTableFromParquetFiles é agora suportado. Ver o [EDDTableFromParquetFiles section in the datasets documentation](/docs/server-admin/datasets#eddtablefromparquetfiles) para mais detalhes.
         
    *    [métricas de Prometeu](https://prometheus.io/) estão agora disponíveis em /erddap/metrics.
         
    * Uma nova implementação do analisador XML está disponível. Este novo analisador permite usar o XInclude em datasets.xml . Graças a Ayush Singh para o recurso.
         
    * Novo parâmetro em datasets.xml para controlar e-mails de atividade incomum. Atividade incomum FalhaPercent defaults to the old value of 25%. Graças a Ayush Singh para o recurso.
         
    * Novo parâmetro no setup.xml que controla se os erros de carregamento do conjunto de dados são mostrados na página status.html. O padrão é true, para desativar erros de conjunto de dados na página de status, defina showLoadErrorsOnStatusPage para false:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Algumas pequenas alterações e correções de erros.
         
*    **Para ERDDAP™ Desenvolvedores:** 
    * Ensaio separado para unidade e integração (lento) testes. Também mais testes habilitados e testes foram feitos menos flácida.
         
    * Erro Prone (algumas verificações ainda desactivadas) e Spot Bugs integrado através de Maven.
         
    * Base de código completa formatada para corresponder ao Guia de Estilo do Google.
         

## Versão 2.24{#version-224} 
 (lançado 2024-06-07) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * Nova paleta de cores EK80 para conjuntos de dados acústicos disponíveis. Graças ao Rob Cermak por isto.
         
    * Corrigir um problema onde EDDTableAggregateRows não mostrou intervalos adequados de todas as crianças. Graças a Marco Alba para a correção e relatório de bug.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: ALTERAÇÕES DE SEGURANÇA: A autenticação do Google pode exigir alterações em seu CSP.
        
Especificamente, você também pode precisar adicionar https://accounts.google.com/gsi/style stlye-src e https://accounts.google.com/gsi/ para conectar-src. Para o script-src que você pode usar agora https://accounts.google.com/gsi/client.
 
        
Para mais informações você pode ir para o [Página do Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) sobre a configuração do CSP.
         
        
    * Novo serviço de relógio compartilhado. Esta é uma nova opção para ver diretórios para atualizações. Ele tem um thread para cada sistema de arquivos em vez de um thread por conjunto de dados. É provável que isso reduza drasticamente o número de threads usados para observar mudanças. Isso significa que todos os conjuntos de dados são atualizados juntos em vez de cada conjunto de dados ter sua própria frequência de atualização. Isso provavelmente significará atualizações mais frequentes para a maioria dos conjuntos de dados.
        
Para activar esta adição&lt;useSharedWatchService&gt;true&lt;/useSharedWatchService&gt; para seu setup.xml.
        
          
Por favor, tente isto e relate como funciona para si o Chris. John em Noaa.gov.
         
    * Corrigir nomes var incorretos em logs. Graças ao Ayush Singh pela solução.
         
    * Algumas pequenas alterações e correções de erros.
         
*    **Melhorias para ERDDAP™ programadores:** 
    * Suporte para desenvolvimento local usando Docker. Obrigado, Matt Hopson e Roje.
         
    * Suporte para desenvolvimento local usando Jetty e melhorias de documentação. Obrigado, Micah Wengren.
         
    * Alterações nos testes para reduzir problemas de plataforma cruzada. Obrigado. Shane St. Savage.
         

## Versão 2.23{#version-223} 
 (lançado 2023-02-27) 

Note que este lançamento foi feito por Bob Simons, mostrando que ele ainda está por perto e ativo durante a transição para Chris John, seu sucessor. Estacionando com esta versão, todas as alterações de código estão sendo feitas por Chis John, salvo indicação em contrário.

*    **Novas funcionalidades e alterações (para usuários) :** 
    *    (Nenhum)   
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: ALTERAÇÕES DE SEGURANÇA: A autenticação do Google agora é realizada através da nova biblioteca do Google Identity Services que faz parte de "Sign In with Google". O suporte do Google para o antigo sistema "Google Sign In" será descontinuado 2023-03-31. Então, se você usar a autenticação do Google em seu ERDDAP™ instalação, você deve atualizar para ERDDAP™ v2.23+ antes disso. (O Bob pede desculpa pelo curto prazo. A culpa é do Bob.)   
         
    * O NCCSV é agora v1.2. A mudança é que os arquivos agora são UTF-8-codificados (eram ASCII) e agora pode incluir qualquer caractere Unicode como está, sem codificação como\\u_hhhh_, embora isso ainda seja permitido.
Ao escrever ficheiros NCCSV, ERDDAP™ agora escreve arquivos v1.2.
         ERDDAP™ ainda ler arquivos NCCSV que seguem a especificação v1.0 e v1.1 .
Graças a Pauline-Chauvet, n-a-t-e, e thogar-computador por sugerir isso e fazer os testes para garantir que vários programas de planilha podem importar arquivos UTF-8. Graças ao Bob Simons por esta mudança de código.
         
    * NOVO: A página web status.html agora tem uma linha perto do topo que indica qual dataset loadDatasets está carregando e estatísticas relacionadas, ou nenhuma se nenhum conjunto de dados estiver sendo carregado. Isto pode ser muito útil para ERDDAP™ administradores tentando descobrir por que carregar Os conjuntos de dados estão a demorar tanto. Além disso, os nGridDatasets, nTableDatasets e nTotalDatasets contam abaixo que agora são instantâneos (anteriormente, eles foram a partir do final da última grande carga Conjuntos de dados) .
Esta mudança é para Roy Mendelssohn. Graças ao Bob Simons por esta mudança de código.
         
    * MELHORADO: Gerar conjuntos de dados Xml agora muda para CF-1,10 (foi CF-1.6) nos atributos "Convenções".
Graças ao Bob Simons por esta mudança de código.
         
    * Algumas pequenas alterações e correções de erros.
         

## Versão 2.22{#version-222} 
 (lançado 2022-12-08) 

Note que este lançamento foi feito por Bob Simons, mostrando assim que ele ainda está por perto e ativo durante a transição para o seu sucessor.

*    **Novas funcionalidades e alterações (para usuários) :** 
    *    (Nenhum)   
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Para fazer: nada.
         
    * FIX DE SEGURANÇA: Houve um bug relacionado ao Cross Site Scripting no código para a seleção de idioma. Graças a NOAA Escaneamentos de segurança para apanhar isto. Isto mostra que NOAA segurança é ativamente e rotineiramente à procura de fraquezas de segurança em ERDDAP .
         
    * FIX DE SEGURANÇA: As muitas bibliotecas usadas por ERDDAP™ foram atualizados, como de costume, como parte deste lançamento. Desta vez, isso incluiu atualizar o driver PostgreSQL (que tinha um bug de segurança) a 42.5.1.
         
    * MELHORADO: Alterações mais pequenas para ERDDAP O sistema de gerenciamento de memória deve reduzir a chance de uma determinada solicitação falhar devido à falta de memória disponível.
         
    * Algumas pequenas alterações e correções de erros.
         

## Versão 2.21{#version-221} 
 (lançado 2022-10-09) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    *    (Nenhum)   
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: Para Java 17, você não deve usar \\-d64 em JAVA\\_OPTS em setenv.bat ou setenv.sh. Então, se estiver lá, por favor, remova-o. Eu acho que o modo 64 bits agora é selecionado quando você baixar uma versão 64 bits de Java . Graças ao Sam Woodman.
         
    * BUG FIX: Às vezes, o novo sistema de e-mail tentou fazer login com demasiada frequência, o que fez com que os servidores de e-mail do Google rejeitassem todo o log futuro em tentativas. Agora, o sistema de email evita isso e problemas relacionados.
         

## Versão 2.20{#version-220} 
 (lançado 2022-09-30) 

*    **Não use v2.20. É falho.** Mas os administradores ainda precisam fazer os itens TO DO listados abaixo ao atualizar para v2.21+.
     
*    **Novas funcionalidades e alterações (para usuários) :** 
    *    (Nenhum)   
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * MELHORADO: Nós reativamos o antigo sistema de gerenciamento de memória (Math2.asureMemoryDisponível) e modificou o novo sistema de gestão de memória (EDStatic.shed Este Pedido) para trabalhar melhor com ele. Ver [Estado da Memória](/docs/server-admin/additional-information#memory-status) para mais pormenores.
         
    * ALTERADO: O padrão para&lt;ipAddressMaxPedidos&gt; em datasets.xml aumentou de 7 para 15. Está claro que alguns legítimos WMS os clientes podem gerar mais de 7 solicitações simultâneas.
         

## Versão 2.19{#version-219} 
 (lançado 2022-09-01) 

*    **Não use v2.19. É falho.** Mas os administradores ainda precisam fazer os itens TO DO listados abaixo ao atualizar para v2.20+.
     
*    **Novas funcionalidades e alterações (para usuários) :** 
    * NOVO: Existe uma nova função do lado do servidor, orderBy Descendo, que funciona como orderBy , mas tipo em ordem decrescente. Graças ao Adam Leadbetter.
         
    * Agora, gráficos (mas não mapas) expandir-se-á para preencher o espaço disponível na tela, ou seja, espaço não utilizado pela legenda. Você pode obter gráficos altos, gráficos quadrados ou gráficos largos adicionando e manipulando o &.size=_width_ | _parâmetro de altura (onde a largura e a altura especificam o tamanho da tela, em pixels) na URL da solicitação. (Esta não é uma opção na página .graph. Você tem que adicioná-lo ao URL manualmente.) Se você não especificar o parâmetro &.size, os pedidos de .smallPng, .png, .largePng, .smallPdf, .pdf e .large.pdf têm tamanhos de tela predefinidos, então seu gráfico se expandirá para preencher o espaço disponível, mas geralmente será aproximadamente quadrado. Graças ao Bob Fleming.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: ERDDAP™ agora exige Java 17 e o Tomcat 10 relacionado. Você deve seguir o ERDDAP™ instruções de instalação (ou o equivalente, por exemplo, para o Docker) para instalar Java 17 e Tomcat 10 e copiar o seu \\[ tomcat \\] /diretório de conteúdo da sua instalação Tomcat 8 no novo \\[ tomcat \\] directório. Não existem outras alterações que precise de fazer no seu ERDDAP instalação relacionada com esta alteração. Por outras palavras, ERDDAP™ funciona como antes.
        
Não te esqueças de fazer o ERDDAP -alterações relacionadas ao server.xml do Tomcat e context.xml quando você atualiza o Tomcat. Ver ERDDAP 's [Instruções de instalação Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
A minha impressão de Java 17 é que ele prefere mais poder de processamento e memória para aplicações de longo prazo, como ERDDAP™ , por isso funciona ligeiramente mais lento do que Java 8 com computadores de baixa potência (Por exemplo, 2 núcleos e RAM mínima) e trabalha um pouco mais rápido do que Java 8 com computadores de maior potência (p. ex., 4+ núcleos e RAM abundante) . Então, se você ver desempenho ruim, use programas como Linux's [topo](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) para verificar a utilização dos recursos e considerar dar ERDDAP™ mais recursos, nomeadamente mais memória. A memória é barata&#33; A maioria dos telefones tem mais processadores e memória do que os servidores que alguns de vocês estão usando para executar ERDDAP &#33;
Graças à Erin Turnbull.
         
        
    * A FAZER: Se utilizar ERDDAP™ para acessar Cassandra, para Cassandra, você precisa continuar usando a versão de Java Que estavas a usar para gerir a Cassandra. Apenas mude para Java 17 para correr Tomcat+ ERDDAP .
         
    * Para fazer: Recomendado: Se a CPU do seu servidor tiver 4+ núcleos e 8+ GB de RAM, considere mudar para estas configurações em seu datasets.xml arquivo:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Se seu servidor tiver menos recursos, atenha-se a "1" para ambas as configurações.
Os sistemas nThreads para EDDGrid Arquivos e tabela EDD Os arquivos foram significativamente melhorados. Estas mudanças levaram a uma enorme melhoria de velocidade (Por exemplo, velocidade de 2X quando nThreads for definido como 2 ou mais) para os pedidos mais desafiadores (quando um grande número de arquivos deve ser processado para reunir os resultados) . Algumas mudanças relacionadas de Chris John também vai levar a uma aceleração geral ao longo ERDDAP . O código para essas mudanças foi contribuído por Chris John. Obrigado. Chris&#33;
         
    * AVISO: hífens em datasetID 's são obsoletos e já não são suportados (embora tecnicamente ainda permitido) . Eles provavelmente serão proibidos no próximo lançamento. Se você usar hífens, mude para sublinhados agora para evitar problemas. Se fizeres a mudança agora, é à tua velocidade. Se esperares até ao próximo lançamento, estarás em pânico e terás de lidar com isso naquele dia.
         
    * NOVO: Agora, para .htmlTable respostas de dados, se os dados de uma célula String contiverem dados:image/png;base64, seguido de uma imagem base64 codificada .png, ERDDAP™ irá mostrar um ícone (para que o utilizador possa ver a imagem se passar sobre ela) e botões para gravar o texto ou a imagem na área de transferência. Graças a Marco Alba (que contribuiu com o código) e Bob Simons (que o modificou ligeiramente) .
         
    * NOVO: - Não AdicionarNomes padrão
Se você incluir \\- doNotAddStandardNames como parâmetro de linha de comando ao executar gerar Conjuntos de dados Xml, gerar Conjuntos de dados O Xml não irá adicionar standard\\_name à addAttributes para quaisquer variáveis que não as variáveis denominadas latitude, longitude, altitude, profundidade ou tempo (que têm óbvio standard\\_name s) . Isto pode ser útil se você estiver usando o resultado da geração Conjuntos de dados Xml diretamente dentro ERDDAP™ sem editar a saída, porque gerar Conjuntos de dados Xml muitas vezes adivinha standard\\_name Está incorrectamente. (Observe que sempre recomendamos que você edite o resultado antes de usá-lo ERDDAP .) Usando este parâmetro terá outros efeitos relacionados menores porque o adivinhado standard\\_name é frequentemente usado para outros fins, por exemplo, para criar um novo long\\_name , e para criar as configurações da barra de cores. Graças ao Kevin O'Brien.
         
    * NOVO: Agora você pode colocar&lt;atualizaçãoMaxEvents&gt;10&lt;/updateMaxEvents&gt; em datasets.xml   (com as outras configurações perto do topo) para alterar o número máximo de alterações de ficheiros (padrão=10) que será processado pelo sistema updateEveryNMillis. Um número maior (100?) pode ser útil quando é muito importante que o conjunto de dados seja mantido sempre atualizado. Ver o [atualizar documentaçãoMaxEvents](/docs/server-admin/datasets#updatemaxevents) . Graças ao John Maurer.
         
    * NOVO: Adicionado apoio para o global " real\\_time =verdadeiro | false" String atributo.
Se isto for falso (o padrão) e se o conjunto de dados não usar atualização Todos osNMillis, ERDDAP™ irá armazenar respostas às solicitações de tipos de arquivos onde o arquivo inteiro deve ser criado antes ERDDAP™ pode começar a enviar a resposta ao usuário e reutilizá-los por cerca de 15 minutos (Por exemplo, .nc , .png) .
Se isto estiver definido como verdadeiro ou se o conjunto de dados usar a atualização Todos osNMillis, ERDDAP™ nunca irá cache os arquivos de resposta e sempre retornará arquivos recém-criados.
Graças ao John Maurer.
         
    * NOVO: Os e-mails agora são enviados em um e-mail separado Thread. Isso torna o carregamento de conjuntos de dados e outras ações que geram e-mails mais rápido porque o loadDatasets não precisa esperar o email ser enviado, o que às vezes leva muito tempo. O novo sistema pode enviar vários e-mails por sessão de e-mail, reduzindo assim o número de logins de servidor de e-mail e reduzindo o risco de falhas por serem muito frequentes. Existem estatísticas para o e-mail Thread na página status.html e mensagens de diagnóstico em log.txt -- procure por "email Thread". Note que uma contagem de nEmailsPerSession=0, indica problemas, ou seja, uma sessão de e-mail não foi capaz de enviar nenhum e-mail.
Graças ao Bob Simons.
         
    * ALTERADO: Os e-mails agora são enviados com código ligeiramente diferente (devido a Java 17 e a mudança para o e-mail Thread) . Se você tiver problemas em enviar e-mails, por favor, e-mail erd.data at noaa.gov .
         
    * NOVO: As ações de assinatura que "tocam" um URL remoto são agora tratadas em um touchThread separado. Isso torna o carregamento de conjuntos de dados e outras ações que tocam URLs mais rápido porque o loadDatasets não precisa esperar o toque ser concluído, o que às vezes leva muito tempo. Há estatísticas para o touchThread na página status.html e mensagens de diagnóstico no log.txt -- procure por "touchThread".
Graças ao Bob Simons.
         
    * NOVO: Na página status.html, na "Major LoadDatasets Time Series", há uma nova coluna "shed" que indica o número de solicitações que foram lançadas porque atual ERDDAP™ o uso de memória foi muito alto. Pedidos que são derramados retornarão o código de estado HTTP 503 "Serviço disponível". Esses pedidos não eram necessariamente um problema. Acabaram de chegar numa altura agitada. Isto foi parte de uma renovação de como ERDDAP™ lida com o uso de alta memória.
         
    * NOVO: Nos computadores Unix/Linux, existe agora uma linha "OS Info" na página web status.html com informações atuais do sistema operacional, incluindo carga de CPU e uso de memória.
         
    * Agora, quando ERDDAP™ é reiniciado e rápidoRestart=true, EDDTableFromFiles datasets irá reutilizar subconjunto .nc e distinto .nc . Para alguns conjuntos de dados, isso diminui muito o tempo para carregar o conjunto de dados (p. ex., de 60 segundos a 0,3s) . Junto com o novo e-mail Thread e taskThread (ver acima) , isso deve acelerar muito o reinício ERDDAP™ para muitos ERDDAP™ Instalações. Graças ao Ben Adams e ao John Kerfoot.
         
    * ALTERADO: Anteriormente, conjuntos de dados órfãos (conjuntos de dados que estão ao vivo ERDDAP™ mas não estão em datasets.xml ) foram simplesmente anotados no status. html e em log.txt após cada grande loadDatasets. Agora, eles são automaticamente removidos de ERDDAP™ e anotado em status.html e em log.txt, e enviado para email Tudo. Então se você quiser remover um conjunto de dados de ERDDAP™ , agora tudo que você tem que fazer é remover seu pedaço de xml em datasets.xml e será removido no próximo grande loadDatasets. Graças ao Bob Simons.
         
    * BUG conhecido em netcdf-java v5.5.2 e v5.5.3: A EDDGrid DeThreds Opção de catálogo em GerarDatasets Xml costumava trabalhar para catálogos ThREDS que incluem referências a conjuntos de dados em catálogos THREDS remotos. Agora não. Relatei o problema aos desenvolvedores do netcdf-java.
         
    * BUG FIX: Para os usuários do Docker configuração setup.xml parâmetros via ERDDAP \\__ paramName_: para parâmetros inteiros e booleanos (Por exemplo, e-mail SmtpPort) , ERDDAP™ estava incorretamente procurando por apenas _paramName_. Agora ele procura por _ ERDDAP \\_paramName_. Graças ao Alessandro De Donno.
         
    * MUDANÇA: ERDDAP™ o sistema de teste agora utiliza um sistema automatizado para verificar se as imagens de teste recém-criadas são exatamente como esperado. Graças ao Chris. John para a sugestão e Bob Simons para a implementação.
         

## Versão 2.18{#version-218} 
 (lançado 2022-02-23) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * Nenhuma
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * BUG FIX: .nc Os arquivos não foram fechados em algumas circunstâncias. Agora estão. Graças a Marco Alba, Roland Schweitzer, John Maurer e outros.
         

## Versão 2.17{#version-217} 
 (lançado 2022-02-16) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * BUG FIX: Após alterações ao orderBy sistema há alguns anos, Tabledap's Make A Graph não lidou corretamente com muitas consultas que usaram orderBy _Xxx_. Agora sim. Graças ao Maurice Libes.
         
    * Anteriormente, ERDDAP™ pedidos rejeitados. transparente Png's quando os valores de latitude e/ou longitude estavam parcialmente ou totalmente fora de alcance. ( ERDDAP™ Questões GitHub #19, postado por Rob Fuller -- obrigado por postar que Rob) Agora ele retorna pixels transparentes para quaisquer áreas fora de alcance da imagem. Isso é útil para muitas aplicações de clientes. As mudanças de código para fazer essa mudança foram feitas inteiramente por Chris John. Muito obrigado, Chris&#33;
         
    * Anteriormente, ERDDAP™ rejeited griddap requests where the index values for a dada dimension was \\[ alto:baixo \\] . Agora torna esses pedidos válidos trocando os valores baixos e elevados. Isso resolve um problema de longa data para usuários e para programas externos como o xtracto que teve que acompanhar os poucos conjuntos de dados que têm valores de latitude que variam de alto a baixo, a fim de fazer requisição como \\[  (50) : (20)  \\] para que a solicitação no espaço do índice fosse \\[ baixo:alto \\] . Ver https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Agora, um pedido como \\[  (20) : (50)  \\] para um destes conjuntos de dados é automaticamente interpretado como \\[  (50) : (20)  \\] .
         
    * ALTERADO: .esriAscii solicita agora acionar uma caixa de diálogo "Arquivo : Salvar Como" no navegador do usuário. Graças ao Joel Van Noord.
         
    * BUG FIX: Agora, se a variável de longitude de um conjunto de dados de uma criança EDDGrid LonPM180 ou EDDGrid Lon0360 dataset tem um valid\\_min e/ou valid\\_max atributo, eles são removidos no EDDGrid LonPM180 ou EDDGrid Dataset Lon0360. Graças ao Roy Mendelssohn.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: Se você tivesse definido&lt;dataProviderFormActive&gt; para false para lidar temporariamente com a vulnerabilidade do XSS, por favor configure-o para true.
         
    * BUG FIX DE SEGURANÇA: Vulnerabilidade XSS fixa no Formulário do Fornecedor de Dados. Graças a Genaro Contreras Gutiérrez.
         
    * BUG FIX: Quando um dirctory AWS S3 tinha mais de 10000 arquivos, ERDDAP™ lançou um "Erro Interno". Isto está resolvido. Graças ao Andy Ziegler.
         
    * BUG FIX: EDDGrid SideBySide não permitiu variáveis sourceName s em diferentes conjuntos de dados para crianças ser o mesmo. Agora sim. Graças ao Joshua Stanford.
         

## Versão 2.16{#version-216} 
 (lançado 2021-12-17) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * ALTERAÇÕES/FIXAÇÕES DE CAUSA: Numerosas pequenas mudanças no sistema de tradução graças a sugestões de editores específicos da língua. Graças a Melanie Abecassis, Marco Alba, Jessy Barrete, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian e Mike Smit.
         
    * ADDED uma dispensa adequada e atribuição para o Google Translate, conforme exigido pelos termos do Google Translate. Além disso,&lt;html&gt; tag no HTML para cada página web agora identifica corretamente páginas web não-inglês como tendo sido traduzido por máquina. Graças ao Mike Smit.
         
    * BUG FIX: As páginas web de login estão agora trabalhando corretamente com diferentes configurações de idioma. Graças ao Mike Smit.
         
    * NOVO orderBy Sum filtro. E novos botões Verificar e Desmarcar Todos EDDGrid Página Web do Formulário de Acesso de Dados. Graças à contribuição de código de Marco Alba.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: Se você tem
        &lt;questionMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile&gt;
em seu arquivo setup.xml, você precisa remover a etiqueta inteira (recomendado, então o arquivo padrão é usado) ou alterá-lo para:
        &lt;questionMarkImageFile&gt;QuestionMark.png&lt;/questionMarkImageFile&gt;
         
    * Só para que saibas, [Adoção](https://adoptium.net/?variant=openjdk8) substituiu AdoptOpenJDK como fonte principal/recomendada de Java   (OpenJDK) .
         
    * MUDANÇA: Os arquivos de log de ERDDAP™ , Gerar conjuntos de dados Xml, e DasDds agora são UTF-8, não o conjunto de caracteres padrão do computador. Eu fiz um monte de verificação e fiz algumas mudanças para garantir que ERDDAP™ sempre especifica o conjunto de caracteres adequado ao ler ou escrever todos os tipos de arquivos, e não mais (em vários casos) depende do conjunto de caracteres padrão do computador. Isso corrigiu alguns erros e se aproximou o mais possível do objetivo de usar UTF-8 para tantos tipos de arquivos quanto possível (Por exemplo, .log, .xml, .html, .json , .json l, .nc Cabeçalho) . Note que muitos tipos de arquivos mais antigos são necessários para usar ISO-8859-1 (Por exemplo, OPeNDAP .das, dds, .csv, .tsv , .nc 3, .nccsv , .cpt) . Eu tentei anteriormente trabalhar com o grupo CF e com Unidata adicionar suporte para UTF-8 em .nc 3 arquivos; ambos eram resistentes.
         
    * NOVO: Ao baixar arquivos do AWS S3, ERDDAP 's cache' Sistema FromUrl em EDDGrid Arquivos e tabela EDD FromFiles agora usa o novo AWS Transfer Manager para baixar arquivos através de blocos paralelizados (assim muito rápido) . O rendimento do alvo é definido em 20 Gbps, por arquivo, então isso funciona bem com todos os tipos de instância AWS, mas especialmente aqueles que têm excelente "Performance de trabalho em rede". Com esta mudança ERDDAP 's cache' O sistema FromUrl agora oferece velocidades comparáveis à abordagem de xarray de downloads paralelizados de arquivos pré-enchidos, mas sem a necessidade de converter os arquivos fonte de .nc e .hdf em arquivos de xarray. Na verdade, ERDDAP 's sistema é melhor se houver um pedido posterior para ler do mesmo arquivo, porque ERDDAP™ agora tem uma cópia local do arquivo. A nossa comunidade passou anos a padronizar .nc e .hdf ficheiros. Agora não temos que jogar tudo isso para fora só para obter bom desempenho ao armazenar dados no AWS S3. Graças ao Rich Signell.
         
    * SearchEngine=Lucine está, por enquanto, desactualizada. É um sistema complexo que muitas vezes produz resultados que são ligeiramente diferentes do comportamento mais desejável de buscaEngine=original. Para quase todos ERDDAP™ instalações, as economias de tempo da Lucene não compensam as diferenças de resultados. Por favor, use SearchEngine=original, se possível. Se isso causar problemas, por favor envie um e-mail para Bob.
         
    * O Lucene SearchEngine agora se comporta mais como o original SearchEngine. Já não há casos em que o luceno pensa que um conjunto de dados corresponde e o original não. Além disso, os rankings de luceno agora igualam os rankings originais (porque o original agora é sempre usado para calcular os rankings) .
         
    * BUG FIX: A partir de uma versão recente, ERDDAP™ parou de ver mais do que os primeiros 1000 objetos em um balde AWS S3 dado. Agora, ERDDAP™ novamente vê todos os objetos. Graças ao Andy Ziegler.
         
    * Agora EDDTableAggregate As linhas removem o actual\\_range atributo sempre que um ou mais dos conjuntos de dados da criança nunca sabe suas variáveis ' actual\\_range   (Por exemplo, EDDTableFromDatabase) . Graças ao Erik Geletti.
         

## Versão 2.15{#version-215} 
 (lançado 2021-11-19) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    *    ERDDAP™ tem um novo sistema para deixar o usuário especificar o idioma a ser usado para todas as páginas da web. Se ERDDAP™ instalação é configurada para usá-lo, a lista de idiomas aparecerá no canto superior direito de cada página da web. ERDDAP™ URL é de antes desta versão continuar a funcionar e sempre retornar conteúdo em inglês, como antes.
        
Nem todos os textos ou todas as páginas web foram traduzidos. Houve restrições de tempo neste projeto que impediu Qi e Bob de chegar a 100%.
        
A pergunta óbvia é: por que nos esforçamos tanto nisso quando o Chrome vai traduzir páginas da web em tempo real? A resposta é: desta forma, temos muito mais controle sobre como a tradução é feita. Notavelmente, existem muitas palavras que não devem ser traduzidas nas páginas web, por exemplo, os títulos e resumos de conjuntos de dados, os nomes de variáveis, parâmetros, unidades e organizações. Grande parte do esforço de tradução foi identificar palavras e frases que não deveriam ser traduzidas. Além disso, as traduções da máquina tenderam a mutilar certos tipos de marcação HTML. Gerir a tradução permitiu-nos minimizar este problema.
        
O projeto de tradução foi feito por Qi Zeng (um estagiário do Google Summer of Code) e Bob Simons usando o serviço web Tradução do Google. Foi um grande projecto. Obrigado. Qi&#33;
        
    * BUG FIX: ERDDAP™ agora permite ID ORCID's ter X como último dígito. Graças ao Maurice Libes.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER:
        
        * Você precisa fazer algumas alterações relacionadas com ERDDAP o novo sistema para permitir que os utilizadores especifiquem o idioma das páginas Web.
            * Na primeira linha de seu setup.xml e datasets.xml arquivos, mude para: codificação="UTF-8" e mude a codificação do documento em seu editor de texto para que ele seja salvo como um arquivo UTF-8. Gerar conjuntos de dados Xml agora assume que o datasets.xml é um ficheiro UTF-8.
            * Programadores que compilam ERDDAP : Todos ERDDAP™ Os arquivos .java devem ser tratados como UTF-8 por padrão. Você pode precisar adicionar "-codificação UTF-8" à linha de comando javac. (Fui eu.) 
            * Para ativar este sistema (fortemente recomendado) , na&lt;startBodyHtml5&gt; tag em que você especifica datasets.xml , mude "&amp&#33;loginInfo;" para "&amp&#33;loginInfo; | &amp&#33;language;" para que a lista de idiomas apareça no canto superior direito de cada ERDDAP™ Página Web.
            *    ERDDAP™ apenas utiliza a&lt;startBodyHtml5&gt; tag em que você especifica datasets.xml para especificar o conteúdo HTML para o banner no topo de cada ERDDAP™ página web, não importa qual idioma o usuário seleciona. Se você alterar essa etiqueta para usar
" &EasierAccessToScientificData; " em vez de "Acesso mais fácil aos dados científicos" e
" &BroughtToYouBy; "em vez de "traduzido para ti" ERDDAP™ usará versões traduzidas dessas frases no banner.
            * Da mesma forma, o novo padrão&lt;DescriçãoHtml&gt; in datasets.xml é
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
As últimas 3 linhas de conteúdo são coisas que serão substituídas por texto traduzido. Se você converter algum deles (notavelmente & isto ParticularErddap;) ou todos eles para explicitar texto em datasets.xml   (que tem prioridade, se presente) ou messages.xml, esse texto aparecerá independentemente do idioma que o usuário selecionar. Isso não é perfeito, mas eu pensei que alguns administradores gostariam de editar&lt;TheShortDescriptionHtml&gt; em 35 arquivos diferentes para fornecer 35 versões traduzidas diferentes dessa tag.
        
          
         
    * ALTERADO: Alguns erros são agora tratados de forma ligeiramente diferente e assim pode ser adicionado ao registro de "Requisitos Falhados" no status.html e no Daily Report Email. Então esses números podem ser um pouco maiores do que antes.
         
    * BUG FIX: Gerar conjuntos de dados Xml para EDDGrid Lon0360 e EDDGrid O LonPM180 agora exclui conjuntos de dados de origem com datasetID =~".\\*\\_LonPM180" e datasetID =~".\\*\\_Lon0360", respectivamente.
         

## Versão 2.14{#version-214} 
 (lançado 2021-07-02) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    *    (nenhum)   
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * NOVO: EDDGrid Lon0360 que faz um conjunto de dados em grelha com valores de longitude &gt;=0 e&lt;=360 de um conjunto de dados em grelha com valores de longitude &gt;=-180 e&lt;=180. Ver o [ EDDGrid Documentação Lon0360](/docs/server-admin/datasets#eddgridlon0360) . Graças ao Dale Robinson.
         
    * NOVO: ERDDAP™ administradores agora podem substituir qualquer valor no setup.xml através de uma variável de ambiente chamada ERDDAP \\__valorName_ antes de executar ERDDAP . Por exemplo, use ERDDAP \\_baseUrl substitui o&lt;valor baseUrl&gt;. Isso pode ser útil ao implantar ERDDAP™ com um recipiente, como você pode colocar configurações padrão em setup.xml e, em seguida, fornecer configurações especiais através de variáveis de ambiente. Se você fornecer informações secretas para ERDDAP™ através deste método, certifique-se de verificar se as informações permanecerão secretas. ERDDAP™ somente lê as variáveis de ambiente uma vez por startup, no primeiro segundo de startup, então uma maneira de usar isso é: definir as variáveis de ambiente, iniciar ERDDAP™ , esperar até ERDDAP™ é iniciado, então desativa as variáveis de ambiente. Graças ao Marc Portier.
         
    * Agora, se alguns arquivos em um EDDTableFrom... Conjunto de dados de arquivos com muitos arquivos têm alguns valores String muito longos, o conjunto de dados irá carregar muito mais rápido e responder às solicitações muito mais rápido. Anteriormente, ERDDAP™ iria alocar um monte de espaço para os valores min e max String nos arquivos que são armazenados com informações de arquivo para tais conjuntos de dados. O arquivo resultante foi enorme, fazendo com que fosse escrito e lido lentamente. Graças ao OBIS.
         
    * Agora, ERDDAP™ faz um trabalho melhor de interpretar sequências de caracteres incomuns e inválidas em arquivos CSV. Graças ao OBIS.
         
    * FIX: Após um ano de problemas com Cassandra, finalmente instalei Cassandra com sucesso (v2) novamente e assim foi capaz de repetir os testes com Cassandra v2. Então agora eu posso afirmar com mais confiança que ERDDAP™ trabalha com Cassandra v2 e v3. Graças à ONC.
         

## Versão 2.12{#version-212} 
 (lançado 2021-05-14) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * BUG FIX: Se você está na lista negra de assinatura, você agora não pode solicitar uma lista de suas assinaturas.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * A FAZER: NOVO: sistema para limitar automaticamente a capacidade de usuários maliciosos e usuários legítimos excessivamente agressivos para fazer um grande número de pedidos simultâneos que degradariam o desempenho do sistema para outros usuários. Existem 3 novas etiquetas opcionais em datasets.xml que você pode / deve adicionar logo após&lt;grafoAntecedentesCor&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Para mais informações, consultar [ipAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ também agora imprime o "Número de usuários únicos (desde a inicialização) " na página status.html.
Graças à pessoa na China atacando o meu ERDDAP™ instalação.
         
    * MUDANÇA para o comportamento do driver Postgresql: Quando eu atualizei o driver Postgresql, os nomes das colunas na lista de tabelas geradas por Postgresql e GenerateDatasetsXml voltaram todos maiúsculas, em vez de todos minúsculas, como antes. Não sei se isso afetará outras coisas, já que as bases de dados frequentemente consideram esses nomes como insensíveis. Meu conjunto de dados de teste ainda funciona corretamente. Mas se o seu conjunto de dados parar de funcionar com isto ERDDAP™ atualização, esta é a possível causa para prosseguir primeiro.
         
    * BUG FIX: ERDDAP™ agora também lida com arquivos privados AWS S3 corretamente. Houve outras melhorias relacionadas ao manuseio de arquivos AWS S3. Graças ao Michael Gangl e ao Dylan Pugh.
         
    * NOVO: EDDGrid DeNcFiles e EDDGrid FromNcFiles Unpacked pode agora ler dados de "estruturas" em .nc 4 e .hdf 4 ficheiros. Para identificar uma variável que é de uma estrutura, o&lt; sourceName &gt; deve usar os formatos: _fullStructureName_ | _memberName_, por exemplo group1/myStruct | O meuMembro. Graças ao NRL.
         
    * ALTERADO: Agora, se o uso atual da memória mais este pedido é ainda ligeiramente alto, conjuntos griddap n Threads para este pedido para 1. Assim, ERDDAP™ conserva a memória quando a memória é escassa. Graças à pessoa na China atacando o meu ERDDAP™ instalação.
         
    * NOVO sistema para monitorar o número de arquivos abertos (que inclui soquetes e algumas outras coisas, não apenas arquivos) em Tomcat em computadores Linux. Se alguns arquivos por engano nunca se fecham, o número de arquivos abertos pode aumentar até que exceda o máximo permitido e inúmeras coisas realmente ruins acontecem. Então agora, em computadores Linux (a informação não está disponível para Windows) :
        
        * Há uma nova coluna "Abrir arquivos" na extrema direita da página web status.html mostrando a porcentagem de arquivos max abertos. No Windows, mostra apenas "?".
        * Quando ERDDAP™ gera essa informação no final de cada grande reload dataset, ele irá imprimir para o log. ficheiro txt:
openFileCount=_current_ de max=_max_%=_percent_
        * Se a porcentagem for &gt;50%, um email é enviado para ERDDAP™ administrador e o email Tudo Para endereços de e-mail.
        
Para saber mais, ou se você vê este problema em seu ERDDAP™ , ver [Demasiados Ficheiros Abertos](/docs/server-admin/additional-information#too-many-open-files) .
Graças à pessoa na China atacando o meu ERDDAP™ instalação.
         
    * NOVO: Eu adicionei um monte de verificação e manipulação de "Muitos arquivos abertos", então a tarefa apenas pára e o usuário vê a mensagem de erro. Os arquivos de dados não serão mais marcados como ruins se lê-los resultar em um erro de "muitos arquivos abertos".
         
    * NOVO \\[ bigPaitDirectório \\] /badFilesFlag directory:
Se você colocar um arquivo nesta pasta com um datasetID como nome do ficheiro (o conteúdo do arquivo não importa) , ERDDAP™ irá apagar os arquivos defeituosos .nc arquivo para esse conjunto de dados (Se existir) e recarregar o conjunto de dados o mais rápido possível. Isto causa ERDDAP™ para tentar novamente trabalhar com os arquivos anteriores (Errado?) marcado como mau. Graças ao Marco Alba.
         
    * ALTERADO: Na inicialização, se um EDDGrid De...Arquivos ou EDDTableDe... O conjunto de dados dos ficheiros tem inicialmente 0 ficheiros na sua lista de ficheiros válidos conhecidos (Por exemplo, é um novo conjunto de dados) , então ERDDAP™ Adia o carregamento e define uma bandeira para que seja carregada o mais rápido possível após o término dos principais conjuntos de dados de carga. Isto acelera a inicialização inicial quando existem novos conjuntos de dados.
         
    * ALTERADO: FileVisitorDNLS.testAWSS3 () e FileVisitorSubdir.testAWSS3 () ; agora use o AWS v2 (não v1) SDK. Então agora o Git ERDDAP™ distribuição agora inclui todos os arquivos necessários e você não precisa mais adicionar manualmente o enorme arquivo de jar v1 AWS SDK.
         
    * Mudei para usar o Maven para detectar/recolher dependências (os arquivos .jar em /lib) . A mudança para v2 do AWS SDK exigiu isso. Será necessário para outros códigos importados no futuro. Um enorme agradecimento a Kyle Wilcox que forneceu o pom.xml que ele criou e usa, que resolveu vários problemas para mim.
         
    * ALTERADO: O parâmetro classpath (- cp) usado em GerarDatasetXml, DasDds e outros pequenos programas que vêm com ERDDAP™ , e no conselho aos programadores agora é muito mais simples e nunca mais deve mudar uma vez que se refere ao diretório, não os arquivos individuais:
classes \\- cp; C:\\ programs\\\_ tomcat\\ lib\\ servlet- api. jar; lib\\\ *
         (ou ':' em vez de ';' para Linux e Macs) .
         (Devia ter feito isto há anos, quando se tornou uma opção.)   
         
    * NOVO: Gerar conjuntos de dados Xml tem uma nova opção de utilitário: findDuplicateTime que irá pesquisar através de uma coleção de grades .nc   (e relacionados) arquivos para encontrar arquivos com valores de tempo duplicados. Ver [findDuplicate Tempo](/docs/server-admin/datasets#findduplicatetime)   
         
    * NOVO: datasets.xml pode agora incluir&lt;paletes&gt; tag que substitui a&lt;paletes&gt; valor da tag de messages.xml (ou reverte para o valor messages.xml se estiver vazio) . Isto permite- lhe alterar a lista de paletas disponíveis enquanto ERDDAP™ está a correr. Além disso, se você tem um subdiretório cptfiles no ERDDAP™ diretório de conteúdo, ERDDAP™ irá copiar todos os arquivos \\*.cpt nesse diretório para o \\[ tomcat \\] /webapps/erddap/WEB-INF/cptfiles directory cada vez ERDDAP™ Começa. Juntos, estas alterações permitem- lhe adicionar paletas e as alterações persistem quando instala uma nova versão do ERDDAP . Ver o [Documentação das paletas](/docs/server-admin/datasets#palettes)   
Graças a Jennifer Sevadjian, Melanie Abecassis, e talvez outras pessoas CoastWatch.
         
    * MUDANÇA: [&lt;lowDownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdowntrublemillis) agora é usado para todas as requisições falhadas, não apenas alguns tipos.
         
    * ALTERADO: O thread RunLoadDatasets agora interrompe o thread LoadDatasets em 3/4 LoadDatasets MaxMinutes então há mais tempo para LoadDatasets notar a interrupção e sair graciosamente. Também há mais e melhores mensagens de diagnóstico para isso.
         
    * MUDADO da versão antiga de Lucene para v8.7.0.
         
    * MUDANÇA: E-mails enviados por ERDDAP™ agora aparece com uma fonte de largura fixa.
         
    * MUDANÇA: EDDGrid FromFiles agora recebe valores de eixo, bem como atributos do FIRST | ÚLTIMO arquivo, conforme especificado em&lt;metadadosDe&gt;. Obrigado. (não) a Ken Casey, et al.
         
    * Suporte ADDED para as unidades inválidas "grau\\_Norte" e "grau\\_Leste" que são erroneamente usadas pelos arquivos recentes (desde 2020-10-01) na versão 5.3 L3-Colated (L3C) Conjuntos de dados SST (nceiPH53 sst d1dia e nceiPH53 sst n1dia) . ERDDAP™ agora pode padronizá-los para unidades válidas. Obrigado. (não) a Ken Casey, et al.
         

## Versão 2.11{#version-211} 
 (lançado 2020-12-04) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * BUG FIX: OrderByMean lançou um NullPointerException se uma variável tivesse apenas um \\_FillValue ou faltasse\\_ Valor definido. Agora lida com a situação corretamente. Graças ao Marco Alba.
         
    * BUG FIX: Houve problemas com os arquivos de texto ODV criados por ERDDAP™ em v2.10. Esses problemas estão resolvidos. Graças ao Shaun Bell.
         
    * BUG FIX: Apenas... ERDDAP™ v2.10: Se os limites lat lon foram especificados na URL, a caixa limite não foi desenhada no mapa mundial. Agora é outra vez. Graças ao John Maurer.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * BUG FIX: Apenas... ERDDAP™ v2.10: Os arquivos de script para ArchiveADataset, GerarDatasets Xml e DasDds não funcionaram porque eles não tiveram as alterações no classpath que foram adicionados com ERDDAP™ V2.10. Agora sim. Graças ao Marco Alba.
         
    * NOVO: In datasets.xml , você pode agora ter a etiqueta:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Atualmente, se verdadeiro (ou se a etiqueta estiver vazia, ou se a etiqueta não estiver no ficheiro) , quando o pedido de um usuário leva a um NullPointerException, ERDDAP™ enviará por e- mail o traço da pilha para erd.data at noaa.gov   (a ERDDAP™ equipe de desenvolvimento) . Isto deve ser seguro e seguro, uma vez que não existem informações confidenciais (Por exemplo, o pedidoUrl) está incluído no e-mail. Isso deve tornar possível pegar qualquer bug obscuro, totalmente inesperado que leve a NullPointerExceptions. Caso contrário, o usuário vê as exceções, mas o ERDDAP™ desenvolvedores não, então não sabemos se há um problema que precisa ser corrigido.
        
É possível que esta tag conduza a outras informações diagnósticas, similares que estão sendo enviadas para erd.data at noaa.gov no futuro. O conteúdo do email será sempre mínimo e relacionado a bugs, e não, por exemplo, informações de uso. Graças ao Marco Alba.
         
        
    * ALTERADO: Agora, tipos de arquivos compactados comuns ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) são também proibidos para pedidos de bytes. Isto é especificado através de&lt;extensionsNoRangeRequests&gt; in messages.xml.
         
    * PROBLEMA CONHECIMENTO: Como com ERDDAP™ 2,10, .nc Arquivos ml que tentam alterar um atributo, não alterem o atributo. Este é um bug conhecido no netcdf-java que eu relatei e eles dizem que será corrigido na próxima versão do netcdf-java.
         

## Versão 2.10{#version-210} 
 (lançado 2020-11-05) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * NOVO: O novo [Interpolato](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) conversor interpola eficientemente os valores de um conjunto de dados em grade. Como tal, é particularmente útil para pesquisadores que trabalham com dados de trilha animal. Este conversor leva em uma tabela com colunas de latitude, longitude e tempo (e talvez outras colunas) e retorna uma tabela com colunas adicionais com valores interpolados. Assim, isto é semelhante ao popular [Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto) script originalmente criado por Dave Foley, mas oferece a vantagem de processar até 100 pontos por pedido. Graças a Dave Foley e Jordan Watson ( NMFS ) .
         
    * MELHORADO: A Pesquisa Avançada agora é rígida para solicitações não-.html. Agora lançará exceções para pedidos que tenham erros permanentes (Por exemplo, pedidos em que minLet &gt; maxLet) ou erros temporários (Por exemplo, pedidos de standard\\_name que não existe) . Para requisições .html, a Pesquisa Avançada está inalterada: como acontece com as pesquisas do Google, ele faz o seu melhor e silenciosamente corrige ou ignora erros. Graças ao Rich Signell.
         
    * MELHORADO: O mapa na página de Pesquisa Avançada agora é maior (você ainda tem que apertar, mas menos) e significativamente mais preciso (mas ainda não perfeito) . Graças ao John Maurer.
         
    * MELHORADO: A configuração "Draw land mask" em Make A Graph web pages e a configuração &.land=... em URLs que solicitam um mapa agora suporta mais duas opções:
"Outline" apenas desenha o contorno da máscara de terra, fronteiras políticas, lagos e rios.
"Off" não desenha nada.
Ver o [&.land=... documentação](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Graças ao John Maurer.
         
    * MELHORIA: Gráficos e mapas criados por ERDDAP™ agora pode usar três novos tipos de marcadores: Borderless Cheio Quadrado, Borderless Cheio Círculo, Borderless Cheio até Triângulo. O código para isso foi contribuído por Marco Alba da ETT / EMODnet Physics. Graças ao Marco Alba.
         
    * NOVO: "files" o sistema agora suporta simples Respostas do tipo de arquivo (.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , ou .xhtml .) , por exemplo, [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Graças ao Kyle Wilcox.
         
    * MELHORADO: Os URLs gerados quando um usuário usa um formulário de acesso de dados (.html) ou um Make-A-Graph (.graph) página web agora corretamente por cento codificar os caracteres \\[ e \\] . Isso torna as URLs um pouco mais difíceis para os humanos lerem, mas é melhor do ponto de vista da segurança da web. Os administradores agora têm a opção de definir relaxadoQueryChars= ' \\[  \\]  | ' no arquivo Tomcat server.xml (menos seguro) ou não (mais seguro) .
Graças a Antoine Queric, Dominic Fuller-Rowell, e outros.
         
    * NOVO: Se um pedido a um conjunto de dados EDDTable incluir & adicionar Variáveis Onde (_atribuir Nome, atributo Valor_) , ERDDAP™ adicionará todas as variáveis que têm _atributo Nome=atributo Valor_ para a lista de variáveis solicitadas.
Ver o [& Adicionar Variáveis Quando a documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Graças a Aurelie Briand, et al.
         
    * MUDANÇA: ERDDAP™ agora recusa pedidos de intervalo de bytes para /files/ .nc ou .hdf ficheiros. Não tente se conectar ao remoto .nc ou .hdf arquivos como se fossem arquivos locais. É terrivelmente ineficiente e muitas vezes causa outros problemas. Em vez disso:
        * Utilização(OPeN)DAPsoftware cliente para conectar ERDDAP 's DAP serviços para este conjunto de dados (que têm /griddap/ ou / tabledap / no URL) . Isso é o que DAP é para.
        * Use o Formulário de Acesso de Dados do conjunto de dados para solicitar um subconjunto de dados.
        * Se você precisar de todo o arquivo ou acesso repetido durante um longo período de tempo, use curl , wget , ou seu navegador para baixar o arquivo inteiro, em seguida, acessar os dados de sua cópia local do arquivo.
             
    * MELHORADO: o .odv A opção de saída Txt foi reescrita para suportar a nova versão do ODV .txt arquivos e para apoiar a representação adequada de dados de trajetória, timeseries e perfil.
         
    * MELHORADO: Agora, termos de pesquisa em aspas duplas são interpretados como uma string json, para que eles possam ter caracteres codificados\\. Entre outras coisas, isso permite que você procure por uma correspondência exata para um atributo, por exemplo, "institution= NOAA  \\n " não corresponde a um conjunto de dados com a instituição= NOAA   NMFS . Graças ao Dan Nowacki.
         
    * MELHORADO: Em lugares adicionais, números de pontos flutuantes (especialmente flutuadores convertidos em duplos) agora aparecem como uma versão ligeiramente mais arredondada do número em lugares adicionais, por exemplo, um flutuador anteriormente mostrado como um duplo como 32.27998779296875, pode agora aparecer como 32.28. Graças ao Kyle Wilcox.
         
    * BUG FIX: arquivos de áudio inteiros não assinados foram lidos ligeiramente incorretamente. Agora são lidos corretamente.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * AVISO: A primeira vez que você corre ERDDAP™ v2.10, alguns conjuntos de dados baseados em arquivos de dados locais irão carregar **muito** lentamente porque ERDDAP™ precisa recriar sua base de dados de informações de arquivos. Após a lenta recarga inicial, eles carregarão rapidamente, como antes. Por favor, seja paciente.
         
    * COISAS QUE VOCÊ DEVE FAZER:
        * Quando você executa pela primeira vez v2.10, alguns conjuntos de dados podem não carregar porque ERDDAP™ é agora mais rigoroso sobre alguns metadados. Como antes, ERDDAP™ enviar-lhe-á um Relatório Diário quando carregar pela primeira vez. Isso incluirá as mensagens de erro para cada um dos conjuntos de dados que não carregaram. Leia as mensagens de erro para descobrir os problemas. Na maioria dos casos, você só precisa fazer uma pequena mudança nos metadados do conjunto de dados para resolver o problema.
             
        * In datasets.xml , procurar&lt; sourceName &gt;= (nota o '=' sinal, que identifica [valor fixo sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . Para a maioria ERDDAP™ Estas são raras. Se algum dos valores após '=' são strings (números não) , Você DEVE agora anexar o texto em citações duplas. Por exemplo,
Antes:&lt; sourceName &gt;=KZ401&lt;/ sourceName &gt;
Após:&lt; sourceName &gt;="KZ401"&lt;/ sourceName &gt;
             
        * NOVO: Há uma nova configuração opcional em setup.xml,&lt;DefaultAccessibleViaFiles&gt;, que define o padrão&lt;accessViaFiles&gt; para cada um dos conjuntos de dados. O padrão para esta nova etiqueta é false, que imita a anterior ERDDAP™ comportamento. Esta configuração de nível inferior pode ser anulada por um determinado conjunto de dados&lt;configuração acessívelViaFiles&gt;.
            
RECOMENDADO (porque há usuários que querem isso) :
Se queres fazer o EDD todo... FromFiles datasets acessíveis através do sistema de arquivos, então
            
            1. Adicione esta etiqueta ao seu arquivo setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Opcionalmente) Remover todos os
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
em datasets.xml uma vez que o padrão agora é verdadeiro.
                 
        * Adicionar atributos \\_FillValue:
             ERDDAP™ usado para ter um valor padrão \\_FillValue para todas as variáveis inteiras: o valor máximo do tipo de dados (Por exemplo, 127 para as variáveis de byte) . Agora não. Para evitar que estes valores sejam apresentados como valores de dados (não faltam valores) , você precisa indicar explicitamente esses atributos via \\_FillValue. De agora em diante, cada vez que você começar ERDDAP™ , ele enviará ao administrador um e-mail com uma tabela .csv com uma lista de variáveis de código inteiro que não têm \\_FillValue ou missing\\_value atributos, e os novos atributos \\_FillValue sugeridos. Ver [Adicionar \\_Fill Atributos de Valor](/docs/server-admin/datasets#add-_fillvalue-attributes) para mais informações e instruções.
             
        * Se você compilar ERDDAP™ , você precisa modificar o parâmetro classpath nas linhas de comandos javac para adicionar uma referência a estes novos jars: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * Tomcat 9 é agora a versão recomendada do Tomcat para ERDDAP . A versão mais recente do Tomcat 8.5+ também está bem por enquanto. Nós limpamos. ERDDAP 's [Instruções de instalação Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
A versão mais recente de Java 8 (não Java 9, 10, 11, ...) de [Adotar OpenJDK](https://adoptopenjdk.net/) permanece a versão recomendada de Java em vez ERDDAP . Java 8 tem suporte de longo prazo da AdopteOpenJDK para que permaneça seguro de usar, mas lembre-se de obter a última versão dele periodicamente por razões de segurança.
        
    * NOVO: Nomes de Código / Variáveis derivadas em conjuntos de dados tabulares
Os conjuntos de dados EDDTableFromFiles, EDDTableFromDatabase e EDDTableFromFileNames podem agora incluir expressões e scripts no sourceName . Isto permite- lhe criar novas variáveis com base nas variáveis existentes nos ficheiros de código. O cálculo para uma dada nova variável é feito dentro de uma linha dos resultados, repetidamente para todas as linhas. Por exemplo, para fazer uma variável de longitude com valores na faixa -180 - 180° de uma variável com valores na faixa 0 - 360°:
        &lt; sourceName &gt;=Math2. anglePM180 (row.columnDuplo ("Lon") ) &lt;/ sourceName &gt;
Para mais pormenores, ver [Nomes de Código do Programa](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Graças a Bob Simons (que planeou isto antes ERDDAP™ v1.0 e finalmente encontrou uma maneira de implementá-lo) , Kevin O'Brien, Roland Schweitzer, John Maurer, e a biblioteca Apache JEXL para fazer a parte realmente difícil (e fazendo bem) .
         
    * NOVO: Tipos de dados inteiros não assinados (ubyte, u short, uint, ulong) são agora apoiados. Note que muitos tipos de arquivos (por exemplo, .das, dds, .nc 3) não suporta todos estes novos tipos de dados. Ver o [Dados Documentação do tipo](/docs/server-admin/datasets#data-types) para detalhes sobre como ERDDAP™ trata destas diferenças. Notavelmente, já que(OPeN)DAP, notavelmente a resposta .dds, não suporta bytes assinados, longs, ou ulongs, você pode querer usar ERDDAP a representação tabular de .das e .das como visto no http .../erddap/ **info** /_ datasetID _.html (por exemplo, [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) que você também pode obter em outros tipos de arquivos ou .nccsv Resposta aos metadados (por exemplo, [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , ambos suportam todos os tipos de dados em todas as situações.
        
ATENÇÃO: Para conjuntos de dados que são afetados por esta alteração, é possível que você veja problemas com o conjunto de dados porque os dados que ERDDAP™ leituras da fonte podem ser diferentes (Por exemplo, as variáveis previamente lidas como inteiros assinados podem agora ser lidas como inteiros não assinados) . Os problemas resultantes incluem: novos arquivos não sendo adicionados ao conjunto de dados e/ou erros quando você tenta acessar os dados. Se um conjunto de dados tem problemas, a primeira coisa a tentar é [definir um duro Bandeira](/docs/server-admin/additional-information#hard-flag) para o conjunto de dados. Se isso não resolver o problema, então você tem que olhar para log. txt para ver as mensagens de erro, mergulhar no datasets.xml para o conjunto de dados, e/ou talvez rerun gerarDatasets.xml para o conjunto de dados.
Graças ao netcdf-java 5.x (que forçou a questão) e o próximo CF 1.9.
        
    * Agora há. [melhor documentação/conselho](/docs/server-admin/datasets#s3-buckets) para como criar um conjunto de dados de arquivos em baldes AWS S3. Graças ao Micah Wengren.
         
    * MUDANÇA: Existem várias alterações relacionadas com "files" sistema.
        * O código para lidar com isso foi reescrito para ser utilizável por mais classes.
             
        * NOVO: Pedidos de usuário para listas de diretórios podem agora solicitar que a resposta seja um dos tipos de tabela simples padrão, adicionando a extensão de arquivo desejada: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , ou .xhtml ). Por exemplo,
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Graças ao Kyle Wilcox e ao Shane St Savage.
             
        * Agora, gere Conjuntos de dados Xml não incluirá uma&lt;accessViaFiles&gt; tag na saída. O pressuposto é que o conjunto de dados dependerá do valor do novo&lt;padrãoAcessívelViaFiles&gt; tag in setup.xml. Ver [acessível ViaFiles](/docs/server-admin/datasets#accessibleviafiles) .
             
        * MELHORADO: Outros tipos de conjuntos de dados agora suportam acessíveis ViaFiles: EDDGrid Sidebyside, EDDGrid AgregateExistingDimension, EDDGrid DeErddap, EDDTableDeErddap, EDDGrid A partir da tabelaEDD, tabela EDDDe EDDGrid , e EDDGrid De Etopo. Para estes, os arquivos de um determinado conjunto de dados remoto/criança só serão acessíveis se o pai e o conjunto de dados remoto/criança tiverem acesso ViaFiles definido como true (talvez via&lt;DefaultAccessibleViaFiles&gt;). Graças a Damian Smyth e Rob Fuller.
             
        * A FAZER / RECOMENDAÇÃO: Recomendamos fazer todos os conjuntos de dados relevantes acessíveis através do sistema de arquivos, definindo&lt;DefaultAccessibleViaFiles&gt; to true in setup.xml porque há um grupo de usuários para quem esta é a maneira preferida de obter os dados. Entre outras razões, a "files" sistema torna mais fácil para os usuários ver quais arquivos estão disponíveis e quando eles foram alterados pela última vez, tornando assim fácil para um usuário manter sua própria cópia de todo o conjunto de dados. Se você geralmente não quer tornar os conjuntos de dados acessíveis através do sistema de arquivos, definir&lt;DefaultAccessibleViaFiles&gt; to false. Em ambos os casos, basta usar&lt;accessViaFiles&gt; para os poucos conjuntos de dados que são exceções à política geral definida por&lt;padrãoAcessívelViaFiles&gt; (por exemplo, quando o conjunto de dados utiliza .nc Arquivos ml, que não são realmente úteis para usuários) .
             
    * MELHORADO: Agora, se um conjunto de dados de origem tem informações de CF grid\\_mapping, gerar Conjuntos de dados Xml para conjuntos de dados em grade adicionará a informação ao global&lt;addAtts&gt;, e a informação será adicionada ao global&lt;sourceAtts&gt; toda vez que os dados são lidos do arquivo. A informação aparecerá nos atributos globais do conjunto de dados como um conjunto de atributos com o prefixo grid\\_mapping\\_ .
         
    * MELHORADO: Suporte para grupos ao ler .nc 4 (e até certo ponto em .hdf 5) ficheiros. Geralmente, ERDDAP™ o conjunto de dados será construído a partir das variáveis de um dos grupos do arquivo. Também, Gerar conjuntos de dados Xml para EDDGrid DeNcFiles e EDDGrid FromNcFiles Desembalado agora pede um "grupo" (Por exemplo, "" para qualquer/todos os grupos, "algum grupo", "algum grupo/algum subgrupo", ou " \\[ raiz \\] "para apenas o grupo raiz) . Graças a Charles Carleton e Jessica Hausman.
         
    * MELHORADO: Gerar conjuntos de dados Xml para EDDGrid DeNcFiles e EDDGrid FromNcFiles Desembalado agora suporta um parâmetro opcional "DimensionsCSV" que permite especificar os nomes de origem das dimensões que você deseja que este conjunto de dados use. Use "" para obter as variáveis que usam mais dimensões, como antes. Além disso, um pequeno erro relacionado que ocorreu com este tipo de arquivo é agora corrigido. Graças a Sujal Manandhar.
         
    * BUG FIX: Gerar conjuntos de dados Xml agora lista corretamente "EDDTableFromJsonlCSVFiles" (não "EDDTableFromJsonlCSV") como uma das opções EDDType. Graças ao Andy Ziegler.
         
    * MELHORADO: EDDGrid FromNcFiles Unpacked agora padroniza atributos de "unidades" para udunidades padrão/"canônicas" (o mesmo método que o conversor de unidades) . Por exemplo, "meter per second" , "meters/second" , "m.s^-1" , e "m s-1" todos se tornam "m s-1" . Graças ao Andy Ziegler.
        
AVISO: É possível que isso cause problemas para alguns conjuntos de dados existentes (Por exemplo, fazer com que novos ficheiros sejam rotulados como "ruim") . Em caso afirmativo, [definir um duro Bandeira](/docs/server-admin/additional-information#hard-flag) para o conjunto de dados para que todos os arquivos fonte sejam reler com o novo sistema.
        
    * Agora, uma variável&lt; sourceName &gt; pode especificar um valor fixo de =NaN e a variável pode ter um actual\\_range atributo que especifica um intervalo finito. Isto é às vezes útil para que um conjunto de dados (notavelmente um conjunto de dados EDDTableFromFileNames) pode ter variável dummy (s)   (Por exemplo, latitude, longitude, tempo) com valores fixos de NaN, mas com uma validade actual\\_range   (como definido pelo atributo) . Em seguida, em Pesquisa Avançada um usuário pode procurar por conjuntos de dados que têm dados em uma latitude específica, longitude, intervalo de tempo e este conjunto de dados será capaz de dizer que tem dados relevantes (embora todas as linhas de dados reais mostrarão NaN) . Ver o [documentação de valor fixo](/docs/server-admin/datasets#fixed-value-sourcenames) .
Graças ao Mathew Biddle.
         
    * NOVO: Agora, o datasets.xml bloco para um EDDTableFromAsciiFiles ou EDDTableFromColumnarAsciiFiles dataset pode incluir uma tag que diz ERDDAP™ para ignorar todas as linhas no topo do arquivo até e incluindo a linha que corresponde à expressão regular especificada. Por exemplo,
        &lt;skipHeaderToRegex&gt;\\\*\\\*\\\*Fim do cabeçalho.\\*&lt;/skipHeaderToRegex&gt;
irá ignorar todas as linhas até e incluindo uma linha que começa com "\\*\\*\\* FIM DO CABEÇA". Ver [&lt;skipHeaderToRegex&gt; documentation] (/docs/server-admin/datasets#skipheadertoregex) .
Graças a Eli Hunter
         
    * NOVO: Agora, o datasets.xml bloco para um EDDTableFromAsciiFiles ou EDDTableFromColumnarAsciiFilesdatasset pode incluir uma tag que diz ERDDAP™ para ignorar todas as linhas no arquivo que correspondem à expressão regular especificada. Por exemplo,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

irá saltar todas as linhas que começam com "#". Ver [&lt;skipLinesRegex&gt; documentação] (/docs/server-admin/datasets#skiplinesregex) .
Graças ao Eli Hunter.
         
    * NOVO: O datasets.xml bloco para qualquer conjunto de dados EDDTable agora pode incluir & adicionar Variáveis Onde (_atributoNomesCSV_) . Se acontecer, ERDDAP™ irá adicionar um elemento para cada um dos atributos indicados Nomes para o Formulário de Acesso de Dados do conjunto de dados (Página Web .html) para tornar mais fácil para os usuários adicionar & adicionar Variáveis Onde (_atribuir Nome, atributo Valor_) ao pedido.
Ver o [& Adicionar Variáveis Quando a documentação](/docs/server-admin/datasets#addvariableswhere) .
Graças a Aurelie Briand, et al.
         
    * NOVO Ferramenta de Terceiros: ERDDAP -lint
         ERDDAP -lint é um programa de Rob Fuller e Adam Leadbetter do Irish Marine Institute que você pode usar para melhorar os metadados do seu ERDDAP™ conjuntos de dados. ERDDAP -lint "contém regras e uma aplicação web estática simples para executar alguns testes de verificação contra o seu ERDDAP™ servidor. Todos os testes são executados no navegador da web." Como o [Ferramenta de lint Unix/Linux](https://en.wikipedia.org/wiki/Lint_(software) ), você pode editar as regras existentes ou adicionar novas regras. Ver [ ERDDAP -lint](https://github.com/IrishMarineInstitute/erddap-lint) para mais informações.
        
Esta ferramenta é especialmente útil para conjuntos de dados que você criou há algum tempo e agora quer atualizar suas preferências de metadados atuais. Por exemplo, versões iniciais do GenerateDatasets Xml não se esforçou em criar global creator\\_name , creator\\_email , criador\\_type, ou creator\\_url metadados. Você poderia usar ERDDAP -lint para identificar os conjuntos de dados que não possuem esses atributos de metadados.
        
Graças a Rob e Adam por criar esta ferramenta e torná-lo disponível para o ERDDAP™ comunidade.
        
    * NOVO: Agora está tudo bem se alguns dos arquivos em um EDDGrid O conjunto de dados FromFiles não tem todas as variáveis do conjunto de dados. Os arquivos serão incluídos como se tivessem as variáveis (com todos os valores em falta) .
Graças ao Dale Robinson e ao Doug Latornell.
         
    * NOVO: Existem novas estatísticas de uso no arquivo de log e no Daily Report para ajudar os administradores a identificar os usuários que estão causando problemas de memória. As estatísticas são nomeadas "OutOfMemory (Tamanho do Array) ", "Fora de Memória (Muito Grande) ", e "Fora de Memória (Muito Grande) ". Eles mostram os endereços IP dos usuários que fizeram pedidos nessas categorias e o número de pedidos que eles fizeram. Se não houvesse pedidos problemáticos, estas estatísticas não aparecerão. "Fora de Memória (Tamanho do Array) " e "Fora de Memória (Muito Grande) " os pedidos geralmente não são um problema porque os pedidos eram tão grandes que ERDDAP™ pegou-os rapidamente e retornou uma mensagem de erro. A "Saída da Memória" (Muito Grande) "os pedidos são mais perigosos porque ERDDAP™ fez algum esforço antes de perceber que não havia memória suficiente atualmente disponível para lidar com a solicitação (embora o problema possa ser outros pedidos logo antes desses pedidos) .
        
Há também novas estatísticas chamadas "Large Request, IP address" que mostram os endereços IP dos usuários que fizeram grandes pedidos (atualmente, grelhado .nc arquivos &gt; 1GB) .
        
Além disso, a tabela de séries temporais na página status.html agora inclui uma coluna "memFail" mostrando o número de solicitações que falharam com "OutOfMemory (Muito Grande) " erros desde os últimos grandes conjuntos de dados de carga. Qualquer número diferente de 0 aqui é pelo menos algum motivo de preocupação.
Graças ao Bob Simons.
        
    * NOVO: A nova versão de Hyrax mostra listas de diretórios diferentes das anteriores. ERDDAP™ agora pode ler as listas de diretórios antigas e novas.
         
    * NOVO: Recarregamento de dados e respostas do usuário que levam &gt; 10 segundos para terminar (com sucesso ou sem sucesso) são marcados com " (&gt;10s&#33;) ". Assim, você pode pesquisar o arquivo log.txt para esta frase para encontrar os conjuntos de dados que foram lentos para recarregar ou o número de requisição dos pedidos que foram lentos para terminar. Você pode então olhar mais alto no arquivo log.txt para ver qual era o problema do conjunto de dados ou qual era a solicitação do usuário e de quem era. Estas cargas lentas do conjunto de dados e solicitações do usuário estão por vezes ERDDAP . Assim, saber mais sobre essas solicitações pode ajudá-lo a identificar e resolver problemas.
    * MELHORADO: Ao validar um conjunto de dados CF DSG, ERDDAP™ agora garante que as variáveis com atributos cf\\_role estão na lista correspondente de cdm\\_...\\_variables e não estão em outras listas de cdm\\_...\\_variables. Por exemplo, se um conjunto de dados timeseriesPerfile tem uma variável "station\\_id" que tem o atributo cf\\_role=timeseries\\_id, então "station\\_id" deve estar na lista cf\\_timeseries\\_variables, mas não deve estar na lista cf\\_profile\\_variables.
Graças ao Micah Wengren.
         
    * MELHORADO: 'Simplificar' agora é mais rápido, usa menos memória, e pode retornar LongArray. Graças a Unidata .
         
    * MELHORADO: QuickRestart agora é significativamente mais rápido para EDDTableFrom (nc-relacionada) Ficheiros (except EDDTableFromNcCFFiles e EDDTableFromInvalidCRAFiles) porque fazer Esperado (e outro lugar) agora basta ler os metadados do arquivo de amostra em vez de ler todos os dados. Graças à Jessica Austin.
         
    * MELHORADO: Agora existe suporte para cadeias de tempo com precisão maior do que para-o-millissegundo se os dígitos adicionais são todos 0's, por exemplo, "2020-05-22T01:02:03.456000000Z". Graças a Yibo Jiang.
         
    * MELHORADO: GereDatasetsXml's EDD.suggestDestinationName usado para remover '(' e tudo depois. Agora ele remove (.\\*) apenas se esse for o fim do sourceName . Agora também remove \\[ .\\* \\] só se este for o fim do sourceName . Graças ao Julien Paul.
         
    * MELHORADO: Gerar conjuntos de dados O Xml agora faz a variável destinationName s unique by added \\_2, \\_3, ..., conforme necessário. Graças ao Julien Paul.
         
    * MELHORADO: Quando Calendar2.parseDateTime analisa dd, hh ou HH, o primeiro 'dígito' pode agora ser um espaço.
    * PROBLEMA CONHECIMENTO: A começar por ERDDAP™ 2,10, .nc Arquivos ml que tentam alterar um atributo, não alterem o atributo. Este é um bug conhecido no netcdf-java que eu relatei e eles dizem que será corrigido na próxima versão do netcdf-java.
         
    * LINKS FRIX: Eu fiz um sistema adequado para testar ligações quebradas em ERDDAP™ páginas web, então agora deve haver muito poucos links quebrados (pelo menos a partir de cada data de lançamento -- novos links quebrados surgem frequentemente) .
         
    * BUG FIX: EDDTableFromHttpGet falhou com certos tipos de pedidos. Agora não. Graças à Emma no BODC.
         
    * BUG FIX: Para lidar com algumas solicitações, o EDDTable fez um arquivo temporário para cada variável solicitada, com um nome de arquivo terminando no nome da variável. Se o nome da variável também foi um tipo de compressão (por exemplo, Z) , ERDDAP tentaria (e falhar) para descomprimir o ficheiro temporário. Agora os nomes de arquivos temporários terminam em ".temp". Graças ao Mathew Biddle.
         
    * BUG FIX: GerarDatasetsXml e Calendar2.convertTo Java DataTime O formato agora é muito menos provável de fazer uma alteração incorreta ao tentar corrigir um formato de data hora possivelmente inválido. Notavelmente, nenhum formato dateTime sugerido automaticamente será modificado. Graças ao Mathew Biddle.
         
    * BUG FIX: Se houve um erro ao obter conteúdo a partir de uma URL remota, e se o erroStream conteúdo é comprimido, ERDDAP™ agora descompacta corretamente a mensagem de erro. Graças ao Bob Simons.
         
    * BUG FIX:&lt;subscrevaToRemoteErddapDataset&gt; não estava sendo aplicado quando o EDD... O conjunto de dados FromErddap foi um conjunto de dados para crianças. Agora é. Graças ao Chris Romsos.
         
    * BUG FIX: Gerar conjuntos de dados Xml já não pensa que um nome de variável de origem começando com "latino" pode ser latitude. Graças ao Vincent Luzzo.
         
    * BUG FIX: Agora, um OutOfMemoryError ao ler um arquivo de dados enquanto processa o pedido de um usuário não é uma razão para adicionar um arquivo à lista BadFiles. Graças ao Bob Simons.
         

## Versão 2.02{#version-202} 
 (lançado em 2019-08-21) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * NOVO: Existem agora duas maneiras de procurar por conjuntos de dados em múltiplos ERDDAP s. Eles trabalham ligeiramente diferente e têm diferentes interfaces e opções.
        
        *    [PesquisaMultiplo ERDDAP s.html](/SearchMultipleERDDAPs.html) de Bob Simons/ NOAA   NMFS   SWFSC   ERD .
        *    [ http://erddap.com ](http://erddap.com) de Rob Fuller/The Marine Institute of Ireland.
        
Obrigado ao Tylar Murray pelo pedido original.
         
    * MELHORIA: um pedido ao "files" sistema para baixar um arquivo que está realmente em um site remoto (Por exemplo, AWS S3) agora leva a um redirecionamento, então o usuário irá realmente baixar os dados da fonte, em vez de usar ERDDAP™ como intermediário. Graças a Andy Ziegler e NOAA .
         
    * NOVO: Como exemplo dos novos recursos relacionados ao AWS S3, e para tornar mais fácil para qualquer pessoa navegar e baixar arquivos de baldes públicos AWS S3, criamos
         [~110 conjuntos de dados de amostra](https://registry.opendata.aws/) que permite que qualquer pessoa navegue pelo conteúdo de quase toda a
         [AWS S3 Abrir baldes de dados](https://registry.opendata.aws/) . Se você clicar na "files" link para qualquer um desses conjuntos de dados de amostra, você pode navegar na árvore de diretórios e arquivos nesse balde S3. Devido à forma como estes conjuntos de dados funcionam, estas listas de diretórios estão sempre perfeitamente atualizadas porque ERDDAP™ Põe-nos em voo. Se você clicar na árvore de diretórios para um nome de arquivo real e clicar no nome do arquivo, ERDDAP™ irá redirecionar seu pedido para AWS S3 para que você possa baixar o arquivo diretamente do AWS. ERDDAP™ os administradores podem
         [ler instruções para como fazer isso para outros baldes S3](/docs/server-admin/datasets#working-with-aws-s3-files) . Graças a Andy Ziegler e NOAA .
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * COISAS QUE VOCÊ PRECISA FAZER: Nenhuma
         
    * MELHORADO: ERDDAP método de armazenamento de arrays de strings (Array de String) é agora muito mais eficiente memória. String Arrays são usados em toda a ERDDAP™ , notavelmente ao ler arquivos de dados ASCII tabulares. Além disso, outras alterações tornam os arquivos de dados tabulares CSV/TSV/SSV ASCII, colunar ASCII e jsonlCSV mais rápidos e muito mais eficientes em memória. O resultado é: para um arquivo de teste de dados ASCII de 764 MB (mas comprimido a 52MB .gz arquivo) com 3.503.266 linhas e 33 colunas, o uso máximo de memória passou de 10GB para 0,6GB (no pico) . O tempo para lê-lo foi de ~7 minutos (mas varia muito com quanta memória física está no computador) baixo para ~ 36 segundos (incluindo 10s para simplificar () que só é usado pelo GenerateDatasets Xml) . Muitos outros lugares em ERDDAP™ beneficiará desta maior eficiência da memória. Graças ao Tylar Murray e ao Mathew Biddle.
        
Eu explorei uma solução diferente (armazenando strings em StringArray como arrays de byte codificados por UTF-8) . Isso reduz o uso da memória em mais ~33%, mas ao custo de ~33% desaceleração. Em comparação com o sistema que agora está sendo usado, isso parecia uma má troca. É mais fácil dar a um computador mais memória (comprar mais memória por ~$200) do que torná-lo mais rápido (comprar um computador completamente novo) .
        
Se for conveniente, ainda é uma boa idéia dividir enormes arquivos de dados tabulares em vários arquivos menores com base em alguns critérios como stationID e/ou tempo. ERDDAP™ muitas vezes só terá que abrir um dos pequenos arquivos em resposta ao pedido de um usuário, e assim ser capaz de responder muito mais rápido.
        
    * Agora há. [ ERDDAP™ Documentação AWS S3](/docs/server-admin/datasets#working-with-aws-s3-files) , que descreve como obter ERDDAP™ para trabalhar com arquivos de dados em baldes AWS S3.
Além disso, ERDDAP™ agora usa novos recursos no AWS S3 Java API.
Além disso, ERDDAP™ agora permite que URLs AWS S3 incluam caracteres adicionais (período, hífen, sublinhado) em nomes de baldes.
Além disso, ERDDAP™ agora requer que URLs de balde AWS S3 sejam identificadas de uma forma específica:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
onde o prefixo é opcional.
Graças a Andy Ziegler e NOAA .
         
    * MELHORADO: Gerar conjuntos de dados Xml agora trata mais frequentes missing\\_value s stand-ins como valores em falta e assim é mais provável converter uma coluna para um tipo de dados numéricos. Também, PrimitiveArray.simplificar () agora logs que determinado valor de dados fez com que ele tratasse uma dada coluna como uma coluna de strings. Graças ao Mathew Biddle.
         
    * MELHORADO:&lt;requestBlacklist&gt; agora suporta .\\*.\\*  (ou :\\*:\\*para IPv6) no final dos endereços IP para que você possa listar uma parte maior de endereços IP, por exemplo, 110.52.\\*.\\*  (China Unicom Tianjin) . Ver a documentação para [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) Graças à China Unicom e à China Telecom.
         
    * MELHORADO: Se a fonte de um conjunto de dados não especificar um "institution" atributo, GerarDatasets Xml e loadDataset agora obtê-lo de um atributo "criador\\_institution" (se disponível) . Graças ao Micah Wengren.
         
    * BUG FIX: padronizar O que nem sempre foi aplicado aos arquivos de dados ASCII.
Além disso, a EDDTable não lidou corretamente com restrições em valores de tempo quando a fonte tinha valores de tempo String e padronizar O que estava a ser usado.
Graças a Paloma de la Vallee.
        
Eu não disse claramente antes: você deve apenas usar padronizar Que características quando você realmente precisa delas (Por exemplo, quando diferentes ficheiros de código armazenam valores de tempo de diferentes formas) , porque algumas solicitações para conjuntos de dados que usam padronizar O que será processado um pouco mais devagar.
        
    * BUG FIX: Um erro no código usado por EDDGrid FromNcFiles fez com que falhasse com .nc 4 e .hdf 5 arquivos que têm "longo" (int64) variáveis. Isto está resolvido. Graças ao Friedemann Wobus.
         
    * BUG FIX: Pequenas alterações nos arquivos ISO 19115 para fazer um validador diferente feliz. Graças a Chris MacDermaid e Anna Milan.
         

## Versão 2.01{#version-201} 
 (lançado em 2019-07-02) 

*    **Novas funcionalidades e alterações (para usuários) :** 
    * Nenhuma.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * BUG FIX: Um erro no código que gera o Formulário de Acesso de Dados para tabledap os conjuntos de dados fizeram com que essa página estivesse em branco para alguns conjuntos de dados. Além disso, eu melhorei o manuseio de erros inesperados em todas as páginas HTML para que eles vão (geralmente) mostrar uma mensagem de erro. Graças ao Marco Alba.
    * MELHORADO: Gerar conjuntos de dados Xml não imprime mais um aviso longo no topo da saída. Em vez disso, veja [Edição Gerar Conjuntos de dados Saída do Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Graças ao Steven Baum.
    * MELHORADO: Gerar conjuntos de dados Xml agora faz recomendações ligeiramente diferentes em diferentes situações para&lt;updateEveryNMillis&gt; for EDD...From...Files datasets. Também, Gerar conjuntos de dados Xml agora desencoraja o sistema original "extract" para EDDTableFromFiles datasets.

## Versão 2.00{#version-200} 
 (lançado 2019-06-26) 

*    ** ERDDAP™ V2.00 está finalmente aqui&#33; Sim&#33;**   
     
    * Pedimos desculpas pelo longo atraso necessário para terminar esta versão.
Obrigado pela vossa paciência.
         
    * A boa notícia é que o tempo extra foi usado para adicionar mais dos recursos que os usuários haviam solicitado. A má notícia é que mesmo com o atraso, nem todos os recursos solicitados foram adicionados. Pedimos desculpa, mas parecia mais importante tirar esta libertação do que atrasar mais. (Para sempre?) continuamente adicionando novas funcionalidades. Prometemos voltar a libertações mais frequentes no futuro.
         
    * "Versão 2? Há grandes mudanças e incompatibilidades?"
Grandes novidades? Sim.
Grandes incompatibilidades ou alterações para administradores ou usuários? Não.
Saltámos de v1.82 para v2.00.
        * em parte para celebrar 10 anos (agora 11) desde o primeiro lançamento público de ERDDAP™   (v1.00 em 2008-05-06, que exteriormente parecia notavelmente como v2.00) . Naquele tempo, ERDDAP™ passou de uma instalação para quase 100 instalações em pelo menos 12 países (Austrália, Bélgica, Canadá, França, Índia, Irlanda, Itália, África do Sul, Espanha, Tailândia, Reino Unido, EUA) .
        * em parte para marcar uma adição importante em uma direção inteiramente nova: ERDDAP™ agora tem um sistema de ingesta de dados para ir com os serviços de servidor de dados existentes (ver [Tabela EDDDeHttpGet](#eddtablefromhttpget) ) ,
        * e em parte porque não foi um grande salto de 1,82 para 2,00 numericamente, então este parecia ser o momento certo.
             
    * A outra boa notícia é que existem agora dois outros grupos que contribuem código para ERDDAP™   (nesta versão e com indicações que continuarão) : Rob Fuller e Adam Leadbetter do Instituto Naval da Irlanda, e Roland Schweitzer da PMEL e Weathertop Consulting. Muito obrigado. É verdade que eles estão trabalhando em projetos de sua própria escolha, mas esse é o modelo clássico de desenvolvimento de código aberto -- grupos contribuem com o código para os recursos que eles mais gostariam de ver adicionados. O benefício adicional para os contribuidores: eles podem usar os novos recursos assim que terminarem; eles não precisam esperar pela próxima versão de ERDDAP . O seu grupo também pode contribuir&#33; Ver o [ ERDDAP™ Guia do Programador](/docs/contributing/programmer-guide) .
         
    * Esperamos que gostes. ERDDAP™ v2.00. Estamos ansiosos para os próximos 10 anos de ERDDAP™ desenvolvimento e cada vez mais uso em todo o mundo.
         
*    **Novas funcionalidades e alterações (para usuários) :**   
     
    * NOVO: orderByMean filtro
em vez tabledap os conjuntos de dados calcularão os meios para os grupos especificados. Além disso, todos os orderBy opções agora suportam uma forma adicional de definir grupos: _numericVariable \\[ /número \\[ timeUnits \\]  \\[ :offset \\]  \\] _, por exemplo, tempo/1 dia ou profundidade/10:5. Por exemplo, stationID , tempo, águaTemp& orderByMean  (" stationID ,tempo/1dia") ordenar os resultados por stationID e tempo, em seguida, calcular e retornar a média de águaTemp para cada stationID para cada dia. Estas são características novas extremamente úteis e poderosas. O novo código para essas características e as mudanças no antigo código foram contribuídos por Rob Fuller e Adam Leadbetter do Instituto Naval da Irlanda e apresentados via Git. Obrigado. Rob e Adam&#33;
         
    * NOVO: tipo de arquivo de saída para conjuntos de dados tabulares: [Dados Quadro](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
um arquivo JSON formatado para uso com o Google Visualization biblioteca cliente ( Google Charts ) . O código para isso foi contribuído por Roland Schweitzer e submetido via Git. Obrigado. Roland&#33;
         
    * NOVO: tipo de arquivo de saída para conjuntos de dados tabulares: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
que é como o existente .jsonlCSV opção, mas com nomes de colunas na primeira linha. Graças ao Eugene Burger.
         
    * NOVO: Se o administrador habilitá-lo, os usuários agora podem fazer login [ORCID](https://orcid.org) conta.
É um sistema de autenticação OAuth 2.0, muito parecido com a autenticação do Google. O ORCID é amplamente utilizado por pesquisadores para identificar-se de forma única. As contas ORCID são gratuitas e não têm os problemas de privacidade que as contas do Google têm. Ver ERDDAP 's [Instruções de autenticação orcid](/docs/server-admin/additional-information#orcid) . Graças à BCO-DMO (Adam Shepard, Daniel Kinkade, etc.) .
         
    * NOVO: Um novo conversor de URL converte URLs desatualizadas em URLs atualizadas.
Ver .../erddap/convert/urls.html em qualquer ERDDAP™ instalação, por exemplo,
         [este link para o conversor na ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . Isso deve ser útil para os gestores de dados. Isto também é usado internamente pela GenerateDatasetsXml. Graças ao Bob Simons e à Sharon Mesick.
         
    * MELHORIA: [Conversor de Tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) agora tem opções para converter qualquer tempo de string comum em um tempo de string ISO8601, ou converter um UDUNITS - como o tempo unidades string em um adequado UDUNITS time units string. Isto também deve ser útil para ERDDAP™ administradores que precisam saber qual formato especificar para o atributo "unidades" para variáveis de tempo de string. Isso também é usado internamente pelo GenerateDatasetsXml e o padronizeWhat feature of EDDTableFromFiles. Graças ao Bob Simons.
         
    * NOVO: O [Conversor de unidades](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) tem uma nova opção "Standardize UDUnits".
Por exemplo, "deg\\_C/m" e "graus\\_C metros-1" são ambos convertidos para
"grau\\_C m-1". Este recurso também é usado pelo padronizeWhat feature of EDDTableFromFiles. Graças ao Bob Simons.
         
    * NOVO: Para gráficos (com exclusão dos gráficos de superfície) na gradedap e tabledap 's Make A Graph web pages, quando o eixo x não é um eixo de tempo, se apenas um subconjunto do intervalo da variável x eixo é visível, existem agora botões acima do gráfico para deslocar o eixo X para a esquerda ou para a direita. Graças a Carrie Wall Bell / o projeto Hydrophone.
         
    * NOVO: Para gráficos, o eixo X e/ou Y agora pode usar uma escala de log.
Os usuários podem controlar a escala Y Axis através de um novo widget drop-down na gradedap e tabledap Faça um gráfico páginas da web. Ver o [.xRange e . Documentação do yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Graças a Carrie Wall Bell / o projeto Hydrophone.
         
    * MELHORADO: ERDDAP™ agora faz melhor uso de vários códigos de erro HTTP e agora retorna um(OPeN)DAPMensagem de erro formatada em v2.0. Ver [os detalhes](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Graças a Antoine Queric e Aurelie Briand.
         
    * MELHORADO: Não use Netcdf-java/c ou outras ferramentas de software para se conectar .nc ou .hdf arquivos servidos por ERDDAP 's /files/ sistema como se fossem arquivos locais. ERDDAP™ Agora recusa estes pedidos. É terrivelmente ineficiente e muitas vezes causa outros problemas. Em vez disso:
        
        * Utilização(OPeN)DAPsoftware cliente para conectar ERDDAP 's DAP serviços para o conjunto de dados (que têm /griddap/ ou / tabledap / no URL) . Isso é o que DAP é para e faz tão bem.
        * Ou, use o Formulário de Acesso de Dados do conjunto de dados para solicitar um subconjunto de dados.
        * Ou, se você precisar de todo o arquivo ou acesso repetido durante um longo período de tempo, use curl , wget , ou seu navegador para baixar o arquivo inteiro, em seguida, acessar os dados de sua cópia local do arquivo.
        
          
         
    * MELHORADO: ERDDAP™ homepage, Full Text Search está agora acima de "View a List of All Datasets", uma vez que é o melhor ponto de partida para a maioria dos usuários. Graças a Didier Mallarino e Maurice Libes.
         
    * MELHORADO: No DataProviderForm3.html existem agora listas dropdown de comuns standard\\_name s. Graças a alguém na reunião IOOS DMAC.
         
    * MELHORADO: Nas páginas /files/ web, existe agora um link para a nova seção "O que posso fazer com esses arquivos?" da documentação /files/. Essa seção descreve vários tipos de arquivos e dá sugestões para como trabalhar com eles. Graças ao Maurice Libes.
         
    * MELHORIA: Quase todos os pedidos para ERDDAP™ deve ser pelo menos um pouco mais rápido, e às vezes muito mais rápido.
         
    * BUG FIX: Em algumas circunstâncias, quando um conjunto de dados EDDTable salvou dados em alguns tipos de .nc arquivos, o atributo global ¿id¿ foi configurado para o nome sugerido do arquivo, que inclui um hash para torná-lo único a essa solicitação. Agora "id" é devidamente deixado inalterado (se especificado) ou definido para o conjunto de dados datasetID   (se não especificado) . Graças ao John Maurer.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   
     
    * FAZER: Este lançamento levará algum tempo e trabalhará de você. Por favor, seja paciente e planeie tomar algumas horas para fazer as mudanças necessárias e mais algumas horas para experimentar novos recursos.
         
    * A FAZER: Para segurança, faça uma cópia de backup de seu setup.xml atual e datasets.xml arquivos para que você possa reverter para eles no caso improvável em que você precisa reverter para ERDDAP™ v1.82.
         
    * A FAVOR: O recomendado Java é agora Adoptar OpenJDK do OpenJDK 8 (LTS) + HotSpot.
Esta é uma variante de código aberto de Java que não tem restrições sobre a sua utilização (diferente Oracle 's Java distribuição) . É derivado de Oracle 's Java de forma contínua, com Oracle É uma bênção. Por razões de segurança, é importante manter Java versão actualizada. Ver ERDDAP 's [ Java instruções de instalação](/docs/server-admin/deploy-install#java) .
         
    * Aprovar o OpenJDK Java precisa de uma pequena adição à sua instalação Tomcat: ver [Instruções de cache de recursos](/docs/server-admin/deploy-install#contentxml) . Eu acho que esta é uma substituição para a configuração -XX:MaxPermSize, que (Adotar) O OpenJDK já não suporta.
         
    * Para fazer: O novo padrão e recomendar&lt;fonteFamília&gt; configuração no setup.xml é
DejaVu Sans que são incorporados no AdoptOpenJDK's Java . Ver o
         [instruções de instalação de fonte revistas](/docs/server-admin/deploy-install#fonts) .
         
    * Para fazer: Muitas tags estão se movendo de setup.xml para datasets.xml . A vantagem é que você pode mudar seus valores enquanto ERDDAP™ está em execução, sem reiniciar ERDDAP . Notavelmente, você pode facilmente mudar&lt;startBodyHtml5&gt; para mostrar uma mensagem temporária na ERDDAP™ página inicial (Por exemplo, "Verificar o novo conjunto de dados JPL MUR SST v4.1 ..." ou "Isto ERDDAP™ estará offline para manutenção 2019-05-08T17:00:00 PDT até 2019-05-08T20:00 PDT.") . Se/quando alterar estas etiquetas datasets.xml , as alterações terão efeito na próxima vez ERDDAP™ leituras datasets.xml .
         
        
        1. Copie este conteúdo para o seu datasets.xml arquivo (em qualquer lugar perto do início do arquivo, após&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Um-por-um, copiar o valor (Se existir) para cada uma dessas tags de seu arquivo setup.xml na nova tag que você acabou de colar (acima) em datasets.xml . Por exemplo, se você tivesse usado um valor de 30 para&lt;cacheMinutos&gt; no setup.xml, você deve copiar esse valor para o novo&lt;cacheMinutes&gt; tag in datasets.xml   (embora se o valor é o mesmo que o novo valor padrão, é melhor apenas deixar a tag dentro datasets.xml em branco) .
            
Se o seu valor for diferente do novo padrão sugerido (para além de&lt;startBodyHtml5&gt; e&lt;theShortDescriptionHtml&gt;, que são úteis para personalizar seu ERDDAP™ instalação), por favor considere mudar para os novos valores padrão. Isto é particularmente verdade para&lt;parcialRequestMaxBytes&gt; e&lt;parcialRequestMaxCells&gt;, onde o valor padrão/sugerido mudou significativamente ao longo dos anos.
            
Depois de copiar cada valor, exclua a tag e sua descrição do setup.xml. É melhor ter estas etiquetas em datasets.xml . E agora há melhores descrições em [setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Uma peculiaridade do novo sistema é que a primeira página web quando você iniciar ERDDAP será o padrão ERDDAP™ Página Web. Cada página posterior irá usar o conteúdo ...Html que você especificar em datasets.xml .
        
    * AVISO: A primeira vez que você corre ERDDAP™ v2.0, conjuntos de dados baseados em arquivos de dados locais irão carregar **muito** lentamente porque ERDDAP™ precisa recriar seu banco de dados de arquivos em um formato ligeiramente diferente. Após a lenta recarga inicial, eles carregarão rapidamente, como antes. Por favor, seja paciente.
         
#### Tabela EDDDeHttpGet{#eddtablefromhttpget} 
    *    [Big New Feature: EDDTableFromHttpGet](#eddtablefromhttpget)   
Até agora, ERDDAP™ basta ler dados e disponibilizá-los aos usuários. Agora, ERDDAP™ possui um sistema simples e eficiente para ingerir dados em tempo real de sensores. Entre outras características, este conjunto de dados oferece versão de grãos finos: ele se lembra de todas as alterações feitas no conjunto de dados, quando foi feito, e por quem. Normalmente, os usuários só vão querer a versão mais recente do conjunto de dados, com todas as alterações aplicadas. Mas há a opção para os usuários solicitarem dados do conjunto de dados como era em qualquer momento. Isso facilita a ciência reprodutível. Assim, ao contrário da maioria dos outros conjuntos de dados quase em tempo real, estes conjuntos de dados são elegíveis para [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . porque eles encontram o DOI requisito de que o conjunto de dados seja imutável, excepto por agregação. Ver [Tabela EDDDeHttpGet](/docs/server-admin/datasets#eddtablefromhttpget) . Graças a OOI (de há muito tempo e agora) por falar sobre a necessidade para este e Eugene Burger para o lembrete sobre trabalhar no que é importante.
         
    * Grandes novas características: ERDDAP™ agora pode servir dados diretamente a partir de arquivos de dados de compressão externa, incluindo .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , ou .Z. Datasets podem incluir uma mistura de arquivos comprimidas externamente (Talvez os arquivos de dados mais antigos?) e arquivos não compactados externamente, e você pode comprimir/descomprimir um arquivo a qualquer momento.
        
Isto funciona muito bem&#33;
Na maioria dos casos, o abrandamento relacionado à descompressão dos arquivos é menor. Nós encorajamos fortemente você a tentar isso, nomeadamente para conjuntos de dados e/ou arquivos de dados que são pouco utilizados.
        
Isto pode poupar-lhe $30.000 ou mais&#33;
Este é um dos poucos ERDDAP™ recursos que podem economizar muito dinheiro -- se você comprimir um monte de arquivos de dados, você vai precisar muito menos RAIDs / discos rígidos para armazenar os dados, ou inversamente, você pode servir muito mais dados (até 10x) com os RAIDs que já tem. Se este recurso salva você de comprar outro RAID, então ele salvou você cerca de US $ 30 mil.
        
Ver o [Documentação de Ficheiros Compactados Externamente](/docs/server-admin/datasets#externally-compressed-files) . Graças a Benoit Perrimond e Paloma de la Vallee.
        
    * Grandes novas características: Tudo EDDGrid FromFiles e todos os conjuntos de dados EDDTableFromFiles suportam&lt;cacheFromUrl&gt; tag e uma&lt;cacheSizeGB&gt; tag. Se o cacheSizeGB não for especificado, isso irá baixar e manter uma cópia completa dos arquivos de um conjunto de dados remoto. Se o cacheSizeGB for especificado e for &gt;0, isso irá baixar arquivos do conjunto de dados remoto, conforme necessário, para um cache local com um tamanho limitado, o que é útil ao trabalhar com base em nuvem (Por exemplo, S3) ficheiros de dados. Ver o [cache Documentação FromUrl](/docs/server-admin/datasets#cachefromurl) para mais pormenores. Graças a Bob Simons e Roy Mendelssohn (que durante anos têm escrito scripts para lidar com a criação de cópias locais de arquivos remotos) , Lloyd Cotten, Eugene Burger, Conor Delaney (quando estava na Amazon Web Services) , e a plataforma Google Cloud.
         
    * NOVO: A nova tabela EDD de JsonlCSV a classe pode ler dados tabulares de
         [JSON Linhas de ficheiros CSV](https://jsonlines.org/examples/)   ("Melhor que CSV") . Graças às pessoas do Instituto Marinho da Irlanda por me falar sobre este formato e ao Eugene Burger e PMEL para o pedido para apoiá-lo como um tipo de entrada.
         
    * NOVO: Tudo EDDGrid e todos os conjuntos de dados EDDTableFromFiles suportam&lt;nThreads&gt; definição, que diz ERDDAP™ quantos threads usar ao responder a um pedido. Ver o [Documentação do nThreads](/docs/server-admin/datasets#nthreads) para mais pormenores. Graças a Rob Bochenek da Axiom Data Science, Eugene Burger, Conor Delaney (quando estava na Amazon Web Services) , e Google Cloud Platform.
         
    * NOVA Padronização Para que todas as subclasses EDDTableFromFiles -
Anteriormente, se para uma determinada variável, os valores dos atributos importantes (Por exemplo, scale\\_factor , add\\_offset , missing\\_value , \\_FillValue, unidades) não eram consistentes, EDDTableFromFiles escolheria um valor para cada atributo ser "válido" e marcaria arquivos com outros valores de atributo como "Maus Arquivos". Agora, há um sistema para padronizar os arquivos assim que EDDTableFromFiles lê os arquivos. Ver [EDDTableFromFile's padronize O quê?](/docs/server-admin/datasets#standardizewhat) . Um de ERDDAP seus principais objetivos são tornar os arquivos de dados e conjuntos de dados acessíveis de forma consistente. padronizar O que é uma nova ferramenta importante para tornar isso uma realidade. Graças a Marco Alba, Margaret O'Brien (e outros utilizadores de EML) , BCO-DMO, e usuários InPort.
         
    * NOVO EDDTableFromInvalidCRAFiles permite que você faça um conjunto de dados de uma coleção de NetCDF   (v3 ou v4)   .nc arquivos que usam uma variante específica, inválida, do CF DSG Contiguous Ragged Array (CRA) ficheiros. Arquivos de exemplo para este tipo de conjunto de dados podem ser encontrados em https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020-10-21 Este servidor não está agora disponível de forma fiável \\] . Embora ERDDAP™ suporta este tipo de arquivo, é um tipo de arquivo inválido que ninguém deve começar a usar. Grupos que atualmente usam este tipo de arquivo são fortemente encorajados a usar ERDDAP™ para gerar arquivos válidos CF DSG CRA e parar de usar esses arquivos. Graças a Ajay Krishnan e Tim Boyer.
         
    * EDDTableDeThredsFiles e EDDTableDe Hyrax Os ficheiros estão agora obsoletos. Por favor, mude para EDDTableFromNcFiles (ou uma variante) mais&lt;cacheFromUrl&gt;. Se isso não funcionar por alguma razão, e-mail erd.data at noaa.gov . Se não houver queixas antes de 2020, estes tipos de conjuntos de dados podem ser removidos.
         
    * MELHORADO... O sistema para converter automaticamente não ISO 8601 vezes em ISO 8601 vezes (introduzido em v1.82) foi grandemente expandido para lidar com um grande número de formatos adicionais. Isto afecta a GerarDatasetsXml e ERDDAP A lidar com os metadados de origem.
         
    * MELHORADO... Com sua terceira grande revisão do sistema de processamento de tempo String (e espero que o último) , ERDDAP™ já não usa Java 's DateTimeFormatter por causa de erros que às vezes afetam tempos extremos (anos)&lt;=0000). ERDDAP™ agora usa seu próprio sistema para processar strings de tempo.
         
    * AVISO: O novo sistema de processamento de tempo de String é um pouco mais rigoroso. Se um de seus conjuntos de dados de repente tem apenas valores faltando para valores de tempo, a causa é quase certamente que a string de formato de tempo está ligeiramente errada. Deve haver mensagens de erro no registo. txt relacionado aos valores de tempo que não corresponderam ao formato de tempo -- que deve ajudá-lo a corrigir a string de formato de tempo para esse conjunto de dados. Se precisar de ajuda, use a opção em ERDDAP Conversor de tempo que "Converter \\[ s \\] qualquer tempo de string comum em um tempo de string ISO 8601" -- indica o formato que o conversor usou para analisar a string fonte.
         
    * RECOMENDAÇÃO: A maneira mais rápida, fácil e mais barata de acelerar ERDDAP 's acesso a dados tabulares é colocar os arquivos de dados em uma unidade de estado sólido (SSD) . A maioria dos conjuntos de dados tabulares são relativamente pequenos, então um SSD de 1 ou 2 TB é provavelmente suficiente para manter todos os arquivos de dados para todos os seus conjuntos de dados tabulares. SSD eventualmente se desgasta se você escrever dados para uma célula, excluí-lo, e escrever novos dados para essa célula muitas vezes. Em vez disso, recomendo que (tanto quanto possível) você apenas usa seu SSD para escrever os dados uma vez e lê-lo muitas vezes. Então, mesmo um SSD de grau de consumo deve durar muito tempo, provavelmente muito mais do que qualquer disco rígido (HDD) . SSDs de nível de consumo agora são baratos (em 2018, ~$200 para 1 TB ou ~$400 para 2 TB) e os preços continuam a baixar rapidamente. Quando ERDDAP™ acessa um arquivo de dados, um SSD oferece ambos
        
        * menor latência (~0,1ms, versus ~3ms para um HDD, versus ~10 (?) ms para um RAID, versus ~55ms para Amazon S3) , e
        * maior rendimento (~500 MB/S, versus ~75 MB/s para um HDD versus ~500 MB/s para um RAID) .
        
Assim você pode obter até um ~10X impulso de desempenho (vs um HDD) Por 200 dólares&#33; Comparado com a maioria das outras possíveis alterações no seu sistema (Um novo servidor por 10 mil dólares? Um novo RAID por 35 mil dólares? Um novo interruptor de rede de 5.000 dólares? etc.) , este é de longe o melhor retorno sobre o investimento (ROI) . Se o seu servidor não está carregado com memória, a memória adicional para o seu servidor também é uma ótima e relativamente barata maneira de acelerar todos os aspectos do ERDDAP .
         \\[ SSD seria ótimo para dados em grade, também, mas a maioria dos conjuntos de dados em grade são muito maiores, tornando o SSD muito caro. \\]   
         
    * NOVO: Todos os que estão logados recebem role= \\[ anyoneLogged In \\] , mesmo que não haja&lt;tag do usuário&gt; para eles em datasets.xml . Se você definir o conjunto de dados&lt;acessívelTo&gt; to \\[ anyoneLogged In \\] , em seguida, qualquer um que tenha se conectado para ERDDAP™   (Por exemplo, através da sua conta Gmail ou Orcid) será autorizado a aceder ao conjunto de dados, mesmo que não tenha especificado&lt;tag do usuário&gt; para eles em datasets.xml . Graças ao Maurice Libes.
         
    * MELHORIA: UDUNITS O conversor de unidades /UCUM foi amplamente melhorado.
Ele lida melhor com strings de unidades inválidas (começando com uma ênfase na preservação da informação, em vez de impor a validade) . Além disso, os resultados agora têm uma sintaxe padronizada.
         
    * NOVO: O UDUNITS /UCUM conversor de unidades tem uma nova opção para padronizar um UDUNITS string.
Isto funciona bem para válido UDUNITS strings e razoavelmente bem para não padrão / inválido UDUNITS Cordas. Por exemplo, por exemplo, UDUNITS ="metros por segundo", "metro/segundo", "m.s^-1" , e "m s-1" Todos retornarão "m.s-1". Isso foi necessário para a nova padronização Que sistema descrito acima. Graças a Marco Alba, Margaret O'Brien (e outros utilizadores de EML) , BCO-DMO, e usuários InPort.
         
    * NOVO: EDDTableFromMultidimNcFiles agora tem um [tratamentoDimensõesAs](/docs/server-admin/datasets#treatdimensionsas) opção, que diz ERDDAP™ para tratar certas dimensões (Por exemplo, LAT e LON) como se fossem outras dimensões (Por exemplo, TEMPO) . Isto é útil para alguns arquivos incorretos que usam diferentes dimensões para diferentes variáveis quando deveriam ter usado apenas uma dimensão (Por exemplo, TEMPO) . Graças a Marco Alba e Maurice Libes.
         
    * NOVO: Agora, todos EDDGrid De...Files datasets suportam um novo eixo especial sourceName que diz ERDDAP™ para extrair informações do ficheiroName (apenas filename.ext) e usar o valor para **substituir** o valor do eixo mais à esquerda existente. O formato é
        \\*\\*\\*substituirDeFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Ver [esta documentação](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Graças à NOAA Conjunto de dados de agregação diária.
         
    * NOVO: Agora, todos EDDGrid De...Files datasets suportam um novo eixo especial sourceName que diz ERDDAP™ para extrair informações do caminho do ficheiroName (diretórios + nome do arquivo.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Para isso, o nome do caminho sempre usa '/' como o caractere separador de pastas, nunca '\\'.
Ver [esta documentação](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Graças a Paloma de la Vallee.
         
    * Agora, toda a tabela de... Conjuntos de dados de arquivos suportam variável pseudo adicional sourceName s que extraem informações do ficheiroName (apenas filename.ext)   (ver [\\*\\*\\ * ficheiroName](/docs/server-admin/datasets#filename-sourcenames) ) ou do caminho completo do ficheiroName (/dir1/dir2/filename.ext)   (ver [\\*\\*\\ * pathName](/docs/server-admin/datasets#pathname-sourcenames) ) . Graças a Paloma de la Vallee.
         
    * NOVO: Se um EDDGrid dataset tem uma ou mais dimensões muito grandes (por exemplo, milhões de valores) que ocupam muita memória, você pode definir o novo [&lt;dimensãoValoresEm memória&gt;] (/docs/server-admin/datasets#dimensionvaluesinmemory) configurando para falso (o padrão é true) , que faz com que o conjunto de dados para armazenar os valores no disco e recuperá-los quando necessário. Graças a David Rodriguez e Rich Signell (re: EDDGrid DeAudioFiles) .
         
    * Antes, se você reordenou dataVariable s para um conjunto de dados EDDTableFromFiles e recarregado o conjunto de dados, EDDTableFromFiles iria reler todos os arquivos de dados. Agora, ele pode lidar com a reordenação sem reler todos os arquivos de dados. Graças ao Roland Schweitzer.
         
    * Agora, quando ERDDAP™ lê arquivos de dados tabulares ASCII, NCCSV e JSON Lines CSV, se encontrar um erro em uma determinada linha (Por exemplo, número incorreto de itens) , registra uma mensagem de aviso (Número inesperado de itens...) à [arquivo log.txt](/docs/server-admin/additional-information#log) e então continua a ler o resto do arquivo de dados. Assim, é sua responsabilidade olhar periodicamente (ou escreva um script para o fazer) para essa mensagem no registo. txt para que você possa corrigir os problemas nos arquivos de dados. ERDDAP™ é configurado desta forma para que os usuários possam continuar a ler todos os dados válidos disponíveis, mesmo que algumas linhas do arquivo tenham falhas. Anteriormente, ERDDAP™ marcou o arquivo como "ruim" e o removeu do conjunto de dados.
         
    * MELHORIA: Quando tempos precisos (Por exemplo, para o segundo ou milissegundo mais próximo) são armazenados na fonte como "minutos desde ..." (ou unidades maiores) , ERDDAP™ agora rodeá-los para o milissegundo mais próximo ao ler os valores em ERDDAP . Caso contrário, os números de pontos flutuantes são machucados e pedidos de dados em horários específicos (Por exemplo, &time=2018-06-15T01:30:00) falhará. Anteriormente, calculou-os tão precisamente quanto possível. (e ainda faz se as unidades são, por exemplo, "segundos desde ..." ou "milissegundos desde ...") . É melhor evitar este problema não usando grandes unidades (Por exemplo, minutos ou horas) para armazenar valores de tempo precisos (Por exemplo, microssegundos) - computadores fazem um trabalho ruim de lidar com dígitos decimais. Graças ao Marco Alba.
         
    * ALTERAÇÕES PARA A TABELA DE EDDDe EDDGrid O que o torna muito melhor. Tabela EDDDe EDDGrid permite aos usuários consultar conjuntos de dados em grade como se fossem conjuntos de dados tabulares ("Pesquisa por valor") .
        
        * Agora apoia uma&lt;maxAxis0&gt; tag (padrão=10) que especifica o número máximo de eixos \\[ 0 \\]   (geralmente "time" ) valores que podem ser consultados imediatamente. Isso impede que pedidos ingênuos obtenham EDDTableFrom EDDGrid para pesquisar através de um conjunto de dados em grade (que iria falhar com um erro de tempo- limite) .
        * Gerar conjuntos de dados Xml agora tem uma opção para gerar EDDTableFrom EDDGrid conjuntos de dados para todos os conjuntos de dados em grelha ERDDAP™ que correspondem a um regex especificado (use .\\* para corresponder a todos os conjuntos de dados) . Os conjuntos de dados que ele cria têm informações adicionais no atributo resumo indicando que esta é uma versão tabular de um conjunto de dados em grade. E o seu datasetID é o datasetID do conjunto de dados em grelha, mais "\\_AsATable".
        * Existe uma grande velocidade para a configuração mais comum: quando o conjunto de dados EDDGrid FromErddap dataset que está no mesmo ERDDAP .
        
Graças ao James Gallagher e ao Ed Armstrong.
         
    * NOVO: gerar Conjuntos de dados Xml para todos os tipos de conjuntos de dados agora é muito mais provável adicionar um \\_FillValue ou missing\\_value atributo a uma variável numérica addAttributes . Por exemplo, isso ocorre quando os marcadores de valor faltantes da string (Por exemplo, ", ", ", "?", "NA", "nd", "N") para essa variável no arquivo de amostra são convertidos para ERDDAP os valores nativos em falta (127 em colunas de byte, 32767 em colunas curtas, 2147483647 em colunas int, 9223372036854775807 em colunas longas, e NaN em variáveis flutuantes e duplas) . Também ocorre para os valores de NaN em variáveis flutuantes e duplas. Além disso, "e" foi adicionado à lista de marcadores de valor ausentes comuns em colunas de dados numéricos que ERDDAP™ Devia procurar. Graças ao Matt Biddle da BCO-DMO.
         
    * MELHORADO: a opção ncdump em gerar Conjuntos de dados Xml agora é mais parecido com ncdump (mas ainda usa a versão netcdf-java do ncdump) . Imprime uma nova lista de opções. Agora, para .nc arquivos ml, imprime a saída ncdump para o resultado do .nc Alterações de ficheiro em ml aplicadas à base subjacente .nc ou .hdf Arquivo.
         
    * BUG FIX: Houve uma fuga de ficheiros (eventualmente causando ERDDAP™ congelar) causado ao criar alguns tipos de arquivos de saída, por exemplo, .geotif, notavelmente quando erros ocorreram durante a criação. Acho que agora está tudo resolvido. Se você ainda vê problemas, por favor me diga o tipo de conjunto de dados (grade ou tabela) e o tipo de arquivo que está causando o problema. Graças a Steven Beale, Lynn DeWitt, Jibei Zhao e outros.
         
    * BUG FIX: A WMS   Leaflet demo não converteu totalmente/de forma adequada o eixo "profundidade" em "elevação". Agora, sim, e os pedidos de lendas quebrados estão corrigidos. Além disso, todas as opções de eixo nas listas suspensas estão sempre em ordem ordenada ascendente. Graças a Antoine Queric e Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles agora suporta corretamente restrições em variáveis String que foram criadas a partir de variáveis char nos arquivos de dados. Graças a Antoine Queric e Aurelie Briand.
         
    * BUG FIX: Agora, quando um conjunto de dados fica indisponível, o conjunto de dados tenta notificar (com a mensagem "Este conjunto de dados está atualmente indisponível.") seus assinantes, ações listadas, rss e conjuntos de dados lonPM180 que dependem dele. Graças ao Roy Mendelssohn e ao Bob Simons.
         
    * BUG FIX: Dois bugs relacionados ao EDDTableCopy. Graças ao Sam McClatchie.
         
    * MELHORADO: O número de solicitações mal-sucedidas mostradas na página status.html aumentará porque mais coisas são contadas como falhas do que antes.
         
    * MELHORADO: ERDDAP 's status.html agora mostra "Pedidos (mediana vezes em ms) " na série temporal. Anteriormente, apresentava mediana de tempos truncados para segundos inteiros.
         
    * MELHORADO: Na saída jsonld, o "nome" jsonld agora vem do conjunto de dados "title" em ERDDAP , e o jsonld "headline" agora vem do conjunto de dados " datasetID " em ERDDAP . Anteriormente, foi invertido. Isto parece-me errado, porque em inglês normal, "nome" é geralmente um curto, (idealmente) identificador único que raramente/nunca muda (Por exemplo, Robert Simons, nome do meio) , não uma descrição que não é única e que pode facilmente e muitas vezes mudar (Por exemplo, "Um tipo que escreve software para NOAA " vs. "Um tipo alto que escreve software para NOAA ") . Gee, seria ótimo se o schema.org definição de [Nome](https://schema.org/name) , no contexto de um conjunto de dados, foram mais específicos. Os desenvolvedores de software devem ser capazes de escrever uma implementação de uma especificação baseada apenas na especificação, sem orientação de especialistas. Mas eu adiei ao Google (notavelmente Natasha Não) , NCEI (notavelmente John Relph) Rob Fuller.
         
    * MELHORADO: Na saída jsonld, os quatro valores da "box GeoShape de cobertura espacial" são agora minLat minLon maxLat maxLon. Anteriormente, as posições Lat e lon foram revertidas. Gee, seria ótimo se o schema.org definição de [GeoShape](https://schema.org/GeoShape) especificou a ordem correcta. Os desenvolvedores de software devem ser capazes de escrever uma implementação de uma especificação baseada apenas na especificação, sem orientação de especialistas. Graças à Natasha Noy e ao Rob Fuller.

## Versão 1.82{#version-182} 
 (lançado 2018-01-26) 

*    **Novas funcionalidades (para usuários) :**   
     
    * Numerosas mudanças sutis no olhar e no sentimento de ERDDAP™ Páginas web.
        * MELHORADO: ERDDAP™ agora usa HTML 5 e faz melhor uso do CSS.
        * MELHORADO: As páginas web foram ligeiramente modificadas para torná-las mais limpas e menos "ocupadas". (Eles ainda são densos e ainda há coisas de que se pode reclamar, mas espero que muito menos do que antes.) Graças a John Kerfoot para alguns comentários.
        * MELHORADO: As páginas da web agora parecem muito melhores em celulares e outros pequenos dispositivos, especialmente se você usá-los em orientação de paisagem. Eles também ficam melhor em janelas muito pequenas e muito grandes em navegadores de desktop.
        * MELHORADO: Para melhorar a segurança e outras razões, o uso de uma versão WMS as páginas de demonstração foram substituídas por Leaflet .
        * NOVO: suporte para pré-visualizações de arquivos de imagem, áudio e vídeo "files" sistema (por exemplo, [este conjunto de dados de teste](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) e in .htmlTable respostas quando uma célula tem o URL de uma imagem, áudio ou arquivo de vídeo (por exemplo, [Este pedido](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Se você passar por cima de um ícone '?', você deve ver uma visualização de arquivos de imagem, áudio ou vídeo. Você também pode clicar no link do arquivo para ver o arquivo em tela cheia em seu navegador. Ver o [Documentação de arquivos de mídia](/docs/server-admin/datasets#media-files) . Observe que navegadores diferentes suportam diferentes tipos de arquivo, de modo que os exemplos podem não funcionar em seu navegador.
Graças a essas pessoas/links para ideias e código de exemplo para dicas de imagem somente CSS (estava em https://codepen.io/electricalbah/pen/eJRLVd ) e carregamento de imagens diferidas (estava em https://varvy.com/pagespeed/defer-images.html )   (embora o código tenha sido modificado antes de ser utilizado ERDDAP ) .
Graças a Cara Wilson, Matthew Austin e Adam Shepherd/BCO-DMO para pedidos de suporte à imagem.
Graças a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell para pedidos de suporte a arquivos de áudio/hidrofone.
Graças à OOI por mostrar a necessidade de suporte a vídeo.
        * NOVO: Um subconjunto de dados de qualquer ERDDAP™ conjunto de dados (mas geralmente um conjunto de dados de arquivos de áudio) agora pode ser salvo em um arquivo de áudio .wav. ( [documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Graças a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell para pedidos de suporte a arquivos de áudio/hidrofone.
        * MELHORADO: O formato para as pastas acessíveis da Web (WAF)   (Por exemplo, as pastas /files/) foi atualizado para usar uma tabela HTML. O novo formato imita a versão mais recente do diretório listando páginas web criadas por versões mais recentes do Apache. Os humanos descobrirão que as mudanças facilitam a leitura da informação. Software que analisa estes documentos (Por exemplo, software que recolhe documentos ISO 19115 ERDDAP ) terá de ser revisto, mas o novo formato será mais fácil de analisar do que o formato anterior. (Atenção, Anna Milan.) 
        * NOVO outOfDateDatasets.html Page. ( [exemplo](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Esta página web mostra uma tabela com todos os conjuntos de dados em tempo real que têm&lt; testOutOfDate &gt; tag (ver abaixo) , classificados por quão desatualizados são os conjuntos de dados. Este painel deve ser útil para ERDDAP™ administradores e usuários finais quando eles querem saber quais conjuntos de dados estão desatualizados. Para conjuntos de dados desatualizados, há provavelmente um problema com a fonte de dados, de modo que ERDDAP™ é incapaz de ver/obter dados de pontos de tempo mais recentes.
Administradores: Se você não quer uma página da Web de Datas Fora de Data, adicione isso ao seu setup.xml:
            &lt;Fora deDatasetsAtivos&gt;falsos&lt;/outOfDateDatasetsActive&gt;
Agora há. testOutOfDate e fora DeDate colunas na allDatasets Conjunto de dados.
Graças a Bob Simons, que tem desejado isso há anos, e às pessoas inteligentes do Instituto Naval da Irlanda, que me deu a inspiração através de seu dedicado Raspberry Pi e monitor que sempre mostra uma tela como esta em seu escritório.
        * MELHORADO: .htmlTable e .xhtml resposta são agora melhor formatado, mais compacto, e assim carregar mais rápido. Graças ao HTML5 e CSS.
    * NOVO tipo de arquivo de saída para conjuntos de dados de gradedap: .timeGaps. Mostra uma lista de lacunas nos valores temporais que são maiores do que a mediana. ( [exemplo](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Isto é útil para ERDDAP™ administradores e usuários finais quando eles querem saber se existem lacunas inesperadas nos valores de tempo para um conjunto de dados que é esperado ter valores de tempo regularmente espaçados. Graças a Bob Simons e Roy Mendelssohn que precisava deste recurso.
    * MELHORADO: O gráfico padrão para o allDatasets dataset é agora um mapa com x=maxLon e y=maxLat. Graças a John Kerfoot, Rich Signell e OOI-CI.
    * NOVO: [erddapy](https://github.com/ioos/erddapy) -- não é um ERDDAP™ recurso, mas será de interesse para muitos ERDDAP™ utilizadores. Erddapy ( ERDDAP™ + Python ) é um Python biblioteca criada por Filipe Fernandes que "aproveita ERDDAP 's RESTful web services e cria o ERDDAP™ URL para qualquer solicitação, como procurar por conjuntos de dados, adquirir metadados, baixar dados, etc." Graças a Filipe Fernandes.
    * Eu devia ter mencionado antes: Existe um pacote R de terceiros concebido para facilitar o trabalho com ERDDAP™ a partir de R: [rerddap](https://github.com/ropensci/rerddap#rerddap) . Graças a [rOpenSci](https://ropensci.org/) e Roy Mendelssohn.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   
     
    * A FAZER: Em setup.xml, logo abaixo&lt;adminInstitution&gt;, por favor adicione um&lt;adminInstitutionUrl&gt; tag que especifica um URL para sua instituição (ou grupo) .
    * TO DO: Estas 3 tags no setup.xml não são mais usadas:
        &lt;início HeadHtml&gt;,&lt;startBodyHtml&gt; e&lt;endBodyHtml&gt;. São substituídos por
        &lt;startHeadHtml5&gt;&lt;startBodyHtml5&gt; e&lt;endBodyHtml5&gt;, que têm valores padrão especificados em messages.xml (e mostrado abaixo) .
        
Recomendamos usar o padrão&lt;startHeadHtml5&gt; e&lt;endBodyHtml5&gt;.
Recomendamos: Se você fez alterações no original&lt;startBodyHtml&gt; e/ou deseja personalizar seu ERDDAP™ Agora, por favor, copie o novo&lt;startBodyHtml5&gt; tag (a partir de baixo) em seu setup.xml e modificá-lo para personalizar seu ERDDAP™ De modo que ERDDAP as páginas web refletem a sua organização, não NOAA   ERD . Notavelmente, por favor, mude o "tragado para você" para sua organização (s) . Se precisar de ajuda, envie um e-mail erd.data at noaa.gov . (Se você não quiser personalizar seu ERDDAP™ agora, use o padrão&lt;startBodyHtml5&gt;.)
        
Em seguida, excluir as 3 tags antigas em seu setup.xml que não são mais usados.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Existem outras maneiras que você pode [personalizar ERDDAP™ ](/docs/server-admin/deploy-install#customize) assim ERDDAP As páginas Web refletem a sua organização em vez de NOAA   ERD .
        
    * A FAVOR:&lt; EDDGrid ...Exemplo de etiquetas & gt; (começando com&lt; EDDGrid IdExample&gt;) e&lt;Tabela EDD... Exemplo & gt; tags (começando com&lt;EDDTableIdExample&gt;) em seu arquivo setup.xml são usados para criar exemplos no griddap e tabledap documentação. Páginas Web html na sua ERDDAP .
        
Se você não personalizar essas tags, exclua-as do seu arquivo setup.xml. Agora todos eles têm padrões em messages.xml que se referem a conjuntos de dados em Bob ERDDAP™ em https://coastwatch.pfeg.noaa.gov/erddap/index.html . Então você não precisa mais ter conjuntos de dados específicos em seu ERDDAP . Se você quiser substituir os padrões, copie algumas ou todas essas tags em seu setup.xml e altere seus valores.
Se quiser que os exemplos apontem para o seu ERDDAP™ , o método mais fácil é:
        
        1. Incluir estes dois conjuntos de dados no seu ERDDAP™ adicionando isto à sua datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Adicione esta tag ao seu setup.xml, mas altere a URL para o seu ERDDAP 's ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Se você personalizou essas tags, deixe-as como está e, por favor, adicione estas 2 novas tags ao seu setup.xml para especificar o ERDDAP™ URL para estes conjuntos de dados, mas mude o URL para o seu ERDDAP 's ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * A FAZER: ERDDAP™ agora usa um arquivo css chamado erddap2.css. Se fez alterações ao \\[ tomcat \\] /webapps/erddap/images/erddap.css, considere fazer alterações semelhantes a erddap2.css (na mesma pasta) .
    * NOVO: ERDDAP as páginas web agora têm um grande número de links internos quase invisíveis (o texto é preto e não sublinhado) . Se você pairar sobre um destes links (geralmente as primeiras palavras de cabeçalhos e parágrafos) , o cursor torna-se uma mão. Se você clicar no link, o URL é o link interno para essa seção do documento. Isso facilita a referência a seções específicas da documentação. Graças ao Bob Simons, que queria isto há anos.
    * NOVO: ERDDAP™ agora suporta [Intervalo de bytes / Intervalos de Aceitação](https://en.wikipedia.org/wiki/Byte_serving) pedidos de porções de arquivos /files/. Isso foi necessário para suportar os visualizadores de áudio e vídeo em navegadores.
    * A FAZER: Agora, para melhorar a segurança, se você especificou&lt;baseHttpsUrl&gt; em setup.xml (e, assim, apoiar https ) , a bandeira recomendada Url é um https URL com uma flagKey mais segura. Se assim for, qualquer flagUrls/flagKeys anterior ficará inválido. Administradores: Se estas alterações se aplicarem à sua ERDDAP™ e se a sua ERDDAP™ tem EDDGrid Darddap e da tabela EDD FromErddap's que assinam o remoto ERDDAP s, então, depois de atualizar ERDDAP , o seu ERDDAP™ tentará se inscrever automaticamente com o novo flagUrl, então você deve excluir as assinaturas antigas e validar as novas assinaturas quando receber os novos emails de validação da assinatura.
    * A FAZER: Se o seu ERDDAP™ tem EDDGrid FromErddap datasets for erdVH3 datasets on Bob's costwatch ERDDAP™ , altere-os para consultar os novos conjuntos de dados erdVH2018.
    * A FAZER: Se você incluir algum dos conjuntos de dados de amostra jplAquariusSSS em seu ERDDAP™ , por favor mude "V4" no datasetID "V5".
    * A FAZER: actual\\_range é agora um atributo padrão CF (a partir de CF-1.7) e claramente diz que se a variável usa add\\_offset e/ou scale\\_factor para embalar os valores dos dados, em seguida, actual\\_range os valores devem usar o tipo de dados descompactados e os valores descompactados. Infelizmente, isso entra em conflito com o nosso conselho anterior. Gerar conjuntos de dados Xml agora desempacota embalado actual\\_range valores, mas isso não irá corrigir conjuntos de dados existentes no seu datasets.xml Arquivo.
        
Então, verifique seus conjuntos de dados: se os valores de uma variável estão embalados e se actual\\_range é especificado como valores de dados embalados, por favor adicione um&lt; addAttributes &gt; actual\\_range valor para especificar os valores descompactados. Caso contrário, o conjunto de dados não irá carregar ERDDAP . Uma maneira simples e quase perfeita de fazer isso é pesquisar datasets.xml fonte Atributos que têm
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
e a scale\\_factor excepto 1.0. Esses são os actual\\_range atributos que você pode ter que corrigir.
        
Para as variáveis do eixo em EDDGrid conjuntos de dados, ERDDAP™ define sempre o actual\\_range atributo para ser o intervalo real dos valores uma vez que conhece esses valores.
        
Para as variáveis de eixo com valores descendentes (Por exemplo, algumas variáveis de latitude) , ERDDAP™ criado actual\\_range com \\[ 0 \\] ... \\[ última \\] valores, que eram altos... baixos. Agora ele sempre usa baixos ... altos valores para fazer a nova definição CF.
        
A correcção da actual\\_range os valores são particularmente importantes para os conjuntos de dados da tabela EDD, porque ERDDAP™ irá rejeitar rapidamente os pedidos de dados do utilizador que sejam inferiores aos actual\\_range valor mínimo ou superior actual\\_range valor máximo.
        
Relacionado: o\\_min real,\\_max real, data\\_min e data\\_max os atributos estão agora obsoletos. Por favor, converta seus conjuntos de dados para usar actual\\_range Em vez disso.
        
    * A FAZER (opcional, mas recomendado) : Para cada conjunto de dados quase em tempo real e previsão em seu ERDDAP™ , por favor adicione um [&lt; testOutOfDate &gt;] (/docs/server-admin/datasets# test outofdate) tag com um valor no formulário now- _nUnits_, por exemplo, now- 2 dias. Se o valor máximo de tempo para o conjunto de dados for superior a esse valor, o conjunto de dados é considerado desatualizado e será marcado como tal no [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) Página Web. Isso fornece uma maneira fácil de você ver quando algo está errado com a fonte de um conjunto de dados.
    *    [NOVO: Marcação semântica de conjuntos de dados com json-ld (JSON Dados Ligados) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ agora usa [json-ld (JSON Dados Ligados) ](https://json-ld.org) para fazer seu catálogo de dados e conjuntos de dados parte do [web semântica](https://en.wikipedia.org/wiki/Semantic_Web) , que é a ideia de Tim Berners-Lee para tornar o conteúdo da web mais legível por máquina e "compreensível". Motores de busca ( [Google em particular](https://developers.google.com/search/docs/data-types/datasets) ) e outras ferramentas semânticas podem utilizar essa marcação estruturada para facilitar a descoberta e indexação. A marcação estruturada json-ld aparece como invisível aos humanos&lt;script&gt; código na http://.../erddap/info/index.html Página Web (que é uma web semântica [DataCatalog](https://schema.org/DataCatalog) ) e em cada http://.../erddap/info/_datasetID_/index.html Página Web (que é uma web semântica [Conjunto de dados](https://schema.org/Dataset) ) . (Os agradecimentos especiais a Adam Leadbetter e Rob Fuller do Instituto da Marinha na Irlanda para fazer as partes duras do trabalho para fazer esta parte do ERDDAP .) 
    * NOVO: Existem novos tipos de conjuntos de dados que podem ler dados de arquivos de áudio:
         [ EDDGrid DeAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , que trata os dados de áudio como dados em grade.
         [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , que trata dados de áudio como dados tabulares. Graças a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell para pedidos de suporte a arquivos de áudio/hidrofone.
    * Alterações para gerar conjuntos de dados Xml (e alterações relacionadas) :
        * NOVO: ERDDAP™ agora tem um sistema para automaticamente [atualizar URLs desatualizados](/docs/server-admin/additional-information#out-of-date-urls) ambos na Geração de Dados Xml e ao carregar conjuntos de dados. Se você tem sugestões para URLs adicionais que devem ser capturadas e atualizadas, ou se você acha que isso deve ser transformado em um serviço (como os Conversores) , por favor e-mail erd.data at noaa.gov .
        * NOVO: Agora, se gerar conjuntos de dados Xml vê um CF standard\\_name   (que devem ser todos minúsculas) com um caractere maiúscula, adiciona toda a versão minúscula para&lt; addAttributes &gt;. Além disso, quando um conjunto de dados carrega, se ERDDAP™ vê uma FC standard\\_name com um carácter maiúscula, muda-o silenciosamente para o standard\\_name . Graças ao Rich Signell.
        * NOVO: Agora, se gerar conjuntos de dados Xml vê um atributo com um tempo que não está no formato ISO 8601, ele adiciona o tempo formatado ISO 8601 para&lt; addAttributes &gt;. Se ERDDAP™ não reconhece o formato, deixa o valor de tempo inalterado. Se você ver um formato que ERDDAP™ não reconhece e corrige, por favor envie-o para erd.data at noaa.gov .
        * MELHORADO: O código de baixo nível para o EDDGrid DeThreds Opção de catálogo em GerarDatasets Xml agora depende do Unidata netcdf-java catalog rastreador código (Três mil. classes de catálogo) para que ele possa lidar com todos os catálogos ThREDS (que pode ser surpreendentemente complexo) . Graças a Roland Schweitzer por sugerir esta mudança e graças a Unidata para o código.
        * NOVO: Gerar conjuntos de dados Xml para EDDGrid FromDap agora adiciona ", startYear-EndYear" ao fim do título baseado em valores reais do eixo do tempo. Endyear="presente" se os dados existirem nos últimos 150 dias.
        * NOVO: Gerar conjuntos de dados Xml para EDDGrid FromDap agora acrescenta ", \\[ resolução \\] °" para o título se o conjunto de dados for uniformemente espaçado e o mesmo para lat e lon.
        * MELHORADO: O conversor de tempo agora tem recursos adicionais, notadamente a capacidade de converter tempos de cadeia em uma grande variedade de formatos comuns em cadeias ISO 8601 ou em um número compatível com UDUnits. Todas as funcionalidades suportadas anteriormente continuam a funcionar, inalteradas.
        * BUG FIX: Gerar conjuntos de dados Xml e o conversor Keywords agora incluem "Terra Ciência &gt; " no início do GCMD Science Keywords. Quando um conjunto de dados é carregado ERDDAP™ , ERDDAP™ agora corrige todas as palavras-chave GCMD no atributo palavras-chave que não começam com "Terra Ciência &gt;" ou que usam qualquer outra coisa além do caso título (onde a primeira letra de cada palavra é capitalizada) .
        * MELHORIA: Ao sugerir&lt; destinationName &gt;'s, Gerar conjuntos de dados Xml para EDDTableFromAsciiFiles apenas usou a extremidade da cauda de sourceName s com '/'   (alguns eram do tipo nome de arquivo) . Agora usa o todo sourceName (por exemplo, "blahblahblah (m/s)". Esta mudança será boa para alguns conjuntos de dados e não para outros, mas é um comportamento mais seguro. Graças ao Maurice Libes.
        * BUG FIX: Gerar conjuntos de dados Xml e os construtores de conjuntos de dados agora garantem que não há nomes de colunas duplicadas. Graças ao Maurice Libes.
        * BUG FIX: Gerar conjuntos de dados Xml para EDDTableFromAsciiFiles não escreveu&lt;colunaSeparador&gt; para a saída. Agora sim. Graças ao Maurice Libes.
    * NOVO: A ferramenta DasDds agora imprime informações de gap de tempo (a [Informação .timeGaps](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) Se o conjunto de dados for um conjunto de dados em grelha.
    * NOVO: Pesquisa avançada agora aceita valores de tempo "now_\\-nUnits_". Graças ao Rich Signell.
    * MELHORADO: Para melhorar a segurança, quando um endereço de e-mail em metadados de um conjunto de dados ou dados é escrito para uma página web html, o "@" é substituído por " em ". Isso só captura endereços de e-mail que são os metadados inteiros ou o valor dos dados, não endereços de e-mail incorporados em valores mais longos.
    * MELHORADO: Para aumentar a segurança, o RSS informação para conjuntos de dados privados agora só está disponível para usuários (e RSS leitores) que estão logados e autorizados a usar esse conjunto de dados.
    * NOVO: Agora, quando um conjunto de dados é carregado, se date\\_created , date\\_issued , date\\_modified , ou atributo date\\_metadata\\_modified tem um valor de tempo que não está no formato ISO 8601, ERDDAP™ muda para o tempo formatado ISO 8601. Se ERDDAP™ não reconhece o formato, deixa o valor de tempo inalterado. Se você ver um formato que ERDDAP™ não reconhece e corrige, por favor envie-o para erd.data at noaa.gov .
    * MELHORIA: .dods respostas de EDDGrid Os conjuntos de dados devem agora ser significativamente mais rápidos. Graças ao Rich Signell.
    * Alterações relacionadas com ERDDAP Criação de documentos ISO 19115:
        * BUG FIX: ao criar documentos ISO 19115, dataVariable unidades não eram HTML Attribute codificado e por cento codificado. Agora estão. Graças ao validador ISO 19115 da NGDC.
        * BUG FIX: ao criar documentos ISO 19115, date\\_created foi usado como é, tantas vezes foi o formato errado. Agora é convertido para ISO 8601 Z string. Graças ao validador ISO 19115 da NGDC.
        * BUG FIX: ao criar documentos ISO 19115, ERDDAP™ agora escreve datas mais longas com ano=0000 (como com conjuntos de dados de climatologia) , porque o esquema ISO 19115 não permite datas com ano=0000. Graças ao validador ISO 19115 da NGDC.
    * NOVO: Como antes de um pedido de http .../erddap/version irá retornar apenas o número da versão (como texto) , por exemplo, " ERDDAP \\_version=1,82".
Agora, um pedido para http .../erddap/version\\_string irá retornar um número e um sufixo opcional de '\\_' mais texto ASCII (sem espaços ou caracteres de controlo) , por exemplo, " ERDDAP \\_version\\_string=1.82\\_JohnsFork". As pessoas que fazem o garfo especificarão isso mudando EDStatic.erddapVersion. Esta maneira de fazê-lo não causa problemas para versões anteriores de ERDDAP . Graças ao Axiom (notavelmente, Kyle Wilcox) Instituto da Marinha da Irlanda (notavelmente, Rob Fuller) .
    * BUG FIX: Para wms versão=1.3.0, request= GetMap , crs=EPSG:4326 (não CRS:84) requisições: a ordem bbox deve ser minLet,minLon,maxLat,maxLon. Para pedidos CRS:84, como antes, a ordem bbox deve ser minLon,minLet,maxLon,maxLet. Isto pode ser corrigido usando ERDDAP 's WMS 1.3.0 serviço em ArcGIS   (graças a Paola Arce) . Obrigado. (não) para OGC Por tornar isto tão complicado. Graças a Leaflet para lidar com isso corretamente e por me dar uma maneira de testar isso.
    * MELHORADO: Anterior, o link sugerido para RSS e assinaturas de e-mail tem o http URL para o seu ERDDAP . Agora é o https URL, se isso estiver ativo.
    * NOVO: EDDGrid A cópia agora suporta uma etiqueta opcional&lt;somenteDesde&gt;_ algumValue_&lt;/somenteDesde&gt;, onde o valor é uma hora formatada ISO-8601 específica ou uma now- nUnits (Por exemplo, now- 2 anos) Tempo. Ver o [apenas Desde a documentação](/docs/server-admin/datasets#onlysince) . Graças ao Drew P.
    * MELHORADO: Se disponível, ERDDAP™ mostrará a https URL (de&lt;baseHttpsUrl&gt;, se disponível) em vez da http URL quando ele diz aos usuários a URL para adicionar/validar/remover/listar uma assinatura.
    * BUG FIX: ERDDAP™ agora permite uma ação de assinatura para começar com " https://" . (O Bob bate na testa.) Graças à Jennifer Sevadjian.
    * BUG FIX: .jsonlKVP agora usa ':' entre cada chave e valor, em vez de '=' . (O Bob bate na testa.) Graças ao Alexander Barth.
    * BUG FIX: Anteriormente, se você reiniciado ERDDAP™ com quickRestart=true, e se, antes de o conjunto de dados ser recarregado normalmente, você fez uma chamada para um conjunto de dados EDDTableFromFiles que usou atualizaçãoEveryNMillis, e se um arquivo de dados tivesse acabado de ser alterado, a solicitação falharia com um erro de ponteiro nulo. Agora o pedido terá sucesso. Graças ao John Kerfoot.
    * NOVO: Quando um conjunto de dados é carregado ERDDAP™ , as palavras-chave são agora reorganizadas em ordem ordenada e quaisquer caracteres newline são removidos.
    * Agora, se um GeoJson, .json ou .nc O pedido do OJson tem .json parâmetro p, o tipo mime de resposta é aplicativo/javascript. Note que .json p não é suportado para .jsonlCSV ou .jsonlKVP , já que não funcionaria. Graças ao Rob Fuller.
    * MELHORADO: O tipo MIME para o arquivo json linesType opções agora é "aplication/x-jsonlines". Foi aplicação/jsonl. Atualmente, não há escolha correta definitiva.
    * MELHORADO: O número de requisições falhadas mostradas na página status.html irá aumentar porque mais coisas são contadas como falhas do que antes, por exemplo, ClientAbortException.
    * Agora, se uma resposta de ERDDAP™ não é comprimido, então o cabeçalho da resposta incluirá "Content-Encoding"="identity".
    * O atributo "licença" não era necessário. Agora, se não for especificado, o padrãoLicense de messages.xml (ou de setup.xml se estiver presente) é usado como padrão.
    * NOVO: Agora existe um opcional [arquivoAccessSufix atributo](/docs/server-admin/datasets#fileaccessbaseurl) . que pode ser utilizado com o existente [arquivoAccessBaseUrl atributo](/docs/server-admin/datasets#fileaccessbaseurl) .
    * Para aumentar a segurança, esta versão foi compilada com a mais recente Java JDK v8u162.
    * NOVO: Para aumentar a segurança, vários domínios comuns que oferecem endereços de email temporários (Por exemplo, @mailinator.com) estão agora em uma lista negra de email permanente para o sistema de assinaturas.
    * NOVO: Para aumentar a segurança, as contas no Daily Report incluem agora:
Definir conjunto de dados Falha no endereço IP da bandeira (desde o último relatório diário)   
Definir conjunto de dados Falha no endereço IP da bandeira (desde a inicialização)   
Definir conjunto de dados Endereço IP da bandeira obtido (desde o último relatório diário)   
Definir conjunto de dados Endereço IP da bandeira obtido (desde a inicialização)   
As contas falhadas deixam-te ver quem (Um hacker?) está a tentar definir uma bandeira, mas está a falhar.
    * MELHORADO: Para aumentar a segurança, endereços de email no&lt;subscriçãoEmailBlacklist&gt; na sua datasets.xml são agora considerados insensíveis.
         

## Versão 1.80{#version-180} 
 (lançado em 2017-08-04) 

*    **Novas funcionalidades (para usuários) :**   
     
    * NOVO orderByCount  () filtro permite- lhe especificar como a tabela de resultados será ordenada (ou não) e apenas retorna uma linha para cada grupo de ordenação, com a contagem do número de valores não perdidos para cada variável.
Por exemplo, orderByCount  (" stationID ") irá ordenar por stationID e devolver uma linha para cada stationID , com uma contagem do número de valores não perdidos para cada variável.
Se você apenas especificar orderByCount  ("") , a resposta será apenas uma linha com o número de valores não perdidos para cada variável de dados.
Ver o [ orderBy ... documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Graças ao Ben Adams.
    * NOVO .nc arquivo oJson Opção de tipo para conjuntos de dados gradeados e tabulares. Esta opção faz um NCO lvl=2 ficheiro "pedantic" JSON com todas as informações normalmente encontradas num .nc Arquivo. Ver [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Graças ao Charlie Zender.
    * BUG FIX: A orderBy ... () opções na página do Make A Graph são agora tratadas corretamente.
    * BUG FIX: .geoJson saída agora não imprimir linhas onde os valores lat ou lon estão faltando. Além disso, valores de altitude (se disponível) estão agora incluídos nas coordenadas, não como valores de dados. Graças ao Jonathan Wilkins.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   
     
    * QUESTÕES DE SEGURANÇA: A biblioteca protocols.js usada para o OpenLayers demo na WMS páginas em ERDDAP™ está desatualizado e tem um bug que potencialmente permite que ele seja mal usado. (Infelizmente, a actualização OpenLayers e protocolos. Não é fácil.) Isso abre a possibilidade de que a biblioteca possa ser configurada para permitir uma vulnerabilidade transversal. No entanto, uma vez ERDDAP™ Unicamente utilizações OpenLayers de um modo predefinido específico e apenas com ERDDAP - baseando-se em fontes de dados, acreditamos que não há vulnerabilidade entre ERDDAP utilização de OpenLayers e protocols.js. No entanto, se você não acredita nisso, agora você pode desativar o uso do OpenLayers demo na WMS páginas da sua ERDDAP™ adicionando
```
        <openLayersActive>false</openLayersActive>  
```
para o seu arquivo setup.xml. O padrão é "verdadeiro". Graças ao Charles Carleton e ao NCEI.
    * MUDANÇAS DE SEGURANÇA: Arquivos .jar não usados e arquivos .jar duplicados (porque eles também estão em netcdfAll.jar) foram retirados da ERDDAP™ distribuição. Os arquivos .jar desatualizados foram atualizados. Graças ao Charles Carleton e ao NCEI.
    * MUDANÇAS DE SEGURANÇA: O arquivo netcdfAll.jar distribuído com ERDDAP™ é a versão mais recente (atualmente 4.6.10) , mas ainda contém arquivos internos jackson .jar que são conhecidos por estarem desatualizados e terem vulnerabilidades de segurança, notadamente as bibliotecas Jackson que só são usadas quando acessam fontes de dados Amazon S3. Se você não estiver acessando dados via Amazon S3 (você saberia se estivesse) , essas vulnerabilidades não são relevantes.
        
Os desenvolvedores do netcdf-java sustentam que essas vulnerabilidades não são relevantes devido à forma como o código netcdf utiliza essas bibliotecas e, em qualquer caso, só seriam relevantes quando acessar o Amazon S3. Ver [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) . Eu acredito neles. Se você ainda tem preocupações sobre isso, entre em contato com os desenvolvedores netcdf-java. (Note que se você não acredita nos desenvolvedores netcdf-java e está contemplando não usar ERDDAP™ por causa disso, você não deve usar thREDS também, porque thREDS usa netcdf-java mais fundamental e mais extensivamente do que ERDDAP .) 
        
Detalhes: O código problemático e os avisos de vulnerabilidade são:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - O quê? Alta
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - O quê? Alta
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-anotations/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - O quê? Alta
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Crítico
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - O quê? Alta
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Crítico
"Para a versão 4.6.10, aws-java-sdk-core puxa na versão 2.6.6 de artefatos jackson-\\*." (e-mail de pessoas netcdf-java) .
Graças ao Charles Carleton e ao NCEI.
        
    * MUDANÇAS DE COMPILER: Se você recompilar ERDDAP™ , note que o parâmetro -cp classpath necessário para a linha de comando agora é muito mais curto do que antes. Veja a nova configuração -cp [esta documentação](/docs/contributing/programmer-guide#development-environment) . Graças ao Charles Carleton e ao NCEI.
    * NOVA OPÇÃO na Geração de Dados Xml: EDDTableFromBcodmo, que é apenas para uso interno no BCO-DMO.
Graças a Adam Shepherd e BCODMO.
    * NOVA ATTRIBUTA E CARACTERÍSTICA: Se uma coluna EDDTable tiver nomes de arquivos acessíveis à Web (Por exemplo, ficheiros de imagem, vídeo ou áudio) , você pode adicionar
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
para especificar o URL base (terminando com /) necessário para tornar os nomes de ficheiros em URLs completas. Então para .htmlTable respostas, ERDDAP™ irá mostrar o nome do ficheiro como um link para o URL combinado (a base Url mais o nome do ficheiro) .
Se quiseres. ERDDAP™ para servir os arquivos relacionados, faça um conjunto de dados EDDTableFromFileNames separado para esses arquivos (pode ser um conjunto de dados privados) .
Graças a Adam Shepherd e BCODMO.
    * NOVA RECOMENDAÇÃO ATTRIBUTE: Se uma coluna EDDTable tiver nomes de arquivos acessíveis na web (Por exemplo, ficheiros de imagem, vídeo ou áudio) que são acessíveis através de um arquivo (Por exemplo, .zip arquivo) acessível através de um URL, use
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
para especificar o URL do arquivo.
Se quiseres. ERDDAP™ para servir o arquivo de arquivo, faça um conjunto de dados EDDTableFromFileNames separado para esse arquivo (pode ser um conjunto de dados privados) .
Graças a Adam Shepherd e BCODMO.
    * MELHORAÇÕES PARA A Geração de Dados Xml para remover as causas de inválido / ruim&lt; subsetVariables &gt; sugestões e nomes de variáveis duplicadas/ruim sugeridos, etc. Graças ao Rich Signell, ao Adam Shepherd e à BCO-DMO.
    * NOVA OPÇÃO: A informação de fronteira política distribuída com ERDDAP é de um terceiro e um pouco ultrapassado. Além disso, há fronteiras disputadas em vários lugares do mundo, onde diferentes pessoas terão ideias diferentes sobre o que é correto. NÓS NÃO CLAIM SOBRE A CORRECTIDADE DOS DADOS POLÍTICOS ERDDAP . Se você não gosta da informação de fronteira política que vem com ERDDAP™ Agora podes dizer ERDDAP™ nunca desenhar fronteiras políticas adicionando
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
para o seu arquivo setup.xml. O padrão é "verdadeiro". Graças ao Raju Devender.
    * NOVA METADATA TAG: Na datasets.xml para um conjunto de dados, você agora pode especificar o número padrão de cores Seções de barras para um dataVariable em gráficos e mapas com
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (padrão=-1, que diz para deixar ERDDAP™ decidir) . Ver o [cor Configuração da barra](/docs/server-admin/datasets#color-bar-attributes) .
    * MELHORADO: a cor do limite do estado nos mapas era roxa (Deep Purple para você Baby Boomers) . Agora está cinzento (entre a fronteira nacional cinza e a terra cinza) .
    * BUG FIX:&lt;iso19115Ficheiro&gt; e&lt;fgdcFile&gt; in datasets.xml nem sempre foram manuseados corretamente. Agora estão. Graças à BCO-DMO.

## Versão 1.78{#version-178} 
 (lançado 2017-05-27) 

*    **Novas funcionalidades (para usuários) :**   
     
    *    (nenhum)   
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   
     
    * MELHORADO: A ordem de linhas em "Major LoadDatasets Time Series" na página status.html é agora mais recente em cima para o mais antigo na parte inferior.
    * BUG FIX: ERDDAP™ agora escreve .nccsv arquivos com a variável de tempo actual\\_range como um tempo de cadeia ISO-8601. Isso corrige o bug com informações de análise EDDTableFromErddap de um conjunto de dados remoto e do arquivo quickRestart para todos os conjuntos de dados EDDTableFrom...Files. (O tempo actual\\_range estará errado na primeira vez que o conjunto de dados carrega em v1.78, mas correto após ser recarregado, por exemplo, se você marcar o conjunto de dados.) 

## Versão 1.76{#version-176} 
 (lançado 2017-05-12) 

*    **Novas funcionalidades (para usuários) :**   
     
    * MUDANÇA em Tomcat: Para os pedidos de ERDDAP™ provenientes de software que não sejam navegadores web (Por exemplo, curl , R, Matlab , Python , Java ) :
Como com as alterações anteriores nas versões do Tomcat (o software de nível inferior que executa ERDDAP ) desde o início de 2016, cada vez mais caracteres na parte de consulta da URL de requisição devem ser [ **Percentagem codificada** ](/docs/server-admin/datasets#infourl) por razões de segurança. Os navegadores cuidam da codificação percentual para você. assim usando ERDDAP™ em um navegador não é afetado a menos que o pedido seja redirecionado para outro ERDDAP .
    * Anteriormente, ERDDAP™ tratado **variáveis de caracteres** mais como inteiros curtos não assinados do que caracteres. Agora trata-os mais como 1 caráter-long UCS-2 (Unicode) Cordas. Ver o [documentação do char](/docs/server-admin/datasets#char) . Graças a Aurelie Briand e ao projecto Argo.
    * Anteriormente, ERDDAP™ ofereceu pouco apoio para **Caracteres Unicode** acima do caracter #255 em Strings. Agora, internamente, ERDDAP™ suporta totalmente 2-byte caracteres UCS-2 (caracteres numerados de 0 a 65535) em Strings. Quando os dados do String são escritos para vários tipos de ficheiros, ERDDAP™ faz o melhor que pode para suportar 2 bytes chars. Outro exemplo são os arquivos .csv que ERDDAP™ escreve com a codificação ISO- 8859-1 (uma codificação de 1-byte) , então ERDDAP™ escreve quaisquer caracteres acima do caracter #255 com a sintaxe tipo JSON\\u_hhhh_. Ver [Dados de texto](/docs/server-admin/datasets#string) .
    * MELHORADO: .nc arquivos escritos por ERDDAP™ , char variáveis a serem interpretadas como Strings terá o atributo
         **\\_Encoding=ISO-8859-1**   
In .nc ficheiros lidos por ERDDAP™ , char variáveis com "\\_Encoding" serão interpretadas como Strings com a codificação especificada.
    * REMUNERAÇÃO: ERDDAP™ suportes **Codificação do tipo JSON** de caracteres especiais quando você especifica restrições das variáveis char e String. Assim você pode solicitar algo como &myString="\\u20ac" quando você quiser linhas de dados onde myString=€ uma vez que 20ac é a versão hexadecimal do ponto de código para o símbolo Euro. Várias fontes na web mostram os números de pontos de código para símbolos Unicode, por exemplo, [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) .
    * Anteriormente, ERDDAP™ oferecido apoio limitado para **inteiro longo** variáveis. Agora. ERDDAP™ totalmente suporta internamente e faz o seu melhor ao escrever dados longos para vários tipos de arquivos. . Ver o [documentação longa](/docs/server-admin/datasets#long) . Graças ao Instituto Naval da Irlanda, Craig Risien, Rich Signell, Christopher Wingard e OOI.
    * NOVO: tipo de arquivo de saída para gradedap e tabledap : ** .nccsv ** , o que faz um NetCDF - like, ASCII, arquivo CSV que também contém todos os metadados que seriam comparáveis .nc Arquivo. Ver o [NCCSV Especificação](/docs/user/nccsv-1.00) . Graças ao Steve Hankin.
    * NOVO: ** orderByClosest filtro** permite- lhe especificar como a tabela de resultados será ordenada e um intervalo (p. ex., 2 horas) . Dentro de cada grupo de ordenação, apenas as linhas mais próximas do intervalo serão mantidas. Por exemplo, orderByClosest  (" stationID , tempo, 2 horas") irá ordenar por stationID e tempo, mas apenas devolver as linhas para cada stationID onde a última orderBy coluna (tempo) é mais próximo de intervalos de 2 horas. Esta é a coisa mais próxima em tabledap para avançar valores em uma solicitação griddap. Esta opção pode ser especificada através de qualquer tabledap página web .html do conjunto de dados, página web .graph, e por qualquer URL que você gerar. Graças ao Instituto Naval da Irlanda e às Redes Oceânicas Canadá.
    * NOVO: ** orderByLimit filtro** permite- lhe especificar como a tabela de resultados será ordenada e um número limite (Por exemplo, 100) . Dentro de cada grupo de ordenação, somente as primeiras linhas do 'limite' serão mantidas. Por exemplo, orderByMax  (" stationID , 100") irá ordenar por stationID , mas apenas devolver as primeiras 100 linhas para cada stationID . Isto é semelhante à cláusula LIMIT do SQL. Esta opção pode ser especificada através de qualquer tabledap página web .html do conjunto de dados, página web .graph, e por qualquer URL que você gerar. Graças ao Instituto Naval da Irlanda e às Redes Oceânicas Canadá.
    * NOVO: Dois novos tipos de ficheiros de resposta, ** .jsonlCSV e .jsonlKVP ** estão disponíveis para pedidos de conjuntos de dados em grade, conjuntos de dados tabulares e muitos outros lugares em ERDDAP   (Por exemplo, pedidos de informação sobre conjuntos de dados) . Os arquivos são arquivos JSON Lines ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) onde cada linha tem um objeto JSON separado. .jsonlCSV apenas tem os valores em um formato CSV. .jsonlKVP tem chave: Pares de valor. Cada linha está por conta própria. As linhas não estão fechadas em um array ou objeto JSON maior. Por exemplo, veja [Este pedido de amostra](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Graças a Damian Smyth, Rob Fuller, Adam Leadbetter, e ao Instituto Naval da Irlanda.
    * NOVO: Há nova documentação descrevendo [ **Como acessar conjuntos de dados privados ERDDAP™ através de scripts** ](/docs/user/AccessToPrivateDatasets) . Graças à Lynn DeWitt.
    * MELHORIA: A extensão mínima do ** OpenLayers ** mapa estava 2 graus e agora é 4 pixels de dados. Graças ao Rusty Holleman.
    * MELHORIA: Em alguns casos comuns, os pedidos incluem: **expressão regular** a restrição será processada muito mais rapidamente.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   
     
    *    **Slow first startup:** A primeira vez que você iniciar esta nova versão, vai levar um longo tempo para ERDDAP™ para carregar todos os conjuntos de dados porque ele precisa re-ler todos os arquivos de dados de origem (embora apenas o cabeçalho para arquivos de dados em grade) . Se você olhar para os logs você pode ver mensagens de erro dizendo "antiga/não suportada versão melhorada" de alguns arquivos internos -- tudo bem -- ERDDAP™ fará as novas versões dos arquivos internos. Por favor, seja paciente.
    * ACÇÃO: ERDDAP™ agora usa o novo **java.time** classes (também conhecido como JSR 310) em vez de Joda para analisar vezes String em tempos numéricos. Notas:
        * Se ERDDAP™ de repente tem problemas de processamento vezes String para um dado conjunto de dados e, portanto, apenas converte a maioria ou todos os tempos para NaN's (valores em falta) , o problema é quase sempre com a data string de formato de tempo que você especificou como as "unidades" da variável. O novo sistema às vezes precisa de uma string de formato dateTime ligeiramente diferente.
        * Se meses e dias numéricos no dateTime strings não são 0-acolchoados (Por exemplo, "3/7/2016") , certifique-se de que o formato apenas tem um único M e d (Por exemplo, "M/d/aaaaa", não "MM/dd/aaaaaaaaaaaaaaaa") .
        * Alterar qualquer especificação de segundos fracionários que use s's minúsculas (Por exemplo, o .ss em yyyy-MM-dd «T'H:mm:ss.sss) , em capital S... (Por exemplo, yyyy-MM-dd 'T'H:mm:ss.SSS) .
        *    ERDDAP™ não suporta mais data de texto Formatos de tempo com dois dígitos (yy) com um século implícito (Por exemplo, 1900 ou 2000) . As empresas gastaram biliões de dólares a resolver este problema no final dos anos 90. Os cientistas não devem usar dois anos. Por favor corrija o arquivo fonte (s) convertendo para 4 dígitos anos, em seguida, usar yyyy na data Formato do tempo.
        * Você pode usar yyyy ou YYY (que ERDDAP™ converte para uuuu) para analisar 4 anos de dígitos, incluindo anos negativos, por exemplo, -4712 (que é 4713 BC) . Graças à SeaDataNet, Thomas Gardner, e BODC.
        * Por favor, continue a usar Z dentro de um formato dateTime para obter ERDDAP para analisar um deslocamento de tempo (Por exemplo, Z, +0200, -08, -0800, -08:30) .
        *    **Assegure- se que utiliza Java Versão 1.8.0\\_21 ou superior.** 
        * Programadores - O quê? Se você escrever Java programas que executam ERDDAP™ código, você precisa remover a referência para joda-time. jar no parâmetro caminho da classe.
    * NOVO: ERDDAP 's [ArquivoA Ferramenta de conjunto de dados](/docs/server-admin/additional-information#archiveadataset) pode agora criar [ **Ficheiros BagIt** ](https://en.wikipedia.org/wiki/BagIt) . O NCEI pode padronizar neste formato. Graças a Scott Cross e John Relph.
    * MELHORADO: Os links para baixar o erddap. guerra à ERDDAP™ páginas da web agora apontam para **GitHub** . (Eles são links públicos, então você não precisa se juntar ao GitHub.) Isso significa downloads muito mais rápidos (até 12Mb/s versus 1Mb/s) e poucos problemas com downloads. Graças a Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney e ao Instituto Naval da Irlanda.
    * MELHORIA: **página status.html e o e-mail diário Status Report** agora inclui uma seção "Major LoadDatasets Time Series" que mostra estatísticas sobre ERDDAP™ a partir do final de cada grande cargaDatasets para os últimos 100 principais cargaDatasets. Graças ao nosso RAID problemático.
    * NOVO: um novo, opcional (mas recomendado) parâmetro para EDDTableDeCassandra datasets: [ ** &lt;partitionKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Graças à Ocean Networks Canadá.
    * NOVO: EDDTableFromAsciiFiles agora suporta ** &lt;Separador de colunas&gt; ** parâmetro. Se null ou "", a classe irá adivinhar, como antes, Caso contrário, o primeiro caractere será usado como separador de coluna ao ler os arquivos. Graças à Sky Bristol e à Abigail Benson.
    * Novo: o novo tipo de conjunto de dados, [ **Tabela EDDDeNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , pode fazer um conjunto de dados agregando [Arquivos NCCSV .csv](/docs/user/nccsv-1.00) . Graças ao Steve Hankin.
    * MELHORADO: **Tabela EDDDerddap** agora usa .nccsv para obter informações do remoto ERDDAP s e para o arquivo local dessa informação de metadados. Isso permite suporte completo para os tipos de dados de caracteres e longos, e para Unicode (UCS-2) Charset para chars e Strings. Graças ao Rob Fuller e ao Instituto Naval da Irlanda.
    * MELHORIA: EDDTabelaDeErddap e EDDGrid Suporte FromErddap now ** &lt;redirecionamento&gt;false&lt;/redirect&gt; ** que diz ERDDAP™ nunca redirecionar o pedido para o remoto ERDDAP . O padrão é verdadeiro. Isto é útil quando o comando ERDDAP™ é um privado ERDDAP . Graças a Damian Smyth, Rob Fuller e ao Instituto Naval da Irlanda.
    * MELHORADO: ERDDAP™ agora apanha **pedidos de usuário cancelados** Mais cedo. E... ERDDAP™ Agora desliga mais rápido porque os fios de baixo nível desligam mais rápido. Graças ao nosso RAID problemático.
    *    **Gerar conjuntos de dados Xml:** 
        * NOVO: O novo EDDType especial "ncdump" imprime um [ncdump](https://linux.die.net/man/1/ncdump) \\- like impressão do cabeçalho de um .nc Arquivo. Você também pode imprimir os valores de dados para variáveis especificadas (ou digite "nada" para não imprimir quaisquer valores de dados) . Isso é útil porque, sem ncdump, é difícil saber o que está em um arquivo e, portanto, qual EDDType você deve especificar para GenerateDatasetsXml. Graças a Craig Risien, Rich Signell, Christopher Wingard e OOI.
        * NOVO: Para SeaData Dados líquidos:
Quando apropriado, Gerar conjuntos de dados Xml agora faz uma conversão semântica específica usando uma consulta SPARQL remota: se os metadados de origem de uma variável incluem um sdn\\_parameter\\_urn, por exemplo, sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", GerateDatasets Xml adicionará o atributo P02 correspondente, por exemplo, sdn\\_P02\\_urn = "SDN:P02::PSAL". Se você tem conjuntos de dados que usam estes atributos, e se seu ERDDAP 's&lt; categoryAttributes &gt; no setup.xml inclui sdn\\_parameter\\_urn e sdn\\_P02\\_urn, os usuários poderão usar ERDDAP™ Sistema de busca de categorias para pesquisar conjuntos de dados com valores específicos desses atributos. Graças a BODC e Alexandra Kokkinaki.
        * MELHORADO: Gerar conjuntos de dados O Xml agora muda muitos http:// referências nos metadados para https:// Quando apropriado.
        * MELHORADO: Gerar conjuntos de dados Xml agora tenta adivinhar criador\\_type e editor\\_type.
        * MELHORADO: Dados da variávelTipos sugeridos pela GenerateDatasets Xml será agora um pouco melhor. Graças a Margaret O'Brien, LTER e EML.
        * MELHORADO: Gerar conjuntos de dados Xml é melhor em especificar o&lt;cdm\\_data\\_type&gt;, e adicionando os atributos relacionados, necessários (por exemplo,&lt;cdm\\_timeseries\\_variables&gt;), para que você possa fornecer essa informação. Graças ao Rich Signell.
        * MELHORADO: Na geração de conjuntos de dados Xml, para os conjuntos de dados EDDTable, a sugestão de&lt; subsetVariables &gt; é agora muito mais conservador. Graças ao John Kerfoot.
        * MELHORADO: datasets.xml para um conjunto de dados especificado featureType mas não cdm\\_data\\_type, o featureType será usado como cdm\\_data\\_type. Graças ao Rich Signell.
        * BUG FIX: gerar Conjuntos de dados Xml agora sugere o correto&lt;dataType&gt; para variáveis de dados que têm scale\\_factor , add\\_offset e/ou \\_Atributos não assinados.
    * MELHORADO: Quando ERDDAP™ abre a .nc arquivo que é **menor** do que deveria ser (Por exemplo, não foi completamente copiado no lugar) , ERDDAP™ Agora trata o arquivo como ruim. Anteriormente, ERDDAP™ retornam valores em falta para qualquer parte faltando do arquivo porque esse é o comportamento padrão para netcdf-java. ERDDAP™ agora usa ucar .nc 2.iosp.netcdf3.N3header.disallowFileTruncation = true; Graças ao nosso problemático RAID e Christian Ward-Garrison.
    * MELHORADO: o escritor ISO 19115 agora faz uso de **criador\\_tipo** , se presente.
    * MELHORADO: ERDDAP™ agora utiliza o mais recente netcdf-java v4.6.9 que pode ler **arquivos netcdf-4** . Graças a Craig Risien, Rich Signell, Christopher Wingard e OOI.
    * BUG FIX: evite problemas se diferentes arquivos fonte têm diferentes tipos de dados para uma determinada variável. Graças a Roy Mendelssohn e Eugene Burger.
    * BUG FIX: **Conversões de formato de tempo** são agora melhor protegidos contra os valores de tempo ruim. Graças ao NDBC.
    * BUG FIX: EDDGrid FromNcFiles Desembalado agora lida com valores de tempo com **"meses desde ..." e "anos desde ..."** corretamente (por incremento do mês ou ano, não por adição grosseira, por exemplo, de 30 dias repetidamente) . Graças ao Soda3.3.1.
    * Apenas em v1.74, **subscrições** necessária uma acção (Por exemplo, http:// ...) , que foi e deve ser opcional.
    * BUG FIX: EDDGrid FromMergeIRFiles.lowGetSourceMetadata () não adicionou quaisquer atributos globais. Agora sim.
         

## Versão 1.74{#version-174} 
 (lançado 2016-10-07) 

*    **Novas funcionalidades (para usuários) :**   
     
    * Agora, quando uma lista de conjuntos de dados (Tudo, ou de uma pesquisa) é exibido em uma página web, títulos longos são exibidos em várias linhas. Anteriormente, o meio de um longo título foi substituído por " ... ". Graças a Margaret O'Brien, LTER e EML.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   
     
    * A FAZER: Nos computadores Linux, altere as configurações de tempo limite Apache para que as solicitações de usuário que consomem tempo não diminua (com o que muitas vezes aparece como um erro "Proxy" ou "Bad Gateway") . Como usuário root:
        
        1. Modificar o Apache http ficheiro d.conf (normalmente em /etc/ http d/conf/) :
Mudar o existente&lt;Tempo- limite&gt; (ou adicionar um no fim do ficheiro) até 3600 (segundos) , em vez do padrão 60 ou 120 segundos.
Mudar o existente&lt;ProxyTimeout&gt; configuração (ou adicionar um no fim do ficheiro) até 3600 (segundos) , em vez do padrão 60 ou 120 segundos.
        2. Reiniciar o Apache: /usr/sbin/apachectl -k gracioso (mas às vezes está em um diretório diferente) .
        
Graças ao Thomas Oliver.
         
    * NOVO: \\[ bigParentDirectory/hard Pasta da bandeira
Isso funciona como o diretório flag, mas a versão hardFlag também exclui todas as informações do conjunto de dados em cache. Não existem URLs para definir um HardFlag. Isto só pode ser usado colocando um arquivo nesse diretório.
difícil Bandeiras são muito úteis quando você faz algo que causa uma mudança em como ERDDAP™ lê e interpreta os dados de origem, por exemplo, quando instala uma nova versão do ERDDAP™ ou quando você tiver feito certos tipos de alterações na definição de um conjunto de dados em datasets.xml . Ver [esta documentação](/docs/server-admin/additional-information#hard-flag) . Graças ao John Kerfoot e a todos os grupos da Argo.
         
    * NOVO: Gerar conjuntos de dados Xml agora tem uma opção EDDTableFromEML
que lê uma descrição do conjunto de dados numa linguagem ecológica de metadados (EML) arquivo, baixa o arquivo de dados relacionado, e gera um pedaço de datasets.xml para que o conjunto de dados possa ser adicionado ERDDAP . Há também um EDDTableFromEMLBatch que faz a mesma coisa para todos os arquivos EML em um diretório. Isso funciona muito bem porque EML faz um excelente trabalho de descrever o conjunto de dados e porque KNB e LTER tornam os arquivos de dados reais disponíveis.
EML mais ERDDAP™ pode ser uma grande combinação, desde ERDDAP™ poderia dar aos usuários mais acesso direto à riqueza de dados KNB e LTER e ajudar esses projetos a atender o governo dos EUA [Acesso do público aos resultados da pesquisa (PARR) requisitos](https://nosc.noaa.gov/EDMC/PD.DSP.php) disponibilizando os dados através de um serviço web.
Ver [esta documentação](/docs/server-admin/EDDTableFromEML) . Graças a Margaret O'Brien, LTER e EML.
         
    * NOVO: Gerar conjuntos de dados Xml agora tem uma opção EDDTableFromInPort
que lê uma descrição de conjunto de dados em um arquivo XML InPort e tenta gerar um bloco de datasets.xml para que o conjunto de dados possa ser adicionado ERDDAP . Isto raramente cria um bloco pronto a usar de XML para datasets.xml , mas vai criar um bom rascunho que é um bom ponto de partida para edição por um ser humano.
Seria ótimo se as pessoas que usam o InPort para documentar seus conjuntos de dados também usassem ERDDAP™ para disponibilizar os dados reais via ERDDAP os serviços web e, assim, atender o governo dos EUA e NOAA 's [Acesso do público aos resultados da pesquisa (PARR) requisitos](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) disponibilizando os dados através de um serviço web. Esta é uma solução que poderia ser usada neste momento. ( erd.data at noaa.gov Fico feliz em ajudar.)   
Ver [esta documentação](/docs/server-admin/datasets#eddtablefrominport) . Graças ao Evan Howell e à Melanie Abecassis.
         
    * MELHORADO: ERDDAP™ agora utiliza netcdf-java 4.6.
Com versões anteriores, netcdf-java lê alguns valores de preenchimento (talvez, apenas em arquivos netcdf-4) como 0. Agora ele lê alguns deles como o netcdf valor de preenchimento padrão: -127 para bytes, -32767 para shorts, -2147483647 para ints. Unidata diz que o novo comportamento é o comportamento adequado. Se uma variável em um conjunto de dados começar a mostrar um desses valores onde eles costumavam mostrar 0's, você pode adicionar, por exemplo,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
para a variável addAttributes para dizer ERDDAP™ para tratar esse valor como um missing\\_value /\\_Fill Valor. No entanto, em muitos casos, isso não vai dar o resultado desejado: 0's. Se assim for, considere modificar os arquivos com NCO ou reescrever os arquivos. Queixas? Por favor contacte Unidata ;-)
         
    * A FAZER: Nova TopografiaPaleta Depth
Encorajo-o a mudar todos os conjuntos de dados que usam a paleta OceanDepth para usar a nova paleta TopographyDepth, que é como a Topografia exceto com as cores viradas, de modo que seja adequado para valores de profundidade (positivo=down) , em vez de valores de altitude (positivo=up) . As configurações recomendadas para esta paleta são:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NOVA CARACTERÍSTICA String missing\\_value e/ou \\_FillValue
Se uma variável String define uma missing\\_value e/ou \\_FillValue, ERDDAP™ irá agora remover esses valores dos dados e substituí-los por uma string vazia, para que os valores em falta apareçam como strings vazias, como com outros conjuntos de dados em ERDDAP . Graças a Margaret O'Brien, LTER e EML.
         
    * NOVA CARACTERÍSTICA Suporte aos Tempos Locais
variáveis timestamp com dados de origem de Strings agora pode especificar um fuso horário através de um " time\\_zone " atributo que leva ERDDAP™ para converter os tempos de origem da zona local (alguns em tempo padrão, alguns em horário de verão) em Zulu Tempos. A lista de nomes de fusos horários válidos é provavelmente idêntica à lista na coluna TZ em [esta tabela](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . O padrão é " Zulu ". Os fusos horários comuns dos EUA são: EUA/Hawaii, EUA/Alaska, EUA/Pacífico, EUA/Montanha, EUA/Arizona, EUA/Centro, EUA/Eastern. Para variáveis de timestamp com dados numéricos, você pode especificar o " time\\_zone " atributo, mas o valor deve ser " Zulu " ou "UTC". Graças a Margaret O'Brien, LTER e EML.
         
    * NOVA CARACTERÍSTICA: EDDTableFromAsciiFiles agora suporta arquivos separados por pontos e vírgulas
e é mais inteligente sobre descobrir o separador. Graças a Margaret O'Brien, LTER e EML.
         
    * NOVA CARACTERÍSTICA Se houver um erro significativo no loadDatasets (maior ou menor, por exemplo, um desaparecimento ou inválido datasets.xml documento) , ERDDAP™ irá agora indicá-lo em status.html, logo abaixo de "n Datasets Falhou Carregar" como ERROR: enquanto processa datasets.xml : ver log.txt para mais detalhes.
         
    * NOVA CARACTERÍSTICA ERDDAP™ procura órfãos.
Quando ERDDAP™ faz uma grande carga Datasets, agora procura por conjuntos de dados órfãos (conjuntos de dados em ERDDAP™ mas não dentro datasets.xml ) . Se forem encontrados, estão listados no status.html, logo abaixo "n Datasets Falhou Carregar" como ERRO: n Orphan Datasets (conjuntos de dados em ERDDAP™ mas não dentro datasets.xml ) = ....
Se quiser remover (descarregar) Um órfão de ERDDAP™ , você precisa adicionar
        &lt;dataset type="_anyValidType_" datasetID ="_theDatasetID_" active="false" /&gt;
para datasets.xml até que o conjunto de dados seja descarregado durante a próxima carga principalDatasets.
         
    * BUG FIX: Se um conjunto de dados tivesse uma variável numérica timestamp com unidades diferentes "seconds since 1970-01-01T00:00:00Z" e com&lt;updateEveryNMillis&gt; sistema ativo, o intervalo da variável timestamp foi ajustado incorretamente quando o conjunto de dados foi atualizado. Graças ao John Kerfoot.
         
    * BUG FIX: Se&lt;quickRestart&gt; foi true em setup.xml e você solicitou dados de um EDDTableFrom... Conjunto de dados de arquivos que usaram&lt;updateEveryNMillis&gt;, a primeira solicitação ao conjunto de dados falharia, mas as solicitações subsequentes teriam sucesso. Agora o primeiro pedido não vai falhar. Graças ao John Kerfoot.
         
    * BUG FIX: Os GenerateDatasetsXml.sh e .bat não funcionaram com &gt;9 parâmetros na linha de comando. Agora sabem. Graças ao John Kerfoot.
         
    * BUG FIX: O novo EDDTableFromMultidimNcFiles não removeu de forma consistente os espaços finais das strings. Agora sim. Notavelmente, isso afetou arquivos ARGO. Graças ao Kevin O'Brien e ao Roland Schweitzer.
         
    * BUG FIX: Todos os acessos do remoto DAP Os serviços são agora iniciados por um código mais moderno. Isso corrige o erro de "conexão fechada" ao acessar alguns conjuntos de dados EDDTableFromErddap. Graças ao Kevin O'Brien.
         
    * BUG FIX: O tratamento de orderBy ... () e distinto () estão agora de volta à forma como estavam antes das mudanças recentes: um dado pedido pode ter múltiplos orderBy ... () e/ou uma distinção () filtro; ERDDAP™ manuseá-los-á na ordem em que forem especificados. Graças ao David Karuga.
         
    * BUG FIX: Se o conjunto de dados for EDDTableFromDatabase e uma consulta tiver [sourceCanOrderPor](/docs/server-admin/datasets#sourcecanorderby) e/ou [FonteCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) , em seguida, a base de dados pode (dependendo das configurações em datasets.xml ) pega parcial ou total **apenas o primeiro**   orderBy .. () ou distinta () . Graças ao David Karuga.
         
    * BUG FIX: A codificação extra- percentual recente causou problemas com algumas consultas para .nc Ficheiros CF, por exemplo, "HTTP Status 500 - Erro de consulta: variável=estação está listado duas vezes na lista de variáveis de resultados." Graças ao Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles teve problemas para recarregar um conjunto de dados quando uma das colunas era uma verdadeira coluna de caracteres. Graças ao Roland Schweitzer.
         
    * BUG FIX: EDDGrid FromNcFiles Desembalado agora também converte missing\\_value e \\_FillValue para valores padrão para que arquivos com valores diferentes possam ser agregados. Por causa desta alteração, depois de instalar esta nova versão do ERDDAP™ , por favor definir um [difícil Bandeira](/docs/server-admin/additional-information#hard-flag) para cada EDDGrid FromNcFiles Conjunto de dados não embalados ERDDAP .
         
    * MELHORADO: EDDTableFromNcCFFiles agora pode lidar com arquivos que têm vários exemplos\\_dimension. Um dado conjunto de dados deve usar apenas variáveis que utilizem uma das dimensões de amostra\\_. Graças a Ajay Krishnan.
         
    * MELHORADO: Para EDDTableDe...Ficheiros,&lt;sortFilesBySourceNames&gt; agora permite vírgula- separada (recomendado) ou listas separadas por espaços de nomes de origem variáveis. Em ambos os casos, os nomes de variáveis individuais podem ser cercados por aspas duplas, por exemplo, se o nome tiver um espaço interno.

## Versão 1.72{#version-172} 
 (lançado 2016-05-12) 

*    **Novas funcionalidades (para usuários) :** Nenhuma.
     
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * NOVA TABELA DE EDDDeMultidimNcFiles [Tabela EDDDeMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles) é uma nova alternativa para EDDTableFromNcFiles. É projetado para lidar com grupos de arquivos com várias variáveis com dimensões compartilhadas, por exemplo, var1 \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] , escalarVar. Graças ao Projeto Argo, Aurélie Briand e Roland Schweitzer.
    * BUG FIX: ERDDAP™   (através das classes FileVisitorDNLS e FileVistorSubdir) agora segue links simbólicos no Linux. ERDDAP™ Ainda não segue. O lnk está no Windows.
    * BUG FIX de bug introduzido em 1,70: distinto + orderBy não foram permitidos juntos em um pedido. Agora estão outra vez. Não são mutuamente exclusivos/redundantes. Graças ao David Karuga.
    * MUDANÇA PARA datasets.xml lista negra de endereços IP:
Os endereços IP v4 aparecem ERDDAP™ 4 números de hex separados por períodos.
Acho que os endereços IP v6 aparecem como 8 números de hex separados por dois pontos.
Então... ERDDAP™ agora suporta colons nos endereços IP nessa lista e :\\* no final da lista para bloquear uma gama de endereços.
    * MELHORADO: ERDDAP™ agora usa NetcdfFileWriter para escrever .nc arquivos em vez do NetcdfFile desactualizadoWriteable. Não deve haver nenhuma alteração discernível para os arquivos resultantes. Isto abre a possibilidade de fazer grandes .nc arquivos que usam o .nc 3 extensões 64bit. Se você quiser/necessita disso, envie um pedido para erd.data at noaa.gov .
    * MELHORADO: Muitos dos links para sites remotos estavam desatualizados. Agora eles estão atualizados e usar https: em vez de http : sempre que possível.
    * Muitas pequenas mudanças.

## Versão 1.70{#version-170} 
 (lançado 2016-04-15) 

*    **Novas funcionalidades (para usuários) :** Nenhuma.
     
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** Abaixo, existem várias alterações recomendadas na documentação em seu arquivo setup.xml.
Por favor, faça essas mudanças agora.
30 minutos de trabalho agora pode poupar horas de confusão no futuro.
    * Correcção de erros: O problema era que os pedidos que foram redirecionados para um remoto ERDDAP falhou com um caracter inválido ' | ' mensagem de erro. Isso só ocorreu com versões recentes de Tomcat. Graças a Rusty Holleman, Conor Delaney e Roy Mendelssohn.
    * Correcção de erros: ERDDAP™ agora usa uma versão atualizada do netcdf-java (É uma longa história.) que inclui suporte atualizado para NcML, que corrige o problema com NcML LogicalReduce não funcionando como esperado. Pode haver algumas pequenas alterações nos metadados que ERDDAP™ lê-se via netcdf-java de .nc , .hdf , arquivos .grib e .bufr. Graças a Favio Medrano.
    * A nova [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) permite que você faça um conjunto de dados EDDTable fundido de dois ou mais conjuntos de dados EDDTable que têm as mesmas variáveis de dados usando as mesmas unidades. Graças ao Kevin O'Brien.
    * Novas opções para o EDDTableFromDatabase ( [sourceCanOrderPor](/docs/server-admin/datasets#sourcecanorderby) e [FonteCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) deixe- o especificar se ERDDAP™ , a base de dados, ou ambos, manusear distinta e orderBy   (e todas as variantes) restrições. Graças ao David Karuga.
    * Agora você pode disponibilizar gráficos e metadados de um conjunto de dados privado ao público através do novo [&lt;grafos AcessíveisPara&gt;público&lt;/graphsAcessívelPara&gt;] (/docs/server-admin/datasets#graphsaccessableto) Tag. Graças a Emanuele Lombardi.
    * Agora, se uma string passou para GerarDatasets Xml ou DasDds é cercado por aspas duplas, é unquoted (como se fosse uma string JSON) . Graças ao John Kerfoot e à Melanie Abecassis.
    * Gerar conjuntos de dados Xml agora suporta "padrão" para obter o padrão e "nada" para obter uma string vazia (trabalham com ou sem citações) . Isto resolve alguns problemas relacionados à passagem de strings vazias.
    * Agora, em Gerar dados Xml, para todos EDDGrid Arquivos e tabela EDD Conjuntos de dados FromFiles, se a amostra O nome do ficheiro que especifica é "" (o texto vazio) , ele irá usar o último nome de arquivo correspondente do diretório + regex + recursive=true.
    * Actualizado: O código displayInBrowser que é usado para exibir os resultados do GenerateDatasetsXml e DasDds em computadores Linux estava desatualizado e deu uma mensagem estranha sobre o Netscape. Isso usa uma ferramenta Linux moderna: xdg-open. Graças à Melanie Abecassis.
    * A allDatasets dataset agora tem um "files" coluna, que indica o URL base do link /files (se existe um) para o conjunto de dados.
    * Aumentar a segurança geral do seu ERDDAP™ alterando as permissões associadas com o diretório tomcat e o diretório bigPaint:
         (Os comandos reais abaixo são para Linux. Para outros OS, faça alterações análogas.) 
        * Altere o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores do Tomcat/ ERDDAP , por exemplo,
chgrp - R _ yourUserName_ apache-tomcat-_8.023_
chgrp - R _ your Nome do usuário BigParentDirectory_
        * Alterar permissões para que o tomcat e o grupo tenham lido, escrito, executado privilégios, por exemplo.
chmod - R ug+rwx apache-tomcat-_8.023_
chmod - R ug+rwx _ bigPaintDirectório_
        * Remover as permissões de "outro" usuário para ler, escrever ou executar:
chmod -R o-rwx apache-tomcat-_8.023_
chmod - R o- rwx _ bigPaintDirectory_
Isto é importante, porque impede outros usuários de ler informações possivelmente sensíveis em ERDDAP™ configurar arquivos, arquivos de log e arquivos com informações sobre conjuntos de dados privados.
    * O sistema de autenticação/login foi renovado. Graças a Thomas Gardner, Emanuele Lombardi, e ao novo governo dos EUA [Padrão HTTPS- Only](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * A opção autenticação=openid foi removida. Estava desatualizado.
        * O novo, recomendado, [autenticação=google](/docs/server-admin/additional-information#google) usos da opção Entrar no Google (baseado em OAuth 2.0) para permitir que qualquer pessoa com uma conta de email Google (incluindo Contas gerenciadas pelo Google como @noaa.gov ) para entrar.
        * O novo, [autenticação=email](/docs/server-admin/additional-information#email) opção é um back up para autenticação=google. Permite aos utilizadores&lt;user&gt; tag in datasets.xml Fazer login enviando-lhes um email com um link especial.
        * Em seu setup.xml, altere a descrição para&lt;autenticação&gt; a ser
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Em seu setup.xml, por favor adicione isso bem abaixo do&lt;autenticação&gt; tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Agora, usuários que não estão logados podem usar http ou https URLs (se tiver configurado&lt;baseHttpsUrl&gt; em seu setup.xml). Graças ao novo governo dos EUA [Padrão HTTPS- Only](https://https.cio.gov/) .
        * Agora, você pode incentivar todos os usuários a usar https   (não http ) por definição&lt;baseUrl&gt; para ser um https URL. Para forçar os usuários a usar apenas https , você também deve fazer alterações na sua configuração Apache / Tomcat para bloquear não- https acesso. Graças ao novo governo dos EUA [Padrão HTTPS- Only](https://https.cio.gov/) .
            
Em seu setup.xml, altere a descrição para&lt;baseUrl&gt; a ser
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * As opções&lt;senhaEncoding&gt; mudou. Em seu setup.xml, altere a descrição para&lt;senhaEncoding&gt; para ser
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Em seu setup.xml, altere a descrição para&lt;baseHttpsUrl&gt;
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Agora, se listPrivateDatasets=true in setup.xml, ainda menos informações serão mostradas sobre conjuntos de dados que um usuário não tem acesso.
    * Agora, especialmente para quando você está montando inicialmente seu ERDDAP Agora podes dizer ERDDAP™ não tentar subscrever o remoto ERDDAP™ conjuntos de dados. Graças a Filipe Rocha Freire.
Em seu setup.xml, logo antes&lt;fonteFamília&gt;, por favor adicione
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Em seu setup.xml, nas instruções acima&lt;e-mailDeEndereço&gt;, por favor insira:
Se possível, configure isto para usar uma conexão segura (SSL / TLS) ao servidor de e- mail.
Se sua configuração não estiver usando uma conexão segura para o servidor de e-mail, por favor, faça as alterações para fazê-lo.
    * Na sua datasets.xml , por favor, adicione esta linha à descrição de&lt;subscriçãoEmailBlacklist&gt; na sua datasets.xml :
Você pode usar o nome "\\*" para listar um domínio inteiro, por exemplo,\\*@example.com .
    * Desde a mudança para o sistema de registro em v1.66, o arquivo de registro nunca está atualizado. Existem sempre mensagens ou partes de mensagens à espera de serem escritas no ficheiro de registo. Agora, você pode torná-lo atualizado (por um instante) por visualizar o seu ERDDAP Página Web de estado em http://_your.domain.org_/erddap/status.html .
    * HashDigest......
    * Uma pequena mudança (para String2. canônico) que deve ajudar a manter as coisas em movimento rapidamente quando ERDDAP™ é muito ocupado e também melhor lidar com um número muito grande de conjuntos de dados.
    * Fortemente Recomendado: parar de usar&lt;convertToPublicSourceUrl&gt; em datasets.xml para converter um número IP em um conjunto de dados&lt; sourceUrl &gt; (Por exemplo, http://192.168.#.#/ ) em um nome de domínio (Por exemplo, http :my.domain.org/) . A partir de agora, novas assinaturas para http://localhost , http://127.0.0.1 , e http://192.168.#.# URLS não serão permitidos por razões de segurança. Por favor, use sempre o nome de domínio público no&lt; sourceUrl &gt; tag (se necessário devido a problemas de DNS) , você pode usar o [/etc/hosts tabela no seu servidor](https://linux.die.net/man/5/hosts) para resolver o problema, convertendo nomes de domínio locais em números IP sem usar um servidor DNS. Você pode testar se um dado nome de domínio é resolvido corretamente usando
ping _algum. domínio. nome_
    * Em gerarDatasets.xml, para conjuntos de dados remotos (Por exemplo, de um servidor ThREDS) , o gerado automaticamente datasetID s estão inalterados para a maioria dos domínios. Para alguns domínios, a primeira parte (ou seja, o nome) do gerado automaticamente datasetID Será um pouco diferente. Notavelmente, os nomes que tinham uma parte agora são mais propensos a ter duas partes. Por exemplo, conjuntos de dados de http://oos.soest.hawaii.edu anteriormente levado a datasetID s que começou com hawaii\\_, mas agora levar a datasetID que começam com hawaii\\_soest\\_ . Se isso causar problemas para você, por favor me envie um e-mail. Pode haver uma solução.
    * O driver Cassandra foi atualizado para cassandra-driver-core-3.0.0.jar e, portanto, para Cassandra v3. EDDTableFromCassandra não tira proveito de quaisquer novos recursos em Cassandra v3. Os índices em Cassandra podem agora ser mais complexos, mas ERDDAP™ ainda utiliza o modelo de índice de Cassandra v2, que assume que uma coluna indexada pode ser consultada diretamente com '=' restrições. Gerar conjuntos de dados Xml para EDDTableFromCassandra não detecta mais colunas com índices; se um índice é simples, você precisa especificá- lo em datasets.xml à mão. Se precisar de suporte para índices mais complexos ou outras funcionalidades novas, envie um e-mail erd.data at noaa.gov .
&#33;&#33;&#33; Se ainda utilizar Cassandra 2.x, continue a utilizar ERDDAP™ v1.68 até você atualizar para usar Cassandra 3.x.
    * Jars and the Classpath -- Quase todos os arquivos .jar de terceiros incluídos foram atualizados para suas versões mais recentes.
        * slf4j.jar foi adicionado ao /lib e ao classpath.
        * Joid. Jar e Tsik. os frascos foram retirados do /lib e do classpath.
        * Se receber mensagens de erro sobre as classes não encontradas quando compila ou executa ERDDAP™ ou uma das suas ferramentas, compare o classpath da sua linha de comandos com ERDDAP 's [classpath atual](/docs/contributing/programmer-guide#development-environment) para descobrir quais .jars estão faltando do seu colega.

## Versão 1.68{#version-168} 
 (lançado em 2016-02-08) 

*    **Novas funcionalidades (para usuários) :** Nenhuma.
     
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    *    [ EDDGrid Agregação de arquivos por nomes de arquivos ou metadados globais](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) - O quê?
Todas as variações de EDDGrid FromFiles pode agora agregar um grupo de arquivos adicionando uma nova dimensão à esquerda, geralmente tempo, com base em um valor derivado de cada nome de arquivo ou do valor de um atributo global que está em cada arquivo.
    * MELHORADO: Sugerimos anteriormente que você gostaria de criar um EDDGrid FromErddap dataset in your datasets.xml que referenciaram e reservaram o jplMU RSS Conjunto de dados T no nosso ERDDAP . Como agora existe uma versão mais recente desse conjunto de dados, esse conjunto de dados está agora desactualizado. Então, se você tem esse conjunto de dados em seu ERDDAP™ , por favor adicione este novo conjunto de dados
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Se quiser remover o jplMU antigo RSS Conjunto de dados T do seu ERDDAP™   (A escolha é tua.) , mudar sua configuração ativa de "verdadeiro" para "falso".
    * Correcção de erros: Por favor, verifique o diretório BigParent que você especificou em seu setup.xml. Se você não colocar um corte no final do&lt;bigPaintDirectory&gt; nome, então ERDDAP™ terá criado vários diretórios adicionando palavras diretamente ao nome que você especificou, em vez de criar subdiretórios. A começar pela versão 1.68, ERDDAP™ adiciona uma barra ao fim do nome do diretório se você não especificou um. Então se você não especificou uma barra no final, então quando você instalar ERDDAP™ v1.68 você precisa mover e renomear esses diretórios **após** você desliga o antigo ERDDAP™ e **antes** inicia o novo ERDDAP . Por exemplo, se você erroneamente especificou bigPaintDirectory como /home/erddapBPD (nenhuma barra de rastreamento) e ERDDAP™ criou erroneamente diretórios como
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDluceno
e um ficheiro chamado /home/erddapBPDsubscriptionsV1.txt,
então você precisa mover e renomeá-los para ser
/home/erddapBPD/cache
/home/erddapBPD/cópia
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/luceno
e /home/erddapBPD/assinaturasV1.txt
    * Correcção de erros: Havia erros dentro EDDGrid LonPM180 em ERDDAP™ v1.66 que ocorreu quando o conjunto de dados da criança é um EDDGrid De Erddap.
    * Correcção de erros: Havia um bug dentro EDDGrid Arquivos e tabela EDD FromFiles in ERDDAP™ v1.66 que causou&lt;updateEveryNMillis&gt; a ser ignorado na primeira vez que o conjunto de dados foi carregado após um reinício.
    * Correcção/Nova Característica: Se um conjunto de dados para crianças estiver dentro EDDGrid AgregateExistingDimension, EDDGrid Entendido. EDDGrid A partir da tabelaEDD, EDDGrid LonPM180, EDDGrid Sidebyside, EDDTableCopy, ou EDDTableFrom EDDGrid é um ...DeErddap dataset, que dataset pai agora se inscreve ao subjacente ERDDAP™ Conjunto de dados. Se o subjacente ERDDAP™ o conjunto de dados está no mesmo ERDDAP™ , a assinatura e sua validação são feitas diretamente; você não receberá um email pedindo que você valide a assinatura. Caso contrário, se o sistema de subscrição para o seu ERDDAP™ é desligado, definir o&lt;reloadEveryNMinutes&gt; configuração para o conjunto de dados pai para um número pequeno (60?) para que fique actualizado.
    * Correcção/Nova Característica: Se um conjunto de dados para crianças estiver dentro EDDGrid AgregateExistingDimension, EDDGrid Entendido. EDDGrid A partir da tabelaEDD, EDDGrid LonPM180, EDDGrid Sidebyside, EDDTableCopy, ou EDDTableFrom EDDGrid tem ativo="false", que o conjunto de dados da criança é agora ignorado.

## Versão 1.66{#version-166} 
 (lançado em 2016-01-19) 

*    **Novas funcionalidades (para usuários) :** 
    * Gráficos (não mapas) pode agora ter valores descendentes nos eixos. Para obter isto ao usar uma página web do Make A Graph, altere o novo Y Axis: configuração ascendente (o padrão) para descer. Ou, em um URL que solicita um gráfico, use o novo opcional 3o ' | « Parâmetro da [&.x Intervalo e/ou &. Interruptores yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , que não pode ser nada (o padrão) , true, ou t para obter valores ascendentes, ou usar false ou f para obter valores descendentes. O verdadeiro | os valores falsos são insensíveis. Graças a Chris Fullilove, John Kerfoot, Luke Campbell e Cara Wilson.
    * Os usuários agora podem especificar a cor de fundo dos gráficos adicionando uma &.bgColor=0x_ AARRGGBB_ mude para o URL que solicita o gráfico. Veja .bgColor na seção de Comandos Gráficos da [gradedap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) e [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) documentação. Graças ao John Kerfoot e ao Luke Campbell.
    * Para conjuntos de dados tabulares, as restrições podem agora se referir a min (_AlgunsVariáveisName_) ou max (_AlgunsVariáveisName_) . Ver [min () e máximo () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Graças ao John Kerfoot.
    * Para conjuntos de dados tabulares, restrições de tempo que usam [agora](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) agora pode especificar unidades de tempo de milissegundos ou milis.
    * Um pedido para uma imagem de um conjunto de dados tabular agora faz um mapa (não é um gráfico) se as variáveis x e y são variáveis tipo longitude e tipo latitude (unidades compatíveis) . Graças ao Rich Signell.
    * Correcção de erros: etiquetas e tiques do eixo do tempo às vezes tiveram irregularidades estranhas ao solicitar múltiplos gráficos simultaneamente (Por exemplo, numa página web) . O problema era um erro na biblioteca gráfica do SGT que ERDDAP™ utilizações (uma variável foi "estática" que não deveria ter sido) . Graças ao Bradford Butman.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * É um risco de segurança colocar sua senha de email em um arquivo de texto simples como setup.xml. Para mitigar esse problema, recomendamos fortemente que você:
        1. Configurar uma conta de e- mail apenas para ERDDAP É utilizado, por exemplo, erddap@ yourInstitution.org . Isto também tem outros benefícios; nomeadamente, mais de um ERDDAP™ administrador pode então ter acesso a essa conta de e-mail.
        2. Faça as permissões do arquivo setup.xml rw (ler+escrever) para o usuário que irá executar Tomcat e ERDDAP™   (user=tomcat?) e nenhuma permissão (não ler ou escrever) para o grupo e outros utilizadores. Graças a Filipe Rocha Freire.
    * A nova [ArquivoADataset](/docs/server-admin/additional-information#archiveadataset) ferramenta simplifica fazendo um .tar  .gz arquivo com um subconjunto de um conjunto de dados em um formato adequado para arquivo (nomeadamente, em NOAA É NCEI) . Isto deve ser útil para muitos ERDDAP™ administradores em muitas situações, mas especialmente para grupos dentro NOAA .
    * O novo tipo de conjunto de dados [ EDDGrid FromNcFilesDesembalado](/docs/server-admin/datasets#eddgridfromncfilesunpacked) é uma variante de EDDGrid DeNcFiles. A diferença é que esta classe descompacta cada arquivo de dados antes EDDGrid FromFiles olha para os arquivos:
        
        * Descompacta variáveis que usam scale\\_factor e/ou add\\_offset .
        * Promove variáveis inteiras que têm \\_Desassinado=atributos verdadeiros para um tipo de dados inteiro maior para que os valores apareçam como valores não assinados. Por exemplo, um byte \\_ Unsigned=true (8 bits) variável torna-se um curto assinado (16 bits) variável.
        * Ele converte \\_FillValue e missing\\_value valores a serem de NaN (ou MAX\\_ValUE para tipos de dados inteiros) .
        
A grande vantagem desta classe é que ela fornece uma maneira de lidar com diferentes valores de scale\\_factor , add\\_offset , \\_FillValue, ou missing\\_value em arquivos diferentes em uma coleção. Caso contrário, você teria que usar uma ferramenta como [NcML](/docs/server-admin/datasets#ncml-files) ou [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) para modificar cada arquivo para remover as diferenças para que os arquivos possam ser tratados por EDDGrid DeNcFiles. Para que esta classe funcione corretamente, os arquivos devem seguir os padrões CF para os atributos relacionados. Graças a Philippe Makowski.
    * O novo tipo de conjunto de dados [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) permite- lhe alterar conjuntos de dados que têm alguns valores de longitude superiores a 180 (Por exemplo, o intervalo 0 a 360) em conjuntos de dados com valores de longitude dentro do intervalo -180 a 180 (Longitude Plus ou Menos 180, daí o nome) . A grande vantagem de oferecer conjuntos de dados com valores de longitude na faixa -180 a 180 é que OGC serviços (Por exemplo, WMS ) exigir valores de longitude nesta gama. Graças a Lynne Tablewski, Fabien Guichard, Philippe Makowski e Martin Spel.
2016-01-26 Actualização: Eeek&#33; Isto tem um erro que ocorre quando o conjunto de dados filho é um EDDGrid FromErddap que referencia um conjunto de dados no mesmo ERDDAP . Este erro está corrigido ERDDAP™ v1.68.
    * In [GerarDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) , um novo tipo de conjunto de dados especial, EDDGrid LonPM180DeErddapCatalog, permite gerar o datasets.xml em vez EDDGrid Conjuntos de dados LonPM180 de todos os EDDGrid conjuntos de dados ERDDAP que tenham quaisquer valores de longitude superiores a 180.
    * Para todos EDDGrid conjuntos de dados, em datasets.xml você agora pode usar o opcional
[&lt;acessível Via WMS &gt; verdade | falso&lt;/acessível Via WMS &gt;] (/docs/server-admin/datasets#acessibleviawms)   (padrão=verdadeiro) . Configurando isto para falso desactiva o WMS serviço para este conjunto de dados. Se for verdadeiro, o conjunto de dados pode ainda não estar acessível via WMS por outros motivos (Por exemplo, sem eixo lat ou lon) . Isto é particularmente útil para conjuntos de dados que existem por conta própria e envolto por EDDGrid LonPM180, para que apenas a versão LonPM180 seja acessível via WMS .
    * Em setup.xml, você pode especificar uma cor padrão diferente para o fundo dos gráficos. A cor é especificada como um valor hexadecimal de 8 dígitos na forma 0x_AARRGGBB_, onde AA, RR, GG e BB são os componentes de opacidade, vermelho, verde e azul, respectivamente, especificados como números hexadecimais de 2 dígitos. Note que a tela é sempre branca opaca, então a (semi - Não.) a cor de fundo do gráfico transparente se mistura na tela branca. O padrão é azul claro:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Graças ao John Kerfoot e ao Luke Campbell.
    * Em setup.xml, agora você pode especificar o tamanho máximo para o [ficheiro de registo](/docs/server-admin/additional-information#log)   (quando for renomeado para log. txt. anterior e um novo log. txt é criado) , em MegaBytes. O mínimo permitido é 1. O máximo permitido é 2000. O padrão é 20 (MB) . Por exemplo:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * In datasets.xml , [&lt;fgdcFile&gt;] (/docs/server-admin/datasets# fgdcfile) quer [&lt;iso19115Ficheiro&gt;] (/docs/server-admin/datasets#iso19115file) agora pode ser um arquivo local (como antes) ou um URL (que será baixado para que haja uma cópia local) . Se ERDDAP™ é incapaz de baixar o arquivo, o carregamento do conjunto de dados continuará, mas o conjunto de dados não terá um arquivo fgdc ou iso19115.
    *    EDDGrid Arquivos e tabela EDD Os conjuntos de dados FromFiles agora podem fazer uma reinicialização rápida (o sistema que ERDDAP™ tenta usar quando os conjuntos de dados são carregados pela primeira vez quando ERDDAP™ é reiniciado) . Isto acelera o reinício ERDDAP .
2016-01-26 Actualização: Eeek&#33; Isto tem um erro que causa&lt;updateEveryNMillis&gt; a ser ignorado na primeira vez que o conjunto de dados é carregado após um reinício. Este erro está corrigido ERDDAP™ v1.68.
    * Uma melhoria geral no sistema quickRestart permite ERDDAP™ para carregar conjuntos de dados mais rápidos quando ERDDAP™ é reiniciado.
    * Tudo EDDGrid Arquivos e tabela EDD As subclasses FromFiles agora aceitam uma nova&lt;pathRegex&gt; tag, normalmente especificado logo abaixo&lt;recursivo&gt;. Se recursivo é "verdadeiro", apenas caminhos subdiretórios completos que correspondem ao caminhoRegex (padrão=".\\*") será aceite. Do mesmo modo, a&lt; sourceUrl s&gt; etiqueta numa EDDGrid AgregateExistingDimension pode agora incluir um atributo caminhoRegex (padrão=".\\*") .
    * O padrão para&lt;parcialRequestMaxBytes&gt; no setup.xml é agora 490000000 (~ 490 MB) . Isso evita alguns problemas/tempo limite relacionados à obtenção de dados de servidores de dados THREDS. Graças à Leslie Thorne.
    * Uma pequena alteração no sistema de registo deverá permitir ERDDAP™ Ser mais sensível quando está muito, muito ocupado. A informação é agora escrita para o arquivo de log na unidade de disco em pedaços bastante grandes. A vantagem é que isto é muito eficiente. ERDDAP™ nunca bloqueará esperar que as informações sejam gravadas no ficheiro de registo. A desvantagem é que o log quase sempre terminará com uma mensagem parcial, que não será concluída até que o próximo bloco seja escrito.
    * Correcção de bug relacionada com inotify e o [&lt;atualizaçãoEveryNMillis&gt;] (/docs/server-admin/datasets# update everynmillis) sistema para EDDGrid Arquivos e tabela EDD Conjuntos de dados dos Arquivos: Não é mais necessário especificar um grande número de fs.inotify.max\\_user\\_watches ou fs.inotify.max\\_user\\_instances. Há um erro Java que causa algumas partes de Java 's inotify/WatchDirectory system to be not lixo recolhido quando eles são finalizados; eventualmente, o número de zumbis inotify relógios ou instâncias excederia o número máximo especificado. ERDDAP™ Agora funciona em torno disto Java Insecto.
Além disso, o número de threads inotify está listado na página web status.html, para que você possa ficar de olho em seu uso. Tipicamente, há 1 linha inotify por EDDGrid Arquivos e tabela EDD Conjunto de dados dos Arquivos.
    * Correção de Bug: em muitos lugares, em vez de um erro ser retrown, um novo erro foi gerado que só incluiu uma versão curta da mensagem de erro original e sem o traço da pilha. Agora, quando um novo erro é gerado, ele inclui corretamente toda a exceção original por exemplo, lançar nova exceção ("algumas novas mensagens", e) ;
Graças à Susan Perkins.
    * Correcção de erros: até recentemente (V1,64?) , se um .../ datasetID O URL foi solicitado, ERDDAP™ adicionaria .html à URL. No v1.64, isto falhou (uma URL incorretamente formatada foi gerada e então falhou) . Agora isto funciona outra vez. Graças ao Chris Fullilove.

## Versão 1.64{#version-164} 
 (lançado 2015-08-19) 

*    **Novas funcionalidades (para usuários) :** 
    * Há agora orientação para acessar o privado protegido por senha ERDDAP™ conjuntos de dados ( https:// ) via curl e Python . Ver o [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) e [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) instruções.
Graças a Emilio Mayorga da NANOOS e Paul Janecek da Spyglass Technologies.
         
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    *    ERDDAP™ agora exige Java 1,8+.
         Java 1.7 atingiu a sua [fim da vida](https://www.oracle.com/technetwork/java/eol-135779.html)   (sem mais atualizações de segurança) em abril de 2015. Esta versão de ERDDAP™ não funcionará com versões de Java abaixo de 1.8. Se você atualizar de Java 1.7x (ou anterior) , você também deve atualizar Tomcat. Ver o [ ERDDAP™ Instruções de configuração](/docs/server-admin/deploy-install) para baixar links e conselhos.
    * Novo Formulário de Fornecedor de Dados.
Quando um provedor de dados vem a você na esperança de adicionar alguns dados ao seu ERDDAP™ , pode ser difícil e demorado para coletar todos os metadados necessários para adicionar o conjunto de dados em ERDDAP . Muitas fontes de dados (por exemplo, ficheiros .csv, Arquivos Excel, bancos de dados) não tem metadados internos, então ERDDAP™ tem um novo Formulário de Fornecedor de Dados que reúne metadados do provedor de dados e dá ao provedor de dados algumas outras orientações, incluindo orientações extensas para Data In Databases. As informações apresentadas são convertidas em datasets.xml formato e, em seguida, enviado para o ERDDAP™ administrador (você) e escrita (adicionado) para bigPaintDirectory/logs/dataProviderForm.log . Assim, o formulário semi-automatiza o processo de obter um conjunto de dados em ERDDAP™ , mas ERDDAP™ administrador ainda tem que completar o datasets.xml bloco e lidar com a obtenção do arquivo de dados (s) do fornecedor ou da ligação à base de dados. Para mais informações, consultar [Fornecedor de Dados Descrição do formulário](/docs/server-admin/datasets#data-provider-form) .
    * Novo&lt;matchAxisNDigits&gt;
pode ser utilizado por EDDGrid De Arquivos (e assim deNcFiles e deMergeIRFiles) , EDDGrid AgregateExistingDimension, EDDGrid Copiar, e EDDGrid Conjuntos de dados SideBySide para especificar quão precisamente iguais os valores do eixo em diferentes arquivos devem ser (quantos dígitos) : 0= sem verificação (Não uses isto&#33;) , 1-18 para aumentar a precisão, ou 20 (o padrão) pela igualdade exacta. Para n=1-18, ERDDAP™ garante que os primeiros n dígitos de valores duplos (ou (n+1) div 2 para valores flutuantes) são iguais.
        &lt;matchAxisNDigits&gt; substitui&lt;AsseguraAxisValuesAreEqual&gt;, que agora está desactualizado. Um valor de 'true' será convertido para matchAxisNDigits=20. Um valor de 'falso' (Não faças isso&#33;) será convertido para corresponder AxisNDigits=0.
    *    EDDGrid Arquivos e tabela EDD FromFiles irá carregar muito lentamente a primeira vez que você usar esta versão de ERDDAP .
         ERDDAP™ agora armazena a informação interna do arquivo um pouco diferente, então a tabela interna do arquivo para cada um desses conjuntos de dados tem que ser reconstruída. Não te preocupes. Não há nada de errado. É uma coisa única.
    * Ficheiros de Código Remoto
         EDDGrid FromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles agora permitem que os arquivos sejam arquivos remotos em um diretório acessível por http://   (e provavelmente https:// e ftp://, mas não foram testados) se o servidor remoto suporta [Pedidos de Intervalo](https://en.wikipedia.org/wiki/Byte_serving) no cabeçalho da solicitação. ThREDS e Amazon S3 suportam pedidos de intervalo, Hyrax Não. Este sistema permite- lhe aceder a dados em ficheiros remotos sem baixar os ficheiros (que é útil se os arquivos remotos são muito volumosos) , mas o acesso a esses arquivos será muito mais lento do que o acesso a arquivos locais ou até mesmo a um remoto OPeNDAP fonte.
Isto inclui "files" em um balde Amazon S3 uma vez que eles são acessíveis via http:// . Se os nomes dos objetos S3 são como nomes de arquivos (com / interno é como uma árvore de diretórios Linux) , ERDDAP™ também pode tornar os arquivos acessíveis via ERDDAP 's "files" sistema. Para que isso funcione, suas credenciais S3 devem estar em ~/.aws/credentials (em Linux, OS X ou Unix) , ou C:\\ Users\\USERNAME\\.aws\\ credentials (em Windows) no servidor com ERDDAP . Ver o [Documentação do Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * Gerar conjuntos de dados Xml tem uma nova e incomum opção: EDDsFromFiles.
Isto irá passar por um sistema de ficheiros (mesmo um sistema remoto como um Amazon S3 se os objetos têm nomes parecidos com arquivos) e criar o datasets.xml blocos para uma série de conjuntos de dados. Sua quilometragem pode variar. Isto funciona bem se os arquivos são organizados de modo que todos os arquivos de dados em um determinado diretório (e seus subdiretórios) são adequados para um conjunto de dados (Por exemplo, todos os compostos SST de 1 dia) . Caso contrário (Por exemplo, se um diretório contém alguns arquivos SST e alguns arquivos Chlorophyll-a) , isto funciona mal, mas ainda pode ser útil.
    * Programadores: novos arquivos /lib .jar.
Se você compilar ERDDAP™ , por favor note os novos arquivos .jar no parâmetro classpath -cp listados no ERDDAP™   [Guia do Programador](/docs/contributing/programmer-guide) .
    * mar\\_água\\_prática\\_salinidade
Se você usar o nome padrão CF mar\\_água\\_salinidade para qualquer variável, eu encorajo você a mudar para mar\\_água\\_prática\\_salinidade que está disponível em [Versão 29 do quadro do nome-padrão CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (e algumas versões anteriores -- Eu não sabia que) . Este nome indica que este é de fato um valor de Salinidade Prática usando Practical Salinity Units   ( PSU ) , ao contrário de um valor g/kg mais antigo. As unidades canónicas são diferentes, mas ainda incrivelmente inúteis. 1 (presumivelmente implicando PSU /PSS- 78) , em oposição ao 1e-3 (Supostamente implicando g/kg) para mar\\_água\\_salinidade. \\[ Olá. Unidata e CF: Identificamos valores que utilizam outras escalas, por exemplo Fahrenheit ou Celsius, por meio de uma corda de unidades que é o nome da escala ou alguma variação. Porque não podemos identificar unidades de salinidade através da sua escala, por exemplo, PSS-78? Eu sei: os valores do PSS-78 são "sem unidade", mas há uma escala implícita, não há? Se eu inventar uma nova escala de salinidade prática onde os valores são 0,875 vezes os valores do PSS-78, as unidades canônicas ainda devem ser "1"? Como poderia um usuário distingui-los? Unidades de 1e-3 e 1 não são nem descritivas nem úteis para usuários que estão tentando descobrir o que os números indicam. \\] 

## Versão 1.62{#version-162} 
 (lançado 2015-06-08) 

*    **Novas funcionalidades (para usuários) :** 
    * Para EDDGrid conjuntos de dados, os usuários agora podem fazer Gráfico Tipo: Gráficos de superfície com qualquer combinação de eixos numéricos, não apenas longitude versus latitude. Isto permite- lhe fazer x versus y (projetado) gráficos e vários [Diagramas de Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) , por exemplo, traçando longitude versus profundidade, ou tempo versus profundidade. \\[ Nota: se a profundidade estiver no eixo Y, provavelmente será desviada do que você quer. Desculpa, desapertá-lo ainda não é uma opção. \\] Graças a Cara Wilson e Lynn DeWitt.
    * Há uma nova [Conversor de acrônimos oceânicos/atmosféricos](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) que permite converter uma sigla oceânica/atmosférica comum para/de um nome completo.
    * Há uma nova [Oceano/Atmosférica Conversor de nomes variáveis](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) que permite converter um nome comum de variável oceânica/atmosférica para/de um nome completo.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    *    Java 7/8
         Oracle já não suporta (fornece correções de erros de segurança para)   Java 7. ERDDAP™ ainda suporta Java 7, mas por favor mude para Java 8. O próximo lançamento de ERDDAP™ provavelmente exigirá Java 8.
    *    valid\\_min /max/intervalo
Antes e agora, se a dataVariable tinha scale\\_factor e add\\_offset metadados, ERDDAP™ desfaz os valores dos dados e remove os metadados. Anteriormente, ERDDAP™ não alterou/desembalagem nenhuma valid\\_range , valid\\_min , valid\\_max metadados (que normalmente/deve conter valores embalados) por scale\\_factor e add\\_offset . Agora sim. Por favor, procure no seu ERDDAP™ para "valid\\_" e certifique-se de que todas as variáveis que têm valid\\_range , valid\\_min , ou valid\\_max tem os valores corretos quando os conjuntos de dados aparecem na nova versão do ERDDAP . Ver [ valid\\_range /min/max documentação](/docs/server-admin/datasets#valid_range) .
    * ACDD-1.3
Anteriormente, ERDDAP™   (Gerar os Dados Xml) utilizado/recomendado o original (1.0) versão da [ NetCDF Convenção de Atributos para a Descoberta de Dados](https://wiki.esipfed.org/ArchivalCopyOfVersion1) que foi referido como " Unidata Dataset Discovery v1.0" nas Convenções globais e Metadata\\_Conventions atributos. Agora, recomendamos [Versão 1.3 do ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) que foi ratificado no início de 2015 e é referido como "ACDD-1.3". Felizmente, ACDD-1.3 é altamente para trás compatível com a versão 1.0. RECOMENDAMOS que você [mudar para ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13) . Não é difícil.
    * Gerar conjuntos de dados Atributos do Xml
Houve um grande número de alterações para melhorar&lt; addAttributes &gt; valores sugeridos pela GenerateDatasets Xml para as convenções globais, creator\\_name /email/url, palavras-chave, resumo, atributos de título e para a variável long\\_name atributo. Algumas mudanças estão relacionadas ao novo uso do ACDD-1.3.
    * Tabela EDDDe SOS conjuntos de dados
Com a adição ocasional de novos tipos de SOS servidores e alterações para os servidores antigos, está ficando mais difícil para ERDDAP™ para detectar automaticamente o tipo de servidor a partir das respostas do servidor. Utilização de [&lt;sosServerType&gt;] (/docs/server-admin/datasets#eddtable fromsos-skeleton-xml)   (com um valor de IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , ou WHO) é agora fortemente recomendado. Se algum dos seus conjuntos de dados deste tipo tiver problemas na nova versão do ERDDAP , tente executar de novo Gerar Datasets Xml para a SOS servidor para gerar um novo bloco de datasets.xml para esse conjunto de dados. Gerar conjuntos de dados Xml permitirá que você experimente o diferente&lt;opções sosServerType&gt; até encontrar a opção certa para um determinado servidor. Se você ainda tiver problemas, por favor me avise o problema que você vê e o URL do servidor e eu tentarei ajudar.
    * Conjuntos de dados EDDTableFromFileNames
Alguns atributos que foram recomendados addAttributes são agora atributos de origem. Você provavelmente não precisa mudar nada para conjuntos de dados existentes em seu datasets.xml .
    * Correção de bug relacionada a certas solicitações para os conjuntos de dados EDDTableFromNcCFFiles.
Acrescentei também um grande número de testes unitários ao grande número de testes unitários existentes dos métodos subjacentes. (existem 100 de cenários) . Graças ao Eli Hunter.
    * Correcção de erros/pequenas alterações EDDGrid DeMergeIR.
Graças a Jonathan Lafite e Philippe Makowski
    * Correcção de erros: EDDGrid FromErddap agora funciona mesmo que um conjunto de dados remoto não tenha ioos\\_category atributos variáveis.
Graças ao Kevin O'Brien.
    * Correcção de erros na página Web do .graph para EDDGrid conjuntos de dados quando existe apenas uma variável de eixo com mais de um valor.
Graças ao Charles Carleton.
    * Houve outras pequenas melhorias, alterações e correções de erros.

## Versão 1.60{#version-160} 
 (lançado 2015-03-12) 

*    **Novas funcionalidades (para usuários) :** nenhum
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * RECOMENDADO FORTEMENTE: Atualizar o servidor [robots.txt](/docs/server-admin/additional-information#robotstxt) ficheiro a incluir:
Inibir: /erddap/files/
    * INotify Problema e Solução:
Nos computadores Linux, se você estiver usando&lt;updateEveryNMillis&gt; com conjuntos de dados com tipo= EDDGrid DeFicheiros, EDDTableDeFiles, EDDGrid Copiar, EDDTableCopy, ou suas subclasses, você pode ver um problema onde um conjunto de dados não é carregado (ocasionalmente ou de forma consistente) com a mensagem de erro: "IOException: User limit of inotify instances accessed or demasiados open files". Se assim for, você pode corrigir este problema chamando (como raiz) :
echo fs.inotify.max\\_user\\_watches=65536 | tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024 | tee -a /etc/sysctl.conf
sysctl - p
Ou, use números maiores se o problema persistir. O padrão para relógios é 8192. O padrão para instâncias é 128. \\[ ATUALIZAÇÃO: Existe um bug dentro Java que faz inotificar as instâncias para não ser lixo coletado. Este problema é evitado em ERDDAP™ v1,66 e superior. Assim, a melhor solução é mudar para a versão mais recente de ERDDAP . \\] 
    * NoSuchFileException Correcção de Erros:
Ocorreu um erro que poderia causar conjuntos de dados do tipo= EDDGrid DeFicheiros, EDDTableDeFiles, EDDGrid Copiar, EDDTableCopy, ou suas subclasses para não carregar ocasionalmente com o erro "NoSuchFileException: _someFileName_". O erro está relacionado com os usos do FileVisitor e foi introduzido em ERDDAP™ v1.56. O problema é raro e é mais provável que afete conjuntos de dados com um grande número de arquivos de dados que mudam frequentemente.
    * Houve algumas pequenas melhorias, mudanças e correções de erros.

## Versão 1.58{#version-158} 
 (lançado 2015-02-25) 

*    **Novas funcionalidades (para usuários) :** 
    * A nova [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) o sistema permite navegar por um sistema de arquivos virtual e baixar arquivos de dados de origem de muitos ERDDAP™ conjuntos de dados. A "files" sistema está ativo por padrão, mas ERDDAP™ administradores podem desativá- lo colocando
```
        <filesActive>false</filesActive>  
```
na ERDDAP™ arquivo setup.xml. Os agradecimentos especiais a Philippe Makowski, que persistiu quando eu era lento para apreciar a beleza desta idéia.
    * destino da hora Max... Anteriormente, a variável de tempo dos conjuntos de dados EDDTable com dados próximos em tempo real tinha um destinoMax de NaN, o que implicava que o valor máximo de tempo para o conjunto de dados é recente, mas não precisamente conhecido e mudando frequentemente. Agora, o destinoMax tem um valor real, indicando o atualmente conhecido da última vez. Muitos conjuntos de dados têm atualizado continuamente os dados. ERDDAP™ suporta o acesso aos dados mais recentes, mesmo que seja depois da última vez conhecida. Note que o novo [&lt;atualizaçãoEveryNMillis&gt;] (/docs/server-admin/datasets# update everynmillis) apoio em EDDGrid Arquivos e tabela EDD FromFiles datasets atualiza o destino da variável de tempoMax. Outra consequência desta mudança é que datasetID = allDatasets dataset agora inclui a última vez conhecida atualmente nas colunas maxTime. Graças ao John Kerfoot.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * RECOMENDADO FORTEMENTE: Atualizar o servidor [robots.txt](/docs/server-admin/additional-information#robotstxt) ficheiro a incluir:
Inibir: /files/
Inibir: /erddap/files/
    * Amostra datasets.xml - O quê? No ano passado, recomendamos vários excelentes conjuntos de dados no litowatch ERDDAP™ que você poderia adicionar à sua ERDDAP™ apenas adicionando algumas linhas ao seu datasets.xml . Se tiver adicionado os conjuntos de dados erdVH, por favor mude para os conjuntos de dados erdVH2 mais recentes:
        * Faça uma cópia de todos os conjuntos de dados erdVH e altere a cópia datasetID É de ErdVH... para ErdVH2... e mudar a referência sourceUrl de erdVH... a erdVH2.
        * Configura os conjuntos de dados erdVH para activo="falso".
    * Tudo EDDGrid Arquivos e tabela EDD Subclasses FromFiles agora suportam [&lt;accessViaFiles&gt;] (/docs/server-admin/datasets#accessibleviafiles) para tornar os ficheiros de dados de origem acessíveis através da "files" sistemas. Por padrão, este sistema está desligado para cada conjunto de dados. Você precisa adicionar a tag para habilitá-la. Graças a Philippe Makowski.
    * Tudo EDDGrid Arquivos e tabela EDD Subclasses FromFiles agora suportam [&lt;atualizaçãoEveryNMillis&gt;] (/docs/server-admin/datasets# update everynmillis) . Por padrão, este sistema está desligado para cada conjunto de dados. Você precisa adicionar a tag para habilitá-la. Graças a Dominic Fuller-Rowell e NGDC.
    * A nova [EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames) cria um conjunto de dados a partir de informações sobre um grupo de arquivos no sistema de arquivos do servidor, mas ele não serve dados de dentro dos arquivos. Por exemplo, isso é útil para distribuir coleções de arquivos de imagem, arquivos de áudio, arquivos de vídeo, arquivos de processamento de texto e arquivos de planilha. Isto funciona de mãos dadas com o novo [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) sistema, para que os usuários possam baixar os arquivos. Os agradecimentos especiais a Philippe Makowski, que persistiu quando eu era lento para apreciar a beleza desta idéia.
    * A nova [ EDDGrid DoEDDTable](/docs/server-admin/datasets#eddgridfromeddtable) permite converter um conjunto de dados tabulares num conjunto de dados em grelha. Graças à Ocean Networks Canadá.
    * A nova [ EDDGrid DeMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles) Agrega dados de um grupo de MergeIR local .gz ficheiros. EDDGrid FromMergeIRFiles tem a distinção de ser o primeiro pedaço de código contribuído para ERDDAP . Foi feito sem a nossa ajuda. Três vivas e agradecimentos especiais a Jonathan Lafite e Philippe Makowski da R.Tech Engineering.
    * Existe uma nova, opcional setup.xml tag,&lt;unitTestDataDir&gt;, que especifica o diretório com os arquivos de dados de teste de unidade que estão disponíveis através de um novo repositório GitHub: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) . Por exemplo:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Isso ainda não é útil, mas faz parte do movimento para tornar o máximo de testes de unidade executáveis por outras pessoas. Graças ao Terry Rankine.
    * Houve muitas pequenas melhorias, alterações e correções de erros.

## Versão 1.56{#version-156} 
 (lançado 2014-12-16) 

*    **Novas funcionalidades (para usuários) :**   (Nenhum) 
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Você provavelmente já sabe sobre [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) e [Tabela EDDDerddap](/docs/server-admin/datasets#eddfromerddap) que permite que você link para conjuntos de dados em outros ERDDAP e tê-los aparecer em seu ERDDAP . Pedidos do usuário para dados reais desses conjuntos de dados são encaminhados invisivelmente para a fonte ERDDAP™ , para que os dados não fluam através do seu sistema ou usem a sua largura de banda. Existe agora uma grande lista de conjuntos de dados recomendados na amostra datasets.xml em erddapContent .zip . Para incluí-los em seu ERDDAP™ , tudo que você tem que fazer é copiar e colar os que você quer em seu datasets.xml . Graças ao Conor Delaney.
    * Se você compilar ERDDAP™ , você precisa adicionar algum novo. arquivos jar para o seu [interruptor classpath - cp](/docs/contributing/programmer-guide#development-environment) para javac e java.
    * A nova [Tabela EDDDeCassandra](/docs/server-admin/datasets#eddtablefromcassandra) lida com a obtenção de dados de [Cassandra](https://cassandra.apache.org/) . Graças à Ocean Networks Canadá.
    * A nova [Tabela EDDDeColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) lida com a obtenção de dados de arquivos de dados ASCII com colunas de largura fixa. Graças a Philippe Makowski.
    * Tudo EDDGrid Arquivos e tabela EDD As subclasses FromFiles agora usam um novo método, FileVisitor (adicionado a Java em 1.7) recolher informações sobre os ficheiros. Isso pode não ter nenhum benefício para a primeira coleta de informações de arquivo para um determinado conjunto de dados, mas parece ter um grande benefício para as reuniões subsequentes, se feito em breve, enquanto o SO ainda tem a informação em cache. Graças à NGDC.
        
Ainda recomendamos: Se um conjunto de dados tiver um grande número de ficheiros (p. ex., &gt; 1.000) , o sistema operacional (e assim EDDGrid DeFiles e EDDTableFromFiles) funcionará muito mais eficientemente se você armazenar os arquivos em uma série de subdiretórios (um por ano, ou um por mês para conjuntos de dados com arquivos muito frequentes) , para que nunca haja um grande número de arquivos em um determinado diretório.
        
    * Várias pequenas melhorias no EDDTableFromAsciiFiles.
    * Algumas melhorias no EDDTableFromAsciiServiceNOS, nomeadamente para obter algumas colunas adicionais de informação da fonte. Graças à Lynn DeWitt.
    * Algumas pequenas correções de erros relacionadas à ISO 19115 que ERDDAP™ gera. Graças a Anna Milan.

## Versão 1.54{#version-154} 
 (lançado 2014-10-24) 

*    **Novas funcionalidades (para usuários) :** 
    * Algumas variáveis agora funcionam com o tempo na precisão dos milissegundos, por exemplo, 2014-10-24T16:41:22.485Z. Graças ao Dominic Fuller-Rowell.
*    **Pequenas alterações/correcções de bugs:** 
    * Correcção de erros: com uma certa combinação de circunstâncias, EDDGrid DeNcFile datasets retornou dados com precisão reduzida (Por exemplo, flutua em vez de duplos) . Isso só poderia afetar os valores dos dados com valores &gt; 8 significativos. As minhas desculpas. (E era um erro clássico de programação de computador: um personagem errado.) Graças ao Dominic Fuller-Rowell.
    * Muitas pequenas mudanças.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Os conjuntos de dados do Griddap agora suportam variáveis do eixo timestamp e variáveis de dados (ou seja, variáveis com valores de tempo, mas destinationName excepto: "time" ) . Graças ao Dominic Fuller-Rowell.
    *    ERDDAP™ agora suporta corretamente milissegundos time\\_precision "1970-01-01T00:00:00000Z". Uma peculiaridade intencional: ao escrever momentos para arquivos orientados para humanos (Por exemplo, .csv, .tsv , .json , .xhtml ) , ERDDAP™ usa o especificado time\\_precision se incluir segundos e/ou segundos decimais; caso contrário, utiliza segundos time\\_precision "1970-01-01T00:00:00Z" (para consistência e compatibilidade para trás) . Graças ao Dominic Fuller-Rowell.
    *    EDDGrid FromNcFiles agora suporta ler String dataVariable s.
    *    .nc arquivos escritos pelo griddap agora podem ter String dataVariable s.
    * Gerar conjuntos de dados Xml agora inclui mais flush () chamadas para evitar o problema de informação não sendo escrita para os arquivos. Graças ao Thierry Valero.
    * A documentação para GenerateDatasetsXml foi melhorada, notavelmente para apontar que o -i switch só funciona se você especificar todas as respostas na linha de comando (Por exemplo, modo de script) . E o modo de script é explicado. Graças ao Thierry Valero.
    *    ERDDAP™ já não permite que duas variáveis num conjunto de dados tenham a mesma sourceName . (Se alguém fez isso antes, provavelmente levou a mensagens de erro.) Como antes, ERDDAP™ não permite que duas variáveis num conjunto de dados tenham a mesma destinationName .

## Versão 1.52{#version-152} 
 (lançado 2014-10-03) 

*    **Novas funcionalidades:**   (nenhum) 
*    **Pequenas alterações/correcções de bugs:** 
    * Outro (menor) alteração a fazer ERDDAP™ Mais rápido.
    * Melhoria de arquivos ISO 19115 gerados por ERDDAP : acrescentado novo recomendado&lt;gmd: valores de protocolo&gt; (informação, pesquisa, OPeNDAP : OPeNDAP , ERDDAP :griddap, e ERDDAP : tabledap ) dentro&lt;gmd:CI\\_OnlineResource&gt;. Graças ao Derrick Snowden e ao John Maurer.
    * Muitas pequenas mudanças.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Correção de Bug: GerarDatasetsXml.sh e DasDds.sh não estavam em erddap.war para 1.48 e 1.50. Agora estão. Graças a Thierry Valero.
    * Pequenas mudanças em alguns testes de velocidade no TestAll para torná-los menos suscetíveis ao acaso. Graças ao Terry Rankine.

## Versão 1.50{#version-150} 
 (lançado em 2014-09-06) 

*    **Novas funcionalidades:**   (nenhum) 
*    **Pequenas alterações/correcções de bugs:** 
    * Isto ERDDAP™ deve ser muito mais rápido do que versões recentes.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:**   (nada) 

## Versão 1.48{#version-148} 
 (lançado em 2014-09-04) 

*    **Novas funcionalidades:** 
    *    ERDDAP™ agora cria sempre um conjunto de dados tabulares, datasetID = allDatasets , que tem uma tabela de informações sobre todos os conjuntos de dados ERDDAP . Pode ser consultado como qualquer outro conjunto de dados tabulares. Esta é uma alternativa útil ao sistema atual para obter informações sobre conjuntos de dados programaticamente.
    * Existem dois novos tipos de arquivos de saída para EDDTable e EDDGrid , .csv0 e .tsv 0. São ficheiros de valores separados por vírgulas e tabulações que não têm linhas com nomes de colunas ou unidades. Os dados começam na primeira linha. Eles são especialmente úteis para scripts que só querem um pedaço de informação de ERDDAP .
*    **Pequenas alterações/correcções de bugs:** 
    * Os mapas podem agora ser feitos para longitudes na faixa -720 a 720.
    * A nova .nc ml resposta Tipo de arquivo está disponível para todos EDDGrid conjuntos de dados. Devolve o [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\- formatado descrição do conjunto de dados (similar a uma combinação .dds + .das) .
    * Correção de Bug: Salvando dados tabulares para um .nc o arquivo foi limitado a 100.000 valores por variável. Agora está limitado a 2 GB de tamanho total de arquivo. Graças ao Kevin O'Brien.
    * Correcção de erros: a gravaçãoAs Matlab métodos agora garantir que datasetID s são convertidos para seguro Matlab nomes variáveis. Mas eu ainda recomendo fortemente que você crie datasetID s que são nomes de variáveis válidas: começando com uma letra e então apenas usando A-Z, a-z, 0-9, e \\_. Ver [ datasetID ](/docs/server-admin/datasets#datasetid) . Graças ao Luke Campbell.
    * Correcção de erros na tabela EDD FromDatabase: Com alguns tipos de bases de dados, um NO\\_ A resposta dos dados da base de dados levou a um atraso de 30 segundos sem sentido ERDDAP . Graças ao Greg Williams.
    * Correcção de erros: EDDGrid Fazer um Gráfico com Tipo de Gráfico = linhas (ou marcadores ou marcadores e linhas) variável de eixo x forçada para ser tempo. Agora pode ser qualquer eixo. Graças à Lynn DeWitt.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * RECOMENDADO FORTEMENTE: Actualização Java   
Esta versão de ERDDAP™ necessita Java 7 ou superior, mas Java 7 chegará ao seu fim de vida em abril de 2015 (Em breve&#33;) Agora é uma boa altura para mudar para Java 8. Então Java 8 é fortemente recomendado. Testo com Java 8. Note que Java 6 chegou ao seu fim de vida em fevereiro de 2013 (Não há mais falhas de segurança&#33;) .
    * RECOMENDADO: Atualizar Tomcat
Se utilizar o Tomcat, mude para a versão mais recente do Tomcat. Tomcat 8 é projetado para trabalhar com Java 8.
    * " ERDDAP " não é mais uma sigla. Agora é apenas um nome. Não quero que o nome destaque ERD . Quero. ERDDAP™ para destacar sua instituição e seus dados.
    * Por favor. [personalizar a aparência do seu ERDDAP™ instalação para destacar sua instituição e seus dados](/docs/server-admin/deploy-install#customize) . Com uma hora de trabalho, você pode fazer boas melhorias que vão durar para sempre.
    * Em setup.xml, o&lt;a opção displayDiagnosticInfo&gt; é sempre ignorada e tratada como se o valor fosse falso.
RECOMENDADO: Remover o&lt;displayDiagnosticInfo&gt; tag e informações relacionadas de seu setup.xml.
    * Em setup.xml, o padrão para&lt; drawLandMask &gt; foi "acabou", mas agora está "sub", que é um padrão geral melhor (funciona bem com todos os conjuntos de dados) .
    * Os scripts GenerateDatasetsXml.sh e DadDds.sh Linux agora usam bash em vez de csh, e têm a extensão .sh. Graças a Emilio Mayorga
    * Gerar conjuntos de dados Xml e DasDds agora criam seus próprios arquivos de log (GerarDatasetsXml.log e DasDds.log) e arquivos de saída (GerarDatasetsXml.out e DadDds.out) em _bigPaintDirectory_/logs/, e nunca coloque seus resultados na área de transferência.
    * Gerar conjuntos de dados Xml agora suporta um parâmetro de linha de comando -i que insere a saída no arquivo especificado em um lugar especificado. Ver o [documentação](/docs/server-admin/datasets#generatedatasetsxml) . Graças ao Terry Rankine.
    * EDDTableFromDatabase agora suporta&lt;colunaNameQuotes&gt;&lt;/colunNameQuotes&gt;, com valores válidos " (o padrão) , ', ou nada. Este caracter (Se existir) será usado antes e depois dos nomes das colunas nas consultas SQL. Diferentes tipos de bases de dados, configuradas de diferentes maneiras, precisarão de diferentes aspas de nomes de colunas.
    * Variáveis de latitude e longitude tabulares podem agora ter customizado long\\_name 's, por exemplo, Perfil Latitude. Anteriormente, só podiam ser Latitude e Longitude.
    * De agora em diante, especifique "defaultDataQuery" e "defaultGraphQuery" como atributos nos metadados globais do conjunto de dados (i.e.,&lt;addAtts&gt;), não como separado&lt;por omissãoDataQuery&gt; e&lt;tags GraphQuery&gt; padrão. (Embora, se você ainda especificá-los através das tags, ERDDAP™ criará automaticamente atributos globais com a informação.) 

## Versão 1.46{#version-146} 
 (lançado em 2013-07-09) 

*    **Novas funcionalidades:** 
    *    (Nenhum) 
*    **Pequenas alterações/correcções de bugs:** 
    * Correcção de Bug: Em EDDTableFromDatabase, apenas na versão 1.44, ERDDAP™ citou indevidamente o nome da tabela do banco de dados em instruções SQL. Isso agora está resolvido. Graças ao Kevin O'Brien.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    *    ** Se você não modificar as mensagens padrão em messages.xml,
apagar \\[ tomcat \\] /content/erddap/mensages.xml . **   
O arquivo messages.xml padrão está agora no erddap. arquivo de guerra, não erddapContent .zip . Então, você não precisa mais atualizar messages.xml manualmente.
    * Se você modificar as mensagens em messages.xml, de agora em diante, cada vez que você atualizar ERDDAP™ , quer:
        * Fazer as mesmas alterações que fez antes no novo
             \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/mensages.xml.
E desta vez: apagar \\[ tomcat \\] /content/erddap/mensages.xml .
        * Ou, descubra o que mudou no novo messages.xml (via diff) , e modificar o seu
             \\[ tomcat \\] /content/erddap/mensages.xml arquivo em conformidade.

## Versão 1.44{#version-144} 
 (lançado em 2013-05-30) 

*    **Novas funcionalidades:** 
    * Consultas para conjuntos de dados EDDTable agora suportam & orderBy Min (...) e & orderByMinMax  (...)   (que devolve duas linhas em cada grupo, com o mínimo e máximo da última orderBy valor) . Graças à Lynn DeWitt.
    * Há dois novos tabledap tipos de ficheiros: .nc CFHeader e .nc Cabeçalho CFMA (que devolve o cabeçalho ncdump- like do correspondente .nc FC e .nc Tipos de ficheiros CFMA) . Graças ao Steve Hankin.
*    **Pequenas alterações/correcções de bugs:** 
    * Correcção de Bug: carregar as páginas Web .graph e .html para conjuntos de dados com muitos valores de tempo foi lento porque ERDDAP™ foi lento ao gerar as opções da barra de tempo. Agora é sempre rápido. Graças a Michael Barry, OOICI, e Kristian Sebastian Blalid.
    * Correcção de erros: Em alguns tipos de conjuntos de dados EDDTable, as restrições de tempo nem sempre foram tratadas corretamente. Agora estão. Graças a John Maurer e Kevin O'Brien.
    * Correcção de erros: os conjuntos de dados não carregariam quando todos os subsetVariables foram variáveis de valor fixo. Agora vão. Graças a Lynn DeWitt e John Peterson.
    * MELHORADO: agora, todas as consultas para apenas variáveis de subconjunto agem como se &distinct () faz parte da consulta.
    * MELHORADO: agora, para consultas que incluem & .json p=_functionName_, _function Nome_ DEVE ser agora uma série de 1 ou mais (separado do período) Palavras. Cada palavra deve começar com uma letra ISO 8859 ou "\\_" e ser seguida por 0 ou mais letras ISO 8859, dígitos, ou "\\_". Sim, isto é mais restritivo do que Java Requisitos do script para nomes de funções.
    * O eixo de tempo nos gráficos agora funciona bem para intervalos de tempo mais longos (80 - 10000 anos) e intervalos de tempo menores (0.003 - 180 segundos) .
    *    ERDDAP™ é agora mais indulgente ao processar variações de dados de tempo ISO-8601-formato.
    * Houve muitas outras pequenas alterações e correções de erros.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    *    **Você deve atualizar para a versão mais recente para ser seguro.**   
         ERDDAP™ Foi submetido a uma auditoria de segurança. Havia alguns insectos e fraquezas. A versão 1.44 inclui várias correções de bugs de segurança importantes e várias alterações para aumentar a segurança e acessibilidade (Por exemplo, para utilizadores com deficiência de visão) . A versão 1.44 passou na auditoria de segurança. Graças a todas as boas pessoas na USGS e Acunetix que tornou isso possível. (Não devia. NOAA Fazer isto?) 
    * A nova [Tabela EDDDe WFS Ficheiros](/docs/server-admin/datasets#eddtablefromwfsfiles) faz uma cópia local de todos os dados de uma ArcGIS MapServer WFS servidor e assim os dados podem ser re-servados rapidamente para ERDDAP™ utilizadores. Graças à Christy Caudill.
    * A nova [Tabela EDDDe EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) permite- lhe criar um conjunto de dados EDDTable EDDGrid Conjunto de dados. Algumas razões comuns para isso são:
        * Isto permite que o conjunto de dados seja consultado com OPeNDAP restrições de selecção (que um utilizador pode ter pedido) .
        * O conjunto de dados é inerentemente um conjunto de dados tabulares. Graças a OOICI, Jim Potemra, Roy Mendelssohn.
    * O nome variável "profundidade" é agora uma alternativa especial para "altitude". As unidades devem ser uma variante de "metros". Os valores dos dados devem ser positivos=down. ERDDAP™ está agora plenamente ciente do significado de "profundidade" e apoia-o onde quer que a altitude seja suportada (Por exemplo, como um componente de um cdm CF DSG\\_data\\_type=profile dataset) . Um conjunto de dados não deve ter variáveis de "profundidade" e "altitude".
    * Na sua datasets.xml , por favor, remover quaisquer usos de&lt;att name="cdm\\_altitude\\_proxy"&gt;profundidade&lt;/att&gt; uma vez que a profundidade é agora uma alternativa especial à altitude e por isso não precisa ser especialmente identificado.
    * Na sua datasets.xml , por favor, remover quaisquer usos de&lt;altitudeMetersPerSourceUnit&gt;, exceto para EDDTable De SOS .
Quando o valor é 1, apenas delete-o.
Quando o valor é -1, considere mudar o nome da variável para profundidade.
Para outros valores, adicionar&lt; addAttributes &gt;, por exemplo:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Todos os conjuntos de dados agora suportam
        
        *   &lt;DefaultDataQuery&gt; que é usado se .html for solicitado sem consulta.
            * Provavelmente raramente precisará de usar isto.
            * Para conjuntos de dados quadrifadap, um uso comum deste é especificar um valor padrão de profundidade ou dimensão de altitude diferente (Por exemplo, \\[ 0 \\] em vez de \\[ última \\] ) .
Em qualquer caso, você deve sempre listar todas as variáveis, sempre usar os mesmos valores de dimensão para todas as variáveis, e quase sempre usar \\[ 0 \\] , \\[ última \\] , ou \\[ 0:último \\] para os valores da dimensão.
Por exemplo:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Para tabledap conjuntos de dados, o uso mais comum deste é especificar um intervalo de tempo padrão diferente (relativo a agora, por exemplo, &time&gt;= now- 1 dia) .
Lembre-se que solicitar nenhuma variável de dados é o mesmo que especificar todas as variáveis de dados, então geralmente você pode apenas especificar a nova restrição de tempo.
Por exemplo:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;padrãoGraphQuery&gt; que é usado se .graph for solicitado sem consulta.
            * Provavelmente raramente precisará de usar isto.
            * Para conjuntos de dados griddap, o uso mais comum disso é especificar um valor padrão de profundidade ou altitude diferente (Por exemplo, \\[ 0 \\] em vez de \\[ última \\] ) e/ou para especificar que uma variável específica seja grafada.
Em qualquer caso, você quase sempre usará \\[ 0 \\] , \\[ última \\] , ou \\[ 0:último \\] para os valores da dimensão.
Por exemplo:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Para tabledap datasets, os usos mais comuns deste são especificar diferentes variáveis a serem mapeadas, um intervalo de tempo padrão diferente (relativo a agora, por exemplo, &time&gt;= now- 1 dia) e/ou diferentes configurações gráficas padrão (Por exemplo, tipo de marcador) .
Por exemplo:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Lembre-se que você precisa codificar XML ou por cento codificar (qualquer um, mas não ambos) as consultas padrão já que elas estão em um documento XML. Por exemplo, o & se torna & amp; amp; ,&lt;torna- se &amp;lt; , e &gt; torna- se &amp;gt; .
E, por favor, verifique o seu trabalho. É fácil cometer um erro e não conseguir o que quer.
Graças a Charles Carleton, Kevin O'Brien, Luke Campbell e outros.
    *    EDDGrid Da Dap, EDDGrid Darddap, e EDDTableFrom EDDGrid ter um novo sistema para lidar com conjuntos de dados que mudam frequentemente (tantas quanto aproximadamente a cada 0,5 s) . Diferente ERDDAP 's sistema regular, proativo para recarregar completamente cada conjunto de dados, este sistema adicional opcional é reativo (desencadeado por uma solicitação de usuário) e incremental (apenas atualizando as informações que precisam ser atualizadas) . Por exemplo, se um pedido a um EDDGrid O conjunto de dados FromDap ocorre mais do que o número especificado de milissegundos desde a última atualização, ERDDAP™ irá ver se existem novos valores para o mais à esquerda (geralmente "time" ) dimensional e, se assim for, basta baixar esses novos valores antes de lidar com o pedido do usuário. Este sistema é muito bom em manter um conjunto de dados em rápida mudança atualizado com exigências mínimas sobre a fonte de dados, mas ao custo de retardar ligeiramente o processamento de algumas solicitações de usuários. Ver [&lt;atualizaçãoEveryNMillis&gt;] (/docs/server-admin/datasets# update everynmillis)   
Graças ao Michael Barry e ao OOICI.
    *    EDDGrid DeNcFiles, EDDTableFromNcFiles e EDDTableFromNcCFFiles agora suportam [NcML .nc ml](/docs/server-admin/datasets#ncml-files) ficheiros de código no lugar de .nc ficheiros. Graças a Jose B Rodriguez Rueda.
    * Para EDDGrid AgregateExistingDimension, ERDDAP™ suporta uma nova opção servidorType="dodsindex" para o atributo servidorType do&lt; sourceUrl S&gt; tag. Isto funciona com páginas Web que têm listas de arquivos dentro&lt;Pre&gt;&lt;/pre&gt; e frequentemente abaixo de um OPeNDAP logótipo. Um exemplo é [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * Para a tabela EDDDe SOS agora suporta uma tag opcional
```  
        <sosServerType>_serverType_</sosServerType>  
```
assim você pode especificar o tipo de SOS servidor (assim ERDDAP™ não tem que descobrir) . Valores válidos de&lt;_serverType_\\&gt; são IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , e WHOI (um servidor recentemente suportado Tipo) . Ver [Tabela EDDDe SOS ](/docs/server-admin/datasets#eddtablefromsos) . Graças ao Derrick Snowden e à Janet Fredericks.
    * Tudo EDDGrid De... arquivos, EDDTableFrom... Files, EDDGrid Copiar e Tabela EDD Copiar agora suporta uma etiqueta opcional
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
que pode dizer ERDDAP™ para manter o arquivo Quadro (com informações sobre cada arquivo de dados de origem) na memória em vez de apenas no disco (o padrão) . Manter a tabela de arquivos na memória acelera os pedidos de dados (especialmente se existem &gt; 1000 arquivos de dados de origem) , mas usa mais memória. Se você definir isso como true para qualquer conjunto de dados, fique de olho na Memória: atualmente usando linha em _seuDomain_ /erddap/status.html para garantir que ERDDAP™ ainda tem muita memória livre. Graças ao Fredrik Stray.
    * EDDTableFromASCIIFiles agora suporta&lt;charset&gt;. Os dois charsets mais comuns (Caso sensível&#33;) são ISO-8859-1 (o padrão) e UTF-8.
    * Recomendado: em setup.xml, dentro&lt;startHeadHtml&gt;, por favor mude&lt;html&gt; em
        &lt;html lang="en-US"&gt; (ou diferente [código linguístico](https://www.w3schools.com/tags/ref_language_codes.asp) se você traduziu messages.xml) .
    * setup.xml tem novas tags opcionais para desativar partes de ERDDAP :
        *   &lt;conversoresActive&gt;false&lt;/conversoresActive&gt;&lt;&#33;-- o padrão é true --&gt;
        *   &lt;slideSorterActive&gt;false&lt;/slideSorterActive&gt;&lt;&#33;-- o padrão é true --&gt;
        *   &lt;WmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- o padrão é true --&gt;Em geral, recomendamos que qualquer um deles seja falso.
    * Gerar conjuntos de dados Xml agora escreve resultados para _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, não log.txt. Graças a Kristian Sebastian Blalid.
    * Gerar conjuntos de dados Xml agora faz uma boa sugestão para o&lt;recarregar EveryNMinutes&gt;. Graças à NOAA Projecto UAF.
    * Muitas pequenas melhorias para GerarDatasetsXml. Graças à NOAA Projecto UAF.

## Versão 1.42{#version-142} 
 (lançado 2012-11-26) 

*    **Novas funcionalidades:** 
    *    (Sem grandes novidades.) 
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Se você estiver atualizando de ERDDAP™ 1.38 ou 1.40, não houve alterações que exijam que você faça alterações em seus arquivos de configuração (mas você deve usar o novo arquivo messages.xml) .
    *    ERDDAP™ mais uma vez pode correr com Java 1.6. ( ERDDAP™ v1.40 necessária Java 1.7.) Ainda recomendamos fortemente usar a versão mais recente de Java 1.7.
    * Um novo tipo de conjunto de dados, [Tabela EDDDe Arquivos AwsXml](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , pode ler dados de um conjunto de estação meteorológica automática (AWS) Arquivos de dados XML. Graças à Lynn Dewitt e ao Exploratorium.
*    **Pequenas alterações/correcções de bugs:** 
    * Ajustado às alterações ao NDBC SOS servidores de dados de origem.
    * Ajustado às alterações aos serviços NOS COOPS ASCII.
    * Fez várias pequenas alterações e correções de erros.

## Versão 1.40{#version-140} 
 (lançado 2012-10-25) 

*    **Novas funcionalidades:** 
    * Existe um novo formato de arquivo de saída para tabledap conjuntos de dados: .nc CFMA, que salva os dados solicitados em um .nc ficheiro que esteja em conformidade com o CF [Geometrias de amostragem discretas](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Opções de Array Multidimensional, e que, portanto, está em conformidade com os modelos NODC \\[ 2021: agora o [Modelos NCEI](https://www.ncei.noaa.gov/netcdf-templates)  \\] para armazenar este tipo de dados. Graças à NODC.
    *    tabledap requisições podem agora incluir restrições de tempo, como & time&gt; now- 5 dias. Ver o [documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Graças ao James Gosling.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Se você estiver atualizando de ERDDAP™ 1.38, não houve alterações que exijam que você faça alterações em seus arquivos de configuração (mas você deve usar o novo arquivo messages.xml) .
    *    ERDDAP™ lançamentos públicos e marcos internos estão disponíveis via [ ERDDAP™ no GitHub](https://github.com/ERDDAP) . Para mais informações, consultar [Wiki](https://github.com/ERDDAP/erddap/wiki) para a ERDDAP™ projecto, bem como o mais geral [ ERDDAP™ Guia do Programador](/docs/contributing/programmer-guide) . (Isto foi anunciado separadamente algumas semanas após o ERDDAP™ 1,38 lançamento.) 
    * Gerar conjuntos de dados O Xml foi melhorado.
        * O script foi revisado por isso deve funcionar corretamente em todos os computadores Linux (não apenas alguns) .
        * Agora acrescenta creator\\_name , creator\\_email , e creator\\_url Sempre que possível.
        * Muitas outras pequenas melhorias.
    * Refinado como ERDDAP™ lida com o tempo.
        * Internamente, ERDDAP™ agora lida com tempos com precisão de milissegundo (não segundos) .
        * Agora você pode especificar opcionalmente a precisão de tempo para um determinado conjunto de dados, veja [ time\\_precision ](/docs/server-admin/datasets#time_precision) . Por exemplo, você pode definir um conjunto de dados para exibir valores de tempo com precisão de data (Por exemplo, 1970-01-01) .
        * Seus conjuntos de dados atuais usarão as configurações padrão, então eles não serão afetados por essas alterações e continuarão a exibir o tempo com precisão de segundos. Graças a Servet Cizmeli e Philip Goldstein.
    *    [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) é um novo tipo de conjunto de dados que você pode usar no seu datasets.xml Arquivo. Ele pode ler dados de qualquer um dos numerosos formatos de arquivo definidos pelo [CF Geometrias de amostragem discretas](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) convenções. Graças ao NODC e graças especiais a Kyle Wilcox para fazer arquivos de exemplo para o grande número de formatos de arquivo DSG válidos e para torná-los publicamente disponíveis.
*    **Pequenas alterações/correcções de bugs:** 
    * Expandida a [start rápido](#quick-restart) sistema para todos os relevantes EDDGrid e subclasses EDDTable.
    * Documentação melhorada, especialmente relacionada com como usar [gradedap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) e [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) de vários softwares de clientes.
    * Pesquisa avançada alterada para suportar minTime e/ou maxTime expressa em epochSeconds. Graças à Lynn Dewitt.
    * Alterado .htmlTable saída para exibir URLs e endereços de e-mail como links.
    * Adicionado "rel=" e "rev=" para relevante&lt;a href&gt; tags. Graças a Pat Cappelaere da OGC   REST projecto.
    * Melhoria da protecção contra pedidos de dados irrealistas, nomeadamente no tabledap , onde é um problema mais difícil.
    * Moveu mais mensagens para messages.xml.
    * Fez melhorias de velocidade.
    * Fixo EDDGrid FromFiles para permitir a descida dos eixos ordenados. Graças a Maricel Etchegaray.
    * Referências removidas ao iGoogle uma vez que será descontinuado.
    * Fez várias pequenas alterações e correções de erros.

## Versão 1.38{#version-138} 
 (lançado em 2012-04-21) 

*    **Novas funcionalidades:** 
    * ISO 1915 e FGDC -- ERDDAP™ pode gerar automaticamente arquivos de metadados XML ISO 19115 e FGDC para cada conjunto de dados. As ligações aos ficheiros estão visíveis em todas as listas de conjuntos de dados (Por exemplo, da Pesquisa de Texto Completo) e também em Pastas Acessíveis na Web (WAF)   (ver o [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) e [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Graças a Ted Habermann, Dave Neufeld e muitos outros.
    * Pesquisas completas de texto para conjuntos de dados agora suportam \\-_ excludedWord _ e \\-"_excluído frase_" . Graças ao Rich Signell.
    * Pesquisas para conjuntos de dados agora retornam resultados uma página de cada vez. O padrão usa a string de parâmetro: page=1&itemsPerPage=1000, mas você pode alterar os valores na URL da sua solicitação. Graças ao Steve Hankin e ao projecto UAF.
    *    OpenSearch - O quê? ERDDAP™ agora suporta o [ OpenSearch 1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) padrão para procurar por conjuntos de dados. Entre outras coisas, isso permite que sites de agregação de catálogo para fazer pesquisas distribuídas (passando uma solicitação de busca para cada catálogo que ele conhece) .
    * Vírus Separado Valor (CSV) Ficheiros -- ERDDAP™ agora gera arquivos CSV com apenas uma vírgula entre valores (que o Excel prefere) , em vez de vírgula+espaço. Graças ao Jeff deLaBeaujardiere.
    * Milhões de Datasets -- Foram introduzidas várias alterações para apoiar ERDDAP s tendo um grande número de conjuntos de dados, talvez até um milhão. Graças ao Steve Hankin e ao projecto UAF.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
#### Reiniciar rapidamente{#quick-restart} 
*    [A](#quick-restart) sistema de reinicialização rápida permite ERDDAP™ para reiniciar muito mais rápido.
     **Adicione isto ao seu arquivo setup.xml** logo após&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Pesquisa de texto completo para conjuntos de dados agora pode ser feito com o motor de pesquisa Lucene (embora recomendamos o motor de busca original se você tem menos de 10.000 conjuntos de dados) ou o sistema de busca original.
         **Adicione isto ao seu arquivo setup.xml** logo após&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * No setup.xml, você pode/dever agora adicionar duas novas categorias à lista separada por vírgulas de&lt; categoryAttributes &gt;:
        * global:keywords (adicioná-lo logo após global:instituição) -- um novo caso especial que analisa uma lista separada por vírgulas de palavras-chave do atributo global de palavras-chave para fazer uma entrada separada para cada palavra-chave.
        * variável Nome (adicioná- lo no final) -- um novo caso especial que categoriza cada um dos dataVariable   destinationName s.
    * Em setup.xml, você pode (Mas porquê?) dig ERDDAP™ não oferecer metadados FGDC e/ou ISO 19115 para qualquer conjunto de dados, incluindo
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Os valores padrão para estas configurações são true.
    * In datasets.xml , por favor considere melhorar os metadados para seus conjuntos de dados. ERDDAP™ agora gera automaticamente arquivos de metadados XML ISO 19115 e FGDC para cada conjunto de dados com base nos metadados do conjunto de dados.
Então... **bons metadados do conjunto de dados levam ao bom ERDDAP -gerados metadados ISO 1915 e FGDC.**   
         **Veja a nova documentação para os muitos novos RECOMENDADOS [Atributos globais](/docs/server-admin/datasets#global-attributes) .** 
    * In datasets.xml , se você quiser dizer ERDDAP™ para usar um arquivo FGDC e/ou ISO 19115 pré-feito que está em algum lugar no sistema de arquivos do servidor em vez de ter ERDDAP™ gerar estes arquivos, use:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Se _fullFileName_\\="" ou o arquivo não for encontrado, o conjunto de dados não terá metadados FGDC e/ou ISO 19115. Isso também é útil se você quiser suprimir os metadados FGDC e/ou ISO 19115 para um conjunto de dados específico.
    * In datasets.xml , para todos EDDGrid Lado a lado e EDDGrid AgregateExistindo conjuntos de dados Dimension, certifique-se de que os conjuntos de dados infantis têm diferentes datasetID s que os respectivos conjuntos de dados dos pais e que não os outros filhos. (Por exemplo, você poderia seguir o sistema simples mas eficaz de George Foreman para nomear seus filhos.) Se algum nome de uma família for exatamente o mesmo, o conjunto de dados não será carregado (com a mensagem de erro de que os valores do eixo agregado não estão em ordem ordenada) .
    * In datasets.xml , houve algumas alterações na lista de ioos\\_category valores de metadados:
        * "pCO2" foi alterado para "CO2".
        * "Oceanografia Física" foi adicionado.
        * "Soils" foi adicionado.
    * In datasets.xml , ERDDAP™ já não permite '.' numa datasetID . Foi permitido, mas desencorajado. (Desculpa.) 
    * In datasets.xml , a configuração para EDDTableFromThredsFiles e EDDTableFrom Hyrax Os arquivos mudaram ligeiramente porque ambas as classes foram apenas reescritas para serem mais eficientes (ambas as classes agora sempre fazem uma cópia local de todos os arquivos de dados remotos) . Veja a documentação para configurar estas classes: [Tabela EDDDe Hyrax Ficheiros](/docs/server-admin/datasets#eddtablefromhyraxfiles) e [Tabela EDDDeThredsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Ver, nomeadamente, as observações revistas sobre&lt;arquivoDir&gt; (agora irrelevante) e&lt; sourceUrl &gt; (agora essencial) . Além disso, você nunca deve embrulhar esta classe em EDDTableCopy para eficiência.
    * In datasets.xml , se você usar EDDTableFromDatabase com Oracle banco de dados, você deve incluir uma conexão Propriedade como
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
para especificar quantas linhas de dados para obter ao mesmo tempo porque o padrão é 10, o que é terrivelmente ineficiente. Ver o [ Oracle documentação](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . MySql e PostgreSQL parecem ter padrões melhores para esta configuração. Graças ao Kevin O'Brien.
    * Se você usar EDDTableFromDatabase, veja a melhoria [Documentação "Velocidade"](/docs/server-admin/datasets#eddtablefromdatabase) para sugestões adicionais para melhorar o desempenho. Graças ao Kevin O'Brien.
    * In datasets.xml , para todos os EDDTable... conjuntos de dados, nas Convenções e Metadata\\_Conventions atributos globais, consulte CF-1.6 (não CF-1.0, 1.1, 1.2, 1.3, 1.4, ou 1.5) , uma vez que CF-1,6 é a primeira versão a incluir as alterações relacionadas à Geometria de Amostragem Discreta.
    * Programadores que estão a compilar o ERDDAP™ código precisa adicionar lib/lucene-core.jar à lista de arquivos jar em seus caminhos de linha de comando javac e java.
    *    ERDDAP™ tem uma [novo serviço](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) para converter um nome padrão CF para / de uma palavra chave da ciência GCMD. Você pode achar isso útil ao gerar metadados de palavras-chave globais para os conjuntos de dados em seu ERDDAP .
    * Lidar com Bots... Por favor leia este conselho para [impedir bots de rastejar seu ERDDAP™ de uma maneira estúpida](/docs/server-admin/additional-information#robotstxt) .
    * Tradução... O texto sobre ERDDAP 's páginas web está agora principalmente em messages.xml e tão adequado para tradução para diferentes idiomas (Por exemplo, alemão, francês) . As mensagens agora muitas vezes usam o MessageFormat para formatar, também para ajudar a fazer traduções. Se você estiver interessado em fazer uma tradução, por favor envie um e-mail erd dot data at noaa dot gov .
    * Amostra datasets.xml - O quê? Houve vários erros pequenos mas significativos na amostra datasets.xml . Se você usar esses conjuntos de dados, por favor, obtenha as versões mais novas da nova amostra datasets.xml no novo erddapContent .zip Arquivo. Graças ao James Wilkinson.
    * Git... Vou esforçar-me para fazer ERDDAP™ um projeto GitHub o mais rápido possível após esta versão.
*    **Pequenas alterações/correcções de bugs:** 
    * Uma nova paleta, OceanDepth, é útil para valores de profundidade (positivo está para baixo) , por exemplo, 0 (raso) até 8000 (profundo) .
    * A .kml saída de tabledap usa um ícone de marcador melhor (Não é confuso.) . E pairar sobre um marcador agora o torna maior.
    * EDDTableFromFiles -- Na última atualização, a nova biblioteca netcdf-java tinha restrições mais rigorosas para nomes de variáveis em .nc ficheiros. Isso causou problemas para EDDTableFromFiles se uma variável sourceName tinha certos caracteres de pontuação. EDDTableFromFiles é agora modificado para evitar esse problema. Graças a Thomas Holcomb.
    * A página .subset agora suporta 0/10/100/1000/10000/100000 em vez de uma caixa de seleção para dados relacionados. A dica avisa que 100000 pode causar o seu navegador a falhar. Graças a Annette DesRochers, Richard (Abe) Coughlin, e o Projeto Biológico IOOS.
    * .../erddap/info/_ datasetID As páginas web _/index.html agora mostram URLs e endereços de e-mail como links clicáveis. Graças a Richard (Abe) Coughlin e o Projeto Biológico IOOS.
    * Correcção de erros: In tabledap , para conjuntos de dados com altitude MetrosPerSourceUnit&lt;0, as consultas com restrições de altitude foram tratadas incorretamente. Graças ao Kyle Wilcox.
    * Correcção de erros: EDDGrid AgregateFromExistindoA dimensão agora suporta URLs TDS mais diversas. Graças a?

## Versão 1.36{#version-136} 
 (lançado 2011-08-01) 

*    **Novas funcionalidades:** 
    * Nenhuma mudança significativa do ponto de vista de um usuário.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * O conjunto de dados pmelTao que foi frequentemente utilizado como o conjunto de dados da amostra para o tabledap   
A documentação já não está disponível. ERDDAP™ Os administradores devem fazer estas alterações:
        * Na sua datasets.xml , se tiver datasetID = "pmelTao" conjunto de dados, adicionar
ativo="falso" logo antes do "&gt;" no final dessa linha.
        * Em seu setup.xml, se seu&lt;EDDTableIdExemplo&gt; é pmelTao, então:
            * Se a sua datasets.xml não tem um conjunto de dados com datasetID ="erdGlobecBottle", adicionar
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Em seu setup.xml, substitua todas as tags de&lt;EDDTableIdExemplo&gt; através
                &lt;Quadro EDD Matlab Exemplo de Gráficos&gt; com
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Para conjuntos de dados onde o tipo é uma subclasse de EDDTableFromFiles, agora você pode fazer dados de metadados.
Especificamente, agora você pode fazer uma variável a partir dos valores de um atributo de uma das variáveis originais.
Por exemplo, em datasets.xml , dentro de uma&lt; dataVariable &gt; tag, se você usar
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ fará uma variável com os valores do atributo PI da variável cruzeiro.
Graças ao WOD.
*    **Alterações:** 
    * Pequenas alterações

## Versão 1.34{#version-134} 
 (lançado 2011-06-15) 

*    **Alterações:** 
    * Correcção de erros: Corrigido um vazamento de memória que ocorreu em cerca de 64 bits Java Instalações.
    * Correcção de erros: ERDDAP™ agora define corretamente esses atributos globais quando os valores da dimensão de latitude variam de alto a baixo: geoespacial\\_lat\\_min, geoespacial\\_lat\\_max, Southernmost\\_Northing, Northmost\\_Northing.
        
Note que actual\\_range não se altera: pode ter valores baixos, elevados ou elevados, baixos, uma vez que se destina a indicar o intervalo e a ordem de armazenamento.
        
    * Pequenas mudanças.
    *    ERDDAP™ administradores não precisam fazer quaisquer alterações em seu setup.xml ou datasets.xml .

## Versão 1.32{#version-132} 
 (lançado 2011-05-20) 

*    **Alterações:** 
    * Apoio às novas geometrias de amostragem discretas CF ratificadas (que infelizmente ainda não está disponível online) , que substitui as convenções de observação de pontos CF propostas.
         ERDDAP™ os usuários verão que cdm\\_feature\\_type=Station é substituído pela TimeSeries e há pequenas alterações nos arquivos criados para o .nc Tipo de ficheiro CF (A dimensão plana é agora chamada de amostra\\_ dimensão) .
         ERDDAP™ os administradores terão de fazer estas alterações em datasets.xml :
        * cdm\\_data\\_type=Station deve ser alterado para cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile deve ser alterado para cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables deve ser alterado para cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id deve ser alterado para cf\\_role=timeseries\\_id.
    * Novo ioos\\_category opções: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Possível solução para um possível vazamento de memória em 64 bits Java . \\[ Não resultou. \\] 
    * Pequenas mudanças.

## Versão 1.30{#version-130} 
 (lançado 2011-04-29) 

*    **Novas funcionalidades:** 
    * Suporte para 64 bits Java . Quando usado com 64 bits Java , ERDDAP™ agora pode usar muito mais memória heap e lidar com muitos mais pedidos simultâneos.
    * Apoio à .nc pedidos de arquivos até 2GB (mesmo sem 64 bits Java ) através de uma melhor utilização de ERDDAP É a manipulação de dados em pedaços.
    * Muitas melhorias de velocidade 2X no código e 2X acelera de Java 1.6 make ERDDAP™ 2X a 4X mais rápido do que antes.
    * Melhorias significativas na poupança de memória ERDDAP Utilização da memória base.
    * Para conjuntos de dados tabulares, ERDDAP™ está agora totalmente ciente do cdm\\_data\\_type de um conjunto de dados, e como os dados mapeiam o tipo de CDM. Ver o [CF Especificação das geometrias de amostragem discreta](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Talvez algum dia em breve, esse arquivo do Word será convertido para .html e substituirá as informações atuais "OBSOLETO" naquela página web. Graças à NOAA Projecto UAF.
    * Para a maioria dos conjuntos de dados EDDTable, uma nova opção de tipo de arquivo de saída, .nc CF, cria Contiguous Ragged Array .nc ficheiros que estejam em conformidade com a última versão do [CF Convenções de geometrias de amostragem discretas](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Esses arquivos são estruturados para refletir o tipo de dados do MDL do conjunto de dados. Uma vez que as convenções propostas apenas mudaram, a partir desta escrita, a biblioteca netcdf-java ainda não suporta ler os formatos de arquivo criados por ERDDAP e interpretá-los como arquivos de dados CDM. Provavelmente em breve. Graças à NOAA Projecto UAF.
    * A opção View : Distinct Data na página .subset é agora uma lista suspensa que permite aos usuários especificar o número máximo de linhas de dados distintos a serem vistos (padrão = 1000) . Esta mudança, e outros, permitem ERDDAP™ trabalhar com conjuntos de dados que possuem um número muito grande de linhas de dados distintos. (O número de valores únicos para qualquer variável é ainda um problema, mas pode ser muito alto (20 mil?) antes do .subset e outras páginas da web carregarem muito lentamente.) Graças à NOAA Projecto UAF.
    * As páginas web .subset têm uma nova opção: Ver Contagens de Dados Distintas. Graças ao projeto GTOPP.
    * Para ajudar os utilizadores, os valores distintos (Por exemplo, nomes das estações) são agora mostrados nos formulários Make-A-Graph e Data Access Forms. Graças à NOAA Projecto UAF.
    * .transparente Os pedidos de Png agora suportam todos os tipos de gráficos e representações de dados. Desenha apenas os dados -- sem eixos, lendas, máscara de terra, ou qualquer outra coisa. Isso torna possível fazer imagens como camadas de Pngs transparentes. Se &.size=_largura_ | _altura_ é especificada na consulta (recomendado) É uma honra. O padrão é 360x360 pixels. A única excepção é EDDGrid &.draw=superface, onde o padrão (como antes) é uma imagem com ~1/pixel por ponto de dados (até 3000 x e y pixels) . Graças ao Fred Hochstaedter.
    * A WMS as páginas da web agora mostram a barra de cores da variável do conjunto de dados (s) . Graças a Emilio Mayorga e outros.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Este lançamento envolve muitas mudanças. São todos importantes. Por favor, seja paciente e trabalhe através de todas as alterações listadas abaixo.
    * Esta versão está sendo empurrada para fora mais cedo do que pretendia lidar com alguns Java Insectos de segurança. Infelizmente, vários recursos/fixos destinados a este ERDDAP™ versão não estão nesta versão. Desculpa. Espero que a próxima versão será relativamente em breve (e muito mais fácil de atualizar para) .
    * Para evitar vários erros de segurança Java 6 atualização 23 e abaixo, baixar e instalar a versão mais recente de Java   ( Java 6 atualização 24 ou superior) . Se você tem um sistema operacional de 64 bits, por favor, obter uma versão de 64 bits de Java .
    * Se você estiver usando Tomcat 5, você DEVE atualizar para Tomcat 6 ou 7 (preferido) . Se você estiver usando Tomcat 6, considere atualizar para Tomcat versão 7.
    * Siga todas as instruções para [criação de um novo ERDDAP™ ](/docs/server-admin/deploy-install) , mas onde for relevante, você estará copiando arquivos de sua antiga instalação para a nova instalação, nomeadamente o \\[ tomcat \\] /content/erddap diretório e arquivos. Como parte disso, note [novas recomendações de configuração Tomcat](/docs/server-admin/deploy-install#tomcat) .
    * O erddap.css padrão está agora incluído no arquivo erddap.war.
        * Para usar o erddap.css padrão, **apagar** seu velho \\[ tomcat \\] /content/erddap/images/erddap.css .
        * Se você modificou \\[ tomcat \\] /content/erddap/images/erddap.css, e quer continuar a usá-lo: basta deixá-lo no lugar e substituir o&lt;secção input&gt; com:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Na sua \\[ tomcat \\] /content/erddap/setup.xml:
        * Substituir os comentários e etiquetas relacionados&lt;parcialRequestMaxBytes&gt; e&lt;parcialPedidoMaxCells&gt; com
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Substituir os comentários relacionados com&lt; categoryAttributes &gt; e considere modificar o valor da tag:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Individual&lt; categoryAttributes &gt; que são atributos globais agora DEVE ser identificado através do prefixo global: (Por exemplo, a nível global: instituição) . Outros atributos são assumidos como atributos variáveis (Por exemplo, standard\\_name ) . Além disso, valores institucionais (os únicos) foram deixados no caso original. Agora todos os valores de categoria são convertidos para minúsculas.
    * Na sua \\[ tomcat \\] /content/erddap/ datasets.xml :
        * Grande melhoria: ERDDAP™ possui novos requisitos relacionados ao cdm\\_data\\_type de um conjunto de dados tabular. Notavelmente, cada conjunto de dados DEVE ter os metadados e variáveis corretas relacionadas ao tipo cdm\\_data\\_type. Se não, o conjunto de dados não irá carregar e irá lançar um erro. Ver a documentação para [cdm\\_data\\_tipo](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: Existe um novo tipo de conjunto de dados: EDDTableFromAsciiServiceNOS.
        * FYI: Existem três novos permitidos ioos\\_category opções: Hidrologia, Qualidade (Por exemplo, para bandeiras de qualidade) , e Estatísticas (Por exemplo, média) .
        * Para a tabela EDDDe... Arquivos conjuntos de dados, remover qualquer&lt;nDimensions&gt; tags. Eles já não são necessários ou usados.
        * Para variáveis com destinationName =altitude, ERDDAP™ já não força o long\\_name ser Altitude. Por favor, passe pelo seu datasets.xml e repetidamente procurar por&lt; destinationName &gt;altitude e adicionar a essa variável&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (ou um pouco diferente long\\_name em casos especiais) .
        * Opcional: Todas as variáveis de suporte EDDTableFromFiles [ sourceName =global:...](/docs/server-admin/datasets#global-sourcenames) converter metadados globais de cada arquivo em uma variável de dados. Graças à Lynn DeWitt.
    * EDDTableFromDatabase users -- ERDDAP™ vem com um novo driver JDBC 4 para Postgres. Para outras bases de dados, confira o arquivo JDBC .jar mais recente para o seu banco de dados. Desde ERDDAP™ agora usa Java 1.6+, JDBC 4 (não 3) é provavelmente recomendado.
    * FYI
        *    EDDGrid De...Arquivos e tabela EDD De... Os conjuntos de dados dos arquivos agora armazenam as informações da tabela de arquivos em
             \\[ bigPaitDirectório \\] /set de dados Informação/ \\[  datasetID  \\] /\\* .nc ficheiros.
Além disso, os conjuntos de dados EDDTable armazenam agora as informações de subconjunto em
             \\[ bigPaitDirectório \\] /set de dados Informação/ \\[  datasetID  \\] /\\* .nc ficheiros. Estes ficheiros costumavam ser
             \\[ bigPaitDirectório \\] /set de dados Informação/ \\[  datasetID  \\] .\\* .json ficheiros.
Os arquivos antigos serão excluídos automaticamente quando ERDDAP™ Começa. Ou, você pode excluir todos os arquivos (mas deixe os subdiretórios vazios) em \\[ bigPaitDirectório \\] /datasetInfo/.
        * Eu trabalhei em um novo EDDTableFromNcCFFiles que iria ler dados de arquivos locais e remotos usando o proposto, novas Convenções de Observação de Ponto CF. Mas não está neste lançamento. Existem problemas nas bibliotecas netcdf-java relacionados a alguns métodos para ler esses arquivos. E houve algumas mudanças muito recentes nas convenções de observação de pontos CF propostas. Quando a biblioteca netcdf-java for fixa e atualizada para a última proposta, vou retomar o trabalho sobre isso.
        * Em execução ERDDAP™ no Windows pode ter problemas: notavelmente, você pode ver no \\[ arquivo bigPaintDirectory/logs/log.txt que ERDDAP™ é às vezes incapaz de apagar e/ou renomear arquivos rapidamente. Isso é devido ao software antivírus (Por exemplo, de McAfee e Norton) que está verificando os arquivos para vírus. Se encontrar este problema (que pode ser visto por mensagens de erro no arquivo log.txt como "Não é possível excluir ...") , alterar as configurações do software antivírus pode aliviar parcialmente o problema.
Se a ERDDAP™ no Windows é apenas um teste em execução em seu desktop, isso é apenas um incômodo.
Se a ERDDAP™ no Windows é o seu público ERDDAP™ , considere mudar para um servidor Linux.
    * Primeiro arranque lento -- A primeira vez que corres ERDDAP™ após actualização, ERDDAP™ pode ser lento para carregar os conjuntos de dados. O caminho ERDDAP™ armazena informações sobre arquivos agregados mudou, então ERDDAP™ terá de reler algumas informações de todos esses arquivos. Isso vai levar tempo.
    * Erros na inicialização -- Dadas as alterações relacionadas ao cdm\\_data\\_type, é provável que alguns de seus conjuntos de dados não vão carregar e vão jogar erros. Leia cuidadosamente o e-mail do Daily Report que ERDDAP™ envia- o quando ERDDAP™ acabou de começar. Terá uma lista de conjuntos de dados que não carregaram (no topo) E a razão pela qual não carregaram (perto do fundo) .
    * Se você ficar preso ou tiver outras perguntas, envie-me os detalhes: erd.data at noaa.gov .
    * Programadores - O quê? Se você escrever Java programas que executam ERDDAP™ código, você precisa alterar algumas das referências de parâmetros de linha de comando:
        * Mudar joda-time-1.6.2.jar para joda-time. jar
        * Alterar o Postgres JDBC .jar referência a postgresql.jdbc.jar
*    **Pequenas alterações e correções de erros:** 
    
    * Melhor manuseio de conexão para evitar threads pendurados.
    * Práticas de concorrência melhoradas para lidar com pedidos quase simultâneos idênticos de forma mais eficiente.
    *    ERDDAP™ agora utiliza netcdfAll-4.2.jar (renomeado para netcdfAll-latest. jar) . Este switch exigiu várias alterações internas e causou algumas pequenas alterações externas, por exemplo, alterações na forma como os arquivos grib são lidos e pequenas alterações no .nc Saída do cabeçalho.
    * Nova funcionalidade: \\[ erddap \\] /convert/fipscouny.html converte FIPS Códigos do condado de/para os nomes dos municípios.
    * Nos mapas, os limites dos estados são violetas escuras, por isso destacam-se melhor em todas as cores de fundo.
    * Tabular .kml saída novamente usa um ícone circular para marcar pontos (não o ícone do avião O Google mudou recentemente para) .
    * Os conjuntos de dados erdCalcofi foram reorganizados e agora são servidos a partir de arquivos locais (mais rápido) .
    * Gerar conjuntos de dados Xml de Thredds O catálogo agora cria um arquivo de resultados:
         \\[ tomcat \\] /webapps/erddap/WEB-INF/temp/ EDDGrid DeThredsCatalog.xml . Graças ao Kevin O'Brien.
    * Gerar conjuntos de dados Xml de Thredds O catálogo agora tenta remover números de portas desnecessários dos URLs de origem (Por exemplo: 8080 e 8081 podem, por vezes, ser removidos) . Graças a NOAA Equipa de segurança da Central.
    * Para as páginas web .subset, o Mapa de Dados Distintos agora tem um intervalo lat lon variável.
    * Várias listas em ERDDAP™   (Por exemplo, a tabela que mostra todos os conjuntos de dados) foram classificados de modo que A.Z classificado antes de a. .z . Agora eles resolvem de uma forma insensível.
    * Pequenas alterações nas páginas web .subset, incluindo: as unidades estão agora indicadas.
    * Gerar conjuntos de dados Xml e DasDds já não lançam uma exceção se não puderem colocar os resultados na área de transferência do sistema ou no displayInBrowser. Graças ao Eric Bridger e ao Greg Williams.
    * Correcção de erros: Quando os conjuntos de dados são carregados, ERDDAP™ agora remove ou ajusta os atributos geoespaciais globais. Graças ao Charles Carleton.
    * Correção de Bug: String2.getClassPath () agora decodifica corretamente a classe Localização (notavelmente, no Windows, espaços no nome do arquivo apareceram como% 20) . Afectado ERDDAP™ EDStatic chamando SSR.getContextDirectory () e encontrar conteúdo/erddap. Graças ao Abe Coughlin.
    * Correcção de Bug: no EDDTableFromFiles relacionados ao tratamento getDataForDapQuery de distintos () pedidos. Graças ao Eric Bridger.
    * Correcção de erros: tabledap as solicitações não lidaram adequadamente com restrições de altitude quando a altitude do conjunto de dados MetrosPerSourceUnit foi -1. Graças ao Eric Bridger.
    * Correcção de Bug: EDDTableFrom... Os conjuntos de dados de arquivos agora lidam corretamente com solicitações que incluem =NaN e &#33;=NaN.
    
## Versão 1.28{#version-128} 
 (lançado 2010-08-27) 

*    **Novas funcionalidades:** nenhum.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** nenhum.
*    **Correcção de Erros:** Corrigir um erro de programação (Unicamente em ver 1.26) que fez ERDDAP™ Muito lento.
     

## Versão 1.26{#version-126} 
 (lançado 2010-08-25) 

*    **Novas funcionalidades:** nenhum.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** 
    * Da sua \\[ tomcat \\] /content/erddap/setup.xml,
        * In&lt;legal&gt;, em uma nova linha abaixo \\[ padrão DataLicenses \\] , inserir \\[ contato padrão \\] . \\[ contato padrão \\] refere-se à&lt;adminEmail&gt; especificado acima em setup.xml.
        * Remover&lt;TabelaCommonBGColor&gt; e&lt;tabelaHighlightBGColor&gt;.
        * Recomendado: Alterar&lt;endBodyHtml&gt; para
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Necessário: Para o seu \\[ tomcat \\] /content/erddap/images/erddap.css e erddapAlt.css, adicionar na parte inferior:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Correcções de Erros e Pequenas Alterações:** 
    
    * Correção de Bug: em algumas situações, os formulários não funcionaram em algumas versões do Internet Explorer. Muito obrigado ao Greg Williams.
    * Correcção de erros: Os botões Fazer um Gráfico não funcionaram se o conjunto de dados fosse de um remoto ERDDAP .
    * Correcção de erros: WMS às vezes não funcionava se o conjunto de dados era de um remoto ERDDAP .
    * Muitas pequenas alterações e correções de erros.
    

## Versão 1.24{#version-124} 
 (lançado 2010-08-06) 

*    **Novas funcionalidades:** 
    * Novo [Subset páginas Web](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) usar a pesquisa facetada para selecionar subconjuntos de conjuntos de dados tabulares. Graças ao POST.
    * Novo [Pesquisa Avançada](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) combina todas as outras opções de pesquisa e adiciona caixas de longitude, latitude e limite de tempo. Graças à Elly Montgomery. (Desculpe o atraso.) 
    * Novo [Converter Hora](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) página web e serviço permitem converter tempos numéricos para / a partir de ISO string times.
    * Novo [Converter Unidades](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) página web e serviço deixar você converter UDUNITS a/de unidades UCUM. Graças a NOAA IOOS SOS .
    * Se a tabledap a solicitação inclui & unidades ("UCUM") , os nomes das unidades serão convertidos de nomes originais (geralmente UDUNITS ) para [UCUM](https://unitsofmeasure.org/ucum.html) Nomes das unidades. Isto só afecta as unidades\\*nomes\\*, não valores de dados. Graças a NOAA IOOS SOS .
    * Melhorias para fazer um gráfico páginas web e gráficos e mapas:
        * Se o gráfico for um mapa, existem novos botões Fazer um gráfico para ampliar/desligar e uma nova opção para clicar para alterar o ponto central do mapa. Graças ao POST.
        * Configurações do filtro adicionadas perto do fundo. Graças ao Greg Williams.
        * Os arquivos de dados construídos no litoral foram atualizados para GSHHS v2.0. Graças ao POST.
        * Os mapas agora incluem lagos e rios. Graças ao POST. (Desculpe, o rio Sacramento Delta está faltando porque nem os dados da costa nem o conjunto de dados lago / rio lida com ele.) 
        * Os arquivos de nação/estado derivados do pscoast foram atualizados. Graças ao POST.
        * Topografia.cpt foi ligeiramente modificada. (Desculpa se isto te afecta negativamente.) Graças ao POST.
        * No Graph Make A do griddap, se um usuário mudar uma variável, o formulário é automaticamente resubmetido para que o axisVariable s' showStartAndStop reflete sempre as variáveis do gráfico. Graças ao Joaquin Trinanes.
        * Para URLs de imagens png e pdf:
            * Novo &.land=_value_, onde _value_ pode ser "sub" (mostrar topografia) ou "excesso" (apenas mostrar batimetria) . Se não for especificado, o padrão é definido por [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) em datasets.xml ou setup.xml. Graças ao POST.
            * Novo: linhas na legenda que são muito longas são automaticamente quebradas em várias linhas. Graças ao POST.
        * Para URLs de imagens png:
            * Novo &.legend=_value_, onde _value_ pode ser "Bottom" (padrão) , "Off" ou "Somente". Isto permite-lhe incluir a lenda, excluir a lenda, ou obter apenas a lenda. Graças à Cara Wilson.
            * Novo &.trim=_n Pixels_ deixa uma borda de nPixels (Por exemplo, 10) no fundo da imagem. É aplicado após .legend=Off. Graças à Cara Wilson.
            * Novo &.size=_largura_ | _altura_ permite especificar a largura e a altura da imagem, em pixels.
    * Novos formatos de arquivo de saída:
        * .csvp e .tsv p -- como .csv e .tsv , mas com " (_unidades_) " adicionado aos nomes das colunas na primeira linha.
        * .odvTxt -- faz um arquivo .txt que simplifica a entrada de dados [Dados Oceânicos Ver (ODV) ](https://odv.awi.de/) .
        * .esriCsv -- torna um arquivo .csv adequado para importação no ESRI ArcGIS . (somente conjuntos de dados tabulares) Graças a Jan Mason, Jeff de La Beaujardiere, e NOAA IOOS SOS projecto.
    * Melhorias da GUI [Categorizar](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) Páginas web. Além disso, a categorização dos valores (excepto instituição) agora estão todos minúsculos. Pedidos não em minúsculas são aceites (redirecionado) para compatibilidade para trás. Graças ao Roy Mendelssohn.
    * Mensagens de erro agora são ainda mais curtas e mais orientadas para os usuários. Graças ao Greg Williams.
    * Uma mudança interna que reduz muito ERDDAP Utilização da memória base.
    * Muitas novas características que só são relevantes para o projeto POST.
*    **Coisas ERDDAP™ Os administradores precisam saber e fazer:** Há muitas mudanças. Desculpa. Mas cada um traz bons benefícios.
    * Grandes mudanças para GerarDatasetXml -- agora muitas vezes faz mais perguntas (ver o [conjunto de dados Tipos](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) informação) e agora sempre gera conteúdo essencialmente pronto para uso para datasets.xml . Você ainda é responsável pela configuração, então você ainda deve rever o datasets.xml conteúdo antes de usá-lo. Um humano que se esforce no projeto sempre fará melhor do que um programa de computador. Graças ao projecto UAF.
    * REQUERIDO: Em setup.xml, você deve revisar o WMS secção. Deve agora incluir estas etiquetas (mas sinta-se livre para mudar os valores) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUERIDO: Em setup.xml, copiar e colar este novo sugerido&lt;startHeadHtml&gt; para substituir sua versão antiga. Mas sinta - se à vontade para fazer mudanças para suas preferências.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Graças a POST, Hans Vedo e Rick Blair.
    * EXIGIDO: Em setup.xml, em&lt;startBodyHtml&gt;, alterar a&lt;corpo&gt; tag para ser justo&lt;corpo&gt;, uma vez que o estilo é agora definido por erddap.css.
    * EXIGIDO: Em setup.xml, mude para isto&lt;endBodyHtml&gt; (mas mude o endereço de email para o seu endereço de email e sinta-se livre para fazer outras alterações) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * RECOMENDADO ALTAMENTE: Em setup.xml, o recomendado&lt;theShortDescriptionHtml&gt; está agora
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Sinta-se à vontade para mudar isso, especialmente a última frase do primeiro parágrafo.
    * Em setup.xml, e-mailEverythingTo e emailDailyReport Para agora pode ser separado por vírgula listas de endereços de e-mail. O primeiro emailEverything Para é especial, por exemplo, assinaturas para EDDXxxxFromErddap datasets usar esse endereço de e-mail. Graças ao John Maurer.
    * Os erros de e- mail estão agora registados no \\[ bigPaitDirectório \\] /logs/emailLogYYY-MM-DD.txt ficheiro.
    * No setup.xml, existe um novo parâmetro opcional para definir as propriedades da conta de email (geralmente logo após&lt;e-mailPassword&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

O padrão não é nada. Graças ao Rich Signell.
    * REQUISITOS: Se utilizar EDDTableCopy ou EDDGrid Entendido, você deve DELETE tudo \\[ bigPaitDirectório \\] /copy/ diretórios e arquivos que contêm "xh" no diretório ou nomes de arquivos após parar o antigo ERDDAP™ e antes de começar o novo ERDDAP™ Então esses arquivos serão copiados novamente. Sinto muito, mas foi importante fazer a mudança e espero que isso afete poucos administradores e poucos arquivos.
No Linux, você pode encontrar estes arquivos com, cd \\[ bigPaitDirectório \\] /cópia
encontrar.\\*xh\\*  
No Windows, você pode encontrar estes arquivos com, Iniciar | Pesquisar
O que você deseja pesquisar: Documentos
Tudo ou parte do nome do ficheiro: xh
Procurar em: Navegar -&gt; \\[ bigPaitDirectório \\] /cópia
Clique em 'Procurar'
^A para selecionar todos eles
Del para apagar todos eles
    * REQUISITOS: datasets.xml , para EDDTableFromDatabase datasets, para variáveis de data e horário, alterar os dados Digite para dobrar e as unidades para segundos desde 1970-01-01T00:00:00Z. EXIGEMOS que você armazene dados de timestamp no banco de dados\\*com\\*Um fuso horário. Sem informação do fuso- horário, as consultas que ERDDAP™ envia para a base de dados e os resultados que ERDDAP™ sai do banco de dados via JDBC são ambíguos e provavelmente estão errados. Nós tentamos, mas não encontramos uma maneira confiável de lidar com dados de "tempo sem fuso horário". Seja como for, achamos que isto é uma boa prática. Afinal, "timestamp without timezone" dados tem um fuso horário implícito. Embora seja ótimo que o fuso horário seja óbvio para o administrador do banco de dados, faz sentido especificá-lo explicitamente para que outro software possa interagir corretamente com o seu banco de dados. Obrigado/desculpe Michael Urzen.
    * RECOMENDADOS ALTAMENTE: datasets.xml , para ativar .subset páginas web para pesquisa facetada de seus conjuntos de dados tabulares, você precisa adicionar [&lt; subsetVariables &gt;] (/docs/server-admin/datasets# subsetvariables) para os atributos globais do conjunto de dados.
    * RECOMENDADO: datasets.xml , se você tem o conjunto de dados com datasetID ="pmelGtsppp", por favor, altere-o para ser
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMENDADO: datasets.xml , existem novas opções válidas para o [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) atributo global, então você deve rever/alterar o valor para seus conjuntos de dados.
    * In datasets.xml , o novo [&lt;sourceNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#source needsexpandedfp_eq) é útil se o servidor fonte não manusear &_variable_\\=_value_ testes corretamente (por causa da [dificuldade geral de testar a igualdade de números de pontos flutuantes](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . sourceNeedsExpandedFP\\_EQ é definido como true por padrão (a configuração mais segura) Não precisas de fazer alterações.
    * Novo [Tabela EDDDeAssiiFiles](/docs/server-admin/datasets#eddtablefromasciifiles) . Graças ao Jerry Yun Pan.
    * Novo [Tabela EDDDeThredsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Graças ao Roy Mendelssohn.
    * Alterações a [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) permite ser usado com uma gama mais ampla de arquivos.
    * A EDDTableFromBMDE foi desactivada. Já não existem fontes de dados activas e adequadas.
    * Na GerarDatasetXml, o novo EDDGrid DeThreds Catálogo colhe um catálogo ThREDS inteiro (ou um subconjunto) e gera datasets.xml conteúdo. Graças ao projecto UAF.
    * Gerar conjuntos de dados Xml e DasDds agora também colocar seus resultados em \\[ bigPaitDirectório \\] /logs/log.txt. Graças ao Rich Signell e ao Charles Carleton.
    * Muitas melhorias no sistema de login. Graças ao POST.
*    **Coisas ERDDAP™ Programadores Necessidade de saber e fazer:** 
    * Houve alterações no diretório /Web-INF/lib/. Por favor, altere suas configurações javac e java classpath de acordo.
    * Há uma nova \\[ sua Url \\] /erddap/version service para determinar a versão de um ERDDAP . A resposta é texto, por exemplo, ERDDAP \\_versão=1,24 Se receber uma mensagem de erro HTTP 404 Not-Found, trate a ERDDAP™ como versão 1.22 ou inferior. Graças ao POST.
*    **Pequenas alterações e correções de erros:** 
    
    * Tabela EDDDe Alterações de sos:
        * Suporte abandonado para ler IOOS SOS Respostas XML.
        * Adicionado suporte para ler IOOS SOS texto/csv. (Então, NOS SOS os servidores atualmente não são suportados.) 
        * Fez muitas mudanças relacionadas ao IOOS SOS detalhes do servidor.
        * Adicionado suporte para consultas BBOX para IOOS SOS e OOSTethys   SOS servidores. Essas mudanças resultam em uma grande aceleração para solicitações de dados relevantes. Graças a IOOS SOS .
    * Texto em .mat arquivos de dados tabulares agora são salvos corretamente. Graças ao Roy Mendelssohn.
    *    WMS 
        *    OpenLayers é agora empacotado com ERDDAP™ para utilização na WMS Páginas web. Isto corrige o problema causado quando OpenLayers mudou há alguns meses e previne problemas futuros.
        * Na WMS   GetCapabilities resposta&lt;Recursos Online&gt; o valor agora é o URL do WMS serviço. Graças ao Charlton Galvarino.
        * Uma lenda é exibida na WMS página web para mostrar a barra de cores. Graças ao Emilio Mayorga.
    *    EDDGrid Agregate ExistingO construtor da dimensão teve problemas se uma fonte do eixo Os valores não eram iguais ao seu destino Valores, por exemplo, se o tempo de origem foi algo diferente "seconds since 1970-01-01" . Graças a Todd Spindler.
    * Em TableWriterGeoJson, o excesso ',' após bbox \\[ ... \\] foi removido. Graças ao Greg Williams.
    * Muitas pequenas alterações e correções de erros.
    
## Versão 1.22{#version-122} 
 (lançado em 2009-07-05) 

* O erro SlideSorter introduzido em 1.20 é corrigido.
* O bug OBIS introduzido em 1.20 é corrigido.
* As referências aos conjuntos de dados de Jason na página imagens/gadgets/GoogleGadgets foram removidas.
     
## Versão 1.20{#version-120} 
 (lançado em 2009-07-02) 

*    ERDDAP™ administradores, por favor adicione isso ao seu arquivo setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Novos tipos de conjuntos de dados [ EDDGrid Copiar](/docs/server-admin/datasets#eddgridcopy) e [EDDTableCopy](/docs/server-admin/datasets#eddtablecopy) fazer e manter uma cópia local de outro EDDGrid ou EDDTable dataset e servir dados da cópia local. Estes são muito fáceis de usar e muito eficaz **soluções para alguns dos maiores problemas com o fornecimento de dados de fontes de dados remotas:** 
    
    * O acesso a dados de uma fonte de dados remota pode ser lento (por várias razões) .
    * O conjunto de dados remotos às vezes não está disponível (novamente, por uma variedade de razões) .
    * Confiar em uma fonte para os dados não escala bem (Por exemplo, quando muitos utilizadores e muitos ERDDAP ut) .
    
Além disso, a cópia local é um backup do original, que é útil no caso de algo acontecer com o original.
    
Não há nada de novo em fazer uma cópia local de um conjunto de dados. O que é novo aqui é que estas classes fazem\\*fácil\\*para criar e\\*manter\\*uma cópia local dos dados de uma\\*variedade\\*de tipos de fontes de dados remotas e\\*adicionar metadados\\*ao copiar os dados.
    
Estes tipos de conjuntos de dados fazem parte de um conjunto completo de funcionalidades que simplificam a criação de [grelhas/clusters/federações de ERDDAP s](/docs/server-admin/scaling) para lidar com cargas muito pesadas (Por exemplo, num centro de dados) .
    
* Novo tipo de conjunto de dados [Tabela EDDDeDatabase](/docs/server-admin/datasets#eddtablefromdatabase) obtém dados de uma tabela de banco de dados local ou remota.
*    ERDDAP™ agora tem uma [segurança](/docs/server-admin/additional-information#security) sistema que suporta autenticação (permitindo que os usuários entrem) e autorização (concessão de acesso a determinados conjuntos de dados privados) .
* Há [duas, novas, ferramentas de linha de comando](/docs/server-admin/datasets#tools) ajudar ERDDAP™ os administradores geram o XML para um novo conjunto de dados datasets.xml :
    * Gerar conjuntos de dados Xml pode gerar um rascunho do conjunto de dados XML para quase qualquer tipo de conjunto de dados.
    * DasDds ajuda você a testar e refinar repetidamente o XML para um conjunto de dados. ERDDAP Gerar conjuntos de dados As páginas web do Xml foram removidas. Por razões de segurança, eles só suportaram alguns tipos de conjuntos de dados. As novas ferramentas de linha de comando são uma solução melhor.
* A nova [página de status](/docs/server-admin/additional-information#status-page) deixa qualquer um (mas, nomeadamente, administradores) ver o estado de uma ERDDAP™ de qualquer navegador indo para \\[ baseUrl \\]  /erddap/status.html .
* O Tabledap agora suporta [funções do lado do servidor](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * &distinct () remove linhas duplicadas da tabela de resposta,
    * & orderBy  (...) permite- lhe especificar como deve ser ordenada a tabela de respostas,
    * & orderByMax  (...) permite- lhe especificar como a tabela de respostas deve ser ordenada e remove todas as linhas, excepto as linhas com os valores máximos na última coluna especificada. Isto pode ser usado, por exemplo, para obter os últimos dados disponíveis para cada estação.
* Os conjuntos de dados tabulares agora podem incluir variáveis adicionais de dataTime que não são nomeadas "time" . Essas variáveis são reconhecidas por seus metadados "unidades", que devem conter " since "   (para a data numérica Vezes) ou "yy" ou "YY" (para data de texto formatadaTimes) . Mas, por favor, use o destinationName   "time" para a data principal Variável temporal.
*    ERDDAP™ agora gera uma [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) arquivo, que diz motores de busca que seu ERDDAP Só precisa de ser arrastado todos os meses. ERDDAP™ administradores, por favor siga [estas instruções](/docs/server-admin/additional-information#sitemapxml) para notificar os motores de busca sobre o novo arquivo sitemap.xml.
*    ERDDAP as mensagens de erro são agora muito mais curtas e direcionadas para os clientes (não programadores) . Graças ao Greg Williams.
* [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) agora também suporta endereços IP onde o último número foi substituído por \\*.
* Pedidos de .json e .geoJson arquivos podem agora incluir um opcional [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) request adicionando "& .json p=_functionName_" até o fim da consulta. Basicamente, isto diz ERDDAP™ para adicionar "_ functionName_ ("para o início da resposta e ") " até o fim da resposta. Se originalmente não houve nenhuma consulta, deixe de lado o "&" em sua consulta. Graças ao Greg Williams.
* Muitas novas estatísticas foram adicionadas ao [Relatório Diário](/docs/server-admin/additional-information#daily-report) .
* Em páginas web com listas de conjuntos de dados, instituição e id estão agora na extrema direita. Isso move a assinatura e outras colunas mais úteis para visualização em telas de computador estreitas.
* Em todas as páginas web, o título da página (com base no&lt;Título&gt;&lt;startHeadHtml&gt; que você define no setup.xml) é modificado para incluir uma melhor descrição da página web (por exemplo, incluindo o título e a instituição do actual conjunto de dados) .
* As informações Xmx estão agora incluídas com as informações de memória impressas no log.txt, no Daily Report e no status.html. Graças à Elly Montgomery.
*    ERDDAP™ tem proteção adicional, de finalidade geral contra todos os erros (Por exemplo, OutOfMemoryError) . Graças ao Charles Carleton.
* Melhorias no tratamento de erros se a resposta já tiver sido cometida.
* MELHORADO: EDDTableFromFiles e EDDGrid FromFiles agora apenas permite&lt;metadadosDe&gt; primeiro ou último. penúltimo não é mais suportado. E primeiro e último são agora baseados no último ModifiedTime dos arquivos.
* Correcção de erros: na tabela EDDDe SOS , informações inválidas para uma estação lançou uma exceção e fez com que todo o conjunto de dados fosse rejeitado. Essas estações são ignoradas. (e a mensagem de erro está logada no log.txt) . Graças ao Rick Blair.
     

## Versão 1.18{#version-118} 
 (lançado em 2009-04-08) 

* Correção de Bug: A partir de 1.14, o EDDTable Data Access Form e Make A Graph Web page não lidou corretamente com restrições citadas.
* Correção de Bug: A partir de 1.14, EDDTableFromDapSequence não lidou com restrições de tempo corretamente se as unidades de tempo de origem não eram "segundos desde 1970-01-01T00:00:00".
     

## Versão 1.16{#version-116} 
 (lançado 2009-03-26) 

*    ERDDAP™ administradores:
    * Esta é uma versão importante porque corrige um erro que deixou uma ERDDAP™ thread em execução se você usou Tomcat Manager para parar/iniciar ou recarregar ERDDAP . Assim, quando você instalar 1,16, não use apenas o gerenciador Tomcat para desempregar o antigo ERDDAP™ e implantar o novo ERDDAP . Em vez disso: **desempregar o velho ERDDAP™ , reiniciar Tomcat (ou o servidor) , em seguida, implantar o novo ERDDAP .** É sempre uma boa ideia fazer isso ao instalar uma nova versão.
    * Adicionar [&lt;requestBlacklist&gt;&lt;/request Blacklist&gt;] (/docs/server-admin/datasets#requestblacklist) à sua datasets.xml . Isto pode ser usado para indicar uma lista de endereços IP do cliente a bloquear (Por exemplo, para evitar um ataque de negação de serviço ou um robô web demasiado zeloso) .
* Há agora um \\[ bigPaitDirectório \\] /logs pasta para manter o ERDDAP™ ficheiros de registo. Quando começares ERDDAP™ , faz uma cópia de arquivo do log.txt e log. arquivos txt.anteriores com um carimbo de tempo. Se houve problemas antes do reinício, pode ser útil analisar esses arquivos.
*    ERD 's ERDDAP™ Agora o sistema de assinatura está ligado.
*    ERDDAP™ mais uma vez permite (mas ainda não recomenda) a codificação "% 26" de "&" em URLs de pedidos (ver o [Alteração do v1.14 relacionada](#percent26) ) .
* Várias novas adições à secção Tally do [Relatório Diário](/docs/server-admin/additional-information#daily-report) .
* Pequenas correções de erros na geraçãoDatasetsXml.
* Algumas pequenas correções de erros.
     

## Versão 1.14{#version-114} 
 (lançado 2009-03-17) 

* Alterações para usuários:
    * Nas solicitações de dados da rede, ERDDAP™ agora suporta: [last- n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) onde n é um número inteiro de índices e [ (last- d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) onde d é um valor numérico (para o tempo, é em segundos) .
    * Em pedidos de dados tabulares, restrições de texto agora exigem [aspas duplas](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) em torno do valor, por exemplo, &id="NDBC40121" Isto é exigido pela DAP protocolo.
    * Em pedidos de dados tabulares, ERDDAP™ agora exige que [todas as restrições serão devidamente codificadas por cento](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Navegadores fazem isso automaticamente, então isso afeta principalmente programas de computador / scripts que estão acessando ERDDAP .
#### Percentagem26{#percent26} 
*    [Anteriormente,](#percent26) a [incorporar uma página web de gráficos](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) e a [ ERDDAP™ Página Web do Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) dito para substituir o "&" na URL da imagem por "% 26". A partir de agora, você deve substituir o "&" na URL da imagem por "&amp;". Então você precisa substituir qualquer "% 26" em páginas existentes e Google Gadgets por "&amp;". (Desculpa.) 
*    ERDDAP™ administradores, por favor:
    * Adicionar o seguinte à sua [setup.xml](/docs/server-admin/deploy-install#setupxml) arquivo (e mudar a bandeira Valor da chaveKey) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Na linha depois&lt;e-mailUserName&gt; no seu [setup.xml](/docs/server-admin/deploy-install#setupxml) arquivo, adicionar
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
e digite sua senha real.
    * Você pode mudar&lt;wmsSampleBBox&gt; na sua [setup.xml](/docs/server-admin/deploy-install#setupxml) ficheiro para incluir valores de longitude até 360, por exemplo,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Na sua datasets.xml arquivo, renomear o tipo de conjunto de dados EDDTableFromNc4DFiles para EDDTableFromNcFiles (que agora suporta arquivos com qualquer número de dimensões) . Se você tivesse um conjunto de dados EDDTableFromNc4DFiles:
        
        1. Você deve mudar para type="EDDTableFromNcFiles" em seus conjuntos de dados. Ficheiro XML.
        2. Você deve adicionar um&lt;nDimensões&gt; 4&lt;/nDimensions&gt; tag para XML do conjunto de dados.
        3. Você pode adicionar o novo&lt;sortFilesBySourceNames&gt; tag para especificar a ordem interna para os arquivos, que determina a ordem geral dos dados retornados.
        
Para mais pormenores, ver [EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles) .
    * No passado, para EDDTableFromDapSequence, para OPeNDAP Servidores DRDS, em datasets.xml , usamos&lt;sourceCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Mas agora vemos que o suporte DRDS regex é mais limitado do que ERDDAP É, por isso recomendamos&lt;fonteCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; para que as restrições de regex não sejam passadas para o código fonte, mas são tratadas pelo ERDDAP .
    * Manipulação renovada do código-fonteCanConstrain... em datasets.xml por [EDDTableFromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence) e (internamente) todos os tipos de conjuntos de dados EDDTable. O novo sistema é mais simples e reflete melhor a variabilidade de diferentes fontes de dados. Você pode precisar modificar o XML para seus conjuntos de dados datasets.xml .
* Existem várias novas características que são úteis por si só, mas quando combinados, também facilitar a criação de [grelhas/clusters/federações de ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Novos tipos de conjuntos de dados:
        *    [ EDDGrid FromErddap](/docs/server-admin/datasets#eddfromerddap) e [Tabela EDDDerddap](/docs/server-admin/datasets#eddfromerddap) que deixa um ERDDAP™ incluir um conjunto de dados de outro ERDDAP™ de uma forma muito simples e muito eficiente.
        *    [ EDDGrid De Arquivos](/docs/server-admin/datasets#eddgridfromfiles)   (e a sua subclasse, [ EDDGrid FromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles) que pode ler NetCDF   .nc , GRIB .grb, e HDF   .hdf arquivos) .
        *    [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) que pode ler NetCDF   .nc que têm uma estrutura de mesa.
    * RunLoadDatasets e LoadDatasets foram renovados de modo que ERDDAP™ é muito sensível para recarregar conjuntos de dados com base em arquivos no [bandeira](/docs/server-admin/additional-information#flag) diretório (muitas vezes&lt;5 segundos se a carga principalDatasets é feito atualmente).
    * Novo serviço para permitir [um URL para criar um arquivo de bandeira](/docs/server-admin/additional-information#set-dataset-flag) para um determinado conjunto de dados, por exemplo,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
cria um arquivo flag no diretório flag para rPmelTao (embora a bandeira A chave aqui está errada) .
    * Novo [subscrição](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) serviço para que qualquer cliente possa especificar uma ação que será feita quando um conjunto de dados específico for criado (quando ERDDAP™ é reiniciado) e sempre que o conjunto de dados muda de qualquer forma. Este sistema pode ser desativado via&lt;subscriptionSystemActive&gt; na sua [setup.xml](/docs/server-admin/deploy-install#setupxml) Arquivo. A ERDDAP™   [Relatório Diário](/docs/server-admin/additional-information#daily-report) agora lista todas as assinaturas e inclui a URL necessária para cancelar cada uma, no caso de você sentir que o sistema está sendo abusado. In datasets.xml , há um novo, opcional [&lt;subscrição EmailBlacklist&gt;] (/docs/server-admin/datasets# subscriptionemailblacklist) tag para que os administradores possam especificar uma lista separada por vírgula de endereços de email que são imediatamente listados no sistema de assinatura.
    * Novo [&lt;onChange&gt;] (/docs/server-admin/datasets# onchange) atributo em datasets.xml deixa o ERDDAP™ administrador especifique uma ação que será feita quando for criado um conjunto de dados específico (quando ERDDAP™ é reiniciado) e sempre que o conjunto de dados muda de qualquer forma.
    * Melhorias na pesquisa de texto completa: armazenar a string de pesquisa para cada conjunto de dados agora usa 1/2 a memória. O algoritmo de pesquisa (Boyer-Moore) é agora 3X mais rápido.
    * E- mails de ERDDAP™ agora sempre preparar o assunto e conteúdo com \\[ erddap Url \\] , para que fique claro qual ERDDAP™ Isto veio de (no caso de administrar múltiplos ERDDAP s) .
    * Recolha de estatísticas mais amplas para [Relatório Diário](/docs/server-admin/additional-information#daily-report) e- mail.
    * Novo ficheiro de registo \\[ bigPaitDirectório \\] /emailLogYEAR-MM-DD.txt registra todos os e-mails enviados por ERDDAP™ todos os dias. Isto é especialmente útil se o seu servidor não conseguir enviar e-mails -- você pode pelo menos lê-los no log.
    *    ERDDAP™ agora faz um \\[ bigPaitDirectório \\] /cache/ ( datasetID ) diretório para cada conjunto de dados, uma vez que pode haver muitos arquivos em cache.
* Novo [ RSS 2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) alimentação para cada conjunto de dados (procurar a laranja RSS ícones em listas de conjuntos de dados, formulários de acesso de dados e páginas da web do Make A Graph) .
*    EDDGrid   .kml respostas agora usam imagens em mosaico ("superoverlays" -- imagens quadtree geradas dinamicamente) . A imagem inicial carrega para o GoogleEarth muito mais rápido do que antes. A resolução do mapa aumenta à medida que você amplia, até a resolução completa do conjunto de dados. Recomendar: os usuários devem solicitar .kml por um ponto de tempo, mas toda a longitude do conjunto de dados, intervalo de latitude. Infelizmente, o suporte para intervalos de tempo foi removido (Espero que volte.) .
*    ERDDAP™ agora adiciona [Expira os cabeçalhos da idade máxima do 'Cache- Control'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) para todos os arquivos solicitados do diretório /images. Isto reduz consideravelmente o número de pedidos de ficheiros estáticos enviados para ERDDAP e assim acelera muito a maioria ERDDAP™ Carregamento de página. Além disso, muitos Java Referências de arquivos de script movidas para o fundo de suas páginas HTML, que também acelera muitos ERDDAP™ Carregamento de página. Graças ao livro "High Performance Web Sites" de Steve Souders e a adição ySlow ao plugin FireBug em FireFox.
*    ERDDAP™ netcdf-java 2.2.22 para netcdf-java 4.0. Entre outras coisas, isso permite EDDGrid DeNcFiles para ler HDF   .hdf , bem como GRIB .grb e NetCDF   .nc ficheiros.
*    EDDGrid Dap e EDDGrid FromNcFiles agora também suporta DArray (bem como DGrid)   dataVariable s. Se uma dimensão não tiver uma variável de coordenadas correspondente, ERDDAP™ cria uma variável de eixo com os valores do índice (Por exemplo, 0, 1, 2, ..., 311, 312) . Assim, todos os outros aspectos de EDDGrid permanecer o mesmo:
\\* Ele ainda serve todos os conjuntos de dados como Grades, com uma variável de eixo para cada dimensão.
\\* As consultas ainda podem solicitar valores das variáveis do eixo.
Graças a Charles Carleton, Thomas Im, Dorian Raymer, e outros.
* A WMS   OpenLayers páginas agora têm uma longitude padrão, intervalo de latitude que é um pouco maior do que o intervalo do conjunto de dados (não o intervalo exato, então o contexto de pequenos conjuntos de dados é mais óbvio) . O intervalo padrão agora também pode ser de 0 a 360, o que permite que a gama completa de muitos conjuntos de dados seja mostrada agora. Graças a Todd Spindler.
* Novos controles deslizantes em alguns formulários de acesso de dados e fazer um gráfico páginas web. Eles simplificam (bruto) especificação dos dados desejados e oferecer bom feedback visual.
* Uma nova opção para o&lt;Conjunto de dados&gt; tags em datasets.xml : [ativo="falso"](/docs/server-admin/datasets#active) .
* Referências a ERD 's ERDDAP™ mudada de litowatch.pfel (ainda funciona via proxy) para litoverwatch.pfeg (preferido) .
* Novo suporte para [ data\\_min e data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) atributos de metadados variáveis.
* Uma solução parcial para [WaitThenTryAgain / Exceção de Resultados Parciais](/docs/server-admin/additional-information#waitthentryagain-exception) : Agora, algumas solicitações que falharam anteriormente quando uma mudança de fonte de dados foi detectada terão sucesso porque ERDDAP™ irá recarregar o conjunto de dados e solicitar automaticamente os dados, tudo no contexto da solicitação original.
* Correcção de erros: gerar Conjuntos de dados O Xml foi desativado em ERDDAP™ versão 1.12. Graças à Ellyn Montgomery por apontar isto.
* Pequenas alterações no tratamento de erros.
* Muitas melhorias para evitar / lidar com possíveis condições de corrida (isto é, possíveis problemas decorrentes da natureza multi-threaded de ERDDAP ) que causou problemas pequenos e pouco frequentes.
* Agora, se uma mensagem de erro for escrita em uma imagem, a imagem só ficará na cache por ~5-10 minutos (não 60) . Graças à Cara Wilson.
* A mensagem padrão quando não há dados agora é "Sua consulta não produziu resultados correspondentes.", que é mais curta, precisa e combina OPeNDAP servidores.
*    EDDGrid não permite mais valores do eixo amarrado.
* Pequenas alterações aos pedidos de ajuda .ver e ..
* Muitas pequenas alterações e correções de erros.
     

## Versão 1.12{#version-112} 
 (lançado em 2008-10-31) 

* Tabela EDDDe SOS mais uma vez funciona com o NDBC SOS e trabalha com o novo NOS SOS .
* EDDTableFromBMDE agora requer ERDDAP™ administrador para especificar dataVariable s.
*    EDDGrid já não exige que lat e lon sejam uniformemente espaçados para . transparente Png ou .kml . Graças a Todd Spindler.
* Algumas pequenas mudanças.
     

## Versão 1.10{#version-110} 
 (lançado 2008-10-14) 

* Novos metadados "colorBar" para as variáveis de dados datasets.xml define a configuração padrão da barra de cores para gráficos e mapas. Ver [mais informações](/docs/server-admin/datasets#color-bar-attributes) . Isso é importante porque melhora muito a aparência dos gráficos e mapas padrão produzidos por Make A Graph e porque os gráficos e mapas padrão agora têm uma barra de cores consistente, mesmo quando o cliente muda o tempo solicitado ou intervalo geográfico. Além disso, isto foi necessário para WMS .
*    ERDDAP™ agora serve a maioria dos dados da grade através de uma WMS serviço. Isto é importante porque mostra que, além de obter dados de muitos tipos de servidores de dados, ERDDAP™ pode distribuir dados através de diferentes protocolos ( DAP , WMS , ... mais no futuro) . Ver o [documentação do cliente](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . Ou o [documentação para os administradores](/docs/server-admin/datasets#wms) . Ou [Experimenta.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Novo suporte para valores de longitude &gt; 180 em .kml ficheiros.
* Novo cdm\\_data\\_type: Outro .
*    ERDDAP™ agora suporta dados de código "boolean". Ver [mais informações](/docs/server-admin/datasets#boolean-data) Isso se tornará útil para o futuro EDDTableFromDatabase.
* O novo EDDTableFromBMDE suporta fontes de dados DiGIR/BMDE.
* O EDVGridAxis agora permite valores ordenados decrescentes. Os conjuntos de dados do pmelOscar precisavam disso.
*    ERDDAP™ agora retorna erros HTTP (Por exemplo, "404 para recurso/página não encontrada") em mais situações, em vez de páginas HTML com mensagens de erro.
* Muitas alterações/adições ao ERDDAP™ documentação.
* Muitas pequenas mudanças.
* Alguns erros.
*    **Coisas ERDDAP™ administradores devem fazer para atualizar para esta versão:** 
    * In datasets.xml , para qualquer tabela EDDDe SOS conjuntos de dados, alterar metadados "observadosProperty" para "sourceObservedProperty".
    * As regras de axisVariable ou dataVariable 's destinationName são agora [mais rigoroso](/docs/server-admin/datasets#datavariable-addattributes) . Você precisa verificar se seus nomes de variáveis são válidos. Verifique-os à mão ou corra. ERDDAP™ e olhar para as mensagens de erro no relatório que é enviado para o administrador.
    * In datasets.xml , se você quiser que uma variável de dados de grade seja acessível via WMS , você precisa adicionar metadados da barra de cores. Pelo menos, por exemplo,&lt;att name=" colorBarMinimum "tipo="duplo"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Ver [mais informações](/docs/server-admin/datasets#wms) .
    * Adicionar o seguinte à sua [setup.xml](/docs/server-admin/deploy-install#setupxml) arquivo (mas personalizá-lo com suas informações) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Versão 1.08{#version-108} 
 (lançado em 2008-07-13) 

* Um novo serviço web ERDDAP™ , gerar Conjuntos de dados Xml, ajuda ERDDAP™ administradores criando um rascunho do XML necessário para descrever um conjunto de dados datasets.xml 
* Algumas correções de alterações/bug relacionadas a permitir que o griddap seja visto pelo netcdf-java como um servidor opendap, incluindo: metadados globais são agora rotulados como "NC\\_GLOBAL" (em vez de "GLOBAL") .
* A EDDGrid e EDDTable Data Access Forms agora utilizam informações de consulta na URL. Assim, por exemplo, se um usuário vai de um formulário Make A Graph para um formulário de acesso de dados, as restrições são transferidas corretamente.
*    tabledap Make A Graph agora permite restrições em variáveis String.
* EDDTable's Make A Graph agora permite restrições NaN. Graças ao Steve Hankin.
* Correcção de erros: EDDTable save AsImage não reconheceu corretamente os valores .colorbar min e max. Graças a Steve Hankin
* Muitas melhorias para a configuraçãoDatasetsXml. Graças à Elly Montgomery.
* Pedidos Griddap agora permitem () -pedições de estilo ligeiramente fora do alcance do eixo real. Isto é adequado uma vez que () -os valores são arredondados para o valor real mais próximo. Graças a Cindy Bessey
* Eu fiz o teste FloatArray e DoubleArray de éEvenlyEspaço mais sofisticado. Será sempre imperfeita (porque o teste precisaria ser personalizado para cada conjunto de dados) Mas devia ser melhor. Graças à Elly Montgomery.
* Eu movi setup.html e setupDatasets Xml.html diretório erddap /download e codificou todos os links para eles. Agora, posso fazer alterações e atualizar as informações de configuração imediatamente.
* Muitas pequenas mudanças. Algumas pequenas correções de erros.
*    **Coisas ERDDAP™ administradores devem fazer para atualizar para esta versão:** 
    * Mover&lt;oShortDescription Html&gt; de seu messages.xml para seu [setup.xml](/docs/server-admin/deploy-install#setupxml) Arquivo. Especifica o texto que aparece no meio do lado esquerdo do ERDDAP™ Página inicial. Além disso, adicionar&lt;h1&gt; ERDDAP &lt;/h1&gt; (ou algum outro título) até ao topo. **Ou...** cópia&lt;aDescrição Html&gt; no novo [setup.xml](/docs/server-admin/deploy-install#setupxml) arquivo (do novo erddapContent .zip ) em seu setup.xml.
         

## Versão 1.06{#version-106} 
 (lançado 2008-06-20) 

* Novo suporte para IOOS DIF SOS fontes de dados.
* Muitas pequenas mudanças. Algumas pequenas correções de erros.
     

## Versão 1.04{#version-104} 
 (lançado 2008-06-10) 

* Novo recurso Slide Sorter.
* Nova página do Google Gadgets e exemplos.
* Correcção de erros EDDGrid .saveAsNc para variável com escala e addOffset.
     

## Versão 1.02{#version-102} 
 (lançado 2008-05-26) 

* Novo EDDGrid SideBySide permite diferentes axisVariable s \\[ 0 \\] fonte Valores.
* Todos os conjuntos de dados de correntes e ventos foram fundidos em EDDGrid Conjuntos de dados SideBySide.
* As imagens de pedidos de imagem estão agora em cache por 1 hora.
     

## Versão 1.00{#version-100} 
 (lançado em 2008-05-06) 

* Faça um gráfico de páginas web e comandos gráficos em URLs.
* Suporte para arquivos de flag para forçar o recarregamento de um conjunto de dados.
* Novo tipo de conjunto de dados: EDDTableFrom4DFiles (a primeira subclasse de EDDTableFromFiles) .
