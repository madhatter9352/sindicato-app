import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetInitial_stateById } from '../../services/initial_state';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createInitial_state, editInitial_state } from '../../store/reducers/initial_state';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    total_number_workers: '',
    total_number_affiliates: '',
    gross_potential: '',
    net_potential: '',
    accumulated_ten_percent: '',
    fully_committed: '',
    amount : '',
    name: '',
    year: moment().year(),
}

export const Initial_stateModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [areas, setAreas] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createInitial_state(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editInitial_state({
                id,
                total_number_workers: values.total_number_workers,
                total_number_affiliates: values.total_number_affiliates,
                gross_potential: values.gross_potential,
                net_potential: values.net_potential,
                accumulated_ten_percent: values.accumulated_ten_percent,
                fully_committed: values.fully_committed,
                amount: values.amount,
                name: values.name,
                year: values.year
            }));

            dispatch(closeModal());
        }, 1000)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            total_number_workers: formValues.total_number_workers,
            total_number_affiliates: formValues.total_number_affiliates,
            gross_potential: formValues.gross_potential,
            net_potential: formValues.net_potential,
            accumulated_ten_percent: formValues.accumulated_ten_percent,
            fully_committed: formValues.fully_committed,
            amount: formValues.amount,
            name: formValues.name,
            year: formValues.year
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            total_number_workers: Yup.number().required('Este campo es requerido').integer("Este campo debe ser un entero").min(1, 'Este campo debe ser mayor a 0'),
            total_number_affiliates: Yup.number().required('Este campo es requerido').integer("Este campo debe ser un entero").min(1, 'Este campo debe ser mayor a 0'),
            gross_potential: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            net_potential: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            accumulated_ten_percent: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            fully_committed: Yup.number().required('Este campo es requerido').integer("Este campo debe ser un entero").min(1, 'Este campo debe ser mayor a 0'),
            amount: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            year: Yup.number().required('Este campo es requerido').integer("Este campo debe ser un entero").min(2000, 'Este campo debe ser mayor a 2000'),
            name: Yup.string().required('Este campo es requerido'),
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
        if(id){
            setLoading(true);
            const getInitial_state = async() => {
                try {
                    const initial_state = await GetInitial_stateById(id);
                    setFormValues({
                        total_number_workers: initial_state.data.total_number_workers,
                        total_number_affiliates: initial_state.data.total_number_affiliates,
                        gross_potential: initial_state.data.gross_potential,
                        net_potential: initial_state.data.net_potential,
                        accumulated_ten_percent: initial_state.data.accumulated_ten_percent,
                        fully_committed: initial_state.data.fully_committed,
                        amount: initial_state.data.amount,
                        name: initial_state.data.name,
                        year: initial_state.data.year
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
                getInitial_state();
            }, 1000)
        }

    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setProps({size: "md", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }


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
                                Añadir estado Inicial
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
                                            placeholder="Alias"
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
                                            id="total_number_workers"
                                            name="total_number_workers"
                                            type="number"
                                            placeholder="Total de trabajadores"
                                            onChange={handleChange}
                                            value={values.total_number_workers}
                                            isValid={touched.total_number_workers && !errors.total_number_workers}
                                            isInvalid={touched.total_number_workers && !!errors.total_number_workers}
                                        />
                                        {
                                            touched.total_number_workers && errors.total_number_workers ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.total_number_workers}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="total_number_affiliates"
                                            name="total_number_affiliates"
                                            type="number"
                                            placeholder="Total de afiliados"
                                            onChange={handleChange}
                                            value={values.total_number_affiliates}
                                            isValid={touched.total_number_affiliates && !errors.total_number_affiliates}
                                            isInvalid={touched.total_number_affiliates && !!errors.total_number_affiliates}
                                        />
                                        {
                                            touched.total_number_affiliates && errors.total_number_affiliates ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.total_number_affiliates}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="gross_potential"
                                            name="gross_potential"
                                            type="number"
                                            placeholder="Potencial en bruto"
                                            onChange={handleChange}
                                            value={values.gross_potential}
                                            isValid={touched.gross_potential && !errors.gross_potential}
                                            isInvalid={touched.gross_potential && !!errors.gross_potential}
                                        />
                                        {
                                            touched.gross_potential && errors.gross_potential ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.gross_potential}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="net_potential"
                                            name="net_potential"
                                            type="number"
                                            placeholder="Potencial en neto"
                                            onChange={handleChange}
                                            value={values.net_potential}
                                            isValid={touched.net_potential && !errors.net_potential}
                                            isInvalid={touched.net_potential && !!errors.net_potential}
                                        />
                                        {
                                            touched.net_potential && errors.net_potential ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.net_potential}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="accumulated_ten_percent"
                                            name="accumulated_ten_percent"
                                            type="number"
                                            placeholder="Acumulado 10%"
                                            onChange={handleChange}
                                            value={values.accumulated_ten_percent}
                                            isValid={touched.accumulated_ten_percent && !errors.accumulated_ten_percent}
                                            isInvalid={touched.accumulated_ten_percent && !!errors.accumulated_ten_percent}
                                        />
                                        {
                                            touched.accumulated_ten_percent && errors.accumulated_ten_percent ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.accumulated_ten_percent}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="fully_committed"
                                            name="fully_committed"
                                            type="number"
                                            placeholder="Comprometidos"
                                            onChange={handleChange}
                                            value={values.fully_committed}
                                            isValid={touched.fully_committed && !errors.fully_committed}
                                            isInvalid={touched.fully_committed && !!errors.fully_committed}
                                        />
                                        {
                                            touched.fully_committed && errors.fully_committed ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.fully_committed}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            placeholder="Monto"
                                            onChange={handleChange}
                                            value={values.amount}
                                            isValid={touched.amount && !errors.amount}
                                            isInvalid={touched.amount && !!errors.amount}
                                        />
                                        {
                                            touched.amount && errors.amount ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.amount}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="year"
                                            name="year"
                                            type="number"
                                            placeholder="Año"
                                            onChange={handleChange}
                                            value={values.year}
                                            isValid={touched.year && !errors.year}
                                            isInvalid={touched.year && !!errors.year}
                                        />
                                        {
                                            touched.year && errors.year ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.year}
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
