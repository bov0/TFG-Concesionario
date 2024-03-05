import React from 'react';
import { Slider, Input, Select, SelectItem, Checkbox } from '@nextui-org/react';

export default function Parametro(props) {
    const renderInput = () => {
        switch (props.tipo) {
            case 'Select':
                return (
                    <div>
                        <h1 className='font-semibold'>{props.nombre}</h1>
                        <Select
                            placeholder={`Seleccione ${props.nombre}`}
                        >
                            {props.opciones.map((opcion, index) => (
                                <SelectItem key={index}>{opcion}</SelectItem>
                            ))}
                        </Select>
                    </div>

                );
            case 'Slider':
                return (
                    <div>
                        <h1 className='font-semibold'>{props.nombre}</h1>
                        <Slider
                            label={props.nombre}
                            step={props.step || 1000}
                            color="foreground"
                            maxValue={props.maxValue || 1}
                            minValue={props.minValue || 0}
                            defaultValue={props.defaultValue || 0}
                            className="max-w-md"
                        />
                    </div>

                );
            case 'Input':
                return (
                    <Input
                        label={props.nombre}
                        type="text"
                        placeholder={`Ingrese ${props.nombre}`}
                    />
                );
            case 'Checkbox':
                return (
                    <div className='flex flex-col flex-wrap'>
                        <h1 className='font-semibold'>{props.nombre}</h1>
                        {props.opciones.map((opcion) => (
                            <Checkbox
                                key={opcion}
                                color="default"
                                label={opcion}
                                defaultValue={props.defaultValue && props.defaultValue.includes(opcion)}
                            >
                                {opcion}
                            </Checkbox>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return <div>{renderInput()}</div>;
}
