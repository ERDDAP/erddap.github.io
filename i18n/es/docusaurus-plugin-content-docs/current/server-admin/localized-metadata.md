---
sidebar_position: 8
---
# Metadatos localizados

### Descripción
Esta función le permite incluir metadatos localizados sobre sus conjuntos de datos y variables. Cualquier atributo definido dentro de unaddAttributesla etiqueta puede ser localizada. Esto se pretende utilizar para atributos comunes de cadena como título, resumen, licencia, instituto. No se recomienda utilizar para numérico (por ejemplo "_FillValue") o valores estandarizados (por ejemplo "ioos_categoría") y localización de estos tipos de valores puede tener comportamiento sorprendente.

### Instrucciones de uso
Para habilitarlos y utilizarlos, siga estos pasos:

1.  **Agregar etiquetas en `datasets.xml`** :
En eldatasets.xml` archivo, agregue sus metadatos localizados en la sección atributos agregados:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Comportamiento predeterminado** :
   - Si no se proporcionan etiquetas xml:lang, se mostrará la información proporcionada para todos los idiomas. Esto coincide con el comportamiento anterior.
   - Si se proporcionan algunas etiquetas xml:lang, esos valores se utilizarán para solicitudes en esos idiomas. Si un usuario solicita un idioma que no tenga un valor xml:lang proporcionado, el valor del idioma predeterminado (Inglés) será usado.
