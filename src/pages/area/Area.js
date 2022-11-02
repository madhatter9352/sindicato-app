import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import { ContentHeader } from '../../components/content-header/ContentHeader'
import { Loading } from '../../components/loading/Loading'
import { deleteArea, getAreas } from '../../store/reducers/area'
import { openModal } from '../../store/reducers/modal'
import { AddAreaModal } from './AddAreaModal'

export const Area = () => {
    const dispatch = useDispatch();
    const {areas, loading, error} = useSelector(state => state.area);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        dispatch(getAreas());
    }, [dispatch])

    if(!['fulfilled', 'rejected'].includes(loading)){
        return <Loading active inline='centered' content='Loading Areas...' />
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
            dispatch(deleteArea(id));
            setIsDeleting(false);
        }, 1000);
    }

    return (
        <div>
            <ContentHeader title="Area" />
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
                                        areas && areas.map(area => (
                                            <tr 
                                                key={area.id}
                                            >
                                                <td>{area.id}</td>
                                                <td>{area.name}</td>
                                                <td>{area.created}</td>
                                                <td>
                                                    <Button 
                                                        color='red'
                                                        icon='trash'
                                                        content='Delete'
                                                        loading={isDeleting && area.id === selected}
                                                        onClick={() => handleDelete(area.id)}
                                                    />

                                                    <Button 
                                                        color='yellow'
                                                        icon='edit'
                                                        content='Edit'
                                                        onClick={() => dispatch(openModal(<AddAreaModal id={area.id} />))}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className="card-footer">Footer</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
