---
sidebar_position: 2
---
# Actualizar
Como fazer uma atualização de um existente ERDDAP™ no seu servidor

## Alterações{#changes} 
1. Fazer as alterações listadas em [Alterações](/changes) na seção intitulada "Coisas ERDDAP™ Administradores precisam saber e fazer" para todos os ERDDAP™ versões desde a versão que você estava usando.
     
##  Java  {#java} 
2. Se você estiver atualizando de ERDDAP™ versão 2.18 ou abaixo, você precisa mudar para Java 25 (ou mais recente) e o Tomcat 10 relacionado. Ver o regular ERDDAP™ instruções de instalação para [ Java ](/docs/server-admin/deploy-install#java) e [Tomcat](/docs/server-admin/deploy-install#tomcat) . Você também terá que copiar o seu _tomcat_/content/erddap diretório da sua antiga instalação Tomcat para sua nova instalação Tomcat.

## Transferir{#download} 
3. Transferir [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/erddap.war) em _tomcat_/webapps .
     (versão 2.30.0, 706.939,130 bytes, MD5=CDC4B3D82A20B33A6623B85312F6DC21, datada de 2026-04-06) 
     
## messages.xml{#messagesxml} 
4. 
    * Frequentes: Se você estiver atualizando de ERDDAP™ Versão 1.46 (ou acima) e você só usar as mensagens padrão, o novo padrão messages.xml será instalado automaticamente (entre os arquivos .class via erddap. guerra) .
         
    * Raros: Se você estiver atualizando de ERDDAP™ Versão 1.44 (ou abaixo) ,
você DEVE excluir o arquivo messages.xml antigo:
         _tomcat_/content/erddap /mensages.xml .
O novo padrão messages.xml será instalado automaticamente (entre os arquivos .class via erddap. guerra) .
         
    * Raros: Se você sempre fizer alterações no arquivo messages.xml padrão (no lugar) ,
você precisa fazer essas alterações para o novo arquivo messages.xml (que é
WEB-INF/classes/gov/noaa/pfel/erddap/util/mensages.xml após erddap.war é descomprimido por Tomcat).
         
    * Raros: Se você manter um arquivo messages.xml personalizado em _tomcat_/content/erddap /,
Você precisa descobrir (via diff) quais alterações foram feitas no messages.xml padrão (que estão no novo erddap. guerra como
WEB-INF/classes/gov/noaa/pfel/erddap/util/mensages.xml) e modificar seu arquivo custom messages.xml em conformidade.
         
## Instalar{#install} 
5. Instalar o novo ERDDAP™ em Tomcat:
\\* Não use o Tomcat Manager. Mais cedo ou mais tarde haverá problemas de memória PermGen. É melhor desligar e iniciar o Tomcat.
\\* Substituir referências a _tomcat_ abaixo com o diretório Tomcat real em seu computador.
     
### Linux e Macs{#linux-and-macs} 
1. Desligar o Tomcat: De uma linha de comando, use: _tomcat_/bin/shutdown.sh
E use ps -ef | grep tomcat para ver se/quando o processo foi interrompido. (Pode levar um minuto ou dois.) 
2. Remover o descomprimido ERDDAP™ instalação: Em _tomcat_/webapps, use
rm - rf erdap
3. Apaga o velho erdap. arquivo de guerra: Em _tomcat_/webapps, use rm erdap. guerra
4. Copia o novo erddap. arquivo de guerra do diretório temporário para _tomcat_/webapps
5. Reiniciar Tomcat e ERDDAP : use _tomcat_/bin/startup.sh
6. Ver ERDDAP™ no seu navegador para verificar se o reinício foi bem sucedido.
     (Muitas vezes, você tem que tentar algumas vezes e esperar um minuto antes de ver ERDDAP™ .)   
             
### Janelas{#windows} 
1. Desligar o Tomcat: De uma linha de comando, use: _tomcat_\\ bin\\ shutdown.bat 
2. Remover o descomprimido ERDDAP™ instalação: Em _tomcat_/webapps, use
del /S/Q erddap
3. Apaga o velho erdap. ficheiro de guerra: Em _tomcat_\\ webapps, use del erdap. guerra
4. Copia o novo erddap. arquivo de guerra da pasta temporária para _tomcat_\\ webapps
5. Reiniciar Tomcat e ERDDAP : use _tomcat_\\ bin\\ startup.bat
6. Ver ERDDAP™ no seu navegador para verificar se o reinício foi bem sucedido.
     (Muitas vezes, você tem que tentar algumas vezes e esperar um minuto antes de ver ERDDAP™ .) 

Problemas na actualização ERDDAP ? Veja o nosso [seção sobre obter suporte adicional](/docs/intro#support) .
