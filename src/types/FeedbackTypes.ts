 export interface CreatedUser {
    _id: string;
    firstName: string;
    lastName: string;
    email:string;
    countryCode:any;
    phoneNumber:any;
}
export interface Feedback {
    _id: string;
    createdAt: string;
    createdBy: any;
    createdUser: CreatedUser;
    description: string;
    isDeleted: boolean;
    module: string;
    status: string;
    updatedAt: string;
    __v: number;
}


export interface FeedbackState {
    getFeedbackData: {
      result: {
        feedbacks: Feedback[];
        total: number;
      };
    } | null;
    addFeedbackError: string | null;
    addFeedbackStatus: string | null;
    changeFeedbackStatusError:string | null;
    changeFeedbackStatus:string | null;


  }

  export interface FeedbackFormData {
      module: string;
      description: string;
  }