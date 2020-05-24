$(document).ready(function(){

//MILESTONE 1

//intercettare il clik sul bottone di ricerca_utente
$('#bottone').click(function(){
//leggere il testo scritto dall'ricerca_utente
    var testo_utente = $('#ricerca_utente').val().trim().toLowerCase();
    console.log(testo_utente);
//ogni nuovo input dell'utente sono eliminati i dati della ricerca precedente
    $('main').html('');
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
            console.log(array_film);
            //ciclo l'array per recuperare ogni singolo elemento, ogni elemento è un oggetto
            for(var i = 0; i < array_film.length; i++) {
            // recupero ogni singolo film dalla lista
                var film_corrente= array_film[i];
                console.log(film_corrente);
            //creo un nuovo oggetto in cui salvo le proprietà che voglio quindi elimino le variabili create precedentemente
            var nuovo_oggetto = {
                'titolo':film_corrente.title,
                'titolo_originale':film_corrente.original_title,
                'lingua':film_corrente.original_language,
                'voto':film_corrente.vote_average
            }
            console.log(nuovo_oggetto);
            //stampare in pagina titolo, titolo originale, lingua originale, voto
            $('main').append('<ul class="lista-proprietà-film"><li class="titolo-film">' + film_corrente.title +'</li><li class="titolo-originale">' + film_corrente.original_title  + '</li><li class"lingua">' + film_corrente.original_language +'</li><li class="voto-average">' + film_corrente.vote_average + '</li></ul>');

            }
        },
        'error': function() {
            alert('Si è verificato un errore')
        }
    });
});
});


//ricorda che data riga14 è diverso da data riga19
