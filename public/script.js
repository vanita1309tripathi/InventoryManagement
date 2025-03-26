function deleteProduct(id){
    const result=confirm("Do you want to delete this product?");
    if(result){
        fetch('/delete/'+id,{
            method:"POST"
        }).then((res)=>{
            if(res.ok){
                location.reload();
            }
        })
    }
}