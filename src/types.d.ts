export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface SignupErrors {
  contact?: string;
  dob?: string;
  gender?: string;
}
