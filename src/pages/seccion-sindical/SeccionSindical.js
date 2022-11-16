import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent } from '../../components';
import { ContentHeader, Loading } from '../../components'
import { openModal } from '../../store/reducers/modal';
import { deleteSeccion, getSeccionesByPage } from '../../store/reducers/seccionSindical';
import { formatDate } from '../../utils/helpers';
import { SeccionModal } from './SeccionModal';

export const SeccionSindical = () => {
    const dispatch = useDispatch();
    const {seccionesSindicales, loading, error, pagination} = useSelector(state => state.seccionSindical);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getSeccionesByPage(currPage));
    }, [dispatch, currPage]);


    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Loading Secciones Sindicales...' />
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
            dispatch(deleteSeccion(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
    <div>
        <ContentHeader title="Sección Sindical" />
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Mantenimiento de Secciones Sindicales</h3>
                        <div className="card-tools">
                            <Button 
                                primary
                                content="Annadir"
                                icon="plus"
                                onClick={() => dispatch(openModal(<SeccionModal />))}
                            />
                        </div>
                    </div>
                    <div className="card-body">
                        <Table borderless>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Creado</th>
                                    <th>Area</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    seccionesSindicales && seccionesSindicales.map(seccion => (
                                        <tr 
                                            key={seccion.id}
                                        >
                                            <td>{seccion.id}</td>
                                            <td>{seccion.name}</td>
                                            <td>{formatDate(seccion.created)}</td>
                                            <td>{seccion.area.name}</td>
                                            <td>
                                                <Button 
                                                    color='red'
                                                    icon='trash'
                                                    content='Delete'
                                                    loading={isDeleting && seccion.id === selected}
                                                    onClick={() => handleDelete(seccion.id)}
                                                />

                                                <Button 
                                                    color='yellow'
                                                    icon='edit'
                                                    content='Edit'
                                                    onClick={() => dispatch(openModal(<SeccionModal id={seccion.id} />))}
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
