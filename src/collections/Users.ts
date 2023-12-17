import {Access, CollectionConfig} from "payload/types";
import {PrimaryActionEmailHtml} from "../components/emails/EmailTemplate";

const adminsAndUsers: Access = ({req: {user}}) => {
    if (user.role === 'admin') return true

    return {
        id: {
            equals: user.id,
        },
    }
};

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return PrimaryActionEmailHtml({
                    actionLabel: 'Verify your account',
                    buttonText: 'Verify Account',
                    link: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
                })
            }
        }
    },
    access: {
        read: adminsAndUsers,
        create: (): boolean => true,
        update: ({req}) => req.user.role === 'admin',
        delete: ({req}) => req.user.role === 'admin',
    },
    admin: {
        hidden: ({user}) => user.role !== 'admin',
        defaultColumns: ['id'],
    },
    fields: [
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'product_files',
            label: 'Product files',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: true,
        },
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