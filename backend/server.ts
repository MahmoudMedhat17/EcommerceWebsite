import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";
import {Express} from "express";



const app : Express = jsonServer.create();
const router = jsonServer.router("db.json");
const middleWare = jsonServer.defaults();



app.use(cors());
app.use(middleWare());
app.db = router.db;

app.use(auth as any);
app.use(router);

const PORT = 5000;

app.listen(PORT,()=>{
      console.log(`✅ JSON Server Auth running on http://localhost:${PORT}`);

});

