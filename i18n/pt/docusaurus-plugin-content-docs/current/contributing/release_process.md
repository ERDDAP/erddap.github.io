---
sidebar_position: 3
---
#  ERDDAP™ Processo de Lançamento
* Certifique-se de que os arquivos de comparação de imagem estão disponíveis (Isso pode significar correr `Mvn verificar` , se você quiser acelerar isso restringindo apenas ao grupo ImageComparison embora note que ainda requer executar testes da Jetty) 
* Dependências de atualização
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Plugins de atualização
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Execute testes para garantir que as atualizações de dependência não quebraram nada para todas as principais configurações (datasets analisando em particular, embora quaisquer outras configurações significativas, bem) . Note que o conjunto de teste externo pode ser muito escasso. A suite de teste SlowAWS pode demorar muito tempo.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Use TradutorMessages.translate () para atualizar traduções se necessário
* Desenvolvimento de conjuntos EDStatic.java Modo para false, alterar o número da versão e especificar a data de lançamento.
* Faça a compilação
```
mvn clean
mvn compile
mvn package
```
## Canário
Envie o arquivo de guerra para distribuição no servidor Coastwatch ou algum outro servidor que usa a maioria dos tipos de conjuntos de dados e recebe muito tráfego.
Queremos tentar encontrar erros antes da distribuição mais ampla da compilação.

Inclua mensagem ao contar sobre um novo lançamento.

O procedimento padrão é:
* Carregar o arquivo .war para Coastwatch \\[ Toca a brincar. \\] /conteúdo/erddap/
* Como user=tomcat:
  * Em \\[ Toca a brincar. \\] - Não.
./shutdown.sh //use "ps -fu tomcat" para garantir que parou
  * Em \\[ Toca a brincar. \\] / Webapps / :
Rm -rf erddap
Rm erddap. Guerra
cp ../content/erddap/erddap2.22.war erddap.war //ou seja qual for o número
  * Em \\[ Toca a brincar. \\] - Não.
./startup.sh
  * Depois do ERDDAP retornou uma página web, em \\[ Toca a brincar. \\] / Webapps / :
O que fazer?
chmod -R g+rw erddap
chmod -R o-rwx erddap

## Lançamento do GitHub
Projeto da versão GitHub, incluem erddap.war e erddapContent .zip   (sem números de versão) 

title: The official v2.25 version
descrever: Veja a lista de alterações
      https://erddap.github.io/changes#version-225

## Atualização da documentação
* Atualize o número da versão no arquivo docusaurus.config.ts (na seção rodapé) .
* Editar as páginas de documentação (deploy-install.md e deploy-update.md) .
  * Pesquisar \\[ erddap.war \\]  
  * Copie as informações existentes (ligeiramente reformatado) à lista de instalações anteriores 2.
  * Altere as informações de lançamento atuais para erddap. em guerra \\[ erddap.war \\] 
* Execute as traduções para o site de documentação.
* Faça uma solicitação de pull e mescla as alterações.
* Implementar o site de documentação (ver a leitura) .

## Assegurar que outras repetições estejam atualizadas conforme necessário
Principalmente isso significa ErddapContent e ErddapTest, mas eles devem ser mantidos atualizados durante as mudanças de desenvolvimento.

## Notifique os usuários
Primeiro notificar quaisquer usuários que solicitaram alterações (ou cujos insetos foram corrigidos) . Dê-lhes tempo para verificar alterações e/ou levantar problemas.

 ERDDAP versão 2.25 está agora disponível&#33;

Você pode ler sobre as mudanças em
https://erddap.github.io/changes#version-225

Algumas das mudanças são mudanças que você sugeriu. Muito obrigado pelas suas sugestões. Procure o seu nome na lista de alterações para ver os detalhes. Seria ótimo se você pudesse experimentar os novos recursos em breve, antes de eu anunciar esta nova versão para um público mais amplo.

Se você é um ERDDAP administrador, as instruções para atualização estão em
https://erddap.github.io/docs/server-admin/deploy-update

Se você tem algum problema, perguntas, sugestões, por favor me envie um e-mail.

Obrigado por usar ERDDAP .

### Anunciar lançamento
Envie um anúncio para a lista de envio de anúncios.
