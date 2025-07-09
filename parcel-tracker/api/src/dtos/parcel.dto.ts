export interface CreateParcelDTO {
    tracking_number: string;
    status: string;
    recipient_name: string;
  }
  
  export interface UpdateParcelDTO {
    status?: string;
    recipient_name?: string;
  }
  