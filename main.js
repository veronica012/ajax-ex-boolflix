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
            // recuperare l'array di fil
            var array_film = data.results;
            console.log(array_film); //è un array di oggetti
            //recuperare il singolo film dalla lista
            for(var i = 0; i < array_film.length; i++) {
                var film_corrente = array_film[i];
                console.log(film_corrente);
            } 
            //stampare in pagina titolo titolo originale lingua voto

        },
        'error': function() {
            alert('Si è verificato un errore')
        }

    });

});

});

//ricordare che data riga14 è diverso da data riga19
