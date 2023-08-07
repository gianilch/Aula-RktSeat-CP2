import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: IMailProvider;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "981941",
      email: "ohaime@nu.am",
      name: "Craig Gregory",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ohaime@nu.am");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should be not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("doebci@ti.mu")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generatedTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );
    await usersRepositoryInMemory.create({
      driver_license: "1573843774",
      email: "guahe@ovocew.jm",
      name: "Logan Joseph",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("guahe@ovocew.jm");

    expect(generatedTokenMail).toBeCalled();
  });
});
