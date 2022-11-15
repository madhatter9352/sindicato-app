import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import { ContentHeader } from '../../components'
import { openModal } from '../../store/reducers/modal'
import { getUsers } from '../../store/reducers/user'
import { AddAreaModal } from '../area/AreaModal'

export const Usuario = () => {
    const dispatch = useDispatch();
    const {users, loading, error, pagination} = useSelector(state => state.user);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getUsers(currPage));
    }, [dispatch, currPage])

    if(loading === 'rejected' && error){
        toast.error(`${error}`, {
            theme: 'colored'
        });
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
                                    content="Annadir"
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
                                        <th>Nombre Completo</th>
                                        <th>Nombre de usuario</th>
                                        <th>Correo Electronico</th>
                                        <th>Creado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // areas && areas.map(area => (
                                        //     <tr 
                                        //         key={area.id}
                                        //     >
                                        //         <td>{area.id}</td>
                                        //         <td>{area.name}</td>
                                        //         <td>{formatDate(area.created)}</td>
                                        //         <td>
                                        //             <Button 
                                        //                 color='red'
                                        //                 icon='trash'
                                        //                 content='Delete'
                                        //                 loading={isDeleting && area.id === selected}
                                        //                 onClick={() => handleDelete(area.id)}
                                        //             />

                                        //             <Button 
                                        //                 color='yellow'
                                        //                 icon='edit'
                                        //                 content='Edit'
                                        //                 onClick={() => dispatch(openModal(<AddAreaModal id={area.id} />))}
                                        //             />
                                        //         </td>
                                        //     </tr>
                                        // ))
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
                            {/* <PaginationComponent 
                                totalItems={pagination.count} 
                                itemsPerPage={8}
                                next = {pagination.next}
                                previous = {pagination.previous} 
                                currPage={currPage} 
                                setCurrentPage={setCurrentPage} 
                            /> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
