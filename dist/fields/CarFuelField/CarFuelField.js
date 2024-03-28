"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarFuelField = void 0;
var CarFuelComponent_1 = require("./CarFuelComponent");
exports.CarFuelField = {
    name: 'Engin_fuel',
    label: '引擎燃料',
    type: 'text',
    required: true,
    admin: {
        components: {
            Field: CarFuelComponent_1.CarFuelComponent,
        },
    },
};
