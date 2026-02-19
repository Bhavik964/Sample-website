export interface VisitorData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string | null;
    category: string;
    referredBy?: string | null;
    countryCode: string;
    otherCategory?: string | null;
    // country: string;
}

export interface visitorsDetailsProps {
    visitorsAllData?: any;
    visitorsData: any;
    isOpen: boolean;
    onClose: () => void;
    setDetailPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VisitorEditProps {
    editForm: boolean;
    setEditForm: any;
    visitorInfo: any;
    setDetailPanelOpen:any;
}