export const numberOfDocs = 4;

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export enum PaymentStatus {
  FAILED = 'failed',
  SUCCESS = 'success',
  PROCESSING = 'processing',
  PENDING = 'pending',
}

export enum ProductStatus {
  OUT_OF_STOCK = 'outOfStock',
  AVAILABLE = 'available',
}

export enum CustomerGroup {
  SENIOR_CITIZEN = 'senior-citizen',
  ADULT = 'adult',
  CHILDREN = 'children',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
}

export enum VendorType {
  WHOLESALER = 'wholesaler',
  RETAILER = 'retailer',
}
