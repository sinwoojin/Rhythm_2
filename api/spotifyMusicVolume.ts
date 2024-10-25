import { spotifyAPI } from './spotifyApi';

export const setSpotifyVolume = async (
  accessToken: string,
  deviceId: string,
  volumePercent: string,
) => {
  try {
    await spotifyAPI.put(`me/player/volume`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        device_id: deviceId,
        volume_percent: volumePercent,
      },
    });
  } catch (error) {
    console.error('volume err:', error);
  }
};
