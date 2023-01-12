const socket = io()

//ADD

const filterType = document.querySelector("#addProduct")

filterType.addEventListener("change",(event)=>{
    event.preventDefault()
    socket.emit("addProduct", filterType.value)
})


const allProductsRender = document.querySelector("#allProductsAdded")

socket.on("allProducts", (data) =>
{
    
    allProductsRender.innerHTML=`
    <tr>
        <th>Order</th>
        <th>Name</th>
    </tr>`
    data.forEach((product) => {
        const productP = document.createElement("tr")
        
        productP.innerHTML = `        
        <td>${product.id} </td>
        <td>${product.name} </td>        
        `
        allProductsRender.append(productP)
    })

    renderSelect(data)

})



//DELETE


const deleteProduct = document.querySelector("#deleteProduct")

deleteProduct.addEventListener("change",(event)=>{
    event.preventDefault()
    socket.emit("deleteProduct", deleteProduct.value)
})

function renderSelect(data) {
    deleteProduct.innerHTML=""
    console.log(data)
    data.forEach((product) => {
        const productP = document.createElement("option")
        productP.value= product.id
        
        productP.innerHTML = `  ${product.name}
        `
        deleteProduct.append(productP)
    })

}






