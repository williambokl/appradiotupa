var apiUrl = "https://www.googleapis.com/youtube/v3/channels";
var channelId = "UCoFjo6xZ-zzmZGctk9CNDNA";
//var channelId = "UC1QVK8RzT1AugZTb_2XwG8w";
var tokenKey = 'AIzaSyANB6IC4bnYWnzTsOjaWQv3XGaelHXM_Wo';
var nextPageToken = '';
var playlistId = '';
var podcastHeight = $('#podcast').height();
var playerYT;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
	playerYT = new YT.Player('player', {
		height: '360',
		width: '640',
		videoId: '',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	playerYT.loadVideoById( $('.lista-podcast').first().attr('video') );
	playerYT.stopVideo();
}         

var done = false;
function onPlayerStateChange(event) {
//    status = 1;
//    playRadio();
    var evento = event.data;
    if(evento == 1){
        status = 1;
        playRadio();
    }
}

function stopVideo() {
	playerYT.stopVideo();
} 

function setPlayList(playlistId){
	$.get("https://www.googleapis.com/youtube/v3/playlistItems", {
		part: "snippet", 
		playlistId: playlistId, 
		key: 'AIzaSyANB6IC4bnYWnzTsOjaWQv3XGaelHXM_Wo',
		maxResults: 10,
		pageToken : nextPageToken,
	}, function(data){
		nextPageToken = data.nextPageToken;

		$.each(data.items, function(i, item){
			var date = item.snippet.publishedAt.split('T')[0].split('-');

			var novoItem = `<li class="collection-item avatar lista-podcast" video="${item.snippet.resourceId.videoId}"> <img src="${item.snippet.thumbnails.default.url}" alt=""> <span class="title">${item.snippet.title}</span><p>${date[2]}/${date[1]}/${date[0]}</p></li>`;

			$('#podcast').append(novoItem);
		});		
	});		
}

    function scrolled(o){
        if(o.offsetHeight + o.scrollTop > o.scrollHeight){
            setPlayList(playlistId);
        }
    }

$(document).ready(function(){
	$('.titulo-podcast').hide();
	$.get(apiUrl, {part: "contentDetails", id: channelId, key: tokenKey}, function(data){

		playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;

		setPlayList(playlistId);

	});

	$('.tabs > li').click(function(){
		playerYT.pauseVideo();
	});

	$(document).on('click', '.lista-podcast', function(){
		idVid = $(this).attr('video');

		
		// $('.video-container > iframe').attr('src', `https://www.youtube.com/embed/${idVid}`);
		playerYT.loadVideoById(idVid, 5, "large");
		/*$('.video-container').show();*/

		$('#podcast').scrollTop(0);
	});
    $(document).on('click', '.video-podcast', function(){
        fuiclicado();
	});
	
});