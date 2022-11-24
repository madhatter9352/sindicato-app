import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetUnion_sections } from '../../services/unionSection';
import { GetContributionDepositById } from '../../services/contributionDeposit';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createContributionDeposit, editContributionDeposit } from '../../store/reducers/contributionDeposit';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

const initialState = {
    union_section_id: '',
    total_number_workers: '',
    total_number_committed: '',
    to_deposit: '',
    deposited: '',
    high: '',
    low: '',
    earring: '',
}

export const ContributionDepositModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [union_sections, setUnion_sections] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createContributionDeposit(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editContributionDeposit({
                id,
                union_section_id: values.union_section_id,
                total_number_workers: values.total_number_workers,
                total_number_committed: values.total_number_committed,
                to_deposit: values.to_deposit,
                deposited: values.deposited,
                high: values.high,
                low: values.low,
                earring: values.earring
            }));

            dispatch(closeModal());
        }, 1000)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            union_section_id: formValues.union_section_id,
            total_number_workers: formValues.total_number_workers,
            total_number_committed: formValues.total_number_committed,
            to_deposit: formValues.to_deposit,
            deposited: formValues.deposited,
            high: formValues.high,
            low: formValues.low,
            earring: formValues.earring
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            union_section_id: Yup.number().required('Este campo es requerido'),
            total_number_workers: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            total_number_committed: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            to_deposit: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            deposited: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            high: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            low: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0'),
            earring: Yup.number().required('Este campo es requerido').min(1, 'Este campo debe ser mayor a 0')
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
        const getUnion_sections = async() => {
            const sections = await GetUnion_sections();
            setUnion_sections(sections.results);
            !id && setLoading(false);
        }

        getUnion_sections();

        if(id){
            const getContributionDeposit = async() => {
                try {
                    const contributionDeposit = await GetContributionDepositById(id);
                    setFormValues({
                        union_section_id: contributionDeposit.data.union_section.id,
                        total_number_workers: contributionDeposit.data.total_number_workers,
                        total_number_committed: contributionDeposit.data.total_number_committed,
                        to_deposit: contributionDeposit.data.to_deposit,
                        deposited: contributionDeposit.data.deposited,
                        high: contributionDeposit.data.high,
                        low: contributionDeposit.data.low,
                        earring: contributionDeposit.data.earring,
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
                getContributionDeposit();
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
                                            id="union_section_id"
                                            name="union_section_id"
                                            as={"select"}
                                            onChange={handleChange}
                                            value={values.union_section_id}
                                            isValid={touched.union_section_id && !errors.union_section_id}
                                            isInvalid={touched.union_section_id && !!errors.union_section_id}
                                        >
                                            <option>Seleccione una sección sindical...</option>
                                            {
                                                union_sections && union_sections.map((section)=> (
                                                    <option key={section.id} value={section.id}>{section.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                        {
                                            touched.union_section_id && errors.union_section_id ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.union_section_id}
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
                                            type="text"
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
                                            id="total_number_committed"
                                            name="total_number_committed"
                                            type="number"
                                            placeholder="Trabajadores comprometidos"
                                            onChange={handleChange}
                                            value={values.total_number_committed}
                                            isValid={touched.total_number_committed && !errors.total_number_committed}
                                            isInvalid={touched.total_number_committed && !!errors.total_number_committed}
                                        />
                                        {
                                            touched.total_number_committed && errors.total_number_committed ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.total_number_committed}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="to_deposit"
                                            name="to_deposit"
                                            type="number"
                                            placeholder="A depositar"
                                            onChange={handleChange}
                                            value={values.to_deposit}
                                            isValid={touched.to_deposit && !errors.to_deposit}
                                            isInvalid={touched.to_deposit && !!errors.to_deposit}
                                        />
                                        {
                                            touched.to_deposit && errors.to_deposit ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.to_deposit}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="deposited"
                                            name="deposited"
                                            type="number"
                                            placeholder="Depositado"
                                            onChange={handleChange}
                                            value={values.deposited}
                                            isValid={touched.deposited && !errors.deposited}
                                            isInvalid={touched.deposited && !!errors.deposited}
                                        />
                                        {
                                            touched.deposited && errors.deposited ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.deposited}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="high"
                                            name="high"
                                            type="number"
                                            placeholder="Altas"
                                            onChange={handleChange}
                                            value={values.high}
                                            isValid={touched.high && !errors.high}
                                            isInvalid={touched.high && !!errors.high}
                                        />
                                        {
                                            touched.high && errors.high ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.high}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="low"
                                            name="low"
                                            type="number"
                                            placeholder="Bajas"
                                            onChange={handleChange}
                                            value={values.low}
                                            isValid={touched.low && !errors.low}
                                            isInvalid={touched.low && !!errors.low}
                                        />
                                        {
                                            touched.low && errors.low ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.low}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="earring"
                                            name="earring"
                                            type="number"
                                            placeholder="Pendientes"
                                            onChange={handleChange}
                                            value={values.earring}
                                            isValid={touched.earring && !errors.earring}
                                            isInvalid={touched.earring && !!errors.earring}
                                        />
                                        {
                                            touched.earring && errors.earring ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.earring}
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
