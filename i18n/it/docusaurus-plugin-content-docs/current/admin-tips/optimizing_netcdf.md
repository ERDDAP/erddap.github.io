Questo contenuto si basa su un [messaggio da Roy Mendelssohn a ERDDAP utenti di gruppo](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Ottimizzazione dei file netcdf per il cloud
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. riimballaggio e dimensione della pagina

Recentemente nel fare alcune ricerche ho incontrato questo articolo molto interessante:

https://nsidc.github.io/cloud-optimized-icesat2/

Nulla sembra gonfiare passioni come discussioni di linguaggi di programmazione, editori e formati di file, e questo non è una raccomandazione di quale formato (#) si dovrebbe usare, ma piuttosto per capire che cosa è in quella carta e per vedere quanto miglioramento può essere ottenuto ( ERDDAP™ ha sempre cercato di essere agnostico su un sacco di queste questioni, piuttosto scegliendo di provare a lavorare con come le persone effettivamente lavorare con i dati) .

La carta si rivolge principalmente a situazioni in cui i dati vengono memorizzati in un negozio di oggetti come Amazon S3. I negozi di oggetti sono accessibili sulla rete utilizzando http  (#) comandi, quindi rispetto allo storage con una connessione diretta alla (virtuale) server, c'è una latenza molto più lunga in quanto la richiesta deve fare un giro. Per i negozi di oggetti si desidera fare il più poche richieste possibile, ma se basta fare richieste davvero grandi per ridurre il numero di chiamate, si può essere accedendo molto più dati di cui hai bisogno, che può essere altrettanto lento se non più così. Quindi il trucco è quello di raggiungere un equilibrio tra questi due fattori. E anche se l'accesso ai dati sui negozi di oggetti è notevolmente migliorato, così ha accesso a storage direttamente attaccato. Nel ricercare questo alcune stime sono:

Disco locale:
• Tempo di arrivo: 0.1ms
• 6 cerca: 0,6ms (trascurabile) 
• La lettura dei metadati sparsi è veloce
Cloud HTTP:
• Richiesta latenza: 100-200ms
• 6 richieste: 600-1200ms (molto lento&#33;) 
• Ogni richiesta ha tempo di andata e ritorno della rete

La seconda cosa da capire è che i file netcdf4/hdf5 sono memorizzati in blocchi e restituiti in pagine, quindi la dimensione relativa di ciascuno di questi può realmente influenzare la velocità di accesso quando l'accesso è da un negozio di oggetti, e che per impostazione predefinita i metadati sul file sono sparsi in tutto il file, così ottenere i metadati possono richiedere diverse richieste. Il punto principale della carta è che la dimensione della pagina predefinita per i file netcdf4/hdf5 è di 4096 byte (4KB) - No. (che è terribile per il cloud&#33;) Dal momento che la dimensione dei metadati da solo è probabilmente più grande di questo e più che probabile le dimensioni del pezzo sono anche più grandi di questo. Quindi un estratto richiederà un sacco di giri che è lento. Ciò che si desidera fare è rifare il file in modo che tutti i metadati sono al “top” del file, e che la dimensione della pagina è almeno grande come la dimensione dei metadati più la dimensione di un pezzo. Anche per impostazione predefinita la dimensione della pagina non è fissa, ma utilizza una strategia che varia. Ciò che la carta trovata utilizza una dimensione pagina fissa ha prodotto risultati migliori.

Così come posso determinare la dimensione dei metadati del file?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

E come posso determinare la dimensione del pezzo:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

o

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

E come posso determinare la strategia di dimensionamento della pagina:

> h5stat yourfile.nc | grep "File space management strategy"
>

Molto probabilmente questo comando restituirà “H5F_FSPACE_STRATEGY_FSM_AGGR” che è la strategia predefinita e quello che vogliamo che ritorni è “H5F_FSPACE_STRATEGY_PAGE”

Come posso rifare il mio file netcdf in modo che tutti i metadati sono alla parte anteriore, e cambiare la strategia in modo che venga utilizzata una dimensione della pagina fissa e quale dimensione della pagina da usare? Regole di pollice che ho trovato sono:

Selezione formato pagina:
• Deve essere ≥ dimensione totale dei metadati (critico&#33;) 
• Dovrebbe essere potenza di 2 (4MB, 8MB, 16MB, ecc.) 
• Non impazzire grande - 32MB di solito è il massimo pratico
• Considerare dimensioni di pezzi - formato pagina dovrebbe ospitare pezzi più grandi

Come detto sopra, idealmente la dimensione dovrebbe essere maggiore della dimensione dei metadati più la dimensione di un pezzo. Quello che lo studio trovato è che per un sacco di datasets la dimensione della pagina 8MB è un buon tradeoff, è probabilmente più grande della dimensione dei metadati + dimensione del chunk, e non tira molto più dati di quello di cui hai bisogno. Per realizzare questo:

h5repack -S PAGE -G 8388608 il tuo file .nc il tuo file_optimized .nc 

Ecco i valori da utilizzare per ottenere diverse dimensioni della pagina:

4194304 (4 MB) 
8388608 (8 MB) 
16777216 (16 MB) 
33554432 (32MB) 

b. Ci sono vantaggi se si utilizza file localmente anche?

La carta e altre cose che ho trovato suggeriscono che anche localmente ci può essere un guadagno di velocità ovunque dal 10%-30%. Nel mio tutto, ma esaustivi test ho trovato guadagni di velocità di circa il 10% quando le richieste sono relativamente piccole rispetto alla dimensione del file generale, e la velocità aumenta mentre la richiesta diventa più grande, ma non l'ho mai trovato per essere più lento.

C. TANSTAAFL

Ma c'e' molto da fare, sembra un pranzo gratis. E la cattura è che la dimensione della pagina fissa aumenta la dimensione del file. Per alcuni dei casi ho provato:

617M m .nc 
632M mur1_optimized .nc 
608M m2 .nc 
616M mur2_optimized .nc 
29M chla1 .nc 
40M chla1_optimized .nc 
30M chla2 .nc 
40M chla2_optimized .nc 

Così il tradeoff è c'è un aumento non insignificante della dimensione del file.

D. Ma se devo ritrattare i file comunque...?

Una buona domanda è se devo scrivere uno script per rielaborazione dei file, perché non solo scrivere uno script per tradurre in un formato come dire zarr? zarr ha molti sostenitori e se siete interessati a zarr solo fare una rapida ricerca di paperduckgo e ci un sacco di buoni post, una vista forse più equilibrata è ahttps://www.youtube.com/watch?v=IEAcCmcOdJs  (è interessante che molti dei punti che solleva sono ciò che il formato icechunk sta cercando di affrontare) . Quindi, perché non si desidera tradurre i file in qualcosa come zarr, in primo luogo, se si crea file netcdf regolarmente, si potrebbe iniziare a ottimizzare i file da ora in poi, che nel tempo vedrà guadagni di velocità e non dovrete riformattare i file passati, e ERDDAP™ sarà ancora in grado di aggregarsi sui file anche se alcune delle impostazioni interne differiscono. In secondo luogo, si potrebbe avere un sacco di strumenti che dipende dai file netcdf, e questo approccio significa non dover retool ciò che potrebbe essere una grande quantità di codice. Il punto è di essere consapevoli delle opzioni e scegliere ciò che funziona meglio per la vostra situazione. Proprio come un promemoria, se si sceglie di utilizzare i file zarr con ERDDAP™ , devono essere zarr formato v2 file.

E. Big data - un da parte

Big data è parlato molto, ma quanto è grande i dati che la maggior parte delle persone utilizzano e come si confronta con le capacità dei computer portatili moderni (sì laptop, non server) . Una presa interessante è a:

https://www.youtube.com/watch?v=GELhdezYmP0Iniziare intorno al minuto 37 anche se l'intero discorso è interessante

Lo studio che menziona è a:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Quindi ci sono una percentuale relativamente piccola di utenti che hanno davvero bisogno di aumentare la potenza, ma la stragrande maggioranza degli utenti possono fare le loro analisi su un computer portatile, unità esterne 26TB sono ora sotto $300 e voci sono che le unità esterne 60TB saranno disponibili entro la fine dell'anno. Qualcosa a cui pensare.

2. Utilizzo ERDDAP™ con Google Cloud Platform o altri provider cloud oltre AWS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Al momento ERDDAP™ è noto solo per lavorare con AWS oggetti negozi (S3) , pur migliorando e generalizzando ERDDAP™ Il supporto del negozio di oggetti è nella lista di todo (vedihttps://github.com/ERDDAP/erddap/issues/158) . Quindi cosa fare se ti viene detto di dover eseguire il tuo ERDDAP™ su Google Cloud Platform (GCP) o una piattaforma simile? In primo luogo, la maggior parte delle piattaforme cloud offrono diversi livelli di storage, di solito incluso uno simile allo storage locale ed è riconosciuto dal sistema operativo, uno che è collegato sulla rete di solito utilizzando NFS per l'accesso (di nuovo direttamente accessibile dal sistema operativo) , e uno che è un negozio di oggetti. La prima soluzione è non utilizzare oggetti negozi, e si sarebbe bene andare. Ma come sempre, TANSTAAFL e l'inconveniente in questo caso è come si va dal negozio di oggetti -&gt; Accesso NFS -&gt; memorizzare i costi anche salire. (Aggiungo che NFS è anche accessibile sulla rete, e ha i suoi problemi di latenza, questo potrebbe anche beneficiare di ottimizzazione dei file) .

Se si deve utilizzare il negozio di oggetti, o può solo permettersi un negozio di oggetti, la risposta è un file system FUSE (https://github.com/libfuse/libfuse) . Su GCP, questo è chiamato gcsfuse, e i passaggi per installarlo sono:

• Installare gcsfuse sull'immagine GCP Linux:
sudo apt aggiornamento
sudo apt install gcsfuse
• Autentico a GCP (se non già autenticato) :
Assicurarsi di avere le credenziali giuste, in genere attraverso l'account di servizio o eseguendo gcloud auth login.
• Montare il secchio GCS in una directory locale:
Montare il secchio GCS in una directory locale utilizzando gcsfuse. Questo consente all'istanza GCP di accedere ai dati come se fosse parte del filesystem locale.
gcsfuse il tuo nome /percorso/a/montare/directory

E ora il tuo negozio di oggetti può essere accessibile come fa parte del filesystem Linux, quindi funzionerà con ERDDAP™ . Questo sembra magico, ottenere il meglio di entrambi i mondi, ci deve essere una presa. E c'e'. I file system FUSE sono un po' più lenti che accedere direttamente al negozio di oggetti (fondamentalmente hai aggiunto un altro strato all'accesso) . Nella mia ricerca stime di quanto più lento sono su tutta la mappa, quindi non ho idea di quanto più lento. Ma se siete in una situazione in cui è necessario eseguire su GCP utilizzando oggetti negozi, si dispone di una soluzione per ora che funzionerà con ERDDAP™ .

3. Cosa puoi fare ora per aiutare.
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Se hai il tempo e la capacità di testare alcune di queste cose e riportare i risultati, sarebbe fantastico. Soprattutto se hai accesso a GCP o simile e vedi quanto più lento ERDDAP™ l'accesso è usando FUSE (bene in realtà è possibile testare questo su AWS anche) . Se la penalità di velocità non è troppo grande, sarebbe meraviglioso, perché ho motivo di credere che alcune persone dovranno presto eseguire la loro ERDDAP™ s su GCP con negozio di oggetti. Quindi non si tratta solo di interesse teorico.
