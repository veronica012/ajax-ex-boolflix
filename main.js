$(document).ready(function(){

//MILESTONE 1

//intercettare il clik sul bottone di ricerca_utente
$('#bottone').click(function(){
//leggere il testo scritto dall'ricerca_utente
    var testo_utente = $('#ricerca_utente').val().trim().toLowerCase();
    console.log(testo_utente);
//chiamata funzione ajax
    $.ajax({
        'url': 'https://api.themoviedb.org/3/search/movie',
        'method': 'GET',
        'data': {
            'api_key': '6fb6f7fed203f8fd60f7a424fa51f6e5',
            'query': testo_utente,
            'language': 'it'
        },
        'success': function(data){
            // recuperare l'array di film
            var array_film = data.results;
            console.log(array_film); //è un array di oggetti

            //recuperare il singolo film dalla lista
            for(var i = 0; i < array_film.length; i++) {
                var film_corrente = array_film[i];
                console.log(film_corrente);
            //RECUPERARE LE PROPRIETA' DELL'OGGETTO DA STAMPARE IN PAGINA: TITOLO, TITOLO ORIGINALE, LINGUA, VOTO
                var titolo = film_corrente.title;
                var titolo_originale = film_corrente.original_title;
                var lingua = film_corrente.original_language;
                var voto = film_corrente.vote_average;
                console.log(titolo);
                console.log(titolo_originale);
                console.log(lingua);
                console.log(voto);
            //creo un nuovo oggetto che contiene solo alcune proprietà
            var nuovo_oggetto = {
                'titolo':film_corrente.title,
                'titolo_originale':film_corrente.original_title,
                'lingua':film_corrente.original_language,
                'voto':film_corrente.vote_average
            }
            console.log(nuovo_oggetto);
            //stampare in pagina titolo, titolo originale, lingua originale, voto
            $('main').append('<ul><li>' + titolo +'</li><li>' + titolo_originale + '</li><li>' + lingua +'</li><li>' + voto + '</li></ul>');
            }

        },
        'error': function() {
            alert('Si è verificato un errore')
        }

    });

});

});


//ricorda che data riga14 è diverso da data riga19
