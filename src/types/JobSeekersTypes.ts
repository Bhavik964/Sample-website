export interface JobseekerPayload {
  page: number;
  pageSize: number;
  search: string;
  currentOpenings?: string;
}

export interface UsersData {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  profileImage: string;
}

export interface Jobseeker {
  _id: string;
  userId: string;
  current_openings: string;
  current_company: string;
  current_designation: string;
  resume: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  usersData: UsersData;
}

export interface JobseekerDetailsProps {
  jobSeekersAllData?: any;
  jobSeekersData: any;
  isOpen: boolean;
  onClose: () => void;
  setDetailPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface JobseekerApiResponse {
  result: {
    jobseekers: Jobseeker[];
    total: number;
    profilePath: string;
    totalCount: number;
    todaysCount: number;
    jobseekerPath: string;
  };
}