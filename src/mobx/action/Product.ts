import connection from "../connection"

export const getProductAction = (page:number,per_page:number):Promise<any[]> => {
    return connection.get(`${process.env.REACT_APP_BACKEND_URL}/api/product?per_page=${per_page}&page=${page}`)
}

export const postProductAction = (data:any):Promise<any[]> => {
    return connection.post(`${process.env.REACT_APP_BACKEND_URL}/api/product`,data,{
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
}

export const updateProductAction = (id:number,data:any):Promise<any[]> => {
    return connection.patch(`${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`,data,{
        headers:{
            "Content-Type":'multipart/form-data'
        }
    })
}

export const deleteProductAction = (id:number):Promise<any[]> => {
    return connection.delete(`${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`)
}

export const importProductAction = ():Promise<any[]> => {
    return connection.get(`${process.env.REACT_APP_BACKEND_URL}/api/import-from-elevania`)
}