"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.User = {
    slug: 'user',
    labels: { plural: '使用者' },
    access: {
        read: function () { return false; },
        create: function () { return false; },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin';
        },
    },
    fields: [
        {
            name: 'role',
            required: true,
            admin: {
                condition: function () { return true; },
            },
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
        },
    ],
};
//要有什麼欄位
/*
 * slug : 名稱
 * filed : table
 * admin : admin特權
 * hooks : 進入點，執行一些特殊的動作
 * access : 定義誰有權限
 **/
