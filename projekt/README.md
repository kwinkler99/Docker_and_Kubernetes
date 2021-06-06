Moją aplikacją jest prosty kalkulator, który wykonuje podstawowe operacje i wyświetla historię wyszukiwań.

- Stworzyłam deployment dla backendu i frontendu z trzema replikami, żeby mieć pewność, że w momencie błędu wywołanego przez jednego z klientów(na przykład jeśli nie przewidzieliśmy niektórych działań) lub wprowadzania jakichś zmian, klienci będą mogli dalej korzystać z aplikacji. 

- Dla baz danych utworzyłam deployment również z 3 replikami. Bazy danych sa bardzo ważne. Wywołanie błedu może spowodować awarie również na backendzie, dlatego jeśli z jednym podem cos sie stanie i załaczy sie drugi to w zapasie pozostanie nam jeszcze trzeci w razie kolejnych awarii.

W aplikacji można również wypełnić formularz w którym opisujemy jak podoba nam sie aplikacja. Dane na temat użytkownika i komentarza przechowywane są w redisie, natomiast historia wyszukiwań w mongo z wykorzystaniem trwałości danych. 