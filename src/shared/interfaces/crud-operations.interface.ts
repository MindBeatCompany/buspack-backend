export interface CrudOperations {
  findAll(options?: Object): Promise<Array<Object>>;
  findById(id: number): Promise<Object | null>;
  findOne(options?: Object, options2?: Object): Promise<Object | null>;
  create(entity: Object, options?: Object): Promise<Object>;
  update(id: number, newValue: Object): Promise<Object | null>;
  delete(id: number, option?: Object): Promise<Object | void>;
}
