---
sidebar_position: 2
---
# Atualização
Como fazer uma atualização de um existente ERDDAP™ em seu servidor

## Mudanças{#changes} 
1. Faça as alterações listadas em [Mudanças](/changes) na seção intitulada "Coisas ERDDAP™ Os administradores precisam saber e fazer" para todos os ERDDAP™ versões desde a versão que você estava usando.
     
##  Java  {#java} 
2. Se você está atualizando de ERDDAP™ versão 2.18 ou abaixo, você precisa mudar para Java 21 (ou mais recente) e o Tomcat 10 relacionado. Veja o regular ERDDAP™ instruções de instalação para [ Java ](/docs/server-admin/deploy-install#java) e [Tomcat](/docs/server-admin/deploy-install#tomcat) . Você também terá que copiar o seu _tomcat_/content/erddap diretório de sua antiga instalação Tomcat para sua nova instalação Tomcat.

## Baixar{#download} 
3. Baixar [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) em _tomcat_/webapps .
     (versão 2.28.1, 622,676,238 bytes, MD5=48b4226045f950c8a8d69ef9521b9bc9, datado de 09-05-2025) 
     
## mensagens.xml{#messagesxml} 
4. 
    * Comum: Se você está atualizando de ERDDAP™ versão 1.46 (ou superior) e você apenas usar as mensagens padrão, o novo padrão message.xml será instalado automaticamente (entre os arquivos .class via erddap. Guerra) .
         
    * Rare: Se você está atualizando de ERDDAP™ versão 1.44 (ou abaixo) ,
você DEVE excluir o arquivo old message.xml:
         _tomcat_/content/erddap /messages.xml .
As novas mensagens padrão.xml serão instaladas automaticamente (entre os arquivos .class via erddap. Guerra) .
         
    * Rare: Se você sempre fizer alterações no arquivo standard message.xml (no lugar) ,
você precisa fazer essas alterações no novo arquivo message.xml (que é
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml após o erddap.war é decomprimido por Tomcat.
         
    * Rare: Se você manter um arquivo custom message.xml em _tomcat_/content/erddap /,
você precisa descobrir (via diff) que mudanças foram feitas para o padrão message.xml (que estão no novo erddap. guerra como
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) e modificar seu arquivo custom message.xml de acordo.
         
## Instalar{#install} 
5. Instalar o novo ERDDAP™ em Tomcat:
* Não use o Tomcat Manager. Mais cedo ou mais tarde haverá problemas de memória PermGen. É melhor desligar e iniciar Tomcat.
\\* Substituir referências a _tomcat_ abaixo com o diretório Tomcat real em seu computador.
     
### Linux e Macs{#linux-and-macs} 
1. Tomcat de desligamento: De uma linha de comando, use: _tomcat_/bin/shutdown.sh
E use ps -ef | grep tomcat para ver se / quando o processo foi interrompido. (Pode demorar um minuto ou dois.) 
2. Remover o descomprimido ERDDAP™ instalação: Em _tomcat_/webapps, use
Rm -rf erddap
3. Apague o velho erddap. arquivo de guerra: In _tomcat_/webapps, use rm erddap. Guerra
4. Entendido. arquivo de guerra do diretório temporário para _tomcat_/webapps
5. Reinicie Tomcat e ERDDAP : use _tomcat_/bin/startup.sh
6. Visualização ERDDAP™ no seu navegador para verificar que o reinício conseguiu.
     (Muitas vezes, você tem que tentar algumas vezes e esperar um minuto antes de ver ERDDAP™ .)   
             
### Windows{#windows} 
1. Tomcat de desligamento: De uma linha de comando, use: _tomcat_\bin\\\ shutdown.bat 
2. Remover o descomprimido ERDDAP™ instalação: Em _tomcat_/webapps, use
/S/Q erddap
3. Apague o velho erddap. arquivo de guerra: Em _tomcat_\\\webapps, use del erddap. Guerra
4. Entendido. arquivo de guerra do diretório temporário para _tomcat_\\webapps
5. Reinicie Tomcat e ERDDAP : use _tomcat_\bin\\\startup.bat
6. Visualização ERDDAP™ no seu navegador para verificar que o reinício conseguiu.
     (Muitas vezes, você tem que tentar algumas vezes e esperar um minuto antes de ver ERDDAP™ .) 

Atualização de problemas ERDDAP ? Veja o nosso [seção sobre como obter suporte adicional](/docs/intro#support) .
