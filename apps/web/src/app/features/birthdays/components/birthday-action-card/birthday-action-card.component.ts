import { Component, input, output } from "@angular/core";
import { Birthday } from "@birthday-app/shared";

@Component({
  selector: "app-birthday-action-card",
  templateUrl: "./birthday-action-card.component.html",
  styleUrls: ["./birthday-action-card.component.scss"],
  imports: [],
})
export class BirthdayActionCardComponent {
  readonly birthday = input.required<Birthday>();
}
