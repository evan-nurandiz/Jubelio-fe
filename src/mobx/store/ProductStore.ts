import {observable, action, makeObservable} from 'mobx';
import {ProductType} from '../../datatype/Products'
import { convertJsonToFormData } from '../../helpers';
import { deleteProductAction, getProductAction, importProductAction, postProductAction, updateProductAction } from '../action/Product';

export class ProductStore {
    constructor() {
        makeObservable(this);
    }
    
    @observable inProgress = false;
    @observable inProgressImportDataFromElevania = false;
    @observable inProgressDelete = false;
    @observable inProgressCreate = false;
    @observable inProgressUpdate = false;
    @observable message = '';
    @observable errors = '';
    @observable page = 1
    @observable total_page = 0
    @observable per_page = 10

    @observable elevanianvalues = {}

    @observable.shallow
    product: Array<ProductType> = []

    @observable 
    currentProduct = {
        id:0,
        name: '',
        sku: '',
        image:'',
        price:0,
        description:''
    };

    @observable 
    value = {
        id:0,
        name: '',
        sku: '',
        image:'',
        price:0,
        description:''
    }

    @action 
    setName(name:string) {
        this.value.name = name;
    }

    @action
    setSku(sku:string) {
        this.value.sku = sku
    }

    @action
    setPrice(price:number) {
        this.value.price = price
    }
    
    @action
    setDescription(description:string) {
        this.value.description = description
    }

    @action
    setCurrentProduct(data:ProductType) {
        this.currentProduct = data
    }

    @action
    setCurrentValue(data:ProductType) {
        this.value = data
    }

    @action
    setUploadProductImage(image:any){
        this.value.image = image
    }

    @action
    emptyValue() {
        this.value = {
            id:0,
            name: '',
            sku: '',
            image: '',
            price:0,
            description:''
        }
    }

    @action
    setCurrentProductImage(image:string) {
        this.currentProduct.image = image
    }

    @action
    nextPage(){
        this.page += 1
    }
    
    @action
    getProduct = async() => {
        this.errors = ''
        if(this.page === 1) {
            this.inProgress = true;
        }
        return getProductAction(this.page, this.per_page)
        .then((response:any) => {
            this.product = this.product.concat(response.data.data) 
            this.total_page = response.data.meta.total_page
        })
        .catch((err) => {
            this.errors = err.response
        }).finally(action(() => {
            this.inProgress = false
        }))
    }

    @action
    postProduct = async() => {
        this.inProgressCreate = true;
        this.errors = '';
        let input = convertJsonToFormData(this.value);
        return postProductAction(input).then((response:any) => {
            this.product = response.data.data.concat(this.product)
            this.message = response.data.message
            this.emptyValue()
        }).catch((err)=>{
            this.errors = err.response.data.message
        }).finally(() => {
            this.errors = ''
            this.inProgressCreate = false;
        })
    }

    @action
    editProduct = async() => {
        this.inProgressUpdate = true;
        this.errors = '';
        let input = convertJsonToFormData(this.value);
        return updateProductAction(this.value.id,input).then((response:any) => {
            let index = this.product.findIndex(data => data.id === response.data.data.id)
            this.product[index] = response.data.data
            this.message = response.data.message
            this.emptyValue()
        }).catch((err)=>{
            this.errors = err.response.data.message
        }).finally(() => {
            this.inProgressUpdate = false;
        })
    }

    @action
    deleteProduct = async(id:number) => {
        this.errors = '';
        this.inProgressDelete = true
        return deleteProductAction(id).then((response:any) => {
            this.product = this.product.filter(data => data.id !== response.data.data[0].id)
            this.message = response.data.message
            this.emptyValue()
        }).catch((err) => {
            this.errors = err.response.data.message
        })
        .finally(action(() => {
            this.inProgressDelete = false
        }))
    }

    @action
    importProductFromElevania = async() => {
        this.errors = ''
        this.inProgressImportDataFromElevania = true
        return importProductAction().then((response:any) => {
            this.message = response.data.data.message
            this.getProduct()
        }).catch((err)=>{
            this.errors = err.response.data.data.message.detail
        })
        .finally(action(() => {
            this.inProgressImportDataFromElevania = false
        }))
    }
}