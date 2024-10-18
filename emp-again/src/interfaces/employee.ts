export interface iEmployee{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    address:string;
    phone:string;
    departmentId:number;
    education:Array<IEducation>
  }
  export interface IEducation {
    educationId: number;
    level:string;
    passingYear: number;
    percentage: number
  }