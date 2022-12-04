import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { ContentHeader, Loading, PaginationComponent } from '../../components'
import { openModal } from '../../store/reducers/modal'
import { deleteUser, getUsers } from '../../store/reducers/user'
import { formatDate } from '../../utils/helpers'
import { UserModal } from './UserModal'

export const Usuario = () => {
    const dispatch = useDispatch();
    const {users, loading, pagination} = useSelector(state => state.user);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getUsers(currPage));
    }, [dispatch, currPage]);

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Cargando Usuarios...' />
    }

    const handleDelete = (id) => {
        setSelected(id);
        setIsDeleting(true);
        setTimeout(() => {
            dispatch(deleteUser(id));
            setIsDeleting(false);
        }, 1000);
    }
    
    return (
        <div>
            <ContentHeader title="Usuarios" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Mantenimiento de Usuarios</h3>
                            <div className="card-tools">
                                <Button 
                                    primary
                                    content="Añadir"
                                    icon="plus"
                                    onClick={() => dispatch(openModal(<UserModal />))}
                                />
                            </div>
                        </div>
                        <div className="card-body">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre Completo</th>
                                        <th>Nombre de usuario</th>
                                        <th>Correo Electronico</th>
                                        <th>Creado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users && users.map(user => (
                                            <tr 
                                                key={user.id}
                                            >
                                                <td>{user.id}</td>
                                                <td>{`${user.first_name} ${user.last_name}`}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{formatDate(user.created)}</td>
                                                <td>
                                                    <Button 
                                                        color='red'
                                                        icon='trash'
                                                        content='Eliminar'
                                                        loading={isDeleting && user.id === selected}
                                                        onClick={() => handleDelete(user.id)}
                                                    />

                                                    <Button 
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Editar'
                                                        onClick={() => dispatch(openModal(<UserModal id={user.id} />))}
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
