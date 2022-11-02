import { configureStore } from '@reduxjs/toolkit'
import area from './reducers/area';
import ui from './reducers/ui';
import modal from './reducers/modal';

export const store = configureStore({
    reducer: {
        ui: ui,
        area: area,
        modal: modal
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['getAreas/rejected'],
            ignoredPaths: ['modal.body.type', 'modal.body.$$typeof']
        }
    })
});
