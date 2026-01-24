import { TitleCasePipe } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { Birthday } from "@birthday-app/shared";

@Component({
  selector: "app-birthday-focus-card",
  templateUrl: "./birthday-focus-card.component.html",
  styleUrls: ["./birthday-focus-card.component.scss"],
  imports: [
    TitleCasePipe
  ]
})
export class BirthdayFocusCardComponent {
  readonly birthday = input<Birthday | null>();

  // TODO: Introduce label and key/color
  readonly badgeType = computed(() => {
    const b = this.birthday();
    // if (!b || b.daysUntil == null) return null;
    //
    // if (b.daysUntil === 0) return 'today';
    // if (b.daysUntil === 1) return 'tomorrow';
    // if (b.daysUntil <= 7) return 'soon';
    //
    // return null;

    return "today";
  });
}
