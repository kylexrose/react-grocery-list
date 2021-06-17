import React, { Component } from "react";
import "./GroceryList.css";
import Button from "./common/Button"
export class GroceryList extends Component {
  state = {
    canEdit: false,
    editInput: this.props.item.grocery,
  };
  onHandleEditClick = () => {
    if (this.state.canEdit) {
      this.props.handleEditByID(this.props.item._id, this.state.editInput);
    }
    this.setState((prevState) => {
      return {
        canEdit: !prevState.canEdit,
      };
    });
  };

  onCheckboxClick = () =>{
    this.props.handlePriorityByID(this.props.item._id, this.props.item.priority)
  }

  handleEditOnChange = (e) => {
    this.setState({
      editInput: e.target.value,
    });
  };

  componentDidUpdate = () =>{
    if(this.state.canEdit){
      document.querySelector(`#editInput${this.props.item._id}`).focus();
    }
  }

  render() {
    const { grocery, _id, purchased, priority } = this.props.item;
    const { handleDeleteByID, handlePurchasedByID,} = this.props;
    const { canEdit } = this.state;
    return (
      <div className="grocerylist-div">
        <input id={`checkbox${_id}`} type="checkbox" checked={priority} onChange={this.onCheckboxClick} ></input>
        {canEdit ? (
          <input
            value={this.state.editInput}
            onChange={this.handleEditOnChange}
            id={`editInput${_id}`}
          />
        ) : (
          <li className={`li-style ${purchased && "li-style-purchased"}`}>
            {grocery}
          </li>
        )}

        {canEdit ? (
          <Button
          buttonName="Submit"
          cssid="submit-button"
          clickFunc={() =>this.onHandleEditClick(grocery)}
        />
        ) : (
          <Button
          buttonName="Edit"
          cssid="edit-button"
          clickFunc={() =>this.onHandleEditClick(grocery)}
        />
        )}

        <Button
          buttonName="Purchased"
          cssid="purchased-button"
          clickFunc={() =>handlePurchasedByID(_id, purchased)}
        />
        <Button
          buttonName="Delete"
          cssid="delete-button"
          clickFunc={() =>handleDeleteByID(_id)}
        />
      </div>
    );
  }
}
export default GroceryList;
