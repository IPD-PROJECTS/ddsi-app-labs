import { signal } from "@angular/core";
import { Message } from "primeng/api";

export const notificationSignal = signal(<Message | undefined>undefined);