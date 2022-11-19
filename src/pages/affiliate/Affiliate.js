import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteAffiliate, getAffiliatesByPage } from '../../store/reducers/affiliate';
import { openModal } from '../../store/reducers/modal';
import { formatDate } from '../../utils/helpers';
import { AffiliateModal } from './AffiliateModal';

export const Affiliate = () => {
    const dispatch = useDispatch();
    const {affiliates, loading, error, pagination} = useSelector(state => state.affiliate);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currPage){
            dispatch(getAffiliatesByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Loading Affiliates...' />
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
            dispatch(deleteAffiliate(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Affiliate" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Mantenimiento de Afiliados</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<AffiliateModal />))}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Fecha alta</th>
                                        <th>Fecha baja</th>
                                        <th>Salario</th>
                                        <th>Cuota mensual</th>
                                        <th>Cuota anual</th>
                                        <th>Contribución C.</th>
                                        <th>Contribución M.</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        affiliates && affiliates.map(affiliate => (
                                            <tr
                                                key={affiliate.id}
                                            >
                                                <td>{affiliate.id}</td>
                                                <td>{affiliate.name}</td>
                                                <td>{affiliate.high_date}</td>
                                                <td>{affiliate.low_date}</td>
                                                <td>{affiliate.salary}</td>
                                                <td>{affiliate.monthly_quota}</td>
                                                <td>{affiliate.annual_quota}</td>
                                                <td>{affiliate.contribution_commitment}</td>
                                                <td>{affiliate.month_contribution}</td>
                                                <td>
                                                    <Button
                                                        color='red'
                                                        icon='trash'
                                                        content='Delete'
                                                        loading={isDeleting && affiliate.id === selected}
                                                        onClick={() => handleDelete(affiliate.id)}
                                                    />

                                                    <Button
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Edit'
                                                        onClick={() => dispatch(openModal(<AffiliateModal id={affiliate.id} />))}
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
