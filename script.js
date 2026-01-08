const CONFIG = {
  BASE_URL: 'https://colonist.io',
  LOADING_DELAY: 350,
  SOURCE_PARAM: 'source=cta-experiment-checkered',
  ENDPOINTS: {
    LOBBY: '/?{{source}}#lobby',
    QUICK_JOIN: '/lobby?{{source}}',
    LEADERBOARDS: '/leaderboards?{{source}}',
    SPECTATE: '/spectate?{{source}}'
  }
};

function openColonistPath(path) {
  const fullPath = path.replace('{{source}}', CONFIG.SOURCE_PARAM);
  const fullURL = CONFIG.BASE_URL + fullPath;
  window.open(fullURL, '_blank', 'noopener,noreferrer');
}

function setLoadingState(button, isLoading) {
  button.disabled = isLoading;
  button.classList.toggle('is-loading', isLoading);
  button.setAttribute('aria-busy', isLoading.toString());
}

function handleNavigation(button, endpoint) {
  if (button.disabled) return;
  
  setLoadingState(button, true);
  setTimeout(() => {
    openColonistPath(endpoint);
    setLoadingState(button, false);
  }, CONFIG.LOADING_DELAY);
}

function handleJoinRoomClick(button) {
  handleNavigation(button, CONFIG.ENDPOINTS.LOBBY);
}

function handleLeaderboardClick(button) {
  handleNavigation(button, CONFIG.ENDPOINTS.LEADERBOARDS);
}

function initCTAExperiment() {
  const joinRoomBtn = document.querySelector('[data-role="join-room"]');
  const leaderboardBtn = document.querySelector('[data-role="leaderboard"]');
  
  if (joinRoomBtn) {
    joinRoomBtn.addEventListener('click', function(event) {
      event.preventDefault();
      handleJoinRoomClick(this);
    });
  }
  
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', function(event) {
      event.preventDefault();
      handleLeaderboardClick(this);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCTAExperiment);
} else {
  initCTAExperiment();
}
