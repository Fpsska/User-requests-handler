export interface Itable {
    id: number;
    name: string;
    username: string;
    birth: string;
    phone: string;
    email: string;
    address: any[string];
    filial: string;
    status: string;
    isPaid: boolean;
}

export interface ItableHeadTemplate {
    id: number;
    name: string;
    text: string;
}

export interface ItableSlice {
    isUsersDataEmpty: boolean;
    fetchUsersStatus: string;
    fetchUsersErrMsg: string | null;
    requestСount: number;
    isTableDataLoading: boolean;
    tableData: Itable[];
    filteredTableData: Itable[];
    tableHeadTemplates: ItableHeadTemplate[];
}
