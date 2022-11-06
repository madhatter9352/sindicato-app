import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetAreas } from '../../services/area';
import { closeModal } from '../../store/reducers/modal';
import { createSeccionSindical } from '../../store/reducers/seccionSindical';


const initialState = {
    name: '',
    area: '',
}

export const SeccionModal = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [areas, setAreas] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createSeccionSindical(values));
            dispatch(closeModal());
        }, 1000)
    };

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            name: formValues.name,
            area: formValues.area
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
            area: Yup.number().required('Required')
        }),
        onSubmit: (values) => {
            // if(id){
            //     handleEdit(values);    
            // } else {
            //     handleCreate(values);
            // }
            handleCreate(values);
        }
    });

    useEffect(() => {
        setLoading(true);
        GetAreas().then((resp) => {
            setAreas(resp.results);
            setLoading(false);
        })
    }, []);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    console.log(areas)

    return (
        <>
        {
            loading 
            ?
                <div>
                    <Loader active inline='centered' content='Loading seccion' />
                </div>
            :
            <>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Añadir Sección Sindical
                </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>                
                        <div className='mb-3'>
                            <InputGroup>
                                <Form.Control
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Sección Sindical"
                                    onChange={handleChange}
                                    value={values.name}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                {
                                    touched.name && errors.name ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                    ) : ''
                                }
                            </InputGroup>
                        </div>

                        <div className='mb-3'>
                            <InputGroup>
                                <Form.Control
                                    id="area"
                                    name="area"
                                    as={"select"}
                                    onChange={handleChange}
                                    value={values.area}
                                    isValid={touched.area && !errors.area}
                                    isInvalid={touched.area && !!errors.area}
                                >
                                    <option>Seleccione un area...</option>
                                    {
                                        areas && areas.map((area)=> (
                                            <option key={area.id} value={area.id}>{area.name}</option>
                                        ))
                                    }
                                </Form.Control>
                                {
                                    touched.area && errors.area ? (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.area}
                                    </Form.Control.Feedback>
                                    ) : ''
                                }
                            </InputGroup>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            content= 'Close'
                            type='button'
                            onClick={() => handleCloseModal()}
                        />

                        <Button 
                            //content={id ? 'Actualizar': 'Crear'}
                            content={'Crear'}
                            type='submit'
                            primary
                            loading={isSubmitting}
                        />
                    </Modal.Footer>
                </form>
            </> 
        }
        </>
    )
}
