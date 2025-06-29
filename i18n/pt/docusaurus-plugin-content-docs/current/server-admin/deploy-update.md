---
sidebar_position: 2
---
# Atualização
Como fazer uma atualização de um existenteERDDAP™em seu servidor

## Mudanças{#changes} 
1. Faça as alterações listadas em[Mudanças](/changes)na seção intitulada "CoisasERDDAP™Os administradores precisam saber e fazer" para todos osERDDAP™versões desde a versão que você estava usando.
     
## Java {#java} 
2. Se você está atualizando deERDDAP™versão 2.18 ou abaixo, você precisa mudar paraJava21 (ou mais recente) e o Tomcat 10 relacionado. Veja o regularERDDAP™instruções de instalação para[Java](/docs/server-admin/deploy-install#java)e[Tomcat](/docs/server-admin/deploy-install#tomcat). Você também terá que copiar o seu_tomcat_/content/erddapdiretório de sua antiga instalação Tomcat para sua nova instalação Tomcat.

## Baixar{#download} 
3. Baixar[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)em _tomcat_/webapps .
     (versão 2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, datado 06-11-2025) 
     
## mensagens.xml{#messagesxml} 
4. 
    * Comum: Se você está atualizando deERDDAP™versão 1.46 (ou superior) e você apenas usar as mensagens padrão, o novo padrão message.xml será instalado automaticamente (entre os arquivos .class via erddap. Guerra) .
         
    * Rare: Se você está atualizando deERDDAP™versão 1.44 (ou abaixo) ,
você DEVE excluir o arquivo old message.xml:
        _tomcat_/content/erddap/messages.xml .
As novas mensagens padrão.xml serão instaladas automaticamente (entre os arquivos .class via erddap. Guerra) .
         
    * Rare: Se você sempre fizer alterações no arquivo standard message.xml (no lugar) ,
você precisa fazer essas alterações no novo arquivo message.xml (que é
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml após o erddap.war é decomprimido por Tomcat.
         
    * Rare: Se você manter um arquivo custom message.xml em_tomcat_/content/erddap/,
você precisa descobrir (via diff) que mudanças foram feitas para o padrão message.xml (que estão no novo erddap. guerra como
WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) e modificar seu arquivo custom message.xml de acordo.
         
## Instalar{#install} 
5. Instalar o novoERDDAP™em Tomcat:
* Não use o Tomcat Manager. Mais cedo ou mais tarde haverá problemas de memória PermGen. É melhor desligar e iniciar Tomcat.
\\* Substituir referências a _tomcat_ abaixo com o diretório Tomcat real em seu computador.
     
### Linux e Macs{#linux-and-macs} 
1. Tomcat de desligamento: De uma linha de comando, use: _tomcat_/bin/shutdown.sh
E use ps -ef|grep tomcat para ver se / quando o processo foi interrompido. (Pode demorar um minuto ou dois.) 
2. Remover o descomprimidoERDDAP™instalação: Em _tomcat_/webapps, use
Rm -rf erddap
3. Apague o velho erddap. arquivo de guerra: In _tomcat_/webapps, use rm erddap. Guerra
4. Entendido. arquivo de guerra do diretório temporário para _tomcat_/webapps
5. Reinicie Tomcat eERDDAP: use _tomcat_/bin/startup.sh
6. VisualizaçãoERDDAP™no seu navegador para verificar que o reinício conseguiu.
     (Muitas vezes, você tem que tentar algumas vezes e esperar um minuto antes de verERDDAP™.)   
             
### Windows{#windows} 
1. Tomcat de desligamento: De uma linha de comando, use: _tomcat_\bin\\\shutdown.bat
2. Remover o descomprimidoERDDAP™instalação: Em _tomcat_/webapps, use
/S/Q erddap
3. Apague o velho erddap. arquivo de guerra: Em _tomcat_\\\webapps, use del erddap. Guerra
4. Entendido. arquivo de guerra do diretório temporário para _tomcat_\\webapps
5. Reinicie Tomcat eERDDAP: use _tomcat_\bin\\\startup.bat
6. VisualizaçãoERDDAP™no seu navegador para verificar que o reinício conseguiu.
     (Muitas vezes, você tem que tentar algumas vezes e esperar um minuto antes de verERDDAP™.) 

Atualização de problemasERDDAP? Veja o nosso[seção sobre como obter suporte adicional](/docs/intro#support).
