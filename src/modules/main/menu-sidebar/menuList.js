export const MENU = [
    {
        name: 'Home',
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
            name: 'Area',
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
        {
            name: 'Unión sección',
            path: '/section_union'
        }
        ]
    }
];