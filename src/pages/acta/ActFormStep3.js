import React, { useEffect, useState } from 'react'
import { Container, Row, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { AddDocument, DeleteDocument, GetDocumentosByActa } from '../../services/acta'
import { openModal } from '../../store/reducers/modal'
import { DocumentoModal } from './DocumentoModal'

export const ActFormStep3 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {actId} = useParams();
    const [documentos, setDocumentos] = useState([]);

    const handleAddDocument = (value) => {
        const payload = {
            name: value.name,
            act: actId
        }

        AddDocument(payload)
            .then((resp) => {
                setDocumentos([...documentos, resp.data]);
            })
    }

    const handleDeleteDocument = (id, index) => {
        DeleteDocument(id)
            .then(() => {
                setDocumentos(documentos.filter((p, i) => i !== index));
            })
    }

    useEffect(() => {
        GetDocumentosByActa(actId)
            .then((resp) => {
                setDocumentos(resp);
            })
    }, [])

    return (
        <div>
            <h4>ACTA DE ASAMBLEA DE AFILIADOS - PASO 3</h4>
            <sub>REUNION (ORDINARIA O EXTRAORDINARIA)</sub>
            <Container className='mt-4' fluid>
                <div style={{display: "flex", marginTop: "20px", justifyContent: "space-between"}}>
                    <h4>Documentos que se anexan</h4>
                    <Button 
                        icon="plus"
                        content="Agregar documento"
                        size='tiny'
                        primary
                        onClick={() => dispatch(openModal(<DocumentoModal handleAddDocument={handleAddDocument} />))}
                    />
                </div>
                <Row>
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Documento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                documentos && documentos.map((doc, i) => (
                                    <tr 
                                        key={doc.id}
                                    >
                                        <td>{doc.id}</td>
                                        <td>{doc.name}</td>
                                        <td>
                                            <Button 
                                                color='red'
                                                icon='trash'
                                                content='Eliminar'
                                                //loading={isDeleting && area.id === selected}
                                                onClick={() => handleDeleteDocument(doc.id,i)}
                                            />

                                            {/* <Button 
                                                color='yellow'
                                                icon='edit'
                                                content='Edit'
                                                onClick={() => dispatch(openModal(<AddAreaModal id={area.id} />))}
                                            /> */}
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
                    content="Finalizar"
                    className='mt-5'
                    onClick={() => navigate('/acta')}
                />
            </div>
        </div>
    )
}
