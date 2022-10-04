
import { FormEvent } from "react";
import { FormProviderProps } from "react-hook-form";
import "./../styles.css";

type propTypes = {
  onSubmit: (event: FormEvent) => void;
  register: FormProviderProps["register"];
}
const AddItemForm = (props: propTypes) => {
  const { register, onSubmit} = props;
  return (
        <form onSubmit={onSubmit}>
          <p>
            <input
              {...register("itemName", {
                maxLength: 100
              })}
              type="text"
              className="inputNameField"
              placeholder="name"
              required
            ></input>
          </p>
          <p>
            <input
              {...register("itemAmount", {
                min: 1,
              })}
              type="number"
              className="inputAmountField"
              placeholder="amount"
              required
            ></input>{` $`}
          </p>
          <p>
            <button>add</button>
          </p>
        </form>
  );
}

export default AddItemForm;