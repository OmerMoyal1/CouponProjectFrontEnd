import { Notyf } from "notyf";

class NotificationService {
  private notify = new Notyf({
    duration: 3000,
    position: { y: "bottom", x: "center" },
  });

  public success(msg: string) {
    this.notify.success(msg);
  }

  public error(err: any) {
    const msg = this.errorHandler(err);
    this.notify.error(msg);
  }

  private errorHandler(err: any) {
    if (typeof err === "string") return err;

    if (typeof err.response?.data === "string") return err.response.data;

    if (Array.isArray(err.response?.data)) return err.response.data[0]; // we only return the first string in the array...

    if (typeof err.message === "string") return err.message;

    return "Oops! Error occurred, try again...";
  }
}

const notificationService = new NotificationService();
export default notificationService;
