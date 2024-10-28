import { api } from '@/api/spotifyApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { trackId: string } },
) {
  const trackId = context.params.trackId;
  const lyricsId = await api.lyrics.getSpotifyLyricsUrl(trackId);
  const lyrics = await api.lyrics.scrapeLyricsFromGenius(lyricsId);

  return NextResponse.json(lyrics);
}
