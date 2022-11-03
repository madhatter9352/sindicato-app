import React from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { ContentHeader } from '../../components/content-header/ContentHeader'
import { openModal } from '../../store/reducers/modal';
import { AddAreaModal } from '../area/AddAreaModal';

export const SeccionSindical = () => {
    const dispatch = useDispatch();
    return (
    <div>
        <ContentHeader title="Sección Sindical" />
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Mantenimiento de Areas</h3>
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
                                    <th>Nombre</th>
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
                    <div className="card-footer">
                        Footer
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}
