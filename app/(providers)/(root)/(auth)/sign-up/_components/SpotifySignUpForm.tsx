'use client';

import Button from '@/components/Button';
import { supabase } from '@/supabase/client';
import { FaSpotify } from 'react-icons/fa';
import { Bounce, toast } from 'react-toastify';

function SpotifyLogInPage() {
  const handleClickSpotifyLogIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        scopes:
          'playlist-modify-private playlist-modify-public streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing',
        skipBrowserRedirect: false,
        redirectTo: window.location.origin + '/today',
      },
    });

    if (error) {
      console.error('Error with Spotify login:', error.message);
    }
    toast('🦄 프리미엄 계정으로 로그인 하셨습니다!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  return (
    <Button
      intent="spotify"
      size="lg"
      type="button"
      className="w-[400px] h-[60px] mt-5 flex items-center justify-center py-4 gap-x-3 hover:-translate-y-2 transition-all mx-auto"
      onClick={handleClickSpotifyLogIn}
    >
      <FaSpotify />
      Sign in with Spotify
    </Button>
  );
}

export default SpotifyLogInPage;
