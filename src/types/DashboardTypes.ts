export interface UserListPayload {
    page: number;
    pageSize: number;
    search: string;
    emailVerificationStatus: 'verified' | 'not_verified' | 'all';
    phoneVerificationStatus: 'verified' | 'not_verified' | 'all';
    platform: 'web' | 'app' | 'all';
    userCategory: string;
}

export interface UserResponse {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    otpVerified: boolean;
    profileImage: string;
    isProfileSubmit: boolean;
    role: string;
    recentLoginAt: string;
    socialType: string;
    platformType: string;
    referCode: string;
    country: string;
    invitationLimit: number;
    pushTokens: string[];
    isEmailVerified: boolean;
    designation: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    userSources: SourceResponse[];
}

export interface SourceResponse {
    _id: string;
    title: string;
    displayName: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export interface Role {
    _id: string;
    title: string;
}

export interface RoleListResponse {
    result: {
        roles: Role[];
    };
}

