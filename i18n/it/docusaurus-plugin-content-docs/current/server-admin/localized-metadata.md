---
sidebar_position: 8
---
# Metadati locali

### Descrizione
Questa funzione consente di includere metadati localizzati sui set di dati e variabili. Qualsiasi attributo definito all'interno di unaddAttributestag può essere localizzato. Questo è destinato ad essere utilizzato per attributi di stringa comuni come titolo, sommario, licenza, istituione. Non è raccomandato per essere utilizzato per numerico (ad esempio "_FillValue") o valori standardizzati (ad esempio "ioos_category") e localizzare questi tipi di valori può avere un comportamento sorprendente.

### Istruzioni d'uso
Per abilitarli e utilizzarli, seguire questi passaggi:

1.  **Aggiungi tag in `datasets.xml#** :
Nel `datasets.xml` file, aggiungere i metadati localizzati nella sezione attributi aggiuntivi:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Comportamento predefinito** :
   - Se non vengono forniti tag xml:lang, le informazioni fornite verranno visualizzate per tutte le lingue. Questo corrisponde al precedente ordine.
   - Se vengono forniti alcuni tag xml:lang, questi valori saranno utilizzati per le richieste in quelle lingue. Se un utente richiede una lingua che non ha un valore xml:lang fornito, il valore dalla lingua predefinita (Inglese) sarà usato.
