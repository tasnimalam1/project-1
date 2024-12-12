require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lszuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
    // await client.connect();

    // Connect to the "VisaDB" database and access its "visaData" collection
    const database = client.db("VisaDB");
    const visaCollection = database.collection("visaData");

    // visa application DB
    const visaApplicationCollection = client.db("VisaDB").collection("visaApplicationData");

    // visa data
    app.post('/visas', async(req,res)=>{
        const newVisa = {
          ...req.body,
          createdAt: new Date(),
        };
        console.log(newVisa)
        const result = await visaCollection.insertOne(newVisa);
        res.send(result);
    })

    app.get('/visas', async(req,res)=>{
        const cursor = visaCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // Get the latest 6 visas
    app.get('/visas/latest', async (req, res) => {
        const latestVisas = await visaCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(6)
          .toArray();  
        res.status(200).json(latestVisas);
      
  });

    app.get('/visas/:id', async(req,res)=>{      
        const id = req.params.id;        
        const query = { _id: new ObjectId(id) };
        const result = await visaCollection.findOne(query);
        res.send(result);
    })


    // Visa application apis

    app.post('/application', async(req,res)=>{
        const newApplication = req.body;
        console.log(newApplication);
        const result = await visaApplicationCollection.insertOne(newApplication);
        res.send(result);
    })

    app.get('/application', async(req,res)=>{
      const cursor = visaApplicationCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

  app.get("/application/:email", async (req, res) => {
    const email = req.params.email;
      const applications = await visaApplicationCollection.find({ email }).toArray();
      res.status(200).json(applications);     
  });

  // delete operation : My visa application section cancel button functionality
  app.delete("/application/cancel/:id", async (req, res) => {
    const { id } = req.params;
      const result = await visaApplicationCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result)
      
  });

  // delete operation : My added visa section delete button functionality
  app.delete("/application/delete/:id", async (req, res) => {
    const id  = req.params.id;
    const query = { _id: new ObjectId(id) };
      const result = await visaApplicationCollection.deleteOne(query);
      res.send(result);
      
  });


  //Update Visa
  app.put("/application/update/:id", async (req, res) => {
    const  id  = req.params.id;
    const query = {_id: new ObjectId(id)};
    const updatedVisa = req.body;
    const update = {
      $set: {
        visaType: updatedVisa.visaType,
        processingTime: updatedVisa.processingTime,
        fee: updatedVisa.fee,
        validity: updatedVisa.validity,
        applicationMethod: updatedVisa.applicationMethod,
        appliedDate: updatedVisa.appliedDate,
        firstName: updatedVisa.firstName,
        lastName: updatedVisa.lastName,
      },
    };
    const result = await visaApplicationCollection.updateOne(query,update)
    res.send(result);
  });
  

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req,res)=>{
    res.send('server running')
})

app.listen(port, ()=> {
    console.log(`server running on port: ${port}`)
})