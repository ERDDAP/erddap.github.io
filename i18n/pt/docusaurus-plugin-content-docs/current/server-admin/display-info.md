---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `displayInfo` e `displayAttribute` Tags

### Descrição
Este recurso permite que você exiba atributos globais de sua escolha na página de conjuntos de dados na linha `Information`.

### Instruções de uso
Estas tags só podem ser usadas com o `Sax parser`. Para habilitar e usá-los, siga estes passos:

1.  **Habilitar o SAX Parser** :
Adicione a seguinte linha ao seu arquivo `setup.xml`:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Adicionar etiquetas em `datasets.xml"** :
No `datasets.xml` arquivo, inclua duas tags de nível superior:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportamento padrão** :
   - Se estas tags não forem adicionadas ou deixadas vazias no `datasets.xml` arquivo, os valores padrão são aplicados da seguinte forma:
     - `displayInfo`: "Summary, License "
     - `displayAttribute`: `summary,license "

4.  **Garantir a consistência** :
O número de valores separados por vírgula em ambas as tags `displayInfo` e `displayAttribute` deve ser o mesmo.

### Como funciona
- A tag `displayAttribute` especifica atributos globais (definidos dentro do&lt;"addAttributes` &gt; tag) a ser exibido para cada conjunto de dados.
- Os valores correspondentes na tag `displayInfo` são exibidos como rótulos na linha `Information` da interface do usuário.
- Quando o usuário passa sobre as etiquetas exibidas, aparecerá uma dica de ferramenta, mostrando o valor do atributo global.

### Exemplo
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Exemplo de atributos globais de dataset:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Comportamento da UI:
- As palavras `Display1` e `Display2` serão exibidas na linha `Information` na interface do usuário.
- Quando pairado, as dicas de ferramentas exibirão os valores de atributos correspondentes:
  - `Display1`: mostra a ponta da ferramenta _This is att1_
  - `Display2`: mostra a ponta da ferramenta _This is att2_

### Notas
- Certifique-se de que os nomes de atributos especificados na tag `displayAttribute` correspondem aos atributos globais definidos no conjunto de dados.
- Os atributos incorretos ou ausentes registrarão mensagens de erro.

Ao seguir estas etapas, você pode personalizar a linha `Information` na página de conjuntos de dados para exibir atributos globais relevantes com a ponta de ferramenta correspondente.
