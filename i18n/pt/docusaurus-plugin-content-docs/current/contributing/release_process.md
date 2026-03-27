---
sidebar_position: 3
---
#  ERDDAP™ Processo de Lançamento
* Certifique-se de que os arquivos de comparação de imagens estão disponíveis (isto pode significar correr `verificar mvn` , se você quiser acelerar que se restringe apenas ao grupo ImageComparison embora nota que ainda requer execução Jetty testes) 
* Atualizar dependências
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Atualizar plug-ins
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Execute testes para garantir que as atualizações de dependência não quebraram nada para todas as configurações principais (conjuntos de dados de análise em particular, embora quaisquer outras configurações significativas também) . Note que o conjunto de testes externo pode ser muito flácido. O conjunto de teste lento AWS pode demorar muito tempo.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Utilização `tradução python/traduzir.py` atualizar traduções se necessário.
* Desenvolvimento de conjuntos EDStatic.java Modo para false, alterar o número da versão e especificar a data de lançamento.
* Faz a construção.
```
mvn clean
mvn compile
mvn package
```
## Canário
Envie o arquivo de guerra para distribuição no servidor Coastwatch ou algum outro servidor que usa a maioria dos tipos de conjuntos de dados e recebe muito tráfego.
Queremos tentar encontrar erros antes de uma distribuição mais ampla da compilação.

Incluir mensagem ao contar sobre uma nova versão.

O procedimento normal é:
* Envie o arquivo .war para stoopwatch \\[ tomcat \\] /content/erddap/
* Como utilizador=tomcat:
  * In \\[ tomcat \\] /bin/ :
./shutdown.sh // use "ps -fu tomcat" para garantir que parou
  * In \\[ tomcat \\] /webapps/ :
rm - rf erdap
rm erdap. guerra
cp ../content/erddap/erddap2.22.war erddap.war // ou qualquer que seja o número
  * In \\[ tomcat \\] /bin/ :
./ Startup.sh
  * Após a ERDDAP retornou uma página web, em \\[ tomcat \\] /webapps/ :
chgrp - R erddap erddap
chmod - R g+rw erddap
chmod - R o- rwx erddap

## Lançamento do GitHub
Redija o lançamento do GitHub, incluindo erddap.war e erddapContent .zip   (sem números de versão) 

title: The official v2.25 version
descrever: Veja a lista de alterações em
       https://erddap.github.io/changes#version-225
 

## Actualização da Documentação
* Atualizar o número da versão no arquivo docusaurus.config.ts (na secção do rodapé) .
* Editar as páginas de documentação (implant-install.md e implant-update.md) .
  * Procurar \\[ erddap.war \\]  
  * Copiar as informações existentes (ligeiramente reformatado) à lista das instalações anteriores 2.
  * Altere a informação de lançamento atual para o erddap. guerra em \\[ erddap.war \\] 
* Execute as traduções para o site de documentação.
* Faça uma solicitação de pull e misture as alterações.
* Implantar o site de documentação (ver lerme) .

## Assegurar que outros acordos de recompra estejam atualizados conforme necessário
Principalmente isso significa ErddapContent e ErddapTest, mas eles devem ser mantidos atualizados durante as mudanças de desenvolvimento.

## Notificar Usuários
Primeiro notifique os usuários que solicitaram alterações (ou cujos erros foram corrigidos) . Dê-lhes tempo para verificar mudanças e/ou levantar problemas.

 ERDDAP versão 2.25 já está disponível&#33;

Você pode ler sobre as alterações em
 https://erddap.github.io/changes#version-225
 

Algumas das mudanças são mudanças que você sugeriu. Muito obrigado pelas suas sugestões. Procure o seu nome na lista de alterações para ver os detalhes. Seria ótimo se você pudesse experimentar os novos recursos em breve, antes que eu anuncie esta nova versão para um público mais amplo.

Se é ERDDAP administrador, as instruções de atualização estão em
 https://erddap.github.io/docs/server-admin/deploy-update
 

Se você tiver algum problema, perguntas, sugestões, por favor me envie um e-mail.

Obrigado por usar ERDDAP .

### Anunciar lançamento
Envie um anúncio para a lista de envio de anúncios.
