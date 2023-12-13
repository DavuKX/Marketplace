"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwn = function (_a) {
    var user = _a.req.user;
    if (user.role === 'admin') {
        return true;
    }
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id,
        }
    };
};
exports.Orders = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Your orders',
        description: 'A summary of your orders',
    },
    access: {
        read: yourOwn,
        update: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
        },
        delete: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
        },
        create: function (_a) {
            var _b;
            var req = _a.req;
            return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
        },
    },
    fields: [
        {
            name: '_isPaid',
            type: 'checkbox',
            access: {
                read: function (_a) {
                    var _b;
                    var req = _a.req;
                    return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === 'admin';
                },
                create: function () { return false; },
                update: function () { return false; },
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: 'user',
            type: 'relationship',
            admin: {
                hidden: true,
            },
            relationTo: 'users',
            required: true,
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: true,
        }
    ]
};
