---
sidebar_position: 4
---
ERDDAP™- Preparar o teu próprioERDDAP™    

## Coisas que você precisa saber{#things-you-need-to-know} 
     
###    **[Erros de Proxy](#proxy-errors)**  {#proxy-errors} 
Às vezes, um pedido paraERDDAP™retornará um erro Proxy, um erro HTTP 502 Bad Gateway, ou algum erro similar. Estes erros estão sendo jogados por Apache ou Tomcat, nãoERDDAP™em si.
* Se cada solicitação gerar esses erros, especialmente quando você estiver primeiro configurando seuERDDAP™, então provavelmente é um erro de gateway proxy ou ruim, e a solução é provavelmente para corrigir[ERDDAPConfigurações de proxy](/docs/server-admin/deploy-install#proxypass). Este também pode ser o problema quando um estabelecidoERDDAP™de repente começa a jogar esses erros para cada pedido.
* Caso contrário, os erros "proxy" geralmente são erros de saída de tempo jogados pelo Apache ou Tomcat. Mesmo quando eles acontecem relativamente rapidamente, é algum tipo de resposta de Apache ou Tomcat que ocorre quandoERDDAP™é muito ocupado, limitado de memória, ou limitado por algum outro recurso. Nestes casos, consulte o conselho abaixo para lidar com[ERDDAP™respondendo lentamente](#responding-slowly).
        
Pedidos para um longo intervalo de tempo (&gt; 30 pontos de vista) de um conjunto de dados gradeados são propensos a falhas de tempo, que muitas vezes aparecem como erros de proxy, porque leva tempo significativo paraERDDAP™para abrir todos os arquivos de dados one-by-one. SeERDDAP™é ocupado durante o pedido, o problema é mais provável que ocorra. Se os arquivos do conjunto de dados são compactados, o problema é mais provável de ocorrer, embora seja difícil para um usuário determinar se os arquivos de um conjunto de dados são compactados.
A solução é fazer vários pedidos, cada um com um intervalo de tempo menor. Quão pequeno de um intervalo de tempo? Sugiro começar muito pequeno (- 30 pontos de tempo?) Então (aproximadamente aproximadamente) duplique o intervalo de tempo até que o pedido falhar, depois volte uma duplicação. Então faça todos os pedidos (cada um por um pedaço de tempo diferente) necessário para obter todos os dados.
UmERDDAP™administrador pode diminuir esse problema, aumentando o[Configurações de timeout do Apache](/docs/server-admin/deploy-install#apache-timeout).
        
### Acompanhamento{#monitoring} 
Todos queremos que nossos serviços de dados encontrem seu público e sejam amplamente utilizados, mas às vezes seuERDDAP™pode ser usado demais, causando problemas, incluindo respostas super lentas para todos os pedidos. Nosso plano para evitar problemas é:

* MonitorizaçãoERDDAP™através do[página web status.html](#status-page).
Tem muitas informações úteis. Se você vê que um grande número de pedidos estão chegando, ou toneladas de memória sendo usado, ou toneladas de pedidos falhados, ou cada Maior LoadDatasets está levando um longo tempo, ou ver qualquer sinal de coisas ficando bogged para baixo e respondendo lentamente, em seguida, olhe para dentroERDDAP'[arquivo log.txt](#log)para ver o que se passa.
    
Também é útil simplesmente notar o quão rápido a página de status responde. Se ele responder lentamente, esse é um indicador importante queERDDAP™está muito ocupado.
    
* MonitorizaçãoERDDAP™através do[Relatório diário](#daily-report)E-mail.
     
* Assista a conjuntos de dados desatualizados através do *BaseUrl* /erddap/outOfDateDatasets.htmlpágina da web que é baseada no opcional[testOutOfDate](/docs/server-admin/datasets#testoutofdate)atributo global.
     
#### Monitores externos{#external-monitors} 
Os métodos listados acima sãoERDDAPOs modos de se controlar. Também é possível fazer ou usar sistemas externos para monitorar seuERDDAP. Um projeto para fazer isso é[Projeto erddap-metrics da Axiom](https://github.com/axiom-data-science/erddap-metrics). Tais sistemas externos têm algumas vantagens:
* Eles podem ser personalizados para fornecer as informações que você quer, exibidas da maneira que você quer.
* Eles podem incluir informações sobreERDDAP™queERDDAP™não pode acessar facilmente ou em tudo (por exemplo, uso de CPU, espaço livre de disco,ERDDAP™tempo de resposta como visto na perspectiva do usuário,ERDDAP™tempo de atividade,
* Eles podem fornecer alertas (e-mails, telefonemas, textos) aos administradores quando os problemas excedem algum limiar.
             
### Múltiplos Simultaneos Pedidos{#multiple-simultaneous-requests} 
*    **Usuários da lista negra fazendo várias solicitações simultâneas&#33;** 
Se é claro que algum usuário está fazendo mais de uma solicitação simultânea, repetidamente e continuamente, em seguida, adicione seu endereço IP paraERDDAPÉ...&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) em seudatasets.xmlficheiro. Às vezes, os pedidos são todos de um endereço IP. Às vezes eles são de vários endereços IP, mas claramente o mesmo usuário. Você também pode fazer pessoas na lista negra fazendo toneladas de pedidos inválidos ou toneladas de pedidos ineficientes mentalmente.
    
Então, para cada pedido eles fazem,ERDDAP™retornos:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Esperemos que o usuário veja esta mensagem e entre em contato com você para descobrir como corrigir o problema e sair da lista negra. Às vezes, eles apenas alternam endereços IP e tentam novamente.
    
É como o equilíbrio de poder entre armas ofensivas e defensivas em guerra. Aqui, as armas defensivas (ERDDAP) tem uma capacidade fixa, limitada pelo número de núcleos na CPU, a largura de banda de acesso a disco e a largura de banda de rede. Mas as armas ofensivas (usuários, notavelmente scripts) tem capacidade ilimitada:
    
    * Um único pedido de dados de muitos pontos de tempo pode causarERDDAPpara abrir um grande número de arquivos (em sequência ou parcialmente multi-threaded) . Em casos extremos, uma solicitação "simples" pode facilmente amarrar o RAID anexado aERDDAP™por um minuto, bloqueando efetivamente o manuseio de outros pedidos.
         
    * Um único pedido pode consumir um grande pedaço de memória (emboraERDDAP™é codificado para minimizar a memória necessária para lidar com grandes solicitações) .
         
    * Paralelação - Não.
É fácil para um usuário inteligente para paralelo a uma grande tarefa, gerando lotes de threads, cada um deles submete uma solicitação separada (que pode ser grande ou pequeno) . Este comportamento é incentivado pela comunidade de ciência da computação como uma maneira eficiente de lidar com um grande problema (e paralelizar é eficiente em outras circunstâncias) . Voltando à analogia da guerra: os usuários podem fazer um número essencialmente ilimitado de pedidos simultâneos com o custo de cada um sendo essencialmente zero, mas o custo de cada pedido entrando emERDDAP™pode ser grande eERDDAPA capacidade de resposta é finita. Claramente,ERDDAP™perderá esta batalha, a menos que oERDDAP™administrador listas negras usuários que estão fazendo várias solicitações simultâneas que estão injustamente lotando outros usuários.
         
    * Vários scripts -
Agora pense no que acontece quando há vários usuários inteligentes cada um executando scripts paralelos. Se um usuário pode gerar tantas solicitações que outros usuários estão lotados, então vários desses usuários podem gerar tantos pedidos queERDDAP™torna-se esmagado e aparentemente irresponsável. É efetivamente um[Ataque de DDOS](https://en.wikipedia.org/wiki/Denial-of-service_attack)Mais uma vez, a única defesa paraERDDAP™é para usuários da lista negra fazendo várias solicitações simultâneas que estão injustamente lotando outros usuários.
         
    * Expectativas Infladas -
Neste mundo de empresas de tecnologia maciça (Amazon, Google, Facebook, ...) , os usuários vieram esperar recursos essencialmente ilimitados dos provedores. Uma vez que essas empresas são operações de criação de dinheiro, quanto mais usuários tiverem, mais receitas terão de expandir sua infraestrutura de TI. Assim, eles podem pagar uma enorme infraestrutura de TI para lidar com pedidos. E eles inteligentemente limitam o número de pedidos e custo de cada pedido dos usuários, limitando os tipos de pedidos que os usuários podem fazer para que nenhum único pedido seja pesado, e nunca há uma razão (ou uma maneira) para os usuários fazer várias solicitações simultâneas. Então essas grandes empresas de tecnologia podem ter muito mais usuários do queERDDAP™, mas eles têm enormemente mais recursos e formas inteligentes de limitar os pedidos de cada usuário. É uma situação gerenciável para as grandes empresas de TI (e ficam ricos&#33;) mas não paraERDDAP™instalações. Mais uma vez, a única defesa paraERDDAP™é para usuários da lista negra fazendo várias solicitações simultâneas que estão injustamente lotando outros usuários.
         
    
Então usuários: Não faça várias solicitações simultâneas ou você será listado em preto&#33;
     

Claramente, é melhor se o seu servidor tem muitos núcleos, muita memória (para que você possa alocar muita memória paraERDDAP™Mais do que nunca precisa) , e uma conexão de internet de alta largura de banda. Então, a memória é raramente ou nunca um fator limitante, mas a largura de banda de rede se torna o fator limitante mais comum. Basicamente, como há mais e mais solicitações simultâneas, a velocidade para qualquer usuário diminui. Isso naturalmente diminui o número de solicitações que vêm se cada usuário está apenas enviando um pedido de cada vez.
    
### ERDDAP™Obtendo dados de THREDDS{#erddap-getting-data-from-thredds} 
Se vocêERDDAP™recebe alguns de seus dados de um THREDDS em seu site, existem algumas vantagens para fazer uma cópia dos arquivos de dados THREDDS (pelo menos para os conjuntos de dados mais populares) em outro RAID queERDDAP™tem acesso aERDDAP™pode servir os dados dos arquivos diretamente. EmERD, fazemos isso para nossos conjuntos de dados mais populares.

*   ERDDAP™pode obter os dados diretamente e não tem que esperar por THREDDS para recarregar o conjunto de dados ou ...
*   ERDDAP™pode notar e incorporar novos arquivos de dados imediatamente, então ele não precisa pester THREDDS frequentemente para ver se o conjunto de dados mudou. Veja...&lt;updateEveryNMillis&gt;] (/docs/admin/datasets#updateeverynmillis) .
* A carga é dividida entre 2 servidores RAIDS e 2, em vez da solicitação ser difícil em ambosERDDAP™e três.
* Você evita o problema da falta causado por THREDDS ter um pequeno (por padrão) tamanho máximo de pedido.ERDDAP™tem um sistema para lidar com a incompatibilidade, mas evitar o problema é melhor.
* Você tem uma cópia de backup dos dados que é sempre uma boa ideia.

Em qualquer caso, nunca corra THREDDS eERDDAP™no mesmo Tomcat. Executá-los em Tomcats separados, ou melhor, em servidores separados.

Nós achamos que o THREDDS periodicamente entra em um estado onde os pedidos apenas penduram. Se vocêERDDAP™está recebendo dados de um THREDDS e o THREDDS está neste estado,ERDDAP™tem uma defesa (diz que o conjunto de dados baseado em THREDDS não está disponível) , mas ainda é problemático paraERDDAP™porqueERDDAP™tem que esperar até o timeout cada vez que tenta recarregar um dataset de um THREDDS pendurado. Alguns grupos (incluindoERD) evitar isso por reiniciar proativamente THREDDS frequentemente (por exemplo, durante a noite em um trabalho cron) .

### Respondendo devagar{#responding-slowly} 
*    **SeERDDAP™Está respondendo devagar** ou se apenas certos pedidos estão respondendo lentamente,
você pode ser capaz de descobrir se a lentidão é razoável e temporária (por exemplo, por causa de muitos pedidos de scripts ouWMSusuários) , ou se algo está inexplicavelmente errado e você precisa[desligar e reiniciar Tomcat eERDDAP™](#shut-down-and-restart).
    
SeERDDAP™está respondendo lentamente, veja o conselho abaixo para determinar a causa, que espero que lhe permitirá corrigir o problema.
Você pode ter um ponto de partida específico (por exemplo, uma URL de solicitação específica) ou um ponto de partida vago (por exemplo,ERDDAP™é lento) .
Você pode saber o usuário envolvido (por exemplo, porque eles te enviaram um email) ou não.
Pode ter outras pistas, ou não.
Uma vez que todas essas situações e todas as possíveis causas dos problemas desfocam juntos, o conselho abaixo tenta lidar com todos os possíveis pontos de partida e todos os possíveis problemas relacionados com respostas lentas.
    
    *    **Procure pistas em[ERDDAPficheiro de registo](#log)**   ( *Diretriz de grande porte* /logs/log.txt) .
        \\[Em raras ocasiões, há pistas em[Arquivo de log do Tomcat](#tomcat-logs)  ( *Toca a brincar.* /logs/catalina.out) .\\]  
Procure mensagens de erro.
Procure um grande número de pedidos vindos de um (ou alguns) usuários e talvez acumular muitos recursos do seu servidor (memória, tempo de CPU, acesso a disco, largura de banda de internet) .
        
Se o problema estiver ligado **um usuário** , você pode muitas vezes obter uma pista sobre quem o usuário é através de serviços web como[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)que pode lhe dar informações relacionadas ao endereço IP do usuário (que você pode encontrar emERDDAP'[- Não.](#log)arquivo) .
        
        * Se o usuário parece ser um **Botão** comportar-se mal (notavelmente, um motor de busca tentando preencher oERDDAP™formas com cada permutação possível de valores de entrada) , certifique-se de ter configurado corretamente o servidor[robots.txt](#robotstxt)ficheiro.
        * Se o usuário parece ser um **script (S) ** que está fazendo várias solicitações simultâneas, contate o usuário, explique que seuERDDAP™tem recursos limitados (por exemplo, memória, tempo de CPU, acesso a disco, largura de banda de internet) , e pedir-lhes para ser atencioso de outros usuários e apenas fazer um pedido de cada vez. Você também pode mencionar que você vai chantageá-los se eles não recuar.
        * Se o usuário parece ser um **script** fazer um grande número de pedidos demorados, pedir ao usuário para ser atencioso de outros usuários, colocando uma pequena pausa (2 segundos?) no script entre pedidos.
        *    **WMSsoftware cliente** pode ser muito exigente. Um cliente muitas vezes pedirá 6 imagens personalizadas de cada vez. Se o usuário parece ser umWMScliente que está fazendo pedidos legítimos, você pode:
            * Ignora. (recomendado, porque eles vão em breve) 
            * Desligue o servidorWMSserviço viaERDDAP's setup.html file. (não recomendado) 
        * Se os pedidos parecerem **estúpido, insano, excessivo ou malicioso,** ou se você não pode resolver o problema de outra forma, considere adicionar temporariamente ou permanentemente o endereço IP do usuário ao [&lt;requestBlacklist&gt; em seudatasets.xmlarquivo] (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Tente duplicar o problema você mesmo, do seu computador.**   
Descubra se o problema é com um conjunto de dados ou todos os conjuntos de dados, para um usuário ou todos os usuários, para apenas certos tipos de solicitações, etc.
Se você pode duplicar o problema, tente reduzir o problema.
Se você não pode duplicar o problema, então o problema pode estar vinculado ao computador do usuário, à conexão de internet do usuário ou à conexão de internet da sua instituição.
         
    * Se... **um conjunto de dados** está respondendo lentamente (talvez só para **um tipo de pedido** de um usuário) , o problema pode ser:
        *   ERDDAPacesso aos dados de origem do conjunto de dados (notavelmente de bases de dados relacionais, Cassandra e conjuntos de dados remotos) pode ser temporariamente ou permanentemente lento. Tente verificar a velocidade da fonte independente deERDDAP. Se for lento, talvez você possa melhorá-lo.
        * O problema está relacionado com a solicitação específica ou tipo geral de solicitação?
Quanto maior o subconjunto solicitado de um conjunto de dados, mais provável a solicitação falhará. Se o usuário está fazendo pedidos enormes, peça ao usuário para fazer solicitações menores que são mais propensas a obter uma resposta rápida e bem sucedida.
            
Quase todos os conjuntos de dados são melhores para lidar com alguns tipos de pedidos do que outros tipos de pedidos. Por exemplo, quando um conjunto de dados armazena pedaços de tempo diferentes em arquivos diferentes, os pedidos de dados de um grande número de pontos de tempo podem ser muito lentos. Se as solicitações atuais são de um tipo difícil, considere oferecer uma variante do conjunto de dados que é otimizado para essas solicitações. Ou apenas explicar ao usuário que esse tipo de pedido é difícil e demorado, e pedir sua paciência.
            
        * O conjunto de dados pode não ser configurado de forma otimizada. Você pode ser capaz de fazer alterações no conjunto de dadosdatasets.xmlpara ajudarERDDAP™lidar com o conjunto de dados melhor. Por exemplo,
            
            *   EDDGridDe conjuntos de dados do NcFiles que acessam dados de arquivos nc4/hdf5 compactados são lentos ao obter dados para todo o intervalo geográfico (por exemplo, para um mapa mundial) porque todo o arquivo deve ser descomprimido. Você pode converter os arquivos para arquivos não compactados, mas, em seguida, a exigência de espaço em disco será muito, muito maior. É provavelmente melhor aceitar que tais conjuntos de dados serão lentos em certas circunstâncias.
            * A configuração do [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) tag tem uma enorme influência sobre comoERDDAP™lida com conjuntos de dados EDDTable.
            * Você pode ser capaz de aumentar o[velocidade de um EDDTableDeDatabase](/docs/server-admin/datasets#database-speed)conjunto de dados.
            * Muitos conjuntos de dados EDDTable podem ser copiados por[armazenar uma cópia dos dados emNetCDFArquivos de matriz irregulares contíguas](/docs/server-admin/datasets#eddtablefromfiles), queERDDAP™pode ler muito rapidamente.
            
Se você quiser ajudar a acelerar um conjunto de dados específico, inclua uma descrição do problema e o pedaço do conjunto de dadosdatasets.xmle ver o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
             
    * Se **tudo** emERDDAP™é **sempre** lento, o problema pode ser:
        * O computador que está executandoERDDAP™pode não ter memória suficiente ou poder de processamento. É bom correrERDDAP™em um servidor moderno e multi-core. Para uso pesado, o servidor deve ter um sistema operacional de 64 bits e 8 GB ou mais de memória.
        * O computador que está executandoERDDAP™pode também estar executando outras aplicações que estão consumindo muitos recursos do sistema. Se assim for, você pode obter um servidor dedicado paraERDDAP? Por exemplo (Isto não é um endosso) , você pode obter um Mac Mini Server quad-core com 8 GB de memória por ~$1100.
             
    * Se **tudo** emERDDAP™é **temporariamente** lento, veja o seuERDDAP'[ **/erddap/status.htmlPágina** ](#status-page)no seu navegador.
        * Faz oERDDAP™página de status não carregar?
Se assim for,[reiniciarERDDAP™](#shut-down-and-restart).
        * - O quê?ERDDAP™carga de página de status lentamente (por exemplo, &gt;5 segundos) ?
Isso é um sinal de que tudoERDDAP™está correndo lentamente, mas não é necessariamente problema.ERDDAP™Talvez esteja muito ocupado.
        * Para "Response Failed Time (desde os últimos grandes conjuntos de dados de carga) ", n = um grande número?
Isso indica que houve muitos pedidos falhados recentemente. Isso pode ser um problema ou o início de problemas. O tempo mediano para as falhas é muitas vezes grande (por exemplo, 210000 ms) ,
o que significa que houve (São?) muitos fios ativos.
que estavam amarrando muitos recursos (como memória, arquivos abertos, soquetes abertos, ...) ,
que não é bom.
        * Para "Response Succeed Time (desde os últimos grandes conjuntos de dados de carga) ", n = um grande número?
Isso indica que houve muitos pedidos bem sucedidos recentemente. Isto não é problema. Significa apenas o teuERDDAP™está ficando pesado.
        * O "Número de fios não-Tomcat-waiting" duplica um valor típico?
Este é frequentemente um problema sério que causaráERDDAP™para abrandar e eventualmente congelar. Se isso persistir por horas, você pode querer proativamente[reiniciarERDDAP™](#shut-down-and-restart).
        * Na parte inferior da lista "Memory Use Summary", é o último valor "Memory: atualmente usando" muito alto?
Isso pode indicar alto uso, ou pode ser um sinal de problemas.
        * Veja a lista de threads e seu status. Um número incomum deles está fazendo algo incomum?
             
    * É **ligação à Internet da sua instituição** Agora devagar?
Pesquise na internet para "teste de velocidade de internet" e use um dos testes on-line gratuitos, como[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Se a conexão de internet da sua instituição é lenta, então as conexões entreERDDAP™e fontes de dados remotas serão lentas, e conexões entreERDDAP™e o usuário será lento. Às vezes, você pode resolver isso, impedindo o uso de internet desnecessário (por exemplo, pessoas assistindo vídeos de streaming ou em chamadas de videoconferência) .
         
    * É **conexão de internet do usuário** Agora devagar?
Faça com que o usuário pesquise na internet para "teste de velocidade de entrada" e use um dos testes on-line gratuitos, como[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Se a conexão de internet do usuário é lenta, ele diminui seu acessoERDDAP. Às vezes, eles podem resolver isso impedindo o uso de internet desnecessário em sua instituição (por exemplo, pessoas assistindo vídeos de streaming ou em chamadas de videoconferência) .
         
    *    **Preso?**   
Veja o nosso[seção sobre como obter suporte adicional](/docs/intro#support).

### Desligar e reiniciar{#shut-down-and-restart} 
*    **Como Desligar e Reiniciar Tomcat eERDDAP™**   
Você não precisa desligar e reiniciar Tomcat eERDDAPseERDDAP™é temporariamente lento, lento por alguma razão conhecida (como muitos pedidos de scripts ouWMSusuários) , ou aplicar alteraçõesdatasets.xmlficheiro.
    
Você precisa desligar e reiniciar Tomcat eERDDAP™se você precisar aplicar alterações no arquivo setup.xml, ou seERDDAP™congela, pendura ou tranca. Em circunstâncias extremas,Javapode congelar por um minuto ou dois enquanto faz uma coleção de lixo completo, mas depois recuperar. Então é bom esperar um minuto ou dois para ver seJava/ERDDAP™está realmente congelado ou se está apenas fazendo uma longa coleção de lixo. (Se a coleta de lixo é um problema comum,[alocar mais memória para Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Eu não recomendo usar o Tomcat Web Application Manager para iniciar ou desligar Tomcat. Se você não desligar totalmente e iniciar Tomcat, mais cedo ou mais tarde você terá problemas de memória PermGen.
    
Para desligar e reiniciar Tomcat eERDDAP:
    
    * Se você usar Linux ou um Mac:
         (Se você criou um usuário especial para executar Tomcat, por exemplo, tomcat, lembre-se de fazer as seguintes etapas como esse usuário.)   
         
        1. Usar cd *Toca a brincar.* /bin
             
        2. Usar ps -ef|grep tomcat para encontrar o processo java/tomcat ID (esperançosamente, apenas um processo será listado) Que vamos ligar *O que fazer?* abaixo.
             
        3. SeERDDAP™é congelado/hung/locked para cima, use kill -3 *O que fazer?* para contarJava  (que está executando Tomcat) para fazer uma descarga de rosca para o arquivo de log Tomcat: *Toca a brincar.* /logs/catalina.out . Depois de reiniciar, você pode diagnosticar o problema encontrando as informações de descarga de rosca (e qualquer outra informação útil acima dele) em *Toca a brincar.* /logs/catalina.out e também lendo partes relevantes da[ERDDAP™arquivo de registro](#log). Se você quiser, você pode incluir essas informações e ver nosso[seção sobre como obter suporte adicional](/docs/intro#support).
             
        4. Use ./shutdown. Não.
             
        5. Usar ps -ef|grep tomcat repetidamente até que o processo java/tomcat não esteja listado.
            
Às vezes, o processo java/tomcat levará até dois minutos para desligar completamente. A razão é:ERDDAP™envia uma mensagem para seus segmentos de fundo para dizer-lhes para parar, mas às vezes leva estes fios um longo tempo para chegar a um bom lugar de parada.
            
        6. Se depois de um minuto ou assim, java/tomcat não está parando por si só, você pode usar
matar -9 *O que fazer?*   
forçar o processo java/tomcat a parar imediatamente. Se possível, use isso apenas como um último recurso. O interruptor -9 é poderoso, mas pode causar vários problemas.
             
        7. Para reiniciarERDDAP™, use ./startup.sh
             
        8. VisualizaçãoERDDAP™no seu navegador para verificar que o reinício conseguiu. (Às vezes, você precisa esperar 30 segundos e tentar carregarERDDAP™novamente em seu navegador para que ele tenha sucesso.)   
             
    * Se você usar o Windows:
         
        1. Usar cd *Toca a brincar.* /bin
             
        2. Usoshutdown.bat  
             
        3. Você pode querer / precisar usar o Gerenciador de tarefas do Windows (acessível via Ctrl Alt Del) para garantir queJava/Tomcat /ERDDAP™processo/aplicação parou completamente.
Às vezes, o processo / aplicação levará até dois minutos para desligar. A razão é:ERDDAP™envia uma mensagem para seus segmentos de fundo para dizer-lhes para parar, mas às vezes leva estes fios um longo tempo para chegar a um bom lugar de parada.
             
        4. Para reiniciarERDDAP™, use startup.bat
             
        5. VisualizaçãoERDDAP™no seu navegador para verificar que o reinício conseguiu. (Às vezes, você precisa esperar 30 segundos e tentar carregarERDDAP™novamente em seu navegador para que ele tenha sucesso.)   
             
### Crashes frequentes ou Freezes{#frequent-crashes-or-freezes} 
SeERDDAP™torna-se lento, trava ou congela, algo está errado. Olha...[ERDDAPficheiro de registo](#log)tentar descobrir a causa. Se você não puder, inclua os detalhes e veja nosso[seção sobre como obter suporte adicional](/docs/intro#support).

O problema mais comum é um usuário problemático que está executando vários scripts de uma só vez e/ou alguém fazendo um grande número de solicitações inválidas. Se isso acontecer, você provavelmente deve listar o usuário. Quando um usuário na lista negra faz um pedido, a mensagem de erro na resposta os incentiva a e-mail para você para resolver os problemas. Então, você pode encorajá-los a executar apenas um script de cada vez e corrigir os problemas em seu script (por exemplo, solicitando dados de um conjunto de dados remoto que não pode responder antes de sair) . Veja...&lt;requestBlacklist&gt; em seudatasets.xmlarquivo] (/docs/server-admin/datasets#requestblacklist) .

Em circunstâncias extremas,Javapode congelar por um minuto ou dois enquanto faz uma coleção de lixo completo, mas depois recuperar. Então é bom esperar um minuto ou dois para ver seJava/ERDDAP™está realmente congelado ou se está apenas fazendo uma longa coleção de lixo. (Se a coleta de lixo é um problema comum,[alocar mais memória para Tomcat](/docs/server-admin/deploy-install#memory).) 

SeERDDAP™torna-se lento ou congela e o problema não é um usuário problemático ou uma longa coleção de lixo, você geralmente pode resolver o problema por[reiniciandoERDDAP™](#shut-down-and-restart). A minha experiência é queERDDAP™pode correr por meses sem precisar de um reinício.
     

### Monitorização{#monitor} 
Você pode monitorar seuERDDAP's status, olhando para o[/erddap/status.htmlPágina](#status-page), nomeadamente as estatísticas da secção superior. SeERDDAP™torna-se lento ou congela e o problema não é apenas uso extremamente pesado, você geralmente pode resolver o problema por[reiniciandoERDDAP™](#shut-down-and-restart). Há métricas adicionais disponíveis através da integração Prometheus em /erddap/metrics.

A minha experiência é queERDDAP™pode correr por meses sem precisar de um reinício. Você só deve precisar reiniciá-lo se você quiser aplicar algumas mudanças que você fez paraERDDAP's setup.xml ou quando você precisa instalar novas versões deERDDAP™,Java, Tomcat, ou o sistema operacional. Se você precisar reiniciarERDDAP™frequentemente, algo está errado. Olha...[ERDDAPficheiro de registo](#log)tentar descobrir a causa. Se você não puder, inclua os detalhes e veja nosso[seção sobre como obter suporte adicional](/docs/intro#support). Como uma solução temporária, você pode tentar usar[Monit](https://mmonit.com/monit/)para monitorar o seuERDDAP™e reiniciá-lo se necessário. Ou podes fazer um trabalho de cron para reiniciarERDDAP™  (proativamente) periodicamente. Pode ser um pouco desafiador escrever um script para automatizar o monitoramento e reiniciarERDDAP. Algumas dicas que podem ajudar:

* Você pode simplificar o teste se o processo Tomcat ainda estiver em execução usando o -c switch com grep:
ps -u *Toca a brincar. Usuário*  |Gerenciamento de contas
Isso reduzirá a saída para "1" se o processo tomcat ainda estiver vivo, ou "0" se o processo tiver interrompido.
     
* Se você é bom com gawk, você pode extrair o processID dos resultados de
ps -u *Toca a brincar. Usuário*  |grep java, e usar o processID em outras linhas do script.
     

Se você montar Monit ou um trabalho cron, seria ótimo se você pudesse compartilhar os detalhes para que outros pudessem beneficiar ver nosso[seção sobre como obter suporte adicional](/docs/intro#support)para onde você pode compartilhar.

#### Permígeno{#permgen} 
Se você usar repetidamente Tomcat Manager para recarregar (ou parar e começar)  ERDDAP™,ERDDAP™pode não começar e jogar java.lang. PermGen. A solução é periodicamente (ou sempre?)  [desligar e reiniciar tomcat eERDDAP™](#shut-down-and-restart), em vez de apenas recarregarERDDAP.
\\[Atualização: Este problema foi muito minimizado ou corrigido emERDDAP™versão 1.24.\\]  
     
#### Login{#log} 
*    **[- Não.](#log)**   
SeERDDAP™não começa ou se algo não está funcionando como esperado, é muito útil olhar para o erro e mensagens de diagnóstico noERDDAP™ficheiro de registo.
    * O arquivo de registo é *Diretriz de grande porte* /logs/log.txt
         ( *Diretriz de grande porte* é especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Se não houver registo. arquivo txt ou se o log. txt file não foi atualizado desde que você reiniciadoERDDAP™, olha para o[Arquivos de log de Tomcat](#tomcat-logs)para ver se há uma mensagem de erro lá.
    * Tipos de mensagens de diagnóstico no arquivo de log:
        * A palavra "erro" é usada quando algo correu tão mal que o procedimento não foi concluído. Embora seja irritante para obter um erro, o erro força você a lidar com o problema. Nosso pensamento é que é melhor jogar um erro, do que terERDDAP™A seguir, a trabalhar de uma forma que não esperava.
        * A palavra "avisar" é usada quando algo correu mal, mas o procedimento foi capaz de ser concluído. São muito raros.
        * Qualquer outra coisa é apenas uma mensagem informativa. Você pode controlar o quanto as informações são registradas com [&lt;logLevel&gt; (/docs/server-admin/datasets#loglevel)  datasets.xml.
        * Recargas de dados e respostas do usuário que levam &gt;10 segundos para terminar (com sucesso ou sem sucesso) são marcados com " (10&#33;) ". Assim, você pode pesquisar o arquivo log.txt para esta frase para encontrar os conjuntos de dados que foram lentos para recarregar ou o número de solicitação das solicitações que foram lentas para terminar. Você pode então olhar mais alto no arquivo log.txt para ver qual era o problema do conjunto de dados ou qual era o pedido do usuário e de quem era. Essas cargas lentas de conjuntos de dados e solicitações de usuários são, por vezes, tributando sobreERDDAP. Então saber mais sobre esses pedidos pode ajudá-lo a identificar e resolver problemas.
    * As informações são escritas no arquivo de log na unidade de disco em pedaços bastante grandes. A vantagem é que isso é muito eficiente...ERDDAP™nunca bloqueará a espera de informações a serem escritas no arquivo de log. A desvantagem é que o log quase sempre terminará com uma mensagem parcial, que não será concluída até que o próximo pedaço seja escrito. Você pode fazer up-to-date (para um instante) vendo o seuERDDAPA página web de status no https://*your.domain.org*/erddap/status.html   (ouhttp://sehttpsnão está habilitado) .
    * Quando os arquivos log.txt chegar a 20 MB,
o arquivo é renomeado log. txt.previous e um novo arquivo log.txt é criado. Então os arquivos de log não se acumulam.
        
Em setup.xml, você pode especificar um tamanho máximo diferente para o arquivo de log, em MegaBytes. O mínimo permitido é 1 (MB MB) . O máximo permitido é 2000 (MB MB) . O padrão é 20 (MB MB) . Por exemplo:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Sempre que reiniciarERDDAP™,
        ERDDAP™faz uma cópia de arquivo do log.txt e log. arquivos txt.previous com um carimbo de tempo no nome do arquivo. Se houve problemas antes do reinício, pode ser útil analisar esses arquivos arquivados para pistas sobre o que o problema foi. Você pode excluir os arquivos de arquivo se eles não forem mais necessários.
         
##### Parsing log.txt{#parsing-logtxt} 
ERDDAP's log. arquivo txt não é projetado para análise (embora você possa criar expressões regulares que extraem informações desejadas) . Ele é projetado para ajudar uma pessoa a descobrir o que está errado quando algo está errado. Quando você enviar um relatório de erro ou problema paraERDDAP™desenvolvedores, quando possível, inclua todas as informações do arquivo log.txt relacionadas com a solicitação problemática.

Por razões de eficiência,ERDDAP™apenas escreve informações para logar. txt após um grande pedaço de informação acumulou-se. Então, se você visitar o log. txt logo após um erro ter ocorrido, as informações relacionadas ao erro podem ainda não ter sido escritas para log.txt. A fim de obter informações perfeitamente atualizadas do log.txt, visite o seuERDDAP'[página do status.html](#status-page). QuandoERDDAP™processos que solicitam, ele limpa todas as informações pendentes para log.txt.

ParaERDDAP™estatísticas de uso, por favor use o[Apache e/ou Tomcat log arquivos](#tomcat-logs)em vez deERDDAP's log.txt. Note queERDDAP'[página do status.html](#status-page)  (alguns) e[Relatório diário](#daily-report)  (mais) tem um grande número de estatísticas de uso precalculado para você.
    
### Logs de Tomcat{#tomcat-logs} 
SeERDDAP™não começa porque um erro ocorreu muito cedoERDDAP's startup, a mensagem de erro aparecerá nos arquivos de log do Tomcat ( *Toca a brincar.* /logs/catalina. *hoje* .log ou *Toca a brincar.* /logs/catalina.out) , não dentro[ERDDAParquivo log.txt](#log).

Estatísticas de uso: Para a maioria das informações que as pessoas querem reunir de um arquivo de log (por exemplo, estatísticas de uso) , use os arquivos de log Apache e/ou Tomcat. Eles são bem formatados e têm esse tipo de informação. Existem inúmeras ferramentas para analisá-las, por exemplo,[AWStats](https://www.awstats.org),[Kibana de ElasticSearch](https://www.elastic.co/products/kibana)e[JMeter](https://jmeter.apache.org), mas procure na web para encontrar a ferramenta certa para seus propósitos.

Note que os arquivos de log apenas identificam usuários como endereços IP. Existem sites para ajudá-lo a obter informações relacionadas a um determinado endereço IP, por exemplo,[O que é meu endereço](https://whatismyipaddress.com/ip-lookup), mas você normalmente não será capaz de encontrar o nome do usuário.

Também, por causa de[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), o endereço IP de um determinado usuário pode ser diferente em dias diferentes, ou usuários diferentes podem ter o mesmo endereço IP em diferentes momentos.

Alternativamente, você pode usar algo como[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Mas tenha cuidado: quando você usa serviços externos como o Google Analytics, você está desistindo da privacidade de seus usuários, dando ao Google acesso total à sua atividade em seu site que o Google (e outros?) pode manter para sempre e usar para qualquer finalidade (talvez não tecnicamente, mas provavelmente na prática) . Seus usuários não consentiram com isso e provavelmente não estão cientes de que eles serão rastreados em seu site, assim como eles provavelmente não estão cientes da medida em que eles estão sendo rastreados em quase todos os sites. Hoje em dia, muitos usuários estão muito preocupados que tudo o que eles fazem na web está sendo monitorado por essas grandes empresas (Google, Facebook, etc.) e pelo governo, e encontrar isso uma intrusão injustificada em suas vidas (como no livro, 1984) . Isso levou muitos usuários a instalar produtos como[Badger de privacidade](https://www.eff.org/privacybadger/faq)para minimizar o rastreamento, para usar navegadores alternativos como[Navegador de Tor](https://www.torproject.org/)  (ou desligar o rastreamento em navegadores tradicionais) , e usar motores de busca alternativos como[Duck Duck Go](https://duckduckgo.com/). Se você usar um serviço como o Google Analytics, por favor, pelo menos documente seu uso e as consequências alterando o&lt;padrãoPrivacyPolicy&gt; tag inERDDAP'
\\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheiro.
    
### E-Mail Log{#e-mail-log} 
*    **e-mailLogYEAR-MM-DD.txt**   
    ERDDAP™sempre escreve o texto de todas as mensagens de e-mail de saída no e-mail do dia atual Arquivo LogYEAR-MM-DD.txt *Diretriz de grande porte* /logs ( *Diretriz de grande porte* é especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Se o servidor não puder enviar mensagens de e-mail, ou se tiver configuradoERDDAP™para não enviar mensagens de e-mail, ou se você está apenas curioso, este arquivo é uma maneira conveniente de ver todas as mensagens de e-mail que foram enviadas para fora.
    * Você pode excluir arquivos de registro de e-mail dos dias anteriores se eles não forem mais necessários.
         
### Relatório diário{#daily-report} 
O Relatório Diário tem muitas informações úteis - todas as informações do seuERDDAP'[/erddap/status.htmlPágina](#status-page)e mais.
    * É o resumo mais completo do seuERDDAPO estado.
    * Entre outras estatísticas, inclui uma lista de conjuntos de dados que não carregaram e as exceções que geraram.
    * É gerado quando você começarERDDAP™  (Só depois.ERDDAP™acabamentos tentando carregar todos os conjuntos de dados) e gerado logo depois das 7h hora local todas as manhãs.
    * Sempre que é gerado, é escrito para[ERDDAParquivo log.txt](#log).
    * Sempre que é gerado, é enviado para&lt;emailDailyReportsTo&gt; e&lt;e-mail Tudo - A sério? (que são especificados em[setup.xml](/docs/server-admin/deploy-install#setupxml)) desde que você tenha configurado o sistema de e-mail (em setup.xml) .

### Página de status{#status-page} 
Você pode visualizar o status de seuERDDAP™de qualquer navegador, indo para&lt;baseUrl&gt;/erddap/status.html
* Esta página é gerada dinamicamente, por isso sempre tem estatísticas atualizadas para suaERDDAP.
* Ele inclui estatísticas sobre o número de pedidos, uso de memória, traços de pilha de thread, a tarefaThread, etc.
* Porque a página de status pode ser vista por qualquer pessoa, não inclui tanta informação como a[Relatório diário](#daily-report).
         
### Adicionando / pendurando conjuntos de dados{#addingchanging-datasets} 
ERDDAP™geralmente relersdatasets.xmlcada um *Conjuntos de dados de carga*   (especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Então você pode fazer alteraçõesdatasets.xmla qualquer momento, mesmo enquantoERDDAP™está a correr.
Um novo conjunto de dados será detectado em breve, geralmente dentro *Conjuntos de dados de carga* .
Um conjunto de dados alterado será recarregado quando for *recarregar Cada um dos Minuts* velho (como especificado emdatasets.xml) .
    
#### Bandeira{#flag} 
*    **[Um arquivo de bandeira](#flag)ContasERDDAP™para tentar recarregar um Dataset assim que possível** 
    
    *   ERDDAP™não vai notar alterações na configuração de um conjunto de dadosdatasets.xmlatéERDDAP™recarrega o conjunto de dados.
         
    * Para dizerERDDAP™para recarregar um conjunto de dados o mais rápido possível (antes do conjunto de dados)&lt;reloadEveryNMinutes&gt; faria com que ele fosse recarregado), coloque um arquivo em *Diretriz de grande porte* /flagação ( *Diretriz de grande porte* é especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) que tem o mesmo nome do conjunto de dadosdatasetID.
Isso dizERDDAP™para tentar recarregar esse conjunto de dados o mais rápido possível.
A versão antiga do conjunto de dados permanecerá disponível para os usuários até que a nova versão esteja disponível e trocada atomicamente no lugar.
ParaEDDGridDos Ficheiros e Tabela EDD FromFiles, o conjunto de dados de recarregamento procurará arquivos novos ou alterados, lerá esses e incorporará-los no conjunto de dados. Então o tempo para recarregar é dependente do número de arquivos novos ou alterados.
Se o conjunto de dados tiver active="false",ERDDAP™irá remover o conjunto de dados.
         
##### Bandeira de arquivos ruins{#bad-files-flag} 
* Uma variante do diretório /flag é o diretório /badFilesFlag. (Adicionado emERDDAP™v2.12.)   
Se você colocar um arquivo no *Diretriz de grande porte* /badFilesFlag diretório com umdatasetIDcomo o nome do arquivo (o conteúdo do arquivo não importa) , então logoERDDAP™vê o badFiles Arquivo da bandeira,ERDDAP™vontade:
    
    1. Excluir o arquivo badFilesFlag.
    2. Excluir o badFiles.ncarquivo (se houver um) , que tem a lista de arquivos ruins para esse conjunto de dados.
Para conjuntos de dados comoEDDGridSideBySide que tem filhosDatasets, isso também exclui os badFiles.ncarquivo para todos os conjuntos de dados da criança.
    3. Recarregue o conjunto de dados ASAP.
    
Assim, isso causaERDDAP™para tentar novamente trabalhar com os arquivos anteriormente (erroneamente?) marcado como mau.
         
##### Bandeira dura{#hard-flag} 
* Outra variante do diretório /flag é o diretório /hardFlag. (Adicionado emERDDAP™V1.74.)   
Se você colocar um arquivo em *Diretriz de grande porte* /hardFlag com umdatasetIDcomo o nome do arquivo (o conteúdo do arquivo não importa) , então logoERDDAP™vê o difícil Arquivo da bandeira,ERDDAP™vontade:
    
    1. Excluir o arquivo hardFlag.
    2. Remover o conjunto de dadosERDDAP.
    3. Excluir todas as informações queERDDAP™tem armazenado sobre este conjunto de dados.
ParaEDDGridDos Ficheiros e Tabela EDD FromFiles subclasses, isso exclui o banco de dados interno de arquivos de dados e seu conteúdo.
Para conjuntos de dados comoEDDGridSideBySide que tem filhosDatasets, isso também exclui o banco de dados interno de arquivos de dados e seu conteúdo para todos os conjuntos de dados da criança.
    4. Recarregue o conjunto de dados.
ParaEDDGridDos Ficheiros e Tabela EDD Das subclasses de Ficheiros, isso causaERDDAP™para reler **Todos** dos arquivos de dados. Assim, o tempo de recarga depende do número total de arquivos de dados no conjunto de dados. Porque o conjunto de dados foi removidoERDDAP™quando o hardFlag foi notado, o conjunto de dados será indisponível até que o conjunto de dados terminar de recarregar. Sê paciente. Olha no[- Não.](#log)arquivo se você quiser ver o que está acontecendo.
    
A variante hardFlag exclui as informações armazenadas do conjunto de dados, mesmo que o conjunto de dados não seja carregado atualmenteERDDAP.
    
Duração Bandeiras são muito úteis quando você faz algo que causa uma mudança em comoERDDAP™lê e interpreta os dados de origem, por exemplo, quando você instala uma nova versão deERDDAP™ou quando você fez uma mudança na definição de um conjunto de dadosdatasets.xml
    
* O conteúdo da bandeira, arquivos badFilesFlag e hardFlag são irrelevantes.ERDDAP™apenas olha para o nome do arquivo para obter odatasetID.
     
* Entre grandes recargas de dados,ERDDAP™olha continuamente para a bandeira, arquivos badFilesFlag e hardFlag.
     
* Note que quando um conjunto de dados é recarregado, todos os arquivos no *Diretriz de grande porte* /[cache](#cached-responses)/ *datasetID* diretório são excluídos. Isso inclui.nce arquivos de imagem que são normalmente armazenados em cache por ~15 minutos.
     
* Note que se o xml do conjunto de dados incluir[Ativar = "falso"](/docs/server-admin/datasets#active), uma bandeira fará com que o conjunto de dados seja feito inativo (se estiver ativo) , e em qualquer caso, não recarregado.
     
* A qualquer horaERDDAP™executa LoadDatasets para fazer uma grande recarga (a recarga cronometrada controlada por&lt;loadDatasetsMinMinutes&gt;) ou uma pequena recarga (como resultado de uma bandeira externa ou interna) ,ERDDAP™lê tudo&lt;decompressedCacheMaxGB&gt;,&lt;decompressedCacheMaxMinutesOld&gt;,&lt;usuário&gt;,&lt;requestBlacklist&gt;,&lt;slowDownTroubleMillis&gt;, e&lt;AssinaturaEmailBlacklist&gt; tags e muda para as novas configurações. Então você pode usar uma bandeira como uma maneira de obterERDDAP™para notar mudanças nas tags ASAP.

##### Conjunto de dados{#set-dataset-flag} 
*  ERDDAP™tem um serviço web para que as bandeiras possam ser definidas através de URLs.
    
    * Por exemplo,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (É uma bandeira falsa. Chaveiro) irá definir uma bandeira para o conjunto de dados rPmelTao.
    * Há uma bandeira diferenteKey para cadadatasetID.
    * Os administradores podem ver uma lista de URLs de bandeira para todos os conjuntos de dados olhando para a parte inferior de seus[Relatório diário](#daily-report)E-mail.
    * Os administradores devem tratar essas URLs como confidenciais, já que dão a alguém o direito de redefinir um conjunto de dados à vontade.
    * Se você acha que o flagKeys caiu nas mãos de alguém que está abusando deles, você pode mudar&lt;flagKeyKey&gt; em[setup.xml](/docs/server-admin/deploy-install#setupxml)e reiniciarERDDAPà forçaERDDAP™para gerar e usar um conjunto diferente de flagKeys.
    * Se você mudar&lt;flagKeyKey&gt;, excluir todas as assinaturas antigas (veja a lista no seu Relatório Diário) e lembre-se de enviar os novos URLs para as pessoas que você quer tê-los.
    
O sistema de bandeira pode servir de base para um mecanismo mais eficiente para contarERDDAP™quando recarregar um conjunto de dados. Por exemplo, você pode definir um conjunto de dados&lt;reloadEveryNMinutes&gt; para um grande número (por exemplo, 10080 = 1 semana) . Então, quando você sabe que o conjunto de dados mudou (talvez porque você adicionou um arquivo ao diretório de dados do conjunto de dados) , definir uma bandeira para que o conjunto de dados seja recarregado o mais rápido possível. As bandeiras geralmente são vistas rapidamente. Mas se o fio LoadDatasets já estiver ocupado, pode ser um tempo antes de estar disponível para atuar na bandeira. Mas o sistema de bandeira é muito mais responsivo e muito mais eficiente do que definir&lt;reloadEveryNMinutes&gt; para um pequeno número.
    
#### Remover conjuntos de dados{#removing-datasets} 
Se um conjunto de dados estiver ativo emERDDAP™e você quer desativar temporariamente ou permanentemente:
1. Emdatasets.xmlpara o conjunto de dados, definido[Ativar = "falso"](/docs/server-admin/datasets#active)na tag de conjunto de dados.
2. Espera.ERDDAP™para remover o conjunto de dados durante a próxima grande recarga ou[definir uma bandeira](#flag)para o conjunto de dados para contarERDDAP™para notar esta mudança o mais rápido possível. Quando fazes isto,ERDDAP™não descarta qualquer informação que possa ter armazenado sobre o conjunto de dados e certamente não faz nada aos dados reais.
3. Então você pode deixar o conjunto de dados ativo="false" emdatasets.xmlou removê-lo.
         
#### Quando os conjuntos de dados são carregados?{#when-are-datasets-reloaded} 
Um thread chamado RunLoadDatasets é o fio mestre que controla quando os conjuntos de dados são recarregados. RunLoad loops de conjuntos de dados para sempre:

1. RunLoadDatasets observa o tempo atual.
2. RunLoadDatasets inicia uma linha LoadDatasets para fazer um "majorLoad". Você pode ver informações sobre o major atual / anteriorLoad no topo de seuERDDAP'
    [/erddap/status.htmlPágina](#status-page)  (por exemplo,[exemplo de página de status](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets faz uma cópia dedatasets.xml.
    2. LoadDatasets lê através da cópia dedatasets.xmle, para cada conjunto de dados, vê se o conjunto de dados precisa ser (re) carregado ou removido.
        * Se um[bandeira](#flag)arquivo existe para este conjunto de dados, o arquivo é excluído e o conjunto de dados é removido se active="false" ou (re) carregado se ativo="true" (independentemente da idade do conjunto de dados) .
        * Se o pedaço de dataset.xml do conjunto de dados tem active="false" e o conjunto de dados está atualmente carregado (ativo) , é descarregado (removido) .
        * Se o conjunto de dados tiver active="true" e o conjunto de dados ainda não estiver carregado, ele é carregado.
        * Se o conjunto de dados tiver active="true" e o conjunto de dados já estiver carregado, o conjunto de dados será recarregado se a idade do conjunto de dados (tempo desde a última carga) é maior do que sua&lt;recarregar Cada NMinuts&gt; (default = 10080 minutos) , caso contrário, o conjunto de dados é deixado sozinho.
    3. LoadDatasets termina.
    
O fio RunLoadDatasets espera que o fio LoadDatasets termine. Se LoadDatasets demorar mais do que carregarDatasets MinMinuts (como especificado em setup.xml) , RunLoadDatasets interrompe o fio LoadDatasets. Idealmente, LoadDatasets percebe a interrupção e termina. Mas se não notar a interrupção dentro de um minuto, RunLoadDatasets chama loadDatasets. Pare&#33; () , que é indesejável.
3. Enquanto o tempo desde o início do último majorLoad é menos do que carregarDatasets MinMinuts (como especificado em setup.xml, por exemplo, 15 minutos) , RunLoadDatasets procura repetidamente[bandeira](#flag)arquivos no *Diretriz de grande porte* diretório /flag. Se um ou mais arquivos de bandeira são encontrados, eles são excluídos, e RunLoadDatasets inicia um thread LoadDatasets para fazer um "minorLoad" (MajorLoad=falsificação) . Você não pode ver informações menores sobre o seuERDDAP'[/erddap/status.htmlPágina](#status-page).
    1. LoadDatasets faz uma cópia dedatasets.xml.
    2. LoadDatasets lê através da cópia dedatasets.xmle, para cada conjunto de dados para o qual havia um arquivo de bandeira:
        * Se o pedaço de dataset.xml do conjunto de dados tem active="false" e o conjunto de dados está atualmente carregado (ativo) , é descarregado (removido) .
        * Se o conjunto de dados tiver active="true", o conjunto de dados é (re) carregado, independentemente da sua idade. Os conjuntos de dados não registrados são ignorados.
    3. LoadDatasets termina.
4. RunLoad Os conjuntos de dados remontam ao passo 1.

Notas:
* Startup
Quando você reiniciarERDDAP™, cada conjunto de dados com active="true" é carregado.
* Cache
Quando um conjunto de dados é (re) carregado, seu cache (incluindo quaisquer arquivos de resposta de dados e / ou arquivos de imagem) é esvaziado.
* Muitos conjuntos de dados
Se você tiver muitos conjuntos de dados e/ou um ou mais conjuntos de dados são lentos (re) carga, uma linha LoadDatasets pode demorar muito tempo para terminar o seu trabalho, talvez até mais tempo do que carregarDatasets MinMinutes.
* Uma linha de dados de carga
Nunca há mais de um fio LoadDatasets rodando ao mesmo tempo. Se uma bandeira for definida quando LoadDatasets já estiver em execução, a bandeira provavelmente não será notada ou agida até que o thread LoadDatasets esteja em execução. Você pode dizer: "Isso é estúpido. Por que você não começa um monte de novos threads para carregar conjuntos de dados?" Mas se você tiver muitos conjuntos de dados que recebem dados de um servidor remoto, até mesmo um thread LoadDatasets colocará estresse substancial no servidor remoto. O mesmo é verdade se você tem muitos conjuntos de dados que obtêm dados de arquivos em um RAID. Há retornos de diminuição rápida de ter mais de um fio LoadDatasets.
* Bandeira = ASAP
Definir uma bandeira apenas sinaliza que o conjunto de dados deve ser (re) carregado o mais rápido possível, não necessariamente imediatamente. Se nenhum thread LoadDatasets estiver em execução, o conjunto de dados começará a ser recarregado dentro de alguns segundos. Mas se um fio LoadDatasets estiver sendo executado atualmente, o conjunto de dados provavelmente não será recarregado até que o fio LoadDatasets seja concluído.
* Arquivo de bandeira excluído
Em geral, se você colocar um arquivo de bandeira no *Diretriz de grande porte* diretório /erddap/flag (visitando a bandeira do conjunto de dados Url ou colocar um arquivo real lá) , o conjunto de dados geralmente será recarregado muito logo após que o arquivo de bandeira é excluído.
* Bandeira versus Pequena recarga CadaNMinuts
Se você tiver alguma forma externa de saber quando um conjunto de dados precisa ser recarregado e se for conveniente para você, a melhor maneira de garantir que um conjunto de dados esteja sempre atualizado é definir sua recarga EveryNMinutes para um grande número (10080?) e definir uma bandeira (através de um guião?) sempre que precisa ser recarregado. Esse é o sistemaEDDGridFromErddap e EDDTableFromErddap usam receber mensagens que o conjunto de dados precisa ser recarregado.
* Veja em log.txt
Muitas informações relevantes são escritas para o *Diretriz de grande porte* /logs/log.txt arquivo. Se as coisas não funcionam como você espera, olhando para log. txt permite diagnosticar o problema, descobrindo exatamente o queERDDAP™Sim.
    
    * Procure por "majorLoad=true" para o início dos principais threads LoadDataset.
    * Procure por "majorLoad=false" para o início de pequenos threads LoadDatasets.
    * Procurar um dado conjunto de dadosdatasetIDpara informações sobre ele ser (re) carregado ou seco.
        
          
         
#### Respostas de Cached{#cached-responses} 
Em geral,ERDDAP™não cache (loja) respostas às solicitações do usuário. A lógica era que a maioria dos pedidos seria ligeiramente diferente para que o cache não fosse muito eficaz. As maiores exceções são pedidos de arquivos de imagem (que estão em cache desde navegadores e programas comoGoogle Earthmuitas vezes renomear imagens) e pedidos de.ncarquivos (porque eles não podem ser criados na mosca) .ERDDAP™armazena arquivos em cache de cada conjunto de dados em um diretório diferente: *Diretriz de grande porte* /cache / *datasetID* uma vez que um único diretório de cache pode ter um grande número de arquivos que podem se tornar lentos para acessar.
Os arquivos são removidos do cache por uma das três razões:
* Todos os arquivos neste cache são excluídos quandoERDDAP™é reiniciado.
* Periodicamente, qualquer arquivo mais do que&lt;cacheMinuts&gt; velho (como especificado em[setup.xml](/docs/server-admin/deploy-install#setupxml)) será excluído. Remover arquivos no cache com base na idade (não Least-Recently-Used) garante que os arquivos não ficarão no cache muito tempo. Embora possa parecer que um pedido deve sempre retornar a mesma resposta, isso não é verdade. Por exemplo, umtabledappedido que inclui &time&gt; *alguns Tempo* mudará se novos dados chegarem para o conjunto de dados. E um pedido de griddap que inclui\\[último\\]para a dimensão do tempo vai mudar se novos dados chegam para o conjunto de dados.
* Imagens mostrando condições de erro são armazenadas em cache, mas apenas por alguns minutos (É uma situação difícil.) .
* Toda vez que um conjunto de dados é recarregado, todos os arquivos no cache do conjunto de dados são excluídos. Porque os pedidos podem ser para"last"indexe em um conjunto de dados gradeado, os arquivos no cache podem se tornar inválidos quando um conjunto de dados é recarregado.
         
#### Dados armazenados{#stored-dataset-information} 
Para todos os tipos de conjuntos de dados,ERDDAP™coleta muitas informações quando um conjunto de dados é carregado e mantém isso na memória. Isso permiteERDDAP™responder muito rapidamente a pesquisas, pedidos de listas de conjuntos de dados e pedidos de informações sobre um conjunto de dados.

Para alguns tipos de conjuntos de dados (notadamenteEDDGridEntendido, EDDTableCopy,EDDGridA partir de *Xxxx* Arquivos e EDDTable De *Xxxx* Arquivos) ,ERDDAP™armazena no disco algumas informações sobre o conjunto de dados que é reutilizado quando o conjunto de dados é recarregado. Isso acelera muito o processo de recarga.

* Alguns dos arquivos de informações do conjunto de dados são legíveis por humanos.jsonarquivos e são armazenados em *Diretriz de grande porte* /dataset/ *último2 LettersOfDatasetID/datasetID* .
*   ERDDAP™apenas exclui esses arquivos em situações incomuns, por exemplo, se você adicionar ou excluir uma variável do conjunto de dadosdatasets.xmlChuck.
* A maioria das alterações em um conjunto de dadosdatasets.xmlChuck. (por exemplo, alterar um atributo global ou um atributo variável) não precisa que você exclua esses arquivos. Uma recarga regular de conjuntos de dados irá lidar com esses tipos de mudanças. Você pode dizerERDDAP™para recarregar um conjunto de dados ASAP,[bandeira](#flag)para o conjunto de dados.
* Da mesma forma, a adição, exclusão ou mudança de arquivos de dados será tratada quandoERDDAP™recarrega um conjunto de dados. Mas...ERDDAP™notará este tipo de mudança em breve e automaticamente se o conjunto de dados estiver usando o [&lt;updateEveryNMillis&gt;] (/docs/admin/datasets#updateeverynmillis) sistema.
* Deve apenas raramente ser necessário para você excluir esses arquivos. A situação mais comum onde você precisa forçarERDDAP™para excluir as informações armazenadas (porque está fora de data / incorreto e não será automaticamente corrigidoERDDAP) é quando você faz alterações no conjunto de dadosdatasets.xmlchunk que afeta comoERDDAP™interpreta dados nos arquivos de dados de origem, por exemplo, alterando a string de formato da variável de tempo.
* Para excluir arquivos de informações armazenados de um conjunto de dados de umERDDAP™que está a correr (mesmo se o conjunto de dados não estiver carregado) , definir um[duro. Bandeira](#hard-flag)para esse conjunto de dados. Lembre-se que se um conjunto de dados é uma agregação de um grande número de arquivos, recarregar o conjunto de dados pode levar tempo considerável.
* Para excluir arquivos de informações armazenados de um conjunto de dados quandoERDDAP™não está correndo, corre[DasDds](/docs/server-admin/datasets#dasdds)para esse conjunto de dados (que é mais fácil do que descobrir em qual diretório a informação está localizada e excluir os arquivos pela mão) . Lembre-se que se um conjunto de dados é uma agregação de um grande número de arquivos, recarregar o conjunto de dados pode levar tempo considerável.
         
### Estado de memória{#memory-status} 
ERDDAP™Nunca deveria bater ou congelar. Se o fizer, uma das causas mais prováveis é memória insuficiente. Você pode monitorar o uso de memória olhando para a página web status.html, que inclui uma linha como

0 gc chamadas, 0 pedidos derramado, e 0 perigoso MemoryEmails desde os últimos grandes LoadDatasets

 (que são eventos progressivamente mais graves)   
e MB inUse e gc Chama colunas na tabela de estatísticas. Você pode dizer como a memória estressou suaERDDAP™é observando esses números. Números mais elevados indicam mais stress.

* MB inUse deve sempre ser menos da metade do[Configuração de memória \\-Xmx](/docs/server-admin/deploy-install#memory). Os números maiores são um mau sinal.
* chamadas gc indica o número de vezesERDDAP™chamou o coletor de lixo para tentar aliviar o uso de alta memória. Se isto chegar a 100, isso é um sinal de sérios problemas.
* shed indica o número de pedidos recebidos que foram derramados (com o número de erro HTTP 503, Serviço Indisponível) porque o uso da memória já era muito alto. Idealmente, nenhum pedido deve ser derramado. Não faz mal se algumas solicitações forem eliminadas, mas um sinal de sérios problemas se muitos forem derramados.
* perigosa MemoryEmails - Se o uso da memória se torna perigosamente alto,ERDDAP™envia um e-mail para os endereços de email listados em&lt;e-mail Tudo - A sério? (em setup.xml) com uma lista de solicitações de usuários ativos. Como o e-mail diz, envie esses e-mails para Chris. John no Noaa. para que possamos usar as informações para melhorar as versões futurasERDDAP.
     

Se vocêERDDAP™é memorizado:
* Considere alocar mais memória do seu servidor paraERDDAP™mudando o Tomcat[Configuração de memória ‐Xmx](/docs/server-admin/deploy-install#memory).
* Se você já alocou tanto memória quanto você pode paraERDDAP™via -Xmx, considere comprar mais memória para o seu servidor. A memória é barata (em comparação com o preço de um novo servidor ou seu tempo) &#33; Então aumente -Xmx.
* Emdatasets.xml, set&lt;nGridThreads&gt; para 1, conjunto&lt;nTableThreads&gt; para 1, e definir&lt;ipAddressMaxRequestsActive&gt; para 1.
* Veja as solicitações em log.txt para ineficiente ou problemático (mas legítimo) pedidos. Adicionar seus endereços IP para&lt;requestBlacklist&gt; emdatasets.xml. A mensagem de erro da lista negra incluiERDDAP™endereço de e-mail do administrador com a esperança de que esses usuários entrarão em contato com você para que você possa trabalhar com eles para usarERDDAP™mais eficientemente. É bom manter uma lista de endereços IP que você lista negra e por que, para que você possa trabalhar com os usuários se eles contatar você.
* Veja as solicitações em log.txt para pedidos de usuários maliciosos. Adicionar seus endereços IP para&lt;requestBlacklist&gt; emdatasets.xml. Se as solicitações semelhantes vêm de vários endereços IP semelhantes, você pode usar alguns serviços que-is (por exemplo,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) para descobrir o intervalo de endereços IP dessa fonte e lista negra toda a gama. Veja o [&lt;requestBlacklist&gt; documentation] (/docs/server-admin/datasets#requestblacklist) .
         
#### Erro{#outofmemoryerror} 
Quando você configuraERDDAP™, você especifica a quantidade máxima de memória queJavapode usar através do[Configuração de \\-Xmx](/docs/server-admin/deploy-install#memory). SeERDDAP™sempre precisa de mais memória do que isso, vai lançar uma java. Lang. OutOfMemoryError.ERDDAP™faz um monte de verificação para permitir que ele lidar com esse erro graciosamente (por exemplo, um pedido problemático falhará, mas o sistema mantém sua integridade) . Mas às vezes, o erro danifica a integridade do sistema e você tem que reiniciarERDDAP. Espero que isso seja raro.

A solução rápida e fácil para um OutOfMemoryError é aumentar o[Configuração de \\-Xmx](/docs/server-admin/deploy-install#memory), mas você nunca deve aumentar a configuração -Xmx para mais de 80% da memória física no servidor (por exemplo, para um servidor 10GB, não configure -Xmx acima de 8GB) . A memória é relativamente barata, então pode ser uma boa opção para aumentar a memória no servidor. Mas se você tiver maximizado a memória no servidor ou por outras razões não pode aumentá-la, você precisa lidar mais diretamente com a causa do OutOfMemoryError.

Se você olhar no[- Não.](#log)arquivo para ver o queERDDAP™estava fazendo quando o erro surgiu, você geralmente pode obter uma boa pista sobre a causa do OutOfMemoryError. Há muitas causas possíveis, incluindo:

* Um único arquivo de dados enorme pode causar o OutOfMemoryError, notavelmente, enormes arquivos de dados ASCII. Se este é o problema, deve ser óbvio porqueERDDAP™deixará de carregar o conjunto de dados (para conjuntos de dados tabulares) ou ler dados desse arquivo (para conjuntos de dados gradeados) . A solução, se possível, é dividir o arquivo em vários arquivos. Idealmente, você pode dividir o arquivo em pedaços lógicos. Por exemplo, se o arquivo tem 20 meses de dados, dividi-lo em 20 arquivos, cada um com 1 mês de dados. Mas há vantagens mesmo se o arquivo principal é dividido arbitrariamente. Esta abordagem tem vários benefícios: a) Isso reduzirá a memória necessária para ler os arquivos de dados para 1/20th, porque apenas um arquivo é lido em um momento. b) Muitas vezes,ERDDAP™pode lidar com pedidos muito mais rápido, porque só tem que olhar em um ou alguns arquivos para encontrar os dados para uma determinada solicitação. c) Se a coleta de dados estiver em andamento, os 20 arquivos existentes podem permanecer inalterados, e você só precisa modificar um, pequeno e novo arquivo para adicionar o valor dos dados do próximo mês para o conjunto de dados.
* Um único pedido enorme pode causar o OutOfMemoryError. Em particular, alguns dosorderByopções têm toda a resposta na memória por um segundo (por exemplo, para fazer uma espécie) . Se a resposta é enorme, pode levar ao erro. Haverá sempre alguns pedidos que são, de várias maneiras, muito grandes. Você pode resolver o problema aumentando a configuração -Xmx. Ou, você pode encorajar o usuário a fazer uma série de solicitações menores.
* É improvável que um grande número de arquivos causaria o índice de arquivo queERDDAP™cria para ser tão grande que esse arquivo causaria o erro. Se assumirmos que cada arquivo usa 300 bytes, então 1.000.000 arquivos só levariam 300MB. Mas os conjuntos de dados com um grande número de arquivos de dados causam outros problemas paraERDDAP, nomeadamente, demora muito tempoERDDAP™para abrir todos esses arquivos de dados ao responder a um pedido de usuário para dados. Neste caso, a solução pode ser agregar os arquivos para que haja menos arquivos de dados. Para conjuntos de dados tabulares, muitas vezes é ótimo se você salvar os dados do conjunto de dados atual no[CF Geometrias de amostragem discretas (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Arquivos de dados Ragged Array contígua (pedido.ncArquivos CF deERDDAP) e então fazer um novo conjunto de dados. Estes arquivos podem ser tratados de forma muito eficiente comERDDAP'[EDDTable FromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Se eles são logicamente organizados (cada um com dados para um pedaço de espaço e tempo) ,ERDDAP™pode extrair dados deles muito rapidamente.
* Para conjuntos de dados tabulares que usam o [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) atributo,ERDDAP™faz uma tabela de combinações únicas dos valores dessas variáveis. Para grandes conjuntos de dados ou quando&lt;subsetVariables&gt; é misconfigured, esta tabela pode ser grande o suficiente para causar OutOfMemoryErrors. A solução é remover variáveis da lista de&lt;subsetVariables&gt; para os quais há um grande número de valores, ou remover variáveis conforme necessário até que o tamanho dessa tabela seja razoável. As partes deERDDAP™que use osubsetVariablessistema não funciona bem (por exemplo, páginas web carregam muito lentamente) quando há mais de 100.000 linhas nessa tabela.
* É sempre possível que vários pedidos grandes simultâneos (em um muito ocupadoERDDAP) pode combinar para causar problemas de memória. Por exemplo, 8 pedidos, cada um usando 1GB cada, causaria problemas para uma configuração -Xmx=8GB. Mas é raro que cada pedido esteja no pico de seu uso de memória simultaneamente. E você seria facilmente capaz de ver que seuERDDAP™está muito ocupado com grandes pedidos. Mas é possível. É difícil lidar com este problema além de aumentar a configuração -Xmx.
* Há outros cenários. Se você olhar para o[- Não.](#log)arquivo para ver o queERDDAP™estava fazendo quando o erro surgiu, você geralmente pode obter uma boa pista sobre a causa. Na maioria dos casos, há uma maneira de minimizar esse problema (ver acima) , mas às vezes você só precisa de mais memória e uma configuração maior -Xmx.
         
### Muitos arquivos abertos{#too-many-open-files} 
Começar comERDDAP™v2.12,ERDDAP™tem um sistema para monitorar o número de arquivos abertos (que inclui soquetes e algumas outras coisas, não apenas arquivos) em Tomcat em computadores Linux. Se alguns arquivos erroneamente nunca se fechar (um "desvio de recursos") , o número de arquivos abertos pode aumentar até que exceda o máximo permitido pelo sistema operacional e muitas coisas realmente ruins acontecem. Então agora, em computadores Linux (porque a informação não está disponível para Windows) :

* Há uma coluna "Open Files" na extrema direita da página web status.html mostrando a porcentagem de arquivos máximos abertos. No Windows, apenas mostra "?".
* QuandoERDDAP™gera essas informações no final de cada grande recarga de conjunto de dados, ele vai imprimir no log. arquivo txt:
O que é que se passa? *corrente de corrente* de máx. *máx.* % *%* 
* Se a porcentagem for de &gt;50%, um e-mail é enviado paraERDDAP™administrador e e-mail Tudo Para endereços de e-mail.

Se o percentual for 100%,ERDDAP™está em apuros. Não deixes que isto aconteça.
Se a percentagem for de &gt;75%,ERDDAP™está perto de problemas terríveis. Não está bem.
Se a porcentagem for &gt;50%, é muito possível que um ponto fará com que a porcentagem atinja 100.
Se a porcentagem for sempre &gt;50%, você deve:
* Aumente o número máximo de arquivos abertos permitidos por:
    * Fazer essas mudanças cada vez antes de começar a fazer (colocá-los no arquivo Tomcat startup.sh?) :
ulimite -Hn 16384
ulimite -Sn 16384
    * Ou fazendo uma mudança permanente editando (como raiz) /etc/security/limits.conf e adicionando as linhas:
tomcat soft nofile 16384
tomcat hard nofile 16384
Esses comandos assumem que o usuário executando Tomcat é chamado de "tomcat".
Em muitas variantes Linux, você tem que reiniciar o servidor para aplicar essas mudanças. Para ambas as opções, o "16384" acima é um exemplo. Você escolhe o número que você acha melhor.
* ReinicieERDDAP. O sistema operacional irá fechar quaisquer arquivos abertos.
         
### Pedidos Falhados{#failed-requests} 
*    **Actividade não habitual: &gt;25% dos pedidos falharam**   
Como parte de cada reloadDatasets, que é geralmente a cada 15 minutos,ERDDAP™olha para a porcentagem de pedidos que falharam desde a última recargaDatasets. Se for &gt;25%,ERDDAP™envia um e-mail para oERDDAP™administrador com o assunto "Atividade incomum: &gt;25% dos pedidos falharam". Esse e-mail inclui um tally perto do fundo intitulado "Requester's IP Address (Falhado)   (desde os últimos grandes conjuntos de dados de carga) ". Procura por isso. Ele diz-lhe o endereço IP dos computadores que fazem as solicitações mais fracassadas. Você pode então procurar esses endereços IP no\\[Diretriz de grande porte\\]/logs /[- Não.](#log)arquivo e ver que tipo de pedidos eles estão fazendo.
    
Você pode usar o número de IP do usuário (por exemplo, com[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) para tentar descobrir quem ou o que o usuário é. Às vezes isso irá dizer-lhe com precisão quem é o usuário (por exemplo, é um rastreador web de um motor de busca) . Na maior parte do tempo, apenas lhe dá uma pista (Por exemplo, é um computador de amazonaws, é de uma universidade, é alguém numa cidade específica.) .
    
Ao olhar para a solicitação real, o número IP e a mensagem de erro (de todos[- Não.](#log)) para uma série de erros, você geralmente pode descobrir basicamente o que está errado. Na minha experiência, existem quatro causas comuns de muitos pedidos falhados:
    
1) Os pedidos são maliciosos (por exemplo, procurando fraquezas de segurança, ou fazendo pedidos e, em seguida, cancelá-los antes de serem concluídos) . Você deve usar&lt;requestBlacklist&gt; emdatasets.xmlpara lista negra esses endereços IP.
    
2) Um motor de busca está ingenuamente tentando as URLs listadas emERDDAP™páginas web e documentos ISO 19115. Por exemplo, há muitos lugares que listam a baseOPeNDAPURL, por exemplo, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , para o qual o usuário deve adicionar um tipo de arquivo (por exemplo, .das, .dds, .html) . Mas o motor de busca não sabe disso. E a solicitação para a URL base falha. Uma situação relacionada é quando o motor de busca gera pedidos bizarros ou tenta preencher formulários para chegar a páginas web "escondidas". Mas os motores de busca muitas vezes fazem um mau trabalho disto, levando a falhas. A solução é: criar um[robots.txt](#robotstxt)ficheiro.
    
3) Algum usuário está executando um script que está repetidamente pedindo algo que não está lá. Talvez seja um conjunto de dados que costumava existir, mas desapareceu agora (temporariamente ou permanentemente) . Os scripts muitas vezes não esperam isso e assim não lidam com isso de forma inteligente. Então o script continua fazendo pedidos e os pedidos continuam falhando. Se você pode adivinhar quem é o usuário (do número IP acima) , contatá-los e dizer-lhes que o conjunto de dados não está mais disponível e pedir-lhes para alterar o seu script.
    
4) Algo está realmente errado com algum conjunto de dados. Normalmente,ERDDAP™tornará o conjunto de dados problemático inativo. Às vezes não, então todos os pedidos para ele apenas levam a erros. Se assim for, corrigir o problema com o conjunto de dados ou (se não puderes) definir o conjunto de dados para[Ativar = "falso"](/docs/server-admin/datasets#active). Claro, isso pode levar ao problema #2.
    
Às vezes os erros não são tão maus, notavelmente, seERDDAP™pode detectar o erro e responder muito rapidamente (&lt;= 1ms). Então você pode decidir não tomar nenhuma ação.
    
Se tudo o resto falhar, há uma solução universal: adicione o número IP do usuário ao [&lt;requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) . Isto não é tão mau ou tão drástica uma opção como pode parecer. O usuário receberá então uma mensagem de erro dizendo que ele/ela foi listado e dizendo-lhes seu (oERDDAP™administrador) endereço de email. Às vezes o usuário entrará em contato com você e você pode resolver o problema. Às vezes, o usuário não entra em contato com você e você verá o mesmo comportamento que vem de um número IP diferente no dia seguinte. Blacklist o novo número de IP e espero que eles eventualmente consigam a mensagem. (Ou este é o seu Dia Groundhog, do qual você nunca vai escapar. Desculpa.) 
    
### robots.txt{#robotstxt} 
As empresas de mecanismos de pesquisa usam rastreadores web (por exemplo, Google Botão) para examinar todas as páginas na web para adicionar o conteúdo aos mecanismos de busca. ParaERDDAP™Isso é basicamente bom.ERDDAP™tem muitos links entre páginas, então os rastreadores vão encontrar todas as páginas da web e adicioná-los aos motores de busca. Em seguida, os usuários dos mecanismos de busca serão capazes de encontrar conjuntos de dados em seusERDDAP.
    
Infelizmente, alguns rastreadores web (por exemplo, Google Botão) estão agora preenchendo e enviando formulários para encontrar conteúdo adicional. Para sites de comércio web, isso é ótimo. Mas isto é terrível paraERDDAP™porque só leva a um **infinito** número de tentativas indesejáveis e inúteis para rastrear os dados reais. Isso pode levar a mais pedidos de dados do que de todos os outros usuários combinados. E preenche o motor de busca com subconjuntos goofy, pointless dos dados reais.
    
Para dizer aos rastreadores web para parar de preencher formulários e simplesmente geralmente não olhar para páginas da web que eles não precisam olhar, você precisa criar um arquivo de texto chamado[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)no diretório raiz da hierarquia de documentos do seu site para que ele possa ser visto por qualquer pessoa como, por exemplo, http://*www.your.domain*/robots.txt .
Se você está criando um novo robô. arquivo txt, este é um bom começo:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Mas substitua *seu.institutions.url* com o seuERDDAPURL base.)   
Pode levar alguns dias para que os motores de busca notem e para que as mudanças tenham efeito.
     
### sitemap.xml{#sitemapxml} 
Como[ https://www.sitemaps.org ](https://www.sitemaps.org/)site diz:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Na verdade, desdeERDDAP™éRESTful, as aranhas do motor de busca podem rastejar facilmenteERDDAP. Mas eles tendem a fazê-lo mais frequentemente (diariamente&#33;) do que necessário (mensal?) .

* Dado que cada motor de busca pode estar rastejando todo o seuERDDAP™todos os dias, isso pode levar a muitos pedidos desnecessários.
* Então...ERDDAP™gera um arquivo sitemap.xml para o seuERDDAP™que diz aos motores de busca que seuERDDAP™Só precisa de ser rastejado todos os meses.
* Você deve adicionar uma referência aERDDAP's sitemap.xml para o seu[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)arquivo:
Mapa do site: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Se isso não parece estar recebendo a mensagem para os rastreadores, você pode dizer aos vários motores de busca sobre o arquivo sitemap.xml visitando essas URLs (mas mudar **Sua instituição** à sigla ou abreviação da sua instituição **www.yoursite.org** para o seuERDDAPA URL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I pense) você só precisa ping cada motor de busca uma vez, por todo o tempo. Os motores de busca detectarão alterações no sitemap.xml periodicamente.
     
### Disseminação de dados / Distribuição de dados Redes:PushePullTecnologia{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalmente,ERDDAP™age como um intermediário: leva um pedido de um usuário; recebe dados de uma fonte de dados remota; reformata os dados; e o envia para o usuário.
*   [PullTecnologia](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™também tem a capacidade de obter ativamente todos os dados disponíveis de uma fonte de dados remota e[armazenar uma cópia local dos dados](/docs/server-admin/datasets#eddgridcopy).
*   [PushTecnologia](https://en.wikipedia.org/wiki/Push_technology): UsandoERDDAP'[serviços de assinatura](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), outros servidores de dados podem ser notificados assim que novos dados estiverem disponíveis para que possam solicitar os dados (puxando os dados) .
*   ERDDAP'[EDDGridDe Erddap](/docs/server-admin/datasets#eddfromerddap)e[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)usoERDDAPServiços de assinatura e[sistema de bandeira](#flag)para que seja notificado imediatamente quando novos dados estiverem disponíveis.
* Você pode combiná-los em grande efeito: se você embrulhar umEDDGridCopiar em torno de umEDDGridConjunto de dados Erddap (ou envolva um EDDTableCopy em torno de um conjunto de dados EDDTableFromErddap) ,ERDDAP™criará e manterá automaticamente uma cópia local de outraERDDAPÉ um conjunto de dados.
* Como os serviços de assinatura funcionam assim que novos dados estão disponíveis, a tecnologia push divulga dados muito rapidamente (dentro de segundos) .

Esta arquitetura coloca cada umERDDAP™administrador encarregado de determinar onde os dados para o seuERDDAP™vem de.

* OutrosERDDAP™administradores podem fazer o mesmo. Não há necessidade de coordenação entre administradores.
* Se muitosERDDAP™administradores vinculam uns aos outrosERDDAPs, uma rede de distribuição de dados é formada.
* Os dados serão rapidamente, eficientemente e automaticamente divulgados a partir de fontes de dados (ERDDAPs e outros servidores) para sites de redistribuição de dados (ERDDAPS) em qualquer lugar da rede.
* Um dadoERDDAP™pode ser uma fonte de dados para alguns conjuntos de dados e um site de redistribuição para outros conjuntos de dados.
* A rede resultante é aproximadamente semelhante às redes de distribuição de dados criadas com programas como[UnidataIDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), mas menos rigidamente estruturado.
         
### Segurança, Autenticação e Autorização{#security-authentication-and-authorization} 
Por padrão,ERDDAP™funciona como um servidor totalmente público (usandohttpe/ouhttps) sem login ([autenticação](https://en.wikipedia.org/wiki/Authentication)) sistema e sem restrições ao acesso de dados ([autorização](https://en.wikipedia.org/wiki/Authorization)) .

#### Segurança{#security} 
Se você quiser restringir o acesso a alguns ou todos os conjuntos de dados para alguns usuários, você pode usarERDDAPO sistema de segurança integrado. Quando o sistema de segurança estiver em uso:

*   ERDDAP™uso[controle de acesso baseado em funções](https://en.wikipedia.org/wiki/Role-based_access_control).
    * OERDDAP™administrador define usuários com o [&lt;usuário&gt; (/docs/admin/datasets#user) Identificaçãodatasets.xml. Cada usuário tem um nome de usuário, uma senha (se a autenticação = personalizada) , e um ou mais papéis.
    * OERDDAP™administrador define quais funções têm acesso a um dado conjunto de dados através do [&lt;acessível para&gt; (/docs/admin/datasets#acessível para) Identificaçãodatasets.xmlpara qualquer conjunto de dados que não deve ter acesso público.
* O status de login do usuário (e um link para fazer login/out) será mostrado no topo de cada página web. (Mas um usuário conectado apareceráERDDAP™para não estar conectado se ele usa umhttpURL.) 
* Se o&lt;baseUrl&gt; que você especificar em seu setup.xml é um **http** URL, os usuários que não estão conectados podem usarERDDAP' **http** URLs. Se&lt;baseHttpsUrl&gt; também é especificado, os usuários que não estão conectados também podem usarhttpsURLs.
* HTTPS Only -- Se o&lt;baseUrl&gt; que você especificar em seu setup.xml é um **https** URL, os usuários que não estão conectados são encorajados (não forçado) para usarERDDAP' **https** URLs -- todos os linksERDDAP™páginas web se referirão ahttpsURLs.
    
Se você quiser forçar os usuários a usarhttpsURL, adicione uma linha permanente redirecionada dentro da&lt;VirtualHost \\*:80&gt; seção no arquivo de configuração do seu Apache (geralmentehttpD.conf.) , por exemplo,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Se você quiser, há um método adicional para forçar o uso dehttps: [Segurança de transporte restrito HTTP (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Para usá-lo:
    
    1. Ativar o Apache Headers Module: a2enmod headers
    2. Adicione o cabeçalho adicional à diretiva HTTPS VirtualHost. A idade máxima é medida em segundos e pode ser definida com algum valor longo.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Por favor, note que este cabeçalho só é válido em um HTTPS VirtualHost.
    
Uma razão para não forçar os usuários a usarhttpsURLs é: o link SSL/TLS subjacente leva tempo para estabelecer e, em seguida, leva tempo para criptografar e descriptografar todas as informações transmitidas entre o usuário e o servidor. Mas algumas instituições exigemhttpsSó.
    
* Usuários que estão conectados DEVE usarERDDAP' **https** URLs. Se eles usaremhttpURLs, eles aparecem paraERDDAP™para não estar conectado. Isso garante a privacidade das comunicações e ajuda a prevenir[seqüestro de sessão e sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Qualquer pessoa que não esteja conectado pode acessar e usar os conjuntos de dados públicos. Por padrão, os conjuntos de dados privados não aparecem em listas de conjuntos de dados se um usuário não estiver conectado. Se o administrador tiver definido setup.xml's&lt;listPrivateDatasets&gt; para true, eles aparecerão. Tentativas de solicitar dados de conjuntos de dados privados (se o usuário conhece a URL) será redirecionado para a página de login.
* Qualquer pessoa que esteja logado será capaz de ver e solicitar dados de qualquer conjunto de dados público e qualquer conjunto de dados privado para o qual seu papel lhes permita acessar. Por padrão, os conjuntos de dados privados aos quais um usuário não tem acesso não aparecem em listas de conjuntos de dados. Se o administrador tiver definido setup.xml's&lt;listPrivateDatasets&gt; para true, eles aparecerão. As tentativas de solicitar dados de conjuntos de dados privados para os quais o usuário não tem acesso serão redirecionadas para a página de login.
* ORSSinformações para conjuntos de dados totalmente privados só está disponível para usuários (eRSSleitores) que estão conectados e autorizados a usar esse conjunto de dados. Isto fazRSSnão muito útil para conjuntos de dados totalmente privados.
    
Se um conjunto de dados é privado, mas seu [&lt;gráficosAccessibleTo&gt;] (/docs/server-admin/datasets#graphsacessível a) está definido para público, o conjunto de dadosRSSé acessível a qualquer um.
    
* As assinaturas de e-mail só podem ser configuradas quando um usuário tem acesso a um conjunto de dados. Se um usuário se inscrever em um conjunto de dados privado, a assinatura continua a funcionar após o usuário ter feito login.

##### Segurança de configuração{#setup-security} 
Para configurar o sistema de segurança/autenticação/autorização:

* Faça o padrãoERDDAP™ [configuração inicial](/docs/server-admin/deploy-install).
* Em[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Adicionar/mudar&lt;autenticado&gt; valor de nada para personalizado (Não use isto.) , e-mail (Não use isto.) , google (recomendado) , (recomendado) , ou oauth2 (que é google+orcid, recomendado) . Veja os comentários sobre essas opções abaixo.
    * Adicionar/mudar&lt;baseHttpsUrl&gt; valor.
    * Inserção/descomposição&loginInfo;em&lt;startBodyHtml&gt; para exibir as informações de login / saída do usuário no topo de cada página da web.
* Para fins de teste em seu computador pessoal,[siga estas instruções para configurar o tomcat para suportar SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (a base parahttpsconexões) criando uma keystore com uma[certificado auto-assinado](https://en.wikipedia.org/wiki/Self-signed_certificate)e modificando *Toca a brincar.* /conf/server.xml para descommentir o conector para a porta 8443. No Windows, você pode precisar mover .keystore de "c:\\Users\\ *tu* \\.keystore" para "c:\\Users\\\Default User\\.keystore" ou "c:\\.keystore" (ver *Toca a brincar.* /logs/catalina. *hoje* .log se o aplicativo não carregar ou os usuários não podem ver o log na página) . Você pode ver quando o certificado .keystore expirar examinando o certificado quando fizer login.
    
Para um servidor acessível publicamente, em vez de usar um certificado auto-assinado, recomenda-se fortemente que você compre e instale um certificado assinado por um[autoridade de certificação](https://en.wikipedia.org/wiki/Certificate_authority), porque dá aos seus clientes mais garantia de que eles estão realmente se conectando com o seuERDDAP™, não a versão de um homem no meio da suaERDDAP. Muitos fornecedores vendem certificados digitais. (Procure na web.) Eles não são caros.
    
* Em computadores Linux, se Tomcat estiver em execução no Apache, modifique o /etc/httparquivo d/conf.d/sl.conf para permitir o tráfego HTTPSERDDAP™sem exigir o número da porta :8443 na URL:
    1. Modifique o existente&lt;VirtualHost&gt; tag (se houver um) , ou adicionar um no final do arquivo para que pelo menos tenha essas linhas:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Então reinicie Apache: /usr/sbin/apachectl -k gracioso (mas às vezes é em um diretório diferente) .
* Em *Toca a brincar.* /conf/server.xml, descommenta a porta=8443&lt;Conector&gt; tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
e alterar a localização do certificadoKeystoreFile.
##### Autorização{#authorization} 
*   [Emdatasets.xml, criar um](#authorization)Não.&lt;usuário&gt; (/docs/admin/datasets#user) tag para cada usuário com nome de usuário, senha (se autorizar = personalizado) , e funções de informação. Esta é a parte de autorizaçãoERDDAPO sistema de segurança.
     
* Emdatasets.xmlAdicionar um [&lt;acessível para&gt; (/docs/admin/datasets#acessível para) tag para cada conjunto de dados que não deve ter acesso público.&lt;accessTo&gt; permite especificar quais funções têm acesso a esse conjunto de dados.
     
* Reinicie Tomcat. Problemas? Verifica os registos do Tomcat.
     
* Vai buscar o teu trabalho&#33; Qualquer erro pode levar a uma falha de segurança.
     
* Verifique se a página de login usahttps  (nãohttp) . Tentativas de login viahttpdeve ser redirecionado automaticamente parahttpse porta 8443 (embora o número de porta pode ser escondido através de um proxy Apache) . Você pode precisar trabalhar com seu administrador de rede para permitir solicitações externas da Web para acessar a porta 8443 em seu servidor.
     
* Você pode mudar o&lt;usuário&gt; e&lt;tags acessíveisTo&gt; a qualquer momento. As alterações serão aplicadas na próxima recarga regular de qualquer conjunto de dados, ou ASAP se você usar um[bandeira](#flag).

##### Autenticação{#authentication} 
[ **Autenticação (Entrar em contato) ** ](#authentication)  
Se você não quiser permitir que os usuários entrem, não especifique um valor para&lt;autenticação&gt; em setup.xml.
Se você quiser permitir que os usuários entrem, você deve especificar um valor para&lt;autenticação&gt;. Atualmente,ERDDAP™suportes
[personalizado](#custom)  (Não use isto.) ,
[e-mail](#email)  (Não use isto.) ,
[Google](#google)  (recomendado) ,
[orcid](#orcid)  (recomendado) e
[oauth2](#oauth2)  (recomendado) para o método de autenticação.
Se você quiser ativar o login, recomendamos fortemente o google, orcid, ou oauth2 opções porque eles liberam você de armazenar e lidar com as senhas do usuário (necessário para o costume) e são mais seguros do que a opção de e-mail. Lembre-se que os usuários frequentemente usam a mesma senha em diferentes sites. Então eles podem estar usando a mesma senha para o seuERDDAP™como fazem no banco deles. Isso torna sua senha muito valiosa - muito mais valiosa para o usuário do que apenas os dados que eles estão solicitando. Então você precisa fazer o máximo que puder para manter as senhas privadas. É uma grande responsabilidade. O e-mail, google, orcid e oauth2 opções cuidar de senhas, então você não tem que reunir, armazenar ou trabalhar com eles. Então estás livre dessa responsabilidade.

Tudo&lt;autenticação&gt; opções usam um[cookies](https://en.wikipedia.org/wiki/HTTP_cookie)no computador do usuário, então o navegador do usuário deve ser definido para permitir cookies. Se um usuário está fazendoERDDAP™pedidos de um programa de computador (não um navegador) , cookies e autenticação são difíceis de trabalhar. Isso é um problema comum com todos os sistemas de autenticação. Desculpa.

Os detalhes do&lt;autenticação opções são:

###### Personalizado{#custom} 
personalizado éERDDAP's sistema personalizado para deixar os usuários fazer login digitando seu nome de usuário e senha em um formulário em uma página da web. Se um usuário tentar e não logar em 3 vezes dentro de 10 minutos, o usuário está bloqueado de tentar fazer login por 10 minutos. Isso impede os hackers de simplesmente tentar milhões de senhas até que eles encontrem o certo.

Isso é um tanto seguro porque o Nome do Usuário e a Senha são transmitidos viahttps  (nãohttp) , mas autenticação=google, orcid, ou oauth2 são melhores porque eles liberam você de ter que lidar com senhas. A abordagem personalizada exige que você colete o nome de um usuário e um resumo hash de sua senha (Usa o teu telemóvel&#33; e-mail não é seguro&#33;) e guardá-los emdatasets.xmlem&lt;usuário&gt; (/docs/admin/datasets#user) etiquetas.

Com a opção personalizada, ninguém pode fazer login até você (oERDDAP™administrador) criar um&lt;user&gt; tag para o usuário, especificando o nome do usuário como o nome de usuário, o hash digest de sua senha como a senha e suas funções.

Não Recomendado
Por causa da constrangimento de gerar e transmitir o resumo hash da senha do usuário e por causa dos riscos associados comERDDAP™segurando o hash digests das senhas, esta opção não é recomendada.

Para aumentar a segurança desta opção:

* Você precisa ter certeza de que outros usuários no servidor (ou seja, usuários de Linux, nãoERDDAP™usuários) não pode ler arquivos no diretório Tomcat (especialmente odatasets.xmlarquivo&#33;) ouERDDAPÉ a grande Diretiva Parent.
No Linux, como user=tomcat, use:
chmod -R g-rwx *Diretriz de grande porte*   
Cómodo - R o-rwx *Diretriz de grande porte*   
chmod -R g-rwx *Gerenciamento de contas*   
Cómodo - R o-rwx *Gerenciamento de contas*   
     
* Usar UEPSHA256 para&lt;passwordEncoding&gt; em setup.xml.
     
* Use um método como seguro como possível para passar o resumo hash da senha do usuário para o usuárioERDDAP™administrador (telefone?) .
         
###### e-mail{#email} 
A opção de autenticação por e-mail usa a conta de e-mail do usuário para autenticar o usuário (enviando-lhes um e-mail com um link especial que eles têm que acessar para entrar) . Ao contrário de outros emails queERDDAP™envia,ERDDAP™não escreve esses e-mails de convite para o arquivo de registro de e-mail porque eles contêm informações confidenciais.
Em teoria, isso não é muito seguro, porque os e-mails nem sempre são criptografados, então um cara ruim com a capacidade de interceptar e-mails pode abusar deste sistema usando o endereço de e-mail do usuário válido e interceptando o e-mail do convite.
Na prática, se você configurarERDDAP™para usar uma conta de e-mail do Google para enviar e-mails, e se você configurá-lo para usar uma das opções TLS para a conexão, e se o usuário tem uma conta de e-mail do Google, isso é um tanto seguro porque os e-mails são criptografados todo o caminho a partirERDDAP™ao usuário.

Para aumentar a segurança desta opção:

* Certifique-se de que outros usuários no servidor (ou seja, usuários de Linux, nãoERDDAP™usuários) não pode ler arquivos no diretório Tomcat ouERDDAPÉ a grande Diretiva Parent.
No Linux, como user=tomcat, use:
chmod -R g-rwx *Diretriz de grande porte*   
Cómodo - R o-rwx *Diretriz de grande porte*   
chmod -R g-rwx *Gerenciamento de contas*   
Cómodo - R o-rwx *Gerenciamento de contas*   
     
* Configure as coisas para obter segurança de ponta a ponta para os e-mails enviados deERDDAP™aos usuários. Por exemplo, você pode fazer um sistema centrado no Google apenas criando&lt;tags user&gt; para endereços de e-mail gerenciados pelo Google e configurando seuERDDAP™para usar um servidor de email do Google através de uma conexão segura / TLS: em seu setup.xml, use por exemplo,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Não Recomendado
A opção de autenticação por e-mail não é recomendada. Por favor, use o google, orcid, ou oauth2 opção em vez.

Como com o google, orcid e oauth2 opções, e-mail é muito conveniente paraERDDAP™administradores -- você nunca tem que lidar com senhas ou seus resumos hash. Tudo que você precisa criar é um [&lt;usuário&gt; (/docs/admin/datasets#user) tag para um usuário emdatasets.xmlé o endereço de e-mail do usuário, queERDDAP™usa como nome do usuário. (O atributo password não é usado quando autenticação=email, google, orcid ou oauth2.) 

Com a opção de e-mail, apenas usuários que têm uma&lt;usuário&gt; tag indatasets.xmlpode tentar fazer login paraERDDAP™fornecendo seu endereço de e-mail e clicando no link no e-mail queERDDAP™envia-os.

ERDDAP™trata endereços de e-mail como caso-insensível. Ele faz isso convertendo endereços de e-mail que você digita (em&lt;tags do usuário&gt;) ou usuários entram (no formulário de login) para a sua versão minúscula.

Para configurar autenticação=email:

1. Em seu setup.xml, mude o&lt;valor da tag baseHttpsUrl&gt;.
Para experimentar/trabalhar em seu computador pessoal, use
     https://localhost:8443   
Pelo seu públicoERDDAP™, uso
     https://*your.domain.org*:8443   
ou sem o :8443 se você estiver usando um Apache[proxy](/docs/server-admin/deploy-install#proxypass)para que o número da porta não seja necessário.
     
2. Em seu setup.xml, mude o&lt;autenticação valor da tag para e-mail:
```
    <authentication>email</authentication>  
```

3. Em seu setup.xml, certifique-se de que o sistema de e-mail é configurado através de todo o&lt;e-mail...&gt; tags, para queERDDAP™pode enviar e-mails. Se possível, configure isso para usar uma conexão segura (SSL / TLS) para o servidor de email.
     
4. Em seudatasets.xml, criar [&lt;usuário&gt; (/docs/admin/datasets#user) tags para cada usuário que terá acesso a conjuntos de dados privados.
Use o endereço de e-mail do usuário como o nome de usuário na tag.
Não especifique o atributo password na tag de utilizador.
     
5. ReinicieERDDAP™para que as alterações no setup.xml edatasets.xmlToma efeito.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **Google** ](#google),[ **orcid** ](#orcid)e[ **oauth2** ](#oauth2)   (recomendado)   
Todas as três opções são recomendadasERDDAP™opções de autenticação. São todas as opções mais seguras. As outras opções têm segurança significativamente mais fraca.
     
###### Google - Serviço técnico para computadores{#google} 
* A opção de autenticação do google usa[Sinalização Com o Google](https://developers.google.com/identity/gsi/web/guides/overview), que é uma implementação da[Protocolo de autenticação OAuth 2.0](https://oauth.net/2/).ERDDAP™usuários se inscrevem em sua conta de e-mail do Google, incluindo contas gerenciadas pelo Google, como@noaa.govcontas. Isso permiteERDDAP™para verificar a identidade do usuário (nome e endereço de e-mail) e acessar sua imagem de perfil, mas não dáERDDAP™acesso a seus e-mails, seu Google Drive ou qualquer outra informação privada.
    
ParaERDDAP™v2.22 e abaixo,ERDDAP™usado "Google Sign-In". Google diz que o sistema é desprezado após 31 de março de 2023. Se você ainda não fez isso, por favor, mude paraERDDAP™v2.23+ para usar o novo sistema de autenticação baseado em "Sign In with Google".
    
ParaERDDAP™v2.23 instâncias com um Content-Security-Policy configurado e usando o Google Authentication, você precisa adicionar https://accounts.google.com para a lista de script-src permitido (ou script-src-elem) .ERDDAP™não utiliza mais https://apis.google.com , então se você tiver isso permitido, você pode ser capaz de removê-lo agora.
    
ParaERDDAP™v2.24+ você também pode precisar adicionar https://accounts.google.com/gsi/style para stlye-src e https://accounts.google.com/gsi/ para conectar-src. Para o script-src você agora pode usar https://accounts.google.com/gsi/client.
 
    
Para mais informações você pode ir para o[Página do Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sobre a configuração CSP. Se tiver alguma dúvida, contacte chris.john noaaa.gov.
         
###### Orcid{#orcid} 
* A opção de autenticação orcid usa[Autenticação orcid](https://members.orcid.org/api/integrate/orcid-sign-in), que é uma implementação da[Protocolo de autenticação OAuth 2.0](https://oauth.net/2/).ERDDAP™usuários assinam em seu[Conta orcid](https://members.orcid.org/api/integrate/orcid-sign-in), que é comumente usado por pesquisadores para identificar-se. Isso permiteERDDAP™para verificar a identidade Orcid do usuário e obter seu número de conta Orcid, mas não dáERDDAP™acesso a outras informações da conta Orcid.

###### Oauth2{#oauth2} 
* A opção oauth2 permite que os usuários entrem com sua conta do Google ou sua conta Orcid.

As opções google, orcid e oauth2 são os sucessores da opção openid, que foi descontinuado apósERDDAP™versão 1.68, e que foi baseado em uma versão aberta Identificação que agora está fora de data. Por favor, mude para o google, orcid, ou oauth2 opção.

Estas opções são muito convenientes paraERDDAP™administradores -- você nunca tem que lidar com senhas ou seus resumos hash. Tudo que você precisa criar é um [&lt;usuário&gt; (/docs/admin/datasets#user) tag para um usuário emdatasets.xmlque especifica o endereço de e-mail do usuário do Google ou o número de conta Orcid como o atributo de nome de usuário. (O atributo password não é usado quando autenticação=email, google, orcid ou oauth2.) 

Com estas opções, qualquer pessoa pode fazer login paraERDDAP™assinando em sua conta de e-mail do Google ou conta Orcid, mas ninguém terá o direito de acessar conjuntos de dados privados até você (oERDDAP™administrador) criar um&lt;user&gt; tag, especificando seu endereço de e-mail do Google ou número de conta Orcid como o nome de usuário e especificando suas funções.

ERDDAP™trata endereços de e-mail como caso-insensível. Ele faz isso convertendo endereços de e-mail que você digita (em&lt;tags do usuário&gt;) ou usuários entram (no formulário de login) para a sua versão minúscula.

Para configurar a autenticação google, orcid ou oauth2:

* Em seu setup.xml, mude o&lt;valor da tag baseHttpsUrl&gt;.
Para experimentar/trabalhar em seu computador pessoal, use
     https://localhost:8443   
Pelo seu públicoERDDAP™, uso
     https://*your.domain.org*:8443   
ou, melhor, sem o :8443 se você estiver usando um Apache[proxy](/docs/server-admin/deploy-install#proxypass)para que o número da porta não seja necessário.
     
* Em seu setup.xml, mude o&lt;autenticação valor da tag para google, orcid, ou oauth2, por exemplo:
```
    <authentication>oauth2</authentication>  
```
###### Configuração do Google{#google-setup} 
* Para o google e oauth2 opções:
Siga as instruções abaixo para configurar a autenticação do Google para suaERDDAP.
     
    1. Se você não tiver uma conta de e-mail do Google,[criar um](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Seguir[estas instruções](https://developers.google.com/identity/sign-in/web/devconsole-project)para criar um projeto do Google Developers Console e obter um ID do cliente.
        
Quando o formulário do Google pede autorizaçãoJavaOrigem dos scripts, insira o valor a partir de&lt;baseHttpsUrl&gt; do seu computador pessoalERDDAP™setup.xml, por exemplo,
         https://localhost:8443   
Em uma segunda linha, adicione o&lt;baseHttpsUrl&gt; do seu públicoERDDAP™setup.xml, por exemplo,
         https://*your.domain.org*:8443
 
        
Não especifique quaisquer URIs de redirecionamento Autorizado.
        
Quando você vê seu ID de cliente para este projeto, copie e cole-o em seu setup.xml (geralmente apenas abaixo&lt;autenticação&gt; para ser ordenada, mas a colocação não importa realmente), no&lt;GoogleClientID&gt; tag, por exemplo,
        &lt;GoogleClientID&gt; *seu cliente* &lt;/googleClientID&gt;
O ID do cliente será uma cadeia de cerca de 75 caracteres, provavelmente começando com vários dígitos e terminando com .apps.googleusercontent.com .
         
        
    3. Em seudatasets.xml, criar um [&lt;usuário&gt; (/docs/admin/datasets#user) tag para cada usuário que terá acesso a conjuntos de dados privados. Para o atributo de nome de usuário na tag:
        
        * Para usuários que entrarão com o Google, use o endereço de e-mail do Google do usuário.
        * Para usuários que entrarão com orcid, use o número de conta Orcid do usuário (com traços) .
        
Não especifique o atributo password para a tag de utilizador.
         
    4. ReinicieERDDAP™para que as alterações no setup.xml edatasets.xmlToma efeito.
         
###### Configuração orcid{#orcid-setup} 
* Para as opções orcid e oauth2:
Siga as instruções abaixo para configurar a autenticação Orcid para o seuERDDAP.
     (Para obter detalhes, consulte[Documentação da API de autenticação da Orcid](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Se não tiver uma conta Orcid,[criar um](https://orcid.org/signin)  
         
    2. Entrar em Orcid[ https://orcid.org/signin ](https://orcid.org/signin)usando sua conta Orcid pessoal.
         
    3. Clique em "Developer Tools" (sob "Para Pesquisadores" no topo) .
         
    4. Clique em "Register for the free ORCID public API". Digite esta informação:
Nome:ERDDAP™em\\[sua organização\\]  
Site:\\[Tu ésERDDAPDomínio\\]  
Descrição:ERDDAP™é um servidor de dados científico. Os usuários precisam autenticar com o Google ou Orcid para acessar conjuntos de dados não públicos.
Redirect URIs:\\[Tu ésERDDAPDomínio\\]/erddap/loginOrcid.html
         
    5. Clique no ícone Salvar (Parece um disco de 3,5"&#33;) .
Você pode então ver seu ID de cliente ORCID APP e ORCID Client Secret.
         
    6. Copie e cole o ORCID APP Client ID (que vai começar com "APP-") em setup.xml no&lt;orcidClientID&gt; tag, por exemplo,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Copie e cole o ORCID Client Secret (caracteres alfa-numéricos minúsculos com traços) em setup.xml no&lt;orcidClientSecret&gt; tag, por exemplo,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Em seudatasets.xml, criar um [&lt;usuário&gt; (/docs/admin/datasets#user) tag para cada usuário que terá acesso a conjuntos de dados privados. Para o atributo de nome de usuário na tag:
        
        * Para usuários que entrarão com o Google, use o endereço de e-mail do Google do usuário.
        * Para usuários que entrarão com orcid, use o número de conta Orcid do usuário (com traços) .
        
Não especifique o atributo password para a tag de utilizador.
         
    9. ReinicieERDDAP™para que as alterações no setup.xml edatasets.xmlToma efeito.
             

###### Entrar em qualquer maneira{#log-in-either-way} 
Se você usar as opções de autenticação do Google, orcid ou oauth2, e a API de autenticação do Google Sign-In ou Orcid de repente deixa de funcionar (por qualquer razão) ou deixa de trabalhar comoERDDAP™espera, os usuários não serão capazes de fazer login em seuERDDAP. Como temporário (ou permanente) solução, você pode pedir aos usuários para se inscrever com o outro sistema (obter uma conta de e-mail do Google, ou obter uma conta Orcid) . Para fazer isso:

1. Alterar&lt;autenticação&gt; tag para que ele permita o outro sistema de autenticação. A opção oauth2 permite aos usuários fazer login com qualquer sistema.
2. Duplicar cada um dos&lt;user&gt; tags e alterar o atributo de nome de usuário do endereço de e-mail do Google para o número de conta Orcid correspondente (ou vice-versa) , mas manter os papéis atribuem o mesmo.

###### Inaugurado{#openid} 
ERDDAP™não suporta mais a opção de autenticação aberta, que foi baseada em uma versão de aberto Identificação que agora está fora de data. Por favor, use o google, orcid, ou oauth2 opções em vez.

###### BASE{#basic} 
ERDDAP™não suporta autenticação BASIC porque:
* A BASIC parece voltada para páginas web predefinidas que precisam de acesso seguro ou de acesso on/off ao site inteiro, masERDDAP™permite (acesso restrito) conjuntos de dados a serem adicionados on-the-fly.
* A autenticação BASIC não oferece uma maneira para os usuários fazerem login&#33;
* A autenticação BASIC é conhecida por não ser segura.

##### Fontes de dados seguras{#secure-data-sources} 
Se um conjunto de dados tiver acesso restritoERDDAP™usuários, a fonte de dados (de ondeERDDAP™recebe os dados) não deve ser publicamente acessível. Então, como podeERDDAP™obter os dados para conjuntos de dados de acesso restrito? Algumas opções são:

*   ERDDAP™pode servir dados de arquivos locais (por exemplo, via EDDTable Dos Ficheiros ouEDDGridDos quartos) .
     
*   ERDDAP™pode estar em um[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) e a fonte de dados (por exemplo, umOPeNDAPservidor ou banco de dados) pode estar por trás de[firewall](https://en.wikipedia.org/wiki/Firewall), onde é acessívelERDDAP™mas não ao público.
     
* A fonte de dados pode estar em um site público, mas requer um login para obter os dados. Os dois tipos de conjunto de dados queERDDAP™pode fazer login para acessar[EDDTable FromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)e[EDDTable FromCasandra](/docs/server-admin/datasets#eddtablefromcassandra). Esses conjuntos de dados suportam (e deve sempre usar) nomes de usuário (criar umERDDAP™usuário que só tem privilégios somente leitura) , senhas, conexões SSL e outras medidas de segurança.
    
Mas em geral, atualmente,ERDDAP™não pode lidar com essas fontes de dados porque não tem nenhuma disposição para fazer login na fonte de dados. Esta é a razão pela qual o acesso[EDDGridFromErddap e EDDTable De Erddap](/docs/server-admin/datasets#eddfromerddap)conjuntos de dados não podem ser restritos. Atualmente, o localERDDAP™não tem como acessar e acessar as informações dos metadados do remotoERDDAP. E colocar o "remote"ERDDAP™atrás de seu firewall e removendo o acessível desse conjunto de dados Para restrições não resolve o problema: desde solicitações do usuário para EDDXxx Os dados do FromErddap precisam ser redirecionados para o remotoERDDAP™, o remotoERDDAP™deve ser acessível.
    
#### Defesas contra hackers{#defenses-against-hackers} 
Há hackers de mau cara que tentam explorar fraquezas de segurança em software de servidor comoERDDAP.ERDDAP™segue o conselho de segurança comum para ter várias camadas de defesas:

* Privilégios restritos... Uma das defesas mais importantes é executar Tomcat através de um usuário chamado tomcat que não tem uma senha (para que ninguém possa fazer login como esse usuário) e tem privilégios limitados do sistema de arquivos (por exemplo, acesso somente leitura aos dados) . VerERDDAPinstruções para[configuração de tomcat](/docs/server-admin/deploy-install#tomcat).
* Uso pesado - Em geral,ERDDAP™é construído para uso pesado, incluindo por scripts que fazem dezenas de milhares de pedidos, um após o outro. É difícilERDDAP™ao mesmo tempo abrir-se para uso legítimo pesado e proteger-se do abuso. Às vezes é difícil diferenciar uso legítimo pesado, uso legítimo excessivo e uso ilegítimo (e às vezes é realmente fácil) . Entre outras defesas,ERDDAP™conscientemente não permite que um único pedido use uma fração inordenada dos recursos do sistema (a menos que o sistema não esteja ativo) .
* Identificar usuários problemáticos - SeERDDAP™está diminuindo ou congelando (talvez porque um usuário ingênuo ou um bot está executando vários scripts para enviar vários pedidos simultaneamente ou talvez por causa de um cara ruim[Denial de serviço](https://en.wikipedia.org/wiki/Denial-of-service_attack)ataque) , você pode olhar para o[Relatório diário e-mail](#daily-report)  (e informações idênticas mais frequentes no[ERDDAP™ficheiro de registo](#log)) que exibe o número de pedidos feitos pelos usuários mais ativos (veja o endereço IP do Requester (Permitido) ") .ERDDAP™também envia e-mails para o administrador sempre que houver["Atividade incomum: &gt;25% dos pedidos falharam"](#failed-requests). Você pode então olhar noERDDAP™log arquivo para ver a natureza de seus pedidos. Se você sentir que alguém está fazendo muitos pedidos, pedidos bizarros (Não acreditarias no que vi, bem, talvez pudesses.) , ou pedidos do tipo ataque, você pode adicionar seu endereço IP à lista negra.
* Lista negra... Você pode adicionar o endereço IP de usuários problemáticos, bots e[Denial de serviço](https://en.wikipedia.org/wiki/Denial-of-service_attack)atacantes para oERDDAP [lista negra](/docs/server-admin/datasets#requestblacklist), para que os pedidos futuros deles serão imediatamente rejeitados. Esta configuração está emdatasets.xmlpara que você possa adicionar rapidamente um endereço IP à lista e depois[bandeira](#flag)um conjunto de dados para queERDDAP™imediatamente percebe e aplica a mudança. A mensagem de erro enviada aos usuários da lista negra incentiva-os a entrar em contato com oERDDAP™administrador se eles sentem que foram erroneamente colocados na lista negra. (Em nossa experiência, vários usuários não sabem que eles estavam executando vários scripts simultaneamente, ou que seus scripts estavam fazendo solicitações absurdas.) 
* Dataset Security - Alguns tipos de conjuntos de dados (notavelmente, EDDTableFromDatabase) apresentar riscos adicionais de segurança (por exemplo, injeção SQL) e têm suas próprias medidas de segurança. Veja as informações para esses tipos de conjuntos de dados em[Trabalhar com odatasets.xmlArquivo](/docs/server-admin/datasets), nomeadamente[EDDTableDa segurança da base de dados](/docs/server-admin/datasets#database-security).
* Auditoria de Segurança... EmboraNOAAA segurança de TI recusou nossos pedidos de exames por anos, eles agora rotineiramente digitalizam meu (Bob's)  ERDDAP™instalação. Embora os exames iniciais encontraram alguns problemas que eu então corrigido, os exames subsequentes não encontraram problemas comERDDAP. Os exames se preocupam com muitas coisas: notavelmente, desdetabledapsolicitações parecem solicitações SQL, eles se preocupam com vulnerabilidades de injeção SQL. Mas essas preocupações são infundadas porqueERDDAP™sempre analisa e valida consultas e, em seguida, constrói separadamente a consulta SQL de uma forma que evita vulnerabilidades de injeção. A outra coisa que às vezes reclamam é que o nossoJavaversão ou Tomcat versões não são tão atualizados quanto eles querem, então atualizá-los em resposta. Já me ofereci para mostrar às pessoas os relatórios de segurança, mas já me disseram que não posso fazer isso.

#### Perguntas? Sugestões?{#questions-suggestions} 
Se você tiver alguma dúvida sobreERDDAP's sistema de segurança ou ter quaisquer perguntas, dúvidas, preocupações ou sugestões sobre como ele é configurado, ver o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
    

## Coisas que você não precisa saber{#things-you-dont-need-to-know} 

Estes são detalhes que você não precisa saber até que uma necessidade surge.

### SegundaERDDAP™ {#second-erddap} 
*    **Configurando um segundoERDDAP™para Teste/Desenvolvimento**   
Se você quiser fazer isso, há duas abordagens:
    *    (Melhor) Instalar Tomcat eERDDAP™em um computador diferente do computador que tem seu públicoERDDAP. Se você usar seu computador pessoal:
        1. Faça a instalação um passo de cada vez. Levanta o Tomcat e corre primeiro.
Quando Tomcat estiver em execução, o Tomcat Manager deve estar em
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (ou talvez[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. InstalarERDDAP.
        3. Não use ProxyPass para eliminar o número da porta doERDDAP™URL.
        4. Em[setup.xml](/docs/server-admin/deploy-install#setupxml), definir baseUrl para http://127.0.0.1:8080
 
        5. Depois de começar istoERDDAP™, você deve ser capaz de vê-lo em
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (ou talvez[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Segundo Tomcat{#second-tomcat} 
*    (Segundo Melhor) Instale outro Tomcat no mesmo computador que seu públicoERDDAP.
    1. Faça a instalação um passo de cada vez. Levanta o Tomcat e corre primeiro.
Alterar todos os números de porta associados ao segundo Tomcat (por exemplo, mudar 8080 para 8081)   (ver o[Múltiplo Tomcat Secção das instâncias](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)meio caminho através do documento) .
    2. InstalarERDDAP™no novo Tomcat.
    3. Não use ProxyPass para eliminar o número da porta doERDDAP™URL.
    4. Em[setup.xml](/docs/server-admin/deploy-install#setupxml), definir baseUrl para http://www.*yourDomainName*:8081
 
    5. Depois de começar istoERDDAP™, você deve ser capaz de vê-lo em
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Unidades de estado sólido{#solid-state-drives} 
*    **Unidades de estado sólido (SSDs) são grandes&#33;**   
A maneira mais rápida, mais fácil e mais barata de acelerarERDDAPO acesso a dados tabulares é colocar os arquivos de dados em uma unidade de estado sólido (SSD) . A maioria dos conjuntos de dados tabulares são relativamente pequenos, então um SSD de 1 ou 2 TB é provavelmente suficiente para manter todos os arquivos de dados para todos os seus conjuntos de dados tabulares. O SSD eventualmente desgasta se você escrever dados para uma célula, excluí-lo e escrever novos dados para essa célula muitas vezes. Então, se você apenas usar seu SSD para escrever os dados uma vez e lê-lo muitas vezes, mesmo um SSD de qualidade do consumidor deve durar muito tempo, provavelmente muito mais tempo do que qualquer disco rígido (HDD) . SSD de qualidade do consumidor agora são baratos (em 2018, ~$200 por 1 TB ou ~$400 por 2 TB) e os preços ainda estão caindo rápido. QuandoERDDAP™acessa um arquivo de dados, um SSD oferece tanto menor latência (~0.1ms, versus ~3ms para um HDD, versus ~10 (?) ms para um RAID, versus ~55ms para Amazon S3) e maior produtividade (~500 MB/S, versus ~75 MB/s para um HDD, versus ~500 MB/s para um RAID) . Então você pode obter um grande aumento de desempenho (até 10X versus HDD) 200 dólares&#33; Comparado com a maioria das outras mudanças possíveis no seu sistema (um novo servidor por $10,000? um novo RAID por $35.000? um novo interruptor de rede para $5000? etc.) , este é de longe o melhor retorno sobre o investimento (ROI) . Se / quando o SSD morre (em 1, 2, ... 8 anos) , substitua-o. Não confie nele como por longo prazo, armazenamento de arquivos dos dados, apenas para a cópia do front-end dos dados.\\[SSD seria ótimo para dados em grade, também, mas a maioria dos conjuntos de dados em grade são muito maiores, tornando o SSD muito caro.\\]
    
Se o seu servidor não estiver carregado de memória, memória adicional para o seu servidor também é uma ótima e relativamente barata maneira de acelerar todos os aspectos deERDDAP.
     
    
### [Cargas pesadas / restrições](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Com uso pesado, um standaloneERDDAP™pode ser constrangido por vários problemas. Para mais informações, consulte o[lista de restrições e soluções](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grades, Clusters e Federações{#grids-clusters-and-federations} 
Sob uso muito pesado, um único standaloneERDDAP™será executado em uma ou mais restrições e até mesmo as soluções sugeridas serão insuficientes. Para tais situações,ERDDAP™tem recursos que facilitam a construção de grades escaláveis (também chamados clusters ou federações) deERDDAPs que permitem que o sistema manuseie o uso muito pesado (por exemplo, para um grande data center) . Para mais informações, consulte[grades, clusters e federações deERDDAPS](/docs/server-admin/scaling).
     
### Computação em nuvem{#cloud-computing} 
Várias empresas estão começando a oferecer[serviços de computação em nuvem](https://en.wikipedia.org/wiki/Cloud_computing)  (por exemplo,[Amazon Web Services](https://aws.amazon.com/)) .[Empresas de hospedagem web](https://en.wikipedia.org/wiki/Web_hosting_service)ofereceram serviços mais simples desde meados da década de 1990, mas os serviços "nuvem" expandiram consideravelmente a flexibilidade dos sistemas e a gama de serviços oferecidos. Você pode usar esses serviços para configurar um únicoERDDAP™ou uma grade/cluster deERDDAPs para lidar com uso muito pesado. Para mais informações, consulte[computação em nuvem comERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazonas{#amazon} 
*    **[Amazon Web Services (AWS) Visão geral da instalação do EC2](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)é um[serviço de computação em nuvem](https://en.wikipedia.org/wiki/Cloud_computing)que oferece uma ampla gama de infraestrutura de computador que você pode alugar por hora. Você pode instalarERDDAP™em um[Nuvem composta elástica (CE)) ](https://aws.amazon.com/ec2/)instância (seu nome para um computador que você pode alugar à hora) . AWS tem um excelente[Guia de usuário da AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)e você pode usar o Google para encontrar respostas para perguntas específicas que você pode ter. Prepare-se -- é uma quantidade justa de trabalho para começar. Mas uma vez que você tem um servidor em funcionamento, você pode facilmente alugar tantos recursos adicionais (servidores, bancos de dados, SSD-espaço, etc.) como você precisa, a um preço razoável.\\[Esta não é uma recomendação ou endosso de Amazon Web Services. Existem outros provedores de nuvem.\\]
    
Uma visão geral das coisas que você precisa fazer para obterERDDAP™correr em AWS é:
    
    * Em geral, você fará todas as coisas descritas no[Guia de usuário da AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Configure uma conta AWS.
    * Configure um usuário AWS dentro dessa conta com privilégios de administrador. Faça login como este usuário para fazer todos os seguintes passos.
    * Armazenamento de bloco elástico (EBS) é o equivalente AWS de um disco rígido ligado ao seu servidor. Alguns espaço EBS será alocado quando você primeiro criar uma instância EC2. É armazenamento persistente -- as informações não são perdidas quando você parar sua instância EC2. E se você mudar os tipos de instância, seu espaço EBS automaticamente fica ligado à nova instância.
    * Crie um endereço IP elástico para que sua instância EC2 tenha uma URL estável e pública (ao contrário de apenas uma URL privada que muda cada vez que você reiniciar sua instância) .
    * Criar e iniciar uma instância EC2 (computador) . Há uma ampla gama de[tipos de instância](https://aws.amazon.com/ec2/instance-types/), cada um a um preço diferente. Uma instância m4.large ou m4.xlarge é poderosa e é provavelmente adequada para a maioria dos usos, mas escolha o que atende às suas necessidades. Você provavelmente vai querer usar o Linux da Amazon como o sistema operacional.
    * Se o seu computador desktop / laptop é um computador Windows, você pode usar[Puttle&#33;](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), um cliente SSH gratuito para Windows, para obter acesso à linha de comando da sua instância EC2. Ou, você pode ter algum outro programa SSH que você preferir.
    * Quando você entrar em sua instância EC2, você será logado como o usuário administrativo com o nome de usuário "ec2-user". ec2-user tem privilégios sudo. Então, quando você precisa fazer algo como o usuário root, use: sudo *alguns comandados* 
    * Se o seu computador desktop / laptop é um computador Windows, você pode usar[ArquivoZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), um programa SFTP gratuito, para transferir arquivos para / de sua instância EC2. Ou, você pode ter algum outro programa SFTP que você preferir.
    *   [Instalar o Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)em sua instância EC2.
    * Siga o padrão[ERDDAP™instruções de instalação](/docs/server-admin/deploy-install).
         
### Aguarde então a exceção de caminhão{#waitthentryagain-exception} 
Um usuário pode receber uma mensagem de erro como
Espera aí.
Havia um (temporário?) problema. Espera um minuto e tenta outra vez. (Em um navegador, clique no botão Recarregar.)   
Detalhes: GridDataAccessor.increment: parcialResultos\\[0\\]="123542730" era esperado para ser "123532800".

A explicação geral do WaitThenTryAgainException é:
QuandoERDDAP™está respondendo a uma solicitação de usuário, pode haver um erro inesperado com o conjunto de dados (por exemplo, um erro ao ler dados do arquivo ou um erro ao acessar um conjunto de dados remoto) . Aguarde EntãoTryAgain sinais paraERDDAP™que o pedido falhou (Até agora) mas queERDDAP™deve tentar recarregar o conjunto de dados rapidamente (chama[SolicitaçãoReloadASAP](#requestreloadasap)) e repita o pedido. Muitas vezes, isso tem sucesso, e o usuário apenas vê que a resposta à solicitação foi lenta. Outras vezes, a recarga falha ou é muito lenta, ou a tentativa subsequente de lidar com o pedido também falha e joga outro WaitThenTryAgain. Se isso acontecer,ERDDAP™marca o conjunto de dados para recarregar, mas diz ao usuário (via uma exceção WaitThenTryAgain) que houve um fracasso ao responder ao pedido.

Esse é o comportamento normal. Este sistema pode lidar com muitos problemas comuns.
Mas é possível que este sistema seja desencadeado excessivamente. A causa mais comum é queERDDAPO carregamento do conjunto de dados não vê um problema, masERDDAPA resposta a uma solicitação de dados vê o problema. Não importa qual é a causa, a solução é para você lidar com o que está errado com o conjunto de dados. Olhe em log.txt para ver as mensagens de erro reais e lidar com os problemas. Se muitos arquivos têm cabeçalhos válidos, mas dados inválidos (um arquivo corrompido) , substitua os arquivos com arquivos não corrompidos. Se a conexão com um RAID for um flakey, conserte-o. Se a conexão a um serviço remoto for de flakey, encontre uma maneira de fazê-lo não flakey ou baixar todos os arquivos da fonte remota e sirva os dados dos arquivos locais.

A explicação detalhada desse erro específico (acima) é:
Para cadaEDDGridconjunto de dados,ERDDAP™mantém os valores variáveis do eixo na memória. Eles são usados, por exemplo, para converter valores de eixo solicitados que usam o " () " formatar em números de índice. Por exemplo, se os valores do eixo são "10, 15, 20, 25", um pedido (20.) será interpretado como um pedido de índice #2 (índices baseados em 0) . QuandoERDDAP™recebe um pedido de dados e obtém os dados da fonte, verifica que os valores do eixo que obteve da fonte correspondem aos valores do eixo na memória. Normalmente, têm. Mas às vezes a fonte de dados mudou de forma significativa: por exemplo, valores de índice do início da variável eixo podem ter sido removidos (por exemplo, "10, 15, 20, 25" pode ter se tornado "20, 25, 30") . Se isso acontecer, é claro queERDDAPinterpretação do pedido (por exemplo, " (20.) "é índice #2) Agora está errado. Então...ERDDAP™lança uma exceção e chama RequestReloadASAP.ERDDAP™atualizará o conjunto de dados em breve (muitas vezes em alguns segundos, geralmente dentro de um minuto) . Outros, problemas semelhantes também lançam a exceção WaitThenTryAgain.
    
#### SolicitaçãoReloadASAP{#requestreloadasap} 
Você pode ver RequestReloadASAP no arquivo log.txt logo após uma mensagem de erro e muitas vezes perto de um[Aguarde então a exceção de caminhão](#waitthentryagain-exception). É basicamente uma forma interna, programática paraERDDAP™para definir um[bandeira](#flag)para sinalizar que o conjunto de dados deve ser recarregado o mais rápido possível.
     
### Arquivos Não Ser Excluído{#files-not-being-deleted} 
Para algunsERDDAP™instalações, houve um problema com alguns arquivos temporários sendo criados porERDDAP™ficar aberto (erroneamente) e, portanto, não sendo excluído. Em alguns casos, muitos desses arquivos acumularam e tomaram uma quantidade significativa de espaço em disco.

Esperemos que estes problemas sejam corrigidos (deERDDAP™v2.00) . Se você vir este problema, envie um e-mail para o diretório+names dos arquivos ofendidos para Chris. John no noaaa.gov. Você tem algumas opções para lidar com o problema:

* Se os arquivos não são grandes e não estão fazendo com que você fique sem espaço em disco, você pode ignorar o problema.
* A solução mais simples é desligar tomcat/ERDDAP™  (após horas, menos usuários são afetados) . Durante o desligamento, se o sistema operacional não excluir os arquivos, exclua-os manualmente. Então reinicieERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Marcação semântica de conjuntos de dados com json-ld (JSON Dados ligados) ](#json-ld)**   
    ERDDAP™agora usa[json-ld (JSON Dados ligados) ](https://json-ld.org)para fazer seu catálogo de dados e conjuntos de dados parte do[web semântica](https://en.wikipedia.org/wiki/Semantic_Web), que é a ideia de Tim Berners-Lee de tornar o conteúdo web mais legível por máquina e máquina "suportável". O conteúdo json-ld usa[Página inicial](https://schema.org/)termos e definições. Motores de busca ([Google em particular](https://developers.google.com/search/docs/data-types/datasets)) e outras ferramentas semânticas podem usar essa marcação estruturada para facilitar a descoberta e indexação. A marcação estruturada json-ld aparece como invisível-para-humanos&lt;script código no https://.../erddap/info/index.html Página web (que é uma web semântica[DataCatalog](https://schema.org/DataCatalog)) e em cada https://.../erddap/info/*datasetID*/index.html Página web (que é uma web semântica[Conjunto de dados](https://schema.org/Dataset)) . (Obrigado especial a Adam Leadbetter e Rob Fuller do Instituto Marinho na Irlanda por fazer as partes difíceis do trabalho para fazer esta parte deERDDAP.)   
     
### URLs fora do local{#out-of-date-urls} 
Devagar, mas seguramente, as URLs que os provedores de dados escreveram em arquivos de dados estão se tornando out-of-date (por exemplo,httptorna-sehttps, sites são rearranjados, e organizações como NODC/NGDC/NCDC são reorganizadas em NCEI) . Os links quebrados resultantes são um problema sempre presente enfrentado por todos os sites. Para lidar com isto,ERDDAP™agora tem um sistema para atualizar automaticamente URLs fora de data. Se Gerar conjuntos de dados Xml vê uma URL fora de data, adiciona a URL atualizada para&lt;addAttributes&gt; Além disso, quando um conjunto de dados carrega, seERDDAP™vê uma URL desatualizada, muda silenciosamente para a URL atualizada. As mudanças são controladas por uma série de busca/substituído com pares definidos em&lt;updateUrls&gt; emERDDAP'
\\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheiro. Você pode fazer mudanças lá. Se você tem sugestões para mudanças, ou se você acha que isso deve ser transformado em um serviço (como os Conversores) , por favor envie um e-mail para Chris. John no noaaa.gov.
     
### CORSÃO{#cors} 
* CORSÃO ([Compartilhamento de recursos Cross-Origin](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"é um mecanismo que permite recursos restritos (por exemplo, fontes ouERDDAP™dados) em uma página web a ser solicitada de outro domínio fora do domínio do qual o primeiro recurso foi servido" (Arun Ranganathan) . Basicamente, CORS é uma mensagem que pode ser colocada no cabeçalho HTTP de uma resposta, dizendo essencialmente: "Está tudo bem com este site se certos outros sites (específicos, ou todos) recursos de captura (por exemplo, dados) deste site e torná-lo disponível em seu site". Assim, é uma alternativa para[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
Os desenvolvedores deERDDAP™não pretende ser especialistas em segurança. Não estamos inteiramente claros sobre as questões de segurança relacionadas com o CORS. Nós não queremos fazer qualquer declaração apoiando uma ação que reduz a segurança. Então vamos ficar neutros e deixá-los até cada um.ERDDAP™admin para decidir se os benefícios ou habilitar um cabeçalho CORS valem os riscos. Como sempre, se o seuERDDAP™tem quaisquer conjuntos de dados privados, é uma boa ideia ter mais cuidado com a segurança.
    
Se você quiser ativar o CORS para o seuERDDAP™, há[instruções prontamente disponíveis](https://enable-cors.org/index.html)descrevendo como os administradores do site podem ativar um cabeçalho do CORS através de seu software de servidor de nível inferior (por exemplo, Apache ou nginx) .
    
### Paletes{#palettes} 
* Paletas são usadas porERDDAP™converter uma gama de valores de dados em uma variedade de cores ao fazer gráficos e mapas.
    
Cada paleta é definida em um arquivo de paleta .cpt-style como usado por[GMT](https://www.soest.hawaii.edu/gmt/). TudoERDDAP™arquivos .cpt são arquivos GMT .cpt válidos, mas o oposto não é verdade. Para uso emERDDAP™, arquivos .cpt têm:
    
    * Linhas de comentários opcionais no início do arquivo, começando com "#".
    * Uma seção principal com uma descrição dos segmentos da paleta, um segmento por linha. Cada linha de descrição de segmento tem 8 valores:
início Valor, startRed, start Verde, começar Blue, endValue, endRed, endGreen, endBlue.
Pode haver qualquer número de segmentos.ERDDAP™usa interpolação linear entre o startRed/Green/Blue e endRed/Green/Blue de cada segmento.
        
Recomendamos que cada segmento especifique uma cor inicial e final diferente, e que a cor inicial de cada segmento seja a mesma que a cor final do segmento anterior, de modo que a paleta descreva uma mistura contínua de cores.ERDDAP™tem um sistema para criar no-the-fly uma paleta de cores discretas de uma paleta com uma mistura contínua de cores. UmERDDAP™usuário pode especificar se eles querem que a paleta seja Contínua (o original) ou Discreto (derivado do original) . Mas há razões legítimas para não seguir essas recomendações para algumas paletas.
        
    * O StartValue e endValues devem ser inteiros.
O primeiro segmento deve ter inícioValue=0 e endValue=1.
O segundo segmento deve ter inícioValue=1 e endValue=2.
Etc.
    * Os valores vermelhos, verdes e azuis devem ser inteiros de 0 (nenhum) 255. (em cheio) .
    * O fim do arquivo deve ter 3 linhas com:
        1. Uma cor de fundo rgb para valores de dados menos do que o mínimo da barra de cores, por exemplo: B 128 128 128
É muitas vezes o startRed, startGreen e startBlue do primeiro segmento.
        2. Uma cor rgb de primeiro plano para valores de dados mais do que o máximo da barra de cores, por exemplo: F 128 0
É muitas vezes o endRed, endGreen e endBlue do último segmento.
        3. Uma cor rgb para valores de dados NaN, por exemplo, N 128 128
É frequentemente cinza médio (128) .
    * Os valores em cada linha devem ser separados por abas, sem espaços extraneous.
    
Um arquivo amostra .cpt é BlueWhiteRed.cpt:
    
# Este é o BlueWhiteRed.cpt.
0 0 0 0 128 1 0 0 255
1 0 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
5 255 0 0 6 128 0 0
B 0 0 0 128
F 128 0 0 0
N 128 128 128 128
    
Veja os arquivos .cpt existentes para outros exemplos. Se houver problemas com um arquivo .cpt,ERDDAP™provavelmente vai lançar um erro quando o arquivo .cpt é analisado (que é melhor do que usar mal as informações) .
    
Você pode adicionar paletas adicionais paraERDDAP. Você pode torná-los você mesmo ou encontrá-los na web (por exemplo,[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) embora você provavelmente terá que editar seu formato ligeiramente para se conformarERDDAPRequisitos .cpt. Para começarERDDAP™para usar um novo arquivo .cpt, armazenar o arquivo em *Toca a brincar.* /webapps/erddap/WEB-INF/cptfiles (você vai precisar fazer isso para cada nova versão deERDDAP) e também:
    
    * Se você usar o arquivo message.xml padrão: adicione o nome do arquivo ao&lt;paletas&gt; tag in
         *Toca a brincar.* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Se você fizer isso, você precisa fazê-lo sempre que atualizarERDDAP.
    * Se você usar um arquivo message.xml personalizado: adicione o nome do arquivo ao&lt;paletas&gt; tag em seu arquivo custom message.xml: *Toca a brincar.* /content/erddap/messages.xml . Se você fizer isso, você só precisa fazê-lo uma vez (mas há outro trabalho para manter um arquivo personalizado message.xml) .
    
Então reinicieERDDAP™Então...ERDDAP™percebe as mudanças. Uma vantagem desta abordagem é que você pode especificar a ordem das paletas na lista apresentada aos usuários. Se você adicionar uma coleção, encorajamos você a adicionar um prefixo com as iniciais dos autores (por exemplo, "KT\\_") para o nome de cada paleta para identificar a coleção e para que possa haver várias paletas que de outra forma teriam o mesmo nome.
    
Por favor, não remova ou altere nenhuma das paletas padrão. Eles são uma característica padrão de todosERDDAP™instalações. Se você acha que uma paleta ou coleção de paletas deve ser incluída no padrãoERDDAP™distribuição porque ele / eles seriam de uso geral, por favor envie-os para Chris. John no noaaa.gov.
    
### Barras de cores{#colorbars} 
*    **Como funcionaERDDAP™gerar as cores em uma barra de cores?** 
    
    1. O usuário seleciona um dos predefinidos[paletas](#palettes)ou usa o padrão, por exemplo, Rainbow. As paletas são armazenadas/definidas nos arquivos de tabela de paleta de cores .cpt do estilo GMT. Cada um deERDDAPAs paletas predefinidas têm um intervalo de inteiro simples, por exemplo, 0 a 1 (se houver apenas uma seção na paleta) , ou 0 a 4 (se houver quatro seções na paleta) . Cada segmento no arquivo cobre n a n+1, começando em n=0.
    2.  ERDDAP™gera um novo arquivo .cpt on-the-fly, escalando o intervalo da paleta predefinida (por exemplo, 0 a 4) para o intervalo da paleta necessária pelo usuário (por exemplo, 0,1 a 50) e então gerando uma seção na nova paleta para cada seção da nova paleta (por exemplo, uma escala de log com carrapatos em 0,1, 0,5, 1, 5, 10, 50 terá 5 seções) . A cor para o ponto final de cada seção é gerada por encontrar a seção relevante da paleta no arquivo .cpt, então interpolando linearmente os valores R, G e B. (Isso é o mesmo que o GMT gera cores de seus arquivos de tabela de paleta de cores.) Este sistema permiteERDDAP™para começar com paletas genéricas (por exemplo, Arco-Íris com 8 segmentos, no total de 0 a 8) e criar paletas personalizadas on-the-fly (por exemplo, um arco-íris personalizado, que mapeia 0,1 a 50 mg/L para as cores do arco-íris) .
    3.  ERDDAP™então usa esse novo arquivo .cpt para gerar a cor para cada pixel colorido diferente na barra de cores (e mais tarde para cada ponto de dados ao plotar dados em um gráfico ou mapa) , novamente encontrando a seção relevante da paleta no arquivo .cpt, então interpolando linearmente os valores R, G e B.
    
Este processo pode parecer desnecessariamente complicado. Mas resolve problemas relacionados a escalas de log que são difíceis de resolver outras maneiras.
    
Então, como você pode imitar o queERDDAP™Está a fazer? Isso não é fácil. Basicamente você precisa duplicar o processo queERDDAP™está a usar. Se você é umJavaprogramador, você pode usar o mesmoJavaclasse queERDDAP™usa para fazer tudo isso:
     *Toca a brincar.* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Diretrizes para sistemas de distribuição de dados{#guidelines-for-data-distribution-systems} 
Mais opiniões gerais sobre a concepção e avaliação de sistemas de distribuição de dados podem ser encontradas[aqui.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArquivoADataset{#archiveadataset} 
Incluído em seuERDDAP™instalação é uma ferramenta de linha de comando chamada ArchiveADataset que pode ajudá-lo a fazer um arquivo (um.zipou.tar.gzarquivo) com parte ou todo um conjunto de dados armazenado em uma série de netcdf-3.ncarquivos de dados em um formato de arquivo que é adequado para submissãoNOAAArquivo NCEI (.ncpara conjuntos de dados ou[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)para conjuntos de dados tabulares, conforme especificado pelo[NCEINetCDFModelos v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Arquivo Dataset pode fazer dois formatos de arquivo diferentes:

* O formato "original" segue estes[Orientações de Arquivamento do NCEI](https://www.ncdc.noaa.gov/atrac/guidelines.html), este guia para[Arquivando seus dados no NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), e os relacionados[Práticas para garantir a integridade de dados](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* O formato "BagIt" faz[Arquivos do BagIt](https://en.wikipedia.org/wiki/BagIt), um formato de arquivo padronizado promovido pela Biblioteca do Congresso dos EUA, conforme especificado pelo[Especificação BagIt v0.97](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI pode padronizar em arquivos BagIt para envios para o arquivo.

Não surpreendentemente, o[metadados globais e variáveis](/docs/server-admin/datasets#global-attributes)queERDDAP™encoraja/requer quase exatamente os mesmos metadados CF e ACDD que o NCEI incentiva/requer, de modo que todos os seus conjuntos de dados devem estar prontos para submissão ao NCEI via[Enviar](https://www.nodc.noaa.gov/s2n/)ou[ATRACÇÃO](https://www.ncdc.noaa.gov/atrac/index.html)  (Ferramenta avançada de rastreamento e recursos do NCEI para coleções de arquivos) .

Se você (oERDDAP™administrador) use ArchiveADataset para enviar dados para NCEI, então você (NCEI) determinará quando enviar um pedaço de dados para NCEI e o que esse pedaço será, porque você saberá quando há novos dados e como especificar esse pedaço (e NCEI não vai) . Assim, ArchiveADataset é uma ferramenta para você usar para criar um pacote para se submeter ao NCEI.

Arquivo Os dados podem ser úteis em outras situações, por exemplo,ERDDAP™administradores que precisam converter um subconjunto de um conjunto de dados (em um privadoERDDAP) de seu formato de arquivo nativo em um conjunto de[.ncArquivos CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), para que um públicoERDDAP™pode servir os dados do.ncArquivos CF em vez dos arquivos originais.

Uma vez que você tenha configuradoERDDAP™e executar (pelo menos uma vez) , você pode encontrar e usar o ArchiveADataset no *Toca a brincar.* /webapps/erddap/WEB-INF diretório. Há um script de shell (ArquivoADataset.sh) para Linux/Unix e um arquivo em lote (ArquivoADataset.bat) para Windows.

No Windows, a primeira vez que você executar o ArchiveADataset, você precisa editar o ArchiveADataset. arquivo de morcego com um editor de texto para mudar o caminho para o java. exe arquivo para que o Windows possa encontrarJava.

Quando você executar o ArchiveADataset, ele fará uma série de perguntas. Para cada pergunta, digite uma resposta e, em seguida, pressione Enter. Ou pressione ^C para sair de um programa a qualquer momento.

Ou, você pode colocar as respostas para as perguntas, em ordem, na linha de comando. Para fazer isso, execute o programa uma vez e digite e escreva suas respostas. Então, você pode criar uma única linha de comando (com as respostas como parâmetros) que executa o programa e responde a todas as perguntas.
Use a palavra padrão se quiser usar o valor padrão para um determinado parâmetro.
Usar " (duas citações duplas) como um placeholder para uma string vazia.
Especificar parâmetros na linha de comando pode ser muito conveniente, por exemplo, se você usar o ArchiveADataset uma vez por mês para arquivar um mês de dados. Uma vez que você gerou a linha de comando com parâmetros e salvou isso em suas notas ou em um script de shell, você só precisa fazer pequenas alterações a cada mês para fazer o arquivo desse mês.

As perguntas que o ArchiveADataset faz permitem:

* Especifique a embalagem de arquivo original ou Bagit. Para NCEI, use Bagit.
* Especifique o zip ou o tar.gzcompressão para o pacote. Para NCEI, use tar.gz.
* Especificar um endereço de e-mail de contato para este arquivo (será escrito no arquivo READ\\_ME.txt) .
* Especificar odatasetIDdo conjunto de dados que você deseja arquivar.
* Especifique quais variáveis de dados você deseja arquivar (geralmente todos) .
* Especifique qual subconjunto do conjunto de dados que deseja arquivar. Você precisa formatar o subconjunto da mesma forma que você formataria um subconjunto para uma solicitação de dados, então ele será diferente para gradeado do que para conjuntos de dados tabulares.
    * Para conjuntos de dados gradeados, você pode especificar um intervalo de valores da dimensão mais esquerda, geralmente que é um intervalo de tempo. O ArchiveADataset fará uma solicitação separada e gerará um arquivo de dados separado para cada valor no intervalo de valores. Uma vez que os conjuntos de dados gradeados são geralmente grandes, você quase sempre terá que especificar um pequeno subconjunto em relação ao tamanho de todo o conjunto de dados.
Por exemplo,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Para conjuntos de dados tabulares, você pode especificar qualquer coleção de restrições, mas é muitas vezes um intervalo de tempo. Como os conjuntos de dados tabulares são geralmente pequenos, muitas vezes é possível especificar sem restrições, de modo que todo o conjunto de dados seja arquivado.
Por exemplo, &time&gt;=2015-12-01&time&lt;2016-01-01
* Para conjuntos de dados tabulares: especifique uma lista separada por vírgula de 0 ou mais variáveis que determinem como os dados arquivados são subsetados em arquivos de dados diferentes. Para conjuntos de dados que têm
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\ = Série de tempo|TempoSeriesProfile|Trajeto|TrajetoProjecto
você deve quase sempre especificar a variável que tem o cf\\_role=timeseries\\_id (por exemplo,stationID) ou cf\\_role=trajectory\\_id atributo. O ArchiveADataset fará uma solicitação separada e gerará um arquivo de dados separado para cada combinação dos valores dessas variáveis, por exemplo, para cadastationID.
Para todos os outros conjuntos de dados tabulares, você provavelmente não especificará nenhuma variável para esta finalidade.
Atenção: Se o subconjunto do conjunto de dados que você está arquivando é muito grande (&gt; 2 GB) e não há nenhuma variável adequada para esta finalidade, então o ArchiveADataset não é utilizável com este conjunto de dados. Isto deve ser raro.
* Especifique o formato de arquivo para os arquivos de dados que serão criados.
Para conjuntos de dados gradeados, para NCEI, use.nc.
Para conjuntos de dados tabulares, para NCEI, use[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)se for uma opção; de outra forma use.nc.
* Especifique o tipo de digestão de arquivo a ser criado para cada arquivo de dados e para todo o pacote de arquivos: MD5, SHA-1, ou SHA-256. O resumo do arquivo fornece uma maneira para o cliente (por exemplo, NCEI) para testar se o arquivo de dados ficou corrompido. Tradicionalmente, estes foram[Arquivos .md5](https://en.wikipedia.org/wiki/MD5), mas agora há melhores opções. Para NCEI, use SHA-256 .

Depois de responder a todas as perguntas, o ArchiveADataset irá:

1. Faça uma série de solicitações para o conjunto de dados e estabeleça os arquivos de dados resultantes em *Diretriz de grande porte* /ArchiveADataset / *datasetID\\_timestamp* - Não.
Para conjuntos de dados gradeados, haverá um arquivo para cada valor da dimensão mais esquerda (por exemplo, tempo) . O nome do arquivo será esse valor (por exemplo, o valor do tempo) .
Para conjuntos de dados tabulares, haverá um arquivo para cada valor da variável ... (S) . O nome do arquivo será esse valor. Se houver mais de uma variável, as variáveis esquerda serão usadas para fazer nomes subdiretórios, e a variável mais direita será usada para fazer os nomes dos arquivos.
Cada arquivo de dados deve ser&lt;2 GB (o máximo permitido por.ncversão 3 arquivos) .
2. Faça um arquivo relacionado a cada arquivo de dados com o resumo do arquivo de dados. Por exemplo, se o arquivo de dados for 46088.nce o tipo digest é .sha256, então o arquivo digest terá o nome 46088.nc.sha256 .
3. Faça um arquivo READ\\_ME.txt com informações sobre o arquivo, incluindo uma lista de todas as configurações que você especificou para gerar este arquivo.
4. Faça 3 arquivos em *Diretriz de grande porte* /ArchiveADataset / :
    
    * A.zipou.tar.gzarquivo de arquivo *datasetID\\_timestamp* .zip  (ou.tar.gz) contendo todos os arquivos de dados encenados e digerir arquivos. Este arquivo pode ser qualquer tamanho, limitado apenas por espaço em disco.
    * Um arquivo digestivo para o arquivo, por exemplo, *datasetID\\_timestamp* .zip.sha256.txt
    * Para o tipo "original" de arquivo, um arquivo de texto chamado *datasetID\\_timestamp* .zip. lista de arquivos. (ou.tar.gz) que lista todos os arquivos no.zip  (ou.tar.gz) ficheiro.
    
Se você está preparando o arquivo para NCEI, estes são os arquivos que você vai enviar para NCEI, talvez via[Enviar](https://www.nodc.noaa.gov/s2n/)ou[ATRACÇÃO](https://www.ncdc.noaa.gov/atrac/index.html)  (Ferramenta avançada de rastreamento e recursos do NCEI para coleções de arquivos) .
5. Excluir todos os arquivos encenados para que apenas o arquivo (por exemplo,.zip) , o digest (por exemplo, .sha256.txt) do arquivo, e (opcionalmente) os arquivos .listOfFiles.txt permanecem.

#### ISO 19115 .xml Arquivos de Metadata{#iso-19115-xml-metadata-files} 
O pacote de arquivo ArchiveADataset não inclui o arquivo de metadados ISO 19115 .xml para o conjunto de dados. Se você deseja / precisa enviar um arquivo ISO 19115 para seu conjunto de dados para NCEI, você pode enviá-los o arquivo de metadados ISO 19115 .xml queERDDAP™criado para o conjunto de dados (mas...NMFSas pessoas devem obter o arquivo ISO 19115 para seus conjuntos de dados do InPort seERDDAP™não está servindo esse arquivo) .

Problemas? Sugestões? ArchiveADataset é novo. Se você tiver problemas ou sugestões, consulte nosso[seção sobre como obter suporte adicional](/docs/intro#support).
     
