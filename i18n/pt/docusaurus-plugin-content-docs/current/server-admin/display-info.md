---
sidebar_position: 7
---
#  `exibição de exibição Info` e `Visualização` Tags

## Descrição
Este recurso permite exibir atributos globais de sua escolha na página de conjuntos de dados na `Informação` linha.

## Instruções de uso
Estas tags só podem ser usadas com o `Sax parser` . Para habilitar e usá-los, siga estes passos:

1.  **Habilitar o SAX Parser** :
Adicione a seguinte linha ao seu `setup.xml` arquivo:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Adicionar etiquetas ` datasets.xml ` ** :
No ` datasets.xml ` arquivo, inclua duas tags de nível superior:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportamento padrão** :
   - Se estas tags não forem adicionadas ou deixadas vazias no ` datasets.xml ` arquivo, os valores padrão são aplicados da seguinte forma:
     -  `exibição de exibição Info` : `Resumo, Licenso` 
     -  `Visualização` : `resumo, licença` 

4.  **Garantir a consistência** :
O número de valores separados por vírgula em ambos `exibição de exibição Info` e `Visualização` As etiquetas devem ser as mesmas.

## Como funciona
- O `Visualização` tag especifica atributos globais (definidos dentro do&lt; ` addAttributes ` &gt; tag) a ser exibido para cada conjunto de dados.
- Os valores correspondentes no `exibição de exibição Info` tag são exibidos como rótulos no `Informação` linha da UI.
- Quando o usuário passa sobre as etiquetas exibidas, aparecerá uma dica de ferramenta, mostrando o valor do atributo global.

## Exemplo
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Exemplo de atributos globais de dataset:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Comportamento da UI:
- As palavras `Exibição1` e `Exibição2` será exibido no `Informação` linha na UI.
- Quando pairado, as dicas de ferramentas exibirão os valores de atributos correspondentes:
  -  `Exibição1` : mostra a ponta da ferramenta _This is att1_
  -  `Exibição2` : mostra a ponta da ferramenta _Este é o att2_

## Notas
- Garantir os nomes de atributos especificados no `Visualização` tag corresponder aos atributos globais definidos no conjunto de dados.
- Os atributos incorretos ou ausentes registrarão mensagens de erro.

Seguindo estes passos, você pode personalizar o `Informação` linha na página de conjuntos de dados para exibir atributos globais relevantes com a ponta da ferramenta correspondente.
