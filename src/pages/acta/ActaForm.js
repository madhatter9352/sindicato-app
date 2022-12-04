import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
import { GetSeccionesSindicales } from '../../services/seccionSindical';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createActa } from '../../store/reducers/acta';

const initialState = {
    attendance_percentage: '',
    union_section_id: '',
    place: '',
    start_time: '',
    end_time: '',
    direct: '',
    guest: '',
    body: '',
    date: ''
}

export const ActaForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const startTime = useRef(null);
    const endTime = useRef(null);
    const direct = useRef(null);
    const guest = useRef(null);
    const [listOrden, setListOrden] = useState([]);
    const [item, setItem] = useState('');
    const [secciones, setSecciones] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialState);

    useEffect(() => {
        setLoading(true);
        const getSecciones = async() => {
            const secciones = await GetSeccionesSindicales();
            setSecciones(secciones.results);
            setLoading(false);
        }
        getSecciones();
    }, []);

    const handleSetItem = (e) => {
        setItem(e.target.value)
    }

    const handleAddListItem = (value) => {
        setListOrden([...listOrden, value]);
        setItem('');
    }

    const handleDeleteListItem = (index) => {
        setListOrden(listOrden.filter((p, i) => i !== index))
    }

    const setTimeFormat = (inputRef) => {
        inputRef.current.type = 'time';
    }
    const setTextFormat = (inputRef) => {
        inputRef.current.type = "text";
    }

    const changePlaceholder = (inputRef, placeholder) => {
        inputRef.current.placeholder = placeholder;
    }

    const {handleChange, values, handleSubmit, touched, errors, isSubmitting} = useFormik({
        initialValues: { 
            attendance_percentage: formValues.attendance_percentage,
            union_section_id: formValues.union_section_id,
            place: formValues.place,
            start_time: formValues.start_time,
            end_time: formValues.end_time,
            direct: formValues.direct,
            guest: formValues.guest,
            body: formValues.body,
            date: formValues.date

        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            date: Yup.date().required('Requerido'),
            attendance_percentage: Yup.number().required('Requerido'),
            union_section_id: Yup.number().required('Requerido'),
            place: Yup.string().required('Requerido'),
            start_time: Yup.string().required('Requerido'),
            end_time: Yup.string().required('Requerido'),
            direct: Yup.string().required('Requerido'),
            guest: Yup.string().required('Requerido'),
            body: Yup.string().required('Requerido')
        }),
        onSubmit: (values) => {
            // if(id){
            //     handleEdit(values);    
            // } else {
            //     handleCreate(values);
            // }
            handleAddActa(values, listOrden)
        }
    });

    const handleAddActa = async(values, list) => {
        const resp = await dispatch(createActa({
                        ...values,
                        order_gives: list.join('|')
                    }));
        console.log(resp)
        navigate(`/acta-step2/${resp.payload.id}`)
    }

    if(loading){
        return (
            <div>
                <Loader active inline='centered' content='Cargando...' />
            </div>
        )
    }

    return (
        <div>
            <h4>ACTA DE ASAMBLEA DE AFILIADOS</h4>
            <sub>REUNION (ORDINARIA O EXTRAORDINARIA)</sub>
            <Form onSubmit={handleSubmit}>
            <Container className='mt-4' fluid>
                <Row>
                    <Col xs lg="8">
                        
                    </Col>
                    <Col className='ml-3'>
                        <Form.Control
                            id="date"
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            isValid={touched.date && !errors.date}
                            isInvalid={touched.date && !!errors.date}
                        />
                        {
                            touched.date && errors.date ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col xs lg="8">
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
                                    secciones && secciones.map((seccion)=> (
                                        <option key={seccion.id} value={seccion.id}>{seccion.name}</option>
                                    ))
                                }
                            </Form.Control>
                            {
                                errors.union_section_id ? (
                                <Form.Control.Feedback type="invalid">
                                    {errors.union_section_id}
                                </Form.Control.Feedback>
                                ) : ''
                            }
                        </InputGroup>
                    </Col>
                    <Col className='ml-3'>
                        <Form.Control 
                            id="attendance_percentage"
                            name="attendance_percentage"
                            type="number"
                            placeholder="% asistencia"
                            onChange={handleChange}
                            value={values.attendance_percentage}
                            isValid={touched.attendance_percentage && !errors.attendance_percentage}
                            isInvalid={touched.attendance_percentage && !!errors.attendance_percentage}
                        />
                        {
                            touched.attendance_percentage && errors.attendance_percentage ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.attendance_percentage}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <Form.Control
                            id="place"
                            name="place"
                            type="text"
                            placeholder="Lugar"
                            onChange={handleChange}
                            value={values.place}
                            isValid={touched.place && !errors.place}
                            isInvalid={touched.place && !!errors.place}
                        />
                        {
                            touched.place && errors.place ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.place}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                    <Col>
                        <Form.Control
                            id="start_time"
                            name="start_time"
                            type="text"
                            placeholder='Hora Inicio'
                            ref={startTime}
                            onFocus={() => setTimeFormat(startTime)}
                            onBlur={() => setTextFormat(startTime)}
                            onChange={handleChange}
                            value={values.start_time}
                            isValid={touched.start_time && !errors.start_time}
                            isInvalid={touched.start_time && !!errors.start_time}
                        />
                        {
                            touched.start_time && errors.start_time ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.start_time}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                    <Col>
                        <Form.Control
                            id="end_time"
                            name="end_time"
                            type="text"
                            placeholder='Hora Terminación'
                            ref={endTime}
                            onChange={handleChange}
                            onFocus={() => setTimeFormat(endTime)}
                            onBlur={() => setTextFormat(endTime)}
                            value={values.end_time}
                            isValid={touched.end_time && !errors.end_time}
                            isInvalid={touched.end_time && !!errors.end_time}
                        />
                        {
                            touched.end_time && errors.end_time ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.end_time}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col>
                        <Form.Control
                            id="direct"
                            name="direct"
                            type="text"
                            placeholder='Dirige la reunión'
                            onChange={handleChange}
                            ref={direct}
                            onFocus={() => changePlaceholder(direct, "Nombre y apellidos (cargo)")}
                            onBlur={() => changePlaceholder(direct, "Dirige la reunión")}
                            value={values.direct}
                            isValid={touched.direct && !errors.direct}
                            isInvalid={touched.direct && !!errors.direct}
                        />
                        {
                            touched.direct && errors.direct ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.direct}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col>
                        <Form.Control
                            id="guest"
                            name="guest"
                            type="text"
                            onChange={handleChange}
                            placeholder='Invitado(s)'
                            onFocus={() => changePlaceholder(guest, "Nombre y apellidos (cargo)")}
                            onBlur={() => changePlaceholder(guest, "Invitado(s)")}
                            ref={guest}
                            value={values.guest}
                            isValid={touched.guest && !errors.guest}
                            isInvalid={touched.guest && !!errors.guest}
                        />
                        {
                            touched.guest && errors.guest ? (
                            <Form.Control.Feedback type="invalid">
                                {errors.guest}
                            </Form.Control.Feedback>
                            ) : ''
                        }
                    </Col>
                </Row>

                <h4>Orden del dia</h4>
                <Row>
                    <Col className='mt-2'>
                        <ol>
                            {
                                listOrden && listOrden.map((list, i) => (
                                    <div style={{display: "flex", marginTop: "3px"}}>
                                        <li key={i} className="mt-2 mr-3">{list}</li>
                                        <Button
                                            color="red"
                                            icon='delete'
                                            size='mini'
                                            key={i}
                                            onClick={() => handleDeleteListItem(i)}
                                        />
                                    </div>
                                ))
                            }
                            <div className='mt-2'>
                                <Row>
                                    <Col>
                                        <Form.Control 
                                            size='md'
                                            placeholder='Add item'
                                            value={item}
                                            onChange={(e) => handleSetItem(e)}
                                        />
                                    </Col>
                                    <Col>
                                        <Button
                                            primary 
                                            icon='plus'
                                            size='mini'
                                            onClick={() => handleAddListItem(item)}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </ol>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Form.Label>Introducción</Form.Label>
                    <Form.Control
                        id="body"
                        name="body" 
                        as="textarea" 
                        rows={3}
                        value={values.body}
                        onChange={handleChange}
                        isValid={touched.body && !errors.body}
                        isInvalid={touched.body && !!errors.body}
                    />

                    {
                        touched.body && errors.body ? (
                        <Form.Control.Feedback type="invalid">
                            {errors.body}
                        </Form.Control.Feedback>
                        ) : ''
                    }
                </Row>
            </Container>
            <div style={{display: 'flex', justifyContent: "flex-end"}}>
                <Button 
                    primary
                    content="Siguiente"
                    className='mt-5'
                    type='submit'
                    loading={isSubmitting}
                />
            </div>
            </Form>
        </div>
    )
}
