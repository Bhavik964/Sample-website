export interface LandPayload {
    page: string;
}

// Define the type for the user returned by the API
export interface LandUser {
    _id: string;
    userId: string;
    userType: string;
    agentName: string;
    agentCountryCode: string;
    agentPhoneNumber: string;
    location: string;
    googleMapLink: string;
    landFor: string;
    area: string;
    areaType: string;
    landType: string;
    landZone: string;
    surveyNumber: string;
    tpName: string;
    fpNumber: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    users: LandPayload[];
}

export interface LandResponse {
    result: {
        users: LandUser[];
        total: number;
        profilePath: string;
        totalCount: number;
        todaysCount: number;
    };
}
