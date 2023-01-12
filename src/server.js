import express from "express";
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views_routes.js"
import {Server} from "socket.io"

import __dirname from "./utils.js"

const app = express();
const httpServer = app.listen(3000, () => console.log(`server listening in port 3000` ))

const io = new Server(httpServer)

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main"
}))

app.set("view engine","hbs")
app.set("views",`${__dirname}/views`)

app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Routers
app.use("/",viewsRouter)

let products = []

//funciones

    function arrayArrange(array, idToStart)
    {
        idToStart = parseInt(idToStart)
        let productsReorderList = array.filter(product => product.id > idToStart)
        array.splice(idToStart)
        
        for (let i = 0; i < productsReorderList.length; i++) 
        {
            productsReorderList[i].id = idToStart + i
            array.push(productsReorderList[i])
        }        
    }




io.on("connection", (socket) =>{
    
    socket.emit("allProducts",products)
    





    socket.on("addProduct",(data) => {
        const product = {
            name: data,
            id:products.length
        }
        products.push(product)
        io.emit("allProducts",products)
    })

    socket.on("deleteProduct",(data) => {
        arrayArrange(products,data)
        
        io.emit("allProducts",products)
    })



    socket.emit("mensaje","hola soy un mensaje")
})
