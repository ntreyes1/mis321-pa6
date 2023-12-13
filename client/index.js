const url = "http://localhost:5122/api/Inventory";

let myInventory = [];
console.log("hey");

async function GetAllInventory() {
  let response = await fetch(url);
  myInventory = await response.json();
  console.log(myInventory);
}

async function handleOnLoad() {
  await GetAllInventory();

  myInventory.sort((a, b) => new Date(a.dateEntered) - new Date(b.dateEntered));

  const tbody = document.getElementById("app");

  myInventory.forEach((Inventory) => {
    if (!Inventory.isDeleted) {
      const row = document.createElement("tr");
      const formattedDate = new Date(Inventory.dateEntered).toISOString().split('T')[0];

      row.innerHTML = `
          <td>${Inventory.carID}</td>
          <td>${Inventory.carMake}</td>
          <td>${Inventory.carModel}</td>
          <td>${Inventory.carMileage}</td>
          <td>${formattedDate}</td>
          <td><button type="button" class="btn btn-warning" onclick="handleVehicleHold(${Inventory.carID})">${Inventory.onHold}</button></td>
          <td><button type="button" class="btn btn-danger" onclick="handleVehicleDelete(${Inventory.carID})">Delete</button></td>`;

      tbody.appendChild(row);
    }
  });

  const formRow = document.createElement("tr");
  formRow.innerHTML = `
    <td colspan="5">
      <form onsubmit="return false">
        <h4 style="color: crimson"><u>Add a Vehicle</u></h4>
        <div class="form-group">
            <label for="carMake">Make:</label><br>
            <input type="text" id="carMake" name="carMake">
        </div>
        <div class="form-group">
            <label for="carModel">Model:</label><br>
            <input type="text" id="carModel" name="carModel">
        </div>
        <div class="form-group">
            <label for="carMileage">Mileage:</label><br>
            <input type="text" id="carMileage" name="carMileage">
        </div>
        <button type="button" class="btn btn-primary" onclick="handleVehicleAdd()">Submit</button>
      </form>
    </td>`;
  tbody.appendChild(formRow);
}

async function handleVehicleAdd()
{
  const transactionDate = new Date();
  const formattedDate = transactionDate.toLocaleDateString('en-CA');

  let Inventory= 
  {
    carMake: document.getElementById('carMake').value,
    carModel: document.getElementById('carModel').value,
    carMileage: document.getElementById('carMileage').value,
    dateEntered: formattedDate,
    onHold: false,
    isDeleted: false

  }
  myInventory.push(Inventory)

   await fetch(url, {
    method: "POST",
    body: JSON.stringify(Inventory),
    headers:
    {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  location.reload();
}

async function handleVehicleDelete(carID) {

  const inventoryToDelete = myInventory.find(Inventory => Inventory.carID === carID);
  if (!inventoryToDelete) return;

  await fetch(`${url}/${carID}`, {
      method: "DELETE",
  });

  myInventory = myInventory.filter(Inventory => Inventory.carID !== carID);

  location.reload();
}

async function handleVehicleHold(carID) {

  const inventoryToHold = myInventory.find(Inventory => Inventory.carID === carID);
  if (!inventoryToHold) return;

  await fetch(`${url}/${carID}`, {
      method: "PUT",
  });

  myInventory = myInventory.filter(Inventory => Inventory.carID !== carID);

  location.reload();
}