const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const orders = [
  {
    id: crypto.randomUUID(),
    food: "tacos",
  },
  {
    id: crypto.randomUUID(),
    food: "hot dog",
  },
  {
    id: crypto.randomUUID(),
    food: "nachos",
  },
];
const customers = [
  {
    id: crypto.randomUUID(),
    name: "Timmy",
  },
  {
    id: crypto.randomUUID(),
    name: "Tammy",
  },
  {
    id: crypto.randomUUID(),
    name: "Tommy",
  },
];

app.get("/", (req, res) => {
  res.send("get request to /!");
});

app.get("/cats", (req, res) => {
  console.log("server log");
  res.send("meow");
});

//read
app.get("/orders", (req, res) => {
  res.json(orders);
});
//create
app.post("/orders", (req, res) => {
  console.log(req.body);
  orders.push({
    id: crypto.randomUUID(),
    food: req.body.food,
  });
  res.send(`your ${req.body.food} coming right up!`);
});
//delete
app.delete("/orders/:id", (req, res) => {
  const idx = orders.findIndex((order) => {
    return order.id == req.params.id;
  });
  console.log(idx);
  if (idx < 0) {
    return res.send("sorry dood, we dont have that order");
  } else {
    const pickedUp = orders.splice(idx, 1);
    res.send(`Enjoy your ${pickedUp[0].food}!`);
  }
});
//update
app.put("/orders/:id", (req, res) => {
  const idx = orders.findIndex((order) => {
    return order.id == req.params.id;
  });
  console.log(idx);
  if (idx < 0) {
    return res.send("sorry dood, we dont have that order");
  } else {
    orders[idx].food = req.body.newfood;
    res.send(`no worries, well get that ${req.body.newfood} going for ya!`);
  }
});

//read
app.get("/customers", (req, res) => {
  res.json(customers);
});
//create
app.post("/customers", (req, res) => {
  console.log(req.body);
  customers.push({
    id: crypto.randomUUID(),
    name: req.body.name,
  });
  res.send(`welcome, ${req.body.name}!`);
});
//delete
app.delete("/customers/:id", (req, res) => {
  const idx = customers.findIndex((customer) => {
    return customer.id == req.params.id;
  });
  console.log(idx);
  if (idx < 0) {
    return res.send("sorry dood, they dont work here!");
  } else {
    const quit = customers.splice(idx, 1);
    res.send(`We will miss you, ${quit[0].name}!`);
  }
});
//update
app.put("/customers/:id", (req, res) => {
  const idx = customers.findIndex((customer) => {
    return customer.id == req.params.id;
  });
  console.log(idx);
  if (idx < 0) {
    return res.send("sorry dood, they dont work here!");
  } else {
    customers[idx].name = req.body.newname;
    res.send(`no sweat, ill call you  ${req.body.newname} going forward!`);
  }
});

app.listen(PORT, () => {
  console.log(`listenin on port ${PORT}`);
});
