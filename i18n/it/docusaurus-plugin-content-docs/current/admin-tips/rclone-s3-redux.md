Questo contenuto si basa su un [messaggio da Roy Mendelssohn a ERDDAP utenti di gruppo](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Correre ERDDAP™ nel cloud è diventato un argomento caldo. Dovrei notare che ERDDAP™ ha sempre funzionato nel cloud, solo la maggior parte del tempo non su un server fornito da un provider di cloud commerciale, e l'impedimento principale per l'esecuzione ERDDAP™ su un provider di cloud commerciale è se si utilizza lo storage S3, che non consente un normale accesso al blocco Linux. Se siete disposti a pagare di più per utilizzare le opzioni di accesso a blocchi fornite dal vostro fornitore di cloud commerciale, che l'esecuzione su un server cloud commerciale è fondamentalmente la stessa di eseguire sulla vostra attrezzatura, tranne naturalmente il costo.

Detto questo, il 1 dicembre 2025 ho scritto un post “rclone e S3” e questo è un followup. In quella e-mail ho montato le swathes GOES17 e controllato un file, ma non ho preso tutto il senso in ERDDAP™ vedere che tutto funziona senza intoppi. E sì, ragazzi, si può provare questo a casa e non è necessario consultare un avvocato o un consulente medico, dovrebbe tutto essere sicuro. Qui montare il NCDC OI sst avhrr v2.1 che è su AWS, impostare in ERDDAP™ e mostrare i risultati.

- Passo 1: Definire il punto finale in rclone

rclone config creare oi sst )
fornitore AWS \\
regione us-east-1 \\
posizione_constraint us-east-1 \\
errato.
anonimo vero


- Passo 2: Creare un punto di montaggio per il set di dati

Sudo mkdir -p /mnt/oi sst 
sudo chown "$USER:$USER" /mnt/oi sst 

- Passo 3: montare lo storage S3 al punto di montaggio

Permessi, autorizzazioni, autorizzazioni, autorizzazioni... (Con le scuse a Steve Ballmer, se sai che lo sai) ♪

Il montaggio deve essere fatto in modo che qualsiasi utente esegue il tomcat, di solito utente “tomcat”, può accedere ai dati. ‘rclone’ monta il dataset con il proprietario e il gruppo dell’utente che esegue il comando mount e vuole memorizzare le informazioni nella home directory dell’utente (questo è probabilmente mitigato se si imposta questo come un processo di livello di sistema - vedere di seguito) . Quindi, se è possibile, eseguire il comando mount come ’tomcat’, ma se come noi il tuo tomcat non ha una home directory è necessario eseguire il comando mount come utente diverso. Per farlo modificare il fusibile. conf file:

1. sudo vi /etc/fuse.conf

2. Annulla o aggiungi:

utente_allow_other

3. Salva ed esci.


I dati effettivi sono diversi livelli profondi, e sto montando a livello di dati, non al livello superiore, e sto eseguendo il comando in un terminale tmux in modo che il comando continui a funzionare:

rclone -vv mount oi sst : Noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr / sst .
--read-only \\
--consiglio
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64.
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-size 64M \\
--dir-cache-time 24h \\
--a tempo libero 1s
--no-modtime


- Passo 4: Utilizzare GenerateDatasets Xml come normale,

Uso EDDGrid DaNcFiles come il tipo di dati, e la directory è /mnt/oi sst /. Il passaggio iniziale era abbastanza buono e lavorato senza problemi. Ho fatto tre modifiche al snippet xml che avrebbe potuto essere fatto durante l'esecuzione di GenerateDatasets Xml e quelli erano:

1. Modificato il datasetid per essere oi sst _rclone

2. La directory contiene un mix di file che alcuni terminano in “ .nc " e altri che finiscono in "preliminari .nc “ e solo il primo sono desiderati. Per fare questo cambiare il nome del file regex:

 <fileNameRegex> I sst - V02r01 .nc  </fileNameRegex> 

Ho spesso detto che trovo regex essere uno dei misteri della vita, e ci possono essere modi migliori di fare il regex. Ma questo ha funzionato

3. La ioos_categoria non è stata impostata, ho aggiunto quelle.

Per il lavoro di produzione permanente il cecchino xml può utilizzare un po 'più di editing per essere più completo.

- Passo 5: Aggiungere il xml snippet al datasets.xml e impostare la bandiera

Ci vuole molto tempo per caricare sul primo passaggio, quindi vai a trovare altre cose da fare per il resto della giornata.

Il risultato finale è:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Ora vedi che non era troppo doloroso&#33;

Se si gioca con il risultato, si noti prima che le impostazioni rclone sono una prima ipotesi, e dovrebbe essere testato per l'ottimizzazione. Jonathan Sherman del nostro gruppo ha guardato alcuni di questi e potrebbe parlarne nel suo discorso alla riunione IOOS DMAC. Si occuperà anche di molti altri argomenti relativi all'installazione in Google Cloud Platform, come ad esempio come orchestrare la configurazione della VM, impostare il secchio S3 per avere uno spazio di nome gerarchico che su GCP è più veloce e solo un po 'più costoso, e se si esegue script di elaborazione per aggiornare i dati serviti dal ERDDAP™ come sistemarli. Se questo argomento vi interessa vi incoraggio ad ascoltare la sua conversazione. The ERDDAP™ è in corsa, solo non è accessibile al momento da fuori NMFS rete.

In secondo luogo questo non è un AWS VM che monta un secchio AWS S3, questo è uno dei nostri server e il nostro tubo in questi giorni è totalmente saturato, quindi ti aspetteresti che la configurazione precedente sia più veloce di quello che ho fatto (bene il nostro tubo non è molto grande - grazie NMFS - ma siamo mai saturati - la domanda di dati è stata fenomenale) .

Finalmente vi chiedete: voglio rotolare da solo, da dove comincio oltre a questo? Ho trovato una cosa che LLMs sono buoni a è informazioni che è ben noto e ben documentato, e le AI che ho controllato (ci va tutti i miei gettoni&#33;&#33;) tutti conoscono rclone e AWS e GCP abbastanza bene, e può fare la maggior parte della configurazione per voi. Infatti stavo cercando un set di dati che sarebbe buono da demo, e un AI mi ha dato diversi suggerimenti e generato la maggior parte di quello che Ã ̈ sopra, anche se ho fatto alcune modifiche per la mia configurazione.

Inoltre, ricorda Seth ha scritto una nuova S3 per la versione attuale (2.30) di ERDDAP™ - Non ho paragonato velocità, e immagino che a seconda di quello che state facendo ognuno avrà i suoi vantaggi. Per il trasporto su un esistente ERDDAP™ installazione, utilizzando rclone può semplificare il processo.

-Roy

PS - E ricorda che rclone funziona su una vasta gamma di fornitori, questo non è limitato a AWS e solo alcune modifiche alle impostazioni "rclone config" sono necessarie per un fornitore diverso.


Fare un servizio di sistema (modificare come appropriato per l'utente ecc) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

[Unit]
Descrizione=Rclone mount per NOAA OISST su AWS
Desideri=network-online .tar ♪
Dopo=network-online .tar ♪

[Servizio]
Tipologia
User=yourUser
Gruppo=il tuoGruppo

ExecStart=/usr/bin/rclone mount oi sst : Noaa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr / sst .
--read-only \\
--consiglio
--dir-perms 0755 \\
--file-perm 0644 \\
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64.
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-size 64M \\
--dir-cache-time 24h \\
--a tempo libero 1s
--no-modtime

ExecStop=/bin/fusatore - Uz /mnt/oi sst 
Riavviare
Revisione:

[Install]
WantedBy=multi-user .tar ♪
