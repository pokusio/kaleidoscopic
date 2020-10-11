export interface PrimaryColor {
  color_id: number; /// this is the primary key in the database, auto-increment
  color_guid: string;/// 6c603f40-6abc-46ac-889e-08151658c7f7
  description: string;
  red: number;//"<0 to 255>"
  green: number;//"<0 to 255>"
  blue: number;//"<0 to 255>"
  opacity: number;//"<0 to 1>" 2 decimals maximum (for CSS compatibility) let myNumber: number = 0.87;let myNumber: number = 10.8788;
  // maybe some other fields later.
} // inside the 'src/models/git' folder
