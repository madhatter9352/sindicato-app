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
    affiliate_id: '',
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
            affiliate_id: formValues.affiliate_id,
            type: formValues.type
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            approach: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
            affiliate_id: Yup.number().required('Required'),
            type: Yup.string().required('Required')
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
                                id="affiliate_id"
                                name="affiliate_id"
                                as={"select"}
                                onChange={handleChange}
                                value={values.affiliate_id}
                                isValid={touched.affiliate_id && !errors.affiliate_id}
                                isInvalid={touched.affiliate_id && !!errors.affiliate_id}
                            >
                                <option>Seleccione un afiliado...</option>
                                {
                                    afiliados && afiliados.map((afiliado)=> (
                                        <option key={afiliado.id} value={afiliado.id}>{afiliado.name}</option>
                                    ))
                                }
                            </Form.Control>
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
                        content= 'Close'
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
