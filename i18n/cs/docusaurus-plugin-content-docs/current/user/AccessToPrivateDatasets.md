---
title: "Access to Private Datasets"
---
# Přístup k privátním datům v ERDDAP™ 

Mnoho ERDDAP™ instalace nemají autentizaci povolenou, a proto nemají pro uživatele žádný způsob, jak se přihlásit, ani nemají žádné soukromé soubory dat.

Některé ERDDAP™ instalace mají povolenou autentizaci. V současné době, ERDDAP™ podporuje autentizaci pouze prostřednictvím e-mailových účtů spravovaných společností Google, které zahrnují e-mailové účty na NOAA a mnoho univerzit. Pokud ERDDAP™ má autentizaci povolenou, každý, kdo má e-mailový účet vedený společností Google, se může přihlásit, ale bude mít přístup pouze k soukromým souborům údajů, které ERDDAP™ Správce jim výslovně povolil přístup.

## Aktualizované pokyny{#updated-instructions} 

Některé z níže uvedených informací jsou zastaralé. Až do této aktualizace můžete použít [tento blog post](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) pro nedávné kroky k získání dat ze soukromého datového souboru se skripty.

## Lidé s prohlížeči{#humans-with-browsers} 

Uživatelé ERDDAP™ může se přihlásit ERDDAP™ v prohlížeči za účelem získání přístupu k soukromým souborům dat, ke kterým mají oprávnění.

Pro přihlášení:

1. Klikněte na přihlašovací odkaz v levé horní části ERDDAP™ webové stránky.
Pokud není žádný záznam v odkazu, ERDDAP™ instalace nemá zapnutou autentizaci a neexistují žádné soukromé soubory dat.
     
2. Kliknutím na tlačítko Přihlásit se můžete přihlásit do účtu Google.
Text tlačítka by měl být přepnut na "Podepsán."
     
3. Klikněte na záznam do ERDDAP knoflík.
Webová stránka by měla změnit název Jste přihlášeni jako *Vaše EmailAdresa* .
Pokud ne, počkejte 5 sekund a klikněte na záznam do ERDDAP Zase knoflík.
V extrémních případech možná budete muset počkat a několikrát to zkusit znovu.
     
4. Nepoužívej zadní tlačítko prohlížeče. Použijte " ERDDAP " odkaz v horní části výše, pak použijte jiné odkazy přejít na ERDDAP™ stránky, které vás zajímají. Pokud cached webová stránka říká, že nejste přihlášeni, znovu načíst stránku.
     

## Skripty{#scripts} 

 \\[ To je mírně upraveno z informací poskytnutých Lynn DeWittovou, která odvedla těžkou práci při řešení tohoto problému. Lynn, díky moc&#33;
Pokud máte opravy nebo návrhy, prosím email erd.data @ noaa.gov . \\] 

Je také možné se přihlásit do ERDDAP™ a přístup k soukromým souborům prostřednictvím skriptu. Zde je příklad, který používá curl :

1. Tyto instrukce předpokládají, že používáte Gmail adresu, kde není zapnuta dvoufaktorová autentizace. Pokud má vaše hlavní gmailová adresa zapnutou autentizaci 2-faktor, zvažte vytvoření další gmailové adresy s vypnutou autentizací 2-faktorů.
     
2. Přihlásit se ERDDAP™ ručně s gmailovou adresou, kterou chcete použít ve vašem skriptu a přijmout veškerá potřebná povolení, pak se zcela odhlásit zpět.
     
3. Otevřete nástroj vývojáře prohlížeče a přejděte na kartu Network.
     
4. Klikněte na ERDDAP™ "log in" odkaz, pak tlačítko "Přihlásit" a vyberte vhodnou e-mailovou adresu, pokud je vyzván.
     
5. Poté, co se tlačítko "Přihlásit" změní na "Signed in," záložka Developer Tools Network zobrazí dvě položky, které vypadají jako následující (příklad z Firefoxu) :
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Pomocí myši pravým tlačítkem kontextové menu "kopírovat jako CURL" oba tyto URL a vložte je do textového editoru
     
6. Klikněte na "Připojit do ERDDAP " tlačítko a "kopírovat jako CURL" odkaz, který vypadá jako:
```
    login.html  
```
a vložte to třetí. curl Příkaz do textového souboru.
     
7. V textovém souboru budete mít nyní 3 řádky, jako jsou následující, kde jste se přihlásili do ERDDAP™ server v ' *https://host.somewhere.com/erddap* '. První curl příkaz získá váš uživatelský profil v "login\\_hint" a vytvoří "id\\_token." Druhý používá id\\_token pro přihlášení do Google, a třetí pak přihlásí do ERDDAP .
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. Výše uvedené 3 řádky, když běží postupně z příkazového řádku, se přihlásí do ERDDAP . Abyste je mohli použít ve skriptu, musíte zachytit id\\_token z prvního řádku, hodit je do druhého řádku a napsat cookie, které budou čteny následujícími řádky.
     
9. Chcete-li vytvořit scénář, spusťte první ('https://accounts.google.com)   curl linka přesně tak, jak byla zkopírována z nástrojů vývojáře, a zachytit odpověď (můžete dostat curl chyba o vlajce " - 2.0" jen odstranit) . V php to vypadá jako následující:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Přihlásit se do Google provedením druhého řádku pomocí $id\\_token, nejprve odstranit parametr "-H 'Cookie: stuff'" a místo toho říct curl napsat cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Přihlásit se ERDDAP™ , opět odstranit parametr "-H 'Cookie: stuff'" a pomocí předchozího písemného souboru cookie:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Nyní byste měli mít možnost požadovat data ze serveru pomocí stejného souboru cookie:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
