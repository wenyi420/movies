import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const isMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const showLoadingAlert = (text) => {
  Swal.fire({
    title: text,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const showErrorAlert = ({ title, text } = {}) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const showSuccessAlert = ({ title, text } = {}) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000,
    }).then(() => resolve());
  });
};
