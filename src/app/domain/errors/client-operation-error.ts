export class ClientOperationError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'ClientOperationError';
    }
}