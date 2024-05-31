import { UserCreatedDto } from "./user-created.dto";
declare const UpdateStatusUserDto_base: import("@nestjs/common").Type<Partial<Pick<UserCreatedDto, keyof UserCreatedDto>>>;
export declare class UpdateStatusUserDto extends UpdateStatusUserDto_base {
    ids: number[];
}
export {};
