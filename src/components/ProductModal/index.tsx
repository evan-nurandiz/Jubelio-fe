import React, { useEffect, useState } from 'react';
import { Button, InputText } from '..';

type Props = {
    type: 'upload' | 'edit'
    key:number
    name:string
    sku:string
    price:number
    image:string
    description:string
    openModal:boolean
    closeModal: () => void
    onInputProductName: (e:any) => void
    onInputProductSKU: (e:any) => void
    onInputProductPrice: (e:any) => void
    onInputProductDescription: (e:any) => void
    onInputProductImage: (image:any) => void
    deleteProduct:() => void
    onEdit:() => void
    onCreate:() => void
}

const ProductModal:React.FC<Props> = (props) => {
    const [image,setImage] = useState<string>('')
    
    useEffect(() => {
        if(props.type === 'edit') {
            setImage(props.image)
        }
    },[props.type])

    const handleChange = (e:any) => {
        props.onInputProductImage(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <React.Fragment>
            {
                props.openModal && 
                    <div className="flex bg-gray-500/[.5] overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center h-full md:h-full md:inset-0">
                        <div className="relative px-4 w-full max-w-4xl h-full mt-14 md:mt-14 lg:mt-14">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4">
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={props.closeModal}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div className="lg:flex lg:justify-between lg:items-start p-5 ">
                                    <div className="w-1/2 mx-auto mb-[12px] lg:mb-0 lg:w-1/2">
                                        <img src={image} alt="" className="w-full mb-[12px]" />
                                        <div className='w-full lg:w-1/2 mx-auto'>
                                            <label htmlFor="inputImage" className="text-white bg-blue-700 hover:bg-blue-800 
                                            focus:ring-4 focus:outline-none focus:ring-blue-300 
                                            font-medium rounded-lg px-5 py-2.5 text-center mr-3 
                                            md:mr-0 flex justify-center"
                                            >
                                                <p>{image === '' ? 'Tambah Foto' : 'Ganti Foto'}</p>
                                            </label>
                                            <input onChange={handleChange} type='file' hidden id="inputImage"/>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-2/3 px-3 mb-6 md:mb-0 space-y-6">
                                        <div>
                                            <InputText
                                                value={props.name}
                                                label='Product Name'
                                                placeholder='Enter Product Name'
                                                onchange={props.onInputProductName}
                                            />
                                        </div>
                                        <div>
                                            <InputText
                                                value={props.sku}
                                                label='Product SKU'
                                                placeholder='Enter Product SKU'
                                                onchange={props.onInputProductSKU}
                                            />
                                        </div>
                                        <div>
                                            <InputText
                                                value={props.price}
                                                label='Product Price'
                                                placeholder='Enter Product Price'
                                                onchange={props.onInputProductPrice}
                                            />
                                        </div>
                                        <div>
                                            <InputText
                                                value={props.description}
                                                label='Product Description'
                                                placeholder='Enter Product Description'
                                                onchange={props.onInputProductDescription}
                                            />
                                        </div>
                                        <div className='flex lg:gap-6 justify-center'>
                                            <Button
                                                type='button'
                                                label={props.type === 'edit' ? 'Ubah Data' : 'Simpan Data'}
                                                onClick={props.type === 'edit' ? props.onEdit : props.onCreate}
                                                loading={false}
                                            />
                                            {
                                                props.type === 'edit' && (
                                                    <Button
                                                        type='button'
                                                        label={'Hapus Data'}
                                                        onClick={props.deleteProduct}
                                                        loading={false}
                                                        color={'bg-red-600'}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
            }

        </React.Fragment>
    )
};

export default ProductModal;