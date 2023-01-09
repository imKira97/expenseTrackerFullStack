const myForm = document.getElementById("myForm");
//ul
const expenseList = document.getElementById("expenseList");

let editExpenseId = null;
//to display message

myForm.addEventListener("submit", saveUser);

//onDomContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:2000/")
    .then((res) => {
      console.log("res21");
      for (let i = 0; i < res.data.expenses.length; i++) {
        console.log(res.data.expenses[i]);
        toCreateListItem(res.data.expenses[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function saveUser(e) {
  e.preventDefault();

  let expenseDetails = {
    amount: document.getElementById("expenseAmount").value,
    description: document.getElementById("desc").value,
    category: document.getElementById("selectCategory").value,
  };
  console.log("obj " + expenseDetails.category);

  if (editExpenseId != null) {
    axios
      .put(
        `http://localhost:2000/expense/addExpense/${editExpenseId}`,
        expenseDetails
      )
      .then((res) => {
        console.log(res);
        toCreateListItem(expenseDetails);
      })
      .catch((err) => {
        console.lof(err);
      });
  } else {
    axios
      .post("http://localhost:2000/expense/addExpense", expenseDetails)
      .then((res) => {
        console.log(res);
        toCreateListItem(expenseDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function toCreateListItem(expenseData) {
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(
      `${expenseData.amount} : ${expenseData.description} : ${expenseData.category}`
    )
  );

  //delete Button
  var deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.id = "deleteExpense";
  deleteButton.class = "btn btn-warning";
  deleteButton.addEventListener("click", function () {
    axios
      .delete(`http://localhost:2000/expense/deleteExpense/${expenseData.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    li.remove();
  });
  li.appendChild(deleteButton);

  //edit button
  var editButton = document.createElement("input");
  editButton.type = "button";
  editButton.id = "editExpense0";
  editButton.value = "Edit";
  editButton.class = "btn btn-secondary";
  editButton.addEventListener("click", function () {
    document.getElementById("expenseAmount").value = expenseData.amount;
    document.getElementById("desc").value = expenseData.description;
    document.getElementById("selectCategory").value = expenseData.category;
    editExpenseId = expenseData.id;
    li.remove();
  });
  li.appendChild(editButton);
  expenseList.appendChild(li);
}
