import React from "react";
import { FormEvent,  useState } from "react";
import {
  FormProviderProps,
  useForm,
} from "react-hook-form";

export type itemType = {
  itemId: string;
  itemName: string;
  itemAmount: number;
};

export type useContextOutput = {
  onSubmit: (event: FormEvent) => void;
  handleDelete: (name: string) => void;
  handleEdit: (item: itemType) => void;
  items: itemType[];
  editId: string;
  onSubmitEdit: (event: FormEvent) => void;
  inputValue: { itemName: string; itemAmount: number | undefined };
  handleCancel: () => void;
  register: FormProviderProps["register"];
};

export const useContext = (): useContextOutput => {
  const [items, setItems] = useState<itemType[] | []>([]);
  const [inputValue, setInputValue] = useState({
    itemName: "",
    itemAmount: 0,
  });
  const [editId, setEditId] = useState<string>("");
  const {
    register,
    handleSubmit,
    resetField,
  } = useForm();
  
  const handleDelete = (id: string) => {
    const filteredItems = items.filter((item) => item.itemId !== id);
    setItems(filteredItems);
  };

  const handleEdit = (item: itemType) => {
    setEditId(item.itemId);
  };

  const handleCancel = () => {
    setEditId("");
  };

  const handleGenerateId = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  };

  const handleFormSubmit = React.useMemo(() => {
    return handleSubmit((data) => {
      const json = {
        itemId: handleGenerateId(),
        itemName: data.itemName,
        itemAmount: data.itemAmount,
      };
      setItems([...items, json]);
      resetField("itemName");
      resetField("itemAmount");
    });
  }, [handleSubmit, items, resetField]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleFormSubmit();
  };

  const handleFormSubmitEdit = React.useMemo(() => {
    return handleSubmit((data) => {
      const editedData = {
        itemId: editId,
        itemName: data.name[editId],
        itemAmount: data.amount[editId],
      };
      const json: itemType[] = items.map((item: itemType) => {
        if (item.itemId === editId) {
          return editedData;
        }
        return item;
      });
      setItems(json);
      setEditId("");
      setInputValue({ itemName: "", itemAmount: 0 });
    });
  }, [editId, handleSubmit, items]);

  const onSubmitEdit = (e: FormEvent) => {
    e.preventDefault();
    handleFormSubmitEdit();
  };
  return {
    editId,
    onSubmit,
    items,
    handleDelete,
    handleEdit,
    onSubmitEdit,
    inputValue,
    handleCancel,
    register,
  };
};
