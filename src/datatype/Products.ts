export type ProductType = {
    id: number,
    name: string,
    sku: string,
    image: string,
    price: number,
    description: string,
    elevania_id: string,
    created_on: Date,
    updated_at: Date
};

export type MetaType = {
    total: number,
    page:number,
    per_page:number,
    total_page:number
};