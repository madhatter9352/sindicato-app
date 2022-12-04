import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteContributionDeposit, getContributionDepositsByPage } from '../../store/reducers/contributionDeposit';
import { openModal } from '../../store/reducers/modal';
import { ContributionDepositModal } from './ContributionDepositModal';

export const ContributionDeposit = () => {
    const dispatch = useDispatch();
    const {contributionDeposits, loading, error, pagination} = useSelector(state => state.contributionDeposit);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);
    useEffect(() => {
        if(currPage){
            dispatch(getContributionDepositsByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Cargando Aportes...' />
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
            dispatch(deleteContributionDeposit(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Aporte a la patria" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Getión de Aportes a la patria</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<ContributionDepositModal />))}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>SS</th>
                                        <th>TA</th>
                                        <th>Comprometidos</th>
                                        <th>A depositar</th>
                                        <th>Depositado</th>
                                        <th>Altas</th>
                                        <th>Bajas</th>
                                        <th>Pendientes</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contributionDeposits && contributionDeposits.map(contributionDeposit => (
                                            <tr
                                                key={contributionDeposit.id}
                                            >
                                                <td>{contributionDeposit.id}</td>
                                                <td>{contributionDeposit.union_section.name}</td>
                                                <td>{contributionDeposit.total_number_workers}</td>
                                                <td>{contributionDeposit.total_number_committed}</td>
                                                <td>{contributionDeposit.to_deposit}</td>
                                                <td>{contributionDeposit.deposited}</td>
                                                <td>{contributionDeposit.high}</td>
                                                <td>{contributionDeposit.low}</td>
                                                <td>{contributionDeposit.earring}</td>
                                                <td>
                                                    <Button
                                                        color='red'
                                                        icon='trash'
                                                        content='Eliminar'
                                                        loading={isDeleting && contributionDeposit.id === selected}
                                                        onClick={() => handleDelete(contributionDeposit.id)}
                                                    />

                                                    <Button
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Editar'
                                                        onClick={() => dispatch(openModal(<ContributionDepositModal id={contributionDeposit.id} />))}
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
