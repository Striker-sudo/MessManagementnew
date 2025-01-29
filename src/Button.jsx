import React,{useState} from 'react';

function MyComponent() {
  const [foods,setFoods] = useState(["Pizza","Burger","Pasta","Biryani"]);

  function addFood(){
    const food = document.getElementById("food-entry").value;
    // foods.push(food);
    setFoods([...foods,food]);
    document.getElementById("food-entry").value = '';
    }
  function removeItem(index){
    setFoods(foods.filter((food,i) => i !== index));
  }
  return (
    <div>
      <h2>List of Food</h2>
      <ol>
            {foods.map((food,index) => <li key = {index} onClick = {() => removeItem(index)}>{food}</li>)}
      </ol>
      <input id = "food-entry"type = "text" placeholder='Enter food item to add'></input>
      <button onClick = {addFood}>Add</button>
    </div>
  );
}

export default MyComponent