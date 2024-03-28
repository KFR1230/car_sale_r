"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
var isAdmin_1 = require("../app/access/isAdmin");
exports.HomePage = {
    slug: 'HomePage',
    labels: {
        plural: '首頁',
    },
    access: {
        create: isAdmin_1.isAdmin,
        read: isAdmin_1.isAdmin,
        delete: isAdmin_1.isAdmin,
    },
    fields: [
        {
            name: 'bannerArray',
            label: '首頁大圖',
            type: 'array',
            fields: [
                {
                    name: 'banner',
                    label: 'banner',
                    type: 'upload',
                    relationTo: 'banner-media',
                    required: true,
                },
            ],
        },
    ],
};
