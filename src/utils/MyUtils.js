import moment from "moment/moment";
import { default as Swal, default as swal } from "sweetalert2";

export const formatVND = (price) => {
  const formatPrice = price.toLocaleString("vi", {
    currency: "VND",
  });
  return formatPrice;
};

export const showNotification = (
  icon,
  title,
  text,
  confirmButtonText,
  callBack
) => {
  swal
    .fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      allowOutsideClick: false,
    })
    .then((result) => {
      if (result.isConfirmed) callBack();
    });
};

export const checkQuantity = (newItem, productQuantity, listCart) => {
  // // const result = listCart.filter((item) => {
  // //   if (item.id.productId === newItem.id.productId) {
  // //     if (item.quantity + newItem.quantity > productQuantity) return item;
  // //   }
  // });
  // console.log(result);
  // return result.length > 0 ? false : true;
};

export const showConfirmDeleteDialog = (positiveAction) => {
  showConfirmDialog("Bạn có chắc chắn muốn xóa không?", "Xóa", positiveAction);
};

export const showConfirmDialog = (title, confirmButtonText, positiveAction) => {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#005fb7",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      positiveAction();
    }
  });
};

/**
 * @description: format date to format dd / mm / yyyy
 * @param {*} date
 * @returns
 */
export const formatDateDisplay = (date, separator = " / ") => {
  return date && moment(date).isValid()
    ? moment(date).format("DD" + separator + "MM" + separator + "YYYY")
    : "";
};

// convert seconds to hh:mm:ss
export const formatTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};

// convert unixtime to hh:mm múi giờ +7
export const formatUnixTime = (unixtime) => {
  return moment.unix(unixtime).format("HH:mm");
};

// convert date to unixtime
export const convertDateToUnixTime = (date) => {
  return moment(date).unix();
};

// Hàm sinh id ngẫu nhiên
export const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
};
