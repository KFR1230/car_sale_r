"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnSaleFormatField = exports.PriceFormatField = void 0;
var PriceFormatText_1 = require("./PriceFormatText");
exports.PriceFormatField = {
    name: 'PriceFormatText',
    type: 'text',
    admin: {
        readOnly: true,
        components: {
            Field: PriceFormatText_1.PriceFormatText,
        },
    },
};
exports.OnSaleFormatField = {
    name: 'OnSaleFormatText',
    type: 'text',
    admin: {
        condition: function (data, siblingData, _a) {
            var user = _a.user;
            if (data.is_onSale) {
                return true;
            }
            else {
                return false;
            }
        },
        readOnly: true,
        components: {
            Field: PriceFormatText_1.OnSaleFormatText,
        },
    },
};
