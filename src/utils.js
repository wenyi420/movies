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

export const getCoords = (element, position) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  let point;
  switch (position) {
    case "top left":
      point = {
        x: left + window.pageXOffset,
        y: top + window.pageYOffset,
      };
      break;
    case "top center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + window.pageYOffset,
      };
      break;
    case "top right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + window.pageYOffset,
      };
      break;
    case "center left":
      point = {
        x: left + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset,
      };
      break;
    case "center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset,
      };
      break;
    case "center right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset,
      };
      break;
    case "bottom left":
      point = {
        x: left + window.pageXOffset,
        y: top + height + window.pageYOffset,
      };
      break;
    case "bottom center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + height + window.pageYOffset,
      };
      break;
    case "bottom right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + height + window.pageYOffset,
      };
      break;
  }

  point.width = width;
  point.height = height;
  return point;
}