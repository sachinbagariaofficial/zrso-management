import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";

const INITIAL_LEAD_OBJ = {
  id: null,
  name: "",
  company: "",
  totalQuantity: null, // Corrected the typo here
  availableQuantity: null,
  expireDate: "25/07/2026",
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = () => {
    if (leadObj.name.trim() === "")
      // Corrected field from 'first_name' to 'name'
      return setErrorMessage("Name is required!");
    else if (leadObj.company.trim() === "")
      // Added company check
      return setErrorMessage("Company is required!");
    else {
      let newLeadObj = {
        id: Math.floor(Math.random() * 100),
        name: leadObj.name,
        company: leadObj.company,
        totalQuantity: leadObj.totalQuantity, // Corrected the typo here
        availableQuantity: leadObj.availableQuantity,
        expireDate: leadObj.expireDate,
      };
      dispatch(addNewLead({ newLeadObj }));
      dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.name}
        updateType="name" // Corrected updateType
        containerStyle="mt-4"
        labelTitle="Name" // Changed label title to "Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.company}
        updateType="company" // Corrected updateType
        containerStyle="mt-4"
        labelTitle="Company" // Changed label title to "Company"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.totalQuantity}
        updateType="totalQuantity" // Corrected updateType
        containerStyle="mt-4"
        labelTitle="Total Quantity" // Updated label title
        updateFormValue={updateFormValue}
      />

      <InputText
        type="number"
        defaultValue={leadObj.availableQuantity}
        updateType="availableQuantity" // Corrected updateType
        containerStyle="mt-4"
        labelTitle="Available Quantity" // Updated label title
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
