// Define the payload type for fetching knowledge data
export interface KnowledgePayload {
    page: string;
}

// Define the type for the user who created the knowledge entry
export interface KnowledgeUser {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    profileImage: string;
}

// Define the type for the knowledge article
export interface KnowledgeItem {
    _id: string;
    userId: string;
    title: string;
    descriptions: string;
    image: string;
    status: 'ACTIVE' | 'INACTIVE';
    level: 'PENDING' | 'APPROVED' | 'REJECTED';
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    usersData: KnowledgeUser;
}

// Define the response type for the Knowledge API
export interface KnowledgeResponse {
    result: {
        knowledges: KnowledgeItem[];
        total: number;
        knowledgesPath: string;
    };
}

export interface KnowledgeUpdatePayload {
    knowledgeId: string;
    status: 'APPROVED' | 'REJECTED';
}

export interface KnowledgeUpdateResponse {
    success: boolean;
    message: string;
}

export interface KnowledgeDetails {
    _id: string;
    userId: string;
    title: string;
    descriptions: string;
    image: string;
    status: 'ACTIVE' | 'INACTIVE' | 'APPROVED' | 'REJECTED';
    level: 'PENDING' | 'APPROVED' | 'REJECTED';
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface KnowledgeDetailsResponse {
    message: string;
    result: KnowledgeDetails;
}

export interface AddArticlePayload {
    projectId: string;
    title: string;
    descriptions: string;
    image?: File | string | null;
    result:any;
  }


export interface AddArticleResponse {
    message: string;
    result: KnowledgeDetails;
}

