---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™e a nuvem

## O que é a nuvem

A definição mais simples não é servidores locais. Isso é muito amplo e pode significar muitas configurações diferentes. Por exemplo, pode ser um servidor físico dedicado em um data center, um Virtual Private Server, um servidor compartilhado, sem servidor ou algo mais.

### Porquê a nuvem

Há muitas razões pelas quais as organizações querem se mover para a nuvem. A mais importante é a flexibilidade que fornece para as necessidades de computação / armazenamento em comparação com a compra de hardware físico.

Isso elimina a necessidade de manter uma sala de datacenter/servidor. Também permite dimensionar recursos de computação para suas necessidades atuais. Muito parecido com a nuvem pode significar muitas coisas diferentes, ser capaz de escalar seus recursos também. Pode significar pagar mais (ou menos) recursos sem servidor. Pode significar mover-se de um servidor compartilhado para um servidor privado. Pode significar atualizar para um servidor físico dedicado maior.

## CantaERDDAP™correr na nuvem?

Sim.

ERDDAP™é projetado para ser executado dentro Tomcat que pode ser executado localmente ou em ambientes de nuvem. Há suporte comunitário para correr em Docker e há[funcionário Suporte do Docker em breve](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

Isso disse,ERDDAP™foi projetado em um momento em que servidores dedicados eram a norma. Não é sem servidor, e seria extremamente difícil se não fosse impossível torná-lo sem servidor.

### CantaERDDAP™escala?

EscaladaERDDAP™é mais complicado do que apenas usando mais recursos sem servidor. Temos uma grande documentação sobre[como escalarERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Tornando mais fácil a escalaERDDAP™é algo em que estamos interessados.

### O que impede o autoscaling?

ERDDAP™está fazendo muitas coisas, incluindo manter os conjuntos de dados atualizados, notificando os assinantes de mudanças em conjuntos de dados, dados de cache, manipulação de solicitações de usuário e muito mais. Para uma dimensão suficientemente grandeERDDAP™servidor como[Relógio de montanha](https://coastwatch.pfeg.noaa.gov/erddap/index.html), isso significa que está continuamente fazendo algo. Uso contínuo é na verdade uma situação extremamente cara para opções sem servidor (você paga um grande prêmio para computação ao fazer serverless e assim a principal vantagem é quando você só ocasionalmente fazer chamadas) . Além disso, tentando mover todos osERDDAP™’s várias funcionalidades para versões sem servidor acabaria com uma configuração significativamente mais complicada necessária para administradores.

### CantaERDDAP™usar o Cloud Storage?

Sim.

ERDDAP™suporta armazenamento em nuvem (incluindo AWS S3) e melhorando este apoio (por exemplo não AWS S3) é uma alta prioridade naERDDAP™desenvolvimento roadmap.ERDDAP™também é capaz de extrair dados de muitos serviços on-line existentes. Para mais informações eu recomendo olhar através do nosso[documentação do tipo de dataset](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
