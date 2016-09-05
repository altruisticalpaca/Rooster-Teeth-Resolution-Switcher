(function() {
	var desiredResolution = 1080; // edit this

	var playerDom = document.getElementsByClassName("video-js");

	if (playerDom.length === 0) {
		alert("Video player not found.");
		return;
	}

	var playerId = playerDom[0].getElementsByTagName("video")[0].id;

	var videoPlayer = videojs(playerId);

	if (desiredResolution == "auto") {
		changeResolution(videoPlayer.hls.playlists.master.uri);
	} else {
		var playlists = videoPlayer.hls.playlists.master.playlists;
		var resolutions = [];

		var didChangeResolution = false;

		for (index = 0, len = playlists.length; index < len; ++index) {
			var resolution = playlists[index].attributes.RESOLUTION.height;

			if (resolution == desiredResolution) {
				changeResolution(playlists[index].resolvedUri);

				didChangeResolution = true;

				break;
			}

			resolutions.push(resolution + "p");
		};

		if (didChangeResolution === false) {
			alert("Could not switch to " + desiredResolution + "p" + ".\n\nAvailable options: " + resolutions.join(", ") + ".");
		}
	}

	function changeResolution(uri) {
		var oldTime = videoPlayer.currentTime();

		videoPlayer.src({
			src: uri,
			type: "application/x-mpegURL"
		});

		videoPlayer.currentTime(oldTime);
		videoPlayer.play();
	}
})();
