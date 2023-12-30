import axios from "axios";

export const addTodo = (req, res) => {
  axios
    .post("http://localhost:3000/todos", { ...req.body.data, done: false })
    .then((resp) => {
      console.log(resp.data);
      return res.status(200).json({ message: "todo added", data: resp.data });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "DB Error" });
    });
};

export const editTodo = (req, res) => {
  const data = req.body.data;

  axios
    .put(`http://localhost:3000/todos/${data.id}/`, {
      name: data.name,
      details: data.details ? data.details : "",
      done: data.done,
    })
    .then((resp) => {
      return res.status(200).json({ message: "edited todo", data: resp.data });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "DB Error" });
    });
};

export const deleteTodo = (req, res) => {
  const id = req.params.id;

  axios
    .delete(`http://localhost:3000/todos/${id}/`)
    .then((resp) => {
      return res.status(200).json({ message: "deleted todo", data: resp.data });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "DB Error" });
    });
};

export const viewAllTodo = (req, res) => {
  axios
    .get("http://localhost:3000/todos")
    .then((resp) => {
      return res.status(200).json({ data: resp.data });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "DB Error" });
    });
};

export const viewTodo = (req, res) => {
  const id = req.query.id;

  axios
    .get(`http://localhost:3000/todos/${id}`)
    .then((resp) => {
      return res.status(200).json({ data: resp.data });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "DB Error" });
    });
};

export const actionTodo = (req, res) => {
  const data = req.body.data;

  axios
    .put(`http://localhost:3000/todos/${data.id}/`, {
      done: data.done,
    })
    .then((resp) => {
      return res.status(200).json({ message: "edited todo", data: resp.data });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "DB Error" });
    });
};
