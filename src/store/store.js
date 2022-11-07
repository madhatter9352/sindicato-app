import { configureStore } from '@reduxjs/toolkit'
import area from './reducers/area';
import auth from './reducers/auth';
import ui from './reducers/ui';
import modal from './reducers/modal';
import seccionSindical from './reducers/seccionSindical';

export const store = configureStore({
    reducer: {
        ui: ui,
        auth:auth,
        area: area,
        modal: modal,
        seccionSindical: seccionSindical
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['getAreas/rejected'],
            ignoredPaths: ['modal.body.type', 'modal.body.$$typeof']
        }
    })
});
