interface ButtonProps {
  content: string;
  width: string;
  height: string;
}

/**
 *
 * 크기 조정시 w, h 붙여서 작성 예) w-[100px]
 * content 무조건 입력하기
 */
function Button(props: ButtonProps) {
  return (
    <button
      className={` ${props.width} ${props.height} rounded-md bg-gray-500 text-white brightness-95 active:bg-slate-700 transition-all`}
    >
      {props.content}
    </button>
  );
}

export default Button;
