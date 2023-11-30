import {CollectionConfig} from "payload/types";

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Please verify</a>`
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