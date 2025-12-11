---
sidebar_position: 8
---
# Metadados localizados

### Descrição
Este recurso permite incluir metadados localizados sobre seus conjuntos de dados e variáveis. Qualquer atributo definido dentro de um addAttributes tag pode ser localizada. Isto destina-se a ser usado para atributos de cadeia de caracteres comuns como título, resumo, licença, instituiçãoon. Não é recomendado para ser usado para numérico (por exemplo, "_FillValue") ou valores padronizados (por exemplo, "ioos_category") e localizar esses tipos de valores pode ter comportamento surpreendente.

### Instruções de uso
Para habilitar e usá-los, siga estes passos:

1.  **Adicionar etiquetas ` datasets.xml ` ** :
No ` datasets.xml ` arquivo, adicione seus metadados localizados na seção Adicionar atributos:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Comportamento padrão** :
   - Se não forem fornecidas tags xml:lang, as informações fornecidas serão exibidas para todos os idiomas. Isso corresponde ao comportamento anterior.
   - Se algumas tags xml:lang forem fornecidas, esses valores serão usados para pedidos nesses idiomas. Se um usuário solicitar uma linguagem que não tenha um valor xml:lang fornecido, o valor do idioma padrão (Inglês) será usado.
