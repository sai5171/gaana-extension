// on dom ready
jQuery(function($) {

  // event listener
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.type) {
      case 'song_info':
        $('#queueAds').remove();
        $('iframe').remove();
        $('.add_block').remove();
        $('#Gaana-Home-Top_Ads').remove();
        $('#bottomPlayerAds').remove();
        $('#mainarea').css('padding', '0 0 0 70px');
        var data = {
          'currentSong': {
            'src': $('.song-details-inner').find('img').attr('src'),
            'song_name': $('#stitle').text(),
            'movie_name': $('#atitle').text(),
            'play_pause': $('.playPause').attr('title'),
            'percentage': Math.round(($('.song-progress .slide').find('.ui-slider-range').width() / $('.song-progress .slide').find('.buffer').width()) * 100),
            'currentTime': $('.timer-wrap').find('.mq').text(),
            'maxTime': $('.timer-wrap').find('.ttime').text(),
            'favorite': $('#favorite').hasClass('favorite') ? false : true
          },
          'nextSongs': []
        };

        // get songtoplay
        jQuery.each($('.activesong').nextAll('.songqueue'), function(index, each) {
          if (index >= 5) {
            return false;
          };
          var $each = $(each);
          var $_npqitemdetails = $($each.find('._npqitemdetails'));
          var each_next_song_data = {
            'src': $($each.find('img')[0]).attr('src'),
            'song_name': $_npqitemdetails.find('h2').text(),
            'movie_name': $_npqitemdetails.find('p').text()
          }
          data.nextSongs.push(each_next_song_data);
        });
        sendResponse(data);
        break;
      case 'play_song':
        $('.playPause')[0].click();
        sendResponse();
        break;
      case 'pause_soung':
        $('.playPause')[0].click();
        sendResponse();
        break;
      case 'next_song':
        $('.next-song')[0].click();
        sendResponse();
        break;
      case 'prev_song':
        $('.prev-song')[0].click();
        sendResponse();
        break;
      case 'favorite':
        var click_ev = document.createEvent("MouseEvents");
        click_ev.initEvent("click", true, true);
        document.querySelectorAll('[data-type="favp"]')[0].dispatchEvent(click_ev);
        sendResponse();
        break;
    }
  });
});
