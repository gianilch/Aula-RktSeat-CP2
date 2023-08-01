interface ICreateRentalDTO {
  id?: string;
  end_date?: Date;
  total?: number;
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

export { ICreateRentalDTO };
