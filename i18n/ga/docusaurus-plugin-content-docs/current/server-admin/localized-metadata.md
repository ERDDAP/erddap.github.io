---
title: "Localized Metadata"
sidebar_position: 8
---
## Meiteashonraí áitiúla

### Cur síos ar an Táirge
Ceadaíonn an ghné seo duit meiteashonraí áitiúla a chur san áireamh faoi do thacair sonraí agus athróga. Aon tréith a shainmhínítear laistighaddAttributesIs féidir tag a localized. Tá sé seo beartaithe a úsáid le haghaidh tréithe teaghrán coitianta cosúil le teideal, achoimre, ceadúnas, instituion. Ní mholtar é a úsáid le haghaidh uimhriúil (e.g. "_FillValue") nó luachanna caighdeánaithe (e.g. "catagóirioos_") agus d'fhéadfadh go mbeadh iompar iontas ag na cineálacha luachanna seo.

### Úsáid Treoracha
Chun iad a chumasú agus a úsáid, lean na céimeanna seo:

1.  **Cuir Clibeanna i `datasets.xml` .** :
Sa `datasets.xml` comhad, cuir do meiteashonraí áitiúla san alt seo tréithe:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Réamhshocrú Iompar** :
   - Mura bhfuil xml: cuirtear clibeanna ar fáil, cuirfear an fhaisnéis a sholáthraítear ar taispeáint do gach teanga. Is é seo an behavoir roimhe seo.
   - Má tá roinnt xml: clibeanna lang ar fáil, beidh na luachanna a úsáid le haghaidh iarrataí sna teangacha sin. Má iarrann úsáideoir teanga nach bhfuil xml ar fáil: luach teanga, an luach ón teanga réamhshocraithe (Gaeilge agus Béarla) a úsáid.
