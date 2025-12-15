---
sidebar_position: 7
---
#  `display Info` e `displayAttribuzione` Tags

## Descrizione
Questa funzione consente di visualizzare gli attributi globali di vostra scelta nella pagina dei set di dati nella `Informazioni` fila.

## Istruzioni d'uso
Questi tag possono essere utilizzati solo con il `Sax parser` . Per abilitarli e utilizzarli, seguire questi passaggi:

1.  **Abilitare il SAX Parser** :
Aggiungi la seguente riga al tuo `setup.xml` file:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Aggiungi tag in ` datasets.xml ` ** :
Nel ` datasets.xml ` file, includere due tag di primo livello:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportamento predefinito** :
   - Se questi tag non vengono aggiunti o lasciati vuoti nel ` datasets.xml ` file, i valori predefiniti vengono applicati come segue:
     -  `display Info` : `Riassunto,License` 
     -  `displayAttribuzione` : `sommario, licenza` 

4.  **Assicurare la coerenza** :
Il numero di valori separati da virgola in entrambi `display Info` e `displayAttribuzione` i tag devono essere gli stessi.

## Come funziona
- The `displayAttribuzione` tag specifica gli attributi globali (definiti all'interno&lt; ` addAttributes ` &gt; tag) da visualizzare per ogni dataset.
- I valori corrispondenti `display Info` il tag viene visualizzato come etichette nel `Informazioni` fila dell'UI.
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
- Le parole `Visualizzazione 1` e `Visualizzazione` verrà visualizzato nel `Informazioni` fila sull'UI.
- Quando hovered, i tooltips visualizzeranno i valori di attributo corrispondenti:
  -  `Visualizzazione 1` : Spettacoli per utensili _ Questo è att1_
  -  `Visualizzazione` : Spettacoli per utensili _ Questo è att2_

## Note
- Assicurare i nomi degli attributi specificati nel `displayAttribuzione` tag corrispondono agli attributi globali definiti nel dataset.
- Gli attributi non corretti o mancanti registrano i messaggi di errore.

Seguendo questi passaggi, è possibile personalizzare `Informazioni` riga sulla pagina dei set di dati per visualizzare gli attributi globali rilevanti con i corrispondenti tooltips.
