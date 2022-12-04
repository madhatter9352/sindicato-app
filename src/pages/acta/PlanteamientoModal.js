import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { closeModal, setProps } from '../../store/reducers/modal';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';
import { GetAffiliates } from '../../services/affiliate';


const initialState = {
    approach: '',
    affiliate: '',
    type: ''
};

export const PlanteamientoModal = ({handleAddPlanteamiento}) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initialState);
    const [afiliados, setAfiliados] = useState(null);

    const handleCreate = async(values) => {
        setTimeout(() => {
            handleAddPlanteamiento(values)
            dispatch(closeModal());;
        }, 500)
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            approach: formValues.approach,
            affiliate: formValues.affiliate,
            type: formValues.type
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            approach: Yup.string()
            .min(3, 'Debe tener 3 caracteres o mas')
            .max(30, 'Debe tener 30 caracteres o mas')
            .required('Requerido'),
            affiliate: Yup.string().required('Requerido'),
            type: Yup.string().required('Requerido')
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
        dispatch(setProps({size: "md", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    useEffect(() => {
        GetAffiliates()
            .then((resp) => {
                setAfiliados(resp.results)
            })
    }, [])

    return (
        <>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Añadir Planteamiento
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>                
                    <div className='mb-3'>
                        <InputGroup>
                            <Form.Control
                                id="approach"
                                name="approach"
                                as="textarea"
                                rows={3}
                                placeholder="Planteamiento"
                                onChange={handleChange}
                                value={values.approach}
                                isValid={touched.approach && !errors.approach}
                                isInvalid={touched.approach && !!errors.approach}
                            />
                            {
                                touched.approach && errors.approach ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.approach}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </div>

                    <div className='mb-3'>
                        <InputGroup>
                            <Form.Control
                                id="affiliate"
                                name="affiliate"
                                placeholder="Afiliado"
                                type='text'
                                onChange={handleChange}
                                value={values.affiliate}
                                isValid={touched.affiliate && !errors.affiliate}
                                isInvalid={touched.affiliate && !!errors.affiliate}
                            />
                            {
                                touched.affiliate && errors.affiliate ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.affiliate}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </div>

                    <div className='mb-3'>
                        <InputGroup>
                        <Form.Control
                                id="type"
                                name="type"
                                type="text"
                                placeholder="Tipo"
                                onChange={handleChange}
                                value={values.type}
                                isValid={touched.type && !errors.type}
                                isInvalid={touched.type && !!errors.type}
                            />
                            {
                                touched.type && errors.type ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.type}
                                </Form.Control.Feedback>
                                ) : ''
                            }
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
                        //content={id ? 'Actualizar': 'Crear'}
                        content="Crear"
                        type='submit'
                        primary
                        loading={isSubmitting}
                    />
                </Modal.Footer>
            </form>
        </>
    )
}
