"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarTypeSelectField = void 0;
var CarTypeSelectComponent_1 = require("./CarTypeSelectComponent");
exports.CarTypeSelectField = {
    name: 'Car_Brand',
    label: '車種(Car_Brand)',
    type: 'text',
    required: true,
    admin: {
        components: {
            Field: CarTypeSelectComponent_1.CarTypeSelectComponent,
        },
    },
};
