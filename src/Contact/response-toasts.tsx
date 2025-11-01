import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successToast = () => {
    toast.success("Xabaringiz muvaffaqiyatli yuborildi", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        className:
            "bg-gradient-to-r from-[#0A2E6E] to-[#0E47A1] text-white font-medium px-4 py-3 rounded-lg shadow-lg border border-blue-700",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

const errorToast = () => {
    toast.error("Xabarni yuborishda xatolik yuz berdi", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export { successToast, errorToast };
