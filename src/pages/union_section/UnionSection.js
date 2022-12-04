import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteUnion_section, getUnion_sectionsByPage } from '../../store/reducers/unionSection';
import { openModal } from '../../store/reducers/modal';
import { formatDate } from '../../utils/helpers';
import { Union_sectionModal } from './UnionSectionModal';

export const Union_section = () => {
    const dispatch = useDispatch();
    const {union_sections, loading, error, pagination} = useSelector(state => state.union_section);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currPage){
            dispatch(getUnion_sectionsByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Cargando Union Sindical...' />
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
            dispatch(deleteUnion_section(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Unión sección" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Gestión de unión sección</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<Union_sectionModal />))}
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
                                        union_sections && union_sections.map(union_section => (
                                            <tr
                                                key={union_section.id}
                                            >
                                                <td>{union_section.id}</td>
                                                <td>{union_section.name}</td>
                                                <td>{formatDate(union_section.created)}</td>
                                                <td>{(union_section.area.name !== undefined)  ? union_section.area.name : union_section.area}</td>
                                                <td>
                                                    <Button
                                                        color='red'
                                                        icon='trash'
                                                        content='Delete'
                                                        loading={isDeleting && union_section.id === selected}
                                                        onClick={() => handleDelete(union_section.id)}
                                                    />

                                                    <Button
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Edit'
                                                        onClick={() => dispatch(openModal(<Union_sectionModal id={union_section.id} />))}
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
                                totalItems={pagination.count} 
                                itemsPerPage={8}
                                next = {pagination.next}
                                previous = {pagination.previous} 
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
