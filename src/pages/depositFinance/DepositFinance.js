import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteDepositFinance, getDepositFinancesByPage } from '../../store/reducers/depositFinance';
import { openModal } from '../../store/reducers/modal';
import { DepositFinanceModal } from './DepositFinanceModal';

export const DepositFinance = () => {
    const dispatch = useDispatch();
    const {depositFinances, loading, error, pagination} = useSelector(state => state.deposit_finance);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);
    useEffect(() => {
        if(currPage){
            dispatch(getDepositFinancesByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Loading DepositFinances...' />
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
            dispatch(deleteDepositFinance(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Finanzas" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Getión de finanzas</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<DepositFinanceModal />))}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Sección S.</th>
                                        <th>Fecha</th>
                                        <th>TT</th>
                                        <th>TA</th>
                                        <th>AD</th>
                                        <th>SC</th>
                                        <th>CA</th>
                                        <th>LA</th>
                                        <th>Altas</th>
                                        <th>Bajas</th>
                                        <th>AC</th>
                                        <th>Cotizado</th>
                                        <th>Pendientes</th>
                                        <th>10%</th>
                                        <th>Cotizado neto</th>
                                        <th>10% Acumulado</th>
                                        <th>Rebaja</th>
                                        <th>Total de saldo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        depositFinances && depositFinances.map(depositFinance => (
                                            <tr
                                                key={depositFinance.id}
                                            >
                                                <td>{depositFinance.id}</td>
                                                <td>{depositFinance.union_section.name}</td>
                                                <td>{depositFinance.date}</td>
                                                <td>{depositFinance.total_number_workers}</td>
                                                <td>{depositFinance.total_number_affiliates}</td>
                                                <td>{depositFinance.al_da}</td>
                                                <td>{depositFinance.unlisted}</td>
                                                <td>{depositFinance.with_arrears}</td>
                                                <td>{depositFinance.liquidated_year}</td>
                                                <td>{depositFinance.high}</td>
                                                <td>{depositFinance.low}</td>
                                                <td>{depositFinance.to_quote}</td>
                                                <td>{depositFinance.quoted}</td>
                                                <td>{depositFinance.earring}</td>
                                                <td>{depositFinance.ten_percent}</td>
                                                <td>{depositFinance.net_quoted}</td>
                                                <td>{depositFinance.ten_percent_accumulated}</td>
                                                <td>{depositFinance.reduction}</td>
                                                <td>{depositFinance.total_balance}</td>
                                                <td>
                                                    <Button
                                                        color='red'
                                                        icon='trash'
                                                        circular='true'
                                                        loading={isDeleting && depositFinance.id === selected}
                                                        onClick={() => handleDelete(depositFinance.id)}
                                                    />

                                                    <Button
                                                        color='yellow'
                                                        icon='edit'
                                                        circular='true'
                                                        onClick={() => dispatch(openModal(<DepositFinanceModal id={depositFinance.id} />))}
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
