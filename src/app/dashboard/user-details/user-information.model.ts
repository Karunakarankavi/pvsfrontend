export interface UserInformation {
  id: string;
  name: string;
  mobileNumber: string | null;
  email: string | null;
  address: string | null;
  zipcode: number;
  razorpayId: string | null;
}
