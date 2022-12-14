import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetAreas } from '../../services/area';
import { GetDonationById } from '../../services/donation';
import { closeModal, setProps } from '../../store/reducers/modal';
import { createDonation, editDonation } from '../../store/reducers/donation';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";


const initialState = {
    name: '',
    area_id: '',
    date: '',
}

export const DonationModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    const [areas, setAreas] = useState(null);

    const handleCreate = async(values) => {
        //TODO: Quitar set timout
        setTimeout(() => {
            dispatch(createDonation(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editDonation({
                id,
                name: values.name,
                area_id: values.area_id,
                date: values.date
            }));

            dispatch(closeModal());
        }, 1000)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: {
            name: formValues.name,
            area_id: formValues.area_id,
            date: formValues.date
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Debe tener 3 caracteres o mas')
                .max(30, 'Debe tener 30 caracteres o mas')
                .required('Este campo es requerido'),
            area_id: Yup.number().required('Este campo es requerido'),
            date: Yup.date().required('Este campo es requerido')
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

        getareas();

        if(id){
            const getDonation = async() => {
                try {
                    const donation = await GetDonationById(id);
                    setFormValues({
                        name: donation.data.name,
                        area_id: (donation.data.area.id !== undefined) ? donation.data.area.id : donation.data.area,
                        date: new Date(donation.data.date).toISOString().split('T')[0]
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
                getDonation();
            }, 1000)
        }

    }, [dispatch, id]);

    console.log(values)

    useEffect(() => {
        dispatch(setProps({size: "md", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    //const today = moment().format('D-MM-YYYY');

    return (
        <>
            {
                loading
                    ?
                    <div>
                        <Loader active inline='centered' content='Cargando secci??n' />
                    </div>
                    :
                    <>
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                A??adir Donaci??n
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
                                            placeholder="Nombre donaci??n"
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
                                            id="area_id"
                                            name="area_id"
                                            as={"select"}
                                            onChange={handleChange}
                                            value={values.area_id}
                                            isValid={touched.area_id && !errors.area_id}
                                            isInvalid={touched.area_id && !!errors.area_id}
                                        >
                                            <option>Seleccione un area...</option>
                                            {
                                                areas && areas.map((area)=> (
                                                    <option key={area.id} value={area.id}>{area.name}</option>
                                                ))
                                            }
                                        </Form.Control>
                                        {
                                            touched.area_id && errors.area_id ? (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.area_id}
                                                </Form.Control.Feedback>
                                            ) : ''
                                        }
                                    </InputGroup>
                                </div>

                                <div className='mb-3'>
                                    <InputGroup>
                                        <Form.Group>
                                            <Form.Label>Selecione la fecha</Form.Label>
                                            <Form.Control
                                                id="date"
                                                name="date"
                                                onChange={handleChange}
                                                //defaultValue={today.toString()}
                                                value={values.date}
                                                isValid={touched.date && !errors.date}
                                                isInvalid={touched.date && !!errors.date}
                                                placeholder={"yyyy-mm-dd"}
                                                type="date"
                                            />
                                        </Form.Group>
                                    </InputGroup>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    content= 'Cerrar'
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
