export interface Itable {
    id: number;
    name: string;
    birth: string;
    phone: string;
    filial: string;
    isPaid: boolean;
    status: string;
    email: string;
    username: string;
    address: any[string];
}

export interface ItableHeadTemplate {
    id: number;
    name: string;
    text: string;
}
