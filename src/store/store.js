import { configureStore } from '@reduxjs/toolkit'
import area from './reducers/area';
import donation from './reducers/donation';
import affiliate from './reducers/affiliate';
import ContributionDeposit from './reducers/contributionDeposit';
import UnionSection from './reducers/unionSection';
import initial_state from './reducers/initial_state';
import DepositFinance from './reducers/depositFinance';
import auth from './reducers/auth';
import ui from './reducers/ui';
import modal from './reducers/modal';
import seccionSindical from './reducers/seccionSindical';
import user from './reducers/user';

export const store = configureStore({
    reducer: {
        ui: ui,
        auth:auth,
        area: area,
        donation,
        affiliate,
        initial_state,
        union_section: UnionSection,
        deposit_finance: DepositFinance,
        contributionDeposit: ContributionDeposit,
        modal: modal,
        seccionSindical: seccionSindical,
        user: user
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['getAreas/rejected'],
            ignoredPaths: ['modal.body.type', 'modal.body.$$typeof']
        }
    })
});
