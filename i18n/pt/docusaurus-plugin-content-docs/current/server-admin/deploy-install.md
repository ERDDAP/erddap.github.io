---
sidebar_position: 1
---

# Instalar
Como fazer a configuração inicial deERDDAP™em seu servidor


ERDDAP™pode ser executado em qualquer servidor que suporteJavae Tomcat (e outros servidores de aplicativos como a Jetty, mas não os apoiamos) .ERDDAP™foi testado no Linux (incluindo na AWS da Amazon) , Mac e computadores Windows.

*    **Amazonas** - ... Se você está instalandoERDDAP™em uma instância do Amazon Web Services EC2, veja isso[Amazon Web Services Visão geral](/docs/server-admin/additional-information#amazon)primeiro.
*    **Docker.** - ... Axiom agora oferece[ERDDAP™em um recipiente Docker](https://hub.docker.com/u/axiom/)e IOOS agora oferece um[Guia de início rápido paraERDDAP™em um recipiente de Docker](https://ioos.github.io/erddap-gold-standard/index.html).
É o padrãoERDDAP™instalação, mas Axiom colocou-o em um recipiente docker.
Se você já usar Docker, você provavelmente vai preferir a versão Docker.
Se você ainda não usa Docker, geralmente não recomendamos isso.
Se você escolheu instalarERDDAP™via Docker, não oferecemos suporte para o processo de instalação.
Ainda não trabalhamos com o Docker. Se você trabalha com isso, envie-nos seus comentários.
*    **Linux e Macs** - ...ERDDAP™funciona muito bem em computadores Linux e Mac. Veja as instruções abaixo.
*    **Windows** - ... O Windows está bem para testarERDDAP™e para uso pessoal (ver as instruções abaixo) , mas não recomendamos usá-lo para públicoERDDAPS. CorrerERDDAP™no Windows pode ter problemas: notavelmente,ERDDAP™pode ser incapaz de excluir e / ou renomear arquivos rapidamente. Isto é provavelmente devido ao software antivírus (por exemplo, da McAfee e Norton) que está verificando os arquivos para vírus. Se você correr para este problema (que pode ser visto por mensagens de erro no[- Não.](/docs/server-admin/additional-information#log)arquivo como "Unable to delete ...") , alterar as configurações do software antivírus pode aliviar parcialmente o problema. Ou considere usar um servidor Linux ou Mac em vez disso.

 **O padrãoERDDAP™instruções de instalação para computadores Linux, Macs e Windows são:** 

0. Certifique-se de que todas as dependências estão instaladas. Em máquinas não Windows (Linux e Mac) , você precisa de csh.
## Java {#java} 
1.  [ParaERDDAP™v2.19+, configurarJava21.](#java)
Por razões de segurança, é quase sempre melhor usar a versão mais recente doJava21.
Por favor, baixe e instale a última versão do
    [OpenJDK do adotivo (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21). Para verificar a instalação, digite "/_javaJreBinDirectory_/java -versão", por exemplo
/usr/local/jdk-21.0.3+9/jre/bin/java -versão
    
    ERDDAP™trabalhos comJavade outras fontes, mas recomendamos o Adotivo porque é o principal, apoiado pela comunidade, livre (como em cerveja e fala) versão deJava21 que oferece suporte de longo prazo (atualizações gratuitas por muitos anos após a versão inicial) . Por razões de segurança, atualize o seuERDDAPA versão deJavaperiodicamente como novas versões deJava21 tornam-se disponíveis a partir do Adotivo.
    
    ERDDAP™foi testado e usado extensivamente com 21, não outras versões. Por várias razões, não testamos nem apoiamos outras versões deJava.
     
## Tomcat{#tomcat} 
2.  [Configurar](#tomcat) [Tomcat](https://tomcat.apache.org).
Tomcat é o mais amplamente utilizadoJavaServidor de Aplicação, que éJavasoftware que está entre os serviços de rede do sistema operacional eJavasoftware de servidor comoERDDAP™. É Software de código livre e aberto (FOSS) .
    
Você pode usar outroJavaServidor de Aplicação (por exemplo, Jetty) Mas só testamos e apoiamos o Tomcat.
     
    
    * Faça o download do Tomcat e descompacte-o em seu servidor ou PC.
Por razões de segurança, é quase sempre melhor usar a versão mais recente do Tomcat 10 (versão 9 e abaixo não são aceitáveis) que é projetado para trabalhar comJava21 ou mais. Abaixo, o diretório Tomcat será referido como _tomcat_.
        
Atenção&#33; Se você já tem um Tomcat executando alguma outra aplicação web (especialmente TRÊS) , recomendamos que você instaleERDDAP™em[um segundo Tomcat](/docs/server-admin/additional-information#second-tomcat)PorqueERDDAP™precisa de diferentes configurações Tomcat e não deve ter que lidar com outras aplicações para memória.
        
        * No Linux,[baixar o "Core" "tar.gz" Distribuição Tomcat](https://tomcat.apache.org/download-10.cgi)e desempachem-no. Recomendamos desempachá-lo em /usr/local.
        * Em um Mac, Tomcat provavelmente já está instalado em /Library/Tomcat, mas deve atualizá-lo para a versão mais recente do Tomcat 10.
Se você o baixar,[baixar o "Core" "tar.gz" Distribuição Tomcat](https://tomcat.apache.org/download-10.cgi)e desempachá-lo em /Library/Tomcat.
        * No Windows, você pode[baixar a distribuição "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi)  (que não se mexe com o registro do Windows e que você controla de uma linha de comando DOS) e desempachá-lo em um diretório apropriado. (Para o desenvolvimento, usamos a distribuição "Core" "zip". Fazemos um diretório /programs e desempachá-lo lá.) Ou você pode baixar a distribuição "Core" "64-bit Windows zip", que inclui mais recursos. Se a distribuição for um instalador do Windows, provavelmente colocará Tomcat em, por exemplo, /Program Files/apache-tomcat-10.0.23 .
             
### servidor.xml{#serverxml} 
*   [servidor.xml](#serverxml)- No arquivo _tomcat_/conf/server.xml, há duas mudanças que você deve fazer para cada um dos dois&lt;Connector &gt; tags- um para
```
        <Connector port="8080" 
```
e um para
```
        <Conector port="8443"
```
    1.   (Recomendado) Aumentar o valor do parâmetro de conexãoTimeout, talvez para 300000 (milissegundos)   (que é 5 minutos) .
    2.   (Recomendado) Adicione um novo parâmetro: relaxedQueryChars="\\[\\]|" Isso é opcional e ligeiramente menos seguro, mas remove a necessidade de usuários codificar por cento esses caracteres quando ocorrem nos parâmetros da URL de solicitação de um usuário.
             
### content.xml{#contentxml} 
* context.xml -- Recursos Cache - Em _tomcat_/conf/context.xml, mesmo antes do&lt;/Context &gt; tag, altere a tag Recursos (ou adicioná-lo se já não estiver lá) para definir o cache Parâmetro MaxSize para 80000:
    &lt;Recursos cachingAllowed="true" cacheMaxSize="80000" /&gt;
Isso evita inúmeros avisos em catalina. que tudo começar com
"WARNING\\[principal\\]org.apache.catalina.webresources.Cache.getRecurso Incapaz de adicionar o recurso em\\[/WEB-INF/classes/...]"
         
### Apache Timeout{#apache-timeout} 
* Em computadores Linux, altere as configurações de tempo limite do Apache para que os pedidos de usuários demorados não sejam demorados (com o que muitas vezes aparece como um erro "Proxy" ou "Bad Gateway") . Como usuário root:
    1. Modificar o Apachehttparquivo d.conf (geralmente em /etc/httpd/conf/) :
Alterar o existente&lt;Timeout &gt; configuração (ou adicionar um no final do arquivo) para 3600 (segundos.) , em vez do padrão 60 ou 120 segundos.
Alterar o existente&lt;ProxyTimeout &gt; configuração (ou adicionar um no final do arquivo) para 3600 (segundos.) , em vez do padrão 60 ou 120 segundos.
    2. Reinicie Apache: /usr/sbin/apachectl -k gracioso (mas às vezes é em um diretório diferente) .
             
    * Recomendação de segurança: Ver[estas instruções](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)para aumentar a segurança de sua instalação Tomcat, especialmente para servidores públicos.
         
    * Para o públicoERDDAP™instalações no Linux e Macs, é melhor configurar o Tomcat (o programa) como pertencente ao usuário "tomcat" (um usuário separado com permissões limitadas e que[não tem senha](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Assim, apenas o super usuário pode mudar para atuar como tomcat do usuário. Isso torna impossível para hackers fazer login em seu servidor como tomcat usuário. E, em qualquer caso, você deve fazê-lo para que o usuário tomcat tenha permissões muito limitadas no sistema de arquivos do servidor (leia+write+execute privilégios para a árvore de diretório apache-tomcat e&lt;bigParentDirectory &gt; e privilégios somente leitura para diretórios com dados queERDDAP™precisa de acesso a).
        * Você pode criar a conta de usuário tomcat (que não tem senha) usando o comando
sudo useradd tomcat -s /bin/bash -p '\\* '
        * Você pode mudar para trabalhar como tomcat do usuário usando o comando
sudo su - tomcat
             (Ele irá pedir-lhe a senha do superusuário para permissão para fazer isso.) 
        * Você pode parar de trabalhar como tomcat do usuário usando o comando
saída
        * Faça a maior parte do resto do Tomcat eERDDAP™instruções de configuração como usuário "tomcat". Mais tarde, execute os scripts start.sh e shutdown.sh como usuário "tomcat" para que Tomcat tenha permissão para escrever para seus arquivos de log.
        * Depois de descompactar Tomcat, do pai do diretório apache-tomcat:
            
            * Alterar a propriedade da árvore de diretório apache-tomcat para o usuário tomcat.
chown -R tomcat apache-tomcat-_10.0.23_
                 (mas substitua o nome real do seu diretório tomcat) .
            * Alterar o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores da Tomcat/ERDDAP, por exemplo,
O que fazer? UserName_ apache-tomcat-_10.0.23_
            * Alterar permissões para que o tomcat e o grupo tenham lido, escrever, executar privilégios, por exemplo,.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Remover as permissões do usuário "outros" para ler, escrever ou executar:
apache-tomcat-_10.0.23_
Isso é importante, porque impede que outros usuários leiam informações possivelmente sensíveis emERDDAP™arquivos de configuração.
            
              
### Memória{#memory} 
* Definir Variáveis de Ambiente da Tomcat
    
No Linux e Macs:
Criar um arquivo _tomcat_/bin/setenv.sh (ou em Red Hat Enterprise Linux\\[RH\\], edit ~tomcat/conf/tomcat10.conf) para definir as variáveis de ambiente da Tomcat. Este arquivo será usado por _tomcat_/bin/startup.sh e shutdown.sh. O arquivo deve conter algo como:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (mas substitua os nomes de diretório do seu computador) .
 (Se você definir anteriormente JRE\\_HOME, você pode remover isso.)   
Em Macs, você provavelmente não precisa definir JAVA\\_HOME.

No Windows:
Crie um arquivo _tomcat_\bin\\\setenv.bat para definir as variáveis de ambiente de Tomcat. Este arquivo será usado por _tomcat_\bin\\\\startup.bat eshutdown.bat. O arquivo deve conter algo como:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (mas substitua os nomes de diretório do seu computador) .
Se isso for apenas para testes locais, remova "-servidor".
 (Se você definir anteriormente JRE\\_HOME, você pode remover isso.) 

As configurações de memória -Xmx e -Xms são importantes porqueERDDAP™funciona melhor com mais memória. Sempre definir -Xms para o mesmo valor que -Xmx.

* Para sistemas operacionais de 32 bits e 32 bitsJava:
64 bitsJavaé muito melhor do que 32 bitsJava, mas 32 bitJavavai funcionar enquanto o servidor não estiver realmente ocupado. Quanto mais memória física no servidor melhor: 4+ GB é realmente bom, 2 GB é ok, menos não é recomendado. Com 32 bitsJava, mesmo com abundante memória física, Tomcat eJavanão será executado se você tentar definir -Xmx muito acima 1500M (1200M em alguns computadores) . Se o seu servidor tiver menos de 2GB de memória, reduza o valor -Xmx (em 'M'egaBytes) para 1/2 da memória física do computador.
* Para sistemas operacionais de 64 bits e 64 bitsJava:
64 bitsJavasó funcionará em um sistema operacional de 64 bits.
    
    * ComJava8, você precisa adicionar \\-d64 ao parâmetro Tomcat CATALINA\\_OPTS em setenv.bat
    * ComJava21, você escolhe 64 bitsJavaQuando você baixar uma versão doJavamarcado "64 bits".
    
Com 64 bitsJava, Tomcat eJavapode usar configurações muito altas -Xmx e -Xms. Quanto mais memória física no servidor melhor. Como uma sugestão simplista: recomendamos que você definir -Xmx e -Xms para (em 'M'egaBytes) para 1/2 (ou menos) da memória física do computador. Podes ver se o Tomcat,JavaeERDDAP™estão realmente em execução no modo de 64 bits, procurando por " bit," emERDDAP's Daily Report email ou no _bigParentDirectory_/logs/[- Não.](/docs/server-admin/additional-information#log)arquivo (_bigParentDirectory_ é especificado em[setup.xml](#setupxml)) .
#### Coleção de lixo{#garbage-collection} 
* EmERDDAP™'[- Não.](/docs/server-admin/additional-information#log)arquivo, você verá muitos "GC (Incumprimento de Estado) "mensagens.
Isto geralmente não é um problema. É uma mensagem frequente de um funcionamento normalJavadizendo que acabou de terminar uma pequena coleção de lixo porque ficou sem espaço no Éden (a seção daJavaheap para objetos muito jovens) . Normalmente a mensagem mostra-lhe _memoryUseBefore_\\-&gt;_memoryUseAfter_. Se esses dois números estão próximos, significa que a coleção de lixo não foi produtiva. A mensagem é apenas um sinal de problemas se é muito frequente (a cada poucos segundos) , não produtivo, e os números são grandes e não crescentes, que juntos indicam queJavaprecisa de mais memória, está lutando para libertar a memória, e é incapaz de liberar a memória. Isso pode acontecer durante um tempo estressante, então vá embora. Mas se persistir, isso é um sinal de problemas.
* Se você vê java.lang.OutOfMemoryError está emERDDAP™'[- Não.](/docs/server-admin/additional-information#log)ficheiro, ver[Erro](/docs/server-admin/additional-information#outofmemoryerror)para dicas sobre como diagnosticar e resolver os problemas.
         
### Permissões{#permissions} 
*   [No Linux e Macs, altere as permissões](#permissions)de todos\\*.sharquivos em _tomcat_/bin/ para ser executável pelo proprietário, por exemplo, com
```
    chmod +x \\*.sh  
```
### Fontes{#fonts} 
*   [Fontes para imagens:](#fonts)Preferimos fortemente o livre[Fontes de DejaVu](https://dejavu-fonts.github.io/)para o outroJavafontes. Usar essas fontes é fortemente recomendado, mas não é necessário.
    
Se você optar por não usar as fontes DejaVu, você precisa alterar a configuração fontFamily no setup.xml para&lt;fonteFamily &gt; SansSerif&lt;/fontFamily&gt;, que está disponível com todosJavadistribuições. Se você definir fontFamily para o nome de uma fonte que não está disponível,ERDDAP™Não carregará e imprimirá uma lista de fontes disponíveis no arquivo log.txt. Você deve usar uma dessas fontes.
    
Se você optar por usar as fontes DejaVu, verifique se a configuração fontFamily no setup.xml é&lt;fonte Família &gt; DejaVu Sans&lt;/fontFamily &gt;.
    
Para instalar as fontes DejaVu, faça o download[DejaVuFontes.zip](/DejaVuFonts.zip)  (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FFEF42) e descompactar os arquivos de fonte para um diretório temporário.
    
    * No Linux:
        * Para Linux AdoptiumJavadistribuição, ver[estas instruções](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Com outrosJavadistribuições: Como o usuário Tomcat, copie os arquivos de fonte em _JAVA\\_HOME_/lib/fonts assimJavapode encontrar as fontes. Lembre-se: se / quando você mais tarde atualizar para uma versão mais recente deJava, você precisa reinstalar essas fontes.
    * Em Macs: para cada arquivo de fonte, clique duas vezes nele e, em seguida, clique em Instalar fonte.
    * No Windows 7 e 10: no Windows Explorer, selecione todos os arquivos de fonte. Clique com o botão direito. Clique em Instalar.
             
### Teste Tomcat{#test-tomcat} 
* Teste sua instalação Tomcat.
    * Linux:
        * Como usuário "tomcat", execute _tomcat_/bin/startup.sh
        * Ver sua URL + ":8080/" no seu navegador (por exemplo,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Você deve ver a página "Parabéns" Tomcat.
Se houver problemas, consulte o arquivo de log do Tomcat _tomcat_/logs/catalina.out.
    * Mac (executar tomcat como usuário administrador do sistema) :
        * Executar _tomcat_/bin/startup.sh
        * Ver sua URL + ":8080/" no seu navegador (por exemplo,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Note que, por padrão, seu Tomcat só é acessível por você. Não é publicamente acessível.
        * Você deve ver a página "Parabéns" Tomcat.
Se houver problemas, consulte o arquivo de log do Tomcat _tomcat_/logs/catalina.out.
    * Localhost do Windows:
        
        * Clique com o botão direito no ícone Tomcat na bandeja do sistema e escolha "Serviço inicial".
        * Visualização[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), ou talvez[ http://localhost:8080/ ](http://localhost:8080/), no seu navegador. Note que, por padrão, seu Tomcat só é acessível por você. Não é publicamente acessível.
        * Você deve ver a página "Parabéns" Tomcat.
Se houver problemas, consulte o arquivo de log do Tomcat _tomcat_/logs/catalina.out.
            
### Problemas com a instalação do Tomcat?{#troubles-with-the-tomcat-installation} 
* No Linux e Mac, se você não consegue alcançar Tomcat ouERDDAP™  (ou talvez você simplesmente não pode alcançá-los de um computador fora do seu firewall) , você pode testar se Tomcat está ouvindo a porta 8080, digitando (como raiz) em uma linha de comando do servidor:
```  
    netstat -tuplen | grep 8080  
```
Isso deve retornar uma linha com algo como:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (onde '#' é um dígito) , indicando que um processo "java" (presumivelmente Tomcat) está ouvindo na porta "8080" para tráfego "tcp". Se nenhuma linha foi retornada, se a linha retornada é significativamente diferente, ou se duas ou mais linhas foram retornadas, então pode haver um problema com as configurações da porta.
* Veja o arquivo de log do Tomcat _tomcat_/logs/catalina.out. Problemas de Tomcat e algunsERDDAP™problemas de inicialização são quase sempre indicados lá. Isso é comum quando você está configurando primeiroERDDAP™.
* Ver[Tomcat](https://tomcat.apache.org/)site ou pesquisar a web para ajuda, mas por favor nos avise os problemas que você tinha e as soluções que você encontrou.
* Veja o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
             
### ERDDAP™Conteúdo{#erddap-content} 
3.  [Configurar o_tomcat_/content/erddaparquivos de configuração.](#erddap-content)  
No Linux, Mac e Windows, download[O que é isso?.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versão 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datada de 2024-10-14) e descompacte-o em _tomcat_, criando_tomcat_/content/erddap.

    \\[Algumas versões anteriores também estão disponíveis:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datado de 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, datado de 2022-02-16)   
    [2.2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, datado de 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, datado de 2022-12-08) 
    [2.2.3.](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, datado de 2023-02-27) 
e descompacte-o em _tomcat_, criando_tomcat_/content/erddap.\\]
    
#### Outros relatórios{#other-directory} 
Para Red Hat Enterprise Linux (RH) ou para outras situações em que você não está autorizado a modificar o diretório Tomcat ou onde você quer / precisa colocar oERDDAP™diretório de conteúdo em algum outro local por alguma outra razão (por exemplo, se você usar Jetty em vez de Tomcat) , unzip erddapContent.zipno diretório desejado (para o qual apenas user=tomcat tem acesso) e definir oerddapContentDirectorypropriedade do sistema (por exemplo,erddapContentDirectory=~tomcat/content/erddap) Então...ERDDAP™pode encontrar este novo diretório de conteúdo.
    
### setup.xml{#setupxml} 
*   [Leia os comentários em_tomcat_/content/erddap/ **setup.xml** ](#setupxml)e fazer as alterações solicitadas. setup.xml é o arquivo com todas as configurações que especificam como seuERDDAP™comporta-se.
Para a configuração inicial, você deve pelo menos alterar essas configurações:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Quando você cria o grandeParentDirectory, do diretório pai do bigParentDirectory:
    
    * Faça user=tomcat o proprietário do bigParentDirectory, por exemplo,
```
        chown -R tomcat _bigParentDirectory_
```
    * Alterar o "grupo" para ser tomcat, seu nome de usuário ou o nome de um pequeno grupo que inclui tomcat e todos os administradores da Tomcat/ERDDAP, por exemplo,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Alterar permissões para que o tomcat e o grupo tenham lido, escrever, executar privilégios, por exemplo,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Remova as permissões do usuário "outros" para ler, escrever ou executar. Isto é importante para evitar a leitura de informações possivelmente sensíveis emERDDAP™logar arquivos e arquivos com informações sobre conjuntos de dados privados.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Variáveis de Ambiente{#environment-variables} 
Começar comERDDAP™V2.13,ERDDAP™Os administradores podem substituir qualquer valor no setup.xml especificando uma variável de ambiente nomeadaERDDAP\\__valueName_ antes de executarERDDAP™. Por exemplo, useERDDAP\\_baseUrl substitui o&lt;baseUrl&gt; valor. Isso pode ser útil ao implantarERDDAP™com um recipiente como Docker, como você pode colocar configurações padrão no setup.xml e, em seguida, fornecer configurações especiais através de variáveis de ambiente. Se você fornecer informações secretas paraERDDAP™através deste método, certifique-se de verificar se as informações permanecerão secretas.ERDDAP™somente lê variáveis de ambiente uma vez por startup, no primeiro segundo da inicialização, então uma maneira de usar isso é: definir as variáveis de ambiente, iniciarERDDAP, espere atéERDDAP™é iniciado, então não definir as variáveis de ambiente.
    
### datasets.xml {#datasetsxml} 
* Leia os comentários em[ **Trabalhar com odatasets.xmlArquivo** ](/docs/server-admin/datasets). Mais tarde, depois de você começarERDDAP™correndo pela primeira vez (geralmente com apenas os conjuntos de dados padrão) , você modificará o XML em_tomcat_/content/erddap/ **datasets.xml** para especificar todos os conjuntos de dados que você desejaERDDAP™servir. É aqui que você vai gastar a maior parte do seu tempo ao configurarERDDAP™e mais tarde, mantendo o seuERDDAP™.

Você pode ver um exemplo[datasets.xmlem GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Diferentemente) Agora ou (ligeiramente mais provável) no futuro, se você quiser modificar o arquivo CSS do erddap, faça uma cópia do_tomcat_/content/erddap/images/erddapStart2.css chamado erddap2.css e, em seguida, fazer alterações a ele. As alterações ao erddap2.css só entram em vigor quandoERDDAP™é reiniciado e muitas vezes também exigem que o usuário desmarque os arquivos em cache do navegador.
     
ERDDAP™não funcionará corretamente se o setup.xml oudatasets.xmlarquivo não é um arquivo XML bem formado. Então, depois de editar esses arquivos, é uma boa ideia verificar se o resultado é XML bem formado, colando o texto XML em um verificador XML como[xmlvalidação](https://www.xmlvalidation.com/).
     
### Instale o arquivo erddap.war{#install-the-erddapwar-file} 
4. No Linux, Mac e Windows, download[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)em _tomcat_/webapps .
     (versão 2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, datado 06-11-2025) 
    
O arquivo .war é grande porque contém dados de costa de alta resolução, limite e elevação necessários para criar mapas.
    
    \\[Algumas versões anteriores também estão disponíveis.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, datado de 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CCFB8B, datado de 2022-02-23)   
    [2.2.1.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF805893146E932E498FDDBD519B6, datado de 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, datado de 2022-12-08) 
    [2.2.3.](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, datado de 2023-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, datado de 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, datado de 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 bytes, MD5=99a725108b37708e5420986c1616a119, datado de 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Use Proxy Passe para que os usuários não precisem colocar o número da porta, por exemplo, :8080, na URL.
Em computadores Linux, se Tomcat estiver em execução no Apache, modifique o Apachehttparquivo d.conf (geralmente em /etc/httpd/conf/) para permitir o tráfego HTTPERDDAP™sem exigir o número da porta, por exemplo, :8080, na URL. Como usuário root:
    1. Modifique o existente&lt;VirtualHost &gt; tag (se houver um) , ou adicione um no final do arquivo:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Então reinicie Apache: /usr/sbin/apachectl -k gracioso (mas às vezes é em um diretório diferente) .
         
### NGINX{#nginx} 
 (UNCOMULHER) Se você estiver usando[NGINX](https://www.nginx.com/)  (um servidor web e balanceador de carga) :
para obter NGINX eERDDAP™trabalhar corretamente comhttps, você precisa colocar o seguinte snippet dentro do Tomcat server.xml&lt;Host &gt; bloco:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
E no arquivo de configuração nginx, você precisa definir esses cabeçalhos:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Graças ao Kyle Wilcox.)   
     
### Começar Tomcat{#start-tomcat} 
*    (Não recomendo usar o Tomcat Web Application Manager. Se você não desligar totalmente e iniciar Tomcat, mais cedo ou mais tarde você terá problemas de memória PermGen.)   
     
*    (No Linux ou Mac OS, se você criou um usuário especial para executar Tomcat, por exemplo, tomcat, lembre-se de fazer os seguintes passos como esse usuário.)   
     
* Se Tomcat já estiver em execução, desligue Tomcat com (em Linux ou Mac OS) _tomcat_/bin/shutdown.sh
ou (em Windows) _tomcat_\bin\\\\shutdown.bat
    
No Linux, use ps -ef|grep tomcat antes e depois shutdown.sh para ter certeza de que o processo tomcat parou. O processo deve ser listado antes do desligamento e eventualmente não listado após o desligamento. Pode levar um minuto ou dois paraERDDAP™para desligar completamente. Sê paciente. Ou se parecer que não vai parar por conta própria, use:
matar -9 _processID_
    
* Comece Tomcat com (em Linux ou Mac OS) _tomcat_/bin/startup.sh
ou (em Windows) _tomcat_\bin\\\startup.bat

## ÉERDDAP™Correr?{#is-erddap-running} 
Use um navegador para tentar visualizar http://_www.YourServer.org_/erddap/status.html   
ERDDAP™inicia-se sem nenhum conjunto de dados carregado. Os conjuntos de dados são carregados em um segmento de fundo e assim tornar-se disponível one-by-one.

### Resolução de problemas{#troubleshooting} 
* Quando um pedido de um usuário entra, ele vai para o Apache (em computadores Linux e Mac OS) Então, Tomcat.ERDDAP™.
* Você pode ver o que vem para Apache (e erros relacionados) nos arquivos de log Apache.
*   [Tu.](/docs/server-admin/additional-information#tomcat-logs)pode ver o que vem a Tomcat (e erros relacionados) nos arquivos de log Tomcat (_tomcat_/logs/catalina.out e outros arquivos nesse diretório) .
*   [Tu.](/docs/server-admin/additional-information#log)pode ver o que vem aERDDAP, mensagens de diagnóstico deERDDAP, e mensagens de erroERDDAP, noERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt file.
* O Tomcat não começa.ERDDAP™até Tomcat receber um pedidoERDDAP™. Então você pode ver nos arquivos de log Tomcat se ele começouERDDAP™ou se houver uma mensagem de erro relacionada a essa tentativa.
* QuandoERDDAP™começa, ele renomeia o velhoERDDAP™arquivo log.txt (logArchivedAt_CurrentTime_.txt) e cria um novo arquivo log.txt. Então, se o registo. arquivo txt é velho, é um sinal de queERDDAP™recentemente não reiniciou.ERDDAP™escreve informações de log para um buffer e só escreve o buffer para o arquivo de log periodicamente, mas você pode forçarERDDAP™para escrever o buffer para o arquivo de log visitando .../erddap/status.html.

### Problemas: Versão antiga deJava {#trouble-old-version-of-java} 
Se você estiver usando uma versão deJavaé muito velho paraERDDAP,ERDDAP™não será executado e você verá uma mensagem de erro no arquivo de log do Tomcat como
Exceção na linha "principal" java.lang.UnsupportedClassVersionError:
_some/class/name_: Versão principal.minor não suportada _someNumber_
A solução é atualizar para a versão mais recente deJavae certifique-se de que Tomcat está usando-o.

### Problemas: Inicialização lenta Primeira vez{#trouble-slow-startup-first-time} 
Tomcat tem que fazer um monte de trabalho da primeira vez um aplicativo comoERDDAP™é iniciado; notavelmente, tem de descompactar o erddap. arquivo de guerra (que é como um.ziparquivo) . Em alguns servidores, a primeira tentativa de visualizarERDDAP™barracas (30 segundos?) até que este trabalho esteja terminado. Em outros servidores, a primeira tentativa falhará imediatamente. Mas se você esperar 30 segundos e tentar novamente, terá sucesso seERDDAP™foi instalado corretamente.
Não há solução para isto. É assim que Tomcat funciona. Mas só ocorre a primeira vez depois de instalar uma nova versão deERDDAP™.

## Desligue e reinicie{#shut-down-and-restart} 
No futuro, para fechar (e reiniciar)  ERDDAPVeja[Como Desligar e Reiniciar Tomcat eERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Problemas?{#trouble} 
Problemas para instalar Tomcat ouERDDAP? Veja o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
## Notificação por e-mail de novas versões deERDDAP {#email-notification-of-new-versions-of-erddap} 
Se você quiser receber um e-mail sempre que uma nova versão deERDDAP™está disponível ou outro importanteERDDAP™anúncios, você pode se juntar aoERDDAP™lista de anúncios[aqui.](https://groups.google.com/g/erddap-announce). Esta lista é média de aproximadamente um e-mail a cada três meses.
## Personalizar{#customize} 
[Personalize o seuERDDAP™para destacar sua organização (nãoNOAA ERD) .](#customize)
    * Alterar o banner que aparece no topo de tudoERDDAP™.html páginas editando o&lt;startBodyHtml5&gt; tag em seudatasets.xmlficheiro. (Se não houver um, copie o padrãoERDDAP'
        \\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheirodatasets.xmle editá-lo.) Por exemplo, você poderia:
        * Use uma imagem diferente (ou seja, o logotipo da sua organização) .
        * Mude a cor de fundo.
        * Mudança "ERDDAP" para "_YourOrganization_'sERDDAP"
        * Alterar "Acesso mais fácil aos dados científicos" para "Acesso mais fácil aos dados do _YourOrganization_".
        * Altere os links "Comprei para você" para ser links para sua organização e fontes de financiamento.
    * Altere as informações no lado esquerdo da página inicial editando a&lt;theShortDescriptionHtml&gt; tag in yourdatasets.xmlficheiro. (Se não houver um, copie o padrãoERDDAP'
        \\[Toca a brincar.\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml ficheirodatasets.xmle editá-lo.) Por exemplo, você poderia:
        * Descreva o que sua organização e/ou grupo faz.
        * Descrever que tipo de dados esteERDDAP™Sim.
    * Para alterar o ícone que aparece nas guias do navegador, coloque o favicon da sua organização. ico em ico_tomcat_/content/erddap/imagens/ . Ver[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
