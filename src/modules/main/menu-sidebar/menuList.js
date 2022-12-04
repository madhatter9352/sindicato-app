export const MENU = [
    {
        name: 'Inicio',
        path: '/'
    },
    {
        name: 'Actas',
        path: '/acta'
    },
    {
        name: 'Configuracion',
        children: [
        {
            name: 'Areas',
            path: '/area'
        },

        {
            name: 'Usuarios',
            path: '/usuario'
        },
        {
            name: 'Seccion Sindical',
            path: '/seccion-sindical'
        },
        {
            name: 'Donación',
            path: '/donation'
        },
        {
            name: 'Estado Inicial',
            path: '/initial_state'
        },
        {
            name: 'Afiliados',
            path: '/affiliate'
        },
        // {
        //     name: 'Unión sección',
        //     path: '/section_union'
        // },
        {
            name: 'Aportes a la patria',
            path: '/contribution_deposit'
        },
        {
            name: 'Finanzas',
            path: '/finanzas'
        }
        ]
    }
];