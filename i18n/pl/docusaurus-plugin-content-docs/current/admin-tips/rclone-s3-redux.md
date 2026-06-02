Ta zawartość jest oparta na [wiadomość od Roy Mendelssohn do ERDDAP grupa użytkowników](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Uruchomienie ERDDAP™ w chmurze stał się gorący temat. Powinienem zauważyć, że ERDDAP™ zawsze działa w chmurze, tylko większość czasu nie na serwerze dostarczanym przez operatora chmury komercyjnej, i głównym utrudnieniem dla działania ERDDAP™ na komercyjnym dostawcą chmur jest, jeśli używasz pamięci masowej S3, która nie pozwala na normalny dostęp do bloku Linux. Jeśli jesteś skłonny zapłacić więcej, aby korzystać z opcji dostępu blokowego oferowanych przez operatora chmury komercyjnej, niż działa na komercyjnym serwerze chmur jest w zasadzie taki sam jak działa na własnym sprzęcie, z wyjątkiem oczywiście kosztów.

Mówiąc to, 1 grudnia 2025 roku napisałem post "rclone and S3" i jest to kontynuacja. W tym e-mailu zamontowałem znaczniki GOES17 i sprawdziłem plik, ale nie wziąłem go aż do ERDDAP™ Zobaczyć, że wszystko działa gładko. I tak dzieci, można spróbować tego w domu i nie trzeba konsultować się z prawnikiem lub doradcą medycznym, wszystko powinno być bezpieczne. Tutaj montuję NCDC OI sst avhrr v2.1, który jest na AWS, ustawić go w ERDDAP™ i pokazać wyniki.

- Etap 1: Określić punkt końcowy w rclone

rclone config utworzyć oi sst s3\\
dostawca AWS\\
region us- east-1\\
location _ limit us- east-1\\
env _ auth false\\
Anonimowa prawda


- Krok 2: Utwórz punkt montowania zbioru danych

sudo mkdir -p / mnt / oi sst 
sudo chown "$USER: $USER" / mnt / oi sst 

- Krok 3: zamontować magazyn S3 do punktu montowania

Uprawnienia, uprawnienia, uprawnienia, uprawnienia, uprawnienia.... (Z przeprosinami dla Steve 'a Ballmera, jeśli wiesz, że wiesz) ,

Montaż musi być wykonane tak, aby jakikolwiek użytkownik uruchamia swój tomcat, zazwyczaj użytkownik "tomcat", może uzyskać dostęp do danych. 'rclone' zawiera zbiór danych u właściciela i grupy użytkownika, który wykonuje polecenie montowania i chce przechowywać informacje w katalogu domowym użytkownika (to jest prawdopodobnie złagodzone jeśli skonfigurować to jako proces poziomu systemu - patrz poniżej) . Więc jeśli możesz, wykonaj polecenie montowania jako 'tomcat', ale jeśli tak jak my, twój tomcat nie ma katalogu domowego, musisz wykonać polecenie montowania jako inny użytkownik. Aby to zrobić, edytuj bezpiecznik. plik conf:

1. sudo vi / etc / fuse.conf

2. Usuń komentarz lub dodaj:

user _ allow _ other

3. Zapisz i wyjdź.


Rzeczywiste dane są głębokie na kilka warstw, a ja montuję na poziomie danych, a nie na najwyższym poziomie i wykonuję polecenie w terminalu tmux, więc komenda nadal działa:

rclone -vv mount oi sst : noaa- cdr- sea- surface- temp- optimum -interpolation- pds / data / v2.1 / avhrr / mnt / oi sst \\
-- read- only\\
-- allow- other\\
--vfs- cache- mode full\\
-- vfs- cache- max- size 1G\\
-- vfs- cache- interval 1m\\
-- vfs- read- chunk- size 64M\\
-- vfs- read- chunk- size- limit 1G\\
-- vfs- read- forward 256M\\
-- buffer-size 64M\\
-- dir- cache- time 24h\\
-- attr- timeout 1s\\
--no-modtime


- Krok 4: Użyj generateDatasets Xml jak normalny,

Stosowanie EDDGrid FromNcFiles jako typ danych, a katalog jest / mnt / oi sst /. Początkowe podanie było całkiem dobre i działało bez problemów. Dokonałem trzech zmian w skali xml, które mogły zostać zrobione podczas uruchamiania GenerateDatasets. Xml i były to:

1. Zmieniłem etykietę danych na oi sst _ rclone

2. Katalog zawiera mix plików niektóre kończące się w " .nc "i innych kończących się" wstępnymi .nc "i tylko ci pierwsi są pożądani. Aby zmienić nazwę pliku regex:

 <fileNameRegex> oi sst - avhrr- v02r01\\.\\ d &#123;8&#125;\\ .nc  </fileNameRegex> 

Często powtarzałem, że Regex jest jedną z tajemnic życia i mogą być lepsze sposoby na zrobienie regeksu. Ale to zadziałało.

3. Kategoria joos _ nie została ustawiona, dodałem je.

Dla stałej pracy produkcyjnej xml snippet może użyć trochę więcej edycji, aby być bardziej kompletny.

- Krok 5: Dodać xml do datasets.xml i ustawić flagę

To zajmuje dużo czasu, aby załadować na pierwsze podanie, więc idź znaleźć inne rzeczy do zrobienia przez resztę dnia.

Ostatecznym wynikiem jest:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

To nie było zbyt bolesne&#33;

Jeśli grasz z wynikiem, należy najpierw zauważyć, że ustawienia rclone są pierwszym przypuszczeniem i powinny być testowane na optymalizację. Jonathan Sherman z naszej grupy spojrzał na to i może mówić o tym w swoim wystąpieniu na spotkaniu IOOS DMAC. Będzie również obejmować o wiele więcej tematów związanych z zakładaniem w Google Cloud Platform, takich jak jak jak zorganizować konfigurację VM, ustawienie wiadro S3, aby mieć hierarchiczną przestrzeń nazw, które na GCP jest szybszy i tylko trochę droższy, a jeśli uruchomisz przetwarzanie skryptów do aktualizacji danych obsługiwanych przez ERDDAP™ Jak je ustawić. Jeśli ten temat cię interesuje, zachęcam do słuchania jego mowy. W ERDDAP™ jest uruchomiony i działa, po prostu nie jest dostępny w tej chwili z zewnątrz NMFS Sieć.

Po drugie, nie jest to AWS VM montujący wiadro AWS S3, jest to jeden z naszych serwerów i nasza rura w dzisiejszych czasach jest całkowicie nasycona, więc można oczekiwać, że poprzedni zestaw będzie szybszy niż to, co zrobiłem (dobrze nasza rura nie jest zbyt duża - dzięki NMFS - ale czy kiedykolwiek jesteśmy nasyceni - popyt na dane był fenomenalny) .

W końcu możesz się zastanawiać - Chcę toczyć własne, od czego mam zacząć oprócz tego? Odkryłem jedną rzecz, w której LLM są dobre to informacje, które są dobrze znane i dobrze udokumentowane, i AI, które sprawdziłem (Tam idą wszystkie moje żetony&#33;) Wszyscy dobrze znają rclone, AWS i GCP, i mogą zrobić większość konfiguracji dla Ciebie. W rzeczywistości szukałem zbioru danych, który byłby dobry do demo, a AI dał mi kilka sugestii i wygenerował większość z tego, co jest powyżej, chociaż zrobiłem kilka edycji dla własnego ustawienia.

Pamiętaj również, Seth napisał nowy S3 dla obecnej wersji (14, 30) z ERDDAP™ - Nie porównywałem prędkości, i wyobrażam sobie, że w zależności od tego, co robicie każdy z was będzie miał swoje zalety. Do przenoszenia nad istniejącym ERDDAP™ instalacja, przy użyciu rclone może uprościć proces.

- Roy.

PS - Pamiętaj, że rclone działa na szeroką gamę sprzedawców, nie jest to ograniczone do AWS i tylko niektóre zmiany w ustawieniach "rclone config" są potrzebne dla innego sprzedawcy.


Zrobić usługę systemową (modyfikować odpowiednio dla użytkownika itp.) :
- - - - - - - - - - -

[Jednostka]
Opis = Rclone mount for NOAA OISST na AWS
Wants = sieci- online .tar dostać
After = sieci- online .tar dostać

[Usługa]
Typ = zgłoszenie
Użytkownik = Twój Użytkownik
Grupa = Twoja Grupa

ExecStart = / usr / bin / rclone mount oi sst : noaa- cdr- sea- surface- temp- optimum -interpolation- pds / data / v2.1 / avhrr / mnt / oi sst \\
-- read- only\\
-- allow- other\\
-- dir- perms 0755\\
-- file- perms 0644\\
--vfs- cache- mode full\\
-- vfs- cache- max- size 1G\\
-- vfs- cache- interval 1m\\
-- vfs- read- chunk- size 64M\\
-- vfs- read- chunk- size- limit 1G\\
-- vfs- read- forward 256M\\
-- buffer-size 64M\\
-- dir- cache- time 24h\\
-- attr- timeout 1s\\
--no-modtime

ExecStop = / bin / fusermount - uz / mnt / oi sst 
Uruchom = niepowodzenie
RestartSec = 10

[Install]
WantedBy = multi- user .tar dostać
