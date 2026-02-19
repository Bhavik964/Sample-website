export interface CampaignPayload {
    title: string,
    content: string,
    campaignType: string,
    leadType: string,
    crmType: string,
    stage: string,
    campaignId:string
}

export interface CampaignData {
    title: string;
    leadType: string;
    crmType: string;
    stage: string | string [];
    campaignType: string;
    file:any;
    template:string;
    content:string;
    project:string | string [];
    fundProject:string;
    subject:string;
    emailId:string | string [];
    tier:string;
    status:string;
}
export interface Lead {
    _id: number;
    name: string;
    email: string;
    stage: string;
    type: string;
    firstName: string;
    lastName: string;
    userId: any;
}