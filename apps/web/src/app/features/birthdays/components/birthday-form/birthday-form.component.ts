import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-birthday-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./birthday-form.component.html",
  styleUrls: ["./birthday-form.component.scss"],
})
export class BirthdayFormComponent {
  form = input.required<FormGroup>();
  submit = output<any>();
}
