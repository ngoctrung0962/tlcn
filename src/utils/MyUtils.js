import axios from "axios";
import { callApi } from "./callApi";
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const formatVND = (price) => {
    const formatPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    return formatPrice;
}

export const showNotification = (icon, title, text, confirmButtonText, callBack) => {
    swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        allowOutsideClick: false
    })
        .then(result => {
            if (result.isConfirmed)
                callBack();
        })
}

export const checkQuantity = (newItem, productQuantity, listCart) => {
    console.log(newItem, productQuantity, listCart);
    const result = listCart.filter(item => {
        if (item.id.productId === newItem.id.productId) {
            if (item.quantity + newItem.quantity > productQuantity)
                return item;
        }
    })
    console.log(result);
    return result.length > 0 ? false : true;
}

