var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";
export class Product {
    constructor(data) {
        Object.assign(this, data);
        this.ID = 1,
            this.name = "";
        this.description = "";
        this.state = "";
        this.created_by = 1;
        this.created_at = new Date();
    }
}
__decorate([
    Expose({ name: "product_id" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro product_id es obligatorio y de tipo number" }; } }),
    __metadata("design:type", Number)
], Product.prototype, "ID", void 0);
__decorate([
    Expose({ name: "product_name" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro product_name es obligatorio y de tipo string" }; } }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Expose({ name: "product_description" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro product_description es obligatorio y de tipo string" }; } }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Expose({ name: "product_state" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro product_state es obligatorio y de tipo string" }; } }),
    __metadata("design:type", String)
], Product.prototype, "state", void 0);
__decorate([
    Expose({ name: "product_created_by" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro product_created_by es obligatorio y de tipo number" }; } }),
    __metadata("design:type", Number)
], Product.prototype, "created_by", void 0);
__decorate([
    Expose({ name: "product_updated_by" }),
    Transform(({ value }) => { if (value)
        return value;
    else
        1; }),
    __metadata("design:type", Number)
], Product.prototype, "updated_by", void 0);
__decorate([
    Expose({ name: "product_created_at" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro product_created_at es obligatorio y de tipo string" }; } }),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    Expose({ name: "product_updated_at" }),
    Transform(({ value }) => { if (value)
        return value;
    else
        new Date(); }),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    Expose({ name: "product_deleted_at" }),
    Transform(({ value }) => { if (value)
        return value;
    else
        new Date(); }),
    __metadata("design:type", Date)
], Product.prototype, "deleted_at", void 0);
