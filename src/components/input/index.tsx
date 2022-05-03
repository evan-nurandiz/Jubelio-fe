import React from 'react';

type Props = {
    value:string | number
    type?: 'text' | 'number' | 'email'
    label:string
    placeholder:string
    onchange: (e:any) => void
}

const InputText:React.FC<Props> = (props) => {
    return(
        <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {props.label}
            </label>
            <input 
                className="appearance-none block 
                w-full bg-gray-200 text-gray-700 border 
                rounded py-3 px-4 mb-3 leading-tight 
                focus:outline-none focus:bg-white" 
                type="text" 
                required
                placeholder={props.placeholder}
                onChange={props.onchange}
                value={props.value}
            />
        </div>
    )
};

export default InputText;