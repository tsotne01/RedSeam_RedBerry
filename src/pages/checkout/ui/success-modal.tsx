import SuccessIcon from "../../../assets/icons/succsess_icon.png";
import CloseIcon from "../../../assets/icons/close_icon.png";

interface ISuccess {
  onClose: () => void;
  onRedirect: () => void;
}

function SuccessModal({ onClose, onRedirect }: ISuccess) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-300/40 z-99">
      <div className="top-1/2 left-1/2 -translate-1/2 z-99 relative flex justify-center items-center bg-white w-[876px] h-[590px] shadow-2xs">
        <button onClick={onClose} className="absolute top-[30px] right-[30px]">
          <img src={CloseIcon} alt="close" />
        </button>

        <div className="w-[233px] flex justify-center flex-col items-center">
          <img className="mb-[40px]" src={SuccessIcon} alt="success" />
          <h2 className="font-semibold text-[42px] mb-[16px] text-[#10151F] font-poppins">
            Congrats!
          </h2>
          <p className="text-sm text-[#3E424A] mb-[74px]">
            Your order is placed successfully!
          </p>
          <button
            onClick={onRedirect}
            className="w-[214px] h-[41px] rounded-[10px] cursor-pointer font-poppins font-medium flex justify-center items-center bg-[#FF4000] text-white"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export { SuccessModal };
