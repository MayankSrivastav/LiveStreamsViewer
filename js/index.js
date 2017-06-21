function twitch(twitchUsers) {		  	
var html = '';
	
	let url = (type, channelName) => {
		return (
		  `https://wind-bow.gomix.me/twitch-api/
		  ${type}
		  /
		  ${channelName}
		  ?callback=?`
		);
        };
	
	twitchUsers.forEach(function(channelName) {				
		$.getJSON(url('stream', channelName), function(result) {
			let game, channelStatus; 
			if (result.stream === undefined) {
				game = "Account closed";
				channelStatus = "Offline";
			} else if (result.stream === null) {
				game = "Offline";
				channelStatus = "Offline";
			} else {
				game = result.stream.game;
				channelStatus = "Online";
			}
		});
		
		$.getJSON(url('channels', channelName), function(result) {			
			let displayName, logo, streamUrl, game, views;
			displayName = result.display_name === undefined ? channelName : result.display_name;
			logo = result.logo;
			streamUrl = result.url;
      game = result.game == null ? "Offline" : result.game;
      views = result.views == null ? "no views" : result.views;
      
      if (result.display_name === undefined) {
        game = "Channel closed";
        views = "no views";  
      } 			
      
			// Build the html and append to the div
			html =
			    '<div class="content"><h3><a href="' +
			    streamUrl +
			    '"> ' +
			    displayName +
			    "</a>" +
			    "</h3><p>Streaming: " +
			    game +
			    "</p><p>Views: " +
			    views +
			    "</p></div><hr>";												
			$('#tabs-1').append(html);			
		});
	});			
}
  $( function() {
    $( "#tabs" ).tabs();
  } );
var twitchUsers = [ 'OgamingSC2', 'freecodecamp', 'test_channel', 'brunofin' ];

twitch(twitchUsers);
