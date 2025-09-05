---
sidebar_position: 1
---

# Instalar
Como fazer a configuração inicial de ERDDAP™ em seu servidor

 ERDDAP™ pode ser executado em qualquer servidor que suporte Java e Tomcat (e outros servidores de aplicativos como a Jetty, mas não os apoiamos) .
 ERDDAP™ foi testado no Linux (incluindo na AWS da Amazon) , Mac e computadores Windows.

*  **Docker.** - ... Nós fornecemos [ ERDDAP™ em um recipiente Docker](https://hub.docker.com/r/erddap/erddap) 
e IOOS agora oferece um [Guia de início rápido para ERDDAP™ em um recipiente de Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
É o padrão ERDDAP™ instalação, em um recipiente Docker.
Através do Docker Componhamos maneiras fáceis de configurar ssl e monitoramento, leia mais [Documentação do Docker](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Se você já usar Docker, você provavelmente vai preferir a versão Docker.
Se você está olhando para executar em serviços de nuvem você provavelmente vai preferir a versão Docker.
*  **Amazonas** - ... Se você está instalando ERDDAP™ em uma instância do Amazon Web Services EC2, veja isso [Amazon Web Services Visão geral](/docs/server-admin/additional-information#amazon) primeiro.
*  **Linux e Macs** - ... ERDDAP™ funciona muito bem em computadores Linux e Mac. Veja as instruções abaixo.
*  **Windows** - ... O Windows está bem para testar ERDDAP™ e para uso pessoal (ver as instruções abaixo) ,
mas não recomendamos usá-lo para público ERDDAP™ implantações. Correr ERDDAP™ no Windows pode ter problemas:
nomeadamente, ERDDAP™ pode ser incapaz de excluir e / ou renomear arquivos rapidamente. Isto é provavelmente devido ao software antivírus
   (por exemplo, da McAfee e Norton) que está verificando os arquivos para vírus. Se você correr para este problema
(que pode ser visto por mensagens de erro no [- Não.](/docs/server-admin/additional-information#log) arquivo como
"Não é possível excluir ..."), alterar as configurações do software antivírus pode aliviar parcialmente o problema. Ou considere usar um servidor Linux ou Mac em vez disso.

 **O padrão ERDDAP™ instruções de instalação para computadores Linux, Macs e Windows são:** 

0. Certifique-se de que todas as dependências estão instaladas. Em máquinas não Windows (Linux e Mac) , você precisa de csh.

##  Java  {#java} 

1.  [Para ERDDAP™ v2.19+, configurar Java 21.](#java) 
Por razões de segurança, é quase sempre melhor usar a versão mais recente do Java 21.
Por favor, baixe e instale a última versão do
    [OpenJDK do adotivo (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Para verificar a instalação, execute `/javaJreBinDirectory/java -version`, por exemplo
`/usr/local/jdk-21.0.3+9/jre/bin/java -versão.

    ERDDAP™ trabalhos com Java de outras fontes, mas recomendamos o Adotivo porque é o principal, apoiado pela comunidade,
grátis (como em cerveja e fala) versão de Java 21 que oferece suporte de longo prazo (atualizações gratuitas por muitos anos após a versão inicial) .
Por razões de segurança, atualize o seu ERDDAP A versão de Java periodicamente como novas versões de Java 21 tornam-se disponíveis a partir do Adotivo.

    ERDDAP™ foi testado e usado extensivamente com 21, não outras versões. Por várias razões, não testamos nem apoiamos outras versões de Java .
     
## Tomcat{#tomcat} 

2.  [Configurar](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat é o mais amplamente utilizado Java Servidor de Aplicação,
que Java software que está entre os serviços de rede do sistema operacional e Java software de servidor como ERDDAP™ .
É Software de código livre e aberto (FOSS) .

Você pode usar outro Java Servidor de Aplicação (por exemplo, Jetty) Mas só testamos e apoiamos o Tomcat.

   * Faça o download do Tomcat e descompacte-o em seu servidor ou PC.
Por razões de segurança, é quase sempre melhor usar a versão mais recente do Tomcat 10 (versão 9 e abaixo não são aceitáveis) 
que é projetado para trabalhar com Java 21 ou mais. Abaixo, o diretório Tomcat será chamado de `tomcat`.

Não&#33; Se você já tem um Tomcat executando alguma outra aplicação web (especialmente TRÊS) , recomendamos que você instale ERDDAP™ em
      [um segundo Tomcat](/docs/server-admin/additional-information#second-tomcat) Porque ERDDAP™ necessidades diferentes configurações Tomcat
e não deve ter que lidar com outras aplicações para memória.

     * No Linux, [baixar o "Core" "tar .gz " Distribuição Tomcat](https://tomcat.apache.org/download-10.cgi) e desempachem-no.
Recomendamos desempachá-lo em `/usr/local`.
     * Em um Mac, Tomcat provavelmente já está instalado em `/Library/Tomcat`, mas deve atualizá-lo para a versão mais recente do Tomcat 10.
Se você o baixar, [baixar o "Core" "tar .gz " Distribuição Tomcat](https://tomcat.apache.org/download-10.cgi) e desempachá-lo em `/Library/Tomcat`.
     * No Windows, você pode [baixar a distribuição "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (que não se mexe com o registro do Windows e que você controla de uma linha de comando DOS) e desempachá-lo em um diretório apropriado.
        (Para o desenvolvimento, usamos a distribuição "Core" "zip". Fazemos um diretório `/programas` e desempachá-lo lá.) 
Ou você pode baixar a distribuição "Core" "64-bit Windows zip", que inclui mais recursos.
Se a distribuição for um instalador do Windows, provavelmente colocará Tomcat em, por exemplo, `/Program Files/apache-tomcat-10.0.23`.
             
### servidor.xml{#serverxml} 

*  [servidor.xml](#serverxml) - No arquivo `tomcat/conf/server.xml`, há duas mudanças que você deve fazer para cada um dos dois ` <Connector> § tags
   (um para `&lt;Connector port="8080"` e um para `&lt;Conector port="8443"`) .
   1.  (Recomendado) Aumentar o valor do parâmetro `connectionTimeout`, talvez para 300000 (milissegundos, que são 5 minutos) .
   2.  (Recomendado) Adicione um novo parâmetro: `relaxedQueryChars="[] | " Isto é opcional e ligeiramente menos seguro,
mas remove a necessidade de usuários codificar por cento esses caracteres quando ocorrem nos parâmetros da URL de solicitação de um usuário.
             
### content.xml{#contentxml} 

* context.xml - ... Recursos Cache - Em `tomcat/conf/context.xml`, logo antes do ` </Context> ` tag, alterar a tag Recursos
   (ou adicioná-lo se já não estiver lá) para definir o cache Parâmetro MaxSize para 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Isso evita inúmeros avisos em catalina. que tudo começar com
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* Em computadores Linux, altere as configurações de tempo limite do Apache para que os pedidos de usuários demorados não sejam demorados
   (com o que muitas vezes aparece como um erro "Proxy" ou "Bad Gateway") . Como usuário root:
  * Modificar o Apache ` http arquivo d.conf` (geralmente em `/etc/ http d/conf/ ") :
    * Alterar o ` existente <Timeout> Configuração (ou adicionar um no final do arquivo) para 3600 (segundos.) , em vez do padrão 60 ou 120 segundos.
    * Alterar o ` existente <ProxyTimeout> Configuração (ou adicionar um no final do arquivo) para 3600 (segundos.) , em vez do padrão 60 ou 120 segundos.
  * Reinicie Apache: `/usr/sbin/apachectl -k gracioso " (mas às vezes é em um diretório diferente) .

### Segurança{#security} 
         
* Recomendação de segurança: Ver [estas instruções](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) para aumentar a segurança de
sua instalação Tomcat, especialmente para servidores públicos.
         
* Para o público ERDDAP™ instalações no Linux e Macs, é melhor configurar o Tomcat (o programa) como pertencente ao usuário `tomcat "
   (um usuário separado com permissões limitadas e que [não tem senha](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Assim, apenas o super usuário pode mudar para atuar como usuário `tomcat`. Isso torna impossível para hackers fazer login em seu servidor como usuário `tomcat`.
E, em qualquer caso, você deve fazê-lo para que o usuário `tomcat` tenha permissões muito limitadas no sistema de arquivos do servidor (leia+write+execute privilégios
para a árvore de diretório `apache-tomcat` e ` <bigParentDirectory> ` e privilégios somente leitura para diretórios com dados que ERDDAP™ precisa de acesso a).
  * Você pode criar a conta de usuário `tomcat` (que não tem senha) usando o comando:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Você pode mudar para trabalhar como usuário `tomcat` usando o comando
    ```
    sudo su - tomcat
    ```
     (Ele irá pedir-lhe a senha do superusuário para permissão para fazer isso.) 
    * Você pode parar de trabalhar como tomcat do usuário usando o comando
    ```
    exit
    ````
    * Faça a maior parte do resto do Tomcat e ERDDAP™ instruções de configuração como usuário `tomcat`. Mais tarde, execute os scripts `startup.sh` e `shutdown.sh` como usuário `tomcat "
para que Tomcat tenha permissão para escrever para seus arquivos de log.
    * Depois de descompactar Tomcat, do pai do diretório `apache-tomcat`:
      * Alterar a propriedade da árvore de diretório apache-tomcat para o usuário tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (mas substitua o nome real do seu diretório tomcat) .
      * Alterar o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores da Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Alterar permissões para que o tomcat e o grupo tenham lido, escrever, executar privilégios:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Remover as permissões do usuário "outros" para ler, escrever ou executar:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Isso é importante, porque impede que outros usuários leiam informações possivelmente sensíveis em ERDDAP™ arquivos de configuração.

### Memória{#memory} 

Definir Variáveis de Ambiente da Tomcat

* No Linux e Macs:
Criar um arquivo `tomcat/bin/setenv.sh " (ou em Red Hat Enterprise Linux \\[ RH \\] , editar `~tomcat/conf/tomcat10.conf ") para definir as variáveis de ambiente da Tomcat.
Este arquivo será usado por `tomcat/bin/startup.sh` e `shutdown.sh`. O arquivo deve conter algo como:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (mas substitua os nomes de diretório do seu computador) .
   (Se você definir anteriormente `JRE_HOME`, você pode remover isso.) 
Em Macs, você provavelmente não precisa definir `JAVA_HOME`.

* No Windows:
Crie um arquivo `tomcat\bin\\setenv.bat` para definir as variáveis de ambiente de Tomcat.
Este arquivo será usado por `tomcat\bin\\startup.bat` e ` shutdown.bat '.
O arquivo deve conter algo como:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (mas substitua os nomes de diretório do seu computador) .
Se isso for apenas para testes locais, remova "-servidor".
   (Se você definir anteriormente `JRE_HOME`, você pode remover isso.) 

As configurações de memória `-Xmx` e `-Xms` são importantes porque ERDDAP™ funciona melhor com mais memória.
Sempre configure `-Xms` para o mesmo valor que `-Xmx`.

* Para sistemas operacionais de 32 bits e 32 bits Java :
64 bits Java é muito melhor do que 32 bits Java , mas 32 bit Java vai funcionar enquanto o servidor não estiver realmente ocupado.
Quanto mais memória física no servidor melhor: 4+ GB é realmente bom, 2 GB é ok, menos não é recomendado.
Com 32 bits Java , mesmo com abundante memória física, Tomcat e Java não será executado se você tentar definir `-Xmx` muito acima de 1500M (1200M em alguns computadores) .
Se o seu servidor tiver menos de 2GB de memória, reduza o valor `-Xmx` (em 'M'egaBytes) para 1/2 da memória física do computador.

* Para sistemas operacionais de 64 bits e 64 bits Java :
64 bits Java só funcionará em um sistema operacional de 64 bits.
  * Com Java 8, você precisa adicionar `-d64` ao parâmetro Tomcat `CATALINA_OPTS` em `setenv.bat`.
  * Com Java 21, você escolhe 64 bits Java Quando você baixar uma versão do Java marcado "64 bits".

Com 64 bits Java , Tomcat e Java pode usar configurações muito altas de `-Xmx` e `-Xms`. Quanto mais memória física no servidor melhor.
Como uma sugestão simplista: recomendamos que você configure `-Xmx` e `-Xms` para (em 'M'egaBytes) para 1/2 (ou menos) da memória física do computador.
Podes ver se o Tomcat, Java e ERDDAP™ estão realmente em execução no modo de 64 bits, procurando por " bit," em ERDDAP 'S Daily Report email
ou no `bigParentDirectory/logs/ [- Não.](/docs/server-admin/additional-information#log) Arquivo (`bigParentDirectory` é especificado em [setup.xml](#setupxml) ) .

#### Coleção de lixo{#garbage-collection} 

* Em ERDDAP™ ' [- Não.](/docs/server-admin/additional-information#log) arquivo, você verá muitos "GC (Incumprimento de Estado) "mensagens.
Isto geralmente não é um problema. É uma mensagem frequente de um funcionamento normal Java dizendo que acabou de terminar um lixo menor
coleção porque saiu do quarto em Eden (a seção da Java heap para objetos muito jovens) . Normalmente a mensagem mostra você
`memoryUseAfore-&gt;memoryUseAfter`. Se esses dois números estão próximos, significa que a coleção de lixo não foi produtiva.
A mensagem é apenas um sinal de problemas se é muito frequente (a cada poucos segundos) , não produtivo, e os números são grandes e não crescem,
que juntos indicam que Java precisa de mais memória, está lutando para libertar a memória, e é incapaz de liberar a memória.
Isso pode acontecer durante um tempo estressante, então vá embora. Mas se persistir, isso é um sinal de problemas.
* Se você vir `java.lang.OutOfMemoryError`s in ERDDAP™ ' [- Não.](/docs/server-admin/additional-information#log) arquivo,
ver [Erro](/docs/server-admin/additional-information#outofmemoryerror) para dicas sobre como diagnosticar e resolver os problemas.
         
### Permissões{#permissions} 

*  [No Linux e Macs, altere as permissões](#permissions) de todos os arquivos `*.sh` em `tomcat/bin/` para ser executável pelo proprietário:
  ```
  chmod +x *.sh
  ```

### Fontes{#fonts} 

*  [Fontes para imagens:](#fonts) Preferimos fortemente o livre [Fontes de DejaVu](https://dejavu-fonts.github.io/) para o outro Java fontes.
Usar essas fontes é fortemente recomendado, mas não é necessário.

Se você optar por não usar as fontes DejaVu, você precisa alterar a configuração fontFamily no setup.xml para ` <fontFamily> Sansserif </fontFamily> #
que está disponível com tudo Java distribuições. Se você definir ` <fontFamily> ` ao nome de uma fonte que não está disponível, ERDDAP™ não vai carregar
e imprimirá uma lista de fontes disponíveis no arquivo `log.txt`. Você deve usar uma dessas fontes.

Se você optar por usar as fontes DejaVu, verifique se o ` <fontFamily> ` configuração em setup.xml é ` <fontFamily> DejaVu Sans </fontFamily> '.

Para instalar as fontes DejaVu, faça o download [DejaVuFontes .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
e descompactar os arquivos de fonte para um diretório temporário.

  * No Linux:
    * Para Linux Adoptium Java distribuição, ver [estas instruções](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Com outros Java distribuições: Como o usuário `tomcat`, copie os arquivos de fonte em `$JAVA_HOME/lib/fonts` assim Java pode encontrar as fontes.
Lembre-se: se / quando você mais tarde atualizar para uma versão mais recente de Java , você precisa reinstalar essas fontes.
  * Em Macs: para cada arquivo de fonte, clique duas vezes nele e, em seguida, clique em Instalar fonte.
  * No Windows 7 e 10: no Windows Explorer, selecione todos os arquivos de fonte. Clique com o botão direito. Clique em Instalar.
             
### Teste Tomcat{#test-tomcat} 

* Teste sua instalação Tomcat.
  * Linux:
    * Como usuário "tomcat", execute `tomcat/bin/startup.sh`.
    * Ver sua URL + ":8080/" no seu navegador (por exemplo, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (executar tomcat como usuário administrador do sistema) :
    * Executar `tomcat/bin/startup.sh`.
    * Ver sua URL + ":8080/" no seu navegador (por exemplo, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Note que, por padrão, seu Tomcat só é acessível por você. Não é publicamente acessível.
  * Localhost do Windows:
    * Clique com o botão direito no ícone Tomcat na bandeja do sistema e escolha "Serviço inicial".
    * Visualização [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , ou talvez [http://localhost:8080/](http://localhost:8080/) , no seu navegador. Note que, por padrão, seu Tomcat só é acessível por você. Não é publicamente acessível.

Você deve ver a página "Parabéns" Tomcat.

Se houver problemas, consulte o arquivo de log do Tomcat em `tomcat/logs/catalina.out`.

### Problemas com a instalação do Tomcat?{#troubles-with-the-tomcat-installation} 

* No Linux e Mac, se você não consegue alcançar Tomcat ou ERDDAP™   (ou talvez você simplesmente não pode alcançá-los de um computador fora do seu firewall) ,
você pode testar se Tomcat está ouvindo a porta 8080, digitando (como raiz) em uma linha de comando do servidor:

  ```
  netstat -tuplen | grep 8080
  ```

Isso deve retornar uma linha com algo como:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (onde `#`` é algum dígito) , indicando que um processo `java` (presumivelmente Tomcat) está ouvindo na porta "8080" para tráfego "tcp".
Se nenhuma linha foi retornada, se a linha retornada é significativamente diferente, ou se duas ou mais linhas foram retornadas, então pode haver um problema com as configurações da porta.

* Consulte o arquivo de log do Tomcat `tomcat/logs/catalina.out`. Problemas de Tomcat e alguns ERDDAP™ problemas de inicialização são quase sempre indicados lá.
Isso é comum quando você está configurando primeiro ERDDAP™ .

* Ver [Tomcat](https://tomcat.apache.org/) site ou pesquisar a web para ajuda, mas por favor nos avise os problemas que você tinha e as soluções que você encontrou.

* Veja o nosso [seção sobre como obter suporte adicional](/docs/intro#support) .
             
###  ERDDAP™ Conteúdo{#erddap-content} 
3.   [Configure os arquivos de configuração `tomcat/content/erddap`.](#erddap-content) 
No Linux, Mac e Windows, download [O que é isso? .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
e descompacte-o no diretório `tomcat`, criando `tomcat/content/erddap`.

__Version 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datado 2024-10-14__

Algumas versões anteriores também estão disponíveis:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datado de 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datado de 2022-02-16) 
    *  [2.2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, datado de 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, datado de 2022-12-08) 
    *  [2.2.3.](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, datado de 2023-02-27) 

#### Outros relatórios{#other-directory} 

Para Red Hat Enterprise Linux (RH) ou para outras situações em que você não está autorizado a modificar o diretório Tomcat ou onde você quer / precisa
para pôr o ERDDAP™ diretório de conteúdo em algum outro local por alguma outra razão (por exemplo, se você usar Jetty em vez de Tomcat) ,
um comentário .zip ` no diretório desejado (para o qual apenas o usuário `tomcat` tem acesso) e definir o ` erddapContentDirectory § propriedade do sistema
 (por exemplo. erddapContentDirectory  =~tomcat/content/erddap ") Então... ERDDAP™ pode encontrar este novo diretório de conteúdo.

### setup.xml{#setupxml} 

*  [Leia os comentários em `tomcat/content/erddap/setup.xml "](#setupxml) e fazer as alterações solicitadas. setup.xml é o arquivo com todas as configurações que especificam como seu ERDDAP™ comporta-se.

Para a configuração inicial, você deve pelo menos alterar essas configurações:
      * " <bigParentDirectory> "
      * " <emailEverythingTo> "
      * " <baseUrl> "
      * " <email...> ` configurações
      * " <admin...> ` configurações
      * " <baseHttpsUrl> " (quando você configurar https ) 

Quando você cria o grandeParentDirectory, do diretório pai do bigParentDirectory:

    * Faça do usuário `tomcat` o proprietário do `bigParentDirectory`:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Alterar o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores da Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Alterar permissões para que o tomcat e o grupo tenham lido, escrever, executar privilégios:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Remova as permissões do usuário "outros" para ler, escrever ou executar. Isto é importante para evitar a leitura de informações possivelmente sensíveis
em ERDDAP™ registrar arquivos e arquivos com informações sobre conjuntos de dados privados.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variáveis de Ambiente{#environment-variables} 

Começar com ERDDAP™ V2.13, ERDDAP™ administradores podem substituir qualquer valor no setup.xml especificando uma variável de ambiente
nomeado ` ERDDAP _valueName` antes de correr ERDDAP™ . Por exemplo, use ` ERDDAP _baseUrl` substitui o ` <baseUrl> Valor.
Isso pode ser útil ao implantar ERDDAP™ com um recipiente como Docker, como você pode colocar configurações padrão no setup.xml
e, em seguida, fornecer configurações especiais através de variáveis de ambiente. Se você fornecer informações secretas para ERDDAP™ através deste método,
Certifique-se de verificar que as informações permanecerão secretas. ERDDAP™ somente lê variáveis de ambiente uma vez por startup,
no primeiro segundo de inicialização, então uma maneira de usar isso é: definir as variáveis de ambiente, iniciar ERDDAP ,
esperar ERDDAP™ é iniciado, então não definir as variáveis de ambiente.

###  datasets.xml  {#datasetsxml} 

* Leia os comentários em [ **Trabalhar com o datasets.xml Arquivo** ](/docs/server-admin/datasets) . Mais tarde, depois de você começar ERDDAP™ correndo
pela primeira vez (geralmente com apenas os conjuntos de dados padrão) , você modificará o XML em `tomcat/content/erddap/ datasets.xml "
para especificar todos os conjuntos de dados que você deseja ERDDAP™ servir. É aqui que você vai gastar a maior parte do seu tempo
durante a configuração ERDDAP™ e mais tarde, mantendo o seu ERDDAP™ .

Você pode ver um exemplo [ datasets.xml em GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Diferentemente) Agora ou (ligeiramente mais provável) no futuro, se você quiser modificar o arquivo CSS do erddap, copie
`tomcat/content/erddap/images/erddapStart2.css` para `tomcat/content/erddap/images/erddap2.css` e, em seguida, fazer alterações nele.
Alterações para `erddap2.css` só entram em vigor quando ERDDAP™ é reiniciado e muitas vezes também exigem que o usuário desmarque os arquivos em cache do navegador.
     
 ERDDAP™ não funcionará corretamente se o setup.xml ou datasets.xml arquivo não é um arquivo XML bem formado. Então, depois de editar esses arquivos,
é uma boa ideia verificar se o resultado é XML bem formado colando o texto XML em um verificador XML como [xmlvalidação](https://www.xmlvalidation.com/) .
     
### Instale o erddap. arquivo de guerra{#install-the-erddapwar-file} 

4. No Linux, Mac e Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) __ em `tomcat/webapps`:

__Versão 2.28.1, 622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, datado de 2025-09-05__________________________________________________________________________________________________________________________________________________________________________________________________________

O arquivo .war é grande porque contém dados de costa de alta resolução, limite e elevação necessários para criar mapas.

Algumas versões anteriores também estão disponíveis.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, datado de 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, datado de 2022-02-23) 
   *  [2.2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, datado de 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datado de 2022-12-08) 
   *  [2.2.3.](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datado de 2023-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datado de 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datado de 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, datado de 2025-03-31) 
   *  [2.2.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, datado de 2025-06-11) 

### Configurar proxy (implantação específica)  {#proxy} 

 ERDDAP™ é tipicamente implantado atrás de um proxy reverso do servidor web para permitir que ele seja servido em portas HTTP padrão (80 e 443) .
A terminação SSL/TLS é frequentemente reforçada na camada proxy do servidor web também. Os específicos dependem dos requisitos de cada implantação.

#### Apache{#apache} 

1. Certifique-se de que `mod_proxy` e `mod_proxy_ http ' são carregados:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modificar o ` existente <VirtualHost> # tag (se houver um) , ou adicione um no final do arquivo:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Se ERDDAP™ é servido em um caminho diferente de `/erddap`, também definir o cabeçalho `X-Forwarded-Prefix` para o
segmento de caminho _before_ `/erddap`. Esta definição seria apropriada para uma ERDDAP™ servido em
'/subpath/erddap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Então reinicie Apache: `/usr/sbin/apachectl -k gracioso " (mas às vezes é em um diretório diferente) .
         
#### NGINX{#nginx} 

No arquivo de configuração nginx, defina esses cabeçalhos:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Se ERDDAP™ é servido em um caminho diferente de `/erddap`, também definir o cabeçalho `X-Forwarded-Prefix` para o
segmento de caminho _before_ `/erddap`. Esta definição seria apropriada para uma ERDDAP™ servido em
'/subpath/erddap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Para obter NGINX e ERDDAP™ trabalhar corretamente com https , você precisa colocar o seguinte snippet dentro do Tomcat server.xml` <Host> ` bloco:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Começar Tomcat{#start-tomcat} 

*  (Não recomendo usar o Tomcat Web Application Manager. Se você não desligar totalmente e iniciar Tomcat, mais cedo ou mais tarde você terá problemas de memória PermGen.) 
*  (No Linux ou Mac OS, se você criou um usuário especial para executar Tomcat, por exemplo, tomcat, lembre-se de fazer os seguintes passos como esse usuário.) 
* Se Tomcat já estiver em execução, desligue Tomcat com (em Linux ou Mac OS) `tomcat/bin/shutdown.sh`
ou (em Windows) "tomcat\bin\" shutdown.bat "

No Linux, use `ps -ef | grep tomcat` antes e depois de `shutdown.sh` para garantir que o processo de tomcat parou.
O processo deve ser listado antes do desligamento e eventualmente não listado após o desligamento.
Pode levar um minuto ou dois para ERDDAP™ para desligar completamente. Sê paciente. Ou se parecer que não vai parar por conta própria, use:
'kill -9 <processID> "
* Comece Tomcat com (em Linux ou Mac OS) `tomcat/bin/startup.sh` ou (em Windows) `tomcat\bin\\startup.bat "

## É ERDDAP™ Correr?{#is-erddap-running} 

Use um navegador para tentar visualizarhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ inicia-se sem nenhum conjunto de dados carregado. Os conjuntos de dados são carregados em um segmento de fundo e assim tornar-se disponível one-by-one.

### Resolução de problemas{#troubleshooting} 

* Quando um pedido de um usuário entra, ele vai para o Apache (em computadores Linux e Mac OS) Então, Tomcat. ERDDAP™ .
* Você pode ver o que vem para Apache (e erros relacionados) nos arquivos de log Apache.
*    [Tu.](/docs/server-admin/additional-information#tomcat-logs) pode ver o que vem a Tomcat (e erros relacionados) 
nos arquivos de log Tomcat (`tomcat/logs/catalina.out` e outros arquivos nesse diretório) .
*    [Tu.](/docs/server-admin/additional-information#log) pode ver o que vem a ERDDAP , mensagens de diagnóstico de ERDDAP ,
e mensagens de erro ERDDAP , no ERDDAP™ " <bigParentDirectory> /logs/log.txt` arquivo.
* O Tomcat não começa. ERDDAP™ até Tomcat receber um pedido ERDDAP™ . Então você pode ver nos arquivos de log Tomcat se ele
início ERDDAP™ ou se houver uma mensagem de erro relacionada a essa tentativa.
* Quando ERDDAP™ começa, ele renomeia o velho ERDDAP™ arquivo log.txt (Tradução e Revisão: Em <CurrentTime> .txt) e cria um novo arquivo log.txt.
Então, se o arquivo `log.txt` é velho, é um sinal de que ERDDAP™ recentemente não reiniciou. ERDDAP™ escreve informações de log para um buffer
e apenas escreve o buffer para o arquivo de log periodicamente, mas você pode forçar ERDDAP™ para escrever o buffer ao arquivo de log visitando
" /erddap/status.html '.

### Problemas: Versão antiga de Java  {#trouble-old-version-of-java} 

Se você estiver usando uma versão de Java é muito velho para ERDDAP , ERDDAP™ não será executado e você verá uma mensagem de erro no arquivo de log do Tomcat como

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

A solução é atualizar para a versão mais recente de Java e certifique-se de que Tomcat está usando-o.

### Problemas: Inicialização lenta Primeira vez{#trouble-slow-startup-first-time} 

Tomcat tem que fazer um monte de trabalho da primeira vez um aplicativo como ERDDAP™ é iniciado; notavelmente, ele tem que descompactar o arquivo `erddap.war`
 (que é como um .zip arquivo) . Em alguns servidores, a primeira tentativa de visualizar ERDDAP™ barracas (30 segundos?) até que este trabalho esteja terminado.
Em outros servidores, a primeira tentativa falhará imediatamente. Mas se você esperar 30 segundos e tentar novamente, terá sucesso se ERDDAP™ foi instalado corretamente.

Não há solução para isto. É assim que Tomcat funciona. Mas só ocorre a primeira vez depois de instalar uma nova versão de ERDDAP™ .

## Desligue e reinicie{#shut-down-and-restart} 

No futuro, para fechar (e reiniciar)   ERDDAP™ Veja [Como Desligar e Reiniciar Tomcat e ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problemas?{#trouble} 

Problemas para instalar Tomcat ou ERDDAP™ ? Veja o nosso [seção sobre como obter suporte adicional](/docs/intro#support) .

## Notificação por e-mail de novas versões de ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Se você quiser receber um e-mail sempre que uma nova versão de ERDDAP™ está disponível ou outro importante ERDDAP™ anúncios,
você pode se juntar ERDDAP™ lista de anúncios [aqui.](https://groups.google.com/g/erddap-announce) . Esta lista é média de aproximadamente um e-mail a cada três meses.

## Personalizar{#customize} 

*  [Personalize o seu ERDDAP™ para destacar sua organização (não NOAA   ERD ) .](#customize) 
* Alterar o banner que aparece no topo de tudo ERDDAP™ .html páginas editando o ` <startBodyHtml5> # tag in your ` datasets.xml - arquivo.
(Se não houver um, copie o padrão ERDDAP™ 's 'tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` arquivo
em ` datasets.xml E editá-lo.) Por exemplo, você poderia:
  * Use uma imagem diferente (ou seja, o logotipo da sua organização) .
  * Mude a cor de fundo.
  * Mudança " ERDDAP™ " para "_YourOrganization_'s ERDDAP™ "
  * Alterar "Acesso mais fácil aos dados científicos" para "Acesso mais fácil aos dados do _YourOrganization_".
  * Altere os links "Comprei para você" para ser links para sua organização e fontes de financiamento.
* Altere as informações no lado esquerdo da página inicial editando o ` <theShortDescriptionHtml> # tag in your ` datasets.xml - arquivo.
(Se não houver um, copie o padrão ERDDAP™ 's 'tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` arquivo
em ` datasets.xml E editá-lo.) Por exemplo, você poderia:
  * Descreva o que sua organização e/ou grupo faz.
  * Descrever que tipo de dados este ERDDAP™ Sim.
  * Para alterar o ícone que aparece nas guias do navegador, coloque o favicon da sua organização. ico em `tomcat/content/erddap/images/`.
Verhttps://en.wikipedia.org/wiki/Favicon.
