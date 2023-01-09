const Expense = require("../model/expense");

exports.getExpense = async (req, res, next) => {
  await Expense.findAll()
    .then((expenses) => {
      console.log(" dsad" + expenses);
      res.status(200).json({ expenses: expenses });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.insertExpense = async (req, res, next) => {
  try {
    const expenseAmount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    if (expenseAmount === "" || description === "" || category === "") {
      throw new Error("All Fields are required");
    } else {
      const expenseData = await Expense.create({
        amount: expenseAmount,
        description: description,
        category: category,
      });
      console.log("expenseData" + expenseData);
      res
        .status(201)
        .json({ message: "expense Data Added", data: expenseData });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.editExpense = async (req, res, next) => {
  try {
    console.log("in edit");
    const updatedAmount = req.body.amount;
    const updatedDescription = req.body.description;
    const updatedCategory = req.body.category;

    const updatedData = await Expense.update(
      {
        amount: updatedAmount,
        description: updatedDescription,
        category: updatedCategory,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log(updatedData);
    res.status(201).json({ message: "updated", data: updatedData });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    console.log("in delete");
    const expense = await Expense.findOne({ where: { id: req.params.id } });
    if (!expense) {
      throw new Error("Expense Not Found");
    } else {
      await expense.destroy();
      res.status(200).json({ message: "expense deleted" });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
};
