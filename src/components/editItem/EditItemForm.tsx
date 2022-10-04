import { FormEvent } from "react";
import { FormProviderProps } from "react-hook-form";
import "./../styles.css";
import { itemType } from "../useContext";

type propTypes = {
  item: itemType;
  onSubmitEdit: (event: FormEvent) => void;
  register: FormProviderProps["register"];
  handleCancel: () => void; 
};

const EditItemForm = (props: propTypes) => {
    const { register, onSubmitEdit, item, handleCancel} = props;
  return (
    <form onSubmit={onSubmitEdit}>
      <p>
        <input
          key={`name.${item.itemId}`}
          {...register(`name.${item.itemId}`, {
            required: true,
            maxLength: 100,
          })}
          defaultValue={item.itemName}
          type="text"
          className="inputNameField"
          required
        ></input>
      </p>
      <p>
        <input
          key={`amount.${item.itemId}`}
          {...register(`amount.${item.itemId}`, {
            required: true,
            min: 1,
          })}
          defaultValue={item.itemAmount}
          type="number"
          className="inputAmountField"
          required
        ></input>
      </p>
      <p>
        <button className="modify">Modify</button>
        <button className="cancel" onClick={handleCancel}>
          cancel
        </button>
      </p>
    </form>
  );
};

export default EditItemForm;
