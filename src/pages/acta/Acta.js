import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import { ContentHeader, Loading, PaginationComponent } from '../../components'
import { deleteActaReducer, getActasByPage } from '../../store/reducers/acta'
import { formatDate } from '../../utils/helpers'
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import {GetAcuerdosByActaId, GetDocumentosByActa, GetPlanteamientosByActa, GetPuntosByActa } from '../../services/acta'


function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

export const Acta = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const {actas, loading, error, pagination} = useSelector(state => state.acta);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currPage){
            dispatch(getActasByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Cargando Actas...' />
    }

    if(loading === 'rejected' && error){
        toast.error(`${error}`, {
            theme: 'colored'
        });
    }

    const handleDelete = (id) => {
        setSelected(id);
        setIsDeleting(true);
        setTimeout(() => {
            dispatch(deleteActaReducer(id));
            setIsDeleting(false);
        }, 1000);
    }

    const generateDocument = async(value) => {
        const acuerdos = await GetAcuerdosByActaId(value.id)
        const points = await GetPuntosByActa(value.id);
        const documents = await GetDocumentosByActa(value.id);
        const approachs = await GetPlanteamientosByActa(value.id); 
        const date = value.date.split('-');

        loadFile(
            "http://localhost:3000/assets/template.docx",
            function (error, content) {
                if (error) {
                    throw error;
                }

                function parser(tag) {
                    return {
                        get(scope, context) {
                            if (tag === "$index") {
                                const indexes = context.scopePathItem;
                                return indexes[indexes.length - 1] + 1;
                            }
                            return scope[tag] ? scope[tag] : scope;
                        },
                    };
                }
                
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                    parser
                });
                
                doc.render({
                    attendance_percentage: value.attendance_percentage,
                    section: value.union_section.name,
                    place: value.place,
                    start: value.start_time,
                    end: value.end_time,
                    guest: value.guest,
                    body: value.body,
                    order: value.order_gives.split('|'),
                    agreements: acuerdos,
                    direct: value.direct,
                    points: points,
                    documents: documents,
                    year: date[0],
                    month: date[1],
                    day: date[2],
                    approachs: approachs
                });
                const blob = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }); //Output the document using Data-URI
                saveAs(blob, "output.docx");
            }
        );
    }
    

    return (
        <div>
            <ContentHeader title="Actas" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Listado de Actas</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => navigate('/create-acta')}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Sección Sindical</th>
                                        <th>Dirige</th>
                                        <th>Lugar</th>
                                        <th>Creado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        actas && actas.map(acta => (
                                            <tr 
                                                key={acta.id}
                                            >
                                                <td>{acta.id}</td>
                                                <td>{acta.union_section ? acta.union_section.name : ''}</td>
                                                <td>{acta.direct}</td>
                                                <td>{acta.place}</td>
                                                <td>{formatDate(acta.created)}</td>
                                                <td>
                                                    <Button 
                                                        color='red'
                                                        icon='trash'
                                                        content='Eliminar'
                                                        loading={isDeleting && acta.id === selected}
                                                        onClick={() => handleDelete(acta.id)}
                                                    />

                                                    <Button 
                                                        color='blue'
                                                        icon='print'
                                                        content='Imprimir'
                                                        onClick={() => generateDocument(acta)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div 
                            className="card-footer" 
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <PaginationComponent 
                                totalItems={pagination && pagination.count} 
                                itemsPerPage={8}
                                next = {pagination && pagination.next}
                                previous = {pagination && pagination.previous} 
                                currPage={currPage} 
                                setCurrentPage={setCurrentPage} 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
