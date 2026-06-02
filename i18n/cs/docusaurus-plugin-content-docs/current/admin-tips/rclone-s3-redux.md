Tento obsah je založen na [Zpráva od Roye Mendelssohna ERDDAP skupina uživatelů](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Běh ERDDAP™ v cloudu se stal žhavým tématem. Měl bych si všimnout, že ERDDAP™ vždy běží v cloudu, jen většinou ne na serveru poskytovaném komerčním poskytovatelem cloudů, a hlavní překážkou pro provoz ERDDAP™ na komerčním poskytovateli cloud je, pokud používáte S3 úložiště, což neumožňuje normální Linux blokový přístup. Pokud jste ochotni platit více za využití možností přístupu k bloku poskytovaných vaším komerčním poskytovatelem cloudu, než provoz na komerčním cloudovém serveru je v podstatě stejný jako provoz na vlastním zařízení, samozřejmě kromě nákladů.

Poté, co řekl, že dne 1. prosince 2025 jsem napsala post-rclone a S3 a to je následné. V tom e-mailu jsem namontoval GOES17 SWATHES a zkontroloval soubor, ale já jsem nevzal celou cestu do ERDDAP™ vidět, že všechno funguje hladce. A ano děti, můžete to zkusit doma a nemusíte to konzultovat s právníkem nebo lékařským poradcem, mělo by to být bezpečné. Tady namontuji NCDC OI sst avhrr v2.1 který je na AWS, nastavit jej ERDDAP™ a výsledky.

- Krok 1: Definujte cílový parametr v rklonu

rclone config create oi sst s3 \\
poskytovatel AWS \\
region us-east-1 \\
lokace_konstrikt us-east-1 \\
env_auth false \\
anonymní pravda


- Krok 2: Vytvořit bod připojení pro datový soubor

sudo mkdir -p /mnt/oi sst 
Sudo chown "$USER:$USER" /mnt/oi sst 

- Krok 3: Připevněte zásobník S3 na místo připojení

Povolení, povolení, povolení, povolení... (S omluvou Steva Ballera, pokud víte, že víte,) ,

Montáž musí být provedena tak, aby každý uživatel spustí váš tomcat, obvykle uživatel Tomcat, může přístup k údajům. Připojí soubor dat s vlastníkem a skupinou uživatele, který provádí příkaz připojení a chce ukládat informace v domovském adresáři uživatele (To je pravděpodobně zmírnění, pokud jste to nastavili jako proces systémové úrovně - viz níže) . Takže pokud můžete, spusťte příkaz Mount jako Átomcat, ale pokud jako my váš tomcat nemá domovský adresář, musíte provést příkaz připojení jako jiný uživatel. Upravit pojistku. conf soubor:

1. sudo vi /etc/fuse.conf

2. Zrušit komentář nebo přidat:

user_allow_other

3. Uložit a odejít.


Skutečná data jsou několik vrstev hluboká, a já jsem montáž na úrovni dat, ne na nejvyšší úrovni, a provádím příkaz v tmux terminálu, takže příkaz pokračuje v provozu:

rclone -vvv mount oi sst :Noaa-cdr-sea- surface-temp-optimum-i Tálibán-PDs/data/v2.1/avhrr /mnt/oi sst \\
--přečteno pouze \\
--dovolit-ostatní \\
--vfs-cache-mode full \\
--vfs-cache-max velikost 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-bead 256M \\
--buffer velikost 64M \\
-- dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime


- Krok 4: Použít GenerátorDatasety Xml jako normální,

Použití EDDGrid FromNcFiles jako datový typ a adresář je /mnt/oi sst /. První průsmyk byl docela dobrý a pracoval bez problémů. Udělal jsem tři změny xml snippet, které mohly být provedeny při spuštění GenerateDatasets Xml a tyto byly:

1. Změnil soubor dat, aby byl oi sst _rklon

2. Adresář obsahuje mix souborů některých konců v .nc "a další končí v předběžném řízení .nc A pouze ty první jsou žádoucí. Pro to změnit název souboru regex:

 <fileNameRegex> oi sst -avhrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Často jsem říkal, že považuji regex za jednu z záhad života a možná existují lepší způsoby, jak udělat regex. Ale tohle fungovalo.

3. Ta kategorie nebyla nastavena, to jsem přidal.

Pro trvalou výrobní práci xml snippet může použít trochu více editace, aby byla více kompletní.

- Krok 5: Přidejte xml strippet do datasets.xml a nastavit vlajku

To trvá dlouho naložit na první průchod, tak jdi najít jiné věci dělat po zbytek dne.

Konečným výsledkem je:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Vidíte, že to nebylo příliš bolestivé&#33;

Pokud si budete hrát s výsledkem, všimněte si nejprve, že nastavení rclone je první odhad, a měl by být testován pro optimalizaci. Jonathan Sherman z naší skupiny se na to podíval a možná o tom mluvil ve svém proslovu na schůzi IOOS DMAC. Bude také zahrnovat mnohem více témat souvisejících se zřízením Google Cloud Platform, jako je například jak zorganizovat nastavení virtuálního počítače, nastavení kbelíku S3, aby měl hierarchický prostor pro název, který na GCP je rychlejší a jen o něco dražší, a pokud spustíte zpracování skriptů pro aktualizaci dat poskytovaných ERDDAP™ Jak je nastavit. Pokud vás toto téma zajímá, doporučuji vám, abyste si vyslechli jeho řeč. The ERDDAP™ je nahoře a běží, jen to není v současné době přístupné zvenčí NMFS Síť.

Zadruhé, tohle není AWS VM montáž kbelíku AWS S3, tohle je jeden z našich serverů a naše trubka je dnes úplně nasycená, takže byste očekávali, že dřívější nastavení bude rychlejší než to, co jsem udělal já. (No, naše trubka není moc velká - díky NMFS &#33; - ale jsme někdy nasyceni - poptávka po datech byla fenomenální) .

Nakonec si možná říkáte - chci si zabalit vlastní, kde mám kromě toho začít? Zjistila jsem, že LLM jsou dobré informace, které jsou dobře známé a dobře zdokumentované. (To jsou všechny mé žetony&#33;&#33;) všichni znají Rclone a AWS a GCP docela dobře, a mohou udělat většinu nastavení pro vás. Ve skutečnosti jsem hledal soubor, který by bylo dobré demo, a AI mi dal několik návrhů a generoval většinu z toho, co je výše, i když jsem udělal nějaké úpravy pro své vlastní nastavení.

Také, pamatujte, Seth napsal nový S3 pro současnou verzi (2. 30) z ERDDAP™ - Nesrovnal jsem rychlost a myslím, že v závislosti na tom, co děláte, bude mít každý své výhody. Pro přenos nad existující ERDDAP™ instalace, pomocí rclone může zjednodušit proces.

- Royi.

PS - A pamatujte si, že rclone pracuje přes širokou škálu prodejců, to není omezeno na AWS a pouze některé změny v nastavení konfigurace je zapotřebí pro jiného prodejce.


Vytvořit systémovou službu (upravit podle potřeby pro uživatele atd.) :
?

[Jednotka]
Popis=Rclone mount for NOAA OISST na AWS
Wants=network-online .tar get
After=network-online .tar get

[Služba]
Typ=hlásit
Uživatel=yourUser
Group=yourGroup

ExecStart=/usr/bin/rclone mount oi sst :Noaa-cdr-sea- surface-temp-optimum-i Tálibán-PDs/data/v2.1/avhrr /mnt/oi sst \\
--přečteno pouze \\
--dovolit-ostatní \\
--Dir-perms 0755 \\
--file-perms 0644 \\
--vfs-cache-mode full \\
--vfs-cache-max velikost 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-bead 256M \\
--buffer velikost 64M \\
-- dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

ExecStop=/bin/fusermount -z /mnt/oi sst 
Restart=on-failure
RestartSec=10

[Instalovat]
WantedBy=multi-user .tar get
