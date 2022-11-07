import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { ContentHeader } from '../../components/content-header/ContentHeader'
import { Loading } from '../../components/loading/Loading';
import { openModal } from '../../store/reducers/modal';
import { getSeccionesSindicales } from '../../store/reducers/seccionSindical';
import { formatDate } from '../../utils/helpers';
import { SeccionModal } from './SeccionModal';

export const SeccionSindical = () => {
    const dispatch = useDispatch();
    const {seccionesSindicales, loading, error} = useSelector(state => state.seccionSindical);

    useEffect(() => {
        dispatch(getSeccionesSindicales());
    }, [dispatch])


    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Loading Secciones Sindicales...' />
    }

    if(loading === 'rejected' && error){
        toast.error(`${error}`, {
            theme: 'colored'
        });
    }

    return (
    <div>
        <ContentHeader title="Sección Sindical" />
        <section className="content">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Mantenimiento de Secciones Sindicales</h3>
                        <div className="card-tools">
                            <Button 
                                primary
                                content="Annadir"
                                icon="plus"
                                onClick={() => dispatch(openModal(<SeccionModal />))}
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
                                    seccionesSindicales && seccionesSindicales.map(seccion => (
                                        <tr 
                                            key={seccion.id}
                                        >
                                            <td>{seccion.id}</td>
                                            <td>{seccion.name}</td>
                                            <td>{formatDate(seccion.created)}</td>
                                            <td>{seccion.area.name}</td>
                                            <td>
                                                <Button 
                                                    color='red'
                                                    icon='trash'
                                                    content='Delete'
                                                    // loading={isDeleting && area.id === selected}
                                                    // onClick={() => handleDelete(area.id)}
                                                />

                                                <Button 
                                                    color='yellow'
                                                    icon='edit'
                                                    content='Edit'
                                                    onClick={() => dispatch(openModal(<SeccionModal id={seccion.id} />))}
                                                />
                                            </td>
                                        </tr>
                                    ))
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
