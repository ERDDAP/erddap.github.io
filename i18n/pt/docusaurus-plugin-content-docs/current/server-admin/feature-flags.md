# Bandeiras de Característica

Esta página documenta as bandeiras de configuração disponíveis no sistema. Essas bandeiras controlam vários recursos, capacidades experimentais e comportamentos legados.

##  **Bandeira Lifecycle Legenda** 

*  **Estável:** Destinado como bandeiras de longo prazo para permitir que os administradores alterem a funcionalidade. Seguro para a produção.
*  **Teste:** Características que estão prontas para testes. Estes vão se formar para "Stable" ou eventualmente ser definido para o seu valor alvo e ter a bandeira removida.
*  **Em construção:** Atualmente hardcoded para false no código, independentemente da configuração. O recurso ainda não está pronto para uso.

##  **🚀 Otimizações em testes** 

Estas são bandeiras susceptíveis de ser removidas no futuro.

###  **toque Só quando aparece** 

Descrição
Bandeira de otimização. Se for verdade, o thread touch só é executado quando há itens para processar.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.29.0 | 

###  **tarefaCacheClear** 

Descrição
Permite a tarefa de fundo que limpa itens expirados do cache.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.27.0 | 

###  **ncHeaderMakeFile** 

Descrição
Se for verdade, o servidor irá gerar todo o arquivo nc antes de criar o resultado ncheader. O novo (preferido) comportamento quando false é gerar diretamente o resultado do ncheader.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | falso | 
 |   **História**   | Adicionado em 2.29.0 | 

###  **useReflexão Edd** 

Descrição
Permite o uso de Java Reflexão para instantâneo EDD ( ERDDAP Conjunto de dados) aulas.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | O padrão mudou para true em 2.28.0, adicionado em 2.25 | 

###  **backgroundCreateSubsetTables** 

Descrição
Permite que as tabelas subdefinidas sejam criadas em threads de fundo para melhorar o tempo de carregamento dos conjuntos de dados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.29.0 | 

###  **useMetadata para tabela de arquivos** 

Descrição
Usos NetCDF metadados para preencher a exibição da tabela de arquivos. Em particular, se um arquivo nc inclui real_range para cada variável, o carregamento do conjunto de dados pode pular a leitura de todo o arquivo.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.29.0 | 

##  **r Comportamento de Sistema e Núcleo** 

###  **e-mail Ativar** 

Descrição
Controla se o sistema tenta enviar e-mails reais (por exemplo, para atualizações de assinatura ou relatórios de erro) através do servidor SMTP configurado.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | verdadeiro (Dependente da configuração de admin)   | 
 |   **História**   | Legado | 

:::info Lógica
Esta bandeira é calculada dinamicamente na inicialização. Ele padrão para false a menos que todas as credenciais SMTP necessárias (host, porta, usuário, senha, de endereço) são estritamente fornecidos em setup.xml.
:

###  **mostrarLoadErrorsOnStatusPage** 

Descrição
Determina se os erros de carga de conjunto de dados detalhados são exibidos publicamente na página de status.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | definido como desejado | 
 |   **História**   | Adicionado em 2.25 | 

###  **defaultAccessibleViaFiles** 

Descrição
Define o comportamento padrão para se os arquivos subjacentes de um conjunto de dados podem ser acessados no serviço de arquivos.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | falso | 
 |   **História**   | Adicionado em 2.10 | 

##  **s Datasets** 

###  **O que é isso?** 

Descrição
Se ativado, o sistema tenta começar mais rápido pulando algumas verificações profundas de validação em conjuntos de dados durante a inicialização.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.38 | 

###  **habilitar a participação** 

Descrição
Permite o processamento datasets.xml arquivo com um [Segmento Substituto](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Isso tem muitos usos, incluindo definir valores privados (como senhas) usando variáveis de ambiente.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | definido como desejado | 
 |   **História**   | Adicionado em 2.29.0 | 

###  **uso deParser** 

Descrição
Troca o motor de análise XML interno para usar um SAX (API simples para XML) parser em vez do parser DOM. Isso permite que algumas novas funcionalidades avançadas como o XInclude, e [atributos de exibição personalizados](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.25 | 

###  **listPrivateDatasets** 

Descrição
Determina se conjuntos de dados privados (aqueles que requerem autenticação) aparecer na lista principal de conjuntos de dados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | falso | 
 |   **História**   | Adicionado em 1.20 | 

###  **políticaBoundaries Ação** 

Descrição
Controles se as fronteiras políticas podem ser traçadas nos mapas.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.80 | 

##  **s Metadata & Standards** 

###  **fgdc Ação** 

Descrição
Gera e serve FGDC (Geografia Federal Comissão de dados) metadados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.38 | 

###  **INSTITUIÇÕES Activo** 

Descrição
Gera e serve metadados ISO 19115.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.38 | 

###  **useSisISO19115** 

Descrição
Usa a biblioteca Apache SIS para gerar metadados ISO 19115 em vez do gerador legado. Se isso estiver ligado e usar o SisISO19139 não estiver ligado, os metadados IOS 19115 padrão estarão no formato ISO19115_3_2016. Se este for false, o formato padrão estará no formato ISO19115_2 modificado legado.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.26 | 

###  **useSisISO19139** 

Descrição
Usa a biblioteca Apache SIS para gerar metadados ISO19139_2007.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | falso | 
 |   **História**   | Adicionado em 2.29.0 | 

###  **jsonldActive** 

Descrição
Gera e serve JSON-LD (Dados ligados) metadados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Legado | 

###  **Gerenciador de arquivos** 

Descrição
Gera o esquema de metadados "Croissant" como o esquema padrão para a prontidão de aprendizado de máquina.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.28.0 | 

###  **variáveisMustHaveIoosCategoria** 

Descrição
Fortalece que as variáveis devem ter um atributo de categoria IOOS.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | definido como desejado | 
 |   **História**   | Legado | 

###  **incluir NcCF SubsetVariables** 

Descrição
O comportamento de legado foi gerar variáveis subconjuntas apenas para conjuntos de dados EDDTableFromNcCFFiles. Isso foi adicionado para padrão o comportamento para EDDTableFromNcCFFiles para ser consistente com outros tipos de conjuntos de dados. Se você precisar do legado automático subsetVariables você pode ativar isso. A melhor solução seria adicionar subsetVariables para a definição de conjunto de dados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | falso | 
 |   **História**   | Adicionado em 2.26 | 

##  **s Subscrições e Notificações** 

###  **subscrição Sistema Ativo** 

Descrição
Permite o sistema de assinatura por e-mail para atualizações de conjuntos de dados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.14 | 

###  **Assinatura de dados** 

Descrição
Permite isso ERDDAP exemplo para se inscrever no remoto ERDDAP datasets para atualizações.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.70 | 

###  **updateSubsRssOnFileChanges** 

Descrição
Assinatura de acionadores e RSS atualizações quando os arquivos subjacentes mudam. O comportamento legado era apenas fazer atualizações sobre a recarga de conjuntos de dados (que alguns servidores tinham tão pouco como semanalmente) .

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 2.26 | 

###  **habilitar MqtttBroker** 

Descrição
Inicia um corretor MQTT interno dentro do aplicativo para lidar com mensagens.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | definido como desejado | 
 |   **História**   | Adicionado em 2.29.0 | 

###  **Anúncio grátis para sua empresa** 

Descrição
Permite a publicação de notificações (como alterações de dataset) para a corretora MQTT.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | definido como desejado | 
 |   **História**   | Adicionado em 2.29.0 | 

##  **tion Cabeçalhos da Web / configuração** 

###  **Usar Headers para Url.** 

Descrição
Permite usar cabeçalhos HTTP para determinar os detalhes do URL de solicitação (útil atrás de proxies) .

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Default mudou para true em 2.28.0, adicionado em 2.27.0 | 

###  **habilitar Cors** 

Descrição
Permite a partilha de recursos Cross-Origin (CORSÃO) cabeçalhos em respostas HTTP.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | definido como desejado | 
 |   **História**   | Adicionado em 2.26 | 

##  **  Pesquisa** 

###  **usar LuceneSearchEngine** 

Descrição
Alterna o motor de busca interno para usar o Apache Lucene.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Testes | 
 |   **Padrão atual**   | falso | 
 |   **Objetivo de longo prazo**   | ? | 
 |   **História**   | Legado | 

##  **s Serviços e Protocolos** 

###  **arquivos Ativar** 

Descrição
Permite a visualização do navegador "Files" para conjuntos de dados que o suportam.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.58 | 

###  **conversoresAtiva** 

Descrição
Permite ferramentas de conversão na interface do usuário.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.44 | 

###  **slideSorterActive** 

Descrição
Permite o Slide Sorter.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.44 | 

###  **dataProviderFormActive** 

Descrição
Permite que o formulário permita que os provedores de dados insiram metadados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Legado | 

###  **outOfDateDatasetsActive** 

Descrição
Permite o relato de conjuntos de dados desatualizados.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.82 | 

###  **wmsActive** 

Descrição
Permite o serviço Web Map ( WMS ) interface.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Adicionado em 1.44 | 

###  **wmsClientActive** 

Descrição
Permite o interno WMS características do cliente.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Estável | 
 |   **Padrão atual**   | verdadeiro | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
 |   **História**   | Legado | 

###  **geoServicesRestActive** 

Descrição
Permite o RESTful interface para Geospatial Services. Não totalmente implementado.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Construção | 
 |   **Padrão atual**   | falso (Códigos rígidos)   | 
 |   **Objetivo de longo prazo**   | verdadeiro | 

###  **Ativação** 

Descrição
Permite o Serviço de Cobertura da Web ( WCS ) interface. Não totalmente implementado.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Construção | 
 |   **Padrão atual**   | falso (Códigos rígidos)   | 
 |   **Objetivo de longo prazo**   | verdadeiro | 

###  **sosActive** 

Descrição
Permite o Serviço de Observação do Sensor ( SOS ) interface.

 | Propriedade | Detalhes | 
 | Eu... | Eu... | 
 |   **Ciclo de vida**   | Construção | 
 |   **Padrão atual**   | falso (Códigos rígidos)   | 
 |   **Objetivo de longo prazo**   | verdadeiro | 
