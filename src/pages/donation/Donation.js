import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { PaginationComponent, Loading, ContentHeader } from '../../components';
import { deleteDonation, getDonationsByPage } from '../../store/reducers/donation';
import { openModal } from '../../store/reducers/modal';
import { formatDate } from '../../utils/helpers';
import { DonationModal } from './DonationModal';

export const Donation = () => {
    const dispatch = useDispatch();
    const {donations, loading, error, pagination} = useSelector(state => state.donation);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(currPage){
            dispatch(getDonationsByPage(currPage));
        }
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Cargando Donaciones...' />
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
            dispatch(deleteDonation(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Donaciones" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Mantenimiento de Donaciones</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<DonationModal />))}
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
                                        donations && donations.map(donation => (
                                            <tr
                                                key={donation.id}
                                            >
                                                <td>{donation.id}</td>
                                                <td>{donation.name}</td>
                                                <td>{formatDate(donation.date)}</td>
                                                <td>{(donation.area.name !== undefined)  ? donation.area.name : donation.area}</td>
                                                <td>
                                                    <Button
                                                        color='red'
                                                        icon='trash'
                                                        content='Eliminar'
                                                        loading={isDeleting && donation.id === selected}
                                                        onClick={() => handleDelete(donation.id)}
                                                    />

                                                    <Button
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Editar'
                                                        onClick={() => dispatch(openModal(<DonationModal id={donation.id} />))}
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
