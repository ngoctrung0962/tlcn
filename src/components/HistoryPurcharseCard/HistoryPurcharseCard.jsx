import React from "react";
import { formatDateDisplay } from "../../utils/MyUtils";
import orderApi from "../../api/orderApi";
import { useState } from "react";
import ModalRecept from "./components/ModalRecept";
import Swal from "sweetalert2";

export default function HistoryPurcharseCard({ historypurcharse }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState();
  const hanleExitModal = () => {
    setShowModal(false);
    setDataModal();
  };
  const handleRecept = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getOrderById(historypurcharse?.id);
      if (res.errorCode == "") {
        setShowModal(true);

        setDataModal(res.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: res.message,
        });
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <div className="card d-flex flex-row historypurcharse__card ">
      {showModal && (
        <ModalRecept dataOrder={dataModal} hanleExitModal={hanleExitModal} />
      )}
      <div className="btn__recept__order">
        <button
          className="btn__recept__order"
          onClick={() => handleRecept(historypurcharse?.id)}
          disabled={loading}
        >
          Recept
          <i class="fas fa-receipt"></i>
          {loading && (
            <div
              className="spinner-border spinner-border-sm mt-3"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </div>
      <div className="card-body">
        <p className="card-text historypurcharse__caption">
          <strong>Mã đơn:</strong> {historypurcharse?.id}
        </p>
        <p className="card-text historypurcharse__caption">
          <strong>Tổng tiền:</strong> {historypurcharse?.totalPrice}
        </p>
        <p className="card-text historypurcharse__caption">
          <strong>Ngày mua:</strong>
          {formatDateDisplay(historypurcharse?.createDate)}
        </p>
        <p className="card-text historypurcharse__caption">
          <strong>Phương thức thanh toán:</strong>
          {historypurcharse?.paymentName}
        </p>
      </div>
    </div>
  );
}
