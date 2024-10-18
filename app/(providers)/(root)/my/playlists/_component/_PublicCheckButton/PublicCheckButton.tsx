'use client';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';

interface PublicCheckButtonProps {
  isChecked: boolean;
  onToggle: () => void; // 부모 컴포넌트에 전달할 토글 함수
}

function PublicCheckButton({ isChecked, onToggle }: PublicCheckButtonProps) {
  return (
    <button onClick={onToggle}>
      <span className="text-3xl opacity-20">
        {isChecked ? <FaCheckSquare /> : <FaSquare />}
      </span>
    </button>
  );
}

export default PublicCheckButton;
