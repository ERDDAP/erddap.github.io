---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Mudanças

ERDDAP™é um grande exemplo de[Inovação orientada pelo usuário](https://en.wikipedia.org/wiki/User_innovation), onde a inovação do produto vem frequentemente dos consumidores (ERDDAP™usuários) Não apenas os produtores (ERDDAP™desenvolvedores) . Ao longo dos anos, a maioria das ideias para novos recursos e mudanças emERDDAP™ter vindo de usuários. Esses usuários são creditados abaixo por suas grandes ideias. Obrigado&#33; Por favor, mantenha essas grandes sugestões vindo&#33;

Aqui estão as mudanças associadas a cadaERDDAP™liberar.

## Versão 2.26{#version-226} 
 (lançado 2025-03-31) 

*    **Para todos:** 
    * Grande atualização para o nosso site de documentação: https://erddap.github.io/
 
Além da aparência atualizada, há melhor navegação, pesquisa, tradução, e deve ser mais fácil manter em frente&#33;

*    **Novos recursos e mudanças (para usuários) :** 
    * Subscrições eRSSatualizações devem acontecer mais confiável para conjuntos de dados que são atualizados frequentemente a partir de mudanças de arquivo.

*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * A versão padrão requer / suportaJavaversão 21. Voltar nesta versão está sendo capaz de facilmente fazer umJava17 binário compatível.

    * Novo recurso para personalizar as informações exibidas sobre conjuntos de dados na interface do usuário. Esperamos que isso seja particularmente útil para adicionar coisas como citações de conjuntos de dados. Para mais detalhes, você pode ler[nova documentação](/docs/server-admin/display-info). Graças a Ayush Singh pela contribuição&#33;

    * Outras métricas do Prometheus. O maior é `http_request_duration_seconds` que inclui tempos de resposta de solicitação quebrados por: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Este formato legível da máquina permitirá uma melhor coleção de métricas para entender como os usuários estão usando o servidor.

    * Nova maneira de gerar arquivos XML ISO19115. Ele usa o Apache SIS e é uma nova opção nesta versão. Por favor, ative-o e envie comentários.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * A IU agora criará links individuais para cada url em campos como oinfoUrle resumo.

    * Subscrições eRSSatualizações devem acontecer mais confiável para conjuntos de dados que são atualizados frequentemente a partir de mudanças de arquivo. Se isso causar problemas, acesse o GitHub e desabilite a funcionalidade adicionando a bandeira abaixo ao seu setup.xml.
NÃO RECOMENDADO
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * As variáveis subdefinidas não serão mais geradas automaticamente para o tipo de conjunto de dados EDDTableFromNcCFFiles. Se você estava confiando no comportamento, você pode ou (solução preferencial) adicionar osubsetVariablespara a definição de conjunto de dados em seudatasets.xml, ou adicione a bandeira abaixo ao seu setup.xml. Se você sentir a necessidade de ativar isso, por favor, alcance o GitHub para que possamos melhor apoiar o seu caso de uso avançando.
NÃO RECOMENDADO
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * O servidor irá agora redirecionar solicitações de documentação (em downloads/ qual é a documentação que foi migrada) para o novo site de documentação. Se necessário, você pode desativar isso com uma bandeira no setup.xml:
NÃO RECOMENDADO
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Algumas pequenas mudanças e correções de bugs.

*    **ParaERDDAP™Desenvolvedores:** 
    * Mais melhorias de qualidade de código e limpeza de código morto. Isso inclui pequenas otimizações, melhor manuseio de recursos closáveis e migrando de longos tipos de dados obsoletos (como Vector) .

    * Grande refatoração ao EDStatic para tirar a maioria do config, mensagem e código métrico. Também melhor encapsula a inicialização e o manuseio de caminhos de diretório (estes últimos 2 têm mais a fazer.) 

    * Muitos progressos em direção a uma imagem Docker oficialmente apoiada. O plano é finalizar e liberar após oERDDAP™2.26 lançamento está disponível.

## Versão 2.25{#version-225} 
 (lançado 2024-10-31) 

*    **Novos recursos e mudanças (para usuários) :** 
    * EDDTableFromFiles agora pode suportar consultas com apenas saídas derivadas (global, script jexl ou variáveis) .
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * A versão 2.25 requerJava21 ou mais. Esta é a versão LTS e está disponível há mais de um ano.
         
    * O SharedWatchService é agora o padrão. Se você precisar desabilitá-lo, entre em contato com chris. john at noaa.gov para me informar, então eu posso melhorá-lo em versões futuras e adicionar:
        &lt;useServiço de assistência compartilhada&lt;/useSharedWatchService&gt; para seu setup.xml.
         
    * OERDDAP™servlet agora começará na inicialização do servidor. O que significa que os conjuntos de dados começarão a carregar imediatamente em vez de esperar até que um pedido seja feito.
         
    * O parâmetro removeMVRows em EDDTableFromMultidimNcFiles agora terá um efeito. Definir para false pode acelerar significativamente algumas consultas, mas isso pode não ser adequado para todos os conjuntos de dados. Para mais informações, consulte[descrição do parâmetro](/docs/server-admin/datasets#removemvrows).
         
    * Conjuntos de dados (EDDTable De NcFiles eEDDGridA partir de NcFiles) usando arquivos zarr agora são suportados. Eles devem incluir "zarr" no arquivoNameRegex ou pathRegex. Ver[zarr secion na documentação de conjuntos de dados](/docs/server-admin/datasets#zarr)para mais detalhes.
         
    * Novo tipo de conjunto de dados, EDDTableFromParquetFiles agora é suportado. Ver[EDDTableFromParquetFiles secion na documentação de conjuntos de dados](/docs/server-admin/datasets#eddtablefromparquetfiles)para mais detalhes.
         
    *   [Métricas de Prometheus](https://prometheus.io/)estão agora disponíveis em /erddap/metrics.
         
    * Uma nova implementação XML parser está disponível. Este novo parser permite usar o XInclude indatasets.xml. Graças a Ayush Singh para o recurso.
         
    * Novo parâmetro emdatasets.xmlpara controlar e-mails de atividade incomuns. atividade incomum FailPercent padrão para o valor antigo de 25%. Graças a Ayush Singh para o recurso.
         
    * Novo parâmetro no setup.xml que controla se os erros de carregamento do conjunto de dados são mostrados na página status.html. Ele padrão para true, para desativar erros de conjunto de dados na página de status, defina showLoadErrorsOnStatusPage para false:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Algumas pequenas mudanças e correções de bugs.
         
*    **ParaERDDAP™Desenvolvedores:** 
    * Testes separados para unidade e integração (lento) testes. Também mais testes habilitados e testes foram feitos menos chamativos.
         
    * Erro Prone (alguns cheques ainda desativados) e Spot Bugs integrados através Maven.
         
    * Base de código completo formatada para combinar com o Guia de Estilo do Google.
         

## Versão 2.24{#version-224} 
 (lançado 2024-06-07) 

*    **Novos recursos e mudanças (para usuários) :** 
    * Nova paleta de cores EK80 para conjuntos de dados acústicos disponíveis. Graças ao Rob Cermak por isto.
         
    * Corrigir um problema onde EDDTableAggregateRows não mostrou intervalos adequados de todas as crianças. Graças a Marco Alba para o relatório de correção e bug.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * A fazer: CAPÍTULO DE SEGURANÇA: Autenticação do Google pode exigir alterações no seu CSP.
        
Especificamente, você também pode precisar adicionar https://accounts.google.com/gsi/style para stlye-src e https://accounts.google.com/gsi/ para conectar-src. Para o script-src você agora pode usar https://accounts.google.com/gsi/client.
 
        
Para mais informações você pode ir para o[Página do Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sobre a configuração CSP.
         
        
    * New Shared Watch Service (em inglês). Esta é uma nova opção para assistir diretórios para atualizações. Ele tem um fio para cada sistema de arquivos em vez de um fio por conjunto de dados. Provavelmente isso reduzirá drasticamente o número de threads usados para assistir a mudanças. Isso significa que todos os conjuntos de dados são atualizados em vez de cada conjunto de dados ter sua própria frequência de atualização. Provavelmente isso significará atualizações mais frequentes para a maioria dos conjuntos de dados.
        
Para ativar esta adição&lt;useServiço de assistência compartilhada&gt;true&lt;/useSharedWatchService&gt; para seu setup.xml.
        
          
Por favor, tente isto e reporte como funciona para você para chris. John no Noaa.gov.
         
    * Corrigir para nomes de var incorretos em logs. Graças a Ayush Singh para a correção.
         
    * Algumas pequenas mudanças e correções de bugs.
         
*    **Melhorias paraERDDAP™desenvolvedores:** 
    * Suporte para o desenvolvimento local usando Docker. Obrigado Matt Hopson e Roje.
         
    * Suporte para desenvolvimento local usando Jetty e melhorias de documentação. Obrigado Micah Wengren.
         
    * Alterações para testes para reduzir problemas de plataforma cruzada. Obrigado. Shane St. Savage.
         

## Versão 2.23{#version-223} 
 (lançado 2023-02-27) 

Note que este lançamento foi feito por Bob Simons, mostrando que ele ainda está por perto e ativo durante a transição para Chris John, seu sucessor. Estacionando com esta versão, todas as alterações de código estão sendo feitas por Chis John, a menos que especificado de outra forma.

*    **Novos recursos e mudanças (para usuários) :** 
    *    (Nenhuma)   
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * A fazer: CAPÍTULO DE SEGURANÇA: A Autenticação do Google é agora realizada através da nova biblioteca do Google Identity Services, que faz parte do "Sign In with Google". O suporte do Google para o antigo sistema "Google Sign In" será descontinuado 2023-03-31. Então, se você usar o Google Authentication em suaERDDAP™instalação, você precisa atualizar paraERDDAP™v2.23+ antes disso. (Bob lamenta o curto prazo. A culpa é do Bob.)   
         
    * MELHORADO: NCCSV é agora v1.2. A mudança é que os arquivos são agora arquivos codificados UTF-8 (eles foram ASCII) e assim agora pode incluir qualquer personagem Unicode como é, sem codificação como \\u_hhhh_, embora isso ainda é permitido.
Ao escrever arquivos NCCSV,ERDDAP™agora escreve arquivos v1.2.
        ERDDAP™ainda ler NCCSV arquivos que seguem a especificação v1.0 e v1.1.
Graças a Pauline-Chauvet, n-a-t-e, e thogar-computer para sugerir isso e fazer os testes para garantir vários programas de planilha pode importar arquivos UTF-8. Graças a Bob Simons para esta mudança de código.
         
    * NOVO: A página web status.html agora tem uma linha perto do topo que indica qual dataset loadDatasets está atualmente carregando e estatísticas relacionadas, ou nenhum se nenhum conjunto de dados está sendo carregado. Isso pode ser muito útil paraERDDAP™administradores tentando descobrir por que carregar Os dados estão a demorar tanto. Além disso, os nGridDatasets, nTableDatasets e nTotalDatasets contam abaixo que agora são instantâneos (anteriormente, eles foram a partir do final da última grande carga Conjuntos de dados) .
Esta mudança é para Roy Mendelssohn. Graças a Bob Simons para esta mudança de código.
         
    * MELHORADO: Gerar conjuntos de dados Xml agora muda para CF-1.10 (foi CF-1.6) nos atributos "Convenções".
Graças a Bob Simons para esta mudança de código.
         
    * Algumas pequenas mudanças e correções de bugs.
         

## Versão 2.22{#version-222} 
 (lançado 2022-12-08) 

Note que este lançamento foi feito por Bob Simons, mostrando que ele ainda está por perto e ativo durante a transição para seu sucessor.

*    **Novos recursos e mudanças (para usuários) :** 
    *    (Nenhuma)   
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Nada.
         
    * SEGURANÇA BUG FIX: Havia um bug relacionado com o Cross Site Scripting no código para a seleção de idioma cair. Graças aNOAAexames de segurança para apanhar isto. Isso mostra queNOAAsegurança está ativamente e rotineiramente à procura de fraquezas de segurança emERDDAP.
         
    * SEGURANÇA FIX: As muitas bibliotecas usadas porERDDAP™foram atualizados, como de costume, como parte deste lançamento. Desta vez, isso incluiu a atualização do driver PostgreSQL (que tinha um bug de segurança) a 42.5.1.
         
    * MELHORADO: Mais pequenas mudançasERDDAPO sistema de gerenciamento de memória deve reduzir a chance de um pedido falhar devido à falta de memória disponível.
         
    * Algumas pequenas mudanças e correções de bugs.
         

## Versão 2.21{#version-221} 
 (lançado 2022-10-09) 

*    **Novos recursos e mudanças (para usuários) :** 
    *    (Nenhuma)   
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Para fazer:Java17, você não deve usar \\-d64 em JAVA\\_OPTS em setenv.bat ou setenv.sh. Então, se está lá, por favor remova-o. Acho que o modo de 64 bits agora é selecionado quando você baixar uma versão de 64 bitsJava. Graças ao Sam Woodman.
         
    * BUG FIX: Às vezes, o novo sistema de e-mail tentou fazer login muitas vezes, o que fez com que os servidores de e-mail do Google rejeitassem todos os registros futuros em tentativas. Agora, o sistema de e-mail evita isso e problemas relacionados.
         

## Versão 2.20{#version-220} 
 (lançado 2022-09-30) 

*    **Não use v2.20. É falho.** Mas os administradores ainda precisam fazer os itens TO DO listados abaixo ao atualizar para v2.21+.
     
*    **Novos recursos e mudanças (para usuários) :** 
    *    (Nenhuma)   
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * MELHORADO: Reativamos o antigo sistema de gerenciamento de memória (Math2. segurançaMemoryDisponível) e modificou o novo sistema de gerenciamento de memória (EDStatic.shedThis Pedido) para trabalhar melhor com ele. Ver[Estado de memória](/docs/server-admin/additional-information#memory-status)para detalhes.
         
    * CHANGED: O padrão para&lt;ipAddressMaxRequests&gt; emdatasets.xmlaumentou de 7 para 15. É claro que alguns legítimosWMSclientes podem gerar mais de 7 pedidos simultâneos.
         

## Versão 2.19{#version-219} 
 (lançado 2022-09-01) 

*    **Não use v2.19. É falho.** Mas os administradores ainda precisam fazer os itens TO DO listados abaixo ao atualizar para v2.20+.
     
*    **Novos recursos e mudanças (para usuários) :** 
    * NOVO: Há uma nova função do lado do servidor,orderByDescendente, que funciona comoorderBy, mas tipo em ordem descendente. Graças ao Adam Leadbetter.
         
    * MELHORADO: Agora, gráficos (mas não mapas) irá expandir para preencher o espaço disponível na tela, ou seja, espaço não usado pela lenda. Você pode obter gráficos altos, gráficos quadrados ou gráficos largos adicionando e manipulando o &.size=_width_|parâmetro _height_ (onde a largura e a altura especificam o tamanho da tela, em pixels) na URL de solicitação. (Esta não é uma opção na página web .graph. Você tem que adicioná-lo ao URL manualmente.) Se você não especificar o parâmetro &.size, solicitações para .smallPng, .png, .largePng, .smallPdf, .pdf e .large.pdf têm tamanhos de tela predefinidos, então seu gráfico irá expandir para preencher o espaço disponível, mas geralmente será aproximadamente quadrado. Graças ao Bob Fleming.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Para fazer:ERDDAP™agora requerJava17 e o relacionado Tomcat 10. Você deve seguir oERDDAP™instruções de instalação (ou o equivalente, por exemplo, para Docker) para instalarJava17 e Tomcat 10 e copiar o seu\\[Toca a brincar.\\]/content diretório de sua instalação Tomcat 8 para o novo\\[Toca a brincar.\\]diretório. Não há outras mudanças que você precisa fazer para o seuERDDAPinstalação relacionada a esta mudança. Em outras palavras,ERDDAP™funciona como antes.
        
Não se esqueça de fazer oERDDAP- alterações relacionadas ao server.xml da Tomcat e context.xml quando você atualiza Tomcat. VerERDDAP'[Instruções de instalação da Tomcat](/docs/server-admin/deploy-install#tomcat).
        
A minha impressão deJava17 é que prefere mais poder de processamento e memória para aplicações maiores e de longa duração, comoERDDAP™, por isso funciona ligeiramente mais lento do queJava8 com computadores de baixa potência (por exemplo, 2 núcleos e RAM mínima) e funciona ligeiramente mais rápido do queJava8 com computadores de maior potência (por exemplo, 4+ núcleos e RAM abundante) . Então, se você vê mau desempenho, use programas como Linux[topo](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)para verificar o uso de recursos e considerar darERDDAP™mais recursos, notavelmente mais memória. A memória é barata&#33; A maioria dos telefones tem mais processadores e memória do que os servidores que alguns de vocês estão usando para executarERDDAP&#33;
Graças a Erin Turnbull.
         
        
    * Para fazer: Se você usarERDDAP™para acessar Cassandra, para Cassandra, você precisa continuar usando a versão deJavaque estavas a usar para gerir a Cassandra. Basta mudar paraJava17 para executar Tomcat+ERDDAP.
         
    * TO DO: Recomendado: Se a CPU do seu servidor tiver 4+ núcleos e 8+ GB de RAM, considere mudar para essas configurações em suadatasets.xmlarquivo:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Se o seu servidor tiver menos recursos, siga para "1" para ambas as configurações.
Os sistemas nThreads paraEDDGridDos Ficheiros e Tabela EDD Os FromFiles foram significativamente melhorados. Estas mudanças levaram a uma enorme melhoria de velocidade (por exemplo, 2X speedup quando nThreads é definido para 2 ou mais) para os pedidos mais desafiadores (quando um grande número de arquivos deve ser processado para reunir os resultados) . Algumas mudanças relacionadas de Chris John também levarão a uma aceleração geral ao longo deERDDAP. O código para essas mudanças foi contribuído por Chris John. Obrigado. Chris&#33;
         
    * Hífens emdatasetID's são deprecated e não mais suportados (Embora tecnicamente ainda seja permitido) . Provavelmente serão desalvados no próximo lançamento. Se você usar hífens, mude para sublinhar agora para evitar problemas. Se fizeres a mudança agora, está à tua velocidade. Se esperares até ao próximo lançamento, estarás em pânico e terás de lidar com isso naquele dia.
         
    * NOVO: Agora, para.htmlTablerespostas de dados, se os dados em uma célula String contém dados:image/png;base64, seguido por uma imagem .png codificada base64,ERDDAP™irá exibir um ícone (assim que o usuário pode ver a imagem se eles pairar sobre ele) e botões para salvar o texto ou a imagem para a área de transferência. Graças a Marco Alba (que contribuiu com o código) e Bob Simons (que o modificou ligeiramente) .
         
    * NOVO: -não adicionar nomes padrão
Se você incluir \\-doNotAddStandardNames como um parâmetro de linha de comando quando você executar gerar Conjuntos de dados Xml, gerar Conjuntos de dados Xml não vai adicionarstandard\\_nameaoaddAttributespara quaisquer variáveis que não as variáveis denominadas latitude, longitude, altitude, profundidade ou tempo (que tem óbviostandard\\_nameS) . Isso pode ser útil se você estiver usando a saída de gerar Conjuntos de dados Xml diretamente emERDDAP™sem editar a saída, porque gerar Conjuntos de dados Xml muitas vezes adivinhastandard\\_nameincorretamente. (Note que sempre recomendamos que você edite a saída antes de usá-la emERDDAP.) Usando este parâmetro terá outros efeitos relacionados menores porque o adivinhadostandard\\_nameé frequentemente usado para outros fins, por exemplo, para criar um novolong\\_name, e para criar as configurações colorBar. Graças ao Kevin O'Brien.
         
    * NOVO: Agora você pode colocar&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; emdatasets.xml  (com as outras configurações perto da parte superior) para alterar o número máximo de alterações de arquivo (padrão=10) que será processado pelo sistema updateEveryNMillis. Um número maior (100?) pode ser útil quando é muito importante que o conjunto de dados seja mantido sempre atualizado. Ver[atualizarMáxEventos documentação](/docs/server-admin/datasets#updatemaxevents). Graças a John Maurer.
         
    * NOVO: Adicionado suporte para global "real\\_time= verdade|false" Atributo String.
Se isto é falso (o padrão) e se o conjunto de dados não usar atualização EveryNMillis,ERDDAP™irá armazenar respostas a pedidos de tipos de arquivos onde todo o arquivo deve ser criado antesERDDAP™pode começar a enviar a resposta ao usuário e reutilizá-los por até cerca de 15 minutos (por exemplo,.nc, .png) .
Se isso for definido como true ou se o conjunto de dados usar a atualização EveryNMillis,ERDDAP™nunca irá armazenar os arquivos de resposta e sempre retornará arquivos recém-criados.
Graças a John Maurer.
         
    * NOVO: Os e-mails agora são enviados em um e-mail separadoThread. Isso faz com que os conjuntos de dados de carregamento e outras ações que geram e-mails mais rápidos porque o loadDatasets não precisa esperar que o e-mail seja enviado, o que às vezes leva muito tempo. O novo sistema pode enviar vários e-mails por sessão de e-mail, reduzindo assim o número de logins de servidor de e-mail e reduzindo o risco de falhas porque eles são muito frequentes. Há estatísticas para o emailThread na página status.html e mensagens de diagnóstico em log.txt -- procure por "emailThread". Note que uma história de nEmailsPerSession=0, indica problemas, ou seja, uma sessão de e-mail não foi capaz de enviar quaisquer e-mails.
Graças ao Bob Simons.
         
    * CHANGED: E-mails agora são enviados com código ligeiramente diferente (por causa deJava17 e a mudança para e-mailThread) . Se você tiver problemas em enviar e-mails, por favor e-mailerd.data at noaa.gov.
         
    * NOVO: As ações de assinatura que "toque" uma URL remota agora são tratadas em um toque separado Thread. Isso faz com que os conjuntos de dados de carregamento e outras ações que tocam URLs mais rápido porque o loadDatasets não precisa esperar que o toque seja concluído, o que às vezes leva muito tempo. Há estatísticas para o toqueThread na página status.html e mensagens de diagnóstico em log.txt -- procure "touchThread".
Graças ao Bob Simons.
         
    * NOVO: Na página status.html, no "Major LoadDatasets Time Series", há uma nova coluna "shed" que indica o número de pedidos que foram derramados porque atualERDDAP™O uso da memória era muito alto. As solicitações que são derramadas retornarão o código de status HTTP 503 "Serviço disponível". Esses pedidos não eram necessariamente um problema. Chegaram a um momento ocupado. Isso fazia parte de um revamp de comoERDDAP™lida com uso de alta memória.
         
    * NOVO: Em computadores Unix/Linux, agora há uma linha "OS Info" na página web status.html com informações atuais do sistema operacional, incluindo o uso de carga e memória da CPU.
         
    * MELHORADO: Agora, quandoERDDAP™é reiniciado e rápidoRestart=true, EDDTableFromFiles conjuntos de dados reutilizarão subconjunto.nce distinto.nc. Para alguns conjuntos de dados, isso diminui consideravelmente o tempo para carregar o conjunto de dados (por exemplo, de 60 segundos a 0,3) . Juntamente com o novo e-mailThread e tarefaThread (ver acima) , isto deve acelerar muito o reinícioERDDAP™para muitosERDDAP™instalações. Graças a Ben Adams e John Kerfoot.
         
    * CHANGED: Anteriormente, datasets órfãos (conjuntos de dados que estão ao vivoERDDAP™mas não estão dentrodatasets.xml) foram simplesmente notados no status. html e em log.txt após cada grande loadDatasets. Agora, eles são automaticamente removidos deERDDAP™e notado em status.html e em log.txt, e enviado por e-mail Tudo para. Então, se você quiser remover um conjunto de dados deERDDAP™, agora tudo o que você tem que fazer é remover seu pedaço de xml emdatasets.xmle será removido nos próximos grandes conjuntos de dados de carga. Graças ao Bob Simons.
         
    * CONHECIMENTO BUG em netcdf-java v5.5.2 e v5.5.3: OEDDGridDe Thredds Opção de catálogo em GerarDatasets Xml usado para trabalhar para catálogos THREDDS que incluem referências a conjuntos de dados em catálogos THREDDS remotos. Agora não. Tenho relatado o problema para os desenvolvedores netcdf-java.
         
    * BUG FIX: Para usuários Docker definir parâmetros setup.xml viaERDDAP\\__paramName_: para parâmetros internos e booleanos (por exemplo, e-mail SmtpPort) ,ERDDAP™estava incorretamente procurando apenas _paramName_. Agora ele procura _ERDDAP\\_paramName_. Graças a Alessandro De Donno.
         
    * CAPÍTULO: OERDDAP™sistema de teste agora usa um sistema automatizado para verificar que as imagens de teste recém-criadas são exatamente como esperado. Graças a Chris John para a sugestão e Bob Simons para a implementação.
         

## Versão 2.18{#version-218} 
 (lançado 2022-02-23) 

*    **Novos recursos e mudanças (para usuários) :** 
    * NÃO
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * BUG FIX:.ncarquivos não foram fechados em algumas circunstâncias. Agora estão. Graças a Marco Alba, Roland Schweitzer, John Maurer e outros.
         

## Versão 2.17{#version-217} 
 (lançado 2022-02-16) 

*    **Novos recursos e mudanças (para usuários) :** 
    * BUG FIX: Depois de mudanças noorderBysistema há alguns anos, Tabledap's Make A Graph não lidou corretamente muitas consultas que usaramorderBy_Xxx_. Agora faz. Graças ao Maurice Libes.
         
    * Anteriormente...ERDDAP™pedidos rejeitados para . transparente Png's quando os valores de latitude e/ou longitude foram parcialmente ou totalmente fora de alcance. (ERDDAP™GitHub Questões #19, postado por Rob Fuller -- Obrigado por postar que Rob) Agora retorna pixels transparentes para qualquer área fora de alcance da imagem. Isso é útil para muitas aplicações de clientes. O código muda para fazer essa mudança foi feito inteiramente por Chris John. Muito obrigado, Chris&#33;
         
    * Anteriormente...ERDDAP™rejeitou os pedidos de griddap quando os valores de índice para uma determinada dimensão foram\\[alta: baixo\\]. Agora torna essas solicitações válidas trocando os valores baixos e altos. Isso resolve um problema duradouro para os usuários e para programas externos como o xtracto que teve que acompanhar os poucos conjuntos de dados que têm valores de latitude que variam de alto para baixo, a fim de fazer pedidos como\\[ (50) : (20.) \\]para que o pedido no espaço de índice fosse\\[baixo: alto\\]. Ver https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Agora, um pedido como\\[ (20.) : (50) \\]para um desses conjuntos de dados é interpretado automaticamente como\\[ (50) : (20.) \\].
         
    * CHANGED: .esriAscii solicita agora acionar uma caixa de diálogo "File : Save As" no navegador do usuário. Graças ao Joel Van Noord.
         
    * BUG FIX: Agora, se a variável de longitude de um conjunto de dados da criança de umEDDGridLonPM180 ouEDDGridConjunto de dados Lon0360 temvalid\\_mine/ouvalid\\_maxatributo, eles são removidos noEDDGridLonPM180 ouEDDGridConjunto de dados Lon0360. Graças ao Roy Mendelssohn.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Para fazer: Se você tivesse definido&lt;dataProviderFormActive&gt; para false para lidar temporariamente com a vulnerabilidade XSS, por favor, devolvê-lo para true.
         
    * SEGURANÇA BUG FIX: Vulnerabilidade XSS Fixa no Formulário de Provedor de Dados. Graças a Genaro Contreras Gutiérrez.
         
    * BUG FIX: Quando um dicionário AWS S3 tinha mais de 10000 arquivos,ERDDAP™jogou um "Erro interno". Isto agora está fixo. Graças ao Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide não permitiu a variávelsourceNames em conjuntos de dados de crianças diferentes para ser o mesmo. Agora faz. Graças ao Joshua Stanford.
         

## Versão 2.16{#version-216} 
 (lançado 2021-12-17) 

*    **Novos recursos e mudanças (para usuários) :** 
    * CHANGES/BUG FIXES: Numerosas pequenas mudanças no sistema de tradução graças a sugestões de editores específicos de idioma. Graças a Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian e Mike Smit.
         
    * ADDED um aviso adequado e atribuição para o Google Translate, conforme exigido pelos termos do Google Translate. Além disso, o&lt;html&gt; tag no HTML para cada página da web agora identifica corretamente páginas da web não-Inglês como tendo sido traduzida pela máquina. Graças ao Mike Smit.
         
    * BUG FIX: As páginas web de login agora estão funcionando corretamente com diferentes configurações de idioma. Graças ao Mike Smit.
         
    * NOVOorderByFiltro de soma. E novo Check All e Desmarque Todos os botões emEDDGridPágina web do formulário de acesso de dados. Graças à contribuição de código de Marco Alba.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Para fazer: Se você tem
        &lt;questionMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkFile&gt;
em seu arquivo setup.xml, você precisa remover toda a tag (recomendado, então o arquivo padrão é usado) ou alterá-lo para:
        &lt;questionMarkImageFile&gt;QuestionMark.png&lt;/questionMarkFile&gt;
         
    * Só para que saibas,[Adopção](https://adoptium.net/?variant=openjdk8)substituiu AdoptOpenJDK como a fonte principal/recomendadaJava  (OpenJDK) .
         
    * CHANGE: Os arquivos de log deERDDAP™, Gerar conjuntos de dados Xml, e DasDds são agora UTF-8, não o conjunto de caracteres padrão do computador. Fiz muitas verificações e fiz algumas mudanças para garantir queERDDAP™sempre especifica o conjunto de caracteres apropriado ao ler ou escrever todos os tipos de arquivos, e não mais (em vários casos) depende do conjunto de caracteres padrão do computador. Isso corrigiu alguns erros e mudou-se tão perto quanto eu poderia para o objetivo de usar UTF-8 para tantos tipos de arquivo quanto possível (por exemplo, .log, .xml, .html,.json,.jsonEu....ncCabeçalho) . Note que muitos tipos de arquivo mais antigos são obrigados a usar ISO-8859-1 (por exemplo,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, .cpt) . Eu anteriormente tentei trabalhar com o grupo CF e comUnidatapara adicionar suporte para UTF-8 em.nc3 arquivos; ambos eram resistentes.
         
    * NOVO: Ao baixar arquivos de AWS S3,ERDDAPO cache Sistema de Url emEDDGridDos Ficheiros e Tabela EDD A FromFiles usa agora o novo Gerenciador de Transferência AWS para baixar arquivos via blocos paralelos (assim muito rápido) . A taxa de transferência de alvo é definida para 20 Gbps, por arquivo, então isso funciona bem com todos os tipos de instância AWS, mas especialmente aqueles que têm excelente "Networking Performance". Com esta mudançaERDDAPO cache O sistema FromUrl agora oferece velocidades comparáveis à abordagem de xarray de downloads paralelos de arquivos pré-cozidos, mas sem a necessidade de converter os arquivos de origem.nce.hdfem arquivos de raio-x. Na verdade,ERDDAP's sistema é melhor se houver um pedido subsequente para ler a partir do mesmo arquivo, porqueERDDAP™agora tem uma cópia local do arquivo. Nossa comunidade passou anos padronizando sobre.nce.hdfarquivos. Agora nós não temos que lançar tudo para fora apenas para obter bom desempenho ao armazenar dados no AWS S3. Graças ao Rich Signell.
         
    * CHANGE: searchEngine=Lucene é, por enquanto, deprecated. É um sistema complexo que muitas vezes produz resultados que são ligeiramente diferentes do comportamento mais desejável da pesquisaEngine=original. Para quase todosERDDAP™instalações, as economias de tempo de Lucene não compensam as diferenças nos resultados. Por favor, use searchEngine=original em vez disso, se possível. Se isso causar problemas, por favor envie um e-mail para Bob.
         
    * CHANGE: A pesquisa LuceneEngine agora se comporta mais como a pesquisa originalEngine. Não há mais casos em que a lucene pensa que um conjunto de dados corresponde e o original não. Além disso, os rankings de lucene agora são iguais aos rankings originais (porque original é agora sempre usado para calcular os rankings) .
         
    * BUG FIX: Começando em um lançamento recente,ERDDAP™parou de ver mais do que os primeiros 1000 objetos em um determinado balde AWS S3. Agora.ERDDAP™novamente vê todos os objetos. Graças ao Andy Ziegler.
         
    * BUG FIX: Agora EDDTable agregado Linhas remove oactual\\_rangeatributo sempre que um ou mais dos conjuntos de dados da criança nunca conhece suas variáveis 'actual\\_range  (por exemplo, EDDTableFromDatabase) . Graças a Erik Geletti.
         

## versão 2.15{#version-215} 
 (lançado 2021-11-19) 

*    **Novos recursos e mudanças (para usuários) :** 
    *   ERDDAP™tem um novo sistema para deixar o usuário especificar o idioma a ser usado para todas as páginas da web. Se umERDDAP™instalação é configurado para usá-lo, a lista de idiomas aparecerá no canto superior direito de cada página da web.ERDDAP™URL é de antes desta versão continuar a funcionar e sempre retornar conteúdo em inglês, como antes.
        
Nem todo o texto ou todas as páginas web foram traduzidos. Houve restrições de tempo neste projeto que impediram Qi e Bob de chegar a 100%.
        
A pergunta óbvia é: por que nós colocamos tanto esforço nisso quando o Chrome traduzirá páginas web on-the-fly? A resposta é: desta forma, temos muito mais controle sobre como a tradução é feita. Notavelmente, há muitas palavras que não devem ser traduzidas nas páginas web, por exemplo, os títulos e resumos de conjuntos de dados, os nomes de variáveis, parâmetros, unidades e organizações. Grande parte do esforço de tradução foi identificar palavras e frases que não deveriam ser traduzidas. Além disso, as traduções de máquina tenderam a mangle certos tipos de marcação HTML. Gerenciar a tradução nos permitiu minimizar este problema.
        
O projeto de tradução foi feito por Qi Zeng (um Google verão de código interno) e Bob Simons usando o serviço web de tradução do Google. Foi um projeto enorme. Obrigado. Qi&#33;
        
    * BUG FIX:ERDDAP™Agora permite que o ID ORCID tenha X como último dígito. Graças ao Maurice Libes.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Para fazer:
        
        * Você precisa fazer algumas mudanças relacionadas aERDDAP's novo sistema para deixar os usuários especificar o idioma para páginas web.
            * Na primeira linha do seu setup.xml edatasets.xmlarquivos, mude para: encoding="UTF-8" e altere a codificação do documento em seu editor de texto para que ele seja salvo como um arquivo UTF-8. Gerar conjuntos de dados Xml agora assume que odatasets.xmlé um arquivo UTF-8.
            * Programadores que compilamERDDAP: TodosERDDAP™arquivos .java devem ser tratados como arquivos UTF-8 por padrão. Você pode precisar adicionar "-encodificando UTF-8" à linha de comando javac. (Sim.) 
            * Para permitir este sistema (fortemente recomendado) , no&lt;startBodyHtml5&gt; tag que você especifica emdatasets.xml, change "&amp&#33;loginInfo;" into "&amp&#33;loginInfo;|&amp&#33;language;" de modo que a lista de idiomas aparece no canto superior direito de cadaERDDAP™página web.
            *   ERDDAP™apenas usa o&lt;startBodyHtml5&gt; tag que você especifica emdatasets.xmlpara especificar o conteúdo HTML para o banner no topo de cadaERDDAP™página da web, não importa qual idioma o usuário seleciona. Se você mudar essa tag para usar
"&EasierAccessToScientificData;"em vez de "acesso mais fácil aos dados científicos" e
"&BroughtToYouBy;"em vez de "Trazer por ti",ERDDAP™usará versões traduzidas dessas frases no banner.
            * Da mesma forma, o novo padrão&lt;theShortDescriptionHtml&gt; indatasets.xmlé
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
As últimas 3 linhas de conteúdo são coisas que serão substituídas com texto traduzido. Se você converter algum deles (nomeadamente: ParticularErddap;) ou todos eles para texto explícito emdatasets.xml  (que tem prioridade, se presente) ou message.xml, esse texto aparecerá independentemente do idioma que o usuário selecionar. Isso não é perfeito, mas eu pensei que poucos administradores gostariam de editar&lt;theShortDescriptionHtml&gt; em 35 arquivos diferentes para fornecer 35 diferentes versões traduzidas dessa tag.
        
          
         
    * CHANGED: Alguns erros agora são tratados de forma ligeiramente diferente e assim pode ser adicionado ao tally de "Requisitos Avançados" no status.html e no Email de Relatório Diário. Então esses números podem ser um pouco maiores do que antes.
         
    * BUG FIX: Gerar conjuntos de dados Xml paraEDDGridLon0360 eEDDGridLonPM180 agora exclui conjuntos de dados de origem comdatasetID- Sim.\\*\\_LonPM180" edatasetID- Sim.\\*\\_Lon0360", respectivamente.
         

## Versão 2.14{#version-214} 
 (lançado 2021-07-02) 

*    **Novos recursos e mudanças (para usuários) :** 
    *    (nenhum)   
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * NOVO:EDDGridLon0360 que faz um conjunto de dados gradeado com valores de longitude &gt;=0 e&lt;=360 de um conjunto de dados com valores de longitude &gt;=-180 e&lt;- 180. Ver[EDDGridDocumentação Lon0360](/docs/server-admin/datasets#eddgridlon0360). Graças ao Dale Robinson.
         
    * NOVO:ERDDAP™administradores agora podem substituir qualquer valor no setup.xml através de uma variável de ambiente chamadaERDDAP\\__valueName_ antes de executarERDDAP. Por exemplo, useERDDAP\\_baseUrl substitui o&lt;valor baseUrl&gt;. Isso pode ser útil ao implantarERDDAP™com um recipiente, como você pode colocar configurações padrão no setup.xml e, em seguida, fornecer configurações especiais através de variáveis de ambiente. Se você fornecer informações secretas paraERDDAP™através deste método, certifique-se de verificar se as informações permanecerão secretas.ERDDAP™somente lê as variáveis do ambiente uma vez por startup, no primeiro segundo da inicialização, então uma maneira de usar isso é: definir as variáveis do ambiente, iniciarERDDAP™, espere atéERDDAP™é iniciado, então não definir as variáveis de ambiente. Graças ao Marc Portier.
         
    * MELHORADO: Agora, se alguns arquivos em uma tabela EDDFrom... O conjunto de dados de arquivos com muitos arquivos tem alguns valores de String muito longos, o conjunto de dados irá carregar muito mais rápido e responder a solicitações muito mais rápido. Anteriormente...ERDDAP™alocaria um monte de espaço para os valores min e max String nos arquivos que são armazenados com informações de arquivo para tais conjuntos de dados. O arquivo resultante foi enorme, fazendo com que ele fosse escrito e lido lentamente. Graças ao OBIS.
         
    * Agora,ERDDAP™faz um melhor trabalho de interpretar sequências de caracteres incomuns e inválidas em arquivos CSV. Graças ao OBIS.
         
    * FIX: Depois de um ano de problemas com Cassandra, eu finalmente instalei Cassandra com sucesso (v2) novamente e assim foi capaz de reiniciar os testes com Cassandra v2. Então agora posso afirmar mais confiantemente queERDDAP™trabalha com Cassandra v2 e v3. Graças ao ONC.
         

## Versão 2.12{#version-212} 
 (lançado 2021-05-14) 

*    **Novos recursos e mudanças (para usuários) :** 
    * BUG FIX: Se você estiver na lista negra de assinatura, agora você não pode solicitar uma lista de suas assinaturas.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * TO DO: NOVO: sistema para limitar automaticamente a capacidade de usuários maliciosos e usuários legítimos excessivamente agressivos para fazer um grande número de pedidos simultâneos que degradam o desempenho do sistema para outros usuários. Existem 3 novas tags opcionais emdatasets.xmlque você pode / deve adicionar logo após&lt;graphBackgroundColor&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Para mais informações, ver[IpAddressMaxRequests](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™também agora imprime o "Número de usuários únicos (desde a inicialização) " na página status.html.
Graças à pessoa na China atacando meuERDDAP™instalação.
         
    * CHANGE para o comportamento do driver Postgresql: Quando eu atualizei o driver Postgresql, os nomes das colunas na lista de tabelas geradas por Postgresql e GenerateDatasetsXml voltaram toda maiúscula, em vez de todas as minúsculas, como antes. Não sei se isso afetará outras coisas desde que as bases de dados muitas vezes consideram esses nomes como insensíveis. Meu conjunto de dados de teste ainda funciona corretamente. Mas se seu conjunto de dados parar de trabalhar com issoERDDAP™atualização, esta é a causa possível para prosseguir primeiro.
         
    * BUG FIX:ERDDAP™agora também lida com arquivos AWS S3 privados corretamente. Houve outras melhorias relacionadas ao manuseio de arquivos AWS S3. Graças a Michael Gangl e Dylan Pugh.
         
    * NOVO:EDDGridDe NcFiles eEDDGridA partir de NcFiles Desembalado agora pode ler dados de "estruturas" em.nc4 e.hdf4 ficheiros. Para identificar uma variável que é de uma estrutura, a&lt;sourceName&gt; deve usar o formato: _fullStructureName_|_memberName_, por exemplo, group1/myStruct|MyMember. Graças à NRL.
         
    * CHANGED: Agora, se o uso atual da memória mais este pedido é mesmo um pouco alto, conjuntos de griddap NThreads para este pedido para 1. Assim,ERDDAP™conserva a memória quando a memória é escassa. Graças à pessoa na China atacando meuERDDAP™instalação.
         
    * Novo sistema para monitorar o número de arquivos abertos (que inclui soquetes e algumas outras coisas, não apenas arquivos) em Tomcat em computadores Linux. Se alguns arquivos erroneamente nunca se fechar, o número de arquivos abertos pode aumentar até que exceda o máximo permitido e muitas coisas realmente ruins acontecem. Então agora, em computadores Linux (a informação não está disponível para Windows) :
        
        * Há uma nova coluna "Open Files" na extrema direita da página web status.html mostrando a porcentagem de arquivos máximos abertos. No Windows, apenas mostra "?".
        * QuandoERDDAP™gera essas informações no final de cada grande recarga de conjunto de dados, ele vai imprimir no log. arquivo txt:
openFileCount=_current_ of max=_max_ %=_percent_
        * Se a porcentagem for de &gt;50%, um e-mail é enviado paraERDDAP™administrador e e-mail Tudo Para endereços de e-mail.
        
Para saber mais, ou se você ver esse problema em seuERDDAP™Veja[Muitos arquivos abertos](/docs/server-admin/additional-information#too-many-open-files).
Graças à pessoa na China atacando meuERDDAP™instalação.
         
    * NOVO: Eu adicionei um monte de verificação e manuseio de "Muitos arquivos abertos", então a tarefa apenas pára e o usuário vê a mensagem de erro. Os arquivos de dados não serão mais marcados como ruim se lê-los resulta em um erro "Muitos arquivos abertos".
         
    * NOVO\\[Diretriz de grande porte\\]/badFilesFlag diretório:
Se você colocar um arquivo neste diretório com umdatasetIDcomo o nome do arquivo (o conteúdo do arquivo não importa) ,ERDDAP™irá apagar os badFiles.ncarquivo para esse conjunto de dados (se houver) e recarregar o conjunto de dados ASAP. Isso causaERDDAP™para tentar novamente trabalhar com os arquivos anteriormente (erroneamente?) marcado como mau. Graças ao Marco Alba.
         
    * CHANGED: Na inicialização, se umEDDGridDe...Files ou EDDTableDe... Arquivos dataset inicialmente tem 0 arquivos em sua lista de arquivos válidos conhecidos (por exemplo, é um novo conjunto de dados) EntãoERDDAP™defere o carregamento e define uma bandeira para que ele será carregado o mais rápido possível após a carga principalDatasets é terminado. Isso acelera a inicialização inicial quando há novos conjuntos de dados.
         
    * CHANGED: FileVisitorDNLS.testAWSS3 () e FileVisitorSubdir.testAWSS3 () ; agora use o AWS v2 (não v1) SDK. Então agora o GitERDDAP™distribuição agora inclui todos os arquivos necessários e você não precisa mais adicionar manualmente o arquivo de jarra v1 AWS SDK maciço.
         
    * CHANGED: Eu mudei para usar o Maven para detectar / gerar dependências (os arquivos .jar em /lib) . A mudança para v2 do SDK AWS exigiu isso. Será necessário para outro código importado no futuro. Um enorme obrigado a Kyle Wilcox que forneceu o pom.xml que ele criou e usa, que resolveu vários problemas para mim.
         
    * CHANGED: O parâmetro classpath (- Cp) usado em GerarDatasetXml, DasDds e outros pequenos programas que vêm comERDDAP™, e no conselho aos programadores é agora muito mais simples e nunca deve mudar novamente, uma vez que se refere ao diretório, não aos arquivos individuais:
\\-cp classes;C:\\programas\\\\_tomcat\\lib\\servlet-api.jar;lib\\*
         (ou ':' em vez de ';' para Linux e Macs) .
         (Devia ter feito isto há anos quando se tornou uma opção.)   
         
    * NOVO: Gerar conjuntos de dados Xml tem uma nova opção de utilitário: encontrarDuplicateTime que irá procurar através de uma coleção de grade.nc  (e relacionados) arquivos para encontrar arquivos com valores de tempo duplicados. Ver[encontrar Duplicado Tempo](/docs/server-admin/datasets#findduplicatetime)  
         
    * NOVO:datasets.xmlpode agora incluir um&lt;paletas&gt; tag que substitui o&lt;paletas&gt; valor de tag de mensagens.xml (ou reverte para o valor message.xml se estiver vazio) . Isso permite que você altere a lista de paletas disponíveis enquantoERDDAP™está a correr. Além disso, se você tem um subdiretório cptfiles noERDDAP™diretório de conteúdo,ERDDAP™copiará todos os arquivos \\*.cpt nesse diretório no\\[Toca a brincar.\\]/webapps/erddap/WEB-INF/cptfiles diretório cada vezERDDAP™Começa. Juntos, essas mudanças permitem adicionar paletas e ter as mudanças persistir quando você instalar uma nova versão deERDDAP. Ver[documentação de paletas](/docs/server-admin/datasets#palettes)  
Graças a Jennifer Sevadjian, Melanie Abecassis, e talvez outras pessoas CoastWatch.
         
    * Sim.&lt;slowDownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdowntroublemillis) é agora usado para todos os pedidos falhados, não apenas alguns tipos.
         
    * CHANGED: O fio RunLoadDatasets agora interrompe o fio LoadDatasets em 3/4 LoadDatasets MaxMinutes então há mais tempo para LoadDatasets para notar a interrupção e saída graciosamente. Também há mais e melhores mensagens de diagnóstico para isso.
         
    * CHANGED da versão antiga de Lucene para v8.7.0.
         
    * CHANGE: E-mails enviados porERDDAP™agora aparecer com uma fonte de largura fixa.
         
    * CHANGE:EDDGridFromFiles agora recebe valores de eixo, bem como atributos do FIRST|LAST file, conforme especificado em&lt;metadadosDo&gt;. Obrigado. (não) para Ken Casey, et al.
         
    * Suporte ADDED para as unidades inválidas "degree\\_North" e "degree\\_East" que são erroneamente usados pelos arquivos recentes (desde 2020-10-01) no AVHRR Pathfinder Versão 5.3 L3-Collated (L3C) Conjuntos de dados SST (INSTITUIÇÕESsstd1day e nceiPH53sstn 1 dia) .ERDDAP™agora pode padronizá-los para unidades válidas. Obrigado. (não) para Ken Casey, et al.
         

## Versão 2.11{#version-211} 
 (lançado em 2020-12-04) 

*    **Novos recursos e mudanças (para usuários) :** 
    * BUG FIX: OrderByMean jogou um NullPointerException se uma variável tinha apenas um de \\_FillValue ou faltando\\_ Valor definido. Agora ele lida com a situação corretamente. Graças ao Marco Alba.
         
    * BUG FIX: Houve problemas com os arquivos de texto ODV criados porERDDAP™em v2.10. Esses problemas são resolvidos. Graças ao Shaun Bell.
         
    * BUG FIX: Entra.ERDDAP™v2.10: Se os limites de lat lon foram especificados na URL, a caixa de ligação não foi desenhada no mapa do mundo. Agora é outra vez. Graças a John Maurer.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * BUG FIX: Entra.ERDDAP™v2.10: Os arquivos de script para ArchiveADataset, GerarDatasets Xml e DasDds não funcionaram porque não tiveram as mudanças no classpath que foram adicionadas comERDDAP™v2.10. Agora sim. Graças ao Marco Alba.
         
    * NOVO: Emdatasets.xml, você pode agora ter a tag:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Atualmente, se for verdade (ou se a tag estiver vazia, ou se a tag não estiver no arquivo) , quando o pedido de um usuário leva a uma NullPointerException,ERDDAP™irá enviar e-mail para o rastreamento de pilhaerd.data at noaa.gov  (oERDDAP™equipe de desenvolvimento) . Isso deve ser seguro, pois nenhuma informação confidencial (por exemplo, o pedido) está incluído no e-mail. Isso deve tornar possível pegar qualquer erro obscuro e totalmente inesperado que leve a NullPointerExceptions. Caso contrário, o usuário vê as exceções, mas oERDDAP™desenvolvedores não, então não sabemos que há um problema que precisa ser corrigido.
        
É possível que esta tag leve a outras informações diagnósticas semelhantes que estão sendo enviadas paraerd.data at noaa.govno futuro. O conteúdo do e-mail será sempre mínimo e relacionado a bugs, e não, por exemplo, informações de uso. Graças ao Marco Alba.
         
        
    * CHANGED: Agora, tipos comuns de arquivos compactados (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) também são proibidos para pedidos de intervalo byte. Isto é especificado via&lt;extensõesNoRangeRequests&gt; em mensagens.xml.
         
    * PROBLEMA CONHECIDO: ComoERDDAP™2.10,.ncarquivos de ml que tentam alterar um atributo, não altere o atributo. Este é um bug conhecido no netcdf-java que eu relatei e eles dizem que será corrigido na próxima versão do netcdf-java.
         

## Versão 2.10{#version-210} 
 (lançado 2020-11-05) 

*    **Novos recursos e mudanças (para usuários) :** 
    * NOVO: O novo[Interpolação](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)converter interpola valores eficientemente a partir dos valores de um conjunto de dados gradeado. Como tal, é particularmente útil para pesquisadores que trabalham com dados de rastreamento animal. Este conversor leva em uma tabela com latitude, longitude e colunas de tempo (e talvez outras colunas) e retorna uma tabela com colunas adicionais com valores interpolados. Assim, isso é semelhante ao popular[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)script originalmente criado por Dave Foley, mas oferece a vantagem de processar até 100 pontos por solicitação. Graças a Dave Foley e Jordan Watson (NMFS) .
         
    * MELHORADO: A Pesquisa Avançada é agora rigorosa para pedidos não-.html. Agora lançará exceções para pedidos que tenham erros permanentes (por exemplo, solicitações onde minLat &gt; maxLat) ou erros temporários (por exemplo, pedidos de umstandard\\_nameque não existe) . Para solicitações .html, a Pesquisa Avançada é inalterada: como acontece com as pesquisas do Google, ele faz o seu melhor e silenciosamente corrige ou ignora erros. Graças ao Rich Signell.
         
    * MELHORADO: O mapa na página Pesquisa Avançada é agora maior (você ainda tem que lantejar, mas menos) e significativamente mais preciso (mas ainda não perfeito) . Graças a John Maurer.
         
    * MELHORADO: A configuração "Draw land mask" em Make A Graph web pages and the &.land=... configuração em URLs que solicitar um mapa agora suporta mais duas opções:
"fora" apenas desenha o contorno da máscara de terra, limites políticos, lagos e rios.
"fora" não saca nada.
Ver[&.land=... documentação](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Graças a John Maurer.
         
    * MELHORADO: Gráficos e mapas criados porERDDAP™agora pode usar três novos tipos de marcadores: Praça cheia sem fronteiras, Círculo preenchido sem fronteiras, Triângulo preenchido sem fronteiras. O código para isso foi contribuído por Marco Alba de ETT / EMODnet Physics. Graças ao Marco Alba.
         
    * NOVO:"files"sistema agora suporta planície Respostas do tipo de arquivo (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvou.xhtml.) , por exemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Graças ao Kyle Wilcox.
         
    * MELHORADO: As URLs geradas quando um usuário usa um formulário de acesso de dados (.html) ou um Make-A-Graph (.) página da web agora corretamente percent-codificar os caracteres\\[e\\]. Isso torna as URLs um pouco mais difíceis para os seres humanos lerem, mas é melhor de um ponto de vista de segurança web. Administradores agora têm a opção de definir relaxedQueryChars= '\\[\\]|' no arquivo Tomcat server.xml (menos seguro) ou não (mais seguro) .
Graças a Antoine Queric, Dominic Fuller-Rowell, e outros.
         
    * NOVO: Se uma solicitação para um conjunto de dados EDDTable incluir &add Variáveis Onde? (Atributo Nome, atributo Valor_) ,ERDDAP™irá adicionar todas as variáveis que têm _attribute Nome=atributo Value_ para a lista de variáveis solicitadas.
Ver[&gt; Variáveis Onde a documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Graças a Aurelie Briand, et al.
         
    * - Sim.ERDDAP™agora recusa pedidos de intervalo byte para /files /.ncou.hdfarquivos. Não tente se conectar ao remoto.ncou.hdfarquivos como se fossem arquivos locais. É horrivelmente ineficiente e muitas vezes causa outros problemas. Em vez disso:
        * Uso(OPeN)DAPsoftware cliente para se conectar aERDDAP'DAPserviços para este conjunto de dados (que têm /griddap / ou /tabledap/ na URL) . É isso.DAPé para.
        * Use o formulário de acesso de dados do conjunto de dados para solicitar um subconjunto de dados.
        * Se você precisar de todo o arquivo ou acesso repetido durante um longo período de tempo, usecurl,wget, ou seu navegador para baixar todo o arquivo, em seguida, acessar os dados de sua cópia local do arquivo.
             
    * MELHORADO: o .odv A opção de saída Txt foi reescrita para suportar a nova versão doODV .txtarquivos e apoiar a representação adequada de trajetória, séries e dados de perfil.
         
    * MELHORADO: Agora, os termos de pesquisa em citações duplas são interpretados como uma cadeia json, para que eles possam ter \\ caracteres codificados. Entre outras coisas, isso permite que você procure uma correspondência exata para um atributo, por exemplo, "instituição=NOAA\\n"Não corresponde a um conjunto de dados com a instituição =NOAA NMFS. Graças ao Dan Nowacki.
         
    * MELHORADO: Em lugares adicionais, números de ponto flutuante (especialmente flutuadores convertidos em dobras) agora aparecem como uma versão ligeiramente mais arredondada do número em lugares adicionais, por exemplo, um flutuador mostrado anteriormente como um duplo como 32.27998779296875, pode agora aparecer como 32.28. Graças ao Kyle Wilcox.
         
    * BUG FIX: arquivos de áudio inteiro não assinados foram lidos ligeiramente incorretamente. Agora eles são lidos corretamente.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * A primeira vez que você correERDDAP™v2.10, alguns conjuntos de dados baseados em arquivos de dados locais carregarão **Muito bem.** lentamente porqueERDDAP™precisa recriar seu banco de dados de informações de arquivo. Após a recarga inicial lenta, eles carregarão rapidamente, como antes. Por favor, seja paciente.
         
    * Coisas que tens de fazer:
        * Quando você executar primeiro v2.10, alguns conjuntos de dados podem não carregar porqueERDDAP™é agora mais rigoroso sobre alguns metadados. Como antes,ERDDAP™enviar-lhe-á um relatório diário quando primeiro carregar. Isso incluirá as mensagens de erro para cada um dos conjuntos de dados que não carregaram. Leia as mensagens de erro para descobrir os problemas. Na maioria dos casos, você só precisa fazer uma pequena mudança nos metadados do conjunto de dados para resolver o problema.
             
        * Emdatasets.xml, procurar&lt;sourceNameO quê? (nota'='sinal, que identifica um[valor fixosourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Para a maioriaERDDAP™configurações, estas são raras. Se algum dos valores após'='são strings (números) , você deve agora fechar a string em citações duplas. Por exemplo,
Antes:&lt;sourceName&gt;=KZ401&lt;/sourceName&gt;
Depois:&lt;sourceName&gt;="KZ401"&lt;/sourceName&gt;
             
        * NOVO: Há uma nova configuração opcional no setup.xml,&lt;defaultAccessibleViaFiles&gt;, que define o padrão&lt;accessViaFiles&gt; para cada um dos conjuntos de dados. O padrão para esta nova tag é falso, que imita o anteriorERDDAP™comportamento. Esta configuração de nível inferior pode ser superada por um determinado conjunto de dados&lt;configuração acessívelViaFiles&gt;.
            
RECOMENDADO (porque há usuários que querem isso) :
Se queres fazer todo o EDD... A partir deFiles conjuntos de dados acessíveis através do sistema de arquivos, em seguida
            
            1. Adicione esta tag ao seu arquivo setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Opcionalmente) Remover todos os
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
emdatasets.xmljá que o padrão é agora verdadeiro.
                 
        * Adicionar \\_FillValue Atributos:
            ERDDAP™usado para ter um padrão \\_FillValue para todas as variáveis de inteiro: o valor máximo do tipo de dados (por exemplo, 127 para variáveis byte) . Agora não. A fim de evitar ter esses valores mostrados como valores de dados (não faltando valores) , você precisa declarar explicitamente estes através de atributos \\_FillValue. A partir de agora, cada vez que você começarERDDAP™, ele enviará ao administrador um e-mail com uma tabela .csv com uma lista de variáveis de origem do inteiro que não têm \\_FillValue oumissing\\_valueatributos, e os novos atributos sugeridos \\_FillValue. Ver[Adicionar \\_Fill Atributos de valor](/docs/server-admin/datasets#add-_fillvalue-attributes)para mais informações e instruções.
             
        * Se você compilarERDDAP™, você precisa modificar o parâmetro classpath nas linhas de comando javac para adicionar uma referência a estes novos jar's: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * CHANGED: Tomcat 9 é agora a versão recomendada de Tomcat paraERDDAP. A versão mais recente do Tomcat 8.5+ também está bem por enquanto. Nós limpamosERDDAP'[Instruções de instalação da Tomcat](/docs/server-admin/deploy-install#tomcat).
        
A última versão doJava8 (nãoJava9, 10, 11, ...) a partir de[Adote oOpenJDK](https://adoptopenjdk.net/)permanece a versão recomendada deJavaparaERDDAP.Java8 tem o Long Term Support da AdoptOpenJDK para que ele permaneça seguro de usar, mas lembre-se de obter a versão mais recente dele periodicamente por razões de segurança.
        
    * NOVO: Nomes de fonte de script / Variáveis derivadas em conjuntos de dados tabulares
EDDTableFromFiles, EDDTableFromDatabase e EDDTableFromFileNames conjuntos de dados podem agora incluir expressões e scripts nossourceName. Isso permite que você faça novas variáveis com base em variáveis existentes nos arquivos de origem. O cálculo para uma determinada nova variável é feito dentro de uma linha dos resultados, repetidamente para todas as linhas. Por exemplo, para fazer uma variável de longitude com valores no intervalo -180 - 180° de uma variável com valores no intervalo 0 - 360°:
        &lt;sourceName&gt;=Math2.anglePM180 (Linha de produção ("lon") ) &lt;/sourceName&gt;
Para obter detalhes, consulte[Nomes de fonte de script](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Graças a Bob Simons (quem planeou isto antesERDDAP™v1.0 e finalmente encontrou uma maneira de implementá-lo) , Kevin O'Brien, Roland Schweitzer, John Maurer, e a biblioteca Apache JEXL para fazer a parte realmente difícil (e fazendo-o bem) .
         
    * NOVO: Tipos de dados inteiros não assinados (ubyte, ushort, uint, ulong) são agora suportados. Note que muitos tipos de arquivo (por exemplo, .das, .dds,.nc3) não suporta todos esses novos tipos de dados. Ver[Dados Tipo de documentação](/docs/server-admin/datasets#data-types)para detalhes sobre comoERDDAP™lida com essas diferenças. Notavelmente, desde(OPeN)DAP, notavelmente a resposta .dds, não suporta bytes, longs ou ulongs assinados, você pode querer usarERDDAP's representação tabular de .das e .das como visto nohttp... **info** Não.datasetIDPágina web _.html (por exemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) que você também pode obter em outros tipos de arquivo ou o.nccsvResposta de metadados (por exemplo,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , ambos suportam todos os tipos de dados em todas as situações.
        
AVISO: Para conjuntos de dados que são afetados por esta mudança, é possível que você veja problemas com o conjunto de dados porque os dados queERDDAP™leituras da fonte podem ser diferentes (por exemplo, variáveis previamente lidas como inteiros assinados podem agora ser lidas como inteiros não assinados) . Os problemas resultantes incluem: novos arquivos que não estão sendo adicionados ao conjunto de dados e/ou erros quando você tenta acessar os dados. Se um conjunto de dados tiver problemas, a primeira coisa a tentar é[definir um difícil Bandeira](/docs/server-admin/additional-information#hard-flag)para o conjunto de dados. Se isso não resolver o problema, então você tem que olhar para log. txt para ver as mensagens de erro, mergulhar nodatasets.xmlpara o conjunto de dados, e/ou talvez rerun gerarDatasets.xml para o conjunto de dados.
Graças a netcdf-java 5.x (que forçou a questão) e a próxima CF 1.9.
        
    * MELHORADO: Há agora[melhor documentação/dispositivo](/docs/server-admin/datasets#s3-buckets)para como criar um conjunto de dados de arquivos em baldes AWS S3. Graças a Micah Wengren.
         
    * CHANGED: Existem várias mudanças relacionadas com o"files"sistema.
        * O código para lidar com isso foi reescrito para ser utilizável por mais classes.
             
        * NOVO: Os pedidos do usuário para listagens de diretórios agora podem solicitar que a resposta seja um dos tipos de tabela simples padrão, anexando a extensão de arquivo desejada: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvou.xhtml). Por exemplo,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Graças a Kyle Wilcox e Shane St Savage.
             
        * MELHORADO: Agora, Gerar Conjuntos de dados Xml não incluirá um&lt;acessívelViaFiles&gt; tag na saída. A suposição é que o conjunto de dados dependerá do valor do novo&lt;defaultAccessibleViaFiles&gt; tag in setup.xml. Ver[acessível ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * MELHORADO: Tipos adicionais de conjuntos de dados agora suportam acessível ViaFiles:EDDGridSideBySide,EDDGridAggregateExistingDimension,EDDGridFromErddap, EDDTableFromErddap,EDDGridDa Tabela DED, Tabela EDDEDDGrideEDDGridDe Etopo. Para estes, os arquivos de um determinado conjunto de dados remoto/criança só serão acessíveis se ambos os pais e o conjunto de dados remoto/criança tiverem acesso ViaFiles set to true (talvez via&lt;defaultAccessibleViaFiles&gt;). Graças a Damian Smyth e Rob Fuller.
             
        * TO DO / RECOMENDAÇÃO: Recomendamos fazer todos os conjuntos de dados relevantes acessíveis através do sistema de arquivos, definindo&lt;defaultAccessibleViaFiles&gt; para true no setup.xml porque há um grupo de usuários para quem esta é a maneira preferida para obter os dados. Entre outras razões, o"files"sistema torna mais fácil para os usuários ver quais arquivos estão disponíveis e quando eles são alterados pela última vez, facilitando que um usuário mantenha sua própria cópia de todo o conjunto de dados. Se você geralmente não quiser fazer conjuntos de dados acessíveis através do sistema de arquivos, defina&lt;defaultAccessibleViaFiles&gt; para false. Em qualquer caso, basta usar&lt;acessívelViaFiles&gt; para os poucos conjuntos de dados que são exceções à política geral definida por&lt;defaultAccessibleViaFiles&gt; (por exemplo, quando o conjunto de dados usa.ncarquivos de ml, que não são realmente úteis para usuários) .
             
    * MELHORADO: Agora, se um conjunto de dados de origem tiver informações CF grid\\_mapping, gerar Conjuntos de dados Xml para conjuntos de dados gradeados irá adicionar as informações ao global&lt;addAtts&gt;, e as informações serão adicionadas ao global&lt;sourceAtts&gt; todos os dados são lidos a partir do arquivo. As informações aparecerão nos atributos globais do conjunto de dados como um conjunto de atributos com a grade de prefixo\\_mapping\\_ .
         
    * MELHORADO: Suporte para grupos ao ler.nc4 (e em certa medida.hdf5) arquivos. Geralmente, umERDDAP™dataset será construído a partir das variáveis em um dos grupos do arquivo. Além disso, GerarDatasets Xml paraEDDGridDe NcFiles eEDDGridA partir de NcFiles Desembalado agora pede um "grupo" (por exemplo, "" para qualquer / todos os grupos, "someGroup", "someGroup/someSubGroup", ou "\\[raiz raiz\\]"para apenas o grupo raiz) . Graças a Charles Carleton e Jessica Hausman.
         
    * MELHORADO: Gerar conjuntos de dados Xml paraEDDGridDe NcFiles eEDDGridA partir de NcFiles Descompactado agora suporta um parâmetro opcional "DimensionsCSV" que permite especificar os nomes de origem das dimensões que você deseja que este conjunto de dados use. Use "" para obter as variáveis que usam mais dimensões, como antes. Além disso, um pequeno bug relacionado que ocorreu com este tipo de arquivo é agora corrigido. Graças a Sujal Manandhar.
         
    * BUG FIX: Gerar conjuntos de dados Xml agora lista corretamente "EDDTableFromJsonlCSVFiles" (não "EDDTable FromJsonlCSV") como uma das opções EDDType. Graças ao Andy Ziegler.
         
    * MELHORADO:EDDGridA partir de NcFiles Desembalado agora padroniza atributos "units" para udunits padrão / "canônico" (o mesmo método que o conversor Unidades) . Por exemplo,"meter per second","meters/second","m.s^-1"e"m s-1"todos se tornam"m s-1". Graças ao Andy Ziegler.
        
AVISO: É possível que isso cause problemas para alguns conjuntos de dados existentes (por exemplo, fazer com que novos arquivos sejam rotulados "bad") . Se assim for,[definir um difícil Bandeira](/docs/server-admin/additional-information#hard-flag)para o conjunto de dados de modo que todos os arquivos de origem serão reler com o novo sistema.
        
    * MELHORADO: Agora, uma variável&lt;sourceName&gt; pode especificar um valor fixo de =NaN e a variável pode ter umactual\\_rangeatributo que especifica um intervalo finito. Isso às vezes é útil para que um conjunto de dados (notavelmente um conjunto de dados EDDTableFromFileNames) pode ter variável (S)   (por exemplo, latitude, longitude, tempo) com valores fixos de NaN, mas com um válidoactual\\_range  (como definido pelo atributo) . Em seguida, em Pesquisa Avançada, um usuário pode procurar por conjuntos de dados que tenham dados em uma latitude específica, longitude, intervalo de tempo e esse conjunto de dados será capaz de dizer que tem dados relevantes (embora todas as linhas reais de dados mostrarão NaN) . Ver[documentação do valor fixo](/docs/server-admin/datasets#fixed-value-sourcenames).
Graças a Mathew Biddle.
         
    * Agora, odatasets.xmlchunk for a EDDTableFromAsciiFiles or EDDTableFromColumnarAsciiFiles dataset pode incluir uma tag que dizERDDAP™ignorar todas as linhas na parte superior do arquivo até e incluindo a linha que corresponde à expressão regular especificada. Por exemplo,
        &lt;skipHeaderToRegex&gt;\\\*\\\\*\\\\*No fim da escada.\\*&lt;/ SkipHeaderToRegex&gt;
irá ignorar todas as linhas até e incluindo uma linha que começa com "\\*\\*\\* END OF HEADER». Veja o [&lt;skipHeaderToRegex&gt; documentação] (/docs/server-admin/datasets#skipheadertoregex) .
Graças a Eli Hunter
         
    * Agora, odatasets.xmlchunk para um EDDTableFromAsciiFiles ou EDDTableFromColumnarAsciiFilesdataset pode incluir uma tag que dizERDDAP™ignorar todas as linhas no arquivo que correspondem à expressão regular especificada. Por exemplo,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

irá pular todas as linhas que começam com "#". Veja o [&lt;skipLinesRegex&gt; documentação] (/docs/server-admin/datasets#skiplinesregex) .
Graças a Eli Hunter.
         
    * NOVO: Odatasets.xmlpara qualquer conjunto de dados EDDTable pode agora incluir &add Variáveis Onde? (_attributeNamesCSV_) . Se o fizer,ERDDAP™adicionará um widget para cada um dos atributos especificados Nomes do formulário de acesso de dados do conjunto de dados (Página web .html) para tornar mais fácil para os usuários adicionar &add Variáveis Onde? (Atributo Nome, atributo Valor_) ao pedido.
Ver[&gt; Variáveis Onde a documentação](/docs/server-admin/datasets#addvariableswhere).
Graças a Aurelie Briand, et al.
         
    * NOVO Ferramenta de terceiros:ERDDAP- Não.
        ERDDAP-lint é um programa de Rob Fuller e Adam Leadbetter do Irish Marine Institute que você pode usar para melhorar os metadados de seuERDDAP™conjuntos de dados.ERDDAP-lint "contém regras e uma aplicação web estática simples para executar alguns testes de verificação contra o seuERDDAP™servidor. Todos os testes são executados no navegador da web." Como o[Ferramenta de lint Unix/Linux](https://en.wikipedia.org/wiki/Lint_(software)), você pode editar as regras existentes ou adicionar novas regras. Ver[ERDDAP- Não.](https://github.com/IrishMarineInstitute/erddap-lint)para mais informações.
        
Esta ferramenta é especialmente útil para conjuntos de dados que você criou há algum tempo e agora quer trazer up-to-date com suas preferências atuais de metadados. Por exemplo, versões iniciais do GerrateDatasets Xml não fez nenhum esforço para criar globalcreator\\_name,creator\\_email, criador\\_type, oucreator\\_urlmetadados. Você pode usarERDDAP-inclinar para identificar os conjuntos de dados que não possuem esses atributos de metadados.
        
Graças a Rob e Adam para criar esta ferramenta e torná-la disponível para oERDDAP™comunidade.
        
    * NOVO: Agora está tudo bem se alguns dos arquivos em umEDDGridO conjunto de dados do FromFiles não tem todas as variáveis do conjunto de dados. Os arquivos serão incluídos como se tivessem as variáveis (com todos os valores ausentes) .
Graças a Dale Robinson e Doug Latornell.
         
    * NOVO: Há novas estatísticas de uso no arquivo de log e no Relatório Diário para ajudar os administradores a identificar os usuários que estão causando problemas de memória. As estatísticas são nomeadas "OutOfMemory (Tamanho da matriz) "OutOfMemory (Grande.) ", e "OutOfMemory (Muito bem.) ". Eles mostram os endereços IP dos usuários que fizeram solicitações nessas categorias e o número de pedidos que fizeram. Se não houvesse pedidos problemáticos, essas estatísticas não aparecerão. "OutOfMemory (Tamanho da matriz) "e "OutOfMemory" (Muito bem.) " os pedidos geralmente não são um problema porque os pedidos eram tão grandes queERDDAP™pego-os rapidamente e retornou uma mensagem de erro. O "OutOfMemory (Grande.) " os pedidos são mais perigosos porqueERDDAP™fez algum esforço antes de perceber que não havia memória suficiente atualmente disponível para lidar com o pedido (embora o problema possa ser outros pedidos diretamente antes destes pedidos) .
        
Há também novas estatísticas chamadas "Requisito geral, endereço IP" que mostram os endereços IP dos usuários que fizeram grandes pedidos (atualmente, gradeado.ncarquivos &gt; 1 GB) .
        
Além disso, a tabela de séries de tempo na página status.html agora inclui uma coluna "memFail" mostrando o número de pedidos que falharam com "OutOfMemory (Grande.) " erros desde os últimos grandes conjuntos de dados de carga. Qualquer número que não seja 0 aqui é, pelo menos, motivo de preocupação.
Graças ao Bob Simons.
        
    * NOVO: A nova versão deHyraxexibe listas de diretórios de forma diferente do anterior.ERDDAP™agora pode ler as listas de diretórios antigas e novas.
         
    * NOVO: Recargas de dados e respostas do usuário que levam &gt;10 segundos para terminar (com sucesso ou sem sucesso) são marcados com " (10&#33;) ". Assim, você pode pesquisar o arquivo log.txt para esta frase para encontrar os conjuntos de dados que foram lentos para recarregar ou o número de solicitação das solicitações que foram lentas para terminar. Você pode então olhar mais alto no arquivo log.txt para ver qual era o problema do conjunto de dados ou qual era o pedido do usuário e de quem era. Essas cargas lentas de conjuntos de dados e solicitações de usuários são, por vezes, tributando sobreERDDAP. Então saber mais sobre esses pedidos pode ajudá-lo a identificar e resolver problemas.
    * MELHORADO: Ao validar um conjunto de dados CF DSG,ERDDAP™agora garante que as variáveis com atributos cf\\_role estão na lista cdm\\_...\\_variables correspondente e não estão em outras listas cdm\\_...\\_variables. Por exemplo, se um conjunto de dados de timeseriesProfile tem uma variável "station\\_id" que tem o atributo cf\\_role=timeseries\\_id, então "station\\_id" deve estar na lista cf\\_timeseries\\_variables, mas não deve estar na lista cf\\_profile\\_variables.
Graças a Micah Wengren.
         
    * MELHORADO: "Simplificar" é agora mais rápido, usa menos memória e pode retornar LongArray. Graças aUnidata.
         
    * MELHORADO: O quickRestart agora é significativamente mais rápido para EDDTableFrom (nc-relacionado) Arquivos (exceto tabela do EDDDe NcCFFiles e tabela do EDDDe InvalidCRAFiles) porque faz Esperado (e outro lugar) agora apenas lê os metadados do arquivo de amostra em vez de ler todos os dados. Graças à Jessica Austin.
         
    * MELHORADO: Agora há suporte para cordas de tempo com precisão maior do que para-o-milissegundo se os dígitos adicionais são todos 0, por exemplo, "2020-05-22T01:02:03.456000000Z". Graças ao Yibo Jiang.
         
    * MELHORADO: GerarDatasetsXml EDD.suggestDestinationName usado para remover '(' e tudo depois. Agora ele remove (.\\*) apenas se esse for o fim dosourceName. Agora ele também remove\\[.\\*\\]somente se esse for o fim dosourceName. Graças ao Julien Paul.
         
    * MELHORADO: Gerar conjuntos de dados Xml agora faz a variáveldestinationNames único por adicionado \\_2, \\_3, ..., conforme necessário. Graças ao Julien Paul.
         
    * MELHORADO: Quando Calendar2.parseDateTime parses dd, hh, ou HH, o primeiro 'digit' pode agora ser um espaço.
    * PROBLEMA CONHECIDO: Começar comERDDAP™2.10,.ncarquivos de ml que tentam alterar um atributo, não altere o atributo. Este é um bug conhecido no netcdf-java que eu relatei e eles dizem que será corrigido na próxima versão do netcdf-java.
         
    * BROKEN LINKS FIX: Fiz um sistema adequado para testar links quebradosERDDAP™páginas da web, então deve haver agora muito poucos links quebrados (pelo menos a partir de cada data de lançamento - novos links quebrados surgem frequentemente) .
         
    * BUG FIX: EDDTableFromHttpGet falhou com certos tipos de pedidos. Agora não. Graças à Emma no BODC.
         
    * BUG FIX: Para lidar com alguns pedidos, a EDDTable fez um arquivo temporário para cada variável solicitada, com um nome de arquivo que termina no nome da variável. Se o nome da variável também foi um tipo de compressão (por exemplo, .Z) ,ERDDAPtentar (e falhar) para descomprimir o arquivo temporário. Agora os nomes de arquivos temporários terminam em ".temp". Graças a Mathew Biddle.
         
    * BUG FIX: GerarDatasetsXml e Calendar2.convertToJavaData de início Formato agora são muito menos propensos a fazer uma mudança incorreta ao tentar corrigir um formato de data possivelmente inválido. Notavelmente, nenhum formato de dataTime auto-suggested será modificado. Graças a Mathew Biddle.
         
    * BUG FIX: Se houve um erro ao receber conteúdo de uma URL remota, e se o conteúdo do errorStream for compactado,ERDDAP™agora descomprime corretamente a mensagem de erro. Graças ao Bob Simons.
         
    * BUG FIX:&lt;assinaToRemoteErddapDataset&gt; não estava sendo aplicado quando o EDD... O conjunto de dados do FromErddap foi um conjunto de dados infantil. Agora é. Graças ao Chris Romsos.
         
    * BUG FIX: Gerar conjuntos de dados Xml não pensa mais que um nome variável de origem que começa com "latina" pode ser latitude. Graças ao Vincent Luzzo.
         
    * BUG FIX: Agora, um OutOfMemoryError ao ler um arquivo de dados enquanto processa o pedido de um usuário não é uma razão para adicionar um arquivo à lista BadFiles. Graças ao Bob Simons.
         

## Versão 2.02{#version-202} 
 (lançado 2019-08-21) 

*    **Novos recursos e mudanças (para usuários) :** 
    * NOVO: Existem agora duas maneiras de procurar por conjuntos de dados em váriosERDDAPS. Eles trabalham um pouco diferente e têm diferentes interfaces e opções.
        
        *   [Pesquisar por:ERDDAPO que é?](/SearchMultipleERDDAPs.html)de Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)de Rob Fuller/O Instituto Marinho da Irlanda.
        
Graças a Tylar Murray para o pedido original.
         
    * MELHORADO: um pedido para"files"sistema para baixar um arquivo que está realmente em um site remoto (por exemplo, AWS S3) agora leva a um redirecionamento, então o usuário vai realmente baixar os dados da fonte, em vez de usarERDDAP™como intermediário. Graças a Andy Ziegler eNOAA.
         
    * NOVO: Como um exemplo dos novos recursos relacionados ao AWS S3, e para tornar mais fácil para qualquer pessoa navegar e baixar arquivos de baldes públicos AWS S3, criamos
        [~110 conjuntos de dados de amostra](https://registry.opendata.aws/)que permitem que qualquer pessoa procure o conteúdo de quase todos os
        [AWS S3 Abrir baldes de dados](https://registry.opendata.aws/). Se você clicar no"files"link para qualquer um desses conjuntos de dados de amostra, você pode navegar na árvore de diretório e arquivos nesse balde S3. Devido à forma como esses conjuntos de dados funcionam, essas listas de diretórios são sempre perfeitamente atualizadas porqueERDDAP™Atinge-os. Se você clicar na árvore de diretório para um nome de arquivo real e clicar no nome do arquivo,ERDDAP™irá redirecionar seu pedido para AWS S3 para que você possa baixar o arquivo diretamente de AWS.ERDDAP™administradores podem
        [ler direções para como fazer isso para outros baldes S3](/docs/server-admin/datasets#working-with-aws-s3-files). Graças a Andy Ziegler eNOAA.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Coisas que você precisa fazer: nenhum
         
    * MELHORADO:ERDDAP's método de armazenar arrays de strings (Linha de produção) é agora muito mais eficiente em memória. String Arrays são usados em todoERDDAP™, notavelmente ao ler arquivos de dados ASCII tabular. Além disso, outras alterações fazem a leitura CSV/TSV/SSV ASCII, Colar ASCII e arquivos de dados tabular jsonlCSV mais rápido e muito mais eficiente de memória. O resultado é: para um arquivo de teste de dados 764 MB ASCII (mas comprimido para um 52MB.gzarquivo) com 3,503,266 linhas e 33 colunas, o uso máximo de memória foi de 10GB até 0,6GB (no pico) . O tempo para ler foi de ~7 minutos (mas varia muito com o quanto a memória física está no computador) para ~36 segundos (incluindo 10s para simplificar () que é usado apenas por GerarDatasets Xml) . Muitos outros lugares emERDDAP™beneficiará desta eficiência de memória aumentada. Graças ao Tylar Murray e ao Mathew Biddle.
        
Eu explorei uma solução diferente (armazenando strings em StringArray como arrays byte codificados por UTF-8) . Isso reduz o uso de memória outro ~33%, mas ao custo de ~33% desaceleração. Em comparação com o sistema que agora está sendo usado, que parecia um mau comércio fora. É mais fácil dar a um computador mais memória (comprar mais memória para ~$200) do que torná-lo mais rápido (comprar um novo computador) .
        
Se for conveniente, ainda é sempre uma boa ideia dividir arquivos de dados tabular enormes em vários arquivos menores com base em alguns critérios comostationIDe/ou tempo.ERDDAP™muitas vezes só tem que abrir um dos pequenos arquivos em resposta ao pedido de um usuário, e assim ser capaz de responder muito mais rápido.
        
    * MELHORADO: Há agora[ERDDAP™Documentação AWS S3](/docs/server-admin/datasets#working-with-aws-s3-files), que descreve como começarERDDAP™para trabalhar com arquivos de dados em baldes AWS S3.
Também,ERDDAP™agora usa novos recursos no AWS S3JavaAPI.
Também,ERDDAP™agora permite URLs AWS S3 incluir caracteres adicionais (período, hífen, underscore) em nomes de baldes.
Também,ERDDAP™agora exige que as URLs do balde AWS S3 sejam identificadas de uma forma específica:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
onde o prefixo é opcional.
Graças a Andy Ziegler eNOAA.
         
    * MELHORADO: Gerar conjuntos de dados Xml agora trata mais comummissing\\_values stand-ins como valores ausentes e assim é mais provável converter uma coluna para um tipo de dados numéricos. Além disso, PrimitiveArray.simplificar () agora registra qual valor de dados particular fez com que tratasse uma determinada coluna como uma coluna de strings. Graças a Mathew Biddle.
         
    * MELHORADO:&lt;requestBlacklist&gt; agora suporta .\\*.\\*  (ou:\\*:\\*para IPv6) no final dos endereços IP para que você possa listar um pedaço maior de endereços IP, por exemplo, 110.52.\\*.\\*  (China Unicom Tianjin) . Veja a documentação para [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) Graças à China Unicom e China Telecom.
         
    * MELHORADO: Se a fonte de um conjunto de dados não especificar um"institution"atributo, GerarDatasets Xml e loadDataset agora obtê-lo a partir de um atributo "creator\\_institution" (se disponível) . Graças a Micah Wengren.
         
    * BUG FIX: padronizar O que nem sempre foi aplicado aos arquivos de dados ASCII.
Além disso, a EDDTable não manuseou corretamente restrições nos valores de tempo quando a fonte tinha valores de tempo de cadeia e padronizar O que estava a ser usado.
Graças a Paloma de la Vallee.
        
Eu não disse claramente antes: você deve apenas usar padronizar Quais recursos quando você realmente precisa deles (por exemplo, quando diferentes arquivos de origem armazenam valores de tempo de maneiras diferentes) , porque alguns pedidos para conjuntos de dados que usam padronizar O que será processado um pouco mais lento.
        
    * BUG FIX: Um bug no código usado porEDDGridFromNcFiles fez com que ele falhasse.nc4 e.hdf5 arquivos que têm "longo" (Institucional) variáveis. Isto agora está fixo. Graças a Friedemann Wobus.
         
    * BUG FIX: Pequenas mudanças nos arquivos ISO 19115 para fazer um validador diferente feliz. Graças a Chris MacDermaid e Anna Milan.
         

## Versão 2.01{#version-201} 
 (lançado 2019-07-02) 

*    **Novos recursos e mudanças (para usuários) :** 
    * Nenhuma.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * BUG FIX: Um bug no código que gera o formulário de acesso de dados paratabledapdatasets fez com que a página da web fosse em branco para alguns conjuntos de dados. Além disso, eu melhorei o manuseio de erros inesperados em todas as páginas HTML para que eles vão (geralmente) exibir uma mensagem de erro. Graças ao Marco Alba.
    * MELHORADO: Gerar conjuntos de dados Xml não imprime mais um aviso longo na parte superior da saída. Em vez disso, por favor veja[Edição de Geração Conjuntos de dados Saída Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Graças ao Steven Baum.
    * MELHORADO: Gerar conjuntos de dados Xml agora faz recomendações ligeiramente diferentes em diferentes situações para&lt;updateEveryNMillis&gt; para EDD...De...Files datasets. Além disso, GerarDatasets Xml agora desencoraja o sistema "extrato" original para EDDTableFromFiles conjuntos de dados.

## Versão 2.00{#version-200} 
 (lançado 2019-06-26) 

*    **ERDDAP™v2.00 está finalmente aqui&#33; Sim&#33;**   
     
    * Pedimos desculpa pelo longo atraso necessário para terminar esta versão.
Obrigado pela paciência.
         
    * A boa notícia é que o tempo extra foi usado para adicionar mais dos recursos que os usuários tinham solicitado. A má notícia é que mesmo com o atraso, nem todos os recursos solicitados foram adicionados. Lamentamos, mas pareceu-me mais importante tirar esta versão do que atrasar mais (Para sempre?) continuamente adicionando novos recursos. Prometemos voltar a lançamentos mais frequentes no futuro.
         
    * "Versão 2?&#33; Existem grandes mudanças e incompatibilidades?"
Grandes novos recursos? Sim.
Grandes incompatibilidades ou alterações para administradores ou usuários? Não.
Saltamos de v1.82 para v2.00:
        * em parte para celebrar 10 anos (agora 11) desde a primeira liberação pública deERDDAP™  (v1.00 em 2008-05-06, que externamente parecia notavelmente como v2.00) . Naquele tempo,ERDDAP™passou de uma instalação para quase 100 instalações em pelo menos 12 países (Austrália, Bélgica, Canadá, França, Índia, Irlanda, Itália, África do Sul, Espanha, Tailândia, Reino Unido, EUA) .
        * em parte para marcar uma grande adição em uma direção totalmente nova:ERDDAP™agora tem um sistema de ingestão de dados para ir com os serviços existentes do servidor de dados (ver[EDDTable FromHttpGet](#eddtablefromhttpget)) ,
        * e em parte porque não foi um grande salto de 1.82 para 2.00 numericamente, então este parecia ser o momento certo.
             
    * A outra boa notícia é que agora existem dois outros grupos que contribuem para o códigoERDDAP™  (nesta versão e com indicações continuarão) : Rob Fuller e Adam Leadbetter do Instituto Marítimo da Irlanda, e Roland Schweitzer de PMEL e Weathertop Consulting. Muito obrigado. É verdade que eles estão trabalhando em projetos de sua própria escolha, mas esse é o modelo clássico de desenvolvimento de código aberto -- grupos contribuem para os recursos que mais gostariam de ver adicionados. O benefício adicional aos contribuintes: eles começam a usar os novos recursos assim que terminarem; eles não precisam esperar pela próxima versão doERDDAP. O seu grupo também pode contribuir&#33; Ver[ERDDAP™Guia do programador](/docs/contributing/programmer-guide).
         
    * Esperamos que gosteERDDAP™v2.00. Estamos ansiosos para os próximos 10 anos deERDDAP™desenvolvimento e cada vez mais uso em todo o mundo.
         
*    **Novos recursos e mudanças (para usuários) :**   
     
    * NOVO:orderByMeanfiltro de filtro
paratabledapdatasets irá calcular os meios para os grupos especificados. Além disso, todos osorderByopções agora suportam uma forma adicional de definir grupos: _numericVariable\\[/número\\[timeUnits\\]\\[:\\]\\]_, por exemplo, tempo / dia ou profundidade/10:5. Por exemplo,stationID,time,waterTemp&orderByMean ("stationIDHora 1 dia) classificaria os resultados porstationIDe tempo, em seguida, calcular e retornar a média da águaTemp para cadastationIDpara cada dia. Estes são notavelmente úteis e poderosos novos recursos. O novo código para essas características e as mudanças no código antigo foram contribuídos por Rob Fuller e Adam Leadbetter do Instituto Marinho da Irlanda e submetidos via Git. Obrigado. Rob e Adam&#33;
         
    * NOVO: Tipo de arquivo de saída para conjuntos de dados tabulares:[.data Quadro](https://developers.google.com/chart/interactive/docs/reference#dataparam),
um arquivo JSON formatado para uso com oGoogle Visualizationbiblioteca cliente (Google Charts) . O código para isso foi contribuído por Roland Schweitzer e enviado via Git. Obrigado. Roland&#33;
         
    * NOVO: Tipo de arquivo de saída para conjuntos de dados tabulares:[.jsonlCSV1](https://jsonlines.org/examples/),
que é como o existente.jsonlCSVopção, mas com nomes de colunas na primeira linha. Graças a Eugene Burger.
         
    * NOVO: Se o administrador o permitir, os usuários podem agora fazer login com seu[ORCID](https://orcid.org)conta.
É um sistema de autenticação OAuth 2.0, como a autenticação do Google. ORCID é amplamente utilizado por pesquisadores para identificar-se exclusivamente. As contas ORCID são gratuitas e não têm os problemas de privacidade que as contas do Google têm. VerERDDAP'[Instruções de autenticação orcid](/docs/server-admin/additional-information#orcid). Graças a BCO-DMO (Adam Shepard, Danie Kinkade, etc.) .
         
    * NOVO: Um novo conversor de URL converte URLs desatualizadas em URLs atualizadas.
Veja .../erddap/convert/urls.html em qualquerERDDAP™instalação, por exemplo,
        [este link para o conversor noERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Isso deve ser útil para os gerentes de dados. Isso também é usado internamente por GerarDatasetsXml. Graças ao Bob Simons e à Sharon Mesick.
         
    * MELHORADO: O[Conversor de Tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)agora tem opções para converter qualquer tempo de cadeia de caracteres comum em um tempo de cadeia ISO8601, ou converter umUDUNITS-como unidades de tempo se encaixam em um apropriadoUDUNITScadeia de unidades de tempo. Isso também deve ser útil paraERDDAP™administradores que precisam saber qual formato deve especificar para o atributo "units" para variáveis de tempo de cadeia. Isso também é usado internamente por GerarDatasetsXml e o padronizeWhat característica de EDDTableFromFiles. Graças ao Bob Simons.
         
    * NOVO: O[Conversor de unidades](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)tem uma nova opção "Standardize UDUnits".
Por exemplo, "deg\\_C/m" e "degrees\\_C meters-1" são ambos convertidos para
«degree\\_C m-1» (em inglês). Este recurso também é usado pelo padronizeWhat característica de EDDTableFromFiles. Graças ao Bob Simons.
         
    * NOVO: Para gráficos (outros que os gráficos de superfície) na grelha etabledap's Make A Graph páginas web, quando o eixo x não é um eixo de tempo, se apenas um subconjunto do intervalo da variável eixo x é visível, agora há botões acima do gráfico para deslocar o eixo X para a esquerda ou para a direita. Graças a Carrie Wall Bell / o projeto Hydrophone.
         
    * NOVO: Para gráficos, o eixo X e/ou Y agora pode usar uma escala de log.
Os usuários podem controlar a escala Y Axis através de um novo widget drop-down no griddap etabledapFaça um gráfico páginas da web. Ver[.xRange e . Documentação do yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Graças a Carrie Wall Bell / o projeto Hydrophone.
         
    * MELHORADO:ERDDAP™agora faz melhor uso de vários códigos de erro HTTP e agora retorna um(OPeN)DAPv2.0-formatted erro mensagem payload. Ver[os detalhes](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Graças a Antoine Queric e Aurelie Briand.
         
    * MELHORADO: Não use Netcdf-java/c ou outras ferramentas de software para se conectar.ncou.hdfarquivos servidosERDDAP's /files / sistema como se fossem arquivos locais.ERDDAP™Agora recusa estes pedidos. É horrivelmente ineficiente e muitas vezes causa outros problemas. Em vez disso:
        
        * Uso(OPeN)DAPsoftware cliente para se conectar aERDDAP'DAPserviços para o conjunto de dados (que têm /griddap / ou /tabledap/ na URL) . É isso.DAPé para e faz muito bem.
        * Ou, use o formulário de acesso de dados do conjunto de dados para solicitar um subconjunto de dados.
        * Ou, se você precisar de todo o arquivo ou acesso repetido durante um longo período de tempo, usecurl,wget, ou seu navegador para baixar todo o arquivo, em seguida, acessar os dados de sua cópia local do arquivo.
        
          
         
    * MELHORADO: NoERDDAP™homepage, Full Text Search está agora acima "Ver uma lista de todos os conjuntos de dados", uma vez que é o melhor ponto de partida para a maioria dos usuários. Graças a Didier Mallarino e Maurice Libes.
         
    * IMPROVED: Em DataProviderForm3.html há agora listas suspensas de comumstandard\\_nameS. Graças a alguém na reunião do IOOS DMAC.
         
    * MELHORADO: Nas páginas /files / web, agora há um link para o novo "O que posso fazer com esses arquivos?" seção do /files / documentação. Essa seção descreve vários tipos de arquivo e dá sugestões para como trabalhar com eles. Graças ao Maurice Libes.
         
    * MELHORADO: Quase todos os pedidosERDDAP™deve ser pelo menos um pouco mais rápido, e às vezes muito mais rápido.
         
    * BUG FIX: Em algumas circunstâncias, quando um conjunto de dados EDDTable salvou dados em alguns tipos de.ncarquivos, o atributo global "id" foi definido para o nome sugerido do arquivo, que inclui um hash para torná-lo único a essa solicitação. Agora "id" é devidamente deixado inalterado (se especificado) ou definido para o conjunto de dadosdatasetID  (se não especificado) . Graças a John Maurer.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   
     
    * TO DO: Esta versão levará algum tempo e trabalhará de você. Por favor, seja paciente e planeje tomar algumas horas para fazer as mudanças necessárias e mais algumas horas para experimentar novos recursos.
         
    * Para a segurança, faça uma cópia de backup do seu setup.xml atual edatasets.xmlarquivos para que você possa reverter para eles no caso improvável onde você precisa reverter paraERDDAP™v1.82.
         
    * TO DO: O recomendadoJavaé agora adotado OpenJDK doOpenJDK 8 (LTS) + HotSpot.
Esta é uma variante de código abertoJavaque não tem restrições ao seu uso (ao contrárioOracle'Javadistribuição) . É derivado deOracle'Javade uma forma em curso, comOracleBênção. Por razões de segurança, é importante manter o seuJavaversão atualizada. VerERDDAP'[Javainstruções de instalação](/docs/server-admin/deploy-install#java).
         
    * Adotar OpenJDK'sJavaprecisa de uma pequena adição à sua instalação Tomcat: veja a[Recursos Instruções de Cache](/docs/server-admin/deploy-install#contentxml). Eu acho que este é um substituto para a configuração -XX:MaxPermSize, que (Adopção pela Comissão) OpenJDK não suporta mais.
         
    * TO DO: O novo padrão e recomendo&lt;fontFamily&gt; configuração em setup.xml é
DejaVu Sans que são construídos em AdoptOpenJDK'sJava. Ver
        [instruções de instalação de fonte revisada](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Muitas tags estão se movendo de setup.xml paradatasets.xml. A vantagem é que você pode mudar seus valores enquantoERDDAP™está correndo, sem reiniciarERDDAP. Notavelmente, você pode facilmente mudar&lt;startBodyHtml5&gt; para exibir uma mensagem temporária noERDDAP™Página inicial (por exemplo, "Verifique o novo conjunto de dados JPL MUR SST v4.1 ..." ou "ThisERDDAP™estará offline para manutenção 2019-05-08T17:00 PDT até 2019-05-08T20:00 PDT.") . Se / quando você mudar essas tagsdatasets.xml, as mudanças entrarão em vigor na próxima vezERDDAP™leiturasdatasets.xml.
         
        
        1. Copie este conteúdo em seudatasets.xmlarquivo (em qualquer lugar perto do início do arquivo, após&lt;erddapDatasets&gt;):
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

        2. Um a um, copie o valor (se houver) para cada uma dessas tags de seu arquivo setup.xml na nova tag que você acabou de colar (acima) emdatasets.xml. Por exemplo, se você tivesse usado um valor de 30 para&lt;cacheMinuts&gt; em setup.xml, você deve copiar esse valor para o novo&lt;cacheMinutes&gt; tag indatasets.xml  (embora se o valor é o mesmo que o novo valor padrão, é melhor apenas deixar a tag emdatasets.xmlem branco) .
            
Se o seu valor for diferente do novo padrão sugerido (excepto para&lt;startBodyHtml5&gt; e&lt;theShortDescriptionHtml&gt;, que são úteis para personalizar o seuERDDAP™instalação), por favor considere mudar para os novos valores padrão. Isto é particularmente verdadeiro&lt;parcialRequestMaxBytes&gt; e&lt;parcialRequestMaxCells&gt;, onde o valor padrão/suggested mudou significativamente ao longo dos anos.
            
Depois de copiar cada valor, exclua a tag e sua descrição do setup.xml. É melhor ter essas tags emdatasets.xml. E agora há melhores descrições em[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Um questionário do novo sistema é que a primeira página web quando você começaERDDAPserá o padrãoERDDAP™página web. Cada página web subsequente usará o conteúdo ...Html que você especificar emdatasets.xml.
        
    * A primeira vez que você correERDDAP™v2.0, conjuntos de dados baseados em arquivos de dados locais carregarão **Muito bem.** lentamente porqueERDDAP™precisa recriar seu banco de dados de arquivos em um formato ligeiramente diferente. Após a recarga inicial lenta, eles carregarão rapidamente, como antes. Por favor, seja paciente.
         
#### EDDTable FromHttpGet{#eddtablefromhttpget} 
    *   [NOVA CARACTERÍSTICA: EDDTable FromHttpGet](#eddtablefromhttpget)  
Até agora,ERDDAP™basta ler dados e torná-lo disponível para os usuários. Agora.ERDDAP™tem um sistema simples e eficiente para ingerir dados em tempo real de sensores. Entre outras características, este conjunto de dados oferece uma versão fina: lembra-se de cada mudança feita no conjunto de dados, quando foi feita, e por quem. Normalmente, os usuários só vão querer a versão mais recente do conjunto de dados, com todas as mudanças aplicadas. Mas há a opção para os usuários solicitarem dados do conjunto de dados, pois foi a qualquer momento do tempo. Isso facilita a ciência reprodutível. Assim, ao contrário da maioria dos outros conjuntos de dados em tempo real, esses conjuntos de dados são elegíveis para[DOIS](https://en.wikipedia.org/wiki/Digital_object_identifier). porque eles se encontramDOIexigência que o conjunto de dados é imutável, exceto por agregação. Ver[EDDTable FromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Graças a OOI (de há muito tempo e agora) para falar sobre a necessidade disso e Eugene Burger para o lembrete de trabalhar no que é importante.
         
    * Grandes novas características:ERDDAP™agora pode servir dados diretamente de arquivos de dados compactados externamente, incluindo.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, ou .Z. Os conjuntos de dados podem incluir uma mistura de arquivos compactados externamente (Talvez os arquivos de dados mais antigos?) e arquivos não controlados externamente, e você pode comprimir / decomprimir um arquivo a qualquer momento.
        
Isto funciona muito bem&#33;
Na maioria dos casos, a desaceleração relacionada à descompressão dos arquivos é menor. Nós fortemente encorajamos você a tentar isso, notavelmente para conjuntos de dados e / ou arquivos de dados que são usados com freqüência.
        
Isso pode poupar $30,000 ou mais&#33;
Este é um dos poucosERDDAP™recursos que podem economizar muito dinheiro -- se você comprimir muitos arquivos de dados, você vai precisar de muito menos RAIDs / discos rígidos para armazenar os dados, ou inversamente, você pode servir muito mais dados (até 10x) com os RAIDs que você já tem. Se este recurso te salvar de comprar outro RAID, então ele te salvou cerca de $30,000.
        
Ver[Documentação de arquivos compactados externamente](/docs/server-admin/datasets#externally-compressed-files). Graças a Benoit Perrimond e Paloma de la Vallee.
        
    * Grandes novas características: TudoEDDGridFromFiles e todos os conjuntos de dados EDDTableFromFiles suportam um&lt;cacheDeUrl&gt; tag e um&lt;cacheSizeGB&gt; tag. Se o cacheSizeGB não for especificado, isso irá baixar e manter uma cópia completa dos arquivos de um conjunto de dados remoto. Se o cacheSizeGB for especificado e for &gt;0, isso irá baixar arquivos do conjunto de dados remoto, conforme necessário, em um cache local com um tamanho limitado, que é útil ao trabalhar com base em nuvem (por exemplo, S3) arquivos de dados. Ver[cache Documentação de Url](/docs/server-admin/datasets#cachefromurl)para detalhes. Graças a Bob Simons e Roy Mendelssohn (que há anos têm escrito scripts para lidar com fazer cópias locais de arquivos de conjuntos de dados remotos) , Lloyd Cotten, Eugene Burger, Conor Delaney (quando ele estava na Amazon Web Services) , e a Plataforma Google Cloud.
         
    * NOVO: A nova tabela EDDFromJsonlCSV classe pode ler dados tabulares de
        [JSON Linhas arquivos CSV](https://jsonlines.org/examples/)  ("Melhor que CSV") . Graças às pessoas do Instituto Marítimo da Irlanda por me falar sobre este formato e para Eugene Burger e PMEL para o pedido de apoiá-lo como um tipo de entrada.
         
    * NOVO: TodosEDDGride todos os conjuntos de dados EDDTableFromFiles suportam um&lt;nThreads&gt; configuração, que dizERDDAP™quantos threads usar ao responder a uma solicitação. Ver[nTreads documentação](/docs/server-admin/datasets#nthreads)para detalhes. Graças a Rob Bochenek da Axiom Data Science, Eugene Burger, Conor Delaney (quando ele estava na Amazon Web Services) , e Google Cloud Platform.
         
    * Nova padronização O que para todas as subclasses EDDTableFromFiles -
Anteriormente, se para uma determinada variável, os valores dos atributos importantes (por exemplo,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, unidades) não foram consistentes, EDDTableFromFiles escolheria um valor para cada atributo ser "válido" e marcar arquivos com outros valores de atributos como "Bad Files". Agora, há um sistema para padronizar os arquivos assim que EDDTableFromFiles lê os arquivos. Ver[EDDTable FromFile padronizar O quê?](/docs/server-admin/datasets#standardizewhat). Um deERDDAPOs principais objetivos são tornar os arquivos de dados e conjuntos de dados acessíveis de forma consistente. padronizar O que é uma ferramenta nova importante para fazer isso uma realidade. Graças a Marco Alba, Margaret O'Brien (e outros usuários EML) , usuários BCO-DMO e InPort.
         
    * NEW EDDTableFromInvalidCRAFiles permite que você faça um conjunto de dados de uma coleção deNetCDF  (v3 ou v4)  .ncarquivos que usam um específico, inválido, variante do CF DSG Contiguous Ragged Array (CRA) arquivos. Arquivos de amostra para este tipo de conjunto de dados podem ser encontrados em https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Este servidor não está disponível de forma confiável\\]. EmboraERDDAP™suporta este tipo de arquivo, é um tipo de arquivo inválido que ninguém deve começar a usar. Grupos que atualmente usam este tipo de arquivo são fortemente encorajados a usarERDDAP™para gerar arquivos CF DSG CRA válidos e parar de usar esses arquivos. Graças a Ajay Krishnan e Tim Boyer.
         
    * EDDTableDeThreddsFiles e EDDTableDeHyraxOs ficheiros estão agora desprezados. Por favor, alterne para EDDTableFromNcFiles (ou uma variante) mais&lt;cacheDeUrl&gt;. Se isso não funcionar por algum motivo, e-mailerd.data at noaa.gov. Se não houver reclamações antes de 2020, esses tipos de conjuntos de dados podem ser removidos.
         
    * MELHORADO -- O sistema para converter automaticamente não ISO 8601 vezes em ISO 8601 vezes (introduzido em v1.82) foi muito expandido para lidar com um grande número de formatos adicionais. Isso afeta GerarDatasetsXml eERDDAPO tratamento dos metadados de origem.
         
    * MELHORADO -- Com sua terceira grande revisão do sistema de análise de tempo de corda (e espero que o último) ,ERDDAP™não utiliza maisJava's DateTimeFormatter por causa de insetos que às vezes afetam tempos extremos (anos&lt;=0000).ERDDAP™agora usa seu próprio sistema para analisar cadeias de tempo.
         
    * ATENÇÃO: O novo sistema de análise de tempo String é um pouco mais rigoroso. Se um dos seus conjuntos de dados de repente tem apenas valores ausentes para valores de tempo, a causa é quase certamente que a cadeia de formato de tempo é ligeiramente errada. Deve haver mensagens de erro no log. txt relacionado aos valores de tempo que não correspondem ao formato de tempo -- que deve ajudá-lo a corrigir a cadeia de formato de tempo para esse conjunto de dados. Se precisar de ajuda, use a opção emERDDAPConversor de tempo que "Converter\\[S\\]qualquer tempo de cadeia de caracteres comum em um tempo de cadeia ISO 8601" -- indica o formato que o conversor usou para analisar a cadeia de caracteres de origem.
         
    * RECOMENDAÇÃO: A maneira mais rápida, mais fácil e mais barata de acelerarERDDAPO acesso a dados tabulares é colocar os arquivos de dados em uma unidade de estado sólido (SSD) . A maioria dos conjuntos de dados tabulares são relativamente pequenos, então um SSD de 1 ou 2 TB é provavelmente suficiente para manter todos os arquivos de dados para todos os seus conjuntos de dados tabulares. O SSD eventualmente desgasta se você escrever dados para uma célula, excluí-lo e escrever novos dados para essa célula muitas vezes. Em vez disso, recomendo que (tanto quanto possível) você apenas usa seu SSD para escrever os dados uma vez e lê-lo muitas vezes. Então, mesmo um SSD de nível de consumidor deve durar muito tempo, provavelmente muito mais tempo do que qualquer disco rígido (HDD) . SSD de qualidade do consumidor agora são baratos (em 2018, ~$200 por 1 TB ou ~$400 por 2 TB) e os preços ainda estão caindo rápido. QuandoERDDAP™acessa um arquivo de dados, um SSD oferece ambos
        
        * latência mais curta (~0.1ms, versus ~3ms para um HDD, versus ~10 (?) ms para um RAID, versus ~55ms para Amazon S3) e
        * maior produtividade (~500 MB/S, versus ~75 MB/s para um HDD versus ~500 MB/s para um RAID) .
        
Então você pode chegar a um aumento de desempenho ~10X (vs um HDD) 200 dólares&#33; Comparado com a maioria das outras mudanças possíveis no seu sistema (um novo servidor por $10,000? um novo RAID por $35.000? um novo switch de rede por $5.000? etc.) , este é de longe o melhor retorno sobre o investimento (ROI) . Se o seu servidor não estiver carregado de memória, memória adicional para o seu servidor também é uma ótima e relativamente barata maneira de acelerar todos os aspectos deERDDAP.
        \\[SSD seria ótimo para dados em grade, também, mas a maioria dos conjuntos de dados em grade são muito maiores, tornando o SSD muito caro.\\]  
         
    * NOVO: Todos os que estão conectados ganham papel=\\[Qualquer pessoa Em\\], mesmo que não haja&lt;user&gt; tag para eles emdatasets.xml. Se você definir o conjunto de dados&lt;acessível para&gt;\\[Qualquer pessoa Em\\], então qualquer um que tenha entradoERDDAP™  (por exemplo, através de sua conta Gmail ou Orcid) será autorizado a acessar o conjunto de dados, mesmo que você não especifique um&lt;user&gt; tag para eles emdatasets.xml. Graças ao Maurice Libes.
         
    * MELHORADO: OUDUNITSO conversor de unidades /UCUM foi amplamente melhorado.
Ele lida com unidades inválidas strings melhor (começar com uma ênfase na preservação de informações, em vez de aplicar a validade) . Além disso, os resultados agora têm uma sintaxe padronizada.
         
    * NOVO: OUDUNITS/UCUM conversor de unidades tem uma nova opção para padronizar umUDUNITSCordas.
Isso funciona bem para válidoUDUNITSstrings e razoavelmente bem para não-padrão / inválidoUDUNITSCordas. Por exemplo, Por exemplo,UDUNITS= "metros por segundo", "metro/segundo","m.s^-1"e"m s-1"todos voltarão "m.s-1". Isso foi necessário para a nova padronização Que sistema descrito acima. Graças a Marco Alba, Margaret O'Brien (e outros usuários EML) , usuários BCO-DMO e InPort.
         
    * NOVO: EDDTable FromMultidimNcFiles agora tem um[Medidas de tratamento](/docs/server-admin/datasets#treatdimensionsas)opção, que dizERDDAP™para tratar certas dimensões (por exemplo, LAT e LON) como se fossem outras dimensões (por exemplo, TIME) . Isso é útil para alguns arquivos incorretos que usam diferentes dimensões para diferentes variáveis quando deveriam ter usado apenas uma dimensão (por exemplo, TIME) . Graças a Marco Alba e Maurice Libes.
         
    * Agora, tudoEDDGridA partir de...Files conjuntos de dados suportam um novo eixo especialsourceNameque dizERDDAP™para extrair informações do arquivoNome (apenas nome de arquivo.ext) e usar o valor para **substituir** o valor do eixo mais esquerdo existente. O formato é
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Ver[esta documentação](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Graças aoNOAAPathfinder Conjunto de dados de agregação diária.
         
    * Agora, tudoEDDGridA partir de...Files conjuntos de dados suportam um novo eixo especialsourceNameque dizERDDAP™para extrair informações do caminho do arquivoNome (diretórios + filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Para isso, o nome do caminho sempre usa'/'como o personagem separador de diretório, nunca '\'.
Ver[esta documentação](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Graças a Paloma de la Vallee.
         
    * NOVO: Agora, todos EDDTable De... conjuntos de dados de arquivos suportam variável pseudo adicionalsourceNames que extraem informações do arquivoName (apenas nome de arquivo.ext)   (ver[\\*\\*Nome do arquivo](/docs/server-admin/datasets#filename-sourcenames)) ou do caminho completo do arquivoNome (/dir1/dir2/filename.ext)   (ver[\\*\\*Nome do caminho](/docs/server-admin/datasets#pathname-sourcenames)) . Graças a Paloma de la Vallee.
         
    * NOVO: Se umEDDGriddataset tem uma ou mais dimensões muito grandes (por exemplo, milhões de valores) que tomam muita memória, você pode definir o novo [&lt;DimensionValuesInMemory&gt;] (/docs/server-admin/datasets#dimensionvaluesinmemory) configuração para false (o padrão é verdadeiro) , o que faz com que o conjunto de dados armazene os valores no disco e recupere-os quando necessário. Graças a David Rodriguez e Rich Signell (re:EDDGridA partir deAudioFiles) .
         
    * Anteriormente, se você reordenou odataVariables para um conjunto de dados EDDTableFromFiles e recarregado o conjunto de dados, EDDTableFromFiles releria todos os arquivos de dados. Agora, ele pode lidar com a reordenação sem reler todos os arquivos de dados. Graças ao Roland Schweitzer.
         
    * MELHORADO: Agora, quandoERDDAP™lê ASCII, NCCSV e JSON Lines CSV arquivos de dados tabulares, se ele encontrar um erro em uma determinada linha (por exemplo, número incorreto de itens) , registra uma mensagem de aviso ("WARNING: Skipping line"... "número inesperado de itens...") ao[arquivo log.txt](/docs/server-admin/additional-information#log)e, em seguida, continua a ler o resto do arquivo de dados. Assim, é sua responsabilidade olhar periodicamente (ou escrever um script para fazê-lo) para essa mensagem no log. txt para que você possa corrigir os problemas nos arquivos de dados.ERDDAP™é configurado desta forma para que os usuários possam continuar a ler todos os dados válidos disponíveis, mesmo que algumas linhas do arquivo tenham falhas. Anteriormente...ERDDAP™marcou o arquivo como "maio" e removeu-o do conjunto de dados.
         
    * MELHORADO: Quando momentos precisos (por exemplo, para o segundo mais próximo ou milissegundo) são armazenados na fonte como "minutos desde ..." (ou unidades maiores) ,ERDDAP™agora os rodeia para o milissegundo mais próximo ao ler os valores emERDDAP. Caso contrário, os números de ponto flutuante são machucados e pedidos de dados em horários específicos (por exemplo, &time=2018-06-15T01:30:00) vai falhar. Anteriormente, calculava-os o mais precisamente possível. (e ainda faz se as unidades são, por exemplo, "segundos desde ..." ou "milissegundos desde ...") . É melhor evitar este problema não usando grandes unidades (por exemplo, minutos ou horas) para armazenar valores de tempo precisos (por exemplo, microssegundos) Os computadores fazem um mau trabalho de manusear dígitos decimais. Graças ao Marco Alba.
         
    * CARACTERÍSTICAS DA EDDTableEDDGrido que torna muito melhor. Tabela de EDDEDDGridpermite que os usuários consultam conjuntos de dados gradeados como se fossem conjuntos de dados tabulares ("query by value") .
        
        * Agora suporta um&lt;maxAxis0&gt; tag (padrão=10) que especifica o número máximo de eixos\\[0\\]  (geralmente"time") valores que podem ser consultados de uma só vez. Isso evita solicitações ingênuas de obter EDDTableDeEDDGridpara pesquisar através de todo um conjunto de dados gradeado (que falharia com um erro de timeout) .
        * Gerar conjuntos de dados Xml agora tem uma opção para gerar EDDTableFromEDDGridconjuntos de dados para todos os conjuntos de dados grelhados em um dadoERDDAP™que correspondem a um regex especificado (use .\\* para combinar todos os conjuntos de dados) . Os conjuntos de dados que ele cria têm informações adicionais no atributo sumário indicando que esta é uma versão tabular de um conjunto de dados gradeado. E os seusdatasetIDé odatasetIDdo conjunto de dados grelhados, mais "\\_AsATable".
        * Há uma grande velocidade para a configuração mais comum: quando o conjunto de dados gradeado é umEDDGridDataset FromErddap que está no mesmoERDDAP.
        
Graças a James Gallagher e Ed Armstrong.
         
    * NOVO: gerar Conjuntos de dados Xml para todos os tipos de conjuntos de dados é agora muito mais provável adicionar um \\_FillValue oumissing\\_valueatributo a uma variável numéricaaddAttributes. Por exemplo, isso ocorre quando marcadores de valor em falta de string (por exemplo, "", ", "?", "NA", "nd", "NaN") para essa variável no arquivo de amostra são convertidos paraERDDAPOs valores desaparecidos nativos (127 em colunas byte, 32767 em colunas curtas, 2147483647 int columns, 9223372036854775807 em colunas longas, e NaN em variáveis flutuantes e duplas) . Também ocorre para valores de NaN em variáveis flutuantes e duplas. Além disso, "nd" foi adicionado à lista de marcadores de valor em falta comuns em colunas de dados numéricos queERDDAP™Devia procurar. Graças ao Matt Biddle da BCO-DMO.
         
    * MELHORADO: a opção ncdump em gerar Conjuntos de dados Xml é agora mais como ncdump (mas ainda usa a versão netcdf-java de ncdump) . Agora, imprime uma nova lista de opções. Agora, para.ncarquivos ml, imprime a saída ncdump para o resultado do.ncalterações de arquivo ml aplicadas ao subjacente.ncou.hdfficheiro.
         
    * BUG FIX: Houve um vazamento de identificador de arquivos (eventualmente causarERDDAP™para congelar) causado ao criar alguns tipos de arquivos de saída, por exemplo, .geotif, notavelmente quando os erros ocorreram durante a criação. Acho que isto está resolvido. Se ainda vir problemas, diga-me o tipo de conjunto de dados (grade ou tabela) e o tipo de arquivo que está causando o problema. Graças a Steven Beale, Lynn DeWitt, Jibei Zhao e outros.
         
    * BUG FIX: OWMS Leafletdemo não totalmente / adequadamente converter o eixo "profundo" para "elevação". Agora, faz, e os pedidos de lenda quebrados são fixos. Além disso, todas as opções de eixo nas listas suspensas estão sempre em ordem ordenada ascendente. Graças a Antoine Queric e Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles agora suporta corretamente restrições sobre variáveis String que foram criadas a partir de variáveis de carvão nos arquivos de dados. Graças a Antoine Queric e Aurelie Briand.
         
    * BUG FIX: Agora, quando um conjunto de dados fica indisponível, o conjunto de dados tenta notificar (com a mensagem "Este conjunto de dados está atualmente indisponível.") seus assinantes, ações listadas, rss e conjuntos de dados lonPM180 que dependem dele. Graças a Roy Mendelssohn e Bob Simons.
         
    * BUG FIX: Dois bugs relacionados ao EDDTableCopy. Graças ao Sam McClatchie.
         
    * MELHORADO: O número de solicitações falhadas mostradas na página status.html aumentará porque mais coisas são contadas como falhas do que antes.
         
    * MELHORADO:ERDDAP's status.html agora mostra "Pedidos (tempos medianos em ms) " na série do tempo. Anteriormente, mostrava tempos medianos truncados para segundos inteiros.
         
    * MELHORADO: Na saída jsonld, o "nome" jsonld agora vem do conjunto de dados"title"emERDDAP, e o jsonld "título" agora vem do conjunto de dados "datasetID"ERDDAP. Anteriormente, foi invertido. Isso parece errado para mim, porque no uso normal de inglês, "nome" é geralmente um curto, (idealmente) identificador único que raramente / nunca muda (por exemplo, Robert Middlename Simons) , não uma descrição que não é única e que pode facilmente e muitas vezes mudar (por exemplo, "Um tipo que escreve software paraNOAA" vs. "Um tipo alto que escreve software paraNOAA") . Gee, seria ótimo se a definição schema.org de[Nome](https://schema.org/name), no contexto de um Dataset, foram mais específicos. Os desenvolvedores de software devem ser capazes de escrever uma implementação de uma especificação baseada apenas na especificação, sem orientação de especialistas. Mas eu gosto do Google (notavelmente Natasha Noy&#33;) , NCEI (Notavelmente John Relph) , e Rob Fuller.
         
    * MELHORADO: Na saída jsonld, os quatro valores "espatialCoverage GeoShape box" são agora minLat minLon maxLat maxLon. Anteriormente, as posições de ponto e lon foram revertidas. Gee, seria ótimo se a definição schema.org de[Geossintéticos](https://schema.org/GeoShape)especificou a ordem correta. Os desenvolvedores de software devem ser capazes de escrever uma implementação de uma especificação baseada apenas na especificação, sem orientação de especialistas. Graças a Natasha Noy e Rob Fuller.

## Versão 1.82{#version-182} 
 (lançado em 2018-01-26) 

*    **Novos recursos (para usuários) :**   
     
    * Várias mudanças sutis no look-and-feel deERDDAP™páginas da web.
        * MELHORADO:ERDDAP™agora usa HTML 5 e faz melhor uso de CSS.
        * MELHORADO: As páginas web foram ligeiramente modificadas para torná-las mais limpas e menos "busy". (Eles ainda são densos e ainda há coisas que podemos reclamar, mas espero muito menos do que antes.) Obrigado a John Kerfoot por alguns comentários.
        * MELHORADO: As páginas da web agora parecem muito melhores em telefones celulares e outros dispositivos pequenos, especialmente se você usá-los na orientação da paisagem. Eles também olhar melhor em janelas muito pequenas e muito grandes em navegadores de desktop.
        * MELHORADO: Para melhorar a segurança e outras razões, o uso de uma versão de Openlayers fora de data para aWMSpáginas de demonstração foi substituído porLeaflet.
        * NOVO: suporte para pré-visualizações de arquivos de imagem, áudio e vídeo no"files"sistema (por exemplo,[este conjunto de dados de teste](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) e em.htmlTablerespostas quando uma célula tem o URL de um arquivo de imagem, áudio ou vídeo (por exemplo,[este pedido](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Se você pairar sobre um ícone '?', você deve ver uma imagem, áudio ou visualização de arquivo de vídeo. Você também pode clicar no link do arquivo para visualizar a tela cheia do arquivo no seu navegador. Ver[Documentação de arquivos de mídia](/docs/server-admin/datasets#media-files). Note que diferentes navegadores suportam diferentes tipos de arquivos, de modo que os exemplos podem não funcionar em seu navegador.
Graças a essas pessoas / links para ideias e código de amostra para CSS-apenas dicas de ferramenta de imagem (no https://codepen.io/electricalbah/pen/eJRLVd ) e carga de imagem diferida (no https://varvy.com/pagespeed/defer-images.html )   (embora o código tenha sido modificado antes de ser utilizadoERDDAP) .
Graças a Cara Wilson, Matthew Austin e Adam Shepherd/BCO-DMO para pedidos de suporte de imagem.
Graças a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell para pedidos de suporte de arquivos de áudio/hidrofone.
Graças à OOI por mostrar a necessidade de suporte de vídeo.
        * NOVO: Um subconjunto de dados de qualquerERDDAP™conjunto de dados (mas geralmente um conjunto de dados de arquivos de áudio) agora pode ser salvo em um arquivo de áudio .wav. ([documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Graças a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell para pedidos de suporte de arquivos de áudio/hidrofone.
        * MELHORADO: O formato para o Web Accessible Folders (WAF)   (por exemplo, as pastas /files/) foi atualizado para usar uma tabela HTML. O novo formato imita a versão mais recente das páginas web de listagem de diretório criadas por versões mais recentes do Apache. Os seres humanos descobrirão que as mudanças tornam a informação mais fácil de ler. Software que analisa estes documentos (por exemplo, software que coleta documentos ISO 19115 deERDDAP) terá que ser revisto, mas o novo formato será mais fácil de analisar do que o formato anterior. (Atenção, Anna Milan.) 
        * NOVOoutOfDateDatasets.htmlpágina. ([exemplo](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Esta página web mostra uma tabela com todos os conjuntos de dados quase em tempo real que têm um&lt;testOutOfDate&gt; (ver abaixo) , classificados por como fora de data os conjuntos de dados são. Este painel deve ser útil paraERDDAP™administradores e usuários finais quando eles querem saber quais conjuntos de dados estão fora de data. Para conjuntos de dados desatualizados, há presumivelmente um problema com a fonte de dados, de modo queERDDAP™é incapaz de ver / obter dados de pontos de tempo mais recentes.
Administradores: Se você não quiser uma página da web Out-Of-Date Datasets, adicione isso ao seu setup.xml:
            &lt;outOfDateDatasetsActive&gt;false&lt;/outOfDateDatasetsActive&gt;
Há agoratestOutOfDatee fora DeData colunas noallDatasetsconjunto de dados.
Graças a Bob Simons, que queria isso há anos, e para as pessoas inteligentes do Instituto Marinho da Irlanda que me deu a inspiração através de seu dedicado Raspberry Pi e monitor que sempre mostra uma tela como esta em seu escritório.
        * MELHORADO:.htmlTablee.xhtmlresposta agora são melhor formatados, mais compactos, e assim carregam mais rápido. Graças a HTML5 e CSS.
    * Novo tipo de arquivo de saída para conjuntos de dados griddap: .timeGaps. Ele mostra uma lista de lacunas nos valores de tempo que são maiores do que a lacuna mediana. ([exemplo](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Isto é útil paraERDDAP™administradores e usuários finais quando eles querem saber se existem lacunas inesperadas nos valores de tempo para um conjunto de dados que se espera ter valores de tempo regularmente espaçados. Graças a Bob Simons e Roy Mendelssohn que precisava deste recurso.
    * MELHORADO: O gráfico padrão para oallDatasetsdataset é agora um mapa com x=maxLon e y=maxLat. Graças a John Kerfoot, Rich Signell e OOI-CI.
    * NOVO:[O que é?](https://github.com/ioos/erddapy)- Não é umERDDAP™característica, mas será de interesse para muitosERDDAP™usuários. Erddapy (ERDDAP™+Python) é umPythonbiblioteca criada por Filipe Fernandes que "aproveita a vantagem deERDDAP'RESTfulserviços web e cria oERDDAP™URL para qualquer solicitação como pesquisa de conjuntos de dados, aquisição de metadados, download de dados, etc." Graças a Filipe Fernandes.
    * Devia ter mencionado antes: Há um pacote R de terceiros projetado para facilitar o trabalho comERDDAP™de dentro R:[O que se passa?](https://github.com/ropensci/rerddap#rerddap). Graças a[ROpenSci](https://ropensci.org/)e Roy Mendelssohn.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   
     
    * Para fazer: Em setup.xml, logo abaixo&lt;adminInstitution&gt;, adicione um&lt;adminInstitutionUrl&gt; tag que especifica um URL para sua instituição (ou grupo) .
    * TO DO: Estas 3 tags no setup.xml não são mais utilizadas:
        &lt;início HeadHtml&gt;&lt;startBodyHtml&gt; e&lt;endBodyHtml&gt;. Eles são substituídos por
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; e&lt;endBodyHtml5&gt;, que têm valores padrão especificados em mensagens.xml (e mostrado abaixo) .
        
Recomendamos usar o padrão&lt;startHeadHtml5&gt; e&lt;endBodyHtml5&gt;.
Recomendamos: Se você fez alterações no original&lt;startBodyHtml&gt; e/ou quer personalizar o seuERDDAP™agora, por favor, copie o novo&lt;startBodyHtml5&gt; tag (a partir de abaixo) em seu setup.xml e modificá-lo para personalizar seuERDDAP™assimERDDAPAs páginas web refletem sua organização, nãoNOAA ERD. Notavelmente, por favor, mude o "Pedido por você" para sua organização (S) . Se você precisar de ajuda, por favor e-mailerd.data at noaa.gov. (Se você não quiser personalizar seuERDDAP™agora, use o padrão&lt;startBodyHtml5&gt;.)
        
Em seguida, exclua as 3 tags antigas em seu setup.xml que não são mais utilizadas.

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

Existem maneiras adicionais que você pode[personalizarERDDAP™](/docs/server-admin/deploy-install#customize)Então...ERDDAPAs páginas web refletem sua organização em vez deNOAA ERD.
        
    * Para fazer:&lt;EDDGrid...Example&gt; tags (começando com&lt;EDDGridIdExample &gt;) e o&lt;EDDTable... Exemplo &gt; tags (começando com&lt;EDDTableIdExample&gt;) em seu arquivo setup.xml são usados para criar exemplos no griddap etabledapdocumentação. html páginas web em seuERDDAP.
        
Se você não personalizou essas tags, exclua-as do arquivo setup.xml. Agora todos eles têm padrões em message.xml que se referem a conjuntos de dados no Bob'sERDDAP™em https://coastwatch.pfeg.noaa.gov/erddap/index.html . Então você não precisa mais ter conjuntos de dados específicos em seuERDDAP. Se você quiser substituir os padrões, copie algumas ou todas essas tags em seu setup.xml e altere seus valores.
Se você quiser que os exemplos apontam para o seuERDDAP™, o método mais fácil é:
        
        1. Inclua estes dois conjuntos de dados em seuERDDAP™adicionando isso ao seudatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Adicione esta tag ao seu setup.xml, mas altere a URL para o seuERDDAP' (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Se você personalizou essas tags, deixe-as como é e, por favor, adicione estas 2 novas tags ao seu setup.xml para especificar oERDDAP™URL para esses conjuntos de dados, mas mude a URL para o seuERDDAP' (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Para fazer:ERDDAP™agora usa um arquivo css chamado erddap2.css. Se você fez alterações\\[Toca a brincar.\\]/webapps/erddap/images/erddap.css, considerar fazer alterações semelhantes ao erddap2.css (no mesmo diretório) .
    * NOVO:ERDDAP's páginas web agora têm um grande número de links internos quase invisíveis (o texto é preto e não sublinhado) . Se você passar por um desses links (geralmente as primeiras palavras de títulos e parágrafos) , o cursor torna-se uma mão. Se você clicar no link, o URL é o link interno para essa seção do documento. Isso facilita a referência a seções específicas da documentação. Graças ao Bob Simons, que queria isto há anos.
    * NOVO:ERDDAP™agora suporta[Intervalo de Byte / Aceite-Ranges](https://en.wikipedia.org/wiki/Byte_serving)pedidos de porções de /files / arquivos. Isso foi necessário para apoiar os espectadores de áudio e vídeo em navegadores.
    * TO DO: Agora, para melhorar a segurança, se você especificou&lt;baseHttpsUrl&gt; em setup.xml (e assim apoiarhttps) , a bandeira recomendada Url é umhttpsURL com um flagKey mais seguro. Se assim for, qualquer bandeira anteriorUrls/flagKeys se tornará inválido. Administradores: Se estas alterações se aplicam ao seuERDDAP™e se o seuERDDAP™ele temEDDGridFromErddap e EDDTable FromErddap's que se inscrever em remotoERDDAPs, então, depois de atualizarERDDAP, seuERDDAP™tentará automaticamente se inscrever com o novo flagUrl, então você deve excluir as assinaturas antigas e validar as novas assinaturas quando você obter os novos e-mails de validação de assinatura.
    * Para fazer:ERDDAP™ele temEDDGridConjuntos de dados Erddap para conjuntos de dados erdVH3 no relógio de costa de BobERDDAP™, por favor alterá-los para se referir aos novos conjuntos de dados erdVH2018.
    * TO DO: Se você incluir qualquer um dos conjuntos de dados de amostra jplAquariusSSS em seuERDDAP™, por favor mude "V4" nodatasetIDÉ para "V5".
    * Para fazer:actual\\_rangeé agora um atributo padrão CF (a partir de CF-1.7) e claramente diz que se a variável usaradd\\_offsete/ouscale\\_factorpara embalar os valores de dados, em seguida, oactual\\_rangeos valores devem usar o tipo de dados desembalado e ser valores desembalados. Infelizmente, este conflito com o nosso conselho anterior. Gerar conjuntos de dados Xml agora despacotes embaladosactual\\_rangevalores, mas isso não irá corrigir conjuntos de dados existentes em seusdatasets.xmlficheiro.
        
Então, verifique seus conjuntos de dados: se os valores de uma variável forem embalados e seactual\\_rangeé especificado como valores de dados embalados, adicione um&lt;addAttributes&gt;actual\\_rangevalor para especificar os valores não embalados. Caso contrário, o conjunto de dados não será carregadoERDDAP. Uma maneira simples e quase perfeita de fazer isso é pesquisar seudatasets.xmlpara fonte Atributos que têm
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
e umscale\\_factordiferente de 1.0. Estes são osactual\\_rangeatributos que você pode ter que corrigir.
        
Para variáveis de eixoEDDGridconjuntos de dados,ERDDAP™sempre define oactual\\_rangeatribuir para ser a gama real dos valores, uma vez que conhece esses valores.
        
Para variáveis de eixo com valores decrescentes (por exemplo, algumas variáveis de latitude) ,ERDDAP™criadoactual\\_rangecom o\\[0\\]...\\[último\\]valores, que eram altos... baixos. Agora ele sempre usa valores baixos... altos para fazer a nova definição CF.
        
A correção daactual\\_rangevalores é particularmente importante para conjuntos de dados EDDTable, porqueERDDAP™rejeitará rapidamente as solicitações do usuário para valores de dados que são menos do que osactual\\_rangevalor mínimo ou que são maiores do que oactual\\_rangevalor máximo.
        
Relacionado: o real\\_min, real\\_max,data\\_minedata\\_maxatributos são agora deprecated. Por favor, converta seus conjuntos de dados para usaractual\\_rangeEm vez disso.
        
    * Para fazer (opcional, mas recomendado) : Para cada conjunto de dados de tempo quase real e previsão em seuERDDAP™, por favor adicione um [&lt;testOutOfDate&gt; (/docs/admin/datasets#testoutofdate) tag com um valor no formulárionow-_nUnits_, por exemplo,now-2 dias. Se o valor máximo de tempo para o conjunto de dados for mais antigo do que esse valor, o conjunto de dados é considerado out-of-date e será marcado como tal no[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)página web. Isso fornece uma maneira fácil para você ver quando algo está errado com a fonte de um conjunto de dados.
    *   [NOVO: Marcação semântica de conjuntos de dados com json-ld (JSON Dados ligados) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™agora usa[json-ld (JSON Dados ligados) ](https://json-ld.org)para fazer seu catálogo de dados e conjuntos de dados parte do[web semântica](https://en.wikipedia.org/wiki/Semantic_Web), que é a ideia de Tim Berners-Lee de tornar o conteúdo web mais legível por máquina e máquina "suportável". Motores de busca ([Google em particular](https://developers.google.com/search/docs/data-types/datasets)) e outras ferramentas semânticas podem usar essa marcação estruturada para facilitar a descoberta e indexação. A marcação estruturada json-ld aparece como invisível-para-humanos&lt;script código no http://.../erddap/info/index.html Página web (que é uma web semântica[DataCatalog](https://schema.org/DataCatalog)) e em cada http://.../erddap/info/_datasetID_/index.html Página web (que é uma web semântica[Conjunto de dados](https://schema.org/Dataset)) . (Obrigado especial a Adam Leadbetter e Rob Fuller do Instituto Marinho na Irlanda por fazer as partes difíceis do trabalho para fazer esta parte deERDDAP.) 
    * NOVO: Existem novos tipos de conjuntos de dados que podem ler dados de arquivos de áudio:
        [EDDGridA partir deAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), que trata dados de áudio como dados gradeados.
        [EDDTable FromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), que trata dados de áudio como dados tabulares. Graças a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell para pedidos de suporte de arquivos de áudio/hidrofone.
    * Alterações para gerar conjuntos de dados Xml (e mudanças relacionadas) :
        * NOVO:ERDDAP™agora tem um sistema para automaticamente[atualizar URLs fora de data](/docs/server-admin/additional-information#out-of-date-urls)ambos em GerarDatasets Xml e ao carregar conjuntos de dados. Se você tem sugestões para URLs adicionais que devem ser pegos e atualizados, ou se você acha que isso deve ser transformado em um serviço (como os Conversores) , por favor e-mailerd.data at noaa.gov.
        * NOVO: Agora, se GerarDatasets Xml vê um CFstandard\\_name  (que deve ser tudo minúsculo) com um caractere maiúscula, adiciona a versão minúscula para&lt;addAttributes&gt; Além disso, quando um conjunto de dados carrega, seERDDAP™vê um CFstandard\\_namecom um caráter maiúscula, ele silenciosamente muda para ostandard\\_name. Graças ao Rich Signell.
        * NOVO: Agora, se GerarDatasets Xml vê um atributo com um tempo que não está no formato ISO 8601, adiciona o tempo formatado ISO 8601 para&lt;addAttributes&gt; SeERDDAP™não reconhece o formato, deixa o valor do tempo inalterado. Se você vê um formato queERDDAP™não reconhece e corrige, por favor envie-o paraerd.data at noaa.gov.
        * MELHORADO: O código de baixo nível para oEDDGridDe Thredds Opção de catálogo em GerarDatasets Xml agora depende doUnidatanetcdf-java catálogo rastreador código (Thredds. aulas de catálogo) para que possa lidar com todos os catálogos THREDDS (que pode ser surpreendentemente complexo) . Graças a Roland Schweitzer para sugerir esta mudança e graças aUnidatapara o código.
        * NOVO: Gerar conjuntos de dados Xml paraEDDGridA partir de agora adiciona ", startYear-EndYear" ao fim do título com base nos valores reais do eixo do tempo. EndYear="present" se os dados existirem nos últimos 150 dias.
        * NOVO: Gerar conjuntos de dados Xml paraEDDGridFromDap agora adiciona ",\\[Resolução\\]°" ao título se o conjunto de dados é uniformemente espaçado e o mesmo para lat e lon.
        * MELHORADO: O conversor de tempo agora tem recursos adicionais, notavelmente a capacidade de converter tempos de cadeia em uma ampla variedade de formatos comuns em strings ISO 8601 ou em um número compatível com UDUnits. Todos os recursos anteriormente suportados continuam a funcionar, inalterados.
        * BUG FIX: Gerar conjuntos de dados Xml e o conversor Palavras-chave agora incluem "Earth Science &gt; " no início do GCMD Science Keywords. Quando um conjunto de dados é carregadoERDDAP™,ERDDAP™agora corrige todas as palavras-chave GCMD no atributo keywords que não começam com "Earth Science &gt; " ou que usam qualquer outra coisa além do caso do título (onde a primeira letra de cada palavra é capitalizada) .
        * MELHORADO: Ao sugerir&lt;destinationName&gt;'s, Gerar conjuntos de dados Xml para EDDTableFromAsciiFiles apenas usou a extremidade da cauda desourceNamecom'/'  (alguns foram nomes de arquivo como) . Agora ele usa todo osourceName(por exemplo, "blahblahblah (m/s)". Esta mudança será boa para alguns conjuntos de dados e não para outros, mas é um comportamento mais seguro. Graças ao Maurice Libes.
        * BUG FIX: Gerar conjuntos de dados Xml e os construtores de conjuntos de dados agora garantem que não há nomes de colunas duplicados. Graças ao Maurice Libes.
        * BUG FIX: Gerar conjuntos de dados Xml para EDDTableFromAsciiFiles não escreveu&lt;columnSeparator&gt; para a saída. Agora faz. Graças ao Maurice Libes.
    * NOVO: A ferramenta DasDds agora imprime informações de intervalo de tempo (o[.timeGaps information](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) se o conjunto de dados é um conjunto de dados gradeado.
    * NEW: Pesquisa avançada agora aceita valores de tempo "now_\\-nUnits_". Graças ao Rich Signell.
    * MELHORADO: Para melhorar a segurança, quando um endereço de e-mail em metadados ou dados de um conjunto de dados é escrito para uma página web html, o "@" é substituído por " em ". Isso só pega endereços de e-mail que são todos os metadados ou valor de dados, não endereços de e-mail incorporados em valores mais longos.
    * MELHORADO: Para aumentar a segurança, oRSSinformaÃ§Ãμes para conjuntos de dados privados sÃ£o disponÃ­veis agora apenas aos usuÃ¡rios (eRSSleitores) que estão conectados e autorizados a usar esse conjunto de dados.
    * NOVO: Agora, quando um conjunto de dados é carregado, sedate\\_created,date\\_issued,date\\_modified, ou data\\_metadata\\_modified atributo tem um valor de tempo que não está no formato ISO 8601,ERDDAP™muda-o para o tempo formatado ISO 8601. SeERDDAP™não reconhece o formato, deixa o valor do tempo inalterado. Se você vê um formato queERDDAP™não reconhece e corrige, por favor envie-o paraerd.data at noaa.gov.
    * MELHORADO: .faz respostas deEDDGriddatasets devem agora ser significativamente mais rápido. Graças ao Rich Signell.
    * Mudanças relacionadas comERDDAPA criação de documentos ISO 19115:
        * BUG FIX: ao criar documentos ISO 19115,dataVariableunidades não foram HTML Atributo codificado e por cento codificado. Agora estão. Graças ao validador ISO 19115 da NGDC.
        * BUG FIX: ao criar documentos ISO 19115,date\\_createdfoi usado como é, tantas vezes foi o formato errado. Agora é convertido para ISO 8601 Z string. Graças ao validador ISO 19115 da NGDC.
        * BUG FIX: ao criar documentos ISO 19115,ERDDAP™agora escreve datas com ano=0000 (como com conjuntos de dados de climatologia) , porque o esquema ISO 19115 não permite datas com ano=0000. Graças ao validador ISO 19115 da NGDC.
    * NOVO: Como antes de um pedido parahttp.../erddap/versão retornará apenas o número da versão (como texto) Por exemplo, "ERDDAP\\_version=1.82.
Agora, um pedido parahttp.../erddap/version\\_string retornará um número e um sufixo opcional de '\\_' mais texto ASCII (sem espaços ou caracteres de controle) Por exemplo, "ERDDAP\\_version\\_string=1.82\\_JohnsFork". As pessoas que fazem o garfo especificarão isso mudando EDStatic.erddapVersion. Esta forma de fazê-lo não causa problemas para versões anteriores deERDDAP. Graças a Axiom (notavelmente, Kyle Wilcox) e Instituto Marinho da Irlanda (notavelmente, Rob Fuller) .
    * BUG FIX: Para wms version=1.3.0, request=GetMap, crs = EPSG:4326 (não CRS:84) pedidos: a ordem bbox deve ser minLat,minLon,maxLat,maxLon. Para CRS:84 pedidos, como antes, a ordem bbox deve ser minLon,minLat,maxLon,maxLat. Isso pode corrigir usandoERDDAP'WMSServiço 1.3.0 emArcGIS  (graças a Paola Arce) . Obrigado. (não) paraOGCpara tornar isto tão complicado. Graças aLeafletpara lidar com isso corretamente e para me dar uma maneira de testar isso.
    * MELHORADO: Anterior, o link sugerido paraRSSe assinaturas de e-mail tem ohttpURL para o seuERDDAP. Agora é ohttpsURL, se isso estiver ativo.
    * NOVO:EDDGridCopiar agora suporta uma tag opcional&lt;somenteDesde que&gt;_someValue_&lt;/onlySince&gt;, onde o valor é um tempo específico de formato ISO-8601 ou umnow-NUnits (por exemplo,now-2 anos) Hora. Ver[apenas Desde a documentação](/docs/server-admin/datasets#onlysince). Graças ao Drew P.
    * MELHORADO: Se disponível,ERDDAP™vai mostrar ohttpsURL (de&lt;baseHttpsUrl&gt;, se disponível) em vez dohttpURL quando ele diz aos usuários o URL para adicionar / validar / remover / listar uma assinatura.
    * BUG FIX:ERDDAP™agora permite uma ação de assinatura para começar com " https://" . (Bob bate na testa.) Graças a Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPagora usa ':' entre cada chave e valor, em vez de'='. (Bob bate na testa.) Graças a Alexander Barth.
    * BUG FIX: Anteriormente, se reiniciaresERDDAP™com quickRestart=true, e se, antes que o conjunto de dados fosse recarregado normalmente, você fez uma chamada para um conjunto de dados EDDTableFromFiles que usou atualizaçãoEveryNMillis, e se um arquivo de dados tivesse acabado de ser alterado, a solicitação falharia com um erro de ponteiro nulo. Agora o pedido terá sucesso. Graças ao John Kerfoot.
    * NOVO: Quando um conjunto de dados é carregadoERDDAP™, as palavras-chave são agora reorganizadas em ordem ordenada e quaisquer caracteres de linha nova são removidos.
    * MELHORADO: Agora, se um .geoJson,.jsonou.ncoJson pedido tem.jsonp parâmetro, o tipo de resposta mime é application/javascript. Note que.jsonp não é suportado.jsonlCSVou.jsonlKVPJá que não funcionaria. Graças ao Rob Fuller.
    * MELHORADO: O tipo de mímica para linhas json fileType opções agora é "aplicação/x-jsonlines". Foi aplicação/jsonl. Atualmente, não há escolha correta definitiva.
    * MELHORADO: O número de pedidos falhados mostrados na página status.html aumentará porque mais coisas são contadas como falhas do que antes, por exemplo, ClientAbortException.
    * MELHORADO: Agora, se uma resposta deERDDAP™não é comprimido, então o cabeçalho da resposta incluirá "Content-Encoding"="identidade".
    * MELHORADO: O atributo "licença" não era necessário. Agora, se não for especificado, o padrãoLicense de mensagens.xml (ou de setup.xml se presente) é usado como padrão.
    * NOVO: Há agora um opcional[atributo fileAccessSuffix](/docs/server-admin/datasets#fileaccessbaseurl). que pode ser usado com o existente[atributo fileAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl).
    * MELHORADO: Para aumentar a segurança, esta versão foi compilada com o mais recenteJavaJDK v8u162.
    * NOVO: Para aumentar a segurança, vários domínios comuns que oferecem endereços de e-mail temporários (por exemplo, @mailinator.com) estão agora em uma lista de email permanente para o sistema de assinaturas.
    * NOVO: Para aumentar a segurança, as altas no Daily Report agora incluem:
Conjunto de dados Bandeira Endereço IP Falhado (desde o último relatório diário)   
Conjunto de dados Bandeira Endereço IP Falhado (desde a inicialização)   
Conjunto de dados Bandeira Endereço IP Succeeded (desde o último relatório diário)   
Conjunto de dados Bandeira Endereço IP Succeeded (desde a inicialização)   
Os alto "Failed" permitem que você veja quem (Um hacker?) está tentando definir uma bandeira, mas está falhando.
    * MELHORADO: Para aumentar a segurança, endereços de e-mail no&lt;subscriçãoEmailBlacklist&gt; em seudatasets.xmlsão agora considerados insensíveis a casos.
         

## Versão 1.80{#version-180} 
 (lançado 2017-08-04) 

*    **Novos recursos (para usuários) :**   
     
    * NOVOorderByCount () filtro permite especificar como a tabela de resultados será ordenada (ou não) e apenas retorna uma linha para cada grupo de classificação, com a contagem do número de valores não perdidos para cada variável.
Por exemplo,orderByCount ("stationID") vai ordenarstationIDe retornar uma linha para cadastationID, com uma contagem do número de valores não perdidos para cada variável.
Se você apenas especificarorderByCount (") , a resposta será apenas uma linha com o número de valores não perdidos para cada variável de dados.
Ver[orderBy... documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Graças ao Ben Adams.
    * NOVO.ncarquivo oJson Digite a opção para conjuntos de dados gradeados e tabulares. Esta opção faz umaNCOlvl=2 "pedantic" arquivo JSON com todas as informações normalmente encontradas em um.ncficheiro. Ver[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Graças ao Charlie Zender.
    * BUG FIX: OorderBy... () opções na página web Make A Graph são tratadas corretamente.
    * BUG FIX: saída .geoJson agora não imprime linhas onde os valores de ponto ou lon estão faltando. Além disso, valores de altitude (se disponível) estão agora incluídos nas coordenadas, não como valores de dados. Graças ao Jonathan Wilkins.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   
     
    * ISSUE SEGURANÇA: A biblioteca protocols.js usada para oOpenLayersdemo noWMSpáginas emERDDAP™é out-of-date e tem um bug que potencialmente permite que ele seja mal utilizado. (Infelizmente, atualizandoOpenLayerse protocolos. js não é fácil.) Isso abre a possibilidade de que a biblioteca possa ser criada para permitir uma vulnerabilidade cross-site. No entanto, desdeERDDAP™apenas utilizaOpenLayersem uma maneira específica de pré-ajustar e apenas com específicoERDDAP- fontes de dados baseadas, acreditamos que não há nenhuma vulnerabilidade no localERDDAPO uso deOpenLayerse protocols.js. No entanto, se você não acredita nisso, você agora pode desativar o uso doOpenLayersdemo noWMSpáginas de suaERDDAP™adicionando
```
        <openLayersActive>false</openLayersActive>  
```
para o seu arquivo setup.xml. O padrão é "verdadeiro". Graças a Charles Carleton e NCEI.
    * CHANGES DE SEGURANÇA: Arquivos .jar não utilizados e arquivos .jar duplicados (porque eles também estão em netcdfAll.jar) foram removidos doERDDAP™distribuição. Arquivos .jar fora de data foram atualizados. Graças a Charles Carleton e NCEI.
    * Mudanças de segurança: O arquivo netcdfAll.jar distribuído comERDDAP™é a versão mais recente (atualmente 4.6.10) , mas ainda contém arquivos jackson .jar internos que são conhecidos por estar fora de data e ter vulnerabilidades de segurança, notadamente as bibliotecas Jackson que são usadas apenas ao acessar fontes de dados Amazon S3. Se você não estiver acessando dados via Amazon S3 (você saberia se você fosse) , estas vulnerabilidades não são relevantes.
        
Os desenvolvedores netcdf-java sustentam que essas vulnerabilidades não são relevantes por causa da maneira como o código netcdf usa essas bibliotecas e, em qualquer caso, só seria relevante ao acessar o Amazon S3. Ver[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Acredito neles. Se você ainda tem preocupações sobre isso, entre em contato com os desenvolvedores netcdf-java. (Note que se você não acredita nos desenvolvedores netcdf-java e está pensando em não usarERDDAP™por causa disso, você não deve usar THREDDS também, porque THREDDS usa netcdf-java mais fundamental e mais extensivamente do queERDDAP.) 
        
Detalhes: O código problemático e os avisos de vulnerabilidade são:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - ... Alto.
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - ... Alto.
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - ... Alto.
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Crítico
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-7051 - ... Alto.
Ver https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Crítico
"Para a versão 4.6.10, aws-java-sdk-core puxa na versão 2.6.6 de artefatos jackson-\\*." (e-mail de pessoas netcdf-java) .
Graças a Charles Carleton e NCEI.
        
    * CHANGES DE COMPILER: Se você recompileERDDAP™, note que o parâmetro -cp classpath necessário para a linha de comando é agora muito mais curto do que antes. Veja a nova configuração -cp em[esta documentação](/docs/contributing/programmer-guide#development-environment). Graças a Charles Carleton e NCEI.
    * NOVA OPÇÃO em GerarDatasets Xml: EDDTableFromBcodmo, que é apenas para uso interno no BCO-DMO.
Graças a Adam Shepherd e BCODMO.
    * NOVA ATTRIBUTE e FEATURE: Se uma coluna EDDTable tiver nomes de arquivo de arquivos acessíveis à web (por exemplo, imagem, vídeo ou arquivos de áudio) , você pode adicionar
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
para especificar a URL base (final com /) necessário para fazer os nomes de arquivos em URLs completas. Então,.htmlTablerespostas,ERDDAP™irá mostrar o nome do arquivo como um link para a URL combinada (a base Url mais o nome do arquivo) .
Se quiseresERDDAP™para servir os arquivos relacionados, fazer um conjunto de dados EDDTableFromFileNames separado para esses arquivos (pode ser um conjunto de dados privado) .
Graças a Adam Shepherd e BCODMO.
    * RECOMENDAÇÃO NOVO ATTRIBUTE: Se uma coluna EDDTable tiver nomes de arquivo de arquivos acessíveis à web (por exemplo, imagem, vídeo ou arquivos de áudio) que são acessíveis através de um arquivo (por exemplo,.ziparquivo) acessível através de uma URL, use
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
para especificar a URL do arquivo.
Se quiseresERDDAP™para servir o arquivo de arquivo, faça um conjunto de dados EDDTableFromFileNames separado para esse arquivo (pode ser um conjunto de dados privado) .
Graças a Adam Shepherd e BCODMO.
    * MELHORES para Gerar Conjuntos de Dados Xml para remover as causas de inválido / ruim&lt;subsetVariables&gt; sugestões e nomes variáveis duplicados/maio sugeridos, etc. Graças a Rich Signell, Adam Shepherd e BCO-DMO.
    * Nova opção: A informação de fronteira política distribuída comERDDAPé de um terceiro e um pouco fora de data. Além disso, há limites disputados em vários lugares do mundo, onde pessoas diferentes terão diferentes ideias sobre o que é correto. NÃ3s nÃ3s não podemos falar sobre a corrreta do DADOS BOUNÁRIO POLÍTICO que vem comERDDAP. Se você não gosta da informação de fronteira política que vem comERDDAP™Agora podes dizerERDDAP™nunca traçar limites políticos adicionando
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
para o seu arquivo setup.xml. O padrão é "verdadeiro". Graças a Raju Devender.
    * NOVO TAG DE METADOS: Nodatasets.xmlpara um conjunto de dados, agora você pode especificar o número padrão de cor Seções de barras para umdataVariableem gráficos e mapas com
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, que diz para deixarERDDAP™decidir) . Ver[cor da cor Configurações da barra](/docs/server-admin/datasets#color-bar-attributes).
    * MELHORADO: a cor do limite do estado nos mapas era roxo (Deep Purple para você Baby Boomers) . Agora é cinza (entre a fronteira nacional cinza e a terra cinza) .
    * BUG FIX:&lt;iso19115File&gt; e&lt;fgdcFile&gt; emdatasets.xmlnem sempre foram tratados corretamente. Agora estão. Graças à BCO-DMO.

## Versão 1.78{#version-178} 
 (lançado 2017-05-27) 

*    **Novos recursos (para usuários) :**   
     
    *    (nenhum)   
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   
     
    * MELHORADO: A ordem das linhas em "Major LoadDatasets Time Series" na página status.html é agora mais recente em cima para mais antigo na parte inferior.
    * BUG FIX:ERDDAP™agora escreve.nccsvarquivos com a variável de tempoactual\\_rangecomo um tempo de corda ISO-8601. Isso corrige o bug com EDDTableFromErddap analisando informações de um conjunto de dados remoto e do arquivo quickRestart para todos os conjuntos de dados EDDTableFrom...Files. (O tempoactual\\_rangeserá errado na primeira vez que o conjunto de dados carrega em v1.78 mas correto depois que ele é recarregado, por exemplo, se você sinalizar o conjunto de dados.) 

## Versão 1.76{#version-176} 
 (lançado 2017-05-12) 

*    **Novos recursos (para usuários) :**   
     
    * CHANGE em Tomcat: Para pedidos deERDDAP™vindo de software diferente de navegadores da Web (por exemplo,curl, R,Matlab,Python,Java) :
Tal como acontece com as mudanças anteriores nas versões de Tomcat (o software de nível inferior que executaERDDAP) desde o início de 2016, mais e mais dos caracteres na parte de consulta do URL de solicitação devem ser[ **Porcento Codificado** ](/docs/server-admin/datasets#infourl)por razões de segurança. Os navegadores cuidam da codificação por cento para você. assim usandoERDDAP™em um navegador não é afetado a menos que o pedido seja redirecionado para outroERDDAP.
    * Anteriormente,ERDDAP™tratados **variáveis de caridade** mais como inteiros curtos não assinados do que personagens. Agora trata-os mais como 1-caracter-long UCS-2 (Unicódigo) Cordas. Ver[documentação do carvão](/docs/server-admin/datasets#char). Graças a Aurelie Briand e ao projeto Argo.
    * Anteriormente,ERDDAP™pouco apoio oferecido para **Personagens do Unicode** acima do personagem #255 em cordas. Agora, internamente,ERDDAP™suporta totalmente 2-byte UCS-2 chars (caracteres numerados 0 a 65535) em Strings. Quando os dados String são escritos para vários tipos de arquivos,ERDDAP™faz o melhor que pode para apoiar 2-byte chars. Outro exemplo é arquivos .csv queERDDAP™escreve com o charset ISO-8859-1 (um charset de 1 byte) EntãoERDDAP™escreve qualquer personagem acima do caracter #255 com a sintaxe JSON-like \\u_hhh_. Ver[Dados de cadeia](/docs/server-admin/datasets#string).
    * MELHORADO: Em.ncarquivos escritos porERDDAP™, as variáveis de caridade a serem interpretadas como Strings terão o atributo
         **\\_Encoding=ISO-8859-1**   
Em.ncarquivos lidos porERDDAP™, as variáveis de caridade com "\\_Encoding" serão interpretadas como Strings com o charset especificado.
    * REMINDER:ERDDAP™suportes **JSON-como backslash-encodificação** de caracteres especiais quando você especificar restrições de variáveis char e String. Assim, você pode solicitar algo como &myString="\\u20ac" quando você quer linhas de dados onde myString=€ desde 20ac é a versão hexadecimal do ponto de código para o símbolo Euro. Várias fontes na web mostram os números de pontos de código para símbolos Unicode, por exemplo,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Anteriormente,ERDDAP™suporte limitado oferecido para **inteiro longo** variáveis. Agora&#33;ERDDAP™totalmente suporta longs internamente e faz o seu melhor ao escrever dados longos para vários tipos de arquivo. . Ver[documentação longa](/docs/server-admin/datasets#long). Graças ao Instituto Marinho da Irlanda, Craig Risien, Rich Signell, Christopher Wingard e OOI.
    * NOVO: Tipo de arquivo de saída para griddap etabledap: **.nccsv** , que faz umNetCDF-como, ASCII, arquivo CSV que também contém todos os metadados que estariam em uma comparável.ncficheiro. Ver[NCCSV Especificação](/docs/user/nccsv-1.00). Graças ao Steve Hankin.
    * NOVO: **orderByClosestfiltro de filtro** permite especificar como a tabela de resultados será ordenada e um intervalo (por exemplo, 2 horas) . Dentro de cada grupo de classificação, somente as linhas mais próximas ao intervalo serão mantidas. Por exemplo,orderByClosest ("stationIDTempo, 2 horas) vai ordenarstationIDe tempo, mas só retorna as linhas para cadastationIDonde o últimoorderBycoluna (Tempo) é mais próximo de intervalos de 2 horas. Esta é a coisa mais próximatabledappara estender valores em um pedido griddap. Esta opção pode ser especificada através de qualquertabledappágina web .html do dataset, página web .graph, e por qualquer URL que você gerar. Graças ao Instituto Marinho da Irlanda e ao Ocean Networks Canada.
    * NOVO: **orderByLimitfiltro de filtro** permite especificar como a tabela de resultados será ordenada e um número de limite (por exemplo, 100) . Dentro de cada grupo de classificação, apenas as primeiras linhas 'limit' serão mantidas. Por exemplo,orderByMax ("stationID100.) vai ordenarstationID, mas apenas retornar as primeiras 100 linhas para cadastationID. Isto é semelhante à cláusula LIMIT do SQL. Esta opção pode ser especificada através de qualquertabledappágina web .html do dataset, página web .graph, e por qualquer URL que você gerar. Graças ao Instituto Marinho da Irlanda e ao Ocean Networks Canada.
    * NOVO: Dois novos tipos de arquivos de resposta, **.jsonlCSVe.jsonlKVP** estão disponíveis para pedidos para conjuntos de dados gradeados, conjuntos de dados tabulares e muitos outros lugares emERDDAP  (por exemplo, solicitações de informações sobre conjuntos de dados) . Os arquivos são arquivos JSON Lines ([ https://jsonlines.org/ ](https://jsonlines.org/)) onde cada linha tem um objeto JSON separado..jsonlCSVapenas tem os valores em um formato CSV..jsonlKVPtem chave: pares de valores. Cada linha fica por conta própria. As linhas não são fechadas em um array ou objeto JSON maior. Por exemplo, veja[este pedido de amostra](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Graças a Damian Smyth, Rob Fuller, Adam Leadbetter e Instituto Marinho da Irlanda.
    * NOVO: Há uma nova documentação descrevendo[ **Como Aceder a Conjuntos de Dados PrivadosERDDAP™via Scripts** ](/docs/user/AccessToPrivateDatasets). Graças a Lynn DeWitt.
    * MELHORADO: A extensão mínima da **OpenLayers** mapa foi de 2 graus e é agora 4 pixels de dados. Graças ao Rusty Holleman.
    * MELHORADO: Em alguns casos comuns, solicitações que incluem **expressão regular** constrangimento será processado muito mais rápido.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   
     
    *    **SLOW FIRST STARTUP:** A primeira vez que você começar esta nova versão, levará muito tempo paraERDDAP™para carregar todos os conjuntos de dados porque precisa reler todos os arquivos de dados de origem (embora apenas o cabeçalho para arquivos de dados gradeados) . Se você olhar para os logs, você pode ver mensagens de erro dizendo "velho / não suportado reforçadaVersão" de alguns arquivos internos -- isso é bom --ERDDAP™fará as novas versões dos arquivos internos. Por favor, seja paciente.
    * ACÇÃO:ERDDAP™agora usa o novo **java.time** aulas (também conhecido como JSR 310) em vez de Joda para analisar vezes String em tempos numéricos. Notas:
        * SeERDDAP™de repente tem problemas analisando tempos de corda para um determinado conjunto de dados e, portanto, apenas converte a maioria ou todas as vezes para NaN's (valores ausentes) , o problema é quase sempre com a data string de formato de tempo que você especificou como as "unidades" da variável. O novo sistema às vezes precisa de uma string de formato dateTime ligeiramente diferente.
        * Se meses e dias numéricos nas cadeias de caracteres de dataTime não são 0-adicionados (por exemplo, "3/7/2016") , certifique-se de que o formato apenas tem um único M e d (por exemplo, "M/d/yyyyyy", não "MM/dd/yyyyyy") .
        * Alterar qualquer especificação de segundos fracionados que use minúsculas s's (por exemplo, o .sss inyyyy-MM-dd- Sim.) , em capital S. (por exemplo,yyyy-MM-dd- Sim.) .
        *   ERDDAP™não suporta mais data de cadeia Formatos de tempo com dois dígitos anos (Sim.) com um século implícito (por exemplo, 1900 ou 2000) . As empresas gastaram bilhões de dólares a resolver este problema no final dos anos 90. Os cientistas não devem estar usando dois anos de dígito. Por favor, corrigir o arquivo de origem (S) convertendo em 4 anos de dígitos, então use yyyy na data Formato do tempo.
        * Você pode usar yyyy ou YYYYY (queERDDAP™converter para uuuu) para analisar 4 anos de dígitos, incluindo anos negativos, por exemplo, -4712 (que é 4713 BC) . Graças a SeaDataNet, Thomas Gardner e BODC.
        * Por favor, continue a usar Z dentro de um formato dateTime para obterERDDAPpara analisar um deslocamento de tempo (por exemplo, Z, +0200, -08, -0800, -08:30) .
        *    **Certifique-se de que você usaJavaversão 1.8.0\\_21 ou superior.** 
        * Programadores - ... Se escreveresJavaprogramas que executamERDDAP™código, você precisa remover a referência ao joda-time. jarra no parâmetro de caminho de classe.
    * NOVO:ERDDAP'[Arquivo Ferramenta de configuração de dados](/docs/server-admin/additional-information#archiveadataset)agora pode criar[ **Arquivos do BagIt** ](https://en.wikipedia.org/wiki/BagIt). NCEI pode padronizar neste formato. Graças a Scott Cross e John Relph.
    * MELHORADO: Os links para baixar o erddap. guerra contra aERDDAP™páginas da web agora apontam para **GitHub** . (Eles são links públicos, então você não precisa se juntar ao GitHub.) Isso significa downloads muito mais rápidos (até 12Mb/s versus 1Mb/s) e alguns problemas com downloads. Graças a Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney e Instituto Marinho da Irlanda.
    * MELHORADO: O **status.html página e o e-mail diário do relatório de estado** agora incluem uma seção "Major LoadDatasets Time Series" que mostra estatísticas sobreERDDAP™a partir do final de cada grande loadDatasets para os últimos 100 maiores loadDatasets. Graças ao nosso RAID problemático.
    * NOVO: um novo, opcional (mas recomendado) parâmetro para EDDTableFromCassandra datasets: [ ** &lt;partiçõesKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Graças à Ocean Networks Canada.
    * NOVO: EDDTableFromAsciiFiles agora suporta ** &lt;colunaSeparador&gt; ** parâmetro. Se null ou "", a classe adivinhará, como antes, caso contrário, o primeiro caractere será usado como separador de coluna ao ler os arquivos. Graças a Sky Bristol e Abigail Benson.
    * Novo: o novo tipo de conjunto de dados,[ **EDDTable De NccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), pode fazer um conjunto de dados agregando[Arquivos NCCSV .csv](/docs/user/nccsv-1.00). Graças ao Steve Hankin.
    * MELHORADO: **EDDTable FromErddap** agora usa.nccsvpara obter informações de distânciaERDDAPs e para arquivo local dessa informação de metadados. Isso permite o suporte completo para os tipos de dados de carvão e longo, e para Unicode (UCS-2) charset para chars e Strings. Graças ao Rob Fuller e ao Instituto Marinho da Irlanda.
    * MELHORADO: EDDTableDe Erddap eEDDGridFromErddap agora apoio ** &lt;redirecionar&gt;false&lt;/redirectamente ** que dizERDDAP™nunca redirecionar o pedido para o remotoERDDAP. O padrão é verdadeiro. Isso é útil quando o remotoERDDAP™é privadoERDDAP. Graças a Damian Smyth, Rob Fuller e Instituto Marinho da Irlanda.
    * MELHORADO:ERDDAP™agora apanha **solicitações de usuário canceladas** mais cedo. EERDDAP™Agora desliga mais rápido porque os fios de baixo nível desligam mais rápido. Graças ao nosso RAID problemático.
    *    **Gerar conjuntos de dados Xml:** 
        * NOVO: O novo EDDType especial "ncdump" imprime um[Não.](https://linux.die.net/man/1/ncdump)\\-como impressão do cabeçalho de um.ncficheiro. Você também pode imprimir os valores de dados para variáveis especificadas (ou digite "nada" para não imprimir quaisquer valores de dados) . Isso é útil porque, sem ncdump é difícil saber o que está em um arquivo e, portanto, que EDDType você deve especificar para GerarDatasetsXml. Graças a Craig Risien, Rich Signell, Christopher Wingard e OOI.
        * NOVO: Para SeaData Dados líquidos:
Quando apropriado, Gerar conjuntos de dados Xml agora faz uma conversão semântica específica usando uma consulta SPARQL remota: se os metadados de origem de uma variável incluir um sdn\\_parameter\\_urn, por exemplo, sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", GerarDatasets Xml irá adicionar o atributo P02 correspondente, por exemplo, sdn\\_P02\\_urn = "SDN:P02::PSAL". Se você tem conjuntos de dados que usam esses atributos, e se seuERDDAP'&lt;categoryAttributes&gt; em setup.xml inclui sdn\\_parameter\\_urn e sdn\\_P02\\_urn, os utilizadores poderão utilizarERDDAP™Sistema de pesquisa de categorias para pesquisar conjuntos de dados com valores específicos desses atributos. Graças a BODC e Alexandra Kokkinaki.
        * MELHORADO: Gerar conjuntos de dados Xml agora muda muitoshttp://referências nos metadados ahttps://quando apropriado.
        * MELHORADO: Gerar conjuntos de dados Xml agora tenta adivinhar criador\\_type e editor\\_type.
        * MELHORADO: Os dados da variávelTipos sugeridos por GerarDatasets Xml será um pouco melhor. Graças a Margaret O'Brien, LTER e EML.
        * MELHORADO: Gerar conjuntos de dados Xml é melhor para especificar o&lt;cdm\\_data\\_type&gt; e adicionando os atributos relacionados (por exemplo,&lt;cdm\\_timeseries\\_variables&gt;), para que você possa fornecer essa informação. Graças ao Rich Signell.
        * MELHORADO: Em GerarDatasets Xml, para conjuntos de dados EDDTable, a sugestão para&lt;subsetVariables&gt; é agora muito mais conservador. Graças ao John Kerfoot.
        * MELHORADO: Sedatasets.xmlpara um conjunto de dados especificafeatureTypemas não cdm\\_data\\_type, ofeatureTypeserá usado como o cdm\\_data\\_type. Graças ao Rich Signell.
        * BUG FIX: gerar Conjuntos de dados Xml agora sugere o correto&lt;dataType&gt; para variáveis de dados que têmscale\\_factor,add\\_offsete/ou atributos \\_Unsigned.
    * MELHORADO: QuandoERDDAP™abre.ncarquivo que é **mais curto** do que é suposto ser (por exemplo, não foi completamente copiado para o lugar) ,ERDDAP™agora trata o arquivo como ruim. Anteriormente...ERDDAP™retornou valores ausentes para qualquer parte ausente do arquivo porque esse é o comportamento padrão para netcdf-java.ERDDAP™agora usa ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Graças ao nosso problemático RAID e Christian Ward-Garrison.
    * MELHORADO: o escritor ISO 19115 agora faz uso de **criador typetype** , se presente.
    * MELHORADO:ERDDAP™agora usa o mais recente netcdf-java v4.6.9 que pode ler tipos adicionais de **netcdf-4 arquivos** . Graças a Craig Risien, Rich Signell, Christopher Wingard e OOI.
    * BUG FIX: evitar problemas se diferentes arquivos de origem têm diferentes tipos de dados para uma determinada variável. Graças a Roy Mendelssohn e Eugene Burger.
    * BUG FIX: **Conversões de formato de tempo** estão agora melhor protegidos contra valores de mau tempo. Graças ao NDBC.
    * BUG FIX:EDDGridA partir de NcFiles Descompactado agora lida com valores de tempo com **"mês desde ..." e "anos desde ..."** corretamente (incrementando o mês ou o ano, não pela adição grosseira, por exemplo, 30days repetidamente) . Graças a Soda3.3.1.
    * BUG FIX: apenas em v1.74, **assinaturas** necessária uma ação (por exemplo,http://...) , que era e deveria ser opcional.
    * BUG FIX:EDDGridA partir deMergeIRFiles.lowGetSourceMetadata () não adicionou quaisquer atributos globais. Agora faz.
         

## Versão 1.74{#version-174} 
 (lançado 2016-10-07) 

*    **Novos recursos (para usuários) :**   
     
    * Agora, quando uma lista de conjuntos de dados (Tudo, ou de uma pesquisa) é exibido em uma página web, títulos longos são exibidos em várias linhas. Anteriormente, o meio de um longo título foi substituído por "... ". Graças a Margaret O'Brien, LTER e EML.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   
     
    * TO DO: Nos computadores Linux, altere as configurações de timeout do Apache para que os pedidos de usuários demorados não sejam demorados (com o que muitas vezes aparece como um erro "Proxy" ou "Bad Gateway") . Como usuário root:
        
        1. Modificar o Apachehttparquivo d.conf (geralmente em /etc/httpd/conf/) :
Alterar o existente&lt;Configuração do Timeout&gt; (ou adicionar um no final do arquivo) para 3600 (segundos.) , em vez do padrão 60 ou 120 segundos.
Alterar o existente&lt;ProxyTimeout&gt; definição (ou adicionar um no final do arquivo) para 3600 (segundos.) , em vez do padrão 60 ou 120 segundos.
        2. Reinicie Apache: /usr/sbin/apachectl -k gracioso (mas às vezes é em um diretório diferente) .
        
Graças ao Thomas Oliver.
         
    * NOVO:\\[bigParentDirectory/hard Anuário da bandeira
Isso funciona como o diretório de bandeira, mas a versão hardFlag também exclui todas as informações de conjunto de dados em cache. Não há URLs para definir um hardFlag. Isso só pode ser usado colocando um arquivo nesse diretório.
duro. Bandeiras são muito úteis quando você faz algo que causa uma mudança em comoERDDAP™lê e interpreta os dados de origem, por exemplo, quando você instala uma nova versão deERDDAP™ou quando você tiver feito certos tipos de alterações na definição de um conjunto de dados emdatasets.xml. Ver[esta documentação](/docs/server-admin/additional-information#hard-flag). Graças a John Kerfoot e todos os grupos Argo.
         
    * NOVO: Gerar conjuntos de dados Xml agora tem uma opção EDDTableFromEML
que lê uma descrição de conjunto de dados em uma linguagem de metadados ecológicos (EML) arquivo, baixa o arquivo de dados relacionado e gera um pedaço dedatasets.xmlpara que o conjunto de dados possa ser adicionadoERDDAP. Há também um EDDTableFromEMLBatch que faz a mesma coisa para todos os arquivos EML em um diretório. Isso funciona muito bem porque EML faz um excelente trabalho de descrever o conjunto de dados e porque KNB e LTER disponibilizam os arquivos de dados reais.
EML maisERDDAP™poderia ser uma grande combinação, desdeERDDAP™poderia dar aos usuários mais acesso direto à riqueza de dados KNB e LTER e ajudar esses projetos a atender ao governo dos EUA[Acesso público aos resultados da pesquisa (PARR) requisitos](https://nosc.noaa.gov/EDMC/PD.DSP.php)fazendo os dados disponíveis através de um serviço web.
Ver[esta documentação](/docs/server-admin/EDDTableFromEML). Graças a Margaret O'Brien, LTER e EML.
         
    * NOVO: Gerar conjuntos de dados Xml agora tem uma opção EDDTableFromInPort
que lê uma descrição de conjunto de dados em um arquivo XML InPort e tenta gerar um pedaço dedatasets.xmlpara que o conjunto de dados possa ser adicionadoERDDAP. Isso raramente cria um pedaço pronto para usar de XML paradatasets.xml, mas vai criar um bom rascunho áspero que é um bom ponto de partida para edição por um humano.
Seria ótimo se as pessoas que usam o InPort para documentar seus conjuntos de dados também usaremERDDAP™para tornar os dados reais disponíveis atravésERDDAPserviços web e, assim, atender o governo dos EUA eNOAA'[Acesso público aos resultados da pesquisa (PARR) requisitos](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)fazendo os dados disponíveis através de um serviço web. Esta é uma solução que pode ser usada agora. (erd.data at noaa.govestá feliz em ajudar.)   
Ver[esta documentação](/docs/server-admin/datasets#eddtablefrominport). Graças a Evan Howell e Melanie Abecassis.
         
    * MELHORADO:ERDDAP™agora usa netcdf-java 4.6.6.
Com versões anteriores, netcdf-java ler alguns valores de preenchimento (talvez, apenas em arquivos netcdf-4) como 0. Agora lê alguns deles como o valor de preenchimento padrão netcdf: -127 para bytes, -32767 para shorts, -2147483647 para ints.Unidatadiz que o novo comportamento é o comportamento adequado. Se uma variável em um conjunto de dados começar a mostrar um desses valores onde eles costumavam mostrar 0's, você pode adicionar, por exemplo,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
para a variáveladdAttributespara contarERDDAP™para tratar esse valor como ummissing\\_value/\\_Fill Valor. No entanto, em muitos casos, que não produzirá o resultado desejado: 0's. Se assim for, considere modificar os arquivos comNCOou reescrever os arquivos. Reclamações? Por favor, contacte-nosUnidata;-)
         
    * Para fazer: Nova paleta TopographyDepth
Encorajo você a mudar todos os conjuntos de dados que usam a paleta OceanDepth para usar a nova paleta TopographyDepth, que é como Topography, exceto com as cores viradas, de modo que seja adequado para valores de profundidade (- Sim.) , em vez de valores de altitude (- Sim.) . As configurações recomendadas para esta paleta são:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * Nova imagem: Stringmissing\\_valuee/ou \\_FillValue
Se uma variável String define umamissing\\_valuee/ou \\_FillValue,ERDDAP™irá agora remover esses valores dos dados e substituí-los por uma string vazia, de modo que os valores ausentes apareçam como strings vazias, como por outros conjuntos de dados emERDDAP. Graças a Margaret O'Brien, LTER e EML.
         
    * Nova imagem: Suporte para horários locais
variáveis timestamp com dados de origem de Strings agora pode especificar um fuso horário via a "time\\_zone" atributo que levaERDDAP™para converter os tempos de origem da zona local (alguns em tempo padrão, alguns em tempo de verão) para dentroZulutempos. A lista de nomes de fuso horário válidos é provavelmente idêntica à lista na coluna TZ em[esta mesa](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). O padrão é "Zulu". Os fusos horários comuns dos EUA são: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. Para variáveis de timestamp com dados de origem numérica, você pode especificar o "time\\_zone"atributo, mas o valor deve ser "Zulu"ou "UTC". Graças a Margaret O'Brien, LTER e EML.
         
    * NEW FEATURE: EDDTableFromAsciiFiles agora suporta arquivos separados por ponto
e é mais inteligente sobre descobrir o separador. Graças a Margaret O'Brien, LTER e EML.
         
    * Nova imagem: Se houver um erro significativo no loadDatasets (maior ou menor, por exemplo, um desaparecido ou inválidodatasets.xmldocumento) ,ERDDAP™irá agora indicá-lo em status.html, logo abaixo "n Datasets Failed To Load" como ERROR: durante o processamentodatasets.xml: ver log.txt para detalhes.
         
    * Nova imagem:ERDDAP™procura órfãos.
QuandoERDDAP™faz uma grande carga Datasets, agora procura conjuntos de dados órfãos (conjuntos de dados que estão emERDDAP™mas não dentrodatasets.xml) . Se encontrados, eles estão listados em status.html, logo abaixo "n Datasets Failed To Load" como ERROR: n Orphan Datasets (datasets inERDDAP™mas não dentrodatasets.xml) ...
Se você quiser remover (Descarregar) um órfãoERDDAP™, você precisa adicionar
        &lt;dataset type="_anyValidType_"datasetID="_theDatasetID_" active="false" /&gt;
paradatasets.xmlaté que o conjunto de dados seja descarregado durante os próximos grandes conjuntos de dados de carga.
         
    * BUG FIX: Se um conjunto de dados tivesse uma variável de timestamp numérico com unidades diferentes"seconds since 1970-01-01T00:00:00Z"e com o&lt;updateEveryNMillis&gt; sistema ativo, o intervalo da variável timestamp foi definido incorretamente quando o conjunto de dados foi atualizado. Graças ao John Kerfoot.
         
    * BUG FIX: Se&lt;quickRestart&gt; foi verdadeiro em setup.xml e você solicitou dados de um EDDTableFrom... Dataset de arquivos que usado&lt;updateEveryNMillis&gt;, a primeira solicitação para o conjunto de dados falharia, mas as solicitações subsequentes teriam sucesso. Agora o primeiro pedido não falhará. Graças ao John Kerfoot.
         
    * BUG FIX: O GerarDatasetsXml.sh e .bat não funcionaram com parâmetros &gt;9 na linha de comando. Agora têm. Graças ao John Kerfoot.
         
    * BUG FIX: O novo EDDTableFromMultidimNcFiles não removeu consistentemente espaços de rastreamento de cadeias de caracteres. Agora faz. Notavelmente, isso afetou arquivos ARGO. Graças a Kevin O'Brien e Roland Schweitzer.
         
    * BUG FIX: Todos os acessos remotosDAPserviços agora é iniciado por código mais moderno. Isso corrige o erro "conexão fechada" ao acessar alguns conjuntos de dados EDDTableFromErddap. Graças ao Kevin O'Brien.
         
    * BUG FIX: O manuseio deorderBy... () e distinto () estão agora de volta à maneira como eles estavam antes das mudanças recentes: uma determinada solicitação pode ter váriosorderBy... () e/ou um distinto () filtro;ERDDAP™irá lidar com eles na ordem que eles são especificados. Graças a David Karuga.
         
    * BUG FIX: Se o conjunto de dados for EDDTableFromDatabase e uma consulta tiver[fonte de alimentação](/docs/server-admin/datasets#sourcecanorderby)e/ou[fonte de alimentação](/docs/server-admin/datasets#sourcecandodistinct), então a base de dados pode (dependendo das configurações emdatasets.xml) parcialmente ou completamente manusear **apenas o primeiro**  orderBy... () ou distinto () . Graças a David Karuga.
         
    * BUG FIX: A recente codificação extra por cento causou problemas com algumas consultas para.ncArquivos CF, por exemplo, "HTTP Status 500 - Erro de consulta: variável=station está listado duas vezes na lista de variáveis de resultados." Graças ao Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles teve dificuldade em recarregar um conjunto de dados quando uma das colunas era uma verdadeira coluna de caridade. Graças ao Roland Schweitzer.
         
    * BUG FIX:EDDGridA partir de NcFiles Desembalado agora também convertemissing\\_valuee \\_FillValue aos valores padrão para que os arquivos com valores diferentes possam ser agregados. Por causa desta mudança, depois de instalar esta nova versão deERDDAP™, por favor definir um[duro. Bandeira](/docs/server-admin/additional-information#hard-flag)para cadaEDDGridA partir de NcFiles Conjunto de dados não embalado em seuERDDAP.
         
    * MELHORADO: EDDTableFromNcCFFiles agora pode lidar com arquivos que têm amostra múltipla\\_dimensão. Um dado conjunto de dados só deve usar variáveis que usam uma das amostras\\_dimensões. Graças a Ajay Krishnan.
         
    * MELHORADO: Para EDDTableDe...Files,&lt;sortFilesBySourceNames&gt; agora permite a separação de vírgulas (recomendado) ou listas separadas do espaço de nomes de fontes variáveis. Em qualquer caso, nomes variáveis individuais podem ser cercados por citações duplas, por exemplo, se o nome tiver um espaço interno.

## Versão 1.72{#version-172} 
 (lançado 2016-05-12) 

*    **Novos recursos (para usuários) :** Nenhuma.
     
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * NOVO EDDTable FromMultidimNcFiles[EDDTable FromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)é uma nova alternativa para EDDTableFromNcFiles. Ele é projetado para lidar com grupos de arquivos com várias variáveis com dimensões compartilhadas, por exemplo, var1\\[um\\]\\[b)\\], var2\\[um\\], var3\\[b)\\], scalarVar. Graças ao Projeto Argo, Aurélie Briand e Roland Schweitzer.
    * BUG FIX:ERDDAP™  (via as classes FileVisitorDNLS e FileVistorSubdir) agora segue links simbólicos no Linux.ERDDAP™ainda não segue .lnk está no Windows.
    * BUG FIX de bug introduzido em 1.70: distinto +orderBynão foram permitidos juntos em um pedido. Agora estão outra vez. Eles não são mutuamente exclusivos / redundantes. Graças a David Karuga.
    * CAPÍTULOdatasets.xmllista negra de endereços IP:
Endereços IP v4 parecem aparecerERDDAP™como 4 números de hex separados por período.
Acho que os endereços IP v6 aparecem como 8 números de hex separados por cólon.
Então...ERDDAP™agora suporta cólons nos endereços IP nessa lista e :\\* no final da lista para bloquear uma gama de endereços.
    * MELHORADO:ERDDAP™agora usa NetcdfFileWriter para escrever.ncarquivos em vez do NetcdfFileWriteable deprecated. Não deve haver nenhuma mudança discernível para os arquivos resultantes. Isso abre a possibilidade de fazer grande.ncarquivos que usam.nc3 extensões 64bit. Se você quer / precisa disso, por favor envie um pedido paraerd.data at noaa.gov.
    * MELHORADO: Muitos dos links para sites remotos foram desatualizados. Agora eles estão atualizados e usamhttps:em vez dehttp: sempre que possível.
    * Muitas pequenas mudanças.

## Versão 1.70{#version-170} 
 (lançado em 2016-04-15) 

*    **Novos recursos (para usuários) :** Nenhuma.
     
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** Abaixo, existem várias mudanças recomendadas para a documentação em seu arquivo setup.xml.
Por favor, faça essas mudanças agora.
30 minutos de trabalho agora pode poupar-lhe horas de confusão no futuro.
    * Correção de bugs: O problema foi que as solicitações que foram redirecionadas para um remotoERDDAPfalhou com um caracter inválido '|Mensagem de erro. Isso só ocorreu com versões recentes do Tomcat. Graças a Rusty Holleman, Conor Delaney e Roy Mendelssohn.
    * Correção de bugs:ERDDAP™agora usa uma versão atualizada do netcdf-java (É uma longa história) que inclui suporte atualizado para NcML, que corrige o problema com NcML LogicalReduce não funciona como esperado. Pode haver algumas pequenas mudanças nos metadados queERDDAP™leituras via netcdf-java de.nc,.hdf, .grib, e arquivos .bufr. Graças a Favio Medrano.
    * O novo[EDDTable agregados](/docs/server-admin/datasets#eddtableaggregaterows)permite fazer um conjunto de dados EDDTable mesclado de dois ou mais conjuntos de dados EDDTable que têm as mesmas variáveis de dados usando as mesmas unidades. Graças ao Kevin O'Brien.
    * Novas opções para EDDTableFromDatabase ([fonte de alimentação](/docs/server-admin/datasets#sourcecanorderby)e[fonte de alimentação](/docs/server-admin/datasets#sourcecandodistinct)) deixar você especificar seERDDAP™, o banco de dados, ou ambos, lidar com distinto eorderBy  (e todas as variantes) restrições. Graças a David Karuga.
    * Agora você pode disponibilizar gráficos e metadados de um conjunto de dados privado ao público através do novo [&lt;gráficosAccessibleTo&gt;public&lt;/graphsAccessibleTo&gt;] (/docs/server-admin/datasets#graphsacessível a) tag. Graças a Emanuele Lombardi.
    * Agora, se uma string passou para GerarDatasets Xml ou DasDds é cercado por citações duplas, é não citada (como se fosse uma string JSON) . Graças a John Kerfoot e Melanie Abecassis.
    * Gerar conjuntos de dados Xml agora suporta "default" para obter o padrão e "nada" para obter uma string vazia (eles trabalham com ou sem citações) . Isso resolve alguns problemas relacionados a passar cordas vazias.
    * Agora, em GerarDatasets Xml, para todosEDDGridDos Ficheiros e Tabela EDD DeFiles conjuntos de dados, se a amostra Nome de arquivo que você especifique é "" (a string vazia) , ele vai usar o último arquivo correspondenteNome do diretório + regex + recursive=true.
    * Atualizado: O código do displayInBrowser que é usado para exibir os resultados do GenerateDatasetsXml e DasDds em computadores Linux foi out-of-date e deu uma mensagem estranha sobre Netscape. Agora, isso usa uma ferramenta Linux moderna: xdg-open. Graças à Melanie Abecassis.
    * OallDatasetsdataset agora tem um"files"coluna, que indica a URL base do link /files (se houver um) para o conjunto de dados.
    * Aumentar a segurança geral do seuERDDAP™alterando as permissões associadas ao diretório tomcat e ao grandeParentDirectory:
         (Os comandos reais abaixo são para Linux. Para outros sistemas operacionais, faça mudanças análogas.) 
        * Alterar o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores da Tomcat/ERDDAP, por exemplo,
_yourUserName_ apache-tomcat-_8.0.23_
O que fazer? Nome do usuário grandeParentDirectory_
        * Alterar permissões para que o tomcat e o grupo tenham lido, escrever, executar privilégios, por exemplo,.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Remover as permissões do usuário "outros" para ler, escrever ou executar:
apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
Isso é importante, porque impede que outros usuários leiam informações possivelmente sensíveis emERDDAP™arquivos de configuração, arquivos de log e arquivos com informações sobre conjuntos de dados privados.
    * O sistema de autenticação/login foi renovado. Graças a Thomas Gardner, Emanuele Lombardi, e o novo governo dos EUA[Padrão somente HTTPS](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * A opção de autenticação=openid foi removida. Estava fora de moda.
        * O novo, recomendado,[autenticação=google](/docs/server-admin/additional-information#google)opção usa Google Sign-In (baseado em OAuth 2.0) para permitir que qualquer pessoa com uma conta de e-mail do Google (incluindo Contas gerenciadas do Google como@noaa.gov) para entrar.
        * O novo,[autenticação = e-mail](/docs/server-admin/additional-information#email)opção é um backup para autenticação=google. Permite aos usuários com um&lt;usuário&gt; tag indatasets.xmlpara fazer login enviando-lhes um e-mail com um link especial.
        * Em seu setup.xml, altere a descrição para&lt;autenticação&gt; para ser
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

        * Em seu setup.xml, adicione isso abaixo do&lt;autenticação tag
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

        * Agora, os usuários que não estão conectados podem usarhttpouhttpsURLs (se você tiver configurado&lt;baseHttpsUrl&gt; em seu setup.xml). Graças ao novo governo dos EUA[Padrão somente HTTPS](https://https.cio.gov/).
        * Agora, você pode encorajar todos os usuários a usarhttps  (nãohttp) por definição&lt;baseUrl&gt; para ser umhttpsURL. Para forçar os usuários a usar apenashttps, você também deve fazer alterações na sua configuração Apache/Tomcat para bloquear não-httpsacesso. Graças ao novo governo dos EUA[Padrão somente HTTPS](https://https.cio.gov/).
            
Em seu setup.xml, altere a descrição para&lt;baseUrl&gt; para ser
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

        * As opções&lt;codificação de senhas mudou. Em seu setup.xml, altere a descrição para&lt;passwordEncoding&gt; para ser
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

        * Em seu setup.xml, altere a descrição para&lt;baseHttpsUrl&gt; para ser
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

        * Agora, se listPrivateDatasets=true in setup.xml, mesmo menos informações serão mostradas sobre conjuntos de dados que um usuário não tem acesso.
    * Agora, especialmente para quando você está inicialmente configurando seuERDDAPAgora podes dizerERDDAP™não tentar se inscrever no remotoERDDAP™conjuntos de dados. Graças a Filipe Rocha Freire.
Em seu setup.xml, mesmo antes&lt;fontFamily&gt;, por favor adicione
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

    * Em seu setup.xml, nas instruções acima&lt;emailFromAddress&gt;, por favor insira:
Se possível, configure isso para usar uma conexão segura (SSL / TLS) para o servidor de email.
Se sua configuração não estiver usando uma conexão segura para o servidor de e-mail, faça as alterações para fazê-lo.
    * Em seudatasets.xml, por favor adicione esta linha à descrição de&lt;subscriçãoEmailBlacklist&gt; em seudatasets.xml:
Você pode usar o nome "\\*" para listar um domínio inteiro, por exemplo,\\*@example.com .
    * Desde a mudança para o sistema de registro no v1.66, o arquivo de log nunca está atualizado. Há sempre mensagens ou partes de mensagens esperando para ser escrito no arquivo de log. Agora, você pode fazer isso up-to-date (para um instante) vendo o seuERDDAPA página web de status no http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Uma pequena mudança (para String2.canonical) que deve ajudar a manter as coisas em movimento rapidamente quandoERDDAP™é muito ocupado e também melhor lidar com um grande número de conjuntos de dados.
    * Forte Recomendado: parar de usar&lt;convertToPublicSourceUrl&gt; emdatasets.xmlpara converter um número IP em um conjunto de dados&lt;sourceUrl&gt; (por exemplo, http://192.168.#.#/ ) em um nome de domínio (por exemplo,http:my.domain.org/) . A partir de agora, novas assinaturas http://localhost , http://127.0.0.1 e http://192.168.#.# O URLS não será permitido por razões de segurança. Por isso, use sempre o nome de domínio público no&lt;sourceUrl&gt; (se necessário por causa de problemas de DNS) , você pode usar[/etc/hosts tabela no seu servidor](https://linux.die.net/man/5/hosts)para resolver o problema, convertendo nomes de domínio locais em números IP sem usar um servidor DNS. Você pode testar se um determinado nome de domínio é resolvido corretamente usando
ping _some.domain.name_
    * Em gerarDatasets.xml, para conjuntos de dados remotos (por exemplo, de um servidor THREDDS) , o gerado automaticamentedatasetIDs são inalterados para a maioria dos domínios. Para alguns domínios, a primeira parte (ou seja, o nome) do gerado automaticamentedatasetIDserá um pouco diferente. Notavelmente, nomes que tinham uma parte agora são mais propensos a ter duas partes. Por exemplo, conjuntos de dados de http://oos.soest.hawaii.edu anteriormente conduzidodatasetIDs que começou com hawaii\\_, mas agora levar adatasetIDs que começam com hawaii\\_soest\\_ . Se isso causar problemas para você, por favor me envie um e-mail. Pode haver uma solução.
    * O driver Cassandra foi atualizado para cassandra-driver-core-3.0.0.jar e assim para Cassandra v3. EDDTableFromCassandra não tira vantagem de quaisquer novos recursos em Cassandra V3. Índices em Cassandra podem agora ser mais complexos, masERDDAP™ainda usa o modelo de índice Cassandra v2, que assume que uma coluna indexada pode ser consultada diretamente com'='restrições. Gerar conjuntos de dados Xml para EDDTableFromCassandra não detecta mais colunas com índices; se um índice é simples, você precisa especificá-lo emdatasets.xmlà mão. Se você precisar de suporte para índices mais complexos ou outros novos recursos, por favor e-mailerd.data at noaa.gov.
? Se você ainda usar Cassandra 2.x, continue a usarERDDAP™v1.68 até que você atualize para usar o Cassandra 3.x.
    * Jars e o Classpath -- Quase todos os arquivos .jar de terceiros incluídos foram atualizados para suas versões mais recentes.
        * slf4j.jar foi adicionado ao /lib e ao classpath.
        * Joid. jar e tsik. jar foram removidos de /lib e o classpath.
        * Se você receber mensagens de erro sobre classes não encontradas quando você compilar ou executarERDDAP™ou uma das suas ferramentas, compare o classpath da sua linha de comandoERDDAP'[classpath atual](/docs/contributing/programmer-guide#development-environment)para descobrir quais .jars estão faltando do seu classpath.

## Versão 1.68{#version-168} 
 (lançado 2016-02-08) 

*    **Novos recursos (para usuários) :** Nenhuma.
     
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    *   [EDDGridFromFiles Aggregation via Nomes de arquivo ou Metadados globais](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)- ...
Todas as variações deEDDGridFromFiles agora pode agregar um grupo de arquivos adicionando uma nova dimensão mais à esquerda, geralmente tempo, com base em um valor derivado de cada nome de arquivo ou do valor de um atributo global que está em cada arquivo.
    * MELHORADO: Nós anteriormente sugerimos que você pode gostar de criar umEDDGridDataset FromErddap em seudatasets.xmlque referiu e reservou o jplMURSSConjunto de dados T em nossoERDDAP. Uma vez que agora há uma versão mais recente desse conjunto de dados, esse conjunto de dados é agora desprezado. Então, se você tiver esse conjunto de dados em seuERDDAP™, por favor adicione este novo conjunto de dados
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Se você quiser remover o velho jplMURSSConjunto de dados T do seuERDDAP™  (É a tua escolha.) , mudar seu ambiente ativo de "verdade" para "false".
    * Correção de bugs: Por favor, verifique o grandeParentDirectory que você especificou em seu setup.xml. Se não pusesse uma folga no fim do&lt;bigParentDirectory&gt; nome, entãoERDDAP™terá criado vários diretórios anexando palavras diretamente ao nome que você especificou, em vez de criar subdiretórios. Começando com a versão 1.68,ERDDAP™adiciona um slash ao fim do nome do diretório se você não especificar um. Então, se você não especificou uma folga no final, então quando você instalarERDDAP™v1.68 você precisa mover e renomear esses diretórios **depois** tu desligas o velhoERDDAP™e **antes** você iniciar o novoERDDAP. Por exemplo, se você erroneamente especificou bigParentDirectory como /home/erddapBPD (sem rastreio) eERDDAP™criou por engano diretórios como
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
e um arquivo chamado /home/erddapBPDsubscriptionsV1.txt,
então você precisa mover e renomeá-los para ser
/home/erddapBPD/cache
/home/erddapBPD/cópia
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/luceno
e /home/erddapBPD/subscriptionsV1.txt
    * Correção de bugs: Havia insetos emEDDGridLonPM180 emERDDAP™v1.66 que ocorreu quando o conjunto de dados da criança é umEDDGridDe Erddap.
    * Correção de bugs: Havia um insecto.EDDGridDos Ficheiros e Tabela EDD A partir deFiles emERDDAP™v1.66 que causou&lt;updateEveryNMillis&gt; para ser ignorado a primeira vez que o conjunto de dados foi carregado após um reinício.
    * Correção de Bug / Novo recurso: Se um conjunto de dados de criança dentroEDDGridAggregateExistingDimension,EDDGridEntendido.EDDGridDa Tabela DED,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, ou EDDTableFromEDDGridé um conjunto de dados... FromErddap, esse conjunto de dados pai agora se inscreve para o subjacenteERDDAP™conjunto de dados. Se o subjacenteERDDAP™dataset está no mesmoERDDAP™, a assinatura e sua validação são feitas diretamente; você não terá um e-mail pedindo para validar a assinatura. Caso contrário, se o sistema de assinatura para o seuERDDAP™é desligado, definir o&lt;reloadEveryNMinutes&gt; configuração para o conjunto de dados pai para um número pequeno (60?) para que fique atualizado.
    * Correção de Bug / Novo recurso: Se um conjunto de dados de criança dentroEDDGridAggregateExistingDimension,EDDGridEntendido.EDDGridDa Tabela DED,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, ou EDDTableFromEDDGridhas active="false", esse conjunto de dados da criança agora é ignorado.

## Versão 1.66{#version-166} 
 (lançado em 2016-01-19) 

*    **Novos recursos (para usuários) :** 
    * Gráficos (não mapas) agora pode ter valores descendentes nos eixos. Para obter isso ao usar uma página web Make A Graph, altere o novo eixo Y: configuração ascendente (o padrão) para descer. Ou, em uma URL que solicita um gráfico, use o novo opcional 3rd '|' parâmetro para o[&gt; Gama e/ou &gt; Interruptores de yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), que não pode ser nada (o padrão) , true, ou t para obter valores ascendentes, ou usar falso ou f para obter valores descendentes. O verdadeiro|valores falsos são insensíveis. Graças a Chris Fullilove, John Kerfoot, Luke Campbell e Cara Wilson.
    * Os usuários agora podem especificar a cor de fundo para gráficos adicionando a &.bgColor=0x_ AARRGGBB_ mudar para a URL que solicita o gráfico. Veja .bgColor na seção de Comandos Gráficos da[Anúncio grátis para sua empresa](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)e[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)documentação. Graças a John Kerfoot e Luke Campbell.
    * Para conjuntos de dados tabulares, restrições agora podem se referir a min (- Sim.) ou máximo (- Sim.) . Ver[min () e máximo () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Graças ao John Kerfoot.
    * Para conjuntos de dados tabulares, restrições de tempo que usam[Agora](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)agora pode especificar unidades de tempo de milissegundos ou milis.
    * Um pedido para uma imagem de um conjunto de dados tabular agora faz um mapa (não um gráfico) se as variáveis x e y são variáveis de longitude e de latitude (unidades compatíveis) . Graças ao Rich Signell.
    * Correção do Bug: Os rótulos do eixo do tempo e os carrapatos às vezes tiveram irregularidades estranhas ao solicitar vários gráficos simultaneamente (por exemplo, em uma página web) . O problema era um bug na biblioteca de gráficos SGT queERDDAP™uso (uma variável era "estática" que não deveria ter sido) . Graças ao Bradford Butman.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * É um risco de segurança para colocar sua senha de e-mail em um arquivo de texto simples como setup.xml. Para mitigar esse problema, recomendamos fortemente que você:
        1. Configurar uma conta de email apenas paraERDDAP's use, por exemplo, erddap@yourInstitution.org . Isso também tem outros benefícios, nomeadamente mais de umERDDAP™O administrador pode então ter acesso a essa conta de e-mail.
        2. Faça as permissões do arquivo setup.xml rw (leitura + gravação) para o usuário que irá executar Tomcat eERDDAP™  (user=tomcat?) e sem permissões (não ler ou escrever) para o grupo e outros usuários. Graças a Filipe Rocha Freire.
    * O novo[ArquivoADataset](/docs/server-admin/additional-information#archiveadataset)ferramenta simplifica fazer um.tar.gzarquivo com um subconjunto de um conjunto de dados em um formato que é adequado para arquivamento (nomeadamente,NOAANCEI) . Isso deve ser útil para muitosERDDAP™administradores em muitas situações, mas especialmente para grupos dentroNOAA.
    * O novo tipo de conjunto de dados[EDDGridA partir de NcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)é uma variante deEDDGridDe NcFiles. A diferença é que esta classe descompacta cada arquivo de dados antesEDDGridFromFiles olha para os arquivos:
        
        * Desbloqueia variáveis embaladas que usamscale\\_factore/ouadd\\_offset.
        * Promove variáveis inteiros que possuem atributos \\_Unsigned=true a um tipo de dados inteiro maior para que os valores apareçam como valores não assinados. Por exemplo, um byte \\_Unsigned=true (8.) variável torna-se um curto assinado (16 bits) variável.
        * Ele converte \\_FillValue emissing\\_valuevalores para ser NaN's (ou MAX\\_VALUE para tipos de dados inteiros) .
        
A grande vantagem desta classe é que ela fornece uma maneira de lidar com diferentes valores descale\\_factor,add\\_offset, \\_FillValue, oumissing\\_valueem arquivos diferentes em uma coleção. Caso contrário, você teria que usar uma ferramenta como[NcML](/docs/server-admin/datasets#ncml-files)ou[NCO](/docs/server-admin/datasets#netcdf-operators-nco)para modificar cada arquivo para remover as diferenças para que os arquivos possam ser tratadosEDDGridDe NcFiles. Para que esta classe funcione corretamente, os arquivos devem seguir os padrões CF para os atributos relacionados. Graças a Philippe Makowski.
    * O novo tipo de conjunto de dados[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)permite que você altere conjuntos de dados que têm alguns valores de longitude maiores que 180 (por exemplo, o intervalo 0 a 360) em conjuntos de dados com valores de longitude dentro do intervalo -180 a 180 (Longitude Plus ou Minus 180, daí o nome) . A grande vantagem de oferecer conjuntos de dados com valores de longitude no intervalo -180 a 180 é queOGCserviços (por exemplo,WMS) exigem valores de longitude nesta gama. Graças a Lynne Tablewski, Fabien Guichard, Philippe Makowski e Martin Spel.
2016-01-26 Atualização: Eeek&#33; Isso tem um bug que ocorre quando o conjunto de dados da criança é umEDDGridFromErddap que refere um conjunto de dados no mesmoERDDAP. Este bug é corrigido emERDDAP™v1.68.
    * Em[Gerar conjuntos de dadosXml](/docs/server-admin/datasets#generatedatasetsxml), um novo tipo especial de conjunto de dados,EDDGridLonPM180FromErddapCatalog, permite gerar odatasets.xmlparaEDDGridConjuntos de dados LonPM180 de todos osEDDGridconjuntos de dados em umERDDAPque têm valores de longitude maiores que 180.
    * Para todosEDDGriddatasets, indatasets.xmlAgora você pode usar o opcional
Não.&lt;acessível ViajandoWMS&gt;|falso&lt;/acessível ViajandoWMS&gt; (/docs/admin/datasets#acessíveisviawms)   (default=true) . Definindo isso para false forçosamente desabilita oWMSserviço para este conjunto de dados. Se for verdade, o conjunto de dados ainda pode não ser acessível viaWMSpor outras razões (por exemplo, sem eixos ou lon) . Isso é particularmente útil para conjuntos de dados que existem por conta própria e envolto porEDDGridLonPM180, de modo que apenas a versão LonPM180 é acessível viaWMS.
    * Em setup.xml, você pode especificar uma cor padrão diferente para o fundo de gráficos. A cor é especificada como um valor hexadecimal de 8 dígitos no formulário 0x_AARRGGBB_, onde AA, RR, GG e BB são os componentes opacidade, vermelho, verde e azul, respectivamente, especificados como números hexadecimais de 2 dígitos. Note que a tela é sempre branco opaco, então um (semi semi - Não.) cor transparente do fundo do gráfico mistura-se na tela branca. O padrão é azul claro:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Graças a John Kerfoot e Luke Campbell.
    * Em setup.xml, você agora pode especificar o tamanho máximo para o[ficheiro de registo](/docs/server-admin/additional-information#log)  (quando é renomeado para log. Txt. anterior e um novo log. txt é criado) Em MegaBytes. O mínimo permitido é 1. O máximo permitido é 2000. O padrão é 20 (MB MB) . Por exemplo:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Emdatasets.xml,&lt;FgdcFile&gt;] (/docs/server-admin/datasets#fgdcfile) ou&lt;iso19115File&gt;] (/docs/server-admin/datasets#iso19115file) pode agora ser um arquivo local (como antes) ou uma URL (que será baixado para que haja uma cópia local) . SeERDDAP™é incapaz de baixar o arquivo, o carregamento do conjunto de dados continuará, mas o conjunto de dados não terá um arquivo fgdc ou iso19115.
    *   EDDGridDos Ficheiros e Tabela EDD Os conjuntos de dados da FromFiles podem agora fazer um quickRestart (o sistema queERDDAP™tenta usar quando os conjuntos de dados são primeiro carregados quandoERDDAP™é reiniciado) . Isso acelera reiniciarERDDAP.
2016-01-26 Atualização: Eeek&#33; Isso tem um bug que causa&lt;updateEveryNMillis&gt; para ser ignorado a primeira vez que o conjunto de dados é carregado após um reinício. Este bug é corrigido emERDDAP™v1.68.
    * Uma melhoria geral para o sistema quickRestart permiteERDDAP™para carregar conjuntos de dados mais rápido quandoERDDAP™é reiniciado.
    * TudoEDDGridDos Ficheiros e Tabela EDD As subclasses FromFiles agora aceitam um novo&lt;pathRegex&gt; tag, geralmente especificado diretamente abaixo&lt;recursivo&gt;. Se recursivo é "verdadeiro", apenas caminhos subdiretórios completos que correspondem ao caminhoRegex (default=.\\*") será aceito. Da mesma forma,&lt;sourceUrls&gt; tag em umEDDGridAggregateExistingDimension agora pode incluir um atributo pathRegex (default=.\\*") .
    * O padrão para&lt;parcialRequestMaxBytes&gt; em setup.xml é agora 490000000 (~490 MB) . Isso evita alguns problemas/tempos relacionados com a obtenção de dados de servidores de dados THREDDS. Graças à Leslie Thorne.
    * Uma pequena mudança no sistema de log deve permitirERDDAP™para ser mais responsivo quando é muito, muito ocupado. A informação está agora escrita no arquivo de log na unidade de disco em pedaços bastante grandes. A vantagem é que isso é muito eficiente...ERDDAP™nunca bloqueará a espera de informações a serem escritas no arquivo de log. A desvantagem é que o log quase sempre terminará com uma mensagem parcial, que não será concluída até que o próximo pedaço seja escrito.
    * Correção de bug relacionada com inotify e o [&lt;updateEveryNMillis&gt;] (/docs/admin/datasets#updateeverynmillis) sistema paraEDDGridDos Ficheiros e Tabela EDD Conjuntos de dados do FromFiles: Não é mais necessário especificar um grande de fs.inotify.max\\_user\\_watches ou fs.inotify.max\\_user\\_instances. Há um bug dentroJavaque causa algumas partes deJava's inotify/WatchDirectory sistema para não ser lixo coletado quando eles são finalizados; eventualmente, o número de zumbi inotify relógios ou instâncias iria exceder o número máximo especificado.ERDDAP™agora funciona em torno dissoJavabug.
Além disso, o número de threads inotify está listado na página web status.html, para que você possa manter um olho em seu uso. Tipicamente, há 1 inotify thread perEDDGridDos Ficheiros e Tabela EDD Conjunto de dados do FromFiles.
    * Correção de Bug: em muitos lugares, em vez de um erro sendo rethrown, um novo erro foi gerado que só incluiu uma versão curta da mensagem de erro original e sem o traço da pilha. Agora, quando um novo erro é gerado, ele inclui corretamente toda a exceção original, por exemplo, jogar nova Exceção ("alguma nova mensagem", e) ;
Graças à Susan Perkins.
    * Correção de bugs: até recentemente (v1.64?) Se um...datasetIDA URL foi solicitada,ERDDAP™adicionar .html à URL. Em v1.64, isso falhou (uma URL incorretamente formatada foi gerada e, em seguida, falhou) . Agora isto funciona de novo. Graças ao Chris Fullilove.

## Versão 1.64{#version-164} 
 (lançado 2015-08-19) 

*    **Novos recursos (para usuários) :** 
    * Há agora orientação para acessar o privado protegido por senhaERDDAP™conjuntos de dados (https://) via via via viacurlePython. Ver[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)e[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instruções.
Graças a Emilio Mayorga de NANOOS e Paul Janecek de Spyglass Technologies.
         
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    *   ERDDAP™agora requerJava1,8+.
        Java1.7 chegou à sua[fim da vida](https://www.oracle.com/technetwork/java/eol-135779.html)  (não mais atualizações de segurança) em abril de 2015. Esta versão deERDDAP™não funcionará com versões deJavaabaixo de 1.8. Se você atualizarJava1.7x (ou antes) , você também deve atualizar Tomcat. Ver[ERDDAP™Instruções de configuração](/docs/server-admin/deploy-install)para baixar links e conselhos.
    * Novo formulário do fornecedor de dados.
Quando um provedor de dados vem a você esperando adicionar alguns dados ao seuERDDAP™, pode ser difícil e demorado para coletar todos os metadados necessários para adicionar o conjunto de dados emERDDAP. Muitas fontes de dados (por exemplo, arquivos .csv, Arquivos do Excel, bancos de dados) não tem metadados internos, entãoERDDAP™tem um novo formulário de provedor de dados que reúne metadados do provedor de dados e dá ao provedor de dados alguma outra orientação, incluindo ampla orientação para dados em bancos de dados. As informações apresentadas são convertidas emdatasets.xmlformato e depois enviado para oERDDAP™administrador (tu) e escrito (apêndice) para bigParentDirectory/logs/dataProviderForm.log . Assim, o formulário semi-automatiza o processo de obtenção de um conjunto de dados emERDDAP™, mas oERDDAP™administrador ainda tem que completar odatasets.xmlchunk e lidar com a obtenção do arquivo de dados (S) do provedor ou conectando ao banco de dados. Para mais informações, consulte o[Provedor de dados Descrição do formulário](/docs/server-admin/datasets#data-provider-form).
    * Novo&lt;O que é isso?
pode ser usado porEDDGridDos quartos (e assim de NcFiles e deMergeIRFiles) ,EDDGridAggregateExistingDimension,EDDGridEntendido.EDDGridConjuntos de dados SideBySide para especificar como exatamente igual os valores do eixo em arquivos diferentes devem ser (quantos dígitos) : 0=no check (Não use isso&#33;) 1-18 para aumentar a precisão, ou 20 (o padrão) para igualdade exata. Para n=1-18,ERDDAP™garante que os primeiros n dígitos de valores duplos (ou (Não.) div 2 para valores de flutuação) são iguais.
        &lt;matchAxisNDigits&gt; substitui&lt;assegure axisValuesAreEqual&gt;, que agora é desprecated. Um valor de 'verdadeiro' será convertido para matchAxisNDigits=20. Um valor de 'falso' (Não faças isso&#33;) será convertido em fósforo AxisNDigits=0.
    *   EDDGridDos Ficheiros e Tabela EDD FromFiles irá carregar muito lentamente a primeira vez que você usar esta versão deERDDAP.
        ERDDAP™agora armazena a informação interna do arquivo um pouco diferente, então a tabela interna do arquivo para cada um desses conjuntos de dados tem de ser reconstruída. Não te preocupes. Nada está errado. É uma coisa de uma vez.
    * Arquivos de fonte remota
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles agora permitem que os arquivos sejam arquivos remotos em um diretório acessível porhttp://  (e provavelmentehttps://e ftp://, mas eles não são testados) se o servidor remoto suporta[Pedidos de Gama](https://en.wikipedia.org/wiki/Byte_serving)no cabeçalho do pedido. THREDDS e Amazon S3 suporte Range Requests,HyraxNão. Este sistema permite que você acesse dados em arquivos remotos sem baixar os arquivos (que é útil se os arquivos remotos são muito volumosos) , mas o acesso a esses arquivos será muito mais lento do que o acesso a arquivos locais ou mesmo a um remotoOPeNDAPfonte.
Isso inclui"files"em um balde Amazon S3 desde que eles são acessíveis viahttp://. Se os nomes de objetos S3 são como nomes de arquivos (com interno / é como uma árvore de diretório Linux) ,ERDDAP™também pode tornar os arquivos acessíveis viaERDDAP'"files"sistema. Para que isso funcione, suas credenciais S3 devem estar em ~/.aws/credentials (em Linux, OS X ou Unix) , ou C:\\Users\\USERNAME\\.aws\\credentials (no Windows) no servidor comERDDAP. Ver[Documentação do Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * Gerar conjuntos de dados Xml tem uma nova opção incomum: EDDsFromFiles.
Isso passará por um sistema de arquivos (mesmo um sistema remoto como um Amazon S3 se os objetos têm nomes como arquivo) e criardatasets.xmlpedaços para uma série de conjuntos de dados. A tua quilometragem pode variar. Isso funciona bem se os arquivos são organizados para que todos os arquivos de dados em um determinado diretório (e seus subdiretórios) são adequados para um conjunto de dados (por exemplo, todos os compósitos SST de 1 dia) . Caso contrário, (por exemplo, se um diretório contém alguns arquivos SST e alguns arquivos Chlorophyll-a) , isto funciona mal, mas ainda pode ser útil.
    * Programadores: novos arquivos /lib .jar.
Se você compilarERDDAP™, observe os novos arquivos .jar no parâmetro classpath -cp listados noERDDAP™ [Guia do programador](/docs/contributing/programmer-guide).
    * sea\\_water\\_practical\\_salinity
Se você usar o nome padrão CF mar\\_water\\_salinity para qualquer variável, eu encorajo você a mudar para sea\\_water\\_practical\\_salinity que está disponível em[versão 29 da tabela de nome padrão CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (e algumas versões anteriores -- Eu não sabia que) . Este nome indica que este é de fato um valor de Salinidade Prática usandoPractical Salinity Units  (PSU) , em oposição a um valor g/kg mais antigo. As unidades canônicas são diferentes, mas ainda incrivelmente inúteis: 1 (presumivelmente implicandoPSU/PSS-78) , em oposição a 1e-3 (presumivelmente implicando g/kg) para o mar\\_water\\_salinity.\\[Olá.Unidatae CF: Identificamos valores que usam outras escalas, por exemplo Fahrenheit ou Celsius, através de uma cadeia de unidades que é o nome da escala ou alguma variação. Por que não podemos identificar unidades de salinidade através de sua escala, por exemplo, PSS-78? Eu sei: Os valores PSS-78 são "unitless", mas há uma escala implícita, não há? Se eu inventar uma nova escala de salinidade prática onde os valores são 0,85 vezes os valores PSS-78, as unidades canônicas ainda devem ser "1"? Como um usuário pode dizer-lhes o contrário? Unidades de 1e-3 e 1 não são descritivas nem úteis para usuários que estão tentando descobrir o que os números indicam.\\]

## Versão 1.62{#version-162} 
 (lançado 2015-06-08) 

*    **Novos recursos (para usuários) :** 
    * ParaEDDGriddatasets, os usuários agora podem fazer Gráfico Tipo: Gráficos de superfície com qualquer combinação de eixos numéricos, não apenas longitude versus latitude. Isso permite que você faça x versus y (projectado) gráficos e vários[Diagramas de Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), por exemplo, traçando longitude versus profundidade, ou tempo versus profundidade.\\[Nota: se a profundidade está no eixo Y, provavelmente será virado do que você quer. Desculpe, desmoronar ainda não é uma opção.\\]Graças a Cara Wilson e Lynn DeWitt.
    * Há um novo[Conversor de Acrônimo Oceanic/África](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)que permite converter um acrônimo oceânico / atmosférico comum para / de um nome completo.
    * Há um novo[Oceânico / Atmosférico Conversor de nomes variáveis](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)que permite converter um nome comum variável oceânica / atmosférica para / de um nome completo.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    *   Java7/8-2003
        Oraclenão suporta mais (fornece correções de bugs de segurança para)  Java7.ERDDAP™ainda suportaJava7, mas por favor, mude-se paraJava8. A próxima versão deERDDAP™provavelmente vai exigirJava8.
    *   valid\\_min/max/range
Anteriormente e agora, se umdataVariableeu tinha tidoscale\\_factoreadd\\_offsetmetadados,ERDDAP™descompacta os valores de dados e remove esses metadados. Anteriormente...ERDDAP™não modificar/desfazer nenhum pacotevalid\\_range,valid\\_min,valid\\_maxmetadados (que geralmente / deve conter valores embalados) porscale\\_factoreadd\\_offset. Agora faz. Por favor, procureERDDAP™para "valid\\_" e certifique-se de que todas as variáveis que têmvalid\\_range,valid\\_minouvalid\\_maxter os valores corretos quando os conjuntos de dados aparecem na nova versão deERDDAP. Ver[valid\\_range/min/max documentação](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Anteriormente...ERDDAP™  (notavelmente Gerar conjuntos de dados Xml) usado/recomendado o original (1.0.) versão do[NetCDFAtribua a Convenção para o Descobrimento de Dados](https://wiki.esipfed.org/ArchivalCopyOfVersion1)que foi referido como "UnidataDataset Discovery v1.0" nas Convenções globais eMetadata\\_Conventionsatributos. Agora, recomendamos[Versão ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)que foi ratificado no início de 2015 e é referido como "ACDD-1.3". Felizmente, ACDD-1.3 é altamente compatível com a versão 1.0. RECOMENDADO que você[mudar para ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Não é difícil.
    * Gerar conjuntos de dados Atributos Xml
Houve um grande número de mudanças para melhorar&lt;addAttributes&gt; valores sugeridos por GerarDatasets Xml para as Convenções globais,creator\\_name/email/url, palavras-chave, resumo e atributos de título e para a variávellong\\_nameatributo. Algumas mudanças estão relacionadas com o novo uso de ACDD-1.3.
    * Tabela de EDDSOSconjuntos de dados
Com a adição ocasional de novos tipos deSOSservidores e mudanças nos servidores antigos, está ficando mais difícil paraERDDAP™para detectar automaticamente o tipo de servidor a partir das respostas do servidor. O uso de [&lt;sosServerType&gt;] (/docs/server-admin/datasets#eddtable fromsos-skeleton-xml)   (com um valor de IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, ou QUEM) está agora firmemente recomendado. Se algum dos seus conjuntos de dados deste tipo tiver problemas na nova versão doERDDAP, tente reiniciar GerrateDatasets Xml para oSOSservidor para gerar um novo pedaço dedatasets.xmlpara esse conjunto de dados. Gerar conjuntos de dados Xml vai deixar você experimentar o diferente&lt;sosServerType&gt; opções até você encontrar o certo para um determinado servidor. Se você ainda tem problemas, por favor me avise o problema que você vê e a URL do servidor e eu tentarei ajudar.
    * EDDTable FromFileNames conjuntos de dados
Alguns atributos que foram recomendadosaddAttributessão agora fonteAttributes. Você provavelmente não precisa mudar nada para conjuntos de dados existentes em seudatasets.xml.
    * Correção de bug relacionada a certas solicitações para EDDTableDe conjuntos de dados NcCFFiles.
Eu também adicionei um grande número de testes unitários ao grande número existente de testes unitários dos métodos subjacentes (há 100 de cenários) . Graças a Eli Hunter.
    * Correção de bugs / pequenas alteraçõesEDDGridDe Merceir.
Graças a Jonathan Lafite e Philippe Makowski
    * Correção de bugs:EDDGridFromErddap agora funciona mesmo se um conjunto de dados remoto não tiverioos\\_categoryatributos variáveis.
Graças ao Kevin O'Brien.
    * Correção de bug na página web .graph paraEDDGriddatasets quando há apenas uma variável de eixo com mais de um valor.
Graças ao Charles Carleton.
    * Houve outras pequenas melhorias, mudanças e correções de bugs.

## Versão 1.60{#version-160} 
 (lançado em 2015-03-12) 

*    **Novos recursos (para usuários) :** nenhum
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * STRONGLY RECOMENDADO: Atualize o servidor[robots.txt](/docs/server-admin/additional-information#robotstxt)arquivo para incluir:
Desallow: /erddap / arquivos /
    * INotificar problema e solução:
Em computadores Linux, se você estiver usando&lt;updateEveryNMillis&gt; com datasets com type=EDDGridA partir deFiles, EDDTableDeFiles,EDDGridCopiar, EDDTableCopy, ou suas subclasses, você pode ver um problema onde um conjunto de dados não consegue carregar (ocasionalmente ou consistentemente) com a mensagem de erro: "IOException: limite de usuário de inotify instâncias alcançadas ou muitos arquivos abertos". Se assim for, você pode corrigir este problema chamando (como raiz) :
echo fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|tee -a /etc/sysctl.conf
- Sim.
Ou, use números mais altos se o problema persistir. O padrão para relógios é 8192. O padrão para instâncias é 128.\\[UPDATE: Há um bug emJavao que faz inotificar instâncias para não ser lixo coletado. Este problema é evitado emERDDAP™v1.66 e superior. Assim, a melhor solução é mudar para a versão mais recente deERDDAP.\\]
    * NoSuchFileException Correção de Bug:
Havia um bug que poderia causar conjuntos de dados do tipo=EDDGridA partir deFiles, EDDTableDeFiles,EDDGridCopiar, EDDTableCopy, ou suas subclasses para não carregar ocasionalmente com o erro "NoSuchFileException: _someFileName_". O bug está relacionado com usos de FileVisitor e foi introduzido emERDDAP™V1.56. O problema é raro e é mais provável que afete conjuntos de dados com um grande número de arquivos de dados com frequência.
    * Houve algumas pequenas melhorias, mudanças e correções de bugs.

## Versão 1.58{#version-158} 
 (lançado 2015-02-25) 

*    **Novos recursos (para usuários) :** 
    * O novo["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)sistema permite navegar em um sistema de arquivos virtual e baixar arquivos de dados de origem de muitosERDDAP™conjuntos de dados. O"files"sistema é ativo por padrão, masERDDAP™administradores podem desabilitá-lo colocando
```
        <filesActive>false</filesActive>  
```
noERDDAP™arquivo setup.xml. Obrigado especial a Philippe Makowski, que persistiu quando eu era lento para apreciar a beleza desta ideia.
    * destino do tempo Max... Anteriormente, a variável de tempo de conjuntos de dados EDDTable com dados em tempo real quase tinha um destinoMax de NaN, o que implicava que o valor máximo de tempo para o conjunto de dados é recente, mas não precisamente conhecido e mudando com freqüência. Agora, o destinoMax tem um valor real, indicando o atualmente conhecido da última vez. Muitos conjuntos de dados têm dados atualizados continuamente.ERDDAP™suporta acessar os dados mais recentes, mesmo que seja após a última vez conhecida. Note que o novo [&lt;updateEveryNMillis&gt;] (/docs/admin/datasets#updateeverynmillis) suporte emEDDGridDos Ficheiros e Tabela EDD A partir deFiles datasets atualiza o destino da variável de tempoMax. Outra consequência desta mudança é que adatasetID= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =allDatasetsdataset agora inclui a última vez atualmente conhecida nas colunas maxTime. Graças ao John Kerfoot.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * STRONGLY RECOMENDADO: Atualize o servidor[robots.txt](/docs/server-admin/additional-information#robotstxt)arquivo para incluir:
Desallow: / arquivos /
Desallow: /erddap / arquivos /
    * Amostradatasets.xml- ... No ano passado, recomendamos vários conjuntos de dados excelentes no relógio de costaERDDAP™que você poderia adicionar ao seuERDDAP™apenas adicionando algumas linhas ao seudatasets.xml. Se você adicionou os conjuntos de dados erdVH, alterne para os conjuntos de dados erdVH2 mais recentes:
        * Faça uma cópia de todos os conjuntos de dados erdVH e altere o copiadodatasetIDÉ de erdVH... para erdVH2... e mudar a referênciasourceUrlde erdVH... para erdVH2....
        * Defina os conjuntos de dados erdVH para active="false".
    * TudoEDDGridDos Ficheiros e Tabela EDD As subclasses da FromFiles agora suportam [&lt;acessívelViaFiles&gt;] (/docs/server-admin/datasets#acessíveis através de arquivos) para tornar os arquivos de dados de origem acessíveis através do"files"sistemas. Por padrão, este sistema está desligado para cada conjunto de dados. Você precisa adicionar a tag para habilitar. Graças a Philippe Makowski.
    * TudoEDDGridDos Ficheiros e Tabela EDD As subclasses da FromFiles agora suportam [&lt;updateEveryNMillis&gt;] (/docs/admin/datasets#updateeverynmillis) . Por padrão, este sistema está desligado para cada conjunto de dados. Você precisa adicionar a tag para habilitar. Graças a Dominic Fuller-Rowell e NGDC.
    * O novo[EDDTable De Nomes de Arquivo](/docs/server-admin/datasets#eddtablefromfilenames)cria um conjunto de dados a partir de informações sobre um grupo de arquivos no sistema de arquivos do servidor, mas não serve dados dentro dos arquivos. Por exemplo, isso é útil para distribuir coleções de arquivos de imagem, arquivos de áudio, arquivos de vídeo, arquivos de processamento de texto e arquivos de planilha. Isso funciona de mãos dadas com o novo["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)sistema, para que os usuários possam baixar os arquivos. Obrigado especial a Philippe Makowski, que persistiu quando eu era lento para apreciar a beleza desta ideia.
    * O novo[EDDGridTabela DED](/docs/server-admin/datasets#eddgridfromeddtable)permite converter um conjunto de dados tabular em um conjunto de dados gradeado. Graças à Ocean Networks Canada.
    * O novo[EDDGridA partir deMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)agrega dados de um grupo de MergeIR local.gzarquivos.EDDGridFromMergeIRFiles tem a distinção de ser o primeiro pedaço de código contribuiu paraERDDAP. Foi feito inteiramente sem a nossa ajuda. Três claques e agradecimentos especiais a Jonathan Lafite e Philippe Makowski da R.Tech Engineering.
    * Há uma nova, opcional setup.xml tag,&lt;unitTestDataDir&gt;, que especifica o diretório com os arquivos de dados de teste da unidade que estão disponíveis através de um novo repositório GitHub:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Por exemplo:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Isso ainda não é útil, mas faz parte do movimento para fazer o maior número de testes unitários gerenciáveis por outras pessoas quanto possível. Graças ao Terry Rankine.
    * Houve muitas pequenas melhorias, mudanças e correções de bugs.

## Versão 1.56{#version-156} 
 (lançado 2014-12-16) 

*    **Novos recursos (para usuários) :**   (Nenhuma) 
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Provavelmente já sabe.[EDDGridDe Erddap](/docs/server-admin/datasets#eddfromerddap)e[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)que permitem ligar para conjuntos de dados em outrosERDDAPs e tê-los aparecer em seuERDDAP. Os pedidos do usuário para dados reais desses conjuntos de dados são encaminhados invisivelmente para a fonteERDDAP™, para que os dados não fluam através de seu sistema ou use sua largura de banda. Há agora uma grande lista de conjuntos de dados recomendados na amostradatasets.xmlerddapContent.zip. Para incluí-los em seuERDDAP™, tudo o que você tem que fazer é copiar e colar os que você quer em seudatasets.xml. Graças a Conor Delaney.
    * Se você compilarERDDAP™, você precisa adicionar algum novo . arquivos jar para o seu[classpath -cp switch](/docs/contributing/programmer-guide#development-environment)para javac e java.
    * O novo[EDDTable FromCasandra](/docs/server-admin/datasets#eddtablefromcassandra)manipula obter dados de[Cassandra](https://cassandra.apache.org/). Graças à Ocean Networks Canada.
    * O novo[EDDTable FromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)lida com a obtenção de dados de arquivos de dados ASCII com colunas de largura fixa. Graças a Philippe Makowski.
    * TudoEDDGridDos Ficheiros e Tabela EDD As subclasses da FromFiles agora usam um novo método, FileVisitor (adicionado aJavaem 1.7) para reunir informações sobre os arquivos. Isso pode não ter nenhum benefício para a primeira coleta de informações de arquivo para um dado conjunto de dados, mas parece ter um enorme benefício para reuniões subsequentes, se feito em breve, enquanto o sistema operacional ainda tem as informações armazenadas em cache. Graças ao NGDC.
        
Nós ainda recomendamos: Se um conjunto de dados tem um grande número de arquivos (por exemplo, &gt;1,000) , o sistema operacional (e assimEDDGridDos Ficheiros e da Tabela EDDDos Ficheiros) irá operar muito mais eficientemente se você armazenar os arquivos em uma série de subdiretórios (um por ano, ou um por mês para conjuntos de dados com arquivos muito frequentes) , para que nunca haja um grande número de arquivos em um determinado diretório.
        
    * Várias pequenas melhorias para EDDTableFromAsciiFiles.
    * Algumas melhorias para EDDTableFromAsciiServiceNOS, nomeadamente para obter algumas colunas adicionais de informação da fonte. Graças a Lynn DeWitt.
    * Algumas pequenas correções de bugs relacionadas com a ISO 19115 queERDDAP™gera. Graças à Anna Milan.

## Versão 1.54{#version-154} 
 (lançado 2014-10-24) 

*    **Novos recursos (para usuários) :** 
    * Algumas variáveis agora trabalham com tempo na precisão de milissegundos, por exemplo, 2014-10-24T16:41:22.485Z. Graças ao Dominic Fuller-Rowell.
*    **Pequenas alterações/Bug Corrige:** 
    * Correção de bug: com uma certa combinação de circunstâncias,EDDGridOs conjuntos de dados do FromNcFile retornaram dados com precisão reduzida (por exemplo, flutua em vez de dobras) . Isso só pode afetar os valores de dados com &gt; 8 figuras significativas. As minhas desculpas. (E foi um bug de programação de computador clássico: um personagem errado.) Graças ao Dominic Fuller-Rowell.
    * Muitas pequenas mudanças.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Os conjuntos de dados do Griddap agora suportam variáveis do eixo do timestamp e variáveis de dados (ou seja, variáveis com valores de tempo, mas umdestinationNameoutros"time") . Graças ao Dominic Fuller-Rowell.
    *   ERDDAP™agora suporta corretamente milissegundostime\\_precision«1970-01T00:00:00.000Z» (em inglês). Um peculiar intencional: ao escrever tempos para arquivos orientados para o homem (por exemplo, .csv,.tsv,.json,.xhtml) ,ERDDAP™utiliza o especificadotime\\_precisionse incluir segundos e/ou segundos decimais; caso contrário, ele usa segundostime\\_precision"1970-01T00:00Z" (para compatibilidade de consistência e retrocesso) . Graças ao Dominic Fuller-Rowell.
    *   EDDGridFromNcFiles agora suporta a leitura StringdataVariableS.
    *   .ncarquivos escritos por griddap agora pode ter StringdataVariableS.
    * Gerar conjuntos de dados Xml agora inclui mais flush () chamadas para evitar o problema da informação não sendo escrito para os arquivos. Graças ao Thierry Valero.
    * A documentação para GenerateDatasetsXml foi melhorada, notavelmente para apontar que o interruptor -i só funciona se você especificar todas as respostas na linha de comando (por exemplo, modo de script) . E o modo de script é explicado. Graças ao Thierry Valero.
    *   ERDDAP™já não permite que duas variáveis em um conjunto de dados tenham o mesmosourceName. (Se alguém fez isso antes, provavelmente levou a mensagens de erro.) Como antes,ERDDAP™não permite que duas variáveis em um conjunto de dados tenham o mesmodestinationName.

## Versão 1.52{#version-152} 
 (lançado 2014-10-03) 

*    **Novos recursos:**   (nenhum) 
*    **Pequenas alterações/Bug Corrige:** 
    * Outro (menor) mudar para fazerERDDAP™mais rápido.
    * Melhoria dos arquivos ISO 19115 gerados porERDDAP: adicionado recentemente recomendado&lt;gmd:protocol &gt; valores (informação, pesquisa,OPeNDAP:OPeNDAP,ERDDAP:griddap, eERDDAP:tabledap) dentro de&lt;gmd:CI\\_OnlineResource&gt;. Graças a Derrick Snowden e John Maurer.
    * Muitas pequenas mudanças.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Correção de Bug: GerarDatasetsXml.sh e DasDds.sh não estavam no erddap.war para 1.48 e 1.50. Agora estão. Graças ao Thierry Valero.
    * Pequenas mudanças em alguns testes de velocidade em TestAll para torná-los menos suscetíveis ao acaso. Graças ao Terry Rankine.

## Versão 1.50{#version-150} 
 (lançado 2014-09-06) 

*    **Novos recursos:**   (nenhum) 
*    **Pequenas alterações/Bug Corrige:** 
    * Isto é...ERDDAP™deve ser muito mais rápido do que as versões recentes.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:**   (Nada.) 

## Versão 1.48{#version-148} 
 (lançado 2014-09-04) 

*    **Novos recursos:** 
    *   ERDDAP™agora sempre cria um conjunto de dados tabular,datasetID= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =allDatasets, que tem uma tabela de informações sobre todos os conjuntos de dados nesteERDDAP. Pode ser consultado como qualquer outro conjunto de dados tabular. Esta é uma alternativa útil para o sistema atual para obter informações sobre conjuntos de dados programaticamente.
    * Existem dois novos tipos de arquivo de saída para EDDTable eEDDGrid, .csv0 e.tsv0. Eles são vírgulas e arquivos de valor separado por guia que não têm linhas com nomes de colunas ou unidades. Os dados começam na primeira linha. Eles são especialmente úteis para scripts que só querem um pedaço de informação deERDDAP.
*    **Pequenas alterações/Bug Corrige:** 
    * Os mapas podem agora ser feitos a longitudes no intervalo -720 a 720.
    * O novo.ncml resposta Tipo de arquivo está disponível para todosEDDGridconjuntos de dados. Ele retorna o[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)Descrição formatada do conjunto de dados (similar a um .dds combinado + .das) .
    * Correção de Bug: Salvar dados tabular para um.ncO arquivo foi limitado a 100.000 valores por variável. Agora é apenas limitado a 2 GB de tamanho total de arquivo. Graças ao Kevin O'Brien.
    * Correção de Bug: o saveAsMatlabmétodos agora garantir quedatasetIDs são convertidos em cofreMatlabnomes variáveis. Mas eu ainda recomendo fortemente que você criedatasetIDs que são nomes variáveis válidos: começando com uma letra e, em seguida, apenas usando A-Z, a-z, 0-9 e \\_. Ver[datasetID](/docs/server-admin/datasets#datasetid). Graças ao Luke Campbell.
    * Correção de bug em EDDTableFromDatabase: Com alguns tipos de bancos de dados, um NO\\_ A resposta de DADOS da base de dados levou a um atraso de 30 segundos noERDDAP. Graças ao Greg Williams.
    * Correção de bugs:EDDGridFaça um gráfico com o tipo gráfico = linhas (ou marcadores ou marcadores e linhas) variável do eixo x forçado a ser tempo. Agora pode ser qualquer eixo. Graças a Lynn DeWitt.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * STRONGLY RECOMENDADO: AtualizaçãoJava  
Esta versão deERDDAP™requerimentoJava7 ou superior, masJava7 alcançará seu fim de vida em abril de 2015 (Em breve&#33;) , então agora é uma boa hora para mudar paraJava8.Java8 é fortemente recomendado. Eu testo comJava8. Note queJava6 alcançou seu fim de vida em fevereiro de 2013 (Não há mais correções de bugs de segurança&#33;) .
    * STRONGLY RECOMENDADO: Atualizar Tomcat
Se você usar Tomcat, alterne para a versão mais recente do Tomcat. Tomcat 8 é projetado para trabalhar comJava8.
    * "ERDDAP" não é mais um acrônimo. Agora é apenas um nome. Não quero que o nome destaqueERD. Eu queroERDDAP™para destacar sua instituição e seus dados.
    * Por favor.[personalizar a aparência de seuERDDAP™instalação para destacar sua instituição e seus dados](/docs/server-admin/deploy-install#customize). Com uma hora de trabalho, você pode fazer boas melhorias que durarão para sempre.
    * Em setup.xml, o&lt;displayDiagnosticInfo&gt; opção é agora sempre ignorada e tratada como se o valor fosse falso.
RECOMENDADO: Remover&lt;displayDiagnosticInfo&gt; tag e informações relacionadas do seu setup.xml.
    * Em setup.xml, o padrão para&lt;drawLandMask&gt; foi "mais", mas agora está "abaixo", que é um melhor padrão geral (funciona bem com todos os conjuntos de dados) .
    * Os scripts GenerateDatasetsXml.sh e DadDds.sh Linux agora usam bash em vez de csh, e têm a extensão .sh. Graças a Emilio Mayorga
    * Gerar conjuntos de dados Xml e DasDds agora criar seus próprios arquivos de log (GerarDatasetsXml.log e DasDds.log) e arquivos de saída (GerarDatasetsXml.out e DadDds.out) in _bigParentDirectory_/logs/, e nunca colocar seus resultados na área de transferência.
    * Gerar conjuntos de dados Xml agora suporta um parâmetro linha de comando -i que insere a saída no arquivo especificado em um lugar especificado. Ver[documentação](/docs/server-admin/datasets#generatedatasetsxml). Graças ao Terry Rankine.
    * EDDTableFromDatabase agora suporta&lt;colunaNomeQuotes&gt;&lt;/columnNameQuotes&gt;, com valores válidos " (o padrão) ou nada. Este personagem (se houver) será usado antes e após nomes de colunas em consultas SQL. Diferentes tipos de bancos de dados, configurados de maneiras diferentes, precisarão de diferentes marcas de cotação de nome de coluna.
    * Variáveis de latitude e longitude tabular agora podem ter personalizadolong\\_name's, por exemplo, Perfil Latitude. Anteriormente, só podiam ser Latitude e Longitude.
    * A partir de agora, especifique "defaultDataQuery" e "defaultGraphQuery" como atributos nos metadados globais do conjunto de dados (i.e.,&lt;addAtts&gt;), não como separado&lt;defaultDataQuery&gt; e&lt;defaultGraphQuery&gt; tags. (Embora, se você ainda especifique-os através das tags,ERDDAP™criará automaticamente atributos globais com as informações.) 

## Versão 1.46{#version-146} 
 (lançado 2013-07-09) 

*    **Novos recursos:** 
    *    (Nenhuma) 
*    **Pequenas alterações/Bug Corrige:** 
    * Correção de Bug: Na EDDTableFromDatabase, apenas na versão 1.44,ERDDAP™incorretamente citou o nome da tabela do banco de dados em declarações SQL. Isso agora está fixo. Graças ao Kevin O'Brien.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    *    ** Se você não modificar as mensagens padrão em message.xml,
excluir\\[Toca a brincar.\\]/content/erddap/messages.xml . **   
O arquivo message.xml padrão está agora no erddap. arquivo de guerra, não erddapContent.zip. Então, você não precisa mais atualizar manualmente o message.xml .
    * Se você modificar as mensagens em message.xml, a partir de agora, cada vez que você atualizarERDDAP™Ou:
        * Faça as mesmas mudanças que você fez antes para o novo
            \\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
E esta uma vez: excluir\\[Toca a brincar.\\]/content/erddap/messages.xml .
        * Ou, descubra o que mudou nas novas mensagens.xml (via diff) e modificar o seu
            \\[Toca a brincar.\\]/content/erddap/messages.xml ficheiro de acordo.

## Versão 1.44{#version-144} 
 (lançado 2013-05-30) 

*    **Novos recursos:** 
    * Consultas para conjuntos de dados EDDTable agora suportam &orderByMin (...) eorderByMinMax (...)   (que retorna duas linhas em cada grupo, com o mínimo e máximo do últimoorderByvalor) . Graças a Lynn DeWitt.
    * Há dois novostabledaptipos de arquivo:.ncCFHeader e.ncCFMAHeader (que retornam o cabeçalho tipo ncdump do correspondente.ncCF e.ncTipos de arquivo CFMA) . Graças ao Steve Hankin.
*    **Pequenas alterações/Bug Corrige:** 
    * Correção de Bug: carregar as páginas web .graph e .html para conjuntos de dados com muitos valores de tempo foi lento porqueERDDAP™foi lento ao gerar as opções de controle de tempo. Agora é sempre rápido. Graças a Michael Barry, OOICI e Kristian Sebastian Blalid.
    * Correção de bugs: Em alguns tipos de conjuntos de dados da EDDTable, as restrições de tempo nem sempre foram tratadas corretamente. Agora estão. Graças a John Maurer e Kevin O'Brien.
    * Correção de bugs: os conjuntos de dados não carregariam quando todos ossubsetVariablesforam variáveis de valor fixo. Agora vão. Graças a Lynn DeWitt e John Peterson.
    * MELHORADO: agora, todas as consultas para apenas variáveis subconjuntas atuam como se &distinct () faz parte da consulta.
    * MELHORADO: agora, para consultas que incluem &.jsonp=_functionName_, _function Name_ MUST agora ser uma série de 1 ou mais (período separado) palavras. Cada palavra deve começar com uma letra ISO 8859 ou "\\_" e ser seguida por 0 ou mais ISO 8859 letras, dígitos ou "\\_". Sim, isto é mais restritivo do queJavaOs requisitos do script para nomes de funções.
    * O eixo de tempo em gráficos agora funciona bem para intervalos de tempo mais longos (80 - 10000 anos) e intervalos de tempo mais curtos (0,003 - 180 segundos) .
    *   ERDDAP™é agora mais indulgente ao analisar variações de dados do tempo do formato ISO-8601.
    * Havia muitas outras pequenas mudanças e correções de bugs.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    *    **Você precisa atualizar para a versão mais recente para ser seguro.**   
        ERDDAP™passou por uma auditoria de segurança. Havia alguns insetos e fraquezas. A versão 1.44 inclui várias correções importantes de bugs de segurança e várias mudanças para aumentar a segurança e acessibilidade (por exemplo, para usuários com deficiência de visão) . A versão 1.44 passou pela auditoria de segurança de acompanhamento. Graças a todas as pessoas boas na USGS e Acunetix que tornaram isso possível. (Não devia.NOAAestar a fazer isto?) 
    * O novo[Tabela de EDDWFSArquivos](/docs/server-admin/datasets#eddtablefromwfsfiles)faz uma cópia local de todos os dados de umaArcGISMapaServerWFSservidor e assim os dados podem então ser reservados rapidamente paraERDDAP™usuários. Graças à Christy Caudill.
    * O novo[Tabela de EDDEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)permite criar um conjunto de dados EDDTable a partir de umEDDGridconjunto de dados. Algumas razões comuns para fazer isso são:
        * Isso permite que o conjunto de dados seja consultado comOPeNDAPrestrições de seleção (que um usuário pode ter solicitado) .
        * O conjunto de dados é inerentemente um conjunto de dados tabular. Graças ao OOICI, Jim Potemra, Roy Mendelssohn.
    * O nome variável "profundidade" é agora uma alternativa especial para "altitude". As unidades devem ser uma variante de "metros". Os valores de dados devem ser positivos = abaixo.ERDDAP™está agora plenamente consciente do significado de "profundidade" e apoia-o onde quer que a altitude seja suportada (por exemplo, como um componente de um conjunto de dados CF DSG cdm\\_data\\_type=profile) . Um conjunto de dados não deve ter ambas as variáveis "profundidade" e "altitude".
    * Em seudatasets.xml, por favor remover qualquer uso de&lt;at name="cdm\\_altitude\\_proxy"&gt;profundidade&lt;/att&gt; uma vez que a profundidade é agora uma alternativa especial à altitude e assim não precisa ser especialmente identificada.
    * Em seudatasets.xml, por favor remover qualquer uso de&lt;altitudeMetersPerSourceUnit&gt;, exceto para EDDTable A partir deSOS.
Quando o valor for 1, basta excluí-lo.
Quando o valor for -1, considere alterar o nome da variável para a profundidade.
Para outros valores, adicione a&lt;addAttributes&gt; por exemplo:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Todos os conjuntos de dados agora suportam
        
        *   &lt;defaultDataQuery&gt; que é usado se .html é solicitado sem consulta.
            * Você provavelmente raramente precisará usar isso.
            * Para conjuntos de dados do griddap, um uso comum disso é especificar um valor diferente da profundidade padrão ou da dimensão da altitude (por exemplo,\\[0\\]em vez de\\[último\\]) .
Em qualquer caso, você deve sempre listar todas as variáveis, sempre usar os mesmos valores de dimensão para todas as variáveis, e quase sempre usar\\[0\\],\\[último\\]ou\\[0: última\\]para os valores de dimensão.
Por exemplo:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Paratabledapdatasets, o uso mais comum disso é especificar um intervalo de tempo padrão diferente (em relação a agora, por exemplo, &time&gt;=now-1 dia) .
Lembre-se que não requerer variáveis de dados é o mesmo que especificar todas as variáveis de dados, então geralmente você pode apenas especificar a nova restrição de tempo.
Por exemplo:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt; que é usado se .graph for solicitado sem consulta.
            * Você provavelmente raramente precisará usar isso.
            * Para conjuntos de dados do griddap, o uso mais comum disso é especificar um valor diferente da profundidade padrão ou da dimensão da altitude (por exemplo,\\[0\\]em vez de\\[último\\]) e/ou especificar que uma variável específica seja graficada.
Em qualquer caso, você quase sempre vai usar\\[0\\],\\[último\\]ou\\[0: última\\]para os valores de dimensão.
Por exemplo:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Paratabledapdatasets, os usos mais comuns deste são especificar variáveis diferentes a serem grafiadas, um intervalo de tempo padrão diferente (em relação a agora, por exemplo, &time&gt;=now-1 dia) e/ou configurações de gráficos padrão diferentes (por exemplo, tipo de marcador) .
Por exemplo:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Lembre-se de que você precisa para XML-encode ou percent-encode (ou um, mas não ambos) as consultas padrão desde que estão em um documento XML. Por exemplo, & se torna &amp; ,&lt;torna-se &amp;lt; , e &gt; torna-se &amp;gt; .
E por favor verifique o seu trabalho. É fácil cometer um erro e não ter o que você quer.
Graças a Charles Carleton, Kevin O'Brien, Luke Campbell e outros.
    *   EDDGridDe Sabão,EDDGridFromErddap, e EDDTableFromEDDGridtem um novo sistema para lidar com conjuntos de dados que mudam frequentemente (tão frequentemente como aproximadamente a cada 0,5 s) . Ao contrárioERDDAP's sistema regular, proativo para recarregar completamente cada conjunto de dados, este sistema adicional opcional é reativo (acionado por uma solicitação de usuário) e incremental (apenas atualizando as informações que precisam ser atualizadas) . Por exemplo, se um pedido para umEDDGridO conjunto de dados do FromDap ocorre mais do que o número especificado de milissegundos desde a última atualização,ERDDAP™vai ver se existem novos valores para a esquerda (geralmente"time") dimension e, se assim for, basta baixar esses novos valores antes de lidar com o pedido do usuário. Este sistema é muito bom em manter um conjunto de dados em rápida mudança up-to-date com demandas mínimas sobre a fonte de dados, mas ao custo de retardar ligeiramente o processamento de algumas solicitações de usuário. Veja...&lt;updateEveryNMillis&gt;] (/docs/admin/datasets#updateeverynmillis)   
Graças ao Michael Barry e ao OOICI.
    *   EDDGridFromNcFiles, EDDTableFromNcFiles, and EDDTableFromNcCFFiles now support[NcML.ncml](/docs/server-admin/datasets#ncml-files)arquivos de origem no lugar de.ncarquivos. Graças a Jose B Rodriguez Rueda.
    * ParaEDDGridAggregateExistingDimension,ERDDAP™suporta uma nova opção serverType="dodsindex" para o atributo serverType do&lt;sourceUrls&gt; tag. Isso funciona com páginas web que têm listas de arquivos dentro&lt;pre&gt;&lt;/pre&gt; e muitas vezes abaixo de umOPeNDAPLogo. Um exemplo é[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Para EDDTable DeSOSagora suporta uma tag opcional
```  
        <sosServerType>_serverType_</sosServerType>  
```
para que você possa especificar o tipo deSOSservidor (Então...ERDDAP™não tem que descobrir) . Valores válidos de&lt;_serverType_\\&gt; são IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, e (um servidor recém-apoiado Tipo) . Ver[Tabela de EDDSOS](/docs/server-admin/datasets#eddtablefromsos). Graças a Derrick Snowden e Janet Fredericks.
    * TudoEDDGridA partir de...Files, EDDTableDe...Files,EDDGridCopiar e EDDTable Copie agora suporte uma tag opcional
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
o que pode dizerERDDAP™para manter o arquivo Quadro (com informações sobre cada arquivo de dados de origem) em memória em vez de apenas no disco (o padrão) . Manter a tabela de arquivos em memória acelera solicitações para dados (especialmente se houver arquivos de dados de origem &gt;1000) , mas usa mais memória. Se você definir isso para true para qualquer conjunto de dados, mantenha um olho na Memória: atualmente usando linha em _yourDomain_/erddap/status.htmlpara garantir queERDDAP™ainda tem muita memória livre. Graças ao Fredrik Stray.
    * EDDTableFromASCIIFiles agora suporta&lt;charset&gt;. Os dois charsets mais comuns (Caso sensível&#33;) são ISO-8859-1 (o padrão) e UTF-8.
    * Recomendado: em setup.xml, dentro&lt;startHeadHtml&gt;, por favor mude&lt;html&gt; para dentro
        &lt;html lang="en-US"&gt; (ou diferente[código de idioma](https://www.w3schools.com/tags/ref_language_codes.asp)se você tiver traduzido mensagens.xml) .
    * setup.xml tem novas tags opcionais para desativar partes deERDDAP:
        *   &lt;conversoresActive&gt;false&lt;/conversoresActivel&gt;&lt;O padrão é verdadeiro --&gt;
        *   &lt;slideSorterActive&gt;false&lt;/slideSorterActive&gt;&lt;O padrão é verdadeiro --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- o padrão é verdadeiro --&gt; Em geral, recomendamos contra definir qualquer um deles para false.
    * Gerar conjuntos de dados Xml agora escreve resultados para _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, não log.txt. Graças à Kristian Sebastian Blalid.
    * Gerar conjuntos de dados Xml agora faz uma boa sugestão para o&lt;recarregar EveryNMinutes&gt;. Graças aoNOAAProjeto UAF.
    * Muitas pequenas melhorias para GerarDatasetsXml. Graças aoNOAAProjeto UAF.

## Versão 1.42{#version-142} 
 (lançado 2012-11-26) 

*    **Novos recursos:** 
    *    (Sem grandes novas funcionalidades.) 
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Se você está atualizando deERDDAP™1.38 ou 1.40, não houve alterações que exigem que você faça alterações em seus arquivos de configuração (mas você deve usar o novo arquivo message.xml) .
    *   ERDDAP™mais uma vez pode correr comJava1.6. (ERDDAP™v1.40 necessárioJava1.7.) Ainda recomendamos usar a versão mais recente doJava1.7.
    * Um novo tipo de conjunto de dados,[Tabela de EDD TolsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), pode ler dados de um conjunto de Estação de Tempo Automático (AWS) Arquivos de dados XML. Graças a Lynn Dewitt e ao Exploratorium.
*    **Pequenas alterações/Bug Corrige:** 
    * Ajustado às mudanças no NDBCSOSservidores de dados de origem.
    * Ajustado às mudanças nos serviços NOS COOPS ASCII.
    * Fez várias pequenas mudanças e correções de bugs.

## Versão 1.40{#version-140} 
 (lançado em 2012-10-25) 

*    **Novos recursos:** 
    * Há um novo formato de arquivo de saída paratabledapconjuntos de dados:.ncCFMA, que salva os dados solicitados em um.ncarquivo que está em conformidade com o CF[Geometrias de amostragem discretas](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Opções multidimensionais de Array, e que, portanto, está em conformidade com os modelos NODC\\[2021: agora o[Modelos NCEI](https://www.ncei.noaa.gov/netcdf-templates)\\]para armazenar este tipo de dados. Graças ao NODC.
    *   tabledapsolicitações agora podem incluir restrições de tempo como &time&gt;now-5 dias. Ver[documentação](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Graças ao James Gosling.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Se você está atualizando deERDDAP™1.38, não houve alterações que exigem que você faça alterações em seus arquivos de configuração (mas você deve usar o novo arquivo message.xml) .
    *   ERDDAP™lançamentos públicos e marcos internos estão disponíveis via[ERDDAP™em GitHub](https://github.com/ERDDAP). Para mais informações, consulte o[Wiki Wiki Wiki](https://github.com/ERDDAP/erddap/wiki)para oERDDAP™projeto, bem como o mais geral[ERDDAP™Guia do programador](/docs/contributing/programmer-guide). (Isso foi anunciado separadamente algumas semanas após aERDDAP™1.38 lançamento.) 
    * Gerar conjuntos de dados Xml foi melhorado.
        * O script foi revisado para que ele deve funcionar corretamente em todos os computadores Linux (não apenas alguns) .
        * Agora adicionacreator\\_name,creator\\_emailecreator\\_urlsempre que possível.
        * Muitas outras pequenas melhorias.
    * Referido comoERDDAP™lida com o tempo.
        * Internamente,ERDDAP™agora lida com tempos em milissegunda precisão (não há segundos) .
        * Agora você pode especificar opcionalmente a precisão do tempo para um determinado conjunto de dados, veja[time\\_precision](/docs/server-admin/datasets#time_precision). Por exemplo, você pode definir um conjunto de dados para exibir valores de tempo com precisão de data (por exemplo, 1970-01-01-01) .
        * Seus conjuntos de dados atuais usarão as configurações padrão, então eles não são afetados por essas mudanças e continuarão a exibir tempo com precisão de segundos. Graças a Servet Cizmeli e Philip Goldstein.
    *   [EDDTable FromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)é um novo tipo de conjunto de dados que você pode usar em seudatasets.xmlficheiro. Ele pode ler dados de qualquer um dos vários formatos de arquivo definidos pelo[CF Geometrias de amostragem discretas](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenções. Graças a NODC e especial graças a Kyle Wilcox para fazer arquivos de amostra para o enorme número de formatos de arquivo DSG válidos e para torná-los publicamente disponíveis.
*    **Pequenas alterações/Bug Corrige:** 
    * Expandido o[O que é isso?](#quick-restart)sistema para todos os relevantesEDDGride subclasses EDDTable.
    * Documentação melhorada, especialmente relacionada a como usar[Anúncio grátis para sua empresa](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)e[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)de vários software cliente.
    * Pesquisa avançada alterada para apoiar o minTime e/ou o maxTime expresso como epochSeconds. Graças a Lynn Dewitt.
    * Mudança.htmlTablesaída para exibir urls e endereços de e-mail como links.
    * Adicionado "rel=" e "rev=" para relevante&lt;a href&gt; tags. Graças a Pat Cappelaere doOGC RESTprojeto.
    * Melhor proteção contra solicitações de dados irrealistas grandes, nomeadamente dentrotabledap, onde é um problema mais difícil.
    * Moveu mais mensagens para message.xml.
    * Melhorias de velocidade.
    * FixaEDDGridFromFiles para permitir descer eixos classificados. Graças à Maricel Etchegaray.
    * As referências removidas ao iGoogle já que serão descontinuadas.
    * Fez várias pequenas mudanças e correções de bugs.

## Versão 1.38{#version-138} 
 (lançado em 2012-04-21) 

*    **Novos recursos:** 
    * ISO 19115 e FGDC --ERDDAP™pode gerar automaticamente arquivos de metadados ISO 19115 e FGDC XML para cada conjunto de dados. Links para os arquivos são visíveis em cada lista de conjuntos de dados (por exemplo, de Full Text Search) e também em pastas acessíveis à Web (WAF)   (ver o[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)e[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Graças a Ted Habermann, Dave Neufeld, e muitos outros.
    * Full Text Searchs for Datasets agora suporta \\-_excludedWord_ e \\-"_expresso_" . Graças ao Rich Signell.
    * Pesquisas de conjuntos de dados agora retornam resultados uma página de cada vez. O padrão usa a string de parâmetros: page=1&itemsPerPage=1000, mas você pode alterar os valores na URL do seu pedido. Graças a Steve Hankin e ao projeto UAF.
    *   OpenSearch- ...ERDDAP™agora suporta o[OpenSearch1.1.1.](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)padrão para procurar conjuntos de dados. Entre outras coisas, isso permite sites de agregação de catálogo para fazer pesquisas distribuídas (passando um pedido de busca para cada catálogo que ele sabe) .
    * Comma separado Valor (CSV) Arquivos...ERDDAP™agora gera arquivos CSV com apenas uma vírgula entre valores (qual Excel prefere) , em vez de vírgula + espaço. Graças ao Jeff deLaBeaujardiere.
    * Milhões de Dados -- Várias mudanças foram feitas para apoiarERDDAPter um grande número de conjuntos de dados, talvez até um milhão. Graças a Steve Hankin e ao projeto UAF.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
#### Reinício rápido{#quick-restart} 
*   [A](#quick-restart)sistema de reinício rápido permiteERDDAP™para reiniciar muito mais rápido.
     **Adicione isso ao seu arquivo setup.xml** depois.&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Pesquisas de texto completas para conjuntos de dados podem agora ser feitas com o motor de pesquisa Lucene (embora recomendamos o motor de busca original se você tiver menos de 10.000 conjuntos de dados) ou o sistema de pesquisa original.
         **Adicione isso ao seu arquivo setup.xml** depois.&lt;/displayDiagnosticInfo&gt;:
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

    * Em setup.xml, você pode / deve agora adicionar duas novas categorias à lista separada por vírgulas&lt;categoryAttributes&gt;
        * global: palavras-chave (adicioná-lo logo após global:instituição) -- um novo caso especial que analisa uma lista separada por vírgula de palavras-chave a partir das palavras-chave globais atributo para fazer uma entrada separada para cada palavra-chave.
        * variável Nome (adicionar no final) - um novo caso especial que categoriza cada um dosdataVariable destinationNameS.
    * Em setup.xml, você pode (Mas porquê?) DizERDDAP™não oferecer metadados FGDC e/ou ISO 19115 para qualquer conjunto de dados, incluindo
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Os valores padrão para essas configurações são verdadeiros.
    * Emdatasets.xml, por favor, considere melhorar os metadados para seus conjuntos de dados.ERDDAP™agora gera automaticamente arquivos de metadados ISO 19115 e FGDC XML para cada conjunto de dados com base nos metadados do conjunto de dados.
Então... **bons metadados de dataset leva a bomERDDAP-metadados ISO 19115 e FGDC.**   
         **Veja a nova documentação para os muitos novos RECOMENDADO[Atributos globais](/docs/server-admin/datasets#global-attributes).** 
    * Emdatasets.xml, se você quiser contarERDDAP™usar um arquivo FGDC e/ou ISO 19115 pré-feito que está em algum lugar no sistema de arquivos do servidor em vez de terERDDAP™gerar esses arquivos, usar:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Se _fullFileName_\\=" ou o arquivo não for encontrado, o conjunto de dados não terá metadados FGDC e/ou ISO 19115. Então isso também é útil se você quiser suprimir os metadados FGDC e/ou ISO 19115 para um conjunto de dados específico.
    * Emdatasets.xml, para todosEDDGridSideBySide eEDDGridConjuntos de dados AggregateExistingDimension, certifique-se de que os conjuntos de dados infantis têm diferentesdatasetIDs do que seus conjuntos de dados pai e do que as outras crianças. (Por exemplo, você poderia seguir o sistema simples, mas eficaz de George Foreman para nomear seus filhos.) Se algum nome em uma família for exatamente o mesmo, o conjunto de dados falhará em carregar (com a mensagem de erro que os valores do eixo agregado não estão em ordem ordenada) .
    * Emdatasets.xml, houve algumas mudanças na lista de válidosioos\\_categoryvalores de metadados:
        * "pCO2" foi alterado para "CO2".
        * "O Oceanografia Física" foi adicionado.
        * "Solos" foi adicionado.
    * Emdatasets.xml,ERDDAP™não permite mais '.' em umdatasetID. Foi permitido mas desencorajado. (Desculpa.) 
    * Emdatasets.xml, a configuração para EDDTableDeThreddsFiles e EDDTableDeHyraxOs arquivos mudaram ligeiramente porque ambas as classes foram reescritas para serem mais eficientes (ambas as classes agora sempre fazem uma cópia local de todos os arquivos de dados remotos) . Veja a documentação para configurar essas classes:[Tabela de EDDHyraxArquivos](/docs/server-admin/datasets#eddtablefromhyraxfiles)e[EDDTable FromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Em particular, ver os comentários revistos sobre&lt;fileDir&gt; (agora irrelevante) e&lt;sourceUrl&gt; (agora essencial) . Além disso, você nunca deve envolver esta classe no EDDTableCopy para eficiência.
    * Emdatasets.xml, se você usar EDDTableFromDatabase com umOraclebanco de dados, você deve incluir uma conexão Propriedade como
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
para especificar quantas linhas de dados para buscar ao mesmo tempo porque o padrão é 10, o que é horrivelmente ineficiente. Ver[Oracledocumentação](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql e PostgreSQL parecem ter melhores padrões para esta configuração. Graças ao Kevin O'Brien.
    * Se você usar EDDTableFromDatabase, consulte a melhor[Documentação "Speed"](/docs/server-admin/datasets#eddtablefromdatabase)para sugestões adicionais para melhorar o desempenho. Graças ao Kevin O'Brien.
    * Emdatasets.xml, para todos os conjuntos de dados EDDTable, nas Convenções eMetadata\\_Conventionsatributos globais, consulte CF-1.6 (não CF-1.0, 1.1, 1.2, 1.3, 1.4 ou 1.5) , uma vez que CF-1.6 é a primeira versão a incluir as alterações relacionadas com a Geometria de Amostragem Discreta.
    * Programadores que estão compilando oERDDAP™código precisa adicionar lib/lucene-core.jar para a lista de arquivos jar em seus caminhos de linha de comando javac e java.
    *   ERDDAP™tem um[novo serviço](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)para converter um nome padrão CF para / de uma palavra-chave ciência GCMD. Você pode achar isso útil ao gerar metadados de palavras-chave globais para os conjuntos de dados em seuERDDAP.
    * A lidar com Bots... Por favor, leia este conselho[evitar bots de rastejar seuERDDAP™de uma maneira estúpida](/docs/server-admin/additional-information#robotstxt).
    * Tradução... O texto sobreERDDAP's páginas web é agora principalmente em mensagens.xml e tão adequado para a tradução para diferentes idiomas (por exemplo, alemão, francês) . As mensagens agora muitas vezes usam o MessageFormat para a formatação, também para ajudar a fazer traduções. Se você está interessado em fazer uma tradução, por favor e-mailerd dot data at noaa dot gov.
    * Amostradatasets.xml- ... Houve vários erros pequenos, mas significativos na amostradatasets.xml. Se você usar esses conjuntos de dados, obtenha as versões mais recentes da nova amostradatasets.xmlno novo erddapContent.zipficheiro. Graças ao James Wilkinson.
    * Git... Vou tentar fazer duroERDDAP™um projeto GitHub ASAP após este lançamento.
*    **Pequenas alterações/Bug Corrige:** 
    * Uma nova paleta, OceanDepth, é útil para valores de profundidade (positivo é para baixo) , por exemplo, 0 (superficial) para 8000 (profunda) .
    * O.kmlsaída detabledapusa um ícone de marcador melhor (não está confuso) . E pairar sobre um marcador agora torna maior.
    * EDDTable FromFiles -- Na última atualização, a nova biblioteca netcdf-java tinha restrições mais apertadas para nomes variáveis em.ncarquivos. Isso causou problemas para EDDTableFromFiles se uma variávelsourceNametinha certos caracteres de pontuação. EDDTableFromFiles agora é modificado para evitar esse problema. Graças a Thomas Holcomb.
    * A página .subset agora suporta 0/100/1000/10000/100000 em vez de uma caixa de seleção para dados relacionados. A dica da ferramenta alerta que 100000 pode fazer com que o seu navegador despenhe. Graças a Annette DesRochers, Richard (Abe) Coughlin e o Projeto Biológico IOOS.
    * .../erddap/info/_datasetID_/index.html páginas da web agora mostram URLs e endereços de e-mail como links clicáveis. Graças a Richard (Abe) Coughlin e o Projeto Biológico IOOS.
    * Correção de Bug: Emtabledap, para conjuntos de dados com altitude Medidores por atacado&lt;0, consultas com restrições de altitude foram tratadas incorretamente. Graças ao Kyle Wilcox.
    * Correção de bugs:EDDGridO AggregateFromExistingDimension agora suporta URLs TDS mais diversas. Graças a ?

## Versão 1.36{#version-136} 
 (lançado 2011-08-01) 

*    **Novos recursos:** 
    * Não há mudanças significativas no ponto de vista de um usuário.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * O conjunto de dados pmelTao que foi frequentemente usado como conjunto de dados de amostra para otabledap  
documentação não está mais disponível.ERDDAP™Os administradores devem fazer essas mudanças:
        * Em seudatasets.xml, se você tem umdatasetID= "pmelTao" conjunto de dados, adicionar
active="false" mesmo antes do "&gt;" no final dessa linha.
        * Em seu setup.xml, se seu&lt;EDDTableIdExample&gt; é pmelTao, então:
            * Se vocêdatasets.xmlnão tem um conjunto de dados comdatasetID="erdGlobecBottle", adicionar
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Em seu setup.xml, substitua todas as tags&lt;EDDTableIdExample&gt; através de
                &lt;Tabela de EDDMatlabPlotExample&gt; com
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
                
    * Para conjuntos de dados onde o tipo é uma subclasse de EDDTableFromFiles, você agora pode fazer dados de metadados.
Especificamente, você agora pode fazer uma variável dos valores de um atributo de uma das variáveis originais.
Por exemplo, emdatasets.xml, dentro de um&lt;dataVariable&gt; tag, se você usar
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™fará uma variável com os valores do atributo PI da variável cruzeiro.
Graças ao WOD.
*    **Mudanças:** 
    * Pequenas mudanças

## Versão 1.34{#version-134} 
 (lançado 2011-06-15) 

*    **Mudanças:** 
    * Correção de bugs: Corrigido um vazamento de memória que ocorreu em alguns 64 bitsJavainstalações.
    * Correção de bugs:ERDDAP™agora define corretamente esses atributos globais quando os valores da dimensão de latitude variam de alto para baixo: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Note queactual\\_rangeé inalterado: pode ter valores baixos, altos ou altos, baixos, uma vez que pretende indicar o intervalo e a ordem de armazenamento.
        
    * Pequenas mudanças.
    *   ERDDAP™administradores não precisam fazer alterações em seu setup.xml oudatasets.xml.

## Versão 1.32{#version-132} 
 (lançado 2011-05-20) 

*    **Mudanças:** 
    * Suporte para as novas geometrias de amostragem discreta CF (que infelizmente ainda não está disponível online) , que substitui as Convenções de Observação de Pontos CF propostas.
        ERDDAP™os usuários verão que cdm\\_feature\\_type=Station é substituído pelo TimeSeries e há pequenas mudanças nos arquivos criados para o.ncTipo de arquivo CF (flat\\_dimensional é agora chamado amostra\\_dimensão) .
        ERDDAP™administradores precisarão fazer essas mudanças emdatasets.xml:
        * cdm\\_data\\_type=Station deve ser alterado para cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile deve ser alterado para cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables deve ser alterado para cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id deve ser alterado para cf\\_role=timeseries\\_id.
    * Novoioos\\_categoryopções: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Solução possível para um possível vazamento de memória em 64 bitsJava.\\[Não resultou.\\]
    * Pequenas mudanças.

## Versão 1.30{#version-130} 
 (lançado em 2011-04-29) 

*    **Novos recursos:** 
    * Suporte para 64 bitsJava. Quando usado com 64 bitsJava,ERDDAP™agora pode usar muito mais memória heap e lidar com muitos pedidos mais simultâneos.
    * Suporte para.ncsolicitações de arquivo até 2GB (mesmo sem 64 bitsJava) via melhor uso deERDDAPO tratamento de dados em pedaços.
    * Muitas melhorias de velocidade 2X no código e velocidade 2X ups deJava1.6 fazerERDDAP™2X a 4X mais rápido do que antes.
    * Melhorias de economia de memória significativamente menoresERDDAPO uso da memória base.
    * Para conjuntos de dados tabulares,ERDDAP™está agora plenamente ciente de cdm\\_data\\_type de um conjunto de dados, e como os mapas de dados para o tipo CDM. Ver[CF Especificação de geometrias de amostragem discreta](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Talvez um dia em breve, esse arquivo do Word será convertido para .html e substituirá as informações atuais "OBSOLETE" naquela página da web. Graças aoNOAAProjeto UAF.
    * Para a maioria dos conjuntos de dados EDDTable, uma nova opção de tipo de arquivo de saída,.ncCF, cria Array Ragged Contiguous.ncarquivos que estão em conformidade com a versão mais recente do[CF Convenções de Geometria de Amostragem Discreta](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Esses arquivos são estruturados para refletir o tipo de dados CDM do conjunto de dados. Uma vez que as convenções propostas acabaram de mudar, a partir desta escrita, a biblioteca netcdf-java ainda não suporta ler os formatos de arquivo criados porERDDAPe interpretá-los como arquivos de dados CDM. Provavelmente em breve. Graças aoNOAAProjeto UAF.
    * A opção View : Distinct Data na página web .subset é agora uma lista suspensa que permite aos usuários especificar o número máximo de linhas de dados distintos a serem visualizados (padrão = 1000) . Esta mudança, e outros, permitirERDDAP™trabalhar com conjuntos de dados que têm um grande número de linhas de dados distintos. (O número de valores únicos para qualquer variável é ainda um problema, mas pode ser bastante alto (20.000?) antes do .subset e outras páginas da web carregam muito lentamente.) Graças aoNOAAProjeto UAF.
    * .subset páginas web têm uma nova opção: Veja Contagem de Dados Distintos. Graças ao projeto GTOPP.
    * Para ajudar os usuários, os valores distintos (por exemplo, nomes de estações) são agora mostrados nos formulários Make-A-Graph e Data Access. Graças aoNOAAProjeto UAF.
    * .transparente Os pedidos de Png agora suportam todos os tipos de gráficos e representações de dados. Ele desenha apenas os dados -- nenhum eixo, lendas, máscara de terra, ou qualquer outra coisa. Isso torna possível fazer imagens como camadas de transparentePngs. Se &.size=_width_|_height_ é especificado na consulta (recomendado) É honrado. O padrão é 360x360 pixels. A única excepção éEDDGrid&.draw=surface, onde o padrão (como antes) é uma imagem com ~1/pixel por ponto de dados (até 3000 x e y pixels) . Graças ao Fred Hochstaedter.
    * OWMSpáginas da web agora mostrar a barra de cores para a variável do conjunto de dados (S) . Graças a Emilio Mayorga e outros.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * Esta versão envolve muitas mudanças. São todos importantes. Por favor, seja paciente e trabalhe por todas as mudanças listadas abaixo.
    * Esta versão está sendo empurrada para fora antes do que pretende lidar com algunsJavabugs de segurança. Infelizmente, vários recursos/fixos destinados a issoERDDAP™versão não estão nesta versão. Desculpa. Esperemos que a próxima versão seja relativamente em breve (e muito mais fácil de atualizar para) .
    * Para evitar vários bugs de segurançaJava6 atualização 23 e abaixo, baixar e instalar a versão mais recente doJava  (Java6 atualização 24 ou superior) . Se você tem um sistema operacional de 64 bits, obtenha uma versão de 64 bits deJava.
    * Se você estiver usando Tomcat 5, você deve atualizar para Tomcat 6 ou 7 (preferido) . Se você estiver usando Tomcat 6, considere atualizar para Tomcat versão 7.
    * Por favor siga todas as instruções para[criar um novoERDDAP™](/docs/server-admin/deploy-install), mas onde relevante, você estará copiando arquivos de sua antiga instalação para a nova instalação, notavelmente o\\[Toca a brincar.\\]/content/erddap diretório e arquivos. Como parte disso, note o[novas recomendações de configuração Tomcat](/docs/server-admin/deploy-install#tomcat).
    * O erddap.css padrão agora está incluído no arquivo erddap.war.
        * Para usar o erddap.css padrão, **excluir** seu velho\\[Toca a brincar.\\]/content/erddap/images/erddap.css .
        * Se você for modificado\\[Toca a brincar.\\]/content/erddap/images/erddap.css, e quer continuar a usá-lo: basta deixá-lo no lugar e substituir o&lt;entrada&gt; seção com:
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

    * Em seu\\[Toca a brincar.\\]/content/erddap/setup.xml:
        * Substituir os comentários e tags relacionados&lt;parcialRequestMaxBytes&gt; e&lt;parcialRequestMaxCells&gt; com
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
        * Substituir os comentários relacionados&lt;categoryAttributes&gt; e considerar modificar o valor da tag:
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

Individuais&lt;categoryAttributes&gt; que são atributos globais agora DEVE ser identificado através do prefixo global: (por exemplo, global:instituição) . Outros atributos são assumidos como atributos variáveis (por exemplo,standard\\_name) . Além disso, valores da instituição (os únicos) foram deixados no caso original. Agora todos os valores da categoria são convertidos em minúsculas.
    * Em seu\\[Toca a brincar.\\]/conteúdo/erddap/datasets.xml:
        * MELHORADO:ERDDAP™tem novos requisitos relacionados a um conjunto de dados tabular cdm\\_data\\_type. Notavelmente, cada conjunto de dados DEVE ter os metadados corretos e variáveis relacionadas ao cdm\\_data\\_type. Se não, o conjunto de dados não carregará e lançará um erro. Veja a documentação para[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Há um novo tipo de conjunto de dados: EDDTableFromAsciiServiceNOS.
        * FYI: Há três novos permitidosioos\\_categoryopções: Hidrologia, Qualidade (por exemplo, para bandeiras de qualidade) , e Estatística (por exemplo, significa) .
        * Para EDDTable From... Conjuntos de dados de arquivos, remover qualquer&lt;nDimensions&gt; tags. Eles não são mais necessários ou usados.
        * Para variáveis comdestinationName= altitude,ERDDAP™não mais força olong\\_namepara ser Altitude. Por favor, vá através do seudatasets.xmle repetidamente procurar&lt;destinationName&gt; altitude e adicionar a essa variável&lt;addAttributes&gt;
```
              <att name="long\\_name">Altitude</att>  
```
             (ou um pouco diferentelong\\_nameem casos especiais) .
        * Opcional: Todas as subclasses EDDTableFromFiles suportam variável[sourceName...](/docs/server-admin/datasets#global-sourcenames)converter metadados globais de cada arquivo em uma variável de dados. Graças a Lynn DeWitt.
    * EDDTableFromDatabase users --ERDDAP™vem com um novo driver JDBC 4 para Postgres. Para outros bancos de dados, verifique a web para o arquivo JDBC .jar mais recente para o seu banco de dados. Desde entãoERDDAP™agora usaJava1.6+, JDBC 4 (3) é provavelmente recomendado.
    * FYI
        *   EDDGridA partir de...Files e EDDTable De... Arquivos datasets agora armazenar o arquivoTable informações em
            \\[Diretriz de grande porte\\]/set de dados Info/\\[datasetID\\]- Sim..ncarquivos.
Além disso, os conjuntos de dados da EDDTable armazenam agora as informações do subconjunto em
            \\[Diretriz de grande porte\\]/set de dados Info/\\[datasetID\\]- Sim..ncarquivos. Esses arquivos costumavam ser
            \\[Diretriz de grande porte\\]/set de dados Info/\\[datasetID\\]..jsonarquivos.
Os arquivos antigos serão excluídos automaticamente quandoERDDAP™Começa. Ou, você pode excluir todos os arquivos (mas deixe os subdiretórios vazios) em\\[Diretriz de grande porte\\]/datasetInfo/.
        * Eu trabalhei em um novo EDDTableFromNcCFFiles que leria dados de arquivos locais e remotos usando as Convenções de Observação de Pontos CF propostas. Mas não está nesta versão. Existem problemas nas bibliotecas netcdf-java relacionadas a alguns métodos para ler esses arquivos. E houve algumas mudanças muito recentes nas Convenções de Observação de Pontos CF propostas. Quando a biblioteca netcdf-java for corrigida e atualizada para a última proposta, vou retomar o trabalho sobre isso.
        * CorrerERDDAP™no Windows pode ter problemas: notavelmente, você pode ver no\\[bigParentDirectory/logs/log.txt arquivo queERDDAP™às vezes é incapaz de excluir e / ou renomear arquivos rapidamente. Isto é devido ao software antivírus (por exemplo, da McAfee e Norton) que está verificando os arquivos para vírus. Se você correr para este problema (que pode ser visto por mensagens de erro no arquivo log.txt como "Unable to delete ...") , alterar as configurações do software antivírus pode aliviar parcialmente o problema.
Se oERDDAP™no Windows é apenas um teste em execução em seu desktop, este é apenas um aborrecimento.
Se oERDDAP™no Windows é seu públicoERDDAP™, considere mudar para um servidor Linux.
    * Slow First Startup -- A primeira vez que corresERDDAP™após a atualização,ERDDAP™pode ser lento para carregar os conjuntos de dados. O caminhoERDDAP™armazena informações sobre arquivos agregados mudou, entãoERDDAP™terá de reler algumas informações de todos esses arquivos. Isso vai levar tempo.
    * Erros no Startup -- Dadas as mudanças relacionadas ao cdm\\_data\\_type, é provável que alguns dos seus conjuntos de dados não sejam carregados e joguem erros. Leia cuidadosamente o e-mail Daily Report queERDDAP™te envia quandoERDDAP™está acabado de começar. Terá uma lista de conjuntos de dados que não carregaram (no topo) e a razão pela qual não carregaram (perto do fundo) .
    * Se você ficar preso ou tiver outras perguntas, envie-me os detalhes:erd.data at noaa.gov.
    * Programadores - ... Se escreveresJavaprogramas que executamERDDAP™código, você precisa alterar algumas das referências do parâmetro de linha de comando:
        * Mude joda-time-1.6.2.jar para joda-time. jarra
        * Alterar a referência Postgres JDBC .jar para postgresql.jdbc.jar
*    **Pequenas alterações e correções de bugs:** 
    
    * Manuseio de conexão melhorado para evitar fios pendurados.
    * Práticas de confiança melhoradas para lidar com solicitações idênticas quase simultâneas de forma mais eficiente.
    *   ERDDAP™agora usa netcdfAll-4.2.jar (renomeado para netcdfAll-latest. jarra) . Este interruptor exigiu várias mudanças internas e causou algumas pequenas mudanças externas, por exemplo, mudanças em como os arquivos grib são lidos e pequenas mudanças no.ncSaída de cabeçalho.
    * Novo recurso:\\[E agora?\\]/conversão/fipscounty.html converteFIPScódigos de condado para / de nomes de condado.
    * Nos mapas, os limites do estado agora são violeta escura, então eles se destacam melhor em todas as cores de fundo.
    * Tabular.kmlsaída novamente usa um ícone circular para marcar pontos (não o ícone do avião O Google mudou recentemente para) .
    * Os conjuntos de dados erdCalcofi foram rearranjados e agora são servidos a partir de arquivos locais (mais rápido) .
    * Gerar conjuntos de dados Xml de Ameaças O catálogo agora cria um arquivo de resultados:
        \\[Toca a brincar.\\]/webapps/erddap/WEB-INF/temp/EDDGridFromThreddsCatalog.xml . Graças ao Kevin O'Brien.
    * Gerar conjuntos de dados Xml de Ameaças O catálogo agora tenta remover números de porta desnecessários das URLs de origem (por exemplo, :8080 e :8081 às vezes podem ser removidos) . Graças aNOAAA equipa de segurança do centro.
    * Para páginas web .subset, o Mapa de Dados Distintos agora tem um intervalo de lat lon variável.
    * Várias listasERDDAP™  (por exemplo, a tabela que mostra todos os conjuntos de dados) foram ordenados para que A..Z classificado antes de um..z. Agora eles classificam de forma insensível.
    * Pequenas mudanças nas páginas web .subset, incluindo: unidades agora são indicadas.
    * Gerar conjuntos de dados Xml e DasDds não mais jogar uma exceção se não puder colocar os resultados na área de transferência do sistema ou exibiçãoInBrowser. Graças ao Eric Bridger e ao Greg Williams.
    * Correção de bugs: Quando os conjuntos de dados são carregados,ERDDAP™agora remove ou ajusta os atributos globais geoespaciais. Graças ao Charles Carleton.
    * Correção do erro: String2.getClassPath () agora corretamente percent-decodifica a classe Caminho (notavelmente, no Windows, espaços no nome do arquivo apareceu como %20) . Isto afectaERDDAP™EDStatic chamando SSR.getContextDirectory () e encontrar conteúdo/erddap. Graças a Abe Coughlin.
    * Correção de Bug: em EDDTableFromFiles relacionados ao tratamento getDataForDapQuery de distinto () pedidos. Graças ao Eric Bridger.
    * Correção de bugs:tabledapsolicitações não lidavam corretamente com restrições de altitude quando a altitude do conjunto de dados MetrosPerSourceUnit foi -1. Graças ao Eric Bridger.
    * Correção de bug: EDDTableFrom... Arquivos conjuntos de dados agora lidar corretamente solicitações que incluem = NaN e &#33;=NaN.
    
## Versão 1.28{#version-128} 
 (lançado 2010-08-27) 

*    **Novos recursos:** Nenhum.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** Nenhum.
*    **Correção de Bug:** Corrigir um erro de programação (apenas em ver 1.26) que fezERDDAP™Muito lento.
     

## Versão 1.26{#version-126} 
 (lançado 2010-08-25) 

*    **Novos recursos:** Nenhum.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** 
    * De ti\\[Toca a brincar.\\]/content/erddap/setup.xml,
        * Em&lt;legal&gt;, em uma nova linha abaixo\\[padrão Dados técnicos\\], inserir\\[padrãoContato\\].\\[padrãoContato\\]refere-se ao&lt;adminEmail&gt; especificado mais alto em setup.xml.
        * Remover&lt;tabelaCommonBGColor&gt; e&lt;tableHighlightBGColor&gt;.
        * Recomendado: Variação&lt;endBodyHtml&gt; para
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

    * Requisito: Para o seu\\[Toca a brincar.\\]/content/erddap/images/erddap.css e erddapAlt.css, adicione na parte inferior:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Correções de bugs e pequenas mudanças:** 
    
    * Correção de bugs: em algumas situações, formulários não funcionaram em algumas versões do Internet Explorer. Muito obrigado ao Greg Williams.
    * Correção de bugs: Os botões Make A Graph não funcionaram se o conjunto de dados fosse de um remotoERDDAP.
    * Correção de bugs:WMSàs vezes não funcionou se o conjunto de dados era de um remotoERDDAP.
    * Muitas pequenas mudanças e correções de bugs.
    

## Versão 1.24{#version-124} 
 (lançado 2010-08-06) 

*    **Novos recursos:** 
    * Novo[Páginas web subdefinidas](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)use busca facetada para selecionar subconjuntos de conjuntos de dados tabulares. Graças a POST.
    * Novo[Pesquisa avançada](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)combina todas as outras opções de pesquisa e adiciona longitude, latitude e caixas de limite de tempo. Graças a Ellyn Montgomery. (Desculpa o atraso.) 
    * Novo[Converter Tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)página da web e serviço permitem que você converta tempos numéricos para / de tempos de cadeia ISO.
    * Novo[Converter unidades](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)página web e serviço permitem que você convertaUDUNITSpara / de unidades UCUM. Graças aNOAAIOOSSOS.
    * Se umtabledappedido inclui &units ("UCUM") , os nomes das unidades serão convertidos de nomes originais (geralmenteUDUNITS) para[UCUM](https://unitsofmeasure.org/ucum.html)nomes de unidades. Isso afeta apenas unidades\\*nomes\\*, não valores de dados. Graças aNOAAIOOSSOS.
    * Melhorias para fazer um gráfico páginas web e gráficos e mapas:
        * Se o gráfico é um mapa, há novos botões Make A Graph para ampliar e uma nova opção para clicar para alterar o ponto central do mapa. Graças a POST.
        * Configurações de filtro adicionadas perto da parte inferior. Graças ao Greg Williams.
        * Os arquivos de dados construídos em linha costeira foram atualizados para GSHHS v2.0. Graças a POST.
        * Mapas agora incluem lagos e rios. Graças a POST. (Desculpe, o Delta do Rio Sacramento está faltando porque nem os dados da costa nem o conjunto de dados do lago / rio lida com isso.) 
        * Os arquivos de nação/estado derivados do pscoast foram atualizados. Graças a POST.
        * Topography.cpt foi modificado ligeiramente. (Desculpa se isto te afecta mal.) Graças a POST.
        * No gráfico Make A do griddap, se um usuário altera uma variável, o formulário é automaticamente resubmetido para que oaxisVariables' showStartAndStop sempre reflete as variáveis do gráfico. Graças ao Joaquin Trinanes.
        * Para URLs de imagem png e pdf:
            * New &.land=_value_, onde _value_ pode ser "under" (mostrar topografia) ou "over" (apenas mostrar a higiene) . Se não especificado, o padrão é definido por[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)emdatasets.xmlou setup.xml. Graças a POST.
            * Novo: as linhas na lenda que são muito longas são automaticamente quebradas em várias linhas. Graças a POST.
        * Para URLs de imagem png:
            * New &.legend=_value_, onde _value_ pode ser "Bottom" (padrão) "Off" ou "Only". Isso permite incluir a lenda, excluir a lenda, ou obter apenas a lenda. Graças à Cara Wilson.
            * Novo &amp; período; Pixels_ deixa uma borda de nPixels (por exemplo, 10) na parte inferior da imagem. É aplicado após .legend=Off. Graças à Cara Wilson.
            * Novo &amp; tamanho=_width_|_height_ permite especificar a largura e a altura da imagem, em pixels.
    * Novos formatos de arquivo de saída:
        * .csvp e.tsvp -- como .csv e.tsv, mas com " (_unidades_) " anexado aos nomes das colunas na primeira linha.
        * .odvTxt -- faz um arquivo .txt que simplifica a obtenção de dados em[Dados do Oceano Visualização (ODV) ](https://odv.awi.de/).
        * .esriCsv -- faz um arquivo .csv adequado para importação em ESRI'sArcGIS. (somente conjuntos de dados tabulares) Graças a Jan Mason, Jeff de La Beaujardiere, eNOAAIOOSSOSprojeto.
    * Melhorias de interface gráfica[Categorização](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)páginas da web. Além disso, os valores de categorização (outros que não sejam instituições) são agora todos minúsculos. Os pedidos não minúsculos são aceitos (redirecionado) para compatibilidade retroativa. Graças ao Roy Mendelssohn.
    * As mensagens de erro são agora ainda mais curtas e mais orientadas para os usuários. Graças ao Greg Williams.
    * Uma mudança interna que reduz muitoERDDAPO uso da memória base.
    * Muitos novos recursos que são apenas relevantes para o projeto POST.
*    **CoisasERDDAP™Os administradores precisam saber e fazer:** Há muitas mudanças. Desculpa. Mas cada um traz bons benefícios.
    * Grandes mudanças no GerarDatasetXml -- ele agora muitas vezes faz mais perguntas (ver os relevantes[conjunto de dados Tipos](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)informação) e agora sempre gera conteúdo essencialmente pronto para usardatasets.xml. Você ainda é responsável pela configuração, então você ainda deve rever odatasets.xmlconteúdo antes de usá-lo. Um esforço humano no projeto sempre fará melhor do que um programa de computador. Graças ao projeto UAF.
    * REQUIREDO: Em setup.xml, você deve revisar oWMSSecção. Deve agora incluir essas tags (mas sinta-se livre para mudar os valores) :
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

    * REQUIREDO: Em setup.xml, copie e cole este novo sugerido&lt;startHeadHtml&gt; para substituir sua versão antiga. Mas sinta-se livre para fazer mudanças para suas preferências.
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

Graças ao POST, Hans Vedo e Rick Blair.
    * REQUIREDO: Em setup.xml, em&lt;startBodyHtml&gt;, mudar o&lt;body&gt; tag para ser apenas&lt;body&gt;, uma vez que o estilo agora é definido por erddap.css.
    * REQUIREDO: Em setup.xml, mude para isso&lt;endBodyHtml&gt; (mas mude o endereço de e-mail para o seu endereço de e-mail e sinta-se livre para fazer outras alterações) :
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

    * RESCOMENDADO: Em setup.xml, o recomendado&lt;theShortDescriptionHtml&gt; está agora
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

Sinta-se livre para mudar isso, particularmente a última frase no primeiro parágrafo.
    * Em setup.xml, emailEverythingTo e e-mailDailyReport Pode agora ser listas separadas por vírgula de endereços de e-mail. O primeiro e-mail Tudo Para é especial, por exemplo, assinaturas de conjuntos de dados EDDXxxxFromErddap usam esse endereço de e-mail. Graças a John Maurer.
    * Os erros de e-mail estão agora registrados no\\[Diretriz de grande porte\\]/logs/emailLogYYYYYY-MM-DD.txt arquivo.
    * No setup.xml, há um novo parâmetro opcional para definir propriedades da conta de e-mail (geralmente logo após&lt;emailPassword&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

O padrão não é nada. Graças ao Rich Signell.
    * REQUIREDO: Se você usar EDDTableCopy ouEDDGridEntendido, deves esquecer tudo.\\[Diretriz de grande porte\\]/copy / diretórios e arquivos que contêm "xh" no diretório ou nomes de arquivo após parar o velhoERDDAP™e antes de iniciar o novoERDDAP™para que esses arquivos serão re-copied. Lamento muito, mas foi importante fazer a mudança e espero que afete alguns administradores e alguns arquivos.
No Linux, você pode encontrar esses arquivos com, cd\\[Diretriz de grande porte\\]/cópia
encontrar .\\*Xh\\*  
No Windows, você pode encontrar esses arquivos com, Iniciar|Pesquisar
O que você quer procurar: Documentos
Tudo ou parte do nome do arquivo: xh
Pesquisar -&gt;\\[Diretriz de grande porte\\]/cópia
Clique em "Search"
↑A para selecionar todos
Del para excluí-los todos
    * REQUISITO: Emdatasets.xml, para EDDTableFromDatabase datasets, para variáveis data e timestamp, alterar os dados Digite para dobrar e as unidades para segundos desde 1970-01T00:00Z. Nós REQUIRE que você armazena dados do timestamp no banco de dados\\*com\\*um fuso horário. Sem informações de fuso horário, as consultas queERDDAP™envia para o banco de dados e os resultados queERDDAP™recebe do banco de dados via JDBC são ambíguos e provavelmente estão errados. Nós tentamos, mas não encontramos nenhuma maneira confiável de lidar com dados de "timestamp sem fuso horário". Pensamos que isto é uma boa prática. Afinal, os dados "timestamp sem fuso horário" tem um fuso horário implícito. Embora seja ótimo que o fuso horário seja óbvio para o administrador do banco de dados, faz sentido especificá-lo explicitamente para que outro software possa interagir corretamente com seu banco de dados. Obrigado/desculpe Michael Urzen.
    * Muito RECOMENDADO: Emdatasets.xml, para habilitar .subset páginas web para pesquisa facetada de seus conjuntos de dados tabulares, você precisa adicionar [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) para os atributos globais do conjunto de dados.
    * RECOMENDADO: Emdatasets.xml, se você tem o conjunto de dados comdatasetID="pmelGtsppp", por favor altere-o para ser
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMENDADO: Emdatasets.xml, há novas opções válidas para o [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) atributo global, então você deve rever / alterar o valor para seus conjuntos de dados.
    * Emdatasets.xmlO novo [&lt;sourceNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) é útil se o servidor fonte não lidar consistentemente com os testes &_variable_\\=_value_ corretamente (por causa do[dificuldade geral de testar a igualdade de números de pontos flutuantes](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . fonteNeedsExpandedFP\\_EQ é definido como true por padrão (a configuração mais segura) , então você não precisa fazer nenhuma mudança.
    * Novo[EDDTable FromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Graças ao Jerry Yun Pan.
    * Novo[EDDTable FromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Graças ao Roy Mendelssohn.
    * Mudanças para[EDDTable De NcFiles](/docs/server-admin/datasets#eddtablefromncfiles)permite que ele seja usado com uma ampla gama de arquivos.
    * O EDDTableFromBMDE foi desativado. Não há mais nenhuma fonte de dados ativa, apropriada.
    * Em GerarDatasetXml, o novoEDDGridDe Thredds Catálogo colhe todo um catálogo THREDDS (ou um subconjunto) e geradatasets.xmlconteúdo. Graças ao projeto UAF.
    * Gerar conjuntos de dados Xml e DasDds agora também colocar seus resultados em\\[Diretriz de grande porte\\]/logs/log.txt. Graças a Rich Signell e Charles Carleton.
    * Muitas melhorias no sistema de login. Graças a POST.
*    **CoisasERDDAP™Programadores Precisa de saber e fazer:** 
    * Houve mudanças no diretório /WEB-INF/lib/. Por favor, altere suas configurações de classpath javac e java de acordo.
    * Há um novo\\[Tu és Url.\\]/erddap / serviço de versão para determinar a versão de umERDDAP. A resposta é texto, por exemplo,ERDDAP\\_versão=1.24 Se você receber uma mensagem de erro HTTP 404 Not-Found, trate aERDDAP™como versão 1.22 ou inferior. Graças a POST.
*    **Pequenas alterações e correções de bugs:** 
    
    * Tabela de EDD Sos changes:
        * Suporte dropped para leitura IOOSSOSRespostas XML.
        * Adicionado suporte para leitura IOOSSOStexto/csv. (Então, nãoSOSservidores atualmente não são suportados.) 
        * Fez muitas mudanças relacionadas ao IOOSSOSdetalhes do servidor.
        * Adicionado suporte para consultas BBOX para IOOSSOSeOOSTethys SOSservidores. Essas mudanças resultam em uma grande velocidade para solicitações de dados relevantes. Graças a IOOSSOS.
    * Texto em.matarquivos de dados tabular agora é salvo corretamente. Graças ao Roy Mendelssohn.
    *   WMS
        *   OpenLayersestá agora empacotado comERDDAP™para uso noWMSpáginas da web. Isso corrige o problema causado quandoOpenLayersmudou há alguns meses e previne futuros problemas.
        * NoWMS GetCapabilitiesresposta, o&lt;OnlineResource&gt; valor é agora a URL doWMSserviço. Graças a Charlton Galvarino.
        * Uma lenda é exibida noWMSpágina da web para mostrar a barra de cores. Graças a Emilio Mayorga.
    *   EDDGridAggregateExistingDimension construtor tinha problemas se uma fonte de eixo Valores não eram iguais aos seus destinos Valores, por exemplo, se o tempo de origem fosse algo diferente"seconds since 1970-01-01". Graças aToddSpindler.
    * Em TableWriterGeoJson, o excesso ',' após bbox\\[...\\]foi removido. Graças ao Greg Williams.
    * Muitas pequenas mudanças e correções de bugs.
    
## Versão 1.22{#version-122} 
 (lançado 2009-07-05) 

* O bug SlideSorter introduzido em 1.20 é corrigido.
* O bug OBIS introduzido em 1.20 é corrigido.
* As referências aos conjuntos de dados de Jason na página de imagens/gadgets/GoogleGadgets foram removidas.
     
## Versão 1.20{#version-120} 
 (lançado 2009-07-02) 

*   ERDDAP™administradores, adicione isso ao arquivo setup.xml:
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

* Novos tipos de conjuntos de dados[EDDGridEntendido.](/docs/server-admin/datasets#eddgridcopy)e[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)fazer e manter uma cópia local de outroEDDGridou dados do conjunto de dados EDDTable e servem dados da cópia local. Estes são muito fáceis de usar e muito eficazes **soluções para alguns dos maiores problemas com a utilização de dados de fontes de dados remotas:** 
    
    * Acessar dados de uma fonte de dados remota pode ser lento (por uma variedade de razões) .
    * O conjunto de dados remoto é por vezes indisponível (novamente, por uma variedade de razões) .
    * Basear-se em uma fonte para os dados não escala bem (por exemplo, quando muitos usuários e muitosERDDAPs utilizá-lo) .
    
Além disso, a cópia local é um backup do original, que é útil no caso de algo acontecer ao original.
    
Não há nada de novo sobre fazer uma cópia local de um conjunto de dados. O que há de novo aqui é que estas aulas fazem\\*Fácil.\\*criar e\\*manter\\*uma cópia local de dados de uma\\*variedade\\*de tipos de fontes de dados remotas e\\*adicionar metadados\\*ao copiar os dados.
    
Estes tipos de conjuntos de dados fazem parte de um conjunto completo de recursos que simplificam a criação de[grades/clusters/federações deERDDAPS](/docs/server-admin/scaling)para lidar com cargas muito pesadas (por exemplo, em um data center) .
    
* Novo tipo de conjunto de dados[EDDTable FromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)recebe dados de uma tabela de banco de dados local ou remoto.
*   ERDDAP™agora tem um[segurança](/docs/server-admin/additional-information#security)sistema que suporta autenticação (deixar os usuários fazer login) e autorização (conceder-lhes acesso a determinados conjuntos de dados privados) .
* Há[duas novas ferramentas de linha de comando](/docs/server-admin/datasets#tools)para ajudarERDDAP™administradores geram o XML para um novo conjunto de dados emdatasets.xml:
    * Gerar conjuntos de dados Xml pode gerar um rascunho áspero do conjunto de dados XML para quase qualquer tipo de conjuntos de dados.
    * DasDds ajuda você a testar repetidamente e refinar o XML para um conjunto de dados.ERDDAP's Gerar conjuntos de dados Páginas da web Xml foram removidas. Por razões de segurança, eles só suportaram alguns tipos de conjuntos de dados. As novas ferramentas de linha de comando são uma solução melhor.
* O novo[Página de status](/docs/server-admin/additional-information#status-page)deixa alguém (mas notavelmente administradores) ver o estado de umERDDAP™de qualquer navegador, indo para\\[BaseUrl\\]/erddap/status.html.
* Tabledap agora suporta[funções do lado do servidor](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * E distintiva () remove linhas duplicadas da tabela de resposta,
    * &gt;orderBy (...) permite especificar como a tabela de resposta deve ser ordenada,
    * &gt;orderByMax (...) permite especificar como a tabela de resposta deve ser ordenada e remove todas as linhas, exceto para as linhas com os valores máximos na última coluna especificada. Isso pode ser usado, por exemplo, para obter os últimos dados disponíveis para cada estação.
* Conjuntos de dados tabulares podem agora incluir variáveis dateTime adicionais que não são nomeadas"time". Essas variáveis são reconhecidas por seus metadados "units", que devem conter" since "  (para data numérica Tempos) ou "sim" ou "sim" (para data de corda formatadaTimes) . Mas por favor ainda usedestinationName "time"para a data principal Variável de tempo.
*   ERDDAP™agora gera um[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)arquivo, que diz aos motores de busca que seuERDDAPSó precisa de ser rastejado todos os meses.ERDDAP™administradores, por favor siga[estas instruções](/docs/server-admin/additional-information#sitemapxml)para notificar os motores de busca sobre o novo arquivo sitemap.xml.
*   ERDDAPAs mensagens de erro são agora muito mais curtas e orientadas para os clientes (não programadores) . Graças ao Greg Williams.
* Não.&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) agora também suporta endereços IP onde o último número foi substituído por \\*.
* Pedidos para.jsone arquivos .geoJson podem agora incluir um opcional[Jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)pedido adicionando "&.jsonp=_functionName_" até o final da consulta. Basicamente, isto apenas dizERDDAP™para adicionar "_functionName_ (" ao início da resposta e ") " até ao fim da resposta. Se originalmente não houvesse consulta, deixe o "&" em sua consulta. Graças ao Greg Williams.
* Muitas novas estatísticas foram adicionadas ao[Relatório diário](/docs/server-admin/additional-information#daily-report).
* Em páginas web com listas de conjuntos de dados, instituição e id estão agora à direita. Isso move a assinatura e outras colunas mais úteis em vista em telas de computador estreitas.
* Em todas as páginas web, o título da página (baseado no&lt;título&gt; no&lt;startHeadHtml&gt; que você define em setup.xml) é modificado para incluir uma descrição melhor da página da web (por exemplo, incluindo o título e a instituição do conjunto de dados atual) .
* As informações do Xmx estão agora incluídas com as informações de memória impressas no log.txt, no Daily Report e no status.html. Graças a Ellyn Montgomery.
*   ERDDAP™tem adicional, proteção geral contra todos os erros (por exemplo, OutOfMemoryError) . Graças ao Charles Carleton.
* Melhorias no manuseio de erros se a resposta já foi comprometida.
* MELHORADO: EDDTableDos eEDDGridFromFiles agora apenas permitir&lt;metadadosDo&gt; primeiro ou último. penúltimo não é mais suportado. E primeiro e último agora são baseados no último Tempo Modificado dos arquivos.
* Correção de bug: em EDDTableFromSOS, informação inválida para uma estação lançou uma exceção e fez com que todo o conjunto de dados fosse rejeitado. Essas estações são ignoradas. (e a mensagem de erro é registrada para log.txt) . Graças ao Rick Blair.
     

## Versão 1.18{#version-118} 
 (lançado 2009-04-08) 

* Correção de Bug: A partir de 1.14, o formulário de acesso de dados EDDTable e fazer um gráfico página web não lidou corretamente com restrições citadas.
* Correção de Bug: A partir de 1.14, EDDTableFromDapSequence não manuseou restrições de tempo corretamente se as unidades de tempo de origem não fossem "segundos desde 1970-01-01T00:00".
     

## Versão 1.16{#version-116} 
 (lançado 2009-03-26) 

*   ERDDAP™administradores:
    * Esta é uma versão importante porque corrige um bug que deixou umERDDAP™thread running se você usou o Tomcat Manager para parar/iniciar ou recarregarERDDAP. Então, quando você instalar 1.16, não basta usar o Tomcat manager para deplorar o velhoERDDAP™e implantar o novoERDDAP. Em vez disso: **undeploy o velhoERDDAP™, reiniciar Tomcat (ou o servidor) , em seguida, implantar o novoERDDAP.** É sempre uma boa ideia fazer isso ao instalar uma nova versão.
    * Por favor adicione [&lt;requestBlacklist&gt;&lt;/requestBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) para o seudatasets.xml. Isso pode ser usado para especificar uma lista de endereços IP do cliente a serem bloqueados (por exemplo, para afastar um ataque de Denial of Service ou um robô web excessivamente zeloso) .
* Há agora um\\[Diretriz de grande porte\\]/logs diretório para segurar oERDDAP™Registar ficheiros. Quando começarERDDAP™, faz uma cópia de arquivo do log.txt e log. txt.previous arquivos com um carimbo de tempo. Se houve problemas antes do reinício, pode ser útil analisar esses arquivos.
*   ERD'ERDDAP™agora tem o sistema de assinatura ligado.
*   ERDDAP™mais uma vez permite (mas ainda não recomenda) a codificação "%26" de "&" em URLs de solicitação (ver o[mudança v1.14 relacionada](#percent26)) .
* Várias novas adições à seção Tally da[Relatório diário](/docs/server-admin/additional-information#daily-report).
* Pequenas correções de bugs em gerarDatasetsXml.
* Algumas pequenas correções de bugs.
     

## Versão 1.14{#version-114} 
 (lançado em 2009-03-17) 

* Alterações para usuários:
    * Em solicitações de dados de grade,ERDDAP™agora suporta:[último...](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)onde n é um número inteiro de índices e[ (último...) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)onde d é um valor numérico (por tempo, é em segundos) .
    * Em solicitações de dados tabulares, restrições de String agora exigem[citações duplas](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)em torno do valor, por exemplo, &id="NDBC40121" Isto é exigido peloDAPProtocolo.
    * Em solicitações de dados tabulares,ERDDAP™agora requer que[todas as restrições ser corretamente por cento codificado](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Navegadores fazem isso automaticamente, então isso afeta principalmente programas/scripts de computador que estão acessandoERDDAP.
#### Percentagem{#percent26} 
*   [Anteriormente...](#percent26)o[incorporar uma página web de gráfico](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)e o[ERDDAP™Página web do Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)disse para substituir o "&" na URL da imagem com "%26". A partir de agora, você deve substituir o "&" na URL da imagem com "&amp;". Então você precisa substituir qualquer "%26" em páginas web existentes e Google Gadgets com " &amp;". (Desculpa.) 
*   ERDDAP™administradores, por favor:
    * Adicionar o seguinte ao seu[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo (e mudar a bandeira Valor de KeyKey) :
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

    * Na linha depois&lt;emailUserName&gt; em seu[setup.xml](/docs/server-admin/deploy-install#setupxml)ficheiro, adicionar
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
e digite sua senha real.
    * Você pode mudar&lt;wmsSampleBBox&gt; em seu[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo para incluir valores de longitude até 360, por exemplo,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Em seudatasets.xmlarquivo, renomeie o tipo de conjunto de dados EDDTableFromNc4DFiles para EDDTableFromNcFiles (que agora suporta arquivos com qualquer número de dimensões) . Se você teve um conjunto de dados EDDTableFromNc4DFiles:
        
        1. Você deve mudar para type="EDDTableFromNcFiles" em seus conjuntos de dados. Arquivo XML.
        2. Você precisa adicionar um&lt;nDimensões&gt; 4&lt;/nDimensions&gt; tag para XML do conjunto de dados.
        3. Você pode adicionar o novo&lt;sortFilesBySourceNames&gt; tag para especificar a ordem interna para os arquivos, que determina a ordem geral dos dados retornados.
        
Para obter detalhes, consulte[Tabela EDD dos arquivos](/docs/server-admin/datasets#eddtablefromfiles).
    * No passado, para EDDTable FromDapSequence, paraOPeNDAPServidores DRDS, emdatasets.xmlUsamos&lt;fonteCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Mas agora vemos que o suporte DRDS regex é mais limitado do queERDDAP's, então nós recomendamos&lt;fonteCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; para que as restrições regex não sejam passadas para a fonte, mas são tratadas peloERDDAP.
    * Tratamento revisado de fonteCanConstrain... emdatasets.xmlpor[EDDTable FromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)e (internamente) todos os tipos de conjuntos de dados EDDTable. O novo sistema é mais simples e melhor reflete a variabilidade de diferentes fontes de dados. Você pode precisar modificar o XML para seus conjuntos de dados emdatasets.xml.
* Existem vários novos recursos que são úteis por si mesmos, mas quando combinados, também facilitam a criação de[grades/clusters/federações deERDDAPS](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Novos tipos de conjuntos de dados:
        *   [EDDGridDe Erddap](/docs/server-admin/datasets#eddfromerddap)e[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)que deixar umERDDAP™incluir um conjunto de dados de outroERDDAP™de uma forma muito simples e muito eficiente.
        *   [EDDGridDos quartos](/docs/server-admin/datasets#eddgridfromfiles)  (e sua subclasse,[EDDGridA partir de NcFiles](/docs/server-admin/datasets#eddgridfromncfiles)que pode lerNetCDF .nc, GRIB .grb, eHDF .hdfarquivos) .
        *   [EDDTable De NcFiles](/docs/server-admin/datasets#eddtablefromncfiles)que pode lerNetCDF .ncque têm uma estrutura semelhante à mesa.
    * RunLoadDatasets e LoadDatasets foram renovados para queERDDAP™é muito responsivo para recarregar conjuntos de dados com base em arquivos nos[bandeira](/docs/server-admin/additional-information#flag)(Inglês)&lt;5 segundos se a carga principalDatasets for feita atualmente).
    * Novo serviço para permitir[uma URL para criar um arquivo de bandeira](/docs/server-admin/additional-information#set-dataset-flag)para um determinado conjunto de dados, por exemplo,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
cria um arquivo de bandeira no diretório de bandeira para rPmelTao (embora a bandeira A chave aqui está errada) .
    * Novo[assinatura](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)serviço para que qualquer cliente possa especificar uma ação que será feita quando um conjunto de dados específico for criado (quandoERDDAP™é reiniciado) e sempre que o conjunto de dados muda de alguma forma. Este sistema pode ser desativado via&lt;SubscriçãoSystemActive&gt; em seu[setup.xml](/docs/server-admin/deploy-install#setupxml)ficheiro. OERDDAP™ [Relatório diário](/docs/server-admin/additional-information#daily-report)agora lista todas as assinaturas e inclui a URL necessária para cancelar cada uma, no caso de você sentir que o sistema está sendo abusado. Emdatasets.xml, há um novo, opcional [&lt;assinatura E-mailBlacklist&gt; (/docs/server-admin/datasets#subscriptionemailblacklist) tag para que os administradores possam especificar uma lista separada por vírgula de endereços de e-mail que são imediatamente listados na lista negra do sistema de assinatura.
    * Novo.&lt;em Mudança&gt; (/docs/admin/datasets#onchange) atribuirdatasets.xmldeixa oERDDAP™administrador especificar uma ação que será feita quando um conjunto de dados específico for criado (quandoERDDAP™é reiniciado) e sempre que o conjunto de dados muda de alguma forma.
    * Melhorias na pesquisa de texto completo: armazenar a cadeia de pesquisa para cada conjunto de dados agora usa 1/2 a memória. O algoritmo de busca (Boyer-Moore-like) é agora 3X mais rápido.
    * E-mails deERDDAP™agora sempre prependi o assunto e o conteúdo com\\[E agora? Url.\\], para que seja claro qualERDDAP™isto veio de (no caso de administrar múltiplosERDDAPS) .
    * Recolhimento de estatísticas mais extensas para o[Relatório diário](/docs/server-admin/additional-information#daily-report)E-mail.
    * Novo arquivo de log\\[Diretriz de grande porte\\]/emailLogYEAR-MM-DD.txt registra todos os emails enviados porERDDAP™Todos os dias. Isso é especialmente útil se o seu servidor não puder enviar e-mails - você pode pelo menos lê-los no log.
    *   ERDDAP™agora faz um\\[Diretriz de grande porte\\]/cache / (datasetID) diretório para cada conjunto de dados desde que pode haver muitos arquivos armazenados em cache.
* Novo[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)feed para cada conjunto de dados (procurar a laranjaRSSícones em listas de conjuntos de dados, formulários de acesso de dados e fazer um gráfico páginas da web) .
*   EDDGrid .kmlrespostas agora usar imagens em azulejo ("superoverlays" -- imagens de quadtree geradas dinamicamente) . A imagem inicial carrega no GoogleEarth muito mais rápido do que antes. A resolução do mapa aumenta à medida que você amplia, até a resolução completa do conjunto de dados. Recomendar: os usuários devem solicitar.kmlpor um ponto de tempo, mas toda a longitude do conjunto de dados, faixa de latitude. Infelizmente, o suporte para intervalos de tempo foi removido (Espero que volte) .
*   ERDDAP™agora adiciona[Expires and Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)para todos os arquivos solicitados no diretório /images. Isso reduz consideravelmente o número de pedidos de arquivos estáticos enviados paraERDDAPe assim acelera muito maisERDDAP™cargas de página. Além disso, muitosJavaAs referências de arquivo de script mudaram para a parte inferior de suas páginas HTML, que também acelera muitosERDDAP™cargas de página. Graças ao livro "High Performance Web Sites" de Steve Souders e a adição ySlow ao plugin FireBug em FireFox.
*   ERDDAP™de netcdf-java 2.2.22 para netcdf-java 4.0. Entre outras coisas, isso permiteEDDGridFromNcFiles to readHDF .hdf, bem como GRIB .grb eNetCDF .ncarquivos.
*   EDDGridDe Dap eEDDGridFromNcFiles agora também apoiar DArray (bem como DGrid)  dataVariableS. Se uma dimensão não tiver uma variável de coordenada correspondente,ERDDAP™cria uma variável de eixo com os valores de índice (por exemplo, 0, 1, 2, ..., 311, 312) . Então todos os outros aspectos deEDDGridpermanecer o mesmo:
* Ele ainda serve todos os conjuntos de dados como Grades, com uma variável de eixo para cada dimensão.
* As consultas ainda podem solicitar valores das variáveis do eixo.
Graças a Charles Carleton, Thomas Im, Dorian Raymer e outros.
* OWMS OpenLayerspáginas agora têm uma longitude padrão, faixa de latitude que é um pouco maior do que o intervalo do conjunto de dados (não o intervalo exato, então o contexto de pequenos conjuntos de dados é mais óbvio) . O intervalo padrão agora também pode ser de 0 a 360, o que permite que a gama completa de muitos conjuntos de dados seja mostrada agora. Graças aToddSpindler.
* Novos controles deslizantes em alguns formulários de acesso de dados e fazer um gráfico páginas web. Eles simplificam. (Crude) especificação dos dados desejados e oferecer bom feedback visual.
* Uma nova opção para o&lt;dataset&gt; etiquetas emdatasets.xml:[Ativar = "falso"](/docs/server-admin/datasets#active).
* ReferênciasERD'ERDDAP™mudou de Coastwatch.pfel (ainda funciona via proxy) to coastwatch.pfeg (preferido) .
* Novo suporte para[data\\_minedata\\_max](/docs/server-admin/datasets#data_min-and-data_max)atributos de metadados variáveis.
* Uma solução parcial para[WaitThenTryAgain / Exceção de resultados parciais](/docs/server-admin/additional-information#waitthentryagain-exception): Agora, alguns pedidos que falharam anteriormente quando uma mudança de fonte de dados foi detectada terão sucesso porqueERDDAP™irá recarregar o conjunto de dados e reformular os dados automaticamente, tudo no contexto da solicitação original.
* Correção de bugs: gerar Conjuntos de dados Xml foi desativado emERDDAP™versão 1.12. Graças a Ellyn Montgomery por apontar isto.
* Pequenas mudanças no manuseio de erros.
* Muitas melhorias para evitar/reduzir com possíveis condições de corrida (ou seja, possíveis problemas decorrentes da natureza multithreaded doERDDAP) que causou problemas pequenos e pouco frequentes.
* Agora, se uma mensagem de erro for escrita em uma imagem, a imagem só permanecerá no cache por ~5-10 minutos (não 60) . Graças à Cara Wilson.
* A mensagem padrão quando não há dados é agora "Sua consulta não produziu resultados correspondentes", o que é mais curto, mais preciso e combinaOPeNDAPservidores.
*   EDDGridnão permite mais valores de eixo vinculados.
* Pequenas mudanças nos pedidos .ver e .help.
* Muitas pequenas mudanças e correções de bugs.
     

## Versão 1.12{#version-112} 
 (lançado em 2008-10-31) 

* Tabela de EDDSOSmais uma vez trabalha com NDBCSOSe trabalha com os novos NOSSOS.
* EDDTableFromBMDE agora requerERDDAP™administrador para especificardataVariableS.
*   EDDGridnão mais exige que o ponto e lon sejam uniformemente espaçado para . transparente Png ou.kml. Graças aToddSpindler.
* Algumas pequenas mudanças.
     

## Versão 1.10{#version-110} 
 (lançado em 2008-10-14) 

* Novos metadados "colorBar" para variáveis de dados emdatasets.xmldefine as configurações padrão da barra de cores para gráficos e mapas. Ver[mais informações](/docs/server-admin/datasets#color-bar-attributes). Isso é importante porque melhora muito a aparência dos gráficos e mapas padrão produzidos por Make A Graph e porque os gráficos e mapas padrão agora têm uma barra de cores consistente mesmo quando o cliente muda o tempo solicitado ou a faixa geográfica. Além disso, isso foi necessário paraWMS.
*   ERDDAP™agora serve a maioria dos dados de grade através deWMSserviço. Isso é importante porque mostra que, além de obter dados de muitos tipos de servidores de dados,ERDDAP™pode distribuir dados através de diferentes protocolos (DAP,WMS, ... mais no futuro) . Ver[documentação do cliente](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Ou o[documentação para administradores](/docs/server-admin/datasets#wms). Ou[Experimenta.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Novo apoio aos valores de longitude &gt;180 em.kmlarquivos.
* Novo cdm\\_data\\_type: Outro .
*   ERDDAP™agora suporta "boolean" fonte dataType. Ver[mais informações](/docs/server-admin/datasets#boolean-data)Isso se tornará útil para o futuro EDDTableFromDatabase.
* A nova EDDTableFromBMDE suporta fontes de dados DiGIR/BMDE.
* EDVGridAxis agora permite valores classificados descendentes. Os conjuntos de dados pmelOscar precisavam disso.
*   ERDDAP™agora retorna erros HTTP (por exemplo, "404 para recurso/página não encontrada") em mais situações, em vez de páginas HTML com mensagens de erro.
* Muitas mudanças/adições para osERDDAP™documentação.
* Muitas pequenas mudanças.
* Algumas correções de bugs.
*    **CoisasERDDAP™Os administradores devem fazer para atualizar para esta versão:** 
    * Emdatasets.xml, para qualquer EDDTable DeSOSdatasets, alterar metadados "observedProperty" para "sourceObservedProperty".
    * As regras para umaxisVariableoudataVariable'destinationNameagora[mais rigoroso](/docs/server-admin/datasets#datavariable-addattributes). Você precisa verificar se seus nomes variáveis são válidos. Ou verifique-os à mão ou corraERDDAP™e veja as mensagens de erro no relatório que é enviado para o administrador.
    * Emdatasets.xml, se você quiser que uma variável de dados de grade seja acessível viaWMS, você precisa adicionar metadados colorBar. Pelo menos, por exemplo,&lt;Nome do anúnciocolorBarMinimum" type="double"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Ver[mais informações](/docs/server-admin/datasets#wms).
    * Adicionar o seguinte ao seu[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo (mas personalizá-lo com suas informações) :

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

* Um novo serviço web emERDDAP™, gerar Conjuntos de dados Xml, ajudaERDDAP™administradores criando um rascunho áspero do XML necessário para descrever um conjunto de dados emdatasets.xml
* Algumas correções de alterações/bug relacionadas a permitir que o griddap seja visto por netcdf-java como um servidor opendap, incluindo: os metadados globais agora são rotulados "NC\\_GLOBAL" (em vez de "GLOBAL") .
* OEDDGride os formulários de acesso de dados EDDTable agora utilizam informações de consulta na URL. Assim, por exemplo, se um usuário vai de um formulário Make A Graph para um Formulário de Acesso a Dados, as restrições são transferidas corretamente.
*   tabledap's Make A Graph agora permite restrições sobre variáveis String.
* EDDTable's Make A Graph agora permite restrições NaN. Graças ao Steve Hankin.
* Correção de bug: EDDTable save AsImage não reconheceu corretamente os valores .colorbar min e max. Graças a Steve Hankin
* Muitas melhorias na configuraçãoDatasetsXml. Graças a Ellyn Montgomery.
* Os pedidos de Griddap agora permitem () - solicitações de estilo ligeiramente fora do alcance real do eixo. Isso é apropriado desde () -valores são arredondados para o valor real mais próximo. Graças a Cindy Bessey
* Fiz o teste FloatArray e DoubleArray de éEvenlySpaced mais sofisticado. Será sempre imperfeito (porque o teste precisa ser personalizado para cada conjunto de dados) , mas deve ser melhor. Graças a Ellyn Montgomery.
* Eu mudei setup.html e setupDatasets Xml.html erddap's /download diretório e codificado rígido todos os links para eles. Agora, posso fazer alterações e atualizar as informações de configuração imediatamente.
* Muitas pequenas mudanças. Algumas pequenas correções de bugs.
*    **CoisasERDDAP™Os administradores devem fazer para atualizar para esta versão:** 
    * Mexam-se&#33;&lt;a descrição curta Html&gt; de suas mensagens.xml para o seu[setup.xml](/docs/server-admin/deploy-install#setupxml)ficheiro. Especifica o texto que aparece no meio do lado esquerdo doERDDAP™Página inicial. Também, adicionar&lt;H1&gt;ERDDAP&lt;- Sim. (ou algum outro título) para o topo. **Ou...** cópia&lt;theShortDescriptionHtml&gt; no novo[setup.xml](/docs/server-admin/deploy-install#setupxml)arquivo (do novo erddapContent.zip) em seu setup.xml.
         

## Versão 1.06{#version-106} 
 (lançado em 2008-06-20) 

* Novo suporte paraIOOS DIF SOSfontes de dados.
* Muitas pequenas mudanças. Algumas pequenas correções de bugs.
     

## Versão 1.04{#version-104} 
 (lançado em 2008-06-10) 

* Novo recurso Slide Sorter.
* Nova página do Google Gadgets e exemplos.
* Correção de BugEDDGrid.saveAsNc para variável com escala e addOffset.
     

## Versão 1.02{#version-102} 
 (lançado em 2008-05-26) 

* NovoEDDGridSideBySide permite diferentesaxisVariableS\\[0\\]fonte Valores.
* Todos os conjuntos de dados de correntes e ventos foram fundidos emEDDGridConjuntos de dados SideBySide.
* As imagens de solicitações de imagem agora são armazenadas em cache por 1 hora.
     

## Versão 1.00{#version-100} 
 (lançado em 2008-05-06) 

* Faça um gráfico páginas web e comandos gráficos em URLs.
* Suporte para arquivos de bandeira para forçar a recarregar um conjunto de dados.
* Novo tipo de conjunto de dados: EDDTableFrom4DFiles (a primeira subclasse de EDDTableFromFiles) .
