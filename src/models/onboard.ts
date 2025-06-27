/*
{
  "name": "Cyprus Pharmacuticals",
  "contact_person": "Garry Shastri",
  "phone": "+91-9440321288",
  "email":"cyprus.pharmacy@supplier.com",
  "address":"West world, Germany",
  "overall_quality_rating":4.6,
  "avg_delivery_time":5
}
*/
export interface VendorModel {
    name : string;
    contact_person:string;
    phone:string;
    email:string;
    address:string;
    overall_quality_rating:number;
    avg_delivery_time_days : number;
}

/*
 "status": http.StatusOK,
 "message":   "success"
*/
export interface VendorOnBoardResponse {
    status:number;
    message:string;
}