"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnotherInfo = void 0;
var isAdmin_1 = require("../app/access/isAdmin");
exports.AnotherInfo = {
    slug: 'AnotherInfo',
    labels: { plural: '其他資訊' },
    access: {
        create: isAdmin_1.isAdmin,
        read: isAdmin_1.isAdmin,
        delete: isAdmin_1.isAdmin,
    },
    admin: {
        useAsTitle: 'label',
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            label: '標籤',
            required: true,
        },
    ],
};
