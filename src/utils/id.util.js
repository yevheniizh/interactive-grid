export class IdUtil {
  constructor() {
    this.lastId = 0;
  }

  generateId( prefix = 'id' ) {
    this.lastId++;
    return `${prefix}${this.lastId}`;
  }
}