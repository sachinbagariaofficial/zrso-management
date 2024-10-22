import { useDispatch } from "react-redux";
import { openModal } from "../features/common/modalSlice";
import { MODAL_BODY_TYPES } from "./globalConstantUtil";

export const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Product",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};
