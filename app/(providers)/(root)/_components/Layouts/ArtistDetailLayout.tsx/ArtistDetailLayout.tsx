import { api } from '@/api/spotifyApi';
import { artistAlbum, artistTopMusic } from '@/schema/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import { Swiper, SwiperSlide } from 'swiper/react';
interface ArtistsDetailLayoutProps {
  artistId: string | string[];
}

function ArtistDetailLayout({ artistId }: ArtistsDetailLayoutProps) {
  const [track, setTrack] = useState<artistTopMusic | undefined>(undefined);
  const [album, setAlbum] = useState<artistAlbum | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const topArtistMusic = await api.artist.getTopArtistMusic(
        String(artistId),
      );
      setTrack(topArtistMusic);
      // 아티스트 앨범 가져오기
      const artistAlbum = await api.artist.getArtistAlbum(String(artistId));
      setAlbum(artistAlbum);
    })();
  }, [artistId]);

  const tracks = track?.tracks;
  const albums = album?.items;

  const order = (index: number) => index + 1;
  return (
    <>
      {/* 아티스트 인기곡 */}
      <div>
        <ul className="flex flex-col">
          {tracks?.map((track, index) => (
            <li
              key={track.id}
              className="flex h-20 px-4 py-[10px] w-full gap-4 items-center rounded-sm transition-all hover:bg-white/10"
            >
              <span className="flex flex-row-reverse max-w-4 items-center">
                {order(index)}
              </span>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex gap-4 items-center">
                  <img src={track.album.images[2].url} alt="image" />
                  <div className="w-full">
                    <Link href={`/music/${track.id}`}>{track.name}</Link>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <Link href={`/album/${track.album.id}`}>
                    {track.album.name}
                  </Link>
                </div>
              </div>
              <button aria-label="옵션 버튼" className="text-xl text-white/50">
                <SlOptions />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 아티스트 앨범 */}
      <div className="mt-10">
        <h3 className="mb-5 text-2xl font-semibold">앨범</h3>
        <Swiper
          spaceBetween={10}
          slidesPerView={7}
          loop={false}
          className="overflow-hidden"
        >
          <ul className="max-w-full flex overflow-hidden gap-x-5">
            {albums?.map((album) => (
              <SwiperSlide key={album.id}>
                <img alt="앨범 이미지" src={album.images[0].url} />
                <span>{album.name}</span>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </div>
    </>
  );
}

export default ArtistDetailLayout;
