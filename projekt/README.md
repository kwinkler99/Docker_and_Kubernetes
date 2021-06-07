Moją aplikacją jest prosty kalkulator, który wykonuje podstawowe operacje i wyświetla historię wyszukiwań.

- Stworzyłam deployment dla backendu i frontendu z trzema replikami, żeby mieć pewność, że w momencie błędu wywołanego przez jednego z klientów(na przykład jeśli nie przewidzieliśmy niektórych działań) lub wprowadzania jakichś zmian, klienci będą mogli dalej korzystać z aplikacji. 

- Dla bazy danych Mongo utworzyłam deployment z 1 repliką. Mongo korzysta z trwalosci danych wiec w momencie błędu dane nie zostana utracone(dodatkowo mongo nie jest przystosowane do skalowania). Natomiast redis ma 2 repliki aby nie stracić połączenia z bazą w razie awarii jednej repliki i żeby backend nie przestał działać.

W aplikacji można również wypełnić formularz w którym opisujemy jak podoba nam sie aplikacja. Dane na temat użytkownika i komentarza przechowywane są w redisie, natomiast historia wyszukiwań w mongo z wykorzystaniem trwałości danych. 