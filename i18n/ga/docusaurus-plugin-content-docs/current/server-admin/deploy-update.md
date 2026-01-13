---
sidebar_position: 2
---
# Tuilleadh eolais
Conas a dhéanamh Nuashonrú de atá ann cheana ERDDAP™ ar do Freastalaí

## Amharc ar gach eolas{#changes} 
1. Déan na hathruithe atá liostaithe in [Amharc ar gach eolas](/changes) sa roinn dar teideal "Things ERDDAP™ Riarthóirí An riachtanas is gá a fhios agus a dhéanamh" do gach ceann de na ERDDAP™ leaganacha ó na leagan a bhí tú ag baint úsáide as.
     
##  Java  {#java} 
2. Má tá tú ag uasghrádú ó ERDDAP™ leagan 2.18 nó thíos, ní mór duit a athrú go Java 25 - 25 (nó newer) agus Tomcat 10. Féach an rialta ERDDAP™ treoracha a shuiteáil [ Java ](/docs/server-admin/deploy-install#java) agus [cliceáil grianghraf a mhéadú](/docs/server-admin/deploy-install#tomcat) . Beidh ort freisin a chóipeáil do _tomcat_/content/erddap eolaire ó do shuiteáil Tomcat d'aois le do shuiteáil Tomcat nua.

## Íoslódáil{#download} 
3. Íoslódáil [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) isteach _ síos / iarratais.
     (leagan 2.29.0, 706,788,135 bytes, MD5 = A5ED0DCC8D46CA27640FFEB8CE4A8560, dar dáta 12-15-2025) 
     
## teachtaireachtaí.xml{#messagesxml} 
4. 
    * Coiteann: Má tá tú ag uasghrádú ó ERDDAP™ leagan 1.46 (nó os a chionn) agus a úsáideann tú ach na teachtaireachtaí caighdeánacha, beidh na teachtaireachtaí caighdeánacha nua a shuiteáil go huathoibríoch (i measc na. comhaid ranga trí erddap. cogadh cogadh cogadh) .
         
    * Uathúla: Má tá tú ag uasghrádú ó ERDDAP™ leagan 1.44 (nó thíos) ,
tú MUST scriosadh an comhad teachtaireachtaí d'aois.xml:
         _tomcat_/content/erddap / téamaí.xml .
Beidh na teachtaireachtaí caighdeánacha nua a shuiteáil go huathoibríoch (i measc na. comhaid ranga trí erddap. cogadh cogadh cogadh) .
         
    * Uathúla: Má dhéanann tú i gcónaí athruithe ar an comhad teachtaireachtaí caighdeánach.xml (i bhfeidhm) ,
is gá duit a dhéanamh ar na hathruithe ar an comhad teachtaireachtaí nua.xml (a bhfuil
WEB-INF / Ranganna/gov/noaaa/pfel / erddap / util/messages.xml tar éis erddap.war Tá decompressed ag Tomcat).
         
    * Uathúla: Má tá tú a choimeád ar bun comhad teachtaireachtaí saincheaptha.xml i _tomcat_/content/erddap /,
ní mór duit a figiúr amach (trí diff) cad iad na hathruithe a rinneadh leis na teachtaireachtaí réamhshocraithe.xml (atá sa erddap nua. cogadh mar
WEB-INF / ranganna/gov/noaaa/pfel / erddap / util/messages.xml) agus a mhodhnú do teachtaireachtaí saincheaptha.xml comhad dá réir.
         
## Suiteáil{#install} 
5. Suiteáil an nua ERDDAP™ i Tomcat:
\\* Ná bain úsáid as Bainisteoir Tomcat. Go gairid nó ina dhiaidh sin beidh saincheisteanna cuimhne PermGen. Tá sé níos fearr a múchadh iarbhír agus tosaithe Tomcat.
\\ * Athraigh tagairtí do _tomcat_ thíos leis an eolaire Tomcat iarbhír ar do ríomhaire.
     
### Linux agus Macs{#linux-and-macs} 
1. Cur síos achomair: Ó líne ordú, a úsáid: _tomcat_/bin / shutdown.sh
Agus úsáid ps -ef | tomcat grep a fheiceáil má tá/nuair a stopadh an próiseas. (Féadfaidh sé nóiméad nó dhó a ghlacadh.) 
2. Bain an decompressed ERDDAP™ a shuiteáil: I _tomcat_/webapps, úsáid
Seirbhís do Chustaiméirí
3. Scrios an erddap d'aois. comhad cogadh: I _tomcat_ / iarratais, úsáid a bhaint as r erddap. cogadh cogadh cogadh
4. Cóipeáil an erddap nua. comhad cogadh ón eolaire sealadach go _tomcat_/webapps
5. Atosaigh Tomcat agus ERDDAP : úsáid _tomcat_/bin/startup.sh
6. Féach ar an roghchlár ERDDAP™ i do bhrabhsálaí a sheiceáil gur éirigh leis an atosú.
     (Go minic, caithfidh tú iarracht cúpla uair agus fanacht nóiméad sula bhfeiceann tú ERDDAP™ .)   
             
### Windows Windows Windows{#windows} 
1. Cur síos achomair: Ó líne ordú, úsáid: _tomcat_\\bin\\ shutdown.bat 
2. Bain an decompressed ERDDAP™ a shuiteáil: I _tomcat_/webapps, úsáid
Seirbhís do Chustaiméirí
3. Scrios an erddap d'aois. comhad cogadh: I _ tomcat_\\mobapps, úsáid a bhaint as erddap. cogadh cogadh cogadh
4. Cóipeáil an erddap nua. comhad cogadh ón eolaire sealadach go _tomcat_\\webapps
5. Atosaigh Tomcat agus ERDDAP : úsáid a bhaint as _tom_\\bin\tosú.bat
6. Féach ar an roghchlár ERDDAP™ i do bhrabhsálaí a sheiceáil gur éirigh leis an atosú.
     (Go minic, caithfidh tú iarracht cúpla uair agus fanacht nóiméad sula bhfeiceann tú ERDDAP™ .) 

Trioblóidí thabhairt cothrom le dáta ERDDAP ? Féach ar ár [alt ar thacaíocht bhreise a fháil](/docs/intro#support) .
