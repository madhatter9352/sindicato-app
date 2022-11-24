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
import acta from './reducers/acta';

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
        user: user,
        acta: acta
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['getAreas/rejected'],
            ignoredPaths: ['modal.body.type', 'modal.body.$$typeof', 'modal.body.props.handleAddAcuerdos', 'modal.body.props.handleAddDocument', 'modal.body.props.handleAddPlanteamiento']
        }
    })
});
