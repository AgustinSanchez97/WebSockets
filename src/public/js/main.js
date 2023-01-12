const socket = io()


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
})




