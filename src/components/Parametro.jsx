import React from 'react';
import { Slider, Input, Select, SelectItem, Checkbox } from '@nextui-org/react';

export default function Parametro(props) {
    const { tipo, nombre, opciones, onChange } = props;

    const handleSelectChange = (event) => {
        if (onChange) {
            onChange(event);
        }
    };

    const handleCheckboxChange = (value, checked) => {
        onChange({ target: { value, checked } }); // Simulamos un evento con la estructura adecuada
    };

    const handleSliderChange = (newValue) => {
        // Construye un objeto de evento simulado
        const simulatedEvent = {
            target: {
                value: newValue
            }
        };
        onChange(simulatedEvent);
    };

    const renderInput = () => {
        switch (tipo) {
            case 'Select':
                return (
                    <div>
                        <h1 className='font-semibold'>{nombre}</h1>
                        <Select
                            placeholder={`Seleccione ${nombre}`}
                            aria-label={`Seleccione ${nombre}`}
                            onChange={handleSelectChange} // Usar handleSelectChange en lugar de props.onChange directamente
                        >
                            {opciones.map((opcion) => (
                                <SelectItem key={opcion} value={opcion}>{opcion}</SelectItem>
                            ))}
                        </Select>
                    </div>
                );
            case 'Slider':
                return (
                    <div>
                        <h1 className='font-semibold'>{nombre}</h1>
                        <Slider
                            label={nombre}
                            step={props.step || 1000}
                            color="foreground"
                            maxValue={props.maxValue || 1}
                            minValue={props.minValue || 0}
                            defaultValue={props.defaultValue || 0}
                            className="max-w-md"
                            onChange={handleSliderChange} // Usar el método de manejo de cambio genérico para los sliders
                        />
                    </div>
                );
            case 'Input':
                return (
                    <Input
                        label={nombre}
                        type="text"
                        placeholder={`Ingrese ${nombre}`}
                    />
                );
            case 'Checkbox':
                return (
                    <div className='flex flex-col flex-wrap'>
                        <h1 className='font-semibold'>{nombre}</h1>
                        {opciones.map((opcion) => (
                            <Checkbox
                                key={opcion}
                                color="default"
                                label={opcion}
                                value={opcion} // Añade el valor del checkbox
                                onChange={(checked) => handleCheckboxChange(opcion, checked)} // Usa la función de manejo de cambio de checkbox
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