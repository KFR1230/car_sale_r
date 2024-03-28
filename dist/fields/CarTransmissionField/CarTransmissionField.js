"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarTransmissionField = void 0;
var CarTransmissionComponent_1 = require("./CarTransmissionComponent");
exports.CarTransmissionField = {
    name: 'Car_Transmission',
    type: 'text',
    label: '車型(Car Transmission)',
    required: true,
    admin: {
        components: {
            Field: CarTransmissionComponent_1.CarTransmissionComponent,
        },
    },
};
