import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetInitial_states } from '../../services/initial_state';
import { GetAffiliateById } from '../../services/affiliate';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createAffiliate, editAffiliate } from '../../store/reducers/affiliate';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    name: '',
    high_date: '',
    low_date: '',
    initial_state: '',
    salary: 0,
    monthly_quota: 0,
    annual_quota: 0,
    contribution_commitment: 0,
    month_contribution: 0
}

export const AffiliateModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [initial_states, setInitial_states] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createAffiliate(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editAffiliate({
                id,
                name: values.name,
                high_date: values.high_date,
                low_date: values.low_date,
                initial_state: values.initial_state,
                salary: values.salary,
                monthly_quota: values.monthly_quota,
                annual_quota: values.annual_quota,
                contribution_commitment: values.contribution_commitment,
                month_contribution: values.month_contribution
            }));

            dispatch(closeModal());
        }, 1000)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: formValues.name,
            high_date: formValues.high_date,
            low_date: formValues.low_date,
            initial_state: formValues.initial_state,
            salary: formValues.salary,
            monthly_quota: formValues.monthly_quota,
            annual_quota: formValues.annual_quota,
            contribution_commitment: formValues.contribution_commitment,
            month_contribution: formValues.month_contribution
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Debe tener 3 caracteres o más')
                .max(30, 'Debe tener menos de 30 caracteres')
                .required('Este campo es requerido'),
            salary: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            initial_state: Yup.number().required('Este campo es requerido'),
            monthly_quota: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            annual_quota: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            contribution_commitment: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            month_contribution: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            high_date: Yup.date().required('Este campo es requerido'),
            low_date: Yup.date()
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
        const getInitailStates = async() => {
            const states = await GetInitial_states();
            setInitial_states(states.results);
            !id && setLoading(false);
        }

        getInitailStates();

        if(id){
            const getAffiliate = async() => {
                try {
                    const affiliate = await GetAffiliateById(id);
                    setFormValues({
                        name: affiliate.data.name,
                        high_date: affiliate.data.high_date,
                        low_date: affiliate.data.low_date,
                        initial_state: affiliate.data.initial_state,
                        salary: affiliate.data.salary,
                        monthly_quota: affiliate.data.monthly_quota,
                        annual_quota: affiliate.data.annual_quota,
                        contribution_commitment: affiliate.data.contribution_commitment,
                        month_contribution: affiliate.data.month_contribution,
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
                getAffiliate();
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
                                Añadir Afiliado
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
                                            placeholder="Nombre afiliado"
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
                                        <Form.Group>
                                            <Form.Label>Selecione la fecha de alta</Form.Label>
                                            <Form.Control
                                                id="high_date"
                                                name="high_date"
                                                onChange={handleChange}
                                                isValid={touched.high_date && !errors.high_date}
                                                isInvalid={touched.high_date && !!errors.high_date}
                                                placeholder={"yyyy-mm-dd"}
                                                type="date"
                                            />
                                        </Form.Group>
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Group>
                                            <Form.Label>Selecione la fecha de baja</Form.Label>
                                            <Form.Control
                                                id="low_date"
                                                name="low_date"
                                                onChange={handleChange}
                                                isValid={touched.low_date && !errors.low_date}
                                                isInvalid={touched.low_date && !!errors.low_date}
                                                placeholder={"yyyy-mm-dd"}
                                                type="date"
                                            />
                                        </Form.Group>
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="salary"
                                            name="salary"
                                            type="number"
                                            placeholder="Salario"
                                            onChange={handleChange}
                                            value={values.salary}
                                            isValid={touched.salary && !errors.salary}
                                            isInvalid={touched.salary && !!errors.salary}
                                        />
                                        {
                                            touched.salary && errors.salary ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.salary}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="monthly_quota"
                                            name="monthly_quota"
                                            type="number"
                                            placeholder="Cuota mensual"
                                            onChange={handleChange}
                                            value={values.monthly_quota}
                                            isValid={touched.monthly_quota && !errors.monthly_quota}
                                            isInvalid={touched.monthly_quota && !!errors.monthly_quota}
                                        />
                                        {
                                            touched.monthly_quota && errors.monthly_quota ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.monthly_quota}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="annual_quota"
                                            name="annual_quota"
                                            type="number"
                                            placeholder="Cuota anual"
                                            onChange={handleChange}
                                            value={values.annual_quota}
                                            isValid={touched.annual_quota && !errors.annual_quota}
                                            isInvalid={touched.annual_quota && !!errors.annual_quota}
                                        />
                                        {
                                            touched.annual_quota && errors.annual_quota ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.annual_quota}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="contribution_commitment"
                                            name="contribution_commitment"
                                            type="number"
                                            placeholder="Contribución por compromiso"
                                            onChange={handleChange}
                                            value={values.contribution_commitment}
                                            isValid={touched.contribution_commitment && !errors.contribution_commitment}
                                            isInvalid={touched.contribution_commitment && !!errors.contribution_commitment}
                                        />
                                        {
                                            touched.contribution_commitment && errors.contribution_commitment ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.contribution_commitment}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="month_contribution"
                                            name="month_contribution"
                                            type="number"
                                            placeholder="Contribución por mes"
                                            onChange={handleChange}
                                            value={values.month_contribution}
                                            isValid={touched.month_contribution && !errors.month_contribution}
                                            isInvalid={touched.month_contribution && !!errors.month_contribution}
                                        />
                                        {
                                            touched.month_contribution && errors.month_contribution ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.month_contribution}
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
