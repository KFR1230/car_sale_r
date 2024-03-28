"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelSelectField = void 0;
var CarModelSelectComponent_1 = require("./CarModelSelectComponent");
exports.CarModelSelectField = {
    name: 'Car_Type',
    type: 'text',
    label: '車型(Car_Type)',
    required: true,
    admin: {
        components: {
            Field: CarModelSelectComponent_1.CarModelSelectComponent,
        },
    },
};
