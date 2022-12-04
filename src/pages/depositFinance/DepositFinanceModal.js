import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetUnion_sections } from '../../services/unionSection';
import { GetDepositFinanceById } from '../../services/depositFinance';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createDepositFinance, editDepositFinance } from '../../store/reducers/depositFinance';

import "react-datepicker/dist/react-datepicker.css";

const initialState = {
    union_section_id: '',
    date: '',
    total_number_workers: '',
    total_number_affiliates: '',
    al_da: '',
    unlisted: '',
    with_arrears: '',
    liquidated_year: '',
    high: '',
    low: '',
    to_quote: '',
    quoted: '',
    earring: '',
    ten_percent: '',
    net_quoted: '',
    ten_percent_accumulated: '',
    reduction: '',
    total_balance: ''
}

export const DepositFinanceModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [union_sections, setUnion_sections] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createDepositFinance(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editDepositFinance({
                id,
                union_section_id: values.union_section_id,
                total_number_workers: values.total_number_workers,
                high: values.high,
                low: values.low,
                earring: values.earring,
                date: values.date,
                total_number_affiliates: values.total_number_affiliates,
                al_da: values.al_da,
                unlisted: values.unlisted,
                with_arrears: values.with_arrears,
                liquidated_year: values.liquidated_year,
                to_quote: values.to_quote,
                quoted: values.quoted,
                ten_percent: values.ten_percent,
                net_quoted: values.net_quoted,
                ten_percent_accumulated: values.ten_percent_accumulated,
                reduction: values.reduction,
                total_balance: values.total_balance
            }));

            dispatch(closeModal());
        }, 1000)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            union_section_id: formValues.union_section_id,
            total_number_workers: formValues.total_number_workers,
            high: formValues.high,
            low: formValues.low,
            earring: formValues.earring,
            date: formValues.date,
            total_number_affiliates: formValues.total_number_affiliates,
            al_da: formValues.al_da,
            unlisted: formValues.unlisted,
            with_arrears: formValues.with_arrears,
            liquidated_year: formValues.liquidated_year,
            to_quote: formValues.to_quote,
            quoted: formValues.quoted,
            ten_percent: formValues.ten_percent,
            net_quoted: formValues.net_quoted,
            ten_percent_accumulated: formValues.ten_percent_accumulated,
            reduction: formValues.reduction,
            total_balance: formValues.total_balance
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            union_section_id: Yup.number().required('Este campo es requerido'),
            total_number_workers: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            high: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            low: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            earring: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            total_number_affiliates: Yup.number()
                                        .required('Este campo es requerido')
                                        .min(0, 'Este campo debe ser mayor a 0')
                                        .test({
                                            name: 'test',
                                            test(value, ctx){
                                                const {al_da, unlisted, with_arrears, liquidated_year} = this.parent
                                                if(al_da + unlisted + with_arrears + liquidated_year  !== value){
                                                    return ctx.createError({
                                                        message: 'Debe ser igual a la suma de los campos: Al dia, Sin cotizar, con atraso y año liquidado'
                                                    })
                                                } else {
                                                    return true;
                                                }
                                                
                                            }
                                        }),
            al_da: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            unlisted: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            with_arrears: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            liquidated_year: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            to_quote: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            quoted: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            ten_percent: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            net_quoted: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            ten_percent_accumulated: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            reduction: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            total_balance: Yup.number().required('Este campo es requerido').min(0, 'Este campo debe ser mayor a 0'),
            date: Yup.date().required('Este campo es requerido')
        }),
        onSubmit: (values) => {
            if(id){
                values.earring = handleTotal();
                values.ten_percent = handlePercent();
                values.net_quoted = handleCotNeto(); 
                handleEdit(values);
            } else {
                values.earring = handleTotal();
                values.ten_percent = handlePercent();
                values.net_quoted = handleCotNeto(); 
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
            const getDepositFinance = async() => {
                try {
                    const depositFinance = await GetDepositFinanceById(id);
                    setFormValues({
                        union_section_id: depositFinance.data.union_section.id,
                        total_number_workers: depositFinance.data.total_number_workers,
                        high: depositFinance.data.high,
                        low: depositFinance.data.low,
                        earring: depositFinance.data.earring,
                        date: depositFinance.data.date,
                        total_number_affiliates: depositFinance.data.total_number_affiliates,
                        al_da: depositFinance.data.al_da,
                        unlisted: depositFinance.data.unlisted,
                        with_arrears: depositFinance.data.with_arrears,
                        liquidated_year: depositFinance.data.liquidated_year,
                        to_quote: depositFinance.data.to_quote,
                        quoted: depositFinance.data.quoted,
                        ten_percent: depositFinance.data.ten_percent,
                        net_quoted: depositFinance.data.net_quoted,
                        ten_percent_accumulated: depositFinance.data.ten_percent_accumulated,
                        reduction: depositFinance.data.reduction,
                        total_balance: depositFinance.data.total_balance
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
                getDepositFinance();
            }, 1000)
        }

    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setProps({size: "xl", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    const handleTotal  = () => {
        return values.to_quote - values.low + values.high - values.quoted
    }

    const handlePercent = () => {
        return values.quoted * 0.10 
    }

    const handleCotNeto = () => {
        return values.ten_percent_accumulated + handlePercent() - values.reduction;
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
                                Añadir déposito
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
                                        <Form.Group>
                                            <Form.Label>Selecione una fecha</Form.Label>
                                            <Form.Control
                                                id="date"
                                                name="date"
                                                onChange={handleChange}
                                                isValid={touched.date && !errors.date}
                                                isInvalid={touched.date && !!errors.date}
                                                placeholder={"yyyy-mm-dd"}
                                                type="date"
                                            />
                                        </Form.Group>
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
                                            id="al_da"
                                            name="al_da"
                                            type="number"
                                            placeholder="Al día"
                                            onChange={handleChange}
                                            value={values.al_da}
                                            isValid={touched.al_da && !errors.al_da}
                                            isInvalid={touched.al_da && !!errors.al_da}
                                        />
                                        {
                                            touched.al_da && errors.al_da ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.al_da}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="unlisted"
                                            name="unlisted"
                                            type="number"
                                            placeholder="Sin cotizar"
                                            onChange={handleChange}
                                            value={values.unlisted}
                                            isValid={touched.unlisted && !errors.unlisted}
                                            isInvalid={touched.unlisted && !!errors.unlisted}
                                        />
                                        {
                                            touched.unlisted && errors.unlisted ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.unlisted}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="with_arrears"
                                            name="with_arrears"
                                            type="number"
                                            placeholder="Con atrasos"
                                            onChange={handleChange}
                                            value={values.with_arrears}
                                            isValid={touched.with_arrears && !errors.with_arrears}
                                            isInvalid={touched.with_arrears && !!errors.with_arrears}
                                        />
                                        {
                                            touched.with_arrears && errors.with_arrears ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.with_arrears}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="liquidated_year"
                                            name="liquidated_year"
                                            type="number"
                                            placeholder="Año liquidado"
                                            onChange={handleChange}
                                            value={values.liquidated_year}
                                            isValid={touched.liquidated_year && !errors.liquidated_year}
                                            isInvalid={touched.liquidated_year && !!errors.liquidated_year}
                                        />
                                        {
                                            touched.liquidated_year && errors.liquidated_year ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.liquidated_year}
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
                                            id="to_quote"
                                            name="to_quote"
                                            type="number"
                                            placeholder="A cotizar"
                                            onChange={handleChange}
                                            value={values.to_quote}
                                            isValid={touched.to_quote && !errors.to_quote}
                                            isInvalid={touched.to_quote && !!errors.to_quote}
                                        />
                                        {
                                            touched.to_quote && errors.to_quote ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.to_quote}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="quoted"
                                            name="quoted"
                                            type="number"
                                            placeholder="Cotizado"
                                            onChange={handleChange}
                                            value={values.quoted}
                                            isValid={touched.quoted && !errors.quoted}
                                            isInvalid={touched.quoted && !!errors.quoted}
                                        />
                                        {
                                            touched.quoted && errors.quoted ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.quoted}
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
                                            readOnly={true}
                                            value={handleTotal()}
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

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="ten_percent"
                                            name="ten_percent"
                                            type="number"
                                            placeholder="10%"
                                            readOnly={true}
                                            value={handlePercent()}
                                            isValid={touched.ten_percent && !errors.ten_percent}
                                            isInvalid={touched.ten_percent && !!errors.ten_percent}
                                        />
                                        {
                                            touched.ten_percent && errors.ten_percent ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.ten_percent}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="net_quoted"
                                            name="net_quoted"
                                            type="number"
                                            readOnly={true}
                                            placeholder="Cotizado neto"
                                            value={handleCotNeto()}
                                            isValid={touched.net_quoted && !errors.net_quoted}
                                            isInvalid={touched.net_quoted && !!errors.net_quoted}
                                        />
                                        {
                                            touched.net_quoted && errors.net_quoted ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.net_quoted}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="ten_percent_accumulated"
                                            name="ten_percent_accumulated"
                                            type="number"
                                            placeholder="10% Acumulado"
                                            onChange={handleChange}
                                            value={values.ten_percent_accumulated}
                                            isValid={touched.ten_percent_accumulated && !errors.ten_percent_accumulated}
                                            isInvalid={touched.ten_percent_accumulated && !!errors.ten_percent_accumulated}
                                        />
                                        {
                                            touched.ten_percent_accumulated && errors.ten_percent_accumulated ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.ten_percent_accumulated}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="reduction"
                                            name="reduction"
                                            type="number"
                                            placeholder="Rebaja de fondos"
                                            onChange={handleChange}
                                            value={values.reduction}
                                            isValid={touched.reduction && !errors.reduction}
                                            isInvalid={touched.reduction && !!errors.reduction}
                                        />
                                        {
                                            touched.reduction && errors.reduction ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.reduction}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Control
                                            id="total_balance"
                                            name="total_balance"
                                            type="number"
                                            placeholder="Total de saldo"
                                            onChange={handleChange}
                                            value={values.total_balance}
                                            isValid={touched.total_balance && !errors.total_balance}
                                            isInvalid={touched.total_balance && !!errors.total_balance}
                                        />
                                        {
                                            touched.total_balance && errors.total_balance ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.total_balance}
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
