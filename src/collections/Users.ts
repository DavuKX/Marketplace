import {CollectionConfig} from "payload/types";

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return `<p>Please verify</p>`
            }
        }
    },
    access: {
        read: (): boolean => true,
        create: (): boolean => true,
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'user',
            required: true,
            type: 'select',
            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'User',
                    value: 'user',
                },
            ]
        }
    ]
}