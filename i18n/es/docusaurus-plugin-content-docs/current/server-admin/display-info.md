---
sidebar_position: 7
---
#  `pantalla Info` y `displayAttribute` Etiquetas

## Descripción
Esta función le permite mostrar atributos globales de su elección en la página de conjuntos de datos en la `Información` fila.

## Instrucciones de uso
Estas etiquetas sólo se pueden utilizar con las `Sax parser` . Para habilitarlos y utilizarlos, siga estos pasos:

1.  **Activar el parser SAX** :
Añadir la siguiente línea a tu `setup.xml` archivo:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Añadir etiquetas en ` datasets.xml ` ** :
En el ` datasets.xml ` archivo, incluye dos etiquetas de primer nivel:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Comportamiento predeterminado** :
   - Si estas etiquetas no se agregan o quedan vacías en el ` datasets.xml ` archivo, los valores predeterminados se aplican de la siguiente manera:
     -  `pantalla Info` : `Summary,License` 
     -  `displayAttribute` : `sumario, licenciado` 

4.  **Garantizar la coherencia** :
El número de valores separados por coma en ambos `pantalla Info` y `displayAttribute` las etiquetas deben ser las mismas.

## Cómo funciona
- El `displayAttribute` tag especifica atributos globales (definidos dentro del&lt; ` addAttributes ` &gt; tag) que se mostrará para cada conjunto de datos.
- Los valores correspondientes en `pantalla Info` etiqueta se muestran como etiquetas en el `Información` fila de la UI.
- Cuando el usuario salta sobre las etiquetas mostradas, aparecerá una punta de herramienta, mostrando el valor del atributo global.

## Ejemplo
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributes Ejemplo:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Comportamiento UI:
- Las palabras `Pantalla1` y `Mostrar2` se mostrará en el `Información` fila en la UI.
- Cuando se hovered, las puntas de herramientas mostrarán los valores de atributo correspondientes:
  -  `Pantalla1` : La punta de la herramienta muestra _This is att1_
  -  `Mostrar2` : La punta de la herramienta muestra _This is att2_

## Notas
- Asegurar los nombres de los atributos especificados en el `displayAttribute` tag coincide con los atributos globales definidos en el conjunto de datos.
- Atributos incorrectos o faltantes registrarán mensajes de error.

Al seguir estos pasos, puede personalizar el `Información` fila en la página de conjuntos de datos para mostrar los atributos globales relevantes con el correspondiente punta de herramienta.
