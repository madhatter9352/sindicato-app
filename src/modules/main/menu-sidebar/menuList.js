export const MENU = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Configuracion',
        children: [
        {
            name: 'Area',
            path: '/area'
        },

        {
            name: 'Usuarios',
            path: '/usuario'
        },
        {
            name: 'Seccion Sindical',
            path: '/section_union'
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
            name: 'Depósito de contribución',
            path: '/contribution_deposit'
        },
        {
            name: 'Finanzas',
            path: '/finanzas'
        }
        ]
    }
];