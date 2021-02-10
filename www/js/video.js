jwplayer('playerVideo').setup({
    file: linkVideo,
    title: nomeApp,
    width: '100%',
    aspectratio: '16:9'
});

jwplayer().on('play', function () {
    if (status == 1) {
        playRadio();  
    };
});

jwplayer().on('error', function () {
    Materialize.toast('Não há transmissão no momento!', 3000, 'red');
    jwplayer().stop();
});

