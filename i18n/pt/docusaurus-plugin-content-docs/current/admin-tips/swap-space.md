Este conteúdo é baseado em um [mensagem de Roy Mendelssohn para o ERDDAP grupo de usuários](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Muitos dos pedidos de ajuda que recebemos envolvem problemas com o uso de memória em ERDDAP™ . Algumas delas vêm de mudanças no gerenciamento de memória Java , e também interações com o gerenciamento de memória Linux OS. Começando eu acredito em Java 17. Java usa mais memória do que o que é colocado no heap configurações. Você pode ver isso se você olhar para suas configurações de heap e, em seguida, usar comandos como topo, htop ou btop para verificar o uso de memória de aplicativos. Então, por exemplo, nosso uso pesado ERDDAP™ tem espaço de pilha definido em 21GB, mas na verdade o uso de memória pode correr para 28GB-30GB, às vezes mais alto. Este valor pode aumentar se houver um monte de pedidos grandes simultâneos para o sistema.

Na maioria dos sistemas Linux, uma vez que o uso da memória fica acima de 50%, o sistema operacional começará a trocar a memória. Além disso, para a maioria dos sistemas de troca de espaço não é lixo coletado até absolutamente necessário, que para ERDDAP™ é tarde demais, e pode causar ERDDAP™ congelar. E o espaço de troca é lento, que para grande datasets.xml pode causar grandes atualizações para não completar, que, em seguida, compor os problemas.

O que você pode fazer sobre isso. Primeiro, descubra o verdadeiro uso de memória ou seu sistema, e tenha RAM suficiente para que o uso de memória não exceda 50%. Mas há também duas configurações que podem mudar esse comportamento, vm.swappiness. e vm.vfs_cache_pressure.

vm.swappiness controla o quão agressivamente o kernel do Linux usa o espaço de swap. Você pode verificar seu valor atual com:

> cat /proc/sys/vm/swappiness
>
• O padrão é geralmente 60 (em uma escala de 0 a 100) .
• Valores mais baixos tornam o sistema menos propenso a swap.
• Um valor de 10 ou 1 é frequentemente usado para sistemas com muita RAM.


Para alterar o valor até reiniciar, diga para 10:

> sudo sysctl vm.swappiness=10
>

E para mudar permanentemente:

> sudo nano /etc/sysctl.conf
>

E edite o valor para vm.swappiness. Então para aplicar a mudança:

> sudo sysctl -p
>

vm.vfs_cache_pressure. diz ao sistema como agressivo para ser em recuperar memória. Valores mais elevados. (100 ou mais) dizer ao sistema para ser mais agressivo, Para verificar o valor atual:

> cat /proc/sys/vm/vfs_cache_pressure
>

Para alterar o valor até a próxima reinicialização:

> sudo sysctl vm.vfs_cache_pressure=150
>

Para alterar o valor permanentemente:

> sudo nano /etc/sysctl.conf
>

E depois adicione ou atualize a linha:

> vm.vfs_cache_pressure = 100
>

E então aplique a mudança:

> sudo sysctl -p
>


O que você pode fazer se você monitorar seu uso de espaço de swap e você notar que o uso de swap está começando a aumentar? Há um comando que esvaziará o espaço de troca e moverá o conteúdo para a memória. Antes de usar isso, você precisa ter certeza de que a memória disponível é maior do que o uso de troca. Eu digo memória disponível porque em sistemas Linux com uso de disco pesado “memória escondida” pode ser bastante alta, então “memória livre” vai mostrar como sendo muito baixa, mas “memória de cache” será disponibilizado se necessário para comandos como este.

> sudo swapoff -a && sudo swapon -a
>

Só para ter a certeza Eu gosto de forçar a coleta de lixo também depois de fazer isso:

> sudo jcmd $(pgrep java) GC.run
>

Mais uma vez espero que algumas pessoas encontrem essa informação útil. Queremos fazer ERDDAP™ tão robusto quanto possível, e trabalhar o mais perfeitamente possível com como as pessoas realmente funcionam.
