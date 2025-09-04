---
sidebar_position: 1
---

# Instalar
Como fazer a configuração inicial de ERDDAP™ no seu servidor

 ERDDAP™ pode ser executado em qualquer servidor que suporte Java e Tomcat (e outros servidores de aplicativos como Jetty, mas nós não os suportamos) .
 ERDDAP™ foi testado no Linux (incluindo na AWS da Amazon) , Mac, e computadores Windows.

*  **Acoplamento** - O quê? Nós fornecemos [ ERDDAP™ num recipiente Docker](https://hub.docker.com/r/erddap/erddap) 
e IOOS agora oferece um [Guia de início rápido para ERDDAP™ em um recipiente Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
É o padrão ERDDAP™ instalação, num contentor Docker.
Através do Docker Compor nós fornecemos maneiras fáceis de configurar ssl e monitoramento, leia mais dentro [Documentação da acoplagem](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Se você já usar o Docker, provavelmente vai preferir a versão do Docker.
Se você está olhando para executar em serviços de nuvem, você provavelmente vai preferir a versão Docker.
*  **Amazonas** - O quê? Se você estiver instalando ERDDAP™ em uma instância da Amazon Web Services EC2, veja isto [Visão geral dos Serviços Web da Amazon](/docs/server-admin/additional-information#amazon) Primeiro.
*  **Linux e Macs** - O quê? ERDDAP™ Funciona muito bem em computadores Linux e Mac. Veja as instruções abaixo.
*  **Janelas** - O quê? Windows é bom para testes ERDDAP™ e para uso pessoal (ver as instruções abaixo) ,
mas não recomendamos usá-lo para o público ERDDAP™ implantações. Em execução ERDDAP™ no Windows pode ter problemas:
nomeadamente, ERDDAP™ pode ser incapaz de apagar e/ou renomear arquivos rapidamente. Isso é provavelmente devido ao software antivírus
   (Por exemplo, de McAfee e Norton) que está verificando os arquivos para vírus. Se encontrar este problema
(que pode ser visto por mensagens de erro no [log.txt](/docs/server-admin/additional-information#log) arquivo como
"Não é possível excluir ..."), alterar as configurações do software antivírus pode aliviar parcialmente o problema. Ou considere usar um servidor Linux ou Mac.

 **A norma ERDDAP™ instruções de instalação para computadores Linux, Macs e Windows são:** 

0. Certifique-se de que quaisquer dependências estão instaladas. Em máquinas não-Windows (Linux e Mac) Você precisa de csh.

##  Java  {#java} 

1.  [Para ERDDAP™ v2.19+, configuração Java 21.](#java) 
Por razões de segurança, é quase sempre melhor usar a versão mais recente Java 21.
Por favor, baixe e instale a versão mais recente de
    [OpenJDK do Adoção (Temurina) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Para verificar a instalação, execute `/javaJreBinDirectory/java -version`, por exemplo
`/usr/local/jdk-21.0.3+9/jre/bin/java -versão.

    ERDDAP™ funciona com Java de outras fontes, mas recomendamos o Adoptionium porque é o principal, apoiado pela comunidade,
livre (como em cerveja e discurso) versão da Java 21 que oferece suporte a longo prazo (atualizações gratuitas para muitos anos após o lançamento inicial) .
Por razões de segurança, atualize o seu ERDDAP a versão da Java periodicamente como novas versões de Java 21 ficam disponíveis no Adoptionium.

    ERDDAP™ foi testado e utilizado extensivamente com 21, não com outras versões. Por várias razões, não testamos com nem suportamos outras versões de Java .
     
## Tomcat{#tomcat} 

2.  [Configurar](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat é o mais amplamente utilizado Java Servidor de Aplicações,
que é Java software que está entre os serviços de rede do sistema operacional e Java software de servidor como ERDDAP™ .
É Software Livre e de Código Aberto (FOSS) .

Você pode usar outro Java Servidor de aplicativos (Por exemplo, Jetty) Mas só testamos e apoiamos o Tomcat.

   * Baixe Tomcat e desempacote-o em seu servidor ou PC.
Por razões de segurança, é quase sempre melhor usar a última versão do Tomcat 10 (versão 9 e abaixo não são aceitáveis) 
que é concebido para trabalhar com Java 21 ou mais novo. Abaixo, o diretório Tomcat será referido como `tomcat`.

Aviso&#33; Se você já tem um Tomcat executando algum outro aplicativo web (especialmente TRÊS) , recomendamos que você instale ERDDAP™ em
      [um segundo Tomcat](/docs/server-admin/additional-information#second-tomcat) , porque ERDDAP™ precisa de configurações Tomcat diferentes
e não deveria ter que lidar com outras aplicações para a memória.

     * No Linux, [baixar o "tar Core" .gz " Distribuição Tomcat](https://tomcat.apache.org/download-10.cgi) e desempacotar.
Recomendamos desempacotá-lo em `/usr/local`.
     * Em um Mac, Tomcat provavelmente já está instalado em `/Library/Tomcat`, mas deve atualizá-lo para a versão mais recente do Tomcat 10.
Se o transferires, [baixar o "tar Core" .gz " Distribuição Tomcat](https://tomcat.apache.org/download-10.cgi) e desempacotá-lo em `/Library/Tomcat`.
     * No Windows, você pode [baixar a distribuição "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (que não mexe com o registro do Windows e que você controla a partir de uma linha de comando DOS) e desempacotá-lo em um diretório apropriado.
        (Para o desenvolvimento, usamos a distribuição "Core" "zip". Nós fazemos um diretório `/programas` e desempacotá-lo lá.) 
Ou você pode baixar a distribuição "Core" "64 bits do Windows zip", que inclui mais recursos.
Se a distribuição for um instalador do Windows, provavelmente colocará o Tomcat, por exemplo, `/Program Files/apache-tomcat-10.0.0.23`.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - No arquivo `tomcat/conf/server.xml`, existem duas alterações que você deve fazer para cada um dos dois ` <Connector> ` tags
   (um para `&lt;Connector port="8080"` e outro para `&lt;Conector port="8443"`) .
   1.  (Recomendado) Aumentar o valor do parâmetro `connectionTimeout`, talvez para 300000 (milissegundos, que são 5 minutos) .
   2.  (Recomendado) Adicionar um novo parâmetro: `relaxedQueryChars="[] | "`. Isto é opcional e um pouco menos seguro,
mas remove a necessidade de os usuários codificarem esses caracteres quando ocorrem nos parâmetros da URL de solicitação de um usuário.
             
### content.xml{#contentxml} 

* context.xml - O quê? Resources Cache - Em `tomcat/conf/context.xml`, logo antes do ` </Context> ` tag, altere a tag Recursos
   (ou adicioná-lo se já não estiver lá) para configurar o cache Parâmetro MaxSize a 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Isto evita numerosos avisos em catalina. que tudo começa com
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Tempo- limite Apache{#apache-timeout} 

* Nos computadores Linux, altere as configurações de tempo limite Apache para que as solicitações de usuário que consomem tempo não diminua
   (com o que muitas vezes aparece como um erro "Proxy" ou "Bad Gateway") . Como usuário root:
  * Modificar o Apache ` http ficheiro d.conf` (normalmente em `/etc/ http d/conf/ `) :
    * Alterar o ` existente <Timeout> Configuração ` (ou adicionar um no fim do ficheiro) até 3600 (segundos) , em vez do padrão 60 ou 120 segundos.
    * Alterar o ` existente <ProxyTimeout> Configuração ` (ou adicionar um no fim do ficheiro) até 3600 (segundos) , em vez do padrão 60 ou 120 segundos.
  * Reiniciar o Apache: `/usr/sbin/apachectl -k gracioso ` (mas às vezes está em um diretório diferente) .

### Segurança{#security} 
         
* Recomendação de segurança: Ver [estas instruções](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) aumentar a segurança de
sua instalação Tomcat, especialmente para servidores públicos.
         
* Para o público ERDDAP™ instalações em Linux e Macs, é melhor configurar Tomcat (o programa) como pertencente ao utilizador `tomcat `
   (um usuário separado com permissões limitadas e que [não tem senha](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Assim, apenas o super usuário pode mudar para atuar como usuário `tomcat`. Isso torna impossível para hackers se conectarem ao seu servidor como usuário `tomcat`.
E em qualquer caso, você deve fazê-lo para que o usuário `tomcat` tenha permissões muito limitadas no sistema de arquivos do servidor (leia+gravar+executar privilégios
para a árvore de directórios `apache-tomcat` e ` <bigParentDirectory> ` e somente leitura privilégios para diretórios com dados que ERDDAP™ precisa de acesso).
  * Você pode criar a conta de usuário 'tomcat' (que não tem senha) usando o comando:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Você pode mudar para trabalhar como usuário `tomcat` usando o comando
    ```
    sudo su - tomcat
    ```
     (Ele lhe pedirá a senha do superusuário para permissão para fazer isso.) 
    * Você pode parar de trabalhar como tomcat usando o comando
    ```
    exit
    ````
    * Fazer a maioria do resto do Tomcat e ERDDAP™ instruções de configuração como usuário `tomcat`. Mais tarde, execute os scripts `startup.sh' e `shutdown.sh` como usuário `tomcat `
para que o Tomcat tenha permissão para escrever em seus arquivos de log.
    * Depois de desempacotar o Tomcat, do pai do directório `apache-tomcat`:
      * Mudar a propriedade da árvore de diretórios apache-tomcat para o usuário tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (mas substitua o nome real do seu diretório tomcat) .
      * Altere o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores do Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Alterar permissões para que o tomcat e o grupo tenham lido, escrito e executado privilégios:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Remover as permissões de "outro" usuário para ler, escrever ou executar:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Isto é importante, porque impede outros usuários de ler informações possivelmente sensíveis em ERDDAP™ configurar arquivos.

### Memória{#memory} 

Definir as Variáveis de Ambiente do Tomcat

* No Linux e Macs:
Criar um ficheiro `tomcat/bin/setenv.sh ` (ou no Red Hat Enterprise Linux \\[ RHEL \\] , editar `~tomcat/conf/tomcat10.conf `) para definir as variáveis de ambiente do Tomcat.
Este arquivo será usado por `tomcat/bin/startup.sh` e `shutdown.sh`. O arquivo deve conter algo como:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (mas substitua os nomes das pastas do seu computador) .
   (Se você definir anteriormente `JRE_HOME`, você pode remover isso.) 
No Macs, você provavelmente não precisa definir `JAVA_HOME`.

* No Windows:
Crie um arquivo `tomcat\bin\\setenv.bat` para definir as variáveis de ambiente do Tomcat.
Este arquivo será usado por `tomcat\bin\\startup.bat` e ` shutdown.bat `.
O arquivo deve conter algo como:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (mas substitua os nomes das pastas do seu computador) .
Se isso for apenas para testes locais, remova "-servidor".
   (Se você definir anteriormente `JRE_HOME`, você pode remover isso.) 

As configurações de memória '-Xmx' e '-Xms' são importantes porque ERDDAP™ funciona melhor com mais memória.
Sempre definir `-Xms` para o mesmo valor que `-Xmx`.

* Para sistemas operacionais de 32 bits e 32 bits Java :
64 bits Java é muito melhor do que 32 bits Java , mas 32 bits Java funcionará enquanto o servidor não estiver realmente ocupado.
Quanto mais memória física no servidor melhor: 4+ GB é muito bom, 2 GB está bem, menos não é recomendado.
Com 32 bits Java , mesmo com memória física abundante, Tomcat e Java não será executado se você tentar definir `-Xmx` muito acima de 1500M (1200M em alguns computadores) .
Se o seu servidor tiver menos de 2GB de memória, reduza o valor `-Xmx` (em 'M'egaBytes) para 1/2 da memória física do computador.

* Para sistemas operacionais de 64 bits e 64 bits Java :
64 bits Java só funcionará em um sistema operacional de 64 bits.
  * Com Java 8, você precisa adicionar `-d64` ao parâmetro Tomcat `CATALINA_OPTS` em `setenv.bat`.
  * Com Java 21, você escolhe 64 bits Java quando você baixar uma versão de Java marcado "64 bits".

Com 64 bits Java , Tomcat e Java pode usar configurações de `-Xmx' e `-Xms' muito altas. Quanto mais memória física no servidor, melhor.
Como uma sugestão simplista: recomendamos que você defina `-Xmx` e `-Xms` para (em 'M'egaBytes) a 1/2 (ou menos) da memória física do computador.
Você pode ver se Tomcat, Java , e ERDDAP™ estão realmente rodando em modo 64 bits, procurando por "bit," em ERDDAP 's Daily Report email
quer no «bigPaintDirectory/logs/ [log.txt](/docs/server-admin/additional-information#log) ` arquivo («bigPaintDirectory» [setup.xml](#setupxml) ) .

#### Colecção de Lixo{#garbage-collection} 

* In ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) arquivo, você verá muitos "GC (Falha na atribuição) "mensagens.
Isto normalmente não é um problema. É uma mensagem frequente de uma operação normal Java dizendo que acabou um lixo menor
coleção porque ficou sem espaço no Éden (a secção da Java pilha para objetos muito jovens) . Normalmente a mensagem mostra- lhe
`memoryUseBefore-&gt;memoryUseAfter`. Se esses dois números estão próximos, significa que a recolha de lixo não foi produtiva.
A mensagem é apenas um sinal de problemas se for muito frequente (a cada poucos segundos) , não produtivo, e os números são grandes e não crescentes,
que em conjunto indicam que Java precisa de mais memória, está a lutar para libertar a memória, e é incapaz de libertar a memória.
Isto pode acontecer durante um tempo estressante, e depois desaparecer. Mas se persistir, isso é sinal de problemas.
* Se você ver `java.lang.OutOfMemoryError's in ERDDAP™ 's [log.txt](/docs/server-admin/additional-information#log) ficheiro,
ver [Erro da Memória](/docs/server-admin/additional-information#outofmemoryerror) para dicas sobre como diagnosticar e resolver os problemas.
         
### Permissões{#permissions} 

*  [No Linux e Macs, altere as permissões](#permissions) de todos os arquivos `*.sh` em `tomcat/bin/` para ser executável pelo proprietário:
  ```
  chmod +x *.sh
  ```

### Fontes{#fonts} 

*  [Fontes para imagens:](#fonts) Preferimos fortemente o livre [Fontes do DejaVu](https://dejavu-fonts.github.io/) para o outro Java fontes.
Usar estas fontes é fortemente recomendado, mas não é necessário.

Se você optar por não usar as fontes DejaVu, você precisa mudar a configuração de fonteFamília no setup.xml para ` <fontFamily> SansSerif </fontFamily> `,
que está disponível com todos Java distribuições. Se definir ` <fontFamily> ` para o nome de uma fonte que não está disponível, ERDDAP™ não carregar
e irá imprimir uma lista de fontes disponíveis no arquivo `log.txt`. Você deve usar uma dessas fontes.

Se você optar por usar as fontes DejaVu, certifique-se de que o ` <fontFamily> ` configuração em setup.xml é ` <fontFamily> DejaVu Sans </fontFamily> `.

Para instalar as fontes DejaVu, por favor baixe [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5522.795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) 
e descompacte os arquivos de fonte para uma pasta temporária.

  * No Linux:
    * Para o Linux Adoptium Java distribuições, ver [estas instruções](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Com outras Java distribuições: Como usuário do `tomcat`, copie os arquivos de fonte em `$JAVA_HOME/lib/fonts` assim Java pode encontrar as fontes.
Lembre-se: se/quando você mais tarde atualizar para uma versão mais nova de Java , você precisa reinstalar essas fontes.
  * No Macs: para cada arquivo de fonte, clique duas vezes nele e clique em Instalar fonte.
  * No Windows 7 e 10: no Windows Explorer, selecione todos os arquivos de fonte. Botão direito. Clique em Instalar.
             
### Teste Tomcat{#test-tomcat} 

* Teste a instalação do Tomcat.
  * Linux:
    * Como usuário "tomcat", execute `tomcat/bin/startup.sh`.
    * Ver o seu URL + ":8080/" no seu navegador (Por exemplo, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (execute tomcat como o usuário administrador do sistema) :
    * Executar `tomcat/bin/startup.sh`.
    * Ver o seu URL + ":8080/" no seu navegador (Por exemplo, [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Observe que, por padrão, seu Tomcat só é acessível por você. Não é acessível ao público.
  * Máquina local das janelas:
    * Clique com o botão direito no ícone Tomcat na bandeja do sistema e escolha "Iniciar serviço".
    * Ver [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , ou talvez [http://localhost:8080/](http://localhost:8080/) , no seu navegador. Observe que, por padrão, seu Tomcat só é acessível por você. Não é acessível ao público.

Devias ver a página do Tomcat "Parabéns".

Se houver problemas, consulte o arquivo de log Tomcat em `tomcat/logs/catalina.out`.

### Problemas com a instalação do Tomcat?{#troubles-with-the-tomcat-installation} 

* No Linux e Mac, se não conseguires contactar o Tomcat ou ERDDAP™   (Ou talvez não consiga contactá-los de um computador fora do seu firewall.) ,
você pode testar se Tomcat está ouvindo a porta 8080, digitando (como raiz) numa linha de comando do servidor:

  ```
  netstat -tuplen | grep 8080
  ```

Isso deve devolver uma linha com algo como:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (onde '#' é algum dígito) , indicando que um processo 'java' (Provavelmente Tomcat.) está ouvindo na porta "8080" para "tcp" tráfego.
Se nenhuma linha foi devolvida, se a linha devolvida é significativamente diferente, ou se duas ou mais linhas foram devolvidas, então pode haver um problema com as configurações do porto.

* Veja o arquivo de registro Tomcat `tomcat/logs/catalina.out`. Tomcat problemas e alguns ERDDAP™ problemas de inicialização são quase sempre indicados lá.
Isto é comum quando está a configurar pela primeira vez ERDDAP™ .

* Ver o [Tomcat](https://tomcat.apache.org/) site ou procurar na web por ajuda, mas por favor, informe-nos os problemas que você teve e as soluções que você encontrou.

* Veja o nosso [seção sobre obter suporte adicional](/docs/intro#support) .
             
###  ERDDAP™ Conteúdo{#erddap-content} 
3.   [Configure os arquivos de configuração `tomcat/content/erddap`.](#erddap-content) 
No Linux, Mac e Windows, baixe [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
e descompactá-lo no diretório `tomcat`, criando `tomcat/content/erddap`.

__Versão 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datado 2024-10-14__

Algumas versões anteriores também estão disponíveis:

    *  [2. 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datado de 2022-02-16) 
    *  [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datado de 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, de 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, de 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE6868C40B9A29362, datado de 2023-02-27) 

#### Outra pasta{#other-directory} 

Para o Red Hat Enterprise Linux (RHEL) ou para outras situações em que você não tem permissão para modificar o diretório Tomcat ou onde você deseja/necessita
para colocar o ERDDAP™ diretório de conteúdo em algum outro local por alguma outra razão (por exemplo, se você usar Jetty em vez de Tomcat) ,
unzip `erddapContent .zip ` no diretório desejado (para o qual apenas o usuário 'tomcat' tem acesso) e definir o ` erddapContentDirectory ` propriedade do sistema
 (Por exemplo, ` erddapContentDirectory  =~tomcat/content/erddap `) assim ERDDAP™ pode encontrar este novo diretório de conteúdo.

### setup.xml{#setupxml} 

*  [Leia os comentários em `tomcat/content/erddap/setup.xml `](#setupxml) e fazer as alterações solicitadas. setup.xml é o arquivo com todas as configurações que especificam como seu ERDDAP™ comporta-se.

Para a configuração inicial, você deve pelo menos alterar estas configurações:
      * ` <bigParentDirectory> `
      * ` <emailEverythingTo> `
      * ` <baseUrl> `
      * ` <email...> Configuração `
      * ` <admin...> Configuração `
      * ` <baseHttpsUrl> ` (quando você configurar https ) 

Quando você cria o BigPaintDirectory, a partir do diretório pai do BigPaintDirectório:

    * Faça do utilizador 'tomcat' o proprietário do 'bigPaintDirectory':
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Altere o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores do Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Alterar permissões para que o tomcat e o grupo tenham lido, escrito e executado privilégios:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Remova as permissões de "outro" usuário para ler, escrever ou executar. Isto é importante para evitar a leitura de informações possivelmente sensíveis
em ERDDAP™ registrar arquivos e arquivos com informações sobre conjuntos de dados privados.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variáveis de Ambiente{#environment-variables} 

A começar por ERDDAP™ v2.13, ERDDAP™ administradores podem substituir qualquer valor no setup.xml especificando uma variável de ambiente
denominado ` ERDDAP _valorNome` antes de executar ERDDAP™ . Por exemplo, use ` ERDDAP _baseUrl` substitui o ` <baseUrl> Valor `.
Isso pode ser útil ao implantar ERDDAP™ com um recipiente como Docker, como você pode colocar configurações padrão em setup.xml
e então fornecer configurações especiais via variáveis de ambiente. Se você fornecer informações secretas para ERDDAP™ através deste método,
Certifique-se de verificar que a informação permanecerá secreta. ERDDAP™ somente lê variáveis de ambiente uma vez por inicialização,
no primeiro segundo da inicialização, então uma maneira de usar isso é: definir as variáveis de ambiente, iniciar ERDDAP ,
esperar até ERDDAP™ é iniciado, então desativa as variáveis de ambiente.

###  datasets.xml  {#datasetsxml} 

* Leia os comentários em [ **Trabalhar com datasets.xml Ficheiro** ](/docs/server-admin/datasets) . Mais tarde, depois de ERDDAP™ em execução
pela primeira vez (geralmente com apenas os conjuntos de dados padrão) , você irá modificar o XML em `tomcat/content/erddap/ datasets.xml `
para especificar todos os conjuntos de dados que deseja ERDDAP™ para servir. Aqui é onde você vai passar a maior parte do seu tempo
durante a configuração ERDDAP™ e mais tarde, mantendo ERDDAP™ .

Você pode ver um exemplo [ datasets.xml no GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Improvável) Agora ou... (ligeiramente mais provável) no futuro, se você quiser modificar o arquivo CSS do erddap, copie
`tomcat/content/erddap/images/erddapStart2.css` para `tomcat/content/erddap/images/erddap2.css` e, em seguida, fazer alterações a ele.
Alterações ao 'erddap2.css' só entram em vigor quando ERDDAP™ é reiniciado e muitas vezes também exigem que o usuário limpe os arquivos cache do navegador.
     
 ERDDAP™ não funcionará corretamente se o setup.xml ou datasets.xml O ficheiro não é um ficheiro XML bem formado. Então, depois de editar estes arquivos,
é uma boa ideia verificar que o resultado é XML bem formado colando o texto XML em um verificador XML como [xmlvalidação](https://www.xmlvalidation.com/) .
     
### Instale o erddap. arquivo de guerra{#install-the-erddapwar-file} 

4. No Linux, Mac e Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ em 'tomcat/webapps':

__Versão 2.28.0, 620.824.288 bytes, MD5=f948b2ba603f65a83ac67af43da9e4c2, datado de 2025-08-29__

O arquivo .war é grande porque contém dados de alta resolução de costa, fronteira e elevação necessários para criar mapas.

Algumas versões anteriores também estão disponíveis.

   *  [2. 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, datado de 2022-02-16) 
   *  [2. 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, datado de 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568.644.411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, datado de 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567.742.765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datado de 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572.124.953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datado de 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568.748.187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datado de 2024-06-07) 
   *  [2. 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datado de 2024-11-07) 
   *  [2. 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, datado de 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620.554.403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, datado de 2025-06-11) 

### Configurar o 'proxy' (Implementação específica)  {#proxy} 

 ERDDAP™ é tipicamente implantado atrás de um servidor web proxy reverso para permitir que ele seja servido em portas HTTP padrão (80 e 443) .
A terminação do SSL/TLS é frequentemente hanlded na camada proxy do servidor web também. As especificidades dependem dos requisitos de cada implantação.

#### Apache{#apache} 

1. Certifique-se de que `mod_proxy' e `mod_proxy_ http ` estão carregados:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modificar o ` existente <VirtualHost> ` tag (se existe um) , ou adicionar um no final do arquivo:
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
segmento de caminho _before_ `/erddap`. Este quadro seria adequado para ERDDAP™ servido em
«/subpath/erddap»:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Reinicie o Apache: `/usr/sbin/apachectl -k gracioso ` (mas às vezes está em um diretório diferente) .
         
#### NGINX{#nginx} 

No arquivo de configuração nginx, defina estes cabeçalhos:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Se ERDDAP™ é servido em um caminho diferente de `/erddap`, também definir o cabeçalho `X-Forwarded-Prefix` para o
segmento de caminho _before_ `/erddap`. Este quadro seria adequado para ERDDAP™ servido em
«/subpath/erddap»:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Para obter NGINX e ERDDAP™ trabalhar correctamente com https , você precisa colocar o seguinte trecho dentro do servidor Tomcat.xml ` <Host> ` bloco:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Iniciar Tomcat{#start-tomcat} 

*  (Não recomendo usar o Tomcat Web Application Manager. Se você não desligar completamente e iniciar o Tomcat, mais cedo ou mais tarde você terá problemas de memória PermGen.) 
*  (No Linux ou Mac OS, se você criou um usuário especial para executar Tomcat, por exemplo, tomcat, lembre-se de fazer as seguintes etapas como esse usuário.) 
* Se o Tomcat já estiver a correr, desliga o Tomcat com (em Linux ou Mac OS) «Tomcat/bin/shutdown.sh»
ou (em Windows) `tomcat\bin\\ shutdown.bat `

No Linux, use `ps -ef | grep tomcat 'antes e depois `shutdown.sh' para ter certeza de que o processo tomcat parou.
O processo deve ser listado antes do desligamento e, eventualmente, não listado após o desligamento.
Pode levar um minuto ou dois para ERDDAP™ para desligar completamente. Seja paciente. Ou se parecer que não vai parar sozinho, use:
`kill - 9 <processID> `
* Iniciar Tomcat com (em Linux ou Mac OS) «tomcat/bin/startup.sh» ou (em Windows) `tomcat\bin\\ startup.bat `

## É ERDDAP™ Correr?{#is-erddap-running} 

Usar um navegador para tentar visualizarhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ inicia sem nenhum conjunto de dados carregado. Os conjuntos de dados são carregados em um thread de fundo e assim se tornam disponíveis um-por-um.

### Resolução de Problemas{#troubleshooting} 

* Quando um pedido de um usuário entra, ele vai para o Apache (em computadores Linux e Mac OS) Depois Tomcat, então ERDDAP™ .
* Você pode ver o que vem para Apache (e erros relacionados) nos arquivos de log Apache.
*    [Você](/docs/server-admin/additional-information#tomcat-logs) pode ver o que vem para Tomcat (e erros relacionados) 
nos arquivos de log do Tomcat (`tomcat/logs/catalina.out` e outros arquivos nesse diretório) .
*    [Você](/docs/server-admin/additional-information#log) pode ver o que vem a ERDDAP , mensagens de diagnóstico de ERDDAP ,
e mensagens de erro de ERDDAP , na ERDDAP™ ` <bigParentDirectory> /logs/log.txt` arquivo.
* Tomcat não começa. ERDDAP™ até Tomcat receber um pedido de ERDDAP™ . Então você pode ver nos arquivos de registro Tomcat se
iniciado ERDDAP™ ou se houver uma mensagem de erro relacionada com essa tentativa.
* Quando ERDDAP™ inicia, renomeia o antigo ERDDAP™ arquivo log.txt (`logArchived Em <CurrentTime> .txt») e cria um novo arquivo log.txt.
Então, se o arquivo `log.txt` é antigo, é um sinal de que ERDDAP™ não foi reiniciado recentemente. ERDDAP™ escreve informações de log em um buffer
e só escreve o buffer no arquivo de log periodicamente, mas você pode forçar ERDDAP™ para gravar o buffer no arquivo de log visitando
` /erddap/status.html `.

### Problemas: Versão antiga de Java  {#trouble-old-version-of-java} 

Se você estiver usando uma versão de Java Isso é muito velho para ERDDAP , ERDDAP™ não será executado e você verá uma mensagem de erro no arquivo de registro do Tomcat como

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

A solução é atualizar para a versão mais recente do Java E certifica-te que o Tomcat está a usá-lo.

### Problemas: Iniciação lenta primeira vez{#trouble-slow-startup-first-time} 

Tomcat tem que fazer muito trabalho na primeira vez que um aplicativo como ERDDAP™ é iniciado; notavelmente, ele tem que desfazer o arquivo `erddap.war`
 (que é como uma .zip arquivo) . Em alguns servidores, a primeira tentativa de ver ERDDAP™ baias (30 segundos?) Até que este trabalho termine.
Em outros servidores, a primeira tentativa falhará imediatamente. Mas se você esperar 30 segundos e tentar novamente, ele vai ter sucesso se ERDDAP™ foi instalado corretamente.

Não há solução para isto. É assim que o Tomcat funciona. Mas só ocorre a primeira vez depois de instalar uma nova versão de ERDDAP™ .

## Desligar e reiniciar{#shut-down-and-restart} 

No futuro, para fechar (e reiniciar)   ERDDAP™ , ver [Como fechar e reiniciar Tomcat e ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Problemas?{#trouble} 

Problemas na instalação do Tomcat ou ERDDAP™ ? Veja o nosso [seção sobre obter suporte adicional](/docs/intro#support) .

## E-mail Notificação de novas versões de ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Se você quiser receber um email sempre que uma nova versão de ERDDAP™ está disponível ou outro importante ERDDAP™ anúncios,
você pode se juntar ao ERDDAP™ lista de anúncios [Aqui](https://groups.google.com/g/erddap-announce) . Esta lista é média de aproximadamente um e-mail a cada três meses.

## Personalizar{#customize} 

*  [Personalizar o seu ERDDAP™ para destacar sua organização (não NOAA   ERD ) .](#customize) 
* Mudar o banner que aparece no topo de tudo ERDDAP™ .html páginas editando o ` <startBodyHtml5> ` tag no seu ` datasets.xml Arquivo `.
(Se não houver, copie o padrão de ERDDAP™ « é «Tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/mensages.xml» arquivo
em ` datasets.xml ` e editá- lo.) Por exemplo, você poderia:
  * Usar uma imagem diferente (ou seja, o logotipo da sua organização) .
  * Mudar a cor de fundo.
  * Mudança " ERDDAP™ "A sua organização ERDDAP™ "
  * Alterar "Acesso mais fácil aos dados científicos" para "Acesso mais fácil aos dados _YourOrganização_".
  * Mude os links "Browd to you by" para ser links para sua organização e fontes de financiamento.
* Alterar a informação do lado esquerdo da página inicial, editando o ` <theShortDescriptionHtml> ` tag no seu ` datasets.xml Arquivo `.
(Se não houver, copie o padrão de ERDDAP™ « é «Tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/mensages.xml» arquivo
em ` datasets.xml ` e editá- lo.) Por exemplo, você poderia:
  * Descreva o que sua organização e/ou grupo fazem.
  * Descreva que tipo de dados ERDDAP™ Tem.
  * Para alterar o ícone que aparece nas páginas do navegador, coloque o favicon da sua organização. ico em «tomcat/content/erddap/images/`.
Verhttps://en.wikipedia.org/wiki/Favicon.
