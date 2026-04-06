# Bandeiras de Característica

Esta página documenta as opções de configuração disponíveis no sistema. Essas bandeiras controlam várias características, capacidades experimentais e comportamentos legados.

##  **Legenda do ciclo de vida da bandeira** 

*  **Estável:** Destinado como sinalizadores de longo prazo para permitir que os administradores alterem a funcionalidade. Seguro para a produção.
*  **Teste:** Características que estão prontas para testes. Estes serão graduados em "Stable" ou eventualmente serão definidos para o seu valor alvo e ter a bandeira removida.
*  **Em Construção:** Atualmente é codificado para false no código, independentemente da configuração. O recurso ainda não está pronto para uso.

##  **□ Otimizações nos testes** 

Estas são bandeiras susceptíveis de serem removidas no futuro.

###  **Toque somente no tópicoQuando o item** 

Designação das mercadorias
Sinal de otimização. Se true, o tópico de toque só é executado quando existem itens para processar.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

###  **tarefaCacheClear** 

Designação das mercadorias
Activa a tarefa de fundo que limpa os itens expirados da 'cache'.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.27.0 | 

###  **ncHeaderMakeFile** 

Designação das mercadorias
Se true o servidor irá gerar o arquivo nc inteiro antes de criar o resultado ncheader. A nova (preferido) comportamento quando false é gerar diretamente o resultado ncheader.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | falso | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

###  **useEddReflexão** 

Designação das mercadorias
Permite o uso de Java Reflexão para instanciar o EDD ( ERDDAP Conjunto de dados) aulas.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Padrão alterado para verdadeiro em 2.28.0, adicionado em 2.25 | 

###  **fundoCriarSubsetTables** 

Designação das mercadorias
Permite que tabelas de subconjuntos sejam criadas em threads de fundo para melhorar o tempo de carregamento dos conjuntos de dados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

###  **useNcMetadataForFileTable** 

Designação das mercadorias
Usos NetCDF metadados para povoar a visão da tabela de arquivos. Em particular, se um arquivo nc inclui real_range para cada variável, o carregamento do conjunto de dados pode pular a leitura do arquivo inteiro.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

##  **Comportamento do Sistema & Núcleo** 

###  **e- mail IsActive** 

Designação das mercadorias
Controla se o sistema tenta enviar e-mails reais (Por exemplo, para atualizações de assinatura ou relatórios de erro) através do servidor SMTP configurado.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | verdadeiro (Dependendo da configuração do administrador)   | 
 |   **Histórico**   | Legado | 

:::info Lógica
Esta bandeira é calculada dinamicamente na inicialização. O padrão é false a menos que todas as credenciais SMTP necessárias (máquina, porta, usuário, senha, endereço) são estritamente fornecidos em setup.xml.
:::

###  **showLoadErrorsOnStatusPage** 

Designação das mercadorias
Determina se erros de carga detalhados são exibidos publicamente na página de status.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | definir como desejado | 
 |   **Histórico**   | Adicionado em 2.25 | 

###  **por omissãoAcessívelViaFiles** 

Designação das mercadorias
Define o comportamento padrão para se os arquivos subjacentes de um conjunto de dados podem ser acessados no serviço de arquivos.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | falso | 
 |   **Histórico**   | Adicionado em 2.10 | 

##  **Datasets** 

###  **start rápido** 

Designação das mercadorias
Se habilitado, o sistema tenta iniciar mais rápido pulando certas verificações profundas de validação de conjuntos de dados durante a inicialização.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.38 | 

###  **enableEnvParsing** 

Designação das mercadorias
Activa o processamento da datasets.xml arquivo com um [Substitutor de Textos](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Isto tem muitos usos, incluindo definir valores privados (como senhas) utilizando variáveis de ambiente.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | definir como desejado | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

###  **useSaxParser** 

Designação das mercadorias
Muda o motor interno de análise XML para usar um SAX (API simples para XML) analisador em vez do analisador DOM. Isto permite algumas novas funcionalidades avançadas como o XInclude, e [atributos de exibição personalizados](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.25 | 

###  **listPrivateDatasets** 

Designação das mercadorias
Determina se conjuntos de dados privados (os que requerem autenticação) aparecer na lista de dados principal.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | falso | 
 |   **Histórico**   | Adicionado em 1.20 | 

###  **Limites políticosActive** 

Designação das mercadorias
Controla se os limites políticos podem ser traçados em mapas.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.80 | 

###  **forceSyncronousLoading** 

Designação das mercadorias
Carregar conjuntos de dados síncronos em vez de carga de fundo diferida.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | falso | 
 |   **Histórico**   | Adicionado em 2.30 | 

##  **Metadados & Normas** 

###  **fgdcActive** 

Designação das mercadorias
Gera e serve FGDC (Geográfica Federal Comité de dados) metadados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.38 | 

###  **iso19115 Activo** 

Designação das mercadorias
Gera e serve metadados ISO 19115.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.38 | 

###  **usarSisISO19115** 

Designação das mercadorias
Usa a biblioteca Apache SIS para gerar metadados ISO 19115 em vez do gerador legado. Se isso estiver ligado e o usoSisISO19139 não estiver ligado, os metadados padrão do IOS 19115 estarão no formato ISO19115_3_2016. Se isso for falso, o formato padrão estará no formato ISO19115_2.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.26 | 

###  **usoSisISO19139** 

Designação das mercadorias
Usa a biblioteca Apache SIS para gerar metadados ISO19139_2007.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | falso | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

###  **jsonldActive** 

Designação das mercadorias
Gera e serve JSON-LD (Dados Ligados) metadados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Legado | 

###  **gerarCroissantSchema** 

Designação das mercadorias
Gera o esquema de metadados "Croissant" como o esquema padrão para a prontidão de aprendizado de máquina.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.28.0 | 

###  **Variáveis devem terIoosCategoria** 

Designação das mercadorias
Força que as variáveis devem ter um atributo categoria IOOS.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | definir como desejado | 
 |   **Histórico**   | Legado | 

###  **includeNcCFSubsetVariables** 

Designação das mercadorias
O comportamento legado foi gerar variáveis de subconjunto apenas para os conjuntos de dados EDDTableFromNcCFFiles. Isto foi adicionado para padrão o comportamento para EDDTableFromNcCFFiles para ser consistente com outros tipos de conjunto de dados. Se você precisar do legado automático subsetVariables Você pode habilitar isso. A melhor solução seria adicionar subsetVariables à definição do conjunto de dados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | falso | 
 |   **Histórico**   | Adicionado em 2.26 | 

##  **Assinaturas e Notificações** 

###  **subscriptionSystemActive** 

Designação das mercadorias
Activa o sistema de subscrição de e- mail para actualizações de conjuntos de dados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.14 | 

###  **subscreverParaRemoteErddapDataset** 

Designação das mercadorias
Permite isto ERDDAP instância para subscrever o remoto ERDDAP conjuntos de dados para atualizações.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.70 | 

###  **atualizarSubsRssOnFileChanges** 

Designação das mercadorias
Inscrição de gatilhos e RSS atualizações quando os arquivos subjacentes mudam. O comportamento legado foi apenas para fazer atualizações no reload de dataset (que alguns servidores tinham tão raramente como semanalmente) .

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 2.26 | 

###  **activar MqttBroker** 

Designação das mercadorias
Inicia um corretor MQTT interno dentro do aplicativo para lidar com mensagens.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | definir como desejado | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

###  **publicarMqttNotif** 

Designação das mercadorias
Permite a publicação de notificações (como alterações no conjunto de dados) ao corretor da MQTT.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | definir como desejado | 
 |   **Histórico**   | Adicionado em 2.29.0 | 

##  **Cabeçalhos/Configuração Web** 

###  **Use o HeadersFor Url** 

Designação das mercadorias
Permite usar cabeçalhos HTTP para determinar os detalhes do URL da solicitação (útil atrás de proxies) .

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Padrão alterado para verdadeiro em 2.28.0, Adicionado em 2.27.0 | 

###  **activar Cors** 

Designação das mercadorias
Activa a Partilha de Recursos de Origem Cruzada (CORS) cabeçalhos nas respostas HTTP.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | definir como desejado | 
 |   **Histórico**   | Adicionado em 2.26 | 

##  **Pesquisar** 

###  **UseLucineSearch Engine** 

Designação das mercadorias
Muda o motor de busca interno para usar o Apache Lucene.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Teste | 
 |   **Padrão atual**   | falso | 
 |   **Objectivo a longo prazo**   | ? | 
 |   **Histórico**   | Legado | 

##  **Serviços & Protocolos** 

###  **ficheirosActive** 

Designação das mercadorias
Activa a vista do navegador "Arquivos" para conjuntos de dados que o suportam.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.58 | 

###  **conversoresActive** 

Designação das mercadorias
Activa as ferramentas de conversão na UI.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.44 | 

###  **slideSorterActive** 

Designação das mercadorias
Activa a Ordenação de Slides.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.44 | 

###  **dataProviderFormActive** 

Designação das mercadorias
Activa o formulário que permite aos fornecedores de dados introduzir metadados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Legado | 

###  **OutOfDateDatasetsActive** 

Designação das mercadorias
Permite o relatório de conjuntos de dados desatualizados.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.82 | 

###  **wmsActive** 

Designação das mercadorias
Activa o Serviço de Mapa Web ( WMS ) interface.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Adicionado em 1.44 | 

###  **wmsClientActive** 

Designação das mercadorias
Activa o interior WMS Características do cliente.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
 |   **Histórico**   | Legado | 

###  **geoServicesRestActive** 

Designação das mercadorias
Activar a RESTful interface para Serviços Geoespaciais. Não totalmente implementado.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Em Construção | 
 |   **Padrão atual**   | falso (Codificado)   | 
 |   **Objectivo a longo prazo**   | verdadeiro | 

###  **wcsActive** 

Designação das mercadorias
Activa o Serviço de Cobertura Web ( WCS ) interface. Não totalmente implementado.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Em Construção | 
 |   **Padrão atual**   | falso (Codificado)   | 
 |   **Objectivo a longo prazo**   | verdadeiro | 

###  **sosActive** 

Designação das mercadorias
Activa o Serviço de Observação do Sensor ( SOS ) interface.

 | Propriedade | Detalhes | 
 | ...---- | ...---- | 
 |   **Ciclo de vida**   | Em Construção | 
 |   **Padrão atual**   | falso (Codificado)   | 
 |   **Objectivo a longo prazo**   | verdadeiro | 
