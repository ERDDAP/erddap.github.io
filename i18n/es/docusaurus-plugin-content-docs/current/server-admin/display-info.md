---
title: "displayInfo and displayAttribute"
sidebar_position: 7
---
## `displayInfo` y `displayAttribute` Etiquetas

### Descripción
Esta característica le permite mostrar atributos globales de su elección en la página de conjuntos de datos en la fila `Information`.

### Instrucciones de uso
Estas etiquetas sólo se pueden utilizar con el `Sax parser`. Para habilitarlos y utilizarlos, siga estos pasos:

1.  **Activar el parser SAX** :
Añada la siguiente línea a su archivo `setup.xml`:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Agregar etiquetas en `datasets.xml`** :
En eldatasets.xml` file, include two top-level tags:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportamiento predeterminado** :
   - Si estas etiquetas no se añaden o se quedan vacías en el `datasets.xml` archivo, los valores predeterminados se aplican de la siguiente manera:
     - `displayInfo`: `Summary,License `
     - `displayAttribute`: `summary,license `

4.  **Garantizar la coherencia** :
El número de valores separados por coma en las etiquetas `displayInfo` y `displayAttribute` debe ser el mismo.

### Cómo funciona
- La etiqueta 'displayAttribute' especifica atributos globales (definidas en el<addAttributes>etiqueta) que se mostrará para cada conjunto de datos.
- Los valores correspondientes en la etiqueta `displayInfo` se muestran como etiquetas en la fila `Information` de la interfaz de usuario.
- Cuando el usuario salta sobre las etiquetas mostradas, aparecerá una punta de herramienta, mostrando el valor del atributo global.

### Ejemplo
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

#### Dataset Global Attributes Ejemplo:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

#### Comportamiento UI:
- Las palabras `Display1` y `Display2` se mostrarán en la fila `Information` en la interfaz de usuario.
- Cuando se hovered, las puntas de herramientas mostrarán los valores de atributo correspondientes:
  - `Display1`: Muestras de punta de herramientas _This is att1_
  - `Display2`: Espectáculos de herramientas _This is att2_

### Notas
- Asegurar que los nombres de los atributos especificados en la etiqueta `displayAttribute` coincidan con los atributos globales definidos en el conjunto de datos.
- Atributos incorrectos o faltantes registrarán mensajes de error.

Al seguir estos pasos, puede personalizar la fila `Information` en la página de conjuntos de datos para mostrar los atributos globales relevantes con las herramientas correspondientes.
