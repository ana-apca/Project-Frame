"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var vitrine_service_1 = require("./vitrine.service");
describe('VitrineService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(vitrine_service_1.vitrineservice);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=vitrine.service.spec.js.map