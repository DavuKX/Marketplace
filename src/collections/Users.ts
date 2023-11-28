import {CollectionConfig} from "payload/types";

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
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