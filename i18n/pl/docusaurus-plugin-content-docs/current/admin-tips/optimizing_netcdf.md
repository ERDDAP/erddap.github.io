Ta zawartość jest oparta na [wiadomość od Roy Mendelssohn do ERDDAP grupa użytkowników](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Optymalizacja plików netcdf dla chmury
- - - - - - - - - - -

a. przepakowywanie i rozmiar strony

Ostatnio podczas badań natknąłem się na bardzo interesujący artykuł:

https://nsidc.github.io/cloud-optimized-icesat2/

Nic nie budzi pasji, jak dyskusje o językach programowania, edytorów i formatach plików, a to nie jest rekomendacja jakiego formatu (s) należy użyć, ale raczej zrozumieć, co jest w tej gazecie i zobaczyć, jak wiele poprawy można uzyskać ( ERDDAP™ zawsze starał się być agnostykiem w wielu z tych kwestii, a raczej wybrać spróbować i pracować z tym, jak ludzie rzeczywiście pracować z danymi) .

Dokument jest skierowany głównie do sytuacji, w których dane są przechowywane w magazynie obiektów, takim jak Amazon S3. Sklepy obiektów są dostępne przez sieć za pomocą http  (s) polecenia, więc w porównaniu do przechowywania z bezpośrednim połączeniem z (wirtualny) serwer, istnieje znacznie dłuższa latencja, ponieważ żądanie musi zrobić podróż w obie strony. Dla sklepów z obiektami chcesz złożyć jak najmniej wniosków, ale jeśli po prostu zrobić naprawdę duże wnioski, aby zmniejszyć liczbę połączeń, możesz mieć dostęp do znacznie więcej danych niż potrzebujesz, co może być równie wolne, jeśli nie bardziej. Sztuczka polega na osiągnięciu równowagi pomiędzy tymi dwoma czynnikami. I nawet jeśli dostęp do danych na magazynach obiektów znacznie się poprawił, tak ma dostęp do bezpośrednio dołączonej pamięci masowej. W badaniu tego niektóre szacunki są:

Lokalny dysk:
• Poszukaj czasu: 0.1ms
• 6 poszukiwań: 0.6ms (nieistotny) 
• Odczyt rozproszonych metadanych jest szybki
Cloud HTTP:
• Wniosek o opóźnienie: 100- 200ms
• 6 wniosków: 600- 1200ms (Bardzo powoli&#33;) 
• Każda prośba ma czas podróży sieciowej

Drugą rzeczą do zrozumienia jest to, że pliki netcdf4 / hdf5 są przechowywane w kawałkach i zwracane w stronach, więc względny rozmiar każdego z nich może naprawdę wpłynąć na prędkość dostępu, gdy dostęp jest ze sklepu z obiektami, i że domyślnie metadane o pliku są rozrzucone w całym pliku, więc uzyskanie metadanych może wymagać kilku żądań. Głównym punktem dokumentu jest to, że domyślny rozmiar strony dla plików netcdf4 / hdf5 wynosi 4096 bajtów (4KB) - (Co jest straszne dla chmury&#33;) ponieważ sam rozmiar metadanych jest prawdopodobnie większy niż ten i bardziej niż prawdopodobne, że twoje rozmiary są również większe niż to. Tak więc ekstrakt będzie wymagał dużo rund-wycieczki, które są powolne. Co chcesz zrobić, to przepakować plik tak, że wszystkie metadane są na "górze" pliku, a rozmiar strony jest co najmniej tak duży jak rozmiar metadanych plus rozmiar jednego kawałka. Domyślnie rozmiar strony nie jest ustalony, ale używa strategii, która się zmienia. To, co znalazł papier za pomocą stałej wielkości strony dało lepsze wyniki.

Więc jak mogę określić rozmiar metadanych pliku?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

I jak mogę określić rozmiar kawałka:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

lub

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

I jak mogę określić strategię rozmiaru strony:

> h5stat yourfile.nc | grep "File space management strategy"
>

Najprawdopodobniej to polecenie zwróci "H5F _ FSPACE _ STRATEGY _ FSM _ AGGR", która jest domyślną strategią i którą chcemy zwrócić to "H5F _ FSPACE _ STRATEGY _ PAGE"

Jak mogę przepakować mój plik netcdf tak, że wszystkie metadane są na przodzie, i zmienić strategię tak, że używany jest stały rozmiar strony i jakiego rozmiaru strony używać? Zasady, które znalazłem to:

Wybór rozmiaru strony:
• Musi być ≥ całkowitej wielkości metadanych pliku (Krytyczny&#33;) 
• Powinno być moc 2 (4MB, 8MB, 16MB itp.) 
• Nie szalenie duży - 32MB jest zazwyczaj praktyczny max
• Rozmiar kawałka - rozmiar strony powinien pomieścić największe kawałki

Jak wspomniano powyżej, najlepiej rozmiar powinien być większy niż rozmiar metadanych plus rozmiar jednego kawałka. Badanie wykazało, że dla wielu zbiorów danych rozmiar strony 8MB jest dobrym handlem, prawdopodobnie większy niż rozmiar metadanych + rozmiar kawałka, i nie ciągnie o wiele więcej danych niż potrzebujesz. Aby to osiągnąć:

h5repack -S PAGE -G 8388608 Twój plik .nc Twój plik _ zoptymalizowany .nc 

Oto wartości do wykorzystania, aby uzyskać różne rozmiary stron:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
33554432 (32MB) 

b. posiadające wszystkie niżej wymienione cechy: Czy istnieją korzyści, jeśli używasz plików lokalnie również?

Papier i inne rzeczy, które znalazłem sugerują, że nawet lokalnie może być wzrost prędkości gdziekolwiek od 10% -30%. W moich wszystko oprócz wyczerpujących testów znalazłem przyrost prędkości około 10%, gdy wnioski są stosunkowo małe w porównaniu do ogólnego rozmiaru pliku, a wzrost prędkości zmniejsza się wraz z rosnącym wnioskiem, ale nigdy nie uważam, że jest wolniejszy.

"Oprogramowanie" specjalnie zaprojektowane lub zmodyfikowane do "użytkowania" urządzeń wyszczególnionych w pozycji 1C001.b.3. TANSTAAFL

Ale gdzieś jest haczyk, to chyba darmowy lunch. A połów jest taki, że stały rozmiar strony zwiększa rozmiar pliku. W niektórych przypadkach próbowałem:

617M mur1 .nc 
632M mur1 _ zoptymalizowany .nc 
608M mur2 .nc 
616M mur2 _ zoptymalizowane .nc 
29M chla1 .nc 
40M chla1 _ zoptymalizowany .nc 
30M chla2 .nc 
40M chla2 _ zoptymalizowane .nc 

Więc handel jest nie nieistotny wzrost wielkości pliku.

d. następujące "technologie": Ale jeśli i tak będę musiał przetworzyć pliki...?

Dobrym pytaniem jest, czy muszę napisać skrypt, aby przetworzyć pliki, dlaczego po prostu nie napisać skryptu, aby przetłumaczyć go na format jak powiedzmy zarr? zarr ma wielu zwolenników i jeśli jesteś zainteresowany Zarr po prostu zrobić szybkie wyszukiwanie duckduckgo i tam wiele dobrych postów, być może bardziej zrównoważony widok jest nahttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Interesujące jest to, że wiele punktów podnosi są to, co w formacie lodowym próbują rozwiązać) . Więc dlaczego nie chcesz przetłumaczyć swoich plików na coś takiego jak zarr, Po pierwsze, jeśli utworzyć pliki netcdf regularnie, można rozpocząć optymalizację plików od teraz, które z czasem będzie widać przyrost prędkości i nie będzie trzeba ponownie formatować poprzednie pliki, i ERDDAP™ nadal będzie w stanie agregować nad plikami, nawet jeśli niektóre ustawienia wewnętrzne różnią się. Po drugie, możesz mieć wiele narzędzi, które zależą od plików netcdf, a to podejście oznaczałoby, że nie musiałbyś zmieniać tego, co może być dużą ilością kodu. Chodzi o to, aby być świadomym opcji i wybrać, co działa najlepiej dla swojej sytuacji. Tylko jako przypomnienie, jeśli zdecydujesz się użyć plików zarr z ERDDAP™ , muszą być to pliki zarr format v2.

"Oprogramowanie" specjalnie zaprojektowane lub zmodyfikowane do "użytkowania" urządzeń wyszczególnionych w pozycji 1C001.b.3. Duże dane - na bok

Duże dane mówią o wielu rzeczach, ale jak duże są dane, których większość ludzi używa i jak to się porównuje z możliwościami nowoczesnych laptopów (tak laptopy, nie serwery) . Ciekawe ujęcie jest na:

https://www.youtube.com/watch?v=GELhdezYmP0Zacznij około minuty 37 choć cała rozmowa jest ciekawa

Badanie, o którym wspomina, jest w:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Tak więc jest stosunkowo mały odsetek użytkowników, którzy naprawdę muszą podkręcić moc, ale przeważająca większość użytkowników może zrobić swoje analizy na laptopie, 26TB napędy zewnętrzne są teraz poniżej 300 dolarów i plotki, że 60TB napędy zewnętrzne będą dostępne do końca roku. Coś do przemyślenia.

2. Stosowanie ERDDAP™ z platformą Google Cloud lub innymi dostawcami chmur poza AWS
- Tak.

W tej chwili ERDDAP™ jest znany tylko do pracy ze sklepami obiektów AWS (S3) , choć poprawa i uogólnienie ERDDAP™ Obsługa sklepu z obiektami jest na liście todo (patrzhttps://github.com/ERDDAP/erddap/issues/158) . Więc co zrobić, jeśli powiedziano ci, że musisz uruchomić swój ERDDAP™ na platformie Google Cloud (GCP) lub podobną platformę? Po pierwsze, większość platform w chmurze oferuje różne poziomy pamięci masowej, zazwyczaj w tym takie, które są podobne do lokalnej pamięci masowej i są rozpoznawane przez system operacyjny, takie, które są podłączone przez sieć zwykle za pomocą NFS do dostępu (ponownie bezpośrednio dostępne przez system operacyjny) i sklep z przedmiotami. Pierwszym rozwiązaniem nie jest korzystanie ze sklepów z obiektami, i byłoby dobrze, aby przejść. Ale jak zawsze, TANSTAAFL i wady w tym przypadku jest jak przejść ze sklepu z obiektami - &gt; Dostęp do NFS - &gt; lokalnego sklepu koszty również idą w górę. (Dodam, że NFS jest również dostępny przez sieć, i ma własne problemy z opóźnieniem, to również korzystać z optymalizacji plików) .

Jeśli musisz używać sklepu z obiektami, lub możesz sobie na nie pozwolić, odpowiedzią jest system plików FUSE (https://github.com/libfuse/libfuse) . Na GCP nazywa się to gcsfuse, a kroki do jego zainstalowania to:

• Zainstaluj gcsfuse na swoim obrazie GCP Linux:
sudo apt update
sudo apt install gcsfuse
• Uwierzytelnij GCP (jeżeli nie jest jeszcze uwierzytelniony) :
Upewnij się, że posiadasz odpowiednie dane uwierzytelniające, zazwyczaj poprzez konto serwisowe lub przez logowanie gcloud auth.
• Zamontuj wiadro GCS do lokalnego katalogu:
Zamontuj wiadro GCS do lokalnego katalogu przy użyciu gcsfuse. Pozwala to instancji GCP na dostęp do danych, jakby była częścią lokalnego systemu plików.
gcsfuse your -bucket- name / path / to / mount / directory

A teraz twój sklep z obiektami może być dostępny tak, jakby był częścią systemu plików Linux, więc będzie działać z ERDDAP™ . To wygląda na magię, zdobycie najlepszego z obu światów, musi być jakiś haczyk. I jest. Systemy plików FUSE są nieco wolniejsze niż dostęp bezpośrednio do sklepu z obiektami (w zasadzie dodałeś kolejną warstwę do dostępu) . W moich szacunkach, o ile wolniej jest na mapie, więc nie mam pojęcia, o ile wolniej. Ale jeśli jesteś w sytuacji, w której musisz uruchomić na GCP przy użyciu magazynów obiektów, masz rozwiązanie na teraz, które będzie działać z ERDDAP™ .

3. Co możesz teraz zrobić, aby pomóc.
- - - - - - - - - - - - -

Jeśli masz czas i zdolność do przetestowania niektórych z tych rzeczy i raportowania o wynikach, byłoby świetnie. Szczególnie jeśli masz dostęp do GCP lub podobne i zobaczyć, jak dużo wolniej ERDDAP™ dostęp jest za pomocą FUSE (właściwie można to przetestować również na AWS) . Jeśli kara za prędkość nie jest zbyt wielka, byłoby wspaniale, ponieważ mam powody, aby wierzyć, że niektórzy ludzie wkrótce będą musieli uruchomić swoje ERDDAP™ s na GCP ze składem obiektu. Więc nie jest to tylko kwestia teoretycznego zainteresowania.
