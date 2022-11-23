import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteInitial_state, getInitial_statesByPage } from '../../store/reducers/initial_state';
import { openModal } from '../../store/reducers/modal';
import { formatDate } from '../../utils/helpers';
import { Initial_stateModal } from './Initial_stateModal';
import moment from "moment/moment";

export const Initial_state = () => {
    const dispatch = useDispatch();
    const {initial_states, loading, error, pagination} = useSelector(state => state.initial_state);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currPage){
            dispatch(getInitial_statesByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Loading Initial_states...' />
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
            dispatch(deleteInitial_state(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Estado inicial" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Mantenimiento de Estado inicial</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<Initial_stateModal />))}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Alias</th>
                                        <th>Total trabajadores</th>
                                        <th>Total afiliados</th>
                                        <th>Potencial bruto</th>
                                        <th>Potencial neto</th>
                                        <th>Acumulado 10%</th>
                                        <th>Comprometidos</th>
                                        <th>Monto</th>
                                        <th>Año</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        initial_states && initial_states.map(initial_state => (
                                            <tr
                                                key={initial_state.id}
                                            >
                                                <td>{initial_state.id}</td>
                                                <td>{initial_state.name}</td>
                                                <td>{initial_state.total_number_workers}</td>
                                                <td>{initial_state.total_number_affiliates}</td>
                                                <td>{initial_state.gross_potential}</td>
                                                <td>{initial_state.net_potential}</td>
                                                <td>{initial_state.accumulated_ten_percent}</td>
                                                <td>{initial_state.fully_committed}</td>
                                                <td>{initial_state.amount}</td>
                                                <td>{initial_state.year}</td>
                                                <td>
                                                    <Button
                                                        color='red'
                                                        icon='trash'
                                                        content='Delete'
                                                        loading={isDeleting && initial_state.id === selected}
                                                        onClick={() => handleDelete(initial_state.id)}
                                                    />

                                                    <Button
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Edit'
                                                        onClick={() => dispatch(openModal(<Initial_stateModal id={initial_state.id} />))}
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
