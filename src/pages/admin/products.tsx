import { useObserver } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, ProductCard, ProductModal, Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import {useRootStore} from '../../mobx/index'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductType } from '../../datatype/Products';
import { autorun } from 'mobx';
import { toast } from 'react-toastify';
import {Oval} from 'react-loader-spinner'


type ProductsPageProps = {}

const ProductsPage:React.FC<ProductsPageProps> = (props) => {
    const navigate = useNavigate();

    const [openModal,setOpenModal] = useState<boolean>(false);
    const {productStore, authStore} = useRootStore()
    
    const loadProduct = useCallback(async () => {
        await productStore.getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productStore,productStore.page]);

    useEffect(() => {
        loadProduct()
    },[loadProduct])

    useEffect(() => {
        if(productStore.message !== '') {
            toast.success(productStore.message)
            setOpenModal(false)
        }
    },[productStore.message])

    useEffect(() => {
        autorun(() => {
            if(productStore.errors !== '') {
                toast.error(productStore.errors)
            }
        })
    },[productStore.errors])
    
    const onEditProduct = (data:ProductType) => {
        setOpenModal(true)
        productStore.setCurrentValue(data)
    }

    const EditProductHandler = () => {
        productStore.editProduct()
    }

    const CreateProductHandler = () => {
        productStore.postProduct()
    }

    const DeleteProductHandler = () => {
        productStore.deleteProduct(productStore.value.id).then(() => {
            setOpenModal(false);
        })
    }
    
    return useObserver(() => (
        <>
            <Navbar onLogout={() => {
                authStore.logout()
                navigate('/auth/login')
            }}/>
            <div className='px-[12px] lg:px-0 lg:w-5/6 lg:gap-[20px] lg:mx-auto py-[24px]'>
                <div className='md:flex lg:flex md:justify-between lg:justify-between'>
                    <div className='mb-[12px] md:w-1/3 lg:w-1/4 lg:mb-0'>
                        <Button
                            type='button'
                            isFitContainer
                            label='Fetch Data From Elevania'
                            onClick={() => productStore.importProductFromElevania()}
                            loading={false}
                        />
                    </div>
                    <div className='md:w-1/3 lg:w-1/4'>
                        <Button
                            type='button'
                            isFitContainer
                            label='Tambah Data'
                            onClick={() => {
                                productStore.emptyValue()
                                setOpenModal(!openModal)
                            }}
                            loading={false}
                        />

                    </div>
                </div>
                {
                    productStore.inProgressImportDataFromElevania && (
                        <div className='flex justify-center mt-[48px]'>
                            <Oval color={'white'}/>
                        </div>
                    )
                }
                {
                    !productStore.inProgress && productStore.product !== undefined && (
                        <InfiniteScroll 
                            dataLength={productStore.product.length} 
                            next={() => productStore.nextPage()} 
                            hasMore={productStore.page < productStore?.total_page ? true : false}
                            loader={<h4>Loading...</h4>}
                        >
                            <div className='mx-auto grid grid-cols-2 py-[24px] gap-[10px] lg:gap-[20px] lg:grid-cols-3 '>
                                {
                                    productStore.product.map((data,i) => (
                                        <div key={i} onClick={() => onEditProduct(data)}>
                                            <ProductCard 
                                                name={data.name} 
                                                description={data.description}
                                                sku={data.sku}
                                                price={data.price}
                                                image={`${process.env.REACT_APP_BACKEND_FILE_URL +'/'+ data.image}`}
                                            />
                                        </div>
                                    ))
                                }    
                            </div>
                        </InfiniteScroll>
                    )
                }
                {
                    productStore.product.length === 0 && (
                        <p className='text-center lg:text-3xl'>Data Kosong Klik Tombol Fetch dahulu untuk medapatkan data dari elevania</p>
                    )
                }
            </div>
            <ProductModal 
                onCreate={CreateProductHandler}
                onEdit={EditProductHandler}
                type={productStore.value.id === 0 ? 'upload' : 'edit'}
                name={productStore.value.name}
                sku={productStore.value.sku}
                price={productStore.value.price}
                description={productStore.value.description}
                key={productStore.value.id}
                image={`${process.env.REACT_APP_BACKEND_FILE_URL +'/'+ productStore.value.image}`}
                openModal={openModal} 
                closeModal={() => {
                    setOpenModal(!openModal)
                }}
                onInputProductName={(e) => productStore.setName(e.target.value)}
                onInputProductSKU={(e) => productStore.setSku(e.target.value)}
                onInputProductPrice={(e) => productStore.setPrice(e.target.value)}
                onInputProductDescription={(e) => productStore.setDescription(e.target.value)}
                onInputProductImage={(image) => productStore.setUploadProductImage(image)}
                deleteProduct={DeleteProductHandler}
            />
        </>
    ))

};

export default ProductsPage;