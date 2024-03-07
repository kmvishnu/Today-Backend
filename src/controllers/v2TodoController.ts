import TodosModel from "../models/todosMongo";

export const addTodo = async (req, res) => {
  try {
    const user = req.user.id;
    const newData = await TodosModel.create({
      name: req.body.data.name,
      details: req.body.data.details ? req.body.data.details : "",
      done: req.body.data.done ? req.body.data.done : false,
      constant: req.body.data.constant ? req.body.data.constant : false,
      user_id: user,
    });

    res.json(newData);
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editTodo = async (req, res) => {
  const data = req.body.data;

  const dataToUpdate = await TodosModel.findOne({_id:data.id});

  if (dataToUpdate) {
    await TodosModel.updateOne(
      { _id: data.id },
      {
        $set: {
          name: req.body.data.name,
          details: req.body.data.details,
          done: req.body.data.done,
        },
      }
    );

    res.json(dataToUpdate);
  } else {
    res.status(404).send("Record not found");
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const dataToDelete = await TodosModel.findOne({_id:id});

    if (dataToDelete) {
      await dataToDelete.deleteOne({_id:id});

      res.json({ message: "Record deleted successfully" });
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const viewAllTodo = async (req, res) => {
  try {
    const user = req.user;
    const allData = await TodosModel.find({
      user_id: user.id,
    });

    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const viewTodo = async (req, res) => {
  const id = req.query.id;

  try {
    const dataToView = await TodosModel.findOne({_id:id});

    if (dataToView) {
      res.json(dataToView);
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const actionTodo = async (req, res) => {
  const data = req.body.data;

  const dataToUpdate = await TodosModel.findOne({_id:data.id});

  if (dataToUpdate) {
    await TodosModel.updateOne(
      { _id: data.id },
      {
        $set: {
          done: req.body.data.done,
        },
      }
    );

    res.json(dataToUpdate);
  } else {
    res.status(404).send("Record not found");
  }
};
