export interface Pump {
    productName: string;
    model: string;
    imageURL: string;
    inletSize: number;
    outletSize: number;
    construction: string;
    documentation: {
        fileUrl: string;
        documentID: number;
    };
}
