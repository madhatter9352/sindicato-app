import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteArea, getAreasByPage } from '../../store/reducers/area';
import { openModal } from '../../store/reducers/modal';
import { formatDate } from '../../utils/helpers';
import { AddAreaModal } from './AreaModal';

export const Area = () => {
    const dispatch = useDispatch();
    const {areas, loading, error, pagination} = useSelector(state => state.area);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currPage){
            dispatch(getAreasByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Cargando Areas...' />
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
            dispatch(deleteArea(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Area" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Mantenimiento de Areas</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<AddAreaModal />))}
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
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        areas && areas.map(area => (
                                            <tr 
                                                key={area.id}
                                            >
                                                <td>{area.id}</td>
                                                <td>{area.name}</td>
                                                <td>{formatDate(area.created)}</td>
                                                <td>
                                                    <Button 
                                                        color='red'
                                                        icon='trash'
                                                        content='Eliminar'
                                                        loading={isDeleting && area.id === selected}
                                                        onClick={() => handleDelete(area.id)}
                                                    />

                                                    <Button 
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Editar'
                                                        onClick={() => dispatch(openModal(<AddAreaModal id={area.id} />))}
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
