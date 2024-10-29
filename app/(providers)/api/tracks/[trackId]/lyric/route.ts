import { api } from '@/api/spotifyApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  context: { params: { trackId: string } },
) {
  const lyric = await api.lyrics.getTrackLyricOnServer(context.params.trackId);

  return NextResponse.json(lyric);
}
