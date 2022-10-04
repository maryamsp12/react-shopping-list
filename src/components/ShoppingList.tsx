import AddItemForm from "./addItem/AddItemForm";
import EditItemForm from "./editItem/EditItemForm";
import logo from "./logo.png";
import "./styles.css";
import { itemType, useContext } from "./useContext";

function ShoppingList() {
  const {
    onSubmit,
    items,
    handleDelete,
    handleEdit,
    editId,
    onSubmitEdit,
    handleCancel,
    register,
  } = useContext();
  return (
    <div className="grid-container">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Shopping list</h1>
      </header>

      <article className="column-header">
        <h2>Product</h2>
        <h2>Price</h2>
        <h2>Action</h2>
      </article>

      {items.length !== 0 ? (
        items.map((item: itemType) =>
          item.itemId !== editId ? (
            <article className="list" key={item.itemId}>
              <p onClick={() => handleEdit(item)}>{item.itemName}</p>
              <p onClick={() => handleEdit(item)}>{item.itemAmount}$</p>
              <button onClick={() => handleDelete(item.itemId)}>remove</button>
            </article>
          ) : (
            <article className="edit-list" key={item.itemId}>
              <EditItemForm item={item} onSubmitEdit={onSubmitEdit} handleCancel={handleCancel} register={register} />
            </article>
          )
        )
      ) : (
        <p>No items added yet</p>
      )}

      <article className="add-new-products">
        <h2>Add New Products</h2>
      </article>

      <article className="add-list">
        <AddItemForm onSubmit={onSubmit} register={register} />
      </article>
    </div>
  );
}

export default ShoppingList;
