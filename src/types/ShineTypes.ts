export interface ShinePayload {
    page: number,
    pageSize: number,
    search: string
}
export interface ShineResponse {
    result: {
        Shine: Shine[];
        total: number;
        profilePath: string;
        totalCount: number;
        todaysCount: number;
        ShinesPath: string;
    };
}
export interface Shine {
    _id: string;
    userId: string;
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