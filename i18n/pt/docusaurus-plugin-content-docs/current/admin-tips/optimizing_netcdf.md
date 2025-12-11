Este conteúdo é baseado em um [mensagem de Roy Mendelssohn para o ERDDAP grupo de usuários](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Otimizando arquivos netcdf para a nuvem
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. repacking e tamanho da página

Recentemente em fazer alguma pesquisa eu me deparei com este artigo muito interessante:

https://nsidc.github.io/cloud-optimized-icesat2/

Nada parece inflamar paixões como discussões de linguagens de programação, editores e formatos de arquivos, e isso não é uma recomendação de que formato (S) você deve usar, mas ao invés de entender o que está nesse papel e ver quanto a melhoria pode ser obtida ( ERDDAP™ sempre tentou ser agnóstico sobre muitos desses assuntos, em vez de escolher para tentar trabalhar com como as pessoas realmente trabalham com dados) .

O artigo destina-se principalmente a situações em que os dados são armazenados em uma loja de objetos, como a Amazon S3. As lojas de objetos são acessadas através da rede usando http  (S) comandos, em comparação com o armazenamento com uma conexão direta com o (virtual) servidor, há uma latência muito mais longa como o pedido tem de fazer uma viagem redonda. Para as lojas de objetos que você deseja fazer o menor possível pedidos, mas se você fizer apenas grandes pedidos para diminuir o número de chamadas, você pode estar acessando muito mais dados do que você precisa, o que pode ser igualmente lento se não mais assim. Assim, o truque é alcançar um equilíbrio entre esses dois fatores. E mesmo que o acesso aos dados nas lojas de objetos melhorou muito, assim tem acesso ao armazenamento diretamente anexado. Em pesquisar isso algumas estimativas são:

Disco local:
• Tempo de busca: 0.1ms
• 6 procura: 0.6ms (negligenciável) 
• Ler metadados dispersos é rápido
Cloud HTTP:
• Pedido de latência: 100-200ms
• 6 pedidos: 600-1200ms (Muito lento&#33;) 
• Cada pedido tem tempo de ida e volta de rede

A segunda coisa a entender é que os arquivos netcdf4/hdf5 são armazenados em pedaços e retornados em páginas, de modo que o tamanho relativo de cada um deles pode realmente afetar a velocidade de acesso quando o acesso é de uma loja de objetos, e que, por padrão, os metadados sobre o arquivo são espalhados por todo o arquivo, de modo que obter os metadados pode levar várias solicitações. O ponto principal do papel é que o tamanho da página padrão para arquivos netcdf4/hdf5 é 4096 bytes (4KB) - Não. (que é terrível para a nuvem&#33;) uma vez que o tamanho dos metadados é provavelmente maior do que isso e mais do que provável seus tamanhos de pedaços também são maiores do que isso. Então um extrato vai exigir um monte de ida e volta que é lento. O que você quer fazer é reembalar o arquivo de modo que todos os metadados estão no “top” do arquivo, e que o tamanho da página é pelo menos tão grande quanto o tamanho dos metadados mais o tamanho de um pedaço. Também por padrão o tamanho da página não é fixo, mas usa uma estratégia que varia. O que o papel encontrado está usando um tamanho fixo da página produziu melhores resultados.

Então, como posso determinar o tamanho dos metadados do arquivo?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

E como posso determinar o tamanho do pedaço:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

ou

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

E como posso determinar a estratégia de dimensionamento da página:

> h5stat yourfile.nc | grep "File space management strategy"
>

Provavelmente este comando retornará “H5F_FSPACE_STRATEGY_FSM_AGGR” que é a estratégia padrão e o que queremos que ele retorne é “H5F_FSPACE_STRATEGY_PAGE”

Como posso reembalar meu arquivo netcdf para que todos os metadados estejam na frente, e alterar a estratégia para que um tamanho de página fixa seja usado, e que tamanho de página usar? Regras do polegar que encontrei são:

Seleção do tamanho da página:
• Deve ser ≥ tamanho total de metadados de arquivo (crítico&#33;) 
• Deve ser potência de 2 (4MB, 8MB, 16MB, etc.) 
• Não fique louco grande - 32MB é geralmente o máximo prático
• Considere tamanhos de pedaços - tamanho da página deve acomodar maiores pedaços

Como dito acima, idealmente o tamanho deve ser maior do que o tamanho dos metadados mais o tamanho de um pedaço. O que o estudo descobriu é que para muitos conjuntos de dados o tamanho da página 8MB é um bom tradeoff, é provavelmente maior do que o tamanho dos metadados + tamanho do pedaço, e não puxa muito mais dados do que você precisa. Para realizar isso:

h5repack -S PAGE -G 8388608 seu arquivo .nc seu arquivo_optimized .nc 

Aqui estão os valores para usar para obter diferentes tamanhos de página:

4194304 (4MB) 
8388608 (8MB) 
1672 1616 1616 1616 (16MB) 
335544 (32MB) 

B. Existem benefícios se usar arquivos localmente também?

O papel e outras coisas que eu encontrei sugerem que mesmo localmente pode haver um ganho de velocidade em qualquer lugar de 10%-30%. Em meu qualquer coisa, mas testes exaustivos eu encontrei ganhos de velocidade de cerca de 10% quando os pedidos são relativamente pequenos em comparação com o tamanho geral do arquivo, e o aumento de velocidade diminui à medida que o pedido fica maior, mas eu nunca achei que fosse mais lento.

C. TANSTAAFL

Mas há muita coisa em algum lugar, isto parece um almoço gratuito. E a captura é que o tamanho da página fixa aumenta o tamanho do arquivo. Para alguns dos casos eu tentei:

617M .nc 
632M mur1_optimized .nc 
608M mur2 .nc 
616M mur2_optimized .nc 
29M chla1 .nc 
40M chla1_optimized .nc 
30M chla2 .nc 
40M chla2_optimized .nc 

Então o tradeoff é há um aumento não insignificante no tamanho do arquivo.

D. Mas se eu tiver que reprocessar os arquivos...?

Uma boa pergunta é se eu tenho que escrever um script para reprocessar os arquivos, por que não apenas escrever um script para traduzir para um formato como dizer zarr? zarr tem muitos proponentes e se você está interessado em zarr apenas fazer uma busca rápida de patoduckgo e há muitos posts bons, uma visão talvez mais equilibrada está emhttps://www.youtube.com/watch?v=IEAcCmcOdJs  (é interessante que muitos dos pontos que ele levanta são o que o formato icechunk está tentando resolver) . Então por que você pode não querer traduzir seus arquivos para algo como zarr, Primeiro, se você criar arquivos netcdf regularmente, você pode começar a otimizar os arquivos a partir de agora, que com o tempo vai ver ganhos de velocidade e você não terá que reformatar arquivos passados, e ERDDAP™ ainda será capaz de agregar sobre os arquivos, embora algumas das configurações internas diferem. Em segundo lugar, você pode ter um monte de ferramentas que depende de arquivos netcdf, e esta abordagem significaria não ter que recuperar o que poderia ser uma extensa quantidade de código. O ponto é estar ciente de opções e escolher o que funciona melhor para sua situação. Como um lembrete, se você optar por usar arquivos zarr com ERDDAP™ , eles devem ser zarr formato v2 arquivos.

E. Grandes dados - um lado

Grandes dados são falados sobre muito, mas quão grande é os dados que a maioria das pessoas usa e como isso se compara com as capacidades dos laptops modernos (sim laptops, não servidores) . Uma tomada interessante é:

https://www.youtube.com/watch?v=GELhdezYmP0Comece pelo minuto 37 embora toda a conversa é interessante

O estudo que ele menciona é em:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Portanto, há uma porcentagem relativamente pequena de usuários que realmente precisam aumentar o poder, mas a esmagadora maioria dos usuários pode fazer suas análises em um laptop, unidades externas de 26TB estão agora abaixo de $300 e rumores são que as unidades externas 60TB estarão disponíveis até o final do ano. Algo para pensar.

2. Usando ERDDAP™ com o Google Cloud Platform ou outros provedores de nuvem além da AWS
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

No momento ERDDAP™ é conhecido apenas para trabalhar com lojas de objetos AWS (S3) , embora melhorando e generalizando ERDDAP™ ’s object store support is on the todo list (verhttps://github.com/ERDDAP/erddap/issues/158) . Então o que fazer se você é dito que você tem que executar o seu ERDDAP™ no Google Cloud Platform (GCP) ou uma plataforma semelhante? Em primeiro lugar, a maioria das plataformas de nuvem oferecem diferentes níveis de armazenamento, geralmente incluindo uma que é semelhante ao armazenamento local e é reconhecida pelo sistema operacional, uma que está conectada na rede geralmente usando NFS para acesso (novamente diretamente acessível pelo sistema operacional) , e um que é uma loja de objetos. A primeira solução não é usar lojas de objetos, e você seria bom ir. Mas como sempre, TANSTAAFL e a desvantagem neste caso é como você vai da loja de objetos -&gt; NFS access -&gt; local armazenar seus custos também subir. (Eu acrescentaria que o NFS também é acessado através da rede, e tem seus próprios problemas de latência, isso também se beneficiaria da otimização de arquivos) .

Se você tem que usar a loja de objetos, ou só pode pagar uma loja de objetos, a resposta é um sistema de arquivos FUSE (https://github.com/libfuse/libfuse) . No GCP, isso é chamado de gcsfuse, e os passos para instalá-lo são:

• Instalar o gcsfuse na sua imagem GCP Linux:
Sudo apt update
sudo apt instalar gcsfuse
• Autenticar a GCP (se não já autenticado) :
Certifique-se de ter as credenciais certas, normalmente através da conta de serviço ou executando o login do gcloud auth.
• Monte o balde GCS para um diretório local:
Monte seu balde GCS para um diretório local usando gcsfuse. Isso permite que sua instância do GCP acesse os dados como se fizesse parte do sistema de arquivos local.
gcsfuse seu nome do bucket /path/to/mount/directory

E agora sua loja de objetos pode ser acessada como faz parte do sistema de arquivos Linux, assim que vai trabalhar com ERDDAP™ . Isto parece magia, obter o melhor de ambos os mundos, deve haver uma captura. E há. Os sistemas de arquivos FUSE são um bom pouco mais lentos do que acessar a loja de objetos diretamente (basicamente você adicionou outra camada ao acesso) . Em minhas estimativas de pesquisa de quanto mais lento estão em todo o mapa, então eu não tenho ideia de quanto mais lento. Mas se você está em uma situação em que você deve executar no GCP usando lojas de objetos, você tem uma solução para agora que vai trabalhar com ERDDAP™ .

3. O que você pode fazer agora para ajudar.
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Se você tem tempo e capacidade de testar algumas dessas coisas e relatar de volta em seus resultados, isso seria ótimo. Especialmente se você tiver acesso ao GCP ou similar e ver quanto mais lento ERDDAP™ o acesso está usando FUSE (bem, na verdade, você pode testar isso em AWS também) . Se a pena de velocidade não é muito grande, isso seria maravilhoso, porque eu tenho razão para acreditar que algumas pessoas em breve terão que executar a sua ERDDAP™ s no GCP com loja de objetos. Portanto, isso não é apenas uma questão de interesse teórico.
