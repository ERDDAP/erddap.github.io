Este conteúdo é baseado em um [mensagem de Roy Mendelssohn para o ERDDAP grupo de usuários](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Correr ERDDAP™ na nuvem tornou-se um tópico quente. Eu devo notar que ERDDAP™ sempre foi executado na nuvem, na maioria das vezes não em um servidor fornecido por um provedor de nuvem comercial, e o grande impedimento para executar ERDDAP™ em um provedor de nuvem comercial é se você usar armazenamento S3, o que não permite o acesso normal do bloco Linux. Se você está disposto a pagar mais para usar as opções de acesso de bloco fornecidas pelo seu provedor de nuvem comercial, do que correr em um servidor de nuvem comercial é basicamente o mesmo que executar em seu próprio equipamento, exceto, claro, o custo.

Tendo dito que, em 1 de dezembro de 2025 eu escrevi um post “rclone e S3” e este é um seguimento. Nesse e-mail eu montei os jurados GOES17 e verifiquei um arquivo, mas eu não tomei tudo em ERDDAP™ para ver que tudo funciona bem. E sim crianças, você pode tentar isso em casa e você não precisa consultar com um advogado ou conselheiro médico, tudo deve ser seguro. Aqui eu monte a OI NCDC sst avhrr v2.1 que está em AWS, configurá-lo em ERDDAP™ e o mostrar os resultados.

- Passo 1: Defina o ponto final em rclone

rclone config criar oi sst s3 \\
fornecedor AWS \\
região us-east-1 \\
location_constraint us-east-1 \\
inv_auth false \\
anônimo verdadeiro


- Passo 2: Criar um ponto de montagem para o conjunto de dados

sudo mkdir -p /mnt/oi sst 
sudo chown "$USER:$USER" /mnt/oi sst 

- Passo 3: monte o armazenamento S3 para o ponto de montagem

Permissões, permissões, permissões, permissões... (Com desculpas ao Steve Ballmer, se sabes que sabes) ,

O monte deve ser feito para que qualquer usuário executa seu tomcat, geralmente usuário “tomcat”, pode acessar os dados. ‘rclone’ monta o conjunto de dados com proprietário e grupo do usuário que executa o comando de montagem e quer armazenar informações no diretório inicial do usuário (Isso provavelmente é mitigado se você configurá-lo como um processo de nível do sistema - veja abaixo) . Então, se você puder, execute o comando mount como ’tomcat’, mas se como nós, seu tomcat não tem um diretório inicial, você precisa executar o comando mount como um usuário diferente. Para isso, edite o fusível. arquivo conf:

1. sudo vi /etc/fuse.conf

2. Descompactar ou adicionar:

user_allow_other

3. Salvar e sair.


Os dados reais são várias camadas profundas, e eu estou montando no nível de dados, não no nível superior, e estou executando o comando em um terminal tmux para que o comando continue executando:

rclone -vv montagem oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr Não. sst \\
- somente leitura \\
--low-other \\
--vfs-cache-modo completo \\
--vfs-cache-max-tamanho 1G \\
--vfs-cache-poll-interval 1m \\
- Vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
- Vfs-read-ahead 256M \\
- tamanho do buffer 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
- Não há tempo.


- Passo 4: Use GerarDatasets Xml como normal,

Uso EDDGrid FromNcFiles como o tipo de dados, e o diretório é /mnt/oi sst - Não. O passe inicial foi muito bom e trabalhou sem problemas. Eu fiz três alterações no snippet xml que poderia ter sido feito ao executar GenerateDatasets Xml e aqueles foram:

1. Alterado o conjunto de dados para ser oi sst O que foi?

2. O diretório contém uma mistura de arquivos alguns terminando em “ .nc " e outros terminando em "preliminar .nc ” e apenas os primeiros são desejados. Para fazer isso, altere o nome de arquivo regex:

 <fileNameRegex> Oi sst -avhrr-v02r01\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Eu muitas vezes disse que eu acho regex para ser um dos mistérios da vida, e pode haver melhores maneiras de fazer o regex. Mas isto funcionou.

3. O ioos_category não foi definido, eu adicionei esses.

Para o trabalho de produção permanente o snippet xml pode usar um pouco mais de edição para ser mais completo.

- Passo 5: Adicione o snippet xml ao datasets.xml e definir a bandeira

Isso leva muito tempo para carregar no primeiro passe, então vá encontrar outras coisas para fazer para o resto do dia.

O resultado final é:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Agora veja que isso não foi muito doloroso&#33;

Se você jogar com o resultado, note primeiro que as configurações do rclone são um primeiro palpite, e deve ser testado para otimização. Jonathan Sherman do nosso grupo olhou para isto alguns e pode estar falando sobre isso em sua palestra na reunião do IOOS DMAC. Ele também estará cobrindo muito mais tópicos relacionados à configuração no Google Cloud Platform, como orquestrar a configuração do VM, configurando o balde S3 para ter um espaço de nome hierárquico que no GCP é mais rápido e apenas um pouco mais caro, e se você executar scripts de processamento para atualizar os dados servidos pelo GCP ERDDAP™ como configurá-los. Se este tópico lhe interessa, encorajo-o a ouvir a sua conversa. O ERDDAP™ está em funcionamento, apenas não é acessível no momento de fora NMFS rede.

Em segundo lugar, este não é um AWS VM montando um balde AWS S3, este é um dos nossos servidores e nosso tubo nestes dias é totalmente saturado, então você esperaria que a configuração anterior fosse mais rápida do que o que eu fiz (bem nosso tubo não é muito grande - obrigado NMFS - mas estamos saturados - a demanda por dados tem sido fenomenal) .

Finalmente você pode se perguntar - eu quero rolar meu próprio, onde eu começo além disso? Eu encontrei uma coisa LLMs são bons em é informação que é bem conhecida e bem documentada, e as IAs que eu verifiquei (lá vai todos os meus tokens&#33;&#33;) todos sabem rclone e AWS e GCP muito bem, e pode fazer a maioria da configuração para você. Na verdade eu estava procurando um conjunto de dados que seria bom para demo, e uma AI me deu várias sugestões e gerou a maioria do que está acima, embora eu fiz algumas edições para minha própria configuração.

Além disso, lembre-se de Seth escreveu um novo S3 para a versão atual (2.30) de ERDDAP™ - Eu não comparei velocidades, e imagino que dependendo do que você está fazendo cada um terá suas vantagens. Para portar sobre um existente ERDDAP™ instalação, usando rclone pode simplificar o processo.

-Roy.

PS - E lembre-se que o rclone trabalha sobre uma ampla variedade de fornecedores, isso não é restrito à AWS e apenas algumas mudanças nas configurações do “rclone config” são necessárias para um fornecedor diferente.


Faça um serviço de sistema (modificar conforme apropriado para o usuário etc) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

[Unit]
Descrição = Montagem de pano NOAA OISST em AWS
Quer = rede-online .tar Vamos.
After=network-online .tar Vamos.

[Serviço]
Tipo:
Usuário = seu usuário
Grupo = seu Grupo

ExecStart=/usr/bin/rclone mount oi sst :noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr Não. sst \\
- somente leitura \\
--low-other \\
--dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-modo completo \\
--vfs-cache-max-tamanho 1G \\
--vfs-cache-poll-interval 1m \\
- Vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
- Vfs-read-ahead 256M \\
- tamanho do buffer 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
- Não há tempo.

ExecStop=/bin/fusermount - Sim. sst 
Reiniciar = na fábrica
Revisão: 10

[Instalar]
QueredBy=multi-usuário .tar Vamos.
