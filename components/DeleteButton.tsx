import useSpotifyStore from '@/zustand/spotifyStore';

function DeleteButton() {
  const deleteTrack = useSpotifyStore((state) => state.deleteTrackToPlaylists);

  const handleClickDeleteTrack = () => {
    deleteTrack(
      '1sn2lED7HkCuT82HKTBA62',
      'spotify:track:2fRFwWwZG7Qfkui7GcxTMy',
      'AAAACSuO4N2saEIYgaZxv2d4I28hQO1j ',
    );
  };

  return <button onClick={handleClickDeleteTrack}>삭제하기</button>;
}

export default DeleteButton;
