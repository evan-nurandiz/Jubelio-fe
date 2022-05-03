import React from 'react';
import {Oval} from 'react-loader-spinner'
import classNames from 'classnames'

type Props = {
    loading?:boolean
    label:string
    onClick: () => void
    color?:string
    type:'submit' | 'button'
    isFitContainer?:boolean
}

const Button:React.FC<Props> = (props) => {
    return(
        <button
            type={props.type}
            className={classNames(`text-white
            focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg px-5 py-2.5 text-center mr-3 
            md:mr-0 flex gap-4 items-center`,
                props.color ? props.color : 'bg-blue-700',
                props.isFitContainer && 'w-full'
            )}
            onClick={props.onClick}
        >
            {
                props.loading ? 
                <Oval height={25} width={25} color={'white'}/>
                : <p className='mx-auto'>{props.label}</p>
            }
        </button>
    )
};

export default Button;