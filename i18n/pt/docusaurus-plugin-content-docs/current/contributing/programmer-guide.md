---
sidebar_position: 2
---

# Guia do programador

Estas são coisas que apenas um programador que pretende trabalhar com ERDDAP ' Java as aulas precisam saber.

###  **Obter o código fonte**  {#getting-the-source-code} 
   

  - Via Código de Fonte no GitHub
O código fonte para versões públicas recentes e versões em desenvolvimento também está disponível através [GitHub](https://github.com/ERDDAP) . Por favor, leia [Wiki Wiki Wiki](https://github.com/ERDDAP/erddap/wiki) para esse projeto. Se você quiser modificar o código fonte (e possivelmente ter as mudanças incorporadas no padrão ERDDAP™ distribuição) , esta é a abordagem recomendada.

###  ** ERDDAP™ dependências**  {#erddap-dependencies} 
 ERDDAP™ usa Maven para carregar dependências de código, bem como alguns arquivos de referência estática (WEB-INF/ref) . Isso é feito para evitar armazenar muitos arquivos grandes no repositório.
Você pode usar `Compilação mvn` e isso vai buscar as dependências e arquivos de ref. Você também pode usar `Pacote mvn` para gerar um arquivo de guerra.
Você pode baixar manualmente os arquivos de ref:

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) e descompacte-o em /WEB-INF/ref/ .

  -  [ref\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) e descompacte-o em /WEB-INF/ref/ .

  -  [O que é isso? .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (versão 1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datada de 2024-10-14) e descompacte-o em _tomcat_, criando _tomcat_/content/erddap .

NOTA: Por padrão, o Maven irá armazenar referências estáticas e testar downloads de arquivos de dados e apenas extraí-los quando uma nova versão é baixada. Para pular o download inteiramente, você pode definir o `skipResourceDownload` e/ou `skipTestResourceDownload` propriedades para Maven (por exemplo. `mvn -DskipResourceDownload pacote` ) . Para forçar a extração, conjunto `-Ddownload.unpack=true` e `-Ddownload.unpackWhenChanged=false` .

-  ERDDAP™ e seus subcomponentes têm muito liberal, código aberto [licenças](/license) , para que você possa usar e modificar o código fonte para qualquer finalidade, com fins lucrativos ou sem fins lucrativos. Note que ERDDAP™ e muitos subcomponentes têm licenças que exigem que você reconheça a fonte do código que você está usando. Ver [Créditos](/credits) . Se necessário ou não, é apenas uma boa forma de reconhecer todos esses contribuidores.
  

-  **Use o código para outros projetos** 

Enquanto você é bem-vindo para usar partes do ERDDAP™ código para outros projetos, ser avisado que o código pode e vai mudar. Não prometemos apoiar outros usos do nosso código. Git e GitHub serão suas principais soluções para lidar com isso -- Git permite que você mescla nossas mudanças em suas mudanças.
   **Para muitas situações em que você pode ser tentado a usar partes de ERDDAP™ em seu projeto, pensamos que você vai encontrar muito mais fácil de instalar e usar ERDDAP™ como é,** e depois escrever outros serviços que usam ERDDAP Serviços. Você pode configurar seu próprio ERDDAP™ instalação em bruto em uma hora ou duas. Você pode configurar seu próprio ERDDAP™ instalação de uma forma polida em poucos dias (dependendo do número e complexidade de seus conjuntos de dados) . Mas cortar partes de ERDDAP™ para o seu próprio projeto é provável que leve semanas (e meses para pegar sutilezas) e você perderá a capacidade de incorporar mudanças e correções de bugs de subseqüentes ERDDAP™ lançamentos. Nós (obviamente) pensar que existem muitos benefícios para usar ERDDAP™ como é e fazendo o seu ERDDAP™ instalação acessível publicamente. No entanto, em algumas circunstâncias, você pode não querer fazer o seu ERDDAP™ instalação acessível publicamente. Então, seu serviço pode acessar e usar seu privado ERDDAP™ e seus clientes não precisam saber sobre ERDDAP™ .

  ####  **Meio caminho** 

Ou, há outra abordagem que você pode encontrar útil que está a meio caminho entre delving em ERDDAP Código e utilização ERDDAP™ como um serviço web autônomo: Na classe EDD, há um método estático que permite fazer uma instância de um conjunto de dados (com base na especificação em datasets.xml ) :
"um do conjunto de dados Xml (String tDatasetID) 
`Ele retorna uma instância de uma tabela EDD ou EDDGrid conjunto de dados. Dada essa instância, você pode chamar\\
"fazer um novo arquivo para uma pergunta (String userDapQuery, String dir, String fileName, String file Tipo de nome) 
`para dizer a instância para fazer um arquivo de dados, de um arquivo específicoType, com os resultados de uma consulta de usuário. Assim, esta é uma maneira simples de usar ERDDAP 's métodos para solicitar dados e obter um arquivo em resposta, assim como um cliente usaria o ERDDAP™ aplicação web. Mas essa abordagem funciona dentro de você Java programa e ignora a necessidade de um servidor de aplicativos como Tomcat. Usamos esta abordagem para muitos dos testes unitários de EDDTable e EDDGrid subclasses, assim você pode ver exemplos disso no código fonte para todas essas classes.

###  **Ambiente de desenvolvimento**  {#development-environment} 

  - Existem configurações para [Jetty.](https://github.com/ERDDAP/erddap/blob/main/development/jetty) e [Docker.](https://github.com/ERDDAP/erddap/blob/main/development/docker) em GitHub, embora as versões sejam esperadas para correr em Tomcat.

  -  **Opcional** : Configurar ERDDAP™ em Tomcat\\
Desde então ERDDAP™ destina-se principalmente a ser um servlet em execução em Tomcat, recomendamos fortemente que você siga o padrão [instruções de instalação](/docs/server-admin/deploy-install) para instalar Tomcat, e depois instalar ERDDAP™ no diretório webapps da Tomcat. Entre outras coisas, ERDDAP™ foi projetado para ser instalado na estrutura de diretório da Tomcat e espera que a Tomcat forneça alguns arquivos .jar.

  -  ERDDAP™ não requer um IDE específico (Chris usa principalmente Visual Studio Code, Bob usado EditPlus) . Não usamos Eclipse, Ant, etc.; nem oferecemos ERDDAP - apoio relacionado a eles. O projeto usa Maven.

  - Usamos um arquivo em lote que exclui todos os arquivos .class na árvore de origem para garantir que temos um compilado limpo (com javac) .

  - Atualmente, usamos o javac jdk-25.0.1+8 da Adoptium para compilar gov.noaa.pfeg.coastwatch.TestAll (tem links para algumas classes que não seriam compiladas de outra forma) e executar os testes. Por razões de segurança, é quase sempre melhor usar as versões mais recentes Java 25 e Tomcat 10.

    - Quando executamos javac ou java, o diretório atual é _tomcat_/webapps/erddap/WEB-INF .

    - Nossa classe javac e java é
       `classes;././././lib/servlet-api.jar;lib/*` 

    - Então sua linha de comando javac será algo como\\
       `javac -encoding UTF-8 -cp classes;././././lib/servlet-api.jar;lib/* classes/gov/noaaa/pfel/coastwatch/TestAll.java` 

    - E sua linha de comando java será algo como\\
`java -cp classes;././././lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M aulas/gov/noaa/pfel/coastwatch/TestAll
       `Opcional: você pode adicionar` -verbose: gc`, que diz Java para imprimir estatísticas de coleta de lixo.

    - Se o teste Todas as compilações, tudo ERDDAP™ as necessidades foram compiladas. Algumas classes são compiladas que não são necessárias para ERDDAP™ . Se compilar TestAll tiver sucesso, mas não compilar alguma classe, essa classe não é necessária. (Há algumas classes inacabadas/não usadas.) 

  - Em alguns casos, usamos o código fonte de terceiros em vez de arquivos .jar (nomeadamente DODS ) e os modificaram ligeiramente para evitar problemas de compilação Java 25. Muitas vezes fizemos outras pequenas modificações (nomeadamente DODS ) por outras razões.

  - A maioria das classes tem métodos de teste em seu arquivo src/test associado. Você pode executar os testes JUnit com o `Teste de mvn` Comando. Isso irá baixar vários arquivos zip de dados que os testes dependem da versão mais recente do [ ERDDAP - Sim. Teste de teste](https://github.com/ERDDAP/erddapTest/releases/) .
     
NOTA: Maven cache downloads, mas irá descompactar os arquivos baixados em cada execução, o que leva tempo. Para ignorar o download
e descompactar arquivos de dados de teste, você pode especificar o `skipTestResourceDownload` propriedade para Maven (por exemplo. `mvn -DskipTestResourceDownload pacote` ) .

###   **Classes importantes**  {#important-classes} 

Se você quiser olhar para o código fonte e tentar descobrir como ERDDAP™ funciona, por favor.

  - O código tem Java Doc comentários, mas o Java Os médicos não foram gerados. Sinta-se livre para gerenciá-los.

  - As classes mais importantes (incluindo os mencionados abaixo) estão dentro de gov/noaa/pfel/erddap.

  - O ERDDAP™ classe tem os métodos de mais alto nível. Estende HttpServlet.

  -  ERDDAP™ passa pedidos para instâncias de subclasses de EDDGrid ou EDDTable, que representam conjuntos de dados individuais.

  - EDStatic tem a maioria das informações e configurações estáticas (por exemplo, a partir dos arquivos setup.xml e message.xml) e oferece serviços estáticos (por exemplo, enviar e-mails) .

  -  EDDGrid e EDDTable subclasses analisar a solicitação, obter dados de métodos específicos de subclasse, em seguida, formatar os dados para a resposta.

  -  EDDGrid subclasses empurrar dados para GridDataAccessor (o recipiente de dados interno para dados gradeados) .

  - As subclasses da EDDTable empurram dados para subclasses do TableWriter, que escrevem dados para um tipo de arquivo específico on-the-fly.

  - Outras classes (por exemplo, classes de baixo nível) também são importantes, mas é menos provável que você esteja trabalhando para mudá-los.
     

###  **Contribuições de código**  {#code-contributions} 

- Questões GitHub
Se você gostaria de contribuir, mas não tem um projeto, veja a lista de [Questões GitHub](https://github.com/ERDDAP/erddap/issues) , muitos dos quais são projetos que você pode assumir. Se você gostaria de trabalhar em um problema, por favor atribuí-lo a si mesmo para indicar a outros que você está trabalhando nele. O problema GitHub é o melhor lugar para discutir quaisquer perguntas para como prosseguir com o trabalho sobre essa questão.

- Se a mudança que você gostaria de fazer é um dos casos comuns abaixo, por favor crie um [Problema do GitHub](https://github.com/ERDDAP/erddap/issues) indicando a mudança que você pretende fazer. Então, uma vez que a mudança estiver concluída, faça um pull request para solicitar o merge. As mudanças comuns incluem:

  - Você quer escrever outra subclasse de EDDGrid ou EDDTable para lidar com outro tipo de fonte de dados. Se assim for, recomendamos que você encontre a subclasse existente mais próxima e use esse código como um ponto de partida.

  - Você deseja escrever outro método saveAs_FileType_. Se assim for, recomendamos que você encontre o método saveAs_FileType_ mais próximo em EDDGrid ou EDDTable e usar esse código como ponto de partida.

Essas situações têm a vantagem de que o código que você escreve é auto-suficiente. Você não precisa saber todos os detalhes de ERDDAP Os internos. E será fácil para nós incorporar seu código em ERDDAP . Note que se você enviar o código, a licença precisará compatível com o ERDDAP™   [licença](/license)   (por exemplo, [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) ou [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Vamos listar a sua contribuição no [créditos](/credits) .

- Se você tem um recurso não coberto acima que você gostaria de adicionar a ERDDAP , recomenda-se primeiro criar um tópico de discussão no [Discussões no GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Para recursos/mudanças significativas, o Conselho Técnico irá discuti-los e decidir sobre se aprovar a adição a ERDDAP™ .

###  **A julgar suas contribuições de código**  {#judging-your-code-contributions} 
Se você quiser enviar código ou outras alterações a serem incluídas ERDDAP Isso é óptimo. A sua contribuição tem de cumprir determinados critérios para ser aceite. Se você seguir as diretrizes abaixo, você aumenta consideravelmente as chances de sua contribuição ser aceita.
   

  - O ERDDAP™ projeto é gerenciado por um NATD ( NOAA Nomeado Diretor Técnico) com entrada de um Conselho Técnico.
A partir de 2007 (o início do ERDDAP ) através de 2022, era Bob Simons (também o fundador-Leader) . A partir de janeiro de 2023, é Chris John. Basicamente, o NATD é responsável por ERDDAP , então ele tem a palavra final sobre decisões sobre ERDDAP™ código, notavelmente sobre o projeto e se uma determinada solicitação de pull será aceita ou não. Tem de ser assim, em parte, por razões de eficiência (funciona muito bem para Linus Torvalds e Linux) e em parte por razões de segurança: Alguém tem que dizer às pessoas de segurança de TI que ele assume a responsabilidade pela segurança e integridade do código.
     

  - O NATD não garante que ele vai aceitar o seu código.
Se um projeto não funcionar tão bem como tínhamos esperado e se não puder ser recuperado, o NATD não incluirá o projeto no ERDDAP™ distribuição. Por favor, não te sintas mal. Às vezes os projetos não funcionam tão bem como esperavam. Acontece a todos os desenvolvedores de software. Se você seguir as diretrizes abaixo, você aumenta muito suas chances de sucesso.
     

  - É melhor se as mudanças são de interesse geral e utilidade.
Se o código for específico para sua organização, provavelmente é melhor manter um ramo separado de ERDDAP™ para uso. O Axiom faz isto. Felizmente, Git torna isso fácil de fazer. O NATD quer manter uma visão consistente para ERDDAP , não permitir que ele se torne um projeto de pia de cozinha onde todo mundo adiciona um recurso personalizado para o seu projeto.
     

  - Seguir Java Convenções de Código.
Em geral, seu código deve ser de boa qualidade e deve seguir o original [ Java Convenções de Código](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : colocar arquivos .class no lugar adequado na estrutura do diretório, dar arquivos .class um nome apropriado, incluir apropriado Java Comentários do Doc, incluem //comments no início de cada parágrafo do código, indent com 4 espaços (não guia) , evitar linhas &gt;80 caracteres, etc. As convenções mudam e o código fonte nem sempre está totalmente atualizado. Quando em dúvida, combine o código com as convenções e não o código existente.

- Use nomes de classe, método e variáveis descritivos.
Isso torna o código mais fácil para os outros lerem.
   

- Evite o código extravagante.
A longo prazo, você ou outras pessoas terão que descobrir o código para mantê-lo. Então, use métodos de codificação simples que são assim mais fáceis para os outros (incluindo você no futuro) para descobrir. Obviamente, se houver uma verdadeira vantagem de usar alguma fantasia Java recurso de programação, usá-lo, mas documentar extensivamente o que você fez, por que, e como ele funciona.
   

- Trabalhe com o Conselho Técnico antes de começar.
Se você espera obter suas alterações de código inseridas ERDDAP™ , O Conselho Técnico definitivamente vai querer falar sobre o que você vai fazer e como você vai fazê-lo antes de fazer qualquer alteração no código. Dessa forma, podemos evitar que você faça mudanças que o NATD, no final, não aceita. Quando você está fazendo o trabalho, o Conselho Técnico e NATD está disposto a responder perguntas para ajudá-lo a descobrir o código existente e (geral) como lidar com o seu projeto.
   

- Trabalhe independentemente (tanto quanto possível) depois de começares.
Em contraste com o acima "Trabalho com o Conselho Técnico", depois de começar o projeto, o NATD incentiva você a trabalhar o mais independentemente possível. Se o NATD tem que lhe dizer quase tudo e responder a muitas perguntas (especialmente aqueles que você poderia ter respondido lendo a documentação ou o código) , então seus esforços não são uma economia de tempo para o NATD e ele pode muito bem fazer o trabalho eles mesmos. É o [Mês do Homem Múltiplo](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problema. Claro, ainda devemos comunicar. Seria ótimo ver periodicamente seu trabalho em andamento para garantir que o projeto esteja no caminho certo. Mas quanto mais você pode trabalhar de forma independente (após o Conselho Técnico concordar sobre a tarefa em mãos e a abordagem geral) melhor.
   

- Evite insetos.
Se um bug não for apanhado antes de um lançamento, ele causa problemas para os usuários (no melhor) , retorna a informação errada (no pior) , é um blot em ERDDAP 's reputação, e vai persistir em out-of-date ERDDAP™ instalações durante anos. Trabalhe muito duro para evitar insetos. Parte disso é escrever código limpo (por isso é mais fácil ver problemas) . Parte disto é escrever testes unitários. Parte disso é uma atitude constante de evitar erros quando você escreve código. Não faça o NATD arrepender de adicionar seu código para ERDDAP™ .
   

- Escreva um teste ou testes unitários.
Para novo código, você deve escrever testes JUnit em um arquivo de teste.
Por favor, escreva pelo menos um método de teste individual que testa cuidadosamente o código que você escreve e o adicione ao arquivo de teste JUnit da classe para que ele seja executado automaticamente. Unidade (e relacionados) testes são uma das melhores maneiras de pegar bugs, inicialmente, e no longo prazo (como outras coisas mudam ERDDAP™ ) . Como Bob disse, "Os testes da universidade são o que me deixa dormir à noite."
   

- Faça com que o NATD compreenda e aceite as mudanças no seu pedido de pull.
Parte disso está escrevendo um método de teste unitário (S) . Parte disso está limitando suas alterações a uma seção de código (ou uma classe) se possível. O NATD não aceitará nenhuma solicitação de pull com centenas de mudanças ao longo do código. O NATD diz às pessoas de segurança de TI que ele assume a responsabilidade pela segurança e integridade do código. Se houver muitas mudanças ou elas são muito difíceis de descobrir, então é muito difícil verificar se as mudanças estão corretas e não introduzir problemas de segurança ou bugs.
   

- Mantém isso simples.
Um bom tema geral para o seu código é: Mantenha-o simples. Código simples é fácil para outros (incluindo você no futuro) para ler e manter. É fácil para o NATD entender e assim aceitar.
   

- Assuma a responsabilidade a longo prazo pelo seu código.
No longo prazo, é melhor se você assumir a responsabilidade contínua por manter seu código e responder a perguntas sobre isso (por exemplo, no ERDDAP™ Grupo Google) . Como alguns autores observam, o código é uma responsabilidade, bem como um ativo. Se um bug for descoberto no futuro, é melhor se você corrigi-lo porque ninguém conhece seu código melhor do que você (também para que haja um incentivo para evitar insetos em primeiro lugar) . O NATD não está pedindo um compromisso firme para fornecer manutenção contínua. A NATD está apenas dizendo que fazer a manutenção será muito apreciada.
