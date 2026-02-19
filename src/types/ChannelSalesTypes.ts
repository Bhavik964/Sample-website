export interface ChannelSalesPayload {
    page: number,
    pageSize: number,
    search: string,
    salesId?: string,
}
export interface ChannelSalesResponse {
    result: {
        channelSales: ChannelSales[];
        total: number;
        profilePath: string;
        totalCount: number;
        todaysCount: number;
        channelSalesPath: string;
    };
}
export interface ChannelSales {
    _id: string;
    userId: string;
    address: string;
    channelRole: string;
    reraCertificate: string;
    type: string;
    companyName: string;
    status: "ACTIVE" | "INACTIVE";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    usersData: UserData;
}
export interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    profileImage: string;
}

export interface UploadReraDocResponse {
    result: {
        fileName: string;
        filePath: string;
    };
}

export interface ChannelSalesEditProps {
    editForm: boolean;
    setEditForm: any;
    cpData: any;
    setDetailPanelOpen:any;
}

export interface ChannelSalesDetailsProps {
    channelSalesAllData?: any;
    channelSalesData: any;
    isOpen: boolean;
    onClose: () => void;
    setDetailPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleTransformClick?: (record: any) => void;
}

export interface ChannelSalesFollowupProps {
    onClose: () => void;
    lead: any,
}