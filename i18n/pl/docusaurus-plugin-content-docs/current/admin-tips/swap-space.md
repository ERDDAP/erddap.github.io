Ta zawartość jest oparta na [wiadomość od Roy Mendelssohn do ERDDAP grupa użytkowników](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) .

Wiele wniosków o pomoc otrzymujemy problemy z wykorzystaniem pamięci w ERDDAP™ . Część z tego wynika ze zmian w zarządzaniu pamięcią w Java oraz interakcje z zarządzaniem pamięcią systemu Linux OS. Zaczynam wierzyć w Java 17, Java używa więcej pamięci niż to, co jest umieszczone w ustawieniach stosu. Możesz to zobaczyć, jeśli spojrzysz na ustawienia stosu, a następnie użyjesz poleceń takich jak top, htop lub btop, aby sprawdzić wykorzystanie pamięci aplikacji. Więc na przykład nasze ciężko używane ERDDAP™ ma spację stosu ustawioną na 21GB, ale w rzeczywistości użycie pamięci może uruchomić do 28GB- 30GB, czasami wyższe. Wartość ta może wzrosnąć, jeśli istnieje wiele jednocześnie dużych żądań do systemu.

W większości systemów Linux, gdy zużycie pamięci przekroczy około 50%, system operacyjny zacznie wymieniać pamięć. Co więcej, dla większości systemów zamiany miejsca nie jest śmieci zbierane aż absolutnie konieczne, co ERDDAP™ jest za późno, i może powodować ERDDAP™ do zamrożenia. A przestrzeń wymiany jest wolna, co dla dużych datasets.xml może spowodować, że główne aktualizacje nie ukończą się, co następnie złożyć problemy.

Co możesz z tym zrobić? Po pierwsze, dowiedz się o prawdziwym użyciu pamięci lub systemu i miej wystarczająco dużo pamięci RAM, aby wykorzystanie pamięci nie przekraczało 50%. Ale są też dwa ustawienia, które mogą zmienić to zachowanie, vm.swappiness. oraz vm.vfs _ cache _ pressure.

vm.swappiness kontroluje, jak agresywnie jądro Linux używa przestrzeni wymiany. Możesz sprawdzić jego bieżącą wartość za pomocą:

> cat /proc/sys/vm/swappiness
>
• Domyślnie 60 (w skali od 0 do 100) .
• Niższe wartości zmniejszają prawdopodobieństwo wymiany systemu.
• Wartość 10 lub 1 jest często stosowana w systemach z dużą ilością pamięci RAM.


Aby zmienić wartość do restartu, powiedz do 10:

> sudo sysctl vm.swappiness=10
>

I na stałe zmienić:

> sudo nano /etc/sysctl.conf
>

I edytuj wartość dla vm.swappiness. Następnie zastosować zmianę:

> sudo sysctl -p
>

vm.vfs _ cache _ pressure. mówi systemowi, jak agresywne jest odzyskanie pamięci. Wyższe wartości. (100 lub więcej) powiedz systemowi, aby był bardziej agresywny, Aby sprawdzić wartość bieżącą:

> cat /proc/sys/vm/vfs_cache_pressure
>

Aby zmienić wartość do następnego restartu:

> sudo sysctl vm.vfs_cache_pressure=150
>

Aby zmienić wartość na stałe:

> sudo nano /etc/sysctl.conf
>

A następnie dodać lub zaktualizować linię:

> vm.vfs_cache_pressure = 100
>

A potem zastosuj zmianę:

> sudo sysctl -p
>


Co można zrobić, jeśli monitorujesz swoje wykorzystanie przestrzeni wymiany i zauważysz, że wykorzystanie wymiany zaczyna rosnąć? Istnieje polecenie, które opróżnia przestrzeń wymiany i przenosi zawartość do pamięci. Przed użyciem tego, należy upewnić się, że dostępna pamięć jest większa niż wykorzystanie swap. Mówię o dostępnej pamięci, ponieważ w systemach Linuksa z ciężkim używaniem dysku "pamięć buforowana" może być dość wysoka, więc "wolna pamięć" pokaże, że jest bardzo niska, ale "pamięć podręczna" będzie dostępna w razie potrzeby dla takich poleceń.

> sudo swapoff -a && sudo swapon -a
>

Dla pewności. Lubię zmuszać do zbiórki śmieci również po tym:

> sudo jcmd $(pgrep java) GC.run
>

Mam nadzieję, że niektórzy ludzie uznają te informacje za przydatne. Chcemy zrobić ERDDAP™ tak wytrzymały, jak to możliwe, i pracować jak najpłynniej z tym, jak ludzie rzeczywiście pracują.
