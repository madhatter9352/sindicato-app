import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react'
import * as Yup from 'yup';
import { GetAreaById } from '../../services/area';
import { createArea, editArea } from '../../store/reducers/area';
import { closeModal, setProps } from '../../store/reducers/modal';

const initialState = {
    name: ''
}

export const AddAreaModal = ({id = null}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);
    
    const handleCreate = async(values) => {
        setTimeout(() => {
            dispatch(createArea(values));
            dispatch(closeModal());
        }, 1000)
    };

    const handleEdit = async(values) => {
        setTimeout(() => {
            dispatch(editArea({
                id,
                name: values
            }));
    
            dispatch(closeModal());
        }, 1000)
    }

    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    useEffect(() => {
        if(id){
            setLoading(true);
            const getArea = async() => {
                try {
                    const area = await GetAreaById(id);
                    console.log(area);
                    setFormValues({
                        name: area.data.name
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
                getArea();
            }, 1000)
        }
    }, [id, dispatch]);

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            name: formValues.name
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(30, 'Must be 30 characters or less')
            .required('Required')
        }),
        onSubmit: (values) => {
            if(id){
                handleEdit(values);    
            } else {
                handleCreate(values);
            }
        }
    });

    console.log(values)

    useEffect(() => {
        dispatch(setProps({size: "md", 'aria-labelledby': "contained-modal-title-vcenter", centered: 'centered'}))
    }, [dispatch]);

    return (
        <>
        {
            loading 
            ?
                <div>
                    <Loader active inline='centered' content='Loading area' />
                </div>
            :
            <>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Annadir Area
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
                                        placeholder="Nombre del area"
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
