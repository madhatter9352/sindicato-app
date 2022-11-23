import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetAreas } from '../../services/area';
import { GetInitial_states } from '../../services/initial_state';
import { GetUnion_sectionById } from '../../services/unionSection';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createUnion_section, editUnion_section } from '../../store/reducers/unionSection';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    name: '',
    area: '',
    initial_state: '',
}

export const Union_sectionModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [areas, setAreas] = useState(null);
    const [initial_states, setInitial_states] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createUnion_section(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editUnion_section({
                id,
                name: values.name,
                area: values.area,
                initial_state: values.initial_state
            }));

            dispatch(closeModal());
        }, 1000)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: formValues.name,
            area: formValues.area,
            initial_state: formValues.initial_state
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Este campo es requerido'),
            area: Yup.number().required('Este campo es requerido'),
            initial_state: Yup.number().required('Este campo es requerido')
        }),
        onSubmit: (values) => {
            if(id){
                handleEdit(values);
            } else {
                handleCreate(values);
            }
        }
    });

    useEffect(() => {
        setLoading(true);
        const getareas = async() => {
            const areas = await GetAreas();
            setAreas(areas.results);
            !id && setLoading(false);
        }
        const getSatetes = async() => {
            const states = await GetInitial_states();
            setInitial_states(states.results);
            !id && setLoading(false);
        }

        getareas();
        getSatetes();

        if(id){
            const getUnion_section = async() => {
                try {
                    const union_section = await GetUnion_sectionById(id);
                    setFormValues({
                        name: union_section.data.name,
                        area: (union_section.data.area.id !== undefined) ? union_section.data.area.id : union_section.data.area,
                        initial_state: (union_section.data.initial_state.id !== undefined) ? union_section.data.initial_state.id : union_section.data.initial_state,
                    });
                    setLoading(false);
                } catch (error) {
                    toast.error(`${error.response.statusText}`, {
                        theme: 'colored'
                    });
                    setLoading(false);
                    dispatch(closeModal())
                }
            }

            setTimeout(() => {
                getUnion_section();
            }, 1000)
        }

    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setProps({size: "xl", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    const today = moment().format('D-MM-YYYY');

    return (
        <>
            {
                loading
                    ?
                    <div>
                        <Loader active inline='centered' content='Loading sección' />
                    </div>
                    :
                    <>
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Añadir Donación
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
                                            placeholder="Nombre donación"
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

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="initial_state"
                                            name="initial_state"
                                            as={"select"}
                                            onChange={handleChange}
                                            value={values.initial_state}
                                            isValid={touched.initial_state && !errors.initial_state}
                                            isInvalid={touched.initial_state && !!errors.initial_state}
                                        >
                                            <option>Seleccione un estado inicial...</option>
                                            {
                                                initial_states && initial_states.map((state)=> (
                                                    <option key={state.id} value={state.id}>{state.total_number_workers}</option>
                                                ))
                                            }
                                        </Form.Control>
                                        {
                                            touched.initial_state && errors.initial_state ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.initial_state}
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
                                    content={id ? 'Actualizar': 'Crear'}
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
