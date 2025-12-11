---
sidebar_position: 9
---
# Prometheus

 [Métricas de Prometheus](https://prometheus.io/) estão disponíveis em /erddap/metrics. As métricas do núcleo JVM foram adicionadas em 2,25 com muitos ERDDAP™ métricas adicionadas na versão 2.26. Se você quiser usar as métricas certifique-se de que você está em pelo menos versão 2.26. Eles padrão para habilitado, você pode desabilitá-los adicionando
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
para o seu setup.xml.

Estas métricas são projetadas para serem legíveis à máquina. Enquanto você pode verificar a página de métricas manualmente, para monitoramento de profundidade é recomendado usar um servidor Prometheus. Um servidor Prometheus irá armazenar métricas históricas que permitem um monitoramento mais profundo (como taxas e mudanças de valores passados) , e também é frequentemente executado com um servidor Grafana. Nós fornecemos alguns painéis pré-construídos que os administradores podem achar úteis para começar a monitorar seus servidores.

## Executando servidor Prometheus

A melhor documentação para executar a pilha de monitoramento (Prometheus + Grafana) está no Prometheus [Leia-me](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ métricas

### JVM

 ERDDAP™ exporta um número de métricas que você pode encontrar úteis (a partir de ERDDAP™ 2.25) . Para o monitoramento geral da saúde da JVM usamos as métricas coletadas pelo cliente Prometheus. Isso inclui dados sobre coleta de lixo, uso de memória, threads e muito mais. Para mais informações, consulte [Prometheus Java Documentação do Cliente JVM](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ específico

Também exportamos um número de ERDDAP™ métricas específicas (a partir de ERDDAP™ 2.26) . Se você quiser investigar o código, você pode encontrar as métricas coletadas em [Metrics.com](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP _ Construir _ info

Esta é a informação de compilação para o ERDDAP™ servidor. Inclui versão (Major.) , versão_full (Major.) , e deployment_info (usado para indicar como o servidor é implantado, como 'Docker ') .

#### recurso_flags

Esta é uma métrica de informação que mostra o estado atual de bandeiras de recursos. A maioria das opções de configuração booleana são consideradas bandeiras de recursos.

#### buffered Imagem

Esta é uma métrica de informação que indica se a aceleração gráfica está disponível.

####  http _request_duration_seconds

Este é um histograma de duração de resposta de solicitação em segundos. As etiquetas são request_type (por exemplo griddap, tabledap , arquivos, wms) , dataset_id (se aplicável, de outra forma repete o tipo de solicitação) , file_type (formato de saída para pedido por exemplo, '.html', '.csv', '.iso19115 ') , lang_code (idioma para o pedido, ou string vazia se padrão) , status_code ( http código de status do pedido, por exemplo, 200, 302, 404) .

Isso pode ser usado para rastrear solicitações por dataset id para determinar os conjuntos de dados populares do servidor. Ele também pode ajudar a identificar se existem tipos específicos de solicitações que são lentas em seu servidor.

#### touch_thread_duration_seconds

Um histograma de duração de tarefa de rosca de toque. Eles são rotulados com sucesso (verdadeiro / falso) .

#### task_thread_duration_seconds

Um histograma de duração do segmento de tarefa. Eles são rotulados com sucesso (verdadeiro / falso) e task_type (Intérprete) .

#### load_datasets_duration_seconds

Um histograma de duração para tarefas de conjunto de dados de carga. Eles são rotulados com maior (verdadeiro / falso) .

#### email_thread_duration_seconds

Um histograma de duração da tarefa do email thread. Eles são rotulados com sucesso (verdadeiro / falso) .

#### email_count_distribuição

Um histograma de e-mails por tarefa.

#### dataset_count

Um calibre dos conjuntos de dados, definido após cada chamada de conjuntos de dados de carga. Isto é rotulado com categoria (grade, tabela) .

#### dataset_failed_load_count

Um medidor dos conjuntos de dados que não foram carregados, definido após cada chamada de conjuntos de dados de carga.

#### Página inicial

Contra os pedidos que foram derramados. O servidor irá lançar um pedido quando acreditar que o servidor é baixo na memória (RAM) e o pedido causaria problemas. Isso não inclui solicitações de erro devido a baixa RAM ou espaço em disco durante o manuseio da solicitação.

#### Perigoso_memory_emails_total

Contador de vezes o servidor tenta enviar um e-mail para o administrador que a memória é perigosamente baixa.

#### perigoso_memory_failures_total

Contador de pedidos que falharam devido à máquina que está sem memória. Muitas vezes isso é porque a máquina está recebendo um monte de pedidos caros ou o pedido individual foi excepcionalmente grande.

#### topo_request_total

Contador de pedidos de dados topo. Este é o cache rotulado (cache/not_cached) .

#### Contadores Boundary

Há também uma coleção de contadores para pedidos de limites:

 - nacional_boundaries_request_total
 - state_boundaries_request_total
 - river_boundaries_request_total
 - Página inicial

Estes são rotulados com status (grosseiro, sucesso, tossed) .
