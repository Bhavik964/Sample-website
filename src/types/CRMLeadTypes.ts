export interface LeadPayload {
    projectId: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    email: string;
    sourceName: string;
    subSourceName: string;
    comments: string;
    alternatecountryCode: string;
    alternatePhoneNumber: string;
    referralType: string;
    referralName: string;
    referralCCode: string;
    referralPhoneNumber: string;
    buyingTime: string;
    priority: string;
    budget: string;
    areaRequired: string;
    unitType: string;
    leadType: string;
    slug: string;
    member: string;
}

export interface LeadListPayload {
    page: number;
    pageSize: number;
    search?: string;
}

export interface LeadDetailsPayload {
    id: string;
    page: number;
    pageSize: number;
    search?: string;
}

export interface updateLeadPayload {
    requestBody: LeadPayload;
    id: string;
}

export interface ProjectType {
    _id: string;
    title: string;
    slug: string;
}

export interface LeadUserListPayload {
    brandId: string;
    projectId: string;
    type?: string;
}

// Define interfaces for types
export interface Stage {
    stage: string;
    subStages: SubStage[];
}

export interface SubStage {
    name: string;
    childStages: string[];
}

export interface Country {
    code: string;
    name: string;
    callingCode: string;
    flag: string;
    flag2x: string;
}

export interface FormData {
    project: string;
    projectName?: string;
    secoundryProjectName?: string;
    firstName: string;
    lastName: string;
    country: string;
    mobileNumber: string;
    email: string;
    source: string;
    subSource: string;
    clientRemarks: string;
    alternateCountry: string;
    alternateMobileNumber: string;
    referralType: string;
    referralName: string;
    referralCountry: string;
    referralMobileNumber: string;
    buyingTime: string;
    priority: string;
    budget: string;
    areaRequired: string;
    leadCategory: string;
    unitType: string;
    leadType: string;
    secondaryProject?: string;
    referralId?: string;
    location?: string;
}

export interface CountryDropdownProps {
    value: string;
    onChange: (value: string) => void;
    countries: Country[];
}

export interface AccordionProps {
    title: string;
    children: React.ReactNode;
    isOpenByDefault?: boolean;
}
export type CRMLeadEditEnquiryProps = {
    editModal: boolean;
    setEditModal: (value: boolean) => void;
    lead:any;
};
export type CRMLeadAddEnquiryProps = {
    addModal: boolean;
    setAddModal: (value: boolean) => void;
};

export type CRMFundLeadAddEnquiryProps = {
    addFundModal: boolean;
    setAddFundModal: (value: boolean) => void;
};

export interface AddFollowUpProps {
    isOpen: boolean;
    onClose: () => void;
    lead?: any;
    crmType?: any;
}

export interface Lead {
  usersData: any;
  channelRole:string;
  address:string;
  companyName:string;
  moduleTitle: string;
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  project: string;
  status: any;
  source: string;
  stage: any;
  phone: string;
  reference?: string;
  timeline: TimelineEvent[];
  category: 'Lead' | 'Task' | 'Fund';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  transferedFrom: string;
  createdAt: string;
  countryCode: string;
  phoneNumber: string;
  sourceName: string;
  projectHistory: string[] | any;
  stag: string;
  projectDetail: any;
  leadName: any;
  currentOwnerUser:any;
  _id:string;
  referralType: string;
  referralName:string;
  referralPhoneNumber:string;
  projectId:string,
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  event: string;
  description: string;
  hasPdf?: boolean;
}

export interface LeadCardProps {
  lead: Lead;
  selectedLead: any;
  onClick:() => void;
  setDetailPanelOpen:any;
  setRecordsData?:any;
}

export interface DetailPanelProps {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
    setDetailPanelOpen: any;
    crmType: any;
}