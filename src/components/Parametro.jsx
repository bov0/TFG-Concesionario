import React,{ useState } from 'react';
import { Slider, Input, Select, SelectItem, Checkbox } from '@nextui-org/react';

export default function Parametro(props) {
    const { tipo, nombre, opciones, onChange, variant } = props;
    const [timeoutId, setTimeoutId] = useState(null);

    const handleSelectChange = (event) => {
        if (onChange) {
            onChange(event);
        }
    };

    const handleCheckboxChange = (value, checked) => {
        onChange({ target: { value, checked } }); // Simulamos un evento con la estructura adecuada
    };

    const handleSliderChange = (newValue) => {
        // Si hay un temporizador en ejecución, lo limpiamos
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Establecemos un temporizador para actualizar el valor después de 2 segundos
        const id = setTimeout(() => {
            onChange({ target: { value: newValue } });
        }, 2000);

        // Guardamos el ID del temporizador
        setTimeoutId(id);
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
                            onChange={handleSelectChange}
                            variant={variant}
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
                            step={props.step}
                            color="foreground"
                            maxValue={props.maxValue}
                            minValue={props.minValue}
                            defaultValue={props.defaultValue}
                            className="max-w-md"
                            onChange={handleSliderChange}
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
                                value={opcion}
                                onChange={(checked) => handleCheckboxChange(opcion, checked)}
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