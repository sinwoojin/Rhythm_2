'use client';

import useSpotifyStore from '@/zustand/spotifyStore';
import { PropsWithChildren, useEffect } from 'react';

function SpotifyProvider({ children }: PropsWithChildren) {
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const setDeviceId = useSpotifyStore((state) => state.setDeviceId);
  const setCurrentTrack = useSpotifyStore((state) => state.setCurrentTrack);
  const setIsPaused = useSpotifyStore((state) => state.setIsPaused);
  const setPlayer = useSpotifyStore((state) => state.setPlayer);

  const loadSpotifyScript = () => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    document.body.appendChild(script);
  };

  const initializeSpotifyWebPlaybackSDK = () => {
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK',
      getOAuthToken: (cb) => cb(accessToken!),
      volume: 0.5,
    });

    player.addListener('ready', ({ device_id }) => setDeviceId(device_id));

    player.addListener('player_state_changed', (state) => {
      if (!state) return;
      setCurrentTrack(state.track_window.current_track);
      setIsPaused(state.paused);
    });

    player.connect();
    setPlayer(player);
  };

  useEffect(() => {
    if (!accessToken) return;

    window.onSpotifyWebPlaybackSDKReady = initializeSpotifyWebPlaybackSDK;

    loadSpotifyScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return children;
}

export default SpotifyProvider;
