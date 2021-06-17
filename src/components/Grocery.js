import React, { Component } from "react";
import GroceryList from "./GroceryList";
import "./Grocery.css";
import axios from "axios";
import Button from "./common/Button"

export class Grocery extends Component {
  state = {
    groceryList: [],
    groceryInput: "",
    error: ""
  };

  async componentDidMount() {
    try {
      //making a get request to the server
      let allGroceries = await axios.get(
        "http://localhost:3001/api/groceries/get-all-groceries"
      );

      this.setState({
        groceryList: allGroceries.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleGroceryOnChange = (event) => {
    this.setState({
      groceryInput: event.target.value,
    });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    if(this.state.groceryInput === ""){
      this.setState({
        error : "Invalid grocery, must contain information"
      })
      return false
    }else if (this.state.groceryList.findIndex(item => item.grocery === this.state.groceryInput)!== -1){
      this.setState({
        error : "Invalid grocery, must be a unique grocery"
      })
      return false
    }else{
      try{
        let createdGrocery = await axios.post(
          "http://localhost:3001/api/groceries/create-grocery", {
            grocery: this.state.groceryInput,
          }
        );
        console.log(createdGrocery);

        let newArray = [
          ...this.state.groceryList, createdGrocery.data.payload
        ]
        this.setState({
          groceryList:newArray,
          groceryInput: "",
        })
      }catch(e){
        console.log(e)
      }
    }
  };

  handleDeleteByID = async (id) => {
    try{
      let deletedGrocery = await axios.delete(
        `http://localhost:3001/api/groceries/delete-grocery-by-id/${id}`);

      let filteredArray = this.state.groceryList.filter((item) => item._id !== id);
      this.setState({
        groceryList: filteredArray,
      });
      console.log(deletedGrocery)
    }catch(e){
      console.log(e)
    }
  };

  handlePurchasedByID = async (id, purchased) => {
    try{
      let purchasedGrocery = await axios.put(
      `http://localhost:3001/api/groceries/update-grocery-by-id/${id}`, {
        purchased: !purchased,
      });
    let updatedArray = this.state.groceryList.map((item) => {
      if (item._id === id) {
        item.purchased = !item.purchased;
      }
      return item;
    });
    this.setState({
      groceryList: updatedArray,
    });
    console.log(purchasedGrocery)
    }catch(e){
      console.log(e)
    }  
  };

  handleEditByID = async (id, editInput) => {
    try{
      let updatedGrocery = await axios.put(
        `http://localhost:3001/api/groceries/update-grocery-by-id/${id}`, {
          grocery: editInput,
        }
      );
      let updatedGroceryArray = this.state.groceryList.map((item) => {
      if (item._id === id) {
        item.grocery = editInput;
      }
      return item;
      });
      this.setState({
      groceryList: updatedGroceryArray,
      });
      console.log(updatedGrocery)
    }catch(e){
      console.log(e)
    }
  };

  handlePriorityByID = async (id, isPriority) => {
    try{
      await axios.put(
      `http://localhost:3001/api/groceries/update-grocery-by-id/${id}`, {
        priority: !isPriority,
      });
      let allGroceries = await axios.get(
        "http://localhost:3001/api/groceries/get-all-groceries"
      );

      this.setState({
        groceryList: allGroceries.data.payload,
      });
    }catch(e){
      console.log(e)
    }  
  };
  
  sortByDate = async (order) => {
    try {
      let allGroceries = await axios.get(
        `http://localhost:3001/api/groceries/get-all-groceries/sort-by-date/${order}`
      );
      this.setState({
        groceryList: allGroceries.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };

  sortByPurchased = async (bool) => {
    try {
      let allGroceries = await axios.get(
        `http://localhost:3001/api/groceries/get-all-purchased/${bool}`
      );
      this.setState({
        groceryList: allGroceries.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <p className="error">{this.state.error && this.state.error}</p>
        
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit}>
            <input
              name="groceryInput"
              type="text"
              onChange={this.handleGroceryOnChange}
              value={this.state.groceryInput}
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="sorting">
          <ul>
            <li>
              <Button
                buttonName="Sort by Date - Newest to oldest"
                cssid="sort-button"
                clickFunc={() => this.sortByDate(-1)}
              />
            </li>
            <li>
              <Button
                buttonName="Sort by Date - Oldest to newest"
                cssid="sort-button"
                clickFunc={() => this.sortByDate(1)}
              />
            </li>
            <li>
              <Button 
              buttonName="Sort by Purchased"
              clickFunc = {() =>this.sortByPurchased(true)}
              />
            </li>
            <li>
              <Button buttonName="Sort by Not Purchased"
              clickFunc = {() =>this.sortByPurchased(false)}
              />
            </li>
          </ul>
        </div>
        <div className="grocery-div">
          <ul>
            {this.state.groceryList.map((item) => {
              return (
                <GroceryList
                  key={item._id}
                  item={item}
                  handleDeleteByID={this.handleDeleteByID}
                  handlePurchasedByID={this.handlePurchasedByID}
                  handleEditByID={this.handleEditByID}
                  handlePriorityByID={this.handlePriorityByID}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Grocery;