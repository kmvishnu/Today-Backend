import axios from "axios";
import { MongoClient, ServerApiVersion } from 'mongodb';


export const addTodo = (req, res) => {
  axios
    .post("http://localhost:3000/todos", { ...req.body.data, done: false })
    .then((resp) => {
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
  run().catch(console.dir);
  // axios
  //   .get(`http://localhost:3000/todos/${id}`)
  //   .then((resp) => {
  //     return res.status(200).json({ data: resp.data });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return res.status(500).json({ message: "DB Error" });
  //   });


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

const uri = `mongodb+srv://${process.env.mongoUsername}:${process.env.mongoPassword}@cluster0.e8bv6uf.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
