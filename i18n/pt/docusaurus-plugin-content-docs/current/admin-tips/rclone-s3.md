Este conteúdo é baseado em um [mensagem de Roy Mendelssohn para o ERDDAP grupo de usuários](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Recentemente, temos recebido uma série de inquéritos que procuram ajuda com o acesso de arquivos no AWS S3 em ERDDAP™ . Primeiro, ERDDAP™ versão 2.29 terá melhorado o acesso S3 que deve trabalhar com lojas de objetos não-AWS também. (Obrigado Seth&#33;) . Mas já mencionei anteriormente sobre usar um sistema baseado em FUSE para fazer a loja S3 aparecer como um sistema de arquivos em seu servidor ou VM.

Uma maneira de fazer isso é usar “rclone”. (https://rclone.org/) . rclone funciona em muitos sistemas S3 diferentes, e tem muitas configurações diferentes para otimizar o desempenho, incluindo a configuração de um tamanho de cache, que espero poder compensar parte da penalidade de velocidade de executar FUSE. A vantagem de usar rclone com ERDDAP TM é que o rclone lida com toda a interação com S3, então tipos de conjuntos de dados como EDDGrid FromNcFiles pode ser usado diretamente como se houvesse arquivos locais. Isso significa que você só precisa descobrir como configurar o rclone para acessar sua loja de objetos, e o resto é apenas configurações normais do tipo Linux.

Agora eu seria remisso se eu simplesmente deixasse isso, e não desse um exemplo. No seguinte, vou montar anonimamente o NOAA Dados Goes17 que estão em uma loja pública acessível AWS S3 em um de nossos servidores Ubuntu, Na configuração inicial o processo de rclone será executado no primeiro plano para tornar mais fácil para testar que tudo está funcionando, e então vou discutir como transformar ii em um serviço em execução no fundo. Note que no que está abaixo, o cache é definido para 1GB. O desempenho pode bem ser melhorado, tornando o cache muito maior, diga 5GB-10GB ou ainda maior. Também as configurações são meus palpites no que pode otimizar o desempenho, mas pode não ser o ideal para ERDDAP™ .


1. Instale o software necessário:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Sudo apt update
sudo apt install rclone fuse3 - Sim.

2. Criar um remoto S3 anónimo
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone config create go17 s3 \\
fornecedor AWS \\
região us-east-1 \\
location_constraint us-east-1 \\
inv_auth false \\
anônimo verdadeiro

3. Teste isso.
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone lsd vai17:noaa-goes17 | cabeça

4. Criar um ponto de montagem para os dados
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

sudo mkdir -p /mnt/goes17
sudo chown $USER: $USER /mnt/goes17

5. Monte os dados. (Note que este processo é executado no primeiro plano, então ele vai mostrar alguma saída e sentar lá) 
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone -vv montagem vai17:noaa-goes17 /mnt/goes17 \\
- somente leitura \\
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

6. Abra uma nova guia no servidor e verifique
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Is /mnt/goes17 | cabeça

7. Verifique se os dados podem ser acessados
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
Não. - Não. OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
O resultado foi retornado surpreendentemente rapidamente, particularmente porque nossa instalação não tem o tubo mais rápido do mundo.

8. Faça um serviço de sistema (modificar conforme apropriado para o usuário etc) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

A. Criar uma unidade systemd:

sudo nano /etc/systemd/system/rclone-goes17.service

E entrar:

[Unit]
Descrição = Montagem de pano para GOES17 público S3
After=network-online .tar Vamos.

[Serviço]
Tipo: simples
User=ubuntu
ExecStart=/usr/bin/rclone mount goes17:noa-goes17 /mnt/goes17 \\
- somente leitura \\
--vfs-cache-modo completo \\
--vfs-cache-max-tamanho 1G \\
--vfs-cache-poll-interval 1m \\
- Vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
- Vfs-read-ahead 256M \\
- tamanho do buffer 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Reiniciar sempre
Revisão: 10

[Instalar]
QueredBy=multi-usuário .tar Vamos.

B. Habilite o serviço e comece:

sudo systemctl daemon-reload
sudo systemctl enable - agora rclone-goes17

C. Teste de teste

sistemactl status rclone-goes17
Is /mnt/goes17 | cabeça



Espero que isto seja útil para as pessoas. Nós testamos usando o gcsfuse na plataforma Google Cloud com um balde que tem espaço hierárquico com algum sucesso. Uma vantagem de rclone (além disso, não é específico do fornecedor) é que ele tem mais configurações para otimizar o desempenho. Especialmente se você estiver movendo um local ERDDAP™ para a nuvem, isso pode fazer a transição quase perfeita.
