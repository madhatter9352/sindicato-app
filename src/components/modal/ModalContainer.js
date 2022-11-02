import React from 'react'
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/reducers/modal';

export const ModalContainer = () => {
    const dispatch = useDispatch();
    const modalStore = useSelector(state => state.modal);
    return (
        <Modal
            {...modalStore.props}
            show={modalStore.isOpen}
            onHide={() => dispatch(closeModal())}
        >
            {modalStore.body}
        </Modal>
    )
}
