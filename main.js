$(document).ready(function(){
//variabili fisse (anche costanti nella nuova versione di js, cioè dati non più modificabili)
var url_base ='https://api.themoviedb.org/3' ;
var api_key ='6fb6f7fed203f8fd60f7a424fa51f6e5' ;
var url_base_img = 'https://image.tmdb.org/t/p/w185' ;
var copertina_non_disponibile = 'https://lh3.googleusercontent.com/proxy/9stbWHkYZTzENjpwHZmfLnHnIBUFoOLMm65CBUcIk5x6rrUQusG_-6UiqGB2hqhDXQ0ID5hc_yTuUSWziKm1OCxIMea9eIBQIEpXH_DTUOgmfBEAd7WwioOOQstxmirNt9LOmw';

//variabili e funzione handlebars
var template_html = $('#entry-template').html();
var template_function = Handlebars.compile(template_html);
//MILESTONE 1

//intercettare il clik sul bottone di ricerca_utente
$('#bottone').click(function(){

//leggere il testo scritto dall ' utente in input
    var testo_utente = $('#ricerca_utente').val().trim().toLowerCase();
    console.log(testo_utente);
//la chiamata ajax parte qunado il testo utente non è una stringa vuota
    if (testo_utente != '') {
    reset_ricerca();
//chiamata funzione ajax
    $.ajax({
        'url': url_base + '/search/movie',
        'method': 'GET',
        'data': {
            'api_key': api_key,
            'query': testo_utente,
            'language': 'it'
        },
        'success': function(data){
            console.log(data); //per vedere ciò che restituisce l'api cioè un oggetto, nella chiave results troviamo un array che contiene tanti oggetti
            // recuperare l'array di film
            var array_film = data.results;
            console.log(array_film);
            //ciclo l'array per recuperare ogni singolo elemento, ogni elemento è un oggetto
            for(var i = 0; i < array_film.length; i++) {
            // recupero ogni singolo film dalla lista
                var film_corrente= array_film[i];
                console.log(film_corrente);
            // creo un nuovo oggetto in cui salvo le proprietà che voglio quindi elimino le variabili create precedentemente
            var nuovo_oggetto = {
                'poster': poster(film_corrente.poster_path),
                'titolo':film_corrente.title,
                'titolo_originale':film_corrente.original_title,
                'lingua':bandierine(film_corrente.original_language),
                'voto': stelle(film_corrente.vote_average),
                'trama': film_corrente.overview
            }
            console.log(nuovo_oggetto);
            //stampare in pagina titolo, titolo originale, lingua originale, voto con il template
            // $('main').append('<ul class="lista-proprietà-film"><li class="titolo">' + film_corrente.title +'</li><li class="titolo-originale">' + film_corrente.original_title  + '</li><li class"lingua">' + film_corrente.original_language +'</li><li class="voto-average">' + film_corrente.vote_average + '</li></ul>');
            var html_finale = template_function(nuovo_oggetto);
            $('.container-card').append(html_finale);
        }
        },
        'error': function() {
            alert('Si è verificato un errore')
        }
    });
    //nuova chiamata ajax milestone 2
    $.ajax({
        'url': url_base + '/search/tv',
        'method': 'GET',
        'data': {
            'api_key': api_key,
            'query': testo_utente,
            'language': 'it'
        },
        'success': function(data) {
            //recupero l'array con le serie tv
            var array_serietv = data.results;
            console.log(array_serietv);
            //ciclo l'array per recuperare il singolo oggetto che è contenuto in array
            for (var i = 0; i < array_serietv.length; i++) {
                var serie_corrente = array_serietv[i];
                console.log(serie_corrente);
                //creo un nuovo oggetto in cui salvo le proprietà
                var nuovo_oggetto = {
                    'poster': poster(serie_corrente.poster_path ),
                    'titolo': serie_corrente.name,
                    'titolo_originale': serie_corrente.original_name,
                    'lingua':bandierine(serie_corrente.original_language),
                    'voto': stelle(serie_corrente.vote_average),
                    'trama': serie_corrente.overview
                }
                console.log(nuovo_oggetto);
                var html_finale = template_function(nuovo_oggetto);
                $('.container-card').append(html_finale);
            } //fine for

        },
        'error': function() {
            alert('Si è verificato un errore')
        }
    }); //chiusa seconda chiamata ajax
} //CHIUSO IF
    else {
    alert('Non hai effettuato nessuna ricerca') //alert per l'utente che non ha digitato nulla
}

}); //fine click

function reset_ricerca() {
    //svutare l'input
        $('#ricerca_utente').val('');
    //ogni nuovo input dell'utente sono eliminati i dati della ricerca precedente
        $('.container-card').html('');
}

//funzione per sostituire le stelle al voto che contiene anche il calcolo dal numero float a intero milestone2
function stelle(voti){
    var voto = Math.ceil(voti / 2);
    var stella = '';
    for (var i = 0; i < voto; i++) {
        stella += '<i class="fas fa-star"></i>'
    }
    return stella
}
//funzione per sostituire le bandierine corrispondenti alla lingua milestone2 (in alternativa handlebars)
function bandierine(lingua) {
    var array_lingue = ['it', 'en', 'ja', 'fr', 'zh', 'es', 'ru', 'el', 'de', 'hi'];
    if (array_lingue.includes(lingua)) {
        var bandierina = '<img src="img/' + lingua + '-flag.png">';
        return bandierina
    } else {
        return lingua; //si può omettere l'else perchè se il primo if è vero l'else non sara eseguito
    }
}
//funzione per recuperare il percorso delle copertine Milestone3
function poster(percorso) {
    var percorso;
    if (percorso != null) {
        var immagine = url_base_img + percorso;
        return immagine
    } else {
        return copertina_non_disponibile
    }
}

}); //fine document.ready
