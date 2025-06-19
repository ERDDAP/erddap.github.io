---
sidebar_position: 7
---
# `displayInfo` e `displayAttribute` Tags

## Descrizione
Questa funzione consente di visualizzare gli attributi globali di vostra scelta nella pagina dei set di dati nella riga `Information`.

## Istruzioni d'uso
Questi tag possono essere utilizzati solo con il `Sax parser`. Per abilitarli e utilizzarli, seguire questi passaggi:

1.  **Abilitare il SAX Parser** :
Aggiungi la seguente riga al file `setup.xml`:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Aggiungi tag in `datasets.xml#** :
Nel `datasets.xml` file, includere due tag di primo livello:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportamento predefinito** :
   - Se questi tag non vengono aggiunti o lasciati vuoti nel `datasets.xml` file, i valori predefiniti vengono applicati come segue:
     - `displayInfo`: "Summary, License #
     - `displayAttributi`: `sommario, licenza #

4.  **Assicurare la coerenza** :
Il numero di valori separati da virgola in entrambi i tag `displayInfo` e `displayAttribute` deve essere lo stesso.

## Come funziona
- Il tag `displayAttribute` specifica gli attributi globali (definiti all'interno del&lt;#addAttributes`&gt; tag) da visualizzare per ogni dataset.
- I valori corrispondenti nel tag `displayInfo` vengono visualizzati come etichette nella riga `Information` dell'interfaccia utente.
- Quando l'utente supera le etichette visualizzate, apparirà un tooltip, mostrando il valore dell'attributo globale.

## Esempio
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Attributi globali Esempio:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### UI Behavior:
- Le parole `Display1` e `Display2` saranno visualizzate nella riga `Information` sull'interfaccia utente.
- Quando hovered, i tooltips visualizzeranno i valori di attributo corrispondenti:
  - `Display1`: mostra Tooltip _ Questo è att1_
  - `Display2`: mostra Tooltip _ Questo è att2_

## Note
- Assicurare i nomi degli attributi specificati nel tag `displayAttribute` corrispondono agli attributi globali definiti nel dataset.
- Gli attributi non corretti o mancanti registrano i messaggi di errore.

Seguendo questi passaggi, è possibile personalizzare la riga `Information` nella pagina dei set di dati per visualizzare gli attributi globali rilevanti con i corrispondenti tooltips.
