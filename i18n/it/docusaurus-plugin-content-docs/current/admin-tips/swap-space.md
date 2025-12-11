Questo contenuto si basa su un [messaggio da Roy Mendelssohn a ERDDAP utenti di gruppo](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Molte delle richieste di aiuto che otteniamo comportano problemi con l'uso della memoria in ERDDAP™ . Alcuni di questi provengono da cambiamenti nella gestione della memoria in Java , e anche le interazioni con la gestione della memoria di Linux OS. Iniziare credo in Java 17. Java utilizza più memoria di quello che viene messo giù nelle impostazioni del mucchio. È possibile vedere questo se si guarda le impostazioni del mucchio e quindi utilizzare comandi come top, htop o btop per controllare l'utilizzo della memoria delle applicazioni. Per esempio, il nostro pesante utilizzo ERDDAP™ ha spazio mucchio impostato a 21GB, ma in realtà l'uso della memoria può funzionare a 28GB-30GB, a volte più alto. Questo valore può puntare se ci sono un sacco di grandi richieste simultanee al sistema.

Nella maggior parte dei sistemi Linux, una volta che l'utilizzo della memoria supera circa il 50%, il sistema operativo inizierà a spazzare via la memoria. Inoltre, per la maggior parte dei sistemi swap spazio non è spazzatura raccolta fino a quando assolutamente necessario, che per ERDDAP™ è troppo tardi, e può causare ERDDAP™ per congelare. E lo spazio di swap è lento, che per grande datasets.xml può causare importanti aggiornamenti non completare, che poi mescolare i problemi.

Cosa puoi fare? In primo luogo, scoprire il vero uso della memoria o il sistema, e avere abbastanza RAM in modo che l'uso della memoria non superi il 50%. Ma ci sono anche due impostazioni che possono cambiare questo comportamento, vm.swappiness. e vm.vfs_cache_pressure.

vm.swappiness controlla come aggressivo il kernel Linux utilizza lo spazio swap. Puoi controllare il suo valore attuale con:

> cat /proc/sys/vm/swappiness
>
• Di solito 60 (su scala da 0 a 100) .
• I valori più bassi rendono il sistema meno probabile che si scambia.
• Un valore di 10 o 1 è spesso utilizzato per sistemi con un sacco di RAM.


Per cambiare il valore fino al riavvio, dire a 10:

> sudo sysctl vm.swappiness=10
>

E cambiare permanentemente:

> sudo nano /etc/sysctl.conf
>

E modificare il valore per vm.swappiness. Quindi applicare il cambiamento:

> sudo sysctl -p
>

vm.vfs_cache_pressure. dice al sistema quanto aggressivo essere nel recupero della memoria. Valori più elevati. (100 o più) dire al sistema di essere più aggressivo, per controllare il valore attuale:

> cat /proc/sys/vm/vfs_cache_pressure
>

Per cambiare il valore fino al prossimo riavvio:

> sudo sysctl vm.vfs_cache_pressure=150
>

Per cambiare il valore in modo permanente:

> sudo nano /etc/sysctl.conf
>

E poi aggiungere o aggiornare la linea:

> vm.vfs_cache_pressure = 100
>

E poi applicare il cambiamento:

> sudo sysctl -p
>


Cosa puoi fare se monitori l'utilizzo dello spazio swap e noti che l'utilizzo di swap sta cominciando ad aumentare? C'è un comando che svuota lo spazio di swap e sposta il contenuto in memoria. Prima di utilizzare questo, è necessario assicurarsi che la memoria disponibile è più grande di utilizzo swap. Dico la memoria disponibile perché in sistemi Linux con uso disco pesante “memoria incaviata” può essere abbastanza alto, quindi “memoria libera” mostrerà come essere molto basso, ma “memoria cache” sarà reso disponibile se necessario per comandi come questo.

> sudo swapoff -a && sudo swapon -a
>

Solo per essere sicuro Mi piace forzare la raccolta di rifiuti anche dopo aver fatto questo:

> sudo jcmd $(pgrep java) GC.run
>

Ancora una volta spero che alcune persone trovino queste informazioni utili. Vogliamo fare ERDDAP™ il più robusto possibile, e lavorare il più senza soluzione di continuità possibile con come la gente realmente funziona.
