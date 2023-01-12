import { Router } from "express";

const router = Router()

router.get("/", (req,res) =>
{
    res.render("index", {
        title:"Proyecto con WebSocket"
    })
})

router.get("/realtimeproducts", (req,res) =>
{
    res.render("changeProducts", {
        title:"Proyecto con WebSocket"
    })
})


export default router