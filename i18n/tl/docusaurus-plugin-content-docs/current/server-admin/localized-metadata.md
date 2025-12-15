---
sidebar_position: 8
---
# Lokalisadong Metadata

### Paglalarawan
Ang katangiang ito ay nagpapahintulot sa iyo na isama ang lokalisadong metadata tungkol sa iyong datasets at variables. Anumang katangian na ibinigay sa loob ng isang attribute addAttributes Maaaring gawing lokal ang tag. Ito ay nilalayong gamitin para sa mga karaniwang katangiang strando tulad ng pamagat, buod, lisensiya, instituion. Hindi ito inirerekomendang gamitin para sa numeriko (e.g. "_FillValue".) o pamantayang mga pamantayan (e.g. "ioos_category") at ang paggamit ng ganitong mga uri ng pamantayan ay maaaring may nakapagtatakang paggawi.

### Mga Tagubilin sa Paggamit
Upang magawa at magamit ang mga ito, sundin ang mga hakbang na ito:

1.  **Ilagay ang mga Tag ` datasets.xml ` ** :
Nasa ` datasets.xml ` file, idagdag ang inyong lokalisadong metadata sa karagdagang seksiyon ng mga attribute:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Masaklap na Paggawi** :
   - Kung walang xml: inilalaan ang mga tagong panglang, ididispley ang inilaang impormasyon para sa lahat ng mga wika. Katugma ito ng dating gawi.
   - Kung may inilalaang mga xml: Mga tag ng salang, ang mga pamantayang iyon ay gagamitin para sa mga kahilingan sa mga wikang iyon. Kung ang isang gumagamit ay humiling ng isang wika na walang inilaang xml: halaga nglang, ang halaga mula sa default language (Tagalog) ay gagamitin.
