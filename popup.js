// on dom ready
jQuery(function($) {

  var getSongData = function() {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      var isGannaRunning = false;
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            isGannaRunning = true;
            chrome.tabs.sendMessage(tab.id, {
              'type': 'song_info'
            }, function(data) {
              if (data != undefined) {
                $('img').attr('src', data.currentSong.src);
                $('.card-title').text(data.currentSong.song_name);
                $('.category').text(data.currentSong.movie_name);
                $('.progress').width(data.currentSong.percentage + '%');
                $('.currentTime').text(data.currentSong.currentTime);
                $('.maxTime').text(data.currentSong.maxTime);
                if (data.currentSong.play_pause == 'Play') {
                  $('.play').removeClass('hide');
                  $('.pause').addClass('hide');
                } else {
                  $('.play').addClass('hide');
                  $('.pause').removeClass('hide');
                }
                if (data.currentSong.favorite) {
                  $('.favorite').removeClass('hide');
                  $('.unfavorite').addClass('hide');
                } else {
                  $('.favorite').addClass('hide');
                  $('.unfavorite').removeClass('hide');
                }
                data.nextSongs.forEach(function(currentValue, index) {
                  var $div = $('.nextSong' + index);
                  $div.removeClass('hide');
                  $div.find('img').attr('src', currentValue.src);
                  $div.find('.card-title').text(currentValue.song_name);
                  $div.find('.category').text(currentValue.movie_name);
                });
                if (!data.nextSongs.length) {
                  for (let i = 0; i <= 4; i++) {
                    $('.nextSong' + i).addClass('hide');
                  }
                }
              }
            });
          }
        });
      });
      if (!isGannaRunning) {
        chrome.runtime.sendMessage({
          createGannaTab: true
        }, function(response) {});
      }
    });
  };
  getSongData();
  window.setInterval(getSongData, 1000);

  // play songs event
  $('.play').on('click', function() {
    $('.play').addClass('hide');
    $('.pause').removeClass('hide');
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            chrome.tabs.sendMessage(tab.id, {
              'type': 'play_song'
            }, function(response) {});
          }
        });
      });
    });
  });

  // pause songs event
  $('.pause').on('click', function() {
    $('.play').removeClass('hide');
    $('.pause').addClass('hide');
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            chrome.tabs.sendMessage(tab.id, {
              'type': 'pause_soung'
            }, function(response) {});
          }
        });
      });
    });
  });

  // next songs event
  $('.next').on('click', function() {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            chrome.tabs.sendMessage(tab.id, {
              'type': 'next_song'
            }, function(response) {});
          }
        });
      });
    });
  });

  // prev songs event
  $('.prev').on('click', function() {
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            chrome.tabs.sendMessage(tab.id, {
              'type': 'prev_song'
            }, function(response) {});
          }
        });
      });
    });
  });

  // favorite songs
  $('.favorite').on('click', function() {
    $('.favorite').addClass('hide');
    $('.unfavorite').removeClass('hide');
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            chrome.tabs.sendMessage(tab.id, {
              'type': 'favorite'
            }, function(response) {});
          }
        });
      });
    });
  });

  // unfavorite songs
  $('.unfavorite').on('click', function() {
    $('.unfavorite').addClass('hide');
    $('.favorite').removeClass('hide');
    chrome.windows.getAll({
      populate: true
    }, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          if (tab.url.indexOf('gaana.com') != -1) {
            chrome.tabs.sendMessage(tab.id, {
              'type': 'favorite'
            }, function(response) {});
          }
        });
      });
    });
  });

  $('body').on('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
      e.preventDefault();
      if ($('.play').hasClass('hide')) {
        $('.pause').trigger('click');
      } else {
        $('.play').trigger('click');
      }
    } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
      e.preventDefault();
      $('.next').trigger('click');
    } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'b') {
      e.preventDefault();
      $('.prev').trigger('click');
    }
  });
});
