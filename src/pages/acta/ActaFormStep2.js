import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { AddPointAct, CreateAcuerdo, CreatePlanteamiento, DeleteAcuerdo, DeletePlanteamineto, DeletePunto, GetAcuerdosByActaId, GetPlanteamientosByActa, GetPuntosByActa } from '../../services/acta';
import { openModal } from '../../store/reducers/modal';
import { AcuerdoModal } from './AcuerdoModal';
import { PlanteamientoModal } from './PlanteamientoModal';

export const ActaFormStep2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {actId} = useParams();
    const [puntos, setPuntos] = useState([]);
    const [itemPunto, setItemPunto] = useState('');
    const [acuerdos, setAcuerdos] = useState([]);
    const [planteamientos, setPlanteamientos] = useState([]);

    const handleSetItem = (e) => {
        setItemPunto(e.target.value)
    }

    const handleAddListItem = (value) => {
        const payload = {
            name: `PUNTO ${puntos.length + 1}`,
            description: value,
            act: actId,
        }
        if(value.length > 0){
            AddPointAct(payload)
                .then(resp => {
                    setPuntos([...puntos, payload]);
                    setItemPunto('');
                })
        }
    }

    const handleAddAcuerdos = (value) => {
        value.act_id = actId;
        
        CreateAcuerdo(value)
            .then(resp => {
                setAcuerdos([...acuerdos, value])
            })
    }

    const handleDeleteListItem = (id, index) => {
        DeletePunto(id)
            .then(resp => {
                setPuntos(puntos.filter((p, i) => i !== index))
            })
    }

    const handleDeleteAcuerdo = (index, id) => {
        setAcuerdos(acuerdos.filter((p, i) => i !== index));
        DeleteAcuerdo(id)
            .then(resp => {});
    }

    const handleAddActa = () => {
        navigate(`/acta-step3/${actId}`);
    }

    const handleAddPlanteamiento = (value) => {
        value.act_id = actId
        CreatePlanteamiento(value)
            .then(resp => {
                console.log(resp)
                setPlanteamientos([...planteamientos, resp.data]);
            })
    }

    const handleDeletePlanteamiento = (id, index) => {
        DeletePlanteamineto(id)
            .then(resp => {
                setPlanteamientos(planteamientos.filter((p, i) => i !== index))
            })
    }

    useEffect(() => {
        GetAcuerdosByActaId(actId)
            .then(resp => {
                setAcuerdos([...acuerdos, ...resp])
            })
        
        GetPuntosByActa(actId)
            .then(resp => {
                setPuntos(resp);
            })
            
        GetPlanteamientosByActa(actId)
            .then(resp => {
                console.log(resp)
                setPlanteamientos(resp)
            })
    }, [actId]);

    console.log(planteamientos)

    return (
        <div>
            <h4>ACTA DE ASAMBLEA DE AFILIADOS - PASO 2</h4>
            <sub>REUNION (ORDINARIA O EXTRAORDINARIA)</sub>
            <Container className='mt-4' fluid>
                <h4>Puntos</h4>
                <Row>
                    <Col>
                        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                            {
                                puntos && puntos.map((punto, i) => (
                                    <Card style={{ width: '18rem', marginRight: '10px'}} key={i}>
                                        <Card.Body>
                                            <Card.Title>{`PUNTO ${i + 1}`}</Card.Title>
                                            <Card.Text>{punto.description}</Card.Text>
                        
                                            <Card.Link
                                                style={{
                                                    cursor: 'pointer'
                                                }} 
                                                onClick={() => handleDeleteListItem(punto.id, i)}
                                            >
                                                Eliminar
                                            </Card.Link>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </div>
                        <div style={{display: 'flex'}}>
                            <Form.Control 
                                size='md'
                                placeholder='Add item'
                                value={itemPunto}
                                onChange={(e) => handleSetItem(e)}
                                className="mr-5"
                            />

                            <Button
                                primary 
                                icon='plus'
                                size='mini'
                                onClick={() => handleAddListItem(itemPunto)}
                            />
                        </div>
                    </Col>
                </Row>
                <div style={{display: "flex", marginTop: "20px", justifyContent: "space-between"}}>
                    <h4>Acuerdos</h4>
                    <Button 
                        icon="plus"
                        content="Agregar Acuerdo"
                        size='tiny'
                        primary
                        onClick={() => dispatch(openModal(<AcuerdoModal handleAddAcuerdos={handleAddAcuerdos} />))}
                    />
                </div>
                <Row>
                    <Col>
                        <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: "7px"}}>
                            {
                                acuerdos && acuerdos.map((acuerdo, i) => (
                                    <Card style={{ width: '18rem', marginRight: '10px'}} key={i}>
                                        <Card.Header>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <div>
                                                    {acuerdo.responsible}
                                                </div>
                                                <div>
                                                    {acuerdo.state}
                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>{acuerdo.agreement}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <div className="text-muted">
                                                    {acuerdo.compliance_date}
                                                </div>
                                                <div>
                                                    <Card.Link
                                                        style={{
                                                            cursor: 'pointer'
                                                        }} 
                                                        onClick={() => handleDeleteAcuerdo(i, acuerdo.id)}
                                                    >
                                                        Eliminar
                                                    </Card.Link>
                                                </div>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
                <div style={{display: "flex", marginTop: "20px", justifyContent: "space-between"}}>
                    <h4>Planteamientos</h4>
                    <Button 
                        icon="plus"
                        content="Agregar Planteamiento"
                        size='tiny'
                        primary
                        onClick={() => dispatch(openModal(<PlanteamientoModal handleAddPlanteamiento={handleAddPlanteamiento} />))}
                    />
                </div>
                <Row>
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Afiliado</th>
                                <th>Planteamiento</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                planteamientos && planteamientos.map((planteamiento, i) => (
                                    <tr 
                                        key={planteamiento.id}
                                    >
                                        <td>{planteamiento.id}</td>
                                        <td>{planteamiento.affiliate.name}</td>
                                        <td>{planteamiento.approach}</td>
                                        <td>{planteamiento.type}</td>
                                        <td>
                                            <Button 
                                                color='red'
                                                icon='trash'
                                                content='Delete'
                                                //loading={isDeleting && area.id === selected}
                                                onClick={() => handleDeletePlanteamiento(planteamiento.id, i)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
            <div style={{display: 'flex', justifyContent: "flex-end"}}>
                <Button 
                    primary
                    content="Siguiente"
                    className='mt-5'
                    onClick={() => handleAddActa()}
                />
            </div>
        </div>
    )
}
