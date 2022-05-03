import React from 'react';
import { maskedMoney } from '../../helpers';

type Props = {
    name:string
    description:string
    sku:string
    price:number
    image:string
}

const ProductCard:React.FC<Props> = (props) => {
    return(
        <div className="max-w-sm h-full rounded overflow-hidden shadow-lg">
            <img className="w-full" src={props.image} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 font-semibold text-lg">
                {props.sku}
                </p>
                <p className="text-gray-700 text-base">
                {props.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{maskedMoney(props.price)}</span>
            </div>
        </div>
    )
};

export default ProductCard;