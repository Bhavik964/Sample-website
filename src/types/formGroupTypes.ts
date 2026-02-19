export interface CreateFormGroup{
    title:string,
    description:string,
    orderBy:number,
    slug : string,
    formGroupData:any,
    formGroupId:string,
}
export interface CreateFormGroupPayload{
    title:string,
    description:string,
    orderBy:number,
    slug : string,
}

export interface AddFormFieldPayload{
   formGroupId: string,
  label: string,
  name: string,
  type: string,
  required: boolean,
  options: any | [],
}

export interface FormData {
    title: string;
    description: string;
    name: string;
    required: any;
    [key: string]: any;
}