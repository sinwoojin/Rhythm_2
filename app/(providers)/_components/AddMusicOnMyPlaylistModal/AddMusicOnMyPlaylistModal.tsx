import { useModalStore } from '@/zustand/modalStore';
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

function AddMusicOnMyPlaylistModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleClickCloseModal = () => {
    closeModal();
  };
  const handleClickAddMusicButton = () => {
    // 여기에 노래 추가하는 코드 적어주면 됨
    toast.success(`1곡을 (노래 추가한 플리 이름)에 추가하였습니다.`);
  };
  return (
    <div
      className="fixed top-[35%] left-1/2 -translate-x-1/2 bg-rhythm text-white w-[340px] rounded-md max-h-52 overflow-auto scrollbar-hide"
      onClick={(e) => e.stopPropagation()}
    >
      <IoCloseOutline
        className="absolute right-3 top-3 w-7 h-7 text-white/80 cursor-pointer"
        onClick={handleClickCloseModal}
      />
      <div className="bg-white/20 p-6 w-full flex flex-col">
        <h2 className="font-semibold mb-7 mt-3 text-center">
          내 플레이리스트에 추가
        </h2>
        <ul className="flex flex-col">
          {/* {내 플레이리스트들을 받아온 배열.map((playlist) => (
          <li className="hover:bg-white/10">
            <button
              className="flex items-center gap-x-3 px-4 py-1"
              onClick={handleClickAddMusicButton}
            >
              <div className="w-10 h-10 text-white/70 bg-black/10">
                <IoIosAddCircleOutline className="w-full h-full p-2" />
              </div>
              <div className="flex flex-col text-start">
                <p className="line-clamp-1 text-white/90 text-sm">
                  // {playlist.name}
                </p>
                <p className="line-clamp-1 text-white/30 text-xs">
                // {playlist.length}
                </p>
              </div>
            </button>
          </li>))} */}
        </ul>
      </div>
    </div>
  );
}

export default AddMusicOnMyPlaylistModal;
